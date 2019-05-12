let common = require('./data/common.js');
const index = require('./data/index.js');
const _ = require('lodash');

module.exports = {
  index: _.merge(common, index)
}
