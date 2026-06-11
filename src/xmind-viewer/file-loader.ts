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

export async function loadLocalXMindFile(
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
