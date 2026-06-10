export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return d;
        });
        var n = i(0),
            r = i(18),
            o = i(21),
            a = i(1),
            s = i(3),
            l = i(30),
            c = i(5);
        class d extends o.a {
            constructor(e) {
                (super(),
                    (this.isVisible = !0),
                    (this.timelineView = e),
                    this.parent(e),
                    (this.figure = r.a.createFigure(this)),
                    this._initEventListener(),
                    this._updateVisible(),
                    this.isVisible &&
                        (this._updateLineColor(),
                        this._updatePosition(),
                        this._updateLineWidth(),
                        this._updateLinePattern()));
            }
            get type() {
                return n.VIEW_TYPE.TIMELINE_MAIN_LINE;
            }
            get figureType() {
                return n.FIGURE_TYPE.TIMELINE_MAIN_LINE;
            }
            setVisible(e) {
                ((this.isVisible = e), this.figure.setVisible(e));
            }
            _initEventListener() {
                (this.listenTo(
                    this.timelineView,
                    'refreshLineColor',
                    this._updateLineColor
                ),
                    this.listenTo(
                        this.timelineView,
                        'refreshLineWidth',
                        this._updateLineWidth
                    ),
                    this.listenTo(
                        this.timelineView,
                        'refreshLinePattern',
                        this._updateLinePattern
                    ),
                    this.listenTo(
                        this.timelineView,
                        'afterRealPosChange',
                        this._updatePosition
                    ),
                    this.listenTo(this.timelineView, 'refreshView', () => {
                        (this._updatePosition(), this._updateVisible());
                    }));
            }
            _updateVisible() {
                ((this.isVisible =
                    !this.timelineView.model.isCollapse() &&
                    this.timelineView.getChildrenBranchesByType(
                        n.TOPIC_TYPE.ATTACHED
                    ).length > 0),
                    this.setVisible(this.isVisible));
            }
            _updateLineColor() {
                var e;
                const t = s.a.getStyleValue(
                    this.getContext().getSheetView(),
                    n.STYLE_KEYS.MULTI_LINE_COLORS
                );
                let i;
                if (t && 'none' !== t) {
                    const t = this.timelineView.getChildrenBranchesByType(
                        n.TOPIC_TYPE.ATTACHED
                    );
                    i = s.a.getStyleValue(
                        null !== (e = t[t.length - 1]) && void 0 !== e
                            ? e
                            : this.timelineView,
                        n.STYLE_KEYS.LINE_COLOR
                    );
                } else
                    i = s.a.getStyleValue(
                        this.timelineView,
                        n.STYLE_KEYS.LINE_COLOR
                    );
                this.figure.setLineColor(i);
            }
            _updateLinePattern() {
                const e = parseInt(
                        s.a.getStyleValue(
                            this.timelineView,
                            n.STYLE_KEYS.LINE_WIDTH
                        )
                    ),
                    t = s.a.getStyleValue(
                        this.timelineView,
                        n.STYLE_KEYS.LINE_PATTERN
                    ),
                    i = Object(a.getLinePattenAttr)(t, e);
                this.figure.setLinePattern(i);
            }
            _updateLineWidth() {
                const e = s.a.getStyleValue(
                    this.timelineView,
                    n.STYLE_KEYS.LINE_WIDTH
                );
                this.figure.setLineWidth(parseInt(e));
            }
            _calcStartPosition(e) {
                const t = Object(a.getTopicShape)(this.timelineView);
                return Object(c.c)(
                    t.getBasePoint(this.timelineView, e),
                    t.getPointOffset(this.timelineView, e)
                );
            }
            _calcEndPosition(e, t) {
                const i = this.timelineView.getChildrenBranchesByType(
                    n.TOPIC_TYPE.ATTACHED
                );
                let r = 0,
                    o = 0;
                if (t === n.DIRECTION.RIGHT) {
                    const t =
                        i.reduce(
                            (e, { position: t, boundaryBounds: i }) =>
                                Math.max(e, t.x + i.width + i.x),
                            0
                        ) -
                        this.timelineView.topicView.shapeBounds.width / 2;
                    ((r = e.x + t), (o = e.y));
                }
                return { x: r, y: o };
            }
            _calcStepPoints(e, t) {
                const { x: i, y: r } = e,
                    o = Object(a.getFinalTimelineChildDirection)(
                        this.timelineView
                    );
                return this.timelineView
                    .getChildrenBranchesByType(n.TOPIC_TYPE.ATTACHED)
                    .map((e, s) => {
                        const l = Object(a.getReverseDir)(o[s]),
                            { x: c, y: d } = Object(a.getTopicShape)(
                                e
                            ).getBasePoint(e, l);
                        return t === n.DIRECTION.RIGHT
                            ? { x: e.position.x + c, y: r }
                            : t === n.DIRECTION.DOWN
                              ? { x: i, y: e.position.y + d }
                              : { x: 0, y: 0 };
                    });
            }
            _updatePosition() {
                const e = Object(l.a)(
                    this.timelineView.getStructureClass()
                ).getRangeGrowthDirection();
                if (
                    this.timelineView.getChildrenBranchesByType(
                        n.TOPIC_TYPE.ATTACHED
                    ).length > 0
                ) {
                    const t = this._calcStartPosition(e),
                        i = this._calcEndPosition(t, e),
                        n = this._calcStepPoints(t, e);
                    (this.figure.setStartPosition(t),
                        this.figure.setEndPosition(i),
                        this.figure.setLineStepPoints(n));
                }
            }
            remove() {
                return (
                    this.figure.dispose(),
                    this.stopListening(),
                    this.parent(null),
                    this
                );
            }
        }
    },
];
