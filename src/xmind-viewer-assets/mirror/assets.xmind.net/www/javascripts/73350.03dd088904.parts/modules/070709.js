export default {
    70709: function (e) {
        const t = window.__xmindPackageCryptoJS;
        if (!t) {
            throw new Error(
                'XMind viewer runtime requires package-provided CryptoJS.'
            );
        }
        const n = t.RIPEMD160;
        if (!n) {
            throw new Error(
                'XMind viewer runtime CryptoJS is missing module 70709.'
            );
        }
        e.exports = n;
    },
};
