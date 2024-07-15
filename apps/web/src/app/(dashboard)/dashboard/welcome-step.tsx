"use client";

import { CheckIcon } from "lucide-react";
import { Text, Flex, Heading, Box } from "@radix-ui/themes";
import useSWR from "swr";
import { cn } from "@/base/utils";

export function WelcomeStep({ title, description, check }: { title: string; description: string; check: () => Promise<boolean> }) {
    const result = useSWR(`check_${title}`, () => check());
    const checked = result.data;

    return (
        <Box
            className={cn(
                "px-0 py-3 border border-[--gray-4] rounded-lg",
                checked && "border-[--orange-10] bg-gradient-to-r from-[--orange-2] via-transparent to-transparent",
            )}
        >
            <Flex gap="2" align="center" px="4">
                <Flex
                    align="center"
                    justify="center"
                    className={cn("w-8 h-8 border border-[--gray-6] rounded-full", checked && "border-[--orange-10] bg-[--orange-10]")}
                >
                    <CheckIcon className={cn("text-[--gray-8] w-4 h-4", checked && "text-white")} />
                </Flex>

                <Box>
                    <Heading size="3" className="leading-tight block">
                        {title}
                    </Heading>
                    <Text size="2" className="block">
                        {description}
                    </Text>
                </Box>
            </Flex>
        </Box>
    );
}
