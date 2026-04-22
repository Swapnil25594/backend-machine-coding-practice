const dataStore = require("../store");
const { formatCouponId, todayUTC } = require("../utils");

const CouponService = {
    grantCoupon(batchId) {
        //batch check
        const batch = dataStore.batches.get(batchId);
        if (!batch) return 'INVALID_BATCH';

        // auto-expire check
        const today = todayUTC();
        if (batch.batchState === 'ACTIVE' && today > batch.endDate) {
            batch.batchState = 'EXPIRED';
        }

        // check validity period
        if (batch.batchState !== 'ACTIVE' || (
            today < batch.startDate || today > batch.endDate
        )) return 'BATCH_NOT_ACTIVE';

        if (batch.couponType === 'CLOSED') {
            if (batch.ingestedCodes.length === 0) return 'BATCH_EXHAUSTED';
            const code = batch.ingestedCodes.shift();

            // create coupon id
            dataStore.globalCouponCounter += 1;
            const couponId = formatCouponId(dataStore.globalCouponCounter);

            const coupon = { couponId, couponCode: code, batchId: batch.batchId };
            dataStore.coupons.set(couponId, coupon);
            return `Coupon granted: ${couponId}`;
        } else {
            // OPEN
            if (batch.overBookingPer) {
                const maxCount = batch.maxAllowedGrants * (1 + batch.overBookingPer / 100);

                if (batch.reedemedCounter > batch.maxAllowedGrants) {
                    return 'MAX_GRANTS_REACHED';
                }
                if (batch.grantedCount >= maxCount) return 'MAX_GRANTS_REACHED';
            } else {
                if (batch.grantedCount >= batch.maxAllowedGrants) return 'MAX_GRANTS_REACHED';
            }

            //  generate a code using batchId + seq
            batch.grantedCount += 1;
            dataStore.globalCouponCounter += 1;
            const couponId = formatCouponId(dataStore.globalCouponCounter);
            const couponCode = `${batch.batchId}_G${batch.grantedCount}`;

            const coupon = { couponId, couponCode, batchId: batch.batchId };
            dataStore.coupons.set(couponId, coupon);
            return `Coupon granted: ${couponId}`;
        }
    },
    getCoupon(couponId) {
        const coupon = dataStore.coupons.get(couponId);
        if (!coupon) return 'COUPON_NOT_FOUND';
        return `Coupon: ${coupon.couponId}, Code: ${coupon.couponCode}, BatchId: ${coupon.batchId}`;
    },

    redeemCoupon(batchId, couponId) {
        const batch = dataStore.batches.get(batchId) || null;
        if (!batch) return 'INVALID_BATCH';

        const coupon = dataStore.coupons.get(couponId);
        if (!coupon) return 'COUPON_NOT_FOUND';

        batch.reedemedCounter++;
        return `Coupon ${couponId} is redeemed`
    }
}


module.exports = CouponService