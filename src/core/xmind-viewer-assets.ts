import bootstrapCss from '../xmind-viewer-assets/mirror/assets.xmind.net/www/assets/vendor/css/bootstrap-customized-f152a280ef.min.css?raw';
import webUiKitIconsCss from '../xmind-viewer-assets/mirror/assets.xmind.net/web-ui-kit/icons/1.22.2/style.css?raw';
import indexCss from '../xmind-viewer-assets/mirror/assets.xmind.net/www/styles/index-141fccded4.css?raw';
import shareEmbedCss from '../xmind-viewer-assets/mirror/assets.xmind.net/www/styles/pages/share-embed-c84652b8d1.css?raw';

import viewerRuntimeJs from './xmind-viewer-runtime.cjs?bundle';
import snowbrushJs from '../xmind-viewer-assets/mirror/assets.xmind.net/www/assets/vendor/js/snowbrush.js?raw';
import shareEmbedJs from '../xmind-viewer-assets/mirror/assets.xmind.net/www/javascripts/share-embed.2d8410315a.js?raw';

import snowbrushChunkJs from '../xmind-viewer-assets/mirror/assets.xmind.net/www/javascripts/73350.03dd088904.js?raw';
import enCommonChunkJs from '../xmind-viewer-assets/mirror/assets.xmind.net/www/javascripts/en.common.368d04a5fc.js?raw';
import enShareChunkJs from '../xmind-viewer-assets/mirror/assets.xmind.net/www/javascripts/en.share.8c70790f45.js?raw';
import enFormChunkJs from '../xmind-viewer-assets/mirror/assets.xmind.net/www/javascripts/en.form.44061827e8.js?raw';
import enErrorChunkJs from '../xmind-viewer-assets/mirror/assets.xmind.net/www/javascripts/en.error.511dc1c429.js?raw';

import structureAnimationGif from '../xmind-viewer-assets/mirror/assets.xmind.net/www/assets/videos/animate/structure-loading-animate-08d3b453a2.gif?dataurl';
import structureAnimationVideo from '../xmind-viewer-assets/mirror/assets.xmind.net/www/assets/videos/animate/structure-loading-animate-ec6aa8c56e.mp4?dataurl';
import facebookIcon from '../xmind-viewer-assets/mirror/assets.xmind.net/www/assets/images/share/facebook-icon-7018f49319.svg?dataurl';
import linkedinIcon from '../xmind-viewer-assets/mirror/assets.xmind.net/www/assets/images/share/linkedin-icon-b71dc66ddd.svg?dataurl';
import twitterIcon from '../xmind-viewer-assets/mirror/assets.xmind.net/www/assets/images/share/twitter-icon-11380ffc4e.svg?dataurl';
import xmindLogo from '../xmind-viewer-assets/mirror/assets.xmind.net/www/assets/images/share/xmind-b6f6b3ca68.svg?dataurl';

interface ViewerAssetUrls {
    css: string[];
    scripts: string[];
    manifests: Record<string, string>;
    chunks: Record<string, string>;
}

let assetUrls: ViewerAssetUrls | null = null;
let viewerHtmlUrl: string | null = null;

function createTextAssetUrl(content: string, type: string): string {
    return URL.createObjectURL(new Blob([content], { type }));
}

function getAssetUrls(): ViewerAssetUrls {
    if (assetUrls) {
        return assetUrls;
    }

    assetUrls = {
        css: [
            createTextAssetUrl(bootstrapCss, 'text/css'),
            createTextAssetUrl(webUiKitIconsCss, 'text/css'),
            createTextAssetUrl(indexCss, 'text/css'),
            createTextAssetUrl(shareEmbedCss, 'text/css'),
        ],
        scripts: [
            createTextAssetUrl(viewerRuntimeJs, 'text/javascript'),
            createTextAssetUrl(shareEmbedJs, 'text/javascript'),
        ],
        manifests: {
            snowbrush: createTextAssetUrl(snowbrushJs, 'text/javascript'),
            structureAnimationGIF: structureAnimationGif,
            structureAnimationVideo,
            facebookIcon,
            linkedinIcon,
            twitterIcon,
            xmindLogo,
        },
        chunks: {
            'javascripts/73350.03dd088904.js': createTextAssetUrl(
                snowbrushChunkJs,
                'text/javascript'
            ),
            'javascripts/en.common.368d04a5fc.js': createTextAssetUrl(
                enCommonChunkJs,
                'text/javascript'
            ),
            'javascripts/en.share.8c70790f45.js': createTextAssetUrl(
                enShareChunkJs,
                'text/javascript'
            ),
            'javascripts/en.form.44061827e8.js': createTextAssetUrl(
                enFormChunkJs,
                'text/javascript'
            ),
            'javascripts/en.error.511dc1c429.js': createTextAssetUrl(
                enErrorChunkJs,
                'text/javascript'
            ),
        },
    };

    return assetUrls;
}

function createViewerHtml(): string {
    const assets = getAssetUrls();

    return `<!doctype html>
<html site-mode="en" mode="production" lang="en" data-x-theme="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<title>XMind Embed Viewer Local</title>
${assets.css.map((href) => `<link rel="stylesheet" href="${href}">`).join('')}
<style>
html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    overflow: hidden;
    background: #f6f8f8;
}
</style>
</head>
<body>
<script>
window.__XMIND_ASSET_BASE__ = '';
window.__XMIND_ASSET_MAP__ = ${JSON.stringify(assets.chunks)};
window.dataLayer = window.dataLayer || [];
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
window.__readSavedConsent = function () { return null; };
window.manifests = ${JSON.stringify(assets.manifests)};
window.metadataString = '';
window.hosts = {
    xmindAppHost: 'xmind.app',
    xmindFwHost: 'app.xmind.com',
    xmindComHost: 'xmind.com'
};
</script>
${assets.scripts.map((src) => `<script src="${src}"></script>`).join('')}
</body>
</html>`;
}

export function getInlineXMindViewerUrl(): string {
    if (viewerHtmlUrl) {
        return viewerHtmlUrl;
    }

    viewerHtmlUrl = createTextAssetUrl(createViewerHtml(), 'text/html');
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

    const urls = assetUrls;
    const chunkUrls = Object.keys(urls.chunks).map((key) => urls.chunks[key]);

    for (const url of [
        ...urls.css,
        ...urls.scripts,
        ...chunkUrls,
        urls.manifests.snowbrush,
    ]) {
        URL.revokeObjectURL(url);
    }

    assetUrls = null;
}
