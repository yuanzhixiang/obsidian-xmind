export default {
    49909: function (e) {
        const t = window.__xmindPackageCryptoJS;
        if (!t) {
            throw new Error(
                'XMind viewer runtime requires package-provided CryptoJS.'
            );
        }
        const n = t.SHA224;
        if (!n) {
            throw new Error(
                'XMind viewer runtime CryptoJS is missing module 49909.'
            );
        }
        e.exports = n;
    },
};
