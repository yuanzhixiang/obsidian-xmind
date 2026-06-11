export default {
    54668: function (e) {
        const t = window.__xmindPackageCryptoJS;
        if (!t) {
            throw new Error(
                'XMind viewer runtime requires package-provided CryptoJS.'
            );
        }
        const n = t.lib && t.lib.Cipher;
        if (!n) {
            throw new Error(
                'XMind viewer runtime CryptoJS is missing module 54668.'
            );
        }
        e.exports = n;
    },
};
