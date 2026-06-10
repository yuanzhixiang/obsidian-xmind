export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return c;
        });
        var n = i(26),
            r = i.n(n),
            o = i(12),
            a = i.n(o),
            s = i(0),
            l = i(4);
        class c {
            constructor() {
                this.miniMapView = null;
            }
            initMiniMapView(e, t) {
                this.miniMapView = new T(e, t);
            }
            setMiniMapDisplay(e, t, i) {
                (t || this.miniMapView) &&
                    (!this.miniMapView && this.initMiniMapView(e, i),
                    this.miniMapView.setDisplay(t));
            }
            resetMiniMapUse() {
                this.miniMapView.resetUseTarget();
            }
            remove() {
                this.miniMapView && this.miniMapView.remove();
            }
        }
        c.identifier = s.MODULE_NAME.MINI_MAP;
        const d = 268.8,
            f = 166.4,
            h = {
                width: '336px',
                height: '208px',
                position: 'absolute',
                bottom: '28px',
                right: '28px',
                background: '#fff',
                border: 'solid 4px rgba(255, 255, 255, 0.5)',
                'box-shadow': '0 3px 10px 0 rgba(43, 47, 51, 0.25)',
                'border-radius': '6px',
                cursor: 'pointer',
            },
            p = {
                miniDeltaToMindMapDelta({ deltaX: e, deltaY: t }, i, n) {
                    return {
                        deltaX: (e * n) / i,
                        deltaY: (t * n) / i,
                    };
                },
                mindDeltaToMiniMapDelta({ deltaX: e, deltaY: t }, i, n) {
                    return {
                        deltaX: (e * i) / n,
                        deltaY: (t * i) / n,
                    };
                },
            },
            T = r.a.View.extend({
                initialize(e, t) {
                    ((this.context = e),
                        (this.sheetContainer = e.getSheetView().svg),
                        (this.display = !1),
                        (this.scaleValue = 1),
                        (this.mindMapScaleValue = e.getSVGView().currentScale),
                        (this._sheetView = this.context.getSheetView()),
                        (this.miniMapUpdateTimeClear = null),
                        (this.hasInitViewBox = !1),
                        (this._show = !1),
                        this.initSVGStructure(t),
                        this.initEventsListener());
                },
                initSVGStructure(e = {}) {
                    ((this.$container = a()('<div />')),
                        this.$container.css(h),
                        this.$container.hide());
                    const t = Object(l.a)(document.createElement('svg'));
                    (this.$container.append(t.node),
                        (this.sheetViewUse = new l.a.Use()),
                        this.sheetViewUse.attr({
                            href: `#${this.sheetContainer.id()}`,
                        }),
                        this.updateSheetViewUseTransform(),
                        t.add(this.sheetViewUse),
                        (this.viewBox = new l.a.Rect()
                            .attr({
                                fill: 'none',
                                stroke: '#fb5151',
                                'pointer-events': 'visible',
                            })
                            .radius(4)),
                        t.add(this.viewBox),
                        this.context.$el.parent().append(this.$container),
                        this.updateSheetBackgroundColor());
                },
                initEventsListener() {
                    (this.listenTo(this._sheetView, 'change:bounds', () => {
                        this._show &&
                            this._isEnvNormal() &&
                            (this.clearMiniMapUpdateTimeOut(),
                            this.updateSheetBackgroundColor(),
                            (this.miniMapUpdateTimeClear = setTimeout(() => {
                                (this.updateSheetViewUseTransform(),
                                    this.updateViewBoxSizeAndTransform());
                            }, 500)));
                    }),
                        this.listenTo(
                            this.context,
                            s.EVENTS.VIEW_PORT_MOVING,
                            () => {
                                this._show &&
                                    this._isEnvNormal() &&
                                    setTimeout(() => {
                                        ((this.mindMapScaleValue =
                                            this.context.getSVGView().currentScale),
                                            this.updateViewBoxSizeAndTransform());
                                    }, 0);
                            }
                        ),
                        this.listenTo(
                            this.context,
                            s.EVENTS.SE_OVERRIDE_STYLE_CHANGED,
                            () => {
                                this._show &&
                                    this._isEnvNormal() &&
                                    this.updateSheetBackgroundColor();
                            }
                        ),
                        this.listenTo(
                            this.context,
                            s.EVENTS.AFTER_THEME_CHANGED,
                            () => {
                                this._show &&
                                    this._isEnvNormal() &&
                                    this.updateSheetBackgroundColor();
                            }
                        ),
                        this.$container.on('click', (e) => {
                            const { offsetX: t, offsetY: i } = e,
                                n = this.viewBox.bbox(),
                                { deltaX: r, deltaY: o } =
                                    p.miniDeltaToMindMapDelta(
                                        {
                                            deltaX: t - n.cx,
                                            deltaY: i - n.cy,
                                        },
                                        this.scaleValue,
                                        this.mindMapScaleValue
                                    );
                            this.context
                                .getModule(s.MODULE_NAME.MOVE_VIEW_PORT)
                                .tryToMoveViewPort(-r, -o);
                        }),
                        this.viewBox.on('mousedown', (e) => {
                            new u(this.context).onDragViewBox(
                                e,
                                this.scaleValue
                            );
                        }),
                        this.listenTo(
                            this.context,
                            s.EVENTS.SCALE_CHANGED,
                            () => {
                                this._show &&
                                    this._isEnvNormal() &&
                                    this.onMindMapScaleValueChanged();
                            }
                        ));
                },
                _isEnvNormal() {
                    const { width: e, height: t } = this.context
                        .getSVGView()
                        .getCanvasControl()
                        .getVisibleAreaBounds();
                    return 0 !== e && 0 !== t;
                },
                updateSheetViewUseTransform() {
                    const { width: e, height: t } = this.context
                        .getSVGView()
                        .getCanvasControl()
                        .getVisibleAreaBounds();
                    ((this.scaleValue =
                        1.6153846153846154 < e / t ? d / e : f / t),
                        this.checkScaledSheetViewForScaleValue());
                    const i = (
                        this._sheetView.getActivatedTopBranchView() ||
                        this._sheetView.getCentralBranchView()
                    ).getRealPosition();
                    this.sheetViewUse
                        .translate(
                            168 - i.x * this.scaleValue,
                            104 - i.y * this.scaleValue
                        )
                        .scale(this.scaleValue);
                },
                updateViewBoxSizeAndTransform() {
                    const e = this.scaleValue / this.mindMapScaleValue,
                        { width: t, height: i } = this.context
                            .getSVGView()
                            .getCanvasControl()
                            .getVisibleAreaBounds();
                    let n = Math.abs(e * t),
                        r = Math.abs(e * i);
                    const o = (
                            this._sheetView.getActivatedTopBranchView() ||
                            this._sheetView.getCentralBranchView()
                        ).getRealPosition(),
                        { x: a, y: s } = this.context
                            .getSVGView()
                            .getCoordinateTransfer()
                            .mindMapToVisibleArea(o);
                    let l = 168 - e * a,
                        c = 104 - e * s;
                    (l < 8 && ((n -= 8 - l), (l = 8)),
                        l + n > 328 && ((n -= l + n - 328), (l = 328 - n)),
                        c < 8 && ((r -= 8 - c), (c = 8)),
                        c + r > 200 && ((r -= c + r - 200), (c = 200 - r)),
                        this.viewBox.x(l).y(c),
                        n < 0 || r < 0 || this.viewBox.width(n).height(r));
                },
                updateSheetBackgroundColor() {
                    const e = this.context.getSheetView();
                    if (e) {
                        let t = e.figure.backgroundColor;
                        ('none' === t && (t = '#ffffff'),
                            this.$container.css('background-color', t));
                    }
                },
                checkScaledSheetViewForScaleValue() {
                    const e = this.context.getSheetView().svg.bbox(),
                        t = Math.max(Math.abs(e.x), Math.abs(e.x2)),
                        i = Math.max(Math.abs(e.y), Math.abs(e.y2));
                    (t * this.scaleValue > 134.4 ||
                        i * this.scaleValue > 83.2) &&
                        (this.scaleValue =
                            1.6153846153846154 < t / i ? 134.4 / t : 83.2 / i);
                },
                hasScaledSheetViewOverflow() {
                    const e = this.context.getSheetView().svg.bbox(),
                        t =
                            Math.max(Math.abs(e.x), Math.abs(e.x2)) *
                            this.scaleValue,
                        i =
                            Math.max(Math.abs(e.y), Math.abs(e.y2)) *
                            this.scaleValue;
                    return t > 134.4 || i > 83.2;
                },
                onMindMapScaleValueChanged() {
                    (this.clearMiniMapUpdateTimeOut(),
                        (this.miniMapUpdateTimeClear = setTimeout(() => {
                            ((this.mindMapScaleValue =
                                this.context.getSVGView().currentScale),
                                this.updateViewBoxSizeAndTransform());
                        }, 500)));
                },
                setDisplay(e) {
                    e
                        ? ((this._show = !0),
                          this.$container.show(),
                          this.updateViewBoxSizeAndTransform())
                        : ((this._show = !1), this.$container.hide());
                },
                resetUseTarget() {
                    this.sheetViewUse.attr({ href: '' }).attr({
                        href: `#${this.sheetContainer.id()}`,
                    });
                },
                remove() {
                    (this.$container.remove(), this.stopListening());
                },
                clearMiniMapUpdateTimeOut() {
                    (clearTimeout(this.miniMapUpdateTimeClear),
                        (this.miniMapUpdateTimeClear = null));
                },
            });
        class u {
            constructor(e) {
                ((this.context = e),
                    (this.$dragCover = this.context.callService(
                        s.SERVICE_NAME.GET_VIEW_PORT_COVER
                    )),
                    (this.lastMousePoint = null));
            }
            onDragViewBox(e, t) {
                this.lastMousePoint = {
                    x: e.clientX,
                    y: e.clientY,
                };
                const i = this.context.getSVGView().currentScale;
                let n = !1;
                (this.$dragCover.show().addClass('draging'),
                    this.$dragCover.on('mousemove.drag', (e) => {
                        n = !0;
                        const r = { x: e.clientX, y: e.clientY },
                            o = r.x - this.lastMousePoint.x,
                            a = r.y - this.lastMousePoint.y,
                            { deltaX: l, deltaY: c } =
                                p.miniDeltaToMindMapDelta(
                                    { deltaX: o, deltaY: a },
                                    t,
                                    i
                                );
                        this.context
                            .getModule(s.MODULE_NAME.MOVE_VIEW_PORT)
                            .tryToMoveViewPort(-l, -c) &&
                            (this.lastMousePoint = r);
                    }),
                    this.$dragCover.on('click', (e) => {
                        (n && e.stopPropagation(),
                            this.$dragCover.off('click'));
                    }),
                    this.$dragCover.on('mouseout.drag', () =>
                        this.cancelDragEvent()
                    ),
                    this.$dragCover.on('mouseup.drag', () =>
                        this.cancelDragEvent()
                    ));
            }
            cancelDragEvent() {
                this.$dragCover.off('.drag').hide().removeClass();
            }
        }
    },
];
