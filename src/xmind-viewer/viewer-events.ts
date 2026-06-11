export const CHANNEL_READY_MESSAGE = 'channel-ready';
export const VIEWER_EVENT_MESSAGE = 'event';
export const SETUP_CHANNEL_COMMAND = 'setup-channel';
export const VIEWER_REPLY_PREFIX = 'xmind-local-viewer';

export type ViewerCommand = 'open-file' | 'fit-map' | 'zoom' | 'switch-sheet';
export type ViewerEventName =
    | 'map-ready'
    | 'sheets-load'
    | 'sheet-switch'
    | 'zoom-change';

export interface ViewerEvent {
    name: ViewerEventName;
    payload: unknown;
}

export function createReplyEvent(replyIndex: number): string {
    return `${VIEWER_REPLY_PREFIX}#${replyIndex}`;
}

export function isChannelReadyMessage(data: unknown): boolean {
    return Array.isArray(data) && data[0] === CHANNEL_READY_MESSAGE;
}

export function isCommandReply(
    data: unknown,
    replyEvent: string
): data is [string, unknown] {
    return Array.isArray(data) && data[0] === replyEvent;
}

export function isViewerEventName(value: unknown): value is ViewerEventName {
    return (
        value === 'map-ready' ||
        value === 'sheets-load' ||
        value === 'sheet-switch' ||
        value === 'zoom-change'
    );
}

export function parseViewerEvent(data: unknown): ViewerEvent | null {
    if (
        !Array.isArray(data) ||
        data[0] !== VIEWER_EVENT_MESSAGE ||
        !isViewerEventName(data[1])
    ) {
        return null;
    }

    return {
        name: data[1],
        payload: data[2],
    };
}
