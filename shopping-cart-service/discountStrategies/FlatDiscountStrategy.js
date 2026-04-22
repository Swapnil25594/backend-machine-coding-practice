const DiscountStrategy = require("./discountStragey");

class FlatDiscountStrategy extends DiscountStrategy {
    constructor(amount){
        super();
        this.amount = amount;
    }

    apply(total){
        return total - this.amount;
    }

}

module.exports = FlatDiscountStrategy;