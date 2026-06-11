export default {
    25439: function (e) {
        const t = window.__xmindPackageCryptoJS;
        if (!t) {
            throw new Error(
                'XMind viewer runtime requires package-provided CryptoJS.'
            );
        }
        const n = t.MD5;
        if (!n) {
            throw new Error(
                'XMind viewer runtime CryptoJS is missing module 25439.'
            );
        }
        e.exports = n;
    },
};
