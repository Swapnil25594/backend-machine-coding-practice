const Inventory = require("../models/Inventory");
const InventoryRepo = require("../repositories/InventoryRepo");
const InventoryService = require("../services/InventoryService");



function setup (){
    const inventoryRepo = new InventoryRepo();
    const product = new Inventory("P1");
    product.totalStock = 10;
    inventoryRepo.save(product);
    return new InventoryService(inventoryRepo);
}

test("Add stock", ()=>{
    const inventoryService =  setup();
    inventoryService.addStock("P1", 5);
    expect(inventoryService.getAvailableStock("P1")).toBe(15);
})

test("Reserve stock", ()=>{
    const inventoryService =  setup();
    inventoryService.reserveStock("P1", 8);
    expect(inventoryService.getAvailableStock("P1")).toBe(2);
})

test("release Stock ", ()=>{
    const inventoryService =  setup();
    inventoryService.reserveStock("P1", 8);
     inventoryService.releaseStock("P1", 4);
    expect(inventoryService.getAvailableStock("P1")).toBe(6);
})

test("reserve More than Available  ", ()=>{
    const inventoryService =  setup();
    
    expect(()=> inventoryService.reserveStock("P1", 20))
    .toThrow("Insufficient Stock")
})