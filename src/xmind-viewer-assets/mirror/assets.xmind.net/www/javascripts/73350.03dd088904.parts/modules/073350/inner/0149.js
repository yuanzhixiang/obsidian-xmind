export default [
    function (e, t, i) {
        'use strict';
        var n = i(0),
            r = i(96),
            o = i(81),
            a = i(6),
            s = i.n(a),
            l = i(95),
            c = i(2);
        class d extends c.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = n.ACTION_NAMES.ADD_NEW_SHEET));
            }
            doExecute({ sheetId: e, sheetData: t, options: i }) {
                this._context.model.addSheet(e, t, i);
            }
        }
        class f extends c.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = n.ACTION_NAMES.CHANGE_SHEET_TITLE));
            }
            doExecute({ sheetId: e, newTitle: t }) {
                this._context.model.changeSheetTitle(e, t);
            }
        }
        class h extends c.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = n.ACTION_NAMES.CLOSE_UNDO_KEEP_MODE));
            }
            doExecute() {
                this._context
                    .getCurrentSheetEditor()
                    .getSheetModel()
                    .getUndo()
                    .keepAllInOne(!1);
            }
        }
        class p extends c.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = n.ACTION_NAMES.OPEN_UNDO_KEEP_MODE));
            }
            doExecute() {
                this._context
                    .getCurrentSheetEditor()
                    .getSheetModel()
                    .getUndo()
                    .keepAllInOne(!0);
            }
        }
        class T extends c.a {
            constructor() {
                (super(...arguments), (this.actionName = n.ACTION_NAMES.REDO));
            }
            doExecute() {
                this._context.model.getUndo().redo();
            }
            queryStatus() {
                const e = this._context.model.getUndo();
                return -1 ===
                    this._context
                        .getActiveUIStatus()
                        .indexOf(n.UI_STATUS.DRAG) && e.canRedo()
                    ? n.ACTION_STATUS.NORMAL
                    : n.ACTION_STATUS.DISABLE;
            }
        }
        class u extends c.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = n.ACTION_NAMES.REFRESH_MIND_MAP));
            }
            doExecute() {
                Object.values(this._context.sheetEditors).forEach((e) => {
                    e &&
                        e.execAction(n.ACTION_NAMES.REFRESH_MIND_MAP, {
                            prue: !0,
                        });
                });
            }
        }
        class g extends c.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = n.ACTION_NAMES.REMOVE_SHEET));
            }
            doExecute({ sheetId: e } = {}) {
                if (!e) return n.ACTION_STATUS.ABORTED;
                this._context.model.removeSheet(e);
            }
        }
        class Q extends c.a {
            constructor() {
                (super(...arguments),
                    (this.actionName =
                        n.ACTION_NAMES.SET_EXT_COL_ICON_DISPLAY));
            }
            doExecute({ isShow: e }) {
                Object.values(this._context.sheetEditors).forEach((t) => {
                    t &&
                        t.execAction(n.ACTION_NAMES.SET_EXT_COL_ICON_DISPLAY, {
                            isShow: e,
                            prue: !0,
                        });
                });
            }
        }
        class m extends c.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = n.ACTION_NAMES.SET_MINI_MAP_DISPLAY));
            }
            doExecute({ show: e }) {
                this._context.miniMapManager.setMiniMapDisplay(e);
            }
        }
        class b extends c.a {
            constructor() {
                (super(...arguments), (this.actionName = n.ACTION_NAMES.UNDO));
            }
            doExecute({ needClearRedo: e = !1 } = {}) {
                const t = this._context.model.getUndo();
                (t.undo(), e && t.clearRedo());
            }
            queryStatus() {
                const e = this._context.model.getUndo();
                return -1 ===
                    this._context
                        .getActiveUIStatus()
                        .indexOf(n.UI_STATUS.DRAG) && e.canUndo()
                    ? n.ACTION_STATUS.NORMAL
                    : n.ACTION_STATUS.DISABLE;
            }
        }
        class C extends c.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = n.ACTION_NAMES.WORKBOOK_SAVED));
            }
            doExecute() {
                (Object.values(this._context.sheetEditors).forEach((e) => {
                    e && e.execAction(n.ACTION_NAMES.SHEET_SAVED, { prue: !0 });
                }),
                    this._context.updateBaseUndoIndex());
            }
        }
        class L extends c.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = n.ACTION_NAMES.WORKBOOK_MODIFIED));
            }
            doExecute() {
                Object.values(this._context.sheetEditors).forEach((e) => {
                    e &&
                        e.execAction(n.ACTION_NAMES.SHEET_MODIFIED, {
                            prue: !0,
                        });
                });
            }
        }
        const y = [d, f, h, p, T, u, g, Q, m, b, C, L];
        var M = (e) => Object(l.a)(e, y);
        const A = [
                n.EVENTS.BEFORE_EDITOR_REMOVE,
                n.EVENTS.EDITOR_REMOVED,
                n.EVENTS.AFTER_MODIFY_STATUS_CHANGE,
            ],
            v = s.a.invert(n.EVENTS),
            E = r.a.extend({
                initialize: function ({
                    scrollContainer: e,
                    initViewerStatus: t,
                }) {
                    (E.__super__.initialize.bind(this)({
                        scrollContainer: e,
                    }),
                        (this.scrollContainer = e),
                        (this.currentSheetId = -1),
                        (this._initViewerStatus = t || {}),
                        (this.switchedSheetIds = []),
                        (this.sheetEditors = {}),
                        (this._gestureArgs = []),
                        (this._eventArgs = []),
                        (this._actions = M(this)),
                        (this.miniMapManager = new x(this)),
                        this.initListeners());
                },
                initListeners() {
                    (this.listenTo(
                        this.model,
                        n.EVENTS.BEFORE_REMOVE_SHEET_MODEL,
                        this.removeSheet
                    ),
                        this.listenTo(this.model, 'all', (...e) => {
                            e[0] in v && this.trigger(...e);
                        }),
                        this.listenTo(
                            this.model,
                            n.EVENTS.AFTER_WORKBOOK_CONTENT_CHANGE,
                            s.a.debounce(() => {
                                this.trigger(
                                    n.EVENTS.AFTER_MODIFY_STATUS_CHANGE
                                );
                            }, 0)
                        ),
                        this.listenTo(
                            this.model,
                            n.EVENTS.AFTER_ADD_EXISTING_SHEET,
                            (e) => {
                                const t = this.findSheetIndex(e.id),
                                    i =
                                        this._initViewerStatus.lastSheetIndex ||
                                        0;
                                t === i && this.switchTo(i);
                            }
                        ));
                },
                isWorkBookModified() {
                    return this.getCurrentSheetEditor().isSheetModified();
                },
                updateBaseUndoIndex() {
                    this.getCurrentSheetEditor().updateBaseUndoIndex();
                },
                _remove: function () {
                    this.sheetEditors = {};
                },
                onGesture(e, t, i) {
                    this._gestureArgs.push({
                        eventName: e,
                        viewType: t,
                        callback: i,
                    });
                    this.getCurrentSheetEditor().onGesture(e, t, i);
                },
                offGesture(e, t, i) {
                    const n = this.getCurrentSheetEditor(),
                        r = _(e, t, i);
                    this._gestureArgs = this._gestureArgs.filter(
                        (e) =>
                            !r(e) ||
                            (n.offGesture(e.eventName, e.viewType, e.callback),
                            !1)
                    );
                },
                onEvent(e, t, i) {
                    this._eventArgs.push({
                        eventName: e,
                        viewType: t,
                        callback: i,
                    });
                    this.getCurrentSheetEditor().onEvent(e, t, i);
                },
                offEvent(e, t, i) {
                    const n = this.getCurrentSheetEditor(),
                        r = _(e, t, i);
                    this._eventArgs = this._eventArgs.filter(
                        (e) =>
                            !r(e) ||
                            (n.offEvent(e.eventName, e.viewType, e.callback),
                            !1)
                    );
                },
                removeSheet: function (e) {
                    const t = this.sheetEditors[e];
                    if (!t) return;
                    (t.remove(),
                        this.stopListening(t),
                        delete this.sheetEditors[e]);
                    let i = Number.MAX_VALUE,
                        n = -1;
                    const r = this.findSheetIndex(e);
                    (this.model.sheets.forEach((e, t) => {
                        if (t === r) return;
                        const o = Math.abs(t - r);
                        (o < i || (o === i && t > r)) && ((n = t), (i = o));
                    }),
                        this.switchTo(n));
                },
                switchTo(e) {
                    var t;
                    let i = !1;
                    if (
                        !this.model.sheets[e] &&
                        (this.config(n.CONFIG.LOGGER).warn(
                            'try to switch to an inexistent sheet'
                        ),
                        (e = 0),
                        !this.model.sheets[e])
                    )
                        return;
                    const r = this.model.findSheetId(e);
                    if (this.currentSheetId === r) return;
                    const o = this.findSheetIndex(this.currentSheetId);
                    this.trigger(n.EVENTS.BEFORE_SWITCH_SHEET, e);
                    const a = this.getCurrentSheetEditor();
                    a && S.call(this, a);
                    const { sheetEditors: l } = this;
                    let c = l[r];
                    if (
                        (c ||
                            (this.trigger(n.EVENTS.BEFORE_CREATE_SHEET_EDITOR),
                            (c = this.initSheetEditor(e)),
                            this.trigger(n.EVENTS.SHEET_EDITOR_CREATED, c),
                            (i = !0)),
                        O.call(this, c),
                        s.a.each(l, (e) => {
                            e === c
                                ? this.showSheetEditor(e, i)
                                : this.hideSheetEditor(e);
                        }),
                        (this.currentSheetId = r),
                        this.trigger(n.EVENTS.SHEET_SWITCHED),
                        !this.switchedSheetIds.includes(r))
                    ) {
                        const e =
                            null ===
                                (t = this._initViewerStatus.geometryStatus) ||
                            void 0 === t
                                ? void 0
                                : t[r];
                        (e
                            ? c
                                  .getSVGView()
                                  .getCanvasControl()
                                  .restorePosition(e)
                            : c
                                  .getSVGView()
                                  .getCanvasControl()
                                  .center({ x: 0, y: 0 }),
                            this.switchedSheetIds.push(r));
                    }
                    -1 !== o &&
                        this.model.getUndo().getLastGroup() &&
                        this.model.getUndo().append({
                            undo: () => this.switchTo(o),
                            redo: () => this.switchTo(e),
                        });
                },
                initSheetEditor(e) {
                    if (!this.model.sheets[e])
                        return void this.config(n.CONFIG.LOGGER).warn(
                            'try to initialize an inexistent sheet'
                        );
                    const t = this.model.findSheetId(e);
                    if (!this.sheetEditors[t]) {
                        const i = document.createElement('div');
                        (i.classList.add('workbook-item'),
                            (i.style.width = '100%'),
                            (i.style.height = '100%'),
                            (i.style.position = 'absolute'),
                            this.$el.append(i));
                        const n = new o.a({
                            el: i,
                            model: this.model.sheets[e],
                            scrollContainer: this.scrollContainer,
                            parent: this,
                            eventManager: this.eventManager,
                            initSheetGeometryStatus:
                                this._initViewerStatus.geometryStatus &&
                                this._initViewerStatus.geometryStatus[t],
                        });
                        return (
                            (this.sheetEditors[t] = n),
                            n._config.parent(this._config),
                            n.initInnerView(),
                            this.hideSheetEditor(n),
                            n
                        );
                    }
                },
                initAllSheetEditor() {
                    this.model.sheets.forEach((e, t) => {
                        this.initSheetEditor(t);
                    });
                },
                hideSheetEditor(e) {
                    e.el.style.display = 'none';
                },
                showSheetEditor(e, t) {
                    e.el.style.display = 'block';
                },
                findSheetIndex: function (e) {
                    return this.model.findSheetIndex(e);
                },
                getCurrentSheetEditor() {
                    return this.sheetEditors[this.currentSheetId];
                },
                getSheetEditorById(e) {
                    return this.sheetEditors[e];
                },
                execAction(e, t) {
                    const i = this.getCurrentSheetEditor();
                    let r = i && i.findOwnAction(e);
                    if (
                        (r || (r = this.findOwnAction(e)),
                        r && r.queryStatus(t) === n.ACTION_STATUS.NORMAL)
                    )
                        return r.execute(t);
                },
                queryActionStatus(e, t) {
                    const i = this.getCurrentSheetEditor();
                    let r = i && i.findOwnAction(e);
                    return (
                        r || (r = this.findOwnAction(e)),
                        r ? r.queryStatus(t) : n.ACTION_STATUS.DISABLE
                    );
                },
                findOwnAction(e) {
                    return this._actions[e];
                },
                getChildEditors: function () {
                    const e = [];
                    return (
                        this.model.get('sheets').forEach((t) => {
                            const i = this.sheetEditors[t.id];
                            i && e.push(i);
                        }),
                        e
                    );
                },
                getSelections() {
                    var e, t;
                    return null !==
                        (t =
                            null === (e = this.getCurrentSheetEditor()) ||
                            void 0 === e
                                ? void 0
                                : e.getSelections()) && void 0 !== t
                        ? t
                        : [];
                },
                getComponentViewById(e) {
                    let t;
                    return (
                        s.a
                            .values(this.sheetEditors)
                            .some((i) => (t = i.getComponentViewById(e))),
                        t
                    );
                },
                getActiveUIStatus() {
                    var e, t;
                    return null !==
                        (t =
                            null === (e = this.getCurrentSheetEditor()) ||
                            void 0 === e
                                ? void 0
                                : e.getActiveUIStatus()) && void 0 !== t
                        ? t
                        : [];
                },
                getZoomPencentage() {
                    var e, t;
                    return null !==
                        (t =
                            null === (e = this.getCurrentSheetEditor()) ||
                            void 0 === e
                                ? void 0
                                : e.getZoomPencentage()) && void 0 !== t
                        ? t
                        : 100;
                },
                getTransform() {
                    var e;
                    null === (e = this.getCurrentSheetEditor()) ||
                        void 0 === e ||
                        e.getTransform();
                },
                getViewerStatus() {
                    const e = {};
                    for (const t in this.sheetEditors) {
                        const i = this.getSheetEditorById(t);
                        e[t] = i.getSheetGeometryStatus();
                    }
                    return {
                        geometryStatus: e,
                        lastSheetIndex: this.findSheetIndex(
                            this.currentSheetId
                        ),
                    };
                },
            });
        function _(e, t, i) {
            return t
                ? i
                    ? e && t && i
                        ? (n) =>
                              e === n.eventName &&
                              t === n.viewType &&
                              i === n.callback
                        : void 0
                    : (i) => e === i.eventName && t === i.viewType
                : (t) => e === t.eventName;
        }
        function O(e) {
            (this.listenTo(e, 'all', (...e) => {
                const t = e[0];
                -1 === A.indexOf(t) && this.trigger(...e);
            }),
                this._gestureArgs.forEach((t) => {
                    e.onGesture(t.eventName, t.viewType, t.callback);
                }),
                this._eventArgs.forEach((t) => {
                    e.onEvent(t.eventName, t.viewType, t.callback);
                }));
        }
        function S(e) {
            (this.stopListening(e),
                this._gestureArgs.forEach((t) => {
                    e.offGesture(t.eventName, t.viewType, t.callback);
                }),
                this._eventArgs.forEach((t) => {
                    e.offEvent(t.eventName, t.viewType, t.callback);
                }));
        }
        class x {
            constructor(e) {
                ((this._workbookEditor = e),
                    (this._show = !1),
                    this._initEventListener());
            }
            _initEventListener() {
                this._workbookEditor.on(n.EVENTS.SHEET_SWITCHED, () => {
                    this.setMiniMapDisplay(this._show);
                });
            }
            _getSheetEditorList() {
                return Object.keys(this._workbookEditor.sheetEditors).map(
                    (e) => this._workbookEditor.sheetEditors[e]
                );
            }
            setMiniMapDisplay(e) {
                if (
                    (this._getSheetEditorList().forEach((e) => {
                        e.execAction(n.ACTION_NAMES.SET_MINI_MAP_DISPLAY, {
                            show: !1,
                            prue: !0,
                        });
                    }),
                    e)
                ) {
                    const e = this._workbookEditor.getCurrentSheetEditor(),
                        t = e.getModule(n.MODULE_NAME.MINI_MAP);
                    (t && t.setMiniMapDisplay(e, !0), t && t.resetMiniMapUse());
                }
                this._show = e;
            }
        }
        t.a = E;
    },
];
