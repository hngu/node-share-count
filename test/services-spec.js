var assert = require('chai').assert;
var services = require('../services');

describe('services', function() {

  describe('facebook', function() {

    it('should be a GET method', function() {
      assert.equal('GET', services.facebook.method);
    });

    it('should build the expected endpoint', function() {
      var url = 'https://google.com';
      var expected = 'http://graph.facebook.com/?id=' + url;
      var actual = services.facebook.buildEndpoint(url);
      assert.equal(expected, actual);
    });

    it('should parse the counts correctly', function() {
        var fakeResp = '{"id": "https://google.com", "shares": 1184425,"comments": 317}';
        var actual = services.facebook.parseCount(fakeResp);
        assert.equal(1184425, actual);

        var nonJSONResp = 'Error';
        var actual = services.facebook.parseCount(nonJSONResp);
        assert.isTrue(actual instanceof Error);
    });

  });

  describe('pinterest', function() {

    it('should be a GET method', function() {
      assert.equal('GET', services.pinterest.method);
    });

    it('should build the expected endpoint', function() {
      var url = 'https://google.com';
      var expected = 'http://api.pinterest.com/v1/urls/count.json?callback=c&url=' + url;
      var actual = services.pinterest.buildEndpoint(url);
      assert.equal(expected, actual);
    });

    it('should parse the counts correctly', function() {
      var fakeResp = 'c({"url": "https://google.com", "count": 123})';
      var actual = services.pinterest.parseCount(fakeResp);
      assert.equal(123, actual);

      var nonJSONResp = 'Error';
      var actual = services.pinterest.parseCount(nonJSONResp);
      assert.isTrue(actual instanceof Error);
    });

  });

  describe('linkedin', function() {

    it('should be a GET method', function() {
      assert.equal('GET', services.linkedin.method);
    });

    it('should build the expected endpoint', function() {
      var url = 'https://google.com';
      var expected = 'http://www.linkedin.com/countserv/count/share?format=json&url=' + url;
      var actual = services.linkedin.buildEndpoint(url);
      assert.equal(expected, actual);
    });

    it('should parse the counts correctly', function() {
      var fakeResp = '{"count":17,"fCnt":"17","fCntPlusOne":"18","url":"https:\/\/google.com"}';
      var actual = services.linkedin.parseCount(fakeResp);
      assert.equal(17, actual);

      var nonJSONResp = 'Error';
      var actual = services.linkedin.parseCount(nonJSONResp);
      assert.isTrue(actual instanceof Error);
    });

  });

  describe('googleplus', function() {

    it('should be a POST method', function() {
      assert.equal('POST', services.googleplus.method);
    });

    it('should build the expected endpoint', function() {
      var expected = 'https://clients6.google.com/rpc?key=AIzaSyCKSbrvQasunBoV16zDH9R33D88CeLr9gQ';
      var actual = services.googleplus.buildEndpoint();
      assert.equal(expected, actual);
    });

    it('should return the expected post body', function() {
        var url = 'http://google.com';
        var expected = [{
          "method":"pos.plusones.get",
          "id":"p",
          "params":{
              "nolog":true,
              "id":url,
              "source":"widget",
              "userId":"@viewer",
              "groupId":"@self"
              },
          "jsonrpc":"2.0",
          "key":"p",
          "apiVersion":"v1"
        }];

        assert.deepEqual(expected, services.googleplus.buildPostBody(url));
    });

    it('should parse the counts correctly', function() {
      var fakeResp = '[{"result":{"id":"http://stylehatch.co/","metadata":{"globalCounts":{"count":3097.0}}}}]';
      var actual = services.googleplus.parseCount(fakeResp);
      assert.equal(3097.0, actual);

      var nonJSONResp = 'Error';
      var actual = services.googleplus.parseCount(nonJSONResp);
      assert.isTrue(actual instanceof Error);
    });

  });

});
