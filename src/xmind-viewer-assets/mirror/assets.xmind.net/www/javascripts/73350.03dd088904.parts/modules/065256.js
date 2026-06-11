export default {
    65256: function (e) {
        const t = window.__xmindPackageCryptoJS;
        if (!t) {
            throw new Error(
                'XMind viewer runtime requires package-provided CryptoJS.'
            );
        }
        const n = t.RC4;
        if (!n) {
            throw new Error(
                'XMind viewer runtime CryptoJS is missing module 65256.'
            );
        }
        e.exports = n;
    },
};
