import { Box, Card, Flex, Heading } from "@radix-ui/themes";
import { Logo } from "@/components/logo";
import { LoginForm } from "../form";
import { InjectImpersonate } from "./inject-impersonation";

export default function LoginPage() {
    return (
        <Flex direction="column" align="center" justify="start" className="h-screen w-screen pt-56">
            <Card className="max-w-md w-full relative overflow-hidden">
                <Box className="p-8 space-y-8">
                    <Heading size="7">👋 Hi There</Heading>

                    <LoginForm />

                    <InjectImpersonate />
                </Box>
            </Card>

            <Flex align="center" gap="1" pt="6">
                <Logo size={28} />
                <Heading size="4">Magicshorts</Heading>
            </Flex>
        </Flex>
    );
}
