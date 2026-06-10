export default [
    function (e, t, i) {
        'use strict';
        var n = i(3),
            r = i(17);
        r.a;
        var o = i(16),
            a = i(0),
            s = i(75),
            l = i(54),
            c = (i(37), i(57)),
            d = i(20),
            f = i(15),
            h = i(1),
            p = i(82),
            T = i(18),
            u = i(21),
            g = i(23),
            Q = i(5),
            m = i(7),
            b = i(24),
            C = i(9),
            L = i(29);
        const y = C.a.FISH_BONE.BONE_CONNECTION_TAN,
            M = {
                [a.ALL_DIRECTION.RIGHT]: { x: 1, y: 0 },
                [a.ALL_DIRECTION.LEFT]: { x: -1, y: 0 },
                [a.ALL_DIRECTION.UP]: { x: 0, y: -1 },
                [a.ALL_DIRECTION.DOWN]: { x: 0, y: 1 },
                [a.ALL_DIRECTION.RIGHT_UP]: { x: 1 / y, y: -1 },
                [a.ALL_DIRECTION.RIGHT_DOWN]: { x: 1 / y, y: 1 },
                [a.ALL_DIRECTION.LEFT_UP]: { x: -1 / y, y: -1 },
                [a.ALL_DIRECTION.LEFT_DOWN]: { x: -1 / y, y: 1 },
            },
            A = {
                [a.ALL_DIRECTION.UP]: (e) => ({
                    x: 0,
                    y: -e.height / 2,
                }),
                [a.ALL_DIRECTION.DOWN]: (e) => ({
                    x: 0,
                    y: e.height / 2,
                }),
                [a.ALL_DIRECTION.LEFT]: (e) => ({
                    x: -e.width / 2,
                    y: 0,
                }),
                [a.ALL_DIRECTION.RIGHT]: (e) => ({
                    x: e.width / 2,
                    y: 0,
                }),
                [a.ALL_DIRECTION.LEFT_UP]: (e) => ({
                    x: -e.width / 2,
                    y: -e.height / 2,
                }),
                [a.ALL_DIRECTION.LEFT_DOWN]: (e) => ({
                    x: -e.width / 2,
                    y: e.height / 2,
                }),
                [a.ALL_DIRECTION.RIGHT_UP]: (e) => ({
                    x: e.width / 2,
                    y: -e.height / 2,
                }),
                [a.ALL_DIRECTION.RIGHT_DOWN]: (e) => ({
                    x: e.width / 2,
                    y: e.height / 2,
                }),
                [a.ALL_DIRECTION.NONE]: (e) => ({ x: 0, y: 0 }),
            },
            v = (e, t) => {
                const i = M[t];
                return { x: e * i.x, y: e * i.y };
            },
            E = (e, t) => {
                const i = e.figure.position,
                    n = e.topicView.shapeBounds,
                    r = A[t](n);
                return Object(Q.c)(i, r);
            },
            _ = (e, t, i = 30) =>
                Math.abs(e.x - t.x) * Math.tan((i * Math.PI) / 180),
            O = [
                a.STRUCTURECLASS.FISHBONELEFTHEADED,
                a.STRUCTURECLASS.FISHBONERIGHTHEADED,
            ],
            S = [
                a.STRUCTURECLASS.LEFTHEADTOPBONE,
                a.STRUCTURECLASS.LEFTHEADBOTTOMBONE,
                a.STRUCTURECLASS.RIGHTHEADTOPBONE,
                a.STRUCTURECLASS.RIGHTHEADBOTTOMBONE,
            ],
            x = [a.STRUCTURECLASS.TREELEFT, a.STRUCTURECLASS.TREERIGHT],
            R = {
                [a.STRUCTURECLASS.TIMELINEVERTICAL]: [
                    a.STRUCTURECLASS.TREERIGHT,
                    a.STRUCTURECLASS.TREELEFT,
                ],
                [a.STRUCTURECLASS.TREESIDED]: [
                    a.STRUCTURECLASS.TREERIGHT,
                    a.STRUCTURECLASS.TREELEFT,
                ],
                [a.STRUCTURECLASS.FISHBONELEFTHEADED]: [
                    a.STRUCTURECLASS.FISHBONELEFTHEADTOP,
                    a.STRUCTURECLASS.FISHBONELEFTHEADBOTTOM,
                ],
                [a.STRUCTURECLASS.FISHBONERIGHTHEADED]: [
                    a.STRUCTURECLASS.FISHBONERIGHTHEADTOP,
                    a.STRUCTURECLASS.FISHBONERIGHTHEADBOTTOM,
                ],
            },
            I = {
                [a.STRUCTURECLASS.TREERIGHT]: a.ALL_DIRECTION.RIGHT,
                [a.STRUCTURECLASS.TREELEFT]: a.ALL_DIRECTION.LEFT,
                [a.STRUCTURECLASS.FISHBONELEFTHEADTOP]:
                    a.ALL_DIRECTION.RIGHT_UP,
                [a.STRUCTURECLASS.FISHBONELEFTHEADBOTTOM]:
                    a.ALL_DIRECTION.RIGHT_DOWN,
                [a.STRUCTURECLASS.FISHBONERIGHTHEADTOP]:
                    a.ALL_DIRECTION.LEFT_UP,
                [a.STRUCTURECLASS.FISHBONERIGHTHEADBOTTOM]:
                    a.ALL_DIRECTION.LEFT_DOWN,
            };
        function N(e, t) {
            const i = R[e];
            return i ? i[t % i.length] : null;
        }
        function w(e, t) {
            const i = N(e, t);
            return i ? I[i] : a.ALL_DIRECTION.RIGHT;
        }
        function P(e) {
            return Object(g.a)(e.topicView.getShapeStyle());
        }
        function H(e, t) {
            const i = P(e),
                n = i.getBasePoint(e, t),
                r = i.getPointOffset(e, t),
                o = Object(Q.c)(n, r);
            return Object(m.u)(o, e);
        }
        const D = {
                [a.DIRECTION.UP]: [a.DIRECTION.UP, a.DIRECTION.DOWN],
                [a.DIRECTION.DOWN]: [a.DIRECTION.DOWN, a.DIRECTION.UP],
                [a.DIRECTION.LEFT]: [a.DIRECTION.LEFT, a.DIRECTION.RIGHT],
                [a.DIRECTION.RIGHT]: [a.DIRECTION.RIGHT, a.DIRECTION.LEFT],
                [a.DIRECTION.NONE]: [a.DIRECTION.RIGHT, a.DIRECTION.LEFT],
            },
            F = {
                [a.DIRECTION.UP]: {
                    [a.DIRECTION.LEFT]: a.ALL_DIRECTION.LEFT_UP,
                    [a.DIRECTION.RIGHT]: a.ALL_DIRECTION.RIGHT_UP,
                    [a.DIRECTION.NONE]: a.ALL_DIRECTION.UP,
                },
                [a.DIRECTION.DOWN]: {
                    [a.DIRECTION.LEFT]: a.ALL_DIRECTION.LEFT_DOWN,
                    [a.DIRECTION.RIGHT]: a.ALL_DIRECTION.RIGHT_DOWN,
                    [a.DIRECTION.NONE]: a.ALL_DIRECTION.DOWN,
                },
                [a.DIRECTION.LEFT]: {
                    [a.DIRECTION.UP]: a.ALL_DIRECTION.LEFT_UP,
                    [a.DIRECTION.DOWN]: a.ALL_DIRECTION.LEFT_DOWN,
                    [a.DIRECTION.NONE]: a.ALL_DIRECTION.LEFT,
                },
                [a.DIRECTION.RIGHT]: {
                    [a.DIRECTION.UP]: a.ALL_DIRECTION.RIGHT_UP,
                    [a.DIRECTION.DOWN]: a.ALL_DIRECTION.RIGHT_DOWN,
                    [a.DIRECTION.NONE]: a.ALL_DIRECTION.RIGHT,
                },
                [a.DIRECTION.NONE]: {
                    [a.DIRECTION.UP]: a.ALL_DIRECTION.RIGHT_UP,
                    [a.DIRECTION.DOWN]: a.ALL_DIRECTION.RIGHT_DOWN,
                    [a.DIRECTION.NONE]: a.ALL_DIRECTION.RIGHT,
                },
            };
        function k(e, t, i = a.DIRECTION.NONE) {
            var n, r;
            const o =
                (null === (n = F[t]) || void 0 === n ? void 0 : n[i]) ||
                (null === (r = F[t]) || void 0 === r
                    ? void 0
                    : r[a.DIRECTION.NONE]);
            return E(e, o);
        }
        const B = (e) => {
                var t;
                return null === (t = e.getFishBoneMainLineView()) ||
                    void 0 === t
                    ? void 0
                    : t.figure.endPosition;
            },
            V = (e, t) => ({
                x: E(e.parent(), a.ALL_DIRECTION.DOWN).x,
                y: k(e, t).y,
            });
        function Y(e, t, i, n = a.DIRECTION.NONE) {
            const [r, o] = D[i];
            if (0 === e) {
                const e = k(t[0], o, n);
                return Object(m.c)(e, o, 20);
            }
            if (e === t.length) {
                const e = k(t[t.length - 1], r, n);
                return Object(m.c)(e, r, 20);
            }
            const s = t[e - 1],
                l = t[e],
                c = k(s, r, n),
                d = k(l, o, n),
                f = Object(Q.f)(d, c);
            return Object(Q.c)(d, { x: f.x / 2, y: f.y / 2 });
        }
        function G(e, t, i, n) {
            const [r, o] = D[i];
            if (0 === e) {
                const e = n(t[0], o);
                return Object(m.c)(e, o, 20);
            }
            if (e === t.length) {
                const e = n(t[t.length - 1], r);
                return Object(m.c)(e, r, 20);
            }
            const a = t[e - 1],
                s = t[e],
                l = n(a, r),
                c = n(s, o),
                d = Object(Q.f)(c, l);
            return Object(Q.c)(c, { x: d.x / 2, y: d.y / 2 });
        }
        function U(e, t, i) {
            const n = i === a.DIRECTION.LEFT ? 1 : -1,
                r = Math.abs(t.y - e.y) / C.a.FISH_BONE.BONE_CONNECTION_TAN;
            return { x: e.x - n * r, y: t.y };
        }
        function j(e, t) {
            const {
                    parent: i,
                    children: n,
                    jointDir: r,
                    isVertical: o,
                    childJointDir: s,
                    freePosition: l,
                } = e,
                c = i.getStructureClass(),
                d = O.includes(c),
                f = S.includes(c),
                h = x.includes(c),
                p = c === a.STRUCTURECLASS.TREESIDED,
                T = c === a.STRUCTURECLASS.TIMELINEVERTICAL,
                u = c === a.STRUCTURECLASS.TIMELINEHORIZONTAL,
                g = c === a.STRUCTURECLASS.TIMELINESIDEDHORIZONTAL,
                L = c === a.STRUCTURECLASS.TIMELINETHROUGHVERTICAL,
                y = (() => {
                    if (0 === n.length) {
                        let t = H(i, r);
                        const n = Object(m.c)(t, r, C.a.LINECOLPOS),
                            o = Object(m.c)(
                                n,
                                (function (e) {
                                    switch (e) {
                                        case a.DIRECTION.UP:
                                            return a.DIRECTION.DOWN;
                                        case a.DIRECTION.DOWN:
                                            return a.DIRECTION.UP;
                                        case a.DIRECTION.LEFT:
                                            return a.DIRECTION.RIGHT;
                                        case a.DIRECTION.RIGHT:
                                            return a.DIRECTION.LEFT;
                                    }
                                })(s),
                                30
                            );
                        f && (t = U(t, o, e.childJointDir));
                        return { startPt: t, ctrlPt: t, endPt: o };
                    }
                    if (d) {
                        const i = G(t, n, e.dir, B);
                        return {
                            startPt: i,
                            ctrlPt: i,
                            endPt: Object(Q.c)(i, v(40, w(c, t))),
                        };
                    }
                    if (p || T) {
                        const o = H(i, r),
                            a = G(t, n, e.dir, V),
                            s = Object(Q.c)(a, v(20, w(c, t)));
                        return (
                            (a.y = s.y - _(s, a)),
                            { startPt: o, ctrlPt: a, endPt: s }
                        );
                    }
                    if (g) {
                        const e = 0 === t ? i : n[t - 1],
                            o = t < n.length ? n[t] : null,
                            l = H(i, r).y,
                            c = e === i ? H(i, r).x : e.getRealPosition().x,
                            d = {
                                x:
                                    c +
                                    (o
                                        ? (o.getRealPosition().x - c) / 2
                                        : i.figure.majorSpacing),
                                y: l,
                            };
                        return {
                            startPt: d,
                            ctrlPt: d,
                            endPt: {
                                x: d.x,
                                y:
                                    d.y +
                                    (s === a.DIRECTION.UP ? -1 : 1) *
                                        i.figure.majorSpacing,
                            },
                        };
                    }
                    if (u) {
                        const o = H(0 === t ? i : n[t - 1], r),
                            { x: a } = Y(t, n, e.dir, e.align);
                        return {
                            startPt: o,
                            ctrlPt: o,
                            endPt: { x: a, y: o.y },
                        };
                    }
                    if (L) {
                        const o = H(0 === t ? i : n[t - 1], r),
                            { x: a } = Y(t, n, e.dir, e.align);
                        return {
                            startPt: o,
                            ctrlPt: o,
                            endPt: {
                                x: a,
                                y: o.y + i.figure.majorSpacing / 2,
                            },
                        };
                    }
                    let o = H(i, r);
                    const b = null != l ? l : Y(t, n, e.dir, e.align);
                    if (h) {
                        const e = { x: o.x, y: b.y };
                        return (
                            (e.y = b.y - _(b, e)),
                            { startPt: o, ctrlPt: e, endPt: b }
                        );
                    }
                    if (f) {
                        o = U(o, b, e.childJointDir);
                        return { startPt: o, ctrlPt: o, endPt: b };
                    }
                    const y = {
                            childPos: b,
                            num: n.length,
                            cur: t,
                            dir: e.dir,
                        },
                        M = Object(m.n)(i, y);
                    o = M.reduce((e, t) => Object(Q.c)(e, t), o);
                    return {
                        startPt: o,
                        ctrlPt:
                            M.length > 0
                                ? o
                                : (function (e, t) {
                                      const i = P(e).getCtrlPoint(e, t);
                                      return Object(m.u)(i, e);
                                  })(i, r),
                        endPt: b,
                    };
                })(),
                M =
                    d ||
                    g ||
                    ([
                        a.STRUCTURECLASS.BRACERIGHT,
                        a.STRUCTURECLASS.BRACELEFT,
                    ].includes(c) &&
                        0 === n.length)
                        ? a.BRANCHCONNECTION.STRAIGHT
                        : i.getConnectionView().getLineShape();
            return {
                d: Object(b.c)(M)[o ? 1 : 0](y),
                endPt: y.endPt,
                childJointDir: s,
            };
        }
        class $ extends u.a {
            constructor() {
                (super(),
                    (this.dropView = null),
                    (this.figure = T.a.createFigure(this)));
            }
            get type() {
                return a.VIEW_TYPE.INDICATOR;
            }
            get figureType() {
                return a.FIGURE_TYPE.INDICATOR;
            }
            update(e, t) {
                if (((this.dropView = e), !e)) return this.hide();
                if (!t) return;
                const i = e.getStructureClass().includes('spreadsheet'),
                    n = a.TREE_TABLE_GROUP_LIST.includes(e.getStructureClass());
                if (e.model.isCollapse() || (!i && !n)) {
                    const { groupInfo: i, index: n } = (function (e, t) {
                            let i = e.getStructureClass(),
                                n = e.getChildrenBranchesByType(
                                    a.TOPIC_TYPE.ATTACHED
                                ),
                                r = t.index,
                                o = t.addToRight,
                                s = t.freePosition;
                            if (Object(m.r)(i)) {
                                const { rightGroupInfo: t, leftGroupInfo: i } =
                                        Object(m.k)(e),
                                    { firstIndex: a, length: s } = o ? t : i;
                                ((n = n.slice(a, a + s)), (r -= a));
                            }
                            (e.shouldCollapse() && (n = []),
                                (r = Math.max(0, r)),
                                (r = Math.min(r, n.length)));
                            const l = Object(m.o)(i, o, e),
                                c = Object(m.j)(i, o),
                                d = N(i, r);
                            return (
                                d && (i = d),
                                {
                                    groupInfo: {
                                        parent: e,
                                        jointDir: l,
                                        childJointDir: Object(m.f)(
                                            i,
                                            o,
                                            r,
                                            n.length,
                                            e
                                        ),
                                        children: n,
                                        dir: c,
                                        align: Object(m.i)(i, o),
                                        isVertical:
                                            a.STRUCTURECLASS.ORGCHARTUP === i ||
                                            a.STRUCTURECLASS.ORGCHARTDOWN === i,
                                        freePosition: s,
                                    },
                                    index: r,
                                }
                            );
                        })(e, t),
                        { d: r, endPt: o, childJointDir: s } = j(i, n);
                    (this.figure.updateLineAttrs({ d: r }),
                        this.figure.updateBoxPos(o, s),
                        this.figure.updateStartBranch(i.parent));
                } else {
                    const { pos: n, size: r } = i
                        ? (function (e, t) {
                              const { index: i } = t,
                                  n = Object(h.isMatrixMainBranch)(e),
                                  r = n ? e : e.parent(),
                                  o = r.getMatrixView(),
                                  s = o.getRealPosition(),
                                  l = r.topicView.figure.borderWidth;
                              if (n) {
                                  const t = o.matrixGrid,
                                      n = Object(L.h)(t),
                                      r =
                                          e.getStructureClass() ===
                                          a.STRUCTURECLASS.SPREADSHEET;
                                  if (n.length - 1 == 0 || i === n.length - 1) {
                                      const { width: e, height: i } =
                                          o.matrixGrid.size;
                                      if (r) {
                                          const t = Object(Q.c)(s, {
                                              x: 0,
                                              y: i,
                                          });
                                          return {
                                              pos: {
                                                  x: t.x + l / 2,
                                                  y: t.y - l / 2 - 4 - 0,
                                              },
                                              size: {
                                                  width: e - l,
                                                  height: 4,
                                              },
                                          };
                                      }
                                      {
                                          const { height: n } = Object(L.g)(
                                                  t
                                              ).size,
                                              r = Object(Q.c)(s, {
                                                  x: e,
                                                  y: n,
                                              });
                                          return {
                                              pos: {
                                                  x: r.x - l / 2 - 4 - 0,
                                                  y: r.y + l / 2,
                                              },
                                              size: {
                                                  width: 4,
                                                  height: i - n - l,
                                              },
                                          };
                                      }
                                  }
                                  {
                                      const e = Object(L.c)(t, i + 1, 0).pos,
                                          { width: n, height: o } = Object(L.b)(
                                              t,
                                              i
                                          ),
                                          a = Object(Q.c)(s, e),
                                          c = Math.max(l, 4);
                                      return r
                                          ? {
                                                pos: {
                                                    x: a.x + l / 2,
                                                    y: a.y - c / 2,
                                                },
                                                size: {
                                                    width: n - l,
                                                    height: c,
                                                },
                                            }
                                          : {
                                                pos: {
                                                    x: a.x - c / 2,
                                                    y: a.y - l / 2,
                                                },
                                                size: {
                                                    width: c,
                                                    height: o + l,
                                                },
                                            };
                                  }
                              }
                              const { items: c, cell: d } =
                                      t.matrixDroppedCellInfo,
                                  { width: f, height: p } = d.size,
                                  T = Object(Q.c)(s, d.pos);
                              if (0 === c.length)
                                  return {
                                      pos: {
                                          x: T.x + l / 2,
                                          y: T.y + l / 2,
                                      },
                                      size: {
                                          width: f - l,
                                          height: p - l,
                                      },
                                  };
                              if (i === c[0].branchIndex())
                                  return {
                                      pos: {
                                          x: T.x + l / 2,
                                          y: T.y + l / 2 + 0,
                                      },
                                      size: {
                                          width: f - l,
                                          height: 4,
                                      },
                                  };
                              if (i === c[c.length - 1].branchIndex() + 1)
                                  return {
                                      pos: {
                                          x: T.x + l / 2,
                                          y: T.y + p - l / 2 - 4 - 0,
                                      },
                                      size: {
                                          width: f - l,
                                          height: 4,
                                      },
                                  };
                              {
                                  const e = Math.max(l, 4);
                                  return {
                                      pos: {
                                          x: T.x + l / 2,
                                          y:
                                              T.y +
                                              (i === d.item.branchIndex()
                                                  ? 0
                                                  : d.size.height) -
                                              e / 2,
                                      },
                                      size: {
                                          width: f - l,
                                          height: e,
                                      },
                                  };
                              }
                          })(e, t)
                        : (function (e, t) {
                              const i = e.getChildrenBranchesByType(),
                                  n = i.length,
                                  r = e.getTreeTableCellView(),
                                  o = e.getStructureClass(),
                                  { width: a } = r.getChildrenCellSize(),
                                  s = r.figure.borderLineWidth;
                              let l, c;
                              if (0 === n) {
                                  const { x: e, y: t } = r.getRealPosition(),
                                      { width: i, height: n } = r.figure.size;
                                  ((l = {
                                      x: e + i / 2 - s / 2 - 4 - 0,
                                      y: t - n / 2 + s / 2,
                                  }),
                                      (c = {
                                          width: 4,
                                          height: n - s,
                                      }));
                              } else if (n > 0 && 0 === t) {
                                  const e = i[0].getTreeTableCellView(),
                                      { x: t, y: n } = e.getRealPosition(),
                                      { width: r, height: o } = e.figure.size;
                                  ((l = {
                                      x: t - r / 2 + s / 2,
                                      y: n - o / 2 + s / 2 + 0,
                                  }),
                                      (c = {
                                          width: a - s,
                                          height: 4,
                                      }));
                              } else if (n > 0 && t === n) {
                                  const e =
                                          i[
                                              i.length - 1
                                          ].getTreeTableCellView(),
                                      { x: t, y: n } = e.getRealPosition(),
                                      { width: r, height: o } = e.figure.size;
                                  ((l = {
                                      x: t - r / 2 + s / 2,
                                      y: n + o / 2 - s / 2 - 4 - 0,
                                  }),
                                      (c = {
                                          width: a - s,
                                          height: 4,
                                      }));
                              } else {
                                  const i = e
                                          .getChildrenBranchesByType()
                                          [t - 1].getTreeTableCellView(),
                                      { width: n, height: r } = i.figure.size,
                                      { width: a } = i
                                          .parent()
                                          .getLayoutInfo(o).bounds,
                                      { x: d, y: f } = i.getRealPosition(),
                                      h = Math.max(s, 4);
                                  ((l = {
                                      x: d - n / 2 + s / 2,
                                      y: f + r / 2 - h / 2,
                                  }),
                                      (c = {
                                          width: a - s,
                                          height: h,
                                      }));
                              }
                              return { pos: l, size: c };
                          })(e, t.index);
                    (this.figure.updateLineAttrs({ d: '' }),
                        this.figure.updateBoxAttrs(
                            Object.assign(Object.assign({}, n), r),
                            !0
                        ),
                        this.figure.updateStartBranch(e));
                }
                this.show();
            }
            clear() {
                this.update(null);
            }
            getSheetView() {
                if (this.dropView) return this.dropView.sheetView;
            }
            show() {
                this.figure.setVisible(!0, !0);
            }
            hide() {
                this.figure.setVisible(!1, !0);
            }
        }
        s.default;
        class z extends c.a {
            constructor(e) {
                (super(e),
                    (this.indicatorView = new $()),
                    (this._startedMatrixCellInfo = null),
                    (this._droppedMatrixCellInfo = null),
                    (this._draggedViews = []),
                    (this._draggedViewOldIndex = null),
                    (this._draggedViewOldParentView = null),
                    (this._relatedDraggingViewsSet = new Set()),
                    (this._draggedViewAttachDisabled = !1),
                    (this._draggedViewNewIndex = null),
                    (this._draggedViewNewParentView = null),
                    (this._isFreePositionBranch = !1),
                    (this._branchRebuildManager = null),
                    (this._isCurrentAddToRight = !1),
                    (this._isDuplicate = !1),
                    (this._noChangeIfDropping = !1),
                    (this._isSelectionBranchStable = !0),
                    (this._isSelectionBranchStableDirty = !1),
                    (this._currentPolygon = null));
            }
            dragStart(e) {
                var t;
                this.context.trigger(a.EVENTS.SE_BRANCH_DRAG_START);
                const i = this.context.getModule(a.MODULE_NAME.ANIMATION);
                return (
                    i &&
                        i.killAnimationByFlag(a.ANIMATION_FLAGS.BRANCH_ZOOM_IN),
                    (this._draggedViews =
                        null !== (t = e.selections) && void 0 !== t ? t : []),
                    (this._draggedViewOldIndex = e.draggedView.branchIndex()),
                    (this._draggedViewOldParentView = Object(
                        h.isDetachedBranch
                    )(e.draggedView)
                        ? null
                        : e.draggedView.parent()),
                    (this._draggedViewAttachDisabled =
                        this.context
                            .getSheetModel()
                            .isFloatingTopicFlexible() &&
                        n.a.getClassName(e.draggedView) ===
                            a.CLASS_TYPE.FLOATING_TOPIC),
                    (this._isDuplicate = e.event.altKey),
                    (this._branchRebuildManager = new l.a(this.context, e, {
                        isDuplicate: this._isDuplicate,
                    })),
                    (this._relatedDraggingViewsSet =
                        this._getRelatedDraggingViewsSet(this._draggedViews)),
                    (this._startedMatrixCellInfo = null),
                    (this._noChangeIfDropping = !1),
                    d.a.work(d.b.PRIORITY.AFTER_EACH, {
                        execute: () => {
                            this.context
                                .getSVGView()
                                .eventBus.trigger('dragStart.dragManager');
                        },
                    }),
                    e
                );
            }
            dragMoving(e) {
                const t = e.keyPress.shiftKey
                        ? !this._draggedViewAttachDisabled
                        : this._draggedViewAttachDisabled,
                    { draggedView: i, dropView: n } = e;
                if (t || null === n)
                    return (
                        this.updatePlaceholder(n, -1, !1),
                        void this._clearDropInfo()
                    );
                const r = Object(l.c)(n, this._currentPolygon, e.position),
                    o = n.getStructureClass().match('anticlockwise');
                let a = 'right' === this._currentPolygon.side;
                (o && (a = !a),
                    this.updatePlaceholder(n, r, a),
                    (this._draggedViewNewParentView = n),
                    (this._draggedViewNewIndex = r),
                    (this._isCurrentAddToRight = a));
            }
            dragCancel() {
                return (
                    this._setIsSelectionBranchStable(!0),
                    this._clearDropInfo(),
                    this.context.trigger(a.EVENTS.SE_BRANCH_DRAG_END),
                    !0
                );
            }
            dragFinish(e) {
                if (
                    (this.context.trigger(a.EVENTS.SE_BRANCH_DRAG_END),
                    this._setIsSelectionBranchStable(!0),
                    this.indicatorView.clear(),
                    !this._noChangeIfDropping)
                )
                    if (this._draggedViewNewParentView)
                        if (this._isFreePositionBranch)
                            (this._isDuplicate ||
                                this._draggedViews.forEach((e) =>
                                    e.model.removeSelf()
                                ),
                                this._branchRebuildManager.mountAsFreePosition(
                                    this._draggedViewNewParentView,
                                    {
                                        at: this._draggedViewNewIndex,
                                        type: a.TOPIC_TYPE.ATTACHED,
                                        position: e.position,
                                        addToRight: this._isCurrentAddToRight,
                                    }
                                ));
                        else {
                            const e = this._getNewTargetIndex();
                            (this._isDuplicate ||
                                this._draggedViews.forEach((e) =>
                                    e.model.removeSelf()
                                ),
                                this._branchRebuildManager.mountAsAttach(
                                    this._draggedViewNewParentView,
                                    {
                                        at: e,
                                        noAnimation: !0,
                                        type: a.TOPIC_TYPE.ATTACHED,
                                        addToRight: this._isCurrentAddToRight,
                                        droppedMatrixCellInfo:
                                            this._droppedMatrixCellInfo,
                                    }
                                ));
                        }
                    else
                        (this._isDuplicate ||
                            this._draggedViews.forEach((e) =>
                                e.model.removeSelf()
                            ),
                            o.b
                                .get(a.CONFIG.LOGGER)
                                .info(this._droppedMatrixCellInfo),
                            this._branchRebuildManager.mountAsDetach(
                                e.position
                            ));
            }
            updatePlaceholder(e, t, i) {
                if (
                    ((this._noChangeIfDropping = this._predictIfResultIsStable(
                        e,
                        t,
                        i
                    )),
                    this._noChangeIfDropping)
                )
                    (this._setIsSelectionBranchStable(!0),
                        this.indicatorView.clear());
                else if ((this._setIsSelectionBranchStable(!1), e)) {
                    const n = {
                        index: t,
                        addToRight: i,
                        freePosition: null,
                    };
                    (e.getStructureClass().match('anticlockwise') &&
                        (n.addToRight = !n.addToRight),
                        (n.matrixDroppedCellInfo = this._droppedMatrixCellInfo),
                        this.indicatorView.update(e, n));
                } else this.indicatorView.clear();
            }
            _traverseViews(
                e,
                t,
                i = [
                    a.TOPIC_TYPE.ATTACHED,
                    a.TOPIC_TYPE.SUMMARY,
                    a.TOPIC_TYPE.CALLOUT,
                ]
            ) {
                e.forEach((e) => {
                    (this._traverseViews(e.getChildrenBranchesByType(i), t),
                        t(e));
                });
            }
            _getRelatedDraggingViewsSet(e) {
                const t = this._branchRebuildManager
                        .getRelatedBoundaryAndSummaryInfo()
                        .map((e) =>
                            e.type === a.MODEL_TYPE.BOUNDARY
                                ? this.context.getComponentViewById(
                                      e.modelData.id
                                  )
                                : this.context.getComponentViewById(
                                      e.modelData.topicId
                                  )
                        ),
                    i = [];
                return (
                    this._traverseViews(
                        [...e, ...t.filter((e) => e instanceof r.a)],
                        (e) => i.push(e)
                    ),
                    new Set([...i, ...t])
                );
            }
            _setIsSelectionBranchStable(e) {
                (this._isSelectionBranchStable !== e &&
                    ((this._isSelectionBranchStable = e),
                    (this._isSelectionBranchStableDirty = !0)),
                    this._isSelectionBranchStableDirty &&
                        (this._updateSelectionBranchOpacity(),
                        (this._isSelectionBranchStableDirty = !1)));
            }
            _updateSelectionBranchOpacity() {
                if (!this._isSelectionBranchStableDirty) return;
                const e = this._isSelectionBranchStable ? 1 : 0.5;
                this._relatedDraggingViewsSet.forEach((t) => {
                    (t.figure.setOpacity(e),
                        t instanceof r.a &&
                            !this._draggedViews.includes(t) &&
                            t.getConnectionView().figure.setOpacity(e));
                });
            }
            _clearDropInfo() {
                ((this._draggedViewNewParentView = null),
                    (this._draggedViewNewIndex = null),
                    this.indicatorView.clear());
            }
            _predictIfResultIsStable(e, t, i) {
                var n, r, o;
                if (this._draggedViews.length > 1) return !1;
                {
                    const s = e === this._draggedViewOldParentView,
                        l =
                            (-1 !== t || -1 !== this._draggedViewOldIndex) &&
                            (t === this._draggedViewOldIndex ||
                                t === this._draggedViewOldIndex + 1),
                        c =
                            null ===
                                (o =
                                    (null ===
                                        (n = this._startedMatrixCellInfo) ||
                                    void 0 === n
                                        ? void 0
                                        : n.label) ===
                                    (null ===
                                        (r = this._droppedMatrixCellInfo) ||
                                    void 0 === r
                                        ? void 0
                                        : r.label)) ||
                            void 0 === o ||
                            o;
                    if (null == e ? void 0 : e.isMapLike()) {
                        const n =
                                e.getStructureClass() ===
                                a.STRUCTURECLASS.MAPUNBALANCED
                                    ? Number(e.figure.unbalanceRightNumber)
                                    : Number(e.figure.balanceRightNumber),
                            r = this._draggedViewOldIndex === n,
                            o = this._draggedViewOldIndex === n - 1;
                        return (
                            s &&
                            !((o && t === n && !i) || (r && t === n && i)) &&
                            l
                        );
                    }
                    return s && l && c;
                }
            }
            _traverseMatrix(e) {
                this._droppedMatrixCellInfo = null;
                const { position: t } = e;
                Object(p.a)(this.centralBranch, (e) => {
                    if (e.isPlaceHolderView) return;
                    const i = e.getMatrixView();
                    if (!i || !i.figure.isVisible) return;
                    const n = i.getCellByPos(t);
                    n &&
                        (this._startedMatrixCellInfo ||
                            (this._startedMatrixCellInfo = n),
                        (this._droppedMatrixCellInfo = n));
                });
            }
            getDragOverView(e) {
                this._traverseMatrix(e);
                const { position: t } = e;
                let i = this.centralBranch;
                const n = this.context.getSheetView().activatedTopBranchView;
                n && (i = n);
                const r = this._droppedMatrixCellInfo
                    ? this._droppedMatrixCellInfo.items
                    : [i];
                let o = null;
                if (
                    (Object(p.b)(r, (e) => {
                        if (!e) return !1;
                        if (e.isPlaceHolderView) return !1;
                        if (Object(h.isCalloutBranch)(e)) return !1;
                        if (this._relatedDraggingViewsSet.has(e)) return !1;
                        Object(l.d)(e);
                        const i = e.getRealPosition(),
                            n = Object(h.relativePositionFor)(t, i);
                        let r;
                        const a = e.getPolyPointsArr();
                        for (const e of a) {
                            if (f.i(n, e.pointList)) {
                                r = e;
                                break;
                            }
                        }
                        return !!r && ((this._currentPolygon = r), (o = e), !0);
                    }),
                    this._droppedMatrixCellInfo && null === o)
                ) {
                    const e = {
                        side: null,
                        relatedBranchViewList:
                            this._droppedMatrixCellInfo.items,
                    };
                    ((o = this._droppedMatrixCellInfo.headBranch),
                        (this._currentPolygon = e));
                }
                return o;
            }
            _getNewTargetIndex() {
                if (this._draggedViews.length > 1) {
                    const e = this._draggedViewNewParentView
                        .getChildrenBranchesByType()
                        .filter((e) => !this._draggedViews.includes(e))
                        .map((e) => e.branchIndex())
                        .sort((e, t) => e - t);
                    for (let t = 0; t < e.length; t++)
                        if (e[t] >= this._draggedViewNewIndex) return t;
                    return e.length;
                }
                return this._draggedViewNewParentView !==
                    this._draggedViewOldParentView
                    ? this._draggedViewNewIndex
                    : this._draggedViewNewIndex > this._draggedViewOldIndex
                      ? this._draggedViewNewIndex - 1
                      : this._draggedViewNewIndex;
            }
        }
        t.a = z;
    },
];
