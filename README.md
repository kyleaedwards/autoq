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
