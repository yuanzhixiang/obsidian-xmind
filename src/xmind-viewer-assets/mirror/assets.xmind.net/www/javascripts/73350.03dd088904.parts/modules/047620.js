export default {
    47620: function (e) {
        const t = window.__xmindPackageCryptoJS;
        if (!t) {
            throw new Error(
                'XMind viewer runtime requires package-provided CryptoJS.'
            );
        }
        const n = t.SHA1;
        if (!n) {
            throw new Error(
                'XMind viewer runtime CryptoJS is missing module 47620.'
            );
        }
        e.exports = n;
    },
};
