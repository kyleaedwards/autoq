/**
 * AutoQ
 * Automatic, dynamic callback queue.
 *
 * @version 0.2.2
 * @author Kyle Edwards <edwards.kyle.a@gmail.com>
 * @license MIT
 */

/**
 * WeakMap to privately store Promise objects for each
 * instantiation of AutoQ.
 */
var promises = new WeakMap()

/**
 * AutoQ class
 */
module.exports = class AutoQ {

    /**
     * Adds callbacks to queue.
     * Supply functions with the signiture:
     *   function (argument, callback) {}.
     * If a failure callback is not supplied, success
     * will be called under all circumstances.
     *
     * @param next
     * @return AutoQ instance
     */
    add(next) {
        var currentPromise = promises.get(this)
        if (currentPromise) {
            currentPromise = currentPromise.then(arg => new Promise(curry(next, arg)))
        } else {
            currentPromise = new Promise(curry(next, null))
        }
        promises.set(this, currentPromise)
        return this
    }

}

/**
 * Helper function to curry the supplied argument in order
 * to resolve the supplied handler to fit the Promise spec.
 */
function curry(f, arg) { return res => f(arg, res) }
