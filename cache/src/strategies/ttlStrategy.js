const EvictionStrategy = require("./evictionStrategy");

class TTLStrategy extends EvictionStrategy {
    constructor() {
        super();
        this.map = new Map(); // key,{value, expiry}
        this.heap = []; // [[expiry, key], ...]
    }

    get(key) {
        this._cleanup();
        if (!this.map.has(key)) return -1;
        const { value } = this.map.get(key);
        return value;
    }

    put(key, value, options = {}) {
        const { ttl } = options;

        if (ttl === undefined) {
            throw new Error("TTL required");
        }
        const expiry = this._now() + ttl;
        this.map.set(key, { value, expiry });
        this._heapPush([expiry, key]);
        this._cleanup();
    }

    _now() {
        return Date.now();
    }

    _cleanup() {
        while (this.heap.length && this.heap[0][0] <= this._now()) {
            const [expiry, key] = this._heapPop();
            if (this.map.has(key) && expiry === this.map.get(key).expiry) {
                this.map.delete(key)
            }
        }
    }

    _heapPush(item) { // item - [expiry, key]
        this.heap.push(item);
        this.heap.sort((a, b) => a[0] - b[0]);
    }
    _heapPop() {
        return this.heap.shift();
    }
}

module.exports = TTLStrategy