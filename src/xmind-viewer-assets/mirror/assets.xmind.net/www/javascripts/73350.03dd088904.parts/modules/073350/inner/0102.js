export default [
    function (e) {
        'use strict';
        const t = window.__xmindPackageFileSaver;
        if (!t || typeof t.saveAs !== 'function') {
            throw new Error(
                'XMind viewer runtime requires package-provided FileSaver.js.'
            );
        }
        e.exports = { saveAs: t.saveAs };
    },
];
