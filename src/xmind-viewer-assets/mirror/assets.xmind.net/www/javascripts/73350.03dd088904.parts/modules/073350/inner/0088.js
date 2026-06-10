export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return s;
        });
        var n = i(51),
            r = i(0),
            o = i(29);
        const a = {
            fontSize: 12,
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 'normal',
            fontStyle: 'normal',
            textColor: '#000',
        };
        class s extends n.a {
            constructor(e, t, i, n, r) {
                (super(),
                    (this.bounds = {
                        x: 0,
                        y: 0,
                        width: 0,
                        height: 0,
                    }),
                    (this.isSelected = !1),
                    (this._cells = t),
                    (this.fontInfo = Object.assign({}, a, i)),
                    (this.marginInfo = Object.assign({}, n)),
                    (this.wrapperGroup = this.figure.getContent()),
                    (this.matrixHeadBranchView = r),
                    this.setText(e),
                    this.initEventsListener());
            }
            get type() {
                return r.VIEW_TYPE.MATRIX_LABEL;
            }
            get figureType() {
                return r.FIGURE_TYPE.MATRIX_LABEL;
            }
            parent(e) {
                return void 0 === e ? super.parent() : super.parent(e);
            }
            initEventsListener() {
                this.addAutoRun(() => {
                    var e;
                    this.figure.setTextColor(
                        null ===
                            (e =
                                this.matrixHeadBranchView.topicView
                                    .titleView) || void 0 === e
                            ? void 0
                            : e.figure.textColor
                    );
                });
            }
            afterAncestorChange() {
                this.parent() && this.refreshFontInfo(this.fontInfo);
            }
            setTextColor(e) {}
            getStyleValue(e) {
                switch (e) {
                    case r.STYLE_KEYS.TEXT_COLOR:
                        return this.figure.textColor;
                    case r.STYLE_KEYS.FONT_FAMILY:
                        return this.figure.fontFamily;
                    case r.STYLE_KEYS.FONT_SIZE:
                        return this.figure.fontSize;
                    case r.STYLE_KEYS.FONT_STYLE:
                        return this.figure.fontStyle;
                    case r.STYLE_KEYS.FONT_WEIGHT:
                        return this.figure.fontWeight;
                    case r.STYLE_KEYS.FILL_COLOR:
                        return this._getCellView().figure.fillColor;
                }
            }
            removeSelf() {
                const e = this.editDomain();
                ((null == e ? void 0 : e.selectionManager) &&
                    e.selectionManager.removeFromSelection(this),
                    (this._cells = []),
                    this.clearReactions(),
                    this.figure.dispose(),
                    this.parent(null));
            }
            setPosition(e) {
                this.wrapperGroup.translate(e.x, e.y);
            }
            getEditContent() {
                return (
                    this.text ||
                    this.getContext().getTranslatedText('LABEL_TITLE')
                );
            }
            getTextClientStyle() {
                return this.fontInfo;
            }
            getTextClientBounds() {
                const e = this.getTextSvg().node.getBoundingClientRect();
                return (
                    (e.width = this.bounds.width),
                    (e.height = this.bounds.height),
                    e
                );
            }
            saveEdit(e) {
                var t;
                const i = this.text;
                this._cells.forEach((t) => {
                    t.items.forEach((t) => {
                        t.model.changeLabel(e);
                    });
                });
                const n = this.parent();
                if (n) {
                    null === (t = n.columnMap) ||
                        void 0 === t ||
                        t.setKey(i, e);
                    const r = n.columnMap.keyArr.reduce(
                            (e, t) => (t === e[e.length - 1] ? e : [...e, t]),
                            []
                        ),
                        o = n.parent();
                    (null == o || o.model.setMatrixLabelInfos(r),
                        null == o || o.layout());
                }
            }
            getSvg() {
                return this.wrapperGroup;
            }
            setProxy(e) {
                this._proxy = e;
            }
            getProxy() {
                var e;
                return null !== (e = this._proxy) && void 0 !== e ? e : null;
            }
            deleteProxy() {
                delete this._proxy;
            }
            _getCellView() {
                const e = this.parent(),
                    t = e.getLabelViewList().indexOf(this);
                return Object(o.f)(null == e ? void 0 : e.matrixGrid)[t].view;
            }
            createDragView() {
                return this._getCellView().createDragView();
            }
            getRealPosition() {
                return this._getCellView().getRealPosition();
            }
            getClientRect() {
                const e = this._getCellView(),
                    { bounds: t } = e,
                    i = this.getRealPosition(),
                    n = this.editDomain()
                        .getCoordinateTransfer()
                        .mindMapToViewport(i);
                return {
                    x: n.x,
                    y: n.y,
                    width: t.width,
                    height: t.height,
                };
            }
            removeColumnItems() {
                this._cells.forEach((e) => {
                    e.items.forEach((e) => {
                        e.model.removeSelf();
                    });
                });
            }
            isEmpty() {
                let e = 0;
                return (
                    this._cells.forEach((t) => {
                        t.items.forEach(() => {
                            e++;
                        });
                    }),
                    0 === e
                );
            }
            select() {
                var e;
                ((this.isSelected = !0),
                    null === (e = this.getProxy()) ||
                        void 0 === e ||
                        e.displaySelect());
            }
            deselect() {
                var e;
                ((this.isSelected = !1),
                    null === (e = this.getProxy()) ||
                        void 0 === e ||
                        e.displayDeselect());
            }
        }
    },
];
