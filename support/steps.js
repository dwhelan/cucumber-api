'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const {defineSupportCode} = require(process.cwd() + '/node_modules/cucumber');

defineSupportCode(function({When, Then}) {
  When(/^I get from "([^"]*)"$/i, function(uri) {
    return this.httpGet(uri);
  });

  When(/^I get from "([^"]*)" with headers$/i, function(uri, headers) {
    return this.httpGet(uri, headers.rowsHash());
  });

  When(/^I get the api definition$/i, function() {
    return this.api('/explorer/swagger.json');
  });

  Then(/^the "([^"]*)" "([^"]*)" should be "([^"]*)"$/, function (model, field, expected) {
    this.assertValue(field, expected, model);
  });

  Then(/^the "([^"]*)" should be "([^"]*)"$/, function(field, expected) {
    this.assertValue(field, expected);
  });

  Then(/^the response status should be "([1-5]\d\d)"$/, function(status) {
    this.response.should.have.status(status);
  });

  Then('the response should be valid', function () {
    this.response.should.have.status(200);
  });
});
