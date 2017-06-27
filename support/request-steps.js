'use strict';

const _ = require('lodash');

const {defineSupportCode} = require(process.cwd() + '/node_modules/cucumber');

defineSupportCode(function({When, Then}) {
  When(/^I build a request with$/i, function(table) {
    this.addManyToRequest(table.hashes());
  });

  When(/^I build a request with columns$/i, function(table) {
    const copy = _.zip.apply(_, table.raw());
    var keys = copy[0];
    var valuesArray = copy.slice(1);
    var columns = valuesArray.map(values => _.zipObject(keys, values));

    this.addManyToRequest(columns);
  });
});
