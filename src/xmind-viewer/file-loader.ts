import { normalizeInvisibleCentralTopicTextColor } from './theme-loader';
import {
    extractXMindWorkbookMetadata,
    XMindWorkbookMetadata,
} from './workbook-model';
import { readZipTextFile, replaceZipTextFile } from './xmind-zip';

export interface LoadedLocalXMindFile {
    binary: ArrayBuffer;
    workbook: XMindWorkbookMetadata;
}

const EMPTY_WORKBOOK_METADATA: XMindWorkbookMetadata = {
    sheets: [],
};

export async function loadLocalXMindFile(
    file: ArrayBuffer
): Promise<LoadedLocalXMindFile> {
    try {
        const contentText = readZipTextFile(file, 'content.json');
        if (!contentText) {
            return {
                binary: file,
                workbook: EMPTY_WORKBOOK_METADATA,
            };
        }

        const content = JSON.parse(contentText) as unknown;
        const workbook = extractXMindWorkbookMetadata(content);

        if (!normalizeInvisibleCentralTopicTextColor(content)) {
            return {
                binary: file,
                workbook,
            };
        }

        return {
            binary: replaceZipTextFile(
                file,
                'content.json',
                JSON.stringify(content)
            ),
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
