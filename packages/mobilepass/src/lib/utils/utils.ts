import base32Decode from "base32-decode";

import { sha256 } from "./crypto.js";

export class InvalidActivationCodeError extends Error {
    public constructor(message?: string, options?: { cause: unknown }) {
        super(message, options);
        this.name = "InvalidActivationCodeError";
    }
}

const activationCodeRegex = /^([2-7A-Z]{4})[2-7A-Z]-([2-7A-Z]{4})[2-7A-Z]-([2-7A-Z]{4})[2-7A-Z]-([2-7A-Z]{4})[2-7A-Z]$/;

const errorStr = "Invalid activation code";

export function activationCodeToKey(activationCode: string): Uint8Array {
    const result = activationCodeRegex.exec(activationCode);

    if (result === null) {
        throw new InvalidActivationCodeError(errorStr);
    }

    const decoded = (() => {
        try {
            return base32Decode(`${result[1]}${result[2]}${result[3]}${result[4]}`, "RFC4648");
        } catch (error) {
            throw new InvalidActivationCodeError(errorStr, { cause: error });
        }
    })();

    return new Uint8Array(decoded);
}

// Ported and simplified from:
// datr/MobilePASSER
// https://github.com/datr/MobilePASSER/blob/798252e73eaeae9308521c67b09d1433bd322766/mobilepasser/utils/token_generation.py#L14
// bouncycastle
// https://github.com/bcgit/bc-java/blob/a4e57f2019867c7ee86508fc5b136d73fd4922d9/core/src/main/java/org/bouncycastle/crypto/generators/KDF1BytesGenerator.java
export async function fixedKdfSha256(secret: Uint8Array): Promise<ArrayBuffer> {
    const data = new Uint8Array(secret.length + 4);
    data.set(secret, 0);

    return await sha256(data);
}
