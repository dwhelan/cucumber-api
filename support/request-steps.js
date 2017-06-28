'use strict';

const _ = require('lodash');

const {defineSupportCode} = require(process.cwd() + '/node_modules/cucumber');

defineSupportCode(function({Given, When, Then}) {
  const verb      = '(?:add|set|update)';
  const array     = '( arrays?)?';
  const path      = '((?: "?)[^"]*?(?:"?))??';
  const mechanism = '(?: by (rows|columns))?';

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
  When(/^I build a request(?: by rows)?$/i, function(table) {
    this.addToRequest('', table.hashes());
  });

  Given(new RegExp(`I ${verb}(?: an?)?${path}${array}${mechanism}$`), function (path, array, mechanism, table) {
    this.addTable(table, mechanism, path);
  });
});
