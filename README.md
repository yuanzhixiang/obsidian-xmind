# XMind Viewer

XMind Viewer is a simple plugin for Obsidian that allows you to view XMind files directly
within your Obsidian vault. This plugin handles opening files with the .xmind extension and
creates a new XMind viewer for that file.

The plugin uses the bundled local XMind embed viewer snapshot under
`vendor/xmind-embed-viewer-remote/`, so opening local `.xmind` files no longer depends on the
official remote iframe at runtime.

## Features

- **Open .xmind files**: View XMind files directly in Obsidian.
- **Embed in Markdown notes**: View embedded .xmind files within Markdown notes.
- **View-only functionality**: Provides view-only access with no editing capabilities.

## Installation

1. **Copy the plugin files**: Place the plugin files into the `.obsidian/plugins/xmind-viewer/`
   directory in your Obsidian vault. Alternatively, you can download and install it from Obsidian under Community plugins.
2. **Enable the plugin**: Go to Obsidian settings (Settings → Community plugins) and activate XMind Viewer.

## Usage

Simply open a `.xmind` file within your vault, and the plugin will automatically render its contents for viewing.

## Development

- Install dependencies: `pnpm install`
- Start development build and test vault: `pnpm dev`
- Run lint: `pnpm lint`
- Build production files: `pnpm build`
- Build release zip: `pnpm package`
- Open the local XMind debug viewer: `pnpm debug:xmind`
