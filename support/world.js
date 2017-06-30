'use strict';

const _ = require('lodash');
const request = require('supertest');
const { URL } = require('url');
const path = require('path');

const {defineSupportCode} = require(process.cwd() + '/node_modules/cucumber');

const chai = require('chai');
const expect = chai.expect;
chai.should();

const Table = require('./table');
const Setter = require('./setter');

const World = class World {
  constructor(config) {
    this.request  = {};
    this.response = {};
    this.swagger  = {};
    this.table    = new Table();
    this.setter   = new Setter();

    try {
      this.server = new URL(config.parameters.server).toString().slice(0, -1);
    } catch (err) {
      const localFile = _.get(config, 'parameters.server') || '/server/server';
      this.server = require(path.join(process.cwd(), localFile));
    }
  }

  json(verb, path, headers) {
    const requestWithHeaders = request(this.server)[verb](path);

    for (let key in headers) {
      requestWithHeaders.set(key, headers[key]);
    }

    return requestWithHeaders;
  }

  httpRequest(verb, path, headers) {
    return this.json(verb, path, headers)
      .send(this.request)
      .then(response  => { this.response = response; })
      .catch(response => { this.response = response; });
  }

  httpGet(path, headers, model) {
    this.model = model;
    return this.httpRequest('get', path, headers);
  }

  httpPost(path, request, headers) {
    return this.httpRequest('post', path, headers);
  }

  api(path) {
    return this.json('get', path)
      .send()
      .then(swagger  => { this.swagger = swagger; })
      .catch(swagger => { this.swagger = swagger; });
  }

  assertValue(fieldOrDescription, expected, model) {
    const field = this.fieldNameOf(model || this.model, fieldOrDescription);
    const value = this.getValue(field);

    if (expected === 'undefined' || expected === undefined) {
      expect(value).to.be.undefined;
    } else {
      expect(value, `Could not find field '${fieldOrDescription}'`).to.not.be.undefined;
      expect(value.toString(), `Field '${fieldOrDescription}' is not as expected`).to.eql(expected.toString());
    }
  }

  buildPath(...pathElements) {
    return this.setter.buildPath(...pathElements);
  }

  parse(value) {
    try {
      if (_.isString(value) && _.startsWith(value, '"') && _.endsWith(value, '"')) {
        return _.trim(value, '"');
      } else {
        return JSON.parse(value);
      }
    } catch (err) {
      return value;
    }
  }

  addToRequest(path, asArray, ...objects) {
    this.setter.setObjects(this.request, path, objects, {asArray: asArray});
  }

  fieldNameOf(model, fieldOrDescription) {
    if (!this.swagger.body) {
      return fieldOrDescription;
    }

    const definition = this.swagger.body.definitions[model];
    const properties = definition.properties;
    return _.findKey(properties, ['description', fieldOrDescription]) || fieldOrDescription;
  }

  getValue(path) {
    return _.get(this.response.body.data, path);
  }

  addTable(table, byRows, asArray, path) {
    this.addToRequest(path, asArray, this.table.toObjects(table, byRows));
  }
};

module.exports = World;

defineSupportCode(function({setWorldConstructor}) {
  setWorldConstructor(World);
});
