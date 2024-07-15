import Link from "next/link";
import { Flex, Button, Container, Heading, Grid } from "@radix-ui/themes";

import { Logo } from "../logo";
import { getSession } from "@/base/auth";

async function LoginButtons() {
    const session = await getSession();

    return (
        <Flex align="center" justify="end" gap="2" className="w-full">
            {session?.user?.id ? (
                <Button asChild>
                    <Link href="/dashboard">Dashboard</Link>
                </Button>
            ) : (
                <>
                    <Button variant="outline" asChild>
                        <Link href="/login">Login</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/login">Try for free</Link>
                    </Button>
                </>
            )}
        </Flex>
    );
}

export function Navigation() {
    return (
        <Container flexGrow="0" className=" fixed top-2 left-2 right-2 sm:top-4 z-20">
            <nav className="flex items-center justify-between w-full bg-[var(--color-panel)] backdrop-blur-sm border p-3 pl-4 rounded-full">
                <Grid className="w-full" columns="3">
                    <Flex align="center" gap="2" className="w-full">
                        <Logo size={32} />
                        <Heading className="leading-0 pb-1">magicshorts</Heading>
                    </Flex>

                    <Flex align="center" justify="center" gap="4" className="w-full">
                        <a href="#pricing" className="hover:underline">
                            Pricing
                        </a>
                        <Link href="/affiliate">Affiliates 💸</Link>
                    </Flex>

                    <LoginButtons />
                </Grid>
            </nav>
        </Container>
    );
}
