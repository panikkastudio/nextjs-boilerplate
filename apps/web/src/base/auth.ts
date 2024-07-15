import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions, getServerSession } from "next-auth";
import { sendLoginEmail } from "@repo/emails";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            id: "impersonate",
            name: "impersonate",
            credentials: {
                userID: {
                    label: "User ID",
                    type: "text",
                    placeholder: "123123123",
                },
                password: {
                    label: "Service Password",
                    type: "text",
                    placeholder: "123123123",
                },
            },
            async authorize(credentials) {
                if (credentials?.password !== process.env.SERVICE_PASSWORD) {
                    throw new Error("Nice try");
                }

                if (!credentials?.userID) {
                    throw new Error("User email or Admin email is missing");
                }

                const user = await prisma.user.findUnique({
                    where: {
                        id: credentials.userID,
                    },
                });

                if (!user) {
                    throw new Error("No user found");
                }

                return user;
            },
        }),
        GoogleProvider({
            allowDangerousEmailAccountLinking: true,
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        EmailProvider({
            from: process.env.SMTP_FROM,
            server: {
                host: process.env.SMTP_HOST,
                port: Number(process.env.SMTP_PORT),
                auth: { user: process.env.SMTP_USER, pass: process.env.RESENT_API_KEY },
            },
            sendVerificationRequest: async ({ identifier, url, provider }) => {
                // TODO: Also save them to a customers list.
                await sendLoginEmail(process.env.SMTP_FROM as string, identifier, url);
            },
        }),
    ],
    pages: {
        signIn: `/dashboard`,
        error: "/login",
        signOut: "/login",
    },
    session: {
        strategy: "jwt",
    },
    events: {
        async createUser({ user }) {
            // TODO: Trigger welcome email.
        },
        linkAccount(message) {
            console.log("link");
            console.log(message);
        },
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) token.user = user;
            return token;
        },
        session: async ({ session, token, user }) => {
            session.user = {
                ...((token as any).user || {}),
                ...session.user,
                id: token.sub,
            };

            return session;
        },
    },
};

export function getSession() {
    return getServerSession(authOptions);
}

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
        };
    }
}
