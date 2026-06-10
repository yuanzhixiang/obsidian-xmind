export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return f;
        });
        var n = i(18),
            r = i(0),
            o = i(15),
            a = i(43),
            s = i(3),
            l = i(1),
            c = i(14),
            d = i(100);
        class f extends a.a {
            constructor(e, t) {
                (super({ model: e }),
                    (this.moving = !0),
                    (this.bounds = {
                        x: 0,
                        y: 0,
                        width: 0,
                        height: 0,
                    }),
                    (this.position = { x: 0, y: 0 }),
                    (this.isSelected = !1),
                    (this._imageDefaultSize = null),
                    this.parent(t),
                    (this.model = e),
                    (this.figure = n.a.createFigure(this)),
                    this.initSVGStructure(),
                    (this.resizeBox = new d.a(this)),
                    this.resizeBox.parent(this),
                    this.setBounds({
                        x: 0,
                        y: 0,
                        width: 64,
                        height: 64,
                    }),
                    this.setImageUrl(this.model.getSrc()),
                    this.setBorderWidth(this.model.getBorderWidth()),
                    this.setBorderColor(this.model.getBorderColor()),
                    this.setShadowVisible(this.model.getShadowVisible()),
                    this.setLockRatio(this.model.getLockRatio()),
                    this.setIsWebVideoThumbnail(),
                    this.updateBounds(),
                    this.setStaticBackgroundFillColor(),
                    this.initEventsListener());
            }
            get type() {
                return r.VIEW_TYPE.IMAGE;
            }
            get figureType() {
                return r.FIGURE_TYPE.IMAGE;
            }
            initSVGStructure() {
                const e = this.figure.renderWorker;
                ((this.imageGroup = e.svg),
                    (this.loadImage = e.loadImage),
                    (this.image = e.image));
            }
            initEventsListener() {
                var e, t, i;
                (this.listenTo(this.resizeBox, 'resize', (e) => {
                    this.model.resize(e);
                }),
                    this.listenTo(this.model, 'resize', (e) => {
                        var t;
                        (this.resize(e),
                            null === (t = this.parent()) ||
                                void 0 === t ||
                                t.refresh());
                    }),
                    this.listenTo(this.model, 'align', () => {
                        var e;
                        null === (e = this.parent()) ||
                            void 0 === e ||
                            e.refresh();
                    }),
                    this.listenTo(this.model, 'changeOpacity', (e) => {
                        var t;
                        (this.setOpacity(e),
                            null === (t = this.parent()) ||
                                void 0 === t ||
                                t.refresh());
                    }),
                    this.listenTo(this.model, 'changeBorderWidth', (e) => {
                        var t;
                        (this.setBorderWidth(e),
                            null === (t = this.parent()) ||
                                void 0 === t ||
                                t.refresh(),
                            this.setStaticBackgroundFillColor());
                    }),
                    this.listenTo(this.model, 'changeBorderColor', (e) => {
                        var t;
                        (this.setBorderColor(e),
                            null === (t = this.parent()) ||
                                void 0 === t ||
                                t.refresh());
                    }),
                    this.listenTo(this.model, 'changeShadowVisible', (e) => {
                        var t;
                        (this.setShadowVisible(e),
                            null === (t = this.parent()) ||
                                void 0 === t ||
                                t.refresh(),
                            this.setStaticBackgroundFillColor());
                    }),
                    this.listenTo(this.model, 'changeLockRatio', (e) => {
                        var t;
                        (this.setLockRatio(e),
                            null === (t = this.parent()) ||
                                void 0 === t ||
                                t.refresh());
                    }),
                    this.listenTo(this.model, 'changeImageData', () => {
                        (this.setImageUrl(this.model.getSrc()),
                            this.updateBounds());
                    }),
                    this.listenTo(
                        null === (e = this.parent()) || void 0 === e
                            ? void 0
                            : e.model,
                        'changeStyle',
                        (e) => {
                            e === r.STYLE_KEYS.FILL_COLOR &&
                                this.setStaticBackgroundFillColor();
                        }
                    ),
                    this.listenTo(
                        null === (t = this.parent()) || void 0 === t
                            ? void 0
                            : t.model,
                        this.parent().model.modelEvents.WEB_VIDEO_CHANGED,
                        () => {
                            this.setIsWebVideoThumbnail();
                        }
                    ));
                const n =
                    null === (i = this.parent()) || void 0 === i
                        ? void 0
                        : i.getContext().model;
                (this.listenTo(
                    n,
                    'changeStyle',
                    this.setStaticBackgroundFillColor
                ),
                    this.listenTo(
                        n,
                        'addTheme',
                        this.setStaticBackgroundFillColor
                    ),
                    this.listenTo(
                        n,
                        'changeTheme',
                        this.setStaticBackgroundFillColor
                    ),
                    this.listenTo(
                        n,
                        'setStyleObject',
                        this.setStaticBackgroundFillColor
                    ),
                    this.listenTo(
                        this.getContext(),
                        r.EVENTS.AFTER_SHEET_CONTENT_CHANGE,
                        (e) => {
                            if ('boundaries' === e.attr) {
                                let t = this.parent(),
                                    i =
                                        (null == t ? void 0 : t.model) ===
                                        e.target;
                                for (; null == t ? void 0 : t.parent(); )
                                    ((t = null == t ? void 0 : t.parent()),
                                        t &&
                                            t.topicView &&
                                            t.topicView.model === e.target &&
                                            (i = !0));
                                i &&
                                    setTimeout(
                                        () =>
                                            this.setStaticBackgroundFillColor(),
                                        0
                                    );
                            }
                        }
                    ),
                    this.getContext()
                        .afterRender()
                        .then(() => this.setStaticBackgroundFillColor()));
            }
            parent(e) {
                return void 0 === e ? super.parent() : super.parent(e);
            }
            select() {
                var e;
                return (
                    (this.isSelected = !0),
                    null === (e = this.resizeBox) || void 0 === e || e.active(),
                    this
                );
            }
            deselect() {
                var e;
                return (
                    (this.isSelected = !1),
                    null === (e = this.resizeBox) || void 0 === e || e.hide(),
                    this
                );
            }
            getOriginalSize() {
                return Object.assign({}, this.figure.originalSize);
            }
            resize(e) {
                let { width: t, height: i } = e;
                if (void 0 === t || void 0 === i) {
                    if (!this._imageDefaultSize) return;
                    ((t = this._imageDefaultSize.width),
                        (i = this._imageDefaultSize.height));
                }
                const n = { x: 0, y: 0, width: t, height: i };
                this.setBounds(n);
            }
            setImageDefaultSize(e) {
                this._imageDefaultSize = e;
            }
            selientlyModifySize(e, t) {
                if (!this.getContext() || !this.getContext().model) return;
                const i = this.getContext().model.getUndo();
                (i.setRecordState(!1),
                    this.model.resize({ width: e, height: t }),
                    i.setRecordState(!0));
            }
            setBounds(e) {
                var t, i;
                this.bounds = {
                    x: e.x,
                    y: e.y,
                    width: e.width,
                    height: e.height,
                };
                const n = this.model.getBorderWidth();
                (n > 0 &&
                    ((this.bounds.width += 2 * n),
                    (this.bounds.height += 2 * n)),
                    this.calcBorderPath(this.bounds),
                    this.figure.setSize(Object.assign({}, e)),
                    null === (t = this.resizeBox) ||
                        void 0 === t ||
                        t.size(e.width, e.height),
                    null === (i = this.resizeBox) ||
                        void 0 === i ||
                        i.translate(e.x + n / 2, e.x + n / 2));
            }
            refreshBounds() {
                const { width: e, height: t } = this.figure.size;
                e &&
                    t &&
                    this.setBounds({
                        x: 0,
                        y: 0,
                        width: e,
                        height: t,
                    });
            }
            calcBorderPath(e) {
                const t = this.model.getBorderWidth(),
                    i = `M ${e.x} ${e.y}L ${e.x + e.width - t} ${e.y}L ${e.x + e.width - t} ${e.y + e.height - t}L ${e.x} ${e.y + e.height - t}Z`;
                this.setBorderPath(i);
            }
            setImageUrl(e) {
                this.figure.setImageUrl(e);
            }
            setOpacity(e) {
                this.figure.setOpacity(e);
            }
            setBorderPath(e) {
                this.figure.setBorderPath(e);
            }
            setBorderColor(e) {
                this.figure.setBorderColor(e);
            }
            setBorderWidth(e) {
                (this.refreshBounds(), this.figure.setBorderWidth(e || 0));
            }
            setShadowVisible(e) {
                this.figure.setShadowVisible(e);
            }
            setLockRatio(e) {
                var t;
                (this.figure.setLockRatio(e),
                    null === (t = this.resizeBox) ||
                        void 0 === t ||
                        t.setLockRatio(e));
            }
            setIsWebVideoThumbnail() {
                var e;
                this.figure.setIsWebVideoThumbnail(
                    !!(null === (e = this.parent()) || void 0 === e
                        ? void 0
                        : e.model.getWebVideoOriginalUrl())
                );
            }
            setStaticBackgroundFillColor() {
                var e, t, i;
                if (!this.parent()) return;
                const n = this.figure.shadowVisible,
                    o = this.figure.borderWidth > 0;
                if (!n && !o) return;
                const a =
                    null === (e = this.parent()) || void 0 === e
                        ? void 0
                        : e.figure.fillColor;
                let c = 'none';
                if (
                    !Object(l.isTreeTableCell)(
                        null === (t = this.parent()) || void 0 === t
                            ? void 0
                            : t.parent()
                    )
                )
                    try {
                        const e = /^\#[0-9a-fA-F]{8}$/,
                            t = this.getContext().getSheetView(),
                            n = s.a.getStyleValue(t, r.STYLE_KEYS.FILL_COLOR),
                            { snowballUtil: o } = Object(l.getInjectModule)(
                                r.MODULE_NAME.SNOWBALL
                            ),
                            d = Object(l.getAllContainedBoundaries)(
                                null === (i = this.parent()) || void 0 === i
                                    ? void 0
                                    : i.parent()
                            ).reverse();
                        if (((c = n), a && 'none' !== a && !e.test(a))) c = a;
                        else if (
                            (d.length &&
                                d.forEach((e) => {
                                    const t = s.a.getStyleValue(
                                            e,
                                            r.STYLE_KEYS.FILL_COLOR
                                        ),
                                        i = s.a.getStyleValue(
                                            e,
                                            r.STYLE_KEYS.OPACITY
                                        ),
                                        n = o.hexStringToRgbObject(t),
                                        a = o.hexStringToRgbObject(c);
                                    ((n.a = parseFloat(i)),
                                        (c = o.blendingColor(n, a)));
                                }),
                            a && 'none' !== a)
                        ) {
                            const e = o.hexStringToRgbObject(a),
                                t = o.hexStringToRgbObject(c);
                            c = o.blendingColor(e, t);
                        }
                    } catch (e) {
                        c = a;
                    }
                this.figure.setStaticBackgroundFillColor(c);
            }
            updateBounds() {
                const e = this.model.getWidth(),
                    t = this.model.getHeight();
                e &&
                    t &&
                    this.setBounds({
                        x: 0,
                        y: 0,
                        width: e,
                        height: t,
                    });
            }
            renderBase64(e) {}
            remove() {
                (this.stopListening(), this.figure.dispose());
                const e = this.parent(),
                    t = null == e ? void 0 : e.editDomain();
                return (
                    t &&
                        t.selectionManager &&
                        t.selectionManager.removeFromSelection(this),
                    t && t.model2View && delete t.model2View[this.model.id],
                    this.resizeBox &&
                        (this.resizeBox.remove(), (this.resizeBox = null)),
                    this.parent(null),
                    this
                );
            }
            move(e, t) {
                return (
                    (e === this.position.x && t === this.position.y) ||
                        (this.figure.setPosition({ x: e, y: t }),
                        (this.position.x = e),
                        (this.position.y = t),
                        this.trigger(
                            'change:position',
                            Object.assign({}, this.position),
                            this
                        )),
                    this
                );
            }
            getSvg() {
                return this.imageGroup;
            }
            getSize() {
                return {
                    width: this.model.getWidth() || -1,
                    height: this.model.getHeight() || -1,
                };
            }
            getResizeMinWidth() {
                return 30;
            }
            getRealPosition() {
                const e = Object.assign({}, this.position),
                    t = this.parent(),
                    i = null == t ? void 0 : t.parent(),
                    n = i && Object(l.getTopicShape)(i),
                    r = null == t ? void 0 : t.contentBounds,
                    o = null == i ? void 0 : i.getRealPosition();
                r && o && ((e.x += o.x + r.x), (e.y += o.y + r.y));
                const a = this.model.getBorderWidth();
                if (
                    (a && ((e.x += a), (e.y += a)),
                    n && n.getRealContentAreaOffset)
                ) {
                    const { x: t, y: r } = n.getRealContentAreaOffset(i);
                    ((e.x += t), (e.y += r));
                }
                return e;
            }
            createDragView() {
                const e = c.a.cloneImage(this),
                    t = this.getRealPosition();
                return (e.move(t.x, t.y), e);
            }
            getClientRect() {
                const { bounds: e } = this,
                    t = o.b(this.getRealPosition(), e),
                    i = this.editDomain()
                        .getCoordinateTransfer()
                        .mindMapToViewport(t);
                return Object.assign(Object.assign({}, e), i);
            }
        }
        Object(l.wrapReadOnly)(f, ['select', 'onMouseover']);
    },
];
