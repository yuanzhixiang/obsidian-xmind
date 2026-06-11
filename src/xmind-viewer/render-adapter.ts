import { XMindIframeBridge } from './iframe-bridge';
import { XMindSheetController } from './sheet-controller';
import {
    XMindViewerSheet,
    XMindViewerState,
    XMindViewerStateListener,
    XMindViewerStateStore,
} from './viewer-state';
import { XMindZoomController } from './zoom-controller';

export interface XMindRenderAdapterOptions {
    el: HTMLElement;
    file: ArrayBuffer;
    viewerUrl: string;
    styles?: Partial<CSSStyleDeclaration>;
    onError?: (error: unknown) => void;
    onStateChange?: XMindViewerStateListener;
}

export class XMindRenderAdapter {
    private readonly state = new XMindViewerStateStore();
    private readonly bridge: XMindIframeBridge;
    private readonly sheetController: XMindSheetController;
    private readonly zoomController: XMindZoomController;
    private readonly unsubscribeInitialStateListener?: () => void;

    constructor(private readonly options: XMindRenderAdapterOptions) {
        this.unsubscribeInitialStateListener = options.onStateChange
            ? this.state.subscribe(options.onStateChange)
            : undefined;
        this.bridge = new XMindIframeBridge({
            el: options.el,
            viewerUrl: options.viewerUrl,
            styles: options.styles,
            onViewerEvent: (event): void => {
                this.state.applyEvent(event);
            },
        });
        this.sheetController = new XMindSheetController(
            this.bridge,
            this.state
        );
        this.zoomController = new XMindZoomController(this.bridge, this.state);

        void this.openFile(options.file).catch((error) => {
            options.onError?.(error);
        });
    }

    destroy(): void {
        this.unsubscribeInitialStateListener?.();
        this.bridge.destroy();
    }

    getState(): XMindViewerState {
        return this.state.getSnapshot();
    }

    subscribeState(listener: XMindViewerStateListener): () => void {
        return this.state.subscribe(listener);
    }

    getSheets(): XMindViewerSheet[] {
        return this.sheetController.getSheets();
    }

    getActiveSheetId(): string | null {
        return this.sheetController.getActiveSheetId();
    }

    getZoom(): number | null {
        return this.zoomController.getZoom();
    }

    async fitMap(): Promise<void> {
        await this.zoomController.fitMap();
    }

    async zoom(scale: number): Promise<void> {
        await this.zoomController.setZoom(scale);
    }

    async switchSheet(sheetId: string): Promise<void> {
        await this.sheetController.switchSheet(sheetId);
    }

    private async openFile(file: ArrayBuffer): Promise<void> {
        await this.bridge.emit('open-file', file);
    }
}
