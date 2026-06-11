import { createServer } from 'node:http';
import { createReadStream, promises as fs } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import { rollup as createRollupBundle } from 'rollup';
import { fileURLToPath } from 'node:url';
import typescript from '@rollup/plugin-typescript';
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
const runtimeEntryPath = path.join(projectRoot, 'src/xmind-viewer/runtime.cjs');
const fileLoaderEntryPath = path.join(
    projectRoot,
    'src/xmind-viewer/file-loader.ts'
);
let runtimeBundle = null;
let fileLoaderBundle = null;

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

function normalizeCommonJsRuntimeModuleId(rootDir, filePath) {
    return `./${path.relative(rootDir, filePath).replaceAll(path.sep, '/')}`;
}

function resolveCommonJsRuntimeRequire(parentPath, request) {
    const resolved = path.resolve(path.dirname(parentPath), request);
    return path.extname(resolved) ? resolved : `${resolved}.js`;
}

function sourcePathForCommonJsRuntimeFile(filePath) {
    return filePath.endsWith(
        `${path.sep}util${path.sep}support${path.sep}isBuffer.js`
    )
        ? filePath.replace(
              `${path.sep}util${path.sep}support${path.sep}isBuffer.js`,
              `${path.sep}util${path.sep}support${path.sep}isBufferBrowser.js`
          )
        : filePath;
}

function readCommonJsRuntimeModuleSource(nodeFs, filePath) {
    const sourcePath = sourcePathForCommonJsRuntimeFile(filePath);
    const source = nodeFs.readFileSync(sourcePath, 'utf8');
    if (path.extname(sourcePath) === '.json') {
        return `module.exports = JSON.parse(${JSON.stringify(source)});`;
    }

    return source;
}

function collectCommonJsRuntimeModules(entryPath) {
    const nodeFs = require('node:fs');
    const rootDir = path.dirname(entryPath);
    const modules = [];
    const seen = new Set();

    function visit(filePath) {
        if (seen.has(filePath)) {
            return;
        }

        seen.add(filePath);
        const source = readCommonJsRuntimeModuleSource(nodeFs, filePath);
        const id = normalizeCommonJsRuntimeModuleId(rootDir, filePath);
        modules.push({ id, source });

        for (const match of source.matchAll(
            /\brequire\(['"](\.\/[^'"]+|\.\.\/[^'"]+)['"]\)/g
        )) {
            visit(resolveCommonJsRuntimeRequire(filePath, match[1]));
        }
    }

    visit(entryPath);
    return {
        entryId: normalizeCommonJsRuntimeModuleId(rootDir, entryPath),
        modules,
    };
}

function createCommonJsPackageGlobalBundle(
    specifier,
    globalName,
    externalGlobals = {}
) {
    const entryPath = require.resolve(specifier);
    const { entryId, modules } = collectCommonJsRuntimeModules(entryPath);
    const moduleDefinitions = modules
        .map(
            ({
                id,
                source,
            }) => `${JSON.stringify(id)}: function (module, exports, require, global, process) {
${source}
}`
        )
        .join(',\n');

    return `(function () {
    var modules = {
${moduleDefinitions}
    };
    var cache = {};
    var externalGlobals = ${JSON.stringify(externalGlobals, null, 8)};
    var processShim = window.process || {
        browser: true,
        env: {},
        noDeprecation: true,
        pid: 0,
        nextTick: function (callback) {
            return Promise.resolve().then(callback);
        },
        cwd: function () {
            return '/';
        }
    };
    processShim.env = processShim.env || {};
    window.process = processShim;
    function normalize(parentId, request) {
        if (request.charAt(0) !== '.') {
            throw new Error('Unsupported package runtime require: ' + request);
        }
        var parts = parentId.split('/');
        parts.pop();
        request.split('/').forEach(function (part) {
            if (!part || part === '.') {
                return;
            }
            if (part === '..') {
                parts.pop();
                return;
            }
            parts.push(part);
        });
        var id = parts.join('/');
        if (id.indexOf('./') !== 0) {
            id = './' + id;
        }
        if (!/\\.[a-z0-9]+$/i.test(id)) {
            id += '.js';
        }
        return id;
    }
    function load(id) {
        if (cache[id]) {
            return cache[id].exports;
        }
        if (!modules[id]) {
            throw new Error('Missing package runtime module: ' + id);
        }
        var module = { exports: {} };
        cache[id] = module;
        modules[id](
            module,
            module.exports,
            function (request) {
                var externalGlobal = externalGlobals[request];
                if (externalGlobal) {
                    if (!window[externalGlobal]) {
                        throw new Error('Missing package runtime external: ' + request);
                    }
                    return window[externalGlobal];
                }
                return load(normalize(id, request));
            },
            window,
            processShim
        );
        return module.exports;
    }
    window.${globalName} = load(${JSON.stringify(entryId)});
})();`;
}

async function createEsModulePackageGlobalBundle(specifier, globalName) {
    const bundle = await createRollupBundle({
        input: require.resolve(specifier),
        plugins: [
            nodeResolve({
                browser: true,
                preferBuiltins: false,
            }),
            commonjs({
                include: 'node_modules/**',
            }),
        ],
        treeshake: false,
    });

    try {
        const { output } = await bundle.generate({
            format: 'iife',
            name: globalName,
            exports: 'named',
            sourcemap: false,
        });
        return output
            .filter((chunkOrAsset) => chunkOrAsset.type === 'chunk')
            .map((chunk) => chunk.code)
            .join('\n');
    } finally {
        await bundle.close();
    }
}

function disableLegacyMutationObserverScheduler(script, specifier) {
    if (
        specifier === 'jszip/dist/jszip.min.js' ||
        specifier === 'localforage/dist/localforage.min.js'
    ) {
        return script.replace(
            /\b([A-Za-z_$][\w$]*)\.MutationObserver\|\|\1\.WebKitMutationObserver/g,
            'void 0'
        );
    }

    if (specifier === 'vue/dist/vue.min.js') {
        return script
            .replace(
                '"undefined"==typeof MutationObserver||!it(MutationObserver)&&"[object MutationObserverConstructor]"!==MutationObserver.toString()',
                'true'
            )
            .replace(
                'new MutationObserver(_n)',
                'new (function(){this.observe=function(){setTimeout(_n,0)}})'
            );
    }

    return script;
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

async function getRuntimeBundle() {
    if (runtimeBundle) {
        return runtimeBundle;
    }

    const scriptSpecifiers = require(runtimeEntryPath);
    const scripts = await Promise.all(
        scriptSpecifiers.map(async (specifier) => {
            if (specifier === 'base64-js') {
                return createCommonJsPackageGlobalBundle(
                    specifier,
                    '__xmindPackageBase64Js'
                );
            }

            if (specifier === 'ieee754') {
                return createCommonJsPackageGlobalBundle(
                    specifier,
                    '__xmindPackageIeee754'
                );
            }

            if (specifier === 'buffer/') {
                return createCommonJsPackageGlobalBundle(
                    specifier,
                    '__xmindPackageBuffer',
                    {
                        'base64-js': '__xmindPackageBase64Js',
                        ieee754: '__xmindPackageIeee754',
                    }
                );
            }

            if (specifier === '@xmldom/xmldom') {
                return createCommonJsPackageGlobalBundle(
                    specifier,
                    '__xmindPackageXmldom'
                );
            }

            const script = disableLegacyMutationObserverScheduler(
                require('node:fs').readFileSync(
                    require.resolve(specifier),
                    'utf8'
                ),
                specifier
            );
            if (specifier === 'underscore/underscore-min.js') {
                return `${script}
;
window.__xmindPackageUnderscore = window._;`;
            }

            if (specifier === 'mobx/dist/mobx.umd.production.min.js') {
                return `${script}
;
window.__xmindPackageMobX = window.mobx;`;
            }

            if (specifier === 'crypto-js/crypto-js.js') {
                return `${script}
;
window.__xmindPackageCryptoJS = window.CryptoJS;`;
            }

            if (specifier === 'file-saver') {
                return `${script}
;
window.__xmindPackageFileSaver = {
    saveAs: window.saveAs
};`;
            }

            if (specifier === 'commonmark') {
                return `${script}
;
window.__xmindPackageCommonmark = window.commonmark;`;
            }

            if (specifier === 'entities') {
                return createCommonJsPackageGlobalBundle(
                    specifier,
                    '__xmindPackageEntities'
                );
            }

            if (specifier === 'mathjax-full/es5/tex-svg.js') {
                return `${script}
;
window.__xmindPackageMathJax = window.MathJax;`;
            }

            if (specifier === 'process/browser') {
                return `${createCommonJsPackageGlobalBundle(
                    specifier,
                    '__xmindPackageProcess'
                )}
;
window.process = window.__xmindPackageProcess;`;
            }

            if (specifier === 'inherits/inherits_browser.js') {
                return createCommonJsPackageGlobalBundle(
                    specifier,
                    '__xmindPackageInherits'
                );
            }

            if (specifier === 'util/') {
                return createCommonJsPackageGlobalBundle(
                    specifier,
                    '__xmindPackageUtil',
                    { inherits: '__xmindPackageInherits' }
                );
            }

            if (specifier === 'path-browserify') {
                return createCommonJsPackageGlobalBundle(
                    specifier,
                    '__xmindPackagePath'
                );
            }

            if (specifier === 'svg-arc-to-cubic-bezier') {
                return createCommonJsPackageGlobalBundle(
                    specifier,
                    '__xmindPackageSvgArcToCubicBezier'
                );
            }

            if (specifier === 'points') {
                return createCommonJsPackageGlobalBundle(
                    specifier,
                    '__xmindPackagePoints',
                    {
                        'svg-arc-to-cubic-bezier':
                            '__xmindPackageSvgArcToCubicBezier',
                    }
                );
            }

            if (specifier === 'points-on-path') {
                return createEsModulePackageGlobalBundle(
                    specifier,
                    '__xmindPackagePointsOnPath'
                );
            }

            if (specifier === 'vue-style-loader/lib/addStylesClient.js') {
                return createEsModulePackageGlobalBundle(
                    specifier,
                    '__xmindPackageVueStyleLoader'
                );
            }

            if (specifier === 'svg-pathdata') {
                return createCommonJsPackageGlobalBundle(
                    specifier,
                    '__xmindPackageSvgPathData'
                );
            }

            if (specifier === 'svg-points') {
                return createCommonJsPackageGlobalBundle(
                    specifier,
                    '__xmindPackageSvgPoints'
                );
            }

            return script;
        })
    );

    runtimeBundle = `${createDisableMutationObserverSchedulerScript()}\n;\n${scripts.join('\n;\n')}\n;\n(function () {
    window.$ = window.jQuery || window.$;
    window.jQuery = window.jQuery || window.$;
    window.__xmindPackageHammer = window.Hammer;
    function updateXMindViewerRuntimeReady() {
        window.__xmindViewerRuntimeReady = Boolean(
            window.jQuery &&
            window.Cookies &&
            window.JSZip &&
            window.localforage &&
            window._ &&
            window.__xmindPackageUnderscore &&
            window.anime &&
            window.axios &&
            window.__xmindPackageFileSaver &&
            window.__xmindPackageCommonmark &&
            window.__xmindPackageEntities &&
            window.__xmindPackageMathJax &&
            window.MathJax &&
            typeof window.MathJax.texReset === 'function' &&
            typeof window.MathJax.tex2svg === 'function' &&
            window.__xmindPackageProcess &&
            window.__xmindPackageInherits &&
            window.__xmindPackageUtil &&
            window.__xmindPackagePath &&
            window.__xmindPackageSvgArcToCubicBezier &&
            window.__xmindPackagePoints &&
            window.__xmindPackagePointsOnPath &&
            window.__xmindPackageSvgPathData &&
            window.__xmindPackageSvgPoints &&
            window.__xmindPackageBase64Js &&
            window.__xmindPackageIeee754 &&
            window.__xmindPackageBuffer &&
            window.__xmindPackageHammer &&
            window.Backbone &&
            window.__xmindPackageMobX &&
            window.__xmindPackageCryptoJS &&
            window.__xmindPackageXmldom &&
            window.Popper &&
            window.Vue &&
            window.__xmindPackageVueStyleLoader
        );
    }
    updateXMindViewerRuntimeReady();
    if (window.MathJax && window.MathJax.startup && window.MathJax.startup.promise) {
        window.MathJax.startup.promise.then(updateXMindViewerRuntimeReady, updateXMindViewerRuntimeReady);
    }
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
                await getRuntimeBundle(),
                'text/javascript; charset=utf-8'
            );
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
