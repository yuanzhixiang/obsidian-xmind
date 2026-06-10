export default [
    function (e, t, i) {
        'use strict';
        (function (e) {
            i.d(t, 'a', function () {
                return c;
            });
            var n = i(3),
                r = i(0),
                o = i(116),
                a = i(21),
                s = i(18),
                l = i(1);
            class c extends a.a {
                constructor(t) {
                    if (
                        (super(),
                        this.parent(t),
                        (this.figure = s.a.createFigure(this)),
                        (this.markerViewMap = new Map()),
                        'readonly' !== e.env.SB_MODE)
                    ) {
                        const e = t.model;
                        (this.listenTo(
                            e,
                            e.modelEvents.MARKER_ADDED,
                            this.rebuildMarkers
                        ),
                            this.listenTo(
                                e,
                                e.modelEvents.MARKER_REMOVED,
                                this.rebuildMarkers
                            ),
                            this.listenTo(
                                e,
                                e.modelEvents.MARKER_CHANGED,
                                this.rebuildMarkers
                            ),
                            this.listenTo(e, 'changeStyle', (e) => {
                                e === r.STYLE_KEYS.FONT_SIZE &&
                                    this.refreshMarkerSize();
                            }));
                    }
                    this._initMarkers();
                }
                get type() {
                    return r.VIEW_TYPE.MARKERS;
                }
                get figureType() {
                    return r.FIGURE_TYPE.MARKERS;
                }
                parent(e) {
                    return void 0 === e ? super.parent() : super.parent(e);
                }
                refreshMarkerSize() {
                    if (!this.markerIdList) return;
                    const e = this.parent();
                    if (e) {
                        const t = ((e) => {
                            const t = e.parent(),
                                i =
                                    n.a.getStyleValue(
                                        t,
                                        r.STYLE_KEYS.FONT_SIZE
                                    ) || 0;
                            return Number.parseInt(i);
                        })(e);
                        this.markerIdList.forEach((e) => {
                            var i;
                            return null === (i = this.markerViewMap.get(e)) ||
                                void 0 === i
                                ? void 0
                                : i.setIconSize({
                                      width: t,
                                      height: t,
                                  });
                        });
                    }
                }
                rebuildMarkers() {
                    var e;
                    (null === (e = this.markerIdList) ||
                        void 0 === e ||
                        e.forEach((e) => {
                            var t;
                            return null === (t = this.markerViewMap.get(e)) ||
                                void 0 === t
                                ? void 0
                                : t.remove();
                        }),
                        this._initMarkers());
                }
                _initMarkers() {
                    var e, t;
                    const i =
                        null === (e = this.parent()) || void 0 === e
                            ? void 0
                            : e.model.getMarkersData();
                    if (!(null == i ? void 0 : i.length))
                        return this._setMarkerIdList([]);
                    const { markerModule: n } = Object(l.getInjectModule)(
                            r.MODULE_NAME.SNOWBIRD
                        ),
                        a = i.map((e) => e.markerId);
                    (a.sort((e, t) => n.indexOf(e) - n.indexOf(t)),
                        this._setMarkerIdList(a));
                    for (let e = a.length - 1; e >= 0; e--) {
                        const t = a[e],
                            i = new o.a(t);
                        (i.parent(this), this.markerViewMap.set(t, i));
                    }
                    const s = a[0];
                    null === (t = this.markerViewMap.get(s)) ||
                        void 0 === t ||
                        t.setStable(!0);
                }
                _setMarkerIdList(e) {
                    ((this.markerIdList = e), this.figure.setMarkerIdList(e));
                }
                remove() {
                    var e;
                    return (
                        this.stopListening(),
                        null === (e = this.markerIdList) ||
                            void 0 === e ||
                            e.forEach((e) => {
                                var t;
                                return null ===
                                    (t = this.markerViewMap.get(e)) ||
                                    void 0 === t
                                    ? void 0
                                    : t.remove();
                            }),
                        this.figure.dispose(),
                        this.parent(null),
                        this
                    );
                }
                getSvg() {
                    return this.figure.getContent();
                }
                move(e, t) {
                    this.figure.setPosition({ x: e, y: t });
                }
                getMarkerView(e) {
                    var t;
                    return null !== (t = this.markerViewMap.get(e)) &&
                        void 0 !== t
                        ? t
                        : null;
                }
            }
        }).call(this, i(45));
    },
];
