export const CENTRAL_TOPIC_FALLBACK_TEXT_COLOR = '#000000';

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

function shouldNormalizeCentralTopicTextColor(
    properties: XMindTopicStyleProperties | undefined
): properties is XMindTopicStyleProperties {
    if (!properties || properties['fo:color'] !== 'inherited') {
        return false;
    }

    const fillPattern = String(properties['fill-pattern'] ?? '').toLowerCase();
    const fill = String(properties['svg:fill'] ?? '').toLowerCase();

    return (
        fillPattern === 'none' ||
        fill === 'none' ||
        fill === 'transparent' ||
        fill === '#fff' ||
        fill === '#ffffff'
    );
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
            if (!shouldNormalizeCentralTopicTextColor(properties)) {
                continue;
            }

            properties['fo:color'] = CENTRAL_TOPIC_FALLBACK_TEXT_COLOR;
            changed = true;
        }
    }

    return changed;
}
