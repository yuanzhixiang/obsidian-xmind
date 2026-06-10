export default [
    function (e, t, i) {
        'use strict';
        var n = i(95),
            r = i(0),
            o = i(2),
            a = i(3),
            s = i(30);
        function l(e) {
            const t = { masterArr: [], rangeMap: {} },
                i = {};
            let n = [];
            e.forEach((e) => {
                e.type !== r.VIEW_TYPE.BRANCH ||
                    e.isCentralBranch() ||
                    (i[e.model.get('id')] = e);
            });
            for (const e in i) {
                const t = i[e];
                let r = t.parent();
                for (; !r.isCentralBranch(); ) {
                    if (i[r.model.get('id')]) {
                        delete i[e];
                        break;
                    }
                    r = r.parent();
                }
                r.isCentralBranch() && n.push(t);
            }
            return (
                (n = n.filter(
                    (e) =>
                        !(
                            e.isDetachedBranch() ||
                            e.isSummaryBranch() ||
                            e.isCalloutBranch()
                        ) || (t.masterArr.push(e), !1)
                )),
                (t.rangeMap = (function (e) {
                    let t,
                        i,
                        n = [];
                    const r = (function (e) {
                        const t = {};
                        return (
                            e.forEach((e) => {
                                const i = e.parent();
                                (t[i.cid] ||
                                    ((t[i.cid] = {}),
                                    (t[i.cid].children = []),
                                    (t[i.cid].parent = i)),
                                    t[i.cid].children.push(e));
                            }),
                            Object.values(t).forEach((e) => {
                                Object.entries(e).forEach(([e, t]) => {
                                    'children' === e &&
                                        (function (e) {
                                            const t = e[0].parent(),
                                                i =
                                                    t.getChildrenBranchesByType();
                                            e.sort(
                                                (e, t) =>
                                                    i.indexOf(e) - i.indexOf(t)
                                            );
                                        })(t);
                                });
                            }),
                            t
                        );
                    })(e);
                    return (
                        Object.values(r).forEach((e) => {
                            ((t = e.parent),
                                (i = e.children),
                                i.forEach((e) => {
                                    const i = t
                                        .getChildrenBranchesByType()
                                        .indexOf(e);
                                    n.push(i);
                                }),
                                (e.range = (function (e, t) {
                                    if (e.isMapLike()) {
                                        const i = Object(s.a)(
                                                e.getStructureClass()
                                            ).calcNumRight(e),
                                            n = t.reduce((e, t) => {
                                                if (t.start < i && t.end >= i) {
                                                    const n = {
                                                            start: t.start,
                                                            end: i - 1,
                                                            count: i - t.start,
                                                        },
                                                        r = {
                                                            start: i,
                                                            end: t.end,
                                                            count:
                                                                t.end - i + 1,
                                                        };
                                                    return [...e, n, r];
                                                }
                                                return [...e, t];
                                            }, []);
                                        return n;
                                    }
                                    return t;
                                })(
                                    t,
                                    (function (e) {
                                        const t = e.length,
                                            i = {
                                                start: 0,
                                                end: 0,
                                                count: 1,
                                            },
                                            n = [];
                                        let r = 1,
                                            o = 1;
                                        for (i.start = e[0]; r <= t; r++)
                                            (e[r] - e[r - 1] == 1
                                                ? i.count++
                                                : ((i.end =
                                                      i.start + i.count - 1),
                                                  n.push(Object.assign({}, i)),
                                                  (i.start = e[o]),
                                                  (i.count = 1)),
                                                o++);
                                        return n;
                                    })(n)
                                )),
                                (n = []));
                        }),
                        r
                    );
                })(n)),
                t
            );
        }
        function c({ style: e, value: t, targets: i }) {
            i.forEach((i, n) => {
                i.model.changeStyle(e, t);
            });
        }
        class d extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.ADD_BOUNDARY));
            }
            doExecute() {
                const e = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections(),
                    t = e.length;
                if (t)
                    if (1 === t && e[0].type === r.VIEW_TYPE.BRANCH) {
                        const t = e[0];
                        if (t.isCentralBranch()) return;
                        const n = t.model,
                            r = a.a.getClassName(t);
                        if (
                            [
                                'summaryTopic',
                                'calloutTopic',
                                'floatingTopic',
                            ].includes(r)
                        )
                            n.addBoundary(i('master'));
                        else {
                            const e = t.parent(),
                                n = e.getChildrenBranchesByType().indexOf(t);
                            if (n < 0) return;
                            e.model.addBoundary(i(`(${n},${n})`));
                        }
                    } else {
                        const t = l(e);
                        (t.masterArr.forEach((e) => {
                            e.model.addBoundary(i('master'));
                        }),
                            Object.values(t.rangeMap).forEach((e) => {
                                const { parent: t, range: n } = e;
                                n.forEach((e) => {
                                    t.model.addBoundary(
                                        i(`(${e.start},${e.end})`)
                                    );
                                });
                            }));
                    }
                function i(t) {
                    return {
                        id: e[0].model.ownerSheet().generateComponentId(),
                        title: '',
                        range: t,
                    };
                }
            }
            queryStatus() {
                return this._context
                    .getModule(r.MODULE_NAME.SELECTION)
                    .getSelections()
                    .filter(
                        (e) =>
                            e.type === r.VIEW_TYPE.BRANCH &&
                            e.model.type() === r.TOPIC_TYPE.ATTACHED
                    ).length > 0
                    ? r.ACTION_STATUS.NORMAL
                    : r.ACTION_STATUS.DISABLE;
            }
        }
        var f = i(1);
        class h extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.ADD_CALLOUT_TOPIC));
            }
            doExecute({ topicData: e, targets: t = [] } = {}) {
                ((!t || t.length < 1) &&
                    (t = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    (t = t
                        .filter((e) => e.type === r.VIEW_TYPE.BRANCH)
                        .filter((e) => e.model.type() !== r.TOPIC_TYPE.CALLOUT)
                        .filter((e) => !e.isCentralBranch())
                        .filter(
                            (e) =>
                                0 ===
                                e.getChildrenBranchesByType(
                                    r.TOPIC_TYPE.CALLOUT
                                ).length
                        )).forEach((t) => {
                        const i = t.model,
                            n = e
                                ? i.createTopic(e)
                                : i.ownerSheet().createComponent('topic', {
                                      title: this._context.getTranslatedText(
                                          'DEFAULT_CALLOUT_TOPIC_TITLE'
                                      ),
                                  });
                        (n.set('titleUnedited', !0),
                            i.addChildTopic(n, {
                                type: r.TOPIC_TYPE.CALLOUT,
                            }));
                    }));
            }
            queryStatus({ targets: e = [] } = {}) {
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    (e = e
                        .filter((e) => e.type === r.VIEW_TYPE.BRANCH)
                        .filter((e) => e.model.type() !== r.TOPIC_TYPE.CALLOUT)
                        .filter((e) => !e.isCentralBranch())
                        .filter((e) => !Object(f.isTreeTableCell)(e))
                        .filter(
                            (e) =>
                                0 ===
                                e.getChildrenBranchesByType(
                                    r.TOPIC_TYPE.CALLOUT
                                ).length
                        )).length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        class p extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.ADD_CLASS));
            }
            doExecute({ className: e, targets: t = [] } = {}) {
                void 0 !== e &&
                    ((!t || t.length < 1) &&
                        (t = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    t.length > 0 &&
                        t.forEach((t) => {
                            t.model.addClass(e);
                        }));
            }
            queryStatus({ className: e, targets: t = [] } = {}) {
                return (
                    (!t || t.length < 1) &&
                        (t = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    t.length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        class T extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.ADD_FLOATING_TOPIC));
            }
            doExecute({ clientPosition: e } = {}) {
                this._context.getSVGView().createFloatingTopic(e);
            }
            queryStatus({ clientPosition: e } = {}) {
                return this._context.getSheetView().activatedTopBranchView
                    ? r.ACTION_STATUS.DISABLE
                    : e && e.x && e.y
                      ? r.ACTION_STATUS.NORMAL
                      : r.ACTION_STATUS.DISABLE;
            }
        }
        const u = (e) => e.type === r.VIEW_TYPE.BRANCH;
        class g extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.ADD_IMAGE));
            }
            doExecute({ imageInfo: e, targets: t = [] } = {}) {
                let i, n, o;
                if (
                    ((!t || t.length < 1) &&
                        (t = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    (t = t.filter(u)),
                    'string' == typeof e
                        ? (i = e)
                        : 'object' == typeof e &&
                          ((i = e.src), (n = e.width), (o = e.height)),
                    i)
                ) {
                    const e = { src: i };
                    (n && (e.width = n),
                        o && (e.height = o),
                        t.forEach((t) => {
                            t.model.addImage(Object.assign({}, e));
                        }));
                }
            }
            queryStatus({ targets: e = [] } = {}) {
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    (e = e.filter(u)).length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        var Q = i(20);
        class m extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.ADD_PARENT_TOPIC));
            }
            doExecute({ targets: e = [] } = {}) {
                ((!e || e.length < 1) &&
                    (e = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    (e = e.filter(
                        (e) =>
                            e.type === r.VIEW_TYPE.BRANCH &&
                            e.model.type() !== r.TOPIC_TYPE.CALLOUT
                    )));
                const t = this.findCommonParent(e),
                    i = e[0].model.type();
                this.mergeTopics(t, e, i);
            }
            queryStatus({ targets: e = [] } = {}) {
                if (
                    ((!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    !(e = e.filter(
                        (e) =>
                            e.type === r.VIEW_TYPE.BRANCH &&
                            e.model.type() !== r.TOPIC_TYPE.CALLOUT
                    )) || e.length < 1)
                )
                    return r.ACTION_STATUS.DISABLE;
                if (this.findCommonParent(e)) {
                    const t =
                        this._context.getSheetView().activatedTopBranchView;
                    if (t && e.includes(t)) return r.ACTION_STATUS.DISABLE;
                    const i = e[0].model.type();
                    return i !== r.TOPIC_TYPE.SUMMARY &&
                        e.every((e) => e.model.type() === i)
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE;
                }
                return r.ACTION_STATUS.DISABLE;
            }
            findCommonParent(e) {
                const t = e[0].parent(),
                    i = e.every((e) => e.isDetachedBranch()),
                    n = e.every(
                        (e) => e.isAttachedBranch() && e.parent() === t
                    );
                return i || n ? t : void 0;
            }
            mergeTopics(e, t, i) {
                const n = [...t].sort(
                        (e, t) => e.branchIndex() - t.branchIndex()
                    ),
                    o = e.model,
                    a = n[0].branchIndex(),
                    s = n.map((e) => e.model);
                this._rebuildRelationshipsAfterLayout(n);
                const l = e.getContext().getModule(r.MODULE_NAME.SELECTION);
                let c;
                (l.disable(),
                    s.forEach((e) => e.removeSelf()),
                    l.enable(),
                    i === r.TOPIC_TYPE.ATTACHED
                        ? ((c = o.createEmptyTopic({
                              title: e.getChildDefaultTitle(),
                              titleUnedited: !0,
                          })),
                          o.addChildTopic(c, {
                              at: a,
                              noAnimation: !0,
                          }))
                        : ((c = o.createEmptyTopic({
                              title: this._context.getTranslatedText(
                                  'DEFAULT_FLOATING_TOPIC_TITLE'
                              ),
                              titleUnedited: !0,
                          })),
                          c.set(
                              'position',
                              Object.assign({}, n[0].model.get('position'))
                          ),
                          o.addChildTopic(c, {
                              type: i,
                              noAnimation: !0,
                          })),
                    s.forEach((e) => {
                        c.addChildTopic(e, { noAnimation: !0 });
                    }),
                    Q.a.work(Q.b.PRIORITY.AFTER_EACH, {
                        execute: () => {
                            l.selectSingle(
                                this._context.getComponentViewById(c.id)
                            );
                        },
                    }));
            }
            _rebuildRelationshipsAfterLayout(e) {
                const t = new Set(e.map((e) => e.model.id)),
                    i = e[0].model.ownerSheet(),
                    n = i
                        .relationships()
                        .filter(
                            (e) =>
                                t.has(e.get('end1Id')) || t.has(e.get('end2Id'))
                        );
                Q.a.work(Q.b.PRIORITY.AFTER_LAYOUT, {
                    execute: () => {
                        n.forEach((e) => {
                            i.addRelationship(e.toJSON());
                        });
                    },
                });
            }
        }
        class b extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.ADD_RELATIONSHIP));
            }
            doExecute() {
                this._context.getModule(r.MODULE_NAME.ADD_RELATIONSHIP).start();
            }
            queryStatus() {
                if (
                    !this._context
                        .getModule(r.MODULE_NAME.ADD_RELATIONSHIP)
                        .isReady()
                )
                    return r.ACTION_STATUS.DISABLE;
                const e = this._context
                    .getModule(r.MODULE_NAME.SELECTION)
                    .getSelections();
                return e.length <= 2 &&
                    e.length >= 0 &&
                    e.every(
                        (e) =>
                            e.type === r.VIEW_TYPE.BRANCH ||
                            e.type === r.VIEW_TYPE.BOUNDARY
                    )
                    ? r.ACTION_STATUS.NORMAL
                    : r.ACTION_STATUS.DISABLE;
            }
        }
        class C extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.ADD_SUB_TOPIC));
            }
            doExecute(
                { topicData: e, options: t = {}, targets: i = [] } = {
                    options: {},
                }
            ) {
                ((!i || i.length < 1) &&
                    (i = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    (i = i.filter(
                        (e) =>
                            e.type === r.VIEW_TYPE.BRANCH &&
                            a.a.getClassName(e) !== r.CLASS_TYPE.CALLOUT_TOPIC
                    )).forEach((i) => {
                        const n = i.model,
                            r = Object.assign({}, t);
                        e
                            ? ((e.titleUnedited = !r.isTitleEdited),
                              n.addChildTopic(n.createTopic(e), r))
                            : n.addChildTopic(
                                  n.createEmptyTopic({
                                      title: i.getChildDefaultTitle(),
                                      titleUnedited: !r.isTitleEdited,
                                  }),
                                  r
                              );
                    }));
            }
            queryStatus({ targets: e = [] } = {}) {
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    (e = e.filter(
                        (e) =>
                            e.type === r.VIEW_TYPE.BRANCH &&
                            a.a.getClassName(e) !== r.CLASS_TYPE.CALLOUT_TOPIC
                    )).length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        class L extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.ADD_SUMMARY));
            }
            doExecute() {
                const e = this._context.getModule(
                        r.MODULE_NAME.SELECTION
                    ).selections,
                    t = e.length;
                if (0 === t) return;
                const i = e[0].model.ownerSheet();
                if (1 === t && e[0].type === r.VIEW_TYPE.BRANCH) {
                    const t = e[0];
                    if (t.isCentralBranch()) return;
                    const i = t.parent(),
                        r = i.getChildrenBranchesByType().indexOf(t);
                    if (r < 0) return;
                    const { summaryData: o, summaryTopic: a } = n.call(
                        this,
                        `(${r},${r})`
                    );
                    i.model.addSummary(o, !1, a);
                } else {
                    const t = l(e).rangeMap;
                    Object.values(t).forEach((e) => {
                        const t = e.parent;
                        e.range.forEach((e) => {
                            const { summaryData: i, summaryTopic: r } = n.call(
                                this,
                                `(${e.start},${e.end})`
                            );
                            t.model.addSummary(i, null, r);
                        });
                    });
                }
                function n(e) {
                    const t = this._context.getTranslatedText(
                            'DEFAULT_SUMMARY_TOPIC_TITLE'
                        ),
                        n = i.createComponent('topic', {
                            title: t,
                            titleUnedited: !0,
                        });
                    return {
                        summaryData: {
                            id: i.generateComponentId(),
                            range: e,
                            topicId: n.get('id'),
                        },
                        summaryTopic: n,
                    };
                }
            }
            queryStatus() {
                return this._context
                    .getModule(r.MODULE_NAME.SELECTION)
                    .getSelections()
                    .filter(
                        (e) =>
                            e.type === r.VIEW_TYPE.BRANCH &&
                            e.model.type() === r.TOPIC_TYPE.ATTACHED
                    )
                    .filter((e) => !Object(f.isTreeTableCell)(e)).length > 0
                    ? r.ACTION_STATUS.NORMAL
                    : r.ACTION_STATUS.DISABLE;
            }
        }
        class y extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.ADD_TOPIC_AFTER));
            }
            doExecute({ topicData: e, targets: t = [], options: i = {} } = {}) {
                ((!t || t.length < 1) &&
                    (t = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    (t = t.filter(
                        (e) =>
                            e.type === r.VIEW_TYPE.BRANCH &&
                            a.a.getClassName(e) !==
                                r.CLASS_TYPE.CALLOUT_TOPIC &&
                            a.a.getClassName(e) !== r.CLASS_TYPE.SUMMARY_TOPIC
                    )).forEach((t) => {
                        if (t.isCentralBranch())
                            this._context.execAction(
                                r.ACTION_NAMES.ADD_SUB_TOPIC,
                                {
                                    topicData: e,
                                    targets: [t],
                                    prue: !0,
                                    options: i,
                                }
                            );
                        else if (t.type === r.VIEW_TYPE.BRANCH) {
                            const n = t.model.addBrotherTopic(e, {
                                    before: !1,
                                    position: t.position,
                                    title: t.getBrotherDefaultTitle(),
                                    isTitleEdited: i.isTitleEdited,
                                }),
                                o = t.parent(),
                                a =
                                    o.getStructureClass &&
                                    o.getStructureClass();
                            if (
                                a === r.STRUCTURECLASS.SPREADSHEETROW ||
                                a === r.STRUCTURECLASS.SPREADSHEETCOLUMN
                            ) {
                                const e = t.model.getLabel();
                                n.changeLabel(e);
                            }
                        }
                    }));
            }
            queryStatus({ targets: e = [] } = {}) {
                if (
                    ((!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    1 !== e.length)
                )
                    return r.ACTION_STATUS.DISABLE;
                if (
                    (e = e.filter(
                        (e) =>
                            e.type === r.VIEW_TYPE.BRANCH &&
                            a.a.getClassName(e) !==
                                r.CLASS_TYPE.CALLOUT_TOPIC &&
                            a.a.getClassName(e) !== r.CLASS_TYPE.SUMMARY_TOPIC
                    )).length > 0
                ) {
                    const t =
                        this._context.getSheetView().activatedTopBranchView;
                    return t && e[0] === t
                        ? r.ACTION_STATUS.DISABLE
                        : r.ACTION_STATUS.NORMAL;
                }
                return r.ACTION_STATUS.DISABLE;
            }
        }
        class M extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.ADD_TOPIC_BEFORE));
            }
            doExecute({ topicData: e, targets: t = [], options: i = {} } = {}) {
                ((!t || t.length < 1) &&
                    (t = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    (t = t.filter(
                        (e) =>
                            e.type === r.VIEW_TYPE.BRANCH &&
                            a.a.getClassName(e) !==
                                r.CLASS_TYPE.CALLOUT_TOPIC &&
                            a.a.getClassName(e) !== r.CLASS_TYPE.SUMMARY_TOPIC
                    )).forEach((t) => {
                        if (t.isCentralBranch())
                            this._context.execAction(
                                r.ACTION_NAMES.ADD_SUB_TOPIC,
                                {
                                    topicData: e,
                                    targets: [t],
                                    prue: !0,
                                    options: i,
                                }
                            );
                        else if (t.type === r.VIEW_TYPE.BRANCH) {
                            const n = t.model.addBrotherTopic(e, {
                                    before: !0,
                                    position: t.getRealPosition(),
                                    title: t.getBrotherDefaultTitle(),
                                    isTitleEdited: i.isTitleEdited,
                                }),
                                o = t.parent(),
                                a =
                                    o.getStructureClass &&
                                    o.getStructureClass();
                            if (
                                a === r.STRUCTURECLASS.SPREADSHEETROW ||
                                a === r.STRUCTURECLASS.SPREADSHEETCOLUMN
                            ) {
                                const e = t.model.getLabel();
                                n.changeLabel(e);
                            }
                        }
                    }));
            }
            queryStatus({ targets: e = [] } = {}) {
                if (
                    ((!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    1 !== e.length)
                )
                    return r.ACTION_STATUS.DISABLE;
                if (
                    (e = e.filter(
                        (e) =>
                            e.type === r.VIEW_TYPE.BRANCH &&
                            a.a.getClassName(e) !==
                                r.CLASS_TYPE.CALLOUT_TOPIC &&
                            a.a.getClassName(e) !== r.CLASS_TYPE.SUMMARY_TOPIC
                    )).length > 0
                ) {
                    const t =
                        this._context.getSheetView().activatedTopBranchView;
                    return t && e[0] === t
                        ? r.ACTION_STATUS.DISABLE
                        : r.ACTION_STATUS.NORMAL;
                }
                return r.ACTION_STATUS.DISABLE;
            }
        }
        var A,
            v = i(6),
            E = i.n(v),
            _ = i(27);
        !(function (e) {
            ((e.TOP = 'top'),
                (e.MIDDLE = 'middle'),
                (e.BOTTOM = 'bottom'),
                (e.LEFT = 'left'),
                (e.CENTER = 'center'),
                (e.RIGHT = 'right'),
                (e.EQUALSPACING_VERTICAL = 'equalspacing-vertical'),
                (e.EQUALSPACING_HORIZONTAL = 'equalspacing-horizontal'));
        })(A || (A = {}));
        function O(e) {
            const t = [],
                i = [];
            e.forEach((e) => {
                e.fixed ? t.push(e) : i.push(e);
            });
            const n = [],
                r = i.map((e) => e.src.getBranchPath());
            return (
                t.forEach((e) => {
                    const t = e.src.getBranchPath();
                    r.every((e) => !t.includes(e)) && n.push(e);
                }),
                n.length ? n : i
            );
        }
        function S(e) {
            return ((e = O(e)), E.a.min(e, (e) => e.bound.y));
        }
        function x(e) {
            return ((e = O(e)), E.a.max(e, (e) => e.bound.y + e.bound.height));
        }
        function R(e) {
            return ((e = O(e)), E.a.min(e, (e) => e.bound.x));
        }
        function I(e) {
            return ((e = O(e)), E.a.max(e, (e) => e.bound.x + e.bound.width));
        }
        function N(e) {
            return e.x + e.width;
        }
        var w = class {
            constructor() {}
            align(e, t) {
                const i = this.extractInfo(t);
                let n;
                switch (e) {
                    case A.TOP:
                        n = (function (e) {
                            const t = S(e),
                                i = [];
                            return (
                                e.forEach((e) => {
                                    e.fixed ||
                                        i.push({
                                            src: e.src,
                                            x: 0,
                                            y: t.bound.y - e.bound.y,
                                        });
                                }),
                                i
                            );
                        })(i);
                        break;
                    case A.MIDDLE:
                        n = (function (e) {
                            const t = (function (e) {
                                const t = (e = O(e)).map((e) => e.bound),
                                    i = _.d(t);
                                return i.y + i.height / 2;
                            })(e);
                            return e.map(({ src: e, bound: i, fixed: n }) => {
                                if (!n)
                                    return {
                                        src: e,
                                        x: 0,
                                        y: t - (i.y + i.height / 2),
                                    };
                            });
                        })(i);
                        break;
                    case A.BOTTOM:
                        n = (function (e) {
                            const t = x(e);
                            return e.map(({ src: e, bound: i, fixed: n }) => {
                                if (!n)
                                    return {
                                        src: e,
                                        x: 0,
                                        y:
                                            t.bound.y +
                                            t.bound.height -
                                            (i.y + i.height),
                                    };
                            });
                        })(i);
                        break;
                    case A.LEFT:
                        n = (function (e) {
                            const t = R(e),
                                i = t.bound.x;
                            return e.map(({ src: e, bound: t, fixed: n }) => {
                                if (!n)
                                    return {
                                        src: e,
                                        x: i - t.x,
                                        y: 0,
                                    };
                            });
                        })(i);
                        break;
                    case A.CENTER:
                        n = (function (e) {
                            const t = (function (e) {
                                e = O(e);
                                const t = e.map((e) => e.bound),
                                    i = _.d(t);
                                return i.x + i.width / 2;
                            })(e);
                            return e.map(({ src: e, bound: i, fixed: n }) => {
                                if (!n)
                                    return {
                                        src: e,
                                        x: t - (i.x + i.width / 2),
                                        y: 0,
                                    };
                            });
                        })(i);
                        break;
                    case A.RIGHT:
                        n = (function (e) {
                            const t = I(e),
                                i = t.bound.x + t.bound.width;
                            return e.map(({ src: e, bound: t, fixed: n }) => {
                                if (!n)
                                    return {
                                        src: e,
                                        x: i - (t.x + t.width),
                                        y: 0,
                                    };
                            });
                        })(i);
                        break;
                    case A.EQUALSPACING_HORIZONTAL:
                        n = (function (e) {
                            const t = R(e),
                                i = I(e),
                                n = e
                                    .reduce(
                                        (e, n) =>
                                            n === t || n === i || n.fixed
                                                ? e
                                                : [...e, n],
                                        []
                                    )
                                    .sort((e, t) => e.bound.x - t.bound.x),
                                r = (i.bound.x - t.bound.x) / (n.length + 1),
                                o = t.bound.x + t.bound.width / 2;
                            return n.map(
                                ({ src: e, bound: t, fixed: i }, n) => {
                                    const a = t.x + t.width / 2;
                                    return {
                                        src: e,
                                        x: o + (n + 1) * r - a,
                                        y: 0,
                                    };
                                }
                            );
                        })(i);
                        break;
                    case A.EQUALSPACING_VERTICAL:
                        n = (function (e) {
                            const t = S(e),
                                i = x(e),
                                n = e
                                    .reduce(
                                        (e, n) =>
                                            n === t || n === i || n.fixed
                                                ? e
                                                : [...e, n],
                                        []
                                    )
                                    .sort((e, t) => e.bound.y - t.bound.y),
                                r = t.bound.y + t.bound.height / 2,
                                o = (i.bound.y - t.bound.y) / (n.length + 1);
                            return n.map(
                                ({ src: e, bound: t, fixed: i }, n) => {
                                    const a = t.y + t.height / 2;
                                    return {
                                        src: e,
                                        x: 0,
                                        y: r + (n + 1) * o - a,
                                    };
                                }
                            );
                        })(i);
                        break;
                    default:
                        return;
                }
                this.applyPositioning(n);
            }
            divide(e, t) {
                switch (e) {
                    case 'horizon':
                        this.divideHorizon(t);
                        break;
                    case 'vertical':
                        this.divideVertical(t);
                        break;
                    default:
                        return;
                }
            }
            divideHorizon(e) {
                let t = this.extractFloatingInfo(e);
                t = E.a.sortBy(t, (e) => e.bound.x);
                const i = this._divideHorizonByBoundaryBound(t);
                this.applyPositioning(i);
            }
            _divideHorizonByBoundaryBound(e) {
                let t = 20;
                const i = e.length;
                if (i < 2) return;
                let n = e
                    .map((e) => e.boundaryBound.width)
                    .reduce((e, t) => e + t);
                n += (i - 1) * t;
                const r = _.d(e.map((e) => e.boundaryBound)),
                    o = r.width,
                    a = r.x + r.width / 2,
                    s = [];
                let l = n;
                o > n && ((t += (o - n) / (i - 1)), (l = o));
                let c = a - l / 2;
                return (
                    e.forEach(({ src: e, boundaryBound: i }) => {
                        (s.push({ x: c - i.x, y: 0, src: e }),
                            (c += i.width + t));
                    }),
                    s
                );
            }
            _divideHorizonByShapeBound(e) {
                const t = e.length;
                let i = 0;
                const n = [];
                for (let i = 0; i < t - 1; i++) {
                    const t = e[i],
                        r = e[i + 1],
                        o =
                            N(t.boundaryBound) -
                            N(t.bound) +
                            (r.bound.x - r.boundaryBound.x);
                    n.push(o);
                }
                ((i = Math.max(...n)), (i += 20));
                const r = e[0],
                    o = e[t - 1],
                    a = o.bound.x - N(r.bound),
                    s = e
                        .slice(1, t - 1)
                        .map((e) => e.bound.width)
                        .reduce((e, t) => e + t, 0),
                    l = a - s;
                let c = a,
                    d = i;
                l < i * (t - 1) ? (c = s + i * (t - 1)) : (d = l / (t - 1));
                let f = (N(r.bound) + o.bound.x) / 2 - c / 2;
                const h = [];
                return (
                    h.push({ x: f - N(r.bound), y: 0, src: r.src }),
                    (f += d),
                    e.slice(1).forEach((e) => {
                        (h.push({
                            x: f - e.bound.x,
                            y: 0,
                            src: e.src,
                        }),
                            (f += d + e.bound.width));
                    }),
                    h
                );
            }
            divideVertical(e) {
                let t = this.extractFloatingInfo(e);
                t = E.a.sortBy(t, (e) => e.bound.y);
                const i = this._divideVerticalByBoundaryBound(t);
                this.applyPositioning(i);
            }
            _divideVerticalByBoundaryBound(e) {
                let t = 20;
                const i = e.length;
                if (i < 2) return;
                let n = e
                    .map((e) => e.boundaryBound.height)
                    .reduce((e, t) => e + t);
                n += (i - 1) * t;
                const r = _.d(e.map((e) => e.boundaryBound)),
                    o = r.height,
                    a = r.y + r.height / 2,
                    s = [];
                let l = n;
                o > n && ((t += (o - n) / (i - 1)), (l = o));
                let c = a - l / 2;
                return (
                    e.forEach(({ src: e, bound: i, boundaryBound: n }) => {
                        (s.push({ x: 0, y: c - n.y, src: e }),
                            (c += n.height + t));
                    }),
                    s
                );
            }
            extractFloatingInfo(e) {
                const t = [];
                return (
                    e.forEach((e) => {
                        if (a.a.getClassName(e) !== r.CLASS_TYPE.FLOATING_TOPIC)
                            return;
                        const i = e.getRealPosition(),
                            n = e.topicView.shapeBounds,
                            o = e.boundaryBounds;
                        t.push({
                            bound: {
                                x: n.x + i.x,
                                y: n.y + i.y,
                                width: n.width,
                                height: n.height,
                            },
                            boundaryBound: {
                                x: o.x + i.x,
                                y: o.y + i.y,
                                width: o.width,
                                height: o.height,
                            },
                            src: e,
                        });
                    }),
                    t
                );
            }
            extractInfo(e) {
                return e.map((e) => {
                    const t = e.getRealPosition(),
                        i = e.topicView.shapeBounds;
                    return {
                        bound: {
                            x: i.x + t.x,
                            y: i.y + t.y,
                            width: i.width,
                            height: i.height,
                        },
                        fixed:
                            a.a.getClassName(e) !== r.CLASS_TYPE.FLOATING_TOPIC,
                        src: e,
                    };
                });
            }
            applyPositioning(e) {
                e.forEach((e) => {
                    if (!e) return;
                    const { src: t, x: i, y: n } = e;
                    (0 === i && 0 === n) ||
                        t.model.changePosition({
                            x: t.position.x + i,
                            y: t.position.y + n,
                        });
                });
            }
        };
        class P extends o.a {
            constructor() {
                (super(...arguments), (this.actionName = r.ACTION_NAMES.ALIGN));
            }
            doExecute({ direction: e, targets: t }) {
                (!t || t.length < 1) &&
                    (t = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections());
                new w().align(e, t);
            }
            queryStatus({ targets: e = [] } = {}) {
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    e.length < 2 || e.some((e) => e.type !== r.VIEW_TYPE.BRANCH)
                        ? r.ACTION_STATUS.DISABLE
                        : e.some((e) => e.model.type() === r.TOPIC_DETACHED)
                          ? r.ACTION_STATUS.NORMAL
                          : r.ACTION_STATUS.DISABLE
                );
            }
        }
        class H extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.CANCEL_ADD_RELATIONSHIP));
            }
            doExecute() {
                this._context
                    .getModule(r.MODULE_NAME.ADD_RELATIONSHIP)
                    .cancel();
            }
            queryStatus() {
                return this._context
                    .getModule(r.MODULE_NAME.ADD_RELATIONSHIP)
                    .isReady()
                    ? r.ACTION_STATUS.DISABLE
                    : r.ACTION_STATUS.NORMAL;
            }
        }
        class D extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.CHANGE_BORDER_COLOR));
            }
            doExecute({ color: e, targets: t = [] } = {}) {
                ((!t || t.length < 1) &&
                    (t = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    this._context.execAction(r.ACTION_NAMES.CHANGE_COLOR, {
                        key: r.STYLE_KEYS.BORDER_LINE_COLOR,
                        color: e,
                        targets: t,
                        prue: !0,
                    }));
            }
            queryStatus({ targets: e = [] } = {}) {
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    e.length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        class F extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.CHANGE_BORDER_GRADIENT));
            }
            doExecute({ gradient: e, targets: t = [] } = {}) {
                ((!t || t.length < 1) &&
                    (t = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    (t = t.filter(
                        (e) => e.type === r.VIEW_TYPE.BRANCH
                    )).forEach((t) => {
                        t.model.changeStyle(r.STYLE_KEYS.BORDER_GRADIENT, e);
                    }));
            }
            queryStatus({ targets: e = [] } = {}) {
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    (e = e.filter((e) => e.type === r.VIEW_TYPE.BRANCH))
                        .length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        class k extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.CHANGE_BORDER_WIDTH));
            }
            doExecute({ width: e, targets: t = [] } = {}) {
                ((!t || t.length < 1) &&
                    (t = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    c({
                        style: r.STYLE_KEYS.BORDER_LINE_WIDTH,
                        value: e,
                        targets: t,
                    }));
            }
            queryStatus({ targets: e = [] } = {}) {
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    e.length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        class B extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.CHANGE_BORDER_PATTERN));
            }
            doExecute({ targets: e, linePattern: t } = {}) {
                ((e = this.getFilterBranchViewList(e)),
                    c({
                        style: r.STYLE_KEYS.BORDER_LINE_PATTERN,
                        value: t,
                        targets: e,
                    }));
            }
            queryStatus({ targets: e } = {}) {
                return (e = this.getFilterBranchViewList(e)).length > 0
                    ? r.ACTION_STATUS.NORMAL
                    : r.ACTION_STATUS.DISABLE;
            }
        }
        class V extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName =
                        r.ACTION_NAMES.CHANGE_BOUNDARY_BACKGROUND_COLOR));
            }
            doExecute({ color: e, targets: t = [] } = {}) {
                ((!t || t.length < 1) &&
                    (t = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    (t = t.filter((e) => e.type === r.VIEW_TYPE.BOUNDARY)),
                    this._context.execAction(r.ACTION_NAMES.CHANGE_COLOR, {
                        key: r.STYLE_KEYS.FILL_COLOR,
                        color: e,
                        targets: t,
                        prue: !0,
                    }));
            }
            queryStatus({ targets: e = [] } = {}) {
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    (e = e.filter((e) => e.type === r.VIEW_TYPE.BOUNDARY))
                        .length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        class Y extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName =
                        r.ACTION_NAMES.CHANGE_BOUNDARY_LINE_COLOR));
            }
            doExecute({ color: e, targets: t = [] } = {}) {
                ((!t || t.length < 1) &&
                    (t = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    (t = t.filter((e) => e.type === r.VIEW_TYPE.BOUNDARY)),
                    this._context.execAction(r.ACTION_NAMES.CHANGE_COLOR, {
                        key: r.STYLE_KEYS.LINE_COLOR,
                        color: e,
                        targets: t,
                        prue: !0,
                    }));
            }
            queryStatus({ targets: e = [] } = {}) {
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    (e = e.filter((e) => e.type === r.VIEW_TYPE.BOUNDARY))
                        .length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        class G extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName =
                        r.ACTION_NAMES.CHANGE_BOUNDARY_LINE_PATTERN));
            }
            doExecute({ linePattern: e, targets: t = [] } = {}) {
                ((!t || t.length < 1) &&
                    (t = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    (t = t.filter((e) => e.type === r.VIEW_TYPE.BOUNDARY)),
                    this._context.execAction(
                        r.ACTION_NAMES.CHANGE_LINE_PATTERN,
                        { linePattern: e, targets: t, prue: !0 }
                    ));
            }
            queryStatus({ targets: e = [] } = {}) {
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    (e = e.filter((e) => e.type === r.VIEW_TYPE.BOUNDARY))
                        .length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        class U extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.CHANGE_BOUNDARY_OPACITY));
            }
            doExecute({ opacity: e, targets: t = [] } = {}) {
                ((!t || t.length < 1) &&
                    (t = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    (t = t.filter(
                        (e) => e.type === r.VIEW_TYPE.BOUNDARY
                    )).forEach((t) => {
                        t.model.changeStyle(r.STYLE_KEYS.OPACITY, e);
                    }));
            }
            queryStatus({ targets: e = [] } = {}) {
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    (e = e.filter((e) => e.type === r.VIEW_TYPE.BOUNDARY))
                        .length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        class j extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName =
                        r.ACTION_NAMES.CHANGE_BOUNDARY_PRE_INSTALL_STYLE));
            }
            doExecute({ styleMap: e, targets: t = [] } = {}) {
                this._context.execAction(
                    r.ACTION_NAMES.CHANGE_COMPONENT_PRE_INSTALL_STYLE,
                    { styleMap: e, targets: t, prue: !0 }
                );
            }
            queryStatus({ targets: e = [] } = {}) {
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    e.length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        class $ extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName =
                        r.ACTION_NAMES.CHANGE_BRANCH_LINE_STYLE));
            }
            doExecute({ lineStyle: e, targets: t = [] } = {}) {
                ((!t || t.length < 1) &&
                    (t = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    (t = t.filter((e) => e.type === r.VIEW_TYPE.BRANCH)),
                    c({
                        style: r.STYLE_KEYS.LINE_CLASS,
                        value: e,
                        targets: t,
                    }));
            }
            queryStatus({ targets: e = [] } = {}) {
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    (e = e.filter((e) => e.type === r.VIEW_TYPE.BRANCH))
                        .length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        class z extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.CHANGE_CJK_FONT_FAMILY));
            }
            doExecute({ fontFamily: e } = {}) {
                this._context.model.changeStyle(
                    r.STYLE_KEYS.CJK_FONT_FAMILY,
                    e
                );
            }
        }
        class W extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.CHANGE_COLOR_GRADIENT));
            }
            doExecute({ gradient: e } = {}) {
                void 0 !== e &&
                    this._context
                        .getSVGView()
                        .content()
                        .model.changeStyle(r.STYLE_KEYS.GRADIENT_COLOR, e);
            }
        }
        class K extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.CHANGE_COLOR));
            }
            doExecute({ key: e, color: t, targets: i = [] } = {}) {
                (!i || i.length < 1) &&
                    (i = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections());
                const n = [
                    r.VIEW_TYPE.BRANCH,
                    r.VIEW_TYPE.BOUNDARY,
                    r.VIEW_TYPE.RELATIONSHIP,
                    r.VIEW_TYPE.SHEET,
                ];
                (i = i.filter((e) => n.includes(e.type))).length > 0 &&
                    i.forEach((i) => {
                        let n, o;
                        ('summaryLineColor' === e
                            ? ((n = 'summaryModel'),
                              (o = r.STYLE_KEYS.LINE_COLOR))
                            : ((n = 'model'), (o = e)),
                            i[n].changeStyle(o, t),
                            'model' === n &&
                                o === r.STYLE_KEYS.FILL_COLOR &&
                                i.model.changeStyle(
                                    r.STYLE_KEYS.FILL_GRADIENT,
                                    null
                                ),
                            'model' === n &&
                                o === r.STYLE_KEYS.BORDER_LINE_COLOR &&
                                i.model.changeStyle(
                                    r.STYLE_KEYS.BORDER_GRADIENT,
                                    null
                                ));
                    });
            }
            queryStatus({ targets: e = [] } = {}) {
                (!e || e.length < 1) &&
                    (e = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections());
                const t = [
                    r.VIEW_TYPE.BRANCH,
                    r.VIEW_TYPE.BOUNDARY,
                    r.VIEW_TYPE.RELATIONSHIP,
                    r.VIEW_TYPE.SHEET,
                ];
                return (e = e.filter((e) => t.includes(e.type))).length > 0
                    ? r.ACTION_STATUS.NORMAL
                    : r.ACTION_STATUS.DISABLE;
            }
        }
        class Z extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.CHANGE_COMMENTS_INFO));
            }
            doExecute({ newCommentsInfo: e, targets: t = [] } = {}) {
                ((!t || t.length < 1) &&
                    (t = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    (t = t.filter(
                        (e) => e.type === r.VIEW_TYPE.BRANCH
                    )).forEach((t) => {
                        t.model.changeComments(e);
                    }));
            }
            queryStatus({ targets: e = [] } = {}) {
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    (e = e.filter((e) => e.type === r.VIEW_TYPE.BRANCH))
                        .length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        class J extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName =
                        r.ACTION_NAMES.CHANGE_COMPONENT_PRE_INSTALL_STYLE));
            }
            doExecute({ styleMap: e, targets: t = [] } = {}) {
                void 0 !== e &&
                    ((!t || t.length < 1) &&
                        (t = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    t.forEach((t) => {
                        Object.keys(e).forEach((i) => {
                            t.model.changeStyle(i, e[i]);
                        });
                    }));
            }
            queryStatus({ targets: e = [] } = {}) {
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    e.length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        class X extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.CHANGE_END_ARROW_TYPE));
            }
            doExecute({ style: e, targets: t } = {}) {
                c({
                    style: r.STYLE_KEYS.ARROW_END_CLASS,
                    value: e,
                    targets: this.getFilterViewList(t),
                });
            }
            queryStatus({ targets: e = [] } = {}) {
                return (e = this.getFilterViewList(e)).length > 0
                    ? r.ACTION_STATUS.NORMAL
                    : r.ACTION_STATUS.DISABLE;
            }
            getFilterViewList(e) {
                (!e || e.length < 1) &&
                    (e = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections());
                const t = [r.VIEW_TYPE.BRANCH, r.VIEW_TYPE.RELATIONSHIP];
                return e.filter((e) => t.includes(e.type));
            }
        }
        class q extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.CHANGE_FILL_GRADIENT));
            }
            doExecute({ gradient: e, targets: t = [] } = {}) {
                ((!t || t.length < 1) &&
                    (t = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    (t = t.filter(
                        (e) => e.type === r.VIEW_TYPE.BRANCH
                    )).forEach((t) => {
                        t.model.changeStyle(r.STYLE_KEYS.FILL_GRADIENT, e);
                    }));
            }
            queryStatus({ targets: e = [] } = {}) {
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    (e = e.filter((e) => e.type === r.VIEW_TYPE.BRANCH))
                        .length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        class ee extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.CHANGE_FONT_FAMILY));
            }
            doExecute({ fontFamily: e, targets: t = [] } = {}) {
                ((!t || t.length < 1) &&
                    (t = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    c({
                        style: r.STYLE_KEYS.FONT_FAMILY,
                        value: e,
                        targets: t,
                    }));
            }
            queryStatus({ targets: e = [] } = {}) {
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    e.length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        class te extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.CHANGE_FONT_SIZE));
            }
            doExecute({ size: e, targets: t = [] } = {}) {
                ((!t || t.length < 1) &&
                    (t = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    c({
                        style: r.STYLE_KEYS.FONT_SIZE,
                        value: e,
                        targets: t,
                    }));
            }
            queryStatus({ targets: e = [] } = {}) {
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    e.length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        class ie extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.CHANGE_FONT_STYLE));
            }
            doExecute({ fontStyle: e, targets: t = [] } = {}) {
                ((!t || t.length < 1) &&
                    (t = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    c({
                        style: r.STYLE_KEYS.FONT_STYLE,
                        value: e,
                        targets: t,
                    }));
            }
            queryStatus({ targets: e = [] } = {}) {
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    e.length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        class ne extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.CHANGE_FONT_WEIGHT));
            }
            doExecute({ fontWeight: e, targets: t = [] } = {}) {
                ((!t || t.length < 1) &&
                    (t = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    c({
                        style: r.STYLE_KEYS.FONT_WEIGHT,
                        value: e,
                        targets: t,
                    }));
            }
            queryStatus({ targets: e = [] } = {}) {
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    e.length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        class re extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.CHANGE_HYPER_LINK));
            }
            doExecute({ link: e, targets: t = [] } = {}) {
                this.getFilterBranchViewList(t).forEach((t) => {
                    t.model.changeHref(e);
                });
            }
            queryStatus({ targets: e = [] } = {}) {
                return (e = this.getFilterBranchViewList(e)).length > 0
                    ? r.ACTION_STATUS.NORMAL
                    : r.ACTION_STATUS.DISABLE;
            }
            getFilterBranchViewList(e) {
                return super
                    .getFilterBranchViewList(e)
                    .filter((e) => !e.model.getAudioNotes());
            }
        }
        class oe extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName =
                        r.ACTION_NAMES.CHANGE_INFO_ITEM_DISPLAY));
            }
            doExecute({ type: e, mode: t } = {}) {
                const i = this._context.getSheetView().model;
                e
                    ? i.changeInfoItemDisplay(e, t)
                    : [
                          r.VIEW_TYPE.LABEL,
                          r.VIEW_TYPE.HREF,
                          r.VIEW_TYPE.NOTE,
                          r.VIEW_TYPE.TASK,
                      ].forEach((e) => {
                          i.changeInfoItemDisplay(e, t);
                      });
            }
        }
        class ae extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.CHANGE_LABEL));
            }
            doExecute({ labelString: e, targets: t = [] } = {}) {
                ((!t || t.length < 1) &&
                    (t = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    (t = t.filter(
                        (e) => e.type === r.VIEW_TYPE.BRANCH
                    )).forEach((t) => {
                        t.model.changeLabel(e);
                    }));
            }
            queryStatus({ targets: e = [] } = {}) {
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    (e = e.filter((e) => e.type === r.VIEW_TYPE.BRANCH))
                        .length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        class se extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.CHANGE_LEGEND_DISPLAY));
            }
            doExecute({ display: e } = { display: !1 }) {
                const t = this._context.getSVGView().content(),
                    i = t.model;
                (i.get('legend') || i.set('legend', {}),
                    t.initLegend(),
                    i.getLegendModel().setLegendDisplay(e));
            }
        }
        class le extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.CHANGE_LINE_COLOR));
            }
            doExecute({ color: e, targets: t = [] } = {}) {
                ((!t || t.length < 1) &&
                    (t = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    this._context.execAction(r.ACTION_NAMES.CHANGE_COLOR, {
                        key: r.STYLE_KEYS.LINE_COLOR,
                        color: e,
                        targets: t,
                        prue: !0,
                    }));
            }
            queryStatus({ targets: e = [] } = {}) {
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    e.length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        class ce extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.CHANGE_LINE_PATTERN));
            }
            doExecute({ linePattern: e, targets: t } = {}) {
                const i = this.getFilterViewList(t);
                (c({
                    style: r.STYLE_KEYS.LINE_PATTERN,
                    value: e,
                    targets: i,
                }),
                    e &&
                        ![
                            r.LINE_PATTERN.SOLID,
                            r.LINE_PATTERN.HANDDRAWNSOLID,
                        ].includes(e) &&
                        this.clearSheetLineTapered(i));
            }
            queryStatus({ targets: e = [] } = {}) {
                return (e = this.getFilterViewList(e)).length > 0
                    ? r.ACTION_STATUS.NORMAL
                    : r.ACTION_STATUS.DISABLE;
            }
            getFilterViewList(e) {
                (!e || e.length < 1) &&
                    (e = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections());
                const t = [
                    r.VIEW_TYPE.BRANCH,
                    r.VIEW_TYPE.BOUNDARY,
                    r.VIEW_TYPE.RELATIONSHIP,
                ];
                return e.filter((e) => t.includes(e.type));
            }
            clearSheetLineTapered(e) {
                const t = this._context.getSheetView().getCentralBranchView();
                e.some((e) => e === t) &&
                    this._context.execAction(
                        r.ACTION_NAMES.CHANGE_LINE_TAPERED,
                        { tapered: r.LINETAPERED.NONE }
                    );
            }
        }
        class de extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.CHANGE_LINE_TAPERED));
            }
            doExecute({ tapered: e } = {}) {
                void 0 !== e &&
                    (this._context
                        .getSVGView()
                        .content()
                        .model.changeStyle(r.STYLE_KEYS.LINE_TAPERED, e),
                    e === r.LINETAPERED.TAPERED &&
                        this.clearCentralBranchViewLinePattern());
            }
            clearCentralBranchViewLinePattern() {
                const e = this._context.getSheetView().getCentralBranchView(),
                    t = e.figure.linePattern;
                let i;
                (Object.values(r.HAND_DRAWN_LINE_PATTERN).includes(t) &&
                    t !== r.LINE_PATTERN.HANDDRAWNSOLID &&
                    (i = r.LINE_PATTERN.HANDDRAWNSOLID),
                    Object.values(r.NORMAL_LINE_PATTERN).includes(t) &&
                        t !== r.LINE_PATTERN.SOLID &&
                        (i = r.LINE_PATTERN.SOLID),
                    i &&
                        this._context.execAction(
                            r.ACTION_NAMES.CHANGE_LINE_PATTERN,
                            { linePattern: i, targets: [e] }
                        ));
            }
        }
        class fe extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.CHANGE_LINE_WIDTH));
            }
            doExecute({ width: e, targets: t = [] } = {}) {
                ((!t || t.length < 1) &&
                    (t = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    c({
                        style: r.STYLE_KEYS.LINE_WIDTH,
                        value: e,
                        targets: t,
                    }));
            }
            queryStatus({ targets: e = [] } = {}) {
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    e.length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        class he extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.CHANGE_MAP_OPACITY));
            }
            doExecute({ opacity: e } = {}) {
                this._context
                    .getSheetView()
                    .model.changeStyle(r.STYLE_KEYS.OPACITY, e);
            }
        }
        class pe extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.CHANGE_MARKER));
            }
            doExecute({ markerId: e, targets: t = [] } = {}) {
                e &&
                    this.getFilterBranchViewList(t).forEach((t) => {
                        t.model.changeMarker(e);
                    });
            }
            queryStatus({ targets: e = [] } = {}) {
                return this.getFilterBranchViewList(e).length > 0
                    ? r.ACTION_STATUS.NORMAL
                    : r.ACTION_STATUS.DISABLE;
            }
        }
        const Te = [r.CLASS_TYPE.MAIN_TOPIC, r.CLASS_TYPE.SUB_TOPIC],
            ue = [r.STYLE_KEYS.TEXT_COLOR, r.STYLE_KEYS.FILL_COLOR];
        class ge extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName =
                        r.ACTION_NAMES.CHANGE_MULTI_LINE_COLORS));
            }
            doExecute({ multiLineColors: e } = {}) {
                const t = Object(f.getInjectModule)(r.MODULE_NAME.SNOWBALL),
                    i = this._context.model.theme().getColorThemeId();
                (i &&
                    t.isSmartColorTheme(i) &&
                    (e && 'none' !== e
                        ? this.clearThemeData()
                        : this.restoreThemeData()),
                    this._context
                        .getSVGView()
                        .content()
                        .model.changeStyle(r.STYLE_KEYS.MULTI_LINE_COLORS, e));
            }
            clearThemeData() {
                const e = this._context.model.theme().toJSON();
                Te.forEach((t) => {
                    e[t] &&
                        e[t].properties &&
                        ue.forEach((i) => {
                            const n = e[t].properties[i];
                            (i === r.STYLE_KEYS.FILL_COLOR && 'none' === n) ||
                                delete e[t].properties[i];
                        });
                });
                const t = {};
                Object.values(r.CLASS_TYPE).forEach((e) => (t[e] = []));
                const i = [
                    r.STYLE_KEYS.LINE_COLOR,
                    r.STYLE_KEYS.FILL_COLOR,
                    r.STYLE_KEYS.BORDER_LINE_COLOR,
                    r.STYLE_KEYS.TEXT_COLOR,
                ];
                (Te.forEach((e) => (t[e] = i)),
                    a.a.changeTheme(this._context.getSheetView(), e, {
                        styleKeysToBeFix: t,
                        newMultiLineColors: !0,
                    }));
            }
            restoreThemeData() {
                const e = this._context.model.theme().getColorThemeId(),
                    t = Object(f.getInjectModule)(r.MODULE_NAME.SNOWBALL),
                    i = t.getColorThemeDataById(e),
                    n =
                        i.theme[r.CLASS_TYPE.MAP].properties[
                            r.STYLE_KEYS.FILL_COLOR
                        ],
                    o =
                        i.theme[r.CLASS_TYPE.MAP].properties[
                            r.STYLE_KEYS.COLOR_LIST
                        ].split(' '),
                    s = t.generateSmartColorThemeWithAllStyleInfo(n, o);
                if (!s) return;
                const l = this._context.model.theme().toJSON();
                (Te.forEach((e) => {
                    l[e] &&
                        l[e].properties &&
                        ue.forEach((t) => {
                            const i = l[e].properties[t];
                            if (t === r.STYLE_KEYS.FILL_COLOR && 'none' === i)
                                return;
                            const n = s.theme[e].properties[t];
                            n && (l[e].properties[t] = n);
                        });
                }),
                    a.a.changeTheme(this._context.getSheetView(), l, {
                        toFixUserStyle: !1,
                    }));
            }
        }
        class Qe extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.CHANGE_NOTE));
            }
            doExecute({ noteContent: e, targets: t = [] } = {}) {
                ((!t || t.length < 1) &&
                    (t = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    (t = t.filter(
                        (e) => e.type === r.VIEW_TYPE.BRANCH
                    )).forEach((t) => {
                        t.model.changeNote(e);
                    }));
            }
            queryStatus({ targets: e = [] } = {}) {
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    1 ===
                    (e = e.filter((e) => e.type === r.VIEW_TYPE.BRANCH)).length
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        class me extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName =
                        r.ACTION_NAMES.CHANGE_RELATIONSHIP_LINE_COLOR));
            }
            doExecute({ color: e, targets: t = [] } = {}) {
                ((!t || t.length < 1) &&
                    (t = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    (t = t.filter((e) => e.type === r.VIEW_TYPE.RELATIONSHIP)),
                    this._context.execAction(r.ACTION_NAMES.CHANGE_COLOR, {
                        key: r.STYLE_KEYS.LINE_COLOR,
                        color: e,
                        targets: t,
                        prue: !0,
                    }));
            }
            queryStatus({ targets: e = [] } = {}) {
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    (e = e.filter((e) => e.type === r.VIEW_TYPE.RELATIONSHIP))
                        .length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        class be extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName =
                        r.ACTION_NAMES.CHANGE_RELATIONSHIP_PRE_INSTALL_STYLE));
            }
            doExecute({ styleMap: e, targets: t = [] } = {}) {
                this._context.execAction(
                    r.ACTION_NAMES.CHANGE_COMPONENT_PRE_INSTALL_STYLE,
                    { styleMap: e, targets: t, prue: !0 }
                );
            }
            queryStatus({ targets: e = [] } = {}) {
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    e.length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        class Ce extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.CHANGE_SHAPE_CLASS));
            }
            doExecute({ shape: e, targets: t = [] } = {}) {
                if (
                    ((!t || t.length < 1) &&
                        (t = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    -1 !== e.indexOf('calloutTopicShape'))
                ) {
                    const i = (e) =>
                        e.type === r.VIEW_TYPE.BRANCH && e.isCalloutBranch();
                    c({
                        style: r.STYLE_KEYS.CALLOUT_SHAPE_CLASS,
                        value: e,
                        targets: t.filter(i),
                    });
                } else {
                    const i = (e) =>
                        e.type === r.VIEW_TYPE.BRANCH ||
                        e.type === r.VIEW_TYPE.BOUNDARY ||
                        e.type === r.VIEW_TYPE.RELATIONSHIP;
                    c({
                        style: r.STYLE_KEYS.SHAPE_CLASS,
                        value: e,
                        targets: t.filter(i),
                    });
                }
            }
            queryStatus({ targets: e = [] } = {}) {
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    (e = e.filter(
                        (e) =>
                            e.type === r.VIEW_TYPE.BRANCH ||
                            e.type === r.VIEW_TYPE.BOUNDARY ||
                            e.type === r.VIEW_TYPE.RELATIONSHIP
                    )).length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        class Le extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.CHANGE_SHAPE_COLOR));
            }
            doExecute({ color: e, targets: t = [] } = {}) {
                ((!t || t.length < 1) &&
                    (t = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    this._context.execAction(r.ACTION_NAMES.CHANGE_COLOR, {
                        key: r.STYLE_KEYS.FILL_COLOR,
                        color: e,
                        targets: t,
                        prue: !0,
                    }));
            }
            queryStatus({ targets: e = [] } = {}) {
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    e.length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        class ye extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.CHANGE_SHEET_BACKGROUND));
            }
            doExecute({
                color: e,
                targets: t = [this._context.getSheetView()],
            } = {}) {
                this._context.execAction(r.ACTION_NAMES.CHANGE_COLOR, {
                    key: r.STYLE_KEYS.FILL_COLOR,
                    color: e,
                    targets: t,
                    prue: !0,
                });
            }
        }
        class Me extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.CHANGE_START_ARROW_TYPE));
            }
            doExecute({ style: e, targets: t = [] } = {}) {
                ((!t || t.length < 1) &&
                    (t = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    (t = t.filter((e) => e.type === r.VIEW_TYPE.RELATIONSHIP)),
                    c({
                        style: r.STYLE_KEYS.ARROW_BEGIN_CLASS,
                        value: e,
                        targets: t,
                    }));
            }
            queryStatus({ targets: e = [] } = {}) {
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    (e = e.filter((e) => e.type === r.VIEW_TYPE.RELATIONSHIP))
                        .length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        const Ae = (e) => e.type === r.VIEW_TYPE.BRANCH;
        class ve extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.CHANGE_STICKER));
            }
            doExecute({ imageInfo: e, targets: t = [] } = {}) {
                ((!t || t.length < 1) &&
                    (t = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    (t = t.filter(Ae)).forEach((t) => {
                        const i = t.model.getImageModel();
                        i && i.getSrc()
                            ? this._context.execAction(
                                  r.ACTION_NAMES.CHANGE_IMAGE,
                                  {
                                      imageData: e,
                                      targets: [t],
                                      prue: !0,
                                  }
                              )
                            : this._context.execAction(
                                  r.ACTION_NAMES.ADD_IMAGE,
                                  {
                                      imageInfo: e,
                                      targets: [t],
                                      prue: !0,
                                  }
                              );
                    }));
            }
            queryStatus({ targets: e = [] } = {}) {
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    (e = e.filter(Ae)).length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        class Ee extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.CHANGE_STRUCTURE));
            }
            doExecute({ targets: e = [], structureClass: t } = {}) {
                ((!e || e.length <= 0) &&
                    (e = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .selections.filter(
                            (e) => e.type === r.VIEW_TYPE.BRANCH
                        )),
                    e.forEach((e) => e.model.changeStructure(t)));
            }
            queryStatus({ targets: e = [] } = {}) {
                return (
                    (!e || e.length <= 0) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .selections.filter(
                                (e) => e.type === r.VIEW_TYPE.BRANCH
                            )),
                    e.length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        class _e extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName =
                        r.ACTION_NAMES.CHANGE_SUMMARY_LINE_COLOR));
            }
            doExecute({ color: e, targets: t = [] } = {}) {
                ((!t || t.length < 1) &&
                    (t = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    (t = t.filter((e) => e.summaryModel)).forEach((t) => {
                        t.summaryModel.changeStyle(r.STYLE_KEYS.LINE_COLOR, e);
                    }));
            }
            queryStatus({ targets: e = [] } = {}) {
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    (e = e.filter((e) => e.summaryModel)).length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        class Oe extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName =
                        r.ACTION_NAMES.CHANGE_SUMMARY_LINE_STYLE));
            }
            doExecute({ lineStyle: e, targets: t = [] } = {}) {
                ((!t || t.length < 1) &&
                    (t = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    (t = t.filter((e) => e.summaryModel)).forEach((t) => {
                        t.summaryModel.changeStyle(r.STYLE_KEYS.SHAPE_CLASS, e);
                    }));
            }
            queryStatus({ targets: e = [] } = {}) {
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    (e = e.filter((e) => e.summaryModel)).length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        class Se extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName =
                        r.ACTION_NAMES.CHANGE_SUMMARY_LINE_WIDTH));
            }
            doExecute({ width: e, targets: t = [] } = {}) {
                ((!t || t.length < 1) &&
                    (t = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    (t = t.filter((e) => e.summaryModel)).forEach((t) => {
                        t.summaryModel.changeStyle(r.STYLE_KEYS.LINE_WIDTH, e);
                    }));
            }
            queryStatus({ targets: e = [] } = {}) {
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    (e = e.filter((e) => e.summaryModel)).length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        class xe extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName =
                        r.ACTION_NAMES.CHANGE_SUMMARY_LINE_PATTERN));
            }
            doExecute(
                { linePattern: e, targets: t = [] } = {
                    linePattern: r.LINE_PATTERN.SOLID,
                }
            ) {
                ((!t || t.length < 1) &&
                    (t = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    (t = t.filter((e) => e.summaryModel)).forEach((t) => {
                        t.summaryModel.changeStyle(
                            r.STYLE_KEYS.LINE_PATTERN,
                            e
                        );
                    }));
            }
            queryStatus({ targets: e = [] } = {}) {
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    (e = e.filter((e) => e.summaryModel)).length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        class Re extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.CHANGE_TEXT_ALIGN));
            }
            doExecute({ textAlign: e, targets: t = [] } = {}) {
                ((!t || t.length < 1) &&
                    (t = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    c({
                        style: r.STYLE_KEYS.TEXT_ALIGN,
                        value: e,
                        targets: t,
                    }));
            }
            queryStatus({ targets: e = [] } = {}) {
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    e.length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        class Ie extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.CHANGE_TEXT_COLOR));
            }
            doExecute({ color: e, targets: t = [] } = {}) {
                ((!t || t.length < 1) &&
                    (t = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    this._context.execAction(r.ACTION_NAMES.CHANGE_COLOR, {
                        key: r.STYLE_KEYS.TEXT_COLOR,
                        color: e,
                        targets: t,
                        prue: !0,
                    }));
            }
            queryStatus({ targets: e = [] } = {}) {
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    e.length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        class Ne extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.CHANGE_TEXT_DECORATION));
            }
            doExecute({ textDecoration: e, targets: t = [] } = {}) {
                ((!t || t.length < 1) &&
                    (t = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    c({
                        style: r.STYLE_KEYS.TEXT_DECORATION,
                        value: e,
                        targets: t,
                    }));
            }
            queryStatus({ targets: e = [] } = {}) {
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    e.length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        class we extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.CHANGE_TEXT_TRANSFORM));
            }
            doExecute({ type: e, targets: t = [] } = {}) {
                ((!t || t.length < 1) &&
                    (t = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    c({
                        style: r.STYLE_KEYS.TEXT_TRANSFORM,
                        value: e,
                        targets: t,
                    }));
            }
            queryStatus({ targets: e = [] } = {}) {
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    e.length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        class Pe extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.CHANGE_THEME));
            }
            doExecute({
                themeData: e,
                skeletonThemeData: t,
                colorThemeData: i,
                options: n,
            } = {}) {
                var r;
                const o = this._context.getSheetView();
                if (e)
                    return (
                        this._context.initTemporaryColorThemeInOldThemeFiles(),
                        a.a.changeTheme(o, e, n)
                    );
                if (t) {
                    const e = { temporaryColorThemeId: void 0 };
                    (this._context.model.theme().getColorThemeId() ||
                        (e.temporaryColorThemeId =
                            null ===
                                (r =
                                    this._context.getCurrentTemporaryColorTheme()) ||
                            void 0 === r
                                ? void 0
                                : r.id),
                        a.a.changeSkeletonTheme(o, t, e),
                        this.clearHandDrawnActiveMode());
                }
                i && a.a.changeColorTheme(o, i);
            }
            clearHandDrawnActiveMode() {
                this._context.execAction(
                    r.ACTION_NAMES.CHANGE_HAND_DRAWN_MODE_ACTIVE,
                    { active: !1 }
                );
            }
        }
        class He extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.CHANGE_TITLE));
            }
            doExecute({ newTitle: e, targets: t = [] } = {}) {
                ((!t || t.length < 1) &&
                    (t = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    (t = t.filter(
                        (e) =>
                            e.type === r.VIEW_TYPE.BRANCH ||
                            e.type === r.VIEW_TYPE.BOUNDARY ||
                            e.type === r.VIEW_TYPE.RELATIONSHIP ||
                            e.type === r.VIEW_TYPE.MATRIX_LABEL
                    )).forEach((t) => {
                        t.saveEdit(e);
                    }));
            }
            queryStatus({ targets: e = [] } = {}) {
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    (e = e.filter(
                        (e) =>
                            e.type === r.VIEW_TYPE.BRANCH ||
                            e.type === r.VIEW_TYPE.BOUNDARY ||
                            e.type === r.VIEW_TYPE.RELATIONSHIP ||
                            e.type === r.VIEW_TYPE.MATRIX_LABEL
                    )).length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        class De extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName =
                        r.ACTION_NAMES.CHANGE_TOPIC_CUSTOM_WIDTH));
            }
            doExecute({ customWidth: e, targets: t = [] } = {}) {
                if (void 0 === e) return;
                ((!t || t.length < 1) &&
                    (t = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    (t = t.filter(
                        (e) =>
                            e.type === r.VIEW_TYPE.BRANCH &&
                            a.a.getClassName(e) !== r.CLASS_TYPE.CALLOUT_TOPIC
                    )));
                const i = [
                        r.TOPICSHAPE.DIAMOND,
                        r.TOPICSHAPE.ELLIPSE,
                        r.TOPICSHAPE.CLOUD,
                    ],
                    n = t
                        .map((e) => e.topicView)
                        .filter((e) => !i.includes(e.topicShapeStyle));
                if (e <= 0)
                    n.forEach((e) => {
                        e.model.customWidth(0);
                    });
                else {
                    const t = [];
                    n.forEach((i) => {
                        const n = i.getTopicMinWidth();
                        e >= r.TOPIC_MAX_CUSTOM_WIDTH
                            ? (e = r.TOPIC_MAX_CUSTOM_WIDTH)
                            : e <= n && (e = n);
                        (!(function (e, t, i) {
                            const n = e.getContext().getSheetView();
                            if (!e.getContext().isAlignmentByLevelMode())
                                return;
                            if (i.includes(e)) return;
                            if (Object(f.isDetachedBranch)(e)) return;
                            const r = e.getLayer(),
                                o = n.getCentralBranchView();
                            let a = r - (null == o ? void 0 : o.getLayer()),
                                s = [o];
                            for (; a > 0; )
                                ((s = s
                                    .map((e) =>
                                        null == e
                                            ? void 0
                                            : e.getChildrenBranchesByType()
                                    )
                                    .reduce((e, t) => e.concat(t), [])),
                                    1 === a &&
                                        (s = s.filter((e) =>
                                            e.model.customWidth()
                                        )),
                                    a--);
                            (i.push(...s),
                                s.forEach((e) => e.model.customWidth(t)));
                        })(i.parent(), e, t),
                            i.model.customWidth(e));
                    });
                }
            }
            queryStatus({ targets: e = [] } = {}) {
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    (e = e.filter(
                        (e) =>
                            e.type === r.VIEW_TYPE.BRANCH &&
                            a.a.getClassName(e) !== r.CLASS_TYPE.CALLOUT_TOPIC
                    )).length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        class Fe extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.CHANGE_TOPIC_OVERLAP));
            }
            doExecute({ value: e } = {}) {
                this._context.model.changeOverlap(e);
            }
        }
        class ke extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName =
                        r.ACTION_NAMES.CHANGE_TOPIC_POSITIONING));
            }
            doExecute({ value: e } = {}) {
                this._context.model.toggleFreePosition('free' === e);
            }
        }
        class Be extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName =
                        r.ACTION_NAMES.CHANGE_TOPIC_PRE_INSTALL_STYLE));
            }
            doExecute({ styleMap: e, targets: t = [] } = {}) {
                this._context.execAction(
                    r.ACTION_NAMES.CHANGE_COMPONENT_PRE_INSTALL_STYLE,
                    { styleMap: e, targets: t, prue: !0 }
                );
            }
            queryStatus({ targets: e = [] } = {}) {
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    e.length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        class Ve extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.CHANGE_FILL_PATTERN));
            }
            doExecute({ fillPattern: e, targets: t = [] } = {}) {
                ((!t || t.length < 1) &&
                    (t = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    c({
                        style: r.STYLE_KEYS.FILL_PATTERN,
                        value: e,
                        targets: t,
                    }));
            }
            queryStatus({ targets: e = [] } = {}) {
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    (e = e.filter((e) =>
                        [r.VIEW_TYPE.BRANCH, r.VIEW_TYPE.BOUNDARY].includes(
                            e.type
                        )
                    )).length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        class Ye extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.CLOSE_UNDO_KEEP_MODE));
            }
            doExecute() {
                this._context.model.getUndo().keepAllInOne(!1);
            }
        }
        class Ge extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.COLLAPSE_BRANCHES));
            }
            doExecute(
                { relativeLayer: e = 0, spread: t = !1, targets: i = [] } = {
                    relativeLayer: 0,
                    spread: !1,
                }
            ) {
                ((!i || i.length < 1) &&
                    (i = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    (i = i.filter(
                        (e) => e.type === r.VIEW_TYPE.BRANCH
                    )).forEach((i) => {
                        if (e > 0 || t) {
                            const n = i.model.getLayer() + e,
                                o = [
                                    r.TOPIC_TYPE.ATTACHED,
                                    r.TOPIC_TYPE.DETACHED,
                                    r.TOPIC_TYPE.SUMMARY,
                                ];
                            i.model.traverseTopic(o, (e) => {
                                (e.getLayer() === n ||
                                    (t && e.getLayer() >= n)) &&
                                    e.collapseBranch();
                            });
                        } else i.model.collapseBranch();
                    }));
            }
            queryStatus(
                { relativeLayer: e = 0, spread: t = !1, targets: i = [] } = {
                    relativeLayer: 0,
                    spread: !1,
                }
            ) {
                return (
                    (!i || i.length < 1) &&
                        (i = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    (i =
                        e > 0 || t
                            ? i.filter(
                                  (e) =>
                                      e.type === r.VIEW_TYPE.BRANCH &&
                                      e.model.type() !== r.TOPIC_TYPE.CALLOUT
                              )
                            : i.filter(
                                  (e) =>
                                      e.type === r.VIEW_TYPE.BRANCH &&
                                      e.model.canCollapse() &&
                                      !e.isMatrixHeadCellBranch() &&
                                      !e.model.isCollapse()
                              )).length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        class Ue extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.COPY_STYLE));
            }
            doExecute({ targets: e } = {}) {
                if (
                    (!e || e.length < 1) &&
                    1 !==
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()).length
                )
                    return;
                const t = e[0],
                    i = a.a.getComputedStyle(t);
                let n = null;
                if (
                    t.type === r.VIEW_TYPE.BRANCH &&
                    t.model.type() === r.TOPIC_TYPE.SUMMARY
                ) {
                    const e = t.getAdapter(r.ADAPTERS.SUMMARY_VIEW);
                    n = a.a.getComputedStyle(e);
                }
                localStorage.setItem(
                    'SBStyleClipboard',
                    JSON.stringify({
                        style: JSON.parse(JSON.stringify(i)),
                        type: t.type,
                        summaryLineStyle: n,
                    })
                );
            }
            queryStatus({ targets: e } = {}) {
                return !e || e.length < 1
                    ? 1 ===
                      (e = this._context
                          .getModule(r.MODULE_NAME.SELECTION)
                          .getSelections()).length
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                    : r.ACTION_STATUS.NORMAL;
            }
        }
        class je extends o.a {
            constructor() {
                (super(...arguments), (this.actionName = r.ACTION_NAMES.COPY));
            }
            doExecute({ e: e, targets: t = [] } = {}) {
                this._context.getModule(r.MODULE_NAME.COPY_PASTE).copy(e, t);
            }
            queryStatus({ targets: e = [] } = {}) {
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()
                            .filter(
                                (e) => e.type !== r.VIEW_TYPE.MATRIX_LABEL
                            )),
                    e.length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        class $e extends o.a {
            constructor() {
                (super(...arguments), (this.actionName = r.ACTION_NAMES.CUT));
            }
            doExecute({ targets: e = [] } = {}) {
                this._context
                    .getModule(r.MODULE_NAME.COPY_PASTE)
                    .copy(null, e) &&
                    this._context.execAction(r.ACTION_NAMES.DELETE_ITEM, {
                        prue: !0,
                        targets: e,
                    });
            }
            queryStatus({ targets: e = [] } = {}) {
                const t = this._context.queryActionStatus(r.ACTION_NAMES.COPY, {
                        targets: e,
                    }),
                    i = this._context.queryActionStatus(
                        r.ACTION_NAMES.DELETE_ITEM,
                        { targets: e }
                    );
                return t && i
                    ? r.ACTION_STATUS.NORMAL
                    : r.ACTION_STATUS.DISABLE;
            }
        }
        var ze = i(53);
        class We extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.DELETE_ITEM));
            }
            doExecute({ targets: e = [] } = {}) {
                ((!e || e.length < 1) &&
                    (e = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    (e = e.filter(
                        (e) =>
                            !(
                                e.type === r.VIEW_TYPE.BRANCH &&
                                e.isCentralBranch()
                            )
                    )),
                    (function (e) {
                        const t = e.slice();
                        t.some((e, i) => {
                            if (Object(f.isCentralBranch)(e))
                                return (t.splice(i, 1), !0);
                        });
                        const i = t.slice();
                        return (
                            t.forEach((e) => {
                                let n = e.parent();
                                for (; n && !Object(f.isCentralBranch)(n); ) {
                                    const r = t.indexOf(n),
                                        o = i.indexOf(e);
                                    if (-1 !== r) {
                                        i.splice(o, 1);
                                        break;
                                    }
                                    n = n.parent();
                                }
                            }),
                            i
                        );
                    })([...e]).forEach((e) => {
                        this._deleteSingleItem(e);
                    }));
            }
            queryStatus({ targets: e = [] } = {}) {
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    (e = e.filter(
                        (e) =>
                            !(
                                e.type === r.VIEW_TYPE.BRANCH &&
                                e.isCentralBranch()
                            )
                    )).length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
            _deleteSingleItem(e) {
                if (!e.parent()) return !1;
                const t = e.model,
                    i = e.type;
                if (t) {
                    if (
                        i === r.VIEW_TYPE.RELATIONSHIP &&
                        Object(ze.a)(this._context)
                    )
                        return;
                    t.removeSelf();
                } else if (i === r.VIEW_TYPE.MATRIX_LABEL)
                    e.removeColumnItems();
                else if (i === r.VIEW_TYPE.MARKER) {
                    e.parent().parent().model.removeMarker(e.markerId);
                } else if (i) {
                    e.parent().model.removePendantItem(i);
                }
            }
        }
        class Ke extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.DIVIDE));
            }
            doExecute({ direction: e, targets: t = [] } = {}) {
                (!t || t.length < 1) &&
                    (t = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections());
                new w().divide(e, t);
            }
            queryStatus({ direction: e, targets: t = [] } = {}) {
                if (
                    ((!t || t.length < 1) &&
                        (t = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    t.length < 3)
                )
                    return r.ACTION_STATUS.DISABLE;
                let i = 0;
                for (let e = 0; e < t.length; e++) {
                    const n = t[e];
                    n.type === r.VIEW_TYPE.BRANCH &&
                        n.model.type() === r.TOPIC_DETACHED &&
                        i++;
                }
                return i >= 3
                    ? r.ACTION_STATUS.NORMAL
                    : r.ACTION_STATUS.DISABLE;
            }
        }
        var Ze = i(11),
            Je = i(37);
        class Xe extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.DUPLICATE_TOPIC));
            }
            doExecute({ targets: e = [] } = {}) {
                ((!e || e.length < 1) &&
                    (e = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    (e = Object(f.filterMultiSelectedBranches)(e, [
                        r.CLASS_TYPE.SUMMARY_TOPIC,
                        r.CLASS_TYPE.CENTRAL_TOPIC,
                    ])).forEach((e) => {
                        const t = e.branchIndex(),
                            i = JSON.parse(JSON.stringify(e.model.toJSON()));
                        (Ze.a.replaceId(i, () =>
                            e.model.ownerSheet().generateComponentId()
                        ),
                            e.model.type() === r.TOPIC_TYPE.DETACHED &&
                                (i.position.y +=
                                    e.topicView.bounds.height + 20),
                            e.model
                                .parent()
                                .addChildTopic(
                                    Object(Je.a)(i, e.model.ownerSheet()),
                                    {
                                        at: t + 1,
                                        type: e.model.type(),
                                        sourceIndex: t,
                                    }
                                ));
                    }));
            }
            queryStatus({ targets: e = [] } = {}) {
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    (e = e
                        .filter((e) => e.type === r.VIEW_TYPE.BRANCH)
                        .filter((e) => !e.isCentralBranch())
                        .filter((e) => !e.isSummaryBranch())).length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        var qe = i(54);
        class et extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.EXCHANGE_SIBLING_TOPIC));
            }
            doExecute({ direction: e, targets: t = [], toEdge: i }) {
                const n = this.getFinalSelectedBranchViewList(t),
                    o = n[0].parent(),
                    a = o.getChildrenBranchesByType(r.TOPIC_TYPE.ATTACHED),
                    s = (function () {
                        let t = -1;
                        const s = n[0].branchIndex(),
                            l = n[n.length - 1].branchIndex();
                        (e !== r.DIRECTION.UP && e !== r.DIRECTION.LEFT) ||
                            (t = 0 === s ? -1 : i ? 0 : s - 1);
                        (e !== r.DIRECTION.DOWN && e !== r.DIRECTION.RIGHT) ||
                            (t =
                                l === a.length - 1
                                    ? -1
                                    : i
                                      ? a.length - n.length
                                      : s + 1);
                        const c = o.getStructureClass();
                        if (c === r.STRUCTURECLASS.MAP) {
                            const a = tt(o),
                                c = s < a;
                            ((e !== r.DIRECTION.UP && e !== r.DIRECTION.LEFT) ||
                                c ||
                                (t = s === a ? -1 : i ? a : s - 1),
                                (e !== r.DIRECTION.DOWN &&
                                    e !== r.DIRECTION.RIGHT) ||
                                    (c &&
                                        (t =
                                            l === a - 1
                                                ? -1
                                                : i
                                                  ? a - n.length
                                                  : s + 1)));
                        }
                        if (c === r.STRUCTURECLASS.MAPUNBALANCED) {
                            const c = tt(o),
                                d = s < c;
                            ((e !== r.DIRECTION.UP && e !== r.DIRECTION.LEFT) ||
                                d ||
                                (t =
                                    l === a.length - 1
                                        ? -1
                                        : i
                                          ? a.length - n.length
                                          : s + 1),
                                (e !== r.DIRECTION.DOWN &&
                                    e !== r.DIRECTION.RIGHT) ||
                                    (t = d
                                        ? l === c - 1
                                            ? -1
                                            : i
                                              ? c - n.length
                                              : s + 1
                                        : s === c
                                          ? -1
                                          : i
                                            ? c
                                            : s - 1));
                        }
                        return t;
                    })();
                if (-1 === s) return;
                const l = new qe.a(
                    this._context,
                    { selections: [...n] },
                    { rememberSibilingRange: !0 }
                );
                let c;
                if (o.getStructureClass() === r.STRUCTURECLASS.MAPUNBALANCED) {
                    const e = tt(o);
                    n[0].branchIndex() < e && (c = !0);
                }
                (n.forEach((e) => {
                    e.model.removeSelf();
                }),
                    l.mountAsAttach(o, { at: s, addToRight: c }));
            }
            getFinalSelectedBranchViewList(e) {
                const t = this.getFilterBranchViewList(e).filter(
                    (e) => nt(e) && rt(e) && ot(e) && !e.isInMatrix()
                );
                return t.length
                    ? (t.sort((e, t) => e.branchIndex() - t.branchIndex()),
                      (function (e) {
                          if (e.some((t) => t.parent() !== e[0].parent()))
                              return !0;
                          let t;
                          if (
                              ((t = e.some((t, i) => {
                                  if (i !== e.length - 1)
                                      return (
                                          t.branchIndex() + 1 !==
                                          e[i + 1].branchIndex()
                                      );
                              })),
                              t)
                          )
                              return !0;
                          const i = e[0].parent(),
                              n = i.getStructureClass();
                          if (
                              n === r.STRUCTURECLASS.MAP ||
                              n === r.STRUCTURECLASS.MAPUNBALANCED
                          ) {
                              const n = tt(i);
                              e[0].branchIndex() < n &&
                                  e[e.length - 1].branchIndex() >= n &&
                                  (t = !0);
                          }
                          if (t) return !0;
                      })(t)
                          ? []
                          : t)
                    : t;
            }
            queryStatus({ targets: e = [] } = {}) {
                return this.getFinalSelectedBranchViewList(e).length > 0
                    ? r.ACTION_STATUS.NORMAL
                    : r.ACTION_STATUS.DISABLE;
            }
        }
        function tt(e) {
            return e.getStructureClass() === r.STRUCTURECLASS.MAP
                ? e.figure.balanceRightNumber
                : e.getStructureClass() === r.STRUCTURECLASS.MAPUNBALANCED
                  ? e.figure.unbalanceRightNumber
                  : void 0;
        }
        const it = (e) => e.type === r.VIEW_TYPE.BRANCH,
            nt = (e) =>
                !it(e) || a.a.getClassName(e) !== r.CLASS_TYPE.CALLOUT_TOPIC,
            rt = (e) =>
                !it(e) || a.a.getClassName(e) !== r.CLASS_TYPE.SUMMARY_TOPIC,
            ot = (e) => !it(e) || !e.isCentralBranch();
        class at extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.EXTEND_BRANCHES));
            }
            doExecute(
                { relativeLayer: e = 0, spread: t = !1, targets: i = [] } = {
                    relativeLayer: 0,
                    spread: !1,
                }
            ) {
                ((!i || i.length < 1) &&
                    (i = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    (i = i.filter(
                        (e) => e.type === r.VIEW_TYPE.BRANCH
                    )).forEach((i) => {
                        if (e > 0 || t) {
                            const n = i.model.getLayer() + e,
                                o = [
                                    r.TOPIC_TYPE.ATTACHED,
                                    r.TOPIC_TYPE.DETACHED,
                                    r.TOPIC_TYPE.SUMMARY,
                                ];
                            i.model.traverseTopic(o, (e) => {
                                (e.getLayer() === n ||
                                    (t && e.getLayer() >= n)) &&
                                    e.extendBranch();
                            });
                        } else i.model.extendBranch();
                    }));
            }
            queryStatus(
                { relativeLayer: e = 0, spread: t = !1, targets: i = [] } = {
                    relativeLayer: 0,
                    spread: !1,
                }
            ) {
                return (
                    (!i || i.length < 1) &&
                        (i = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    (i =
                        e > 0 || t
                            ? i.filter(
                                  (e) =>
                                      e.type === r.VIEW_TYPE.BRANCH &&
                                      e.model.type() !== r.TOPIC_TYPE.CALLOUT
                              )
                            : i.filter(
                                  (e) =>
                                      e.type === r.VIEW_TYPE.BRANCH &&
                                      e.model.isCollapse()
                              )).length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        class st extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.FIT_MAP));
            }
            doExecute() {
                this._context.getSVGView().getCanvasControl().fitMap();
            }
        }
        const lt = [
            r.VIEW_TYPE.BRANCH,
            r.VIEW_TYPE.BOUNDARY,
            r.VIEW_TYPE.RELATIONSHIP,
        ];
        class ct extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.FOCUS_CENTER));
            }
            doExecute({
                animated: e = !0,
                finishToRun: t,
                targets: i = [],
            } = {}) {
                const n = this.getFilterViewList(i)[0];
                let o = { x: 0, y: 0 };
                switch (n.type) {
                    case r.VIEW_TYPE.BRANCH:
                        o = n.getRealPosition();
                        break;
                    case r.VIEW_TYPE.BOUNDARY: {
                        const e = n.figure.size,
                            t = n.getRealPosition();
                        o = {
                            x: t.x + e.width / 2,
                            y: t.y + e.height / 2,
                        };
                        break;
                    }
                    case r.VIEW_TYPE.RELATIONSHIP:
                        o = n.titleView.getRealPosition();
                }
                this._context
                    .getSVGView()
                    .getCanvasControl()
                    .center(o, { animate: e, finishToRun: t });
            }
            getFilterViewList(e) {
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    (e = e.filter((e) => lt.includes(e.type))).length ||
                        (e = [this._context.getSheetView().centralBranchView]),
                    e
                );
            }
        }
        class dt extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.FOCUS_INPUT));
            }
            doExecute({ preventScroll: e }) {
                this._context
                    .getModule(r.MODULE_NAME.EDIT_RECEIVER)
                    .getInputDOM()
                    .focus({ preventScroll: e });
            }
            queryStatus() {
                return this._context.config(r.CONFIG.NO_EDIT_RECEIVER)
                    ? r.ACTION_STATUS.DISABLE
                    : r.ACTION_STATUS.NORMAL;
            }
        }
        class ft extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.HIDE_EDIT_BOX));
            }
            doExecute({ notSaveEdit: e } = {}) {
                this._context.getModule(r.MODULE_NAME.EDIT_RECEIVER).hide(e);
            }
        }
        class ht extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.HIDE_TITLE));
            }
            doExecute({ targets: e = [] } = {}) {
                ((!e || e.length < 1) &&
                    (e = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    (e = e.filter(
                        (e) =>
                            e.type === r.VIEW_TYPE.BRANCH ||
                            e.type === r.VIEW_TYPE.BOUNDARY ||
                            e.type === r.VIEW_TYPE.RELATIONSHIP
                    )).forEach((e) => {
                        e.hideTitle();
                    }));
            }
            queryStatus({ targets: e = [] } = {}) {
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    (e = e.filter(
                        (e) =>
                            e.type === r.VIEW_TYPE.BRANCH ||
                            e.type === r.VIEW_TYPE.BOUNDARY ||
                            e.type === r.VIEW_TYPE.RELATIONSHIP
                    )).length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        var pt = i(125),
            Tt = i.n(pt);
        class ut extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName =
                        r.ACTION_NAMES.INSERT_AUDIO_NOTES_ON_NEW_TOPIC));
            }
            doExecute({ audioNotesData: e, title: t, targets: i = [] } = {}) {
                ((!i || i.length < 1) &&
                    (i = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    (i = i.filter(
                        (e) =>
                            e.type === r.VIEW_TYPE.BRANCH &&
                            a.a.getClassName(e) !== r.CLASS_TYPE.CALLOUT_TOPIC
                    )).forEach((i) => {
                        const n = i.model;
                        if (!t) {
                            const e = this._context.getTranslatedText(
                                'RECORD_TITLE_PREFIX'
                            );
                            t = `${e} ${Tt()(new Date(), 'dd/mm/yy hh:MM TT')}`;
                        }
                        const r = n.createEmptyTopic({
                            title: t,
                            titleUnedited: !0,
                        });
                        (r.addAudioNotes(e), n.addChildTopic(r));
                    }));
            }
            queryStatus({ title: e, targets: t = [] } = {}) {
                return (
                    (!t || t.length < 1) &&
                        (t = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    (t = t.filter(
                        (e) =>
                            e.type === r.VIEW_TYPE.BRANCH &&
                            a.a.getClassName(e) !== r.CLASS_TYPE.CALLOUT_TOPIC
                    )).length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        class gt extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.INSERT_AUDIO_NOTES));
            }
            doExecute({ audioNotesData: e, targets: t = [] } = {}) {
                if (!e) return;
                this.getFilterBranchViewList(t).forEach((t) => {
                    t.model.addAudioNotes(e);
                });
            }
            queryStatus({ targets: e = [] } = {}) {
                return (e = this.getFilterBranchViewList(e)).length > 0
                    ? r.ACTION_STATUS.NORMAL
                    : r.ACTION_STATUS.DISABLE;
            }
            getFilterBranchViewList(e) {
                return super.getFilterBranchViewList(e).filter((e) => {
                    const t =
                            a.a.getClassName(e) !== r.CLASS_TYPE.CALLOUT_TOPIC,
                        i = e.model.getHref();
                    return t && !i;
                });
            }
        }
        class Qt extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName =
                        r.ACTION_NAMES.INSERT_HREF_ON_NEW_TOPIC));
            }
            doExecute({ link: e, title: t = '', targets: i = [] } = {}) {
                ((!i || i.length < 1) &&
                    (i = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    (i = i.filter(
                        (e) =>
                            e.type === r.VIEW_TYPE.BRANCH &&
                            a.a.getClassName(e) !== r.CLASS_TYPE.CALLOUT_TOPIC
                    )).forEach((i) => {
                        const n = i.model;
                        n.addChildTopic(
                            n.createEmptyTopic({
                                href: e,
                                title: t,
                                titleUnedited: !0,
                            })
                        );
                    }));
            }
            queryStatus({ targets: e = [] } = {}) {
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    (e = e.filter(
                        (e) =>
                            e.type === r.VIEW_TYPE.BRANCH &&
                            a.a.getClassName(e) !== r.CLASS_TYPE.CALLOUT_TOPIC
                    )).length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        class mt extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.MOVE_VIEWPORT));
            }
            doExecute({ deltaX: e = 0, deltaY: t = 0, option: i } = {}) {
                this._context
                    .getModule(r.MODULE_NAME.MOVE_VIEW_PORT)
                    .tryToMoveViewPort(e, t, i);
            }
        }
        class bt extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.OPEN_UNDO_KEEP_MODE));
            }
            doExecute() {
                this._context.model.getUndo().keepAllInOne(!0);
            }
        }
        class Ct extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.PASTE_STYLE));
            }
            doExecute({ targets: e } = { targets: [] }) {
                (!e || e.length < 1) &&
                    (e = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections());
                const t = (e, t) => {
                    this._context.execAction(r.ACTION_NAMES.SET_STYLE_OBJECT, {
                        targets: e,
                        styleObj: {
                            id: Ze.a.UUID(),
                            properties: t,
                        },
                        prue: !0,
                    });
                };
                e.forEach((e) => {
                    const i = JSON.parse(
                        localStorage.getItem('SBStyleClipboard')
                    );
                    if (e.type === i.type) {
                        if (
                            e.type === r.VIEW_TYPE.BRANCH &&
                            e.model.type() === r.TOPIC_TYPE.SUMMARY
                        ) {
                            const n = e.getAdapter(r.ADAPTERS.SUMMARY_VIEW);
                            t([n], i.summaryLineStyle);
                        }
                        t([e], i.style);
                    }
                });
            }
            queryStatus({ targets: e } = { targets: [] }) {
                (!e || e.length < 1) &&
                    (e = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections());
                const t = JSON.parse(localStorage.getItem('SBStyleClipboard'));
                return e.length < 1 || !t
                    ? r.ACTION_STATUS.DISABLE
                    : e.some((e) => e.type === t.type)
                      ? r.ACTION_STATUS.NORMAL
                      : r.ACTION_STATUS.DISABLE;
            }
        }
        class Lt extends o.a {
            constructor() {
                (super(...arguments), (this.actionName = r.ACTION_NAMES.PASTE));
            }
            doExecute({
                toImage: e,
                toMathJax: t,
                toMarker: i,
                toBranch: n,
                e: o,
                clientPosition: a,
            } = {}) {
                (void 0 === e &&
                    void 0 === i &&
                    void 0 === n &&
                    void 0 === t &&
                    ((e = !0), (i = !0), (n = !0), (t = !0)),
                    this._context
                        .getModule(r.MODULE_NAME.COPY_PASTE)
                        .paste(o || null, {
                            toImage: e,
                            toMarker: i,
                            toBranch: n,
                            toMathJax: t,
                            clientPosition: a,
                        }));
            }
            queryStatus() {
                const e = this._context
                    .getModule(r.MODULE_NAME.SELECTION)
                    .getSelections();
                if (0 === e.length) return r.ACTION_STATUS.NORMAL;
                return e.filter((e) => e.type === r.VIEW_TYPE.BRANCH).length > 0
                    ? r.ACTION_STATUS.NORMAL
                    : r.ACTION_STATUS.DISABLE;
            }
        }
        class yt extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.PRE_ADD_FLOATING_TOPIC));
            }
            doExecute() {
                const e = this._context.getModule(
                    r.MODULE_NAME.PRE_ADD_FLOATING_TOPIC
                );
                e.status.movingMouse || e.startProcess(this._context);
            }
        }
        class Mt extends o.a {
            constructor() {
                (super(...arguments), (this.actionName = r.ACTION_NAMES.REDO));
            }
            doExecute() {
                this._context.model.getUndo().redo();
            }
            queryStatus() {
                return -1 ===
                    this._context
                        .getActiveUIStatus()
                        .indexOf(r.UI_STATUS.DRAG) &&
                    this._context.model.getUndo().canRedo()
                    ? r.ACTION_STATUS.NORMAL
                    : r.ACTION_STATUS.DISABLE;
            }
        }
        class At extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.REFRESH_MIND_MAP));
            }
            doExecute() {
                this._context.getSheetView().refreshStyles();
            }
        }
        class vt extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.REMOVE_ALL_SELECTION));
            }
            doExecute() {
                this._context.getModule(r.MODULE_NAME.SELECTION).selectNone();
            }
        }
        class Et extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.REMOVE_AUDIO_NOTES));
            }
            doExecute({ targets: e = [] } = {}) {
                ((!e || e.length < 1) &&
                    (e = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    (e = e.filter(
                        (e) =>
                            e.type === r.VIEW_TYPE.BRANCH &&
                            a.a.getClassName(e) !== r.CLASS_TYPE.CALLOUT_TOPIC
                    )).forEach((e) => {
                        e.model.removeAudioNotes();
                    }));
            }
            queryStatus({ targets: e = [] } = {}) {
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    (e = e.filter(
                        (e) =>
                            e.type === r.VIEW_TYPE.BRANCH &&
                            a.a.getClassName(e) !== r.CLASS_TYPE.CALLOUT_TOPIC
                    )).length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        class _t extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.REMOVE_CLASS));
            }
            doExecute({ className: e, targets: t = [] } = {}) {
                ((!t || t.length < 1) &&
                    (t = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    t.forEach((t) => {
                        t.model.removeClass(e);
                    }));
            }
            queryStatus({ targets: e = [] } = {}) {
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    e.length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        class Ot extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.REMOVE_MARKER));
            }
            doExecute({ markerId: e, targets: t = [] } = {}) {
                e &&
                    this.getFilterBranchViewList(t).forEach((t) => {
                        t.model.removeMarker(e);
                    });
            }
            queryStatus({ targets: e = [] } = {}) {
                return this.getFilterBranchViewList(e).length > 0
                    ? r.ACTION_STATUS.NORMAL
                    : r.ACTION_STATUS.DISABLE;
            }
        }
        class St extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.REMOVE_MARKER_GROUP));
            }
            doExecute({ groupId: e } = {}) {
                if (!e) return;
                const { markerModule: t } = Object(f.getInjectModule)(
                        r.MODULE_NAME.SNOWBIRD
                    ),
                    i = t.getGroupInfoById(e);
                if (!i) return;
                const n = i.markers.map((e) => e.markerId);
                this._context.model.traverseTopic(
                    Object.values(r.TOPIC_TYPE),
                    (e) => {
                        e.getMarkersData().forEach((t) => {
                            n.includes(t.markerId) &&
                                e.removeMarker(t.markerId);
                        });
                    }
                );
            }
        }
        class xt extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.REMOVE_SELECTION));
            }
            doExecute({ id: e }) {
                const t = this._context.getComponentViewById(e);
                this._context
                    .getModule(r.MODULE_NAME.SELECTION)
                    .removeFromSelection(t);
            }
        }
        class Rt extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.REMOVE_TASK_INFO));
            }
            doExecute({ targets: e = [] } = {}) {
                ((!e || e.length < 1) &&
                    (e = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    (e = e.filter(
                        (e) => e.type === r.VIEW_TYPE.BRANCH
                    )).forEach((e) => {
                        e.model.removeTaskInfo();
                    }));
            }
            queryStatus({ targets: e = [] } = {}) {
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    (e = e.filter((e) => e.type === r.VIEW_TYPE.BRANCH))
                        .length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        class It extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName =
                        r.ACTION_NAMES.REPAIR_EDIT_RECEIVER_POSITION));
            }
            doExecute() {
                this._context
                    .getModule(r.MODULE_NAME.EDIT_RECEIVER)
                    .repairPosition();
            }
            queryStatus() {
                return this._context.config(r.CONFIG.NO_EDIT_RECEIVER)
                    ? r.ACTION_STATUS.DISABLE
                    : r.ACTION_STATUS.NORMAL;
            }
        }
        class Nt extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.RESET_IMAGE));
            }
            doExecute({ targets: e = [] } = {}) {
                ((!e || e.length < 1) &&
                    (e = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    e.forEach((e) => {
                        const t = (
                            e.type === r.VIEW_TYPE.BRANCH
                                ? e.model
                                : e.parent().model
                        ).getImageModel();
                        t &&
                            t.getSrc() &&
                            t.resize({
                                width: void 0,
                                height: void 0,
                            });
                    }));
            }
            queryStatus({ targets: e = [] } = {}) {
                (!e || e.length < 1) &&
                    (e = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections());
                return e.every(
                    (e) =>
                        e.type === r.VIEW_TYPE.BRANCH ||
                        e.type === r.VIEW_TYPE.IMAGE
                )
                    ? r.ACTION_STATUS.NORMAL
                    : r.ACTION_STATUS.DISABLE;
            }
        }
        class wt extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.RESIZE_IMAGE));
            }
            doExecute({ targets: e = [], newSize: t } = {}) {
                ((!e || e.length < 1) &&
                    (e = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    e.forEach((e) => {
                        const i = (
                            e.type === r.VIEW_TYPE.BRANCH
                                ? e.model
                                : e.parent().model
                        ).getImageModel();
                        i &&
                            i.getSrc() &&
                            i.resize({
                                width: Math.max(0, t.width),
                                height: Math.max(0, t.height),
                            });
                    }));
            }
            queryStatus({ targets: e = [] } = {}) {
                (!e || e.length < 1) &&
                    (e = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections());
                return e.every(
                    (e) =>
                        e.type === r.VIEW_TYPE.BRANCH ||
                        e.type === r.VIEW_TYPE.IMAGE
                )
                    ? r.ACTION_STATUS.NORMAL
                    : r.ACTION_STATUS.DISABLE;
            }
        }
        class Pt extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.RESET_POSITION));
            }
            doExecute({ targets: e = [] } = {}) {
                ((!e || e.length < 1) &&
                    (e = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    (e = e.filter(
                        (e) =>
                            e.type === r.VIEW_TYPE.BRANCH &&
                            e.model.type() === r.TOPIC_TYPE.ATTACHED &&
                            e.model.get('position')
                    )).forEach((e) => {
                        e.model.clearPosition();
                    }));
            }
            queryStatus({ targets: e = [] } = {}) {
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    (e = e.filter(
                        (e) => (e) =>
                            e.type === r.VIEW_TYPE.BRANCH &&
                            e.model.type() === r.TOPIC_TYPE.ATTACHED &&
                            e.model.get('position')
                    )).length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        class Ht extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.RESIZE_EDITOR));
            }
            doExecute({ visibleAreaBounds: e } = {}) {
                if (e) {
                    const t = this._context.getSVGView().getCanvasControl();
                    (t.setVisibleAreaBounds(e), t.setScrollContainerBounds(e));
                }
            }
        }
        class Dt extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.SELECT_ALL));
            }
            doExecute() {
                const e = this._context.getModule(r.MODULE_NAME.SELECTION),
                    t = this._context.getModule(r.MODULE_NAME.MOVE_VIEW_PORT);
                (e.setIsSilent(!0),
                    t.setAbleAutoMove(!1),
                    e.selectNone(),
                    Ze.a.preorderIterate(
                        this._context.getSheetView().centralBranchView,
                        Object.values(r.TOPIC_TYPE),
                        (t) => e.addSelection(t)
                    ),
                    t.setAbleAutoMove(!0),
                    e.setIsSilent(!1),
                    e.notify());
            }
        }
        class Ft extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.SELECT_TOPIC_BY_ID));
            }
            doExecute({ componentId: e, callback: t } = {}) {
                let i;
                const n = this._context.parent();
                if (
                    (this._context.model.findComponentById(e)
                        ? (i = this._context.getComponentViewById(e))
                        : n &&
                          n.model.sheets.some((t) => {
                              if (t.findComponentById(e)) {
                                  if (t.id !== n.currentSheetId) {
                                      const e = n.findSheetIndex(t.id);
                                      n.switchTo(e);
                                  }
                                  return (
                                      (i =
                                          n.sheetEditors[t.id] &&
                                          n.sheetEditors[
                                              t.id
                                          ].getComponentViewById(e)),
                                      !0
                                  );
                              }
                          }),
                    !i)
                )
                    return void (t && t({ resolve: !1, reject: !0 }));
                const o = n ? n.sheetEditors[n.currentSheetId] : this._context;
                o.execAction(r.ACTION_NAMES.FOCUS_CENTER, {
                    targets: [i],
                    animated: !1,
                    finishToRun: () => {
                        (o.execAction(r.ACTION_NAMES.SELECT, {
                            id: i.model.get('id'),
                            isSingle: !0,
                            prue: !0,
                        }),
                            t && t({ resolve: !0, reject: !1 }));
                    },
                });
            }
        }
        class kt extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.SELECT));
            }
            doExecute({ id: e, isSingle: t, noAutoMove: i, targets: n }) {
                let o = [];
                if (null == n ? void 0 : n.length) o = n;
                else {
                    const t = this._context.getComponentViewById(e);
                    if (!t) return;
                    o.push(t);
                }
                if (!o.length) return;
                const a = this._context.getModule(r.MODULE_NAME.SELECTION),
                    s = this._context.getModule(r.MODULE_NAME.MOVE_VIEW_PORT);
                (i && s.setAbleAutoMove(!1),
                    a &&
                        o.forEach((e) => {
                            (e.type === r.VIEW_TYPE.BRANCH &&
                                Object(f.showBranchIfHidden)(e),
                                t ? a.selectSingle(e) : a.addSelection(e));
                        }),
                    s.setAbleAutoMove(!0));
            }
        }
        var Bt = i(35),
            Vt = i(62);
        const Yt = {
                [r.DIRECTION.UP]: {
                    mainAxis: 'cy',
                    crossAxis: 'cx',
                    edge: 'height',
                },
                [r.DIRECTION.DOWN]: {
                    mainAxis: 'cy',
                    crossAxis: 'cx',
                    edge: 'height',
                },
                [r.DIRECTION.LEFT]: {
                    mainAxis: 'cx',
                    crossAxis: 'cy',
                    edge: 'width',
                },
                [r.DIRECTION.RIGHT]: {
                    mainAxis: 'cx',
                    crossAxis: 'cy',
                    edge: 'width',
                },
            },
            Gt = (e) => {
                const t = e.getStructureClass();
                return (
                    -1 !==
                    [
                        r.STRUCTURECLASS.LEFTHEADTOPBONE,
                        r.STRUCTURECLASS.LEFTHEADBOTTOMBONE,
                        r.STRUCTURECLASS.RIGHTHEADTOPBONE,
                        r.STRUCTURECLASS.RIGHTHEADBOTTOMBONE,
                    ].indexOf(t)
                );
            },
            Ut = [ci, ai, si, oi],
            jt = [
                function (e, t) {
                    const i = Object(s.a)(e.getStructureClass());
                    if (li(i.direction, t)) return;
                    const n = e.getChildrenBranchesByType();
                    if (i.direction === t || t === r.DIRECTION.UP) return n[0];
                    if (t === r.DIRECTION.DOWN) return n[1];
                },
                ...Ut,
            ],
            $t = [
                function (e, t, i) {
                    const n = Object(s.a)(e.getStructureClass());
                    if (n.getRangeGrowthDirection() === t) {
                        const n = e.getChildrenBranchesByType()[0];
                        if (i(n)) return n;
                        const o = e.parent().getChildrenBranchesByType();
                        let a;
                        if (
                            ((a =
                                t === r.DIRECTION.UP
                                    ? o[e.branchIndex() - 1]
                                    : o[e.branchIndex() + 1]),
                            !a)
                        )
                            return;
                        const s = a.getChildrenBranchesByType(),
                            l = s[s.length - 1];
                        if (i(l)) return l;
                    }
                },
                function (e, t) {
                    const i = e.parent(),
                        n = Object(s.a)(i.getStructureClass()),
                        r = i.getChildrenBranchesByType();
                    if (n.direction === t) return r[e.branchIndex() + 1];
                    if (li(n.direction, t)) return r[e.branchIndex() - 1];
                },
                ai,
                oi,
            ],
            zt = [
                function (e, t) {
                    var i;
                    const n = e.parent(),
                        o = n.parent();
                    if (!o) return;
                    const a = Object(s.a)(n.getStructureClass()),
                        l = a.getRangeGrowthDirection(),
                        c = n.getChildrenBranchesByType(),
                        d = o.getChildrenBranchesByType(),
                        f = e.branchIndex();
                    if (0 === f && (li(l, t) || li(a.direction, t))) return n;
                    if (f === c.length - 1 && l === t) {
                        const e = n.branchIndex();
                        let t;
                        if (
                            (l === r.DIRECTION.DOWN
                                ? (t = d[e + 1])
                                : l === r.DIRECTION.UP && (t = d[e - 1]),
                            t)
                        ) {
                            const e = t.getChildrenBranchesByType();
                            return null !== (i = e[e.length - 1]) &&
                                void 0 !== i
                                ? i
                                : t;
                        }
                    }
                    let h;
                    l === t ? (h = c[f + 1]) : li(l, t) && (h = c[f - 1]);
                    return h;
                },
                si,
            ],
            Wt = [
                function (e, t) {
                    if (a.a.getClassName(e) === r.CLASS_TYPE.MAIN_TOPIC) {
                        const i = e.getStructureClass();
                        if (
                            (i === r.STRUCTURECLASS.TREERIGHT &&
                                t === r.DIRECTION.LEFT) ||
                            (i === r.STRUCTURECLASS.TREELEFT &&
                                t === r.DIRECTION.RIGHT)
                        )
                            return (function () {
                                const t = e
                                        .parent()
                                        .getChildrenBranchesByType(),
                                    i = t.indexOf(e);
                                return t[i + 1] || t[i - 1] || null;
                            })();
                    }
                },
                si,
                ci,
                oi,
                ai,
            ],
            Kt = [
                function (e, t) {
                    if (
                        e.isCentralBranch() ||
                        e.type === r.TOPIC_TYPE.DETACHED
                    ) {
                        const i = e.getChildrenBranchesByType()[0];
                        return !i ||
                            (t !== r.DIRECTION.DOWN && t !== r.DIRECTION.RIGHT)
                            ? null
                            : i;
                    }
                    const i = e.parent(),
                        n = i.getChildrenBranchesByType(),
                        o = i.getStructureClass();
                    if (o === r.STRUCTURECLASS.TIMELINESIDEDHORIZONTAL) {
                        let o = e.branchIndex();
                        if (t === r.DIRECTION.LEFT) o -= 1;
                        else {
                            if (t !== r.DIRECTION.RIGHT) return null;
                            o += 1;
                        }
                        return -1 === o ? i : o > n.length - 1 ? null : n[o];
                    }
                },
                ...Ut,
            ],
            Zt = [
                function (e, t) {
                    var i, n, o, a;
                    const s = Object(Bt.n)(e);
                    if (
                        e === s &&
                        e.getStructureClass() ===
                            r.STRUCTURECLASS.TOPTITLETREETABLE &&
                        (t === r.DIRECTION.LEFT || t === r.DIRECTION.RIGHT)
                    )
                        return e;
                    const l = s.getLayoutInfo().externalInfo.tableInfo,
                        c = s.editDomain().model2View,
                        d = (function (e, t) {
                            for (let i = 0; i < e.length; i++)
                                if (e[i])
                                    for (let n = 0; n < e[i].length; n++)
                                        if (e[i][n].id === t)
                                            return {
                                                row: i,
                                                col: n,
                                            };
                            return null;
                        })(l, e.model.id);
                    if (!d) return null;
                    let f;
                    for (;;) {
                        (t === r.DIRECTION.UP && (d.row = d.row - 1),
                            t === r.DIRECTION.DOWN && (d.row = d.row + 1),
                            t === r.DIRECTION.LEFT && (d.col = d.col - 1),
                            t === r.DIRECTION.RIGHT && (d.col = d.col + 1));
                        const o =
                            null === (i = l[d.row]) || void 0 === i
                                ? void 0
                                : i[d.col];
                        if (
                            ((f =
                                null !== (n = c[null == o ? void 0 : o.id]) &&
                                void 0 !== n
                                    ? n
                                    : null),
                            f !== e)
                        )
                            break;
                    }
                    if (
                        0 !== e.getChildrenBranchesByType().length ||
                        (t !== r.DIRECTION.UP && t !== r.DIRECTION.DOWN)
                    )
                        return f;
                    {
                        const e =
                            null === (o = l[d.row]) || void 0 === o
                                ? void 0
                                : o[l[0].length - 1];
                        return null !== (a = c[null == e ? void 0 : e.id]) &&
                            void 0 !== a
                            ? a
                            : null;
                    }
                },
                ...Ut,
            ],
            Jt = (e) => {
                const t = Object.assign({}, e.topicView.bounds),
                    i = e.getRealPosition();
                return {
                    cx: i.x,
                    cy: i.y,
                    width: t.width,
                    height: t.height,
                };
            },
            Xt = (e, t, i) => {
                if (0 === t.length || !i) return;
                const { mainAxis: n, crossAxis: r, edge: o } = Yt[i],
                    a = Jt(e),
                    s = (e) => {
                        const t = Jt(e);
                        return Math.abs(a[n] - t[n]) - (a[o] + t[o]) / 2;
                    },
                    l = (e) => {
                        const t = Jt(e);
                        return Math.abs(a[r] - t[r]);
                    };
                let c = t[0],
                    d = s(c);
                return (
                    t.forEach((e) => {
                        const t = s(e);
                        (t < d || (t === d && l(e) < l(c))) &&
                            ((c = e), (d = t));
                    }),
                    c
                );
            },
            qt = (e, t, i) => {
                const { mainAxis: n, crossAxis: r } = Yt[i],
                    o = 'cx' === n ? 'height' : 'width',
                    a = Jt(e),
                    s = Jt(t),
                    l = (a[o] + s[o]) / 2;
                return Math.abs(a[r] - s[r]) <= l;
            },
            ei = (e, t, i) => {
                const { mainAxis: n } = Yt[i],
                    o = Jt(e),
                    a = Jt(t);
                return i === r.DIRECTION.UP || i === r.DIRECTION.LEFT
                    ? a[n] < o[n]
                    : i === r.DIRECTION.DOWN || i === r.DIRECTION.RIGHT
                      ? a[n] > o[n]
                      : void 0;
            },
            ti = (e, t) =>
                'UD' === e
                    ? t === r.DIRECTION.UP ||
                      t === r.DIRECTION.DOWN ||
                      'UD' === t
                    : 'LR' === e
                      ? t === r.DIRECTION.LEFT ||
                        t === r.DIRECTION.RIGHT ||
                        'LR' === t
                      : e === t,
            ii = (e) => {
                const t = e.parent();
                if (!t || t.type !== r.VIEW_TYPE.BRANCH || e.isDetachedBranch())
                    return;
                const i = Object(s.a)(t.getStructureClass()),
                    n = i.getSourceOrientation();
                return n !== r.DIRECTION.NONE
                    ? Object(Vt.c)(n)
                    : i.getChildTargetOrientation(t, e.branchIndex());
            },
            ni = (e) => e.getContext().getSheetView().getCentralBranchView(),
            ri = (e) => [
                ...e.getDescendantBranchesByType(
                    r.TOPIC_TYPE.ATTACHED,
                    r.TOPIC_TYPE.DETACHED,
                    r.TOPIC_TYPE.SUMMARY
                ),
                e,
            ];
        function oi(e, t, i) {
            if (!e || !t) return;
            'function' != typeof i && (i = () => !0);
            const n = ri(ni(e))
                .filter(i)
                .filter((i) => ei(e, i, t))
                .filter((i) => qt(e, i, t));
            return Xt(e, n, t);
        }
        function ai(e, t) {
            if (!e || !t) return;
            const i = e.parent();
            return !!ti(ii(e), t) && i;
        }
        function si(e, t, i) {
            if (!e || !t) return;
            'function' != typeof i && (i = () => !0);
            const n = Object(s.a)(e.getStructureClass()).getSourceOrientation();
            if (ti(n, t)) {
                const n = e.getChildrenBranchesByType().filter(i),
                    r = Xt(e, n, t);
                if (r) return r;
            }
            if (n === r.DIRECTION.NONE) {
                const n = e
                    .getChildrenBranchesByType()
                    .filter(i)
                    .filter((i) => ei(e, i, t));
                return Xt(e, n, t);
            }
            return !1;
        }
        function li(e, t) {
            switch (e) {
                case r.DIRECTION.LEFT:
                    return t === r.DIRECTION.RIGHT;
                case r.DIRECTION.RIGHT:
                    return t === r.DIRECTION.LEFT;
                case r.DIRECTION.UP:
                    return t === r.DIRECTION.DOWN;
                case r.DIRECTION.DOWN:
                    return t === r.DIRECTION.UP;
                default:
                    return !1;
            }
        }
        function ci(e, t, i) {
            if (!e || !t) return;
            'function' != typeof i && (i = () => !0);
            const n = e.parent();
            if (
                n.type === r.VIEW_TYPE.BRANCH &&
                !e.isDetachedBranch() &&
                ti(e.getBrotherDirection(), t)
            ) {
                const o = n
                    .getChildrenBranchesByType(r.TOPIC_TYPE.ATTACHED)
                    .filter(i)
                    .filter((i) => ei(e, i, t))
                    .filter((i) => qt(e, i, t));
                return Xt(e, o, t);
            }
            return !1;
        }
        function di(e, t, i) {
            const n = t
                .getSelections()
                .filter((e) => e.type === r.VIEW_TYPE.BRANCH);
            if (0 === n.length) return;
            const o = t.getLastSelectedBranch() || n[n.length - 1];
            function a(e) {
                return !t.isUnselectable(e);
            }
            function s(n) {
                for (const s of n)
                    if (
                        (r = s(o, e, a)) &&
                        (i
                            ? r.isSelected
                                ? (t.toggleSelection(o),
                                  t.setLastSelectedBranch(r))
                                : t.addSelection(r)
                            : t.selectSingle(r),
                        1)
                    )
                        break;
                var r;
            }
            ((e) => {
                const t = e.getStructureClass();
                return (
                    -1 !==
                    [
                        r.STRUCTURECLASS.FISHBONELEFTHEADED,
                        r.STRUCTURECLASS.FISHBONERIGHTHEADED,
                    ].indexOf(t)
                );
            })(o)
                ? s(jt)
                : Gt(o)
                  ? s($t)
                  : ((e) => {
                          const t = e.parent();
                          if (Object(f.isBranch)(t) && Gt(t)) return !0;
                      })(o)
                    ? s(zt)
                    : ((e) => {
                            const t = e.getStructureClass();
                            return [
                                r.STRUCTURECLASS.TREELEFT,
                                r.STRUCTURECLASS.TREERIGHT,
                            ].includes(t);
                        })(o)
                      ? s(Wt)
                      : Object(Bt.u)(o)
                        ? s(Kt)
                        : Object(Bt.W)(o)
                          ? s(Zt)
                          : s(Ut);
        }
        class fi extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.SELECTION_NAVIGATE));
            }
            doExecute({ direction: e, addNext: t } = {}) {
                di(e, this._context.getModule(r.MODULE_NAME.SELECTION), t);
            }
            queryStatus() {
                return this._context
                    .getModule(r.MODULE_NAME.SELECTION)
                    .getSelections()
                    .filter((e) => e.type === r.VIEW_TYPE.BRANCH).length > 0
                    ? r.ACTION_STATUS.NORMAL
                    : r.ACTION_STATUS.DISABLE;
            }
        }
        class hi extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.SET_DEVICE_SCALE));
            }
            doExecute({ scale: e } = {}) {
                this._context.getSVGView().setDeviceNativeScale(e);
            }
        }
        class pi extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName =
                        r.ACTION_NAMES.SET_EXT_COL_ICON_DISPLAY));
            }
            doExecute({ isShow: e } = {}) {
                Ze.a.postorderIterate(
                    this._context.getSheetView().centralBranchView,
                    Object.values(r.TOPIC_TYPE),
                    (t) => {
                        t.collapseExtendView &&
                            t.collapseExtendView[e ? 'show' : 'hide']();
                    }
                );
            }
        }
        class Ti extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.SET_MINI_MAP_DISPLAY));
            }
            doExecute({ show: e, options: t } = {}) {
                const i = this._context.getModule(r.MODULE_NAME.MINI_MAP);
                i &&
                    i.setMiniMapDisplay(this._context, e, Object.assign({}, t));
            }
        }
        const ui = [
            r.VIEW_TYPE.BRANCH,
            r.VIEW_TYPE.BOUNDARY,
            r.VIEW_TYPE.RELATIONSHIP,
            r.VIEW_TYPE.SHEET,
            r.VIEW_TYPE.SUMMARY,
        ];
        class gi extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.SET_STYLE_OBJECT));
            }
            doExecute(
                { styleObj: e = null, targets: t = [] } = {
                    styleObj: null,
                }
            ) {
                ((!t || t.length < 1) &&
                    (t = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    (t = t.filter((e) => ui.includes(e.type))).forEach((t) => {
                        t.model.setStyleObj(e);
                    }));
            }
            queryStatus({ targets: e = [] } = {}) {
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    (e = e.filter((e) => ui.includes(e.type))).length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        class Qi extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName =
                        r.ACTION_NAMES.SET_SUMMARY_STYLE_OBJECT));
            }
            doExecute(
                { styleObj: e = null, targets: t = [] } = {
                    styleObj: null,
                }
            ) {
                ((!t || t.length < 1) &&
                    (t = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    (t = t.filter(
                        (e) => e.type === r.VIEW_TYPE.BRANCH && e.summaryModel
                    )).forEach((t) => {
                        t.summaryModel.setStyleObj(e);
                    }));
            }
            queryStatus({ targets: e = [] } = {}) {
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    (e = e.filter(
                        (e) => e.type === r.VIEW_TYPE.BRANCH && e.summaryModel
                    )).length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        class mi extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.SET_TRANSFORM));
            }
            doExecute({ transform: e } = {}) {
                this._context.getSVGView().container.transform(e);
            }
        }
        class bi extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.SHEET_SAVED));
            }
            doExecute() {
                this._context
                    .getModule(r.MODULE_NAME.MODIFY_CHECK)
                    .updateBaseIndex();
            }
        }
        class Ci extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.SHOW_EDIT_BOX));
            }
            doExecute({ placeholder: e, targets: t = [] } = {}) {
                (!t || t.length < 1) &&
                    (t = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections());
                const i = t[0];
                (this._context.execAction(
                    r.ACTION_NAMES.SHOW_VIEW_IN_VIEWPORT,
                    { targets: [i], prue: !0 }
                ),
                    void 0 === e && (e = i.getEditContent()),
                    this._context
                        .getModule(r.MODULE_NAME.EDIT_RECEIVER)
                        .show(e, i));
            }
            queryStatus({ targets: e = [] } = {}) {
                ((!e || e.length < 1) &&
                    (e = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    (e = e.filter(Li)));
                return !this._context.config(r.CONFIG.NO_EDIT_RECEIVER) &&
                    e.length > 0
                    ? r.ACTION_STATUS.NORMAL
                    : r.ACTION_STATUS.DISABLE;
            }
        }
        const Li = (e) =>
            [
                r.VIEW_TYPE.BOUNDARY,
                r.VIEW_TYPE.BRANCH,
                r.VIEW_TYPE.RELATIONSHIP,
            ].includes(e.type) &&
            (!e.shouldPreventTitle || !e.shouldPreventTitle());
        class yi extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.SHOW_TITLE));
            }
            doExecute({ targets: e = [] } = {}) {
                ((!e || e.length < 1) &&
                    (e = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    (e = e.filter(
                        (e) =>
                            e.type === r.VIEW_TYPE.BRANCH ||
                            e.type === r.VIEW_TYPE.BOUNDARY ||
                            e.type === r.VIEW_TYPE.RELATIONSHIP
                    )).forEach((e) => {
                        e.showTitle();
                    }));
            }
            queryStatus({ targets: e = [] } = {}) {
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    (e = e.filter(
                        (e) =>
                            e.type === r.VIEW_TYPE.BRANCH ||
                            e.type === r.VIEW_TYPE.BOUNDARY ||
                            e.type === r.VIEW_TYPE.RELATIONSHIP
                    )).length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        class Mi extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.SHOW_VIEW_IN_VIEWPORT));
            }
            doExecute({ targets: e = [], restrictRect: t } = {}) {
                ((!e || e.length < 1) &&
                    (e = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    t
                        ? this._context
                              .getModule(r.MODULE_NAME.MOVE_VIEW_PORT)
                              .showBranchInViewPort(e, void 0, t)
                        : this._context
                              .getModule(r.MODULE_NAME.MOVE_VIEW_PORT)
                              .showBranchInViewPort(e));
            }
            queryStatus({ targets: e = [] } = {}) {
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    (e = e.filter((e) => e.type === r.VIEW_TYPE.BRANCH))
                        .length > 0
                        ? r.ACTION_STATUS.NORMAL
                        : r.ACTION_STATUS.DISABLE
                );
            }
        }
        class Ai extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.TOGGLE_SELECT));
            }
            doExecute({ id: e, noAutoMove: t }) {
                const i = this._context.getComponentViewById(e),
                    n = this._context.getModule(r.MODULE_NAME.SELECTION);
                (t &&
                    this._context
                        .getModule(r.MODULE_NAME.MOVE_VIEW_PORT)
                        .setAbleAutoMove(!1),
                    n.toggleSelection(i),
                    this._context
                        .getModule(r.MODULE_NAME.MOVE_VIEW_PORT)
                        .setAbleAutoMove(!0));
            }
        }
        class vi extends o.a {
            constructor() {
                (super(...arguments), (this.actionName = r.ACTION_NAMES.UNDO));
            }
            doExecute({ needClearRedo: e = !1 } = {}) {
                const t = this._context.model.getUndo();
                (t.undo(), e && t.clearRedo());
            }
            queryStatus() {
                return -1 ===
                    this._context
                        .getActiveUIStatus()
                        .indexOf(r.UI_STATUS.DRAG) &&
                    this._context.model.getUndo().canUndo()
                    ? r.ACTION_STATUS.NORMAL
                    : r.ACTION_STATUS.DISABLE;
            }
        }
        var Ei = i(17),
            _i = i(44),
            Oi = i(40);
        class Si extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.UPDATE_CLASS_INTO_THEME),
                    (this.userStyleKeyList = []),
                    (this.summaryClassData = null),
                    (this.targets = []));
            }
            doExecute({ className: e, classData: t, targets: i = [] } = {}) {
                if (
                    ((this.className = e),
                    (this.classData = t),
                    (this.targets = i),
                    (this.summaryClassData = null),
                    (this.userStyleKeyList = []),
                    (!this.targets || this.targets.length < 1) &&
                        (this.targets = this._context
                            .getModule(r.MODULE_NAME.SELECTION)
                            .getSelections()),
                    (this.targetView = this.targets[0]),
                    !this.className && this.targets.length)
                ) {
                    const e = a.a.getClassList(this.targetView)[0],
                        t = a.a.getClassName(this.targetView);
                    if (((this.className = e || t), !this.className)) return;
                }
                if (!this.classData && this.targets.length) {
                    const e = this.getClassProperties();
                    if (
                        (e && (this.classData = { properties: e }),
                        this.targetView.isSummaryBranch &&
                            this.targetView.isSummaryBranch())
                    ) {
                        const e = this.getSummaryClassProperties();
                        e &&
                            (this.summaryClassData = {
                                properties: e,
                            });
                    }
                }
                (this.className === r.CLASS_TYPE.SUMMARY_TOPIC
                    ? this.handleUpdateSummaryQuickStyles()
                    : r.PRESET_QUICK_STYLE_CLASS_TYPES.includes(this.className)
                      ? this.handleUpdatePresetQuickStyle()
                      : r.TOPIC_CLASS_TYPES.includes(this.className)
                        ? this.handleUpdateToAll()
                        : [
                                r.CLASS_TYPE.BOUNDARY,
                                r.CLASS_TYPE.RELATIONSHIP,
                            ].includes(this.className)
                          ? this.handleUpdateBoundaryAndRelationshipQuickStyles()
                          : /level\d+/.test(this.className)
                            ? this.handleUpdateByLevel()
                            : /priority-\d+/.test(this.className)
                              ? this.handleUpdateByPriorityMarker()
                              : this.classData &&
                                this.updateCLassToTheme(
                                    this.className,
                                    this.classData
                                ),
                    this.targets.forEach((e) => {
                        var t;
                        null === (t = e.model) ||
                            void 0 === t ||
                            t.setStyleObj(null);
                    }));
            }
            getClassProperties() {
                if (this.targetView.type === r.VIEW_TYPE.IMAGE) return null;
                const e = a.a.getClassList(this.targetView),
                    t =
                        e.length &&
                        r.PRESET_QUICK_STYLE_CLASS_TYPES.includes(e[0])
                            ? e[0]
                            : a.a.getSuggestedClassName(this.targetView);
                if (!t) return null;
                let i = [...r.FONT_STYLE_KEYS];
                this.targetView instanceof Ei.a
                    ? (i = i.concat(r.TOPIC_STYLE_KEYS))
                    : this.targetView instanceof _i.a
                      ? (i = i.concat(r.RELATIONSHIP_STYLE_KEYS))
                      : this.targetView instanceof Oi.a &&
                        (i = i.concat(r.BOUNDARY_STYLE_KEYS));
                const n = this.collectAndCompareStylesData({
                    styleClassName: t,
                    targetView: this.targetView,
                    stylesKeys: [...new Set(i)],
                });
                return n.hasDifferentData ? n.classData : null;
            }
            getSummaryClassProperties() {
                const e = this.collectAndCompareStylesData({
                    styleClassName: r.CLASS_TYPE.SUMMARY,
                    targetView: this.targetView.summaryView,
                    stylesKeys: r.SUMMARY_STYLE_KEYS,
                });
                return e.hasDifferentData ? e.classData : null;
            }
            collectAndCompareStylesData(e) {
                let { styleClassName: t, targetView: i, stylesKeys: n } = e;
                const r = {};
                let o = !1;
                for (let e of n) {
                    const n = this._context.model.theme().getStyleValue(t, e);
                    n && (r[e] = n);
                    const s = a.a.getUserStyleValue(i, e);
                    s && (this.userStyleKeyList.push(e), (r[e] = s), (o = !0));
                }
                return { classData: r, hasDifferentData: o };
            }
            getViewsByThemeClassNames(e, t) {
                const i = [],
                    n = this._context
                        .getSheetView()
                        .getCentralBranchView()
                        .getDescendantBranchesByType(r.ALL_TOPIC_TYPES),
                    o = n
                        .map((e) => e.boundaries)
                        .reduce((e, t) => e.concat(t), []),
                    s = this._context.getSheetView().relationships;
                for (const r of [...n, ...o, ...s]) {
                    const n = [
                        a.a.getClassName(r),
                        a.a.getSuggestedClassName(r),
                        ...a.a.getClassList(r),
                    ];
                    n.some((t) => e === t) &&
                        n.every((e) => !t.includes(e)) &&
                        i.push(r);
                }
                return i;
            }
            getViewsByMarker(e, t = []) {
                const i = [],
                    n = this._context
                        .getSheetView()
                        .getCentralBranchView()
                        .getDescendantBranchesByType(r.ALL_TOPIC_TYPES);
                for (const r of n) {
                    const n = [
                        a.a.getClassName(r),
                        a.a.getSuggestedClassName(r),
                        ...a.a.getClassList(r),
                    ];
                    r.topicView.markersView.markerIdList.some((t) => t === e) &&
                        n.every((e) => !t.includes(e)) &&
                        i.push(r);
                }
                return i;
            }
            _generalUpdate() {
                this.classData &&
                    (this.updateCLassToTheme(this.className, this.classData),
                    this.getViewsByThemeClassNames(this.className, []).forEach(
                        (e) => {
                            var t;
                            null === (t = e.model) ||
                                void 0 === t ||
                                t.setStyleObj(null);
                        }
                    ));
            }
            handleUpdateToAll() {
                if (!this.classData) return;
                const e = this.getViewsByThemeClassNames(
                        this.className,
                        r.PRESET_QUICK_STYLE_CLASS_TYPES
                    ),
                    t = [];
                e.forEach((e) => {
                    (t.push(a.a.getSuggestedClassName(e)),
                        t.push(...a.a.getClassList(e)));
                });
                const i = [...new Set(t.filter(Boolean))].filter(
                    (e) => e !== this.className
                );
                (i.forEach((t) => {
                    e.forEach((e) => {
                        var i;
                        null === (i = e.model) ||
                            void 0 === i ||
                            i.removeClass(t);
                    });
                }),
                    a.a.removeClassFromTheme(this._context.getSheetView(), i),
                    this.updateCLassToTheme(this.className, this.classData),
                    this.getViewsByThemeClassNames(
                        this.className,
                        r.PRESET_QUICK_STYLE_CLASS_TYPES
                    ).forEach((e) => {
                        var t;
                        null === (t = e.model) ||
                            void 0 === t ||
                            t.setStyleObj(null);
                    }));
            }
            handleUpdateByLevel() {
                this.classData &&
                    (this.updateCLassToTheme(this.className, this.classData),
                    this.getViewsByThemeClassNames(
                        this.className,
                        r.PRESET_QUICK_STYLE_CLASS_TYPES
                    ).forEach((e) => {
                        var t;
                        (a.a.getClassList(e).forEach((t) => {
                            var i;
                            return null === (i = e.model) || void 0 === i
                                ? void 0
                                : i.removeClass(t);
                        }),
                            null === (t = e.model) ||
                                void 0 === t ||
                                t.setStyleObj(null));
                    }));
            }
            handleUpdateSummaryQuickStyles() {
                (this.classData || this.summaryClassData) &&
                    (this.classData &&
                        this.updateCLassToTheme(this.className, this.classData),
                    this.summaryClassData &&
                        this.updateCLassToTheme(
                            r.CLASS_TYPE.SUMMARY,
                            this.summaryClassData
                        ),
                    this.getViewsByThemeClassNames(
                        this.className,
                        r.PRESET_QUICK_STYLE_CLASS_TYPES
                    ).forEach((e) => {
                        var t, i;
                        (null === (t = e.model) ||
                            void 0 === t ||
                            t.setStyleObj(null),
                            null === (i = e.summaryModel) ||
                                void 0 === i ||
                                i.setStyleObj(null),
                            a.a.getClassList(e).forEach((t) => {
                                var i;
                                return null === (i = e.model) || void 0 === i
                                    ? void 0
                                    : i.removeClass(t);
                            }));
                    }));
            }
            handleUpdateBoundaryAndRelationshipQuickStyles() {
                this._generalUpdate();
            }
            handleUpdatePresetQuickStyle() {
                this._generalUpdate();
            }
            handleUpdateByPriorityMarker() {
                if (!this.classData) return;
                (this.getViewsByMarker(this.className).forEach((e) => {
                    var t, i;
                    (null === (t = e.model) ||
                        void 0 === t ||
                        t.setStyleObj(null),
                        a.a.getClassList(e).forEach((t) => {
                            var i;
                            return null === (i = e.model) || void 0 === i
                                ? void 0
                                : i.removeClass(t);
                        }),
                        null === (i = e.model) ||
                            void 0 === i ||
                            i.addClass(this.className));
                }),
                    this.updateCLassToTheme(this.className, this.classData));
            }
            clearMultiLineColorsWhileUpdateMainTopicLineColor() {
                var e;
                this.className === r.CLASS_TYPE.MAIN_TOPIC &&
                    this._context.getSheetView().isMultiLineColors() &&
                    (null === (e = this.classData.properties) || void 0 === e
                        ? void 0
                        : e[r.STYLE_KEYS.LINE_COLOR]) &&
                    this._context
                        .getSVGView()
                        .content()
                        .model.changeStyle(
                            r.STYLE_KEYS.MULTI_LINE_COLORS,
                            'none'
                        );
            }
            updateCLassToTheme(e, t) {
                const i = this._context.getSheetView(),
                    n = this.collectDynamicPriorityPrefixProperties();
                (Object.assign(t.properties, n),
                    this.clearMultiLineColorsWhileUpdateMainTopicLineColor(),
                    a.a.updateClassIntoTheme(i, e, t));
            }
            collectDynamicPriorityPrefixProperties() {
                var e, t;
                const i = {},
                    n = a.a.getTheme(this._context),
                    o = this._context
                        .getModule(r.MODULE_NAME.OVERRIDE_STYLE)
                        .getDynamicPriorityLayerStyleKeys(),
                    s = Object.keys(
                        null !==
                            (e = n.getStyle(r.PRESET_GLOBAL_STYLE_CLASS)) &&
                            void 0 !== e
                            ? e
                            : {}
                    );
                for (const e of this.userStyleKeyList) {
                    for (const t in o) {
                        o[t].includes(e) && (i[`${t}_${e}`] = !0);
                    }
                    s.forEach((t) => {
                        t === e &&
                            (i[`${r.PRESET_GLOBAL_STYLE_CLASS}_${e}`] = !0);
                    });
                }
                return (
                    Object.keys(
                        null !== (t = n.getStyle(this.className)) &&
                            void 0 !== t
                            ? t
                            : {}
                    ).forEach((e) => {
                        let t = !1;
                        for (const i in o) e.startsWith(i) && (t = !0);
                        (e.startsWith(r.PRESET_GLOBAL_STYLE_CLASS) && (t = !0),
                            t && (i[e] = !0));
                    }),
                    i
                );
            }
        }
        class xi extends o.a {
            constructor() {
                (super(...arguments), (this.actionName = r.ACTION_NAMES.ZOOM));
            }
            doExecute({ scale: e, isAnimation: t } = {}) {
                void 0 !== e && this._context.getSVGView().setScale(e, t);
            }
        }
        class Ri extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.SHOW_BRANCH_ONLY));
            }
            doExecute({ target: e } = {}) {
                const t = this._context.getModule(r.MODULE_NAME.SELECTION);
                if (!(e = e || t.getSelections()[0])) return;
                if (e.isCentralBranch())
                    return (
                        f.showBranchOnlyUtil.showFullContent(this._context),
                        void t.selectSingle(e)
                    );
                (f.showBranchOnlyUtil.focusTargetBranchView(e),
                    t.selectSingle(e));
                const i = this._context.getSheetView(),
                    n = this._context.getModule(r.MODULE_NAME.SEMAPHORE);
                (this._context.model.getUndo().getLastGroup() &&
                    this._context.model.getUndo().append({
                        undo: () => {
                            n.isStatusActive(r.UI_STATUS.SHOW_BRANCH_ONLY) &&
                                f.showBranchOnlyUtil.showFullContent(
                                    this._context
                                );
                        },
                        redo: () => {},
                    }),
                    e.model.listenTo(
                        i.model,
                        r.EVENTS.AFTER_REMOVE_TOPIC,
                        (t) => {
                            t.topic === e.model &&
                                n.isStatusActive(
                                    r.UI_STATUS.SHOW_BRANCH_ONLY
                                ) &&
                                f.showBranchOnlyUtil.showFullContent(
                                    this._context
                                );
                        }
                    ));
            }
            queryStatus() {
                return r.ACTION_STATUS.NORMAL;
            }
        }
        class Ii extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.SHOW_FULL_CONTENT));
            }
            doExecute() {
                f.showBranchOnlyUtil.showFullContent(this._context);
            }
            queryStatus() {
                return r.ACTION_STATUS.NORMAL;
            }
        }
        class Ni extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.CHANGE_IOS_DRAWING));
            }
            doExecute({ targets: e = [], iOSDrawingData: t, imageSrc: i }) {
                e = this.getFilterBranchViewList(e);
                (this._context
                    .getSheetView()
                    .getCentralBranchView()
                    .model.updateIOSDrawing(t),
                    this._context.execAction(r.ACTION_NAMES.ADD_IMAGE, {
                        imageInfo: i,
                        targets: e,
                    }));
            }
            queryStatus({ targets: e = [] } = {}) {
                return (e = this.getFilterBranchViewList(e)).length > 0
                    ? r.ACTION_STATUS.NORMAL
                    : r.ACTION_STATUS.DISABLE;
            }
        }
        class wi extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.REMOVE_IOS_DRAWING));
            }
            doExecute({ targets: e = [], iOSDrawingData: t }) {
                e = this.getFilterBranchViewList(e);
                (this._context
                    .getSheetView()
                    .getCentralBranchView()
                    .model.updateIOSDrawing(t),
                    e.forEach((e) => {
                        e.model.removeImage();
                    }));
            }
            queryStatus({ targets: e = [] } = {}) {
                return (e = this.getFilterBranchViewList(e)).length > 0
                    ? r.ACTION_STATUS.NORMAL
                    : r.ACTION_STATUS.DISABLE;
            }
        }
        class Pi extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.CHANGE_MATH_JAX));
            }
            doExecute({ targets: e = [], mathJaxText: t }) {
                t &&
                    (e = this.getFilterBranchViewList(e)).forEach((e) => {
                        e.model.updateMathJaxInfo({
                            provider: r.EXTENSION_PROVIDER.MATH_JAX,
                            content: { content: t },
                        });
                    });
            }
            queryStatus({ targets: e = [] } = {}) {
                return (e = this.getFilterBranchViewList(e)).length > 0
                    ? r.ACTION_STATUS.NORMAL
                    : r.ACTION_STATUS.DISABLE;
            }
        }
        class Hi extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.RESIZE_MATH_JAX));
            }
            doExecute({ targets: e = [], newWidth: t } = { newWidth: 0 }) {
                ((!e || e.length < 1) &&
                    (e = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    e.forEach((e) => {
                        (e.type === r.VIEW_TYPE.BRANCH
                            ? e.model
                            : e.parent().model
                        ).updateMathJaxWidth(Math.max(t, 0));
                    }));
            }
            queryStatus({ targets: e = [] } = {}) {
                (!e || e.length < 1) &&
                    (e = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections());
                return e.every(
                    (e) =>
                        e.type === r.VIEW_TYPE.BRANCH ||
                        e.type === r.VIEW_TYPE.MATH_JAX
                )
                    ? r.ACTION_STATUS.NORMAL
                    : r.ACTION_STATUS.DISABLE;
            }
        }
        class Di extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.CLEAR_SELECTION));
            }
            doExecute({ forceFlush: e }) {
                this._context
                    .getModule(r.MODULE_NAME.SELECTION)
                    .selectNone({ forceFlush: e });
            }
        }
        class Fi extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.CLEAR_PRE_SELECTION));
            }
            doExecute({ targets: e }) {
                e &&
                    Array.isArray(e) &&
                    0 !== e.length &&
                    e.forEach((e) =>
                        e instanceof Ei.a
                            ? this.clearPreSelectionOfBranchView(e)
                            : e instanceof _i.a
                              ? this.clearPreSelectionOfRelationshipView(e)
                              : e instanceof Oi.a
                                ? this.clearPreSelectionOfBoundaryView(e)
                                : void 0
                    );
            }
            clearPreSelectionOfBranchView(e) {
                (e.isSelected || e.getProxy().displayDehover(),
                    e.editDomain().eventBus.trigger('branchMouseOut', this));
            }
            clearPreSelectionOfRelationshipView(e) {
                ((e.isHovering = !1),
                    e._updateState(),
                    e.setIsHoveringStartPoint1(!1),
                    e.setIsHoveringStartPoint2(!1),
                    e.setIsHoveringControlPoint1(!1),
                    e.setIsHoveringControlPoint2(!1));
            }
            clearPreSelectionOfBoundaryView(e) {
                e.isSelected ||
                    (e.selectBox.hide(),
                    e.selectBox.stateMachine.transition(e.selectBox.event_out));
            }
        }
        class ki extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.DELETE_SINGLE_TOPIC));
            }
            doExecute({ targets: e = [] } = {}) {
                const t = this.getFilterBranchViewList(e)[0],
                    i = t.model,
                    n = t.parent(),
                    o = [...i.children()],
                    a = i.boundaries().map((e) => ({
                        model: e,
                        rangeStart: e.rangeStart,
                        rangeEnd: e.rangeEnd,
                    })),
                    s = i.summaries().map((e) => ({
                        model: e,
                        rangeStart: e.rangeStart,
                        rangeEnd: e.rangeEnd,
                    })),
                    l = [...i.children(r.TOPIC_TYPE.SUMMARY)],
                    c = this.getInnerRelationshipModelList(t),
                    d = i.getIndexInParent(),
                    f = i.parent(),
                    h = this.getParentSelectAbleInfoList(i, !0),
                    p = this.getParentSelectAbleInfoList(i, !1),
                    T = [...f.children(r.TOPIC_TYPE.SUMMARY)],
                    u =
                        t.parent().getStructureClass() ===
                        r.STRUCTURECLASS.MAPUNBALANCED;
                let g, Q;
                if (
                    u &&
                    ((g = n.figure.unbalanceRightNumber), (Q = d < g), !Q)
                ) {
                    o.reverse();
                    const e = o.length;
                    (a.forEach((t) => {
                        const i = e - 1 - t.rangeEnd,
                            n = e - 1 - t.rangeStart;
                        ((t.rangeStart = i), (t.rangeEnd = n));
                    }),
                        s.forEach((t) => {
                            const i = e - 1 - t.rangeEnd,
                                n = e - 1 - t.rangeStart;
                            ((t.rangeStart = i), (t.rangeEnd = n));
                        }));
                }
                (h.forEach((e) => e.model.removeSelf()),
                    T.forEach((e) => e.removeSelf()),
                    o.forEach((e) => e.removeSelf()),
                    i.removeSelf());
                const m = [...o];
                (this.rebuildChildrenTopicList(f, m, d),
                    this.rebuildChildBoundaryList(f, a, d),
                    this.rebuildChildSummaryList(f, s, l, d),
                    this.reRangeParentBoundaryList(f, h, m.length, d),
                    this.reRangeParentSummaryList(f, p, T, m.length, d),
                    this.rebuildRelationshipList(c),
                    u && Q && f.setUnBalancedInfoContent(g - 1 + m.length),
                    this.selectNewChildrenBranchView(n, m));
            }
            getInnerRelationshipModelList(e) {
                const t = Object(f.getAllChildrenBranchViewList)(e);
                return this._context
                    .getSheetView()
                    .relationships.filter((e) => {
                        const i = t.includes(e.end1View),
                            n = t.includes(e.end2View);
                        return i || n;
                    })
                    .map((e) => e.model);
            }
            getParentSelectAbleInfoList(e, t) {
                const i = e.getIndexInParent(),
                    n = e.parent();
                return (t ? n.boundaries() : n.summaries())
                    .filter((n) => {
                        const r = n.rangeStart === i && n.rangeEnd === i;
                        let o;
                        if (r) {
                            o = (t ? e.boundaries() : e.summaries()).some(
                                (t) =>
                                    0 === t.rangeStart &&
                                    t.rangeEnd === e.children().length - 1
                            );
                        }
                        return !(r && o);
                    })
                    .map((e) => ({
                        model: e,
                        rangeStart: e.rangeStart,
                        rangeEnd: e.rangeEnd,
                    }));
            }
            rebuildChildrenTopicList(e, t, i) {
                t.forEach((t, n) => {
                    e.addChildTopic(t, { at: i + n });
                });
            }
            rebuildChildBoundaryList(e, t, i) {
                t.forEach((t) => {
                    const n = t.model.toJSON();
                    ((n.range = `(${t.rangeStart + i},${t.rangeEnd + i})`),
                        e.addBoundary(n));
                });
            }
            rebuildChildSummaryList(e, t, i, n) {
                t.forEach((t) => {
                    const r = t.model.toJSON();
                    r.range = `(${t.rangeStart + n},${t.rangeEnd + n})`;
                    const o = i.find((e) => e.getId() === r.topicId),
                        a = Object(Je.a)(
                            o.toJSON(),
                            this._context.getSheetView().model
                        );
                    e.addSummary(r, !1, a);
                });
            }
            reRangeParentBoundaryList(e, t, i, n) {
                t.forEach((t) => {
                    const r = t.rangeStart,
                        o = t.rangeEnd,
                        a = `(${r <= n ? r : r + i - 1},${o >= n ? o + i - 1 : o})`,
                        s = t.model.toJSON();
                    ((s.range = a), e.addBoundary(s));
                });
            }
            reRangeParentSummaryList(e, t, i, n, r) {
                t.forEach((t) => {
                    const o = t.rangeStart,
                        a = t.rangeEnd,
                        s = o <= r ? o : o + n - 1,
                        l = a >= r ? a + n - 1 : a,
                        c = t.model.toJSON();
                    c.range = `(${s},${l})`;
                    const d = i.find((e) => e.getId() === c.topicId),
                        f = Object(Je.a)(
                            d.toJSON(),
                            this._context.getSheetView().model
                        );
                    e.addSummary(c, !1, f);
                });
            }
            rebuildRelationshipList(e) {
                e.forEach((e) => {
                    this._context
                        .getSheetView()
                        .model.addRelationship(e.toJSON());
                });
            }
            selectNewChildrenBranchView(e, t) {
                const i = e
                    .getChildrenBranchesByType()
                    .filter((e) => t.includes(e.model));
                Q.a.work(Q.b.PRIORITY.SELECT_SELECTION, {
                    execute: () => {
                        const t = e
                            .getContext()
                            .getModule(r.MODULE_NAME.SELECTION);
                        i.forEach((e) => {
                            t.addSelection(e);
                        });
                    },
                });
            }
            queryStatus({ targets: e = [] } = {}) {
                return 1 !== (e = this.getFilterBranchViewList(e)).length ||
                    Object(f.isRootBranch)(e[0]) ||
                    Object(f.isDetachedBranch)(e[0])
                    ? r.ACTION_STATUS.DISABLE
                    : r.ACTION_STATUS.NORMAL;
            }
        }
        const Bi = [
            r.VIEW_TYPE.BRANCH,
            r.VIEW_TYPE.BOUNDARY,
            r.VIEW_TYPE.RELATIONSHIP,
        ];
        function Vi(e) {
            const t = e.model.rangeStart;
            return e.parent().getChildrenBranchesByType()[t];
        }
        class Yi extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.HIGH_LIGHT_SELECT));
            }
            doExecute({ id: e }) {
                const t = this._context.getComponentViewById(e);
                if (!Bi.includes(t.type)) return;
                const i = this._context.getModule(r.MODULE_NAME.SELECTION);
                i &&
                    (this.showRelatedBranchView(t),
                    i.selectSingle(t),
                    t.displayHighLightSelect());
            }
            showRelatedBranchView(e) {
                const t = [];
                switch (e.type) {
                    case r.VIEW_TYPE.BRANCH:
                        t.push(e);
                        break;
                    case r.VIEW_TYPE.BOUNDARY:
                        t.push(Vi(e));
                        break;
                    case r.VIEW_TYPE.RELATIONSHIP: {
                        const i = Object(f.isBranch)(e.end1View)
                                ? e.end1View
                                : Vi(e.end1View),
                            n = Object(f.isBranch)(e.end2View)
                                ? e.end2View
                                : Vi(e.end2View);
                        (t.push(i), t.push(n));
                        break;
                    }
                }
                t.forEach((e) => Object(f.showBranchIfHidden)(e));
            }
        }
        class Gi extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.REMOVE_CLASS_FROM_THEME));
            }
            doExecute({ classNames: e } = { classNames: [] }) {
                a.a.removeClassFromTheme(this._context.getSheetView(), e);
            }
        }
        function Ui(e, t) {
            (e.model.extendBranch(),
                e.getChildrenBranchesByType().forEach((e) => {
                    e.model.getLayer() === t
                        ? e.model.collapseBranch()
                        : Ui(e, t);
                }));
        }
        class ji extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName =
                        r.ACTION_NAMES.COLLAPSE_TO_SPECIFIC_RELATIVE_LAYER));
            }
            doExecute({ targets: e, relativeLayer: t }) {
                if (!t) return;
                const i = this.getFilterBranchViewList(e)[0],
                    n = i.model.getLayer() + t;
                Ui(i, n);
            }
            queryStatus({ targets: e }) {
                return 1 === this.getFilterBranchViewList(e).length
                    ? r.ACTION_STATUS.NORMAL
                    : r.ACTION_STATUS.DISABLE;
            }
            getFilterBranchViewList(e) {
                return super
                    .getFilterBranchViewList(e)
                    .filter((e) => !Object(f.isCalloutBranch)(e));
            }
        }
        const $i = [
            r.TOPIC_TYPE.ATTACHED,
            r.TOPIC_TYPE.DETACHED,
            r.TOPIC_TYPE.CALLOUT,
            r.TOPIC_TYPE.SUMMARY,
        ];
        class zi extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.FILTER_BRANCH));
            }
            doExecute({ idList: e, filterOpacity: t, normalOpacity: i }) {
                e || (e = []);
                const n = !e.length;
                (this.getAllCouldBeFilteredViewList().forEach((o) => {
                    let a = !n;
                    Object(f.isBranch)(o) &&
                        !n &&
                        (a = !e.includes(o.model.getId()));
                    const s = a
                        ? null != t
                            ? t
                            : r.FILTER_MODE_OPACITY
                        : null != i
                          ? i
                          : 1;
                    o.figure.setOpacity(s);
                }),
                    this.updateFilterModeUIStatus(n));
            }
            getAllCouldBeFilteredViewList() {
                const e = this._context.getSheetView().centralBranchView,
                    t = [e, ...e.getDescendantBranchesByType($i)],
                    i = t.reduce((e, t) => (e.push(...t.boundaries), e), []),
                    n = [...this._context.getSheetView().relationships],
                    r = t.map((e) => e.getConnectionView()),
                    o = (e) =>
                        t.reduce((t, i) => {
                            const n = e(i);
                            return (n && t.push(n), t);
                        }, []),
                    a = o((e) => e.getTreeTableCellView()),
                    s = o((e) => e.getFishboneHeadLineView()),
                    l = o((e) => e.getFishboneMainLineView()),
                    c = o((e) => e.getMatrixView());
                return [...t, ...i, ...n, ...r, ...a, ...s, ...l, ...c];
            }
            updateFilterModeUIStatus(e) {
                const t = this._context.getModule(r.MODULE_NAME.SEMAPHORE);
                return e
                    ? t.decrease(r.UI_STATUS.FILTER_MODE)
                    : t.isStatusActive(r.UI_STATUS.FILTER_MODE)
                      ? void 0
                      : t.increase(r.UI_STATUS.FILTER_MODE);
            }
        }
        class Wi extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName =
                        r.ACTION_NAMES.CHANGE_FLOATING_TOPIC_FLEXIBLE));
            }
            doExecute({ value: e }) {
                switch (e) {
                    case 'flex':
                        this._context.model.toggleFloatingTopicFlexible(!0);
                        break;
                    case 'sticky':
                        this._context.model.toggleFloatingTopicFlexible(!1);
                }
            }
        }
        class Ki extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.SET_MULTI_SELECT_MODE));
            }
            doExecute({ enabled: e }) {
                const t = this._context.getModule(r.MODULE_NAME.SELECTION);
                null == t || t.setMultiSelectMode(e);
            }
            queryStatus() {
                return r.ACTION_STATUS.NORMAL;
            }
        }
        class Zi extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.CHANGE_IMAGE_OPACITY));
            }
            doExecute({ targets: e = [], opacity: t } = {}) {
                ((!e || e.length < 1) &&
                    (e = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    'number' == typeof t &&
                        (t < 0 && (t = 0),
                        t > 1 && (t = 1),
                        e.forEach((e) => {
                            const i = (
                                e.type === r.VIEW_TYPE.BRANCH
                                    ? e.model
                                    : e.parent().model
                            ).getImageModel();
                            i && i.getSrc() && i.changeOpacity(t);
                        })));
            }
            queryStatus({ targets: e = [] } = {}) {
                (!e || e.length < 1) &&
                    (e = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections());
                return e.every(
                    (e) =>
                        e.type === r.VIEW_TYPE.BRANCH ||
                        e.type === r.VIEW_TYPE.IMAGE
                )
                    ? r.ACTION_STATUS.NORMAL
                    : r.ACTION_STATUS.DISABLE;
            }
        }
        class Ji extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName =
                        r.ACTION_NAMES.CHANGE_IMAGE_BORDER_WIDTH));
            }
            doExecute({ targets: e = [], borderWidth: t } = {}) {
                ((!e || e.length < 1) &&
                    (e = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    'number' == typeof t &&
                        (t < 0 && (t = 0),
                        e.forEach((e) => {
                            const i = (
                                e.type === r.VIEW_TYPE.BRANCH
                                    ? e.model
                                    : e.parent().model
                            ).getImageModel();
                            i && i.getSrc() && i.changeBorderWidth(t);
                        })));
            }
            queryStatus({ targets: e = [] } = {}) {
                (!e || e.length < 1) &&
                    (e = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections());
                return e.every(
                    (e) =>
                        e.type === r.VIEW_TYPE.BRANCH ||
                        e.type === r.VIEW_TYPE.IMAGE
                )
                    ? r.ACTION_STATUS.NORMAL
                    : r.ACTION_STATUS.DISABLE;
            }
        }
        class Xi extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName =
                        r.ACTION_NAMES.CHANGE_IMAGE_BORDER_COLOR));
            }
            doExecute({ targets: e = [], borderColor: t } = {}) {
                ((!e || e.length < 1) &&
                    (e = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    'string' == typeof t &&
                        e.forEach((e) => {
                            const i = (
                                e.type === r.VIEW_TYPE.BRANCH
                                    ? e.model
                                    : e.parent().model
                            ).getImageModel();
                            i && i.getSrc() && i.changeBorderColor(t);
                        }));
            }
            queryStatus({ targets: e = [] } = {}) {
                (!e || e.length < 1) &&
                    (e = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections());
                return e.every(
                    (e) =>
                        e.type === r.VIEW_TYPE.BRANCH ||
                        e.type === r.VIEW_TYPE.IMAGE
                )
                    ? r.ACTION_STATUS.NORMAL
                    : r.ACTION_STATUS.DISABLE;
            }
        }
        class qi extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName =
                        r.ACTION_NAMES.CHANGE_IMAGE_SHADOW_VISIBLE));
            }
            doExecute({ targets: e = [], visible: t } = {}) {
                ((!e || e.length < 1) &&
                    (e = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    'boolean' == typeof t &&
                        e.forEach((e) => {
                            const i = (
                                e.type === r.VIEW_TYPE.BRANCH
                                    ? e.model
                                    : e.parent().model
                            ).getImageModel();
                            i && i.getSrc() && i.changeShadowVisible(t);
                        }));
            }
            queryStatus({ targets: e = [] } = {}) {
                (!e || e.length < 1) &&
                    (e = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections());
                return e.every(
                    (e) =>
                        e.type === r.VIEW_TYPE.BRANCH ||
                        e.type === r.VIEW_TYPE.IMAGE
                )
                    ? r.ACTION_STATUS.NORMAL
                    : r.ACTION_STATUS.DISABLE;
            }
        }
        class en extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.CHANGE_IMAGE_LOCK_RATIO));
            }
            doExecute({ targets: e = [], lockRatio: t } = {}) {
                ((!e || e.length < 1) &&
                    (e = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections()),
                    'boolean' == typeof t &&
                        e.forEach((e) => {
                            const i = (
                                e.type === r.VIEW_TYPE.BRANCH
                                    ? e.model
                                    : e.parent().model
                            ).getImageModel();
                            i && i.getSrc() && i.changeLockRatio(t);
                        }));
            }
            queryStatus({ targets: e = [] } = {}) {
                (!e || e.length < 1) &&
                    (e = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections());
                return e.every(
                    (e) =>
                        e.type === r.VIEW_TYPE.BRANCH ||
                        e.type === r.VIEW_TYPE.IMAGE
                )
                    ? r.ACTION_STATUS.NORMAL
                    : r.ACTION_STATUS.DISABLE;
            }
        }
        class tn extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.CHANGE_IMAGE));
            }
            doExecute({
                imageData: e,
                targets: t = [],
                flipAndRotateRecord: i,
            } = {}) {
                (!t || t.length < 1) &&
                    (t = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections());
                let n = '',
                    o = null,
                    a = null;
                if (
                    ('string' == typeof e
                        ? (n = e)
                        : 'object' == typeof e &&
                          ((n = e.src), (o = e.width), (a = e.height)),
                    n)
                ) {
                    const e = { src: n };
                    (o && (e.width = o),
                        a && (e.height = a),
                        t.forEach((t) => {
                            const n = (
                                t.type === r.VIEW_TYPE.BRANCH
                                    ? t.model
                                    : t.parent().model
                            ).getImageModel();
                            n && n.getSrc() && n.changeImageData(e, i || []);
                        }));
                }
            }
            queryStatus({ targets: e = [] } = {}) {
                (!e || e.length < 1) &&
                    (e = this._context
                        .getModule(r.MODULE_NAME.SELECTION)
                        .getSelections());
                return e.every(
                    (e) =>
                        e.type === r.VIEW_TYPE.BRANCH ||
                        e.type === r.VIEW_TYPE.IMAGE
                )
                    ? r.ACTION_STATUS.NORMAL
                    : r.ACTION_STATUS.DISABLE;
            }
        }
        class nn extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName =
                        r.ACTION_NAMES.TOGGLE_ALIGNMENT_BY_LEVEL_MODE));
            }
            doExecute() {
                const e = this._context.isAlignmentByLevelMode();
                this._context
                    .getSheetView()
                    .getCentralBranchView()
                    .model.changeStyle(
                        r.STYLE_KEYS.ALIGNMENT_BY_LEVEL,
                        e
                            ? r.ALIGNMENT_BY_LEVEL_STATUS.INACTIVED
                            : r.ALIGNMENT_BY_LEVEL_STATUS.ACTIVED
                    );
            }
        }
        class rn extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName =
                        r.ACTION_NAMES.CHANGE_COMPACT_LAYOUT_MODE_LEVEL));
            }
            doExecute({ level: e }) {
                this._context.model.changeCompactLayoutModeLevel(
                    null != e ? e : r.COMPACT_LAYOUT_MODE_LEVEL.Second
                );
            }
        }
        class on extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.SHEET_MODIFIED));
            }
            doExecute() {
                this._context
                    .getModule(r.MODULE_NAME.MODIFY_CHECK)
                    .simulateModify();
            }
        }
        var an = i(71);
        class sn extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName =
                        r.ACTION_NAMES.CHANGE_HAND_DRAWN_MODE_ACTIVE));
            }
            doExecute({ active: e }) {
                this._context.model.changeHandDrawnModeActive(e);
                const t = this._context.getSheetView();
                if (e)
                    Object(an.b)(t).forEach((e) => {
                        const t = [
                            Object(f.isHandDrawnLinePattern)(
                                a.a.getUserStyleValue(
                                    e,
                                    r.STYLE_KEYS.LINE_PATTERN
                                )
                            )
                                ? null
                                : r.STYLE_KEYS.LINE_PATTERN,
                            Object(f.isHandDrawnLinePattern)(
                                a.a.getUserStyleValue(
                                    e,
                                    r.STYLE_KEYS.BORDER_LINE_PATTERN
                                )
                            )
                                ? null
                                : r.STYLE_KEYS.BORDER_LINE_PATTERN,
                            Object(f.isHandDrawnFillPattern)(
                                a.a.getUserStyleValue(
                                    e,
                                    r.STYLE_KEYS.FILL_PATTERN
                                )
                            )
                                ? null
                                : r.STYLE_KEYS.FILL_PATTERN,
                            r.STYLE_KEYS.FONT_FAMILY,
                        ].filter(Boolean);
                        a.a.fixUserStyle(e, {
                            styleKeysToBeFix: t,
                        });
                    });
                else {
                    const e = this._context.model.theme().toJSON();
                    for (const i in e) {
                        if (!(e[i] instanceof Object)) continue;
                        const { properties: n } = e[i],
                            o = Object.keys(null != n ? n : {})
                                .map((e) =>
                                    e.startsWith(
                                        r.STYLE_DESCRIPTOR_FOR_HAND_DRAWN_ID
                                    )
                                        ? e
                                        : null
                                )
                                .filter(Boolean);
                        o.length && a.a.removeStyleFromClass(t, i, o);
                    }
                }
            }
        }
        const ln = (e) => null == e;
        class cn extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.CHANGE_GLOBAL_STYLE));
            }
            doExecute({ key: e, value: t }) {
                e &&
                    (ln(t) || this.clearUserStyle(e),
                    this.clearThemePriorityGlobalFlag(e),
                    this.updateGlobalStyleClass(e, t));
            }
            updateGlobalStyleClass(e, t) {
                var i;
                const n = this._context.getSheetView(),
                    o = {
                        properties:
                            null !==
                                (i = n.model
                                    .theme()
                                    .getStyle(r.PRESET_GLOBAL_STYLE_CLASS)) &&
                            void 0 !== i
                                ? i
                                : {},
                    };
                (ln(t) ? delete o.properties[e] : (o.properties[e] = t),
                    a.a.updateClassIntoTheme(
                        n,
                        r.PRESET_GLOBAL_STYLE_CLASS,
                        o,
                        { newGlobalStyle: !0 }
                    ));
            }
            clearUserStyle(e) {
                switch (e) {
                    case r.STYLE_KEYS.LINE_WIDTH:
                        return this.clearUserLineWidth();
                    case r.STYLE_KEYS.FONT_FAMILY:
                        return this.clearUserFontFamily();
                    case r.STYLE_KEYS.LINE_TAPERED:
                        return this.clearUserLineTapered();
                }
            }
            clearUserLineWidth() {
                const e = this._context.getSheetView().getCentralBranchView();
                [
                    e,
                    ...e.getDescendantBranchesByType(r.ALL_TOPIC_TYPES),
                ].forEach((e) => {
                    a.a.fixUserStyle(e, {
                        styleKeysToBeFix: [r.STYLE_KEYS.LINE_WIDTH],
                    });
                });
            }
            clearUserLineTapered() {
                this._context
                    .getSheetView()
                    .model.changeStyle(r.STYLE_KEYS.LINE_TAPERED, null);
            }
            clearUserFontFamily() {
                const e = this._context.getSheetView();
                Object(an.b)(e).forEach((e) => {
                    a.a.fixUserStyle(e, {
                        styleKeysToBeFix: [r.STYLE_KEYS.FONT_FAMILY],
                    });
                });
            }
            clearThemePriorityGlobalFlag(e) {
                const t = this._context.model.theme().toJSON(),
                    i = this._context.getSheetView();
                for (const n in t) {
                    if (!(t[n] instanceof Object)) continue;
                    const { properties: o } = t[n],
                        s = `${r.PRESET_GLOBAL_STYLE_CLASS}_${e}`;
                    s in (null != o ? o : {}) &&
                        a.a.removeStyleFromClass(i, n, [s]);
                }
            }
        }
        const dn = [
            r.TOPIC_TYPE.ATTACHED,
            r.TOPIC_TYPE.DETACHED,
            r.TOPIC_TYPE.CALLOUT,
            r.TOPIC_TYPE.SUMMARY,
        ];
        class fn extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName =
                        r.ACTION_NAMES.TOGGLE_SELECT_BOX_VISIBILITY));
            }
            doExecute({ isVisible: e, targets: t }) {
                (null != t ? t : this.getAllBranchView()).forEach((t) => {
                    Object(f.isBranch)(t) &&
                        (e
                            ? t.setSelectBoxOpacity(1)
                            : t.setSelectBoxOpacity(0));
                });
            }
            getAllBranchView() {
                const e = this._context.getSheetView().centralBranchView;
                return [e, ...e.getDescendantBranchesByType(dn)];
            }
        }
        class hn extends o.a {
            constructor() {
                (super(...arguments),
                    (this.actionName = r.ACTION_NAMES.CHANGE_WEB_VIDEO));
            }
            doExecute({ targets: e = [], url: t, thumbnail: i }) {
                this.getFilterBranchViewList(e).forEach((e) => {
                    e.model.addImage({ src: i }, { webVideoUrl: t });
                });
            }
            queryStatus({ targets: e = [] }) {
                return (e = this.getFilterBranchViewList(e)).length > 0
                    ? r.ACTION_STATUS.NORMAL
                    : r.ACTION_STATUS.DISABLE;
            }
        }
        const pn = [
            d,
            h,
            p,
            T,
            g,
            m,
            b,
            C,
            L,
            y,
            M,
            P,
            H,
            D,
            F,
            k,
            B,
            V,
            Y,
            G,
            U,
            j,
            $,
            z,
            W,
            K,
            Z,
            J,
            X,
            q,
            Wi,
            ee,
            te,
            ie,
            ne,
            re,
            oe,
            ae,
            se,
            le,
            ce,
            de,
            fe,
            he,
            pe,
            ge,
            Qe,
            me,
            be,
            Ce,
            Le,
            ye,
            Me,
            ve,
            Ee,
            _e,
            Oe,
            Se,
            xe,
            Re,
            Ie,
            Ne,
            we,
            Pe,
            He,
            De,
            Fe,
            ke,
            Be,
            Zi,
            Ji,
            Xi,
            qi,
            en,
            tn,
            Ve,
            Ye,
            Ge,
            Ue,
            je,
            $e,
            We,
            Ke,
            Xe,
            et,
            at,
            st,
            ct,
            dt,
            ft,
            ht,
            ut,
            gt,
            Qt,
            mt,
            bt,
            Ct,
            Lt,
            yt,
            Mt,
            At,
            vt,
            Et,
            _t,
            Ot,
            St,
            xt,
            Rt,
            It,
            Nt,
            wt,
            Pt,
            Ht,
            Dt,
            kt,
            fi,
            Ft,
            hi,
            pi,
            Ti,
            gi,
            Qi,
            mi,
            bi,
            on,
            Ci,
            yi,
            Mi,
            Ki,
            Ai,
            vi,
            Si,
            xi,
            Ri,
            Ii,
            Ni,
            wi,
            Pi,
            Hi,
            Di,
            Fi,
            ki,
            Yi,
            Gi,
            ji,
            zi,
            nn,
            rn,
            sn,
            cn,
            fn,
            hn,
        ];
        t.a = (e) => Object(n.a)(e, pn);
    },
];
