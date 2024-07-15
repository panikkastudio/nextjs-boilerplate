import { Button, DropdownMenu, Heading, Text } from "@radix-ui/themes";
import { CheckCircle2Icon } from "lucide-react";
import Link from "next/link";
import React, { forwardRef } from "react";
import { PropsWithChildren } from "react";

export interface PaywalledButtonProps {
    title: string;
    description: string;
    benefits: string[];
    canActivate: boolean;
}

export const PaywalledAction = forwardRef(({ children, canActivate, title, benefits, description }: PropsWithChildren<PaywalledButtonProps>, ref) => {
    if (canActivate) {
        return React.cloneElement(children as any, {
            type: "button",
            ref,
        });
    }

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                {React.cloneElement(children as any, {
                    onClick: undefined,
                    type: "button",
                })}
            </DropdownMenu.Trigger>

            <DropdownMenu.Content>
                <div className="p-2 grid gap-4">
                    <div className="grid">
                        <Text weight="medium">{title}</Text>
                        <Text color="gray" size="2">
                            {description}
                        </Text>
                    </div>

                    <ul className="text-muted-foreground grid">
                        {benefits.map((b) => (
                            <li className="flex items-center" key={`benefit_${b}`}>
                                <CheckCircle2Icon className="text-[var(--grass-8)] p_icon_b" />
                                <Text size="2">{b}</Text>
                            </li>
                        ))}
                    </ul>

                    <Button asChild>
                        <Link href="/dashboard/pricing">Upgrade now</Link>
                    </Button>
                </div>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
});

export const ACTIVATE_MULTIPLE_SERIES = {
    title: "You have reached your series limit",
    description: "Upgrade to a higher tier to create additional series.",
    benefits: ["Automate multiple channels", "Improve reach"],
};
