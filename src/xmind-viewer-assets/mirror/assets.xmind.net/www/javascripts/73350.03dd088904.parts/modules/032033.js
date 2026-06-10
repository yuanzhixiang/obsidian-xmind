export default {
    32033: function (e, t, i) {
        'use strict';
        (i.r(t),
            i.d(t, {
                add: function () {
                    return L;
                },
                boundingBox: function () {
                    return _;
                },
                cubify: function () {
                    return u;
                },
                length: function () {
                    return O;
                },
                moveIndex: function () {
                    return D;
                },
                offset: function () {
                    return V;
                },
                position: function () {
                    return j;
                },
                remove: function () {
                    return W;
                },
                reverse: function () {
                    return Z;
                },
                rotate: function () {
                    return ie;
                },
                scale: function () {
                    return oe;
                },
            }));
        var n = function (e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e))
                    return (function (e, t) {
                        var i = [],
                            n = !0,
                            r = !1,
                            o = void 0;
                        try {
                            for (
                                var a, s = e[Symbol.iterator]();
                                !(n = (a = s.next()).done) &&
                                (i.push(a.value), !t || i.length !== t);
                                n = !0
                            );
                        } catch (e) {
                            ((r = !0), (o = e));
                        } finally {
                            try {
                                !n && s.return && s.return();
                            } finally {
                                if (r) throw o;
                            }
                        }
                        return i;
                    })(e, t);
                throw new TypeError(
                    'Invalid attempt to destructure non-iterable instance'
                );
            },
            r = 2 * Math.PI,
            o = function (e, t, i, n, r, o, a) {
                var s = e.x,
                    l = e.y;
                return {
                    x: n * (s *= t) - r * (l *= i) + o,
                    y: r * s + n * l + a,
                };
            },
            a = function (e, t) {
                var i =
                        1.5707963267948966 === t
                            ? 0.551915024494
                            : -1.5707963267948966 === t
                              ? -0.551915024494
                              : (4 / 3) * Math.tan(t / 4),
                    n = Math.cos(e),
                    r = Math.sin(e),
                    o = Math.cos(e + t),
                    a = Math.sin(e + t);
                return [
                    { x: n - r * i, y: r + n * i },
                    { x: o + a * i, y: a - o * i },
                    { x: o, y: a },
                ];
            },
            s = function (e, t, i, n) {
                var r = e * i + t * n;
                return (
                    r > 1 && (r = 1),
                    r < -1 && (r = -1),
                    (e * n - t * i < 0 ? -1 : 1) * Math.acos(r)
                );
            },
            l = function (e) {
                var t = e.px,
                    i = e.py,
                    l = e.cx,
                    c = e.cy,
                    d = e.rx,
                    f = e.ry,
                    h = e.xAxisRotation,
                    p = void 0 === h ? 0 : h,
                    T = e.largeArcFlag,
                    u = void 0 === T ? 0 : T,
                    g = e.sweepFlag,
                    Q = void 0 === g ? 0 : g,
                    m = [];
                if (0 === d || 0 === f) return [];
                var b = Math.sin((p * r) / 360),
                    C = Math.cos((p * r) / 360),
                    L = (C * (t - l)) / 2 + (b * (i - c)) / 2,
                    y = (-b * (t - l)) / 2 + (C * (i - c)) / 2;
                if (0 === L && 0 === y) return [];
                ((d = Math.abs(d)), (f = Math.abs(f)));
                var M =
                    Math.pow(L, 2) / Math.pow(d, 2) +
                    Math.pow(y, 2) / Math.pow(f, 2);
                M > 1 && ((d *= Math.sqrt(M)), (f *= Math.sqrt(M)));
                var A = (function (e, t, i, n, o, a, l, c, d, f, h, p) {
                        var T = Math.pow(o, 2),
                            u = Math.pow(a, 2),
                            g = Math.pow(h, 2),
                            Q = Math.pow(p, 2),
                            m = T * u - T * Q - u * g;
                        (m < 0 && (m = 0), (m /= T * Q + u * g));
                        var b =
                                (((m = Math.sqrt(m) * (l === c ? -1 : 1)) * o) /
                                    a) *
                                p,
                            C = ((m * -a) / o) * h,
                            L = f * b - d * C + (e + i) / 2,
                            y = d * b + f * C + (t + n) / 2,
                            M = (h - b) / o,
                            A = (p - C) / a,
                            v = (-h - b) / o,
                            E = (-p - C) / a,
                            _ = s(1, 0, M, A),
                            O = s(M, A, v, E);
                        return (
                            0 === c && O > 0 && (O -= r),
                            1 === c && O < 0 && (O += r),
                            [L, y, _, O]
                        );
                    })(t, i, l, c, d, f, u, Q, b, C, L, y),
                    v = n(A, 4),
                    E = v[0],
                    _ = v[1],
                    O = v[2],
                    S = v[3],
                    x = Math.abs(S) / (r / 4);
                Math.abs(1 - x) < 1e-7 && (x = 1);
                var R = Math.max(Math.ceil(x), 1);
                S /= R;
                for (var I = 0; I < R; I++) (m.push(a(O, S)), (O += S));
                return m.map(function (e) {
                    var t = o(e[0], d, f, C, b, E, _),
                        i = t.x,
                        n = t.y,
                        r = o(e[1], d, f, C, b, E, _),
                        a = r.x,
                        s = r.y,
                        l = o(e[2], d, f, C, b, E, _);
                    return { x1: i, y1: n, x2: a, y2: s, x: l.x, y: l.y };
                });
            },
            c = function (e, t, i) {
                return (
                    Math.acos(
                        (Math.pow(e, 2) + Math.pow(t, 2) - Math.pow(i, 2)) /
                            (2 * e * t)
                    ) *
                    (180 / Math.PI)
                );
            },
            d = function (e, t) {
                for (
                    var i = arguments.length,
                        n = new Array(i > 2 ? i - 2 : 0),
                        r = 2;
                    r < i;
                    r++
                )
                    n[r - 2] = arguments[r];
                return h(t)
                    ? t.map(function (t) {
                          return e.apply(void 0, [t].concat(n));
                      })
                    : e.apply(void 0, [t].concat(n));
            },
            f = function (e, t, i, n) {
                return Math.sqrt(Math.pow(e - i, 2) + Math.pow(t - n, 2));
            },
            h = function (e) {
                return Array.isArray(e[0]);
            },
            p = function (e, t, i) {
                var n = e === t ? 0 : Math.abs(t - e);
                return 0 === n ? e : e < t ? e + n * i : e - n * i;
            },
            T = function (e) {
                for (var t = [], i = 0, n = e.length; i < n; i++) {
                    var r = e[i];
                    if (r.curve && 'cubic' !== r.curve.type) {
                        var o = e[i - 1],
                            a = o.x,
                            s = o.y,
                            c = r.x,
                            d = r.y;
                        if ('arc' === r.curve.type)
                            l({
                                px: a,
                                py: s,
                                cx: c,
                                cy: d,
                                rx: r.curve.rx,
                                ry: r.curve.ry,
                                xAxisRotation: r.curve.xAxisRotation,
                                largeArcFlag: r.curve.largeArcFlag,
                                sweepFlag: r.curve.sweepFlag,
                            }).forEach(function (e) {
                                var i = e.x1,
                                    n = e.y1,
                                    r = e.x2,
                                    o = e.y2,
                                    a = e.x,
                                    s = e.y;
                                t.push({
                                    x: a,
                                    y: s,
                                    curve: {
                                        type: 'cubic',
                                        x1: i,
                                        y1: n,
                                        x2: r,
                                        y2: o,
                                    },
                                });
                            });
                        else if ('quadratic' === r.curve.type) {
                            var f = a + (2 / 3) * (r.curve.x1 - a),
                                h = s + (2 / 3) * (r.curve.y1 - s),
                                p = c + (2 / 3) * (r.curve.x1 - c),
                                T = d + (2 / 3) * (r.curve.y1 - d);
                            t.push({
                                x: c,
                                y: d,
                                curve: {
                                    type: 'cubic',
                                    x1: f,
                                    y1: h,
                                    x2: p,
                                    y2: T,
                                },
                            });
                        }
                    } else t.push(r);
                }
                return t;
            },
            u = function (e) {
                return d(T, e);
            };
        function g(e, t) {
            return (
                (function (e) {
                    if (Array.isArray(e)) return e;
                })(e) ||
                (function (e, t) {
                    var i = [],
                        n = !0,
                        r = !1,
                        o = void 0;
                    try {
                        for (
                            var a, s = e[Symbol.iterator]();
                            !(n = (a = s.next()).done) &&
                            (i.push(a.value), !t || i.length !== t);
                            n = !0
                        );
                    } catch (e) {
                        ((r = !0), (o = e));
                    } finally {
                        try {
                            n || null == s.return || s.return();
                        } finally {
                            if (r) throw o;
                        }
                    }
                    return i;
                })(e, t) ||
                (function () {
                    throw new TypeError(
                        'Invalid attempt to destructure non-iterable instance'
                    );
                })()
            );
        }
        function Q(e) {
            return (
                (function (e) {
                    if (Array.isArray(e)) {
                        for (
                            var t = 0, i = new Array(e.length);
                            t < e.length;
                            t++
                        )
                            i[t] = e[t];
                        return i;
                    }
                })(e) ||
                (function (e) {
                    if (
                        Symbol.iterator in Object(e) ||
                        '[object Arguments]' ===
                            Object.prototype.toString.call(e)
                    )
                        return Array.from(e);
                })(e) ||
                (function () {
                    throw new TypeError(
                        'Invalid attempt to spread non-iterable instance'
                    );
                })()
            );
        }
        var m = function (e, t) {
                var i = t.curve,
                    n = i.x1,
                    r = i.y1,
                    o = i.x2,
                    a = i.y2,
                    s = { x: e.x, y: e.y },
                    l = { x: n, y: r },
                    c = { x: o, y: a },
                    d = { x: t.x, y: t.y },
                    f = { x: p(s.x, l.x, 0.5), y: p(s.y, l.y, 0.5) },
                    h = { x: p(l.x, c.x, 0.5), y: p(l.y, c.y, 0.5) },
                    T = { x: p(c.x, d.x, 0.5), y: p(c.y, d.y, 0.5) },
                    u = { x: p(f.x, h.x, 0.5), y: p(f.y, h.y, 0.5) },
                    g = { x: p(h.x, T.x, 0.5), y: p(h.y, T.y, 0.5) },
                    Q = { x: p(u.x, g.x, 0.5), y: p(u.y, g.y, 0.5) };
                return [
                    {
                        x: Q.x,
                        y: Q.y,
                        curve: {
                            type: 'cubic',
                            x1: f.x,
                            y1: f.y,
                            x2: u.x,
                            y2: u.y,
                        },
                    },
                    {
                        x: d.x,
                        y: d.y,
                        curve: {
                            type: 'cubic',
                            x1: g.x,
                            y1: g.y,
                            x2: T.x,
                            y2: T.y,
                        },
                    },
                ];
            },
            b = function (e, t) {
                return t.curve
                    ? m(e, t)
                    : (function (e, t) {
                          return [
                              { x: p(e.x, t.x, 0.5), y: p(e.y, t.y, 0.5) },
                              t,
                          ];
                      })(e, t);
            },
            C = function e(t, i) {
                if (isNaN(i))
                    throw Error(
                        '`add` function must be passed a number as the second argument'
                    );
                for (var n = Q(t), r = 1; r < n.length; ) {
                    if (n.length >= i) return n;
                    var o = n[r];
                    if (o.moveTo) r++;
                    else {
                        var a = n[r - 1],
                            s = g(b(a, o), 2),
                            l = s[0],
                            c = s[1];
                        (n.splice(r, 1, l, c), (r += 2));
                    }
                }
                return e(n, i);
            },
            L = function (e, t) {
                return C(u(e), t);
            };
        function y(e) {
            return (
                (function (e) {
                    if (Array.isArray(e)) {
                        for (
                            var t = 0, i = new Array(e.length);
                            t < e.length;
                            t++
                        )
                            i[t] = e[t];
                        return i;
                    }
                })(e) ||
                (function (e) {
                    if (
                        Symbol.iterator in Object(e) ||
                        '[object Arguments]' ===
                            Object.prototype.toString.call(e)
                    )
                        return Array.from(e);
                })(e) ||
                (function () {
                    throw new TypeError(
                        'Invalid attempt to spread non-iterable instance'
                    );
                })()
            );
        }
        function M(e, t) {
            return (
                (function (e) {
                    if (Array.isArray(e)) return e;
                })(e) ||
                (function (e, t) {
                    var i = [],
                        n = !0,
                        r = !1,
                        o = void 0;
                    try {
                        for (
                            var a, s = e[Symbol.iterator]();
                            !(n = (a = s.next()).done) &&
                            (i.push(a.value), !t || i.length !== t);
                            n = !0
                        );
                    } catch (e) {
                        ((r = !0), (o = e));
                    } finally {
                        try {
                            n || null == s.return || s.return();
                        } finally {
                            if (r) throw o;
                        }
                    }
                    return i;
                })(e, t) ||
                (function () {
                    throw new TypeError(
                        'Invalid attempt to destructure non-iterable instance'
                    );
                })()
            );
        }
        var A = function (e) {
                var t = M(e[0], 2),
                    i = t[0],
                    n = t[1],
                    r = M(e[1], 2),
                    o = r[0],
                    a = r[1],
                    s = M(e[2], 2),
                    l = s[0],
                    d = s[1],
                    h = f(i, n, o, a),
                    p = f(o, a, l, d),
                    T = f(l, d, i, n);
                return c(h, p, T);
            },
            v = function e(t, i, n) {
                var r = t.x,
                    o = t.y,
                    a = i.x,
                    s = i.y,
                    l = i.curve;
                if (
                    (function (e, t, i, n, r, o, a, s, l) {
                        var c = [
                            [a, s],
                            [e, t],
                            [r, o],
                        ];
                        return (
                            A([
                                [i, n],
                                [r, o],
                                [e, t],
                            ]) < l && A(c) < l
                        );
                    })(r, o, l.x1, l.y1, a, s, l.x2, l.y2, n)
                )
                    return [i];
                var c = M(m(t, i), 2),
                    d = c[0],
                    f = c[1];
                return [].concat(y(e(t, d, n)), y(e(d, f, n)));
            },
            E = function (e) {
                var t =
                    arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : 1;
                if (
                    !(function (e) {
                        return e.reduce(function (e, t) {
                            return !!t.curve || e;
                        }, !1);
                    })(e)
                )
                    return e;
                var i = u(e),
                    n = [];
                return (
                    i.map(function (e, r) {
                        if (e.curve) {
                            var o = i[r - 1];
                            (o.x === e.x && o.y === e.y) ||
                                v(o, e, t).map(function (e) {
                                    return n.push(e);
                                });
                        } else n.push(e);
                    }),
                    n
                );
            },
            _ = function (e) {
                var t,
                    i,
                    n,
                    r,
                    o = (function (e) {
                        return h(e) ? e : [e];
                    })(e);
                return (
                    o.map(function (e) {
                        return E(e).map(function (e) {
                            var o = e.x,
                                a = e.y;
                            (('number' != typeof t || a > t) && (t = a),
                                ('number' != typeof i || o < i) && (i = o),
                                ('number' != typeof n || o > n) && (n = o),
                                ('number' != typeof r || a < r) && (r = a));
                        });
                    }),
                    {
                        bottom: t,
                        center: { x: i + (n - i) / 2, y: r + (t - r) / 2 },
                        left: i,
                        right: n,
                        top: r,
                    }
                );
            },
            O = function (e, t) {
                var i = E(e, t);
                return i.reduce(function (e, t, n) {
                    var r = t.x,
                        o = t.y;
                    if (!t.moveTo) {
                        var a = i[n - 1],
                            s = a.x,
                            l = a.y;
                        e += f(s, l, r, o);
                    }
                    return e;
                }, 0);
            };
        function S(e) {
            return (
                (function (e) {
                    if (Array.isArray(e)) {
                        for (
                            var t = 0, i = new Array(e.length);
                            t < e.length;
                            t++
                        )
                            i[t] = e[t];
                        return i;
                    }
                })(e) ||
                (function (e) {
                    if (
                        Symbol.iterator in Object(e) ||
                        '[object Arguments]' ===
                            Object.prototype.toString.call(e)
                    )
                        return Array.from(e);
                })(e) ||
                (function () {
                    throw new TypeError(
                        'Invalid attempt to spread non-iterable instance'
                    );
                })()
            );
        }
        var x = function (e) {
                return e.length - (R(e) ? 1 : 0);
            },
            R = function (e) {
                var t = e[0],
                    i = e[e.length - 1];
                return t.x === i.x && t.y === i.y;
            },
            I = function (e, t) {
                var i = H(e),
                    n = (function (e) {
                        return e.reduce(function (e, t) {
                            return e + x(t);
                        }, 0);
                    })(i),
                    r = ((t % n) + n) % n;
                if (!r) return e;
                var o = N(i, r),
                    a = o.lineIndex,
                    s = o.pointIndex,
                    l = w(i, a),
                    c = P(l[0], s),
                    d = S(l).splice(1);
                return (function (e) {
                    return e.reduce(function (e, t) {
                        return [].concat(S(e), S(t));
                    }, []);
                })([c].concat(S(d)));
            },
            N = function (e, t) {
                for (var i = 0, n = e.length; i < n; i++) {
                    var r = x(e[i]);
                    if (t <= r - 1) return { lineIndex: i, pointIndex: t };
                    t -= r;
                }
            },
            w = function (e, t) {
                return S(e).splice(t).concat(S(e).splice(0, t));
            },
            P = function (e, t) {
                if (!t) return e;
                var i = [{ x: e[t].x, y: e[t].y, moveTo: !0 }].concat(
                    S(S(e).splice(t + 1))
                );
                return R(e)
                    ? [].concat(S(i), S(S(e).splice(1, t)))
                    : [].concat(S(i), S(S(e).splice(0, t + 1)));
            },
            H = function (e) {
                return e.reduce(function (e, t) {
                    return (t.moveTo && e.push([]), e[e.length - 1].push(t), e);
                }, []);
            },
            D = function (e, t) {
                return d(I, e, t);
            };
        function F(e) {
            for (var t = 1; t < arguments.length; t++)
                if (t % 2) {
                    var i = null != arguments[t] ? arguments[t] : {},
                        n = Object.keys(i);
                    ('function' == typeof Object.getOwnPropertySymbols &&
                        (n = n.concat(
                            Object.getOwnPropertySymbols(i).filter(
                                function (e) {
                                    return Object.getOwnPropertyDescriptor(i, e)
                                        .enumerable;
                                }
                            )
                        )),
                        n.forEach(function (t) {
                            k(e, t, i[t]);
                        }));
                } else
                    Object.defineProperties(
                        e,
                        Object.getOwnPropertyDescriptors(arguments[t])
                    );
            return e;
        }
        function k(e, t, i) {
            return (
                t in e
                    ? Object.defineProperty(e, t, {
                          value: i,
                          enumerable: !0,
                          configurable: !0,
                          writable: !0,
                      })
                    : (e[t] = i),
                e
            );
        }
        var B = function (e, t, i) {
                return e.map(function (e) {
                    var n = F({}, e);
                    return (
                        (n.x += t),
                        (n.y += i),
                        n.curve &&
                            ((n.curve = F({}, n.curve)),
                            ('quadratic' !== n.curve.type &&
                                'cubic' !== n.curve.type) ||
                                ((n.curve.x1 += t), (n.curve.y1 += i)),
                            'cubic' === n.curve.type &&
                                ((n.curve.x2 += t), (n.curve.y2 += i))),
                        n
                    );
                });
            },
            V = function (e) {
                return d(
                    B,
                    e,
                    arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : 0,
                    arguments.length > 2 && void 0 !== arguments[2]
                        ? arguments[2]
                        : 0
                );
            },
            Y = function (e, t, i, n, r) {
                if (e === i) return t >= n ? 0 : 180;
                var o = f(i, n, e, t - 100),
                    a = c(r, 100, o);
                return e < i ? a : 360 - a;
            },
            G = function (e, t) {
                var i = e[0],
                    n = i.x,
                    r = i.y,
                    o = e[1],
                    a = o.x,
                    s = o.y,
                    l = f(n, r, a, s);
                return {
                    x1: n,
                    y1: r,
                    x2: a,
                    y2: s,
                    segmentInterval: t / l,
                    segmentLength: l,
                };
            },
            U = function (e, t, i) {
                for (var n = 0, r = 0; r < t; r++) {
                    if (!e[r].moveTo) {
                        var o = e[r - 1],
                            a = o.x,
                            s = o.y,
                            l = e[r],
                            c = l.x,
                            d = l.y,
                            h = f(a, s, c, d);
                        if (n + h >= i)
                            return {
                                x1: a,
                                y1: s,
                                x2: c,
                                y2: d,
                                segmentInterval: (i - n) / h,
                                segmentLength: h,
                            };
                        n += h;
                    }
                }
            },
            j = function (e, t, i) {
                var n = E(e, i),
                    r = n.length,
                    o = O(n),
                    a = o * t,
                    s =
                        t > 1
                            ? (function (e, t, i, n) {
                                  var r = e[t - 2],
                                      o = r.x,
                                      a = r.y,
                                      s = e[t - 1],
                                      l = s.x,
                                      c = s.y,
                                      d = f(o, a, l, c);
                                  return {
                                      x1: o,
                                      y1: a,
                                      x2: l,
                                      y2: c,
                                      segmentInterval: (n - i) / d + 1,
                                      segmentLength: d,
                                  };
                              })(n, r, o, a)
                            : t < 0
                              ? G(n, a)
                              : U(n, r, a),
                    l = s.x1,
                    c = s.y1,
                    d = s.x2,
                    h = s.y2,
                    T = s.segmentInterval,
                    u = s.segmentLength;
                return {
                    angle: Y(l, c, d, h, u),
                    x: p(l, d, T),
                    y: p(c, h, T),
                };
            },
            $ = function (e, t, i) {
                if (t.curve || i.curve) return !1;
                var n = (i.y - e.y) * (t.x - e.x) - (i.x - e.x) * (t.y - e.y);
                if (Math.abs(n) > Number.EPSILON) return !1;
                var r = (i.x - e.x) * (t.x - e.x) + (i.y - e.y) * (t.y - e.y);
                return (
                    !(r < 0) &&
                    !(r > (t.x - e.x) * (t.x - e.x) + (t.y - e.y) * (t.y - e.y))
                );
            },
            z = function (e) {
                for (var t = [], i = 0, n = e.length; i < n; i++) {
                    var r = t[t.length - 1],
                        o = e[i + 1],
                        a = e[i];
                    (r && o && a && $(r, o, a)) || t.push(a);
                }
                return t;
            },
            W = function (e) {
                return d(z, e);
            },
            K = function (e) {
                var t, i;
                return e.reverse().map(function (e, n) {
                    var r = e.x,
                        o = e.y,
                        a = e.moveTo,
                        s = e.curve,
                        l = { x: r, y: o };
                    if (i) {
                        var c = i,
                            d = c.x1,
                            f = c.y1,
                            h = c.x2,
                            p = c.y2;
                        l.curve = {
                            type: 'cubic',
                            x1: h,
                            y1: p,
                            x2: d,
                            y2: f,
                        };
                    }
                    return (
                        (0 === n || t) && (l.moveTo = !0),
                        (t = a),
                        (i = s || null),
                        l
                    );
                });
            },
            Z = function (e) {
                return d(K, u(e));
            };
        function J(e) {
            for (var t = 1; t < arguments.length; t++)
                if (t % 2) {
                    var i = null != arguments[t] ? arguments[t] : {},
                        n = Object.keys(i);
                    ('function' == typeof Object.getOwnPropertySymbols &&
                        (n = n.concat(
                            Object.getOwnPropertySymbols(i).filter(
                                function (e) {
                                    return Object.getOwnPropertyDescriptor(i, e)
                                        .enumerable;
                                }
                            )
                        )),
                        n.forEach(function (t) {
                            X(e, t, i[t]);
                        }));
                } else
                    Object.defineProperties(
                        e,
                        Object.getOwnPropertyDescriptors(arguments[t])
                    );
            return e;
        }
        function X(e, t, i) {
            return (
                t in e
                    ? Object.defineProperty(e, t, {
                          value: i,
                          enumerable: !0,
                          configurable: !0,
                          writable: !0,
                      })
                    : (e[t] = i),
                e
            );
        }
        function q(e, t) {
            return (
                (function (e) {
                    if (Array.isArray(e)) return e;
                })(e) ||
                (function (e, t) {
                    var i = [],
                        n = !0,
                        r = !1,
                        o = void 0;
                    try {
                        for (
                            var a, s = e[Symbol.iterator]();
                            !(n = (a = s.next()).done) &&
                            (i.push(a.value), !t || i.length !== t);
                            n = !0
                        );
                    } catch (e) {
                        ((r = !0), (o = e));
                    } finally {
                        try {
                            n || null == s.return || s.return();
                        } finally {
                            if (r) throw o;
                        }
                    }
                    return i;
                })(e, t) ||
                (function () {
                    throw new TypeError(
                        'Invalid attempt to destructure non-iterable instance'
                    );
                })()
            );
        }
        var ee = function (e, t, i, n, r) {
                var o = r.x,
                    a = r.y,
                    s = e - o,
                    l = t - a;
                return [s * i - l * n + o, s * n + l * i + a];
            },
            te = function (e, t, i) {
                return e.map(function (e) {
                    var n = (t * Math.PI) / 180,
                        r = Math.cos(n),
                        o = Math.sin(n),
                        a = q(ee(e.x, e.y, r, o, i), 2),
                        s = J({}, e, { x: a[0], y: a[1] });
                    if (s.curve) {
                        if (
                            'quadratic' === s.curve.type ||
                            'cubic' === s.curve.type
                        ) {
                            var l = q(ee(s.curve.x1, s.curve.y1, r, o, i), 2),
                                c = l[0],
                                d = l[1];
                            s.curve = J({}, s.curve, { x1: c, y1: d });
                        }
                        if ('cubic' === s.curve.type) {
                            var f = q(ee(s.curve.x2, s.curve.y2, r, o, i), 2),
                                h = f[0],
                                p = f[1];
                            s.curve = J({}, s.curve, { x2: h, y2: p });
                        }
                    }
                    return s;
                });
            },
            ie = function (e, t) {
                var i = _(e).center;
                return d(te, e, t, i);
            };
        function ne(e) {
            for (var t = 1; t < arguments.length; t++)
                if (t % 2) {
                    var i = null != arguments[t] ? arguments[t] : {},
                        n = Object.keys(i);
                    ('function' == typeof Object.getOwnPropertySymbols &&
                        (n = n.concat(
                            Object.getOwnPropertySymbols(i).filter(
                                function (e) {
                                    return Object.getOwnPropertyDescriptor(i, e)
                                        .enumerable;
                                }
                            )
                        )),
                        n.forEach(function (t) {
                            re(e, t, i[t]);
                        }));
                } else
                    Object.defineProperties(
                        e,
                        Object.getOwnPropertyDescriptors(arguments[t])
                    );
            return e;
        }
        function re(e, t, i) {
            return (
                t in e
                    ? Object.defineProperty(e, t, {
                          value: i,
                          enumerable: !0,
                          configurable: !0,
                          writable: !0,
                      })
                    : (e[t] = i),
                e
            );
        }
        var oe = function (e, t) {
            var i =
                    arguments.length > 2 && void 0 !== arguments[2]
                        ? arguments[2]
                        : 'center',
                n = _(e),
                r = n.bottom,
                o = n.center,
                a = n.left,
                s = n.right,
                l = n.top,
                c = o.x,
                f = o.y;
            switch (i) {
                case 'topLeft':
                    ((c = a), (f = l));
                    break;
                case 'topRight':
                    ((c = s), (f = l));
                    break;
                case 'bottomRight':
                    ((c = s), (f = r));
                    break;
                case 'bottomLeft':
                    ((c = a), (f = r));
            }
            return d(function (e) {
                return e.map(function (e) {
                    return (function (e, t, i, n) {
                        var r = ne({}, e);
                        return (
                            (r.x = i - (i - r.x) * t),
                            (r.y = n - (n - r.y) * t),
                            e.curve &&
                                ((r.curve = ne({}, r.curve)),
                                'arc' === r.curve.type
                                    ? (r.curve.rx &&
                                          (r.curve.rx = r.curve.rx * t),
                                      r.curve.ry &&
                                          (r.curve.ry = r.curve.ry * t))
                                    : ((r.curve.x1 = i - (i - r.curve.x1) * t),
                                      (r.curve.y1 = n - (n - r.curve.y1) * t),
                                      'cubic' === r.curve.type &&
                                          ((r.curve.x2 =
                                              i - (i - r.curve.x2) * t),
                                          (r.curve.y2 =
                                              n - (n - r.curve.y2) * t)))),
                            r
                        );
                    })(e, t, c, f);
                });
            }, e);
        };
    },
};
