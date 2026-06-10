export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return u;
        });
        var n = i(0),
            r = i(20),
            o = i(1),
            a = i(9),
            s = i(30),
            l = i(18),
            c = i(21);
        const { EXT_RADIUS: d, COL_RADIUS: f } = a.a,
            h = Math.max(d, f),
            p = {
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontSize: 10,
                fontWeight: 300,
            },
            T = {
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontSize: 12,
                fontWeight: 500,
            };
        class u extends c.a {
            constructor(e) {
                (super({ model: e }),
                    (this.bounds = {
                        x: 0,
                        y: 0,
                        width: 0,
                        height: 0,
                    }),
                    (this._hide = !1),
                    (this.model = e),
                    (this.figure = l.a.createFigure(this)),
                    this.initEventsListener());
            }
            get type() {
                return n.VIEW_TYPE.COLLAPSE_EXTEND;
            }
            get figureType() {
                return n.FIGURE_TYPE.COLLAPSE_EXTEND;
            }
            initEventsListener() {
                (this.listenTo(this.model, 'change:branch', () => {
                    this.render();
                }),
                    this.listenTo(
                        this.model,
                        n.EVENTS.SE_BRANCH_COLLAPSE_TOGGLE,
                        (e) => {
                            var t;
                            const i = this.parent();
                            null === (t = this.getContext()) ||
                                void 0 === t ||
                                t.trigger(n.EVENTS.SE_BRANCH_COLLAPSE_TOGGLE, [
                                    {
                                        target: i,
                                        oldValue: !e,
                                        newValue: e,
                                    },
                                ]);
                        }
                    ));
            }
            afterAncestorChange() {
                var e;
                super.afterAncestorChange();
                (null === (e = this.parent()) || void 0 === e
                    ? void 0
                    : e.parent()) &&
                    (this.addAutoRun(() => {
                        this.refreshBackground();
                    }),
                    this.addAutoRun(() => {
                        var e, t;
                        this.setLineColor(
                            null ===
                                (t =
                                    null === (e = this.parent()) || void 0 === e
                                        ? void 0
                                        : e.parent()) || void 0 === t
                                ? void 0
                                : t.figure.lineColor
                        );
                    }),
                    this.addAutoRun(() => {
                        var e, t, i;
                        this.setLineWidth(
                            null !==
                                (i =
                                    null ===
                                        (t =
                                            null === (e = this.parent()) ||
                                            void 0 === e
                                                ? void 0
                                                : e.parent()) || void 0 === t
                                        ? void 0
                                        : t.figure.lineWidth) && void 0 !== i
                                ? i
                                : 0
                        );
                    }));
            }
            parent(e) {
                return void 0 === e ? super.parent() : super.parent(e);
            }
            render() {
                if (this.isHide())
                    return (this.figure.setCollapseExtendVisible(!1), this);
                this.figure.setCollapseExtendVisible(!0);
                return (
                    this.model.isCollapse()
                        ? this._renderExtBtn()
                        : this._renderFoldBtn(),
                    this.refreshStyles(),
                    this
                );
            }
            refreshStyles() {}
            refreshBackground() {
                var e, t;
                const i =
                    null ===
                        (t =
                            null === (e = this.parent()) || void 0 === e
                                ? void 0
                                : e.parent()) || void 0 === t
                        ? void 0
                        : t.backGroundCellBranchView;
                if (i && i.topicView && !Object(o.isTreeTableHeadBranch)(i))
                    this.figure.setBackgroundColor(
                        i.topicView.figure.visualFillColor
                    );
                else {
                    if (!this.getContext()) return;
                    const e =
                            this.getContext().getSheetView().figure
                                .backgroundColor,
                        { snowballUtil: t } = Object(o.getInjectModule)(
                            n.MODULE_NAME.SNOWBALL
                        );
                    this.figure.setBackgroundColor(
                        t.blendingColor(e, n.VISUAL_BACK_COLOR)
                    );
                }
            }
            _renderExtBtn() {
                var e, t;
                (this.setCollapseState(!0),
                    this.figure.setHoverAreaVisible(!1),
                    this.figure.setCollapseBtnVisible(!1));
                const i =
                    null === (e = this.parent()) || void 0 === e
                        ? void 0
                        : e.parent();
                if (!i) return;
                const n =
                    null == i ? void 0 : i.model.getDescendantList().length;
                let r, a;
                (n > 99 ? ((r = '···'), (a = T)) : ((r = n + ''), (a = p)),
                    this.figure.setText(r),
                    this.figure.setTextFontObj({
                        'font-size':
                            null !== (t = a.fontSize) && void 0 !== t ? t : 0,
                        'font-family': a.fontFamily,
                        'font-weight': a.fontWeight,
                    }));
                const { width: s, height: l } = Object(o.getTextSize)(r, a),
                    c = (2 * d - s) / 2,
                    f = d - l + 0.5;
                this.figure.setTextTranslatePosition({
                    x: c,
                    y: f,
                });
            }
            _renderFoldBtn() {
                var e, t, i;
                this.setCollapseState(!1);
                const r =
                    this.config(n.CONFIG.HIDE_COLLAPSE_BTN) ||
                    (null ===
                        (t =
                            null === (e = this.parent()) || void 0 === e
                                ? void 0
                                : e.parent()) || void 0 === t
                        ? void 0
                        : t.isUnableShowCollapseBtn());
                if ((this.figure.setHoverAreaVisible(!r), r))
                    this.figure.setCollapseBtnVisible(!1, !0);
                else {
                    this.renderHoverArea();
                    const e =
                        null === (i = this.parent()) || void 0 === i
                            ? void 0
                            : i.parent();
                    e && this.figure.setCollapseBtnVisible(e.isSelected);
                }
            }
            setCollapseState(e) {
                if (
                    (this.figure.setCollapseState(e),
                    this.figure.isCollapsedDirty && !e)
                ) {
                    if (
                        !this.getContext()
                            .getActiveUIStatus()
                            .includes(n.UI_STATUS.DRAG)
                    )
                        return;
                    r.a.work(r.b.PRIORITY.AFTER_EACH, {
                        execute: () => {
                            var e;
                            const t =
                                null === (e = this.parent()) || void 0 === e
                                    ? void 0
                                    : e.parent();
                            if (t) {
                                const e = [t],
                                    i = [
                                        n.TOPIC_TYPE.ATTACHED,
                                        n.TOPIC_TYPE.SUMMARY,
                                        n.TOPIC_TYPE.DETACHED,
                                        n.TOPIC_TYPE.CALLOUT,
                                    ];
                                (e.push(...t.getDescendantBranchesByType(...i)),
                                    e.forEach((e) => {
                                        e.updatePolygon();
                                    }));
                            }
                        },
                    });
                }
            }
            renderHoverArea() {
                var e;
                const t =
                    null === (e = this.parent()) || void 0 === e
                        ? void 0
                        : e.parent();
                if (!t) return;
                const i = t.topicView.shapeBounds,
                    r = Object(s.a)(t.getStructureClass()),
                    o =
                        a.a.TOPIC_SELECTBOX_PADDING +
                        a.a.TOPIC_SELECTBOX_STROKE_WIDTH,
                    l = r.calcSpacingMajor(t) - o,
                    c = r.getSourceOrientation();
                let d, f, h, p;
                (c === n.DIRECTION.RIGHT
                    ? ((d = i.width / 2 + o),
                      (f = -i.height / 2),
                      (h = i.height),
                      (p = l))
                    : c === n.DIRECTION.LEFT
                      ? ((d = -i.width / 2 - l - o),
                        (f = -i.height / 2),
                        (h = i.height),
                        (p = l))
                      : c === n.DIRECTION.UP
                        ? ((d = -i.width / 2),
                          (f = -i.height / 2 - l - o),
                          (h = l),
                          (p = i.width))
                        : c === n.DIRECTION.DOWN &&
                          ((d = -i.width / 2),
                          (f = i.height / 2 + o),
                          (h = l),
                          (p = i.width)),
                    this.figure.setHoverAreaAttr({
                        x: d,
                        y: f,
                        height: h,
                        width: p,
                    }));
            }
            setLineColor(e) {
                const { snowballUtil: t } = Object(o.getInjectModule)(
                        n.MODULE_NAME.SNOWBALL
                    ),
                    i = t.hexStringToRgbObject(e);
                (0 === i.a && delete i.a,
                    this.figure.setLineColor(t.rgbObjectToHexString(i)));
            }
            setLineWidth(e) {
                this.figure.setLineWidth(Math.max(0, e));
            }
            move(e, t) {
                this.figure.setPosition({ x: e, y: t });
                const i = 2 * h;
                this.bounds = { x: e, y: t, width: i, height: i };
            }
            drawConnection(e) {
                this.figure.setConnectPathAttr(e);
            }
            show() {
                this.model.canCollapse() &&
                    !this.config(n.CONFIG.HIDE_COLLAPSE_BTN) &&
                    (this.figure.setCollapseExtendVisible(!0),
                    (this._hide = !1));
            }
            hide() {
                (this.figure.setCollapseExtendVisible(!1), (this._hide = !0));
            }
            isHide() {
                return this._hide;
            }
            hover() {
                var e, t;
                this.isHide() ||
                    this.model.isCollapse() ||
                    this.config(n.CONFIG.HIDE_COLLAPSE_BTN) ||
                    (null ===
                        (t =
                            null === (e = this.parent()) || void 0 === e
                                ? void 0
                                : e.parent()) || void 0 === t
                        ? void 0
                        : t.isUnableShowCollapseBtn()) ||
                    this.figure.setCollapseBtnVisible(!0);
            }
            dehover() {
                this.isHide() ||
                    this.model.isCollapse() ||
                    this.figure.setCollapseBtnVisible(!1);
            }
            remove() {
                return (
                    this.stopListening(),
                    this.figure.dispose(),
                    this.clearReactions(),
                    this.parent(null),
                    this
                );
            }
        }
    },
];
