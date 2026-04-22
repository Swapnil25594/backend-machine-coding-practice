# Inventory Reservation Service

A simple inventory reservation service implemented in Node.js.

The service allows products to be added with available stock and supports reserving stock while preventing over-reservation.

## Features

- Add product inventory
- Reserve stock for a product
- Prevent reservations beyond available stock
- Track available and reserved quantities
- Unit tests using Jest

## Reservation Flow

### 1. Add Inventory
Products are initialized with:

- available quantity
- reserved quantity

Example:

Product P1:
available = 10
reserved = 0

---

### 2. Reserve Stock
When stock is reserved:

- available quantity decreases
- reserved quantity increases

Example:

Reserve 3 units:

available = 7
reserved = 3

---

### 3. Validation
Reservation is rejected if requested quantity exceeds available stock.

Example:

available = 5
reserve request = 8

Result: reservation failed

---

## Design Considerations

### In-Memory Storage
Inventory is stored in memory using a map:

productId -> inventory state

This is sufficient for the coding exercise.

### Atomicity
Reservation updates available and reserved stock together to maintain consistency.

In a production system, this would require:

- database transactions
- row-level locking
- optimistic locking

to avoid concurrent over-reservation.

### Scalability
For distributed systems, inventory state should be managed in:

- SQL database with transactions
- Redis with atomic operations

to ensure consistency across multiple instances.

## Tech Stack

- Node.js
- JavaScript
- Jest

## Run Tests

npm test