export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return s;
        });
        var n = i(22),
            r = i(7),
            o = i(31),
            a = i(11);
        class s extends n.a {
            constructor(e) {
                var t;
                (super(),
                    (this._padding =
                        null !== (t = null == e ? void 0 : e.padding) &&
                        void 0 !== t
                            ? t
                            : 4));
            }
            _calcShapePathWithPaddingBounds(e, t) {
                return '';
            }
            calcTopicShapePath(e, t) {
                const { x: i, y: n, width: o, height: a } = e,
                    s = Object(r.e)(t.parent()),
                    l = Math.max(this._padding, s),
                    c = {
                        x: i + l,
                        y: n + l,
                        width: o - 2 * l,
                        height: a - 2 * l,
                    };
                return this._calcShapePathWithPaddingBounds(c, t);
            }
            _render(e) {
                const { shapeBounds: t } = e,
                    i = this.calcTopicShapePath(t, e);
                e.setTopicShapePath(i);
                const n = Object(o.h)(t);
                (e.setTopicShapeFillPath(n), Object(r.v)(e, 0, 0));
                const s = a.a.generateRect(t, 0);
                e.setTopicShapeSelectBoxPath(s);
            }
        }
    },
];
