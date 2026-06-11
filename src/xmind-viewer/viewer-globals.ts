import { ViewerAssetUrls } from './asset-loader';

function createSchedulerGuardScript(): string {
    return `var __xmindSchedulerRoots = [];
if (typeof globalThis !== 'undefined') __xmindSchedulerRoots.push(globalThis);
if (typeof window !== 'undefined' && __xmindSchedulerRoots.indexOf(window) === -1) __xmindSchedulerRoots.push(window);
if (typeof self !== 'undefined' && __xmindSchedulerRoots.indexOf(self) === -1) __xmindSchedulerRoots.push(self);
if (typeof global !== 'undefined' && __xmindSchedulerRoots.indexOf(global) === -1) __xmindSchedulerRoots.push(global);
function __xmindDisableSchedulerObserver(root, property) {
    try {
        Object.defineProperty(root, property, {
            configurable: true,
            writable: true,
            value: undefined
        });
    } catch (error) {
        root[property] = undefined;
    }
}
__xmindSchedulerRoots.forEach(function (root) {
    __xmindDisableSchedulerObserver(root, 'MutationObserver');
    __xmindDisableSchedulerObserver(root, 'WebKitMutationObserver');
});`;
}

function createAnalyticsShimScript(): string {
    return `window.dataLayer = window.dataLayer || [];
window.gtag = function () {};
window.mixpanel = {
    init: function () {},
    register: function () {},
    track: function () {},
    track_pageview: function () {},
    opt_in_tracking: function () {},
    opt_out_tracking: function () {},
    people: { set: function () {} }
};
window.uetq = window.uetq || [];
window.__readSavedConsent = function () { return null; };`;
}

function createHostGlobalsScript(): string {
    return `window.metadataString = '';
window.hosts = {
    xmindAppHost: 'xmind.app',
    xmindFwHost: 'app.xmind.com',
    xmindComHost: 'xmind.com'
};`;
}

export function createViewerGlobalsScript(assets: ViewerAssetUrls): string {
    return `<script>
window.__XMIND_ASSET_BASE__ = '';
window.__XMIND_ASSET_MAP__ = ${JSON.stringify(assets.chunks)};
${createSchedulerGuardScript()}
${createAnalyticsShimScript()}
window.manifests = ${JSON.stringify(assets.manifests)};
${createHostGlobalsScript()}
</script>`;
}
