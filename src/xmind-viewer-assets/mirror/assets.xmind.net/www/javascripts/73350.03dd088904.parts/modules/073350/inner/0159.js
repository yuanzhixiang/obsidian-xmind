export default [
    function (e, t, i) {
        'use strict';
        (i.r(t),
            function (e) {
                var n = i(0),
                    r = i(11),
                    o = i(3),
                    a = i(123),
                    s = i(99),
                    l = i(81),
                    c = i(149),
                    d = i(16),
                    f = i(129),
                    h = i(130),
                    p = i(1),
                    T = i(150),
                    u = i(6),
                    g = i(12),
                    Q = i.n(g),
                    m = i(26),
                    b = i(72);
                i(166);
                h.a.forEach((e) => {
                    l.a.registerModule(e);
                });
                const C = {
                    $: Q(),
                    _: u,
                    Backbone: m,
                    formatconverter: T.a,
                    SheetEditor: l.a,
                    WorkbookEditor: c.a,
                    constant: n,
                    Model: { Workbook: a.a, Sheet: s.a },
                    utils: {
                        UUID: r.a.UUID,
                        UndoManager: b.a,
                        mommonFuncs: r.a,
                        styleManager: o.a,
                        utils: p,
                    },
                    config: function (...e) {
                        if (1 === e.length && 'string' == typeof e[0])
                            return d.b.get(e[0]);
                        d.b.set(...e);
                    },
                };
                ((e.Snowbrush = C), Object(f.a)(), (t.default = C));
            }.call(this, i(83)));
    },
];
