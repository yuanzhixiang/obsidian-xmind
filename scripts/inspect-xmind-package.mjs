#!/usr/bin/env node
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { strFromU8, unzipSync } from 'fflate';

const jsonFileNames = [
    'content.json',
    'metadata.json',
    'manifest.json',
];

const topicFeatureKeys = [
    'branch',
    'children',
    'extensions',
    'href',
    'image',
    'labels',
    'markerRefs',
    'markers',
    'notes',
    'numbering',
    'position',
    'structureClass',
    'style',
    'title',
];

function usage() {
    return [
        'Usage:',
        '  pnpm inspect:xmind [--json] [--include-titles] <file.xmind> [...file.xmind]',
        '',
        'Examples:',
        '  pnpm inspect:xmind ~/Desktop/map.xmind',
        '  pnpm inspect:xmind --json ~/Desktop/map.xmind',
    ].join('\n');
}

function parseArgs(argv) {
    const options = {
        json: false,
        includeTitles: false,
        files: [],
    };

    for (const arg of argv) {
        if (arg === '--json') {
            options.json = true;
            continue;
        }

        if (arg === '--include-titles') {
            options.includeTitles = true;
            continue;
        }

        if (arg === '-h' || arg === '--help') {
            console.log(usage());
            process.exit(0);
        }

        options.files.push(arg);
    }

    if (options.files.length === 0) {
        throw new Error('Missing .xmind file path.');
    }

    return options;
}

function isRecord(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function createCounter() {
    return new Map();
}

function addCount(counter, key, amount = 1) {
    if (!key) {
        return;
    }
    counter.set(key, (counter.get(key) || 0) + amount);
}

function counterToObject(counter) {
    return Object.fromEntries(
        [...counter.entries()].sort(([left], [right]) =>
            left.localeCompare(right)
        )
    );
}

function normalizeSheets(content) {
    if (Array.isArray(content)) {
        return content;
    }

    if (!isRecord(content)) {
        return [];
    }

    if (Array.isArray(content.sheets)) {
        return content.sheets;
    }

    if (isRecord(content.workbook) && Array.isArray(content.workbook.sheets)) {
        return content.workbook.sheets;
    }

    return [];
}

function readZipText(entries, fileName) {
    const entry = entries[fileName];
    return entry ? strFromU8(entry) : null;
}

function parseJsonEntry(entries, fileName) {
    const text = readZipText(entries, fileName);
    if (!text) {
        return {
            exists: false,
            bytes: 0,
            keys: [],
            value: null,
            error: null,
        };
    }

    try {
        const value = JSON.parse(text);
        return {
            exists: true,
            bytes: entries[fileName].byteLength,
            keys: isRecord(value) ? Object.keys(value).sort() : [],
            value,
            error: null,
        };
    } catch (error) {
        return {
            exists: true,
            bytes: entries[fileName].byteLength,
            keys: [],
            value: null,
            error: error instanceof Error ? error.message : String(error),
        };
    }
}

function normalizeChildBuckets(topic) {
    if (!isRecord(topic.children)) {
        return [];
    }

    return Object.entries(topic.children)
        .filter(([, value]) => Array.isArray(value))
        .map(([key, value]) => [key, value]);
}

function walkTopic(topic, depth, visitor) {
    if (!isRecord(topic)) {
        return;
    }

    visitor(topic, depth);

    for (const [, children] of normalizeChildBuckets(topic)) {
        for (const child of children) {
            walkTopic(child, depth + 1, visitor);
        }
    }
}

function collectTopicStats(sheets, includeTitles) {
    const topicKeys = createCounter();
    const featureKeys = createCounter();
    const childBuckets = createCounter();
    const branchValues = createCounter();
    const structureClasses = createCounter();
    const styleIds = createCounter();
    const topicSamples = [];
    let topicCount = 0;
    let foldedTopicCount = 0;
    let maxDepth = 0;

    for (const sheet of sheets) {
        if (!isRecord(sheet)) {
            continue;
        }

        walkTopic(sheet.rootTopic, 0, (topic, depth) => {
            topicCount += 1;
            maxDepth = Math.max(maxDepth, depth);

            for (const key of Object.keys(topic)) {
                addCount(topicKeys, key);
            }

            for (const key of topicFeatureKeys) {
                if (Object.prototype.hasOwnProperty.call(topic, key)) {
                    addCount(featureKeys, key);
                }
            }

            for (const [bucketName, children] of normalizeChildBuckets(topic)) {
                addCount(childBuckets, bucketName, children.length);
            }

            if (typeof topic.branch === 'string') {
                addCount(branchValues, topic.branch);
                if (topic.branch === 'folded') {
                    foldedTopicCount += 1;
                }
            }

            if (typeof topic.structureClass === 'string') {
                addCount(structureClasses, topic.structureClass);
            }

            if (typeof topic.style === 'string') {
                addCount(styleIds, topic.style);
            }

            if (includeTitles && topicSamples.length < 12) {
                topicSamples.push({
                    id: typeof topic.id === 'string' ? topic.id : null,
                    title: typeof topic.title === 'string' ? topic.title : null,
                    depth,
                });
            }
        });
    }

    return {
        count: topicCount,
        foldedTopicCount,
        maxDepth,
        keys: counterToObject(topicKeys),
        featureKeys: counterToObject(featureKeys),
        childBuckets: counterToObject(childBuckets),
        branchValues: counterToObject(branchValues),
        structureClasses: counterToObject(structureClasses),
        styleIds: counterToObject(styleIds),
        samples: includeTitles ? topicSamples : undefined,
    };
}

function summarizeRelationships(sheet) {
    if (!isRecord(sheet)) {
        return 0;
    }

    if (Array.isArray(sheet.relationships)) {
        return sheet.relationships.length;
    }

    if (isRecord(sheet.relationships) && Array.isArray(sheet.relationships.items)) {
        return sheet.relationships.items.length;
    }

    return 0;
}

function summarizeBoundariesAndSummaries(sheets) {
    let relationships = 0;
    let boundaries = 0;
    let summaries = 0;

    for (const sheet of sheets) {
        if (!isRecord(sheet)) {
            continue;
        }

        relationships += summarizeRelationships(sheet);

        walkTopic(sheet.rootTopic, 0, (topic) => {
            if (Array.isArray(topic.boundaries)) {
                boundaries += topic.boundaries.length;
            }

            if (Array.isArray(topic.summaries)) {
                summaries += topic.summaries.length;
            }
        });
    }

    return { relationships, boundaries, summaries };
}

function collectSheetStats(sheets, includeTitles) {
    const sheetKeys = createCounter();
    const structureClasses = createCounter();

    return {
        count: sheets.length,
        sheets: sheets.map((sheet, index) => {
            if (!isRecord(sheet)) {
                return {
                    index,
                    valid: false,
                };
            }

            for (const key of Object.keys(sheet)) {
                addCount(sheetKeys, key);
            }

            const rootTopic = isRecord(sheet.rootTopic) ? sheet.rootTopic : {};
            if (typeof rootTopic.structureClass === 'string') {
                addCount(structureClasses, rootTopic.structureClass);
            }

            return {
                index,
                valid: true,
                id: typeof sheet.id === 'string' ? sheet.id : null,
                title: includeTitles && typeof sheet.title === 'string'
                    ? sheet.title
                    : undefined,
                rootTopicId:
                    typeof rootTopic.id === 'string' ? rootTopic.id : null,
                rootStructureClass:
                    typeof rootTopic.structureClass === 'string'
                        ? rootTopic.structureClass
                        : null,
            };
        }),
        keys: counterToObject(sheetKeys),
        rootStructureClasses: counterToObject(structureClasses),
    };
}

function collectStyleStats(content) {
    const keys = createCounter();
    const styleIds = createCounter();

    function visit(value) {
        if (Array.isArray(value)) {
            for (const item of value) {
                visit(item);
            }
            return;
        }

        if (!isRecord(value)) {
            return;
        }

        for (const key of Object.keys(value)) {
            if (key.toLowerCase().includes('style')) {
                addCount(keys, key);
            }
        }

        if (typeof value.id === 'string' && isRecord(value.properties)) {
            addCount(styleIds, value.id);
        }

        for (const item of Object.values(value)) {
            visit(item);
        }
    }

    visit(content);

    return {
        keys: counterToObject(keys),
        ids: counterToObject(styleIds),
    };
}

async function inspectXMindFile(filePath, options) {
    const absolutePath = path.resolve(filePath);
    const bytes = await fs.readFile(absolutePath);
    const entries = unzipSync(new Uint8Array(bytes));
    const entryNames = Object.keys(entries).sort();
    const jsonEntries = Object.fromEntries(
        jsonFileNames.map((fileName) => [fileName, parseJsonEntry(entries, fileName)])
    );
    const content = jsonEntries['content.json'].value;
    const sheets = normalizeSheets(content);
    const contentXml = entries['content.xml'];
    const resourceEntries = entryNames.filter((entryName) =>
        entryName.startsWith('resources/')
    );
    const thumbnailEntries = entryNames.filter((entryName) =>
        entryName.startsWith('Thumbnails/')
    );

    return {
        file: absolutePath,
        bytes: bytes.byteLength,
        entries: entryNames.map((entryName) => ({
            name: entryName,
            bytes: entries[entryName].byteLength,
        })),
        package: {
            hasContentJson: Boolean(entries['content.json']),
            hasContentXml: Boolean(contentXml),
            contentXmlBytes: contentXml?.byteLength || 0,
            resourceCount: resourceEntries.length,
            thumbnailCount: thumbnailEntries.length,
        },
        jsonEntries: Object.fromEntries(
            Object.entries(jsonEntries).map(([fileName, entry]) => [
                fileName,
                {
                    exists: entry.exists,
                    bytes: entry.bytes,
                    keys: entry.keys,
                    error: entry.error,
                },
            ])
        ),
        sheets: collectSheetStats(sheets, options.includeTitles),
        topics: collectTopicStats(sheets, options.includeTitles),
        objects: summarizeBoundariesAndSummaries(sheets),
        styles: collectStyleStats(content),
    };
}

function formatObjectCounts(counts) {
    const entries = Object.entries(counts);
    if (entries.length === 0) {
        return 'none';
    }

    return entries.map(([key, count]) => `${key}=${count}`).join(', ');
}

function printReport(report) {
    console.log(`\n${report.file}`);
    console.log(`  package bytes: ${report.bytes}`);
    console.log(
        `  entries: ${report.entries.length}, resources: ${report.package.resourceCount}, thumbnails: ${report.package.thumbnailCount}`
    );
    console.log(
        `  content: json=${report.package.hasContentJson ? 'yes' : 'no'}, xml=${report.package.hasContentXml ? `${report.package.contentXmlBytes} bytes` : 'no'}`
    );
    console.log(`  sheets: ${report.sheets.count}`);
    console.log(`  sheet keys: ${formatObjectCounts(report.sheets.keys)}`);
    console.log(
        `  root structures: ${formatObjectCounts(report.sheets.rootStructureClasses)}`
    );
    console.log(
        `  topics: ${report.topics.count}, folded: ${report.topics.foldedTopicCount}, max depth: ${report.topics.maxDepth}`
    );
    console.log(`  topic keys: ${formatObjectCounts(report.topics.keys)}`);
    console.log(
        `  topic feature keys: ${formatObjectCounts(report.topics.featureKeys)}`
    );
    console.log(
        `  child buckets: ${formatObjectCounts(report.topics.childBuckets)}`
    );
    console.log(
        `  branch values: ${formatObjectCounts(report.topics.branchValues)}`
    );
    console.log(
        `  topic structures: ${formatObjectCounts(report.topics.structureClasses)}`
    );
    console.log(
        `  objects: relationships=${report.objects.relationships}, boundaries=${report.objects.boundaries}, summaries=${report.objects.summaries}`
    );
    console.log(`  style keys: ${formatObjectCounts(report.styles.keys)}`);
}

try {
    const options = parseArgs(process.argv.slice(2));
    const reports = [];

    for (const file of options.files) {
        reports.push(await inspectXMindFile(file, options));
    }

    if (options.json) {
        console.log(JSON.stringify(reports, null, 2));
    } else {
        for (const report of reports) {
            printReport(report);
        }
    }
} catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    console.error('');
    console.error(usage());
    process.exitCode = 1;
}
