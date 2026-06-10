export default [
    function (e, t, i) {
        'use strict';
        var n = i(0),
            r = i(1),
            o = i(3);
        const a = {
            beforeDefault: [
                n.STYLE_KEYS.MARGIN_LEFT,
                n.STYLE_KEYS.MARGIN_TOP,
                n.STYLE_KEYS.MARGIN_RIGHT,
                n.STYLE_KEYS.MARGIN_BOTTOM,
                n.STYLE_KEYS.SPACING_MAJOR,
                n.STYLE_KEYS.SPACING_MINOR,
            ].map((e) => ({
                type: e,
                value: (t) => {
                    const i = o.a.getClassName(t);
                    return n.COMPACT_LAYOUT_PARAMS[i][e];
                },
                test: r.isBranch,
            })),
        };
        t.a = a;
    },
];
