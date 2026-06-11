export default {
    22625: function (e) {
        'use strict';
        const t = window.__xmindPackageMobX,
            n = {};
        if (!t)
            throw new Error(
                'XMind viewer runtime requires package-provided MobX.'
            );
        ('undefined' != typeof Symbol &&
            Symbol.toStringTag &&
            Object.defineProperty(n, Symbol.toStringTag, {
                value: 'Module',
            }),
            Object.defineProperty(n, '__esModule', { value: !0 }),
            Object.getOwnPropertyNames(t).forEach(function (e) {
                '__esModule' !== e &&
                    Object.defineProperty(n, e, {
                        enumerable: !0,
                        get: function () {
                            return t[e];
                        },
                    });
            }),
            (e.exports = n));
    },
};
