export default {
    81441: function (e, t, i) {
        var n, r, o, a;
        e.exports =
            ((n = i(95292)),
            (o = (r = n).lib.Base),
            (a = r.enc.Utf8),
            void (r.algo.HMAC = o.extend({
                init: function (e, t) {
                    ((e = this._hasher = new e.init()),
                        'string' == typeof t && (t = a.parse(t)));
                    var i = e.blockSize,
                        n = 4 * i;
                    (t.sigBytes > n && (t = e.finalize(t)), t.clamp());
                    for (
                        var r = (this._oKey = t.clone()),
                            o = (this._iKey = t.clone()),
                            s = r.words,
                            l = o.words,
                            c = 0;
                        c < i;
                        c++
                    )
                        ((s[c] ^= 1549556828), (l[c] ^= 909522486));
                    ((r.sigBytes = o.sigBytes = n), this.reset());
                },
                reset: function () {
                    var e = this._hasher;
                    (e.reset(), e.update(this._iKey));
                },
                update: function (e) {
                    return (this._hasher.update(e), this);
                },
                finalize: function (e) {
                    var t = this._hasher,
                        i = t.finalize(e);
                    return (
                        t.reset(),
                        t.finalize(this._oKey.clone().concat(i))
                    );
                },
            })));
    },
};
