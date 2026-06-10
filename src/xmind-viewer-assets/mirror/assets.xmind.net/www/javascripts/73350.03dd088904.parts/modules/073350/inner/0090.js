export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return c;
        });
        var n = i(18),
            r = i(0),
            o = i(21),
            a = i(17),
            s = i(3),
            l = i(1);
        class c extends o.a {
            constructor(e) {
                (super(),
                    (this.shouldHide = !1),
                    (this.isVisible = !0),
                    (this._isForcedInvisible = !1),
                    (this.endBranch = e),
                    this.parent(this.endBranch),
                    (this.figure = n.a.createFigure(this)),
                    (this.arrowSelector = new l.ArrowSelector(
                        this,
                        this.figure.renderWorker.getContent()
                    )),
                    this.initEventsListener());
            }
            get type() {
                return r.VIEW_TYPE.CONNECTION;
            }
            get figureType() {
                return r.FIGURE_TYPE.CONNECTION;
            }
            get isForcedInvisible() {
                return this._isForcedInvisible;
            }
            set isForcedInvisible(e) {
                this._isForcedInvisible = e;
            }
            parent(e) {
                return void 0 === e ? super.parent() : super.parent(e);
            }
            initEventsListener() {
                const e = this.parent();
                e &&
                    (Object(l.isSummaryBranch)(e)
                        ? this.initSummaryConnectionEventListener()
                        : Object(l.isCalloutBranch)(e)
                          ? this.initCalloutConnectionEventListener()
                          : this.initNormalConnectionEventListener(),
                    this.addAutoRun(() => {
                        this.figure.setLineTapered(this.getLineTapered());
                    }),
                    this.listenTo(e.topicView, 'topicviewboundschange', () => {
                        this.figure.invalidatePaint();
                    }),
                    this.listenTo(e, 'afterRealPosChange', () => {
                        if (
                            (this.figure.invalidatePaint(),
                            Object(l.isSummaryBranch)(e))
                        ) {
                            const t = e.getRealPosition(),
                                i = Object.assign({}, e.position);
                            this.figure.setPosition({
                                x: t.x - i.x,
                                y: t.y - i.y,
                            });
                        }
                    }));
            }
            initSummaryConnectionEventListener() {
                const e = this.parent();
                this.addAutoRun(() => {
                    (this.figure.setLineShape(e.figure.summaryLineShape),
                        this.figure.setLineColor(e.figure.summaryLineColor),
                        this.figure.setLineWidth(e.figure.summaryLineWidth),
                        this.figure.setLinePattern(
                            e.figure.summaryLinePattern
                        ));
                });
            }
            initCalloutConnectionEventListener() {
                const e = this.parent();
                this.addAutoRun(() => {
                    (this.figure.setLineTapered(!0),
                        this.figure.setLineColor(e.topicView.figure.fillColor),
                        this.figure.setLineWidth(e.figure.lineWidth),
                        this.figure.setLinePattern(e.figure.linePattern));
                });
            }
            initNormalConnectionEventListener() {
                const e = this.parent(),
                    t = e.parent();
                t &&
                    t instanceof a.a &&
                    this.addAutoRun(() => {
                        const i = this.getLineTapered(),
                            n = i ? r.ARROW_CLASS.NONE : t.figure.endArrowClass;
                        this.figure.setEndArrowClass(n);
                        const o = t.figure.linePattern,
                            a =
                                i && !Object(l.isHandDrawnLinePattern)(o)
                                    ? r.LINE_PATTERN.SOLID
                                    : o;
                        (this.figure.setLinePattern(a),
                            this.figure.setLineShape(t.figure.lineShape),
                            this.figure.setLineWidth(t.figure.lineWidth),
                            this.figure.setLineColor(e.figure.lineColor),
                            this.figure.setLineTapered(i));
                    });
            }
            getLineShape() {
                return s.a.getStyleValue(
                    this.parent(),
                    r.STYLE_KEYS.LINE_CLASS
                );
            }
            getLineWidth() {
                return parseInt(
                    `${s.a.getStyleValue(this.parent().parent(), r.STYLE_KEYS.LINE_WIDTH) || 1}`
                );
            }
            getLineTapered() {
                var e;
                return (
                    this.getContext().getSheetView().figure.lineTapered ===
                        r.LINETAPERED.TAPERED &&
                    Object(l.isCentralBranch)(
                        null === (e = this.parent()) || void 0 === e
                            ? void 0
                            : e.parent()
                    ) &&
                    !Object(l.isSummaryBranch)(this.parent()) &&
                    !Object(l.isTimeLineMainBranch)(this.parent())
                );
            }
            setPathDirty() {
                (this.figure.invalidatePath(),
                    this.getContext()
                        .getModule(r.MODULE_NAME.SEMAPHORE)
                        .isStatusActive(r.UI_STATUS.FILTER_MODE) &&
                        this.figure.setOpacity(r.FILTER_MODE_OPACITY));
            }
            attr(e) {
                if (arguments.length > 1) throw 'Dont use this way';
                ('0' === e['stroke-width'] &&
                    this.endBranch.model.type() !== r.TOPIC_TYPE.CALLOUT &&
                    (e.d = ''),
                    this.figure.connectionPathAttr(e));
                let t = parseInt(e['stroke-width']);
                return (
                    isNaN(t) ? (t = void 0) : (t += 5),
                    this.figure.connectionSelectBoxAttr(
                        Object.assign({}, e, {
                            'stroke-width': t,
                            opacity: void 0,
                        })
                    ),
                    this
                );
            }
            activate(e) {
                this.figure.connectionSelectBoxAttr({
                    opacity: e ? '0.2' : '0.5',
                });
            }
            deactivate() {
                this.figure.connectionSelectBoxAttr({
                    opacity: '0',
                });
            }
            remove() {
                return (
                    this.stopListening(),
                    this.figure.dispose(),
                    this.arrowSelector.dispose(),
                    this.clearReactions(),
                    this.parent(null),
                    this
                );
            }
            setVisible(e) {
                ((this.isVisible = e),
                    this.figure.setVisible(e && !this._isForcedInvisible));
            }
            getSvg() {
                return this.figure.getContent();
            }
        }
    },
];
