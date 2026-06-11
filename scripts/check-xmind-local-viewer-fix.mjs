import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

const paths = {
    packageJson: 'package.json',
    rollupConfig: 'rollup.config.mjs',
    debugScript: 'scripts/debug-xmind-local-viewer.mjs',
    chunkPartsScript: 'scripts/xmind-webpack-chunk-parts.mjs',
    debugIndex: 'debug/xmind-local-viewer/index.html',
    debugApp: 'debug/xmind-local-viewer/app.js',
    typingAssets: 'src/typing/assets.d.ts',
    runtime: 'src/xmind-viewer/runtime.cjs',
    legacyAssets: 'src/xmind-viewer-assets',
    resourceManifest: 'src/xmind-viewer/resource-manifest.ts',
    assetLoader: 'src/xmind-viewer/asset-loader.ts',
    embedViewer: 'src/xmind-viewer/embed-viewer.ts',
    viewerGlobals: 'src/xmind-viewer/viewer-globals.ts',
    index: 'src/xmind-viewer/index.ts',
    renderAdapter: 'src/xmind-viewer/render-adapter.ts',
    iframeBridge: 'src/xmind-viewer/iframe-bridge.ts',
    viewerEvents: 'src/xmind-viewer/viewer-events.ts',
    viewerState: 'src/xmind-viewer/viewer-state.ts',
    sheetController: 'src/xmind-viewer/sheet-controller.ts',
    zoomController: 'src/xmind-viewer/zoom-controller.ts',
    fileLoader: 'src/xmind-viewer/file-loader.ts',
    themeLoader: 'src/xmind-viewer/theme-loader.ts',
    workbookModel: 'src/xmind-viewer/workbook-model.ts',
    xmindDocument: 'src/xmind-viewer/xmind-document.ts',
    nativeViewerApp: 'src/xmind-viewer/native-viewer-app.ts',
    layout: 'src/xmind-viewer/renderer/layout.ts',
    svgRenderer: 'src/xmind-viewer/renderer/svg-renderer.ts',
    viewerView: 'src/core/x-mind-viewer-view.ts',
    viewerPlugin: 'src/core/x-mind-viewer-plugin.ts',
};

const oldRuntimeDependencyNames = [
    '@xmldom/xmldom',
    'animejs',
    'axios',
    'backbone',
    'base64-js',
    'bootstrap',
    'buffer',
    'commonmark',
    'crypto-js',
    'entities',
    'file-saver',
    'hammerjs',
    'ieee754',
    'inherits',
    'jquery',
    'js-cookie',
    'localforage',
    'lodash',
    'mathjax-full',
    'mobx',
    'path-browserify',
    'points',
    'points-on-path',
    'popper.js',
    'process',
    'svg-arc-to-cubic-bezier',
    'svg-pathdata',
    'svg-points',
    'underscore',
    'util',
    'vue',
    'vue-style-loader',
];

async function readText(relativePath) {
    return fs.readFile(path.join(projectRoot, relativePath), 'utf8');
}

async function exists(relativePath) {
    try {
        await fs.access(path.join(projectRoot, relativePath));
        return true;
    } catch {
        return false;
    }
}

const [
    pkg,
    rollupConfig,
    debugScript,
    chunkPartsScriptExists,
    debugIndex,
    debugApp,
    typingAssets,
    runtimeExists,
    legacyAssetsExists,
    resourceManifest,
    assetLoader,
    embedViewer,
    viewerGlobals,
    index,
    renderAdapter,
    iframeBridge,
    viewerEvents,
    viewerState,
    sheetController,
    zoomController,
    fileLoader,
    themeLoader,
    workbookModel,
    xmindDocument,
    nativeViewerApp,
    layout,
    svgRenderer,
    viewerView,
    viewerPlugin,
] = await Promise.all([
    readText(paths.packageJson).then(JSON.parse),
    readText(paths.rollupConfig),
    readText(paths.debugScript),
    exists(paths.chunkPartsScript),
    readText(paths.debugIndex),
    readText(paths.debugApp),
    readText(paths.typingAssets),
    exists(paths.runtime),
    exists(paths.legacyAssets),
    readText(paths.resourceManifest),
    readText(paths.assetLoader),
    readText(paths.embedViewer),
    readText(paths.viewerGlobals),
    readText(paths.index),
    readText(paths.renderAdapter),
    readText(paths.iframeBridge),
    readText(paths.viewerEvents),
    readText(paths.viewerState),
    readText(paths.sheetController),
    readText(paths.zoomController),
    readText(paths.fileLoader),
    readText(paths.themeLoader),
    readText(paths.workbookModel),
    readText(paths.xmindDocument),
    readText(paths.nativeViewerApp),
    readText(paths.layout),
    readText(paths.svgRenderer),
    readText(paths.viewerView),
    readText(paths.viewerPlugin),
]);

const sourceFiles = [
    resourceManifest,
    assetLoader,
    embedViewer,
    viewerGlobals,
    index,
    renderAdapter,
    iframeBridge,
    viewerEvents,
    viewerState,
    sheetController,
    zoomController,
    fileLoader,
    themeLoader,
    workbookModel,
    xmindDocument,
    nativeViewerApp,
    layout,
    svgRenderer,
    viewerView,
    viewerPlugin,
].join('\n');

const checks = [
    {
        name: '正式 viewer 入口使用源码 app bundle',
        pass:
            resourceManifest.includes(
                "import nativeViewerAppJs from './native-viewer-app.ts?appbundle'"
            ) &&
            resourceManifest.includes('scripts: [nativeViewerAppJs]') &&
            resourceManifest.includes('css: []') &&
            resourceManifest.includes('manifests: {}') &&
            resourceManifest.includes('chunks: {}'),
    },
    {
        name: '正式源码路径不再引用旧 viewer assets',
        pass:
            !resourceManifest.includes('xmind-viewer-assets') &&
            !assetLoader.includes('xmind-viewer-assets') &&
            !embedViewer.includes('xmind-viewer-assets') &&
            !index.includes('xmind-viewer-assets') &&
            !debugScript.includes('xmind-viewer-assets'),
    },
    {
        name: 'Rollup 支持把源码 iframe app 打成内联脚本',
        pass:
            typingAssets.includes("declare module '*?appbundle'") &&
            !typingAssets.includes("declare module '*?bundle'") &&
            !typingAssets.includes("declare module '*?xmindchunk'") &&
            rollupConfig.includes('createSourceScriptBundle') &&
            rollupConfig.includes("!source.endsWith('?appbundle')") &&
            rollupConfig.includes("if (query === 'appbundle')") &&
            rollupConfig.includes("format: 'iife'") &&
            rollupConfig.includes("name: 'XMindNativeViewerApp'") &&
            !rollupConfig.includes("'?bundle'") &&
            !rollupConfig.includes("'?xmindchunk'"),
    },
    {
        name: 'debug viewer 使用同一份源码 app',
        pass:
            debugApp.includes('/debug-runtime/xmind-native-viewer.html') &&
            debugScript.includes('nativeViewerAppEntryPath') &&
            debugScript.includes('src/xmind-viewer/native-viewer-app.ts') &&
            debugScript.includes('/debug-runtime/xmind-native-viewer.html') &&
            debugScript.includes('/debug-runtime/xmind-native-viewer.js') &&
            debugScript.includes('getNativeViewerAppBundle') &&
            !debugScript.includes('/debug-runtime/xmind-viewer-runtime.js') &&
            !debugScript.includes('xmind-webpack-chunk-parts') &&
            !debugScript.includes('runtime.cjs') &&
            debugScript.includes("type: 'xmind-debug-error'") &&
            debugScript.includes(
                '<script>${createDisableMutationObserverSchedulerScript()}</script>'
            ) &&
            debugIndex.includes(
                "Object.defineProperty(root, 'MutationObserver'"
            ) &&
            debugIndex.includes(
                "Object.defineProperty(root, 'WebKitMutationObserver'"
            ),
    },
    {
        name: '源码 iframe app 实现 MessageChannel 协议',
        pass:
            nativeViewerApp.includes("'setup-channel'") &&
            nativeViewerApp.includes(
                "this.port.postMessage(['channel-ready'])"
            ) &&
            nativeViewerApp.includes("'open-file'") &&
            nativeViewerApp.includes("'fit-map'") &&
            nativeViewerApp.includes("'zoom'") &&
            nativeViewerApp.includes("'switch-sheet'") &&
            nativeViewerApp.includes("'map-ready'") &&
            nativeViewerApp.includes("'sheets-load'") &&
            nativeViewerApp.includes("'sheet-switch'") &&
            nativeViewerApp.includes("'zoom-change'") &&
            nativeViewerApp.includes(
                "this.port?.postMessage(['event', name, payload])"
            ),
    },
    {
        name: '源码 iframe app 解析并渲染 xmind 文件',
        pass:
            nativeViewerApp.includes('parseXMindDocument') &&
            nativeViewerApp.includes('renderNativeMindMap') &&
            xmindDocument.includes("zip.file('content.json')") &&
            xmindDocument.includes('normalizeInvisibleCentralTopicTextColor') &&
            xmindDocument.includes('parseXMindDocument') &&
            pkg.dependencies?.jszip === '3.10.1',
    },
    {
        name: 'package 依赖只保留源码 viewer 实际使用项',
        pass:
            Object.keys(pkg.dependencies || {}).length === 1 &&
            pkg.dependencies?.jszip === '3.10.1' &&
            oldRuntimeDependencyNames.every(
                (dependencyName) => !pkg.dependencies?.[dependencyName]
            ),
    },
    {
        name: '源码渲染器提供 SVG 布局、中心主题、缩放和适配画布',
        pass:
            layout.includes('layoutMindMap') &&
            layout.includes('splitRootChildren') &&
            svgRenderer.includes('renderNativeMindMap') &&
            svgRenderer.includes('pathBetween') &&
            nativeViewerApp.includes('fitMap()') &&
            nativeViewerApp.includes('setZoom') &&
            nativeViewerApp.includes('applyTransform') &&
            nativeViewerApp.includes('Math.round(this.zoom * 100)'),
    },
    {
        name: 'Obsidian 视图仍只依赖稳定源码入口',
        pass:
            viewerView.includes("from '../xmind-viewer'") &&
            viewerPlugin.includes("from '../xmind-viewer'") &&
            !viewerView.includes('../xmind-viewer-assets') &&
            !viewerPlugin.includes('../xmind-viewer-assets') &&
            viewerView.includes('loadLocalXMindFile') &&
            viewerView.includes('getInlineXMindViewerUrl') &&
            viewerView.includes('XMindRenderAdapter'),
    },
    {
        name: '外层 iframe bridge 和 controller 边界仍存在',
        pass:
            iframeBridge.includes('new MessageChannel()') &&
            iframeBridge.includes('SETUP_CHANNEL_COMMAND') &&
            iframeBridge.includes('parseViewerEvent') &&
            renderAdapter.includes('XMindIframeBridge') &&
            renderAdapter.includes('XMindSheetController') &&
            renderAdapter.includes('XMindZoomController') &&
            viewerEvents.includes('ViewerCommand') &&
            viewerState.includes('XMindViewerStateStore') &&
            sheetController.includes("'switch-sheet'") &&
            zoomController.includes("'fit-map'") &&
            zoomController.includes("'zoom'"),
    },
    {
        name: '中心主题修复保留在源码层',
        pass:
            fileLoader.includes('normalizeInvisibleCentralTopicTextColor') &&
            fileLoader.includes('withLegacySchedulerGuard') &&
            fileLoader.includes("'WebKitMutationObserver'") &&
            themeLoader.includes("properties['fo:color']") &&
            themeLoader.includes('CENTRAL_TOPIC_FALLBACK_TEXT_COLOR') &&
            !sourceFiles.includes('xmindNormalizeLocalOpenFile'),
    },
    {
        name: '旧 XMind assets 和历史 chunk 维护入口已删除',
        pass:
            !legacyAssetsExists &&
            !chunkPartsScriptExists &&
            !runtimeExists &&
            !pkg.scripts?.['split:xmind-chunk'] &&
            !pkg.scripts?.['check:xmind-chunk'] &&
            !pkg.scripts?.['format:viewer-assets'] &&
            pkg.scripts?.['format:viewer'] &&
            !sourceFiles.includes('share-embed.2d8410315a.js?raw') &&
            !sourceFiles.includes('73350.03dd088904.parts?xmindchunk') &&
            !sourceFiles.includes('runtime.cjs?bundle') &&
            !typingAssets.includes('?bundle') &&
            !typingAssets.includes('?xmindchunk'),
    },
    {
        name: '静态资源加载器支持空 manifest 和空 chunks',
        pass:
            assetLoader.includes('manifests: { ...resources.manifests }') &&
            assetLoader.includes('Object.values(assetUrls.manifests)') &&
            assetLoader.includes("url.startsWith('blob:')"),
    },
    {
        name: '源码 workbook 元数据和新 document parser 分层',
        pass:
            workbookModel.includes('extractXMindWorkbookMetadata') &&
            xmindDocument.includes('XMindDocumentSheet') &&
            xmindDocument.includes('XMindTopicNode') &&
            !workbookModel.includes('JSZip') &&
            xmindDocument.includes("import JSZip from 'jszip'"),
    },
];

let failed = 0;
for (const check of checks) {
    if (check.pass) {
        console.log(`ok - ${check.name}`);
        continue;
    }

    failed += 1;
    console.error(`not ok - ${check.name}`);
}

if (failed > 0) {
    console.error(`\n${failed} local viewer checks failed.`);
    process.exit(1);
}

console.log('\nAll local viewer checks passed.');
