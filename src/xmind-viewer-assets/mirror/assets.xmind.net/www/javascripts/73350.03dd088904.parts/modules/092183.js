export default {
    92183: function (e) {
        const t = window.__xmindPackageCryptoJS;
        if (!t) {
            throw new Error(
                'XMind viewer runtime requires package-provided CryptoJS.'
            );
        }
        const n = t.lib && t.lib.WordArray;
        if (!n) {
            throw new Error(
                'XMind viewer runtime CryptoJS is missing module 92183.'
            );
        }
        e.exports = n;
    },
};
