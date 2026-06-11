# Sheet 控制器

## 组件职责

`sheet-controller.ts` 负责本地 XMind viewer 的 sheet 行为：读取 sheet 列表、读取当前 sheet、判断 sheet 是否存在，以及发送 sheet 切换命令。它把 sheet 业务语义从通用 `MessageChannel` 命令发送中拆出来。

## 输入输出

- 输入：`XMindIframeBridge` 和 `XMindViewerStateStore`。
- 输出：`getSheets()`、`getActiveSheetId()`、`hasSheet()` 和 `switchSheet()`。

## 行为规则

- sheet 列表和当前 sheet 来自 `viewer-state.ts` 对 `sheets-load` 与 `sheet-switch` 的状态投影。
- `switchSheet(sheetId)` 只负责发送 `switch-sheet` 命令，不直接读取或修改 iframe DOM。
- 空 sheet id 视为调用方错误，抛出 `XMindViewerError`。

## 迁移意义

后续如果要实现 Obsidian 原生 sheet 下拉、快捷键、状态同步或替换 iframe 端协议，应优先扩展本模块，再由 `render-adapter.ts` 暴露，不在编译后 bundle 中继续堆逻辑。
