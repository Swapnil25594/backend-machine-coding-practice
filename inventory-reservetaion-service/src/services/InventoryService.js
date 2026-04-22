const Inventory = require("../models/Inventory");

class InventoryService {
    constructor(inventoryRepo) {
        this.inventoryRepo = inventoryRepo;
    }


    addStock(productId, qty) {
        const item = this.inventoryRepo.findByProductId(productId);

        if (!item) {
            item = new Inventory(productId);
        }
        item.totalStock += qty;
        this.inventoryRepo.save(item)
    }


    reserveStock(productId, qty) {
        const item = this.inventoryRepo.findByProductId(productId);
        if (!item) throw new Error("Inventory not found");
        if (item.getAvailability() < qty) {
            throw new Error("Insufficient Stock");
        }

        item.reservedStock += qty;
        this.inventoryRepo.save(item);
    }

    releaseStock(productId, qty) {
        const item = this.inventoryRepo.findByProductId(productId);
        if (!item) throw new Error("Inventory not found");

        if (item.reservedStock < qty) throw new Error("Can not release more than reserved stock");

        item.reservedStock -= qty;
        this.inventoryRepo.save(item);
    }

    getAvailableStock(productId) {
        console.log(this.inventoryRepo)
        const item = this.inventoryRepo.findByProductId(productId);
        if (!item) throw new Error("Inventory not found");

        return item.getAvailability();
    }
}

module.exports = InventoryService;