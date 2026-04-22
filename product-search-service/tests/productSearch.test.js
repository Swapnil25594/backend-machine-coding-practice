const ProductSearch = require("../Services/ProductSearch");


function setup() {
    const products = [
        { id: 1, name: "Amul milk" },
        { id: 2, name: "Nandini Chocolate Milk" },
        { id: 3, name: "Milk Chocolate" },
        { id: 4, name: "Chocolate Milk" }
    ]
    const searchService = new ProductSearch();
    searchService.initialize(products);
    return searchService;
}

test("Search products", () => {
    const searchService = setup();
    const result =  searchService.search("Chocolate Milk");
    console.log(result);
    expect(result.length).toBe(3);
})

test("Search products", () => {
    const searchService = setup();
    const result =  searchService.search("Milk");
    console.log(result);
    expect(result.length).toBe(4);
})

test("Search Not Found", () => {
    const searchService = setup();
    const result =  searchService.search("Abc");
    console.log(result);
    expect(result.length).toBe(0);
})