export default {
    74469: function (e, t, i) {
        'use strict';
        (i.r(t),
            i.d(t, {
                toPath: function () {
                    return M;
                },
                toPoints: function () {
                    return L;
                },
                valid: function () {
                    return _;
                },
            }));
        var n =
            Object.assign ||
            function (e) {
                for (var t = 1; t < arguments.length; t++) {
                    var i = arguments[t];
                    for (var n in i)
                        Object.prototype.hasOwnProperty.call(i, n) &&
                            (e[n] = i[n]);
                }
                return e;
            };
        var r = function (e) {
                var t = e.type,
                    i = (function (e, t) {
                        var i = {};
                        for (var n in e)
                            t.indexOf(n) >= 0 ||
                                (Object.prototype.hasOwnProperty.call(e, n) &&
                                    (i[n] = e[n]));
                        return i;
                    })(e, ['type']);
                switch (t) {
                    case 'circle':
                        return o(i);
                    case 'ellipse':
                        return a(i);
                    case 'line':
                        return s(i);
                    case 'path':
                        return p(i);
                    case 'polygon':
                        return T(i);
                    case 'polyline':
                        return u(i);
                    case 'rect':
                        return Q(i);
                    case 'g':
                        return C(i);
                    default:
                        throw new Error('Not a valid shape type');
                }
            },
            o = function (e) {
                var t = e.cx,
                    i = e.cy,
                    n = e.r;
                return [
                    { x: t, y: i - n, moveTo: !0 },
                    {
                        x: t,
                        y: i + n,
                        curve: { type: 'arc', rx: n, ry: n, sweepFlag: 1 },
                    },
                    {
                        x: t,
                        y: i - n,
                        curve: { type: 'arc', rx: n, ry: n, sweepFlag: 1 },
                    },
                ];
            },
            a = function (e) {
                var t = e.cx,
                    i = e.cy,
                    n = e.rx,
                    r = e.ry;
                return [
                    { x: t, y: i - r, moveTo: !0 },
                    {
                        x: t,
                        y: i + r,
                        curve: { type: 'arc', rx: n, ry: r, sweepFlag: 1 },
                    },
                    {
                        x: t,
                        y: i - r,
                        curve: { type: 'arc', rx: n, ry: r, sweepFlag: 1 },
                    },
                ];
            },
            s = function (e) {
                var t = e.x1,
                    i = e.x2;
                return [
                    { x: t, y: e.y1, moveTo: !0 },
                    { x: i, y: e.y2 },
                ];
            },
            l = /[MmLlHhVvCcSsQqTtAaZz]/g,
            c = {
                A: 7,
                C: 6,
                H: 1,
                L: 2,
                M: 2,
                Q: 4,
                S: 4,
                T: 2,
                V: 1,
                Z: 0,
            },
            d = ['a', 'c', 'h', 'l', 'm', 'q', 's', 't', 'v'],
            f = function (e) {
                return -1 !== d.indexOf(e);
            },
            h = ['xAxisRotation', 'largeArcFlag', 'sweepFlag'],
            p = function (e) {
                for (
                    var t = e.d,
                        i = (function (e) {
                            return e.match(l);
                        })(t),
                        n = (function (e) {
                            return e
                                .split(l)
                                .map(function (e) {
                                    return e.replace(/[0-9]+-/g, function (e) {
                                        return e.slice(0, -1) + ' -';
                                    });
                                })
                                .map(function (e) {
                                    return e.replace(/\.[0-9]+/g, function (e) {
                                        return e + ' ';
                                    });
                                })
                                .map(function (e) {
                                    return e.trim();
                                })
                                .filter(function (e) {
                                    return e.length > 0;
                                })
                                .map(function (e) {
                                    return e
                                        .split(/[ ,]+/)
                                        .map(parseFloat)
                                        .filter(function (e) {
                                            return !isNaN(e);
                                        });
                                });
                        })(t),
                        r = [],
                        o = void 0,
                        a = 0,
                        s = i.length;
                    a < s;
                    a++
                ) {
                    var d = i[a],
                        p = d.toUpperCase(),
                        T = c[p],
                        u = f(d);
                    if (T > 0)
                        for (
                            var g = n.shift(), Q = g.length / T, m = 0;
                            m < Q;
                            m++
                        ) {
                            var b = r[r.length - 1] || { x: 0, y: 0 };
                            switch (p) {
                                case 'M':
                                    var C = (u ? b.x : 0) + g.shift(),
                                        L = (u ? b.y : 0) + g.shift();
                                    0 === m
                                        ? ((o = { x: C, y: L }),
                                          r.push({
                                              x: C,
                                              y: L,
                                              moveTo: !0,
                                          }))
                                        : r.push({ x: C, y: L });
                                    break;
                                case 'L':
                                    r.push({
                                        x: (u ? b.x : 0) + g.shift(),
                                        y: (u ? b.y : 0) + g.shift(),
                                    });
                                    break;
                                case 'H':
                                    r.push({
                                        x: (u ? b.x : 0) + g.shift(),
                                        y: b.y,
                                    });
                                    break;
                                case 'V':
                                    r.push({
                                        x: b.x,
                                        y: (u ? b.y : 0) + g.shift(),
                                    });
                                    break;
                                case 'A':
                                    r.push({
                                        curve: {
                                            type: 'arc',
                                            rx: g.shift(),
                                            ry: g.shift(),
                                            xAxisRotation: g.shift(),
                                            largeArcFlag: g.shift(),
                                            sweepFlag: g.shift(),
                                        },
                                        x: (u ? b.x : 0) + g.shift(),
                                        y: (u ? b.y : 0) + g.shift(),
                                    });
                                    var y = !0,
                                        M = !1,
                                        A = void 0;
                                    try {
                                        for (
                                            var v, E = h[Symbol.iterator]();
                                            !(y = (v = E.next()).done);
                                            y = !0
                                        ) {
                                            var _ = v.value;
                                            0 === r[r.length - 1].curve[_] &&
                                                delete r[r.length - 1].curve[_];
                                        }
                                    } catch (e) {
                                        ((M = !0), (A = e));
                                    } finally {
                                        try {
                                            !y && E.return && E.return();
                                        } finally {
                                            if (M) throw A;
                                        }
                                    }
                                    break;
                                case 'C':
                                    r.push({
                                        curve: {
                                            type: 'cubic',
                                            x1: (u ? b.x : 0) + g.shift(),
                                            y1: (u ? b.y : 0) + g.shift(),
                                            x2: (u ? b.x : 0) + g.shift(),
                                            y2: (u ? b.y : 0) + g.shift(),
                                        },
                                        x: (u ? b.x : 0) + g.shift(),
                                        y: (u ? b.y : 0) + g.shift(),
                                    });
                                    break;
                                case 'S':
                                    var O = (u ? b.x : 0) + g.shift(),
                                        S = (u ? b.y : 0) + g.shift(),
                                        x = (u ? b.x : 0) + g.shift(),
                                        R = (u ? b.y : 0) + g.shift(),
                                        I = {},
                                        N = void 0,
                                        w = void 0;
                                    (b.curve && 'cubic' === b.curve.type
                                        ? ((I.x = Math.abs(b.x - b.curve.x2)),
                                          (I.y = Math.abs(b.y - b.curve.y2)),
                                          (N =
                                              b.x < b.curve.x2
                                                  ? b.x - I.x
                                                  : b.x + I.x),
                                          (w =
                                              b.y < b.curve.y2
                                                  ? b.y - I.y
                                                  : b.y + I.y))
                                        : ((I.x = Math.abs(x - O)),
                                          (I.y = Math.abs(R - S)),
                                          (N = b.x),
                                          (w = b.y)),
                                        r.push({
                                            curve: {
                                                type: 'cubic',
                                                x1: N,
                                                y1: w,
                                                x2: O,
                                                y2: S,
                                            },
                                            x: x,
                                            y: R,
                                        }));
                                    break;
                                case 'Q':
                                    r.push({
                                        curve: {
                                            type: 'quadratic',
                                            x1: (u ? b.x : 0) + g.shift(),
                                            y1: (u ? b.y : 0) + g.shift(),
                                        },
                                        x: (u ? b.x : 0) + g.shift(),
                                        y: (u ? b.y : 0) + g.shift(),
                                    });
                                    break;
                                case 'T':
                                    var P = (u ? b.x : 0) + g.shift(),
                                        H = (u ? b.y : 0) + g.shift(),
                                        D = void 0,
                                        F = void 0;
                                    if (
                                        b.curve &&
                                        'quadratic' === b.curve.type
                                    ) {
                                        var k = {
                                            x: Math.abs(b.x - b.curve.x1),
                                            y: Math.abs(b.y - b.curve.y1),
                                        };
                                        ((D =
                                            b.x < b.curve.x1
                                                ? b.x - k.x
                                                : b.x + k.x),
                                            (F =
                                                b.y < b.curve.y1
                                                    ? b.y - k.y
                                                    : b.y + k.y));
                                    } else ((D = b.x), (F = b.y));
                                    r.push({
                                        curve: {
                                            type: 'quadratic',
                                            x1: D,
                                            y1: F,
                                        },
                                        x: P,
                                        y: H,
                                    });
                            }
                        }
                    else {
                        var B = r[r.length - 1] || { x: 0, y: 0 };
                        (B.x === o.x && B.y === o.y) ||
                            r.push({ x: o.x, y: o.y });
                    }
                }
                return r;
            },
            T = function (e) {
                var t = e.points;
                return g({ closed: !0, points: t });
            },
            u = function (e) {
                var t = e.points;
                return g({ closed: !1, points: t });
            },
            g = function (e) {
                var t = e.closed,
                    i = e.points
                        .split(/[\s,]+/)
                        .map(function (e) {
                            return parseFloat(e);
                        })
                        .reduce(function (e, t, i) {
                            return (
                                i % 2 == 0
                                    ? e.push({ x: t })
                                    : (e[(i - 1) / 2].y = t),
                                e
                            );
                        }, []);
                return (t && i.push(n({}, i[0])), (i[0].moveTo = !0), i);
            },
            Q = function (e) {
                var t = e.height,
                    i = e.rx,
                    n = e.ry,
                    r = e.width,
                    o = e.x,
                    a = e.y;
                return i || n
                    ? b({
                          height: t,
                          rx: i || n,
                          ry: n || i,
                          width: r,
                          x: o,
                          y: a,
                      })
                    : m({ height: t, width: r, x: o, y: a });
            },
            m = function (e) {
                var t = e.height,
                    i = e.width,
                    n = e.x,
                    r = e.y;
                return [
                    { x: n, y: r, moveTo: !0 },
                    { x: n + i, y: r },
                    { x: n + i, y: r + t },
                    { x: n, y: r + t },
                    { x: n, y: r },
                ];
            },
            b = function (e) {
                var t = e.height,
                    i = e.rx,
                    n = e.ry,
                    r = e.width,
                    o = e.x,
                    a = e.y,
                    s = { type: 'arc', rx: i, ry: n, sweepFlag: 1 };
                return [
                    { x: o + i, y: a, moveTo: !0 },
                    { x: o + r - i, y: a },
                    { x: o + r, y: a + n, curve: s },
                    { x: o + r, y: a + t - n },
                    { x: o + r - i, y: a + t, curve: s },
                    { x: o + i, y: a + t },
                    { x: o, y: a + t - n, curve: s },
                    { x: o, y: a + n },
                    { x: o + i, y: a, curve: s },
                ];
            },
            C = function (e) {
                return e.shapes.map(function (e) {
                    return r(e);
                });
            },
            L = r,
            y = function (e) {
                var t = '',
                    i = 0,
                    n = void 0,
                    r = !0,
                    o = !1,
                    a = void 0;
                try {
                    for (
                        var s, l = e[Symbol.iterator]();
                        !(r = (s = l.next()).done);
                        r = !0
                    ) {
                        var c = s.value,
                            d = c.curve,
                            f = void 0 !== d && d,
                            h = c.moveTo,
                            p = c.x,
                            T = c.y,
                            u = 0 === i || h,
                            g = i === e.length - 1 || e[i + 1].moveTo,
                            Q = 0 === i ? null : e[i - 1];
                        if (u) ((n = c), g || (t += 'M' + p + ',' + T));
                        else if (f) {
                            switch (f.type) {
                                case 'arc':
                                    var m = c.curve,
                                        b = m.largeArcFlag,
                                        C = void 0 === b ? 0 : b,
                                        L = m.rx,
                                        y = m.ry,
                                        M = m.sweepFlag,
                                        A = void 0 === M ? 0 : M,
                                        v = m.xAxisRotation;
                                    t +=
                                        'A' +
                                        L +
                                        ',' +
                                        y +
                                        ',' +
                                        (void 0 === v ? 0 : v) +
                                        ',' +
                                        C +
                                        ',' +
                                        A +
                                        ',' +
                                        p +
                                        ',' +
                                        T;
                                    break;
                                case 'cubic':
                                    var E = c.curve;
                                    t +=
                                        'C' +
                                        E.x1 +
                                        ',' +
                                        E.y1 +
                                        ',' +
                                        E.x2 +
                                        ',' +
                                        E.y2 +
                                        ',' +
                                        p +
                                        ',' +
                                        T;
                                    break;
                                case 'quadratic':
                                    var _ = c.curve;
                                    t +=
                                        'Q' +
                                        _.x1 +
                                        ',' +
                                        _.y1 +
                                        ',' +
                                        p +
                                        ',' +
                                        T;
                            }
                            g && p === n.x && T === n.y && (t += 'Z');
                        } else
                            g && p === n.x && T === n.y
                                ? (t += 'Z')
                                : p !== Q.x && T !== Q.y
                                  ? (t += 'L' + p + ',' + T)
                                  : p !== Q.x
                                    ? (t += 'H' + p)
                                    : T !== Q.y && (t += 'V' + T);
                        i++;
                    }
                } catch (e) {
                    ((o = !0), (a = e));
                } finally {
                    try {
                        !r && l.return && l.return();
                    } finally {
                        if (o) throw a;
                    }
                }
                return t;
            },
            M = function (e) {
                var t = Array.isArray(e),
                    i = t ? Array.isArray(e[0]) : 'g' === e.type,
                    n = t
                        ? e
                        : i
                          ? e.shapes.map(function (e) {
                                return L(e);
                            })
                          : L(e);
                return i
                    ? n.map(function (e) {
                          return y(e);
                      })
                    : y(n);
            },
            A =
                'function' == typeof Symbol &&
                'symbol' == typeof Symbol.iterator
                    ? function (e) {
                          return typeof e;
                      }
                    : function (e) {
                          return e &&
                              'function' == typeof Symbol &&
                              e.constructor === Symbol &&
                              e !== Symbol.prototype
                              ? 'symbol'
                              : typeof e;
                      },
            v = function e(t) {
                var i = E(t),
                    n = [];
                if (
                    (i.map(function (e) {
                        var i = e.match,
                            r = e.prop,
                            o = e.required,
                            a = e.type;
                        void 0 === t[r]
                            ? o &&
                              n.push(
                                  r +
                                      ' prop is required' +
                                      ('type' === r ? '' : ' on a ' + t.type)
                              )
                            : (void 0 !== a &&
                                  ('array' === a
                                      ? Array.isArray(t[r]) ||
                                        n.push(
                                            r + ' prop must be of type array'
                                        )
                                      : A(t[r]) !== a &&
                                        n.push(
                                            r + ' prop must be of type ' + a
                                        )),
                              Array.isArray(i) &&
                                  -1 === i.indexOf(t[r]) &&
                                  n.push(
                                      r + ' prop must be one of ' + i.join(', ')
                                  ));
                    }),
                    'g' === t.type && Array.isArray(t.shapes))
                ) {
                    var r = t.shapes.map(function (t) {
                        return e(t);
                    });
                    return [].concat.apply(n, r);
                }
                return n;
            },
            E = function (e) {
                var t = [
                    {
                        match: [
                            'circle',
                            'ellipse',
                            'line',
                            'path',
                            'polygon',
                            'polyline',
                            'rect',
                            'g',
                        ],
                        prop: 'type',
                        required: !0,
                        type: 'string',
                    },
                ];
                switch (e.type) {
                    case 'circle':
                        (t.push({
                            prop: 'cx',
                            required: !0,
                            type: 'number',
                        }),
                            t.push({
                                prop: 'cy',
                                required: !0,
                                type: 'number',
                            }),
                            t.push({
                                prop: 'r',
                                required: !0,
                                type: 'number',
                            }));
                        break;
                    case 'ellipse':
                        (t.push({
                            prop: 'cx',
                            required: !0,
                            type: 'number',
                        }),
                            t.push({
                                prop: 'cy',
                                required: !0,
                                type: 'number',
                            }),
                            t.push({
                                prop: 'rx',
                                required: !0,
                                type: 'number',
                            }),
                            t.push({
                                prop: 'ry',
                                required: !0,
                                type: 'number',
                            }));
                        break;
                    case 'line':
                        (t.push({
                            prop: 'x1',
                            required: !0,
                            type: 'number',
                        }),
                            t.push({
                                prop: 'x2',
                                required: !0,
                                type: 'number',
                            }),
                            t.push({
                                prop: 'y1',
                                required: !0,
                                type: 'number',
                            }),
                            t.push({
                                prop: 'y2',
                                required: !0,
                                type: 'number',
                            }));
                        break;
                    case 'path':
                        t.push({ prop: 'd', required: !0, type: 'string' });
                        break;
                    case 'polygon':
                    case 'polyline':
                        t.push({
                            prop: 'points',
                            required: !0,
                            type: 'string',
                        });
                        break;
                    case 'rect':
                        (t.push({
                            prop: 'height',
                            required: !0,
                            type: 'number',
                        }),
                            t.push({ prop: 'rx', type: 'number' }),
                            t.push({ prop: 'ry', type: 'number' }),
                            t.push({
                                prop: 'width',
                                required: !0,
                                type: 'number',
                            }),
                            t.push({
                                prop: 'x',
                                required: !0,
                                type: 'number',
                            }),
                            t.push({
                                prop: 'y',
                                required: !0,
                                type: 'number',
                            }));
                        break;
                    case 'g':
                        t.push({
                            prop: 'shapes',
                            required: !0,
                            type: 'array',
                        });
                }
                return t;
            },
            _ = function (e) {
                var t = v(e);
                return { errors: t, valid: 0 === t.length };
            };
    },
};
