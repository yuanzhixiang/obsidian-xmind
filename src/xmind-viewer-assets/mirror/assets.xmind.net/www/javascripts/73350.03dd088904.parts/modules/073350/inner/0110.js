export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return s;
        });
        var n = i(0),
            r = i(18),
            o = i(21),
            a = i(1);
        class s extends o.a {
            constructor(e) {
                (super(),
                    (this._treeTableHeadBranchView = null),
                    (this.isVisible = !0),
                    this.parent(e),
                    (this.figure = r.a.createFigure(this)),
                    this._setTreeTableHeadBranchView(),
                    this.refreshTreeTableRealPosition(),
                    this._initEventListener(),
                    e.setProxy(this));
            }
            get type() {
                return n.VIEW_TYPE.TREE_TABLE_CELL;
            }
            get figureType() {
                return n.FIGURE_TYPE.TREE_TABLE_CELL;
            }
            parent(e) {
                return void 0 === e ? super.parent() : super.parent(e);
            }
            setVisible(e) {
                ((this.isVisible = e),
                    this.figure.setVisible(e && !this.isForcedInvisible));
                const t = this.parent();
                Object(a.isTreeTableHeadBranch)(t) &&
                    t.topicView.refreshStyles();
            }
            updateCellSizeByEditing(e) {
                const t = this.getParentLayoutInfo();
                if (!t) return;
                const {
                        cellHeight: i,
                        cellWidth: n,
                        cellX: r,
                        cellY: o,
                    } = t.externalInfo,
                    { borderLineWidth: s } = this.figure,
                    l = Object.assign({}, t.topicBounds),
                    c =
                        Math.abs(r) -
                        l.width / 2 +
                        e.width +
                        s / 2 +
                        a.layoutConstant.TREE_TABLE_CELL_PADDING_HORIZON,
                    d =
                        Math.abs(o) -
                        l.height / 2 +
                        e.height +
                        s / 2 +
                        a.layoutConstant.TREE_TABLE_CELL_PADDING_VERTICAL,
                    f = Math.max(c, n),
                    h = Math.max(d, i);
                this.figure.setSize({ width: f, height: h });
            }
            _setTreeTableHeadBranchView() {
                const e = Object(a.getTreeTableHeadBranchView)(this.parent());
                e !== this._treeTableHeadBranchView &&
                    (this._treeTableHeadBranchView &&
                        this._treeTableHeadBranchView !== this.parent() &&
                        this.stopListening(this._treeTableHeadBranchView.model),
                    (this._treeTableHeadBranchView = e),
                    this._initEventListenerAboutTreeTableHeadBranch());
            }
            _initEventListenerAboutTreeTableHeadBranch() {
                this._treeTableHeadBranchView &&
                    (this.addAutoRun(() => {
                        this._treeTableHeadBranchView &&
                            (this.refreshTreeTableBorderLineColor(),
                            this.refreshTreeTableBorderLineWidth());
                    }),
                    this.addAutoRun(() => {
                        this._treeTableHeadBranchView &&
                            this.figure.setBorderLinePattern(
                                Object(a.getUnDashableLinePattern)(
                                    this._treeTableHeadBranchView.topicView
                                        .figure.borderLinePattern
                                )
                            );
                    }));
            }
            _initEventListener() {
                const e = this.parent();
                if (!e) return;
                (this.listenTo(e, 'afterlayoutInfoUpdate', () => {
                    (this._setTreeTableHeadBranchView(),
                        this.refreshCellSize(),
                        this.refreshCellBoundsPosition());
                }),
                    this.listenTo(e, 'afterRealPosChange', () => {
                        this.refreshTreeTableRealPosition();
                    }),
                    this.listenTo(e.model, 'addTopic removeTopic', () => {
                        this.parent().topicView.refreshTextAlign();
                    }),
                    this.listenTo(e, 'refreshView', () => {
                        let t;
                        (Object(a.isTreeTableHeadBranch)(e)
                            ? ((t = e.shouldCollapse() || e.shouldHide()),
                              t
                                  ? this.parent().deleteProxy(this)
                                  : this.parent().setProxy(this))
                            : (t = e.shouldHide()),
                            this.setVisible(!t));
                    }));
                const t = e.topicView.figure;
                this.addAutoRun(() => {
                    (this.figure.setFillColor(t.originalFillColor),
                        this.figure.setFillPattern(t.fillPattern));
                });
            }
            getParentLayoutInfo() {
                var e;
                return this.parent().getLayoutInfo(
                    null === (e = this._treeTableHeadBranchView) || void 0 === e
                        ? void 0
                        : e.getStructureClass()
                );
            }
            refreshCellSize() {
                const e = this.getParentLayoutInfo();
                e &&
                    this.figure.setSize({
                        width: e.externalInfo.cellWidth,
                        height: e.externalInfo.cellHeight,
                    });
            }
            getRealPosition() {
                var e;
                const t = this.parent(),
                    i =
                        null === (e = this._treeTableHeadBranchView) ||
                        void 0 === e
                            ? void 0
                            : e.getStructureClass(),
                    { x: n, y: r } = t.getRealPosition(),
                    {
                        cellX: o,
                        cellY: a,
                        cellWidth: s,
                        cellHeight: l,
                    } = t.getLayoutInfo(i).externalInfo;
                return { x: n + o + s / 2, y: r + a + l / 2 };
            }
            getChildrenCellSize() {
                var e, t, i;
                const n = this.parent().getChildrenBranchesByType(),
                    r =
                        null === (e = this._treeTableHeadBranchView) ||
                        void 0 === e
                            ? void 0
                            : e.getStructureClass();
                return {
                    width:
                        null !==
                            (i =
                                null === (t = n[0]) || void 0 === t
                                    ? void 0
                                    : t.getLayoutInfo(r).bounds.width) &&
                        void 0 !== i
                            ? i
                            : 0,
                    height: n.reduce(
                        (e, t) => e + t.getLayoutInfo(r).bounds.height,
                        0
                    ),
                };
            }
            refreshCellBoundsPosition() {
                const e = this.getParentLayoutInfo();
                e &&
                    this.figure.setCellBoundsPosition({
                        x: e.externalInfo.cellX,
                        y: e.externalInfo.cellY,
                    });
            }
            refreshTreeTableRealPosition() {
                const e = this.parent().getRealPosition();
                e && this.figure.setPosition(e);
            }
            refreshTreeTableBorderLineColor() {
                this._treeTableHeadBranchView &&
                    this.figure.setBorderLineColor(
                        this._treeTableHeadBranchView.topicView.figure
                            .borderColor
                    );
            }
            refreshTreeTableBorderLineWidth() {
                this._treeTableHeadBranchView &&
                    this.figure.setBorderLineWidth(
                        this._treeTableHeadBranchView.topicView.figure
                            .borderWidth
                    );
            }
            getNextEventTarget() {
                return this.parent().figure.renderWorker.getContent().node;
            }
            getTreeTableHeadBranchViewId() {
                var e;
                return null === (e = this._treeTableHeadBranchView) ||
                    void 0 === e
                    ? void 0
                    : e.model.getId();
            }
            remove() {
                return (
                    this.figure.dispose(),
                    this.stopListening(),
                    this.clearReactions(),
                    this.parent().deleteProxy(this),
                    this.parent(null),
                    this
                );
            }
            displayHover() {
                var e;
                (this.figure.setSelectBoxAttr({
                    display: 'block',
                    stroke: 'rgb(154, 213, 255)',
                }),
                    null === (e = this.parent().collapseExtendView) ||
                        void 0 === e ||
                        e.hover());
            }
            displayDehover() {
                var e;
                (this.figure.setSelectBoxAttr({ display: 'none' }),
                    null === (e = this.parent().collapseExtendView) ||
                        void 0 === e ||
                        e.dehover());
            }
            displaySelect() {
                var e;
                (this.figure.setSelectBoxAttr({
                    display: 'block',
                    stroke: 'rgb(94, 187, 254)',
                }),
                    null === (e = this.parent().collapseExtendView) ||
                        void 0 === e ||
                        e.hover());
            }
            displayDeselect() {
                var e;
                (this.figure.setSelectBoxAttr({ display: 'none' }),
                    null === (e = this.parent().collapseExtendView) ||
                        void 0 === e ||
                        e.dehover());
            }
            displayDeFocus() {
                this.figure.setSelectBoxAttr({
                    display: 'block',
                    stroke: '#9f9f9f',
                });
            }
        }
    },
];
