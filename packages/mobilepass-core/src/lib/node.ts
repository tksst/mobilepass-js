export { generate } from "./main/main.js";
export { InvalidActivationCodeError } from "./utils/utils.js";

// @ts-expect-error This error is intended because this is polyfill for Node.js
import { webcrypto } from "node:crypto";

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (globalThis.crypto === undefined) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    globalThis.crypto = webcrypto;
}
