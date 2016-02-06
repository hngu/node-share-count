var services = require('./services');
var request = require('request');

module.exports = {
  get: function(serviceName, url, cb) {
    var service = services[serviceName];
    var postBody;

    if (!service) {
      return cb(new Error('Unable to find service with name ' + serviceName));
    }

    if (service.method === 'POST') {
      postBody = service.buildPostBody(url);
    }

    request({
      url: service.buildEndpoint(url),
      method: service.method,
      body: JSON.stringify(postBody)
    }, function(err, response, body) {
      var counts;

      if (err) {
        return cb(err);
      }

      counts = service.parseCount(body);
      if (counts instanceof Error) {
        return cb(counts);
      }
      return cb(null, counts);
    });
  }
};
