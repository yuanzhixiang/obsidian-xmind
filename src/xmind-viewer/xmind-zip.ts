import { strFromU8, strToU8, unzipSync, zipSync } from 'fflate';

type ZipEntries = Record<string, Uint8Array | undefined>;

function toUint8Array(file: ArrayBuffer): Uint8Array {
    return new Uint8Array(file);
}

function toArrayBuffer(bytes: Uint8Array): ArrayBuffer {
    return bytes.buffer.slice(
        bytes.byteOffset,
        bytes.byteOffset + bytes.byteLength
    );
}

export function readZipEntries(file: ArrayBuffer): ZipEntries {
    return unzipSync(toUint8Array(file));
}

export function readZipTextFile(
    file: ArrayBuffer,
    fileName: string
): string | null {
    const entry = readZipEntries(file)[fileName];
    return entry === undefined ? null : strFromU8(entry);
}

export function replaceZipTextFile(
    file: ArrayBuffer,
    fileName: string,
    text: string
): ArrayBuffer {
    const entries = readZipEntries(file);
    entries[fileName] = strToU8(text);
    return toArrayBuffer(
        zipSync(entries as Record<string, Uint8Array>, { level: 6 })
    );
}
