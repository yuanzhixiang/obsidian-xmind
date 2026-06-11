export default {
    81224: function (e) {
        const t = window.__xmindPackagePath;
        if (!t) {
            throw new Error(
                'XMind viewer runtime requires package-provided path-browserify.'
            );
        }
        e.exports = t;
    },
};
