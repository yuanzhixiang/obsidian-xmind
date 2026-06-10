export default {
    47620: function (e, t, i) {
        var n, r, o, a, s, l, c, d;
        e.exports =
            ((d = i(95292)),
            (r = (n = d).lib),
            (o = r.WordArray),
            (a = r.Hasher),
            (s = n.algo),
            (l = []),
            (c = s.SHA1 =
                a.extend({
                    _doReset: function () {
                        this._hash = new o.init([
                            1732584193, 4023233417, 2562383102, 271733878,
                            3285377520,
                        ]);
                    },
                    _doProcessBlock: function (e, t) {
                        for (
                            var i = this._hash.words,
                                n = i[0],
                                r = i[1],
                                o = i[2],
                                a = i[3],
                                s = i[4],
                                c = 0;
                            c < 80;
                            c++
                        ) {
                            if (c < 16) l[c] = 0 | e[t + c];
                            else {
                                var d =
                                    l[c - 3] ^ l[c - 8] ^ l[c - 14] ^ l[c - 16];
                                l[c] = (d << 1) | (d >>> 31);
                            }
                            var f = ((n << 5) | (n >>> 27)) + s + l[c];
                            ((f +=
                                c < 20
                                    ? 1518500249 + ((r & o) | (~r & a))
                                    : c < 40
                                      ? 1859775393 + (r ^ o ^ a)
                                      : c < 60
                                        ? ((r & o) | (r & a) | (o & a)) -
                                          1894007588
                                        : (r ^ o ^ a) - 899497514),
                                (s = a),
                                (a = o),
                                (o = (r << 30) | (r >>> 2)),
                                (r = n),
                                (n = f));
                        }
                        ((i[0] = (i[0] + n) | 0),
                            (i[1] = (i[1] + r) | 0),
                            (i[2] = (i[2] + o) | 0),
                            (i[3] = (i[3] + a) | 0),
                            (i[4] = (i[4] + s) | 0));
                    },
                    _doFinalize: function () {
                        var e = this._data,
                            t = e.words,
                            i = 8 * this._nDataBytes,
                            n = 8 * e.sigBytes;
                        return (
                            (t[n >>> 5] |= 128 << (24 - (n % 32))),
                            (t[14 + (((n + 64) >>> 9) << 4)] = Math.floor(
                                i / 4294967296
                            )),
                            (t[15 + (((n + 64) >>> 9) << 4)] = i),
                            (e.sigBytes = 4 * t.length),
                            this._process(),
                            this._hash
                        );
                    },
                    clone: function () {
                        var e = a.clone.call(this);
                        return ((e._hash = this._hash.clone()), e);
                    },
                })),
            (n.SHA1 = a._createHelper(c)),
            (n.HmacSHA1 = a._createHmacHelper(c)),
            d.SHA1);
    },
};
