import { XMindViewerError } from './errors';
import {
    createReplyEvent,
    isChannelReadyMessage,
    isCommandReply,
    parseViewerEvent,
    SETUP_CHANNEL_COMMAND,
    ViewerCommand,
    ViewerEvent,
} from './viewer-events';

export interface XMindIframeBridgeOptions {
    el: HTMLElement;
    viewerUrl: string;
    styles?: Partial<CSSStyleDeclaration>;
    setupTimeoutMs?: number;
    replyTimeoutMs?: number;
    handshakeRetryMs?: number;
    onViewerEvent?: (event: ViewerEvent) => void;
}

interface ChannelAttempt {
    port: MessagePort;
    handleReady: (event: MessageEvent) => void;
}

export class XMindIframeBridge {
    private readonly iframe: HTMLIFrameElement;
    private readonly ready: Promise<void>;
    private port: MessagePort | null = null;
    private replyIndex = 0;
    private destroyed = false;
    private readonly handleViewerPortMessage = (event: MessageEvent): void => {
        const viewerEvent = parseViewerEvent(event.data);
        if (viewerEvent) {
            this.options.onViewerEvent?.(viewerEvent);
        }
    };

    constructor(private readonly options: XMindIframeBridgeOptions) {
        this.iframe = this.createIframe();
        this.ready = this.setupChannel();

        options.el.replaceChildren(this.iframe);
        this.iframe.src = this.createViewerUrl();
    }

    destroy(): void {
        this.destroyed = true;
        this.port?.removeEventListener('message', this.handleViewerPortMessage);
        this.port?.close();
        this.port = null;
        this.iframe.remove();
    }

    async emit(command: ViewerCommand, payload?: unknown): Promise<unknown> {
        await this.ready;
        const port = this.port;
        if (!port || this.destroyed) {
            return;
        }

        const replyEvent = createReplyEvent(this.replyIndex++);
        return new Promise((resolve, reject) => {
            let timeout = 0;
            const handleReply = (event: MessageEvent): void => {
                if (!isCommandReply(event.data, replyEvent)) {
                    return;
                }

                const [, replyPayload] = event.data;
                window.clearTimeout(timeout);
                port.removeEventListener('message', handleReply);
                resolve(replyPayload);
            };

            timeout = window.setTimeout((): void => {
                port.removeEventListener('message', handleReply);
                reject(new XMindViewerError(`${command} response timeout`));
            }, this.options.replyTimeoutMs ?? 30000);

            port.addEventListener('message', handleReply);
            port.postMessage([command, payload, replyEvent]);
        });
    }

    private createIframe(): HTMLIFrameElement {
        const iframe = document.createElement('iframe');
        iframe.title = 'XMind viewer';
        Object.assign(iframe.style, {
            width: '100%',
            height: '100%',
            border: 'none',
            display: 'block',
            flex: '1 1 auto',
            minHeight: '0',
            ...this.options.styles,
        });
        return iframe;
    }

    private createViewerUrl(): string {
        return this.options.viewerUrl.startsWith('blob:')
            ? this.options.viewerUrl
            : `${this.options.viewerUrl}?local=${Date.now()}`;
    }

    private setupChannel(): Promise<void> {
        return new Promise((resolve, reject) => {
            const bridge = this;
            let timeout = 0;
            let retryInterval = 0;
            const attempts: ChannelAttempt[] = [];

            function cleanup(readyPort?: MessagePort): void {
                window.clearTimeout(timeout);
                window.clearInterval(retryInterval);
                bridge.iframe.removeEventListener('load', handleLoad);
                for (const attempt of attempts) {
                    attempt.port.removeEventListener(
                        'message',
                        attempt.handleReady
                    );

                    if (attempt.port !== readyPort) {
                        attempt.port.close();
                    }
                }
            }

            function postSetupMessage(): void {
                if (bridge.destroyed || !bridge.iframe.contentWindow) {
                    cleanup();
                    reject(
                        new XMindViewerError(
                            'XMind local viewer iframe unavailable'
                        )
                    );
                    return;
                }

                const channel = new MessageChannel();
                const handleReady = (event: MessageEvent): void => {
                    if (!isChannelReadyMessage(event.data)) {
                        return;
                    }

                    cleanup(channel.port1);
                    bridge.port = channel.port1;
                    channel.port1.addEventListener(
                        'message',
                        bridge.handleViewerPortMessage
                    );
                    resolve();
                };

                attempts.push({ port: channel.port1, handleReady });
                channel.port1.start();
                channel.port1.addEventListener('message', handleReady);
                bridge.iframe.contentWindow.postMessage(
                    [SETUP_CHANNEL_COMMAND, { port: channel.port2 }],
                    '*',
                    [channel.port2]
                );
            }

            function handleLoad(): void {
                postSetupMessage();
                retryInterval = window.setInterval(
                    postSetupMessage,
                    bridge.options.handshakeRetryMs ?? 250
                );
            }

            timeout = window.setTimeout((): void => {
                cleanup();
                reject(
                    new XMindViewerError(
                        'XMind local viewer channel setup timeout'
                    )
                );
            }, bridge.options.setupTimeoutMs ?? 30000);

            bridge.iframe.addEventListener('load', handleLoad, { once: true });
        });
    }
}
