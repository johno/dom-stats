# dom-stats

[![Build Status](https://secure.travis-ci.org/johnotander/dom-stats.png?branch=master)](https://travis-ci.org/johnotander/dom-stats)

_Currently under development_

Parse and return statistics for an HTML page.

## Installation

```bash
npm install --save dom-stats
```

## Usage

```javascript
var domStats = require('dom-stats');

domStats('google.com', function(err, stats) {
  console.log(stats);
});
```

## License

MIT

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

Crafted with <3 by [John Otander](http://johnotander.com) ([@4lpine](https://twitter.com/4lpine)).
