/*
 * This file contains the supported services to get share counts
 * Each service has its own way to build an endpoint which will be
 * called by an http client
 *
 * The parser will try to get the counts by returning a number or an Error
 * if it cannot return a number.
 *
 */

const FACEBOOK_API = 'http://graph.facebook.com/?id=%s';
const PINTEREST_API = 'http://api.pinterest.com/v1/urls/count.json?callback=c&url=%s';
const LINKEDIN_API = 'http://www.linkedin.com/countserv/count/share?format=json&url=%s';
const GOOGLEPLUS_API = 'https://clients6.google.com/rpc?key=AIzaSyCKSbrvQasunBoV16zDH9R33D88CeLr9gQ';

var services = {
  facebook: {
    method: 'GET',
    buildEndpoint: function(url) {
      return FACEBOOK_API.replace('%s', url);
    },
    parseCount: function(resp) {
      try {
        resp = JSON.parse(resp);
      } catch(err) {
        return err;
      }

      return resp.shares || 0;
    }
  },
  pinterest: {
    method: 'GET',
    buildEndpoint: function(url) {
      return PINTEREST_API.replace('%s', url);
    },
    parseCount: function(resp) {
      resp = resp.substr(2, resp.length - 3);
      try {
        resp = JSON.parse(resp);
      } catch(err) {
        return err;
      }

      return resp.count || 0;
    }
  },
  linkedin: {
    method: 'GET',
    buildEndpoint: function(url) {
      return LINKEDIN_API.replace('%s', url);
    },
    parseCount: function(resp) {
      try {
        resp = JSON.parse(resp);
      } catch(err) {
        return err;
      }

      return resp.count || 0;
    }
  },
  googleplus: {
    method: 'POST',
    buildEndpoint: function() {
      return GOOGLEPLUS_API;
    },
    buildPostBody: function(url) {
      return [{
        "method": "pos.plusones.get",
        "id": "p",
        "params":{
          "nolog": true,
          "id": url,
          "source": "widget",
          "userId": "@viewer",
          "groupId": "@self"
        },
        "jsonrpc": "2.0",
        "key": "p",
        "apiVersion": "v1"
      }];
    },
    parseCount: function(resp) {
      try {
        resp = JSON.parse(resp);
      } catch(err) {
        return err;
      }
      if (!resp || !resp[0] || !resp[0].result) {
        return new Error('The google plus api did not return a result');
      }
      resp = resp[0].result.metadata;
      return resp.globalCounts && resp.globalCounts.count || 0;
    }
  }
};

module.exports = services;
