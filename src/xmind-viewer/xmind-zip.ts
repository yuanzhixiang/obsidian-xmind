import {
    strFromU8 as fflateStrFromU8,
    strToU8 as fflateStrToU8,
    unzipSync as fflateUnzipSync,
    zipSync as fflateZipSync,
} from 'fflate';

type ZipEntries = Record<string, Uint8Array | undefined>;

interface ZipOptions {
    level?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
}

interface FflateSyncApi {
    strFromU8(bytes: Uint8Array): string;
    strToU8(text: string): Uint8Array;
    unzipSync(file: Uint8Array): Record<string, Uint8Array>;
    zipSync(entries: Record<string, Uint8Array>, options?: ZipOptions): Uint8Array;
}

// fflate 0.8.3 exposes newer generic typed-array declarations; keep this file
// on a TS 5.5-compatible API surface so strict scans do not see error-typed IO.
const fflateSync: FflateSyncApi = {
    strFromU8: fflateStrFromU8 as unknown as FflateSyncApi['strFromU8'],
    strToU8: fflateStrToU8 as unknown as FflateSyncApi['strToU8'],
    unzipSync: fflateUnzipSync as unknown as FflateSyncApi['unzipSync'],
    zipSync: fflateZipSync as unknown as FflateSyncApi['zipSync'],
};

function toUint8Array(file: ArrayBuffer): Uint8Array {
    return new Uint8Array(file);
}

function toArrayBuffer(bytes: Uint8Array): ArrayBuffer {
    return bytes.buffer.slice(
        bytes.byteOffset,
        bytes.byteOffset + bytes.byteLength
    );
}

function toZipInput(entries: ZipEntries): Record<string, Uint8Array> {
    const zipInput: Record<string, Uint8Array> = {};
    for (const entryName in entries) {
        const entry = entries[entryName];
        if (entry !== undefined) {
            zipInput[entryName] = entry;
        }
    }
    return zipInput;
}

export function readZipEntries(file: ArrayBuffer): ZipEntries {
    return fflateSync.unzipSync(toUint8Array(file));
}

export function readZipTextFile(
    file: ArrayBuffer,
    fileName: string
): string | null {
    const entry = readZipEntries(file)[fileName];
    return entry === undefined ? null : fflateSync.strFromU8(entry);
}

export function replaceZipTextFile(
    file: ArrayBuffer,
    fileName: string,
    text: string
): ArrayBuffer {
    const entries = toZipInput(readZipEntries(file));
    entries[fileName] = fflateSync.strToU8(text);
    return toArrayBuffer(fflateSync.zipSync(entries, { level: 6 }));
}
