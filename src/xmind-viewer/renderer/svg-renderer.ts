import { XMindDocumentSheet } from '../xmind-document';
import { layoutMindMap, MindMapBounds, MindMapLayoutTopic } from './layout';

export interface NativeMindMapView {
    bounds: MindMapBounds;
    setTransform: (
        scale: number,
        viewportWidth: number,
        viewportHeight: number
    ) => void;
    destroy: () => void;
}

export interface NativeMindMapRenderOptions {
    expandedTopicIds?: ReadonlySet<string>;
    onToggleTopic?: (topicId: string) => void;
}

const SVG_NS = 'http://www.w3.org/2000/svg';
const BRANCH_COLORS = ['#ff4d5a', '#ff884d', '#8b6fef', '#00a88f'];
const BRANCH_LIGHT_COLORS = ['#ffe0e2', '#ffe9dc', '#ebe7ff', '#dff7f1'];
const ROOT_STROKE = '#62c7ff';
const TEXT_DARK = '#1f2328';

function createSvgElement<K extends keyof SVGElementTagNameMap>(
    ownerDocument: Document,
    tagName: K
): SVGElementTagNameMap[K] {
    return ownerDocument.createElementNS(SVG_NS, tagName);
}

function setAttributes(
    element: Element,
    attributes: Record<string, string | number>
): void {
    for (const name in attributes) {
        element.setAttribute(name, String(attributes[name]));
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
    child: MindMapLayoutTopic
): void {
    const path = createSvgElement(ownerDocument, 'path');
    setAttributes(path, {
        d: pathBetween(parent, child),
        fill: 'none',
        stroke: branchColor(child),
        'stroke-width': child.depth === 1 ? 3 : 2,
        'stroke-linecap': 'round',
    });
    group.appendChild(path);
}

function branchColor(topic: MindMapLayoutTopic): string {
    return BRANCH_COLORS[Math.abs(topic.branchIndex) % BRANCH_COLORS.length];
}

function branchLightColor(topic: MindMapLayoutTopic): string {
    return BRANCH_LIGHT_COLORS[
        Math.abs(topic.branchIndex) % BRANCH_LIGHT_COLORS.length
    ];
}

function nodeFill(topic: MindMapLayoutTopic): string {
    if (topic.depth === 0) {
        return '#ffffff';
    }

    if (topic.depth === 1) {
        return branchColor(topic);
    }

    return branchLightColor(topic);
}

function nodeStroke(topic: MindMapLayoutTopic): string {
    if (topic.depth === 0) {
        return ROOT_STROKE;
    }

    return topic.depth === 1 ? branchColor(topic) : branchLightColor(topic);
}

function textFill(topic: MindMapLayoutTopic): string {
    if (topic.depth === 1) {
        return '#ffffff';
    }

    return TEXT_DARK;
}

function toggleControlLabel(topic: MindMapLayoutTopic): string {
    if (topic.isExpanded) {
        return `折叠 ${topic.topic.title}`;
    }

    return `展开 ${topic.topic.title} 的 ${topic.hiddenDescendantCount} 个隐藏子节点`;
}

function appendToggleControl(
    ownerDocument: Document,
    node: SVGGElement,
    topic: MindMapLayoutTopic,
    onToggleTopic?: (topicId: string) => void
): void {
    if (
        !topic.canToggleChildren ||
        (!topic.isExpanded && topic.hiddenDescendantCount <= 0)
    ) {
        return;
    }

    const direction = topic.direction || 1;
    const marker = createSvgElement(ownerDocument, 'g');
    const x = direction * (topic.width / 2 + 14);
    const y = -topic.height / 2 + 4;
    setAttributes(marker, {
        transform: `translate(${x} ${y})`,
        role: 'button',
        tabindex: 0,
        focusable: 'true',
        'aria-label': toggleControlLabel(topic),
        'data-name': 'collapse-extend-hover-area',
        'data-topic-id': topic.topic.id,
    });
    marker.classList.add('xmind-collapse-extend');

    const circle = createSvgElement(ownerDocument, 'circle');
    setAttributes(circle, {
        cx: 0,
        cy: 0,
        r: 10,
        fill: '#ffffff',
        stroke: branchColor(topic),
        'stroke-width': 1.8,
    });
    marker.appendChild(circle);

    const text = createSvgElement(ownerDocument, 'text');
    setAttributes(text, {
        x: 0,
        y: 4,
        'text-anchor': 'middle',
        fill: branchColor(topic),
        'font-size': 10,
        'font-weight': 700,
        'font-family':
            '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    });
    text.textContent = topic.isExpanded
        ? '-'
        : topic.hiddenDescendantCount > 99
          ? '99+'
          : String(topic.hiddenDescendantCount);
    marker.appendChild(text);

    if (onToggleTopic) {
        const toggle = (event: Event): void => {
            event.preventDefault();
            event.stopPropagation();
            onToggleTopic(topic.topic.id);
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
    onToggleTopic?: (topicId: string) => void
): void {
    const node = createSvgElement(ownerDocument, 'g');
    setAttributes(node, {
        transform: `translate(${topic.x} ${topic.y})`,
    });

    const rect = createSvgElement(ownerDocument, 'rect');
    setAttributes(rect, {
        x: -topic.width / 2,
        y: -topic.height / 2,
        width: topic.width,
        height: topic.height,
        rx: topic.depth === 0 ? 7 : 6,
        fill: nodeFill(topic),
        stroke: nodeStroke(topic),
        'stroke-width': topic.depth === 0 ? 3 : topic.depth === 1 ? 0 : 0,
    });
    node.appendChild(rect);

    const text = createSvgElement(ownerDocument, 'text');
    setAttributes(text, {
        'text-anchor': 'middle',
        fill: textFill(topic),
        'font-size': topic.depth === 0 ? 28 : 16,
        'font-weight': topic.depth <= 1 ? 700 : 500,
        'font-family':
            '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
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
    appendToggleControl(ownerDocument, node, topic, onToggleTopic);
    group.appendChild(node);
}

function walkTopics(
    topic: MindMapLayoutTopic,
    visitor: (topic: MindMapLayoutTopic) => void
): void {
    visitor(topic);
    for (const child of topic.children) {
        walkTopics(child, visitor);
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
    });
    const svg = createSvgElement(ownerDocument, 'svg');
    const viewport = createSvgElement(ownerDocument, 'g');
    const connectorGroup = createSvgElement(ownerDocument, 'g');
    const topicGroup = createSvgElement(ownerDocument, 'g');

    setAttributes(svg, {
        width: '100%',
        height: '100%',
        role: 'img',
        'aria-label': sheet.title,
    });
    svg.classList.add('xmind-native-svg');

    walkTopics(layout.root, (topic) => {
        for (const child of topic.children) {
            appendConnector(ownerDocument, connectorGroup, topic, child);
        }
    });
    walkTopics(layout.root, (topic) =>
        appendTopic(ownerDocument, topicGroup, topic, options.onToggleTopic)
    );

    viewport.appendChild(connectorGroup);
    viewport.appendChild(topicGroup);
    svg.appendChild(viewport);
    container.replaceChildren(svg);

    return {
        bounds: layout.bounds,
        setTransform(scale, viewportWidth, viewportHeight): void {
            const centerX = (layout.bounds.minX + layout.bounds.maxX) / 2;
            const centerY = (layout.bounds.minY + layout.bounds.maxY) / 2;
            const offsetX = viewportWidth / 2 - centerX * scale;
            const offsetY = viewportHeight / 2 - centerY * scale;
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
