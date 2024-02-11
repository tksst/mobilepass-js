import { libOptions } from "@tksst/project-configs/tsup-config.mjs";
import { defineConfig } from "tsup";

export default defineConfig({
    ...libOptions,
    entry: ["src/lib/node.ts"],
    target: ["node15.0.0"],

    // If you know that this library is for Node.js or for a browser, you may want to set the platform.
    // platform: "node",
    // platform: "browser",
});
