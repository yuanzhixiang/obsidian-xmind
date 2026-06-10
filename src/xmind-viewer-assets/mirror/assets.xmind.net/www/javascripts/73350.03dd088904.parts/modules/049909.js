export default {
    49909: function (e, t, i) {
        var n, r, o, a, s, l;
        e.exports =
            ((l = i(95292)),
            i(92012),
            (r = (n = l).lib.WordArray),
            (o = n.algo),
            (a = o.SHA256),
            (s = o.SHA224 =
                a.extend({
                    _doReset: function () {
                        this._hash = new r.init([
                            3238371032, 914150663, 812702999, 4144912697,
                            4290775857, 1750603025, 1694076839, 3204075428,
                        ]);
                    },
                    _doFinalize: function () {
                        var e = a._doFinalize.call(this);
                        return ((e.sigBytes -= 4), e);
                    },
                })),
            (n.SHA224 = a._createHelper(s)),
            (n.HmacSHA224 = a._createHmacHelper(s)),
            l.SHA224);
    },
};
