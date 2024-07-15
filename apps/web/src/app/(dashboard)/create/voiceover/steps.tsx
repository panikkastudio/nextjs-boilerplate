"use client";

import { useState } from "react";
import { Container } from "@radix-ui/themes";

import { UploadVideo } from "./step-upload";
import { Voiceover } from "./step-voiceover";
import { SubtitleStyle } from "./step-subtitles";
import { Navigation } from "../navigation";

export function Steps() {
    const [current, setCurrent] = useState(0);

    const STEPS: any = {
        0: <UploadVideo projectId={"adsd"} />,
        1: <SubtitleStyle projectId={"adsd"} />,
        2: <Voiceover projectId={"adsd"} />,
    };

    return (
        <>
            <Navigation
                title="Voiceover Video"
                current={current}
                onChange={setCurrent}
                onFinish={() => ({})}
                steps={[{ title: "Upload" }, { title: "Subtitle" }, { title: "Voiceover" }]}
            />
            <Container>{STEPS[current]}</Container>
        </>
    );
}
