# 中文 README

## 功能定位

`README.zh-CN.md` 是中文用户说明书，面向中文 Obsidian 用户介绍 `XMind Maps` 的安装、打开文件、Markdown embed、查看控件、搜索、大纲、分支展开/收起、XMind 内容展示、面板菜单和只读限制。

## 内容口径

- 中文为主，顶部提供 `README.md` 英文链接。
- 文档只写 Obsidian 用户需要知道的功能和使用方法，不写项目源码结构、开发命令、调试流程或发布流程。
- 安装章节必须说明 Community Plugins 安装入口，以及手动安装时需要把 `main.js`、`manifest.json`、`styles.css` 放入 `<vault>/.obsidian/plugins/xmind-maps/`。
- 截图章节必须展示 Markdown embed 和直接打开 `.xmind` 文件两种用户场景，图片保存在 `docs/images/`，README 使用相对路径引用。
- 使用章节必须说明：把 `.xmind` 文件放入 vault 后从 Obsidian 文件列表打开，插件用 XMind Maps 视图显示；也可以用 `![[思维导图.xmind]]` 在 Markdown 笔记中嵌入。
- Live Preview 嵌入章节必须说明阅读视图和 Live Preview 都支持 `![[*.xmind]]`；光标位于 embed 语法行时显示原始 `![[*.xmind]]` 文本，光标离开后显示 viewer。
- README 必须明确 XMind Maps 是只读 viewer，不编辑、不保存、不写回 `.xmind` 文件，也不承诺 `.bak` 备份。
- 查看器控件章节必须覆盖缩放、适配、搜索、大纲、sheet 切换、滚轮或触摸板移动、触摸板缩放、`Command + wheel` 缩放和右键拖拽平移。
- 展开和收起分支章节必须说明按 XMind 文件保存的折叠状态初始化、点击数字圆圈展开、hover 已展开主题或连接线显示收起控件、`> 999` 显示 `...`。
- 搜索章节必须说明搜索当前 sheet 的主题标题、标签、备注和链接，支持下一个/上一个跳转，并会临时展开折叠祖先让结果可见。
- 大纲章节必须说明大纲是整页层级视图，沿用 mind map 展开/收起状态，支持 disclosure 展开/收起和定位主题。
- XMind 内容展示章节必须说明当前只读显示范围，包括多 sheet、折叠分支、主题样式、关系线、边界、概要、外框主题、自由主题、标记、任务、标签、备注、链接、图片和基础附件/公式/音频提示。
- 面板菜单章节只描述用户可见的 `Copy path` 能力，不描述内部菜单实现。
- 注意事项章节必须明确打开或嵌入不会修改原始 `.xmind` 文件、不导出 XMind 文件，以及视觉不完全等同 XMind 官方客户端。
- 保留 Apache-2.0 许可证与 `yuanzhixiang` 版权声明。

## 维护规则

- 中文 README 必须和英文 README 保持项目介绍、功能、安装、使用、限制和许可证口径一致。
- README 不得加入 `pnpm`、源码模块、构建脚本、调试服务器、发布 workflow 等开发者说明。
