export default {
    69203: function (e) {
        const t = window.__xmindPackageCryptoJS;
        if (!t) {
            throw new Error(
                'XMind viewer runtime requires package-provided CryptoJS.'
            );
        }
        const n = t.mode && t.mode.ECB;
        if (!n) {
            throw new Error(
                'XMind viewer runtime CryptoJS is missing module 69203.'
            );
        }
        e.exports = n;
    },
};
