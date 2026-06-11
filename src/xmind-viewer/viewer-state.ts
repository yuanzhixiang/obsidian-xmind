import { ViewerEvent } from './viewer-events';

export interface XMindViewerSheet {
    id: string;
    title: string;
}

export interface XMindViewerState {
    isReady: boolean;
    sheets: XMindViewerSheet[];
    activeSheetId: string | null;
    zoom: number | null;
}

export type XMindViewerStateListener = (
    state: XMindViewerState,
    event: ViewerEvent
) => void;

function createInitialState(): XMindViewerState {
    return {
        isReady: false,
        sheets: [],
        activeSheetId: null,
        zoom: null,
    };
}

function cloneState(state: XMindViewerState): XMindViewerState {
    return {
        ...state,
        sheets: state.sheets.map((sheet) => ({ ...sheet })),
    };
}

function normalizeSheets(payload: unknown): XMindViewerSheet[] {
    if (!Array.isArray(payload)) {
        return [];
    }

    return payload
        .map((sheet): XMindViewerSheet | null => {
            if (typeof sheet !== 'object' || sheet === null) {
                return null;
            }

            const record = sheet as Record<string, unknown>;
            const id = String(record.id ?? '');
            if (!id) {
                return null;
            }

            return {
                id,
                title: String(record.title ?? id),
            };
        })
        .filter((sheet): sheet is XMindViewerSheet => Boolean(sheet));
}

function normalizeSheetId(payload: unknown): string | null {
    const sheetId = String(payload ?? '');
    return sheetId || null;
}

function normalizeZoom(payload: unknown): number | null {
    const zoom = Number(payload);
    return Number.isFinite(zoom) ? zoom : null;
}

export class XMindViewerStateStore {
    private state = createInitialState();
    private readonly listeners = new Set<XMindViewerStateListener>();

    getSnapshot(): XMindViewerState {
        return cloneState(this.state);
    }

    subscribe(listener: XMindViewerStateListener): () => void {
        this.listeners.add(listener);

        return () => {
            this.listeners.delete(listener);
        };
    }

    applyEvent(event: ViewerEvent): void {
        const nextState = this.reduce(event);
        this.state = nextState;
        this.emit(event);
    }

    private reduce(event: ViewerEvent): XMindViewerState {
        switch (event.name) {
            case 'map-ready':
                return {
                    ...this.state,
                    isReady: event.payload === true,
                };
            case 'sheets-load':
                return {
                    ...this.state,
                    sheets: normalizeSheets(event.payload),
                };
            case 'sheet-switch':
                return {
                    ...this.state,
                    activeSheetId: normalizeSheetId(event.payload),
                };
            case 'zoom-change':
                return {
                    ...this.state,
                    zoom: normalizeZoom(event.payload),
                };
        }
    }

    private emit(event: ViewerEvent): void {
        const snapshot = this.getSnapshot();
        for (const listener of this.listeners) {
            listener(snapshot, event);
        }
    }
}
