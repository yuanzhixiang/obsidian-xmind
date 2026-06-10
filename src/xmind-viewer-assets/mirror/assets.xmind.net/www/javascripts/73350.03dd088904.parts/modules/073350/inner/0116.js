export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return f;
        });
        var n = i(11),
            r = i(43),
            o = i(0),
            a = i(18),
            s = i(3),
            l = i(89),
            c = i(1);
        const d = {
            stroke: 'rgb(46, 189, 255)',
            'stroke-width': '1px',
            fill: 'rgb(46, 189, 255)',
            'fill-opacity': '0.3',
            display: 'none',
        };
        class f extends r.a {
            constructor(e) {
                (super(),
                    (this.bounds = {
                        x: 0,
                        y: 0,
                        width: 0,
                        height: 0,
                    }),
                    (this._hovering = !1),
                    (this._stable = !1),
                    this.delegateEvents(l.eventHandlers),
                    (this.figure = a.a.createFigure(this)),
                    (this.markerId = e));
            }
            get type() {
                return o.VIEW_TYPE.MARKER;
            }
            get figureType() {
                return o.FIGURE_TYPE.MARKER;
            }
            async afterAncestorChange() {
                var e;
                if (!this.getContext()) return;
                const t =
                    null === (e = this.parent()) || void 0 === e
                        ? void 0
                        : e.parent();
                if (!t) return;
                const i = ((e) => {
                    const t = e.parent(),
                        i = s.a.getStyleValue(t, o.STYLE_KEYS.FONT_SIZE) || 0;
                    return Number.parseInt(i);
                })(t);
                this.setIconSize({ width: i, height: i });
                const { markerModule: n } = Object(c.getInjectModule)(
                        o.MODULE_NAME.SNOWBIRD
                    ),
                    r = n.getMarkerInfoById(this.markerId);
                let a;
                ((a = (null == r ? void 0 : r.isUserMarker)
                    ? await this.config(o.CONFIG.XAP_LOADER)(r.resource)
                    : this.getContext().getFileRealResource(
                          null == r ? void 0 : r.resource
                      )),
                    this.figure.setIconUrl(a));
            }
            parent(e) {
                return void 0 === e ? super.parent() : super.parent(e);
            }
            setIconSize(e) {
                (this.figure.setSize(e),
                    (this.bounds = {
                        x: 0,
                        y: 0,
                        width: e.width,
                        height: e.height,
                    }));
                const t = n.a.generateRect(this.bounds, 0, 2, 1);
                this.figure.setSelectionArr(Object.assign({ d: t }, d));
            }
            setStable(e) {
                this._stable = e;
            }
            getSvg() {
                return this.figure.getContent();
            }
            getMarkerId() {
                return this.markerId;
            }
            getBranchView() {
                const e = this.parent(),
                    t = e && e.parent();
                return t && t.parent();
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
