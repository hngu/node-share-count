var request = require('request');
var services = require('./services');
var ShareCount = require('./share-count');

module.exports = new ShareCount(request, services);
