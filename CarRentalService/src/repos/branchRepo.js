const Branch = require("../models/branch");


const store = new Map();
const idGen = (() => { let i = 1; return () => (i++).toString() })();


function create({ name, location, pricing }) {
    const id = idGen();
    const b = new Branch({ id, name, location, pricing });
    store.set(id, b);
    return b;
}

function get(id) {
    return store.get(id.toString());
}

function list() {
    return Array.from(store.values());
}

module.exports = {create, get, list};