const Cache = require("../src/cache");
const TTLStrategy = require("../src/strategies/ttlStrategy");


describe('TTL Cache Tests', () => {

    beforeEach(() => {
        jest.useFakeTimers();
        jest.setSystemTime(0);
    })

    afterEach(() => {
        jest.useRealTimers();
    });

    test('basic put/get', () => {
        const cache = new Cache(new TTLStrategy());
        cache.put(1, 10, { ttl: 1000 });
        cache.put(2, 20, { ttl: 1000 });

        expect(cache.get(1)).toBe(10);
        expect(cache.get(2)).toBe(20);
    })

    test('eviction works', () => {
        const cache = new Cache(new TTLStrategy());
        cache.put(1, 10, { ttl: 1000 });
        cache.put(2, 20, { ttl: 1000 });

        jest.advanceTimersByTime(1001);

        expect(cache.get(1)).toBe(-1);
        expect(cache.get(2)).toBe(-1);
    })

    test("update resets ttl", () => {
        const cache = new TTLStrategy();

        cache.put(1, 100, {ttl:1000});

        jest.advanceTimersByTime(500);

        cache.put(1, 200, {ttl:1000}); // reset TTL

        jest.advanceTimersByTime(600);

        expect(cache.get(1)).toBe(200); // should still exist
    });

    // test('update existing key', () => {
    //     const cache = new Cache(new LRUStrategy(2));
    //     cache.put(1, 10);
    //     cache.put(1, 20);

    //     expect(cache.get(1)).toBe(20);
    // })
})



