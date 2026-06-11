export default {
    73872: function (e) {
        const t = window.__xmindPackageCryptoJS;
        if (!t) {
            throw new Error(
                'XMind viewer runtime requires package-provided CryptoJS.'
            );
        }
        const n = t.pad && t.pad.NoPadding;
        if (!n) {
            throw new Error(
                'XMind viewer runtime CryptoJS is missing module 73872.'
            );
        }
        e.exports = n;
    },
};
