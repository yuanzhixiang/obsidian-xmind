export default [
    function (e, t, i) {
        'use strict';
        (i.d(t, 'a', function () {
            return m;
        }),
            i.d(t, 'b', function () {
                return b;
            }));
        var n = i(34),
            r = i(0),
            o = i(1),
            a = i(17),
            s = i(5),
            l = i(11);
        function c(e) {
            const t =
                    (function (e) {
                        const t = e.parent();
                        return (
                            t instanceof a.a &&
                            t.getStructureClass() ===
                                r.STRUCTURECLASS.TIMELINEHORIZONTAL
                        );
                    })(e) && e.branchIndex() > 0,
                i = e.parent();
            return t ? i.getChildrenBranchesByType()[e.branchIndex() - 1] : i;
        }
        function d(e, t = (e) => e.validateLayout()) {
            if (
                (e
                    .sort(
                        (e, t) =>
                            t.viewController.getLayer() -
                            e.viewController.getLayer()
                    )
                    .forEach(t),
                !e.length)
            )
                return;
            const i = new Set();
            (e.forEach((e) => {
                const t = e.viewController
                    .getContext()
                    .getSheetView()
                    .getCentralBranchView();
                i.add(t);
            }),
                i.forEach((t) => {
                    (t
                        .getChildrenBranchesByType([
                            r.TOPIC_TYPE.ATTACHED,
                            r.TOPIC_TYPE.DETACHED,
                            r.TOPIC_TYPE.SUMMARY,
                        ])
                        .forEach((e) => e.updateStructure()),
                        l.a.preorderIterate(t, r.ALL_TOPIC_TYPES, (t) => {
                            var i, n;
                            (t.updateRealPosition(),
                                t.shouldCollapse() ||
                                    (e.includes(t.figure) ||
                                    Object(o.isTreeTableCell)(t)
                                        ? t.boundaries.forEach((e) => {
                                              ((e.figure.dirtyLayout = !0),
                                                  e.figure.validateLayout());
                                          })
                                        : t.boundaries.forEach((e) => {
                                              e.updateRealPosition();
                                          })));
                            const r =
                                !t.shouldHide() &&
                                t.isVisible &&
                                !t.isForcedInvisible;
                            (t.figure.setVisible(r),
                                r ||
                                    (null ===
                                        (n =
                                            null === (i = t.topicView) ||
                                            void 0 === i
                                                ? void 0
                                                : i.topicShapeSelectBox) ||
                                        void 0 === n ||
                                        n.figure.setHide(),
                                    t.isSummaryBranch() &&
                                        t.selectBox &&
                                        t.selectBox.figure.setVisible(!1)));
                            const a =
                                r &&
                                t.getConnectionView().isVisible &&
                                !t.getConnectionView().isForcedInvisible;
                            (t.getConnectionView().figure.setVisible(a),
                                (function (e) {
                                    const t = c(e);
                                    return (
                                        e.figure.positionDirty ||
                                        t.figure.positionDirty ||
                                        e.figure.sizeDirty ||
                                        t.figure.sizeDirty ||
                                        e.topicView.figure.sizeDirty ||
                                        t.topicView.figure.sizeDirty ||
                                        e.topicView.figure.shapeClassDirty ||
                                        e.getConnectionView().figure
                                            .lineShapeDirty
                                    );
                                })(t) &&
                                    (t
                                        .getConnectionView()
                                        .figure.manuallyLayout(),
                                    t
                                        .getConnectionView()
                                        .figure.manuallyPaint()),
                                t.refreshView());
                        }));
                }));
        }
        const f = new (class extends s.a {
            constructor() {
                (super(...arguments), (this.pool = new Map()));
            }
            getWidth(e) {
                let t = this.pool.get(e);
                return (
                    void 0 === t
                        ? ((t = this.getTopicSizeWithoutEffect(e).width),
                          this.pool.set(e, t),
                          this.initListener(e))
                        : null === t &&
                          ((t = this.getTopicSizeWithoutEffect(e).width),
                          this.pool.set(e, t)),
                    t
                );
            }
            initListener(e) {
                const t = e.viewController,
                    i = t.getContext().model,
                    n = ({ target: i }) => {
                        i === t.model && this.pool.set(e, null);
                    };
                (this.listenTo(i, r.EVENTS.AFTER_SHEET_CONTENT_CHANGE, n),
                    this.listenToOnce(
                        i,
                        r.EVENTS.AFTER_REMOVE_TOPIC,
                        ({ topic: o }) => {
                            o === t.model &&
                                (this.stopListening(
                                    i,
                                    r.EVENTS.AFTER_SHEET_CONTENT_CHANGE,
                                    n
                                ),
                                this.pool.delete(e));
                        }
                    ),
                    this.listenTo(
                        i,
                        r.EVENTS.AFTER_THEME_CHANGED,
                        ({ newColorTheme: e }) => {
                            e ||
                                this.pool.forEach((e, t) =>
                                    this.pool.set(t, null)
                                );
                        }
                    ));
            }
            getTopicSizeWithoutEffect(e) {
                e.forbidInvalidateLayout = !0;
                const t = Object(o.standinTopicView)(e.viewController);
                return ((e.forbidInvalidateLayout = !1), t.figure.size);
            }
        })();
        const h = new (class {
                constructor() {
                    this.currentBranchFigures = [];
                }
                start(e) {
                    if (!e.length || e.some((e) => -1 === e.size.width)) return;
                    this.currentBranchFigures = [...e];
                    const t =
                            this.currentBranchFigures[0].viewController.getContext(),
                        i = t.getSheetView().getCentralBranchView().figure;
                    t.isAlignmentByLevelMode()
                        ? this.doAlignment()
                        : i.alignemntByLevelSettingDirty &&
                          ((i.alignemntByLevelSettingDirty = !1),
                          this.clearAlignment());
                }
                doAlignment() {
                    const e = this.currentBranchFigures[0].viewController
                        .getContext()
                        .getSheetView()
                        .getCentralBranchView().figure;
                    this.expandBranchViewFigureToTableInfo([e], []).forEach(
                        (e) => {
                            const t = this.getFinalWidthInSameLevel(e),
                                i = [];
                            (e.forEach((e) => {
                                const n = e.viewController.topicView.figure;
                                Math.ceil(n.forceAlignmentWidth) !==
                                    Math.ceil(t) &&
                                    (i.push(e), n.setForceAlignmentWidth(t));
                            }),
                                this.reLayoutBranchFigures(i));
                        }
                    );
                }
                clearAlignment() {
                    const e = this.currentBranchFigures[0].viewController
                        .getContext()
                        .getSheetView()
                        .getCentralBranchView().figure;
                    this.expandBranchViewFigureToTableInfo([e], []).forEach(
                        (e) => {
                            (e.forEach((e) => {
                                e.viewController.topicView.figure.setForceAlignmentWidth(
                                    null
                                );
                            }),
                                this.reLayoutBranchFigures(e));
                        }
                    );
                }
                reLayoutBranchFigures(e) {
                    d(
                        (e = e.filter(
                            (e) => !this.currentBranchFigures.includes(e)
                        )),
                        (e) => e.manuallyLayout()
                    );
                }
                getFinalWidthInSameLevel(e) {
                    let t;
                    const i = e.filter((e) =>
                        e.viewController.model.customWidth()
                    );
                    if (i.length) {
                        t = f.getWidth(i[0]);
                        const n = Math.max(
                            ...e.map(
                                (e) =>
                                    e.viewController.topicView.figure
                                        .minimumWidth
                            )
                        );
                        t < n && (t = n);
                    } else t = Math.max(...e.map((e) => f.getWidth(e)));
                    return t;
                }
                expandBranchViewFigureToTableInfo(e, t = []) {
                    const i = [],
                        n = [];
                    return (
                        e.forEach((e) => {
                            const t =
                                e.viewController.getChildrenBranchesByType();
                            (i.push(
                                ...t
                                    .filter(this.filterBranchesToApplyAlignment)
                                    .map((e) => e.figure)
                            ),
                                n.push(...t.map((e) => e.figure)));
                        }),
                        t.push(i),
                        n.length &&
                            this.expandBranchViewFigureToTableInfo(n, t),
                        t.filter((e) => e.length)
                    );
                }
                filterBranchesToApplyAlignment(e) {
                    const t = !(
                            Object(o.isTreeTableCell)(e) &&
                            !Object(o.isTreeTableHeadBranch)(e)
                        ),
                        i =
                            !Object(o.isMatrixCell)(e) &&
                            !Object(o.isMatrixMainBranch)(e),
                        n = !Object(o.isPreventCustomWidthBranch)(e);
                    return t && i && n;
                }
            })(),
            p = {
                [n.b.LAYOUT]: function (e) {
                    const t = {
                        titles: [],
                        markers: [],
                        topics: [],
                        branches: [],
                        relationships: [],
                        boundaries: [],
                        connections: [],
                        matrixLabels: [],
                        mathJaxes: [],
                        others: [],
                    };
                    (new Set(e).forEach((e) => {
                        switch (e.type) {
                            case r.FIGURE_TYPE.TOPIC:
                            case r.FIGURE_TYPE.PLACE_HOLDER_TOPIC:
                                t.topics.push(e);
                                break;
                            case r.FIGURE_TYPE.BRANCH:
                                e.viewController.getContext() &&
                                    t.branches.push(e);
                                break;
                            case r.FIGURE_TYPE.MARKERS:
                                t.markers.push(e);
                                break;
                            case r.FIGURE_TYPE.RELATIONSHIP:
                                t.relationships.push(e);
                                break;
                            case r.FIGURE_TYPE.TOPIC_TITLE:
                            case r.FIGURE_TYPE.RELATIONSHIP_TITLE:
                            case r.FIGURE_TYPE.BOUNDARY_TITLE:
                            case r.FIGURE_TYPE.NUMBERING:
                                t.titles.push(e);
                                break;
                            case r.FIGURE_TYPE.BOUNDARY:
                                t.boundaries.push(e);
                                break;
                            case r.FIGURE_TYPE.CONNECTION:
                                t.connections.push(e);
                                break;
                            case r.FIGURE_TYPE.MATRIX_LABEL:
                                t.matrixLabels.push(e);
                                break;
                            case r.FIGURE_TYPE.MATH_JAX:
                                t.mathJaxes.push(e);
                                break;
                            default:
                                t.others.push(e);
                        }
                    }),
                        t.titles.forEach((e) => e.validateLayout()),
                        t.markers.forEach((e) => e.validateLayout()),
                        t.mathJaxes.forEach((e) => e.validateLayout()),
                        t.topics.forEach((e) => e.validateLayout()),
                        t.matrixLabels.forEach((e) => e.validateLayout()),
                        (t.branches = t.branches.filter((e) =>
                            e.viewController.parent()
                        )),
                        h.start(t.branches),
                        d(t.branches),
                        t.relationships.forEach((e) => e.validateLayout()),
                        t.others.forEach((e) => e.validateLayout()),
                        t.boundaries.forEach((e) => {
                            (!e.isVisible &&
                                e.viewController.selectBox &&
                                e.viewController.selectBox.figure.setVisible(
                                    !1
                                ),
                                e.validateLayout());
                        }));
                },
                [n.b.RENDER]: function (e) {
                    const t = {
                        marker: [],
                        markers: [],
                        topics: [],
                        branches: [],
                        connections: [],
                        others: [],
                    };
                    new Set(e).forEach((e) => {
                        switch (e.type) {
                            case r.FIGURE_TYPE.MARKER:
                                t.marker.push(e);
                                break;
                            case r.FIGURE_TYPE.TOPIC:
                            case r.FIGURE_TYPE.PLACE_HOLDER_TOPIC:
                                t.topics.push(e);
                                break;
                            case r.FIGURE_TYPE.BRANCH:
                                t.branches.push(e);
                                break;
                            case r.FIGURE_TYPE.CONNECTION:
                                t.connections.push(e);
                                break;
                            default:
                                t.others.push(e);
                        }
                    });
                    const i = [
                        'marker',
                        'markers',
                        'topics',
                        'branches',
                        'connections',
                        'others',
                    ];
                    for (const e of i)
                        t[e].forEach((e) => {
                            e.validatePaint();
                        });
                },
            };
        var T = (e, t) => {
            if (t && t.length > 0) {
                (p[e] || u)(t);
            }
        };
        function u(e) {
            new Set(e).forEach((e) => e.execute());
        }
        const g = [
            n.b.BEFORE_EACH,
            n.b.BEFORE_LAYOUT,
            n.b.LAYOUT,
            n.b.AFTER_LAYOUT,
            n.b.BEFORE_RENDER,
            n.b.RENDER,
            n.b.AFTER_RENDER,
            n.b.BEFORE_SELECT_SELECTION,
            n.b.SELECT_SELECTION,
            n.b.AFTER_EACH,
        ];
        function Q(e) {
            return !e.canExecute || e.canExecute();
        }
        const m = new (class {
                constructor() {
                    ((this._running = !1),
                        (this._abortedPriority = n.a.NONE),
                        (this._tasks = {}),
                        g.forEach((e) => (this._tasks[e] = [])));
                }
                work(e, t) {
                    (t &&
                        ((this._tasks[e] = this._tasks[e]
                            ? this._tasks[e]
                            : []),
                        Array.isArray(t)
                            ? this._tasks[e].push(...t)
                            : this._tasks[e].push(t)),
                        this._running ||
                            ((this._running = !0),
                            this._work().then((e) => {
                                ((this._running = !1),
                                    'Aborted' !== e &&
                                        (this._tasks[n.b.LAYOUT].filter((e) =>
                                            Q(e)
                                        ).length > 0 ||
                                            this._tasks[n.b.RENDER].filter(
                                                (e) => Q(e)
                                            ).length > 0) &&
                                        this.work());
                            })));
                }
                _work() {
                    return Promise.resolve().then(() => {
                        g.forEach((e) => {
                            if (
                                e === this._abortedPriority ||
                                this._abortedPriority === n.a.ALL
                            )
                                return 'Aborted';
                            let t = this._tasks[e].filter((e) => Q(e));
                            do {
                                ((this._tasks[e] = this._tasks[e].filter(
                                    (e) => !Q(e) && !e.isDisposed()
                                )),
                                    T(e, t),
                                    (t = this._tasks[e].filter((e) => Q(e))));
                            } while (t.length > 0);
                        });
                    });
                }
                skip(e) {
                    this._abortedPriority = e;
                }
                clearPriority(e) {
                    this._tasks[e] = [];
                }
            })(),
            b = n.c;
    },
];
