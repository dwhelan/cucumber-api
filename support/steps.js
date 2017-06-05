'use strict';

const chai = require('chai');
const expect = chai.expect;
chai.should();

const {defineSupportCode} = require(process.cwd() + '/node_modules/cucumber');

defineSupportCode(function({When, Then}) {
  console.log('steps defined in cucumber-api');
  When(/^I get from "([^"]*)"$/i, function(uri, model) {
    this.model = model;
    return this.httpGet(uri);
  });

  When(/^I get the api definition$/i, function () {
    return this.api('/explorer/swagger.json');
  });

  Then(/^the "([^"]*)" "([^"]*)" should be "([^"]*)"$/, function (model, property, expected) {
    const field = this.fieldNameOf(model, property);
    const value = this.getValue(field);

    if (expected === 'undefined') {
      expect(value).to.be.undefined;
    } else {
      expect(value, `Could not find field '${property}'`).to.not.be.undefined;
      value.should.eql(expected);
    }
  });

  // Remove duplication with the method above (only difference is how model is set)
  Then(/^the "([^"]*)" should be "([^"]*)"$/, function (property, expected) {
    const field = this.fieldNameOf(this.model, property);
    const value = this.getValue(field);

    if (expected === 'undefined') {
      expect(value).to.be.undefined;
    } else {
      expect(value, `Could not find field '${property}'`).to.not.be.undefined;
      value.should.eql(expected);
    }
  });
});
