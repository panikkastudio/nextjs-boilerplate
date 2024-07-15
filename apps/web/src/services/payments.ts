"use server";

import _ from "lodash";
import { RedirectType, redirect } from "next/navigation";
import { stripe } from "@/base/stripe";
import { ProjectPackagesEnum, STRIPE_PRICE_IDS } from "@/base/constants";
import { config } from "@/base/config";
import { getUser } from "./auth";

export async function getLimits() {
    const user = await getUser();

    return {
        //
    };
}

export async function redirectToBillingPortal(returnUrl: string) {
    const user = await getUser();

    // TODO: reinit
    if (!user?.stripe_id) {
        return;
    }

    const portal = await stripe().billingPortal.sessions.create({
        customer: user.stripe_id,
        return_url: returnUrl,
    });

    redirect(portal.url);
}

export async function createCheckoutSession(domain: string, quantity: number, price: ProjectPackagesEnum) {
    const user = await getUser();

    const session = await stripe().checkout.sessions.create({
        customer: user.stripe_id!,
        mode: "subscription",
        discounts: [],
        // discounts: price.coupon ? [{ coupon: price.coupon }] : undefined,
        allow_promotion_codes: true,
        line_items: [
            {
                quantity,
                price: STRIPE_PRICE_IDS[config.stage][price],
            },
        ],
        success_url: `${domain}/dashboard/confirm`,
        cancel_url: `${domain}/dashboard/pricing?status=cancelled`,
        //
        tax_id_collection: { enabled: true },
        customer_update: { name: "auto", address: "auto" },
    });

    redirect(session.url!, RedirectType.push);
}
