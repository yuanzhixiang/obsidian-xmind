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
        stroke: child.direction < 0 ? '#ff8b50' : '#ff4d5a',
        'stroke-width': child.depth === 1 ? 3 : 2,
        'stroke-linecap': 'round',
    });
    group.appendChild(path);
}

function nodeFill(topic: MindMapLayoutTopic): string {
    if (topic.depth === 0) {
        return '#ffffff';
    }

    if (topic.depth === 1 && topic.direction < 0) {
        return '#ff884d';
    }

    if (topic.depth === 1) {
        return '#ff4d5a';
    }

    return '#ffffff';
}

function nodeStroke(topic: MindMapLayoutTopic): string {
    if (topic.depth === 0) {
        return '#1aa7ff';
    }

    if (topic.depth === 1 && topic.direction < 0) {
        return '#ff884d';
    }

    return '#ff4d5a';
}

function textFill(topic: MindMapLayoutTopic): string {
    return topic.depth === 1 ? '#ffffff' : '#1f2328';
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
        'stroke-width': topic.depth === 0 ? 3 : topic.depth === 1 ? 0 : 1.6,
    });
    node.appendChild(rect);

    const text = createSvgElement('text');
    setAttributes(text, {
        'text-anchor': 'middle',
        fill: textFill(topic),
        'font-size': topic.depth === 0 ? 24 : 15,
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
