export default {
    70757: function (e) {
        const t = window.__xmindPackageCryptoJS;
        if (!t) {
            throw new Error(
                'XMind viewer runtime requires package-provided CryptoJS.'
            );
        }
        const n = t.EvpKDF;
        if (!n) {
            throw new Error(
                'XMind viewer runtime CryptoJS is missing module 70757.'
            );
        }
        e.exports = n;
    },
};
