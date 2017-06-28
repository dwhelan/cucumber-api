'use strict';

const _ = require('lodash');

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
  When(/^I build a request(?: by rows)? with$/i, function(table) {
    this.addToRequest('', table.hashes());
  });

  Given(new RegExp(`I add(?: by rows)?(?: with)? *${pathRegExp}$`), function (path, table) {
    this.addToRequest('', path, table.hashes());
  });

  When(/^I build a request by columns with$/i, function(table) {
    const copy = _.zip.apply(_, table.raw());
    var keys = copy[0];
    var valuesArray = copy.slice(1);
    var columns = valuesArray.map(values => _.zipObject(keys, values));

    this.addToRequest('', columns);
  });
});
