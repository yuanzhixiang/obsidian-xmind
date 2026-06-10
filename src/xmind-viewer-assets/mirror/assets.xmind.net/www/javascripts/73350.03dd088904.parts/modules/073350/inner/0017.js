export default [
    function (e, t, i) {
        'use strict';
        (function (e) {
            var n,
                r = i(3),
                o = i(0),
                a = i(15),
                s = i(49),
                l = i(18),
                c = i(1),
                d = i(109),
                f = i(110),
                h = i(111),
                p = i(112),
                T = i(30),
                u = i(11),
                g = i(20),
                Q = i(43),
                m = i(75),
                b = i(90),
                C = i(14),
                L = i(25),
                y = i(40),
                M = i(80),
                A = i(101),
                v = i(6),
                E = i.n(v),
                _ = i(63),
                O = i(92),
                S = i(122),
                x = i(8),
                R = function (e, t, i, n) {
                    var r,
                        o = arguments.length,
                        a =
                            o < 3
                                ? t
                                : null === n
                                  ? (n = Object.getOwnPropertyDescriptor(t, i))
                                  : n;
                    if (
                        'object' == typeof Reflect &&
                        'function' == typeof Reflect.decorate
                    )
                        a = Reflect.decorate(e, t, i, n);
                    else
                        for (var s = e.length - 1; s >= 0; s--)
                            (r = e[s]) &&
                                (a =
                                    (o < 3
                                        ? r(a)
                                        : o > 3
                                          ? r(t, i, a)
                                          : r(t, i)) || a);
                    return (o > 3 && a && Object.defineProperty(t, i, a), a);
                };
            const I = [
                    o.TOPIC_TYPE.ATTACHED,
                    o.TOPIC_TYPE.SUMMARY,
                    o.TOPIC_TYPE.DETACHED,
                    o.TOPIC_TYPE.CALLOUT,
                ],
                N = L.a.sortBoundaries;
            let w = (n = class extends Q.a {
                constructor(e) {
                    if (
                        (super({ model: e }),
                        (this._treeTableCellView = null),
                        (this._fishBoneHeadLineView = null),
                        (this._fishBoneMainLineView = null),
                        (this._timelineMainLineView = null),
                        (this.collapseExtendView = null),
                        (this._childrenBranches = new Map()),
                        (this.sheetView = null),
                        (this.selectBox = null),
                        (this.summaryView = null),
                        (this.summaries = []),
                        (this.boundaries = []),
                        (this._isLayout = !1),
                        (this._isHiding = !1),
                        (this._ignoreChildBranchBoundsChange = !1),
                        (this.position = { x: 0, y: 0 }),
                        (this.linePosition = { x: 0, y: 0 }),
                        (this.bounds = {
                            x: 0,
                            y: 0,
                            width: 0,
                            height: 0,
                        }),
                        (this.boundaryBounds = {
                            x: 0,
                            y: 0,
                            width: 0,
                            height: 0,
                        }),
                        (this.outsidePadding = {
                            left: 0,
                            right: 0,
                            up: 0,
                            down: 0,
                        }),
                        (this.structureClass = null),
                        (this._presetStructureClass = null),
                        (this.layoutInfoMap = {}),
                        (this.originBranchView = null),
                        (this.realPosition = { x: 0, y: 0 }),
                        (this._noAnimation = !1),
                        (this.backGroundCellBranchView = null),
                        (this.isVisible = !0),
                        (this.layoutVisible = !0),
                        (this.lazyHideTag = !1),
                        (this.isSelected = !1),
                        (this.isDeFocus = !1),
                        (this.tag = null),
                        (this.preTag = null),
                        (this.collapse = !1),
                        (this.summaryModel = null),
                        (this.summaryLineStyle = null),
                        (this.isCentralBranchView = !1),
                        (this.isForcedInvisible = !1),
                        (this.isPlaceHolderView = !1),
                        (this.changeHooks = {}),
                        (this.model = e),
                        (this.figure = l.a.createFigure(this)),
                        (this._topicView = new m.default(this.model, this)),
                        (this.svg = this.figure.getContent()),
                        (this.isSelected = !1),
                        (this.isDeFocus = !1),
                        this.shouldCollapse() && this.collapseBranch(),
                        this.model.unBalancedInfo())
                    ) {
                        const e = this.model.unBalancedInfo();
                        if (e && 'right-number' === e.name) {
                            const t = parseInt(e.content);
                            this.setUnbalanceRightNumber(isNaN(t) ? 0 : t);
                        }
                    }
                }
                get type() {
                    return o.VIEW_TYPE.BRANCH;
                }
                get figureType() {
                    return o.FIGURE_TYPE.BRANCH;
                }
                get childrenBranches() {
                    return this._childrenBranches;
                }
                parent(e) {
                    return void 0 === e ? super.parent() : super.parent(e);
                }
                initEventsListener() {
                    ('readonly' !== e.env.SB_MODE &&
                        (this.listenTo(this.model, 'addTopic', this.onAddTopic),
                        this.listenTo(
                            this.model,
                            'removeTopic',
                            this.onRemoveTopic
                        ),
                        this.listenTo(
                            this.model,
                            'moveChildTopic',
                            this.onMoveChildTopic
                        ),
                        this.listenTo(
                            this.model,
                            'addBoundary',
                            this.onAddBoundaryView
                        ),
                        this.listenTo(
                            this.model,
                            'removeBoundary',
                            this.onRemoveBoundary
                        ),
                        this.listenTo(
                            this.model,
                            'changeBoundary',
                            this.layout
                        ),
                        this.listenTo(
                            this.model,
                            'addSummary',
                            this.onAddSummary
                        ),
                        this.listenTo(
                            this.model,
                            'removeSummary',
                            this.onRemoveSummary
                        ),
                        this.listenTo(
                            this.model,
                            'addNumbering',
                            this.onAddNumbering
                        ),
                        this.listenTo(
                            this.model,
                            'changeNumbering',
                            this.onChangeNumbering
                        ),
                        this.listenTo(
                            this.model,
                            'changeStructureClass',
                            this.updateStructure
                        ),
                        this.listenTo(
                            this.model,
                            'change:position',
                            this.onPositionChange
                        ),
                        this.listenTo(
                            this.model,
                            'unbalancedInfoUpdated',
                            (e, t) => {
                                this.setUnbalanceRightNumber(t);
                            }
                        ),
                        this.listenTo(
                            this.model,
                            'matrixLabelInfoUpdated',
                            this.onMatrixLabelInfoUpdated
                        )),
                        this.listenTo(
                            this.model,
                            'change:branch',
                            this.onCollapseChange
                        ));
                }
                initStyle() {}
                refreshStyles() {}
                refreshLineColor() {}
                initView() {
                    (this.initStyle(),
                        (this._connectionView = new b.a(this)),
                        this._initStructure(),
                        this.initEventsListener());
                    const e = (e) => {
                        this.model.children(e).forEach((t) => {
                            const i = new n(t);
                            this.addChildBranch(i, { type: e }, !0);
                        });
                    };
                    (e(o.TOPIC_TYPE.ATTACHED),
                        this.isCentralBranch() && e(o.TOPIC_TYPE.DETACHED),
                        e(o.TOPIC_TYPE.CALLOUT),
                        this.topicView.initView(),
                        this.model.boundaries().forEach((e) => {
                            this.addBoundaryView(new y.a(e, this));
                        }),
                        this.model.summaries().forEach((e) => {
                            this.model
                                .children(o.TOPIC_TYPE.SUMMARY)
                                .forEach((t) => {
                                    if (e.get('topicId') === t.get('id')) {
                                        const i = new M.a(e);
                                        this.addSummaryView(i);
                                        const r = new n(t);
                                        this.addChildBranch(
                                            r,
                                            {
                                                type: o.TOPIC_TYPE.SUMMARY,
                                                summaryModel: e,
                                                summaryView: i,
                                            },
                                            !0
                                        );
                                    }
                                });
                        }),
                        this._initSpecialStructureView());
                }
                _initSpecialStructureView() {
                    (this._initMatrixViews(),
                        this._initFishBoneHeadLineView(),
                        this._initFishBoneMainLineView(),
                        this._initTreeTableCellViews(),
                        this._initTimelineMainLineView());
                }
                _initMatrixViews() {
                    const e = () => {
                        var e, t;
                        (null === (e = this._matrixView) ||
                            void 0 === e ||
                            e.removeSelf(),
                            null === (t = this._matrixView) ||
                                void 0 === t ||
                                t.parent(null),
                            (this._matrixView = null));
                    };
                    if (
                        ![
                            o.STRUCTURECLASS.COLUMNSPREADSHEET,
                            o.STRUCTURECLASS.SPREADSHEET,
                        ].includes(this.getStructureClass())
                    )
                        return void (this._matrixView && (e(), i(this)));
                    (this._matrixView &&
                        this._matrixView.matrixStructureType !==
                            this.getStructureClass() &&
                        e(),
                        i(this));
                    const t = new d.a(this.getStructureClass());
                    function i(e) {
                        !(function (e, t) {
                            const i = [],
                                n = e.getChildrenBranchesByType();
                            (n.forEach((e) => {
                                i.push(...e.getChildrenBranchesByType());
                            }),
                                i.push(...n),
                                i.push(e),
                                i.forEach(t));
                        })(e, (t) => {
                            const i = t.topicView;
                            (i.setTopicShapeClass(i.getShapeStyle()),
                                t !== e &&
                                    t.parent() !== e &&
                                    i.refreshLabelViewState());
                        });
                    }
                    ((this._matrixView = t),
                        t.parent(this),
                        t.figure.setLabelInfo(
                            this.topicView.model.getMatrixLabelInfos()
                        ),
                        this.matrixContainer.add(t.getSvg()),
                        this.boundaries.forEach);
                }
                getFishBoneMainLineView() {
                    return this._fishBoneMainLineView;
                }
                _initFishBoneHeadLineView() {
                    var e;
                    if (!this.originBranchView)
                        return Object(c.isFishBoneHead)(this)
                            ? void (
                                  this._fishBoneHeadLineView ||
                                  (this._fishBoneHeadLineView = new h.a(this))
                              )
                            : (null === (e = this._fishBoneHeadLineView) ||
                                  void 0 === e ||
                                  e.remove(),
                              void (this._fishBoneHeadLineView = null));
                }
                _initTimelineMainLineView() {
                    var e;
                    if (this.originBranchView) return;
                    const t = this.getStructureClass();
                    if (!o.TIMELINE_SIDED_STRUCTURES.includes(t))
                        return (
                            null === (e = this._timelineMainLineView) ||
                                void 0 === e ||
                                e.remove(),
                            void (this._timelineMainLineView = null)
                        );
                    this._timelineMainLineView ||
                        (this._timelineMainLineView = new S.a(this));
                }
                _initFishBoneMainLineView() {
                    var e;
                    if (!this.originBranchView)
                        return Object(c.isFishBoneMainBone)(this)
                            ? void (
                                  this._fishBoneMainLineView ||
                                  (this._fishBoneMainLineView = new p.a(this))
                              )
                            : (null === (e = this._fishBoneMainLineView) ||
                                  void 0 === e ||
                                  e.remove(),
                              void (this._fishBoneMainLineView = null));
                }
                _initTreeTableCellViews() {
                    this.originBranchView ||
                        (Object(c.isTreeTableCell)(this)
                            ? this._treeTableCellView ||
                              (this._treeTableCellView = new f.a(this))
                            : this._treeTableCellView &&
                              (this._treeTableCellView.remove(),
                              (this._treeTableCellView = null)));
                }
                afterAncestorChange() {
                    var e;
                    const t = this.parent();
                    if (t) {
                        t instanceof _.a
                            ? (this.sheetView = t)
                            : (this.sheetView = t.sheetView);
                        const i = this.sheetView;
                        ((this.boundaryContainer =
                            null == i ? void 0 : i.boundaryContainer),
                            (this.branchContainer =
                                null == i ? void 0 : i.branchContainer),
                            (this.connectionContainer =
                                null == i ? void 0 : i.connectionContainer),
                            (this.matrixContainer =
                                null == i ? void 0 : i.matrixContainer),
                            super.afterAncestorChange.bind(this)(),
                            this.updateRealPosition(),
                            (this._layerCache = null),
                            (this._editDomainCache = null),
                            (this._contextCache = null));
                        const n = this.editDomain().eventBus;
                        (this.listenTo(
                            n,
                            'selecting.mouseMultiSelect',
                            this.isMultiSelect
                        ),
                            this.listenTo(
                                null === (e = this.sheetView) || void 0 === e
                                    ? void 0
                                    : e.model,
                                'change:infoItemDisplay',
                                (...e) => {
                                    this.topicView.infoItemDisplayChanged(...e);
                                }
                            ),
                            this.listenTo(n, 'dragStart.dragManager', () => {
                                this.shouldHide() || this.updatePolygon();
                            }));
                    } else this.sheetView = null;
                }
                editDomain() {
                    return (
                        this._editDomainCache ||
                            (this._editDomainCache = super.editDomain.bind(
                                this
                            )()),
                        this._editDomainCache
                    );
                }
                getContext() {
                    return (
                        this._contextCache ||
                            (this._contextCache = super.getContext.bind(
                                this
                            )()),
                        this._contextCache
                    );
                }
                onPositionChange() {
                    this.refresh();
                }
                getChildrenBranchesByType(e = o.TOPIC_TYPE.ATTACHED) {
                    if (Array.isArray(e)) {
                        let t = [];
                        return (
                            e.forEach((e) => {
                                t = [
                                    ...t,
                                    ...this.getChildrenBranchesByType(e),
                                ];
                            }),
                            t
                        );
                    }
                    if (-1 === I.indexOf(e)) return [];
                    let t = this._childrenBranches.get(e);
                    return (
                        t || ((t = []), this._childrenBranches.set(e, t)),
                        t
                    );
                }
                getDescendantBranchesByType(...e) {
                    0 === (e = e.reduce((e, t) => e.concat(t), [])).length &&
                        e.push(o.TOPIC_TYPE.ATTACHED);
                    const t = [],
                        i = (n) => {
                            t.push(n);
                            n.getChildrenBranchesByType(e).forEach((e) => i(e));
                        };
                    return (i(this), t.shift(), t);
                }
                addBoundaryView(e) {
                    (e.parent(this), e.initStyle());
                    let t,
                        i = this.boundaries.length,
                        n = -1;
                    const { rangeStart: r, rangeEnd: o } = e.model;
                    if (
                        (this.boundaries.length > 0 && N(this.boundaries),
                        -1 === r && -1 === o)
                    )
                        i = 0;
                    else
                        for (const [e, t] of this.boundaries.entries()) {
                            const { rangeStart: n, rangeEnd: a } = t.model;
                            (r < n || (r === n && o > a)) && (i = e);
                        }
                    return (
                        (n =
                            i !== this.boundaries.length
                                ? this.boundaryContainer.index(
                                      this.boundaries[i].boundaryGroup
                                  )
                                : (function (e) {
                                      const t = e.boundaryContainer;
                                      return (function e(i) {
                                          let n = [],
                                              r = -1;
                                          for (const e of i) {
                                              let i;
                                              const o = e.boundaries;
                                              n = n.concat(
                                                  e.getChildrenBranchesByType(I)
                                              );
                                              for (const e of o)
                                                  ((i = t.index(
                                                      e.boundaryGroup
                                                  )),
                                                      (-1 === r ||
                                                          (-1 !== i &&
                                                              i < r)) &&
                                                          (r = i));
                                          }
                                          return -1 !== r
                                              ? r
                                              : n.length
                                                ? e(n)
                                                : r;
                                      })(e.getChildrenBranchesByType(I));
                                  })(this)),
                        (t =
                            -1 === n
                                ? this.boundaryContainer.children().length
                                : n),
                        this.boundaries.splice(i, 0, e),
                        this.boundaryContainer.add(e.boundaryGroup, t),
                        this
                    );
                }
                addSummaryView(e) {
                    (e.parent(this), this.summaries.push(e));
                }
                findSummaryView(e) {
                    for (const t of this.summaries)
                        if (t.model.get('topicId') === e.model.get('id'))
                            return t;
                }
                addChildBranch(e, t, i) {
                    var n;
                    e.parent(this);
                    const a =
                        null !== (n = null == t ? void 0 : t.type) &&
                        void 0 !== n
                            ? n
                            : o.TOPIC_TYPE.ATTACHED;
                    if ('summary' === a) {
                        t.summaryModel && (e.summaryModel = t.summaryModel);
                        const i = t.summaryView || this.findSummaryView(e);
                        (i && (e.summaryView = i),
                            (e.summaryLineStyle =
                                e.summaryLineStyle ||
                                r.a.getStyleValue(
                                    e.summaryView,
                                    o.STYLE_KEYS.SHAPE_CLASS
                                )),
                            e.listenTo(
                                e.summaryModel,
                                'changeStyle',
                                e.onChangeStyle
                            ),
                            e.listenTo(e.summaryModel, 'setStyleObject', () => {
                                this.layout();
                            }));
                    }
                    const s = this.getChildrenBranchesByType(a);
                    return (
                        void 0 !== t.at ? s.splice(t.at, 0, e) : s.push(e),
                        e.initView(),
                        Object(c.isFishBoneHead)(this) &&
                            this.updateStructure(),
                        this.listenTo(
                            e,
                            'change:bounds',
                            this.onChildBranchBoundsChange
                        ),
                        i ||
                            !this.model.isCollapse() ||
                            Object(c.isCalloutBranch)(e) ||
                            (this.model.extendBranch(),
                            this.collapseExtendView &&
                                this.collapseExtendView.render()),
                        !i &&
                            e.getComputedNumberFormat() &&
                            e.getComputedNumberFormat() !==
                                o.NUMBERFORMAT.NONE &&
                            this.refreshTopicWithNumbering(t.at || 0),
                        this.layout(),
                        this
                    );
                }
                removeChildBranch(e, t) {
                    const i = this.getChildrenBranchesByType(t),
                        n = i.indexOf(e);
                    n < 0 ||
                        (this.stopListening(e),
                        e.remove(),
                        i.splice(n, 1),
                        e.parent(null),
                        Object(c.isFishBoneHead)(this) &&
                            this.updateStructure(),
                        g.a.work(g.b.PRIORITY.SELECT_SELECTION, {
                            execute: () => {
                                if (Object(c.isDetachedBranch)(e)) return;
                                const t = this.getModule(
                                    o.MODULE_NAME.SELECTION
                                );
                                if (t) {
                                    let e;
                                    ((e =
                                        n > 0
                                            ? i[n - 1]
                                            : 0 === n && i[0]
                                              ? i[0]
                                              : this),
                                        t.selectSingle(e));
                                }
                            },
                        }),
                        this.layout());
                }
                removeSummaryBranch(e) {
                    const t = this.summaries.indexOf(e);
                    (this.stopListening(e),
                        e.remove(),
                        e.getConnectionView().remove(),
                        this.summaries.splice(t, 1),
                        e.parent(null),
                        this.refresh());
                }
                setPosition(e, t) {
                    'number' == typeof e
                        ? ((this.position.x = e),
                          void 0 !== t && (this.position.y = t))
                        : ((this.position.x = e.x), (this.position.y = e.y));
                }
                move(e, t) {
                    ((this.linePosition.x = e), (this.linePosition.y = t));
                }
                render() {
                    return (
                        this.boundaries.length && N(this.boundaries),
                        this.renderMatrixView(),
                        this
                    );
                }
                onMatrixLabelInfoUpdated(e) {
                    var t;
                    (null === (t = this.getMatrixView()) ||
                        void 0 === t ||
                        t.figure.setLabelInfo(e),
                        this.layout());
                }
                renderMatrixView() {
                    this._matrixView &&
                        this._matrixView.parent() === this &&
                        this._matrixView.figure.isVisible &&
                        (this._matrixView.render(),
                        this._matrixView.getSvg().front());
                }
                layout() {
                    const e = this.isMatrixHeadCellBranch()
                        ? this.parent()
                        : this;
                    if (e instanceof n) {
                        if (e._ignoreChildBranchBoundsChange) return;
                        e.figure.invalidateLayout();
                    }
                }
                calChildrenBounds() {
                    ((this._ignoreChildBranchBoundsChange = !0),
                        this.getChildrenBranchesByType(I).forEach(s.a),
                        (this._ignoreChildBranchBoundsChange = !1));
                }
                onChildBranchBoundsChange(e, t) {
                    this.layout();
                }
                remove() {
                    const e = this.model,
                        t = this.getChildrenBranchesByType(I);
                    (E.a.each(
                        t,
                        (e) => {
                            e.remove();
                        },
                        this
                    ),
                        t.splice(0));
                    const i = this.editDomain();
                    return (
                        i &&
                            i.selectionManager &&
                            i.selectionManager.removeFromSelection(this),
                        this.boundaries.slice().forEach((e) => {
                            e.remove();
                        }),
                        this.summaries.slice().forEach((e) => {
                            e.remove();
                        }),
                        this._connectionView.remove(),
                        this.stopListening(),
                        this.clearReactions(),
                        this.topicView.remove(),
                        i && i.model2View && delete i.model2View[e.id],
                        this._removeSpecialStructureView(),
                        this.collapseExtendView &&
                            this.collapseExtendView.remove(),
                        (this._contextCache = null),
                        (this._layerCache = null),
                        (this._editDomainCache = null),
                        this.parent(null),
                        this.figure.dispose(),
                        this
                    );
                }
                _removeSpecialStructureView() {
                    var e, t, i, n;
                    (null === (e = this._matrixView) ||
                        void 0 === e ||
                        e.removeSelf(),
                        null === (t = this._treeTableCellView) ||
                            void 0 === t ||
                            t.remove(),
                        null === (i = this._fishBoneHeadLineView) ||
                            void 0 === i ||
                            i.remove(),
                        null === (n = this._fishBoneMainLineView) ||
                            void 0 === n ||
                            n.remove());
                }
                select() {
                    var e;
                    this.isSelected = !0;
                    const t = this.getModule(o.MODULE_NAME.SEMAPHORE);
                    (t && t.isStatusActive(o.UI_STATUS.DE_FOCUS)
                        ? this.getProxy().displayDeFocus()
                        : this.getProxy().displaySelect(),
                        this._showSummarySelectBox(!1),
                        this.config(
                            o.CONFIG.NO_AUTO_SHOW_BRANCH_IN_VIEW_PORT
                        ) ||
                            null ===
                                (e = this.getModule(
                                    o.MODULE_NAME.MOVE_VIEW_PORT
                                )) ||
                            void 0 === e ||
                            e.showBranchInViewPort(
                                this,
                                this.onBranchHasInViewPort
                            ));
                }
                deselect() {
                    ((this.isSelected = !1),
                        this.getProxy().displayDeselect(),
                        this._hideSummarySelectBox());
                }
                onIntersect() {
                    this.topicView.showIntersection();
                }
                onLeave() {
                    this.topicView.hideIntersection();
                }
                _showSummarySelectBox(e) {
                    (this.getContext().isReadOnly() &&
                        !this.config(o.CONFIG.ENABLE_SELECT_IN_READONLY)) ||
                        (this.selectBox &&
                            (this.selectBox.show().transparent(e),
                            e
                                ? this.selectBox.stateMachine.transition(
                                      this.selectBox.event_hover
                                  )
                                : (this.selectBox.stateMachine.transition(
                                      this.selectBox.event_select
                                  ),
                                  this.getModule(
                                      o.MODULE_NAME.SEMAPHORE
                                  ).isStatusActive(o.UI_STATUS.DE_FOCUS) &&
                                      this._deFocusSummarySelectBox()),
                            this._connectionView.activate(e)));
                }
                _hideSummarySelectBox() {
                    this.selectBox &&
                        (this.selectBox.hide(),
                        this.selectBox.stateMachine.transition(
                            this.selectBox.event_deselect
                        ),
                        this.selectBox.stateMachine.transition(
                            this.selectBox.event_out
                        ),
                        this._connectionView.deactivate());
                }
                _deFocusSummarySelectBox() {
                    this.selectBox &&
                        this.selectBox.stateMachine.transition(
                            this.selectBox.event_defocus
                        );
                }
                onMouseover(e) {
                    this.getContext()
                        .getActiveUIStatus()
                        .includes(o.UI_STATUS.DRAG_TOPIC_SELECT_BOX) ||
                        this.isSelected ||
                        (e &&
                            'collapse-extend-hover-area' !==
                                e.target.getAttribute('data-name') &&
                            this.getProxy().displayHover(),
                        this.collapseExtendView &&
                            this.getProxy() === this &&
                            this.collapseExtendView.hover());
                }
                onMouseout() {
                    this.isSelected || this.getProxy().displayDehover();
                }
                onDblClick(e) {
                    if (
                        (e && e.stopPropagation(),
                        e &&
                            'collapse-extend-hover-area' ===
                                e.target.getAttribute('data-name'))
                    )
                        return;
                    const t = this.editDomain();
                    t &&
                        t.selectionManager &&
                        t.selectionManager.selectSingle(this);
                }
                changeSelection(e) {
                    const t = this.editDomain();
                    let i;
                    if (t && t.selectionManager) {
                        (t.selectionManager.selectNone(),
                            (i = t.model2View[e.get('id')]));
                        const n = this.getModule(o.MODULE_NAME.SELECTION);
                        n && n.selectSingle(i);
                    }
                }
                onAddTopic(e, t = {}, i) {
                    const r = new n(e);
                    (this.addChildBranch(r, t, i),
                        this.model.canCollapse() &&
                            !this.collapseExtendView &&
                            this.addCollapseExtendView(new A.a(this.model)),
                        t.noAnimation && (r._noAnimation = !0),
                        this.layout(),
                        g.a.work(g.b.PRIORITY.SELECT_SELECTION, {
                            execute: () => {
                                const e = this.getModule(
                                    o.MODULE_NAME.SELECTION
                                );
                                e && e.selectSingle(r);
                            },
                        }));
                }
                onRemoveTopic(e, t) {
                    var i, n;
                    const r =
                            null !== (i = null == t ? void 0 : t.type) &&
                            void 0 !== i
                                ? i
                                : o.TOPIC_TYPE.ATTACHED,
                        a = this.getChildrenBranchesByType(r).find(
                            (t) => t.model === e
                        );
                    if (!a) return;
                    const s = a.getComputedNumberFormat();
                    if (
                        (this.removeChildBranch(a, r),
                        !this.model.canCollapse() &&
                            this.collapseExtendView &&
                            (this.collapseExtendView.remove(),
                            (this.collapseExtendView = null)),
                        s && s !== o.NUMBERFORMAT.NONE)
                    ) {
                        const e =
                            null !== (n = null == t ? void 0 : t.at) &&
                            void 0 !== n
                                ? n
                                : 0;
                        (this.refreshTopicWithNumbering(e), this.layoutDeep());
                    } else this.layout();
                }
                onMoveChildTopic(e, t) {
                    const i = this._childrenBranches.get(o.TOPIC_TYPE.ATTACHED);
                    if (!i) return;
                    if (
                        e >= 0 &&
                        e <= i.length - 1 &&
                        t >= 0 &&
                        t <= i.length - 1
                    ) {
                        const n = i.splice(e, 1);
                        (i.splice(t, 0, ...n), this.layout());
                    }
                }
                onChangeNumbering() {}
                onAddNumbering() {}
                removeBoundaryView(e) {
                    e.remove();
                }
                onAddBoundaryView(e) {
                    (this.addBoundaryView(new y.a(e, this)), this.refresh());
                }
                onRemoveBoundary(e) {
                    const t = this.boundaries.find((t) => t.model === e);
                    t && (this.removeBoundaryView(t), this.refresh());
                }
                removeSummaryView(e) {
                    e && (e.remove(), this.refresh());
                }
                onAddSummary(e) {
                    (this.addSummaryView(new M.a(e)), this.refresh());
                }
                onRemoveSummary(e) {
                    const t = this.summaries.find((t) => t.model === e);
                    t && this.removeSummaryView(t);
                }
                addCollapseExtendView(e) {
                    ((this.collapseExtendView = e),
                        e.parent(this.topicView),
                        e.render());
                }
                showCollapseExtendView() {
                    this.collapseExtendView
                        ? this.collapseExtendView.show()
                        : this.addCollapseExtendView(new A.a(this.model));
                }
                hideCollpaseExtendView() {
                    this.collapseExtendView && this.collapseExtendView.hide();
                }
                getRealPosition() {
                    return this.realPosition;
                }
                updateRealPosition() {
                    const e = Object.assign({}, this.position),
                        t = this.parent();
                    if (t instanceof n) {
                        const i = t.getRealPosition();
                        ((e.x += i.x), (e.y += i.y));
                    }
                    ((this.realPosition = e),
                        this.figure.setPosition(this.realPosition),
                        this.move(this.realPosition.x, this.realPosition.y),
                        (this.figure.positionDirty || this.isSummaryBranch()) &&
                            this.trigger(
                                'afterRealPosChange',
                                Object.assign({}, this.realPosition)
                            ),
                        this.topicView.topicShapeSelectBox &&
                            this.topicView.topicShapeSelectBox.figure.setPosition(
                                {
                                    x: this.getRealPosition().x,
                                    y: this.getRealPosition().y,
                                }
                            ));
                }
                updateLayoutInfo(e) {
                    ((this.layoutInfoMap[e.layoutStructureClass] = e),
                        this.trigger(
                            'afterlayoutInfoUpdate',
                            this.layoutInfoMap
                        ));
                }
                getLayoutInfo(e) {
                    return (
                        e || (e = this.getStructureClass()),
                        this.layoutInfoMap[e]
                    );
                }
                getClientRect() {
                    const { bounds: e } = this.topicView,
                        t = a.b(this.getRealPosition(), e),
                        i = this.editDomain()
                            .getCoordinateTransfer()
                            .mindMapToViewport(t);
                    return {
                        x: i.x,
                        y: i.y,
                        width: e.width,
                        height: e.height,
                    };
                }
                getTopicWidth() {
                    return this.topicView.bounds.width;
                }
                getTopicCustomWidth() {
                    return this.model.customWidth() || 0;
                }
                _initStructure() {
                    const e = this.model.getStructureClass();
                    ((this.structureClass = Object(c.getViewStructure)(
                        this,
                        e
                    )),
                        this.figure.setStructureClass(this.structureClass),
                        (this._presetStructureClass = Object(
                            c.getViewStructure
                        )(this, null)));
                }
                updateStructure() {
                    var e;
                    const t = this.model.getStructureClass();
                    (this.parent() &&
                        (null === (e = this.parent()) || void 0 === e
                            ? void 0
                            : e.structureClass) !== t) ||
                        (this.tag = null);
                    const i = Object(c.getViewStructure)(this, t),
                        n = this.structureClass;
                    ((this.structureClass = i),
                        this.figure.setStructureClass(this.structureClass));
                    if (
                        (this.getChildrenBranchesByType(I).forEach((e) =>
                            e.updateStructure()
                        ),
                        n === i)
                    ) {
                        if (
                            i === o.STRUCTURECLASS.SPREADSHEET ||
                            i === o.STRUCTURECLASS.COLUMNSPREADSHEET
                        ) {
                            const e = Object(c.getViewStructure)(this, null);
                            if (e !== this._presetStructureClass)
                                return (
                                    (this._presetStructureClass = e),
                                    this.layout()
                                );
                        }
                        return (this._initTreeTableCellViews(), !1);
                    }
                    return (
                        !this.isPlaceHolderView &&
                        (this._initSpecialStructureView(), this.layout(), !0)
                    );
                }
                getStructureClass() {
                    return (
                        Object(c.isUndef)(this.structureClass) &&
                            this.updateStructure(),
                        this.structureClass
                    );
                }
                getStructureObject() {
                    return Object(T.a)(this.getStructureClass());
                }
                getDirection() {
                    let e;
                    switch (this.getStructureClass()) {
                        case o.STRUCTURECLASS.ORGCHARTDOWN:
                        case o.STRUCTURECLASS.ORGCHARTUP:
                        case o.STRUCTURECLASS.TIMELINEHORIZONTAL:
                        case o.STRUCTURECLASS.TIMELINESIDEDHORIZONTAL:
                        case o.STRUCTURECLASS.FISHBONELEFTHEADED:
                        case o.STRUCTURECLASS.FISHBONERIGHTHEADED:
                            e = o.DIRECTION.LEFTRIGHT;
                            break;
                        default:
                            e = o.DIRECTION.UPDOWN;
                    }
                    return e;
                }
                getBrotherDirection() {
                    const e = this.parent();
                    return e instanceof n ? e.getDirection() : 'LR';
                }
                isMapLike() {
                    return (
                        -1 !==
                        this.getStructureClass().search(o.STRUCTURECLASS.MAP)
                    );
                }
                isFishbone() {
                    return -1 !== this.getStructureClass().search('fishbone');
                }
                isRotate() {
                    return !1;
                }
                getRangeGrowthDirection(e) {
                    return Object(T.a)(
                        this.getStructureClass()
                    ).getRangeGrowthDirection(this, e);
                }
                changeTag(e) {
                    this.tag !== e &&
                        (this.tag && (this.preTag = this.tag), (this.tag = e));
                }
                getTag() {
                    return this.tag;
                }
                onCollapseChange() {
                    this.model.isCollapse()
                        ? this.collapseBranch()
                        : this.extendBranch();
                }
                collapseBranch() {
                    !0 !== this.collapse &&
                        ((this.collapse = !0), this.figure.setFolded(!0));
                }
                extendBranch() {
                    !1 !== this.collapse &&
                        ((this.collapse = !1), this.figure.setFolded(!1));
                }
                isUnableCollapse() {
                    return (
                        0 ===
                            this.getChildrenBranchesByType().filter(
                                (e) => !e.isPlaceHolderView
                            ).length ||
                        this.isCentralBranch() ||
                        this.isMapLike()
                    );
                }
                isUnableShowCollapseBtn() {
                    return (
                        this.isUnableCollapse() ||
                        (Object(c.isTreeTableStructure)(this) &&
                            !this.model.isCollapse()) ||
                        (this.isMatrixCellBranch() && !this.model.isCollapse())
                    );
                }
                shouldCollapse() {
                    return this.model.isCollapse() && !this.isUnableCollapse();
                }
                setLayoutVisible(e) {
                    ((this.layoutVisible = e),
                        this.figure.setVisible(this.layoutVisible));
                }
                tagCentralBranch(e) {
                    this.isCentralBranchView = e;
                }
                shouldHide() {
                    if (!this.layoutVisible) return !0;
                    const e = this.parent();
                    return (
                        !e ||
                        (!this.isCentralBranch() &&
                            !(e instanceof _.a) &&
                            (!(
                                !Object(c.isCalloutBranch)(this) ||
                                !this.isInMatrix()
                            ) ||
                                !(
                                    (!Object(c.isSummaryBranch)(this) &&
                                        !Object(c.isCalloutBranch)(this)) ||
                                    !Object(c.isTreeTableCell)(this.parent()) ||
                                    !Object(c.isTreeTableStructure)(e)
                                ) ||
                                !(
                                    !Object(c.isSummaryBranch)(this) ||
                                    !Object(c.isFishBoneHead)(this.parent())
                                ) ||
                                (this.isMatrixCellBranch()
                                    ? e.shouldHide()
                                    : !(
                                          !e.shouldCollapse() ||
                                          Object(c.isCalloutBranch)(this)
                                      ) || e.shouldHide())))
                    );
                }
                isBoundariesHide() {
                    return (
                        !(!this.shouldCollapse() && !this.shouldHide()) ||
                        !!Object(c.isFishBoneHead)(this) ||
                        void 0
                    );
                }
                isMatrixViewHide() {
                    return this.shouldCollapse() || this.shouldHide();
                }
                isSummariesHide() {
                    return this.shouldCollapse() || this.shouldHide();
                }
                _showOrHideCollapseExtendView() {
                    let e = this.collapseExtendView;
                    this.isUnableCollapse()
                        ? Object(c.isDef)(e) && (null == e || e.hide())
                        : (Object(c.isUndef)(e) &&
                              ((e = new A.a(this.model)),
                              this.addCollapseExtendView(e)),
                          null == e || e.show());
                }
                _showOrHideBoundaries() {
                    this.boundaries.forEach((e) => {
                        const t =
                            !this.isBoundariesHide() && !e.isForcedInvisible;
                        e.setVisible(t);
                    });
                }
                _showOrHideMatrixView() {
                    this._matrixView &&
                        this._matrixView.setVisible(!this.isMatrixViewHide());
                }
                _showOrHideRelationShipViews() {
                    var e;
                    const t = (e) => null == e,
                        i = this.editDomain();
                    null === (e = this.sheetView) ||
                        void 0 === e ||
                        e.relationships.forEach((e) => {
                            const n = e.model,
                                r = n.get('end1Id'),
                                o = n.get('end2Id'),
                                a = i.model2View[r],
                                s = i.model2View[o],
                                l =
                                    t(a) ||
                                    t(s) ||
                                    !a.figure.isVisible ||
                                    !s.figure.isVisible ||
                                    e.isForcedInvisible;
                            e.setVisible(!l);
                        });
                }
                refreshView() {
                    return (this.shouldHide() && this._isHiding) ||
                        this.isPlaceHolderView
                        ? u.a.SKIP
                        : (this.trigger('refreshView'),
                          this.isCentralBranch() &&
                              this._showOrHideRelationShipViews(),
                          this._showOrHideBoundaries(),
                          this._showOrHideMatrixView(),
                          void this.render());
                }
                setVisible(e) {
                    ((this.isVisible = e),
                        this.figure.setVisible(
                            this.isVisible &&
                                !this.shouldHide() &&
                                !this.isForcedInvisible
                        ));
                }
                setRelatedViewsVisible(e, t) {
                    var i, n, r;
                    ((t = Object.assign(
                        {},
                        {
                            connection: !0,
                            boundary: !0,
                            topic: !0,
                            branch: !0,
                            treeTableCell: !0,
                        },
                        t
                    )).branch && this.setForcedInvisible(e),
                        t.topic && this.topicView.setForcedInvisible(e),
                        t.boundary &&
                            this.boundaries.forEach((t) => {
                                t.setForcedInvisible(e);
                            }),
                        t.connection &&
                            (this._connectionView.setForcedInvisible(e),
                            null === (i = this._fishBoneHeadLineView) ||
                                void 0 === i ||
                                i.setForcedInvisible(e),
                            null === (n = this._fishBoneMainLineView) ||
                                void 0 === n ||
                                n.setForcedInvisible(e)),
                        t.treeTableCell &&
                            (null === (r = this._treeTableCellView) ||
                                void 0 === r ||
                                r.setForcedInvisible(e)));
                }
                refreshTopicWithNumbering(e) {
                    const t = this.getChildrenBranchesByType(),
                        i = t.length;
                    for (; e < i; )
                        (t[e].figure.invalidateLayout(),
                            t[e].refreshTopicWithNumbering(0),
                            e++);
                }
                refresh() {
                    this.layout();
                }
                branchIndex() {
                    const e = this.parent();
                    if (e instanceof n) {
                        const t = e.getChildrenBranchesByType();
                        return E.a.indexOf(t, this);
                    }
                    return -1;
                }
                summaryIndex() {
                    const e = this.parent();
                    if (e instanceof n) {
                        const t = e.getChildrenBranchesByType(
                            o.TOPIC_TYPE.SUMMARY
                        );
                        return E.a.indexOf(t, this);
                    }
                    return -1;
                }
                floatingIndex() {
                    const e = this.parent();
                    if (e instanceof n) {
                        const t = e.getChildrenBranchesByType(
                            o.TOPIC_TYPE.DETACHED
                        );
                        return E.a.indexOf(t, this);
                    }
                    return -1;
                }
                isAttached() {
                    return -1 !== this.branchIndex();
                }
                getNumberingText() {
                    let e = '';
                    const t = this.getPrefixText(),
                        i = this.getNumberText(),
                        n = this.getSuffixText();
                    return (
                        t && i && ((e += t), i && (e += ' ')),
                        i && (e += i),
                        n && (i && (e += ' '), (e += n)),
                        e
                    );
                }
                getNumberText() {
                    const e = this.branchIndex();
                    if (-1 !== e) {
                        const t = this.getComputedNumberFormat();
                        if (t === o.NUMBERFORMAT.NONE) return '';
                        {
                            let i = C.a.getNumberText(t, e + 1);
                            const r = this.parent();
                            if (r instanceof n) {
                                const e =
                                    null == r ? void 0 : r.getNumberText();
                                e &&
                                    (i =
                                        e +
                                        this.getNumberSeparatorText(
                                            this.getComputedNumberSeparator()
                                        ) +
                                        i);
                            }
                            return i;
                        }
                    }
                }
                getNumberSeparatorText(e) {
                    switch (e) {
                        case o.NUMBERSEPARATOR.COMMA:
                            return ',';
                        case o.NUMBERSEPARATOR.DOT:
                            return '.';
                        case o.NUMBERSEPARATOR.HYPHEN:
                            return '-';
                        case o.NUMBERSEPARATOR.DASH:
                            return '_';
                        case o.NUMBERSEPARATOR.OBLIQUE:
                            return '/';
                        default:
                            return '.';
                    }
                }
                getPrefixText() {
                    const e = this.getNumbering();
                    if (e) return e.prefix;
                }
                getSuffixText() {
                    const e = this.getNumbering();
                    if (e) return e.suffix;
                }
                getPreOrSufNumber(e, t) {
                    return '' === e ? '' : e || t;
                }
                getNumbering() {
                    var e;
                    if (this.isAttached())
                        return null === (e = this.parent()) || void 0 === e
                            ? void 0
                            : e.model.get('numbering');
                }
                getComputedNumberFormat() {
                    var e;
                    if (!this.isAttached()) return;
                    const t = this.getNumberFormat();
                    return (
                        t ||
                        (null === (e = this.parent()) || void 0 === e
                            ? void 0
                            : e.getComputedNumberFormat())
                    );
                }
                getNumberFormat() {
                    const e = this.getNumbering();
                    if (e) return e.numberFormat;
                }
                getComputedNumberSeparator() {
                    var e;
                    if (!this.isAttached()) return;
                    const t = this.getNumberSeparator();
                    return (
                        t ||
                        (null === (e = this.parent()) || void 0 === e
                            ? void 0
                            : e.getComputedNumberSeparator())
                    );
                }
                getNumberSeparator() {
                    const e = this.getNumbering();
                    if (e) return e.numberSeparator;
                }
                isCentralBranch() {
                    var e;
                    return (
                        (null === (e = this.sheetView) || void 0 === e
                            ? void 0
                            : e.centralBranchView) === this ||
                        this.isCentralBranchView
                    );
                }
                isAttachedBranch() {
                    return this.model.type() === o.TOPIC_TYPE.ATTACHED;
                }
                isSummaryBranch() {
                    return this.model.type() === o.TOPIC_TYPE.SUMMARY;
                }
                isDetachedBranch() {
                    return this.model.type() === o.TOPIC_TYPE.DETACHED;
                }
                isCalloutBranch() {
                    return this.model.type() === o.TOPIC_TYPE.CALLOUT;
                }
                isLeafBranch() {
                    if (
                        !this.isCentralBranch() &&
                        !this.getChildrenBranchesByType().length
                    )
                        return !0;
                }
                isMatrixBranch() {
                    const e = this.getStructureClass();
                    return (
                        e === o.STRUCTURECLASS.COLUMNSPREADSHEET ||
                        e === o.STRUCTURECLASS.SPREADSHEET
                    );
                }
                getMatrixStructureBranch(e = -1) {
                    const t = (e, i) => {
                        if (e.isMatrixBranch()) return e;
                        if (0 !== i && Object(c.isDetachedBranch)(e)) {
                            const r = e.parent();
                            return r instanceof n ? t(r, i - 1) : null;
                        }
                        return null;
                    };
                    return t(this, e);
                }
                isInMatrix(e = -1) {
                    return null !== this.getMatrixStructureBranch(e);
                }
                isMatrixHeadCellBranch() {
                    const e = this.parent();
                    return (
                        (null == e ? void 0 : e.type) === o.VIEW_TYPE.BRANCH &&
                        this.isAttachedBranch() &&
                        (null == e ? void 0 : e.isMatrixBranch())
                    );
                }
                isMatrixCellBranch() {
                    const e = this.parent();
                    if (null == e ? void 0 : e.isDetachedBranch()) return !1;
                    if ((null == e ? void 0 : e.type) !== o.VIEW_TYPE.BRANCH)
                        return !1;
                    const t = null == e ? void 0 : e.parent();
                    return (
                        (null == t ? void 0 : t.type) === o.VIEW_TYPE.BRANCH &&
                        this.isAttachedBranch() &&
                        t.isMatrixBranch()
                    );
                }
                layoutDeep() {
                    (this.setLayoutFalse(), this.layout());
                }
                setLayoutFalse() {
                    ((this.isLayout = !1),
                        E.a.each(
                            this.getChildrenBranchesByType([
                                o.TOPIC_TYPE.ATTACHED,
                                o.TOPIC_TYPE.DETACHED,
                                o.TOPIC_TYPE.CALLOUT,
                                o.TOPIC_TYPE.SUMMARY,
                            ]),
                            (e) => {
                                e.getChildrenBranchesByType().length &&
                                    e.setLayoutFalse();
                            }
                        ));
                }
                renderByThemeChange() {
                    ((this.isLayout = !1),
                        this.topicView.figure.invalidateLayout(),
                        this.collapseExtendView &&
                            this.collapseExtendView.render(),
                        E.a.each(
                            this.getChildrenBranchesByType([
                                o.TOPIC_TYPE.ATTACHED,
                                o.TOPIC_TYPE.DETACHED,
                                o.TOPIC_TYPE.CALLOUT,
                                o.TOPIC_TYPE.SUMMARY,
                            ]),
                            (e) => {
                                e.renderByThemeChange();
                            }
                        ));
                }
                getTextClientStyle() {
                    var e;
                    const t = r.a.getFontInfo(this);
                    return Object.assign(Object.assign({}, t), {
                        fontSize: parseInt(
                            null !== (e = t.fontSize) && void 0 !== e ? e : '12'
                        ),
                    });
                }
                getTextClientBounds() {
                    var e, t;
                    return null ===
                        (t =
                            null === (e = this.topicView) || void 0 === e
                                ? void 0
                                : e.titleView) || void 0 === t
                        ? void 0
                        : t.getSvg().node.getBoundingClientRect();
                }
                hideTitle() {
                    this.topicView.hideTitle();
                }
                showTitle() {
                    this.topicView.showTitle();
                }
                saveEdit(e, t) {
                    ((t = Object.assign({}, { isSilent: !1 }, t)),
                        this.model.changeTitle(e, t));
                }
                getEditContent() {
                    return this.model.getTitle();
                }
                getLayer() {
                    if (this._forceLayer) return this._forceLayer;
                    if (this._layerCache) return this._layerCache;
                    let e;
                    return (
                        (e =
                            this.isCentralBranch() || !this.parent()
                                ? 1
                                : this.parent().getLayer() + 1),
                        (this._layerCache = e),
                        e
                    );
                }
                isMultiSelect(e, t) {
                    const i = this.getModule(o.MODULE_NAME.SELECTION);
                    if (i) {
                        const n = this.editDomain()
                                .getCoordinateTransfer()
                                .mindMapToVisibleArea({
                                    x: this.realPosition.x,
                                    y: this.realPosition.y,
                                }),
                            r = this.editDomain().getScale() / 100,
                            o = {
                                x: r * this.topicView.shapeBounds.x,
                                y: r * this.topicView.shapeBounds.y,
                                width: r * this.topicView.shapeBounds.width,
                                height: r * this.topicView.shapeBounds.height,
                            },
                            a = {
                                x: n.x + o.x,
                                y: n.y + o.y,
                                x2: n.x + o.x + o.width,
                                y2: n.y + o.y + o.height,
                                width: o.width,
                                height: o.height,
                            };
                        !i.isUnselectable(this) && C.a.isBoxIntersect(e, a)
                            ? i.addSelection(this)
                            : t || i.removeFromSelection(this);
                    }
                }
                updatePolygon() {
                    return (
                        (this._polyPointsArr = Object(T.a)(
                            this.getStructureClass()
                        ).calcPolygons(this)),
                        this
                    );
                }
                getPolyPointsArr() {
                    return this._polyPointsArr;
                }
                getPolygonBounds() {
                    if (this._treeTableCellView) {
                        if (
                            Object(c.isTreeTableHeadBranch)(this) &&
                            this.shouldCollapse()
                        )
                            return Object.assign({}, this.topicView.bounds);
                        const e = this.getLayoutInfo(
                            Object(c.getTreeTableHeadBranchView)(
                                this
                            ).getStructureClass()
                        ).externalInfo;
                        return {
                            x: e.cellX,
                            y: e.cellY,
                            width: this.topicView.bounds.width,
                            height: e.cellHeight,
                        };
                    }
                    return Object.assign({}, this.topicView.bounds);
                }
                isFishBoneSpecial() {
                    const e = this.model,
                        t = e.type(),
                        i = e.getStructureClass() || this.getStructureClass();
                    if (!i) return !1;
                    return (
                        !(
                            !i.includes('fishbone') ||
                            ('root' !== t && 'attached' !== t)
                        ) || void 0
                    );
                }
                getBrotherDefaultTitle() {
                    const e = this.model,
                        t = r.a.getClassName(this);
                    if (t === o.CLASS_TYPE.FLOATING_TOPIC)
                        return this.getContext().getTranslatedText(
                            'DEFAULT_FLOATING_TOPIC_TITLE'
                        );
                    {
                        const i = e.parent();
                        if (i instanceof O.a) {
                            const e =
                                i.children(o.TOPIC_TYPE.ATTACHED).length + 1;
                            return t === o.CLASS_TYPE.MAIN_TOPIC
                                ? this.getContext().getTranslatedText(
                                      'DEFAULT_MAIN_TOPIC_TITLE'
                                  ) +
                                      ' ' +
                                      e
                                : this.getContext().getTranslatedText(
                                      'DEFAULT_SUBTOPIC_TITLE'
                                  ) +
                                      ' ' +
                                      e;
                        }
                    }
                }
                getChildDefaultTitle() {
                    const e = this.model,
                        t = r.a.getClassName(this),
                        i = e.children(o.TOPIC_TYPE.ATTACHED).length + 1;
                    return t === o.CLASS_TYPE.CENTRAL_TOPIC
                        ? this.getContext().getTranslatedText(
                              'DEFAULT_MAIN_TOPIC_TITLE'
                          ) +
                              ' ' +
                              i
                        : this.getContext().getTranslatedText(
                              'DEFAULT_SUBTOPIC_TITLE'
                          ) +
                              ' ' +
                              i;
                }
                getAdapter(e) {
                    if (e === o.ADAPTERS.SUMMARY_VIEW) {
                        const e = this.parent();
                        if (!(e instanceof n)) return;
                        return e.findSummaryView(this);
                    }
                }
                getBranchPath() {
                    var e;
                    let t = '';
                    if (this.isCentralBranch()) return '0';
                    switch (this.model.type()) {
                        case o.TOPIC_TYPE.SUMMARY:
                            t = '.S' + this.summaryIndex();
                            break;
                        case o.TOPIC_TYPE.DETACHED:
                            t = '.F' + this.floatingIndex();
                            break;
                        case o.TOPIC_TYPE.CALLOUT:
                            t = '.C';
                            break;
                        default:
                            t = '.' + this.branchIndex();
                    }
                    return (
                        (null === (e = this.parent()) || void 0 === e
                            ? void 0
                            : e.getBranchPath()) + t
                    );
                }
                getAvailableStructure() {
                    if (this.isCentralBranch() || this.isDetachedBranch())
                        return o.EXPOSED_STRUCTURE;
                    if (
                        this.isSummaryBranch() ||
                        Object(c.isCalloutBranch)(this)
                    )
                        return [];
                    const e = this.parent();
                    return null == e
                        ? void 0
                        : e
                              .getStructureObject()
                              .getAvailableChildStructure(e, this);
                }
                setProxy(e) {
                    const t = this.getProxy();
                    ((this._proxy = e),
                        this.isSelected
                            ? (t.displayDeselect(),
                              this.isDeFocus
                                  ? e.displayDeFocus()
                                  : e.displaySelect())
                            : t.displayDehover());
                }
                getProxy() {
                    return this._proxy || this;
                }
                deleteProxy(e) {
                    this._proxy === e &&
                        (this.isSelected &&
                            (this.getProxy().displayDeselect(),
                            this.displaySelect()),
                        delete this._proxy);
                }
                displayHover() {
                    var e;
                    (this.topicView.showSelectBox(),
                        this._showSummarySelectBox(!0),
                        null === (e = this.collapseExtendView) ||
                            void 0 === e ||
                            e.hover());
                }
                displayDehover() {
                    var e;
                    (this.topicView.hideSelectBox(),
                        this._hideSummarySelectBox(),
                        null === (e = this.collapseExtendView) ||
                            void 0 === e ||
                            e.dehover());
                }
                displaySelect() {
                    var e;
                    (this.killAnimationByFlag(
                        o.ANIMATION_FLAGS.BRANCH_SHOW_HIGH_LIGHT_SELECT_BOX
                    ),
                        this.topicView.activateSelectBox(),
                        this._showSummarySelectBox(!1),
                        null === (e = this.collapseExtendView) ||
                            void 0 === e ||
                            e.hover());
                }
                displayDeselect() {
                    var e;
                    (this.killAnimationByFlag(
                        o.ANIMATION_FLAGS.BRANCH_SHOW_HIGH_LIGHT_SELECT_BOX
                    ),
                        this.topicView.hideSelectBox(),
                        null === (e = this.collapseExtendView) ||
                            void 0 === e ||
                            e.dehover());
                }
                displayDeFocus() {
                    (this.topicView.deFocusSelectBox(),
                        this._deFocusSummarySelectBox());
                }
                displayHighLightSelect() {
                    this.killAnimationByFlag(
                        o.ANIMATION_FLAGS.BRANCH_SHOW_HIGH_LIGHT_SELECT_BOX
                    );
                    const e = this.getModule(o.MODULE_NAME.ANIMATION);
                    e &&
                        e.startAnimation(
                            o.ANIMATION_FLAGS.BRANCH_SHOW_HIGH_LIGHT_SELECT_BOX,
                            { target: this }
                        );
                }
                getSvg() {
                    return this.figure.getContent();
                }
                setSelectBoxOpacity(e) {
                    var t, i, n, r, o, a, s;
                    (null ===
                        (n =
                            null ===
                                (i =
                                    null === (t = this.selectBox) ||
                                    void 0 === t
                                        ? void 0
                                        : t.figure) || void 0 === i
                                ? void 0
                                : i.setOpacity) ||
                        void 0 === n ||
                        n.call(i, e),
                        null ===
                            (s =
                                null ===
                                    (a =
                                        null ===
                                            (o =
                                                null === (r = this.topicView) ||
                                                void 0 === r
                                                    ? void 0
                                                    : r.topicShapeSelectBox) ||
                                        void 0 === o
                                            ? void 0
                                            : o.figure) || void 0 === a
                                    ? void 0
                                    : a.setOpacity) ||
                            void 0 === s ||
                            s.call(a, e));
                }
                getMatrixView() {
                    return this._matrixView;
                }
                getTreeTableCellView() {
                    return this._treeTableCellView;
                }
                getFishboneHeadLineView() {
                    return this._fishBoneHeadLineView;
                }
                getFishboneMainLineView() {
                    return this._fishBoneMainLineView;
                }
                getTimelineMainLineView() {
                    return this._timelineMainLineView;
                }
                getConnectionView() {
                    return this._connectionView;
                }
                setUnbalanceRightNumber(e) {
                    this.figure.setUnbalanceRightNumber(e);
                }
                extendParentBranchIfHidden() {
                    if (!this.figure.isVisible) {
                        const e = this.parent();
                        if (e) {
                            if (e.type !== o.VIEW_TYPE.BRANCH) return;
                            const t = e.figure.isVisible;
                            let i;
                            ((i =
                                !!e.collapseExtendView &&
                                e.collapseExtendView.figure.isCollapsed),
                                i && e.model.extendBranch(),
                                t || e.extendParentBranchIfHidden());
                        }
                    }
                }
                get topicView() {
                    return this._topicView;
                }
                get connection() {
                    return this._connectionView;
                }
                get isLayout() {
                    return this._isLayout;
                }
                set isLayout(e) {
                    this._isLayout = e;
                }
            });
            ((w = n =
                R(
                    [
                        (t) =>
                            class i extends t {
                                constructor() {
                                    (super(...arguments),
                                        (this.changeHooks = {
                                            [o.STYLE_KEYS.LINE_WIDTH]: () => {
                                                this.refreshLineWidth();
                                            },
                                            [o.STYLE_KEYS.LINE_COLOR]: () => {
                                                this.refreshLineColor();
                                            },
                                            [o.STYLE_KEYS.LINE_CLASS]: () => {
                                                this.refreshLineShape();
                                            },
                                            [o.STYLE_KEYS.LINE_PATTERN]: () => {
                                                this.refreshLinePattern();
                                            },
                                            [o.STYLE_KEYS.ARROW_END_CLASS]:
                                                () => {
                                                    this.refreshEndArrowClass();
                                                },
                                            summaryLineClass: () => {
                                                this.refreshSummaryLineShape();
                                            },
                                            summaryLineWidth: () => {
                                                this.refreshSummaryLineWidth();
                                            },
                                            summaryLineColor: () => {
                                                this.refreshSummaryLineColor();
                                            },
                                            summaryLinePattern: () => {
                                                this.refreshSummaryLinePattern();
                                            },
                                            [o.STYLE_KEYS.SPACING_MAJOR]:
                                                () => {
                                                    this.refreshSpacingMajor();
                                                },
                                            [o.STYLE_KEYS.SPACING_MINOR]:
                                                () => {
                                                    this.refreshSpacingMinor();
                                                },
                                            [o.STYLE_KEYS.ALIGNMENT_BY_LEVEL]:
                                                () => {
                                                    (this.setAlignmentByLevelSetting(),
                                                        this.getContext().trigger(
                                                            o.EVENTS
                                                                .ALIGNMENT_BY_LEVEL_STATUS_CHANGED
                                                        ));
                                                },
                                        }));
                                }
                                refreshStyles() {
                                    (this.refreshColorStyles(),
                                        this.refreshSkeletonStyles());
                                }
                                refreshColorStyles() {
                                    (this.refreshLineColor(),
                                        this.refreshSummaryLineColor(),
                                        this.topicView.refreshColorStyles(),
                                        this.getChildrenBranchesByType(
                                            I
                                        ).forEach((e) => {
                                            e.refreshColorStyles();
                                        }),
                                        this.boundaries.forEach((e) => {
                                            e.refreshColorStyles();
                                        }));
                                }
                                refreshSkeletonStyles() {
                                    (this.refreshSpacingMajor(),
                                        this.refreshSpacingMinor(),
                                        this.setAlignmentByLevelSetting(),
                                        this.refreshLineWidth(),
                                        this.refreshLineShape(),
                                        this.refreshLinePattern(),
                                        this.refreshEndArrowClass(),
                                        this.refreshSummaryLineWidth(),
                                        this.refreshSummaryLineShape(),
                                        this.refreshSummaryLinePattern(),
                                        this.topicView.refreshSkeletonStyles(),
                                        this.getChildrenBranchesByType(
                                            I
                                        ).forEach((e) => {
                                            e.refreshSkeletonStyles();
                                        }),
                                        this.boundaries.forEach((e) => {
                                            e.refreshSkeletonStyles();
                                        }));
                                }
                                initStyle() {
                                    (super.initStyle(),
                                        this.refreshColorStyles(),
                                        this.refreshSkeletonStyles());
                                }
                                initEventsListener() {
                                    if (
                                        (super.initEventsListener(),
                                        'readonly' === e.env.SB_MODE)
                                    )
                                        return;
                                    (this.listenTo(
                                        this.model,
                                        'changeStyle',
                                        this.onChangeStyle
                                    ),
                                        this.listenTo(
                                            this.model,
                                            'changeClass',
                                            this.refreshStyles
                                        ),
                                        this.listenTo(
                                            this.model,
                                            'addTopic removeTopic',
                                            () => {
                                                var e;
                                                this.isCentralBranch() &&
                                                    (null ===
                                                        (e = this.sheetView) ||
                                                    void 0 === e
                                                        ? void 0
                                                        : e.isMultiLineColors()) &&
                                                    this.getChildrenBranchesByType().forEach(
                                                        (e) => {
                                                            e.refreshLineColor();
                                                        }
                                                    );
                                            }
                                        ),
                                        this.listenTo(
                                            this.model,
                                            'setStyleObject changeStructureClass',
                                            () => {
                                                this.getContext()
                                                    .getModule(
                                                        o.MODULE_NAME.SEMAPHORE
                                                    )
                                                    .isStatusActive(
                                                        o.UI_STATUS
                                                            .CHANGING_THEME
                                                    ) || this.refreshStyles();
                                            }
                                        ));
                                    const t = this.parent();
                                    if (
                                        t instanceof i &&
                                        (this.addReaction(
                                            () => t.figure.lineColor,
                                            () => this.refreshLineColor()
                                        ),
                                        this.addReaction(
                                            () => t.figure.lineWidth,
                                            () => this.refreshLineWidth()
                                        ),
                                        this.addReaction(
                                            () => t.figure.linePattern,
                                            () => this.refreshLinePattern()
                                        ),
                                        this.addReaction(
                                            () => t.figure.endArrowClass,
                                            () => this.refreshEndArrowClass()
                                        ),
                                        Object(c.isCentralBranch)(t))
                                    ) {
                                        const e = t.parent();
                                        this.addReaction(
                                            () => e.figure.multiLineColors,
                                            () => this.refreshLineColor()
                                        );
                                    }
                                    (this.addReaction(
                                        () => this.figure.structureClass,
                                        () => this.refreshLineShape()
                                    ),
                                        this.addAutoRun(() => {
                                            this.refreshEndArrowClass();
                                        }),
                                        this.addReaction(
                                            () => this.figure.lineShape,
                                            (e, t) => {
                                                (e !==
                                                    o.BRANCHCONNECTION.CURVE &&
                                                    t !==
                                                        o.BRANCHCONNECTION
                                                            .CURVE) ||
                                                    this.refreshEndArrowClass();
                                            }
                                        ),
                                        this.reactionLineWidthByGlobal());
                                }
                                onChangeStyle(e) {
                                    var t;
                                    null === (t = this.changeHooks[e]) ||
                                        void 0 === t ||
                                        t.call(this);
                                }
                                refreshSpacingMajor() {
                                    this.figure.setMajorSpacing(
                                        parseInt(
                                            `${r.a.getStyleValue(this, o.STYLE_KEYS.SPACING_MAJOR)}`
                                        )
                                    );
                                }
                                refreshSpacingMinor() {
                                    this.figure.setMinorSpacing(
                                        parseInt(
                                            `${r.a.getStyleValue(this, o.STYLE_KEYS.SPACING_MINOR)}`
                                        )
                                    );
                                }
                                refreshLineColor() {
                                    const e = r.a.getStyleValue(
                                        this,
                                        o.STYLE_KEYS.LINE_COLOR
                                    );
                                    (this.figure.setLineColor(e),
                                        this.trigger('refreshLineColor'));
                                }
                                refreshLineWidth() {
                                    const e = parseInt(
                                        r.a.getStyleValue(
                                            this,
                                            o.STYLE_KEYS.LINE_WIDTH
                                        )
                                    );
                                    (this.figure.setLineWidth(e),
                                        this.trigger('refreshLineWidth'));
                                }
                                refreshLineShape() {
                                    const e = r.a.getStyleValue(
                                        this,
                                        o.STYLE_KEYS.LINE_CLASS
                                    );
                                    this.figure.setLineShape(e);
                                }
                                refreshLinePattern() {
                                    const e =
                                        r.a.getStyleValue(
                                            this,
                                            o.STYLE_KEYS.LINE_PATTERN
                                        ) || o.LINE_PATTERN.SOLID;
                                    this.figure.setLinePattern(e);
                                }
                                refreshEndArrowClass() {
                                    const e =
                                        this.getContext().getSheetView().figure
                                            .lineTapered ===
                                        o.LINETAPERED.TAPERED;
                                    let t = o.ARROW_CLASS.NONE;
                                    ((t =
                                        e && Object(c.isCentralBranch)(this)
                                            ? o.ARROW_CLASS.NONE
                                            : r.a.getStyleValue(
                                                  this,
                                                  o.STYLE_KEYS.ARROW_END_CLASS
                                              ) || o.ARROW_CLASS.NONE),
                                        this.figure.setEndArrowClass(t));
                                }
                                refreshSummaryLineWidth() {
                                    const e = this.getAdapter(
                                        o.ADAPTERS.SUMMARY_VIEW
                                    );
                                    if (!e) return;
                                    const t = r.a.getStyleValue(
                                        e,
                                        o.STYLE_KEYS.LINE_WIDTH
                                    );
                                    this.figure.setSummaryLineWidth(
                                        parseInt(t)
                                    );
                                }
                                refreshSummaryLineColor() {
                                    const e = this.getAdapter(
                                        o.ADAPTERS.SUMMARY_VIEW
                                    );
                                    if (!e) return;
                                    const t = r.a.getStyleValue(
                                        e,
                                        o.STYLE_KEYS.LINE_COLOR
                                    );
                                    this.figure.setSummaryLineColor(t);
                                }
                                refreshSummaryLineShape() {
                                    const e = this.getAdapter(
                                        o.ADAPTERS.SUMMARY_VIEW
                                    );
                                    if (!e) return;
                                    const t = r.a.getStyleValue(
                                        e,
                                        o.STYLE_KEYS.SHAPE_CLASS
                                    );
                                    this.figure.setSummaryLineShape(t);
                                }
                                refreshSummaryLinePattern() {
                                    const e = this.getAdapter(
                                        o.ADAPTERS.SUMMARY_VIEW
                                    );
                                    if (!e) return;
                                    const t = r.a.getStyleValue(
                                        e,
                                        o.STYLE_KEYS.LINE_PATTERN
                                    );
                                    this.figure.setSummaryLinePattern(t);
                                }
                                setAlignmentByLevelSetting() {
                                    const e =
                                        r.a.getStyleValue(
                                            this,
                                            o.STYLE_KEYS.ALIGNMENT_BY_LEVEL
                                        ) ||
                                        o.ALIGNMENT_BY_LEVEL_STATUS.INACTIVED;
                                    this.figure.setAlignmentByLevelSetting(e);
                                }
                                reactionLineWidthByGlobal() {
                                    const e = this.getContext().getSheetView();
                                    this.addReaction(
                                        () => e.figure.globalLineWidth,
                                        () => this.refreshLineWidth()
                                    );
                                }
                            },
                        (e) =>
                            class t extends e {
                                constructor(e) {
                                    (super(e),
                                        Object(x.makeObservable)(this, {
                                            backGroundCellBranchView:
                                                x.observable,
                                            setbackGroundCellBranchView:
                                                x.action,
                                        }));
                                }
                                initView() {
                                    (super.initView(),
                                        this.refreshBackGroundCellBranchView(
                                            this.figure.structureClass,
                                            null
                                        ),
                                        this.listenTo(
                                            this.getContext(),
                                            o.EVENTS.AFTER_SHEET_CONTENT_CHANGE,
                                            (e) => {
                                                e.target === this.model &&
                                                    'structureClass' ===
                                                        e.attr &&
                                                    this.refreshBackGroundCellBranchView(
                                                        this.figure
                                                            .structureClass,
                                                        e.oldValue
                                                    );
                                            }
                                        ));
                                }
                                setbackGroundCellBranchView(e) {
                                    this.backGroundCellBranchView = e;
                                }
                                isTransformWithinCell(e, t) {
                                    return o.TREE_TABLE_GROUP_LIST.includes(e)
                                        ? e !==
                                              this.model.getStructureClass() ||
                                              Object(c.isTreeTableHeadBranch)(
                                                  this
                                              )
                                        : !!o.MATRIX_GROUP_LIST.includes(e) ||
                                              (t
                                                  ? !!o.TREE_TABLE_GROUP_LIST.includes(
                                                        t
                                                    )
                                                  : Object(c.isInTreeTableCell)(
                                                        this
                                                    ) ||
                                                    Object(c.isInMatrixCell)(
                                                        this
                                                    ));
                                }
                                getFilteredDescendantAttachedBranches(
                                    e = () => !0
                                ) {
                                    const t = [],
                                        i = (n) => {
                                            t.push(n);
                                            n.getChildrenBranchesByType(
                                                o.TOPIC_TYPE.ATTACHED
                                            )
                                                .filter((t) => e(t))
                                                .forEach((e) => i(e));
                                        };
                                    return (i(this), t);
                                }
                                refreshBackGroundCellBranchView(e, t) {
                                    if (!this.isTransformWithinCell(e, t))
                                        return;
                                    if (o.TREE_TABLE_GROUP_LIST.includes(e))
                                        return this.getFilteredDescendantAttachedBranches().forEach(
                                            (e) => {
                                                e.setbackGroundCellBranchView(
                                                    e.getBackgroundCell()
                                                );
                                            }
                                        );
                                    const i = Object(c.isInTreeTableCell)(this);
                                    return o.TREE_TABLE_GROUP_LIST.includes(
                                        t
                                    ) ||
                                        (!t && i)
                                        ? i
                                            ? this.getFilteredDescendantAttachedBranches().forEach(
                                                  (e) => {
                                                      e.setbackGroundCellBranchView(
                                                          e.getBackgroundCell()
                                                      );
                                                  }
                                              )
                                            : this.getFilteredDescendantAttachedBranches(
                                                  (e) =>
                                                      !Object(
                                                          c.isTreeTableHeadBranch
                                                      )(e)
                                              ).forEach((e) => {
                                                  e.setbackGroundCellBranchView(
                                                      null
                                                  );
                                              })
                                        : void 0;
                                }
                                getBackgroundCell() {
                                    if (
                                        Object(c.isSingleItemTreeTableCell)(
                                            this
                                        )
                                    )
                                        return this;
                                    let e = this;
                                    for (
                                        ;
                                        (i = e),
                                            (!Object(c.isTreeTableCell)(i) ||
                                                Object(
                                                    c.isSingleItemTreeTableCell
                                                )(i)) &&
                                                ((e = e.parent()),
                                                e instanceof t);
                                    );
                                    var i;
                                    return (e instanceof t || (e = null), e);
                                }
                            },
                        (t) =>
                            class extends t {
                                initEventsListener() {
                                    (super.initEventsListener(),
                                        'readonly' !== e.env.SB_MODE &&
                                            this.addAutoRun(() => {
                                                this.updateConnectionMask();
                                            }));
                                }
                                updateConnectionMask() {
                                    const e = this.figure.structureClass;
                                    o.MAP_LIKE_STRUCTURES.includes(e)
                                        ? this.figure.setConnectionMasked(!0)
                                        : this.figure.setConnectionMasked(!1);
                                }
                            },
                    ],
                    w
                )),
                (t.a = w));
        }).call(this, i(45));
    },
];
