export default [
    function (e, t, i) {
        'use strict';
        var n = i(0),
            r = i(3),
            o = i(32),
            a = i(5),
            s = i(1);
        t.a = class {
            constructor(e) {
                ((this.firstTargetMap = {}), (this.sheetEditor = e));
            }
            export(e = {}) {
                this.prepareFirstTargetMap();
                const t = { id: Object(a.b)() };
                n.TOPIC_CLASS_TYPES.forEach((i) => {
                    let r = this.firstTargetMap[i];
                    ((t[i] = { properties: {}, id: Object(a.b)() }),
                        (e.toSkeletonTheme &&
                            ((t.id = this.sheetEditor.model.getId()),
                            i !== n.CLASS_TYPE.FLOATING_TOPIC ||
                                r ||
                                (r =
                                    this.firstTargetMap[
                                        n.CLASS_TYPE.MAIN_TOPIC
                                    ]),
                            !r)) ||
                            (t[i] = {
                                properties: this.exportTopicTheme(
                                    this.firstTargetMap[i],
                                    i,
                                    e
                                ),
                            }));
                });
                return (
                    [
                        n.CLASS_TYPE.BOUNDARY,
                        n.CLASS_TYPE.SUMMARY,
                        n.CLASS_TYPE.RELATIONSHIP,
                        n.CLASS_TYPE.MAP,
                    ].forEach((i) => {
                        const n = this.exportNormalComponentTheme(
                            this.firstTargetMap[i],
                            i,
                            e
                        );
                        t[i] = { properties: n, id: Object(a.b)() };
                    }),
                    this.wrapColorThemeAndSkeletonThemeInfo(
                        this.validateThemeInSpecialStructure(
                            t,
                            this.firstTargetMap[n.CLASS_TYPE.CENTRAL_TOPIC]
                        ),
                        e
                    )
                );
            }
            exportTopicTheme(e, t, i) {
                const o = {},
                    a = (function (e, t) {
                        let i;
                        return (
                            (i = t.toColorTheme
                                ? [
                                      n.TOPIC_COLOR_STYLE_KEYS,
                                      n.CALLOUT_TOPIC_COLOR_STYLE_KEYS,
                                  ]
                                : t.toSkeletonTheme
                                  ? [
                                        n.TOPIC_SKELETON_STYLE_KEYS,
                                        n.CALLOUT_TOPIC_SKELETON_STYLE_KEYS,
                                    ]
                                  : [
                                        [
                                            ...n.TOPIC_COLOR_STYLE_KEYS,
                                            ...n.TOPIC_SKELETON_STYLE_KEYS,
                                        ],
                                        n.CALLOUT_TOPIC_STYLE_KEYS,
                                    ]),
                            i[e === n.CLASS_TYPE.CALLOUT_TOPIC ? 1 : 0]
                        );
                    })(t, i),
                    l = n.PRESET_QUICK_STYLE_CLASS_TYPES.includes(t),
                    c =
                        (i.toColorTheme || i.toSkeletonTheme) &&
                        t === n.CLASS_TYPE.CENTRAL_TOPIC;
                return (
                    a.forEach((a) => {
                        let d,
                            f = n.DYNAMIC_STYLE_KEYS.includes(a);
                        if (
                            (t === n.CLASS_TYPE.CENTRAL_TOPIC &&
                                a === n.STYLE_KEYS.BORDER_LINE_WIDTH &&
                                (f = !1),
                            e)
                        )
                            d = r.a.getStyleValue(e, a, {
                                ignoreSpecialHandle: !0,
                                ignoreParent: f,
                                ignoreLayeredBeforeTheme: f,
                                ignoreTheme: l,
                                ignoreDefault: !c && (l || f),
                                ignoreLayeredBeforeUser:
                                    Object(s.isTreeTableCell)(e) &&
                                    a === n.STYLE_KEYS.FILL_COLOR,
                                ignoreCompatibilityFix: !0,
                            });
                        else {
                            const e = this.getClassThemeStyleValue(t, a),
                                i = this.getClassDefaultStyleValue(t, a);
                            f || l ? e && (d = e) : (e || i) && (d = e || i);
                        }
                        let h = this.validateSpecialStyleValue(a, d);
                        (!i.toSkeletonTheme ||
                            (a !== n.STYLE_KEYS.FILL_COLOR &&
                                a !== n.STYLE_KEYS.BORDER_LINE_COLOR) ||
                            'none' === h) &&
                            h &&
                            (o[a] = h);
                    }),
                    o
                );
            }
            exportNormalComponentTheme(e, t, i) {
                const o = {};
                return (
                    (function (e, t) {
                        const i = {
                                [n.CLASS_TYPE.SUMMARY]: [
                                    n.SUMMARY_COLOR_STYLE_KEYS,
                                    n.SUMMARY_SKELETON_STYLE_KEYS,
                                    n.SUMMARY_STYLE_KEYS,
                                ],
                                [n.CLASS_TYPE.BOUNDARY]: [
                                    n.BOUNDARY_COLOR_STYLE_KEYS,
                                    n.BOUNDARY_SKELETON_STYLE_KEYS,
                                    n.BOUNDARY_STYLE_KEYS,
                                ],
                                [n.CLASS_TYPE.RELATIONSHIP]: [
                                    n.RELATIONSHIP_COLOR_STYLE_KEYS,
                                    n.RELATIONSHIP_SKELETON_STYLE_KEYS,
                                    n.RELATIONSHIP_STYLE_KEYS,
                                ],
                                [n.CLASS_TYPE.MAP]: [
                                    n.MAP_COLOR_STYLE_KEYS,
                                    n.MAP_SKELETON_STYLE_KEYS,
                                    n.MAP_STYLE_KEYS,
                                ],
                            },
                            r = t.toColorTheme ? 0 : t.toSkeletonTheme ? 1 : 2;
                        return i[e][r];
                    })(t, i).forEach((a) => {
                        let s;
                        if (e) s = r.a.getStyleValue(e, a);
                        else {
                            const e = this.getClassThemeStyleValue(t, a),
                                i = this.getClassDefaultStyleValue(t, a);
                            (e || i) && (s = e || i);
                        }
                        ((a !== n.STYLE_KEYS.FILL_COLOR &&
                            a !== n.STYLE_KEYS.BORDER_LINE_COLOR) ||
                            !i.toSkeletonTheme ||
                            'none' === s) &&
                            (a !== n.STYLE_KEYS.LINE_TAPERED ||
                                s ||
                                (s = 'none'),
                            s && (o[a] = s));
                    }),
                    i.toColorTheme &&
                        t === n.CLASS_TYPE.MAP &&
                        (o[n.STYLE_KEYS.COLOR_LIST] = '#ffffff #000000'),
                    o
                );
            }
            getClassThemeStyleValue(e, t) {
                const i = r.a.getTheme(this.sheetEditor);
                if (i) return i.getStyleValue(e, t);
            }
            getClassDefaultStyleValue(e, t) {
                return o.a.getStyleValue(e, t);
            }
            getBranchViewQuickStyleClassName(e) {
                return r.a.getClassList(e)[0];
            }
            validateSpecialStyleValue(e, t) {
                return e !== n.STYLE_KEYS.LINE_CLASS &&
                    e !== n.STYLE_KEYS.SHAPE_CLASS
                    ? t
                    : ((i = n.BRACE_BRANCH_CONNECTION),
                      (r = t),
                      Object.keys(i).some((e) => i[e] === r)
                          ? n.BRANCHCONNECTION.ROUNDEDELBOW
                          : t === n.TOPICSHAPE.MATRIXMAIN ||
                              t === n.TOPICSHAPE.TREETABLEMAIN
                            ? n.TOPICSHAPE.RECT
                            : t);
                var i, r;
            }
            validateThemeInSpecialStructure(e, t) {
                let i = {};
                const r = t.getStructureClass();
                return (
                    n.TABLE_LIKE_STRUCTURE_LIST.includes(r) &&
                        (i = {
                            [n.CLASS_TYPE.CENTRAL_TOPIC]: {
                                [n.STYLE_KEYS.SHAPE_CLASS]: n.TOPICSHAPE.RECT,
                            },
                            [n.CLASS_TYPE.MAIN_TOPIC]: {
                                [n.STYLE_KEYS.SHAPE_CLASS]: n.TOPICSHAPE.RECT,
                            },
                            [n.CLASS_TYPE.SUB_TOPIC]: {
                                [n.STYLE_KEYS.SHAPE_CLASS]: n.TOPICSHAPE.RECT,
                            },
                        }),
                    Object.keys(i).forEach((t) => {
                        var n;
                        (null === (n = e[t]) || void 0 === n
                            ? void 0
                            : n.properties) &&
                            Object.assign(e[t].properties, i[t]);
                    }),
                    e
                );
            }
            prepareFirstTargetMap() {
                const e = this.sheetEditor
                        .getSheetView()
                        .getCentralBranchView(),
                    t = e.getChildrenBranchesByType().find((e) => {
                        const t = r.a.getClassName(e);
                        return (
                            (this.getBranchViewQuickStyleClassName(e) || t) ===
                            n.CLASS_TYPE.MAIN_TOPIC
                        );
                    }),
                    i = {
                        [n.CLASS_TYPE.CENTRAL_TOPIC]: null,
                        [n.CLASS_TYPE.MAIN_TOPIC]: null,
                        [n.CLASS_TYPE.SUB_TOPIC]: null,
                        [n.CLASS_TYPE.CALLOUT_TOPIC]: null,
                        [n.CLASS_TYPE.SUMMARY_TOPIC]: null,
                        [n.CLASS_TYPE.FLOATING_TOPIC]: null,
                        [n.CLASS_TYPE.IMPORTANT_TOPIC]: null,
                        [n.CLASS_TYPE.MINOR_TOPIC]: null,
                        [n.CLASS_TYPE.EXPIRED_TOPIC]: null,
                        [n.CLASS_TYPE.SUMMARY]: null,
                        [n.CLASS_TYPE.BOUNDARY]: null,
                        [n.CLASS_TYPE.RELATIONSHIP]: null,
                        [n.CLASS_TYPE.MAP]: null,
                    };
                ((i[n.CLASS_TYPE.CENTRAL_TOPIC] = e),
                    (i[n.CLASS_TYPE.MAIN_TOPIC] = t),
                    (i[n.CLASS_TYPE.MAP] = this.sheetEditor.getSheetView()));
                const o = (e) => {
                    const t = e.getChildrenBranchesByType([
                            n.TOPIC_TYPE.ATTACHED,
                            n.TOPIC_TYPE.CALLOUT,
                        ]),
                        a = e.getChildrenBranchesByType(n.TOPIC_TYPE.SUMMARY),
                        s = [];
                    a.forEach((e) => {
                        const t = e.summaryModel.rangeEnd;
                        (s[t] || (s[t] = []), s[t].push(e));
                    });
                    const l = [...e.boundaries],
                        c = [];
                    (i[n.CLASS_TYPE.BOUNDARY] ||
                        l.forEach((e) => {
                            const t = e.model.rangeEnd;
                            (c[t] || (c[t] = []), c[t].push(e));
                        }),
                        t.forEach((e, t) => {
                            const a = r.a.getClassName(e),
                                l =
                                    this.getBranchViewQuickStyleClassName(e) ||
                                    a;
                            (i[l] || (i[l] = e),
                                o(e),
                                s[t] &&
                                    (i[n.CLASS_TYPE.SUMMARY_TOPIC] ||
                                        ((i[n.CLASS_TYPE.SUMMARY_TOPIC] =
                                            s[t][0]),
                                        (i[n.CLASS_TYPE.SUMMARY] =
                                            s[t][0].summaryView)),
                                    s[t].forEach((e) => o(e))),
                                !i[n.CLASS_TYPE.BOUNDARY] &&
                                    c[t] &&
                                    (i[n.CLASS_TYPE.BOUNDARY] = c[t][0]));
                        }));
                };
                o(e);
                const a = e.getChildrenBranchesByType(n.TOPIC_TYPE.DETACHED);
                i[n.CLASS_TYPE.FLOATING_TOPIC] = a[0];
                const s = [...this.sheetEditor.getSheetView().relationships];
                ((i[n.CLASS_TYPE.RELATIONSHIP] = s[0]),
                    (this.firstTargetMap = i));
            }
            wrapColorThemeAndSkeletonThemeInfo(e, t) {
                if (t.toSkeletonTheme) {
                    const t = {};
                    return (
                        (t.id = e.id),
                        (t.structureStyle = {
                            [n.CLASS_TYPE.CENTRAL_TOPIC]:
                                this.firstTargetMap[
                                    n.CLASS_TYPE.CENTRAL_TOPIC
                                ].model.getStructureClass(),
                        }),
                        [
                            n.CLASS_TYPE.MAIN_TOPIC,
                            n.CLASS_TYPE.SUB_TOPIC,
                        ].forEach((e) => {
                            this.firstTargetMap[e] &&
                                this.firstTargetMap[
                                    e
                                ].model.getStructureClass() &&
                                (t.structureStyle[e] =
                                    this.firstTargetMap[
                                        e
                                    ].model.getStructureClass());
                        }),
                        (t.theme = e),
                        t
                    );
                }
                if (t.toColorTheme) {
                    const t = {};
                    return (
                        (t.id = Object(a.b)()),
                        (t.theme = e),
                        (function (e) {
                            const {
                                    snowballConstant: t,
                                    getColorThemeDataById: i,
                                } = Object(s.getInjectModule)(
                                    n.MODULE_NAME.SNOWBALL
                                ),
                                r = i(t.DEFAULT_COLOR_THEME_ID);
                            [
                                n.CLASS_TYPE.CENTRAL_TOPIC,
                                n.CLASS_TYPE.MAIN_TOPIC,
                                n.CLASS_TYPE.SUB_TOPIC,
                                n.CLASS_TYPE.IMPORTANT_TOPIC,
                                n.CLASS_TYPE.MINOR_TOPIC,
                            ].forEach((t) => {
                                (e.theme[t] ||
                                    (e.theme[t] = {
                                        properties: {
                                            [n.STYLE_KEYS.FILL_COLOR]: 'none',
                                        },
                                        id: Object(a.b)(),
                                    }),
                                    'none' ===
                                        e.theme[t].properties[
                                            n.STYLE_KEYS.FILL_COLOR
                                        ] &&
                                        (e.theme[t].properties[
                                            n.STYLE_KEYS.FILL_COLOR
                                        ] =
                                            r.theme[t].properties[
                                                n.STYLE_KEYS.FILL_COLOR
                                            ]));
                            });
                        })(t),
                        (t.tags = []),
                        t
                    );
                }
                return e;
            }
        };
    },
];
