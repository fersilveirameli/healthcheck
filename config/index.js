

var path = require('path');

var environment = process.env.NODE_ENV || 'development';
var config = require(path.join(__dirname, 'env.json'))[environment];

module.exports = config;
