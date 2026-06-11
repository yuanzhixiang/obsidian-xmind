export default {
    84159: function (e) {
        const t = window.__xmindPackageCryptoJS;
        if (!t) {
            throw new Error(
                'XMind viewer runtime requires package-provided CryptoJS.'
            );
        }
        const n = t.RabbitLegacy;
        if (!n) {
            throw new Error(
                'XMind viewer runtime CryptoJS is missing module 84159.'
            );
        }
        e.exports = n;
    },
};
