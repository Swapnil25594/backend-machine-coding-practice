class CartRepository {
    constructor() {
        this.carts = new Map();
    }

    save(cart) {
        this.carts.set(cart.id, cart);
    }

    findById(cartId) {
        return this.carts.get(cartId);
    }
}

module.exports = CartRepository