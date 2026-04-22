class Inventory{
    constructor(productId, totalStock, reservedStock){
        this.productId = productId;
        this.totalStock = totalStock;
        this.reservedStock = reservedStock || 0; 
    }

    getAvailability(){
        return this.totalStock - this.reservedStock;
    }

}

module.exports = Inventory