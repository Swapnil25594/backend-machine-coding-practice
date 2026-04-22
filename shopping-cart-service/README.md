# Shopping Cart Service

A simple shopping cart service implemented in Node.js.

The service supports adding and removing products from a cart, calculating totals, and applying discount strategies.

## Features

- Add item to cart
- Remove item from cart
- Update item quantity
- Calculate cart total
- Apply discount strategies
- Unit tests using Jest

## Cart Flow

### 1. Add Item
Adds a product to the cart with quantity.

If the product already exists in the cart, quantity is updated.

Example:

Product P1:
price = 100
quantity = 2

Subtotal = 200

---

### 2. Remove Item
Removes the product from the cart.

### 3. Calculate Total
Cart total is calculated as:

sum of (price × quantity)

Example:

P1 = 100 × 2 = 200  
P2 = 50 × 1 = 50  

Total = 250

---

### 4. Apply Discounts
Discount logic is implemented using the Strategy Pattern.

Examples:

- Flat discount
- Percentage discount
- New user discount

This keeps pricing logic extensible without modifying cart logic.

## Design Considerations

### In-Memory Storage
Cart items are stored in memory for the coding exercise.

### Extensibility
Discount logic is separated using strategies, allowing new discount types to be added without changing the cart service.

This follows the Open/Closed Principle.

### Production Scalability
In a production system, cart data would be stored in:

- Redis for active carts
- Database for persistence

Pricing and discount rules would be fetched dynamically from persistent storage.

## Tech Stack

- Node.js
- JavaScript
- Jest

## Run Tests

npm test