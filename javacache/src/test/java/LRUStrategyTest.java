import org.example.Cache;
import org.example.strategy.lru.LRUStrategy;
import org.junit.jupiter.api.Test;


import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class LRUStrategyTest {

    @Test
    public void simpletest(){
        Cache c = new Cache(new LRUStrategy(2));
        c.put(1,1000, null);
        c.put(2, 2000, null);
        assertEquals(1000, c.get(1));
        assertEquals(2000, c.get(2));
    }

    @Test
    public void  testEviction(){
        Cache c = new Cache(new LRUStrategy(2));
        c.put(1,1000, null);
        c.put(2, 2000, null);
        c.put(3, 3000, null);
        assertEquals(-1, c.get(1));
    }

    @Test
    public void  updateKey(){
        Cache c = new Cache(new LRUStrategy(2));
        c.put(1,1000, null);
        c.put(1, 2000, null);
        assertEquals(2000, c.get(1));
    }

}
