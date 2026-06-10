export default [
    function (e, t, i) {
        'use strict';
        var n = i(3),
            r = i(0),
            o = i(51),
            a = i(15),
            s = i(17),
            l = function (e, t, i, n) {
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
        let c = class extends o.a {
            get type() {
                return r.VIEW_TYPE.TOPIC_TITLE;
            }
            get figureType() {
                return r.FIGURE_TYPE.TOPIC_TITLE;
            }
            parent(e) {
                return void 0 === e ? super.parent() : super.parent(e);
            }
            afterAncestorChange() {
                const e = this.parent();
                if (!e) return;
                const t = e.parent();
                this.fontInfo = n.a.getFontInfo(t) || {};
                const i = e.model;
                (this.setText(i.get('title') || ''),
                    super.afterAncestorChange(),
                    this.initEventsListener());
            }
            protectedHandleText(e) {
                const t = this.parent();
                if (!t) return e;
                const i = t.model.getImageModel(),
                    o = t.model.getMathJaxInfo();
                if ('' === e && (i || o)) {
                    const e = Math.floor(
                        1.34 * parseInt(this.fontInfo.fontSize || 0)
                    );
                    return (
                        (this.bounds = {
                            x: 0,
                            y: e / 2,
                            width: -10,
                            height: 0,
                        }),
                        ''
                    );
                }
                const a = t.parent();
                return (
                    n.a.getClassName(a) !== r.CLASS_TYPE.SUB_TOPIC ||
                        e ||
                        (e = '    '),
                    e
                );
            }
            getSvg() {
                return this.figure.getContent();
            }
            getTextVectorPosition() {
                var e, t, i, n;
                const r =
                        null ===
                            (t =
                                null === (e = this.parent()) || void 0 === e
                                    ? void 0
                                    : e.parent()) || void 0 === t
                            ? void 0
                            : t.getRealPosition(),
                    o = a.b(
                        null === (i = this.parent()) || void 0 === i
                            ? void 0
                            : i.figure.topicContentPosition,
                        a.b(
                            this.figure.textPosition,
                            null === (n = this.parent()) || void 0 === n
                                ? void 0
                                : n.figure.topicInnerElementPosition
                        )
                    );
                return a.b(r, o);
            }
            getClientRect() {
                const e = this.getContext()
                        .getSVGView()
                        .getCoordinateTransfer()
                        .mindMapToViewport(this.getRealPosition()),
                    t = this.figure.size;
                return Object.assign(Object.assign({}, e), t);
            }
        };
        ((c = l(
            [
                (e) =>
                    class extends e {
                        afterAncestorChange() {
                            (super.afterAncestorChange(),
                                this.initRefreshTextAlignInfoListener());
                        }
                        initRefreshTextAlignInfoListener() {
                            var e;
                            const t =
                                null === (e = this.parent()) || void 0 === e
                                    ? void 0
                                    : e.parent();
                            t instanceof s.a &&
                                (this.listenTo(t, 'afterRealPosChange', () => {
                                    this.getContext().isAlignmentByLevelMode() &&
                                        this.refreshTextAlignInfo();
                                }),
                                this.listenTo(
                                    this.getContext(),
                                    r.EVENTS.ALIGNMENT_BY_LEVEL_STATUS_CHANGED,
                                    () => {
                                        this.refreshTextAlignInfo();
                                    }
                                ));
                        }
                        refreshTextAlignInfo() {
                            var e;
                            const t =
                                null === (e = this.parent()) || void 0 === e
                                    ? void 0
                                    : e.parent();
                            t instanceof s.a &&
                                this.figure.setTextAlign(
                                    n.a.getStyleValue(
                                        t,
                                        r.STYLE_KEYS.TEXT_ALIGN
                                    )
                                );
                        }
                    },
            ],
            c
        )),
            (t.a = c));
    },
];
