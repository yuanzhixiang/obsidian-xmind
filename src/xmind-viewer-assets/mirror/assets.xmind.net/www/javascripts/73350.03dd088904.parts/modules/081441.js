export default {
    81441: function (e) {
        const t = window.__xmindPackageCryptoJS;
        if (!t) {
            throw new Error(
                'XMind viewer runtime requires package-provided CryptoJS.'
            );
        }
        const n = t.algo && t.algo.HMAC;
        if (!n) {
            throw new Error(
                'XMind viewer runtime CryptoJS is missing module 81441.'
            );
        }
        e.exports = n;
    },
};
