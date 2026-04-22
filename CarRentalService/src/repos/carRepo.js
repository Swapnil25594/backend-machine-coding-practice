const Car = require("../models/car");


const store = new Map();
const idGen = (() => { let i = 1; return () => (i++).toString() })();


function create({ branchId,carType, registrationNo }) {
    const id = idGen();
    const c = new Car({ id, branchId,carType, registrationNo });
    store.set(id, c);
    return c;
}

function get(id) {
    return store.get((id).toString());
}

function list() {
    return Array.from(store.values());
}

module.exports = {create, get, list};