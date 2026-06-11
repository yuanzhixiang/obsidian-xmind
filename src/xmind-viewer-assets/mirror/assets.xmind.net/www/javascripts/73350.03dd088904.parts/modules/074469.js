export default {
    74469: function (e, t, i) {
        'use strict';
        const n = window.__xmindPackageSvgPoints;
        if (
            !n ||
            typeof n.toPath !== 'function' ||
            typeof n.toPoints !== 'function' ||
            typeof n.valid !== 'function'
        ) {
            throw new Error(
                'XMind viewer runtime requires package-provided svg-points.'
            );
        }

        (i.r(t),
            i.d(t, {
                toPath: function () {
                    return n.toPath;
                },
                toPoints: function () {
                    return n.toPoints;
                },
                valid: function () {
                    return n.valid;
                },
            }));
    },
};
