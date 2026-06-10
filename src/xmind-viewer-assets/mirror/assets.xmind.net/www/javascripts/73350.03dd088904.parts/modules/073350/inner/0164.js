export default [
    function (e, t) {
        /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
        ((t.read = function (e, t, i, n, r) {
            var o,
                a,
                s = 8 * r - n - 1,
                l = (1 << s) - 1,
                c = l >> 1,
                d = -7,
                f = i ? r - 1 : 0,
                h = i ? -1 : 1,
                p = e[t + f];
            for (
                f += h, o = p & ((1 << -d) - 1), p >>= -d, d += s;
                d > 0;
                o = 256 * o + e[t + f], f += h, d -= 8
            );
            for (
                a = o & ((1 << -d) - 1), o >>= -d, d += n;
                d > 0;
                a = 256 * a + e[t + f], f += h, d -= 8
            );
            if (0 === o) o = 1 - c;
            else {
                if (o === l) return a ? NaN : (1 / 0) * (p ? -1 : 1);
                ((a += Math.pow(2, n)), (o -= c));
            }
            return (p ? -1 : 1) * a * Math.pow(2, o - n);
        }),
            (t.write = function (e, t, i, n, r, o) {
                var a,
                    s,
                    l,
                    c = 8 * o - r - 1,
                    d = (1 << c) - 1,
                    f = d >> 1,
                    h = 23 === r ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                    p = n ? 0 : o - 1,
                    T = n ? 1 : -1,
                    u = t < 0 || (0 === t && 1 / t < 0) ? 1 : 0;
                for (
                    t = Math.abs(t),
                        isNaN(t) || t === 1 / 0
                            ? ((s = isNaN(t) ? 1 : 0), (a = d))
                            : ((a = Math.floor(Math.log(t) / Math.LN2)),
                              t * (l = Math.pow(2, -a)) < 1 && (a--, (l *= 2)),
                              (t +=
                                  a + f >= 1 ? h / l : h * Math.pow(2, 1 - f)) *
                                  l >=
                                  2 && (a++, (l /= 2)),
                              a + f >= d
                                  ? ((s = 0), (a = d))
                                  : a + f >= 1
                                    ? ((s = (t * l - 1) * Math.pow(2, r)),
                                      (a += f))
                                    : ((s =
                                          t *
                                          Math.pow(2, f - 1) *
                                          Math.pow(2, r)),
                                      (a = 0)));
                    r >= 8;
                    e[i + p] = 255 & s, p += T, s /= 256, r -= 8
                );
                for (
                    a = (a << r) | s, c += r;
                    c > 0;
                    e[i + p] = 255 & a, p += T, a /= 256, c -= 8
                );
                e[i + p - T] |= 128 * u;
            }));
    },
];
