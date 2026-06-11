# 渲染适配器

## 组件职责

`render-adapter.ts` 是本地 XMind viewer 的直接源码渲染门面。它接收 Obsidian 文件视图提供的容器和 `.xmind` ArrayBuffer，解析文档、挂载 DOM、渲染 SVG、维护 sheet/zoom 状态，并暴露稳定 viewer API。

## 输入输出

- 输入：挂载容器、预处理后的 `.xmind` ArrayBuffer、错误回调和状态变化回调。
- 输出：`destroy()`、`getState()`、`subscribeState()`、`getSheets()`、`getActiveSheetId()`、`getZoom()`、`fitMap()`、`zoom()`、`switchSheet()`。
- 子节点展开状态是 viewer 会话内存态，按 sheet id 保存，不暴露为写文件 API，不修改源 `.xmind`。

## 组合关系

- `xmind-document.ts` 负责解析 `.xmind`。
- `renderer/svg-renderer.ts` 负责 SVG 绘制和 transform。
- `viewer-state.ts` 负责事件到状态的投影。
- `file-loader.ts` 在进入本模块前完成 `.xmind` 内存副本预处理。
- 样式全部来自根目录 `styles.css`，本模块不创建 `<style>`，不写 `innerHTML`，不设置 `element.style`。

## 维护规则

- 不恢复 iframe、MessageChannel 或 Blob HTML。
- 新增用户可见 viewer 行为时，优先在本模块或更下层源码模块建立清晰职责，不新增无意义 wrapper。
- 错误态必须使用 DOM API 和文本节点渲染，避免官方扫描器报 unsafe DOM assignment。
- 展开或折叠 topic 后重新渲染当前 sheet 并执行 `fitMapSync()`，让新子树进入视口。
