export default {
    97240: function (e) {
        const t = window.__xmindPackageSvgPathData;
        if (!t) {
            throw new Error(
                'XMind viewer runtime requires package-provided svg-pathdata.'
            );
        }
        const i = {};
        for (const n in t) {
            if (Object.prototype.hasOwnProperty.call(t, n)) {
                i[n] = t[n];
            }
        }
        Object.defineProperty(i, '__esModule', { value: true });
        e.exports = i;
    },
};
