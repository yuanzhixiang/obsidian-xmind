export const CENTRAL_TOPIC_DARK_TEXT_COLOR = '#000000';
export const CENTRAL_TOPIC_LIGHT_TEXT_COLOR = '#ffffff';
export const CENTRAL_TOPIC_FALLBACK_TEXT_COLOR = CENTRAL_TOPIC_DARK_TEXT_COLOR;

export interface XMindTopicStyleProperties {
    'fill-pattern'?: unknown;
    'fo:color'?: unknown;
    'svg:fill'?: unknown;
    [property: string]: unknown;
}

interface XMindTopicTheme {
    properties?: XMindTopicStyleProperties;
}

interface XMindTheme {
    centralTopic?: XMindTopicTheme;
    topicThemeMap?: {
        centralTopic?: XMindTopicTheme;
    };
}

interface XMindContentSheet {
    theme?: XMindTheme;
}

function isXMindContentSheet(value: unknown): value is XMindContentSheet {
    return typeof value === 'object' && value !== null;
}

function normalizeHexColor(value: string): string | null {
    const color = value.trim().toLowerCase();
    if (/^#[0-9a-f]{3}$/i.test(color)) {
        return `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`;
    }

    if (/^#[0-9a-f]{6}$/i.test(color)) {
        return color;
    }

    return null;
}

function relativeLuminance(hexColor: string): number | null {
    const normalizedColor = normalizeHexColor(hexColor);
    if (!normalizedColor) {
        return null;
    }

    const channels = [1, 3, 5].map((index) => {
        const channel = Number.parseInt(
            normalizedColor.slice(index, index + 2),
            16
        );
        const ratio = channel / 255;
        return ratio <= 0.03928
            ? ratio / 12.92
            : ((ratio + 0.055) / 1.055) ** 2.4;
    });

    return (
        0.2126 * (channels[0] ?? 0) +
        0.7152 * (channels[1] ?? 0) +
        0.0722 * (channels[2] ?? 0)
    );
}

function centralTopicTextColorForFill(
    properties: XMindTopicStyleProperties | undefined
): string | null {
    if (!properties || properties['fo:color'] !== 'inherited') {
        return null;
    }

    const fillPattern = String(properties['fill-pattern'] ?? '').toLowerCase();
    const fill = String(properties['svg:fill'] ?? '').toLowerCase();

    if (
        fillPattern === 'none' ||
        fill === 'none' ||
        fill === 'transparent' ||
        fill === '#fff' ||
        fill === '#ffffff'
    ) {
        return CENTRAL_TOPIC_DARK_TEXT_COLOR;
    }

    const luminance = relativeLuminance(fill);
    if (luminance !== null && luminance < 0.35) {
        return CENTRAL_TOPIC_LIGHT_TEXT_COLOR;
    }

    return null;
}

export function normalizeInvisibleCentralTopicTextColor(
    content: unknown
): boolean {
    const sheets = Array.isArray(content) ? content : [content];
    let changed = false;

    for (const sheet of sheets) {
        if (!isXMindContentSheet(sheet)) {
            continue;
        }

        const centralTopicProperties = sheet.theme?.centralTopic?.properties;
        const topicThemeMapProperties =
            sheet.theme?.topicThemeMap?.centralTopic?.properties;

        for (const properties of [
            centralTopicProperties,
            topicThemeMapProperties,
        ]) {
            const textColor = centralTopicTextColorForFill(properties);
            if (!properties || !textColor) {
                continue;
            }

            properties['fo:color'] = textColor;
            changed = true;
        }
    }

    return changed;
}
