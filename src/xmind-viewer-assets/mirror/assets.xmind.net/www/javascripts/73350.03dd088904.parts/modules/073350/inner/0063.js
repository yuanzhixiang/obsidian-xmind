export default [
    function (e, t, i) {
        'use strict';
        (function (e) {
            var n = i(3),
                r = i(18),
                o = i(0),
                a = i(43),
                s = i(17),
                l = i(44),
                c = i(120),
                d = i(6),
                f = i.n(d),
                h = i(15),
                p = i(27),
                T = i(1),
                u = function (e, t, i, n) {
                    var r,
                        o = arguments.length,
                        a =
                            o < 3
                                ? t
                                : null === n
                                  ? (n = Object.getOwnPropertyDescriptor(t, i))
                                  : n;
                    if (
                        'object' == typeof Reflect &&
                        'function' == typeof Reflect.decorate
                    )
                        a = Reflect.decorate(e, t, i, n);
                    else
                        for (var s = e.length - 1; s >= 0; s--)
                            (r = e[s]) &&
                                (a =
                                    (o < 3
                                        ? r(a)
                                        : o > 3
                                          ? r(t, i, a)
                                          : r(t, i)) || a);
                    return (o > 3 && a && Object.defineProperty(t, i, a), a);
                };
            let g = class extends a.a {
                constructor(e) {
                    (super({ model: e }),
                        (this.relationships = []),
                        (this.bounds = {
                            x: 0,
                            y: 0,
                            width: 0,
                            height: 0,
                        }),
                        (this.legendView = null),
                        (this.centralBranchView = null),
                        (this.activatedTopBranchView = null),
                        (this.model = e),
                        (this.figure = r.a.createFigure(this)),
                        (this.svg = this.figure.getContent()));
                    const t = this.figure.renderWorker;
                    ((this.matrixContainer = t.matrixContainer),
                        (this.boundaryContainer = t.boundaryContainer),
                        (this.connectionContainer = t.connectionContainer),
                        (this.branchContainer = t.branchContainer),
                        (this.relationshipContainer = t.relationshipContainer),
                        (this.selectBoxContainer = t.selectBoxContainer),
                        (this.treeTableContainer = t.treeTableCellContainer),
                        (this.otherContainer = t.otherContainer),
                        (this._cloneG = t._cloneG),
                        this.initEventsListener(),
                        (this.bounds = {
                            x: 0,
                            y: 0,
                            width: 0,
                            height: 0,
                        }),
                        (this.centralBranchView = null),
                        (this.activatedTopBranchView = null));
                }
                get type() {
                    return o.VIEW_TYPE.SHEET;
                }
                get figureType() {
                    return o.FIGURE_TYPE.SHEET;
                }
                initStyle() {}
                initEventsListener() {
                    const t = this.model;
                    'readonly' !== e.env.SB_MODE &&
                        (this.listenTo(
                            t,
                            'addRelationship',
                            this._onAddRelationship
                        ),
                        this.listenTo(
                            t,
                            'removeRelationship',
                            this._onRemoveRelationship
                        ),
                        this.listenTo(
                            t,
                            'change:topicPositioning',
                            this._layoutCentralBranch
                        ),
                        this.listenTo(
                            t,
                            'change:topicOverlapping',
                            this._layoutCentralBranch
                        ));
                }
                initView() {
                    var e, t;
                    this.initStyle();
                    const i = this.model,
                        n = new s.a(i.rootTopic());
                    (this.setCurrentCentralBranchView(n),
                        this.listenTo(
                            this.centralBranchView,
                            'change:bounds',
                            () => {
                                this._updateBounds();
                            }
                        ),
                        null === (e = this.centralBranchView) ||
                            void 0 === e ||
                            e.parent(this),
                        null === (t = this.centralBranchView) ||
                            void 0 === t ||
                            t.initView(),
                        this.model
                            .relationships()
                            .forEach((e) =>
                                this.addRelationship(new l.a(e, !1))
                            ));
                    const r = this.model.getLegendModel();
                    if ('visible' === r.get('visibility')) {
                        const e = r.get('position');
                        h.j(e)
                            ? this.initLegend()
                            : setTimeout(() => this.initLegend(), 0);
                    }
                    return this;
                }
                getCentralBranchView() {
                    return this.centralBranchView;
                }
                getActivatedTopBranchView() {
                    return this.activatedTopBranchView;
                }
                setCurrentCentralBranchView(e) {
                    ((this.centralBranchView = e),
                        this.centralBranchView.tagCentralBranch(!0));
                }
                setActivatedTopBranchView(e) {
                    this.activatedTopBranchView !== e &&
                        (this.activatedTopBranchView &&
                            this.stopListening(
                                this.activatedTopBranchView,
                                'change:bounds',
                                this._updateBounds
                            ),
                        (this.activatedTopBranchView = e),
                        this.activatedTopBranchView &&
                            this.listenTo(
                                this.activatedTopBranchView,
                                'change:bounds',
                                this._updateBounds
                            ),
                        this._updateBounds());
                }
                remove() {
                    (this.relationships.forEach((e) => {
                        e.remove();
                    }),
                        this.legendView && this.legendView.remove());
                    const e = this.editDomain();
                    if (e && e.model2View) {
                        const t = this.model;
                        delete e.model2View[t.id];
                    }
                    return (
                        this.centralBranchView &&
                            (this.centralBranchView.remove(),
                            (this.centralBranchView = null)),
                        this.stopListening(),
                        this.figure.dispose(),
                        this
                    );
                }
                addRelationship(t) {
                    (t.parent(this),
                        t.initStyle(),
                        t.end1View && t.end2View
                            ? this.relationships.push(t)
                            : t.remove(),
                        'readonly' !== e.env.SB_MODE &&
                            this.listenTo(t, 'change:bounds', () => {
                                this._updateBounds();
                            }));
                }
                removeRelationship(e) {
                    (e.remove(), this.stopListening(e), this._updateBounds());
                }
                isLineTapered() {
                    return 'tapered' === this.figure.lineTapered;
                }
                isMultiLineColors() {
                    const e = this.figure.multiLineColors;
                    return e && 'none' !== e;
                }
                isGradient() {
                    return 'gradient' === this.figure.gradientColor;
                }
                getCloneG() {
                    return this._cloneG;
                }
                getDragViewContainer() {
                    return this._cloneG;
                }
                clearDragViewContainer() {
                    this._cloneG.translate(0, 0).clear();
                }
                getBlendingBackgroundColor() {
                    var e, t;
                    const { snowballUtil: i } = Object(T.getInjectModule)(
                            o.MODULE_NAME.SNOWBALL
                        ),
                        n = this.figure.backgroundColor,
                        r = i.hexStringToRgbObject(n),
                        a =
                            null ===
                                (t =
                                    null ===
                                        (e = this.config(
                                            o.CONFIG.APPEARANCE_GETTER
                                        )) || void 0 === e
                                        ? void 0
                                        : e()) || void 0 === t
                                ? void 0
                                : t.backgroundColor;
                    if (r.a < 1 && a) {
                        const e = i.hexStringToRgbObject(a);
                        return i.blendingColor(r, e);
                    }
                    return i.rgbObjectToHexString(r);
                }
                initLegend() {
                    this.legendView ||
                        ((this.legendView = new c.a(
                            this,
                            this.model.getLegendModel()
                        )),
                        this._updateBounds(),
                        'readonly' !== e.env.SB_MODE &&
                            this.listenTo(
                                this.legendView,
                                'change:bounds',
                                () => {
                                    this._updateBounds();
                                }
                            ));
                }
                _updateBounds() {
                    const e = this.activatedTopBranchView
                            ? this.activatedTopBranchView
                            : this.centralBranchView,
                        t = p.d(
                            [e, ...this.relationships, this.legendView]
                                .filter((e) =>
                                    e && e.figure ? e.figure.isVisible : e
                                )
                                .map((t) => {
                                    if (t.type === o.VIEW_TYPE.BRANCH) {
                                        const i = t.getRealPosition();
                                        if (e)
                                            return {
                                                x: i.x + e.bounds.x,
                                                y: i.y + e.bounds.y,
                                                width: t.bounds.width,
                                                height: t.bounds.height,
                                            };
                                    }
                                    return t.bounds;
                                })
                        );
                    f.a.isEqual(t, this.bounds) ||
                        ((this.bounds = t), this.trigger('change:bounds', t));
                }
                _onAddRelationship(e) {
                    this.addRelationship(new l.a(e, !1));
                }
                _onRemoveRelationship(e) {
                    const t = f.a.find(
                        this.relationships,
                        (t) => t.model === e
                    );
                    t && this.removeRelationship(t);
                }
                _opChildBranches(e, t, i) {
                    e.getChildrenBranchesByType(t).forEach((e) => {
                        (i(e), this._opChildBranches(e, t, i));
                    });
                }
                _layoutCentralBranch() {
                    var e;
                    null === (e = this.centralBranchView) ||
                        void 0 === e ||
                        e.layout();
                }
            };
            ((g = u(
                [
                    (t) =>
                        class extends t {
                            initEventsListener() {
                                if (
                                    (super.initEventsListener(),
                                    'readonly' === e.env.SB_MODE)
                                )
                                    return;
                                const t = this.model;
                                (this.listenTo(
                                    t,
                                    'changeStyle',
                                    this.onChangeStyle
                                ),
                                    this.listenTo(
                                        t,
                                        'changeTheme',
                                        ({
                                            newColorTheme: e,
                                            newSkeletonTheme: t,
                                            newGlobalStyle: i,
                                        }) => {
                                            e
                                                ? this.refreshColorStyles()
                                                : t
                                                  ? this.refreshSkeletonStyles()
                                                  : i
                                                    ? this.refreshGlobalStyles()
                                                    : this.refreshStyles();
                                        }
                                    ),
                                    this.listenTo(
                                        t,
                                        'addTheme',
                                        this.refreshStyles
                                    ),
                                    this.listenTo(
                                        t,
                                        'setStyleObject',
                                        this.refreshStyles
                                    ));
                            }
                            onChangeStyle(e) {
                                e === o.STYLE_KEYS.MULTI_LINE_COLORS
                                    ? this.refreshMultiBranchLineColor()
                                    : e === o.STYLE_KEYS.LINE_TAPERED
                                      ? this.refreshLineTapered()
                                      : e === o.STYLE_KEYS.GRADIENT_COLOR
                                        ? this.refreshGradientColor()
                                        : e === o.STYLE_KEYS.FILL_COLOR
                                          ? this.refreshBackgroundColor()
                                          : e === o.STYLE_KEYS.OPACITY
                                            ? this.refreshOpacity()
                                            : e === o.STYLE_KEYS.CJK_FONT_FAMILY
                                              ? this.refreshCJKFontFamily()
                                              : e === o.STYLE_KEYS.LINE_WIDTH
                                                ? this.refreshGlobalLineWidth()
                                                : e ===
                                                      o.STYLE_KEYS
                                                          .FONT_FAMILY &&
                                                  this.refreshGlobalFontFamily();
                            }
                            initStyle() {
                                (super.initStyle(),
                                    this.refreshColorStyles(),
                                    this.refreshSkeletonStyles());
                            }
                            refreshStyles() {
                                (this.refreshColorStyles(),
                                    this.refreshSkeletonStyles());
                            }
                            refreshColorStyles() {
                                var e;
                                (super.refreshSkeletonStyles(),
                                    this.refreshBackgroundColor(),
                                    this.refreshGradientColor(),
                                    this.refreshMultiBranchLineColor(),
                                    this.refreshOpacity(),
                                    null === (e = this.centralBranchView) ||
                                        void 0 === e ||
                                        e.refreshColorStyles(),
                                    this.relationships.forEach((e) => {
                                        e.refreshColorStyles();
                                    }));
                            }
                            refreshSkeletonStyles() {
                                var e;
                                (this.refreshLineTapered(),
                                    this.refreshWallPaper(),
                                    this.refreshGlobalFontFamily(),
                                    this.refreshGlobalLineWidth(),
                                    null === (e = this.centralBranchView) ||
                                        void 0 === e ||
                                        e.refreshSkeletonStyles(),
                                    this.relationships.forEach((e) => {
                                        e.refreshSkeletonStyles();
                                    }));
                            }
                            refreshGlobalStyles() {
                                (this.refreshGlobalFontFamily(),
                                    this.refreshGlobalLineWidth(),
                                    this.refreshLineTapered());
                            }
                            refreshBackgroundColor() {
                                this.figure.setBackgroundColor(
                                    n.a.getStyleValue(
                                        this,
                                        o.STYLE_KEYS.FILL_COLOR
                                    )
                                );
                            }
                            refreshGradientColor() {
                                this.figure.setGradientColor(
                                    n.a.getStyleValue(
                                        this,
                                        o.STYLE_KEYS.GRADIENT_COLOR
                                    )
                                );
                            }
                            refreshMultiBranchLineColor() {
                                this.figure.setMultiLineColors(
                                    n.a.getStyleValue(
                                        this,
                                        o.STYLE_KEYS.MULTI_LINE_COLORS
                                    ) || ''
                                );
                            }
                            refreshLineTapered() {
                                this.figure.setLineTapered(
                                    n.a.getStyleValue(
                                        this,
                                        o.STYLE_KEYS.LINE_TAPERED
                                    )
                                );
                            }
                            refreshOpacity() {
                                this.figure.setOpacity(
                                    parseFloat(
                                        n.a.getStyleValue(
                                            this,
                                            o.STYLE_KEYS.OPACITY
                                        )
                                    ) || 1
                                );
                            }
                            refreshGlobalLineWidth() {
                                let e = n.a.getGlobalStyleValue(
                                    this,
                                    o.STYLE_KEYS.LINE_WIDTH
                                );
                                null === e
                                    ? this.figure.setGlobalLineWidth(e)
                                    : this.figure.setGlobalLineWidth(
                                          parseInt(e)
                                      );
                            }
                            refreshGlobalFontFamily() {
                                this.figure.setGlobalFontFamily(
                                    n.a.getGlobalStyleValue(
                                        this,
                                        o.STYLE_KEYS.FONT_FAMILY
                                    )
                                );
                            }
                            refreshWallPaper() {}
                            refreshCJKFontFamily() {
                                this.figure.setCJKFontFamily(
                                    n.a.getStyleValue(
                                        this,
                                        o.STYLE_KEYS.CJK_FONT_FAMILY
                                    )
                                );
                            }
                        },
                ],
                g
            )),
                (t.a = g));
        }).call(this, i(45));
    },
];
