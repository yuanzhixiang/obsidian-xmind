export default {
    73677: function (e) {
        const t = window.__xmindPackageCryptoJS;
        if (!t) {
            throw new Error(
                'XMind viewer runtime requires package-provided CryptoJS.'
            );
        }
        const n = t.x64;
        if (!n) {
            throw new Error(
                'XMind viewer runtime CryptoJS is missing module 73677.'
            );
        }
        e.exports = n;
    },
};
