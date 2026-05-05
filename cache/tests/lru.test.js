const Cache = require("../src/cache");
const LRUStrategy = require("../src/strategies/lru/lruStrategy")


test('basic put/get', () => {
    const cache = new Cache(new LRUStrategy(5));
    cache.put(1, 10);
    cache.put(2, 20);

    expect(cache.get(1)).toBe(10);
    expect(cache.get(2)).toBe(20);
})

test('eviction works', () => {
    const cache = new Cache(new LRUStrategy(2));
    cache.put(1, 10);
    cache.put(2, 20);
    cache.put(3, 30);
    cache.put(4, 40);

    expect(cache.get(1)).toBe(-1);
    expect(cache.get(2)).toBe(-1);
    expect(cache.get(3)).toBe(30);
})

test('update existing key', () => {
    const cache = new Cache(new LRUStrategy(2));
    cache.put(1, 10);
    cache.put(1, 20);

    expect(cache.get(1)).toBe(20);
})
