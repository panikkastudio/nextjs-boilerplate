import Redis from "ioredis";
import { parseURL } from "ioredis/built/utils/index.js";

const connectionOptions = parseURL(process.env.REDIS_URL!);

export const connection = new Redis({
    ...connectionOptions,
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
});
