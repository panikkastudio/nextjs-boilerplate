import { defineConfig, type Options } from "tsup";

export default defineConfig((options: Options) => ({
    ...options,
    entryPoints: ["src/client.ts"],
    skipNodeModulesBundle: true,
    clean: true,
    format: ["esm"],
    cjsInterop: true,
    dts: true,
    legacyOutput: false,
    splitting: false,
    sourcemap: true,
    shims: true,
}));
