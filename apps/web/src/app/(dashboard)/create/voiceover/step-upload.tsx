"use client";

import { toast } from "sonner";
import { useState } from "react";
import cuid from "@paralleldrive/cuid2";
import { useDropzone } from "react-dropzone";
import { Text, Box, Card, Flex, Heading, Inset, Spinner } from "@radix-ui/themes";

import { useS3Upload } from "@/base/upload";
import { cn } from "@/base/utils";
import { UploadIcon } from "lucide-react";

export function UploadVideo({ projectId }: { projectId: string }) {
    const { uploadToS3, progress } = useS3Upload();
    const [uploading, setUploading] = useState(false);

    const { getInputProps, getRootProps, isDragActive, fileRejections } = useDropzone({
        accept: {
            "video/*": [".mp4", ".mov"],
        },
        disabled: uploading,
        onDrop: async (acceptedFiles) => {
            try {
                setUploading(true);
                const upload = await uploadToS3(acceptedFiles[0], {
                    key: `media/${projectId}_${cuid.createId()}_${acceptedFiles[0].name}`,
                });

                const obj = URL.createObjectURL(acceptedFiles[0]);
                URL.revokeObjectURL(obj);
            } catch (e) {
                console.log(e);
                toast.error("Failed to upload audio.");
            } finally {
                setUploading(false);
            }
        },
    });

    return (
        <Card>
            <Inset>
                <Box className="px-6 py-4">
                    <Heading size="4" mb="4">
                        Upload Video
                    </Heading>

                    <div
                        {...getRootProps()}
                        className={cn(
                            "flex flex-col items-center justify-center bg-[--color-surface] border border-[--gray-a7] rounded border-dashed p-5 min-h-[180px] transition-all",
                            isDragActive && "border-[--orange-10]",
                        )}
                    >
                        {uploading && (
                            <Flex direction="column" align="center" gap="1">
                                <Spinner />
                                <Text size="3" weight="bold" className="text-[--orange-10]">
                                    Uploading {progress}%
                                </Text>
                            </Flex>
                        )}

                        {isDragActive && !uploading && (
                            <Text size="3" weight="bold" className="text-[--orange-10]">
                                Drop to Upload
                            </Text>
                        )}

                        {!isDragActive && !uploading && (
                            <>
                                <UploadIcon className="w-6 h-6 text-[--orange-9]" />
                                <Text size="3" weight="bold" className="mt-2">
                                    Click or drag to upload
                                </Text>
                                <Text size="2" className="text-muted-foreground">
                                    Formats TODO
                                </Text>
                            </>
                        )}
                    </div>
                </Box>
            </Inset>
        </Card>
    );
}
