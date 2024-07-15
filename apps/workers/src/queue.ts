import { Queue } from "bullmq";
import { WorkflowType } from "./types";
import { connection } from "./base/redis";
import type { ExampleJobData } from "./jobs/example-worker";

export const queues = {
    [WorkflowType.ExampleJob]: new Queue<ExampleJobData>(WorkflowType.ExampleJob, {
        connection,
    }),
};
