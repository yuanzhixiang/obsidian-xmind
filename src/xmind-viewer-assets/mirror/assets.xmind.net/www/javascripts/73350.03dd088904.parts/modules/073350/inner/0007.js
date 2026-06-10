export default [
    function (e, t, i) {
        'use strict';
        (i.d(t, 'r', function () {
            return T;
        }),
            i.d(t, 'k', function () {
                return M;
            }),
            i.d(t, 'n', function () {
                return E;
            }),
            i.d(t, 'j', function () {
                return w;
            }),
            i.d(t, 'o', function () {
                return P;
            }),
            i.d(t, 'f', function () {
                return H;
            }),
            i.d(t, 'i', function () {
                return D;
            }),
            i.d(t, 's', function () {
                return _;
            }),
            i.d(t, 'p', function () {
                return a;
            }),
            i.d(t, 'g', function () {
                return s;
            }),
            i.d(t, 'l', function () {
                return l;
            }),
            i.d(t, 'm', function () {
                return m;
            }),
            i.d(t, 'c', function () {
                return b;
            }),
            i.d(t, 'u', function () {
                return C;
            }),
            i.d(t, 't', function () {
                return L;
            }),
            i.d(t, 'v', function () {
                return O;
            }),
            i.d(t, 'e', function () {
                return S;
            }),
            i.d(t, 'h', function () {
                return x;
            }),
            i.d(t, 'q', function () {
                return R;
            }),
            i.d(t, 'd', function () {
                return I;
            }),
            i.d(t, 'b', function () {
                return Q;
            }),
            i.d(t, 'a', function () {
                return N;
            }));
        var n = i(0),
            r = i(30),
            o = i(1);
        function a(e, t) {
            switch (e.getStructureClass()) {
                case n.STRUCTURECLASS.LOGICRIGHT:
                case n.STRUCTURECLASS.TIMELINEHORIZONTAL:
                case n.STRUCTURECLASS.TIMELINESIDEDHORIZONTAL:
                    return n.DIRECTION.RIGHT;
                case n.STRUCTURECLASS.LOGICLEFT:
                    return n.DIRECTION.LEFT;
                case n.STRUCTURECLASS.ORGCHARTUP:
                case n.STRUCTURECLASS.TIMELINEHORIZONTALUP:
                    return n.DIRECTION.UP;
                case n.STRUCTURECLASS.ORGCHARTDOWN:
                case n.STRUCTURECLASS.TREELEFT:
                case n.STRUCTURECLASS.TREERIGHT:
                case n.STRUCTURECLASS.TREESIDED:
                case n.STRUCTURECLASS.TIMELINEVERTICAL:
                case n.STRUCTURECLASS.TIMELINEHORIZONTALDOWN:
                case n.STRUCTURECLASS.TIMELINETHROUGHVERTICAL:
                    return n.DIRECTION.DOWN;
            }
            if (!t) return n.DIRECTION.RIGHT;
            return t.linePosition.x < e.linePosition.x
                ? n.DIRECTION.LEFT
                : n.DIRECTION.RIGHT;
        }
        function s(e, t) {
            const i = e.getStructureClass();
            if (i === n.STRUCTURECLASS.TIMELINESIDEDHORIZONTAL)
                return Object(o.getReverseDir)(
                    Object(o.getFinalTimelineChildDirection)(e, t.branchIndex())
                );
            switch (i) {
                case n.STRUCTURECLASS.LOGICRIGHT:
                case n.STRUCTURECLASS.TREERIGHT:
                case n.STRUCTURECLASS.TIMELINEHORIZONTAL:
                case n.STRUCTURECLASS.TIMELINEHORIZONTALUP:
                case n.STRUCTURECLASS.TIMELINEHORIZONTALDOWN:
                case n.STRUCTURECLASS.LEFTHEADTOPBONE:
                case n.STRUCTURECLASS.LEFTHEADBOTTOMBONE:
                    return n.DIRECTION.LEFT;
                case n.STRUCTURECLASS.LOGICLEFT:
                case n.STRUCTURECLASS.TREELEFT:
                case n.STRUCTURECLASS.RIGHTHEADTOPBONE:
                case n.STRUCTURECLASS.RIGHTHEADBOTTOMBONE:
                    return n.DIRECTION.RIGHT;
                case n.STRUCTURECLASS.ORGCHARTUP:
                    return n.DIRECTION.DOWN;
                case n.STRUCTURECLASS.ORGCHARTDOWN:
                case n.STRUCTURECLASS.TIMELINETHROUGHVERTICAL:
                    return n.DIRECTION.UP;
            }
            if (!t) return n.DIRECTION.LEFT;
            return t.linePosition.x < e.linePosition.x
                ? n.DIRECTION.RIGHT
                : n.DIRECTION.LEFT;
        }
        function l(e, t) {
            const { x: i, y: r, width: o, height: a } = e,
                s = { x: 0, y: 0 };
            switch (t) {
                case n.DIRECTION.LEFT:
                    s.x += i;
                    break;
                case n.DIRECTION.RIGHT:
                    s.x += i + o;
                    break;
                case n.DIRECTION.UP:
                    s.y += r;
                    break;
                case n.DIRECTION.DOWN:
                    s.y += r + a;
            }
            return s;
        }
        const c = [
                n.BRANCHCONNECTION.ROUNDEDELBOW,
                n.BRANCHCONNECTION.CURVE,
                n.BRANCHCONNECTION.ELBOW,
            ],
            d = c.concat([
                n.BRANCHCONNECTION.STRAIGHT,
                n.BRANCHCONNECTION.FOLD,
                n.BRANCHCONNECTION.ROUNDEDFOLD,
            ]),
            f = d.concat([n.BRANCHCONNECTION.BIGHT]);
        function h(e) {
            return [
                n.STRUCTURECLASS.MAP,
                n.STRUCTURECLASS.MAPFLOATING,
            ].includes(e);
        }
        function p(e) {
            return [
                n.STRUCTURECLASS.MAPANTICLOCKWISE,
                n.STRUCTURECLASS.MAPFLOATINGANTICLOCKWISE,
            ].includes(e);
        }
        function T(e) {
            return -1 !== e.indexOf(n.STRUCTURECLASS.MAP);
        }
        const u = (e, t) => {
                const i = ((e) => {
                    switch (e) {
                        case n.TOPICSHAPE.UNDERLINE:
                            return c;
                        case n.TOPICSHAPE.CLOUD:
                        case n.TOPICSHAPE.PARALLELOGRAM:
                            return f;
                        default:
                            return d;
                    }
                })(e);
                return i.indexOf(t) >= 0;
            },
            g = (e, t) => {
                const i = ((e) => {
                    switch (e) {
                        case n.TOPICSHAPE.UNDERLINE:
                        case n.TOPICSHAPE.DIAMOND:
                        case n.TOPICSHAPE.HEXAGON:
                        case n.TOPICSHAPE.PARALLELOGRAM:
                            return [];
                        default:
                            return [n.BRANCHCONNECTION.BIGHT];
                    }
                })(e);
                return i.indexOf(t) >= 0;
            },
            Q = {
                DIVER_LINE: 'DIVER_LINE',
                ORDER_LINE: 'ORDER_LINE',
                FOCUS_LINE: 'FOCUS_LINE',
            };
        function m(e) {
            const t = e.getStructureClass(),
                i = e.topicView.topicShapeStyle,
                n = e.getConnectionView().getLineShape();
            return T(t)
                ? u(i, n)
                    ? Q.DIVER_LINE
                    : g(i, n)
                      ? Q.ORDER_LINE
                      : Q.FOCUS_LINE
                : Q.FOCUS_LINE;
        }
        function b(e, t, i, r = i) {
            switch (((e = Object.assign({}, e)), t)) {
                case n.DIRECTION.LEFT:
                    e.x -= i;
                    break;
                case n.DIRECTION.RIGHT:
                    e.x += i;
                    break;
                case n.DIRECTION.UP:
                    e.y -= r;
                    break;
                case n.DIRECTION.DOWN:
                    e.y += r;
            }
            return e;
        }
        function C(e, t) {
            const i = t.getRealPosition();
            return { x: e.x + i.x, y: e.y + i.y };
        }
        function L(e, t) {
            const i = t.getRealPosition();
            return { x: e.x - i.x, y: e.y - i.y };
        }
        const y = (() => {
            const e = 0.1;
            return (t, i, n) => {
                i = Math.abs(i);
                const r = n / Math.abs(n);
                if ((t = Math.abs(t)) < 100) return r * i;
                {
                    n = Math.abs(n);
                    const o =
                        (600 * (e * i + 0.9 * n) - 100 * (i - n)) /
                        (0.9 * i + (e - 2) * n);
                    return r * (((i - n) * (100 + o)) / (t + o) + n);
                }
            };
        })();
        function M(e) {
            const t = e.getStructureClass(),
                i = e.getChildrenBranchesByType(),
                r = i.filter((t) => t.linePosition.x > e.linePosition.x).length,
                o = i.length - r,
                a = {
                    dir: n.DIRECTION.DOWN,
                    length: r,
                    firstIndex: 0,
                },
                s = {
                    dir: n.DIRECTION.UP,
                    length: o,
                    firstIndex: r,
                };
            return (
                h(t)
                    ? (s.dir = n.DIRECTION.DOWN)
                    : p(t) &&
                      ((a.dir = n.DIRECTION.UP),
                      (s.dir = n.DIRECTION.DOWN),
                      (a.firstIndex = o),
                      (s.firstIndex = 0)),
                { rightGroupInfo: a, leftGroupInfo: s }
            );
        }
        const A = {
                diver(e, t) {
                    const { childPos: i } = t,
                        n = e.topicView.bounds,
                        r = e.linePosition,
                        o = i.x > r.x,
                        a = 2 / 3,
                        s = o ? (n.x + n.width) * a : n.x * a,
                        l = o ? 0.1 : -0.1,
                        c = o ? n.x : -n.x;
                    return { x: y(i.y - r.y, s, l) + c, y: 0 };
                },
                order(e, t) {
                    const { num: i, cur: r, dir: o } = t,
                        a = e.topicView.bounds.height - 5;
                    let s = 0;
                    const l = Math.min(a / (i + 1), 3);
                    if (i % 2) {
                        s = (r - Math.floor(i / 2)) * l;
                    } else {
                        s = (r - (i / 2 - 0.5)) * l;
                    }
                    return (o === n.DIRECTION.UP && (s *= -1), { x: 0, y: s });
                },
            },
            v = {
                [Q.DIVER_LINE]: [A.diver],
                [Q.ORDER_LINE]: [A.order],
                [Q.FOCUS_LINE]: [],
            };
        function E(e, t) {
            const i = m(e);
            return v[i].map((i) => i(e, t));
        }
        const _ = {
            calcMapStructureStartPoint(e, t) {
                const i = t.linePosition;
                return A.diver(e, { childPos: i });
            },
            calcSinusStartYPoint(e, t) {
                const i = e.getChildrenBranchesByType().indexOf(t),
                    { rightGroupInfo: n, leftGroupInfo: r } = M(e),
                    o =
                        n.firstIndex <= i && i < n.firstIndex + n.length
                            ? n
                            : r,
                    a = {
                        num: o.length,
                        cur: i - o.firstIndex,
                        dir: o.dir,
                    };
                return A.order(e, a);
            },
        };
        function O(e, t, i, n) {
            var r, o, a, s, l;
            'cloud' === n
                ? (e.topicShape.scale(t, i),
                  e.topicShapeFill.scale(t, i),
                  null === (r = e.handDrawnTopicShapeBackground) ||
                      void 0 === r ||
                      r.scale(t, i),
                  null === (o = e.handDrawnTopicShapeBackgroundMask) ||
                      void 0 === o ||
                      o.scale(t, i))
                : (null === (a = e.topicShapeSelectBox) ||
                      void 0 === a ||
                      a.attr('transform', null),
                  e.topicShape.attr('transform', null),
                  e.topicShapeFill.attr('transform', null),
                  null === (s = e.handDrawnTopicShapeBackground) ||
                      void 0 === s ||
                      s.attr('transform', null),
                  null === (l = e.handDrawnTopicShapeBackgroundMask) ||
                      void 0 === l ||
                      l.attr('transform', null));
        }
        function S(e) {
            return parseInt(e.topicView.figure.borderWidth || 0);
        }
        function x(e) {
            return parseInt(e.topicView.titleView.figure.fontSize || 0);
        }
        function R(e) {
            return {
                fontSize: Math.min(
                    50,
                    parseInt(e.topicView.titleView.figure.fontSize || 0)
                ),
                lm: parseInt(e.topicView.figure.marginLeft || 0),
                rm: parseInt(e.topicView.figure.marginRight || 0),
                tm: parseInt(e.topicView.figure.marginTop || 0),
                bm: parseInt(e.topicView.figure.marginBottom || 0),
                lw: parseInt(e.topicView.figure.borderWidth || 0),
            };
        }
        function I(e) {
            const t = parseInt(e.topicView.figure.borderWidth || 0),
                { shapeBounds: i } = e.topicView;
            return { x: 0, y: i.y + i.height - t / 2 };
        }
        const N = -1;
        function w(e, t = !1) {
            if (h(e)) return n.DIRECTION.DOWN;
            if (p(e)) return t ? n.DIRECTION.UP : n.DIRECTION.DOWN;
            if (T(e)) return t ? n.DIRECTION.DOWN : n.DIRECTION.UP;
            switch (e) {
                case n.STRUCTURECLASS.ORGCHARTDOWN:
                case n.STRUCTURECLASS.ORGCHARTUP:
                case n.STRUCTURECLASS.TIMELINEHORIZONTAL:
                case n.STRUCTURECLASS.TIMELINESIDEDHORIZONTAL:
                case n.STRUCTURECLASS.FISHBONELEFTHEADED:
                    return n.DIRECTION.RIGHT;
                case n.STRUCTURECLASS.FISHBONERIGHTHEADED:
                    return n.DIRECTION.LEFT;
                case n.STRUCTURECLASS.LOGICLEFT:
                case n.STRUCTURECLASS.LOGICRIGHT:
                case n.STRUCTURECLASS.BRACELEFT:
                case n.STRUCTURECLASS.BRACERIGHT:
                case n.STRUCTURECLASS.TREELEFT:
                case n.STRUCTURECLASS.TREERIGHT:
                case n.STRUCTURECLASS.TREESIDED:
                case n.STRUCTURECLASS.TIMELINEVERTICAL:
                case n.STRUCTURECLASS.TIMELINEHORIZONTALDOWN:
                case n.STRUCTURECLASS.TIMELINEHORIZONTALUP:
                case n.STRUCTURECLASS.TIMELINETHROUGHVERTICAL:
                case n.STRUCTURECLASS.LEFTHEADTOPBONE:
                case n.STRUCTURECLASS.RIGHTHEADTOPBONE:
                    return n.DIRECTION.DOWN;
                case n.STRUCTURECLASS.LEFTHEADBOTTOMBONE:
                case n.STRUCTURECLASS.RIGHTHEADBOTTOMBONE:
                    return n.DIRECTION.UP;
                default:
                    return n.DIRECTION.DOWN;
            }
        }
        function P(e, t = !1, i) {
            if (T(e)) return t ? n.DIRECTION.RIGHT : n.DIRECTION.LEFT;
            if (
                n.TREE_TABLE_GROUP_LIST.includes(e) ||
                e.includes('spreadsheet')
            )
                return Object(r.a)(e).getSourceOrientation(i);
            switch (e) {
                case n.STRUCTURECLASS.ORGCHARTDOWN:
                case n.STRUCTURECLASS.TREERIGHT:
                case n.STRUCTURECLASS.TREELEFT:
                case n.STRUCTURECLASS.TIMELINEVERTICAL:
                case n.STRUCTURECLASS.TIMELINEHORIZONTALDOWN:
                case n.STRUCTURECLASS.TREESIDED:
                case n.STRUCTURECLASS.TIMELINETHROUGHVERTICAL:
                case n.STRUCTURECLASS.LEFTHEADTOPBONE:
                case n.STRUCTURECLASS.RIGHTHEADTOPBONE:
                    return n.DIRECTION.DOWN;
                case n.STRUCTURECLASS.ORGCHARTUP:
                case n.STRUCTURECLASS.TIMELINEHORIZONTALUP:
                case n.STRUCTURECLASS.LEFTHEADBOTTOMBONE:
                case n.STRUCTURECLASS.RIGHTHEADBOTTOMBONE:
                    return n.DIRECTION.UP;
                case n.STRUCTURECLASS.LOGICRIGHT:
                case n.STRUCTURECLASS.BRACERIGHT:
                case n.STRUCTURECLASS.TIMELINEHORIZONTAL:
                case n.STRUCTURECLASS.TIMELINESIDEDHORIZONTAL:
                case n.STRUCTURECLASS.FISHBONELEFTHEADED:
                    return n.DIRECTION.RIGHT;
                case n.STRUCTURECLASS.LOGICLEFT:
                case n.STRUCTURECLASS.BRACELEFT:
                case n.STRUCTURECLASS.FISHBONERIGHTHEADED:
                    return n.DIRECTION.LEFT;
                default:
                    return n.DIRECTION.RIGHT;
            }
        }
        function H(e, t = !1, i, a, s) {
            const l = i === a;
            if (0 === a)
                switch (e) {
                    case n.STRUCTURECLASS.FISHBONELEFTHEADTOP:
                    case n.STRUCTURECLASS.FISHBONELEFTHEADBOTTOM:
                    case n.STRUCTURECLASS.TIMELINESIDEDHORIZONTAL:
                        return n.DIRECTION.LEFT;
                    case n.STRUCTURECLASS.FISHBONERIGHTHEADTOP:
                    case n.STRUCTURECLASS.FISHBONERIGHTHEADBOTTOM:
                        return n.DIRECTION.RIGHT;
                }
            if (
                e.includes('spreadsheet') ||
                n.TREE_TABLE_GROUP_LIST.includes(e)
            )
                return Object(o.getReverseDir)(
                    Object(r.a)(e).getSourceOrientation(s)
                );
            if (T(e)) return t ? n.DIRECTION.LEFT : n.DIRECTION.RIGHT;
            if (n.STRUCTURECLASS.TIMELINEHORIZONTAL === e)
                return l ? n.DIRECTION.LEFT : n.DIRECTION.NONE;
            if (n.STRUCTURECLASS.TIMELINESIDEDHORIZONTAL === e)
                return Object(o.getFinalTimelineChildDirection)(s, i);
            switch (e) {
                case n.STRUCTURECLASS.ORGCHARTDOWN:
                case n.STRUCTURECLASS.FISHBONELEFTHEADBOTTOM:
                case n.STRUCTURECLASS.FISHBONERIGHTHEADBOTTOM:
                case n.STRUCTURECLASS.TIMELINETHROUGHVERTICAL:
                    return n.DIRECTION.UP;
                case n.STRUCTURECLASS.ORGCHARTUP:
                case n.STRUCTURECLASS.FISHBONELEFTHEADTOP:
                case n.STRUCTURECLASS.FISHBONERIGHTHEADTOP:
                    return n.DIRECTION.DOWN;
                case n.STRUCTURECLASS.LOGICRIGHT:
                case n.STRUCTURECLASS.BRACERIGHT:
                case n.STRUCTURECLASS.TREERIGHT:
                case n.STRUCTURECLASS.TIMELINEHORIZONTALUP:
                case n.STRUCTURECLASS.TIMELINEHORIZONTALDOWN:
                case n.STRUCTURECLASS.LEFTHEADTOPBONE:
                case n.STRUCTURECLASS.LEFTHEADBOTTOMBONE:
                    return n.DIRECTION.LEFT;
                case n.STRUCTURECLASS.LOGICLEFT:
                case n.STRUCTURECLASS.BRACELEFT:
                case n.STRUCTURECLASS.TREELEFT:
                case n.STRUCTURECLASS.RIGHTHEADTOPBONE:
                case n.STRUCTURECLASS.RIGHTHEADBOTTOMBONE:
                    return n.DIRECTION.RIGHT;
                default:
                    return n.DIRECTION.NONE;
            }
        }
        function D(e, t = !1) {
            if (T(e)) return t ? n.DIRECTION.LEFT : n.DIRECTION.RIGHT;
            switch (e) {
                case n.STRUCTURECLASS.ORGCHARTDOWN:
                case n.STRUCTURECLASS.TIMELINETHROUGHVERTICAL:
                case n.STRUCTURECLASS.FISHBONELEFTHEADBOTTOM:
                case n.STRUCTURECLASS.FISHBONERIGHTHEADBOTTOM:
                    return n.DIRECTION.UP;
                case n.STRUCTURECLASS.ORGCHARTUP:
                case n.STRUCTURECLASS.FISHBONELEFTHEADTOP:
                case n.STRUCTURECLASS.FISHBONERIGHTHEADTOP:
                    return n.DIRECTION.DOWN;
                case n.STRUCTURECLASS.LOGICRIGHT:
                case n.STRUCTURECLASS.BRACERIGHT:
                case n.STRUCTURECLASS.TREERIGHT:
                case n.STRUCTURECLASS.TIMELINEHORIZONTAL:
                case n.STRUCTURECLASS.TIMELINEHORIZONTALUP:
                case n.STRUCTURECLASS.TIMELINEHORIZONTALDOWN:
                case n.STRUCTURECLASS.LEFTHEADTOPBONE:
                case n.STRUCTURECLASS.LEFTHEADBOTTOMBONE:
                    return n.DIRECTION.LEFT;
                case n.STRUCTURECLASS.LOGICLEFT:
                case n.STRUCTURECLASS.BRACELEFT:
                case n.STRUCTURECLASS.TREELEFT:
                case n.STRUCTURECLASS.RIGHTHEADTOPBONE:
                case n.STRUCTURECLASS.RIGHTHEADBOTTOMBONE:
                    return n.DIRECTION.RIGHT;
                default:
                    return n.DIRECTION.NONE;
            }
        }
    },
];
