export default {
    74418: function (e, t, i) {
        var n, r, o;
        e.exports =
            ((o = i(95292)),
            i(54668),
            (o.mode.OFB =
                ((n = o.lib.BlockCipherMode.extend()),
                (r = n.Encryptor =
                    n.extend({
                        processBlock: function (e, t) {
                            var i = this._cipher,
                                n = i.blockSize,
                                r = this._iv,
                                o = this._keystream;
                            (r &&
                                ((o = this._keystream = r.slice(0)),
                                (this._iv = void 0)),
                                i.encryptBlock(o, 0));
                            for (var a = 0; a < n; a++) e[t + a] ^= o[a];
                        },
                    })),
                (n.Decryptor = r),
                n)),
            o.mode.OFB);
    },
};
