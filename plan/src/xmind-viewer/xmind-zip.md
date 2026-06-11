# XMind Zip 适配层

## 组件职责

`xmind-zip.ts` 统一封装 `.xmind` 文件的 zip 读取、文本条目读取和文本条目替换。业务模块不得直接依赖具体压缩库 API。

## 输入与输出

- 输入：Obsidian 读取到的 `.xmind` ArrayBuffer。
- 输出：zip 条目映射、指定文本文件内容，或替换指定文本条目后的新 ArrayBuffer。
- 依赖：`fflate@0.8.3` 的同步 `unzipSync`、`zipSync`、`strFromU8`、`strToU8`。

## 行为口径

- `readZipTextFile()` 在条目不存在时返回 `null`，由调用方决定是否报错或降级。
- `replaceZipTextFile()` 只修改内存副本，不写回 Obsidian vault 原文件。
- 重新生成 zip 的目的是传给本地源码 viewer 做兼容渲染，不承诺保留原始 zip 的全部压缩元数据。

## 约束

- 不得恢复 JSZip；它会把 CommonJS/polyfill 链打进 `main.js`，并触发官方社区插件扫描中的动态脚本和动态代码执行提示。
- 不在这里解析 XMind 业务结构；sheet/topic 语义属于 `xmind-document.ts` 和 `workbook-model.ts`。
