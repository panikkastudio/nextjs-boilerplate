"use client";

import Link from "next/link";
import { useEffect } from "react";
import { signOut } from "next-auth/react";
import { Text, Flex, Heading, Avatar, DropdownMenu, Container } from "@radix-ui/themes";

import { useUser } from "@/base/api";
import { Logo } from "@/components/logo";
import { FeedbackButton } from "@/components/feedback";
import { redirectToBillingPortal } from "@/services/payments";

export function Navigation() {
    const user = useUser();
    useEffect(() => {
        if (user.data?.email) {
            (window as any).$crisp?.push(["set", "user:email", [user.data.email]]);
            (window as any).Reflio?.signup(user.data.email).then();
        }
    }, [user.data?.id]);

    return (
        <div className="fixed left-0 top-0 w-full bg-[var(--color-panel)] backdrop-blur-sm bg-gray1 border-b z-40 px-2">
            <Container>
                <Flex className="py-4" align="center" justify="between">
                    <Flex align="center" gap="2">
                        <Logo size={32} />
                        <Link href="/dashboard">
                            <Heading className="leading-0 pb-1">magicshorts</Heading>
                        </Link>
                    </Flex>

                    <MenuLinks />

                    <Flex align="center" justify="end" gap="4" className="w-32">
                        <FeedbackButton />
                        <ProfileDropdown />
                    </Flex>
                </Flex>
            </Container>
        </div>
    );
}

function MenuLinks() {
    return (
        <Flex
            align="center"
            gap="6"
            className="[&_a]:font-medium hover:[&_a]:text-[var(--orange-10)] [&_button]:font-medium hover:[&_button]:text-[var(--orange-10)]"
        >
            <Link href="/dashboard">Home</Link>
            <Link href="/dashboard/pricing">Pricing</Link>
            <Link href="/affiliate">Affiliate 💸</Link>
            <button
                onClick={() => {
                    (window as any).$crisp?.push(["do", "chat:show"]);
                    (window as any).$crisp?.push(["do", "chat:open"]);
                }}
            >
                Support
            </button>
        </Flex>
    );
}

function ProfileDropdown() {
    const { data: user } = useUser();

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <Text>
                    <Avatar size="3" fallback={user?.name?.charAt(0) ?? user?.email?.charAt(0) ?? ""} radius="full" src={user?.image ?? undefined} />
                </Text>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content sideOffset={4} side="bottom" align="end">
                <Flex direction="column" className="px-3 py-2">
                    <span>{user?.name}</span>
                    <span className="text-xs opacity-60">{user?.email}</span>
                </Flex>

                <DropdownMenu.Separator />
                <DropdownMenu.Item onClick={() => redirectToBillingPortal(window.location.href)}>Billing</DropdownMenu.Item>
                <DropdownMenu.Item color="tomato" onClick={() => signOut({ callbackUrl: "/login" })}>
                    Sign out
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
}
