import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');
const pluginId = 'xmind-maps';
const defaultVaultPath =
    '/Users/yuanzhixiang/workspace/obsidian-vault/Max';
const previewMode = process.env.OBSIDIAN_PREVIEW_MODE ?? 'link';
const targetPluginDir =
    process.env.OBSIDIAN_PLUGIN_DIR ??
    path.join(
        process.env.OBSIDIAN_VAULT ?? defaultVaultPath,
        '.obsidian',
        'plugins',
        pluginId
    );
const releaseFiles = ['main.js', 'manifest.json', 'styles.css'];

if (previewMode !== 'link' && previewMode !== 'copy') {
    throw new Error(
        `Unsupported OBSIDIAN_PREVIEW_MODE: ${previewMode}. Use "link" or "copy".`
    );
}

async function pathExists(filePath) {
    try {
        await fs.lstat(filePath);
        return true;
    } catch (error) {
        if (error?.code === 'ENOENT') {
            return false;
        }
        throw error;
    }
}

async function assertCanReplace(targetPath) {
    try {
        const stat = await fs.lstat(targetPath);
        if (stat.isDirectory() && !stat.isSymbolicLink()) {
            throw new Error(`Refusing to replace directory: ${targetPath}`);
        }
    } catch (error) {
        if (error?.code === 'ENOENT') {
            return;
        }
        throw error;
    }
}

async function replaceWithSymlink(sourcePath, targetPath) {
    await assertCanReplace(targetPath);
    await fs.rm(targetPath, { force: true });
    await fs.symlink(sourcePath, targetPath);
}

async function replaceWithCopy(sourcePath, targetPath) {
    await assertCanReplace(targetPath);
    await fs.rm(targetPath, { force: true });
    await fs.copyFile(sourcePath, targetPath);
}

async function replacePreviewFile(sourcePath, targetPath) {
    if (previewMode === 'copy') {
        await replaceWithCopy(sourcePath, targetPath);
        return;
    }

    await replaceWithSymlink(sourcePath, targetPath);
}

async function touch(filePath) {
    const now = new Date();
    await fs.utimes(filePath, now, now);
}

async function touchSymlink(filePath) {
    if (typeof fs.lutimes !== 'function') {
        return;
    }

    const now = new Date();
    await fs.lutimes(filePath, now, now);
}

const manifestPath = path.join(distDir, 'manifest.json');
const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
if (manifest.id !== pluginId) {
    throw new Error(
        `Unexpected manifest id "${manifest.id}". Expected "${pluginId}".`
    );
}

for (const fileName of releaseFiles) {
    await fs.access(path.join(distDir, fileName));
}

await fs.mkdir(targetPluginDir, { recursive: true });

for (const fileName of releaseFiles) {
    await replacePreviewFile(
        path.join(distDir, fileName),
        path.join(targetPluginDir, fileName)
    );
}

const sourceHotreloadPath = path.join(projectRoot, '.hotreload');
if (!(await pathExists(sourceHotreloadPath))) {
    await fs.writeFile(sourceHotreloadPath, '');
}

await replacePreviewFile(
    sourceHotreloadPath,
    path.join(targetPluginDir, '.hotreload')
);
await touch(sourceHotreloadPath);
await touchSymlink(path.join(targetPluginDir, '.hotreload'));

console.log(
    `Preview ${previewMode === 'copy' ? 'copied' : 'linked'} ${manifest.id}@${manifest.version} to ${targetPluginDir}`
);
