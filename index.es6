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
const promises = new WeakMap()
const onErrors = new WeakMap()

/**
 * AutoQ class
 */
module.exports = class AutoQ {

    constructor(onError) {
        promises.set(this, new Promise(cb => cb(null)))
        onErrors.set(this, onError instanceof Function ? onError : () => {})
    }

    /**
     * Adds callbacks to queue.
     * Supply functions with the signiture:
     *   function (argument, callback) {}.
     * @param next
     * @return void
     */
    add(next) {
        promises.set(
            this,
            promises
                .get(this)
                .then(arg => new Promise(cb => next(arg, cb)))
                .catch(onErrors.get(this))
        )
    }

}
