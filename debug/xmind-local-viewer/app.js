const viewerHost = document.querySelector('#viewerHost');
const eventLog = document.querySelector('#eventLog');
const statusDot = document.querySelector('#statusDot');
const fileLabel = document.querySelector('#fileLabel');
const fileInput = document.querySelector('#fileInput');
const openFileButton = document.querySelector('#openFileButton');
const reloadButton = document.querySelector('#reloadButton');
const fitButton = document.querySelector('#fitButton');
const zoomButton = document.querySelector('#zoomButton');
const zoomInput = document.querySelector('#zoomInput');
const sheetSelect = document.querySelector('#sheetSelect');
const clearLogButton = document.querySelector('#clearLogButton');

let viewer = null;
let loadRun = 0;
let activeFileSource = {
    kind: 'server',
    label: '默认调试文件',
};

function setStatus(status) {
    statusDot.classList.toggle('is-ready', status === 'ready');
    statusDot.classList.toggle('is-error', status === 'error');
}

function log(type, payload) {
    const item = document.createElement('li');
    const label = document.createElement('strong');
    label.textContent = type;
    item.append(label);

    if (payload !== undefined) {
        item.append(document.createTextNode(` ${formatPayload(payload)}`));
    }

    eventLog.prepend(item);
}

function formatPayload(payload) {
    if (payload instanceof ArrayBuffer) {
        return `ArrayBuffer(${payload.byteLength})`;
    }
    if (payload && typeof payload === 'object') {
        try {
            return JSON.stringify(payload);
        } catch {
            return String(payload);
        }
    }
    return String(payload);
}

function updateSheets(sheets) {
    sheetSelect.replaceChildren();
    if (!Array.isArray(sheets) || sheets.length === 0) {
        const option = document.createElement('option');
        option.value = '';
        option.textContent = '无 sheet 数据';
        sheetSelect.appendChild(option);
        return;
    }

    for (const sheet of sheets) {
        const option = document.createElement('option');
        option.value = sheet.id;
        option.textContent = sheet.title || sheet.id;
        sheetSelect.appendChild(option);
    }
}

function setActiveFileSource(source) {
    activeFileSource = source;
    fileLabel.textContent = source.label;
}

async function loadDebugConfig() {
    const response = await fetch('/debug-config.json', {
        cache: 'no-store',
    });
    if (!response.ok) {
        throw new Error(`读取调试配置失败：HTTP ${response.status}`);
    }

    const config = await response.json();
    setActiveFileSource({
        kind: 'server',
        label: String(config.xmindFile || '默认调试文件'),
    });
}

function formatFileLabel(file) {
    if (file.name) {
        return file.name;
    }

    return '本地选择的 XMind 文件';
}

async function readActiveFile(source, runId) {
    if (source.kind === 'local') {
        const file = await source.file.arrayBuffer();
        log('local-file-read', {
            name: formatFileLabel(source.file),
            bytes: file.byteLength,
        });
        return file;
    }

    const response = await fetch(`/file.xmind?run=${runId}`, {
        cache: 'no-store',
    });
    if (!response.ok) {
        throw new Error(`读取 XMind 文件失败：HTTP ${response.status}`);
    }
    const file = await response.arrayBuffer();
    log('file-read', file);
    return file;
}

async function preprocessLocalXMindFile(file) {
    if (!window.XMindDebugViewer) {
        throw new Error('源码 viewer 调试运行时未加载');
    }

    const loaded = await window.XMindDebugViewer.loadLocalXMindFile(file);
    if (loaded.binary !== file) {
        log('file-preprocessed', {
            before: file.byteLength,
            after: loaded.binary.byteLength,
        });
    }
    return loaded.binary;
}

function handleViewerStateChange(state, event) {
    log(event.name, event.payload);
    if (event.name === 'sheets-load') {
        updateSheets(event.payload);
    }
    if (event.name === 'sheet-switch') {
        sheetSelect.value = String(event.payload || '');
    }
    if (event.name === 'zoom-change') {
        zoomInput.value = Math.round(Number(event.payload) || 100);
    }
    if (event.name === 'map-ready') {
        setStatus(state.isReady ? 'ready' : 'error');
    }
}

async function loadViewer() {
    const runId = ++loadRun;
    const source = activeFileSource;
    viewer?.destroy();
    viewer = null;
    setStatus('loading');
    fileLabel.textContent = source.label;
    log('load-start', {
        source: source.kind,
        label: source.label,
    });

    const file = await readActiveFile(source, runId);
    const loadedFile = await preprocessLocalXMindFile(file);

    viewer = new window.XMindDebugViewer.XMindRenderAdapter({
        el: viewerHost,
        file: loadedFile,
        onStateChange: handleViewerStateChange,
        onError(error) {
            setStatus('error');
            log('viewer-error', error && error.message ? error.message : error);
        },
    });
    log('open-file-sent');
}

async function guarded(action) {
    try {
        await action();
    } catch (error) {
        setStatus('error');
        log('error', error && error.message ? error.message : String(error));
        console.error(error);
    }
}

openFileButton.addEventListener('click', () => {
    fileInput.click();
});
fileInput.addEventListener('change', () => {
    const file = fileInput.files && fileInput.files[0];
    if (!file) {
        return;
    }

    setActiveFileSource({
        kind: 'local',
        file,
        label: formatFileLabel(file),
    });
    fileInput.value = '';
    guarded(loadViewer);
});
reloadButton.addEventListener('click', () => guarded(loadViewer));
fitButton.addEventListener('click', () => guarded(() => viewer?.fitMap()));
zoomButton.addEventListener('click', () =>
    guarded(() => viewer?.zoom(Number(zoomInput.value)))
);
sheetSelect.addEventListener('change', () => {
    if (sheetSelect.value) {
        guarded(() => viewer?.switchSheet(sheetSelect.value));
    }
});
clearLogButton.addEventListener('click', () => {
    eventLog.replaceChildren();
});

window.addEventListener('error', (event) => {
    setStatus('error');
    log('window-error', event.message);
});

window.addEventListener('unhandledrejection', (event) => {
    setStatus('error');
    log(
        'unhandled-rejection',
        event.reason && event.reason.message
            ? event.reason.message
            : event.reason
    );
});

guarded(async () => {
    await loadDebugConfig();
    await loadViewer();
});
