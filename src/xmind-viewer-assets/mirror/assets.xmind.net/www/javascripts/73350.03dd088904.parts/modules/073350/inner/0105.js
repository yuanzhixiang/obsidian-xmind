export default [
    function (e, t, i) {
        'use strict';
        var n = i(0),
            r = i(28);
        const o = {
            [n.STYLE_LAYER.DYNAMIC_PRIORITY]: Object.keys(r.a).reduce(
                (e, t) => {
                    const i = r.a[t];
                    return (
                        Object.keys(i).forEach((n) => {
                            e.push({
                                type: t,
                                test: (e) => e.type === n,
                                value: (e) =>
                                    'function' == typeof i[e.type]
                                        ? i[e.type](e)
                                        : i[e.type],
                            });
                        }),
                        e
                    );
                },
                []
            ),
        };
        t.a = o;
    },
];
