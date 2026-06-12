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

const requestedLocale = new URLSearchParams(window.location.search).get('lang');
const locale = requestedLocale
    ? window.XMindDebugViewer?.normalizeXMindLocale?.(requestedLocale) || 'en'
    : window.XMindDebugViewer?.detectXMindLocale?.(
          undefined,
          window,
          document
      ) || 'en';
const translator = window.XMindDebugViewer?.createXMindTranslator?.(locale);

function t(key, params) {
    return translator?.t(key, params) || key;
}

function applyTranslations() {
    document.documentElement.lang = locale;
    document.title = t('appTitle');

    for (const element of document.querySelectorAll('[data-i18n]')) {
        element.textContent = t(element.dataset.i18n);
    }

    for (const element of document.querySelectorAll('[data-i18n-placeholder]')) {
        element.setAttribute(
            'placeholder',
            t(element.dataset.i18nPlaceholder)
        );
    }

    for (const element of document.querySelectorAll('[data-i18n-aria-label]')) {
        element.setAttribute(
            'aria-label',
            t(element.dataset.i18nAriaLabel)
        );
    }
}

let viewer = null;
let loadRun = 0;
let activeFileSource = {
    kind: 'server',
    label: t('sourceFileDefault'),
};

applyTranslations();

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
        option.textContent = t('emptySheetOption');
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
        throw new Error(t('readConfigError', { status: response.status }));
    }

    const config = await response.json();
    setActiveFileSource({
        kind: 'server',
        label: String(config.xmindFile || t('sourceFileDefault')),
    });
}

function formatFileLabel(file) {
    if (file.name) {
        return file.name;
    }

    return t('localFileFallback');
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
        throw new Error(t('fileReadError', { status: response.status }));
    }
    const file = await response.arrayBuffer();
    log('file-read', file);
    return file;
}

async function preprocessLocalXMindFile(file) {
    if (!window.XMindDebugViewer) {
        throw new Error(t('loadRuntimeError'));
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
        locale,
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
