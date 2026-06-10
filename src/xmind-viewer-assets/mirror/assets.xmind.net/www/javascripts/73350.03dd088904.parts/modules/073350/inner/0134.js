export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return c;
        });
        var n = i(11),
            r = i(0),
            o = i(49),
            a = i(14);
        const { nextTick: s } = a.a,
            l = [
                r.TOPIC_ATTACHED,
                r.TOPIC_SUMMARY,
                r.TOPIC_DETACHED,
                r.TOPIC_CALLOUT,
            ];
        class c {
            constructor(e) {
                const t = [],
                    i = [];
                let a,
                    c = !0;
                const d = { isSync: !1 };
                let f;
                return {
                    layout: function (i, n) {
                        (f || (f = e.getModule(r.MODULE_NAME.SEMAPHORE)),
                            (i.isLayout = !1),
                            t.push({
                                branch: i,
                                layer: i.getLayer(),
                                options: n,
                            }),
                            t.sort((e, t) => e.layer - t.layer),
                            a ||
                                ((a = !0),
                                f.increase(r.UI_STATUS.LAYOUT),
                                d.isSync ? h() : s(h)));
                    },
                    config(e, t) {
                        return (void 0 !== t && (d[e] = t), d[e]);
                    },
                };
                function h() {
                    const { centralBranchView: s } = e.getSheetView();
                    for (; t.length > 0; ) {
                        const e = t.pop();
                        (e.options &&
                            'function' == typeof e.options.afterward &&
                            i.push(e.options.afterward),
                            e.branch.parent() && Object(o.a)(e.branch));
                    }
                    (n.a.preorderIterate(s, l, (e) => {
                        if (e._noAnimation || c)
                            return (
                                (function (e) {
                                    const t = !0;
                                    n.a.preorderIterate(e, l, (e) =>
                                        e.refreshView(t)
                                    );
                                })(e),
                                delete e._noAnimation,
                                n.a.SKIP
                            );
                        {
                            const t = !1;
                            return e.refreshView(t);
                        }
                    }),
                        i.forEach((e) => {
                            e();
                        }),
                        (i.length = 0),
                        (a = !1),
                        c && (c = !1),
                        f.decrease(r.UI_STATUS.LAYOUT));
                }
            }
        }
        c.identifier = r.MODULE_NAME.LAYOUT;
    },
];
