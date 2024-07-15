import "./captions.css";
import { interpolate, useCurrentFrame } from "remotion";
import { fillTextBox } from "@remotion/layout-utils";
import { useEffect, useRef, useState } from "react";

export interface CaptionsProps {
    segments: {
        start: number;
        end: number;
        text: string;
        words: {
            start: number;
            end: number;
            word: string;
        }[];
    }[];
}

type Word = CaptionsProps["segments"][number]["words"][number];
const FONT_SIZE = 96;
const FONT_WEIGHT = 800;
const FONT_FAMILY = "Open Sans";
const CAPTION_MAX_WIDTH = 800;

export function Captions(props: CaptionsProps) {
    const frame = useCurrentFrame();
    const segment = props.segments.find((segment) => frame <= segment.end * 30);
    const chunks = chunkWordsForSegment(segment);

    const chunk = chunks.find((chunk) => frame <= chunk[chunk.length - 1]?.end * 30);
    const chunkStartFrame = (chunk?.[0].start ?? 0) * 30;

    const text = chunk?.map((word) => word.word).join(" ") ?? "";
    const captionScale = interpolate(frame, [chunkStartFrame, chunkStartFrame + 4], [0.8, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    return (
        <div
            style={{
                top: "50%",
                left: "50%",
                width: `${CAPTION_MAX_WIDTH}px`,
                textAlign: "center",
                position: "absolute",
                textTransform: "uppercase",
                transform: "translate(-50%, -50%)",
            }}
        >
            <svg viewBox="0 0 920 200">
                <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    stroke="black"
                    strokeWidth={20}
                    paintOrder="stroke"
                    strokeLinejoin="round"
                    fontFamily={FONT_FAMILY}
                    fontSize={FONT_SIZE - 10}
                    fontWeight={FONT_WEIGHT}
                    transform={`scale(${captionScale})`}
                    style={{ transformOrigin: "50% 50%" }}
                >
                    {text}
                </text>
            </svg>
        </div>
    );
}

function usePrevious<T>(value: T, distinct: boolean = false) {
    const currentRef = useRef(value);
    const previousRef = useRef<T>();

    if (!distinct) {
        previousRef.current = currentRef.current;
        currentRef.current = value;
    } else if (currentRef.current !== value) {
        previousRef.current = currentRef.current;
        currentRef.current = value;
    }

    return previousRef.current;
}

function chunkWordsForSegment(segment?: CaptionsProps["segments"][number]) {
    if (!segment) {
        return [];
    }

    let chunk: Word[] = [];
    const chunks: Word[][] = [];
    const getBox = () => fillTextBox({ maxLines: 2, maxBoxWidth: CAPTION_MAX_WIDTH });

    let box = getBox();
    let current: Word | undefined;
    const words = [...segment.words];
    while ((current = words.shift())) {
        const result = box.add({ text: current.word.toUpperCase(), fontFamily: FONT_FAMILY, fontSize: FONT_SIZE, fontWeight: FONT_WEIGHT });

        if (result.exceedsBox || result.newLine) {
            chunks.push(chunk);

            chunk = [];
            chunk.push(current);

            box = getBox();
            box.add({ text: current.word.toUpperCase(), fontFamily: FONT_FAMILY, fontSize: FONT_SIZE, fontWeight: FONT_WEIGHT });
        } else {
            chunk.push(current);
        }
    }

    if (chunk.length) {
        chunks.push(chunk);
    }

    return chunks;
}
