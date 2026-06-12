# 主题兼容加载器

## 组件职责

`theme-loader.ts` 负责 XMind `content.json` 中 theme 结构的源码级兼容处理。当前它只处理中心主题文字色不可见问题，把该业务规则从 `.xmind` zip 读写逻辑和编译后 `share-embed` bundle 中迁出。

## 输入输出

- 输入：解析后的 `content.json` 内容，支持单 sheet 对象或 sheet 数组。
- 输出：布尔值，表示是否修改了传入对象。

## 当前规则

- 检查新结构 `theme.centralTopic.properties`。
- 检查旧结构 `theme.topicThemeMap.centralTopic.properties`。
- 当 `fo:color` 为 `inherited`，且中心主题填充为 `none`、`transparent`、`#fff` 或 `#ffffff` 时，将 `fo:color` 规范化为 `#000000`。
- 当 `fo:color` 为 `inherited`，且中心主题填充为深色时，按相对亮度将 `fo:color` 规范化为 `#ffffff`，避免黑色中心主题上出现深色文字。
- `/Users/yuanzhixiang/Desktop/202606101441 搞到钱再说.xmind` 的中心主题在文件 theme 中保存为 `svg:fill: #000000` 与 `fo:color: inherited`；原版 XMind 缩略图也是黑底白字，所以本规则只修文字色继承，不改背景色。

## 组合关系

- `file-loader.ts` 负责读取和重新生成 `.xmind` zip，调用本模块处理 `content.json` 对象。
- 正式 Obsidian 视图和调试父页面都会通过 `file-loader.ts` 预处理本地 `.xmind`，再把二进制传给 iframe。
- `share-embed` 内不得重新加入同类修复；iframe 端只负责渲染收到的文件。

## 维护规则

- 新增 theme 兼容规则时应放在本模块，而不是放回 `file-loader.ts` 或编译后 bundle。
- 本模块不读写 zip，不访问 Obsidian API，不发送 iframe 命令。
