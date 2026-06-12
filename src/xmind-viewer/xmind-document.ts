import { normalizeInvisibleCentralTopicTextColor } from './theme-loader';
import { readZipEntries, readZipTextFile } from './xmind-zip';

export interface XMindTopicPosition {
    x: number;
    y: number;
}

export type XMindRawRecord = Record<string, unknown>;

export interface XMindStyle {
    id?: string;
    properties?: XMindRawRecord;
    raw: XMindRawRecord;
}

export interface XMindTopicScopedObject {
    id?: string;
    title?: string;
    topicId?: string;
    range?: string;
    style?: XMindStyle;
    raw: XMindRawRecord;
}

export interface XMindTopicImage {
    source?: string;
    dataUrl?: string;
    width?: number;
    height?: number;
    raw: unknown;
}

export interface XMindTopicTaskInfo {
    progress?: number;
    priority?: string;
    assignee?: string;
    startDate?: string;
    dueDate?: string;
    text: string;
    raw: unknown;
}

export interface XMindRelationship {
    id?: string;
    title?: string;
    end1Id?: string;
    end2Id?: string;
    style?: XMindStyle;
    controlPoints?: XMindRawRecord;
    raw: XMindRawRecord;
}

export interface XMindTopicNode {
    id: string;
    title: string;
    className?: string;
    attributedTitle?: unknown[];
    structureClass?: string;
    branch?: string;
    position?: XMindTopicPosition;
    customWidth?: number;
    href?: string;
    style?: XMindStyle;
    markerRefs: unknown[];
    markerIds: string[];
    labels: unknown[];
    labelTexts: string[];
    notes?: unknown;
    noteText?: string;
    image?: XMindTopicImage;
    numbering?: unknown;
    numberingText?: string;
    taskInfo?: XMindTopicTaskInfo;
    attachments: unknown[];
    attachmentCount: number;
    equation?: unknown;
    equationText?: string;
    audio?: unknown;
    audioText?: string;
    extensions: unknown[];
    boundaries: XMindTopicScopedObject[];
    summaries: XMindTopicScopedObject[];
    childrenByType: { [childType: string]: XMindTopicNode[] | undefined };
    children: XMindTopicNode[];
    raw: XMindRawRecord;
}

export type XMindTopicChildrenByType = XMindTopicNode['childrenByType'];

export interface XMindDocumentSheet {
    id: string;
    title: string;
    className?: string;
    revisionId?: string;
    structureClass?: string;
    rootTopic: XMindTopicNode;
    relationships: XMindRelationship[];
    theme?: XMindRawRecord;
    extensions: unknown[];
    zones: unknown[];
    topicOverlapping?: string;
    topicPositioning?: string;
    floatingTopicFlexible?: boolean;
    raw: XMindRawRecord;
}

export interface XMindDocument {
    sheets: XMindDocumentSheet[];
}

type UnknownRecord = Record<string, unknown>;
type XMindZipEntries = Record<string, Uint8Array | undefined>;

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

function normalizeNumber(value: unknown): number | undefined {
    const numberValue = Number(value);
    return Number.isFinite(numberValue) ? numberValue : undefined;
}

function normalizeBoolean(value: unknown): boolean | undefined {
    return typeof value === 'boolean' ? value : undefined;
}

function normalizeArray(value: unknown): unknown[] {
    return Array.isArray(value) ? value : [];
}

function bytesToBase64(bytes: Uint8Array): string {
    const chunkSize = 0x8000;
    let binary = '';

    for (let index = 0; index < bytes.length; index += chunkSize) {
        const chunk = bytes.subarray(index, index + chunkSize);
        let chunkText = '';
        for (const byte of chunk) {
            chunkText += String.fromCharCode(byte);
        }
        binary += chunkText;
    }

    return btoa(binary);
}

function mimeTypeForResource(path: string, bytes: Uint8Array): string {
    const lowerPath = path.toLowerCase();
    if (lowerPath.endsWith('.svg')) {
        return 'image/svg+xml';
    }

    if (lowerPath.endsWith('.webp')) {
        return 'image/webp';
    }

    if (lowerPath.endsWith('.gif')) {
        return 'image/gif';
    }

    if (lowerPath.endsWith('.jpg') || lowerPath.endsWith('.jpeg')) {
        return 'image/jpeg';
    }

    if (
        bytes.length >= 4 &&
        bytes[0] === 0x89 &&
        bytes[1] === 0x50 &&
        bytes[2] === 0x4e &&
        bytes[3] === 0x47
    ) {
        return 'image/png';
    }

    return 'image/png';
}

function normalizeImageSource(value: unknown): string | undefined {
    if (typeof value === 'string' && value.trim()) {
        return value.trim();
    }

    if (!isRecord(value)) {
        return undefined;
    }

    return (
        normalizeString(value.src) ??
        normalizeString(value.source) ??
        normalizeString(value.url) ??
        normalizeString(value.path) ??
        normalizeString(value.href)
    );
}

function resourcePathCandidates(source: string): string[] {
    const withoutScheme = source.startsWith('xap:')
        ? source.slice('xap:'.length)
        : source;
    const withoutLeadingSlash = withoutScheme.replace(/^\/+/, '');
    const candidates = new Set<string>();
    candidates.add(withoutLeadingSlash);

    try {
        candidates.add(decodeURIComponent(withoutLeadingSlash));
    } catch {
        // Keep the original candidate when percent decoding fails.
    }

    const lastSlash = withoutLeadingSlash.lastIndexOf('/');
    const basename =
        lastSlash >= 0
            ? withoutLeadingSlash.slice(lastSlash + 1)
            : withoutLeadingSlash;
    if (basename) {
        candidates.add(`resources/${basename}`);
    }

    return Array.from(candidates);
}

function resourceDataUrl(
    source: string,
    resources: XMindZipEntries
): string | undefined {
    if (source.startsWith('data:image/')) {
        return source;
    }

    for (const candidate of resourcePathCandidates(source)) {
        const bytes = resources[candidate];
        if (bytes !== undefined) {
            return `data:${mimeTypeForResource(candidate, bytes)};base64,${bytesToBase64(bytes)}`;
        }
    }

    return undefined;
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

function normalizeImage(
    value: unknown,
    resources: XMindZipEntries
): XMindTopicImage | undefined {
    if (value === undefined || value === null) {
        return undefined;
    }

    const source = normalizeImageSource(value);
    const dataUrl = source ? resourceDataUrl(source, resources) : undefined;
    const imageRecord = isRecord(value) ? value : undefined;

    return {
        source,
        dataUrl,
        width:
            normalizeNumber(imageRecord?.width) ??
            normalizeNumber(imageRecord?.['custom-width']),
        height:
            normalizeNumber(imageRecord?.height) ??
            normalizeNumber(imageRecord?.['custom-height']),
        raw: value,
    };
}

function normalizeStyle(value: unknown): XMindStyle | undefined {
    if (typeof value === 'string' && value) {
        return {
            id: value,
            raw: { id: value },
        };
    }

    if (!isRecord(value)) {
        return undefined;
    }

    return {
        id: normalizeString(value.id),
        properties: isRecord(value.properties) ? value.properties : undefined,
        raw: value,
    };
}

function parseTopicScopedObject(value: unknown): XMindTopicScopedObject | null {
    if (!isRecord(value)) {
        return null;
    }

    return {
        id: normalizeString(value.id),
        title: normalizeString(value.title),
        topicId: normalizeString(value.topicId),
        range: normalizeString(value.range),
        style: normalizeStyle(value.style),
        raw: value,
    };
}

function normalizeTopicScopedObjects(value: unknown): XMindTopicScopedObject[] {
    return normalizeChildList(value)
        .map(parseTopicScopedObject)
        .filter((item): item is XMindTopicScopedObject => item !== null);
}

function parseRelationship(value: unknown): XMindRelationship | null {
    if (!isRecord(value)) {
        return null;
    }

    return {
        id: normalizeString(value.id),
        title: normalizeString(value.title),
        end1Id: normalizeString(value.end1Id),
        end2Id: normalizeString(value.end2Id),
        style: normalizeStyle(value.style),
        controlPoints: isRecord(value.controlPoints)
            ? value.controlPoints
            : undefined,
        raw: value,
    };
}

function normalizeRelationships(value: unknown): XMindRelationship[] {
    return normalizeChildList(value)
        .map(parseRelationship)
        .filter((item): item is XMindRelationship => item !== null);
}

function normalizeMarkerId(value: unknown): string | null {
    if (typeof value === 'string' && value.trim()) {
        return value.trim();
    }

    if (!isRecord(value)) {
        return null;
    }

    return (
        normalizeString(value.markerId) ??
        normalizeString(value['marker-id']) ??
        normalizeString(value.id) ??
        normalizeString(value.ref) ??
        null
    );
}

function normalizeMarkerIds(value: unknown): string[] {
    return normalizeArray(value)
        .map(normalizeMarkerId)
        .filter((item): item is string => item !== null);
}

function normalizeLabelText(value: unknown): string | null {
    if (typeof value === 'string' && value.trim()) {
        return value.trim();
    }

    if (!isRecord(value)) {
        return null;
    }

    return (
        normalizeString(value.title) ??
        normalizeString(value.text) ??
        normalizeString(value.name) ??
        null
    );
}

function normalizeLabelTexts(value: unknown): string[] {
    return normalizeArray(value)
        .map(normalizeLabelText)
        .filter((item): item is string => item !== null);
}

function xmlAttribute(
    element: Element,
    ...names: string[]
): string | undefined {
    for (const name of names) {
        const value = element.getAttribute(name);
        if (value) {
            return value;
        }
    }

    return undefined;
}

function directXmlChildren(element: Element, localName?: string): Element[] {
    return Array.from(element.children).filter(
        (child) => localName === undefined || child.localName === localName
    );
}

function directXmlChild(element: Element, localName: string): Element | null {
    return directXmlChildren(element, localName)[0] ?? null;
}

function directXmlText(element: Element, localName: string): string | undefined {
    const child = directXmlChild(element, localName);
    const text = child?.textContent?.trim();
    return text ? text : undefined;
}

function xmlTopicRecord(element: Element, fallbackTitle: string): UnknownRecord {
    const title =
        directXmlText(element, 'title') ??
        xmlAttribute(element, 'title') ??
        fallbackTitle;
    const childrenElement = directXmlChild(element, 'children');
    const children: UnknownRecord = {};

    if (childrenElement) {
        for (const topicsElement of directXmlChildren(
            childrenElement,
            'topics'
        )) {
            const childType = xmlAttribute(topicsElement, 'type') ?? 'attached';
            const topics = directXmlChildren(topicsElement, 'topic').map(
                (topic, index) =>
                    xmlTopicRecord(topic, `${title}-${childType}-${index + 1}`)
            );
            if (topics.length > 0) {
                children[childType] = topics;
            }
        }
    }

    const markerRefsElement = directXmlChild(element, 'marker-refs');
    const markerRefs = markerRefsElement
        ? directXmlChildren(markerRefsElement, 'marker-ref')
              .map((marker) =>
                  xmlAttribute(marker, 'marker-id', 'markerId', 'id')
              )
              .filter((markerId): markerId is string => markerId !== undefined)
        : [];
    const labelsElement = directXmlChild(element, 'labels');
    const labels = labelsElement
        ? directXmlChildren(labelsElement, 'label')
              .map((label) => label.textContent?.trim())
              .filter((label): label is string => Boolean(label))
        : [];
    const notesElement = directXmlChild(element, 'notes');
    const imageElement = directXmlChild(element, 'image');

    return {
        id: xmlAttribute(element, 'id') ?? fallbackTitle,
        title,
        branch: xmlAttribute(element, 'branch'),
        markerRefs,
        labels,
        notes:
            directXmlText(element, 'notes') ??
            (notesElement ? directXmlText(notesElement, 'plain') : undefined),
        image: imageElement
            ? {
                  src: xmlAttribute(
                      imageElement,
                      'src',
                      'xhtml:src',
                      'xlink:href',
                      'href'
                  ),
                  width: xmlAttribute(imageElement, 'width'),
                  height: xmlAttribute(imageElement, 'height'),
              }
            : undefined,
        children,
    };
}

function xmlRelationshipRecord(element: Element): UnknownRecord {
    return {
        id: xmlAttribute(element, 'id'),
        title: directXmlText(element, 'title') ?? xmlAttribute(element, 'title'),
        end1Id: xmlAttribute(element, 'end1-id', 'end1Id'),
        end2Id: xmlAttribute(element, 'end2-id', 'end2Id'),
    };
}

function xmlSheetRecord(element: Element, index: number): UnknownRecord | null {
    const rootTopicElement = directXmlChild(element, 'topic');
    if (!rootTopicElement) {
        return null;
    }

    const relationshipsElement = directXmlChild(element, 'relationships');

    return {
        id: xmlAttribute(element, 'id') ?? `sheet-${index + 1}`,
        title:
            directXmlText(element, 'title') ??
            xmlAttribute(element, 'title') ??
            `Sheet ${index + 1}`,
        rootTopic: xmlTopicRecord(rootTopicElement, `Sheet ${index + 1}`),
        relationships: relationshipsElement
            ? directXmlChildren(relationshipsElement, 'relationship').map(
                  xmlRelationshipRecord
              )
            : [],
    };
}

function normalizeXmlSheets(xmlText: string): unknown[] {
    const document = new DOMParser().parseFromString(xmlText, 'application/xml');
    if (document.getElementsByTagName('parsererror').length > 0) {
        throw new Error('XMind content.xml 无法解析');
    }

    const root = document.documentElement;
    const sheetsElement = directXmlChild(root, 'sheets');
    const sheetElements = sheetsElement
        ? directXmlChildren(sheetsElement, 'sheet')
        : Array.from(document.getElementsByTagName('sheet'));

    return sheetElements
        .map(xmlSheetRecord)
        .filter((sheet): sheet is UnknownRecord => sheet !== null);
}

function normalizeNoteText(value: unknown): string | undefined {
    if (typeof value === 'string' && value.trim()) {
        return value.trim();
    }

    if (Array.isArray(value)) {
        const parts = value
            .map(normalizeNoteText)
            .filter((item): item is string => item !== undefined);
        return parts.length > 0 ? parts.join('\n') : undefined;
    }

    if (!isRecord(value)) {
        return undefined;
    }

    const text =
        normalizeString(value.plain) ??
        normalizeString(value.text) ??
        normalizeString(value.content) ??
        normalizeString(value.html);
    if (text) {
        return text;
    }

    if (Array.isArray(value.notes)) {
        return normalizeNoteText(value.notes);
    }

    if (Array.isArray(value.children)) {
        return normalizeNoteText(value.children);
    }

    return undefined;
}

function normalizeNumberingText(value: unknown): string | undefined {
    if (typeof value === 'string' && value.trim()) {
        return value.trim();
    }

    if (typeof value === 'number' && Number.isFinite(value)) {
        return String(value);
    }

    if (Array.isArray(value)) {
        const parts = value
            .map(normalizeNumberingText)
            .filter((item): item is string => item !== undefined);
        return parts.length > 0 ? parts.join('.') : undefined;
    }

    if (!isRecord(value)) {
        return undefined;
    }

    const directText =
        normalizeString(value.text) ??
        normalizeString(value.label) ??
        normalizeString(value.title) ??
        normalizeString(value.plain);
    if (directText) {
        return directText;
    }

    const numericValue =
        normalizeNumber(value.number) ??
        normalizeNumber(value.value) ??
        normalizeNumber(value.sequence) ??
        normalizeNumber(value.index);
    if (numericValue !== undefined) {
        const prefix = normalizeString(value.prefix) ?? '';
        const suffix = normalizeString(value.suffix) ?? '';
        return `${prefix}${numericValue}${suffix}`;
    }

    return normalizeNumberingText(value.numbering);
}

function normalizePercent(value: unknown): number | undefined {
    if (typeof value === 'string') {
        const trimmed = value.trim().replace(/%$/, '');
        if (!trimmed) {
            return undefined;
        }

        const parsed = Number(trimmed);
        if (!Number.isFinite(parsed)) {
            return undefined;
        }

        return Math.max(0, Math.min(100, parsed <= 1 ? parsed * 100 : parsed));
    }

    const parsed = normalizeNumber(value);
    if (parsed === undefined) {
        return undefined;
    }

    return Math.max(0, Math.min(100, parsed <= 1 ? parsed * 100 : parsed));
}

function normalizeAssignee(value: unknown): string | undefined {
    if (typeof value === 'string' && value.trim()) {
        return value.trim();
    }

    if (!isRecord(value)) {
        return undefined;
    }

    return (
        normalizeString(value.name) ??
        normalizeString(value.title) ??
        normalizeString(value.displayName) ??
        normalizeString(value.email)
    );
}

function normalizeTaskDate(value: unknown): string | undefined {
    if (typeof value === 'string' && value.trim()) {
        return value.trim();
    }

    const timestamp = normalizeNumber(value);
    if (timestamp === undefined) {
        return undefined;
    }

    const milliseconds = timestamp > 100000000000 ? timestamp : timestamp * 1000;
    const date = new Date(milliseconds);
    if (Number.isNaN(date.getTime())) {
        return undefined;
    }

    return date.toISOString().slice(0, 10);
}

function normalizeTaskInfo(topic: UnknownRecord): XMindTopicTaskInfo | undefined {
    const rawTask = topic.taskInfo ?? topic.task;
    const taskRecord = isRecord(rawTask) ? rawTask : {};
    const progress =
        normalizePercent(taskRecord.progress) ??
        normalizePercent(taskRecord.percent) ??
        normalizePercent(taskRecord.value) ??
        normalizePercent(topic.progress);
    const priorityValue =
        normalizeString(taskRecord.priority) ??
        normalizeString(topic.priority) ??
        (normalizeNumber(taskRecord.priority) !== undefined
            ? String(normalizeNumber(taskRecord.priority))
            : undefined) ??
        (normalizeNumber(topic.priority) !== undefined
            ? String(normalizeNumber(topic.priority))
            : undefined);
    const assignee =
        normalizeAssignee(taskRecord.assignee) ??
        normalizeAssignee(taskRecord.owner) ??
        normalizeAssignee(topic.assignee);
    const startDate =
        normalizeTaskDate(taskRecord.startDate) ??
        normalizeTaskDate(taskRecord.start) ??
        normalizeTaskDate(topic.startDate);
    const dueDate =
        normalizeTaskDate(taskRecord.dueDate) ??
        normalizeTaskDate(taskRecord.endDate) ??
        normalizeTaskDate(taskRecord.deadline) ??
        normalizeTaskDate(topic.dueDate) ??
        normalizeTaskDate(topic.endDate);

    if (
        rawTask === undefined &&
        progress === undefined &&
        priorityValue === undefined &&
        assignee === undefined &&
        startDate === undefined &&
        dueDate === undefined
    ) {
        return undefined;
    }

    const textParts = [
        progress !== undefined ? `${Math.round(progress)}%` : undefined,
        priorityValue ? `P${priorityValue.replace(/^p/i, '')}` : undefined,
        assignee,
        dueDate,
    ].filter((part): part is string => part !== undefined && part.length > 0);

    return {
        progress,
        priority: priorityValue,
        assignee,
        startDate,
        dueDate,
        text: textParts.length > 0 ? textParts.join(' · ') : 'Task',
        raw: rawTask ?? topic,
    };
}

function normalizeAttachments(topic: UnknownRecord): unknown[] {
    const attachments = normalizeArray(topic.attachments);
    if (attachments.length > 0) {
        return attachments;
    }

    if (topic.attachment !== undefined) {
        return [topic.attachment];
    }

    return [];
}

function normalizeInlineObjectText(value: unknown): string | undefined {
    if (typeof value === 'string' && value.trim()) {
        return value.trim();
    }

    if (!isRecord(value)) {
        return undefined;
    }

    return (
        normalizeString(value.text) ??
        normalizeString(value.plain) ??
        normalizeString(value.content) ??
        normalizeString(value.latex) ??
        normalizeString(value.math) ??
        normalizeString(value.source) ??
        normalizeString(value.name) ??
        normalizeString(value.title) ??
        normalizeString(value.href)
    );
}

function normalizeEquationText(topic: UnknownRecord): string | undefined {
    return (
        normalizeInlineObjectText(topic.equation) ??
        normalizeInlineObjectText(topic.math)
    );
}

function normalizeAudioText(topic: UnknownRecord): string | undefined {
    const value = topic.audio ?? topic.audioNote ?? topic.recording;
    if (value === undefined) {
        return undefined;
    }

    return normalizeInlineObjectText(value) ?? 'Audio';
}

function readTopicChildrenByType(
    topic: UnknownRecord,
    title: string,
    resources: XMindZipEntries
): XMindTopicChildrenByType {
    const children = topic.children;
    if (!isRecord(children)) {
        return {};
    }

    const childrenByType: XMindTopicChildrenByType = {};

    for (const childType in children) {
        const childList = children[childType];
        const parsedChildren = normalizeChildList(childList).map(
            (child, index) =>
                parseTopic(
                    child,
                    `${title}-${childType}-${index + 1}`,
                    resources
                )
        );

        if (parsedChildren.length > 0) {
            childrenByType[childType] = parsedChildren;
        }
    }

    return childrenByType;
}

function parseTopic(
    topic: unknown,
    fallbackTitle: string,
    resources: XMindZipEntries
): XMindTopicNode {
    if (!isRecord(topic)) {
        return {
            id: fallbackTitle,
            title: fallbackTitle,
            markerRefs: [],
            markerIds: [],
            labels: [],
            labelTexts: [],
            noteText: undefined,
            numberingText: undefined,
            taskInfo: undefined,
            attachments: [],
            attachmentCount: 0,
            equationText: undefined,
            audioText: undefined,
            extensions: [],
            boundaries: [],
            summaries: [],
            childrenByType: {},
            children: [],
            raw: {},
        };
    }

    const id = normalizeText(topic.id, fallbackTitle);
    const title = normalizeText(topic.title, fallbackTitle);
    const childrenByType = readTopicChildrenByType(topic, title, resources);
    const markerRefs = normalizeArray(topic.markerRefs);
    const labels = normalizeArray(topic.labels);
    const attachments = normalizeAttachments(topic);

    return {
        id,
        title,
        className: normalizeString(topic.class),
        attributedTitle: normalizeArray(topic.attributedTitle),
        structureClass: normalizeString(topic.structureClass),
        branch: normalizeString(topic.branch),
        position: normalizePosition(topic.position),
        customWidth: normalizeNumber(topic.customWidth),
        href: normalizeString(topic.href),
        style: normalizeStyle(topic.style),
        markerRefs,
        markerIds: normalizeMarkerIds(markerRefs),
        labels,
        labelTexts: normalizeLabelTexts(labels),
        notes: topic.notes,
        noteText: normalizeNoteText(topic.notes),
        image: normalizeImage(topic.image, resources),
        numbering: topic.numbering,
        numberingText: normalizeNumberingText(topic.numbering),
        taskInfo: normalizeTaskInfo(topic),
        attachments,
        attachmentCount: attachments.length,
        equation: topic.equation ?? topic.math,
        equationText: normalizeEquationText(topic),
        audio: topic.audio ?? topic.audioNote ?? topic.recording,
        audioText: normalizeAudioText(topic),
        extensions: normalizeArray(topic.extensions),
        boundaries: normalizeTopicScopedObjects(topic.boundaries),
        summaries: normalizeTopicScopedObjects(topic.summaries),
        childrenByType,
        children: childrenByType.attached ?? [],
        raw: topic,
    };
}

function parseSheet(
    sheet: unknown,
    index: number,
    resources: XMindZipEntries
): XMindDocumentSheet | null {
    if (!isRecord(sheet)) {
        return null;
    }

    const rootTopic = parseTopic(
        sheet.rootTopic,
        `Sheet ${index + 1}`,
        resources
    );
    const id = normalizeText(sheet.id, `sheet-${index + 1}`);
    const title = normalizeText(sheet.title, rootTopic.title || id);

    return {
        id,
        title,
        className: normalizeString(sheet.class),
        revisionId: normalizeString(sheet.revisionId),
        structureClass: rootTopic.structureClass,
        rootTopic,
        relationships: normalizeRelationships(sheet.relationships),
        theme: isRecord(sheet.theme) ? sheet.theme : undefined,
        extensions: normalizeArray(sheet.extensions),
        zones: normalizeArray(sheet.zones),
        topicOverlapping: normalizeString(sheet.topicOverlapping),
        topicPositioning: normalizeString(sheet.topicPositioning),
        floatingTopicFlexible: normalizeBoolean(sheet.floatingTopicFlexible),
        raw: sheet,
    };
}

export async function parseXMindDocument(
    file: ArrayBuffer
): Promise<XMindDocument> {
    const resources = readZipEntries(file);
    const contentText = readZipTextFile(file, 'content.json');
    const contentXmlText = contentText
        ? null
        : readZipTextFile(file, 'content.xml');
    if (!contentText && !contentXmlText) {
        throw new Error('XMind 文件缺少 content.json 或 content.xml');
    }

    const content = contentText
        ? (JSON.parse(contentText) as unknown)
        : normalizeXmlSheets(contentXmlText ?? '');
    if (contentText) {
        normalizeInvisibleCentralTopicTextColor(content);
    }

    const sheets = normalizeSheets(content)
        .map((sheet, index) => parseSheet(sheet, index, resources))
        .filter((sheet): sheet is XMindDocumentSheet => sheet !== null);

    if (sheets.length === 0) {
        throw new Error('XMind 文件没有可渲染的 sheet');
    }

    return { sheets };
}
