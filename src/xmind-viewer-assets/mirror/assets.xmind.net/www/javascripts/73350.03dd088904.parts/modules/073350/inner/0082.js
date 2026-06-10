export default [
    function (e, t, i) {
        'use strict';
        (i.d(t, 'a', function () {
            return a;
        }),
            i.d(t, 'b', function () {
                return o;
            }));
        var n = i(11),
            r = i(0);
        const o = (e, t) => {
                for (const i of e) {
                    if (a(i, t) === n.a.BREAK) return n.a.BREAK;
                }
            },
            a = (e, t) =>
                n.a.postorderIterate(
                    e,
                    [
                        r.TOPIC_DETACHED,
                        r.TOPIC_CALLOUT,
                        r.TOPIC_SUMMARY,
                        r.TOPIC_ATTACHED,
                    ],
                    (e) => {
                        if (!e.shouldHide()) {
                            if (t(e)) return n.a.BREAK;
                        }
                    }
                );
    },
];
