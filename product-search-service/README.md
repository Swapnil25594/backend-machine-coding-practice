# Product Search Service

A simple product search service implemented in Node.js that supports:

- keyword-based product search
- multi-keyword matching
- inverted index for faster lookup
- relevance-based ranking
- unit tests using Jest

## Features

### 1. Inverted Index
Builds an index of:

word -> product IDs

Example:

milk -> [1,2,3,4]
chocolate -> [2,3,4]

This improves search efficiency compared to scanning all products.

### 2. Multi-keyword Search
Supports queries like:

Chocolate Milk

Returns products containing all keywords.

### 3. Ranking
Results are ranked based on:

query length / product name length

Higher relevance score appears first.

## Tech Stack

- Node.js
- JavaScript
- Jest

## Run Tests

npm test