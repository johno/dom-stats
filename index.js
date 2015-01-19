'use strict';

var jsdom = require('jsdom');
var isUrl = require('is-url');
var normalizeUrl = require('normalize-url');

module.exports = function domStats(urlOrHtml, callback) {
  if (typeof urlOrHtml != 'string') {
    throw new TypeError('dom-stats expected a string');
  }

  var jsdomOptions = {
    done: function(error, window) {
      var stats = analyzeDom(error, window);
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

function analyzeDom(error, window) {
  return { dom: 'stats' };
}
