export default class AutoQ {

    constructor() {
        this.length = 0
        this.offset = 0
        this.queue = []
        this.lock = null
    }

    run() {
        if (this.lock || !this.length) return
        this.lock = setTimeout(() => {
            let func = this.next()
            if (typeof func === 'function') {
                func(() => {
                    this.lock = null
                    this.run()
                })
            } else {
                this.lock = null
                this.run()
            }
        }, 0)
    }

    add(func) {
        this.length++
        this.queue.push(func)
        this.run()
    }

    next() {
        if (!this.length) return
        let func = this.queue[this.offset]
        this.offset++
        if (this.offset === this.length) {
            this.offset = 0
            this.length = 0
            this.queue = []
        }
        return func
    }

}
