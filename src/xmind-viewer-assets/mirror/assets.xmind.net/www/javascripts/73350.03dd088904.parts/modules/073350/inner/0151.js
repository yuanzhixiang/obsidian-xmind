export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return N;
        });
        var n = i(3),
            r = i(26),
            o = i.n(r),
            a = i(0),
            s = i(1),
            l = i(11),
            c = i(12),
            d = i.n(c);
        function f(e) {
            (e.stopPropagation(), e.preventDefault());
        }
        const h = '.drag';
        var p = o.a.View.extend({
                viewEvents: {
                    dragViewMoving: 'dragViewMoving',
                    dragViewFinish: 'dragViewFinish',
                },
                initialize(e, t, i, n) {
                    ((this._dragViewContainer = null),
                        (this._currentDragView = e),
                        (this._preSelectViewList = t),
                        (this._context = e.getContext()),
                        (this._svgView = this._context.getSVGView()),
                        (this._lastDragRealPosition = this._context
                            .getSVGView()
                            .getCoordinateTransfer()
                            .viewportToMindMap(i)),
                        (this._lastDragClientPosition = i),
                        (this._isUseTouch = n),
                        (this._$dragCover = this._context.callService(
                            a.SERVICE_NAME.GET_VIEW_PORT_COVER
                        )),
                        (this._$dragEventEl = d()(document)),
                        (this._moveViewPortModule = this._context.getModule(
                            a.MODULE_NAME.MOVE_VIEW_PORT
                        )),
                        this._$dragCover.show(),
                        this._initCloneG(),
                        this._initEventListeners());
                },
                _initCloneG() {
                    if (this._currentDragView.type === a.VIEW_TYPE.BRANCH) {
                        let e = [];
                        e =
                            -1 ===
                            this._preSelectViewList.indexOf(
                                this._currentDragView
                            )
                                ? [this._currentDragView]
                                : this._preSelectViewList;
                        const t = this._context
                            .getSheetView()
                            .getDragViewContainer();
                        (e.forEach((e) => {
                            const i = e.getRealPosition(),
                                n = Object(s.getTopicSVGStructureCopy)(e);
                            (n.x(i.x), n.y(i.y), t.add(n));
                        }),
                            (this._dragViewContainer = t));
                    } else
                        this._dragViewContainer =
                            this._currentDragView.createDragView();
                    this.setElement(this._dragViewContainer.get(0).node);
                },
                _initEventListeners() {
                    const e = this._context.getSVGView();
                    let t = !1;
                    const i = this._isUseTouch
                            ? 'touchmove.drag'
                            : 'mousemove.drag',
                        n = this._isUseTouch ? 'touchend.drag' : 'mouseup.drag';
                    (this._currentDragView.$el &&
                        this._currentDragView.$el.on(i, (e) => {
                            e.preventDefault();
                        }),
                        document.addEventListener('touchstart', f),
                        document.addEventListener('touchmove', f, {
                            passive: !1,
                        }),
                        this._$dragEventEl.on(
                            i,
                            l.a.frameStabilize((i) => {
                                if (t) return;
                                this._isUseTouch &&
                                    this._context.setScrollDisable();
                                const n = this._context.isBrowniePlatform()
                                        ? Object.assign(
                                              {},
                                              window.brownieTouchViewPortPosition
                                          )
                                        : this._context.getDragEventClientPosition(
                                              i,
                                              this._isUseTouch
                                          ),
                                    r = e
                                        .getCoordinateTransfer()
                                        .viewportToMindMap(n),
                                    o = r.x - this._lastDragRealPosition.x,
                                    a = r.y - this._lastDragRealPosition.y;
                                ((this._lastDragRealPosition = r),
                                    this._dmove(o, a),
                                    this._moveViewPortModule.showMouseInViewPort(
                                        { x: n.x, y: n.y },
                                        null,
                                        100
                                    ),
                                    this.trigger(
                                        this.viewEvents.dragViewMoving,
                                        Object.assign(
                                            {},
                                            this._lastDragRealPosition
                                        )
                                    ));
                            })
                        ),
                        this._$dragEventEl.on(n, (e) => {
                            ((t = !0), this.dispose());
                            const i = this._context.getDragEventClientPosition(
                                e,
                                this._isUseTouch
                            );
                            this.trigger(
                                this.viewEvents.dragViewFinish,
                                this._context
                                    .getSVGView()
                                    .getCoordinateTransfer()
                                    .viewportToMindMap({
                                        x: i.x,
                                        y: i.y,
                                    })
                            );
                        }),
                        this.listenTo(
                            this._context,
                            a.EVENTS.VIEW_PORT_MOVING,
                            (t, i) => {
                                const n = e.currentScale,
                                    r = -t / n,
                                    o = -i / n;
                                (this._dmove(r, o),
                                    (this._lastDragRealPosition.x += r),
                                    (this._lastDragRealPosition.y += o),
                                    this.trigger(
                                        this.viewEvents.dragViewMoving,
                                        Object.assign(
                                            {},
                                            this._lastDragRealPosition
                                        )
                                    ));
                            }
                        ));
                },
                _dmove(e, t) {
                    this._dragViewContainer.dmove(e, t);
                },
                dispose() {
                    (this._isUseTouch && this._context.setScrollEnable(),
                        this._$dragEventEl.off(h),
                        this._currentDragView.$el.off(h),
                        document.removeEventListener('touchmove', f),
                        this._$dragCover.hide(),
                        this._context.getSheetView().clearDragViewContainer(),
                        this._moveViewPortModule.stopMove(),
                        this.remove());
                },
                getCloneG() {
                    return this._dragViewContainer;
                },
            }),
            T = i(65),
            u = i(57);
        class g extends u.a {
            dragFinish(e) {
                const { draggedView: t, position: i } = e,
                    n = Object(s.relativePositionFor)(
                        i,
                        t.parent().getRealPosition()
                    );
                t.model.changePosition(n);
            }
        }
        var Q = g;
        class m extends T.a {
            constructor(e) {
                (super(e), (this._isFreePositionBranch = !0));
            }
            dragStart(e) {
                return (
                    (e = super.dragStart(e)),
                    this.attachOldParent(e.position),
                    this._setIsSelectionBranchStable(!1),
                    e
                );
            }
            dragMoving(e) {
                const {
                        dropView: t,
                        position: i,
                        keyPress: { shiftKey: n },
                        selections: r,
                    } = e,
                    o = i.x > 0;
                (n
                    ? ((this._draggedViewNewParentView = null),
                      (this._draggedViewNewIndex = -1),
                      (this._isCurrentAddToRight = !1))
                    : ((this._draggedViewNewParentView = t),
                      (this._draggedViewNewIndex = Math.min(
                          ...r.map((e) => e.branchIndex())
                      )),
                      (this._isCurrentAddToRight = o)),
                    this.indicatorView.update(this._draggedViewNewParentView, {
                        index: this._draggedViewNewIndex,
                        addToRight: this._isCurrentAddToRight,
                        freePosition: n ? null : i,
                    }));
            }
            attachOldParent(e) {
                if (!this._draggedViewOldParentView) return;
                let t = !1;
                const i = this._draggedViewOldParentView.getStructureClass();
                i.includes('map') &&
                    (e.x > 0 && (t = !0),
                    i.includes('anticlockwise') && (t = !t));
            }
            getDragOverView(e) {
                const t = this.centralBranch,
                    { position: i } = e,
                    n = t.getRealPosition(),
                    r = Object(s.relativePositionFor)(i, n),
                    o = t.getPolyPointsArr(),
                    a = r.x < 0 ? 'left' : 'right';
                return (
                    (this._currentPolygon = o.find((e) => e.side === a)),
                    t
                );
            }
        }
        var b = m,
            C = i(4),
            L = i(6),
            y = i.n(L),
            M = i(14),
            A = i(27),
            v = i(82);
        const E = 'rgba(46, 189, 255, 0.15)';
        class _ extends u.a {
            dragStart(e) {
                return (
                    (this._draggedViewOldParentView = e.draggedView
                        .parent()
                        .parent()),
                    (this.stashInfo = {
                        newParent: null,
                        direction: '',
                        webVideoUrl:
                            this._draggedViewOldParentView.model.getWebVideoOriginalUrl(),
                    }),
                    {}
                );
            }
            getDragOverView(e) {
                const { pos: t } = e;
                let i = null;
                return (
                    Object(v.a)(
                        this.centralBranch,
                        (e) =>
                            !!M.a.isTopicIntersectWithPoint(e, t) &&
                            ((i = e), !0)
                    ),
                    i
                );
            }
            _changeParent(e) {
                const t = this.stashInfo.newParent;
                t !== e &&
                    (t && (t.onLeave(), this._removeCrossGrids(t)),
                    (this.stashInfo.newParent = e),
                    e && (this._addCrossGrids(e), e.onIntersect()));
            }
            _addCrossGrids(e) {
                if (e.s$crossGrids) return;
                const t = new C.a.G().data('name', 'cross-grids');
                let i = e.topicView.shapeBounds;
                const {
                    rotation: n,
                    cx: r,
                    cy: o,
                } = e.topicView.topicGroup.trans;
                n && (i = A.f(i, n, r, o));
                const a = i.x,
                    s = a + i.width / 4,
                    l = s + i.width / 2,
                    c = i.y,
                    d = c + i.height / 2,
                    f = {
                        left: t
                            .rect()
                            .move(a, c)
                            .size(i.width / 4, i.height)
                            .data('name', 'left'),
                        right: t
                            .rect()
                            .move(l, c)
                            .size(i.width / 4, i.height)
                            .data('name', 'right'),
                        top: t
                            .rect()
                            .move(s, c)
                            .size(i.width / 2, i.height / 2)
                            .data('name', 'top'),
                        bottom: t
                            .rect()
                            .move(s, d)
                            .size(i.width / 2, i.height / 2)
                            .data('name', 'bottom'),
                    };
                (y.a.values(f).forEach((e) => {
                    e.attr({
                        fill: E,
                        stroke: 'rgba(46, 189, 255, 1)',
                        'stroke-width': 2,
                        opacity: 0.5,
                    });
                }),
                    (t.__blocks = f),
                    (t.__direction = ''),
                    (e.s$crossGrids = e.svg.put(t)));
            }
            _changeCrossGridColor(e, t) {
                const i = e.s$crossGrids;
                if (!i || i.__direction === t) return;
                const n = i.__direction;
                i.__direction = t;
                const r = i.__blocks;
                (n && r[n].fill(E), r[t].fill('rgba(46, 189, 255, 0.5)'));
            }
            _removeCrossGrids(e) {
                e.s$crossGrids &&
                    (e.s$crossGrids.remove(), delete e.s$crossGrids);
            }
            dragMoving(e) {
                const { dropView: t, pos: i } = e;
                if (null === t) return void this._changeParent(t);
                const n = M.a.calcDirectionInTopic(t, i);
                ((this.stashInfo.direction = n),
                    this._changeParent(t),
                    this._changeCrossGridColor(t, n));
            }
            dragCancel() {
                const e = this.stashInfo.newParent;
                return (
                    e && (e.onLeave(), this._removeCrossGrids(e)),
                    this._draggedViewOldParentView.onLeave(),
                    this._removeCrossGrids(this._draggedViewOldParentView),
                    !0
                );
            }
            dragFinish(e) {
                const { dragedView: t } = e;
                if (!this.stashInfo.newParent) return;
                const i = t.parent().parent(),
                    n = i.model,
                    r = n.get('image');
                (i === this.stashInfo.newParent
                    ? n.getImageModel().align(this.stashInfo.direction)
                    : (n.removeImage(),
                      this.stashInfo.newParent.model.addImage(
                          Object.assign({}, r, {
                              align: this.stashInfo.direction,
                          }),
                          {
                              webVideoUrl: this.stashInfo.webVideoUrl,
                          }
                      )),
                    this._changeParent(null));
            }
        }
        var O = _,
            S = i(29);
        class x extends u.a {
            constructor(...e) {
                (super(...e),
                    (this._matrixView = null),
                    (this._matrixMainBranchView = null),
                    (this._matrixViewRealPosition = null),
                    (this._matrixLabelViewOldIndex = null));
            }
            dragStart(e) {
                const { draggedView: t } = e;
                ((this._matrixView = t.parent()),
                    (this._matrixMainBranchView = this._matrixView.parent()),
                    (this._matrixViewRealPosition =
                        this._matrixView.getRealPosition()),
                    (this._matrixLabelViewOldIndex = this._matrixView
                        .getLabelViewList()
                        .indexOf(e.draggedView)));
            }
            dragMoving(e) {
                const { position: t } = e,
                    { isTranspose: i } = this._matrixView.matrixGrid,
                    n = this._getLabelCellViews();
                let r;
                if (i) {
                    const e = n.map(
                        (e) =>
                            e.bounds.y +
                            this._matrixViewRealPosition.y +
                            e.bounds.height / 2
                    );
                    r = this._geIndex(e, t.y, this._matrixLabelViewOldIndex);
                } else {
                    const e = n.map(
                        (e) =>
                            e.bounds.x +
                            this._matrixViewRealPosition.x +
                            e.bounds.width / 2
                    );
                    r = this._geIndex(e, t.x, this._matrixLabelViewOldIndex);
                }
                if (r !== this._matrixLabelViewOldIndex) {
                    this._matrixView.columnMap.changeKeyOrder(
                        this._matrixLabelViewOldIndex,
                        r
                    );
                    const e = [...this._matrixView.columnMap.keyArr];
                    ((this._matrixLabelViewOldIndex = r),
                        this._matrixView.figure.setLabelInfo(e),
                        this._matrixMainBranchView.layout());
                }
            }
            dragFinish() {
                const e = this._matrixView.figure.labelInfo;
                this._matrixMainBranchView.model.setMatrixLabelInfos(e);
            }
            _getLabelCellViews() {
                return Object(S.f)(this._matrixView.matrixGrid).map(
                    (e) => e.view
                );
            }
            _geIndex(e, t, i) {
                let n = -1;
                return (
                    e.forEach((e, i) => {
                        e < t && (n = i);
                    }),
                    i > n && n++,
                    n
                );
            }
        }
        var R = class extends O {
            dragFinish(e) {
                if (!this.stashInfo.newParent) return;
                const { draggedView: t } = e,
                    i = t.parent().parent(),
                    n = i.model;
                if (i === this.stashInfo.newParent)
                    n.updateMathJaxAlign(this.stashInfo.direction);
                else {
                    const e = n.getMathJaxInfo();
                    (n.removeMathJaxInfo(),
                        (e.content.align = this.stashInfo.direction),
                        this.stashInfo.newParent.model.updateMathJaxInfo(e));
                }
                this._changeParent(null);
            }
        };
        const I = {
            'branch.attached': T.a,
            'branch.detached': T.a,
            'branch.callout': Q,
            'branch.free': b,
            [a.VIEW_TYPE.IMAGE]: O,
            [a.VIEW_TYPE.MATRIX_LABEL]: x,
            [a.VIEW_TYPE.MATH_JAX]: R,
        };
        class N {
            constructor(e) {
                ((this.originalDragSelections = []),
                    (this.triggerDragMoving = Object(s.throttle)(() => {
                        var e;
                        return null === (e = this._dragHandler) || void 0 === e
                            ? void 0
                            : e.dragMoving(
                                  Object.assign({}, this._transferData)
                              );
                    }, 50)),
                    (this._context = e),
                    (this._svgView = null),
                    (this._dragSelections = []),
                    (this._selectionsModule = null),
                    (this._semaphoreModule = null),
                    (this._contextUndo = null),
                    (this._dragView = null),
                    (this._dragHandler = null),
                    (this._transferData = {}),
                    (this._prePosition = { x: 0, y: 0 }),
                    (this.keyPressHandler = this.keyPressHandler.bind(this)));
            }
            _initModules() {
                (this._selectionsModule ||
                    (this._selectionsModule = this._context.getModule(
                        a.MODULE_NAME.SELECTION
                    )),
                    this._semaphoreModule ||
                        (this._semaphoreModule = this._context.getModule(
                            a.MODULE_NAME.SEMAPHORE
                        )),
                    this._contextUndo ||
                        (this._contextUndo = this._context.model.getUndo()),
                    this._svgView ||
                        (this._svgView = this._context.getSVGView()));
            }
            prepareStartDrag(e, t) {
                this._context.isReadOnly() ||
                    (this._initModules(),
                    (this.originalDragSelections =
                        this._selectionsModule.getSelections()),
                    (this._dragSelections = Object(
                        s.filterMultiSelectedBranches
                    )(this.originalDragSelections)),
                    Object(s.dragThreshold)(
                        e,
                        (i) => {
                            const n = [...this._dragSelections],
                                r = 'press' === e.type;
                            ((this._dragView = new p(t, n, i, r)),
                                (this._transferData.event = e),
                                this._startDragView(t, i));
                            const o = this._dragView.viewEvents;
                            (this.listenTo(
                                this._dragView,
                                o.dragViewMoving,
                                this._onDragViewMoving
                            ),
                                this.listenTo(
                                    this._dragView,
                                    o.dragViewFinish,
                                    this._onDragViewFinish
                                ));
                        },
                        this._context
                    ));
            }
            dragCancel() {
                if (!this._dragHandler) return;
                this._dragHandler.dragCancel() &&
                    (this._semaphoreModule.decrease(a.UI_STATUS.DRAG),
                    this._dragView.dispose(),
                    this._contextUndo.keepAllInOne(!1),
                    this._reset());
            }
            getOriginalDragSelections() {
                return this.originalDragSelections;
            }
            _startDragView(e, t) {
                (this.preFixOriginalSelections(e),
                    this._semaphoreModule.increase(a.UI_STATUS.DRAG),
                    this._contextUndo.keepAllInOne(!0),
                    this._selectionsModule.disable());
                const i = ((e) => {
                    const t = ((e) => {
                        const { type: t, model: i } = e;
                        return t === a.VIEW_TYPE.BRANCH
                            ? `${t}.${Object(s.isFreePositionBranch)(e) ? 'free' : i.type()}`
                            : t;
                    })(e);
                    return I[t];
                })(e);
                this._dragHandler = new i(this._context);
                const n = this._svgView
                    .getCoordinateTransfer()
                    .viewportToMindMap({ x: t.x, y: t.y });
                (Object.assign(this._transferData, {
                    pos: n,
                    dragedView: e,
                    position: n,
                    draggedView: e,
                    selections: this._getFinalDragSelections(e),
                    dropView: null,
                }),
                    window.addEventListener('keydown', this.keyPressHandler),
                    window.addEventListener('keyup', this.keyPressHandler));
                const r =
                    this._dragHandler.dragStart(
                        Object.assign({}, this._transferData)
                    ) || {};
                Object.assign(this._transferData, r);
            }
            keyPressHandler(e) {
                'keydown' !== e.type || 'Escape' !== e.key
                    ? ((this._keyPress = { shiftKey: e.shiftKey }),
                      (this._transferData.keyPress = Object.assign(
                          {},
                          this._keyPress
                      )),
                      this.triggerDragMoving())
                    : this.dragCancel();
            }
            _onDragViewMoving(e) {
                const t = e;
                (Math.abs(this._prePosition.x - t.x) < 10 &&
                    Math.abs(this._prePosition.y - t.y) < 10) ||
                    ((this._prePosition = Object.assign({}, t)),
                    (this._transferData.pos = t),
                    (this._transferData.position = Object.assign({}, t)),
                    (this._transferData.dropView =
                        this._dragHandler.getDragOverView(
                            Object.assign({}, this._transferData)
                        )),
                    (this._transferData.keyPress = Object.assign(
                        {},
                        this._keyPress
                    )),
                    this.triggerDragMoving());
            }
            _onDragViewFinish(e) {
                (this._semaphoreModule.decrease(a.UI_STATUS.DRAG),
                    (this._transferData.pos = e),
                    (this._transferData.position = e),
                    this._dragHandler.dragFinish(this._transferData),
                    this._contextUndo.keepAllInOne(!1),
                    this._reset());
            }
            _reset() {
                (this._selectionsModule.enable(),
                    this.stopListening(this._dragView),
                    (this._dragView = null),
                    (this._transferData = {}),
                    (this._dragHandler = null),
                    (this._keyPress = void 0),
                    (this.originalDragSelections = []),
                    window.removeEventListener('keydown', this.keyPressHandler),
                    window.removeEventListener('keyup', this.keyPressHandler));
            }
            _getFinalDragSelections(e) {
                let t = [...this._dragSelections];
                return (
                    e.type !== a.VIEW_TYPE.BRANCH ||
                    n.a.getClassName(e) === a.CLASS_TYPE.CALLOUT_TOPIC
                        ? (t = [])
                        : -1 === t.indexOf(e) && (t = [e]),
                    t
                );
            }
            preFixOriginalSelections(e) {
                const t = this._getFinalDragSelections(e);
                this._dragSelections.includes(e) ||
                    1 !== t.length ||
                    t[0] !== e ||
                    (this._selectionsModule.selectSingle(e),
                    (this.originalDragSelections = [...t]));
            }
        }
        ((N.identifier = a.MODULE_NAME.DRAG),
            Object.assign(N.prototype, r.Events));
    },
];
