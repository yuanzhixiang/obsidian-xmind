export default [
    function (e, t, i) {
        'use strict';
        var n,
            r = i(0),
            o = i(5),
            a = i(14),
            s = i(1),
            l = i(15),
            c = i(40),
            d = i(39);
        !(function (e) {
            ((e.startPoint = '0'), (e.endPoint = '1'));
        })(n || (n = {}));
        const f = 60,
            h = [
                r.TOPIC_TYPE.ATTACHED,
                r.TOPIC_TYPE.DETACHED,
                r.TOPIC_TYPE.CALLOUT,
                r.TOPIC_TYPE.SUMMARY,
            ];
        function p(e) {
            e.hide();
        }
        t.a = class {
            init(e) {
                (this.bindControlDraggable(e),
                    this.bindEndDraggable(e),
                    this.getAllBoundaryPolygonData(e));
            }
            getAllBranchViewList(e) {
                const t = e.getContext().getSheetView().getCentralBranchView();
                return [t, ...t.getDescendantBranchesByType(h)];
            }
            getAllBoundayViewList(e) {
                const t = e.getContext().getSVGView().model2View;
                return Object.values(t).filter((e) => e instanceof c.a);
            }
            filterHiddenView(e) {
                return e.filter((e) => !e.targetView.shouldHide());
            }
            getAllTopicPolygonData(e, t) {
                return this.getAllBranchViewList(e).map((e) => {
                    const i = e.getRealPosition(),
                        {
                            x: n,
                            y: r,
                            width: o,
                            height: a,
                        } = e.topicView.bounds,
                        { boundaryBounds: l } = e;
                    return t && Object(s.isInBoundary)(e)
                        ? {
                              targetView: e,
                              pointList: [
                                  {
                                      x: i.x + Math.max(n - f, l.x),
                                      y: i.y + Math.max(r - f, l.y),
                                  },
                                  {
                                      x:
                                          i.x +
                                          Math.min(n + o + f, l.x + l.width),
                                      y: i.y + Math.max(r - f, l.y),
                                  },
                                  {
                                      x:
                                          i.x +
                                          Math.min(n + o + f, l.x + l.width),
                                      y:
                                          i.y +
                                          Math.min(r + a + f, l.y + l.height),
                                  },
                                  {
                                      x: i.x + Math.max(n - f, l.x),
                                      y:
                                          i.y +
                                          Math.min(r + a + f, l.y + l.height),
                                  },
                              ],
                          }
                        : {
                              targetView: e,
                              pointList: [
                                  {
                                      x: i.x + n - f,
                                      y: i.y + r - f,
                                  },
                                  {
                                      x: i.x + n + o + f,
                                      y: i.y + r - f,
                                  },
                                  {
                                      x: i.x + n + o + f,
                                      y: i.y + r + a + f,
                                  },
                                  {
                                      x: i.x + n - f,
                                      y: i.y + r + a + f,
                                  },
                              ],
                          };
                });
            }
            getAllBoundaryPolygonData(e) {
                return this.getAllBoundayViewList(e).map((e) => {
                    const { BOUNDARYGAP: t } = s.layoutConstant,
                        i = t + 5,
                        n = t + 5,
                        { size: r } = e,
                        o = r.width / 2,
                        a = r.height / 2,
                        c = Object(l.b)(e.getRealPosition(), {
                            x: o,
                            y: a,
                        });
                    return {
                        targetView: e,
                        pointList: [
                            { x: c.x - o - n, y: c.y - a - n },
                            { x: c.x + o + n, y: c.y - a - n },
                            { x: c.x + o + n, y: c.y + a + n },
                            { x: c.x - o - n, y: c.y + a + n },
                        ],
                        innerPointList: [
                            { x: c.x - o + i, y: c.y - a + i },
                            { x: c.x + o - i, y: c.y - a + i },
                            { x: c.x + o - i, y: c.y + a - i },
                            { x: c.x - o + i, y: c.y + a - i },
                        ],
                    };
                });
            }
            getRelationshipLineType(e) {
                return e.figure.lineStyle;
            }
            getInPolygonIntersection(e, t, i, n) {
                let r = null;
                for (let s = 0; s < n.length; s++) {
                    const c = n[s];
                    if (
                        (!c.innerPointList ||
                            !Object(l.i)(i, c.innerPointList)) &&
                        Object(l.i)(i, c.pointList)
                    ) {
                        const { targetView: n } = c,
                            s = n.getRealPosition();
                        let d = a.a.topicInsectLine(n, i);
                        const f = Object(l.l)(
                                t[
                                    'start' === e
                                        ? 'relativeDistance1'
                                        : 'relativeDistance2'
                                ]
                            ),
                            h = t.getBranchOffset(e, n),
                            p = a.a.getRelationshipOffsetPoint(
                                n,
                                d,
                                Object(l.b)(d, f),
                                h
                            ),
                            T = Object(o.j)(d, s),
                            u = Object(o.j)(i, s) - T;
                        (!r || u < r.distance) &&
                            (r = {
                                targetView: n,
                                distance: u,
                                insectPos: p,
                                originInsectPos: d,
                            });
                    }
                }
                return r;
            }
            dragEndPoint1(e, t, i, n, r) {
                const o = this.getRelationshipLineType(e);
                (Object(d.a)(o).updatePath(e, t, i, n, r),
                    e.renderTitleText({
                        insectPoint1: t,
                        insectPoint2: i,
                        controlPoint1: n,
                        controlPoint2: r,
                    }),
                    e.startPoint1Package.translate(t.x, t.y));
                const a = `M ${t.x} ${t.y}L ${n.x} ${n.y}`;
                (e.controlPoint1Package.translate(n.x, n.y),
                    e.setControlLine1Path(a));
            }
            dragEndPoint2(e, t, i, n, r) {
                const o = this.getRelationshipLineType(e);
                (Object(d.a)(o).updatePath(e, t, i, n, r),
                    e.renderTitleText({
                        insectPoint1: t,
                        insectPoint2: i,
                        controlPoint1: n,
                        controlPoint2: r,
                    }),
                    e.startPoint2Package.translate(i.x, i.y));
                const a = `M ${i.x} ${i.y}L ${r.x} ${r.y}`;
                (e.controlPoint2Package.translate(r.x, r.y),
                    e.setControlLine2Path(a));
            }
            fixZigzagControlPoint(e, t, i, r, o, s, c, d = !1) {
                let f = Object.assign({}, s);
                const h = e === n.startPoint;
                if (d) {
                    const e = h ? t.end1View : t.end2View,
                        i = e.getRealPosition();
                    let n = this.getRayDirection(r, i);
                    const o = a.a.branchRayCast(e, r, n);
                    if (o) {
                        f = Object.assign({}, o);
                        const i = t.getBranchOffset(h ? 'start' : 'end', e),
                            r = Object(l.b)(o, Object(l.l)(Object(l.n)(n), i));
                        (Object.assign(s, r),
                            t[h ? 'startPoint1Package' : 'startPoint2Package']
                                .cx(s.x)
                                .cy(s.y));
                    }
                }
                const p = Object(l.e)(i, s);
                (Math.abs(p.x) > Math.abs(p.y)
                    ? ((r.x = i.x), (r.y = s.y), (o.x = i.x), (o.y = c.y))
                    : ((r.x = s.x), (r.y = i.y), (o.x = c.x), (o.y = i.y)),
                    t[
                        h ? 'controlPoint1Package' : 'controlPoint2Package'
                    ].translate(r.x, r.y),
                    t[
                        h ? 'controlPoint2Package' : 'controlPoint1Package'
                    ].translate(o.x, o.y));
                const T = `M ${c.x} ${c.y}L ${o.x} ${o.y}`;
                return (
                    t[h ? 'setControlLine2Path' : 'setControlLine1Path'](T),
                    f
                );
            }
            getRayDirection(e, t) {
                const i = Object(l.e)(e, t);
                let n = null;
                return (
                    (n =
                        Math.abs(i.x) < Math.abs(i.y)
                            ? { x: 0, y: i.y < 0 ? -1 : 1 }
                            : { x: i.x < 0 ? -1 : 1, y: 0 }),
                    n
                );
            }
            updateAllPosition(e, t, i, n, r) {
                (e.model.changeLineEndPosition({
                    [t]: { x: i.x - r.x, y: i.y - r.y },
                }),
                    e.model.changeControlPosition({
                        [t]: { x: n.x - r.x, y: n.y - r.y },
                    }));
            }
            bindControlDraggable(e) {
                let t, i, o, a, s, c, f, h, T, u;
                const g = e;
                let Q;
                const m = e.getModule(r.MODULE_NAME.SVG_DRAGGABLE);
                if (!m) return;
                const b = () => {
                        const { end1View: n, end2View: l } = g;
                        ((t = null == n ? void 0 : n.getRealPosition()),
                            (i = null == l ? void 0 : l.getRealPosition()),
                            ({
                                insectPoint1: T,
                                insectPoint2: u,
                                controlPoint1: o,
                                controlPoint2: a,
                                lineEndPoint1: s,
                                lineEndPoint2: c,
                            } = g.posInfo),
                            (Q = this.getRelationshipLineType(g)));
                        const d = g
                            .getContext()
                            .getModule(r.MODULE_NAME.SELECTION);
                        (d.getSelections().includes(g) || d.selectSingle(g),
                            g.setPointerEventsNone(!0),
                            e
                                .getContext()
                                .trigger(
                                    r.EVENTS
                                        .RELATIONSHIP_CONTROL_POINT_DRAG_START
                                ));
                    },
                    C = () => {
                        if (!g.model.hasFullLineEndPositionData()) {
                            const { lineEndPoint1: e, lineEndPoint2: r } =
                                g.posInfo;
                            g.model.changeLineEndPosition({
                                [n.startPoint]: Object(l.t)(e, t),
                                [n.endPoint]: Object(l.t)(r, i),
                            });
                        }
                    };
                (m
                    .draggable(g.controlPoint1Package, {
                        draggingMask: !0,
                    })
                    .dragStart(() => {
                        (b(), C(), g.setIsDraggingControlPoint1(!0));
                    })
                    .dragMove((e) => {
                        const { x: t, y: i } = e;
                        if (
                            ((o.x = t),
                            (o.y = i),
                            Q === r.RELATIONSHIPSHAPE.ZIGZAG)
                        )
                            f = this.fixZigzagControlPoint(
                                n.startPoint,
                                g,
                                { x: t, y: i },
                                o,
                                a,
                                T,
                                u,
                                !0
                            );
                        else {
                            const {
                                x: e,
                                y: t,
                                tangentX: i,
                                tangentY: n,
                            } = g.intersectOriginPointWithTopic('start', s);
                            ((f = { x: e, y: t }),
                                (T = g.applyIntersectOriginPointOffset(
                                    'start',
                                    {
                                        x: e,
                                        y: t,
                                        tangentX: i,
                                        tangentY: n,
                                    },
                                    o
                                )));
                        }
                        (Object(d.a)(Q).updatePath(g, T, u, o, a),
                            g.renderTitleText({
                                insectPoint1: T,
                                insectPoint2: u,
                                controlPoint1: o,
                                controlPoint2: a,
                            }),
                            g.startPoint1Package.translate(T.x, T.y),
                            (g.relativeDistance1 = {
                                x: o.x - T.x,
                                y: o.y - T.y,
                            }));
                        const l = `M ${T.x} ${T.y}L ${o.x} ${o.y}`;
                        g.setControlLine1Path(l);
                    })
                    .dragEnd(() => {
                        (p(g.callService('getViewPortCover')),
                            g.setIsDraggingControlPoint1(!1),
                            g.model.changeControlPosition({
                                [n.startPoint]: {
                                    x: o.x - t.x,
                                    y: o.y - t.y,
                                },
                            }),
                            Q === r.RELATIONSHIPSHAPE.ZIGZAG &&
                                (g.model.changeControlPosition({
                                    [n.endPoint]: {
                                        x: a.x - i.x,
                                        y: a.y - i.y,
                                    },
                                }),
                                g.model.changeLineEndPosition({
                                    [n.startPoint]: Object(l.t)(f, t),
                                })),
                            g.setPointerEventsNone(!1),
                            e
                                .getContext()
                                .trigger(
                                    r.EVENTS.RELATIONSHIP_CONTROL_POINT_DRAG_END
                                ));
                    }),
                    m
                        .draggable(g.controlPoint2Package, {
                            draggingMask: !0,
                        })
                        .dragStart(() => {
                            (b(), C(), g.setIsDraggingControlPoint2(!0));
                        })
                        .dragMove((e) => {
                            const { x: t, y: i } = e;
                            if (
                                ((a.x = t),
                                (a.y = i),
                                Q === r.RELATIONSHIPSHAPE.ZIGZAG)
                            )
                                h = this.fixZigzagControlPoint(
                                    n.endPoint,
                                    g,
                                    { x: t, y: i },
                                    a,
                                    o,
                                    u,
                                    T,
                                    !0
                                );
                            else {
                                const {
                                    x: e,
                                    y: t,
                                    tangentX: i,
                                    tangentY: n,
                                } = g.intersectOriginPointWithTopic('end', c);
                                ((h = { x: e, y: t }),
                                    (u = g.applyIntersectOriginPointOffset(
                                        'end',
                                        {
                                            x: e,
                                            y: t,
                                            tangentX: i,
                                            tangentY: n,
                                        },
                                        a
                                    )));
                            }
                            (Object(d.a)(Q).updatePath(g, T, u, o, a),
                                g.renderTitleText({
                                    insectPoint1: T,
                                    insectPoint2: u,
                                    controlPoint1: o,
                                    controlPoint2: a,
                                }),
                                g.startPoint2Package.translate(u.x, u.y),
                                (g.relativeDistance2 = {
                                    x: a.x - u.x,
                                    y: a.y - u.y,
                                }));
                            const s = `M ${u.x} ${u.y}L ${a.x} ${a.y}`;
                            g.setControlLine2Path(s);
                        })
                        .dragEnd(() => {
                            (p(g.callService('getViewPortCover')),
                                g.setIsDraggingControlPoint2(!1),
                                g.model.changeControlPosition({
                                    [n.endPoint]: {
                                        x: a.x - i.x,
                                        y: a.y - i.y,
                                    },
                                }),
                                Q === r.RELATIONSHIPSHAPE.ZIGZAG &&
                                    (g.model.changeControlPosition({
                                        [n.startPoint]: {
                                            x: o.x - t.x,
                                            y: o.y - t.y,
                                        },
                                    }),
                                    g.model.changeLineEndPosition({
                                        [n.endPoint]: Object(l.t)(h, i),
                                    })),
                                g.setPointerEventsNone(!1),
                                e
                                    .getContext()
                                    .trigger(
                                        r.EVENTS
                                            .RELATIONSHIP_CONTROL_POINT_DRAG_END
                                    ));
                        }));
            }
            bindEndDraggable(e) {
                let t,
                    i,
                    o,
                    a,
                    s,
                    c,
                    d,
                    f,
                    h,
                    p,
                    T,
                    u,
                    g,
                    Q,
                    m,
                    b = null,
                    C = !0;
                const L = e,
                    y = e.getModule(r.MODULE_NAME.SVG_DRAGGABLE);
                if (!y) return;
                const M = () => {
                    const { end1View: n, end2View: l } = L;
                    ((t = null == n ? void 0 : n.getRealPosition()),
                        (i = null == l ? void 0 : l.getRealPosition()),
                        ({
                            insectPoint1: o,
                            insectPoint2: a,
                            controlPoint1: s,
                            controlPoint2: c,
                            lineEndPoint1: d,
                            lineEndPoint2: f,
                        } = L.posInfo),
                        (m = this.getRelationshipLineType(L)),
                        (h = Object.assign({}, s)),
                        (p = Object.assign({}, c)),
                        (T = Object.assign({}, d)),
                        (u = Object.assign({}, f)));
                    const b = L.getContext().getModule(r.MODULE_NAME.SELECTION);
                    (b.getSelections().includes(L) || b.selectSingle(L),
                        (Q = this.filterHiddenView(
                            this.getAllBoundaryPolygonData(e)
                        )),
                        (g = this.filterHiddenView(
                            this.getAllTopicPolygonData(e, !!Q.length)
                        )),
                        L.setPointerEventsNone(!0));
                };
                (y
                    .draggable(L.startPoint1Package, {})
                    .dragStart(() => {
                        (M(), L.setIsDraggingStartPoint1(!0));
                    })
                    .dragMove((t) => {
                        const { x: i, y: f } = t;
                        if (
                            (Q.length &&
                                (b = this.getInPolygonIntersection(
                                    'start',
                                    e,
                                    { x: i, y: f },
                                    Q
                                )),
                            (Q.length && b) ||
                                (b = this.getInPolygonIntersection(
                                    'start',
                                    e,
                                    { x: i, y: f },
                                    g
                                )),
                            (C =
                                !b ||
                                b.distance > 42 ||
                                b.targetView === L.end2View),
                            (c = {
                                x: a.x + L.relativeDistance2.x,
                                y: a.y + L.relativeDistance2.y,
                            }),
                            C)
                        )
                            ((s = {
                                x: i + L.relativeDistance1.x,
                                y: f + L.relativeDistance1.y,
                            }),
                                m === r.RELATIONSHIPSHAPE.ZIGZAG &&
                                    this.fixZigzagControlPoint(
                                        n.startPoint,
                                        L,
                                        s,
                                        s,
                                        c,
                                        { x: i, y: f },
                                        a
                                    ),
                                this.dragEndPoint1(L, { x: i, y: f }, a, s, c));
                        else {
                            const { insectPos: e, originInsectPos: t } = b;
                            ((o = e),
                                (s = Object(l.b)(o, L.relativeDistance1)),
                                Object.assign(d, t),
                                m === r.RELATIONSHIPSHAPE.ZIGZAG &&
                                    this.fixZigzagControlPoint(
                                        n.startPoint,
                                        L,
                                        s,
                                        s,
                                        c,
                                        o,
                                        a
                                    ),
                                this.dragEndPoint1(L, o, a, s, c));
                        }
                    })
                    .dragEnd(() => {
                        (L.setPointerEventsNone(!1),
                            L.setIsDraggingStartPoint1(!1));
                        const e = null == b ? void 0 : b.targetView,
                            o = e && e !== L.end1View && e !== L.end2View;
                        C
                            ? this.updateAllPosition(L, n.startPoint, T, h, t)
                            : o
                              ? setTimeout(() => {
                                    const t = e.getRealPosition();
                                    (this.updateAllPosition(
                                        L,
                                        n.startPoint,
                                        d,
                                        s,
                                        t
                                    ),
                                        m === r.RELATIONSHIPSHAPE.ZIGZAG &&
                                            this.updateAllPosition(
                                                L,
                                                n.endPoint,
                                                f,
                                                c,
                                                i
                                            ),
                                        L.model.changeEndPoint({
                                            end1Id:
                                                null == e
                                                    ? void 0
                                                    : e.model.get('id'),
                                        }));
                                }, 0)
                              : (this.updateAllPosition(
                                    L,
                                    n.startPoint,
                                    d,
                                    s,
                                    t
                                ),
                                m === r.RELATIONSHIPSHAPE.ZIGZAG &&
                                    this.updateAllPosition(
                                        L,
                                        n.endPoint,
                                        f,
                                        c,
                                        i
                                    ));
                    }),
                    y
                        .draggable(L.startPoint2Package, {})
                        .dragStart(() => {
                            (M(), L.setIsDraggingStartPoint2(!0));
                        })
                        .dragMove((t) => {
                            const { x: i, y: d } = t;
                            if (
                                (Q.length &&
                                    (b = this.getInPolygonIntersection(
                                        'end',
                                        e,
                                        { x: i, y: d },
                                        Q
                                    )),
                                (Q.length && b) ||
                                    (b = this.getInPolygonIntersection(
                                        'end',
                                        e,
                                        { x: i, y: d },
                                        g
                                    )),
                                (C =
                                    !b ||
                                    b.distance > 42 ||
                                    b.targetView === L.end1View),
                                (s = {
                                    x: o.x + L.relativeDistance1.x,
                                    y: o.y + L.relativeDistance1.y,
                                }),
                                C)
                            )
                                ((c = {
                                    x: i + L.relativeDistance2.x,
                                    y: d + L.relativeDistance2.y,
                                }),
                                    m === r.RELATIONSHIPSHAPE.ZIGZAG &&
                                        this.fixZigzagControlPoint(
                                            n.endPoint,
                                            L,
                                            c,
                                            c,
                                            s,
                                            { x: i, y: d },
                                            o
                                        ),
                                    this.dragEndPoint2(
                                        L,
                                        o,
                                        { x: i, y: d },
                                        s,
                                        c
                                    ));
                            else {
                                const { insectPos: e, originInsectPos: t } = b;
                                ((a = e),
                                    (c = Object(l.b)(a, L.relativeDistance2)),
                                    Object.assign(f, t),
                                    m === r.RELATIONSHIPSHAPE.ZIGZAG &&
                                        this.fixZigzagControlPoint(
                                            n.endPoint,
                                            L,
                                            c,
                                            c,
                                            s,
                                            a,
                                            o
                                        ),
                                    this.dragEndPoint2(L, o, a, s, c));
                            }
                        })
                        .dragEnd(() => {
                            (L.setPointerEventsNone(!1),
                                L.setIsDraggingStartPoint2(!1));
                            const e = null == b ? void 0 : b.targetView,
                                o = e && e !== L.end1View && e !== L.end2View;
                            C
                                ? this.updateAllPosition(L, n.endPoint, u, p, i)
                                : o
                                  ? setTimeout(() => {
                                        const i = e.getRealPosition();
                                        (this.updateAllPosition(
                                            L,
                                            n.endPoint,
                                            f,
                                            c,
                                            i
                                        ),
                                            m === r.RELATIONSHIPSHAPE.ZIGZAG &&
                                                this.updateAllPosition(
                                                    L,
                                                    n.startPoint,
                                                    d,
                                                    s,
                                                    t
                                                ),
                                            L.model.changeEndPoint({
                                                end2Id:
                                                    null == e
                                                        ? void 0
                                                        : e.model.get('id'),
                                            }));
                                    }, 0)
                                  : (this.updateAllPosition(
                                        L,
                                        n.endPoint,
                                        f,
                                        c,
                                        i
                                    ),
                                    m === r.RELATIONSHIPSHAPE.ZIGZAG &&
                                        this.updateAllPosition(
                                            L,
                                            n.startPoint,
                                            d,
                                            s,
                                            t
                                        ));
                        }));
            }
        };
    },
];
