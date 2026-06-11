export type ViewerEventName =
    | 'map-ready'
    | 'sheets-load'
    | 'sheet-switch'
    | 'zoom-change';

export interface ViewerEvent {
    name: ViewerEventName;
    payload: unknown;
}

export function isViewerEventName(value: unknown): value is ViewerEventName {
    return (
        value === 'map-ready' ||
        value === 'sheets-load' ||
        value === 'sheet-switch' ||
        value === 'zoom-change'
    );
}
