'use strict';

const _ = require('lodash');

const parse = function(value) {
  try {
    if (_.isString(value) && _.startsWith(value, '"') && _.endsWith(value, '"')) {
      return _.trim(value, '"');
    } else {
      return JSON.parse(value);
    }
  } catch (err) {
    return value;
  }
};

const buildPath = function(...pathElements) {
  return _
    .chain(pathElements)
    .flattenDeep()
    .compact()
    .map(pathElement => pathElement.split('.'))
    .flattenDeep()
    .map(pathElement => _.camelCase(pathElement))
    .join('.')
    .value();
};

module.exports = class Setter {
  set(json, path, value, options) {
    if (_.isArray(value)) {
      this.setArray(json, path, value, options);
    } else if (_.isObject(value)) {
      this.setObject(json, path, value, options);
    } else {
      this.setProperty(json, path, value, options);
    }
  }

  setArray(json, path, objects, options) {
    _.forEach(_.flatten(objects), object => this.setObject(json, path, object, options));
  }

  setObject(json, path, object, options) {
    if (_.isEmpty(object)) {
      return;
    }

    const obj = _.clone(object);
    _.unset(obj, '');

    _.forEach(obj, (value, key) => {
      const basePath = buildPath(path, object['']);
      if (_.isEmpty(basePath) && options && options.asArray) {
        throw new Error('Must specify a path when adding as array');
      }
      this.setProperty(json, [basePath, key], value);
    });
  }

  setProperty(json, path, value, options) {
    _.set(json, buildPath(path), parse(value));
  }
};
