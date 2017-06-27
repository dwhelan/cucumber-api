'use strict';

require('chai').should();

const World = require('../support/world');

describe('World.buildPath()', () => {
  let world;

  beforeEach(() => { world = new World(); });

  it('should return a falsey value with no arguments', () => {
    world.buildPath().should.be.falsey;
  });

  it('should return a blank string with a single blank string argument', () => {
    world.buildPath('').should.eql('');
  });

  it('should concatenate arguments with a "."', () => {
    world.buildPath('a', 'b').should.eql('a.b');
  });

  it('should ignore undefined or null arguments', () => {
    world.buildPath(undefined, 'a', null, 'b').should.eql('a.b');
  });

  it('should convert arguments to camel case', () => {
    world.buildPath('The', 'EndIsNear').should.eql('the.endIsNear');
  });

  it('should support array arguments by flatting them', () => {
    world.buildPath(['The', ['End', 'IsNear']]).should.eql('the.end.isNear');
  });

  it('should use a "." as a separator within path elements', () => {
    world.buildPath(['a.b', ['c.d', 'e.f']]).should.eql('a.b.c.d.e.f');
  });
});