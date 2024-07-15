import Stripe from "stripe";
import getRawBody from "raw-body";
import { NextApiRequest } from "next";

let _stripe: Stripe;

export function stripe() {
    if (!_stripe) {
        _stripe = new Stripe(process.env.STRIPE_SK as string, {
            apiVersion: "2023-10-16",
        });
    }

    return _stripe;
}

export async function createCustomer(userId: string, userName: string, userEmail: string, referral: string = "") {
    const params: Stripe.CustomerCreateParams = {
        name: userName,
        email: userEmail,
        metadata: { userId: userId },
        ...(referral ? { referral } : {}),
    };

    const options: Stripe.RequestOptions = {
        idempotencyKey: userId,
    };

    return await stripe().customers.create(params, options);
}

export async function requestToVerifiedEvent(req: NextApiRequest) {
    const stripeSigningSecret = process.env.STRIPE_SIGNING_SECRET as string;
    const sig = req.headers["Stripe-Signature"] || req.headers["stripe-signature"];

    const raw = await getRawBody(req);
    return stripe().webhooks.constructEvent(raw, sig!, stripeSigningSecret);
}
