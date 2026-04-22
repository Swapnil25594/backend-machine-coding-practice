const DiscountStrategy = require("./discountStragey");

class PercentageStrategy extends DiscountStrategy {

    constructor(percent) {
        super();
        this.percent = percent;
    }

    apply(total) {
        return total - total * (this.percent / 100)
    }
}

module.exports = PercentageStrategy