export default {
    35725: function (e) {
        const t = window.__xmindPackageCryptoJS;
        if (!t) {
            throw new Error(
                'XMind viewer runtime requires package-provided CryptoJS.'
            );
        }
        const n = t.mode && t.mode.CTR;
        if (!n) {
            throw new Error(
                'XMind viewer runtime CryptoJS is missing module 35725.'
            );
        }
        e.exports = n;
    },
};
