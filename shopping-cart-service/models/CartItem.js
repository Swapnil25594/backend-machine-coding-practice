class CartItem {
    constructor(product, qty) {
        this.product = product;
        this.qty = qty;
    }

    getTotal(){
        return this.product.price * this.qty;
    }
}

module.exports = CartItem;