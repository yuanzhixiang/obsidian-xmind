export default {
    74418: function (e) {
        const t = window.__xmindPackageCryptoJS;
        if (!t) {
            throw new Error(
                'XMind viewer runtime requires package-provided CryptoJS.'
            );
        }
        const n = t.mode && t.mode.OFB;
        if (!n) {
            throw new Error(
                'XMind viewer runtime CryptoJS is missing module 74418.'
            );
        }
        e.exports = n;
    },
};
