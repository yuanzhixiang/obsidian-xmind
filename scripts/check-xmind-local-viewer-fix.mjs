import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const shareEmbedPath = path.join(
    projectRoot,
    'vendor/xmind-embed-viewer-remote/mirror/assets.xmind.net/www/javascripts/share-embed.2d8410315a.js'
);
const localEntryPath = path.join(
    projectRoot,
    'vendor/xmind-embed-viewer-remote/local/embed-viewer.html'
);
const viewerAssetsPath = path.join(
    projectRoot,
    'src/core/xmind-viewer-assets.ts'
);
const viewerRuntimePath = path.join(
    projectRoot,
    'src/core/xmind-viewer-runtime.cjs'
);
const viewerViewPath = path.join(projectRoot, 'src/core/x-mind-viewer-view.ts');
const packagePath = path.join(projectRoot, 'package.json');

const [shareEmbed, localEntry, viewerAssets, viewerRuntime, viewerView, pkg] =
    await Promise.all([
        fs.readFile(shareEmbedPath, 'utf8'),
        fs.readFile(localEntryPath, 'utf8'),
        fs.readFile(viewerAssetsPath, 'utf8'),
        fs.readFile(viewerRuntimePath, 'utf8'),
        fs.readFile(viewerViewPath, 'utf8'),
        fs.readFile(packagePath, 'utf8').then(JSON.parse),
    ]);

const requiredRuntimeDependencies = {
    bootstrap: '4.0.0-beta.2',
    jquery: '3.2.1',
    'js-cookie': '2.2.0',
    'popper.js': '1.12.9',
    vue: '2.7.14',
};

const removedVendorScripts = [
    ['jquery', '-3-c9f5aeeca3.2.1.min.js'].join(''),
    ['polyfill', '-45b9836beb.min.js'].join(''),
    ['js-cookie', '-a978ac7394.js'].join(''),
    ['popper', '-135fa9e662.min.js'].join(''),
    ['bootstrap', '-26779614c4.min.js'].join(''),
    ['vue@2', '-b0cd066675.7.14.min.js'].join(''),
];

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
        name: 'local debug entry loads package-based runtime bundle',
        pass: localEntry.includes('/debug-runtime/xmind-viewer-runtime.js'),
    },
    {
        name: 'share bundle can load chunks from inline asset map',
        pass: shareEmbed.includes('window.__XMIND_ASSET_MAP__'),
    },
    {
        name: 'runtime embeds XMind viewer assets into main bundle',
        pass:
            viewerAssets.includes('getInlineXMindViewerUrl') &&
            viewerAssets.includes('xmind-viewer-runtime.cjs?bundle') &&
            viewerAssets.includes('share-embed.2d8410315a.js?raw') &&
            viewerAssets.includes('73350.03dd088904.js?raw'),
    },
    {
        name: 'third-party viewer runtime dependencies come from package.json',
        pass: Object.entries(requiredRuntimeDependencies).every(
            ([dependency, version]) => pkg.dependencies?.[dependency] === version
        ),
    },
    {
        name: 'viewer runtime imports package dependencies',
        pass:
            viewerRuntime.includes('jquery/dist/jquery.min.js') &&
            viewerRuntime.includes('js-cookie/src/js.cookie.js') &&
            viewerRuntime.includes('popper.js/dist/umd/popper.min.js') &&
            viewerRuntime.includes('bootstrap/dist/js/bootstrap.min.js') &&
            viewerRuntime.includes('vue/dist/vue.min.js'),
    },
    {
        name: 'viewer assets no longer import removed vendor third-party scripts',
        pass: removedVendorScripts.every(
            (scriptName) =>
                !viewerAssets.includes(scriptName) &&
                !localEntry.includes(scriptName)
        ),
    },
    {
        name: 'Obsidian view no longer depends on plugin resource directory',
        pass:
            viewerView.includes('getInlineXMindViewerUrl()') &&
            !viewerView.includes('getResourcePath('),
    },
    {
        name: 'open-file branch normalizes local XMind file',
        pass: shareEmbed.includes('xmindNormalizeLocalOpenFile(o)'),
    },
    {
        name: 'normalizer supports XMind 26 theme.centralTopic structure',
        pass:
            shareEmbed.includes('e.theme.centralTopic') &&
            shareEmbed.includes('e.theme.centralTopic.properties'),
    },
    {
        name: 'normalizer keeps backward-compatible topicThemeMap structure',
        pass: shareEmbed.includes('e.theme.topicThemeMap.centralTopic'),
    },
    {
        name: 'normalizer fixes inherited invisible central topic text',
        pass:
            shareEmbed.includes("['fo:color'] = '#000000'") &&
            shareEmbed.includes("'inherited' !== e['fo:color']"),
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
