export default [
    function (e, t, i) {
        'use strict';
        (i.d(t, 'a', function () {
            return ae;
        }),
            i.d(t, 'c', function () {
                return se;
            }),
            i.d(t, 'b', function () {
                return le;
            }));
        var n = i(66);
        n.a.defaults.attrs.stroke = 'none';
        const r = n.a.Text;
        n.a.Text = n.a.invent({
            inherit: r,
            create: function () {
                (r.apply(this, arguments),
                    this.style('user-select', 'none'),
                    this.style('cursor', 'default'),
                    this.style('webkit-user-select', 'none'),
                    this.style('moz-user-select', 'none'));
            },
        });
        var o = /^\s+/,
            a = /\s+$/,
            s = 0,
            l = Math.round,
            c = Math.min,
            d = Math.max,
            f = Math.random;
        function h(e, t) {
            if (((t = t || {}), (e = e || '') instanceof h)) return e;
            if (!(this instanceof h)) return new h(e, t);
            var i = (function (e) {
                var t = { r: 0, g: 0, b: 0 },
                    i = 1,
                    n = null,
                    r = null,
                    s = null,
                    l = !1,
                    f = !1;
                'string' == typeof e &&
                    (e = (function (e) {
                        e = e.replace(o, '').replace(a, '').toLowerCase();
                        var t,
                            i = !1;
                        if (x[e]) ((e = x[e]), (i = !0));
                        else if ('transparent' == e)
                            return {
                                r: 0,
                                g: 0,
                                b: 0,
                                a: 0,
                                format: 'name',
                            };
                        if ((t = G.rgb.exec(e)))
                            return { r: t[1], g: t[2], b: t[3] };
                        if ((t = G.rgba.exec(e)))
                            return {
                                r: t[1],
                                g: t[2],
                                b: t[3],
                                a: t[4],
                            };
                        if ((t = G.hsl.exec(e)))
                            return { h: t[1], s: t[2], l: t[3] };
                        if ((t = G.hsla.exec(e)))
                            return {
                                h: t[1],
                                s: t[2],
                                l: t[3],
                                a: t[4],
                            };
                        if ((t = G.hsv.exec(e)))
                            return { h: t[1], s: t[2], v: t[3] };
                        if ((t = G.hsva.exec(e)))
                            return {
                                h: t[1],
                                s: t[2],
                                v: t[3],
                                a: t[4],
                            };
                        if ((t = G.hex8.exec(e)))
                            return {
                                r: P(t[1]),
                                g: P(t[2]),
                                b: P(t[3]),
                                a: k(t[4]),
                                format: i ? 'name' : 'hex8',
                            };
                        if ((t = G.hex6.exec(e)))
                            return {
                                r: P(t[1]),
                                g: P(t[2]),
                                b: P(t[3]),
                                format: i ? 'name' : 'hex',
                            };
                        if ((t = G.hex4.exec(e)))
                            return {
                                r: P(t[1] + '' + t[1]),
                                g: P(t[2] + '' + t[2]),
                                b: P(t[3] + '' + t[3]),
                                a: k(t[4] + '' + t[4]),
                                format: i ? 'name' : 'hex8',
                            };
                        if ((t = G.hex3.exec(e)))
                            return {
                                r: P(t[1] + '' + t[1]),
                                g: P(t[2] + '' + t[2]),
                                b: P(t[3] + '' + t[3]),
                                format: i ? 'name' : 'hex',
                            };
                        return !1;
                    })(e));
                'object' == typeof e &&
                    (U(e.r) && U(e.g) && U(e.b)
                        ? ((h = e.r),
                          (p = e.g),
                          (T = e.b),
                          (t = {
                              r: 255 * N(h, 255),
                              g: 255 * N(p, 255),
                              b: 255 * N(T, 255),
                          }),
                          (l = !0),
                          (f = '%' === String(e.r).substr(-1) ? 'prgb' : 'rgb'))
                        : U(e.h) && U(e.s) && U(e.v)
                          ? ((n = D(e.s)),
                            (r = D(e.v)),
                            (t = (function (e, t, i) {
                                ((e = 6 * N(e, 360)),
                                    (t = N(t, 100)),
                                    (i = N(i, 100)));
                                var n = Math.floor(e),
                                    r = e - n,
                                    o = i * (1 - t),
                                    a = i * (1 - r * t),
                                    s = i * (1 - (1 - r) * t),
                                    l = n % 6,
                                    c = [i, a, o, o, s, i][l],
                                    d = [s, i, i, a, o, o][l],
                                    f = [o, o, s, i, i, a][l];
                                return {
                                    r: 255 * c,
                                    g: 255 * d,
                                    b: 255 * f,
                                };
                            })(e.h, n, r)),
                            (l = !0),
                            (f = 'hsv'))
                          : U(e.h) &&
                            U(e.s) &&
                            U(e.l) &&
                            ((n = D(e.s)),
                            (s = D(e.l)),
                            (t = (function (e, t, i) {
                                var n, r, o;
                                function a(e, t, i) {
                                    return (
                                        i < 0 && (i += 1),
                                        i > 1 && (i -= 1),
                                        i < 1 / 6
                                            ? e + 6 * (t - e) * i
                                            : i < 0.5
                                              ? t
                                              : i < 2 / 3
                                                ? e + (t - e) * (2 / 3 - i) * 6
                                                : e
                                    );
                                }
                                if (
                                    ((e = N(e, 360)),
                                    (t = N(t, 100)),
                                    (i = N(i, 100)),
                                    0 === t)
                                )
                                    n = r = o = i;
                                else {
                                    var s =
                                            i < 0.5
                                                ? i * (1 + t)
                                                : i + t - i * t,
                                        l = 2 * i - s;
                                    ((n = a(l, s, e + 1 / 3)),
                                        (r = a(l, s, e)),
                                        (o = a(l, s, e - 1 / 3)));
                                }
                                return {
                                    r: 255 * n,
                                    g: 255 * r,
                                    b: 255 * o,
                                };
                            })(e.h, n, s)),
                            (l = !0),
                            (f = 'hsl')),
                    e.hasOwnProperty('a') && (i = e.a));
                var h, p, T;
                return (
                    (i = I(i)),
                    {
                        ok: l,
                        format: e.format || f,
                        r: c(255, d(t.r, 0)),
                        g: c(255, d(t.g, 0)),
                        b: c(255, d(t.b, 0)),
                        a: i,
                    }
                );
            })(e);
            ((this._originalInput = e),
                (this._r = i.r),
                (this._g = i.g),
                (this._b = i.b),
                (this._a = i.a),
                (this._roundA = l(100 * this._a) / 100),
                (this._format = t.format || i.format),
                (this._gradientType = t.gradientType),
                this._r < 1 && (this._r = l(this._r)),
                this._g < 1 && (this._g = l(this._g)),
                this._b < 1 && (this._b = l(this._b)),
                (this._ok = i.ok),
                (this._tc_id = s++));
        }
        function p(e, t, i) {
            ((e = N(e, 255)), (t = N(t, 255)), (i = N(i, 255)));
            var n,
                r,
                o = d(e, t, i),
                a = c(e, t, i),
                s = (o + a) / 2;
            if (o == a) n = r = 0;
            else {
                var l = o - a;
                switch (((r = s > 0.5 ? l / (2 - o - a) : l / (o + a)), o)) {
                    case e:
                        n = (t - i) / l + (t < i ? 6 : 0);
                        break;
                    case t:
                        n = (i - e) / l + 2;
                        break;
                    case i:
                        n = (e - t) / l + 4;
                }
                n /= 6;
            }
            return { h: n, s: r, l: s };
        }
        function T(e, t, i) {
            ((e = N(e, 255)), (t = N(t, 255)), (i = N(i, 255)));
            var n,
                r,
                o = d(e, t, i),
                a = c(e, t, i),
                s = o,
                l = o - a;
            if (((r = 0 === o ? 0 : l / o), o == a)) n = 0;
            else {
                switch (o) {
                    case e:
                        n = (t - i) / l + (t < i ? 6 : 0);
                        break;
                    case t:
                        n = (i - e) / l + 2;
                        break;
                    case i:
                        n = (e - t) / l + 4;
                }
                n /= 6;
            }
            return { h: n, s: r, v: s };
        }
        function u(e, t, i, n) {
            var r = [
                H(l(e).toString(16)),
                H(l(t).toString(16)),
                H(l(i).toString(16)),
            ];
            return n &&
                r[0].charAt(0) == r[0].charAt(1) &&
                r[1].charAt(0) == r[1].charAt(1) &&
                r[2].charAt(0) == r[2].charAt(1)
                ? r[0].charAt(0) + r[1].charAt(0) + r[2].charAt(0)
                : r.join('');
        }
        function g(e, t, i, n) {
            return [
                H(F(n)),
                H(l(e).toString(16)),
                H(l(t).toString(16)),
                H(l(i).toString(16)),
            ].join('');
        }
        function Q(e, t) {
            t = 0 === t ? 0 : t || 10;
            var i = h(e).toHsl();
            return ((i.s -= t / 100), (i.s = w(i.s)), h(i));
        }
        function m(e, t) {
            t = 0 === t ? 0 : t || 10;
            var i = h(e).toHsl();
            return ((i.s += t / 100), (i.s = w(i.s)), h(i));
        }
        function b(e) {
            return h(e).desaturate(100);
        }
        function C(e, t) {
            t = 0 === t ? 0 : t || 10;
            var i = h(e).toHsl();
            return ((i.l += t / 100), (i.l = w(i.l)), h(i));
        }
        function L(e, t) {
            t = 0 === t ? 0 : t || 10;
            var i = h(e).toRgb();
            return (
                (i.r = d(0, c(255, i.r - l((-t / 100) * 255)))),
                (i.g = d(0, c(255, i.g - l((-t / 100) * 255)))),
                (i.b = d(0, c(255, i.b - l((-t / 100) * 255)))),
                h(i)
            );
        }
        function y(e, t) {
            t = 0 === t ? 0 : t || 10;
            var i = h(e).toHsl();
            return ((i.l -= t / 100), (i.l = w(i.l)), h(i));
        }
        function M(e, t) {
            var i = h(e).toHsl(),
                n = (i.h + t) % 360;
            return ((i.h = n < 0 ? 360 + n : n), h(i));
        }
        function A(e) {
            var t = h(e).toHsl();
            return ((t.h = (t.h + 180) % 360), h(t));
        }
        function v(e) {
            var t = h(e).toHsl(),
                i = t.h;
            return [
                h(e),
                h({ h: (i + 120) % 360, s: t.s, l: t.l }),
                h({ h: (i + 240) % 360, s: t.s, l: t.l }),
            ];
        }
        function E(e) {
            var t = h(e).toHsl(),
                i = t.h;
            return [
                h(e),
                h({ h: (i + 90) % 360, s: t.s, l: t.l }),
                h({ h: (i + 180) % 360, s: t.s, l: t.l }),
                h({ h: (i + 270) % 360, s: t.s, l: t.l }),
            ];
        }
        function _(e) {
            var t = h(e).toHsl(),
                i = t.h;
            return [
                h(e),
                h({ h: (i + 72) % 360, s: t.s, l: t.l }),
                h({ h: (i + 216) % 360, s: t.s, l: t.l }),
            ];
        }
        function O(e, t, i) {
            ((t = t || 6), (i = i || 30));
            var n = h(e).toHsl(),
                r = 360 / i,
                o = [h(e)];
            for (n.h = (n.h - ((r * t) >> 1) + 720) % 360; --t; )
                ((n.h = (n.h + r) % 360), o.push(h(n)));
            return o;
        }
        function S(e, t) {
            t = t || 6;
            for (
                var i = h(e).toHsv(),
                    n = i.h,
                    r = i.s,
                    o = i.v,
                    a = [],
                    s = 1 / t;
                t--;
            )
                (a.push(h({ h: n, s: r, v: o })), (o = (o + s) % 1));
            return a;
        }
        ((h.prototype = {
            isDark: function () {
                return this.getBrightness() < 128;
            },
            isLight: function () {
                return !this.isDark();
            },
            isValid: function () {
                return this._ok;
            },
            getOriginalInput: function () {
                return this._originalInput;
            },
            getFormat: function () {
                return this._format;
            },
            getAlpha: function () {
                return this._a;
            },
            getBrightness: function () {
                var e = this.toRgb();
                return (299 * e.r + 587 * e.g + 114 * e.b) / 1e3;
            },
            getLuminance: function () {
                var e,
                    t,
                    i,
                    n = this.toRgb();
                return (
                    (e = n.r / 255),
                    (t = n.g / 255),
                    (i = n.b / 255),
                    0.2126 *
                        (e <= 0.03928
                            ? e / 12.92
                            : Math.pow((e + 0.055) / 1.055, 2.4)) +
                        0.7152 *
                            (t <= 0.03928
                                ? t / 12.92
                                : Math.pow((t + 0.055) / 1.055, 2.4)) +
                        0.0722 *
                            (i <= 0.03928
                                ? i / 12.92
                                : Math.pow((i + 0.055) / 1.055, 2.4))
                );
            },
            setAlpha: function (e) {
                return (
                    (this._a = I(e)),
                    (this._roundA = l(100 * this._a) / 100),
                    this
                );
            },
            toHsv: function () {
                var e = T(this._r, this._g, this._b);
                return { h: 360 * e.h, s: e.s, v: e.v, a: this._a };
            },
            toHsvString: function () {
                var e = T(this._r, this._g, this._b),
                    t = l(360 * e.h),
                    i = l(100 * e.s),
                    n = l(100 * e.v);
                return 1 == this._a
                    ? 'hsv(' + t + ', ' + i + '%, ' + n + '%)'
                    : 'hsva(' +
                          t +
                          ', ' +
                          i +
                          '%, ' +
                          n +
                          '%, ' +
                          this._roundA +
                          ')';
            },
            toHsl: function () {
                var e = p(this._r, this._g, this._b);
                return { h: 360 * e.h, s: e.s, l: e.l, a: this._a };
            },
            toHslString: function () {
                var e = p(this._r, this._g, this._b),
                    t = l(360 * e.h),
                    i = l(100 * e.s),
                    n = l(100 * e.l);
                return 1 == this._a
                    ? 'hsl(' + t + ', ' + i + '%, ' + n + '%)'
                    : 'hsla(' +
                          t +
                          ', ' +
                          i +
                          '%, ' +
                          n +
                          '%, ' +
                          this._roundA +
                          ')';
            },
            toHex: function (e) {
                return u(this._r, this._g, this._b, e);
            },
            toHexString: function (e) {
                return '#' + this.toHex(e);
            },
            toHex8: function (e) {
                return (function (e, t, i, n, r) {
                    var o = [
                        H(l(e).toString(16)),
                        H(l(t).toString(16)),
                        H(l(i).toString(16)),
                        H(F(n)),
                    ];
                    if (
                        r &&
                        o[0].charAt(0) == o[0].charAt(1) &&
                        o[1].charAt(0) == o[1].charAt(1) &&
                        o[2].charAt(0) == o[2].charAt(1) &&
                        o[3].charAt(0) == o[3].charAt(1)
                    )
                        return (
                            o[0].charAt(0) +
                            o[1].charAt(0) +
                            o[2].charAt(0) +
                            o[3].charAt(0)
                        );
                    return o.join('');
                })(this._r, this._g, this._b, this._a, e);
            },
            toHex8String: function (e) {
                return '#' + this.toHex8(e);
            },
            toRgb: function () {
                return {
                    r: l(this._r),
                    g: l(this._g),
                    b: l(this._b),
                    a: this._a,
                };
            },
            toRgbString: function () {
                return 1 == this._a
                    ? 'rgb(' +
                          l(this._r) +
                          ', ' +
                          l(this._g) +
                          ', ' +
                          l(this._b) +
                          ')'
                    : 'rgba(' +
                          l(this._r) +
                          ', ' +
                          l(this._g) +
                          ', ' +
                          l(this._b) +
                          ', ' +
                          this._roundA +
                          ')';
            },
            toPercentageRgb: function () {
                return {
                    r: l(100 * N(this._r, 255)) + '%',
                    g: l(100 * N(this._g, 255)) + '%',
                    b: l(100 * N(this._b, 255)) + '%',
                    a: this._a,
                };
            },
            toPercentageRgbString: function () {
                return 1 == this._a
                    ? 'rgb(' +
                          l(100 * N(this._r, 255)) +
                          '%, ' +
                          l(100 * N(this._g, 255)) +
                          '%, ' +
                          l(100 * N(this._b, 255)) +
                          '%)'
                    : 'rgba(' +
                          l(100 * N(this._r, 255)) +
                          '%, ' +
                          l(100 * N(this._g, 255)) +
                          '%, ' +
                          l(100 * N(this._b, 255)) +
                          '%, ' +
                          this._roundA +
                          ')';
            },
            toName: function () {
                return 0 === this._a
                    ? 'transparent'
                    : !(this._a < 1) &&
                          (R[u(this._r, this._g, this._b, !0)] || !1);
            },
            toFilter: function (e) {
                var t = '#' + g(this._r, this._g, this._b, this._a),
                    i = t,
                    n = this._gradientType ? 'GradientType = 1, ' : '';
                if (e) {
                    var r = h(e);
                    i = '#' + g(r._r, r._g, r._b, r._a);
                }
                return (
                    'progid:DXImageTransform.Microsoft.gradient(' +
                    n +
                    'startColorstr=' +
                    t +
                    ',endColorstr=' +
                    i +
                    ')'
                );
            },
            toString: function (e) {
                var t = !!e;
                e = e || this._format;
                var i = !1,
                    n = this._a < 1 && this._a >= 0;
                return t ||
                    !n ||
                    ('hex' !== e &&
                        'hex6' !== e &&
                        'hex3' !== e &&
                        'hex4' !== e &&
                        'hex8' !== e &&
                        'name' !== e)
                    ? ('rgb' === e && (i = this.toRgbString()),
                      'prgb' === e && (i = this.toPercentageRgbString()),
                      ('hex' !== e && 'hex6' !== e) || (i = this.toHexString()),
                      'hex3' === e && (i = this.toHexString(!0)),
                      'hex4' === e && (i = this.toHex8String(!0)),
                      'hex8' === e && (i = this.toHex8String()),
                      'name' === e && (i = this.toName()),
                      'hsl' === e && (i = this.toHslString()),
                      'hsv' === e && (i = this.toHsvString()),
                      i || this.toHexString())
                    : 'name' === e && 0 === this._a
                      ? this.toName()
                      : this.toRgbString();
            },
            clone: function () {
                return h(this.toString());
            },
            _applyModification: function (e, t) {
                var i = e.apply(null, [this].concat([].slice.call(t)));
                return (
                    (this._r = i._r),
                    (this._g = i._g),
                    (this._b = i._b),
                    this.setAlpha(i._a),
                    this
                );
            },
            lighten: function () {
                return this._applyModification(C, arguments);
            },
            brighten: function () {
                return this._applyModification(L, arguments);
            },
            darken: function () {
                return this._applyModification(y, arguments);
            },
            desaturate: function () {
                return this._applyModification(Q, arguments);
            },
            saturate: function () {
                return this._applyModification(m, arguments);
            },
            greyscale: function () {
                return this._applyModification(b, arguments);
            },
            spin: function () {
                return this._applyModification(M, arguments);
            },
            _applyCombination: function (e, t) {
                return e.apply(null, [this].concat([].slice.call(t)));
            },
            analogous: function () {
                return this._applyCombination(O, arguments);
            },
            complement: function () {
                return this._applyCombination(A, arguments);
            },
            monochromatic: function () {
                return this._applyCombination(S, arguments);
            },
            splitcomplement: function () {
                return this._applyCombination(_, arguments);
            },
            triad: function () {
                return this._applyCombination(v, arguments);
            },
            tetrad: function () {
                return this._applyCombination(E, arguments);
            },
        }),
            (h.fromRatio = function (e, t) {
                if ('object' == typeof e) {
                    var i = {};
                    for (var n in e)
                        e.hasOwnProperty(n) &&
                            (i[n] = 'a' === n ? e[n] : D(e[n]));
                    e = i;
                }
                return h(e, t);
            }),
            (h.equals = function (e, t) {
                return !(!e || !t) && h(e).toRgbString() == h(t).toRgbString();
            }),
            (h.random = function () {
                return h.fromRatio({ r: f(), g: f(), b: f() });
            }),
            (h.mix = function (e, t, i) {
                i = 0 === i ? 0 : i || 50;
                var n = h(e).toRgb(),
                    r = h(t).toRgb(),
                    o = i / 100;
                return h({
                    r: (r.r - n.r) * o + n.r,
                    g: (r.g - n.g) * o + n.g,
                    b: (r.b - n.b) * o + n.b,
                    a: (r.a - n.a) * o + n.a,
                });
            }),
            (h.readability = function (e, t) {
                var i = h(e),
                    n = h(t);
                return (
                    (Math.max(i.getLuminance(), n.getLuminance()) + 0.05) /
                    (Math.min(i.getLuminance(), n.getLuminance()) + 0.05)
                );
            }),
            (h.isReadable = function (e, t, i) {
                var n,
                    r,
                    o = h.readability(e, t);
                switch (
                    ((r = !1),
                    (n = (function (e) {
                        var t, i;
                        ((t = (
                            (e = e || {
                                level: 'AA',
                                size: 'small',
                            }).level || 'AA'
                        ).toUpperCase()),
                            (i = (e.size || 'small').toLowerCase()),
                            'AA' !== t && 'AAA' !== t && (t = 'AA'));
                        'small' !== i && 'large' !== i && (i = 'small');
                        return { level: t, size: i };
                    })(i)).level + n.size)
                ) {
                    case 'AAsmall':
                    case 'AAAlarge':
                        r = o >= 4.5;
                        break;
                    case 'AAlarge':
                        r = o >= 3;
                        break;
                    case 'AAAsmall':
                        r = o >= 7;
                }
                return r;
            }),
            (h.mostReadable = function (e, t, i) {
                var n,
                    r,
                    o,
                    a,
                    s = null,
                    l = 0;
                ((r = (i = i || {}).includeFallbackColors),
                    (o = i.level),
                    (a = i.size));
                for (var c = 0; c < t.length; c++)
                    (n = h.readability(e, t[c])) > l &&
                        ((l = n), (s = h(t[c])));
                return h.isReadable(e, s, { level: o, size: a }) || !r
                    ? s
                    : ((i.includeFallbackColors = !1),
                      h.mostReadable(e, ['#fff', '#000'], i));
            }));
        var x = (h.names = {
                aliceblue: 'f0f8ff',
                antiquewhite: 'faebd7',
                aqua: '0ff',
                aquamarine: '7fffd4',
                azure: 'f0ffff',
                beige: 'f5f5dc',
                bisque: 'ffe4c4',
                black: '000',
                blanchedalmond: 'ffebcd',
                blue: '00f',
                blueviolet: '8a2be2',
                brown: 'a52a2a',
                burlywood: 'deb887',
                burntsienna: 'ea7e5d',
                cadetblue: '5f9ea0',
                chartreuse: '7fff00',
                chocolate: 'd2691e',
                coral: 'ff7f50',
                cornflowerblue: '6495ed',
                cornsilk: 'fff8dc',
                crimson: 'dc143c',
                cyan: '0ff',
                darkblue: '00008b',
                darkcyan: '008b8b',
                darkgoldenrod: 'b8860b',
                darkgray: 'a9a9a9',
                darkgreen: '006400',
                darkgrey: 'a9a9a9',
                darkkhaki: 'bdb76b',
                darkmagenta: '8b008b',
                darkolivegreen: '556b2f',
                darkorange: 'ff8c00',
                darkorchid: '9932cc',
                darkred: '8b0000',
                darksalmon: 'e9967a',
                darkseagreen: '8fbc8f',
                darkslateblue: '483d8b',
                darkslategray: '2f4f4f',
                darkslategrey: '2f4f4f',
                darkturquoise: '00ced1',
                darkviolet: '9400d3',
                deeppink: 'ff1493',
                deepskyblue: '00bfff',
                dimgray: '696969',
                dimgrey: '696969',
                dodgerblue: '1e90ff',
                firebrick: 'b22222',
                floralwhite: 'fffaf0',
                forestgreen: '228b22',
                fuchsia: 'f0f',
                gainsboro: 'dcdcdc',
                ghostwhite: 'f8f8ff',
                gold: 'ffd700',
                goldenrod: 'daa520',
                gray: '808080',
                green: '008000',
                greenyellow: 'adff2f',
                grey: '808080',
                honeydew: 'f0fff0',
                hotpink: 'ff69b4',
                indianred: 'cd5c5c',
                indigo: '4b0082',
                ivory: 'fffff0',
                khaki: 'f0e68c',
                lavender: 'e6e6fa',
                lavenderblush: 'fff0f5',
                lawngreen: '7cfc00',
                lemonchiffon: 'fffacd',
                lightblue: 'add8e6',
                lightcoral: 'f08080',
                lightcyan: 'e0ffff',
                lightgoldenrodyellow: 'fafad2',
                lightgray: 'd3d3d3',
                lightgreen: '90ee90',
                lightgrey: 'd3d3d3',
                lightpink: 'ffb6c1',
                lightsalmon: 'ffa07a',
                lightseagreen: '20b2aa',
                lightskyblue: '87cefa',
                lightslategray: '789',
                lightslategrey: '789',
                lightsteelblue: 'b0c4de',
                lightyellow: 'ffffe0',
                lime: '0f0',
                limegreen: '32cd32',
                linen: 'faf0e6',
                magenta: 'f0f',
                maroon: '800000',
                mediumaquamarine: '66cdaa',
                mediumblue: '0000cd',
                mediumorchid: 'ba55d3',
                mediumpurple: '9370db',
                mediumseagreen: '3cb371',
                mediumslateblue: '7b68ee',
                mediumspringgreen: '00fa9a',
                mediumturquoise: '48d1cc',
                mediumvioletred: 'c71585',
                midnightblue: '191970',
                mintcream: 'f5fffa',
                mistyrose: 'ffe4e1',
                moccasin: 'ffe4b5',
                navajowhite: 'ffdead',
                navy: '000080',
                oldlace: 'fdf5e6',
                olive: '808000',
                olivedrab: '6b8e23',
                orange: 'ffa500',
                orangered: 'ff4500',
                orchid: 'da70d6',
                palegoldenrod: 'eee8aa',
                palegreen: '98fb98',
                paleturquoise: 'afeeee',
                palevioletred: 'db7093',
                papayawhip: 'ffefd5',
                peachpuff: 'ffdab9',
                peru: 'cd853f',
                pink: 'ffc0cb',
                plum: 'dda0dd',
                powderblue: 'b0e0e6',
                purple: '800080',
                rebeccapurple: '663399',
                red: 'f00',
                rosybrown: 'bc8f8f',
                royalblue: '4169e1',
                saddlebrown: '8b4513',
                salmon: 'fa8072',
                sandybrown: 'f4a460',
                seagreen: '2e8b57',
                seashell: 'fff5ee',
                sienna: 'a0522d',
                silver: 'c0c0c0',
                skyblue: '87ceeb',
                slateblue: '6a5acd',
                slategray: '708090',
                slategrey: '708090',
                snow: 'fffafa',
                springgreen: '00ff7f',
                steelblue: '4682b4',
                tan: 'd2b48c',
                teal: '008080',
                thistle: 'd8bfd8',
                tomato: 'ff6347',
                turquoise: '40e0d0',
                violet: 'ee82ee',
                wheat: 'f5deb3',
                white: 'fff',
                whitesmoke: 'f5f5f5',
                yellow: 'ff0',
                yellowgreen: '9acd32',
            }),
            R = (h.hexNames = (function (e) {
                var t = {};
                for (var i in e) e.hasOwnProperty(i) && (t[e[i]] = i);
                return t;
            })(x));
        function I(e) {
            return (
                (e = parseFloat(e)),
                (isNaN(e) || e < 0 || e > 1) && (e = 1),
                e
            );
        }
        function N(e, t) {
            (function (e) {
                return (
                    'string' == typeof e &&
                    -1 != e.indexOf('.') &&
                    1 === parseFloat(e)
                );
            })(e) && (e = '100%');
            var i = (function (e) {
                return 'string' == typeof e && -1 != e.indexOf('%');
            })(e);
            return (
                (e = c(t, d(0, parseFloat(e)))),
                i && (e = parseInt(e * t, 10) / 100),
                Math.abs(e - t) < 1e-6 ? 1 : (e % t) / parseFloat(t)
            );
        }
        function w(e) {
            return c(1, d(0, e));
        }
        function P(e) {
            return parseInt(e, 16);
        }
        function H(e) {
            return 1 == e.length ? '0' + e : '' + e;
        }
        function D(e) {
            return (e <= 1 && (e = 100 * e + '%'), e);
        }
        function F(e) {
            return Math.round(255 * parseFloat(e)).toString(16);
        }
        function k(e) {
            return P(e) / 255;
        }
        var B,
            V,
            Y,
            G =
                ((V =
                    '[\\s|\\(]+(' +
                    (B = '(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)') +
                    ')[,|\\s]+(' +
                    B +
                    ')[,|\\s]+(' +
                    B +
                    ')\\s*\\)?'),
                (Y =
                    '[\\s|\\(]+(' +
                    B +
                    ')[,|\\s]+(' +
                    B +
                    ')[,|\\s]+(' +
                    B +
                    ')[,|\\s]+(' +
                    B +
                    ')\\s*\\)?'),
                {
                    CSS_UNIT: new RegExp(B),
                    rgb: new RegExp('rgb' + V),
                    rgba: new RegExp('rgba' + Y),
                    hsl: new RegExp('hsl' + V),
                    hsla: new RegExp('hsla' + Y),
                    hsv: new RegExp('hsv' + V),
                    hsva: new RegExp('hsva' + Y),
                    hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
                    hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
                    hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
                    hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
                });
        function U(e) {
            return !!G.CSS_UNIT.exec(e);
        }
        var j = h,
            $ = i(0),
            z = i(16),
            W = i(84);
        var K = new (class {
            hasFontFaceGenerator() {
                return !!z.b.get($.CONFIG.FONT_FACE_GENERATOR);
            }
            async getFontFaces(e) {
                const t = W.a[e];
                if (t) return [t];
                const i = z.b.get($.CONFIG.FONT_FACE_GENERATOR);
                return i ? i(e) : [];
            }
        })();
        const Z =
            '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd" [ <!ENTITY quot "&#34;">  <!ENTITY amp "&#38;">  <!ENTITY apos "&#39;">  <!ENTITY lt "&#60;">  <!ENTITY gt "&#62;">  <!ENTITY nbsp "&#160;">  <!ENTITY iexcl "&#161;">  <!ENTITY cent "&#162;">  <!ENTITY pound "&#163;">  <!ENTITY curren "&#164;">  <!ENTITY yen "&#165;">  <!ENTITY brvbar "&#166;">  <!ENTITY sect "&#167;">  <!ENTITY uml "&#168;">  <!ENTITY copy "&#169;">  <!ENTITY ordf "&#170;">  <!ENTITY laquo "&#171;">  <!ENTITY not "&#172;">  <!ENTITY shy "&#173;">  <!ENTITY reg "&#174;">  <!ENTITY macr "&#175;">  <!ENTITY deg "&#176;">  <!ENTITY plusmn "&#177;">  <!ENTITY sup2 "&#178;">  <!ENTITY sup3 "&#179;">  <!ENTITY acute "&#180;">  <!ENTITY micro "&#181;">  <!ENTITY para "&#182;">  <!ENTITY middot "&#183;">  <!ENTITY cedil "&#184;">  <!ENTITY sup1 "&#185;">  <!ENTITY ordm "&#186;">  <!ENTITY raquo "&#187;">  <!ENTITY frac14 "&#188;">  <!ENTITY frac12 "&#189;">  <!ENTITY frac34 "&#190;">  <!ENTITY iquest "&#191;">  <!ENTITY Agrave "&#192;">  <!ENTITY Aacute "&#193;">  <!ENTITY Acirc "&#194;">  <!ENTITY Atilde "&#195;">  <!ENTITY Auml "&#196;">  <!ENTITY Aring "&#197;">  <!ENTITY AElig "&#198;">  <!ENTITY Ccedil "&#199;">  <!ENTITY Egrave "&#200;">  <!ENTITY Eacute "&#201;">  <!ENTITY Ecirc "&#202;">  <!ENTITY Euml "&#203;">  <!ENTITY Igrave "&#204;">  <!ENTITY Iacute "&#205;">  <!ENTITY Icirc "&#206;">  <!ENTITY Iuml "&#207;">  <!ENTITY ETH "&#208;">  <!ENTITY Ntilde "&#209;">  <!ENTITY Ograve "&#210;">  <!ENTITY Oacute "&#211;">  <!ENTITY Ocirc "&#212;">  <!ENTITY Otilde "&#213;">  <!ENTITY Ouml "&#214;">  <!ENTITY times "&#215;">  <!ENTITY Oslash "&#216;">  <!ENTITY Ugrave "&#217;">  <!ENTITY Uacute "&#218;">  <!ENTITY Ucirc "&#219;">  <!ENTITY Uuml "&#220;">  <!ENTITY Yacute "&#221;">  <!ENTITY THORN "&#222;">  <!ENTITY szlig "&#223;">  <!ENTITY agrave "&#224;">  <!ENTITY aacute "&#225;">  <!ENTITY acirc "&#226;">  <!ENTITY atilde "&#227;">  <!ENTITY auml "&#228;">  <!ENTITY aring "&#229;">  <!ENTITY aelig "&#230;">  <!ENTITY ccedil "&#231;">  <!ENTITY egrave "&#232;">  <!ENTITY eacute "&#233;">  <!ENTITY ecirc "&#234;">  <!ENTITY euml "&#235;">  <!ENTITY igrave "&#236;">  <!ENTITY iacute "&#237;">  <!ENTITY icirc "&#238;">  <!ENTITY iuml "&#239;">  <!ENTITY eth "&#240;">  <!ENTITY ntilde "&#241;">  <!ENTITY ograve "&#242;">  <!ENTITY oacute "&#243;">  <!ENTITY ocirc "&#244;">  <!ENTITY otilde "&#245;">  <!ENTITY ouml "&#246;">  <!ENTITY divide "&#247;">  <!ENTITY oslash "&#248;">  <!ENTITY ugrave "&#249;">  <!ENTITY uacute "&#250;">  <!ENTITY ucirc "&#251;">  <!ENTITY uuml "&#252;">  <!ENTITY yacute "&#253;">  <!ENTITY thorn "&#254;">  <!ENTITY yuml "&#255;">  <!ENTITY OElig "&#338;">  <!ENTITY oelig "&#339;">  <!ENTITY Scaron "&#352;">  <!ENTITY scaron "&#353;">  <!ENTITY Yuml "&#376;">  <!ENTITY fnof "&#402;">  <!ENTITY circ "&#710;">  <!ENTITY tilde "&#732;">  <!ENTITY Alpha "&#913;">  <!ENTITY Beta "&#914;">  <!ENTITY Gamma "&#915;">  <!ENTITY Delta "&#916;">  <!ENTITY Epsilon "&#917;">  <!ENTITY Zeta "&#918;">  <!ENTITY Eta "&#919;">  <!ENTITY Theta "&#920;">  <!ENTITY Iota "&#921;">  <!ENTITY Kappa "&#922;">  <!ENTITY Lambda "&#923;">  <!ENTITY Mu "&#924;">  <!ENTITY Nu "&#925;">  <!ENTITY Xi "&#926;">  <!ENTITY Omicron "&#927;">  <!ENTITY Pi "&#928;">  <!ENTITY Rho "&#929;">  <!ENTITY Sigma "&#931;">  <!ENTITY Tau "&#932;">  <!ENTITY Upsilon "&#933;">  <!ENTITY Phi "&#934;">  <!ENTITY Chi "&#935;">  <!ENTITY Psi "&#936;">  <!ENTITY Omega "&#937;">  <!ENTITY alpha "&#945;">  <!ENTITY beta "&#946;">  <!ENTITY gamma "&#947;">  <!ENTITY delta "&#948;">  <!ENTITY epsilon "&#949;">  <!ENTITY zeta "&#950;">  <!ENTITY eta "&#951;">  <!ENTITY theta "&#952;">  <!ENTITY iota "&#953;">  <!ENTITY kappa "&#954;">  <!ENTITY lambda "&#955;">  <!ENTITY mu "&#956;">  <!ENTITY nu "&#957;">  <!ENTITY xi "&#958;">  <!ENTITY omicron "&#959;">  <!ENTITY pi "&#960;">  <!ENTITY rho "&#961;">  <!ENTITY sigmaf "&#962;">  <!ENTITY sigma "&#963;">  <!ENTITY tau "&#964;">  <!ENTITY upsilon "&#965;">  <!ENTITY phi "&#966;">  <!ENTITY chi "&#967;">  <!ENTITY psi "&#968;">  <!ENTITY omega "&#969;">  <!ENTITY thetasym "&#977;">  <!ENTITY upsih "&#978;">  <!ENTITY piv "&#982;">  <!ENTITY ensp "&#8194;">  <!ENTITY emsp "&#8195;">  <!ENTITY thinsp "&#8201;">  <!ENTITY zwnj "&#8204;">  <!ENTITY zwj "&#8205;">  <!ENTITY lrm "&#8206;">  <!ENTITY rlm "&#8207;">  <!ENTITY ndash "&#8211;">  <!ENTITY mdash "&#8212;">  <!ENTITY lsquo "&#8216;">  <!ENTITY rsquo "&#8217;">  <!ENTITY sbquo "&#8218;">  <!ENTITY ldquo "&#8220;">  <!ENTITY rdquo "&#8221;">  <!ENTITY bdquo "&#8222;">  <!ENTITY dagger "&#8224;">  <!ENTITY Dagger "&#8225;">  <!ENTITY bull "&#8226;">  <!ENTITY hellip "&#8230;">  <!ENTITY permil "&#8240;">  <!ENTITY prime "&#8242;">  <!ENTITY Prime "&#8243;">  <!ENTITY lsaquo "&#8249;">  <!ENTITY rsaquo "&#8250;">  <!ENTITY oline "&#8254;">  <!ENTITY frasl "&#8260;">  <!ENTITY euro "&#8364;">  <!ENTITY image "&#8465;">  <!ENTITY weierp "&#8472;">  <!ENTITY real "&#8476;">  <!ENTITY trade "&#8482;">  <!ENTITY alefsym "&#8501;">  <!ENTITY larr "&#8592;">  <!ENTITY uarr "&#8593;">  <!ENTITY rarr "&#8594;">  <!ENTITY darr "&#8595;">  <!ENTITY harr "&#8596;">  <!ENTITY crarr "&#8629;">  <!ENTITY lArr "&#8656;">  <!ENTITY uArr "&#8657;">  <!ENTITY rArr "&#8658;">  <!ENTITY dArr "&#8659;">  <!ENTITY hArr "&#8660;">  <!ENTITY forall "&#8704;">  <!ENTITY part "&#8706;">  <!ENTITY exist "&#8707;">  <!ENTITY empty "&#8709;">  <!ENTITY nabla "&#8711;">  <!ENTITY isin "&#8712;">  <!ENTITY notin "&#8713;">  <!ENTITY ni "&#8715;">  <!ENTITY prod "&#8719;">  <!ENTITY sum "&#8721;">  <!ENTITY minus "&#8722;">  <!ENTITY lowast "&#8727;">  <!ENTITY radic "&#8730;">  <!ENTITY prop "&#8733;">  <!ENTITY infin "&#8734;">  <!ENTITY ang "&#8736;">  <!ENTITY and "&#8743;">  <!ENTITY or "&#8744;">  <!ENTITY cap "&#8745;">  <!ENTITY cup "&#8746;">  <!ENTITY int "&#8747;">  <!ENTITY there4 "&#8756;">  <!ENTITY sim "&#8764;">  <!ENTITY cong "&#8773;">  <!ENTITY asymp "&#8776;">  <!ENTITY ne "&#8800;">  <!ENTITY equiv "&#8801;">  <!ENTITY le "&#8804;">  <!ENTITY ge "&#8805;">  <!ENTITY sub "&#8834;">  <!ENTITY sup "&#8835;">  <!ENTITY nsub "&#8836;">  <!ENTITY sube "&#8838;">  <!ENTITY supe "&#8839;">  <!ENTITY oplus "&#8853;">  <!ENTITY otimes "&#8855;">  <!ENTITY perp "&#8869;">  <!ENTITY sdot "&#8901;">  <!ENTITY lceil "&#8968;">  <!ENTITY rceil "&#8969;">  <!ENTITY lfloor "&#8970;">  <!ENTITY rfloor "&#8971;">  <!ENTITY lang "&#9001;">  <!ENTITY rang "&#9002;">  <!ENTITY loz "&#9674;">  <!ENTITY spades "&#9824;">  <!ENTITY clubs "&#9827;">  <!ENTITY hearts "&#9829;">  <!ENTITY diams "&#9830;"> ]>';
        const J = {};
        class X {
            constructor(e, t = {}) {
                if (
                    ((this.el = e),
                    !(
                        this.el instanceof HTMLElement ||
                        this.el instanceof SVGElement
                    ))
                )
                    throw new Error(
                        'an HTMLElement or SVGElement is required; got ' +
                            this.el
                    );
                ((t.scale = t.scale || 1), (this.options = t));
            }
            prepareSVGWithDoctype() {
                return this.prepareSVG().then((e) => Z + e);
            }
            prepareSVG() {
                return Promise.all([
                    this._inlineImages(),
                    this._inlineFonts(),
                ]).then(([e, t]) => this._genSvg(t));
            }
            _genSvg(e) {
                const t = document.createElement('div');
                let i,
                    n,
                    r = this.el;
                if ('svg' === this.el.tagName)
                    ((i = this.options.width || ee(this.el, r, 'width')),
                        (n = this.options.height || ee(this.el, r, 'height')));
                else {
                    if (!this.el.getBBox)
                        return void z.b
                            .get($.CONFIG.LOGGER)
                            .error(
                                'Attempted to render non-SVG element',
                                this.el
                            );
                    {
                        let e = this.el.getBBox();
                        ((i = e.x + e.width),
                            (n = e.y + e.height),
                            r.setAttribute(
                                'transform',
                                r
                                    .getAttribute('transform')
                                    .replace(/translate\(.*?\)/, '')
                            ));
                        let t = document.createElementNS(
                            'http://www.w3.org/2000/svg',
                            'svg'
                        );
                        (t.appendChild(r), (r = t));
                    }
                }
                (r.setAttribute('version', '1.1'),
                    r.getAttribute('xmlns') ||
                        r.setAttributeNS(
                            'http://www.w3.org/2000/xmlns/',
                            'xmlns',
                            'http://www.w3.org/2000/svg'
                        ),
                    r.getAttribute('xmlns:xlink') ||
                        r.setAttributeNS(
                            'http://www.w3.org/2000/xmlns/',
                            'xmlns:xlink',
                            'http://www.w3.org/1999/xlink'
                        ),
                    this.options.responsive
                        ? (r.removeAttribute('width'),
                          r.removeAttribute('height'),
                          r.setAttribute(
                              'preserveAspectRatio',
                              'xMinYMin meet'
                          ))
                        : (r.setAttribute('width', i * this.options.scale),
                          r.setAttribute('height', n * this.options.scale)),
                    r.setAttribute(
                        'viewBox',
                        [
                            this.options.left || 0,
                            this.options.top || 0,
                            i,
                            n,
                        ].join(' ')
                    ));
                let o = r.querySelectorAll('foreignObject > *');
                for (let e = 0; e < o.length; e++)
                    o[e].getAttribute('xmlns') ||
                        o[e].setAttributeNS(
                            'http://www.w3.org/2000/xmlns/',
                            'xmlns',
                            'http://www.w3.org/1999/xhtml'
                        );
                t.appendChild(r);
                let a = document.createElement('defs');
                if (e) {
                    let t = document.createElement('style');
                    (t.setAttribute('type', 'text/css'),
                        (t.innerHTML = '<![CDATA[\n' + e + '\n]]>'),
                        a.appendChild(t));
                }
                r.insertBefore(a, r.firstChild);
                let s = t.innerHTML;
                return (
                    (s = s.replace(
                        /NS\d+:href/gi,
                        'xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href'
                    )),
                    (s = s.replace(
                        /[^\u{0009}\u{000a}\u{000d}\u{0020}-\u{D7FF}\u{E000}-\u{FFFD}\u{10000}-\u{10FFFF}]/gu,
                        ' '
                    )),
                    s
                );
            }
            _inlineImages() {
                return new Promise((e) => {
                    let t = this.el.querySelectorAll('image'),
                        i = t.length;
                    0 === i && e(t);
                    let n = () => {
                        (i--, 0 === i && e(t));
                    };
                    t.forEach((e) => {
                        let t =
                                parseInt(e.getAttribute('width')) *
                                    this.options.scale || 0,
                            i =
                                parseInt(e.getAttribute('height')) *
                                    this.options.scale || 0,
                            r =
                                e.getAttributeNS(
                                    'http://www.w3.org/1999/xlink',
                                    'href'
                                ) || e.getAttribute('href');
                        if (!r) return n();
                        if (
                            (o = r) &&
                            0 === o.lastIndexOf('http', 0) &&
                            -1 === o.lastIndexOf(window.location.host)
                        )
                            return n();
                        var o;
                        const a = J[r];
                        if (/^data:/.test(r)) return n();
                        if (/\.svg$/.test(r)) {
                            if (a)
                                return (
                                    e.setAttributeNS(
                                        'http://www.w3.org/1999/xlink',
                                        'href',
                                        a.data
                                    ),
                                    n()
                                );
                            const t = () => {
                                    const t =
                                        'data:image/svg+xml;base64,' +
                                        window.btoa(q(i.responseText));
                                    return (
                                        (J[r] = { data: t }),
                                        e.setAttributeNS(
                                            'http://www.w3.org/1999/xlink',
                                            'href',
                                            t
                                        ),
                                        n()
                                    );
                                },
                                i = new XMLHttpRequest();
                            return (
                                (i.onload = t),
                                (i.onerror = n),
                                (i.onabort = n),
                                i.open('GET', r),
                                void i.send()
                            );
                        }
                        if (a && a.width === t && a.height === i)
                            return (
                                e.setAttributeNS(
                                    'http://www.w3.org/1999/xlink',
                                    'href',
                                    a.data
                                ),
                                n()
                            );
                        const s = document.createElement('canvas'),
                            l = s.getContext('2d'),
                            c = new Image();
                        ((c.crossOrigin = 'anonymous'),
                            (c.src = r),
                            (c.onload = function () {
                                let { width: o, height: d } = (function (e, t) {
                                    let i = Math.max(
                                        e.height / t.height,
                                        e.width / t.width
                                    );
                                    return (
                                        (i = i > 0 ? Math.min(1, i) : 1),
                                        {
                                            width: t.width * i,
                                            height: t.height * i,
                                        }
                                    );
                                })({ width: t, height: i }, c);
                                if (a && a.width === t && a.height === i)
                                    return (
                                        e.setAttributeNS(
                                            'http://www.w3.org/1999/xlink',
                                            'href',
                                            a.data
                                        ),
                                        n()
                                    );
                                ((s.width = o),
                                    (s.height = d),
                                    l.drawImage(
                                        c,
                                        0,
                                        0,
                                        c.width,
                                        c.height,
                                        0,
                                        0,
                                        o,
                                        d
                                    ));
                                const f = s.toDataURL('image/png');
                                return (
                                    (J[r] = {
                                        data: f,
                                        width: o,
                                        height: d,
                                    }),
                                    e.setAttributeNS(
                                        'http://www.w3.org/1999/xlink',
                                        'href',
                                        f
                                    ),
                                    n()
                                );
                            }),
                            (c.onerror = function () {
                                (z.b
                                    .get($.CONFIG.LOGGER)
                                    .error('Could not load ' + r),
                                    n());
                            }));
                    });
                });
            }
            async _inlineFonts() {
                let e = this.options.fonts;
                if (e && e.length > 0) {
                    let t = [];
                    return (
                        e.forEach((e) => {
                            t.push(K.getFontFaces(e));
                        }),
                        Promise.all(t).then((e) => {
                            let t = '';
                            return (
                                e.forEach((e) => {
                                    Array.isArray(e) &&
                                        e.forEach((e) => {
                                            t = t + e + '\n';
                                        });
                                }),
                                t
                            );
                        })
                    );
                }
            }
        }
        function q(e) {
            return (
                (e = (e = encodeURIComponent(e)).replace(
                    /%([0-9A-F]{2})/g,
                    function (e, t) {
                        let i = String.fromCharCode('0x' + t);
                        return '%' === i ? '%25' : i;
                    }
                )),
                decodeURIComponent(e)
            );
        }
        function ee(e, t, i) {
            let n =
                (e.viewBox && e.viewBox.baseVal && e.viewBox.baseVal[i]) ||
                (null !== t.getAttribute(i) &&
                    !t.getAttribute(i).match(/%$/) &&
                    parseFloat(t.getAttribute(i))) ||
                e.getBoundingClientRect()[i] ||
                parseInt(t.style[i]) ||
                parseInt(window.getComputedStyle(e).getPropertyValue(i));
            return null == n || isNaN(parseFloat(n)) ? 0 : n;
        }
        function te(e, t = {}) {
            return new X(e, t).prepareSVGWithDoctype();
        }
        function ie(e, t = {}) {
            return t.isPureSVG
                ? new Promise((e) => e()).then(() => i(Z + e.outerHTML))
                : te(e, t).then((e) => i(e));
            function i(e) {
                return (function () {
                    let e = navigator.userAgent;
                    return e.includes('WebKit') && !e.includes('Edge');
                })()
                    ? 'data:image/svg+xml,' + encodeURIComponent(e)
                    : 'data:image/svg+xml;base64,' + window.btoa(q(e));
            }
        }
        function ne(e, t) {
            return (e - (e % t)) / t;
        }
        function re(e, t) {
            return e % t;
        }
        var oe = {
            newSvg: te,
            newSvgWithoutDoctype: function (e, t = {}) {
                const i = new X(e, t);
                return new Promise((e) => e(i._genSvg()));
            },
            svgAsDataUri: ie,
            svgAsPngUri: function (e, t = {}) {
                return (
                    (t.encoderType = t.encoderType || 'image/png'),
                    (t.encoderOptions = t.encoderOptions || 0.8),
                    new Promise((i) => {
                        ie(e, t).then((e) => {
                            const n = new Image();
                            ((n.onload = function () {
                                const e = function (e, n, r, o) {
                                    const a = document.createElement('canvas'),
                                        s = a.getContext('2d'),
                                        l = o / 96;
                                    let c;
                                    ((a.width = n * l),
                                        (a.height = r * l),
                                        t.canvg
                                            ? t.canvg(a, e)
                                            : (function (e, t, i, n, r, o) {
                                                  const a = n.getContext('2d'),
                                                      s =
                                                          document.createElement(
                                                              'canvas'
                                                          ),
                                                      l = Math.min(1e4, r),
                                                      c = Math.min(1e4, o);
                                                  ((s.width = l),
                                                      (s.height = c));
                                                  const d = s.getContext('2d'),
                                                      f =
                                                          ne(r, l) +
                                                          (0 !== re(r, l)
                                                              ? 1
                                                              : 0),
                                                      h =
                                                          ne(o, c) +
                                                          (0 !== re(o, c)
                                                              ? 1
                                                              : 0),
                                                      p = (t / r) * l,
                                                      T = (i / o) * c;
                                                  a.clearRect(0, 0, r, o);
                                                  for (let t = 0; t < h; t++)
                                                      for (
                                                          let i = 0;
                                                          i < f;
                                                          i++
                                                      )
                                                          (d.clearRect(
                                                              0,
                                                              0,
                                                              l,
                                                              c
                                                          ),
                                                              d.drawImage(
                                                                  e,
                                                                  i * p,
                                                                  t * T,
                                                                  p,
                                                                  T,
                                                                  0,
                                                                  0,
                                                                  l,
                                                                  c
                                                              ),
                                                              a.drawImage(
                                                                  s,
                                                                  i * l,
                                                                  t * c
                                                              ));
                                              })(e, n, r, a, a.width, a.height),
                                        t.backgroundColor &&
                                            ((s.globalCompositeOperation =
                                                'destination-over'),
                                            (s.fillStyle = t.backgroundColor),
                                            s.fillRect(
                                                0,
                                                0,
                                                a.width,
                                                a.height
                                            )));
                                    try {
                                        c = a.toDataURL(
                                            t.encoderType,
                                            t.encoderOptions
                                        );
                                    } catch (e) {
                                        if (
                                            ('undefined' !=
                                                typeof SecurityError &&
                                                e instanceof SecurityError) ||
                                            'SecurityError' == e.name
                                        )
                                            return void z.b
                                                .get($.CONFIG.LOGGER)
                                                .error(
                                                    'Rendered SVG images cannot be downloaded in this browser.'
                                                );
                                    } finally {
                                        i(c);
                                    }
                                };
                                setTimeout(
                                    () => e(n, n.width, n.height, t.hidpi),
                                    100
                                );
                            }),
                                (n.onerror = function () {
                                    z.b
                                        .get($.CONFIG.LOGGER)
                                        .error(
                                            'There was an error loading the data URI as an image on the following SVG\n',
                                            "Open the following link to see browser's diagnosis\n",
                                            e
                                        );
                                }),
                                (n.src = e));
                        });
                    })
                );
            },
        };
        const ae = n.a,
            se = j,
            le = oe;
    },
];
