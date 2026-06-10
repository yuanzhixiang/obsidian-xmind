import {
    App,
    IconName,
    FileView,
    normalizePath,
    TFile,
    WorkspaceLeaf,
} from 'obsidian';
import { XMindViewerPlugin } from './x-mind-viewer-plugin';
import { LocalXMindEmbedViewer } from './local-xmind-embed-viewer';

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
        this.viewer = new LocalXMindEmbedViewer({
            el: this.contentEl,
            file: binary,
            viewerUrl: this.getLocalViewerUrl(),
            styles: this.styles,
        });
    }

    async onUnloadFile(): Promise<void> {
        this.viewer?.destroy();
        this.viewer = null;
    }

    private getLocalViewerUrl(): string {
        const pluginDir =
            this.plugin.manifest.dir ??
            `${this.app.vault.configDir}/plugins/${this.plugin.manifest.id}`;
        const viewerPath = normalizePath(
            `${pluginDir}/xmind-embed-viewer-remote/local/embed-viewer.html`
        );
        return this.app.vault.adapter.getResourcePath(viewerPath);
    }
}
