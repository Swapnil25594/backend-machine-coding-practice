class Cache{
    constructor(strategy){
        this.strategy = strategy;
    }

    get(key){
       return this.strategy.get(key);
    }

    put(key, value, options={}){
        this.strategy.put(key, value, options);
    }
}

module.exports = Cache