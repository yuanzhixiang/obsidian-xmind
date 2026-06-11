export default {
    34195: function (e) {
        const t = window.__xmindPackageCryptoJS;
        if (!t) {
            throw new Error(
                'XMind viewer runtime requires package-provided CryptoJS.'
            );
        }
        const n = t.SHA3;
        if (!n) {
            throw new Error(
                'XMind viewer runtime CryptoJS is missing module 34195.'
            );
        }
        e.exports = n;
    },
};
