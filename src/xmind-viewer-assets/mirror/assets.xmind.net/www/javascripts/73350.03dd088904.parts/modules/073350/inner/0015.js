export default [
    function (e, t, i) {
        'use strict';
        function n(e, t) {
            return Math.hypot(e.x - t.x, e.y - t.y);
        }
        function r(e, t) {
            const i = Math.sin(t),
                n = Math.cos(t);
            return { x: e.x * n - e.y * i, y: e.x * i + e.y * n };
        }
        function o(e, t) {
            return r(e, l(t));
        }
        function a(e, t, i) {
            let n = { x: e.x - t.x, y: e.y - t.y };
            return ((n = r(n, i)), { x: t.x + n.x, y: t.y + n.y });
        }
        function s(e, t, i) {
            return a(e, t, l(i));
        }
        function l(e) {
            return (e / 180) * Math.PI;
        }
        function c(e, t = 1) {
            const i = Math.hypot(e.x, e.y);
            if (0 === i) return { x: 0, y: 0 };
            const n = i / t;
            return { x: e.x / n, y: e.y / n };
        }
        function d(e) {
            return c({ x: e.y, y: -e.x });
        }
        function f(e) {
            return { x: -e.x, y: -e.y };
        }
        function h(e, t) {
            return { x: e.x - t.x, y: e.y - t.y };
        }
        function p(e, t) {
            return { x: t.x - e.x, y: t.y - e.y };
        }
        function T(e, t) {
            return { x: e.x + t.x, y: e.y + t.y };
        }
        function u(e, t) {
            return { x: e.x * t, y: e.y * t };
        }
        function g(e, t) {
            return h(e, c(t, 2 * Q(e, t)));
        }
        function Q(e, t) {
            return e.x * t.x + e.y * t.y;
        }
        function m(e, t) {
            return e.x * t.y - e.y * t.x;
        }
        function b(e, t) {
            return e.x === t.x && e.y === t.y;
        }
        function C(e) {
            return (
                Boolean(e) && 'number' == typeof e.x && 'number' == typeof e.y
            );
        }
        function L(e, t) {
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
                        s.x + ((a - s.y) / (l.y - s.y)) * (l.x - s.x) < o &&
                        (r = !r),
                    (n = i));
            return r;
        }
        function y(e) {
            (e = [...e]).sort((e, t) => (e.x !== t.x ? e.x - t.x : e.y - t.y));
            const t = e.length,
                i = [];
            for (let r = 0; r < 2 * t; r++) {
                const o = r < t ? r : 2 * t - 1 - r;
                for (
                    ;
                    i.length >= 2 && n(i[i.length - 2], i[i.length - 1], e[o]);
                )
                    i.pop();
                i.push(e[o]);
            }
            return (i.pop(), i);
            function n(e, t, i) {
                const n = (e.x - t.x) * (i.y - t.y) - (e.y - t.y) * (i.x - t.x),
                    r = (e.x - t.x) * (i.x - t.x) + (e.y - t.y) * (i.y - t.y);
                return n < 0 || (0 === n && r <= 0);
            }
        }
        function M(e, t) {
            return { x: e, y: t };
        }
        (i.d(t, 'a', function () {
            return M;
        }),
            i.d(t, 'f', function () {
                return n;
            }),
            i.d(t, 'o', function () {
                return r;
            }),
            i.d(t, 'r', function () {
                return o;
            }),
            i.d(t, 'p', function () {
                return a;
            }),
            i.d(t, 'q', function () {
                return s;
            }),
            i.d(t, 'l', function () {
                return c;
            }),
            i.d(t, 'k', function () {
                return d;
            }),
            i.d(t, 'n', function () {
                return f;
            }),
            i.d(t, 'e', function () {
                return p;
            }),
            i.d(t, 'b', function () {
                return T;
            }),
            i.d(t, 't', function () {
                return h;
            }),
            i.d(t, 's', function () {
                return u;
            }),
            i.d(t, 'g', function () {
                return Q;
            }),
            i.d(t, 'd', function () {
                return m;
            }),
            i.d(t, 'm', function () {
                return g;
            }),
            i.d(t, 'h', function () {
                return b;
            }),
            i.d(t, 'j', function () {
                return C;
            }),
            i.d(t, 'i', function () {
                return L;
            }),
            i.d(t, 'c', function () {
                return y;
            }));
    },
];
