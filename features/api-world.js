'use strict';

const _ = require('lodash');
const request = require('supertest');
const app = require(process.cwd() + '/server/server');

module.exports = class ApiWorld {
  constructor(config) {
    this.request = {};
    this.response = {};
    this.swagger = {};
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

  fieldNameOf(model, fieldOrDescription) {
    let field = fieldOrDescription;

    if (this.swagger.body) {
      const definition = this.swagger.body.definitions[model];
      const properties = definition.properties;
      field = _.findKey(properties, ['description', fieldOrDescription]) || fieldOrDescription;
    }

    return field;
  }

  getValue(path) {
    const value = _.get(this.response.body.data, path);
    return value === undefined ? undefined : value.toString();
  }

  api(uri) {
    return this.json('get', uri)
      .send()
      .then(swagger => { this.swagger = swagger; })
      .catch(swagger => { this.swagger = swagger; });
  }
};
