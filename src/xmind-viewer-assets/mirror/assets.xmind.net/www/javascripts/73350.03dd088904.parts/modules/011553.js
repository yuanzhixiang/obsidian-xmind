export default {
    11553: function (e) {
        'use strict';
        const t = window.__xmindPackageHammer;
        if (!t)
            throw new Error(
                'XMind viewer runtime requires package-provided Hammer.js.'
            );
        e.exports = t;
        e.exports.default = t;
    },
};
