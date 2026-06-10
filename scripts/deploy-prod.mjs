import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

function run(command, args, options = {}) {
    const result = spawnSync(command, args, {
        cwd: projectRoot,
        stdio: 'inherit',
        shell: false,
        ...options,
    });

    if (result.error) {
        throw result.error;
    }

    if (result.status !== 0) {
        throw new Error(`${command} ${args.join(' ')} failed`);
    }
}

function output(command, args) {
    const result = spawnSync(command, args, {
        cwd: projectRoot,
        encoding: 'utf8',
        shell: false,
    });

    if (result.error) {
        throw result.error;
    }

    if (result.status !== 0) {
        throw new Error(result.stderr.trim() || `${command} failed`);
    }

    return result.stdout.trim();
}

async function readJson(relativePath) {
    return JSON.parse(await fs.readFile(path.join(projectRoot, relativePath), 'utf8'));
}

function ensureCleanWorkingTree() {
    const status = output('git', ['status', '--porcelain']);
    if (!status) {
        return;
    }

    throw new Error(
        [
            'Working tree is not clean. Commit or stash current changes before deploying.',
            status,
        ].join('\n')
    );
}

function ensureTagDoesNotExist(version) {
    const tagPath = path.join(projectRoot, '.git', 'refs', 'tags', version);
    if (existsSync(tagPath)) {
        throw new Error(`Tag ${version} already exists locally.`);
    }
}

async function getVersion() {
    const [packageJson, manifestJson] = await Promise.all([
        readJson('package.json'),
        readJson('manifest.json'),
    ]);

    if (packageJson.version !== manifestJson.version) {
        throw new Error(
            `Version mismatch: package.json is ${packageJson.version}, manifest.json is ${manifestJson.version}`
        );
    }

    return packageJson.version;
}

ensureCleanWorkingTree();

run('pnpm', ['check:local-viewer']);
run('pnpm', ['lint']);
run('node', ['scripts/bump-version.mjs']);

const version = await getVersion();
ensureTagDoesNotExist(version);

run('pnpm', ['package']);
run('git', ['add', 'package.json', 'manifest.json']);
run('git', ['commit', '-m', `chore: release ${version}`]);
run('git', ['tag', version]);
run('git', ['push', 'origin', 'HEAD']);
run('git', ['push', 'origin', `refs/tags/${version}`]);

console.log(`Deployed ${version}`);
