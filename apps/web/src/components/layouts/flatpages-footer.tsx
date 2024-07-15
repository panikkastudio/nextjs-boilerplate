import { Text, Container, Flex, Link as RLink } from "@radix-ui/themes";
import Link from "next/link";

export function Footer() {
    return (
        <Container className="w-full" align="center" mt="6">
            <footer className="w-full border-t py-4">
                <Flex justify="between" align="center">
                    <Flex gap="2">
                        <RLink color="gray" size="3" asChild>
                            <Link href="/legal/terms">Terms of Service</Link>
                        </RLink>

                        <Text color="gray">•</Text>

                        <RLink color="gray" size="3" asChild>
                            <Link href="/legal/privacy">Privacy Policy</Link>
                        </RLink>
                    </Flex>

                    <Text color="gray" size="3">
                        ©Copyright {new Date().getFullYear()} Magicshorts
                    </Text>
                </Flex>
            </footer>
        </Container>
    );
}
