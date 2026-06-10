export default [
    function (e, t, i) {
        'use strict';
        (i.r(t),
            function (e) {
                var n = i(3),
                    r = i(0),
                    o = i(18),
                    a = i(113),
                    s = i(78),
                    l = i(114),
                    c = i(79),
                    d = i(115),
                    f = i(117),
                    h = i(158),
                    p = i(103),
                    T = i(69),
                    u = i(1),
                    g = function (e, t, i, n) {
                        var r,
                            o = arguments.length,
                            a =
                                o < 3
                                    ? t
                                    : null === n
                                      ? (n = Object.getOwnPropertyDescriptor(
                                            t,
                                            i
                                        ))
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
                        return (
                            o > 3 && a && Object.defineProperty(t, i, a),
                            a
                        );
                    };
                let Q = class extends T.a {
                    constructor(e, t) {
                        (super({ model: e }),
                            (this.shapeBounds = {
                                x: 0,
                                y: 0,
                                width: 0,
                                height: 0,
                            }),
                            (this.bounds = {
                                x: 0,
                                y: 0,
                                width: 0,
                                height: 0,
                            }),
                            (this.isVisible = !0),
                            (this.isForcedInvisible = !1),
                            (this.contentBounds = {
                                x: 0,
                                y: 0,
                                width: 0,
                                height: 0,
                            }),
                            (this.model = e),
                            (this.figure = o.a.createFigure(this)),
                            (this.topicShapeStyle = null),
                            (this.numberingView = null),
                            (this.titleView = null),
                            (this.markersView = null),
                            (this.labelsView = null),
                            (this.mathJaxView = null),
                            (this.informationIconView = null),
                            (this.topicShapeSelectBox = null),
                            (this.image = null),
                            this.parent(t),
                            this.initSVGStructure(),
                            this.initEventsListener());
                    }
                    get type() {
                        return r.VIEW_TYPE.TOPIC;
                    }
                    get figureType() {
                        return r.FIGURE_TYPE.TOPIC;
                    }
                    get _style() {
                        return {
                            topicShape: {},
                            topicShape__intersected: {
                                'stroke-width': '5px',
                                stroke: '#2ebdff',
                            },
                        };
                    }
                    initSVGStructure() {
                        this.topicGroup = this.figure.getContent();
                        const e = this.figure.renderWorker;
                        ((this.topicShapeGroup = e.topicShapeGroup),
                            (this.topicContent = e.topicContent),
                            (this.s$topicInnerElementGroup =
                                e.s$topicInnerElementGroup),
                            (this.topicShapeFill = e.topicShapeFill),
                            (this.topicShape = e.topicShape));
                    }
                    initEventsListener() {
                        const t = this.model,
                            i = t.modelEvents;
                        'readonly' !== e.env.SB_MODE &&
                            (this.listenTo(t, 'addImage', this.onAddImage),
                            this.listenTo(t, 'removeImage', this.onRemoveImage),
                            this.listenTo(
                                t,
                                i.MATH_JAX_ADDED,
                                this.onAddMathJaxView
                            ),
                            this.listenTo(
                                t,
                                i.MATH_JAX_REMOVED,
                                this.removeMathJaxView
                            ),
                            this.listenTo(
                                t,
                                i.MATH_JAX_WIDTH_CHANGED,
                                this.onMathJaxWidthChanged
                            ),
                            this.listenTo(
                                t,
                                i.MATH_JAX_ALIGN_CHANGED,
                                this.onMathJaxAlignChanged
                            ),
                            this.listenTo(t, 'change:title', () => {
                                var e;
                                null === (e = this.titleView) ||
                                    void 0 === e ||
                                    e.setText(t.get('title'));
                            }),
                            this.listenTo(
                                t,
                                i.changeCustomWidth,
                                this.setCustomWidth
                            ),
                            this.listenTo(
                                t,
                                i.labelsChanged,
                                this.onLabelsChanged
                            ),
                            this.listenTo(
                                t,
                                i.informationChanged,
                                this.onInformationChanged
                            ));
                    }
                    initView() {
                        var e;
                        (this.initStyle(),
                            this.initEventsListenerWithContext(),
                            this.addTitleView(new l.a()),
                            (null === (e = this.parent()) || void 0 === e
                                ? void 0
                                : e.getNumberingText()) &&
                                this.addNumberingView(new a.a()));
                        const t = this.model.getImageModel(),
                            i = this.model.getMathJaxText();
                        if (
                            (t && !i && this.addImageView(new s.a(t, this)), i)
                        ) {
                            const e = this.model.getMathJaxInfo();
                            e && this.addMathJaxView(new c.a(e));
                        }
                        ((this.markersView = new d.a(this)),
                            this._initFashionInformationIcons(),
                            this._initFashionLabelsUnitCard(),
                            this._initTopicSelectBoxView());
                    }
                    getTitledStyleView() {
                        return this.parent();
                    }
                    _initFashionInformationIcons() {
                        this.figure.invalidateLayout();
                        const e = this.getInformationData();
                        (this.informationIconView &&
                            (this.informationIconView.remove(),
                            (this.informationIconView = null)),
                            e &&
                                Object.keys(e).length > 0 &&
                                ((this.informationIconView = new f.a(e)),
                                this.informationIconView.parent(this)));
                    }
                    _initFashionLabelsUnitCard() {
                        if (
                            (this.figure.invalidateLayout(),
                            this.labelsView &&
                                (this.labelsView.remove(),
                                (this.labelsView = null)),
                            this._isMatrixItem())
                        )
                            return;
                        const e = this.model.getLabel();
                        e && (this.labelsView = new p.a(e.split(','), this));
                    }
                    parent(e) {
                        return void 0 === e ? super.parent() : super.parent(e);
                    }
                    setTopicShapeClass(e) {}
                    refreshLabelViewState() {
                        if (this.topicShapeStyle === r.TOPICSHAPE.MATRIXMAIN)
                            this.labelsView &&
                                (this.labelsView.remove(),
                                (this.labelsView = null));
                        else {
                            const e = this.model.getLabel();
                            e &&
                                (this.labelsView = new p.a(e.split(','), this));
                        }
                        this.figure.invalidateLayout();
                    }
                    initStyle() {}
                    refreshStyles() {}
                    refreshTextAlign() {
                        super.refreshTextAlign();
                    }
                    setTopicShapePath(e) {
                        this.figure.setTopicShapePath(e);
                    }
                    setTopicShapeFillPath(e) {
                        this.figure.setTopicShapeFillPath(e);
                    }
                    setTopicShapeSelectBoxPath(e) {
                        var t;
                        null === (t = this.topicShapeSelectBox) ||
                            void 0 === t ||
                            t.path(e);
                    }
                    getTextTransform() {
                        return (
                            n.a.getStyleValue(
                                this.parent(),
                                r.STYLE_KEYS.TEXT_TRANSFORM
                            ) || r.TEXTTRANSFORM.MANUAL
                        );
                    }
                    getTopicMinWidth() {
                        return this.figure.minimumWidth;
                    }
                    setCustomWidth() {
                        this.figure.setCustomWidth(this.model.customWidth());
                    }
                    render() {
                        return (this.figure.invalidateLayout(), this);
                    }
                    getInformationData() {
                        const e = this.model,
                            t = e.getNotes(),
                            i = e.getComments(),
                            n = e.getHref(),
                            r = e.getTaskInfo(),
                            o = e.getAudioNotes(),
                            a = {};
                        r && (r.content || []).forEach((e) => (a[e.name] = !0));
                        const s = {};
                        (n && Object.assign(s, { hrefInfo: n }),
                            o &&
                                Object.assign(s, {
                                    audioNotesInfo: o,
                                }),
                            t && t.plain && Object.assign(s, { notesInfo: t }),
                            i &&
                                i.length &&
                                Object.assign(s, {
                                    commentsInfo: i,
                                }),
                            (a['assigned-to'] ||
                                a['start-date'] ||
                                a['end-date']) &&
                                Object.assign(s, {
                                    taskInfo: null == r ? void 0 : r.content,
                                }));
                        return 0 === Object.keys(s).length ? null : s;
                    }
                    getShapeStyle() {
                        return n.a.getStyleValue(
                            this.parent(),
                            r.STYLE_KEYS.SHAPE_CLASS
                        );
                    }
                    setTopicShapeMaskAttrD(e) {
                        this.figure.setTopicShapeMaskAttrD(e);
                    }
                    refresh() {
                        this.render();
                    }
                    showSelectBox() {
                        var e;
                        null === (e = this.topicShapeSelectBox) ||
                            void 0 === e ||
                            e.hover();
                    }
                    hideSelectBox() {
                        var e;
                        null === (e = this.topicShapeSelectBox) ||
                            void 0 === e ||
                            e.hide();
                    }
                    activateSelectBox() {
                        var e;
                        null === (e = this.topicShapeSelectBox) ||
                            void 0 === e ||
                            e.active();
                    }
                    deFocusSelectBox() {
                        var e;
                        null === (e = this.topicShapeSelectBox) ||
                            void 0 === e ||
                            e.defocus();
                    }
                    showIntersection() {
                        var e;
                        null === (e = this.topicShapeSelectBox) ||
                            void 0 === e ||
                            e.intersect();
                    }
                    hideIntersection() {
                        var e;
                        null === (e = this.topicShapeSelectBox) ||
                            void 0 === e ||
                            e.hide();
                    }
                    onLabelsChanged() {
                        this._initFashionLabelsUnitCard();
                    }
                    onInformationChanged(e) {
                        this._initFashionInformationIcons();
                    }
                    addImageView(e) {
                        (this.onRemoveImage(), (this.image = e));
                    }
                    onAddImage() {
                        const e = this.model.getImageModel();
                        e &&
                            (this.addImageView(new s.a(e, this)),
                            this.refresh());
                    }
                    onRemoveImage() {
                        this.image &&
                            (this.image.remove(),
                            (this.image = null),
                            this.refresh());
                    }
                    onAddMathJaxView() {
                        const e = this.model.getMathJaxInfo();
                        e && (this.addMathJaxView(new c.a(e)), this.refresh());
                    }
                    removeMathJaxView() {
                        this.mathJaxView &&
                            (this.mathJaxView.remove(),
                            (this.mathJaxView = null),
                            this.refresh());
                    }
                    addMathJaxView(e) {
                        (e.parent(this),
                            this.mathJaxView && this.removeMathJaxView(),
                            (this.mathJaxView = e),
                            this.refresh());
                    }
                    onMathJaxWidthChanged() {
                        this.mathJaxView &&
                            (this.mathJaxView.refreshFinalWidth(),
                            this.refresh());
                    }
                    onMathJaxAlignChanged() {
                        this.mathJaxView &&
                            (this.mathJaxView.refreshAlign(), this.refresh());
                    }
                    addTitleView(e) {
                        ((this.titleView = e), e.parent(this));
                    }
                    hideTitle() {
                        var e;
                        null === (e = this.titleView) ||
                            void 0 === e ||
                            e.hide();
                    }
                    showTitle() {
                        var e;
                        null === (e = this.titleView) ||
                            void 0 === e ||
                            e.show();
                    }
                    addNumberingView(e) {
                        ((this.numberingView = e), e.parent(this));
                    }
                    getStructureClass() {
                        var e;
                        return null === (e = this.parent()) || void 0 === e
                            ? void 0
                            : e.getStructureClass();
                    }
                    _isMatrixItem() {
                        var e;
                        const t =
                                null === (e = this.parent()) || void 0 === e
                                    ? void 0
                                    : e.parent(),
                            i =
                                (null == t ? void 0 : t.getStructureClass) &&
                                t.getStructureClass();
                        return (
                            i === r.STRUCTURECLASS.SPREADSHEETROW ||
                            i === r.STRUCTURECLASS.SPREADSHEETCOLUMN
                        );
                    }
                    _initTopicSelectBoxView() {
                        (this.topicShapeSelectBox &&
                            (this.topicShapeSelectBox.remove(),
                            (this.topicShapeSelectBox = null)),
                            (this.topicShapeSelectBox = new h.a(this)),
                            this.topicShapeSelectBox.parent(this));
                    }
                    setVisible(e) {
                        ((this.isVisible = e),
                            this.figure.setVisible(
                                e && !this.isForcedInvisible
                            ));
                    }
                    remove() {
                        return (
                            this.stopListening(),
                            this.clearReactions(),
                            this.figure.dispose(),
                            this.titleView &&
                                (this.titleView.remove(),
                                (this.titleView = null)),
                            this.markersView &&
                                (this.markersView.remove(),
                                (this.markersView = null)),
                            this.informationIconView &&
                                (this.informationIconView.remove(),
                                (this.informationIconView = null)),
                            this.image &&
                                (this.image.remove(), (this.image = null)),
                            this.mathJaxView &&
                                (this.mathJaxView.remove(),
                                (this.mathJaxView = null)),
                            this.numberingView &&
                                (this.numberingView.remove(),
                                (this.numberingView = null)),
                            this.topicShapeSelectBox &&
                                (this.topicShapeSelectBox.remove(),
                                (this.topicShapeSelectBox = null)),
                            this.parent(null),
                            this
                        );
                    }
                };
                ((Q = g(
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
                                        this.addReaction(
                                            () => {
                                                var e;
                                                return null ===
                                                    (e = this.parent()) ||
                                                    void 0 === e
                                                    ? void 0
                                                    : e.figure.lineColor;
                                            },
                                            () => this.refreshBorderLineColor()
                                        ),
                                        this.addReaction(
                                            () => {
                                                var e;
                                                return null ===
                                                    (e = this.parent()) ||
                                                    void 0 === e
                                                    ? void 0
                                                    : e.figure.lineWidth;
                                            },
                                            () => this.refreshBorderLineWidth()
                                        ),
                                        this.addReaction(
                                            () => {
                                                var e;
                                                return null ===
                                                    (e = this.parent()) ||
                                                    void 0 === e
                                                    ? void 0
                                                    : e.figure.linePattern;
                                            },
                                            () =>
                                                this.refreshBorderLinePattern()
                                        ),
                                        this.addReaction(
                                            () => this.figure.visualFillColor,
                                            () => this.refreshTextColor()
                                        ),
                                        this.addReaction(
                                            () => {
                                                var e;
                                                return null ===
                                                    (e = this.parent()) ||
                                                    void 0 === e
                                                    ? void 0
                                                    : e.figure.lineColor;
                                            },
                                            () => this.refreshFillColor()
                                        ));
                                }
                                initEventsListenerWithContext() {
                                    (super.initEventsListenerWithContext(),
                                        this.addAutoRun(() => {
                                            this.refreshVisualFillColor();
                                        }));
                                }
                                onChangeStyle(e) {
                                    var t;
                                    switch ((super.onChangeStyle(e), e)) {
                                        case r.STYLE_KEYS.CALLOUT_SHAPE_CLASS:
                                        case r.STYLE_KEYS.SHAPE_CLASS:
                                            (this.model.customWidth(0),
                                                this.refreshShapeClass());
                                            break;
                                        case r.STYLE_KEYS.FILL_COLOR:
                                            this.refreshFillColor();
                                            break;
                                        case r.STYLE_KEYS.BORDER_LINE_COLOR:
                                            this.refreshBorderLineColor();
                                            break;
                                        case r.STYLE_KEYS.BORDER_LINE_WIDTH:
                                            this.refreshBorderLineWidth();
                                            break;
                                        case r.STYLE_KEYS.BORDER_LINE_PATTERN:
                                            this.refreshBorderLinePattern();
                                            break;
                                        case r.STYLE_KEYS.FILL_PATTERN:
                                            this.refreshFillPattern();
                                            break;
                                        case r.STYLE_KEYS.MARGIN_LEFT:
                                            this.refreshMarginLeft();
                                            break;
                                        case r.STYLE_KEYS.MARGIN_BOTTOM:
                                            this.refreshMarginBottom();
                                            break;
                                        case r.STYLE_KEYS.MARGIN_RIGHT:
                                            this.refreshMarginRight();
                                            break;
                                        case r.STYLE_KEYS.MARGIN_TOP:
                                            this.refreshMarginTop();
                                            break;
                                        case r.STYLE_KEYS.FONT_SIZE:
                                            null ===
                                                (t =
                                                    this.informationIconView) ||
                                                void 0 === t ||
                                                t.refreshSkeletonStyles();
                                    }
                                }
                                initStyle() {
                                    this.refreshStyles();
                                }
                                refreshStyles() {
                                    (this.refreshColorStyles(),
                                        this.refreshSkeletonStyles());
                                }
                                refreshSkeletonStyles() {
                                    var e, t;
                                    (super.refreshSkeletonStyles(),
                                        this.refreshMarginsInfo(),
                                        this.refreshShapeClass(),
                                        this.refreshBorderLineWidth(),
                                        this.refreshFillPattern(),
                                        this.refreshBorderLinePattern(),
                                        this.setCustomWidth(),
                                        this.refreshFillColor(),
                                        null === (e = this.markersView) ||
                                            void 0 === e ||
                                            e.refreshMarkerSize(),
                                        null ===
                                            (t = this.informationIconView) ||
                                            void 0 === t ||
                                            t.refreshSkeletonStyles(),
                                        this.figure.setLineCorner(
                                            parseInt(
                                                `${n.a.getStyleValue(this.parent(), r.STYLE_KEYS.LINE_CORNER) || 0}`
                                            )
                                        ));
                                }
                                refreshColorStyles() {
                                    var e, t;
                                    (super.refreshColorStyles(),
                                        this.refreshFillColor(),
                                        this.refreshBorderLineColor(),
                                        null === (e = this.mathJaxView) ||
                                            void 0 === e ||
                                            e.refreshColor(),
                                        null ===
                                            (t = this.informationIconView) ||
                                            void 0 === t ||
                                            t.refreshColorStyles());
                                }
                                refreshShapeClass() {
                                    const e = this.parent(),
                                        t = Object(u.isCalloutBranch)(e)
                                            ? r.STYLE_KEYS.CALLOUT_SHAPE_CLASS
                                            : r.STYLE_KEYS.SHAPE_CLASS,
                                        i = n.a.getStyleValue(e, t);
                                    ((this.topicShapeStyle = i),
                                        this.figure.setShapeClass(i));
                                }
                                refreshFillColor() {
                                    const e = this.parent();
                                    if (!e) return;
                                    let t = n.a.getStyleValue(
                                        e,
                                        r.STYLE_KEYS.FILL_COLOR
                                    );
                                    (this.figure.setOriginalFillColor(t),
                                        Object(u.isTreeTableCell)(e) &&
                                            !e.shouldCollapse() &&
                                            (t = 'none'),
                                        this.figure.setFillColor(t));
                                    const i = n.a.getStyleValue(
                                        e.sheetView,
                                        r.STYLE_KEYS.FILL_GRADIENT
                                    );
                                    this.figure.setFillGradient(i);
                                }
                                refreshFillPattern() {
                                    this.figure.setFillPattern(
                                        n.a.getStyleValue(
                                            this.parent(),
                                            r.STYLE_KEYS.FILL_PATTERN
                                        )
                                    );
                                }
                                refreshBorderLineColor() {
                                    this.figure.setBorderColor(
                                        n.a.getStyleValue(
                                            this.parent(),
                                            r.STYLE_KEYS.BORDER_LINE_COLOR
                                        )
                                    );
                                }
                                refreshBorderLineWidth() {
                                    const e = this.parent();
                                    this.figure.setBorderWidth(
                                        parseInt(
                                            n.a.getStyleValue(
                                                e,
                                                r.STYLE_KEYS.BORDER_LINE_WIDTH
                                            )
                                        )
                                    );
                                }
                                refreshBorderLinePattern() {
                                    const e = this.parent();
                                    if (!e) return;
                                    const t = n.a.getStyleValue(
                                        e,
                                        r.STYLE_KEYS.BORDER_LINE_PATTERN
                                    );
                                    this.figure.setBorderLinePattern(t);
                                }
                                refreshMarginLeft() {
                                    this.figure.setMarginLeft(
                                        parseInt(
                                            `${n.a.getStyleValue(this.parent(), r.STYLE_KEYS.MARGIN_LEFT)}`
                                        )
                                    );
                                }
                                refreshMarginRight() {
                                    this.figure.setMarginRight(
                                        parseInt(
                                            `${n.a.getStyleValue(this.parent(), r.STYLE_KEYS.MARGIN_RIGHT)}`
                                        )
                                    );
                                }
                                refreshMarginTop() {
                                    this.figure.setMarginTop(
                                        parseInt(
                                            `${n.a.getStyleValue(this.parent(), r.STYLE_KEYS.MARGIN_TOP)}`
                                        )
                                    );
                                }
                                refreshMarginBottom() {
                                    this.figure.setMarginBottom(
                                        parseInt(
                                            `${n.a.getStyleValue(this.parent(), r.STYLE_KEYS.MARGIN_BOTTOM)}`
                                        )
                                    );
                                }
                                refreshVisualFillColor() {
                                    var e, t, i;
                                    const n = this.figure.originalFillColor;
                                    let o;
                                    if (
                                        (function (e) {
                                            if (!e) return !1;
                                            if ('none' === e) return !1;
                                            const { snowballUtil: t } = Object(
                                                u.getInjectModule
                                            )(r.MODULE_NAME.SNOWBALL);
                                            return (
                                                1 ===
                                                t.hexStringToRgbObject(e).a
                                            );
                                        })(n)
                                    )
                                        o = n;
                                    else {
                                        const a =
                                                null ===
                                                    (i =
                                                        null ===
                                                            (t =
                                                                null ===
                                                                    (e =
                                                                        this.parent()) ||
                                                                void 0 === e
                                                                    ? void 0
                                                                    : e.backGroundCellBranchView) ||
                                                        void 0 === t
                                                            ? void 0
                                                            : t.topicView) ||
                                                void 0 === i
                                                    ? void 0
                                                    : i.figure
                                                          .originalFillColor,
                                            s =
                                                this.getContext().getSheetView()
                                                    .figure.backgroundColor,
                                            l = r.VISUAL_BACK_COLOR,
                                            { snowballUtil: c } = Object(
                                                u.getInjectModule
                                            )(r.MODULE_NAME.SNOWBALL);
                                        o = c.blendingColor(n, a, s, l);
                                    }
                                    this.figure.setVisualFillColor(o);
                                }
                                refreshMarginsInfo() {
                                    (this.refreshMarginLeft(),
                                        this.refreshMarginRight(),
                                        this.refreshMarginBottom(),
                                        this.refreshMarginTop());
                                }
                                setTopicShapeClass(e) {
                                    ((this.topicShapeStyle = e),
                                        this.figure.setShapeClass(e));
                                }
                                setGradientColor(e) {
                                    this.figure.setGradientColor(e);
                                }
                            },
                    ],
                    Q
                )),
                    (t.default = Q));
            }.call(this, i(45)));
    },
];
