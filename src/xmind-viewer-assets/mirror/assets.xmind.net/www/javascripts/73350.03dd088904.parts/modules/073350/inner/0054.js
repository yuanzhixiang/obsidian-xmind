export default [
    function (e, t, i) {
        'use strict';
        (i.d(t, 'd', function () {
            return g;
        }),
            i.d(t, 'c', function () {
                return Q;
            }),
            i.d(t, 'b', function () {
                return m;
            }),
            i.d(t, 'a', function () {
                return b;
            }));
        var n = i(4),
            r = i(0),
            o = i(16),
            a = i(37);
        function s(e, t) {
            return e[0] <= t[0] && e[1] >= t[1];
        }
        var l = {
                indexArrToRangeArr: function (e) {
                    const t = [];
                    if (!e || 0 === e.length) return t;
                    const i = e.concat().sort((e, t) => e - t);
                    let n = i[0],
                        r = [n];
                    for (let e = 1; e < i.length; e++) {
                        const o = i[e];
                        o - n == 1
                            ? ((n = o),
                              e === i.length - 1 && ((r[1] = o), t.push(r)))
                            : ((r[1] = n), t.push(r), (n = o), (r = [n]));
                    }
                    return (1 === r.length && ((r[1] = r[0]), t.push(r)), t);
                },
                sortRange: function (e) {
                    return e
                        .concat()
                        .sort((e, t) =>
                            e[0] > t[0] ? 1 : e[0] === t[0] ? e[1] - t[1] : -1
                        );
                },
                pickRangeContained: function (e, t) {
                    const i = [];
                    for (let n = 0; n < t.length; n++)
                        for (let r = 0; r < e.length; r++)
                            s(e[r], t[n]) && (i.push(t[n]), (r = e.length));
                    return i;
                },
                isSubRange: s,
            },
            c = i(15),
            d = i(35),
            f = i(5),
            h = i(11);
        const p = 5,
            T = !1,
            u = (e, t) => {
                let i = 0;
                return (
                    e.forEach((e, n) => {
                        e < t && (i = n + 1);
                    }),
                    i
                );
            };
        function g(e, t) {
            if (!T) return;
            (t ? [{ points: t }] : e.getPolyPointsArr()).forEach((t, i) => {
                const r = [...t.points];
                if (0 === r.length) return;
                const o = r.pop();
                let a = 'M ' + o.x + ' ' + o.y;
                (r.forEach((e) => {
                    a += ' L ' + e.x + ' ' + e.y;
                }),
                    (a += ' Z'),
                    e[`_polygonPath_${i}`] &&
                        (e[`_polygonPath_${i}`].remove(),
                        (e[`_polygonPath_${i}`] = null)),
                    (e[`_polygonPath_${i}`] = e.svg.put(new n.a.Path())),
                    e[`_polygonPath_${i}`].attr({
                        d: a,
                        stroke: 'blue',
                        fill: 'none',
                    }));
            });
        }
        function Q(e, t, i) {
            const n = (e) => {
                    const t = e.findIndex((e) => e.isPlaceHolderView);
                    -1 !== t && e.splice(t, 1);
                },
                o = [...e.getChildrenBranchesByType()];
            n(o);
            const a = [...t.relatedBranchViewList];
            if ((n(a), 0 === a.length)) {
                const i = e.getStructureClass();
                if (r.MAP_LIKE_STRUCTURES.includes(i)) {
                    const i =
                        e.getStructureClass() ===
                        r.STRUCTURECLASS.MAPANTICLOCKWISE;
                    return ('right' === t.side && i) ||
                        ('left' === t.side && !i)
                        ? o.length
                        : 0;
                }
                return Object(d.y)(e) && t.side === r.ALL_DIRECTION.DOWN
                    ? o.length
                    : 0;
            }
            {
                const t = ((t) => {
                        const i = t[0].branchIndex();
                        return e.getRangeGrowthDirection(i);
                    })(a),
                    n =
                        t === r.DIRECTION.UP || t === r.DIRECTION.DOWN
                            ? 'y'
                            : 'x',
                    s =
                        t === r.DIRECTION.DOWN || t === r.DIRECTION.RIGHT
                            ? 1
                            : -1,
                    l = a.map((e) => ({
                        branchIndex: o.indexOf(e),
                        pos: e.getRealPosition(),
                    }));
                l.sort((e, t) => e.branchIndex - t.branchIndex);
                const c = i[n] * s,
                    f = l
                        .map((e) => e.pos[n] * s)
                        .filter((e, t, i) => 0 === t || e > i[t - 1]),
                    h = u(f, c),
                    p = l.length;
                if (h === p) {
                    let t = l[p - 1].branchIndex + 1;
                    if (Object(d.y)(e)) {
                        const i = e.getChildrenBranchesByType().length > 1,
                            n = !!e.getChildrenBranchesByType()[t];
                        i && n && (t += 1);
                    }
                    return t;
                }
                return l[h].branchIndex;
            }
        }
        function m(e, t, i) {
            const n = 'press' === e.type,
                a = i.getDragEventClientPosition(e, n);
            if (!a) return o.b.get(r.CONFIG.LOGGER).error('寻找pointer失败');
            const s = { x: a.x, y: a.y },
                l = n ? 'touchmove' : 'mousemove',
                c = n ? 'touchend' : 'mouseup',
                d = (e) => {
                    e.preventDefault();
                    const r = i.getDragEventClientPosition(e, n),
                        o = a.x - r.x,
                        h = a.y - r.y;
                    o * o + h * h >= p * p &&
                        (document.removeEventListener(l, d),
                        document.removeEventListener(c, f),
                        t(s));
                },
                f = () => {
                    (document.removeEventListener(l, d),
                        document.removeEventListener(c, f));
                };
            (document.addEventListener(l, d, { passive: !1 }),
                document.addEventListener(c, f));
        }
        class b {
            constructor(e, t, i = {}) {
                ((this.replaceIdMap = {}),
                    (this._context = e),
                    (this._selections = [...t.selections]),
                    (this._options = Object.assign({}, i)),
                    (this._topicOriginDataList = this._selections.map((e) =>
                        e.model.toJSON()
                    )),
                    (this._selectionsPositionMap = {}),
                    this._saveSelectionsPositionMap(),
                    (this._relationShipOriginDataList = this._context
                        .getSheetModel()
                        .relationships()
                        .map((e) => e.toJSON())),
                    (this._startDragRealPosition = Object.assign(
                        {},
                        t.position
                    )),
                    (this._isMountedAsDetach = !1),
                    (this._boundaryAndSummaryOriginInfoList = []),
                    this._saveSelectionsOwnBoundariesAndSummariesInfo(),
                    (this._topicRebuildModelList = []),
                    (this._newParentBranchModel = null),
                    (this._droppedMatrixCellInfo = null));
            }
            mountAsDetach(e) {
                this._isMountedAsDetach = !0;
                const t = c.e(this._startDragRealPosition, e),
                    i = this._getTopicRebuildModelList();
                (i.forEach((i) => {
                    const n = Object.keys(this.replaceIdMap).find(
                            (e) => this.replaceIdMap[e] === i.id
                        ),
                        r = this._selectionsPositionMap[n || i.id],
                        o = r ? c.b(r, t) : e;
                    i.set('position', o);
                }),
                    this._mount(
                        this._context.getSheetView().centralBranchView,
                        i,
                        {
                            noAnimation: !0,
                            type: r.TOPIC_TYPE.DETACHED,
                        }
                    ));
            }
            mountAsAttach(e, t) {
                const i = this._getTopicRebuildModelList();
                (t.droppedMatrixCellInfo &&
                    t.droppedMatrixCellInfo.headBranch === e &&
                    i.forEach((e) => {
                        e.set(
                            'labels',
                            t.droppedMatrixCellInfo.label.trim().split(',')
                        );
                    }),
                    this._mount(e, i, t));
            }
            mountAsFreePosition(e, t) {
                const i = this._getTopicRebuildModelList();
                (i.forEach((e) => {
                    e.set('position', t.position);
                }),
                    this._mount(e, i, t));
            }
            _mount(e, t, i) {
                ((this._newParentBranchModel = e.model),
                    (i.side = i.addToRight ? 'right' : 'left'),
                    [...t].reverse().forEach((t) => {
                        e.model.addChildTopic(t, i);
                    }),
                    this._isMountedAsDetach ||
                        this._updateSelectBoxRange(e, i.at, t.length),
                    this._rebuildBoundaryAndSummary(),
                    this._rebuildRelationShip());
            }
            _getTopicRebuildModelList() {
                return (
                    this._topicRebuildModelList.length ||
                        (this._topicRebuildModelList =
                            this._topicOriginDataList.map(
                                (e) => (
                                    this._options.isDuplicate &&
                                        Object.assign(
                                            this.replaceIdMap,
                                            h.a.replaceId(e, f.b)
                                        ),
                                    Object(a.a)(
                                        e,
                                        this._context.getSheetModel()
                                    )
                                )
                            )),
                    this._topicRebuildModelList
                );
            }
            _saveSelectionsPositionMap() {
                this._selections.forEach((e) => {
                    this._selectionsPositionMap[e.model.id] =
                        e.getRealPosition();
                });
            }
            _saveSelectionsOwnBoundariesAndSummariesInfo() {
                const e = {};
                this._selections.forEach((t) => {
                    const i = t.model;
                    if (i.type() !== r.TOPIC_TYPE.ATTACHED) return;
                    const n = i.parent(),
                        o = n.cid,
                        a = i.getIndexInParent();
                    o in e
                        ? e[o].childrenIndexList.push(a)
                        : (e[o] = {
                              parentTopicModel: n,
                              childrenIndexList: [a],
                          });
                });
                const t = [];
                (Object.keys(e)
                    .map((t) => e[t])
                    .forEach((e) => {
                        const { parentTopicModel: i, childrenIndexList: n } = e,
                            r = [...i.summaries(), ...i.boundaries()].filter(
                                (e) =>
                                    l
                                        .indexArrToRangeArr(n)
                                        .some((t) =>
                                            l.isSubRange(t, [
                                                e.rangeStart,
                                                e.rangeEnd,
                                            ])
                                        )
                            );
                        t.push(...r);
                    }),
                    (this._boundaryAndSummaryOriginInfoList = t.map((e) => {
                        const t = e.parent(),
                            {
                                rangeStart: i,
                                rangeEnd: n,
                                componentType: o,
                            } = e,
                            a = t.children(),
                            s = a[i].id,
                            l = a[n].id;
                        let c;
                        if (o === r.MODEL_TYPE.SUMMARY) {
                            ((c = t
                                .children(r.TOPIC_TYPE.SUMMARY)
                                .find((t) => t.getId() === e.get('topicId'))
                                .toJSON()),
                                this._options.isDuplicate &&
                                    Object.assign(
                                        this.replaceIdMap,
                                        h.a.replaceId(c, f.b)
                                    ));
                        }
                        const d = e.toJSON();
                        return (
                            this._options.isDuplicate && (d.id = Object(f.b)()),
                            {
                                type: o,
                                startId: s,
                                endId: l,
                                modelData: d,
                                ownTopicData: c,
                            }
                        );
                    })));
            }
            _rebuildRelationShip() {
                const e = this._context.getSheetModel(),
                    t = {};
                e.relationships().forEach((e) => {
                    t[e.id] = e.toJSON();
                });
                const i = this._context.getSVGView().model2View;
                this._relationShipOriginDataList.forEach((n) => {
                    if (this._options.isDuplicate) {
                        if (
                            ((n.end1Id = this.replaceIdMap[n.end1Id]),
                            (n.end2Id = this.replaceIdMap[n.end2Id]),
                            !n.end1Id || !n.end2Id)
                        )
                            return;
                        ((n.id = Object(f.b)()), e.addRelationship(n));
                    } else {
                        const r = i[n.end1Id] && i[n.end2Id];
                        !t[n.id] && r && e.addRelationship(n);
                    }
                });
            }
            _rebuildBoundaryAndSummary() {
                (this._boundaryAndSummaryOriginInfoList.forEach((e) => {
                    e.type === r.MODEL_TYPE.SUMMARY
                        ? this._rebuildSummary(e)
                        : this._rebuildBoundary(e);
                }),
                    this._rebuildMasterBoundaryIntoNormal());
            }
            _rebuildSummary(e) {
                if (this._isMountedAsDetach) return;
                let { startId: t, endId: i } = e;
                const { modelData: n, ownTopicData: s } = e;
                this._options.isDuplicate &&
                    ((t = this.replaceIdMap[t]), (i = this.replaceIdMap[i]));
                const l = this._newParentBranchModel.getChildrenIndexById(t),
                    c = this._newParentBranchModel.getChildrenIndexById(i);
                if (-1 === l || -1 === c)
                    return o.b
                        .get(r.CONFIG.LOGGER)
                        .error('rebuild summary error');
                ((n.topicId = s.id),
                    (n.range = `(${Math.min(l, c)},${Math.max(l, c)})`));
                const d = Object(a.a)(s, this._context.getSheetModel());
                this._newParentBranchModel.addSummary(n, null, d);
            }
            _rebuildBoundary(e) {
                let { startId: t, endId: i } = e;
                const { modelData: n } = e;
                if (
                    (this._options.isDuplicate &&
                        ((t = this.replaceIdMap[t]),
                        (i = this.replaceIdMap[i])),
                    this._isMountedAsDetach)
                ) {
                    if (t !== i) return;
                    n.range = r.MASTER_RANGE;
                    this._topicRebuildModelList
                        .find((e) => e.id === t)
                        .addBoundary(n);
                } else {
                    const e =
                            this._newParentBranchModel.getChildrenIndexById(t),
                        a = this._newParentBranchModel.getChildrenIndexById(i);
                    if (-1 === e || -1 === a)
                        return o.b
                            .get(r.CONFIG.LOGGER)
                            .error('rebuild boundary error');
                    ((n.range = `(${Math.min(e, a)},${Math.max(e, a)})`),
                        this._newParentBranchModel.addBoundary(n));
                }
            }
            _rebuildMasterBoundaryIntoNormal() {
                if (this._isMountedAsDetach) return;
                const e = this._newParentBranchModel;
                this._topicRebuildModelList.forEach((t) => {
                    const i = t
                        .boundaries()
                        .find((e) => e.getRange() === r.MASTER_RANGE);
                    if (i) {
                        t.removeBoundary(i);
                        const n = e.getChildrenIndexById(t.getId());
                        (i.setRange(`(${n},${n})`), e.addBoundary(i));
                    }
                });
            }
            _updateSelectBoxRange(e, t, i) {
                [...e.boundaries, ...e.summaries].forEach((e) => {
                    let n = i;
                    if (t <= e.model.rangeEnd) {
                        const i =
                            'summary' === e.type
                                ? 'changeSummaryRange'
                                : 'changeBoundaryRange';
                        for (; n--; ) e.model[i](t - 1);
                    }
                });
            }
            getRelatedBoundaryAndSummaryInfo() {
                return this._boundaryAndSummaryOriginInfoList;
            }
        }
    },
];
