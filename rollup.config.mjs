import commonjs from '@rollup/plugin-commonjs';
import fs from 'node:fs';
import json from '@rollup/plugin-json';
import { createRequire } from 'node:module';
import nodeResolve from '@rollup/plugin-node-resolve';
import path from 'node:path';
import replace from '@rollup/plugin-replace';
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

function createPackageRuntimeBundle(assetPath) {
    const scriptSpecifiers = require(assetPath);
    const scripts = scriptSpecifiers.map((specifier) =>
        fs.readFileSync(require.resolve(specifier), 'utf8')
    );

    return `${scripts.join('\n;\n')}\n;\n(function () {
    window.$ = window.jQuery || window.$;
    window.jQuery = window.jQuery || window.$;
    window.__xmindViewerRuntimeReady = Boolean(
        window.jQuery &&
        window.Cookies &&
        window.Popper &&
        window.Vue
    );
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
            const importerDir = importer ? path.dirname(importer) : process.cwd();
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
                return `export default ${jsStringLiteral(createPackageRuntimeBundle(assetPath))};`;
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
