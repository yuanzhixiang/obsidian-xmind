export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return c;
        });
        var n = i(0),
            r = i(4),
            o = i(1),
            a = i(11),
            s = i(26),
            l = i.n(s);
        class c {
            constructor(e) {
                this._context = e;
            }
            draggable(e, t) {
                return new m(this._context, t, e);
            }
        }
        function d(e) {
            let t = 1;
            const i = e.doc();
            let n = e.parent;
            for (; n !== i; ) ((t *= n.transform().scaleX), (n = n.parent));
            return t;
        }
        function f(e) {
            return 'function' == typeof e;
        }
        c.identifier = n.MODULE_NAME.SVG_DRAGGABLE;
        const h = 'touchstart',
            p = 'touchmove',
            T = 'touchend',
            u = 'mousedown',
            g = 'mousemove',
            Q = 'mouseup';
        class m {
            constructor(e, t, i) {
                ((this._stablizeDragMove = a.a.frameStabilize(
                    (e) => this._onDragMove(e),
                    (e) => {
                        (e.preventDefault(), e.stopPropagation());
                    }
                )),
                    (this._context = e),
                    (this._options = Object.assign({}, m.defaultOption, t)),
                    (this._s$element = i),
                    (this._el = this._s$element.node),
                    (this._$mask = e.callService(
                        n.SERVICE_NAME.GET_VIEW_PORT_COVER
                    )),
                    (this._moveViewPortModule = e.getModule(
                        n.MODULE_NAME.MOVE_VIEW_PORT
                    )),
                    (this._semaphore = e.getModule(n.MODULE_NAME.SEMAPHORE)),
                    (this._backboneEvents = Object.assign({}, l.a.Events)),
                    (this._callback = {}),
                    (this._constraint = this._options.constraint || {}),
                    (this._isUseTouch = !1),
                    (this._currentDragMoveEvent = null),
                    (this._viewportMoveDistance = { x: 0, y: 0 }),
                    (this._dragEventHandler = {
                        start: {
                            [h]: (e) => this._onDragStart(e),
                            [u]: (e) => this._onMouseDown(e),
                        },
                        move: {
                            [p]: (e) => this._stablizeDragMove(e),
                            [g]: (e) => this._stablizeDragMove(e),
                        },
                        end: {
                            [T]: (e) => this._onDragEnd(e),
                            [Q]: (e) => this._onDragEnd(e),
                        },
                    }),
                    this._clearEventByType(this._el, 'start'),
                    this._initStartEventListener());
            }
            beforeDrag(e) {
                return (f(e) && (this._callback.beforeDrag = e), this);
            }
            dragStart(e) {
                return (f(e) && (this._callback.dragStart = e), this);
            }
            dragMove(e) {
                return (f(e) && (this._callback.dragMove = e), this);
            }
            dragEnd(e) {
                return (f(e) && (this._callback.dragEnd = e), this);
            }
            updateConstraint(e) {
                return ((this._constraint = e), this);
            }
            _registeEventByType(e, t) {
                const i = this._dragEventHandler[t];
                Object.entries(i).forEach(([t, i]) => {
                    e.addEventListener(t, i, { passive: !1 });
                });
            }
            _clearEventByType(e, t) {
                const i = t
                    ? this._dragEventHandler[t]
                    : Object.values(this._dragEventHandler).reduce(
                          (e, t) => Object.assign(e, t),
                          {}
                      );
                Object.entries(i).forEach(([t, i]) => {
                    e.removeEventListener(t, i);
                });
            }
            _initStartEventListener() {
                this._registeEventByType(this._el, 'start');
            }
            _onMouseDown(e) {
                if (Object(o.isMouseEventFiredByTouch)(e)) return;
                const t = this._options.threshold;
                if (0 === t) return this._onDragStart(e);
                this._options.allowMouseDownPropagation || e.stopPropagation();
                const i = (r) => {
                        const o = e.clientX - r.clientX,
                            a = e.clientY - r.clientY;
                        o * o + a * a >= t * t &&
                            (document.removeEventListener(g, i),
                            document.removeEventListener(Q, n),
                            this._onDragStart(e));
                    },
                    n = (r) => {
                        const o = e.clientX - r.clientX,
                            a = e.clientY - r.clientY;
                        (document.removeEventListener(g, i),
                            document.removeEventListener(Q, n),
                            o * o + a * a >= t * t && this._onDragEnd(e));
                    };
                (document.addEventListener(g, i, { passive: !1 }),
                    document.addEventListener(Q, n, {
                        passive: !1,
                    }));
            }
            _onDragStart(e) {
                (e.stopPropagation(),
                    this._setIsDragStartByTouch(e),
                    this._callback.beforeDrag && this._callback.beforeDrag(e),
                    this._options.draggingMask && this._$mask.show(),
                    this._backboneEvents.listenTo(
                        this._context,
                        n.EVENTS.VIEW_PORT_MOVING,
                        (e, t) => {
                            if (!this._currentDragMoveEvent) return;
                            const i =
                                this._context.getSVGView().getScale() / 100;
                            ((this._viewportMoveDistance.x += e / i),
                                (this._viewportMoveDistance.y += t / i),
                                this._onDragMove(this._currentDragMoveEvent));
                        }
                    ));
                const t = this._s$element;
                let i = t.bbox();
                (t instanceof r.a.G
                    ? ((i.x = t.x()), (i.y = t.y()))
                    : t instanceof r.a.Nested &&
                      (i = {
                          x: t.x(),
                          y: t.y(),
                          width: t.width(),
                          height: t.height(),
                      }),
                    (t.startEvent = e));
                const o = this._context.getDragEventClientPosition(e);
                ((t.startPosition = {
                    x: i.x,
                    y: i.y,
                    width: i.width,
                    height: i.height,
                    zoom: d(t),
                    rotation: (t.transform('rotation') * Math.PI) / 180,
                    pageX: o.x,
                    pageY: o.y,
                    clientX: o.x,
                    clientY: o.y,
                }),
                    this._callback.dragStart &&
                        this._callback.dragStart(
                            {
                                x: 0,
                                y: 0,
                                zoom: t.startPosition.zoom,
                            },
                            e
                        ),
                    this._semaphore.increase(n.UI_STATUS.DRAG));
                const a = this._isUseTouch ? p : g,
                    s = this._isUseTouch ? T : Q;
                (document.addEventListener(a, this._dragEventHandler.move[a], {
                    passive: !1,
                }),
                    document.addEventListener(
                        s,
                        this._dragEventHandler.end[s],
                        { passive: !1 }
                    ));
            }
            _onDragMove(e) {
                e.preventDefault();
                const t = this._s$element;
                if (t.startPosition) {
                    let i, n;
                    const r = t.startPosition.rotation,
                        o = t.startPosition.width,
                        a = t.startPosition.height,
                        s = t.startPosition.clientX,
                        l = t.startPosition.clientY,
                        c = this._context.getDragEventClientPosition(e),
                        d = t.startPosition.zoom,
                        f = 1,
                        h = { x: (c.x - s) / f, y: (c.y - l) / f };
                    ((i =
                        t.startPosition.x -
                        this._viewportMoveDistance.x +
                        (h.x * Math.cos(r) + h.y * Math.sin(r)) /
                            t.startPosition.zoom),
                        (n =
                            t.startPosition.y -
                            this._viewportMoveDistance.y +
                            (h.y * Math.cos(r) + h.x * Math.sin(-r)) /
                                t.startPosition.zoom));
                    const p = this._constraint;
                    if ('function' == typeof p) {
                        const e = p(i, n);
                        'object' == typeof e
                            ? (('boolean' != typeof e.x || e.x) &&
                                  t.x('number' == typeof e.x ? e.x : i),
                              ('boolean' != typeof e.y || e.y) &&
                                  t.y('number' == typeof e.y ? e.y : n))
                            : 'boolean' == typeof e && e && t.move(i, n);
                    } else
                        'object' == typeof p &&
                            (null !== p.minX && i < p.minX
                                ? (i = p.minX)
                                : null !== p.maxX &&
                                  i > p.maxX - o &&
                                  (i = p.maxX - o),
                            null !== p.minY && n < p.minY
                                ? (n = p.minY)
                                : null !== p.maxY &&
                                  n > p.maxY - a &&
                                  (n = p.maxY - a),
                            !1 === p.x
                                ? t.y(n)
                                : !1 === p.y
                                  ? t.x(i)
                                  : t.move(i, n));
                    ((this._currentDragMoveEvent = e),
                        this._moveViewPortModule.showMouseInViewPort({
                            x: c.x,
                            y: c.y,
                        }),
                        this._callback.dragMove &&
                            this._callback.dragMove(
                                {
                                    x: i,
                                    y: n,
                                    deltaX:
                                        h.x / d - this._viewportMoveDistance.x,
                                    deltaY:
                                        h.y / d - this._viewportMoveDistance.y,
                                    pageDeltaX: h.x,
                                    pageDeltaY: h.y,
                                    zoom: d,
                                },
                                e
                            ));
                }
            }
            _onDragEnd(e) {
                const t = this._s$element;
                (this._moveViewPortModule.stopMove(),
                    this._options.draggingMask && this._$mask.hide());
                const i = this._context.getDragEventClientPosition(
                        e,
                        this._isUseTouch
                    ),
                    r = t.startPosition.rotation,
                    o = t.startPosition.zoom,
                    a = {
                        x: i.x - t.startPosition.pageX,
                        y: i.y - t.startPosition.pageY,
                        zoom: t.startPosition.zoom,
                    },
                    s =
                        t.startPosition.x +
                        (a.x * Math.cos(r) + a.y * Math.sin(r)) /
                            t.startPosition.zoom,
                    l =
                        t.startPosition.y +
                        (a.y * Math.cos(r) + a.x * Math.sin(-r)) /
                            t.startPosition.zoom;
                ((t.startEvent = null),
                    (t.startPosition = null),
                    (this._currentDragMoveEvent = null),
                    (this._viewportMoveDistance = { x: 0, y: 0 }),
                    this._clearEventByType(document),
                    this._backboneEvents.stopListening(),
                    this._semaphore.decrease(n.UI_STATUS.DRAG),
                    this._callback.dragEnd &&
                        this._callback.dragEnd(
                            {
                                x: s,
                                y: l,
                                deltaX: a.x / o,
                                deltaY: a.y / o,
                                pageDeltaX: a.x,
                                pageDeltaY: a.y,
                                zoom: o,
                            },
                            e
                        ));
            }
            _setIsDragStartByTouch(e) {
                const t = e.type;
                'mousedown' === t
                    ? (this._isUseTouch = !1)
                    : 'touchstart' === t && (this._isUseTouch = !0);
            }
        }
        m.defaultOption = {
            threshold: 5,
            startType: 'touchstart',
            pressTime: 500,
            draggingMask: !1,
            allowMouseDownPropagation: !1,
        };
    },
];
