import {
    App,
    FileView,
    IconName,
    Menu,
    MenuItem,
    Notice,
    TFile,
    WorkspaceLeaf,
} from 'obsidian';
import { XMindViewerPlugin } from './x-mind-viewer-plugin';
import { XMIND_VIEW_TYPE } from '../typing/types';
import {
    getViewerErrorMessage,
    loadLocalXMindFile,
    XMindRenderAdapter,
} from '../xmind-viewer';

type CopyPathKind = 'obsidian-url' | 'vault' | 'system';

interface FullPathAdapter {
    getFullPath(normalizedPath: string): string;
}

interface MenuItemWithSubmenu extends MenuItem {
    setSubmenu(): Menu;
}

function hasFullPathAdapter(adapter: unknown): adapter is FullPathAdapter {
    return (
        typeof adapter === 'object' &&
        adapter !== null &&
        'getFullPath' in adapter &&
        typeof (adapter as FullPathAdapter).getFullPath === 'function'
    );
}

function getSubmenu(item: MenuItem): Menu | null {
    const candidate = item as Partial<MenuItemWithSubmenu>;
    return typeof candidate.setSubmenu === 'function'
        ? candidate.setSubmenu.call(item)
        : null;
}

export class XMindViewerView extends FileView {
    plugin: XMindViewerPlugin;
    private viewer: XMindRenderAdapter | null = null;
    constructor(leaf: WorkspaceLeaf, app: App, plugin: XMindViewerPlugin) {
        super(leaf);
        this.app = app;
        this.plugin = plugin;
    }

    getViewType(): string {
        return XMIND_VIEW_TYPE;
    }

    getIcon(): IconName {
        return 'brain';
    }

    getDisplayText(): string {
        if (this.file) {
            return `XMind view: ${this.file.basename}`;
        }
        return 'No file open';
    }

    onPaneMenu(menu: Menu, source: string): void {
        menu.setUseNativeMenu(false);
        super.onPaneMenu(menu, source);
        this.bindCloseMenuHotkey(menu);

        if (!this.file) {
            return;
        }

        menu.addSeparator();
        this.addOpenAsMarkdownMenuItem(menu, this.file);
        this.addCopyPathMenuItem(menu, this.file);
    }

    async onLoadFile(file: TFile): Promise<void> {
        const loadedFile = await loadLocalXMindFile(
            await this.app.vault.readBinary(file)
        );
        this.viewer?.destroy();
        this.prepareContentEl();
        this.viewer = new XMindRenderAdapter({
            el: this.contentEl,
            file: loadedFile.binary,
            onError: (error): void => this.showError(error),
        });
    }

    async onUnloadFile(): Promise<void> {
        this.viewer?.destroy();
        this.viewer = null;
    }

    private addOpenAsMarkdownMenuItem(menu: Menu, file: TFile): void {
        menu.addItem((item) => {
            item.setTitle('Open as markdown')
                .setIcon('file-text')
                .onClick(() => {
                    void this.openAsMarkdown(file);
                });
        });
    }

    private addCopyPathMenuItem(menu: Menu, file: TFile): void {
        menu.addItem((item) => {
            item.setTitle('Copy path').setIcon('copy');

            const submenu = getSubmenu(item);
            if (!submenu) {
                item.onClick(() => {
                    void this.copyPath(file, 'vault');
                });
                return;
            }

            this.addCopyPathSubmenuItems(submenu, file);
        });
    }

    private addCopyPathSubmenuItems(menu: Menu, file: TFile): void {
        menu.addItem((item) => {
            item.setTitle('as Obsidian URL')
                .setIcon('link')
                .onClick(() => {
                    void this.copyPath(file, 'obsidian-url');
                });
        });
        menu.addItem((item) => {
            item.setTitle('from vault folder')
                .setIcon('folder')
                .onClick(() => {
                    void this.copyPath(file, 'vault');
                });
        });
        menu.addItem((item) => {
            const systemPath = this.getSystemPath(file);
            item.setTitle('from system root')
                .setIcon('hard-drive')
                .setDisabled(systemPath === null)
                .onClick(() => {
                    void this.copyPath(file, 'system');
                });
        });
    }

    private bindCloseMenuHotkey(menu: Menu): void {
        const ownerWindow = this.contentEl.ownerDocument.defaultView;
        if (!ownerWindow) {
            return;
        }
        const menuWindow = ownerWindow;

        const closeMenu = (event: KeyboardEvent): void => {
            if (
                event.key.toLowerCase() !== 'w' ||
                (!event.metaKey && !event.ctrlKey)
            ) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();
            cleanup();
            menu.hide();
        };

        function cleanup(): void {
            menuWindow.removeEventListener('keydown', closeMenu, true);
        }

        menuWindow.addEventListener('keydown', closeMenu, true);
        menu.onHide(cleanup);
    }

    private async openAsMarkdown(file: TFile): Promise<void> {
        await this.leaf.setViewState({
            type: 'markdown',
            state: {
                file: file.path,
                mode: 'source',
            },
            active: true,
        });
    }

    private async copyPath(file: TFile, kind: CopyPathKind): Promise<void> {
        const text = this.getPathText(file, kind);
        if (text === null) {
            new Notice('System path is not available for this vault.');
            return;
        }

        await this.contentEl.win.navigator.clipboard.writeText(text);
        new Notice('Copied path');
    }

    private getPathText(file: TFile, kind: CopyPathKind): string | null {
        switch (kind) {
            case 'obsidian-url':
                return this.getObsidianUrl(file);
            case 'vault':
                return file.path;
            case 'system':
                return this.getSystemPath(file);
        }
    }

    private getObsidianUrl(file: TFile): string {
        return `obsidian://open?vault=${encodeURIComponent(
            this.app.vault.getName()
        )}&file=${encodeURIComponent(file.path)}`;
    }

    private getSystemPath(file: TFile): string | null {
        const adapter = this.app.vault.adapter;
        return hasFullPathAdapter(adapter)
            ? adapter.getFullPath(file.path)
            : null;
    }

    private prepareContentEl(): void {
        this.contentEl.empty();
        this.contentEl.addClass('xmind-viewer-content');
    }

    private showError(error: unknown): void {
        this.contentEl.empty();
        this.contentEl.createDiv({
            cls: 'xmind-viewer-error',
            text: `XMind 渲染失败：${getViewerErrorMessage(error)}`,
        });
    }
}
