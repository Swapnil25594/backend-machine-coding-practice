class DiscountStrategy {
    apply(amount) {
        throw new Error("apply() must be implemented");
    }
}

module.exports = DiscountStrategy