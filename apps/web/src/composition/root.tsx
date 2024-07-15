import { Composition, getInputProps } from "remotion";
import { CompositionV1 } from "./composition-v1";

export interface RemotionRootProps {
    fps: number;
    width: number;
    height: number;
    durationInFrames: number;
    data: {
        scenes: any[];
        voiceover: string;
    };
}

export function RemotionRoot() {
    const config = getInputProps() as any as RemotionRootProps;
    // const config = require("../../props/robot_barista.json") as any as RemotionRootProps;

    return (
        <Composition
            id="CompositionV1"
            component={CompositionV1}
            fps={config.fps}
            width={config.width}
            height={config.height}
            defaultProps={config.data}
            durationInFrames={config.durationInFrames}
        />
    );
}
