const DATE_MIN = new Date('2020-01-01');
const DATE_MAX = new Date('2030-12-31');

function parseDate(yyyyMmDd) {
    const parts = yyyyMmDd.split('-').map(Number);
    const d = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));

    return d;
}

function formatCouponId(n) {
    // C001, C002, ...
    return 'C' + String(n).padStart(3, '0');
}

function todayUTC() {
    const now = new Date();
    return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

module.exports = { DATE_MIN, DATE_MAX, parseDate, formatCouponId, todayUTC }
