class RateLimiterTokenBucket {
    constructor(limit, windowMs) {
        this.limit = limit;
        this.refillPerSec = windowMs;
        this.bucket = new Map(); // userid -> {tokens, lastRefill}
    }

       getBucket(userId) {
        const bucket = this.bucket.get(userId);
        if (!bucket) {
            this.bucket.set(userId, {
                tokens: this.limit,
                lastRefill: Date.now()
            })
        }
        return this.bucket.get(userId);
    }

    refill(bucket) {
        const now = Date.now();
        const elapsedSec = (now - bucket.lastRefill) / 1000;
        bucket.tokens = Math.min(this.limit, bucket.tokens + elapsedSec * this.refillPerSec)
        bucket.lastRefill = now;
        console.log(bucket)
    }

    allow(userId) {

        const bucket = this.getBucket(userId);

        this.refill(bucket);

        while (bucket.tokens >= 1) {
            bucket.tokens -= 1;
            return true;
        }

        return false;
    }

}

module.exports = RateLimiterTokenBucket