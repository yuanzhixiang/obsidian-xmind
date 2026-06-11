export default {
    80930: function (e, t, i) {
        'use strict';
        const n = window.__xmindPackagePointsOnPath;
        if (!n || typeof n.pointsOnPath !== 'function') {
            throw new Error(
                'XMind viewer runtime requires package-provided points-on-path.'
            );
        }
        (i.r(t),
            i.d(t, {
                pointsOnPath: function () {
                    return n.pointsOnPath;
                },
            }));
    },
};
