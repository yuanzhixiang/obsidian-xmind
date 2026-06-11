import JSZip from 'jszip';
import { normalizeInvisibleCentralTopicTextColor } from './theme-loader';
import {
    extractXMindWorkbookMetadata,
    XMindWorkbookMetadata,
} from './workbook-model';

export interface LoadedLocalXMindFile {
    binary: ArrayBuffer;
    workbook: XMindWorkbookMetadata;
}

const EMPTY_WORKBOOK_METADATA: XMindWorkbookMetadata = {
    sheets: [],
};

type MutationObserverValue = typeof globalThis.MutationObserver;

interface SchedulerRoot {
    MutationObserver?: MutationObserverValue;
    WebKitMutationObserver?: MutationObserverValue;
}

interface SchedulerObserverSnapshot {
    root: SchedulerRoot;
    mutationObserver: MutationObserverValue | undefined;
    webKitMutationObserver: MutationObserverValue | undefined;
}

function collectSchedulerRoots(): SchedulerRoot[] {
    const candidates: Array<SchedulerRoot | undefined> = [
        globalThis,
        typeof window !== 'undefined' ? window : undefined,
        typeof self !== 'undefined' ? self : undefined,
    ];

    return candidates.filter(
        (root, index, roots): root is SchedulerRoot =>
            root !== undefined && roots.indexOf(root) === index
    );
}

function setSchedulerObserver(
    root: SchedulerRoot,
    property: 'MutationObserver' | 'WebKitMutationObserver',
    value: MutationObserverValue | undefined
): void {
    try {
        Object.defineProperty(root, property, {
            configurable: true,
            writable: true,
            value,
        });
    } catch {
        root[property] = value;
    }
}

async function withLegacySchedulerGuard<T>(
    operation: () => Promise<T>
): Promise<T> {
    const snapshots = collectSchedulerRoots().map((root) => ({
        root,
        mutationObserver: root.MutationObserver,
        webKitMutationObserver: root.WebKitMutationObserver,
    }));

    for (const snapshot of snapshots) {
        setSchedulerObserver(snapshot.root, 'MutationObserver', undefined);
        setSchedulerObserver(
            snapshot.root,
            'WebKitMutationObserver',
            undefined
        );
    }

    try {
        return await operation();
    } finally {
        for (const snapshot of snapshots) {
            setSchedulerObserver(
                snapshot.root,
                'MutationObserver',
                snapshot.mutationObserver
            );
            setSchedulerObserver(
                snapshot.root,
                'WebKitMutationObserver',
                snapshot.webKitMutationObserver
            );
        }
    }
}

export async function loadLocalXMindFile(
    file: ArrayBuffer
): Promise<LoadedLocalXMindFile> {
    return withLegacySchedulerGuard(() => loadLocalXMindFileWithoutGuard(file));
}

async function loadLocalXMindFileWithoutGuard(
    file: ArrayBuffer
): Promise<LoadedLocalXMindFile> {
    try {
        const zip = await JSZip.loadAsync(file);
        const contentJson = zip.file('content.json');

        if (!contentJson) {
            return {
                binary: file,
                workbook: EMPTY_WORKBOOK_METADATA,
            };
        }

        const contentText = await contentJson.async('string');
        const content = JSON.parse(contentText) as unknown;
        const workbook = extractXMindWorkbookMetadata(content);

        if (!normalizeInvisibleCentralTopicTextColor(content)) {
            return {
                binary: file,
                workbook,
            };
        }

        zip.file('content.json', JSON.stringify(content));

        return {
            binary: await zip.generateAsync({
                type: 'arraybuffer',
                compression: 'DEFLATE',
            }),
            workbook,
        };
    } catch {
        return {
            binary: file,
            workbook: EMPTY_WORKBOOK_METADATA,
        };
    }
}

export async function normalizeLocalXMindFile(
    file: ArrayBuffer
): Promise<ArrayBuffer> {
    return (await loadLocalXMindFile(file)).binary;
}
