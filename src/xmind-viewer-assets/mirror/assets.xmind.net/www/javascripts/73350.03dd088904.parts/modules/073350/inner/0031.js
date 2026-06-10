export default [
    function (e, t, i) {
        'use strict';
        (i.d(t, 'h', function () {
            return l;
        }),
            i.d(t, 'd', function () {
                return c;
            }),
            i.d(t, 'g', function () {
                return d;
            }),
            i.d(t, 'a', function () {
                return f;
            }),
            i.d(t, 'i', function () {
                return h;
            }),
            i.d(t, 'j', function () {
                return p;
            }),
            i.d(t, 'b', function () {
                return T;
            }),
            i.d(t, 'c', function () {
                return u;
            }),
            i.d(t, 'e', function () {
                return g;
            }),
            i.d(t, 'k', function () {
                return Q;
            }),
            i.d(t, 'f', function () {
                return m;
            }));
        var n = i(9),
            r = i(5);
        const { STACKGAP: o, NEWCLOUDCORNERLEN: a } = n.a,
            s = (e, t) => ({ x: e, y: t });
        function l(e) {
            return (
                'M ' +
                e.x +
                ' ' +
                e.y +
                'L ' +
                (e.x + e.width) +
                ' ' +
                e.y +
                'L ' +
                (e.x + e.width) +
                ' ' +
                (e.y + e.height) +
                'L ' +
                e.x +
                ' ' +
                (e.y + e.height) +
                'z'
            );
        }
        function c(e) {
            const t = e.x,
                i = e.width / 9 + e.x,
                n = (8 * e.width) / 9 + e.x,
                r = e.width + e.x,
                o = e.y,
                a = e.y + e.height / 2,
                s = e.y + e.height;
            return `M ${t} ${a}L ${i} ${o}L ${n} ${o}L ${r} ${a}L ${n} ${s}L ${i} ${s}Z`;
        }
        function d(e) {
            const t = e.x,
                i = e.x + e.width / 2,
                n = e.x + e.width,
                o = Math.min(e.height / 6, 0.2 * e.width),
                a = e.y + o,
                l = e.y + e.height - o,
                c = s(t, a),
                d = s(n, a),
                f = s(n, l),
                h = s(t, l),
                p = s(i, a - o),
                T = s(i, l + o),
                u = Object(r.g)(h, c, p, 4),
                g = Object(r.g)(p, d, f, 4),
                Q = Object(r.g)(d, f, T, 4),
                m = Object(r.g)(T, h, c, 4),
                b = Object(r.g)(c, p, d, 4),
                C = Object(r.g)(f, T, h, 4);
            return `M ${u[0].x} ${u[0].y}Q ${t} ${a} ${u[1].x} ${u[1].y}L ${b[0].x} ${b[0].y}Q ${p.x} ${p.y} ${b[1].x} ${b[1].y}L ${g[0].x} ${g[0].y}Q ${n} ${a} ${g[1].x} ${g[1].y}L ${Q[0].x} ${Q[0].y}Q ${n} ${l} ${Q[1].x} ${Q[1].y}L ${C[0].x} ${C[0].y}Q ${T.x} ${T.y} ${C[1].x} ${C[1].y}L ${m[0].x} ${m[0].y}Q ${t} ${l} ${m[1].x} ${m[1].y}Z`;
        }
        function f(e) {
            const t = e.x,
                i = e.x + e.width / 2,
                n = e.x + e.width,
                o = Math.min(e.height / 3, 0.2 * e.width),
                a = e.y + o / 2,
                l = e.y + e.height - o / 2,
                c = s(t, a),
                d = s(n, a),
                f = s(n, l),
                h = s(t, l),
                p = s(i, a - o),
                T = s(i, l + o),
                u = Object(r.g)(h, c, p, 5),
                g = Object(r.g)(p, d, f, 5),
                Q = Object(r.g)(d, f, T, 5),
                m = Object(r.g)(T, h, c, 5);
            return `M ${u[0].x} ${u[0].y}Q ${t} ${a} ${u[1].x} ${u[1].y}Q ${i} ${a - o} ${g[0].x} ${g[0].y}Q ${n} ${a} ${g[1].x} ${g[1].y}L ${Q[0].x} ${Q[0].y}Q ${n} ${l} ${Q[1].x} ${Q[1].y}Q ${i} ${l + o} ${m[0].x} ${m[0].y}Q ${t} ${l} ${m[1].x} ${m[1].y}Z`;
        }
        function h(e, t) {
            const i = Math.min(20, Math.min(e.height / 5, e.width / 5));
            let n = `\n    M ${e.x} ${e.y}\n    L ${e.x + e.width - i} ${e.y}\n    L ${e.x + e.width} ${e.y + i}\n    L ${e.x + e.width} ${e.y + e.height}\n    L ${e.x} ${e.y + e.height}\n    z\n  `;
            return (
                t &&
                    (n += `\n      M ${e.x + e.width - i} ${e.y}\n      L ${e.x + e.width - i} ${e.y + i}\n      L ${e.x + e.width} ${e.y + i}\n    `),
                n
            );
        }
        function p(e) {
            return h(e, !0);
        }
        function T(e) {
            return `\n    M ${e.x + 15} ${e.y}\n    L ${e.x + e.width} ${e.y}\n    L ${e.x + e.width} ${e.y + e.height - 15}\n    Q ${e.x + e.width} ${e.y + e.height} ${e.x + e.width - 15} ${e.y + e.height}\n    L ${e.x} ${e.y + e.height}\n    L ${e.x} ${e.y + 15}\n    Q ${e.x} ${e.y} ${e.x + 15} ${e.y}\n  `;
        }
        function u(e) {
            return `\n    M ${e.x} ${e.y + e.height - 5}\n    L ${e.x + e.width} ${e.y + e.height - 5}\n    M ${e.x} ${e.y + e.height}\n    L ${e.x + e.width} ${e.y + e.height}\n  `;
        }
        function g(e) {
            const t = e.height / 2;
            return `\n    M ${e.x} ${e.y + e.height / 2}\n    Q ${e.x + e.width / 2} ${e.y - t} ${e.x + e.width} ${e.y + e.height / 2}\n    Q ${e.x + e.width / 2} ${e.y + e.height + t} ${e.x} ${e.y + e.height / 2}\n    z\n  `;
        }
        function Q(e) {
            const t = o;
            return `\n    M ${e.x} ${e.y}\n    L ${e.x + e.width - t} ${e.y}\n    L ${e.x + e.width - t} ${e.y + e.height - t}\n    L ${e.x} ${e.y + e.height - t}\n    z\n    M ${e.x + e.width - t} ${e.y + t}\n    L ${e.x + e.width} ${e.y + t}\n    L ${e.x + e.width} ${e.y + e.height}\n    L ${e.x + t} ${e.y + e.height}\n    L ${e.x + t} ${e.y + e.height - t}\n  `;
        }
        function m(e) {
            let t = a;
            const i = e.x,
                n = e.y;
            e.width - 2 * t < 40 && (t = a / 1.34);
            const r = t / 5,
                o = (t / 5) * 4,
                s = t / 2,
                l = e.width - 2 * t,
                c = e.height - 2 * t,
                d = l / Math.max(1, parseInt(l / 40)),
                f = c / Math.max(1, parseInt(c / 40));
            let h = i + t,
                p = n + r,
                T = i + t + d,
                u = n + r;
            const g = l / d,
                Q = c / f;
            let m = 'M ' + h + ' ' + p,
                b = 0;
            const C = t / 3;
            for (b = 0; b < g; b++)
                ((m += `\n      C ${h + 0.25 * (T - h)} ${u - C}\n      ${h + 0.75 * (T - h)} ${u - C}\n      ${T} ${u}\n    `),
                    (h = T),
                    (T = h + d));
            for (
                m += `\n    C ${h + s} ${e.y}\n    ${e.x + e.width} ${p + o - s}\n    ${h + o} ${p + o}\n  `,
                    h += o,
                    p += o,
                    T = h,
                    u = p + f,
                    b = 0;
                b < Q;
                b++
            )
                ((m += `\n      C ${h + C} ${p + 0.25 * (u - p)}\n      ${h + C} ${p + 0.75 * (u - p)}\n      ${h} ${u}\n    `),
                    (p = u),
                    (u = p + f));
            for (
                m += `\n    C ${e.x + e.width} ${p + s}\n    ${h - o + s} ${e.y + e.height}\n    ${h - o} ${p + o}\n  `,
                    h -= o,
                    p += o,
                    T = h - d,
                    u = p,
                    b = 0;
                b < g;
                b++
            )
                ((m += `\n      C ${h - 0.25 * Math.abs(T - h)} ${u + C}\n      ${h - 0.75 * Math.abs(T - h)} ${u + C}\n      ${T} ${u}\n    `),
                    (h = T),
                    (T = h - d));
            for (
                m += `\n    C ${h - s} ${e.y + e.height}\n    ${e.x} ${p - o + s}\n    ${h - o} ${p - o}\n  `,
                    h -= o,
                    p -= o,
                    T = h,
                    u = p - f,
                    b = 0;
                b < Q;
                b++
            )
                ((m += `\n      C ${h - C} ${p - 0.25 * Math.abs(u - p)}\n      ${h - C} ${p - 0.75 * Math.abs(u - p)}\n      ${h} ${u}\n    `),
                    (p = u),
                    (u = p - f));
            return (
                (m += `\n    C ${e.x} ${p - s}\n    ${h + o - s} ${e.y}\n    ${h + o} ${p - o}\n  `),
                (m += 'Z'),
                m
            );
        }
    },
];
