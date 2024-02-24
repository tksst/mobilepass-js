export async function sha256(data: BufferSource): Promise<ArrayBuffer> {
    return await crypto.subtle.digest("SHA-256", data);
}

export async function hmacSHA256(key: ArrayBuffer, data: ArrayBuffer): Promise<ArrayBuffer> {
    const importedKey = await crypto.subtle.importKey(
        "raw",
        // Next.js Edge Runtime has a bug and wraps with Uint8Array to work around it.
        // https://github.com/vercel/edge-runtime/issues/813
        new Uint8Array(key),
        {
            name: "HMAC",
            hash: { name: "SHA-256" },
        },
        false,
        ["sign"],
    );

    return await crypto.subtle.sign("HMAC", importedKey, new Uint8Array(data));
}
