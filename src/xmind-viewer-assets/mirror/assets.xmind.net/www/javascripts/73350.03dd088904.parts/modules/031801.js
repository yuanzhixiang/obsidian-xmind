export default {
    31801: function (e) {
        'use strict';
        const t = window.__xmindPackageCommonmark;
        if (!t)
            throw new Error(
                'XMind viewer runtime requires package-provided CommonMark.'
            );
        e.exports = t.Node;
    },
};
