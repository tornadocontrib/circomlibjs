export function toHexString(value) {
    return `0x${Array.from(value).map(x => x.toString(16).padStart(2, '0')).join('')}`
}

export function hexToBytes(value) {
    if (!/^0x[a-fA-F0-9]*$/.test(value)) throw new Error(`Expected a hex encoded byte array but got ${value}`)
    if (value.length % 2 !== 0) throw new Error(`Expected an even number of nibbles but found ${value.length - 2} nibbles.`)
    const result = new Uint8Array((value.length - 2) / 2)
    for (let i = 0; i < result.length; ++i) {
        result[i] = Number.parseInt(value.slice(i * 2 + 2, i * 2 + 4), 16)
    }
    return result
}

export function toUtf8Bytes(str) {
    let result = [];
    for (let i = 0; i < str.length; i++) {
        const c = str.charCodeAt(i);

        if (c < 0x80) {
            result.push(c);

        } else if (c < 0x800) {
            result.push((c >> 6) | 0xc0);
            result.push((c & 0x3f) | 0x80);

        } else if ((c & 0xfc00) == 0xd800) {
            i++;
            const c2 = str.charCodeAt(i);

            if (i >= str.length || (c2 & 0xfc00) !== 0xdc00) {
                throw new Error("invalid utf-8 string");
            }

            // Surrogate Pair
            const pair = 0x10000 + ((c & 0x03ff) << 10) + (c2 & 0x03ff);
            result.push((pair >> 18) | 0xf0);
            result.push(((pair >> 12) & 0x3f) | 0x80);
            result.push(((pair >> 6) & 0x3f) | 0x80);
            result.push((pair & 0x3f) | 0x80);

        } else {
            result.push((c >> 12) | 0xe0);
            result.push(((c >> 6) & 0x3f) | 0x80);
            result.push((c & 0x3f) | 0x80);
        }
    }

    return Uint8Array.from(result);
}
