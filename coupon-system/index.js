const readline = require('readline');
const BatchService = require('./services/batchService.js');
const CouponService = require('./services/couponService.js');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

function handleLine(line) {
    if (!line || !line.trim()) return;
    const parts = line.trim().split(/\s+/);
    const cmd = parts[0];

    switch (cmd) {
        case 'CREATE_BATCH': {
            const [, batchId, distributor, couponType, startDate, endDate, maxAllowedGrantsStr] = parts;
            const maxAllowedGrants = maxAllowedGrantsStr ? parseInt(maxAllowedGrantsStr, 10) : undefined;
            const res = BatchService.createBatch({ batchId, distributor, couponType, startDateStr: startDate, endDateStr: endDate, maxAllowedGrants });
            console.log(res);
            break;
        }

        case 'UPDATE_STATE': {
            const [, batchId, newState] = parts;
            const res = BatchService.updateState(batchId, newState);
            console.log(res);
            break;
        }

        case 'GET_BATCH': {
            const [, batchId] = parts;
            const res = BatchService.getBatch(batchId);
            console.log(res);
            break;
        }

        case 'INGEST_COUPONS': {
            const [, batchId, ...codes] = parts;
            const res = BatchService.ingestCoupons(batchId, codes);
            console.log(res);
            break;
        }

        case 'GRANT_COUPON': {
            const [, batchId] = parts;
            const res = CouponService.grantCoupon(batchId);
            console.log(res);
            break;
        }

        case 'GET_COUPON': {
            const [, couponId] = parts;
            const res = CouponService.getCoupon(couponId);
            console.log(res);
            break;
        }

        case 'GET_COUPONS_COUNT': {
            const [, batchId] = parts;
            const res = BatchService.getCouponsCount(batchId);
            console.log(res);
            break;
        }

        default:
            console.log('UNKNOWN_COMMAND');
    }
}

console.log('Please enter commands in coupon system:-');
rl.on('line', handleLine);
