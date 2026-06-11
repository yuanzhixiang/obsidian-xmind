export default {
    13214: function (e) {
        const t = window.__xmindPackageCryptoJS;
        if (!t) {
            throw new Error(
                'XMind viewer runtime requires package-provided CryptoJS.'
            );
        }
        const n = t.AES;
        if (!n) {
            throw new Error(
                'XMind viewer runtime CryptoJS is missing module 13214.'
            );
        }
        e.exports = n;
    },
};
