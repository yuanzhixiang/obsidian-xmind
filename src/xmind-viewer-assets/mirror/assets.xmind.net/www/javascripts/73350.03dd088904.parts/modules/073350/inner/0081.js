export default [
    function (e, t, i) {
        'use strict';
        (function (e) {
            var n = i(156),
                r = i(124),
                o = i(0),
                a = i(147),
                s = i(20),
                l = i(34),
                c = i(96),
                d = i(152),
                f = i(63),
                h = i(12),
                p = i.n(h),
                T = i(6),
                u = i.n(T),
                g = i(126),
                Q = i(128),
                m = i(70),
                b = i(11),
                C = i(1),
                L = i(104),
                y = i(105),
                M = i(3);
            const A = u.a.invert(o.EVENTS),
                v = {},
                E = c.a.extend(
                    {
                        events: {},
                        initialize(t = {}) {
                            if (((this.removableCallback = []), !t.el))
                                throw new Error(
                                    'must indicate el argument in Editor initialization'
                                );
                            (E.__super__.initialize.bind(this)(t),
                                (this._option = Object.assign({}, t)),
                                (this._$rootContainer = p()(
                                    "<div class='sb-container'></div>"
                                ).css({ position: 'relative' })),
                                (this._$svgContainer = p()(
                                    "<div class='mm-editor'></div>"
                                )
                                    .appendTo(this._$rootContainer)
                                    .css({
                                        width: '100%',
                                        height: '100%',
                                        position: 'relative',
                                    })),
                                'skip' === e.env.SELECT_BOX &&
                                    this._$svgContainer.attr(
                                        'data-immunity',
                                        'ecg'
                                    ),
                                (this._$appToolsContainer = p()(
                                    "<div class='app-tools-container'></div>"
                                )
                                    .appendTo(this._$rootContainer)
                                    .css({
                                        position: 'absolute',
                                        left: '0px',
                                        top: '0px',
                                    })),
                                t.scrollContainer
                                    ? (this._scrollContainer =
                                          t.scrollContainer)
                                    : (this.$el.css({
                                          overflow: 'scroll',
                                      }),
                                      (this._scrollContainer = this.$el[0])),
                                this.config(o.CONFIG.NO_VIEW_PORT_MOVE) &&
                                    this.setScrollDisable(),
                                this.$el.append(this._$rootContainer),
                                this.$el.attr('tabindex', '-1'),
                                this.$el.css({ outline: 'none' }),
                                (this._eventManager = new g.a({
                                    el: this._$rootContainer[0],
                                    platform: this.config(o.CONFIG.PLATFORM),
                                })),
                                (this._onGesture = this._onEvent =
                                    this._eventManager.on),
                                (this._offGesture = this._offEvent =
                                    this._eventManager.off),
                                (this._serviceMap = Object(Q.a)(this)),
                                (this._deferedEventArgsMap = {}),
                                (this._isInitRenderingCompleted = !1),
                                (this._currentTemporaryColorTheme = null),
                                _.call(this),
                                (this._actions = Object(a.a)(this)),
                                (this.model =
                                    this._option.sheetModel || this.model),
                                this.model.setTextTranslator(
                                    this.getTranslatedText.bind(this)
                                ),
                                this.initEventsListener(),
                                (this.themeExporter = new r.a(this)),
                                this.initTemporaryColorThemeInOldThemeFiles(),
                                this.model.getCompactLayoutModeLevel() ===
                                    o.COMPACT_LAYOUT_MODE_LEVEL.Second &&
                                    this.getModule(
                                        o.MODULE_NAME.OVERRIDE_STYLE
                                    ).insertOverrideStyle(
                                        o.STYLE_DESCRIPTOR_FOR_COMPACT_MODE_ID,
                                        L.a
                                    ),
                                this.model.getHandDrawnModeActive() &&
                                    this.getModule(
                                        o.MODULE_NAME.OVERRIDE_STYLE
                                    ).insertOverrideStyle(
                                        o.STYLE_DESCRIPTOR_FOR_HAND_DRAWN_ID,
                                        y.a
                                    ));
                        },
                        initEventsListener() {
                            (this.listenTo(this.model, 'all', (...e) => {
                                e[0] in A && this.trigger(...e);
                            }),
                                this.listenTo(
                                    this.model,
                                    o.EVENTS.AFTER_SHEET_CONTENT_CHANGE,
                                    u.a.debounce(() => {
                                        this.trigger(
                                            o.EVENTS.AFTER_MODIFY_STATUS_CHANGE
                                        );
                                    }, 0)
                                ),
                                this.on(
                                    o.EVENTS.AFTER_UI_STATUS_ACTIVATE,
                                    (e) => {
                                        e === o.UI_STATUS.DE_FOCUS &&
                                            this._setAllSelectionFocusStatus(
                                                !0
                                            );
                                    }
                                ),
                                this.on(
                                    o.EVENTS.AFTER_UI_STATUS_DEACTIVATE,
                                    (e) => {
                                        e === o.UI_STATUS.DE_FOCUS &&
                                            this._setAllSelectionFocusStatus(
                                                !1
                                            );
                                    }
                                ),
                                this.on(o.EVENTS.SCALE_CHANGED, () => {
                                    const e = this.getModule(
                                        o.MODULE_NAME.EDIT_RECEIVER
                                    );
                                    e && e.repairPosition();
                                }),
                                this.on(
                                    o.EVENTS.COMPACT_LAYOUT_MODE_LEVEL_CHANGED,
                                    () => {
                                        this.model.getCompactLayoutModeLevel() ===
                                        o.COMPACT_LAYOUT_MODE_LEVEL.Second
                                            ? this.activateOverridedStyle(
                                                  o.STYLE_DESCRIPTOR_FOR_COMPACT_MODE_ID,
                                                  L.a
                                              )
                                            : this.deactivateOverridedStyle(
                                                  o.STYLE_DESCRIPTOR_FOR_COMPACT_MODE_ID
                                              );
                                    }
                                ),
                                this.on(
                                    o.EVENTS.HAND_DRAWN_MODE_ACTIVE_CHANGED,
                                    () => {
                                        this.model.getHandDrawnModeActive()
                                            ? this.activateOverridedStyle(
                                                  o.STYLE_DESCRIPTOR_FOR_HAND_DRAWN_ID,
                                                  y.a
                                              )
                                            : this.deactivateOverridedStyle(
                                                  o.STYLE_DESCRIPTOR_FOR_HAND_DRAWN_ID
                                              );
                                    }
                                ),
                                this.isDoughnutPlatform() &&
                                    document.addEventListener(
                                        'touchmove',
                                        () => {},
                                        { passive: !1 }
                                    ));
                        },
                        _setAllSelectionFocusStatus(e) {
                            const t = this.getModule(
                                    o.MODULE_NAME.SELECTION
                                ).getSelections(),
                                i = [
                                    o.VIEW_TYPE.BRANCH,
                                    o.VIEW_TYPE.BOUNDARY,
                                    o.VIEW_TYPE.RELATIONSHIP,
                                ];
                            t.forEach((t) => {
                                if (i.includes(t.type)) {
                                    t.isDeFocus = e;
                                    const i = t.getProxy ? t.getProxy() : t;
                                    e ? i.displayDeFocus() : i.displaySelect();
                                }
                            });
                        },
                        getScrollContainer() {
                            return this._scrollContainer;
                        },
                        _preventDefault(e) {
                            e.preventDefault();
                        },
                        onGesture(e, t, i) {
                            this._onGesture(e, t, i);
                        },
                        offGesture(e, t, i) {
                            this._offGesture(e, t, i);
                        },
                        onEvent(e, t, i) {
                            this._onEvent(e, t, i);
                        },
                        offEvent(e, t, i) {
                            this._offEvent(e, t, i);
                        },
                        getOuterDOM() {
                            return this.el;
                        },
                        getRootDOM() {
                            return this._$rootContainer[0];
                        },
                        getAppToolsContainer() {
                            return this._$appToolsContainer;
                        },
                        getSVGContainer() {
                            return this._$svgContainer;
                        },
                        getSheetBoundsInViewport() {
                            const e = this.getSheetView().bounds,
                                t = this.getSVGView().getCoordinateTransfer(),
                                i = t.mindMapToViewport({
                                    x: e.x,
                                    y: e.y,
                                }),
                                n = t.mindMapToViewport({
                                    x: e.width + e.x,
                                    y: e.height + e.y,
                                });
                            return {
                                x: i.x,
                                y: i.y,
                                width: n.x - i.x,
                                height: n.y - i.y,
                            };
                        },
                        initInnerView() {
                            if (!this.model) return;
                            const e = new d.a(this, this._$svgContainer[0]);
                            this._svgView = e;
                            const t = new f.a(this.model);
                            (e.content(t),
                                this.trigger(o.EVENTS.SHEET_CONTENT_LOADED),
                                this.afterRender().then(() => {
                                    this._isInitRenderingCompleted = !0;
                                }));
                        },
                        afterRender() {
                            return new Promise((e) => {
                                s.a.work(l.b.AFTER_RENDER, {
                                    execute() {
                                        e();
                                    },
                                });
                            });
                        },
                        getSVGView() {
                            return this._svgView;
                        },
                        getSheetModel() {
                            return this.model;
                        },
                        getSheetView() {
                            return this._svgView.content();
                        },
                        isSheetModified() {
                            return this.getModule(
                                o.MODULE_NAME.MODIFY_CHECK
                            ).checkIsModified();
                        },
                        updateBaseUndoIndex() {
                            (this.getModule(
                                o.MODULE_NAME.MODIFY_CHECK
                            ).updateBaseIndex(),
                                this.trigger(
                                    o.EVENTS.AFTER_MODIFY_STATUS_CHANGE
                                ));
                        },
                        getModule(e) {
                            const t = this._moduleMap[e.toLowerCase()];
                            return (
                                void 0 === t &&
                                    this.config(o.CONFIG.LOGGER).warn(
                                        'unknown module: ' + e
                                    ),
                                t
                            );
                        },
                        callService(e, ...t) {
                            return this._serviceMap[e].apply(this, t);
                        },
                        execAction(e, t) {
                            const i = this.findOwnAction(e);
                            if (
                                i &&
                                i.queryStatus(t) === o.ACTION_STATUS.NORMAL
                            )
                                return i.execute(t);
                        },
                        queryActionStatus(e, t) {
                            const i = this.findOwnAction(e);
                            return i
                                ? i.queryStatus(t)
                                : o.ACTION_STATUS.DISABLE;
                        },
                        findOwnAction(e) {
                            return this._actions[e];
                        },
                        getChildEditors() {
                            return null;
                        },
                        getTranslatedText(e) {
                            const t = this.config(o.CONFIG.LANGUAGE);
                            return m.a.translate(t, e);
                        },
                        getActiveUIStatus() {
                            const e = this.getModule(o.MODULE_NAME.SEMAPHORE);
                            return e ? e.getActiveUIStatus() : [];
                        },
                        _remove() {
                            this.removableCallback.forEach((e) => {
                                e();
                            });
                        },
                        remove() {
                            this.getSVGView().remove();
                            const e = this.getModule(o.MODULE_NAME.MINI_MAP);
                            (e && e.remove(),
                                this.$el.remove(),
                                this.stopListening());
                        },
                        isShowFashionStyle() {
                            const e = this.config(o.CONFIG.INFO_ITEM_STYLE);
                            return (
                                e === o.INFO_ITEM_STYLE_TYPE.FASHION ||
                                (e !== o.INFO_ITEM_STYLE_TYPE.CLASSIC &&
                                    e !== o.INFO_ITEM_STYLE_TYPE.ACC_TO_JSON &&
                                    void 0)
                            );
                        },
                        getContentBound() {
                            return this.getSheetView().bounds;
                        },
                        exportImage(e = {}) {
                            return n.a.export(this, e);
                        },
                        exportTheme(e) {
                            return this.themeExporter.export(e);
                        },
                        getThemeDataToCombine() {
                            var e, t;
                            const i =
                                null !==
                                    (t =
                                        null === (e = this.model.theme()) ||
                                        void 0 === e
                                            ? void 0
                                            : e.toJSON()) && void 0 !== t
                                    ? t
                                    : {};
                            return i.colorThemeId || i.skeletonThemeId
                                ? i
                                : this.exportTheme();
                        },
                        exportMathJaxSVG(e, t) {
                            const i = this.config(o.CONFIG.LANGUAGE);
                            return C.mathJaxExporterUtil.export(e, {
                                lang: i,
                                fontFamily: t.fontFamily,
                            });
                        },
                        activateOverridedStyle(e, t, i) {
                            (this.getModule(
                                o.MODULE_NAME.OVERRIDE_STYLE
                            ).insertOverrideStyle(e, t, i),
                                this.getSheetView().refreshStyles(),
                                this.trigger(
                                    o.EVENTS.SE_OVERRIDE_STYLE_CHANGED
                                ));
                        },
                        deactivateOverridedStyle(e) {
                            (this.getModule(
                                o.MODULE_NAME.OVERRIDE_STYLE
                            ).removeOverrideStyle(e),
                                this.getSheetView().refreshStyles(),
                                this.trigger(
                                    o.EVENTS.SE_OVERRIDE_STYLE_CHANGED
                                ));
                        },
                        getSelections() {
                            const e = this.getModule('selectionmanager');
                            return e ? e.selections.slice() : [];
                        },
                        getComponentViewById(e) {
                            return this.getSVGView().model2View[e];
                        },
                        getZoomPencentage() {
                            return this.getSVGView().getScale();
                        },
                        isHibernating() {
                            return this._isHibernating;
                        },
                        hibernate(e) {
                            ((this._isHibernating = e), s.a.work());
                        },
                        getTransform() {
                            return u.a.pick(
                                this.getSVGView().container.transform(),
                                'x',
                                'y',
                                'scaleX',
                                'scaleY'
                            );
                        },
                        isReadOnly() {
                            return !0 === this.config(o.CONFIG.READONLY);
                        },
                        setScrollDisable() {
                            this.getScrollContainer().style.overflow = 'hidden';
                        },
                        setScrollEnable() {
                            this.getScrollContainer().style.overflow = 'scroll';
                        },
                        isDoughnutPlatform() {
                            return (
                                this.config(o.CONFIG.PLATFORM) ===
                                o.PLATFORMS.DOUGHNUT
                            );
                        },
                        isBrowniePlatform() {
                            return (
                                this.config(o.CONFIG.PLATFORM) ===
                                o.PLATFORMS.BROWNIE
                            );
                        },
                        isVanaPlatform() {
                            return (
                                this.config(o.CONFIG.PLATFORM) ===
                                o.PLATFORMS.VANA
                            );
                        },
                        isPuffPlatform() {
                            return (
                                this.config(o.CONFIG.PLATFORM) ===
                                o.PLATFORMS.PUFF
                            );
                        },
                        isPuffMacPlatform() {
                            return (
                                this.config(o.CONFIG.PLATFORM) ===
                                o.PLATFORMS.PUFFMAC
                            );
                        },
                        isMobileAppPlatform() {
                            return (
                                this.isPuffPlatform() ||
                                this.isBrowniePlatform() ||
                                this.isDoughnutPlatform()
                            );
                        },
                        isMobilePlatform() {
                            return (
                                this.isPuffPlatform() ||
                                this.isBrowniePlatform() ||
                                this.isDoughnutPlatform() ||
                                b.a.isMobile
                            );
                        },
                        isAlignmentByLevelMode() {
                            return (
                                M.a.getStyleValue(
                                    this.getSheetView().getCentralBranchView(),
                                    o.STYLE_KEYS.ALIGNMENT_BY_LEVEL
                                ) === o.ALIGNMENT_BY_LEVEL_STATUS.ACTIVED
                            );
                        },
                        getDoughnutExportInfo() {
                            const e = Object.assign(
                                    {},
                                    window.DonutExportInfo || {}
                                ),
                                t = this.getSVGView().getDeviceNativeScale();
                            return (
                                [
                                    'footerHeight',
                                    'headerHeight',
                                    'softKeyboardHeight',
                                    'toolbarHeight',
                                ].forEach((i) => {
                                    e[i] = e[i] ? e[i] / t : 0;
                                }),
                                e
                            );
                        },
                        getDragEventClientPosition(e) {
                            let t, i;
                            if (
                                (i ||
                                    ((this.isMobilePlatform() ||
                                        e.type.includes('touch')) &&
                                        (i = !0)),
                                i && (e.changedTouches || e.changedPointers))
                            ) {
                                t = (e.changedTouches || e.changedPointers)[0];
                            } else t = e;
                            let n = { x: t.clientX, y: t.clientY };
                            if (this.isDoughnutPlatform()) {
                                const e =
                                    this.getSVGView().getDeviceNativeScale();
                                n = {
                                    x: t.screenX / e,
                                    y:
                                        t.screenY / e -
                                        this.getDoughnutExportInfo()
                                            .headerHeight,
                                };
                            }
                            return n;
                        },
                        isInitRenderingCompleted() {
                            return this._isInitRenderingCompleted;
                        },
                        initTemporaryColorThemeInOldThemeFiles() {
                            this.afterRender().then(() => {
                                if (!this.model.theme().getColorThemeId()) {
                                    const e = this.exportTheme({
                                        toColorTheme: !0,
                                    });
                                    (Object(C.getInjectModule)(
                                        o.MODULE_NAME.SNOWBALL
                                    ).addCustomColorThemes([e]),
                                        (this._currentTemporaryColorTheme = e));
                                }
                            });
                        },
                        getCurrentTemporaryColorTheme() {
                            return this._currentTemporaryColorTheme;
                        },
                        getFileRealResource(e) {
                            return C.combineResourceString(
                                this.config(o.CONFIG.URL_PREFIX),
                                e
                            );
                        },
                        getSheetGeometryStatus() {
                            return Object.assign(
                                Object.assign(
                                    {},
                                    this.getSVGView()
                                        .getCoordinateTransfer()
                                        .mindMapToVisibleArea({
                                            x: 0,
                                            y: 0,
                                        })
                                ),
                                {
                                    scale: this.getSVGView().getScale(),
                                }
                            );
                        },
                        restoreSheetGeometryStatus(e) {
                            const t = this.getSheetGeometryStatus(),
                                [i, n] = [e.x - t.x, e.y - t.y];
                            (t.scale !== e.scale &&
                                this.execAction(o.ACTION_NAMES.ZOOM, {
                                    scale: e.scale,
                                }),
                                (i || n) &&
                                    this.execAction(
                                        o.ACTION_NAMES.MOVE_VIEWPORT,
                                        { deltaX: i, deltaY: n }
                                    ));
                        },
                    },
                    {
                        registerModule: function (e) {
                            if (!e.identifier)
                                throw new Error("a module haven't name");
                            v[e.identifier.toLowerCase()] = e;
                        },
                    }
                );
            function _() {
                this._moduleMap = {};
                for (const e in v) {
                    const t = v[e];
                    this._moduleMap[t.identifier.toLowerCase()] = new t(this);
                }
            }
            t.a = E;
        }).call(this, i(45));
    },
];
