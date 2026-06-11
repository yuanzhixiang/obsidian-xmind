import { ViewerAssetUrls } from './asset-loader';
import { createViewerGlobalsScript } from './viewer-globals';

export function createEmbedViewerHtml(assets: ViewerAssetUrls): string {
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
${createViewerGlobalsScript(assets)}
${assets.scripts.map((src) => `<script src="${src}"></script>`).join('')}
</body>
</html>`;
}
