'use strict';

var jsdom = require('jsdom');
var isUrl = require('is-url');
var htmlTags = require('html-tags');
var normalizeUrl = require('normalize-url');
var isPresent = require('is-present');

module.exports = function domStats(urlOrHtml, options, callback) {
  if (typeof urlOrHtml != 'string') {
    throw new TypeError('dom-stats expected a string');
  }

  options = options || {};
  callback = callback || function() {};

  var jsdomOptions = {
    done: function(error, window) {
      var stats = analyzeDom(error, window, options);
      callback(error, stats);
    }
  }

  if (isUrl(urlOrHtml)) {
    jsdomOptions.url = urlOrHtml;
  } else {
    jsdomOptions.html = urlOrHtml;
  }

  jsdom.env(jsdomOptions);
}

function analyzeDom(error, window, options) {
  options = options || {};

  var stats = {
    totalTags: 0,
    totalClasses: 0,
    totalIds: 0,
    averageClassCount: 0,
    duplicateIds: [],
    duplicateIdsCount: 0,
    tagCounts: {}
  };

  var ids = {};
  var classes = {};

  htmlTags.forEach(function(tag) {
    var tags = window.document.getElementsByTagName(tag);
    var tagCount = tags.length;

    if (options.ignoreZeroCounts && tagCount == 0) {
      return;
    }

    stats.totalTags += tagCount;
    stats.tagCounts[tag] = tagCount;

    [].slice.call(tags).forEach(function(tag) {
      // Get class statistics
      var classList = (tag.getAttribute('class') || '').split(/\s+/);
      if (isPresent(classList)) {
        stats.totalClasses += classList.length;
      }

      if (isPresent(tag.id)) {
        if (ids[tag.id]) {
          ids[tag.id]++;
        } else {
          ids[tag.id] = 1;
        }
      }
    });
  });

  // Create additional id statistics
  Object.keys(ids).forEach(function(id) {
    stats.totalIds += ids[id];
    if (ids[id] > 1) {
      stats.duplicateIds.push(id);
      stats.duplicateIdsCount++;
    }
  });

  if (stats.totalTags) {
    stats.averageClassCount = stats.totalClasses/stats.totalTags;
  }

  return stats;
}
