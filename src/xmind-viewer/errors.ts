export class XMindViewerError extends Error {
    readonly cause?: unknown;

    constructor(message: string, cause?: unknown) {
        super(message);
        this.name = 'XMindViewerError';
        this.cause = cause;
    }
}

export function getViewerErrorMessage(
    error: unknown,
    fallback = 'XMind viewer failed to load.'
): string {
    return error instanceof Error ? error.message : fallback;
}
