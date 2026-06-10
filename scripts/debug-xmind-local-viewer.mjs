import { createServer } from 'node:http';
import { createReadStream, promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const debugRoot = path.join(projectRoot, 'debug/xmind-local-viewer');
const mirrorRoot = path.join(projectRoot, 'vendor/xmind-embed-viewer-remote/mirror');
const shareEmbedPath = path.join(
    mirrorRoot,
    'assets.xmind.net/www/javascripts/share-embed.2d8410315a.js'
);
const basePath = path.join(
    mirrorRoot,
    'assets.xmind.net/www/javascripts/base.38854c1ef6.js'
);

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

function sendText(response, statusCode, text, contentType = 'text/plain; charset=utf-8') {
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
            contentTypes.get(path.extname(filePath)) || 'application/octet-stream',
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

async function sendPatchedJavaScript(response, filePath) {
    const source = await fs.readFile(filePath, 'utf8');
    const patched = source.replaceAll(
        'https://assets.xmind.net/www/',
        '/remote-assets/assets.xmind.net/www/'
    );
    sendText(response, 200, patched, 'text/javascript; charset=utf-8');
}

const server = createServer(async (request, response) => {
    try {
        const requestUrl = new URL(request.url || '/', `http://${request.headers.host}`);
        const pathname = requestUrl.pathname;

        if (pathname === '/' || pathname === '/index.html') {
            await sendFile(response, path.join(debugRoot, 'index.html'));
            return;
        }

        if (pathname === '/file.xmind') {
            await sendFile(response, xmindFile, {
                'content-disposition': 'inline; filename="debug.xmind"',
            });
            return;
        }

        if (pathname === '/debug-runtime/share-embed.local.js') {
            await sendPatchedJavaScript(response, shareEmbedPath);
            return;
        }

        if (pathname === '/debug-runtime/base.local.js') {
            await sendPatchedJavaScript(response, basePath);
            return;
        }

        if (pathname.startsWith('/remote-assets/')) {
            const filePath = resolveInside(
                mirrorRoot,
                pathname.slice('/remote-assets'.length)
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
