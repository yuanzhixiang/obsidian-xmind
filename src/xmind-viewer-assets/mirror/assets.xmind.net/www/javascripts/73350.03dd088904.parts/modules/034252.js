export default {
    34252: function (e) {
        const t = window.__xmindPackageCryptoJS;
        if (!t) {
            throw new Error(
                'XMind viewer runtime requires package-provided CryptoJS.'
            );
        }
        const n = t.pad && t.pad.AnsiX923;
        if (!n) {
            throw new Error(
                'XMind viewer runtime CryptoJS is missing module 34252.'
            );
        }
        e.exports = n;
    },
};
