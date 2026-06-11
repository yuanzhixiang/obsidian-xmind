import { parseXMindDocument, XMindDocument } from './xmind-document';
import {
    renderNativeMindMap,
    NativeMindMapView,
} from './renderer/svg-renderer';
import {
    XMindViewerSheet,
    XMindViewerState,
    XMindViewerStateListener,
    XMindViewerStateStore,
} from './viewer-state';
import { ViewerEventName } from './viewer-events';

export interface XMindRenderAdapterOptions {
    el: HTMLElement;
    file: ArrayBuffer;
    onError?: (error: unknown) => void;
    onStateChange?: XMindViewerStateListener;
}

const MIN_ZOOM = 0.2;
const MAX_ZOOM = 2.5;
const DEFAULT_ZOOM = 1;
const FIT_PADDING = 96;
const WHEEL_LINE_DELTA = 16;
const WHEEL_ZOOM_SENSITIVITY = 0.004;

interface ViewportPoint {
    x: number;
    y: number;
}

interface ViewportAnchor {
    mapPoint: ViewportPoint;
    viewportPoint: ViewportPoint;
}

interface RenderSheetOptions {
    fitToView: boolean;
    preserveViewport: boolean;
}

interface RightDragState {
    pointerId: number;
    lastClientX: number;
    lastClientY: number;
}

function clamp(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, value));
}

function createElement<K extends keyof HTMLElementTagNameMap>(
    ownerDocument: Document,
    tagName: K,
    className?: string
): HTMLElementTagNameMap[K] {
    const element = ownerDocument.createElement(tagName);
    if (className) {
        element.classList.add(className);
    }

    return element;
}

function normalizeWheelDelta(
    event: WheelEvent,
    viewportWidth: number,
    viewportHeight: number
): ViewportPoint {
    if (event.deltaMode === 1) {
        return {
            x: event.deltaX * WHEEL_LINE_DELTA,
            y: event.deltaY * WHEEL_LINE_DELTA,
        };
    }

    if (event.deltaMode === 2) {
        return {
            x: event.deltaX * viewportWidth,
            y: event.deltaY * viewportHeight,
        };
    }

    return {
        x: event.deltaX,
        y: event.deltaY,
    };
}

function getCanvasPoint(
    canvas: HTMLElement,
    event: MouseEvent | PointerEvent | WheelEvent
): ViewportPoint {
    const rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
    };
}

function isZoomWheelEvent(event: WheelEvent): boolean {
    return event.ctrlKey || event.metaKey;
}

export class XMindRenderAdapter {
    private readonly state = new XMindViewerStateStore();
    private readonly ownerDocument: Document;
    private readonly ownerWindow: Window;
    private readonly root: HTMLDivElement;
    private readonly canvas: HTMLDivElement;
    private readonly status: HTMLDivElement;
    private readonly zoomLabel: HTMLSpanElement;
    private readonly sheetLabel: HTMLDivElement;
    private readonly unsubscribeInitialStateListener?: () => void;
    private documentModel: XMindDocument | null = null;
    private view: NativeMindMapView | null = null;
    private readonly expandedTopicIdsBySheet = new Map<string, Set<string>>();
    private readonly collapsedTopicIdsBySheet = new Map<string, Set<string>>();
    private zoomScale = DEFAULT_ZOOM;
    private panOffsetX = 0;
    private panOffsetY = 0;
    private fitMode = true;
    private rightDragState: RightDragState | null = null;
    private destroyed = false;

    private readonly handleResize = (): void => {
        if (this.fitMode) {
            this.fitMapSync();
            return;
        }
        this.applyTransform();
    };

    private readonly handleWheel = (event: WheelEvent): void => {
        if (!this.view) {
            return;
        }

        event.preventDefault();
        const delta = normalizeWheelDelta(
            event,
            this.canvas.clientWidth,
            this.canvas.clientHeight
        );

        if (isZoomWheelEvent(event)) {
            if (delta.y === 0) {
                return;
            }

            const point = getCanvasPoint(this.canvas, event);
            const zoomFactor = Math.exp(-delta.y * WHEEL_ZOOM_SENSITIVITY);
            this.setZoomAt(this.zoomScale * zoomFactor, point);
            return;
        }

        this.fitMode = false;
        this.panOffsetX -= delta.x;
        this.panOffsetY -= delta.y;
        this.applyTransform();
    };

    private readonly handlePointerDown = (event: PointerEvent): void => {
        if (!this.view || event.button !== 2) {
            return;
        }

        event.preventDefault();
        this.fitMode = false;
        this.rightDragState = {
            pointerId: event.pointerId,
            lastClientX: event.clientX,
            lastClientY: event.clientY,
        };
        this.canvas.classList.add('is-right-dragging');
        this.canvas.setPointerCapture(event.pointerId);
    };

    private readonly handlePointerMove = (event: PointerEvent): void => {
        if (
            !this.rightDragState ||
            this.rightDragState.pointerId !== event.pointerId
        ) {
            return;
        }

        if ((event.buttons & 2) !== 2) {
            this.endRightDrag(event.pointerId);
            return;
        }

        event.preventDefault();
        const deltaX = event.clientX - this.rightDragState.lastClientX;
        const deltaY = event.clientY - this.rightDragState.lastClientY;
        if (deltaX === 0 && deltaY === 0) {
            return;
        }

        this.rightDragState = {
            pointerId: event.pointerId,
            lastClientX: event.clientX,
            lastClientY: event.clientY,
        };
        this.panOffsetX += deltaX;
        this.panOffsetY += deltaY;
        this.applyTransform();
    };

    private readonly handlePointerUp = (event: PointerEvent): void => {
        if (this.rightDragState?.pointerId !== event.pointerId) {
            return;
        }

        event.preventDefault();
        this.endRightDrag(event.pointerId);
    };

    private readonly handleContextMenu = (event: MouseEvent): void => {
        if (!this.view) {
            return;
        }

        event.preventDefault();
    };

    constructor(private readonly options: XMindRenderAdapterOptions) {
        this.ownerDocument = options.el.ownerDocument;
        const ownerWindow = this.ownerDocument.defaultView;
        if (!ownerWindow) {
            throw new Error('XMind viewer container has no owner window.');
        }
        this.ownerWindow = ownerWindow;
        this.unsubscribeInitialStateListener = options.onStateChange
            ? this.state.subscribe(options.onStateChange)
            : undefined;

        this.root = createElement(
            this.ownerDocument,
            'div',
            'xmind-native-viewer'
        );
        this.canvas = createElement(
            this.ownerDocument,
            'div',
            'xmind-native-canvas'
        );
        this.status = createElement(
            this.ownerDocument,
            'div',
            'xmind-native-status'
        );
        this.zoomLabel = createElement(this.ownerDocument, 'span');
        this.sheetLabel = createElement(
            this.ownerDocument,
            'div',
            'xmind-native-sheet'
        );

        this.mount();
        this.ownerWindow.addEventListener('resize', this.handleResize);
        this.canvas.addEventListener('wheel', this.handleWheel, {
            passive: false,
        });
        this.canvas.addEventListener('pointerdown', this.handlePointerDown);
        this.canvas.addEventListener('pointermove', this.handlePointerMove);
        this.canvas.addEventListener('pointerup', this.handlePointerUp);
        this.canvas.addEventListener('pointercancel', this.handlePointerUp);
        this.canvas.addEventListener('lostpointercapture', this.handlePointerUp);
        this.canvas.addEventListener('contextmenu', this.handleContextMenu);
        void this.openFile(options.file).catch((error) =>
            this.showError(error)
        );
    }

    destroy(): void {
        this.destroyed = true;
        this.unsubscribeInitialStateListener?.();
        this.ownerWindow.removeEventListener('resize', this.handleResize);
        this.canvas.removeEventListener('wheel', this.handleWheel);
        this.canvas.removeEventListener('pointerdown', this.handlePointerDown);
        this.canvas.removeEventListener('pointermove', this.handlePointerMove);
        this.canvas.removeEventListener('pointerup', this.handlePointerUp);
        this.canvas.removeEventListener('pointercancel', this.handlePointerUp);
        this.canvas.removeEventListener(
            'lostpointercapture',
            this.handlePointerUp
        );
        this.canvas.removeEventListener('contextmenu', this.handleContextMenu);
        this.view?.destroy();
        this.view = null;
        this.root.remove();
    }

    getState(): XMindViewerState {
        return this.state.getSnapshot();
    }

    subscribeState(listener: XMindViewerStateListener): () => void {
        return this.state.subscribe(listener);
    }

    getSheets(): XMindViewerSheet[] {
        return this.state.getSnapshot().sheets;
    }

    getActiveSheetId(): string | null {
        return this.state.getSnapshot().activeSheetId;
    }

    getZoom(): number | null {
        return this.state.getSnapshot().zoom;
    }

    async fitMap(): Promise<void> {
        this.fitMapSync();
    }

    async zoom(scale: number): Promise<void> {
        this.setZoom(scale);
    }

    async switchSheet(sheetId: string): Promise<void> {
        this.switchSheetSync(sheetId);
    }

    private mount(): void {
        this.status.textContent = '等待 XMind 文件';
        this.sheetLabel.textContent = '';

        const toolbar = createElement(
            this.ownerDocument,
            'div',
            'xmind-native-toolbar'
        );
        toolbar.append(
            this.createToolbarButton('-', () =>
                this.setZoom(this.zoomScale * 0.9)
            ),
            this.zoomLabel,
            this.createToolbarButton('+', () =>
                this.setZoom(this.zoomScale * 1.1)
            ),
            this.createToolbarButton('适配', () => this.fitMapSync())
        );

        this.root.append(this.canvas, this.status, this.sheetLabel, toolbar);
        this.options.el.replaceChildren(this.root);
        this.updateZoomLabel();
    }

    private createToolbarButton(
        label: string,
        onClick: () => void
    ): HTMLButtonElement {
        const button = createElement(this.ownerDocument, 'button');
        button.type = 'button';
        button.textContent = label;
        button.addEventListener('click', () => {
            try {
                onClick();
            } catch (error) {
                this.showError(error);
            }
        });
        return button;
    }

    private async openFile(file: ArrayBuffer): Promise<void> {
        this.status.textContent = '正在读取 XMind 文件...';
        this.documentModel = await parseXMindDocument(file);
        this.expandedTopicIdsBySheet.clear();
        this.collapsedTopicIdsBySheet.clear();
        this.emit(
            'sheets-load',
            this.documentModel.sheets.map((sheet) => ({
                id: sheet.id,
                title: sheet.title,
            }))
        );
        this.switchSheetSync(this.documentModel.sheets[0].id);
        this.emit('map-ready', true);
    }

    private switchSheetSync(sheetId: string): void {
        const sheet = this.documentModel?.sheets.find(
            (item) => item.id === sheetId
        );
        if (!sheet) {
            throw new Error(`找不到 sheet：${sheetId}`);
        }

        this.status.textContent = '';
        this.sheetLabel.textContent = sheet.title;
        this.renderSheet(sheet, {
            fitToView: true,
            preserveViewport: false,
        });
        this.emit('sheet-switch', sheet.id);
    }

    private renderSheet(
        sheet: NonNullable<XMindDocument['sheets'][number]>,
        renderOptions: RenderSheetOptions
    ): void {
        const viewportAnchor = renderOptions.preserveViewport
            ? this.captureViewportAnchor()
            : null;
        this.view?.destroy();
        this.view = renderNativeMindMap(this.canvas, sheet, {
            expandedTopicIds: this.getExpandedTopicIds(sheet.id),
            collapsedTopicIds: this.getCollapsedTopicIds(sheet.id),
            onToggleTopic: (topicId, isExpanded): void => {
                this.toggleTopic(sheet.id, topicId, isExpanded);
            },
        });

        if (renderOptions.fitToView) {
            this.fitMapSync();
            return;
        }

        this.fitMode = false;
        if (viewportAnchor) {
            this.restoreViewportAnchor(viewportAnchor);
        }
        this.applyTransform();
    }

    private getExpandedTopicIds(sheetId: string): Set<string> {
        const existing = this.expandedTopicIdsBySheet.get(sheetId);
        if (existing) {
            return existing;
        }

        const expandedTopicIds = new Set<string>();
        this.expandedTopicIdsBySheet.set(sheetId, expandedTopicIds);
        return expandedTopicIds;
    }

    private getCollapsedTopicIds(sheetId: string): Set<string> {
        const existing = this.collapsedTopicIdsBySheet.get(sheetId);
        if (existing) {
            return existing;
        }

        const collapsedTopicIds = new Set<string>();
        this.collapsedTopicIdsBySheet.set(sheetId, collapsedTopicIds);
        return collapsedTopicIds;
    }

    private toggleTopic(
        sheetId: string,
        topicId: string,
        isExpanded: boolean
    ): void {
        const sheet = this.documentModel?.sheets.find(
            (item) => item.id === sheetId
        );
        if (!sheet || this.destroyed) {
            return;
        }

        const expandedTopicIds = this.getExpandedTopicIds(sheetId);
        const collapsedTopicIds = this.getCollapsedTopicIds(sheetId);
        if (isExpanded) {
            expandedTopicIds.delete(topicId);
            collapsedTopicIds.add(topicId);
        } else {
            expandedTopicIds.add(topicId);
            collapsedTopicIds.delete(topicId);
        }

        this.renderSheet(sheet, {
            fitToView: false,
            preserveViewport: true,
        });
    }

    private fitMapSync(): void {
        if (!this.view) {
            return;
        }

        const width = Math.max(1, this.canvas.clientWidth - FIT_PADDING);
        const height = Math.max(1, this.canvas.clientHeight - FIT_PADDING);
        const contentWidth = Math.max(
            1,
            this.view.bounds.maxX - this.view.bounds.minX
        );
        const contentHeight = Math.max(
            1,
            this.view.bounds.maxY - this.view.bounds.minY
        );
        this.fitMode = true;
        this.panOffsetX = 0;
        this.panOffsetY = 0;
        this.zoomScale = clamp(
            Math.min(width / contentWidth, height / contentHeight),
            MIN_ZOOM,
            MAX_ZOOM
        );
        this.applyTransform();
        this.emitZoomChange();
    }

    private setZoom(scale: number): void {
        if (!Number.isFinite(scale) || !this.view) {
            return;
        }

        this.setZoomAt(scale, {
            x: this.canvas.clientWidth / 2,
            y: this.canvas.clientHeight / 2,
        });
    }

    private endRightDrag(pointerId: number): void {
        if (this.rightDragState?.pointerId !== pointerId) {
            return;
        }

        this.rightDragState = null;
        this.canvas.classList.remove('is-right-dragging');
        if (this.canvas.hasPointerCapture(pointerId)) {
            this.canvas.releasePointerCapture(pointerId);
        }
    }

    private getBaseOffsetForView(
        view: NativeMindMapView,
        scale: number
    ): ViewportPoint {
        const centerX = (view.bounds.minX + view.bounds.maxX) / 2;
        const centerY = (view.bounds.minY + view.bounds.maxY) / 2;
        return {
            x: this.canvas.clientWidth / 2 - centerX * scale,
            y: this.canvas.clientHeight / 2 - centerY * scale,
        };
    }

    private getBaseOffset(scale: number): ViewportPoint | null {
        return this.view ? this.getBaseOffsetForView(this.view, scale) : null;
    }

    private captureViewportAnchor(): ViewportAnchor | null {
        if (!this.view || this.zoomScale <= 0) {
            return null;
        }

        const viewportPoint = {
            x: this.canvas.clientWidth / 2,
            y: this.canvas.clientHeight / 2,
        };
        const baseOffset = this.getBaseOffsetForView(this.view, this.zoomScale);

        return {
            viewportPoint,
            mapPoint: {
                x:
                    (viewportPoint.x - baseOffset.x - this.panOffsetX) /
                    this.zoomScale,
                y:
                    (viewportPoint.y - baseOffset.y - this.panOffsetY) /
                    this.zoomScale,
            },
        };
    }

    private restoreViewportAnchor(anchor: ViewportAnchor): void {
        const baseOffset = this.getBaseOffset(this.zoomScale);
        if (!baseOffset) {
            return;
        }

        this.panOffsetX =
            anchor.viewportPoint.x -
            baseOffset.x -
            anchor.mapPoint.x * this.zoomScale;
        this.panOffsetY =
            anchor.viewportPoint.y -
            baseOffset.y -
            anchor.mapPoint.y * this.zoomScale;
    }

    private setZoomAt(scale: number, viewportPoint: ViewportPoint): void {
        if (!Number.isFinite(scale) || !this.view) {
            return;
        }

        const nextScale = clamp(scale, MIN_ZOOM, MAX_ZOOM);
        const previousBaseOffset = this.getBaseOffset(this.zoomScale);
        const nextBaseOffset = this.getBaseOffset(nextScale);
        if (!previousBaseOffset || !nextBaseOffset) {
            return;
        }

        const focusX =
            (viewportPoint.x - previousBaseOffset.x - this.panOffsetX) /
            this.zoomScale;
        const focusY =
            (viewportPoint.y - previousBaseOffset.y - this.panOffsetY) /
            this.zoomScale;

        this.fitMode = false;
        this.zoomScale = nextScale;
        this.panOffsetX =
            viewportPoint.x - nextBaseOffset.x - focusX * nextScale;
        this.panOffsetY =
            viewportPoint.y - nextBaseOffset.y - focusY * nextScale;
        this.applyTransform();
        this.emitZoomChange();
    }

    private applyTransform(): void {
        this.view?.setTransform(
            this.zoomScale,
            this.canvas.clientWidth,
            this.canvas.clientHeight,
            this.panOffsetX,
            this.panOffsetY
        );
        this.updateZoomLabel();
    }

    private updateZoomLabel(): void {
        this.zoomLabel.textContent = `${Math.round(this.zoomScale * 100)}%`;
    }

    private emitZoomChange(): void {
        this.emit('zoom-change', Math.round(this.zoomScale * 100));
    }

    private emit(name: ViewerEventName, payload: unknown): void {
        this.state.applyEvent({ name, payload });
    }

    private showError(error: unknown): void {
        if (this.destroyed) {
            return;
        }

        const message = error instanceof Error ? error.message : String(error);
        this.status.textContent = '';
        const errorEl = createElement(
            this.ownerDocument,
            'div',
            'xmind-native-error'
        );
        errorEl.textContent = `XMind 渲染失败：${message}`;
        this.canvas.replaceChildren(errorEl);
        this.emit('map-ready', false);
        this.options.onError?.(error);
    }
}
