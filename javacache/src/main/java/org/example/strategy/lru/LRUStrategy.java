package org.example.strategy.lru;



import org.example.strategy.EvictionStrategy;
import org.example.strategy.StrategyOptions;

import java.util.HashMap;

public class LRUStrategy implements EvictionStrategy {

    private int capacity;
    private HashMap<Integer, Node> map;
    private DoublyLinkedList list;

    public LRUStrategy(int capacity) {
        this.capacity = capacity;
        this.map = new HashMap<>();
        this.list = new DoublyLinkedList();
    }

    @Override
    public int get(int key) {
        if (!map.containsKey(key)) {
            return -1;
        }
        Node n = map.get(key);
        list.addToFront(n);
        return n.value;
    }

    @Override
    public void put(int key, int value, StrategyOptions options) {
        if (map.containsKey(key)) {
            Node n = map.get(key);
            n.value = value;
            map.put(key, n);
            list.addToFront(n);
            return;
        }

        // eviction
        if (capacity <= map.size()) {
            Node lru = list.removeLRU();
            if (lru != null) {
                map.remove(lru.key);
            }
        }

        Node n = new Node(key, value);
        map.put(key, n);
        list.addToFront(n);
    }
}
