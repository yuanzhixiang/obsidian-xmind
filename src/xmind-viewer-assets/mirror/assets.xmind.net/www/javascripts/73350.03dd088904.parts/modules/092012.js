export default {
    92012: function (e) {
        const t = window.__xmindPackageCryptoJS;
        if (!t) {
            throw new Error(
                'XMind viewer runtime requires package-provided CryptoJS.'
            );
        }
        const n = t.SHA256;
        if (!n) {
            throw new Error(
                'XMind viewer runtime CryptoJS is missing module 92012.'
            );
        }
        e.exports = n;
    },
};
