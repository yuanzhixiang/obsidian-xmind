import { createServer } from 'node:http';
import { createReadStream, promises as fs } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assembleXMindChunkParts } from './xmind-webpack-chunk-parts.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const require = createRequire(import.meta.url);
const debugRoot = path.join(projectRoot, 'debug/xmind-local-viewer');
const viewerAssetRoot = path.join(projectRoot, 'src/xmind-viewer-assets');
const snowbrushChunkRequestPath =
    '/xmind-viewer-assets/mirror/assets.xmind.net/www/javascripts/73350.03dd088904.js';
const snowbrushChunkPartsDir = path.join(
    viewerAssetRoot,
    'mirror/assets.xmind.net/www/javascripts/73350.03dd088904.parts'
);
const runtimeEntryPath = path.join(
    projectRoot,
    'src/core/xmind-viewer-runtime.cjs'
);
let runtimeBundle = null;

const xmindFile =
    process.env.XMIND_FILE ||
    '/Users/yuanzhixiang/Desktop/202606101441 搞到钱再说.xmind';
const port = Number(process.env.PORT || 4173);

const contentTypes = new Map([
    ['.html', 'text/html; charset=utf-8'],
    ['.js', 'text/javascript; charset=utf-8'],
    ['.css', 'text/css; charset=utf-8'],
    ['.json', 'application/json; charset=utf-8'],
    ['.svg', 'image/svg+xml'],
    ['.gif', 'image/gif'],
    ['.png', 'image/png'],
    ['.mp4', 'video/mp4'],
    ['.xmind', 'application/octet-stream'],
]);

function sendText(
    response,
    statusCode,
    text,
    contentType = 'text/plain; charset=utf-8'
) {
    response.writeHead(statusCode, {
        'content-type': contentType,
        'cache-control': 'no-store',
    });
    response.end(text);
}

async function sendFile(response, filePath, extraHeaders = {}) {
    const stat = await fs.stat(filePath);
    response.writeHead(200, {
        'content-type':
            contentTypes.get(path.extname(filePath)) ||
            'application/octet-stream',
        'content-length': stat.size,
        'cache-control': 'no-store',
        ...extraHeaders,
    });
    createReadStream(filePath).pipe(response);
}

function resolveInside(root, requestPath) {
    const decoded = decodeURIComponent(requestPath);
    const resolved = path.resolve(root, `.${decoded}`);
    if (!resolved.startsWith(root)) {
        return null;
    }
    return resolved;
}

function getRuntimeBundle() {
    if (runtimeBundle) {
        return runtimeBundle;
    }

    const scriptSpecifiers = require(runtimeEntryPath);
    const scripts = scriptSpecifiers.map((specifier) =>
        require('node:fs').readFileSync(require.resolve(specifier), 'utf8')
    );

    runtimeBundle = `${scripts.join('\n;\n')}\n;\n(function () {
    window.$ = window.jQuery || window.$;
    window.jQuery = window.jQuery || window.$;
    window.__xmindViewerRuntimeReady = Boolean(
        window.jQuery &&
        window.Cookies &&
        window.Popper &&
        window.Vue
    );
})();`;

    return runtimeBundle;
}

const server = createServer(async (request, response) => {
    try {
        const requestUrl = new URL(
            request.url || '/',
            `http://${request.headers.host}`
        );
        const pathname = requestUrl.pathname;

        if (pathname === '/' || pathname === '/index.html') {
            await sendFile(response, path.join(debugRoot, 'index.html'));
            return;
        }

        if (pathname === '/favicon.ico') {
            response.writeHead(204, { 'cache-control': 'no-store' });
            response.end();
            return;
        }

        if (pathname === '/file.xmind') {
            await sendFile(response, xmindFile, {
                'content-disposition': 'inline; filename="debug.xmind"',
            });
            return;
        }

        if (pathname === '/debug-runtime/xmind-viewer-runtime.js') {
            sendText(
                response,
                200,
                getRuntimeBundle(),
                'text/javascript; charset=utf-8'
            );
            return;
        }

        if (pathname === snowbrushChunkRequestPath) {
            sendText(
                response,
                200,
                await assembleXMindChunkParts(snowbrushChunkPartsDir),
                'text/javascript; charset=utf-8'
            );
            return;
        }

        if (pathname.startsWith('/xmind-viewer-assets/')) {
            const filePath = resolveInside(
                viewerAssetRoot,
                pathname.slice('/xmind-viewer-assets'.length)
            );
            if (!filePath) {
                sendText(response, 403, 'Forbidden');
                return;
            }
            await sendFile(response, filePath);
            return;
        }

        const localFile = resolveInside(debugRoot, pathname);
        if (localFile) {
            await sendFile(response, localFile);
            return;
        }

        sendText(response, 404, 'Not found');
    } catch (error) {
        const statusCode = error && error.code === 'ENOENT' ? 404 : 500;
        sendText(
            response,
            statusCode,
            error && error.stack ? error.stack : String(error)
        );
    }
});

server.listen(port, '127.0.0.1', () => {
    console.log(`XMind debug viewer: http://127.0.0.1:${port}/`);
    console.log(`XMind file: ${xmindFile}`);
});
