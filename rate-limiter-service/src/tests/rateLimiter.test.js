
const RateLimiter = require("../services/RateLimiterSlidingW");
const RateLimiterTokenBucket = require("../services/RateLimiterTokenBucket");

jest.useFakeTimers();

test("Add requests", async () => {
    const rateLimiter = new RateLimiter(3, 60000);

    expect(rateLimiter.allow("U1")).toBe(true);
    expect(rateLimiter.allow("U1")).toBe(true);
    expect(rateLimiter.allow("U1")).toBe(true);

})



test("Add requests", async () => {
    const rateLimiter = new RateLimiterTokenBucket(3, 0.05);

    expect(rateLimiter.allow("U1")).toBe(true);
    expect(rateLimiter.allow("U1")).toBe(true);
    expect(rateLimiter.allow("U1")).toBe(true);

    jest.advanceTimersByTime(20000);
      expect(rateLimiter.allow("U1")).toBe(true);
})