import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import { visualizer } from 'rollup-plugin-visualizer';

const pluginId = 'xmind-viewer';
const name = pluginId;
const developmentPluginDir = `test-vault/.obsidian/plugins/${pluginId}`;

const baseConfig = {
    input: 'src/main.ts',
    external: ['obsidian', 'electron'],
    plugins: [
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
                {
                    src: './vendor/xmind-embed-viewer-remote',
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
        ...baseConfig.plugins,
        replace({
            'process.env.NODE_ENV': JSON.stringify('production'),
            preventAssignment: true,
        }),
        copy({
            targets: [
                { src: './styles.css', dest: 'dist/' },
                { src: './manifest.json', dest: 'dist/' },
                { src: './vendor/xmind-embed-viewer-remote', dest: 'dist/' },
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
