export default [
    function (e, t, i) {
        'use strict';
        (i.d(t, 'p', function () {
            return r.e;
        }),
            i.d(t, 'l', function () {
                return r.b;
            }),
            i.d(t, 'n', function () {
                return r.d;
            }),
            i.d(t, 't', function () {
                return r.f;
            }),
            i.d(t, 'u', function () {
                return r.g;
            }),
            i.d(t, 'j', function () {
                return o;
            }),
            i.d(t, 'e', function () {
                return s;
            }),
            i.d(t, 'f', function () {
                return c;
            }),
            i.d(t, 'c', function () {
                return d;
            }),
            i.d(t, 'm', function () {
                return f;
            }),
            i.d(t, 'd', function () {
                return h;
            }),
            i.d(t, 's', function () {
                return p;
            }),
            i.d(t, 'i', function () {
                return T;
            }),
            i.d(t, 'g', function () {
                return u;
            }),
            i.d(t, 'h', function () {
                return g;
            }),
            i.d(t, 'b', function () {
                return m;
            }),
            i.d(t, 'q', function () {
                return b;
            }),
            i.d(t, 'k', function () {
                return L;
            }),
            i.d(t, 'r', function () {
                return y;
            }),
            i.d(t, 'o', function () {
                return M;
            }),
            i.d(t, 'a', function () {
                return n.a;
            }));
        var n = i(68),
            r = i(58);
        function o(e, t) {
            return Math.hypot(e.x - t.x, e.y - t.y);
        }
        function a(e, t) {
            const i = Math.sin(t),
                n = Math.cos(t);
            return { x: e.x * n - e.y * i, y: e.x * i + e.y * n };
        }
        function s(e) {
            return (e / 180) * Math.PI;
        }
        function l(e, t = 1) {
            const i = Math.hypot(e.x, e.y) / t;
            return {
                x: Number.isNaN(i) ? 0 : e.x / i,
                y: Number.isNaN(i) ? 0 : e.y / i,
            };
        }
        function c(e, t) {
            return { x: t.x - e.x, y: t.y - e.y };
        }
        function d(e, t) {
            return { x: e.x + t.x, y: e.y + t.y };
        }
        function f(e, t) {
            return e.x === t.x && e.y === t.y;
        }
        function h(e, t, i, n) {
            if (f(e, t)) return e;
            let r = c(e, t);
            return (
                (r = l(r, i)),
                (r = a(r, Math.PI / 2)),
                'x' === n
                    ? (r.x *= Math.abs(i) / Math.abs(r.x))
                    : 'y' === n && (r.y *= Math.abs(i) / Math.abs(r.y)),
                d(e, r)
            );
        }
        function p(e, t) {
            return { x: 2 * e.x - t.x, y: 2 * e.y - t.y };
        }
        function T(e, t, i, n) {
            if (
                f(e, t) ||
                (e.y === t.y && t.y === i.y) ||
                (e.x === t.x && t.x === i.x)
            )
                return h(t, i, n);
            let r = c(e, t),
                o = c(t, i);
            ((r = l(r)), (o = l(o)));
            let s = d(r, o);
            if (((s = l(s, n)), (s = a(s, Math.PI / 2)), isNaN(s.x)))
                throw 'Hey';
            return d(t, s);
        }
        function u(e, t, i, n) {
            let r = c(t, e),
                o = c(t, i);
            return ((r = l(r, n)), (o = l(o, n)), [d(t, r), d(t, o)]);
        }
        function g(e, t, i, n) {
            let r = c(t, e),
                o = c(t, i);
            return ((r = l(r, 2 * n)), (o = l(o, n)), [d(t, r), d(t, o)]);
        }
        const Q = {};
        function m(e) {
            if (e && Q[e]) return Q[e];
            const t = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
                /[xy]/g,
                (e) => {
                    const t = (16 * Math.random()) | 0;
                    return ('x' === e ? t : (3 & t) | 8).toString(16);
                }
            );
            return e ? (Q[e] = t) : t;
        }
        function b(e, t) {
            return `${e} has been deprecated, use ${t} instead`;
        }
        function C(e, t = 12) {
            return +parseFloat(e.toPrecision(t));
        }
        function L(e, t) {
            return !(
                t.x > e.x + e.width ||
                e.x > t.x + t.width ||
                t.y > e.y + e.height ||
                e.y > t.y + t.height
            );
        }
        function y(e, t) {
            const i = { x: 0, y: 0, width: 0, height: 0 };
            return (
                e.x < t.x
                    ? ((i.x = e.x), (i.width = e.x - t.x))
                    : e.x + e.width > t.x + t.width &&
                      ((i.x = t.x),
                      (i.width = e.x + e.width - (t.x + t.width))),
                e.y < t.y
                    ? ((i.y = e.y), (i.height = e.y - t.y))
                    : e.y + e.height > t.y + t.height &&
                      ((i.y = t.y),
                      (i.height = e.y + e.height - (t.y + t.height))),
                i
            );
        }
        function M(e, t) {
            return C(e.width) === C(t.width) && C(e.height) === C(t.height);
        }
    },
];
