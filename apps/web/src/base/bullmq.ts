import { Queue } from "bullmq";
import { WorkflowType } from "./constants";
import { connection } from "./redis";

let queues: ReturnType<typeof initQueues>;

if (process.env.NODE_ENV === "production") {
    queues = initQueues();
    //
} else {
    if (!(global as any).queues) {
        (global as any).queues = initQueues();
    }

    queues = (global as any).queues;
}

function initQueues() {
    const queues = {
        [WorkflowType.GenerateVideoScript]: new Queue(WorkflowType.GenerateVideoScript, {
            connection,
        }),
        [WorkflowType.GenerateVideo]: new Queue(WorkflowType.GenerateVideo, {
            connection,
        }),
        [WorkflowType.PublishVideo]: new Queue(WorkflowType.PublishVideo, {
            connection,
        }),
        [WorkflowType.RefreshToken]: new Queue<{ accountId: string }>(WorkflowType.RefreshToken, {
            connection,
        }),
    };

    if (Object.keys(WorkflowType).some((t: any) => !(queues as any)[t])) {
        throw new Error("Missing queue");
    }

    return queues;
}

export { queues };
