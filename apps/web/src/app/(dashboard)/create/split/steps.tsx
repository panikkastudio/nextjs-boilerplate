"use client";

import { useState } from "react";
import { Container } from "@radix-ui/themes";

import { UploadVideo } from "./step-upload";
import { BackgroundVideo } from "./step-background";
import { SubtitleStyle } from "./step-subtitles";
import { Navigation } from "../navigation";

export function Steps() {
    const [current, setCurrent] = useState(0);

    const STEPS: any = {
        0: <UploadVideo projectId={"adsd"} />,
        1: <BackgroundVideo projectId={"adsd"} />,
        2: <SubtitleStyle projectId={"adsd"} />,
    };

    return (
        <>
            <Navigation
                title="Split Video"
                current={current}
                onChange={setCurrent}
                onFinish={() => ({})}
                steps={[{ title: "Upload" }, { title: "Background" }, { title: "Subtitles" }]}
            />
            <Container>{STEPS[current]}</Container>
        </>
    );
}
