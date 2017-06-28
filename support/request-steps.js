'use strict';

const {defineSupportCode} = require(process.cwd() + '/node_modules/cucumber');

defineSupportCode(function({Given, When, Then}) {
  const verb      = '(?:add|set|update)';
  const array     = '( arrays?)?';
  const path      = '((?: "?)[^"]*?(?:"?))??';
  const mechanism = '(?: by (rows|columns))?';

  When(/^I build a request(?: by rows)?$/i, function(table) {
    this.addToRequest('', table.hashes());
  });

  Given(new RegExp(`I ${verb}(?: an?)?${path}${array}${mechanism}$`), function (path, array, mechanism, table) {
    this.addTable(table, mechanism, path);
  });
});
