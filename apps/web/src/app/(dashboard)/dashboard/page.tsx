import { Text, Card, Container, Heading, Inset, Box } from "@radix-ui/themes";

import { PROJECT_LIST } from "@/base/keys";
import { SWRProvider } from "@/components/swr-provider";
import { WelcomeStep } from "./welcome-step";

export default async function DashboardPage() {
    const projects: any[] = [];

    return (
        <SWRProvider value={{ [PROJECT_LIST]: projects }}>
            <Container>
                <WelcomeCard />
            </Container>
        </SWRProvider>
    );
}

function WelcomeCard() {
    return (
        <Card>
            <Inset className="relative">
                <Box className="px-10 pt-10">
                    <Heading size="8">Hey there 👋</Heading>
                    <Text className="block" mt="2">
                        Follow these steps to finalize your boilerplate setup.
                    </Text>

                    <Text size="2" className="absolute bottom-10 right-10">
                        by{" "}
                        <a href="https://panikka.studio" target="_target" className="hover:underline text-[--orange-10]">
                            panikka.studio
                        </a>
                    </Text>
                </Box>

                <Box className="space-y-2 px-10 pt-6 pb-32 -mx-1">
                    {STEPS.map((s) => (
                        <WelcomeStep key={`step_${s.title}`} {...s} />
                    ))}
                </Box>
            </Inset>
        </Card>
    );
}

const STEPS = [
    {
        title: "Database Connection",
        description: "Make sure you have PostgreSQL connection setup.",
        check: async (): Promise<boolean> => {
            "use server";

            try {
                const db = await import("@repo/database");
                await db.prisma.$connect();
                return true;
            } catch (e) {
                return false;
            }
        },
    },
    {
        title: "Redis Connection",
        description: "Make sure you have Redis connection setup.",
        check: async (): Promise<boolean> => {
            "use server";

            try {
                const db = await import("src/base/redis");
                const result = await db.connection.ping();
                console.log(result);

                return true;
            } catch (e) {
                return false;
            }
        },
    },
    {
        title: "Authentication Secrets",
        description: "Finish setting up NextAuth.",
        check: async (): Promise<boolean> => {
            "use server";

            return !!process.env.NEXTAUTH_SECRET;
        },
    },
    {
        title: "Stripe Secrets",
        description: "Collect payments with Stripe.",
        check: async (): Promise<boolean> => {
            "use server";

            return !!process.env.STRIPE_SIGNING_SECRET && !!process.env.STRIPE_SK && !!process.env.NEXT_PUBLIC_STRIPE_PK;
        },
    },
    {
        title: "Storage Setup",
        description: "Enable s3 storage for file uploads.",
        check: async (): Promise<boolean> => {
            "use server";

            const envSetup =
                !!process.env.S3_UPLOAD_ENDPOINT &&
                !!process.env.S3_UPLOAD_REGION &&
                !!process.env.S3_UPLOAD_SECRET &&
                !!process.env.S3_UPLOAD_KEY &&
                !!process.env.S3_UPLOAD_BUCKET;

            if (!envSetup) {
                return false;
            }

            // TODO: Verify connected.
            return true;
        },
    },
    {
        title: "Email Setup",
        description: "Send emails with Resend.",
        check: async (): Promise<boolean> => {
            "use server";

            const envSetup = !!process.env.RESEND_KEY && !!process.env.SMTP_FROM;

            if (!envSetup) {
                return false;
            }

            try {
                const mails = await import("@repo/emails");
                const domains = await mails.getDomainsList();

                // TODO: Check if it is setup?
                return !!domains;
            } catch (e) {
                return false;
            }
        },
    },
];
