import { prisma } from "./client";

async function main() {
    const user = await prisma.user.create({
        data: {
            id: "88888888",
            name: "Test User",
            email: "demo@example.com",
        },
    });

    console.log(user);
}

// @ts-ignore
await main();
