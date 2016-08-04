"use strict"

/**
 * AutoQ
 * Automatic, dynamic callback queue.
 *
 * @version 0.3.1
 * @author Kyle Edwards <edwards.kyle.a@gmail.com>
 * @license MIT
 */

/**
 * WeakMap to privately store Promise objects for each
 * instantiation of AutoQ.
 */
var promises = new WeakMap()
var onErrors = new WeakMap()

/**
 * AutoQ class
 */
function AutoQ(onError) {
    promises.set(
        this,
        new Promise(function (cb) {
            return cb(null)
        })
    )
    if (onError instanceof Function) {
        onErrors.set(this, onError)
    } else {
        onErrors.set(this, function () {})
    }
}

/**
 * Adds callbacks to queue.
 * Supply functions with the signiture:
 *   function (argument, callback) {}.
 * @param next
 * @return void
 */
AutoQ.prototype.add = function add(next) {
    promises.set(
        this,
        promises
            .get(this)
            .then(function (arg) {
                return new Promise(function (cb) {
                    return next(arg, cb)
                })
            })
            .catch(onErrors.get(this))
    )
}

module.exports = AutoQ
