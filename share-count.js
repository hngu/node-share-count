function ShareCount(request, services) {
  this.request = request;
  this.services = services;
}

ShareCount.prototype = {
  get: function(serviceName, url, cb) {
    var service = this.services[serviceName];
    var options;

    if (!service) {
      return cb(new Error('Unable to find service with name ' + serviceName));
    }

    options = {
      url: service.buildEndpoint(url),
      method: service.method
    };

    if (service.method === 'POST') {
      options.body = JSON.stringify(service.buildPostBody(url));
    }

    this.request(options, function(err, response, body) {
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

module.exports = ShareCount;
