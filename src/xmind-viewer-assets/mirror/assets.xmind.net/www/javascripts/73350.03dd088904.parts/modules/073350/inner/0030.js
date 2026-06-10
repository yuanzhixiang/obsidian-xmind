export default [
    function (e, t, i) {
        'use strict';
        var n = i(0),
            r = i(16),
            o = i(9),
            a = i(7),
            s = i(1),
            l = i(3),
            c = i(15),
            d = i(23),
            f = i(24),
            h = i(10);
        const p = [
            n.STRUCTURECLASS.TREELEFT,
            n.STRUCTURECLASS.TREERIGHT,
            n.STRUCTURECLASS.TIMELINEHORIZONTALDOWN,
            n.STRUCTURECLASS.TIMELINEVERTICAL,
            n.STRUCTURECLASS.TREESIDED,
        ];
        var T = Object(f.b)(
                Object(f.e)([
                    {
                        test: (e) =>
                            e === n.STRUCTURECLASS.TIMELINEHORIZONTALUP,
                        brush: {
                            horizonBrush: (e) => Object(h.a)(e, !0),
                            verticalBrush: h.r,
                            taperedHorizonBrush: h.v,
                            taperedVerticalBrush: h.I,
                        },
                    },
                    {
                        test: (e) => p.includes(e),
                        brush: {
                            horizonBrush: h.a,
                            verticalBrush: h.r,
                            taperedHorizonBrush: h.v,
                            taperedVerticalBrush: h.I,
                        },
                    },
                    {
                        isDefault: !0,
                        test: () => !0,
                        brush: {
                            horizonBrush: h.q,
                            verticalBrush: h.r,
                            taperedHorizonBrush: h.H,
                            taperedVerticalBrush: h.I,
                        },
                    },
                ])
            ),
            u = Object(f.a)({
                verticalBrush: h.f,
                fullVerticalBrush: h.k,
                taperedVerticalBrush: h.y,
                fullTaperedVerticalBrush: h.l,
            }),
            g = Object(f.a)({
                verticalBrush: h.b,
                taperedVerticalBrush: h.w,
            }),
            Q = Object(f.a)({
                verticalBrush: h.c,
                taperedVerticalBrush: h.x,
            }),
            m = Object(f.a)({ verticalBrush: h.d }, !0),
            b = Object(f.a)({ verticalBrush: h.e }, !0),
            C = i(14),
            L = i(74),
            y = i(17);
        var M = Object(f.e)([
            {
                test: (e) =>
                    [
                        n.STRUCTURECLASS.MAPUNBALANCED,
                        n.STRUCTURECLASS.MAPCLOCKWISE,
                        n.STRUCTURECLASS.MAP,
                        n.STRUCTURECLASS.ORGCHARTDOWN,
                        n.STRUCTURECLASS.ORGCHARTUP,
                        n.STRUCTURECLASS.LOGICRIGHT,
                        n.STRUCTURECLASS.LOGICLEFT,
                        n.STRUCTURECLASS.TREERIGHT,
                        n.STRUCTURECLASS.TREELEFT,
                    ].includes(e),
                brush: {
                    verticalBrush: h.j,
                    horizonBrush: h.i,
                    taperedHorizonBrush: (e, t) => Object(h.B)(e, t, !0),
                    taperedVerticalBrush: (e, t) => Object(h.C)(e, t, !0),
                },
            },
            {
                isDefault: !0,
                test: () => !0,
                brush: {
                    verticalBrush: h.j,
                    horizonBrush: h.i,
                    taperedHorizonBrush: h.B,
                    taperedVerticalBrush: h.C,
                },
            },
        ]);
        const A = [
            n.STRUCTURECLASS.TREELEFT,
            n.STRUCTURECLASS.TREERIGHT,
            n.STRUCTURECLASS.TIMELINEHORIZONTALUP,
            n.STRUCTURECLASS.TIMELINEHORIZONTALDOWN,
            n.STRUCTURECLASS.TIMELINEVERTICAL,
            n.STRUCTURECLASS.TREESIDED,
        ];
        var v = Object(f.e)([
                {
                    test: (e, t, i) =>
                        !Object(s.isCentralBranch)(i) && A.includes(e),
                    brush: {
                        verticalBrush: h.t,
                        horizonBrush: (e) => Object(h.s)(e, 0.5),
                        taperedVerticalBrush: h.K,
                        taperedHorizonBrush: (e, t) => Object(h.J)(e, t, 0.5),
                    },
                },
                {
                    isDefault: !0,
                    test: () => !0,
                    brush: {
                        verticalBrush: h.t,
                        horizonBrush: h.s,
                        taperedHorizonBrush: h.J,
                        taperedVerticalBrush: h.K,
                    },
                },
            ]),
            E = Object(f.d)({
                verticalBrush: h.t,
                horizonBrush: h.s,
                taperedHorizonBrush: h.J,
                taperedVerticalBrush: h.K,
            });
        function _(e) {
            const { startPt: t, endPt: i } = e;
            return `M ${t.x} ${t.y}L ${i.x} ${i.y}`;
        }
        var O = Object(f.e)(
            [
                {
                    test: (e) =>
                        [
                            n.STRUCTURECLASS.MAPUNBALANCED,
                            n.STRUCTURECLASS.MAPCLOCKWISE,
                            n.STRUCTURECLASS.MAP,
                            n.STRUCTURECLASS.ORGCHARTDOWN,
                            n.STRUCTURECLASS.ORGCHARTUP,
                            n.STRUCTURECLASS.LOGICRIGHT,
                            n.STRUCTURECLASS.LOGICLEFT,
                            n.STRUCTURECLASS.TREERIGHT,
                            n.STRUCTURECLASS.TREELEFT,
                        ].includes(e),
                    brush: {
                        verticalBrush: h.p,
                        horizonBrush: h.o,
                        taperedHorizonBrush: (e, t, i) =>
                            Object(h.F)(e, t, i, !0),
                        taperedVerticalBrush: (e, t, i) =>
                            Object(h.G)(e, t, i, !0),
                    },
                },
                {
                    isDefault: !0,
                    test: () => !0,
                    brush: {
                        verticalBrush: h.p,
                        horizonBrush: h.o,
                        taperedHorizonBrush: h.F,
                        taperedVerticalBrush: h.G,
                    },
                },
            ],
            (e) => [parseInt(`${e.topicView.figure.lineCorner || 0}`)]
        );
        const S = [
            n.STRUCTURECLASS.TREELEFT,
            n.STRUCTURECLASS.TREERIGHT,
            n.STRUCTURECLASS.TIMELINEHORIZONTALUP,
            n.STRUCTURECLASS.TIMELINEHORIZONTALDOWN,
            n.STRUCTURECLASS.TIMELINEVERTICAL,
            n.STRUCTURECLASS.TREESIDED,
        ];
        var x = Object(f.e)([
            {
                test: (e, t, i) =>
                    !Object(s.isCentralBranch)(i) && S.includes(e),
                brush: {
                    verticalBrush: h.n,
                    horizonBrush: (e) => Object(h.m)(e, 0.4),
                    taperedVerticalBrush: h.E,
                    taperedHorizonBrush: (e, t) => Object(h.D)(e, t, 0.4),
                },
            },
            {
                isDefault: !0,
                test: () => !0,
                brush: {
                    verticalBrush: h.n,
                    horizonBrush: h.m,
                    taperedHorizonBrush: h.D,
                    taperedVerticalBrush: h.E,
                },
            },
        ]);
        const R = {
            [n.BRANCHCONNECTION.CALLOUTLINE]: function (e) {
                const t = e.parent();
                if (!(t instanceof y.a)) return;
                const i = e.linePosition,
                    n = t.linePosition,
                    r = C.a.topicInsectLine(e, n),
                    o = C.a.topicInsectLine(t, i),
                    a = e.topicView,
                    l = Object(s.isHandDrawnLinePattern)(
                        a.figure.borderLinePattern
                    )
                        ? Object(s.getFillPatternAttr)(a.figure.fillPattern, {
                              fillPath: a.figure.topicShapeFillPath,
                              isForceHandDrawnSolid: !0,
                          }).d
                        : a.figure.topicShapeFillPath,
                    c = Object(L.f)(l),
                    d = r.at;
                let f = d - 8;
                f < 0 && (f += c);
                let h = d + 8;
                h > c && (h -= c);
                const p = Object(L.c)(l, f),
                    T = Object(L.c)(l, h),
                    u = e.topicView.figure.borderWidth + 1,
                    g = p.x > 0 ? -u : u,
                    Q = T.x > 0 ? -u : u,
                    m = p.y > 0 ? -u : u,
                    b = T.y > 0 ? -u : u,
                    M = {
                        x: parseInt(p.x + e.linePosition.x) + g,
                        y: parseInt(p.y + e.linePosition.y) + m,
                    },
                    A = {
                        x: parseInt(T.x + e.linePosition.x) + Q,
                        y: parseInt(T.y + e.linePosition.y) + b,
                    },
                    v = `M ${M.x} ${M.y} L ${parseInt(o.x)} ${parseInt(o.y)} L ${A.x} ${A.y}`,
                    E = e.getConnectionView();
                (E.figure.setLinePath(v),
                    E.figure.setLineTapered(!0),
                    E.figure.setLineColor(e.topicView.figure.fillColor),
                    (function (e, t, i, n) {
                        const r = e.getSvg().transform(),
                            o = {
                                x: -1e4,
                                y: -1e4,
                                width: 2e4,
                                height: 2e4,
                            },
                            a = `M ${o.x} ${o.y} L${o.x + o.width} ${o.y} L${o.x + o.width} ${o.y + o.height} L${o.x} ${o.y + o.height}`,
                            s = {
                                x: t.x - r.x.valueOf(),
                                y: t.y - r.y.valueOf(),
                            },
                            l = {
                                x: i.x - r.x.valueOf(),
                                y: i.y - r.y.valueOf(),
                            },
                            c = {
                                x: parseInt('' + (n.x - r.x.valueOf())),
                                y: parseInt('' + (n.y - r.y.valueOf())),
                            },
                            d = `M ${s.x} ${s.y} L ${c.x} ${c.y} L ${l.x} ${l.y}`;
                        e.topicView.setTopicShapeMaskAttrD(`${d} ${a}`);
                    })(e, M, A, o));
            },
            [n.BRANCHCONNECTION.HORIZONTAL]: function (e, t) {
                return (
                    Object(f.g)(e, t.startPt, t.endPt),
                    Object(f.f)({ verticalBrush: _ }, e, t, !1, !0)
                );
            },
            [n.BRANCHCONNECTION.STRAIGHT]: function (e, t, i) {
                const r = e.parent(),
                    o = Object(a.p)(r, e),
                    s = Object(a.g)(r, e),
                    l = o === n.DIRECTION.DOWN || o === n.DIRECTION.UP,
                    c = s === n.DIRECTION.DOWN || s === n.DIRECTION.UP;
                return (
                    Object(f.g)(e, t.startPt, t.endPt),
                    Object(f.f)(
                        {
                            taperedHorizonBrush: h.L,
                            horizonBrush: h.u,
                        },
                        e,
                        t,
                        i,
                        !1,
                        [l, c]
                    )
                );
            },
            [n.BRANCHCONNECTION.CURVE]: function (e, t, i, r) {
                const o = Object(a.p)(e.parent(), e),
                    s = o === n.DIRECTION.DOWN || o === n.DIRECTION.UP;
                return (
                    Object(f.g)(e, t.startPt, t.endPt),
                    Object(f.f)(
                        {
                            horizonBrush: h.g,
                            verticalBrush: h.h,
                            taperedHorizonBrush: h.z,
                            taperedVerticalBrush: h.A,
                        },
                        e,
                        t,
                        i,
                        r,
                        [void 0, s]
                    )
                );
            },
            [n.BRANCHCONNECTION.BIGHT]: T,
            [n.BRANCHCONNECTION.BRACE]: u,
            [n.BRANCHCONNECTION.BRACE2]: g,
            [n.BRANCHCONNECTION.BRACE3]: Q,
            [n.BRANCHCONNECTION.BRACE4]: m,
            [n.BRANCHCONNECTION.BRACE5]: b,
            [n.BRANCHCONNECTION.ELBOW]: M,
            [n.BRANCHCONNECTION.FOLD]: v,
            [n.BRANCHCONNECTION.FOLD2]: E,
            [n.BRANCHCONNECTION.NONE]: (e) => {
                e.getConnectionView().figure.setLinePath('');
            },
            [n.BRANCHCONNECTION.ROUNDEDELBOW]: O,
            [n.BRANCHCONNECTION.ROUNDEDFOLD]: x,
        };
        var I = (e) =>
                R[e]
                    ? R[e].bind(R)
                    : (r.b
                          .get(n.CONFIG.LOGGER)
                          .warn(`Unsupported topic line style: ${e}`),
                      R[n.BRANCHCONNECTION.CURVE]),
            N = i(25);
        const w = 20,
            P = {
                [n.SUMMARYCONNECTION.ANGLE]: function (e, t) {
                    const i = t.startPos,
                        n = t.middlePos,
                        r = t.endPos,
                        o =
                            'M ' +
                            i.x +
                            ' ' +
                            i.y +
                            '  ' +
                            n.x +
                            ' ' +
                            n.y +
                            '  ' +
                            r.x +
                            ' ' +
                            r.y;
                    e.getConnectionView().figure.setLinePath(o);
                },
                [n.SUMMARYCONNECTION.CURLY]: function (e, t, i) {
                    const n = t.startPos,
                        r = t.middlePos,
                        o = t.endPos,
                        a = e.getConnectionView().getLineWidth(),
                        s = l(r, n, a) + l(r, o, a);
                    function l(e, t, n) {
                        const r = 0.3;
                        let o;
                        if (i) {
                            const i = e.x < t.x ? e.x - r : e.x + r,
                                a = e.x < t.x ? e.x + r : e.x - r,
                                s = t.x < e.x ? t.x + r : t.x - r,
                                l = t.x < e.x ? t.x - r : t.x + r,
                                c = (e.x + t.x) / 2,
                                d = (e.y + t.y) / 2,
                                f = d < t.y ? d + n / 2 : d - n / 2,
                                h = d < t.y ? d - n / 2 : d + n / 2,
                                p = t.y,
                                T = p < e.y ? p + n : p - n,
                                u = e.y,
                                g = u < t.y ? u + n : u - n;
                            o =
                                'M ' +
                                i +
                                ' ' +
                                e.y +
                                'Q ' +
                                i +
                                ' ' +
                                p +
                                ', ' +
                                c +
                                ' ' +
                                f +
                                'Q ' +
                                s +
                                ' ' +
                                g +
                                ', ' +
                                s +
                                ' ' +
                                t.y +
                                'L ' +
                                l +
                                ' ' +
                                t.y +
                                'Q ' +
                                l +
                                ' ' +
                                u +
                                ', ' +
                                c +
                                ' ' +
                                h +
                                'Q ' +
                                a +
                                ' ' +
                                T +
                                ', ' +
                                a +
                                ' ' +
                                e.y +
                                'L ' +
                                i +
                                ' ' +
                                e.y;
                        } else {
                            const i = e.y < t.y ? e.y - r : e.y + r,
                                a = e.y < t.y ? e.y + r : e.y - r,
                                s = t.y < e.y ? t.y + r : t.y - r,
                                l = t.y < e.y ? t.y - r : t.y + r,
                                c = (e.x + t.x) / 2,
                                d = (e.y + t.y) / 2,
                                f = c < t.x ? c + n / 2 : c - n / 2,
                                h = c < t.x ? c - n / 2 : c + n / 2,
                                p = t.x,
                                T = p < e.x ? p + n : p - n,
                                u = e.x,
                                g = u < t.x ? u + n : u - n;
                            o =
                                'M ' +
                                e.x +
                                ' ' +
                                i +
                                'Q ' +
                                p +
                                ' ' +
                                i +
                                ', ' +
                                f +
                                ' ' +
                                d +
                                'Q ' +
                                g +
                                ' ' +
                                s +
                                ', ' +
                                t.x +
                                ' ' +
                                s +
                                'L ' +
                                t.x +
                                ' ' +
                                l +
                                'Q ' +
                                u +
                                ' ' +
                                l +
                                ', ' +
                                h +
                                ' ' +
                                d +
                                'Q ' +
                                T +
                                ' ' +
                                a +
                                ', ' +
                                e.x +
                                ' ' +
                                a +
                                'L ' +
                                e.x +
                                ' ' +
                                i;
                        }
                        return o;
                    }
                    e.getConnectionView().figure.setLinePath(s);
                },
                [n.SUMMARYCONNECTION.SQUARE]: function (e, t, i) {
                    const n = t.startPos,
                        r = t.middlePos,
                        o = t.endPos,
                        a = e.position.x >= 0 ? w : -20;
                    let s =
                        'M ' +
                        n.x +
                        ' ' +
                        n.y +
                        'L ' +
                        (n.x + a / 2) +
                        ' ' +
                        n.y +
                        'L ' +
                        (n.x + a / 2) +
                        ' ' +
                        r.y +
                        'L ' +
                        r.x +
                        ' ' +
                        r.y +
                        'M ' +
                        (n.x + a / 2) +
                        ' ' +
                        r.y +
                        'L ' +
                        (o.x + a / 2) +
                        ' ' +
                        o.y +
                        'L ' +
                        o.x +
                        ' ' +
                        o.y;
                    if (i) {
                        const t = e.position.y >= 0 ? w : -20;
                        s =
                            'M ' +
                            n.x +
                            ' ' +
                            n.y +
                            'L ' +
                            n.x +
                            ' ' +
                            (n.y + t / 2) +
                            'L ' +
                            r.x +
                            ' ' +
                            (n.y + t / 2) +
                            'L ' +
                            r.x +
                            ' ' +
                            r.y +
                            'M ' +
                            r.x +
                            ' ' +
                            (n.y + t / 2) +
                            'L ' +
                            o.x +
                            ' ' +
                            (o.y + t / 2) +
                            'L ' +
                            o.x +
                            ' ' +
                            o.y;
                    }
                    e.getConnectionView().figure.setLinePath(s);
                },
                [n.SUMMARYCONNECTION.ROUND]: function (e, t, i) {
                    const n = t.startPos,
                        r = t.middlePos,
                        o = t.endPos,
                        a = e.position.x >= 0 ? w : -20,
                        s = e.position.x >= 0 ? 1 : 0;
                    let l =
                        'M ' +
                        n.x +
                        ' ' +
                        n.y +
                        'A ' +
                        (a / 3) * 2 +
                        ' ' +
                        (o.y - n.y) / 2 +
                        ' 0 1 ' +
                        s +
                        ' ' +
                        o.x +
                        ' ' +
                        o.y +
                        'M ' +
                        (n.x + (a / 3) * 2) +
                        ' ' +
                        r.y +
                        'L ' +
                        r.x +
                        ' ' +
                        r.y;
                    if (i) {
                        const t = e.position.y >= 0 ? 0 : 1,
                            i = e.position.y >= 0 ? w : -20;
                        l =
                            'M ' +
                            n.x +
                            ' ' +
                            n.y +
                            'A ' +
                            (o.x - n.x) / 2 +
                            ' ' +
                            (i / 3) * 2 +
                            '  0 1 ' +
                            t +
                            ' ' +
                            o.x +
                            ' ' +
                            o.y +
                            'M ' +
                            r.x +
                            ' ' +
                            (n.y + (i / 3) * 2) +
                            'L ' +
                            r.x +
                            ' ' +
                            r.y;
                    }
                    e.getConnectionView().figure.setLinePath(l);
                },
                [n.SUMMARYCONNECTION.BRACKET]: function (e, t, i) {
                    const n = t.startPos,
                        r = t.middlePos,
                        o = t.endPos;
                    const a = i
                            ? function (e, t) {
                                  const i = t.x > e.x ? 1 : -1,
                                      n = t.y > e.y ? 1 : -1,
                                      r = (e.y + t.y) / 2,
                                      o = t.x - e.x,
                                      a = t.y - e.y,
                                      s = Math.min(
                                          Math.abs(o) / 4,
                                          Math.abs(a) / 2
                                      );
                                  return `M ${e.x} ${e.y}L ${e.x} ${r - n * s}Q ${e.x} ${r} ${e.x + i * s} ${r}L ${t.x - i * s} ${r}Q ${t.x} ${r} ${t.x} ${r + n * s} L ${t.x} ${t.y}`;
                              }
                            : function (e, t) {
                                  const i = t.x > e.x ? 1 : -1,
                                      n = t.y > e.y ? 1 : -1,
                                      r = (e.x + t.x) / 2,
                                      o = t.x - e.x,
                                      a = t.y - e.y,
                                      s = Math.min(
                                          Math.abs(o) / 2,
                                          Math.abs(a) / 4
                                      );
                                  return `M ${e.x} ${e.y}L ${r - i * s} ${e.y}Q ${r} ${e.y} ${r} ${e.y + n * s} L ${r} ${t.y - n * s}Q ${r} ${t.y} ${r + i * s} ${t.y}L ${t.x} ${t.y}`;
                              },
                        s = a(r, n) + a(r, o);
                    e.getConnectionView().figure.setLinePath(s);
                },
                [n.SUMMARYCONNECTION.SHARP]: function (e, t, i) {
                    const n = t.startPos,
                        r = t.middlePos,
                        o = t.endPos;
                    let a = '';
                    const s = e.getConnectionView().getLineWidth();
                    function l(e, t, n) {
                        const r = 0.3;
                        let o;
                        if (i) {
                            const i = e.x < t.x ? e.x - r : e.x + r,
                                a = e.x < t.x ? e.x + r : e.x - r,
                                s = t.x < e.x ? t.x + r : t.x - r,
                                l = t.x < e.x ? t.x - r : t.x + r,
                                c = (e.x + t.x) / 2,
                                d = (e.y + t.y) / 2,
                                f = d < t.y ? d + n / 2 : d - n / 2,
                                h = d < t.y ? d - n / 2 : d + n / 2,
                                p = t.y,
                                T = p < e.y ? p + n : p - n,
                                u = e.y,
                                g = u < t.y ? u + n : u - n;
                            o =
                                'M ' +
                                i +
                                ' ' +
                                e.y +
                                'Q ' +
                                i +
                                ' ' +
                                p +
                                ', ' +
                                c +
                                ' ' +
                                f +
                                'Q ' +
                                s +
                                ' ' +
                                g +
                                ', ' +
                                s +
                                ' ' +
                                t.y +
                                'L ' +
                                l +
                                ' ' +
                                t.y +
                                'Q ' +
                                l +
                                ' ' +
                                u +
                                ', ' +
                                c +
                                ' ' +
                                h +
                                'Q ' +
                                a +
                                ' ' +
                                T +
                                ', ' +
                                a +
                                ' ' +
                                e.y +
                                'L ' +
                                i +
                                ' ' +
                                e.y;
                        } else {
                            const i = e.y < t.y ? e.y - r : e.y + r,
                                a = e.y < t.y ? e.y + r : e.y - r,
                                s = t.y < e.y ? t.y + r : t.y - r,
                                l = t.y < e.y ? t.y - r : t.y + r,
                                c = (e.x + t.x) / 2,
                                d = (e.y + t.y) / 2,
                                f = c < t.x ? c + n / 2 : c - n / 2,
                                h = c < t.x ? c - n / 2 : c + n / 2,
                                p = t.x,
                                T = p < e.x ? p + n : p - n,
                                u = e.x,
                                g = u < t.x ? u + n : u - n;
                            o =
                                'M ' +
                                e.x +
                                ' ' +
                                i +
                                'Q ' +
                                p +
                                ' ' +
                                i +
                                ', ' +
                                f +
                                ' ' +
                                d +
                                'Q ' +
                                g +
                                ' ' +
                                s +
                                ', ' +
                                t.x +
                                ' ' +
                                s +
                                'L ' +
                                t.x +
                                ' ' +
                                l +
                                'Q ' +
                                u +
                                ' ' +
                                l +
                                ', ' +
                                h +
                                ' ' +
                                d +
                                'Q ' +
                                T +
                                ' ' +
                                a +
                                ', ' +
                                e.x +
                                ' ' +
                                a +
                                'L ' +
                                e.x +
                                ' ' +
                                i;
                        }
                        return o;
                    }
                    ((a = l(r, n, s) + l(r, o, s)),
                        e.getConnectionView().figure.setLinePath(a));
                },
                [n.SUMMARYCONNECTION.FOLD]: function (e, t, i) {
                    const n = t.startPos,
                        r = t.middlePos,
                        o = t.endPos;
                    const a = i
                            ? function (e, t, i) {
                                  const n = t.x > e.x ? 1 : -1,
                                      r = t.x - e.x,
                                      o = t.y - e.y,
                                      a = o / 1.8 + e.y,
                                      s = Math.min(
                                          Math.abs(r) / 4,
                                          Math.abs(o) / 2
                                      ),
                                      l = [
                                          `L ${e.x} ${e.y}`,
                                          `L ${e.x + (n * s) / 1.5} ${a}`,
                                          `L ${t.x - (n * s) / 2} ${a}`,
                                          `${i ? 'M' : 'L'} ${t.x} ${t.y}`,
                                      ];
                                  return i ? l.reverse() : l;
                              }
                            : function (e, t, i) {
                                  const n = t.y > e.y ? 1 : -1,
                                      r = t.x - e.x,
                                      o = t.y - e.y,
                                      a = r / 1.8 + e.x,
                                      s = Math.min(
                                          Math.abs(r) / 2,
                                          Math.abs(o) / 4
                                      ),
                                      l = [
                                          `L ${e.x} ${e.y}`,
                                          `L ${a} ${e.y + (n * s) / 1.5}`,
                                          `L ${a} ${t.y - (n * s) / 2}`,
                                          `${i ? 'M' : 'L'} ${t.x} ${t.y}`,
                                      ];
                                  return i ? l.reverse() : l;
                              },
                        s = a(r, n, !0)
                            .concat(a(r, o, !1))
                            .join('');
                    e.getConnectionView().figure.setLinePath(s);
                },
                [n.SUMMARYCONNECTION.STRAIGHT]: function (e, t, i) {
                    const n = t.startPos,
                        r = t.middlePos,
                        o = t.endPos,
                        a = e.position.x >= 0 ? w : -20;
                    let s = `M ${n.x + a / 2} ${n.y}\n            L ${n.x + a / 2} ${o.y}\n            M ${n.x + a / 2} ${r.y}\n            L ${r.x} ${r.y}\n            `;
                    if (i) {
                        const t = e.position.y >= 0 ? w : -20;
                        s = `M ${n.x} ${n.y + t / 2}\n          L ${o.x} ${n.y + t / 2}\n          M ${r.x} ${o.y + t / 2}\n          L ${r.x} ${r.y}\n          `;
                    }
                    e.getConnectionView().figure.setLinePath(s);
                },
            };
        const H = 40,
            D = {
                virtualConnLen: H,
                getCornerPoints(
                    e,
                    t = { x: 0, y: 0 },
                    i = { top: 0, left: 0, bottom: 0, right: 0 }
                ) {
                    const n = e.getPolygonBounds(),
                        { top: r, left: o, bottom: a, right: s } = i;
                    return [
                        { x: n.x - o + t.x, y: n.y - r + t.y },
                        {
                            x: n.x + n.width + s + t.x,
                            y: n.y - r + t.y,
                        },
                        {
                            x: n.x + n.width + s + t.x,
                            y: n.y + n.height + a + t.y,
                        },
                        {
                            x: n.x - o + t.x,
                            y: n.y + n.height + a + t.y,
                        },
                    ];
                },
                getSidePoints(e, t, i = { x: 0, y: 0 }) {
                    const {
                            x: r,
                            y: o,
                            width: a,
                            height: s,
                        } = e.getPolygonBounds(),
                        l = [];
                    switch (t) {
                        case n.DIRECTION.UP:
                            (l.push({ x: i.x + r, y: i.y + o }),
                                l.push({
                                    x: i.x + r + a,
                                    y: i.y + o,
                                }));
                            break;
                        case n.DIRECTION.DOWN:
                            (l.push({
                                x: i.x + r + a,
                                y: i.y + o + s,
                            }),
                                l.push({
                                    x: i.x + r,
                                    y: i.y + o + s,
                                }));
                            break;
                        case n.DIRECTION.LEFT:
                            (l.push({ x: i.x + r, y: i.y + o + s }),
                                l.push({ x: i.x + r, y: i.y + o }));
                            break;
                        case n.DIRECTION.RIGHT:
                            (l.push({ x: i.x + r + a, y: i.y + o }),
                                l.push({
                                    x: i.x + r + a,
                                    y: i.y + o + s,
                                }));
                    }
                    return l;
                },
                getSidePointsWithGap(e, t, i = 30) {
                    const { width: r } = e.getPolygonBounds(),
                        o = Object.assign({}, e.position);
                    switch (t) {
                        case n.DIRECTION.LEFT:
                            o.x -= i;
                            break;
                        case n.DIRECTION.RIGHT:
                            o.x += r + i;
                            break;
                        case n.DIRECTION.UP:
                            o.y -= i;
                            break;
                        case n.DIRECTION.DOWN:
                            o.y += i;
                    }
                    return D.getSidePoints(e, t, o);
                },
                getPointsOfUDChildren: function (e, t) {
                    const i = [];
                    let n, r;
                    const o = t ? 1 : -1;
                    e.sort((e, t) =>
                        o * e.position.y < o * t.position.y ? 1 : -1
                    );
                    const a = t ? 0 : 1;
                    return (
                        e.forEach((e) => {
                            e.isPlaceHolderView ||
                                ((n = e.position),
                                (r = e.getPolygonBounds()),
                                i.push({
                                    x: n.x + r.x + a * r.width,
                                    y: n.y + r.y + (1 - a) * r.height,
                                }),
                                i.push({
                                    x: n.x + r.x + a * r.width,
                                    y: n.y + r.y + a * r.height,
                                }));
                        }),
                        i
                    );
                },
                getPointsOfLRChildren: function (e, t) {
                    const i = [];
                    let n, r;
                    const o = t ? 1 : -1;
                    return (
                        e.sort((e, t) =>
                            o * e.position.x > o * t.position.x ? 1 : -1
                        ),
                        e.forEach((e) => {
                            e.isPlaceHolderView ||
                                ((n = e.position),
                                (r = e.getPolygonBounds()),
                                i.push({
                                    x: n.x - (o * r.width) / 2,
                                    y: n.y - o * (r.y + r.height),
                                }),
                                i.push({
                                    x: n.x + (o * r.width) / 2,
                                    y: n.y - o * (r.y + r.height),
                                }));
                        }),
                        i
                    );
                },
                getPointsOfNoChildren: function (e, t) {
                    const i = [],
                        r = 0,
                        o = 0,
                        a = e.getPolygonBounds();
                    switch (t) {
                        case n.DIRECTION.LEFT:
                            (i.push({
                                x: r - a.width - H,
                                y: o + (2 * a.height) / 3,
                            }),
                                i.push({
                                    x: r - a.width - H,
                                    y: o - (2 * a.height) / 3,
                                }));
                            break;
                        case n.DIRECTION.RIGHT:
                            (i.push({
                                x: r + a.width + H,
                                y: o - (2 * a.height) / 3,
                            }),
                                i.push({
                                    x: r + a.width + H,
                                    y: o + (2 * a.height) / 3,
                                }));
                            break;
                        case n.DIRECTION.UP:
                            (i.push({
                                x: r - (2 * a.width) / 3,
                                y: o + a.y - H,
                            }),
                                i.push({
                                    x: r + (2 * a.width) / 3,
                                    y: o + a.y - H,
                                }));
                            break;
                        case n.DIRECTION.DOWN:
                            (i.push({
                                x: r + (2 * a.width) / 3,
                                y: o + (a.y + a.height) + H,
                            }),
                                i.push({
                                    x: r - (2 * a.width) / 3,
                                    y: o + (a.y + a.height) + H,
                                }));
                    }
                    return i;
                },
                getOppositeDirection(e) {
                    return e === n.DIRECTION.LEFT
                        ? n.DIRECTION.RIGHT
                        : e === n.DIRECTION.RIGHT
                          ? n.DIRECTION.LEFT
                          : e === n.DIRECTION.UP
                            ? n.DIRECTION.DOWN
                            : e === n.DIRECTION.DOWN
                              ? n.DIRECTION.UP
                              : void 0;
                },
            };
        var F = D,
            k = i(91),
            B = i(6),
            V = i.n(B),
            Y = i(27),
            G = i(5);
        class U {
            constructor() {
                this.OldHitDetect = j;
            }
            calcRealPosition(e, t) {
                const i = t.indexOf(e);
                t = t.filter((e, t) => !Object(s.isDetachedBranch)(e) || t < i);
                const n = this._getAllRealBoundsList(t),
                    r = e.model.getPosition() || { x: 0, y: 0 },
                    o = {
                        x: r.x + e.bounds.x,
                        y: r.y + e.bounds.y,
                        width: e.bounds.width,
                        height: e.bounds.height,
                    },
                    a = this._getFitRealBounds(o, n);
                return { x: a.x - e.bounds.x, y: a.y - e.bounds.y };
            }
            _getAllRealBoundsList(e) {
                return e
                    .filter((e) => e.figure.isVisible)
                    .map((e) => {
                        const t = Object.assign(
                                {},
                                Object(s.isDetachedBranch)(e)
                                    ? e.bounds
                                    : e.topicView.bounds
                            ),
                            i = Object.assign({}, e.position);
                        let n = e.parent();
                        for (
                            ;
                            !Object(s.isRootBranch)(e) &&
                            !Object(s.isRootBranch)(n);
                        )
                            ((i.x += n.position.x),
                                (i.y += n.position.y),
                                (n = n.parent()));
                        return {
                            x: i.x + t.x,
                            y: i.y + t.y,
                            width: t.width,
                            height: t.height,
                        };
                    });
            }
            _getFitRealBounds(e, t) {
                let i;
                return (
                    t.some((t) => {
                        if (Object(G.k)(e, t))
                            return ((i = Object.assign({}, t)), !0);
                    }),
                    i
                        ? this._getFitRealBounds(
                              this._calcNewTestRealBounds(e, i),
                              t
                          )
                        : Object.assign({}, e)
                );
            }
            _calcNewTestRealBounds(e, t) {
                const i = Object.assign({}, e);
                return (
                    e.y < 0
                        ? (i.y = t.y - e.height - 5)
                        : (i.y = t.y + t.height + 5),
                    i
                );
            }
        }
        function j(e, t) {
            ((this.branch = e),
                (this.duadrant = null),
                (t = t || {}),
                (this.space = t.space || 5),
                (this.checkCoord = t.checkCoord || null),
                (this.rootBoundary = t.rootBoundary || !0),
                (this.proxyHelper = new U(e, t)));
        }
        j.prototype = {
            calCoords() {
                const e = this.branch.parent().getRealPosition(),
                    t = V.a.extend(
                        { x: 0, y: 0 },
                        this.branch.model.get('position')
                    ),
                    i = this.branch.boundaryBounds;
                return {
                    left: e.x + t.x + i.x,
                    top: e.y + t.y + i.y,
                    bottom: e.y + t.y + i.y + i.height,
                    right: e.x + t.x + i.x + i.width,
                };
            },
            getDuadrant: function (e) {
                const t = e.getRealPosition(),
                    i = e.topicView.bounds,
                    n = this.calCoords(e),
                    r = {};
                return (
                    t.x >= 0
                        ? (t.y < 0
                              ? ((r.y = (n.bottom - n.top) / 2), (r.index = 1))
                              : ((r.y = -(n.bottom - n.top) / 2),
                                (r.index = 2)),
                          (r.x = -i.width / 2))
                        : ((r.x = i.width / 2),
                          t.y < 0
                              ? ((r.y = (n.bottom - n.top) / 2), (r.index = 4))
                              : ((r.y = -(n.bottom - n.top) / 2),
                                (r.index = 3))),
                    (this.duadrant = r),
                    r
                );
            },
            isInDuadrant: function (e, t, i) {
                if (i) {
                    if (1 === e.index && t.left > e.x && t.bottom < e.y)
                        return !0;
                    if (2 === e.index && t.left > e.x && t.top > e.y) return !0;
                    if (3 === e.index && t.right < e.x && t.top > e.y)
                        return !0;
                    if (4 === e.index && t.right < e.x && t.bottom < e.y)
                        return !0;
                } else {
                    if (1 === e.index && t.right > e.x && t.top < e.y)
                        return !0;
                    if (2 === e.index && t.right > e.x && t.bottom > e.y)
                        return !0;
                    if (3 === e.index && t.left < e.x && t.bottom > e.y)
                        return !0;
                    if (4 === e.index && t.left < e.x && t.top < e.y) return !0;
                }
                return !1;
            },
            isCoordAvaliable: function (e, t) {
                return this.checkCoord || 'function' == typeof this.checkCoord
                    ? this.checkCoord(e, t)
                    : (this.duadrant || this.getDuadrant(this.branch),
                      this.isInDuadrant(this.duadrant, e, t));
            },
            getChildPosList: function (e, t) {
                let i;
                if (
                    (e
                        ? t || (i = this.branch)
                        : ((e = this.branch), (i = null)),
                    e === i)
                )
                    return [];
                const r = [n.TOPIC_ATTACHED, n.TOPIC_SUMMARY, n.TOPIC_CALLOUT],
                    o = e.getChildrenBranchesByType(r),
                    a = e.getChildrenBranchesByType(),
                    s = e.getRealPosition();
                let l = [],
                    c = [],
                    d = e.topicView.bounds;
                const f = e.getStructureClass();
                if (
                    (f === n.STRUCTURECLASS.SPREADSHEET ||
                        f === n.STRUCTURECLASS.COLUMNSPREADSHEET) &&
                    e.getMatrixView() &&
                    !e.model.isCollapse()
                )
                    return (
                        (d = Object.assign({}, d, e.getMatrixView().getSize())),
                        [
                            {
                                left: s.x + d.x,
                                top: s.y + d.y,
                                bottom: s.y + d.y + d.height,
                                right: s.x + d.x + d.width,
                            },
                        ]
                    );
                c.push({
                    left: s.x + d.x,
                    top: s.y + d.y,
                    bottom: s.y + d.y + d.height,
                    right: s.x + d.x + d.width,
                });
                for (const t of e.boundaries) {
                    const e = {
                        x: t.position.x,
                        y: t.position.y,
                        width: t.size.width,
                        height: t.size.height,
                    };
                    if ('master' === t.model.get('range')) {
                        l = [e];
                        break;
                    }
                    {
                        if (e.width === e.height && 0 === e.width) continue;
                        const { rangeStart: i, rangeEnd: n } = t.model;
                        for (let e = i; e <= n; e++)
                            o.splice(o.indexOf(a[e]), 1);
                    }
                    l.push(e);
                }
                if (l)
                    for (const e of l)
                        c.push({
                            left: e.x,
                            top: e.y,
                            bottom: e.y + e.height,
                            right: e.x + e.width,
                        });
                if (o && !e.model.isCollapse())
                    for (const e of o) c = c.concat(this.getChildPosList(e));
                return c;
            },
            sortByPos: function (e, t) {
                return (e = e.filter((e) => {
                    if (this.isInDuadrant(t, e)) return e;
                })).sort(
                    {
                        1: function (e, t) {
                            return e.bottom !== t.bottom
                                ? t.bottom - e.bottom
                                : e.left - t.left;
                        },
                        2: function (e, t) {
                            return e.bottom !== t.bottom
                                ? e.bottom - t.bottom
                                : e.left - t.left;
                        },
                        3: function (e, t) {
                            return e.bottom !== t.bottom
                                ? e.bottom - t.bottom
                                : t.left - e.left;
                        },
                        4: function (e, t) {
                            return e.bottom !== t.bottom
                                ? t.bottom - e.bottom
                                : t.left - e.left;
                        },
                    }[t.index]
                );
            },
            move: function (e, t) {
                const i = V.a.extend({}, e);
                let n;
                return (
                    t.bottom && ((n = t.bottom - e.bottom), (i.top += n)),
                    t.top && ((n = t.top - e.top), (i.bottom += n)),
                    t.left && ((n = t.left - e.left), (i.right += n)),
                    t.right && ((n = t.right - e.right), (i.left += n)),
                    V.a.extend(i, t)
                );
            },
            setNewPos: function (e, t, i) {
                i = Math.abs(parseInt(i, 10) || 0);
                const n = [
                        this.move(e, { right: t.left - i }),
                        this.move(e, {
                            right: t.left - i,
                            bottom: t.top - i,
                        }),
                        this.move(e, {
                            right: t.left - i,
                            top: t.top,
                        }),
                        this.move(e, {
                            right: t.left - i,
                            top: t.top + (t.bottom - t.top) / 2,
                        }),
                        this.move(e, {
                            right: t.left - i,
                            top: t.bottom,
                        }),
                        this.move(e, {
                            right: t.left - i,
                            top: t.bottom + i,
                        }),
                        this.move(e, { left: t.right + i }),
                        this.move(e, {
                            left: t.right + i,
                            bottom: t.top - i,
                        }),
                        this.move(e, {
                            left: t.right + i,
                            top: t.top,
                        }),
                        this.move(e, {
                            left: t.right + i,
                            top: t.top + (t.bottom - t.top) / 2,
                        }),
                        this.move(e, {
                            left: t.right + i,
                            top: t.bottom,
                        }),
                        this.move(e, {
                            left: t.right + i,
                            top: t.bottom + i,
                        }),
                        this.move(e, { bottom: t.top - i }),
                        this.move(e, {
                            bottom: t.top - i,
                            left: t.left - i,
                        }),
                        this.move(e, {
                            bottom: t.top - i,
                            left: t.left,
                        }),
                        this.move(e, {
                            bottom: t.top - i,
                            left: t.left + (t.right - t.left) / 2,
                        }),
                        this.move(e, {
                            bottom: t.top - i,
                            left: t.right,
                        }),
                        this.move(e, {
                            bottom: t.top - i,
                            left: t.right + i,
                        }),
                        this.move(e, { top: t.bottom + i }),
                        this.move(e, {
                            top: t.bottom + i,
                            left: t.left - i,
                        }),
                        this.move(e, {
                            top: t.bottom + i,
                            left: t.left,
                        }),
                        this.move(e, {
                            top: t.bottom + i,
                            left: t.left + (t.right - t.left) / 2,
                        }),
                        this.move(e, {
                            top: t.bottom + i,
                            left: t.right,
                        }),
                        this.move(e, {
                            top: t.bottom + i,
                            left: t.right + i,
                        }),
                    ],
                    r = [];
                for (const e of n) this.isCoordAvaliable(e, !0) && r.push(e);
                return r;
            },
            sortByDis: function (e, t) {
                const i = e.left + (e.right - e.left) / 2,
                    n = e.top + (e.bottom - e.top) / 2;
                return t.sort((e, t) => {
                    const r = e.left + (e.right - e.left) / 2,
                        o = e.top + (e.bottom - e.top) / 2,
                        a = t.left + (t.right - t.left) / 2,
                        s = t.top + (t.bottom - t.top) / 2,
                        l = Math.pow(i - r, 2) + Math.pow(n - o, 2),
                        c = Math.pow(i - a, 2) + Math.pow(n - s, 2);
                    return Math.abs(l - c) < 1e-4 ? e.top - t.top : l - c;
                });
            },
            isIntersect: function (e, t) {
                const i = !(e.left > t.right || e.right < t.left),
                    n = !(e.bottom < t.top || e.top > t.bottom);
                return i && n;
            },
            calPosition(e, t) {
                let i = !1,
                    n = [];
                ((e.left -= 5), (e.top -= 5), (e.right += 5), (e.bottom += 5));
                const r = V.a.extend({}, e);
                for (const e of t)
                    (this.isIntersect(r, e) && (i = !0),
                        (n = n.concat(this.setNewPos(r, e, 1))));
                if (!i) return r;
                n = this.sortByDis(r, n);
                for (const e of n) {
                    i = !1;
                    for (const n of t)
                        if (this.isIntersect(e, n)) {
                            i = !0;
                            break;
                        }
                    if (!i) return e;
                }
            },
        };
        var $ = new U();
        const z = o.a.PADDING,
            W = o.a.SUMMARYLINEMARGIN,
            K = N.a.isLineTapered,
            Z = {
                STRUCTURECLASS: '',
                isAttachedChildrenStructureImmutable: !1,
                getRangeGrowthDirection: function () {
                    return n.DIRECTION.DOWN;
                },
                getSummaryDirection: function (...e) {
                    return n.DIRECTION.RIGHT;
                },
                getSourceOrientation() {
                    return n.DIRECTION.RIGHT;
                },
                getChildTargetOrientation: function (e, t) {
                    return n.DIRECTION.LEFT;
                },
                isInSameRangeWithLast: function (e, t) {
                    return (
                        !(
                            t <= 0 || t >= e.getChildrenBranchesByType().length
                        ) && this.isInSameRange(e, t)
                    );
                },
                isInSameRange: function (e, t) {
                    const i = e.model.boundaries();
                    for (let e = 0; e < i.length; e++) {
                        const n = i[e];
                        if (t - 1 >= n.rangeStart && t <= n.rangeEnd) return !0;
                    }
                    const n = e.model.summaries();
                    for (let e = 0; e < n.length; e++) {
                        const i = n[e];
                        if (t - 1 >= i.rangeStart && t <= i.rangeEnd) return !0;
                    }
                    return !1;
                },
                calChildrenBounds: function (e) {
                    (e.calChildrenBounds(),
                        e.boundaries.length && N.a.sortBoundaries(e.boundaries),
                        N.a.setBoundaryPadding(e));
                },
                calAttachedChildrenPos: function (e, t) {
                    throw new Error('calAttachedChildrenPos must be overrided');
                },
                calCalloutChildrenPos: function (e, t) {
                    const i = this;
                    e.getChildrenBranchesByType(n.TOPIC_CALLOUT).forEach(
                        (n, r) => {
                            let o = V.a.extend(
                                { x: 0, y: 0 },
                                n.model.get('position')
                            );
                            const a = n.boundaryBounds,
                                s = new $.OldHitDetect(n, {
                                    checkCoord: function (e) {
                                        return (function (e, t) {
                                            const n = e
                                                    .parent()
                                                    .getRealPosition(),
                                                r = e.boundaryBounds,
                                                o = {
                                                    x: t.left - n.x - r.x,
                                                    y: t.top - n.y - r.y,
                                                },
                                                a = i.checkCalloutPosition(
                                                    e,
                                                    o
                                                );
                                            return (
                                                a.isAvailable ||
                                                    (a.left &&
                                                        ((t.left -= a.left),
                                                        (t.right -= a.left)),
                                                    a.right &&
                                                        ((t.left += a.right),
                                                        (t.right += a.right)),
                                                    a.top &&
                                                        ((t.top -= a.top),
                                                        (t.bottom -= a.top)),
                                                    a.bottom &&
                                                        ((t.top += a.bottom),
                                                        (t.bottom +=
                                                            a.bottom))),
                                                !0
                                            );
                                        })(this.branch, e);
                                    },
                                }),
                                l = s.calCoords(),
                                c = s.getChildPosList(e, !1),
                                d = s.calPosition(l, c);
                            ((o = {
                                x: o.x + d.left - l.left,
                                y: o.y + d.top - l.top,
                            }),
                                n.setPosition(o.x, o.y));
                            const f = Math.max(
                                    t.x + t.width,
                                    o.x + a.x + a.width
                                ),
                                h = Math.max(
                                    t.y + t.height,
                                    o.y + a.y + a.height
                                );
                            ((t.x = Math.min(t.x, o.x + a.x)),
                                (t.width = Math.max(t.width, f - t.x)),
                                (t.y = Math.min(t.y, o.y + a.y)),
                                (t.height = Math.max(t.height, h - t.y)));
                        }
                    );
                },
                calSummaryChildrenPos: function (e, t) {
                    const i = e.getChildrenBranchesByType(n.TOPIC_SUMMARY);
                    i.length &&
                        V.a.each(i, (i) => {
                            this.renderSummary(e, i, t);
                        });
                },
                calDetachedChildrenPos(e, t) {
                    if (!e.isCentralBranch()) return;
                    const i = e.model.ownerSheet().isTopicOverlapping(),
                        r = e.getChildrenBranchesByType(n.TOPIC_TYPE.DETACHED),
                        o = [
                            e,
                            ...e.getDescendantBranchesByType(
                                n.TOPIC_TYPE.DETACHED,
                                n.TOPIC_TYPE.ATTACHED,
                                n.TOPIC_TYPE.CALLOUT,
                                n.TOPIC_TYPE.SUMMARY
                            ),
                        ].filter(
                            (e) => !Object(s.isDescendantOfDetachedBranch)(e)
                        );
                    (r.forEach((e) => {
                        const t = e.model.getPosition();
                        if (i && t) e.setPosition(t);
                        else {
                            const t = $.calcRealPosition(e, [...o]);
                            e.setPosition(t);
                        }
                    }),
                        V.a.extend(t, N.a.mergeBounds(r, t)));
                },
                isInBounds: function (e, t) {
                    let i, n, r;
                    for (i = 0; i < e.boundaries.length; i++)
                        if (
                            ((n = e.boundaries[i]),
                            t >= n.model.rangeStart && t <= n.model.rangeEnd)
                        )
                            return !0;
                    for (i = 0; i < e.summaries.length; i++)
                        if (
                            ((r = e.summaries[i]),
                            t >= r.model.rangeStart && t <= r.model.rangeEnd)
                        )
                            return !0;
                    return !1;
                },
                drawConnectLine: function (e, t) {
                    return t.isCalloutBranch()
                        ? I(n.BRANCHCONNECTION.CALLOUTLINE)(t)
                        : e.shouldCollapse()
                          ? void 0
                          : this.drawAttachedConnectLine(e, t);
                },
                drawAttachedConnectLine(e, t) {
                    const i = t.getConnectionView(),
                        r =
                            0 === i.figure.lineWidth
                                ? n.BRANCHCONNECTION.NONE
                                : i.figure.lineShape,
                        o = this.STRUCTURECLASS,
                        a = Object(d.a)(
                            e.topicView.topicShapeStyle
                        ).getStartAnchorPosition(e, t),
                        s = Object(d.a)(
                            e.topicView.topicShapeStyle
                        ).getControlPosition(e, t),
                        l = Object(d.a)(
                            t.topicView.topicShapeStyle
                        ).getEndAnchorPosition(this, t),
                        c =
                            n.STRUCTURECLASS.ORGCHARTUP === o ||
                            n.STRUCTURECLASS.ORGCHARTDOWN === o;
                    I(r)(t, { startPt: a, ctrlPt: s, endPt: l }, K(e), c);
                },
                specialDeal: function (e, t) {},
                layoutExtendCollapse(e, t) {
                    if (!e.getChildrenBranchesByType().length) return;
                    if (!e.collapseExtendView || e.collapseExtendView.isHide())
                        return;
                    let i = 0;
                    const r = this.getSourceOrientation(e),
                        a = Object(s.getTopicShape)(e),
                        l =
                            a.getExtConnectionOffset &&
                            a.getExtConnectionOffset(e);
                    i = null != l ? l : i;
                    e.topicView.topicShapeStyle ===
                        n.TOPICSHAPE.PARALLELOGRAM &&
                        [n.DIRECTION.RIGHT, n.DIRECTION.LEFT].includes(r) &&
                        (i = e.topicView.shapeBounds.height / 4);
                    const {
                            EXT_RADIUS: c,
                            COL_RADIUS: f,
                            EXT_GAP: h,
                            COL_GAP: p,
                        } = o.a,
                        T = e.model.isCollapse(),
                        u = T ? h : p,
                        g = T ? c : f,
                        Q = 2 * g,
                        m = e.topicView.shapeBounds,
                        b = e.isRotate(),
                        C = Object(d.a)(
                            e.topicView.topicShapeStyle
                        ).getExtColPosition(e);
                    switch (r) {
                        case n.DIRECTION.RIGHT:
                            (e.collapseExtendView.move(
                                m.x + m.width + u - g,
                                -g + C.y
                            ),
                                e.collapseExtendView.drawConnection({
                                    x1: 0,
                                    y1: g,
                                    x2: -u + g - i,
                                    y2: g,
                                }),
                                !b && T && (t.width += u + g));
                            break;
                        case n.DIRECTION.LEFT:
                            (e.collapseExtendView.move(m.x - u - g, -g + C.y),
                                e.collapseExtendView.drawConnection({
                                    x1: Q,
                                    y1: g,
                                    x2: u + g + i,
                                    y2: g,
                                }),
                                !b &&
                                    T &&
                                    ((t.width += u + g), (t.x -= u + g)));
                            break;
                        case n.DIRECTION.DOWN:
                            (e.collapseExtendView.move(
                                -g + C.x,
                                m.y + m.height + u - g
                            ),
                                e.collapseExtendView.drawConnection({
                                    x1: g,
                                    y1: 0,
                                    x2: g,
                                    y2: -u + g - i,
                                }),
                                !b && T && (t.height += u + g));
                            break;
                        case n.DIRECTION.UP:
                            (e.collapseExtendView.move(-g + C.x, m.y - u - g),
                                e.collapseExtendView.drawConnection({
                                    x1: g,
                                    y1: Q,
                                    x2: g,
                                    y2: u + g + i,
                                }),
                                !b &&
                                    T &&
                                    ((t.height += u + g), (t.y -= u + g)));
                    }
                    e.collapseExtendView.renderHoverArea();
                },
                renderSummary(e, t, i) {
                    const r = e
                            .getChildrenBranchesByType(n.TOPIC_ATTACHED)
                            .filter((e) => !0 !== e.isPlaceHolderView),
                        o = z + W.TOSUMMARY + W.TORANGE,
                        a = t.summaryModel.rangeStart,
                        s = t.summaryModel.rangeEnd,
                        l = r.length,
                        c = this.getSummaryDirection(e, a),
                        d = t.getRangeGrowthDirection();
                    let f, h, p, T, u, g, Q, m, b, C, L, y;
                    if (!l) return !1;
                    const { x: M } = r[a].position,
                        { x: A, width: v } = r[a].boundaryBounds,
                        { x: E } = r[s].position,
                        { x: _, width: O } = r[s].boundaryBounds,
                        S = (e) => {
                            const t =
                                d === n.DIRECTION.LEFT
                                    ? (M + A + v - (E + _)) / 2
                                    : (_ + O + E - (A + M)) / 2;
                            (this._drawSummaryLine(e, t, c, !0),
                                this._renderSelectBox(e, 'LR'));
                        },
                        x = (e, t, i) => {
                            const n = (i - t) / 2;
                            (this._drawSummaryLine(e, n, c),
                                this._renderSelectBox(e, 'UD'));
                        };
                    switch (c) {
                        case n.DIRECTION.RIGHT:
                            for (
                                m = 0,
                                    u = 0,
                                    Q = Number.NEGATIVE_INFINITY,
                                    L = Number.MAX_VALUE,
                                    y = Number.NEGATIVE_INFINITY,
                                    u = a;
                                u <= s;
                                u++
                            )
                                ((Q = Math.max(
                                    Q,
                                    r[u].boundaryBounds.x +
                                        r[u].boundaryBounds.width +
                                        r[u].position.x
                                )),
                                    (L = Math.min(
                                        L,
                                        r[u].bounds.y + r[u].position.y
                                    )),
                                    (y = Math.max(
                                        y,
                                        r[u].bounds.y +
                                            r[u].position.y +
                                            r[u].bounds.height
                                    )));
                            ((f = (y + L) / 2),
                                r[s] &&
                                    r[a] &&
                                    (t.setPosition(
                                        Q - t.boundaryBounds.x + o,
                                        f
                                    ),
                                    (p = Math.max(
                                        i.y + i.height,
                                        f +
                                            t.boundaryBounds.y +
                                            t.boundaryBounds.height
                                    )),
                                    (m = Q + t.boundaryBounds.width + o),
                                    (i.y = Math.min(
                                        i.y,
                                        f + t.boundaryBounds.y
                                    )),
                                    (i.height = p - i.y),
                                    (i.width = Math.max(m - i.x, i.width)),
                                    x(t, L, y)));
                            break;
                        case n.DIRECTION.LEFT:
                            for (
                                b = Number.MAX_VALUE,
                                    L = Number.MAX_VALUE,
                                    y = Number.NEGATIVE_INFINITY,
                                    g = a;
                                g <= s;
                                g++
                            )
                                ((b = Math.min(
                                    b,
                                    r[g].boundaryBounds.x + r[g].position.x
                                )),
                                    (L = Math.min(
                                        L,
                                        r[g].bounds.y + r[g].position.y
                                    )),
                                    (y = Math.max(
                                        y,
                                        r[g].bounds.y +
                                            r[g].position.y +
                                            r[g].bounds.height
                                    )));
                            r[s] &&
                                r[a] &&
                                ((f = (L + y) / 2),
                                (C =
                                    b -
                                    t.boundaryBounds.width -
                                    t.boundaryBounds.x -
                                    o),
                                t.setPosition(C, f),
                                (p = Math.max(
                                    i.y + i.height,
                                    f +
                                        t.boundaryBounds.y +
                                        t.boundaryBounds.height
                                )),
                                (i.y = Math.min(i.y, f + t.boundaryBounds.y)),
                                (i.height = p - i.y),
                                (T = i.x + i.width),
                                (i.x = Math.min(i.x, C + t.boundaryBounds.x)),
                                (i.width = Math.max(T - i.x, i.width)),
                                x(t, L, y));
                            break;
                        case n.DIRECTION.DOWN:
                            for (
                                y = Number.NEGATIVE_INFINITY, g = a;
                                g <= s;
                                g++
                            )
                                y = Math.max(
                                    y,
                                    r[g].boundaryBounds.y +
                                        r[g].boundaryBounds.height +
                                        r[g].position.y
                                );
                            r[s] &&
                                r[a] &&
                                ((h =
                                    (r[s].boundaryBounds.x +
                                        r[s].boundaryBounds.width +
                                        r[s].position.x +
                                        (r[a].boundaryBounds.x +
                                            r[a].position.x)) /
                                    2),
                                t.setPosition(h, y - t.boundaryBounds.y + o),
                                (T = Math.max(
                                    i.x + i.width,
                                    h +
                                        t.boundaryBounds.x +
                                        t.boundaryBounds.width
                                )),
                                (i.x = Math.min(i.x, h + t.boundaryBounds.x)),
                                (i.width = T - i.x),
                                (i.height = Math.max(
                                    i.height,
                                    y + o + t.boundaryBounds.height - i.y
                                )),
                                S(t));
                            break;
                        case n.DIRECTION.UP:
                            for (L = Number.MAX_VALUE, g = a; g <= s; g++)
                                L = Math.min(
                                    L,
                                    r[g].boundaryBounds.y + r[g].position.y
                                );
                            r[s] &&
                                r[a] &&
                                ((h =
                                    (r[s].boundaryBounds.x +
                                        r[s].boundaryBounds.width +
                                        r[s].position.x +
                                        (r[a].boundaryBounds.x +
                                            r[a].position.x)) /
                                    2),
                                t.setPosition(
                                    h,
                                    L -
                                        o -
                                        t.boundaryBounds.height -
                                        t.boundaryBounds.y
                                ),
                                (T = Math.max(
                                    i.x + i.width,
                                    h +
                                        t.boundaryBounds.x +
                                        t.boundaryBounds.width
                                )),
                                (i.x = Math.min(i.x, h + t.boundaryBounds.x)),
                                (i.width = T - i.x),
                                (p = i.y + i.height),
                                (i.y = Math.min(
                                    i.y,
                                    L - o - t.boundaryBounds.height
                                )),
                                (i.height = Math.max(i.height, p - i.y)),
                                S(t));
                    }
                },
                _drawSummaryLine(e, t, i, o = !1) {
                    let a, s, c, d, f;
                    if (i === n.DIRECTION.RIGHT || i === n.DIRECTION.LEFT) {
                        const r = i === n.DIRECTION.RIGHT;
                        ((a =
                            e.position.x +
                            e.boundaryBounds.x +
                            (r ? 0 : 1) * e.boundaryBounds.width -
                            (r ? 1 : -1) * W.TOSUMMARY),
                            (s = e.position.y),
                            (d = a - (r ? 1 : -1) * z),
                            (c = {
                                startPos: { x: d, y: s - t },
                                middlePos: { x: a, y: s },
                                endPos: { x: d, y: s + t },
                            }));
                    } else if (i === n.DIRECTION.UP || i === n.DIRECTION.DOWN) {
                        const r = i === n.DIRECTION.UP;
                        ((a = e.position.x),
                            (s =
                                e.position.y +
                                e.boundaryBounds.y +
                                (r ? 1 : 0) * e.boundaryBounds.height -
                                (r ? -1 : 1) * W.TOSUMMARY),
                            (f = s + (r ? 1 : -1) * z),
                            (c = {
                                startPos: { x: a - t, y: f },
                                middlePos: { x: a, y: s },
                                endPos: { x: a + t, y: f },
                            }));
                    }
                    const h = l.a.getStyleValue(
                        e.summaryView,
                        n.STYLE_KEYS.SHAPE_CLASS
                    );
                    var p;
                    (P[(p = h)]
                        ? P[p]
                        : (r.b
                              .get(n.CONFIG.LOGGER)
                              .warn(`Unsupported summary line style: ${p}`),
                          P[n.SUMMARYCONNECTION.ROUND]))(e, c, o);
                },
                _renderSelectBox(e, t) {
                    e.selectBox || (e.selectBox = new k.a({ refView: e }));
                },
                getChildStructure: function (e, t, ...i) {
                    return e;
                },
                getAvailableChildStructure: function (e, t) {
                    return n.ATTACHED_EXPOSED_STRUCTURE;
                },
                getCalloutStructure: function (e, t) {
                    return this.getChildStructure(this.STRUCTURECLASS, 0, e);
                },
                checkCalloutPosition: function (e, t) {
                    return N.a.CALLOUTPOSAVAILABLE;
                },
                calcSpacingMajor(e) {
                    return (
                        parseInt(`${e.figure.majorSpacing || 0}`) +
                        Object(s.getLineEndSpacingPatchGap)(e)
                    );
                },
                calcPolygons(e) {
                    return 0 === e.getChildrenBranchesByType().length ||
                        e.model.isCollapse()
                        ? this._calcNoChildrenPolygons(e)
                        : this._calcChildrenPolygons(e);
                },
                _calcNoChildrenPolygons(e) {
                    const t = [
                            ...this.getPointsOfBase(e),
                            ...this.getPointsOfNoChildren(e),
                        ],
                        i = c.c(t);
                    return [
                        {
                            points: i,
                            pointList: i,
                            relatedBranchViewList: [],
                            side: null,
                        },
                    ];
                },
                _calcChildrenPolygons(e) {
                    const t = this.getPointsOfBase(e),
                        i = this.getRangeGrowthDirection(),
                        n = e.getChildrenBranchesByType(),
                        r = [
                            ...t,
                            ...F.getSidePointsWithGap(
                                n[0],
                                F.getOppositeDirection(i)
                            ),
                            ...F.getSidePointsWithGap(n[n.length - 1], i),
                        ];
                    n.forEach((e) => {
                        r.push(...F.getCornerPoints(e, e.position));
                    });
                    const o = c.c(r);
                    return [
                        {
                            points: o,
                            pointList: o,
                            relatedBranchViewList: n,
                            side: null,
                        },
                    ];
                },
                getPointsOfBase(e) {
                    let t = this.getSourceOrientation();
                    return (
                        (e.isCentralBranch() || e.isDetachedBranch()) &&
                            (t = F.getOppositeDirection(t)),
                        F.getSidePoints(e, t)
                    );
                },
                getPointsOfNoChildren(e) {
                    return F.getPointsOfNoChildren(
                        e,
                        this.getSourceOrientation()
                    );
                },
                getChildrenSize(e) {
                    const t = e.getChildrenBranchesByType(
                        n.TOPIC_TYPE.ATTACHED
                    );
                    return Y.d(t.map((e) => Y.e(e.boundaryBounds, e.position)));
                },
                branchLayoutTreeInfo: {},
                startLayout(e) {
                    this.branchLayoutTreeInfo = e;
                },
                _calcChildrenBoundaryBounds() {},
                isSpecialOffSetBranchView(e) {
                    return (
                        Object(s.isMatrixMainBranch)(e) ||
                        Object(s.isTreeTableHeadBranch)(e)
                    );
                },
                getMapOfXOffSetByBranchIndexFromBranchList(e, t) {
                    return e.reduce((e, i) => {
                        const n = t
                            ? Math.max(
                                  Number.MIN_VALUE,
                                  i.topicView.bounds.x - i.boundaryBounds.x
                              )
                            : Math.max(
                                  Number.MIN_VALUE,
                                  i.boundaryBounds.x +
                                      i.boundaryBounds.width -
                                      i.topicView.bounds.x -
                                      i.topicView.bounds.width
                              );
                        return Object.assign(Object.assign({}, e), {
                            [i.branchIndex()]: n,
                        });
                    }, {});
                },
                getMaxOffsetForNormalChildren(e, t) {
                    return e
                        .filter((e) => !this.isSpecialOffSetBranchView(e))
                        .map((e) => {
                            var i;
                            return null !== (i = t[e.branchIndex()]) &&
                                void 0 !== i
                                ? i
                                : Number.MIN_VALUE;
                        })
                        .reduce((e, t) => Math.max(e, t), Number.MIN_VALUE);
                },
                getOffsetForChildBranchView(e, t, i) {
                    return this.isSpecialOffSetBranchView(e)
                        ? i[e.branchIndex()]
                        : this.getMaxOffsetForNormalChildren(t, i);
                },
            };
        var J = Z;
        function X(e, t) {
            const i = e.getStructureClass(),
                r =
                    null != t
                        ? t
                        : e.getChildrenBranchesByType(n.TOPIC_TYPE.ATTACHED),
                o =
                    e.getContext().model.getCompactLayoutModeLevel() !==
                    n.COMPACT_LAYOUT_MODE_LEVEL.Third,
                a = n.MAP_LIKE_STRUCTURES.includes(i),
                s = n.LOGIC_CHART_STRUCTURES.includes(i),
                c = n.ORG_CHART_STRUCTURES.includes(i),
                d = a || s || c,
                f = a || s ? 8 : 7,
                h = l.a.getStyleValue(e, n.STYLE_KEYS.LINE_CLASS),
                p =
                    h !== n.BRANCHCONNECTION.ROUNDEDELBOW &&
                    h !== n.BRANCHCONNECTION.ELBOW;
            if (!o && d && (null == r ? void 0 : r.length) >= f && p) {
                const e = a || s,
                    t = e
                        ? r.reduce((e, t) => e + t.boundaryBounds.height, 0)
                        : r.reduce((e, t) => e + t.boundaryBounds.width, 0),
                    [i, n, o] = e ? [0.15, 400, 800] : [0.09, 1e3, 1600];
                return t <= n ? 0 : i * (Math.min(t, o) - n);
            }
            return 0;
        }
        var q = i(49);
        var ee = Object.assign({}, J, {
            calAttachedChildrenPos: function (e, t, i) {
                const r = e.getChildrenBranchesByType(n.TOPIC_ATTACHED),
                    l = parseInt(e.figure.minorSpacing || 0),
                    c = parseInt(e.topicView.figure.borderWidth || 0),
                    f = this.getChildrenSize(e, i);
                let h, p, T, u;
                if (r.length) {
                    const g = r[0],
                        Q = r[r.length - 1],
                        m =
                            Object(d.a)(
                                e.topicView.topicShapeStyle
                            ).getControlPosition(e, g).y - e.linePosition.y,
                        b =
                            Object(d.a)(
                                g.topicView.topicShapeStyle
                            ).getEndAnchorPosition(this, g).y -
                            g.linePosition.y,
                        C =
                            Object(d.a)(
                                Q.topicView.topicShapeStyle
                            ).getEndAnchorPosition(this, Q).y -
                            Q.linePosition.y,
                        L = X(e),
                        y = this.calcSpacingMajor(e);
                    (i
                        ? (h = t.x + t.width + y)
                        : ((h = t.x - y), (t.x = h - f.width)),
                        (p =
                            (Q.boundaryBounds.y +
                                Q.boundaryBounds.height -
                                b -
                                C -
                                g.boundaryBounds.y -
                                f.height) /
                                2 +
                            g.boundaryBounds.y +
                            m));
                    const M = this.getMapOfXOffSetByBranchIndexFromBranchList(
                        e.getChildrenBranchesByType(),
                        i
                    );
                    u = p;
                    let A = o.a.MAX_BRANCH_POSITION_REALIGN_OFFSET + 1;
                    const v = new WeakMap();
                    r.forEach((e) => {
                        let t,
                            n,
                            o = this.getOffsetForChildBranchView(e, r, M);
                        (i
                            ? ((t = h - e.topicView.bounds.x + o + L),
                              (n = u - e.boundaryBounds.y))
                            : ((t = h + e.topicView.bounds.x - o - L),
                              (n = u - e.boundaryBounds.y)),
                            v.set(e, { x: t, y: n }));
                        const d = Object(s.getTopicShape)(
                                e
                            ).getEndAnchorPosition(this, e),
                            f = d && Object(a.t)(d, e),
                            p = n + (null == f ? void 0 : f.y) || 0;
                        (Math.abs(p) < Math.abs(A) && (A = p),
                            (u += e.boundaryBounds.height + l + c));
                    });
                    const E = u - l - c;
                    (Object(q.b)(r, A, E) || (A = 0),
                        r.forEach((e) => {
                            const t = v.get(e);
                            if (t) {
                                const { x: i, y: n } = t;
                                e.setPosition(i, n - A);
                            }
                        }),
                        (T = Math.max(t.y + t.height, p + f.height - A)),
                        (t.y = Math.min(t.y, p - A)),
                        (t.height = T - t.y));
                    const _ = this.getMaxOffsetForNormalChildren(r, M),
                        O = r.map((e) => {
                            const t = Object(a.p)(e, void 0),
                                { boundaryBounds: r } = e,
                                { bounds: o } = e.topicView;
                            if (
                                t === n.DIRECTION.UP ||
                                t === n.DIRECTION.DOWN
                            ) {
                                const e = o.width / 2,
                                    t = {
                                        l: Math.abs(r.x),
                                        r: r.width + r.x,
                                    };
                                return _ + e + t[i ? 'r' : 'l'];
                            }
                            return this.isSpecialOffSetBranchView(e)
                                ? r.width
                                : _ + r.width;
                        });
                    t.width = t.width + L + y + Math.max(...O) + 0;
                }
            },
            getChildrenSize: function (e, t) {
                const i = parseInt(e.figure.minorSpacing || 0),
                    n = parseInt(e.topicView.figure.borderWidth || 0);
                let r = 0,
                    o = 0,
                    a = 0;
                return (
                    e.getChildrenBranchesByType().forEach((e) => {
                        const { width: s, height: l, x: c } = e.boundaryBounds,
                            d = e.topicView.shapeBounds.width;
                        ((r += l + i + n),
                            (o = Math.max(o, s)),
                            (a = Math.max(a, t ? -c - d / 2 : s + c - d / 2)));
                    }),
                    r > 0 && (r -= i + n),
                    { height: r, width: o + a }
                );
            },
            calcSpacingMajor(e) {
                const t = e.getConnectionView().getLineShape(),
                    i = parseInt(`${e.figure.majorSpacing || 0}`);
                let r = i;
                return (
                    [
                        n.BRANCHCONNECTION.CURVE,
                        n.BRANCHCONNECTION.STRAIGHT,
                        n.BRANCHCONNECTION.FOLD,
                        n.BRANCHCONNECTION.ROUNDEDFOLD,
                        n.BRANCHCONNECTION.BIGHT,
                    ].includes(t) && (r = 2 * i),
                    (r += Object(s.getLineEndSpacingPatchGap)(e)),
                    r
                );
            },
        });
        var te = Object.assign({}, ee, {
            STRUCTURECLASS: n.STRUCTURECLASS.LOGICRIGHT,
            calAttachedChildrenPos: function (e, t) {
                ee.calAttachedChildrenPos.call(this, e, t, !0);
            },
            checkCalloutPosition: function (e, t) {
                return N.a.restrictCalloutToLeft(e, t);
            },
            getAvailableChildStructure: function (e, t) {
                return n.RIGHT_EXPOSED_STRUCTURE;
            },
        });
        var ie = Object.assign({}, ee, {
            calAttachedChildrenPos(e, t, i) {
                const n = e.getChildrenBranchesByType();
                if (!n.length) return;
                const r = this.getChildrenSize(e, i),
                    o = this.calcSpacingMajor(e);
                let a;
                i
                    ? (a = t.x + t.width + o)
                    : ((a = t.x - o), (t.x = a - r.width));
                const s = n[0],
                    l = n[n.length - 1],
                    c =
                        Object(d.a)(
                            e.topicView.figure.shapeClass
                        ).getControlPosition(e, s).y - e.linePosition.y,
                    f =
                        Object(d.a)(
                            s.topicView.figure.shapeClass
                        ).getEndAnchorPosition(this, s).y - s.linePosition.y,
                    h =
                        Object(d.a)(
                            l.topicView.figure.shapeClass
                        ).getEndAnchorPosition(this, l).y - l.linePosition.y,
                    p =
                        (l.boundaryBounds.y +
                            l.boundaryBounds.height -
                            f -
                            h -
                            s.boundaryBounds.y -
                            r.height) /
                            2 +
                        s.boundaryBounds.y +
                        c;
                let T = p;
                n.forEach((t) => {
                    let n, r;
                    (i
                        ? ((n = a - t.bounds.x), (r = T - t.boundaryBounds.y))
                        : ((n = a - t.bounds.x - t.bounds.width),
                          (r = T - t.boundaryBounds.y)),
                        t.setPosition(n, r));
                    const o = parseInt(`${e.figure.minorSpacing || 0}`),
                        s = parseInt(`${e.topicView.figure.borderWidth || 0}`);
                    T += t.boundaryBounds.height + o + s;
                });
                const u = Math.max(t.y + t.height, p + r.height);
                ((t.y = Math.min(t.y, p)),
                    (t.height = u - t.y),
                    (t.width = t.width + o + r.width));
            },
        });
        var ne = Object.assign({}, te, {
            STRUCTURECLASS: n.STRUCTURECLASS.BRACERIGHT,
            calAttachedChildrenPos(e, t) {
                return ie.calAttachedChildrenPos.call(this, e, t, !0);
            },
        });
        var re = V.a.extend({}, ee, {
            STRUCTURECLASS: n.STRUCTURECLASS.LOGICLEFT,
            calAttachedChildrenPos: function (e, t) {
                ee.calAttachedChildrenPos.call(this, e, t, !1);
            },
            getSummaryDirection: function () {
                return n.DIRECTION.LEFT;
            },
            getSourceOrientation: function () {
                return n.DIRECTION.LEFT;
            },
            getChildTargetOrientation: function () {
                return n.DIRECTION.RIGHT;
            },
            checkCalloutPosition: function (e, t) {
                return N.a.restrictCalloutToRight(e, t);
            },
            getAvailableChildStructure: function (e, t) {
                return n.LEFT_EXPOSED_STRUCTURE;
            },
        });
        var oe = Object.assign({}, re, {
            STRUCTURECLASS: n.STRUCTURECLASS.BRACELEFT,
            calAttachedChildrenPos(e, t) {
                return ie.calAttachedChildrenPos.call(this, e, t);
            },
        });
        const ae = o.a.PADDING,
            se = o.a.BOUNDARYGAP,
            le = N.a.sortBoundaries;
        var ce = V.a.extend({}, J, {
            isSpecialLineShape(e) {
                return (
                    e === n.BRANCHCONNECTION.STRAIGHT ||
                    e === n.BRANCHCONNECTION.CURVE ||
                    e === n.BRANCHCONNECTION.FOLD ||
                    e === n.BRANCHCONNECTION.ROUNDEDFOLD
                );
            },
            calAttachedChildrenPos(e, t, i) {
                const n = e.getChildrenBranchesByType(),
                    r = se,
                    o = parseInt(e.figure.minorSpacing || 0),
                    a = parseInt(e.topicView.figure.borderWidth || 0);
                let l = 0,
                    c = 0,
                    d = 0;
                e.boundaries.length && le(e.boundaries);
                const f = Object(s.getLineEndSpacingPatchGap)(e);
                if (n.length) {
                    const s = e.getConnectionView().getLineShape();
                    (e.isCentralBranch() || (d = 15),
                        (l = i
                            ? r + d + (e.isCentralBranch() ? 30 : 0) + f
                            : -r - d - (e.isCentralBranch() ? 30 : 0) - f),
                        (c = t.y + t.height + 2 * ae));
                    const h = n.reduce(
                        (e, t) =>
                            i
                                ? Math.max(
                                      e,
                                      t.topicView.bounds.x - t.boundaryBounds.x
                                  )
                                : Math.max(
                                      e,
                                      t.boundaryBounds.x +
                                          t.boundaryBounds.width -
                                          t.topicView.bounds.x -
                                          t.topicView.bounds.width
                                  ),
                        Number.MIN_SAFE_INTEGER
                    );
                    if (this.isSpecialLineShape(s)) {
                        const e =
                                Math.tan((30 * Math.PI) / 180) *
                                (Math.abs(l) + Math.abs(h)),
                            t = n[0].topicView.bounds.height / 2;
                        e > t && (c += e - t);
                    }
                    n.forEach((e) => {
                        const t = i
                                ? l - e.topicView.bounds.x + h
                                : l + e.topicView.bounds.x - h,
                            n = c - e.boundaryBounds.y;
                        (e.setPosition(t, n),
                            (c += e.boundaryBounds.height + o + a));
                    });
                    const p = this.getChildrenSize(e);
                    Object.assign(t, Object(Y.c)(t, p));
                }
            },
            drawAttachedConnectLine(e, t, i) {
                void 0 === i && (i = t.branchIndex());
                const { isLineTapered: r } = N.a,
                    o = e.getConnectionView().getLineShape(),
                    a = Object(d.a)(
                        e.topicView.topicShapeStyle
                    ).getStartAnchorPosition(e, t),
                    s = Object.assign(
                        {},
                        Object(d.a)(
                            e.topicView.topicShapeStyle
                        ).getControlPosition(e, t)
                    ),
                    l = Object(d.a)(
                        t.topicView.topicShapeStyle
                    ).getEndAnchorPosition(this, t);
                var c;
                (this.isSpecialLineShape(o)
                    ? (s.y =
                          l.y -
                          ((c = 30),
                          Math.abs(l.x - s.x) * Math.tan((c * Math.PI) / 180)))
                    : o === n.BRANCHCONNECTION.ROUNDEDELBOW
                      ? (s.y = a.y)
                      : (s.y = l.y),
                    I(o)(t, { startPt: a, ctrlPt: s, endPt: l }, r(e), !1));
            },
        });
        var de = V.a.extend({}, ce, {
            STRUCTURECLASS: n.STRUCTURECLASS.TREERIGHT,
            calAttachedChildrenPos: function (e, t) {
                ce.calAttachedChildrenPos.call(this, e, t, !0);
            },
            getSourceOrientation: function () {
                return n.DIRECTION.DOWN;
            },
            checkCalloutPosition: function (e, t) {
                return N.a.restrictCalloutToLeft(e, t);
            },
            getPointsOfBase(e) {
                const t = e.topicView.bounds,
                    i = e.isCentralBranch() || e.isDetachedBranch() ? 0 : 1;
                return [
                    { x: 0, y: t.y + i * t.height },
                    { x: t.width, y: t.y + i * t.height },
                ];
            },
            getPointsOfNoChildren(e) {
                const t = e.topicView.bounds;
                return [
                    {
                        x: t.x + (11 * t.width) / 6,
                        y: t.y + t.height + F.virtualConnLen,
                    },
                    { x: 0, y: t.y + t.height + F.virtualConnLen },
                ];
            },
            getAvailableChildStructure: function (e, t) {
                return n.TREE_RIGHT_EXPOSED_STRUCTURE;
            },
        });
        var fe = V.a.extend({}, ce, {
            STRUCTURECLASS: n.STRUCTURECLASS.TREELEFT,
            calAttachedChildrenPos: function (e, t) {
                ce.calAttachedChildrenPos.call(this, e, t, !1);
            },
            getSourceOrientation: function () {
                return n.DIRECTION.DOWN;
            },
            getSummaryDirection: function () {
                return n.DIRECTION.LEFT;
            },
            getChildTargetOrientation: function () {
                return n.DIRECTION.RIGHT;
            },
            checkCalloutPosition: function (e, t) {
                return N.a.restrictCalloutToRight(e, t);
            },
            getPointsOfBase(e) {
                const t = e.topicView.bounds,
                    i = e.isCentralBranch() || e.isDetachedBranch() ? 0 : 1;
                return [
                    { x: t.x, y: t.y + i * t.height },
                    { x: 0, y: t.y + i * t.height },
                ];
            },
            getPointsOfNoChildren(e) {
                const t = e.topicView.bounds;
                return [
                    { x: 0, y: t.y + t.height + F.virtualConnLen },
                    {
                        x: t.x - (5 * t.width) / 6,
                        y: t.y + t.height + F.virtualConnLen,
                    },
                ];
            },
            getAvailableChildStructure: function (e, t) {
                return n.TREE_LEFT_EXPOSED_STRUCTURE;
            },
        });
        var he = Object.assign({}, J, {
            getChildrenSize(e, t) {
                let i = 0,
                    r = 0;
                const o = parseInt(e.figure.minorSpacing || 0),
                    a = parseInt(e.topicView.figure.borderWidth || 0);
                return (
                    e
                        .getChildrenBranchesByType(n.TOPIC_TYPE.ATTACHED)
                        .forEach((e) => {
                            ((r += e.boundaryBounds.width + o + a),
                                (i = Math.max(i, e.boundaryBounds.height)));
                        }),
                    r > 0 && (r -= o + a),
                    { height: i, width: r }
                );
            },
            calAttachedChildrenPos(e, t, i) {
                const r = e.getChildrenBranchesByType(n.TOPIC_TYPE.ATTACHED),
                    s = this.calcSpacingMajor(e),
                    l = parseInt(e.figure.minorSpacing || 0),
                    c = parseInt(e.topicView.figure.borderWidth || 0),
                    d = this.getChildrenSize(e, i);
                if (r.length > 0) {
                    let f = -d.width / 2;
                    if (r.length > 1) {
                        let e = d.width;
                        const t = r[0],
                            i = r[r.length - 1];
                        ((e += t.boundaryBounds.x),
                            (e -= i.boundaryBounds.width),
                            (e -= i.boundaryBounds.x),
                            (f = -e / 2 + t.boundaryBounds.x));
                    }
                    const h = d.width / 2,
                        p = -t.width / 2,
                        T = t.width / 2,
                        u = X(e);
                    let g;
                    (i
                        ? (g = t.y + t.height + s)
                        : ((g = t.y - s), (t.y = Math.min(t.y, g - d.height))),
                        (t.x = Math.min(f, p)));
                    let Q = Number.MIN_VALUE;
                    r.forEach((e) => {
                        Q = i
                            ? Math.max(
                                  Q,
                                  e.topicView.bounds.y - e.boundaryBounds.y
                              )
                            : Math.max(
                                  Q,
                                  e.boundaryBounds.y +
                                      e.boundaryBounds.height -
                                      e.topicView.bounds.y -
                                      e.topicView.bounds.height
                              );
                    });
                    let m = o.a.MAX_BRANCH_POSITION_REALIGN_OFFSET + 1;
                    const b = new WeakMap();
                    let C = f;
                    r.forEach((e) => {
                        const { x: t, width: n } = e.boundaryBounds,
                            r = C - t,
                            o = i
                                ? g - e.topicView.bounds.y + Q + u
                                : g + e.topicView.bounds.y - Q - u;
                        (b.set(e, { x: r, y: o }),
                            Math.abs(r) < Math.abs(m) && (m = r),
                            (C += n + l + c));
                    });
                    const L = C - l - c;
                    (Object(q.b)(r, m, L) ? (t.x -= m) : (m = 0),
                        r.forEach((e) => {
                            const t = b.get(e);
                            if (t) {
                                const { x: i, y: n } = t;
                                e.setPosition(i - m, n);
                            }
                        }));
                    const y = -d.width / 2;
                    t.width = Math.max(h, T) - Math.min(y, p);
                    const M = r.map((e) => {
                        const t = Object(a.p)(e, void 0),
                            { boundaryBounds: r } = e,
                            { bounds: o } = e.topicView;
                        if (t === n.DIRECTION.LEFT || t === n.DIRECTION.RIGHT) {
                            const e = o.height / 2,
                                t = i ? r.height + r.y : Math.abs(r.y);
                            return Q + e + t;
                        }
                        return Q + e.boundaryBounds.height;
                    });
                    t.height = t.height + s + u + Math.max(...M);
                }
            },
            calcSpacingMajor(e) {
                const t = e.getConnectionView().getLineShape(),
                    i = parseInt(e.figure.majorSpacing || 0);
                return (
                    ([
                        n.BRANCHCONNECTION.CURVE,
                        n.BRANCHCONNECTION.STRAIGHT,
                        n.BRANCHCONNECTION.FOLD,
                        n.BRANCHCONNECTION.ROUNDEDFOLD,
                        n.BRANCHCONNECTION.BIGHT,
                    ].includes(t)
                        ? 2 * i
                        : i) + Object(s.getLineEndSpacingPatchGap)(e)
                );
            },
        });
        var pe = V.a.extend({}, he, {
            STRUCTURECLASS: n.STRUCTURECLASS.ORGCHARTDOWN,
            calAttachedChildrenPos: function (e, t) {
                he.calAttachedChildrenPos.call(this, e, t, !0);
            },
            getRangeGrowthDirection: function () {
                return n.DIRECTION.RIGHT;
            },
            getSummaryDirection: function () {
                return n.DIRECTION.DOWN;
            },
            getSourceOrientation: function () {
                return n.DIRECTION.DOWN;
            },
            getChildTargetOrientation: function () {
                return n.DIRECTION.UP;
            },
            getAvailableChildStructure: function (e, t) {
                return n.ATTACHED_EXPOSED_STRUCTURE.filter(
                    (e) => !(0 === e.indexOf('org.xmind.ui.org-chart.up'))
                );
            },
        });
        var Te = V.a.extend({}, he, {
            STRUCTURECLASS: n.STRUCTURECLASS.ORGCHARTUP,
            calAttachedChildrenPos: function (e, t) {
                he.calAttachedChildrenPos.call(this, e, t, !1);
            },
            getRangeGrowthDirection: function () {
                return n.DIRECTION.RIGHT;
            },
            getSummaryDirection: function () {
                return n.DIRECTION.UP;
            },
            getSourceOrientation: function () {
                return n.DIRECTION.UP;
            },
            getChildTargetOrientation: function () {
                return n.DIRECTION.DOWN;
            },
            getAvailableChildStructure: function (e, t) {
                return n.TOP_EXPOSED_STRUCTURE;
            },
        });
        var ue = V.a.extend({}, J, {
            getBalanceTreeHeight(e) {
                var t;
                if (!e.isCentralBranch() && !e.isDetachedBranch()) return;
                const i =
                        null !== (t = e.figure.minorSpacing) && void 0 !== t
                            ? t
                            : 0,
                    n = this.calcNumRight(e),
                    r = e.getChildrenBranchesByType(),
                    o = r.length;
                let a,
                    s = 0,
                    l = 0,
                    c = 0,
                    d = 0,
                    f = 0,
                    h = 0;
                const p = Math.min(n, r.length);
                for (a = 0; a < p; a++)
                    (a < n - 1 && (s += i),
                        (s += r[a].boundaryBounds.height),
                        (c =
                            c < r[a].boundaryBounds.width
                                ? r[a].boundaryBounds.width
                                : c));
                for (a = n; a < o; a++)
                    (a < o - 1 && (l += i),
                        (l += r[a].boundaryBounds.height),
                        (d =
                            d < r[a].boundaryBounds.width
                                ? r[a].boundaryBounds.width
                                : d));
                return (
                    (f = d + e.boundaryBounds.width + c + 2 * i),
                    (h = s > l ? s : l),
                    {
                        pos: p,
                        rightHeightTotal: s,
                        leftHeightTotal: l,
                        rightWidthTotal: c,
                        leftWidthTotal: d,
                        widthTotal: f,
                        heightTotal: h,
                    }
                );
            },
            calcNumRight(e) {
                if (void 0 !== e.numRightInDraging) return e.numRightInDraging;
                const t = this.getTotalWeight(e) / 2;
                let i,
                    n,
                    r,
                    o,
                    a = -1,
                    s = 0,
                    l = 0;
                const c = e.getChildrenBranchesByType(),
                    d = c.length;
                for (i = 0; i < d; i++)
                    if (
                        ((l += this.getWeight(c[i])),
                        (o = i + 1),
                        !this.isInSameRangeWithLast(e, i + 1))
                    ) {
                        if (((n = s + l), n >= t))
                            return a >= 0 && n - t > t - s
                                ? ((r = a + 1),
                                  1 === i &&
                                  0 === a &&
                                  (this.isInSameRangeWithLast(e, i) ||
                                      (this.isWithinThreshold(c[0], d) &&
                                          this.isWithinThreshold(c[i], d)))
                                      ? 2
                                      : r)
                                : 0 === i &&
                                    this.isWithinThreshold(c[i], d) &&
                                    (2 === d ||
                                        (d > 2 &&
                                            !this.isInSameRangeWithLast(
                                                e,
                                                2
                                            ))) &&
                                    this.isWithinThreshold(c[1], d)
                                  ? 2
                                  : o;
                        ((s = n), (l = 0), (a = i));
                    }
                return i;
            },
            getTotalWeight(e) {
                let t = 0;
                return (
                    V.a.each(e.getChildrenBranchesByType(), (e) => {
                        t += this.getWeight(e);
                    }),
                    t
                );
            },
            getWeight(e) {
                return e.boundaryBounds.height + (o.a.PADDING / 2) * 3;
            },
            isWithinThreshold(e, t) {
                return this.getWeight(e) < 200 * (Math.log(t) + 1);
            },
            getChildTargetOrientation(e, t) {
                return t < this.calcNumRight(e)
                    ? n.DIRECTION.LEFT
                    : n.DIRECTION.RIGHT;
            },
            calSidePos(e) {
                const {
                    side: t,
                    spacingMajor: i,
                    spacingMinor: n,
                    children: r,
                    newBounds: l,
                    isUpToDown: c,
                    offsetX: d = 0,
                    offsetY: f = 0,
                } = e;
                if (!r || 0 === r.length) return;
                const h = this.getMinSumTopicSpacing(r, l);
                let p = h;
                const T = [0];
                r.forEach((e, t) => {
                    if (0 === t) return;
                    const i = r[t - 1];
                    ((T[t] = Math.max(
                        T[t - 1] +
                            i.boundaryBounds.y +
                            i.boundaryBounds.height +
                            n -
                            e.boundaryBounds.y,
                        T[t - 1] +
                            i.topicView.bounds.y +
                            i.topicView.bounds.height +
                            p / (r.length - t) -
                            e.topicView.bounds.y
                    )),
                        (p -=
                            T[t] +
                            e.topicView.bounds.y -
                            (T[t - 1] +
                                i.topicView.bounds.y +
                                i.topicView.bounds.height)));
                });
                const u = r[0],
                    g = r[r.length - 1],
                    Q =
                        Object(s.getTopicShape)(u).getEndAnchorPosition(this, u)
                            .y - u.linePosition.y,
                    m =
                        Object(s.getTopicShape)(g).getEndAnchorPosition(this, g)
                            .y - g.linePosition.y;
                let b,
                    C = -((Q + T[0] + m + T[r.length - 1]) / 2);
                (u === g &&
                    (C =
                        ((c ? -1 : 1) * h) / 2 -
                        u.topicView.bounds.y -
                        (c ? 1 : 0) * u.topicView.bounds.height),
                    (b = 'left' === t ? l.x - i : l.x + l.width + i));
                let L = o.a.MAX_BRANCH_POSITION_REALIGN_OFFSET + 1;
                const y = new WeakMap(),
                    M = this.getMapOfXOffSetByBranchIndexFromBranchList(
                        r,
                        'right' === t
                    );
                r.forEach((e, i) => {
                    e.changeTag(t);
                    const n = C + T[i],
                        o = this.getOffsetForChildBranchView(e, r, M),
                        l = e.model.get('position');
                    if (Object(s.isFreePositionBranch)(e) && l) y.set(e, l);
                    else {
                        let i, r;
                        ('left' === t
                            ? ((i = b + e.topicView.bounds.x - o - d),
                              (r = n + f))
                            : ((i = b - e.topicView.bounds.x + o + d),
                              (r = n + f)),
                            y.set(e, { x: i, y: r }));
                        const l = Object(s.getTopicShape)(
                                e
                            ).getEndAnchorPosition(this, e),
                            c = l && Object(a.t)(l, e),
                            h = r + (null == c ? void 0 : c.y) || 0;
                        Math.abs(h) < Math.abs(L) && (L = h);
                    }
                });
                const A = r
                    .map((e) => e.boundaryBounds.height + n)
                    .reduce((e, t) => e + t, -n);
                (Object(q.b)(r, L, A) || (L = 0),
                    r.forEach((e) => {
                        const t = y.get(e);
                        if (t) {
                            const { x: i, y: n } = t;
                            e.setPosition(i, n - L);
                        }
                    }));
            },
            calBounds(e, t) {
                const i = e.getChildrenBranchesByType(n.TOPIC_ATTACHED);
                return V.a.extend(t, N.a.mergeBounds(i, t));
            },
            getCalloutStructure(e, t) {
                return (t.model.get('position') || { x: 0, y: 0 }).x <= 0
                    ? n.STRUCTURECLASS.LOGICLEFT
                    : n.STRUCTURECLASS.LOGICRIGHT;
            },
            getMinSumTopicSpacing(e, t) {
                let i,
                    n = 80;
                t.height > 230 && (n = Math.min(180, t.height - 230 + n));
                return (
                    (i =
                        e.length <= 2
                            ? n
                            : e.reduce(
                                  (t, i, n) =>
                                      0 !== n && n !== e.length - 1
                                          ? t - i.boundaryBounds.height
                                          : t,
                                  n
                              )),
                    i
                );
            },
            calcPolygons(e) {
                const t = [],
                    i = [],
                    r = [],
                    o = e.getChildrenBranchesByType(),
                    a = e.getRealPosition();
                o.forEach((e) => {
                    e.getRealPosition().x - a.x < 0 ? i.push(e) : r.push(e);
                });
                const s = [...this.getPointsOfBase(e)];
                if (0 === i.length)
                    s.push(...this.getPointsOfNoChildren(e, n.DIRECTION.LEFT));
                else {
                    const t = this.getPointsOfNoChildren(e, n.DIRECTION.LEFT),
                        r = F.getPointsOfUDChildren(i, !0),
                        o = F.getSidePointsWithGap(i[0], n.DIRECTION.DOWN),
                        a = F.getSidePointsWithGap(
                            i[i.length - 1],
                            n.DIRECTION.UP
                        );
                    s.push(...r, ...o, ...a, ...t);
                }
                const l = C.a.convexHull(s);
                t.push({
                    points: l,
                    pointList: l,
                    relatedBranchViewList: i,
                    side: 'left',
                });
                const c = [...this.getPointsOfBase(e)];
                if (0 === r.length)
                    c.push(...this.getPointsOfNoChildren(e, n.DIRECTION.RIGHT));
                else {
                    const t = this.getPointsOfNoChildren(e, n.DIRECTION.RIGHT),
                        i = F.getPointsOfUDChildren(r, !1),
                        o = F.getSidePointsWithGap(r[0], n.DIRECTION.UP),
                        a = F.getSidePointsWithGap(
                            r[r.length - 1],
                            n.DIRECTION.DOWN
                        );
                    c.push(...t, ...i, ...o, ...a);
                }
                const d = C.a.convexHull(c);
                return (
                    t.push({
                        points: C.a.convexHull(d),
                        pointList: d,
                        relatedBranchViewList: r,
                        side: 'right',
                    }),
                    t
                );
            },
            getPointsOfBase(e) {
                return [
                    { x: 0, y: e.topicView.bounds.y - 60 },
                    {
                        x: 0,
                        y:
                            e.topicView.bounds.y +
                            e.topicView.bounds.height +
                            60,
                    },
                ];
            },
            getPointsOfNoChildren(e, t) {
                return F.getPointsOfNoChildren(e, t);
            },
            calcSpacingMajor(e) {
                const t = e.getConnectionView().getLineShape();
                return [
                    n.BRANCHCONNECTION.FOLD,
                    n.BRANCHCONNECTION.ROUNDEDFOLD,
                    n.BRANCHCONNECTION.BIGHT,
                ].includes(t)
                    ? 3 * o.a.LINECOLPOS +
                          Object(s.getLineEndSpacingPatchGap)(e)
                    : J.calcSpacingMajor.call(this, e);
            },
            _isRight(e, t) {
                return e < this.calcNumRight(t);
            },
            getAvailableChildStructure(e, t) {
                const i = t.branchIndex();
                return this._isRight(i, e)
                    ? n.RIGHT_EXPOSED_STRUCTURE
                    : n.LEFT_EXPOSED_STRUCTURE;
            },
        });
        var ge = Object(B.extend)({}, ue, {
            STRUCTURECLASS: n.STRUCTURECLASS.MAPCLOCKWISE,
            calAttachedChildrenPos(e, t) {
                var i;
                const r = e.getChildrenBranchesByType(n.TOPIC_ATTACHED),
                    o = this.calcSpacingMajor(e),
                    a =
                        null !== (i = e.figure.minorSpacing) && void 0 !== i
                            ? i
                            : 0,
                    s = this.calcNumRight(e);
                if (
                    (e.figure.setBalanceRightNumber(s),
                    r.length && (e.isCentralBranch() || e.isDetachedBranch()))
                ) {
                    const i = r.slice(0, s),
                        n = r.slice(s).reverse(),
                        l = X(e, n),
                        c = X(e, i);
                    (this.calSidePos({
                        side: 'right',
                        spacingMajor: o,
                        spacingMinor: a,
                        newBounds: t,
                        children: i,
                        isUpToDown: !0,
                        offsetX: c,
                    }),
                        this.calSidePos({
                            side: 'left',
                            spacingMajor: o,
                            spacingMinor: a,
                            newBounds: t,
                            children: n,
                            isUpToDown: !1,
                            offsetX: l,
                        }),
                        this.calBounds(e, t));
                }
            },
            getRangeGrowthDirection(e, t) {
                return t < this.calcNumRight(e)
                    ? n.DIRECTION.DOWN
                    : n.DIRECTION.UP;
            },
            getSummaryDirection(e, t) {
                return this.getChildTargetOrientation(e, t) === n.DIRECTION.LEFT
                    ? n.DIRECTION.RIGHT
                    : n.DIRECTION.LEFT;
            },
            getSourceOrientation() {
                return n.DIRECTION.NONE;
            },
            getChildTargetOrientation(e, t) {
                return t < this.calcNumRight(e)
                    ? n.DIRECTION.LEFT
                    : n.DIRECTION.RIGHT;
            },
            getChildStructure(e, t, i) {
                const r = i.getChildrenBranchesByType()[t].model;
                if (
                    Object(s.isFreePositionBranch)(i) &&
                    (null == r ? void 0 : r.get('position'))
                )
                    return r.get('position').x > 0
                        ? n.STRUCTURECLASS.LOGICRIGHT
                        : n.STRUCTURECLASS.LOGICLEFT;
                return t < this.calcNumRight(i)
                    ? n.STRUCTURECLASS.LOGICRIGHT
                    : n.STRUCTURECLASS.LOGICLEFT;
            },
        });
        var Qe = V.a.extend({}, ue, {
            STRUCTURECLASS: n.STRUCTURECLASS.MAPANTICLOCKWISE,
            calAttachedChildrenPos(e, t) {
                var i;
                const r = this.calcSpacingMajor(e),
                    o =
                        null !== (i = e.figure.minorSpacing) && void 0 !== i
                            ? i
                            : 0,
                    a = e.getChildrenBranchesByType(n.TOPIC_ATTACHED),
                    s = this.calcNumRight(e);
                if (a.length && (e.isCentralBranch() || e.isDetachedBranch())) {
                    const i = a.slice(s).reverse(),
                        n = a.slice(0, s),
                        l = X(e, n),
                        c = X(e, i);
                    (this.calSidePos({
                        side: 'right',
                        spacingMajor: r,
                        spacingMinor: o,
                        newBounds: t,
                        children: i,
                        isUpToDown: !1,
                        offsetX: c,
                    }),
                        this.calSidePos({
                            side: 'left',
                            spacingMajor: r,
                            spacingMinor: o,
                            newBounds: t,
                            children: n,
                            isUpToDown: !0,
                            offsetX: l,
                        }),
                        this.calBounds(e, t));
                }
            },
            getRangeGrowthDirection(e, t) {
                return t < this.calcNumRight(e)
                    ? n.DIRECTION.DOWN
                    : n.DIRECTION.UP;
            },
            getSummaryDirection(e, t) {
                return this.getChildTargetOrientation(e, t) === n.DIRECTION.LEFT
                    ? n.DIRECTION.RIGHT
                    : n.DIRECTION.LEFT;
            },
            getSourceOrientation() {
                return n.DIRECTION.NONE;
            },
            getChildTargetOrientation(e, t) {
                return t < this.calcNumRight(e)
                    ? n.DIRECTION.RIGHT
                    : n.DIRECTION.LEFT;
            },
            getChildStructure(e, t, i) {
                return t < this.calcNumRight(i)
                    ? n.STRUCTURECLASS.LOGICLEFT
                    : n.STRUCTURECLASS.LOGICRIGHT;
            },
            _isRight(e, t) {
                return e >= this.calcNumRight(t);
            },
        });
        var me = V.a.extend({}, ue, {
            STRUCTURECLASS: n.STRUCTURECLASS.MAP,
            calAttachedChildrenPos(e, t) {
                var i;
                const r = e.getChildrenBranchesByType(n.TOPIC_ATTACHED);
                let o;
                const a =
                        null !== (i = e.figure.minorSpacing) && void 0 !== i
                            ? i
                            : 0,
                    s = this.calcNumRight(e);
                if (
                    (e.figure.setBalanceRightNumber(s),
                    r.length && (e.isCentralBranch() || e.isDetachedBranch()))
                ) {
                    o = this.calcSpacingMajor(e);
                    const i = r.slice(0, s),
                        n = r.slice(s),
                        l = X(e, n),
                        c = X(e, i);
                    (this.calSidePos({
                        side: 'right',
                        spacingMajor: o,
                        spacingMinor: a,
                        newBounds: t,
                        children: i,
                        isUpToDown: !0,
                        offsetX: c,
                    }),
                        this.calSidePos({
                            side: 'left',
                            spacingMajor: o,
                            spacingMinor: a,
                            newBounds: t,
                            children: n,
                            isUpToDown: !0,
                            offsetX: l,
                        }),
                        this.calBounds(e, t));
                }
            },
            getRangeGrowthDirection() {
                return n.DIRECTION.DOWN;
            },
            getSummaryDirection(e, t) {
                return this.getChildTargetOrientation(e, t) === n.DIRECTION.LEFT
                    ? n.DIRECTION.RIGHT
                    : n.DIRECTION.LEFT;
            },
            getSourceOrientation() {
                return n.DIRECTION.NONE;
            },
            getChildStructure(e, t, i) {
                return t < this.calcNumRight(i)
                    ? n.STRUCTURECLASS.LOGICRIGHT
                    : n.STRUCTURECLASS.LOGICLEFT;
            },
        });
        var be = V.a.extend({}, ge, {
                STRUCTURECLASS: n.STRUCTURECLASS.MAPUNBALANCED,
                calcNumRight(e) {
                    const t = e.model.unBalancedInfo();
                    let i = -1;
                    return (
                        t &&
                            'right-number' === t.name &&
                            (i = e.figure.unbalanceRightNumber),
                        (i < 0 || isNaN(i)) &&
                            ((i = ge.calcNumRight.bind(this)(e)),
                            e.model.setUnBalancedInfoContent(i, !0)),
                        i
                    );
                },
            }),
            Ce = i(32);
        var Le = V.a.extend({}, J, {
            STRUCTURECLASS: n.STRUCTURECLASS.TIMELINEHORIZONTAL,
            isAttachedChildrenStructureImmutable: !0,
            getTopicSpacing(e) {
                const t = l.a.getClassName(e);
                return (
                    (100 *
                        parseInt(
                            l.a.getStyleValue(e, n.STYLE_KEYS.SPACING_MAJOR)
                        )) /
                        parseInt(
                            Ce.a.getStyleValue(t, n.STYLE_KEYS.SPACING_MAJOR)
                        ) +
                    Object(s.getLineEndSpacingPatchGap)(e)
                );
            },
            calAttachedChildrenPos(e, t) {
                const i = e.getChildrenBranchesByType(n.TOPIC_TYPE.ATTACHED),
                    r = this.getTopicSpacing(e),
                    o = Object(s.getFinalTimelineChildDirection)(e);
                let a = e,
                    l = e;
                const c = Object(s.getTopicShape)(e),
                    d = Object(G.c)(
                        c.getBasePoint(e, n.DIRECTION.RIGHT),
                        c.getPointOffset(e, n.DIRECTION.RIGHT)
                    ).y;
                i.forEach((t, c) => {
                    const f = o[c] === n.DIRECTION.UP,
                        h = c > 0 ? i[c - 1] : e,
                        p = h === e ? 0 : i[c - 1].position.x,
                        T = Object(s.getTopicShape)(h),
                        u = Object(s.getTopicShape)(t),
                        { x: g } = Object(G.c)(
                            T.getBasePoint(h, n.DIRECTION.RIGHT),
                            T.getPointOffset(h, n.DIRECTION.RIGHT)
                        ),
                        { x: Q, y: m } = u.getBasePoint(t, n.DIRECTION.LEFT),
                        b = p + g + r - Q,
                        C = f ? a : l,
                        L = C !== e ? C.position.x : 0,
                        { x: y, width: M } =
                            C !== e
                                ? C.boundaryBounds
                                : C.topicView.shapeBounds,
                        A = L + M + y + r / 2 - t.boundaryBounds.x;
                    let v = 0;
                    if (
                        c > 0 &&
                        Object(s.isInBoundary)(h) &&
                        !this.isInSameRange(e, c) &&
                        o[c] !== o[c - 1]
                    ) {
                        const { x: e, width: t } = h.boundaryBounds;
                        v = p + t + e + r / 2 - Q;
                    }
                    (t.setPosition({
                        x: Math.max(b, A, v),
                        y: d - m,
                    }),
                        f ? (a = t) : (l = t));
                });
                const f = this.getChildrenSize(e);
                Object.assign(t, Object(Y.c)(t, f));
            },
            drawAttachedConnectLine: function (e, t, i) {
                const r = e.getChildrenBranchesByType(n.TOPIC_TYPE.ATTACHED),
                    o = r.indexOf(t);
                if (-1 === o) return;
                const l = o > 0 ? r[o - 1] : e,
                    c = t.getConnectionView().getLineShape(),
                    d = I(c),
                    f = Object(s.getTopicShape)(l),
                    h = Object(s.getTopicShape)(t),
                    p = Object(a.u)(
                        Object(G.c)(
                            f.getBasePoint(l, n.DIRECTION.RIGHT),
                            f.getPointOffset(l, n.DIRECTION.RIGHT)
                        ),
                        l
                    );
                d(
                    t,
                    {
                        startPt: p,
                        ctrlPt: p,
                        endPt: h.getEndAnchorPosition(
                            n.STRUCTURECLASS.TIMELINEHORIZONTAL,
                            t
                        ),
                    },
                    !1,
                    !1
                );
            },
            getRangeGrowthDirection: function () {
                return n.DIRECTION.RIGHT;
            },
            getSummaryDirection(e, t) {
                return Object(s.getFinalTimelineChildDirection)(e, t);
            },
            getChildStructure(e, t, i) {
                return Object(s.getFinalTimelineChildDirection)(i, t) ===
                    n.DIRECTION.UP
                    ? n.STRUCTURECLASS.TIMELINEHORIZONTALUP
                    : n.STRUCTURECLASS.TIMELINEHORIZONTALDOWN;
            },
            getChildTargetOrientation: (e, t) => n.DIRECTION.LEFT,
            getCalloutStructure: function () {
                return this.STRUCTURECLASS;
            },
            checkCalloutPosition: function (e, t) {
                return N.a.restrictCalloutToLeft(e, t);
            },
            getAvailableChildStructure: function (e, t) {
                return [];
            },
        });
        const ye = o.a.LINECOLPOS,
            Me = N.a.sortBoundaries;
        var Ae = V.a.extend({}, J, {
            STRUCTURECLASS: n.STRUCTURECLASS.TIMELINEHORIZONTALUP,
            getChildrenSize(e) {
                let t = 0,
                    i = 0;
                const r = e.getChildrenBranchesByType(n.TOPIC_TYPE.ATTACHED),
                    o = this.getTopicSpacing(e);
                return (
                    V.a.each(r, (e, n) => {
                        ((t += e.boundaryBounds.height + o),
                            (i = Math.max(i, e.boundaryBounds.width)));
                    }),
                    t > 0 && (t -= o),
                    { height: t, width: i }
                );
            },
            getTopicSpacing(e) {
                const t = l.a.getClassName(e),
                    i = o.a.PADDING;
                return (
                    (parseInt(
                        l.a.getStyleValue(e, n.STYLE_KEYS.SPACING_MAJOR)
                    ) *
                        i) /
                        parseInt(
                            Ce.a.getStyleValue(t, n.STYLE_KEYS.SPACING_MAJOR)
                        ) +
                    Object(s.getLineEndSpacingPatchGap)(e)
                );
            },
            calAttachedChildrenPos(e, t) {
                const i = this.getChildrenSize(e),
                    r = parseInt(e.topicView.figure.lineCorner || 0),
                    o = e.getChildrenBranchesByType(n.TOPIC_TYPE.ATTACHED);
                if ((e.boundaries.length && Me(e.boundaries), o.length)) {
                    const a = this.getTopicSpacing(e),
                        s = e
                            .parent()
                            .getChildrenBranchesByType(n.TOPIC_TYPE.ATTACHED),
                        l = s.indexOf(e),
                        c = s[l + 1];
                    let d = 0;
                    if (c) {
                        const t = e.topicView.bounds.height,
                            i = c.topicView.bounds.height;
                        t < i && (d = (i - t) / 2);
                    }
                    const f = t.x + t.width + t.x + a;
                    let h = t.y - ye - r - i.height - d;
                    ((t.y = h), (t.height += i.height + ye + r + d));
                    const p = a + i.width;
                    (p >= t.width / 2 && (t.width = t.width / 2 + p),
                        o.forEach((e) => {
                            (e.setPosition(
                                f - e.boundaryBounds.x,
                                h - e.boundaryBounds.y
                            ),
                                (h += e.boundaryBounds.height + a));
                        }));
                }
            },
            getSourceOrientation: function () {
                return n.DIRECTION.UP;
            },
            getChildTargetOrientation: () => n.DIRECTION.LEFT,
            getChildStructure: function () {
                return n.STRUCTURECLASS.LOGICRIGHT;
            },
            getSummaryDirection: function () {
                return n.DIRECTION.RIGHT;
            },
            checkCalloutPosition: function (e, t) {
                const i = N.a.restrictCalloutToLeft(e, t),
                    n = N.a.restrictCalloutToBottom(e, t);
                return N.a.mergeCalloutOffset(i, n);
            },
            getAvailableChildStructure: function (e, t) {
                return [];
            },
            drawAttachedConnectLine(e, t) {
                const { isLineTapered: i } = N.a,
                    r = t.getConnectionView().figure.lineShape,
                    o = Object(d.a)(
                        e.topicView.topicShapeStyle
                    ).getStartAnchorPosition(e, t),
                    a = Object.assign(
                        {},
                        Object(d.a)(
                            e.topicView.topicShapeStyle
                        ).getControlPosition(e, t)
                    ),
                    s = Object(d.a)(
                        t.topicView.topicShapeStyle
                    ).getEndAnchorPosition(this, t);
                var l;
                (r === n.BRANCHCONNECTION.BIGHT
                    ? (a.y = s.y)
                    : (a.y =
                          s.y +
                          ((l = 30),
                          Math.abs(s.x - a.x) * Math.tan((l * Math.PI) / 180))),
                    I(r)(t, { startPt: o, ctrlPt: a, endPt: s }, i(e), !1));
            },
        });
        var ve = V.a.extend({}, J, {
                STRUCTURECLASS: n.STRUCTURECLASS.TIMELINEHORIZONTALDOWN,
                getChildrenSize(e) {
                    let t = 0,
                        i = 0;
                    const r = e.getChildrenBranchesByType(
                            n.TOPIC_TYPE.ATTACHED
                        ),
                        o = this.getTopicSpacing(e);
                    return (
                        V.a.each(r, (e, n) => {
                            ((t += e.boundaryBounds.height + o),
                                (i = Math.max(i, e.boundaryBounds.width)));
                        }),
                        t > 0 && (t -= o),
                        { height: t, width: i }
                    );
                },
                getTopicSpacing(e) {
                    const t = l.a.getClassName(e),
                        i = o.a.PADDING;
                    return (
                        (parseInt(
                            l.a.getStyleValue(e, n.STYLE_KEYS.SPACING_MAJOR)
                        ) *
                            i) /
                            parseInt(
                                Ce.a.getStyleValue(
                                    t,
                                    n.STYLE_KEYS.SPACING_MAJOR
                                )
                            ) +
                        Object(s.getLineEndSpacingPatchGap)(e)
                    );
                },
                calAttachedChildrenPos(e, t) {
                    const i = e,
                        r = this.getChildrenSize(i),
                        o = i.getChildrenBranchesByType(n.TOPIC_TYPE.ATTACHED);
                    if (o.length) {
                        const i = this.getTopicSpacing(e),
                            a = e
                                .parent()
                                .getChildrenBranchesByType(
                                    n.TOPIC_TYPE.ATTACHED
                                ),
                            s = a.indexOf(e),
                            l = a[s + 1];
                        let c = 0;
                        if (l) {
                            const t = e.topicView.bounds.height,
                                i = l.topicView.bounds.height;
                            t < i && (c = (i - t) / 2);
                        }
                        const d = t.x + t.width + t.x + i;
                        let f = t.y + t.height + i + c;
                        const h = Math.max(t.y + t.height, f + r.height);
                        ((t.y = Math.min(t.y, f)), (t.height = h - t.y + c));
                        const p = i + r.width;
                        (p >= t.width / 2 && (t.width = t.width / 2 + p),
                            V.a.each(o, (e, t) => {
                                (e.setPosition(
                                    d - e.boundaryBounds.x,
                                    f - e.boundaryBounds.y
                                ),
                                    (f += e.boundaryBounds.height + i));
                            }));
                    }
                },
                getSummaryDirection: function () {
                    return n.DIRECTION.RIGHT;
                },
                getSourceOrientation: function () {
                    return n.DIRECTION.DOWN;
                },
                getChildTargetOrientation: () => n.DIRECTION.LEFT,
                getChildStructure: function () {
                    return n.STRUCTURECLASS.LOGICRIGHT;
                },
                checkCalloutPosition: function (e, t) {
                    const i = N.a.restrictCalloutToLeft(e, t),
                        n = N.a.restrictCalloutToTop(e, t);
                    return N.a.mergeCalloutOffset(i, n);
                },
                getAvailableChildStructure: function (e, t) {
                    return [];
                },
                drawAttachedConnectLine(e, t) {
                    const { isLineTapered: i } = N.a,
                        r = t.getConnectionView().figure.lineShape,
                        o = Object(d.a)(
                            e.topicView.topicShapeStyle
                        ).getStartAnchorPosition(e, t),
                        a = Object.assign(
                            {},
                            Object(d.a)(
                                e.topicView.topicShapeStyle
                            ).getControlPosition(e, t)
                        ),
                        s = Object(d.a)(
                            t.topicView.topicShapeStyle
                        ).getEndAnchorPosition(this, t);
                    var l;
                    (r === n.BRANCHCONNECTION.BIGHT
                        ? (a.y = s.y)
                        : (a.y =
                              s.y -
                              ((l = 30),
                              Math.abs(s.x - a.x) *
                                  Math.tan((l * Math.PI) / 180))),
                        I(r)(t, { startPt: o, ctrlPt: a, endPt: s }, i(e), !1));
                },
            }),
            Ee = i(35);
        const _e = o.a.PADDING;
        var Oe = V.a.extend({}, J, {
                STRUCTURECLASS: n.STRUCTURECLASS.TIMELINEVERTICAL,
                isAttachedChildrenStructureImmutable: !0,
                getRightSide(e) {
                    const t = e.getChildrenBranchesByType();
                    if (t.length) {
                        const i = [0];
                        t[0].changeTag('right');
                        let n,
                            r = !0;
                        for (n = 1; n < t.length; n++) {
                            this.isInSameRange(e, n)
                                ? r
                                    ? (t[n].changeTag('right'), i.push(n))
                                    : t[n].changeTag('left')
                                : r
                                  ? ((r = !1), t[n].changeTag('left'))
                                  : ((r = !0),
                                    t[n].changeTag('right'),
                                    i.push(n));
                        }
                        return i;
                    }
                },
                calAttachedChildrenPos(e, t) {
                    const i = e.getChildrenBranchesByType(
                        n.TOPIC_TYPE.ATTACHED
                    );
                    if (i.length) {
                        (t.x, t.width, t.x, t.x, t.width, t.x);
                        const r = _e,
                            o = i.reduce(
                                (e, t) => {
                                    if ('right' === t.tag)
                                        return Object.assign(
                                            Object.assign({}, e),
                                            {
                                                right: Math.max(
                                                    e.right,
                                                    t.topicView.bounds.x -
                                                        t.boundaryBounds.x
                                                ),
                                            }
                                        );
                                    {
                                        const { x: i, width: n } =
                                                t.boundaryBounds,
                                            { x: r, width: o } =
                                                t.topicView.bounds;
                                        return Object.assign(
                                            Object.assign({}, e),
                                            {
                                                left: Math.max(
                                                    e.left,
                                                    i + n - (o + r)
                                                ),
                                            }
                                        );
                                    }
                                },
                                {
                                    left: Number.MIN_VALUE,
                                    right: Number.MIN_VALUE,
                                }
                            ),
                            a =
                                e.figure.lineShape ===
                                n.BRANCHCONNECTION.STRAIGHT
                                    ? Math.tan((30 * Math.PI) / 180)
                                    : 0,
                            l = 1.5 * _e;
                        let c =
                                e.topicView.bounds.height +
                                e.topicView.bounds.y +
                                l,
                            d = c,
                            f = c;
                        const h = Object(s.getLineEndSpacingPatchGap)(e);
                        i.forEach((e) => {
                            const { y: t, height: i } = e.boundaryBounds,
                                { x: n, width: s } = e.topicView.bounds;
                            if ('right' === e.tag) {
                                const s = r + o.right - n + h,
                                    c = (r + o.right) * a,
                                    p = Math.max(
                                        d - e.boundaryBounds.y + c,
                                        f + l
                                    );
                                (e.setPosition(s, p),
                                    (d = p + t + i + l),
                                    (f = p + l));
                            } else if ('left' === e.tag) {
                                const d = -r - o.left - (s + n) - h,
                                    p = (r + o.left) * a,
                                    T = Math.max(
                                        c - e.boundaryBounds.y + p,
                                        f + l
                                    );
                                (e.setPosition(d, T),
                                    (c = T + t + i + l),
                                    (f = T + l));
                            }
                        });
                        const p = this.getChildrenSize(e);
                        Object.assign(t, Y.c(t, p));
                    }
                },
                getSummaryDirection(e, t) {
                    return this.getRightSide(e).indexOf(t) > -1
                        ? n.DIRECTION.RIGHT
                        : n.DIRECTION.LEFT;
                },
                getSourceOrientation: function () {
                    return n.DIRECTION.DOWN;
                },
                getChildTargetOrientation(e, t) {
                    return this.getRightSide(e).indexOf(t) > -1
                        ? n.DIRECTION.LEFT
                        : n.DIRECTION.RIGHT;
                },
                getChildStructure(e, t, i) {
                    return this.getRightSide(i).indexOf(t) > -1
                        ? n.STRUCTURECLASS.TREERIGHT
                        : n.STRUCTURECLASS.TREELEFT;
                },
                getCalloutStructure() {
                    return this.STRUCTURECLASS;
                },
                getAvailableChildStructure(e, t) {
                    const i = this.getRightSide(e),
                        r = t.branchIndex();
                    return i.indexOf(r) > -1
                        ? n.TREE_RIGHT_EXPOSED_STRUCTURE
                        : n.TREE_LEFT_EXPOSED_STRUCTURE;
                },
                drawAttachedConnectLine(e, t) {
                    const { isLineTapered: i } = N.a,
                        r = Object(Ee.m)(e),
                        o = t.getConnectionView().figure.lineShape,
                        a = r.getStartAnchorPosition(e, t),
                        s = Object.assign({}, r.getControlPosition(e, t)),
                        l = Object(Ee.m)(t).getEndAnchorPosition(this, t);
                    var c;
                    (o !== n.BRANCHCONNECTION.STRAIGHT
                        ? (s.y = l.y)
                        : (s.y =
                              l.y -
                              ((c = 30),
                              Math.abs(l.x - s.x) *
                                  Math.tan((c * Math.PI) / 180))),
                        I(o)(t, { startPt: a, ctrlPt: s, endPt: l }, i(e), !1));
                },
            }),
            Se = i(61),
            xe = i(29);
        var Re = V.a.extend({}, J, {
            _needTranspose: !1,
            STRUCTURECLASS: n.STRUCTURECLASS.SPREADSHEET,
            isAttachedChildrenStructureImmutable: !0,
            calChildrenBounds(e) {
                (e.getChildrenBranchesByType().forEach((e) => {
                    (e.calChildrenBounds(), (e.isLayout = !1));
                }),
                    e.model.isCollapse() ||
                        (this._calMatrix(e), e.calChildrenBounds()),
                    N.a.setBoundaryPadding(e));
            },
            _calMatrix(e) {
                const t = e.getMatrixView(),
                    i = Se.a.createColumnMap(e);
                t.setColumnMap(i);
                const n = Se.a.createMatrixGrid(e, i, this._needTranspose);
                (Se.a.initGrid(n), t.setMatrixGrid(n));
            },
            calAttachedChildrenPos(e, t) {
                const i = e.getMatrixView();
                if (i && i.figure.isVisible) {
                    const e = i.getSize(),
                        n = Object(xe.g)(i.matrixGrid),
                        r = Object(xe.j)(t, n.itemPos);
                    Object.assign(t, e, r);
                }
            },
            getSummaryDirection() {
                return n.DIRECTION.RIGHT;
            },
            getChildStructure() {
                return n.STRUCTURECLASS.SPREADSHEETROW;
            },
            drawAttachedConnectLine(e, t) {
                I(n.BRANCHCONNECTION.NONE)(t);
            },
            getAvailableChildStructure: function (e, t) {
                return [];
            },
            getSourceOrientation(e) {
                if (!e || !Object(s.isBranch)(e.parent()))
                    return n.DIRECTION.RIGHT;
                switch (Object(s.getViewStructure)(e)) {
                    case n.STRUCTURECLASS.FISHBONELEFTHEADED:
                    case n.STRUCTURECLASS.TREERIGHT:
                    case n.STRUCTURECLASS.ORGCHARTDOWN:
                    case n.STRUCTURECLASS.ORGCHARTUP:
                        return n.DIRECTION.RIGHT;
                    case n.STRUCTURECLASS.FISHBONERIGHTHEADED:
                    case n.STRUCTURECLASS.LOGICLEFT:
                    case n.STRUCTURECLASS.TREELEFT:
                        return n.DIRECTION.LEFT;
                    case n.STRUCTURECLASS.TIMELINEHORIZONTALDOWN:
                    case n.STRUCTURECLASS.TIMELINEVERTICAL:
                    case n.STRUCTURECLASS.TREESIDED:
                        return n.DIRECTION.DOWN;
                    case n.STRUCTURECLASS.TIMELINEHORIZONTALUP:
                        return n.DIRECTION.UP;
                    default:
                        return n.DIRECTION.RIGHT;
                }
            },
            _calcNoChildrenPolygons(e) {
                if (Object(s.isMatrixMainBranch)(e) && e.model.isCollapse()) {
                    const t = c.c([
                        ...F.getSidePoints(e, this.getSourceOrientation(e)),
                        ...F.getPointsOfNoChildren(
                            e,
                            this.getSourceOrientation(e)
                        ),
                    ]);
                    return [
                        {
                            points: t,
                            pointList: t,
                            relatedBranchViewList: [],
                            side: null,
                        },
                    ];
                }
                return [];
            },
        });
        var Ie = V.a.extend({}, J, {
            STRUCTURECLASS: n.STRUCTURECLASS.SPREADSHEETROW,
            calChildrenBounds(e) {},
            calAttachedChildrenPos(e, t) {
                const { matrixView: i } = e.parent();
                if (void 0 !== i) {
                    const { matrixGrid: i } = e.parent().getMatrixView(),
                        n = ((e) => {
                            const t = e.parent().getChildrenBranchesByType();
                            for (let i = 0; i < t.length; i++)
                                if (t[i] === e) return i;
                        })(e),
                        r = Object(xe.b)(i, n),
                        o = Object(xe.e)(i, n),
                        a = Object(xe.j)(t, o);
                    Object.assign(t, r, a);
                }
            },
            getSummaryDirection: function () {
                return n.DIRECTION.RIGHT;
            },
            getChildStructure: function () {
                return n.STRUCTURECLASS.LOGICRIGHT;
            },
            drawAttachedConnectLine: function (e, t) {
                I(n.BRANCHCONNECTION.NONE)(t);
            },
            calcPolygons: function (e) {
                return [
                    {
                        points: [],
                        pointList: [],
                        relatedBranchViewList: [],
                        side: null,
                    },
                ];
            },
        });
        const { COLUMNSPREADSHEET: Ne, SPREADSHEETCOLUMN: we } =
            n.STRUCTURECLASS;
        var Pe = V.a.extend({}, Re, {
            _needTranspose: !0,
            STRUCTURECLASS: Ne,
            isAttachedChildrenStructureImmutable: !0,
            getSummaryDirection: function () {
                return n.DIRECTION.DOWN;
            },
            getRangeGrowthDirection() {
                return n.DIRECTION.RIGHT;
            },
            getChildStructure: function () {
                return we;
            },
            drawAttachedConnectLine: function (e, t) {
                I(n.BRANCHCONNECTION.NONE)(t);
            },
        });
        const { LOGICRIGHT: He } = n.STRUCTURECLASS;
        var De = V.a.extend({}, Ie, {
                STRUCTURECLASS: n.STRUCTURECLASS.SPREADSHEETCOLUMN,
                getSummaryDirection: function () {
                    return n.DIRECTION.RIGHT;
                },
                getChildStructure: function () {
                    return He;
                },
                drawAttachedConnectLine: function (e, t) {
                    I(n.BRANCHCONNECTION.NONE)(t);
                },
            }),
            Fe = (i(39), i(59));
        var ke = Object.assign({}, J, {
            newLayout: !0,
            direction: n.DIRECTION.RIGHT,
            STRUCTURECLASS: n.STRUCTURECLASS.TREETABLE,
            startLayout(e) {
                const t = this.treeInfoToTableInfo(e);
                (Object(Fe.d)(t),
                    Object(Fe.a)(t),
                    Object(Fe.c)(t),
                    Object(Fe.b)(e),
                    this.calcTableBounds(t),
                    (e.externalInfo.tableInfo = t));
            },
            treeInfoToTableInfo(e) {
                return this.supplyTableRowInfoToRight(
                    this.expandTableRowInfoToRight([[e]], 0)
                );
            },
            getSourceOrientation(e) {
                return Re.getSourceOrientation.call(this, e);
            },
            _calcChildrenPolygons(e) {
                const t = e.getTreeTableCellView(),
                    {
                        cellWidth: i,
                        cellHeight: n,
                        cellX: r,
                    } = e.getLayoutInfo().externalInfo,
                    o = r + i,
                    { width: a } = t.getChildrenCellSize(),
                    s = [
                        { x: o - i / 2, y: -n / 2 },
                        { x: o + a - 16, y: -n / 2 },
                        { x: o + a - 16, y: n / 2 },
                        { x: o - i / 2, y: n / 2 },
                    ];
                return [
                    {
                        points: s,
                        pointList: s,
                        relatedBranchViewList: e.getChildrenBranchesByType(),
                        side: null,
                    },
                ];
            },
            _calcNoChildrenPolygons(e) {
                if (
                    Object(s.isTreeTableHeadBranch)(e) &&
                    e.model.isCollapse()
                ) {
                    const t = c.c([
                        ...F.getSidePoints(e, this.getSourceOrientation(e)),
                        ...F.getPointsOfNoChildren(
                            e,
                            this.getSourceOrientation(e)
                        ),
                    ]);
                    return [
                        {
                            points: t,
                            pointList: t,
                            relatedBranchViewList: [],
                            side: null,
                        },
                    ];
                }
                const t = e.getLayoutInfo(e.getStructureClass());
                if (!(null == t ? void 0 : t.externalInfo)) return [];
                const {
                        cellWidth: i,
                        cellHeight: n,
                        cellX: r,
                    } = t.externalInfo,
                    o = r + i,
                    a = [
                        { x: o - 16, y: -n / 2 },
                        { x: o + 16, y: -n / 2 },
                        { x: o + 16, y: n / 2 },
                        { x: o - 16, y: n / 2 },
                    ];
                return [
                    {
                        points: a,
                        pointList: a,
                        relatedBranchViewList: [],
                        side: null,
                    },
                ];
            },
            calcTableBounds(e) {
                e.forEach((e) => {
                    Array.from(new Set(e))
                        .reverse()
                        .forEach((e, t, i) => {
                            const { cellX: n, cellY: r } = Object(Fe.h)(e);
                            if (
                                ((e.externalInfo.cellX = n),
                                (e.externalInfo.cellY = r),
                                e.stopFlag)
                            )
                                return;
                            ((e.bounds.x = n),
                                (e.bounds.y = r),
                                (e.bounds.height = e.externalInfo.cellHeight));
                            let o = 0;
                            if (t > 0) {
                                const e = i[t - 1];
                                o = e.stopFlag
                                    ? e.externalInfo.cellWidth
                                    : e.bounds.width;
                            }
                            e.bounds.width = e.externalInfo.cellWidth + o;
                        });
                });
            },
            expandTableRowInfoToRight(e, t) {
                const i = [];
                let r = !1;
                return (
                    e.forEach((e) => {
                        const o = e[t];
                        (null == o ? void 0 : o.stopFlag) ||
                        !(null == o
                            ? void 0
                            : o.children[n.TOPIC_TYPE.ATTACHED].length)
                            ? i.push([...e])
                            : ((r = !0),
                              o.children[n.TOPIC_TYPE.ATTACHED].forEach((t) => {
                                  i.push([...e, t]);
                              }));
                    }),
                    r ? this.expandTableRowInfoToRight(i, t + 1) : i
                );
            },
            supplyTableRowInfoToRight(e) {
                const t = Math.max(...e.map((e) => e.length));
                return (
                    e.forEach((e) => {
                        e.push(...Array(t - e.length).fill(e[e.length - 1]));
                    }),
                    e
                );
            },
            drawAttachedConnectLine(e, t) {
                I(n.BRANCHCONNECTION.NONE)(t);
            },
            getAvailableChildStructure() {
                return n.TREE_TABLE_EXPOSED_STRUCTURE.filter(
                    (e) =>
                        !(
                            n.TREE_TABLE_GROUP_LIST.includes(e) &&
                            e !== this.STRUCTURECLASS
                        )
                );
            },
        });
        var Be = Object.assign({}, ke, {
            direction: n.DIRECTION.DOWN,
            STRUCTURECLASS: n.STRUCTURECLASS.TOPTITLETREETABLE,
            treeInfoToTableInfo(e) {
                if (!e.children[n.TOPIC_TYPE.ATTACHED].length) return [[e]];
                const t = this.supplyTableRowInfoToRight(
                    this.expandTableRowInfoToRight(
                        e.children[n.TOPIC_TYPE.ATTACHED].map((e) => [e]),
                        0
                    )
                );
                return [Array(t[0].length).fill(e), ...t];
            },
            _calcChildrenPolygons(e) {
                if (Object(s.isTreeTableHeadBranch)(e)) {
                    const t = e.getTreeTableCellView(),
                        { cellWidth: i, cellHeight: n } =
                            e.getLayoutInfo().externalInfo,
                        { height: r } = t.getChildrenCellSize(),
                        o = 16,
                        a = [
                            { x: -i / 2, y: 0 },
                            { x: i / 2 - o, y: 0 },
                            { x: i / 2 - o, y: n / 2 + r + o },
                            { x: -i / 2, y: n / 2 + r + o },
                        ];
                    return [
                        {
                            points: a,
                            pointList: a,
                            relatedBranchViewList:
                                e.getChildrenBranchesByType(),
                            side: null,
                        },
                    ];
                }
                return ke._calcChildrenPolygons(e);
            },
            calcTableBounds(e) {
                ke.calcTableBounds.call(this, e);
                const t = [...e];
                t.splice(0, 1);
                const i = [...t],
                    n = e[0][0];
                n.bounds.height = Array.from(
                    new Set(i.map((e) => e[0]))
                ).reduce(
                    (e, t) => e + t.externalInfo.cellHeight,
                    n.externalInfo.cellHeight
                );
            },
        });
        function Ve(e, t) {
            const i = t ? e : e.parentBranchLayoutInfo;
            return (
                (parseInt(i.style[n.STYLE_KEYS.SPACING_MAJOR]) *
                    (s.layoutConstant.FISH_BONE.BONE_PADDING_VERTICAL +
                        i.externalInfo.lineSpacing)) /
                parseInt(
                    Ce.a.getStyleValue(i.classType, n.STYLE_KEYS.SPACING_MAJOR)
                )
            );
        }
        function Ye(e) {
            return (
                (parseInt(e.style[n.STYLE_KEYS.SPACING_MINOR]) *
                    s.layoutConstant.FISH_BONE.BONE_PADDING_HORIZON) /
                parseInt(
                    Ce.a.getStyleValue(e.classType, n.STYLE_KEYS.SPACING_MINOR)
                )
            );
        }
        function Ge(e) {
            return (
                (e.bounds.height - e.topicBounds.height + Ve(e)) /
                s.layoutConstant.FISH_BONE.BONE_CONNECTION_TAN
            );
        }
        function Ue(e) {
            const t = e.topicBounds.width,
                i = Ge(e);
            return Math.max(t / 2, i);
        }
        function je(e) {
            return e.style[n.STYLE_KEYS.SHAPE_CLASS] !== n.TOPICSHAPE.UNDERLINE
                ? 0
                : (e.topicBounds.height -
                      parseInt(e.style[n.STYLE_KEYS.BORDER_LINE_WIDTH])) /
                      2;
        }
        const $e = Object.assign({}, J, {
            newLayout: !0,
            branchLayoutTreeInfo: {},
            fishBoneSideSize: {
                topSide: { width: 0, height: 0 },
                bottomSide: { width: 0, height: 0 },
            },
            startLayout(e) {
                ((this.branchLayoutTreeInfo = e),
                    (e.externalInfo.startAnchorPositionY = je(e)),
                    this._calcAttachedChildrenPosition(),
                    this._calcBounds(),
                    this._reset());
            },
            _reset() {
                ((this.branchLayoutTreeInfo = {}),
                    (this.fishBoneSideSize = {
                        topSide: { width: 0, height: 0 },
                        bottomSide: { width: 0, height: 0 },
                    }));
            },
            _calcAttachedChildrenPosition() {
                const e = this.branchLayoutTreeInfo,
                    t = e.children[n.TOPIC_TYPE.ATTACHED];
                if (!(null == t ? void 0 : t.length)) return;
                const i = this._getSpiltChildrenGroupList(),
                    r = this.direction === n.DIRECTION.RIGHT ? 1 : -1,
                    o = Ye(e);
                let a = (e.topicBounds.width / 2 + o) * r;
                const l = e.externalInfo.startAnchorPositionY;
                i.forEach((e) => {
                    const t = e[0],
                        i = e[1],
                        n = Ue(t),
                        c = l - (Ve(t) + t.bounds.height + t.bounds.y);
                    if (i) {
                        const e = n * r,
                            d =
                                e +
                                (Ge(i) +
                                    s.layoutConstant.FISH_BONE
                                        .BONE_CONNECTION_DISTANCE -
                                    Ge(t)) *
                                    r,
                            f = Math.abs(d) - i.topicBounds.width / 2,
                            h = f < 0 ? -f : 0;
                        if (
                            ((t.position = {
                                x: a + h * r + e,
                                y: c,
                            }),
                            (i.position = {
                                x: a + h * r + d,
                                y: l + Ve(i) + Math.abs(i.bounds.y),
                            }),
                            1 === r)
                        ) {
                            const e = (e) =>
                                e.position.x + e.bounds.width + e.bounds.x;
                            a = Math.max(e(t), e(i)) + o;
                        } else {
                            const e = (e) => e.position.x + e.bounds.x;
                            a = Math.min(e(t), e(i)) - o;
                        }
                        this._updateSideSize(a, t, i);
                    } else
                        ((t.position = { x: a + n * r, y: c }),
                            (a =
                                1 === r
                                    ? t.position.x +
                                      t.bounds.width +
                                      t.bounds.x +
                                      o
                                    : t.position.x + t.bounds.x - o),
                            this._updateSideSize(a, t));
                });
            },
            _getSpiltChildrenGroupList() {
                const e =
                        this.branchLayoutTreeInfo.children[
                            n.TOPIC_TYPE.ATTACHED
                        ],
                    t = [];
                return (
                    e.forEach((i, n) => {
                        n % 2 == 0 && t.push([i, e[n + 1]]);
                    }),
                    t
                );
            },
            _updateSideSize(e, t, i) {
                const n = this.branchLayoutTreeInfo,
                    r = Math.abs(e) - Ye(n) - n.topicBounds.width / 2;
                ((this.fishBoneSideSize.topSide.width = r),
                    (this.fishBoneSideSize.bottomSide.width = r),
                    (this.fishBoneSideSize.topSide.height = Math.max(
                        t.bounds.height + Ve(t),
                        this.fishBoneSideSize.topSide.height
                    )),
                    i &&
                        (this.fishBoneSideSize.bottomSide.height = Math.max(
                            i.bounds.height + Ve(i),
                            this.fishBoneSideSize.bottomSide.height
                        )));
            },
            _calcBounds() {
                const e = Math.max(
                    this.fishBoneSideSize.topSide.width,
                    this.fishBoneSideSize.bottomSide.width
                );
                let t = this.branchLayoutTreeInfo.topicBounds.width;
                0 !== e &&
                    (t += Math.max(
                        e +
                            s.layoutConstant.FISH_BONE
                                .HEAD_BONE_LINE_EXTEND_BODY_WIDTH,
                        s.layoutConstant.FISH_BONE.HEAD_BONE_LINE_MIN_BODY_WIDTH
                    ));
                const i =
                        this.branchLayoutTreeInfo.externalInfo
                            .startAnchorPositionY,
                    r = this.branchLayoutTreeInfo.topicBounds.height / 2,
                    o =
                        Math.max(r + i, this.fishBoneSideSize.topSide.height) +
                        Math.max(
                            r - i,
                            this.fishBoneSideSize.bottomSide.height
                        );
                let a = this.branchLayoutTreeInfo.topicBounds.x;
                this.direction === n.DIRECTION.LEFT &&
                    (a = -(
                        t -
                        this.branchLayoutTreeInfo.topicBounds.width / 2
                    ));
                const l = -Math.max(
                    r,
                    this.fishBoneSideSize.topSide.height - i
                );
                ((this.branchLayoutTreeInfo.bounds = {
                    width: t,
                    height: o,
                    x: a,
                    y: l,
                }),
                    (this.branchLayoutTreeInfo.externalInfo.headLineWidth =
                        t - this.branchLayoutTreeInfo.topicBounds.width));
            },
            calcPolygons(e) {
                return e.getChildrenBranchesByType().length &&
                    !e.shouldCollapse() &&
                    e.getLayoutInfo()
                    ? this._calcChildrenPolygons(e)
                    : J.calcPolygons.apply(this, [e]);
            },
            _getSideHeadPointList(e, t) {
                const i = this.direction === n.DIRECTION.RIGHT ? 1 : -1,
                    r = t === n.ALL_DIRECTION.UP ? -1 : 1,
                    o = (e.topicView.bounds.width / 2) * i;
                return [
                    {
                        x: o,
                        y: (e.topicView.bounds.height / 2) * r,
                    },
                    { x: o, y: 0 },
                ];
            },
            _calcChildrenPolygons(e) {
                const t = e.getChildrenBranchesByType(),
                    i = t.filter((e, t) => t % 2 == 0),
                    r = [...this._getSideHeadPointList(e, n.ALL_DIRECTION.UP)];
                i.forEach((e) => {
                    r.push(...F.getCornerPoints(e, e.position));
                });
                const o = t.filter((e, t) => t % 2 != 0),
                    a = [
                        ...this._getSideHeadPointList(e, n.ALL_DIRECTION.DOWN),
                    ];
                o.forEach((e) => {
                    a.push(...F.getCornerPoints(e, e.position));
                });
                const l = Ve(e.getLayoutInfo(), !0),
                    c = Ye(e.getLayoutInfo()),
                    d = (e, t) => {
                        if (!e.length) return;
                        const i = e[e.length - 1],
                            o = c,
                            s = 2 * l;
                        let d;
                        d =
                            this.direction === n.DIRECTION.RIGHT
                                ? i.position.x + i.bounds.width + i.bounds.x + o
                                : i.position.x + i.bounds.x - o;
                        const f = (t ? -1 : 1) * s;
                        (t ? r : a).push({ x: d, y: f }, { x: d, y: 0 });
                    };
                (d(i, !0), d(o, !1));
                const f = i[i.length - 1];
                return (
                    a.push(
                        { x: f.position.x, y: l },
                        { x: f.position.x, y: 0 }
                    ),
                    [
                        {
                            pointList: Object(s.convexHull)(r),
                            relatedBranchViewList: i,
                            side: n.ALL_DIRECTION.UP,
                        },
                        {
                            pointList: Object(s.convexHull)(a),
                            relatedBranchViewList: o,
                            side: n.ALL_DIRECTION.DOWN,
                        },
                    ]
                );
            },
            drawAttachedConnectLine(e, t) {
                I(n.BRANCHCONNECTION.NONE)(t);
            },
            getAvailableChildStructure() {
                return [];
            },
        });
        Object.assign({}, J, {
            newLayout: !0,
            branchLayoutTreeInfo: {},
            fishBoneSideSize: {
                topSide: { width: 0, height: 0 },
                bottomSide: { width: 0, height: 0 },
            },
            startLayout(e) {
                ((this.branchLayoutTreeInfo = e),
                    (e.externalInfo.startAnchorPositionY = je(e)),
                    this._calcAttachedChildrenPosition(),
                    this._calcBounds(),
                    this._reset());
            },
            _calcAttachedChildrenPosition() {
                const e =
                    this.branchLayoutTreeInfo.children[n.TOPIC_TYPE.ATTACHED];
                if (!(null == e ? void 0 : e.length)) return;
                let t = (function (e) {
                    let t = !0;
                    const i = e[0],
                        n = e[1];
                    if (n) {
                        const e = Ge(n),
                            r = n.topicBounds.width / 2;
                        if (e > r) t = !0;
                        else {
                            const n = Ge(i),
                                o = i.topicBounds.width / 2;
                            t =
                                n > o
                                    ? r - n - (o - n) <
                                      s.layoutConstant.FISH_BONE
                                          .FIRST_BONE_CONNECTION_DISTANCE
                                    : r - e <
                                      s.layoutConstant.FISH_BONE
                                          .FIRST_BONE_CONNECTION_DISTANCE;
                        }
                    }
                    return t;
                })([e[0], e[1]]);
                (e[1] && this._calcSideBoneChilrenPosition(t, !1),
                    this._calcSideBoneChilrenPosition(t, !0));
            },
            _calcSideBoneChilrenPosition(e, t) {
                const i = this.branchLayoutTreeInfo,
                    r = this.direction === n.DIRECTION.RIGHT ? 1 : -1,
                    o = t ? -1 : 1,
                    a = Ve(i, !0),
                    l = Ye(i);
                let c = (i.topicBounds.width / 2 + l) * r,
                    d = i.externalInfo.startAnchorPositionY + a * o;
                const f = i.children[n.TOPIC_TYPE.ATTACHED];
                if (t && !e) {
                    const e = Ge(f[0]),
                        t = Ge(f[1]);
                    ((c +=
                        (f[1].topicBounds.width / 2 -
                            t -
                            s.layoutConstant.FISH_BONE
                                .FIRST_BONE_CONNECTION_DISTANCE) *
                        r),
                        e < f[0].topicBounds.width / 2 &&
                            (c += (e - f[0].topicBounds.width / 2) * r));
                }
                f.forEach((e, i) => {
                    if ((i % 2 == 0) !== t) return;
                    let n;
                    if (0 === i || 1 === i) n = c + Ue(e) * r;
                    else {
                        const t =
                            1 === r
                                ? Math.abs(e.bounds.x)
                                : -(e.bounds.width + e.bounds.x);
                        n = c + t;
                    }
                    const s = d + (e.bounds.height + e.bounds.y) * o;
                    e.position = { x: n, y: s };
                    const f =
                        1 === r
                            ? e.bounds.width + e.bounds.x + l
                            : -(Math.abs(e.bounds.x) + l);
                    c = n + f;
                    const h = t
                        ? this.fishBoneSideSize.topSide
                        : this.fishBoneSideSize.bottomSide;
                    ((h.width =
                        Math.abs(c) -
                        l -
                        this.branchLayoutTreeInfo.topicBounds.width / 2),
                        (h.height = Math.max(e.bounds.height + a, h.height)));
                });
            },
            _calcBounds() {
                const e = Math.max(
                        this.fishBoneSideSize.topSide.width,
                        this.fishBoneSideSize.bottomSide.width
                    ),
                    t =
                        this.branchLayoutTreeInfo.topicBounds.width +
                        Math.max(
                            e +
                                s.layoutConstant.FISH_BONE
                                    .HEAD_BONE_LINE_EXTEND_BODY_WIDTH,
                            s.layoutConstant.FISH_BONE
                                .HEAD_BONE_LINE_MIN_BODY_WIDTH
                        ),
                    i =
                        this.branchLayoutTreeInfo.externalInfo
                            .startAnchorPositionY,
                    r = this.branchLayoutTreeInfo.topicBounds.height / 2,
                    o =
                        Math.max(r + i, this.fishBoneSideSize.topSide.height) +
                        Math.max(
                            r - i,
                            this.fishBoneSideSize.bottomSide.height
                        );
                let a = this.branchLayoutTreeInfo.topicBounds.x;
                this.direction === n.DIRECTION.LEFT &&
                    (a = -(
                        t -
                        this.branchLayoutTreeInfo.topicBounds.width / 2
                    ));
                const l = -Math.max(
                    r,
                    this.fishBoneSideSize.topSide.height - i
                );
                ((this.branchLayoutTreeInfo.bounds = {
                    width: t,
                    height: o,
                    x: a,
                    y: l,
                }),
                    (this.branchLayoutTreeInfo.externalInfo.headLineWidth =
                        t - this.branchLayoutTreeInfo.topicBounds.width));
            },
            _reset() {
                ((this.branchLayoutTreeInfo = {}),
                    (this.fishBoneSideSize = {
                        topSide: { width: 0, height: 0 },
                        bottomSide: { width: 0, height: 0 },
                    }));
            },
            drawAttachedConnectLine(e, t) {
                I(n.BRANCHCONNECTION.NONE)(t);
            },
        });
        var ze = $e;
        var We = Object.assign({}, ze, {
            direction: n.DIRECTION.RIGHT,
            getChildStructure(e, t) {
                return t % 2 == 0
                    ? n.STRUCTURECLASS.LEFTHEADTOPBONE
                    : n.STRUCTURECLASS.LEFTHEADBOTTOMBONE;
            },
            getRangeGrowthDirection() {
                return n.DIRECTION.RIGHT;
            },
            getAvailableChildStructure() {
                return [
                    n.STRUCTURECLASS.LEFTHEADTOPBONE,
                    n.STRUCTURECLASS.LEFTHEADBOTTOMBONE,
                ];
            },
        });
        var Ke = Object.assign({}, J, {
            newLayout: !0,
            branchLayoutTreeInfo: {},
            startLayout(e) {
                ((this.branchLayoutTreeInfo = e),
                    this._calcAttachedChildrenPositiconAndSelfBounds());
            },
            _calcAttachedChildrenPositiconAndSelfBounds() {
                const e = this.branchLayoutTreeInfo,
                    t = e.children[n.TOPIC_TYPE.ATTACHED];
                if (!(null == t ? void 0 : t.length))
                    return void (e.bounds = e.topicBounds);
                const i = this.direction === n.DIRECTION.RIGHT ? 1 : -1,
                    r =
                        this.getRangeGrowthDirection() === n.DIRECTION.DOWN
                            ? 1
                            : -1,
                    o =
                        ((a = e),
                        (parseInt(a.externalInfo.parentSpacingMajor) *
                            s.layoutConstant.FISH_BONE.BONE_PADDING_VERTICAL) /
                            parseInt(
                                Ce.a.getStyleValue(
                                    a.externalInfo.parentClassType,
                                    n.STYLE_KEYS.SPACING_MAJOR
                                )
                            ));
                var a;
                const l = (function (e) {
                    return (
                        (parseInt(e.style[n.STYLE_KEYS.SPACING_MINOR]) *
                            s.layoutConstant.FISH_BONE
                                .SUB_BONE_PADDING_VERTICAL) /
                        parseInt(
                            Ce.a.getStyleValue(
                                e.classType,
                                n.STYLE_KEYS.SPACING_MINOR
                            )
                        )
                    );
                })(e);
                let c = 0,
                    d = (e.topicBounds.height / 2 + o) * r,
                    f = e.topicBounds.x,
                    h = Math.abs(f),
                    p = e.topicBounds.height + o;
                t.forEach((t) => {
                    const o = e.externalInfo.lineSpacing,
                        a =
                            1 === i
                                ? Math.abs(t.boundaryBounds.x) + o
                                : -(
                                      t.boundaryBounds.width +
                                      t.boundaryBounds.x +
                                      o
                                  );
                    let T = c + a;
                    const u =
                            1 === r
                                ? Math.abs(t.boundaryBounds.y)
                                : Math.abs(
                                      t.boundaryBounds.height +
                                          t.boundaryBounds.y
                                  ),
                        g = d + u * r;
                    var Q;
                    (((Q = this.STRUCTURECLASS) ===
                        n.STRUCTURECLASS.LEFTHEADTOPBONE ||
                    Q === n.STRUCTURECLASS.LEFTHEADBOTTOMBONE
                        ? n.STRUCTURECLASS.FISHBONELEFTHEADED
                        : Q === n.STRUCTURECLASS.RIGHTHEADTOPBONE ||
                            Q === n.STRUCTURECLASS.RIGHTHEADBOTTOMBONE
                          ? n.STRUCTURECLASS.FISHBONERIGHTHEADED
                          : void 0) === t.currentBranchStructure &&
                        (T -=
                            (u /
                                s.layoutConstant.FISH_BONE
                                    .BONE_CONNECTION_TAN) *
                            i),
                        (t.position = { x: T, y: g }));
                    const m = (t.boundaryBounds.height + l) * r;
                    ((f = Math.min(f, T - Math.abs(t.boundaryBounds.x))),
                        (h = Math.max(
                            h,
                            T + (t.boundaryBounds.width + t.boundaryBounds.x)
                        )),
                        (p += Math.abs(m)),
                        (c -=
                            (Math.abs(m) /
                                s.layoutConstant.FISH_BONE
                                    .BONE_CONNECTION_TAN) *
                            i),
                        (d += m));
                });
                const T = Math.abs(h - f);
                p -= l;
                const u =
                    1 === r ? e.topicBounds.y : -(p - e.topicBounds.height / 2);
                e.bounds = { width: T, height: p, x: f, y: u };
            },
            drawAttachedConnectLine(e, t) {
                const i = this.direction === n.DIRECTION.RIGHT ? 1 : -1,
                    r =
                        this.getRangeGrowthDirection() === n.DIRECTION.DOWN
                            ? 1
                            : -1,
                    o = e.getRealPosition(),
                    a = e.getLayoutInfo();
                if (!a) return;
                const l = o.x,
                    c = o.y + (a.topicBounds.height / 2) * r,
                    f = Object(d.a)(
                        t.topicView.topicShapeStyle
                    ).getEndAnchorPosition(this, t),
                    h = {
                        x:
                            l -
                            (Math.abs(f.y - c) /
                                s.layoutConstant.FISH_BONE
                                    .BONE_CONNECTION_TAN) *
                                i,
                        y: f.y,
                    },
                    p = {
                        startPt: h,
                        ctrlPt: Object.assign({}, h),
                        endPt: f,
                    };
                (I(n.BRANCHCONNECTION.STRAIGHT)(t, p, !1, !1),
                    t.getConnectionView().attr({ 'stroke-linecap': '' }));
            },
            layoutExtendCollapse(e) {
                if (!e.getChildrenBranchesByType().length) return;
                if (!e.collapseExtendView || e.collapseExtendView.isHide())
                    return;
                const {
                        EXT_RADIUS: t,
                        COL_RADIUS: i,
                        EXT_GAP: r,
                        COL_GAP: o,
                    } = s.layoutConstant,
                    a = e.model.isCollapse(),
                    l = a ? r : o,
                    c = a ? t : i;
                let d = 0,
                    f = 0;
                const h = Object.assign({}, e.topicView.shapeBounds),
                    p = this.direction === n.DIRECTION.RIGHT ? 1 : -1;
                switch (this.getSourceOrientation()) {
                    case n.DIRECTION.DOWN:
                        ((d =
                            -c -
                            (l /
                                s.layoutConstant.FISH_BONE
                                    .BONE_CONNECTION_TAN) *
                                p),
                            (f = h.y + h.height + l - c));
                        break;
                    case n.DIRECTION.UP:
                        ((d =
                            -c -
                            (l /
                                s.layoutConstant.FISH_BONE
                                    .BONE_CONNECTION_TAN) *
                                p),
                            (f = h.y - c - l));
                }
                (e.collapseExtendView.move(d, f),
                    e.collapseExtendView.drawConnection({
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 0,
                    }),
                    e.collapseExtendView.renderHoverArea());
            },
            calcPolygons(e) {
                const t = this.direction === n.DIRECTION.RIGHT ? 1 : -1,
                    i = Object.assign({}, e.bounds),
                    r = e.getFishBoneMainLineView(),
                    { startPosition: o, endPosition: a } = r.figure,
                    l = e.getRealPosition(),
                    c = Object(s.diff)(l, o),
                    d = Object(s.diff)(l, a),
                    f = Object.assign({}, c),
                    h = { x: (i.width / 2) * t, y: f.y },
                    p = Object.assign({}, d);
                return [
                    {
                        pointList: [f, h, { x: h.x, y: p.y }, p],
                        relatedBranchViewList: e.getChildrenBranchesByType(),
                        side: null,
                    },
                ];
            },
            getAvailableChildStructure() {
                return this.direction === n.DIRECTION.RIGHT
                    ? n.RIGHT_EXPOSED_STRUCTURE
                    : n.LEFT_EXPOSED_STRUCTURE;
            },
        });
        var Ze = Object.assign({}, Ke, {
            STRUCTURECLASS: n.STRUCTURECLASS.LEFTHEADTOPBONE,
            direction: n.DIRECTION.RIGHT,
            getChildStructure() {
                return n.STRUCTURECLASS.LOGICRIGHT;
            },
            getRangeGrowthDirection() {
                return n.DIRECTION.DOWN;
            },
            getSourceOrientation() {
                return n.DIRECTION.DOWN;
            },
        });
        var Je = Object.assign({}, Ke, {
            STRUCTURECLASS: n.STRUCTURECLASS.LEFTHEADBOTTOMBONE,
            direction: n.DIRECTION.RIGHT,
            getChildStructure() {
                return n.STRUCTURECLASS.LOGICRIGHT;
            },
            getRangeGrowthDirection() {
                return n.DIRECTION.UP;
            },
            getSummaryDirection() {
                return n.DIRECTION.RIGHT;
            },
            getSourceOrientation() {
                return n.DIRECTION.UP;
            },
        });
        var Xe = Object.assign({}, ze, {
            direction: n.DIRECTION.LEFT,
            getChildStructure(e, t) {
                return t % 2 == 0
                    ? n.STRUCTURECLASS.RIGHTHEADTOPBONE
                    : n.STRUCTURECLASS.RIGHTHEADBOTTOMBONE;
            },
            getRangeGrowthDirection() {
                return n.DIRECTION.LEFT;
            },
            getSourceOrientation() {
                return n.DIRECTION.LEFT;
            },
            getAvailableChildStructure() {
                return [
                    n.STRUCTURECLASS.RIGHTHEADTOPBONE,
                    n.STRUCTURECLASS.RIGHTHEADBOTTOMBONE,
                ];
            },
        });
        var qe = Object.assign({}, Ke, {
            STRUCTURECLASS: n.STRUCTURECLASS.RIGHTHEADTOPBONE,
            direction: n.DIRECTION.LEFT,
            getChildStructure() {
                return n.STRUCTURECLASS.LOGICLEFT;
            },
            getRangeGrowthDirection() {
                return n.DIRECTION.DOWN;
            },
            getSummaryDirection() {
                return n.DIRECTION.LEFT;
            },
            getSourceOrientation() {
                return n.DIRECTION.DOWN;
            },
            getChildTargetOrientation() {
                return n.DIRECTION.RIGHT;
            },
        });
        var et = Object.assign({}, Ke, {
                STRUCTURECLASS: n.STRUCTURECLASS.RIGHTHEADBOTTOMBONE,
                direction: n.DIRECTION.LEFT,
                getChildStructure() {
                    return n.STRUCTURECLASS.LOGICLEFT;
                },
                getRangeGrowthDirection() {
                    return n.DIRECTION.UP;
                },
                getSummaryDirection() {
                    return n.DIRECTION.LEFT;
                },
                getSourceOrientation() {
                    return n.DIRECTION.UP;
                },
                getChildTargetOrientation() {
                    return n.DIRECTION.RIGHT;
                },
            }),
            tt = i(64);
        var it = Object(B.extend)({}, J, {
            STRUCTURECLASS: n.STRUCTURECLASS.TIMELINESIDEDHORIZONTAL,
            getChildStructure(e, t, i) {
                return Object(tt.a)(i, t) === n.DIRECTION.UP
                    ? n.STRUCTURECLASS.TIMELINEHORIZONTALUP
                    : n.STRUCTURECLASS.TIMELINEHORIZONTALDOWN;
            },
            getSummaryDirection(e, t) {
                return Object(tt.a)(e, t);
            },
            getRangeGrowthDirection: () => n.DIRECTION.RIGHT,
            getChildTargetOrientation: (e, t) =>
                Object(s.getReverseDir)(Object(tt.a)(e, t)),
            getSourceOrientation: () => n.DIRECTION.RIGHT,
            getAvailableChildStructure(e, t) {
                return [];
            },
            getMainlineSpacing(e) {
                const t = l.a.getClassName(e),
                    i = t === n.CLASS_TYPE.CENTRAL_TOPIC ? 18 : 10,
                    r = Object(s.getLineEndSpacingPatchGap)(e);
                return (
                    (parseInt(
                        l.a.getStyleValue(e, n.STYLE_KEYS.SPACING_MAJOR)
                    ) *
                        i) /
                        parseInt(
                            Ce.a.getStyleValue(t, n.STYLE_KEYS.SPACING_MAJOR)
                        ) +
                    r
                );
            },
            getTopicSpacing(e) {
                const t = l.a.getClassName(e),
                    i = t === n.CLASS_TYPE.CENTRAL_TOPIC ? 20 : 10;
                return (
                    (parseInt(
                        l.a.getStyleValue(e, n.STYLE_KEYS.SPACING_MINOR)
                    ) *
                        i) /
                    parseInt(Ce.a.getStyleValue(t, n.STYLE_KEYS.SPACING_MINOR))
                );
            },
            calAttachedChildrenPos(e, t) {
                const i = e.getChildrenBranchesByType(n.TOPIC_TYPE.ATTACHED),
                    r = this.getMainlineSpacing(e),
                    o = this.getTopicSpacing(e),
                    a = Object(tt.a)(e);
                let l = e,
                    c = e;
                const d = i.reduce(
                        (e, t, i) =>
                            a[i] === n.DIRECTION.UP
                                ? Object.assign(Object.assign({}, e), {
                                      up: Math.min(
                                          e.up,
                                          t.topicView.bounds.height +
                                              t.topicView.bounds.y -
                                              (t.boundaryBounds.height +
                                                  t.boundaryBounds.y)
                                      ),
                                  })
                                : Object.assign(Object.assign({}, e), {
                                      down: Math.max(
                                          e.down,
                                          t.topicView.bounds.y -
                                              t.boundaryBounds.y
                                      ),
                                  }),
                        { up: 0, down: 0 }
                    ),
                    f = Object(s.getTopicShape)(e),
                    h = Object(G.c)(
                        f.getBasePoint(e, n.DIRECTION.RIGHT),
                        f.getPointOffset(e, n.DIRECTION.RIGHT)
                    ).y;
                i.forEach((t, f) => {
                    const p = a[f] === n.DIRECTION.UP,
                        T = f > 0 ? i[f - 1] : e,
                        u = T === e ? 0 : i[f - 1].position.x,
                        g = Object(s.getTopicShape)(T).getBasePoint(
                            T,
                            n.DIRECTION.RIGHT
                        ).x,
                        Q = Object(s.getTopicShape)(t),
                        { x: m } = Q.getBasePoint(t, n.DIRECTION.LEFT),
                        { y: b } = Q.getBasePoint(
                            t,
                            p ? n.DIRECTION.DOWN : n.DIRECTION.UP
                        ),
                        C = u + g + (T === e ? 1.5 : 1) * o + -m,
                        L = p ? l : c,
                        y = L !== e ? L.position.x : 0,
                        { width: M, x: A } =
                            L === e
                                ? L.topicView.shapeBounds
                                : L.boundaryBounds,
                        v = y + M + A + r + -t.boundaryBounds.x;
                    (t.setPosition({
                        x: Math.max(C, v),
                        y: h + (p ? -(3 * r + b) + d.up : 3 * r - b + d.down),
                    }),
                        p ? (l = t) : (c = t));
                });
                const p = this.getChildrenSize(e);
                Object.assign(t, Object(Y.c)(t, p));
            },
            drawAttachedConnectLine(e, t, i) {
                const { y: r } = Object(s.getTopicShape)(
                        e
                    ).getStartAnchorPosition(e, t),
                    o = Object(s.getTopicShape)(t).getEndAnchorPosition(
                        n.STRUCTURECLASS.TIMELINESIDEDHORIZONTAL,
                        t
                    ),
                    a = { x: o.x, y: r };
                I(n.BRANCHCONNECTION.HORIZONTAL)(
                    t,
                    { startPt: a, ctrlPt: a, endPt: o },
                    !1,
                    !1
                );
            },
        });
        var nt = Object(B.extend)({}, J, {
            STRUCTURECLASS: n.STRUCTURECLASS.TIMELINETHROUGHVERTICAL,
            getChildStructure(e, t, i) {
                return Object(s.getFinalTimelineChildDirection)(i, t) ===
                    n.DIRECTION.LEFT
                    ? n.STRUCTURECLASS.LOGICLEFT
                    : n.STRUCTURECLASS.LOGICRIGHT;
            },
            getSummaryDirection(e, t) {
                return Object(s.getFinalTimelineChildDirection)(e, t);
            },
            getSourceOrientation: () => n.DIRECTION.DOWN,
            getAvailableChildStructure(e, t) {
                return [];
            },
            getTopicSpacing(e) {
                const t = l.a.getClassName(e),
                    i = t === n.CLASS_TYPE.CENTRAL_TOPIC ? 60 : 36,
                    r = Object(s.getLineEndSpacingPatchGap)(e);
                return (
                    (parseInt(
                        l.a.getStyleValue(e, n.STYLE_KEYS.SPACING_MINOR)
                    ) *
                        i) /
                        parseInt(
                            Ce.a.getStyleValue(t, n.STYLE_KEYS.SPACING_MINOR)
                        ) +
                    r
                );
            },
            getChildTargetOrientation: (e, t) => n.DIRECTION.UP,
            calAttachedChildrenPos(e, t) {
                const i = this.getTopicSpacing(e),
                    r = [
                        e,
                        ...e.getChildrenBranchesByType(n.TOPIC_TYPE.ATTACHED),
                    ];
                r.reduce(
                    (e, t, o) => {
                        if (0 === o) return e;
                        const a = r[o - 1],
                            { x: l, y: c } = e[o - 1],
                            { x: d, y: f } = Object(s.getTopicShape)(
                                a
                            ).getBasePoint(a, n.DIRECTION.DOWN),
                            { height: h, y: p } =
                                o > 1
                                    ? a.boundaryBounds
                                    : a.topicView.shapeBounds,
                            { y: T } = t.boundaryBounds,
                            { x: u } = Object(s.getTopicShape)(a).getBasePoint(
                                a,
                                n.DIRECTION.UP
                            ),
                            g = l + d + -u,
                            Q = f + i + -T,
                            m = f + h + p + -T,
                            b = c + Math.max(m, Q);
                        return [...e, { x: g, y: b }];
                    },
                    [{ x: 0, y: 0 }]
                ).forEach((e, t) => t > 0 && r[t].setPosition(e));
                const o = this.getChildrenSize(e);
                Object.assign(t, Object(Y.c)(t, o));
            },
            drawAttachedConnectLine(e, t) {
                const i = e.getChildrenBranchesByType(n.TOPIC_TYPE.ATTACHED),
                    r = i.indexOf(t);
                if (r < 0) return;
                const o = r > 0 ? i[r - 1] : e,
                    l = t.getConnectionView().figure.lineShape,
                    c = I(l),
                    d = Object(s.getTopicShape)(o),
                    f = Object(a.u)(
                        Object(G.c)(
                            d.getBasePoint(o, n.DIRECTION.DOWN),
                            d.getPointOffset(o, n.DIRECTION.DOWN)
                        ),
                        o
                    );
                c(
                    t,
                    {
                        startPt: f,
                        ctrlPt: f,
                        endPt: Object(s.getTopicShape)(t).getEndAnchorPosition(
                            n.STRUCTURECLASS.TIMELINETHROUGHVERTICAL,
                            t
                        ),
                    },
                    !1,
                    !1
                );
            },
        });
        const rt = {
            [n.STRUCTURECLASS.LOGICRIGHT]: te,
            [n.STRUCTURECLASS.LOGICLEFT]: re,
            [n.STRUCTURECLASS.BRACERIGHT]: ne,
            [n.STRUCTURECLASS.BRACELEFT]: oe,
            [n.STRUCTURECLASS.TREERIGHT]: de,
            [n.STRUCTURECLASS.TREELEFT]: fe,
            [n.STRUCTURECLASS.ORGCHARTDOWN]: pe,
            [n.STRUCTURECLASS.ORGCHARTUP]: Te,
            [n.STRUCTURECLASS.MAPCLOCKWISE]: ge,
            [n.STRUCTURECLASS.MAPANTICLOCKWISE]: Qe,
            [n.STRUCTURECLASS.MAP]: me,
            [n.STRUCTURECLASS.MAPUNBALANCED]: be,
            [n.STRUCTURECLASS.MAPFLOATING]: me,
            [n.STRUCTURECLASS.MAPFLOATINGANTICLOCKWISE]: Qe,
            [n.STRUCTURECLASS.MAPFLOATINGCLOCKWISE]: ge,
            [n.STRUCTURECLASS.TIMELINETHROUGHVERTICAL]: nt,
            [n.STRUCTURECLASS.TIMELINESIDEDHORIZONTAL]: it,
            [n.STRUCTURECLASS.TREESIDED]: Oe,
            [n.STRUCTURECLASS.SPREADSHEET]: Re,
            [n.STRUCTURECLASS.SPREADSHEETROW]: Ie,
            [n.STRUCTURECLASS.COLUMNSPREADSHEET]: Pe,
            [n.STRUCTURECLASS.SPREADSHEETCOLUMN]: De,
            [n.STRUCTURECLASS.TREETABLE]: ke,
            [n.STRUCTURECLASS.TOPTITLETREETABLE]: Be,
            [n.STRUCTURECLASS.FISHBONELEFTHEADED]: We,
            [n.STRUCTURECLASS.LEFTHEADTOPBONE]: Ze,
            [n.STRUCTURECLASS.LEFTHEADBOTTOMBONE]: Je,
            [n.STRUCTURECLASS.FISHBONERIGHTHEADED]: Xe,
            [n.STRUCTURECLASS.RIGHTHEADTOPBONE]: qe,
            [n.STRUCTURECLASS.RIGHTHEADBOTTOMBONE]: et,
            [n.STRUCTURECLASS.LOGICCHARTRIGHT]: te,
            [n.STRUCTURECLASS.LOGICCHARTLEFT]: re,
            [n.STRUCTURECLASS.TIMELINEHORIZONTAL]: Le,
            [n.STRUCTURECLASS.TIMELINEHORIZONTALUP]: Ae,
            [n.STRUCTURECLASS.TIMELINEHORIZONTALDOWN]: ve,
            [n.STRUCTURECLASS.TIMELINEVERTICAL]: Oe,
        };
        t.a = (e) =>
            rt[e]
                ? rt[e]
                : (r.b
                      .get(n.CONFIG.LOGGER)
                      .warn(`Unsupported structure class: ${e}`),
                  rt[n.STRUCTURECLASS.LOGICRIGHT]);
    },
];
