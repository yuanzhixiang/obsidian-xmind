import {
    createXMindTranslator,
    detectXMindLocale,
    XMindLocale,
    XMindTranslator,
} from '../i18n';
import {
    parseXMindDocument,
    XMindDocument,
    XMindTopicNode,
} from './xmind-document';
import {
    renderNativeMindMap,
    NativeMindMapView,
} from './renderer/svg-renderer';
import {
    XMindViewerSheet,
    XMindViewerState,
    XMindViewerStateListener,
    XMindViewerStateStore,
} from './viewer-state';
import { ViewerEventName } from './viewer-events';

export interface XMindRenderAdapterOptions {
    el: HTMLElement;
    file: ArrayBuffer;
    onError?: (error: unknown) => void;
    onReload?: () => Promise<ArrayBuffer>;
    onStateChange?: XMindViewerStateListener;
    locale?: XMindLocale;
}

const MIN_ZOOM = 0.2;
const MAX_ZOOM = 2.5;
const DEFAULT_ZOOM = 1;
const FIT_PADDING = 96;
const WHEEL_LINE_DELTA = 16;
const WHEEL_ZOOM_SENSITIVITY = 0.004;
const FOLDED_TOPIC_BRANCH = 'folded';

interface ViewportPoint {
    x: number;
    y: number;
}

interface ViewportAnchor {
    mapPoint: ViewportPoint;
    viewportPoint: ViewportPoint;
}

interface RenderSheetOptions {
    fitToView: boolean;
    preserveViewport: boolean;
}

interface OpenFileOptions {
    preferredSheetId?: string | null;
}

interface TopicSelectionOptions {
    revealPath?: boolean;
    centerInViewport?: boolean;
    focusTopic?: boolean;
}

interface RightDragState {
    pointerId: number;
    lastClientX: number;
    lastClientY: number;
}

function clamp(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, value));
}

function createElement<K extends keyof HTMLElementTagNameMap>(
    ownerDocument: Document,
    tagName: K,
    className?: string
): HTMLElementTagNameMap[K] {
    const element = ownerDocument.createElement(tagName);
    if (className) {
        element.classList.add(className);
    }

    return element;
}

function normalizeWheelDelta(
    event: WheelEvent,
    viewportWidth: number,
    viewportHeight: number
): ViewportPoint {
    if (event.deltaMode === 1) {
        return {
            x: event.deltaX * WHEEL_LINE_DELTA,
            y: event.deltaY * WHEEL_LINE_DELTA,
        };
    }

    if (event.deltaMode === 2) {
        return {
            x: event.deltaX * viewportWidth,
            y: event.deltaY * viewportHeight,
        };
    }

    return {
        x: event.deltaX,
        y: event.deltaY,
    };
}

function getCanvasPoint(
    canvas: HTMLElement,
    event: MouseEvent | PointerEvent | WheelEvent
): ViewportPoint {
    const rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
    };
}

function isZoomWheelEvent(event: WheelEvent): boolean {
    return event.ctrlKey || event.metaKey;
}

function isFindHotkey(event: KeyboardEvent): boolean {
    return (
        event.key.toLowerCase() === 'f' &&
        (event.metaKey || event.ctrlKey) &&
        !event.altKey &&
        !event.shiftKey
    );
}

function countTopicDescendants(topic: XMindTopicNode): number {
    return topic.children.reduce(
        (sum, child) => sum + 1 + countTopicDescendants(child),
        0
    );
}

function formatHiddenTopicCount(count: number): string {
    return count > 999 ? '...' : String(count);
}

export class XMindRenderAdapter {
    private readonly state = new XMindViewerStateStore();
    private readonly ownerDocument: Document;
    private readonly ownerWindow: Window;
    private readonly translator: XMindTranslator;
    private readonly root: HTMLDivElement;
    private readonly canvas: HTMLDivElement;
    private readonly status: HTMLDivElement;
    private readonly zoomLabel: HTMLSpanElement;
    private readonly sheetTabs: HTMLDivElement;
    private readonly outliner: HTMLDivElement;
    private readonly outlinerToggleButton: HTMLButtonElement;
    private readonly searchPanel: HTMLDivElement;
    private readonly searchInput: HTMLInputElement;
    private readonly searchResultLabel: HTMLSpanElement;
    private readonly searchToggleButton: HTMLButtonElement;
    private readonly reloadButton: HTMLButtonElement | null;
    private readonly unsubscribeInitialStateListener?: () => void;
    private documentModel: XMindDocument | null = null;
    private view: NativeMindMapView | null = null;
    private readonly expandedTopicIdsBySheet = new Map<string, Set<string>>();
    private readonly collapsedTopicIdsBySheet = new Map<string, Set<string>>();
    private readonly selectedTopicIdBySheet = new Map<string, string>();
    private zoomScale = DEFAULT_ZOOM;
    private panOffsetX = 0;
    private panOffsetY = 0;
    private fitMode = true;
    private isOutlinerVisible = false;
    private isSearchVisible = false;
    private searchQuery = '';
    private readonly searchMatchIndexBySheet = new Map<string, number>();
    private rightDragState: RightDragState | null = null;
    private destroyed = false;

    constructor(private readonly options: XMindRenderAdapterOptions) {
        this.ownerDocument = options.el.ownerDocument;
        const ownerWindow = this.ownerDocument.defaultView;
        if (!ownerWindow) {
            throw new Error('XMind viewer container has no owner window.');
        }
        this.ownerWindow = ownerWindow;
        this.translator = createXMindTranslator(
            options.locale ??
                detectXMindLocale(undefined, ownerWindow, this.ownerDocument)
        );
        this.unsubscribeInitialStateListener = options.onStateChange
            ? this.state.subscribe(options.onStateChange)
            : undefined;

        this.root = createElement(
            this.ownerDocument,
            'div',
            'xmind-native-viewer'
        );
        this.canvas = createElement(
            this.ownerDocument,
            'div',
            'xmind-native-canvas'
        );
        this.canvas.tabIndex = 0;
        this.canvas.setAttribute(
            'aria-label',
            this.translator.t('viewerLabel')
        );
        this.status = createElement(
            this.ownerDocument,
            'div',
            'xmind-native-status'
        );
        this.zoomLabel = createElement(this.ownerDocument, 'span');
        this.sheetTabs = createElement(
            this.ownerDocument,
            'div',
            'xmind-native-sheet-tabs'
        );
        this.outliner = createElement(
            this.ownerDocument,
            'div',
            'xmind-native-outliner'
        );
        this.outlinerToggleButton = this.createToolbarButton(
            this.translator.t('outliner'),
            () => this.toggleOutliner()
        );
        this.searchPanel = createElement(
            this.ownerDocument,
            'div',
            'xmind-native-search'
        );
        this.searchInput = createElement(this.ownerDocument, 'input');
        this.searchResultLabel = createElement(this.ownerDocument, 'span');
        this.searchToggleButton = this.createToolbarButton(
            this.translator.t('search'),
            () => this.toggleSearch()
        );
        this.reloadButton = options.onReload
            ? this.createToolbarButton(this.translator.t('reload'), () =>
                  this.reloadFile()
              )
            : null;

        this.mount();
        this.ownerWindow.addEventListener('resize', this.handleResize);
        this.canvas.addEventListener('wheel', this.handleWheel, {
            passive: false,
        });
        this.canvas.addEventListener('pointerdown', this.handlePointerDown);
        this.canvas.addEventListener('pointermove', this.handlePointerMove);
        this.canvas.addEventListener('pointerup', this.handlePointerUp);
        this.canvas.addEventListener('pointercancel', this.handlePointerUp);
        this.canvas.addEventListener('lostpointercapture', this.handlePointerUp);
        this.canvas.addEventListener('contextmenu', this.handleContextMenu);
        this.root.addEventListener('keydown', this.handleKeyDown);
        void this.openFile(options.file).catch((error) =>
            this.showError(error)
        );
    }

    destroy(): void {
        this.destroyed = true;
        this.unsubscribeInitialStateListener?.();
        this.ownerWindow.removeEventListener('resize', this.handleResize);
        this.canvas.removeEventListener('wheel', this.handleWheel);
        this.canvas.removeEventListener('pointerdown', this.handlePointerDown);
        this.canvas.removeEventListener('pointermove', this.handlePointerMove);
        this.canvas.removeEventListener('pointerup', this.handlePointerUp);
        this.canvas.removeEventListener('pointercancel', this.handlePointerUp);
        this.canvas.removeEventListener(
            'lostpointercapture',
            this.handlePointerUp
        );
        this.canvas.removeEventListener('contextmenu', this.handleContextMenu);
        this.root.removeEventListener('keydown', this.handleKeyDown);
        this.view?.destroy();
        this.view = null;
        this.root.remove();
    }

    getState(): XMindViewerState {
        return this.state.getSnapshot();
    }

    subscribeState(listener: XMindViewerStateListener): () => void {
        return this.state.subscribe(listener);
    }

    getSheets(): XMindViewerSheet[] {
        return this.state.getSnapshot().sheets;
    }

    getActiveSheetId(): string | null {
        return this.state.getSnapshot().activeSheetId;
    }

    getZoom(): number | null {
        return this.state.getSnapshot().zoom;
    }

    async fitMap(): Promise<void> {
        this.fitMapSync();
    }

    async zoom(scale: number): Promise<void> {
        this.setZoom(scale);
    }

    async switchSheet(sheetId: string): Promise<void> {
        this.switchSheetSync(sheetId);
    }

    private readonly handleResize = (): void => {
        if (this.fitMode) {
            this.fitMapSync();
            return;
        }
        this.applyTransform();
    };

    private readonly handleWheel = (event: WheelEvent): void => {
        if (!this.view) {
            return;
        }

        event.preventDefault();
        const delta = normalizeWheelDelta(
            event,
            this.canvas.clientWidth,
            this.canvas.clientHeight
        );

        if (isZoomWheelEvent(event)) {
            if (delta.y === 0) {
                return;
            }

            const point = getCanvasPoint(this.canvas, event);
            const zoomFactor = Math.exp(-delta.y * WHEEL_ZOOM_SENSITIVITY);
            this.setZoomAt(this.zoomScale * zoomFactor, point);
            return;
        }

        this.fitMode = false;
        this.panOffsetX -= delta.x;
        this.panOffsetY -= delta.y;
        this.applyTransform();
    };

    private readonly handleKeyDown = (event: KeyboardEvent): void => {
        if (!isFindHotkey(event)) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();
        this.openSearchFromHotkey();
    };

    private readonly handlePointerDown = (event: PointerEvent): void => {
        this.canvas.focus({ preventScroll: true });

        if (!this.view || event.button !== 2) {
            return;
        }

        event.preventDefault();
        this.fitMode = false;
        this.rightDragState = {
            pointerId: event.pointerId,
            lastClientX: event.clientX,
            lastClientY: event.clientY,
        };
        this.canvas.classList.add('is-right-dragging');
        this.canvas.setPointerCapture(event.pointerId);
    };

    private readonly handlePointerMove = (event: PointerEvent): void => {
        if (
            !this.rightDragState ||
            this.rightDragState.pointerId !== event.pointerId
        ) {
            return;
        }

        if ((event.buttons & 2) !== 2) {
            this.endRightDrag(event.pointerId);
            return;
        }

        event.preventDefault();
        const deltaX = event.clientX - this.rightDragState.lastClientX;
        const deltaY = event.clientY - this.rightDragState.lastClientY;
        if (deltaX === 0 && deltaY === 0) {
            return;
        }

        this.rightDragState = {
            pointerId: event.pointerId,
            lastClientX: event.clientX,
            lastClientY: event.clientY,
        };
        this.panOffsetX += deltaX;
        this.panOffsetY += deltaY;
        this.applyTransform();
    };

    private readonly handlePointerUp = (event: PointerEvent): void => {
        if (this.rightDragState?.pointerId !== event.pointerId) {
            return;
        }

        event.preventDefault();
        this.endRightDrag(event.pointerId);
    };

    private readonly handleContextMenu = (event: MouseEvent): void => {
        if (!this.view) {
            return;
        }

        event.preventDefault();
    };

    private mount(): void {
        this.status.textContent = this.translator.t('viewerLoading');
        this.sheetTabs.textContent = '';

        const toolbar = createElement(
            this.ownerDocument,
            'div',
            'xmind-native-toolbar'
        );
        toolbar.append(
            this.createToolbarButton('-', () =>
                this.setZoom(this.zoomScale * 0.9)
            ),
            this.zoomLabel,
            this.createToolbarButton('+', () =>
                this.setZoom(this.zoomScale * 1.1)
            ),
            this.createToolbarButton(this.translator.t('fitCanvas'), () =>
                this.fitMapSync()
            ),
            ...(this.reloadButton ? [this.reloadButton] : []),
            this.searchToggleButton,
            this.outlinerToggleButton
        );

        this.outliner.setAttribute(
            'aria-label',
            this.translator.t('outlinerLabel')
        );
        this.outliner.hidden = true;
        this.outlinerToggleButton.setAttribute('aria-pressed', 'false');
        this.mountSearchPanel();
        this.root.append(
            this.canvas,
            this.status,
            this.sheetTabs,
            this.searchPanel,
            this.outliner,
            toolbar
        );
        this.options.el.replaceChildren(this.root);
        this.updateZoomLabel();
    }

    private createToolbarButton(
        label: string,
        onClick: () => Promise<void> | void
    ): HTMLButtonElement {
        const button = createElement(this.ownerDocument, 'button');
        button.type = 'button';
        button.textContent = label;
        button.addEventListener('click', () => {
            void Promise.resolve(onClick()).catch((error) =>
                this.showError(error)
            );
        });
        return button;
    }

    private mountSearchPanel(): void {
        this.searchPanel.hidden = true;
        this.searchPanel.setAttribute(
            'aria-label',
            this.translator.t('searchLabel')
        );
        this.searchToggleButton.setAttribute('aria-pressed', 'false');

        this.searchInput.type = 'search';
        this.searchInput.placeholder = this.translator.t('searchPlaceholder');
        this.searchInput.setAttribute(
            'aria-label',
            this.translator.t('searchPlaceholder')
        );
        this.searchInput.addEventListener('input', () => {
            this.updateSearchQuery(this.searchInput.value);
        });
        this.searchInput.addEventListener('keydown', (event: KeyboardEvent) => {
            if (isFindHotkey(event)) {
                event.preventDefault();
                event.stopPropagation();
                this.openSearchFromHotkey();
                return;
            }

            if (event.key === 'Enter') {
                event.preventDefault();
                this.moveSearchMatch(event.shiftKey ? -1 : 1);
            }
            event.stopPropagation();
        });

        const previousButton = this.createToolbarButton(
            this.translator.t('searchPrevious'),
            () => this.moveSearchMatch(-1)
        );
        const nextButton = this.createToolbarButton(
            this.translator.t('searchNext'),
            () => this.moveSearchMatch(1)
        );
        this.searchPanel.append(
            this.searchInput,
            previousButton,
            nextButton,
            this.searchResultLabel
        );
        this.updateSearchResultLabel(null);
    }

    private async openFile(
        file: ArrayBuffer,
        options: OpenFileOptions = {}
    ): Promise<void> {
        this.status.textContent = this.translator.t('viewerLoading');
        this.documentModel = await parseXMindDocument(file);
        this.expandedTopicIdsBySheet.clear();
        this.collapsedTopicIdsBySheet.clear();
        this.selectedTopicIdBySheet.clear();
        this.searchQuery = '';
        this.searchInput.value = '';
        this.searchMatchIndexBySheet.clear();
        this.emitSheetsLoad();
        const preferredSheet = this.documentModel.sheets.find(
            (sheet) => sheet.id === options.preferredSheetId
        );
        this.switchSheetSync(
            preferredSheet?.id ?? this.documentModel.sheets[0].id
        );
        this.emit('map-ready', true);
    }

    private async reloadFile(): Promise<void> {
        const reloadButton = this.reloadButton;
        if (!this.options.onReload || !reloadButton || this.destroyed) {
            return;
        }

        reloadButton.disabled = true;
        this.status.textContent = this.translator.t('viewerLoading');
        try {
            const activeSheetId = this.getActiveSheetId();
            const file = await this.options.onReload();
            if (this.isDestroyed()) {
                return;
            }
            await this.openFile(file, { preferredSheetId: activeSheetId });
        } finally {
            reloadButton.disabled = false;
        }
    }

    private isDestroyed(): boolean {
        return this.destroyed;
    }

    private emitSheetsLoad(): void {
        if (!this.documentModel) {
            return;
        }

        this.emit(
            'sheets-load',
            this.documentModel.sheets.map((sheet) => ({
                id: sheet.id,
                title: sheet.title,
            }))
        );
    }

    private renderSheetTabs(activeSheetId: string | null): void {
        const sheets = this.documentModel?.sheets ?? [];
        const fragment = this.ownerDocument.createDocumentFragment();

        for (const sheet of sheets) {
            const tab = createElement(
                this.ownerDocument,
                'button',
                'xmind-native-sheet-tab'
            );
            tab.type = 'button';
            tab.textContent = sheet.title;
            tab.title = sheet.title;
            tab.dataset.sheetId = sheet.id;
            if (sheet.id === activeSheetId) {
                tab.classList.add('is-active');
                tab.setAttribute('aria-current', 'page');
            }
            tab.addEventListener('click', () => {
                if (sheet.id === this.getActiveSheetId()) {
                    return;
                }

                try {
                    this.switchSheetSync(sheet.id);
                } catch (error) {
                    this.showError(error);
                }
            });
            fragment.appendChild(tab);
        }

        this.sheetTabs.replaceChildren(fragment);
    }

    private switchSheetSync(sheetId: string): void {
        const sheet = this.documentModel?.sheets.find(
            (item) => item.id === sheetId
        );
        if (!sheet) {
            throw new Error(
                this.translator.t('rootMissingSheet', { sheetId })
            );
        }

        this.status.textContent = '';
        this.renderSheetTabs(sheet.id);
        this.renderSheet(sheet, {
            fitToView: true,
            preserveViewport: false,
        });
        this.emit('sheet-switch', sheet.id);
    }

    private renderSheet(
        sheet: NonNullable<XMindDocument['sheets'][number]>,
        renderOptions: RenderSheetOptions
    ): void {
        const viewportAnchor = renderOptions.preserveViewport
            ? this.captureViewportAnchor()
            : null;
        const searchMatches = this.getSearchMatches(sheet);
        const currentSearchTopicId = this.currentSearchTopicId(
            sheet,
            searchMatches
        );

        this.view?.destroy();
        this.view = renderNativeMindMap(this.canvas, sheet, {
            expandedTopicIds: this.getExpandedTopicIds(sheet.id),
            collapsedTopicIds: this.getCollapsedTopicIds(sheet.id),
            selectedTopicId: this.selectedTopicIdBySheet.get(sheet.id) ?? null,
            searchMatchTopicIds: new Set(searchMatches),
            currentSearchTopicId,
            locale: this.translator.locale,
            onToggleTopic: (topicId, isExpanded): void => {
                this.toggleTopic(sheet.id, topicId, isExpanded);
            },
            onSelectTopic: (topicId): void => {
                this.selectTopic(sheet.id, topicId, {
                    focusTopic: true,
                });
            },
        });

        if (renderOptions.fitToView) {
            this.fitMapSync();
            this.renderOutliner(sheet);
            this.updateSearchResultLabel(sheet);
            return;
        }

        this.fitMode = false;
        if (viewportAnchor) {
            this.restoreViewportAnchor(viewportAnchor);
        }
        this.applyTransform();
        this.renderOutliner(sheet);
        this.updateSearchResultLabel(sheet);
    }

    private normalizeSearchQuery(value: string): string {
        return value.trim().toLocaleLowerCase();
    }

    private searchableTopicText(topic: XMindTopicNode): string {
        return [
            topic.title,
            ...topic.labelTexts,
            topic.noteText,
            topic.href,
        ]
            .filter((value): value is string => Boolean(value))
            .join('\n')
            .toLocaleLowerCase();
    }

    private collectSearchableTopics(topic: XMindTopicNode): XMindTopicNode[] {
        const topics = [topic];
        for (const child of this.topicBucketsForOutliner(topic)) {
            topics.push(...this.collectSearchableTopics(child));
        }
        return topics;
    }

    private getSearchMatches(
        sheet: NonNullable<XMindDocument['sheets'][number]>
    ): string[] {
        const query = this.normalizeSearchQuery(this.searchQuery);
        if (!query) {
            return [];
        }

        return this.collectSearchableTopics(sheet.rootTopic)
            .filter((topic) => this.searchableTopicText(topic).includes(query))
            .map((topic) => topic.id);
    }

    private currentSearchTopicId(
        sheet: NonNullable<XMindDocument['sheets'][number]>,
        matches = this.getSearchMatches(sheet)
    ): string | null {
        if (matches.length === 0) {
            return null;
        }

        const index = clamp(
            this.searchMatchIndexBySheet.get(sheet.id) ?? 0,
            0,
            matches.length - 1
        );
        this.searchMatchIndexBySheet.set(sheet.id, index);
        return matches[index] ?? null;
    }

    private findTopicAncestorIds(
        rootTopic: XMindTopicNode,
        topicId: string
    ): string[] {
        const visitedTopicIds = new Set<string>();
        const visit = (
            topic: XMindTopicNode,
            ancestorIds: string[]
        ): string[] | null => {
            if (visitedTopicIds.has(topic.id)) {
                return null;
            }
            visitedTopicIds.add(topic.id);

            if (topic.id === topicId) {
                return ancestorIds;
            }

            for (const childType in topic.childrenByType) {
                const children = topic.childrenByType[childType];
                if (!children) {
                    continue;
                }

                for (const child of children) {
                    const match = visit(child, [...ancestorIds, topic.id]);
                    if (match) {
                        return match;
                    }
                }
            }

            return null;
        };

        return visit(rootTopic, []) ?? [];
    }

    private revealTopicPath(
        sheet: NonNullable<XMindDocument['sheets'][number]>,
        topicId: string
    ): void {
        const ancestorIds = this.findTopicAncestorIds(sheet.rootTopic, topicId);
        if (ancestorIds.length === 0) {
            return;
        }

        const expandedTopicIds = this.getExpandedTopicIds(sheet.id);
        const collapsedTopicIds = this.getCollapsedTopicIds(sheet.id);
        for (const ancestorId of ancestorIds) {
            expandedTopicIds.add(ancestorId);
            collapsedTopicIds.delete(ancestorId);
        }
    }

    private centerTopicInViewport(topicId: string): void {
        if (!this.view) {
            return;
        }

        const topicBounds = this.view.getTopicBounds(topicId);
        if (!topicBounds) {
            return;
        }

        const baseOffset = this.getBaseOffset(this.zoomScale);
        if (!baseOffset) {
            return;
        }

        const topicCenterX = (topicBounds.minX + topicBounds.maxX) / 2;
        const topicCenterY = (topicBounds.minY + topicBounds.maxY) / 2;
        this.fitMode = false;
        this.panOffsetX =
            this.canvas.clientWidth / 2 -
            baseOffset.x -
            topicCenterX * this.zoomScale;
        this.panOffsetY =
            this.canvas.clientHeight / 2 -
            baseOffset.y -
            topicCenterY * this.zoomScale;
        this.applyTransform();
    }

    private focusRenderedTopic(topicId: string): void {
        this.ownerWindow.requestAnimationFrame(() => {
            if (this.destroyed) {
                return;
            }

            const topicNode = Array.from(
                this.canvas.querySelectorAll<SVGGElement>('.xmind-topic')
            ).find((node) => node.dataset.topicId === topicId);
            topicNode?.focus({ preventScroll: true });
        });
    }

    private updateSearchResultLabel(
        sheet: NonNullable<XMindDocument['sheets'][number]> | null
    ): void {
        if (!sheet || !this.searchQuery.trim()) {
            this.searchResultLabel.textContent = '0/0';
            return;
        }

        const matches = this.getSearchMatches(sheet);
        if (matches.length === 0) {
            this.searchResultLabel.textContent = '0/0';
            return;
        }

        const index = this.searchMatchIndexBySheet.get(sheet.id) ?? 0;
        this.searchResultLabel.textContent = `${index + 1}/${matches.length}`;
    }

    private updateSearchQuery(value: string): void {
        this.searchQuery = value;
        const sheet = this.getActiveSheet();
        if (!sheet) {
            this.updateSearchResultLabel(null);
            return;
        }

        this.searchMatchIndexBySheet.set(sheet.id, 0);
        const matches = this.getSearchMatches(sheet);
        const firstMatch = matches[0];
        if (firstMatch) {
            this.selectedTopicIdBySheet.set(sheet.id, firstMatch);
            this.revealTopicPath(sheet, firstMatch);
        }
        this.renderSheet(sheet, {
            fitToView: false,
            preserveViewport: true,
        });
        if (firstMatch) {
            this.centerTopicInViewport(firstMatch);
        }
    }

    private moveSearchMatch(direction: -1 | 1): void {
        const sheet = this.getActiveSheet();
        if (!sheet) {
            return;
        }

        const matches = this.getSearchMatches(sheet);
        if (matches.length === 0) {
            this.updateSearchResultLabel(sheet);
            return;
        }

        const currentIndex = this.searchMatchIndexBySheet.get(sheet.id) ?? 0;
        const nextIndex =
            (currentIndex + direction + matches.length) % matches.length;
        this.searchMatchIndexBySheet.set(sheet.id, nextIndex);
        const nextMatch = matches[nextIndex];
        this.selectedTopicIdBySheet.set(sheet.id, nextMatch);
        this.revealTopicPath(sheet, nextMatch);
        this.renderSheet(sheet, {
            fitToView: false,
            preserveViewport: true,
        });
        this.centerTopicInViewport(nextMatch);
    }

    private setSearchVisible(visible: boolean, focusInput: boolean): void {
        this.isSearchVisible = visible;
        this.root.classList.toggle('has-search', this.isSearchVisible);
        this.searchPanel.hidden = !this.isSearchVisible;
        this.searchToggleButton.setAttribute(
            'aria-pressed',
            String(this.isSearchVisible)
        );
        this.updateSearchResultLabel(this.getActiveSheet());
        if (this.isSearchVisible) {
            this.ownerWindow.requestAnimationFrame(() => {
                this.searchInput.focus();
                this.searchInput.select();
            });
        }
    }

    private toggleSearch(): void {
        this.setSearchVisible(!this.isSearchVisible, true);
    }

    private openSearchFromHotkey(): void {
        this.setSearchVisible(true, true);
    }

    private toggleOutliner(): void {
        this.isOutlinerVisible = !this.isOutlinerVisible;
        this.root.classList.toggle('has-outliner', this.isOutlinerVisible);
        this.outliner.hidden = !this.isOutlinerVisible;
        this.outlinerToggleButton.setAttribute(
            'aria-pressed',
            String(this.isOutlinerVisible)
        );
        this.renderOutliner(this.getActiveSheet());
    }

    private topicBucketsForOutliner(topic: XMindTopicNode): XMindTopicNode[] {
        const orderedChildren: XMindTopicNode[] = [];
        const seenBuckets = new Set<string>();
        const pushBucket = (bucketName: string): void => {
            seenBuckets.add(bucketName);
            const children = topic.childrenByType[bucketName] ?? [];
            orderedChildren.push(...children);
        };

        pushBucket('attached');
        pushBucket('detached');
        pushBucket('callout');
        for (const bucketName in topic.childrenByType) {
            if (!seenBuckets.has(bucketName)) {
                pushBucket(bucketName);
            }
        }

        return orderedChildren;
    }

    private isOutlinerTopicExpanded(
        sheetId: string,
        topic: XMindTopicNode
    ): boolean {
        if (topic.children.length === 0) {
            return false;
        }

        if (this.getCollapsedTopicIds(sheetId).has(topic.id)) {
            return false;
        }

        if (this.getExpandedTopicIds(sheetId).has(topic.id)) {
            return true;
        }

        return topic.branch !== FOLDED_TOPIC_BRANCH;
    }

    private appendOutlinerTopic(
        list: HTMLOListElement,
        sheet: NonNullable<XMindDocument['sheets'][number]>,
        topic: XMindTopicNode,
        depth: number,
        selectedTopicId: string | null,
        searchMatchTopicIds: ReadonlySet<string>,
        currentSearchTopicId: string | null
    ): void {
        const item = createElement(
            this.ownerDocument,
            'li',
            'xmind-native-outliner-item'
        );
        item.dataset.depth = String(depth);

        const row = createElement(
            this.ownerDocument,
            'div',
            'xmind-native-outliner-row'
        );
        const children = this.topicBucketsForOutliner(topic);
        const hasChildren = children.length > 0;
        const isExpanded = this.isOutlinerTopicExpanded(sheet.id, topic);
        const hiddenDescendantCount =
            hasChildren && !isExpanded ? countTopicDescendants(topic) : 0;
        item.classList.toggle('has-children', hasChildren);
        item.classList.toggle('is-expanded', hasChildren && isExpanded);
        item.classList.toggle('is-collapsed', hasChildren && !isExpanded);
        item.classList.toggle('is-leaf', !hasChildren);

        const disclosure = createElement(
            this.ownerDocument,
            'button',
            'xmind-native-outliner-disclosure'
        );
        disclosure.type = 'button';
        if (hasChildren) {
            disclosure.textContent = isExpanded ? '▾' : '▸';
            disclosure.title = isExpanded
                ? this.translator.t('collapseTopic', { title: topic.title })
                : this.translator.t('expandTopicHiddenChildren', {
                      title: topic.title,
                      count: countTopicDescendants(topic),
                  });
            disclosure.setAttribute(
                'aria-label',
                isExpanded
                    ? this.translator.t('collapseTopic', {
                          title: topic.title,
                      })
                    : this.translator.t('expandTopicHiddenChildren', {
                          title: topic.title,
                          count: countTopicDescendants(topic),
                      })
            );
            disclosure.setAttribute('aria-expanded', String(isExpanded));
            disclosure.addEventListener('click', (event) => {
                event.stopPropagation();
                this.toggleTopic(sheet.id, topic.id, isExpanded);
            });
        } else {
            disclosure.classList.add('is-leaf');
            disclosure.textContent = '▪';
            disclosure.setAttribute('aria-hidden', 'true');
            disclosure.tabIndex = -1;
        }
        row.appendChild(disclosure);

        const button = createElement(
            this.ownerDocument,
            'button',
            'xmind-native-outliner-topic'
        );
        button.type = 'button';
        button.title = topic.title;
        button.dataset.topicId = topic.id;
        button.dataset.depth = String(depth);
        const title = createElement(
            this.ownerDocument,
            'span',
            'xmind-native-outliner-topic-title'
        );
        title.textContent = topic.title;
        button.appendChild(title);
        if (hiddenDescendantCount > 0) {
            const count = createElement(
                this.ownerDocument,
                'span',
                'xmind-native-outliner-count'
            );
            count.textContent = formatHiddenTopicCount(hiddenDescendantCount);
            button.appendChild(count);
        }
        button.classList.toggle('is-selected', selectedTopicId === topic.id);
        button.classList.toggle('is-search-match', searchMatchTopicIds.has(topic.id));
        button.classList.toggle('is-current-search-match', currentSearchTopicId === topic.id);
        button.addEventListener('click', () => {
            this.selectTopic(sheet.id, topic.id, {
                revealPath: true,
                centerInViewport: true,
            });
        });
        row.appendChild(button);
        item.appendChild(row);

        if (hasChildren && isExpanded) {
            const childList = createElement(
                this.ownerDocument,
                'ol',
                'xmind-native-outliner-children'
            );
            for (const child of children) {
                this.appendOutlinerTopic(
                    childList,
                    sheet,
                    child,
                    depth + 1,
                    selectedTopicId,
                    searchMatchTopicIds,
                    currentSearchTopicId
                );
            }
            item.appendChild(childList);
        }

        list.appendChild(item);
    }

    private renderOutliner(
        sheet: NonNullable<XMindDocument['sheets'][number]> | null
    ): void {
        if (!this.isOutlinerVisible) {
            return;
        }

        if (!sheet) {
            this.outliner.replaceChildren();
            return;
        }

        const title = createElement(
            this.ownerDocument,
            'h1',
            'xmind-native-outliner-title'
        );
        title.textContent = sheet.rootTopic.title;
        const list = createElement(
            this.ownerDocument,
            'ol',
            'xmind-native-outliner-list'
        );
        const searchMatches = this.getSearchMatches(sheet);
        const searchMatchTopicIds = new Set(searchMatches);
        const currentSearchTopicId = this.currentSearchTopicId(
            sheet,
            searchMatches
        );
        const rootChildren = this.topicBucketsForOutliner(sheet.rootTopic);
        const outlinerTopics =
            rootChildren.length > 0 ? rootChildren : [sheet.rootTopic];
        for (const topic of outlinerTopics) {
            this.appendOutlinerTopic(
                list,
                sheet,
                topic,
                0,
                this.selectedTopicIdBySheet.get(sheet.id) ?? null,
                searchMatchTopicIds,
                currentSearchTopicId
            );
        }
        this.outliner.replaceChildren(title, list);
    }

    private getExpandedTopicIds(sheetId: string): Set<string> {
        const existing = this.expandedTopicIdsBySheet.get(sheetId);
        if (existing) {
            return existing;
        }

        const expandedTopicIds = new Set<string>();
        this.expandedTopicIdsBySheet.set(sheetId, expandedTopicIds);
        return expandedTopicIds;
    }

    private getCollapsedTopicIds(sheetId: string): Set<string> {
        const existing = this.collapsedTopicIdsBySheet.get(sheetId);
        if (existing) {
            return existing;
        }

        const collapsedTopicIds = new Set<string>();
        this.collapsedTopicIdsBySheet.set(sheetId, collapsedTopicIds);
        return collapsedTopicIds;
    }

    private getSheetById(
        sheetId: string
    ): NonNullable<XMindDocument['sheets'][number]> | null {
        return (
            this.documentModel?.sheets.find((item) => item.id === sheetId) ??
            null
        );
    }

    private getActiveSheet(): NonNullable<XMindDocument['sheets'][number]> | null {
        const sheetId = this.getActiveSheetId();
        return sheetId ? this.getSheetById(sheetId) : null;
    }

    private selectTopic(
        sheetId: string,
        topicId: string,
        options: TopicSelectionOptions = {}
    ): void {
        const sheet = this.documentModel?.sheets.find(
            (item) => item.id === sheetId
        );
        if (!sheet || this.destroyed) {
            return;
        }

        if (
            this.selectedTopicIdBySheet.get(sheetId) === topicId &&
            !options.revealPath &&
            !options.centerInViewport &&
            !options.focusTopic
        ) {
            return;
        }

        this.selectedTopicIdBySheet.set(sheetId, topicId);
        if (options.revealPath) {
            this.revealTopicPath(sheet, topicId);
        }
        this.renderSheet(sheet, {
            fitToView: false,
            preserveViewport: true,
        });
        if (options.centerInViewport) {
            this.centerTopicInViewport(topicId);
        }
        if (options.focusTopic) {
            this.focusRenderedTopic(topicId);
        }
    }

    private toggleTopic(
        sheetId: string,
        topicId: string,
        isExpanded: boolean
    ): void {
        const sheet = this.documentModel?.sheets.find(
            (item) => item.id === sheetId
        );
        if (!sheet || this.destroyed) {
            return;
        }

        const expandedTopicIds = this.getExpandedTopicIds(sheetId);
        const collapsedTopicIds = this.getCollapsedTopicIds(sheetId);
        if (isExpanded) {
            expandedTopicIds.delete(topicId);
            collapsedTopicIds.add(topicId);
        } else {
            expandedTopicIds.add(topicId);
            collapsedTopicIds.delete(topicId);
        }

        this.renderSheet(sheet, {
            fitToView: false,
            preserveViewport: true,
        });
    }

    private fitMapSync(): void {
        if (!this.view) {
            return;
        }

        const width = Math.max(1, this.canvas.clientWidth - FIT_PADDING);
        const height = Math.max(1, this.canvas.clientHeight - FIT_PADDING);
        const contentWidth = Math.max(
            1,
            this.view.bounds.maxX - this.view.bounds.minX
        );
        const contentHeight = Math.max(
            1,
            this.view.bounds.maxY - this.view.bounds.minY
        );
        this.fitMode = true;
        this.panOffsetX = 0;
        this.panOffsetY = 0;
        this.zoomScale = clamp(
            Math.min(width / contentWidth, height / contentHeight),
            MIN_ZOOM,
            MAX_ZOOM
        );
        this.applyTransform();
        this.emitZoomChange();
    }

    private setZoom(scale: number): void {
        if (!Number.isFinite(scale) || !this.view) {
            return;
        }

        this.setZoomAt(scale, {
            x: this.canvas.clientWidth / 2,
            y: this.canvas.clientHeight / 2,
        });
    }

    private endRightDrag(pointerId: number): void {
        if (this.rightDragState?.pointerId !== pointerId) {
            return;
        }

        this.rightDragState = null;
        this.canvas.classList.remove('is-right-dragging');
        if (this.canvas.hasPointerCapture(pointerId)) {
            this.canvas.releasePointerCapture(pointerId);
        }
    }

    private getBaseOffsetForView(
        view: NativeMindMapView,
        scale: number
    ): ViewportPoint {
        const centerX = (view.bounds.minX + view.bounds.maxX) / 2;
        const centerY = (view.bounds.minY + view.bounds.maxY) / 2;
        return {
            x: this.canvas.clientWidth / 2 - centerX * scale,
            y: this.canvas.clientHeight / 2 - centerY * scale,
        };
    }

    private getBaseOffset(scale: number): ViewportPoint | null {
        return this.view ? this.getBaseOffsetForView(this.view, scale) : null;
    }

    private captureViewportAnchor(): ViewportAnchor | null {
        if (!this.view || this.zoomScale <= 0) {
            return null;
        }

        const viewportPoint = {
            x: this.canvas.clientWidth / 2,
            y: this.canvas.clientHeight / 2,
        };
        const baseOffset = this.getBaseOffsetForView(this.view, this.zoomScale);

        return {
            viewportPoint,
            mapPoint: {
                x:
                    (viewportPoint.x - baseOffset.x - this.panOffsetX) /
                    this.zoomScale,
                y:
                    (viewportPoint.y - baseOffset.y - this.panOffsetY) /
                    this.zoomScale,
            },
        };
    }

    private restoreViewportAnchor(anchor: ViewportAnchor): void {
        const baseOffset = this.getBaseOffset(this.zoomScale);
        if (!baseOffset) {
            return;
        }

        this.panOffsetX =
            anchor.viewportPoint.x -
            baseOffset.x -
            anchor.mapPoint.x * this.zoomScale;
        this.panOffsetY =
            anchor.viewportPoint.y -
            baseOffset.y -
            anchor.mapPoint.y * this.zoomScale;
    }

    private setZoomAt(scale: number, viewportPoint: ViewportPoint): void {
        if (!Number.isFinite(scale) || !this.view) {
            return;
        }

        const nextScale = clamp(scale, MIN_ZOOM, MAX_ZOOM);
        const previousBaseOffset = this.getBaseOffset(this.zoomScale);
        const nextBaseOffset = this.getBaseOffset(nextScale);
        if (!previousBaseOffset || !nextBaseOffset) {
            return;
        }

        const focusX =
            (viewportPoint.x - previousBaseOffset.x - this.panOffsetX) /
            this.zoomScale;
        const focusY =
            (viewportPoint.y - previousBaseOffset.y - this.panOffsetY) /
            this.zoomScale;

        this.fitMode = false;
        this.zoomScale = nextScale;
        this.panOffsetX =
            viewportPoint.x - nextBaseOffset.x - focusX * nextScale;
        this.panOffsetY =
            viewportPoint.y - nextBaseOffset.y - focusY * nextScale;
        this.applyTransform();
        this.emitZoomChange();
    }

    private applyTransform(): void {
        this.view?.setTransform(
            this.zoomScale,
            this.canvas.clientWidth,
            this.canvas.clientHeight,
            this.panOffsetX,
            this.panOffsetY
        );
        this.updateZoomLabel();
    }

    private updateZoomLabel(): void {
        this.zoomLabel.textContent = `${Math.round(this.zoomScale * 100)}%`;
    }

    private emitZoomChange(): void {
        this.emit('zoom-change', Math.round(this.zoomScale * 100));
    }

    private emit(name: ViewerEventName, payload: unknown): void {
        this.state.applyEvent({ name, payload });
    }

    private showError(error: unknown): void {
        if (this.destroyed) {
            return;
        }

        const message = error instanceof Error ? error.message : String(error);
        this.status.textContent = '';
        const errorEl = createElement(
            this.ownerDocument,
            'div',
            'xmind-native-error'
        );
        errorEl.textContent = this.translator.t('renderFailed', { message });
        this.canvas.replaceChildren(errorEl);
        this.emit('map-ready', false);
        this.options.onError?.(error);
    }
}
