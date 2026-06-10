export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return c;
        });
        var n = i(18),
            r = i(0),
            o = i(1),
            a = i(21);
        const s = {
                fontSize: 12,
                fontFamily: r.COMMON_FONT_FAMILY,
            },
            l = 38;
        class c extends a.a {
            constructor(e, t) {
                (super(),
                    (this.bounds = {
                        x: 0,
                        y: 0,
                        width: 0,
                        height: 0,
                    }),
                    (this.parentWidth = 0),
                    (this.labelUnitArr = []),
                    (this._labels = Array.from(
                        new Set(e.map((e) => e.trim()))
                    )),
                    this.parent(t),
                    (this.figure = n.a.createFigure(this)),
                    (this.s$labelsCardGroup = this.figure.getContent()));
            }
            get type() {
                return r.VIEW_TYPE.LABEL;
            }
            get figureType() {
                return r.FIGURE_TYPE.LABELS;
            }
            setParentWidth(e) {
                ((this.parentWidth = e), this.render());
            }
            render() {
                (this.labelUnitArr.forEach((e) => e.remove()),
                    (this.labelUnitArr = []));
                let e = !1;
                let t = 1,
                    i = Math.max(this.parentWidth, l),
                    n = this._labels.length;
                this._labels.forEach((r, a) => {
                    if (e) return !1;
                    r = r.replace(/\n|\r/g, '');
                    let c = Object(o.getTextSize)(r, s).width + 12;
                    (c > this.parentWidth && (c = this.parentWidth),
                        c < l && (c = l));
                    let f = Object(o.wrapTextWithEllipsis)(r, s, c - 12);
                    i - 4 < c &&
                        i !== c &&
                        i !== this.parentWidth &&
                        ((t += 1), (i = Math.max(this.parentWidth, l)));
                    let h = !1;
                    3 === t &&
                        n > 1 &&
                        50 + c > i &&
                        ((e = !0),
                        (h = !0),
                        (f = `${n}+`),
                        (r = [...this._labels].splice(a).join(', ')),
                        (c = Object(o.getTextSize)(f, s).width + 12));
                    const p = new d(r, f, c, this, h);
                    (this.labelUnitArr.push(p),
                        p.move(Math.max(this.parentWidth, l) - i, 22 * (t - 1)),
                        (i = i - c - 4),
                        (n -= 1));
                });
                const r = (this.bounds.width = Math.max(this.parentWidth, l)),
                    a = (this.bounds.height = 20 * t + 2 * (t - 1));
                return (this.figure.setSize({ width: r, height: a }), this);
            }
            move(e, t) {
                this.figure.setPosition({ x: e, y: t });
            }
            getSvg() {
                return this.s$labelsCardGroup;
            }
            remove() {
                return (
                    this.stopListening(),
                    this.labelUnitArr.forEach((e) => e.remove()),
                    (this.labelUnitArr = []),
                    this.figure.dispose(),
                    this.parent(null),
                    this
                );
            }
        }
        class d extends a.a {
            constructor(e, t, i, r, o) {
                (super(),
                    (this.figure = n.a.createFigure(this)),
                    this.parent(r),
                    (this.originLabel = e),
                    (this.isSpecialUnit = o),
                    (this.s$labelUnitGroup = this.figure.getContent()),
                    (this.s$labelUnitbackgound =
                        this.figure.renderWorker.s$labelUnitbackgound),
                    (this.s$labelUnitText =
                        this.figure.renderWorker.s$labelUnitText),
                    this.figure.setText(t),
                    this.figure.setTooltip(e),
                    this.figure.setSize({ width: i, height: 20 }));
            }
            get type() {
                return r.VIEW_TYPE.LABELUNIT;
            }
            get figureType() {
                return r.FIGURE_TYPE.LABEL;
            }
            move(e, t) {
                this.figure.setPosition({ x: e, y: t });
            }
            getSvg() {
                return this.s$labelUnitGroup;
            }
            remove() {
                return (
                    this.stopListening(),
                    this.figure.dispose(),
                    this.parent(null),
                    this
                );
            }
        }
    },
];
