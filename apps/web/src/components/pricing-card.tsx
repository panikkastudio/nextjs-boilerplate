"use client";

import { useCounter } from "react-use";
import useSWRMutation from "swr/mutation";
import { MinusIcon, PlusIcon, CheckIcon, XIcon } from "lucide-react";
import { Text, Box, Button, Card, Flex, Heading, Strong } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

import { cn } from "@/base/utils";
import { ProjectPackagesEnum } from "@/base/constants";
import { createCheckoutSession } from "@/services/payments";

interface PricingCardProps {
    title: string;
    subtitle: string;
    price: number;
    frequency: string;
    featured?: boolean;
    plain?: boolean;
    package: ProjectPackagesEnum;
    features: {
        text: string;
        check: boolean;
    }[];
}

export function PricingCard(props: PricingCardProps) {
    const [quantity, { inc, dec }] = useCounter(1, undefined, 1);
    const doCheckout = useSWRMutation("handle_checkout", () => createCheckoutSession(window.location.origin, quantity, props.package));
    const router = useRouter();

    return (
        <Card className={cn(props.featured && "ring-2 ring-[--orange-10]")}>
            <Flex direction="column" align="start" className="p-6 space-y-6">
                <Box>
                    <Heading>{props.title}</Heading>
                    <Text size="2" color="gray">
                        {props.subtitle}
                    </Text>
                </Box>

                <Box>
                    <Flex align="baseline">
                        <Heading size="9">${props.price}</Heading>
                        <Text size="2">/month</Text>
                        <Text size="2" weight="bold" ml="1">
                            per series
                        </Text>
                    </Flex>
                </Box>

                <Flex className="w-full">
                    {!props.plain && (
                        <Button
                            size="3"
                            className="!rounded-r-none"
                            variant={props.featured ? "solid" : "outline"}
                            onClick={() => dec()}
                            disabled={doCheckout.isMutating}
                        >
                            <MinusIcon />
                        </Button>
                    )}

                    <Button
                        size="3"
                        radius={props.plain ? "full" : "none"}
                        className={cn("!flex-1 !font-bold", !props.plain && "!-mx-[1px]")}
                        variant={props.featured ? "solid" : "outline"}
                        disabled={doCheckout.isMutating}
                        onClick={() => {
                            if (props.plain) {
                                // TODO: Check if logged in.
                                router.push("/login");
                            } else {
                                doCheckout.trigger();
                            }
                        }}
                    >
                        {props.plain ? "Get Started" : `Get ${quantity} Series`}
                    </Button>

                    {!props.plain && (
                        <Button
                            size="3"
                            className="!rounded-l-none"
                            variant={props.featured ? "solid" : "outline"}
                            onClick={() => inc()}
                            disabled={doCheckout.isMutating}
                        >
                            <PlusIcon />
                        </Button>
                    )}
                </Flex>

                <ul className="w-full space-y-3">
                    <Text size="4">
                        <Strong>{props.frequency}</Strong>
                    </Text>

                    {props.features.map((feature) => (
                        <li key={`${props.title}_${feature.text}`} className="flex items-center space-x-2">
                            {feature.check ? (
                                <CheckIcon className="w-6 h-6 p-0.5 text-[var(--green-8)] bg-[var(--green-4)] rounded-full" />
                            ) : (
                                <XIcon className="w-6 h-6 p-1 text-[var(--gray-8)] bg-[var(--gray-4)] rounded-full" />
                            )}

                            <Text size="4" className={cn(!feature.check && "line-through text-[--gray-10]")}>
                                {feature.text}
                            </Text>
                        </li>
                    ))}
                </ul>
            </Flex>
        </Card>
    );
}
