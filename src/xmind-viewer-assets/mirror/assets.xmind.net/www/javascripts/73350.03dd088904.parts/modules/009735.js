export default {
    9735: function (e) {
        const t = window.__xmindPackageCryptoJS;
        if (!t) {
            throw new Error(
                'XMind viewer runtime requires package-provided CryptoJS.'
            );
        }
        const n = t.SHA384;
        if (!n) {
            throw new Error(
                'XMind viewer runtime CryptoJS is missing module 9735.'
            );
        }
        e.exports = n;
    },
};
