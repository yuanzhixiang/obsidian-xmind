export default [
    function (e, t, i) {
        'use strict';
        (function (e) {
            i.d(t, 'a', function () {
                return l;
            });
            var n = i(9),
                r = i(4);
            const { EXT_RADIUS: o, COL_RADIUS: a } = n.a,
                s = Math.max(o, a);
            class l {
                constructor(e) {
                    ((this.figure = e), this.initSVGStructure());
                }
                initSVGStructure() {
                    ((this.svg = new r.a.G().style('cursor', 'hand').hide()),
                        'skip' === e.env.SELECT_BOX &&
                            this.svg.data('immunity', 'ecg'),
                        this.figure.viewController.setElement(this.svg.node));
                    const t = `M 2, ${a} L ${2 * a - 2}, ${a}`;
                    ((this.foldG = this.svg.put(new r.a.G())),
                        (this.circleFill = this.foldG.circle(2 * a)),
                        (this.ecCircle = this.foldG.circle(2 * a).fill('none')),
                        (this.path = this.foldG
                            .put(new r.a.Path())
                            .attr({ d: t })),
                        (this.extG = this.svg.put(new r.a.G())),
                        (this.connectPath = this.extG
                            .put(new r.a.Line(0, 0, -6, 9))
                            .attr({ 'stroke-width': '0' })),
                        (this.EcircleFill = this.extG.circle(2 * o)),
                        (this.EecCircle = this.extG
                            .circle(2 * o)
                            .fill('none')
                            .stroke({ width: 1 })),
                        (this.Etext = this.extG.put(new r.a.Text())),
                        (this._s$actionArea = this.svg
                            .circle(3 * s)
                            .data('name', 'action-area')
                            .fill('none')),
                        (this._s$actionArea.node.style.pointerEvents =
                            'visible'),
                        (this._svgHoverArea = new r.a.G()
                            .rect(0, 0)
                            .data('name', 'collapse-extend-hover-area')
                            .opacity(0)));
                }
                work() {
                    const e = this.figure.getParent();
                    if (!e) return;
                    if (
                        (this.figure.isCollapsedDirty &&
                            (this.figure.isCollapsed
                                ? (this.svg.data('name', 'collapse-folded'),
                                  this.extG.show(),
                                  this._s$actionArea.x(-s / 2).y(-s / 2 - 1),
                                  this.figure.textDirty &&
                                      (this.Etext.text(this.figure.text),
                                      (this.figure.textDirty = !1)),
                                  this.figure.textFontObjDirty &&
                                      (this.Etext.attr(
                                          this.figure.textFontObjToPack
                                      ),
                                      (this.figure.textFontObjToPack = {}),
                                      (this.figure.textFontObjDirty = !1)),
                                  this.Etext.translate(
                                      this.figure.textTranslatePosition.x,
                                      this.figure.textTranslatePosition.y
                                  ))
                                : (this.svg.data('name', 'collapse-extended'),
                                  this.extG.hide(),
                                  this._s$actionArea.x(-s / 2).y(-s / 2),
                                  this._s$actionArea.show()),
                            (this.figure.isCollapsedDirty = !1)),
                        this.figure.backgroundColorDirty &&
                            (this.circleFill.fill(this.figure.backgroundColor),
                            this.EcircleFill.fill(this.figure.backgroundColor),
                            (this.figure.backgroundColorDirty = !1)),
                        this.figure.lineColorDirty &&
                            (this.ecCircle.stroke(this.figure.lineColor),
                            this.path.stroke(this.figure.lineColor),
                            this.EecCircle.stroke(this.figure.lineColor),
                            this.Etext.attr({
                                fill: this.figure.lineColor,
                            }),
                            this.connectPath.stroke(this.figure.lineColor),
                            (this.figure.lineColorDirty = !1)),
                        this.figure.lineWidthDirty &&
                            (this.connectPath.attr({
                                'stroke-width': this.figure.lineWidth,
                            }),
                            (this.figure.lineWidthDirty = !1)),
                        this.figure.fillColorDirty &&
                            (this.ecCircle.attr({
                                fill: this.figure.fillColor,
                            }),
                            this.EecCircle.attr({
                                fill: this.figure.fillColor,
                            }),
                            (this.figure.fillColorDirty = !1)),
                        this.figure.fillOpacityDirty &&
                            (this.ecCircle.attr({
                                'fill-opacity': this.figure.fillOpacity,
                            }),
                            this.EecCircle.attr({
                                'fill-opacity': this.figure.fillOpacity,
                            }),
                            (this.figure.fillOpacityDirty = !1)),
                        this.figure.positionDirty &&
                            (this.svg.translate(
                                this.figure.position.x,
                                this.figure.position.y
                            ),
                            (this.figure.positionDirty = !1)),
                        this.figure.connectPathAttrDirty &&
                            (this.connectPath.attr(
                                this.figure.connectPathAttrToPack
                            ),
                            (this.figure.connectPathAttrToPack = {}),
                            (this.figure.connectPathAttrDirty = !1)),
                        this.figure.collapseExtendVisibleDirty &&
                            (this.figure.collapseExtendVisible
                                ? this.svg.show()
                                : this.svg.hide(),
                            (this.figure.collapseExtendVisibleDirty = !1)),
                        this.figure.collapseBtnVisibleDirty)
                    ) {
                        if (this.figure.collapseBtnVisible) {
                            const e = 120;
                            (this.foldG
                                .animate(e, '-')
                                .scale(1, 1)
                                .translate(0, 0),
                                this._s$actionArea.show());
                        } else {
                            const e = 1;
                            (this.foldG
                                .animate(e, '-')
                                .scale(0.001, 0.001)
                                .translate(a, a),
                                !this.figure.isCollapsed &&
                                    this._s$actionArea.hide());
                        }
                        this.figure.collapseBtnVisibleDirty = !1;
                    }
                    (this.figure.hoverAreaVisibleDirty &&
                        (this.figure.hoverAreaVisible
                            ? this._svgHoverArea.show()
                            : this._svgHoverArea.hide(),
                        (this.figure.hoverAreaVisibleDirty = !1)),
                        this.figure.hoverAreaAttrDirty &&
                            (this._svgHoverArea.attr(
                                this.figure.hoverAreaAttrToPack
                            ),
                            (this.hoverAreaAttrToPack = {}),
                            (this.figure.hoverAreaAttrDirty = !1)),
                        this.figure.isVisibleDirty &&
                            (this.figure.isVisible
                                ? this.svg.show()
                                : this.svg.hide(),
                            (this.figure.isVisibleDirty = !1)),
                        e.viewController.parent().isMatrixBranch() &&
                            (this.figure.isCollapsed
                                ? this.figure.collapseExtendVisible &&
                                  (this._s$actionArea.show(),
                                  this._svgHoverArea.show())
                                : (this._s$actionArea.hide(),
                                  this._svgHoverArea.hide())));
                    e.renderWorker.appendChild('collapseextend', this.svg);
                    const t = e.getParent();
                    if (t) {
                        (t.renderWorker.appendChild(
                            'collapseextend',
                            this._svgHoverArea
                        ),
                            this._svgHoverArea.back());
                    }
                }
                appendChild(e, t, i) {}
                getContent() {
                    return this.svg;
                }
                dispose() {
                    this.svg.remove();
                }
            }
        }).call(this, i(45));
    },
];
