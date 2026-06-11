import { createServer } from 'node:http';
import { createReadStream, promises as fs } from 'node:fs';
import path from 'node:path';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import { rollup as createRollupBundle } from 'rollup';
import { fileURLToPath } from 'node:url';
import typescript from '@rollup/plugin-typescript';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const debugRoot = path.join(projectRoot, 'debug/xmind-local-viewer');
const viewerEntryPath = path.join(projectRoot, 'src/xmind-viewer/index.ts');
let viewerBundle = null;

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

async function getViewerBundle() {
    if (viewerBundle) {
        return viewerBundle;
    }

    const bundle = await createRollupBundle({
        input: viewerEntryPath,
        plugins: [
            nodeResolve({
                browser: true,
                preferBuiltins: false,
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            }),
            commonjs({
                include: 'node_modules/**',
            }),
            typescript({
                tsconfig: './tsconfig.json',
                declaration: false,
                declarationMap: false,
                sourceMap: false,
            }),
        ],
        treeshake: false,
    });

    try {
        const { output } = await bundle.generate({
            format: 'iife',
            name: 'XMindDebugViewer',
            exports: 'named',
            sourcemap: false,
        });
        viewerBundle = output
            .filter((chunkOrAsset) => chunkOrAsset.type === 'chunk')
            .map((chunk) => chunk.code)
            .join('\n');
        return viewerBundle;
    } finally {
        await bundle.close();
    }
}

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

        if (pathname === '/debug-config.json') {
            sendText(
                response,
                200,
                JSON.stringify({
                    xmindFile,
                    fileName: path.basename(xmindFile),
                }),
                'application/json; charset=utf-8'
            );
            return;
        }

        if (pathname === '/file.xmind') {
            await sendFile(response, xmindFile, {
                'content-disposition': 'inline; filename="debug.xmind"',
            });
            return;
        }

        if (pathname === '/plugin-styles.css') {
            await sendFile(response, path.join(projectRoot, 'styles.css'));
            return;
        }

        if (pathname === '/debug-runtime/xmind-viewer.js') {
            sendText(
                response,
                200,
                await getViewerBundle(),
                'text/javascript; charset=utf-8'
            );
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
