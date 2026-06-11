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
const fileLoaderEntryPath = path.join(
    projectRoot,
    'src/xmind-viewer/file-loader.ts'
);
const nativeViewerAppEntryPath = path.join(
    projectRoot,
    'src/xmind-viewer/native-viewer-app.ts'
);
let fileLoaderBundle = null;
let nativeViewerAppBundle = null;

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

function createDisableMutationObserverSchedulerScript() {
    return `(function () {
    var roots = [];
    if (typeof globalThis !== 'undefined') roots.push(globalThis);
    if (typeof window !== 'undefined' && roots.indexOf(window) === -1) roots.push(window);
    if (typeof self !== 'undefined' && roots.indexOf(self) === -1) roots.push(self);
    if (typeof global !== 'undefined' && roots.indexOf(global) === -1) roots.push(global);
    function disableSchedulerObserver(root, property) {
        try {
            Object.defineProperty(root, property, {
                configurable: true,
                writable: true,
                value: undefined
            });
        } catch (error) {
            root[property] = undefined;
        }
    }
    roots.forEach(function (root) {
        disableSchedulerObserver(root, 'MutationObserver');
        disableSchedulerObserver(root, 'WebKitMutationObserver');
    });
})();`;
}

async function getFileLoaderBundle() {
    if (fileLoaderBundle) {
        return fileLoaderBundle;
    }

    const bundle = await createRollupBundle({
        input: fileLoaderEntryPath,
        plugins: [
            nodeResolve({
                browser: true,
                preferBuiltins: false,
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
            name: 'XMindDebugFileLoader',
            exports: 'named',
            sourcemap: false,
        });
        const code = output
            .filter((chunkOrAsset) => chunkOrAsset.type === 'chunk')
            .map((chunk) => chunk.code)
            .join('\n');
        fileLoaderBundle = `(function () {
    var roots = [];
    if (typeof globalThis !== 'undefined') roots.push(globalThis);
    if (typeof window !== 'undefined' && roots.indexOf(window) === -1) roots.push(window);
    if (typeof self !== 'undefined' && roots.indexOf(self) === -1) roots.push(self);
    var observers = roots.map(function (root) {
        return {
            root: root,
            mutationObserver: root.MutationObserver,
            webKitMutationObserver: root.WebKitMutationObserver
        };
    });
    try {
        observers.forEach(function (observer) {
            observer.root.MutationObserver = undefined;
            observer.root.WebKitMutationObserver = undefined;
        });
${code}
        window.XMindDebugFileLoader = XMindDebugFileLoader;
    } finally {
        observers.forEach(function (observer) {
            observer.root.MutationObserver = observer.mutationObserver;
            observer.root.WebKitMutationObserver = observer.webKitMutationObserver;
        });
    }
})();`;
        return fileLoaderBundle;
    } finally {
        await bundle.close();
    }
}

async function getNativeViewerAppBundle() {
    if (nativeViewerAppBundle) {
        return nativeViewerAppBundle;
    }

    const bundle = await createRollupBundle({
        input: nativeViewerAppEntryPath,
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
            name: 'XMindNativeViewerApp',
            sourcemap: false,
        });
        nativeViewerAppBundle = output
            .filter((chunkOrAsset) => chunkOrAsset.type === 'chunk')
            .map((chunk) => chunk.code)
            .join('\n');
        return nativeViewerAppBundle;
    } finally {
        await bundle.close();
    }
}

function createNativeViewerHtml() {
    return `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<title>XMind Native Viewer Debug</title>
</head>
<body>
<script>
window.addEventListener('error', function (event) {
    window.parent.postMessage({
        type: 'xmind-debug-error',
        message: event.message,
        source: event.filename,
        line: event.lineno,
        column: event.colno
    }, window.location.origin);
});
window.addEventListener('unhandledrejection', function (event) {
    window.parent.postMessage({
        type: 'xmind-debug-error',
        message: event.reason && event.reason.message ? event.reason.message : String(event.reason),
        source: 'unhandledrejection',
        line: 0,
        column: 0
    }, window.location.origin);
});
</script>
<script>${createDisableMutationObserverSchedulerScript()}</script>
<script src="/debug-runtime/xmind-native-viewer.js"></script>
</body>
</html>`;
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

        if (pathname === '/file.xmind') {
            await sendFile(response, xmindFile, {
                'content-disposition': 'inline; filename="debug.xmind"',
            });
            return;
        }

        if (pathname === '/debug-runtime/xmind-file-loader.js') {
            sendText(
                response,
                200,
                await getFileLoaderBundle(),
                'text/javascript; charset=utf-8'
            );
            return;
        }

        if (pathname === '/debug-runtime/xmind-native-viewer.html') {
            sendText(
                response,
                200,
                createNativeViewerHtml(),
                'text/html; charset=utf-8'
            );
            return;
        }

        if (pathname === '/debug-runtime/xmind-native-viewer.js') {
            sendText(
                response,
                200,
                await getNativeViewerAppBundle(),
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
