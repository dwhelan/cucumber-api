'use strict';

require('chai').should();

const World = require('../support/world');

describe('World.addToRequest()', () => {
  let world;

  beforeEach(() => { world = new World(); });

  describe('object to be added', () => {
    it('should set the request if it has not been initialized', () => {
      world.addToRequest('', false, { foo: 'bar' });
      world.request.should.eql({ foo: 'bar' });
    });

    it('should add a value if it does not exist', () => {
      world.request = { foo: 'bar' };
      world.addToRequest('', false, { foo2: 'bar2'});
      world.request.should.eql({ foo: 'bar', foo2: 'bar2' });
    });

    it('should overwrite the value if it exists', () => {
      world.request = { foo: 'bar' };
      world.addToRequest('', false, { foo: 'baz' });
      world.request.should.eql({ foo: 'baz' });
    });

    it('should allow zero objects to be added', () => {
      world.addToRequest('');
      world.request.should.eql({});
    });

    it('should allow an empty object array', () => {
      world.addToRequest('', false, []);
      world.request.should.eql({});
    });

    it('should add a single object', () => {
      world.addToRequest('', false, { a: 1 });
      world.request.should.eql({ a: 1 });
    });

    it('should add multiple objects', () => {
      world.addToRequest('', false, { a: 1 }, { b: 2 });
      world.request.should.eql({ a: 1, b: 2 });
    });

    it('should add an object array', () => {
      world.addToRequest('', false, [{ a: 1 }, { b: 2 }]);
      world.request.should.eql({ a: 1, b: 2 });
    });

    it('should ignore undefined objects', () => {
      world.addToRequest('', false, undefined);
      world.request.should.eql({});
    });

    it('should ignore null objects', () => {
      world.addToRequest('', false, null);
      world.request.should.eql({});
    });
  });

  describe('path to add object at', () => {
    it('should allow an undefined path', () => {
      world.addToRequest(undefined, false,  { foo: 'bar' });
      world.request.should.eql({ foo: 'bar' });
    });

    it('should use the given path if provided', () => {
      world.addToRequest('data', false, { foo: 'bar' });
      world.request.should.eql({ data: { foo: 'bar' } });
    });

    it('should camel case the path', () => {
      world.addToRequest('Data', false, { foo: 'bar' });
      world.request.should.eql({ data: { foo: 'bar' } });
    });

    it('should allow path to be an array', () => {
      world.addToRequest(['data', 'stuff'], false, { foo: 'bar' });
      world.request.should.eql({ data: { stuff: { foo: 'bar' } } });
    });

    it('should allow path to have multiple parta', () => {
      world.addToRequest(['Data 1. Data 2', 'stuff'], false, { foo: 'bar' });
      world.request.should.eql({ data1: { data2: { stuff: { foo: 'bar' } } }});
    });

    it('should treat an empty object key as a sub-path', () => {
      world.addToRequest('', false, { '': 'data', foo: 'bar' });
      world.request.should.eql({ data: { foo: 'bar' } });
    });
  });
});
