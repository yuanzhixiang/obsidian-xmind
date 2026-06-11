export default {
    33766: function (e) {
        const t = window.__xmindPackageCryptoJS;
        if (!t) {
            throw new Error(
                'XMind viewer runtime requires package-provided CryptoJS.'
            );
        }
        const n = t.pad && t.pad.ZeroPadding;
        if (!n) {
            throw new Error(
                'XMind viewer runtime CryptoJS is missing module 33766.'
            );
        }
        e.exports = n;
    },
};
