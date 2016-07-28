/**
 * AutoQ
 * Automatic, dynamic callback queue.
 *
 * @version 0.2.0
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
class AutoQ {

    /**
     * Adds callbacks to queue.
     * Supply functions with the signiture:
     *   function (argument, resolve, reject) {}.
     * If a failure callback is not supplied, success
     * will be called under all circumstances.
     *
     * @param success
     * @param failure
     * @return AutoQ instance
     */
    add(success, failure) {
        let currentPromise = promises.get(this)
        if (typeof failure !== 'function') failure = success
        if (currentPromise) {
            currentPromise = currentPromise.then((arg) => {
                return new Promise(curry(success, arg))
            }, (reason) => {
                return new Promise(curry(failure, reason))
            })
        } else {
            currentPromise = new Promise(curry(success, null))
        }
        promises.set(this, currentPromise)
        return this
    }

}

/**
 * Helper function to curry the supplied argument in order
 * to resolve the supplied success and failure handlers to
 * fit the Promise spec.
 */
function curry(f, arg) { return (res, rej) => f(arg, res, rej) }

module.exports = AutoQ
