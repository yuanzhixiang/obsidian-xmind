export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return M;
        });
        var n = i(0),
            r = i(12),
            o = i.n(r),
            a = i(44),
            s = i(14),
            l = i(39),
            c = i(15),
            d = i(1),
            f = i(68),
            h = i(17),
            p = i(5);
        const T = 'ready',
            u = 'select_one',
            g = 'select_another',
            Q = 'finish',
            m = 'start',
            b = 'add',
            C = 'stop',
            L = n.RELATIONSHIPSHAPE.STRAIGHT,
            y = [
                { from: T, emit: m, to: u },
                { from: u, emit: b, to: g },
                { from: u, emit: C, to: T },
                { from: g, emit: b, to: Q },
                { from: g, emit: C, to: T },
                { from: Q, emit: C, to: T },
            ];
        class M extends f.a {
            constructor(e) {
                (super(),
                    (this._context = e),
                    (this._currentState = T),
                    (this._end1View = null),
                    (this._end2View = null),
                    (this._movingRelationship = null),
                    (this._stickyToAngle = !1),
                    (this._stickyEndPointCache = null),
                    (this._defaultLineStyle = null),
                    (this._mouseMovePointCache = null),
                    (this._clickBranchOrBoundaryCallback =
                        this._clickBranchOrBoundaryCallback.bind(this)),
                    (this._clickSheetCallback =
                        this._clickSheetCallback.bind(this)),
                    (this._escFn = this._escFn.bind(this)),
                    (this._mouseMoveCallback =
                        this._mouseMoveCallback.bind(this)),
                    this.listenTo(
                        this._context,
                        n.EVENTS.AFTER_SHEET_CONTENT_CHANGE,
                        () => this._onSheetContentChanged()
                    ));
            }
            isReady() {
                return this._isState(T);
            }
            start() {
                if (!this.isReady()) return;
                const e = this._context
                    .getModule(n.MODULE_NAME.SELECTION)
                    .getSelections();
                e.length > 2 ||
                    (this._transit(m),
                    e.forEach((e) => {
                        this._transit(b, { endView: e });
                    }));
            }
            cancel() {
                this._transit(C);
            }
            _transit(e, t = {}) {
                const i = y.find(
                    (t) => t.from === this._currentState && t.emit === e
                );
                if (i && this._shouldTransit(i.to, t))
                    switch (
                        ((this._currentState = i.to),
                        v(this._context, this._currentState),
                        this._currentState)
                    ) {
                        case u:
                            this._onSelectOne();
                            break;
                        case g:
                            this._onSelectAnother(t);
                            break;
                        case Q:
                            this._onFinish(t);
                            break;
                        case T:
                            this._onReady();
                    }
            }
            _shouldTransit(e, t) {
                const i = `_should${R(`_${e}`)}`;
                return !this[i] || this[i](t);
            }
            _isState(e) {
                return e === this._currentState;
            }
            _bindModifierKeyEventHandler() {
                o()('body')
                    .on('keydown.addRelationship', (e) => {
                        (27 === e.which && this._escFn(),
                            16 === e.which &&
                                ((this._stickyToAngle = !0),
                                this._createRelationshipByMouse(
                                    this._movingRelationship,
                                    this._end1View
                                )));
                    })
                    .on('keyup.addRelationship', (e) => {
                        16 === e.which &&
                            ((this._stickyToAngle = !1),
                            this._createRelationshipByMouse(
                                this._movingRelationship,
                                this._end1View
                            ));
                    });
            }
            _unbindModifierKeyEventHandler() {
                o()('body')
                    .off('keydown.addRelationship')
                    .off('keyup.addRelationship');
            }
            _onSelectOne() {
                (this._context
                    .getModule(n.MODULE_NAME.SEMAPHORE)
                    .increase(n.UI_STATUS.ADD_RELATIONSHIP),
                    A(
                        this._context,
                        n.VIEW_TYPE.BRANCH,
                        this._clickBranchOrBoundaryCallback
                    ),
                    A(
                        this._context,
                        n.VIEW_TYPE.BOUNDARY,
                        this._clickBranchOrBoundaryCallback
                    ),
                    A(this._context, n.VIEW_TYPE.SVG, this._clickSheetCallback),
                    this._bindModifierKeyEventHandler(),
                    document.addEventListener(
                        'mousemove',
                        this._mouseMoveCallback
                    ));
            }
            _shouldSelectAnother(e = {}) {
                return !!e.endView;
            }
            _onSelectAnother(e = {}) {
                this._end1View = e.endView;
                const t = this._context.getSVGView();
                ((this._movingRelationship = x(this._context, t, e.endView)),
                    (this._defaultLineStyle =
                        this._movingRelationship.figure.lineStyle));
            }
            _shouldFinish(e = {}) {
                return !(
                    !e.endView ||
                    !this._end1View ||
                    this._end1View === e.endView
                );
            }
            _onFinish(e = {}) {
                ((this._end2View = e.endView),
                    this._movingRelationship.model.removeSelf(),
                    this._movingRelationship.remove(),
                    (this._movingRelationship = null));
                const t = this._addRelationship(
                        this._context,
                        this._end1View,
                        this._end2View
                    ),
                    i = this._end1View,
                    r = this._end2View,
                    o = Object.assign({}, this._stickyEndPointCache),
                    a = this._stickyToAngle ? L : this._defaultLineStyle,
                    s = this._stickyToAngle;
                if (
                    (this._context.afterRender().then(() => {
                        if (s) {
                            const e = this._calcLineEndPointsByEndViews(
                                i,
                                r,
                                o
                            );
                            t.changeLineEndPosition(e);
                        }
                        t.changeStyle(n.STYLE_KEYS.SHAPE_CLASS, a);
                    }),
                    (this._stickyToAngle = !1),
                    (this._stickyEndPointCache = null),
                    (this._defaultLineStyle = null),
                    (this._mouseMovePointCache = null),
                    !e.selectNewTopic)
                ) {
                    const e =
                        this._context.getSVGView().model2View[t.get('id')];
                    this._context
                        .getModule(n.MODULE_NAME.SELECTION)
                        .selectSingle(e);
                }
                this._transit(C);
            }
            _calcLineEndPointsByEndViews(e, t, i) {
                const n = s.a.topicInsectLine(e, i),
                    r = e.getRealPosition(),
                    o = Object(c.e)(r, n),
                    a = (
                        t instanceof h.a
                            ? s.a.branchRayCast
                            : s.a.boundaryRayCast
                    )(t, n, o),
                    l = null != a ? a : s.a.topicInsectLine(t, r),
                    d = t.getRealPosition();
                return { 0: o, 1: Object(c.e)(d, l) };
            }
            _onReady() {
                ((this._end1View = null),
                    (this._end2View = null),
                    this._movingRelationship &&
                        (this._movingRelationship.model.removeSelf(),
                        this._movingRelationship.remove(),
                        (this._movingRelationship = null)),
                    document.removeEventListener(
                        'mousemove',
                        this._mouseMoveCallback
                    ),
                    this._context.offEvent(
                        'click',
                        n.VIEW_TYPE.BRANCH,
                        this._clickBranchOrBoundaryCallback
                    ),
                    this._context.offEvent(
                        'click',
                        n.VIEW_TYPE.BOUNDARY,
                        this._clickBranchOrBoundaryCallback
                    ),
                    this._context.offEvent(
                        'click',
                        n.VIEW_TYPE.SVG,
                        this._clickSheetCallback
                    ),
                    this._unbindModifierKeyEventHandler(),
                    this._context
                        .getModule(n.MODULE_NAME.SEMAPHORE)
                        .decrease(n.UI_STATUS.ADD_RELATIONSHIP));
            }
            _mouseMoveCallback(e) {
                if (this._isState(g) && this._movingRelationship) {
                    const t = this._context.getSVGView(),
                        i = this._context.getDragEventClientPosition(e);
                    (this._context.isDoughnutPlatform() &&
                        (i.y +=
                            this._context.getDoughnutExportInfo().headerHeight),
                        (this._mouseMovePointCache = t
                            .getCoordinateTransfer()
                            .viewportToMindMap(Object.assign({}, i))),
                        this._createRelationshipByMouse(
                            this._movingRelationship,
                            this._end1View
                        ));
                }
            }
            _computeStickyPointIfCloseToSpecificDeg(e, t) {
                const { x: i, y: n } = Object(c.e)(e, t),
                    r = (180 * Math.atan(n / i)) / Math.PI,
                    o = 45 * Math.round(r / 45) - r;
                return Math.abs(o) < 5 ? Object(c.q)(t, e, o) : t;
            }
            _createRelationshipByMouse(e, t) {
                let i, n;
                if (
                    ((this._stickyEndPointCache = null),
                    !this._mouseMovePointCache)
                )
                    return;
                e.figure.setLineStyle(
                    this._stickyToAngle ? L : this._defaultLineStyle
                );
                const r = t.realPosition;
                ((n = this._computeStickyPointIfCloseToSpecificDeg(
                    r,
                    this._mouseMovePointCache
                )),
                    (i = s.a.topicInsectLine(t, n)),
                    (this._stickyEndPointCache = n));
                const { x: o, y: a } = Object(c.e)(i, n),
                    d = Object(c.o)({ x: o / 3, y: a / 3 }, Object(p.e)(30)),
                    f = { x: i.x + d.x, y: i.y + d.y },
                    h = { x: n.x - d.x, y: n.y - d.y },
                    T = e.figure.lineStyle;
                (Object(l.a)(T).updatePath(e, i, n, f, h),
                    e.setPointerEventsNone(!0));
            }
            _clickBranchOrBoundaryCallback(e) {
                return (this._transit(b, { endView: e.sbView }), !1);
            }
            _clickSheetCallback(e) {
                const t = this._addFloatingTopic(e, this._stickyEndPointCache);
                return (
                    this._transit(b, {
                        endView: t,
                        selectNewTopic: !0,
                    }),
                    !1
                );
            }
            _escFn() {
                this._transit(C);
            }
            _onSheetContentChanged() {
                if (this._isState(g))
                    return this._end1View.model.parent()
                        ? void 0
                        : this.cancel();
            }
            _addFloatingTopic(e, t) {
                const i = this._context.getSheetModel().rootTopic(),
                    r = i.createEmptyTopic({
                        title: this._context.getTranslatedText(
                            'DEFAULT_FLOATING_TOPIC_TITLE'
                        ),
                        titleUnedited: !0,
                    });
                return (
                    r.set(
                        'position',
                        null != t
                            ? t
                            : this._context
                                  .getSVGView()
                                  .getCoordinateTransfer()
                                  .viewportToMindMap(
                                      this._context.getDragEventClientPosition(
                                          e
                                      )
                                  )
                    ),
                    i.addChildTopic(r, {
                        type: n.TOPIC_TYPE.DETACHED,
                    }),
                    this._context.getSVGView().model2View[r.get('id')]
                );
            }
            _addRelationship(e, t, i) {
                const n = t.model.get('id'),
                    r = i.model.get('id'),
                    o = e.getSheetModel(),
                    a = {
                        id: o.generateComponentId(),
                        end1Id: n,
                        end2Id: r,
                        controlPoints: S(t, i),
                    };
                return o.addRelationship(a);
            }
        }
        M.identifier = n.MODULE_NAME.ADD_RELATIONSHIP;
        const A = (e, t, i) => {
                const n = 'click';
                return (e.onEvent(n, t, i), () => e.offEvent(n, t, i));
            },
            v = (e, t) => {
                const i = {
                    [T]: 'default',
                    [u]: 'pointer',
                    [g]: 'pointer',
                    [Q]: 'default',
                };
                e.getSVGView().svg.style('cursor', i[t]);
            },
            E = 150;
        function _(e) {
            if (Object(d.isBranch)(e))
                return Object(d.isDetachedBranch)(e)
                    ? e.model.getPosition()
                    : e.getRealPosition();
            {
                const t = e.getRealPosition(),
                    i = e.figure.size;
                return {
                    x: t.x + i.width / 2,
                    y: t.y + i.height / 2,
                };
            }
        }
        function O(e) {
            return Object(d.isBranch)(e)
                ? Object.assign({}, e.topicView.bounds)
                : e.figure.size;
        }
        function S(e, t) {
            const i = _(e),
                n = _(t),
                r = Math.abs(i.x - n.x),
                o = r - (O(e).width + (O(t).width || 78)) / 2,
                a = Math.abs(i.y - n.y),
                s = (30 / 180) * Math.PI;
            let l = { angle: s, amount: 0.33 },
                c = { angle: s, amount: 0.33 };
            let d;
            o < 0
                ? a < E + 50 && (d = i.x >= 0 ? '3' : '4')
                : o <= E && a < E + 50 && (d = i.y >= 0 ? '1' : '2');
            const f = 0.618 * Math.min(r, 600),
                h = Math.max(66 + O(e).width / 2, 0.75 * Math.min(a, 600)),
                p = Math.max(
                    66 + (O(t).width || 100) / 2,
                    0.75 * Math.min(a, 600)
                ),
                T = 0.5 * a;
            switch (d) {
                case '1':
                    ((l = { x: 0, y: f }), (c = { x: 0, y: f }));
                    break;
                case '2':
                    ((l = { x: 0, y: -f }), (c = { x: 0, y: -f }));
                    break;
                case '3':
                    ((l = { x: h, y: 0 }), (c = { x: p, y: 0 }));
                    break;
                case '4':
                    ((l = { x: -h, y: 0 }), (c = { x: -p, y: 0 }));
                    break;
                case '5':
                    ((l = { x: -T, y: T }), (c = { x: T, y: -T }));
                    break;
                case '6':
                    ((l = { x: T, y: -T }), (c = { x: -T, y: T }));
                    break;
                case '7':
                    ((l = { x: 0, y: (2 * a) / 3 }),
                        (c = { x: 0, y: (2 * -a) / 3 }));
                    break;
                case '8':
                    ((l = { x: 0, y: (2 * -a) / 3 }),
                        (c = { x: 0, y: (2 * a) / 3 }));
            }
            return { 0: l, 1: c };
        }
        const x = (e, t, i) => {
                const n = t.content(),
                    r = e.getSheetModel(),
                    o = r.createComponent('relationship', {});
                o.parent(r);
                const s = new a.a(o, !0);
                return (
                    s.parent(n),
                    s.initStyle(),
                    s.titleView.setVisible(!1),
                    s
                );
            },
            R = (e) =>
                e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, i, n) =>
                    i ? i.toUpperCase() : t.toLowerCase()
                );
    },
];
