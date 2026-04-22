class Cart{
    constructor(id){
        this.id = id;
        this.items = new Map();
        this.discountStrategy = null;
    }
}


module.exports = Cart;