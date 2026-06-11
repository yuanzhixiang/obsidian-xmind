export default [
    function (e) {
        'use strict';
        const t = window.__xmindPackageProcess || window.process;
        if (!t || typeof t.nextTick !== 'function') {
            throw new Error(
                'XMind viewer runtime requires package-provided process shim.'
            );
        }
        e.exports = t;
    },
];
