const Booking = require("../models/booking");


const store = new Map();
const idGen = (() => { let i = 1; return () => (i++).toString() })();


function create({ carId,userId, startTime, endTime, price }) {
    const id = idGen();
    const b = new Booking({ id,  carId,userId, startTime, endTime, price });
    store.set(id, b);
    return b;
}

function get(id) {
    return store.get((id).toString());
}

function list() {
    return Array.from(store.values());
}

module.exports = {create, get, list};