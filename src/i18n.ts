export type XMindLocale = 'en' | 'zh-CN';
export type XMindI18nParams = Partial<Record<string, string | number>>;

const DEFAULT_LOCALE: XMindLocale = 'en';

const translations = {
    en: {
        appTitle: 'XMind debug viewer',
        apply: 'Apply',
        centralTopicTitle: 'Central Topic',
        clear: 'Clear',
        copyPath: 'Copy path',
        copyPathObsidianUrl: 'as Obsidian URL',
        copyPathSystemRoot: 'from system root',
        copyPathVaultFolder: 'from vault folder',
        copiedPath: 'Copied path',
        currentFile: 'Current file',
        debugToolbar: 'Debug toolbar',
        emptySheetOption: 'No sheet data',
        eventLog: 'Event log',
        events: 'Events',
        expandTopicHiddenChildren:
            'Expand {{title}} with {{count}} hidden child nodes',
        collapseTopic: 'Collapse {{title}}',
        fileReadError: 'Failed to read XMind file: HTTP {{status}}',
        fitCanvas: 'Fit canvas',
        hiddenChildren: '{{count}} hidden child nodes',
        i18nLanguageStorageKey: 'language',
        localFileFallback: 'Locally selected XMind file',
        loadingDefaultFile: 'Waiting for default file',
        loadRuntimeError: 'Source viewer debug runtime was not loaded',
        newTopicTitle: 'New Topic',
        noFileOpen: 'No file open',
        openFile: 'Open file',
        outliner: 'Outliner',
        outlinerLabel: 'XMind outliner',
        readConfigError: 'Failed to read debug config: HTTP {{status}}',
        reload: 'Refresh',
        renderFailed: 'XMind render failed: {{message}}',
        rootMissingSheet: 'Sheet not found: {{sheetId}}',
        search: 'Search',
        searchLabel: 'XMind search',
        searchNext: 'Next',
        searchPlaceholder: 'Search topics',
        searchPrevious: 'Previous',
        selectTopic: 'Select {{title}}',
        sheetSelectLoading: 'Waiting for load',
        sourceFileDefault: 'Default debug file',
        summaryTitle: 'Summary',
        systemPathUnavailable: 'System path is not available for this vault.',
        viewerControl: 'Viewer controls',
        viewerLabel: 'XMind render area',
        viewerLoading: 'Reading XMind file...',
        viewTitle: 'XMind view: {{name}}',
        zoom: 'Zoom',
    },
    'zh-CN': {
        appTitle: 'XMind 调试查看器',
        apply: '应用',
        centralTopicTitle: '中心主题',
        clear: '清空',
        copyPath: '复制路径',
        copyPathObsidianUrl: '复制为 Obsidian URL',
        copyPathSystemRoot: '复制系统绝对路径',
        copyPathVaultFolder: '复制 vault 相对路径',
        copiedPath: '已复制路径',
        currentFile: '当前文件',
        debugToolbar: '调试工具栏',
        emptySheetOption: '无 sheet 数据',
        eventLog: '事件日志',
        events: '事件',
        expandTopicHiddenChildren:
            '展开 {{title}} 的 {{count}} 个隐藏子节点',
        collapseTopic: '折叠 {{title}}',
        fileReadError: '读取 XMind 文件失败：HTTP {{status}}',
        fitCanvas: '适配画布',
        hiddenChildren: '{{count}} 个隐藏子节点',
        i18nLanguageStorageKey: 'language',
        localFileFallback: '本地选择的 XMind 文件',
        loadingDefaultFile: '等待加载默认文件',
        loadRuntimeError: '源码 viewer 调试运行时未加载',
        newTopicTitle: '新主题',
        noFileOpen: '未打开文件',
        openFile: '打开文件',
        outliner: '大纲',
        outlinerLabel: 'XMind 大纲',
        readConfigError: '读取调试配置失败：HTTP {{status}}',
        reload: '刷新',
        renderFailed: 'XMind 渲染失败：{{message}}',
        rootMissingSheet: '找不到 sheet：{{sheetId}}',
        search: '搜索',
        searchLabel: 'XMind 搜索',
        searchNext: '下一个',
        searchPlaceholder: '搜索主题',
        searchPrevious: '上一个',
        selectTopic: '选择 {{title}}',
        sheetSelectLoading: '等待加载',
        sourceFileDefault: '默认调试文件',
        summaryTitle: '概要',
        systemPathUnavailable: '无法获取当前 vault 的系统路径。',
        viewerControl: '查看器控制',
        viewerLabel: 'XMind 渲染区域',
        viewerLoading: '正在读取 XMind 文件...',
        viewTitle: 'XMind 视图：{{name}}',
        zoom: '缩放',
    },
} as const;

export type XMindI18nKey = keyof typeof translations.en;

export interface XMindTranslator {
    locale: XMindLocale;
    t: (key: XMindI18nKey, params?: XMindI18nParams) => string;
}

function replaceParams(
    template: string,
    params: XMindI18nParams = {}
): string {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key: string) => {
        const value = params[key];
        return value === undefined ? match : String(value);
    });
}

function readLocalStorageLocale(ownerWindow: Window | null): string | null {
    try {
        return ownerWindow?.localStorage.getItem('language') ?? null;
    } catch {
        return null;
    }
}

function readNavigatorLocale(ownerWindow: Window | null): string | null {
    const navigator = ownerWindow?.navigator;
    if (!navigator) {
        return null;
    }

    return navigator.languages.length > 0
        ? navigator.languages[0]
        : navigator.language;
}

export function normalizeXMindLocale(
    value: string | null | undefined
): XMindLocale {
    if (!value) {
        return DEFAULT_LOCALE;
    }

    const normalized = value.toLowerCase().replace('_', '-');
    if (
        normalized === 'zh' ||
        normalized === 'zh-cn' ||
        normalized === 'zh-hans' ||
        normalized === 'zh-sg' ||
        normalized === 'zh-tw' ||
        normalized === 'zh-hk' ||
        normalized === 'zh-mo'
    ) {
        return 'zh-CN';
    }

    return DEFAULT_LOCALE;
}

export function detectXMindLocale(
    _source?: unknown,
    ownerWindow?: Window | null,
    ownerDocument?: Document | null
): XMindLocale {
    const candidates = [
        readLocalStorageLocale(ownerWindow ?? null),
        ownerDocument?.documentElement.lang ?? null,
        readNavigatorLocale(ownerWindow ?? null),
    ];

    for (const candidate of candidates) {
        const locale = normalizeXMindLocale(candidate);
        if (candidate && locale !== DEFAULT_LOCALE) {
            return locale;
        }
    }

    return DEFAULT_LOCALE;
}

export function translateXMind(
    locale: XMindLocale,
    key: XMindI18nKey,
    params?: XMindI18nParams
): string {
    return replaceParams(translations[locale][key], params);
}

export function createXMindTranslator(locale: XMindLocale): XMindTranslator {
    return {
        locale,
        t: (key, params): string => translateXMind(locale, key, params),
    };
}
