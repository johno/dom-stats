var isPresent = require('is-present');
var assert = require('assert');
var domStats = require('..');

describe('dom-stats', function() {

  it('should return the stats for a url', function() {
    domStats('google.com', function(error, stats) {
      assert.ok(isPresent(stats));
    });
  });

  it('should return the stats for an HTML stats', function() {
    domStats('<body><img src="foo.jpg"></body>', function(error, stats) {
      assert.ok(isPresent(stats));
    });
  });
});
