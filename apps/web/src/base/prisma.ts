import { type PrismaClient, prisma as prisma_ } from "@repo/database";
import { createCustomer } from "./stripe";

export const prisma = prisma_.$extends({
    query: {
        user: {
            // TODO: Pass referral
            async create({ model, operation, args, query }) {
                const user = await query(args);
                const customer = await createCustomer(user.id!, user.name!, user.email!)!;

                user.stripe_id = customer.id;
                await prisma.user.update({
                    where: { id: user.id! },
                    data: { stripe_id: user.stripe_id },
                });

                return user;
            },
        },
    },
}) as any as PrismaClient;
