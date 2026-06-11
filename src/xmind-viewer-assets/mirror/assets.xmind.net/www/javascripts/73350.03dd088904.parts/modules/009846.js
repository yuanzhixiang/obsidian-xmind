export default {
    9846: function (e) {
        const t = window.__xmindPackageInherits;
        if (!t) {
            throw new Error(
                'XMind viewer runtime requires package-provided inherits.'
            );
        }
        e.exports = t;
    },
};
