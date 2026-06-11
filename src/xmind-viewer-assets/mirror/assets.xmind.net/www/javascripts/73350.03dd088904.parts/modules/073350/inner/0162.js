export default [
    function (e) {
        'use strict';
        const t = window.__xmindPackageBuffer;
        if (!t)
            throw new Error(
                'XMind viewer runtime requires package-provided Buffer.'
            );
        e.exports = t;
    },
];
