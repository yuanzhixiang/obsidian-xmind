import { spawnSync } from 'node:child_process';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');
const releaseDir = path.join(projectRoot, 'release');
const manifestPath = path.join(distDir, 'manifest.json');

const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
const archiveName = `${manifest.id}-${manifest.version}.zip`;
const archivePath = path.join(releaseDir, archiveName);
const requiredEntries = [
    'main.js',
    'manifest.json',
    'styles.css',
];

for (const entry of requiredEntries) {
    await fs.access(path.join(distDir, entry));
}

await fs.mkdir(releaseDir, { recursive: true });
await fs.rm(archivePath, { force: true });

const result = spawnSync(
    'zip',
    [
        '-qr',
        archivePath,
        'main.js',
        'manifest.json',
        'styles.css',
    ],
    {
        cwd: distDir,
        stdio: 'inherit',
    }
);

if (result.error) {
    throw result.error;
}

if (result.status !== 0) {
    throw new Error(`zip exited with status ${result.status}`);
}

console.log(`Created ${archivePath}`);
