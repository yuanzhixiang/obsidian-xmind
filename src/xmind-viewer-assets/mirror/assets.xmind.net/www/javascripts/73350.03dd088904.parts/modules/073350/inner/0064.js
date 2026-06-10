export default [
    function (e, t, i) {
        'use strict';
        (i.d(t, 'b', function () {
            return a;
        }),
            i.d(t, 'a', function () {
                return l;
            }));
        var n = i(0),
            r = i(35),
            o = i(62);
        function a(e) {
            let t,
                i = e.parent();
            for (; i && Object(r.r)(i); )
                ((t = Object(r.S)(i) ? i : void 0), (i = i.parent()));
            return t;
        }
        function s(e, t) {
            const i = e.model.boundaries();
            for (let e = 0; e < i.length; e++) {
                const n = i[e];
                if (t - 1 >= n.rangeStart && t <= n.rangeEnd) return !0;
            }
            const n = e.model.summaries();
            for (let e = 0; e < n.length; e++) {
                const i = n[e];
                if (t - 1 >= i.rangeStart && t <= i.rangeEnd) return !0;
            }
            return !1;
        }
        function l(e, t) {
            const i = e.getStructureClass();
            let r = n.DIRECTION.NONE;
            switch (i) {
                case n.STRUCTURECLASS.TIMELINESIDEDHORIZONTAL:
                case n.STRUCTURECLASS.TIMELINEHORIZONTAL:
                    r = n.DIRECTION.UP;
                    break;
                case n.STRUCTURECLASS.TIMELINETHROUGHVERTICAL:
                    r = n.DIRECTION.LEFT;
            }
            if (r === n.DIRECTION.NONE)
                return (
                    console.warn(`${i} is not a valid timeline structure`),
                    []
                );
            const a = e.getChildrenBranchesByType(n.TOPIC_TYPE.ATTACHED);
            return void 0 === t
                ? a.reduce(
                      (t, i, n) =>
                          0 !== n
                              ? [
                                    ...t,
                                    s(e, n) ? t[n - 1] : Object(o.c)(t[n - 1]),
                                ]
                              : [r],
                      []
                  )
                : a
                      .slice(0, t + 1)
                      .reduce(
                          (t, i, n) =>
                              0 !== n ? (s(e, n) ? t : Object(o.c)(t)) : r,
                          n.DIRECTION.NONE
                      );
        }
    },
];
