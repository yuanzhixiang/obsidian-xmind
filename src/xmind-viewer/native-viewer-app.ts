import {
    parseXMindDocument,
    XMindDocument,
    XMindDocumentSheet,
} from './xmind-document';
import {
    renderNativeMindMap,
    NativeMindMapView,
} from './renderer/svg-renderer';

type ViewerCommandName = 'open-file' | 'fit-map' | 'zoom' | 'switch-sheet';
type ViewerEventName =
    | 'map-ready'
    | 'sheets-load'
    | 'sheet-switch'
    | 'zoom-change';

const MIN_ZOOM = 0.2;
const MAX_ZOOM = 2.5;
const DEFAULT_ZOOM = 1;
const FIT_PADDING = 96;

interface SetupChannelPayload {
    port: MessagePort;
}

function clamp(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, value));
}

function isSetupChannelPayload(value: unknown): value is SetupChannelPayload {
    return (
        typeof value === 'object' &&
        value !== null &&
        'port' in value &&
        value.port instanceof MessagePort
    );
}

class NativeXMindViewerApp {
    private readonly root = document.createElement('div');
    private readonly canvas = document.createElement('div');
    private readonly status = document.createElement('div');
    private readonly zoomLabel = document.createElement('span');
    private readonly sheetLabel = document.createElement('span');
    private port: MessagePort | null = null;
    private documentModel: XMindDocument | null = null;
    private activeSheet: XMindDocumentSheet | null = null;
    private view: NativeMindMapView | null = null;
    private zoom = DEFAULT_ZOOM;
    private fitMode = true;

    constructor() {
        this.installStyles();
        this.mount();
        this.bindHostChannel();
        this.bindResize();
    }

    private installStyles(): void {
        const style = document.createElement('style');
        style.textContent = `
html,
body {
    width: 100%;
    height: 100%;
    margin: 0;
    overflow: hidden;
    background: #ffffff;
}
.xmind-native-viewer {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #ffffff;
    color: #1f2328;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}
.xmind-native-canvas {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.xmind-native-status {
    position: absolute;
    left: 20px;
    top: 18px;
    max-width: min(520px, calc(100% - 40px));
    color: #5d6773;
    font-size: 13px;
    pointer-events: none;
}
.xmind-native-toolbar {
    position: absolute;
    right: 18px;
    bottom: 18px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px;
    border: 1px solid rgba(31, 35, 40, 0.12);
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.94);
    box-shadow: 0 10px 30px rgba(31, 35, 40, 0.12);
    backdrop-filter: blur(8px);
}
.xmind-native-toolbar button {
    min-width: 34px;
    height: 30px;
    border: 1px solid rgba(31, 35, 40, 0.14);
    border-radius: 7px;
    background: #ffffff;
    color: #1f2328;
    font: inherit;
    font-size: 13px;
    cursor: pointer;
}
.xmind-native-toolbar button:hover {
    background: #f6f8fa;
}
.xmind-native-toolbar span {
    min-width: 48px;
    text-align: center;
    font-size: 13px;
    font-weight: 650;
}
.xmind-native-sheet {
    position: absolute;
    left: 18px;
    bottom: 18px;
    max-width: min(420px, calc(100% - 220px));
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 7px 14px;
    border-radius: 999px;
    background: #e9ecef;
    color: #1f2328;
    font-size: 13px;
    font-weight: 650;
}
.xmind-native-error {
    display: grid;
    place-items: center;
    height: 100%;
    padding: 32px;
    color: #b42318;
    text-align: center;
    box-sizing: border-box;
}
`;
        document.head.appendChild(style);
    }

    private mount(): void {
        this.root.className = 'xmind-native-viewer';
        this.canvas.className = 'xmind-native-canvas';
        this.status.className = 'xmind-native-status';
        this.sheetLabel.className = 'xmind-native-sheet';
        this.status.textContent = '等待 XMind 文件';
        this.sheetLabel.textContent = '';

        const toolbar = document.createElement('div');
        toolbar.className = 'xmind-native-toolbar';
        toolbar.append(
            this.createToolbarButton('-', () => this.setZoom(this.zoom * 0.9)),
            this.zoomLabel,
            this.createToolbarButton('+', () => this.setZoom(this.zoom * 1.1)),
            this.createToolbarButton('适配', () => this.fitMap())
        );

        this.root.append(this.canvas, this.status, this.sheetLabel, toolbar);
        document.body.replaceChildren(this.root);
        this.updateZoomLabel();
    }

    private createToolbarButton(
        label: string,
        onClick: () => void
    ): HTMLButtonElement {
        const button = document.createElement('button');
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

    private bindHostChannel(): void {
        window.addEventListener('message', (event) => {
            const [command, payload] = Array.isArray(event.data)
                ? event.data
                : [];
            if (
                command !== 'setup-channel' ||
                !isSetupChannelPayload(payload)
            ) {
                return;
            }

            this.port?.close();
            this.port = payload.port;
            this.port.addEventListener('message', (messageEvent) => {
                void this.handleCommand(messageEvent.data);
            });
            this.port.start();
            this.port.postMessage(['channel-ready']);
        });
    }

    private bindResize(): void {
        window.addEventListener('resize', () => {
            if (this.fitMode) {
                this.fitMap();
                return;
            }
            this.applyTransform();
        });
    }

    private async handleCommand(data: unknown): Promise<void> {
        const [command, payload, replyEvent] = Array.isArray(data) ? data : [];
        if (typeof command !== 'string') {
            return;
        }

        try {
            await this.runCommand(command, payload);
            if (typeof replyEvent === 'string') {
                this.port?.postMessage([replyEvent, true]);
            }
        } catch (error) {
            this.showError(error);
            if (typeof replyEvent === 'string') {
                this.port?.postMessage([replyEvent, false]);
            }
        }
    }

    private async runCommand(command: string, payload: unknown): Promise<void> {
        switch (command as ViewerCommandName) {
            case 'open-file':
                if (!(payload instanceof ArrayBuffer)) {
                    throw new Error('open-file 需要 ArrayBuffer');
                }
                await this.openFile(payload);
                return;
            case 'fit-map':
                this.fitMap();
                return;
            case 'zoom':
                this.setZoom(Number(payload) / 100);
                return;
            case 'switch-sheet':
                this.switchSheet(String(payload || ''));
                return;
            default:
                throw new Error(`未知 viewer 命令：${command}`);
        }
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
        this.switchSheet(this.documentModel.sheets[0].id);
        this.emit('map-ready', true);
    }

    private switchSheet(sheetId: string): void {
        const sheet = this.documentModel?.sheets.find(
            (item) => item.id === sheetId
        );
        if (!sheet) {
            throw new Error(`找不到 sheet：${sheetId}`);
        }

        this.activeSheet = sheet;
        this.status.textContent = '';
        this.sheetLabel.textContent = sheet.title;
        this.view?.destroy();
        this.view = renderNativeMindMap(this.canvas, sheet);
        this.fitMap();
        this.emit('sheet-switch', sheet.id);
    }

    private fitMap(): void {
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
        this.zoom = clamp(
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
        this.zoom = clamp(scale, MIN_ZOOM, MAX_ZOOM);
        this.applyTransform();
        this.emitZoomChange();
    }

    private applyTransform(): void {
        this.view?.setTransform(
            this.zoom,
            this.canvas.clientWidth,
            this.canvas.clientHeight
        );
        this.updateZoomLabel();
    }

    private updateZoomLabel(): void {
        this.zoomLabel.textContent = `${Math.round(this.zoom * 100)}%`;
    }

    private emitZoomChange(): void {
        this.emit('zoom-change', Math.round(this.zoom * 100));
    }

    private emit(name: ViewerEventName, payload: unknown): void {
        this.port?.postMessage(['event', name, payload]);
    }

    private showError(error: unknown): void {
        const message = error instanceof Error ? error.message : String(error);
        this.status.textContent = '';
        this.canvas.innerHTML = `<div class="xmind-native-error">XMind 渲染失败：${this.escapeHtml(message)}</div>`;
        this.emit('map-ready', false);
    }

    private escapeHtml(value: string): string {
        return value
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
}

new NativeXMindViewerApp();
