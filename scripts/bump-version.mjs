import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

const packagePath = path.join(projectRoot, 'package.json');
const manifestPath = path.join(projectRoot, 'manifest.json');

async function readJson(filePath) {
    return JSON.parse(await fs.readFile(filePath, 'utf8'));
}

function bumpPatch(version) {
    const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(version);
    if (!match) {
        throw new Error(`Unsupported version format: ${version}`);
    }

    const [, major, minor, patch] = match;
    return `${major}.${minor}.${Number(patch) + 1}`;
}

async function writeJson(filePath, data) {
    await fs.writeFile(filePath, `${JSON.stringify(data, null, 4)}\n`);
}

const [packageJson, manifestJson] = await Promise.all([
    readJson(packagePath),
    readJson(manifestPath),
]);

if (packageJson.version !== manifestJson.version) {
    throw new Error(
        `Version mismatch: package.json is ${packageJson.version}, manifest.json is ${manifestJson.version}`
    );
}

const nextVersion = bumpPatch(packageJson.version);
packageJson.version = nextVersion;
manifestJson.version = nextVersion;

await Promise.all([
    writeJson(packagePath, packageJson),
    writeJson(manifestPath, manifestJson),
]);

console.log(`Version bumped to ${nextVersion}`);
