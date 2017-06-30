'use strict';

const chai = require('chai');
const chaiJsonEqual = require('chai-json-equal');
chai.use(chaiJsonEqual);
chai.should();

const {defineSupportCode} = require(process.cwd() + '/node_modules/cucumber');

defineSupportCode(function({Then}) {
  Then('the request should be', function (json) {
    this.request.should.jsonEqual(JSON.parse(json));
  });
});
