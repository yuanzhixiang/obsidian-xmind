import commonjs from '@rollup/plugin-commonjs';
import fs from 'node:fs';
import json from '@rollup/plugin-json';
import { createRequire } from 'node:module';
import nodeResolve from '@rollup/plugin-node-resolve';
import path from 'node:path';
import replace from '@rollup/plugin-replace';
import { rollup as createRollupBundle } from 'rollup';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import { visualizer } from 'rollup-plugin-visualizer';
import { assembleXMindChunkParts } from './scripts/xmind-webpack-chunk-parts.mjs';

const pluginId = 'xmind-maps';
const name = pluginId;
const developmentPluginDir = `test-vault/.obsidian/plugins/${pluginId}`;
const require = createRequire(import.meta.url);

function mimeTypeFor(filePath) {
    const extension = path.extname(filePath).toLowerCase();
    switch (extension) {
        case '.css':
            return 'text/css';
        case '.gif':
            return 'image/gif';
        case '.js':
            return 'text/javascript';
        case '.mp4':
            return 'video/mp4';
        case '.svg':
            return 'image/svg+xml';
        default:
            return 'application/octet-stream';
    }
}

function jsStringLiteral(value) {
    return JSON.stringify(value)
        .replace(/\u2028/g, '\\u2028')
        .replace(/\u2029/g, '\\u2029');
}

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

function readCommonJsRuntimeModuleSource(filePath) {
    const sourcePath = sourcePathForCommonJsRuntimeFile(filePath);
    const source = fs.readFileSync(sourcePath, 'utf8');
    if (path.extname(sourcePath) === '.json') {
        return `module.exports = JSON.parse(${JSON.stringify(source)});`;
    }

    return source;
}

function collectCommonJsRuntimeModules(entryPath) {
    const rootDir = path.dirname(entryPath);
    const modules = [];
    const seen = new Set();

    function visit(filePath) {
        if (seen.has(filePath)) {
            return;
        }

        seen.add(filePath);
        const source = readCommonJsRuntimeModuleSource(filePath);
        const id = normalizeCommonJsRuntimeModuleId(rootDir, filePath);
        modules.push({ id, filePath, source });

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

async function createPackageRuntimeBundle(assetPath) {
    const scriptSpecifiers = require(assetPath);
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
                fs.readFileSync(require.resolve(specifier), 'utf8'),
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

    return `${createDisableMutationObserverSchedulerScript()}\n;\n${scripts.join('\n;\n')}\n;\n(function () {
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
}

function inlineAssetPlugin() {
    return {
        name: 'inline-assets',
        resolveId(source, importer) {
            if (
                !source.endsWith('?raw') &&
                !source.endsWith('?dataurl') &&
                !source.endsWith('?bundle') &&
                !source.endsWith('?xmindchunk')
            ) {
                return null;
            }

            const [assetPath, query] = source.split('?');
            const importerDir = importer
                ? path.dirname(importer)
                : process.cwd();
            return `${path.resolve(importerDir, assetPath)}?${query}`;
        },
        async load(id) {
            const [assetPath, query] = id.split('?');
            if (query === 'raw') {
                return `export default ${jsStringLiteral(fs.readFileSync(assetPath, 'utf8'))};`;
            }

            if (query === 'dataurl') {
                const encoded = fs.readFileSync(assetPath).toString('base64');
                return `export default ${jsStringLiteral(`data:${mimeTypeFor(assetPath)};base64,${encoded}`)};`;
            }

            if (query === 'bundle') {
                return `export default ${jsStringLiteral(await createPackageRuntimeBundle(assetPath))};`;
            }

            if (query === 'xmindchunk') {
                return `export default ${jsStringLiteral(await assembleXMindChunkParts(assetPath))};`;
            }

            return null;
        },
    };
}

function cleanOutputPlugin(outputDir) {
    return {
        name: 'clean-output',
        buildStart() {
            fs.rmSync(outputDir, { recursive: true, force: true });
        },
    };
}

const baseConfig = {
    input: 'src/main.ts',
    external: ['obsidian', 'electron'],
    plugins: [
        inlineAssetPlugin(),
        json(),
        nodeResolve({
            preferBuiltins: true,
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            browser: true,
        }),
        commonjs({
            include: 'node_modules/**',
        }),
        typescript(),
    ],
};

const developmentConfig = {
    ...baseConfig,
    output: {
        dir: developmentPluginDir,
        sourcemap: false,
        format: 'cjs',
        exports: 'auto',
        name,
    },
    plugins: [
        cleanOutputPlugin(developmentPluginDir),
        ...baseConfig.plugins,
        copy({
            targets: [
                {
                    src: './styles.css',
                    dest: developmentPluginDir,
                },
                {
                    src: './manifest.json',
                    dest: developmentPluginDir,
                },
                {
                    src: './.hotreload',
                    dest: developmentPluginDir,
                },
            ],
        }),
    ],
};

const productionConfig = {
    ...baseConfig,
    output: {
        name,
        dir: 'dist',
        sourcemap: false,
        sourcemapExcludeSources: true,
        format: 'cjs',
        exports: 'auto',
    },
    plugins: [
        cleanOutputPlugin('dist'),
        ...baseConfig.plugins,
        replace({
            'process.env.NODE_ENV': JSON.stringify('production'),
            preventAssignment: true,
        }),
        copy({
            targets: [
                { src: './styles.css', dest: 'dist/' },
                { src: './manifest.json', dest: 'dist/' },
            ],
        }),
        terser({
            compress: true,
            mangle: true,
        }),
        visualizer({
            open: false,
            filename: 'bundle-analysis.html',
        }),
    ],
};

const config =
    process.env.PRODUCTION === '1' ? productionConfig : developmentConfig;
export default config;
