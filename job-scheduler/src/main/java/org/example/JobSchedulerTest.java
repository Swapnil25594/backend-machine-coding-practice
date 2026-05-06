package org.example;

import org.example.models.Job;

public class JobSchedulerTest  {

    public static void main(String[] args){
        JobScheduler scheduler = new JobScheduler();
        scheduler.start();

        Job job1 = new Job("job1",()->System.out.println("Job1 executed"),1000,2,500);

        Job job2 = new Job("job2",()->{System.out.println("Failing Job2 "); throw new RuntimeException();},1000,3,1000);

        scheduler.schedule(job1);
        scheduler.schedule(job2);
    }
}
