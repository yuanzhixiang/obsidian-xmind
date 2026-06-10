export default [
    function (e, t, i) {
        'use strict';
        (i.d(t, 'g', function () {
            return l;
        }),
            i.d(t, 'f', function () {
                return c;
            }),
            i.d(t, 'h', function () {
                return f;
            }),
            i.d(t, 'j', function () {
                return d;
            }),
            i.d(t, 'i', function () {
                return h;
            }),
            i.d(t, 'e', function () {
                return p;
            }),
            i.d(t, 'd', function () {
                return T;
            }),
            i.d(t, 'a', function () {
                return u;
            }),
            i.d(t, 'c', function () {
                return g;
            }),
            i.d(t, 'b', function () {
                return Q;
            }));
        var n = i(1),
            r = i(0),
            o = i(32);
        function a(e, t) {
            let i;
            return (
                (i =
                    t === r.STYLE_KEYS.MARGIN_LEFT ||
                    t === r.STYLE_KEYS.MARGIN_RIGHT
                        ? n.layoutConstant.TREE_TABLE_CELL_PADDING_HORIZON
                        : n.layoutConstant.TREE_TABLE_CELL_PADDING_VERTICAL),
                (parseInt(e.style[t]) * i) /
                    parseInt(o.a.getStyleValue(e.classType, t))
            );
        }
        function s(e) {
            return parseInt(e.style[r.STYLE_KEYS.BORDER_LINE_WIDTH]);
        }
        function l(e) {
            return (
                s(e) +
                a(e, r.STYLE_KEYS.MARGIN_LEFT) +
                a(e, r.STYLE_KEYS.MARGIN_RIGHT)
            );
        }
        function c(e) {
            return (
                s(e) +
                a(e, r.STYLE_KEYS.MARGIN_TOP) +
                a(e, r.STYLE_KEYS.MARGIN_BOTTOM)
            );
        }
        function d(e, t) {
            return e.indexOf(t) !== e.lastIndexOf(t);
        }
        function f(e) {
            const t = e.style[r.STYLE_KEYS.TEXT_ALIGN],
                i = e.stopFlag ? e.bounds : e.topicBounds;
            let n = l(e) / 2 + Math.abs(i.x);
            switch (t) {
                case r.TEXTALIGN.CENTER:
                    n =
                        (e.externalInfo.cellWidth - i.width) / 2 +
                        Math.abs(i.x);
                    break;
                case r.TEXTALIGN.RIGHT:
                    n =
                        e.externalInfo.cellWidth -
                        i.width -
                        l(e) / 2 +
                        Math.abs(i.x);
            }
            return {
                cellX: -n,
                cellY: -(
                    (e.externalInfo.cellHeight - i.height) / 2 +
                    Math.abs(i.y)
                ),
            };
        }
        function h(e) {
            const { cellX: t, cellY: i } = f(e);
            return {
                x: e.externalInfo.cellPosition.x + Math.abs(t),
                y: e.externalInfo.cellPosition.y + Math.abs(i),
            };
        }
        function p(e, t) {
            const i = h(e),
                n = h(t);
            return { x: n.x - i.x, y: n.y - i.y };
        }
        function T(e) {
            const t = e[0].length;
            for (let i = 0; i < t; i++) {
                const n = e.map((e) => ({ row: e, item: e[i] })),
                    r = n.filter((e) => !d(e.row, e.item)),
                    o = Math.max(
                        ...r.map(
                            (e) =>
                                (e.item.stopFlag
                                    ? e.item.bounds.width
                                    : e.item.topicBounds.width) + l(e.item)
                        )
                    ),
                    a = n.filter((e) => d(e.row, e.item));
                let s = 0;
                const c = Array(t).fill(0);
                (a.forEach((e) => {
                    var t;
                    if (
                        ((e.item.externalInfo.cellWidth =
                            (null !== (t = e.item.externalInfo.cellWidth) &&
                            void 0 !== t
                                ? t
                                : 0) + o),
                        i === e.row.lastIndexOf(e.item))
                    ) {
                        const t =
                            (e.item.stopFlag
                                ? e.item.bounds.width
                                : e.item.topicBounds.width) + l(e.item);
                        e.item.externalInfo.cellWidth < t &&
                            ((s = Math.max(
                                t - e.item.externalInfo.cellWidth,
                                s
                            )),
                            (c[i] = s));
                    }
                }),
                    a.forEach((e) => {
                        e.item.externalInfo.cellWidth += c[i];
                    }),
                    r.forEach((e) => {
                        e.item.externalInfo.cellWidth = o + c[i];
                    }));
            }
        }
        function u(e) {
            const t = e.length;
            for (let i = 0; i < t; i++) {
                const n = e[i].map((t, i) => ({
                        col: e.map((e) => e[i]),
                        item: t,
                    })),
                    r = n.filter((e) => !d(e.col, e.item)),
                    o = Math.max(
                        ...r.map(
                            (e) =>
                                (e.item.stopFlag
                                    ? e.item.bounds.height
                                    : e.item.topicBounds.height) + c(e.item)
                        )
                    ),
                    a = n.filter((e) => d(e.col, e.item));
                let s = 0,
                    l = -1;
                const f = Array(t).fill(0);
                if (
                    (a.forEach((e) => {
                        var t;
                        if (
                            ((e.item.externalInfo.cellHeight =
                                (null !==
                                    (t = e.item.externalInfo.cellHeight) &&
                                void 0 !== t
                                    ? t
                                    : 0) + o),
                            i === e.col.lastIndexOf(e.item))
                        ) {
                            const t =
                                (e.item.stopFlag
                                    ? e.item.bounds.height
                                    : e.item.topicBounds.height) + c(e.item);
                            if (e.item.externalInfo.cellHeight < t) {
                                ((s = Math.max(
                                    t - e.item.externalInfo.cellHeight,
                                    s
                                )),
                                    (l = e.col.indexOf(e.item)));
                                const n = s / (i - l + 1);
                                for (let e = l; e <= i; e++) f[e] = n;
                            }
                        }
                    }),
                    -1 !== l)
                )
                    for (let t = l; t < i; t++)
                        Array.from(new Set(e[t]))
                            .map((t, i) => ({
                                col: e.map((e) => e[i]),
                                item: t,
                            }))
                            .forEach((e) => {
                                e.item.externalInfo.cellHeight += f[t];
                            });
                (a.forEach((e) => {
                    e.item.externalInfo.cellHeight += f[i];
                }),
                    r.forEach((e) => {
                        e.item.externalInfo.cellHeight = o + f[i];
                    }));
            }
        }
        function g(e) {
            e.forEach((e) => {
                let t = 0;
                Array.from(new Set(e)).forEach((e) => {
                    ((e.externalInfo.cellPosition = { x: t, y: 0 }),
                        (t += e.externalInfo.cellWidth));
                });
            });
            for (let t = 0; t < e[0].length; t++) {
                let i = 0;
                Array.from(new Set(e.map((e) => e[t]))).forEach((e) => {
                    ((e.externalInfo.cellPosition.y = i),
                        (i += e.externalInfo.cellHeight));
                });
            }
        }
        function Q(e) {
            const t = e.children[r.TOPIC_TYPE.ATTACHED];
            t.length &&
                t.forEach((t) => {
                    ((t.position = p(e, t)), t.stopFlag || Q(t));
                });
        }
    },
];
