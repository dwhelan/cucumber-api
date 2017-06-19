'use strict';

const {validateHeader} = require('../support/headers.js');
const chai = require('chai');
const expect = chai.expect;

describe('headers', () => {
  describe('common', () => {
    it('should throw if headers is undefined', () => {
      const fn = () => { validateHeader(undefined, 'common'); };
      expect(fn).to.throw("'headers' is undefined");
    });

    it('should throw if the header is not present', () => {
      const fn = () => { validateHeader({}, 'common'); };
      expect(fn).to.throw("header 'common' is not present");
    });

    it('should allow an empty value for a header', () => {
      validateHeader({common: ''}, 'common');
    });

    it('should allow any header value if the expected value is not provided', () => {
      validateHeader({common: 'any value'}, 'common');
    });

    it('should allow a correct header value', () => {
      validateHeader({common: 'expected'}, 'common', 'expected');
    });

    it('should throw if the header value does not equal the expected value', () => {
      const fn = () => { validateHeader({common: 'incorrect'}, 'common', 'expected'); };
      expect(fn).to.throw("expected 'incorrect' to deeply equal 'expected'");
    });

    it('should allow case-insensitive header names', () => {
      validateHeader({COMMON: ''}, 'common');
      validateHeader({common: ''}, 'COMMON');
    });

    it('should throw if the header value differs in case from the expected value', () => {
      const fn = () => { validateHeader({common: 'VALUE'}, 'common', 'value'); };
      expect(fn).to.throw("expected 'VALUE' to deeply equal 'value'");
    });
  });

  describe('date', () => {
    it('should allow a valid date', () => {
      validateHeader({date: 'Thu, 08 Jun 2017 01:05:33 GMT'}, 'date');
    });

    it('should throw with an invalid date', () => {
      const fn = () => { validateHeader({date: 'XXX, 08 Jun 2017 01:05:33 GMT'}, 'date'); };
      expect(fn).to.throw(/expected .*XXX.* to match/);
    });

    it('should treat headers names as case insensitive', () => {
      const fn = () => { validateHeader({date: 'XXX, 08 Jun 2017 01:05:33 GMT'}, 'DATE'); };
      expect(fn).to.throw(/expected .*XXX.* to match/);
    });
  });
});
