import { describe, expect, it } from "vitest";

import { InvalidActivationCodeError } from "../utils/utils.js";
import { generate } from "./main.js";

const actCode1 = "XUU75-RROTT-Y5IP6-U3BMV";
const actCode2 = "2G5NX-EYGRU-6IRP6-KDDG3";

describe("generate", () => {
    it("Usual case", async () => {
        expect(await generate(actCode1, 0)).toBe("246805");
        expect(await generate(actCode1, 1)).toBe("598141");
        expect(await generate(actCode1, 2)).toBe("445167");
        expect(await generate(actCode1, 3)).toBe("201140");
        expect(await generate(actCode1, 4)).toBe("474662");

        expect(await generate(actCode2, 0)).toBe("700124");
        expect(await generate(actCode2, 1)).toBe("205050");
        expect(await generate(actCode2, 2)).toBe("317499");
        expect(await generate(actCode2, 3)).toBe("178992");
        expect(await generate(actCode2, 4)).toBe("555776");
    });

    it("Invalid counter: negative value", async () => {
        await expect(generate(actCode1, -1)).rejects.toThrow(RangeError);
    });

    it("Invalid counter: non-integer value", async () => {
        await expect(generate(actCode1, 0.5)).rejects.toThrow(RangeError);
    });

    it("Invalid counter: too large", async () => {
        await expect(generate(actCode1, 2n ** 64n)).rejects.toThrow(RangeError);
    });

    it("Invalid counter: NaN", async () => {
        await expect(generate(actCode1, Number.NaN)).rejects.toThrow(RangeError);
    });

    it("Invalid activation code", async () => {
        await expect(generate("foo", 0)).rejects.toThrow(InvalidActivationCodeError);
        await expect(generate(actCode1.toLowerCase(), 0)).rejects.toThrow(InvalidActivationCodeError);
    });
});
