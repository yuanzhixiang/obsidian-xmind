export default [
    function (e, t, i) {
        'use strict';
        var n = i(3),
            r = i(0),
            o = i(88),
            a = i(43),
            s = i(18),
            l = i(4),
            c = i(29),
            d = i(17),
            f = i(1);
        class h extends a.a {
            constructor(e, t = null, i = {}, n = !1, r) {
                (super(),
                    (this._isFront = !1),
                    (this.bounds = e),
                    (this.isNull = n),
                    (this._view = t),
                    (this.matrixHeadBranchView = r),
                    (this._cellEvents = i),
                    (this.figure = s.a.createFigure(this)),
                    (this._s$svg = this.figure.getContent()),
                    (this.selectedPath =
                        this.figure.renderWorker._s$selectedPath),
                    this.initEventsListener());
            }
            get type() {
                return r.VIEW_TYPE.MATRIX_CELL;
            }
            get figureType() {
                return r.FIGURE_TYPE.MATRIX_CELL;
            }
            initEventsListener() {
                (this.addAutoRun(() => {
                    this.figure.setBorderColor(
                        this.matrixHeadBranchView.topicView.figure.borderColor
                    );
                }),
                    this.refreshFillColor());
            }
            afterAncestorChange() {
                this.parent() &&
                    (this.refreshFillColor(),
                    this.refreshBorderWidth(),
                    this.refreshBorderColor());
            }
            parent(e) {
                return void 0 === e ? super.parent() : super.parent(e);
            }
            refreshFillColor() {
                this.addAutoRun(() => {
                    var e;
                    if (!this.parent()) return;
                    let t = 'none';
                    if (this._view || this.isNull)
                        if (this._view instanceof d.a)
                            t = this._view.topicView.figure.fillColor;
                        else {
                            const i =
                                null === (e = this.parent()) || void 0 === e
                                    ? void 0
                                    : e.parent();
                            t = Object(c.a)(i.topicView.figure.fillColor);
                        }
                    else t = 'none';
                    this.figure.setFillColor(t);
                });
            }
            refreshBorderWidth() {
                this.parent() &&
                    this.figure.setBorderWidth(
                        this.matrixHeadBranchView.topicView.figure.borderWidth
                    );
            }
            refreshBorderColor() {
                this.parent() &&
                    this.figure.setBorderColor(
                        this.matrixHeadBranchView.topicView.figure.borderColor
                    );
            }
            refreshViewShapeClass() {
                this._view instanceof d.a &&
                    this._view.topicView.setTopicShapeClass(
                        n.a.getStyleValue(this._view, r.STYLE_KEYS.SHAPE_CLASS)
                    );
            }
            afterMounted() {
                var e;
                null === (e = this._view) || void 0 === e || e.setProxy(this);
            }
            getSvg() {
                return this._s$svg;
            }
            getRealPosition() {
                var e;
                const t =
                    null === (e = this.parent()) || void 0 === e
                        ? void 0
                        : e.getRealPosition();
                return Object(c.i)(this.bounds, t);
            }
            removeSelf() {
                (this.figure.dispose(),
                    this.clearReactions(),
                    this.parent(null),
                    this._view && this._view.deleteProxy(this),
                    delete this._view);
            }
            displaySelect() {
                var e;
                (null === (e = this.parent()) ||
                    void 0 === e ||
                    e.setPlusViewVisible(!0),
                    this._front(),
                    this.selectedPath.attr({
                        display: 'block',
                        stroke: 'rgb(94, 187, 254)',
                    }),
                    this._showCollapseExtendView());
            }
            displayDeselect() {
                var e;
                (null === (e = this.parent()) ||
                    void 0 === e ||
                    e.setPlusViewVisible(!1),
                    this._back(),
                    this.selectedPath.attr({ display: 'none' }),
                    this._hideCollapseExtendView());
            }
            displayHover() {
                (this._front(),
                    this.selectedPath.attr({
                        display: 'block',
                        stroke: 'rgb(154, 213, 255)',
                    }),
                    this._showCollapseExtendView());
            }
            displayDehover() {
                (this._back(),
                    this.selectedPath.attr({ display: 'none' }),
                    this._hideCollapseExtendView());
            }
            displayDeFocus() {
                var e;
                (null === (e = this.parent()) ||
                    void 0 === e ||
                    e.setPlusViewVisible(!0),
                    this._front(),
                    this.selectedPath.attr({
                        display: 'block',
                        stroke: '#9f9f9f',
                    }));
            }
            _showCollapseExtendView() {
                var e;
                if (this._view instanceof d.a) {
                    if (
                        this._view.isMatrixBranch() ||
                        this._view.isMatrixHeadCellBranch()
                    )
                        return;
                    null === (e = this._view.collapseExtendView) ||
                        void 0 === e ||
                        e.hover();
                }
            }
            _hideCollapseExtendView() {
                var e;
                if (this._view instanceof d.a) {
                    if (
                        this._view.isMatrixBranch() ||
                        this._view.isMatrixHeadCellBranch()
                    )
                        return;
                    null === (e = this._view.collapseExtendView) ||
                        void 0 === e ||
                        e.dehover();
                }
            }
            _front() {
                if (!this._isFront) {
                    this._isFront = !0;
                    const e = this.getSvg();
                    e.parent && e.front();
                }
            }
            _back() {
                if (this._isFront) {
                    this._isFront = !1;
                    const e = this.getSvg();
                    e.parent && e.back();
                }
            }
            getSelectedPath() {
                return this.selectedPath;
            }
            getNextEventTarget(e) {
                var t;
                return Object(f.isUndef)(this._view)
                    ? e.parentNode
                    : null === (t = this._view) || void 0 === t
                      ? void 0
                      : t.getSvg().node;
            }
            getProxyView() {
                return this._view;
            }
            createDragView() {
                const e = this.editDomain().content().getCloneG(),
                    { width: t, height: i } = this.bounds,
                    n = { x: -t / 2, y: -i / 2 },
                    r = this.getRealPosition(),
                    { x: o, y: a } = Object(c.j)(r, n),
                    s = `M ${n.x} ${n.y} l ${t} 0 l 0 ${i} l ${-t} 0 Z`,
                    d = new l.a.Path();
                return (
                    d.attr(
                        Object.assign(
                            { d: s },
                            {
                                fill: '#f44336',
                                stroke: '#f44336',
                                'stroke-width': '3',
                            }
                        )
                    ),
                    e.add(d),
                    e.move(o, a),
                    e
                );
            }
        }
        var p = i(21);
        class T extends p.a {
            constructor(e, t) {
                (super(),
                    (this.bounds = e),
                    (this._clickEvent = t),
                    (this.figure = s.a.createFigure(this)),
                    (this.svg = this.figure.getContent()));
            }
            get type() {
                return r.VIEW_TYPE.MATRIX_PLUS;
            }
            get figureType() {
                return r.FIGURE_TYPE.MATRIX_PLUS;
            }
            setVisible(e) {
                this.figure.setVisible(e);
            }
            getSvg() {
                return this.svg;
            }
            removeSelf() {
                (this.figure.dispose(), this.parent(null));
            }
        }
        var u = i(9),
            g = i(33);
        const Q = 'LEFT',
            m = 'MIDDLE',
            b = u.a.MATRIX_CELL_PADDING,
            C = u.a.MATRIX_CELL_DEFAULT_WIDTH,
            L = (e) => (Array.isArray(e) ? e.slice() : Object.assign({}, e)),
            y = (e) => e.reduce((e, t) => e.concat(t), []),
            M = (e) => {
                const t = [];
                if (0 === e.length) return t;
                {
                    const i = e.length,
                        n = e[0].length;
                    for (let r = 0; r < n; r++) {
                        t[r] = [];
                        for (let n = 0; n < i; n++) t[r][n] = e[n][r];
                    }
                    return t;
                }
            },
            A = (e, t) => {
                const i = t - e.reduce((e, t) => e + t, 0);
                e[e.length - 1] += i;
            };
        class v {
            constructor(e = [], t = !1) {
                (t
                    ? ((this.columns = e), (this.rows = M(this.columns)))
                    : ((this.rows = e), (this.columns = M(this.rows))),
                    (this.rowHeightArr = []),
                    (this.colWidthArr = []));
            }
            getMinSize() {
                this._calCellSize();
                return {
                    width: this.colWidthArr.reduce((e, t) => e + t),
                    height: this.rowHeightArr.reduce((e, t) => e + t),
                };
            }
            setSize(e) {
                this.size = e;
                const { width: t, height: i } = e;
                (A(this.colWidthArr, t),
                    A(this.rowHeightArr, i),
                    this.rows.forEach((e, t) => {
                        e.forEach((e, i) => {
                            const n = this.rowHeightArr[t],
                                r = this.colWidthArr[i];
                            e.setSize({ width: r, height: n });
                        });
                    }));
            }
            setPos(e) {
                this.pos = e;
                const t = L(e);
                this.rows.forEach((e, i) => {
                    const n = L(t);
                    (e.forEach((e, t) => {
                        const i = this.colWidthArr[t],
                            r = L(n);
                        (e.setPos(r), (n.x += i));
                    }),
                        (t.y += this.rowHeightArr[i]));
                });
            }
            getCells() {
                const e = this.rows.map((e) => {
                    const t = e.map((e) => e.getCells());
                    return y(t);
                });
                return y(e);
            }
            getColumnSize(e) {
                const t = this.rowHeightArr.reduce((e, t) => e + t);
                return { width: this.colWidthArr[e], height: t };
            }
            getRowSize(e) {
                return {
                    width: this.colWidthArr.reduce((e, t) => e + t),
                    height: this.rowHeightArr[e],
                };
            }
            _calCellSize() {
                ((this.rowHeightArr.length = 0),
                    (this.colWidthArr.length = 0),
                    this.rows.forEach((e, t) => {
                        e.forEach((e, i) => {
                            const { width: n, height: r } = e.getMinSize();
                            ((this.rowHeightArr[t] = this.rowHeightArr[t] || 0),
                                (this.colWidthArr[i] =
                                    this.colWidthArr[i] || 0),
                                (this.rowHeightArr[t] = Math.max(
                                    r,
                                    this.rowHeightArr[t]
                                )),
                                (this.colWidthArr[i] = Math.max(
                                    n,
                                    this.colWidthArr[i]
                                )));
                        });
                    }));
            }
        }
        class E {
            constructor(e = []) {
                ((this.cells = e), (this.cellHeightArr = []));
            }
            getMinSize() {
                if (0 === this.cells.length) return { width: 0, height: 0 };
                {
                    const e = this.cells.map((e) => e.getMinSize()),
                        t = e.map((e) => e.width),
                        i = e.map((e) => e.height),
                        n = Math.max(...t),
                        r = i.reduce((e, t) => e + t);
                    return ((this.cellHeightArr = i), { width: n, height: r });
                }
            }
            setSize(e) {
                this.size = e;
                const { width: t, height: i } = e;
                (((e, t) => {
                    const i = (t - e.reduce((e, t) => e + t, 0)) / e.length;
                    for (let t = 0; t < e.length; t++) e[t] += i;
                })(this.cellHeightArr, i),
                    this.cells.forEach((e, i) => {
                        const n = this.cellHeightArr[i];
                        e.setSize({ width: t, height: n });
                    }));
            }
            setPos(e) {
                this.pos = e;
                const t = L(e);
                this.cells.forEach((e, i) => {
                    const n = L(t);
                    (e.setPos(n), (t.y += this.cellHeightArr[i]));
                });
            }
            getCells() {
                const e = this.cells.map((e) => e.getCells());
                return y(e);
            }
            getItems() {
                return this.getCells()
                    .map((e) => e.item)
                    .filter((e) => !Object(g.g)(e));
            }
        }
        class _ {
            constructor(e, t = {}) {
                const i = { padding: b, align: m },
                    n = Object.assign(i, t);
                ((this.item = e),
                    (this.padding = n.padding),
                    (this.align = n.align));
            }
            getMinSize() {
                const e = { width: C, height: 0, x: 0, y: 0 },
                    { width: t, height: i } = Object(g.g)(this.item)
                        ? e
                        : this.item.bounds;
                return {
                    width: t + 2 * this.padding,
                    height: i + 2 * this.padding,
                };
            }
            getCells() {
                return [this];
            }
            setSize(e) {
                ((this.size = e), this._setItemPos(e));
            }
            setPos(e) {
                this.pos = e;
            }
            getAbsPos() {
                const e = { width: C, height: 0, x: 0, y: 0 },
                    t = Object(g.g)(this.item) ? e : this.item.bounds;
                return Object(c.j)(Object(c.i)(this.pos, this.itemPos), t);
            }
            _setItemPos(e) {
                const t = this.getMinSize(),
                    { padding: i } = this;
                let { x: n, y: r } =
                    ((a = t),
                    {
                        x: ((o = e).width - a.width) / 2,
                        y: (o.height - a.height) / 2,
                    });
                var o, a;
                switch (((r += i), this.align)) {
                    case Q:
                        n = i;
                        break;
                    case 'RIGHT':
                        n = e.width - t.width + i;
                        break;
                    default:
                        n += i;
                }
                this.itemPos = { x: n, y: r };
            }
        }
        class O {
            constructor(e) {
                ((this.rowLength = e),
                    (this.colMap = new Map()),
                    (this.keyArr = []));
            }
            getColumn(e) {
                const { colMap: t, rowLength: i } = this;
                if (!t.has(e)) {
                    const n = Array.from({ length: i }).map(() => ({
                        items: [],
                    }));
                    (t.set(e, { key: e, cells: n }), this.keyArr.push(e));
                }
                return t.get(e);
            }
            getCell(e, t) {
                return this.getColumn(t).cells[e];
            }
            getColumns() {
                return this.keyArr.map((e) => this.colMap.get(e));
            }
            setKeyArr(e = []) {
                const t = [...this.keyArr],
                    i = [];
                (e.forEach((e) => {
                    const n = t.indexOf(e);
                    -1 !== n && (t.splice(n, 1), i.push(e));
                }),
                    (this.keyArr = i.concat(t)));
            }
            setKey(e, t) {
                const i = this.keyArr.indexOf(e);
                ((this.keyArr[i] = t),
                    this.colMap.set(t, this.colMap.get(e)),
                    this.colMap.delete(e));
            }
            changeKeyOrder(e, t) {
                const [i] = this.keyArr.splice(e, 1);
                this.keyArr.splice(t, 0, i);
            }
        }
        var S = i(20);
        const x = u.a.MATRIX_PLUS_RADIUS,
            R = u.a.MATRIX_PLUS_RADIUS,
            I = 'LABEL_CELL',
            N = 'MAIN_CELL',
            w = 'NULL_CELL',
            P = 'HEAD_CELL',
            H = 'CHILD_CELL',
            D = (e) => {
                if (!Object(g.g)(e.item)) {
                    let t = e.item;
                    Object(g.g)(t.setPosition) && (t = t.parent());
                    const i = ((e) => {
                        const t = e.getAbsPos();
                        if (Object(g.g)(e._parentCell)) return t;
                        {
                            const i = e._parentCell.getAbsPos();
                            return Object(c.j)(t, i);
                        }
                    })(e);
                    (t.setPosition(i),
                        Array.isArray(t.boundaries) &&
                            t.boundaries.forEach((e) =>
                                e.figure.invalidateLayout()
                            ));
                }
            },
            F = (e, t = {}) => {
                const {
                        branch: i,
                        labelView: n,
                        parentCell: o,
                        labelText: a,
                    } = t,
                    s = { align: Q },
                    l = { align: m };
                let c;
                switch (e) {
                    case H:
                        return (
                            (c = new _(i, s)),
                            (c._view = i),
                            (c._parentCell = o),
                            (c._events = Object(g.g)(i)
                                ? ((e, t) => {
                                      const i = () => {
                                          const i = e.model.createEmptyTopic({
                                              title: e
                                                  .parent()
                                                  .getChildDefaultTitle(),
                                              titleUnedited: !0,
                                          });
                                          (e.model.addChildTopic(i, {
                                              noAnimation: !0,
                                          }),
                                              i.changeLabel(t),
                                              S.a.work(
                                                  S.b.PRIORITY.AFTER_EACH,
                                                  {
                                                      execute: () => {
                                                          const t =
                                                                  e.getContext(),
                                                              n =
                                                                  t.getSVGView()
                                                                      .model2View[
                                                                      i.getId()
                                                                  ];
                                                          t.execAction(
                                                              r.ACTION_NAMES
                                                                  .SHOW_EDIT_BOX,
                                                              {
                                                                  targets: [n],
                                                              }
                                                          );
                                                      },
                                                  }
                                              ));
                                      };
                                      return {
                                          dblclick: i,
                                          doubletap: i,
                                      };
                                  })(o.item, a)
                                : (c._view, {})),
                            c
                        );
                    case P:
                        return (
                            (c = new _(i.topicView, s)),
                            (c._parentCell = o),
                            (c._view = i),
                            (c._events = (c._view, {})),
                            c
                        );
                    case N:
                        return (
                            (c = new _(i.topicView, s)),
                            (c._view = i),
                            (c._events = (c._view, {})),
                            c
                        );
                    case I:
                        return (
                            (c = new _(n, l)),
                            (c._events = {}),
                            (c._view = n),
                            c
                        );
                    default:
                        return ((c = new _()), (c._isNull = !0), c);
                }
            };
        t.a = {
            createColumnMap: (e) => {
                const t = e.getChildrenBranchesByType(),
                    i = new O(t.length);
                t.forEach((e, t) => {
                    (e.isPlaceHolderView
                        ? []
                        : e.getChildrenBranchesByType()
                    ).forEach((e) => {
                        const n = e.model.getLabel();
                        i.getCell(t, n).items.push(e);
                    });
                });
                0 === i.getColumns().length &&
                    t.forEach((e, t) => {
                        i.getCell(t, '');
                    });
                const n = e.getMatrixView().figure.labelInfo;
                return (i.setKeyArr(n), i);
            },
            createMatrixGrid: (e, t, i) => {
                const n = e.getChildrenBranchesByType(),
                    r = F(N, { branch: e }),
                    o = ((e) => [
                        F(w),
                        ...e.getColumns().map((e) => {
                            const t = null == e ? void 0 : e._keyView;
                            return (
                                null == e || delete e._keyView,
                                F(I, { labelView: t })
                            );
                        }),
                    ])(t),
                    a = ((e, t, i) =>
                        i.map((i, n) => {
                            const r = F(P, {
                                    branch: i,
                                    parentCell: t,
                                }),
                                o = e
                                    .getColumns()
                                    .filter((e) => Boolean(e))
                                    .map((e) => {
                                        const { items: t } = e.cells[n],
                                            i = {
                                                labelText: e.key,
                                                parentCell: r,
                                            },
                                            o = t.map((e) => {
                                                const t = Object.assign(
                                                    {
                                                        branch: e,
                                                    },
                                                    i
                                                );
                                                return F(H, t);
                                            });
                                        if (0 === o.length) {
                                            const e = F(H, i);
                                            o.push(e);
                                        }
                                        return new E(o);
                                    });
                            return [r, ...o];
                        }))(t, r, n),
                    s = [o, ...a],
                    l = new v(s, i),
                    c = new E([r, l]);
                return ((c.isTranspose = i), c);
            },
            initGrid: (e) => {
                const t = e.getMinSize();
                (e.setSize(t), e.setPos({ x: 0, y: 0 }));
                e.cells[1].getCells().forEach((e) => D(e));
            },
            createPlusViews: (e, t) => {
                const i = e.cells[1],
                    n = i.rows.length,
                    o = i.rows[0].length,
                    a = i.rows[0][o - 1].view.bounds,
                    s = i.rows[n - 1][0].view.bounds,
                    l = 2 * x,
                    c = { width: l, height: l },
                    d = R,
                    f = Object.assign({}, a, c, {
                        x: a.x + a.width + d,
                    }),
                    h = Object.assign({}, s, c, {
                        y: s.y + s.height + d,
                    });
                let p = () => {
                        ((e) => {
                            const t = (e) => {
                                    const { model: t } = e,
                                        i = e.getChildDefaultTitle(),
                                        n = t.createEmptyTopic({
                                            title: i,
                                            titleUnedited: !0,
                                        });
                                    return t.addChildTopic(n);
                                },
                                i = e.getChildrenBranchesByType();
                            0 === i.length && t(e);
                            const n = i[0] || t(e),
                                r = t(n),
                                o = e
                                    .getContext()
                                    .getTranslatedText('LABEL_TITLE'),
                                { columnMap: a } = e.getMatrixView(),
                                s = ((e, t) => {
                                    const i = e.keyArr.filter((e) => '' !== e);
                                    return ((e, t, i = 1) => {
                                        let n = `${e} ${i}`;
                                        for (; t.indexOf(n) >= 0; )
                                            n = `${e} ${++i}`;
                                        return n;
                                    })(t, i, i.length + 1);
                                })(a, o);
                            (r.changeLabel(s),
                                e.model.setMatrixLabelInfos([
                                    ...e.model.getMatrixLabelInfos(),
                                    s,
                                ]));
                        })(t);
                    },
                    u = () => {
                        ((e) => {
                            e.getContext().execAction(
                                r.ACTION_NAMES.ADD_SUB_TOPIC,
                                { targets: [e], prue: !0 }
                            );
                        })(t);
                    };
                if (e.isTranspose) {
                    const e = p;
                    ((p = u), (u = e));
                }
                return [new T(f, p), new T(h, u)];
            },
            createLabelViews: (e, t) => {
                const i = (e, t) => {
                        const i = {};
                        return (
                            Object.keys(t).forEach((r) => {
                                const o = t[r],
                                    a = n.a.getStyleValue(e, o, {
                                        ignoreUser: !0,
                                        ignoreClass: !0,
                                    });
                                void 0 !== a && (i[r] = parseInt(a));
                            }),
                            i
                        );
                    },
                    a = t.getChildrenBranchesByType(),
                    s = 0 === a.length,
                    l = { fontSize: r.STYLE_KEYS.FONT_SIZE },
                    c = {
                        marginTop: r.STYLE_KEYS.MARGIN_TOP,
                        marginBottom: r.STYLE_KEYS.MARGIN_BOTTOM,
                        marginLeft: r.STYLE_KEYS.MARGIN_LEFT,
                        marginRight: r.STYLE_KEYS.MARGIN_RIGHT,
                    },
                    d = s ? {} : i(a[0], l),
                    f = s ? {} : i(a[0], c);
                return e.getColumns().map((e) => {
                    const { key: i, cells: n } = e,
                        r = new o.a(i, n, d, f, t);
                    return ((e._keyView = r), r);
                });
            },
            createCellViews: (e, t) =>
                e.getCells().map((e) => {
                    const i = Object.assign(e.pos, e.size),
                        n = new h(i, e._view, e._events, e._isNull, t);
                    return ((e.view = n), n);
                }),
            PLUS_VIEW_PADDING: R,
        };
    },
];
