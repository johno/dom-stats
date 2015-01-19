'use strict';

var jsdom = require('jsdom');
var isUrl = require('is-url');
var htmlTags = require('html-tags');
var normalizeUrl = require('normalize-url');

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
    tagCounts: {}
  };

  htmlTags.forEach(function(tag) {
    var tagCount = window.document.getElementsByTagName(tag).length;
    if (options.ignoreZeroCounts && tagCount == 0) {
      return;
    }

    stats.totalTags += tagCount;
    stats.tagCounts[tag] = window.document.getElementsByTagName(tag).length
  });

  return stats;
}
