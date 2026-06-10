export default [
    function (e, t, i) {
        'use strict';
        (i.d(t, 'i', function () {
            return s;
        }),
            i.d(t, 'j', function () {
                return l;
            }),
            i.d(t, 'a', function () {
                return m;
            }),
            i.d(t, 'g', function () {
                return c;
            }),
            i.d(t, 'h', function () {
                return f;
            }),
            i.d(t, 'c', function () {
                return p;
            }),
            i.d(t, 'd', function () {
                return u;
            }),
            i.d(t, 'b', function () {
                return g;
            }),
            i.d(t, 'e', function () {
                return Q;
            }),
            i.d(t, 'f', function () {
                return T;
            }));
        var n = i(14),
            r = i(4),
            o = i(15);
        const a = ({ x: e, y: t, width: i, height: n }) => [
                { x: e, y: t },
                { x: e, y: t + n },
                { x: e + i, y: t + n },
                { x: e + i, y: t },
            ],
            s = o.b,
            l = o.t,
            c = (e) => e.cells[0],
            d = (e) => e.cells[1],
            f = (e) => {
                const t = d(e);
                return e.isTranspose ? t.columns : t.rows;
            },
            h = (e, t) => f(e)[t],
            p = (e, t, i) => h(e, t)[i],
            T = (e) => h(e, 0).slice(1),
            u = (e, t) => {
                let i = null;
                return (
                    f(e).forEach((r, o) => {
                        0 !== o &&
                            r.forEach((r, s) => {
                                if (0 === s) return;
                                const l = a(Object.assign({}, r.pos, r.size));
                                if (n.a.pointInPolygon(t, l)) {
                                    const l = p(e, o, 0),
                                        c = p(e, 0, s),
                                        d = l.item.parent(),
                                        f = c.item.text,
                                        h = r.getItems(),
                                        T = r.cells.find((e) =>
                                            n.a.pointInPolygon(
                                                t,
                                                a(
                                                    Object.assign(
                                                        Object.assign(
                                                            {},
                                                            e.pos
                                                        ),
                                                        e.size
                                                    )
                                                )
                                            )
                                        );
                                    i = {
                                        headBranch: d,
                                        label: f,
                                        items: h,
                                        cell: T,
                                    };
                                }
                            });
                    }),
                    i
                );
            },
            g = (e, t) => {
                t += 1;
                const i = d(e);
                return e.isTranspose ? i.getColumnSize(t) : i.getRowSize(t);
            },
            Q = (e, t) => p(e, (t += 1), 0).itemPos,
            m = (e) => {
                if ('none' === e) return 'none';
                {
                    const t = Object(r.c)(e).toHsv();
                    return (
                        (t.v = Math.min(t.v + 0.1, 0.99)),
                        Object(r.c)(t).toRgbString()
                    );
                }
            };
    },
];
