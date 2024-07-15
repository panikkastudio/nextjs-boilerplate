import { createRouter } from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@repo/database";
import { config as config_ } from "@/base/config";
import { requestToVerifiedEvent } from "@/base/stripe";
import { STRIPE_PRICE_IDS_LOOKUP } from "@/base/constants";

interface RequestContext extends NextApiRequest {
    params: any;
}

const router = createRouter<RequestContext, NextApiResponse>();

router.post("/api/webhooks/payment", async (req, res) => {
    const event = await requestToVerifiedEvent(req);

    switch (event.type) {
        case "checkout.session.completed": {
            break;
        }
        case "invoice.payment_succeeded": {
            const obj = event.data.object as any;

            if (obj.discount?.coupon?.percent_off != 100 || !obj.lines?.data[0]?.plan?.id) {
                return res.json("OK -- not through coupon bail");
            }

            const user = await prisma.user.findFirst({
                where: { stripe_id: obj.customer },
            });

            if (!user) {
                return res.json("OK -- No user bailing.");
            }

            const packages: any[] = obj.lines?.data.map((l: any) => ({
                quantity: l.quantity,
                priceID: l.plan?.id!,
                package: STRIPE_PRICE_IDS_LOOKUP[config_.stage][l.plan?.id!],
            }));

            const activePackages = user.active_packages;
            packages.forEach((p) => {
                activePackages[p.package] = (activePackages[p.package] || 0) + p.quantity;
            });

            await prisma.user.update({
                where: { id: user.id },
                data: { active_packages: activePackages },
            });

            break;
        }
        case "customer.subscription.created":
        case "customer.subscription.updated": {
            const obj = event.data.object as any;

            const user = await prisma.user.findFirst({
                where: { stripe_id: obj.customer },
            });

            if (!user) {
                return res.json("OK -- No user bailing.");
            }

            const planStatus = obj.status;

            if (planStatus === "trialing") {
                // free trial
            }

            if (planStatus === "active") {
                // start the sub.
                const packages: any[] = obj.items?.data.map((l: any) => ({
                    quantity: l.quantity,
                    priceID: l.plan?.id!,
                    package: STRIPE_PRICE_IDS_LOOKUP[config_.stage][l.plan?.id!],
                }));

                const activePackages = user.active_packages;
                packages.forEach((p) => {
                    activePackages[p.package] = (activePackages[p.package] || 0) + p.quantity;
                });

                await prisma.user.update({
                    where: { id: user.id },
                    data: { active_packages: activePackages },
                });
            }

            if (planStatus === "past_due") {
                // last payment was not successful.
                const packages: any[] = obj.items?.data.map((l: any) => ({
                    quantity: l.quantity,
                    priceID: l.plan?.id!,
                    package: STRIPE_PRICE_IDS_LOOKUP[config_.stage][l.plan?.id!],
                }));

                const activePackages = user.active_packages;
                packages.forEach((p) => {
                    activePackages[p.package] = (activePackages[p.package] || 0) - p.quantity;
                    if (activePackages[p.package] <= 0) delete activePackages[p.package];
                });

                await prisma.user.update({
                    where: { id: user.id },
                    data: { active_packages: activePackages },
                });
            }

            if (planStatus === "unpaid") {
                // all retries failed.
            }

            if (planStatus === "cancelled") {
                // sub is cancelled.
            }

            if (planStatus === "paused") {
                // trial ended but no default payment method.
            }

            await prisma.user.update({
                where: { id: user.id },
                data: {
                    // currentPlan: STRIPE_PRICE_IDS_LOOKUP[config_.stage][priceId],
                    // currentPlanStatus: planStatus,
                },
            });

            break;
        }
        default: {
            console.log("unhandled event", event);
        }
    }

    res.json("ok");
});

export const config = {
    api: {
        bodyParser: false,
    },
};

export default router.handler({
    onError: (err: any, req, res) => {
        console.error(err.stack);
        res.status(err.statusCode || 500).end(err.message);
    },
});
