# dom-stats [![Build Status](https://secure.travis-ci.org/johnotander/dom-stats.png?branch=master)](https://travis-ci.org/johnotander/dom-stats)

Parse and return statistics for an HTML page.

## Installation

```bash
npm install --save dom-stats
```

## Usage

```javascript
var domStats = require('dom-stats')

domStats('google.com', function(err, stats) {
  console.log(stats);
  // {
  //   totalTags: 75,
  //   totalClasses: 145,
  //   totalIds: 17,
  //   averageClassCount: 1.933333,
  //   duplicateIds: [],
  //   duplicateIdsCount: 0,
  //   tagCounts: { a: 12, div: 36, p: 4 }
  // }
})
```

## License

MIT

## Thanks to the following

* <https://github.com/tmpvar/jsdom>

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

Crafted with <3 by [John Otander](http://johnotander.com) ([@4lpine](https://twitter.com/4lpine)).
