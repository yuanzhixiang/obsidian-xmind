# Obsidian 预览替换脚本

## 功能定位

`preview-obsidian.mjs` 用于本机开发预览。它把生产构建后的 Obsidian 插件三件套同步到本机 Max vault 的 `xmind-maps` 插件目录，并刷新 `.hotreload`，让 Obsidian 能加载当前仓库的最新实现。

## 行为口径

- 脚本由 `pnpm preview:obsidian` 调用，调用前必须先完成 `pnpm build`。
- 默认目标 vault 是 `/Users/yuanzhixiang/workspace/obsidian-vault/Max`。
- 默认目标插件目录是 `目标 vault/.obsidian/plugins/xmind-maps`。
- 默认 `OBSIDIAN_PREVIEW_MODE=link`，将 `main.js`、`manifest.json`、`styles.css` 和 `.hotreload` 替换为指向当前仓库的 symlink。
- `OBSIDIAN_PREVIEW_MODE=copy` 时复制真实文件，适合验证非 symlink 安装形态。
- `OBSIDIAN_VAULT` 可覆盖 vault 根目录；`OBSIDIAN_PLUGIN_DIR` 可直接覆盖插件目录，并优先于 `OBSIDIAN_VAULT`。
- 脚本只替换 `main.js`、`manifest.json`、`styles.css` 和 `.hotreload`，不得删除插件目录内其它文件夹或备份目录。
- 如果目标路径是普通目录，脚本必须拒绝替换，避免误删目录。
- 同步完成后必须 touch 仓库 `.hotreload`；link 模式下也要尽量刷新目标 symlink 本身的时间戳，帮助 Obsidian hot-reload 插件感知变化。

## 安全约束

- 目标 manifest 的 `id` 必须是 `xmind-maps`。
- `dist/` 中缺少任一三件套时必须失败，不创建半成品预览。
- 脚本不启动 Obsidian，不启动 dev server，不常驻进程。
