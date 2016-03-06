var assert = require('chai').assert;
var ShareCount = require('../share-count');
var services = require('../services');

describe('ShareCount', function() {
  var count;
  var mockRequest;

  describe('get', function() {

    it('should return an error when the requested service does not exist', function(done) {
      mockRequest = function() {};
      count = new ShareCount(mockRequest, services);
      count.get('test', 'http://google.com', function(err, count) {
        assert.ok(err);
        assert.notOk(count);
        done();
      });
    });

    it('should get the expected counts for facebook [GET]', function(done) {
      var mockBody = '{"shares": -1234}';
      mockRequest = function(opts, cb) {
        cb(null, null, mockBody);
      };
      count = new ShareCount(mockRequest, services);

      count.get('facebook', 'http://google.com', function(err, count) {
        assert.notOk(err);
        assert.ok(count);
        assert.equal(-1234, count);
        done();
      });
    });

    it('should get the expected counts for google [POST]', function(done) {
      var mockBody = '[{"result":{"metadata":{"globalCounts":{"count":-1234}}}}]';
      mockRequest = function(opts, cb) {
        cb(null, null, mockBody);
      };
      count = new ShareCount(mockRequest, services);

      count.get('googleplus', 'http://google.com', function(err, count) {
        assert.notOk(err);
        assert.ok(count);
        assert.equal(-1234, count);
        done();
      });
    });

    it('should return an error when the request fails', function(done) {
      var expectedError = new Error('network request failed');
      mockRequest = function(opts, cb) {
        cb(expectedError, null, null);
      };
      count = new ShareCount(mockRequest, services);

      count.get('googleplus', 'http://google.com', function(err, count) {
        assert.ok(err);
        assert.notOk(count);
        assert.equal(expectedError, err);
        done();
      });
    });

    it('should return an error when it cannot parse the response', function(done) {
      mockRequest = function(opts, cb) {
        cb(null, null, 'This is not json parsable');
      };
      count = new ShareCount(mockRequest, services);

      count.get('facebook', 'http://google.com', function(err, count) {
        assert.ok(err);
        assert.notOk(count);
        done();
      });
    });

  });

});
