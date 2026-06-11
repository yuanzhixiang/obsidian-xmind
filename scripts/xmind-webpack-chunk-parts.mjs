import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

export const defaultChunkPath = path.join(
    projectRoot,
    'src/xmind-viewer-assets/mirror/assets.xmind.net/www/javascripts/73350.03dd088904.js'
);
export const defaultPartsDir = path.join(
    projectRoot,
    'src/xmind-viewer-assets/mirror/assets.xmind.net/www/javascripts/73350.03dd088904.parts'
);

const shareEmbedPath = path.join(
    projectRoot,
    'src/xmind-viewer-assets/mirror/assets.xmind.net/www/javascripts/share-embed.2d8410315a.js'
);
const themeLoaderPath = path.join(
    projectRoot,
    'src/xmind-viewer/theme-loader.ts'
);
const topModulePattern = /\n {4,8}(\d+): function \(/g;
const innerModulePattern = /\n                function \(/g;
const chunkSuffix = '\n    },\n]);';
const innerArrayOpen = '            })([';
const innerArrayClose = '\n            ]);';
const innerPlaceholder = '                /* __XMIND_INNER_MODULES__ */';
const innerPlaceholderPattern = /[ \t]*\/\* __XMIND_INNER_MODULES__ \*\//;

function relativeToProject(filePath) {
    return path.relative(projectRoot, filePath);
}

async function exists(filePath) {
    try {
        await fs.access(filePath);
        return true;
    } catch {
        return false;
    }
}

function findModuleStarts(source, pattern) {
    const starts = [];
    let match;
    pattern.lastIndex = 0;
    while ((match = pattern.exec(source))) {
        starts.push({
            id: match[1],
            index: match.index + 1,
        });
    }
    return starts;
}

function parseTopLevelChunk(source) {
    const moduleStarts = findModuleStarts(source, topModulePattern);
    const suffixStart = source.lastIndexOf(chunkSuffix);

    if (moduleStarts.length === 0 || suffixStart === -1) {
        throw new Error('Unable to parse XMind webpack chunk wrapper.');
    }

    const modules = moduleStarts.map((moduleStart, index) => {
        const nextModule = moduleStarts[index + 1];
        const end = nextModule ? nextModule.index : suffixStart;
        return {
            id: moduleStart.id,
            source: source.slice(moduleStart.index, end),
        };
    });

    return {
        prefix: source.slice(0, moduleStarts[0].index),
        modules,
        suffix: source.slice(suffixStart),
    };
}

function parseInnerBundle(moduleSource) {
    const openIndex = moduleSource.indexOf(innerArrayOpen);
    const closeIndex = moduleSource.lastIndexOf(innerArrayClose);

    if (openIndex === -1 || closeIndex === -1 || closeIndex <= openIndex) {
        throw new Error('Unable to parse nested Snowbrush webpack bundle.');
    }

    const arrayStart = openIndex + innerArrayOpen.length;
    const arraySource = moduleSource.slice(arrayStart, closeIndex);
    const moduleStarts = [];
    let match;
    innerModulePattern.lastIndex = 0;
    while ((match = innerModulePattern.exec(arraySource))) {
        moduleStarts.push(match.index + 1);
    }

    if (moduleStarts.length === 0) {
        throw new Error('Unable to locate nested Snowbrush modules.');
    }

    const innerModules = moduleStarts.map((start, index) => {
        const nextStart = moduleStarts[index + 1] ?? arraySource.length;
        return {
            index,
            source: arraySource.slice(start, nextStart),
        };
    });

    return {
        outerSource: `${moduleSource.slice(
            0,
            arrayStart
        )}\n${innerPlaceholder}${moduleSource.slice(closeIndex)}`,
        innerModules,
    };
}

function wrapObjectPart(source) {
    return `export default {\n${source}\n};\n`;
}

function wrapArrayPart(source) {
    return `export default [\n${source}\n];\n`;
}

function wrapStringPart(source) {
    return `export default ${JSON.stringify(source)
        .replace(/\u2028/g, '\\u2028')
        .replace(/\u2029/g, '\\u2029')};\n`;
}

function unwrapStringPart(source, filePath) {
    const match = source.match(/^export default ([\s\S]*);\n?$/);
    if (!match) {
        throw new Error(
            `Invalid string part wrapper: ${relativeToProject(filePath)}`
        );
    }
    return Function(`"use strict"; return (${match[1]});`)();
}

function unwrapObjectPart(source, filePath) {
    const match = source.match(/^export default \{\n([\s\S]*)\n\};\n?$/);
    if (!match) {
        throw new Error(
            `Invalid object part wrapper: ${relativeToProject(filePath)}`
        );
    }
    return match[1];
}

function unwrapArrayPart(source, filePath) {
    const match = source.match(/^export default \[\n([\s\S]*)\n\];\n?$/);
    if (!match) {
        throw new Error(
            `Invalid array part wrapper: ${relativeToProject(filePath)}`
        );
    }
    return match[1];
}

function moduleFileName(id) {
    return `${id.padStart(6, '0')}.js`;
}

function innerModuleFileName(index) {
    return `${String(index).padStart(4, '0')}.js`;
}

async function writeXMindChunkParts(source, sourceFileName, partsDir) {
    const parsedChunk = parseTopLevelChunk(source);
    const modulesDir = path.join(partsDir, 'modules');
    const splitModuleId = '73350';

    await fs.rm(partsDir, { recursive: true, force: true });
    await fs.mkdir(modulesDir, { recursive: true });
    await fs.writeFile(
        path.join(partsDir, '0000-prefix.js'),
        wrapStringPart(parsedChunk.prefix)
    );
    await fs.writeFile(
        path.join(partsDir, '9999-suffix.js'),
        wrapStringPart(parsedChunk.suffix)
    );

    const manifest = {
        chunkId: 73350,
        sourceFile: sourceFileName,
        prefix: '0000-prefix.js',
        suffix: '9999-suffix.js',
        moduleCount: parsedChunk.modules.length,
        splitNestedModuleId: splitModuleId,
        modules: [],
    };

    for (const modulePart of parsedChunk.modules) {
        if (modulePart.id === splitModuleId) {
            const innerBundle = parseInnerBundle(modulePart.source);
            const moduleDir = path.join(
                modulesDir,
                moduleFileName(modulePart.id).replace(/\.js$/, '')
            );
            const innerDir = path.join(moduleDir, 'inner');
            await fs.mkdir(innerDir, { recursive: true });

            const moduleFile = path.join(
                'modules',
                moduleFileName(modulePart.id).replace(/\.js$/, ''),
                'index.js'
            );
            await fs.writeFile(
                path.join(partsDir, moduleFile),
                wrapObjectPart(innerBundle.outerSource)
            );

            const innerModules = [];
            for (const innerModule of innerBundle.innerModules) {
                const innerFile = path.join(
                    'modules',
                    moduleFileName(modulePart.id).replace(/\.js$/, ''),
                    'inner',
                    innerModuleFileName(innerModule.index)
                );
                await fs.writeFile(
                    path.join(partsDir, innerFile),
                    wrapArrayPart(innerModule.source)
                );
                innerModules.push({
                    index: innerModule.index,
                    file: innerFile,
                    bytes: Buffer.byteLength(innerModule.source),
                });
            }

            manifest.modules.push({
                id: modulePart.id,
                file: moduleFile,
                bytes: Buffer.byteLength(modulePart.source),
                innerModuleCount: innerModules.length,
                innerModules,
            });
            continue;
        }

        const moduleFile = path.join('modules', moduleFileName(modulePart.id));
        await fs.writeFile(
            path.join(partsDir, moduleFile),
            wrapObjectPart(modulePart.source)
        );
        manifest.modules.push({
            id: modulePart.id,
            file: moduleFile,
            bytes: Buffer.byteLength(modulePart.source),
        });
    }

    await fs.writeFile(
        path.join(partsDir, 'manifest.json'),
        `${JSON.stringify(manifest, null, 4)}\n`
    );

    return manifest;
}

export async function splitXMindChunk(
    sourcePath = defaultChunkPath,
    partsDir = defaultPartsDir
) {
    return writeXMindChunkParts(
        await fs.readFile(sourcePath, 'utf8'),
        path.basename(sourcePath),
        partsDir
    );
}

export async function assembleXMindChunkParts(partsDir = defaultPartsDir) {
    const manifestPath = path.join(partsDir, 'manifest.json');
    const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
    const prefix = unwrapStringPart(
        await fs.readFile(path.join(partsDir, manifest.prefix), 'utf8'),
        path.join(partsDir, manifest.prefix)
    );
    const suffix = unwrapStringPart(
        await fs.readFile(path.join(partsDir, manifest.suffix), 'utf8'),
        path.join(partsDir, manifest.suffix)
    );
    const moduleSources = [];

    for (const modulePart of manifest.modules) {
        let moduleSource = unwrapObjectPart(
            await fs.readFile(path.join(partsDir, modulePart.file), 'utf8'),
            path.join(partsDir, modulePart.file)
        );

        if (modulePart.innerModules) {
            if (!innerPlaceholderPattern.test(moduleSource)) {
                throw new Error(
                    `Inner module placeholder is missing for ${modulePart.id}.`
                );
            }

            const innerSources = [];
            for (const innerModule of modulePart.innerModules) {
                innerSources.push(
                    unwrapArrayPart(
                        await fs.readFile(
                            path.join(partsDir, innerModule.file),
                            'utf8'
                        ),
                        path.join(partsDir, innerModule.file)
                    )
                );
            }

            moduleSource = moduleSource.replace(innerPlaceholderPattern, () =>
                innerSources.join('\n')
            );
            if (moduleSource.includes('__XMIND_INNER_MODULES__')) {
                throw new Error(
                    `Inner module placeholder was not replaced for ${modulePart.id}.`
                );
            }
        }

        moduleSources.push(moduleSource);
    }

    return `${prefix}${moduleSources.join('\n')}${suffix}`;
}

function countTopModules(source) {
    return findModuleStarts(source, topModulePattern).length;
}

function hasTopModule(source, id) {
    return new RegExp(`\\n\\s*${id}: function \\(`).test(source);
}

function printCheck(name, pass) {
    if (pass) {
        console.log(`PASS ${name}`);
        return;
    }

    console.error(`FAIL ${name}`);
}

export async function checkXMindChunkParts(partsDir = defaultPartsDir) {
    const manifest = JSON.parse(
        await fs.readFile(path.join(partsDir, 'manifest.json'), 'utf8')
    );
    const assembled = await assembleXMindChunkParts(partsDir);
    const shareEmbed = await fs.readFile(shareEmbedPath, 'utf8');
    const themeLoader = await fs.readFile(themeLoaderPath, 'utf8');
    const topModuleCount = countTopModules(assembled);
    const splitModule = manifest.modules.find(
        (modulePart) => modulePart.id === '73350'
    );
    const pointsOnPathModule = manifest.modules.find(
        (modulePart) => modulePart.id === '80930'
    );
    const pointsOnPathModuleSource = pointsOnPathModule
        ? await fs.readFile(
              path.join(partsDir, pointsOnPathModule.file),
              'utf8'
          )
        : '';
    const processModuleSource = await fs.readFile(
        path.join(partsDir, 'modules/073350/inner/0045.js'),
        'utf8'
    );
    const fileSaverModuleSource = await fs.readFile(
        path.join(partsDir, 'modules/073350/inner/0102.js'),
        'utf8'
    );

    const checks = [
        {
            name: 'monolithic Snowbrush chunk source is removed',
            pass: !(await exists(defaultChunkPath)),
        },
        {
            name: 'parts manifest declares chunk 73350',
            pass: manifest.chunkId === 73350,
        },
        {
            name: 'assembled chunk keeps webpack JSONP wrapper',
            pass:
                assembled.includes('self.webpackChunkmain_web_server') &&
                assembled.includes('[73350]'),
        },
        {
            name: 'assembled chunk keeps expected top-level module count',
            pass:
                topModuleCount === manifest.moduleCount &&
                topModuleCount === 75,
        },
        {
            name: 'assembled chunk keeps key top-level modules',
            pass: ['4954', '73350'].every((id) => hasTopModule(assembled, id)),
        },
        {
            name: 'split Snowbrush module keeps expected inner module count',
            pass:
                splitModule?.innerModuleCount === 167 &&
                splitModule.innerModules?.length === 167,
        },
        {
            name: 'assembled chunk replaces nested module placeholder',
            pass: !assembled.includes('__XMIND_INNER_MODULES__'),
        },
        {
            name: 'Snowbrush chunk delegates jQuery to package runtime',
            pass:
                !assembled.includes('jQuery JavaScript Library v3.7.0') &&
                assembled.includes('t.jQuery || t.$') &&
                assembled.includes(
                    'XMind viewer runtime requires package-provided jQuery.'
                ),
        },
        {
            name: 'Snowbrush chunk delegates Backbone to package runtime',
            pass:
                !assembled.includes("t.VERSION = '1.4.1'") &&
                assembled.includes('window.Backbone') &&
                assembled.includes(
                    'XMind viewer runtime requires package-provided Backbone.'
                ),
        },
        {
            name: 'Snowbrush chunk delegates Underscore to package runtime',
            pass:
                !assembled.includes("var r = '1.13.6'") &&
                !assembled.includes('de.VERSION = r') &&
                assembled.includes('window.__xmindPackageUnderscore') &&
                assembled.includes("Object.defineProperty(n, '__esModule'") &&
                assembled.includes("Object.defineProperty(n, 'default'") &&
                assembled.includes(
                    'XMind viewer runtime requires package-provided Underscore.'
                ),
        },
        {
            name: 'Snowbrush chunk delegates MobX to package runtime',
            pass:
                !assembled.includes('__mobxGlobals') &&
                !assembled.includes('mobxGuid') &&
                !assembled.includes(
                    'Find the full error at: https://github.com/mobxjs/mobx/blob/main/packages/mobx/src/errors.ts'
                ) &&
                assembled.includes('window.__xmindPackageMobX') &&
                assembled.includes("Object.defineProperty(n, '__esModule'") &&
                assembled.includes("'__esModule' !== e") &&
                assembled.includes(
                    'XMind viewer runtime requires package-provided MobX.'
                ),
        },
        {
            name: 'Snowbrush chunk delegates CryptoJS to package runtime',
            pass:
                !assembled.includes('CryptoJS core components') &&
                !assembled.includes('derived from CryptoJS.mode.CTR') &&
                !assembled.includes('Native crypto from window (Browser)') &&
                assembled.includes('window.__xmindPackageCryptoJS') &&
                assembled.includes(
                    'XMind viewer runtime requires package-provided CryptoJS.'
                ) &&
                assembled.includes(
                    'XMind viewer runtime CryptoJS is missing module 13214.'
                ),
        },
        {
            name: 'Snowbrush chunk delegates xmldom to package runtime',
            pass:
                !assembled.includes('[xmldom warning]') &&
                !assembled.includes('attribute equal must after attrName') &&
                !assembled.includes('unknow Class:') &&
                assembled.includes('window.__xmindPackageXmldom') &&
                assembled.includes(
                    'XMind viewer runtime requires package-provided xmldom.'
                ) &&
                assembled.includes(
                    'XMind viewer xmldom XMLReader is hidden behind the DOMParser bridge.'
                ),
        },
        {
            name: 'Snowbrush chunk delegates Buffer stack to package runtime',
            pass:
                !assembled.includes(
                    'The buffer module from node.js, for the browser.'
                ) &&
                !assembled.includes(
                    'Invalid string. Length must be a multiple of 4'
                ) &&
                !assembled.includes('ieee754. BSD-3-Clause License') &&
                assembled.includes('window.__xmindPackageBuffer') &&
                assembled.includes('window.__xmindPackageBase64Js') &&
                assembled.includes('window.__xmindPackageIeee754') &&
                assembled.includes('e.exports = Array.isArray') &&
                assembled.includes(
                    'XMind viewer runtime requires package-provided Buffer.'
                ),
        },
        {
            name: 'Snowbrush chunk delegates CommonMark to package runtime',
            pass:
                !assembled.includes('http://commonmark.org/xml/1.0') &&
                !assembled.includes('raw HTML omitted') &&
                assembled.includes('window.__xmindPackageCommonmark') &&
                assembled.includes(
                    'XMind viewer runtime requires package-provided CommonMark.'
                ) &&
                assembled.includes(
                    'XMind viewer CommonMark internal helper has moved to package runtime.'
                ),
        },
        {
            name: 'Snowbrush chunk delegates util and inherits to package runtime',
            pass:
                !assembled.includes('t.debuglog = function') &&
                !assembled.includes('t.inherits = i(9846)') &&
                !assembled.includes(
                    'function (e, t) {\n                  ((e.super_'
                ) &&
                assembled.includes('window.__xmindPackageUtil') &&
                assembled.includes('window.__xmindPackageInherits') &&
                assembled.includes(
                    'XMind viewer runtime requires package-provided util.'
                ) &&
                assembled.includes(
                    'XMind viewer runtime requires package-provided inherits.'
                ),
        },
        {
            name: 'Snowbrush nested bundle delegates process shim to package runtime',
            pass:
                !processModuleSource.includes(
                    'setTimeout has not been defined'
                ) &&
                !processModuleSource.includes(
                    'process.binding is not supported'
                ) &&
                !processModuleSource.includes(
                    'process.chdir is not supported'
                ) &&
                processModuleSource.includes('window.__xmindPackageProcess') &&
                processModuleSource.includes(
                    'XMind viewer runtime requires package-provided process shim.'
                ),
        },
        {
            name: 'Snowbrush nested bundle delegates FileSaver.js to package runtime',
            pass:
                !fileSaverModuleSource.includes(
                    'purl.eligrey.com/github/FileSaver.js'
                ) &&
                !fileSaverModuleSource.includes('msSaveOrOpenBlob') &&
                !fileSaverModuleSource.includes('data:attachment/file;') &&
                fileSaverModuleSource.includes(
                    'window.__xmindPackageFileSaver'
                ) &&
                fileSaverModuleSource.includes(
                    'XMind viewer runtime requires package-provided FileSaver.js.'
                ),
        },
        {
            name: 'Snowbrush chunk delegates entities to package runtime',
            pass:
                !assembled.includes('var n = i(73267)') &&
                !assembled.includes("'&(?:'") &&
                !assembled.includes('http://mths.be/fromcodepoint') &&
                !assembled.includes('"andslope":"⩘"') &&
                assembled.includes('window.__xmindPackageEntities') &&
                assembled.includes(
                    'XMind viewer runtime requires package-provided entities.'
                ) &&
                assembled.includes(
                    'XMind viewer entities HTML5 map moved to package runtime.'
                ) &&
                assembled.includes(
                    'XMind viewer entities fromCodePoint helper moved to package runtime.'
                ),
        },
        {
            name: 'Snowbrush chunk delegates MathJax to package runtime',
            pass:
                !assembled.includes("version: '3.1.2'") &&
                !assembled.includes('input/tex-full') &&
                !assembled.includes('output/svg/fonts/tex.js') &&
                !assembled.includes('RegisterHTMLHandler') &&
                assembled.includes('window.__xmindPackageMathJax') &&
                assembled.includes(
                    'XMind viewer runtime requires package-provided MathJax.'
                ),
        },
        {
            name: 'Snowbrush chunk delegates svg-pathdata to package runtime',
            pass:
                !assembled.includes('COMMAND_ARG_COUNTS') &&
                !assembled.includes('Unexpected command type') &&
                !assembled.includes('Unterminated command at the path end.') &&
                assembled.includes('window.__xmindPackageSvgPathData') &&
                assembled.includes(
                    'XMind viewer runtime requires package-provided svg-pathdata.'
                ),
        },
        {
            name: 'Snowbrush chunk delegates points to package runtime',
            pass:
                !assembled.includes(
                    '`add` function must be passed a number as the second argument'
                ) &&
                !assembled.includes(
                    'Invalid attempt to spread non-iterable instance'
                ) &&
                !assembled.includes('segmentInterval') &&
                assembled.includes('window.__xmindPackagePoints') &&
                assembled.includes(
                    'XMind viewer runtime requires package-provided points.'
                ),
        },
        {
            name: 'Snowbrush chunk delegates points-on-path to package runtime',
            pass:
                !pointsOnPathModuleSource.includes('Path data ended short') &&
                !pointsOnPathModuleSource.includes('Param not a number:') &&
                !pointsOnPathModuleSource.includes('Bad segment:') &&
                pointsOnPathModuleSource.includes(
                    'window.__xmindPackagePointsOnPath'
                ) &&
                pointsOnPathModuleSource.includes(
                    'XMind viewer runtime requires package-provided points-on-path.'
                ),
        },
        {
            name: 'Snowbrush chunk delegates svg-points to package runtime',
            pass:
                !assembled.includes('Not a valid shape type') &&
                !assembled.includes('prop is required on a') &&
                !assembled.includes('prop must be one of circle') &&
                assembled.includes('window.__xmindPackageSvgPoints') &&
                assembled.includes(
                    'XMind viewer runtime requires package-provided svg-points.'
                ),
        },
        {
            name: 'Snowbrush chunk delegates path-browserify to package runtime',
            pass:
                !assembled.includes(
                    'Arguments to path.resolve must be strings'
                ) &&
                !assembled.includes('Arguments to path.join must be strings') &&
                assembled.includes('window.__xmindPackagePath') &&
                assembled.includes(
                    'XMind viewer runtime requires package-provided path-browserify.'
                ),
        },
        {
            name: 'Snowbrush chunk delegates Hammer.js to package runtime',
            pass:
                !assembled.includes('Hammer.JS - v2.0.7') &&
                assembled.includes('window.__xmindPackageHammer') &&
                assembled.includes(
                    'XMind viewer runtime requires package-provided Hammer.js.'
                ),
        },
        {
            name: 'share bundle delegates anime.js to package runtime',
            pass:
                !shareEmbed.includes("easing: 'easeOutElastic(1, .5)'") &&
                shareEmbed.includes('window.anime') &&
                shareEmbed.includes(
                    'XMind viewer runtime requires package-provided anime.js.'
                ),
        },
        {
            name: 'share bundle delegates axios to package runtime',
            pass:
                !shareEmbed.includes('s.CancelToken = r(94200)') &&
                !shareEmbed.includes('Embedded axios internal module 14224') &&
                shareEmbed.includes('window.axios') &&
                shareEmbed.includes(
                    'XMind viewer runtime requires package-provided axios.'
                ) &&
                shareEmbed.includes(
                    'Embedded axios internal module 96495 was removed'
                ),
        },
        {
            name: 'share bundle delegates vue-style-loader to package runtime',
            pass:
                !shareEmbed.includes(
                    'vue-style-loader cannot be used in a non-browser environment'
                ) &&
                !shareEmbed.includes('data-vue-ssr-id') &&
                shareEmbed.includes('window.__xmindPackageVueStyleLoader') &&
                shareEmbed.includes(
                    'XMind viewer runtime requires package-provided vue-style-loader.'
                ),
        },
        {
            name: 'share bundle keeps minimal browser process shim for Snowbrush',
            pass:
                shareEmbed.includes("platform: 'browser'") &&
                shareEmbed.includes('nextTick: function') &&
                shareEmbed.includes('process.chdir is not supported.'),
        },
        {
            name: 'central topic compatibility fix lives in source theme loader',
            pass:
                !shareEmbed.includes('xmindNormalizeLocalOpenFile') &&
                !shareEmbed.includes('xmindShouldNormalizeCentralTopicColor') &&
                !shareEmbed.includes("['fo:color'] = '#000000'") &&
                themeLoader.includes(
                    'normalizeInvisibleCentralTopicTextColor'
                ) &&
                themeLoader.includes('theme?.centralTopic?.properties') &&
                themeLoader.includes(
                    'theme?.topicThemeMap?.centralTopic?.properties'
                ) &&
                themeLoader.includes(
                    "properties['fo:color'] = CENTRAL_TOPIC_FALLBACK_TEXT_COLOR"
                ),
        },
    ];

    for (const check of checks) {
        printCheck(check.name, check.pass);
    }

    return checks.every((check) => check.pass);
}

async function runCli() {
    const command = process.argv[2] || 'check';

    if (command === 'split') {
        const sourcePath = process.argv[3]
            ? path.resolve(process.argv[3])
            : defaultChunkPath;
        const partsDir = process.argv[4]
            ? path.resolve(process.argv[4])
            : defaultPartsDir;
        if (!(await exists(sourcePath))) {
            throw new Error(
                `Source chunk not found: ${relativeToProject(sourcePath)}. Pass a downloaded 73350.03dd088904.js path, for example: pnpm split:xmind-chunk /tmp/73350.03dd088904.js`
            );
        }

        const manifest = await splitXMindChunk(sourcePath, partsDir);
        console.log(
            `Split ${manifest.sourceFile} into ${manifest.moduleCount} top-level modules at ${relativeToProject(partsDir)}.`
        );
        return;
    }

    if (command === 'assemble') {
        const partsDir = process.argv[3]
            ? path.resolve(process.argv[3])
            : defaultPartsDir;
        process.stdout.write(await assembleXMindChunkParts(partsDir));
        return;
    }

    if (command === 'check') {
        const partsDir = process.argv[3]
            ? path.resolve(process.argv[3])
            : defaultPartsDir;
        const ok = await checkXMindChunkParts(partsDir);
        if (!ok) {
            process.exit(1);
        }
        return;
    }

    throw new Error(`Unknown command: ${command}`);
}

if (
    process.argv[1] &&
    path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
    runCli().catch((error) => {
        console.error(error);
        process.exit(1);
    });
}
