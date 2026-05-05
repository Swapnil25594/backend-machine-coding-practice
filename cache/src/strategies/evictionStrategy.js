class EvictionStrategy {

    get(key) {
        throw new Error("get() is not implemented");
    }

    put(key, value, options = {}) {
        throw new Error("put() is not implemented");
    }

}

module.exports = EvictionStrategy;