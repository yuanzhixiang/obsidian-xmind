export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return h;
        });
        var n = i(0),
            r = i(15),
            o = i(26),
            a = i.n(o);
        const s = 'mousemove.multiSelect',
            l = 'mouseup.multiSelect',
            c = 'mouseout.multiSelect',
            d = 'mouseleave.multiSelect',
            f = '.multiSelect';
        class h {
            constructor(e) {
                return {
                    start(t, i) {
                        e.config(n.CONFIG.NO_MOUSE_MULTI_SELECT_BOX) ||
                            new p(e).startProcess(t, i);
                    },
                };
            }
        }
        h.identifier = n.MODULE_NAME.MOUSE_BOX_SELECT;
        class p {
            constructor(e) {
                ((this._context = e),
                    (this._svgView = e.getSVGView()),
                    (this._startPosition = { x: 0, y: 0 }),
                    (this.isSegmentMultiSelect = !1),
                    (this._viewPortModule = e.getModule(
                        n.MODULE_NAME.MOVE_VIEW_PORT
                    )),
                    (this._selectionModule = e.getModule(
                        n.MODULE_NAME.SELECTION
                    )),
                    (this._s$multiSelectG = null),
                    (this._s$multiSelectRect = null),
                    (this._eventsCenter = Object.assign({}, a.a.Events)),
                    (this._$mask = this._context.callService(
                        n.SERVICE_NAME.GET_VIEW_PORT_COVER
                    )),
                    (this._isFinish = !1),
                    (this._scale = { scaleX: 1, scaleY: 1 }),
                    (this._hasInitStructure = !1));
            }
            _initSVGStructure() {
                ((this._s$multiSelectG = this._svgView.getMultiSelectG()),
                    (this._s$multiSelectRect = this._s$multiSelectG.rect()),
                    this._s$multiSelectRect
                        .data('name', 'multi-select-box')
                        .style({
                            fill: '#2ebdff',
                            'fill-opacity': '0.1',
                            stroke: '#2ebdff',
                            'stroke-opacity': '0.5',
                            'stroke-width': '1px',
                        })
                        .width(0)
                        .height(0));
            }
            startProcess(e, t) {
                ((this._startPosition = e),
                    (this.isSegmentMultiSelect = t),
                    this._registerEvents());
            }
            _registerEvents() {
                this._svgView.$el.on({
                    [s]: (e) => this._onSVGViewMouseMove(e),
                    [l]: (e) => this._offSVGViewAllMoveEvents(),
                    [c]: (e) => this._offSVGViewAllMoveEvents(),
                });
            }
            _onSVGViewMouseMove(e) {
                this._hasInitStructure ||
                    (this._initSVGStructure(), (this._hasInitStructure = !0));
                if (
                    r.f({ x: e.clientX, y: e.clientY }, this._startPosition) > 3
                ) {
                    this._$mask.show().css('cursor', 'default');
                    const e = this._svgView.$el.offset();
                    (this._s$multiSelectG.translate(
                        this._startPosition.x - e.left,
                        this._startPosition.y - e.top
                    ),
                        this._viewPortModule.setAbleAutoMove(!1),
                        this._selectionModule.setIsSilent(!0),
                        this._$mask.on(s, (e) => {
                            this._onMaskMouseMove(e);
                        }),
                        this._$mask.on(l, (e) => this._onMaskMouseMoveFinish()),
                        this._$mask.on(d, (e) => this._onMaskMouseMoveFinish()),
                        this._eventsCenter.listenTo(
                            this._context,
                            n.EVENTS.VIEW_PORT_MOVING,
                            (e, t) => {
                                const { _s$multiSelectRect: i } = this;
                                (i
                                    .width(i.width() + Math.abs(e))
                                    .height(i.height() + Math.abs(t)),
                                    (this._startPosition.x += e),
                                    (this._startPosition.y += t),
                                    this._svgView.eventBus.trigger(
                                        'selecting.mouseMultiSelect',
                                        this._s$multiSelectRect.rbox(),
                                        this.isSegmentMultiSelect
                                    ));
                            }
                        ));
                }
            }
            _offSVGViewAllMoveEvents() {
                this._svgView.$el.off(f);
            }
            _onMaskMouseMove(e) {
                if (this._isFinish) return;
                const { _startPosition: t } = this;
                if (
                    ((this._scale.scaleX = e.clientX - t.x >= 0 ? 1 : -1),
                    (this._scale.scaleY = e.clientY - t.y >= 0 ? 1 : -1),
                    this._s$multiSelectG.transform(this._scale),
                    this._s$multiSelectRect
                        .width(Math.abs(e.clientX - t.x))
                        .height(Math.abs(e.clientY - t.y)),
                    this._viewPortModule.showMouseInViewPort({
                        x: e.clientX,
                        y: e.clientY,
                    }),
                    this._s$multiSelectRect.parent)
                ) {
                    const e = this._s$multiSelectRect.rbox();
                    this._svgView.eventBus.trigger(
                        'selecting.mouseMultiSelect',
                        e,
                        this.isSegmentMultiSelect
                    );
                }
            }
            _onMaskMouseMoveFinish() {
                (this._eventsCenter.stopListening(),
                    this._viewPortModule.stopMove(),
                    (this._isFinish = !0),
                    this._viewPortModule.setAbleAutoMove(!0),
                    this._selectionModule.setIsSilent(!1),
                    this._selectionModule.notify(),
                    this._s$multiSelectG.clear(),
                    this._$mask.off(f),
                    this._$mask.hide().css('cursor', ''));
            }
        }
    },
];
