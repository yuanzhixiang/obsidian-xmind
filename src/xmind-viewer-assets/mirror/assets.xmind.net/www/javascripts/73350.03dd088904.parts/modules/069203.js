export default {
    69203: function (e, t, i) {
        var n, r;
        e.exports =
            ((r = i(95292)),
            i(54668),
            (r.mode.ECB =
                (((n = r.lib.BlockCipherMode.extend()).Encryptor = n.extend({
                    processBlock: function (e, t) {
                        this._cipher.encryptBlock(e, t);
                    },
                })),
                (n.Decryptor = n.extend({
                    processBlock: function (e, t) {
                        this._cipher.decryptBlock(e, t);
                    },
                })),
                n)),
            r.mode.ECB);
    },
};
