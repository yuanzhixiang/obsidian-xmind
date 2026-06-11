export default {
    78466: function (e) {
        const t = window.__xmindPackageCryptoJS;
        if (!t) {
            throw new Error(
                'XMind viewer runtime requires package-provided CryptoJS.'
            );
        }
        const n = t.mode && t.mode.CFB;
        if (!n) {
            throw new Error(
                'XMind viewer runtime CryptoJS is missing module 78466.'
            );
        }
        e.exports = n;
    },
};
