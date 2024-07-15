"use client";

import { Box, Container, Grid, IconButton } from "@radix-ui/themes";
import { PlayIcon } from "lucide-react";
import { useState } from "react";

export function Examples() {
    return (
        <Container flexGrow="0">
            <Grid gap="4" columns={{ initial: "1", sm: "2", lg: "4" }}>
                <VideoExample
                    url="https://d474im7bs1lz.cloudfront.net/videos/remote_village.mp4"
                    thumbnail="https://d474im7bs1lz.cloudfront.net/videos/remote_village.jpg"
                />
                <VideoExample
                    url="https://d474im7bs1lz.cloudfront.net/videos/robot_barista.mp4"
                    thumbnail="https://d474im7bs1lz.cloudfront.net/videos/robot_barista.jpg"
                />
                <VideoExample
                    url="https://d474im7bs1lz.cloudfront.net/videos/not_any_machine.mp4"
                    thumbnail="https://d474im7bs1lz.cloudfront.net/videos/not_any_machine.jpg"
                />
                <VideoExample
                    url="https://d474im7bs1lz.cloudfront.net/videos/long_ago_creative_realm.mp4"
                    thumbnail="https://d474im7bs1lz.cloudfront.net/videos/long_ago_creative_realm.jpg"
                />
            </Grid>
        </Container>
    );
}

function VideoExample({ url, thumbnail }: { url: string; thumbnail: string }) {
    const [playing, setPlaying] = useState(false);

    return (
        <Box
            className="relative aspect-[9/16] w-screen border-4 border-[--orange-10] bg-[--orange-10] rounded-xl max-w-full md:max-w-[270px] overflow-hidden"
            style={{ background: `url('${thumbnail}'), var(--orange-10)`, backgroundSize: "cover" }}
            onClick={() => !playing && setPlaying(true)}
        >
            {playing ? (
                <video controls className="w-full h-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover" autoPlay>
                    <source src={url} type="video/mp4" />
                </video>
            ) : (
                <IconButton className="absolute bottom-4 right-4" radius="full" onClick={() => setPlaying(true)} size="4">
                    <PlayIcon fill="currentColor" className="w-6 h-6" />
                </IconButton>
            )}
        </Box>
    );
}
