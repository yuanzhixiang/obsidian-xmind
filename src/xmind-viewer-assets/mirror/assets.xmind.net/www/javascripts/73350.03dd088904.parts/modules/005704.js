export default {
    5704: function (e) {
        'use strict';
        var t = {};
        function i(e, n, r) {
            var o,
                a,
                s,
                l,
                c,
                d = '';
            for (
                'string' != typeof n && ((r = n), (n = i.defaultChars)),
                    void 0 === r && (r = !0),
                    c = (function (e) {
                        var i,
                            n,
                            r = t[e];
                        if (r) return r;
                        for (r = t[e] = [], i = 0; i < 128; i++)
                            ((n = String.fromCharCode(i)),
                                /^[0-9a-z]$/i.test(n)
                                    ? r.push(n)
                                    : r.push(
                                          '%' +
                                              (
                                                  '0' +
                                                  i.toString(16).toUpperCase()
                                              ).slice(-2)
                                      ));
                        for (i = 0; i < e.length; i++)
                            r[e.charCodeAt(i)] = e[i];
                        return r;
                    })(n),
                    o = 0,
                    a = e.length;
                o < a;
                o++
            )
                if (
                    ((s = e.charCodeAt(o)),
                    r &&
                        37 === s &&
                        o + 2 < a &&
                        /^[0-9a-f]{2}$/i.test(e.slice(o + 1, o + 3)))
                )
                    ((d += e.slice(o, o + 3)), (o += 2));
                else if (s < 128) d += c[s];
                else if (s >= 55296 && s <= 57343) {
                    if (
                        s >= 55296 &&
                        s <= 56319 &&
                        o + 1 < a &&
                        (l = e.charCodeAt(o + 1)) >= 56320 &&
                        l <= 57343
                    ) {
                        ((d += encodeURIComponent(e[o] + e[o + 1])), o++);
                        continue;
                    }
                    d += '%EF%BF%BD';
                } else d += encodeURIComponent(e[o]);
            return d;
        }
        ((i.defaultChars = ";/?:@&=+$,-_.!~*'()#"),
            (i.componentChars = "-_.!~*'()"),
            (e.exports = i));
    },
};
