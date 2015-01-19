var isPresent = require('is-present');
var fs = require('fs');
var assert = require('assert');
var domStats = require('..');

describe('dom-stats', function() {

  it('should return the stats for a url', function() {
    domStats('google.com', {}, function(error, stats) {
      assert.ok(isPresent(stats));
    });
  });

  it('should return the stats for an HTML stats', function() {
    domStats(fixture('furtive.html'), {}, function(error, stats) {
      assert.ok(isPresent(stats));
      assert.equal(stats.p, 21);
      assert.equal(stats.li, 12);
      assert.equal(stats.video, 0);
    });
  });

  it('should skip zero counts if the option is passed', function() {
    domStats(fixture('furtive.html'), { ignoreZeroCounts: true }, function(error, stats) {
      assert.equal(stats.video, undefined);
    });
  });
});

function fixture(name) {
  return fs.readFileSync('test/fixtures/' + name, 'utf8').trim();
}
