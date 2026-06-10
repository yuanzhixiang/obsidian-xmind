export default [
    function (e, t, i) {
        'use strict';
        var n = i(18),
            r = i(21),
            o = i(0),
            a = function (e, t, i, n) {
                var r,
                    o = arguments.length,
                    a =
                        o < 3
                            ? t
                            : null === n
                              ? (n = Object.getOwnPropertyDescriptor(t, i))
                              : n;
                if (
                    'object' == typeof Reflect &&
                    'function' == typeof Reflect.decorate
                )
                    a = Reflect.decorate(e, t, i, n);
                else
                    for (var s = e.length - 1; s >= 0; s--)
                        (r = e[s]) &&
                            (a =
                                (o < 3 ? r(a) : o > 3 ? r(t, i, a) : r(t, i)) ||
                                a);
                return (o > 3 && a && Object.defineProperty(t, i, a), a);
            };
        let s = class extends r.a {
            constructor() {
                (super(),
                    (this.text = null),
                    (this.bounds = {
                        x: 0,
                        y: 0,
                        width: 0,
                        height: 0,
                    }),
                    (this.figure = n.a.createFigure(this)),
                    (this.textSvg = this.figure.renderWorker.titleText));
            }
            get type() {
                return o.VIEW_TYPE.TEXT;
            }
            refreshFontInfo(e) {
                (e.color && this.figure.setTextColor(e.color),
                    e.fontFamily && this.figure.setFontFamily(e.fontFamily),
                    e.fontSize && this.figure.setFontSize(e.fontSize),
                    e.fontStyle && this.figure.setFontStyle(e.fontStyle),
                    e.fontWeight && this.figure.setFontWeight(e.fontWeight),
                    e.textDecoration &&
                        this.figure.setTextDecoration(e.textDecoration),
                    e.textAlign && this.figure.setTextAlign(e.textAlign),
                    e.textTransform &&
                        this.figure.setTextTransform(e.textTransform));
            }
            setText(e) {
                ((this.text = this.protectedHandleText(e)),
                    this.figure.setText(this.text));
            }
            protectedHandleText(e) {
                return e;
            }
            setSize(e) {
                (this.figure.setSize(e),
                    this.figure.setTextSize(e),
                    (this.bounds = Object.assign(
                        Object.assign({}, this.figure.position),
                        e
                    )));
            }
            getTextSvg() {
                return this.textSvg;
            }
            move(e, t) {
                const { textSize: i, textAlign: n } = this.figure;
                (n === o.TEXTALIGN.CENTER && (e += i.width / 2),
                    n === o.TEXTALIGN.RIGHT && (e += i.width),
                    this.figure.setTextPosition({ x: e, y: t }));
            }
            hide() {
                this.figure.attr({ opacity: 0 });
            }
            show() {
                this.figure.attr({ opacity: 1 });
            }
            isUnedited() {
                var e, t;
                return null ===
                    (t =
                        null === (e = this.parent()) || void 0 === e
                            ? void 0
                            : e.model) || void 0 === t
                    ? void 0
                    : t.isTitleUnedited();
            }
            getTextVectorPosition() {
                throw new Error('should implement this method');
            }
            getRealPosition() {
                const e = this.getTextVectorPosition(),
                    { textSize: t, textAlign: i } = this.figure;
                return (
                    i === o.TEXTALIGN.CENTER
                        ? (e.x -= t.width / 2)
                        : i === o.TEXTALIGN.RIGHT && (e.x -= t.width),
                    e
                );
            }
            remove() {
                return (
                    this.stopListening(),
                    this.figure.dispose(),
                    this.clearReactions(),
                    this.parent(null),
                    this
                );
            }
        };
        ((s = a(
            [
                (e) =>
                    class extends e {
                        initEventsListener() {
                            super.initEventsListener();
                            const e = this.parent();
                            this.addAutoRun(() => {
                                (this.figure.setTextColor(e.figure.textColor),
                                    this.figure.setTextDecoration(
                                        e.figure.textDecoration
                                    ),
                                    this.figure.setTextAlign(
                                        e.figure.textAlign
                                    ),
                                    this.figure.setTextTransform(
                                        e.figure.textTransform
                                    ),
                                    this.figure.setFontSize(e.figure.fontSize),
                                    this.figure.setFontFamily(
                                        e.figure.fontFamily
                                    ),
                                    this.figure.setFontStyle(
                                        e.figure.fontStyle
                                    ),
                                    this.figure.setFontWeight(
                                        e.figure.fontWeight
                                    ));
                            });
                        }
                    },
            ],
            s
        )),
            (t.a = s));
    },
];
