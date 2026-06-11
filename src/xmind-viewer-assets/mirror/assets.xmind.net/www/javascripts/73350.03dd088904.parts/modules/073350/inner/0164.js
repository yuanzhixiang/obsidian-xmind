export default [
    function (e) {
        'use strict';
        const t = window.__xmindPackageIeee754;
        if (!t)
            throw new Error(
                'XMind viewer runtime requires package-provided ieee754.'
            );
        e.exports = t;
    },
];
