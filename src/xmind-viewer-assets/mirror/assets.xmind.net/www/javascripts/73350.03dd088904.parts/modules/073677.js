export default {
    73677: function (e, t, i) {
        var n;
        e.exports =
            ((n = i(95292)),
            (function (e) {
                var t = n,
                    i = t.lib,
                    r = i.Base,
                    o = i.WordArray,
                    a = (t.x64 = {});
                ((a.Word = r.extend({
                    init: function (e, t) {
                        ((this.high = e), (this.low = t));
                    },
                })),
                    (a.WordArray = r.extend({
                        init: function (t, i) {
                            ((t = this.words = t || []),
                                (this.sigBytes = i != e ? i : 8 * t.length));
                        },
                        toX32: function () {
                            for (
                                var e = this.words, t = e.length, i = [], n = 0;
                                n < t;
                                n++
                            ) {
                                var r = e[n];
                                (i.push(r.high), i.push(r.low));
                            }
                            return o.create(i, this.sigBytes);
                        },
                        clone: function () {
                            for (
                                var e = r.clone.call(this),
                                    t = (e.words = this.words.slice(0)),
                                    i = t.length,
                                    n = 0;
                                n < i;
                                n++
                            )
                                t[n] = t[n].clone();
                            return e;
                        },
                    })));
            })(),
            n);
    },
};
