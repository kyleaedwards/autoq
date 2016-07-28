# autoq

Simple automatic, dynamic callback queue for [node](http://nodejs.org).

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]

```js
var AutoQ = require('autoq')
var autoq = new AutoQ()

autoq.add(function (next) {
    // Perform asynchronous code.
    next()
})
```

## Installation

```bash
$ npm install autoq
```

## License

  [MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/autoq.svg
[npm-url]: https://npmjs.org/package/autoq
[downloads-image]: https://img.shields.io/npm/dm/autoq.svg
[downloads-url]: https://npmjs.org/package/autoq
