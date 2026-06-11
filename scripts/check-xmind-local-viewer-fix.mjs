import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

const paths = {
    packageJson: 'package.json',
    rollupConfig: 'rollup.config.mjs',
    debugScript: 'scripts/debug-xmind-local-viewer.mjs',
    debugIndex: 'debug/xmind-local-viewer/index.html',
    debugApp: 'debug/xmind-local-viewer/app.js',
    typingAssets: 'src/typing/assets.d.ts',
    legacyAssets: 'src/xmind-viewer-assets',
    assetLoader: 'src/xmind-viewer/asset-loader.ts',
    embedViewer: 'src/xmind-viewer/embed-viewer.ts',
    iframeBridge: 'src/xmind-viewer/iframe-bridge.ts',
    nativeViewerApp: 'src/xmind-viewer/native-viewer-app.ts',
    resourceManifest: 'src/xmind-viewer/resource-manifest.ts',
    sheetController: 'src/xmind-viewer/sheet-controller.ts',
    viewerGlobals: 'src/xmind-viewer/viewer-globals.ts',
    zoomController: 'src/xmind-viewer/zoom-controller.ts',
    index: 'src/xmind-viewer/index.ts',
    renderAdapter: 'src/xmind-viewer/render-adapter.ts',
    fileLoader: 'src/xmind-viewer/file-loader.ts',
    xmindZip: 'src/xmind-viewer/xmind-zip.ts',
    themeLoader: 'src/xmind-viewer/theme-loader.ts',
    workbookModel: 'src/xmind-viewer/workbook-model.ts',
    xmindDocument: 'src/xmind-viewer/xmind-document.ts',
    layout: 'src/xmind-viewer/renderer/layout.ts',
    svgRenderer: 'src/xmind-viewer/renderer/svg-renderer.ts',
    viewerView: 'src/core/x-mind-viewer-view.ts',
    viewerPlugin: 'src/core/x-mind-viewer-plugin.ts',
    workflow: '.github/workflows/release.yaml',
    readme: 'README.md',
    readmeZh: 'README.zh-CN.md',
};

const deletedSourceFiles = [
    paths.assetLoader,
    paths.embedViewer,
    paths.iframeBridge,
    paths.nativeViewerApp,
    paths.resourceManifest,
    paths.sheetController,
    paths.viewerGlobals,
    paths.zoomController,
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
    debugIndex,
    debugApp,
    typingAssets,
    legacyAssetsExists,
    deletedExists,
    index,
    renderAdapter,
    fileLoader,
    xmindZip,
    themeLoader,
    workbookModel,
    xmindDocument,
    layout,
    svgRenderer,
    viewerView,
    viewerPlugin,
    workflow,
    readme,
    readmeZh,
] = await Promise.all([
    readText(paths.packageJson).then(JSON.parse),
    readText(paths.rollupConfig),
    readText(paths.debugScript),
    readText(paths.debugIndex),
    readText(paths.debugApp),
    readText(paths.typingAssets),
    exists(paths.legacyAssets),
    Promise.all(deletedSourceFiles.map(exists)),
    readText(paths.index),
    readText(paths.renderAdapter),
    readText(paths.fileLoader),
    readText(paths.xmindZip),
    readText(paths.themeLoader),
    readText(paths.workbookModel),
    readText(paths.xmindDocument),
    readText(paths.layout),
    readText(paths.svgRenderer),
    readText(paths.viewerView),
    readText(paths.viewerPlugin),
    readText(paths.workflow),
    readText(paths.readme),
    readText(paths.readmeZh),
]);

const sourceFiles = [
    index,
    renderAdapter,
    fileLoader,
    xmindZip,
    themeLoader,
    workbookModel,
    xmindDocument,
    layout,
    svgRenderer,
    viewerView,
    viewerPlugin,
].join('\n');

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
    'jszip',
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

const checks = [
    {
        name: '正式 viewer 直接使用源码渲染器，不再走 iframe assets',
        pass:
            renderAdapter.includes('parseXMindDocument') &&
            renderAdapter.includes('renderNativeMindMap') &&
            renderAdapter.includes('XMindViewerStateStore') &&
            !renderAdapter.includes('XMindIframeBridge') &&
            !renderAdapter.includes('MessageChannel') &&
            !viewerView.includes('getInlineXMindViewerUrl') &&
            !viewerView.includes('viewerUrl') &&
            !viewerPlugin.includes('revokeInlineXMindViewerAssets'),
    },
    {
        name: '旧 iframe、Blob HTML 和资源清单模块保持删除状态',
        pass:
            !legacyAssetsExists &&
            deletedExists.every((item) => item === false) &&
            !typingAssets.includes('?appbundle') &&
            !rollupConfig.includes('?appbundle') &&
            !rollupConfig.includes('createSourceScriptBundle') &&
            !sourceFiles.includes('createEmbedViewerHtml') &&
            !sourceFiles.includes('viewerResourceManifest'),
    },
    {
        name: '正式源码中不再生成动态 script/style 或写 innerHTML',
        pass:
            !sourceFiles.includes("createElement('script'") &&
            !sourceFiles.includes('createElement("script"') &&
            !sourceFiles.includes("createElement('style'") &&
            !sourceFiles.includes('createElement("style"') &&
            !sourceFiles.includes('.innerHTML') &&
            !sourceFiles.includes('.outerHTML') &&
            !sourceFiles.includes('.style.'),
    },
    {
        name: '源码 viewer 解析并渲染 xmind 文件',
        pass:
            xmindDocument.includes('readZipTextFile') &&
            xmindDocument.includes('parseXMindDocument') &&
            xmindDocument.includes('structureClass') &&
            xmindDocument.includes('normalizePosition') &&
            fileLoader.includes('readZipTextFile') &&
            fileLoader.includes('replaceZipTextFile') &&
            fileLoader.includes('normalizeInvisibleCentralTopicTextColor') &&
            xmindZip.includes("from 'fflate'") &&
            xmindZip.includes('unzipSync') &&
            xmindZip.includes('zipSync') &&
            pkg.dependencies?.fflate === '0.8.3',
    },
    {
        name: 'package 依赖只保留源码 viewer 实际使用项',
        pass:
            Object.keys(pkg.dependencies || {}).length === 1 &&
            pkg.dependencies?.fflate === '0.8.3' &&
            oldRuntimeDependencyNames.every(
                (dependencyName) => !pkg.dependencies?.[dependencyName]
            ),
    },
    {
        name: '源码渲染器保留 clockwise、展开折叠、缩放和适配画布',
        pass:
            layout.includes('RIGHT_SIDE_ROOT_STRUCTURES') &&
            layout.includes('DEFAULT_COMPACT_DEPTH') &&
            layout.includes('expandedTopicIds') &&
            layout.includes('collapsedTopicIds') &&
            layout.includes('canToggleChildren') &&
            layout.includes('isExpanded') &&
            layout.includes('hasHiddenChildren') &&
            layout.includes('toggleControlKind') &&
            layout.includes('toggleControlX') &&
            layout.includes('hiddenDescendantCount') &&
            layout.includes('hiddenDescendantCount > 999') &&
            !layout.includes("isManuallyCollapsed ? 'ellipsis' : 'count'") &&
            layout.includes('placeRightSideRootChildren') &&
            svgRenderer.includes('renderNativeMindMap') &&
            svgRenderer.includes('appendToggleControl') &&
            svgRenderer.includes('onToggleTopic') &&
            svgRenderer.includes('collapse-extend-hover-area') &&
            svgRenderer.includes('is-count') &&
            svgRenderer.includes('is-ellipsis') &&
            svgRenderer.includes('is-collapse') &&
            svgRenderer.includes('xmind-branch-hover-target') &&
            svgRenderer.includes('is-branch-hovered') &&
            svgRenderer.includes('branch-collapse-hover-target') &&
            svgRenderer.includes('setBranchHoverState') &&
            svgRenderer.includes('pointerenter') &&
            svgRenderer.includes('toggleControlText') &&
            svgRenderer.includes('> 999') &&
            svgRenderer.includes('tabindex') &&
            svgRenderer.includes('hiddenDescendantCount') &&
            renderAdapter.includes('expandedTopicIdsBySheet') &&
            renderAdapter.includes('collapsedTopicIdsBySheet') &&
            renderAdapter.includes('panOffsetX') &&
            renderAdapter.includes('panOffsetY') &&
            renderAdapter.includes('handleWheel') &&
            renderAdapter.includes("addEventListener('wheel'") &&
            renderAdapter.includes('passive: false') &&
            renderAdapter.includes('normalizeWheelDelta') &&
            renderAdapter.includes('ctrlKey') &&
            renderAdapter.includes('metaKey') &&
            renderAdapter.includes('isZoomWheelEvent') &&
            renderAdapter.includes('WHEEL_ZOOM_SENSITIVITY = 0.004') &&
            renderAdapter.includes('RightDragState') &&
            renderAdapter.includes('handlePointerDown') &&
            renderAdapter.includes('handlePointerMove') &&
            renderAdapter.includes('handlePointerUp') &&
            renderAdapter.includes('handleContextMenu') &&
            renderAdapter.includes("event.button !== 2") &&
            renderAdapter.includes('setPointerCapture') &&
            renderAdapter.includes('releasePointerCapture') &&
            renderAdapter.includes('is-right-dragging') &&
            renderAdapter.includes('setZoomAt') &&
            renderAdapter.includes('getBaseOffset') &&
            renderAdapter.includes('captureViewportAnchor') &&
            renderAdapter.includes('restoreViewportAnchor') &&
            renderAdapter.includes('preserveViewport') &&
            renderAdapter.includes('fitToView: false') &&
            renderAdapter.includes('toggleTopic') &&
            renderAdapter.includes('fitMapSync') &&
            renderAdapter.includes('setZoom') &&
            renderAdapter.includes('applyTransform') &&
            renderAdapter.includes('Math.round(this.zoomScale * 100)'),
    },
    {
        name: 'Obsidian 视图只导入 src/xmind-viewer 稳定入口',
        pass:
            viewerView.includes("from '../xmind-viewer'") &&
            viewerView.includes('loadLocalXMindFile') &&
            viewerView.includes('XMindRenderAdapter') &&
            !viewerView.includes('../xmind-viewer-assets') &&
            !viewerPlugin.includes('../xmind-viewer-assets'),
    },
    {
        name: 'XMind pane menu 提供安全文件操作并拦截 Mod+W 关闭菜单',
        pass:
            viewerView.includes('onPaneMenu') &&
            viewerView.includes('Copy path') &&
            viewerView.includes('as Obsidian URL') &&
            viewerView.includes('from vault folder') &&
            viewerView.includes('from system root') &&
            viewerView.includes('removeMenuItemsByTitle') &&
            viewerView.includes('HIDDEN_PANE_MENU_TITLES') &&
            viewerView.includes('Split right') &&
            viewerView.includes('Split down') &&
            !viewerView.includes('Open as markdown') &&
            !viewerView.includes("type: 'markdown'") &&
            !viewerView.includes('setUseNativeMenu(false)') &&
            viewerView.includes('event.preventDefault()') &&
            viewerView.includes('menu.hide()'),
    },
    {
        name: 'debug viewer 复用同一份源码 API',
        pass:
            debugScript.includes('src/xmind-viewer/index.ts') &&
            debugScript.includes('/debug-runtime/xmind-viewer.js') &&
            debugScript.includes('/debug-config.json') &&
            debugScript.includes('fileName: path.basename(xmindFile)') &&
            debugIndex.includes('id="viewerHost"') &&
            debugIndex.includes('id="fileInput"') &&
            debugIndex.includes('id="openFileButton"') &&
            debugIndex.includes('/debug-runtime/xmind-viewer.js') &&
            debugApp.includes('XMindDebugViewer.XMindRenderAdapter') &&
            debugApp.includes('loadLocalXMindFile') &&
            debugApp.includes('loadDebugConfig') &&
            debugApp.includes('readActiveFile') &&
            debugApp.includes('.arrayBuffer()') &&
            debugApp.includes('fileInput.addEventListener') &&
            !debugScript.includes('native-viewer-app') &&
            !debugIndex.includes('viewerFrame') &&
            !debugApp.includes('MessageChannel'),
    },
    {
        name: 'README 包含官方需要的安装和使用说明',
        pass:
            readme.includes('## Installation') &&
            readme.includes('## Usage') &&
            readme.includes('main.js') &&
            readme.includes('manifest.json') &&
            readme.includes('styles.css') &&
            readmeZh.includes('## 安装') &&
            readmeZh.includes('## 使用') &&
            readmeZh.includes('main.js') &&
            readmeZh.includes('manifest.json') &&
            readmeZh.includes('styles.css'),
    },
    {
        name: 'GitHub release 只上传官方三件套并生成 attestations',
        pass:
            workflow.includes('actions/attest-build-provenance@v2') &&
            workflow.includes('attestations: write') &&
            workflow.includes('id-token: write') &&
            workflow.includes('dist/main.js') &&
            workflow.includes('dist/manifest.json') &&
            workflow.includes('dist/styles.css') &&
            !workflow.includes('zip_file') &&
            !workflow.includes('\"$zip_file\"'),
    },
    {
        name: '源码 workbook 元数据和 document parser 继续分层',
        pass:
            workbookModel.includes('extractXMindWorkbookMetadata') &&
            xmindDocument.includes('XMindDocumentSheet') &&
            xmindDocument.includes('XMindTopicNode') &&
            !workbookModel.includes('fflate') &&
            !xmindDocument.includes('fflate') &&
            xmindZip.includes('readZipTextFile'),
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
