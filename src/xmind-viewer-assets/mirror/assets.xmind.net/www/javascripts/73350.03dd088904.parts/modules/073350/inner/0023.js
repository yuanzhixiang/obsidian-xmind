export default [
    function (e, t, i) {
        'use strict';
        var n = i(0),
            r = i(7),
            o = i(11),
            a = i(9),
            s = i(1),
            l = i(16),
            c = i(17),
            d = i(22);
        class f extends d.a {
            _render(e) {
                e.setTopicShapePath('');
                const t = e.shapeBounds,
                    i =
                        'M ' +
                        t.x +
                        ' ' +
                        t.y +
                        'L ' +
                        (t.x + t.width) +
                        ' ' +
                        t.y +
                        'L ' +
                        (t.x + t.width) +
                        ' ' +
                        (t.y + t.height) +
                        'L ' +
                        t.x +
                        ' ' +
                        (t.y + t.height) +
                        'z';
                e.setTopicShapeFillPath(i);
                const n = parseInt(e.figure.borderWidth || 0),
                    r = o.a.generateRect(t, n);
                e.setTopicShapeSelectBoxPath(r);
            }
        }
        class h extends d.a {
            calcTopicShapePath(e) {
                return (
                    'M ' +
                    (e.x + 8) +
                    ' ' +
                    e.y +
                    'L ' +
                    (e.x + e.width - 8) +
                    ' ' +
                    e.y +
                    'Q ' +
                    (e.x + e.width) +
                    ' ' +
                    e.y +
                    '  ' +
                    (e.x + e.width) +
                    ' ' +
                    (e.y + 8) +
                    'L ' +
                    (e.x + e.width) +
                    ' ' +
                    (e.y + e.height - 8) +
                    'Q ' +
                    (e.x + e.width) +
                    ' ' +
                    (e.y + e.height) +
                    '  ' +
                    (e.x + e.width - 8) +
                    ' ' +
                    (e.y + e.height) +
                    'L ' +
                    (e.x + 8) +
                    ' ' +
                    (e.y + e.height) +
                    'Q ' +
                    e.x +
                    ' ' +
                    (e.y + e.height) +
                    '  ' +
                    e.x +
                    ' ' +
                    (e.y + e.height - 8) +
                    'L ' +
                    e.x +
                    ' ' +
                    (e.y + 8) +
                    'Q ' +
                    e.x +
                    ' ' +
                    e.y +
                    '  ' +
                    (e.x + 8) +
                    ' ' +
                    e.y +
                    'Z'
                );
            }
        }
        var p = i(31);
        class T extends d.a {
            calcTopicShapePath(...e) {
                return p.h(...e);
            }
        }
        class u extends d.a {
            getTopicMargins(e, t) {
                const { top: i, bottom: n } = super.getTopicMargins(e),
                    r = parseInt(e.topicView.figure.borderWidth || 0),
                    o = (i + t.height + n) / 2;
                return {
                    top: i,
                    bottom: n,
                    left: r + o,
                    right: r + o,
                };
            }
            calcTopicShapePath(e) {
                const { x: t, y: i, width: n, height: r } = e,
                    o = e.height / 2,
                    a = t + o,
                    s = t + n - o,
                    l = i + r,
                    c = o / 0.75,
                    d = a - c,
                    f = s + c;
                return `M ${a} ${i}\n        C ${d} ${i} ${d} ${l} ${a} ${l}\n        L ${s} ${l}\n        C ${f} ${l} ${f} ${i} ${s} ${i}\n        L ${a} ${i}\n        Z\n        `;
            }
        }
        var g = i(14);
        class Q extends d.a {
            getTopicMargins(e, t) {
                const i = 0.5 * t.width + 2,
                    n = 0.5 * t.height + 2,
                    o = (2 * (1 * i + n)) / 1,
                    a = (4 * i * n) / 1,
                    s = (-i * i * n * n) / 1,
                    l = g.a.newton([1, o, a, 0, s], i / 2),
                    c = 1 * l,
                    d = Math.round(c),
                    f = Math.round(l),
                    h = Math.max(1, d - 5),
                    p = Math.max(1, f - 10),
                    T = super.getTopicMargins(e),
                    u = Math.min(50, Object(r.h)(e));
                return {
                    top: T.top + 0.5 * u + h,
                    left: T.left + 1 * u + p,
                    bottom: T.bottom + 0.5 * u + h,
                    right: T.right + 1 * u + p,
                };
            }
            calcTopicShapePath(e) {
                return (
                    'M ' +
                    e.x +
                    ' ' +
                    (e.y + e.y + e.height) +
                    'A ' +
                    (e.x + e.width) +
                    ' ' +
                    (e.y + e.height) +
                    ' 0 1 1 ' +
                    e.x +
                    ' ' +
                    (e.y + e.y + e.height + 0.001)
                );
            }
        }
        class m extends d.a {
            getTopicMargins(e, t) {
                const i = Math.min(50, Object(r.h)(e)),
                    n = Object(r.e)(e),
                    o = 0.5 * t.width;
                let a = 0.5 * t.height;
                a <= 0 && (a = i / 2);
                const s = Math.sqrt(a * o),
                    l = Math.round(s) + n;
                return {
                    top: l + n + 0.1 * i,
                    left: l + n + 0.5 * i,
                    bottom: l + n + 0.1 * i,
                    right: l + n + 0.5 * i,
                };
            }
            calcTopicShapePath(e, t) {
                const i = Object.assign({}, e);
                if (parseInt(`${t.figure.borderWidth || 0}`) > 0) {
                    const e = t.figure.borderWidth / 2,
                        n = e * (Math.abs(i.x) / Math.abs(i.y)),
                        r =
                            (Math.sqrt(Math.pow(e, 2) + Math.pow(n, 2)) - e) /
                            2;
                    i.x -= r;
                }
                return (
                    'M ' +
                    (i.x + i.x + i.width) +
                    ' ' +
                    i.y +
                    'L ' +
                    (i.x + i.width) +
                    ' ' +
                    (i.y + i.y + i.height) +
                    'L ' +
                    (i.x + i.x + i.width) +
                    ' ' +
                    (i.y + i.height) +
                    'L ' +
                    i.x +
                    ' ' +
                    (i.y + i.y + i.height) +
                    'z'
                );
            }
        }
        var b = i(36);
        const C = 0.03,
            L = {
                containerAreaAspectRatio: 0.8358,
                contentAreaAspectRatio: 1,
                containerWidthContentWidthRatio: 1.45,
                contentAreaOffsetY: -0.05,
                pointOffsetByLineFocusTypeAndDirection: {
                    [r.b.ORDER_LINE]: {
                        [n.DIRECTION.LEFT]: ({ width: e, height: t }) => ({
                            x: 0.02 * e,
                            y: -0.05 * t,
                        }),
                        [n.DIRECTION.RIGHT]: ({ width: e, height: t }) => ({
                            x: -0.02 * e,
                            y: -0.05 * t,
                        }),
                    },
                },
            };
        class y extends b.a {
            constructor() {
                super(L);
            }
            calcTopicShapePath(e) {
                const { x: t, y: i, width: n, height: r } = e,
                    o = { x: t + n / 2, y: i },
                    a = o.x - 0.006 * n,
                    s = o.y + 0.0015 * r,
                    l = o.x + 0.006 * n,
                    c = { x: t, y: i + 0.149 * r },
                    d = { x: t + n, y: i + 0.149 * r },
                    f = t + n / 2,
                    h = i + r;
                return `M ${o.x} ${o.y} C ${o.x - 0.003 * n} ${o.y}, ${a + 0.0013 * n} ${s - 7e-4 * r}, ${a} ${s} C ${a - 0.145 * n} ${s + 0.074 * r}, ${c.x + 0.14 * n} ${c.y - 0.0206 * r}, ${c.x} ${c.y} C ${c.x} ${c.y + 0.6458 * r}, ${f - 0.25 * n} ${h - 0.086 * r}, ${f - 0.124 * n} ${h - 0.044 * r} L ${f} ${h} L ${f + 0.124 * n} ${h - 0.044 * r} C ${f + 0.25 * n} ${h - 0.086 * r}, ${d.x} ${d.y + 0.6458 * r}, ${d.x} ${d.y} C ${d.x - 0.14 * n} ${c.y - 0.0206 * r}, ${a + 0.145 * n} ${s + 0.074 * r}, ${l} ${o.y + 0.0015 * r} C ${l - 0.0013 * n} ${s - 7e-4 * r}, ${o.x + 0.003 * n} ${o.y}, ${o.x} ${o.y} Z`;
            }
            getExtConnectionOffset(e) {
                const { width: t } = e.topicView.shapeBounds;
                switch (Object(s.getChildTargetOrientation)(e)) {
                    case n.DIRECTION.RIGHT:
                    case n.DIRECTION.LEFT:
                        return C * t;
                    default:
                        return super.getExtConnectionOffset(e);
                }
            }
            _getCommonPointOffset(e, t) {
                const i = e.isMapLike(),
                    { width: r } = e.topicView.shapeBounds;
                switch (t) {
                    case n.DIRECTION.LEFT:
                        return { x: (i ? 0.15 : C) * r, y: 0 };
                    case n.DIRECTION.RIGHT:
                        return { x: (i ? -0.15 : -0.03) * r, y: 0 };
                    default:
                        return super._getCommonPointOffset(e, t);
                }
            }
        }
        const M = {
                containerAreaAspectRatio: 1.378,
                contentAreaAspectRatio: 1.6,
                containerWidthContentWidthRatio: 1.4,
                contentAreaOffsetX: 0.1,
                pointOffsetByLineFocusTypeAndDirection: {
                    [r.b.ORDER_LINE]: {
                        [n.DIRECTION.LEFT]: ({ width: e }) => ({
                            x: 0.05 * e,
                            y: 0,
                        }),
                    },
                },
            },
            A = 0.15;
        class v extends b.a {
            constructor() {
                super(M);
            }
            calcTopicShapePath(e) {
                const { x: t, y: i, width: n, height: r } = e,
                    o = { x: t + (1 - 0.57) * n, y: i + r * A },
                    a = { x: o.x, y: i + 0.85 * r };
                return `M ${t + n} ${o.y} L ${o.x} ${o.y} L ${o.x} ${i} L ${t} ${i + 0.5 * r} L ${o.x} ${i + r} L ${a.x} ${a.y} L ${t + n} ${a.y} Z`;
            }
            getExtConnectionOffset(e) {
                const { height: t } = e.topicView.shapeBounds;
                switch (Object(s.getChildTargetOrientation)(e)) {
                    case n.DIRECTION.UP:
                    case n.DIRECTION.DOWN:
                        return A * t;
                    default:
                        return super.getExtConnectionOffset(e);
                }
            }
            _getCommonPointOffset(e, t) {
                const i = e.isMapLike(),
                    { width: r, height: o } = e.topicView.shapeBounds;
                switch (t) {
                    case n.DIRECTION.LEFT:
                        return { x: (i ? 0.3 : 0) * r, y: 0 };
                    case n.DIRECTION.RIGHT:
                        return { x: (i ? -0.1 : 0) * r, y: 0 };
                    case n.DIRECTION.UP:
                        return { x: 0, y: A * o };
                    case n.DIRECTION.DOWN:
                        return { x: 0, y: -0.15 * o };
                    default:
                        return super._getCommonPointOffset(e, t);
                }
            }
        }
        const E = {
                containerAreaAspectRatio: 1.378,
                contentAreaAspectRatio: 1.6,
                containerWidthContentWidthRatio: 1.4,
                contentAreaOffsetX: -0.1,
                pointOffsetByLineFocusTypeAndDirection: {
                    [r.b.ORDER_LINE]: {
                        [n.DIRECTION.RIGHT]: ({ width: e }) => ({
                            x: -0.05 * e,
                            y: 0,
                        }),
                    },
                },
            },
            _ = 0.15;
        class O extends b.a {
            constructor() {
                super(E);
            }
            calcTopicShapePath(e) {
                const { x: t, y: i, width: n, height: r } = e,
                    o = { x: t, y: i + r * _ },
                    a = { x: t, y: i + 0.85 * r },
                    s = { x: t + 0.57 * n, y: o.y };
                return `M ${o.x} ${o.y} L ${s.x} ${s.y} L ${s.x} ${i} L ${t + n} ${i + 0.5 * r} L ${s.x} ${i + r} L ${s.x} ${a.y} L ${a.x} ${a.y} Z`;
            }
            getExtConnectionOffset(e) {
                const { height: t } = e.topicView.shapeBounds;
                switch (Object(s.getChildTargetOrientation)(e)) {
                    case n.DIRECTION.UP:
                    case n.DIRECTION.DOWN:
                        return _ * t;
                    default:
                        return super.getExtConnectionOffset(e);
                }
            }
            _getCommonPointOffset(e, t) {
                const i = e.isMapLike(),
                    { width: r, height: o } = e.topicView.shapeBounds;
                switch (t) {
                    case n.DIRECTION.LEFT:
                        return { x: (i ? 0.1 : 0) * r, y: 0 };
                    case n.DIRECTION.RIGHT:
                        return { x: (i ? -0.3 : 0) * r, y: 0 };
                    case n.DIRECTION.UP:
                        return { x: 0, y: _ * o };
                    case n.DIRECTION.DOWN:
                        return { x: 0, y: -0.15 * o };
                    default:
                        return super._getCommonPointOffset(e, t);
                }
            }
        }
        const S = {
            containerAreaAspectRatio: 1.858,
            contentAreaAspectRatio: 1.6,
            containerWidthContentWidthRatio: 1.4,
            contentAreaOffsetX: -0.1,
            pointOffsetByLineFocusTypeAndDirection: {
                [r.b.ORDER_LINE]: {
                    [n.DIRECTION.RIGHT]: ({ width: e }) => ({
                        x: -0.05 * e,
                        y: 0,
                    }),
                },
            },
        };
        class x extends b.a {
            constructor() {
                super(S);
            }
            calcTopicShapePath(e) {
                const { x: t, y: i, width: n, height: r } = e,
                    o = { x: t, y: i + r },
                    a = { x: t + 0.77 * n, y: i };
                return `M ${t} ${i} L ${o.x} ${o.y} L ${a.x} ${o.y} L ${t + n} ${i + 0.5 * r} L ${a.x} ${a.y} Z`;
            }
            _getCommonPointOffset(e, t) {
                const i = e.isMapLike(),
                    { width: r } = e.topicView.shapeBounds;
                switch (t) {
                    case n.DIRECTION.LEFT:
                        return { x: (i ? 0.15 : 0) * r, y: 0 };
                    case n.DIRECTION.RIGHT:
                        return { x: (i ? -0.2 : 0) * r, y: 0 };
                    default:
                        return super._getCommonPointOffset(e, t);
                }
            }
        }
        const R = 0.233,
            I = {
                containerAreaAspectRatio: 1.82,
                contentAreaAspectRatio: 1.5,
                containerWidthContentWidthRatio: 1.5,
                contentAreaOffsetX: 0.1,
                pointOffsetByLineFocusTypeAndDirection: {
                    [r.b.DIVER_LINE]: {
                        [n.DIRECTION.LEFT]: ({ width: e }) => ({
                            x: 0.08 * e,
                            y: 0,
                        }),
                        [n.DIRECTION.RIGHT]: ({ width: e }) => ({
                            x: 0.1 * e,
                            y: 0,
                        }),
                    },
                    [r.b.ORDER_LINE]: {
                        [n.DIRECTION.LEFT]: ({ width: e }) => ({
                            x: R * e,
                            y: 0,
                        }),
                        [n.DIRECTION.RIGHT]: () => ({ x: 0, y: 0 }),
                    },
                },
            };
        class N extends b.a {
            constructor() {
                super(I);
            }
            calcTopicShapePath(e) {
                const { x: t, y: i, width: n, height: r } = e,
                    o = { x: t + n, y: i };
                return `M ${t} ${i} L ${t + R * n} ${i + 0.5 * r} L ${t} ${i + r} L ${o.x} ${i + r} L ${o.x} ${o.y} Z`;
            }
            getExtConnectionOffset(e) {
                const { width: t } = e.topicView.shapeBounds;
                return Object(s.getChildTargetOrientation)(e) ===
                    n.DIRECTION.RIGHT
                    ? R * t
                    : super.getExtConnectionOffset(e);
            }
            _getCommonPointOffset(e, t) {
                const { width: i } = e.topicView.shapeBounds,
                    r = e.isMapLike();
                switch (t) {
                    case n.DIRECTION.LEFT:
                        return {
                            x: R * i * (r ? 1.5 : 0.97),
                            y: 0,
                        };
                    case n.DIRECTION.RIGHT:
                        return {
                            x: r ? -0.233 * i : 0.02 * i,
                            y: 0,
                        };
                    default:
                        return super._getCommonPointOffset(e, t);
                }
            }
        }
        const w = {
            containerAreaAspectRatio: 1.624,
            contentAreaAspectRatio: 1.44,
            containerWidthContentWidthRatio: 1.82,
            contentAreaOffsetY: 0.1,
            pointOffsetByLineFocusTypeAndDirection: {
                [r.b.ORDER_LINE]: {
                    [n.DIRECTION.LEFT]: ({ width: e, height: t }) => ({
                        x: 0.02 * e,
                        y: 0.18 * t,
                    }),
                    [n.DIRECTION.RIGHT]: ({ width: e, height: t }) => ({
                        x: -0.02 * e,
                        y: 0.18 * t,
                    }),
                },
            },
        };
        class P extends b.a {
            constructor() {
                super(w);
            }
            calcTopicShapePath(e) {
                const { x: t, y: i, width: n, height: r } = e,
                    o = { x: t + 0.196 * n, y: i + r },
                    a = { x: t + 0.827 * n, y: i + r },
                    s = { x: t, y: i + 0.681 * r },
                    l = { x: t + n, y: i + 0.72 * r },
                    c = t + 0.207 * n,
                    d = i + 0.363 * r,
                    f = t + 0.809 * n,
                    h = i + 0.441 * r,
                    p = { x: t + 0.504 * n, y: i };
                return `M ${o.x} ${o.y} C ${o.x - 0.108 * n} ${o.y}, ${s.x} ${s.y + 0.176 * r}, ${s.x} ${s.y} C ${s.x} ${s.y - 0.176 * r}, ${c - 0.1167 * n} ${d - 0.01 * r}, ${c} ${d} C ${c + 0.036 * n} ${d - 0.21 * r}, ${p.x - 0.14 * n} ${p.y}, ${p.x} ${p.y} C ${p.x + 0.158 * n} ${p.y}, ${f - 0.018 * n} ${h - 0.248 * r}, ${f} ${h} C ${f + 0.111 * n} ${h - 0.018 * r}, ${l.x} ${l.y - 0.15 * r}, ${l.x} ${l.y} C ${l.x} ${l.y + 0.16 * r}, ${a.x + 0.095 * n} ${a.y}, ${a.x} ${a.y} Z`;
            }
            getExtConnectionOffset(e) {
                const { width: t } = e.topicView.shapeBounds;
                switch (Object(s.getChildTargetOrientation)(e)) {
                    case n.DIRECTION.RIGHT:
                        return 0.04 * t;
                    case n.DIRECTION.LEFT:
                        return 0.07 * t;
                    default:
                        return super.getExtConnectionOffset(e);
                }
            }
            _getCommonPointOffset(e, t) {
                const i = e.isMapLike(),
                    { width: r } = e.topicView.shapeBounds;
                switch (t) {
                    case n.DIRECTION.LEFT:
                        return { x: (i ? 0.2 : 0.04) * r, y: 0 };
                    case n.DIRECTION.RIGHT:
                        return { x: (i ? -0.2 : -0.07) * r, y: 0 };
                    default:
                        return super._getCommonPointOffset(e, t);
                }
            }
        }
        var H = i(5);
        const D = 0.04,
            F = {
                containerAreaAspectRatio: 1.082,
                contentAreaAspectRatio: 1.6,
                containerWidthContentWidthRatio: 1.483,
                contentAreaOffsetY: -0.05,
                pointOffsetByLineFocusTypeAndDirection: {
                    [r.b.ORDER_LINE]: {
                        [n.DIRECTION.LEFT]: ({ width: e, height: t }) => ({
                            x: 0.01 * e,
                            y: -0.18 * t,
                        }),
                        [n.DIRECTION.RIGHT]: ({ width: e, height: t }) => ({
                            x: -0.01 * e,
                            y: -0.18 * t,
                        }),
                    },
                },
            };
        class k extends b.a {
            constructor() {
                super(F);
            }
            calcTopicShapePath(e) {
                const { x: t, y: i, width: n, height: r } = e,
                    o = (e, o) =>
                        Object(H.c)({ x: t, y: i }, { x: e * n, y: o * r }),
                    a = o(0.5, 0.151),
                    s = o(0.272, 0),
                    l = o(0.728, 0),
                    c = o(0, 0.3264),
                    d = o(1, 0.3264),
                    f = o(0.491, 0.994),
                    h = o(0.509, 0.994),
                    p = o(0.449, 0.06),
                    T = o(1 - 0.449, 0.06),
                    u = o(0.111, 0),
                    g = o(0.372, 0),
                    Q = o(0.628, 0),
                    m = o(0.889, 0),
                    b = o(0, 0.142),
                    C = o(0, 0.623),
                    L = o(1, 0.142),
                    y = o(1, 0.623),
                    M = o(0.4206, 0.946),
                    A = o(0.5794, 0.946),
                    v = o(0.5, 1);
                return `M ${a.x} ${a.y} C ${p.x} ${p.y}, ${g.x} ${g.y}, ${s.x} ${s.y} C ${u.x} ${u.y}, ${b.x} ${b.y}, ${c.x} ${c.y} C ${C.x} ${C.y}, ${M.x} ${M.y}, ${f.x} ${f.y} Q ${v.x} ${v.y}, ${h.x} ${h.y}C ${A.x} ${A.y}, ${y.x} ${y.y}, ${d.x} ${d.y} C ${L.x} ${L.y}, ${m.x} ${m.y}, ${l.x} ${l.y} C ${Q.x} ${Q.y}, ${T.x} ${T.y}, ${a.x} ${a.y} Z`;
            }
            getExtConnectionOffset(e) {
                const { width: t, height: i } = e.topicView.shapeBounds;
                switch (Object(s.getChildTargetOrientation)(e)) {
                    case n.DIRECTION.RIGHT:
                    case n.DIRECTION.LEFT:
                        return D * t;
                    case n.DIRECTION.DOWN:
                        return 0.15 * i;
                    default:
                        return super.getExtConnectionOffset(e);
                }
            }
            _getCommonPointOffset(e, t) {
                const i = e.isMapLike(),
                    { width: r, height: o } = e.topicView.shapeBounds;
                switch (t) {
                    case n.DIRECTION.LEFT:
                        return i ? { x: 0.24 * r, y: 0 } : { x: D * r, y: 0 };
                    case n.DIRECTION.RIGHT:
                        return i
                            ? { x: -0.24 * r, y: 0 }
                            : { x: -0.04 * r, y: 0 };
                    case n.DIRECTION.UP:
                        return { x: 0, y: 0.15 * o };
                    default:
                        return super._getCommonPointOffset(e, t);
                }
            }
        }
        var B = i(41);
        class V extends B.a {
            constructor() {
                super();
            }
            _getExtendBracketWidth(e) {
                return 10 + e.height / 25;
            }
            getTopicMargins(e, t) {
                const i = Object(r.e)(e),
                    {
                        top: n,
                        bottom: o,
                        left: a,
                        right: s,
                    } = super.getTopicMargins(e),
                    l = this._getExtendBracketWidth(t);
                return {
                    top: Math.max(14, n + i / 2),
                    bottom: Math.max(14, n + i / 2),
                    left: a + l,
                    right: s + l,
                };
            }
            _calcShapePathWithPaddingBounds(e, t) {
                const { x: i, y: n, width: r, height: o } = e,
                    a = this._getExtendBracketWidth(t.contentBounds);
                return (
                    `M ${i + a} ${n} L ${i} ${n} L ${i} ${n + o} L ${i + a} ${n + o}` +
                    `M ${i + r - a} ${n} L ${i + r} ${n} L ${i + r} ${n + o} L ${i + r - a} ${n + o}`
                );
            }
        }
        const Y = 2.4,
            G = 6.4;
        class U extends B.a {
            constructor() {
                (super(...arguments),
                    (this._genHalfBracketPath = (e, t, i, n) => {
                        const r = e.x + (i ? G : -6.4),
                            o = e.y + (n ? -4 : 4),
                            a = t.x + (i ? -6.4 : G),
                            s = t.y + (n ? 4 : -4);
                        return `M ${e.x} ${e.y} L ${e.x + (i ? Y : -2.4)} ${e.y} A 4 4 0 0 ${i === n ? '0' : '1'} ${r} ${o} L ${a} ${s} A 4 4 0 0 ${i !== n ? '0' : '1'} ${t.x + (i ? -2.4 : Y)} ${t.y} L ${t.x + 0.7 * (i ? -2.4 : Y)} ${t.y}`;
                    }));
            }
            getTopicMargins(e) {
                return {
                    top: 12.8,
                    bottom: 12.8,
                    left: 25.6,
                    right: 25.6,
                };
            }
            _calcShapePathWithPaddingBounds(e) {
                const { x: t, y: i, width: n, height: r } = e,
                    o = { x: t + 12.8, y: i },
                    a = { x: t, y: i + 0.5 * r },
                    s = { x: t + 12.8, y: i + r },
                    l = { x: t + n - 12.8, y: i },
                    c = { x: t + n, y: i + 0.5 * r },
                    d = { x: t + n - 12.8, y: i + r };
                return `${`${this._genHalfBracketPath(o, a, !1, !1)} ${this._genHalfBracketPath(s, a, !1, !0)}`} ${`${this._genHalfBracketPath(l, c, !0, !1)} ${this._genHalfBracketPath(d, c, !0, !0)}`}`;
            }
        }
        const j = 28.85,
            $ = 15.11;
        class z extends B.a {
            getTopicMargins(e) {
                return {
                    top: 23.080000000000002,
                    bottom: 23.080000000000002,
                    left: 30.22,
                    right: 30.22,
                };
            }
            _calcShapePathWithPaddingBounds(e) {
                const { x: t, y: i, width: n, height: r } = e;
                return `M ${t + $} ${i} L ${t} ${i} L ${t} ${i + j} M ${t + n - $} ${i + r} L ${t + n} ${i + r} L ${t + n} ${i + r - j}`;
            }
        }
        const W = 19.04;
        class K extends B.a {
            getTopicMargins(e, t) {
                const { height: i } = t,
                    n = Object(r.e)(e),
                    o = 22.848 + 16 * Math.min(2, i / 90),
                    a = i < 30 ? (30 - i) / 2 : 0;
                return {
                    top: a + n / 2,
                    bottom: a + n / 2,
                    left: o + n / 2,
                    right: o + n / 2,
                };
            }
            _calcShapePathWithPaddingBounds(e) {
                const { x: t, y: i, width: n, height: r } = e;
                let o;
                o = r < 30 ? 30 : r > 90 ? 90 : r;
                const a = i + 0.5 * r,
                    s = a - 0.5 * o,
                    l = a + 0.5 * o;
                return `M ${t + W} ${s} L ${t} ${a} L ${t + W} ${l} M ${t + n - W} ${s} L ${t + n} ${a} L ${t + n - W} ${l}`;
            }
        }
        const Z = 9.04,
            J = 10;
        class X extends B.a {
            getTopicMargins(e, t) {
                const { height: i } = t,
                    n = Object(r.e)(e),
                    o = 25 + Math.min(2, i / 95) * J,
                    a = i < 50 ? (50 - i) / 2 : 0;
                return {
                    top: a + n / 2,
                    bottom: a + n / 2,
                    left: o + n / 2,
                    right: o + n / 2,
                };
            }
            _calcShapePathWithPaddingBounds(e) {
                const { x: t, y: i, width: n, height: r } = e;
                let o;
                o = r < 50 ? 50 : r > 95 ? 95 : r;
                const a = i + 0.5 * r,
                    s = a - 0.5 * o,
                    l = a + 0.5 * o;
                return `${`M ${t + Z} ${s} L ${t} ${a} L ${t + Z} ${l} M ${t + Z + J} ${s} L ${t + J} ${a} L ${t + Z + J} ${l}`} ${`M ${t + n - Z} ${s} L ${t + n} ${a} L ${t + n - Z} ${l}M ${t + n - Z - J} ${s} L ${t + n - J} ${a} L ${t + n - Z - J} ${l}`}`;
            }
        }
        class q extends B.a {
            _genQuotePath(e, t, i) {
                const { x: n, y: r } = e,
                    o = 0.8 * t,
                    a = t / 2,
                    s = r + 3.4 * (i ? -t : t);
                return (
                    `M ${n} ${r} a ${o} ${o} 0 1 1 0 ${i ? '0.001' : '-0.001'} Z ` +
                    `M ${n + (1 - 0.8) * (i ? t : -t)} ${r} a ${a} ${a} 0 1 1 0 ${i ? '0.001' : '-0.001'} Z ` +
                    `M ${n} ${r}Q ${n + 0.2 * (i ? -t : t)} ${s + 1 * (i ? t : -t)} ${n + 2 * (i ? t : -t)} ${s}`
                );
            }
            getTopicMargins(e, t) {
                const i = Object(r.e)(e),
                    {
                        top: n,
                        bottom: o,
                        left: a,
                        right: s,
                    } = super.getTopicMargins(e);
                return {
                    top: n,
                    bottom: o,
                    left: Math.max(14 + 8 * i, a),
                    right: Math.max(14 + 8 * i, s),
                };
            }
            _calcShapePathWithPaddingBounds(e, t) {
                const { x: i, y: n, width: r, height: o } = e,
                    a = t.figure.borderWidth,
                    s = { x: i, y: n + 0.5 * o + 1 * a },
                    l = { x: s.x + 2 * a + a, y: s.y },
                    c = { x: i + r, y: n + 0.5 * o - 1 * a },
                    d = { x: c.x - 2 * a - a, y: c.y };
                return `${this._genQuotePath(s, a, !0)} ${this._genQuotePath(l, a, !0)} ${this._genQuotePath(c, a, !1)} ${this._genQuotePath(d, a, !1)}`;
            }
        }
        class ee extends B.a {
            constructor() {
                super();
            }
            getTopicMargins(e, t) {
                const { height: i } = t,
                    n = Object(r.e)(e),
                    o = 16 + 16 * Math.min(2, i / 150),
                    a = i < 50 ? (50 - i) / 2 : 0;
                return {
                    top: a + n / 2,
                    bottom: a + n / 2,
                    left: o + n / 2,
                    right: o + n / 2,
                };
            }
            _calcShapePathWithPaddingBounds(e) {
                const { x: t, y: i, width: n, height: r } = e;
                let o;
                o = r < 50 ? 50 : r > 150 ? 150 : r;
                const a = i + 0.5 * r,
                    s = a - 0.5 * o,
                    l = a + 0.5 * o;
                return (
                    `M ${t + 8} ${s} A 72 ${o + 12} 0 0 0 ${t + 8} ${l} ` +
                    `M ${t + n - 8} ${s} A 72 ${o + 12} 0 0 1 ${t + n - 8} ${l} `
                );
            }
        }
        const te = 1 / 7;
        class ie extends d.a {
            getTopicMargins(e, t) {
                const i = Math.round(te * t.width),
                    n = super.getTopicMargins(e),
                    o = Object(r.h)(e),
                    a = Object(r.e)(e);
                return {
                    top: n.top + 0.1 * o,
                    left: Math.max(i + a, n.left),
                    bottom: n.bottom + 0.1 * o,
                    right: Math.max(i + a, n.right),
                };
            }
            calcTopicShapePath(...e) {
                return p.d(...e);
            }
        }
        class ne extends d.a {
            getTopicMargins(e, t) {
                let i = Math.min(0.5 * t.height, 0.2 * t.width);
                i = Math.round(i);
                const n = super.getTopicMargins(e),
                    o = Object(r.e)(e),
                    a = Object(r.h)(e);
                return {
                    top: Math.max(n.top, i + o) + 0.1 * a,
                    left: n.left,
                    bottom: Math.max(n.bottom, i + o) + 0.1 * a,
                    right: n.right,
                };
            }
            calcTopicShapePath(...e) {
                return p.g(...e);
            }
        }
        const re = {
            containerAreaAspectRatio: 1,
            contentAreaAspectRatio: 1,
            containerWidthContentWidthRatio: 1.6,
        };
        class oe extends b.a {
            constructor() {
                super(re);
            }
            calcTopicShapePath(e) {
                const { x: t, y: i, width: n, height: r } = e,
                    o = t + n;
                return `M ${-o} 0 A ${o}, ${o} 0 1 , 0 ${o} , 0 A ${o}, ${o} 0 1 , 0 ${-o} , 0 Z`;
            }
            _getCommonPointOffset(e, t) {
                const { width: i } = e.topicView.shapeBounds,
                    r = e.isMapLike();
                switch (t) {
                    case n.DIRECTION.LEFT:
                        return { x: (r ? 0.07 : -0.01) * i, y: 0 };
                    case n.DIRECTION.RIGHT:
                        return { x: (r ? -0.07 : 0.01) * i, y: 0 };
                    default:
                        return super._getCommonPointOffset(e, t);
                }
            }
        }
        class ae extends d.a {
            getPointOffset(e, t) {
                return (function (e, t) {
                    const { shapeBounds: i } = e.topicView,
                        n = -i.height / 4;
                    return Object(r.c)({ x: 0, y: 0 }, t, n, 0);
                })(e, t);
            }
            getTopicMargins(e, t) {
                const i = super.getTopicMargins(e),
                    n = Object(r.h)(e);
                return {
                    top: i.top + 0.1 * n,
                    left: i.left + Math.round(0.5 * t.height) + 1 + 0.5 * n,
                    bottom: i.bottom + 0.1 * n,
                    right: i.right + Math.round(0.5 * t.height) + 1 + 0.5 * n,
                };
            }
            calcTopicShapePath(e) {
                return (
                    'M ' +
                    (e.x + e.y + e.height) +
                    ' ' +
                    e.y +
                    'L ' +
                    (e.x + e.width) +
                    ' ' +
                    e.y +
                    'L ' +
                    (e.x + e.width + e.y) +
                    ' ' +
                    (e.y + e.height) +
                    'L ' +
                    e.x +
                    ' ' +
                    (e.y + e.height) +
                    'z'
                );
            }
        }
        class se extends d.a {
            constructor() {
                (super(),
                    (this.innerElementsSize = {
                        width: 0,
                        height: 0,
                    }));
            }
            getTopicMargins(e, t) {
                const i = 0.83 - 0.16;
                this.innerElementsSize = t;
                const n = super.getTopicMargins(e);
                return {
                    top: ((n.top + t.height) / 0.51) * 0.22,
                    left: ((n.left + t.width) / i) * 0.17,
                    bottom: ((n.bottom + t.height) / 0.51) * 0.27,
                    right: ((n.right + t.width) / i) * 0.16,
                };
            }
            _render(e) {
                var t, i;
                const n = e.parent(),
                    a = Object(r.e)(n),
                    s = this.getDrawBounds(e.shapeBounds, a),
                    l =
                        'M229.823,73.419c2.342-4.322,3.641-9.058,3.641-14.028\n              c0-20.24-21.44-36.649-47.887-36.649c-4.902,0-9.632,0.566-14.085,1.614C165.82,10.213,149.615,0,130.496,0\n              c-19.97,0-36.765,11.141-41.694,26.266c-5.084-1.629-10.577-2.519-16.31-2.519c-26.075,0-47.212,18.393-47.212,41.082\n              c0,3.175,0.428,6.262,1.211,9.231C11.567,79.329,1,92.346,1,107.581c0,19.898,18.017,36.028,40.243,36.028\n              c2.364,0,4.676-0.192,6.928-0.543c-0.261,1.574-0.408,3.177-0.408,4.807c0,19.952,20.131,36.127,44.964,36.127\n              c15.491,0,29.151-6.295,37.237-15.874c7.448,4.606,16.745,7.347,26.836,7.347c23.002,0,41.903-14.215,44.077-32.398\n              c2.337,0.346,4.734,0.535,7.182,0.535c23.715,0,42.941-16.878,42.941-37.698C251,92.067,242.493,79.973,229.823,73.419z';
                (e.setTopicShapePath(l), e.setTopicShapeFillPath(l));
                const c = (this.innerElementsSize.width / 250) * 1.5,
                    d = (this.innerElementsSize.height / 184) * 2;
                Object(r.v)(e, c, d, 'cloud');
                const { x: f, y: h } = s;
                (e.topicShape.translate(f, h),
                    e.topicShapeFill.translate(f, h),
                    null === (t = e.handDrawnTopicShapeBackground) ||
                        void 0 === t ||
                        t.translate(f, h),
                    null === (i = e.handDrawnTopicShapeBackgroundMask) ||
                        void 0 === i ||
                        i.translate(f, h));
                const p = o.a.generateRect(s, a);
                e.setTopicShapeSelectBoxPath(p);
            }
        }
        const le = 0.11,
            ce = {
                containerAreaAspectRatio: 1,
                contentAreaAspectRatio: 1.142,
                containerWidthContentWidthRatio: 2.2,
                contentAreaOffsetY: 0.07,
                pointOffsetByLineFocusTypeAndDirection: {
                    [r.b.DIVER_LINE]: {
                        [n.DIRECTION.LEFT]: ({ width: e }) => ({
                            x: 0.1 * e,
                            y: 0,
                        }),
                        [n.DIRECTION.RIGHT]: ({ width: e }) => ({
                            x: -0.1 * e,
                            y: 0,
                        }),
                    },
                    [r.b.ORDER_LINE]: {
                        [n.DIRECTION.LEFT]: ({ width: e, height: t }) => ({
                            x: 0.08 * e,
                            y: -0.105 * t,
                        }),
                        [n.DIRECTION.RIGHT]: ({ width: e, height: t }) => ({
                            x: -0.08 * e,
                            y: -0.105 * t,
                        }),
                    },
                },
            };
        class de extends b.a {
            constructor() {
                super(ce);
            }
            getExtConnectionOffset(e) {
                const { width: t, height: i } = e.topicView.shapeBounds;
                switch (Object(s.getChildTargetOrientation)(e)) {
                    case n.DIRECTION.RIGHT:
                    case n.DIRECTION.LEFT:
                        return le * t;
                    case n.DIRECTION.UP:
                        return 0.15 * i;
                    case n.DIRECTION.DOWN:
                        return 0.02 * i;
                    default:
                        return super.getExtConnectionOffset(e);
                }
            }
            calcTopicShapePath(e) {
                const { x: t, y: i, width: n, height: r } = e,
                    o = [
                        { x: t + 0.5 * n, y: i },
                        { x: t + 0.9998 * n, y: i + 0.3804 * r },
                        { x: t + 0.805 * n, y: i + r },
                        { x: t + 0.195 * n, y: i + r },
                        { x: t + 2e-4 * n, y: i + 0.3804 * r },
                    ],
                    a = [
                        {
                            prev: {
                                x: t + 0.489 * n,
                                y: i + 0.016 * r,
                            },
                            next: {
                                x: t + 0.511 * n,
                                y: i + 0.016 * r,
                            },
                        },
                        {
                            prev: {
                                x: t + 0.978 * n,
                                y: i + 0.377 * r,
                            },
                            next: {
                                x: t + 0.988 * n,
                                y: i + 0.393 * r,
                            },
                        },
                        {
                            prev: {
                                x: t + 0.803 * n,
                                y: i + 0.977 * r,
                            },
                            next: {
                                x: t + 0.781 * n,
                                y: i + 0.986 * r,
                            },
                        },
                        {
                            prev: {
                                x: t + 0.219 * n,
                                y: i + 0.986 * r,
                            },
                            next: {
                                x: t + 0.197 * n,
                                y: i + 0.977 * r,
                            },
                        },
                        {
                            prev: {
                                x: t + 0.011 * n,
                                y: i + 0.393 * r,
                            },
                            next: {
                                x: t + 0.022 * n,
                                y: i + 0.377 * r,
                            },
                        },
                    ],
                    s = [
                        { x: t + 0.666 * n, y: i + 0.314 * r },
                        { x: t + 0.761 * n, y: i + 0.64 * r },
                        { x: t + 0.5 * n, y: i + 0.84 * r },
                        { x: t + 0.239 * n, y: i + 0.64 * r },
                        { x: t + 0.333 * n, y: i + 0.314 * r },
                    ];
                return `M ${a[0].prev.x} ${a[0].prev.y} Q ${o[0].x} ${o[0].y} ${a[0].next.x} ${a[0].next.y} L ${s[0].x} ${s[0].y} L ${a[1].prev.x} ${a[1].prev.y} Q ${o[1].x} ${o[1].y} ${a[1].next.x} ${a[1].next.y} L ${s[1].x} ${s[1].y} L ${a[2].prev.x} ${a[2].prev.y} Q ${o[2].x} ${o[2].y} ${a[2].next.x} ${a[2].next.y} L ${s[2].x} ${s[2].y} L ${a[3].prev.x} ${a[3].prev.y} Q ${o[3].x} ${o[3].y} ${a[3].next.x} ${a[3].next.y} L ${s[3].x} ${s[3].y} L ${a[4].prev.x} ${a[4].prev.y} Q ${o[4].x} ${o[4].y} ${a[4].next.x} ${a[4].next.y} L ${s[4].x} ${s[4].y} Z`;
            }
            _getCommonPointOffset(e, t) {
                const i = e.isMapLike(),
                    { width: r, height: o } = e.topicView.shapeBounds;
                switch (t) {
                    case n.DIRECTION.LEFT:
                        return i ? { x: 0.3 * r, y: 0 } : { x: le * r, y: 0 };
                    case n.DIRECTION.RIGHT:
                        return i
                            ? { x: -0.3 * r, y: 0 }
                            : { x: -0.11 * r, y: 0 };
                    case n.DIRECTION.UP:
                        return { x: 0, y: 0.02 * o };
                    case n.DIRECTION.DOWN:
                        return { x: 0, y: -0.15 * o };
                    default:
                        return super._getCommonPointOffset(e, t);
                }
            }
        }
        class fe extends d.a {
            getBasePoint(e, t) {
                const i = [n.DIRECTION.LEFT, n.DIRECTION.RIGHT].includes(t),
                    o = Object(r.m)(e) === r.b.FOCUS_LINE,
                    a = super.getBasePoint(e, t);
                return o && i ? Object(H.c)(a, Object(r.d)(e)) : a;
            }
            _render(e, t) {
                const i = Object(r.e)(e.parent()),
                    n = Object.assign({}, e.shapeBounds);
                let a;
                ((n.height -= i / 2),
                    t && (n.y += i / 2),
                    (a = t
                        ? 'M  ' +
                          n.x +
                          ' ' +
                          n.y +
                          'L ' +
                          (n.x + n.width) +
                          ' ' +
                          n.y
                        : 'M  ' +
                          n.x +
                          ' ' +
                          (n.y + n.height) +
                          'L ' +
                          (n.x + n.width) +
                          ' ' +
                          (n.y + n.height)),
                    e.setTopicShapePath(a));
                const s = p.h(n);
                (e.setTopicShapeFillPath(s), Object(r.v)(e, 0, 0));
                const l = o.a.generateRect(n, i);
                e.setTopicShapeSelectBoxPath(l);
            }
            getTopicMargins(e, t, i) {
                const n = super.getTopicMargins(e),
                    o = Object(r.e)(e);
                return {
                    top: i ? n.top : n.top - o,
                    left: n.left,
                    bottom: i ? n.bottom - o : n.bottom,
                    right: n.right,
                };
            }
            getEndAnchorPosition(e, t) {
                const i = t.parent(),
                    o = Object(r.g)(i, t),
                    a = [
                        n.STRUCTURECLASS.BRACELEFT,
                        n.STRUCTURECLASS.BRACERIGHT,
                    ].includes(e.STRUCTURECLASS),
                    s =
                        0 === t.branchIndex() &&
                        1 === i.getChildrenBranchesByType().length,
                    l = this.getPointOffset(t, o),
                    c =
                        a && s
                            ? Object(r.l)(t.topicView.shapeBounds, o)
                            : Object(H.c)(this.getBasePoint(t, o), l);
                return Object(r.u)(c, t);
            }
        }
        class he extends d.a {
            getTopicMargins(e, t) {
                let i = Math.min(0.25 * t.height, 0.2 * t.width);
                i = Math.round(i);
                const n = Object(r.h)(e),
                    o = Object(r.e)(e),
                    a = super.getTopicMargins(e);
                return {
                    top: Math.max(a.top, i + o) + 0.1 * n,
                    left: a.left,
                    bottom: Math.max(a.bottom, i + o) + 0.1 * n,
                    right: a.right,
                };
            }
            calcTopicShapePath(...e) {
                return p.a(...e);
            }
        }
        class pe extends d.a {
            getTopicMargins(e, t) {
                const i = Object(r.h)(e),
                    n = super.getTopicMargins(e);
                return {
                    top: n.top + i,
                    left: n.left + i,
                    bottom: n.bottom + i,
                    right: n.right + i,
                };
            }
            calcTopicShapePath(e) {
                const t = 0.03 * e.height,
                    i = e.x + 0.8 * e.width,
                    n = e.y + 0.05 * e.height;
                return `\n      M ${i} ${n + t}\n      C ${e.x - e.width / 7} ${e.y - e.height / 4}, ${e.x - e.width / 4} ${e.y + e.height} , ${e.x + e.width / 2} ${e.y + e.height}\n      C ${e.x + 1.1 * e.width} ${e.y + e.height} , ${e.x + 1.1 * e.width} ${e.y + e.height / 6} , ${i} ${n - t}\n    `;
            }
        }
        const Te = 0.16,
            ue = {
                containerAreaAspectRatio: 1.35,
                contentAreaAspectRatio: 1.52,
                containerWidthContentWidthRatio: 1.785,
                contentAreaOffsetY: -0.136,
                pointOffsetByLineFocusTypeAndDirection: {
                    [r.b.DIVER_LINE]: {
                        [n.DIRECTION.LEFT]: ({ width: e }) => ({
                            x: 0.08 * e,
                            y: 0,
                        }),
                        [n.DIRECTION.RIGHT]: ({ width: e }) => ({
                            x: -0.08 * e,
                            y: 0,
                        }),
                    },
                    [r.b.ORDER_LINE]: {
                        [n.DIRECTION.LEFT]: ({ width: e, height: t }) => ({
                            x: 0.05 * e,
                            y: -0.24 * t,
                        }),
                        [n.DIRECTION.RIGHT]: ({ width: e, height: t }) => ({
                            x: -0.05 * e,
                            y: -0.24 * t,
                        }),
                    },
                },
            };
        class ge extends b.a {
            constructor() {
                super(ue);
            }
            getExtConnectionOffset(e) {
                const { width: t } = e.topicView.shapeBounds;
                switch (Object(s.getChildTargetOrientation)(e)) {
                    case n.DIRECTION.LEFT:
                    case n.DIRECTION.RIGHT:
                        return Te * t;
                    default:
                        return super.getExtConnectionOffset(e);
                }
            }
            calcTopicShapePath(e) {
                const { x: t, y: i, width: n, height: r } = e;
                return `M ${t + 0.137 * n} ${i} L ${t + 0.863 * n} ${i} L ${t + n} ${i + 0.267 * r} L ${t + 0.5 * n} ${i + r} L ${t} ${i + 0.267 * r} Z`;
            }
            _getCommonPointOffset(e, t) {
                const { width: i, height: r } = e.topicView.shapeBounds;
                switch (t) {
                    case n.DIRECTION.LEFT:
                        return { x: Te * i, y: 0 };
                    case n.DIRECTION.RIGHT:
                        return { x: -0.16 * i, y: 0 };
                    case n.DIRECTION.UP:
                        return { x: 0, y: 0.01 * r };
                    case n.DIRECTION.DOWN:
                    default:
                        return super._getCommonPointOffset(e, t);
                }
            }
        }
        const { STACKGAP: Qe, NEWCLOUDCORNERLEN: me } = a.a,
            be =
                (Math.sin(Math.PI / 9),
                Math.cos(Math.PI / 9),
                {
                    [n.TOPICSHAPE.RECT]: new T(),
                    [n.TOPICSHAPE.ROUNDEDRECT]: new h(),
                    [n.TOPICSHAPE.ELLIPSE]: new Q(),
                    [n.TOPICSHAPE._RECT]: new T(),
                    [n.TOPICSHAPE._ROUNDEDRECT]: new h(),
                    [n.TOPICSHAPE._ELLIPSE]: new Q(),
                    [n.TOPICSHAPE.ELLIPSERECT]: new u(),
                    [n.TOPICSHAPE.DIAMOND]: new m(),
                    [n.TOPICSHAPE.HEXAGON]: new ie(),
                    [n.TOPICSHAPE.ROUNDEDHEXAGON]: new ne(),
                    [n.TOPICSHAPE.ELLIPTICRECTANGLE]: new he(),
                    [n.TOPICSHAPE.TREETABLEMAIN]: new (class extends f {
                        getEndAnchorPosition(e, t) {
                            const i = t.parent(),
                                n = Object(r.g)(i, t),
                                o = Object.assign({}, t.bounds),
                                a = Object(r.u)(Object(r.l)(o, n), t);
                            return Object(r.c)(a, n, 0);
                        }
                    })(),
                    [n.TOPICSHAPE.SINGLEBREAKANGLE]: new (class extends d.a {
                        constructor() {
                            (super(...arguments),
                                (this.calcTopicShapePath = p.i));
                        }
                    })(),
                    [n.TOPICSHAPE.SINGLEBREAKANGLEWITHLINE]: new (class
                        extends d.a
                    {
                        constructor() {
                            (super(...arguments),
                                (this.calcTopicShapePath = p.j));
                        }
                    })(),
                    [n.TOPICSHAPE.DOUBLEROUNDEDANGLE]: new (class extends d.a {
                        constructor() {
                            (super(...arguments),
                                (this.calcTopicShapePath = p.b));
                        }
                    })(),
                    [n.TOPICSHAPE.DOUBLEUNDERLINE]: new (class extends fe {
                        getBasePoint(e, t) {
                            const i = [
                                    n.DIRECTION.LEFT,
                                    n.DIRECTION.RIGHT,
                                ].includes(t),
                                o = Object(r.m)(e) === r.b.FOCUS_LINE,
                                a = Object(r.l)(e.topicView.shapeBounds, t);
                            return o && i
                                ? Object(H.c)(
                                      a,
                                      (function (e) {
                                          const { shapeBounds: t } =
                                              e.topicView;
                                          return {
                                              x: 0,
                                              y: t.y + t.height,
                                          };
                                      })(e)
                                  )
                                : a;
                        }
                        getPointOffset(e, t) {
                            const i = e.topicView.figure.borderWidth || 0;
                            return t === n.DIRECTION.LEFT
                                ? { x: i / 2, y: 0 }
                                : { x: 0, y: 0 };
                        }
                        _render(e) {
                            d.a.prototype._render.call(this, e, !0);
                        }
                        calcTopicShapePath(e) {
                            return p.c(e);
                        }
                        getTopicMargins(e) {
                            const {
                                lm: t,
                                rm: i,
                                tm: n,
                                bm: o,
                                lw: a,
                            } = Object(r.q)(e);
                            return {
                                top: n,
                                left: t,
                                bottom: o + a,
                                right: i,
                            };
                        }
                    })(),
                    [n.TOPICSHAPE.LEAF]: new (class extends d.a {
                        constructor() {
                            (super(...arguments),
                                (this.type = n.TOPICSHAPE.LEAF),
                                (this.calcTopicShapePath = p.e));
                        }
                        getTopicMargins(e, t) {
                            return be[n.TOPICSHAPE.DIAMOND].getTopicMargins(
                                e,
                                t
                            );
                        }
                    })(),
                    [n.TOPICSHAPE.NEWCLOUD]: new (class extends d.a {
                        constructor() {
                            (super(...arguments),
                                (this.type = n.TOPICSHAPE.NEWCLOUD),
                                (this.calcTopicShapePath = p.f));
                        }
                        getTopicMargins(e, t) {
                            const {
                                lm: i,
                                rm: n,
                                tm: o,
                                bm: a,
                                lw: s,
                            } = Object(r.q)(e);
                            return {
                                top: o + s + me,
                                left: i + s + me,
                                bottom: a + s + me,
                                right: n + s + me,
                            };
                        }
                        _calcTopicSelectBoxPath(e, t) {
                            const i = me / 5;
                            return (
                                (e = {
                                    x: e.x - i,
                                    y: e.y - i,
                                    width: e.width + 2 * i,
                                    height: e.height + 2 * i,
                                }),
                                o.a.generateRect(e, t)
                            );
                        }
                        getEndAnchorPosition(e, t) {
                            const i = t.parent(),
                                n = Object(r.g)(i, t),
                                o = Object(r.u)(
                                    Object(r.l)(t.topicView.shapeBounds, n),
                                    t
                                );
                            return Object(r.c)(o, n, 2);
                        }
                    })(),
                    [n.TOPICSHAPE.STACK]: new (class extends d.a {
                        constructor() {
                            (super(...arguments),
                                (this.type = n.TOPICSHAPE.STACK),
                                (this.calcTopicShapePath = p.k));
                        }
                        getTopicMargins(e, t) {
                            const {
                                lm: i,
                                rm: n,
                                tm: o,
                                bm: a,
                                lw: s,
                            } = Object(r.q)(e);
                            return {
                                top: o,
                                left: i,
                                bottom: a + s + Qe,
                                right: n + Qe,
                            };
                        }
                        _render(e) {
                            super._render(e);
                            const t = Qe,
                                i = e.shapeBounds,
                                n = {
                                    x: i.x,
                                    y: i.y,
                                    width: i.width - t,
                                    height: i.height - t,
                                },
                                r = p.h(n);
                            return (e.setTopicShapeFillPath(r), e);
                        }
                    })(),
                    [n.TOPICSHAPE.UNDERLINE]: new fe(),
                    [n.TOPICSHAPE.CIRCLE]: new oe(),
                    [n.TOPICSHAPE.PARALLELOGRAM]: new ae(),
                    [n.TOPICSHAPE.NOBORDER]: new f(),
                    [n.TOPICSHAPE.CLOUD]: new se(),
                    [n.TOPICSHAPE.MATRIXMAIN]: new (class extends f {
                        getEndAnchorPosition(e, t) {
                            const i = t.getMatrixView(),
                                o = 'folded' === t.model.get('branch');
                            if (!i || !i.matrixGrid || (o && !i.matrixGrid))
                                return super.getEndAnchorPosition(e, t);
                            const s = t.parent(),
                                l = Object(r.g)(s, t),
                                c = Object.assign({}, i.matrixGrid.size);
                            ((c.x = t.topicView.shapeBounds.x),
                                (c.y = t.topicView.shapeBounds.y));
                            const d =
                                parseInt(t.getProxy().figure.borderWidth || 2) /
                                2;
                            switch (l) {
                                case n.DIRECTION.UP:
                                    c.y -= a.a.MATRIX_CELL_PADDING + d;
                                    break;
                                case n.DIRECTION.DOWN:
                                    c.y -= a.a.MATRIX_CELL_PADDING - d;
                                    break;
                                case n.DIRECTION.LEFT:
                                    c.x -= a.a.MATRIX_CELL_PADDING + d;
                                    break;
                                case n.DIRECTION.RIGHT:
                                    c.x -= a.a.MATRIX_CELL_PADDING - d;
                            }
                            const f = Object(r.u)(Object(r.l)(c, l), t);
                            return Object(r.c)(f, l, r.a);
                        }
                    })(),
                    [n.TOPICSHAPE.WATERDROP]: new (class extends oe {
                        calcTopicShapePath(e) {
                            const t = Math.max(e.width, e.height) / 2,
                                i = {
                                    x: e.x + e.width / 2,
                                    y: e.y + e.height / 2,
                                };
                            return `M ${i.x} ${i.y - t} A ${t} ${t}, 0, 1, 0, ${i.x + t} ${i.y} L ${i.x + t} ${i.y - t} Z`;
                        }
                    })(),
                    [n.TOPICSHAPE.STAR]: new de(),
                    [n.TOPICSHAPE.CUTDIAMOND]: new ge(),
                    [n.TOPICSHAPE.SHIELD]: new y(),
                    [n.TOPICSHAPE.FATLEFTARROW]: new v(),
                    [n.TOPICSHAPE.FATRIGHTARROW]: new O(),
                    [n.TOPICSHAPE.LABEL]: new x(),
                    [n.TOPICSHAPE.BOOKMARK]: new N(),
                    [n.TOPICSHAPE.SIMPLECLOUD]: new P(),
                    [n.TOPICSHAPE.HEART]: new k(),
                    [n.TOPICSHAPE.SQUAREBRACKET]: new V(),
                    [n.TOPICSHAPE.ROUNDBRACKET]: new ee(),
                    [n.TOPICSHAPE.CURLYBRACKET]: new U(),
                    [n.TOPICSHAPE.SQUAREQUOTE]: new z(),
                    [n.TOPICSHAPE.SINGLEBOOKQUOTE]: new K(),
                    [n.TOPICSHAPE.DOUBLEBOOKQUOTE]: new X(),
                    [n.TOPICSHAPE.DOUBLEQUOTE]: new q(),
                    [n.TOPICSHAPE.HANDDRAWNRECT]: new T(),
                    [n.TOPICSHAPE.HANDDRAWNROUNDEDRECT]: new h(),
                    [n.TOPICSHAPE.HANDDRAWNUNDERLINE]: new fe(),
                    [n.TOPICSHAPE.HANDDRAWNELLIPSE]: new pe(),
                    [n.CALLOUTSHAPE.RECT]: new (class extends d.a {
                        constructor() {
                            (super(...arguments),
                                (this.type = n.CALLOUTSHAPE.RECT));
                        }
                        getTopicMargins(e, t) {
                            return be[n.TOPICSHAPE.RECT].getTopicMargins(e, t);
                        }
                        _render(e) {
                            return be[n.TOPICSHAPE.RECT]._render(e);
                        }
                    })(),
                    [n.CALLOUTSHAPE.ROUNDEDRECT]: new (class extends h {
                        constructor() {
                            (super(...arguments),
                                (this.type = n.CALLOUTSHAPE.ROUNDEDRECT));
                        }
                    })(),
                    [n.CALLOUTSHAPE.ELLIPSE]: new (class extends d.a {
                        constructor() {
                            (super(...arguments),
                                (this.type = n.CALLOUTSHAPE.ELLIPSE));
                        }
                        getTopicMargins(e, t) {
                            return be[n.TOPICSHAPE.ELLIPSE].getTopicMargins(
                                e,
                                t
                            );
                        }
                        _render(e) {
                            return be[n.TOPICSHAPE.ELLIPSE]._render(e);
                        }
                    })(),
                });
        class Ce {
            [n.STRUCTURECLASS.BRACERIGHT](e, t) {
                return {
                    x: t.getRealPosition().x + t.bounds.x,
                    y: e.y,
                };
            }
            [n.STRUCTURECLASS.BRACELEFT](e, t) {
                return {
                    x: t.getRealPosition().x + t.bounds.x + t.bounds.width,
                    y: e.y,
                };
            }
            wrapTopicShapeObject(e) {
                return (t) => {
                    Object.keys(be).forEach((i) => {
                        const n = be[i][e].bind(be[i]);
                        be[i][e] = (e, i) => t()(e, i, n);
                    });
                };
            }
            wrapLineEndSpacingPatch() {
                return (e, t, i) => {
                    let n = i(e, t);
                    const r = e.STRUCTURECLASS;
                    this[r] && (n = this[r](n, t));
                    const o = t.parent();
                    return o instanceof c.a
                        ? Object(H.c)(
                              n,
                              Object(s.getLineEndSpacingPatchPoint)(o, t)
                          )
                        : n;
                };
            }
            wrap() {
                this.wrapTopicShapeObject('getEndAnchorPosition')(
                    this.wrapLineEndSpacingPatch.bind(this)
                );
            }
        }
        new Ce().wrap();
        t.a = function (e) {
            return be[e]
                ? be[e]
                : (l.b
                      .get(n.CONFIG.LOGGER)
                      .warn(`Unsupported topic shape class: ${e}`),
                  be[n.TOPICSHAPE.ROUNDEDRECT]);
        };
    },
];
