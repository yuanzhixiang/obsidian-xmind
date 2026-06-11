# Viewer 错误模型

## 组件职责

`errors.ts` 提供 XMind viewer 源码层共享的错误类型和展示文案转换函数。它把底层异常与 Obsidian 视图中的中文错误态解耦。

## 当前行为

- `XMindViewerError` 用于 iframe 握手、命令回复超时等本地 viewer 可识别错误。
- `getViewerErrorMessage()` 把未知错误转换为稳定 fallback 文案。

## 维护规则

- 新增可恢复错误或用户可见错误时，应先在本模块定义错误类型或文案转换规则。
- Obsidian 视图只负责展示错误，不在视图里解析错误对象结构。
