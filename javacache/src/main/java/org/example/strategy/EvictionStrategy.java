package org.example.strategy;

public interface EvictionStrategy {

    int get(int key);
    void put(int key, int value, StrategyOptions options);
}
