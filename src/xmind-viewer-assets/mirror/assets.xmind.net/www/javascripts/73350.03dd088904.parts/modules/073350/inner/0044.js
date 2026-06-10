export default [
    function (e, t, i) {
        'use strict';
        (function (e) {
            var n = i(3),
                r = i(0),
                o = i(118),
                a = i(18),
                s = i(1),
                l = i(14),
                c = i(9),
                d = i(15),
                f = i(119),
                h = i(39),
                p = i(69),
                T = function (e, t, i, n) {
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
            let u = class extends p.a {
                constructor(e, t) {
                    (super({ model: e }),
                        (this.relativeDistance1 = { x: 0, y: 0 }),
                        (this.relativeDistance2 = { x: 0, y: 0 }),
                        (this.bounds = {
                            x: 0,
                            y: 0,
                            width: 0,
                            height: 0,
                        }),
                        (this.position = { x: 0, y: 0 }),
                        (this.hideCount = 0),
                        (this.isVisible = !0),
                        (this.isSelected = !1),
                        (this.isDeFocus = !1),
                        (this.hadBindDraggable = !1),
                        (this.hadInit = !1),
                        (this.posInfo = null),
                        (this.isHovering = !1),
                        (this.isForcedInvisible = !1),
                        (this.end1View = null),
                        (this.end2View = null),
                        (this.isHoveringStartPoint1 = !1),
                        (this.isHoveringStartPoint2 = !1),
                        (this.isHoveringControlPoint1 = !1),
                        (this.isHoveringControlPoint2 = !1),
                        (this.isDraggingStartPoint1 = !1),
                        (this.isDraggingStartPoint2 = !1),
                        (this.isDraggingControlPoint1 = !1),
                        (this.isDraggingControlPoint2 = !1),
                        (this.virtual = t),
                        (this.model = e),
                        (this.figure = a.a.createFigure(this)));
                    const i = this.figure.renderWorker;
                    ((this.startPoint1Package = i.startPoint1Package),
                        (this.controlPoint1Package = i.controlPoint1Package),
                        (this.startPoint2Package = i.startPoint2Package),
                        (this.controlPoint2Package = i.controlPoint2Package),
                        (this.arrowSelector = new s.ArrowSelector(
                            this,
                            this.figure.renderWorker.path
                        )),
                        (this.end1View = null),
                        (this.end2View = null),
                        (this.titleView = new o.a()),
                        (this.titleText = this.titleView.getTextSvg()),
                        this.initEventsListener());
                }
                get type() {
                    return r.VIEW_TYPE.RELATIONSHIP;
                }
                get figureType() {
                    return r.FIGURE_TYPE.RELATIONSHIP;
                }
                get _style() {
                    return {
                        relationship: { fill: 'none' },
                        controlPoint: {
                            fill: '#FFFFFF',
                            stroke: '#2ebdff',
                        },
                        actionPath: {
                            stroke: '#2ebdff',
                            fill: 'none',
                            'stroke-opacity': '0',
                        },
                        actionPath__hover: {
                            'stroke-opacity': '0.5',
                        },
                        actionPath__selected: {
                            'stroke-opacity': '0.75',
                        },
                        actionPath__defocus: {
                            'stroke-opacity': '0.75',
                            stroke: '#9f9f9f',
                        },
                        holder: { stroke: '#2ebdff' },
                        holder__hover: { 'stroke-opacity': '1' },
                        holder__selected: { 'stroke-opacity': '1' },
                        relationshipShadowAction: {
                            'stroke-opacity': '0',
                            stroke: 'none',
                            fill: 'none',
                        },
                    };
                }
                afterAncestorChange() {
                    (super.afterAncestorChange(), this.updateModel2View());
                }
                initEventsListener() {
                    (this.on('afterAncestorChange', () => {
                        (this.titleView.parent(this),
                            this.editDomain() &&
                                !0 !== this.virtual &&
                                (this.hadBindDraggable ||
                                    ((this.hadBindDraggable = !0),
                                    new f.a().init(this)),
                                this._updateState(),
                                this.updateBranchViews(),
                                this.initEventsListenerWithContext()));
                    }),
                        'readonly' !== e.env.SB_MODE &&
                            (this.listenTo(
                                this.model,
                                'change:title',
                                this.onChangeTitle
                            ),
                            this.listenTo(
                                this.model,
                                'change:end1Id change:end2Id',
                                this.updateBranchViews
                            ),
                            this.listenTo(
                                this.model,
                                'change:endPoint',
                                this.onChangeEndPoint
                            )),
                        this.listenTo(this.model, 'refresh', this.render));
                }
                initStyle() {}
                refreshStyles() {}
                parent(e) {
                    return void 0 === e ? super.parent() : super.parent(e);
                }
                getTitledStyleView() {
                    return this;
                }
                onChangeTitle() {
                    (this.titleView.setText(this.model.get('title')),
                        this._showOrHideTitle());
                }
                render() {
                    return (this.figure.invalidateLayout(), this);
                }
                getBranchOffset(e, t) {
                    let i = r.STYLE_KEYS.LINE_WIDTH;
                    (null == t ? void 0 : t.type) === r.VIEW_TYPE.BRANCH &&
                        (i = r.STYLE_KEYS.BORDER_LINE_WIDTH);
                    const o =
                            'start' === e
                                ? n.a.getStyleValue(
                                      this,
                                      r.STYLE_KEYS.ARROW_BEGIN_CLASS
                                  )
                                : n.a.getStyleValue(
                                      this,
                                      r.STYLE_KEYS.ARROW_END_CLASS
                                  ),
                        a = s.ArrowSelector.getTip(o),
                        l = parseInt(n.a.getStyleValue(t, i));
                    return (
                        parseInt(
                            n.a.getStyleValue(this, r.STYLE_KEYS.LINE_WIDTH)
                        ) *
                            a +
                        l / 2 +
                        c.a.RELATIONSHIP_TO_TOPIC_PADDING
                    );
                }
                intersectPointWithTopic(e, t, i) {
                    let n = 'start' === e ? this.end1View : this.end2View;
                    const r = this.intersectOriginPointWithTopic(e, t);
                    let o = d.e(null == n ? void 0 : n.getRealPosition(), r);
                    return 0 === o.x && 0 === o.y
                        ? r
                        : this.applyIntersectOriginPointOffset(e, r, i);
                }
                intersectOriginPointWithTopic(e, t) {
                    let i = 'start' === e ? this.end1View : this.end2View;
                    return l.a.topicInsectLine(i, t);
                }
                applyIntersectOriginPointOffset(e, t, i) {
                    let n = 'start' === e ? this.end1View : this.end2View;
                    const r = this.getBranchOffset(e, n);
                    return l.a.getRelationshipOffsetPoint(n, t, i, r);
                }
                renderTitleText(e) {
                    const {
                            insectPoint1: t,
                            insectPoint2: i,
                            controlPoint1: n,
                            controlPoint2: r,
                        } = e,
                        o = Object(h.a)(this.figure.lineStyle).calcPathD(
                            t,
                            i,
                            n,
                            r
                        ),
                        a = Object(s.getPointAtLength)(
                            o,
                            Object(s.getTotalLength)(o) / 2
                        ),
                        l = {
                            x: a.x - this.titleView.bounds.width / 2,
                            y: a.y - this.titleView.bounds.height / 2,
                        };
                    (this.titleView.move(l.x, l.y), this._renderGlobalMask(l));
                }
                _renderGlobalMask(e) {
                    const t = (e) =>
                            `M ${e.x} ${e.y}\n        L${e.x + e.width} ${e.y}\n        L${e.x + e.width} ${e.y + e.height}\n        L${e.x} ${e.y + e.height}`,
                        i = this.bounds,
                        n = {
                            width: i.width + 400,
                            height: i.height + 400,
                            x: i.x - 200,
                            y: i.y - 200,
                        },
                        r = Object.assign({}, this.titleView.bounds, e),
                        o = t(n),
                        a = t(r);
                    this.figure.setRelationshipMaskD(`${o} ${a}`);
                }
                updateBranchViews() {
                    const e = this.editDomain(),
                        t = this.model;
                    let i = null,
                        n = null;
                    (e &&
                        (e.model2View[t.get('end1Id')] &&
                            (i = e.model2View[t.get('end1Id')]),
                        e.model2View[t.get('end2Id')] &&
                            (n = e.model2View[t.get('end2Id')])),
                        i !== this.end1View &&
                            (this.end1View &&
                                (this.stopListening(
                                    this.end1View,
                                    'afterRealPosChange'
                                ),
                                this.stopListening(
                                    this.end1View,
                                    'afterSizeChange'
                                ),
                                this.stopListening(
                                    this.end1View.topicView,
                                    'change:bounds'
                                )),
                            i &&
                                (this.listenTo(
                                    i,
                                    'afterRealPosChange',
                                    this.onEndViewDimensionChange
                                ),
                                this.listenTo(
                                    i,
                                    'afterSizeChange',
                                    this.onEndViewDimensionChange
                                ),
                                this.listenTo(
                                    i.topicView,
                                    'change:bounds',
                                    this.onEndViewDimensionChange
                                )),
                            (this.end1View = i)),
                        n !== this.end2View &&
                            (this.end2View &&
                                (this.stopListening(
                                    this.end2View,
                                    'afterRealPosChange'
                                ),
                                this.stopListening(
                                    this.end2View,
                                    'afterSizeChange'
                                ),
                                this.stopListening(
                                    this.end2View.topicView,
                                    'change:bounds'
                                )),
                            n &&
                                (this.listenTo(
                                    n,
                                    'afterRealPosChange',
                                    this.onEndViewDimensionChange
                                ),
                                this.listenTo(
                                    n,
                                    'afterSizeChange',
                                    this.onEndViewDimensionChange
                                ),
                                this.listenTo(
                                    n.topicView,
                                    'change:bounds',
                                    this.onEndViewDimensionChange
                                )),
                            (this.end2View = n)),
                        (this.end1View && this.end2View) ||
                            this.setVisible(!1));
                }
                onEndViewDimensionChange() {
                    this.hadInit && this.render();
                }
                select() {
                    var e;
                    if (
                        !this.getContext().isReadOnly() ||
                        this.config(r.CONFIG.ENABLE_SELECT_IN_READONLY)
                    )
                        return (
                            (this.isSelected = !0),
                            (this.isDeFocus =
                                null ===
                                    (e = this.getModule(
                                        r.MODULE_NAME.SEMAPHORE
                                    )) || void 0 === e
                                    ? void 0
                                    : e.isStatusActive(r.UI_STATUS.DE_FOCUS)),
                            this._updateState(),
                            this.figure.setControlPointGroupVisible(
                                !this.isDeFocus
                            ),
                            this
                        );
                }
                deselect() {
                    return (
                        (this.isSelected = !1),
                        (this.isDeFocus = !1),
                        this._updateState(),
                        this
                    );
                }
                displayDeFocus() {
                    ((this.isSelected = !0),
                        (this.isDeFocus = !0),
                        this._updateState(),
                        this.figure.setControlPointGroupVisible(!1));
                }
                displaySelect() {
                    this.select();
                }
                setRelationshipPath(e) {
                    this.figure.setRelationshipPath(e);
                }
                setControlLine1Path(e) {
                    this.figure.setControlLine1Path(e);
                }
                setControlLine2Path(e) {
                    this.figure.setControlLine2Path(e);
                }
                setControlPoint1Radius(e) {
                    this.figure.setControlPoint1Radius(e);
                }
                setControlPoint2Radius(e) {
                    this.figure.setControlPoint2Radius(e);
                }
                setIsDraggingStartPoint1(e) {
                    ((this.isDraggingStartPoint1 = e),
                        this.updateAllPointsRadius());
                }
                setIsDraggingStartPoint2(e) {
                    ((this.isDraggingStartPoint2 = e),
                        this.updateAllPointsRadius());
                }
                setIsHoveringStartPoint1(e) {
                    ((this.isHoveringStartPoint1 = e),
                        this.updateAllPointsRadius());
                }
                setIsHoveringStartPoint2(e) {
                    ((this.isHoveringStartPoint2 = e),
                        this.updateAllPointsRadius());
                }
                setIsDraggingControlPoint1(e) {
                    ((this.isDraggingControlPoint1 = e),
                        this.updateAllPointsRadius());
                }
                setIsDraggingControlPoint2(e) {
                    ((this.isDraggingControlPoint2 = e),
                        this.updateAllPointsRadius());
                }
                setIsHoveringControlPoint1(e) {
                    ((this.isHoveringControlPoint1 = e),
                        this.updateAllPointsRadius());
                }
                setIsHoveringControlPoint2(e) {
                    ((this.isHoveringControlPoint2 = e),
                        this.updateAllPointsRadius());
                }
                updateAllPointsRadius() {
                    const e = { rx: 6, ry: 6 },
                        t = { rx: 4, ry: 4 };
                    (this.figure.setStartPoint1Radius(
                        this.isHoveringStartPoint1 || this.isDraggingStartPoint1
                            ? e
                            : t
                    ),
                        this.figure.setStartPoint2Radius(
                            this.isHoveringStartPoint2 ||
                                this.isDraggingStartPoint2
                                ? e
                                : t
                        ),
                        this.figure.setControlPoint1Radius(
                            this.isHoveringControlPoint1 ||
                                this.isDraggingControlPoint1
                                ? e
                                : t
                        ),
                        this.figure.setControlPoint2Radius(
                            this.isHoveringControlPoint2 ||
                                this.isDraggingControlPoint2
                                ? e
                                : t
                        ));
                }
                setPointerEventsNone(e) {
                    this.figure.setPointerEventsNone(e);
                }
                saveEdit(e) {
                    this.model.changeTitle(e);
                }
                getTextClientStyle() {
                    return {
                        fontSize:
                            parseInt(
                                n.a.getStyleValue(this, r.STYLE_KEYS.FONT_SIZE)
                            ) || 12,
                        fontFamily: n.a.getStyleValue(
                            this,
                            r.STYLE_KEYS.FONT_FAMILY
                        ),
                        fontStyle: n.a.getStyleValue(
                            this,
                            r.STYLE_KEYS.FONT_STYLE
                        ),
                        fontWeight: n.a.getStyleValue(
                            this,
                            r.STYLE_KEYS.FONT_WEIGHT
                        ),
                        textTransform: n.a.getStyleValue(
                            this,
                            r.STYLE_KEYS.TEXT_TRANSFORM
                        ),
                        textDecoration: n.a.getStyleValue(
                            this,
                            r.STYLE_KEYS.TEXT_DECORATION
                        ),
                    };
                }
                getTextClientBounds() {
                    return this.titleText.node.getBoundingClientRect();
                }
                getEditContent() {
                    return this.model.get('title') || '';
                }
                remove() {
                    const e = this.parent();
                    null == e ||
                        e.relationships.forEach((t, i) => {
                            t === this && e.relationships.splice(i, 1);
                        });
                    const t = this.editDomain();
                    return (
                        t &&
                            t.selectionManager &&
                            t.selectionManager.removeFromSelection(this),
                        t && t.model2View && delete t.model2View[this.model.id],
                        this.titleView && this.titleView.remove(),
                        this.stopListening(),
                        this.clearReactions(),
                        this.arrowSelector.dispose(),
                        this.parent(null),
                        this.figure.dispose(),
                        this
                    );
                }
                _shoudControlPointHide() {
                    return !this.isSelected && !this.isHovering;
                }
                _shouldTitleHide() {
                    return (
                        !this.model.get('title') &&
                        !this.isSelected &&
                        !this.isHovering
                    );
                }
                _showOrHideControlPoint() {
                    this._shoudControlPointHide()
                        ? this.hideControlPoint()
                        : this.getContext().isReadOnly() ||
                          this.showControlPoint();
                }
                showControlPoint() {
                    this.figure.setControlPointGroupVisible(!0);
                }
                hideControlPoint() {
                    this.figure.setControlPointGroupVisible(!1);
                }
                _showOrHideTitle() {
                    this._shouldTitleHide()
                        ? (this.hideTitle(), this.figure.setMaskVisible(!1))
                        : (this.showTitle(), this.figure.setMaskVisible(!0));
                }
                showTitle() {
                    this.titleView && this.titleView.setVisible(!0);
                }
                hideTitle() {
                    this.titleView && this.titleView.setVisible(!1);
                }
                _updateActionStyle() {
                    let e = 'actionPath';
                    (this.isSelected
                        ? ((e = 'actionPath__selected'),
                          this.isDeFocus && (e = 'actionPath__defocus'))
                        : this.isHovering && (e = 'actionPath__hover'),
                        this.style(this.figure.renderWorker.actionPath, e));
                }
                _updateState() {
                    (this.killAnimationByFlag(
                        r.ANIMATION_FLAGS
                            .RELATIONSHIP_SHOW_HIGH_LIGHT_SELECT_BOX
                    ),
                        this._showOrHideControlPoint(),
                        this._showOrHideTitle(),
                        this._updateActionStyle());
                }
                setVisible(e) {
                    ((this.isVisible = e),
                        this.figure.setVisible(e && !this.isForcedInvisible));
                }
                onChangeEndPoint() {
                    this.render();
                }
                getInfoString() {
                    return this.model.get('title') || '';
                }
                getClientRect() {
                    const e = {
                            x: this.titleView.figure.textPosition.x,
                            y: this.titleView.figure.textPosition.y,
                        },
                        t = this.editDomain()
                            .getCoordinateTransfer()
                            .mindMapToViewport(e);
                    return {
                        x: t.x,
                        y: t.y,
                        width: this.titleView.bounds.width,
                        height: this.titleView.bounds.height,
                    };
                }
                displayHighLightSelect() {
                    this.killAnimationByFlag(
                        r.ANIMATION_FLAGS
                            .RELATIONSHIP_SHOW_HIGH_LIGHT_SELECT_BOX
                    );
                    const e = this.getModule(r.MODULE_NAME.ANIMATION);
                    e &&
                        e.startAnimation(
                            r.ANIMATION_FLAGS
                                .RELATIONSHIP_SHOW_HIGH_LIGHT_SELECT_BOX,
                            { target: this }
                        );
                }
            };
            ((u = T(
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
                                            this.refreshStyles
                                        ),
                                        this.on('afterAncestorChange', () => {
                                            const e = this.parent();
                                            e &&
                                                this.addReaction(
                                                    () =>
                                                        e.figure
                                                            .backgroundColor,
                                                    () =>
                                                        this.refreshTextColor()
                                                );
                                        })));
                            }
                            initStyle() {
                                (this.refreshColorStyles(),
                                    this.refreshSkeletonStyles(),
                                    (this.hadInit = !0));
                            }
                            refreshStyles() {
                                (this.refreshColorStyles(),
                                    this.refreshSkeletonStyles());
                            }
                            refreshColorStyles() {
                                (super.refreshColorStyles(),
                                    this.figure.setLineColor(
                                        n.a.getStyleValue(
                                            this,
                                            r.STYLE_KEYS.LINE_COLOR
                                        )
                                    ));
                            }
                            refreshSkeletonStyles() {
                                (super.refreshSkeletonStyles(),
                                    this.figure.setLineStyle(
                                        n.a.getStyleValue(
                                            this,
                                            r.STYLE_KEYS.SHAPE_CLASS
                                        )
                                    ),
                                    this.figure.setLinePattern(
                                        n.a.getStyleValue(
                                            this,
                                            r.STYLE_KEYS.LINE_PATTERN
                                        )
                                    ),
                                    this.figure.setLineWidth(
                                        parseInt(
                                            n.a.getStyleValue(
                                                this,
                                                r.STYLE_KEYS.LINE_WIDTH
                                            )
                                        )
                                    ),
                                    this.figure.setBeginArrowClass(
                                        n.a.getStyleValue(
                                            this,
                                            r.STYLE_KEYS.ARROW_BEGIN_CLASS
                                        )
                                    ),
                                    this.figure.setEndArrowClass(
                                        n.a.getStyleValue(
                                            this,
                                            r.STYLE_KEYS.ARROW_END_CLASS
                                        )
                                    ));
                            }
                            onChangeStyle(e) {
                                super.onChangeStyle(e);
                                const t = n.a.getStyleValue(this, e);
                                e === r.STYLE_KEYS.LINE_COLOR
                                    ? this.figure.setLineColor(t)
                                    : e === r.STYLE_KEYS.SHAPE_CLASS
                                      ? this.figure.setLineStyle(t)
                                      : e === r.STYLE_KEYS.LINE_PATTERN
                                        ? this.figure.setLinePattern(t)
                                        : e === r.STYLE_KEYS.LINE_WIDTH
                                          ? this.figure.setLineWidth(
                                                parseInt(t)
                                            )
                                          : e === r.STYLE_KEYS.ARROW_BEGIN_CLASS
                                            ? this.figure.setBeginArrowClass(t)
                                            : e ===
                                                  r.STYLE_KEYS
                                                      .ARROW_END_CLASS &&
                                              this.figure.setEndArrowClass(t);
                            }
                        },
                ],
                u
            )),
                (t.a = u));
        }).call(this, i(45));
    },
];
