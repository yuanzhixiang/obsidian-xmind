import { XMindDocumentSheet, XMindTopicNode } from '../xmind-document';

export interface MindMapTextLine {
    text: string;
    x: number;
    y: number;
}

export interface MindMapLayoutTopic {
    topic: XMindTopicNode;
    x: number;
    y: number;
    width: number;
    height: number;
    depth: number;
    direction: -1 | 0 | 1;
    branchIndex: number;
    hiddenDescendantCount: number;
    lines: MindMapTextLine[];
    children: MindMapLayoutTopic[];
}

export interface MindMapBounds {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
}

export interface MindMapLayout {
    root: MindMapLayoutTopic;
    bounds: MindMapBounds;
}

interface DraftTopic {
    topic: XMindTopicNode;
    width: number;
    height: number;
    lines: string[];
    branchIndex: number;
    hiddenDescendantCount: number;
    subtreeHeight: number;
    children: DraftTopic[];
}

const MAX_VISIBLE_DEPTH = 2;
const RIGHT_SIDE_ROOT_STRUCTURES = new Set([
    'org.xmind.ui.map.clockwise',
    'org.xmind.ui.logic.right',
]);
const LINE_HEIGHT = 23;
const ROOT_LINE_HEIGHT = 32;
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

function measureCharacter(char: string): number {
    return char.charCodeAt(0) > 255 ? 15 : 8;
}

function measureText(text: string): number {
    return Array.from(text).reduce(
        (width, char) => width + measureCharacter(char),
        0
    );
}

function wrapText(text: string, maxWidth: number): string[] {
    const lines: string[] = [];
    let current = '';
    let currentWidth = 0;

    for (const char of Array.from(text || '未命名主题')) {
        const charWidth = measureCharacter(char);
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

    return lines.length > 0 ? lines : ['未命名主题'];
}

function countDescendants(topic: XMindTopicNode): number {
    return topic.children.reduce(
        (sum, child) => sum + 1 + countDescendants(child),
        0
    );
}

function getVisibleChildren(
    topic: XMindTopicNode,
    depth: number
): XMindTopicNode[] {
    return depth < MAX_VISIBLE_DEPTH ? topic.children : [];
}

function createDraft(
    topic: XMindTopicNode,
    depth: number,
    branchIndex = 0
): DraftTopic {
    const isRoot = depth === 0;
    const horizontalPadding = isRoot
        ? ROOT_HORIZONTAL_PADDING
        : HORIZONTAL_PADDING;
    const verticalPadding = isRoot ? ROOT_VERTICAL_PADDING : VERTICAL_PADDING;
    const lineHeight = isRoot ? ROOT_LINE_HEIGHT : LINE_HEIGHT;
    const minWidth = isRoot ? ROOT_MIN_NODE_WIDTH : MIN_NODE_WIDTH;
    const maxTextWidth = isRoot
        ? MAX_NODE_WIDTH - ROOT_HORIZONTAL_PADDING * 2
        : MAX_NODE_WIDTH - HORIZONTAL_PADDING * 2;
    const lines = wrapText(topic.title, maxTextWidth);
    const textWidth = Math.max(...lines.map(measureText));
    const width = Math.max(
        minWidth,
        Math.min(MAX_NODE_WIDTH, textWidth + horizontalPadding * 2)
    );
    const height = lines.length * lineHeight + verticalPadding * 2;
    const children = getVisibleChildren(topic, depth).map((child, index) =>
        createDraft(child, depth + 1, depth === 0 ? index : branchIndex)
    );
    const childrenHeight =
        children.reduce((sum, child) => sum + child.subtreeHeight, 0) +
        Math.max(0, children.length - 1) * VERTICAL_GAP;

    return {
        topic,
        width,
        height,
        lines,
        branchIndex,
        hiddenDescendantCount:
            depth >= MAX_VISIBLE_DEPTH ? countDescendants(topic) : 0,
        subtreeHeight: Math.max(height, childrenHeight),
        children,
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
    lineHeight: number
): MindMapTextLine[] {
    const totalHeight = lines.length * lineHeight;
    const firstY = -totalHeight / 2 + lineHeight * 0.72;

    return lines.map((text, index) => ({
        text,
        x: 0,
        y: firstY + index * lineHeight,
    }));
}

function placeDraft(
    draft: DraftTopic,
    x: number,
    y: number,
    depth: number,
    direction: -1 | 1
): MindMapLayoutTopic {
    const lineHeight = depth === 0 ? ROOT_LINE_HEIGHT : LINE_HEIGHT;
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

    return {
        topic: draft.topic,
        x,
        y,
        width: draft.width,
        height: draft.height,
        depth,
        direction,
        branchIndex: draft.branchIndex,
        hiddenDescendantCount: draft.hiddenDescendantCount,
        lines: createTextLines(draft.lines, lineHeight),
        children,
    };
}

function collectBounds(topic: MindMapLayoutTopic, bounds: MindMapBounds): void {
    const markerOutset =
        topic.hiddenDescendantCount > 0 ? SUMMARY_MARKER_OUTSET : 0;
    const minX =
        topic.x - topic.width / 2 - (topic.direction < 0 ? markerOutset : 0);
    const maxX =
        topic.x + topic.width / 2 + (topic.direction >= 0 ? markerOutset : 0);

    bounds.minX = Math.min(bounds.minX, minX);
    bounds.maxX = Math.max(bounds.maxX, maxX);
    bounds.minY = Math.min(bounds.minY, topic.y - topic.height / 2);
    bounds.maxY = Math.max(bounds.maxY, topic.y + topic.height / 2);

    for (const child of topic.children) {
        collectBounds(child, bounds);
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

export function layoutMindMap(sheet: XMindDocumentSheet): MindMapLayout {
    const rootDraft = createDraft(sheet.rootTopic, 0);
    const root: MindMapLayoutTopic = {
        topic: rootDraft.topic,
        x: 0,
        y: 0,
        width: rootDraft.width,
        height: rootDraft.height,
        depth: 0,
        direction: 0,
        branchIndex: 0,
        hiddenDescendantCount: 0,
        lines: createTextLines(rootDraft.lines, ROOT_LINE_HEIGHT),
        children: [],
    };

    if (isRightSideRootStructure(sheet)) {
        placeRightSideRootChildren(rootDraft, root);
    } else {
        placeSplitRootChildren(rootDraft, root);
    }

    const bounds: MindMapBounds = {
        minX: Number.POSITIVE_INFINITY,
        minY: Number.POSITIVE_INFINITY,
        maxX: Number.NEGATIVE_INFINITY,
        maxY: Number.NEGATIVE_INFINITY,
    };
    collectBounds(root, bounds);

    return { root, bounds };
}
