"use client";

import { z } from "zod";
import { useAsyncFn } from "react-use";
import { signIn } from "next-auth/react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Spinner, TextField, Button, Text, Flex } from "@radix-ui/themes";
import { GoogleIcon } from "@/components/icons";
import { CheckIcon } from "lucide-react";
import { useState } from "react";

const schema = z.object({
    email: z.string().email(),
});

export function LoginForm() {
    const [linkSent, setLinkSent] = useState(false);

    const [signInWithGoogleState, signInWithGoogle] = useAsyncFn(async () => {
        return signIn("google", {
            callbackUrl: "/dashboard",
        });
    });

    const [signInWithMagiclinkState, signInWithMagiclink] = useAsyncFn(async (email: string) => {
        return signIn("email", {
            email,
        });
    });

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: "",
        },
    });

    return (
        <div className="space-y-8">
            {linkSent && (
                <Flex gap="4" align="center" justify="center" direction="column" className="absolute inset-1 bg-[var(--color-panel-solid)] z-10">
                    <CheckIcon className="h-7 w-7 text-green-500" />
                    <Text align="center" className="max-w-72" wrap="balance">
                        Magic link sent! Check your email to continue.
                    </Text>
                </Flex>
            )}
            <LoginButton
                icon={GoogleIcon}
                onClick={signInWithGoogle}
                text="Continue with Google"
                disabled={signInWithGoogleState.loading || signInWithMagiclinkState.loading}
                loading={signInWithGoogleState.loading}
            />

            <span className="relative h-2 flex items-center">
                <span className="bg-white absolute-center p-2 text-sm text-muted-foreground">or</span>
                <Separator />
            </span>

            <Form {...form}>
                <form className="space-y-2" onSubmit={form.handleSubmit(submitForm)}>
                    <FormField
                        name="email"
                        disabled={signInWithGoogleState.loading || signInWithMagiclinkState.loading}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <TextField.Root size="3" placeholder="email@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="!w-full" disabled={signInWithGoogleState.loading || signInWithMagiclinkState.loading} size="3">
                        <Spinner loading={signInWithMagiclinkState.loading} />
                        Continue with Email
                    </Button>
                </form>
            </Form>
        </div>
    );

    async function submitForm(values: z.infer<typeof schema>) {
        await signInWithMagiclink(values.email);
        setLinkSent(true);
    }
}

interface LoginButtonProps {
    text: string;
    disabled: boolean;
    loading: boolean;
    icon: React.ComponentType<{ className?: string }>;
    onClick: () => void;
}

function LoginButton({ icon: Icon, text, disabled, loading, onClick }: LoginButtonProps) {
    return (
        <Button className="!w-full" variant="surface" onClick={onClick} size="3">
            <Spinner loading={loading}>
                <Icon className="mr-2 h-6 w-6" />
            </Spinner>
            {text}
        </Button>
    );
}
