const iframe = document.querySelector("#viewerFrame");
const eventLog = document.querySelector("#eventLog");
const statusDot = document.querySelector("#statusDot");
const reloadButton = document.querySelector("#reloadButton");
const fitButton = document.querySelector("#fitButton");
const zoomButton = document.querySelector("#zoomButton");
const zoomInput = document.querySelector("#zoomInput");
const sheetSelect = document.querySelector("#sheetSelect");
const clearLogButton = document.querySelector("#clearLogButton");

let port = null;
let replyIndex = 0;
let loadRun = 0;

function setStatus(status) {
  statusDot.classList.toggle("is-ready", status === "ready");
  statusDot.classList.toggle("is-error", status === "error");
}

function log(type, payload) {
  const item = document.createElement("li");
  const body = payload === undefined ? "" : ` ${formatPayload(payload)}`;
  item.innerHTML = `<strong>${escapeHtml(type)}</strong>${escapeHtml(body)}`;
  eventLog.prepend(item);
}

function formatPayload(payload) {
  if (payload instanceof ArrayBuffer) {
    return `ArrayBuffer(${payload.byteLength})`;
  }
  if (payload && typeof payload === "object") {
    try {
      return JSON.stringify(payload);
    } catch {
      return String(payload);
    }
  }
  return String(payload);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function updateSheets(sheets) {
  sheetSelect.innerHTML = "";
  if (!Array.isArray(sheets) || sheets.length === 0) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "无 sheet 数据";
    sheetSelect.appendChild(option);
    return;
  }

  for (const sheet of sheets) {
    const option = document.createElement("option");
    option.value = sheet.id;
    option.textContent = sheet.title || sheet.id;
    sheetSelect.appendChild(option);
  }
}

function handlePortMessage(event) {
  const [message, eventName, payload] = event.data || [];
  if (message !== "event") {
    return;
  }

  log(eventName, payload);
  if (eventName === "sheets-load") {
    updateSheets(payload);
  }
  if (eventName === "sheet-switch") {
    sheetSelect.value = payload;
  }
  if (eventName === "zoom-change") {
    zoomInput.value = Math.round(Number(payload) || 100);
  }
  if (eventName === "map-ready") {
    setStatus("ready");
  }
}

function emit(command, payload) {
  if (!port) {
    return Promise.reject(new Error("MessageChannel 尚未建立"));
  }

  const replyEvent = `xmind-debug#${replyIndex++}`;
  return new Promise((resolve, reject) => {
    const timeout = window.setTimeout(() => {
      port.removeEventListener("message", handler);
      reject(new Error(`${command} 等待响应超时`));
    }, 30000);

    const handler = (event) => {
      const [message, replyPayload] = event.data || [];
      if (message !== replyEvent) {
        return;
      }
      window.clearTimeout(timeout);
      port.removeEventListener("message", handler);
      resolve(replyPayload);
    };

    port.addEventListener("message", handler);
    port.postMessage([command, payload, replyEvent]);
  });
}

function setupChannel(runId) {
  return new Promise((resolve, reject) => {
    const channel = new MessageChannel();
    const timeout = window.setTimeout(() => {
      reject(new Error("iframe 未返回 channel-ready"));
    }, 30000);

    iframe.addEventListener("load", () => {
      if (runId !== loadRun) {
        return;
      }

      channel.port1.start();
      const readyHandler = (event) => {
        const [message] = event.data || [];
        if (message !== "channel-ready") {
          return;
        }
        window.clearTimeout(timeout);
        channel.port1.removeEventListener("message", readyHandler);
        channel.port1.addEventListener("message", handlePortMessage);
        port = channel.port1;
        log("channel-ready");
        resolve();
      };

      channel.port1.addEventListener("message", readyHandler);
      iframe.contentWindow.postMessage(
        ["setup-channel", { port: channel.port2 }],
        window.location.origin,
        [channel.port2]
      );
    }, { once: true });
  });
}

async function loadViewer() {
  const runId = ++loadRun;
  port = null;
  setStatus("loading");
  log("load-start");

  iframe.src = `/embed-viewer-local.html?run=${runId}`;
  await setupChannel(runId);

  const response = await fetch(`/file.xmind?run=${runId}`, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`读取 XMind 文件失败：HTTP ${response.status}`);
  }
  const file = await response.arrayBuffer();
  log("file-read", file);

  await emit("open-file", file);
  log("open-file-sent");
}

async function guarded(action) {
  try {
    await action();
  } catch (error) {
    setStatus("error");
    log("error", error && error.message ? error.message : String(error));
    console.error(error);
  }
}

reloadButton.addEventListener("click", () => guarded(loadViewer));
fitButton.addEventListener("click", () => guarded(() => emit("fit-map")));
zoomButton.addEventListener("click", () => guarded(() => emit("zoom", Number(zoomInput.value))));
sheetSelect.addEventListener("change", () => {
  if (sheetSelect.value) {
    guarded(() => emit("switch-sheet", sheetSelect.value));
  }
});
clearLogButton.addEventListener("click", () => {
  eventLog.innerHTML = "";
});

window.addEventListener("error", (event) => {
  setStatus("error");
  log("window-error", event.message);
});

window.addEventListener("unhandledrejection", (event) => {
  setStatus("error");
  log("unhandled-rejection", event.reason && event.reason.message ? event.reason.message : event.reason);
});

guarded(loadViewer);
