import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assembleXMindChunkParts } from './xmind-webpack-chunk-parts.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const shareEmbedPath = path.join(
    projectRoot,
    'src/xmind-viewer-assets/mirror/assets.xmind.net/www/javascripts/share-embed.2d8410315a.js'
);
const snowbrushChunkFilePath = path.join(
    projectRoot,
    'src/xmind-viewer-assets/mirror/assets.xmind.net/www/javascripts/73350.03dd088904.js'
);
const snowbrushChunkPartsDir = path.join(
    projectRoot,
    'src/xmind-viewer-assets/mirror/assets.xmind.net/www/javascripts/73350.03dd088904.parts'
);
const localEntryPath = path.join(
    projectRoot,
    'src/xmind-viewer-assets/local/embed-viewer.html'
);
const viewerIndexCssPath = path.join(
    projectRoot,
    'src/xmind-viewer-assets/mirror/assets.xmind.net/www/styles/index-141fccded4.css'
);
const snowbrushJsPath = path.join(
    projectRoot,
    'src/xmind-viewer-assets/mirror/assets.xmind.net/www/assets/vendor/js/snowbrush.js'
);
const legacyViewerAssetsPath = path.join(
    projectRoot,
    'src/core/xmind-viewer-assets.ts'
);
const viewerIndexPath = path.join(projectRoot, 'src/xmind-viewer/index.ts');
const viewerAssetLoaderPath = path.join(
    projectRoot,
    'src/xmind-viewer/asset-loader.ts'
);
const viewerResourceManifestPath = path.join(
    projectRoot,
    'src/xmind-viewer/resource-manifest.ts'
);
const viewerEmbedPath = path.join(
    projectRoot,
    'src/xmind-viewer/embed-viewer.ts'
);
const viewerGlobalsPath = path.join(
    projectRoot,
    'src/xmind-viewer/viewer-globals.ts'
);
const viewerFileLoaderPath = path.join(
    projectRoot,
    'src/xmind-viewer/file-loader.ts'
);
const legacyViewerXMindFileLoaderPath = path.join(
    projectRoot,
    'src/xmind-viewer/xmind-file-loader.ts'
);
const viewerWorkbookModelPath = path.join(
    projectRoot,
    'src/xmind-viewer/workbook-model.ts'
);
const viewerThemeLoaderPath = path.join(
    projectRoot,
    'src/xmind-viewer/theme-loader.ts'
);
const viewerRuntimePath = path.join(
    projectRoot,
    'src/xmind-viewer/runtime.cjs'
);
const rollupConfigPath = path.join(projectRoot, 'rollup.config.mjs');
const debugXmindScriptPath = path.join(
    projectRoot,
    'scripts/debug-xmind-local-viewer.mjs'
);
const debugXmindIndexPath = path.join(
    projectRoot,
    'debug/xmind-local-viewer/index.html'
);
const debugXmindAppPath = path.join(
    projectRoot,
    'debug/xmind-local-viewer/app.js'
);
const legacyLocalEmbedViewerPath = path.join(
    projectRoot,
    'src/core/local-xmind-embed-viewer.ts'
);
const legacyViewerRuntimePath = path.join(
    projectRoot,
    'src/core/xmind-viewer-runtime.cjs'
);
const viewerRenderAdapterPath = path.join(
    projectRoot,
    'src/xmind-viewer/render-adapter.ts'
);
const legacyViewerMessageChannelPath = path.join(
    projectRoot,
    'src/xmind-viewer/message-channel.ts'
);
const viewerIframeBridgePath = path.join(
    projectRoot,
    'src/xmind-viewer/iframe-bridge.ts'
);
const viewerEventsPath = path.join(
    projectRoot,
    'src/xmind-viewer/viewer-events.ts'
);
const viewerStatePath = path.join(
    projectRoot,
    'src/xmind-viewer/viewer-state.ts'
);
const viewerSheetControllerPath = path.join(
    projectRoot,
    'src/xmind-viewer/sheet-controller.ts'
);
const viewerZoomControllerPath = path.join(
    projectRoot,
    'src/xmind-viewer/zoom-controller.ts'
);
const viewerErrorsPath = path.join(projectRoot, 'src/xmind-viewer/errors.ts');
const viewerPluginPath = path.join(
    projectRoot,
    'src/core/x-mind-viewer-plugin.ts'
);
const viewerViewPath = path.join(projectRoot, 'src/core/x-mind-viewer-view.ts');
const packagePath = path.join(projectRoot, 'package.json');

async function exists(filePath) {
    try {
        await fs.access(filePath);
        return true;
    } catch {
        return false;
    }
}

const [
    shareEmbed,
    localEntry,
    viewerIndexCss,
    snowbrushJs,
    viewerIndex,
    viewerAssetLoader,
    viewerResourceManifest,
    viewerEmbed,
    viewerGlobals,
    viewerFileLoader,
    viewerWorkbookModel,
    viewerThemeLoader,
    viewerRuntime,
    viewerRenderAdapter,
    viewerIframeBridge,
    viewerEvents,
    viewerState,
    viewerSheetController,
    viewerZoomController,
    viewerErrors,
    viewerPlugin,
    viewerView,
    rollupConfig,
    debugXmindScript,
    debugXmindIndex,
    debugXmindApp,
    pkg,
    snowbrushChunkFileExists,
    legacyViewerAssetsExists,
    legacyLocalEmbedViewerExists,
    legacyViewerRuntimeExists,
    legacyViewerMessageChannelExists,
    legacyViewerXMindFileLoaderExists,
] = await Promise.all([
    fs.readFile(shareEmbedPath, 'utf8'),
    fs.readFile(localEntryPath, 'utf8'),
    fs.readFile(viewerIndexCssPath, 'utf8'),
    fs.readFile(snowbrushJsPath, 'utf8'),
    fs.readFile(viewerIndexPath, 'utf8'),
    fs.readFile(viewerAssetLoaderPath, 'utf8'),
    fs.readFile(viewerResourceManifestPath, 'utf8'),
    fs.readFile(viewerEmbedPath, 'utf8'),
    fs.readFile(viewerGlobalsPath, 'utf8'),
    fs.readFile(viewerFileLoaderPath, 'utf8'),
    fs.readFile(viewerWorkbookModelPath, 'utf8'),
    fs.readFile(viewerThemeLoaderPath, 'utf8'),
    fs.readFile(viewerRuntimePath, 'utf8'),
    fs.readFile(viewerRenderAdapterPath, 'utf8'),
    fs.readFile(viewerIframeBridgePath, 'utf8'),
    fs.readFile(viewerEventsPath, 'utf8'),
    fs.readFile(viewerStatePath, 'utf8'),
    fs.readFile(viewerSheetControllerPath, 'utf8'),
    fs.readFile(viewerZoomControllerPath, 'utf8'),
    fs.readFile(viewerErrorsPath, 'utf8'),
    fs.readFile(viewerPluginPath, 'utf8'),
    fs.readFile(viewerViewPath, 'utf8'),
    fs.readFile(rollupConfigPath, 'utf8'),
    fs.readFile(debugXmindScriptPath, 'utf8'),
    fs.readFile(debugXmindIndexPath, 'utf8'),
    fs.readFile(debugXmindAppPath, 'utf8'),
    fs.readFile(packagePath, 'utf8').then(JSON.parse),
    exists(snowbrushChunkFilePath),
    exists(legacyViewerAssetsPath),
    exists(legacyLocalEmbedViewerPath),
    exists(legacyViewerRuntimePath),
    exists(legacyViewerMessageChannelPath),
    exists(legacyViewerXMindFileLoaderPath),
]);
const snowbrushChunk = await assembleXMindChunkParts(snowbrushChunkPartsDir);
const snowbrushPointsOnPathModule = await fs.readFile(
    path.join(snowbrushChunkPartsDir, 'modules/080930.js'),
    'utf8'
);
const snowbrushProcessModule = await fs.readFile(
    path.join(snowbrushChunkPartsDir, 'modules/073350/inner/0045.js'),
    'utf8'
);
const snowbrushFileSaverModule = await fs.readFile(
    path.join(snowbrushChunkPartsDir, 'modules/073350/inner/0102.js'),
    'utf8'
);

const requiredRuntimeDependencies = {
    '@xmldom/xmldom': '0.8.10',
    animejs: '3.2.1',
    axios: '0.18.1',
    'base64-js': '1.5.1',
    backbone: '1.4.1',
    bootstrap: '4.0.0-beta.2',
    buffer: '5.7.1',
    commonmark: '0.30.0',
    'crypto-js': '4.2.0',
    entities: '2.0.3',
    'file-saver': '1.3.8',
    hammerjs: '2.0.7',
    ieee754: '1.2.1',
    inherits: '2.0.4',
    jquery: '3.2.1',
    'js-cookie': '2.2.0',
    jszip: '3.10.1',
    localforage: '1.9.0',
    lodash: '4.17.21',
    'mathjax-full': '3.1.2',
    mobx: '6.13.7',
    'path-browserify': '1.0.1',
    points: '3.2.0',
    'points-on-path': '0.2.1',
    'popper.js': '1.12.9',
    process: '0.11.10',
    'svg-arc-to-cubic-bezier': '3.2.0',
    'svg-pathdata': '6.0.3',
    'svg-points': '6.0.1',
    underscore: '1.13.6',
    util: '0.10.4',
    vue: '2.7.14',
    'vue-style-loader': '4.1.3',
};

const removedLocalThirdPartyScripts = [
    ['jquery', '-3-c9f5aeeca3.2.1.min.js'].join(''),
    ['polyfill', '-45b9836beb.min.js'].join(''),
    ['js-cookie', '-a978ac7394.js'].join(''),
    ['popper', '-135fa9e662.min.js'].join(''),
    ['bootstrap', '-26779614c4.min.js'].join(''),
    ['vue@2', '-b0cd066675.7.14.min.js'].join(''),
];
const removedMirrorDirectory = ['xmind', 'embed-viewer-remote'].join('-');
const removedImportPrefix = ['..', '..', 'vendor'].join('/') + '/';

const checks = [
    {
        name: 'share bundle reads local asset base',
        pass: shareEmbed.includes('window.__XMIND_ASSET_BASE__'),
    },
    {
        name: 'local entry defines local asset base',
        pass: localEntry.includes('window.__XMIND_ASSET_BASE__'),
    },
    {
        name: 'viewer iframe disables legacy MutationObserver scheduler',
        pass:
            localEntry.includes('__xmindSchedulerRoots') &&
            localEntry.includes('Object.defineProperty(root, property') &&
            localEntry.includes(
                "__xmindDisableSchedulerObserver(root, 'MutationObserver')"
            ) &&
            localEntry.includes(
                "__xmindDisableSchedulerObserver(root, 'WebKitMutationObserver')"
            ) &&
            viewerGlobals.includes('__xmindSchedulerRoots') &&
            viewerGlobals.includes('Object.defineProperty(root, property') &&
            viewerGlobals.includes(
                "__xmindDisableSchedulerObserver(root, 'MutationObserver')"
            ) &&
            viewerGlobals.includes(
                "__xmindDisableSchedulerObserver(root, 'WebKitMutationObserver')"
            ),
    },
    {
        name: 'source viewer globals owns iframe bootstrap globals',
        pass:
            viewerEmbed.includes("from './viewer-globals'") &&
            viewerEmbed.includes('createViewerGlobalsScript(assets)') &&
            !viewerEmbed.includes('window.mixpanel') &&
            !viewerEmbed.includes('__xmindSchedulerRoots') &&
            viewerGlobals.includes('createSchedulerGuardScript') &&
            viewerGlobals.includes('createAnalyticsShimScript') &&
            viewerGlobals.includes('createHostGlobalsScript') &&
            viewerGlobals.includes('window.__XMIND_ASSET_MAP__') &&
            viewerGlobals.includes('window.manifests') &&
            viewerGlobals.includes('window.hosts'),
    },
    {
        name: 'viewer styles do not request remote XMind assets',
        pass:
            !viewerIndexCss.includes('https://assets.xmind.net') &&
            !viewerIndexCss.includes('https://www.xmind.app'),
    },
    {
        name: 'Snowbrush compatibility bundle does not use MutationObserver scheduler',
        pass:
            !snowbrushJs.includes('t.MutationObserver ||') &&
            !snowbrushJs.includes('n.MutationObserver ||') &&
            /r\s*=\s*void 0/.test(snowbrushJs) &&
            /o\s*=\s*void 0/.test(snowbrushJs),
    },
    {
        name: 'local debug entry loads package-based runtime bundle',
        pass: localEntry.includes('/debug-runtime/xmind-viewer-runtime.js'),
    },
    {
        name: 'local debug page preprocesses files with source file loader',
        pass:
            debugXmindIndex.includes('/debug-runtime/xmind-file-loader.js') &&
            debugXmindApp.includes('XMindDebugFileLoader.loadLocalXMindFile') &&
            debugXmindScript.includes('fileLoaderEntryPath') &&
            debugXmindScript.includes('src/xmind-viewer/file-loader.ts') &&
            debugXmindScript.includes('/debug-runtime/xmind-file-loader.js'),
    },
    {
        name: 'share bundle can load chunks from inline asset map',
        pass: shareEmbed.includes('window.__XMIND_ASSET_MAP__'),
    },
    {
        name: 'legacy core viewer wrappers are removed',
        pass:
            !legacyViewerAssetsExists &&
            !legacyLocalEmbedViewerExists &&
            !legacyViewerRuntimeExists &&
            !legacyViewerMessageChannelExists &&
            !legacyViewerXMindFileLoaderExists,
    },
    {
        name: 'Obsidian core code imports source viewer directly',
        pass:
            viewerView.includes("from '../xmind-viewer'") &&
            !viewerView.includes("from '../xmind-viewer/message-channel'") &&
            !viewerView.includes("from '../xmind-viewer/xmind-file-loader'") &&
            !viewerView.includes("from '../xmind-viewer/file-loader'") &&
            viewerView.includes('XMindRenderAdapter') &&
            viewerPlugin.includes("from '../xmind-viewer'"),
    },
    {
        name: 'source viewer public API is exported from index',
        pass:
            viewerIndex.includes("from './render-adapter'") &&
            !viewerIndex.includes("from './message-channel'") &&
            !viewerIndex.includes("from './xmind-file-loader'") &&
            viewerIndex.includes("from './file-loader'") &&
            viewerIndex.includes("from './workbook-model'") &&
            viewerIndex.includes("from './iframe-bridge'") &&
            viewerIndex.includes("from './viewer-state'") &&
            viewerIndex.includes("from './sheet-controller'") &&
            viewerIndex.includes("from './theme-loader'") &&
            viewerIndex.includes("from './zoom-controller'") &&
            viewerIndex.includes("from './errors'"),
    },
    {
        name: 'source iframe bridge owns MessageChannel handshake',
        pass:
            viewerIframeBridge.includes('new MessageChannel()') &&
            viewerIframeBridge.includes('SETUP_CHANNEL_COMMAND') &&
            viewerIframeBridge.includes('isChannelReadyMessage') &&
            viewerIframeBridge.includes('isCommandReply') &&
            viewerIframeBridge.includes('parseViewerEvent') &&
            viewerIframeBridge.includes('onViewerEvent') &&
            viewerIframeBridge.includes('XMindViewerError'),
    },
    {
        name: 'source viewer protocol constants are isolated',
        pass:
            viewerEvents.includes('CHANNEL_READY_MESSAGE') &&
            viewerEvents.includes('VIEWER_EVENT_MESSAGE') &&
            viewerEvents.includes('SETUP_CHANNEL_COMMAND') &&
            viewerEvents.includes('ViewerCommand') &&
            viewerEvents.includes('ViewerEventName') &&
            viewerEvents.includes('parseViewerEvent') &&
            viewerRenderAdapter.includes('XMindIframeBridge') &&
            !viewerRenderAdapter.includes('new MessageChannel()'),
    },
    {
        name: 'source viewer state owns runtime event projection',
        pass:
            viewerState.includes('XMindViewerStateStore') &&
            viewerState.includes('map-ready') &&
            viewerState.includes('sheets-load') &&
            viewerState.includes('sheet-switch') &&
            viewerState.includes('zoom-change') &&
            viewerRenderAdapter.includes('XMindViewerStateStore') &&
            viewerRenderAdapter.includes('onViewerEvent') &&
            viewerRenderAdapter.includes('getState()') &&
            viewerRenderAdapter.includes('subscribeState'),
    },
    {
        name: 'source sheet controller owns sheet behavior',
        pass:
            viewerSheetController.includes('XMindSheetController') &&
            viewerSheetController.includes('getSheets()') &&
            viewerSheetController.includes('getActiveSheetId()') &&
            viewerSheetController.includes('hasSheet(') &&
            viewerSheetController.includes("'switch-sheet'") &&
            viewerRenderAdapter.includes('XMindSheetController') &&
            viewerRenderAdapter.includes(
                'this.sheetController.switchSheet(sheetId)'
            ),
    },
    {
        name: 'source zoom controller owns zoom behavior',
        pass:
            viewerZoomController.includes('XMindZoomController') &&
            viewerZoomController.includes('getZoom()') &&
            viewerZoomController.includes("'fit-map'") &&
            viewerZoomController.includes("'zoom'") &&
            viewerRenderAdapter.includes('XMindZoomController') &&
            viewerRenderAdapter.includes('this.zoomController.fitMap()') &&
            viewerRenderAdapter.includes('this.zoomController.setZoom(scale)'),
    },
    {
        name: 'source viewer error formatting is isolated',
        pass:
            viewerErrors.includes('XMindViewerError') &&
            viewerErrors.includes('getViewerErrorMessage') &&
            viewerView.includes('getViewerErrorMessage(error)'),
    },
    {
        name: 'source viewer creates inline HTML and asset URLs',
        pass:
            viewerIndex.includes('createEmbedViewerHtml') &&
            viewerIndex.includes('createViewerAssetUrls') &&
            viewerIndex.includes('revokeViewerAssetUrls') &&
            viewerAssetLoader.includes('viewerResourceManifest') &&
            !viewerAssetLoader.includes('?raw') &&
            !viewerAssetLoader.includes('?dataurl') &&
            !viewerAssetLoader.includes('?xmindchunk'),
    },
    {
        name: 'source viewer embeds XMind compatibility assets into main bundle',
        pass:
            viewerResourceManifest.includes('runtime.cjs?bundle') &&
            viewerResourceManifest.includes('share-embed.2d8410315a.js?raw') &&
            viewerResourceManifest.includes(
                '73350.03dd088904.parts?xmindchunk'
            ),
    },
    {
        name: 'source resource manifest owns asset imports',
        pass:
            viewerResourceManifest.includes('ViewerResourceManifest') &&
            viewerResourceManifest.includes('viewerResourceManifest') &&
            viewerResourceManifest.includes('../xmind-viewer-assets/') &&
            viewerAssetLoader.includes('createViewerAssetUrls') &&
            viewerAssetLoader.includes('revokeViewerAssetUrls'),
    },
    {
        name: 'source viewer HTML defines local chunk asset map',
        pass:
            viewerGlobals.includes('window.__XMIND_ASSET_BASE__') &&
            viewerGlobals.includes('window.__XMIND_ASSET_MAP__'),
    },
    {
        name: 'source render adapter delegates iframe protocol',
        pass:
            viewerRenderAdapter.includes('XMindIframeBridge') &&
            viewerRenderAdapter.includes(
                "await this.bridge.emit('open-file', file)"
            ) &&
            !viewerRenderAdapter.includes('postMessage(') &&
            !viewerRenderAdapter.includes('MessageChannel') &&
            !viewerRenderAdapter.includes("this.bridge.emit('fit-map'") &&
            !viewerRenderAdapter.includes("this.bridge.emit('zoom'") &&
            !viewerRenderAdapter.includes("this.bridge.emit('switch-sheet'"),
    },
    {
        name: 'monolithic Snowbrush chunk source is split into parts',
        pass: !snowbrushChunkFileExists,
    },
    {
        name: 'viewer assets come from first-party source asset directory',
        pass:
            viewerResourceManifest.includes('../xmind-viewer-assets/') &&
            !viewerResourceManifest.includes(removedImportPrefix) &&
            !viewerResourceManifest.includes(removedMirrorDirectory) &&
            !viewerAssetLoader.includes(removedImportPrefix) &&
            !viewerAssetLoader.includes(removedMirrorDirectory),
    },
    {
        name: 'third-party viewer runtime dependencies come from package.json',
        pass: Object.entries(requiredRuntimeDependencies).every(
            ([dependency, version]) =>
                pkg.dependencies?.[dependency] === version
        ),
    },
    {
        name: 'viewer runtime imports package dependencies',
        pass:
            viewerRuntime.includes('jquery/dist/jquery.min.js') &&
            viewerRuntime.includes('js-cookie/src/js.cookie.js') &&
            viewerRuntime.includes('jszip/dist/jszip.min.js') &&
            viewerRuntime.includes('localforage/dist/localforage.min.js') &&
            viewerRuntime.includes('underscore/underscore-min.js') &&
            viewerRuntime.includes('lodash/lodash.min.js') &&
            viewerRuntime.includes('animejs/lib/anime.min.js') &&
            viewerRuntime.includes('axios/dist/axios.min.js') &&
            viewerRuntime.includes('file-saver') &&
            viewerRuntime.includes('commonmark') &&
            viewerRuntime.includes('entities') &&
            viewerRuntime.includes('mathjax-full/es5/tex-svg.js') &&
            viewerRuntime.includes('process/browser') &&
            viewerRuntime.includes('inherits/inherits_browser.js') &&
            viewerRuntime.includes('util/') &&
            viewerRuntime.includes('path-browserify') &&
            viewerRuntime.includes('svg-arc-to-cubic-bezier') &&
            viewerRuntime.includes('points') &&
            viewerRuntime.includes('points-on-path') &&
            viewerRuntime.includes('svg-pathdata') &&
            viewerRuntime.includes('svg-points') &&
            viewerRuntime.includes('base64-js') &&
            viewerRuntime.includes('ieee754') &&
            viewerRuntime.includes('buffer/') &&
            viewerRuntime.includes('hammerjs/hammer.min.js') &&
            viewerRuntime.includes('backbone/backbone-min.js') &&
            viewerRuntime.includes('mobx/dist/mobx.umd.production.min.js') &&
            viewerRuntime.includes('crypto-js/crypto-js.js') &&
            viewerRuntime.includes('@xmldom/xmldom') &&
            viewerRuntime.includes('popper.js/dist/umd/popper.min.js') &&
            viewerRuntime.includes('bootstrap/dist/js/bootstrap.min.js') &&
            viewerRuntime.includes('vue/dist/vue.min.js') &&
            viewerRuntime.includes('vue-style-loader/lib/addStylesClient.js'),
    },
    {
        name: 'runtime bundlers preserve package globals',
        pass:
            rollupConfig.includes(
                'window.__xmindPackageUnderscore = window._'
            ) &&
            rollupConfig.includes(
                'window.__xmindPackageHammer = window.Hammer'
            ) &&
            rollupConfig.includes('window.__xmindPackageMobX = window.mobx') &&
            rollupConfig.includes(
                'window.__xmindPackageCryptoJS = window.CryptoJS'
            ) &&
            rollupConfig.includes('window.__xmindPackageFileSaver') &&
            rollupConfig.includes(
                'window.__xmindPackageCommonmark = window.commonmark'
            ) &&
            rollupConfig.includes(
                'window.__xmindPackageMathJax = window.MathJax'
            ) &&
            rollupConfig.includes('createCommonJsPackageGlobalBundle') &&
            rollupConfig.includes("'__xmindPackageProcess'") &&
            rollupConfig.includes("'__xmindPackageEntities'") &&
            rollupConfig.includes("'__xmindPackageInherits'") &&
            rollupConfig.includes("'__xmindPackageUtil'") &&
            rollupConfig.includes("'__xmindPackagePath'") &&
            rollupConfig.includes("'__xmindPackageSvgArcToCubicBezier'") &&
            rollupConfig.includes("'__xmindPackagePoints'") &&
            rollupConfig.includes("'__xmindPackagePointsOnPath'") &&
            rollupConfig.includes("'__xmindPackageSvgPathData'") &&
            rollupConfig.includes("'__xmindPackageSvgPoints'") &&
            rollupConfig.includes("'__xmindPackageBase64Js'") &&
            rollupConfig.includes("'__xmindPackageIeee754'") &&
            rollupConfig.includes("'__xmindPackageBuffer'") &&
            rollupConfig.includes("'__xmindPackageXmldom'") &&
            rollupConfig.includes("'__xmindPackageVueStyleLoader'") &&
            rollupConfig.includes('window.__xmindPackageUnderscore &&') &&
            rollupConfig.includes('window.__xmindPackageHammer &&') &&
            rollupConfig.includes('window.__xmindPackageMobX &&') &&
            rollupConfig.includes('window.__xmindPackageCryptoJS &&') &&
            rollupConfig.includes('window.__xmindPackageFileSaver &&') &&
            rollupConfig.includes('window.__xmindPackageCommonmark &&') &&
            rollupConfig.includes('window.__xmindPackageEntities &&') &&
            rollupConfig.includes('window.__xmindPackageMathJax &&') &&
            rollupConfig.includes('window.__xmindPackageProcess &&') &&
            rollupConfig.includes(
                "typeof window.MathJax.tex2svg === 'function'"
            ) &&
            rollupConfig.includes('window.__xmindPackageInherits &&') &&
            rollupConfig.includes('window.__xmindPackageUtil &&') &&
            rollupConfig.includes('window.__xmindPackagePath &&') &&
            rollupConfig.includes(
                'window.__xmindPackageSvgArcToCubicBezier &&'
            ) &&
            rollupConfig.includes('window.__xmindPackagePoints &&') &&
            rollupConfig.includes('window.__xmindPackagePointsOnPath &&') &&
            rollupConfig.includes('window.__xmindPackageSvgPathData &&') &&
            rollupConfig.includes('window.__xmindPackageSvgPoints &&') &&
            rollupConfig.includes('window.__xmindPackageBase64Js &&') &&
            rollupConfig.includes('window.__xmindPackageIeee754 &&') &&
            rollupConfig.includes('window.__xmindPackageBuffer &&') &&
            rollupConfig.includes('window.__xmindPackageXmldom &&') &&
            rollupConfig.includes('window.__xmindPackageVueStyleLoader') &&
            debugXmindScript.includes(
                'window.__xmindPackageUnderscore = window._'
            ) &&
            debugXmindScript.includes(
                'window.__xmindPackageHammer = window.Hammer'
            ) &&
            debugXmindScript.includes(
                'window.__xmindPackageMobX = window.mobx'
            ) &&
            debugXmindScript.includes(
                'window.__xmindPackageCryptoJS = window.CryptoJS'
            ) &&
            debugXmindScript.includes('window.__xmindPackageFileSaver') &&
            debugXmindScript.includes(
                'window.__xmindPackageCommonmark = window.commonmark'
            ) &&
            debugXmindScript.includes(
                'window.__xmindPackageMathJax = window.MathJax'
            ) &&
            debugXmindScript.includes('createCommonJsPackageGlobalBundle') &&
            debugXmindScript.includes("'__xmindPackageProcess'") &&
            debugXmindScript.includes("'__xmindPackageEntities'") &&
            debugXmindScript.includes("'__xmindPackageInherits'") &&
            debugXmindScript.includes("'__xmindPackageUtil'") &&
            debugXmindScript.includes("'__xmindPackagePath'") &&
            debugXmindScript.includes("'__xmindPackageSvgArcToCubicBezier'") &&
            debugXmindScript.includes("'__xmindPackagePoints'") &&
            debugXmindScript.includes("'__xmindPackagePointsOnPath'") &&
            debugXmindScript.includes("'__xmindPackageSvgPathData'") &&
            debugXmindScript.includes("'__xmindPackageSvgPoints'") &&
            debugXmindScript.includes("'__xmindPackageBase64Js'") &&
            debugXmindScript.includes("'__xmindPackageIeee754'") &&
            debugXmindScript.includes("'__xmindPackageBuffer'") &&
            debugXmindScript.includes("'__xmindPackageXmldom'") &&
            debugXmindScript.includes("'__xmindPackageVueStyleLoader'") &&
            debugXmindScript.includes('window.__xmindPackageUnderscore &&') &&
            debugXmindScript.includes('window.__xmindPackageHammer &&') &&
            debugXmindScript.includes('window.__xmindPackageMobX &&') &&
            debugXmindScript.includes('window.__xmindPackageCryptoJS &&') &&
            debugXmindScript.includes('window.__xmindPackageFileSaver &&') &&
            debugXmindScript.includes('window.__xmindPackageCommonmark &&') &&
            debugXmindScript.includes('window.__xmindPackageEntities &&') &&
            debugXmindScript.includes('window.__xmindPackageMathJax &&') &&
            debugXmindScript.includes('window.__xmindPackageProcess &&') &&
            debugXmindScript.includes(
                "typeof window.MathJax.tex2svg === 'function'"
            ) &&
            debugXmindScript.includes('window.__xmindPackageInherits &&') &&
            debugXmindScript.includes('window.__xmindPackageUtil &&') &&
            debugXmindScript.includes('window.__xmindPackagePath &&') &&
            debugXmindScript.includes(
                'window.__xmindPackageSvgArcToCubicBezier &&'
            ) &&
            debugXmindScript.includes('window.__xmindPackagePoints &&') &&
            debugXmindScript.includes('window.__xmindPackagePointsOnPath &&') &&
            debugXmindScript.includes('window.__xmindPackageSvgPathData &&') &&
            debugXmindScript.includes('window.__xmindPackageSvgPoints &&') &&
            debugXmindScript.includes('window.__xmindPackageBase64Js &&') &&
            debugXmindScript.includes('window.__xmindPackageIeee754 &&') &&
            debugXmindScript.includes('window.__xmindPackageBuffer &&') &&
            debugXmindScript.includes('window.__xmindPackageXmldom &&') &&
            debugXmindScript.includes('window.__xmindPackageVueStyleLoader'),
    },
    {
        name: 'runtime bundlers disable legacy MutationObserver scheduler',
        pass:
            rollupConfig.includes(
                'createDisableMutationObserverSchedulerScript'
            ) &&
            rollupConfig.includes('Object.defineProperty(root, property') &&
            rollupConfig.includes(
                "disableSchedulerObserver(root, 'MutationObserver')"
            ) &&
            rollupConfig.includes(
                "disableSchedulerObserver(root, 'WebKitMutationObserver')"
            ) &&
            debugXmindScript.includes(
                'createDisableMutationObserverSchedulerScript'
            ) &&
            debugXmindScript.includes('Object.defineProperty(root, property') &&
            debugXmindScript.includes(
                "disableSchedulerObserver(root, 'MutationObserver')"
            ) &&
            debugXmindScript.includes(
                "disableSchedulerObserver(root, 'WebKitMutationObserver')"
            ),
    },
    {
        name: 'runtime bundlers patch package MutationObserver schedulers',
        pass:
            rollupConfig.includes('disableLegacyMutationObserverScheduler') &&
            rollupConfig.includes("specifier === 'jszip/dist/jszip.min.js'") &&
            rollupConfig.includes(
                "specifier === 'localforage/dist/localforage.min.js'"
            ) &&
            rollupConfig.includes("specifier === 'vue/dist/vue.min.js'") &&
            rollupConfig.includes(
                '\\.MutationObserver\\|\\|\\1\\.WebKitMutationObserver'
            ) &&
            rollupConfig.includes(
                '"undefined"==typeof MutationObserver||!it(MutationObserver)'
            ) &&
            rollupConfig.includes(
                'new (function(){this.observe=function(){setTimeout(_n,0)}})'
            ) &&
            debugXmindScript.includes(
                'disableLegacyMutationObserverScheduler'
            ) &&
            debugXmindScript.includes(
                "specifier === 'jszip/dist/jszip.min.js'"
            ) &&
            debugXmindScript.includes(
                "specifier === 'localforage/dist/localforage.min.js'"
            ) &&
            debugXmindScript.includes("specifier === 'vue/dist/vue.min.js'") &&
            debugXmindScript.includes(
                '\\.MutationObserver\\|\\|\\1\\.WebKitMutationObserver'
            ) &&
            debugXmindScript.includes(
                '"undefined"==typeof MutationObserver||!it(MutationObserver)'
            ) &&
            debugXmindScript.includes(
                'new (function(){this.observe=function(){setTimeout(_n,0)}})'
            ),
    },
    {
        name: 'share bundle delegates JSZip to package runtime',
        pass:
            !shareEmbed.includes('JSZip v3.7.1') &&
            shareEmbed.includes('window.JSZip') &&
            shareEmbed.includes(
                'XMind viewer runtime requires package-provided JSZip.'
            ),
    },
    {
        name: 'share bundle delegates localForage to package runtime',
        pass:
            !shareEmbed.includes('localForage -- Offline Storage') &&
            shareEmbed.includes('window.localforage') &&
            shareEmbed.includes(
                'XMind viewer runtime requires package-provided localForage.'
            ),
    },
    {
        name: 'share bundle delegates Lodash to package runtime',
        pass:
            !shareEmbed.includes('Lodash <https://lodash.com/>') &&
            shareEmbed.includes('window._') &&
            shareEmbed.includes(
                'XMind viewer runtime requires package-provided Lodash.'
            ),
    },
    {
        name: 'share bundle delegates anime.js to package runtime',
        pass:
            !shareEmbed.includes("easing: 'easeOutElastic(1, .5)'") &&
            shareEmbed.includes('window.anime') &&
            shareEmbed.includes(
                'XMind viewer runtime requires package-provided anime.js.'
            ),
    },
    {
        name: 'share bundle delegates axios to package runtime',
        pass:
            !shareEmbed.includes('s.CancelToken = r(94200)') &&
            !shareEmbed.includes('Embedded axios internal module 14224') &&
            shareEmbed.includes('window.axios') &&
            shareEmbed.includes(
                'XMind viewer runtime requires package-provided axios.'
            ) &&
            shareEmbed.includes(
                'Embedded axios internal module 96495 was removed'
            ),
    },
    {
        name: 'share bundle delegates vue-style-loader to package runtime',
        pass:
            !shareEmbed.includes(
                'vue-style-loader cannot be used in a non-browser environment'
            ) &&
            !shareEmbed.includes('data-vue-ssr-id') &&
            shareEmbed.includes('window.__xmindPackageVueStyleLoader') &&
            shareEmbed.includes(
                'XMind viewer runtime requires package-provided vue-style-loader.'
            ),
    },
    {
        name: 'share bundle keeps minimal browser process shim for Snowbrush',
        pass:
            shareEmbed.includes("platform: 'browser'") &&
            shareEmbed.includes('nextTick: function') &&
            shareEmbed.includes('process.chdir is not supported.'),
    },
    {
        name: 'viewer assets no longer import removed local third-party scripts',
        pass: removedLocalThirdPartyScripts.every(
            (scriptName) =>
                !viewerAssetLoader.includes(scriptName) &&
                !localEntry.includes(scriptName)
        ),
    },
    {
        name: 'Snowbrush chunk delegates jQuery to package runtime',
        pass:
            !snowbrushChunk.includes('jQuery JavaScript Library v3.7.0') &&
            snowbrushChunk.includes('t.jQuery || t.$') &&
            snowbrushChunk.includes(
                'XMind viewer runtime requires package-provided jQuery.'
            ),
    },
    {
        name: 'Snowbrush chunk delegates Hammer.js to package runtime',
        pass:
            !snowbrushChunk.includes('Hammer.JS - v2.0.7') &&
            snowbrushChunk.includes('window.__xmindPackageHammer') &&
            snowbrushChunk.includes(
                'XMind viewer runtime requires package-provided Hammer.js.'
            ),
    },
    {
        name: 'Snowbrush chunk delegates Backbone to package runtime',
        pass:
            !snowbrushChunk.includes("t.VERSION = '1.4.1'") &&
            snowbrushChunk.includes('window.Backbone') &&
            snowbrushChunk.includes(
                'XMind viewer runtime requires package-provided Backbone.'
            ),
    },
    {
        name: 'Snowbrush chunk delegates Underscore to package runtime',
        pass:
            !snowbrushChunk.includes("var r = '1.13.6'") &&
            !snowbrushChunk.includes('de.VERSION = r') &&
            snowbrushChunk.includes('window.__xmindPackageUnderscore') &&
            snowbrushChunk.includes("Object.defineProperty(n, '__esModule'") &&
            snowbrushChunk.includes("Object.defineProperty(n, 'default'") &&
            snowbrushChunk.includes(
                'XMind viewer runtime requires package-provided Underscore.'
            ),
    },
    {
        name: 'Snowbrush chunk delegates MobX to package runtime',
        pass:
            !snowbrushChunk.includes('__mobxGlobals') &&
            !snowbrushChunk.includes('mobxGuid') &&
            !snowbrushChunk.includes(
                'Find the full error at: https://github.com/mobxjs/mobx/blob/main/packages/mobx/src/errors.ts'
            ) &&
            snowbrushChunk.includes('window.__xmindPackageMobX') &&
            snowbrushChunk.includes("Object.defineProperty(n, '__esModule'") &&
            snowbrushChunk.includes("'__esModule' !== e") &&
            snowbrushChunk.includes(
                'XMind viewer runtime requires package-provided MobX.'
            ),
    },
    {
        name: 'Snowbrush chunk delegates CryptoJS to package runtime',
        pass:
            !snowbrushChunk.includes('CryptoJS core components') &&
            !snowbrushChunk.includes('derived from CryptoJS.mode.CTR') &&
            !snowbrushChunk.includes('Native crypto from window (Browser)') &&
            snowbrushChunk.includes('window.__xmindPackageCryptoJS') &&
            snowbrushChunk.includes(
                'XMind viewer runtime requires package-provided CryptoJS.'
            ) &&
            snowbrushChunk.includes(
                'XMind viewer runtime CryptoJS is missing module 13214.'
            ),
    },
    {
        name: 'Snowbrush chunk delegates xmldom to package runtime',
        pass:
            !snowbrushChunk.includes('[xmldom warning]') &&
            !snowbrushChunk.includes('attribute equal must after attrName') &&
            !snowbrushChunk.includes('unknow Class:') &&
            snowbrushChunk.includes('window.__xmindPackageXmldom') &&
            snowbrushChunk.includes(
                'XMind viewer runtime requires package-provided xmldom.'
            ) &&
            snowbrushChunk.includes(
                'XMind viewer xmldom XMLReader is hidden behind the DOMParser bridge.'
            ),
    },
    {
        name: 'Snowbrush chunk delegates Buffer stack to package runtime',
        pass:
            !snowbrushChunk.includes(
                'The buffer module from node.js, for the browser.'
            ) &&
            !snowbrushChunk.includes(
                'Invalid string. Length must be a multiple of 4'
            ) &&
            !snowbrushChunk.includes('ieee754. BSD-3-Clause License') &&
            snowbrushChunk.includes('window.__xmindPackageBuffer') &&
            snowbrushChunk.includes('window.__xmindPackageBase64Js') &&
            snowbrushChunk.includes('window.__xmindPackageIeee754') &&
            snowbrushChunk.includes('e.exports = Array.isArray') &&
            snowbrushChunk.includes(
                'XMind viewer runtime requires package-provided Buffer.'
            ),
    },
    {
        name: 'Snowbrush chunk delegates CommonMark to package runtime',
        pass:
            !snowbrushChunk.includes('http://commonmark.org/xml/1.0') &&
            !snowbrushChunk.includes('raw HTML omitted') &&
            snowbrushChunk.includes('window.__xmindPackageCommonmark') &&
            snowbrushChunk.includes(
                'XMind viewer runtime requires package-provided CommonMark.'
            ) &&
            snowbrushChunk.includes(
                'XMind viewer CommonMark internal helper has moved to package runtime.'
            ),
    },
    {
        name: 'Snowbrush chunk delegates util and inherits to package runtime',
        pass:
            !snowbrushChunk.includes('t.debuglog = function') &&
            !snowbrushChunk.includes('t.inherits = i(9846)') &&
            !snowbrushChunk.includes(
                'function (e, t) {\n                  ((e.super_'
            ) &&
            snowbrushChunk.includes('window.__xmindPackageUtil') &&
            snowbrushChunk.includes('window.__xmindPackageInherits') &&
            snowbrushChunk.includes(
                'XMind viewer runtime requires package-provided util.'
            ) &&
            snowbrushChunk.includes(
                'XMind viewer runtime requires package-provided inherits.'
            ),
    },
    {
        name: 'Snowbrush nested bundle delegates process shim to package runtime',
        pass:
            !snowbrushProcessModule.includes(
                'setTimeout has not been defined'
            ) &&
            !snowbrushProcessModule.includes(
                'process.binding is not supported'
            ) &&
            !snowbrushProcessModule.includes(
                'process.chdir is not supported'
            ) &&
            snowbrushProcessModule.includes('window.__xmindPackageProcess') &&
            snowbrushProcessModule.includes(
                'XMind viewer runtime requires package-provided process shim.'
            ),
    },
    {
        name: 'Snowbrush nested bundle delegates FileSaver.js to package runtime',
        pass:
            !snowbrushFileSaverModule.includes(
                'purl.eligrey.com/github/FileSaver.js'
            ) &&
            !snowbrushFileSaverModule.includes('msSaveOrOpenBlob') &&
            !snowbrushFileSaverModule.includes('data:attachment/file;') &&
            snowbrushFileSaverModule.includes(
                'window.__xmindPackageFileSaver'
            ) &&
            snowbrushFileSaverModule.includes(
                'XMind viewer runtime requires package-provided FileSaver.js.'
            ),
    },
    {
        name: 'Snowbrush chunk delegates entities to package runtime',
        pass:
            !snowbrushChunk.includes('var n = i(73267)') &&
            !snowbrushChunk.includes("'&(?:'") &&
            !snowbrushChunk.includes('http://mths.be/fromcodepoint') &&
            !snowbrushChunk.includes('"andslope":"⩘"') &&
            snowbrushChunk.includes('window.__xmindPackageEntities') &&
            snowbrushChunk.includes(
                'XMind viewer runtime requires package-provided entities.'
            ) &&
            snowbrushChunk.includes(
                'XMind viewer entities HTML5 map moved to package runtime.'
            ) &&
            snowbrushChunk.includes(
                'XMind viewer entities fromCodePoint helper moved to package runtime.'
            ),
    },
    {
        name: 'Snowbrush chunk delegates MathJax to package runtime',
        pass:
            !snowbrushChunk.includes("version: '3.1.2'") &&
            !snowbrushChunk.includes('input/tex-full') &&
            !snowbrushChunk.includes('output/svg/fonts/tex.js') &&
            !snowbrushChunk.includes('RegisterHTMLHandler') &&
            snowbrushChunk.includes('window.__xmindPackageMathJax') &&
            snowbrushChunk.includes(
                'XMind viewer runtime requires package-provided MathJax.'
            ),
    },
    {
        name: 'Snowbrush chunk delegates svg-pathdata to package runtime',
        pass:
            !snowbrushChunk.includes('COMMAND_ARG_COUNTS') &&
            !snowbrushChunk.includes('Unexpected command type') &&
            !snowbrushChunk.includes('Unterminated command at the path end.') &&
            snowbrushChunk.includes('window.__xmindPackageSvgPathData') &&
            snowbrushChunk.includes(
                'XMind viewer runtime requires package-provided svg-pathdata.'
            ),
    },
    {
        name: 'Snowbrush chunk delegates points to package runtime',
        pass:
            !snowbrushChunk.includes(
                '`add` function must be passed a number as the second argument'
            ) &&
            !snowbrushChunk.includes(
                'Invalid attempt to spread non-iterable instance'
            ) &&
            !snowbrushChunk.includes('segmentInterval') &&
            snowbrushChunk.includes('window.__xmindPackagePoints') &&
            snowbrushChunk.includes(
                'XMind viewer runtime requires package-provided points.'
            ),
    },
    {
        name: 'Snowbrush chunk delegates points-on-path to package runtime',
        pass:
            !snowbrushPointsOnPathModule.includes('Path data ended short') &&
            !snowbrushPointsOnPathModule.includes('Param not a number:') &&
            !snowbrushPointsOnPathModule.includes('Bad segment:') &&
            snowbrushPointsOnPathModule.includes(
                'window.__xmindPackagePointsOnPath'
            ) &&
            snowbrushPointsOnPathModule.includes(
                'XMind viewer runtime requires package-provided points-on-path.'
            ),
    },
    {
        name: 'Snowbrush chunk delegates svg-points to package runtime',
        pass:
            !snowbrushChunk.includes('Not a valid shape type') &&
            !snowbrushChunk.includes('prop is required on a') &&
            !snowbrushChunk.includes('prop must be one of circle') &&
            snowbrushChunk.includes('window.__xmindPackageSvgPoints') &&
            snowbrushChunk.includes(
                'XMind viewer runtime requires package-provided svg-points.'
            ),
    },
    {
        name: 'Snowbrush chunk delegates path-browserify to package runtime',
        pass:
            !snowbrushChunk.includes(
                'Arguments to path.resolve must be strings'
            ) &&
            !snowbrushChunk.includes(
                'Arguments to path.join must be strings'
            ) &&
            snowbrushChunk.includes('window.__xmindPackagePath') &&
            snowbrushChunk.includes(
                'XMind viewer runtime requires package-provided path-browserify.'
            ),
    },
    {
        name: 'Obsidian view no longer depends on plugin resource directory',
        pass:
            viewerView.includes('getInlineXMindViewerUrl()') &&
            !viewerView.includes('getResourcePath('),
    },
    {
        name: 'Obsidian view loads local XMind file with source file loader',
        pass:
            viewerView.includes('loadLocalXMindFile(') &&
            viewerFileLoader.includes("import JSZip from 'jszip'") &&
            viewerFileLoader.includes("zip.file('content.json'") &&
            viewerFileLoader.includes(
                'normalizeInvisibleCentralTopicTextColor'
            ) &&
            viewerFileLoader.includes('extractXMindWorkbookMetadata') &&
            !viewerFileLoader.includes("properties['fo:color']") &&
            !viewerFileLoader.includes('theme.centralTopic'),
    },
    {
        name: 'source workbook model owns sheet metadata extraction',
        pass:
            viewerWorkbookModel.includes('XMindWorkbookMetadata') &&
            viewerWorkbookModel.includes('XMindWorkbookSheet') &&
            viewerWorkbookModel.includes('extractXMindWorkbookMetadata') &&
            viewerWorkbookModel.includes('normalizeWorkbookSheets') &&
            viewerWorkbookModel.includes('sheets') &&
            viewerWorkbookModel.includes('title') &&
            viewerWorkbookModel.includes('id'),
    },
    {
        name: 'source theme loader owns central topic compatibility',
        pass:
            viewerThemeLoader.includes(
                'normalizeInvisibleCentralTopicTextColor'
            ) &&
            viewerThemeLoader.includes('CENTRAL_TOPIC_FALLBACK_TEXT_COLOR') &&
            viewerThemeLoader.includes("properties['fo:color']") &&
            viewerThemeLoader.includes('theme?.centralTopic?.properties') &&
            viewerThemeLoader.includes(
                'theme?.topicThemeMap?.centralTopic?.properties'
            ),
    },
    {
        name: 'open-file branch receives preprocessed local XMind file',
        pass:
            shareEmbed.includes('const xmindFileBinaryContent = o') &&
            !shareEmbed.includes('xmindNormalizeLocalOpenFile') &&
            !shareEmbed.includes('xmindShouldNormalizeCentralTopicColor'),
    },
    {
        name: 'central topic fallback is no longer embedded in share bundle',
        pass:
            !shareEmbed.includes('Normalize local XMind file failed') &&
            !shareEmbed.includes("['fo:color'] = '#000000'") &&
            !shareEmbed.includes("'inherited' !== e['fo:color']"),
    },
    {
        name: 'source normalizer fixes inherited invisible central topic text',
        pass:
            viewerThemeLoader.includes(
                "properties['fo:color'] = CENTRAL_TOPIC_FALLBACK_TEXT_COLOR"
            ) &&
            viewerThemeLoader.includes(
                "properties['fo:color'] !== 'inherited'"
            ),
    },
];

const failed = checks.filter((check) => !check.pass);
if (failed.length > 0) {
    for (const check of failed) {
        console.error(`FAIL ${check.name}`);
    }
    process.exit(1);
}

for (const check of checks) {
    console.log(`PASS ${check.name}`);
}
