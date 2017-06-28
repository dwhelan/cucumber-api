'use strict';

const _ = require('lodash');

const transpose = table => {
  return _.zip.apply(_, table.raw());
};

module.exports = class Table {
  toObjects(table, byRows) {
    if (byRows) {
      return table.hashes();
    } else {
      const objects = transpose(table);
      const keys    = objects[0];
      const values  = objects.slice(1);
      const columns = values.map(value => _.zipObject(keys, value));

      return columns;
    }
  }
};
