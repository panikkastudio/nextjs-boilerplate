"use client";

import { useState } from "react";
import { Box, Card, Grid, Heading, Inset } from "@radix-ui/themes";

import { useS3Upload } from "@/base/upload";
import { BACKGROUNDS } from "@/composition/constants";

export function BackgroundVideo({ projectId }: { projectId: string }) {
    const { uploadToS3, progress } = useS3Upload();
    const [uploading, setUploading] = useState(false);

    return (
        <Card>
            <Inset>
                <Box className="px-6 py-4">
                    <Heading size="4" mb="4">
                        Background Video
                    </Heading>

                    <Grid columns="4" gap="4">
                        {BACKGROUNDS.map((background) => (
                            <Box key={`${background.id}_bg_vid`} className="aspect-4/3 rounded-lg bg-[--gray-5]" />
                        ))}
                    </Grid>
                </Box>
            </Inset>
        </Card>
    );
}
