'use strict';

require('chai').should();

const {defineSupportCode} = require(process.cwd() + '/node_modules/cucumber');

defineSupportCode(function({Then}) {
  Then('the response should be', function (json) {
    this.response.body.should.eql(JSON.parse(json));
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
