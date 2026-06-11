# XMind Maps

XMind Maps lets you open local `.xmind` files directly in Obsidian as read-only mind maps.

[简体中文](./README.zh-CN.md)

## What You Can Do

- Open `.xmind` files from your Obsidian vault.
- View mind maps without leaving Obsidian.
- Switch between sheets in the same XMind file.
- Zoom, fit the map to the pane, and pan around large maps.
- Use a trackpad or mouse wheel to move around the canvas.
- Expand and collapse hidden branches from the map controls.
- Copy the file path from the pane menu.

## Installation

Install XMind Maps from Obsidian Community Plugins when it is available there.

For manual installation, download the release assets and place these three files in:

```text
<vault>/.obsidian/plugins/xmind-maps/
```

Required files:

- `main.js`
- `manifest.json`
- `styles.css`

Then open Obsidian settings, go to Community plugins, and enable XMind Maps.

## Usage

Put a `.xmind` file anywhere inside your Obsidian vault, then open it from the file explorer. Obsidian will open it in an XMind Maps view instead of a Markdown editor.

The viewer is read-only. You can inspect the mind map, expand branches, zoom, pan, switch sheets, and copy paths, but the plugin does not edit or save `.xmind` files.

## Viewer Controls

- `-` and `+`: zoom out or zoom in.
- Zoom percentage: shows the current zoom level.
- `Fit`: fit the whole map into the current pane.
- Sheet selector: switch between sheets when the XMind file contains more than one sheet.
- Two-finger scroll or mouse wheel: pan around the map.
- Trackpad pinch gesture: zoom the map.
- `Command` + mouse wheel: zoom the map.
- Hold the right mouse button and drag: pan the canvas.

## Branches

Some large branches are collapsed by default so the map opens quickly and stays readable.

- Click a numbered circle beside a topic to expand that hidden branch.
- Hover an expanded topic or its branch line to reveal the collapse control.
- Click the collapse control to fold that branch again.
- If a hidden count is larger than `999`, the control shows `...`.

## Pane Menu

Use the three-dot pane menu in Obsidian to copy the path of the current `.xmind` file.

Depending on your Obsidian version, `Copy path` may include:

- `as Obsidian URL`
- `from vault folder`
- `from system root`

## Notes

- XMind Maps does not edit, save, or export XMind files.
- XMind Maps does not render `.xmind` files inside Markdown notes.
- Visual details may not match every XMind desktop or web theme exactly.
- If a file does not open, confirm it is a valid `.xmind` file and try opening it again from the Obsidian file explorer.

## License

Apache-2.0. Copyright 2026 yuanzhixiang.
