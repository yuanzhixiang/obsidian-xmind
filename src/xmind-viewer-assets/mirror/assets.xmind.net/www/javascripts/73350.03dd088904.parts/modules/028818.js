export default {
    28818: function (e) {
        const t = window.__xmindPackageCryptoJS;
        if (!t) {
            throw new Error(
                'XMind viewer runtime requires package-provided CryptoJS.'
            );
        }
        const n = t.Rabbit;
        if (!n) {
            throw new Error(
                'XMind viewer runtime CryptoJS is missing module 28818.'
            );
        }
        e.exports = n;
    },
};
