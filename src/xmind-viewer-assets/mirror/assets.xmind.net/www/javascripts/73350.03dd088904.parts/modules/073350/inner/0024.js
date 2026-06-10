export default [
    function (e, t, i) {
        'use strict';
        (i.d(t, 'c', function () {
            return d;
        }),
            i.d(t, 'g', function () {
                return f;
            }),
            i.d(t, 'f', function () {
                return h;
            }),
            i.d(t, 'd', function () {
                return p;
            }),
            i.d(t, 'e', function () {
                return T;
            }),
            i.d(t, 'b', function () {
                return u;
            }),
            i.d(t, 'a', function () {
                return g;
            }));
        var n = i(0),
            r = i(5),
            o = i(17),
            a = (i(4), i(10)),
            s = i(7);
        function l(e, t) {
            e.getConnectionView().figure.setLinePath(t.d);
        }
        const c = {
                [n.BRANCHCONNECTION.ROUNDEDELBOW]: [
                    (e) => a.o(e, 8),
                    (e) => a.p(e, 8),
                ],
                [n.BRANCHCONNECTION.ELBOW]: [a.i, a.j],
                [n.BRANCHCONNECTION.STRAIGHT]: [a.u, a.u],
                [n.BRANCHCONNECTION.CURVE]: [a.g, a.h],
                [n.BRANCHCONNECTION.BIGHT]: [a.q, a.r],
                [n.BRANCHCONNECTION.FOLD]: [a.s, a.t],
                [n.BRANCHCONNECTION.ROUNDEDFOLD]: [a.m, a.n],
                [n.BRANCHCONNECTION.BRACE]: [
                    (e) => a.f(e.ctrlPt, e.endPt),
                    (e) => a.f(e.ctrlPt, e.endPt),
                ],
            },
            d = (e) => c[e] || c[n.BRANCHCONNECTION.ROUNDEDELBOW];
        function f(e, t, i) {
            if (!e) return;
            const n = e.getConnectionView().figure;
            (n.setStartPoint(t), n.setEndPoint(i));
        }
        function h(e, t, i, n, a, c = []) {
            var d;
            const {
                horizonBrush: f,
                verticalBrush: h,
                taperedHorizonBrush: p,
                taperedVerticalBrush: T,
            } = e;
            let u;
            const g = Object(r.u)(
                parseInt,
                null === (d = t.parent()) || void 0 === d
                    ? void 0
                    : d.figure.lineWidth,
                1
            );
            (a
                ? n && T
                    ? (u = T(i, g, ...c))
                    : h && (u = h(i, ...c))
                : n && p
                  ? (u = p(i, g, ...c))
                  : f &&
                    (u = (function (e, t, i, ...n) {
                        const { startPt: r, ctrlPt: a, endPt: l } = t;
                        if (r.x === a.x) return e(t, ...n);
                        const c = i.parent();
                        let d = [];
                        if (c instanceof o.a) {
                            const e = Object(s.p)(c, i);
                            d = c
                                .getChildrenBranchesByType()
                                .filter((t) => Object(s.p)(c, t) === e);
                        }
                        const f = i.originBranchView || i;
                        return (
                            d.indexOf(f) === d.length - 1 ||
                                (t = {
                                    startPt: a,
                                    ctrlPt: a,
                                    endPt: l,
                                }),
                            e(t, ...n)
                        );
                    })(f, i, t, ...c)),
                l(t, { d: u, tapered: n }));
        }
        function p(e) {
            return (t, i, n, r) => {
                (h(e, t, i, n, r), f(t, i.ctrlPt, i.endPt));
            };
        }
        function T(e, t) {
            return (i, n, r, a) => {
                f(i, n.startPt, n.endPt);
                const s = [...e],
                    l = s.findIndex((e) => e.isDefault);
                let c = null;
                l >= 0 && ((c = s[l]), s.splice(l, 1));
                const d = i.parent(),
                    p = d instanceof o.a ? d.structureClass : null;
                let T = null;
                if (p && i)
                    for (let e = 0; e < s.length; e++) {
                        const t = s[e];
                        if (t.test(p, i, i.parent())) {
                            T = t;
                            break;
                        }
                    }
                let u = [];
                if (('function' == typeof t && (u = t(i, i.parent())), !T)) {
                    if (!c) return;
                    T = c;
                }
                h(T.brush, i, n, r, a, u);
            };
        }
        function u(e) {
            return (t, i, r, a) => {
                const s = t.parent(),
                    l = s instanceof o.a ? s.getStructureClass() : null,
                    c = null == l ? void 0 : l.includes('map'),
                    d = l === n.STRUCTURECLASS.LOGICLEFT;
                if (!c || !r || !d) return e(t, i, r, a);
                const f = Object.assign({}, i.ctrlPt),
                    h = Math.abs(f.y) || 2;
                return (
                    f.x > 0 ? (f.x -= h) : (f.x += h),
                    (i.ctrlPt = f),
                    e(t, i, r, a)
                );
            };
        }
        function g(e, t) {
            let {
                verticalBrush: i,
                fullVerticalBrush: n,
                taperedVerticalBrush: r,
                fullTaperedVerticalBrush: a,
            } = e;
            return (e, s, c) => {
                const d = e.parent(),
                    f = d instanceof o.a ? d.getChildrenBranchesByType() : [],
                    h = e.originBranchView || e,
                    p = 0 === f.indexOf(h),
                    T = f.indexOf(h) === f.length - 1;
                if (!p && !T)
                    return void e.getConnectionView().figure.setLinePath('');
                const u = d instanceof o.a ? d.figure.lineWidth : 1;
                let g = u;
                t && ((r = i), (g = 1.5 * u));
                const { ctrlPt: Q, endPt: m } = s;
                let b = '';
                if (p && T) {
                    const t = e.topicView.bounds.height,
                        o = { x: m.x, y: m.y - t / 2 },
                        s = { x: m.x, y: m.y + t / 2 };
                    c
                        ? a
                            ? (b = a(Q, o, s, g, e))
                            : r && (b = r(Q, o, g, e) + r(Q, s, g, e))
                        : (b = n
                              ? n(Q, o, s, u, e)
                              : i(Q, o, u, e) + i(Q, s, u, e));
                } else
                    c
                        ? r && (b = r(Q, Object.assign({}, m), g, e))
                        : (b = i(Q, Object.assign({}, m), u, e));
                l(e, { d: b, tapered: c || !!t });
            };
        }
    },
];
