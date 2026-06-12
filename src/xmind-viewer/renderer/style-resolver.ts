import {
    XMindDocumentSheet,
    XMindRawRecord,
    XMindRelationship,
    XMindTopicScopedObject,
    XMindTopicNode,
} from '../xmind-document';

export interface XMindResolvedMapStyle {
    backgroundFill: string;
    branchColors: string[];
}

export interface XMindResolvedTopicStyle {
    branchColor: string;
    branchLightColor: string;
    fill: string;
    borderColor: string;
    borderWidth: number;
    branchLineColor: string;
    branchLineWidth: number;
    branchLineDashArray?: string;
    textFill: string;
    fontSize: number;
    lineHeight: number;
    fontWeight: string;
    fontStyle: string;
    fontFamily: string;
    textAlign: string;
    shapeClass?: string;
}

export interface XMindResolvedLineObjectStyle {
    fill: string;
    lineColor: string;
    lineWidth: number;
    lineDashArray?: string;
    textFill: string;
    fontSize: number;
    fontWeight: string;
    fontStyle: string;
    fontFamily: string;
    shapeClass?: string;
    arrowBeginClass?: string;
    arrowEndClass?: string;
}

export type XMindTopicStyleRole = 'topic' | 'floatingTopic' | 'calloutTopic';

export interface XMindStyleResolver {
    map: XMindResolvedMapStyle;
    resolveTopicStyle: (
        topic: XMindTopicNode,
        depth: number,
        branchIndex: number,
        role?: XMindTopicStyleRole
    ) => XMindResolvedTopicStyle;
    resolveRelationshipStyle: (
        relationship: XMindRelationship
    ) => XMindResolvedLineObjectStyle;
    resolveBoundaryStyle: (
        boundary: XMindTopicScopedObject
    ) => XMindResolvedLineObjectStyle;
    resolveSummaryStyle: (
        summary: XMindTopicScopedObject
    ) => XMindResolvedLineObjectStyle;
}

const DEFAULT_BRANCH_COLORS = [
    '#ff4d5a',
    '#ff884d',
    '#8b6fef',
    '#00a88f',
];
const DEFAULT_TEXT_FILL = '#1f2328';
const DEFAULT_ROOT_STROKE = '#62c7ff';
const DEFAULT_FONT_FAMILY =
    'NeverMind, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

function isRecord(value: unknown): value is XMindRawRecord {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function getRecordValue(record: XMindRawRecord | undefined, key: string): unknown {
    return record ? record[key] : undefined;
}

function isInherited(value: unknown): boolean {
    return (
        value === undefined ||
        value === null ||
        value === '' ||
        value === 'inherited'
    );
}

function stringValue(value: unknown): string | undefined {
    return typeof value === 'string' && !isInherited(value)
        ? value
        : undefined;
}

function propertyValue(
    topicProperties: XMindRawRecord | undefined,
    themeProperties: XMindRawRecord | undefined,
    key: string
): unknown {
    const topicValue = getRecordValue(topicProperties, key);
    if (!isInherited(topicValue)) {
        return topicValue;
    }

    const themeValue = getRecordValue(themeProperties, key);
    return isInherited(themeValue) ? undefined : themeValue;
}

function parseUnit(value: unknown, fallback: number): number {
    if (typeof value === 'number' && Number.isFinite(value)) {
        return value;
    }

    if (typeof value !== 'string') {
        return fallback;
    }

    const match = value.trim().match(/^(-?\d+(?:\.\d+)?)(pt|px)?$/i);
    if (!match) {
        return fallback;
    }

    const numberValue = Number(match[1]);
    if (!Number.isFinite(numberValue)) {
        return fallback;
    }

    return match[2] && match[2].toLowerCase() === 'pt'
        ? numberValue * (96 / 72)
        : numberValue;
}

function parseColorList(value: unknown): string[] {
    if (typeof value !== 'string') {
        return [];
    }

    return value
        .split(/\s+/)
        .map((item) => item.trim())
        .filter((item) => item.startsWith('#'));
}

function themeProperties(
    sheet: XMindDocumentSheet,
    themeKey: string
): XMindRawRecord | undefined {
    const value = sheet.theme?.[themeKey];
    if (!isRecord(value)) {
        return undefined;
    }

    return isRecord(value.properties) ? value.properties : undefined;
}

function topicThemeKey(depth: number, role: XMindTopicStyleRole): string {
    if (role === 'floatingTopic') {
        return 'floatingTopic';
    }

    if (role === 'calloutTopic') {
        return 'calloutTopic';
    }

    if (depth === 0) {
        return 'centralTopic';
    }

    if (depth === 1) {
        return 'mainTopic';
    }

    if (depth === 2) {
        return 'subTopic';
    }

    return 'level3';
}

function topicProperties(topic: XMindTopicNode): XMindRawRecord | undefined {
    return topic.style?.properties;
}

function objectProperties(
    object: XMindRelationship | XMindTopicScopedObject
): XMindRawRecord | undefined {
    return object.style?.properties;
}

function branchColor(
    mapStyle: XMindResolvedMapStyle,
    branchIndex: number
): string {
    return mapStyle.branchColors[
        Math.abs(branchIndex) % mapStyle.branchColors.length
    ];
}

function hexToRgb(color: string): [number, number, number] | null {
    const match = color.match(/^#([0-9a-f]{6})([0-9a-f]{2})?$/i);
    if (!match) {
        return null;
    }

    const hex = match[1];
    return [
        Number.parseInt(hex.slice(0, 2), 16),
        Number.parseInt(hex.slice(2, 4), 16),
        Number.parseInt(hex.slice(4, 6), 16),
    ];
}

function rgbToHex(red: number, green: number, blue: number): string {
    return `#${[red, green, blue]
        .map((channel) => {
            const hex = Math.round(Math.max(0, Math.min(255, channel)))
                .toString(16);
            return hex.length === 1 ? `0${hex}` : hex;
        })
        .join('')}`;
}

function mixWithWhite(color: string, amount: number): string {
    const rgb = hexToRgb(color);
    if (!rgb) {
        return '#f2f4f7';
    }

    return rgbToHex(
        rgb[0] + (255 - rgb[0]) * amount,
        rgb[1] + (255 - rgb[1]) * amount,
        rgb[2] + (255 - rgb[2]) * amount
    );
}

function resolveFill(
    depth: number,
    themeFillPattern: unknown,
    fillValue: unknown,
    topicBranchColor: string,
    branchLightColor: string
): string {
    const fill = stringValue(fillValue);
    const fillPattern = stringValue(themeFillPattern);

    if (fill && !(depth === 0 && fillPattern === 'none')) {
        return fill;
    }

    if (depth === 0 && fillPattern === 'none') {
        return 'none';
    }

    if (depth === 1) {
        return topicBranchColor;
    }

    return branchLightColor;
}

function resolveTextFill(
    fill: string,
    textFillValue: unknown,
    depth: number
): string {
    const textFill = stringValue(textFillValue);
    if (textFill) {
        return textFill;
    }

    if (depth === 0 || fill === 'none') {
        return '#111827';
    }

    return DEFAULT_TEXT_FILL;
}

function resolveStrokeDashArray(linePattern: unknown): string | undefined {
    return stringValue(linePattern) === 'dash' ? '6 5' : undefined;
}

function resolveLineObjectStyle(
    ownProperties: XMindRawRecord | undefined,
    themeObjectProperties: XMindRawRecord | undefined,
    fallbackLineColor: string
): XMindResolvedLineObjectStyle {
    const fill =
        stringValue(
            propertyValue(ownProperties, themeObjectProperties, 'svg:fill')
        ) ?? 'none';
    const lineColor =
        stringValue(
            propertyValue(ownProperties, themeObjectProperties, 'line-color')
        ) ?? fallbackLineColor;
    const fontSize = parseUnit(
        propertyValue(ownProperties, themeObjectProperties, 'fo:font-size'),
        14
    );

    return {
        fill,
        lineColor,
        lineWidth: parseUnit(
            propertyValue(ownProperties, themeObjectProperties, 'line-width'),
            2
        ),
        lineDashArray: resolveStrokeDashArray(
            propertyValue(ownProperties, themeObjectProperties, 'line-pattern')
        ),
        textFill:
            stringValue(
                propertyValue(ownProperties, themeObjectProperties, 'fo:color')
            ) ?? lineColor,
        fontSize,
        fontWeight:
            stringValue(
                propertyValue(
                    ownProperties,
                    themeObjectProperties,
                    'fo:font-weight'
                )
            ) ?? '400',
        fontStyle:
            stringValue(
                propertyValue(
                    ownProperties,
                    themeObjectProperties,
                    'fo:font-style'
                )
            ) ?? 'normal',
        fontFamily:
            stringValue(
                propertyValue(
                    ownProperties,
                    themeObjectProperties,
                    'fo:font-family'
                )
            ) ?? DEFAULT_FONT_FAMILY,
        shapeClass: stringValue(
            propertyValue(ownProperties, themeObjectProperties, 'shape-class')
        ),
        arrowBeginClass: stringValue(
            propertyValue(
                ownProperties,
                themeObjectProperties,
                'arrow-begin-class'
            )
        ),
        arrowEndClass: stringValue(
            propertyValue(
                ownProperties,
                themeObjectProperties,
                'arrow-end-class'
            )
        ),
    };
}

export function createXMindStyleResolver(
    sheet: XMindDocumentSheet
): XMindStyleResolver {
    const mapProperties = themeProperties(sheet, 'map');
    const colorList =
        parseColorList(mapProperties?.['color-list']).length > 0
            ? parseColorList(mapProperties?.['color-list'])
            : parseColorList(mapProperties?.['multi-line-colors']);
    const map: XMindResolvedMapStyle = {
        backgroundFill: stringValue(mapProperties?.['svg:fill']) ?? '#ffffff',
        branchColors:
            colorList.length > 0 ? colorList : [...DEFAULT_BRANCH_COLORS],
    };

    return {
        map,
        resolveTopicStyle(
            topic: XMindTopicNode,
            depth: number,
            branchIndex: number,
            role: XMindTopicStyleRole = 'topic'
        ): XMindResolvedTopicStyle {
            const themeTopicProperties = themeProperties(
                sheet,
                topicThemeKey(depth, role)
            );
            const ownProperties = topicProperties(topic);
            const topicBranchColor = branchColor(map, branchIndex);
            const branchLightColor = mixWithWhite(topicBranchColor, 0.82);
            const fill = resolveFill(
                depth,
                propertyValue(ownProperties, themeTopicProperties, 'fill-pattern'),
                propertyValue(ownProperties, themeTopicProperties, 'svg:fill'),
                topicBranchColor,
                branchLightColor
            );
            const fontSize = parseUnit(
                propertyValue(ownProperties, themeTopicProperties, 'fo:font-size'),
                depth === 0 ? 28 : 16
            );
            const branchLineWidth = parseUnit(
                propertyValue(ownProperties, themeTopicProperties, 'line-width'),
                depth === 1 ? 3 : 2
            );
            const borderWidth = parseUnit(
                propertyValue(
                    ownProperties,
                    themeTopicProperties,
                    'border-line-width'
                ),
                depth === 0 ? 3 : 0
            );
            const borderColor =
                stringValue(
                    propertyValue(
                        ownProperties,
                        themeTopicProperties,
                        'border-line-color'
                    )
                ) ??
                (depth === 0 ? DEFAULT_ROOT_STROKE : fill);

            return {
                branchColor: topicBranchColor,
                branchLightColor,
                fill,
                borderColor,
                borderWidth,
                branchLineColor:
                    stringValue(
                        propertyValue(
                            ownProperties,
                            themeTopicProperties,
                            'line-color'
                        )
                    ) ?? topicBranchColor,
                branchLineWidth,
                branchLineDashArray: resolveStrokeDashArray(
                    propertyValue(ownProperties, themeTopicProperties, 'line-pattern')
                ),
                textFill: resolveTextFill(
                    fill,
                    propertyValue(ownProperties, themeTopicProperties, 'fo:color'),
                    depth
                ),
                fontSize,
                lineHeight: Math.max(18, fontSize * 1.32),
                fontWeight:
                    stringValue(
                        propertyValue(
                            ownProperties,
                            themeTopicProperties,
                            'fo:font-weight'
                        )
                    ) ?? (depth <= 1 ? '700' : '500'),
                fontStyle:
                    stringValue(
                        propertyValue(
                            ownProperties,
                            themeTopicProperties,
                            'fo:font-style'
                        )
                    ) ?? 'normal',
                fontFamily:
                    stringValue(
                        propertyValue(
                            ownProperties,
                            themeTopicProperties,
                            'fo:font-family'
                        )
                    ) ?? DEFAULT_FONT_FAMILY,
                textAlign:
                    stringValue(
                        propertyValue(
                            ownProperties,
                            themeTopicProperties,
                            'fo:text-align'
                        )
                    ) ?? 'center',
                shapeClass: stringValue(
                    propertyValue(
                        ownProperties,
                        themeTopicProperties,
                        'shape-class'
                    )
                ),
            };
        },
        resolveRelationshipStyle(
            relationship: XMindRelationship
        ): XMindResolvedLineObjectStyle {
            return resolveLineObjectStyle(
                objectProperties(relationship),
                themeProperties(sheet, 'relationship'),
                '#00000066'
            );
        },
        resolveBoundaryStyle(
            boundary: XMindTopicScopedObject
        ): XMindResolvedLineObjectStyle {
            return resolveLineObjectStyle(
                objectProperties(boundary),
                themeProperties(sheet, 'boundary'),
                '#00000066'
            );
        },
        resolveSummaryStyle(
            summary: XMindTopicScopedObject
        ): XMindResolvedLineObjectStyle {
            return resolveLineObjectStyle(
                objectProperties(summary),
                themeProperties(sheet, 'summary'),
                '#000000'
            );
        },
    };
}
