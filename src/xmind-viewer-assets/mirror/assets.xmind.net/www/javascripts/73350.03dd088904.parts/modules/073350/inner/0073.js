export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return T;
        });
        var n = i(0),
            r = i(46),
            o = i(1);
        class a extends r.a {
            protectedHandleKey(e, t, i) {
                if (t === n.STYLE_KEYS.SHAPE_CLASS) {
                    this.getClassName(e, i) === n.CLASS_TYPE.CALLOUT_TOPIC &&
                        (t = n.STYLE_KEYS.CALLOUT_SHAPE_CLASS);
                }
                return t;
            }
            protectedGetComputedStyleKeys(e, t) {
                return [
                    ...n.TOPIC_COLOR_STYLE_KEYS,
                    ...n.TOPIC_SKELETON_STYLE_KEYS,
                    ...n.CALLOUT_TOPIC_COLOR_STYLE_KEYS,
                    ...n.CALLOUT_TOPIC_SKELETON_STYLE_KEYS,
                ];
            }
            getSuggestedClassName(e, t = {}) {
                const i = t.themeProvider ? t.themeProvider : this.getTheme(e),
                    r = e.getLayer();
                return 1 === r
                    ? n.CLASS_TYPE.CENTRAL_TOPIC
                    : e.isSummaryBranch()
                      ? n.CLASS_TYPE.SUMMARY_TOPIC
                      : e.isCalloutBranch()
                        ? n.CLASS_TYPE.CALLOUT_TOPIC
                        : e.isDetachedBranch()
                          ? i && i.hasClass(`level${r}`)
                              ? `level${r}`
                              : n.CLASS_TYPE.FLOATING_TOPIC
                          : e.isAttachedBranch()
                            ? i && i.hasClass(`level${r}`)
                                ? `level${r}`
                                : 2 === r
                                  ? n.CLASS_TYPE.MAIN_TOPIC
                                  : n.CLASS_TYPE.SUB_TOPIC
                            : void 0;
            }
            getClassName(e, t = {}) {
                const i = e.getLayer();
                return 1 === i
                    ? n.CLASS_TYPE.CENTRAL_TOPIC
                    : e.isSummaryBranch()
                      ? n.CLASS_TYPE.SUMMARY_TOPIC
                      : e.isCalloutBranch()
                        ? n.CLASS_TYPE.CALLOUT_TOPIC
                        : e.isDetachedBranch()
                          ? n.CLASS_TYPE.FLOATING_TOPIC
                          : e.isAttachedBranch()
                            ? 2 === i
                                ? n.CLASS_TYPE.MAIN_TOPIC
                                : n.CLASS_TYPE.SUB_TOPIC
                            : void 0;
            }
            getDefaultStyleValue(e, t, i = {}) {
                const o = this.protectedGetModel(e);
                return o.type() === n.TOPIC_TYPE.DETACHED &&
                    t === n.STYLE_KEYS.SHAPE_CLASS &&
                    o.getStructureClass() &&
                    0 ===
                        o
                            .getStructureClass()
                            .search(n.STRUCTURECLASS.MAPFLOATING)
                    ? n.TOPICSHAPE.ELLIPSE
                    : r.a.prototype.getDefaultStyleValue.apply(this, [e, t, i]);
            }
            protectedParentStyleValue(e, t, i, r = {}) {
                const a = super.protectedParentStyleValue(e, t, i, r);
                if (a) return a;
                if (
                    t === n.STYLE_PARENT_GROUP.BEFORE_CLASS_GROUP &&
                    i === n.STYLE_KEYS.LINE_WIDTH
                )
                    return this.getGlobalStyleValue(e, i);
                if (t === n.STYLE_PARENT_GROUP.BEFORE_THEME_GROUP) {
                    const t = e.parent();
                    switch (i) {
                        case n.STYLE_KEYS.BORDER_LINE_COLOR:
                            return (
                                this.getThemeStyleValue(e, i, r) ||
                                this.getStyleValue(e, n.STYLE_KEYS.LINE_COLOR, {
                                    ignoreDefault: !0,
                                }) ||
                                (e.parent() &&
                                    Object(o.isBranch)(t) &&
                                    this.getStyleValue(
                                        t,
                                        n.STYLE_KEYS.LINE_COLOR,
                                        { ignoreDefault: !0 }
                                    )) ||
                                (!r.ignoreDefault &&
                                    this.getDefaultStyleValue(e, i)) ||
                                (!r.ignoreDefault &&
                                    this.getDefaultStyleValue(
                                        e,
                                        n.STYLE_KEYS.LINE_COLOR
                                    ))
                            );
                        case n.STYLE_KEYS.LINE_COLOR:
                            return (
                                this.getMultiLineColor(e) ||
                                this.getThemeStyleValue(e, i) ||
                                (e.parent() &&
                                    Object(o.isBranch)(t) &&
                                    this.getStyleValue(t, i, {
                                        ignoreDefault: !0,
                                    })) ||
                                (!r.ignoreDefault &&
                                    this.getDefaultStyleValue(e, i))
                            );
                        case n.STYLE_KEYS.BORDER_LINE_WIDTH:
                            return (
                                this.getThemeStyleValue(e, i) ||
                                this.getStyleValue(e, n.STYLE_KEYS.LINE_WIDTH, {
                                    ignoreDefault: !0,
                                }) ||
                                (e.parent() &&
                                    Object(o.isBranch)(t) &&
                                    this.getStyleValue(
                                        t,
                                        n.STYLE_KEYS.LINE_WIDTH,
                                        { ignoreDefault: !0 }
                                    )) ||
                                (!r.ignoreDefault &&
                                    this.getDefaultStyleValue(e, i)) ||
                                (!r.ignoreDefault &&
                                    this.getDefaultStyleValue(
                                        e,
                                        n.STYLE_KEYS.LINE_WIDTH
                                    ))
                            );
                        case n.STYLE_KEYS.BORDER_LINE_PATTERN:
                            return (
                                this.getThemeStyleValue(e, i) ||
                                this.getStyleValue(
                                    e,
                                    n.STYLE_KEYS.LINE_PATTERN,
                                    { ignoreDefault: !0 }
                                ) ||
                                (e.parent() &&
                                    Object(o.isBranch)(t) &&
                                    this.getStyleValue(
                                        t,
                                        n.STYLE_KEYS.LINE_PATTERN,
                                        { ignoreDefault: !0 }
                                    )) ||
                                (!r.ignoreDefault &&
                                    this.getDefaultStyleValue(e, i)) ||
                                (!r.ignoreDefault &&
                                    this.getDefaultStyleValue(
                                        e,
                                        n.STYLE_KEYS.LINE_PATTERN
                                    ))
                            );
                        case n.STYLE_KEYS.LINE_WIDTH:
                        case n.STYLE_KEYS.LINE_PATTERN:
                        case n.STYLE_KEYS.ARROW_END_CLASS:
                            return (
                                this.getThemeStyleValue(e, i) ||
                                (e.parent() &&
                                    Object(o.isBranch)(t) &&
                                    this.getStyleValue(t, i, {
                                        ignoreDefault: !0,
                                    })) ||
                                (!r.ignoreDefault &&
                                    this.getDefaultStyleValue(e, i))
                            );
                        case n.STYLE_KEYS.ALIGNMENT_BY_LEVEL:
                            if (Object(o.isBranch)(t))
                                return this.getStyleValue(t, i, {
                                    ignoreDefault: !0,
                                });
                        case n.STYLE_KEYS.FILL_COLOR:
                        case n.STYLE_KEYS.TEXT_COLOR:
                            return this.getThemeStyleValue(e, i);
                    }
                }
            }
            getMultiLineColor(e) {
                if (e.isCentralBranch() || e.isDetachedBranch()) return;
                const t = e.getContext().getSheetView(),
                    i = T(t).getStyleValue(t, n.STYLE_KEYS.MULTI_LINE_COLORS);
                if (!i || 'none' === i) return;
                let r = e;
                for (; this.getClassName(r) !== n.CLASS_TYPE.MAIN_TOPIC; ) {
                    if (((r = r.parent()), !r || r.type !== n.VIEW_TYPE.BRANCH))
                        return;
                    {
                        const e =
                            this.getUserStyleValue(
                                r,
                                n.STYLE_KEYS.LINE_COLOR
                            ) ||
                            this.getUserClassValue(r, n.STYLE_KEYS.LINE_COLOR);
                        if (e) return e;
                    }
                }
                const o = i.split(' ');
                let a = r.branchIndex();
                return (a < 0 && (a = 0), o[a % o.length]);
            }
            protectedFindStyleSelector(e) {
                return T(e);
            }
            fixUserStyle(e, t) {
                super.fixUserStyle(e, t);
                let i = this.protectedFindStyleSelector(e).getUserClassValue(
                    e,
                    n.STYLE_KEYS.STRUCTURE_CLASS
                );
                (i ||
                    (i = this.protectedFindStyleSelector(e).getThemeStyleValue(
                        e,
                        n.STYLE_KEYS.STRUCTURE_CLASS
                    )),
                    e.isCentralBranch() &&
                        i &&
                        this.protectedGetModel(e).changeStructure(i),
                    t.newColorTheme || this.protectedGetModel(e).customWidth(0),
                    Array.isArray(e.boundaries) &&
                        e.boundaries.forEach((e) => {
                            this.protectedFindStyleSelector(e).fixUserStyle(
                                e,
                                t
                            );
                        }),
                    Array.isArray(e.summaries) &&
                        e.summaries.forEach((e) => {
                            this.protectedFindStyleSelector(e).fixUserStyle(
                                e,
                                t
                            );
                        }));
            }
            getDefaultStyleKeysToBeFixByTheme() {
                return [
                    n.STYLE_KEYS.SHAPE_CLASS,
                    n.STYLE_KEYS.FILL_COLOR,
                    n.STYLE_KEYS.FILL_PATTERN,
                    n.STYLE_KEYS.BORDER_LINE_COLOR,
                    n.STYLE_KEYS.BORDER_LINE_WIDTH,
                    n.STYLE_KEYS.TEXT_COLOR,
                    n.STYLE_KEYS.TEXT_ALIGN,
                    n.STYLE_KEYS.LINE_CORNER,
                    n.STYLE_KEYS.LINE_COLOR,
                    n.STYLE_KEYS.LINE_WIDTH,
                    n.STYLE_KEYS.LINE_CLASS,
                ];
            }
        }
        var s = new a();
        class l extends r.a {
            getClassName(e, t = {}) {
                return n.CLASS_TYPE.BOUNDARY;
            }
            protectedFindStyleSelector(e) {
                return T(e);
            }
            protectedParentStyleValue(e, t, i) {
                const r = super.protectedParentStyleValue(e, t, i, {});
                return (
                    r ||
                    (t === n.STYLE_PARENT_GROUP.BEFORE_THEME_GROUP &&
                    i === n.STYLE_KEYS.TEXT_COLOR
                        ? this.getThemeStyleValue(e, i)
                        : void 0)
                );
            }
            protectedGetComputedStyleKeys(e) {
                return [
                    ...n.BOUNDARY_COLOR_STYLE_KEYS,
                    ...n.BOUNDARY_SKELETON_STYLE_KEYS,
                ];
            }
            getDefaultStyleKeysToBeFixByTheme() {
                return [
                    n.STYLE_KEYS.TEXT_COLOR,
                    n.STYLE_KEYS.TEXT_ALIGN,
                    n.STYLE_KEYS.TEXT_BACKGROUND_COLOR,
                    n.STYLE_KEYS.TEXT_BULLET,
                    n.STYLE_KEYS.TEXT_DECORATION,
                    n.STYLE_KEYS.TEXT_TRANSFORM,
                    n.STYLE_KEYS.SHAPE_CLASS,
                    n.STYLE_KEYS.LINE_CORNER,
                    n.STYLE_KEYS.LINE_COLOR,
                    n.STYLE_KEYS.LINE_CLASS,
                    n.STYLE_KEYS.LINE_WIDTH,
                    n.STYLE_KEYS.LINE_PATTERN,
                    n.STYLE_KEYS.OPACITY,
                    n.STYLE_KEYS.FILL_COLOR,
                    n.STYLE_KEYS.FILL_GRADIENT,
                    n.STYLE_KEYS.BORDER_GRADIENT,
                ];
            }
        }
        var c = new l();
        class d extends r.a {
            getClassName(e, t = {}) {
                return n.CLASS_TYPE.RELATIONSHIP;
            }
            protectedFindStyleSelector(e) {
                return T(e);
            }
            protectedParentStyleValue(e, t, i) {
                const r = super.protectedParentStyleValue(e, t, i, {});
                return (
                    r ||
                    (t === n.STYLE_PARENT_GROUP.BEFORE_THEME_GROUP &&
                    i === n.STYLE_KEYS.TEXT_COLOR
                        ? this.getThemeStyleValue(e, i)
                        : void 0)
                );
            }
            protectedGetComputedStyleKeys(e) {
                return [
                    ...n.RELATIONSHIP_COLOR_STYLE_KEYS,
                    ...n.RELATIONSHIP_SKELETON_STYLE_KEYS,
                ];
            }
            getDefaultStyleKeysToBeFixByTheme() {
                return [
                    n.STYLE_KEYS.TEXT_COLOR,
                    n.STYLE_KEYS.TEXT_ALIGN,
                    n.STYLE_KEYS.TEXT_BACKGROUND_COLOR,
                    n.STYLE_KEYS.TEXT_BULLET,
                    n.STYLE_KEYS.TEXT_DECORATION,
                    n.STYLE_KEYS.TEXT_TRANSFORM,
                    n.STYLE_KEYS.SHAPE_CLASS,
                    n.STYLE_KEYS.LINE_CORNER,
                    n.STYLE_KEYS.LINE_COLOR,
                    n.STYLE_KEYS.LINE_CLASS,
                    n.STYLE_KEYS.LINE_WIDTH,
                    n.STYLE_KEYS.LINE_PATTERN,
                    n.STYLE_KEYS.OPACITY,
                    n.STYLE_KEYS.FILL_COLOR,
                    n.STYLE_KEYS.ARROW_END_CLASS,
                    n.STYLE_KEYS.ARROW_BEGIN_CLASS,
                    n.STYLE_KEYS.FILL_GRADIENT,
                    n.STYLE_KEYS.BORDER_GRADIENT,
                ];
            }
        }
        var f = new d();
        class h extends r.a {
            getClassName(e, t = {}) {
                return n.CLASS_TYPE.SUMMARY;
            }
            protectedFindStyleSelector(e) {
                return T(e);
            }
            protectedGetComputedStyleKeys(e) {
                return [
                    ...n.SUMMARY_COLOR_STYLE_KEYS,
                    ...n.SUMMARY_SKELETON_STYLE_KEYS,
                ];
            }
            getDefaultStyleKeysToBeFixByTheme() {
                return [
                    n.STYLE_KEYS.SHAPE_CLASS,
                    n.STYLE_KEYS.LINE_CORNER,
                    n.STYLE_KEYS.LINE_COLOR,
                    n.STYLE_KEYS.LINE_CLASS,
                    n.STYLE_KEYS.LINE_WIDTH,
                    n.STYLE_KEYS.LINE_PATTERN,
                    n.STYLE_KEYS.OPACITY,
                ];
            }
        }
        const p = {
            topic: s,
            boundary: c,
            relationship: f,
            summary: new h(),
            sheet: i(71).a,
            mindmap: new r.a(),
        };
        function T(e) {
            switch (e.type) {
                case n.VIEW_TYPE.BRANCH:
                    return p.topic;
                case n.VIEW_TYPE.BOUNDARY:
                    return p.boundary;
                case n.VIEW_TYPE.RELATIONSHIP:
                    return p.relationship;
                case n.VIEW_TYPE.SHEET:
                    return p.sheet;
                case n.VIEW_TYPE.SUMMARY:
                    return p.summary;
            }
            return p.mindmap;
        }
    },
];
