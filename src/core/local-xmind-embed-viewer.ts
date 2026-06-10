interface LocalXMindEmbedViewerOptions {
    el: HTMLElement;
    file: ArrayBuffer;
    viewerUrl: string;
    styles?: Partial<CSSStyleDeclaration>;
}

type ViewerCommand = 'open-file' | 'fit-map' | 'zoom' | 'switch-sheet';

export class LocalXMindEmbedViewer {
    private readonly iframe: HTMLIFrameElement;
    private readonly ready: Promise<void>;
    private port: MessagePort | null = null;
    private replyIndex = 0;
    private destroyed = false;

    constructor(private readonly options: LocalXMindEmbedViewerOptions) {
        this.iframe = document.createElement('iframe');
        this.iframe.title = 'XMind viewer';
        Object.assign(this.iframe.style, {
            width: '100%',
            height: '100%',
            border: 'none',
            ...options.styles,
        });

        this.ready = this.setupChannel();
        options.el.replaceChildren(this.iframe);
        this.iframe.src = `${options.viewerUrl}?local=${Date.now()}`;
        void this.openFile(options.file).catch(() => undefined);
    }

    destroy(): void {
        this.destroyed = true;
        this.port?.close();
        this.port = null;
        this.iframe.remove();
    }

    async fitMap(): Promise<void> {
        await this.emit('fit-map');
    }

    async zoom(scale: number): Promise<void> {
        await this.emit('zoom', scale);
    }

    async switchSheet(sheetId: string): Promise<void> {
        await this.emit('switch-sheet', sheetId);
    }

    private async openFile(file: ArrayBuffer): Promise<void> {
        await this.emit('open-file', file);
    }

    private setupChannel(): Promise<void> {
        return new Promise((resolve, reject) => {
            const viewer = this;
            const channel = new MessageChannel();
            let timeout = 0;

            function cleanup(): void {
                window.clearTimeout(timeout);
                viewer.iframe.removeEventListener('load', handleLoad);
                channel.port1.removeEventListener('message', handleReady);
            }

            function handleReady(event: MessageEvent): void {
                const [message] = (event.data || []) as [string];
                if (message !== 'channel-ready') {
                    return;
                }

                cleanup();
                viewer.port = channel.port1;
                resolve();
            }

            function handleLoad(): void {
                if (viewer.destroyed || !viewer.iframe.contentWindow) {
                    cleanup();
                    reject(new Error('XMind local viewer iframe unavailable'));
                    return;
                }

                channel.port1.start();
                channel.port1.addEventListener('message', handleReady);
                viewer.iframe.contentWindow.postMessage(
                    ['setup-channel', { port: channel.port2 }],
                    '*',
                    [channel.port2]
                );
            }

            timeout = window.setTimeout((): void => {
                cleanup();
                reject(new Error('XMind local viewer channel setup timeout'));
            }, 30000);

            viewer.iframe.addEventListener('load', handleLoad, { once: true });
        });
    }

    private async emit(
        command: ViewerCommand,
        payload?: unknown
    ): Promise<unknown> {
        await this.ready;
        const port = this.port;
        if (!port || this.destroyed) {
            return;
        }

        const replyEvent = `xmind-local-viewer#${this.replyIndex++}`;
        return new Promise((resolve, reject) => {
            let timeout = 0;
            const handleReply = (event: MessageEvent): void => {
                const [message, replyPayload] = (event.data || []) as [
                    string,
                    unknown,
                ];
                if (message !== replyEvent) {
                    return;
                }

                window.clearTimeout(timeout);
                port.removeEventListener('message', handleReply);
                resolve(replyPayload);
            };

            timeout = window.setTimeout((): void => {
                port.removeEventListener('message', handleReply);
                reject(new Error(`${command} response timeout`));
            }, 30000);

            port.addEventListener('message', handleReply);
            port.postMessage([command, payload, replyEvent]);
        });
    }
}
