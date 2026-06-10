export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return o;
        });
        var n = i(0),
            r = i(11);
        class o {
            constructor(e) {
                const t = {
                    keyMap: {
                        9: 'Tab',
                        13: 'Enter',
                        8: 'Delete',
                        46: 'Delete',
                        90: 'Z',
                        65: 'A',
                        38: 'Up',
                        40: 'Down',
                        37: 'Left',
                        39: 'Right',
                        32: 'Space',
                        27: 'Esc',
                    },
                    readOnlyAllowed: {
                        38: !0,
                        40: !0,
                        37: !0,
                        39: !0,
                    },
                    editingTitleAllowed: { 9: !0 },
                    operationMap: {
                        Tab: function (t) {
                            const i = this.getSelection();
                            if (i && 1 === i.length && 'branch' === i[0].type) {
                                let t = i[0];
                                (-1 !==
                                    e
                                        .getActiveUIStatus()
                                        .indexOf(n.UI_STATUS.EDIT_TITLE) &&
                                    (t = t.originBranchView),
                                    e.execAction(n.ACTION_NAMES.ADD_SUB_TOPIC, {
                                        targets: [t],
                                    }));
                            }
                        },
                        Enter: function (t) {
                            const i = this.getSelection();
                            if (i && i.length > 0 && r.a.isFunctionEnabled(t)) {
                                if (i.some((e) => 'branch' !== e.type)) return;
                                e.execAction(n.ACTION_NAMES.ADD_PARENT_TOPIC);
                            } else if (
                                i &&
                                1 === i.length &&
                                'branch' === i[0].type
                            ) {
                                if (i[0].isCentralBranch())
                                    return void e.execAction(
                                        n.ACTION_NAMES.ADD_SUB_TOPIC,
                                        { targets: [i[0]] }
                                    );
                                t.shiftKey
                                    ? e.execAction(
                                          n.ACTION_NAMES.ADD_TOPIC_BEFORE,
                                          { targets: [i[0]] }
                                      )
                                    : e.execAction(
                                          n.ACTION_NAMES.ADD_TOPIC_AFTER,
                                          { targets: [i[0]] }
                                      );
                            }
                        },
                        Delete: function (t) {
                            t.preventDefault();
                            this.getSelection() &&
                                e.execAction(n.ACTION_NAMES.DELETE_ITEM);
                        },
                        Z: function (t) {
                            if (t.metaKey || t.ctrlKey) {
                                const i = e.parent() || e;
                                t.shiftKey
                                    ? i.execAction(n.ACTION_NAMES.REDO)
                                    : i.execAction(n.ACTION_NAMES.UNDO);
                            }
                        },
                        A: function (t) {
                            (t.metaKey || t.ctrlKey) &&
                                e.execAction(n.ACTION_NAMES.SELECT_ALL);
                        },
                        Up: function (t) {
                            (t.preventDefault(),
                                t.altKey
                                    ? e.execAction(
                                          n.ACTION_NAMES.EXCHANGE_SIBLING_TOPIC,
                                          {
                                              direction: n.DIRECTION.UP,
                                          }
                                      )
                                    : e.execAction(
                                          n.ACTION_NAMES.SELECTION_NAVIGATE,
                                          {
                                              direction: n.DIRECTION.UP,
                                              addNext: t.metaKey || t.ctrlKey,
                                          }
                                      ));
                        },
                        Down: function (t) {
                            (t.preventDefault(),
                                t.altKey
                                    ? e.execAction(
                                          n.ACTION_NAMES.EXCHANGE_SIBLING_TOPIC,
                                          {
                                              direction: n.DIRECTION.DOWN,
                                          }
                                      )
                                    : e.execAction(
                                          n.ACTION_NAMES.SELECTION_NAVIGATE,
                                          {
                                              direction: n.DIRECTION.DOWN,
                                              addNext: t.metaKey || t.ctrlKey,
                                          }
                                      ));
                        },
                        Left: function (t) {
                            (t.preventDefault(),
                                t.altKey
                                    ? e.execAction(
                                          n.ACTION_NAMES.EXCHANGE_SIBLING_TOPIC,
                                          {
                                              direction: n.DIRECTION.LEFT,
                                          }
                                      )
                                    : e.execAction(
                                          n.ACTION_NAMES.SELECTION_NAVIGATE,
                                          {
                                              direction: n.DIRECTION.LEFT,
                                              addNext: t.metaKey || t.ctrlKey,
                                          }
                                      ));
                        },
                        Right: function (t) {
                            (t.preventDefault(),
                                t.altKey
                                    ? e.execAction(
                                          n.ACTION_NAMES.EXCHANGE_SIBLING_TOPIC,
                                          {
                                              direction: n.DIRECTION.RIGHT,
                                          }
                                      )
                                    : e.execAction(
                                          n.ACTION_NAMES.SELECTION_NAVIGATE,
                                          {
                                              direction: n.DIRECTION.RIGHT,
                                              addNext: t.metaKey || t.ctrlKey,
                                          }
                                      ));
                        },
                        Space: function (e) {
                            e.preventDefault();
                        },
                    },
                    forceOperationMap: {
                        Up: function (e) {
                            e.preventDefault();
                        },
                        Down: function (e) {
                            e.preventDefault();
                        },
                        Left: function (e) {
                            e.preventDefault();
                        },
                        Right: function (e) {
                            e.preventDefault();
                        },
                        Space: function (e) {
                            e.preventDefault();
                        },
                    },
                    getSelection: function () {
                        return e.getModule(n.MODULE_NAME.SELECTION).selections;
                    },
                };
                return (
                    e.$el.on('keydown', (i) => {
                        const { keyCode: r } = i,
                            {
                                keyMap: o,
                                operationMap: a,
                                forceOperationMap: s,
                            } = t;
                        if (r in t.keyMap) {
                            if (
                                (e.isReadOnly() &&
                                    !0 !== t.readOnlyAllowed[r]) ||
                                (-1 !==
                                    e
                                        .getActiveUIStatus()
                                        .indexOf(n.UI_STATUS.EDIT_TITLE) &&
                                    !0 !== t.editingTitleAllowed[r])
                            )
                                return;
                            if (e.config(n.CONFIG.NO_KEYBIND)) {
                                const e = s[o[r]];
                                e && e.call(t, i);
                            } else {
                                const e = a[t.keyMap[r]];
                                e && e.call(t, i);
                            }
                        }
                    }),
                    t
                );
            }
        }
        o.identifier = n.MODULE_NAME.KEY_BIND;
    },
];
