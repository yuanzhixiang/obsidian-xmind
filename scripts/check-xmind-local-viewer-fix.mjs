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
    debugStyles: 'debug/xmind-local-viewer/styles.css',
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
    styleResolver: 'src/xmind-viewer/renderer/style-resolver.ts',
    viewerView: 'src/core/x-mind-viewer-view.ts',
    viewerPlugin: 'src/core/x-mind-viewer-plugin.ts',
    i18n: 'src/i18n.ts',
    workflow: '.github/workflows/release.yaml',
    styles: 'styles.css',
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
    debugStyles,
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
    styleResolver,
    viewerView,
    viewerPlugin,
    i18n,
    workflow,
    styles,
    readme,
    readmeZh,
] = await Promise.all([
    readText(paths.packageJson).then(JSON.parse),
    readText(paths.rollupConfig),
    readText(paths.debugScript),
    readText(paths.debugIndex),
    readText(paths.debugApp),
    readText(paths.debugStyles),
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
    readText(paths.styleResolver),
    readText(paths.viewerView),
    readText(paths.viewerPlugin),
    readText(paths.i18n),
    readText(paths.workflow),
    readText(paths.styles),
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
    styleResolver,
    viewerView,
    viewerPlugin,
    i18n,
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

const forbiddenEditingTokens = [
    'onSave?:',
    'onSave:',
    'saveXMindFile',
    'saveEditedFile',
    'exportEditedFile',
    'hasUnsavedEditChanges',
    'canSaveContentJson',
    'editingTopicId',
    'editingTopicIdBySheet',
    'onEditTopic',
    'onCommitTopicTitle',
    'onCancelTopicEdit',
    'onAddChildTopic',
    'onAddSiblingTopic',
    'onDeleteTopic',
    'onPromoteTopic',
    'copySelection()',
    'cutSelection()',
    'pasteSelection()',
    'copySelectionStyle',
    'pasteSelectionStyle',
    'moveSelectionUp',
    'moveSelectionDown',
    'promoteSelection',
    'demoteSelection',
    'setSelectionLabels',
    'setSelectionNote',
    'setSelectionLink',
    'setSelectionMarkers',
    'setSelectionTaskInfo',
    'setSelectionTopicStyle',
    'addSheet(',
    'renameActiveSheet',
    'duplicateActiveSheet',
    'deleteActiveSheet',
    'setSelectionBoundary',
    'setSelectionSummary',
    'setSelectionCallout',
    'addSelectionParentRelationship',
    'setSelectionRelationshipStart',
    'addSelectionRelationshipFromStart',
    'setSelectionRelationshipsTitle',
    'clearSelectionRelationships',
    'xmind-topic-title-editor',
    'is-editing',
    'debug-save',
    '__xmindDebugSavedFiles',
    'savedXmindCount',
    'lastSavedXmindBytes',
];

const forbiddenDebugControlIds = [
    'copyTopicButton',
    'cutTopicButton',
    'pasteTopicButton',
    'moveTopicUpButton',
    'moveTopicDownButton',
    'promoteTopicButton',
    'demoteTopicButton',
    'labelInput',
    'labelButton',
    'linkInput',
    'linkButton',
    'noteInput',
    'noteButton',
    'metadataPresetButton',
    'metadataClearButton',
    'markerInput',
    'markerButton',
    'taskProgressInput',
    'taskPriorityInput',
    'taskButton',
    'markerTaskPresetButton',
    'markerTaskClearButton',
    'styleFillInput',
    'styleTextInput',
    'styleShapeInput',
    'styleLineInput',
    'stylePatternInput',
    'styleButton',
    'copyStyleButton',
    'pasteStyleButton',
    'styleClearButton',
    'sheetNameInput',
    'addSheetButton',
    'renameSheetButton',
    'renameSheetPresetButton',
    'duplicateSheetButton',
    'deleteSheetButton',
    'addBoundaryButton',
    'clearBoundaryButton',
    'addSummaryButton',
    'clearSummaryButton',
    'addCalloutButton',
    'clearCalloutButton',
    'addRelationshipButton',
    'relationshipTitleInput',
    'relationshipStartButton',
    'addRelationshipFromStartButton',
    'relationshipTitleButton',
    'clearRelationshipButton',
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
        name: '源码 viewer 保持只读，不暴露编辑或保存 API',
        pass:
            forbiddenEditingTokens.every(
                (token) =>
                    !renderAdapter.includes(token) &&
                    !svgRenderer.includes(token) &&
                    !viewerView.includes(token) &&
                    !viewerPlugin.includes(token) &&
                    !debugApp.includes(token) &&
                    !styles.includes(token)
            ) &&
            !viewerView.includes('createBinary') &&
            !viewerView.includes('modifyBinary') &&
            !viewerPlugin.includes('createBinary') &&
            !viewerPlugin.includes('modifyBinary'),
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
        name: 'CodeMirror 由 Obsidian 运行时提供，不能打进插件 bundle',
        pass:
            rollupConfig.includes("source.startsWith('@codemirror/')") &&
            rollupConfig.includes("source.startsWith('@lezer/')") &&
            Boolean(pkg.devDependencies?.['@codemirror/state']) &&
            Boolean(pkg.devDependencies?.['@codemirror/view']) &&
            !pkg.dependencies?.['@codemirror/state'] &&
            !pkg.dependencies?.['@codemirror/view'],
    },
    {
        name: '源码渲染器保留只读查看交互',
        pass:
            layout.includes('RIGHT_SIDE_ROOT_STRUCTURES') &&
            layout.includes('FOLDED_TOPIC_BRANCH') &&
            layout.includes('isTopicExpanded') &&
            layout.includes('topic.branch !== FOLDED_TOPIC_BRANCH') &&
            layout.includes('expandedTopicIds') &&
            layout.includes('collapsedTopicIds') &&
            layout.includes('canToggleChildren') &&
            layout.includes('isExpanded') &&
            layout.includes('hiddenDescendantCount') &&
            layout.includes('hiddenDescendantCount > 999') &&
            svgRenderer.includes('renderNativeMindMap') &&
            svgRenderer.includes('appendToggleControl') &&
            svgRenderer.includes('onToggleTopic') &&
            svgRenderer.includes('xmind-relationship') &&
            svgRenderer.includes('xmind-boundary') &&
            svgRenderer.includes('xmind-summary') &&
            svgRenderer.includes('appendRelationship') &&
            svgRenderer.includes('appendBoundary') &&
            svgRenderer.includes('appendSummary') &&
            svgRenderer.includes('selectedTopicId?: string | null') &&
            svgRenderer.includes('onSelectTopic?:') &&
            svgRenderer.includes('xmind-topic-selection') &&
            svgRenderer.includes('aria-pressed') &&
            svgRenderer.includes('tabindex') &&
            renderAdapter.includes('expandedTopicIdsBySheet') &&
            renderAdapter.includes('collapsedTopicIdsBySheet') &&
            renderAdapter.includes('selectedTopicIdBySheet') &&
            renderAdapter.includes('toggleTopic') &&
            renderAdapter.includes('fitMapSync') &&
            renderAdapter.includes('setZoom') &&
            renderAdapter.includes('handleWheel') &&
            renderAdapter.includes('isZoomWheelEvent') &&
            renderAdapter.includes('RightDragState') &&
            renderAdapter.includes('handlePointerDown') &&
            renderAdapter.includes('handlePointerMove') &&
            renderAdapter.includes('handleContextMenu') &&
            renderAdapter.includes('preserveViewport') &&
            renderAdapter.includes('captureViewportAnchor') &&
            renderAdapter.includes('restoreViewportAnchor'),
    },
    {
        name: '搜索、大纲和 sheet 切换仍可用',
        pass:
            renderAdapter.includes('searchToggleButton') &&
            renderAdapter.includes('toggleSearch') &&
            renderAdapter.includes('updateSearchQuery') &&
            renderAdapter.includes('moveSearchMatch') &&
            renderAdapter.includes('getSearchMatches') &&
            renderAdapter.includes('findTopicAncestorIds') &&
            renderAdapter.includes('revealTopicPath') &&
            renderAdapter.includes('outlinerToggleButton') &&
            renderAdapter.includes('toggleOutliner') &&
            renderAdapter.includes('renderOutliner') &&
            renderAdapter.includes('appendOutlinerTopic') &&
            renderAdapter.includes('topicBucketsForOutliner') &&
            renderAdapter.includes('isOutlinerTopicExpanded') &&
            renderAdapter.includes('xmind-native-outliner-disclosure') &&
            renderAdapter.includes('xmind-native-outliner-count') &&
            renderAdapter.includes('renderSheetTabs') &&
            renderAdapter.includes('xmind-native-sheet-tab') &&
            renderAdapter.includes('switchSheetSync(sheet.id)') &&
            styles.includes('.xmind-native-outliner') &&
            styles.includes('.xmind-native-outliner-topic') &&
            styles.includes('.xmind-native-search') &&
            styles.includes('.xmind-native-sheet-tabs') &&
            styles.includes('.xmind-native-sheet-tab.is-active'),
    },
    {
        name: 'Obsidian 文件视图和 embed 只读加载，不写回 vault',
        pass:
            viewerView.includes("from '../xmind-viewer'") &&
            viewerPlugin.includes("from '../xmind-viewer'") &&
            viewerView.includes('loadLocalXMindFile') &&
            viewerView.includes('XMindRenderAdapter') &&
            viewerPlugin.includes('loadLocalXMindFile') &&
            viewerPlugin.includes('XMindRenderAdapter') &&
            viewerPlugin.includes('getXMindEmbedRegistry') &&
            viewerPlugin.includes('registerNativeXMindEmbed') &&
            viewerPlugin.includes('XMindEmbedComponent') &&
            viewerPlugin.includes('embedRegistry') &&
            viewerPlugin.includes("registry.registerExtensions") &&
            viewerPlugin.includes('hasNativeEmbedRegistry') &&
            viewerPlugin.includes('removeAdjacentStrayEmbedBracketText') &&
            viewerPlugin.includes('STRAY_EMBED_BRACKET_PATTERN') &&
            viewerPlugin.includes('registerMarkdownPostProcessor') &&
            viewerPlugin.includes('registerEditorExtension') &&
            viewerPlugin.includes('XMindLivePreviewEmbedWidget') &&
            viewerPlugin.includes('XMindMarkdownEmbedRenderer') &&
            viewerPlugin.includes('Decoration.replace') &&
            viewerPlugin.includes('XMIND_RAW_EMBED_PATTERN') &&
            viewerPlugin.includes('resolveRawXMindEmbedFile') &&
            viewerPlugin.includes('findXMindFileByLinkText') &&
            viewerPlugin.includes('app.vault.getFiles()') &&
            viewerPlugin.includes('readBinary(this.file)') &&
            viewerPlugin.includes('selectionTouchesRange') &&
            viewerPlugin.includes('line.from') &&
            viewerPlugin.includes('line.to') &&
            !viewerView.includes('modifyBinary') &&
            !viewerView.includes('createBinary') &&
            !viewerPlugin.includes('modifyBinary') &&
            !viewerPlugin.includes('createBinary') &&
            styles.includes('.xmind-markdown-embed-host') &&
            styles.includes('.xmind-live-preview-embed-host'),
    },
    {
        name: 'XMind pane menu 只保留安全文件操作',
        pass:
            viewerView.includes('onPaneMenu') &&
            viewerView.includes("this.translator.t('copyPath')") &&
            viewerView.includes("this.translator.t('copyPathObsidianUrl')") &&
            viewerView.includes("this.translator.t('copyPathVaultFolder')") &&
            viewerView.includes("this.translator.t('copyPathSystemRoot')") &&
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
        name: 'debug viewer 只暴露只读查看控件',
        pass:
            debugScript.includes('src/xmind-viewer/index.ts') &&
            debugScript.includes('/debug-runtime/xmind-viewer.js') &&
            debugScript.includes('/debug-config.json') &&
            debugIndex.includes('id="viewerHost"') &&
            debugIndex.includes('id="fileInput"') &&
            debugIndex.includes('id="openFileButton"') &&
            debugIndex.includes('id="reloadButton"') &&
            debugIndex.includes('id="fitButton"') &&
            debugIndex.includes('id="zoomInput"') &&
            debugIndex.includes('id="zoomButton"') &&
            debugIndex.includes('id="sheetSelect"') &&
            forbiddenDebugControlIds.every(
                (id) =>
                    !debugIndex.includes(`id="${id}"`) &&
                    !debugApp.includes(`#${id}`)
            ) &&
            !debugIndex.includes('advanced-controls') &&
            !debugStyles.includes('advanced-controls') &&
            debugApp.includes('XMindDebugViewer.XMindRenderAdapter') &&
            debugApp.includes('loadLocalXMindFile') &&
            debugApp.includes('fileInput.addEventListener') &&
            debugApp.includes('viewer?.fitMap()') &&
            debugApp.includes('viewer?.zoom') &&
            debugApp.includes('viewer?.switchSheet') &&
            !debugApp.includes('MessageChannel'),
    },
    {
        name: 'UI 文案通过本地 i18n 支持英文和简体中文',
        pass:
            i18n.includes("export type XMindLocale = 'en' | 'zh-CN'") &&
            i18n.includes('normalizeXMindLocale') &&
            i18n.includes("localStorage.getItem('language')") &&
            i18n.includes('detectXMindLocale') &&
            i18n.includes('createXMindTranslator') &&
            i18n.includes('translateXMind') &&
            i18n.includes('copyPath') &&
            i18n.includes('复制路径') &&
            i18n.includes('XMind debug viewer') &&
            i18n.includes('XMind 调试查看器') &&
            renderAdapter.includes('this.translator.t') &&
            renderAdapter.includes('locale: this.translator.locale') &&
            svgRenderer.includes('translateXMind') &&
            svgRenderer.includes('locale?: XMindLocale') &&
            layout.includes('locale?: XMindLocale') &&
            index.includes('detectXMindLocale') &&
            index.includes('translateXMind'),
    },
    {
        name: 'README 明确这是只读 XMind 查看器',
        pass:
            readme.includes('## Installation') &&
            readme.includes('## Usage') &&
            readme.includes('read-only') &&
            readme.includes('main.js') &&
            readme.includes('manifest.json') &&
            readme.includes('styles.css') &&
            readmeZh.includes('## 安装') &&
            readmeZh.includes('## 使用') &&
            readmeZh.includes('只读') &&
            readmeZh.includes('main.js') &&
            readmeZh.includes('manifest.json') &&
            readmeZh.includes('styles.css'),
    },
    {
        name: '发布工作流仍校验产物 attestations',
        pass:
            workflow.includes('actions/attest-build-provenance') &&
            workflow.includes('main.js') &&
            workflow.includes('styles.css'),
    },
];

const failed = checks.filter((check) => !check.pass);

for (const check of checks) {
    console.log(`${check.pass ? 'PASS' : 'FAIL'} ${check.name}`);
}

if (failed.length > 0) {
    console.error('\nFailed checks:');
    for (const check of failed) {
        console.error(`- ${check.name}`);
    }
    process.exitCode = 1;
}
