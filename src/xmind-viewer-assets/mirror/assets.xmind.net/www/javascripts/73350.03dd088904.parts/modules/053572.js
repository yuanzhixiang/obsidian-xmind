export default {
    53572: function (e) {
        const t = window.__xmindPackageCryptoJS;
        if (!t) {
            throw new Error(
                'XMind viewer runtime requires package-provided CryptoJS.'
            );
        }
        const n = t.pad && t.pad.Iso10126;
        if (!n) {
            throw new Error(
                'XMind viewer runtime CryptoJS is missing module 53572.'
            );
        }
        e.exports = n;
    },
};
