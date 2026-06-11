# XMind Maps

XMind Maps is an Obsidian plugin for opening local `.xmind` files directly inside your vault. It registers a read-only file view for the `.xmind` extension and renders the map with a local source-based SVG viewer.

[简体中文](./README.zh-CN.md)

## Features

Open `.xmind` files directly in an Obsidian vault and view maps in read-only mode with zoom, fit-to-canvas, and viewer controls.

## Installation

Install XMind Maps from Obsidian Community Plugins after the plugin is approved.

For manual testing, download the release assets and place `main.js`, `manifest.json`, and `styles.css` in:

```text
<vault>/.obsidian/plugins/xmind-maps/
```

Then enable the plugin in Obsidian settings.

## Usage

Open any `.xmind` file inside your Obsidian vault. The plugin reads the file locally and renders it in a read-only Obsidian file view.

## Not Supported

- Editing or saving XMind files.
- Rendering `.xmind` files as embedded Markdown previews.
- Perfect parity with every layout and theme detail from the latest XMind desktop or web app.

## Development

- Install dependencies: `pnpm install`
- Start the development build and test vault: `pnpm dev`
- Run local viewer checks: `pnpm check:local-viewer`
- Run lint: `pnpm lint`
- Build production files: `pnpm build`
- Build a manual release zip: `pnpm package`
- Open the local debug viewer: `pnpm debug:xmind`

## License

Apache-2.0. Copyright 2026 yuanzhixiang.
