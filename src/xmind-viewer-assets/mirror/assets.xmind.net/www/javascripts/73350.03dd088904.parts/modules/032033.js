export default {
    32033: function (e, t, i) {
        'use strict';
        const n = window.__xmindPackagePoints;
        const r = [
            'add',
            'boundingBox',
            'cubify',
            'length',
            'moveIndex',
            'offset',
            'position',
            'remove',
            'reverse',
            'rotate',
            'scale',
        ];
        if (!n || r.some((e) => typeof n[e] !== 'function')) {
            throw new Error(
                'XMind viewer runtime requires package-provided points.'
            );
        }

        (i.r(t),
            i.d(t, {
                add: function () {
                    return n.add;
                },
                boundingBox: function () {
                    return n.boundingBox;
                },
                cubify: function () {
                    return n.cubify;
                },
                length: function () {
                    return n.length;
                },
                moveIndex: function () {
                    return n.moveIndex;
                },
                offset: function () {
                    return n.offset;
                },
                position: function () {
                    return n.position;
                },
                remove: function () {
                    return n.remove;
                },
                reverse: function () {
                    return n.reverse;
                },
                rotate: function () {
                    return n.rotate;
                },
                scale: function () {
                    return n.scale;
                },
            }));
    },
};
