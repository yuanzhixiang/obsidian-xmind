import {
    XMindDocumentSheet,
    XMindRelationship,
    XMindTopicNode,
    XMindTopicScopedObject,
} from '../xmind-document';
import {
    translateXMind,
    XMindLocale,
} from '../../i18n';
import {
    layoutMindMap,
    MindMapBounds,
    MindMapLayout,
    MindMapLayoutTopic,
} from './layout';
import {
    createXMindStyleResolver,
    XMindResolvedLineObjectStyle,
    XMindStyleResolver,
} from './style-resolver';

export interface NativeMindMapView {
    bounds: MindMapBounds;
    getTopicBounds: (topicId: string) => MindMapBounds | null;
    setTransform: (
        scale: number,
        viewportWidth: number,
        viewportHeight: number,
        panOffsetX: number,
        panOffsetY: number
    ) => void;
    destroy: () => void;
}

export interface NativeMindMapRenderOptions {
    expandedTopicIds?: ReadonlySet<string>;
    collapsedTopicIds?: ReadonlySet<string>;
    selectedTopicId?: string | null;
    searchMatchTopicIds?: ReadonlySet<string>;
    currentSearchTopicId?: string | null;
    locale?: XMindLocale;
    onToggleTopic?: (topicId: string, isExpanded: boolean) => void;
    onSelectTopic?: (topicId: string) => void;
}

const SVG_NS = 'http://www.w3.org/2000/svg';
const OBJECT_PADDING = 18;
const DEFAULT_TOPIC_RADIUS = 7;
const TOPIC_MARKER_SIZE = 14;
const TOPIC_MARKER_GAP = 4;
const TOPIC_LABEL_HEIGHT = 16;
const TOPIC_MARKER_ROW_HEIGHT = 18;
const TOPIC_LABEL_ROW_HEIGHT = 20;
const TOPIC_NUMBERING_HEIGHT = 14;
const TOPIC_SELECTION_OUTSET = 6;
const SUMMARY_TITLE_FONT_SIZE = 14;
const SUMMARY_TITLE_HORIZONTAL_PADDING = 12;
const SUMMARY_TITLE_VERTICAL_PADDING = 6;
const SUMMARY_TITLE_GAP = 14;
const SUMMARY_BRACE_TO_RANGE = 10;
const SUMMARY_BRACE_WIDTH = 20;
const SUMMARY_BRACE_VERTICAL_PADDING = 0;
const SUMMARY_CURVE_EDGE_OFFSET = 0.3;
const RELATIONSHIP_LABEL_FONT_SIZE = 12;
const RELATIONSHIP_LABEL_HORIZONTAL_PADDING = 8;
const RELATIONSHIP_LABEL_VERTICAL_PADDING = 4;

interface SvgPoint {
    x: number;
    y: number;
}

function createSvgElement<K extends keyof SVGElementTagNameMap>(
    ownerDocument: Document,
    tagName: K
): SVGElementTagNameMap[K] {
    return ownerDocument.createElementNS(SVG_NS, tagName);
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function numberValue(value: unknown): number | null {
    const numberValue = Number(value);
    return Number.isFinite(numberValue) ? numberValue : null;
}

function estimateInlineTextWidth(text: string, fontSize: number): number {
    return Array.from(text).reduce((width, char) => {
        const codePoint = char.codePointAt(0) ?? 0;
        const isWide =
            codePoint > 0x2e80 ||
            char === char.toUpperCase() ||
            /[0-9]/.test(char);
        return width + fontSize * (isWide ? 0.9 : 0.58);
    }, 0);
}

function parsePoint(value: unknown): SvgPoint | null {
    if (!isRecord(value)) {
        return null;
    }

    const x = numberValue(value.x);
    const y = numberValue(value.y);
    if (x === null || y === null) {
        return null;
    }

    return { x, y };
}

function parsePointList(value: unknown): SvgPoint[] {
    if (!Array.isArray(value)) {
        return [];
    }

    return value
        .map(parsePoint)
        .filter((point): point is SvgPoint => point !== null);
}

function parseRelationshipControlPoints(value: unknown): SvgPoint[] {
    const directPoints = parsePointList(value);
    if (directPoints.length > 0) {
        return directPoints;
    }

    if (!isRecord(value)) {
        return [];
    }

    const itemPoints = parsePointList(value.items);
    if (itemPoints.length > 0) {
        return itemPoints;
    }

    const namedPoints = parsePointList(value.points);
    if (namedPoints.length > 0) {
        return namedPoints;
    }

    return Object.keys(value)
        .filter((key) => Number.isFinite(Number(key)))
        .sort((left, right) => Number(left) - Number(right))
        .map((key) => parsePoint(value[key]))
        .filter((point): point is SvgPoint => point !== null);
}

function setAttributes(
    element: Element,
    attributes: Record<string, string | number>
): void {
    for (const name in attributes) {
        element.setAttribute(name, String(attributes[name]));
    }
}

function setOptionalLineAttributes(
    element: SVGElement,
    style: XMindResolvedLineObjectStyle
): void {
    if (style.lineDashArray) {
        element.setAttribute('stroke-dasharray', style.lineDashArray);
    }
}

function pathBetween(
    parent: MindMapLayoutTopic,
    child: MindMapLayoutTopic
): string {
    const direction = child.direction || 1;
    const startX = parent.x + direction * (parent.width / 2);
    const startY = parent.y;
    const endX = child.x - direction * (child.width / 2);
    const endY = child.y;
    const controlGap = Math.max(44, Math.abs(endX - startX) * 0.46);
    const controlX1 = startX + direction * controlGap;
    const controlX2 = endX - direction * controlGap;

    return `M ${startX} ${startY} C ${controlX1} ${startY}, ${controlX2} ${endY}, ${endX} ${endY}`;
}

function appendConnector(
    ownerDocument: Document,
    group: SVGGElement,
    parent: MindMapLayoutTopic,
    child: MindMapLayoutTopic,
    topicNodesById: ReadonlyMap<string, SVGGElement>
): void {
    const connector = createSvgElement(ownerDocument, 'g');
    connector.classList.add('xmind-connector');

    const path = createSvgElement(ownerDocument, 'path');
    setAttributes(path, {
        d: pathBetween(parent, child),
        fill: 'none',
        stroke: child.resolvedStyle.branchLineColor,
        'stroke-width': child.resolvedStyle.branchLineWidth,
        'stroke-linecap': 'round',
    });
    if (child.resolvedStyle.branchLineDashArray) {
        path.setAttribute(
            'stroke-dasharray',
            child.resolvedStyle.branchLineDashArray
        );
    }
    path.classList.add('xmind-connector-line');
    connector.appendChild(path);

    appendBranchHoverTarget(
        ownerDocument,
        connector,
        parent,
        child,
        topicNodesById
    );
    group.appendChild(connector);
}

function calloutPath(
    parent: MindMapLayoutTopic,
    callout: MindMapLayoutTopic
): string {
    const start = relationshipEndpoint(parent, callout);
    const end = relationshipEndpoint(callout, parent);
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const controlX = start.x + dx * 0.58;
    const controlY = start.y + dy * 0.18;

    return `M ${start.x} ${start.y} Q ${controlX} ${controlY}, ${end.x} ${end.y}`;
}

function appendCalloutConnector(
    ownerDocument: Document,
    group: SVGGElement,
    parent: MindMapLayoutTopic,
    callout: MindMapLayoutTopic
): void {
    const connector = createSvgElement(ownerDocument, 'path');
    setAttributes(connector, {
        d: calloutPath(parent, callout),
        fill: 'none',
        stroke: callout.resolvedStyle.branchLineColor,
        'stroke-width': Math.max(1.4, callout.resolvedStyle.branchLineWidth),
        'stroke-linecap': 'round',
    });
    if (callout.resolvedStyle.branchLineDashArray) {
        connector.setAttribute(
            'stroke-dasharray',
            callout.resolvedStyle.branchLineDashArray
        );
    }
    connector.classList.add('xmind-callout-connector');
    group.appendChild(connector);
}

function collectVisibleTopicMap(
    layout: MindMapLayout
): Map<string, MindMapLayoutTopic> {
    const topicsById = new Map<string, MindMapLayoutTopic>();
    walkLayoutTopics(layout, (topic) => topicsById.set(topic.topic.id, topic));
    return topicsById;
}

function topicSubtreeBounds(topic: MindMapLayoutTopic): MindMapBounds {
    const bounds: MindMapBounds = {
        minX: topic.x - topic.width / 2,
        minY: topic.y - topic.height / 2,
        maxX: topic.x + topic.width / 2,
        maxY: topic.y + topic.height / 2,
    };

    for (const child of topic.children) {
        const childBounds = topicSubtreeBounds(child);
        bounds.minX = Math.min(bounds.minX, childBounds.minX);
        bounds.minY = Math.min(bounds.minY, childBounds.minY);
        bounds.maxX = Math.max(bounds.maxX, childBounds.maxX);
        bounds.maxY = Math.max(bounds.maxY, childBounds.maxY);
    }

    return bounds;
}

function topicNodeBounds(topic: MindMapLayoutTopic): MindMapBounds {
    return {
        minX: topic.x - topic.width / 2,
        minY: topic.y - topic.height / 2,
        maxX: topic.x + topic.width / 2,
        maxY: topic.y + topic.height / 2,
    };
}

function boundaryRect(bounds: MindMapBounds): {
    x: number;
    y: number;
    width: number;
    height: number;
} {
    return {
        x: bounds.minX - OBJECT_PADDING,
        y: bounds.minY - OBJECT_PADDING,
        width: bounds.maxX - bounds.minX + OBJECT_PADDING * 2,
        height: bounds.maxY - bounds.minY + OBJECT_PADDING * 2,
    };
}

function setLineObjectPaint(
    element: SVGElement,
    style: XMindResolvedLineObjectStyle
): void {
    setAttributes(element, {
        fill: style.fill,
        stroke: style.lineColor,
        'stroke-width': style.lineWidth,
    });
    setOptionalLineAttributes(element, style);
}

function cloudBoundaryPath(
    x: number,
    y: number,
    width: number,
    height: number
): string {
    const right = x + width;
    const bottom = y + height;
    return [
        `M ${x + width * 0.22} ${y + height * 0.78}`,
        `C ${x - width * 0.02} ${y + height * 0.72}, ${x - width * 0.02} ${y + height * 0.38}, ${x + width * 0.22} ${y + height * 0.34}`,
        `C ${x + width * 0.26} ${y + height * 0.08}, ${x + width * 0.58} ${y + height * 0.02}, ${x + width * 0.68} ${y + height * 0.24}`,
        `C ${right + width * 0.04} ${y + height * 0.22}, ${right + width * 0.04} ${y + height * 0.62}, ${x + width * 0.78} ${y + height * 0.68}`,
        `C ${x + width * 0.7} ${bottom + height * 0.02}, ${x + width * 0.34} ${bottom + height * 0.02}, ${x + width * 0.22} ${y + height * 0.78}`,
        'Z',
    ].join(' ');
}

function appendBoundaryShape(
    ownerDocument: Document,
    group: SVGGElement,
    bounds: MindMapBounds,
    style: XMindResolvedLineObjectStyle
): void {
    const rectBounds = boundaryRect(bounds);
    const shape = shapeClassName(style.shapeClass);

    if (shape.includes('ellipse') || shape.includes('circle')) {
        const ellipse = createSvgElement(ownerDocument, 'ellipse');
        setAttributes(ellipse, {
            cx: rectBounds.x + rectBounds.width / 2,
            cy: rectBounds.y + rectBounds.height / 2,
            rx: rectBounds.width / 2,
            ry: rectBounds.height / 2,
        });
        setLineObjectPaint(ellipse, style);
        ellipse.classList.add('xmind-boundary');
        group.appendChild(ellipse);
        return;
    }

    if (shape.includes('diamond')) {
        const polygon = createSvgElement(ownerDocument, 'polygon');
        setAttributes(polygon, {
            points: [
                `${rectBounds.x + rectBounds.width / 2},${rectBounds.y}`,
                `${rectBounds.x + rectBounds.width},${rectBounds.y + rectBounds.height / 2}`,
                `${rectBounds.x + rectBounds.width / 2},${rectBounds.y + rectBounds.height}`,
                `${rectBounds.x},${rectBounds.y + rectBounds.height / 2}`,
            ].join(' '),
        });
        setLineObjectPaint(polygon, style);
        polygon.classList.add('xmind-boundary');
        group.appendChild(polygon);
        return;
    }

    if (shape.includes('hexagon')) {
        const polygon = createSvgElement(ownerDocument, 'polygon');
        const notch = Math.min(32, rectBounds.width * 0.18);
        setAttributes(polygon, {
            points: [
                `${rectBounds.x + notch},${rectBounds.y}`,
                `${rectBounds.x + rectBounds.width - notch},${rectBounds.y}`,
                `${rectBounds.x + rectBounds.width},${rectBounds.y + rectBounds.height / 2}`,
                `${rectBounds.x + rectBounds.width - notch},${rectBounds.y + rectBounds.height}`,
                `${rectBounds.x + notch},${rectBounds.y + rectBounds.height}`,
                `${rectBounds.x},${rectBounds.y + rectBounds.height / 2}`,
            ].join(' '),
        });
        setLineObjectPaint(polygon, style);
        polygon.classList.add('xmind-boundary');
        group.appendChild(polygon);
        return;
    }

    if (shape.includes('cloud')) {
        const path = createSvgElement(ownerDocument, 'path');
        setAttributes(path, {
            d: cloudBoundaryPath(
                rectBounds.x,
                rectBounds.y,
                rectBounds.width,
                rectBounds.height
            ),
        });
        setLineObjectPaint(path, style);
        path.classList.add('xmind-boundary');
        group.appendChild(path);
        return;
    }

    const rect = createSvgElement(ownerDocument, 'rect');
    setAttributes(rect, {
        x: rectBounds.x,
        y: rectBounds.y,
        width: rectBounds.width,
        height: rectBounds.height,
        rx: shape.includes('rect') && !shape.includes('round') ? 0 : 18,
    });
    setLineObjectPaint(rect, style);
    rect.classList.add('xmind-boundary');
    group.appendChild(rect);
}

function appendBoundary(
    ownerDocument: Document,
    group: SVGGElement,
    topic: MindMapLayoutTopic,
    boundary: XMindTopicScopedObject,
    styleResolver: XMindStyleResolver
): void {
    const style = styleResolver.resolveBoundaryStyle(boundary);
    const bounds = topicSubtreeBounds(topic);
    appendBoundaryShape(ownerDocument, group, bounds, style);
}

function parseSummaryRange(range: string | undefined): {
    start: number;
    end: number;
} | null {
    if (!range) {
        return null;
    }

    const numbers = range.match(/\d+/g)?.map((item) => Number(item)) ?? [];
    if (numbers.length < 2) {
        return null;
    }

    const start = Math.min(numbers[0], numbers[1]);
    const end = Math.max(numbers[0], numbers[1]);
    return { start, end };
}

function summaryChildren(
    topic: MindMapLayoutTopic,
    summary: XMindTopicScopedObject
): MindMapLayoutTopic[] {
    const range = parseSummaryRange(summary.range);
    if (!range) {
        return topic.children;
    }

    return topic.children.slice(range.start, range.end + 1);
}

function topicDescendantTitleById(
    topic: XMindTopicNode,
    topicId: string | undefined
): string | undefined {
    if (!topicId) {
        return undefined;
    }

    const visit = (candidate: XMindTopicNode): string | undefined => {
        if (candidate.id === topicId) {
            return candidate.title;
        }

        for (const childType in candidate.childrenByType) {
            const children = candidate.childrenByType[childType] ?? [];
            for (const child of children) {
                const title = visit(child);
                if (title) {
                    return title;
                }
            }
        }

        return undefined;
    };

    return visit(topic);
}

function summaryTitle(
    topic: MindMapLayoutTopic,
    summary: XMindTopicScopedObject
): string | undefined {
    return (
        summary.title ??
        topicDescendantTitleById(topic.topic, summary.topicId) ??
        (summary.topicId
            ? topic.topic.childrenByType.summary?.[0]?.title
            : undefined)
    );
}

function summaryGeometry(
    topic: MindMapLayoutTopic,
    summary: XMindTopicScopedObject,
    lineWidth: number
): {
    d: string;
    labelX: number;
    labelY: number;
    direction: -1 | 1;
} | null {
    const children = summaryChildren(topic, summary);
    if (children.length === 0) {
        return null;
    }

    const direction = topic.direction || 1;
    const childrenBounds = children.reduce<MindMapBounds>(
        (bounds, child) => {
            const childBounds = topicSubtreeBounds(child);
            return {
                minX: Math.min(bounds.minX, childBounds.minX),
                minY: Math.min(bounds.minY, childBounds.minY),
                maxX: Math.max(bounds.maxX, childBounds.maxX),
                maxY: Math.max(bounds.maxY, childBounds.maxY),
            };
        },
        {
            minX: Number.POSITIVE_INFINITY,
            minY: Number.POSITIVE_INFINITY,
            maxX: Number.NEGATIVE_INFINITY,
            maxY: Number.NEGATIVE_INFINITY,
        }
    );
    const topicRangeEdge =
        direction > 0
            ? Math.max(...children.map((child) => child.x + child.width / 2))
            : Math.min(...children.map((child) => child.x - child.width / 2));
    const endpointX =
        topicRangeEdge + direction * SUMMARY_BRACE_TO_RANGE;
    const middleX = endpointX + direction * SUMMARY_BRACE_WIDTH;
    const top = childrenBounds.minY - SUMMARY_BRACE_VERTICAL_PADDING;
    const bottom = childrenBounds.maxY + SUMMARY_BRACE_VERTICAL_PADDING;
    const middle = (top + bottom) / 2;
    const middlePos = { x: middleX, y: middle };
    const labelX = middleX + direction * SUMMARY_TITLE_GAP;

    return {
        d:
            xmindSummaryCurlySegment(
                middlePos,
                { x: endpointX, y: top },
                lineWidth
            ) +
            xmindSummaryCurlySegment(
                middlePos,
                { x: endpointX, y: bottom },
                lineWidth
            ),
        labelX,
        labelY: middle,
        direction,
    };
}

function xmindSummaryCurlySegment(
    middlePos: SvgPoint,
    targetPos: SvgPoint,
    lineWidth: number
): string {
    const edgeOffset = SUMMARY_CURVE_EDGE_OFFSET;
    const startY =
        middlePos.y < targetPos.y
            ? middlePos.y - edgeOffset
            : middlePos.y + edgeOffset;
    const returnY =
        middlePos.y < targetPos.y
            ? middlePos.y + edgeOffset
            : middlePos.y - edgeOffset;
    const targetEntryY =
        targetPos.y < middlePos.y
            ? targetPos.y + edgeOffset
            : targetPos.y - edgeOffset;
    const targetReturnY =
        targetPos.y < middlePos.y
            ? targetPos.y - edgeOffset
            : targetPos.y + edgeOffset;
    const centerX = (middlePos.x + targetPos.x) / 2;
    const centerY = (middlePos.y + targetPos.y) / 2;
    const firstControlX =
        centerX < targetPos.x
            ? centerX + lineWidth / 2
            : centerX - lineWidth / 2;
    const secondControlX =
        centerX < targetPos.x
            ? centerX - lineWidth / 2
            : centerX + lineWidth / 2;
    const targetControlX =
        targetPos.x < middlePos.x
            ? targetPos.x + lineWidth
            : targetPos.x - lineWidth;
    const middleControlX =
        middlePos.x < targetPos.x
            ? middlePos.x + lineWidth
            : middlePos.x - lineWidth;

    return [
        `M ${middlePos.x} ${startY}`,
        `Q ${targetPos.x} ${startY}, ${firstControlX} ${centerY}`,
        `Q ${middleControlX} ${targetEntryY}, ${targetPos.x} ${targetEntryY}`,
        `L ${targetPos.x} ${targetReturnY}`,
        `Q ${middlePos.x} ${targetReturnY}, ${secondControlX} ${centerY}`,
        `Q ${targetControlX} ${returnY}, ${middlePos.x} ${returnY}`,
        `L ${middlePos.x} ${startY}`,
    ].join(' ');
}

function appendSummary(
    ownerDocument: Document,
    group: SVGGElement,
    topic: MindMapLayoutTopic,
    summary: XMindTopicScopedObject,
    styleResolver: XMindStyleResolver
): void {
    const style = styleResolver.resolveSummaryStyle(summary);
    const geometry = summaryGeometry(topic, summary, style.lineWidth);
    if (!geometry) {
        return;
    }

    const summaryGroup = createSvgElement(ownerDocument, 'g');
    summaryGroup.classList.add('xmind-summary-group');

    const path = createSvgElement(ownerDocument, 'path');
    setAttributes(path, {
        d: geometry.d,
        fill: 'none',
        stroke: style.lineColor,
        'stroke-width': style.lineWidth,
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
    });
    setOptionalLineAttributes(path, style);
    path.classList.add('xmind-summary');
    summaryGroup.appendChild(path);

    const title = summaryTitle(topic, summary);
    if (title) {
        const labelWidth =
            estimateInlineTextWidth(title, SUMMARY_TITLE_FONT_SIZE) +
            SUMMARY_TITLE_HORIZONTAL_PADDING * 2;
        const labelHeight =
            SUMMARY_TITLE_FONT_SIZE + SUMMARY_TITLE_VERTICAL_PADDING * 2;
        const labelX =
            geometry.direction > 0 ? geometry.labelX : geometry.labelX - labelWidth;
        const labelY = geometry.labelY - labelHeight / 2;
        const rect = createSvgElement(ownerDocument, 'rect');
        setAttributes(rect, {
            x: labelX,
            y: labelY,
            width: labelWidth,
            height: labelHeight,
            rx: 8,
            fill: '#ffffff',
            stroke: style.lineColor,
            'stroke-width': Math.max(1.5, style.lineWidth),
        });
        rect.classList.add('xmind-summary-title-box');
        summaryGroup.appendChild(rect);

        const text = createSvgElement(ownerDocument, 'text');
        text.textContent = title;
        setAttributes(text, {
            x: labelX + labelWidth / 2,
            y: geometry.labelY,
            fill: '#111111',
            'font-size': SUMMARY_TITLE_FONT_SIZE,
            'font-weight': 500,
            'text-anchor': 'middle',
            'dominant-baseline': 'central',
        });
        text.classList.add('xmind-summary-title');
        summaryGroup.appendChild(text);
    }

    group.appendChild(summaryGroup);
}

function relationshipEndpoint(
    from: MindMapLayoutTopic,
    to: MindMapLayoutTopic
): SvgPoint {
    return topicEndpointToward(from, { x: to.x, y: to.y });
}

function topicEndpointToward(
    topic: MindMapLayoutTopic,
    target: SvgPoint
): SvgPoint {
    const dx = target.x - topic.x;
    const dy = target.y - topic.y;
    if (Math.abs(dx) >= Math.abs(dy)) {
        return {
            x: topic.x + Math.sign(dx || 1) * (topic.width / 2),
            y: topic.y,
        };
    }

    return {
        x: topic.x,
        y: topic.y + Math.sign(dy || 1) * (topic.height / 2),
    };
}

function shapeClassName(shapeClass?: string): string {
    const value = shapeClass ?? '';
    const lastDot = value.lastIndexOf('.');
    return (lastDot >= 0 ? value.slice(lastDot + 1) : value)
        .toLowerCase()
        .replace(/[-_]/g, '');
}

function isAngledLineShape(shape: string): boolean {
    return (
        shape.includes('angle') ||
        shape.includes('elbow') ||
        shape.includes('fold') ||
        shape.includes('polyline') ||
        shape.includes('orthogonal')
    );
}

function isStraightLineShape(shape: string): boolean {
    return (
        shape.includes('straight') ||
        (shape.endsWith('line') && !isAngledLineShape(shape))
    );
}

function elbowPath(start: SvgPoint, end: SvgPoint): string {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    if (Math.abs(dx) >= Math.abs(dy)) {
        const midX = start.x + dx / 2;
        return `M ${start.x} ${start.y} L ${midX} ${start.y} L ${midX} ${end.y} L ${end.x} ${end.y}`;
    }

    const midY = start.y + dy / 2;
    return `M ${start.x} ${start.y} L ${start.x} ${midY} L ${end.x} ${midY} L ${end.x} ${end.y}`;
}

function relationshipPath(
    startTopic: MindMapLayoutTopic,
    endTopic: MindMapLayoutTopic,
    relationship: XMindRelationship,
    style: XMindResolvedLineObjectStyle
): string {
    const controlPoints = parseRelationshipControlPoints(
        relationship.controlPoints
    );
    if (controlPoints.length > 0) {
        return relationshipPathWithControlPoints(
            startTopic,
            endTopic,
            controlPoints
        );
    }

    const start = relationshipEndpoint(startTopic, endTopic);
    const end = relationshipEndpoint(endTopic, startTopic);
    const shape = shapeClassName(style.shapeClass);
    if (isAngledLineShape(shape)) {
        return elbowPath(start, end);
    }

    if (isStraightLineShape(shape)) {
        return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
    }

    const dx = end.x - start.x;
    const controlGap = Math.max(44, Math.abs(dx) * 0.36);
    const direction = Math.sign(dx || 1);

    return `M ${start.x} ${start.y} C ${start.x + direction * controlGap} ${start.y}, ${end.x - direction * controlGap} ${end.y}, ${end.x} ${end.y}`;
}

function relationshipPathWithControlPoints(
    startTopic: MindMapLayoutTopic,
    endTopic: MindMapLayoutTopic,
    controlPoints: SvgPoint[]
): string {
    const start = topicEndpointToward(startTopic, controlPoints[0]);
    const end = topicEndpointToward(
        endTopic,
        controlPoints[controlPoints.length - 1]
    );

    if (controlPoints.length === 1) {
        const [control] = controlPoints;
        return `M ${start.x} ${start.y} Q ${control.x} ${control.y}, ${end.x} ${end.y}`;
    }

    if (controlPoints.length === 2) {
        const [control1, control2] = controlPoints;
        return `M ${start.x} ${start.y} C ${control1.x} ${control1.y}, ${control2.x} ${control2.y}, ${end.x} ${end.y}`;
    }

    const [control1, control2, firstSegmentEnd, ...rest] = controlPoints;
    const segments = [
        `M ${start.x} ${start.y}`,
        `C ${control1.x} ${control1.y}, ${control2.x} ${control2.y}, ${firstSegmentEnd.x} ${firstSegmentEnd.y}`,
        ...rest.map((point) => `L ${point.x} ${point.y}`),
        `L ${end.x} ${end.y}`,
    ];

    return segments.join(' ');
}

function relationshipLabelPoint(
    startTopic: MindMapLayoutTopic,
    endTopic: MindMapLayoutTopic,
    relationship: XMindRelationship
): SvgPoint {
    const controlPoints = parseRelationshipControlPoints(
        relationship.controlPoints
    );
    const start =
        controlPoints.length > 0
            ? topicEndpointToward(startTopic, controlPoints[0])
            : relationshipEndpoint(startTopic, endTopic);
    const end =
        controlPoints.length > 0
            ? topicEndpointToward(
                  endTopic,
                  controlPoints[controlPoints.length - 1]
              )
            : relationshipEndpoint(endTopic, startTopic);

    if (controlPoints.length === 1) {
        const [control] = controlPoints;
        return {
            x: 0.25 * start.x + 0.5 * control.x + 0.25 * end.x,
            y: 0.25 * start.y + 0.5 * control.y + 0.25 * end.y,
        };
    }

    if (controlPoints.length >= 2) {
        const [control1, control2] = controlPoints;
        return {
            x:
                0.125 * start.x +
                0.375 * control1.x +
                0.375 * control2.x +
                0.125 * end.x,
            y:
                0.125 * start.y +
                0.375 * control1.y +
                0.375 * control2.y +
                0.125 * end.y,
        };
    }

    return {
        x: (start.x + end.x) / 2,
        y: (start.y + end.y) / 2,
    };
}

function appendRelationshipTitle(
    ownerDocument: Document,
    group: SVGGElement,
    relationship: XMindRelationship,
    startTopic: MindMapLayoutTopic,
    endTopic: MindMapLayoutTopic,
    style: XMindResolvedLineObjectStyle
): void {
    const title = relationship.title?.trim();
    if (!title) {
        return;
    }

    const point = relationshipLabelPoint(startTopic, endTopic, relationship);
    const width =
        estimateInlineTextWidth(title, RELATIONSHIP_LABEL_FONT_SIZE) +
        RELATIONSHIP_LABEL_HORIZONTAL_PADDING * 2;
    const height =
        RELATIONSHIP_LABEL_FONT_SIZE +
        RELATIONSHIP_LABEL_VERTICAL_PADDING * 2;
    const label = createSvgElement(ownerDocument, 'g');
    setAttributes(label, {
        transform: `translate(${point.x} ${point.y - 12})`,
    });
    label.classList.add('xmind-relationship-title');

    const background = createSvgElement(ownerDocument, 'rect');
    setAttributes(background, {
        x: -width / 2,
        y: -height / 2,
        width,
        height,
        rx: 6,
        ry: 6,
        fill: '#ffffff',
        stroke: style.lineColor,
        'stroke-width': 1,
    });
    label.appendChild(background);

    const text = createSvgElement(ownerDocument, 'text');
    setAttributes(text, {
        x: 0,
        y: RELATIONSHIP_LABEL_FONT_SIZE * 0.36,
        'text-anchor': 'middle',
        fill: style.lineColor,
        'font-size': RELATIONSHIP_LABEL_FONT_SIZE,
        'font-family': '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    });
    text.textContent = title;
    label.appendChild(text);
    group.appendChild(label);
}

function hasArrow(arrowClass?: string): boolean {
    return Boolean(arrowClass && !arrowClass.endsWith('.none'));
}

function markerId(index: number, end: 'begin' | 'end'): string {
    return `xmind-relationship-arrow-${index}-${end}`;
}

function appendRelationshipMarker(
    ownerDocument: Document,
    defs: SVGDefsElement,
    id: string,
    style: XMindResolvedLineObjectStyle,
    orient: string
): void {
    const marker = createSvgElement(ownerDocument, 'marker');
    setAttributes(marker, {
        id,
        viewBox: '0 0 10 10',
        refX: 9,
        refY: 5,
        markerWidth: 8,
        markerHeight: 8,
        orient,
    });

    const arrow = createSvgElement(ownerDocument, 'path');
    setAttributes(arrow, {
        d: 'M 0 0 L 10 5 L 0 10 z',
        fill: style.lineColor,
    });
    marker.appendChild(arrow);
    defs.appendChild(marker);
}

function appendRelationship(
    ownerDocument: Document,
    defs: SVGDefsElement,
    group: SVGGElement,
    relationship: XMindRelationship,
    relationshipIndex: number,
    topicsById: ReadonlyMap<string, MindMapLayoutTopic>,
    styleResolver: XMindStyleResolver
): void {
    if (!relationship.end1Id || !relationship.end2Id) {
        return;
    }

    const startTopic = topicsById.get(relationship.end1Id);
    const endTopic = topicsById.get(relationship.end2Id);
    if (!startTopic || !endTopic) {
        return;
    }

    const style = styleResolver.resolveRelationshipStyle(relationship);
    const path = createSvgElement(ownerDocument, 'path');
    setAttributes(path, {
        d: relationshipPath(startTopic, endTopic, relationship, style),
        fill: 'none',
        stroke: style.lineColor,
        'stroke-width': style.lineWidth,
        'stroke-linecap': 'round',
    });
    setOptionalLineAttributes(path, style);

    if (hasArrow(style.arrowBeginClass)) {
        const id = markerId(relationshipIndex, 'begin');
        appendRelationshipMarker(ownerDocument, defs, id, style, 'auto-start-reverse');
        path.setAttribute('marker-start', `url(#${id})`);
    }

    if (hasArrow(style.arrowEndClass)) {
        const id = markerId(relationshipIndex, 'end');
        appendRelationshipMarker(ownerDocument, defs, id, style, 'auto');
        path.setAttribute('marker-end', `url(#${id})`);
    }

    path.classList.add('xmind-relationship');
    group.appendChild(path);
    appendRelationshipTitle(
        ownerDocument,
        group,
        relationship,
        startTopic,
        endTopic,
        style
    );
}

function appendTopicObjects(
    ownerDocument: Document,
    group: SVGGElement,
    topic: MindMapLayoutTopic,
    styleResolver: XMindStyleResolver
): void {
    for (const boundary of topic.topic.boundaries) {
        appendBoundary(ownerDocument, group, topic, boundary, styleResolver);
    }

    for (const summary of topic.topic.summaries) {
        appendSummary(ownerDocument, group, topic, summary, styleResolver);
    }
}

function setBranchHoverState(
    topicNodesById: ReadonlyMap<string, SVGGElement>,
    topicId: string,
    isHovered: boolean
): void {
    topicNodesById.get(topicId)?.classList.toggle(
        'is-branch-hovered',
        isHovered
    );
}

function appendBranchHoverTarget(
    ownerDocument: Document,
    connector: SVGGElement,
    parent: MindMapLayoutTopic,
    child: MindMapLayoutTopic,
    topicNodesById: ReadonlyMap<string, SVGGElement>
): void {
    if (parent.toggleControlKind !== 'collapse') {
        return;
    }

    const hoverTarget = createSvgElement(ownerDocument, 'path');
    setAttributes(hoverTarget, {
        d: pathBetween(parent, child),
        fill: 'none',
        stroke: '#ffffff',
        'stroke-opacity': 0,
        'stroke-width': 18,
        'stroke-linecap': 'round',
        'pointer-events': 'stroke',
        'data-name': 'branch-collapse-hover-target',
        'data-topic-id': parent.topic.id,
    });
    hoverTarget.classList.add('xmind-branch-hover-target');

    const showCollapseControl = (): void =>
        setBranchHoverState(topicNodesById, parent.topic.id, true);
    const hideCollapseControl = (): void =>
        setBranchHoverState(topicNodesById, parent.topic.id, false);

    hoverTarget.addEventListener('pointerenter', showCollapseControl);
    hoverTarget.addEventListener('pointerleave', hideCollapseControl);
    hoverTarget.addEventListener('mouseenter', showCollapseControl);
    hoverTarget.addEventListener('mouseleave', hideCollapseControl);
    hoverTarget.addEventListener('mouseover', showCollapseControl);
    hoverTarget.addEventListener('mouseout', hideCollapseControl);
    hoverTarget.addEventListener('focus', showCollapseControl);
    hoverTarget.addEventListener('blur', hideCollapseControl);

    connector.appendChild(hoverTarget);
}

function nodeFill(topic: MindMapLayoutTopic): string {
    return topic.resolvedStyle.fill;
}

function nodeStroke(topic: MindMapLayoutTopic): string {
    return topic.resolvedStyle.borderWidth > 0
        ? topic.resolvedStyle.borderColor
        : 'none';
}

function textFill(topic: MindMapLayoutTopic): string {
    return topic.resolvedStyle.textFill;
}

function topicShapeName(topic: MindMapLayoutTopic): string {
    return shapeClassName(topic.resolvedStyle.shapeClass);
}

function topicLineColor(topic: MindMapLayoutTopic): string {
    if (topic.resolvedStyle.borderWidth > 0) {
        return topic.resolvedStyle.borderColor;
    }

    return topic.resolvedStyle.branchLineColor || topic.resolvedStyle.branchColor;
}

function topicLineWidth(topic: MindMapLayoutTopic): number {
    if (topic.resolvedStyle.borderWidth > 0) {
        return topic.resolvedStyle.borderWidth;
    }

    return Math.max(1.5, topic.resolvedStyle.branchLineWidth);
}

function setTopicShapePaint(
    element: SVGElement,
    topic: MindMapLayoutTopic,
    fill = nodeFill(topic),
    stroke = nodeStroke(topic),
    strokeWidth = topic.resolvedStyle.borderWidth
): void {
    setAttributes(element, {
        fill,
        stroke,
        'stroke-width': strokeWidth,
    });
}

function appendRectTopicShape(
    ownerDocument: Document,
    node: SVGGElement,
    topic: MindMapLayoutTopic,
    radius: number
): void {
    const rect = createSvgElement(ownerDocument, 'rect');
    setAttributes(rect, {
        x: -topic.width / 2,
        y: -topic.height / 2,
        width: topic.width,
        height: topic.height,
        rx: radius,
    });
    setTopicShapePaint(rect, topic);
    node.appendChild(rect);
}

function appendEllipseTopicShape(
    ownerDocument: Document,
    node: SVGGElement,
    topic: MindMapLayoutTopic
): void {
    const ellipse = createSvgElement(ownerDocument, 'ellipse');
    setAttributes(ellipse, {
        cx: 0,
        cy: 0,
        rx: topic.width / 2,
        ry: topic.height / 2,
    });
    setTopicShapePaint(ellipse, topic);
    node.appendChild(ellipse);
}

function appendPolygonTopicShape(
    ownerDocument: Document,
    node: SVGGElement,
    topic: MindMapLayoutTopic,
    points: Array<[number, number]>
): void {
    const polygon = createSvgElement(ownerDocument, 'polygon');
    setAttributes(polygon, {
        points: points.map(([x, y]) => `${x},${y}`).join(' '),
    });
    setTopicShapePaint(polygon, topic);
    node.appendChild(polygon);
}

function appendUnderlineTopicShape(
    ownerDocument: Document,
    node: SVGGElement,
    topic: MindMapLayoutTopic,
    lineCount: 1 | 2
): void {
    const lineColor = topicLineColor(topic);
    const lineWidth = topicLineWidth(topic);
    const bottomY = topic.height / 2 - lineWidth;

    for (let index = 0; index < lineCount; index += 1) {
        const line = createSvgElement(ownerDocument, 'line');
        setAttributes(line, {
            x1: -topic.width / 2,
            y1: bottomY - index * (lineWidth + 3),
            x2: topic.width / 2,
            y2: bottomY - index * (lineWidth + 3),
            stroke: lineColor,
            'stroke-width': lineWidth,
            'stroke-linecap': 'round',
        });
        node.appendChild(line);
    }
}

function appendTopicShape(
    ownerDocument: Document,
    node: SVGGElement,
    topic: MindMapLayoutTopic
): void {
    const shape = topicShapeName(topic);

    if (shape === 'underline') {
        appendUnderlineTopicShape(ownerDocument, node, topic, 1);
        return;
    }

    if (shape === 'doubleunderline') {
        appendUnderlineTopicShape(ownerDocument, node, topic, 2);
        return;
    }

    if (shape === 'circle' || shape === 'ellipse') {
        appendEllipseTopicShape(ownerDocument, node, topic);
        return;
    }

    if (shape === 'ellipserect') {
        appendRectTopicShape(ownerDocument, node, topic, topic.height / 2);
        return;
    }

    if (shape === 'rect' || shape === 'rectangle') {
        appendRectTopicShape(ownerDocument, node, topic, 0);
        return;
    }

    if (shape === 'diamond') {
        appendPolygonTopicShape(ownerDocument, node, topic, [
            [0, -topic.height / 2],
            [topic.width / 2, 0],
            [0, topic.height / 2],
            [-topic.width / 2, 0],
        ]);
        return;
    }

    if (shape === 'hexagon') {
        const notch = Math.min(28, topic.width * 0.18);
        appendPolygonTopicShape(ownerDocument, node, topic, [
            [-topic.width / 2 + notch, -topic.height / 2],
            [topic.width / 2 - notch, -topic.height / 2],
            [topic.width / 2, 0],
            [topic.width / 2 - notch, topic.height / 2],
            [-topic.width / 2 + notch, topic.height / 2],
            [-topic.width / 2, 0],
        ]);
        return;
    }

    appendRectTopicShape(
        ownerDocument,
        node,
        topic,
        topic.depth === 0 ? DEFAULT_TOPIC_RADIUS : 6
    );
}

function markerColor(markerId: string, topic: MindMapLayoutTopic): string {
    const normalized = markerId.toLowerCase();
    if (normalized.includes('priority')) {
        return '#ff5b68';
    }

    if (normalized.includes('task') || normalized.includes('progress')) {
        if (normalized.includes('done') || normalized.includes('100')) {
            return '#13a380';
        }

        return '#5b8def';
    }

    return topic.resolvedStyle.branchColor;
}

function markerText(markerId: string): string {
    const priorityMatch = markerId.match(/priority[-_]?([0-9]+)/i);
    if (priorityMatch) {
        return priorityMatch[1];
    }

    const progressMatch = markerId.match(/(?:progress|task)[-_]?([0-9]+)/i);
    if (progressMatch) {
        return progressMatch[1];
    }

    return '';
}

function taskInfoColor(topic: MindMapLayoutTopic): string {
    const progress = topic.topic.taskInfo?.progress;
    if (progress !== undefined && progress >= 100) {
        return '#13a380';
    }

    const priority = topic.topic.taskInfo?.priority?.replace(/^p/i, '');
    if (priority === '1') {
        return '#ff5b68';
    }

    return '#5b8def';
}

function safeHref(href?: string): string | null {
    const value = href?.trim();
    if (!value) {
        return null;
    }

    const lowerValue = value.toLowerCase();
    if (
        lowerValue.startsWith('javascript:') ||
        lowerValue.startsWith('data:') ||
        lowerValue.startsWith('vbscript:')
    ) {
        return null;
    }

    return value;
}

function appendDoneMarkerPath(
    ownerDocument: Document,
    marker: SVGGElement
): void {
    const path = createSvgElement(ownerDocument, 'path');
    setAttributes(path, {
        d: 'M -4 0 L -1 3.2 L 4.8 -4',
        fill: 'none',
        stroke: '#ffffff',
        'stroke-width': 2,
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
    });
    marker.appendChild(path);
}

function appendMetadataIconCircle(
    ownerDocument: Document,
    node: SVGGElement,
    x: number,
    y: number,
    className: string,
    dataName: string,
    dataValue: string,
    fill: string
): SVGGElement {
    const icon = createSvgElement(ownerDocument, 'g');
    setAttributes(icon, {
        transform: `translate(${x} ${y})`,
        [dataName]: dataValue,
    });
    icon.classList.add(className);

    const title = createSvgElement(ownerDocument, 'title');
    title.textContent = dataValue;
    icon.appendChild(title);

    const circle = createSvgElement(ownerDocument, 'circle');
    setAttributes(circle, {
        cx: 0,
        cy: 0,
        r: TOPIC_MARKER_SIZE / 2,
        fill,
    });
    icon.appendChild(circle);
    node.appendChild(icon);

    return icon;
}

function appendAttachmentIcon(
    ownerDocument: Document,
    node: SVGGElement,
    topic: MindMapLayoutTopic,
    x: number,
    y: number
): void {
    const icon = appendMetadataIconCircle(
        ownerDocument,
        node,
        x,
        y,
        'xmind-topic-attachment',
        'data-attachment-count',
        String(topic.attachmentCount),
        '#6f7782'
    );

    const path = createSvgElement(ownerDocument, 'path');
    setAttributes(path, {
        d: 'M -2.8 0.8 L 1.4 -3.4 C 2.8 -4.8 5 -2.6 3.6 -1.2 L -1.2 3.6 C -3.4 5.8 -6.6 2.6 -4.4 0.4 L 0.6 -4.6',
        fill: 'none',
        stroke: '#ffffff',
        'stroke-width': 1.2,
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
    });
    icon.appendChild(path);
}

function appendEquationIcon(
    ownerDocument: Document,
    node: SVGGElement,
    topic: MindMapLayoutTopic,
    x: number,
    y: number
): void {
    const icon = appendMetadataIconCircle(
        ownerDocument,
        node,
        x,
        y,
        'xmind-topic-equation',
        'data-equation',
        topic.equationText ?? 'Equation',
        '#8b5cf6'
    );

    const text = createSvgElement(ownerDocument, 'text');
    setAttributes(text, {
        x: 0,
        y: 3.5,
        'text-anchor': 'middle',
        fill: '#ffffff',
        'font-size': 8,
        'font-weight': 800,
        'font-family':
            '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    });
    text.textContent = 'fx';
    icon.appendChild(text);
}

function appendAudioIcon(
    ownerDocument: Document,
    node: SVGGElement,
    topic: MindMapLayoutTopic,
    x: number,
    y: number
): void {
    const icon = appendMetadataIconCircle(
        ownerDocument,
        node,
        x,
        y,
        'xmind-topic-audio',
        'data-audio',
        topic.audioText ?? 'Audio',
        '#f59e0b'
    );

    const path = createSvgElement(ownerDocument, 'path');
    setAttributes(path, {
        d: 'M -4 1.5 H -2 L 1 -1.5 V 4.5 L -2 1.5 M 3 -2 C 4.5 -0.6 4.5 2.6 3 4',
        fill: 'none',
        stroke: '#ffffff',
        'stroke-width': 1.2,
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
    });
    icon.appendChild(path);
}

function appendTopicMarkers(
    ownerDocument: Document,
    node: SVGGElement,
    topic: MindMapLayoutTopic
): void {
    if (
        topic.markerIds.length === 0 &&
        !topic.numberingText &&
        !topic.taskText &&
        topic.attachmentCount === 0 &&
        !topic.equationText &&
        !topic.audioText &&
        !topic.hasLink &&
        !topic.noteText
    ) {
        return;
    }

    const textHeight = topic.lines.length * topic.resolvedStyle.lineHeight;
    const labelsHeight = topic.labels.length > 0 ? TOPIC_LABEL_ROW_HEIGHT : 0;
    const totalHeight = TOPIC_MARKER_ROW_HEIGHT + textHeight + labelsHeight;
    const extraIconCount =
        (topic.attachmentCount > 0 ? 1 : 0) +
        (topic.equationText ? 1 : 0) +
        (topic.audioText ? 1 : 0);
    const iconItemCount =
        topic.markerIds.length +
        extraIconCount +
        (topic.hasLink ? 1 : 0) +
        (topic.noteText ? 1 : 0);
    const metadataItemCount =
        iconItemCount +
        (topic.numberingText ? 1 : 0) +
        (topic.taskText ? 1 : 0);
    const rowWidth =
        iconItemCount * TOPIC_MARKER_SIZE +
        (topic.numberingText ? topic.numberingWidth : 0) +
        (topic.taskText ? topic.taskWidth : 0) +
        Math.max(0, metadataItemCount - 1) * TOPIC_MARKER_GAP;
    let nextX = -rowWidth / 2;
    const y = -totalHeight / 2 + TOPIC_MARKER_ROW_HEIGHT / 2;
    const nextIconX = (): number => {
        const iconX = nextX + TOPIC_MARKER_SIZE / 2;
        nextX += TOPIC_MARKER_SIZE + TOPIC_MARKER_GAP;
        return iconX;
    };

    if (topic.numberingText) {
        const numbering = createSvgElement(ownerDocument, 'g');
        setAttributes(numbering, {
            transform: `translate(${nextX + topic.numberingWidth / 2} ${y})`,
            'data-numbering': topic.numberingText,
        });
        numbering.classList.add('xmind-topic-numbering');

        const rect = createSvgElement(ownerDocument, 'rect');
        setAttributes(rect, {
            x: -topic.numberingWidth / 2,
            y: -TOPIC_NUMBERING_HEIGHT / 2,
            width: topic.numberingWidth,
            height: TOPIC_NUMBERING_HEIGHT,
            rx: TOPIC_NUMBERING_HEIGHT / 2,
            fill: '#ffffff',
            stroke: topic.resolvedStyle.branchColor,
            'stroke-width': 1,
        });
        numbering.appendChild(rect);

        const text = createSvgElement(ownerDocument, 'text');
        setAttributes(text, {
            x: 0,
            y: 3.5,
            'text-anchor': 'middle',
            fill: topic.resolvedStyle.branchColor,
            'font-size': 10,
            'font-weight': 700,
            'font-family':
                '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        });
        text.textContent = topic.numberingText;
        numbering.appendChild(text);
        node.appendChild(numbering);
        nextX += topic.numberingWidth + TOPIC_MARKER_GAP;
    }

    if (topic.taskText) {
        const task = createSvgElement(ownerDocument, 'g');
        const color = taskInfoColor(topic);
        setAttributes(task, {
            transform: `translate(${nextX + topic.taskWidth / 2} ${y})`,
            'data-task-info': topic.taskText,
        });
        task.classList.add('xmind-topic-task-info');

        const title = createSvgElement(ownerDocument, 'title');
        title.textContent = topic.taskText;
        task.appendChild(title);

        const rect = createSvgElement(ownerDocument, 'rect');
        setAttributes(rect, {
            x: -topic.taskWidth / 2,
            y: -TOPIC_NUMBERING_HEIGHT / 2,
            width: topic.taskWidth,
            height: TOPIC_NUMBERING_HEIGHT,
            rx: TOPIC_NUMBERING_HEIGHT / 2,
            fill: '#ffffff',
            stroke: color,
            'stroke-width': 1,
        });
        task.appendChild(rect);

        const text = createSvgElement(ownerDocument, 'text');
        setAttributes(text, {
            x: 0,
            y: 3.5,
            'text-anchor': 'middle',
            fill: color,
            'font-size': 10,
            'font-weight': 700,
            'font-family':
                '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        });
        text.textContent = topic.taskText;
        task.appendChild(text);
        node.appendChild(task);
        nextX += topic.taskWidth + TOPIC_MARKER_GAP;
    }

    if (topic.attachmentCount > 0) {
        appendAttachmentIcon(
            ownerDocument,
            node,
            topic,
            nextIconX(),
            y
        );
    }

    if (topic.equationText) {
        appendEquationIcon(ownerDocument, node, topic, nextIconX(), y);
    }

    if (topic.audioText) {
        appendAudioIcon(ownerDocument, node, topic, nextIconX(), y);
    }

    for (const markerId of topic.markerIds) {
        const markerX = nextIconX();
        const marker = createSvgElement(ownerDocument, 'g');
        setAttributes(marker, {
            transform: `translate(${markerX} ${y})`,
            'data-marker-id': markerId,
        });
        marker.classList.add('xmind-topic-marker');

        const circle = createSvgElement(ownerDocument, 'circle');
        setAttributes(circle, {
            cx: 0,
            cy: 0,
            r: TOPIC_MARKER_SIZE / 2,
            fill: markerColor(markerId, topic),
        });
        marker.appendChild(circle);

        if (markerId.toLowerCase().includes('done')) {
            appendDoneMarkerPath(ownerDocument, marker);
        } else {
            const text = createSvgElement(ownerDocument, 'text');
            setAttributes(text, {
                x: 0,
                y: 3.6,
                'text-anchor': 'middle',
                fill: '#ffffff',
                'font-size': 9,
                'font-weight': 700,
                'font-family':
                    '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            });
            text.textContent = markerText(markerId) || markerId.slice(0, 1);
            marker.appendChild(text);
        }

        node.appendChild(marker);
    }

    if (topic.hasLink) {
        const linkX = nextIconX();
        const href = safeHref(topic.topic.href);
        const linkNode = href
            ? createSvgElement(ownerDocument, 'a')
            : createSvgElement(ownerDocument, 'g');
        setAttributes(linkNode, {
            transform: `translate(${linkX} ${y})`,
            'data-href': topic.topic.href ?? '',
        });
        if (href) {
            linkNode.setAttribute('href', href);
            linkNode.setAttribute('target', '_blank');
            linkNode.setAttribute('rel', 'noopener noreferrer');
            linkNode.setAttribute('cursor', 'pointer');
        }
        linkNode.classList.add('xmind-topic-link');
        if (!href) {
            linkNode.classList.add('is-disabled');
        }

        const circle = createSvgElement(ownerDocument, 'circle');
        setAttributes(circle, {
            cx: 0,
            cy: 0,
            r: TOPIC_MARKER_SIZE / 2,
            fill: href ? topic.resolvedStyle.branchColor : '#8c959f',
        });
        linkNode.appendChild(circle);

        const chain = createSvgElement(ownerDocument, 'path');
        setAttributes(chain, {
            d: 'M -4 1 C -6 1 -6 -3 -4 -3 L -1 -3 M 1 -3 L 4 -3 C 6 -3 6 1 4 1 L 1 1 M -2 -1 L 2 -1',
            fill: 'none',
            stroke: '#ffffff',
            'stroke-width': 1.4,
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
        });
        linkNode.appendChild(chain);
        node.appendChild(linkNode);
    }

    if (!topic.noteText) {
        return;
    }

    const noteX = nextIconX();
    const note = createSvgElement(ownerDocument, 'g');
    setAttributes(note, {
        transform: `translate(${noteX} ${y})`,
        'data-note': topic.noteText,
    });
    note.classList.add('xmind-topic-note');

    const title = createSvgElement(ownerDocument, 'title');
    title.textContent = topic.noteText;
    note.appendChild(title);

    const circle = createSvgElement(ownerDocument, 'circle');
    setAttributes(circle, {
        cx: 0,
        cy: 0,
        r: TOPIC_MARKER_SIZE / 2,
        fill: '#f2a33a',
    });
    note.appendChild(circle);

    const page = createSvgElement(ownerDocument, 'path');
    setAttributes(page, {
        d: 'M -3.8 -4.4 H 2 L 4  -2.2 V 4.4 H -3.8 Z M 2 -4.4 V -2.2 H 4 M -2 0 H 2 M -2 2.2 H 1.2',
        fill: 'none',
        stroke: '#ffffff',
        'stroke-width': 1.2,
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
    });
    note.appendChild(page);
    node.appendChild(note);
}

function appendTopicLabels(
    ownerDocument: Document,
    node: SVGGElement,
    topic: MindMapLayoutTopic
): void {
    for (const label of topic.labels) {
        const group = createSvgElement(ownerDocument, 'g');
        setAttributes(group, {
            transform: `translate(${label.x} ${label.y})`,
        });
        group.classList.add('xmind-topic-label');

        const rect = createSvgElement(ownerDocument, 'rect');
        setAttributes(rect, {
            x: -label.width / 2,
            y: -TOPIC_LABEL_HEIGHT / 2,
            width: label.width,
            height: TOPIC_LABEL_HEIGHT,
            rx: TOPIC_LABEL_HEIGHT / 2,
            fill: '#f2f4f7',
            stroke: '#d0d7de',
            'stroke-width': 1,
        });
        group.appendChild(rect);

        const text = createSvgElement(ownerDocument, 'text');
        setAttributes(text, {
            x: 0,
            y: 4,
            'text-anchor': 'middle',
            fill: '#57606a',
            'font-size': 11,
            'font-weight': 500,
            'font-family':
                '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        });
        text.textContent = label.text;
        group.appendChild(text);
        node.appendChild(group);
    }
}

function appendTopicImage(
    ownerDocument: Document,
    node: SVGGElement,
    topic: MindMapLayoutTopic
): void {
    if (!topic.image) {
        return;
    }

    const image = createSvgElement(ownerDocument, 'image');
    setAttributes(image, {
        x: topic.image.x - topic.image.width / 2,
        y: topic.image.y - topic.image.height / 2,
        width: topic.image.width,
        height: topic.image.height,
        preserveAspectRatio: 'xMidYMid meet',
    });
    image.setAttribute('href', topic.image.dataUrl);
    image.classList.add('xmind-topic-image');
    node.appendChild(image);
}

function appendTopicSelection(
    ownerDocument: Document,
    node: SVGGElement,
    topic: MindMapLayoutTopic
): void {
    const selection = createSvgElement(ownerDocument, 'rect');
    setAttributes(selection, {
        x: -topic.width / 2 - TOPIC_SELECTION_OUTSET,
        y: -topic.height / 2 - TOPIC_SELECTION_OUTSET,
        width: topic.width + TOPIC_SELECTION_OUTSET * 2,
        height: topic.height + TOPIC_SELECTION_OUTSET * 2,
        rx: Math.min(12, topic.height / 2 + TOPIC_SELECTION_OUTSET),
        fill: 'none',
        stroke: '#66c7ff',
        'stroke-width': 3,
    });
    selection.classList.add('xmind-topic-selection');
    node.appendChild(selection);
}

function toggleControlLabel(
    topic: MindMapLayoutTopic,
    locale: XMindLocale
): string {
    if (topic.toggleControlKind === 'collapse') {
        return translateXMind(locale, 'collapseTopic', {
            title: topic.topic.title,
        });
    }

    return translateXMind(locale, 'expandTopicHiddenChildren', {
        title: topic.topic.title,
        count: topic.hiddenDescendantCount,
    });
}

function toggleControlText(topic: MindMapLayoutTopic): string {
    if (topic.toggleControlKind === 'collapse') {
        return '-';
    }

    if (topic.toggleControlKind === 'ellipsis') {
        return '...';
    }

    return topic.hiddenDescendantCount > 999
        ? '...'
        : String(topic.hiddenDescendantCount);
}

function toggleControlClassName(topic: MindMapLayoutTopic): string {
    if (topic.toggleControlKind === 'count') {
        return 'is-count';
    }

    if (topic.toggleControlKind === 'ellipsis') {
        return 'is-ellipsis';
    }

    return 'is-collapse';
}

function appendToggleControl(
    ownerDocument: Document,
    node: SVGGElement,
    topic: MindMapLayoutTopic,
    locale: XMindLocale,
    onToggleTopic?: (topicId: string, isExpanded: boolean) => void
): void {
    if (!topic.canToggleChildren || !topic.toggleControlKind) {
        return;
    }

    const direction = topic.direction || 1;
    const marker = createSvgElement(ownerDocument, 'g');
    setAttributes(marker, {
        transform: `translate(${topic.toggleControlX} ${topic.toggleControlY})`,
        role: 'button',
        tabindex: 0,
        focusable: 'true',
        'aria-label': toggleControlLabel(topic, locale),
        'data-name': 'collapse-extend-hover-area',
        'data-topic-id': topic.topic.id,
    });
    marker.classList.add(
        'xmind-collapse-extend',
        toggleControlClassName(topic)
    );

    const connector = createSvgElement(ownerDocument, 'line');
    setAttributes(connector, {
        x1: -direction * 14,
        y1: 0,
        x2: -direction * 10.4,
        y2: 0,
        stroke: topic.resolvedStyle.branchColor,
        'stroke-width': 1.8,
        'stroke-linecap': 'round',
    });
    marker.appendChild(connector);

    const circle = createSvgElement(ownerDocument, 'circle');
    setAttributes(circle, {
        cx: 0,
        cy: 0,
        r: 11,
        fill: '#ffffff',
        stroke: topic.resolvedStyle.branchColor,
        'stroke-width': 1.8,
    });
    marker.appendChild(circle);

    const text = createSvgElement(ownerDocument, 'text');
    setAttributes(text, {
        x: 0,
        y: topic.toggleControlKind === 'ellipsis' ? 3 : 4,
        'text-anchor': 'middle',
        fill: topic.resolvedStyle.branchColor,
        'font-size': 10,
        'font-weight': 700,
        'font-family':
            '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    });
    text.textContent = toggleControlText(topic);
    marker.appendChild(text);

    if (onToggleTopic) {
        const toggle = (event: Event): void => {
            event.preventDefault();
            event.stopPropagation();
            onToggleTopic(topic.topic.id, topic.isExpanded);
        };
        marker.addEventListener('click', toggle);
        marker.addEventListener('keydown', (event: KeyboardEvent) => {
            if (event.key === 'Enter' || event.key === ' ') {
                toggle(event);
            }
        });
    }

    node.appendChild(marker);
}

function appendTopic(
    ownerDocument: Document,
    group: SVGGElement,
    topic: MindMapLayoutTopic,
    options: NativeMindMapRenderOptions
): SVGGElement {
    const node = createSvgElement(ownerDocument, 'g');
    setAttributes(node, {
        transform: `translate(${topic.x} ${topic.y})`,
        'data-topic-id': topic.topic.id,
        role: 'button',
        tabindex: 0,
        focusable: 'true',
        'aria-label': translateXMind(options.locale ?? 'en', 'selectTopic', {
            title: topic.topic.title,
        }),
    });
    node.classList.add('xmind-topic');
    if (options.selectedTopicId === topic.topic.id) {
        node.classList.add('is-selected');
        node.setAttribute('aria-pressed', 'true');
    } else {
        node.setAttribute('aria-pressed', 'false');
    }
    if (options.searchMatchTopicIds?.has(topic.topic.id)) {
        node.classList.add('is-search-match');
    }
    if (options.currentSearchTopicId === topic.topic.id) {
        node.classList.add('is-current-search-match');
    }
    if (topic.isExpanded) {
        node.classList.add('is-expanded');
    }
    if (topic.role === 'floatingTopic') {
        node.classList.add('is-floating-topic');
    }
    if (topic.role === 'calloutTopic') {
        node.classList.add('is-callout-topic');
    }

    appendTopicShape(ownerDocument, node, topic);
    if (options.selectedTopicId === topic.topic.id) {
        appendTopicSelection(ownerDocument, node, topic);
    }
    appendTopicMarkers(ownerDocument, node, topic);
    appendTopicImage(ownerDocument, node, topic);
    appendTopicLabels(ownerDocument, node, topic);

    const text = createSvgElement(ownerDocument, 'text');
    setAttributes(text, {
        'text-anchor': 'middle',
        fill: textFill(topic),
        'font-size': topic.resolvedStyle.fontSize,
        'font-weight': topic.resolvedStyle.fontWeight,
        'font-style': topic.resolvedStyle.fontStyle,
        'font-family': topic.resolvedStyle.fontFamily,
    });

    for (const line of topic.lines) {
        const tspan = createSvgElement(ownerDocument, 'tspan');
        setAttributes(tspan, {
            x: line.x,
            y: line.y,
        });
        tspan.textContent = line.text;
        text.appendChild(tspan);
    }

    node.appendChild(text);
    appendToggleControl(
        ownerDocument,
        node,
        topic,
        options.locale ?? 'en',
        options.onToggleTopic
    );
    if (options.onSelectTopic) {
        const selectTopic = (event: Event): void => {
            event.preventDefault();
            event.stopPropagation();
            options.onSelectTopic?.(topic.topic.id);
        };
        node.addEventListener('click', selectTopic);
        node.addEventListener('keydown', (event: KeyboardEvent) => {
            if (event.key === 'Enter' || event.key === ' ') {
                selectTopic(event);
            }
        });
    }
    group.appendChild(node);
    return node;
}

function walkTopics(
    topic: MindMapLayoutTopic,
    visitor: (topic: MindMapLayoutTopic) => void
): void {
    visitor(topic);
    for (const child of topic.children) {
        walkTopics(child, visitor);
    }
    for (const callout of topic.callouts) {
        walkTopics(callout, visitor);
    }
}

function walkLayoutTopics(
    layout: MindMapLayout,
    visitor: (topic: MindMapLayoutTopic) => void
): void {
    walkTopics(layout.root, visitor);
    for (const floatingTopic of layout.floatingTopics) {
        walkTopics(floatingTopic, visitor);
    }
}

export function renderNativeMindMap(
    container: HTMLElement,
    sheet: XMindDocumentSheet,
    options: NativeMindMapRenderOptions = {}
): NativeMindMapView {
    const ownerDocument = container.ownerDocument;
    const layout = layoutMindMap(sheet, {
        expandedTopicIds: options.expandedTopicIds,
        collapsedTopicIds: options.collapsedTopicIds,
        locale: options.locale,
    });
    const styleResolver = createXMindStyleResolver(sheet);
    const svg = createSvgElement(ownerDocument, 'svg');
    const background = createSvgElement(ownerDocument, 'rect');
    const defs = createSvgElement(ownerDocument, 'defs');
    const viewport = createSvgElement(ownerDocument, 'g');
    const connectorGroup = createSvgElement(ownerDocument, 'g');
    const objectGroup = createSvgElement(ownerDocument, 'g');
    const relationshipGroup = createSvgElement(ownerDocument, 'g');
    const topicGroup = createSvgElement(ownerDocument, 'g');
    const topicNodesById = new Map<string, SVGGElement>();
    const topicsById = collectVisibleTopicMap(layout);

    setAttributes(svg, {
        width: '100%',
        height: '100%',
        role: 'img',
        'aria-label': sheet.title,
    });
    svg.classList.add('xmind-native-svg');
    setAttributes(background, {
        x: 0,
        y: 0,
        width: '100%',
        height: '100%',
        fill: styleResolver.map.backgroundFill,
    });

    walkLayoutTopics(layout, (topic) => {
        topicNodesById.set(
            topic.topic.id,
            appendTopic(ownerDocument, topicGroup, topic, options)
        );
        appendTopicObjects(ownerDocument, objectGroup, topic, styleResolver);
    });
    walkLayoutTopics(layout, (topic) => {
        for (const child of topic.children) {
            appendConnector(
                ownerDocument,
                connectorGroup,
                topic,
                child,
                topicNodesById
            );
        }
        for (const callout of topic.callouts) {
            appendCalloutConnector(ownerDocument, connectorGroup, topic, callout);
        }
    });
    sheet.relationships.forEach((relationship, index) =>
        appendRelationship(
            ownerDocument,
            defs,
            relationshipGroup,
            relationship,
            index,
            topicsById,
            styleResolver
        )
    );

    svg.appendChild(background);
    svg.appendChild(defs);
    viewport.appendChild(connectorGroup);
    viewport.appendChild(objectGroup);
    viewport.appendChild(relationshipGroup);
    viewport.appendChild(topicGroup);
    svg.appendChild(viewport);
    container.replaceChildren(svg);

    return {
        bounds: layout.bounds,
        getTopicBounds(topicId): MindMapBounds | null {
            const topic = topicsById.get(topicId);
            return topic ? topicNodeBounds(topic) : null;
        },
        setTransform(
            scale,
            viewportWidth,
            viewportHeight,
            panOffsetX,
            panOffsetY
        ): void {
            const centerX = (layout.bounds.minX + layout.bounds.maxX) / 2;
            const centerY = (layout.bounds.minY + layout.bounds.maxY) / 2;
            const offsetX = viewportWidth / 2 - centerX * scale + panOffsetX;
            const offsetY = viewportHeight / 2 - centerY * scale + panOffsetY;
            viewport.setAttribute(
                'transform',
                `translate(${offsetX} ${offsetY}) scale(${scale})`
            );
        },
        destroy(): void {
            svg.remove();
        },
    };
}
