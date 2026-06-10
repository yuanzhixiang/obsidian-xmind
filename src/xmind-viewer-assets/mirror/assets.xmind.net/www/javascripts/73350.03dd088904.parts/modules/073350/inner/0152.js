export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return _;
        });
        var n = i(4),
            r = i(11),
            o = i(0),
            a = i(21),
            s = i(12),
            l = i.n(s),
            c = i(26),
            d = i.n(c);
        var f = class {
                constructor(e = -0.005) {
                    ((this.friction = e),
                        (this.posArr = []),
                        (this.timestampArr = []),
                        (this.raf = null));
                }
                init(e) {
                    ((this.posArr = []),
                        (this.timestampArr = []),
                        (this.raf = null));
                }
                setMovingPos(e) {
                    (this.posArr.push(e),
                        this.timestampArr.push(Date.now()),
                        this.timestampArr.length > 6 &&
                            (this.timestampArr.shift(), this.posArr.shift()));
                }
                auto(e) {
                    this.cb = e;
                    const t = this.timestampArr.length;
                    if (0 === t) return;
                    const i = this.posArr[t - 1],
                        n = this.posArr[0],
                        r = this.timestampArr[t - 1] - this.timestampArr[0],
                        o = i.x - n.x,
                        a = i.y - n.y;
                    this._inertia(
                        Date.now(),
                        Math.abs(o) / r,
                        o > 0 ? 1 : -1,
                        i.x,
                        Math.abs(a) / r,
                        a > 0 ? 1 : -1,
                        i.y
                    );
                }
                _inertia(e, t, i, n, r, o, a) {
                    this.raf = requestAnimationFrame(() => {
                        const s = Date.now(),
                            l = s - e;
                        let c = 0,
                            d = 0,
                            f = !0;
                        ((t += this.friction * l),
                            (r += this.friction * l),
                            t > 0 && ((f = !1), (c = i * t * l)),
                            r > 0 && ((f = !1), (d = o * r * l)),
                            this.cb(c, d),
                            !f &&
                                this.raf &&
                                this._inertia(s, t, i, n + c, r, o, a + d));
                    });
                }
            },
            h = i(1);
        const p = 'viewport',
            T = 'visibleArea',
            u = 'enlargedArea';
        var g = class {
            constructor(e, t) {
                ((this._mindMapOriginPositionGetter = e),
                    (this._mindMapScaleGetter = t));
            }
            mindMapToViewport(e) {
                const t = this._mindMapOriginPositionGetter(p),
                    i = this._mindMapScaleGetter();
                return { x: e.x * i + t.x, y: e.y * i + t.y };
            }
            viewportToMindMap(e) {
                const t = this._mindMapOriginPositionGetter(p),
                    i = Object(h.relativePositionFor)(e, t),
                    n = this._mindMapScaleGetter();
                return { x: i.x / n, y: i.y / n };
            }
            mindMapToVisibleArea(e) {
                const t = this._mindMapOriginPositionGetter(T),
                    i = this._mindMapScaleGetter();
                return { x: e.x * i + t.x, y: e.y * i + t.y };
            }
            visibleAreaToMindMap(e) {
                const t = this._mindMapOriginPositionGetter(T),
                    i = Object(h.relativePositionFor)(e, t),
                    n = this._mindMapScaleGetter();
                return { x: i.x / n, y: i.y / n };
            }
            mindMapToEnlargedArea(e) {
                const t = this._mindMapOriginPositionGetter(u),
                    i = this._mindMapScaleGetter();
                return { x: e.x * i + t.x, y: e.y * i + t.y };
            }
            enlargedAreaToMindMap(e) {
                const t = this._mindMapOriginPositionGetter(u),
                    i = Object(h.relativePositionFor)(e, t),
                    n = this._mindMapScaleGetter();
                return { x: i.x / n, y: i.y / n };
            }
            visibleAreaToViewport(e) {
                return this.mindMapToViewport(this.visibleAreaToMindMap(e));
            }
            viewportToVisibleArea(e) {
                return this.mindMapToVisibleArea(this.viewportToMindMap(e));
            }
        };
        const Q = 100;
        var m = class {
            constructor(e) {
                ((this._lastMindMapOriginPositionInVisibleArea = null),
                    (this._scrollCenterVisiblePosition = {
                        x: 0,
                        y: 0,
                    }),
                    (this._lastScrollCenterRealPositionInVisibleArea = {
                        x: 0,
                        y: 0,
                    }),
                    (this._lastScrollCenterVisiblePositionInMindMap = {
                        x: 0,
                        y: 0,
                    }),
                    (this._svgView = e),
                    (this._context = e.getContext()),
                    (this._paddingFactor = this._context.config(
                        o.CONFIG.PADDING_FACTOR
                    )),
                    (this._sbContainer = this._context.getRootDOM()),
                    this._context.getScrollContainer() === document.body &&
                    document.scrollingElement
                        ? (this._scrollContainer = document.scrollingElement)
                        : (this._scrollContainer =
                              this._context.getScrollContainer()),
                    (this._coordinateTransfer = new g(
                        (e) => this._genMindMapOriginPosition(e),
                        () => this._getSheetContentScale()
                    )),
                    (this._scrollContainerBounds = {
                        x: 0,
                        y: 0,
                        width: 0,
                        height: 0,
                    }),
                    (this._visibleAreaBounds = {
                        x: 0,
                        y: 0,
                        width: 0,
                        height: 0,
                    }),
                    (this._lastScrollLeft = this._scrollContainer.scrollLeft),
                    (this._lastScrollTop = this._scrollContainer.scrollTop),
                    this._initEventListener());
            }
            _genMindMapOriginPosition(e) {
                const t = this.getSheetContentTranslate(),
                    i = {
                        x: t.x - this._lastScrollLeft,
                        y: t.y - this._lastScrollTop,
                    },
                    n = {
                        x: i.x + this._visibleAreaBounds.x,
                        y: i.y + this._visibleAreaBounds.y,
                    },
                    r = {
                        x:
                            t.x -
                            this._lastScrollLeft +
                            this._scrollContainerBounds.x,
                        y:
                            t.y -
                            this._lastScrollTop +
                            this._scrollContainerBounds.y,
                    };
                switch (e) {
                    case 'viewport':
                        return n;
                    case 'visibleArea':
                        return i;
                    case 'enlargedArea':
                        return t;
                    case 'scrollContainer':
                        return r;
                }
            }
            _initEventListener() {
                (this._scrollContainer.addEventListener('mousewheel', (e) => {
                    if (Object(h.isToScaleByWheelEvent)(e))
                        return e.preventDefault();
                    !Object(h.browserIsMac)() &&
                        e.shiftKey &&
                        0 === Math.abs(e.deltaX) &&
                        (e.preventDefault(), this._scroll(-e.deltaY, 0));
                }),
                    this._svgView.on(
                        this._svgView.lifeCycleEvents.contentMount,
                        (e) => {
                            var t;
                            const i =
                                    this._scrollContainer.getBoundingClientRect(),
                                n = {
                                    x: i.left,
                                    y: i.top,
                                    width: this._scrollContainer.clientWidth,
                                    height: this._scrollContainer.clientHeight,
                                },
                                r = this._svgView.getDeviceNativeScale(),
                                o = {
                                    x: n.x,
                                    y: n.y,
                                    width: n.width / r,
                                    height: n.height / r,
                                };
                            (this._context.isMobileAppPlatform() &&
                                ((o.x = 0), (o.y = 0)),
                                this.setVisibleAreaBounds(o),
                                this.setScrollContainerBounds(n, e),
                                null === (t = this._svgView.content()) ||
                                    void 0 === t ||
                                    t.on('change:bounds', () => {
                                        this._updateSBContainerSize(e);
                                    }));
                        }
                    ),
                    this._context.on(o.EVENTS.SELECTION_CHANGED, () => {
                        this._lastScrollCenterRealPositionInVisibleArea =
                            this._getLastScrollCenterRealPositionInVisibleArea();
                    }),
                    this._svgView.on(
                        this._svgView.lifeCycleEvents.scaleChanged,
                        (e, t) => {
                            (this._updateSBContainerSizeByScale(),
                                t
                                    ? this._reFocusVisiblePositionScrollCenter()
                                    : this._reFocusRealPositionScrollCenter());
                        }
                    ),
                    window.addEventListener('mousemove', (e) => {
                        ((this._scrollCenterVisiblePosition =
                            this._coordinateTransfer.viewportToVisibleArea({
                                x: e.clientX,
                                y: e.clientY,
                            })),
                            (this._lastScrollCenterVisiblePositionInMindMap =
                                this._getLastScrollCenterVisiblePositionInMindMap()));
                    }));
                (this._context.config(o.CONFIG.NO_LISTEN_RESIZE) ||
                    window.addEventListener('resize', () => {
                        const e = this._scrollContainer.getBoundingClientRect(),
                            t = {
                                x: e.left,
                                y: e.top,
                                width: this._scrollContainer.clientWidth,
                                height: this._scrollContainer.clientHeight,
                            },
                            i = this._svgView.getDeviceNativeScale(),
                            n = {
                                x: t.x,
                                y: t.y,
                                width: t.width / i,
                                height: t.height / i,
                            };
                        (this._context.isMobileAppPlatform() &&
                            ((n.x = 0), (n.y = 0)),
                            this.setVisibleAreaBounds(n),
                            this.setScrollContainerBounds(t));
                    }),
                    this._initScrollListener());
            }
            _initScrollListener() {
                ('body' ===
                this._context.getScrollContainer().tagName.toLowerCase()
                    ? document
                    : this._scrollContainer
                ).addEventListener('scroll', () => {
                    const e = this._scrollContainer.scrollLeft,
                        t = this._scrollContainer.scrollTop,
                        i = this._lastScrollLeft - e,
                        n = this._lastScrollTop - t;
                    ((this._lastScrollLeft = e),
                        (this._lastScrollTop = t),
                        (this._lastMindMapOriginPositionInVisibleArea =
                            this._genMindMapOriginPosition('visibleArea')),
                        (this._lastScrollCenterRealPositionInVisibleArea =
                            this._getLastScrollCenterRealPositionInVisibleArea()),
                        (this._lastScrollCenterVisiblePositionInMindMap =
                            this._getLastScrollCenterVisiblePositionInMindMap()),
                        this._context.trigger(o.EVENTS.VIEW_PORT_MOVING, i, n));
                });
            }
            center(e, t = {}) {
                const i = this.getVisibleAreaBounds(),
                    n = this._coordinateTransfer.mindMapToViewport(e),
                    r = i.x + i.width / 2 - n.x,
                    o = i.y + i.height / 2 - n.y;
                (this._scroll(r, o, t),
                    (this._lastScrollLeft = this._lastScrollLeft - r),
                    (this._lastScrollTop = this._lastScrollTop - o),
                    (this._lastMindMapOriginPositionInVisibleArea =
                        this._genMindMapOriginPosition('visibleArea')));
            }
            restorePosition(e, t = {}) {
                const i = this._coordinateTransfer.mindMapToEnlargedArea({
                        x: 0,
                        y: 0,
                    }),
                    [n, r] = [e.x - i.x, e.y - i.y];
                (this._scroll(n, r, t),
                    (this._lastScrollLeft = this._lastScrollLeft - n),
                    (this._lastScrollTop = this._lastScrollTop - r),
                    (this._lastMindMapOriginPositionInVisibleArea =
                        this._genMindMapOriginPosition('visibleArea')));
            }
            _scroll(e, t, i = {}) {
                if (i.animate) {
                    const n = this._lastScrollTop,
                        r = this._lastScrollLeft;
                    let o = 0,
                        a = !1;
                    const s = () => {
                        ((o += 0.05), o >= 1 && ((o = 1), (a = !0)));
                        const l = Math.sqrt(2 * o - o * o),
                            c = e * l,
                            d = t * l;
                        ((this._scrollContainer.scrollTop = n - d),
                            (this._scrollContainer.scrollLeft = r - c),
                            window.requestAnimationFrame(
                                a ? () => i.finishToRun && i.finishToRun() : s
                            ));
                    };
                    window.requestAnimationFrame(s);
                } else
                    ((this._scrollContainer.scrollLeft =
                        this._lastScrollLeft - e),
                        (this._scrollContainer.scrollTop =
                            this._lastScrollTop - t),
                        window.requestAnimationFrame(
                            () => i.finishToRun && i.finishToRun()
                        ));
            }
            move(e, t, i = {}) {
                this._scroll(e, t, i);
            }
            scrollTo(e, t) {
                ((this._scrollContainer.scrollLeft = e),
                    (this._scrollContainer.scrollTop = t));
            }
            fitMap() {
                const e = this._scrollContainerBounds.width,
                    t = this._scrollContainerBounds.height,
                    i = this._getSheetContentBounds(),
                    n = Math.min((e - 20) / i.width, (t - 20) / i.height, 2);
                (this._svgView.setScale(100 * n),
                    this.center({
                        x: i.x + i.width / 2,
                        y: i.y + i.height / 2,
                    }),
                    (this._lastScrollCenterRealPositionInVisibleArea =
                        this._getLastScrollCenterRealPositionInVisibleArea()));
            }
            getCoordinateTransfer() {
                return this._coordinateTransfer;
            }
            setScrollContainerBounds(e, t = {}) {
                (this._scrollContainerBounds.width !== e.width ||
                    this._scrollContainerBounds.height !== e.height ||
                    this._scrollContainerBounds.x !== e.x ||
                    this._scrollContainerBounds.y !== e.y) &&
                    (Object.assign(this._scrollContainerBounds, {
                        x: e.x,
                        y: e.y,
                        width: e.width,
                        height: e.height,
                    }),
                    this._updateSBContainerSize(t));
            }
            getScrollContainerBounds() {
                return Object.assign({}, this._scrollContainerBounds);
            }
            setVisibleAreaBounds(e) {
                Object.assign(this._visibleAreaBounds, {
                    x: e.x,
                    y: e.y,
                    width: e.width,
                    height: e.height,
                });
            }
            getVisibleAreaBounds() {
                return Object.assign({}, this._visibleAreaBounds);
            }
            _needResetScroll(e, t) {
                const i = this._getPaddingHorizon(),
                    n = this._getPaddingVertical(),
                    r = this.getVisibleAreaBounds(),
                    o = this._getSheetContentBounds(),
                    a = this._getSheetContentScale(),
                    s = this._getSBContainerSize();
                let l = !1;
                const c = Math.max(0, i - r.width + Q),
                    d = Math.min(s.width, o.width * a + i - Q),
                    f = Math.max(0, n - r.height + Q),
                    h = Math.min(s.height, o.height * a + n - Q);
                return (
                    e < c
                        ? ((this._lastScrollLeft =
                              this._scrollContainer.scrollLeft =
                                  c),
                          (l = !0))
                        : e > d &&
                          ((this._lastScrollLeft =
                              this._scrollContainer.scrollLeft =
                                  d),
                          (l = !0)),
                    t < f
                        ? ((this._lastScrollTop =
                              this._scrollContainer.scrollTop =
                                  f),
                          (l = !0))
                        : t > h &&
                          ((this._lastScrollTop =
                              this._scrollContainer.scrollTop =
                                  h),
                          (l = !0)),
                    l
                );
            }
            _updateSBContainerSize(e = {}) {
                const t = this._getSBContainerSize();
                ((this._sbContainer.style.width = t.width + 'px'),
                    (this._sbContainer.style.height = t.height + 'px'));
                const i = this.getSheetContentTranslate();
                if (
                    (this._svgView.container.translate(i.x, i.y),
                    this._lastMindMapOriginPositionInVisibleArea)
                ) {
                    const e = this._genMindMapOriginPosition('visibleArea'),
                        t =
                            this._lastMindMapOriginPositionInVisibleArea.x -
                            e.x,
                        i =
                            this._lastMindMapOriginPositionInVisibleArea.y -
                            e.y;
                    (this._scroll(t, i),
                        (this._lastScrollLeft = this._lastScrollLeft - t),
                        (this._lastScrollTop = this._lastScrollTop - i),
                        (this._lastMindMapOriginPositionInVisibleArea =
                            this._genMindMapOriginPosition('visibleArea')));
                }
            }
            _updateSBContainerSizeByScale() {
                const e = this._getSBContainerSize();
                ((this._sbContainer.style.width = e.width + 'px'),
                    (this._sbContainer.style.height = e.height + 'px'));
                const t = this.getSheetContentTranslate();
                this._svgView.container.translate(t.x, t.y);
            }
            _reFocusRealPositionScrollCenter() {
                const e = this._getLastScrollCenterRealPositionInVisibleArea(),
                    t = this._lastScrollCenterRealPositionInVisibleArea.x - e.x,
                    i = this._lastScrollCenterRealPositionInVisibleArea.y - e.y;
                (this._scroll(t, i),
                    (this._lastScrollLeft = this._lastScrollLeft - t),
                    (this._lastScrollTop = this._lastScrollTop - i),
                    (this._lastScrollCenterRealPositionInVisibleArea =
                        this._getLastScrollCenterRealPositionInVisibleArea()));
            }
            _reFocusVisiblePositionScrollCenter() {
                const e = this._getLastScrollCenterVisiblePositionInMindMap(),
                    t =
                        (e.x -
                            this._lastScrollCenterVisiblePositionInMindMap.x) *
                        this._getSheetContentScale(),
                    i =
                        (e.y -
                            this._lastScrollCenterVisiblePositionInMindMap.y) *
                        this._getSheetContentScale();
                (this._scroll(t, i),
                    (this._lastScrollLeft = this._lastScrollLeft - t),
                    (this._lastScrollTop = this._lastScrollTop - i),
                    (this._lastScrollCenterVisiblePositionInMindMap =
                        this._getLastScrollCenterVisiblePositionInMindMap()));
            }
            _getLastScrollCenterRealPositionInVisibleArea() {
                const e = this._context
                        .getModule(o.MODULE_NAME.SELECTION)
                        .getSelections(),
                    t = this._context.getSheetView(),
                    i =
                        t.getActivatedTopBranchView() ||
                        t.getCentralBranchView(),
                    n = 1 !== e.length ? i : e[0];
                let r;
                switch (n.type) {
                    case o.VIEW_TYPE.BOUNDARY: {
                        const e = n.figure;
                        r = {
                            x: e.position.x + e.size.width / 2,
                            y: e.position.y + e.size.height / 2,
                        };
                        break;
                    }
                    case o.VIEW_TYPE.IMAGE:
                        r = n.parent().parent().getRealPosition();
                        break;
                    case o.VIEW_TYPE.RELATIONSHIP:
                        r = Object.assign({}, n.titleView.figure.textPosition);
                        break;
                    default:
                        r = n.getRealPosition
                            ? n.getRealPosition()
                            : { x: 0, y: 0 };
                }
                return this._coordinateTransfer.mindMapToVisibleArea(r);
            }
            _getLastScrollCenterVisiblePositionInMindMap() {
                return this._coordinateTransfer.visibleAreaToMindMap(
                    this._scrollCenterVisiblePosition
                );
            }
            _getSBContainerSize() {
                const e = this._getPaddingHorizon(),
                    t = this._getPaddingVertical(),
                    i = this._getSheetContentBounds(),
                    n = this._getSheetContentScale();
                return {
                    width: i.width * n + 2 * e,
                    height: i.height * n + 2 * t,
                };
            }
            _getPaddingHorizon() {
                return (
                    (this._context.isMobilePlatform()
                        ? Math.max(
                              this._scrollContainerBounds.width,
                              this._scrollContainerBounds.height
                          )
                        : this._scrollContainerBounds.width) *
                        this._paddingFactor -
                    Q
                );
            }
            _getPaddingVertical() {
                return (
                    (this._context.isMobilePlatform()
                        ? Math.max(
                              this._scrollContainerBounds.width,
                              this._scrollContainerBounds.height
                          )
                        : this._scrollContainerBounds.height) *
                        this._paddingFactor -
                    Q
                );
            }
            _getSheetContentBounds() {
                const e = this._context.getSheetView().bounds;
                return {
                    x: e.x,
                    y: e.y,
                    width: e.width,
                    height: e.height,
                };
            }
            _getSheetContentScale() {
                return this._svgView.getScale() / 100;
            }
            getSheetContentTranslate() {
                const e = this._getSheetContentBounds(),
                    t = this._getSheetContentScale();
                return {
                    x: this._getPaddingHorizon() - e.x * t,
                    y: this._getPaddingVertical() - e.y * t,
                };
            }
        };
        var b = class extends m {
                constructor(e) {
                    (super(e),
                        (this._currentScrollLeft = null),
                        (this._currentScrollTop = null));
                }
                _genMindMapOriginPosition(e) {
                    const t = this.getSheetContentTranslate(),
                        i = {
                            x: t.x - this.getCurrentScrollLeft(),
                            y: t.y - this.getCurrentScrollTop(),
                        },
                        n = {
                            x: i.x + this._visibleAreaBounds.x,
                            y: i.y + this._visibleAreaBounds.y,
                        },
                        r = {
                            x:
                                t.x -
                                this.getCurrentScrollLeft() +
                                this._scrollContainerBounds.x,
                            y:
                                t.y -
                                this.getCurrentScrollTop() +
                                this._scrollContainerBounds.y,
                        };
                    switch (e) {
                        case 'viewport':
                            return n;
                        case 'visibleArea':
                            return i;
                        case 'enlargedArea':
                            return t;
                        case 'scrollContainer':
                            return r;
                    }
                }
                _initScrollListener() {
                    let e = this._context.isDoughnutPlatform()
                            ? window.DonutExportInfo.scrollLeft
                            : this._scrollContainer.scrollLeft,
                        t = this._context.isDoughnutPlatform()
                            ? window.DonutExportInfo.scrollTop
                            : this._scrollContainer.scrollTop;
                    ((this._currentScrollLeft = e),
                        (this._currentScrollTop = t));
                    const i =
                            'html' ===
                            this._scrollContainer.tagName.toLowerCase()
                                ? document
                                : this._scrollContainer,
                        n = () => {
                            const i = this._scrollContainer.scrollLeft,
                                n = this._scrollContainer.scrollTop,
                                r = e - i,
                                a = t - n;
                            ((e = i),
                                (t = n),
                                (this._lastMindMapOriginPositionInVisibleArea =
                                    this._genMindMapOriginPosition(
                                        'visibleArea'
                                    )),
                                this._context.trigger(
                                    o.EVENTS.VIEW_PORT_MOVING,
                                    r,
                                    a
                                ),
                                (this._currentScrollLeft = i),
                                (this._currentScrollTop = n));
                        };
                    this._context.isDoughnutPlatform()
                        ? window.addEventListener('donutscroll', n)
                        : i.addEventListener('scroll', n);
                }
                _scroll(e, t, i = {}) {
                    if (i.animate) {
                        const n = this._scrollContainer.scrollTop,
                            r = this._scrollContainer.scrollLeft;
                        let o = 0,
                            a = !1;
                        const s = () => {
                            ((o += 0.05), o >= 1 && ((o = 1), (a = !0)));
                            const l = Math.sqrt(2 * o - o * o),
                                c = e * l,
                                d = t * l;
                            ((this._scrollContainer.scrollTop = n - d),
                                (this._scrollContainer.scrollLeft = r - c),
                                window.requestAnimationFrame(
                                    a
                                        ? () => i.finishToRun && i.finishToRun()
                                        : s
                                ));
                        };
                        window.requestAnimationFrame(s);
                    } else
                        ((this._scrollContainer.scrollLeft -= e),
                            (this._scrollContainer.scrollTop -= t),
                            window.requestAnimationFrame(
                                () => i.finishToRun && i.finishToRun()
                            ));
                }
                getCurrentScrollLeft() {
                    return (
                        this._context.getDoughnutExportInfo().scrollLeft ||
                        this._scrollContainer.scrollLeft
                    );
                }
                getCurrentScrollTop() {
                    return (
                        this._context.getDoughnutExportInfo().scrollTop ||
                        this._scrollContainer.scrollTop
                    );
                }
            },
            C = i(20),
            L = i(34);
        class y {
            constructor(e) {
                ((this._undoGroupToSelectionsMap = new Map()),
                    (this._redoGroupToSelectionsMap = new Map()),
                    (this._context = e),
                    (this._undoManager = this._context.model.getUndo()),
                    (this._selectionManager = this._context.getModule(
                        o.MODULE_NAME.SELECTION
                    )),
                    this._undoManager.on(
                        this._undoManager.NEW_GROUP_STAND_BY_EVENT,
                        () => {
                            this._saveSelectionStates();
                        }
                    ),
                    this._undoManager.on(
                        this._undoManager.GROUP_RESTORE_EVENT,
                        (e, t) => {
                            this._restoreSelectionStates(e, t);
                        }
                    ));
            }
            _saveSelectionStates() {
                (this._saveUndoGroupSelectionStates(),
                    this._saveRedoGroupSelectionStates());
            }
            _saveUndoGroupSelectionStates() {
                const e = this._undoManager.getLastGroup();
                if (!e) return;
                let t;
                const i = this._getSelectionForBindModelAction(e);
                if (i.length) t = i;
                else {
                    const i = this._selectionManager
                        .getSelections()
                        .filter((e) => e.type === o.VIEW_TYPE.BRANCH);
                    if (this._undoGroupToSelectionsMap.get(e)) {
                        const n = [...this._undoGroupToSelectionsMap.get(e)];
                        (i.forEach((e) => {
                            n.includes(e) || n.push(e);
                        }),
                            (t = n));
                    } else t = i;
                }
                this._undoGroupToSelectionsMap.set(e, t);
            }
            _saveRedoGroupSelectionStates() {
                C.a.work(L.b.AFTER_EACH, {
                    execute: () => {
                        const e = this._undoManager.getLastGroup();
                        if (!e) return;
                        let t;
                        const i = this._getSelectionForBindModelAction(e);
                        ((t = i.length
                            ? i
                            : this._selectionManager
                                  .getSelections()
                                  .filter(
                                      (e) => e.type === o.VIEW_TYPE.BRANCH
                                  )),
                            this._redoGroupToSelectionsMap.set(e, t));
                    },
                });
            }
            _restoreSelectionStates(e, t) {
                (this._refreshGroupToSelectionsMap(),
                    C.a.work(C.b.PRIORITY.BEFORE_SELECT_SELECTION, {
                        execute: () => {
                            C.a.clearPriority(C.b.PRIORITY.SELECT_SELECTION);
                            const i = t
                                ? this._undoGroupToSelectionsMap
                                : this._redoGroupToSelectionsMap;
                            if (!i.get(e)) return;
                            const n = i
                                .get(e)
                                .map((e) => {
                                    if (e.parent()) return e;
                                    const t = e.model,
                                        i =
                                            this._context.getSVGView()
                                                .model2View[t.getId()];
                                    return i || void 0;
                                })
                                .filter((e) => e);
                            (i.set(e, n),
                                this._selectionManager.selectNone(),
                                n.forEach((e) => {
                                    this._selectionManager.addSelection(e);
                                }));
                        },
                    }));
            }
            _getSelectionForBindModelAction(e) {
                const t = e.getTasks().filter((e) => {
                    var t;
                    return null === (t = e.options) || void 0 === t
                        ? void 0
                        : t.shouldBindSelectionRestore;
                });
                return t.length
                    ? t
                          .map((e) => {
                              const t = e.options.model;
                              return this._context.getSVGView().model2View[
                                  t.getId()
                              ];
                          })
                          .filter((e) => e)
                    : [];
            }
            _refreshGroupToSelectionsMap() {
                const e = this._undoManager.getAllGroups(),
                    t = [];
                (this._undoGroupToSelectionsMap.forEach((i, n) => {
                    e.includes(n) || t.push(n);
                }),
                    t.forEach((e) => {
                        (this._undoGroupToSelectionsMap.delete(e),
                            this._redoGroupToSelectionsMap.delete(e));
                    }));
            }
        }
        class M {
            constructor(e) {
                ((this._context = e),
                    (this._dragManager = this._context.getModule(
                        o.MODULE_NAME.DRAG
                    )),
                    this._dragManager &&
                        this._context.on(o.EVENTS.SE_BRANCH_DRAG_END, () => {
                            this._restoreSelectionStatus();
                        }));
            }
            _restoreSelectionStatus() {
                const e = [...this._dragManager.getOriginalDragSelections()];
                C.a.work(C.b.PRIORITY.BEFORE_SELECT_SELECTION, {
                    execute: () => {
                        C.a.clearPriority(C.b.PRIORITY.SELECT_SELECTION);
                        const t = this._context.getModule(
                                o.MODULE_NAME.SELECTION
                            ),
                            i = this._context.getSVGView();
                        e.forEach((e) => {
                            const n = i.model2View[e.model.getId()];
                            null == t || t.addSelection(n);
                        });
                    },
                });
            }
        }
        var A = class {
                constructor(e) {
                    (new y(e), new M(e));
                }
            },
            v = i(63),
            E = i(6);
        class _ extends a.a {
            constructor(e, t) {
                var i;
                if (
                    (super({ el: t }),
                    (this._deviceNativeScale = 1),
                    (this._content = null),
                    (this._initWheelScaleProcessFlag = !1),
                    (this._isScaled = !1),
                    (this.currentScale = 1),
                    (this.clickCount = 0),
                    (this.model2View = {}),
                    (this._isScaleMoving = !1),
                    !e)
                )
                    throw new Error(
                        'must indicate el argument in SVGView initialization'
                    );
                if (
                    ((this._fingerScaleHandler = new O(this)),
                    (this._context = e),
                    (this._pinchStartScale = null),
                    (this.selectionManager =
                        this._context.getModule('selectionmanager')),
                    (this.eventBus = Object.assign({}, d.a.Events)),
                    (this._$scrollContainer = l()(
                        this._context.getScrollContainer()
                    )),
                    (this.inertialPanning = new f()),
                    this.initSVGStructure(),
                    (this._canvasControl = this._context.isDoughnutPlatform()
                        ? new b(this)
                        : new m(this)),
                    new A(this._context),
                    (this.initGeometryStatus =
                        null === (i = this._context._option) || void 0 === i
                            ? void 0
                            : i.initSheetGeometryStatus),
                    this.initGeometryStatus)
                ) {
                    const { scale: e } = this.initGeometryStatus;
                    ((this.currentScale = e / 100),
                        this.container.scale(this.currentScale));
                }
            }
            get type() {
                return o.VIEW_TYPE.SVG;
            }
            get lifeCycleEvents() {
                return {
                    contentMount: 'contentMount',
                    scaleChanged: 'scaleChanged',
                };
            }
            initSVGStructure() {
                (this.$el.append('<div class="wallpaper"></div>'),
                    (this.svg = Object(n.a)(this.el)
                        .spof()
                        .style({ display: 'block' })),
                    (this.container = this.svg
                        .group()
                        .data('name', 'container')));
                const e = this.$el.width(),
                    t = this.$el.height();
                (void 0 !== e &&
                    void 0 !== t &&
                    this.container.translate(e / 2, t / 2),
                    (this._multiSelectG = this.svg
                        .group()
                        .data('name', 'multi-select-box_container')));
            }
            getContext() {
                return this._context;
            }
            getCanvasControl() {
                return this._canvasControl;
            }
            move(e, t, i) {
                this._canvasControl.move(e, t, i);
            }
            getSheetTranslate() {
                return this._canvasControl.getSheetContentTranslate();
            }
            getCoordinateTransfer() {
                return this._canvasControl.getCoordinateTransfer();
            }
            getMultiSelectG() {
                return this._multiSelectG;
            }
            getSheetView() {
                return this._content;
            }
            content(e) {
                if (void 0 === e) return this._content || null;
                if (e === this._content) return this;
                ((e = e || null),
                    this._content &&
                        (this._content.remove(), this._content.parent(null)),
                    (this._content = e),
                    e && (e.parent(this), this.container.add(e.svg, 0)),
                    this.el.parentNode && this.initView());
                const t = this.initGeometryStatus
                    ? {
                          x: this.initGeometryStatus.x,
                          y: this.initGeometryStatus.y,
                      }
                    : null;
                return (
                    this.trigger(this.lifeCycleEvents.contentMount, {
                        initPosition: t,
                    }),
                    this
                );
            }
            initView() {
                const e = this.content();
                return (
                    e && e.initView(),
                    this.eventBus.trigger('centralRenderOk'),
                    this
                );
            }
            editDomain() {
                return this;
            }
            remove() {
                var e;
                return (
                    null === (e = this._content) || void 0 === e || e.remove(),
                    this.stopListening(),
                    this
                );
            }
            createFloatingTopic(e) {
                if (
                    -1 !==
                    this.getContext()
                        .getActiveUIStatus()
                        .indexOf(o.UI_STATUS.ADD_FLOATINGTOPIC)
                )
                    return;
                const t = this.content();
                if (t instanceof v.a) {
                    const i = t.model.rootTopic(),
                        n = i.createEmptyTopic({
                            title: this.getContext().getTranslatedText(
                                'DEFAULT_FLOATING_TOPIC_TITLE'
                            ),
                            titleUnedited: !0,
                        });
                    (n.set(
                        'position',
                        this.getCoordinateTransfer().viewportToMindMap(e)
                    ),
                        i.addChildTopic(n, { type: 'detached' }));
                }
            }
            isEnableScaleByWheel(e) {
                return (
                    (e.ctrlKey && !r.a.isMac) ||
                    ((e.ctrlKey || e.metaKey) && r.a.isMac)
                );
            }
            setScaleByWheel(e) {
                const { deltaX: t } = e.originalEvent;
                0 === Math.abs(t) &&
                    (this._initWheelScaleProcessFlag ||
                        (this._fingerScaleHandler.initProcess(
                            this.currentScale
                        ),
                        (this._initWheelScaleProcessFlag = !0)),
                    clearTimeout(this._endWheelScaleProcessFlag),
                    this._fingerScaleHandler.startProcess(e.originalEvent),
                    (this._endWheelScaleProcessFlag = setTimeout(() => {
                        ((this._endWheelScaleProcessFlag = null),
                            (this._initWheelScaleProcessFlag = !1),
                            this._fingerScaleHandler.endProcess());
                    }, 500)));
            }
            setScale(e, t, i = !1) {
                if (this.config(o.CONFIG.NO_SCALE)) return;
                if (((e = this._scaleFilter(e)), this.currentScale === e / 100))
                    return;
                const n = (e) => {
                        ((this.currentScale = e / 100),
                            this.container.scale(this.currentScale));
                    },
                    a = () => {
                        ((this._isScaleMoving = !1),
                            delete this._scaleClearFn,
                            this.getContext().trigger(
                                o.EVENTS.SCALE_CHANGED,
                                e
                            ),
                            this.trigger(
                                this.lifeCycleEvents.scaleChanged,
                                this.currentScale,
                                i
                            ));
                    };
                (this._isScaleMoving &&
                    this._scaleClearFn &&
                    this._scaleClearFn(),
                    t
                        ? ((this._isScaleMoving = !0),
                          (this._scaleClearFn = r.a.setAnimation({
                              start: 100 * this.currentScale,
                              end: e,
                              duration: 300,
                              during: n,
                              after: a,
                          })))
                        : (n(e), a()));
            }
            getScale() {
                return Math.round(100 * this.currentScale);
            }
            _scaleFilter(e) {
                const t = parseFloat(this.config(o.CONFIG.MAX_SCALE)),
                    i = parseFloat(this.config(o.CONFIG.MIN_SCALE));
                return (e > t && (e = t), e < i && (e = i), e);
            }
            setDeviceNativeScale(e) {
                this._deviceNativeScale = e;
                const t = this._canvasControl.getScrollContainerBounds();
                (this._context.isMobilePlatform() &&
                    ((t.x = 0),
                    (t.y = 0),
                    (t.width = t.width / e),
                    (t.height = t.height / e)),
                    this._canvasControl.setVisibleAreaBounds(t));
            }
            getDeviceNativeScale() {
                return this._deviceNativeScale;
            }
        }
        class O {
            constructor(e) {
                ((this.updateScaleValue = Object(E.throttle)(() => {
                    let e = 3 * -this._scaleEvent.deltaY;
                    Math.abs(e) >= 50 && (e = e > 0 ? 50 : -50);
                    const t = 100 * this._svgView.currentScale + Math.floor(e);
                    window.requestAnimationFrame(() => {
                        this._svgView.setScale(t, !1, !0);
                    });
                }, 10)),
                    (this._svgView = e));
            }
            initProcess(e) {
                this._startScaleValue = e;
                const t = this._svgView.getModule(o.MODULE_NAME.SEMAPHORE);
                t && t.increase(o.UI_STATUS.PINCH);
            }
            startProcess(e) {
                ((this._scaleEvent = e),
                    (this._movingTempScaleValue = this._svgView.currentScale),
                    this.updateScaleValue());
            }
            endProcess() {
                ((this._scaleEvent = null),
                    delete this._startScaleValue,
                    delete this._movingTempScaleValue,
                    this._svgView
                        .getModule(o.MODULE_NAME.SEMAPHORE)
                        .decrease(o.UI_STATUS.PINCH));
            }
        }
        Object(h.wrapReadOnly)(_, ['createFloatingTopic']);
    },
];
