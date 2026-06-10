export default [
    function (e, t, i) {
        'use strict';
        (i.d(t, 'e', function () {
            return se;
        }),
            i.d(t, 'a', function () {
                return le;
            }),
            i.d(t, 'b', function () {
                return ce;
            }),
            i.d(t, 'd', function () {
                return pe;
            }),
            i.d(t, 'c', function () {
                return Te;
            }),
            i.d(t, 'f', function () {
                return de;
            }));
        var n = i(0),
            r = i(1),
            o = i(28);
        function a(e, t, i) {
            if (e && e.length) {
                const [n, r] = t,
                    o = (Math.PI / 180) * i,
                    a = Math.cos(o),
                    s = Math.sin(o);
                e.forEach((e) => {
                    const [t, i] = e;
                    ((e[0] = (t - n) * a - (i - r) * s + n),
                        (e[1] = (t - n) * s + (i - r) * a + r));
                });
            }
        }
        function s(e) {
            const t = e[0],
                i = e[1];
            return Math.sqrt(
                Math.pow(t[0] - i[0], 2) + Math.pow(t[1] - i[1], 2)
            );
        }
        function l(e, t) {
            const i = t.hachureAngle + 90;
            let n = t.hachureGap;
            (n < 0 && (n = 4 * t.strokeWidth), (n = Math.max(n, 0.1)));
            const r = [0, 0];
            if (i) for (const t of e) a(t, r, i);
            const o = (function (e, t) {
                const i = [];
                for (const t of e) {
                    const e = [...t];
                    (e[0].join(',') !== e[e.length - 1].join(',') &&
                        e.push([e[0][0], e[0][1]]),
                        e.length > 2 && i.push(e));
                }
                const n = [];
                t = Math.max(t, 0.1);
                const r = [];
                for (const e of i)
                    for (let t = 0; t < e.length - 1; t++) {
                        const i = e[t],
                            n = e[t + 1];
                        if (i[1] !== n[1]) {
                            const e = Math.min(i[1], n[1]);
                            r.push({
                                ymin: e,
                                ymax: Math.max(i[1], n[1]),
                                x: e === i[1] ? i[0] : n[0],
                                islope: (n[0] - i[0]) / (n[1] - i[1]),
                            });
                        }
                    }
                if (
                    (r.sort((e, t) =>
                        e.ymin < t.ymin
                            ? -1
                            : e.ymin > t.ymin
                              ? 1
                              : e.x < t.x
                                ? -1
                                : e.x > t.x
                                  ? 1
                                  : e.ymax === t.ymax
                                    ? 0
                                    : (e.ymax - t.ymax) /
                                      Math.abs(e.ymax - t.ymax)
                    ),
                    !r.length)
                )
                    return n;
                let o = [],
                    a = r[0].ymin;
                for (; o.length || r.length; ) {
                    if (r.length) {
                        let e = -1;
                        for (let t = 0; t < r.length && !(r[t].ymin > a); t++)
                            e = t;
                        r.splice(0, e + 1).forEach((e) => {
                            o.push({ s: a, edge: e });
                        });
                    }
                    if (
                        ((o = o.filter((e) => !(e.edge.ymax <= a))),
                        o.sort((e, t) =>
                            e.edge.x === t.edge.x
                                ? 0
                                : (e.edge.x - t.edge.x) /
                                  Math.abs(e.edge.x - t.edge.x)
                        ),
                        o.length > 1)
                    )
                        for (let e = 0; e < o.length; e += 2) {
                            const t = e + 1;
                            if (t >= o.length) break;
                            const i = o[e].edge,
                                r = o[t].edge;
                            n.push([
                                [Math.round(i.x), a],
                                [Math.round(r.x), a],
                            ]);
                        }
                    ((a += t),
                        o.forEach((e) => {
                            e.edge.x = e.edge.x + t * e.edge.islope;
                        }));
                }
                return n;
            })(e, n);
            if (i) {
                for (const t of e) a(t, r, -i);
                !(function (e, t, i) {
                    const n = [];
                    (e.forEach((e) => n.push(...e)), a(n, t, i));
                })(o, r, -i);
            }
            return o;
        }
        class c {
            constructor(e) {
                this.helper = e;
            }
            fillPolygons(e, t) {
                return this._fillPolygons(e, t);
            }
            _fillPolygons(e, t) {
                const i = l(e, t);
                return {
                    type: 'fillSketch',
                    ops: this.renderLines(i, t),
                };
            }
            renderLines(e, t) {
                const i = [];
                for (const n of e)
                    i.push(
                        ...this.helper.doubleLineOps(
                            n[0][0],
                            n[0][1],
                            n[1][0],
                            n[1][1],
                            t
                        )
                    );
                return i;
            }
        }
        class d extends c {
            fillPolygons(e, t) {
                let i = t.hachureGap;
                (i < 0 && (i = 4 * t.strokeWidth), (i = Math.max(i, 0.1)));
                const n = l(e, Object.assign({}, t, { hachureGap: i })),
                    r = (Math.PI / 180) * t.hachureAngle,
                    o = [],
                    a = 0.5 * i * Math.cos(r),
                    c = 0.5 * i * Math.sin(r);
                for (const [e, t] of n)
                    s([e, t]) &&
                        o.push(
                            [[e[0] - a, e[1] + c], [...t]],
                            [[e[0] + a, e[1] - c], [...t]]
                        );
                return {
                    type: 'fillSketch',
                    ops: this.renderLines(o, t),
                };
            }
        }
        class f extends c {
            fillPolygons(e, t) {
                const i = this._fillPolygons(e, t),
                    n = Object.assign({}, t, {
                        hachureAngle: t.hachureAngle + 90,
                    }),
                    r = this._fillPolygons(e, n);
                return ((i.ops = i.ops.concat(r.ops)), i);
            }
        }
        class h {
            constructor(e) {
                this.helper = e;
            }
            fillPolygons(e, t) {
                const i = l(e, (t = Object.assign({}, t, { hachureAngle: 0 })));
                return this.dotsOnLines(i, t);
            }
            dotsOnLines(e, t) {
                const i = [];
                let n = t.hachureGap;
                (n < 0 && (n = 4 * t.strokeWidth), (n = Math.max(n, 0.1)));
                let r = t.fillWeight;
                r < 0 && (r = t.strokeWidth / 2);
                const o = n / 4;
                for (const a of e) {
                    const e = s(a),
                        l = e / n,
                        c = Math.ceil(l) - 1,
                        d = e - c * n,
                        f = (a[0][0] + a[1][0]) / 2 - n / 4,
                        h = Math.min(a[0][1], a[1][1]);
                    for (let e = 0; e < c; e++) {
                        const a = h + d + e * n,
                            s = f - o + 2 * Math.random() * o,
                            l = a - o + 2 * Math.random() * o,
                            c = this.helper.ellipse(s, l, r, r, t);
                        i.push(...c.ops);
                    }
                }
                return { type: 'fillSketch', ops: i };
            }
        }
        class p {
            constructor(e) {
                this.helper = e;
            }
            fillPolygons(e, t) {
                const i = l(e, t);
                return {
                    type: 'fillSketch',
                    ops: this.dashedLine(i, t),
                };
            }
            dashedLine(e, t) {
                const i =
                        t.dashOffset < 0
                            ? t.hachureGap < 0
                                ? 4 * t.strokeWidth
                                : t.hachureGap
                            : t.dashOffset,
                    n =
                        t.dashGap < 0
                            ? t.hachureGap < 0
                                ? 4 * t.strokeWidth
                                : t.hachureGap
                            : t.dashGap,
                    r = [];
                return (
                    e.forEach((e) => {
                        const o = s(e),
                            a = Math.floor(o / (i + n)),
                            l = (o + n - a * (i + n)) / 2;
                        let c = e[0],
                            d = e[1];
                        c[0] > d[0] && ((c = e[1]), (d = e[0]));
                        const f = Math.atan((d[1] - c[1]) / (d[0] - c[0]));
                        for (let e = 0; e < a; e++) {
                            const o = e * (i + n),
                                a = o + i,
                                s = [
                                    c[0] + o * Math.cos(f) + l * Math.cos(f),
                                    c[1] + o * Math.sin(f) + l * Math.sin(f),
                                ],
                                d = [
                                    c[0] + a * Math.cos(f) + l * Math.cos(f),
                                    c[1] + a * Math.sin(f) + l * Math.sin(f),
                                ];
                            r.push(
                                ...this.helper.doubleLineOps(
                                    s[0],
                                    s[1],
                                    d[0],
                                    d[1],
                                    t
                                )
                            );
                        }
                    }),
                    r
                );
            }
        }
        class T {
            constructor(e) {
                this.helper = e;
            }
            fillPolygons(e, t) {
                const i = t.hachureGap < 0 ? 4 * t.strokeWidth : t.hachureGap,
                    n = t.zigzagOffset < 0 ? i : t.zigzagOffset,
                    r = l(
                        e,
                        (t = Object.assign({}, t, {
                            hachureGap: i + n,
                        }))
                    );
                return {
                    type: 'fillSketch',
                    ops: this.zigzagLines(r, n, t),
                };
            }
            zigzagLines(e, t, i) {
                const n = [];
                return (
                    e.forEach((e) => {
                        const r = s(e),
                            o = Math.round(r / (2 * t));
                        let a = e[0],
                            l = e[1];
                        a[0] > l[0] && ((a = e[1]), (l = e[0]));
                        const c = Math.atan((l[1] - a[1]) / (l[0] - a[0]));
                        for (let e = 0; e < o; e++) {
                            const r = 2 * e * t,
                                o = 2 * (e + 1) * t,
                                s = Math.sqrt(2 * Math.pow(t, 2)),
                                l = [
                                    a[0] + r * Math.cos(c),
                                    a[1] + r * Math.sin(c),
                                ],
                                d = [
                                    a[0] + o * Math.cos(c),
                                    a[1] + o * Math.sin(c),
                                ],
                                f = [
                                    l[0] + s * Math.cos(c + Math.PI / 4),
                                    l[1] + s * Math.sin(c + Math.PI / 4),
                                ];
                            n.push(
                                ...this.helper.doubleLineOps(
                                    l[0],
                                    l[1],
                                    f[0],
                                    f[1],
                                    i
                                ),
                                ...this.helper.doubleLineOps(
                                    f[0],
                                    f[1],
                                    d[0],
                                    d[1],
                                    i
                                )
                            );
                        }
                    }),
                    n
                );
            }
        }
        const u = {};
        class g {
            constructor(e) {
                this.seed = e;
            }
            next() {
                return this.seed
                    ? ((2 ** 31 - 1) &
                          (this.seed = Math.imul(48271, this.seed))) /
                          2 ** 31
                    : Math.random();
            }
        }
        const Q = {
            A: 7,
            a: 7,
            C: 6,
            c: 6,
            H: 1,
            h: 1,
            L: 2,
            l: 2,
            M: 2,
            m: 2,
            Q: 4,
            q: 4,
            S: 4,
            s: 4,
            T: 2,
            t: 2,
            V: 1,
            v: 1,
            Z: 0,
            z: 0,
        };
        function m(e, t) {
            return e.type === t;
        }
        function b(e) {
            const t = [],
                i = (function (e) {
                    const t = new Array();
                    for (; '' !== e; )
                        if (e.match(/^([ \t\r\n,]+)/))
                            e = e.substr(RegExp.$1.length);
                        else if (e.match(/^([aAcChHlLmMqQsStTvVzZ])/))
                            ((t[t.length] = {
                                type: 0,
                                text: RegExp.$1,
                            }),
                                (e = e.substr(RegExp.$1.length)));
                        else {
                            if (
                                !e.match(
                                    /^(([-+]?[0-9]+(\.[0-9]*)?|[-+]?\.[0-9]+)([eE][-+]?[0-9]+)?)/
                                )
                            )
                                return [];
                            ((t[t.length] = {
                                type: 1,
                                text: `${parseFloat(RegExp.$1)}`,
                            }),
                                (e = e.substr(RegExp.$1.length)));
                        }
                    return ((t[t.length] = { type: 2, text: '' }), t);
                })(e);
            let n = 'BOD',
                r = 0,
                o = i[r];
            for (; !m(o, 2); ) {
                let a = 0;
                const s = [];
                if ('BOD' === n) {
                    if ('M' !== o.text && 'm' !== o.text) return b('M0,0' + e);
                    (r++, (a = Q[o.text]), (n = o.text));
                } else
                    m(o, 1) ? (a = Q[n]) : (r++, (a = Q[o.text]), (n = o.text));
                if (!(r + a < i.length))
                    throw new Error('Path data ended short');
                for (let e = r; e < r + a; e++) {
                    const t = i[e];
                    if (!m(t, 1))
                        throw new Error(
                            'Param not a number: ' + n + ',' + t.text
                        );
                    s[s.length] = +t.text;
                }
                if ('number' != typeof Q[n])
                    throw new Error('Bad segment: ' + n);
                {
                    const e = { key: n, data: s };
                    (t.push(e),
                        (r += a),
                        (o = i[r]),
                        'M' === n && (n = 'L'),
                        'm' === n && (n = 'l'));
                }
            }
            return t;
        }
        function C(e, t, i) {
            return [
                e * Math.cos(i) - t * Math.sin(i),
                e * Math.sin(i) + t * Math.cos(i),
            ];
        }
        function L(e, t, i, n, r, o, a, s, l, c) {
            const d = ((f = a), (Math.PI * f) / 180);
            var f;
            let h = [],
                p = 0,
                T = 0,
                u = 0,
                g = 0;
            if (c) [p, T, u, g] = c;
            else {
                (([e, t] = C(e, t, -d)), ([i, n] = C(i, n, -d)));
                const a = (e - i) / 2,
                    c = (t - n) / 2;
                let f = (a * a) / (r * r) + (c * c) / (o * o);
                f > 1 && ((f = Math.sqrt(f)), (r *= f), (o *= f));
                const h = r * r,
                    Q = o * o,
                    m = h * Q - h * c * c - Q * a * a,
                    b = h * c * c + Q * a * a,
                    L = (s === l ? -1 : 1) * Math.sqrt(Math.abs(m / b));
                ((u = (L * r * c) / o + (e + i) / 2),
                    (g = (L * -o * a) / r + (t + n) / 2),
                    (p = Math.asin(parseFloat(((t - g) / o).toFixed(9)))),
                    (T = Math.asin(parseFloat(((n - g) / o).toFixed(9)))),
                    e < u && (p = Math.PI - p),
                    i < u && (T = Math.PI - T),
                    p < 0 && (p = 2 * Math.PI + p),
                    T < 0 && (T = 2 * Math.PI + T),
                    l && p > T && (p -= 2 * Math.PI),
                    !l && T > p && (T -= 2 * Math.PI));
            }
            let Q = T - p;
            if (Math.abs(Q) > (120 * Math.PI) / 180) {
                const e = T,
                    t = i,
                    s = n;
                ((T =
                    l && T > p
                        ? p + ((120 * Math.PI) / 180) * 1
                        : p + ((120 * Math.PI) / 180) * -1),
                    (h = L(
                        (i = u + r * Math.cos(T)),
                        (n = g + o * Math.sin(T)),
                        t,
                        s,
                        r,
                        o,
                        a,
                        0,
                        l,
                        [T, e, u, g]
                    )));
            }
            Q = T - p;
            const m = Math.cos(p),
                b = Math.sin(p),
                y = Math.cos(T),
                M = Math.sin(T),
                A = Math.tan(Q / 4),
                v = (4 / 3) * r * A,
                E = (4 / 3) * o * A,
                _ = [e, t],
                O = [e + v * b, t - E * m],
                S = [i + v * M, n - E * y],
                x = [i, n];
            if (((O[0] = 2 * _[0] - O[0]), (O[1] = 2 * _[1] - O[1]), c))
                return [O, S, x].concat(h);
            {
                h = [O, S, x].concat(h);
                const e = [];
                for (let t = 0; t < h.length; t += 3) {
                    const i = C(h[t][0], h[t][1], d),
                        n = C(h[t + 1][0], h[t + 1][1], d),
                        r = C(h[t + 2][0], h[t + 2][1], d);
                    e.push([i[0], i[1], n[0], n[1], r[0], r[1]]);
                }
                return e;
            }
        }
        const y = {
            randOffset: function (e, t) {
                return P(e, t);
            },
            randOffsetWithRange: function (e, t, i) {
                return w(e, t, i);
            },
            ellipse: function (e, t, i, n, r) {
                const o = _(i, n, r);
                return O(e, t, r, o).opset;
            },
            doubleLineOps: function (e, t, i, n, r) {
                return H(e, t, i, n, r, !0);
            },
        };
        function M(e, t, i, n, r) {
            return { type: 'path', ops: H(e, t, i, n, r) };
        }
        function A(e, t, i) {
            const n = (e || []).length;
            if (n > 2) {
                const r = [];
                for (let t = 0; t < n - 1; t++)
                    r.push(...H(e[t][0], e[t][1], e[t + 1][0], e[t + 1][1], i));
                return (
                    t &&
                        r.push(
                            ...H(e[n - 1][0], e[n - 1][1], e[0][0], e[0][1], i)
                        ),
                    { type: 'path', ops: r }
                );
            }
            return 2 === n
                ? M(e[0][0], e[0][1], e[1][0], e[1][1], i)
                : { type: 'path', ops: [] };
        }
        function v(e, t, i, n, r) {
            return (function (e, t) {
                return A(e, !0, t);
            })(
                [
                    [e, t],
                    [e + i, t],
                    [e + i, t + n],
                    [e, t + n],
                ],
                r
            );
        }
        function E(e, t) {
            let i = F(e, 1 * (1 + 0.2 * t.roughness), t);
            if (!t.disableMultiStroke) {
                const n = F(
                    e,
                    1.5 * (1 + 0.22 * t.roughness),
                    (function (e) {
                        const t = Object.assign({}, e);
                        ((t.randomizer = void 0),
                            e.seed && (t.seed = e.seed + 1));
                        return t;
                    })(t)
                );
                i = i.concat(n);
            }
            return { type: 'path', ops: i };
        }
        function _(e, t, i) {
            const n = Math.sqrt(
                    2 *
                        Math.PI *
                        Math.sqrt((Math.pow(e / 2, 2) + Math.pow(t / 2, 2)) / 2)
                ),
                r = Math.ceil(
                    Math.max(
                        i.curveStepCount,
                        (i.curveStepCount / Math.sqrt(200)) * n
                    )
                ),
                o = (2 * Math.PI) / r;
            let a = Math.abs(e / 2),
                s = Math.abs(t / 2);
            const l = 1 - i.curveFitting;
            return (
                (a += P(a * l, i)),
                (s += P(s * l, i)),
                { increment: o, rx: a, ry: s }
            );
        }
        function O(e, t, i, n) {
            const [r, o] = B(
                n.increment,
                e,
                t,
                n.rx,
                n.ry,
                1,
                n.increment * w(0.1, w(0.4, 1, i), i),
                i
            );
            let a = k(r, null, i);
            if (!i.disableMultiStroke && 0 !== i.roughness) {
                const [r] = B(n.increment, e, t, n.rx, n.ry, 1.5, 0, i),
                    o = k(r, null, i);
                a = a.concat(o);
            }
            return {
                estimatedPoints: o,
                opset: { type: 'path', ops: a },
            };
        }
        function S(e, t, i, n, r, o, a, s, l) {
            const c = e,
                d = t;
            let f = Math.abs(i / 2),
                h = Math.abs(n / 2);
            ((f += P(0.01 * f, l)), (h += P(0.01 * h, l)));
            let p = r,
                T = o;
            for (; p < 0; ) ((p += 2 * Math.PI), (T += 2 * Math.PI));
            T - p > 2 * Math.PI && ((p = 0), (T = 2 * Math.PI));
            const u = (2 * Math.PI) / l.curveStepCount,
                g = Math.min(u / 2, (T - p) / 2),
                Q = V(g, c, d, f, h, p, T, 1, l);
            if (!l.disableMultiStroke) {
                const e = V(g, c, d, f, h, p, T, 1.5, l);
                Q.push(...e);
            }
            return (
                a &&
                    (s
                        ? Q.push(
                              ...H(
                                  c,
                                  d,
                                  c + f * Math.cos(p),
                                  d + h * Math.sin(p),
                                  l
                              ),
                              ...H(
                                  c,
                                  d,
                                  c + f * Math.cos(T),
                                  d + h * Math.sin(T),
                                  l
                              )
                          )
                        : Q.push(
                              { op: 'lineTo', data: [c, d] },
                              {
                                  op: 'lineTo',
                                  data: [
                                      c + f * Math.cos(p),
                                      d + h * Math.sin(p),
                                  ],
                              }
                          )),
                { type: 'path', ops: Q }
            );
        }
        function x(e, t) {
            const i = (function (e) {
                    const t = [];
                    let i = '',
                        n = 0,
                        r = 0,
                        o = 0,
                        a = 0,
                        s = 0,
                        l = 0;
                    for (const { key: c, data: d } of e) {
                        switch (c) {
                            case 'M':
                                (t.push({ key: 'M', data: [...d] }),
                                    ([n, r] = d),
                                    ([o, a] = d));
                                break;
                            case 'C':
                                (t.push({ key: 'C', data: [...d] }),
                                    (n = d[4]),
                                    (r = d[5]),
                                    (s = d[2]),
                                    (l = d[3]));
                                break;
                            case 'L':
                                (t.push({ key: 'L', data: [...d] }),
                                    ([n, r] = d));
                                break;
                            case 'H':
                                ((n = d[0]),
                                    t.push({
                                        key: 'L',
                                        data: [n, r],
                                    }));
                                break;
                            case 'V':
                                ((r = d[0]),
                                    t.push({
                                        key: 'L',
                                        data: [n, r],
                                    }));
                                break;
                            case 'S': {
                                let e = 0,
                                    o = 0;
                                ('C' === i || 'S' === i
                                    ? ((e = n + (n - s)), (o = r + (r - l)))
                                    : ((e = n), (o = r)),
                                    t.push({
                                        key: 'C',
                                        data: [e, o, ...d],
                                    }),
                                    (s = d[0]),
                                    (l = d[1]),
                                    (n = d[2]),
                                    (r = d[3]));
                                break;
                            }
                            case 'T': {
                                const [e, o] = d;
                                let a = 0,
                                    c = 0;
                                'Q' === i || 'T' === i
                                    ? ((a = n + (n - s)), (c = r + (r - l)))
                                    : ((a = n), (c = r));
                                const f = n + (2 * (a - n)) / 3,
                                    h = r + (2 * (c - r)) / 3,
                                    p = e + (2 * (a - e)) / 3,
                                    T = o + (2 * (c - o)) / 3;
                                (t.push({
                                    key: 'C',
                                    data: [f, h, p, T, e, o],
                                }),
                                    (s = a),
                                    (l = c),
                                    (n = e),
                                    (r = o));
                                break;
                            }
                            case 'Q': {
                                const [e, i, o, a] = d,
                                    c = n + (2 * (e - n)) / 3,
                                    f = r + (2 * (i - r)) / 3,
                                    h = o + (2 * (e - o)) / 3,
                                    p = a + (2 * (i - a)) / 3;
                                (t.push({
                                    key: 'C',
                                    data: [c, f, h, p, o, a],
                                }),
                                    (s = e),
                                    (l = i),
                                    (n = o),
                                    (r = a));
                                break;
                            }
                            case 'A': {
                                const e = Math.abs(d[0]),
                                    i = Math.abs(d[1]),
                                    o = d[2],
                                    a = d[3],
                                    s = d[4],
                                    l = d[5],
                                    c = d[6];
                                0 === e || 0 === i
                                    ? (t.push({
                                          key: 'C',
                                          data: [n, r, l, c, l, c],
                                      }),
                                      (n = l),
                                      (r = c))
                                    : (n === l && r === c) ||
                                      (L(n, r, l, c, e, i, o, a, s).forEach(
                                          function (e) {
                                              t.push({
                                                  key: 'C',
                                                  data: e,
                                              });
                                          }
                                      ),
                                      (n = l),
                                      (r = c));
                                break;
                            }
                            case 'Z':
                                (t.push({ key: 'Z', data: [] }),
                                    (n = o),
                                    (r = a));
                        }
                        i = c;
                    }
                    return t;
                })(
                    (function (e) {
                        let t = 0,
                            i = 0,
                            n = 0,
                            r = 0;
                        const o = [];
                        for (const { key: a, data: s } of e)
                            switch (a) {
                                case 'M':
                                    (o.push({
                                        key: 'M',
                                        data: [...s],
                                    }),
                                        ([t, i] = s),
                                        ([n, r] = s));
                                    break;
                                case 'm':
                                    ((t += s[0]),
                                        (i += s[1]),
                                        o.push({
                                            key: 'M',
                                            data: [t, i],
                                        }),
                                        (n = t),
                                        (r = i));
                                    break;
                                case 'L':
                                    (o.push({
                                        key: 'L',
                                        data: [...s],
                                    }),
                                        ([t, i] = s));
                                    break;
                                case 'l':
                                    ((t += s[0]),
                                        (i += s[1]),
                                        o.push({
                                            key: 'L',
                                            data: [t, i],
                                        }));
                                    break;
                                case 'C':
                                    (o.push({
                                        key: 'C',
                                        data: [...s],
                                    }),
                                        (t = s[4]),
                                        (i = s[5]));
                                    break;
                                case 'c': {
                                    const e = s.map((e, n) =>
                                        n % 2 ? e + i : e + t
                                    );
                                    (o.push({ key: 'C', data: e }),
                                        (t = e[4]),
                                        (i = e[5]));
                                    break;
                                }
                                case 'Q':
                                    (o.push({
                                        key: 'Q',
                                        data: [...s],
                                    }),
                                        (t = s[2]),
                                        (i = s[3]));
                                    break;
                                case 'q': {
                                    const e = s.map((e, n) =>
                                        n % 2 ? e + i : e + t
                                    );
                                    (o.push({ key: 'Q', data: e }),
                                        (t = e[2]),
                                        (i = e[3]));
                                    break;
                                }
                                case 'A':
                                    (o.push({
                                        key: 'A',
                                        data: [...s],
                                    }),
                                        (t = s[5]),
                                        (i = s[6]));
                                    break;
                                case 'a':
                                    ((t += s[5]),
                                        (i += s[6]),
                                        o.push({
                                            key: 'A',
                                            data: [
                                                s[0],
                                                s[1],
                                                s[2],
                                                s[3],
                                                s[4],
                                                t,
                                                i,
                                            ],
                                        }));
                                    break;
                                case 'H':
                                    (o.push({
                                        key: 'H',
                                        data: [...s],
                                    }),
                                        (t = s[0]));
                                    break;
                                case 'h':
                                    ((t += s[0]),
                                        o.push({
                                            key: 'H',
                                            data: [t],
                                        }));
                                    break;
                                case 'V':
                                    (o.push({
                                        key: 'V',
                                        data: [...s],
                                    }),
                                        (i = s[0]));
                                    break;
                                case 'v':
                                    ((i += s[0]),
                                        o.push({
                                            key: 'V',
                                            data: [i],
                                        }));
                                    break;
                                case 'S':
                                    (o.push({
                                        key: 'S',
                                        data: [...s],
                                    }),
                                        (t = s[2]),
                                        (i = s[3]));
                                    break;
                                case 's': {
                                    const e = s.map((e, n) =>
                                        n % 2 ? e + i : e + t
                                    );
                                    (o.push({ key: 'S', data: e }),
                                        (t = e[2]),
                                        (i = e[3]));
                                    break;
                                }
                                case 'T':
                                    (o.push({
                                        key: 'T',
                                        data: [...s],
                                    }),
                                        (t = s[0]),
                                        (i = s[1]));
                                    break;
                                case 't':
                                    ((t += s[0]),
                                        (i += s[1]),
                                        o.push({
                                            key: 'T',
                                            data: [t, i],
                                        }));
                                    break;
                                case 'Z':
                                case 'z':
                                    (o.push({ key: 'Z', data: [] }),
                                        (t = n),
                                        (i = r));
                            }
                        return o;
                    })(b(e))
                ),
                n = [];
            let r = [0, 0],
                o = [0, 0];
            for (const { key: e, data: a } of i)
                switch (e) {
                    case 'M': {
                        const e = 1 * (t.maxRandomnessOffset || 0),
                            i = t.preserveVertices;
                        (n.push({
                            op: 'move',
                            data: a.map((n) => n + (i ? 0 : P(e, t))),
                        }),
                            (o = [a[0], a[1]]),
                            (r = [a[0], a[1]]));
                        break;
                    }
                    case 'L':
                        (n.push(...H(o[0], o[1], a[0], a[1], t)),
                            (o = [a[0], a[1]]));
                        break;
                    case 'C': {
                        const [e, i, r, s, l, c] = a;
                        (n.push(...Y(e, i, r, s, l, c, o, t)), (o = [l, c]));
                        break;
                    }
                    case 'Z':
                        (n.push(...H(o[0], o[1], r[0], r[1], t)),
                            (o = [r[0], r[1]]));
                }
            return { type: 'path', ops: n };
        }
        function R(e, t) {
            const i = [];
            for (const n of e)
                if (n.length) {
                    const e = t.maxRandomnessOffset || 0,
                        r = n.length;
                    if (r > 2) {
                        i.push({
                            op: 'move',
                            data: [n[0][0] + P(e, t), n[0][1] + P(e, t)],
                        });
                        for (let o = 1; o < r; o++)
                            i.push({
                                op: 'lineTo',
                                data: [n[o][0] + P(e, t), n[o][1] + P(e, t)],
                            });
                    }
                }
            return { type: 'fillPath', ops: i };
        }
        function I(e, t) {
            return (function (e, t) {
                let i = e.fillStyle || 'hachure';
                if (!u[i])
                    switch (i) {
                        case 'zigzag':
                            u[i] || (u[i] = new d(t));
                            break;
                        case 'cross-hatch':
                            u[i] || (u[i] = new f(t));
                            break;
                        case 'dots':
                            u[i] || (u[i] = new h(t));
                            break;
                        case 'dashed':
                            u[i] || (u[i] = new p(t));
                            break;
                        case 'zigzag-line':
                            u[i] || (u[i] = new T(t));
                            break;
                        default:
                            ((i = 'hachure'), u[i] || (u[i] = new c(t)));
                    }
                return u[i];
            })(t, y).fillPolygons(e, t);
        }
        function N(e) {
            return (
                e.randomizer || (e.randomizer = new g(e.seed || 0)),
                e.randomizer.next()
            );
        }
        function w(e, t, i, n = 1) {
            return i.roughness * n * (N(i) * (t - e) + e);
        }
        function P(e, t, i = 1) {
            return w(-e, e, t, i);
        }
        function H(e, t, i, n, r, o = !1) {
            const a = o ? r.disableMultiStrokeFill : r.disableMultiStroke,
                s = D(e, t, i, n, r, !0, !1);
            if (a) return s;
            const l = D(e, t, i, n, r, !0, !0);
            return s.concat(l);
        }
        function D(e, t, i, n, r, o, a) {
            const s = Math.pow(e - i, 2) + Math.pow(t - n, 2),
                l = Math.sqrt(s);
            let c = 1;
            c = l < 200 ? 1 : l > 500 ? 0.4 : -0.0016668 * l + 1.233334;
            let d = r.maxRandomnessOffset || 0;
            d * d * 100 > s && (d = l / 10);
            const f = d / 2,
                h = 0.2 + 0.2 * N(r);
            let p = (r.bowing * r.maxRandomnessOffset * (n - t)) / 200,
                T = (r.bowing * r.maxRandomnessOffset * (e - i)) / 200;
            ((p = P(p, r, c)), (T = P(T, r, c)));
            const u = [],
                g = () => P(f, r, c),
                Q = () => P(d, r, c),
                m = r.preserveVertices;
            return (
                o &&
                    (a
                        ? u.push({
                              op: 'move',
                              data: [e + (m ? 0 : g()), t + (m ? 0 : g())],
                          })
                        : u.push({
                              op: 'move',
                              data: [
                                  e + (m ? 0 : P(d, r, c)),
                                  t + (m ? 0 : P(d, r, c)),
                              ],
                          })),
                a
                    ? u.push({
                          op: 'bcurveTo',
                          data: [
                              p + e + (i - e) * h + g(),
                              T + t + (n - t) * h + g(),
                              p + e + 2 * (i - e) * h + g(),
                              T + t + 2 * (n - t) * h + g(),
                              i + (m ? 0 : g()),
                              n + (m ? 0 : g()),
                          ],
                      })
                    : u.push({
                          op: 'bcurveTo',
                          data: [
                              p + e + (i - e) * h + Q(),
                              T + t + (n - t) * h + Q(),
                              p + e + 2 * (i - e) * h + Q(),
                              T + t + 2 * (n - t) * h + Q(),
                              i + (m ? 0 : Q()),
                              n + (m ? 0 : Q()),
                          ],
                      }),
                u
            );
        }
        function F(e, t, i) {
            const n = [];
            (n.push([e[0][0] + P(t, i), e[0][1] + P(t, i)]),
                n.push([e[0][0] + P(t, i), e[0][1] + P(t, i)]));
            for (let r = 1; r < e.length; r++)
                (n.push([e[r][0] + P(t, i), e[r][1] + P(t, i)]),
                    r === e.length - 1 &&
                        n.push([e[r][0] + P(t, i), e[r][1] + P(t, i)]));
            return k(n, null, i);
        }
        function k(e, t, i) {
            const n = e.length,
                r = [];
            if (n > 3) {
                const o = [],
                    a = 1 - i.curveTightness;
                r.push({ op: 'move', data: [e[1][0], e[1][1]] });
                for (let t = 1; t + 2 < n; t++) {
                    const i = e[t];
                    ((o[0] = [i[0], i[1]]),
                        (o[1] = [
                            i[0] + (a * e[t + 1][0] - a * e[t - 1][0]) / 6,
                            i[1] + (a * e[t + 1][1] - a * e[t - 1][1]) / 6,
                        ]),
                        (o[2] = [
                            e[t + 1][0] + (a * e[t][0] - a * e[t + 2][0]) / 6,
                            e[t + 1][1] + (a * e[t][1] - a * e[t + 2][1]) / 6,
                        ]),
                        (o[3] = [e[t + 1][0], e[t + 1][1]]),
                        r.push({
                            op: 'bcurveTo',
                            data: [
                                o[1][0],
                                o[1][1],
                                o[2][0],
                                o[2][1],
                                o[3][0],
                                o[3][1],
                            ],
                        }));
                }
                if (t && 2 === t.length) {
                    const e = i.maxRandomnessOffset;
                    r.push({
                        op: 'lineTo',
                        data: [t[0] + P(e, i), t[1] + P(e, i)],
                    });
                }
            } else
                3 === n
                    ? (r.push({
                          op: 'move',
                          data: [e[1][0], e[1][1]],
                      }),
                      r.push({
                          op: 'bcurveTo',
                          data: [
                              e[1][0],
                              e[1][1],
                              e[2][0],
                              e[2][1],
                              e[2][0],
                              e[2][1],
                          ],
                      }))
                    : 2 === n &&
                      r.push(...H(e[0][0], e[0][1], e[1][0], e[1][1], i));
            return r;
        }
        function B(e, t, i, n, r, o, a, s) {
            const l = [],
                c = [];
            if (0 === s.roughness) {
                ((e /= 4),
                    c.push([t + n * Math.cos(-e), i + r * Math.sin(-e)]));
                for (let o = 0; o <= 2 * Math.PI; o += e) {
                    const e = [t + n * Math.cos(o), i + r * Math.sin(o)];
                    (l.push(e), c.push(e));
                }
                (c.push([t + n * Math.cos(0), i + r * Math.sin(0)]),
                    c.push([t + n * Math.cos(e), i + r * Math.sin(e)]));
            } else {
                const d = P(0.5, s) - Math.PI / 2;
                c.push([
                    P(o, s) + t + 0.9 * n * Math.cos(d - e),
                    P(o, s) + i + 0.9 * r * Math.sin(d - e),
                ]);
                const f = 2 * Math.PI + d - 0.01;
                for (let a = d; a < f; a += e) {
                    const e = [
                        P(o, s) + t + n * Math.cos(a),
                        P(o, s) + i + r * Math.sin(a),
                    ];
                    (l.push(e), c.push(e));
                }
                (c.push([
                    P(o, s) + t + n * Math.cos(d + 2 * Math.PI + 0.5 * a),
                    P(o, s) + i + r * Math.sin(d + 2 * Math.PI + 0.5 * a),
                ]),
                    c.push([
                        P(o, s) + t + 0.98 * n * Math.cos(d + a),
                        P(o, s) + i + 0.98 * r * Math.sin(d + a),
                    ]),
                    c.push([
                        P(o, s) + t + 0.9 * n * Math.cos(d + 0.5 * a),
                        P(o, s) + i + 0.9 * r * Math.sin(d + 0.5 * a),
                    ]));
            }
            return [c, l];
        }
        function V(e, t, i, n, r, o, a, s, l) {
            const c = o + P(0.1, l),
                d = [];
            d.push([
                P(s, l) + t + 0.9 * n * Math.cos(c - e),
                P(s, l) + i + 0.9 * r * Math.sin(c - e),
            ]);
            for (let o = c; o <= a; o += e)
                d.push([
                    P(s, l) + t + n * Math.cos(o),
                    P(s, l) + i + r * Math.sin(o),
                ]);
            return (
                d.push([t + n * Math.cos(a), i + r * Math.sin(a)]),
                d.push([t + n * Math.cos(a), i + r * Math.sin(a)]),
                k(d, null, l)
            );
        }
        function Y(e, t, i, n, r, o, a, s) {
            const l = [],
                c = [
                    s.maxRandomnessOffset || 1,
                    (s.maxRandomnessOffset || 1) + 0.3,
                ];
            let d = [0, 0];
            const f = s.disableMultiStroke ? 1 : 2,
                h = s.preserveVertices;
            for (let p = 0; p < f; p++)
                (0 === p
                    ? l.push({ op: 'move', data: [a[0], a[1]] })
                    : l.push({
                          op: 'move',
                          data: [
                              a[0] + (h ? 0 : P(c[0], s)),
                              a[1] + (h ? 0 : P(c[0], s)),
                          ],
                      }),
                    (d = h ? [r, o] : [r + P(c[p], s), o + P(c[p], s)]),
                    l.push({
                        op: 'bcurveTo',
                        data: [
                            e + P(c[p], s),
                            t + P(c[p], s),
                            i + P(c[p], s),
                            n + P(c[p], s),
                            d[0],
                            d[1],
                        ],
                    }));
            return l;
        }
        function G(e) {
            return [...e];
        }
        function U(e, t) {
            return Math.pow(e[0] - t[0], 2) + Math.pow(e[1] - t[1], 2);
        }
        function j(e, t, i) {
            const n = U(t, i);
            if (0 === n) return U(e, t);
            let r =
                ((e[0] - t[0]) * (i[0] - t[0]) +
                    (e[1] - t[1]) * (i[1] - t[1])) /
                n;
            return ((r = Math.max(0, Math.min(1, r))), U(e, $(t, i, r)));
        }
        function $(e, t, i) {
            return [e[0] + (t[0] - e[0]) * i, e[1] + (t[1] - e[1]) * i];
        }
        function z(e, t, i, n) {
            const r = n || [];
            if (
                (function (e, t) {
                    const i = e[t + 0],
                        n = e[t + 1],
                        r = e[t + 2],
                        o = e[t + 3];
                    let a = 3 * n[0] - 2 * i[0] - o[0];
                    a *= a;
                    let s = 3 * n[1] - 2 * i[1] - o[1];
                    s *= s;
                    let l = 3 * r[0] - 2 * o[0] - i[0];
                    l *= l;
                    let c = 3 * r[1] - 2 * o[1] - i[1];
                    return (
                        (c *= c),
                        a < l && (a = l),
                        s < c && (s = c),
                        a + s
                    );
                })(e, t) < i
            ) {
                const i = e[t + 0];
                if (r.length) {
                    ((o = r[r.length - 1]), (a = i), Math.sqrt(U(o, a))) > 1 &&
                        r.push(i);
                } else r.push(i);
                r.push(e[t + 3]);
            } else {
                const n = 0.5,
                    o = e[t + 0],
                    a = e[t + 1],
                    s = e[t + 2],
                    l = e[t + 3],
                    c = $(o, a, n),
                    d = $(a, s, n),
                    f = $(s, l, n),
                    h = $(c, d, n),
                    p = $(d, f, n),
                    T = $(h, p, n);
                (z([o, c, h, T], 0, i, r), z([T, p, f, l], 0, i, r));
            }
            var o, a;
            return r;
        }
        function W(e, t, i, n, r) {
            const o = r || [],
                a = e[t],
                s = e[i - 1];
            let l = 0,
                c = 1;
            for (let n = t + 1; n < i - 1; ++n) {
                const t = j(e[n], a, s);
                t > l && ((l = t), (c = n));
            }
            return (
                Math.sqrt(l) > n
                    ? (W(e, t, c + 1, n, o), W(e, c, i, n, o))
                    : (o.length || o.push(a), o.push(s)),
                o
            );
        }
        var K = i(85);
        const Z = 'none';
        class J {
            constructor(e) {
                ((this.defaultOptions = {
                    maxRandomnessOffset: 2,
                    roughness: 1,
                    bowing: 1,
                    stroke: '#000',
                    strokeWidth: 1,
                    curveTightness: 0,
                    curveFitting: 0.95,
                    curveStepCount: 9,
                    fillStyle: 'hachure',
                    fillWeight: -1,
                    hachureAngle: -41,
                    hachureGap: -1,
                    dashOffset: -1,
                    dashGap: -1,
                    zigzagOffset: -1,
                    seed: 0,
                    disableMultiStroke: !1,
                    disableMultiStrokeFill: !1,
                    preserveVertices: !1,
                }),
                    (this.config = e || {}),
                    this.config.options &&
                        (this.defaultOptions = this._o(this.config.options)));
            }
            static newSeed() {
                return Math.floor(Math.random() * 2 ** 31);
            }
            _o(e) {
                return e
                    ? Object.assign({}, this.defaultOptions, e)
                    : this.defaultOptions;
            }
            _d(e, t, i) {
                return {
                    shape: e,
                    sets: t || [],
                    options: i || this.defaultOptions,
                };
            }
            line(e, t, i, n, r) {
                const o = this._o(r);
                return this._d('line', [M(e, t, i, n, o)], o);
            }
            rectangle(e, t, i, n, r) {
                const o = this._o(r),
                    a = [],
                    s = v(e, t, i, n, o);
                if (o.fill) {
                    const r = [
                        [e, t],
                        [e + i, t],
                        [e + i, t + n],
                        [e, t + n],
                    ];
                    'solid' === o.fillStyle
                        ? a.push(R([r], o))
                        : a.push(I([r], o));
                }
                return (
                    o.stroke !== Z && a.push(s),
                    this._d('rectangle', a, o)
                );
            }
            ellipse(e, t, i, n, r) {
                const o = this._o(r),
                    a = [],
                    s = _(i, n, o),
                    l = O(e, t, o, s);
                if (o.fill)
                    if ('solid' === o.fillStyle) {
                        const i = O(e, t, o, s).opset;
                        ((i.type = 'fillPath'), a.push(i));
                    } else a.push(I([l.estimatedPoints], o));
                return (
                    o.stroke !== Z && a.push(l.opset),
                    this._d('ellipse', a, o)
                );
            }
            circle(e, t, i, n) {
                const r = this.ellipse(e, t, i, i, n);
                return ((r.shape = 'circle'), r);
            }
            linearPath(e, t) {
                const i = this._o(t);
                return this._d('linearPath', [A(e, !1, i)], i);
            }
            arc(e, t, i, n, r, o, a = !1, s) {
                const l = this._o(s),
                    c = [],
                    d = S(e, t, i, n, r, o, a, !0, l);
                if (a && l.fill)
                    if ('solid' === l.fillStyle) {
                        const a = Object.assign({}, l);
                        a.disableMultiStroke = !0;
                        const s = S(e, t, i, n, r, o, !0, !1, a);
                        ((s.type = 'fillPath'), c.push(s));
                    } else
                        c.push(
                            (function (e, t, i, n, r, o, a) {
                                const s = e,
                                    l = t;
                                let c = Math.abs(i / 2),
                                    d = Math.abs(n / 2);
                                ((c += P(0.01 * c, a)), (d += P(0.01 * d, a)));
                                let f = r,
                                    h = o;
                                for (; f < 0; )
                                    ((f += 2 * Math.PI), (h += 2 * Math.PI));
                                h - f > 2 * Math.PI &&
                                    ((f = 0), (h = 2 * Math.PI));
                                const p = (h - f) / a.curveStepCount,
                                    T = [];
                                for (let e = f; e <= h; e += p)
                                    T.push([
                                        s + c * Math.cos(e),
                                        l + d * Math.sin(e),
                                    ]);
                                return (
                                    T.push([
                                        s + c * Math.cos(h),
                                        l + d * Math.sin(h),
                                    ]),
                                    T.push([s, l]),
                                    I([T], a)
                                );
                            })(e, t, i, n, r, o, l)
                        );
                return (l.stroke !== Z && c.push(d), this._d('arc', c, l));
            }
            curve(e, t) {
                const i = this._o(t),
                    n = [],
                    r = E(e, i);
                if (i.fill && i.fill !== Z && e.length >= 3) {
                    const t = (function (e, t = 0) {
                            const i = e.length;
                            if (i < 3)
                                throw new Error(
                                    'A curve must have at least three points.'
                                );
                            const n = [];
                            if (3 === i)
                                n.push(G(e[0]), G(e[1]), G(e[2]), G(e[2]));
                            else {
                                const i = [];
                                i.push(e[0], e[0]);
                                for (let t = 1; t < e.length; t++)
                                    (i.push(e[t]),
                                        t === e.length - 1 && i.push(e[t]));
                                const r = [],
                                    o = 1 - t;
                                n.push(G(i[0]));
                                for (let e = 1; e + 2 < i.length; e++) {
                                    const t = i[e];
                                    ((r[0] = [t[0], t[1]]),
                                        (r[1] = [
                                            t[0] +
                                                (o * i[e + 1][0] -
                                                    o * i[e - 1][0]) /
                                                    6,
                                            t[1] +
                                                (o * i[e + 1][1] -
                                                    o * i[e - 1][1]) /
                                                    6,
                                        ]),
                                        (r[2] = [
                                            i[e + 1][0] +
                                                (o * i[e][0] -
                                                    o * i[e + 2][0]) /
                                                    6,
                                            i[e + 1][1] +
                                                (o * i[e][1] -
                                                    o * i[e + 2][1]) /
                                                    6,
                                        ]),
                                        (r[3] = [i[e + 1][0], i[e + 1][1]]),
                                        n.push(r[1], r[2], r[3]));
                                }
                            }
                            return n;
                        })(e),
                        r = (function (e, t = 0.15, i) {
                            const n = [],
                                r = (e.length - 1) / 3;
                            for (let i = 0; i < r; i++) z(e, 3 * i, t, n);
                            return i && i > 0 ? W(n, 0, n.length, i) : n;
                        })(t, 10, (1 + i.roughness) / 2);
                    'solid' === i.fillStyle
                        ? n.push(R([r], i))
                        : n.push(I([r], i));
                }
                return (i.stroke !== Z && n.push(r), this._d('curve', n, i));
            }
            polygon(e, t) {
                const i = this._o(t),
                    n = [],
                    r = A(e, !0, i);
                return (
                    i.fill &&
                        ('solid' === i.fillStyle
                            ? n.push(R([e], i))
                            : n.push(I([e], i))),
                    i.stroke !== Z && n.push(r),
                    this._d('polygon', n, i)
                );
            }
            path(e, t) {
                const i = this._o(t),
                    n = [];
                if (!e) return this._d('path', n, i);
                e = (e || '')
                    .replace(/\n/g, ' ')
                    .replace(/(-\s)/g, '-')
                    .replace('/(ss)/g', ' ');
                const r = i.fill && 'transparent' !== i.fill && i.fill !== Z,
                    o = i.stroke !== Z,
                    a = !!(i.simplification && i.simplification < 1),
                    s = a ? 4 - 4 * i.simplification : (1 + i.roughness) / 2,
                    l = Object(K.pointsOnPath)(e, 1, s);
                return (
                    r &&
                        ('solid' === i.fillStyle
                            ? n.push(R(l, i))
                            : n.push(I(l, i))),
                    o &&
                        (a
                            ? l.forEach((e) => {
                                  n.push(A(e, !1, i));
                              })
                            : n.push(x(e, i))),
                    this._d('path', n, i)
                );
            }
            opsToPath(e, t) {
                let i = '';
                for (const n of e.ops) {
                    const e =
                        'number' == typeof t && t >= 0
                            ? n.data.map((e) => +e.toFixed(t))
                            : n.data;
                    switch (n.op) {
                        case 'move':
                            i += `M${e[0]} ${e[1]} `;
                            break;
                        case 'bcurveTo':
                            i += `C${e[0]} ${e[1]}, ${e[2]} ${e[3]}, ${e[4]} ${e[5]} `;
                            break;
                        case 'lineTo':
                            i += `L${e[0]} ${e[1]} `;
                    }
                }
                return i.trim();
            }
            toPaths(e) {
                const t = e.sets || [],
                    i = e.options || this.defaultOptions,
                    n = [];
                for (const e of t) {
                    let t = null;
                    switch (e.type) {
                        case 'path':
                            t = {
                                d: this.opsToPath(e),
                                stroke: i.stroke,
                                strokeWidth: i.strokeWidth,
                                fill: Z,
                            };
                            break;
                        case 'fillPath':
                            t = {
                                d: this.opsToPath(e),
                                stroke: Z,
                                strokeWidth: 0,
                                fill: i.fill || Z,
                            };
                            break;
                        case 'fillSketch':
                            t = this.fillSketch(e, i);
                    }
                    t && n.push(t);
                }
                return n;
            }
            fillSketch(e, t) {
                let i = t.fillWeight;
                return (
                    i < 0 && (i = t.strokeWidth / 2),
                    {
                        d: this.opsToPath(e),
                        stroke: t.fill || Z,
                        strokeWidth: i,
                        fill: Z,
                    }
                );
            }
        }
        class X {
            constructor(e, t) {
                ((this.canvas = e),
                    (this.ctx = this.canvas.getContext('2d')),
                    (this.gen = new J(t)));
            }
            draw(e) {
                const t = e.sets || [],
                    i = e.options || this.getDefaultOptions(),
                    n = this.ctx,
                    r = e.options.fixedDecimalPlaceDigits;
                for (const o of t)
                    switch (o.type) {
                        case 'path':
                            (n.save(),
                                (n.strokeStyle =
                                    'none' === i.stroke
                                        ? 'transparent'
                                        : i.stroke),
                                (n.lineWidth = i.strokeWidth),
                                i.strokeLineDash &&
                                    n.setLineDash(i.strokeLineDash),
                                i.strokeLineDashOffset &&
                                    (n.lineDashOffset = i.strokeLineDashOffset),
                                this._drawToContext(n, o, r),
                                n.restore());
                            break;
                        case 'fillPath': {
                            (n.save(), (n.fillStyle = i.fill || ''));
                            const t =
                                'curve' === e.shape ||
                                'polygon' === e.shape ||
                                'path' === e.shape
                                    ? 'evenodd'
                                    : 'nonzero';
                            (this._drawToContext(n, o, r, t), n.restore());
                            break;
                        }
                        case 'fillSketch':
                            this.fillSketch(n, o, i);
                    }
            }
            fillSketch(e, t, i) {
                let n = i.fillWeight;
                (n < 0 && (n = i.strokeWidth / 2),
                    e.save(),
                    i.fillLineDash && e.setLineDash(i.fillLineDash),
                    i.fillLineDashOffset &&
                        (e.lineDashOffset = i.fillLineDashOffset),
                    (e.strokeStyle = i.fill || ''),
                    (e.lineWidth = n),
                    this._drawToContext(e, t, i.fixedDecimalPlaceDigits),
                    e.restore());
            }
            _drawToContext(e, t, i, n = 'nonzero') {
                e.beginPath();
                for (const n of t.ops) {
                    const t =
                        'number' == typeof i && i >= 0
                            ? n.data.map((e) => +e.toFixed(i))
                            : n.data;
                    switch (n.op) {
                        case 'move':
                            e.moveTo(t[0], t[1]);
                            break;
                        case 'bcurveTo':
                            e.bezierCurveTo(t[0], t[1], t[2], t[3], t[4], t[5]);
                            break;
                        case 'lineTo':
                            e.lineTo(t[0], t[1]);
                    }
                }
                'fillPath' === t.type ? e.fill(n) : e.stroke();
            }
            get generator() {
                return this.gen;
            }
            getDefaultOptions() {
                return this.gen.defaultOptions;
            }
            line(e, t, i, n, r) {
                const o = this.gen.line(e, t, i, n, r);
                return (this.draw(o), o);
            }
            rectangle(e, t, i, n, r) {
                const o = this.gen.rectangle(e, t, i, n, r);
                return (this.draw(o), o);
            }
            ellipse(e, t, i, n, r) {
                const o = this.gen.ellipse(e, t, i, n, r);
                return (this.draw(o), o);
            }
            circle(e, t, i, n) {
                const r = this.gen.circle(e, t, i, n);
                return (this.draw(r), r);
            }
            linearPath(e, t) {
                const i = this.gen.linearPath(e, t);
                return (this.draw(i), i);
            }
            polygon(e, t) {
                const i = this.gen.polygon(e, t);
                return (this.draw(i), i);
            }
            arc(e, t, i, n, r, o, a = !1, s) {
                const l = this.gen.arc(e, t, i, n, r, o, a, s);
                return (this.draw(l), l);
            }
            curve(e, t) {
                const i = this.gen.curve(e, t);
                return (this.draw(i), i);
            }
            path(e, t) {
                const i = this.gen.path(e, t);
                return (this.draw(i), i);
            }
        }
        const q = 'http://www.w3.org/2000/svg';
        class ee {
            constructor(e, t) {
                ((this.svg = e), (this.gen = new J(t)));
            }
            draw(e) {
                const t = e.sets || [],
                    i = e.options || this.getDefaultOptions(),
                    n = this.svg.ownerDocument || window.document,
                    r = n.createElementNS(q, 'g'),
                    o = e.options.fixedDecimalPlaceDigits;
                for (const a of t) {
                    let t = null;
                    switch (a.type) {
                        case 'path':
                            ((t = n.createElementNS(q, 'path')),
                                t.setAttribute('d', this.opsToPath(a, o)),
                                t.setAttribute('stroke', i.stroke),
                                t.setAttribute(
                                    'stroke-width',
                                    i.strokeWidth + ''
                                ),
                                t.setAttribute('fill', 'none'),
                                i.strokeLineDash &&
                                    t.setAttribute(
                                        'stroke-dasharray',
                                        i.strokeLineDash.join(' ').trim()
                                    ),
                                i.strokeLineDashOffset &&
                                    t.setAttribute(
                                        'stroke-dashoffset',
                                        `${i.strokeLineDashOffset}`
                                    ));
                            break;
                        case 'fillPath':
                            ((t = n.createElementNS(q, 'path')),
                                t.setAttribute('d', this.opsToPath(a, o)),
                                t.setAttribute('stroke', 'none'),
                                t.setAttribute('stroke-width', '0'),
                                t.setAttribute('fill', i.fill || ''),
                                ('curve' !== e.shape &&
                                    'polygon' !== e.shape) ||
                                    t.setAttribute('fill-rule', 'evenodd'));
                            break;
                        case 'fillSketch':
                            t = this.fillSketch(n, a, i);
                    }
                    t && r.appendChild(t);
                }
                return r;
            }
            fillSketch(e, t, i) {
                let n = i.fillWeight;
                n < 0 && (n = i.strokeWidth / 2);
                const r = e.createElementNS(q, 'path');
                return (
                    r.setAttribute(
                        'd',
                        this.opsToPath(t, i.fixedDecimalPlaceDigits)
                    ),
                    r.setAttribute('stroke', i.fill || ''),
                    r.setAttribute('stroke-width', n + ''),
                    r.setAttribute('fill', 'none'),
                    i.fillLineDash &&
                        r.setAttribute(
                            'stroke-dasharray',
                            i.fillLineDash.join(' ').trim()
                        ),
                    i.fillLineDashOffset &&
                        r.setAttribute(
                            'stroke-dashoffset',
                            `${i.fillLineDashOffset}`
                        ),
                    r
                );
            }
            get generator() {
                return this.gen;
            }
            getDefaultOptions() {
                return this.gen.defaultOptions;
            }
            opsToPath(e, t) {
                return this.gen.opsToPath(e, t);
            }
            line(e, t, i, n, r) {
                const o = this.gen.line(e, t, i, n, r);
                return this.draw(o);
            }
            rectangle(e, t, i, n, r) {
                const o = this.gen.rectangle(e, t, i, n, r);
                return this.draw(o);
            }
            ellipse(e, t, i, n, r) {
                const o = this.gen.ellipse(e, t, i, n, r);
                return this.draw(o);
            }
            circle(e, t, i, n) {
                const r = this.gen.circle(e, t, i, n);
                return this.draw(r);
            }
            linearPath(e, t) {
                const i = this.gen.linearPath(e, t);
                return this.draw(i);
            }
            polygon(e, t) {
                const i = this.gen.polygon(e, t);
                return this.draw(i);
            }
            arc(e, t, i, n, r, o, a = !1, s) {
                const l = this.gen.arc(e, t, i, n, r, o, a, s);
                return this.draw(l);
            }
            curve(e, t) {
                const i = this.gen.curve(e, t);
                return this.draw(i);
            }
            path(e, t) {
                const i = this.gen.path(e, t);
                return this.draw(i);
            }
        }
        var te,
            ie = {
                canvas(e, t) {
                    return new X(e, t);
                },
                svg(e, t) {
                    return new ee(e, t);
                },
                generator(e) {
                    return new J(e);
                },
                newSeed() {
                    return J.newSeed();
                },
            };
        class ne {
            constructor() {
                ((this.generateRoughLinePath = (e, t, i, n) => {
                    t && 'roughness' in t && !t.roughness && delete t.roughness;
                    const r = this.roughContextElementInstance.generator,
                        o = Object.assign({}, r.defaultOptions, t || {});
                    if (!e) return '';
                    const a = x(e, o).ops;
                    let s = a.reduce(
                        (e, t, i) => (
                            (t.index = i),
                            'move' === t.op
                                ? e.push([t])
                                : e[e.length - 1].push(t),
                            e
                        ),
                        []
                    );
                    s = s.filter((e) => e.length > 1);
                    let l = [];
                    return (
                        (l = o.disableMultiStroke
                            ? [s]
                            : [
                                  s.filter((e, t) => t % 2 == 0),
                                  s.filter((e, t) => t % 2 != 0),
                              ]),
                        l.forEach((t) => {
                            let r = t.map((e) => {
                                const t = e[0],
                                    i = e[e.length - 1];
                                return {
                                    startIndex: t.index,
                                    endIndex: i.index,
                                    start: t.data.slice(-2),
                                    end: i.data.slice(-2),
                                };
                            });
                            for (let t = 0; t < r.length; t++) {
                                if (Array.isArray(i) && i.includes(t)) continue;
                                const o = r[t];
                                let s;
                                if (
                                    ((s =
                                        /z/i.test(e) && 0 === t
                                            ? r[r.length - 1]
                                            : r[t - 1]),
                                    s)
                                ) {
                                    const e = [
                                            (o.start[0] + s.end[0]) / 2,
                                            (o.start[1] + s.end[1]) / 2,
                                        ],
                                        t = a[s.endIndex].data,
                                        i = a[o.startIndex].data;
                                    ((t[t.length - 2] = e[0]),
                                        (t[t.length - 1] = e[1]),
                                        (i[i.length - 2] = e[0]),
                                        (i[i.length - 1] = e[1]),
                                        n &&
                                            ((t[t.length - 4] = e[0]),
                                            (t[t.length - 3] = e[1])));
                                }
                            }
                        }),
                        r.opsToPath({ type: 'path', ops: a })
                    );
                }),
                    (this.roughContextElementInstance = ie.svg(
                        document.createElement('svg')
                    )));
            }
            generateRoughFillPath(e, t) {
                t && 'roughness' in t && !t.roughness && delete t.roughness;
                const i = this.roughContextElementInstance.generator,
                    n = Object.assign({}, i.defaultOptions, t || {});
                if (!e) return '';
                const r = (1 + n.roughness) / 2;
                let o,
                    a = Object(K.pointsOnPath)(e, 1, r);
                return (
                    /z/i.test(e) &&
                        (a = a.map((e) => e.slice(0, e.length - 1).reverse())),
                    (o = 'solid' === n.fillStyle ? R(a, n) : I(a, n)),
                    i.opsToPath(o)
                );
            }
        }
        !(function (e) {
            ((e.normal = 'normal'), (e.handDrawn = 'handDrawn'));
        })(te || (te = {}));
        const re = 'normal',
            oe = 'hand-drawn';
        var ae = new (class extends ne {
            sliceOriginPath(e) {
                if (!e) return null;
                const t = e.match(/m[^m]*/gi);
                return t ? t.map((e) => e) : null;
            }
            combineSlicedPath(e, t) {
                return e.reduce((e, i) => e + t(i), '');
            }
            fillPatternNormalRenderer(e) {
                return e;
            }
            fillPatternHandDrawnRenderer(e, t) {
                const i = this.sliceOriginPath(e);
                return i
                    ? this.combineSlicedPath(i, (e) =>
                          this.generateRoughFillPath(e, ...(t || []))
                      )
                    : e;
            }
            applyFillPatternMode(e, t, i) {
                return Object.values(n.HAND_DRAWN_FILL_PATTERN).includes(e)
                    ? this.fillPatternHandDrawnRenderer(t, i[te.handDrawn])
                    : this.fillPatternNormalRenderer(t);
            }
            getFillPatternHandDrawnConfigForTopic(e, t) {
                const i = o.b.combineRoughOptions(
                    o.b.getCompleteDefaultHandDrawnConfig(),
                    o.b.getFillPatternConfig(e)
                );
                return (t && (i.roughness = 1.2), [i]);
            }
            renderFillPattrenForTopic(e, t) {
                const i = {
                    [te.handDrawn]:
                        this.getFillPatternHandDrawnConfigForTopic(e),
                };
                return this.applyFillPatternMode(e, t, i);
            }
            renderFillPattrenWithHandDrawnSolid(e, t) {
                const i = n.FILL_PATTERN.SOLID_HAND_DRAWN,
                    r = {
                        [te.handDrawn]:
                            this.getFillPatternHandDrawnConfigForTopic(i, t),
                    };
                return this.applyFillPatternMode(i, e, r);
            }
            borderLinePattrenNormalRenderer(e) {
                return e;
            }
            borderLinePatternHandDrawnRenderer(e, t, i) {
                let n = e;
                const r = o.b.getSpecialBorderLinePatternPath(
                    t.shapeClass,
                    t.viewController.bounds
                );
                r && (n = r);
                const a = this.sliceOriginPath(n);
                return a
                    ? this.combineSlicedPath(a, (e) =>
                          this.generateRoughLinePath(e, ...(i || []))
                      )
                    : n;
            }
            applyBorderLinePatternMode(e, t, i, n) {
                switch (Object(r.isHandDrawnLinePattern)(e) ? oe : re) {
                    case re:
                        return this.borderLinePattrenNormalRenderer(t);
                    case oe:
                        return this.borderLinePatternHandDrawnRenderer(
                            t,
                            i,
                            n[te.handDrawn]
                        );
                }
            }
            getBorderLinePatternHandDrawnConfigForTopic(e) {
                const { shapeClass: t } = e;
                let i = o.b.combineRoughOptions(
                    o.b.getCompleteDefaultHandDrawnConfig(),
                    { disableMultiStroke: !1 }
                );
                return (
                    [
                        n.TOPICSHAPE.DOUBLEQUOTE,
                        n.TOPICSHAPE.ROUNDBRACKET,
                    ].includes(t) && (i.disableMultiStroke = !0),
                    [
                        i,
                        o.b.getHandDrawnBreakLineConfig(t),
                        o.b.getIsNeedSmoothLinkPoint(t),
                    ]
                );
            }
            renderBorderLinePatternForTopic(e, t, i) {
                const n = {
                    [te.handDrawn]:
                        this.getBorderLinePatternHandDrawnConfigForTopic(i),
                };
                return this.applyBorderLinePatternMode(e, t, i, n);
            }
            shapeLinePatternNormalRenderer(e) {
                return e;
            }
            linePatternHandDrawnRenderer(e, t) {
                const i = this.sliceOriginPath(e);
                return i
                    ? this.combineSlicedPath(i, (e) =>
                          this.generateRoughLinePath(e, ...(t || []))
                      )
                    : e;
            }
            applyLinePatternMode(e, t, i) {
                switch (Object(r.isHandDrawnLinePattern)(e) ? oe : re) {
                    case oe:
                        return this.linePatternHandDrawnRenderer(
                            t,
                            i[te.handDrawn]
                        );
                    case re:
                        return this.shapeLinePatternNormalRenderer(t);
                }
            }
            getLinePatternHandDrawnConfigForConnection(e, t) {
                return [
                    o.b.combineRoughOptions(
                        o.b.getCompleteDefaultHandDrawnConfig(),
                        {
                            roughness: o.b.getHandDrawnConnectionRoughness(
                                e,
                                t.connectionLineShape
                            ),
                            disableMultiStroke: !1,
                            preserveVertices: !0,
                        }
                    ),
                    [],
                    !0,
                ];
            }
            renderLinePatternForConnection(e, t, i, n) {
                const r = {
                    [te.handDrawn]:
                        this.getLinePatternHandDrawnConfigForConnection(i, n),
                };
                return this.applyLinePatternMode(e, t, r);
            }
            getLinePatternHandDrawnConfigForOthers(e) {
                return [
                    o.b.combineRoughOptions(
                        o.b.getCompleteDefaultHandDrawnConfig(),
                        { roughness: e ? 1.2 : 1 }
                    ),
                    [],
                    !1,
                ];
            }
            renderLinePatternForOthers(e, t, i = !1) {
                const n = {
                    [te.handDrawn]:
                        this.getLinePatternHandDrawnConfigForOthers(i),
                };
                return this.applyLinePatternMode(e, t, n);
            }
            getFillPatternHandDrawnConfigForTaperedLine(e, t, i) {
                const a = o.b.combineRoughOptions(
                        o.b.getCompleteDefaultHandDrawnConfig(),
                        o.b.getFillPatternConfig(n.FILL_PATTERN.HACHURE)
                    ),
                    s = Object(r.normalize)(Object(r.sub)(t, e));
                return (
                    (a.hachureAngle = s.x * s.y > 0 ? 135 : 45),
                    (a.strokeWidth = i),
                    (a.hachureGap = 1.1 * i),
                    [a]
                );
            }
            renderHandDrawnTaperedLine(e, t, i, r) {
                const o = {
                        [te.handDrawn]:
                            this.getLinePatternHandDrawnConfigForOthers(!1),
                    },
                    a = this.applyLinePatternMode(
                        n.LINE_PATTERN.HANDDRAWNSOLID,
                        e,
                        o
                    );
                if (!t || !i) return a;
                const s = {
                    [te.handDrawn]:
                        this.getFillPatternHandDrawnConfigForTaperedLine(
                            t,
                            i,
                            r
                        ),
                };
                return (
                    a + this.applyFillPatternMode(n.FILL_PATTERN.HACHURE, e, s)
                );
            }
            getFillPatternHandDrawnConfigForFishBoneTaperedLine(e) {
                const t = o.b.combineRoughOptions(
                    o.b.getCompleteDefaultHandDrawnConfig(),
                    o.b.getFillPatternConfig(n.FILL_PATTERN.HACHURE)
                );
                return ((t.strokeWidth = e), (t.hachureGap = 1.1 * e), [t]);
            }
            renderHandDrawnTaperedLineForFishBone(e, t) {
                const i = {
                        [te.handDrawn]:
                            this.getLinePatternHandDrawnConfigForOthers(!1),
                    },
                    r = this.applyLinePatternMode(
                        n.LINE_PATTERN.HANDDRAWNSOLID,
                        e,
                        i
                    ),
                    o = {
                        [te.handDrawn]:
                            this.getFillPatternHandDrawnConfigForFishBoneTaperedLine(
                                t
                            ),
                    };
                return (
                    r + this.applyFillPatternMode(n.FILL_PATTERN.HACHURE, e, o)
                );
            }
            getFillPatternHandDrawnConfigForFishBoneMainLineTaperedLine(
                e,
                t,
                i
            ) {
                const a = o.b.combineRoughOptions(
                        o.b.getCompleteDefaultHandDrawnConfig(),
                        o.b.getFillPatternConfig(n.FILL_PATTERN.HACHURE)
                    ),
                    s = Object(r.normalize)(Object(r.sub)(t, e));
                return (
                    (a.hachureAngle = s.x * s.y > 0 ? 135 : 45),
                    (a.strokeWidth = i),
                    (a.hachureGap = 1.1 * i),
                    [a]
                );
            }
            renderHandDrawnTaperedLineForFishBoneMainLine(e, t, i, r) {
                const o = {
                        [te.handDrawn]:
                            this.getLinePatternHandDrawnConfigForOthers(!1),
                    },
                    a = this.applyLinePatternMode(
                        n.LINE_PATTERN.HANDDRAWNSOLID,
                        e,
                        o
                    ),
                    s = {
                        [te.handDrawn]:
                            this.getFillPatternHandDrawnConfigForFishBoneMainLineTaperedLine(
                                t,
                                i,
                                r
                            ),
                    };
                return (
                    a + this.applyFillPatternMode(n.FILL_PATTERN.HACHURE, e, s)
                );
            }
        })();
        function se(e, t) {
            let i = '',
                r = '';
            switch (((t = parseInt(`${t}`)), e)) {
                case n.LINE_PATTERN.DASH:
                case n.LINE_PATTERN.HANDDRAWNDASH:
                    r = '9 3';
                    break;
                case n.LINE_PATTERN.DOT:
                    r = '3 3';
                    break;
                case n.LINE_PATTERN.DASHDOT:
                    r = '9 3 3 3';
                    break;
                case n.LINE_PATTERN.DASHDOTDOT:
                    r = '9 3 3 3 3 3';
                    break;
                case n.LINE_PATTERN.ROUNDDOT:
                    ((r = `0 ${2 * t} 0 ${2 * t}`), (i = 'round'));
            }
            return { 'stroke-linecap': i, 'stroke-dasharray': r };
        }
        function le(e, t) {
            const i = [
                    n.LINE_PATTERN.HANDDRAWNDASH,
                    n.LINE_PATTERN.HANDDRAWNSOLID,
                ].includes(e),
                o = se(e, t.lineWidth);
            let a,
                s,
                l,
                c = o['stroke-linecap'],
                d = o['stroke-dasharray'],
                f = t.linePath;
            i
                ? (t.isBorderLinePatten && t.figure
                      ? ((f = ae.renderBorderLinePatternForTopic(
                            e,
                            t.linePath,
                            t.figure
                        )),
                        i && (c = 'round'),
                        Object(r.isDashLinePattern)(e) && (c = 'butt'))
                      : t.isTaperedLine
                        ? t.isFishboneHeadbone
                            ? (f = ae.renderHandDrawnTaperedLineForFishBone(
                                  t.linePath,
                                  t.lineWidth
                              ))
                            : t.isFishboneMainbone &&
                                t.startBranchPosition &&
                                t.endBranchPosition
                              ? (f =
                                    ae.renderHandDrawnTaperedLineForFishBoneMainLine(
                                        t.linePath,
                                        t.startBranchPosition,
                                        t.endBranchPosition,
                                        t.lineWidth
                                    ))
                              : t.startBranchPosition &&
                                t.endBranchPosition &&
                                (f = ae.renderHandDrawnTaperedLine(
                                    t.linePath,
                                    t.startBranchPosition,
                                    t.endBranchPosition,
                                    t.lineWidth
                                ))
                        : t.isTopicConnection && t.structureClass && t.figure
                          ? ((f = ae.renderLinePatternForConnection(
                                e,
                                t.linePath,
                                t.structureClass,
                                t.figure
                            )),
                            (c = Object(r.isDashLinePattern)(e)
                                ? 'butt'
                                : 'round'))
                          : (f = t.isFishboneHeadbone
                                ? t.linePath
                                : t.isFishboneMainbone
                                  ? ae.renderFillPattrenWithHandDrawnSolid(
                                        t.linePath
                                    )
                                  : ae.renderLinePatternForOthers(
                                        e,
                                        t.linePath,
                                        t.isBoundary
                                    )),
                  t.lineColor &&
                      (t.isFishboneMainbone && !t.isTaperedLine
                          ? ((a = t.lineColor), (s = 'none'), (l = 0))
                          : ((a = 'none'),
                            (s = t.lineColor),
                            (l = t.lineWidth))))
                : t.lineColor &&
                  (t.isTaperedLine || t.isFishboneMainbone
                      ? ((a = t.lineColor), (s = 'none'), (l = 0))
                      : ((a = 'none'), (s = t.lineColor), (l = t.lineWidth)));
            const h = {
                'stroke-linecap': c,
                'stroke-dasharray': d,
                d: f,
            };
            return (
                void 0 !== a && (h.fill = a),
                void 0 !== s && (h.stroke = s),
                void 0 !== l && (h['stroke-width'] = l),
                h
            );
        }
        function ce(e, t) {
            const i = Object(r.isHandDrawnFillPattern)(e);
            let n = t.fillPath;
            return (
                i &&
                    (n = t.isForceHandDrawnSolid
                        ? ae.renderFillPattrenWithHandDrawnSolid(
                              t.fillPath,
                              t.isBoundaryTitle
                          )
                        : ae.renderFillPattrenForTopic(e, t.fillPath)),
                { d: n }
            );
        }
        function de(e) {
            switch (e) {
                case n.LINE_PATTERN.DASH:
                case n.LINE_PATTERN.DASHDOT:
                case n.LINE_PATTERN.DASHDOTDOT:
                case n.LINE_PATTERN.DOT:
                case n.LINE_PATTERN.ROUNDDOT:
                case n.LINE_PATTERN.SOLID:
                    return n.LINE_PATTERN.SOLID;
                case n.LINE_PATTERN.HANDDRAWNDASH:
                case n.LINE_PATTERN.HANDDRAWNSOLID:
                    return n.LINE_PATTERN.HANDDRAWNSOLID;
                default:
                    return n.LINE_PATTERN.SOLID;
            }
        }
        function fe(e) {
            const t = e.figure.endArrowClass,
                i = t && t !== n.ARROW_CLASS.NONE;
            if (Object(r.isBraceStructure)(e) && !i)
                return r.layoutConstant.LINE.LINE_SPACING;
            if (!i) return 0;
            const o = Object(r.isTimelineThroughStructure)(e)
                    ? r.layoutConstant.LINE.LINE_TIMELINE_THROUGH_SPACING
                    : r.layoutConstant.LINE.LINE_SPACING,
                a = r.ArrowSelector.getArrowStaticInfo(t);
            return e.figure.lineWidth * a.arrowSizeRatio + o;
        }
        function he(e) {
            if (Object(r.isBraceStructure)(e)) return !0;
            const t = e.figure.endArrowClass;
            return !(!t || t === n.ARROW_CLASS.NONE);
        }
        function pe(e, t) {
            let i = 0,
                r = 0;
            if (he(e)) {
                const o = e.getStructureObject(),
                    a = fe(e);
                switch (o.getChildTargetOrientation(e, t.branchIndex())) {
                    case n.DIRECTION.RIGHT:
                        i = a;
                        break;
                    case n.DIRECTION.LEFT:
                        i = -a;
                        break;
                    case n.DIRECTION.DOWN:
                        r = a;
                        break;
                    case n.DIRECTION.UP:
                        r = -a;
                }
            }
            return { x: i, y: r };
        }
        function Te(e) {
            return he(e) ? fe(e) : 0;
        }
    },
];
