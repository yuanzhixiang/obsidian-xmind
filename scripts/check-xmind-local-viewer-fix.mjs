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

const [shareEmbed, localEntry] = await Promise.all([
    fs.readFile(shareEmbedPath, 'utf8'),
    fs.readFile(localEntryPath, 'utf8'),
]);

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
