# Package 配置

## 功能定位

`package.json` 定义项目的 pnpm 包管理、开发命令、构建命令、发布命令、作者信息、描述文案和依赖清单。

## 元数据口径

- `author` 使用 `yuanzhixiang`，与 `manifest.json` 的插件展示作者保持一致。
- `name` 使用 `xmind-maps`，与官方提交使用的 `manifest.json` 插件 id 对齐。
- `description` 使用英文短句 `View local XMind files.`，与 `manifest.json` 保持一致。
- 版本号必须与 `manifest.json` 保持一致，由 `pnpm deploy:prod` 自动递增 patch 版本。

## 命令口径

- `pnpm dev`：启动 Rollup watch 和 Obsidian 测试 vault。
- `pnpm build`：生成生产 `dist/`。
- `pnpm lint`：检查 `src/` TypeScript 源码。
- `pnpm format:viewer`：格式化源码 viewer、调试入口和检查脚本。
- `pnpm check:local-viewer`：检查正式 viewer 是否只走直接源码渲染、旧 assets 是否没有重新接入主路径、官方扫描高风险模式是否未回流。
- `pnpm debug:xmind`：启动本地 XMind 调试查看器。
- `pnpm inspect:xmind`：审计本地 `.xmind` zip 包结构，输出 sheet、topic、folded branch、structure class、对象和 style 字段统计，用于 Xmind parity fixture 建设和 parser 对齐。
- `pnpm package`：构建标准三件套并生成本地手动安装 zip。
- `pnpm preview:obsidian`：先执行生产构建，再把 `dist/main.js`、`dist/manifest.json`、`dist/styles.css` 和 `.hotreload` 替换到本机 Obsidian Max vault 的 `xmind-maps` 插件目录。默认使用 symlink 预览，后续重新构建即可让 Obsidian 使用最新产物；可通过 `OBSIDIAN_PREVIEW_MODE=copy` 改为复制文件，通过 `OBSIDIAN_VAULT` 或 `OBSIDIAN_PLUGIN_DIR` 覆盖目标路径。
- `pnpm release`：当前等同于 `pnpm package`。
- `pnpm deploy:prod`：生产发布命令，要求工作区干净，然后依次运行本地 viewer 回归检查、源码 lint、patch 版本号递增、打包、提交版本变更、创建同名 tag，并推送分支与 tag。

## 依赖约束

- 项目使用 pnpm，不维护 npm/yarn lock。
- 插件运行时不依赖官方 `xmind-embed-viewer` npm 包。
- 正式 viewer 主路径来自 `src/xmind-viewer/` 的直接源码模块，不再加载旧 `share-embed`、`73350`、`snowbrush.js`、iframe app bundle 或 package runtime。
- `@codemirror/state` 和 `@codemirror/view` 作为开发依赖显式声明，用于 Obsidian Live Preview 的 `![[*.xmind]]` editor extension；版本应与当前 `obsidian` API 依赖兼容。
- 当前运行依赖只保留 `fflate@0.8.3`，用于源码层只读解压 `.xmind` zip、提取 `content.json`、执行中心主题兼容修复；不得恢复 JSZip，避免其 CommonJS/polyfill 链在官方扫描中触发动态脚本和动态代码执行问题。
- `src/xmind-viewer-assets/` 已删除，不再作为依赖来源、构建输入或调试入口。
- 新增三方能力时必须先判断是否属于正式源码 viewer 的真实运行依赖；只有被 `src/` 源码 import 的依赖才能进入 `dependencies`。
- Obsidian 官方安装产物必须只依赖 `main.js`、`manifest.json`、`styles.css` 三个标准文件。

## 发布约束

发布前至少运行 `pnpm deploy:prod`。GitHub Release 由远端 tag push 触发的 workflow 创建，Release 只上传官方三件套；本地 zip 产物写入 `release/`，不提交到源码仓库，也不作为官方 release asset。

## README 维护口径

- `README.md` 是英文主 README。
- `README.zh-CN.md` 是中文 README。
- 两份 README 使用 `XMind Maps` 作为项目展示名称。
- 两份 README 必须包含功能简介、安装、使用、不支持、开发和许可证信息，满足 Obsidian 官方社区插件扫描要求。
