export default [
    function (e, t, i) {
        'use strict';
        var n = i(9),
            r = i(1),
            o = i(0);
        const a = n.a.BOUNDARYGAP,
            s = {
                CALLOUTPOSAVAILABLE: {
                    isAvailable: !0,
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                },
                sortBoundaries: function (e) {
                    const t = e.length;
                    let i, n, r;
                    for (n = 0; n < t - 1; n++) {
                        const o = e[n].model.rangeStart,
                            a = e[n].model.rangeEnd;
                        for (r = n + 1; r < t; r++) {
                            const t = e[r].model.rangeStart,
                                s = e[r].model.rangeEnd;
                            (o < t || (o === t && a > s)) &&
                                ((i = e[n]), (e[n] = e[r]), (e[r] = i));
                        }
                    }
                    return e;
                },
                isLineTapered: function (e) {
                    const t = e.editDomain().content();
                    if (!t) return !1;
                    if (!e.isCentralBranch()) return !1;
                    return 'tapered' === t.figure.lineTapered;
                },
                setBoundaryPadding(e) {
                    Array.isArray(e.boundaries) &&
                        e.boundaries.forEach((t) => {
                            let i =
                                t.figure.isVisible &&
                                Object(r.calcBoundaryTitleSize)(e, t);
                            i &&
                                (t.titleView.setSize(i),
                                t.titleView.figure.setPreferredSize(i));
                        });
                    e.getChildrenBranchesByType('attached').forEach((t, i) => {
                        ((t.boundaryBounds = Object.assign({}, t.bounds)),
                            e.boundaries.length && l(e, t, i));
                    });
                    e.getChildrenBranchesByType([
                        'callout',
                        'summary',
                        'detached',
                    ]).forEach((e, t) => {
                        ((e.boundaryBounds = Object.assign({}, e.bounds)),
                            e.boundaries.length && l(e, e, t));
                    });
                },
                restrictCalloutToRight: function (e, t) {
                    const i = e.parent().topicView.bounds,
                        n =
                            t.x +
                            e.boundaryBounds.x +
                            e.boundaryBounds.width -
                            (i.x + i.width);
                    return n <= 0
                        ? s.CALLOUTPOSAVAILABLE
                        : {
                              isAvailable: !1,
                              top: 0,
                              bottom: 0,
                              left: Math.abs(n),
                              right: 0,
                          };
                },
                restrictCalloutToLeft: function (e, t) {
                    const i = e.parent().topicView.bounds,
                        n = t.x + e.boundaryBounds.x - i.x;
                    return n >= 0
                        ? s.CALLOUTPOSAVAILABLE
                        : {
                              isAvailable: !1,
                              top: 0,
                              bottom: 0,
                              left: 0,
                              right: Math.abs(n),
                          };
                },
                restrictCalloutToBottom: function (e, t) {
                    const i = e.parent().topicView.bounds,
                        n =
                            t.y +
                            e.boundaryBounds.y +
                            e.boundaryBounds.height -
                            i.y;
                    return n <= 0
                        ? s.CALLOUTPOSAVAILABLE
                        : {
                              isAvailable: !1,
                              top: Math.abs(n),
                              bottom: 0,
                              left: 0,
                              right: 0,
                          };
                },
                restrictCalloutToTop: function (e, t) {
                    const i = e.parent().topicView.bounds,
                        n = t.y + e.boundaryBounds.y - (i.y + i.height);
                    return n >= 0
                        ? s.CALLOUTPOSAVAILABLE
                        : {
                              isAvailable: !1,
                              top: 0,
                              bottom: Math.abs(n),
                              left: 0,
                              right: 0,
                          };
                },
                mergeCalloutOffset: function (...e) {
                    const t = {
                        isAvailable: !0,
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                    };
                    return (
                        (t.isAvailable = e.every((e) => e.isAvailable)),
                        e.forEach((e) => {
                            ((t.top += e.top),
                                (t.bottom += e.bottom),
                                (t.left += e.left),
                                (t.right += e.right));
                        }),
                        t
                    );
                },
                calcBoundaryTitle(e) {
                    const t = e.getTitleSize().height;
                    return !e.model.get('title') ||
                        e.shouldPreventTitle() ||
                        0 === t
                        ? 0
                        : t;
                },
                mergeBounds(e, t) {
                    const i = Object.assign({}, t),
                        n = e.reduce(
                            (e, t) =>
                                Math.max(
                                    e,
                                    t.position.x +
                                        t.boundaryBounds.x +
                                        t.boundaryBounds.width
                                ),
                            i.x + i.width
                        );
                    ((i.x = e.reduce(
                        (e, t) =>
                            Math.min(e, t.position.x + t.boundaryBounds.x),
                        i.x
                    )),
                        (i.width = n - i.x));
                    const r = e.reduce(
                        (e, t) =>
                            Math.max(
                                e,
                                t.position.y +
                                    t.boundaryBounds.y +
                                    t.boundaryBounds.height
                            ),
                        i.y + i.height
                    );
                    return (
                        (i.y = e.reduce(
                            (e, t) =>
                                Math.min(e, t.position.y + t.boundaryBounds.y),
                            i.y
                        )),
                        (i.height = r - i.y),
                        i
                    );
                },
            };
        function l(e, t, i) {
            t.outsidePadding = {
                up: 0,
                down: 0,
                left: 0,
                right: 0,
            };
            const n = e.getDirection();
            (e.boundaries.forEach((r) => {
                const o = s.calcBoundaryTitle(r);
                if ('master' === r.model.get('range'))
                    return (
                        (e.outsidePadding.up = a + o),
                        (e.outsidePadding.down = a),
                        (e.outsidePadding.left = a),
                        (e.outsidePadding.right = a),
                        (e.boundaryBounds.y -= a - o),
                        (e.boundaryBounds.height += 2 * a + o),
                        (e.boundaryBounds.x -= a),
                        void (e.boundaryBounds.width += 2 * a)
                    );
                (i >= r.model.rangeStart &&
                    i <= r.model.rangeEnd &&
                    ('UD' === n
                        ? ((t.outsidePadding.left += a),
                          (t.outsidePadding.right += a))
                        : ((t.outsidePadding.up += a + o),
                          (t.outsidePadding.down += a))),
                    i === r.model.rangeStart &&
                        ('UD' === n
                            ? c(e, i)
                                ? (t.outsidePadding.down += a)
                                : (t.outsidePadding.up += a + o)
                            : (t.outsidePadding.left += a)),
                    i === r.model.rangeEnd &&
                        ('UD' === n
                            ? c(e, i)
                                ? (t.outsidePadding.up += a + o)
                                : (t.outsidePadding.down += a)
                            : (t.outsidePadding.right += a)));
            }),
                (t.boundaryBounds.y -= t.outsidePadding.up),
                (t.boundaryBounds.height +=
                    t.outsidePadding.up + t.outsidePadding.down),
                (t.boundaryBounds.x -= t.outsidePadding.left),
                (t.boundaryBounds.width +=
                    t.outsidePadding.right + t.outsidePadding.left));
        }
        function c(e, t) {
            return e.getRangeGrowthDirection(t) === o.DIRECTION.UP;
        }
        t.a = s;
    },
];
