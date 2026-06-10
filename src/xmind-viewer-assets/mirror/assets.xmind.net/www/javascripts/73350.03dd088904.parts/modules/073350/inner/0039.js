export default [
    function (e, t, i) {
        'use strict';
        var n = i(0),
            r = i(27),
            o = i(14),
            a = i(16),
            s = i(1),
            l = i(5);
        const c = {
                updatePath(e, t, i, n, r) {
                    !(function (e, t) {
                        e.setRelationshipPath(t);
                    })(e, this.calcPathD(t, i, n, r));
                },
                calcPathD(e, t, i, n) {
                    throw new Error('must implement calcPathD function');
                },
                calcBoundingBox(e, t, i, n) {
                    throw new Error('must implement calcBoundingBox function');
                },
                calcPathParams(e, t, i, n) {
                    throw new Error('must implement calcPathParams function');
                },
                getControlHandlerDisplayStatus() {
                    return {
                        controlHandlerLine1: !0,
                        controlHandlerPoint1: !0,
                        controlHandlerLine2: !0,
                        controlHandlerPoint2: !0,
                    };
                },
            },
            d = (e, t, i, n) => {
                const r = Object(s.normalize)(Object(s.sub)(t, e)),
                    o = Object(s.reverse)(r),
                    a = Object(l.j)(e, t);
                return {
                    c1: Object(s.add)(i, Object(s.normalize)(o, a / 3)),
                    c2: Object(s.add)(i, Object(s.normalize)(r, a / 3)),
                };
            },
            f = {
                [n.RELATIONSHIPSHAPE.CURVED]: Object.assign({}, c, {
                    calcPathD: function (e, t, i, n) {
                        return (
                            'M ' +
                            e.x +
                            ' ' +
                            e.y +
                            'C ' +
                            i.x +
                            ' ' +
                            i.y +
                            '  ' +
                            n.x +
                            ' ' +
                            n.y +
                            '  ' +
                            t.x +
                            ' ' +
                            t.y
                        );
                    },
                    calcBoundingBox(e, t, i, n) {
                        return o.a.calcCubicBezierBoundingBox(e, t, i, n);
                    },
                }),
                [n.RELATIONSHIPSHAPE.QUAD]: Object.assign({}, c, {
                    calcPathD: function (e, t, i, n) {
                        const { c1: r, c2: o } = d(e, t, i);
                        return `\n        M ${e.x} ${e.y}\n        C ${e.x} ${e.y} ${r.x} ${r.y} ${i.x} ${i.y}\n        C ${o.x} ${o.y} ${t.x} ${t.y} ${t.x} ${t.y}\n      `;
                    },
                    calcBoundingBox(e, t, i, n) {
                        const { c1: r, c2: a } = d(e, t, i),
                            s = o.a.calcCubicBezierBoundingBox(e, i, e, r),
                            l = o.a.calcCubicBezierBoundingBox(i, t, a, t),
                            c = Math.min(s.x, l.x),
                            f = Math.min(s.y, l.y);
                        return {
                            x: c,
                            y: f,
                            width: Math.max(s.x + s.width, l.x + l.width) - c,
                            height:
                                Math.max(s.y + s.height, l.y + l.height) - f,
                        };
                    },
                    getControlHandlerDisplayStatus() {
                        return {
                            controlHandlerLine1: !1,
                            controlHandlerPoint1: !0,
                            controlHandlerLine2: !1,
                            controlHandlerPoint2: !1,
                        };
                    },
                }),
                [n.RELATIONSHIPSHAPE.STRAIGHT]: Object.assign({}, c, {
                    calcPathD: function (e, t, i, n) {
                        return 'M ' + e.x + ' ' + e.y + 'L ' + t.x + ' ' + t.y;
                    },
                    calcBoundingBox(e, t, i, n) {
                        return r.a([e, t]);
                    },
                    getControlHandlerDisplayStatus() {
                        return {
                            controlHandlerLine1: !1,
                            controlHandlerPoint1: !1,
                            controlHandlerLine2: !1,
                            controlHandlerPoint2: !1,
                        };
                    },
                }),
                [n.RELATIONSHIPSHAPE.ANGLED]: Object.assign({}, c, {
                    getControlHandlerDisplayStatus() {
                        return {
                            controlHandlerLine1: !1,
                            controlHandlerPoint1: !0,
                            controlHandlerLine2: !1,
                            controlHandlerPoint2: !0,
                        };
                    },
                    calcPathD: function (e, t, i, n) {
                        return (
                            'M ' +
                            e.x +
                            ' ' +
                            e.y +
                            'L ' +
                            i.x +
                            ' ' +
                            i.y +
                            'L ' +
                            n.x +
                            ' ' +
                            n.y +
                            'L ' +
                            t.x +
                            ' ' +
                            t.y
                        );
                    },
                    calcBoundingBox(e, t, i, n) {
                        return r.a([e, t, i, n]);
                    },
                }),
                [n.RELATIONSHIPSHAPE.ZIGZAG]: Object.assign({}, c, {
                    getControlHandlerDisplayStatus() {
                        return {
                            controlHandlerLine1: !1,
                            controlHandlerPoint1: !0,
                            controlHandlerLine2: !1,
                            controlHandlerPoint2: !0,
                        };
                    },
                    calcPathParams: function (e, t, i, n) {
                        const r = { x: n.x, y: n.y },
                            o = { x: i.x, y: i.y };
                        return (
                            Math.abs(r.x - t.x) <= Math.abs(r.y - t.y)
                                ? (r.x = t.x)
                                : (r.y = t.y),
                            Math.abs(o.x - e.x) <= Math.abs(o.y - e.y)
                                ? (o.x = e.x)
                                : (o.y = e.y),
                            r.x === t.x
                                ? o.x === e.x
                                    ? (r.y = o.y = (o.y + r.y) / 2)
                                    : o.y === e.y &&
                                      ((r.y = o.y = e.y), (o.x = t.x))
                                : r.y === t.y &&
                                  (o.y === e.y
                                      ? (r.x = o.x = (r.x + o.x) / 2)
                                      : o.x === e.x &&
                                        ((r.x = o.x = e.x), (o.y = t.y))),
                            { sp: e, scp: o, tcp: r, tp: t }
                        );
                    },
                    calcPathD: function (e, t, i, r) {
                        const { scp: o, tcp: a } = f[
                            n.RELATIONSHIPSHAPE.ZIGZAG
                        ].calcPathParams(e, t, i, r);
                        return (
                            'M ' +
                            e.x +
                            ' ' +
                            e.y +
                            'L ' +
                            o.x +
                            ' ' +
                            o.y +
                            'L ' +
                            a.x +
                            ' ' +
                            a.y +
                            'L ' +
                            t.x +
                            ' ' +
                            t.y
                        );
                    },
                    calcBoundingBox(e, t, i, n) {
                        const o = { x: n.x, y: n.y },
                            a = { x: i.x, y: i.y };
                        return (
                            Math.abs(o.x - t.x) <= Math.abs(o.y - t.y)
                                ? (o.x = t.x)
                                : (o.y = t.y),
                            Math.abs(a.x - e.x) <= Math.abs(a.y - e.y)
                                ? (a.x = e.x)
                                : (a.y = e.y),
                            o.x === t.x
                                ? a.x === e.x
                                    ? (o.y = a.y = (a.y + o.y) / 2)
                                    : a.y === e.y &&
                                      ((o.y = a.y = e.y), (a.x = t.x))
                                : o.y === t.y &&
                                  (a.y === e.y
                                      ? (o.x = a.x = (o.x + a.x) / 2)
                                      : a.x === e.x &&
                                        ((o.x = a.x = e.x), (a.y = t.y))),
                            r.a([e, t, a, o])
                        );
                    },
                }),
            };
        t.a = (e) =>
            f[e]
                ? f[e]
                : (a.b
                      .get(n.CONFIG.LOGGER)
                      .warn(`Unsupported relationship line style: ${e}`),
                  f[n.RELATIONSHIPSHAPE.CURVED]);
    },
];
