package org.example.strategy.lru;

public class DoublyLinkedList {

    private Node head;
    private Node tail;

    public DoublyLinkedList() {
        head = new Node(-1, -1);
        tail = new Node(-1, -1);

        head.next = tail;
        tail.prev = head;
    }

    public void addToFront(Node node) {
        node.next = head.next;
        node.next.prev = node;
        head.next = node;
        node.prev = head;

    }

    public void removeNode(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    public Node removeLRU() {
        Node lru = tail.prev;
        removeNode(lru);
        return lru;
    }

}
