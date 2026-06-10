export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return l;
        });
        var n = i(0),
            r = i(16),
            o = i(72),
            a = i(94),
            s = i(99);
        class l extends a.a {
            get componentType() {
                return n.COMPONENT_TYPE.WORKBOOK;
            }
            initialize() {
                ((this.sheets = []),
                    (this._config = new r.a()),
                    (this._undoManager = new o.a()),
                    this._undoManager.setStackLimitedLength(1 / 0),
                    this._undoManager.on(n.EVENTS.UNDO_STATE_CHANGE, (...e) =>
                        this.trigger(n.EVENTS.UNDO_STATE_CHANGE, ...e)
                    ),
                    this._repairData());
            }
            _repairData() {
                let e = this.get('sheetOrder') || [];
                const t = this.get('sheets') || [];
                ((e = e.filter((e) => -1 !== t.findIndex((t) => t.id === e))),
                    t.forEach((t) => {
                        -1 === e.findIndex((e) => e === t.id) && e.push(t.id);
                    }));
                const i = [];
                (e.forEach((e) => {
                    i.push(t.find((t) => t.id === e));
                }),
                    this.set('sheetOrder', e),
                    this.set('sheets', i));
            }
            addSheet(e, t, i = {}) {
                var r, o, a;
                const l = this.findSheetIndex(e);
                this.sheets[l] &&
                    (null === (r = this.getConfig()) ||
                        void 0 === r ||
                        r.get(n.CONFIG.LOGGER).info(l, e),
                    null === (o = this.getConfig()) ||
                        void 0 === o ||
                        o
                            .get(n.CONFIG.LOGGER)
                            .warn('try to add to existing sheet'));
                const d =
                        (null === (a = this.getConfig()) || void 0 === a
                            ? void 0
                            : a.get(n.CONFIG.PLATFORM)) ===
                        n.PLATFORMS.DOUGHNUT,
                    f = new s.a(t, {
                        undo: d ? null : this._undoManager,
                    });
                return (
                    -1 === l
                        ? this._addNewSheet({
                              sheetModel: f,
                              id: e,
                              title: c(i.title)
                                  ? this.getNextSheetTitle()
                                  : i.title,
                              at: c(i.at) ? this.get('sheets').length : i.at,
                          })
                        : (this._listenSheetModel(f),
                          (this.sheets[l] = f),
                          this.trigger(n.EVENTS.AFTER_ADD_EXISTING_SHEET, t)),
                    f
                );
            }
            _addNewSheet(e) {
                var t;
                const { sheetModel: i, at: r, id: o, title: a } = e,
                    s = i && i.toJSON();
                (this._listenSheetModel(i),
                    this.trigger(n.EVENTS.BEFORE_ADD_NEW_SHEET, s, e),
                    this.sheets.splice(r, 0, i),
                    this.get('sheets').splice(r, 0, {
                        id: o,
                        title: a,
                    }),
                    this.get('sheetOrder').splice(r, 0, o),
                    null === (t = this.getUndo()) ||
                        void 0 === t ||
                        t.add(
                            {
                                undo: () => this.removeSheet(e.id),
                                redo: () => this._addNewSheet(e),
                            },
                            'addSheet'
                        ),
                    this.trigger(n.EVENTS.AFTER_ADD_NEW_SHEET, s, e),
                    this.trigger(n.EVENTS.AFTER_WORKBOOK_CONTENT_CHANGE));
            }
            _listenSheetModel(e) {
                e &&
                    this.listenTo(
                        e,
                        n.EVENTS.AFTER_SHEET_CONTENT_CHANGE,
                        () => {
                            this.trigger(
                                n.EVENTS.AFTER_WORKBOOK_CONTENT_CHANGE
                            );
                        }
                    );
            }
            getNextSheetTitle() {
                return 'Sheet ' + (this.get('sheets').length + 1);
            }
            removeSheet(e) {
                var t;
                const i = this.findSheetIndex(e),
                    r = this.get('sheets').findIndex((t) => t.id === e);
                if (!this.get('sheets')[r]) return;
                this.trigger(n.EVENTS.BEFORE_REMOVE_SHEET_MODEL, e);
                const o = this.get('sheets').splice(r, 1)[0];
                this.get('sheetOrder').splice(i, 1);
                const a = this.sheets[i];
                (this.sheets.splice(i, 1),
                    a && (a.parent(null), this.stopListening(a)),
                    this.trigger(n.EVENTS.AFTER_REMOVE_SHEET_MODEL, e));
                const s = Object.assign({ sheetModel: a, at: i }, o);
                return (
                    null === (t = this.getUndo()) ||
                        void 0 === t ||
                        t.add(
                            {
                                undo: () => this._addNewSheet(s),
                                redo: () => this.removeSheet(e),
                            },
                            'removeSheet'
                        ),
                    this.trigger(n.EVENTS.AFTER_WORKBOOK_CONTENT_CHANGE),
                    this
                );
            }
            updateSheetOrderToBefore(e, t) {
                this._updateSheetOrder(e, t, !0);
            }
            updateSheetOrderToAfter(e, t) {
                this._updateSheetOrder(e, t, !1);
            }
            _updateSheetOrder(e, t, i) {
                var r;
                const o = this.get('sheetOrder'),
                    a = o.slice(),
                    s = this.sheets.slice(),
                    l = this.get('sheets').slice(),
                    c = o.indexOf(e);
                if (-1 === c || -1 === o.indexOf(t))
                    throw new Error('sheetId is not found');
                o.splice(c, 1);
                const f = o.indexOf(t);
                o.splice(f + (i ? 0 : 1), 0, e);
                const h = this.sheets.splice(c, 1)[0];
                (h
                    ? this.sheets.splice(f + (i ? 0 : 1), 0, h)
                    : this.sheets.splice(f + (i ? 0 : 1), 0),
                    this.get('sheets').splice(
                        f + (i ? 0 : 1),
                        0,
                        this.get('sheets').splice(c, 1)[0]
                    ),
                    null === (r = this.getUndo()) ||
                        void 0 === r ||
                        r.add(
                            {
                                undo: () => {
                                    (d(s, this.sheets),
                                        d(a, this.get('sheetOrder')),
                                        d(l, this.get('sheets')),
                                        this.trigger(
                                            n.EVENTS
                                                .AFTER_WORKBOOK_CONTENT_CHANGE
                                        ),
                                        this.trigger(
                                            n.EVENTS.AFTER_SHEET_ORDER_CHANGE
                                        ));
                                },
                                redo: () => this._updateSheetOrder(e, t, i),
                            },
                            'reorderSheet'
                        ),
                    this.trigger(n.EVENTS.AFTER_WORKBOOK_CONTENT_CHANGE),
                    this.trigger(n.EVENTS.AFTER_SHEET_ORDER_CHANGE));
            }
            changeSheetTitle(e, t) {
                var i;
                const r = this.get('sheets').find((t) => t.id === e);
                if (!r) return;
                const o = r.title;
                o !== t &&
                    ((r.title = t),
                    this.trigger(n.EVENTS.AFTER_SHEET_TITLE_CHANGE, e, t),
                    this.trigger(n.EVENTS.AFTER_WORKBOOK_CONTENT_CHANGE),
                    null === (i = this.getUndo()) ||
                        void 0 === i ||
                        i.add(
                            {
                                undo: () => {
                                    this.changeSheetTitle(e, o);
                                },
                                redo: () => {
                                    this.changeSheetTitle(e, t);
                                },
                            },
                            'changeSheetTitle'
                        ));
            }
            changeTitle(e) {
                var t;
                const i = this.get('title');
                i !== e &&
                    (this.set('title', e),
                    null === (t = this.getUndo()) ||
                        void 0 === t ||
                        t.add(
                            {
                                undo: () => this.changeTitle(i),
                                redo: () => this.changeTitle(e),
                            },
                            'changeWorkbookTitle'
                        ),
                    this.trigger(n.EVENTS.AFTER_WORKBOOK_TITLE_CHANGE),
                    this.trigger(n.EVENTS.AFTER_WORKBOOK_CONTENT_CHANGE));
            }
            getSheetByIndex(e) {
                return this.sheets[e];
            }
            findSheetIndex(e) {
                return this.get('sheetOrder').findIndex((t) => t === e);
            }
            findSheetId(e) {
                return this.get('sheetOrder')[e];
            }
            getUndo() {
                return this._undoManager;
            }
            getConfig() {
                return this._config;
            }
        }
        function c(e) {
            return null == e;
        }
        function d(e, t) {
            if (e.length !== t.length)
                throw new Error("Arrays' length is not equal");
            e.forEach((e, i) => {
                t[i] = e;
            });
        }
    },
];
