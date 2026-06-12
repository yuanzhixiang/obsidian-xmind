import { XMindDocumentSheet, XMindTopicNode } from '../xmind-document';
import {
    translateXMind,
    XMindLocale,
} from '../../i18n';
import {
    createXMindStyleResolver,
    XMindResolvedTopicStyle,
    XMindStyleResolver,
    XMindTopicStyleRole,
} from './style-resolver';

export interface MindMapTextLine {
    text: string;
    x: number;
    y: number;
}

export interface MindMapLabelLine {
    text: string;
    x: number;
    y: number;
    width: number;
}

export interface MindMapImageLayout {
    dataUrl: string;
    x: number;
    y: number;
    width: number;
    height: number;
}

export type MindMapToggleControlKind = 'count' | 'ellipsis' | 'collapse';
export type MindMapLayoutTopicRole = 'topic' | 'floatingTopic' | 'calloutTopic';

export interface MindMapLayoutTopic {
    topic: XMindTopicNode;
    x: number;
    y: number;
    width: number;
    height: number;
    depth: number;
    direction: -1 | 0 | 1;
    branchIndex: number;
    role: MindMapLayoutTopicRole;
    hiddenDescendantCount: number;
    canToggleChildren: boolean;
    isExpanded: boolean;
    hasHiddenChildren: boolean;
    toggleControlX: number;
    toggleControlY: number;
    toggleControlKind: MindMapToggleControlKind | null;
    resolvedStyle: XMindResolvedTopicStyle;
    markerIds: string[];
    numberingText?: string;
    numberingWidth: number;
    taskText?: string;
    taskWidth: number;
    attachmentCount: number;
    equationText?: string;
    audioText?: string;
    hasLink: boolean;
    noteText?: string;
    labels: MindMapLabelLine[];
    image?: MindMapImageLayout;
    lines: MindMapTextLine[];
    children: MindMapLayoutTopic[];
    callouts: MindMapLayoutTopic[];
}

export interface MindMapBounds {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
}

export interface MindMapLayout {
    root: MindMapLayoutTopic;
    floatingTopics: MindMapLayoutTopic[];
    bounds: MindMapBounds;
}

export interface MindMapLayoutOptions {
    expandedTopicIds?: ReadonlySet<string>;
    collapsedTopicIds?: ReadonlySet<string>;
    locale?: XMindLocale;
}

interface DraftTopic {
    topic: XMindTopicNode;
    width: number;
    height: number;
    lines: string[];
    branchIndex: number;
    role: MindMapLayoutTopicRole;
    hiddenDescendantCount: number;
    canToggleChildren: boolean;
    isExpanded: boolean;
    hasHiddenChildren: boolean;
    toggleControlX: number;
    toggleControlY: number;
    toggleControlKind: MindMapToggleControlKind | null;
    resolvedStyle: XMindResolvedTopicStyle;
    markerIds: string[];
    numberingText?: string;
    numberingWidth: number;
    taskText?: string;
    taskWidth: number;
    attachmentCount: number;
    equationText?: string;
    audioText?: string;
    extraIconCount: number;
    hasLink: boolean;
    noteText?: string;
    labelTexts: string[];
    labelWidths: number[];
    imageDataUrl?: string;
    imageWidth: number;
    imageHeight: number;
    subtreeHeight: number;
    children: DraftTopic[];
    callouts: DraftTopic[];
}

const RIGHT_SIDE_ROOT_STRUCTURES = new Set([
    'org.xmind.ui.map.clockwise',
    'org.xmind.ui.logic.right',
]);
const FOLDED_TOPIC_BRANCH = 'folded';
const MIN_NODE_WIDTH = 104;
const ROOT_MIN_NODE_WIDTH = 220;
const MAX_NODE_WIDTH = 260;
const HORIZONTAL_PADDING = 18;
const VERTICAL_PADDING = 8;
const ROOT_HORIZONTAL_PADDING = 26;
const ROOT_VERTICAL_PADDING = 16;
const HORIZONTAL_GAP = 92;
const VERTICAL_GAP = 14;
const ROOT_BRANCH_GAP = 72;
const SUMMARY_MARKER_OUTSET = 34;
const SUMMARY_LABEL_OUTSET = 220;
const CALLOUT_GAP = 48;
const FLOATING_FALLBACK_GAP = 140;
const MARKER_ROW_HEIGHT = 18;
const LABEL_ROW_HEIGHT = 20;
const LABEL_HORIZONTAL_PADDING = 8;
const LABEL_GAP = 6;
const MAX_RENDERED_MARKERS = 6;
const NUMBERING_HORIZONTAL_PADDING = 12;
const MIN_NUMBERING_WIDTH = 26;
const TASK_HORIZONTAL_PADDING = 10;
const MIN_TASK_WIDTH = 34;
const IMAGE_DEFAULT_WIDTH = 120;
const IMAGE_DEFAULT_HEIGHT = 80;
const IMAGE_GAP = 8;

function measureCharacter(char: string, fontSize: number): number {
    const baseWidth = char.charCodeAt(0) > 255 ? 0.92 : 0.52;
    return fontSize * baseWidth;
}

function measureText(text: string, fontSize: number): number {
    return Array.from(text).reduce(
        (width, char) => width + measureCharacter(char, fontSize),
        0
    );
}

function labelWidth(text: string): number {
    return Math.max(
        24,
        measureText(text, 11) + LABEL_HORIZONTAL_PADDING * 2
    );
}

function numberingWidth(text: string | undefined): number {
    return text
        ? Math.max(
              MIN_NUMBERING_WIDTH,
              measureText(text, 10) + NUMBERING_HORIZONTAL_PADDING * 2
          )
        : 0;
}

function taskWidth(text: string | undefined): number {
    return text
        ? Math.max(
              MIN_TASK_WIDTH,
              measureText(text, 10) + TASK_HORIZONTAL_PADDING * 2
          )
        : 0;
}

function resolveImageSize(
    topic: XMindTopicNode,
    maxWidth: number
): { width: number; height: number } | undefined {
    if (!topic.image?.dataUrl) {
        return undefined;
    }

    const rawWidth = Math.max(1, topic.image.width ?? IMAGE_DEFAULT_WIDTH);
    const rawHeight = Math.max(1, topic.image.height ?? IMAGE_DEFAULT_HEIGHT);
    const scale = Math.min(1, maxWidth / rawWidth);

    return {
        width: rawWidth * scale,
        height: rawHeight * scale,
    };
}

function wrapText(
    text: string,
    maxWidth: number,
    fontSize: number,
    locale: XMindLocale
): string[] {
    const lines: string[] = [];
    let current = '';
    let currentWidth = 0;
    const fallbackText = translateXMind(locale, 'newTopicTitle');

    for (const char of Array.from(text || fallbackText)) {
        const charWidth = measureCharacter(char, fontSize);
        if (current && currentWidth + charWidth > maxWidth) {
            lines.push(current);
            current = char;
            currentWidth = charWidth;
            continue;
        }

        current += char;
        currentWidth += charWidth;
    }

    if (current) {
        lines.push(current);
    }

    return lines.length > 0 ? lines : [fallbackText];
}

function countDescendants(topic: XMindTopicNode): number {
    return topic.children.reduce(
        (sum, child) => sum + 1 + countDescendants(child),
        0
    );
}

function isTopicExpanded(
    topic: XMindTopicNode,
    expandedTopicIds: ReadonlySet<string>,
    collapsedTopicIds: ReadonlySet<string>
): boolean {
    if (topic.children.length === 0) {
        return false;
    }

    if (collapsedTopicIds.has(topic.id)) {
        return false;
    }

    if (expandedTopicIds.has(topic.id)) {
        return true;
    }

    return topic.branch !== FOLDED_TOPIC_BRANCH;
}

function getVisibleChildren(
    topic: XMindTopicNode,
    expandedTopicIds: ReadonlySet<string>,
    collapsedTopicIds: ReadonlySet<string>
): XMindTopicNode[] {
    return isTopicExpanded(topic, expandedTopicIds, collapsedTopicIds)
        ? topic.children
        : [];
}

function getToggleControlKind(
    isExpanded: boolean,
    hiddenDescendantCount: number
): MindMapToggleControlKind | null {
    if (isExpanded) {
        return 'collapse';
    }

    if (hiddenDescendantCount > 999) {
        return 'ellipsis';
    }

    if (hiddenDescendantCount > 0) {
        return 'count';
    }

    return null;
}

function createDraft(
    topic: XMindTopicNode,
    depth: number,
    styleResolver: XMindStyleResolver,
    expandedTopicIds: ReadonlySet<string>,
    collapsedTopicIds: ReadonlySet<string>,
    locale: XMindLocale,
    branchIndex = 0,
    role: XMindTopicStyleRole = 'topic'
): DraftTopic {
    const isRoot = depth === 0;
    const style = styleResolver.resolveTopicStyle(
        topic,
        depth,
        branchIndex,
        role
    );
    const canToggleChildren = !isRoot && topic.children.length > 0;
    const isExpanded =
        canToggleChildren &&
        isTopicExpanded(topic, expandedTopicIds, collapsedTopicIds);
    const horizontalPadding = isRoot
        ? ROOT_HORIZONTAL_PADDING
        : HORIZONTAL_PADDING;
    const verticalPadding = isRoot ? ROOT_VERTICAL_PADDING : VERTICAL_PADDING;
    const lineHeight = style.lineHeight;
    const markerIds = topic.markerIds.slice(0, MAX_RENDERED_MARKERS);
    const numberingText = topic.numberingText;
    const resolvedNumberingWidth = numberingWidth(numberingText);
    const taskText = topic.taskInfo?.text;
    const resolvedTaskWidth = taskWidth(taskText);
    const attachmentCount = topic.attachmentCount;
    const equationText = topic.equationText;
    const audioText = topic.audioText;
    const extraIconCount =
        (attachmentCount > 0 ? 1 : 0) +
        (equationText ? 1 : 0) +
        (audioText ? 1 : 0);
    const hasLink = topic.href !== undefined;
    const noteText = topic.noteText;
    const labelTexts = topic.labelTexts;
    const labelWidths = labelTexts.map(labelWidth);
    const labelRowWidth =
        labelWidths.reduce((sum, width) => sum + width, 0) +
        Math.max(0, labelWidths.length - 1) * LABEL_GAP;
    const iconItemCount =
        markerIds.length +
        extraIconCount +
        (hasLink ? 1 : 0) +
        (noteText ? 1 : 0);
    const metadataItemCount =
        iconItemCount + (numberingText ? 1 : 0) + (taskText ? 1 : 0);
    const markerRowWidth =
        iconItemCount * 16 +
        resolvedNumberingWidth +
        resolvedTaskWidth +
        Math.max(0, metadataItemCount - 1) * 4;
    const minWidth = isRoot ? ROOT_MIN_NODE_WIDTH : MIN_NODE_WIDTH;
    const customWidth =
        topic.customWidth !== undefined && topic.customWidth > 0
            ? Math.max(40, topic.customWidth)
            : undefined;
    const maxTextWidth = Math.max(
        8,
        isRoot
            ? (customWidth ?? MAX_NODE_WIDTH) - ROOT_HORIZONTAL_PADDING * 2
            : (customWidth ?? MAX_NODE_WIDTH) - HORIZONTAL_PADDING * 2
    );
    const imageSize = resolveImageSize(topic, maxTextWidth);
    const imageBlockHeight = imageSize ? imageSize.height + IMAGE_GAP : 0;
    const lines = wrapText(topic.title, maxTextWidth, style.fontSize, locale);
    const textWidth = Math.max(
        ...lines.map((line) => measureText(line, style.fontSize))
    );
    const width =
        customWidth ??
        Math.max(
            minWidth,
            Math.max(
                textWidth,
                labelRowWidth,
                markerRowWidth,
                imageSize?.width ?? 0
            ) +
                horizontalPadding * 2
        );
    const markerHeight = metadataItemCount > 0 ? MARKER_ROW_HEIGHT : 0;
    const labelsHeight = labelTexts.length > 0 ? LABEL_ROW_HEIGHT : 0;
    const height =
        markerHeight +
        lines.length * lineHeight +
        imageBlockHeight +
        labelsHeight +
        verticalPadding * 2;
    const children = getVisibleChildren(
        topic,
        expandedTopicIds,
        collapsedTopicIds
    ).map((child, index) =>
        createDraft(
            child,
            depth + 1,
            styleResolver,
            expandedTopicIds,
            collapsedTopicIds,
            locale,
            depth === 0 ? index : branchIndex
        )
    );
    const callouts = (topic.childrenByType.callout ?? []).map(
        (callout, index) =>
            createDraft(
                callout,
                depth + 1,
                styleResolver,
                expandedTopicIds,
                collapsedTopicIds,
                locale,
                depth === 0 ? index : branchIndex,
                'calloutTopic'
            )
    );
    const childrenHeight =
        children.reduce((sum, child) => sum + child.subtreeHeight, 0) +
        Math.max(0, children.length - 1) * VERTICAL_GAP;
    const hiddenDescendantCount =
        canToggleChildren && !isExpanded ? countDescendants(topic) : 0;
    const hasHiddenChildren = hiddenDescendantCount > 0;

    return {
        topic,
        width,
        height,
        lines,
        branchIndex,
        role,
        hiddenDescendantCount,
        canToggleChildren,
        isExpanded,
        hasHiddenChildren,
        toggleControlX: 0,
        toggleControlY: 0,
        toggleControlKind: getToggleControlKind(
            isExpanded,
            hiddenDescendantCount
        ),
        resolvedStyle: style,
        markerIds,
        numberingText,
        numberingWidth: resolvedNumberingWidth,
        taskText,
        taskWidth: resolvedTaskWidth,
        attachmentCount,
        equationText,
        audioText,
        extraIconCount,
        hasLink,
        noteText,
        labelTexts,
        labelWidths,
        imageDataUrl: topic.image?.dataUrl,
        imageWidth: imageSize?.width ?? 0,
        imageHeight: imageSize?.height ?? 0,
        subtreeHeight: Math.max(height, childrenHeight),
        children,
        callouts,
    };
}

function splitRootChildren(children: DraftTopic[]): {
    left: DraftTopic[];
    right: DraftTopic[];
} {
    if (children.length <= 1) {
        return { left: [], right: children };
    }

    const leftCount = Math.floor(children.length / 2);
    return {
        left: children.slice(0, leftCount),
        right: children.slice(leftCount),
    };
}

function createTextLines(
    lines: string[],
    lineHeight: number,
    markerIds: string[],
    extraIconCount: number,
    hasNumbering: boolean,
    hasTaskInfo: boolean,
    labelTexts: string[],
    hasLink: boolean,
    hasNote: boolean,
    imageHeight: number
): MindMapTextLine[] {
    const textHeight = lines.length * lineHeight;
    const hasMarkerRow =
        markerIds.length > 0 ||
        extraIconCount > 0 ||
        hasNumbering ||
        hasTaskInfo ||
        hasLink ||
        hasNote;
    const imageBlockHeight = imageHeight > 0 ? imageHeight + IMAGE_GAP : 0;
    const metadataHeight =
        (hasMarkerRow ? MARKER_ROW_HEIGHT : 0) +
        imageBlockHeight +
        (labelTexts.length > 0 ? LABEL_ROW_HEIGHT : 0);
    const firstY =
        -(textHeight + metadataHeight) / 2 +
        (hasMarkerRow ? MARKER_ROW_HEIGHT : 0) +
        lineHeight * 0.72;

    return lines.map((text, index) => ({
        text,
        x: 0,
        y: firstY + index * lineHeight,
    }));
}

function createLabelLines(
    labelTexts: string[],
    labelWidths: number[],
    textLines: string[],
    lineHeight: number,
    markerIds: string[],
    extraIconCount: number,
    hasNumbering: boolean,
    hasTaskInfo: boolean,
    hasLink: boolean,
    hasNote: boolean,
    imageHeight: number
): MindMapLabelLine[] {
    if (labelTexts.length === 0) {
        return [];
    }

    const textHeight = textLines.length * lineHeight;
    const hasMarkerRow =
        markerIds.length > 0 ||
        extraIconCount > 0 ||
        hasNumbering ||
        hasTaskInfo ||
        hasLink ||
        hasNote;
    const imageBlockHeight = imageHeight > 0 ? imageHeight + IMAGE_GAP : 0;
    const totalHeight =
        textHeight +
        (hasMarkerRow ? MARKER_ROW_HEIGHT : 0) +
        imageBlockHeight +
        LABEL_ROW_HEIGHT;
    const totalWidth =
        labelWidths.reduce((sum, width) => sum + width, 0) +
        Math.max(0, labelWidths.length - 1) * LABEL_GAP;
    let nextX = -totalWidth / 2;
    const y =
        -totalHeight / 2 +
        (hasMarkerRow ? MARKER_ROW_HEIGHT : 0) +
        textHeight +
        imageBlockHeight +
        LABEL_ROW_HEIGHT / 2;

    return labelTexts.map((text, index) => {
        const width = labelWidths[index] ?? labelWidth(text);
        const label = {
            text,
            x: nextX + width / 2,
            y,
            width,
        };
        nextX += width + LABEL_GAP;
        return label;
    });
}

function createImageLayout(
    dataUrl: string | undefined,
    width: number,
    height: number,
    textLines: string[],
    lineHeight: number,
    markerIds: string[],
    extraIconCount: number,
    hasNumbering: boolean,
    hasTaskInfo: boolean,
    labelTexts: string[],
    hasLink: boolean,
    hasNote: boolean
): MindMapImageLayout | undefined {
    if (!dataUrl || width <= 0 || height <= 0) {
        return undefined;
    }

    const textHeight = textLines.length * lineHeight;
    const hasMarkerRow =
        markerIds.length > 0 ||
        extraIconCount > 0 ||
        hasNumbering ||
        hasTaskInfo ||
        hasLink ||
        hasNote;
    const totalHeight =
        textHeight +
        (hasMarkerRow ? MARKER_ROW_HEIGHT : 0) +
        height +
        IMAGE_GAP +
        (labelTexts.length > 0 ? LABEL_ROW_HEIGHT : 0);
    const y =
        -totalHeight / 2 +
        (hasMarkerRow ? MARKER_ROW_HEIGHT : 0) +
        textHeight +
        IMAGE_GAP +
        height / 2;

    return {
        dataUrl,
        x: 0,
        y,
        width,
        height,
    };
}

function placeDraft(
    draft: DraftTopic,
    x: number,
    y: number,
    depth: number,
    direction: -1 | 1
): MindMapLayoutTopic {
    const children: MindMapLayoutTopic[] = [];
    const totalChildrenHeight =
        draft.children.reduce((sum, child) => sum + child.subtreeHeight, 0) +
        Math.max(0, draft.children.length - 1) * VERTICAL_GAP;
    let nextY = y - totalChildrenHeight / 2;

    for (const child of draft.children) {
        const childY = nextY + child.subtreeHeight / 2;
        const childX =
            x +
            direction * (draft.width / 2 + HORIZONTAL_GAP + child.width / 2);
        children.push(placeDraft(child, childX, childY, depth + 1, direction));
        nextY += child.subtreeHeight + VERTICAL_GAP;
    }

    const callouts = placeCallouts(draft, x, y, depth, direction);

    return {
        topic: draft.topic,
        x,
        y,
        width: draft.width,
        height: draft.height,
        depth,
        direction,
        branchIndex: draft.branchIndex,
        role: draft.role,
        hiddenDescendantCount: draft.hiddenDescendantCount,
        canToggleChildren: draft.canToggleChildren,
        isExpanded: draft.isExpanded,
        hasHiddenChildren: draft.hasHiddenChildren,
        toggleControlX: direction * (draft.width / 2 + 14),
        toggleControlY: 0,
        toggleControlKind: draft.toggleControlKind,
        resolvedStyle: draft.resolvedStyle,
        markerIds: draft.markerIds,
        numberingText: draft.numberingText,
        numberingWidth: draft.numberingWidth,
        taskText: draft.taskText,
        taskWidth: draft.taskWidth,
        attachmentCount: draft.attachmentCount,
        equationText: draft.equationText,
        audioText: draft.audioText,
        hasLink: draft.hasLink,
        noteText: draft.noteText,
        labels: createLabelLines(
            draft.labelTexts,
            draft.labelWidths,
            draft.lines,
            draft.resolvedStyle.lineHeight,
            draft.markerIds,
            draft.extraIconCount,
            Boolean(draft.numberingText),
            Boolean(draft.taskText),
            draft.hasLink,
            Boolean(draft.noteText),
            draft.imageHeight
        ),
        image: createImageLayout(
            draft.imageDataUrl,
            draft.imageWidth,
            draft.imageHeight,
            draft.lines,
            draft.resolvedStyle.lineHeight,
            draft.markerIds,
            draft.extraIconCount,
            Boolean(draft.numberingText),
            Boolean(draft.taskText),
            draft.labelTexts,
            draft.hasLink,
            Boolean(draft.noteText)
        ),
        lines: createTextLines(
            draft.lines,
            draft.resolvedStyle.lineHeight,
            draft.markerIds,
            draft.extraIconCount,
            Boolean(draft.numberingText),
            Boolean(draft.taskText),
            draft.labelTexts,
            draft.hasLink,
            Boolean(draft.noteText),
            draft.imageHeight
        ),
        children,
        callouts,
    };
}

function calloutDirection(
    draft: DraftTopic,
    parentDirection: -1 | 0 | 1
): -1 | 1 {
    const positionX = draft.topic.position?.x;
    if (positionX !== undefined && positionX < 0) {
        return -1;
    }

    if (positionX !== undefined && positionX > 0) {
        return 1;
    }

    return parentDirection < 0 ? -1 : 1;
}

function placeCallouts(
    draft: DraftTopic,
    x: number,
    y: number,
    depth: number,
    direction: -1 | 0 | 1
): MindMapLayoutTopic[] {
    return draft.callouts.map((callout, index) => {
        const resolvedDirection = calloutDirection(callout, direction);
        const fallbackX =
            x +
            resolvedDirection *
                (draft.width / 2 + CALLOUT_GAP + callout.width / 2);
        const fallbackY =
            y -
            draft.height / 2 -
            CALLOUT_GAP -
            index * (callout.subtreeHeight + VERTICAL_GAP);
        const calloutX =
            callout.topic.position?.x !== undefined
                ? x + callout.topic.position.x
                : fallbackX;
        const calloutY =
            callout.topic.position?.y !== undefined
                ? y + callout.topic.position.y
                : fallbackY;

        return placeDraft(
            callout,
            calloutX,
            calloutY,
            depth + 1,
            resolvedDirection
        );
    });
}

function layoutTopicSubtreeBounds(topic: MindMapLayoutTopic): MindMapBounds {
    const bounds: MindMapBounds = {
        minX: topic.x - topic.width / 2,
        minY: topic.y - topic.height / 2,
        maxX: topic.x + topic.width / 2,
        maxY: topic.y + topic.height / 2,
    };

    for (const child of topic.children) {
        const childBounds = layoutTopicSubtreeBounds(child);
        bounds.minX = Math.min(bounds.minX, childBounds.minX);
        bounds.minY = Math.min(bounds.minY, childBounds.minY);
        bounds.maxX = Math.max(bounds.maxX, childBounds.maxX);
        bounds.maxY = Math.max(bounds.maxY, childBounds.maxY);
    }

    for (const callout of topic.callouts) {
        const calloutBounds = layoutTopicSubtreeBounds(callout);
        bounds.minX = Math.min(bounds.minX, calloutBounds.minX);
        bounds.minY = Math.min(bounds.minY, calloutBounds.minY);
        bounds.maxX = Math.max(bounds.maxX, calloutBounds.maxX);
        bounds.maxY = Math.max(bounds.maxY, calloutBounds.maxY);
    }

    return bounds;
}

function collectBounds(topic: MindMapLayoutTopic, bounds: MindMapBounds): void {
    const markerOutset = topic.toggleControlKind ? SUMMARY_MARKER_OUTSET : 0;
    const minX =
        topic.x - topic.width / 2 - (topic.direction < 0 ? markerOutset : 0);
    const maxX =
        topic.x + topic.width / 2 + (topic.direction >= 0 ? markerOutset : 0);

    bounds.minX = Math.min(bounds.minX, minX);
    bounds.maxX = Math.max(bounds.maxX, maxX);
    bounds.minY = Math.min(bounds.minY, topic.y - topic.height / 2);
    bounds.maxY = Math.max(bounds.maxY, topic.y + topic.height / 2);

    if (topic.topic.summaries.length > 0 && topic.children.length > 0) {
        const direction = topic.direction || 1;
        const childBounds = topic.children.reduce<MindMapBounds>(
            (currentBounds, child) => {
                const subtreeBounds = layoutTopicSubtreeBounds(child);
                return {
                    minX: Math.min(currentBounds.minX, subtreeBounds.minX),
                    minY: Math.min(currentBounds.minY, subtreeBounds.minY),
                    maxX: Math.max(currentBounds.maxX, subtreeBounds.maxX),
                    maxY: Math.max(currentBounds.maxY, subtreeBounds.maxY),
                };
            },
            {
                minX: Number.POSITIVE_INFINITY,
                minY: Number.POSITIVE_INFINITY,
                maxX: Number.NEGATIVE_INFINITY,
                maxY: Number.NEGATIVE_INFINITY,
            }
        );
        if (direction > 0) {
            bounds.maxX = Math.max(
                bounds.maxX,
                childBounds.maxX + SUMMARY_LABEL_OUTSET
            );
        } else {
            bounds.minX = Math.min(
                bounds.minX,
                childBounds.minX - SUMMARY_LABEL_OUTSET
            );
        }
    }

    for (const child of topic.children) {
        collectBounds(child, bounds);
    }

    for (const callout of topic.callouts) {
        collectBounds(callout, bounds);
    }
}

function isRightSideRootStructure(sheet: XMindDocumentSheet): boolean {
    return RIGHT_SIDE_ROOT_STRUCTURES.has(
        sheet.structureClass ?? sheet.rootTopic.structureClass ?? ''
    );
}

function placeRightSideRootChildren(
    rootDraft: DraftTopic,
    root: MindMapLayoutTopic
): void {
    const totalHeight =
        rootDraft.children.reduce(
            (sum, child) => sum + child.subtreeHeight,
            0
        ) +
        Math.max(0, rootDraft.children.length - 1) * ROOT_BRANCH_GAP;
    let nextY = -totalHeight / 2;

    for (const child of rootDraft.children) {
        const childY = nextY + child.subtreeHeight / 2;
        const childX = rootDraft.width / 2 + HORIZONTAL_GAP + child.width / 2;
        root.children.push(placeDraft(child, childX, childY, 1, 1));
        nextY += child.subtreeHeight + ROOT_BRANCH_GAP;
    }
}

function placeSplitRootChildren(
    rootDraft: DraftTopic,
    root: MindMapLayoutTopic
): void {
    const { left, right } = splitRootChildren(rootDraft.children);

    for (const [direction, children] of [
        [-1, left],
        [1, right],
    ] as const) {
        const totalHeight =
            children.reduce((sum, child) => sum + child.subtreeHeight, 0) +
            Math.max(0, children.length - 1) * ROOT_BRANCH_GAP;
        let nextY = -totalHeight / 2;

        for (const child of children) {
            const childY = nextY + child.subtreeHeight / 2;
            const childX =
                direction *
                (rootDraft.width / 2 + ROOT_BRANCH_GAP + child.width / 2);
            root.children.push(placeDraft(child, childX, childY, 1, direction));
            nextY += child.subtreeHeight + ROOT_BRANCH_GAP;
        }
    }
}

function createFloatingDrafts(
    sheet: XMindDocumentSheet,
    styleResolver: XMindStyleResolver,
    expandedTopicIds: ReadonlySet<string>,
    collapsedTopicIds: ReadonlySet<string>,
    locale: XMindLocale
): DraftTopic[] {
    return (sheet.rootTopic.childrenByType.detached ?? []).map(
        (topic, index) =>
            createDraft(
                topic,
                1,
                styleResolver,
                expandedTopicIds,
                collapsedTopicIds,
                locale,
                index,
                'floatingTopic'
            )
    );
}

function placeFloatingDraft(
    draft: DraftTopic,
    index: number,
    rootDraft: DraftTopic
): MindMapLayoutTopic {
    const fallbackDirection = index % 2 === 0 ? -1 : 1;
    const fallbackX =
        fallbackDirection *
        (rootDraft.width / 2 + FLOATING_FALLBACK_GAP + draft.width / 2);
    const fallbackY =
        rootDraft.height / 2 +
        FLOATING_FALLBACK_GAP +
        index * (draft.subtreeHeight + ROOT_BRANCH_GAP);
    const x = draft.topic.position?.x ?? fallbackX;
    const y = draft.topic.position?.y ?? fallbackY;
    const direction = x < 0 ? -1 : 1;

    return placeDraft(draft, x, y, 1, direction);
}

export function layoutMindMap(
    sheet: XMindDocumentSheet,
    options: MindMapLayoutOptions = {}
): MindMapLayout {
    const styleResolver = createXMindStyleResolver(sheet);
    const expandedTopicIds = options.expandedTopicIds ?? new Set<string>();
    const collapsedTopicIds = options.collapsedTopicIds ?? new Set<string>();
    const locale = options.locale ?? 'en';
    const rootDraft = createDraft(
        sheet.rootTopic,
        0,
        styleResolver,
        expandedTopicIds,
        collapsedTopicIds,
        locale
    );
    const floatingDrafts = createFloatingDrafts(
        sheet,
        styleResolver,
        expandedTopicIds,
        collapsedTopicIds,
        locale
    );
    const root: MindMapLayoutTopic = {
        topic: rootDraft.topic,
        x: 0,
        y: 0,
        width: rootDraft.width,
        height: rootDraft.height,
        depth: 0,
        direction: 0,
        branchIndex: 0,
        role: 'topic',
        hiddenDescendantCount: 0,
        canToggleChildren: rootDraft.canToggleChildren,
        isExpanded: rootDraft.isExpanded,
        hasHiddenChildren: rootDraft.hasHiddenChildren,
        toggleControlX: 0,
        toggleControlY: 0,
        toggleControlKind: null,
        resolvedStyle: rootDraft.resolvedStyle,
        markerIds: rootDraft.markerIds,
        numberingText: rootDraft.numberingText,
        numberingWidth: rootDraft.numberingWidth,
        taskText: rootDraft.taskText,
        taskWidth: rootDraft.taskWidth,
        attachmentCount: rootDraft.attachmentCount,
        equationText: rootDraft.equationText,
        audioText: rootDraft.audioText,
        hasLink: rootDraft.hasLink,
        noteText: rootDraft.noteText,
        labels: createLabelLines(
            rootDraft.labelTexts,
            rootDraft.labelWidths,
            rootDraft.lines,
            rootDraft.resolvedStyle.lineHeight,
            rootDraft.markerIds,
            rootDraft.extraIconCount,
            Boolean(rootDraft.numberingText),
            Boolean(rootDraft.taskText),
            rootDraft.hasLink,
            Boolean(rootDraft.noteText),
            rootDraft.imageHeight
        ),
        image: createImageLayout(
            rootDraft.imageDataUrl,
            rootDraft.imageWidth,
            rootDraft.imageHeight,
            rootDraft.lines,
            rootDraft.resolvedStyle.lineHeight,
            rootDraft.markerIds,
            rootDraft.extraIconCount,
            Boolean(rootDraft.numberingText),
            Boolean(rootDraft.taskText),
            rootDraft.labelTexts,
            rootDraft.hasLink,
            Boolean(rootDraft.noteText)
        ),
        lines: createTextLines(
            rootDraft.lines,
            rootDraft.resolvedStyle.lineHeight,
            rootDraft.markerIds,
            rootDraft.extraIconCount,
            Boolean(rootDraft.numberingText),
            Boolean(rootDraft.taskText),
            rootDraft.labelTexts,
            rootDraft.hasLink,
            Boolean(rootDraft.noteText),
            rootDraft.imageHeight
        ),
        children: [],
        callouts: placeCallouts(rootDraft, 0, 0, 0, 1),
    };

    if (isRightSideRootStructure(sheet)) {
        placeRightSideRootChildren(rootDraft, root);
    } else {
        placeSplitRootChildren(rootDraft, root);
    }

    const floatingTopics = floatingDrafts.map((draft, index) =>
        placeFloatingDraft(draft, index, rootDraft)
    );
    const bounds: MindMapBounds = {
        minX: Number.POSITIVE_INFINITY,
        minY: Number.POSITIVE_INFINITY,
        maxX: Number.NEGATIVE_INFINITY,
        maxY: Number.NEGATIVE_INFINITY,
    };
    collectBounds(root, bounds);
    for (const floatingTopic of floatingTopics) {
        collectBounds(floatingTopic, bounds);
    }

    return { root, floatingTopics, bounds };
}
