"use client";

import { Text, Box, Button, Card, Grid, Heading, Inset, TextField, RadioCards, Flex } from "@radix-ui/themes";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { LightningBoltIcon, MagicWandIcon } from "@radix-ui/react-icons";
import { BoltIcon } from "lucide-react";

export function EnterTopic({ projectId }: { projectId: string }) {
    const form = useForm();

    return (
        <Grid columns="2" gap="4">
            <Card>
                <Inset>
                    <Form {...form}>
                        <form className="space-y-6 px-6 py-4">
                            <FormField
                                name="topic"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg font-bold">Story Topic</FormLabel>
                                        <FormControl>
                                            <TextField.Root size="3" placeholder="Enter your topic here..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="tone"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg font-bold">Tone of Your Video</FormLabel>
                                        <FormControl>
                                            <TextField.Root size="3" placeholder="" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="calltoaction"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg font-bold">Call to Action (CTA)</FormLabel>
                                        <FormControl>
                                            <TextField.Root size="3" placeholder="Follow @mychannel for more tips" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="videohook"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg font-bold">Video Hook</FormLabel>
                                        <FormControl>
                                            <TextField.Root size="3" placeholder="This is how you..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="duration"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg font-bold">Script Duration</FormLabel>
                                        <FormControl>
                                            <RadioCards.Root defaultValue="1" columns={{ initial: "1", sm: "3" }} variant="surface">
                                                <RadioCards.Item
                                                    value="1"
                                                    className="rounded-full after:rounded-full data-[state=checked]:bg-[--orange-3]"
                                                >
                                                    <Flex direction="column" width="100%">
                                                        <Text weight="bold">45 Seconds</Text>
                                                    </Flex>
                                                </RadioCards.Item>

                                                <RadioCards.Item
                                                    value="2"
                                                    className="rounded-full after:rounded-full data-[state=checked]:bg-[--orange-3]"
                                                >
                                                    <Flex direction="column" width="100%">
                                                        <Text weight="bold">60 Seconds</Text>
                                                    </Flex>
                                                </RadioCards.Item>

                                                <RadioCards.Item
                                                    value="3"
                                                    className="rounded-full after:rounded-full data-[state=checked]:bg-[--orange-3]"
                                                >
                                                    <Flex direction="column" width="100%">
                                                        <Text weight="bold">90 Seconds</Text>
                                                    </Flex>
                                                </RadioCards.Item>
                                            </RadioCards.Root>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button size="3" className="font-bold">
                                Generate Script <LightningBoltIcon fill="current" />
                            </Button>
                        </form>
                    </Form>
                </Inset>
            </Card>

            <Card>
                <Inset>
                    <Box className="aspect-3/4 bg-[--gray-2] px-6 py-4">
                        <Text size="4" className="text-[--gray-9]">
                            Your script will appear here...
                        </Text>
                    </Box>
                </Inset>
            </Card>
        </Grid>
    );
}
