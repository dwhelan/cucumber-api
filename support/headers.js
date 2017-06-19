'use strict';

const _ = require('lodash');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();
const expect = chai.expect;

const {defineSupportCode} = require(process.cwd() + '/node_modules/cucumber');

const headerRegexs = {
  date: /^(Sun|Mon|Tue|Wed|Thu|Fri|Sat),\s+(0?[1-9]|[1-2][0-9]|3[01])\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+2[0-9]{3}\s+([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]\s+GMT$/
};

const headerValue = (headers, name) => {
  var realName = _.findKey(headers, function (value, key) {
    return key.toLowerCase() === name.toLowerCase();
  });
  return headers[realName];
};

const validateHeader = (headers, name, expected) => {
  expect(headers, "'headers' is undefined").to.not.be.undefined;

  const value = headerValue(headers, name);
  expect(value, `header '${name}' is not present`).to.not.be.undefined;
  expected && value.should.eql(expected);

  const regex = headerRegexs[name.toLowerCase()];
  regex && value.should.match(regex);
};

module.exports.validateHeader = validateHeader;

defineSupportCode(function({When, Then}) {
  Then('the response headers should include', function(table) {
    _.each(table.raw(), row => {
      const name = row[0];
      const expected = row[1];
      validateHeader(this.response.headers, name, expected);
    });
  });
});
