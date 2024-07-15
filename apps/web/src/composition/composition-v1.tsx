import { linearTiming, TransitionPresentation, TransitionPresentationComponentProps, TransitionSeries } from "@remotion/transitions";
import { loadFont } from "@remotion/google-fonts/OpenSans";
import React, { useEffect, useState } from "react";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { AbsoluteFill, Audio } from "remotion";
import { Background } from "./background";
import { Captions } from "./captions";

export type CompositionV1Props = {
    voiceover: string;
    scenes: {
        start: number;
        end: number;
        image: string;
        text: string;
        words: {
            start: number;
            end: number;
            word: string;
        }[];
    }[];
};

const fadeWithSound = addSound(fade(), "https://magicshorts.s3.amazonaws.com/effects/whoosh-6316.mp3");
const fromLeftWithSound = addSound(slide({ direction: "from-left" }), "https://magicshorts.s3.amazonaws.com/effects/whoosh-6316.mp3");
const fromRightWithSound = addSound(slide({ direction: "from-right" }), "https://magicshorts.s3.amazonaws.com/effects/whoosh-6316.mp3");
const presentations = [fadeWithSound, fromLeftWithSound, fromRightWithSound];

const TRANSITION_DURATION_IN_FRAMES = 5;
const { fontFamily, waitUntilDone } = loadFont();

function hash(s: string) {
    return s.split("").reduce(function (a, b) {
        a = (a << 5) - a + b.charCodeAt(0);
        return a & a;
    }, 0);
}

export const CompositionV1: React.FC<CompositionV1Props> = (props) => {
    const [fontLoaded, setFontLoaded] = useState(false);

    useEffect(() => {
        waitUntilDone().then(() => {
            setFontLoaded(true);
        });
    }, []);

    return (
        <AbsoluteFill style={{ backgroundColor: "orange", fontFamily }}>
            <TransitionSeries>
                {props.scenes.map((scene, idx) => {
                    const next = props.scenes[idx + 1]?.start ?? scene.end + 30;
                    const h = hash(scene.image) % presentations.length;
                    const presentation = presentations[h];

                    return [
                        <TransitionSeries.Sequence durationInFrames={Math.ceil((next - scene.start) * 30) + TRANSITION_DURATION_IN_FRAMES}>
                            <Background idx={idx} src={`https://magicshorts.s3.amazonaws.com/${scene.image}`} />
                        </TransitionSeries.Sequence>,

                        ...[
                            idx !== props.scenes.length - 1
                                ? [
                                      <TransitionSeries.Transition
                                          presentation={presentation}
                                          timing={linearTiming({ durationInFrames: TRANSITION_DURATION_IN_FRAMES })}
                                      />,
                                  ]
                                : [],
                        ],
                    ];
                })}
            </TransitionSeries>

            {fontLoaded && <Captions segments={props.scenes} />}

            <Audio src={`https://magicshorts.s3.amazonaws.com/${props.voiceover}`} pauseWhenBuffering />
        </AbsoluteFill>
    );
};

function addSound<T extends Record<string, unknown>>(transition: TransitionPresentation<T>, src: string): TransitionPresentation<T> {
    const { component: Component, ...other } = transition;

    const C = Component as React.FC<TransitionPresentationComponentProps<T>>;

    const NewComponent: React.FC<TransitionPresentationComponentProps<T>> = (p) => {
        return (
            <>
                {p.presentationDirection === "entering" ? <Audio src={src} volume={0.1} /> : null}
                <C {...p} />
            </>
        );
    };

    return {
        component: NewComponent,
        ...other,
    };
}
