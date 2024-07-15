import type { Job } from "bullmq";

export interface ExampleJobData {
    text: string;
}

export async function exampleJob(job: Job<ExampleJobData>) {
    console.log("Job " + job);
}
