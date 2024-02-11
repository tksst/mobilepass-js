import { hotpSHA256 } from "../utils/hotp.js";
import { activationCodeToKey, fixedKdfSha256 } from "../utils/utils.js";

/**
 * Generate an One-Time Password (OTP)
 * @param activationCode Your activation code
 * @param counter counter
 * @returns Generated an One-Time Password (OTP)
 */
export async function generateOtp(activationCode: string, counter: number | bigint): Promise<string> {
    const key1 = activationCodeToKey(activationCode);
    const key2 = await fixedKdfSha256(key1);

    return await hotpSHA256(key2, counter);
}
