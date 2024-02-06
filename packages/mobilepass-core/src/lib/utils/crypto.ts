export async function sha256(data: BufferSource): Promise<ArrayBuffer> {
    // eslint-disable-next-line @typescript-eslint/return-await
    return await crypto.subtle.digest("SHA-256", data);
}

export async function hmacSHA256(key: BufferSource, data: BufferSource): Promise<ArrayBuffer> {
    const importedKey = await crypto.subtle.importKey(
        "raw",
        key,
        {
            name: "HMAC",
            hash: { name: "SHA-256" },
        },
        false,
        ["sign"],
    );

    // eslint-disable-next-line @typescript-eslint/return-await
    return await crypto.subtle.sign("HMAC", importedKey, data);
}
