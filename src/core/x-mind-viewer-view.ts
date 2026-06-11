import { App, IconName, FileView, TFile, WorkspaceLeaf } from 'obsidian';
import { XMindViewerPlugin } from './x-mind-viewer-plugin';
import { XMIND_VIEW_TYPE } from '../typing/types';
import {
    getViewerErrorMessage,
    loadLocalXMindFile,
    XMindRenderAdapter,
} from '../xmind-viewer';

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
