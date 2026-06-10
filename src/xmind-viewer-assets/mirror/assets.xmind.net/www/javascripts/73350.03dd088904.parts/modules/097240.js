export default {
    97240: function (e, t) {
        !(function (e) {
            'use strict';
            /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */ var t =
                function (e, i) {
                    return (t =
                        Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array &&
                            function (e, t) {
                                e.__proto__ = t;
                            }) ||
                        function (e, t) {
                            for (var i in t)
                                Object.prototype.hasOwnProperty.call(t, i) &&
                                    (e[i] = t[i]);
                        })(e, i);
                };
            function i(e, i) {
                if ('function' != typeof i && null !== i)
                    throw new TypeError(
                        'Class extends value ' +
                            String(i) +
                            ' is not a constructor or null'
                    );
                function n() {
                    this.constructor = e;
                }
                (t(e, i),
                    (e.prototype =
                        null === i
                            ? Object.create(i)
                            : ((n.prototype = i.prototype), new n())));
            }
            var n = ' ';
            function r(e) {
                var t = '';
                Array.isArray(e) || (e = [e]);
                for (var i = 0; i < e.length; i++) {
                    var r = e[i];
                    if (r.type === C.CLOSE_PATH) t += 'z';
                    else if (r.type === C.HORIZ_LINE_TO)
                        t += (r.relative ? 'h' : 'H') + r.x;
                    else if (r.type === C.VERT_LINE_TO)
                        t += (r.relative ? 'v' : 'V') + r.y;
                    else if (r.type === C.MOVE_TO)
                        t += (r.relative ? 'm' : 'M') + r.x + n + r.y;
                    else if (r.type === C.LINE_TO)
                        t += (r.relative ? 'l' : 'L') + r.x + n + r.y;
                    else if (r.type === C.CURVE_TO)
                        t +=
                            (r.relative ? 'c' : 'C') +
                            r.x1 +
                            n +
                            r.y1 +
                            n +
                            r.x2 +
                            n +
                            r.y2 +
                            n +
                            r.x +
                            n +
                            r.y;
                    else if (r.type === C.SMOOTH_CURVE_TO)
                        t +=
                            (r.relative ? 's' : 'S') +
                            r.x2 +
                            n +
                            r.y2 +
                            n +
                            r.x +
                            n +
                            r.y;
                    else if (r.type === C.QUAD_TO)
                        t +=
                            (r.relative ? 'q' : 'Q') +
                            r.x1 +
                            n +
                            r.y1 +
                            n +
                            r.x +
                            n +
                            r.y;
                    else if (r.type === C.SMOOTH_QUAD_TO)
                        t += (r.relative ? 't' : 'T') + r.x + n + r.y;
                    else {
                        if (r.type !== C.ARC)
                            throw new Error(
                                'Unexpected command type "' +
                                    r.type +
                                    '" at index ' +
                                    i +
                                    '.'
                            );
                        t +=
                            (r.relative ? 'a' : 'A') +
                            r.rX +
                            n +
                            r.rY +
                            n +
                            r.xRot +
                            n +
                            +r.lArcFlag +
                            n +
                            +r.sweepFlag +
                            n +
                            r.x +
                            n +
                            r.y;
                    }
                }
                return t;
            }
            function o(e, t) {
                var i = e[0],
                    n = e[1];
                return [
                    i * Math.cos(t) - n * Math.sin(t),
                    i * Math.sin(t) + n * Math.cos(t),
                ];
            }
            function a() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                for (var i = 0; i < e.length; i++)
                    if ('number' != typeof e[i])
                        throw new Error(
                            'assertNumbers arguments[' +
                                i +
                                '] is not a number. ' +
                                typeof e[i] +
                                ' == typeof ' +
                                e[i]
                        );
                return !0;
            }
            var s = Math.PI;
            function l(e, t, i) {
                ((e.lArcFlag = 0 === e.lArcFlag ? 0 : 1),
                    (e.sweepFlag = 0 === e.sweepFlag ? 0 : 1));
                var n = e.rX,
                    r = e.rY,
                    a = e.x,
                    l = e.y;
                ((n = Math.abs(e.rX)), (r = Math.abs(e.rY)));
                var c = o([(t - a) / 2, (i - l) / 2], (-e.xRot / 180) * s),
                    d = c[0],
                    f = c[1],
                    h =
                        Math.pow(d, 2) / Math.pow(n, 2) +
                        Math.pow(f, 2) / Math.pow(r, 2);
                (1 < h && ((n *= Math.sqrt(h)), (r *= Math.sqrt(h))),
                    (e.rX = n),
                    (e.rY = r));
                var p =
                        Math.pow(n, 2) * Math.pow(f, 2) +
                        Math.pow(r, 2) * Math.pow(d, 2),
                    T =
                        (e.lArcFlag !== e.sweepFlag ? 1 : -1) *
                        Math.sqrt(
                            Math.max(
                                0,
                                (Math.pow(n, 2) * Math.pow(r, 2) - p) / p
                            )
                        ),
                    u = ((n * f) / r) * T,
                    g = ((-r * d) / n) * T,
                    Q = o([u, g], (e.xRot / 180) * s);
                ((e.cX = Q[0] + (t + a) / 2),
                    (e.cY = Q[1] + (i + l) / 2),
                    (e.phi1 = Math.atan2((f - g) / r, (d - u) / n)),
                    (e.phi2 = Math.atan2((-f - g) / r, (-d - u) / n)),
                    0 === e.sweepFlag && e.phi2 > e.phi1 && (e.phi2 -= 2 * s),
                    1 === e.sweepFlag && e.phi2 < e.phi1 && (e.phi2 += 2 * s),
                    (e.phi1 *= 180 / s),
                    (e.phi2 *= 180 / s));
            }
            function c(e, t, i) {
                a(e, t, i);
                var n = e * e + t * t - i * i;
                if (0 > n) return [];
                if (0 === n)
                    return [
                        [(e * i) / (e * e + t * t), (t * i) / (e * e + t * t)],
                    ];
                var r = Math.sqrt(n);
                return [
                    [
                        (e * i + t * r) / (e * e + t * t),
                        (t * i - e * r) / (e * e + t * t),
                    ],
                    [
                        (e * i - t * r) / (e * e + t * t),
                        (t * i + e * r) / (e * e + t * t),
                    ],
                ];
            }
            var d = Math.PI / 180;
            function f(e, t, i) {
                return (1 - i) * e + i * t;
            }
            function h(e, t, i, n) {
                return (
                    e +
                    Math.cos((n / 180) * s) * t +
                    Math.sin((n / 180) * s) * i
                );
            }
            function p(e, t, i, n) {
                var r = 1e-6,
                    o = t - e,
                    a = i - t,
                    s = 3 * o + 3 * (n - i) - 6 * a,
                    l = 6 * (a - o),
                    c = 3 * o;
                return Math.abs(s) < r
                    ? [-c / l]
                    : (function (e, t, i) {
                          void 0 === i && (i = 1e-6);
                          var n = (e * e) / 4 - t;
                          if (n < -i) return [];
                          if (n <= i) return [-e / 2];
                          var r = Math.sqrt(n);
                          return [-e / 2 - r, -e / 2 + r];
                      })(l / s, c / s, r);
            }
            function T(e, t, i, n, r) {
                var o = 1 - r;
                return (
                    e * (o * o * o) +
                    t * (3 * o * o * r) +
                    i * (3 * o * r * r) +
                    n * (r * r * r)
                );
            }
            ((e.SVGPathDataTransformer = void 0),
                (function (e) {
                    function t() {
                        return r(function (e, t, i) {
                            return (
                                e.relative &&
                                    (void 0 !== e.x1 && (e.x1 += t),
                                    void 0 !== e.y1 && (e.y1 += i),
                                    void 0 !== e.x2 && (e.x2 += t),
                                    void 0 !== e.y2 && (e.y2 += i),
                                    void 0 !== e.x && (e.x += t),
                                    void 0 !== e.y && (e.y += i),
                                    (e.relative = !1)),
                                e
                            );
                        });
                    }
                    function i() {
                        var e = NaN,
                            t = NaN,
                            i = NaN,
                            n = NaN;
                        return r(function (r, o, a) {
                            return (
                                r.type & C.SMOOTH_CURVE_TO &&
                                    ((r.type = C.CURVE_TO),
                                    (e = isNaN(e) ? o : e),
                                    (t = isNaN(t) ? a : t),
                                    (r.x1 = r.relative ? o - e : 2 * o - e),
                                    (r.y1 = r.relative ? a - t : 2 * a - t)),
                                r.type & C.CURVE_TO
                                    ? ((e = r.relative ? o + r.x2 : r.x2),
                                      (t = r.relative ? a + r.y2 : r.y2))
                                    : ((e = NaN), (t = NaN)),
                                r.type & C.SMOOTH_QUAD_TO &&
                                    ((r.type = C.QUAD_TO),
                                    (i = isNaN(i) ? o : i),
                                    (n = isNaN(n) ? a : n),
                                    (r.x1 = r.relative ? o - i : 2 * o - i),
                                    (r.y1 = r.relative ? a - n : 2 * a - n)),
                                r.type & C.QUAD_TO
                                    ? ((i = r.relative ? o + r.x1 : r.x1),
                                      (n = r.relative ? a + r.y1 : r.y1))
                                    : ((i = NaN), (n = NaN)),
                                r
                            );
                        });
                    }
                    function n() {
                        var e = NaN,
                            t = NaN;
                        return r(function (i, n, r) {
                            if (
                                (i.type & C.SMOOTH_QUAD_TO &&
                                    ((i.type = C.QUAD_TO),
                                    (e = isNaN(e) ? n : e),
                                    (t = isNaN(t) ? r : t),
                                    (i.x1 = i.relative ? n - e : 2 * n - e),
                                    (i.y1 = i.relative ? r - t : 2 * r - t)),
                                i.type & C.QUAD_TO)
                            ) {
                                ((e = i.relative ? n + i.x1 : i.x1),
                                    (t = i.relative ? r + i.y1 : i.y1));
                                var o = i.x1,
                                    a = i.y1;
                                ((i.type = C.CURVE_TO),
                                    (i.x1 = ((i.relative ? 0 : n) + 2 * o) / 3),
                                    (i.y1 = ((i.relative ? 0 : r) + 2 * a) / 3),
                                    (i.x2 = (i.x + 2 * o) / 3),
                                    (i.y2 = (i.y + 2 * a) / 3));
                            } else ((e = NaN), (t = NaN));
                            return i;
                        });
                    }
                    function r(e) {
                        var t = 0,
                            i = 0,
                            n = NaN,
                            r = NaN;
                        return function (o) {
                            if (isNaN(n) && !(o.type & C.MOVE_TO))
                                throw new Error('path must start with moveto');
                            var a = e(o, t, i, n, r);
                            return (
                                o.type & C.CLOSE_PATH && ((t = n), (i = r)),
                                void 0 !== o.x &&
                                    (t = o.relative ? t + o.x : o.x),
                                void 0 !== o.y &&
                                    (i = o.relative ? i + o.y : o.y),
                                o.type & C.MOVE_TO && ((n = t), (r = i)),
                                a
                            );
                        };
                    }
                    function s(e, t, i, n, o, s) {
                        return (
                            a(e, t, i, n, o, s),
                            r(function (r, a, l, c) {
                                var d = r.x1,
                                    f = r.x2,
                                    h = r.relative && !isNaN(c),
                                    p = void 0 !== r.x ? r.x : h ? 0 : a,
                                    T = void 0 !== r.y ? r.y : h ? 0 : l;
                                function u(e) {
                                    return e * e;
                                }
                                (r.type & C.HORIZ_LINE_TO &&
                                    0 !== t &&
                                    ((r.type = C.LINE_TO),
                                    (r.y = r.relative ? 0 : l)),
                                    r.type & C.VERT_LINE_TO &&
                                        0 !== i &&
                                        ((r.type = C.LINE_TO),
                                        (r.x = r.relative ? 0 : a)),
                                    void 0 !== r.x &&
                                        (r.x = r.x * e + T * i + (h ? 0 : o)),
                                    void 0 !== r.y &&
                                        (r.y = p * t + r.y * n + (h ? 0 : s)),
                                    void 0 !== r.x1 &&
                                        (r.x1 =
                                            r.x1 * e + r.y1 * i + (h ? 0 : o)),
                                    void 0 !== r.y1 &&
                                        (r.y1 = d * t + r.y1 * n + (h ? 0 : s)),
                                    void 0 !== r.x2 &&
                                        (r.x2 =
                                            r.x2 * e + r.y2 * i + (h ? 0 : o)),
                                    void 0 !== r.y2 &&
                                        (r.y2 =
                                            f * t + r.y2 * n + (h ? 0 : s)));
                                var g = e * n - t * i;
                                if (
                                    void 0 !== r.xRot &&
                                    (1 !== e || 0 !== t || 0 !== i || 1 !== n)
                                )
                                    if (0 === g)
                                        (delete r.rX,
                                            delete r.rY,
                                            delete r.xRot,
                                            delete r.lArcFlag,
                                            delete r.sweepFlag,
                                            (r.type = C.LINE_TO));
                                    else {
                                        var Q = (r.xRot * Math.PI) / 180,
                                            m = Math.sin(Q),
                                            b = Math.cos(Q),
                                            L = 1 / u(r.rX),
                                            y = 1 / u(r.rY),
                                            M = u(b) * L + u(m) * y,
                                            A = 2 * m * b * (L - y),
                                            v = u(m) * L + u(b) * y,
                                            E =
                                                M * n * n -
                                                A * t * n +
                                                v * t * t,
                                            _ =
                                                A * (e * n + t * i) -
                                                2 * (M * i * n + v * e * t),
                                            O =
                                                M * i * i -
                                                A * e * i +
                                                v * e * e,
                                            S =
                                                ((Math.atan2(_, E - O) +
                                                    Math.PI) %
                                                    Math.PI) /
                                                2,
                                            x = Math.sin(S),
                                            R = Math.cos(S);
                                        ((r.rX =
                                            Math.abs(g) /
                                            Math.sqrt(
                                                E * u(R) + _ * x * R + O * u(x)
                                            )),
                                            (r.rY =
                                                Math.abs(g) /
                                                Math.sqrt(
                                                    E * u(x) -
                                                        _ * x * R +
                                                        O * u(R)
                                                )),
                                            (r.xRot = (180 * S) / Math.PI));
                                    }
                                return (
                                    void 0 !== r.sweepFlag &&
                                        0 > g &&
                                        (r.sweepFlag = +!r.sweepFlag),
                                    r
                                );
                            })
                        );
                    }
                    function u() {
                        return function (e) {
                            var t = {};
                            for (var i in e) t[i] = e[i];
                            return t;
                        };
                    }
                    ((e.ROUND = function (e) {
                        function t(t) {
                            return Math.round(t * e) / e;
                        }
                        return (
                            void 0 === e && (e = 1e13),
                            a(e),
                            function (e) {
                                return (
                                    void 0 !== e.x1 && (e.x1 = t(e.x1)),
                                    void 0 !== e.y1 && (e.y1 = t(e.y1)),
                                    void 0 !== e.x2 && (e.x2 = t(e.x2)),
                                    void 0 !== e.y2 && (e.y2 = t(e.y2)),
                                    void 0 !== e.x && (e.x = t(e.x)),
                                    void 0 !== e.y && (e.y = t(e.y)),
                                    void 0 !== e.rX && (e.rX = t(e.rX)),
                                    void 0 !== e.rY && (e.rY = t(e.rY)),
                                    e
                                );
                            }
                        );
                    }),
                        (e.TO_ABS = t),
                        (e.TO_REL = function () {
                            return r(function (e, t, i) {
                                return (
                                    e.relative ||
                                        (void 0 !== e.x1 && (e.x1 -= t),
                                        void 0 !== e.y1 && (e.y1 -= i),
                                        void 0 !== e.x2 && (e.x2 -= t),
                                        void 0 !== e.y2 && (e.y2 -= i),
                                        void 0 !== e.x && (e.x -= t),
                                        void 0 !== e.y && (e.y -= i),
                                        (e.relative = !0)),
                                    e
                                );
                            });
                        }),
                        (e.NORMALIZE_HVZ = function (e, t, i) {
                            return (
                                void 0 === e && (e = !0),
                                void 0 === t && (t = !0),
                                void 0 === i && (i = !0),
                                r(function (n, r, o, a, s) {
                                    if (isNaN(a) && !(n.type & C.MOVE_TO))
                                        throw new Error(
                                            'path must start with moveto'
                                        );
                                    return (
                                        t &&
                                            n.type & C.HORIZ_LINE_TO &&
                                            ((n.type = C.LINE_TO),
                                            (n.y = n.relative ? 0 : o)),
                                        i &&
                                            n.type & C.VERT_LINE_TO &&
                                            ((n.type = C.LINE_TO),
                                            (n.x = n.relative ? 0 : r)),
                                        e &&
                                            n.type & C.CLOSE_PATH &&
                                            ((n.type = C.LINE_TO),
                                            (n.x = n.relative ? a - r : a),
                                            (n.y = n.relative ? s - o : s)),
                                        n.type & C.ARC &&
                                            (0 === n.rX || 0 === n.rY) &&
                                            ((n.type = C.LINE_TO),
                                            delete n.rX,
                                            delete n.rY,
                                            delete n.xRot,
                                            delete n.lArcFlag,
                                            delete n.sweepFlag),
                                        n
                                    );
                                })
                            );
                        }),
                        (e.NORMALIZE_ST = i),
                        (e.QT_TO_C = n),
                        (e.INFO = r),
                        (e.SANITIZE = function (e) {
                            (void 0 === e && (e = 0), a(e));
                            var t = NaN,
                                i = NaN,
                                n = NaN,
                                o = NaN;
                            return r(function (r, a, s, l, c) {
                                var d = Math.abs,
                                    f = !1,
                                    h = 0,
                                    p = 0;
                                if (
                                    (r.type & C.SMOOTH_CURVE_TO &&
                                        ((h = isNaN(t) ? 0 : a - t),
                                        (p = isNaN(i) ? 0 : s - i)),
                                    r.type & (C.CURVE_TO | C.SMOOTH_CURVE_TO)
                                        ? ((t = r.relative ? a + r.x2 : r.x2),
                                          (i = r.relative ? s + r.y2 : r.y2))
                                        : ((t = NaN), (i = NaN)),
                                    r.type & C.SMOOTH_QUAD_TO
                                        ? ((n = isNaN(n) ? a : 2 * a - n),
                                          (o = isNaN(o) ? s : 2 * s - o))
                                        : r.type & C.QUAD_TO
                                          ? ((n = r.relative ? a + r.x1 : r.x1),
                                            (o = r.relative ? s + r.y1 : r.y2))
                                          : ((n = NaN), (o = NaN)),
                                    r.type & C.LINE_COMMANDS ||
                                        (r.type & C.ARC &&
                                            (0 === r.rX ||
                                                0 === r.rY ||
                                                !r.lArcFlag)) ||
                                        r.type & C.CURVE_TO ||
                                        r.type & C.SMOOTH_CURVE_TO ||
                                        r.type & C.QUAD_TO ||
                                        r.type & C.SMOOTH_QUAD_TO)
                                ) {
                                    var T =
                                            void 0 === r.x
                                                ? 0
                                                : r.relative
                                                  ? r.x
                                                  : r.x - a,
                                        u =
                                            void 0 === r.y
                                                ? 0
                                                : r.relative
                                                  ? r.y
                                                  : r.y - s;
                                    ((h = isNaN(n)
                                        ? void 0 === r.x1
                                            ? h
                                            : r.relative
                                              ? r.x
                                              : r.x1 - a
                                        : n - a),
                                        (p = isNaN(o)
                                            ? void 0 === r.y1
                                                ? p
                                                : r.relative
                                                  ? r.y
                                                  : r.y1 - s
                                            : o - s));
                                    var g =
                                            void 0 === r.x2
                                                ? 0
                                                : r.relative
                                                  ? r.x
                                                  : r.x2 - a,
                                        Q =
                                            void 0 === r.y2
                                                ? 0
                                                : r.relative
                                                  ? r.y
                                                  : r.y2 - s;
                                    d(T) <= e &&
                                        d(u) <= e &&
                                        d(h) <= e &&
                                        d(p) <= e &&
                                        d(g) <= e &&
                                        d(Q) <= e &&
                                        (f = !0);
                                }
                                return (
                                    r.type & C.CLOSE_PATH &&
                                        d(a - l) <= e &&
                                        d(s - c) <= e &&
                                        (f = !0),
                                    f ? [] : r
                                );
                            });
                        }),
                        (e.MATRIX = s),
                        (e.ROTATE = function (e, t, i) {
                            (void 0 === t && (t = 0),
                                void 0 === i && (i = 0),
                                a(e, t, i));
                            var n = Math.sin(e),
                                r = Math.cos(e);
                            return s(
                                r,
                                n,
                                -n,
                                r,
                                t - t * r + i * n,
                                i - t * n - i * r
                            );
                        }),
                        (e.TRANSLATE = function (e, t) {
                            return (
                                void 0 === t && (t = 0),
                                a(e, t),
                                s(1, 0, 0, 1, e, t)
                            );
                        }),
                        (e.SCALE = function (e, t) {
                            return (
                                void 0 === t && (t = e),
                                a(e, t),
                                s(e, 0, 0, t, 0, 0)
                            );
                        }),
                        (e.SKEW_X = function (e) {
                            return (a(e), s(1, 0, Math.atan(e), 1, 0, 0));
                        }),
                        (e.SKEW_Y = function (e) {
                            return (a(e), s(1, Math.atan(e), 0, 1, 0, 0));
                        }),
                        (e.X_AXIS_SYMMETRY = function (e) {
                            return (
                                void 0 === e && (e = 0),
                                a(e),
                                s(-1, 0, 0, 1, e, 0)
                            );
                        }),
                        (e.Y_AXIS_SYMMETRY = function (e) {
                            return (
                                void 0 === e && (e = 0),
                                a(e),
                                s(1, 0, 0, -1, 0, e)
                            );
                        }),
                        (e.A_TO_C = function () {
                            return r(function (e, t, i) {
                                return C.ARC === e.type
                                    ? (function (e, t, i) {
                                          var n, r, a, s;
                                          e.cX || l(e, t, i);
                                          for (
                                              var c = Math.min(e.phi1, e.phi2),
                                                  h =
                                                      Math.max(e.phi1, e.phi2) -
                                                      c,
                                                  p = Math.ceil(h / 90),
                                                  T = new Array(p),
                                                  u = t,
                                                  g = i,
                                                  Q = 0;
                                              Q < p;
                                              Q++
                                          ) {
                                              var m = f(e.phi1, e.phi2, Q / p),
                                                  b = f(
                                                      e.phi1,
                                                      e.phi2,
                                                      (Q + 1) / p
                                                  ),
                                                  L = b - m,
                                                  y =
                                                      (4 / 3) *
                                                      Math.tan((L * d) / 4),
                                                  M = [
                                                      Math.cos(m * d) -
                                                          y * Math.sin(m * d),
                                                      Math.sin(m * d) +
                                                          y * Math.cos(m * d),
                                                  ],
                                                  A = M[0],
                                                  v = M[1],
                                                  E = [
                                                      Math.cos(b * d),
                                                      Math.sin(b * d),
                                                  ],
                                                  _ = E[0],
                                                  O = E[1],
                                                  S = [
                                                      _ + y * Math.sin(b * d),
                                                      O - y * Math.cos(b * d),
                                                  ],
                                                  x = S[0],
                                                  R = S[1];
                                              T[Q] = {
                                                  relative: e.relative,
                                                  type: C.CURVE_TO,
                                              };
                                              var I = function (t, i) {
                                                  var n = o(
                                                          [t * e.rX, i * e.rY],
                                                          e.xRot
                                                      ),
                                                      r = n[0],
                                                      a = n[1];
                                                  return [e.cX + r, e.cY + a];
                                              };
                                              ((n = I(A, v)),
                                                  (T[Q].x1 = n[0]),
                                                  (T[Q].y1 = n[1]),
                                                  (r = I(x, R)),
                                                  (T[Q].x2 = r[0]),
                                                  (T[Q].y2 = r[1]),
                                                  (a = I(_, O)),
                                                  (T[Q].x = a[0]),
                                                  (T[Q].y = a[1]),
                                                  e.relative &&
                                                      ((T[Q].x1 -= u),
                                                      (T[Q].y1 -= g),
                                                      (T[Q].x2 -= u),
                                                      (T[Q].y2 -= g),
                                                      (T[Q].x -= u),
                                                      (T[Q].y -= g)),
                                                  (u = (s = [
                                                      T[Q].x,
                                                      T[Q].y,
                                                  ])[0]),
                                                  (g = s[1]));
                                          }
                                          return T;
                                      })(
                                          e,
                                          e.relative ? 0 : t,
                                          e.relative ? 0 : i
                                      )
                                    : e;
                            });
                        }),
                        (e.ANNOTATE_ARCS = function () {
                            return r(function (e, t, i) {
                                return (
                                    e.relative && ((t = 0), (i = 0)),
                                    C.ARC === e.type && l(e, t, i),
                                    e
                                );
                            });
                        }),
                        (e.CLONE = u),
                        (e.CALCULATE_BOUNDS = function () {
                            var e = function (e) {
                                    var t = {};
                                    for (var i in e) t[i] = e[i];
                                    return t;
                                },
                                o = t(),
                                a = n(),
                                s = i(),
                                d = r(function (t, i, n) {
                                    var r = s(a(o(e(t))));
                                    function f(e) {
                                        (e > d.maxX && (d.maxX = e),
                                            e < d.minX && (d.minX = e));
                                    }
                                    function u(e) {
                                        (e > d.maxY && (d.maxY = e),
                                            e < d.minY && (d.minY = e));
                                    }
                                    if (
                                        (r.type & C.DRAWING_COMMANDS &&
                                            (f(i), u(n)),
                                        r.type & C.HORIZ_LINE_TO && f(r.x),
                                        r.type & C.VERT_LINE_TO && u(r.y),
                                        r.type & C.LINE_TO && (f(r.x), u(r.y)),
                                        r.type & C.CURVE_TO)
                                    ) {
                                        (f(r.x), u(r.y));
                                        for (
                                            var g = 0,
                                                Q = p(i, r.x1, r.x2, r.x);
                                            g < Q.length;
                                            g++
                                        )
                                            0 < (w = Q[g]) &&
                                                1 > w &&
                                                f(T(i, r.x1, r.x2, r.x, w));
                                        for (
                                            var m = 0,
                                                b = p(n, r.y1, r.y2, r.y);
                                            m < b.length;
                                            m++
                                        )
                                            0 < (w = b[m]) &&
                                                1 > w &&
                                                u(T(n, r.y1, r.y2, r.y, w));
                                    }
                                    if (r.type & C.ARC) {
                                        (f(r.x), u(r.y), l(r, i, n));
                                        for (
                                            var L = (r.xRot / 180) * Math.PI,
                                                y = Math.cos(L) * r.rX,
                                                M = Math.sin(L) * r.rX,
                                                A = -Math.sin(L) * r.rY,
                                                v = Math.cos(L) * r.rY,
                                                E =
                                                    r.phi1 < r.phi2
                                                        ? [r.phi1, r.phi2]
                                                        : -180 > r.phi2
                                                          ? [
                                                                r.phi2 + 360,
                                                                r.phi1 + 360,
                                                            ]
                                                          : [r.phi2, r.phi1],
                                                _ = E[0],
                                                O = E[1],
                                                S = function (e) {
                                                    var t = e[0],
                                                        i = e[1],
                                                        n =
                                                            (180 *
                                                                Math.atan2(
                                                                    i,
                                                                    t
                                                                )) /
                                                            Math.PI;
                                                    return n < _ ? n + 360 : n;
                                                },
                                                x = 0,
                                                R = c(A, -y, 0).map(S);
                                            x < R.length;
                                            x++
                                        )
                                            (w = R[x]) > _ &&
                                                w < O &&
                                                f(h(r.cX, y, A, w));
                                        for (
                                            var I = 0, N = c(v, -M, 0).map(S);
                                            I < N.length;
                                            I++
                                        ) {
                                            var w;
                                            (w = N[I]) > _ &&
                                                w < O &&
                                                u(h(r.cY, M, v, w));
                                        }
                                    }
                                    return t;
                                });
                            return (
                                (d.minX = 1 / 0),
                                (d.maxX = -1 / 0),
                                (d.minY = 1 / 0),
                                (d.maxY = -1 / 0),
                                d
                            );
                        }));
                })(
                    e.SVGPathDataTransformer || (e.SVGPathDataTransformer = {})
                ));
            var u,
                g = (function () {
                    function t() {}
                    return (
                        (t.prototype.round = function (t) {
                            return this.transform(
                                e.SVGPathDataTransformer.ROUND(t)
                            );
                        }),
                        (t.prototype.toAbs = function () {
                            return this.transform(
                                e.SVGPathDataTransformer.TO_ABS()
                            );
                        }),
                        (t.prototype.toRel = function () {
                            return this.transform(
                                e.SVGPathDataTransformer.TO_REL()
                            );
                        }),
                        (t.prototype.normalizeHVZ = function (t, i, n) {
                            return this.transform(
                                e.SVGPathDataTransformer.NORMALIZE_HVZ(t, i, n)
                            );
                        }),
                        (t.prototype.normalizeST = function () {
                            return this.transform(
                                e.SVGPathDataTransformer.NORMALIZE_ST()
                            );
                        }),
                        (t.prototype.qtToC = function () {
                            return this.transform(
                                e.SVGPathDataTransformer.QT_TO_C()
                            );
                        }),
                        (t.prototype.aToC = function () {
                            return this.transform(
                                e.SVGPathDataTransformer.A_TO_C()
                            );
                        }),
                        (t.prototype.sanitize = function (t) {
                            return this.transform(
                                e.SVGPathDataTransformer.SANITIZE(t)
                            );
                        }),
                        (t.prototype.translate = function (t, i) {
                            return this.transform(
                                e.SVGPathDataTransformer.TRANSLATE(t, i)
                            );
                        }),
                        (t.prototype.scale = function (t, i) {
                            return this.transform(
                                e.SVGPathDataTransformer.SCALE(t, i)
                            );
                        }),
                        (t.prototype.rotate = function (t, i, n) {
                            return this.transform(
                                e.SVGPathDataTransformer.ROTATE(t, i, n)
                            );
                        }),
                        (t.prototype.matrix = function (t, i, n, r, o, a) {
                            return this.transform(
                                e.SVGPathDataTransformer.MATRIX(
                                    t,
                                    i,
                                    n,
                                    r,
                                    o,
                                    a
                                )
                            );
                        }),
                        (t.prototype.skewX = function (t) {
                            return this.transform(
                                e.SVGPathDataTransformer.SKEW_X(t)
                            );
                        }),
                        (t.prototype.skewY = function (t) {
                            return this.transform(
                                e.SVGPathDataTransformer.SKEW_Y(t)
                            );
                        }),
                        (t.prototype.xSymmetry = function (t) {
                            return this.transform(
                                e.SVGPathDataTransformer.X_AXIS_SYMMETRY(t)
                            );
                        }),
                        (t.prototype.ySymmetry = function (t) {
                            return this.transform(
                                e.SVGPathDataTransformer.Y_AXIS_SYMMETRY(t)
                            );
                        }),
                        (t.prototype.annotateArcs = function () {
                            return this.transform(
                                e.SVGPathDataTransformer.ANNOTATE_ARCS()
                            );
                        }),
                        t
                    );
                })(),
                Q = function (e) {
                    return ' ' === e || '\t' === e || '\r' === e || '\n' === e;
                },
                m = function (e) {
                    return (
                        '0'.charCodeAt(0) <= e.charCodeAt(0) &&
                        e.charCodeAt(0) <= '9'.charCodeAt(0)
                    );
                },
                b = (function (e) {
                    function t() {
                        var t = e.call(this) || this;
                        return (
                            (t.curNumber = ''),
                            (t.curCommandType = -1),
                            (t.curCommandRelative = !1),
                            (t.canParseCommandOrComma = !0),
                            (t.curNumberHasExp = !1),
                            (t.curNumberHasExpDigits = !1),
                            (t.curNumberHasDecimal = !1),
                            (t.curArgs = []),
                            t
                        );
                    }
                    return (
                        i(t, e),
                        (t.prototype.finish = function (e) {
                            if (
                                (void 0 === e && (e = []),
                                this.parse(' ', e),
                                0 !== this.curArgs.length ||
                                    !this.canParseCommandOrComma)
                            )
                                throw new SyntaxError(
                                    'Unterminated command at the path end.'
                                );
                            return e;
                        }),
                        (t.prototype.parse = function (e, t) {
                            var i = this;
                            void 0 === t && (t = []);
                            for (
                                var n = function (e) {
                                        (t.push(e),
                                            (i.curArgs.length = 0),
                                            (i.canParseCommandOrComma = !0));
                                    },
                                    r = 0;
                                r < e.length;
                                r++
                            ) {
                                var o = e[r],
                                    a = !(
                                        this.curCommandType !== C.ARC ||
                                        (3 !== this.curArgs.length &&
                                            4 !== this.curArgs.length) ||
                                        1 !== this.curNumber.length ||
                                        ('0' !== this.curNumber &&
                                            '1' !== this.curNumber)
                                    ),
                                    s =
                                        m(o) &&
                                        (('0' === this.curNumber &&
                                            '0' === o) ||
                                            a);
                                if (!m(o) || s)
                                    if ('e' !== o && 'E' !== o)
                                        if (
                                            ('-' !== o && '+' !== o) ||
                                            !this.curNumberHasExp ||
                                            this.curNumberHasExpDigits
                                        )
                                            if (
                                                '.' !== o ||
                                                this.curNumberHasExp ||
                                                this.curNumberHasDecimal ||
                                                a
                                            ) {
                                                if (
                                                    this.curNumber &&
                                                    -1 !== this.curCommandType
                                                ) {
                                                    var l = Number(
                                                        this.curNumber
                                                    );
                                                    if (isNaN(l))
                                                        throw new SyntaxError(
                                                            'Invalid number ending at ' +
                                                                r
                                                        );
                                                    if (
                                                        this.curCommandType ===
                                                        C.ARC
                                                    )
                                                        if (
                                                            0 ===
                                                                this.curArgs
                                                                    .length ||
                                                            1 ===
                                                                this.curArgs
                                                                    .length
                                                        ) {
                                                            if (0 > l)
                                                                throw new SyntaxError(
                                                                    'Expected positive number, got "' +
                                                                        l +
                                                                        '" at index "' +
                                                                        r +
                                                                        '"'
                                                                );
                                                        } else if (
                                                            (3 ===
                                                                this.curArgs
                                                                    .length ||
                                                                4 ===
                                                                    this.curArgs
                                                                        .length) &&
                                                            '0' !==
                                                                this
                                                                    .curNumber &&
                                                            '1' !==
                                                                this.curNumber
                                                        )
                                                            throw new SyntaxError(
                                                                'Expected a flag, got "' +
                                                                    this
                                                                        .curNumber +
                                                                    '" at index "' +
                                                                    r +
                                                                    '"'
                                                            );
                                                    (this.curArgs.push(l),
                                                        this.curArgs.length ===
                                                            L[
                                                                this
                                                                    .curCommandType
                                                            ] &&
                                                            (C.HORIZ_LINE_TO ===
                                                            this.curCommandType
                                                                ? n({
                                                                      type: C.HORIZ_LINE_TO,
                                                                      relative:
                                                                          this
                                                                              .curCommandRelative,
                                                                      x: l,
                                                                  })
                                                                : C.VERT_LINE_TO ===
                                                                    this
                                                                        .curCommandType
                                                                  ? n({
                                                                        type: C.VERT_LINE_TO,
                                                                        relative:
                                                                            this
                                                                                .curCommandRelative,
                                                                        y: l,
                                                                    })
                                                                  : this
                                                                          .curCommandType ===
                                                                          C.MOVE_TO ||
                                                                      this
                                                                          .curCommandType ===
                                                                          C.LINE_TO ||
                                                                      this
                                                                          .curCommandType ===
                                                                          C.SMOOTH_QUAD_TO
                                                                    ? (n({
                                                                          type: this
                                                                              .curCommandType,
                                                                          relative:
                                                                              this
                                                                                  .curCommandRelative,
                                                                          x: this
                                                                              .curArgs[0],
                                                                          y: this
                                                                              .curArgs[1],
                                                                      }),
                                                                      C.MOVE_TO ===
                                                                          this
                                                                              .curCommandType &&
                                                                          (this.curCommandType =
                                                                              C.LINE_TO))
                                                                    : this
                                                                            .curCommandType ===
                                                                        C.CURVE_TO
                                                                      ? n({
                                                                            type: C.CURVE_TO,
                                                                            relative:
                                                                                this
                                                                                    .curCommandRelative,
                                                                            x1: this
                                                                                .curArgs[0],
                                                                            y1: this
                                                                                .curArgs[1],
                                                                            x2: this
                                                                                .curArgs[2],
                                                                            y2: this
                                                                                .curArgs[3],
                                                                            x: this
                                                                                .curArgs[4],
                                                                            y: this
                                                                                .curArgs[5],
                                                                        })
                                                                      : this
                                                                              .curCommandType ===
                                                                          C.SMOOTH_CURVE_TO
                                                                        ? n({
                                                                              type: C.SMOOTH_CURVE_TO,
                                                                              relative:
                                                                                  this
                                                                                      .curCommandRelative,
                                                                              x2: this
                                                                                  .curArgs[0],
                                                                              y2: this
                                                                                  .curArgs[1],
                                                                              x: this
                                                                                  .curArgs[2],
                                                                              y: this
                                                                                  .curArgs[3],
                                                                          })
                                                                        : this
                                                                                .curCommandType ===
                                                                            C.QUAD_TO
                                                                          ? n({
                                                                                type: C.QUAD_TO,
                                                                                relative:
                                                                                    this
                                                                                        .curCommandRelative,
                                                                                x1: this
                                                                                    .curArgs[0],
                                                                                y1: this
                                                                                    .curArgs[1],
                                                                                x: this
                                                                                    .curArgs[2],
                                                                                y: this
                                                                                    .curArgs[3],
                                                                            })
                                                                          : this
                                                                                .curCommandType ===
                                                                                C.ARC &&
                                                                            n({
                                                                                type: C.ARC,
                                                                                relative:
                                                                                    this
                                                                                        .curCommandRelative,
                                                                                rX: this
                                                                                    .curArgs[0],
                                                                                rY: this
                                                                                    .curArgs[1],
                                                                                xRot: this
                                                                                    .curArgs[2],
                                                                                lArcFlag:
                                                                                    this
                                                                                        .curArgs[3],
                                                                                sweepFlag:
                                                                                    this
                                                                                        .curArgs[4],
                                                                                x: this
                                                                                    .curArgs[5],
                                                                                y: this
                                                                                    .curArgs[6],
                                                                            })),
                                                        (this.curNumber = ''),
                                                        (this.curNumberHasExpDigits =
                                                            !1),
                                                        (this.curNumberHasExp =
                                                            !1),
                                                        (this.curNumberHasDecimal =
                                                            !1),
                                                        (this.canParseCommandOrComma =
                                                            !0));
                                                }
                                                if (!Q(o))
                                                    if (
                                                        ',' === o &&
                                                        this
                                                            .canParseCommandOrComma
                                                    )
                                                        this.canParseCommandOrComma =
                                                            !1;
                                                    else if (
                                                        '+' !== o &&
                                                        '-' !== o &&
                                                        '.' !== o
                                                    )
                                                        if (s)
                                                            ((this.curNumber =
                                                                o),
                                                                (this.curNumberHasDecimal =
                                                                    !1));
                                                        else {
                                                            if (
                                                                0 !==
                                                                this.curArgs
                                                                    .length
                                                            )
                                                                throw new SyntaxError(
                                                                    'Unterminated command at index ' +
                                                                        r +
                                                                        '.'
                                                                );
                                                            if (
                                                                !this
                                                                    .canParseCommandOrComma
                                                            )
                                                                throw new SyntaxError(
                                                                    'Unexpected character "' +
                                                                        o +
                                                                        '" at index ' +
                                                                        r +
                                                                        '. Command cannot follow comma'
                                                                );
                                                            if (
                                                                ((this.canParseCommandOrComma =
                                                                    !1),
                                                                'z' !== o &&
                                                                    'Z' !== o)
                                                            )
                                                                if (
                                                                    'h' === o ||
                                                                    'H' === o
                                                                )
                                                                    ((this.curCommandType =
                                                                        C.HORIZ_LINE_TO),
                                                                        (this.curCommandRelative =
                                                                            'h' ===
                                                                            o));
                                                                else if (
                                                                    'v' === o ||
                                                                    'V' === o
                                                                )
                                                                    ((this.curCommandType =
                                                                        C.VERT_LINE_TO),
                                                                        (this.curCommandRelative =
                                                                            'v' ===
                                                                            o));
                                                                else if (
                                                                    'm' === o ||
                                                                    'M' === o
                                                                )
                                                                    ((this.curCommandType =
                                                                        C.MOVE_TO),
                                                                        (this.curCommandRelative =
                                                                            'm' ===
                                                                            o));
                                                                else if (
                                                                    'l' === o ||
                                                                    'L' === o
                                                                )
                                                                    ((this.curCommandType =
                                                                        C.LINE_TO),
                                                                        (this.curCommandRelative =
                                                                            'l' ===
                                                                            o));
                                                                else if (
                                                                    'c' === o ||
                                                                    'C' === o
                                                                )
                                                                    ((this.curCommandType =
                                                                        C.CURVE_TO),
                                                                        (this.curCommandRelative =
                                                                            'c' ===
                                                                            o));
                                                                else if (
                                                                    's' === o ||
                                                                    'S' === o
                                                                )
                                                                    ((this.curCommandType =
                                                                        C.SMOOTH_CURVE_TO),
                                                                        (this.curCommandRelative =
                                                                            's' ===
                                                                            o));
                                                                else if (
                                                                    'q' === o ||
                                                                    'Q' === o
                                                                )
                                                                    ((this.curCommandType =
                                                                        C.QUAD_TO),
                                                                        (this.curCommandRelative =
                                                                            'q' ===
                                                                            o));
                                                                else if (
                                                                    't' === o ||
                                                                    'T' === o
                                                                )
                                                                    ((this.curCommandType =
                                                                        C.SMOOTH_QUAD_TO),
                                                                        (this.curCommandRelative =
                                                                            't' ===
                                                                            o));
                                                                else {
                                                                    if (
                                                                        'a' !==
                                                                            o &&
                                                                        'A' !==
                                                                            o
                                                                    )
                                                                        throw new SyntaxError(
                                                                            'Unexpected character "' +
                                                                                o +
                                                                                '" at index ' +
                                                                                r +
                                                                                '.'
                                                                        );
                                                                    ((this.curCommandType =
                                                                        C.ARC),
                                                                        (this.curCommandRelative =
                                                                            'a' ===
                                                                            o));
                                                                }
                                                            else
                                                                (t.push({
                                                                    type: C.CLOSE_PATH,
                                                                }),
                                                                    (this.canParseCommandOrComma =
                                                                        !0),
                                                                    (this.curCommandType =
                                                                        -1));
                                                        }
                                                    else
                                                        ((this.curNumber = o),
                                                            (this.curNumberHasDecimal =
                                                                '.' === o));
                                            } else
                                                ((this.curNumber += o),
                                                    (this.curNumberHasDecimal =
                                                        !0));
                                        else this.curNumber += o;
                                    else
                                        ((this.curNumber += o),
                                            (this.curNumberHasExp = !0));
                                else
                                    ((this.curNumber += o),
                                        (this.curNumberHasExpDigits =
                                            this.curNumberHasExp));
                            }
                            return t;
                        }),
                        (t.prototype.transform = function (e) {
                            return Object.create(this, {
                                parse: {
                                    value: function (t, i) {
                                        void 0 === i && (i = []);
                                        for (
                                            var n = 0,
                                                r = Object.getPrototypeOf(
                                                    this
                                                ).parse.call(this, t);
                                            n < r.length;
                                            n++
                                        ) {
                                            var o = r[n],
                                                a = e(o);
                                            Array.isArray(a)
                                                ? i.push.apply(i, a)
                                                : i.push(a);
                                        }
                                        return i;
                                    },
                                },
                            });
                        }),
                        t
                    );
                })(g),
                C = (function (t) {
                    function n(e) {
                        var i = t.call(this) || this;
                        return (
                            (i.commands =
                                'string' == typeof e ? n.parse(e) : e),
                            i
                        );
                    }
                    return (
                        i(n, t),
                        (n.prototype.encode = function () {
                            return n.encode(this.commands);
                        }),
                        (n.prototype.getBounds = function () {
                            var t = e.SVGPathDataTransformer.CALCULATE_BOUNDS();
                            return (this.transform(t), t);
                        }),
                        (n.prototype.transform = function (e) {
                            for (
                                var t = [], i = 0, n = this.commands;
                                i < n.length;
                                i++
                            ) {
                                var r = e(n[i]);
                                Array.isArray(r)
                                    ? t.push.apply(t, r)
                                    : t.push(r);
                            }
                            return ((this.commands = t), this);
                        }),
                        (n.encode = function (e) {
                            return r(e);
                        }),
                        (n.parse = function (e) {
                            var t = new b(),
                                i = [];
                            return (t.parse(e, i), t.finish(i), i);
                        }),
                        (n.CLOSE_PATH = 1),
                        (n.MOVE_TO = 2),
                        (n.HORIZ_LINE_TO = 4),
                        (n.VERT_LINE_TO = 8),
                        (n.LINE_TO = 16),
                        (n.CURVE_TO = 32),
                        (n.SMOOTH_CURVE_TO = 64),
                        (n.QUAD_TO = 128),
                        (n.SMOOTH_QUAD_TO = 256),
                        (n.ARC = 512),
                        (n.LINE_COMMANDS =
                            n.LINE_TO | n.HORIZ_LINE_TO | n.VERT_LINE_TO),
                        (n.DRAWING_COMMANDS =
                            n.HORIZ_LINE_TO |
                            n.VERT_LINE_TO |
                            n.LINE_TO |
                            n.CURVE_TO |
                            n.SMOOTH_CURVE_TO |
                            n.QUAD_TO |
                            n.SMOOTH_QUAD_TO |
                            n.ARC),
                        n
                    );
                })(g),
                L =
                    (((u = {})[C.MOVE_TO] = 2),
                    (u[C.LINE_TO] = 2),
                    (u[C.HORIZ_LINE_TO] = 1),
                    (u[C.VERT_LINE_TO] = 1),
                    (u[C.CLOSE_PATH] = 0),
                    (u[C.QUAD_TO] = 4),
                    (u[C.SMOOTH_QUAD_TO] = 2),
                    (u[C.CURVE_TO] = 6),
                    (u[C.SMOOTH_CURVE_TO] = 4),
                    (u[C.ARC] = 7),
                    u);
            ((e.COMMAND_ARG_COUNTS = L),
                (e.SVGPathData = C),
                (e.SVGPathDataParser = b),
                (e.encodeSVGPath = r),
                Object.defineProperty(e, '__esModule', { value: !0 }));
        })(t);
    },
};
