import React from "react";
import { noise2D } from "@remotion/noise";
import { Img, useCurrentFrame } from "remotion";

const SPEED = 0.012;
const MAX_OFFSET = 30;

export function Background(props: { src: string; idx: number }) {
    const frame = useCurrentFrame();
    const scale = scaleInAnimation(frame, 0, 9999, props.idx % 2 === 0 ? "in" : "out");
    const dx = noise2D(`${props.src}_x`, props.idx, frame * SPEED) * MAX_OFFSET;
    const dy = noise2D(`${props.src}_y`, props.idx, frame * SPEED) * MAX_OFFSET;

    return (
        <Img
            src={props.src}
            style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: `scale(${scale.scale + 0.1}) translate(${dx}px, ${dy}px)`,
            }}
        />
    );
}

function scaleInAnimation(frame: number, start: number, duration: number, direction: "in" | "out") {
    const BREATHE_PER_FRAME = direction === "in" ? 0.0005 : -0.0005;
    const breathe = frame >= start && frame < start + duration ? (frame - start) * BREATHE_PER_FRAME : 0;
    return { scale: (direction === "in" ? 1 : 1.2) + breathe };
}
