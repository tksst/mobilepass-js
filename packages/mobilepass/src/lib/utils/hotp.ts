import { hmacSHA256 } from "./crypto.js";

function numToBigEndianBytes(value: number | bigint): ArrayBuffer {
    const buf = new ArrayBuffer(8);
    const view = new DataView(buf);
    view.setBigUint64(0, BigInt(value));
    return buf;
}

function truncate(mac: Uint8Array, digits: number): number {
    // lowest 4 bits of the last byte
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const offset = mac[mac.length - 1]! & 0x0f;

    const view = new DataView(mac.buffer, offset);

    // read 32 bit big endian integer and clear the highest bit
    const value = view.getUint32(0) & 0x7fffffff;

    return value % 10 ** digits;
}

export async function hotpSHA256(key: ArrayBuffer | ArrayBufferView, counter: number | bigint): Promise<string> {
    if (counter < 0) {
        throw new RangeError(`counter: ${counter} is not a natural number.`);
    }

    if (counter > 2n ** 64n - 1n) {
        throw new RangeError(`counter: ${counter} must be less than 2^64 - 1.`);
    }

    if (typeof counter === "number") {
        if (!Number.isInteger(counter)) {
            throw new RangeError(`counter: ${counter} is not an integer.`);
        }
        if (!Number.isSafeInteger(counter)) {
            throw new RangeError(`counter: ${counter} is not a safe integer. Use BigInt instead.`);
        }
    }

    const mac = await hmacSHA256(key, numToBigEndianBytes(counter));

    const digits = 6;
    return truncate(new Uint8Array(mac), digits).toString().padStart(digits, "0");
}
