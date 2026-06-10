export default [
    function (e, t, i) {
        'use strict';
        (i.d(t, 'g', function () {
            return o;
        }),
            i.d(t, 'z', function () {
                return a;
            }),
            i.d(t, 'h', function () {
                return s;
            }),
            i.d(t, 'A', function () {
                return l;
            }),
            i.d(t, 'i', function () {
                return c;
            }),
            i.d(t, 'B', function () {
                return d;
            }),
            i.d(t, 'j', function () {
                return f;
            }),
            i.d(t, 'C', function () {
                return h;
            }),
            i.d(t, 'o', function () {
                return p;
            }),
            i.d(t, 'F', function () {
                return T;
            }),
            i.d(t, 'p', function () {
                return u;
            }),
            i.d(t, 'G', function () {
                return g;
            }),
            i.d(t, 'u', function () {
                return Q;
            }),
            i.d(t, 'L', function () {
                return m;
            }),
            i.d(t, 's', function () {
                return C;
            }),
            i.d(t, 'J', function () {
                return L;
            }),
            i.d(t, 't', function () {
                return y;
            }),
            i.d(t, 'K', function () {
                return M;
            }),
            i.d(t, 'm', function () {
                return E;
            }),
            i.d(t, 'D', function () {
                return _;
            }),
            i.d(t, 'n', function () {
                return O;
            }),
            i.d(t, 'E', function () {
                return S;
            }),
            i.d(t, 'a', function () {
                return I;
            }),
            i.d(t, 'v', function () {
                return N;
            }),
            i.d(t, 'q', function () {
                return w;
            }),
            i.d(t, 'H', function () {
                return P;
            }),
            i.d(t, 'r', function () {
                return H;
            }),
            i.d(t, 'I', function () {
                return D;
            }),
            i.d(t, 'f', function () {
                return F;
            }),
            i.d(t, 'k', function () {
                return k;
            }),
            i.d(t, 'y', function () {
                return B;
            }),
            i.d(t, 'l', function () {
                return V;
            }),
            i.d(t, 'b', function () {
                return Y;
            }),
            i.d(t, 'w', function () {
                return G;
            }),
            i.d(t, 'c', function () {
                return U;
            }),
            i.d(t, 'x', function () {
                return j;
            }),
            i.d(t, 'd', function () {
                return $;
            }),
            i.d(t, 'e', function () {
                return z;
            }));
        var n = i(5),
            r = i(24);
        function o(e, t = 0) {
            const { startPt: i, ctrlPt: n, endPt: r } = e,
                o = (r.x - n.x) / 5 + n.x;
            return `M ${i.x} ${i.y}L ${n.x} ${n.y}Q ${o} ${r.y} ${r.x - t} ${r.y}`;
        }
        function a(e, t, i = 0, r) {
            const { startPt: o, ctrlPt: a, endPt: s } = e;
            s.x -= i;
            const l = (s.x - a.x) / 3 + a.x,
                c = 3 * t,
                d = t,
                f = Object(n.d)(o, a, c / 2),
                h = Object(n.d)(a, s, c / 2, r ? 'x' : 'y'),
                p = Object(n.d)(s, a, d / 2),
                T = Object(n.s)(s, p),
                u = Object(n.s)(a, h),
                g = Object(n.s)(o, f),
                Q = (h.x - u.x) / 2,
                m = (T.y - p.y) / 2;
            return (
                (T.x = p.x = s.x),
                `M ${f.x} ${f.y}L ${h.x} ${h.y}Q ${l + Q} ${s.y + m} ${T.x} ${T.y}L ${p.x} ${p.y}Q ${l - Q} ${s.y - m} ${u.x} ${u.y}L ${g.x} ${g.y} Z`
            );
        }
        function s(e, t = 0) {
            const { startPt: i, ctrlPt: n, endPt: r } = e;
            return `M ${i.x} ${i.y}L ${n.x} ${n.y}Q ${r.x} ${n.y} ${r.x} ${r.y - t}`;
        }
        function l(e, t, i = 0) {
            const { startPt: r, ctrlPt: o, endPt: a } = e;
            a.y -= i;
            const s = 3 * t,
                l = t,
                c = Object(n.d)(r, o, s / 2),
                d = Object(n.d)(o, a, s / 2),
                f = Object(n.d)(a, o, l / 2),
                h = Object(n.s)(a, f),
                p = Object(n.s)(o, d),
                T = Object(n.s)(r, c),
                u = (d.x - p.x) / 2,
                g = (h.y - f.y) / 2;
            return (
                (h.y = f.y = a.y),
                `M ${c.x} ${c.y}L ${d.x} ${d.y}Q ${a.x + u} ${o.y + g} ${h.x} ${h.y}L ${f.x} ${f.y}Q ${a.x - u} ${o.y - g} ${p.x} ${p.y}L ${T.x} ${T.y} Z`
            );
        }
        function c(e) {
            const { startPt: t, ctrlPt: i, endPt: n } = e;
            return `M ${t.x} ${t.y}L ${i.x} ${i.y}L ${i.x} ${n.y}L ${n.x} ${n.y}`;
        }
        function d(e, t, i) {
            const { startPt: n, ctrlPt: r, endPt: o } = e,
                a = n.y === r.y && r.y === o.y ? 0 : 1,
                s = o.x > r.x ? 1 : -1,
                l = o.y > r.y ? 1 : -1,
                c = r.x !== n.x ? 1 : 0,
                d = r.y !== n.y ? 1 : 0,
                f = (2.4 * t) / 2,
                h = t / 2,
                p = r.x,
                T = o.y,
                u = l * h * (i ? 2.1 : 1);
            return `M ${n.x + d * f} ${n.y - l * c * f}L ${r.x + s * f * a} ${n.y - l * c * f}L ${p + s * f * a} ${T - u}L ${o.x} ${o.y - l * h}L ${o.x} ${o.y + l * h}L ${p - s * f * a} ${T + u}L ${r.x - s * f * a} ${n.y + l * c * f}L ${n.x - d * f} ${n.y + l * c * f}`;
        }
        function f(e) {
            const { startPt: t, ctrlPt: i, endPt: n } = e;
            return `M ${t.x} ${t.y}L ${i.x} ${i.y}L ${n.x} ${i.y}L ${n.x} ${n.y}`;
        }
        function h(e, t, i) {
            const { startPt: n, ctrlPt: r, endPt: o } = e,
                a = n.x === r.x && r.x === o.x ? 0 : 1,
                s = o.x > r.x ? 1 : -1,
                l = o.y > r.y ? 1 : -1,
                c = (3 * t) / 2,
                d = t / 2,
                f = o.x,
                h = r.y,
                p = s * d * (i ? 2.3 : 1);
            return `M ${n.x + s * c} ${n.y}L ${n.x + s * c} ${r.y - l * c * a}L ${f + p} ${h - l * c * a}L ${o.x + s * d} ${o.y}L ${o.x - s * d} ${o.y}L ${f - p} ${h + l * c * a}L ${n.x - s * c} ${r.y + l * c * a}L ${n.x - s * c} ${n.y}`;
        }
        function p(e, t) {
            const { startPt: i, ctrlPt: n, endPt: r } = e,
                o = Math.abs(n.y - r.y) < t ? 0 : 1,
                a = r.x > n.x ? 1 : -1,
                s = r.y > n.y ? 1 : -1,
                l = { x: n.x, y: r.y };
            t = Math.min(t, Math.abs(r.x - n.x));
            const c = l.x,
                d = l.y - s * t * o,
                f = l.x + a * t,
                h = l.y;
            return `M ${i.x} ${i.y}L ${n.x} ${n.y}L ${c} ${d}Q ${l.x} ${l.y} ${f} ${h}L ${r.x} ${r.y}`;
        }
        function T(e, t, i, n) {
            const { startPt: r, ctrlPt: o, endPt: a } = e,
                s = Math.abs(o.y - a.y) < i ? 0 : 1,
                l = a.x > o.x ? 1 : -1,
                c = a.y > o.y ? 1 : -1,
                d = o.x !== r.x ? 1 : 0,
                f = o.y !== r.y ? 1 : 0,
                h = (2.5 * t) / 2,
                p = t / 2,
                T = o.x,
                u = a.y,
                g = i + t / 2,
                Q = i - t / 2,
                m = c * p * (n ? 2.3 : 1),
                b = n ? 0.4 * c * t : 0;
            return `M ${r.x + f * h} ${r.y - c * d * h}L ${o.x + l * h * s} ${r.y - c * d * h}L ${T + l * h * s} ${u - m - c * Q * s}Q ${T + l * h * s} ${u - m + b} ${T + l * h * s + l * Q * s} ${u - m + b}L ${a.x} ${a.y - c * p}L ${a.x} ${a.y + c * p}L ${T - l * h * s + l * g * s + 2 * b} ${u + m}Q ${T - l * h * s} ${u + m} ${T - l * h * s} ${u + c * p - c * g * s}L ${o.x - l * h * s} ${r.y + c * d * h}L ${r.x - f * h} ${r.y + c * d * h}`;
        }
        function u(e, t) {
            const { startPt: i, ctrlPt: n, endPt: r } = e,
                o = Math.abs(n.x - r.x) < t ? 0 : 1,
                a = r.x > n.x ? 1 : -1,
                s = r.y > n.y ? 1 : -1,
                l = { x: r.x, y: n.y };
            t = Math.min(t, Math.abs(r.y - n.y));
            const c = l.x - a * t * o,
                d = l.y,
                f = l.x,
                h = l.y + s * t;
            return `M ${i.x} ${i.y}L ${n.x} ${n.y}L ${c} ${d}Q ${l.x} ${l.y} ${f} ${h}L ${r.x} ${r.y}`;
        }
        function g(e, t, i, n) {
            const { startPt: r, ctrlPt: o, endPt: a } = e,
                s = Math.abs(o.x - a.x) < i ? 0 : 1,
                l = a.x > o.x ? 1 : -1,
                c = a.y > o.y ? 1 : -1,
                d = (3 * t) / 2,
                f = t / 2,
                h = a.x,
                p = o.y,
                T = i + t / 2,
                u = i - t / 2,
                g = l * f * (n ? 2.6 : 1),
                Q = n ? 0.4 * l * t : 0;
            return `M ${r.x + l * d} ${r.y}L ${r.x + l * d} ${o.y - c * d * s}L ${h + g - l * T * s} ${p - c * d * s}Q ${h + g - Q} ${p - c * d * s} ${h + g - Q} ${p - c * d * s + c * T}L ${a.x + l * f - Q} ${a.y}L ${a.x - l * f - Q} ${a.y}L ${h - g} ${p + c * d * s + c * u * s}Q ${h - g} ${p + c * d * s} ${h - l * f - l * u - Q} ${p + c * d * s}L ${r.x - l * d} ${o.y + c * d * s}L ${r.x - l * d} ${r.y}`;
        }
        function Q(e) {
            const { startPt: t, ctrlPt: i, endPt: n } = e;
            return `M ${t.x} ${t.y}L ${i.x} ${i.y}L ${n.x} ${n.y}`;
        }
        function m(e, t, i, r) {
            const { startPt: o, ctrlPt: a, endPt: s } = e,
                l = 3 * t,
                c = t,
                d = Object(n.d)(o, a, l / 2),
                f = Object(n.d)(a, s, l / 2, i ? 'x' : 'y'),
                h = Object(n.d)(s, a, c / 2),
                p = Object(n.s)(s, h),
                T = Object(n.s)(a, f),
                u = Object(n.s)(o, d);
            return (
                r ? (h.y = p.y = s.y) : (h.x = p.x = s.x),
                'M ' +
                    d.x +
                    ' ' +
                    d.y +
                    'L ' +
                    f.x +
                    ' ' +
                    f.y +
                    'L ' +
                    p.x +
                    ' ' +
                    p.y +
                    'L ' +
                    h.x +
                    ' ' +
                    h.y +
                    'L ' +
                    T.x +
                    ' ' +
                    T.y +
                    'L ' +
                    u.x +
                    ' ' +
                    u.y +
                    ' Z'
            );
        }
        const b = 2 / 3;
        function C(e, t = b) {
            const { startPt: i, ctrlPt: n, endPt: r } = e,
                o = (r.x - n.x) * t + n.x,
                a = r.y;
            return `M ${i.x} ${i.y}L ${n.x} ${n.y}L ${o} ${a}L ${r.x} ${r.y}`;
        }
        function L(e, t, i = b) {
            const { ctrlPt: n, endPt: r } = e;
            return A(e, t, { x: (r.x - n.x) * i + n.x, y: r.y });
        }
        function y(e, t = b) {
            const { startPt: i, ctrlPt: n, endPt: r } = e,
                o = r.x,
                a = (r.y - n.y) * t + n.y;
            return `M ${i.x} ${i.y}L ${n.x} ${n.y}L ${o} ${a}L ${r.x} ${r.y}`;
        }
        function M(e, t, i = b) {
            const { ctrlPt: n, endPt: r } = e;
            return A(e, t, { x: r.x, y: (r.y - n.y) * i + n.y });
        }
        function A(e, t, i) {
            const { startPt: r, ctrlPt: o, endPt: a } = e,
                s = 3 * t,
                l = 2 * t,
                c = t,
                d = Object(n.d)(r, o, s / 2),
                f = Object(n.i)(r, o, i, s / 2),
                h = Object(n.i)(o, i, a, l / 2),
                p = Object(n.d)(a, i, c / 2),
                T = Object(n.s)(a, p),
                u = Object(n.s)(i, h),
                g = Object(n.s)(o, f),
                Q = Object(n.s)(r, d);
            return (
                'M ' +
                d.x +
                ' ' +
                d.y +
                'L ' +
                f.x +
                ' ' +
                f.y +
                'L ' +
                h.x +
                ' ' +
                h.y +
                'L ' +
                T.x +
                ' ' +
                T.y +
                'L ' +
                p.x +
                ' ' +
                p.y +
                'L ' +
                u.x +
                ' ' +
                u.y +
                'L ' +
                g.x +
                ' ' +
                g.y +
                'L ' +
                Q.x +
                ' ' +
                Q.y +
                ' Z'
            );
        }
        const v = 0.5;
        function E(e, t = v) {
            const { ctrlPt: i, endPt: n } = e;
            return x(e, { x: (n.x - i.x) * t + i.x, y: n.y });
        }
        function _(e, t, i = v) {
            const { ctrlPt: n, endPt: r } = e;
            return R(e, { x: (r.x - n.x) * i + n.x, y: r.y }, t);
        }
        function O(e, t = v) {
            const { ctrlPt: i, endPt: n } = e;
            return x(e, { x: n.x, y: (n.y - i.y) * t + i.y });
        }
        function S(e, t, i = v) {
            const { ctrlPt: n, endPt: r } = e;
            return R(e, { x: r.x, y: (r.y - n.y) * i + n.y }, t);
        }
        function x(e, t) {
            const { startPt: i, ctrlPt: r, endPt: o } = e,
                a = Math.abs(o.x - r.x),
                s = Math.abs(o.y - r.y),
                l = Math.min(a, s) / 4,
                c = Object(n.h)(r, t, o, l);
            return `M ${i.x} ${i.y}L ${r.x} ${r.y}L ${c[0].x} ${c[0].y}Q ${t.x} ${t.y} ${c[1].x} ${c[1].y}L ${o.x} ${o.y}`;
        }
        function R(e, t, i) {
            const { startPt: r, ctrlPt: o, endPt: a } = e,
                s = Math.abs(a.x - o.x),
                l = Math.abs(a.y - o.y),
                c = Math.max(Math.min(s, l) / 4, 8),
                d = 3 * i,
                f = 2 * i,
                h = i,
                p = Object(n.i)(o, t, a, f / 2),
                T = Object(n.s)(t, p),
                u = Object(n.d)(r, o, d / 2),
                g = Object(n.s)(r, u),
                Q = Object(n.i)(r, o, t, d / 2),
                m = Object(n.s)(o, Q),
                b = Object(n.d)(a, t, h / 2),
                C = Object(n.s)(a, b),
                L = Object(n.h)(Q, p, C, c),
                y = Object(n.h)(m, T, b, c);
            return `M ${u.x} ${u.y}L ${Q.x} ${Q.y}L ${L[0].x} ${L[0].y}Q ${p.x} ${p.y} ${L[1].x} ${L[1].y}L ${C.x} ${C.y}L ${b.x} ${b.y}L ${y[1].x} ${y[1].y}Q ${T.x} ${T.y} ${y[0].x} ${y[0].y}L ${m.x} ${m.y}L ${g.x} ${g.y}`;
        }
        function I(e, t = !1) {
            const { startPt: i, ctrlPt: n, endPt: r } = e,
                o = r.x - n.x,
                a = n.x + o / 3,
                s = n.y + (Math.abs(o) / 5) * (t ? -1 : 1),
                l = r.x - o / 3,
                c = r.y - (Math.abs(o) / 6) * (t ? -1 : 1);
            return `M ${i.x} ${i.y}L ${n.x} ${n.y}C ${a} ${s} ${l} ${c} ${r.x} ${r.y}`;
        }
        function N(e, t) {
            const { startPt: i, ctrlPt: n, endPt: r } = e,
                o = r.x - n.x,
                a = r.x > n.x ? 1 : -1,
                s = t,
                l = (3 * t) / 2,
                c = s / 2,
                d = n.x + o / 3,
                f = n.y + Math.abs(o) / 5,
                h = r.x - o / 3,
                p = r.y - Math.abs(o) / 6;
            return `M ${i.x} ${i.y}L ${i.x - a * l} ${i.y}L ${n.x - a * l} ${n.y + 0.8 * l}C ${d + a * s} ${f + l} ${h - a * c} ${p + c} ${r.x} ${r.y}L ${r.x} ${r.y - 2}C ${h + a * c} ${p - l} ${d} ${f - c} ${n.x + a * c} ${n.y - c}L ${i.x + a * c} ${i.y}Z`;
        }
        function w(e) {
            const { startPt: t, ctrlPt: i, endPt: n } = e,
                r = n.x - i.x,
                o = (n.x + i.x) / 2;
            return `M ${t.x} ${t.y}L ${i.x} ${i.y}C ${n.x - r / 4} ${i.y} ${o} ${n.y} ${n.x} ${n.y}`;
        }
        function P(e, t) {
            const { startPt: i, ctrlPt: n, endPt: r } = e,
                o = r.x - n.x,
                a = (r.x + n.x) / 2,
                s = r.x > n.x ? 1 : -1,
                l = r.y > n.y ? 1 : -1,
                c = 3 * t,
                d = t,
                f = c / 2,
                h = d / 2;
            let p = '';
            return (
                n.y !== i.y &&
                    (p = `M ${i.x} ${i.y}L ${i.x - s * f} ${i.y}L ${n.x - s * f} ${n.y + l * f}L ${n.x + s * f} ${n.y + l * f}L ${i.x + s * f} ${i.y}Z`),
                p +
                    `M ${n.x} ${n.y}` +
                    `L ${n.x} ${n.y + l * f}` +
                    `C ${r.x - o / 4 - s * c} ${n.y + l * f} ${a - s * d} ${r.y + l * h} ${r.x} ${r.y + l * h}` +
                    `L ${r.x} ${r.y - l * h}` +
                    `C ${a + s * d} ${r.y - l * h} ${r.x - o / 4} ${n.y - l * f} ${n.x} ${n.y - l * f}Z`
            );
        }
        function H(e) {
            const { startPt: t, ctrlPt: i, endPt: n } = e,
                r = n.y - i.y,
                o = (n.y + i.y) / 2;
            return `M ${t.x} ${t.y}L ${i.x} ${i.y}C ${i.x} ${n.y - r / 4} ${n.x} ${o} ${n.x} ${n.y}`;
        }
        function D(e, t) {
            const { ctrlPt: i, endPt: n } = e,
                r = n.y - i.y,
                o = (n.y + i.y) / 2,
                a = n.x > i.x ? 1 : -1,
                s = n.y > i.y ? 1 : -1,
                l = 3 * t,
                c = t,
                d = l / 2,
                f = c / 2;
            return `M ${i.x} ${i.y}L ${i.x + a * d} ${i.y}C ${i.x + a * d} ${n.y - r / 4 - s * l}  ${n.x + a * f} ${o - s * c}  ${n.x + a * f} ${n.y}L ${n.x - a * f} ${n.y}C ${n.x - a * f} ${o + s * c}  ${i.x - a * d} ${n.y - r / 4} ${i.x - a * d} ${i.y}Z`;
        }
        function F(e, t, i, n) {
            const {
                isToDown: o,
                braceEndPt: a,
                centerX: s,
                corner: l,
            } = W(e, t);
            return (
                Object(r.g)(n, e, a),
                `M ${e.x} ${e.y}Q ${s} ${e.y} ${s} ${e.y + o * l} L ${s} ${a.y - o * l}Q ${s} ${a.y} ${a.x} ${a.y}`
            );
        }
        function k(e, t, i, n, o) {
            return (
                Object(r.g)(o, t, i),
                (function () {
                    const {
                        isToDown: i,
                        braceEndPt: n,
                        centerX: r,
                        corner: o,
                    } = W(e, t);
                    return `M ${n.x} ${n.y} Q ${r} ${n.y} ${r} ${n.y - i * o} L ${r} ${e.y + i * o} Q ${r} ${e.y} ${e.x} ${e.y} `;
                })() +
                    (function () {
                        const {
                            isToDown: t,
                            braceEndPt: n,
                            centerX: r,
                            corner: o,
                        } = W(e, i);
                        return `M ${e.x} ${e.y}Q ${r} ${e.y} ${r} ${e.y + t * o} L ${r} ${n.y - t * o}Q ${r} ${n.y} ${n.x} ${n.y}`;
                    })()
            );
        }
        function B(e, t, i, n) {
            const {
                    isToRight: o,
                    isToDown: a,
                    braceEndPt: s,
                    centerX: l,
                    corner: c,
                } = W(e, t),
                d = i / 2,
                f = 2 * i,
                h = { x: e.x, y: e.y + a * d },
                p = { x: l - o * f, y: h.y },
                T = { x: p.x, y: p.y + a * (c - d) },
                u = { x: p.x, y: s.y - a * (c - d) },
                g = p.x,
                Q = s.y + a * d,
                m = s.x,
                b = s.y + a * d,
                C = { x: s.x, y: s.y - a * d },
                L = { x: l + o * f, y: C.y },
                y = L.x,
                M = u.y,
                A = { x: L.x, y: T.y },
                v = A.x,
                E = e.y - a * d,
                _ = h.x,
                O = e.y - a * d,
                S = o * a == 1 ? 0 : 1;
            return (
                Object(r.g)(n, e, t),
                `M ${h.x} ${h.y}Q ${p.x} ${p.y} ${T.x} ${T.y}L ${u.x} ${u.y}Q ${g} ${Q} ${m} ${b}A ${d} ${d} 0 0 ${S} ${C.x} ${C.y}Q ${L.x} ${L.y} ${y} ${M}L ${A.x} ${A.y}Q ${v} ${E} ${_} ${O}A ${d} ${d} 0 0 ${S} ${h.x} ${h.y}`
            );
        }
        function V(e, t, i, n, o) {
            const { isToRight: a, corner: s, centerX: l } = W(e, t),
                c = n / 2,
                d = 2 * n;
            if (t.y > i.y) {
                const e = t.y;
                ((t.y = i.y), (i.y = e));
            }
            const f = t,
                h = i;
            Object(r.g)(o, t, i);
            const p = (e, t) => {
                const i = e.y < t.y ? 1 : -1,
                    n = { x: e.x, y: e.y + i * c },
                    r = { x: l - a * d, y: n.y },
                    o = { x: r.x, y: r.y + i * (s - c) },
                    f = { x: r.x, y: t.y - i * (s - c) },
                    h = r.x,
                    p = t.y + i * c,
                    T = t.x,
                    u = t.y + i * c,
                    g = { x: t.x, y: t.y - i * c },
                    Q = { x: l + a * d, y: g.y },
                    m = Q.x,
                    b = f.y,
                    C = Q.x,
                    L = o.y,
                    y = Q.x,
                    M = e.y,
                    A = l - (a * d) / 2,
                    v = e.y,
                    E = a * i == 1 ? 0 : 1;
                return `M ${e.x} ${e.y} L ${n.x} ${n.y}Q ${r.x} ${r.y} ${o.x} ${o.y}L ${f.x} ${f.y}Q ${h} ${p} ${T} ${u}A ${c} ${c} 0 0 ${E} ${g.x} ${g.y}Q ${Q.x} ${Q.y} ${m} ${b}L ${C} ${L}Q ${y} ${M} ${A} ${v}`;
            };
            return (
                p(e, f) +
                p(e, h) +
                `M ${e.x} ${e.y - c}` +
                `A ${c} ${c} 0 0 ${1 === a ? 0 : 1} ${e.x} ${e.y + c}`
            );
        }
        function Y(e, t) {
            const { isToDown: i, braceEndPt: n, centerX: r, dx: o } = W(e, t),
                a = (Math.tan((25 * Math.PI) / 180) * o) / 2;
            return `M ${e.x} ${e.y}L ${r} ${e.y + i * a}L ${r} ${n.y - i * a}L ${n.x} ${n.y}`;
        }
        function G(e, t, i) {
            const {
                    isToRight: n,
                    isToDown: r,
                    braceEndPt: o,
                    centerX: a,
                } = W(e, t),
                s = i / 2,
                l = 1.5 * i,
                c = Math.tan((25 * Math.PI) / 180) * Math.abs(a - l - e.x + s),
                d = Math.tan((25 * Math.PI) / 180) * Math.abs(o.x - a + l),
                f = { x: e.x, y: e.y },
                h = { x: a - n * l, y: e.y + r * c },
                p = { x: h.x, y: o.y + r * s - r * d },
                T = { x: o.x, y: o.y + r * s },
                u = T.x,
                g = o.y - r * s,
                Q = { x: a + n * l, y: p.y },
                m = Q.x,
                b = h.y,
                C = e.x + n * i * 3;
            return `M ${f.x} ${f.y} L ${h.x} ${h.y} L ${p.x} ${p.y}L ${T.x} ${T.y} L ${u} ${g} L ${Q.x} ${Q.y}L ${m} ${b} L ${C} ${f.y} Z`;
        }
        function U(e, t) {
            const { isToDown: i, braceEndPt: n, centerX: r, dx: o } = W(e, t),
                a = (Math.tan((25 * Math.PI) / 180) * o) / 2;
            return `M ${e.x} ${e.y}L ${r} ${e.y + i * a}L ${r} ${n.y}L ${n.x} ${n.y}`;
        }
        function j(e, t, i) {
            const {
                    isToRight: n,
                    isToDown: r,
                    braceEndPt: o,
                    centerX: a,
                } = W(e, t),
                s = i / 2,
                l = 1.5 * i,
                c = Math.tan((25 * Math.PI) / 180) * Math.abs(a - l - e.x + s),
                d = { x: e.x, y: e.y },
                f = { x: a - n * l, y: e.y + r * c },
                h = { x: f.x, y: o.y + r * s },
                p = { x: o.x, y: h.y },
                T = { x: p.x, y: o.y - r * s },
                u = { x: a + n * l, y: T.y },
                g = u.x,
                Q = f.y,
                m = e.x + n * i * 3;
            return `M ${d.x} ${d.y} L ${f.x} ${f.y} L ${h.x} ${h.y}L ${p.x} ${p.y} L ${T.x} ${T.y} L ${u.x} ${u.y}L ${g} ${Q} L ${m} ${d.y} Z`;
        }
        function $(e, t, i) {
            const {
                    isToDown: n,
                    isToRight: r,
                    braceEndPt: o,
                    centerX: a,
                    dy: s,
                } = W(e, t),
                l = i / 2,
                c = ((i / 2) * 3) / 4,
                d = { x: a - r * l, y: e.y },
                f = { x: d.x, y: o.y + n * c },
                h = o.x,
                p = f.y,
                T = o.x,
                u = o.y - n * c,
                g = u - n * c * 0.6,
                Q = { x: a + r * l * 1.8, y: d.y };
            return `M ${d.x} ${d.y}L ${f.x} ${f.y}L ${h} ${p}L ${T} ${u}L ${a + r * l} ${g}Q ${Q.x} ${g - (n * s) / 4} ${Q.x} ${Q.y}`;
        }
        function z(e, t, i) {
            const {
                    isToDown: n,
                    isToRight: r,
                    braceEndPt: o,
                    centerX: a,
                    dx: s,
                    dy: l,
                } = W(e, t),
                c = i / 2,
                d = Math.min(Math.abs(s), Math.abs(l) / 2),
                f = { x: a - r * c, y: e.y },
                h = { x: f.x, y: o.y - n * d },
                p = { x: o.x, y: o.y },
                T = { x: a + r * c, y: h.y },
                u = { x: a + r * c * 1.8, y: f.y };
            return `M ${f.x} ${f.y}L ${h.x} ${h.y}Q ${h.x} ${p.y} ${p.x} ${p.y}Q ${T.x} ${p.y} ${T.x} ${T.y}Q ${u.x} ${u.y + (n * l) / 4} ${u.x} ${u.y}`;
        }
        function W(e, t) {
            const i = t.x > e.x ? 1 : -1,
                n = t.y > e.y ? 1 : -1,
                r = t,
                o = (e.x + r.x) / 2,
                a = Math.abs(r.x - e.x),
                s = Math.abs(r.y - e.y);
            return {
                isToRight: i,
                isToDown: n,
                braceEndPt: r,
                centerX: o,
                dx: a,
                dy: s,
                corner: Math.min(Math.abs(a) / 2, Math.abs(s) / 4),
            };
        }
    },
];
