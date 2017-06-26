'use strict';

const _ = require('lodash');

require('chai').should();

const {defineSupportCode} = require(process.cwd() + '/node_modules/cucumber');

defineSupportCode(function({Then}) {
  Then(/^the response should be$/, function (json) {
    if (_.isFunction(json)) {
      throw new Error("missing a data table for the expected response. Try adding a data table!");
    } else if (_.isString(json)) {
      this.response.body.data.should.eql(JSON.parse(json));
    } else {
      _.each(json.hashes(), (row, index) => {
        _.each(row, (value, key) => {
          this.assertValue(`[${index}].` + _.camelCase(key), parseInt(value));
        });
      });
    }
  });

  Then(/^the response status should be "([1-5]\d\d)"$/, function(status) {
    this.response.should.have.status(status);
  });

  Then('the response should be valid', function () {
    this.response.should.have.status(200);
  });

  Then(/^the "([^"]*)" "([^"]*)" should be "([^"]*)"$/, function (model, field, expected) {
    this.assertValue(field, expected, model);
  });

  Then(/^the "([^"]*)" should be "([^"]*)"$/, function(field, expected) {
    this.assertValue(field, expected);
  });
});
