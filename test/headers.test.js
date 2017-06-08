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

    it('should throw if header is not present', () => {
      const fn = () => { validateHeader({}, 'common'); };
      expect(fn).to.throw("header 'common' is not present");
    });

    it('should allow an empty value', () => {
      validateHeader({common: ''}, 'common');
    });

    it('should allow any value if the expected value is not provided', () => {
      validateHeader({common: 'any value'}, 'common');
    });

    it('should allow a correct value', () => {
      validateHeader({common: 'expected'}, 'common', 'expected');
    });

    it('should throw if header value does not equal expected value', () => {
      const fn = () => { validateHeader({common: 'incorrect'}, 'common', 'expected'); };
      expect(fn).to.throw("expected 'incorrect' to deeply equal 'expected'");
    });

    it('should allow case-insensitive header names', () => {
      validateHeader({COMMON: ''}, 'common');
      validateHeader({common: ''}, 'COMMON');
    });

    it('should throw if header value differs in case from expected value', () => {
      const fn = () => { validateHeader({common: 'VALUE'}, 'common', 'value'); };
      expect(fn).to.throw("expected 'VALUE' to deeply equal 'value'");
    });
  });

  describe('date', () => {
    it('should allow a valid date', () => {
      validateHeader({date: 'Thu, 08 Jun 2017 01:05:33 GMT'}, 'date');
    });

    it('should not allow an invalid date', () => {
      const fn = () => { validateHeader({date: 'XXX, 08 Jun 2017 01:05:33 GMT'}, 'date'); };
      expect(fn).to.throw(/expected .*XXX.* to match/);
    });

    it('should not allow an invalid DATE', () => {
      const fn = () => { validateHeader({date: 'XXX, 08 Jun 2017 01:05:33 GMT'}, 'DATE'); };
      expect(fn).to.throw(/expected .*XXX.* to match/);
    });
  });
});