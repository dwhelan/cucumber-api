'use strict';

require('chai').should();

const Setter = require('../support/setter');

describe('Setter', () => {
  let setter, json;

  beforeEach(() => {
    setter = new Setter();
    json = {};
  });

  describe('setObject()', () => {
    it('should add a single object', () => {
      setter.setObject(json, '', { foo: 'bar' });
      json.should.eql({ foo: 'bar' });
    });

    it('should allow an undefined path', () => {
      setter.setObject(json, undefined, { foo: 'bar' });
      json.should.eql({ foo: 'bar' });
    });

    it('should use the given path if provided', () => {
      setter.setObject(json, 'data', { foo: 'bar' });
      json.should.eql({ data: { foo: 'bar' } });
    });

    it('should camel case the path', () => {
      setter.setObject(json, 'Data', { foo: 'bar' });
      json.should.eql({ data: { foo: 'bar' } });
    });

    it('should allow path to be an array', () => {
      setter.setObject(json, ['data', 'stuff'], { foo: 'bar' });
      json.should.eql({ data: { stuff: { foo: 'bar' } } });
    });

    it('should allow path to have multiple parta', () => {
      setter.setObject(json, ['Data 1. Data 2', 'stuff'], { foo: 'bar' });
      json.should.eql({ data1: { data2: { stuff: { foo: 'bar' } } }});
    });

    it('should treat an empty object key as a sub-path', () => {
      setter.setObject(json, '', { '': 'data', foo: 'bar' });
      json.should.eql({ data: { foo: 'bar' } });
    });

    it('should merge existing properties at the same path', () => {
      json = { foo: 'bar' };
      setter.setObject(json, '', { foo2: 'bar2'});
      json.should.eql({ foo: 'bar', foo2: 'bar2' });
    });

    it('should overwrite the value if it exists', () => {
      json = { foo: 'bar' };
      setter.setObject(json, '', { foo: 'baz' });
      json.should.eql({ foo: 'baz' });
    });

    it('should ignore undefined objects', () => {
      setter.setObject(json, '', undefined);
      json.should.eql({});
    });

    it('should ignore null objects', () => {
      setter.setObject(json, '', null);
      json.should.eql({});
    });
  });

  describe('setArray()', () => {
    it('should add each object in the array', () => {
      setter.setArray(json, '', [{ a: 1 }, { b: 2 }]);
      json.should.eql({ a: 1, b: 2 });
    });

    it('should allow an empty array', () => {
      setter.setArray(json, '', []);
      json.should.eql({});
    });

    it('should allow an defined array', () => {
      setter.setArray(json, '', undefined);
      json.should.eql({});
    });

    it('should allow a null array', () => {
      setter.setArray(json, '', null);
      json.should.eql({});
    });
  });

  describe('set()', () => {
    it('should add arrays', () => {
      setter.set(json, '', [{ a: 1 }, { b: 2 }]);
      json.should.eql({ a: 1, b: 2 });
    });

    it('should add objects', () => {
      setter.set(json, '', { a: 1 });
      json.should.eql({ a: 1 });
    });

    it('should add properties', () => {
      setter.set(json, 'foo', 'bar');
      json.should.eql({ foo: 'bar' });
    });
  });
});
