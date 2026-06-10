export default {
    56648: function (e) {
        'use strict';
        /*! http://mths.be/fromcodepoint v0.2.1 by @mathias */ if (
            String.fromCodePoint
        )
            e.exports = function (e) {
                try {
                    return String.fromCodePoint(e);
                } catch (e) {
                    if (e instanceof RangeError)
                        return String.fromCharCode(65533);
                    throw e;
                }
            };
        else {
            var t = String.fromCharCode,
                i = Math.floor;
            e.exports = function () {
                var e,
                    n,
                    r = [],
                    o = -1,
                    a = arguments.length;
                if (!a) return '';
                for (var s = ''; ++o < a; ) {
                    var l = Number(arguments[o]);
                    if (!isFinite(l) || l < 0 || l > 1114111 || i(l) !== l)
                        return String.fromCharCode(65533);
                    (l <= 65535
                        ? r.push(l)
                        : ((e = 55296 + ((l -= 65536) >> 10)),
                          (n = (l % 1024) + 56320),
                          r.push(e, n)),
                        (o + 1 === a || r.length > 16384) &&
                            ((s += t.apply(null, r)), (r.length = 0)));
                }
                return s;
            };
        }
    },
};
