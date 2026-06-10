export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return s;
        });
        var n = i(3),
            r = i(0),
            o = i(51),
            a = i(87);
        class s extends o.a {
            constructor() {
                (super(...arguments),
                    (this.isVisible = !0),
                    (this.isForcedInvisible = !1));
            }
            get type() {
                return r.VIEW_TYPE.RELATIONSHIP_TITLE;
            }
            get figureType() {
                return r.FIGURE_TYPE.RELATIONSHIP_TITLE;
            }
            parent(e) {
                return void 0 === e ? super.parent() : super.parent(e);
            }
            afterAncestorChange() {
                const e = this.parent();
                (null == e ? void 0 : e.parent()) &&
                    (this.setText(e.model.get('title')),
                    this.initEventsListener(),
                    super.afterAncestorChange.bind(this)());
            }
            protectedHandleText(e) {
                return (
                    e ||
                    this.getContext().getTranslatedText(
                        'DEFAULT_RELATIONSHIP_TITLE'
                    )
                );
            }
            setVisible(e) {
                ((this.isVisible = e),
                    this.figure.setVisible(e && !this.isForcedInvisible));
            }
            refreshStyles() {
                const e = this.parent();
                this.refreshFontInfo(n.a.getFontInfo(e) || {});
            }
            setText(e) {
                var t;
                ((e = this.protectedHandleText(e)),
                    (this.text = e),
                    this.figure.setText(e),
                    this.figure instanceof a.a &&
                        this.figure.setIsDefaultTitle(
                            !(null === (t = this.parent()) || void 0 === t
                                ? void 0
                                : t.model.get('title'))
                        ));
            }
            getTextVectorPosition() {
                return Object.assign({}, this.figure.textPosition);
            }
            getRealPosition() {
                return {
                    x: this.figure.textPosition.x - this.bounds.width / 2,
                    y: this.figure.textPosition.y,
                };
            }
            getClientRect() {
                return Object.assign(
                    {
                        width: this.bounds.width,
                        height: this.bounds.height,
                    },
                    this.editDomain()
                        .getCoordinateTransfer()
                        .mindMapToViewport(this.getRealPosition())
                );
            }
        }
    },
];
