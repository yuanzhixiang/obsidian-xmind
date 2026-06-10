export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return T;
        });
        var n = i(0),
            r = i(5),
            o = i(12),
            a = i.n(o),
            s = i(26),
            l = i.n(s),
            c = i(15);
        const d = '.dragViewPort',
            f = 'mousemove.dragViewPort',
            h = 'mouseup.dragViewPort',
            p = {
                getTopicRectInViewPort(e, t) {
                    const i = e.getSVGView(),
                        n = i.getScale() / 100,
                        r = Object.assign({}, t.topicView.bounds),
                        o = i
                            .getCanvasControl()
                            .getCoordinateTransfer()
                            .mindMapToViewport(t.getRealPosition());
                    return {
                        x: o.x + r.x * n,
                        y: o.y + r.y * n,
                        width: r.width * n,
                        height: r.height * n,
                    };
                },
                getBranchOutOfViewPortDistance(e, t, i) {
                    const n = e.getSVGView(),
                        o = n.getScale() / 100,
                        a = Array.isArray(t) ? t : [t],
                        s = {
                            x: 1 / 0,
                            y: 1 / 0,
                            width: -1 / 0,
                            height: -1 / 0,
                        };
                    for (const t of a) {
                        const i = p.getTopicRectInViewPort(e, t);
                        ((s.x = Math.min(s.x, i.x)),
                            (s.y = Math.min(s.y, i.y)));
                    }
                    for (const t of a) {
                        const i = p.getTopicRectInViewPort(e, t);
                        ((s.width = Math.max(s.width, i.x - s.x + i.width)),
                            (s.height = Math.max(
                                s.height,
                                i.y - s.y + i.height
                            )));
                    }
                    const l = 20 * o,
                        c = n.getCanvasControl().getVisibleAreaBounds(),
                        d = e.getDoughnutExportInfo(),
                        f = d.footerHeight + d.softKeyboardHeight,
                        h = {
                            x: c.x + l,
                            y: c.y + l + d.toolbarHeight,
                            width: c.width - 2 * l,
                            height: c.height - 2 * l - f - d.toolbarHeight,
                        },
                        T = Object(r.r)(s, h),
                        u = { x: -T.width, y: -T.height };
                    if (i) {
                        const t = Object.assign(Object.assign({}, s), {
                                x: s.x + u.x,
                                y: s.y + u.y,
                            }),
                            n = a.map((t) => {
                                const i = p.getTopicRectInViewPort(e, t);
                                return Object.assign(Object.assign({}, i), {
                                    x: i.x + u.x,
                                    y: i.y + u.y,
                                });
                            }),
                            l = (e) => {
                                e = null != e ? e : { x: 0, y: 0 };
                                let t = 0;
                                for (const o of n)
                                    Object(r.k)(
                                        Object.assign(Object.assign({}, o), {
                                            x: o.x + e.x,
                                            y: o.y + e.y,
                                        }),
                                        i
                                    ) && (t += 1);
                                return t;
                            },
                            c = (e) => {
                                let t = 0;
                                for (const i of n)
                                    Object(r.k)(
                                        Object.assign(Object.assign({}, i), {
                                            x: i.x + e.x,
                                            y: i.y + e.y,
                                        }),
                                        h
                                    ) || (t += 1);
                                return t;
                            };
                        if (l() > 0) {
                            const e = 10 * o;
                            let n = e,
                                r = {
                                    x: 0,
                                    y: 0,
                                    intersect: 1 / 0,
                                    out: 1 / 0,
                                };
                            const { width: a, height: s } = t,
                                d = Math.min(
                                    Math.max(i.width + a, i.height + s),
                                    Math.max(h.width, h.height)
                                );
                            for (; n < d; ) {
                                const t = [
                                    { x: 0, y: -n },
                                    { x: -n, y: -n },
                                    { x: -n, y: 0 },
                                    { x: -n, y: n },
                                    { x: 0, y: n },
                                    { x: n, y: n },
                                    { x: n, y: 0 },
                                    { x: n, y: -n },
                                ];
                                for (const e of t) {
                                    const t = Object.assign(
                                        Object.assign({}, e),
                                        {
                                            intersect: l(e),
                                            out: c(e),
                                        }
                                    );
                                    if (0 === t.intersect && 0 === t.out)
                                        return {
                                            x: u.x + e.x,
                                            y: u.y + e.y,
                                        };
                                    (t.intersect < r.intersect ||
                                        (t.intersect === r.intersect &&
                                            t.out < r.out)) &&
                                        (r = Object.assign({}, t));
                                }
                                n += e;
                            }
                            return { x: u.x + r.x, y: u.y + r.y };
                        }
                    }
                    return u;
                },
                getMouseOutOfViewPortDirection(e, t) {
                    const i = e
                            .getSVGView()
                            .getCanvasControl()
                            .getVisibleAreaBounds(),
                        n = i.x,
                        r = i.y,
                        o = i.width + n,
                        a = i.height + r,
                        s = {
                            up: t.y < r + 20,
                            right: t.x > o - 20,
                            down: t.y > a - 20,
                            left: t.x < n + 20,
                        };
                    return new u(s);
                },
            };
        class T {
            constructor(e) {
                ((this.context = e),
                    (this.isBranchAbleAutoMove = !1),
                    (this.animateHandle = null),
                    (this.preMoveDirection = null),
                    e.on(n.EVENTS.SHEET_CONTENT_LOADED, () => {
                        ((this.svgView = e.getSVGView()),
                            (this.sheetView = e.getSheetView()),
                            (this.sheetViewElem =
                                this.svgView.svg.children()[0]),
                            this.setAbleAutoMove(!0));
                    }),
                    (this.isStop = !0),
                    (this._isMovingOut = !1),
                    (this._isInShowMouseProcess = !1));
            }
            onMouseWheel(e) {
                (void 0 === e.deltaX &&
                    e.originalEvent &&
                    (e = e.originalEvent),
                    this.tryToMoveViewPort(-e.deltaX, -e.deltaY));
            }
            tryToMoveViewPort(e, t, i = {}) {
                return (
                    (0 !== e || 0 !== t) &&
                    !this.context.config(n.CONFIG.NO_VIEW_PORT_MOVE) &&
                    (this.svgView.move(e, t, i), !0)
                );
            }
            onDragViewPort(e, t, i) {
                if (this.context.config(n.CONFIG.NO_VIEW_PORT_MOVE)) return !1;
                const r = a()(document),
                    o = { x: e.clientX, y: e.clientY };
                function s() {
                    (r.off(f), r.off(h));
                }
                (r.on(f, (e) => {
                    if (e && (1 === e.which || 3 === e.which)) {
                        const i = { x: e.clientX, y: e.clientY };
                        c.f(o, i) >= 3 &&
                            (s(),
                            this.context.isBrowniePlatform()
                                ? this.startIOSDragProcess(i)
                                : this.startDragProcess(i, t));
                    }
                }),
                    r.on(h, (e) => {
                        (s(), i && i(e));
                    }));
            }
            startDragProcess(e, t) {
                this.context
                    .getModule(n.MODULE_NAME.SEMAPHORE)
                    .increase(n.UI_STATUS.DRAG_VIEWPORT);
                const i = a()(document),
                    r = this.context.callService(
                        n.SERVICE_NAME.GET_VIEW_PORT_COVER
                    );
                r.show();
                let o = e.x,
                    s = e.y;
                (i.on(f, (e) => {
                    const { clientX: t, clientY: i } = e,
                        n = t - o,
                        r = i - s;
                    (this.svgView.move(n, r), (o = t), (s = i));
                }),
                    i.on(h, () => {
                        (i.off(d),
                            r.hide(),
                            this.context
                                .getModule(n.MODULE_NAME.SEMAPHORE)
                                .decrease(n.UI_STATUS.DRAG_VIEWPORT));
                    }));
            }
            startIOSDragProcess(e) {
                this.context
                    .getModule(n.MODULE_NAME.SEMAPHORE)
                    .increase(n.UI_STATUS.DRAG_VIEWPORT);
                const t = a()(document),
                    i = e.x,
                    r = e.y,
                    o = document.scrollingElement.scrollLeft,
                    s = document.scrollingElement.scrollTop;
                (t.on(f, (e) => {
                    const t = o - (window.brownieTouchViewPortPosition.x - i),
                        n = s - (window.brownieTouchViewPortPosition.y - r);
                    this.svgView.getCanvasControl().scrollTo(t, n);
                }),
                    t.on(h, () => {
                        (t.off(d),
                            this.context
                                .getModule(n.MODULE_NAME.SEMAPHORE)
                                .decrease(n.UI_STATUS.DRAG_VIEWPORT));
                    }));
            }
            showBranchInViewPort(e, t, i) {
                t || (t = () => {});
                if (
                    !(Array.isArray(e) ? e[0] : e).editDomain() ||
                    !this.isBranchAbleAutoMove
                )
                    return t();
                const n = p.getBranchOutOfViewPortDistance(this.context, e, i);
                if (!n.x && !n.y) return t();
                setTimeout(() => {
                    this.svgView.move(n.x, n.y, { animate: !0 });
                }, 0);
            }
            showMouseInViewPort(e, t, i) {
                if (this.context.config(n.CONFIG.NO_VIEW_PORT_MOVE)) return;
                const r = p.getMouseOutOfViewPortDirection(this.context, {
                    x: e.x,
                    y: e.y,
                });
                (t && r.setDirectionInfo(t),
                    r.isInMovingOutTriggerArea()
                        ? this._isInShowMouseProcess
                            ? r.hasSameDirection(this.preMoveDirection) ||
                              (this.stopMove(),
                              this.startShowMouseInViewPortProcess(r, i))
                            : this.startShowMouseInViewPortProcess(r, i)
                        : this.stopMove(),
                    (this.preMoveDirection = r));
            }
            setAbleAutoMove(e) {
                this.isBranchAbleAutoMove = e;
            }
            stopMove() {
                this._isInShowMouseProcess = !1;
            }
            startShowMouseInViewPortProcess(e, t) {
                this._isInShowMouseProcess = !0;
                const i = this.svgView.getDeviceNativeScale(),
                    n = () => {
                        let t = 0,
                            r = 0;
                        const o = 5 / i;
                        (e.up ? (r += o) : e.down && (r -= o),
                            e.right ? (t -= o) : e.left && (t += o),
                            (t || r) &&
                                (this.svgView.move(t, r),
                                this._isInShowMouseProcess &&
                                    window.requestAnimationFrame(n)));
                    };
                window.requestAnimationFrame(n);
            }
        }
        ((T.identifier = n.MODULE_NAME.MOVE_VIEW_PORT),
            Object.assign(T.prototype, l.a.Events));
        class u {
            constructor(e) {
                this.setDirectionInfo(e);
            }
            isInMovingOutTriggerArea() {
                return this.right || this.left || this.down || this.up;
            }
            setDirectionInfo(e) {
                ((this.right = e.right),
                    (this.left = e.left),
                    (this.down = e.down),
                    (this.up = e.up));
            }
            hasSameDirection(e) {
                return (
                    e || (e = {}),
                    this.up === e.up &&
                        this.right === e.right &&
                        this.down === e.down &&
                        this.left === e.left
                );
            }
        }
    },
];
