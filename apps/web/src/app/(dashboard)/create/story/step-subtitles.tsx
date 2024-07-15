"use client";

import { useState } from "react";
import { Box, Card, Grid, Heading, Inset } from "@radix-ui/themes";

import { useS3Upload } from "@/base/upload";

export function SubtitleStyle({ projectId }: { projectId: string }) {
    const { uploadToS3, progress } = useS3Upload();
    const [uploading, setUploading] = useState(false);

    return (
        <Card>
            <Inset>
                <Box className="px-6 py-4">
                    <Heading size="4" mb="4">
                        Subtitle Style
                    </Heading>

                    <Grid columns="4" gap="4">
                        <Box className="aspect-16/9 rounded-lg bg-[--gray-5]" />
                        <Box className="aspect-16/9 rounded-lg bg-[--gray-5]" />
                        <Box className="aspect-16/9 rounded-lg bg-[--gray-5]" />
                        <Box className="aspect-16/9 rounded-lg bg-[--gray-5]" />
                        <Box className="aspect-16/9 rounded-lg bg-[--gray-5]" />
                        <Box className="aspect-16/9 rounded-lg bg-[--gray-5]" />
                        <Box className="aspect-16/9 rounded-lg bg-[--gray-5]" />
                    </Grid>
                </Box>
            </Inset>
        </Card>
    );
}
