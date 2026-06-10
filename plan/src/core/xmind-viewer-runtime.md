# XMind Viewer Runtime

## 组件职责

`xmind-viewer-runtime.cjs` 是本地 iframe 的通用三方运行时清单，声明从 `package.json` 依赖中读取哪些 UMD/dist 脚本来组成浏览器 runtime。

## 资源输入

- `jquery@3.2.1`
- `js-cookie@2.2.0`
- `popper.js@1.12.9`
- `bootstrap@4.0.0-beta.2`
- `vue@2.7.14`

## 关键行为

- Rollup 的 `?bundle` 处理逻辑按清单顺序读取 package 脚本并拼接成字符串。
- runtime 顺序必须保持 jQuery、js-cookie、Popper、Bootstrap、Vue，避免 Bootstrap 初始化时找不到 `$`。
- iframe 加载修复版 `share-embed` 前，必须先加载该 runtime。
- runtime 必须在 iframe 的 `window` 上设置 `$`、`jQuery`、`Cookies`、`Popper`、`Vue`，保持本地 XMind bundle 对全局变量的预期。
- 不引入官方 `xmind-embed-viewer` npm 包；该包是远程 iframe wrapper，不是本地渲染资产来源。

## 边界和限制

- 本模块只提供通用三方库，不承载 XMind 文件解析、渲染或中心主题修复逻辑。
- 如需补充 polyfill，优先最小化引入 `core-js` 或 `regenerator-runtime`，不得重新引入已废弃的 `@babel/polyfill` 或旧本地 `polyfill-45b9836beb.min.js`。
