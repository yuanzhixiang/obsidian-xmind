export interface XMindWorkbookSheet {
    id: string;
    title: string;
}

export interface XMindWorkbookMetadata {
    sheets: XMindWorkbookSheet[];
}

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function normalizeWorkbookSheets(content: unknown): unknown[] {
    if (Array.isArray(content)) {
        return content;
    }

    if (!isRecord(content)) {
        return [];
    }

    const workbook = content.workbook;
    if (isRecord(workbook) && Array.isArray(workbook.sheets)) {
        return workbook.sheets;
    }

    if (Array.isArray(content.sheets)) {
        return content.sheets;
    }

    return [];
}

function toWorkbookSheet(sheet: unknown): XMindWorkbookSheet | null {
    if (!isRecord(sheet)) {
        return null;
    }

    const id = typeof sheet.id === 'string' ? sheet.id : '';
    if (!id) {
        return null;
    }

    const title =
        typeof sheet.title === 'string' && sheet.title ? sheet.title : id;

    return { id, title };
}

export function extractXMindWorkbookMetadata(
    content: unknown
): XMindWorkbookMetadata {
    return {
        sheets: normalizeWorkbookSheets(content)
            .map(toWorkbookSheet)
            .filter((sheet): sheet is XMindWorkbookSheet => sheet !== null),
    };
}
