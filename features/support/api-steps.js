'use strict';

const expect = require('chai').expect;
require('chai').should();

module.exports = function () {

  this.When(/^I get from "([^"]*)"$/i, function(uri, model) {
    this.model = model;
    return this.httpGet(uri);
  });

  this.When(/^I get the api definition$/i, function () {
    return this.api('/explorer/swagger.json');
  });

  this.Then(/^the "([^"]*)" "([^"]*)" should be "([^"]*)"$/, function (model, property, expected) {
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
  this.Then(/^the "([^"]*)" should be "([^"]*)"$/, function (property, expected) {
    const field = this.fieldNameOf(this.model, property);
    const value = this.getValue(field);

    if (expected === 'undefined') {
      expect(value).to.be.undefined;
    } else {
      expect(value, `Could not find field '${property}'`).to.not.be.undefined;
      value.should.eql(expected);
    }
  });
};
