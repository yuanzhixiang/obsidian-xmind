export default {
    18585: function (e) {
        'use strict';
        var t = {};
        function i(e, n) {
            var r;
            return (
                'string' != typeof n && (n = i.defaultChars),
                (r = (function (e) {
                    var i,
                        n,
                        r = t[e];
                    if (r) return r;
                    for (r = t[e] = [], i = 0; i < 128; i++)
                        ((n = String.fromCharCode(i)), r.push(n));
                    for (i = 0; i < e.length; i++)
                        r[(n = e.charCodeAt(i))] =
                            '%' +
                            ('0' + n.toString(16).toUpperCase()).slice(-2);
                    return r;
                })(n)),
                e.replace(/(%[a-f0-9]{2})+/gi, function (e) {
                    var t,
                        i,
                        n,
                        o,
                        a,
                        s,
                        l,
                        c = '';
                    for (t = 0, i = e.length; t < i; t += 3)
                        (n = parseInt(e.slice(t + 1, t + 3), 16)) < 128
                            ? (c += r[n])
                            : 192 == (224 & n) &&
                                t + 3 < i &&
                                128 ==
                                    (192 &
                                        (o = parseInt(
                                            e.slice(t + 4, t + 6),
                                            16
                                        )))
                              ? ((c +=
                                    (l = ((n << 6) & 1984) | (63 & o)) < 128
                                        ? '��'
                                        : String.fromCharCode(l)),
                                (t += 3))
                              : 224 == (240 & n) &&
                                  t + 6 < i &&
                                  ((o = parseInt(e.slice(t + 4, t + 6), 16)),
                                  (a = parseInt(e.slice(t + 7, t + 9), 16)),
                                  128 == (192 & o) && 128 == (192 & a))
                                ? ((c +=
                                      (l =
                                          ((n << 12) & 61440) |
                                          ((o << 6) & 4032) |
                                          (63 & a)) < 2048 ||
                                      (l >= 55296 && l <= 57343)
                                          ? '���'
                                          : String.fromCharCode(l)),
                                  (t += 6))
                                : 240 == (248 & n) &&
                                    t + 9 < i &&
                                    ((o = parseInt(e.slice(t + 4, t + 6), 16)),
                                    (a = parseInt(e.slice(t + 7, t + 9), 16)),
                                    (s = parseInt(e.slice(t + 10, t + 12), 16)),
                                    128 == (192 & o) &&
                                        128 == (192 & a) &&
                                        128 == (192 & s))
                                  ? ((l =
                                        ((n << 18) & 1835008) |
                                        ((o << 12) & 258048) |
                                        ((a << 6) & 4032) |
                                        (63 & s)) < 65536 || l > 1114111
                                        ? (c += '����')
                                        : ((l -= 65536),
                                          (c += String.fromCharCode(
                                              55296 + (l >> 10),
                                              56320 + (1023 & l)
                                          ))),
                                    (t += 9))
                                  : (c += '�');
                    return c;
                })
            );
        }
        ((i.defaultChars = ';/?:@&=+$,#'),
            (i.componentChars = ''),
            (e.exports = i));
    },
};
