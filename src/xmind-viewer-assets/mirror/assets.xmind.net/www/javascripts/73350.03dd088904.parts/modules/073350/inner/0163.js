export default [
    function (e, t, i) {
        'use strict';
        ((t.byteLength = function (e) {
            var t = l(e),
                i = t[0],
                n = t[1];
            return (3 * (i + n)) / 4 - n;
        }),
            (t.toByteArray = function (e) {
                var t,
                    i,
                    n = l(e),
                    a = n[0],
                    s = n[1],
                    c = new o(
                        (function (e, t, i) {
                            return (3 * (t + i)) / 4 - i;
                        })(0, a, s)
                    ),
                    d = 0,
                    f = s > 0 ? a - 4 : a;
                for (i = 0; i < f; i += 4)
                    ((t =
                        (r[e.charCodeAt(i)] << 18) |
                        (r[e.charCodeAt(i + 1)] << 12) |
                        (r[e.charCodeAt(i + 2)] << 6) |
                        r[e.charCodeAt(i + 3)]),
                        (c[d++] = (t >> 16) & 255),
                        (c[d++] = (t >> 8) & 255),
                        (c[d++] = 255 & t));
                2 === s &&
                    ((t =
                        (r[e.charCodeAt(i)] << 2) |
                        (r[e.charCodeAt(i + 1)] >> 4)),
                    (c[d++] = 255 & t));
                1 === s &&
                    ((t =
                        (r[e.charCodeAt(i)] << 10) |
                        (r[e.charCodeAt(i + 1)] << 4) |
                        (r[e.charCodeAt(i + 2)] >> 2)),
                    (c[d++] = (t >> 8) & 255),
                    (c[d++] = 255 & t));
                return c;
            }),
            (t.fromByteArray = function (e) {
                for (
                    var t,
                        i = e.length,
                        r = i % 3,
                        o = [],
                        a = 16383,
                        s = 0,
                        l = i - r;
                    s < l;
                    s += a
                )
                    o.push(c(e, s, s + a > l ? l : s + a));
                1 === r
                    ? ((t = e[i - 1]),
                      o.push(n[t >> 2] + n[(t << 4) & 63] + '=='))
                    : 2 === r &&
                      ((t = (e[i - 2] << 8) + e[i - 1]),
                      o.push(
                          n[t >> 10] + n[(t >> 4) & 63] + n[(t << 2) & 63] + '='
                      ));
                return o.join('');
            }));
        for (
            var n = [],
                r = [],
                o = 'undefined' != typeof Uint8Array ? Uint8Array : Array,
                a =
                    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
                s = 0;
            s < 64;
            ++s
        )
            ((n[s] = a[s]), (r[a.charCodeAt(s)] = s));
        function l(e) {
            var t = e.length;
            if (t % 4 > 0)
                throw new Error(
                    'Invalid string. Length must be a multiple of 4'
                );
            var i = e.indexOf('=');
            return (-1 === i && (i = t), [i, i === t ? 0 : 4 - (i % 4)]);
        }
        function c(e, t, i) {
            for (var r, o, a = [], s = t; s < i; s += 3)
                ((r =
                    ((e[s] << 16) & 16711680) +
                    ((e[s + 1] << 8) & 65280) +
                    (255 & e[s + 2])),
                    a.push(
                        n[((o = r) >> 18) & 63] +
                            n[(o >> 12) & 63] +
                            n[(o >> 6) & 63] +
                            n[63 & o]
                    ));
            return a.join('');
        }
        ((r['-'.charCodeAt(0)] = 62), (r['_'.charCodeAt(0)] = 63));
    },
];
