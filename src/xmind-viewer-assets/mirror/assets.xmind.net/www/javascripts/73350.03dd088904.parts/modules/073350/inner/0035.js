export default [
    function (e, t, i) {
        'use strict';
        (i.d(t, 'bb', function () {
            return G;
        }),
            i.d(t, 'r', function () {
                return C;
            }),
            i.d(t, 'p', function () {
                return L;
            }),
            i.d(t, 'x', function () {
                return y;
            }),
            i.d(t, 'P', function () {
                return M;
            }),
            i.d(t, 's', function () {
                return A;
            }),
            i.d(t, 'M', function () {
                return v;
            }),
            i.d(t, 't', function () {
                return he;
            }),
            i.d(t, 'J', function () {
                return E;
            }),
            i.d(t, 'I', function () {
                return _;
            }),
            i.d(t, 'F', function () {
                return O;
            }),
            i.d(t, 'w', function () {
                return U;
            }),
            i.d(t, 'c', function () {
                return j;
            }),
            i.d(t, 'U', function () {
                return D;
            }),
            i.d(t, 'W', function () {
                return F;
            }),
            i.d(t, 'V', function () {
                return k;
            }),
            i.d(t, 'H', function () {
                return B;
            }),
            i.d(t, 'N', function () {
                return V;
            }),
            i.d(t, 'n', function () {
                return Y;
            }),
            i.d(t, 'S', function () {
                return x;
            }),
            i.d(t, 'u', function () {
                return R;
            }),
            i.d(t, 'y', function () {
                return I;
            }),
            i.d(t, 'z', function () {
                return N;
            }),
            i.d(t, 'A', function () {
                return w;
            }),
            i.d(t, 'Q', function () {
                return P;
            }),
            i.d(t, 'E', function () {
                return be;
            }),
            i.d(t, 'C', function () {
                return $;
            }),
            i.d(t, 'v', function () {
                return z;
            }),
            i.d(t, 'K', function () {
                return W;
            }),
            i.d(t, 'O', function () {
                return K;
            }),
            i.d(t, 'D', function () {
                return Z;
            }),
            i.d(t, 'Z', function () {
                return J;
            }),
            i.d(t, 'ab', function () {
                return q;
            }),
            i.d(t, 'a', function () {
                return X;
            }),
            i.d(t, 'X', function () {
                return ie;
            }),
            i.d(t, 'd', function () {
                return ne;
            }),
            i.d(t, 'Y', function () {
                return re;
            }),
            i.d(t, 'm', function () {
                return S;
            }),
            i.d(t, 'k', function () {
                return oe;
            }),
            i.d(t, 'h', function () {
                return ae;
            }),
            i.d(t, 'l', function () {
                return se;
            }),
            i.d(t, 'o', function () {
                return le;
            }),
            i.d(t, 'i', function () {
                return ce;
            }),
            i.d(t, 'e', function () {
                return de;
            }),
            i.d(t, 'f', function () {
                return me;
            }),
            i.d(t, 'b', function () {
                return fe;
            }),
            i.d(t, 'L', function () {
                return Ce;
            }),
            i.d(t, 'G', function () {
                return ye;
            }),
            i.d(t, 'R', function () {
                return H;
            }),
            i.d(t, 'g', function () {
                return Qe;
            }),
            i.d(t, 'j', function () {
                return Le;
            }),
            i.d(t, 'q', function () {
                return pe;
            }),
            i.d(t, 'T', function () {
                return Te;
            }),
            i.d(t, 'B', function () {
                return Me;
            }));
        var n = i(0),
            r = i(58),
            o = i(4),
            a = i(76),
            s = i(12),
            l = i.n(s),
            c = i(11),
            d = i(3),
            f = i(27),
            h = i(33),
            p = i(23),
            T = i(17),
            u = i(36),
            g = i(41),
            Q = i(14),
            m = i(5),
            b = i(37);
        function C(e) {
            return e instanceof T.a;
        }
        function L(e) {
            return C(e) && G(e) === n.TOPIC_TYPE.ATTACHED;
        }
        function y(e) {
            return C(e) && G(e) === n.TOPIC_TYPE.DETACHED;
        }
        function M(e) {
            return C(e) && G(e) === n.TOPIC_TYPE.SUMMARY;
        }
        function A(e) {
            return C(e) && G(e) === n.TOPIC_TYPE.CALLOUT;
        }
        function v(e) {
            return C(e) && G(e) === n.TOPIC_TYPE.ROOT;
        }
        function E(e) {
            if (!C(e)) return !1;
            const t = e.getStructureClass();
            return n.MATRIX_GROUP_LIST.includes(t);
        }
        function _(e) {
            const t = (e, i) =>
                !!e &&
                e.type === n.VIEW_TYPE.BRANCH &&
                (((e) => {
                    const t = e.getStructureClass();
                    return (
                        t === n.STRUCTURECLASS.COLUMNSPREADSHEET ||
                        t === n.STRUCTURECLASS.SPREADSHEET
                    );
                })(e)
                    ? !e.model.isCollapse()
                    : !(
                          1 !== i ||
                          !((e) => {
                              const t = e.getStructureClass();
                              return (
                                  t === n.STRUCTURECLASS.SPREADSHEETROW ||
                                  t === n.STRUCTURECLASS.SPREADSHEETCOLUMN
                              );
                          })(e)
                      ) ||
                      (0 !== i &&
                          e.model.type() !== n.TOPIC_TYPE.DETACHED &&
                          t(e.parent(), i - 1)));
            return t(e, 2);
        }
        function O(e) {
            if (_(e)) return !0;
            let t = e.parent();
            for (; t instanceof T.a; ) {
                if (_(t)) return !0;
                t = t.parent();
            }
            return !1;
        }
        function S(e) {
            const t = e.topicView.getShapeStyle();
            return Object(p.a)(t);
        }
        function x(e) {
            return e.getStructureClass().includes('timeline');
        }
        function R(e) {
            const t = e.parent();
            return !!t && t.type === n.VIEW_TYPE.BRANCH && x(t);
        }
        function I(e) {
            const t = e.getStructureClass();
            return (
                t === n.STRUCTURECLASS.FISHBONELEFTHEADED ||
                t === n.STRUCTURECLASS.FISHBONERIGHTHEADED
            );
        }
        function N(e) {
            const t = e.getStructureClass();
            return (
                t === n.STRUCTURECLASS.LEFTHEADTOPBONE ||
                t === n.STRUCTURECLASS.LEFTHEADBOTTOMBONE ||
                t === n.STRUCTURECLASS.RIGHTHEADTOPBONE ||
                t === n.STRUCTURECLASS.RIGHTHEADBOTTOMBONE
            );
        }
        function w(e) {
            return S(e) instanceof u.a;
        }
        function P(e) {
            return S(e) instanceof g.a;
        }
        function H(e) {
            const t = e.parent();
            if (!(t instanceof T.a)) return !1;
            if (!he(t)) return !1;
            const i = t.getStructureClass();
            return [
                n.STRUCTURECLASS.TIMELINEHORIZONTAL,
                n.STRUCTURECLASS.TIMELINETHROUGHVERTICAL,
                n.STRUCTURECLASS.TIMELINESIDEDHORIZONTAL,
            ].includes(i);
        }
        function D(e) {
            const t = (e, i) =>
                !!e &&
                !!C(e) &&
                (!!F(e) ||
                    (0 !== i &&
                        e.model.type() !== n.TOPIC_TYPE.DETACHED &&
                        t(e.parent(), i - 1)));
            return t(e, 1);
        }
        function F(e) {
            const t = e.getStructureClass();
            return n.TREE_TABLE_GROUP_LIST.includes(t);
        }
        function k(e) {
            if (!C(e)) return !1;
            if (!F(e)) return !1;
            if (y(e)) return !0;
            const t = e.parent();
            return !C(t) || !F(t);
        }
        function B(e) {
            if (!C(e)) return !1;
            if (F(e)) return !0;
            if (y(e)) return !1;
            const t = e.parent();
            return t instanceof T.a && B(t);
        }
        function V(e) {
            return D(e) && !(!F(e) && !e.shouldCollapse());
        }
        function Y(e) {
            return C(e) ? (k(e) ? e : Y(e.parent())) : null;
        }
        function G(e) {
            return e.model.type();
        }
        function U(e) {
            if (v(e)) return !1;
            const t = e.parent();
            return !!t && (!!y(t) || (!v(t) && U(t)));
        }
        function j(e) {
            const t = e.parent();
            if (C(t)) {
                return t.getChildrenBranchesByType(G(e)).indexOf(e);
            }
            return -1;
        }
        function $(e) {
            return Object.values(n.HAND_DRAWN_FILL_PATTERN).includes(e);
        }
        function z(e) {
            return [
                n.LINE_PATTERN.DASH,
                n.LINE_PATTERN.DASHDOT,
                n.LINE_PATTERN.DASHDOTDOT,
                n.LINE_PATTERN.DOT,
                n.LINE_PATTERN.HANDDRAWNDASH,
                n.LINE_PATTERN.ROUNDDOT,
            ].includes(e);
        }
        function W(e, t) {
            return e === n.FILL_PATTERN.NONE || 'none' === t || !t;
        }
        function K(e) {
            return [
                n.FILL_PATTERN.SOLID_HAND_DRAWN,
                n.FILL_PATTERN.SOLID,
            ].includes(e);
        }
        function Z(e) {
            return [
                n.LINE_PATTERN.HANDDRAWNSOLID,
                n.LINE_PATTERN.HANDDRAWNDASH,
            ].includes(e);
        }
        function J(e, t) {
            const i = r.a(e.model.toJSON());
            ((i.children = {}),
                (i.summaries = []),
                (i.boundaries = []),
                (i.id = c.a.UUID()));
            const a = e.getContext().getSheetView();
            let s = !1;
            const l = Object(b.a)(i, a.model);
            ((l.topicChanged = () => {
                s = !0;
            }),
                l.parent(e.model.parent()),
                l.changeTitle(
                    Q.a.getTransformedText(
                        e.model.getTitle(),
                        e.getTextClientStyle().textTransform
                    )
                ),
                l.changeStyle(
                    n.STYLE_KEYS.TEXT_TRANSFORM,
                    n.TEXTTRANSFORM.MANUAL
                ),
                l.changeStyle(
                    n.STYLE_KEYS.TEXT_ALIGN,
                    d.a.getStyleValue(e, n.STYLE_KEYS.TEXT_ALIGN)
                ),
                e.model.type() !== n.TOPIC_TYPE.ROOT &&
                    l.setType(e.model.type()));
            let f = !1;
            const h = new Proxy(l, {
                    get: function (t, i) {
                        if ('_type' === i) return e.model.type();
                        const n = t[i];
                        return !r.c(n) ||
                            ['on', 'once', 'listenTo', 'listenToOnce'].includes(
                                i
                            ) ||
                            f
                            ? n
                            : function () {
                                  return (
                                      n.apply(e.model, arguments),
                                      n.apply(l, arguments)
                                  );
                              };
                    },
                }),
                p = new T.a(h);
            (p.figure.setLayoutable(!1, !1), (p.originBranchView = e));
            const u = !e.figure.forbidInvalidateLayout,
                g = !e.figure.forbidInvalidateLayoutParent,
                C = !e.topicView.figure.forbidInvalidateLayout,
                L = !e.topicView.figure.forbidInvalidateLayoutParent,
                y = e.getConnectionView().isForcedInvisible,
                M = e.topicView.isForcedInvisible;
            let A, v, E;
            (e.figure.setLayoutable(!1, !1),
                e.topicView.setForcedInvisible(!0),
                e.topicView.figure.setLayoutable(!1, !1),
                p.tagCentralBranch(e.isCentralBranch()),
                p.topicView.figure.setForceAlignmentWidth(
                    e.topicView.figure.forceAlignmentWidth
                ),
                (p.branchIndex = () => e.branchIndex()),
                (p.summaryIndex = () => e.summaryIndex()),
                (p.floatingIndex = () => e.floatingIndex()));
            const _ =
                D(e) &&
                (F(e) || e.shouldCollapse()) &&
                !(k(e) && e.shouldCollapse());
            (_ &&
                ((A = new o.a.G().data('name', 'tree-table-editing-overlay')),
                (v = new o.a.Path().data('name', 'tree-table-editing-bg')),
                (E = new o.a.Path()
                    .data('name', 'tree-table-editing-select-box')
                    .attr({ fill: 'none', 'stroke-width': '4' })),
                A.add(v),
                A.add(E),
                p.figure.renderWorker.svg.put(A)),
                (p.remove = () => {
                    const i = e.topicView.titleView.figure.textDirty;
                    return (
                        (f = !0),
                        e.figure.setLayoutable(u, g, !i),
                        e.topicView.figure.setLayoutable(C, L, !i),
                        e.remove.call(p),
                        e.topicView.setForcedInvisible(M),
                        e.getConnectionView().setForcedInvisible(y),
                        _ && e.getProxy().refreshCellSize(),
                        s && !t && e.topicView.figure.invalidateLayout(),
                        e
                    );
                }),
                (p.noSideEffect = (e, ...t) => {
                    ((f = !0), e.apply(p, t), (f = !1));
                }));
            const O = e.parent();
            (p.parent(O), p.initView());
            const S = e.getContext().getSheetView().getActivatedTopBranchView();
            (S && S === e && p.getConnectionView().figure.setPaintable(!1),
                Object.assign(p.position, e.position),
                Object.assign(p.bounds, e.bounds),
                Object.assign(p.boundaryBounds, e.boundaryBounds),
                Object.assign(p.realPosition, e.realPosition),
                (p.topicView._forcedMinTopicTitleBounds = Object.assign(
                    {},
                    e.topicView.titleView.bounds
                )));
            const x = p.topicView.image,
                R = e.topicView.image;
            (x && R && (x.figure.setIgnoreLoading(!0), x.setBounds(R.bounds)),
                p.topicView.on('change:bounds', (t) => {
                    const i = e.topicView.bounds,
                        n = e.position,
                        r = {
                            x: (t.width - i.width) / 2 + n.x,
                            y: (t.height - i.height) / 2 + n.y,
                        };
                    if ((p.setPosition(r), p.updateRealPosition(), _)) {
                        Object(m.o)(t, i) ||
                            p.getProxy().updateCellSizeByEditing(t);
                        const { size: n, selectBoxAttr: r } =
                                p.getProxy().figure,
                            o = `M 0 0 l ${n.width} 0 l 0 ${n.height} l ${-n.width} 0 Z`;
                        (v.attr('d', o), E.attr('d', o));
                        const { cellX: a, cellY: s } = e.getLayoutInfo(
                                Y(e).getStructureClass()
                            ).externalInfo,
                            l =
                                a -
                                (t.width > i.width
                                    ? (t.width - i.width) / 2
                                    : 0),
                            c =
                                s -
                                (t.height > i.height
                                    ? (t.height - i.height) / 2
                                    : 0);
                        (v.translate(l, c),
                            E.translate(l, c).attr(
                                Object.assign(Object.assign({}, r), {
                                    display: 'block',
                                })
                            ));
                    }
                }),
                p.topicView.titleView.textSvg.node.setAttributeNS(
                    null,
                    'opacity',
                    '0'
                ),
                (p.topicView.titleView.forceCalcSize = !0));
            const I = e.config(n.CONFIG.APPEARANCE_GETTER);
            let N;
            if (I) {
                N = I().backgroundColor;
            }
            let w = '#fff';
            const P = d.a.getStyleValue(e, n.STYLE_KEYS.FILL_COLOR);
            return (
                'none' !== e.topicView.figure.fillColor
                    ? (w = e.topicView.figure.fillColor)
                    : _ && 'none' !== P
                      ? (w = P)
                      : 'transparent' !== a.figure.backgroundColor
                        ? (w = a.figure.backgroundColor)
                        : N && (w = N),
                p.getMatrixView() &&
                    ((p.getMatrixView().matrixGrid =
                        e.getMatrixView().matrixGrid),
                    (p.topicView.getShapeStyle = e.topicView.getShapeStyle.bind(
                        e.topicView
                    ))),
                p.topicView.figure.setFillColor(w),
                null == A || A.attr('fill', w),
                _ && p.setProxy(e.getProxy()),
                p
            );
        }
        function X(e) {
            const t = J(e, !0);
            return (
                t.topicView.titleView.textSvg.node.setAttributeNS(
                    null,
                    'opacity',
                    '1'
                ),
                (t.topicView.titleView.forceCalcSize = !1),
                t
            );
        }
        function q(e) {
            var t, n, r, o, a, s, l;
            const c = e.model.toJSON();
            ((c.children = {}),
                (c.summaries = []),
                (c.boundaries = []),
                (c.id = Object(m.b)()));
            const d = new (0, i(75).default)(
                Object(b.a)(c, e.getContext().getSheetView().model),
                e
            );
            return (
                (d.getContext = () => e.getContext()),
                d.initView(),
                d.setForcedInvisible(!0),
                (d.figure.forbidInvalidateLayoutParent = !0),
                d.mathJaxView &&
                    (d.mathJaxView.figure.size = Object.assign(
                        {},
                        null === (t = e.topicView.mathJaxView) || void 0 === t
                            ? void 0
                            : t.figure.size
                    )),
                d.image &&
                    (d.image.bounds = Object.assign(
                        {},
                        null === (n = e.topicView.image) || void 0 === n
                            ? void 0
                            : n.bounds
                    )),
                d.numberingView &&
                    ((d.numberingView.figure.textSize = Object.assign(
                        {},
                        null === (r = e.topicView.numberingView) || void 0 === r
                            ? void 0
                            : r.figure.textSize
                    )),
                    (d.numberingView.bounds = Object.assign(
                        {},
                        null === (o = e.topicView.numberingView) || void 0 === o
                            ? void 0
                            : o.bounds
                    ))),
                d.markersView &&
                    (d.markersView.bounds = Object.assign(
                        {},
                        null === (a = e.topicView.markersView) || void 0 === a
                            ? void 0
                            : a.bounds
                    )),
                d.informationIconView &&
                    (d.informationIconView.bounds = Object.assign(
                        {},
                        null === (s = e.topicView.informationIconView) ||
                            void 0 === s
                            ? void 0
                            : s.bounds
                    )),
                d.labelsView &&
                    (d.labelsView.bounds = Object.assign(
                        {},
                        null === (l = e.topicView.labelsView) || void 0 === l
                            ? void 0
                            : l.bounds
                    )),
                d.figure.manuallyLayout(),
                d
            );
        }
        const ee = 'BREAK',
            te = 'SKIP';
        function ie(e, t, i) {
            let n = i(e);
            if (n === ee || n === te) return n;
            const r = e.getChildrenBranchesByType(t);
            for (let e = 0; e < r.length; e++)
                if (((n = ie(r[e], t, i)), n === ee)) return n;
        }
        function ne(e, t) {
            t ||
                (t = [
                    n.CLASS_TYPE.CALLOUT_TOPIC,
                    n.CLASS_TYPE.SUMMARY_TOPIC,
                    n.CLASS_TYPE.CENTRAL_TOPIC,
                ]);
            const i = e.filter(
                (e) =>
                    e.type === n.VIEW_TYPE.BRANCH &&
                    !(null == t ? void 0 : t.includes(d.a.getClassName(e)))
            );
            i.some((e, t) => {
                if (v(e)) return (i.splice(t, 1), !0);
            });
            const r = (e) =>
                    'F' !== e[0] ? parseInt(e) : parseInt(e.substr(1)),
                o = i
                    .map((e) => ({
                        branch: e,
                        path: e.getBranchPath(),
                    }))
                    .sort((e, t) => {
                        const i = e.path.split('.').map(r),
                            n = t.path.split('.').map(r),
                            o = Math.max(i.length, n.length);
                        for (let e = 0; e < o; e++) {
                            const t = i[e],
                                r = n[e];
                            if (void 0 === t) return -1;
                            if (void 0 === r) return 1;
                            if (t < r) return -1;
                            if (t > r) return 1;
                        }
                        return 0;
                    }),
                a = [];
            return (
                o.forEach((e) => {
                    [...a, { path: 'never' }].some((t) =>
                        e.path.startsWith(`${t.path}.`)
                    ) || a.push(e);
                }),
                a.map((e) => e.branch)
            );
        }
        function re(e) {
            if (!e.figure.isVisible) {
                const t = e.parent();
                if (t.type !== n.VIEW_TYPE.BRANCH) return;
                const i = t.figure.isVisible;
                let r;
                ((r =
                    !!t.collapseExtendView &&
                    t.collapseExtendView.figure.isCollapsed),
                    r && t.model.extendBranch(),
                    i || re(t));
            }
        }
        function oe(e, t) {
            return e.getStructureObject().getSummaryDirection(e, t);
        }
        function ae(e, t) {
            return e.getStructureObject().getChildTargetOrientation(e, t);
        }
        function se(e) {
            const t = new o.a.G(),
                i = l()(e.svg.node).clone();
            if (
                (i.find('[data-name="topic-select-box-group"]').remove(),
                i.find('.collapseextend').remove(),
                i.find('[data-name="topic"]').show(),
                F(e))
            ) {
                const t = d.a.getStyleValue(e, n.STYLE_KEYS.FILL_COLOR);
                i.find('[data-name="topic-shape-fill"]').attr({
                    fill: t,
                    opacity: 1,
                });
            }
            return ((t.type = 'g'), (t.node = i[0]), t);
        }
        function le(e, t) {
            const i = e.getContext().model.getSkeletonStructureStyle(),
                r = t || i[d.a.getActivedClassName(e)];
            if (e.isCentralBranch())
                return Object(h.e)(r) ? r : n.STRUCTURECLASS.MAP;
            if (y(e)) {
                if (Object(h.e)(r)) return r;
                return e.model.getPosition().x < 0
                    ? n.STRUCTURECLASS.LOGICLEFT
                    : n.STRUCTURECLASS.LOGICRIGHT;
            }
            const o = e.parent(),
                a = o.getStructureObject();
            if (A(e)) return a.getCalloutStructure(o, e);
            const s = e.summaryIndex();
            if (e.isSummaryBranch() && -1 !== s) {
                const e = o.summaries[s].model.rangeStart;
                switch (a.getSummaryDirection(o, e)) {
                    case n.DIRECTION.LEFT:
                        return n.STRUCTURECLASS.LOGICLEFT;
                    case n.DIRECTION.RIGHT:
                        return n.STRUCTURECLASS.LOGICRIGHT;
                    case n.DIRECTION.UP:
                        return n.STRUCTURECLASS.ORGCHARTUP;
                    case n.DIRECTION.DOWN:
                        return n.STRUCTURECLASS.ORGCHARTDOWN;
                }
            }
            const l = o.getStructureClass();
            if (Object(h.e)(r)) {
                const t = a.getAvailableChildStructure(o, e);
                if (t.includes(r)) return r;
                const i = n.SIMILAR_STRUCTURE_MAP[r];
                if (Object(h.e)(i) && t.includes(i)) return i;
                {
                    const t = e.branchIndex();
                    return a.getChildStructure(l, t, o);
                }
            }
            {
                const t = e.branchIndex();
                return a.getChildStructure(l, t, o);
            }
        }
        function ce(e) {
            const { topicView: t } = e,
                i = (function (e, t) {
                    let i = '',
                        r = 0,
                        o = 0;
                    if (t.topicShapeStyle === n.TOPICSHAPE.CLOUD) {
                        i = t.topicShapeFill.attr('transform') || '';
                        const { x: e, y: n } = t.topicShapeGroup.transform();
                        ((r += e), (o += n));
                    }
                    if (y(e)) {
                        const { x: t, y: i } = e.svg.transform();
                        ((r += t), (o += i));
                    }
                    return `translate(${r} ${o}) ` + i;
                })(e, t);
            return {
                d: `${t.figure.topicShapeFillPath}`,
                transform: i,
            };
        }
        function de(e) {
            const t = [],
                i = e.getChildrenBranchesByType([
                    n.TOPIC_TYPE.DETACHED,
                    n.TOPIC_TYPE.ATTACHED,
                    n.TOPIC_TYPE.CALLOUT,
                    n.TOPIC_TYPE.SUMMARY,
                ]);
            return i.length
                ? (t.push(...i),
                  i.forEach((e) => {
                      t.push(...de(e));
                  }),
                  t)
                : t;
        }
        function fe(e) {
            if (!e || e.type !== n.VIEW_TYPE.BRANCH) return !1;
            const t = e.editDomain().getCanvasControl();
            let i = t.getVisibleAreaBounds();
            i = {
                x: i.left,
                y: i.top,
                width: i.width,
                height: i.height,
            };
            const r = e.topicView.bounds.width,
                o = e.topicView.bounds.height,
                a = t
                    .getCoordinateTransfer()
                    .mindMapToViewport(e.getRealPosition()),
                s = {
                    x: a.x - r / 2,
                    y: a.y - o / 2,
                    width: r,
                    height: o,
                };
            return Object(f.b)(i, s);
        }
        function he(e) {
            return e && e.type === n.VIEW_TYPE.BRANCH && e.isCentralBranch();
        }
        function pe(e) {
            const t = e.getStructureClass();
            return (
                t === n.STRUCTURECLASS.BRACELEFT ||
                t === n.STRUCTURECLASS.BRACERIGHT
            );
        }
        function Te(e) {
            const t = e.getStructureClass();
            return (
                t === n.STRUCTURECLASS.TIMELINEHORIZONTAL ||
                t === n.STRUCTURECLASS.TIMELINETHROUGHVERTICAL
            );
        }
        function ue(e, t) {
            const i = {};
            if (N(t)) {
                const e = t.parent();
                ((i.parentClassType = d.a.getClassName(e)),
                    (i.parentSpacingMajor = parseInt(
                        d.a.getStyleValue(e, n.STYLE_KEYS.SPACING_MAJOR)
                    )),
                    (i.lineSpacing = Object(a.c)(e)));
            }
            return (I(t) && (i.lineSpacing = Object(a.c)(t)), i);
        }
        function ge(e, t) {
            let i = [
                n.STYLE_KEYS.SPACING_MAJOR,
                n.STYLE_KEYS.SPACING_MINOR,
                n.STYLE_KEYS.MARGIN_TOP,
                n.STYLE_KEYS.MARGIN_RIGHT,
                n.STYLE_KEYS.MARGIN_BOTTOM,
                n.STYLE_KEYS.MARGIN_LEFT,
            ];
            (n.TREE_TABLE_GROUP_LIST.includes(t) &&
                (i = i.concat([
                    n.STYLE_KEYS.BORDER_LINE_WIDTH,
                    n.STYLE_KEYS.TEXT_ALIGN,
                    n.STYLE_KEYS.BORDER_LINE_PATTERN,
                ])),
                (t !== n.STRUCTURECLASS.FISHBONELEFTHEADED &&
                    t !== n.STRUCTURECLASS.FISHBONERIGHTHEADED) ||
                    (i = i.concat([
                        n.STYLE_KEYS.BORDER_LINE_WIDTH,
                        n.STYLE_KEYS.SHAPE_CLASS,
                    ])));
            const r = {};
            return (
                i.forEach((i) => {
                    let o = e;
                    (n.TREE_TABLE_GROUP_LIST.includes(t) &&
                        i === n.STYLE_KEYS.BORDER_LINE_WIDTH &&
                        (o = Y(e)),
                        (r[i] = d.a.getStyleValue(o, i)));
                }),
                r
            );
        }
        function Qe(e, { targetStructure: t, parentBranchLayoutInfo: i }) {
            const r = e.getStructureClass(),
                o = r !== t || e.shouldCollapse(),
                a = {
                    topicBounds: Object.assign({}, e.topicView.bounds),
                    boundaryBounds: Object.assign({}, e.boundaryBounds),
                    bounds: Object.assign({}, e.bounds),
                    id: e.model.getId(),
                    classType: d.a.getClassName(e),
                    layoutStructureClass: t,
                    currentBranchStructure: r,
                    externalInfo: ue(0, e),
                    stopFlag: o,
                    children: {},
                    position: { x: 0, y: 0 },
                    parentBranchLayoutInfo: i,
                    style: ge(e, t),
                };
            return (
                o ||
                    [n.TOPIC_TYPE.ATTACHED].forEach((i) => {
                        (a.children[i] || (a.children[i] = []),
                            e.getChildrenBranchesByType(i).forEach((e) => {
                                a.children[i].push(
                                    Qe(e, {
                                        targetStructure: t,
                                        parentBranchLayoutInfo: a,
                                    })
                                );
                            }));
                    }),
                a
            );
        }
        function me(e) {
            let t = [],
                i = e;
            if (i.boundaries) {
                const e = i.boundaries.filter(
                    (e) => e.model.getRange() === n.MASTER_RANGE
                );
                e.length && (t = t.concat(e));
            }
            for (; null == i ? void 0 : i.parent(); ) {
                const e = i,
                    n = i.parent();
                if (n instanceof T.a) {
                    const i = n.boundaries || [],
                        r = n.getChildrenBranchesByType();
                    i.forEach((i) => {
                        r
                            .slice(i.model.rangeStart, i.model.rangeEnd + 1)
                            .includes(e) && t.push(i);
                    });
                }
                i = n;
            }
            return t;
        }
        function be(e) {
            var t, i;
            const n = e.parent();
            if (!n) return !1;
            const r = e.branchIndex(),
                o =
                    null === (i = (t = n.model).boundaries) || void 0 === i
                        ? void 0
                        : i.call(t);
            if (!o) return !1;
            for (let e = 0; e < o.length; e++)
                if (o[e].rangeStart <= r && o[e].rangeEnd >= r) return !0;
            return !1;
        }
        function Ce(e) {
            return [
                n.TOPICSHAPE.DIAMOND,
                n.TOPICSHAPE.ELLIPSE,
                n.TOPICSHAPE.CLOUD,
            ].includes(d.a.getStyleValue(e, n.STYLE_KEYS.SHAPE_CLASS));
        }
        function Le(e) {
            if (!e) return null;
            const { topicView: t } = e;
            if (!t.mathJaxView || !t.mathJaxView.figure) return null;
            const { SVGOutput: i, size: n } = t.mathJaxView.figure;
            if (!i || !n) return null;
            const { width: r, height: o } = n;
            return (
                i.setAttribute('width', r.toFixed(2)),
                i.setAttribute('height', o.toFixed(2)),
                i
            );
        }
        function ye(e) {
            const t = e.getContext().getSheetView().figure.multiLineColors;
            return !!t && 'none' !== t;
        }
        function Me(e) {
            var t, i;
            return (
                null !==
                    (i =
                        null === (t = e.model.ownerSheet()) || void 0 === t
                            ? void 0
                            : t.isFreePositionEnabled()) &&
                void 0 !== i &&
                i &&
                d.a.getClassName(e) === n.CLASS_TYPE.MAIN_TOPIC &&
                e.parent().getStructureClass().includes('map')
            );
        }
    },
];
