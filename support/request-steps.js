'use strict';

const {defineSupportCode} = require(process.cwd() + '/node_modules/cucumber');

defineSupportCode(function({Given, When, Then}) {
  const pathRegExp = '(?:an? +)?((?:")[^"]*(?:"))?';

  /*
    Matches:
      I build a request
      I build a request with
      I build a request with a 'foo"
      I build a request with an 'ardvaark"
      I add
      I add a
      I add an
      I add a "foo"
      I add an "ardvaark"
  */
  Given(new RegExp(`I (?:build a request(?: *with)?|add) *${pathRegExp}$`), function (path, table) {
    this.addToRequest(path, table.hashes());
  });

  When(/^I get from "([^"]*)"$/i, function(uri) {
    return this.httpGet(uri);
  });

  When(/^I get from "([^"]*)" with headers$/i, function(uri, headers) {
    return this.httpGet(uri, headers.rowsHash());
  });
});
