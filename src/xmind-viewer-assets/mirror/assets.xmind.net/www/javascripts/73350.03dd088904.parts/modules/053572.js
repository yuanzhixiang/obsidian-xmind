export default {
    53572: function (e, t, i) {
        var n;
        e.exports =
            ((n = i(95292)),
            i(54668),
            (n.pad.Iso10126 = {
                pad: function (e, t) {
                    var i = 4 * t,
                        r = i - (e.sigBytes % i);
                    e.concat(n.lib.WordArray.random(r - 1)).concat(
                        n.lib.WordArray.create([r << 24], 1)
                    );
                },
                unpad: function (e) {
                    var t = 255 & e.words[(e.sigBytes - 1) >>> 2];
                    e.sigBytes -= t;
                },
            }),
            n.pad.Iso10126);
    },
};
