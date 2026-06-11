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
    private zoomScale = DEFAULT_ZOOM;
    private fitMode = true;
    private destroyed = false;

    private readonly handleResize = (): void => {
        if (this.fitMode) {
            this.fitMapSync();
            return;
        }
        this.applyTransform();
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
        void this.openFile(options.file).catch((error) =>
            this.showError(error)
        );
    }

    destroy(): void {
        this.destroyed = true;
        this.unsubscribeInitialStateListener?.();
        this.ownerWindow.removeEventListener('resize', this.handleResize);
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
        this.view?.destroy();
        this.view = renderNativeMindMap(this.canvas, sheet);
        this.fitMapSync();
        this.emit('sheet-switch', sheet.id);
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

        this.fitMode = false;
        this.zoomScale = clamp(scale, MIN_ZOOM, MAX_ZOOM);
        this.applyTransform();
        this.emitZoomChange();
    }

    private applyTransform(): void {
        this.view?.setTransform(
            this.zoomScale,
            this.canvas.clientWidth,
            this.canvas.clientHeight
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
