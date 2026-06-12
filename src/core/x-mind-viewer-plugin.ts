import {
    App,
    Component,
    editorInfoField,
    editorLivePreviewField,
    MarkdownFileInfo,
    MarkdownPostProcessorContext,
    MarkdownRenderChild,
    Plugin,
    TFile,
} from 'obsidian';
import { Extension, Prec, RangeSetBuilder } from '@codemirror/state';
import {
    Decoration,
    DecorationSet,
    EditorView,
    ViewPlugin,
    ViewUpdate,
    WidgetType,
} from '@codemirror/view';
import { XMindViewerView } from './x-mind-viewer-view';
import { XMIND_VIEW_TYPE } from '../typing/types';
import {
    createXMindTranslator,
    detectXMindLocale,
    XMindTranslator,
} from '../i18n';
import {
    getViewerErrorMessage,
    loadLocalXMindFile,
    XMindRenderAdapter,
} from '../xmind-viewer';

const XMIND_EXTENSION = 'xmind';
const XMIND_EMBED_SELECTOR = '.internal-embed, .file-embed';
const XMIND_EMBED_LINK_SELECTOR =
    'a.internal-link, a[href], [data-href], [data-link], [data-linkpath]';
const XMIND_LIVE_PREVIEW_EMBED_PATTERN =
    /!\[\[([^\]\n]+?\.xmind(?:#[^\]\n]*)?(?:\|[^\]\n]*)?)\]\]/gi;
const XMIND_RAW_EMBED_PATTERN =
    /^!\[\[([^\]\n]+?\.xmind(?:#[^\]\n]*)?(?:\|[^\]\n]*)?)\]\]$/i;
const XMIND_RAW_EMBED_SELECTOR = 'p';
const STRAY_EMBED_BRACKET_PATTERN = /^\s*\]{1,2}\s*$/;
const XMIND_EMBED_SOURCE_ATTRIBUTES = [
    'src',
    'data-src',
    'data-path',
    'data-href',
    'data-link',
    'data-linkpath',
    'href',
    'alt',
    'title',
    'aria-label',
];

interface XMindEmbedInfo {
    app: App;
    containerEl: HTMLDivElement;
    depth: number;
    displayMode: boolean;
    linktext: string;
    showInline: boolean;
    sourcePath: string;
}

interface XMindEmbedComponentLike extends Component {
    loadFile(): unknown;
}

interface XMindEmbedRegistry {
    registerExtensions(
        extensions: string[],
        creator: (
            info: XMindEmbedInfo,
            file: TFile,
            subpath: string
        ) => XMindEmbedComponentLike
    ): void;
    unregisterExtensions?(extensions: string[]): void;
}

function getXMindEmbedRegistry(app: App): XMindEmbedRegistry | null {
    const registry = (app as { embedRegistry?: unknown }).embedRegistry;
    if (
        typeof registry === 'object' &&
        registry !== null &&
        'registerExtensions' in registry &&
        typeof registry.registerExtensions === 'function'
    ) {
        return registry as XMindEmbedRegistry;
    }

    return null;
}

function isWhitespaceTextNode(node: ChildNode | null): boolean {
    return (
        node?.nodeType === Node.TEXT_NODE &&
        (node.textContent ?? '').trim() === ''
    );
}

function removeStrayBracketTextNode(node: ChildNode | null): void {
    if (
        node?.nodeType === Node.TEXT_NODE &&
        STRAY_EMBED_BRACKET_PATTERN.test(node.textContent ?? '')
    ) {
        node.remove();
    }
}

function removeAdjacentStrayEmbedBracketText(element: HTMLElement): void {
    let previousSibling = element.previousSibling;
    while (isWhitespaceTextNode(previousSibling)) {
        previousSibling = previousSibling?.previousSibling ?? null;
    }

    let nextSibling = element.nextSibling;
    while (isWhitespaceTextNode(nextSibling)) {
        nextSibling = nextSibling?.nextSibling ?? null;
    }

    removeStrayBracketTextNode(previousSibling);
    removeStrayBracketTextNode(nextSibling);
}

function safeDecodeURIComponent(value: string): string {
    try {
        return decodeURIComponent(value);
    } catch {
        return value;
    }
}

function normalizeEmbedLinkText(value: string): string | null {
    const withoutAlias = value.trim().split(/[|#]/, 1)[0]?.trim();
    if (!withoutAlias) {
        return null;
    }

    return safeDecodeURIComponent(withoutAlias).replace(/^\.?\//, '');
}

function isXMindFile(file: TFile | null): file is TFile {
    return file?.extension.toLowerCase() === XMIND_EXTENSION;
}

function getXMindFileBaseName(linkText: string): string {
    return linkText.toLowerCase().replace(/\.xmind$/i, '');
}

function findXMindFileByLinkText(app: App, linkText: string): TFile | null {
    const normalizedLinkText = normalizeEmbedLinkText(linkText);
    if (!normalizedLinkText) {
        return null;
    }

    const normalizedPath = normalizedLinkText.toLowerCase();
    const normalizedBaseName = getXMindFileBaseName(normalizedLinkText);
    const matchingFiles = app.vault.getFiles().filter((file) => {
        if (!isXMindFile(file)) {
            return false;
        }

        return (
            file.path.toLowerCase() === normalizedPath ||
            file.name.toLowerCase() === normalizedPath ||
            file.basename.toLowerCase() === normalizedBaseName
        );
    });

    if (matchingFiles.length === 1) {
        return matchingFiles[0];
    }

    return (
        matchingFiles.find((file) =>
            file.path.toLowerCase().endsWith(`/${normalizedPath}`)
        ) ?? null
    );
}

function getElementXMindLinkText(element: HTMLElement): string | null {
    for (const attributeName of XMIND_EMBED_SOURCE_ATTRIBUTES) {
        const value = element.getAttribute(attributeName);
        if (!value) {
            continue;
        }

        const linkText = normalizeEmbedLinkText(value);
        if (linkText?.toLowerCase().endsWith(`.${XMIND_EXTENSION}`)) {
            return linkText;
        }
    }

    const text = element.textContent?.trim();
    if (text) {
        const linkText = normalizeEmbedLinkText(text);
        if (linkText?.toLowerCase().endsWith(`.${XMIND_EXTENSION}`)) {
            return linkText;
        }
    }

    return null;
}

function getRawEmbedLinkText(element: HTMLElement): string | null {
    const text = element.textContent?.trim();
    if (!text) {
        return null;
    }

    const match = XMIND_RAW_EMBED_PATTERN.exec(text);
    if (!match) {
        return null;
    }

    return normalizeEmbedLinkText(match[1]);
}

function getEmbedLinkText(element: HTMLElement): string | null {
    const directLinkText = getElementXMindLinkText(element);
    if (directLinkText) {
        return directLinkText;
    }

    for (const child of Array.from(
        element.querySelectorAll<HTMLElement>(XMIND_EMBED_LINK_SELECTOR)
    )) {
        const childLinkText = getElementXMindLinkText(child);
        if (childLinkText) {
            return childLinkText;
        }
    }

    return null;
}

function resolveXMindLinkText(
    app: App,
    linkText: string,
    sourcePath: string
): TFile | null {
    const linkedFile = app.metadataCache.getFirstLinkpathDest(
        linkText,
        sourcePath
    );
    if (isXMindFile(linkedFile)) {
        return linkedFile;
    }

    const directFile = app.vault.getAbstractFileByPath(linkText);
    if (directFile instanceof TFile && isXMindFile(directFile)) {
        return directFile;
    }

    return findXMindFileByLinkText(app, linkText);
}

function resolveXMindEmbedFile(
    app: App,
    element: HTMLElement,
    sourcePath: string
): TFile | null {
    const linkText = getEmbedLinkText(element);
    if (!linkText) {
        return null;
    }

    return resolveXMindLinkText(app, linkText, sourcePath);
}

function resolveRawXMindEmbedFile(
    app: App,
    element: HTMLElement,
    sourcePath: string
): TFile | null {
    const linkText = getRawEmbedLinkText(element);
    if (!linkText) {
        return null;
    }

    return resolveXMindLinkText(app, linkText, sourcePath);
}

class XMindMarkdownEmbedRenderer extends MarkdownRenderChild {
    private viewer: XMindRenderAdapter | null = null;
    private isUnloaded = false;
    private readonly translator: XMindTranslator;

    constructor(
        containerEl: HTMLElement,
        private readonly app: App,
        private readonly file: TFile
    ) {
        super(containerEl);
        this.translator = createXMindTranslator(
            detectXMindLocale(
                app,
                containerEl.ownerDocument.defaultView,
                containerEl.ownerDocument
            )
        );
    }

    onload(): void {
        void this.loadEmbed();
    }

    onunload(): void {
        this.isUnloaded = true;
        this.viewer?.destroy();
        this.viewer = null;
    }

    private async loadEmbed(): Promise<void> {
        this.containerEl.empty();
        this.containerEl.addClass('xmind-markdown-embed-host');
        this.containerEl.createDiv({
            cls: 'xmind-markdown-embed-loading',
            text: this.translator.t('viewerLoading'),
        });

        try {
            const loadedFile = await loadLocalXMindFile(
                await this.app.vault.readBinary(this.file)
            );
            if (this.isUnloaded) {
                return;
            }

            this.containerEl.empty();
            this.viewer = new XMindRenderAdapter({
                el: this.containerEl,
                file: loadedFile.binary,
                onError: (error): void => this.showError(error),
                locale: this.translator.locale,
            });
        } catch (error) {
            if (!this.isUnloaded) {
                this.showError(error);
            }
        }
    }

    private showError(error: unknown): void {
        this.viewer?.destroy();
        this.viewer = null;
        this.containerEl.empty();
        this.containerEl.createDiv({
            cls: 'xmind-markdown-embed-error',
            text: this.translator.t('renderFailed', {
                message: getViewerErrorMessage(error),
            }),
        });
    }
}

class XMindEmbedComponent extends Component {
    private viewer: XMindRenderAdapter | null = null;
    private isUnloaded = false;
    private loadPromise: Promise<void> | null = null;
    private readonly translator: XMindTranslator;

    constructor(
        private readonly containerEl: HTMLElement,
        private readonly app: App,
        private readonly file: TFile
    ) {
        super();
        this.translator = createXMindTranslator(
            detectXMindLocale(
                app,
                containerEl.ownerDocument.defaultView,
                containerEl.ownerDocument
            )
        );
    }

    onload(): void {
        void this.loadFile();
    }

    onunload(): void {
        this.isUnloaded = true;
        this.viewer?.destroy();
        this.viewer = null;
    }

    loadFile(): void {
        this.loadPromise ??= this.loadEmbed();
    }

    private async loadEmbed(): Promise<void> {
        removeAdjacentStrayEmbedBracketText(this.containerEl);
        this.containerEl.empty();
        this.containerEl.addClass('xmind-markdown-embed-host');
        this.containerEl.addClass('xmind-native-embed-host');
        this.containerEl.createDiv({
            cls: 'xmind-markdown-embed-loading',
            text: this.translator.t('viewerLoading'),
        });

        try {
            const binary = await this.readXMindFile();
            if (this.isUnloaded) {
                return;
            }

            this.containerEl.empty();
            this.viewer = new XMindRenderAdapter({
                el: this.containerEl,
                file: binary,
                onError: (error): void => this.showError(error),
                onReload: (): Promise<ArrayBuffer> => this.readXMindFile(),
                locale: this.translator.locale,
            });
        } catch (error) {
            if (!this.isUnloaded) {
                this.showError(error);
            }
        }
    }

    private async readXMindFile(): Promise<ArrayBuffer> {
        const loadedFile = await loadLocalXMindFile(
            await this.app.vault.readBinary(this.file)
        );
        return loadedFile.binary;
    }

    private showError(error: unknown): void {
        this.viewer?.destroy();
        this.viewer = null;
        this.containerEl.empty();
        this.containerEl.createDiv({
            cls: 'xmind-markdown-embed-error',
            text: this.translator.t('renderFailed', {
                message: getViewerErrorMessage(error),
            }),
        });
    }
}

class XMindLivePreviewEmbedWidget extends WidgetType {
    private viewer: XMindRenderAdapter | null = null;
    private isDestroyed = false;
    private readonly translator: XMindTranslator;

    constructor(
        private readonly app: App,
        private readonly file: TFile,
        private readonly locale: ReturnType<typeof detectXMindLocale>
    ) {
        super();
        this.translator = createXMindTranslator(locale);
    }

    eq(other: XMindLivePreviewEmbedWidget): boolean {
        return (
            other.file.path === this.file.path &&
            other.translator.locale === this.translator.locale
        );
    }

    toDOM(view: EditorView): HTMLElement {
        const host = view.dom.ownerDocument.createElement('div');
        host.classList.add(
            'xmind-markdown-embed-host',
            'xmind-live-preview-embed-host'
        );
        host.addEventListener('mousedown', (event) => {
            event.stopPropagation();
        });
        host.addEventListener('click', (event) => {
            event.stopPropagation();
        });

        void this.loadEmbed(host);
        return host;
    }

    destroy(): void {
        this.isDestroyed = true;
        this.viewer?.destroy();
        this.viewer = null;
    }

    ignoreEvent(): boolean {
        return true;
    }

    private async loadEmbed(host: HTMLElement): Promise<void> {
        host.empty();
        host.createDiv({
            cls: 'xmind-markdown-embed-loading',
            text: this.translator.t('viewerLoading'),
        });

        try {
            const binary = await this.readXMindFile();
            if (this.isDestroyed) {
                return;
            }

            host.empty();
            this.viewer = new XMindRenderAdapter({
                el: host,
                file: binary,
                onError: (error): void => this.showError(host, error),
                onReload: (): Promise<ArrayBuffer> => this.readXMindFile(),
                locale: this.translator.locale,
            });
        } catch (error) {
            if (!this.isDestroyed) {
                this.showError(host, error);
            }
        }
    }

    private async readXMindFile(): Promise<ArrayBuffer> {
        const loadedFile = await loadLocalXMindFile(
            await this.app.vault.readBinary(this.file)
        );
        return loadedFile.binary;
    }

    private showError(host: HTMLElement, error: unknown): void {
        this.viewer?.destroy();
        this.viewer = null;
        host.empty();
        host.createDiv({
            cls: 'xmind-markdown-embed-error',
            text: this.translator.t('renderFailed', {
                message: getViewerErrorMessage(error),
            }),
        });
    }
}

class XMindLivePreviewEmbedPlugin {
    decorations: DecorationSet;

    constructor(
        private readonly view: EditorView,
        private readonly app: App
    ) {
        this.decorations = this.buildDecorations();
    }

    update(update: ViewUpdate): void {
        if (
            update.docChanged ||
            update.viewportChanged ||
            update.selectionSet
        ) {
            this.decorations = this.buildDecorations();
        }
    }

    private buildDecorations(): DecorationSet {
        if (!isLivePreview(this.view)) {
            return Decoration.none;
        }

        const sourcePath = getEditorSourcePath(this.view) ?? '';

        const builder = new RangeSetBuilder<Decoration>();
        for (const range of this.view.visibleRanges) {
            const text = this.view.state.doc.sliceString(range.from, range.to);
            XMIND_LIVE_PREVIEW_EMBED_PATTERN.lastIndex = 0;

            let match: RegExpExecArray | null;
            while (
                (match = XMIND_LIVE_PREVIEW_EMBED_PATTERN.exec(text)) !== null
            ) {
                const linkText = normalizeEmbedLinkText(match[1]);
                if (!linkText) {
                    continue;
                }

                const from = range.from + match.index;
                const line = this.view.state.doc.lineAt(from);
                if (line.text.trim() !== match[0]) {
                    continue;
                }
                if (selectionTouchesRange(this.view, line.from, line.to)) {
                    continue;
                }

                const file = resolveXMindLinkText(
                    this.app,
                    linkText,
                    sourcePath
                );
                if (!file) {
                    continue;
                }

                builder.add(
                    line.from,
                    line.to,
                    Decoration.replace({
                        block: true,
                        widget: new XMindLivePreviewEmbedWidget(
                            this.app,
                            file,
                            detectXMindLocale(
                                this.app,
                                this.view.dom.ownerDocument.defaultView,
                                this.view.dom.ownerDocument
                            )
                        ),
                    })
                );
            }
        }

        return builder.finish();
    }
}

function isLivePreview(view: EditorView): boolean {
    try {
        return view.state.field(editorLivePreviewField, false) === true;
    } catch {
        return false;
    }
}

function getEditorSourcePath(view: EditorView): string | null {
    try {
        const info = view.state.field(
            editorInfoField,
            false
        ) as MarkdownFileInfo | undefined;
        return info?.file?.path ?? null;
    } catch {
        return null;
    }
}

function selectionTouchesRange(
    view: EditorView,
    from: number,
    to: number
): boolean {
    return view.state.selection.ranges.some((range) =>
        range.empty
            ? range.from >= from && range.from <= to
            : range.from < to && range.to > from
    );
}

function createLivePreviewEmbedExtension(
    app: App
): Extension {
    return Prec.highest(
        ViewPlugin.fromClass(
            class extends XMindLivePreviewEmbedPlugin {
                constructor(view: EditorView) {
                    super(view, app);
                }
            },
            {
                decorations: (value) => value.decorations,
            }
        )
    );
}

export class XMindViewerPlugin extends Plugin {
    private hasNativeEmbedRegistry = false;

    /**
     * Called when the plugin is loaded.
     *
     * Registers the view that will show when an XMind file is opened.
     * Also registers the extensions that will trigger the view.
     */
    onload(): void {
        this.registerView(
            XMIND_VIEW_TYPE,
            (leaf) => new XMindViewerView(leaf, this)
        );

        this.registerExtensions(['xmind'], XMIND_VIEW_TYPE);
        this.hasNativeEmbedRegistry = this.registerNativeXMindEmbed();
        this.registerEditorExtension(createLivePreviewEmbedExtension(this.app));
        this.registerMarkdownPostProcessor(
            (el, ctx) => this.renderXMindMarkdownEmbeds(el, ctx),
            1000
        );
    }

    private registerNativeXMindEmbed(): boolean {
        const registry = getXMindEmbedRegistry(this.app);
        if (!registry) {
            return false;
        }

        registry.registerExtensions(
            [XMIND_EXTENSION],
            (info, file) =>
                new XMindEmbedComponent(info.containerEl, this.app, file)
        );
        this.register(() => {
            registry.unregisterExtensions?.([XMIND_EXTENSION]);
        });
        return true;
    }

    private renderXMindMarkdownEmbeds(
        el: HTMLElement,
        ctx: MarkdownPostProcessorContext
    ): void {
        const renderedElements = new Set<HTMLElement>();
        const embedElements = this.hasNativeEmbedRegistry
            ? []
            : [
                  ...(el.matches(XMIND_EMBED_SELECTOR) ? [el] : []),
                  ...Array.from(
                      el.querySelectorAll<HTMLElement>(XMIND_EMBED_SELECTOR)
                  ),
              ];

        for (const embedElement of embedElements) {
            const file = resolveXMindEmbedFile(
                this.app,
                embedElement,
                ctx.sourcePath
            );
            if (!file) {
                continue;
            }

            this.renderXMindEmbedElement(embedElement, file, ctx);
            renderedElements.add(embedElement);
        }

        for (const rawElement of Array.from(
            el.querySelectorAll<HTMLElement>(XMIND_RAW_EMBED_SELECTOR)
        )) {
            if (rawElement.closest('.xmind-markdown-embed-host')) {
                continue;
            }

            const embedElement = rawElement.closest<HTMLElement>(
                XMIND_EMBED_SELECTOR
            );
            const targetElement = embedElement ?? rawElement;
            if (renderedElements.has(targetElement)) {
                continue;
            }

            const file = resolveRawXMindEmbedFile(
                this.app,
                rawElement,
                ctx.sourcePath
            );
            if (!file) {
                continue;
            }

            this.renderXMindEmbedElement(targetElement, file, ctx);
            renderedElements.add(targetElement);
        }
    }

    private renderXMindEmbedElement(
        embedElement: HTMLElement,
        file: TFile,
        ctx: MarkdownPostProcessorContext
    ): void {
        const host = embedElement.ownerDocument.createElement('div');
        host.classList.add('xmind-markdown-embed-host');
        embedElement.replaceWith(host);
        removeAdjacentStrayEmbedBracketText(host);
        ctx.addChild(new XMindMarkdownEmbedRenderer(host, this.app, file));
    }
}
