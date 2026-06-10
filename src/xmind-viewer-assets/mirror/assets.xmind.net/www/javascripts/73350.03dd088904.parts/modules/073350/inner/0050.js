export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return f;
        });
        var n = i(26),
            r = i(6),
            o = i(0),
            a = i(5),
            s = i(38);
        const l = {
                [o.STYLE_KEYS.SHAPE_CLASS]: 'summaryLineClass',
                [o.STYLE_KEYS.LINE_WIDTH]: 'summaryLineWidth',
                [o.STYLE_KEYS.LINE_COLOR]: 'summaryLineColor',
                [o.STYLE_KEYS.LINE_PATTERN]: 'summaryLinePattern',
            },
            c = ' ';
        class d extends n.Model {
            constructor() {
                (super(...arguments),
                    (this.componentType = o.COMPONENT_TYPE.STYLE));
            }
            keys() {
                const e = this.get('properties');
                return e ? Object.keys(e) : [];
            }
            getValue(e) {
                var t;
                const i = this.get('properties');
                return i && null !== (t = i[e]) && void 0 !== t ? t : null;
            }
            toJSON() {
                return JSON.parse(JSON.stringify(this.attributes));
            }
        }
        class f extends s.a {
            get componentType() {
                return o.COMPONENT_TYPE.STYLE_COMPONENT;
            }
            initialize(e, t) {
                ((this._style = null),
                    super.initialize(e, t),
                    this.initStyle(this.get('style')));
            }
            styleChanged() {}
            classList() {
                if (this._classList) return this._classList;
                this._classList = [];
                const e = this.get('class');
                return (
                    e &&
                        'string' == typeof e &&
                        (this._classList = e.split(c).filter((e) => '' !== e)),
                    this._classList
                );
            }
            addClass(e, t) {
                var i;
                if (!e || e.includes(c)) return;
                const n = this.classList();
                null === e ||
                    n.includes(e) ||
                    (n.splice(t, 0, e),
                    this.set('class', n.join(c)),
                    this.trigger('changeClass', e),
                    null === (i = this.getUndo()) ||
                        void 0 === i ||
                        i.add({
                            undo: () => {
                                this.removeClass(e);
                            },
                            redo: () => {
                                this.addClass(e, t);
                            },
                        }),
                    this.styleChanged());
            }
            removeClass(e) {
                var t;
                const i = this.classList();
                if (null !== e && i.includes(e)) {
                    const n = i.indexOf(e);
                    (i.splice(n, 1),
                        i.length > 0
                            ? this.set('class', i.join(c))
                            : this.unset('class'),
                        this.trigger('changeClass', e),
                        null === (t = this.getUndo()) ||
                            void 0 === t ||
                            t.add({
                                undo: () => {
                                    this.addClass(e, n);
                                },
                                redo: () => {
                                    this.removeClass(e);
                                },
                            }),
                        this.styleChanged());
                }
            }
            getUserClassValue(e) {
                var t;
                const i = this.classList(),
                    n =
                        null === (t = this.ownerSheet()) || void 0 === t
                            ? void 0
                            : t.theme();
                let r = null;
                if (n)
                    for (const t of i) {
                        const i = n.getStyleValue(t, e);
                        i && (r = i);
                    }
                return r;
            }
            style() {
                return this._style;
            }
            initStyle(e) {
                e &&
                    e.properties &&
                    !Object(r.isEmpty)(e) &&
                    (this._style = new d(e));
            }
            changeStyle(e, t) {
                var i, n;
                let r = this.getStyleValue(e);
                if (r === t) return;
                if (t && e === o.STYLE_KEYS.TEXT_DECORATION) {
                    const [e, i] = t.split(':');
                    i
                        ? 'add' === e
                            ? (('none' !== r && r) || (r = ''),
                              (t = r.includes(i) ? r : r + ` ${i}`))
                            : 'rm' === e &&
                              (r || (r = ''),
                              (t = r.includes(i)
                                  ? r.replace(i, '').trim()
                                  : r) || (t = 'none'))
                        : (t = e.trim());
                }
                this._style ||
                    (this._style = new d({
                        id: Object(a.b)(),
                        properties: {},
                    }));
                const s = Object.assign({}, this._style.get('properties'));
                (t ? (s[e] = t) : delete s[e],
                    this._style.set('properties', s));
                const c =
                    this.componentType === o.COMPONENT_TYPE.SUMMARY &&
                    null !== (i = l[e]) &&
                    void 0 !== i
                        ? i
                        : e;
                (this.trigger('changeStyle', c, t),
                    null === (n = this.getUndo()) ||
                        void 0 === n ||
                        n.add({
                            undo: () => {
                                this.changeStyle(e, r);
                            },
                            redo: () => {
                                this.changeStyle(e, t);
                            },
                        }),
                    this.styleChanged());
            }
            setStyleObj(e, t = !1) {
                var i;
                const n = this.get('style') || null;
                let o = !1;
                if (
                    (e && e.properties && !Object(r.isEmpty)(e.properties)
                        ? ((e.id = e.id || Object(a.b)()),
                          this.set('style', e),
                          this.initStyle(e),
                          (o = !0))
                        : n &&
                          !Object(r.isEmpty)(n) &&
                          ((this._style = null), this.unset('style'), (o = !0)),
                    o)
                ) {
                    this.trigger('setStyleObject', e);
                    const r = null == e ? void 0 : e.properties,
                        o = null == n ? void 0 : n.properties;
                    (r &&
                        Object.keys(r).forEach((e) => {
                            (o && o[e] === r[e]) ||
                                this.trigger('changeStyle', e, r[e]);
                        }),
                        o &&
                            Object.keys(o).forEach((e) => {
                                (r && e in r) ||
                                    this.trigger('changeStyle', e, null);
                            }),
                        this.styleChanged(),
                        null === (i = this.getUndo()) ||
                            void 0 === i ||
                            i.add({
                                undo: () => {
                                    this.setStyleObj(n, t);
                                },
                                redo: () => {
                                    this.setStyleObj(e, t);
                                },
                            }));
                }
            }
            getStyleValue(e) {
                var t;
                const i = this.style();
                return null !== (t = null == i ? void 0 : i.getValue(e)) &&
                    void 0 !== t
                    ? t
                    : null;
            }
        }
    },
];
