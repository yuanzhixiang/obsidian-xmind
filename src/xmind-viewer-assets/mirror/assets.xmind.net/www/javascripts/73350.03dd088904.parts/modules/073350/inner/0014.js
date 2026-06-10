export default [
    function (e, t, i) {
        'use strict';
        (function (e) {
            var n = i(0),
                r = i(1),
                o = i(11),
                a = i(6),
                s = i.n(a),
                l = i(27),
                c = i(42),
                d = i(48),
                f = i(77),
                h = i(5);
            const p = (e, t, i, n, r, o, a, s) =>
                    new d.a(e, t, i, n, r, o, a, s),
                T =
                    ((u = {}),
                    (e, t) => {
                        const i = (e) => e.map((e) => Object.assign({}, e));
                        if (e && !t && e in u) return i(u[e]);
                        if (e && t) {
                            if (e in u) return null;
                            if (Object.keys(u).length > 10)
                                for (const e in u) delete u[e];
                            u[e] = i(t);
                        }
                        return null;
                    });
            var u;
            const g = /data:image[\s\S]*;base64/;
            function Q(e, t) {
                const i = {};
                return (
                    e.x === t.x
                        ? (i.x = e.x)
                        : e.y === t.y
                          ? (i.y = e.y)
                          : ((i.k = (e.y - t.y) / (e.x - t.x)),
                            (i.b = e.y - e.x * i.k)),
                    i
                );
            }
            const m = {
                topicShapeToLine: {
                    [n.TOPICSHAPE.RECT]: function (e) {
                        const t = [],
                            i = e.topicView.shapeBounds.width,
                            n = e.topicView.shapeBounds.height,
                            r = e.getRealPosition();
                        return (
                            (t[0] = {
                                y: r.y - n / 2,
                                type: 'line',
                            }),
                            (t[1] = {
                                x: r.x + i / 2,
                                type: 'line',
                            }),
                            (t[2] = {
                                y: r.y + n / 2,
                                type: 'line',
                            }),
                            (t[3] = {
                                x: r.x - i / 2,
                                type: 'line',
                            }),
                            t
                        );
                    },
                    [n.TOPICSHAPE.ROUNDEDRECT]: function (e) {
                        return this[n.TOPICSHAPE.RECT](e);
                    },
                    [n.TOPICSHAPE.ELLIPSE]: function (e) {
                        const t = {},
                            i = e.shapeBounds.width,
                            n = e.shapeBounds.height,
                            r = e.getRealPosition(),
                            o = r.x,
                            a = r.y;
                        let s = i / 2,
                            l = n / 2;
                        if (s < l) {
                            const e = s;
                            ((s = l), (l = e));
                        }
                        return (
                            (t[0] = {
                                x0: o,
                                y0: a,
                                a: s,
                                b: l,
                                type: 'arc',
                            }),
                            t
                        );
                    },
                    [n.TOPICSHAPE.DIAMOND]: function (e) {
                        const t = {},
                            i = e.shapeBounds.width,
                            n = e.shapeBounds.height,
                            r = e.getRealPosition();
                        let o, a, s;
                        return (
                            (o = { x: r.x, y: r.y - n / 2 }),
                            (a = { x: r.x - i / 2, y: r.y }),
                            (s = Q(o, a)),
                            (s.type = 'line'),
                            (t[0] = s),
                            (o = { x: r.x, y: r.y - n / 2 }),
                            (a = { x: r.x + i / 2, y: r.y }),
                            (s = Q(o, a)),
                            (s.type = 'line'),
                            (t[1] = s),
                            (o = { x: r.x, y: r.y + n / 2 }),
                            (a = { x: r.x + i / 2, y: r.y }),
                            (s = Q(o, a)),
                            (s.type = 'line'),
                            (t[2] = s),
                            (o = { x: r.x, y: r.y + n / 2 }),
                            (a = { x: r.x - i / 2, y: r.y }),
                            (s = Q(o, a)),
                            (s.type = 'line'),
                            (t[3] = s),
                            t
                        );
                    },
                    [n.TOPICSHAPE.ELLISPEDIALOG]: function (e) {
                        return this[n.TOPICSHAPE.ELLIPSE](e);
                    },
                    [n.TOPICSHAPE.RECTANGLEDIALOG]: function (e) {
                        return this[n.TOPICSHAPE.RECT](e);
                    },
                    [n.TOPICSHAPE.UNDERLINE]: function (e) {
                        return this[n.TOPICSHAPE.RECT](e);
                    },
                    [n.TOPICSHAPE.CIRCLE]: function (e) {
                        return this[n.TOPICSHAPE.ELLIPSE](e);
                    },
                    [n.TOPICSHAPE.PARALLELOGRAM]: function (e) {
                        return this[n.TOPICSHAPE.RECT](e);
                    },
                    [n.TOPICSHAPE.CLOUD]: function (e) {
                        return this[n.TOPICSHAPE.RECT](e);
                    },
                    [n.CALLOUTSHAPE.RECT]: function (e) {
                        return this[n.TOPICSHAPE.RECT](e);
                    },
                    [n.CALLOUTSHAPE.ROUNDEDRECT]: function (e) {
                        return this[n.TOPICSHAPE.RECT](e);
                    },
                    [n.CALLOUTSHAPE.ELLIPSE]: function (e) {
                        return this[n.TOPICSHAPE.ELLIPSE](e);
                    },
                },
                calculateDistance: function (e, t) {
                    return Math.sqrt(
                        (t.x - e.x) * (t.x - e.x) + (t.y - e.y) * (t.y - e.y)
                    );
                },
                antiPointAt: function (e, t) {
                    const i = m.getRadian(e.pointAt(1e-4)),
                        n = e.length(),
                        r = Math.log(n) / Math.log(2) + 1;
                    let o = m.getRadian(t);
                    o = o < i ? o + 2 * Math.PI : o;
                    let a,
                        s,
                        l = 0,
                        c = 0,
                        d = n;
                    for (; l < r; )
                        ((a = (d - c) / 2 + c),
                            (s = m.getRadian(e.pointAt(a))),
                            (s = s < i ? s + 2 * Math.PI : s),
                            s > o ? (d = a) : (c = a),
                            l++);
                    return a;
                },
                getRadian: function (e) {
                    const t = e.x / Math.sqrt(e.x * e.x + e.y * e.y),
                        i = Math.acos(t);
                    return e.y < 0 ? 2 * Math.PI - i : i;
                },
                angleToRadian: function (e) {
                    return (e / 180) * Math.PI;
                },
                topicInsectLine(e, t) {
                    if (!e || !t || void 0 === t.x || void 0 === !t.y)
                        throw new Error('incorrect arguments');
                    let i,
                        o,
                        a,
                        s,
                        l,
                        c,
                        d = Object.assign({}, e.getRealPosition());
                    if (e.type === n.VIEW_TYPE.BRANCH) {
                        const { topicView: t } = e;
                        ((i =
                            Object(r.isCalloutBranch)(e) &&
                            Object(r.isHandDrawnLinePattern)(
                                t.figure.borderLinePattern
                            )
                                ? Object(r.getFillPatternAttr)(
                                      t.figure.fillPattern,
                                      {
                                          fillPath: t.figure.topicShapeFillPath,
                                          isForceHandDrawnSolid: !0,
                                      }
                                  ).d
                                : t.figure.topicShapeFillPath),
                            e.isRotate() &&
                                ((s = t.topicGroup.transform()),
                                (l = Math.cos(m.angleToRadian(s.rotation))),
                                (c = Math.sin(m.angleToRadian(s.rotation)))),
                            t.figure.shapeClass === n.TOPICSHAPE.CLOUD &&
                                ((o = e.topicView.topicShapeFill.transform()),
                                (a = o)));
                    } else if (e.type === n.VIEW_TYPE.BOUNDARY) {
                        i = e.figure.boundaryPath;
                        const t = e.figure.boundaryShapeSize;
                        ((d = {
                            x: d.x + t.width / 2,
                            y: d.y + t.height / 2,
                        }),
                            (a = {
                                x: -t.width / 2,
                                y: -t.height / 2,
                            }));
                    }
                    if (!i || 0 === Object(r.getTotalLength)(i)) return t;
                    let f = { x: 0, y: 0 };
                    if (s) {
                        const e = { x: s.cx, y: s.cy };
                        f = R(f, e);
                    }
                    const h = t.x - d.x,
                        p = t.y - d.y,
                        T = Object(r.getSSP)(i),
                        u = x(T.getPointAtLength(1e-4)),
                        g = m.getRadian({
                            x: u.x - f.x,
                            y: u.y - f.y,
                        });
                    let Q = m.getRadian({ x: h - f.x, y: p - f.y });
                    Q = Q < g ? Q + 2 * Math.PI : Q;
                    const b = T.getTotalLength(),
                        C = Math.log(b) / Math.log(2) + 1;
                    let L,
                        y,
                        M,
                        A,
                        v = 0,
                        E = 0,
                        _ = b,
                        O = (_ - E) / 2 + E;
                    const S = (function () {
                        const e = x(
                            Object(r.getPointAtLength)(i, (_ - E) / 4 + E)
                        );
                        let t = m.getRadian({
                            x: e.x - f.x,
                            y: e.y - f.y,
                        });
                        t = t < g ? t + 2 * Math.PI : t;
                        const n = x(
                            Object(r.getPointAtLength)(i, ((_ - E) / 4) * 3 + E)
                        );
                        let o = m.getRadian({
                            x: n.x - f.x,
                            y: n.y - f.y,
                        });
                        return ((o = o < g ? o + 2 * Math.PI : o), o > t);
                    })()
                        ? 1
                        : -1;
                    for (; v < C; ) {
                        O = (_ - E) / 2 + E;
                        const {
                            x: e,
                            y: t,
                            tangentX: i,
                            tangentY: n,
                        } = T.getPropertiesAtLength(O);
                        ((M = i),
                            (A = n),
                            (L = x({ x: e, y: t })),
                            (y = m.getRadian({
                                x: L.x - f.x,
                                y: L.y - f.y,
                            })),
                            (y = y < g ? y + 2 * Math.PI : y),
                            y * S > Q * S ? (_ = O) : (E = O),
                            v++);
                    }
                    return {
                        at: O,
                        x: L.x + d.x,
                        y: L.y + d.y,
                        tangentX: M,
                        tangentY: A,
                    };
                    function x(e) {
                        return (
                            o &&
                                a &&
                                ((e.x = e.x * o.scaleX),
                                (e.y = e.y * o.scaleY)),
                            a && ((e.x += a.x), (e.y += a.y)),
                            s && R(e, { x: s.cx, y: s.cy }),
                            e
                        );
                    }
                    function R(e, t) {
                        const i = e.x - t.x,
                            n = e.y - t.y;
                        return (
                            (e.x = t.x + (i * l - n * c)),
                            (e.y = t.y + (i * c + n * l)),
                            e
                        );
                    }
                },
                getIntersectionNormal(e, t, i) {
                    let o = e.getRealPosition();
                    e.type === n.VIEW_TYPE.BOUNDARY &&
                        (o = {
                            x: o.x + e.size.width / 2,
                            y: o.y + e.size.height / 2,
                        });
                    let a = Object(r.normal)(i);
                    return (
                        Object(r.dot)(a, Object(r.sub)(t, o)) < 0 &&
                            (a = Object(r.reverse)(a)),
                        Object(r.normalize)(a)
                    );
                },
                shapePolygon(e) {
                    if (T(e)) return T(e);
                    const { commands: t } = new c.SVGPathData(e);
                    let i = null,
                        n = [];
                    const o = (e) => Object.assign({}, e);
                    for (let e = 0; e < t.length; e++) {
                        const T = t[e];
                        switch (T.type) {
                            case c.SVGPathData.MOVE_TO: {
                                const { x: e, y: t } = T;
                                (i || (i = { x: e, y: t }),
                                    n.push({ x: e, y: t }));
                                break;
                            }
                            case c.SVGPathData.CLOSE_PATH:
                                i && n.push(o(i));
                                break;
                            case c.SVGPathData.VERT_LINE_TO: {
                                const e = o(n[n.length - 1]);
                                n.push({
                                    x: e.x,
                                    y: T.relative ? e.y + T.y : T.y,
                                });
                                break;
                            }
                            case c.SVGPathData.HORIZ_LINE_TO: {
                                const e = o(n[n.length - 1]);
                                n.push({
                                    x: T.relative ? e.x + T.x : T.x,
                                    y: e.y,
                                });
                                break;
                            }
                            case c.SVGPathData.LINE_TO: {
                                const e = o(n[n.length - 1]);
                                let { x: t, y: i } = T;
                                (T.relative && ((t = e.x + t), (i = e.y + i)),
                                    n.push({ x: t, y: i }));
                                break;
                            }
                            case c.SVGPathData.CURVE_TO:
                            case c.SVGPathData.QUAD_TO: {
                                let {
                                    x1: e,
                                    y1: t,
                                    x2: i,
                                    y2: r,
                                    x: a,
                                    y: s,
                                } = T;
                                const l = o(n[n.length - 1]);
                                T.relative &&
                                    ((e = l.x + e),
                                    (t = l.y + t),
                                    (a = l.x + a),
                                    (s = l.y + s),
                                    i && (i = l.x + i),
                                    r && (r = l.y + r));
                                const d =
                                    T.type === c.SVGPathData.QUAD_TO
                                        ? p(l.x, l.y, e, t, a, s)
                                        : p(l.x, l.y, e, t, i, r, a, s);
                                ((n = n.concat(m.getCurvePolygon(d))),
                                    n.push({ x: a, y: s }));
                                break;
                            }
                            case c.SVGPathData.SMOOTH_CURVE_TO: {
                                const i = t[e - 1];
                                let { x2: a, y2: s, x: l, y: d } = T;
                                const f = o(n[n.length - 1]);
                                T.relative &&
                                    ((a = f.x + a),
                                    (s = f.y + s),
                                    (l = f.x + l),
                                    (d = f.y + d));
                                let h = null;
                                h =
                                    i.type !== c.SVGPathData.CURVE_TO &&
                                    i.type !== c.SVGPathData.SMOOTH_CURVE_TO
                                        ? { x: a, y: s }
                                        : Object(r.add)(
                                              f,
                                              Object(r.sub)(f, {
                                                  x: i.x2,
                                                  y: i.y2,
                                              })
                                          );
                                const u = p(f.x, f.y, h.x, h.y, a, s, l, d);
                                ((n = n.concat(m.getCurvePolygon(u))),
                                    n.push({ x: l, y: d }));
                                break;
                            }
                            case c.SVGPathData.SMOOTH_QUAD_TO: {
                                const i = t[e - 1];
                                let { x: a, y: s } = T;
                                const l = o(n[n.length - 1]);
                                T.relative && ((a = l.x + a), (s = l.y + s));
                                let d = null;
                                d =
                                    i.type === c.SVGPathData.QUAD_TO
                                        ? Object(r.add)(
                                              l,
                                              Object(r.sub)(l, {
                                                  x: i.x1,
                                                  y: i.y1,
                                              })
                                          )
                                        : { x: a, y: s };
                                const f = p(l.x, l.y, d.x, d.y, a, s);
                                ((n = n.concat(m.getCurvePolygon(f))),
                                    n.push({ x: a, y: s }));
                                break;
                            }
                            case c.SVGPathData.ARC: {
                                const e = o(n[n.length - 1]);
                                let {
                                    rX: t,
                                    rY: i,
                                    xRot: r,
                                    lArcFlag: c,
                                    sweepFlag: p,
                                    x: C,
                                    y: L,
                                } = T;
                                T.relative && ((C = e.x + C), (L = e.y + L));
                                const y =
                                    ((a = e.x),
                                    (s = e.y),
                                    (l = t),
                                    (d = i),
                                    (h = r),
                                    (u = Boolean(c)),
                                    (g = Boolean(p)),
                                    (Q = C),
                                    (b = L),
                                    new f.a(a, s, l, d, h, u, g, Q, b));
                                ((n = n.concat(m.getCurvePolygon(y))),
                                    n.push({ x: C, y: L }));
                                break;
                            }
                        }
                    }
                    var a, s, l, d, h, u, g, Q, b;
                    return (T(e, n), n);
                },
                getCurvePolygon(e) {
                    const t = e.getPropertiesAtLength(0.001),
                        i = [{ x: t.x, y: t.y }],
                        n = e.getTotalLength(),
                        o = { x: 0, y: 0 };
                    let a = Object.assign({}, t),
                        s = 0;
                    for (let t = 1; t < n; t += 5) {
                        const {
                                x: n,
                                y: l,
                                tangentX: c,
                                tangentY: d,
                            } = e.getPropertiesAtLength(t),
                            f =
                                Math.abs(
                                    Object(r.distance)({ x: c, y: d }, o)
                                ) *
                                Math.abs(
                                    Object(r.distance)(
                                        {
                                            x: a.tangentX,
                                            y: a.tangentY,
                                        },
                                        o
                                    )
                                ),
                            h =
                                Object(r.dot)(
                                    { x: c, y: d },
                                    { x: a.tangentX, y: a.tangentY }
                                ) / f;
                        ((s += (180 / Math.PI) * Math.acos(h)),
                            s > 2 && ((s = 0), i.push({ x: n, y: l })),
                            (a = {
                                x: n,
                                y: l,
                                tangentX: c,
                                tangentY: d,
                            }));
                    }
                    return i;
                },
                lineSegmentRayCast(e, t, i) {
                    const n = { x: 0, y: 0 };
                    let o = Object(r.normal)({
                        x: e.x - t.x,
                        y: e.y - t.y,
                    });
                    if (
                        (Object(r.dot)(o, Object(r.add)(e, t)) < 0 &&
                            (o = Object(r.reverse)(o)),
                        Object(r.dot)(o, i.direction) > 0)
                    )
                        return null;
                    const a = Object(r.sub)(n, i.startPoint);
                    ((e = Object(r.add)(e, a)), (t = Object(r.add)(t, a)));
                    const s = Object(r.normal)(i.direction),
                        l = Object(r.normal)({
                            x: e.x - t.x,
                            y: e.y - t.y,
                        });
                    if (0 === Object(r.cross)(s, l)) return null;
                    if (Object(r.dot)(s, e) * Object(r.dot)(s, t) > 0)
                        return null;
                    const c = i.direction.y,
                        d = i.direction.x,
                        f = Object(r.cross)(i.startPoint, n),
                        h = e.y - t.y,
                        p = e.x - t.x,
                        T = Object(r.cross)(e, t),
                        u = c * p - h * d,
                        g = {
                            x: (d * T - p * f) / u,
                            y: ((h * f - c * T) / u) * -1,
                        };
                    return Object(r.dot)(g, i.direction) < 0
                        ? null
                        : Object(r.add)(g, i.startPoint);
                },
                rayCast(e, t) {
                    const { path: i, transform: n } = e;
                    t.direction = Object(r.normalize)(t.direction);
                    const o = m.shapePolygon(i);
                    if (n) {
                        const { scale: e, translate: t } = n;
                        o.forEach((i) => {
                            (e &&
                                ((i.x = i.x * e.scaleX),
                                (i.y = i.y * e.scaleY)),
                                t && ((i.x += t.x), (i.y += t.y)));
                        });
                    }
                    let a = null,
                        s = 1 / 0;
                    for (let e = 1; e < o.length; e++) {
                        const i = m.lineSegmentRayCast(o[e - 1], o[e], t);
                        if (!i) continue;
                        const n = Object(r.distance)(i, t.startPoint);
                        if (n < s) {
                            s = n;
                            const { x: t, y: l } = Object(r.normalize)(
                                Object(r.sub)(o[e], o[e - 1])
                            );
                            a = Object.assign(Object.assign({}, i), {
                                tangentX: t,
                                tangentY: l,
                            });
                        }
                    }
                    return a;
                },
                branchRayCast(e, t, i) {
                    var o;
                    i = Object(r.normalize)(i);
                    const a =
                        null === (o = e.topicView) || void 0 === o
                            ? void 0
                            : o.figure.topicShapeFillPath;
                    if (!a) return null;
                    let s,
                        l = Object.assign({}, e.getRealPosition());
                    if (e.topicView.figure.shapeClass === n.TOPICSHAPE.CLOUD) {
                        const {
                            scaleX: t,
                            scaleY: i,
                            x: n,
                            y: r,
                        } = e.topicView.topicShapeFill.transform();
                        s = {
                            scale: { scaleX: t, scaleY: i },
                            translate: { x: n, y: r },
                        };
                    }
                    const c = Object(r.sub)(t, l);
                    let d = m.rayCast(
                        { path: a, transform: s },
                        { startPoint: c, direction: i }
                    );
                    return d
                        ? ((d = Object.assign(
                              Object.assign({}, d),
                              Object(r.add)(l, d)
                          )),
                          d)
                        : d;
                },
                boundaryRayCast(e, t, i) {
                    i = Object(r.normalize)(i);
                    const n = e.figure.boundaryPath;
                    if (!n) return null;
                    let o = Object.assign({}, e.getRealPosition());
                    const a = e.figure.boundaryShapeSize;
                    o = {
                        x: o.x + a.width / 2,
                        y: o.y + a.height / 2,
                    };
                    const s = {
                            translate: {
                                x: -a.width / 2,
                                y: -a.height / 2,
                            },
                        },
                        l = Object(r.sub)(t, o);
                    let c = m.rayCast(
                        { path: n, transform: s },
                        { startPoint: l, direction: i }
                    );
                    return c
                        ? ((c = Object.assign(
                              Object.assign({}, c),
                              Object(r.add)(o, c)
                          )),
                          c)
                        : c;
                },
                getRelationshipOffsetPoint(e, t, i, o) {
                    let a = Object(r.normalize)(Object(r.sub)(i, t));
                    const s = m.getIntersectionNormal(e, t, {
                            x: t.tangentX,
                            y: t.tangentY,
                        }),
                        l = Object(r.dot)(a, s);
                    l < 0 && (a = Object(r.reflect)(a, s));
                    let c = Object(r.add)(
                            t,
                            Object(r.normalize)(a, o * ((l + 1) / 2))
                        ),
                        d = null;
                    if (
                        (e.type === n.VIEW_TYPE.BOUNDARY
                            ? (d = m.boundaryRayCast(e, t, a))
                            : e.type === n.VIEW_TYPE.BRANCH &&
                              (d = m.branchRayCast(e, t, a)),
                        d)
                    ) {
                        const i = m.getIntersectionNormal(e, d, {
                                x: d.tangentX,
                                y: d.tangentY,
                            }),
                            n = Object.assign({}, d),
                            l =
                                Math.abs(Object(r.dot)(s, a)) /
                                (Math.abs(Object(r.dot)(s, a)) +
                                    Math.abs(Object(r.dot)(i, a)));
                        Object(h.j)(t, n) <= o / l &&
                            (c = Object(r.add)(
                                t,
                                Object(r.normalize)(a, Object(h.j)(t, n) * l)
                            ));
                    }
                    return c;
                },
                getWindowSize: function () {
                    let t, i;
                    const n = e;
                    return (
                        n.innerWidth
                            ? (t = n.innerWidth)
                            : document.body &&
                              document.body.clientWidth &&
                              (t = document.body.clientWidth),
                        n.innerHeight
                            ? (i = n.innerHeight)
                            : document.body &&
                              document.body.clientHeight &&
                              (i = document.body.clientHeight),
                        document.documentElement &&
                            document.documentElement.clientHeight &&
                            document.documentElement.clientWidth &&
                            ((i = document.documentElement.clientHeight),
                            (t = document.documentElement.clientWidth)),
                        { winWidth: t, winHeight: i }
                    );
                },
                isIntersection: function (e, t) {
                    let i,
                        n,
                        r = !1;
                    var o, a;
                    return (
                        'branch' === e.type &&
                            ((i = e.topicView.topicGroup.rbox()),
                            (n = t.rbox()),
                            (o = i),
                            ((a = n).x < o.x && a.x + a.width < o.x) ||
                                (a.x > o.x + o.width &&
                                    a.x + a.width > o.x + o.width) ||
                                (a.y < o.y && a.y + a.height < o.y) ||
                                (a.y > o.y + o.height &&
                                    a.y + a.height > o.y + o.height) ||
                                (r = !0)),
                        r
                    );
                },
                _getTopicShapeRealBound(e) {
                    let t = e.topicView.shapeBounds;
                    const {
                        rotation: i,
                        cx: n,
                        cy: r,
                    } = e.topicView.topicGroup.trans;
                    i && (t = l.f(t, i, n, r));
                    const o = e.getRealPosition();
                    return {
                        x: t.x + o.x,
                        y: t.y + o.y,
                        width: t.width,
                        height: t.height,
                    };
                },
                isTopicIntersectWithPoint: function (e, t) {
                    if ('branch' === e.type) {
                        const i = m._getTopicShapeRealBound(e);
                        if (m.isBoundIntersectWithPoint(i, t)) return !0;
                    }
                    return !1;
                },
                isBoundIntersectWithPoint: function (e, t) {
                    return (
                        t.x > e.x &&
                        t.x < e.x + e.width &&
                        t.y > e.y &&
                        t.y < e.y + e.height
                    );
                },
                calcDirectionInTopic(e, t) {
                    const i = m._getTopicShapeRealBound(e),
                        n = i.x + i.width / 4,
                        r = n + i.width / 2,
                        o = i.y + i.height / 2;
                    return t.x < n
                        ? 'left'
                        : t.x > r
                          ? 'right'
                          : t.y > o
                            ? 'bottom'
                            : 'top';
                },
                isSelected(e, t, i) {
                    if (
                        (function (n) {
                            const r = e.topicView.topicGroup.rbox(),
                                o = t.figure.renderWorker.selectBox.rbox(),
                                a =
                                    'UD' === i
                                        ? ['y', 'height']
                                        : ['x', 'width'],
                                s = a[0],
                                l = a[1];
                            let c, d;
                            const f =
                                o[s] < r[s] + r[l] / 2 &&
                                o[s] + o[l] > r[s] + r[l] / 2;
                            if (0 === n) return f;
                            {
                                ((c = [r.x + r.width / 2, r.y + r.height / 2]),
                                    (d = [
                                        o.x + o.width / 2,
                                        o.y + o.height / 2,
                                    ]));
                                const e =
                                    Math.abs(c[0] - d[0]) <=
                                        (r.width + o.width) / 2 &&
                                    Math.abs(c[1] - d[1]) <=
                                        (r.height + o.height) / 2;
                                return f && e;
                            }
                        })(
                            e.parent().structureClass in
                                {
                                    'org.xmind.ui.map.clockwise': !0,
                                    'org.xmind.ui.map.anticlockwise': !0,
                                    'org.xmind.ui.map': !0,
                                    'org.xmind.ui.map.unbalanced': !0,
                                }
                                ? 1
                                : 0
                        )
                    )
                        return (e.onMouseover(), !0);
                    e.onMouseout();
                },
                isBoxIntersect: function (e, t) {
                    const i =
                        (e.x2 > t.x2 ? e.x2 : t.x2) - (e.x < t.x ? e.x : t.x);
                    return (
                        (e.y2 > t.y2 ? e.y2 : t.y2) - (e.y < t.y ? e.y : t.y) <
                            e.height + t.height && i < e.width + t.width
                    );
                },
                cloneMarker: function (e) {
                    const t = e.editDomain().content().getCloneG(),
                        i = e.markerImage.clone();
                    return (t.add(i), t);
                },
                cloneImage: function (e) {
                    const t = e.editDomain().content().getCloneG(),
                        i = e.image.clone();
                    return (t.add(i), t);
                },
                getNumberText: function (e, t) {
                    let i,
                        r,
                        o,
                        a,
                        l,
                        c,
                        d = '';
                    switch (e) {
                        case n.NUMBERFORMAT.ARABIC:
                            d += t;
                            break;
                        case n.NUMBERFORMAT.ROMAN:
                            ((i = {
                                1e3: 'M',
                                900: 'CM',
                                500: 'D',
                                400: 'CD',
                                100: 'C',
                                90: 'XC',
                                50: 'L',
                                40: 'XL',
                                10: 'X',
                                9: 'IX',
                                5: 'V',
                                4: 'IV',
                                1: 'I',
                            }),
                                (r = []),
                                (o = s.a.keys(i).reverse()),
                                s.a.each(o, (e) => {
                                    const n = Math.floor(t / e),
                                        o = t % e;
                                    (s()(n).times(() => {
                                        r.push(i[e]);
                                    }),
                                        (t = o));
                                }),
                                (d = r.join('')));
                            break;
                        case n.NUMBERFORMAT.LOWERCASE:
                            for (
                                a = 'a'.charCodeAt(0),
                                    l = 'z'.charCodeAt(0),
                                    c = l - a + 1;
                                t >= 0;
                            )
                                ((d = String.fromCharCode((t % c) + a - 1) + d),
                                    (t = Math.floor(t / c) - 1));
                            break;
                        case n.NUMBERFORMAT.UPPERCASE:
                            for (
                                a = 'A'.charCodeAt(0),
                                    l = 'Z'.charCodeAt(0),
                                    c = l - a + 1;
                                t >= 0;
                            )
                                ((d = String.fromCharCode((t % c) + a - 1) + d),
                                    (t = Math.floor(t / c) - 1));
                    }
                    return d;
                },
                capitalizeEachWord: function (e) {
                    return e.replace(
                        /[a-z0-9_àâäçéèêëîïôûùüÿñæœ]\S*/gi,
                        (e) =>
                            e.charAt(0).toUpperCase() +
                            e.substr(1).toLowerCase()
                    );
                },
                newton: function (e, t) {
                    if (!e && e.length <= 1) return;
                    let i = t,
                        n = i,
                        r = 1,
                        o = 0;
                    for (; Math.abs(r) > 1e-8 && (o++, !(o >= 1e4)); )
                        ((i = n - this.f(e, n) / this.df(e, n)),
                            (r = i - n),
                            (n = i));
                    return i;
                },
                f: function (e, t) {
                    let i = 0;
                    const n = e.length;
                    let r;
                    for (r = 0; r < n; r++) i += e[r] * Math.pow(t, n - 1 - r);
                    return i;
                },
                df: function (e, t) {
                    let i = 0;
                    const n = e.length;
                    let r;
                    for (r = 0; r < n; r++)
                        i += e[r] * (n - 1 - r) * Math.pow(t, e.length - 2 - r);
                    return i;
                },
                pointInPolygon: function (e, t) {
                    let i,
                        n = t.length - 1,
                        r = !1;
                    const o = e.x,
                        a = e.y;
                    let s, l;
                    for (i = 0; i < t.length; i++)
                        ((s = t[i]),
                            (l = t[n]),
                            ((s.y < a && l.y >= a) || (l.y < a && s.y >= a)) &&
                                (s.x <= o || l.x <= o) &&
                                s.x + ((a - s.y) / (l.y - s.y)) * (l.x - s.x) <
                                    o &&
                                (r = !r),
                            (n = i));
                    return r;
                },
                convexHull: function (e) {
                    (e = e.slice()).sort((e, t) =>
                        e.x !== t.x ? e.x - t.x : e.y - t.y
                    );
                    const t = e.length,
                        i = [];
                    for (let r = 0; r < 2 * t; r++) {
                        const o = r < t ? r : 2 * t - 1 - r;
                        for (
                            ;
                            i.length >= 2 &&
                            n(i[i.length - 2], i[i.length - 1], e[o]);
                        )
                            i.pop();
                        i.push(e[o]);
                    }
                    return (i.pop(), i);
                    function n(e, t, i) {
                        const n =
                                (e.x - t.x) * (i.y - t.y) -
                                (e.y - t.y) * (i.x - t.x),
                            r =
                                (e.x - t.x) * (i.x - t.x) +
                                (e.y - t.y) * (i.y - t.y);
                        return n < 0 || (0 === n && r <= 0);
                    }
                },
                setFillColor: function (e, t, i, n) {
                    if (
                        (!n &&
                            t.remember('fillGradient') &&
                            (t.remember('fillGradient').remove(),
                            t.forget('fillGradient')),
                        n)
                    )
                        return void m._setGradientFill(e, t, n);
                    e.content().isGradient();
                    return (
                        'none' === i || '$none$' === i
                            ? t.attr({ opacity: 0 })
                            : t.attr({
                                  fill: i,
                                  stroke: 'none',
                                  opacity: 1,
                              }),
                        this
                    );
                },
                _setGradientFill(e, t, i) {
                    const n = e.svg,
                        r = m.setGradient(n, t, i);
                    r && t.attr({ fill: r });
                },
                _setAutoGradient(e, t, i) {
                    const n = e.svg,
                        r = o.a.hexToHsb(i),
                        a = s.a.extend({}, r);
                    let l;
                    ((r.B = Math.min(r.B + 0.05, 1)),
                        (a.B = Math.max(a.B - 0.05, 0)));
                    const c = o.a.hsbToHex(r.H, r.S, r.B),
                        d = o.a.hsbToHex(a.H, a.S, a.B);
                    (t.remember('gradient')
                        ? ((l = t.remember('gradient')),
                          l.get(0).update(0, c),
                          l.get(1).update(1, d))
                        : ((l = n.gradient('linear', (e) => {
                              (e.at(0, c), e.at(1, d));
                          })),
                          l.from(0, 0).to(0, 1),
                          t.remember('gradient', l)),
                        t.attr({
                            fill: l,
                            stroke: 'none',
                            opacity: 1,
                        }));
                },
                setGradient(e, t, i) {
                    const n = t.remember('borderGradient');
                    if (
                        (!i && n && (n.remove(), t.forget('borderGradient')),
                        !i)
                    )
                        return;
                    const { direction: r, stops: o } = i;
                    let a;
                    ((a = n || e.gradient('linear')),
                        a.update((e) => {
                            o.forEach((t) => {
                                e.at(t);
                            });
                        }));
                    const s = Math.sin((r * Math.PI) / 180),
                        l = Math.cos((r * Math.PI) / 180),
                        c = 0.5 - l,
                        d = 0.5 - s,
                        f = 0.5 + l,
                        h = 0.5 + s;
                    return (
                        a.from(c, d).to(f, h),
                        t.remember('borderGradient'),
                        a
                    );
                },
                getTransformedText(e, t) {
                    switch (t) {
                        case n.TEXTTRANSFORM.MANUAL:
                            return e;
                        case n.TEXTTRANSFORM.UPPERCASE:
                            return e.toUpperCase();
                        case n.TEXTTRANSFORM.LOWERCASE:
                            return e.toLowerCase();
                        case n.TEXTTRANSFORM.CAPITALIZE:
                            return m.capitalizeEachWord(e);
                        default:
                            return e;
                    }
                },
                formUserMarkerIdMap(e) {
                    return C(e);
                },
                getXapInData(e, t) {
                    const i = C(t),
                        n = s.a.uniq(b(e, i), !1, (e) => e.path.join('/')),
                        r = (function (e) {
                            if (o.a.isXapResource(e.src))
                                return [
                                    {
                                        path: ['src'],
                                        content: [e.src],
                                    },
                                ];
                            return [];
                        })(e),
                        a = (function (e, t) {
                            if (t[e.markerId])
                                return [
                                    {
                                        path: [
                                            '/',
                                            'legend',
                                            'markers',
                                            e.markerId,
                                            'resource',
                                        ],
                                        content: t[e.markerId],
                                    },
                                ];
                            return [];
                        })(e, i);
                    return [...n, ...r, ...a];
                },
                getXapInSheetData(e) {
                    const t = C(e.legend);
                    return s.a
                        .uniq(b(e.rootTopic, t), !1, (e) => e.path.join('/'))
                        .map((e) => {
                            const t = e.path;
                            return ('/' !== t[0] && t.unshift('rootTopic'), e);
                        });
                },
                isBase64Url(e) {
                    return g.test(e);
                },
                replaceValueInObject(e, t, i) {
                    '/' === t[0] && (t = t.slice(1));
                    const n = t.reduce(
                            (e, i, n) => (n === t.length - 1 ? e : e[i]),
                            e
                        ),
                        r = n[t[t.length - 1]];
                    n[t[t.length - 1]] = i(r);
                },
                b64toBlob(e, t, i) {
                    ((t = t || ''), (i = i || 512));
                    const n = atob(e),
                        r = [];
                    for (let e = 0; e < n.length; e += i) {
                        const t = n.slice(e, e + i),
                            o = new Array(t.length);
                        for (let e = 0; e < t.length; e++)
                            o[e] = t.charCodeAt(e);
                        const a = new Uint8Array(o);
                        r.push(a);
                    }
                    return new Blob(r, { type: t });
                },
                promiseQueue(e, t = !0) {
                    return new Promise((i, n) => {
                        let r = -1;
                        !(function o() {
                            r++;
                            const a = e[r];
                            t
                                ? a
                                    ? a().then(o).catch(n)
                                    : i()
                                : a
                                  ? a()
                                        .then(() => i())
                                        .catch(o)
                                  : n();
                        })();
                    });
                },
                arrayBufferToBase64(e) {
                    let t = '';
                    const i = new Uint8Array(e),
                        n = i.byteLength;
                    for (let e = 0; e < n; e++) t += String.fromCharCode(i[e]);
                    return window.btoa(t);
                },
                base64ToArrayBuffer(e) {
                    const t = window.atob(e),
                        i = t.length,
                        n = new Uint8Array(i);
                    for (let e = 0; e < i; e++) n[e] = t.charCodeAt(e);
                    return n.buffer;
                },
                nextTick: (() => {
                    const e = [];
                    let t = !0;
                    return (i) => {
                        'function' == typeof i &&
                            (e.push(i),
                            t &&
                                ((t = !1),
                                Promise.resolve().then(() => {
                                    t = !0;
                                    const i = e.slice(0);
                                    e.length = 0;
                                    for (let e = 0; e < i.length; e++) i[e]();
                                })));
                    };
                })(),
                calcCubicBezierBoundingBox(e, t, i, n) {
                    const { x: r, y: o } = e,
                        { x: a, y: s } = i,
                        { x: l, y: c } = n,
                        { x: d, y: f } = t,
                        h = [],
                        p = [],
                        T = [];
                    let u, g, Q, m, b, C, L, y;
                    for (let e = 0; e < 2; ++e)
                        if (
                            (0 === e
                                ? ((g = 6 * r - 12 * a + 6 * l),
                                  (u = -3 * r + 9 * a - 9 * l + 3 * d),
                                  (Q = 3 * a - 3 * r))
                                : ((g = 6 * o - 12 * s + 6 * c),
                                  (u = -3 * o + 9 * s - 9 * c + 3 * f),
                                  (Q = 3 * s - 3 * o)),
                            Math.abs(u) < 1e-12)
                        ) {
                            if (Math.abs(g) < 1e-12) continue;
                            ((m = -Q / g), 0 < m && m < 1 && h.push(m));
                        } else
                            ((L = g * g - 4 * Q * u),
                                L < 0 ||
                                    ((y = Math.sqrt(L)),
                                    (b = (-g + y) / (2 * u)),
                                    0 < b && b < 1 && h.push(b),
                                    (C = (-g - y) / (2 * u)),
                                    0 < C && C < 1 && h.push(C)));
                    let M,
                        A = h.length;
                    for (; A--; )
                        ((m = h[A]),
                            (M = 1 - m),
                            (p[A] =
                                M * M * M * r +
                                3 * M * M * m * a +
                                3 * M * m * m * l +
                                m * m * m * d),
                            (T[A] =
                                M * M * M * o +
                                3 * M * M * m * s +
                                3 * M * m * m * c +
                                m * m * m * f));
                    (p.push(r, d), T.push(o, f));
                    const v = {
                            x: Math.min.apply(0, p),
                            y: Math.min.apply(0, T),
                        },
                        E = Math.max.apply(0, p),
                        _ = Math.max.apply(0, T);
                    return {
                        x: v.x,
                        y: v.y,
                        width: Math.abs(E - v.x),
                        height: Math.abs(_ - v.y),
                    };
                },
            };
            function b(e, t) {
                const i = (function (e, t) {
                    const i = [];
                    o.a.isXapResource(e.href) &&
                        i.push({ path: ['href'], content: e.href });
                    e.markers &&
                        e.markers.forEach((e) => {
                            t[e.markerId] &&
                                i.push({
                                    path: [
                                        '/',
                                        'legend',
                                        'markers',
                                        e.markerId,
                                        'resource',
                                    ],
                                    content: t[e.markerId],
                                });
                        });
                    e.image &&
                        o.a.isXapResource(e.image.src) &&
                        i.push({
                            path: ['image', 'src'],
                            content: e.image.src,
                        });
                    e.extensions &&
                        e.extensions.forEach((e, t) => {
                            e.resourceRefs &&
                                o.a.isXapResource(e.resourceRefs[0]) &&
                                i.push({
                                    path: ['extensions', t, 'resourceRefs', 0],
                                    content: e.resourceRefs[0],
                                });
                        });
                    if (
                        e.notes &&
                        e.notes.html &&
                        e.notes.html.content &&
                        e.notes.html.content.paragraphs
                    ) {
                        const t = e.notes.html.content.paragraphs,
                            n = ['notes', 'html', 'content', 'paragraphs'];
                        t.forEach((e, t) => {
                            e.spans &&
                                e.spans.forEach((e, r) => {
                                    o.a.isXapResource(e.image) &&
                                        i.push({
                                            path: n.concat([
                                                t,
                                                'spans',
                                                r,
                                                'image',
                                            ]),
                                            content: e.image,
                                        });
                                });
                        });
                    }
                    return i;
                })(e, t);
                let r = [];
                if (e.children) {
                    const i = e.children,
                        o = (e) =>
                            (i[e] || []).reduce(
                                (i, n, r) =>
                                    i.concat(
                                        b(n, t).map(
                                            (t) => (
                                                '/' === t.path[0] ||
                                                    (t.path = [
                                                        'children',
                                                        e,
                                                        r,
                                                    ].concat(t.path)),
                                                t
                                            )
                                        )
                                    ),
                                []
                            );
                    r = [
                        ...o(n.TOPIC_TYPE.ATTACHED),
                        ...o(n.TOPIC_TYPE.CALLOUT),
                        ...o(n.TOPIC_TYPE.DETACHED),
                        ...o(n.TOPIC_TYPE.SUMMARY),
                    ];
                }
                return [...i, ...r];
            }
            function C(e) {
                const t = {};
                if (e && e.markers)
                    for (const i in e.markers) {
                        const n = e.markers[i];
                        o.a.isXapResource(n.resource) && (t[i] = n.resource);
                    }
                return t;
            }
            t.a = m;
        }).call(this, i(83));
    },
];
