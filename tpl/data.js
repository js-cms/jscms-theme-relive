let common = require('./data/common.js');
const home = require('./data/home.js');
const _ = require('lodash');

module.exports = {
    home: _.merge(common, home)
}