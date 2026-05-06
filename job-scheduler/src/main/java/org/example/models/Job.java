package org.example.models;

public class Job {
    public String id;
    public Runnable task;

    public long nextRunTime;

    public int retryCount;
    public int maxRetries;

    public long backoffMillis;

    public Job(String id,
               Runnable task,
               long delay,
               int maxRetries,
               long backoffMillis) {

        this.id = id;
        this.task = task;

        this.nextRunTime = System.currentTimeMillis() + delay;

        this.retryCount = 0;
        this.maxRetries = maxRetries;
        this.backoffMillis = backoffMillis;
    }
}