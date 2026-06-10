export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'b', function () {
            return s;
        });
        var n = i(46),
            r = i(73),
            o = i(0),
            a = i(5);
        function s(e) {
            const t = e.centralBranchView,
                i = t.getDescendantBranchesByType(...o.ALL_TOPIC_TYPES),
                n = [],
                r = [t, ...i],
                a = e.relationships;
            return (n.push(...r, ...a), n);
        }
        class l extends n.a {
            getClassName(e, t = {}) {
                return o.CLASS_TYPE.MAP;
            }
            changeTheme(e, t, i) {
                const n = e.getContext().getModule(o.MODULE_NAME.SEMAPHORE);
                n.increase(o.UI_STATUS.CHANGING_THEME);
                i = Object.assign({}, { toFixUserStyle: !0 }, i);
                const r = e.getContext().getSheetView();
                (i.toFixUserStyle &&
                    (i.fixUserStyleWhenChangeTheme = () =>
                        this.fixUserStyle(r, i)),
                    this.protectedGetModel(r).changeTheme(t, i),
                    n.decrease(o.UI_STATUS.CHANGING_THEME));
            }
            protectedGetComputedStyleKeys(e) {
                return [
                    ...o.MAP_COLOR_STYLE_KEYS,
                    ...o.MAP_SKELETON_STYLE_KEYS,
                ];
            }
            fixUserStyle(e, t) {
                (s(e).forEach((e) => {
                    this.protectedFindStyleSelector(e).fixUserStyle(e, t);
                }),
                    this._fixSheetUserStyleWhenChangeTheme(e, t));
            }
            _fixSheetUserStyleWhenChangeTheme(e, t) {
                const i = this.getUserStyle(e);
                if (!i) return;
                const n = this.getStyleKeysToBeFixByTheme(e, t),
                    r = { properties: {} },
                    o = i.keys();
                for (const t of o) {
                    const i = this.getUserStyleValue(e, t),
                        o = this.getUserClassValue(e, t),
                        a = this.getThemeStyleValue(e, t),
                        s = n.includes(t);
                    !i || s || i === o || i === a || (r.properties[t] = i);
                }
                this.protectedGetModel(e).setStyleObj(r);
            }
            updateClassIntoTheme(e, t, i, n = {}) {
                var r, o;
                const s = e.getContext().getSheetView(),
                    l = this.getTheme(s).toJSON();
                l[t] = {
                    id: Object(a.b)(),
                    properties:
                        n.isMerge &&
                        null !==
                            (o =
                                null === (r = l[t]) || void 0 === r
                                    ? void 0
                                    : r.properties) &&
                        void 0 !== o
                            ? o
                            : {},
                };
                for (const e in i.properties)
                    l[t].properties[e] = i.properties[e];
                this.changeTheme(
                    s,
                    l,
                    Object.assign(Object.assign({}, n), {
                        toFixUserStyle: !1,
                    })
                );
            }
            removeClassFromTheme(e, t = []) {
                const i = e.getContext().getSheetView(),
                    n = this.getTheme(i).toJSON();
                (t.forEach((e) => {
                    delete n[e];
                }),
                    this.changeTheme(i, n, { toFixUserStyle: !1 }));
            }
            removeStyleFromClass(e, t, i) {
                var n;
                const r = e.getContext().getSheetView(),
                    o = this.getTheme(r).toJSON();
                let a =
                    null === (n = o[t]) || void 0 === n ? void 0 : n.properties;
                if (a) {
                    for (const e of i) delete a[e];
                    ((o[t].properties = a),
                        this.changeTheme(r, o, {
                            toFixUserStyle: !1,
                        }));
                }
            }
            protectedFindStyleSelector(e) {
                return Object(r.a)(e);
            }
            getDefaultStyleKeysToBeFixByTheme() {
                return [
                    o.STYLE_KEYS.FILL_COLOR,
                    o.STYLE_KEYS.LINE_TAPERED,
                    o.STYLE_KEYS.MULTI_LINE_COLORS,
                ];
            }
            protectedParentStyleValue(e, t, i, n) {
                const r = super.protectedParentStyleValue(e, t, i, n);
                return r || null;
            }
        }
        t.a = new l();
    },
];
