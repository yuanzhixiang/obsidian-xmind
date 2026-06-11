export default {
    63751: function (e) {
        const t = window.__xmindPackageCryptoJS;
        if (!t) {
            throw new Error(
                'XMind viewer runtime requires package-provided CryptoJS.'
            );
        }
        const n = t.SHA512;
        if (!n) {
            throw new Error(
                'XMind viewer runtime CryptoJS is missing module 63751.'
            );
        }
        e.exports = n;
    },
};
