"use client";

import { useState } from "react";
import { Container } from "@radix-ui/themes";

import { Script } from "./step-script";
import { BackgroundVideo } from "./step-background";
import { SubtitleStyle } from "./step-subtitles";
import { Navigation } from "../navigation";

export function Steps() {
    const [current, setCurrent] = useState(0);

    const STEPS: any = {
        0: <Script projectId={"adsd"} />,
        1: <SubtitleStyle projectId={"adsd"} />,
        2: <BackgroundVideo projectId={"adsd"} />,
    };

    return (
        <>
            <Navigation
                title="Fake Texts Video"
                current={current}
                onChange={setCurrent}
                onFinish={() => ({})}
                steps={[{ title: "Script" }, { title: "Voice" }, { title: "Background" }]}
            />
            <Container>{STEPS[current]}</Container>
        </>
    );
}
