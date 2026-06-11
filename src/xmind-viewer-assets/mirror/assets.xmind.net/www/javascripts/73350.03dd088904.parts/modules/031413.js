export default {
    31413: function (e) {
        const t = window.__xmindPackageCryptoJS;
        if (!t) {
            throw new Error(
                'XMind viewer runtime requires package-provided CryptoJS.'
            );
        }
        const n = t.PBKDF2;
        if (!n) {
            throw new Error(
                'XMind viewer runtime CryptoJS is missing module 31413.'
            );
        }
        e.exports = n;
    },
};
