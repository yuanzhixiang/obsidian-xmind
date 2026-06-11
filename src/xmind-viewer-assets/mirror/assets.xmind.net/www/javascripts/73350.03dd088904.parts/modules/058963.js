export default {
    58963: function (e) {
        const t = window.__xmindPackageCryptoJS;
        if (!t) {
            throw new Error(
                'XMind viewer runtime requires package-provided CryptoJS.'
            );
        }
        const n = t.format && t.format.Hex;
        if (!n) {
            throw new Error(
                'XMind viewer runtime CryptoJS is missing module 58963.'
            );
        }
        e.exports = n;
    },
};
