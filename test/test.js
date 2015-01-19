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

  it('should return the stats for an HTML string', function() {
    domStats(fixture('furtive.html'), {}, function(error, stats) {
      assert.ok(isPresent(stats));
      assert.equal(stats.tagCounts.p, 21);
      assert.equal(stats.tagCounts.li, 12);
      assert.equal(stats.tagCounts.video, 0);
    });
  });

  it('should skip zero counts if the option is passed', function() {
    domStats(fixture('furtive.html'), { ignoreZeroCounts: true }, function(error, stats) {
      assert.equal(stats.tagCounts.video, undefined);
    });
  });

  it('should return id statistics', function() {
    domStats(fixture('furtive.html'), {}, function(error, stats) {
      assert.deepEqual(stats.duplicateIds, ['grid']);
      assert.equal(stats.duplicateIdsCount, 1);
      assert.equal(stats.totalIds, 17);
    });
  });

  it('should return class statistics', function() {
    domStats(fixture('furtive.html'), {}, function(error, stats) {
      assert.equal(stats.totalClasses, 415);
      assert.equal(Math.round(stats.averageClassCount), 2);
    });
  });
});

function fixture(name) {
  return fs.readFileSync('test/fixtures/' + name, 'utf8').trim();
}
