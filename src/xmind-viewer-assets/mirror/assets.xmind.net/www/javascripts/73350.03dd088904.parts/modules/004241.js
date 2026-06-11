export default {
    4241: function (e) {
        const t = window.__xmindPackageCryptoJS;
        if (!t) {
            throw new Error(
                'XMind viewer runtime requires package-provided CryptoJS.'
            );
        }
        const n = t;
        if (!n) {
            throw new Error(
                'XMind viewer runtime CryptoJS is missing module 4241.'
            );
        }
        e.exports = n;
    },
};
