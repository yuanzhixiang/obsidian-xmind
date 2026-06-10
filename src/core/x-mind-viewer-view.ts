import { App, IconName, FileView, TFile, WorkspaceLeaf } from 'obsidian';
import { XMindViewerPlugin } from './x-mind-viewer-plugin';
import { LocalXMindEmbedViewer } from './local-xmind-embed-viewer';
import { getInlineXMindViewerUrl } from './xmind-viewer-assets';

const viewType = 'xmind-viewer';

export class XMindViewerView extends FileView {
    plugin: XMindViewerPlugin;
    styles: Partial<CSSStyleDeclaration>;
    private viewer: LocalXMindEmbedViewer | null = null;
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
        return viewType;
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
        const binary = await this.app.vault.readBinary(file);
        this.viewer?.destroy();
        this.prepareContentEl();
        this.viewer = new LocalXMindEmbedViewer({
            el: this.contentEl,
            file: binary,
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
        const message =
            error instanceof Error
                ? error.message
                : 'XMind viewer failed to load.';
        this.contentEl.empty();
        this.contentEl.createDiv({
            cls: 'xmind-viewer-error',
            text: `XMind 渲染失败：${message}`,
        });
    }
}
