export default {
    90731: function (e) {
        const t = window.__xmindPackageCryptoJS;
        if (!t) {
            throw new Error(
                'XMind viewer runtime requires package-provided CryptoJS.'
            );
        }
        const n = t.TripleDES;
        if (!n) {
            throw new Error(
                'XMind viewer runtime CryptoJS is missing module 90731.'
            );
        }
        e.exports = n;
    },
};
