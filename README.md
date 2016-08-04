# autoq

Simple automatic, dynamic callback queue for [node](http://nodejs.org).

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]

AutoQ lets you chain functions as you need to create them, without needing to juggle Promise objects manually. The main benefit is that you can provide a running asynchronous function with a callback you're generating dynamically (possibly in another asynchronous function).

## Installation

```bash
$ npm install autoq
```

## Usage

```js
const AutoQ = require('autoq')
const autoq = new AutoQ((err) => {
    console.log('Error during autoq: ', err)
})

autoq.add((arg, next) => {
    // Do something asynchronous.
    setTimeout(function () {
        console.log(arg) // null
        // Pass an argument to the next iteration.
        next(5)
    }, 500)
})

autoq.add((arg, next) => {
    setTimeout(function () {
        console.log(arg) // 5
        if (arg === 5) {
            // Will be caught by error handler provided
            // by the constructor.
            throw "I don't like the number 5."
        }
        next(arg + 1)
    }, 500)
})
```

## License

  [MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/autoq.svg
[npm-url]: https://npmjs.org/package/autoq
[downloads-image]: https://img.shields.io/npm/dm/autoq.svg
[downloads-url]: https://npmjs.org/package/autoq
