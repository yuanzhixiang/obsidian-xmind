export default {
    36162: function (e, t, i) {
        var n;
        e.exports =
            ((n = i(95292)),
            i(54668),
            (n.pad.Iso97971 = {
                pad: function (e, t) {
                    (e.concat(n.lib.WordArray.create([2147483648], 1)),
                        n.pad.ZeroPadding.pad(e, t));
                },
                unpad: function (e) {
                    (n.pad.ZeroPadding.unpad(e), e.sigBytes--);
                },
            }),
            n.pad.Iso97971);
    },
};
