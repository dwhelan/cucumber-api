'use strict';

const {defineSupportCode} = require(process.cwd() + '/node_modules/cucumber');

defineSupportCode(function({When, Then}) {
  When(/^I build a request with$/i, function(table) {
    this.addToRequest('', table.hashes());
  });
});
