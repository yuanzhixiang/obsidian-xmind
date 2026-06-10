export default {
    78466: function (e, t, i) {
        var n;
        e.exports =
            ((n = i(95292)),
            i(54668),
            (n.mode.CFB = (function () {
                var e = n.lib.BlockCipherMode.extend();
                function t(e, t, i, n) {
                    var r = this._iv;
                    if (r) {
                        var o = r.slice(0);
                        this._iv = void 0;
                    } else o = this._prevBlock;
                    n.encryptBlock(o, 0);
                    for (var a = 0; a < i; a++) e[t + a] ^= o[a];
                }
                return (
                    (e.Encryptor = e.extend({
                        processBlock: function (e, i) {
                            var n = this._cipher,
                                r = n.blockSize;
                            (t.call(this, e, i, r, n),
                                (this._prevBlock = e.slice(i, i + r)));
                        },
                    })),
                    (e.Decryptor = e.extend({
                        processBlock: function (e, i) {
                            var n = this._cipher,
                                r = n.blockSize,
                                o = e.slice(i, i + r);
                            (t.call(this, e, i, r, n), (this._prevBlock = o));
                        },
                    })),
                    e
                );
            })()),
            n.mode.CFB);
    },
};
