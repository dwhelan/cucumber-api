'use strict';

require('chai').should();

const {defineSupportCode} = require(process.cwd() + '/node_modules/cucumber');

defineSupportCode(function({When, Then}) {
  Then('the request should be', function (json) {
    JSON.parse(JSON.stringify(this.request)).should.eql(JSON.parse(json));
  });
});
