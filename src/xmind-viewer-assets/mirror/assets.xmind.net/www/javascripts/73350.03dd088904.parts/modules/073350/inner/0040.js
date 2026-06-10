export default [
    function (e, t, i) {
        'use strict';
        (function (e) {
            var n = i(3),
                r = i(0),
                o = i(86),
                a = i(69),
                s = i(91),
                l = i(5),
                c = i(18),
                d = function (e, t, i, n) {
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
            const f = {
                    [r.BOUNDARYSHAPE.ROUNDEDPOLYGON]: !0,
                    [r.BOUNDARYSHAPE.POLYGON]: !0,
                    [r.BOUNDARYSHAPE.NEWBOUNDARY1]: !0,
                },
                h = [...r.TREE_TABLE_GROUP_LIST];
            let p = class extends a.a {
                constructor(e, t) {
                    (super({ model: e }),
                        (this.position = { x: 0, y: 0 }),
                        (this.realPosition = { x: 0, y: 0 }),
                        (this.size = { width: 0, height: 0 }),
                        (this.linePattern = null),
                        (this.isSelected = !1),
                        (this.isVisible = !1),
                        (this.isForcedInvisible = !1),
                        (this.model = e),
                        (this.context = t),
                        (this.figure = c.a.createFigure(this)),
                        (this.titleView = new o.a()),
                        (this.selectBox = new s.a({
                            refView: this,
                        })),
                        this.initSVGStructure(),
                        this.initEventsListener());
                }
                get type() {
                    return r.VIEW_TYPE.BOUNDARY;
                }
                get figureType() {
                    return r.FIGURE_TYPE.BOUNDARY;
                }
                get _style() {
                    return {
                        boundaryActionPath: {
                            fill: 'none',
                            stroke: '#1E80E7',
                            'stroke-opacity': '0',
                        },
                        boundaryActionPath__mouseover: {
                            'stroke-opacity': '0.5',
                        },
                    };
                }
                afterAncestorChange() {
                    (super.afterAncestorChange(), this.updateModel2View());
                }
                initSVGStructure() {
                    const e = this.figure.renderWorker;
                    ((this.boundaryGroup = e.svg),
                        (this.boundaryPath = e.boundaryPath),
                        (this.boundaryFillPath = e.boundaryFillPath),
                        (this.boundaryActionPath = e.boundaryActionPath));
                }
                initEventsListener() {
                    ('readonly' !== e.env.SB_MODE &&
                        (this.listenTo(
                            this.model,
                            'change:range',
                            this.onRangeChange
                        ),
                        this.listenTo(this.model, 'change:title', () => {
                            this.titleView.setText(this.model.get('title'));
                        })),
                        this.on('afterAncestorChange', () => {
                            this.editDomain() &&
                                (this.titleView && this.titleView.parent(this),
                                this.initEventsListenerWithContext());
                        }));
                }
                getTitledStyleView() {
                    return this;
                }
                initStyle() {}
                refreshStyles() {}
                parent(e) {
                    return void 0 === e ? super.parent() : super.parent(e);
                }
                onRangeChange() {
                    var e;
                    (this._resetBoundaryPosition(),
                        null === (e = this.parent()) ||
                            void 0 === e ||
                            e
                                .getChildrenBranchesByType()
                                .forEach((e) => e.updateStructure()),
                        this.figure.invalidateLayout());
                }
                _resetBoundaryPosition() {
                    const e = this.parent();
                    if (!e) return;
                    const t = this.model;
                    let i = null,
                        n = -1,
                        r = null,
                        o = -1;
                    for (const [r, o] of e.boundaries.entries())
                        if (o.model.get('id') === t.get('id')) {
                            ((i = o), (n = r));
                            break;
                        }
                    if (i) {
                        const { rangeStart: a, rangeEnd: s } = t;
                        for (const [i, n] of e.boundaries.entries())
                            if (n.model.get('id') !== t.get('id')) {
                                const { rangeStart: e, rangeEnd: t } = n.model;
                                (a < e || (a === e && s >= t)) &&
                                    ((r = n), (o = i));
                            }
                        r &&
                            (r.boundaryGroup.before(i.boundaryGroup),
                            e.boundaries.splice(o, 0, i),
                            n > o
                                ? e.boundaries.splice(n + 1, 1)
                                : e.boundaries.splice(n, 1));
                    }
                }
                select() {
                    if (
                        !this.getContext().isReadOnly() ||
                        this.config(r.CONFIG.ENABLE_SELECT_IN_READONLY)
                    )
                        return (
                            this.killAnimationByFlag(
                                r.ANIMATION_FLAGS
                                    .BOUNDARY_SHOW_HIGH_LIGHT_SELECT_BOX
                            ),
                            (this.isSelected = !0),
                            this.selectBox.show().transparent(!1),
                            this.selectBox.stateMachine.transition(
                                this.selectBox.event_select
                            ),
                            this.getModule(
                                r.MODULE_NAME.SEMAPHORE
                            ).isStatusActive(r.UI_STATUS.DE_FOCUS) &&
                                this.selectBox.stateMachine.transition(
                                    this.selectBox.event_defocus
                                ),
                            this
                        );
                }
                deselect() {
                    return (
                        this.killAnimationByFlag(
                            r.ANIMATION_FLAGS
                                .BOUNDARY_SHOW_HIGH_LIGHT_SELECT_BOX
                        ),
                        (this.isSelected = !1),
                        this.selectBox.hide(),
                        this.selectBox.stateMachine.transition(
                            this.selectBox.event_deselect
                        ),
                        this
                    );
                }
                displaySelect() {
                    this.select();
                }
                displayDeFocus() {
                    (this.killAnimationByFlag(
                        r.ANIMATION_FLAGS.BOUNDARY_SHOW_HIGH_LIGHT_SELECT_BOX
                    ),
                        (this.isSelected = !0),
                        this.selectBox.show().transparent(!1),
                        this.selectBox.stateMachine.transition(
                            this.selectBox.event_defocus
                        ));
                }
                remove() {
                    var e, t;
                    const i =
                        null !==
                            (t =
                                null === (e = this.parent()) || void 0 === e
                                    ? void 0
                                    : e.boundaries) && void 0 !== t
                            ? t
                            : [];
                    i.forEach((e, t) => {
                        e === this && i.splice(t, 1);
                    });
                    const n = this.editDomain();
                    return (
                        (null == n ? void 0 : n.selectionManager) &&
                            n.selectionManager.removeFromSelection(this),
                        (null == n ? void 0 : n.model2View) &&
                            delete n.model2View[this.model.id],
                        this.figure.dispose(),
                        this.selectBox.remove(),
                        this.titleView.remove(),
                        this.stopListening(),
                        this.clearReactions(),
                        this.parent(null),
                        this
                    );
                }
                getRealPosition() {
                    return this.realPosition;
                }
                updateRealPosition() {
                    const e = this.parent();
                    if (e) {
                        const t = e.getRealPosition();
                        ((this.realPosition = {
                            x: this.position.x + t.x,
                            y: this.position.y + t.y,
                        }),
                            this.figure.setPosition(this.realPosition),
                            this.figure.positionDirty &&
                                this.trigger('afterRealPosChange'));
                    }
                }
                getClientRect() {
                    const e = this.getRealPosition(),
                        t = this.editDomain()
                            .getCoordinateTransfer()
                            .mindMapToViewport(e);
                    return Object.assign(
                        Object.assign({}, t),
                        this.figure.size
                    );
                }
                getTitleSize() {
                    return this.titleView.bounds;
                }
                setPosition(e) {
                    this.position = Object.assign({}, e);
                }
                setSize(e) {
                    var t;
                    Object(l.o)(this.figure.size, e) ||
                        ((this.size = Object.assign({}, e)),
                        this.figure.setSize(e),
                        this.trigger('afterSizeChange'),
                        null === (t = this.parent()) ||
                            void 0 === t ||
                            t.figure.invalidateLayout());
                }
                setShapeSize(e) {
                    this.figure.setBoundaryShapeSize(e);
                }
                getEditContent() {
                    return this.model.get('title') || '';
                }
                saveEdit(e) {
                    this.model.changeTitle(e);
                }
                getTextClientStyle() {
                    return {
                        fontSize:
                            parseFloat(this.titleView.figure.fontSize) || 12,
                        fontFamily: this.titleView.figure.fontFamily,
                        fontWeight: this.titleView.figure.fontWeight,
                        textDecoration: this.titleView.figure.textDecoration,
                        fontStyle: this.titleView.figure.fontStyle,
                    };
                }
                getTextClientBounds() {
                    return this.boundaryGroup.node.getBoundingClientRect();
                }
                hideTitle() {
                    this.titleView.hide();
                }
                showTitle() {
                    this.titleView.show();
                }
                shouldPreventTitle() {
                    return (
                        f[this.figure.shapeClass] ||
                        h.some((e) => {
                            var t;
                            return (
                                e ===
                                (null === (t = this.parent()) || void 0 === t
                                    ? void 0
                                    : t.getStructureClass())
                            );
                        })
                    );
                }
                shouldHide() {
                    var e, t;
                    return (
                        null !==
                            (t =
                                null === (e = this.parent()) || void 0 === e
                                    ? void 0
                                    : e.isBoundariesHide()) &&
                        void 0 !== t &&
                        t
                    );
                }
                setVisible(e) {
                    ((this.isVisible = e),
                        this.figure.setVisible(e && !this.isForcedInvisible));
                }
                displayHighLightSelect() {
                    this.killAnimationByFlag(
                        r.ANIMATION_FLAGS.BOUNDARY_SHOW_HIGH_LIGHT_SELECT_BOX
                    );
                    const e = this.getModule(r.MODULE_NAME.ANIMATION);
                    e &&
                        e.startAnimation(
                            r.ANIMATION_FLAGS
                                .BOUNDARY_SHOW_HIGH_LIGHT_SELECT_BOX,
                            { target: this }
                        );
                }
            };
            ((p = d(
                [
                    (t) =>
                        class extends t {
                            initEventsListener() {
                                (super.initEventsListener(),
                                    'readonly' !== e.env.SB_MODE &&
                                        (this.listenTo(
                                            this.model,
                                            'changeStyle',
                                            this.onChangeStyle
                                        ),
                                        this.listenTo(
                                            this.model,
                                            'setStyleObject',
                                            () => {
                                                var e;
                                                return null ===
                                                    (e = this.parent()) ||
                                                    void 0 === e
                                                    ? void 0
                                                    : e.refreshStyles();
                                            }
                                        ),
                                        this.addReaction(
                                            () => this.figure.lineColor,
                                            () => this.refreshTextColor()
                                        )));
                            }
                            initStyle() {
                                (this.refreshColorStyles(),
                                    this.refreshSkeletonStyles());
                            }
                            refreshStyles() {
                                (this.refreshColorStyles(),
                                    this.refreshSkeletonStyles());
                            }
                            refreshColorStyles() {
                                (super.refreshColorStyles(),
                                    this.refreshFillColor(),
                                    this.refreshLineColor(),
                                    this.refreshFillOpacity());
                            }
                            refreshSkeletonStyles() {
                                (super.refreshSkeletonStyles(),
                                    this.refreshShapeClass(),
                                    this.refreshLinePattern(),
                                    this.refreshBorderWidth(),
                                    this.refreshFillPattern());
                            }
                            onChangeStyle(e) {
                                (super.onChangeStyle(e),
                                    e === r.STYLE_KEYS.SHAPE_CLASS
                                        ? this.refreshShapeClass()
                                        : e === r.STYLE_KEYS.FILL_COLOR
                                          ? this.refreshFillColor()
                                          : e === r.STYLE_KEYS.LINE_PATTERN
                                            ? this.refreshLinePattern()
                                            : e === r.STYLE_KEYS.LINE_COLOR
                                              ? this.refreshLineColor()
                                              : e === r.STYLE_KEYS.LINE_WIDTH
                                                ? this.refreshBorderWidth()
                                                : e === r.STYLE_KEYS.OPACITY
                                                  ? this.refreshFillOpacity()
                                                  : e ===
                                                        r.STYLE_KEYS
                                                            .FILL_PATTERN &&
                                                    this.refreshFillPattern());
                            }
                            refreshShapeClass() {
                                const e = n.a.getStyleValue(
                                    this,
                                    r.STYLE_KEYS.SHAPE_CLASS
                                );
                                this.figure.setShapeClass(e);
                                const t = !this.shouldPreventTitle();
                                (this.titleView.figure.setVisible(t, !0),
                                    t && this.titleView.text
                                        ? this.titleView.show()
                                        : this.titleView.hide());
                            }
                            refreshFillColor() {
                                this.figure.setFillColor(
                                    n.a.getStyleValue(
                                        this,
                                        r.STYLE_KEYS.FILL_COLOR
                                    )
                                );
                            }
                            refreshLinePattern() {
                                const e = n.a.getStyleValue(
                                    this,
                                    r.STYLE_KEYS.LINE_PATTERN
                                );
                                ((this.linePattern = e),
                                    this.figure.setLinePattern(e));
                            }
                            refreshLineColor() {
                                const e = n.a.getStyleValue(
                                    this,
                                    r.STYLE_KEYS.LINE_COLOR
                                );
                                this.figure.setLineColor(e);
                                this.titleView.figure.setBoundaryTitleBGFillColor(
                                    e
                                );
                            }
                            refreshBorderWidth() {
                                const e = parseInt(
                                    `${n.a.getStyleValue(this, r.STYLE_KEYS.LINE_WIDTH) || 0}`
                                );
                                this.figure.setBorderWidth(e);
                            }
                            refreshFillOpacity() {
                                const e = Number(
                                    `${n.a.getStyleValue(this, r.STYLE_KEYS.OPACITY)}`
                                );
                                this.figure.setFillOpacity(e);
                            }
                            refreshFillPattern() {
                                const e = n.a.getStyleValue(
                                    this,
                                    r.STYLE_KEYS.FILL_PATTERN
                                );
                                this.figure.setFillPattern(e);
                            }
                        },
                ],
                p
            )),
                (t.a = p));
        }).call(this, i(45));
    },
];
