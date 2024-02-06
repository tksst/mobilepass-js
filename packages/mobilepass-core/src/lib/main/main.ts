import { hotpSHA256 } from "../utils/hotp.js";
import { activationCodeToKey, fixedKdfSha256 } from "../utils/utils.js";

export async function generate(activationCode: string, counter: number | bigint): Promise<string> {
    const key1 = activationCodeToKey(activationCode);
    const key2 = await fixedKdfSha256(key1);

    return hotpSHA256(key2, counter);
}
