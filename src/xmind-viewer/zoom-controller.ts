import { XMindViewerError } from './errors';
import { XMindIframeBridge } from './iframe-bridge';
import { XMindViewerStateStore } from './viewer-state';

export class XMindZoomController {
    private readonly bridge: XMindIframeBridge;
    private readonly state: XMindViewerStateStore;

    constructor(bridge: XMindIframeBridge, state: XMindViewerStateStore) {
        this.bridge = bridge;
        this.state = state;
    }

    getZoom(): number | null {
        return this.state.getSnapshot().zoom;
    }

    async fitMap(): Promise<void> {
        await this.bridge.emit('fit-map');
    }

    async setZoom(scale: number): Promise<void> {
        if (!Number.isFinite(scale)) {
            throw new XMindViewerError('XMind zoom scale must be a number.');
        }

        await this.bridge.emit('zoom', scale);
    }
}
