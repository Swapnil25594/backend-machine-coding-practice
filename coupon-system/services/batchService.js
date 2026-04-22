const dataStore = require("../store");
const { parseDate, todayUTC, DATE_MIN, DATE_MAX } = require("../utils");


const VALID_STATES = new Set(['CREATED', 'APPROVED', 'ACTIVE', 'EXPIRED', 'SUSPENDED', 'TERMINATED']);


const ALLOWED_TRANSITIONS = {
    CREATED: new Set(['APPROVED', 'TERMINATED']),
    APPROVED: new Set(['ACTIVE', 'TERMINATED']),
    ACTIVE: new Set(['SUSPENDED', 'EXPIRED', 'TERMINATED']),
    SUSPENDED: new Set(['ACTIVE', 'TERMINATED']),
    EXPIRED: new Set([]),
    TERMINATED: new Set([])
};

function isValidTransition(from, to) {
    if (!VALID_STATES.has(from) || !VALID_STATES.has(to)) return false;
    return ALLOWED_TRANSITIONS[from] && ALLOWED_TRANSITIONS[from].has(to);
}

const BatchService = {
    createBatch({ batchId, distributor, couponType, startDateStr, endDateStr, maxAllowedGrants, overBookingPer }) {
        const validateREQ = this._createBatchValidations({ batchId, distributor, couponType, startDateStr, endDateStr, maxAllowedGrants, overBookingPer })
        if (validateREQ === 'INVALID_REQUEST') return 'INVALID_REQUEST';

        const batch = {
            batchId,
            distributor,
            couponType,
            startDate: parseDate(startDateStr),
            endDate: parseDate(endDateStr),
            maxAllowedGrants,
            batchState: 'CREATED',
            ingestedCodes: [],     // queue of codes (for CLOSED)
            grantedCount: 0,     // OPEN Coupon track,
            overBookingPer, 
            reedemedCounter : 0
        }
        dataStore.batches.set(batchId, batch);
        return `Batch created: ${batchId}`;
    },

    updateState(batchId, newState) {
        const batch = dataStore.batches.get(batchId) || null;
        if (!batch) return 'INVALID_BATCH';
        if (!VALID_STATES.has(newState)) return 'INVALID_TRANSITION';

        if (newState === 'TERMINATED') {
            if (batch.batchState === 'EXPIRED' || batch.batchState === 'TERMINATED') {
                return 'INVALID_TRANSITION';
            }
            batch.batchState = 'TERMINATED';
            return `State updated: ${batchId} -> ${newState}`;
        }

        if (!isValidTransition(batch.batchState, newState)) return 'INVALID_TRANSITION';

        batch.batchState = newState;
        return `State updated: ${batchId} -> ${newState}`;
    },

    getBatch(batchId) {
        const batch = dataStore.batches.get(batchId) || null;
        if (!batch) return 'INVALID_BATCH';
        this._autoExpireIfNeeded(batch);
        return `Batch: ${batch.batchId}, Distributor: ${batch.distributor}, Type: ${batch.couponType}, State: ${batch.batchState}`;
    },

    ingestCoupons(batchId, couponCodes) {
        const batch = dataStore.batches.get(batchId) || null;
        if (!batch) return 'INVALID_BATCH';
        if (!Array.isArray(couponCodes) || couponCodes.length === 0) return 'Coupons ingested: 0';

        for (const code of couponCodes) {
            if (!code || code.length > 50) continue;
            batch.ingestedCodes.push(code);
        }
        return `Coupons ingested: ${couponCodes.length}`;
    },

    getCouponsCount(batchId) {
        const batch = dataStore.batches.get(batchId) || null;
        if (!batch) return 'INVALID_BATCH';
        if (batch.couponType === 'CLOSED') {
            return `Remaining coupons: ${batch.ingestedCodes.length}`;
        } else {
            const remaining = batch.maxAllowedGrants - batch.grantedCount;
            return `Remaining coupons: ${Math.max(0, remaining)}`;
        }
    },

    _autoExpireIfNeeded(batch) {
        // If batch is ACTIVE and today's date > endDate -> mark EXPIRED
        const today = todayUTC();
        if (batch.batchState === 'ACTIVE' && today > batch.endDate) {
            batch.batchState = 'EXPIRED';
        }
    },

    _createBatchValidations({ batchId, distributor, couponType, startDateStr, endDateStr, maxAllowedGrants, overBookingPer }) {
        // duplicate 
        if (dataStore.batches.has(batchId)) return 'INVALID_REQUEST';
        // date check
        const startDate = parseDate(startDateStr);
        const endDate = parseDate(endDateStr);
        if (!startDate || !endDate || (startDate > endDate ||
            (startDate < DATE_MIN || endDate > DATE_MAX))) return 'INVALID_REQUEST';
        // maxAllowedCount for OPEN
        if (couponType === 'OPEN') {
            if (maxAllowedGrants === null) return 'INVALID_REQUEST';
            if (!Number.isInteger(maxAllowedGrants) || maxAllowedGrants < 1 || maxAllowedGrants > 10000) return 'INVALID_REQUEST';
        }

        //batchid, distributor check
        if (!batchId || batchId.length > 50 || !distributor) return 'INVALID_REQUEST';

        // over booking validation
        if (!(overBookingPer >= 0 && overBookingPer <= 100)) return 'INVALID_REQUEST';

        return 'VALID_REQUEST'
    }
}

module.exports = BatchService