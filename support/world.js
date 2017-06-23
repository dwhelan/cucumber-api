'use strict';

const _ = require('lodash');
const request = require('supertest');
const { URL } = require('url');
const path = require('path');

const {defineSupportCode} = require(process.cwd() + '/node_modules/cucumber');

const chai = require('chai');
const expect = chai.expect;
chai.should();

const ApiWorld = class ApiWorld {
  constructor(config) {
    this.request  = {};
    this.response = {};
    this.swagger  = {};

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
      expect(value, `Field '${fieldOrDescription}' is not as expected`).to.eql(expected);
    }
  }

  static buildPath(...pathElements) {
    return _
      .chain(pathElements)
      .flattenDeep()
      .compact()
      .map(pathElement => pathElement.split('.'))
      .flattenDeep()
      .map(pathElement => _.camelCase(pathElement))
      .join('.')
      .value();
  }

  addToRequest(path, ...objects) {
    _.forEach(_.flatten(objects), object => {
      if (_.isEmpty(object)) {
        return;
      }
      const obj = _.clone(object);
      delete obj[''];
      _.forEach(obj, (value, key) => _.set(this.request, ApiWorld.buildPath(path, object[''], key), value));
    });
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
};

module.exports = ApiWorld;

defineSupportCode(function({setWorldConstructor}) {
  setWorldConstructor(ApiWorld);
});
