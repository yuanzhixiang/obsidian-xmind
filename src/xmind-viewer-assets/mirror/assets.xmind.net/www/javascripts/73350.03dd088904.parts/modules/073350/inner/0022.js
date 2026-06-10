export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return d;
        });
        var n = i(0),
            r = i(9),
            o = i(7),
            a = i(31),
            s = i(11),
            l = i(5);
        const c = {
            [o.b.DIVER_LINE]: [o.s.calcMapStructureStartPoint],
            [o.b.ORDER_LINE]: [o.s.calcSinusStartYPoint],
            [o.b.FOCUS_LINE]: [],
        };
        class d {
            getBasePoint(e, t) {
                return Object(o.l)(e.topicView.shapeBounds, t);
            }
            getPointOffset(e, t) {
                return { x: 0, y: 0 };
            }
            getCtrlPoint(e, t) {
                const i =
                        e.getConnectionView().getLineShape() ===
                        n.BRANCHCONNECTION.BIGHT,
                    a = this.getBasePoint(e, t);
                return i ? a : Object(o.c)(a, t, r.a.LINECOLPOS);
            }
            getStartAnchorPosition(e, t) {
                const i = Object(o.p)(e, t),
                    n = this.getBasePoint(e, i),
                    r = this.getPointOffset(e, i),
                    a = Object(l.c)(n, r),
                    s = (function (e, t) {
                        const i = Object(o.m)(e);
                        return c[i].map((i) => i(e, t));
                    })(e, t).reduce((e, t) => Object(l.c)(e, t), a);
                return Object(o.u)(s, e);
            }
            getControlPosition(e, t) {
                if (Object(o.m)(e) !== o.b.FOCUS_LINE)
                    return this.getStartAnchorPosition(e, t);
                const i = Object(o.p)(e, t),
                    n = this.getCtrlPoint(e, i);
                return Object(o.u)(n, e);
            }
            getEndAnchorPosition(e, t) {
                const i = Object(o.g)(t.parent(), t),
                    n = this.getBasePoint(t, i),
                    r = this.getPointOffset(t, i),
                    a = Object(o.c)(Object(l.c)(n, r), i, o.a);
                return Object(o.u)(a, t);
            }
            getExtColPosition(e) {
                const t = Object(o.p)(e);
                return this.getBasePoint(e, t);
            }
            getDrawBounds(e, t) {
                const i = t / 2;
                return {
                    x: e.x + i,
                    y: e.y + i,
                    width: e.width - i,
                    height: e.height - i,
                };
            }
            getTopicMargins(e, t) {
                const i = e.topicView.figure,
                    n = parseInt(i.borderWidth || 0);
                return {
                    top: parseInt(i.marginTop || 0) + n,
                    left: parseInt(i.marginLeft || 0) + n,
                    bottom: parseInt(i.marginBottom || 0) + n,
                    right: parseInt(i.marginRight || 0) + n,
                };
            }
            setTopicShapeSelectBox(e, t) {
                const i = parseInt(e.figure.borderWidth || 0),
                    n = this._calcTopicSelectBoxPath(t, i);
                e.setTopicShapeSelectBoxPath(n);
            }
            render(e) {
                (this._render(e), this._rotate(e));
            }
            _render(e, t) {
                const i = e.figure.borderWidth || 0,
                    n = this.getDrawBounds(e.shapeBounds, i),
                    r = this.calcTopicShapePath(n, e);
                e.setTopicShapePath(r);
                let s = r;
                (t && (s = a.h(n)),
                    e.setTopicShapeFillPath(s),
                    this.setTopicShapeSelectBox(e, n),
                    Object(o.v)(e, 0, 0));
            }
            _rotate(e) {
                e.topicGroup.rotate(0);
            }
            calcTopicShapePath(e, t) {
                throw 'need implement';
            }
            _calcTopicSelectBoxPath(e, t) {
                return s.a.generateRect(e, t);
            }
        }
    },
];
