export default {
    5112: function (e, t, i) {
        var n;
        e.exports =
            ((n = i(95292)),
            i(54668),
            /** @preserve
             * Counter block mode compatible with  Dr Brian Gladman fileenc.c
             * derived from CryptoJS.mode.CTR
             * Jan Hruby jhruby.web@gmail.com
             */
            (n.mode.CTRGladman = (function () {
                var e = n.lib.BlockCipherMode.extend();
                function t(e) {
                    if (255 & ~(e >> 24)) e += 1 << 24;
                    else {
                        var t = (e >> 16) & 255,
                            i = (e >> 8) & 255,
                            n = 255 & e;
                        (255 === t
                            ? ((t = 0),
                              255 === i
                                  ? ((i = 0), 255 === n ? (n = 0) : ++n)
                                  : ++i)
                            : ++t,
                            (e = 0),
                            (e += t << 16),
                            (e += i << 8),
                            (e += n));
                    }
                    return e;
                }
                function i(e) {
                    return (0 === (e[0] = t(e[0])) && (e[1] = t(e[1])), e);
                }
                var r = (e.Encryptor = e.extend({
                    processBlock: function (e, t) {
                        var n = this._cipher,
                            r = n.blockSize,
                            o = this._iv,
                            a = this._counter;
                        (o &&
                            ((a = this._counter = o.slice(0)),
                            (this._iv = void 0)),
                            i(a));
                        var s = a.slice(0);
                        n.encryptBlock(s, 0);
                        for (var l = 0; l < r; l++) e[t + l] ^= s[l];
                    },
                }));
                return ((e.Decryptor = r), e);
            })()),
            n.mode.CTRGladman);
    },
};
