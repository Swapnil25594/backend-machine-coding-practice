class RateLimiter {
    constructor(limit, windowMs) {
        this.limit = limit;
        this.windowMs = windowMs;
        this.requests = new Map(); // userid -> []
    }

    allow(userId) {
        const now =  Date.now();
        if (!this.requests.get(userId)) {
            this.requests.set(userId, [])
        }
        const timestamps = this.requests.get(userId);

        while (timestamps.length > 0 && now - timestamps[0] >= this.windowMs) {
            timestamps.shift();
        }

        if (timestamps.length >= this.limit) {
            return false;
        }
        timestamps.push(now);
        this.requests.set(userId,timestamps);
        return true;
    }
}

module.exports = RateLimiter