export default [
    function (e, t, i) {
        'use strict';
        var n = i(0),
            r = i(1);
        const {
            snowballConstant: o,
            getSkeletonThemeDataById: a,
            getColorThemeDataById: s,
        } = Object(r.getInjectModule)(n.MODULE_NAME.SNOWBALL);
        function l(e, t) {
            const i = JSON.parse(JSON.stringify(e));
            return (
                Object.values(n.CLASS_TYPE).forEach((n) => {
                    var r, o;
                    if (e[n] || t[n]) {
                        const a =
                                null !== (r = e[n]) && void 0 !== r
                                    ? r
                                    : { properties: {} },
                            s =
                                null !== (o = t[n]) && void 0 !== o
                                    ? o
                                    : { properties: {} },
                            l = {};
                        ((l.properties = Object.assign(
                            Object.assign({}, a.properties),
                            s.properties
                        )),
                            (i[n] = l));
                    }
                }),
                i
            );
        }
        const c = {
            [n.CLASS_TYPE.CENTRAL_TOPIC]: {
                properties: {
                    [n.STYLE_KEYS.FONT_WEIGHT]: 'normal',
                    [n.STYLE_KEYS.TEXT_COLOR]: '#FFFFFF',
                    [n.STYLE_KEYS.FONT_FAMILY]: '$system$',
                    [n.STYLE_KEYS.FONT_STYLE]: 'normal',
                    [n.STYLE_KEYS.FONT_SIZE]: '28pt',
                    [n.STYLE_KEYS.TEXT_DECORATION]: 'none',
                    [n.STYLE_KEYS.SHAPE_CLASS]:
                        'org.xmind.topicShape.roundedRect',
                    [n.STYLE_KEYS.FILL_COLOR]: '#2A7AC2',
                    [n.STYLE_KEYS.FILL_PATTERN]: 'solid',
                    [n.STYLE_KEYS.LINE_CLASS]:
                        'org.xmind.branchConnection.curve',
                    [n.STYLE_KEYS.LINE_COLOR]: '#333333',
                    [n.STYLE_KEYS.LINE_WIDTH]: '2pt',
                    [n.STYLE_KEYS.TEXT_TRANSFORM]: 'manual',
                    [n.STYLE_KEYS.BORDER_LINE_COLOR]: 'none',
                    [n.STYLE_KEYS.BORDER_LINE_WIDTH]: '0pt',
                    [n.STYLE_KEYS.LINE_CORNER]: '16pt',
                    [n.STYLE_KEYS.MARGIN_LEFT]: '29pt',
                    [n.STYLE_KEYS.MARGIN_RIGHT]: '29pt',
                    [n.STYLE_KEYS.MARGIN_TOP]: '15pt',
                    [n.STYLE_KEYS.MARGIN_BOTTOM]: '15pt',
                    [n.STYLE_KEYS.SPACING_MAJOR]: '50pt',
                    [n.STYLE_KEYS.SPACING_MINOR]: '35pt',
                    [n.STYLE_KEYS.BORDER_LINE_PATTERN]: n.LINE_PATTERN.SOLID,
                    [n.STYLE_KEYS.LINE_PATTERN]: n.LINE_PATTERN.SOLID,
                    [n.STYLE_KEYS.ARROW_END_CLASS]: n.ARROW_CLASS.NONE,
                },
            },
            [n.CLASS_TYPE.MAIN_TOPIC]: {
                properties: {
                    [n.STYLE_KEYS.FONT_WEIGHT]: 'normal',
                    [n.STYLE_KEYS.TEXT_COLOR]: '#333333',
                    [n.STYLE_KEYS.FONT_FAMILY]: '$system$',
                    [n.STYLE_KEYS.FONT_STYLE]: 'normal',
                    [n.STYLE_KEYS.FONT_SIZE]: '16pt',
                    [n.STYLE_KEYS.TEXT_DECORATION]: 'none',
                    [n.STYLE_KEYS.SHAPE_CLASS]:
                        'org.xmind.topicShape.roundedRect',
                    [n.STYLE_KEYS.FILL_COLOR]: '#E8E8E8',
                    [n.STYLE_KEYS.FILL_PATTERN]: 'solid',
                    [n.STYLE_KEYS.LINE_CLASS]:
                        'org.xmind.branchConnection.roundedElbow',
                    [n.STYLE_KEYS.LINE_COLOR]: '#333333',
                    [n.STYLE_KEYS.LINE_WIDTH]: '1pt',
                    [n.STYLE_KEYS.TEXT_TRANSFORM]: 'manual',
                    [n.STYLE_KEYS.BORDER_LINE_COLOR]: '#333333',
                    [n.STYLE_KEYS.BORDER_LINE_WIDTH]: '1pt',
                    [n.STYLE_KEYS.SHAPE_CORNER]: '5pt',
                    [n.STYLE_KEYS.LINE_CORNER]: '8pt',
                    [n.STYLE_KEYS.MARGIN_LEFT]: '18pt',
                    [n.STYLE_KEYS.MARGIN_RIGHT]: '18pt',
                    [n.STYLE_KEYS.MARGIN_TOP]: '10pt',
                    [n.STYLE_KEYS.MARGIN_BOTTOM]: '10pt',
                    [n.STYLE_KEYS.SPACING_MAJOR]: '26pt',
                    [n.STYLE_KEYS.SPACING_MINOR]: '6pt',
                    [n.STYLE_KEYS.LINE_PATTERN]: n.LINE_PATTERN.SOLID,
                    [n.STYLE_KEYS.BORDER_LINE_PATTERN]: n.LINE_PATTERN.SOLID,
                    [n.STYLE_KEYS.ARROW_END_CLASS]: n.ARROW_CLASS.NONE,
                },
            },
            [n.CLASS_TYPE.SUB_TOPIC]: {
                properties: {
                    [n.STYLE_KEYS.FONT_WEIGHT]: 'normal',
                    [n.STYLE_KEYS.TEXT_COLOR]: '#0A0E16',
                    [n.STYLE_KEYS.FONT_FAMILY]: '$system$',
                    [n.STYLE_KEYS.FONT_STYLE]: 'normal',
                    [n.STYLE_KEYS.FONT_SIZE]: '12pt',
                    [n.STYLE_KEYS.TEXT_DECORATION]: 'none',
                    [n.STYLE_KEYS.SHAPE_CLASS]:
                        'org.xmind.topicShape.underline',
                    [n.STYLE_KEYS.FILL_COLOR]: 'none',
                    [n.STYLE_KEYS.FILL_PATTERN]: 'solid',
                    [n.STYLE_KEYS.LINE_CLASS]:
                        'org.xmind.branchConnection.roundedElbow',
                    [n.STYLE_KEYS.LINE_COLOR]: '#232323',
                    [n.STYLE_KEYS.LINE_WIDTH]: '1pt',
                    [n.STYLE_KEYS.TEXT_TRANSFORM]: 'manual',
                    [n.STYLE_KEYS.BORDER_LINE_COLOR]: '#232323',
                    [n.STYLE_KEYS.BORDER_LINE_WIDTH]: '1pt',
                    [n.STYLE_KEYS.SHAPE_CORNER]: '3pt',
                    [n.STYLE_KEYS.LINE_CORNER]: '8pt',
                    [n.STYLE_KEYS.MARGIN_LEFT]: '6pt',
                    [n.STYLE_KEYS.MARGIN_RIGHT]: '6pt',
                    [n.STYLE_KEYS.MARGIN_TOP]: '6pt',
                    [n.STYLE_KEYS.MARGIN_BOTTOM]: '6pt',
                    [n.STYLE_KEYS.SPACING_MAJOR]: '26pt',
                    [n.STYLE_KEYS.SPACING_MINOR]: '8pt',
                    [n.STYLE_KEYS.LINE_PATTERN]: n.LINE_PATTERN.SOLID,
                    [n.STYLE_KEYS.BORDER_LINE_PATTERN]: n.LINE_PATTERN.SOLID,
                    [n.STYLE_KEYS.ARROW_END_CLASS]: n.ARROW_CLASS.NONE,
                },
            },
            [n.CLASS_TYPE.CALLOUT_TOPIC]: {
                properties: {
                    [n.STYLE_KEYS.FONT_WEIGHT]: 'normal',
                    [n.STYLE_KEYS.TEXT_COLOR]: '#FFFFFF',
                    [n.STYLE_KEYS.FONT_FAMILY]: '$system$',
                    [n.STYLE_KEYS.FONT_STYLE]: 'italic',
                    [n.STYLE_KEYS.FONT_SIZE]: '12pt',
                    [n.STYLE_KEYS.TEXT_DECORATION]: 'none',
                    [n.STYLE_KEYS.CALLOUT_SHAPE_CLASS]:
                        'org.xmind.calloutTopicShape.balloon.roundedRect',
                    [n.STYLE_KEYS.BORDER_LINE_COLOR]: 'none',
                    [n.STYLE_KEYS.BORDER_LINE_WIDTH]: '1pt',
                    [n.STYLE_KEYS.SHAPE_CORNER]: '5pt',
                    [n.STYLE_KEYS.FILL_COLOR]: '#333333',
                    [n.STYLE_KEYS.FILL_PATTERN]: 'solid',
                    [n.STYLE_KEYS.LINE_CLASS]:
                        'org.xmind.branchConnection.curve',
                    [n.STYLE_KEYS.LINE_COLOR]: '#333333',
                    [n.STYLE_KEYS.LINE_WIDTH]: '1pt',
                    [n.STYLE_KEYS.TEXT_TRANSFORM]: 'manual',
                    [n.STYLE_KEYS.LINE_CORNER]: '8pt',
                    [n.STYLE_KEYS.MARGIN_LEFT]: '6pt',
                    [n.STYLE_KEYS.MARGIN_RIGHT]: '6pt',
                    [n.STYLE_KEYS.MARGIN_TOP]: '6pt',
                    [n.STYLE_KEYS.MARGIN_BOTTOM]: '6pt',
                    [n.STYLE_KEYS.SPACING_MAJOR]: '26pt',
                    [n.STYLE_KEYS.SPACING_MINOR]: '8pt',
                    [n.STYLE_KEYS.LINE_PATTERN]: n.LINE_PATTERN.SOLID,
                    [n.STYLE_KEYS.BORDER_LINE_PATTERN]: n.LINE_PATTERN.SOLID,
                    [n.STYLE_KEYS.ARROW_END_CLASS]: n.ARROW_CLASS.NONE,
                },
            },
            [n.CLASS_TYPE.FLOATING_TOPIC]: {
                properties: {
                    [n.STYLE_KEYS.FONT_WEIGHT]: 'normal',
                    [n.STYLE_KEYS.TEXT_COLOR]: '#FFFFFF',
                    [n.STYLE_KEYS.FONT_FAMILY]: '$system$',
                    [n.STYLE_KEYS.FONT_STYLE]: 'normal',
                    [n.STYLE_KEYS.FONT_SIZE]: '14pt',
                    [n.STYLE_KEYS.TEXT_DECORATION]: 'none',
                    [n.STYLE_KEYS.SHAPE_CLASS]:
                        'org.xmind.topicShape.roundedRect',
                    [n.STYLE_KEYS.SHAPE_CORNER]: '8pt',
                    [n.STYLE_KEYS.FILL_COLOR]: '#333333',
                    [n.STYLE_KEYS.FILL_PATTERN]: 'solid',
                    [n.STYLE_KEYS.LINE_CLASS]:
                        'org.xmind.branchConnection.roundedElbow',
                    [n.STYLE_KEYS.LINE_COLOR]: '#333333',
                    [n.STYLE_KEYS.LINE_WIDTH]: '1pt',
                    [n.STYLE_KEYS.LINE_CORNER]: '8pt',
                    [n.STYLE_KEYS.TEXT_TRANSFORM]: 'manual',
                    [n.STYLE_KEYS.BORDER_LINE_COLOR]: '#333333',
                    [n.STYLE_KEYS.BORDER_LINE_WIDTH]: '0pt',
                    [n.STYLE_KEYS.MARGIN_LEFT]: '11pt',
                    [n.STYLE_KEYS.MARGIN_RIGHT]: '11pt',
                    [n.STYLE_KEYS.MARGIN_TOP]: '11pt',
                    [n.STYLE_KEYS.MARGIN_BOTTOM]: '11pt',
                    [n.STYLE_KEYS.SPACING_MAJOR]: '26pt',
                    [n.STYLE_KEYS.SPACING_MINOR]: '8pt',
                    [n.STYLE_KEYS.LINE_PATTERN]: n.LINE_PATTERN.SOLID,
                    [n.STYLE_KEYS.BORDER_LINE_PATTERN]: n.LINE_PATTERN.SOLID,
                    [n.STYLE_KEYS.ARROW_END_CLASS]: n.ARROW_CLASS.NONE,
                },
            },
            [n.CLASS_TYPE.SUMMARY_TOPIC]: {
                properties: {
                    [n.STYLE_KEYS.FONT_WEIGHT]: 'normal',
                    [n.STYLE_KEYS.TEXT_COLOR]: '#FFFFFF',
                    [n.STYLE_KEYS.FONT_FAMILY]: '$system$',
                    [n.STYLE_KEYS.FONT_STYLE]: 'italic',
                    [n.STYLE_KEYS.FONT_SIZE]: '14pt',
                    [n.STYLE_KEYS.TEXT_DECORATION]: 'none',
                    [n.STYLE_KEYS.SHAPE_CLASS]:
                        'org.xmind.topicShape.roundedRect',
                    [n.STYLE_KEYS.SHAPE_CORNER]: '5pt',
                    [n.STYLE_KEYS.FILL_COLOR]: '#333333',
                    [n.STYLE_KEYS.FILL_PATTERN]: 'solid',
                    [n.STYLE_KEYS.MARGIN_LEFT]: '12pt',
                    [n.STYLE_KEYS.MARGIN_RIGHT]: '12pt',
                    [n.STYLE_KEYS.MARGIN_TOP]: '6pt',
                    [n.STYLE_KEYS.MARGIN_BOTTOM]: '6pt',
                    [n.STYLE_KEYS.LINE_CLASS]:
                        'org.xmind.branchConnection.roundedElbow',
                    [n.STYLE_KEYS.LINE_COLOR]: '#232323',
                    [n.STYLE_KEYS.LINE_CORNER]: '8pt',
                    [n.STYLE_KEYS.LINE_WIDTH]: '1pt',
                    [n.STYLE_KEYS.TEXT_TRANSFORM]: 'manual',
                    [n.STYLE_KEYS.SPACING_MAJOR]: '26pt',
                    [n.STYLE_KEYS.SPACING_MINOR]: '8pt',
                    [n.STYLE_KEYS.BORDER_LINE_COLOR]: 'none',
                    [n.STYLE_KEYS.BORDER_LINE_WIDTH]: '1pt',
                    [n.STYLE_KEYS.LINE_PATTERN]: n.LINE_PATTERN.SOLID,
                    [n.STYLE_KEYS.BORDER_LINE_PATTERN]: n.LINE_PATTERN.SOLID,
                    [n.STYLE_KEYS.ARROW_END_CLASS]: n.ARROW_CLASS.NONE,
                },
            },
            [n.CLASS_TYPE.IMPORTANT_TOPIC]: { properties: {} },
            [n.CLASS_TYPE.MINOR_TOPIC]: { properties: {} },
            [n.CLASS_TYPE.EXPIRED_TOPIC]: { properties: {} },
            [n.CLASS_TYPE.BOUNDARY]: {
                properties: {
                    [n.STYLE_KEYS.SHAPE_CLASS]:
                        'org.xmind.boundaryShape.roundedRect',
                    [n.STYLE_KEYS.SHAPE_CORNER]: '20pt',
                    [n.STYLE_KEYS.FILL_COLOR]: '#D5E9FC',
                    [n.STYLE_KEYS.LINE_COLOR]: '#2A7AC2',
                    [n.STYLE_KEYS.LINE_WIDTH]: '2pt',
                    [n.STYLE_KEYS.LINE_PATTERN]: 'dash',
                    [n.STYLE_KEYS.OPACITY]: '0.2',
                    [n.STYLE_KEYS.FONT_FAMILY]: '$system$',
                    [n.STYLE_KEYS.FONT_WEIGHT]: 'normal',
                    [n.STYLE_KEYS.TEXT_COLOR]: '#333333',
                    [n.STYLE_KEYS.FONT_STYLE]: 'italic',
                    [n.STYLE_KEYS.FONT_SIZE]: '12pt',
                    [n.STYLE_KEYS.MARGIN_LEFT]: '10pt',
                    [n.STYLE_KEYS.MARGIN_RIGHT]: '10pt',
                    [n.STYLE_KEYS.MARGIN_TOP]: '6pt',
                    [n.STYLE_KEYS.MARGIN_BOTTOM]: '6pt',
                    [n.STYLE_KEYS.TEXT_DECORATION]: 'none',
                    [n.STYLE_KEYS.TEXT_ALIGN]: 'left',
                    [n.STYLE_KEYS.TEXT_TRANSFORM]: 'manual',
                },
            },
            [n.CLASS_TYPE.RELATIONSHIP]: {
                properties: {
                    [n.STYLE_KEYS.SHAPE_CLASS]:
                        'org.xmind.relationshipShape.curved',
                    [n.STYLE_KEYS.LINE_COLOR]: '#2A7AC2',
                    [n.STYLE_KEYS.LINE_WIDTH]: '2pt',
                    [n.STYLE_KEYS.LINE_PATTERN]: 'dash',
                    [n.STYLE_KEYS.ARROW_BEGIN_CLASS]:
                        'org.xmind.arrowShape.none',
                    [n.STYLE_KEYS.ARROW_END_CLASS]:
                        'org.xmind.arrowShape.triangle',
                    [n.STYLE_KEYS.FONT_FAMILY]: '$system$',
                    [n.STYLE_KEYS.FONT_WEIGHT]: 'normal',
                    [n.STYLE_KEYS.TEXT_COLOR]: '#333333',
                    [n.STYLE_KEYS.FONT_STYLE]: 'italic',
                    [n.STYLE_KEYS.FONT_SIZE]: '12pt',
                    [n.STYLE_KEYS.TEXT_DECORATION]: 'none',
                    [n.STYLE_KEYS.TEXT_ALIGN]: 'center',
                    [n.STYLE_KEYS.TEXT_TRANSFORM]: 'manual',
                },
            },
            [n.CLASS_TYPE.SUMMARY]: {
                properties: {
                    [n.STYLE_KEYS.SHAPE_CLASS]: 'org.xmind.summaryShape.square',
                    [n.STYLE_KEYS.LINE_COLOR]: '#007ac8',
                    [n.STYLE_KEYS.LINE_WIDTH]: '2pt',
                    [n.STYLE_KEYS.LINE_PATTERN]: 'solid',
                    [n.STYLE_KEYS.LINE_CORNER]: '8pt',
                },
            },
            [n.CLASS_TYPE.MAP]: {
                properties: {
                    [n.STYLE_KEYS.FILL_COLOR]: '#ffffff',
                    [n.STYLE_KEYS.GRADIENT_COLOR]: 'none',
                },
            },
        };
        let d = Object.assign({}, c);
        ((d = l(d, a(o.DEFAULT_SKELETON_THEME_ID).theme)),
            (d = l(d, s(o.DEAFULT_COLOR_THEME_FOR_SNOWBRUSH).theme)),
            Object.assign(d[n.CLASS_TYPE.CENTRAL_TOPIC].properties, {
                [n.STYLE_KEYS.TEXT_ALIGN]: n.TEXTALIGN.CENTER,
            }),
            Object.assign(d[n.CLASS_TYPE.SUB_TOPIC].properties, {
                [n.STYLE_KEYS.FILL_COLOR]: 'none',
                [n.STYLE_KEYS.TEXT_COLOR]: '#0A0E16',
                [n.STYLE_KEYS.SHAPE_CLASS]: n.TOPICSHAPE.UNDERLINE,
            }));
        ([n.STYLE_KEYS.BORDER_LINE_WIDTH].forEach((e) => {
            delete d[n.CLASS_TYPE.SUB_TOPIC].properties[e];
        }),
            (t.a = {
                getStyleValue(e, t) {
                    if (d[e])
                        return d[e].properties[t]
                            ? d[e].properties[t]
                            : t === n.STYLE_KEYS.TEXT_ALIGN
                              ? n.TEXTALIGN.LEFT
                              : void 0;
                },
                hasClass(e) {
                    return !!d[e];
                },
            }));
    },
];
