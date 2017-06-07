'use strict';

const {defineSupportCode} = require(process.cwd() + '/node_modules/cucumber');

defineSupportCode(function({When, Then}) {
  When(/^I get from "([^"]*)"$/i, function(uri, model) {
    this.model = model;
    return this.httpGet(uri);
  });

  When(/^I get the api definition$/i, function () {
    return this.api('/explorer/swagger.json');
  });

  Then(/^the "([^"]*)" "([^"]*)" should be "([^"]*)"$/, function (model, field, expected) {
    this.assertValue(field, expected, model);
  });

  Then(/^the "([^"]*)" should be "([^"]*)"$/, function (field, expected) {
    this.assertValue(field, expected);
  });
});
