'use strict';

const _ = require('lodash');

module.exports = class Setter {
  parse(value) {
    try {
      if (_.isString(value) && _.startsWith(value, '"') && _.endsWith(value, '"')) {
        return _.trim(value, '"');
      } else {
        return JSON.parse(value);
      }
    } catch (err) {
      return value;
    }
  }

  buildPath(...pathElements) {
    return _
      .chain(pathElements)
      .flattenDeep()
      .compact()
      .map(pathElement => pathElement.split('.'))
      .flattenDeep()
      .map(pathElement => _.camelCase(pathElement))
      .join('.')
      .value();
  }

  setObjects(json, path, objects, options) {
    _.forEach(_.flatten(objects), object => this.setObject(json, path, object, options));
  }

  setObject(json, path, object, options) {
    if (_.isEmpty(object)) {
      return;
    }

    const obj = _.clone(object);
    _.unset(obj, '');

    _.forEach(obj, (value, key) => {
      const basePath = this.buildPath(path, object['']);
      if (_.isEmpty(basePath) && options && options.asArray) {
        throw new Error('Must specify a path when adding as array');
      }
      this.setProperty(json, [basePath, key], value);
    });
  }

  setProperty(json, path, value) {
    _.set(json, this.buildPath(path), this.parse(value));
  }

  set(json, path, value) {
    _.set(json, path, this.parse(value));
  }
};
