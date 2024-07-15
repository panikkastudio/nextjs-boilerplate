import Link from "next/link";
import { PropsWithChildren } from "react";
import { Link as RLink, Text, Container, Flex } from "@radix-ui/themes";
import { Navigation } from "@/components/layouts/flatpages-nagivation";
import { Footer } from "@/components/layouts/flatpages-footer";

export default function FlatpageLayout({ children }: PropsWithChildren) {
    return (
        <main className="flex min-h-screen flex-col items-center p-4 gap-4">
            <Navigation />
            {children}
            <Footer />
        </main>
    );
}
