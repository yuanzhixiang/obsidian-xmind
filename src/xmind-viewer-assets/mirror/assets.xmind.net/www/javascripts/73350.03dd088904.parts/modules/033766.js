export default {
    33766: function (e, t, i) {
        var n;
        e.exports =
            ((n = i(95292)),
            i(54668),
            (n.pad.ZeroPadding = {
                pad: function (e, t) {
                    var i = 4 * t;
                    (e.clamp(), (e.sigBytes += i - (e.sigBytes % i || i)));
                },
                unpad: function (e) {
                    for (
                        var t = e.words, i = e.sigBytes - 1;
                        !((t[i >>> 2] >>> (24 - (i % 4) * 8)) & 255);
                    )
                        i--;
                    e.sigBytes = i + 1;
                },
            }),
            n.pad.ZeroPadding);
    },
};
