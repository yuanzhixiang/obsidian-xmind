export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return d;
        });
        var n = i(0),
            r = i(21),
            o = i(18),
            a = i(100),
            s = i(9),
            l = i(4),
            c = i(1);
        class d extends r.a {
            constructor(e) {
                var t, i, n, r;
                (super(),
                    (this.isSelected = !1),
                    (this.figure = o.a.createFigure(this)));
                const s =
                    null ===
                        (i =
                            null === (t = e.content) || void 0 === t
                                ? void 0
                                : t.content) || void 0 === i
                        ? void 0
                        : i.trim();
                (s && this.figure.setText(s),
                    (this.s$mathJaxOutPutNestedSVG =
                        this.figure.renderWorker.s$mathJaxOutPutNestedSVG),
                    (this.resizeBox = new a.a(this)),
                    this.resizeBox.parent(this),
                    (null === (n = e.content) || void 0 === n
                        ? void 0
                        : n.width) &&
                        this.figure.setFinalWidth(e.content.width),
                    (null === (r = e.content) || void 0 === r
                        ? void 0
                        : r.align) && this.figure.setAlign(e.content.align),
                    this.initEventsListener());
            }
            get type() {
                return n.VIEW_TYPE.MATH_JAX;
            }
            get figureType() {
                return n.FIGURE_TYPE.MATH_JAX;
            }
            initEventsListener() {
                this.listenTo(this.resizeBox, 'resize', (e) => {
                    var t;
                    null === (t = this.parent()) ||
                        void 0 === t ||
                        t.model.updateMathJaxWidth(e.width);
                });
            }
            afterAncestorChange() {
                this.addAutoRun(() => {
                    this.refreshColor();
                });
            }
            parent(e) {
                return void 0 === e ? super.parent() : super.parent(e);
            }
            move(e, t) {
                this.figure.setPosition({ x: e, y: t });
            }
            select() {
                ((this.isSelected = !0), this.resizeBox.active());
            }
            deselect() {
                ((this.isSelected = !1), this.resizeBox.hide());
            }
            refreshColor() {
                const e = this.parent();
                if (!e) return;
                const t = e.figure.textColor;
                t && this.figure.setTextColor(t);
            }
            refreshFinalWidth() {
                var e, t, i;
                const n = this.parent();
                if (!n) return;
                const r =
                    null !==
                        (i =
                            null ===
                                (t =
                                    null === (e = n.model.getMathJaxInfo()) ||
                                    void 0 === e
                                        ? void 0
                                        : e.content) || void 0 === t
                                ? void 0
                                : t.width) && void 0 !== i
                        ? i
                        : this.figure.originalSize.width;
                this.figure.setFinalWidth(r);
            }
            refreshAlign() {
                var e, t;
                const i = this.parent();
                if (!i) return;
                const n =
                    null ===
                        (t =
                            null === (e = i.model.getMathJaxInfo()) ||
                            void 0 === e
                                ? void 0
                                : e.content) || void 0 === t
                        ? void 0
                        : t.align;
                n && this.figure.setAlign(n);
            }
            getResizeMinWidth() {
                return (
                    (this.figure.originalSize.width /
                        s.a.MATH_JAX_INIT_SIZE_PLUS_MULTIPLE) *
                    0.5
                );
            }
            getRealPosition() {
                const e = Object.assign({}, this.figure.position),
                    t = this.parent(),
                    i = null == t ? void 0 : t.parent(),
                    n = i && Object(c.getTopicShape)(i),
                    r = null == i ? void 0 : i.getRealPosition(),
                    o = null == t ? void 0 : t.contentBounds;
                if (
                    (o && ((e.x += o.x), (e.y += o.y)),
                    r && ((e.x += r.x), (e.y += r.y)),
                    n && n.getRealContentAreaOffset)
                ) {
                    const { x: t, y: r } = n.getRealContentAreaOffset(i);
                    ((e.x += t), (e.y += r));
                }
                return e;
            }
            getClientRect() {
                const e = this.getRealPosition(),
                    t = this.getContext()
                        .getSVGView()
                        .getCoordinateTransfer()
                        .mindMapToViewport(e),
                    i = this.figure.originalSize;
                return {
                    x: t.x,
                    y: t.y,
                    width: this.figure.finalWidth,
                    height: (this.figure.finalWidth * i.height) / i.width,
                };
            }
            createStandColorSVG(e) {
                var t, i, n;
                const r = new l.a.Nested();
                if (
                    (r.attr({
                        xmlns: 'http://www.w3.org/2000/svg',
                        'xmlns:xlink': 'http://www.w3.org/1999/xlink',
                    }),
                    0 !== this.figure.errorCode)
                )
                    r.attr({
                        viewBox: this.figure.SVGOutput.getAttribute('viewBox'),
                        width: this.figure.size.width,
                        height: this.figure.size.height,
                    });
                else {
                    const o = this.figure.SVGOutput.viewBox.baseVal,
                        a =
                            (o.width * s.a.MATH_JAX_IMAGE_PADDING) /
                            this.figure.size.width,
                        c = e
                            ? null === (t = this.parent()) || void 0 === t
                                ? void 0
                                : t.figure.fillColor
                            : '#fff',
                        d = new l.a.Rect().attr({
                            fill: c,
                            width: o.width + 2 * a,
                            height: o.height + 2 * a,
                            transform: `translate(${o.x - a} ${o.y - a})`,
                        }),
                        f = e
                            ? null ===
                                  (n =
                                      null === (i = this.parent()) ||
                                      void 0 === i
                                          ? void 0
                                          : i.titleView) || void 0 === n
                                ? void 0
                                : n.figure.textColor
                            : '#000';
                    (r.attr({
                        fill: f,
                        viewBox: `${o.x - a} ${o.y - a} ${o.width + 2 * a} ${o.height + 2 * a}`,
                        width:
                            this.figure.size.width +
                            2 * s.a.MATH_JAX_IMAGE_PADDING,
                        height:
                            this.figure.size.height +
                            2 * s.a.MATH_JAX_IMAGE_PADDING,
                    }),
                        r.node.prepend(d.node));
                }
                return (
                    Array.from(this.figure.SVGOutput.children).forEach((e) => {
                        r.node.append(e.cloneNode(!0));
                    }),
                    r
                );
            }
            createDragView() {
                const e = this.getContext()
                    .getSheetView()
                    .getDragViewContainer();
                e.put(this.createStandColorSVG());
                const t = this.getRealPosition();
                return (e.move(t.x, t.y), e);
            }
            remove() {
                (this.stopListening(), this.figure.dispose());
                const e = this.getContext().getModule(n.MODULE_NAME.SELECTION);
                return (
                    e && e.removeFromSelection(this),
                    this.resizeBox && this.resizeBox.remove(),
                    this.clearReactions(),
                    this.parent(null),
                    this
                );
            }
        }
    },
];
