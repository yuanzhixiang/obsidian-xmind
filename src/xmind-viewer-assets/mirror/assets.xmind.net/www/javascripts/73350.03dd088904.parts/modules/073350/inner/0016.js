export default [
    function (e, t, i) {
        'use strict';
        (i.d(t, 'a', function () {
            return s;
        }),
            i.d(t, 'b', function () {
                return l;
            }));
        var n = i(0),
            r = i(5);
        const o = (...e) => {},
            a = {
                [n.CONFIG.XAP_LOADER]: () =>
                    new Promise((e) => {
                        e('');
                    }),
                [n.CONFIG.URL_PREFIX]: '',
                [n.CONFIG.FONT_URL_PREFIX]: '',
                [n.CONFIG.LANGUAGE]: n.LANGS.EN_US,
                [n.CONFIG.MAX_SCALE]: 1 / 0,
                [n.CONFIG.MIN_SCALE]: 0,
                [n.CONFIG.NO_KEYBIND]: !1,
                [n.CONFIG.KEYBINDING_SERVICE]: (e, t) => null,
                [n.CONFIG.NO_EDIT_RECEIVER]: !1,
                [n.CONFIG.READONLY]: !1,
                [n.CONFIG.HIDE_COLLAPSE_BTN]: !0,
                [n.CONFIG.NO_TOPIC_CUSTOM_WIDTH_BTN]: !0,
                [n.CONFIG.INFO_ITEM_STYLE]: n.INFO_ITEM_STYLE_TYPE.FASHION,
                [n.CONFIG.CLIPBOARD_READER]: function () {
                    return null;
                },
                [n.CONFIG.PADDING_FACTOR]: 1,
                [n.CONFIG.FAKE_IMAGE]: !1,
                [n.CONFIG.LOGGER]: {
                    info: o,
                    warn: o,
                    error: o,
                    debug: o,
                },
                [n.CONFIG.INPUT_HANDLER]: (e) => Promise.resolve(''),
                [n.CONFIG.LIMITED_OPERATION_HANDLER]: (e) =>
                    Promise.resolve(!0),
                [n.CONFIG.AUTO_ACTION_STATUS]: !1,
                [n.CONFIG.DISABLE_PRESELECTION_BOX]: !1,
                [n.CONFIG.INJECT_MODULE]: {},
            };
        class s {
            constructor(e = {}) {
                this.data = Object.assign({}, e);
            }
            parent(e) {
                return (
                    e instanceof s && (this._parent = e),
                    this._parent || (this !== l ? l : null)
                );
            }
            get(e) {
                let t = this.data[e];
                if (Object(r.p)(t)) {
                    const i = this.parent();
                    t = i && i.get(e);
                }
                return t;
            }
            set(...e) {
                if (Object(r.n)(e[0])) {
                    const t = e[0];
                    for (const e in t) this.set(e, t[e]);
                } else if (2 === e.length) {
                    const t = e[0],
                        i = e[1];
                    this.data[t] = i;
                } else
                    this.get(n.CONFIG.LOGGER).error(
                        'Illegal arguments for Config: ',
                        e
                    );
            }
        }
        const l = new s(a);
    },
];
