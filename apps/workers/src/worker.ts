import { Job, Worker } from "bullmq";
import { serializeError } from "serialize-error";

import { WorkflowType } from "./types";
import { connection } from "./base/redis";

import { ExampleJobData, exampleJob } from "./jobs/example-worker";

export function initWorkers() {
    const workers: { [key in WorkflowType]: Worker } = {
        [WorkflowType.ExampleJob]: new Worker<ExampleJobData>(WorkflowType.ExampleJob, exampleJob, {
            concurrency: 3,
            connection,
        }),
    };

    Object.keys(workers).forEach((worker) => {
        workers[worker].on("failed", async (job: Job<{ task_id: string }>, error: any) => {
            try {
                const serializedError = serializeError(error);

                const error_code = (() => {
                    if (serializedError.name === "Fetch Error") {
                        return "BAD_IMAGE_ERROR";
                    }

                    return "INTERNAL_ERROR";
                })();

                // XXX: Here you can send a failure notification.
            } catch (e) {
                console.log("Failed to process job failure", e);
            }
        });
    });

    return workers;
}
