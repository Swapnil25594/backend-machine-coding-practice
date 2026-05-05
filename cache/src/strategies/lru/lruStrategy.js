const EvictionStrategy = require("../evictionStrategy");
const DoublyLinkedList = require("./doublyLinkedList");
const Node = require("./node");

class LRUStrategy extends EvictionStrategy {
  constructor(capacity) {
    super();
    this.capacity = capacity;
    this.map = new Map();
    this.list = new DoublyLinkedList();
  }
  get(key) {
    if (!this.map.has(key)) return -1;
    const node = this.map.get(key);
    this._moveToFront(node);
    return node.value;
  }

  put(key, value) {
    if (this.map.has(key)) {
      const node = this.map.get(key);
      node.value = value;
      this._moveToFront(node);
      return;
    }

    this._evict(); // if needed

    const node = new Node(key, value);
    this.map.set(key, node);
    this.list.addToFront(node);
  }

  _evict() {
      if(this.map.size >= this.capacity){
        const lru = this.list.removeLRU();
        this.map.delete(lru.key);
      }
  }

  _moveToFront(node) {
    this.list.removeNode(node);
    this.list.addToFront(node);
  }
}

module.exports = LRUStrategy;