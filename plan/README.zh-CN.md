# 中文 README

## 功能定位

`README.zh-CN.md` 是中文用户说明书，面向中文 Obsidian 用户介绍 `XMind Maps` 的安装、打开文件、查看控件、分支展开/收起、面板菜单和只读限制。

## 内容口径

- 中文为主，顶部提供 `README.md` 英文链接。
- 文档只写 Obsidian 用户需要知道的功能和使用方法，不写项目源码结构、开发命令、调试流程或发布流程。
- 安装章节必须说明 Community Plugins 安装入口，以及手动安装时需要把 `main.js`、`manifest.json`、`styles.css` 放入 `<vault>/.obsidian/plugins/xmind-maps/`。
- 使用章节必须说明：把 `.xmind` 文件放入 vault 后从 Obsidian 文件列表打开，插件以只读视图显示，不会编辑或保存源文件。
- 查看器控件章节必须覆盖缩放、适配、sheet 切换、滚轮或触摸板移动、触摸板缩放、`Command + wheel` 缩放和右键拖拽平移。
- 展开和收起分支章节必须说明默认折叠、点击数字圆圈展开、hover 已展开主题或连接线显示收起控件、`> 999` 显示 `...`。
- 面板菜单章节只描述用户可见的 `Copy path` 能力，不描述内部菜单实现。
- 注意事项章节必须明确不编辑、不保存、不导出、不做 Markdown 嵌入渲染，以及视觉不完全等同 XMind 官方客户端。
- 保留 Apache-2.0 许可证与 `yuanzhixiang` 版权声明。

## 维护规则

- 中文 README 必须和英文 README 保持项目介绍、功能、安装、使用、限制和许可证口径一致。
- README 不得加入 `pnpm`、源码模块、构建脚本、调试服务器、发布 workflow 等开发者说明。
