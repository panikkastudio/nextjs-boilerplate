import Redis from "ioredis";
import { parseURL } from "ioredis/built/utils";

const connectionOptions = parseURL(process.env.REDIS_URL!);

export const connection = new Redis({
    ...connectionOptions,
    family: 6,
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
});
