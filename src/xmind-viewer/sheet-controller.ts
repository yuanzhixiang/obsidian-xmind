import { XMindViewerError } from './errors';
import { XMindIframeBridge } from './iframe-bridge';
import { XMindViewerSheet, XMindViewerStateStore } from './viewer-state';

export class XMindSheetController {
    private readonly bridge: XMindIframeBridge;
    private readonly state: XMindViewerStateStore;

    constructor(bridge: XMindIframeBridge, state: XMindViewerStateStore) {
        this.bridge = bridge;
        this.state = state;
    }

    getSheets(): XMindViewerSheet[] {
        return this.state.getSnapshot().sheets;
    }

    getActiveSheetId(): string | null {
        return this.state.getSnapshot().activeSheetId;
    }

    hasSheet(sheetId: string): boolean {
        return this.getSheets().some((sheet) => sheet.id === sheetId);
    }

    async switchSheet(sheetId: string): Promise<void> {
        if (!sheetId) {
            throw new XMindViewerError('XMind sheet id is required.');
        }

        await this.bridge.emit('switch-sheet', sheetId);
    }
}
