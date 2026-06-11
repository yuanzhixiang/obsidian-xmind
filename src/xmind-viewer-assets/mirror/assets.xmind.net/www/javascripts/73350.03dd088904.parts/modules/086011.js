export default {
    86011: function (e) {
        const t = window.__xmindPackageUtil;
        if (!t) {
            throw new Error(
                'XMind viewer runtime requires package-provided util.'
            );
        }
        e.exports = t;
    },
};
