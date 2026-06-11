export default {
    78692: function (e) {
        const t = window.__xmindPackageCryptoJS;
        if (!t) {
            throw new Error(
                'XMind viewer runtime requires package-provided CryptoJS.'
            );
        }
        const n = t.enc && t.enc.Utf16;
        if (!n) {
            throw new Error(
                'XMind viewer runtime CryptoJS is missing module 78692.'
            );
        }
        e.exports = n;
    },
};
