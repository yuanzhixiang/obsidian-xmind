export default {
    80930: function (e, t, i) {
        'use strict';
        function n(e, t) {
            return Math.pow(e[0] - t[0], 2) + Math.pow(e[1] - t[1], 2);
        }
        function r(e, t, i) {
            const r = n(t, i);
            if (0 === r) return n(e, t);
            let a =
                ((e[0] - t[0]) * (i[0] - t[0]) +
                    (e[1] - t[1]) * (i[1] - t[1])) /
                r;
            return ((a = Math.max(0, Math.min(1, a))), n(e, o(t, i, a)));
        }
        function o(e, t, i) {
            return [e[0] + (t[0] - e[0]) * i, e[1] + (t[1] - e[1]) * i];
        }
        function a(e, t, i, r) {
            const s = r || [];
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
                if (s.length) {
                    ((l = s[s.length - 1]), (c = i), Math.sqrt(n(l, c))) > 1 &&
                        s.push(i);
                } else s.push(i);
                s.push(e[t + 3]);
            } else {
                const n = 0.5,
                    r = e[t + 0],
                    l = e[t + 1],
                    c = e[t + 2],
                    d = e[t + 3],
                    f = o(r, l, n),
                    h = o(l, c, n),
                    p = o(c, d, n),
                    T = o(f, h, n),
                    u = o(h, p, n),
                    g = o(T, u, n);
                (a([r, f, T, g], 0, i, s), a([g, u, p, d], 0, i, s));
            }
            var l, c;
            return s;
        }
        function s(e, t) {
            return l(e, 0, e.length, t);
        }
        function l(e, t, i, n, o) {
            const a = o || [],
                s = e[t],
                c = e[i - 1];
            let d = 0,
                f = 1;
            for (let n = t + 1; n < i - 1; ++n) {
                const t = r(e[n], s, c);
                t > d && ((d = t), (f = n));
            }
            return (
                Math.sqrt(d) > n
                    ? (l(e, t, f + 1, n, a), l(e, f, i, n, a))
                    : (a.length || a.push(s), a.push(c)),
                a
            );
        }
        (i.r(t),
            i.d(t, {
                pointsOnPath: function () {
                    return Q;
                },
            }));
        const c = 0,
            d = 1,
            f = 2,
            h = {
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
        function p(e, t) {
            return e.type === t;
        }
        function T(e) {
            const t = [],
                i = (function (e) {
                    const t = new Array();
                    for (; '' !== e; )
                        if (e.match(/^([ \t\r\n,]+)/))
                            e = e.substr(RegExp.$1.length);
                        else if (e.match(/^([aAcChHlLmMqQsStTvVzZ])/))
                            ((t[t.length] = { type: c, text: RegExp.$1 }),
                                (e = e.substr(RegExp.$1.length)));
                        else {
                            if (
                                !e.match(
                                    /^(([-+]?[0-9]+(\.[0-9]*)?|[-+]?\.[0-9]+)([eE][-+]?[0-9]+)?)/
                                )
                            )
                                return [];
                            ((t[t.length] = {
                                type: d,
                                text: `${parseFloat(RegExp.$1)}`,
                            }),
                                (e = e.substr(RegExp.$1.length)));
                        }
                    return ((t[t.length] = { type: f, text: '' }), t);
                })(e);
            let n = 'BOD',
                r = 0,
                o = i[r];
            for (; !p(o, f); ) {
                let a = 0;
                const s = [];
                if ('BOD' === n) {
                    if ('M' !== o.text && 'm' !== o.text) return T('M0,0' + e);
                    (r++, (a = h[o.text]), (n = o.text));
                } else
                    p(o, d) ? (a = h[n]) : (r++, (a = h[o.text]), (n = o.text));
                if (!(r + a < i.length))
                    throw new Error('Path data ended short');
                for (let e = r; e < r + a; e++) {
                    const t = i[e];
                    if (!p(t, d))
                        throw new Error(
                            'Param not a number: ' + n + ',' + t.text
                        );
                    s[s.length] = +t.text;
                }
                if ('number' != typeof h[n])
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
        function u(e, t, i) {
            return [
                e * Math.cos(i) - t * Math.sin(i),
                e * Math.sin(i) + t * Math.cos(i),
            ];
        }
        function g(e, t, i, n, r, o, a, s, l, c) {
            const d = ((f = a), (Math.PI * f) / 180);
            var f;
            let h = [],
                p = 0,
                T = 0,
                Q = 0,
                m = 0;
            if (c) [p, T, Q, m] = c;
            else {
                (([e, t] = u(e, t, -d)), ([i, n] = u(i, n, -d)));
                const a = (e - i) / 2,
                    c = (t - n) / 2;
                let f = (a * a) / (r * r) + (c * c) / (o * o);
                f > 1 && ((f = Math.sqrt(f)), (r *= f), (o *= f));
                const h = r * r,
                    g = o * o,
                    b = h * g - h * c * c - g * a * a,
                    C = h * c * c + g * a * a,
                    L = (s === l ? -1 : 1) * Math.sqrt(Math.abs(b / C));
                ((Q = (L * r * c) / o + (e + i) / 2),
                    (m = (L * -o * a) / r + (t + n) / 2),
                    (p = Math.asin(parseFloat(((t - m) / o).toFixed(9)))),
                    (T = Math.asin(parseFloat(((n - m) / o).toFixed(9)))),
                    e < Q && (p = Math.PI - p),
                    i < Q && (T = Math.PI - T),
                    p < 0 && (p = 2 * Math.PI + p),
                    T < 0 && (T = 2 * Math.PI + T),
                    l && p > T && (p -= 2 * Math.PI),
                    !l && T > p && (T -= 2 * Math.PI));
            }
            let b = T - p;
            if (Math.abs(b) > (120 * Math.PI) / 180) {
                const e = T,
                    t = i,
                    s = n;
                ((T =
                    l && T > p
                        ? p + ((120 * Math.PI) / 180) * 1
                        : p + ((120 * Math.PI) / 180) * -1),
                    (h = g(
                        (i = Q + r * Math.cos(T)),
                        (n = m + o * Math.sin(T)),
                        t,
                        s,
                        r,
                        o,
                        a,
                        0,
                        l,
                        [T, e, Q, m]
                    )));
            }
            b = T - p;
            const C = Math.cos(p),
                L = Math.sin(p),
                y = Math.cos(T),
                M = Math.sin(T),
                A = Math.tan(b / 4),
                v = (4 / 3) * r * A,
                E = (4 / 3) * o * A,
                _ = [e, t],
                O = [e + v * L, t - E * C],
                S = [i + v * M, n - E * y],
                x = [i, n];
            if (((O[0] = 2 * _[0] - O[0]), (O[1] = 2 * _[1] - O[1]), c))
                return [O, S, x].concat(h);
            {
                h = [O, S, x].concat(h);
                const e = [];
                for (let t = 0; t < h.length; t += 3) {
                    const i = u(h[t][0], h[t][1], d),
                        n = u(h[t + 1][0], h[t + 1][1], d),
                        r = u(h[t + 2][0], h[t + 2][1], d);
                    e.push([i[0], i[1], n[0], n[1], r[0], r[1]]);
                }
                return e;
            }
        }
        function Q(e, t, i) {
            const n = (function (e) {
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
                                    t.push({ key: 'L', data: [n, r] }));
                                break;
                            case 'V':
                                ((r = d[0]),
                                    t.push({ key: 'L', data: [n, r] }));
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
                                      (g(n, r, l, c, e, i, o, a, s).forEach(
                                          function (e) {
                                              t.push({ key: 'C', data: e });
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
                                    (o.push({ key: 'M', data: [...s] }),
                                        ([t, i] = s),
                                        ([n, r] = s));
                                    break;
                                case 'm':
                                    ((t += s[0]),
                                        (i += s[1]),
                                        o.push({ key: 'M', data: [t, i] }),
                                        (n = t),
                                        (r = i));
                                    break;
                                case 'L':
                                    (o.push({ key: 'L', data: [...s] }),
                                        ([t, i] = s));
                                    break;
                                case 'l':
                                    ((t += s[0]),
                                        (i += s[1]),
                                        o.push({ key: 'L', data: [t, i] }));
                                    break;
                                case 'C':
                                    (o.push({ key: 'C', data: [...s] }),
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
                                    (o.push({ key: 'Q', data: [...s] }),
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
                                    (o.push({ key: 'A', data: [...s] }),
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
                                    (o.push({ key: 'H', data: [...s] }),
                                        (t = s[0]));
                                    break;
                                case 'h':
                                    ((t += s[0]),
                                        o.push({ key: 'H', data: [t] }));
                                    break;
                                case 'V':
                                    (o.push({ key: 'V', data: [...s] }),
                                        (i = s[0]));
                                    break;
                                case 'v':
                                    ((i += s[0]),
                                        o.push({ key: 'V', data: [i] }));
                                    break;
                                case 'S':
                                    (o.push({ key: 'S', data: [...s] }),
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
                                    (o.push({ key: 'T', data: [...s] }),
                                        (t = s[0]),
                                        (i = s[1]));
                                    break;
                                case 't':
                                    ((t += s[0]),
                                        (i += s[1]),
                                        o.push({ key: 'T', data: [t, i] }));
                                    break;
                                case 'Z':
                                case 'z':
                                    (o.push({ key: 'Z', data: [] }),
                                        (t = n),
                                        (i = r));
                            }
                        return o;
                    })(T(e))
                ),
                r = [];
            let o = [],
                c = [0, 0],
                d = [];
            const f = () => {
                    (d.length >= 4 &&
                        o.push(
                            ...(function (e, t = 0.15, i) {
                                const n = [],
                                    r = (e.length - 1) / 3;
                                for (let i = 0; i < r; i++) a(e, 3 * i, t, n);
                                return i && i > 0 ? l(n, 0, n.length, i) : n;
                            })(d, t)
                        ),
                        (d = []));
                },
                h = () => {
                    (f(), o.length && (r.push(o), (o = [])));
                };
            for (const { key: e, data: t } of n)
                switch (e) {
                    case 'M':
                        (h(), (c = [t[0], t[1]]), o.push(c));
                        break;
                    case 'L':
                        (f(), o.push([t[0], t[1]]));
                        break;
                    case 'C':
                        if (!d.length) {
                            const e = o.length ? o[o.length - 1] : c;
                            d.push([e[0], e[1]]);
                        }
                        (d.push([t[0], t[1]]),
                            d.push([t[2], t[3]]),
                            d.push([t[4], t[5]]));
                        break;
                    case 'Z':
                        (f(), o.push([c[0], c[1]]));
                }
            if ((h(), !i)) return r;
            const p = [];
            for (const e of r) {
                const t = s(e, i);
                t.length && p.push(t);
            }
            return p;
        }
    },
};
