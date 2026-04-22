const CartItem = require("../models/CartItem");

class CartService {


    constructor(productRepo, cartRepo) {
        this.productRepo = productRepo;
        this.cartRepo = cartRepo;
    }

    addItem(cartId, productId, qty) {
        const cart = this.cartRepo.findById(cartId);
        const product = this.productRepo.findById(productId);

        if (!cart || !product) throw new Error('Cart or Product not found');
        if (qty > product.stock) throw new Error("Insufficient stock");

        const existingItem = cart.items.get(productId);
        if (existingItem) {
            existingItem.qty += qty;
        } else {
            cart.items.set(productId, new CartItem(product, qty));
        }

        this.cartRepo.save(cart);
    }

    removeItem(cartId, productId) {
        const cart = this.cartRepo.findById(cartId);
        if (!cart) throw new Error('Cart not found');

        cart.items.delete(productId);
        this.cartRepo.save(cart);
    }

    getTotal(cartId) {
        const cart = this.cartRepo.findById(cartId);
        if (!cart) throw new Error('Cart not found');

        let total = 0;
        for (const item of cart.items.values()) {
            total += item.getTotal();
        }

        if (cart.discountStrategy) {
            return cart.discountStrategy.apply(total)
        }
        return total;
    }

    applyDiscount(cartId, strategy) {
        const cart = this.cartRepo.findById(cartId);
        if (!cart) throw new Error('Cart not found');

        cart.discountStrategy = strategy;
        this.cartRepo.save(cart);
    }
}

module.exports = CartService