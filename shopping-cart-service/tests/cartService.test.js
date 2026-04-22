const FlatDiscountStrategy = require("../discountStrategies/flatDiscountStrategy");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const CartRepository = require("../repositories/CartRepository");
const ProductRepository = require("../repositories/ProductRepository");
const CartService = require("../services/CartService");


function setup(){
    const cartRepo = new CartRepository();
    const productRepo = new ProductRepository();

    cartRepo.save(new Cart("C1"));
    productRepo.save(new Product("P1", "Apple", 100, 10));
    productRepo.save(new Product("P2", "Banana", 50, 20));


    return new CartService(productRepo, cartRepo);
}

test("Should add item to cart", ()=>{
    const cartSservice = setup();
    cartSservice.addItem("C1", "P1", 2);
    cartSservice.applyDiscount('C1', new FlatDiscountStrategy(50));
    expect(cartSservice.getTotal("C1")).toBe(150);
})