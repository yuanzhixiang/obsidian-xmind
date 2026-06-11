import { App, IconName, FileView, TFile, WorkspaceLeaf } from 'obsidian';
import { XMindViewerPlugin } from './x-mind-viewer-plugin';
import { XMIND_VIEW_TYPE } from '../typing/types';
import {
    getInlineXMindViewerUrl,
    getViewerErrorMessage,
    loadLocalXMindFile,
    XMindRenderAdapter,
} from '../xmind-viewer';

export class XMindViewerView extends FileView {
    plugin: XMindViewerPlugin;
    styles: Partial<CSSStyleDeclaration>;
    private viewer: XMindRenderAdapter | null = null;
    constructor(leaf: WorkspaceLeaf, app: App, plugin: XMindViewerPlugin) {
        super(leaf);
        this.app = app;
        this.plugin = plugin;
        this.styles = {
            width: '100%',
            height: '100%',
            border: 'none',
        };
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
            viewerUrl: getInlineXMindViewerUrl(),
            styles: this.styles,
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
        Object.assign(this.contentEl.style, {
            width: '100%',
            height: '100%',
            minHeight: '0',
            display: 'flex',
            overflow: 'hidden',
        });
    }

    private showError(error: unknown): void {
        this.contentEl.empty();
        this.contentEl.createDiv({
            cls: 'xmind-viewer-error',
            text: `XMind 渲染失败：${getViewerErrorMessage(error)}`,
        });
    }
}
