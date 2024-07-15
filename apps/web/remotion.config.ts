// See all configuration options: https://remotion.dev/docs/config
// Each option also is available as a CLI flag: https://remotion.dev/docs/cli
// Note: The configuration file does only apply if you render via the CLI !
import { Config } from "@remotion/cli/config";

Config.setOverwriteOutput(true);
Config.setStillImageFormat("jpeg");
Config.setEntryPoint("./src/composition/index.tsx");
