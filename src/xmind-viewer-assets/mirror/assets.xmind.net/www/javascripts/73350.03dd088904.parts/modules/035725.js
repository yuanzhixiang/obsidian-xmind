export default {
    35725: function (e, t, i) {
        var n, r, o;
        e.exports =
            ((o = i(95292)),
            i(54668),
            (o.mode.CTR =
                ((n = o.lib.BlockCipherMode.extend()),
                (r = n.Encryptor =
                    n.extend({
                        processBlock: function (e, t) {
                            var i = this._cipher,
                                n = i.blockSize,
                                r = this._iv,
                                o = this._counter;
                            r &&
                                ((o = this._counter = r.slice(0)),
                                (this._iv = void 0));
                            var a = o.slice(0);
                            (i.encryptBlock(a, 0),
                                (o[n - 1] = (o[n - 1] + 1) | 0));
                            for (var s = 0; s < n; s++) e[t + s] ^= a[s];
                        },
                    })),
                (n.Decryptor = r),
                n)),
            o.mode.CTR);
    },
};
