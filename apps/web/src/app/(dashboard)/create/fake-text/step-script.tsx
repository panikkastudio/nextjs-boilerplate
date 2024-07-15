"use client";

import { toast } from "sonner";
import { useState } from "react";
import cuid from "@paralleldrive/cuid2";
import { useDropzone } from "react-dropzone";
import { Text, Box, Card, Flex, Heading, Inset, Spinner, Grid, TextField, IconButton, Button, Tooltip, Separator } from "@radix-ui/themes";

import { useS3Upload } from "@/base/upload";
import { cn } from "@/base/utils";
import { UploadIcon } from "lucide-react";
import { PlusIcon, ResetIcon } from "@radix-ui/react-icons";
import _ from "lodash";

export function Script({ projectId }: { projectId: string }) {
    const [name, setName] = useState("John Doe");
    const [message, setMessage] = useState("");
    const [isReceive, setIsReceive] = useState(false);
    const [messages, setMessages] = useState<{ message: string; isReceive: boolean }[]>([]);

    return (
        <Grid columns={"2"} gap="4">
            <Card>
                <Inset>
                    <Box className="px-6 py-4 space-y-6">
                        <Box>
                            <Text className="text-lg font-bold">Receiver Name</Text>
                            <Flex gap="2">
                                <TextField.Root size="3" className="flex-1" value={name} onChange={(e) => setName(e.target.value)} />
                                <Button size="3" variant="soft" color="gray">
                                    Redact
                                </Button>
                            </Flex>
                        </Box>

                        <Box className="space-y-2">
                            <Flex gap="2">
                                <TextField.Root
                                    size="3"
                                    className="flex-1"
                                    value={message}
                                    placeholder="Type a message..."
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                                <Tooltip content="Mark this message as received">
                                    <IconButton size="3" variant="soft" color={isReceive ? "orange" : "gray"} onClick={() => setIsReceive((r) => !r)}>
                                        <ResetIcon />
                                    </IconButton>
                                </Tooltip>
                            </Flex>

                            <Button variant="surface" size="3" className="w-full" onClick={() => addMessage()}>
                                <PlusIcon />
                                Add Message
                            </Button>
                        </Box>

                        <Separator size="4" />

                        <Box className="space-y-2">
                            {messages.map((m, i) => (
                                <Flex gap="2" key={`messsg_${i}`}>
                                    <TextField.Root
                                        size="3"
                                        className="flex-1"
                                        value={m.message}
                                        placeholder="Type a message..."
                                        onChange={(e) => updateMessage(i, e.target.value, m.isReceive)}
                                    />
                                    <Tooltip content="Mark this message as received">
                                        <IconButton
                                            size="3"
                                            variant="soft"
                                            color={m.isReceive ? "orange" : "gray"}
                                            onClick={() => updateMessage(i, m.message, !m.isReceive)}
                                        >
                                            <ResetIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Flex>
                            ))}
                        </Box>
                    </Box>
                </Inset>
            </Card>

            <Card className="aspect-3/4">
                <Inset>
                    <Box className="px-6 py-6 space-y-4">
                        <Box className="space-y-2">
                            {messages.map((m, i) => (
                                <Flex key={`mess__prev_sg_${i}`} className="w-full" justify={m.isReceive ? "end" : "start"}>
                                    <Box className={cn("p-4 rounded-lg max-w-[60%]", m.isReceive ? "bg-[--blue-8] text-white" : "bg-[--gray-3]")}>
                                        <Text weight="bold">{m.message}</Text>
                                    </Box>
                                </Flex>
                            ))}
                        </Box>
                    </Box>
                </Inset>
            </Card>
        </Grid>
    );

    function addMessage() {
        setMessages((m) => [...m, { message, isReceive }]);
        setMessage("");
        setIsReceive(false);
    }

    function updateMessage(idx: number, message: string, isReceive: boolean) {
        setMessages((m) => {
            const updated = _.cloneDeep(m);
            updated[idx] = { message, isReceive };
            return updated;
        });
    }
}
