export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return s;
        });
        var n = i(19),
            r = i(1),
            o = i(5),
            a = i(8);
        class s extends n.a {
            constructor(e) {
                (super(e),
                    (this.textColor = ''),
                    (this.textColorDirty = !0),
                    (this.attrs = {}),
                    (this.attrsToPack = {}),
                    (this.textPosition = { x: 0, y: 0 }),
                    (this.textSize = { width: 0, height: 0 }),
                    Object(a.makeObservable)(this, {
                        textColor: a.observable,
                        setTextColor: a.action,
                    }));
            }
            setTextColor(e) {
                this.textColor !== e &&
                    ((this.textColor = e),
                    (this.textColorDirty = !0),
                    this.invalidatePaint());
            }
            setTextDecoration(e) {
                this.textDecoration !== e &&
                    ((this.textDecoration = e),
                    (this.textDecorationDirty = !0),
                    this.invalidatePaint());
            }
            setTextAlign(e) {
                this.textAlign !== e &&
                    ((this.textAlign = e),
                    (this.textAlignDirty = !0),
                    this.invalidateLayout(),
                    this.invalidatePaint());
            }
            setTextTransform(e) {
                this.textTransform !== e &&
                    ((this.textTransform = e),
                    (this.textTransformDirty = !0),
                    this.invalidateLayout(),
                    this.invalidatePaint());
            }
            setFontSize(e) {
                ((e = parseInt(`${e}`)),
                    this.fontSize !== e &&
                        ((this.fontSize = e),
                        (this.fontSizeDirty = !0),
                        this.invalidateLayout(),
                        this.invalidatePaint()));
            }
            setFontWeight(e) {
                this.fontWeight !== e &&
                    ((this.fontWeight = e),
                    (this.fontWeightDirty = !0),
                    this.invalidateLayout(),
                    this.invalidatePaint());
            }
            setFontStyle(e) {
                this.fontStyle !== e &&
                    ((this.fontStyle = e),
                    (this.fontStyleDirty = !0),
                    this.invalidateLayout(),
                    this.invalidatePaint());
            }
            setFontFamily(e) {
                this.fontFamily !== e &&
                    ((this.fontFamily = e),
                    (this.fontFamilyDirty = !0),
                    this.invalidateLayout(),
                    this.invalidatePaint());
            }
            setText(e) {
                this.text !== e &&
                    ((this.textDirty = !0),
                    (this.text = e),
                    this.invalidateLayout(),
                    this.invalidatePaint());
            }
            setTextFn(e) {
                ((this.textFnDirty = !0),
                    (this.textFn = e),
                    this.invalidateLayout(),
                    this.invalidatePaint());
            }
            attr(e) {
                const t = r.subtract(this.attrs, e);
                Object.keys(t).length > 0 &&
                    ((this.attrsDirty = !0),
                    Object.assign(this.attrs, t),
                    Object.assign(this.attrsToPack, t),
                    this.invalidatePaint());
            }
            setTextPosition(e) {
                const t =
                    !this.textPosition ||
                    !(
                        this.textPosition.x === e.x &&
                        this.textPosition.y === e.y
                    );
                (t && (this.textPositionDirty = t),
                    (this.textPosition = Object.assign({}, e)),
                    this.textPositionDirty && this.invalidatePaint());
            }
            setTextSize(e) {
                const t = !this.textSize || !Object(o.o)(this.textSize, e);
                (t && (this.textSizeDirty = t),
                    (this.textSize = Object.assign({}, e)),
                    this.textSizeDirty &&
                        (this.invalidateLayout(), this.invalidatePaint()));
            }
        }
    },
];
