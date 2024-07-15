import { FlowProducer } from "bullmq";
import { connection } from "./base/redis";

export const flowProducer = new FlowProducer({
    connection,
});
