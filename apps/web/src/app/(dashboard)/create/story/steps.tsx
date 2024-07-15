"use client";

import { useState } from "react";
import { Container } from "@radix-ui/themes";

import { EnterTopic } from "./step-topic";
import { BackgroundVideo } from "./step-background";
import { SubtitleStyle } from "./step-subtitles";
import { Navigation } from "../navigation";

export function Steps() {
    const [current, setCurrent] = useState(0);

    const STEPS: any = {
        0: <EnterTopic projectId={"adsd"} />,
        1: <BackgroundVideo projectId={"adsd"} />,
        2: <SubtitleStyle projectId={"adsd"} />,
    };

    return (
        <>
            <Navigation
                title="Story Video"
                current={current}
                onChange={setCurrent}
                onFinish={() => ({})}
                steps={[{ title: "Script" }, { title: "Subtitles" }, { title: "Background" }, { title: "Voice" }]}
            />
            <Container>{STEPS[current]}</Container>
        </>
    );
}
