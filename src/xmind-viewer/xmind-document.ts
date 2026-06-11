import { normalizeInvisibleCentralTopicTextColor } from './theme-loader';
import { readZipTextFile } from './xmind-zip';

export interface XMindTopicPosition {
    x: number;
    y: number;
}

export interface XMindTopicNode {
    id: string;
    title: string;
    structureClass?: string;
    branch?: string;
    position?: XMindTopicPosition;
    children: XMindTopicNode[];
}

export interface XMindDocumentSheet {
    id: string;
    title: string;
    structureClass?: string;
    rootTopic: XMindTopicNode;
}

export interface XMindDocument {
    sheets: XMindDocumentSheet[];
}

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function normalizeText(value: unknown, fallback: string): string {
    if (typeof value === 'string' && value.trim()) {
        return value.trim();
    }

    if (isRecord(value) && typeof value.plain === 'string') {
        return value.plain.trim() || fallback;
    }

    return fallback;
}

function normalizeSheets(content: unknown): unknown[] {
    if (Array.isArray(content)) {
        return content;
    }

    if (!isRecord(content)) {
        return [];
    }

    if (Array.isArray(content.sheets)) {
        return content.sheets;
    }

    if (isRecord(content.workbook) && Array.isArray(content.workbook.sheets)) {
        return content.workbook.sheets;
    }

    return [];
}

function normalizeChildList(value: unknown): unknown[] {
    if (Array.isArray(value)) {
        return value;
    }

    if (isRecord(value) && Array.isArray(value.items)) {
        return value.items;
    }

    return [];
}

function normalizeString(value: unknown): string | undefined {
    return typeof value === 'string' && value ? value : undefined;
}

function normalizePosition(value: unknown): XMindTopicPosition | undefined {
    if (!isRecord(value)) {
        return undefined;
    }

    const x = Number(value.x);
    const y = Number(value.y);
    if (!Number.isFinite(x) || !Number.isFinite(y)) {
        return undefined;
    }

    return { x, y };
}

function readTopicChildren(topic: UnknownRecord): unknown[] {
    const children = topic.children;
    if (!isRecord(children)) {
        return [];
    }

    return [
        ...normalizeChildList(children.attached),
        ...normalizeChildList(children.detached),
    ];
}

function parseTopic(topic: unknown, fallbackTitle: string): XMindTopicNode {
    if (!isRecord(topic)) {
        return {
            id: fallbackTitle,
            title: fallbackTitle,
            children: [],
        };
    }

    const id = normalizeText(topic.id, fallbackTitle);
    const title = normalizeText(topic.title, fallbackTitle);

    return {
        id,
        title,
        structureClass: normalizeString(topic.structureClass),
        branch: normalizeString(topic.branch),
        position: normalizePosition(topic.position),
        children: readTopicChildren(topic).map((child, index) =>
            parseTopic(child, `${title}-${index + 1}`)
        ),
    };
}

function parseSheet(sheet: unknown, index: number): XMindDocumentSheet | null {
    if (!isRecord(sheet)) {
        return null;
    }

    const rootTopic = parseTopic(sheet.rootTopic, `Sheet ${index + 1}`);
    const id = normalizeText(sheet.id, `sheet-${index + 1}`);
    const title = normalizeText(sheet.title, rootTopic.title || id);

    return {
        id,
        title,
        structureClass: rootTopic.structureClass,
        rootTopic,
    };
}

export async function parseXMindDocument(
    file: ArrayBuffer
): Promise<XMindDocument> {
    const contentText = readZipTextFile(file, 'content.json');
    if (!contentText) {
        throw new Error('XMind 文件缺少 content.json');
    }

    const content = JSON.parse(contentText) as unknown;
    normalizeInvisibleCentralTopicTextColor(content);

    const sheets = normalizeSheets(content)
        .map(parseSheet)
        .filter((sheet): sheet is XMindDocumentSheet => sheet !== null);

    if (sheets.length === 0) {
        throw new Error('XMind 文件没有可渲染的 sheet');
    }

    return { sheets };
}
