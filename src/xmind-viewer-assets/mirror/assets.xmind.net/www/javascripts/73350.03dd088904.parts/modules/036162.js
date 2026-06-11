export default {
    36162: function (e) {
        const t = window.__xmindPackageCryptoJS;
        if (!t) {
            throw new Error(
                'XMind viewer runtime requires package-provided CryptoJS.'
            );
        }
        const n = t.pad && t.pad.Iso97971;
        if (!n) {
            throw new Error(
                'XMind viewer runtime CryptoJS is missing module 36162.'
            );
        }
        e.exports = n;
    },
};
