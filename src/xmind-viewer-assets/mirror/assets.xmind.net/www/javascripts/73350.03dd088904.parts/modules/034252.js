export default {
    34252: function (e, t, i) {
        var n;
        e.exports =
            ((n = i(95292)),
            i(54668),
            (n.pad.AnsiX923 = {
                pad: function (e, t) {
                    var i = e.sigBytes,
                        n = 4 * t,
                        r = n - (i % n),
                        o = i + r - 1;
                    (e.clamp(),
                        (e.words[o >>> 2] |= r << (24 - (o % 4) * 8)),
                        (e.sigBytes += r));
                },
                unpad: function (e) {
                    var t = 255 & e.words[(e.sigBytes - 1) >>> 2];
                    e.sigBytes -= t;
                },
            }),
            n.pad.Ansix923);
    },
};
