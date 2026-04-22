class ProductRepository {

    constructor() {
        this.products = new Map();
    }

    save(product) {
        this.products.set(product.id, product);
    }

    findById(productId) {
        return this.products.get(productId)
    }
}

module.exports = ProductRepository;