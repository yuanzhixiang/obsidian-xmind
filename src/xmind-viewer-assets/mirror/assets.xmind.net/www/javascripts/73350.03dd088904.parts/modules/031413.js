export default {
    31413: function (e, t, i) {
        var n, r, o, a, s, l, c, d, f;
        e.exports =
            ((f = i(95292)),
            i(47620),
            i(81441),
            (r = (n = f).lib),
            (o = r.Base),
            (a = r.WordArray),
            (s = n.algo),
            (l = s.SHA1),
            (c = s.HMAC),
            (d = s.PBKDF2 =
                o.extend({
                    cfg: o.extend({ keySize: 4, hasher: l, iterations: 1 }),
                    init: function (e) {
                        this.cfg = this.cfg.extend(e);
                    },
                    compute: function (e, t) {
                        for (
                            var i = this.cfg,
                                n = c.create(i.hasher, e),
                                r = a.create(),
                                o = a.create([1]),
                                s = r.words,
                                l = o.words,
                                d = i.keySize,
                                f = i.iterations;
                            s.length < d;
                        ) {
                            var h = n.update(t).finalize(o);
                            n.reset();
                            for (
                                var p = h.words, T = p.length, u = h, g = 1;
                                g < f;
                                g++
                            ) {
                                ((u = n.finalize(u)), n.reset());
                                for (var Q = u.words, m = 0; m < T; m++)
                                    p[m] ^= Q[m];
                            }
                            (r.concat(h), l[0]++);
                        }
                        return ((r.sigBytes = 4 * d), r);
                    },
                })),
            (n.PBKDF2 = function (e, t, i) {
                return d.create(i).compute(e, t);
            }),
            f.PBKDF2);
    },
};
