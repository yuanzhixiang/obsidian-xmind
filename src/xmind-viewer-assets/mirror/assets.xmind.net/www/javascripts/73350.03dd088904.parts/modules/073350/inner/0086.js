export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return a;
        });
        var n = i(0),
            r = i(9),
            o = i(51);
        class a extends o.a {
            get type() {
                return n.VIEW_TYPE.BOUNDARY_TITLE;
            }
            get figureType() {
                return n.FIGURE_TYPE.BOUNDARY_TITLE;
            }
            parent(e) {
                return void 0 === e ? super.parent() : super.parent(e);
            }
            afterAncestorChange() {
                const e = this.parent();
                e &&
                    (this.setText(e.model.get('title')),
                    this.initEventsListener(),
                    super.afterAncestorChange());
            }
            setText(e) {
                var t;
                super.setText(e);
                !!e &&
                !(null === (t = this.parent()) || void 0 === t
                    ? void 0
                    : t.shouldPreventTitle())
                    ? this.show()
                    : this.hide();
            }
            calcTitlePosition(e) {
                const t = this.parent(),
                    i =
                        parseInt(
                            `${null == t ? void 0 : t.figure.borderWidth}`
                        ) || 0;
                return {
                    x: r.a.BOUNDARY_TITLE.TO_BOUNDARY_BORDER_DISTANCE + i / 2,
                    y: -e.height + i / 2,
                };
            }
            setSize(e) {
                if (
                    (this.figure.setTextSize(e),
                    0 === e.width && 0 === e.height)
                )
                    this.figure.setSize(e);
                else {
                    const t = r.a.BOUNDARY_TITLE.CONTENT_PADDING_HORIZON,
                        i = r.a.BOUNDARY_TITLE.CONTENT_PADDING_VERTICAL,
                        n = {
                            width: e.width + 2 * t,
                            height: e.height + 2 * i,
                        },
                        o = this.calcTitlePosition(n);
                    (this.figure.setSize(n),
                        this.setPosition(o),
                        this.move(t, i),
                        Object.assign(this.bounds, o));
                }
                Object.assign(this.bounds, this.figure.size);
            }
            setPosition(e) {
                (this.figure.setPosition(e),
                    Object.assign(this.bounds, this.figure.position));
            }
            getTextVectorPosition() {
                var e, t;
                const i =
                    null !==
                        (t =
                            null === (e = this.parent()) || void 0 === e
                                ? void 0
                                : e.getRealPosition()) && void 0 !== t
                        ? t
                        : { x: 0, y: 0 };
                return {
                    x:
                        i.x +
                        this.figure.position.x +
                        this.figure.textPosition.x,
                    y:
                        i.y +
                        this.figure.position.y +
                        this.figure.textPosition.y,
                };
            }
            getClientRect() {
                const e = this.getRealPosition(),
                    t = this.editDomain()
                        .getCoordinateTransfer()
                        .mindMapToViewport(e);
                return Object.assign(
                    Object.assign({}, t),
                    this.figure.textSize
                );
            }
        }
    },
];
