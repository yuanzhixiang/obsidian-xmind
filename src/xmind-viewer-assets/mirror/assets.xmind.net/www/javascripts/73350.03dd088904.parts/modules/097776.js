export default {
    97776: function (e) {
        'use strict';
        const t = window.__xmindPackageCommonmark;
        if (!t)
            throw new Error(
                'XMind viewer runtime requires package-provided CommonMark.'
            );
        e.exports = t.HtmlRenderer;
    },
};
