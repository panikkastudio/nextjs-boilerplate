"use server";

import { getSession } from "@/base/auth";
import { prisma } from "@/base/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getUser_() {
    const session = await getSession();
    if (!session?.user) return null;

    return prisma.user.findFirstOrThrow({
        where: {
            id: session.user.id,
        },
    });
}

export async function getUser() {
    const user = await getUser_();
    if (!user) throw new Error("Unauthenticated");
    return user;
}

export async function connectTiktok(redirectTo: string) {
    const session = await getSession();
    if (!session?.user) throw new Error("Unauthenticated");

    const state = Math.random().toString(36).substring(2) + "__" + session.user.id;
    const params = new URLSearchParams({
        state,
        response_type: "code",
        scope: "user.info.basic,user.info.profile,video.publish",
        client_id: process.env.TIKTOK_CLIENT_ID!,
        client_key: process.env.TIKTOK_CLIENT_KEY!,
        redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/tiktok`,
    });

    cookies().set("state", state, { maxAge: 60000 });
    cookies().set("redirectAfter", redirectTo, { maxAge: 60000 });
    redirect("https://www.tiktok.com/v2/auth/authorize?" + params.toString());
}
