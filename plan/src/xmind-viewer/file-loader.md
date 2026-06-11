# XMind 文件加载器

## 组件职责

`file-loader.ts` 在 `.xmind` 二进制发送给 iframe 前执行本地源码层加载。它负责读取 zip、解析 `content.json`、提取 workbook/sheet 元数据，并把需要兼容修复的内存副本重新生成出来。

## 输入与输出

- 输入：Obsidian `app.vault.readBinary(file)` 返回的 `.xmind` ArrayBuffer。
- 输出：`LoadedLocalXMindFile`，其中 `binary` 是传给 iframe 的 ArrayBuffer，`workbook` 是从 `content.json` 提取的源码层元数据。
- 依赖：`jszip@3.10.1`，用于读取和重新生成 `.xmind` zip。
- 依赖：`theme-loader.ts`，用于处理 `content.json` 中的 XMind theme 兼容规则。
- 依赖：`workbook-model.ts`，用于提取 sheet id 和标题等可维护元数据。

## 处理逻辑

- 读取 zip 根目录的 `content.json`。
- 将解析后的内容交给 `extractXMindWorkbookMetadata()` 提取 workbook 元数据。
- 将解析后的内容交给 `normalizeInvisibleCentralTopicTextColor()` 执行主题兼容修复。
- 读取和重新生成 zip 期间通过 `withLegacySchedulerGuard()` 临时禁用 `MutationObserver` / `WebKitMutationObserver`，避免 JSZip 的旧调度 fallback 在 Obsidian 或调试页触发 `observe()` 参数错误。
- 仅在实际修改时重新生成 zip，未命中时返回原始 ArrayBuffer。
- 解析失败、缺少 `content.json` 或不是标准 zip 时返回原始 ArrayBuffer 和空 workbook 元数据，不阻断 viewer 渲染。

## 兼容接口

`normalizeLocalXMindFile()` 暂时保留为兼容导出，只返回 `loadLocalXMindFile()` 的 `binary`。新增业务逻辑必须优先使用 `loadLocalXMindFile()`，不要继续扩展只返回二进制的旧接口。

## 限制

该模块不编辑用户源文件，只修改传入 iframe 的内存副本。它不尝试完整理解 XMind workbook 模型；复杂主题规则必须放入 `theme-loader.ts`，复杂 sheet/topic 解析必须放入 `workbook-model.ts` 或后续专门模型模块。
