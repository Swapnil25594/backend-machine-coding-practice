package org.example;

import org.example.strategy.EvictionStrategy;
import org.example.strategy.StrategyOptions;

public class Cache {
    private  final EvictionStrategy strategy;

    public Cache(EvictionStrategy strategy){
        this.strategy = strategy;
    }

    public int get(int key){
        return  this.strategy.get(key);
    }

    public  void put(int key, int value, StrategyOptions options){
        this.strategy.put(key, value, options);
    }
}