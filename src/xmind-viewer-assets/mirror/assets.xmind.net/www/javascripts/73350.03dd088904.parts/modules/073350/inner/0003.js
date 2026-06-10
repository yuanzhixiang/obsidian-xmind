export default [
    function (e, t, i) {
        'use strict';
        var n = i(0),
            r = i(73),
            o = i(1);
        t.a = new (class {
            getStyleValue(e, t, i = {}) {
                const n = this._getStyleSelector(e, i);
                return n && n.getStyleValue(e, t, i);
            }
            getUserStyle(e, t = {}) {
                const i = this._getStyleSelector(e, t);
                return i && i.getUserStyle(e, t);
            }
            getUserStyleValue(e, t, i = {}) {
                const n = this._getStyleSelector(e, i);
                return n && n.getUserStyleValue(e, t, i);
            }
            getDataStyleValue(e, t, i = {}) {
                const n = this._getStyleSelector(e, i);
                return n && n.getDataStyleValue(e, t);
            }
            getGlobalStyleValue(e, t) {
                var i;
                const n = e.getContext().getSheetView();
                return null === (i = this._getStyleSelector(n)) || void 0 === i
                    ? void 0
                    : i.getGlobalStyleValue(n, t);
            }
            getClassList(e, t = {}) {
                const i = this._getStyleSelector(e, t);
                return i && i.getClassList(e, t);
            }
            getUserClassValue(e, t, i = {}) {
                const n = this._getStyleSelector(e, i);
                return n && n.getUserClassValue(e, t, i);
            }
            getTheme(e, t = {}) {
                const i = this._getStyleSelector(e, t);
                return i && i.getTheme(e, t);
            }
            getThemeStyleValue(e, t, i = {}) {
                const n = this._getStyleSelector(e, i);
                return n && n.getThemeStyleValue(e, t, i);
            }
            getDefaultStyleValue(e, t, i = {}) {
                const n = this._getStyleSelector(e, i);
                return n && n.getDefaultStyleValue(e, t, i);
            }
            getClassName(e, t = {}) {
                const i = this._getStyleSelector(e, t);
                return i && i.getClassName(e, t);
            }
            getActivedClassName(e, t = {}) {
                return this.getClassList(e, t)[0] || this.getClassName(e, t);
            }
            getSuggestedClassName(e, t = {}) {
                const i = this._getStyleSelector(e, t);
                return i && i.getSuggestedClassName(e, t);
            }
            changeTheme(e, t, i = {}) {
                const n = e.getContext().getSheetView(),
                    r = this._getStyleSelector(n);
                return (
                    n.model.removeSkeletonStructureStyle(),
                    null == r ? void 0 : r.changeTheme(e, t, i)
                );
            }
            changeSkeletonTheme(e, t, i) {
                const r = e.getContext().getSheetView(),
                    a = this._getStyleSelector(r),
                    s = t.structureStyle;
                r.model.addSkeletonStructureStyle(s);
                const l = r.getCentralBranchView();
                s[n.CLASS_TYPE.CENTRAL_TOPIC] &&
                    l.model.changeStructure(s[n.CLASS_TYPE.CENTRAL_TOPIC]);
                const c = e.getContext().getThemeDataToCombine(),
                    d = Object(o.getInjectModule)(n.MODULE_NAME.SNOWBALL),
                    f = d.combineSkeletonTheme(c, t, i),
                    h = d.themeFragmentToStyleKeysToFix(t.theme);
                return null == a
                    ? void 0
                    : a.changeTheme(e, f, {
                          styleKeysToBeFix: h,
                          newSkeletonTheme: t,
                      });
            }
            changeColorTheme(e, t) {
                const i = e.getContext().getSheetView(),
                    r = this._getStyleSelector(i),
                    a = e.getContext().getThemeDataToCombine(),
                    s = Object(o.getInjectModule)(n.MODULE_NAME.SNOWBALL),
                    l = s.combineColorTheme(a, t),
                    c = s.themeFragmentToStyleKeysToFix(
                        s.preTreatColorThemeFragment(a, t),
                        !0
                    );
                return null == r
                    ? void 0
                    : r.changeTheme(e, l, {
                          styleKeysToBeFix: c,
                          newColorTheme: t,
                      });
            }
            fixUserStyle(e, t = {}) {
                const i = this._getStyleSelector(e);
                return i && i.fixUserStyle(e, t);
            }
            updateClassIntoTheme(e, t, i, n = {}) {
                const r = this._getStyleSelector(e.getContext().getSheetView());
                return r && r.updateClassIntoTheme(e, t, i, n);
            }
            removeClassFromTheme(e, t) {
                const i = this._getStyleSelector(e.getContext().getSheetView());
                return i && i.removeClassFromTheme(e, t);
            }
            removeStyleFromClass(e, t, i) {
                const n = this._getStyleSelector(e.getContext().getSheetView());
                return n && n.removeStyleFromClass(e, t, i);
            }
            getComputedStyle(e) {
                const t = this._getStyleSelector(e);
                return t && t.getComputedStyle(e);
            }
            _getStyleSelector(e, t = {}) {
                return Object(r.a)(e);
            }
            getFontInfo(e) {
                var t;
                const i = this._getStyleSelector(e);
                return null !== (t = i && i.getFontInfo(e)) && void 0 !== t
                    ? t
                    : {};
            }
            getTitleTextStyle(e) {
                return {
                    fontFamily: e.getStyleValue(n.STYLE_KEYS.FONT_FAMILY),
                    fontStyle: e.getStyleValue(n.STYLE_KEYS.FONT_STYLE),
                    fontWeight: e.getStyleValue(n.STYLE_KEYS.FONT_WEIGHT),
                    fontSize: e.getStyleValue(n.STYLE_KEYS.FONT_SIZE),
                    textColor: e.getStyleValue(n.STYLE_KEYS.TEXT_COLOR),
                    textAlign: e.getStyleValue(n.STYLE_KEYS.TEXT_ALIGN),
                    textBullet: e.getStyleValue(n.STYLE_KEYS.TEXT_BULLET),
                    textTransform: e.getStyleValue(n.STYLE_KEYS.TEXT_TRANSFORM),
                    textDecoration: e.getStyleValue(
                        n.STYLE_KEYS.TEXT_DECORATION
                    ),
                    textBackgroundColor: e.getStyleValue(
                        n.STYLE_KEYS.TEXT_BACKGROUND_COLOR
                    ),
                };
            }
        })();
    },
];
