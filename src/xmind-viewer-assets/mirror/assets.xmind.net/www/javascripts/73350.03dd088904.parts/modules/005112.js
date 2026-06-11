export default {
    5112: function (e) {
        const t = window.__xmindPackageCryptoJS;
        if (!t) {
            throw new Error(
                'XMind viewer runtime requires package-provided CryptoJS.'
            );
        }
        const n = t.mode && t.mode.CTRGladman;
        if (!n) {
            throw new Error(
                'XMind viewer runtime CryptoJS is missing module 5112.'
            );
        }
        e.exports = n;
    },
};
