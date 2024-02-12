import { describe, expect, it } from "vitest";

import { generateOtp, InvalidActivationCodeError } from "./node.js";

const actCode1 = "XUU75-RROTT-Y5IP6-U3BMV";
const actCode3 = "V5GWR-D5WXT-ZSGGR-WSW3O";

describe("generateOtp", () => {
    it.each([
        [actCode1, 0, "246805"],
        [actCode1, 1, "598141"],
        [actCode1, 2, "445167"],
        [actCode1, 3, "201140"],
        [actCode1, 4, "474662"],
        [actCode3, 0, "897020"],
        [actCode3, 1, "995047"],
        [actCode3, 2, "664206"],
        [actCode3, 3, "084197"],
        [actCode3, 4, "924498"],
        [actCode3, 5, "744033"],
    ])("Usual case, code: %s, counter: %i", async (actcode, counter, value) => {
        expect(await generateOtp(actcode, counter)).toBe(value);
    });

    it.each([
        ["negative", -1],
        ["non-integer", 0.5],
        ["too large", 2n ** 64n],
        ["NaN", Number.NaN],
    ])("Invalid counter, %s", async (ex, value) => {
        await expect(generateOtp(actCode3, value)).rejects.toThrow(RangeError);
    });

    it("Invalid activation code", async () => {
        await expect(generateOtp("foo", 0)).rejects.toThrow(InvalidActivationCodeError);
        await expect(generateOtp(actCode3.toLowerCase(), 0)).rejects.toThrow(InvalidActivationCodeError);
    });
});
