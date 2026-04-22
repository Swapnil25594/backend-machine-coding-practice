class Branch{
    constructor({id, name, location, pricing}){
        this.id = id;
        this.name = name;
        this.location = location;
        this.pricing = pricing || {};
        this.carIds = new Set();
    }
}

module.exports = Branch;