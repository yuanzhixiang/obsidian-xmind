export default {
    55522: function (e) {
        'use strict';
        const t = 'undefined' != typeof window ? window : globalThis,
            i = t.jQuery || t.$;
        if (!i)
            throw new Error(
                'XMind viewer runtime requires package-provided jQuery.'
            );
        e.exports = i;
    },
};
