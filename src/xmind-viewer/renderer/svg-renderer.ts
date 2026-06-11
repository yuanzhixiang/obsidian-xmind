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

const SVG_NS = 'http://www.w3.org/2000/svg';
const BRANCH_COLORS = ['#ff4d5a', '#ff884d', '#8b6fef', '#00a88f'];
const BRANCH_LIGHT_COLORS = ['#ffe0e2', '#ffe9dc', '#ebe7ff', '#dff7f1'];
const ROOT_STROKE = '#62c7ff';
const TEXT_DARK = '#1f2328';

function createSvgElement<K extends keyof SVGElementTagNameMap>(
    tagName: K
): SVGElementTagNameMap[K] {
    return document.createElementNS(SVG_NS, tagName);
}

function setAttributes(
    element: Element,
    attributes: Record<string, string | number>
): void {
    for (const [name, value] of Object.entries(attributes)) {
        element.setAttribute(name, String(value));
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
    group: SVGGElement,
    parent: MindMapLayoutTopic,
    child: MindMapLayoutTopic
): void {
    const path = createSvgElement('path');
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

function appendSummaryMarker(
    node: SVGGElement,
    topic: MindMapLayoutTopic
): void {
    if (topic.hiddenDescendantCount <= 0 || topic.depth < 2) {
        return;
    }

    const direction = topic.direction || 1;
    const marker = createSvgElement('g');
    const x = direction * (topic.width / 2 + 14);
    const y = -topic.height / 2 + 4;
    setAttributes(marker, {
        transform: `translate(${x} ${y})`,
    });

    const circle = createSvgElement('circle');
    setAttributes(circle, {
        cx: 0,
        cy: 0,
        r: 10,
        fill: '#ffffff',
        stroke: branchColor(topic),
        'stroke-width': 1.8,
    });
    marker.appendChild(circle);

    const text = createSvgElement('text');
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
    text.textContent =
        topic.hiddenDescendantCount > 99
            ? '99+'
            : String(topic.hiddenDescendantCount);
    marker.appendChild(text);
    node.appendChild(marker);
}

function appendTopic(group: SVGGElement, topic: MindMapLayoutTopic): void {
    const node = createSvgElement('g');
    setAttributes(node, {
        transform: `translate(${topic.x} ${topic.y})`,
    });

    const rect = createSvgElement('rect');
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

    const text = createSvgElement('text');
    setAttributes(text, {
        'text-anchor': 'middle',
        fill: textFill(topic),
        'font-size': topic.depth === 0 ? 28 : 16,
        'font-weight': topic.depth <= 1 ? 700 : 500,
        'font-family':
            '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    });

    for (const line of topic.lines) {
        const tspan = createSvgElement('tspan');
        setAttributes(tspan, {
            x: line.x,
            y: line.y,
        });
        tspan.textContent = line.text;
        text.appendChild(tspan);
    }

    node.appendChild(text);
    appendSummaryMarker(node, topic);
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
    sheet: XMindDocumentSheet
): NativeMindMapView {
    const layout = layoutMindMap(sheet);
    const svg = createSvgElement('svg');
    const viewport = createSvgElement('g');
    const connectorGroup = createSvgElement('g');
    const topicGroup = createSvgElement('g');

    setAttributes(svg, {
        width: '100%',
        height: '100%',
        role: 'img',
        'aria-label': sheet.title,
    });

    svg.style.display = 'block';
    svg.style.width = '100%';
    svg.style.height = '100%';
    svg.style.background = '#ffffff';

    walkTopics(layout.root, (topic) => {
        for (const child of topic.children) {
            appendConnector(connectorGroup, topic, child);
        }
    });
    walkTopics(layout.root, (topic) => appendTopic(topicGroup, topic));

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
