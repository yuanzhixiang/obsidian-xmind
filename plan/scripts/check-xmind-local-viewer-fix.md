# 本地 Viewer 检查脚本

## 功能定位

`scripts/check-xmind-local-viewer-fix.mjs` 是本地 viewer 的静态回归检查。当前检查重点是“正式主路径是否只依赖直接源码 viewer”，并防止官方社区插件扫描会拒绝的 iframe/动态脚本/运行时 style 口径回流。

## 检查内容

- 正式 viewer 必须由 `render-adapter.ts` 直接解析和渲染 `.xmind`，不得重新依赖 iframe bridge。
- `asset-loader.ts`、`embed-viewer.ts`、`resource-manifest.ts`、`viewer-globals.ts`、`native-viewer-app.ts`、`iframe-bridge.ts`、`sheet-controller.ts`、`zoom-controller.ts` 必须保持删除状态。
- TypeScript 资源声明和 Rollup 不得重新暴露旧 `?bundle`、`?appbundle` 或 `?xmindchunk` 查询。
- 正式源码不得创建动态 `<script>`、动态 `<style>`，不得写 `innerHTML`/`outerHTML`，不得直接设置 `element.style`。
- `.xmind` 解析必须由 `xmind-document.ts` 和 `xmind-zip.ts` 完成，中心主题兼容修复继续在 `theme-loader.ts`。
- `package.json` 的运行依赖只保留源码 viewer 实际使用的 `fflate@0.8.3`，不得恢复 JSZip。
- 布局层必须保留 right/clockwise 根结构识别、默认紧凑深度、会话内展开/收起状态和隐藏子树数量计算。
- 布局结果必须提供 `hasHiddenChildren`、`toggleControlKind`、`toggleControlX` 等稳定 UI 字段，避免渲染层重新推导业务状态。
- 渲染层必须保留默认紧凑视图、常驻数字展开控件、`> 999` 隐藏数量的 `...` 控件，以及 topic hover/focus 和连接线 hover 才显示的减号收起控件。
- 连接线 hover 必须通过透明命中区和父 topic id 定位对应减号，不能只依赖 `.xmind-topic:hover`。
- 隐藏数量显示规则必须保留为 `0-999` 显示数字、`> 999` 显示 `...`。
- 渲染适配器必须保留画布手势：普通 wheel 用 `panOffsetX/Y` 平移，`ctrlKey + wheel` 和 `Command/metaKey + wheel` 用焦点缩放，右键拖拽用 `panOffsetX/Y` 平移，wheel 监听使用 `{ passive: false }`。
- 展开/收起 topic 必须保留当前 zoom 和视口锚点，不能重新调用适配缩放；pinch 缩放灵敏度保持轻阻力口径。
- Obsidian 视图必须只导入 `src/xmind-viewer/` 稳定入口，不得直接依赖 assets 目录。
- XMind pane menu 必须提供 `Copy path`，不得提供会把 `.xmind` 原文件交给 markdown view 的入口，不得强制插件自绘 DOM 菜单，必须隐藏 `Split right` / `Split down`，并在菜单打开时拦截 `Mod+W` 关闭菜单。
- debug viewer 必须复用同一份 `src/xmind-viewer/index.ts` 源码 API，并支持页面内选择其它本地 `.xmind` 文件测试。
- README 必须包含官方要求的安装和使用说明。
- GitHub Release workflow 必须只上传 `main.js`、`manifest.json`、`styles.css`，并为三件套生成 artifact attestations。

## 限制

该脚本是静态检查，不替代浏览器视觉回归。涉及布局、缩放、sheet 切换和真实文件渲染时，仍需运行 `pnpm debug:xmind` 并在浏览器中确认事件和画面。
