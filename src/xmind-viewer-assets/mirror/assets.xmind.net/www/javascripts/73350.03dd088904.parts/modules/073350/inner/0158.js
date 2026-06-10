export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return d;
        });
        var n = i(18),
            r = i(0),
            o = i(23);
        class a {
            constructor(e) {
                ((this._topicSelectBoxView = e),
                    (this._topicView = this._topicSelectBoxView.refView),
                    (this.leftBarSvg = this._topicSelectBoxView.leftBarSvg),
                    (this.rightBarSvg = this._topicSelectBoxView.rightBarSvg),
                    (this.SIDE = this._topicSelectBoxView.SIDE));
            }
            init() {
                const e = this._topicView.getModule(
                    r.MODULE_NAME.SVG_DRAGGABLE
                );
                [
                    {
                        svg: this.leftBarSvg,
                        side: this.SIDE.LEFT,
                        target: 'bar',
                    },
                    {
                        svg: this.rightBarSvg,
                        side: this.SIDE.RIGHT,
                        target: 'bar',
                    },
                ].forEach((t) => {
                    const i = null == e ? void 0 : e.draggable(t.svg);
                    null == i ||
                        i
                            .dragStart(this._onDragStart(t, i).bind(this))
                            .dragMove(this._onDragMove(t).bind(this))
                            .dragEnd(this._onDragEnd(t).bind(this));
                });
            }
            _onDragStart({ side: e, target: t }, i) {
                return () => {
                    const { _topicView: t } = this;
                    let n, o;
                    ((this._minTopicWidth = t.figure.minimumWidth || 100),
                        (this._startTopicWidth = t.shapeBounds.width),
                        e === this.SIDE.LEFT
                            ? ((n =
                                  this._startTopicWidth / 2 -
                                  this._minTopicWidth),
                              (o =
                                  this._startTopicWidth / 2 -
                                  r.TOPIC_MAX_CUSTOM_WIDTH))
                            : ((n =
                                  r.TOPIC_MAX_CUSTOM_WIDTH -
                                  this._startTopicWidth / 2),
                              (o =
                                  this._minTopicWidth -
                                  this._startTopicWidth / 2)),
                        i.updateConstraint({
                            x: !0,
                            y: !1,
                            maxX: n,
                            minX: o,
                        }),
                        this._topicView
                            .getModule(r.MODULE_NAME.SEMAPHORE)
                            .increase(r.UI_STATUS.DRAG_TOPIC_SELECT_BOX));
                };
            }
            _onDragMove({ side: e }) {
                return (t) => {
                    const { _topicView: i, _minTopicWidth: n } = this,
                        a = e === this.SIDE.LEFT ? -t.deltaX : t.deltaX;
                    let s = this._startTopicWidth + a;
                    s > r.TOPIC_MAX_CUSTOM_WIDTH
                        ? (s = r.TOPIC_MAX_CUSTOM_WIDTH)
                        : s < n && (s = n);
                    const l = Object(o.a)(i.figure.shapeClass),
                        c = this._topicSelectBoxView.getDrawBounds(s);
                    if (e === this.SIDE.LEFT) {
                        const e = s - this._startTopicWidth;
                        c.x += -e;
                    }
                    l.setTopicShapeSelectBox(i, c);
                };
            }
            _onDragEnd({ side: e, target: t }) {
                return (t, i) => {
                    const n = e === this.SIDE.LEFT ? -t.deltaX : t.deltaX,
                        a = this._startTopicWidth + n,
                        s = this._topicView.model;
                    let l = a;
                    if (
                        (a > r.TOPIC_MAX_CUSTOM_WIDTH
                            ? (l = r.TOPIC_MAX_CUSTOM_WIDTH)
                            : a < this._minTopicWidth &&
                              (l = this._minTopicWidth),
                        s.isDetached())
                    ) {
                        const t = l - this._startTopicWidth,
                            i =
                                this._topicSelectBoxView.getNewPositionAfterChangeWidth(
                                    e,
                                    t
                                );
                        s.changePosition({ x: i.x, y: i.y });
                    }
                    (this._topicView
                        .getContext()
                        .execAction(r.ACTION_NAMES.CHANGE_TOPIC_CUSTOM_WIDTH, {
                            customWidth: l,
                            targets: [this._topicView.parent()],
                        }),
                        this._topicView
                            .getModule(r.MODULE_NAME.SEMAPHORE)
                            .decrease(r.UI_STATUS.DRAG_TOPIC_SELECT_BOX),
                        this._topicView
                            .getContext()
                            .afterRender()
                            .then(() => {
                                var e;
                                (Object(o.a)(
                                    this._topicView.figure.shapeClass
                                ).setTopicShapeSelectBox(
                                    this._topicView,
                                    this._topicView.bounds
                                ),
                                    null ===
                                        (e =
                                            this._topicView
                                                .topicShapeSelectBox) ||
                                        void 0 === e ||
                                        e.renderCustomWidthControlBar(!0));
                            }));
                };
            }
        }
        var s = i(9),
            l = i(21),
            c = i(1);
        class d extends l.a {
            constructor(e) {
                (super(),
                    (this._padding = s.a.TOPIC_SELECTBOX_PADDING),
                    (this._selectboxWidth = s.a.TOPIC_SELECTBOX_STROKE_WIDTH),
                    (this.SIDE = { LEFT: 'left', RIGHT: 'right' }),
                    (this._topicSelectBoxDrag = null),
                    (this.refView = e),
                    (this.figure = n.a.createFigure(this)),
                    (this.leftBarSvg = this.figure.renderWorker.leftBarSvg),
                    (this.rightBarSvg = this.figure.renderWorker.rightBarSvg),
                    (this._barWidth = this.refView
                        .getContext()
                        .isMobilePlatform()
                        ? 21
                        : 7));
            }
            get type() {
                return r.VIEW_TYPE.TOPIC_SELECT_BOX;
            }
            get figureType() {
                return r.FIGURE_TYPE.TOPIC_SELECT_BOX;
            }
            get _style() {
                return {
                    topicShapeSelectBox: {
                        'stroke-width': s.a.TOPIC_SELECTBOX_STROKE_WIDTH,
                        stroke: '#2ebdff',
                        fill: 'none',
                    },
                    topicShapeSelectBox__mouseover: {
                        'stroke-opacity': '0.5',
                        stroke: '#2ebdff',
                    },
                    topicShapeSelectBox__selected: {
                        'stroke-opacity': '1',
                        fill: 'none',
                    },
                    topicShapeSelectBox__deFocus: {
                        'stroke-opacity': '1',
                        stroke: '#9f9f9f',
                        fill: 'none',
                    },
                    topicShapeSelectBox__intersected: {
                        'stroke-width': s.a.TOPIC_SELECTBOX_STROKE_WIDTH,
                        stroke: '#2ebdff',
                        fill: 'none',
                    },
                };
            }
            size(e, t) {
                this.figure.setSize({ width: e, height: t });
            }
            path(e) {
                var t;
                this.figure.setTopicSelectBoxPath(e);
                const i = !this.getContext().config(
                        r.CONFIG.NO_TOPIC_CUSTOM_WIDTH_BTN
                    ),
                    n = !(null === (t = this.refView.parent()) || void 0 === t
                        ? void 0
                        : t.originBranchView);
                i &&
                    n &&
                    (this.renderCustomWidthControlBar(),
                    this._topicSelectBoxDrag ||
                        ((this._topicSelectBoxDrag = new a(this)),
                        this._topicSelectBoxDrag.init()));
            }
            attr(e, t) {
                this.figure.setTopicSelectBoxAttr({ [e]: t });
            }
            hover() {
                this.figure.setHover();
            }
            active() {
                this.figure.setActive();
            }
            hide() {
                this.figure.setHide();
            }
            defocus() {
                this.figure.setDefocus();
            }
            intersect() {
                this.figure.setIntersect();
            }
            renderCustomWidthControlBar(e) {
                const { _barWidth: t, _padding: i, _selectboxWidth: n } = this,
                    r = this.refView,
                    o = ((r.figure.borderWidth || 0) + n) / 2,
                    a = e || Object(c.isFixedAspectShapeBranch)(r.parent()),
                    s = this.getDrawBounds(),
                    l = s.y - o - i + n / 2,
                    d = s.x - o - i,
                    f = s.x + s.width + o + i;
                (this.figure.setLeftBarAttr(
                    {
                        x: d - t / 2,
                        y: l,
                        height: s.height + 2 * i,
                        width: t,
                    },
                    a
                ),
                    this.figure.setRightBarAttr(
                        {
                            x: f - t / 2,
                            y: l,
                            height: s.height + 2 * i,
                            width: t,
                        },
                        a
                    ));
            }
            getDrawBounds(e) {
                const t = this.refView,
                    i = t.figure.borderWidth || 0,
                    n = Object(o.a)(t.figure.shapeClass),
                    r = Object.assign({}, t.shapeBounds),
                    a = r;
                if (void 0 !== e) {
                    const t = e - r.width;
                    a.width += t;
                }
                return n.getDrawBounds(a, i);
            }
            getNewPositionAfterChangeWidth(e, t) {
                const i = this.refView,
                    n = i.parent(),
                    r = null == n ? void 0 : n.getRealPosition(),
                    o = i.getContext().getSVGView(),
                    a = o.getCoordinateTransfer().mindMapToViewport(r);
                e === this.SIDE.LEFT
                    ? (a.x -= (t * o.currentScale) / 2)
                    : (a.x += (t * o.currentScale) / 2);
                const { x: s, y: l } = o
                    .getCoordinateTransfer()
                    .viewportToMindMap(a);
                return { x: s, y: l };
            }
            remove() {
                return (
                    this.stopListening(),
                    this.figure.dispose(),
                    this.parent(null),
                    this
                );
            }
        }
    },
];
