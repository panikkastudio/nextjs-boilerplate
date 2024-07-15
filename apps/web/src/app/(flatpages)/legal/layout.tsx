import { Box, Container } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

export default function LegalLayout({ children }: PropsWithChildren) {
    return (
        <Container pt="9">
            <div className="prose max-w-full">{children}</div>
        </Container>
    );
}
