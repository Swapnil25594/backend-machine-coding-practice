const Node = require("./node");

class DoublyLinkedList {
    constructor(){
        this.head = new Node(null, null);
        this.tail = new Node(null, null);
        this.head.next  = this.tail;
        this.tail.prev = this.head;
    }

    addToFront(node){
        node.next = this.head.next; 
        node.next.prev = node; 
        node.prev = this.head;
        this.head.next = node; 
    }

    removeNode(node){
      node.prev.next = node.next;
      node.next.prev = node.prev;
    }

    removeLRU(){
     const lru = this.tail.prev;
     this.removeNode(lru);
     return lru;
    }
}

module.exports = DoublyLinkedList;