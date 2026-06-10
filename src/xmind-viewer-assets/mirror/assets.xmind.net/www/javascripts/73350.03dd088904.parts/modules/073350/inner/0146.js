export default [
    function (e, t, i) {
        'use strict';
        (function (e) {
            var i = !1;
            ((t.maxObjectSize = 1e8), (t.maxObjectCount = 32768));
            var n = 9783072e5,
                r = (t.UID = function (e) {
                    this.UID = e;
                });
            t.parseBuffer = function (s) {
                if ('bplist' !== s.slice(0, 6).toString('utf8'))
                    throw new Error(
                        "Invalid binary plist. Expected 'bplist' at offset 0."
                    );
                var l = s.slice(s.length - 32, s.length),
                    c = l.readUInt8(6);
                var d = l.readUInt8(7);
                var f = a(l, 8);
                var h = a(l, 16);
                var p = a(l, 24);
                if (f > t.maxObjectCount)
                    throw new Error('maxObjectCount exceeded');
                for (var T = [], u = 0; u < f; u++) {
                    var g = s.slice(p + u * c, p + (u + 1) * c);
                    T[u] = o(g, 0);
                }
                return [
                    (function a(l) {
                        var c = T[l],
                            f = s[c],
                            h = (240 & f) >> 4,
                            p = 15 & f;
                        switch (h) {
                            case 0:
                                return (function () {
                                    switch (p) {
                                        case 0:
                                        case 15:
                                            return null;
                                        case 8:
                                            return !1;
                                        case 9:
                                            return !0;
                                        default:
                                            throw new Error(
                                                'Unhandled simple type 0x' +
                                                    h.toString(16)
                                            );
                                    }
                                })();
                            case 1:
                                return (function () {
                                    var e = Math.pow(2, p);
                                    if (4 == p) {
                                        var i = (function (e) {
                                            var t,
                                                i = '';
                                            for (
                                                t = 0;
                                                t < e.length && 0 == e[t];
                                                t++
                                            );
                                            for (; t < e.length; t++) {
                                                var n =
                                                    '00' + e[t].toString(16);
                                                i += n.substr(n.length - 2);
                                            }
                                            return i;
                                        })(s.slice(c + 1, c + 1 + e));
                                        return parseInt(i, 16);
                                    }
                                    if (3 == p) return s.readInt32BE(c + 1);
                                    if (e < t.maxObjectSize)
                                        return o(s.slice(c + 1, c + 1 + e));
                                    throw new Error(
                                        'To little heap space available! Wanted to read ' +
                                            e +
                                            ' bytes, but only ' +
                                            t.maxObjectSize +
                                            ' are available.'
                                    );
                                })();
                            case 8:
                                return (function () {
                                    var e = p + 1;
                                    if (e < t.maxObjectSize)
                                        return new r(
                                            o(s.slice(c + 1, c + 1 + e))
                                        );
                                    throw new Error(
                                        'To little heap space available! Wanted to read ' +
                                            e +
                                            ' bytes, but only ' +
                                            t.maxObjectSize +
                                            ' are available.'
                                    );
                                })();
                            case 2:
                                return (function () {
                                    var e = Math.pow(2, p);
                                    if (!(e < t.maxObjectSize))
                                        throw new Error(
                                            'To little heap space available! Wanted to read ' +
                                                e +
                                                ' bytes, but only ' +
                                                t.maxObjectSize +
                                                ' are available.'
                                        );
                                    var i = s.slice(c + 1, c + 1 + e);
                                    if (4 === e) return i.readFloatBE(0);
                                    if (8 === e) return i.readDoubleBE(0);
                                })();
                            case 3:
                                return (function () {
                                    3 != p &&
                                        console.error(
                                            'Unknown date type :' +
                                                p +
                                                '. Parsing anyway...'
                                        );
                                    var e = s.slice(c + 1, c + 9);
                                    return new Date(
                                        n + 1e3 * e.readDoubleBE(0)
                                    );
                                })();
                            case 4:
                                return (function () {
                                    var e = 1,
                                        i = p;
                                    if (15 == p) {
                                        var n = s[c + 1],
                                            r = (240 & n) / 16;
                                        1 != r &&
                                            console.error(
                                                '0x4: UNEXPECTED LENGTH-INT TYPE! ' +
                                                    r
                                            );
                                        var a = 15 & n,
                                            l = Math.pow(2, a);
                                        ((e = 2 + l),
                                            (i = o(s.slice(c + 2, c + 2 + l))));
                                    }
                                    if (i < t.maxObjectSize)
                                        return s.slice(c + e, c + e + i);
                                    throw new Error(
                                        'To little heap space available! Wanted to read ' +
                                            i +
                                            ' bytes, but only ' +
                                            t.maxObjectSize +
                                            ' are available.'
                                    );
                                })();
                            case 5:
                                return u();
                            case 6:
                                return u(!0);
                            case 10:
                                return (function () {
                                    var e = p,
                                        i = 1;
                                    if (15 == p) {
                                        var n = s[c + 1],
                                            r = (240 & n) / 16;
                                        1 != r &&
                                            console.error(
                                                '0xa: UNEXPECTED LENGTH-INT TYPE! ' +
                                                    r
                                            );
                                        var l = 15 & n,
                                            f = Math.pow(2, l);
                                        ((i = 2 + f),
                                            (e = o(s.slice(c + 2, c + 2 + f))));
                                    }
                                    if (e * d > t.maxObjectSize)
                                        throw new Error(
                                            'To little heap space available!'
                                        );
                                    for (var h = [], T = 0; T < e; T++) {
                                        var u = o(
                                            s.slice(
                                                c + i + T * d,
                                                c + i + (T + 1) * d
                                            )
                                        );
                                        h[T] = a(u);
                                    }
                                    return h;
                                })();
                            case 13:
                                return (function () {
                                    var e = p,
                                        n = 1;
                                    if (15 == p) {
                                        var r = s[c + 1],
                                            l = (240 & r) / 16;
                                        1 != l &&
                                            console.error(
                                                '0xD: UNEXPECTED LENGTH-INT TYPE! ' +
                                                    l
                                            );
                                        var f = 15 & r,
                                            h = Math.pow(2, f);
                                        ((n = 2 + h),
                                            (e = o(s.slice(c + 2, c + 2 + h))));
                                    }
                                    if (2 * e * d > t.maxObjectSize)
                                        throw new Error(
                                            'To little heap space available!'
                                        );
                                    i;
                                    for (var T = {}, u = 0; u < e; u++) {
                                        var g = o(
                                                s.slice(
                                                    c + n + u * d,
                                                    c + n + (u + 1) * d
                                                )
                                            ),
                                            Q = o(
                                                s.slice(
                                                    c + n + e * d + u * d,
                                                    c + n + e * d + (u + 1) * d
                                                )
                                            ),
                                            m = a(g),
                                            b = a(Q);
                                        (i, (T[m] = b));
                                    }
                                    return T;
                                })();
                            default:
                                throw new Error(
                                    'Unhandled type 0x' + h.toString(16)
                                );
                        }
                        function u(i) {
                            i = i || 0;
                            var n = 'utf8',
                                r = p,
                                a = 1;
                            if (15 == p) {
                                var l = s[c + 1],
                                    d = (240 & l) / 16;
                                1 != d &&
                                    console.err(
                                        'UNEXPECTED LENGTH-INT TYPE! ' + d
                                    );
                                var f = 15 & l,
                                    h = Math.pow(2, f);
                                a = 2 + h;
                                r = o(s.slice(c + 2, c + 2 + h));
                            }
                            if ((r *= i + 1) < t.maxObjectSize) {
                                var T = new e(s.slice(c + a, c + a + r));
                                return (
                                    i &&
                                        ((T = (function (e) {
                                            for (
                                                var t = e.length, i = 0;
                                                i < t;
                                                i += 2
                                            ) {
                                                var n = e[i];
                                                ((e[i] = e[i + 1]),
                                                    (e[i + 1] = n));
                                            }
                                            return e;
                                        })(T)),
                                        (n = 'ucs2')),
                                    T.toString(n)
                                );
                            }
                            throw new Error(
                                'To little heap space available! Wanted to read ' +
                                    r +
                                    ' bytes, but only ' +
                                    t.maxObjectSize +
                                    ' are available.'
                            );
                        }
                    })(h),
                ];
            };
            function o(e, t) {
                for (var i = 0, n = (t = t || 0); n < e.length; n++)
                    ((i <<= 8), (i |= 255 & e[n]));
                return i;
            }
            function a(e, t) {
                return e.slice(t, t + 8).readUInt32BE(4, 8);
            }
        }).call(this, i(162).Buffer);
    },
];
