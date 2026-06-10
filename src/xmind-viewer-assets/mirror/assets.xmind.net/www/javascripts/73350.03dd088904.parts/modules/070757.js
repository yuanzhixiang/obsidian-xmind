export default {
    70757: function (e, t, i) {
        var n, r, o, a, s, l, c, d;
        e.exports =
            ((d = i(95292)),
            i(47620),
            i(81441),
            (r = (n = d).lib),
            (o = r.Base),
            (a = r.WordArray),
            (s = n.algo),
            (l = s.MD5),
            (c = s.EvpKDF =
                o.extend({
                    cfg: o.extend({ keySize: 4, hasher: l, iterations: 1 }),
                    init: function (e) {
                        this.cfg = this.cfg.extend(e);
                    },
                    compute: function (e, t) {
                        for (
                            var i = this.cfg,
                                n = i.hasher.create(),
                                r = a.create(),
                                o = r.words,
                                s = i.keySize,
                                l = i.iterations;
                            o.length < s;
                        ) {
                            c && n.update(c);
                            var c = n.update(e).finalize(t);
                            n.reset();
                            for (var d = 1; d < l; d++)
                                ((c = n.finalize(c)), n.reset());
                            r.concat(c);
                        }
                        return ((r.sigBytes = 4 * s), r);
                    },
                })),
            (n.EvpKDF = function (e, t, i) {
                return c.create(i).compute(e, t);
            }),
            d.EvpKDF);
    },
};
