export default [
    function (e) {
        'use strict';
        const t = window.__xmindPackageBase64Js;
        if (!t)
            throw new Error(
                'XMind viewer runtime requires package-provided base64-js.'
            );
        e.exports = t;
    },
];
