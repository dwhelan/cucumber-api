'use strict';

const chai = require('chai');
const expect = chai.expect;
chai.should();

const ApiWorld = require('../support/world');

describe('ApiWorld', () => {
  describe('server', () => {
    it('should use a URL if provided as a world parameter', () => {
      const apiWorld = new ApiWorld({parameters: { server: 'http://localhost:9999'}});
      apiWorld.server.should.eql('http://localhost:9999');
    });

    it('should use a local file if provided as a world parameter', () => {
      const apiWorld = new ApiWorld({parameters: { server: 'test/test-server'}});
      apiWorld.server.should.eql(require('./test-server'));
    });

    it('should default to "server/server" relative to the current working directory', () => {
      const apiWorld = new ApiWorld({parameters: {}});
      apiWorld.server.should.eql(require('../server/server'));
    });

    it('should default to "server/server" if no config is provided', () => {
      const apiWorld = new ApiWorld();
      apiWorld.server.should.eql(require('../server/server'));
    });
  });

  describe('buildPath', () => {
    it('should return a falsey value with no arguments', () => {
      expect(ApiWorld.buildPath()).to.be.falsey;
    });

    it('should return a blank string with a single blank string argument', () => {
      expect(ApiWorld.buildPath('')).to.eql('');
    });

    it('should concatenate arguments with a "."', () => {
      expect(ApiWorld.buildPath('a', 'b')).to.eql('a.b');
    });

    it('should ignore undefined or null arguments', () => {
      expect(ApiWorld.buildPath(undefined, 'a', null, 'b')).to.eql('a.b');
    });

    it('should convert arguments to camel case', () => {
      expect(ApiWorld.buildPath('The', 'EndIsNear')).to.eql('the.endIsNear');
    });

    it('should support array arguments by flatting them', () => {
      expect(ApiWorld.buildPath(['The', ['End', 'IsNear']])).to.eql('the.end.isNear');
    });
  });

  describe('addManyToRequest', () => {
    it('should allow an undefined object array', () => {
      const apiWorld = new ApiWorld();
      apiWorld.addManyToRequest(undefined);
      apiWorld.request.should.eql({});
    });

    it('should allow an empty object array', () => {
      const apiWorld = new ApiWorld();
      apiWorld.addManyToRequest([]);
      apiWorld.request.should.eql({});
    });

    it('should add a single object', () => {
      const apiWorld = new ApiWorld();
      apiWorld.addManyToRequest([{ a: 1 }]);
      apiWorld.request.should.eql({ a: 1 });
    });

    it('should add multiple objects', () => {
      const apiWorld = new ApiWorld();
      apiWorld.addManyToRequest([{ a: 1 }, { b: 2 }]);
      apiWorld.request.should.eql({ a: 1, b: 2 });
    });

    it('should ignore undefined or null objects', () => {
      const apiWorld = new ApiWorld();
      apiWorld.addManyToRequest([undefined, { a: 1 }, null, { b: 2 }]);
      apiWorld.request.should.eql({ a: 1, b: 2 });
    });
  });

  describe('addToRequest', () => {
    it('should set the request if it has not been initialized', () => {
      const apiWorld = new ApiWorld();
      apiWorld.addToRequest({ foo: 'bar' });
      apiWorld.request.should.eql({ foo: 'bar' });
    });

    it('should add a value if the value does not already exist', () => {
      const apiWorld = new ApiWorld();
      apiWorld.request = { foo: 'bar' };
      apiWorld.addToRequest({ foo2: 'bar2'});
      apiWorld.request.should.eql({ foo: 'bar', foo2: 'bar2' });
    });

    it('should overwrite the value if it already exists', () => {
      const apiWorld = new ApiWorld();
      apiWorld.request = { foo: 'bar' };
      apiWorld.addToRequest({ foo: 'baz' });
      apiWorld.request.should.eql({ foo: 'baz' });
    });

    it('should use the given root path if provided', () => {
      const apiWorld = new ApiWorld();
      apiWorld.addToRequest({ foo: 'bar' }, 'data');
      apiWorld.request.should.eql({ data: { foo: 'bar' } });
    });

    it('should support multiple path elements', () => {
      const apiWorld = new ApiWorld();
      apiWorld.addToRequest({ foo: 'bar' }, 'data', 'stuff');
      apiWorld.request.should.eql({ data: { stuff: { foo: 'bar' } } });
    });

    it('should allow path elements to be arrays', () => {
      const apiWorld = new ApiWorld();
      apiWorld.addToRequest({ foo: 'bar' }, ['data', 'stuff']);
      apiWorld.request.should.eql({ data: { stuff: { foo: 'bar' } } });
    });
  });

  describe('addToRequestWithKey', () => {
    it('should add an object using the given key value as the path', () => {
      const apiWorld = new ApiWorld();
      apiWorld.addToRequestWithKey({ a: '1', name: 'foo' }, 'name');
      apiWorld.request.should.eql({ foo: { a: '1' } });
    });

    it('should allow additional paths', () => {
      const apiWorld = new ApiWorld();
      apiWorld.addToRequestWithKey({ a: '1', name: 'foo' }, 'name', 'data');
      apiWorld.request.should.eql({ data: { foo: { a: '1' } } });
    });
  });
});