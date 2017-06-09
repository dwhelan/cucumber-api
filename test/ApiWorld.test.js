'use strict';

const chai = require('chai');
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
  });
});