'use strict';

require('chai').should();

const World = require('../support/world');

describe('World.server()', () => {

  it('should use a URL if provided as a world parameter', () => {
    const world = new World({parameters: { server: 'http://localhost:9999'}});
    world.server.should.eql('http://localhost:9999');
  });

  it('should use a local file if provided as a world parameter', () => {
    const world = new World({parameters: { server: 'test/test-server'}});
    world.server.should.eql(require('./test-server'));
  });

  it('should default to "server/server" relative to the current working directory', () => {
    const world = new World({parameters: {}});
    world.server.should.eql(require('../server/server'));
  });

  it('should default to "server/server" if no config is provided', () => {
    const world = new World();
    world.server.should.eql(require('../server/server'));
  });
});