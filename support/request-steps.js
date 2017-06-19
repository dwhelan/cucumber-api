'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const {defineSupportCode} = require(process.cwd() + '/node_modules/cucumber');

defineSupportCode(function({When, Then}) {
  When(/^I build a request with$/i, function(table) {
    this.addManyToRequest(table.hashes());
  });

  Then('the request should be', function (json) {
    this.request.should.eql(JSON.parse(json));
  });
});
