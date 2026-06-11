export default {
    70251: function (e) {
        'use strict';
        const t = window.__xmindPackageUnderscore,
            n = {};
        if (!t)
            throw new Error(
                'XMind viewer runtime requires package-provided Underscore.'
            );
        ('undefined' != typeof Symbol &&
            Symbol.toStringTag &&
            Object.defineProperty(n, Symbol.toStringTag, {
                value: 'Module',
            }),
            Object.defineProperty(n, '__esModule', { value: !0 }),
            Object.defineProperty(n, 'default', {
                enumerable: !0,
                value: t,
            }),
            Object.getOwnPropertyNames(t).forEach(function (e) {
                'default' !== e &&
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
