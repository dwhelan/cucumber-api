'use strict';

const _ = require('lodash');
const request = require('supertest');
const app = require(process.cwd() + '/server/server');

const chai = require('chai');
const expect = chai.expect;
chai.should();

module.exports = class ApiWorld {
  constructor(config) {
    this.request  = {};
    this.response = {};
    this.swagger  = {};
  }

  json(verb, url, headers) {
    const requestWithHeaders = request(app)[verb](url);

    for (let key in headers) {
      requestWithHeaders.set(key, headers[key]);
    }

    return requestWithHeaders;
  }

  httpRequest(verb, uri) {
    return this.json(verb, uri, this.headers)
      .send(this.requestBody)
      .then(response => { this.response = response; })
      .catch(response => { this.response = response; });
  }

  httpGet(uri, model) {
    this.model = model;
    return this.httpRequest('get', uri);
  }

  httpPost(uri) {
    return this.httpRequest('post', uri);
  }

  api(uri) {
    return this.json('get', uri)
      .send()
      .then(swagger => {
        this.swagger = swagger;
      })
      .catch(swagger => {
        this.swagger = swagger;
      });
  }

  assertValue(fieldOrDescription, expected, model) {
    const field = this.fieldNameOf(model || this.model, fieldOrDescription);
    const value = this.getValue(field);

    if (expected === 'undefined') {
      expect(value).to.be.undefined;
    } else {
      expect(value, `Could not find field '${fieldOrDescription}'`).to.not.be.undefined;
      value.should.eql(expected);
    }
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
    const value = _.get(this.response.body.data, path);
    return value === undefined ? undefined : value.toString();
  }
};
