export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return I;
        });
        var n = i(0),
            r = i(3),
            o = i(1);
        const a = (e) => (t) => !e(t),
            s =
                (...e) =>
                (t) =>
                    e.every((e) => e(t)),
            l =
                (...e) =>
                (t) =>
                    e.some((e) => e(t)),
            c = (e) => (t) => r.a.getClassName(t) === e;
        function d(e) {
            var t;
            return (
                !!Object(o.isTreeTableCell)(e) &&
                (!Object(o.isTreeTableHeadBranch)(e) ||
                    !(
                        null !== (t = e.originBranchView) && void 0 !== t
                            ? t
                            : e
                    ).shouldCollapse())
            );
        }
        var f = {
            [n.STYLE_LAYER.BEFORE_USER]: [
                {
                    type: n.STYLE_KEYS.BORDER_LINE_WIDTH,
                    value: '0',
                    test: s(d, a(o.isTreeTableHeadBranch)),
                },
                {
                    type: n.STYLE_KEYS.BORDER_LINE_WIDTH,
                    value: '0',
                    test: c(n.CLASS_TYPE.CALLOUT_TOPIC),
                },
                {
                    type: n.STYLE_KEYS.BORDER_LINE_PATTERN,
                    value: (e) => {
                        const t = r.a.getStyleValue(
                            e,
                            n.STYLE_KEYS.BORDER_LINE_PATTERN,
                            {
                                ignoreLayeredBeforeUser: !0,
                                ignoreDynamicPriorityOverridedStyle: !0,
                            }
                        );
                        if (Object.values(n.DASH_LINE_PATTERN).includes(t))
                            return t === n.LINE_PATTERN.HANDDRAWNDASH
                                ? n.LINE_PATTERN.HANDDRAWNSOLID
                                : n.LINE_PATTERN.SOLID;
                    },
                    test: o.isTreeTableHeadBranch,
                },
            ],
        };
        var h = {
                [n.STYLE_LAYER.BEFORE_USER]: [
                    {
                        type: n.STYLE_KEYS.SHAPE_CLASS,
                        value: n.TOPICSHAPE.MATRIXMAIN,
                        test: o.isMatrixCell,
                    },
                    {
                        type: n.STYLE_KEYS.SHAPE_CLASS,
                        value: n.TOPICSHAPE.TREETABLEMAIN,
                        test: d,
                    },
                ],
            },
            p = i(32);
        const T = (e) => e.getContext().isAlignmentByLevelMode(),
            u = (e) => (t) =>
                t &&
                t.type === n.VIEW_TYPE.BRANCH &&
                t.getStructureClass() === e,
            g = (e) =>
                [
                    ...n.MAP_LIKE_STRUCTURES,
                    ...n.LOGIC_CHART_STRUCTURES,
                    n.STRUCTURECLASS.BRACELEFT,
                    n.STRUCTURECLASS.BRACERIGHT,
                    n.STRUCTURECLASS.TREELEFT,
                    n.STRUCTURECLASS.TREERIGHT,
                ].includes(e.getStructureClass());
        var Q = {
                [n.STYLE_LAYER.BEFORE_USER]: [
                    {
                        type: n.STYLE_KEYS.LINE_CLASS,
                        value: n.BRANCHCONNECTION.BRACE,
                        test: s(o.isBranch, (e) => {
                            const t = l(
                                    u(n.STRUCTURECLASS.BRACELEFT),
                                    u(n.STRUCTURECLASS.BRACERIGHT)
                                )(e),
                                i = r.a.getStyleValue(
                                    e,
                                    n.STYLE_KEYS.LINE_CLASS,
                                    { ignoreLayeredBeforeUser: !0 }
                                ),
                                o = Object.keys(n.BRACE_BRANCH_CONNECTION).some(
                                    (e) => i === n.BRACE_BRANCH_CONNECTION[e]
                                );
                            return t && !o;
                        }),
                    },
                    {
                        type: n.STYLE_KEYS.LINE_CLASS,
                        value: n.BRANCHCONNECTION.ROUNDEDELBOW,
                        test: s(o.isBranch, (e) => {
                            const t = [
                                    n.STRUCTURECLASS.BRACELEFT,
                                    n.STRUCTURECLASS.BRACERIGHT,
                                ].some((t) => u(t)(e)),
                                i = r.a.getStyleValue(
                                    e,
                                    n.STYLE_KEYS.LINE_CLASS,
                                    { ignoreLayeredBeforeUser: !0 }
                                ),
                                o = Object.keys(n.BRACE_BRANCH_CONNECTION).some(
                                    (e) => i === n.BRACE_BRANCH_CONNECTION[e]
                                );
                            return !t && o;
                        }),
                    },
                    {
                        type: n.STYLE_KEYS.SHAPE_CLASS,
                        value: n.PRIVATE_TOPICSHAPE_FALLBACK[
                            n.TOPICSHAPE.TREETABLEMAIN
                        ],
                        test: s(o.isBranch, (e) => {
                            const t = r.a.getStyleValue(
                                e,
                                n.STYLE_KEYS.SHAPE_CLASS,
                                { ignoreLayeredBeforeUser: !0 }
                            );
                            return !d(e) && t === n.TOPICSHAPE.TREETABLEMAIN;
                        }),
                    },
                    {
                        type: n.STYLE_KEYS.SHAPE_CLASS,
                        value: n.PRIVATE_TOPICSHAPE_FALLBACK[
                            n.TOPICSHAPE.MATRIXMAIN
                        ],
                        test: s(o.isBranch, (e) => {
                            const t = r.a.getStyleValue(
                                e,
                                n.STYLE_KEYS.SHAPE_CLASS,
                                { ignoreLayeredBeforeUser: !0 }
                            );
                            return (
                                !Object(o.isMatrixCell)(e) &&
                                t === n.TOPICSHAPE.MATRIXMAIN
                            );
                        }),
                    },
                    {
                        type: n.STYLE_KEYS.SHAPE_CLASS,
                        value: n.TOPICSHAPE.RECT,
                        test: (e) => {
                            if (!e || e.type !== n.VIEW_TYPE.BRANCH) return;
                            const t = [
                                    n.TOPICSHAPE.STAR,
                                    n.TOPICSHAPE.HEART,
                                    n.TOPICSHAPE.FATLEFTARROW,
                                    n.TOPICSHAPE.FATRIGHTARROW,
                                ],
                                i = r.a.getStyleValue(
                                    e,
                                    n.STYLE_KEYS.SHAPE_CLASS,
                                    { ignoreLayeredBeforeUser: !0 }
                                );
                            return (
                                Object(o.isFishBoneMainBone)(e) && t.includes(i)
                            );
                        },
                    },
                    {
                        type: n.STYLE_KEYS.LINE_CLASS,
                        value: n.BRANCHCONNECTION.STRAIGHT,
                        test: u(n.STRUCTURECLASS.TIMELINETHROUGHVERTICAL),
                    },
                ],
                beforeParent: [],
                beforeTheme: [
                    {
                        type: n.STYLE_KEYS.MARGIN_LEFT,
                        value: (e) => {
                            const t = e
                                    .getContext()
                                    .model.theme()
                                    .getStyleValue(
                                        n.CLASS_TYPE.SUB_TOPIC,
                                        n.STYLE_KEYS.MARGIN_LEFT
                                    ),
                                i = p.a.getStyleValue(
                                    n.CLASS_TYPE.SUB_TOPIC,
                                    n.STYLE_KEYS.MARGIN_LEFT
                                );
                            return t || i;
                        },
                        test: s(d, c(n.CLASS_TYPE.MAIN_TOPIC)),
                    },
                    {
                        type: n.STYLE_KEYS.MARGIN_RIGHT,
                        value: (e) => {
                            const t = e
                                    .getContext()
                                    .model.theme()
                                    .getStyleValue(
                                        n.CLASS_TYPE.SUB_TOPIC,
                                        n.STYLE_KEYS.MARGIN_RIGHT
                                    ),
                                i = p.a.getStyleValue(
                                    n.CLASS_TYPE.SUB_TOPIC,
                                    n.STYLE_KEYS.MARGIN_RIGHT
                                );
                            return t || i;
                        },
                        test: s(d, c(n.CLASS_TYPE.MAIN_TOPIC)),
                    },
                ],
                beforeDefault: [
                    {
                        type: n.STYLE_KEYS.TEXT_ALIGN,
                        value: n.TEXTALIGN.LEFT,
                        test: s(o.isTreeTableCell, (e) => {
                            if (Object(o.isTreeTableHeadBranch)(e)) return !1;
                            const t = 0 == e.getChildrenBranchesByType().length,
                                i = e.shouldCollapse();
                            return !t && !i;
                        }),
                    },
                    {
                        type: n.STYLE_KEYS.TEXT_ALIGN,
                        value: n.TEXTALIGN.RIGHT,
                        test: s(o.isTreeTableCell, (e) => {
                            if (Object(o.isTreeTableHeadBranch)(e)) return !1;
                            const t =
                                    0 === e.getChildrenBranchesByType().length,
                                i = e.shouldCollapse();
                            return t || i;
                        }),
                    },
                    {
                        type: n.STYLE_KEYS.TEXT_ALIGN,
                        value: n.TEXTALIGN.RIGHT,
                        test: s(
                            T,
                            o.isBranch,
                            g,
                            a(o.isCentralBranch),
                            (e) => e.getRealPosition().x < 0
                        ),
                    },
                    {
                        type: n.STYLE_KEYS.TEXT_ALIGN,
                        value: n.TEXTALIGN.LEFT,
                        test: s(
                            T,
                            o.isBranch,
                            g,
                            a(o.isCentralBranch),
                            (e) => e.getRealPosition().x > 0
                        ),
                    },
                ],
            },
            m = i(17),
            b = i(40),
            C = i(44),
            L = i(73);
        const y = '#ffffff',
            M = '#000000';
        function A(e) {
            if ('none' === r.a.getUserStyleValue(e, n.STYLE_KEYS.FILL_COLOR))
                return !0;
            const t = r.a.getTheme(e);
            if (Object.keys(t.toJSON()).length) {
                return (
                    'none' ===
                    r.a.getThemeStyleValue(e, n.STYLE_KEYS.FILL_COLOR)
                );
            }
            return (
                'none' === r.a.getDefaultStyleValue(e, n.STYLE_KEYS.FILL_COLOR)
            );
        }
        function v(e) {
            return !!O(e);
        }
        function E(e) {
            if (!c(n.CLASS_TYPE.SUB_TOPIC)(e)) return !1;
            const t = e.parent();
            if (!(t instanceof m.a)) return !1;
            const i = r.a.getClassName(t);
            return (
                i === n.CLASS_TYPE.FLOATING_TOPIC ||
                (i !== n.CLASS_TYPE.MAIN_TOPIC && E(t))
            );
        }
        function _(e, t) {
            const i = e.getContext();
            let r;
            (e instanceof m.a
                ? (r = e.topicView.figure.visualFillColor)
                : e instanceof b.a
                  ? (r = e.figure.lineColor)
                  : e instanceof C.a && (r = 'none'),
                'none' === r && (r = i.getSheetView().figure.backgroundColor));
            const { snowballUtil: a, getSmartTextColor: s } = Object(
                o.getInjectModule
            )(n.MODULE_NAME.SNOWBALL);
            return s(a.blendingColor(r, n.VISUAL_BACK_COLOR), t);
        }
        function O(e) {
            const { getColorThemeDataById: t } = Object(o.getInjectModule)(
                n.MODULE_NAME.SNOWBALL
            );
            return t(e.getContext().model.theme().getColorThemeId());
        }
        var S = {
            [n.STYLE_LAYER.BEFORE_THEME]: [
                {
                    type: n.STYLE_KEYS.FILL_COLOR,
                    value: (e) =>
                        Object(o.getSmartFillColorByLineColor)(
                            e,
                            e.figure.lineColor
                        ),
                    test: s(o.isBranch, o.isInMultiLineColorsMode, a(A), v),
                },
                {
                    type: n.STYLE_KEYS.TEXT_COLOR,
                    value: (e) => {
                        const t = O(e);
                        if (!t) return;
                        const i =
                                t.theme[n.CLASS_TYPE.CENTRAL_TOPIC].properties[
                                    n.STYLE_KEYS.FILL_COLOR
                                ],
                            r = e.topicView.figure.visualFillColor;
                        if (!r) return;
                        const { snowballUtil: a, snowballConstant: s } = Object(
                            o.getInjectModule
                        )(n.MODULE_NAME.SNOWBALL);
                        return a.calculateRatio(r, i) >= s.TEXT_MIN_RATIO
                            ? i
                            : void 0;
                    },
                    test: s(o.isBranch, c(n.CLASS_TYPE.CENTRAL_TOPIC), A, v),
                },
                {
                    type: n.STYLE_KEYS.TEXT_COLOR,
                    value: (e) => {
                        var t, i;
                        const o = e.getContext().getSheetView();
                        return _(
                            e,
                            null !==
                                (i =
                                    null ===
                                        (t = r.a.getThemeStyleValue(
                                            o,
                                            n.STYLE_KEYS.COLOR_LIST
                                        )) || void 0 === t
                                        ? void 0
                                        : t.split(' ')) && void 0 !== i
                                ? i
                                : [M, y]
                        );
                    },
                    test: s(
                        l(
                            function (e) {
                                return e instanceof b.a;
                            },
                            function (e) {
                                return e instanceof C.a;
                            },
                            (e) =>
                                !Object(o.isInMultiLineColorsMode)(e) ||
                                (!c(n.CLASS_TYPE.MAIN_TOPIC)(e) &&
                                    (!c(n.CLASS_TYPE.SUB_TOPIC)(e) || E(e)))
                        ),
                        v
                    ),
                },
                {
                    type: n.STYLE_KEYS.TEXT_COLOR,
                    value: (e) => _(e, [y, M]),
                    test: s(
                        o.isBranch,
                        o.isInMultiLineColorsMode,
                        c(n.CLASS_TYPE.MAIN_TOPIC),
                        v
                    ),
                },
                {
                    type: n.STYLE_KEYS.TEXT_COLOR,
                    value: (e) => {
                        const { snowballUtil: t } = Object(o.getInjectModule)(
                            n.MODULE_NAME.SNOWBALL
                        );
                        let i = Object(L.a)(e).getMultiLineColor(e);
                        i || (i = e.figure.lineColor);
                        const { h: r, s: a } = t.hexStringToHSLObject(i),
                            s = t.hslObjectToHexString({
                                h: r,
                                s: a,
                                l: 20,
                            });
                        return _(e, [y, s]);
                    },
                    test: s(
                        o.isBranch,
                        o.isInMultiLineColorsMode,
                        c(n.CLASS_TYPE.SUB_TOPIC),
                        a(E),
                        v
                    ),
                },
            ],
        };
        const x = {};
        class R {
            constructor(e, t) {
                ((this.id = e), (this.styleDescriptor = t));
            }
            getStyleValue(e, t, i) {
                let n;
                const r = this.styleDescriptor[e];
                return (
                    r &&
                        r.some((e) => {
                            if (e && e.type === t && (!e.test || e.test(i)))
                                return (
                                    (n =
                                        e.value && 'function' == typeof e.value
                                            ? e.value(i)
                                            : e.value),
                                    n
                                );
                        }),
                    n
                );
            }
            getStyleKeyList(e) {
                var t;
                const i = (
                    null !== (t = this.styleDescriptor[e]) && void 0 !== t
                        ? t
                        : []
                ).map((e) => e.type);
                return [...new Set(i)];
            }
        }
        class I {
            constructor(e) {
                ((this.overrideStyleArray = []),
                    (this.context = e),
                    (this.fixedOverrideStyle = new R('fixed', f)),
                    this.init());
            }
            init() {
                (this.overrideStyleArray.push(
                    new R(n.STYLE_DESCRIPTOR_FOR_DEFAULT_SETTING_ID, x)
                ),
                    this.overrideStyleArray.push(
                        new R(n.STYLE_DESCRIPTOR_FOR_STRUCTURE_ID, Q)
                    ),
                    this.overrideStyleArray.push(
                        new R(n.STYLE_DESCRIPTOR_FOR_PRIVATE_STYLE_ID, h)
                    ),
                    this.overrideStyleArray.push(
                        new R(n.STYLE_DESCRIPTOR_FOR_SMART_COLOR_ID, S)
                    ));
            }
            insertOverrideStyle(e, t, i) {
                const n = new R(e, t);
                return (
                    this.overrideStyleArray.forEach((e, t) => {
                        i
                            ? e.id !== i ||
                              this.overrideStyleArray.splice(t, 0, n)
                            : this.overrideStyleArray.push(n);
                    }),
                    n
                );
            }
            removeOverrideStyle(e) {
                this.overrideStyleArray = this.overrideStyleArray.filter(
                    (t) => t.id !== e
                );
            }
            getStyleValue(e, t, i, n = {}) {
                var r;
                let o = null;
                if (this.fixedOverrideStyle) {
                    const n = this.fixedOverrideStyle.getStyleValue(e, t, i);
                    if (n) return n;
                }
                for (let a = this.overrideStyleArray.length - 1; a >= 0; a--) {
                    const s = this.overrideStyleArray[a];
                    if (
                        null === (r = n.ignoreOverrideStyleIdList) ||
                        void 0 === r
                            ? void 0
                            : r.includes(s.id)
                    )
                        continue;
                    const l = s.getStyleValue(e, t, i);
                    if (l) {
                        o = l;
                        break;
                    }
                }
                return o;
            }
            getDynamicPriorityLayerStyleKeys() {
                const e = {};
                return (
                    this.overrideStyleArray.forEach((t) => {
                        e[t.id] = t.getStyleKeyList(
                            n.STYLE_LAYER.DYNAMIC_PRIORITY
                        );
                    }),
                    e
                );
            }
        }
        I.identifier = n.MODULE_NAME.OVERRIDE_STYLE;
    },
];
