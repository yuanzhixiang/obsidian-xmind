import {
    createTextAssetUrl,
    createViewerAssetUrls,
    revokeViewerAssetUrls,
    ViewerAssetUrls,
} from './asset-loader';
import { createEmbedViewerHtml } from './embed-viewer';

export { getViewerErrorMessage, XMindViewerError } from './errors';
export { XMindIframeBridge } from './iframe-bridge';
export { loadLocalXMindFile, normalizeLocalXMindFile } from './file-loader';
export { XMindRenderAdapter } from './render-adapter';
export { XMindSheetController } from './sheet-controller';
export {
    CENTRAL_TOPIC_FALLBACK_TEXT_COLOR,
    normalizeInvisibleCentralTopicTextColor,
} from './theme-loader';
export { XMindViewerStateStore } from './viewer-state';
export { XMindZoomController } from './zoom-controller';
export type {
    XMindViewerSheet,
    XMindViewerState,
    XMindViewerStateListener,
} from './viewer-state';
export type {
    ViewerCommand,
    ViewerEvent,
    ViewerEventName,
} from './viewer-events';
export { extractXMindWorkbookMetadata } from './workbook-model';
export type { LoadedLocalXMindFile } from './file-loader';
export type {
    XMindWorkbookMetadata,
    XMindWorkbookSheet,
} from './workbook-model';

let assetUrls: ViewerAssetUrls | null = null;
let viewerHtmlUrl: string | null = null;

function getAssetUrls(): ViewerAssetUrls {
    if (!assetUrls) {
        assetUrls = createViewerAssetUrls();
    }

    return assetUrls;
}

export function getInlineXMindViewerUrl(): string {
    if (!viewerHtmlUrl) {
        viewerHtmlUrl = createTextAssetUrl(
            createEmbedViewerHtml(getAssetUrls()),
            'text/html'
        );
    }

    return viewerHtmlUrl;
}

export function revokeInlineXMindViewerAssets(): void {
    if (viewerHtmlUrl) {
        URL.revokeObjectURL(viewerHtmlUrl);
        viewerHtmlUrl = null;
    }

    if (!assetUrls) {
        return;
    }

    revokeViewerAssetUrls(assetUrls);
    assetUrls = null;
}
