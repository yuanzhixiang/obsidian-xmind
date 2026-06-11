export default {
    36127: function (e) {
        const t = window.__xmindPackageCryptoJS;
        if (!t) {
            throw new Error(
                'XMind viewer runtime requires package-provided CryptoJS.'
            );
        }
        const n = t.enc && t.enc.Base64;
        if (!n) {
            throw new Error(
                'XMind viewer runtime CryptoJS is missing module 36127.'
            );
        }
        e.exports = n;
    },
};
