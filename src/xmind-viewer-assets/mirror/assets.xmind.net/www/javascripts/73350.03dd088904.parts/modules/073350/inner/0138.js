export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return d;
        });
        var n = i(12),
            r = i.n(n),
            o = i(6),
            a = i.n(o),
            s = i(26),
            l = i.n(s),
            c = i(0);
        class d {
            constructor(e) {
                const t = a.a.extend({}, l.a.Events, {
                    selectedBranches: [],
                    hasStarted: function () {
                        return !!this.selectBox;
                    },
                    selectedHasChanged: function () {
                        return (
                            JSON.stringify(this.startContains) !==
                            JSON.stringify(this.selectBox.relationBranch)
                        );
                    },
                    onSelectDragStart: function (e, t, i) {
                        ((this.selectBox = e),
                            (this.context = t),
                            (this.direction = i),
                            (this.startContains = r.a.extend(
                                !0,
                                {},
                                this.selectBox.relationBranch
                            )));
                    },
                    onSelectDragEnd: function () {
                        if (!this.selectedHasChanged())
                            return (this.resetManager(), !1);
                        const e = this.context,
                            t =
                                'boundary' === e.type
                                    ? ['model', 'boundaries']
                                    : ['summaryModel', 'summaries'],
                            i = e[t[0]],
                            n = this.context.parent(),
                            r = this.calcRangeIndex(),
                            o = r[0],
                            s = r[1],
                            l = a.a.extend({}, n.model[t[1]]());
                        if (!this.hasSameRange(l, r)) {
                            const e = '(' + o + ',' + s + ')';
                            i.setRange(e);
                        }
                        this.resetManager();
                    },
                    calcRangeIndex: function () {
                        let e, t, i, n;
                        const r = this.selectedBranches.length,
                            o = this.context
                                .parent()
                                .getChildrenBranchesByType();
                        for (
                            e = t = o.indexOf(this.selectedBranches[0]), n = 1;
                            n < r;
                            n++
                        )
                            ((i = o.indexOf(this.selectedBranches[n])),
                                i > e && (e = i),
                                i < t && (t = i));
                        return [t, e];
                    },
                    addSelectBranch: function (e) {
                        -1 === this.selectedBranches.indexOf(e) &&
                            this.selectedBranches.push(e);
                    },
                    removeSelectBranch: function (e) {
                        -1 !== this.selectedBranches.indexOf(e) &&
                            (this.selectedBranches = a.a.without(
                                this.selectedBranches,
                                e
                            ));
                    },
                    resetManager: function () {
                        (a.a.each(this.selectedBranches, (e) => {
                            e.onMouseout();
                        }),
                            (this.selectedBranches = []),
                            this.selectBox &&
                                (this.selectBox.selectBoxOneG.move(0, 0),
                                this.selectBox.selectBoxTwoG.move(0, 0),
                                this.selectBox.render(this.direction),
                                (this.selectBox.relationBranch = []),
                                (this.selectBox = null)),
                            (this.context = null),
                            (this.direction = null));
                    },
                    hasSameRange: function (e, t) {
                        let i = !1;
                        return (
                            a.a.each(e, (e) => {
                                if (
                                    e.rangeStart === t[0] &&
                                    e.rangeEnd === t[1]
                                )
                                    return ((i = !0), !1);
                            }),
                            i
                        );
                    },
                });
                return (
                    t.on('start', t.onSelectDragStart),
                    t.on('end', t.onSelectDragEnd),
                    t.on('addSelectedBranch', t.addSelectBranch),
                    t.on('removeSelectedBranch', t.removeSelectBranch),
                    t
                );
            }
        }
        d.identifier = c.MODULE_NAME.SELECT_DRAG;
    },
];
