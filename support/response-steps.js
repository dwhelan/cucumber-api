'use strict';

// const _ = require('lodash');
const should = require('chai').should();
const expect = require('chai').expect;

const {defineSupportCode} = require(process.cwd() + '/node_modules/cucumber');

defineSupportCode(function({When, Then}) {
  Then('the response should be', function (json) {
    this.response.body.should.eql(JSON.parse(json));
  });
});
