import "dotenv/config";
import express from "express";
import { ExpressAdapter } from "@bull-board/express";
import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter.js";

import { initWorkers } from "./worker";
import { queues } from "./queue";

async function main() {
    initWorkers();

    const adapter = new ExpressAdapter();
    adapter.setBasePath("/admin/queues");

    const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
        queues: Object.values(queues).map((q) => new BullMQAdapter(q as any)),
        serverAdapter: adapter,
    });

    const app = express();
    app.use(express.json());

    app.use("/admin/queues", adapter.getRouter());
    app.get("/api/health", (req, res) => res.json({ status: "OK" }));

    app.listen(process.env.PORT ?? 3200, () => {
        console.log(`Workers listening on port ${process.env.PORT ?? 3200}`);
    });
}

main().then().catch(console.error);
