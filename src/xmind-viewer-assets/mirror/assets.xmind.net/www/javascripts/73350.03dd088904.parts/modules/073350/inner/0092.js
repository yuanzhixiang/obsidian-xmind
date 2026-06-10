export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return p;
        });
        var n = i(6),
            r = i(37),
            o = i(5),
            a = i(0),
            s = i(93),
            l = i(50),
            c = i(55);
        function d(e, t) {
            for (let i = 0, n = e.length; i < n; i++)
                if (
                    e[i].rangeStart === t.rangeStart &&
                    e[i].rangeEnd === t.rangeEnd
                )
                    return !0;
            return !1;
        }
        const f = (e) => {
            const t = (function (e) {
                    var t, i, n, r;
                    const o = e.getStyledTopicType(),
                        s = e.children(a.TOPIC_TYPE.ATTACHED).length + 1;
                    return (
                        ('centralTopic' === o
                            ? null !==
                                  (i =
                                      null === (t = e.ownerSheet()) ||
                                      void 0 === t
                                          ? void 0
                                          : t.getTranslatedText(
                                                'DEFAULT_MAIN_TOPIC_TITLE'
                                            )) && void 0 !== i
                                ? i
                                : ''
                            : null !==
                                    (r =
                                        null === (n = e.ownerSheet()) ||
                                        void 0 === n
                                            ? void 0
                                            : n.getTranslatedText(
                                                  'DEFAULT_SUBTOPIC_TITLE'
                                              )) && void 0 !== r
                              ? r
                              : '') +
                        ' ' +
                        s
                    );
                })(e),
                i = e.createEmptyTopic({ title: t });
            return e.addChildTopic(i);
        };
        const h = 'org.xmind.ui.spreadsheet';
        class p extends l.a {
            get componentType() {
                return a.MODEL_TYPE.TOPIC;
            }
            get modelEvents() {
                return {
                    labelsChanged: 'labelsChanged',
                    informationChanged: 'informationChanged',
                    changeCustomWidth: 'changeCustomWidth',
                    TITLE_CHANGED: 'titleChanged',
                    STRUCTURE_CLASS_CHANGED: 'structureClassChanged',
                    CUSTOM_WIDTH_CHANGED: 'customWidthChanged',
                    POSITION_CHANGED: 'positionChanged',
                    HREF_CHANGED: 'hrefChanged',
                    LABEL_CHANGED: 'labelChanged',
                    MARKER_CHANGED: 'markerChanged',
                    MARKER_ADDED: 'markerAdded',
                    MARKER_REMOVED: 'markerRemoved',
                    NOTES_ADDED: 'notesAdded',
                    NOTES_REMOVED: 'notesRemoved',
                    AUDIO_NOTES_ADDED: 'audioNotesAdded',
                    AUDIO_NOTES_REMOVED: 'audioNotesRemoved',
                    NUMBERING_CHANGED: 'numberingChanged',
                    BOUNDARY_ADDED: 'boundaryAdded',
                    BOUNDARY_REMOVED: 'boundaryRemoved',
                    SUMMARY_ADDED: 'summaryAdded',
                    SUMMARY_REMOVED: 'summaryRemoved',
                    IMAGE_ADDED: 'imageAdded',
                    IMAGE_REMOVED: 'imageRemoved',
                    WEB_VIDEO_CHANGED: 'webVideoChanged',
                    MATH_JAX_ADDED: 'mathJaxAdded',
                    MATH_JAX_REMOVED: 'mathJaxRemoved',
                    MATH_JAX_WIDTH_CHANGED: 'mathJaxWidthChanged',
                    MATH_JAX_ALIGN_CHANGED: 'mathJaxAlignChanged',
                    STYLE_CHANGED: 'styleChanged',
                };
            }
            initialize(e, t) {
                var i;
                ((this._imageModel = null),
                    (this._customWidth = null),
                    super.initialize(e, t),
                    this.get('id') ||
                        this.set(
                            'id',
                            null === (i = this.ownerSheet()) || void 0 === i
                                ? void 0
                                : i.generateComponentId()
                        ),
                    (this._imageModel = null));
            }
            parent(e) {
                return void 0 === e
                    ? super.parent()
                    : (e &&
                          e.componentType === a.MODEL_TYPE.SHEET &&
                          (this._type = a.TOPIC_TYPE.ROOT),
                      super.parent(e));
            }
            removeRelatedComponent() {
                ([
                    ...this.children(a.TOPIC_TYPE.ATTACHED),
                    ...this.children(a.TOPIC_TYPE.SUMMARY),
                    ...this.children(a.TOPIC_TYPE.CALLOUT),
                    ...this.children(a.TOPIC_TYPE.DETACHED),
                ].forEach((e) => e.removeRelatedComponent()),
                    this.boundaries().forEach((e) =>
                        this.removeRelationship(e.get('id'))
                    ),
                    this.getMarkersData().forEach((e) => {
                        const t = this.ownerSheet();
                        null == t ||
                            t.trigger(
                                t.modelEvents.topicRemoveMarker,
                                e.markerId
                            );
                    }),
                    this.removeRelationship(this.get('id')));
            }
            addRelatedComponent() {
                ([
                    ...this.children(a.TOPIC_TYPE.ATTACHED),
                    ...this.children(a.TOPIC_TYPE.SUMMARY),
                    ...this.children(a.TOPIC_TYPE.CALLOUT),
                    ...this.children(a.TOPIC_TYPE.DETACHED),
                ].forEach((e) => e.addRelatedComponent()),
                    this.getMarkersData().forEach((e) => {
                        const t = this.ownerSheet();
                        null == t ||
                            t.trigger(t.modelEvents.topicAddMarker, e.markerId);
                    }));
            }
            createEmptyTopic(e = {}) {
                return ((e.titleUnedited = !0), this.createTopic(e));
            }
            createTopic(e) {
                e = JSON.parse(JSON.stringify(e));
                return Object(r.a)(e, this.ownerSheet());
            }
            children(...e) {
                const t = Array.isArray(e[0]) ? e[0] : e;
                if (t.length > 1) {
                    let e = [];
                    return (
                        t.forEach((t) => (e = e.concat(this.children(t)))),
                        e
                    );
                }
                const i = t[0] || a.TOPIC_TYPE.ATTACHED;
                this._children || (this._children = {});
                let n = this._children[i];
                return (n || ((n = []), (this._children[i] = n)), n);
            }
            getDescendantList(...e) {
                const t = [],
                    i = this.children(e);
                return i.length
                    ? (t.push(...i),
                      i.forEach((i) => {
                          t.push(...i.getDescendantList(...e));
                      }),
                      t)
                    : t;
            }
            addChildTopic(e, t = {}, i) {
                var n;
                const r = e || this.createEmptyTopic({ title: '' }),
                    o =
                        null !== (n = t.type) && void 0 !== n
                            ? n
                            : a.TOPIC_TYPE.ATTACHED,
                    s = this.children(o),
                    l = void 0 === t.at || t.at < 0 ? s.length : t.at,
                    c = t.sourceIndex,
                    d = Object.assign(Object.assign({}, t), {
                        type: o,
                        at: l,
                        sourceIndex: c,
                    });
                return (
                    this._addTopic(r, d, i),
                    'number' == typeof c &&
                        (this.boundaries().forEach((e) => {
                            e.afterTopicAdd(r, c);
                        }),
                        this.summaries().forEach((e) => {
                            e.afterTopicAdd(r, c);
                        })),
                    r
                );
            }
            syncTopic(e, t) {
                const i = t.toJSON(),
                    n = this.get('children') || {};
                (n[e.type]
                    ? n[e.type].splice(e.at, 0, i)
                    : ((n[e.type] = [i]), this.set('children', n)),
                    this.topicChanged({
                        target: this,
                        attr: 'children',
                    }));
            }
            _addTopic(e, t, i) {
                var n, r, o, s;
                (this._modifyUnbalanceInfoOnAddTopic(t, i),
                    null === (n = this.ownerSheet()) ||
                        void 0 === n ||
                        n.trigger(a.EVENTS.BEFORE_ADD_TOPIC, {
                            parent: this,
                            at: t.at,
                            type: t.type || a.TOPIC_TYPE.ATTACHED,
                            topic: e,
                        }),
                    i || this.syncTopic(t, e),
                    (e._titleUnedited =
                        e.has('titleUnedited') && e.get('titleUnedited')));
                const l = this.children(t.type);
                (e.parent(this),
                    (e._type = t.type),
                    l.splice(t.at, 0, e),
                    (null === (r = this.getUndo()) || void 0 === r
                        ? void 0
                        : r.isExecuting()) && e.addRelatedComponent(),
                    e.type() === a.TOPIC_TYPE.SUMMARY && (t.noAnimation = !0),
                    this.trigger('addTopic', e, t, i),
                    null === (o = this.ownerSheet()) ||
                        void 0 === o ||
                        o.trigger(a.EVENTS.AFTER_ADD_TOPIC, {
                            parent: this,
                            at: t.at,
                            type: t.type || a.TOPIC_TYPE.ATTACHED,
                            topic: e,
                        }),
                    i ||
                        null === (s = this.getUndo()) ||
                        void 0 === s ||
                        s.add(
                            {
                                undo: () => {
                                    this._removeTopic(t);
                                },
                                redo: () => {
                                    this._addTopic(e, t, i);
                                },
                            },
                            'addTopic'
                        ));
            }
            boundaries() {
                this._boundaries || (this._boundaries = []);
                let e = this._boundaries;
                return (e.length || ((e = []), (this._boundaries = e)), e);
            }
            summaries() {
                this._summaries || (this._summaries = []);
                let e = this._summaries;
                return (e.length || ((e = []), (this._summaries = e)), e);
            }
            extensions() {
                if (!this._extensions) {
                    const e = (this.get('extensions') || []).filter(Boolean);
                    this._extensions = new s.a(e);
                }
                return this._extensions;
            }
            addExtension(e, t, i) {
                i || (this.extensions().add(e, t), this.syncExtension());
            }
            removeExtension(e) {
                (this.extensions().remove(e), this.syncExtension());
            }
            syncExtension() {
                const e = this.extensions().getInfo();
                (this.set('extensions', e),
                    this.topicChanged({
                        target: this,
                        attr: 'extensions',
                    }));
            }
            type() {
                return this._type || a.TOPIC_TYPE.ATTACHED;
            }
            setType(e) {
                this._type = e;
            }
            canCollapse() {
                return this.children().length > 0 && !this.isCentralTopic();
            }
            isCollapse() {
                return 'folded' === this.get('branch') && this.canCollapse();
            }
            extendBranch() {
                var e;
                this.isCollapse() &&
                    (this.unset('branch'),
                    this.topicChanged({
                        target: this,
                        attr: 'branch',
                    }),
                    this.trigger(
                        a.EVENTS.SE_BRANCH_COLLAPSE_TOGGLE,
                        this.isCollapse()
                    ),
                    null === (e = this.getUndo()) ||
                        void 0 === e ||
                        e.add({
                            undo: () => {
                                this.collapseBranch();
                            },
                            redo: () => {
                                this.extendBranch();
                            },
                        }));
            }
            collapseBranch() {
                var e;
                this.canCollapse() &&
                    !this.isCollapse() &&
                    (this.set('branch', 'folded'),
                    this.topicChanged({
                        target: this,
                        attr: 'branch',
                    }),
                    this.trigger(
                        a.EVENTS.SE_BRANCH_COLLAPSE_TOGGLE,
                        this.isCollapse()
                    ),
                    null === (e = this.getUndo()) ||
                        void 0 === e ||
                        e.add({
                            undo: () => {
                                this.extendBranch();
                            },
                            redo: () => {
                                this.collapseBranch();
                            },
                        }));
            }
            toggleCollapse() {
                this.isCollapse() ? this.extendBranch() : this.collapseBranch();
            }
            getStyledTopicType() {
                if (!this.hasAncestor()) return null;
                if (this.isRootTopic()) return a.CLASS_TYPE.CENTRAL_TOPIC;
                switch (this._type) {
                    case a.TOPIC_TYPE.SUMMARY:
                        return a.CLASS_TYPE.SUMMARY_TOPIC;
                    case a.TOPIC_TYPE.DETACHED:
                        return a.CLASS_TYPE.FLOATING_TOPIC;
                    case a.TOPIC_TYPE.CALLOUT:
                        return a.CLASS_TYPE.CALLOUT_TOPIC;
                    default:
                        return this.parent().isRootTopic()
                            ? a.CLASS_TYPE.MAIN_TOPIC
                            : a.CLASS_TYPE.SUB_TOPIC;
                }
            }
            getPosition() {
                const e = this.get('position');
                return e && null !== e.x && null !== e.y ? e : { x: 0, y: 0 };
            }
            isSummary() {
                return this._type === a.TOPIC_TYPE.SUMMARY;
            }
            isCallout() {
                return this._type === a.TOPIC_TYPE.CALLOUT;
            }
            isDetacthed() {
                return this._type === a.TOPIC_TYPE.DETACHED;
            }
            isDetached() {
                return this._type === a.TOPIC_TYPE.DETACHED;
            }
            isFree() {
                var e, t;
                return (
                    null !==
                        (t =
                            null === (e = this.ownerSheet()) || void 0 === e
                                ? void 0
                                : e.isFreePositionEnabled()) &&
                    void 0 !== t &&
                    t &&
                    'mainTopic' === this.getStyledTopicType() &&
                    -1 !==
                        (this.parent().getStructureClass() || '').search(
                            a.STRUCTURECLASS.MAP
                        )
                );
            }
            addBrotherTopic(e, t) {
                const { before: i = !1, title: n } = t;
                let { position: r } = t;
                if (this.isSummary()) return !1;
                if (this.isRootTopic()) return !1;
                const o = this.getIndexInParent(),
                    a = i ? o : o + 1,
                    s = this.type(),
                    l = e
                        ? this.createTopic(e)
                        : this.createEmptyTopic({ title: n });
                (t.isTitleEdited && l.unset('titleUnedited'),
                    (this.isCallout() || this.isDetached()) &&
                        ((r = (this.isDetached(), Object.assign({}, r))),
                        l.set('position', r)));
                return this.parent().addChildTopic(l, {
                    at: a,
                    type: s,
                    sourceIndex: o,
                    position: r,
                });
            }
            removeSelf(e = {}) {
                const t = this.getIndexInParent(),
                    i = this.type(),
                    n = this.parent();
                if (t < 0) return !1;
                ((e.at = t), (e.type = i));
                const r = this.getSideInParent(t);
                r && (e.side = r);
                const o = e;
                switch (i) {
                    case a.TOPIC_TYPE.ROOT:
                        return;
                    case a.TOPIC_TYPE.ATTACHED:
                    case a.TOPIC_TYPE.DETACHED:
                    case a.TOPIC_TYPE.CALLOUT:
                        return n.removeChildTopic(o);
                    case a.TOPIC_TYPE.SUMMARY:
                        return this._removeSelfAsSummaryFrom(n, o);
                }
            }
            _removeSelfAsSummaryFrom(e, t) {
                const i = this.get('id'),
                    n = e.getSummaryByTopicId(i);
                return n
                    ? ((t.summaryModel = n), e.removeSummary(t))
                    : e.removeChildTopic(t);
            }
            removeChildTopic(e) {
                const { at: t, type: i } = e,
                    n = this.children(i)[t];
                (this.boundaries()
                    .filter(
                        (e) => e.rangeStart === e.rangeEnd && e.rangeStart === t
                    )
                    .forEach((e) => e.beforeTopicRemove(n, t)),
                    this.summaries()
                        .filter(
                            (e) =>
                                e.rangeStart === e.rangeEnd &&
                                e.rangeStart === t
                        )
                        .forEach((e) => e.beforeTopicRemove(n, t)),
                    this.boundaries()
                        .slice()
                        .forEach((e) => {
                            e.beforeTopicRemove(n, t);
                        }),
                    this.summaries()
                        .slice()
                        .forEach((e) => {
                            e.beforeTopicRemove(n, t);
                        }),
                    this._modifyUnbalanceInfoOnRemoveTopic(e),
                    this._removeTopic(e));
            }
            _removeTopic(e) {
                var t, i, r;
                const { at: o, type: s } = e,
                    l = this.children(s),
                    c = l[o];
                (null === (t = this.ownerSheet()) ||
                    void 0 === t ||
                    t.trigger(a.EVENTS.BEFORE_REMOVE_TOPIC, {
                        parent: this,
                        at: o,
                        type: s,
                        topic: c,
                    }),
                    c.removeRelatedComponent(),
                    c.parent(null),
                    l.splice(o, 1));
                const d = this.get('children');
                (d[s].splice(o, 1),
                    d[s].length || delete d[s],
                    Object(n.isEmpty)(d) && this.unset('children'),
                    this.topicChanged({
                        target: this,
                        attr: 'children',
                    }),
                    null === (i = this.getUndo()) ||
                        void 0 === i ||
                        i.add(
                            {
                                undo: () => {
                                    this._addTopic(c, e);
                                },
                                redo: () => {
                                    this._removeTopic(e);
                                },
                            },
                            'removeTopic'
                        ),
                    this.trigger('removeTopic', c, e),
                    null === (r = this.ownerSheet()) ||
                        void 0 === r ||
                        r.trigger(a.EVENTS.AFTER_REMOVE_TOPIC, {
                            parent: this,
                            at: o,
                            type: s,
                            topic: c,
                        }));
            }
            moveChildTopic(e, t) {
                var i;
                if (void 0 === e || void 0 === t) return;
                if (e === t) return;
                const n = this.children(a.TOPIC_TYPE.ATTACHED);
                if (
                    !(
                        e >= 0 &&
                        e <= n.length - 1 &&
                        t >= 0 &&
                        t <= n.length - 1
                    )
                )
                    return;
                const r = n[e];
                (n.splice(e, 1),
                    n.splice(t, 0, r),
                    this.get('children')[a.TOPIC_TYPE.ATTACHED].splice(e, 1),
                    this.get('children')[a.TOPIC_TYPE.ATTACHED].splice(
                        t,
                        0,
                        r.toJSON()
                    ),
                    this.topicChanged({
                        target: this,
                        attr: 'children',
                    }),
                    this.trigger('moveChildTopic', e, t),
                    null === (i = this.getUndo()) ||
                        void 0 === i ||
                        i.add(
                            {
                                undo: () => {
                                    this.moveChildTopic(t, e);
                                },
                                redo: () => {
                                    this.moveChildTopic(e, t);
                                },
                            },
                            'moveChildTopic'
                        ));
            }
            _getComponent(e, t) {
                return e.cid ? e : this.ownerSheet().createComponent(t, e);
            }
            syncBoundaries() {
                const e = this.boundaries().map((e) => e.toJSON());
                (this.set('boundaries', e),
                    this.topicChanged({
                        target: this,
                        attr: 'boundaries',
                    }));
            }
            addBoundary(e, t) {
                var i;
                const n = this.boundaries(),
                    r = this._getComponent(e, 'boundary');
                return (
                    !d(n, r) &&
                    !!r.checkRange(this) &&
                    (r.parent(this),
                    n.push(r),
                    t || (r.set('titleUnedited', !0), this.syncBoundaries()),
                    (r._titleUnedited =
                        r.has('titleUnedited') && r.get('titleUnedited')),
                    this.trigger('addBoundary', r),
                    this.trigger(this.modelEvents.BOUNDARY_ADDED, r),
                    t ||
                        null === (i = this.getUndo()) ||
                        void 0 === i ||
                        i.add(
                            {
                                undo: () => {
                                    this.removeBoundary(r);
                                },
                                redo: () => {
                                    this.addBoundary(r, t);
                                },
                            },
                            'addBoundary'
                        ),
                    r)
                );
            }
            removeBoundary(e) {
                var t;
                const i = this.boundaries(),
                    n = i.indexOf(e);
                return (
                    n < 0 ||
                        (this.removeRelationship(e.get('id')),
                        this.get('boundaries').splice(n, 1),
                        this.topicChanged({
                            target: this,
                            attr: 'boundaries',
                        }),
                        i.splice(n, 1),
                        e.parent(null),
                        this.trigger('removeBoundary', e, this),
                        this.trigger(this.modelEvents.BOUNDARY_REMOVED, e),
                        null === (t = this.getUndo()) ||
                            void 0 === t ||
                            t.add(
                                {
                                    undo: () => {
                                        this.addBoundary(e);
                                    },
                                    redo: () => {
                                        this.removeBoundary(e);
                                    },
                                },
                                'removeBoundary'
                            )),
                    this
                );
            }
            syncSummaries() {
                const e = this.summaries().map((e) => e.toJSON());
                (this.set('summaries', e),
                    this.topicChanged({
                        target: this,
                        attr: 'summaries',
                    }));
            }
            addSummary(e, t, i, n = {}) {
                const r = this._addSummary(e, t, n);
                return (
                    !!r &&
                    (i &&
                        this.addChildTopic(i, {
                            type: a.TOPIC_TYPE.SUMMARY,
                            summaryModel: r,
                        }),
                    r)
                );
            }
            _addSummary(e, t, i = {}) {
                var n;
                const r = this.summaries(),
                    o = this._getComponent(e, 'summary');
                return (
                    !d(r, o) &&
                    !!o.checkRange(this) &&
                    (o.parent(this),
                    r.push(o),
                    t || this.syncSummaries(),
                    this.trigger('addSummary', o),
                    this.trigger(this.modelEvents.SUMMARY_ADDED, o),
                    t ||
                        null === (n = this.getUndo()) ||
                        void 0 === n ||
                        n.add(
                            {
                                undo: () => {
                                    this._removeSummary(i, o);
                                },
                                redo: () => {
                                    this._addSummary(e, t, i);
                                },
                            },
                            'addSummary'
                        ),
                    o)
                );
            }
            getSummaryByTopicId(e) {
                const t = this.summaries();
                for (let i = 0, n = t.length; i < n; i++) {
                    const n = t[i];
                    if (n.get('topicId') === e) return n;
                }
                return null;
            }
            removeSummary(e) {
                const { summaryModel: t } = e;
                (this.removeChildTopic(e), this._removeSummary(e, t));
            }
            _removeSummary(e = {}, t) {
                var i;
                const n = t.get('id');
                t.parent(null);
                const r = this.get('summaries');
                return (
                    this.set(
                        'summaries',
                        r.filter((e) => e.id !== n)
                    ),
                    (this._summaries = this._summaries.filter(
                        (e) => e.get('id') !== n
                    )),
                    this.topicChanged({
                        target: this,
                        attr: 'summaries',
                    }),
                    this.trigger('removeSummary', t),
                    this.trigger(this.modelEvents.SUMMARY_REMOVED, t),
                    null === (i = this.getUndo()) ||
                        void 0 === i ||
                        i.add(
                            {
                                undo: () => {
                                    this._addSummary(t, !1, e);
                                },
                                redo: () => {
                                    this._removeSummary(e, t);
                                },
                            },
                            'removeSummary'
                        ),
                    this
                );
            }
            initMarkersDataForLegend() {
                const e = this.getMarkersData(),
                    t = this.ownerSheet();
                e.forEach((e) => {
                    (this.trigger(this.modelEvents.MARKER_ADDED, e.markerId),
                        t.trigger(t.modelEvents.topicAddMarker, e.markerId));
                });
            }
            getMarkersData() {
                return this.get('markers')
                    ? JSON.parse(JSON.stringify(this.get('markers')))
                    : [];
            }
            changeMarker(e) {
                var t;
                const i = this.getMarkersData();
                if (i.some((t) => t.markerId === e)) return;
                const n = i.find((t) =>
                    c.markerModule.isSiblingMarker(e, t.markerId)
                );
                if (!n) return this.addMarker(e);
                const r = n.markerId;
                ((n.markerId = e),
                    this.set('markers', i),
                    this.topicChanged({
                        target: this,
                        attr: 'markers',
                    }),
                    this.trigger(this.modelEvents.MARKER_CHANGED, r, e),
                    null === (t = this.getUndo()) ||
                        void 0 === t ||
                        t.add(
                            {
                                undo: () => {
                                    this.changeMarker(r);
                                },
                                redo: () => {
                                    this.changeMarker(e);
                                },
                            },
                            this.modelEvents.MARKER_CHANGED
                        ));
                const o = this.ownerSheet();
                o.trigger(o.modelEvents.topicChangeMarker, r, e);
            }
            addMarker(e) {
                var t;
                const i = this.getMarkersData();
                if (i.some((t) => t.markerId === e)) return;
                if (
                    i.find((t) => c.markerModule.isSiblingMarker(t.markerId, e))
                )
                    return this.changeMarker(e);
                const n = { markerId: e };
                (i.push(n),
                    this.set('markers', i),
                    this.topicChanged({
                        target: this,
                        attr: 'markers',
                    }),
                    this.trigger(this.modelEvents.MARKER_ADDED, e),
                    null === (t = this.getUndo()) ||
                        void 0 === t ||
                        t.add(
                            {
                                undo: () => {
                                    this.removeMarker(e);
                                },
                                redo: () => {
                                    this.addMarker(e);
                                },
                            },
                            this.modelEvents.MARKER_ADDED
                        ));
                const r = this.ownerSheet();
                r.trigger(r.modelEvents.topicAddMarker, e);
            }
            removeMarker(e) {
                var t;
                const i = this.getMarkersData(),
                    n = i.findIndex((t) => t.markerId === e);
                if (-1 === n) return;
                (i.splice(n, 1),
                    this.set('markers', i),
                    this.topicChanged({
                        target: this,
                        attr: 'markers',
                    }),
                    this.trigger(this.modelEvents.MARKER_REMOVED, e),
                    null === (t = this.getUndo()) ||
                        void 0 === t ||
                        t.add(
                            {
                                undo: () => {
                                    this.addMarker(e);
                                },
                                redo: () => {
                                    this.removeMarker(e);
                                },
                            },
                            this.modelEvents.MARKER_REMOVED
                        ));
                const r = this.ownerSheet();
                r.trigger(r.modelEvents.topicRemoveMarker, e);
            }
            getTaskInfo() {
                return this.extensions().getExtension(
                    a.EXTENSION_PROVIDER.TASK_INFO
                );
            }
            addTaskInfo(e, t) {
                var i;
                return (
                    this.addExtension(a.EXTENSION_PROVIDER.TASK_INFO, e, t),
                    this.trigger(
                        this.modelEvents.informationChanged,
                        a.VIEW_TYPE.TASK
                    ),
                    t ||
                        null === (i = this.getUndo()) ||
                        void 0 === i ||
                        i.add({
                            undo: () => {
                                this.removeTaskInfo();
                            },
                            redo: () => {
                                this.addTaskInfo(e, t);
                            },
                        }),
                    this
                );
            }
            removeTaskInfo() {
                var e;
                const t = this.getTaskInfo();
                return (
                    this.removeExtension(a.EXTENSION_PROVIDER.TASK_INFO),
                    this.trigger(
                        this.modelEvents.informationChanged,
                        a.VIEW_TYPE.TASK
                    ),
                    null === (e = this.getUndo()) ||
                        void 0 === e ||
                        e.add({
                            undo: () => {
                                this.addTaskInfo(t);
                            },
                            redo: () => {
                                this.removeTaskInfo();
                            },
                        }),
                    this
                );
            }
            getAudioNotes() {
                return this.extensions().getExtension(
                    a.EXTENSION_PROVIDER.AUDIO_NOTES
                );
            }
            addAudioNotes(e, t) {
                return (
                    this.addExtension(a.EXTENSION_PROVIDER.AUDIO_NOTES, e, t),
                    this.trigger(
                        this.modelEvents.informationChanged,
                        a.VIEW_TYPE.AUDIO
                    ),
                    this.trigger(this.modelEvents.AUDIO_NOTES_ADDED, e),
                    this
                );
            }
            removeAudioNotes() {
                var e;
                const t = this.getAudioNotes();
                return (
                    this.removeExtension(a.EXTENSION_PROVIDER.AUDIO_NOTES),
                    this.trigger(
                        this.modelEvents.informationChanged,
                        a.VIEW_TYPE.AUDIO
                    ),
                    this.trigger(this.modelEvents.AUDIO_NOTES_REMOVED),
                    null === (e = this.getUndo()) ||
                        void 0 === e ||
                        e.add({
                            undo: () => {
                                this.addAudioNotes(t);
                            },
                            redo: () => {
                                this.removeAudioNotes();
                            },
                        }),
                    this
                );
            }
            getIOSDrawing() {
                return this.extensions().getExtension(
                    a.EXTENSION_PROVIDER.IOS_DRAWING
                );
            }
            updateIOSDrawing(e, t) {
                var i;
                const n = this.getIOSDrawing();
                (e
                    ? this.addExtension(a.EXTENSION_PROVIDER.IOS_DRAWING, e, t)
                    : this.removeExtension(a.EXTENSION_PROVIDER.IOS_DRAWING),
                    t ||
                        null === (i = this.getUndo()) ||
                        void 0 === i ||
                        i.add({
                            undo: () => {
                                this.updateIOSDrawing(n);
                            },
                            redo: () => {
                                this.updateIOSDrawing(e);
                            },
                        }));
            }
            getPitchInfo() {
                return this.extensions().getExtension(
                    a.EXTENSION_PROVIDER.PITCH
                );
            }
            updatePitchInfo(e, t) {
                var i;
                const n = this.getPitchInfo();
                (e
                    ? this.addExtension(a.EXTENSION_PROVIDER.PITCH, e, t)
                    : this.removeExtension(a.EXTENSION_PROVIDER.PITCH),
                    t ||
                        null === (i = this.getUndo()) ||
                        void 0 === i ||
                        i.add({
                            undo: () => {
                                this.updatePitchInfo(n);
                            },
                            redo: () => {
                                this.updatePitchInfo(e);
                            },
                            options: {
                                shouldBindSelectionRestore: !0,
                                model: this,
                            },
                        }));
            }
            getMathJaxInfo() {
                var e, t;
                const i = this.extensions().getExtension(
                    a.EXTENSION_PROVIDER.MATH_JAX
                );
                return (
                    null ===
                        (t =
                            null === (e = null == i ? void 0 : i.content) ||
                            void 0 === e
                                ? void 0
                                : e.content) || void 0 === t
                        ? void 0
                        : t.trim()
                )
                    ? i
                    : null;
            }
            getMathJaxText() {
                var e, t, i;
                const n = this.getMathJaxInfo();
                return null !==
                    (i =
                        null ===
                            (t =
                                null === (e = null == n ? void 0 : n.content) ||
                                void 0 === e
                                    ? void 0
                                    : e.content) || void 0 === t
                            ? void 0
                            : t.trim()) && void 0 !== i
                    ? i
                    : null;
            }
            updateMathJaxInfo(e, t) {
                var i, n, r, o;
                const s = this.getMathJaxInfo();
                ((
                    null ===
                        (n =
                            null === (i = null == e ? void 0 : e.content) ||
                            void 0 === i
                                ? void 0
                                : i.content) || void 0 === n
                        ? void 0
                        : n.trim()
                )
                    ? ((null === (r = null == s ? void 0 : s.content) ||
                      void 0 === r
                          ? void 0
                          : r.align) &&
                          !e.content.align &&
                          (e.content.align = s.content.align),
                      this.addExtension(a.EXTENSION_PROVIDER.MATH_JAX, e, t),
                      this._imageModel && this.removeImage(),
                      this.updateImageInfoWithoutSideEffect(null),
                      this.trigger(this.modelEvents.MATH_JAX_ADDED))
                    : (this.removeExtension(a.EXTENSION_PROVIDER.MATH_JAX),
                      this.updateImageInfoWithoutSideEffect(null),
                      this.trigger(this.modelEvents.MATH_JAX_REMOVED)),
                    t ||
                        null === (o = this.getUndo()) ||
                        void 0 === o ||
                        o.add({
                            undo: () => {
                                this.updateMathJaxInfo(s);
                            },
                            redo: () => {
                                this.updateMathJaxInfo(e);
                            },
                            options: {
                                shouldBindSelectionRestore: !0,
                                model: this,
                            },
                        }));
            }
            removeMathJaxInfo() {
                this.updateMathJaxInfo(null);
            }
            updateImageInfoWithoutSideEffect(e) {
                const t = this.get('image');
                (e &&
                    t &&
                    e.src === t.src &&
                    e.width === t.width &&
                    e.height === t.height) ||
                    ((e || t) &&
                        (e ? this.set('image', e) : this.unset('image'),
                        this.topicChanged({
                            target: this,
                            attr: 'image',
                        })));
            }
            updateMathJaxWidth(e) {
                var t;
                const i = this.getMathJaxInfo();
                if (!i || !i.content || i.content.width === e) return;
                const n = JSON.parse(JSON.stringify(i)),
                    r = n.content.width;
                (e ? (n.content.width = e) : delete n.content.width,
                    this.addExtension(a.EXTENSION_PROVIDER.MATH_JAX, n),
                    this.trigger(this.modelEvents.MATH_JAX_WIDTH_CHANGED, e),
                    null === (t = this.getUndo()) ||
                        void 0 === t ||
                        t.add({
                            undo: () => {
                                this.updateMathJaxWidth(r);
                            },
                            redo: () => {
                                this.updateMathJaxWidth(e);
                            },
                            options: {
                                shouldBindSelectionRestore: !0,
                                model: this,
                            },
                        }));
            }
            updateMathJaxAlign(e) {
                var t;
                const i = this.getMathJaxInfo();
                if (!i || !i.content || i.content.align === e) return;
                const n = JSON.parse(JSON.stringify(i)),
                    r = n.content.align;
                ((n.content.align = e),
                    this.addExtension(a.EXTENSION_PROVIDER.MATH_JAX, n),
                    this.trigger(this.modelEvents.MATH_JAX_ALIGN_CHANGED, e),
                    null === (t = this.getUndo()) ||
                        void 0 === t ||
                        t.add({
                            undo: () => {
                                this.updateMathJaxAlign(r);
                            },
                            redo: () => {
                                this.updateMathJaxAlign(e);
                            },
                            options: {
                                shouldBindSelectionRestore: !0,
                                model: this,
                            },
                        }));
            }
            getWebVideoOriginalUrl() {
                var e, t;
                const i =
                    null ===
                        (e = this.extensions().getExtension(
                            a.EXTENSION_PROVIDER.WEB_VIDEO
                        )) || void 0 === e
                        ? void 0
                        : e.content;
                return i && null !== (t = i.url) && void 0 !== t ? t : null;
            }
            updateWebVideoInfo(e) {
                var t;
                const i = this.getWebVideoOriginalUrl();
                e !== i &&
                    (e
                        ? this.addExtension(a.EXTENSION_PROVIDER.WEB_VIDEO, {
                              provider: a.EXTENSION_PROVIDER.WEB_VIDEO,
                              content: { url: e },
                          })
                        : this.removeExtension(a.EXTENSION_PROVIDER.WEB_VIDEO),
                    this.trigger(this.modelEvents.WEB_VIDEO_CHANGED),
                    null === (t = this.getUndo()) ||
                        void 0 === t ||
                        t.add({
                            undo: () => this.updateWebVideoInfo(i),
                            redo: () => this.updateWebVideoInfo(e),
                        }));
            }
            addMapUnbalanced(e, t) {
                return (
                    this.addExtension(
                        a.EXTENSION_PROVIDER.UNBALANCED_MAP,
                        e,
                        t
                    ),
                    this
                );
            }
            getImageData() {
                return this.get('image')
                    ? Object.assign({}, this.get('image'))
                    : null;
            }
            getImageModel() {
                return this._imageModel;
            }
            changeImage(e) {
                var t;
                return (
                    null === (t = this.getConfig()) ||
                        void 0 === t ||
                        t
                            .get(a.CONFIG.LOGGER)
                            .warn(Object(o.q)('changeImage', 'addImage')),
                    this.addImage(e)
                );
            }
            addImage(e, t = {}) {
                var i;
                (this.get('image') &&
                    this._imageModel &&
                    this._imageModel.parent() &&
                    this.removeImage(),
                    this.getMathJaxInfo() &&
                        !t.isInit &&
                        this.removeMathJaxInfo(),
                    t.webVideoUrl && this.updateWebVideoInfo(t.webVideoUrl));
                const n = this._getComponent(e, a.MODEL_TYPE.IMAGE);
                return (
                    (this._imageModel = n),
                    this._imageModel.parent(this),
                    this.set('image', n.toJSON()),
                    this.topicChanged({
                        target: this,
                        attr: 'image',
                    }),
                    this.trigger('addImage'),
                    this.trigger(this.modelEvents.IMAGE_ADDED, e),
                    t.isInit ||
                        null === (i = this.getUndo()) ||
                        void 0 === i ||
                        i.add(
                            {
                                undo: () => {
                                    this.removeImage();
                                },
                                redo: () => {
                                    this.addImage(n);
                                },
                                options: {
                                    shouldBindSelectionRestore: !0,
                                    model: this,
                                    webVideoUrl: t.webVideoUrl,
                                },
                            },
                            'addImage'
                        ),
                    this
                );
            }
            removeImage() {
                var e, t;
                (this.unset('image'),
                    this.updateWebVideoInfo(null),
                    this.topicChanged({
                        target: this,
                        attr: 'image',
                    }),
                    this.trigger('removeImage'),
                    this.trigger(this.modelEvents.IMAGE_REMOVED));
                const i = this._imageModel;
                return (
                    null === (e = this._imageModel) ||
                        void 0 === e ||
                        e.parent(null),
                    (this._imageModel = null),
                    null === (t = this.getUndo()) ||
                        void 0 === t ||
                        t.add(
                            {
                                undo: () => {
                                    this.addImage(i);
                                },
                                redo: () => {
                                    this.removeImage();
                                },
                                options: {
                                    shouldBindSelectionRestore: !0,
                                    model: this,
                                },
                            },
                            'removeImage'
                        ),
                    this
                );
            }
            resizeImage(e) {
                var t, i;
                (null === (t = this.getConfig()) ||
                    void 0 === t ||
                    t
                        .get(a.CONFIG.LOGGER)
                        .warn(
                            Object(o.q)(
                                'topicModel.resizeImage',
                                'imageModel.resize'
                            )
                        ),
                    null === (i = this.getImageModel()) ||
                        void 0 === i ||
                        i.resize(e));
            }
            alignImage(e) {
                var t, i;
                (null === (t = this.getConfig()) ||
                    void 0 === t ||
                    t
                        .get(a.CONFIG.LOGGER)
                        .warn(
                            Object(o.q)(
                                'topicModel.alignImage',
                                'imageModel.align'
                            )
                        ),
                    null === (i = this.getImageModel()) ||
                        void 0 === i ||
                        i.align(e));
            }
            getLabel() {
                return (this.get('labels') || []).join(',');
            }
            changeLabel(e = '') {
                var t;
                e = e.trim();
                const i = this.getLabel();
                if (e === i) return !1;
                (e ? this.set('labels', e.split(',')) : this.unset('labels'),
                    this.trigger(this.modelEvents.labelsChanged),
                    this.trigger(this.modelEvents.LABEL_CHANGED),
                    this.topicChanged({
                        target: this,
                        attr: 'labels',
                    }),
                    null === (t = this.getUndo()) ||
                        void 0 === t ||
                        t.add(
                            {
                                undo: () => {
                                    this.changeLabel(i);
                                },
                                redo: () => {
                                    this.changeLabel(e);
                                },
                            },
                            this.modelEvents.labelsChanged
                        ));
            }
            getNotes() {
                return this.get('notes') || null;
            }
            changeNote(e, t = {}) {
                var i;
                'string' == typeof e &&
                    '' !== e &&
                    (e = { plain: { content: e } });
                const r = this.getNotes();
                if (Object(n.isEqual)(r, e)) return !1;
                (e
                    ? (this.set('notes', e),
                      this.trigger(this.modelEvents.NOTES_ADDED, e))
                    : (this.unset('notes'),
                      this.trigger(this.modelEvents.NOTES_REMOVED)),
                    this.trigger(
                        this.modelEvents.informationChanged,
                        a.VIEW_TYPE.NOTE
                    ),
                    this.topicChanged({
                        target: this,
                        attr: 'notes',
                    }),
                    null === (i = this.getUndo()) ||
                        void 0 === i ||
                        i.add(
                            {
                                undo: () => {
                                    this.changeNote(r, t);
                                },
                                redo: () => {
                                    this.changeNote(e, t);
                                },
                            },
                            this.modelEvents.informationChanged
                        ));
            }
            getHref() {
                return this.get('href') || null;
            }
            changeHref(e, t = {}) {
                var i;
                const n = this.getHref();
                if (e === n) return !1;
                ((e = (e || '').trim())
                    ? this.set('href', e)
                    : this.unset('href'),
                    this.trigger(
                        this.modelEvents.informationChanged,
                        a.VIEW_TYPE.HREF
                    ),
                    this.trigger(this.modelEvents.HREF_CHANGED, e),
                    this.topicChanged({
                        target: this,
                        attr: 'href',
                    }),
                    null === (i = this.getUndo()) ||
                        void 0 === i ||
                        i.add(
                            {
                                undo: () => {
                                    this.changeHref(n, t);
                                },
                                redo: () => {
                                    this.changeHref(e, t);
                                },
                            },
                            this.modelEvents.informationChanged
                        ));
            }
            getComments() {
                return this.get('comments') || null;
            }
            changeComments(e) {
                var t;
                const i = this.getComments();
                (e ? this.set('comments', e) : this.unset('comments'),
                    this.topicChanged({
                        target: this,
                        attr: 'comments',
                    }),
                    this.trigger(
                        this.modelEvents.informationChanged,
                        a.VIEW_TYPE.COMMENT
                    ),
                    null === (t = this.getUndo()) ||
                        void 0 === t ||
                        t.add({
                            undo: () => this.changeComments(i),
                            redo: () => this.changeComments(e),
                        }));
            }
            addNumbering(e) {
                return (
                    this.set('numbering', e),
                    this.trigger('addNumbering'),
                    this
                );
            }
            changeNumbering(e, t) {
                let i = this.get('numbering');
                return (
                    Object(n.isEmpty)(i)
                        ? ((i = {
                              numberFormat: '',
                              numberSeparator: '',
                              prefix: '',
                              suffix: '',
                          }),
                          (i[e] = t),
                          this.addNumbering(i))
                        : ((i[e] = t),
                          this.set('numbering', i),
                          this.trigger('changeNumbering'),
                          this.trigger(this.modelEvents.NUMBERING_CHANGED)),
                    this.topicChanged({
                        target: this,
                        attr: 'numbering',
                    }),
                    this
                );
            }
            _changeStructure(e) {
                var t;
                const i = this.getStructureClass();
                (null === e
                    ? this.unset('structureClass')
                    : this.set('structureClass', e),
                    this.trigger('changeStructureClass', e),
                    this.trigger(this.modelEvents.STRUCTURE_CLASS_CHANGED, e),
                    this.topicChanged({
                        target: this,
                        attr: 'structureClass',
                        oldValue: i,
                    }),
                    null === (t = this.getUndo()) ||
                        void 0 === t ||
                        t.add({
                            undo: () => {
                                this._changeStructure(i);
                            },
                            redo: () => {
                                this._changeStructure(e);
                            },
                        }));
            }
            changeStructure(e) {
                const t = this.getStructureClass();
                if (t !== e) {
                    if (null !== e) {
                        0 === this.children(a.TOPIC_TYPE.ATTACHED).length &&
                            ((function (e) {
                                return a.MATRIX_GROUP_LIST.includes(e);
                            })(e) &&
                                (function (e) {
                                    var t;
                                    const i = f(e);
                                    f(e);
                                    const n = f(i),
                                        r = f(i),
                                        o =
                                            null === (t = e.ownerSheet()) ||
                                            void 0 === t
                                                ? void 0
                                                : t.getTranslatedText(
                                                      'LABEL_TITLE'
                                                  );
                                    (n.changeLabel(`${o} 1`),
                                        r.changeLabel(`${o} 2`));
                                })(this),
                            (function (e) {
                                return a.TREE_TABLE_GROUP_LIST.includes(e);
                            })(e) && (f((i = this)), f(i)));
                        const n = a.SPECIAL_STRUCTURE_LIST.includes(t),
                            r = a.SPECIAL_STRUCTURE_LIST.includes(e);
                        (!n &&
                            r &&
                            this._saveConnectionLineTypeInNormalStructure(),
                            n &&
                                !r &&
                                this._restoreConnectionLineTypeInNormalStructure(),
                            this.isRootTopic() &&
                                this.parent().removeSkeletonStructureStyle());
                    }
                    var i;
                    this._changeStructure(e);
                }
            }
            _saveConnectionLineTypeInNormalStructure() {
                const e = this.getStyleValue(a.STYLE_KEYS.LINE_CLASS);
                if (!e) return;
                const t = {
                    provider:
                        a.EXTENSION_PROVIDER.LINE_CLASS_IN_NORMAIL_STRUCTURE,
                    content: e,
                };
                this.addExtension(
                    a.EXTENSION_PROVIDER.LINE_CLASS_IN_NORMAIL_STRUCTURE,
                    t
                );
            }
            _restoreConnectionLineTypeInNormalStructure() {
                var e;
                const t =
                    null ===
                        (e = this.extensions().getExtension(
                            a.EXTENSION_PROVIDER.LINE_CLASS_IN_NORMAIL_STRUCTURE
                        )) || void 0 === e
                        ? void 0
                        : e.content;
                t &&
                    (this.changeStyle(a.STYLE_KEYS.LINE_CLASS, t),
                    this.removeExtension(
                        a.EXTENSION_PROVIDER.LINE_CLASS_IN_NORMAIL_STRUCTURE
                    ));
            }
            getIndexById(e, t) {
                return e.findIndex((e) => e.id === t);
            }
            getChildrenIndexById(e, t = a.TOPIC_TYPE.ATTACHED) {
                return this.children(t).findIndex((t) => t.id === e);
            }
            getIndexInParent() {
                const e = this.type();
                if (e === a.TOPIC_TYPE.ROOT) return 0;
                const t = this.parent();
                if (!t) return 0;
                return t.children([e]).indexOf(this);
            }
            getSideInParent(e) {
                const t = this.parent();
                if (!t) return !1;
                if (
                    t.getStructureClass() !== a.STRUCTURECLASS.MAPUNBALANCED ||
                    this.type() !== a.TOPIC_TYPE.ATTACHED
                )
                    return !1;
                if (this.type() === a.TOPIC_TYPE.ROOT) return !1;
                const i = t.unBalancedInfo();
                if (!i) return !1;
                return e < parseInt(i.content) ? 'right' : 'left';
            }
            removeRelationship(e) {
                const t = this.ownerSheet();
                t &&
                    t.relationships().length &&
                    t
                        .relationships()
                        .filter(
                            (t) =>
                                t.get('end1Id') === e || t.get('end2Id') === e
                        )
                        .forEach((e) => t.removeRelationship(e));
            }
            styleChanged() {
                const e = this.style();
                (e ? this.set('style', e.toJSON()) : this.unset('style'),
                    this.trigger(this.modelEvents.STYLE_CHANGED),
                    this.topicChanged({
                        target: this,
                        attr: 'style',
                    }));
            }
            topicChanged({ target: e, attr: t, oldValue: i }) {
                const n = this.parent();
                if (n) {
                    if (n.componentType === a.MODEL_TYPE.SHEET)
                        n.sheetChanged(n.rootTopic(), {
                            target: e,
                            attr: t,
                            oldValue: i,
                        });
                    else {
                        const r = this.type(),
                            o = n.children(r).indexOf(this);
                        (-1 !== o && (n.get('children')[r][o] = this.toJSON()),
                            n.topicChanged({
                                target: e,
                                attr: t,
                                oldValue: i,
                            }));
                    }
                    return this;
                }
            }
            changeTitle(e, t = {}) {
                var i;
                t = Object.assign({}, { isSilent: !1, titleUnedited: !1 }, t);
                const n = this.get('title');
                if (e === n) return !1;
                if ('string' != typeof e) return !1;
                this.set('title', e);
                const r = this._titleUnedited;
                if (
                    (!t.titleUnedited && this.has('titleUnedited')
                        ? (this.unset('titleUnedited'),
                          (this._titleUnedited = !1))
                        : !0 === t.titleUnedited &&
                          (this.set('titleUnedited', !0),
                          (this._titleUnedited = !0)),
                    this.trigger(this.modelEvents.TITLE_CHANGED, e),
                    this.topicChanged({
                        target: this,
                        attr: 'titleUnedited',
                    }),
                    !t.isSilent)
                ) {
                    const o = {
                        undo: () => {
                            this.changeTitle(n, {
                                titleUnedited: r,
                            });
                        },
                        redo: () => {
                            this.changeTitle(e, t);
                        },
                        options: {
                            shouldBindSelectionRestore: !0,
                            model: this,
                        },
                    };
                    null === (i = this.getUndo()) ||
                        void 0 === i ||
                        i.add(o, 'changeTitle');
                }
            }
            getTitle() {
                return this.get('title') || '';
            }
            changePosition(e) {
                var t;
                const i = this.get('position');
                (this.set('position', e),
                    this.trigger(
                        this.modelEvents.POSITION_CHANGED,
                        Object.assign({}, e)
                    ),
                    this.topicChanged({
                        target: this,
                        attr: 'position',
                    }),
                    null === (t = this.getUndo()) ||
                        void 0 === t ||
                        t.add(
                            {
                                undo: () => {
                                    this.changePosition(i);
                                },
                                redo: () => {
                                    this.changePosition(e);
                                },
                            },
                            'changePosition'
                        ));
            }
            clearPosition() {
                var e;
                const t = this.get('position');
                t &&
                    (this.unset('position'),
                    this.topicChanged({
                        target: this,
                        attr: 'position',
                    }),
                    null === (e = this.getUndo()) ||
                        void 0 === e ||
                        e.add(
                            {
                                undo: () => {
                                    this.changePosition(t);
                                },
                                redo: () => {
                                    this.clearPosition();
                                },
                            },
                            'clearPosition'
                        ));
            }
            removePendantItem(e) {
                const t = {
                    [a.VIEW_TYPE.HREF]: 'changeHref',
                    [a.VIEW_TYPE.LABEL]: 'changeLabel',
                    [a.VIEW_TYPE.NOTE]: 'changeNote',
                    [a.VIEW_TYPE.IMAGE]: 'removeImage',
                    [a.VIEW_TYPE.TASK]: 'removeTaskInfo',
                    [a.VIEW_TYPE.AUDIO]: 'removeAudioNotes',
                    [a.VIEW_TYPE.MATH_JAX]: 'removeMathJaxInfo',
                };
                this[t[e]] && this[t[e]]();
            }
            isCentralTopic() {
                return 'root' === this.type();
            }
            getMatrixLabelInfos() {
                const e = this.extensions().getExtension(
                    a.EXTENSION_PROVIDER.SPREAD_SHEET
                );
                if (!e) return [];
                const { content: t } = e;
                if (!t) return [];
                for (let e = 0; e < t.length; e++) {
                    const i = t[e];
                    if ('columns' === i.name) {
                        return (i.content || []).map((e) => e.content);
                    }
                }
                return [];
            }
            setMatrixLabelInfos(e) {
                var t;
                const i = [...this.getMatrixLabelInfos()],
                    n = e.map((e) => ({
                        name: 'column',
                        content: e,
                    })),
                    r = {
                        provider: h,
                        content: [{ name: 'columns', content: n }],
                    };
                (this.addExtension(a.EXTENSION_PROVIDER.SPREAD_SHEET, r),
                    this.trigger('matrixLabelInfoUpdated', e),
                    null === (t = this.getUndo()) ||
                        void 0 === t ||
                        t.add({
                            undo: () => this.setMatrixLabelInfos(i),
                            redo: () => this.setMatrixLabelInfos(e),
                        }));
            }
            unBalancedInfo() {
                const e = this.extensions().getExtension(
                    a.EXTENSION_PROVIDER.UNBALANCED_MAP
                );
                if (!e) return !1;
                const { content: t } = e;
                if (t && 0 !== t.length) {
                    const e = t[0];
                    if (e.content && e.name) return e;
                }
                return !1;
            }
            unBalancedInfoTotal() {
                return this.extensions().getExtension(
                    a.EXTENSION_PROVIDER.UNBALANCED_MAP
                );
            }
            setUnBalancedInfoContent(e, t) {
                var i;
                let n = this.unBalancedInfoTotal();
                n ||
                    (n = {
                        content: [
                            {
                                content: e + '',
                                name: 'right-number',
                            },
                        ],
                        provider: 'org.xmind.ui.map.unbalanced',
                    });
                const r = n.content;
                if (r[0]) {
                    const o = r[0].content;
                    ((r[0].content = e + ''),
                        this.addExtension(
                            a.EXTENSION_PROVIDER.UNBALANCED_MAP,
                            n
                        ),
                        this.trigger('unbalancedInfoUpdated', o, e),
                        !t &&
                            (null === (i = this.getUndo()) ||
                                void 0 === i ||
                                i.add(
                                    {
                                        undo: () => {
                                            this.setUnBalancedInfoContent(o);
                                        },
                                        redo: () => {
                                            this.setUnBalancedInfoContent(e);
                                        },
                                    },
                                    'setUnbalancedInfoContent'
                                )));
                }
            }
            _modifyUnbalanceInfoOnRemoveTopic(e) {
                if (
                    this.getStructureClass() ===
                        a.STRUCTURECLASS.MAPUNBALANCED &&
                    e.type === a.TOPIC_TYPE.ATTACHED
                ) {
                    const t = this.unBalancedInfo();
                    if (!t) return;
                    const i = parseInt(t.content);
                    e.at < i &&
                        this.setUnBalancedInfoContent(Math.max(0, i - 1));
                }
            }
            _modifyUnbalanceInfoOnAddTopic(e, t) {
                if (
                    !t &&
                    this.getStructureClass() ===
                        a.STRUCTURECLASS.MAPUNBALANCED &&
                    e.type === a.TOPIC_TYPE.ATTACHED
                ) {
                    const i = this.unBalancedInfo();
                    if (!i) return;
                    let n,
                        r = parseInt(i.content);
                    r = r || 0;
                    const o = this._children.attached.length - 1;
                    ((n =
                        'right' === e.side ||
                        ('left' !== e.side &&
                            (void 0 !== e.sourceIndex
                                ? r === o
                                    ? e.sourceIndex !== r - 1 || r < 3
                                    : e.sourceIndex < r
                                : r === o && r < 3))),
                        n && this.setUnBalancedInfoContent(r + 1, t));
                }
            }
            isRootTopic() {
                return !(
                    !this.parent() ||
                    this.parent().componentType !== a.MODEL_TYPE.SHEET
                );
            }
            traverseTopic(e, t) {
                if (t)
                    return (
                        !(-1 === e.indexOf(this.type()) || !t(this)) ||
                        void this.children(e).some((i) => i.traverseTopic(e, t))
                    );
            }
            getStructureClass() {
                let e = this.get('structureClass');
                return (e || (e = this.getStyleValue('structureClass')), e);
            }
            getStructurePolicy() {
                return (
                    this.getStructureClass() ||
                    (this.parent() &&
                    this.parent().componentType === a.MODEL_TYPE.TOPIC
                        ? this.parent().getStructurePolicy()
                        : '')
                );
            }
            getLayer() {
                if (this.isRootTopic()) return 1;
                {
                    const e = this.parent();
                    return e && e.componentType === a.MODEL_TYPE.TOPIC
                        ? e.getLayer() + 1
                        : 3;
                }
            }
            customWidth(e) {
                var t;
                if (
                    (null === this._customWidth &&
                        (this._customWidth = this.get('customWidth') || 0),
                    void 0 === e)
                )
                    return this._customWidth;
                if ('number' != typeof e || e === this._customWidth) return;
                if (!this._customWidth && !e) return;
                let i = e;
                i > a.TOPIC_MAX_CUSTOM_WIDTH
                    ? (i = a.TOPIC_MAX_CUSTOM_WIDTH)
                    : i < 0 && (i = 0);
                const n = this._customWidth;
                ((this._customWidth = i),
                    this.set('customWidth', this._customWidth),
                    this.trigger(this.modelEvents.changeCustomWidth, i),
                    this.trigger(this.modelEvents.CUSTOM_WIDTH_CHANGED, i),
                    this.topicChanged({
                        target: this,
                        attr: 'customWidth',
                    }),
                    null === (t = this.getUndo()) ||
                        void 0 === t ||
                        t.add(
                            {
                                undo: () => {
                                    this.customWidth(n);
                                },
                                redo: () => {
                                    this.customWidth(e);
                                },
                            },
                            'changeCustomWidth'
                        ));
            }
            isTitleUnedited() {
                return !(
                    !this.has('titleUnedited') ||
                    !0 !== this.get('titleUnedited')
                );
            }
        }
    },
];
