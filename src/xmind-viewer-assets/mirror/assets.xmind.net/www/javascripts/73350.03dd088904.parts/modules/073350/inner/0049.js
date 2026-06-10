export default [
    function (e, t, i) {
        'use strict';
        (i.d(t, 'a', function () {
            return s;
        }),
            i.d(t, 'b', function () {
                return d;
            }));
        var n = i(0),
            r = i(30),
            o = i(1),
            a = i(9);
        const s = (e) => {
            const t = e.getStructureClass();
            if (e.isLayout) return;
            if (e.shouldHide()) return;
            (e._showOrHideCollapseExtendView(),
                e.shouldCollapse() && e.collapseBranch());
            const i = Object(r.a)(t);
            ((e.isLayout = !0), c.call(i, e));
        };
        function l(e, t) {
            (e.updateLayoutInfo(t),
                t.stopFlag ||
                    e.shouldCollapse() ||
                    n.ALL_TOPIC_TYPES.forEach((i) => {
                        const n = t.children[i];
                        n &&
                            e.getChildrenBranchesByType(i).forEach((e) => {
                                const t = n.find(
                                    (t) => t.id === e.model.getId()
                                );
                                (e.setPosition(t.position),
                                    (e.bounds = t.bounds),
                                    e.updateLayoutInfo(t),
                                    l(e, t));
                            });
                    }));
        }
        function c(e) {
            const t = Object.assign({}, e.bounds),
                i = Object.assign({}, e.topicView.bounds);
            if (
                (this.layoutExtendCollapse(e, i),
                this.calChildrenBounds(e),
                !e.shouldCollapse())
            )
                if (this.newLayout) {
                    if (
                        ((n = e),
                        Object(o.isTreeTableCell)(n) &&
                            !Object(o.isTreeTableHeadBranch)(n) &&
                            Object(o.isTreeTableStructure)(n) &&
                            (null ===
                                (r = Object(o.getTreeTableHeadBranchView)(n)) ||
                            void 0 === r
                                ? void 0
                                : r.figure.isVisible))
                    )
                        return;
                    const t = Object(o.getBranchLayoutTreeInfo)(e, {
                        targetStructure: e.getStructureClass(),
                    });
                    (this.startLayout(t),
                        l(e, t),
                        this.calDetachedChildrenPos(e, t.bounds),
                        this.calSummaryChildrenPos(e, t.bounds),
                        Object.assign(i, t.bounds));
                } else
                    (this.calAttachedChildrenPos(e, i),
                        this.specialDeal(e, i),
                        this.calSummaryChildrenPos(e, i),
                        this.calDetachedChildrenPos(e, i));
            var n, r;
            (e.isInMatrix() || this.calCalloutChildrenPos(e, i),
                (e.bounds = i),
                Object(o.isSame)(i, t) || e.trigger('change:bounds', i, e));
        }
        function d(e, t, i) {
            const n = Math.min(
                a.a.MAX_BRANCH_POSITION_REALIGN_OFFSET,
                i * a.a.BRANCH_POSITION_REALIGN_RATIO
            );
            return e.length >= 3 && Math.abs(t) < n;
        }
    },
];
