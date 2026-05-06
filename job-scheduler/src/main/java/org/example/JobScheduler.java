package org.example;


import org.example.models.Job;

import java.util.*;

public class JobScheduler {
    private final Map<String, Job> jobMap;
    private final PriorityQueue<Job> heap;

    public JobScheduler() {
        this.jobMap = new HashMap<>();
        this.heap = new PriorityQueue<>(
                Comparator.comparingLong(j -> j.nextRunTime)
        );

    }

    public synchronized void schedule(Job job) {
        jobMap.put(job.id, job);
        heap.offer(job);
    }

    public synchronized void cancel(String jobId) {
        jobMap.remove(jobId);
        // lazy removal of heap
    }

    public void start() {
        new Thread(() -> {
            while (true) {
                try {
                    execute();
                    Thread.sleep(50);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }).start();
    }

    public synchronized void execute() {
        long now = System.currentTimeMillis();
        while (!heap.isEmpty() && heap.peek().nextRunTime <= now) {
            Job job = heap.poll();
            if (!jobMap.containsKey(job.id)) continue;
            try {
                job.task.run();
                jobMap.remove(job.id);
            } catch (Exception e) {
                // try retry here
              if(job.retryCount < job.maxRetries){
                job.retryCount++;
                job.nextRunTime += job.backoffMillis;
                heap.offer(job);
              }else{
                jobMap.remove(job.id);
              }
            }
        }
    }
}