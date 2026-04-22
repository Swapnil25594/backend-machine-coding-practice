class InventoryRepo {
    constructor() {
        this.inventory = new Map();
    }

    save(inventory) {
        this.inventory.set(inventory.productId, inventory);
    }

    findByProductId(productId) {
      return this.inventory.get(productId);
    }
}

module.exports = InventoryRepo