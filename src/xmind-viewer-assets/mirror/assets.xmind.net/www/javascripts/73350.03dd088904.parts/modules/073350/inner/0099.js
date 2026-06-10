export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return x;
        });
        var n = i(6),
            r = i(0),
            o = i(5),
            a = i(72),
            s = i(37),
            l = i(70),
            c = i(16),
            d = i(1),
            f = i(93),
            h = i(50);
        class p extends h.a {
            get componentType() {
                return r.MODEL_TYPE.BOUNDARY;
            }
            initialize(e, t) {
                ((this._titleUnedited = !1),
                    super.initialize(e, t),
                    this.updateRange(),
                    this.on('change:range', this.updateRange));
            }
            beforeTopicRemove(e, t) {
                if (e.type() === r.TOPIC_TYPE.ATTACHED) {
                    const e = !0;
                    this.changeBoundaryRange(t, e);
                }
            }
            afterTopicAdd(e, t) {
                if (e.type() === r.TOPIC_TYPE.ATTACHED) {
                    const e = !1;
                    this.changeBoundaryRange(t, e);
                }
            }
            getRange() {
                return this.get('range');
            }
            setRange(e) {
                var t;
                const i = this.getRange();
                if (e === i) return !1;
                (this.set('range', e),
                    null === (t = this.getUndo()) ||
                        void 0 === t ||
                        t.add(
                            {
                                undo: () => {
                                    this.setRange(i);
                                },
                                redo: () => {
                                    this.setRange(e);
                                },
                            },
                            'setRange boundary'
                        ));
            }
            updateRange(e) {
                const t = this.getRange();
                if (!t)
                    return ((this.rangeStart = -1), void (this.rangeEnd = -1));
                if (t === r.MASTER_RANGE)
                    ((this.rangeStart = -1), (this.rangeEnd = -1));
                else {
                    const e = t.match(/\d+/g);
                    e
                        ? ((this.rangeStart = parseInt(e[0], 10)),
                          (this.rangeEnd = parseInt(e[1], 10)),
                          this.checkRange())
                        : ((this.rangeStart = -1), (this.rangeEnd = -1));
                }
                e && this.parent() && this.boundaryChanged();
            }
            checkRange(e) {
                var t;
                if (!(e = e || this.parent())) return !1;
                if (this.getRange() === r.MASTER_RANGE) return !0;
                const i = e.children();
                return (
                    !!(
                        this.rangeStart <= this.rangeEnd &&
                        i[this.rangeStart] &&
                        i[this.rangeEnd]
                    ) ||
                    (null === (t = this.getConfig()) ||
                        void 0 === t ||
                        t
                            .get(r.CONFIG.LOGGER)
                            .warn('check boundary range fail', this.get('id')),
                    i.length <= this.rangeStart
                        ? ((this.rangeStart = -1), (this.rangeEnd = -1), !1)
                        : i.length <= this.rangeEnd &&
                          ((this.rangeEnd = i.length - 1), !0))
                );
            }
            removeSelf() {
                this.parent() && this.parent().removeBoundary(this);
            }
            styleChanged() {
                const e = this.style();
                (e ? this.set('style', e.toJSON()) : this.unset('style'),
                    this.boundaryChanged());
            }
            boundaryChanged(e) {
                var t;
                const i = this.parent();
                if (!e) {
                    (e =
                        null !== (t = i.get('boundaries')) && void 0 !== t
                            ? t
                            : [])[i.boundaries().indexOf(this)] = this.toJSON();
                }
                (i.set('boundaries', e),
                    i.topicChanged({
                        target: i,
                        attr: 'boundaries',
                    }));
            }
            changeBoundaryRange(e, t) {
                if (this.getRange() === r.MASTER_RANGE) return !1;
                let i, n, o;
                if (
                    ((i = this.rangeStart),
                    (n = this.rangeEnd),
                    e >= i && e <= n)
                )
                    if (t) {
                        if (i === n) return this.removeSelf();
                        n--;
                    } else n++;
                else e < i && (t ? (i--, n--) : (i++, n++));
                (i === this.rangeStart && n === this.rangeEnd) ||
                    ((o = '(' + i + ',' + n + ')'), this.setRange(o));
            }
            changeTitle(e, t = {}) {
                var i;
                t = Object.assign({}, { titleUnedited: !1 }, t);
                const n = this.get('title');
                if (n === e) return !1;
                this.set('title', e);
                const r = this._titleUnedited;
                (!t.titleUnedited && this.has('titleUnedited')
                    ? (this.unset('titleUnedited'), (this._titleUnedited = !1))
                    : !0 === t.titleUnedited &&
                      (this.set('titleUnedited', !0),
                      (this._titleUnedited = !0)),
                    this.boundaryChanged(),
                    null === (i = this.getUndo()) ||
                        void 0 === i ||
                        i.add({
                            undo: () => {
                                this.changeTitle(n, {
                                    titleUnedited: r,
                                });
                            },
                            redo: () => {
                                this.changeTitle(e);
                            },
                        }));
            }
            isTitleUnedited() {
                return !(
                    !this.has('titleUnedited') ||
                    !0 !== this.get('titleUnedited')
                );
            }
        }
        var T = i(38);
        class u extends T.a {
            get componentType() {
                return r.COMPONENT_TYPE.HREF;
            }
        }
        class g extends T.a {
            get componentType() {
                return r.COMPONENT_TYPE.LABEL;
            }
        }
        class Q extends T.a {
            get componentType() {
                return r.MODEL_TYPE.LEGEND;
            }
            get modelEvents() {
                return {
                    legendMarkerDescChanged: 'legendMarkerDescChanged',
                    liveMarkerListChanged: 'liveMarkerListChanged',
                };
            }
            initialize(e, t) {
                ((this.liveMarkerList = []),
                    super.initialize(e, t),
                    t && t.parentModel && this.parent(t.parentModel),
                    (this.initAttr = e),
                    this.initEventsListener());
            }
            initEventsListener() {
                const e = this.parent(),
                    t = e.modelEvents;
                (this.listenTo(e, t.topicAddMarker, this.onTopicAddMarker),
                    this.listenTo(
                        e,
                        t.topicChangeMarker,
                        this.onTopicChangeMarker
                    ),
                    this.listenTo(
                        e,
                        t.topicRemoveMarker,
                        this.onTopicRemoveMarker
                    ),
                    this.on('change', this.onChange));
            }
            onChange() {
                var e, t;
                (null === (e = this.parent()) ||
                    void 0 === e ||
                    e.set('legend', this.toJSON()),
                    null === (t = this.ownerSheet()) ||
                        void 0 === t ||
                        t.trigger(r.EVENTS.AFTER_SHEET_CONTENT_CHANGE, {
                            target: this.ownerSheet(),
                            attr: 'legend',
                        }));
            }
            onTopicAddMarker(e) {
                (this.liveMarkerList.push(e),
                    this.trigger(this.modelEvents.liveMarkerListChanged));
            }
            onTopicChangeMarker(e, t) {
                (this.liveMarkerList.splice(
                    this.liveMarkerList.indexOf(e),
                    1,
                    t
                ),
                    this.trigger(this.modelEvents.liveMarkerListChanged));
            }
            onTopicRemoveMarker(e) {
                (this.liveMarkerList.splice(this.liveMarkerList.indexOf(e), 1),
                    this.trigger(this.modelEvents.liveMarkerListChanged));
            }
            setLegendDisplay(e) {
                var t;
                (this.set('visibility', e ? 'visible' : 'hidden'),
                    null === (t = this.getUndo()) ||
                        void 0 === t ||
                        t.add({
                            undo: () => {
                                this.setLegendDisplay(!e);
                            },
                            redo: () => {
                                this.setLegendDisplay(e);
                            },
                        }));
            }
            setLegendPosition(e) {
                var t;
                const i = this.get('position');
                (e ? this.set('position', e) : this.unset('position'),
                    null === (t = this.getUndo()) ||
                        void 0 === t ||
                        t.add({
                            undo: () => {
                                this.setLegendPosition(i);
                            },
                            redo: () => {
                                this.setLegendPosition(e);
                            },
                        }));
            }
            setUserMarkerDescription(e, t) {
                var i;
                let n = JSON.parse(JSON.stringify(this.get('markers') || {}));
                Array.isArray(n) && (n = {});
                const r = (n[e] || {}).name;
                (t ? (n[e] = { name: t }) : delete n[e],
                    this.set('markers', n),
                    this.trigger(this.modelEvents.legendMarkerDescChanged),
                    null === (i = this.getUndo()) ||
                        void 0 === i ||
                        i.add({
                            undo: () => {
                                this.setUserMarkerDescription(e, r);
                            },
                            redo: () => {
                                this.setUserMarkerDescription(e, t);
                            },
                        }));
            }
        }
        class m extends T.a {
            get componentType() {
                return r.MODEL_TYPE.MARKER;
            }
        }
        class b extends T.a {
            get componentType() {
                return r.COMPONENT_TYPE.NOTE;
            }
        }
        class C extends T.a {
            get componentType() {
                return r.COMPONENT_TYPE.NUMBERING;
            }
        }
        class L extends h.a {
            get componentType() {
                return r.COMPONENT_TYPE.RELATIONSHIP;
            }
            initialize(e, t) {
                ((this._titleUnedited = !1), super.initialize(e, t));
            }
            changeEndPoint(e) {
                var t;
                let i = !1;
                const n = {};
                if (
                    (e.end1Id &&
                        ((n.end1Id = this.get('end1Id')),
                        n.end1Id !== e.end1Id &&
                            (this.set('end1Id', e.end1Id), (i = !0))),
                    e.end2Id &&
                        ((n.end2Id = this.get('end2Id')),
                        n.end2Id !== e.end2Id &&
                            (this.set('end2Id', e.end2Id), (i = !0))),
                    i)
                ) {
                    const i = this.parent(),
                        o = i.get('relationships');
                    ((o[i.relationships().indexOf(this)] = this.toJSON()),
                        i.set('relationships', o),
                        i.trigger(r.EVENTS.AFTER_SHEET_CONTENT_CHANGE, {
                            target: i,
                            attr: 'relationships',
                        }),
                        this.trigger('change:endPoint'),
                        null === (t = this.getUndo()) ||
                            void 0 === t ||
                            t.add(
                                {
                                    undo: () => {
                                        this.changeEndPoint(n);
                                    },
                                    redo: () => {
                                        this.changeEndPoint(e);
                                    },
                                },
                                'changeEndPoint'
                            ));
                }
            }
            removeSelf() {
                const e = this.parent();
                e && e.removeRelationship(this);
            }
            changeControlPosition(e) {
                var t;
                const i = (e) => 0 === Object.keys(e).length,
                    n = this.parent(),
                    o = n.get('relationships'),
                    a = n.relationships().indexOf(this);
                let s,
                    l = this.get('controlPoints');
                ((s = void 0 === l || i(l) ? void 0 : Object.assign({}, l)),
                    (l =
                        void 0 === e || i(e)
                            ? void 0
                            : Object.assign(void 0 === l ? {} : l, e)),
                    this.set('controlPoints', l),
                    (o[a] = this.toJSON()),
                    n.set('relationships', o),
                    n.trigger(r.EVENTS.AFTER_SHEET_CONTENT_CHANGE, {
                        target: n,
                        attr: 'relationships',
                    }),
                    null === (t = this.getUndo()) ||
                        void 0 === t ||
                        t.add(
                            {
                                undo: () => {
                                    this.changeControlPosition(s);
                                },
                                redo: () => {
                                    this.changeControlPosition(e);
                                },
                            },
                            'changeControlPosition'
                        ),
                    this.trigger('refresh', !0));
            }
            hasFullLineEndPositionData() {
                const e = this.get('lineEndPoints');
                return (
                    void 0 !== e &&
                    ((t = e), !(0 === Object.keys(t).length)) &&
                    e[0] &&
                    e[1]
                );
                var t;
            }
            changeLineEndPosition(e) {
                var t;
                const i = (e) => 0 === Object.keys(e).length,
                    n = this.parent(),
                    o = n.get('relationships'),
                    a = n.relationships().indexOf(this);
                let s,
                    l = this.get('lineEndPoints');
                ((s = void 0 === l || i(l) ? void 0 : Object.assign({}, l)),
                    (l =
                        void 0 === e || i(e)
                            ? void 0
                            : Object.assign(void 0 === l ? {} : l, e)),
                    this.set('lineEndPoints', l),
                    (o[a] = this.toJSON()),
                    n.set('relationships', o),
                    n.trigger(r.EVENTS.AFTER_SHEET_CONTENT_CHANGE, {
                        target: n,
                        attr: 'relationships',
                    }),
                    null === (t = this.getUndo()) ||
                        void 0 === t ||
                        t.add(
                            {
                                undo: () => {
                                    this.changeLineEndPosition(s);
                                },
                                redo: () => {
                                    this.changeLineEndPosition(e);
                                },
                            },
                            'changeLineEndPosition'
                        ),
                    this.trigger('refresh', !0));
            }
            styleChanged() {
                const e = this.style();
                (e ? this.set('style', e.toJSON()) : this.unset('style'),
                    this._save());
            }
            getTitle() {
                return this.get('title');
            }
            changeTitle(e, t) {
                var i;
                t = Object.assign({}, { titleUnedited: !1 }, t);
                const n = this.get('title');
                if (n === e) return !1;
                this.set('title', e);
                const r = this._titleUnedited;
                (!t.titleUnedited && this.has('titleUnedited')
                    ? (this.unset('titleUnedited'), (this._titleUnedited = !1))
                    : !0 === t.titleUnedited &&
                      (this.set('titleUnedited', !0),
                      (this._titleUnedited = !0)),
                    null === (i = this.getUndo()) ||
                        void 0 === i ||
                        i.add(
                            {
                                undo: () =>
                                    this.changeTitle(n, {
                                        titleUnedited: r,
                                    }),
                                redo: () => this.changeTitle(e),
                            },
                            'R-changeTitle'
                        ),
                    this._save());
            }
            _save() {
                var e;
                const t = this.parent(),
                    i = t.get('relationships');
                ((i[t.relationships().indexOf(this)] = this.toJSON()),
                    t.set('relationships', i),
                    null === (e = this.parent()) ||
                        void 0 === e ||
                        e.trigger(r.EVENTS.AFTER_SHEET_CONTENT_CHANGE, {
                            target: t,
                            attr: 'relationships',
                        }));
            }
            isTitleUnedited() {
                return !(
                    !this.has('titleUnedited') ||
                    !0 !== this.get('titleUnedited')
                );
            }
        }
        class y extends h.a {
            get componentType() {
                return r.COMPONENT_TYPE.SUMMARY;
            }
            initialize(e, t) {
                (super.initialize(e, t),
                    this.updateRange(),
                    this.on('change:range', this.updateRange));
            }
            beforeTopicRemove(e, t) {
                if (e.type() === r.TOPIC_TYPE.ATTACHED) {
                    const e = !0;
                    this.changeSummaryRange(t, e);
                }
            }
            afterTopicAdd(e, t) {
                if (e.type() === r.TOPIC_TYPE.ATTACHED) {
                    const e = !1;
                    this.changeSummaryRange(t, e);
                }
            }
            getRange() {
                return this.get('range');
            }
            setRange(e) {
                var t;
                const i = this.getRange();
                if (e === i) return !1;
                (this.set('range', e),
                    null === (t = this.getUndo()) ||
                        void 0 === t ||
                        t.add(
                            {
                                undo: () => {
                                    this.setRange(i);
                                },
                                redo: () => {
                                    this.setRange(e);
                                },
                            },
                            'setRange summary'
                        ));
            }
            checkRange(e) {
                var t;
                if (!(e = e || this.parent())) return !1;
                const i = e.children();
                return (
                    !!(
                        this.rangeStart <= this.rangeEnd &&
                        i[this.rangeStart] &&
                        i[this.rangeEnd]
                    ) ||
                    (null === (t = this.getConfig()) ||
                        void 0 === t ||
                        t
                            .get(r.CONFIG.LOGGER)
                            .warn('check summary range fail', this.get('id')),
                    i.length <= this.rangeStart
                        ? ((this.rangeStart = -1), (this.rangeEnd = -1), !1)
                        : i.length <= this.rangeEnd &&
                          ((this.rangeEnd = i.length - 1), !0))
                );
            }
            updateRange(e) {
                const t = this.getRange();
                if (!t)
                    return ((this.rangeStart = -1), void (this.rangeEnd = -1));
                ('master' === t
                    ? ((this.rangeStart = -1), (this.rangeEnd = -1))
                    : ((this.rangeStart = parseInt(t.match(/\d+/g)[0], 10)),
                      (this.rangeEnd = parseInt(t.match(/\d+/g)[1], 10)),
                      this.checkRange()),
                    e && this.summaryChanged());
            }
            refreshSelf() {}
            styleChanged() {
                const e = this.style();
                (e ? this.set('style', e.toJSON()) : this.unset('style'),
                    this.summaryChanged());
            }
            changeSummaryRange(e, t) {
                let i = this.rangeStart,
                    n = this.rangeEnd;
                if (e >= i && e <= n)
                    if (t) {
                        if (i === n) {
                            const e = this.getSummaryTopic();
                            if (e) return void e.removeSelf();
                        }
                        n--;
                    } else n++;
                else e < i && (t ? (i--, n--) : (i++, n++));
                const r = '(' + i + ',' + n + ')';
                (i === this.rangeStart && n === this.rangeEnd) ||
                    this.setRange(r);
            }
            getSummaryTopic() {
                const e = this.get('topicId'),
                    t = this.parent();
                if (!t) return;
                const i = t.children(r.TOPIC_TYPE.SUMMARY);
                return Object(n.find)(i, (t) => t.get('id') === e);
            }
            summaryChanged() {
                const e = this.parent();
                if (!e) return;
                const t = e.get('summaries');
                ((t[e.summaries().indexOf(this)] = this.toJSON()),
                    e.set('summaries', t),
                    e.topicChanged({
                        target: e,
                        attr: 'summaries',
                    }));
            }
        }
        class M extends T.a {
            get componentType() {
                return r.COMPONENT_TYPE.THEME;
            }
            initialize(e, t) {
                ((this._properties = {}), super.initialize(e, t));
            }
            properties() {
                return (
                    this._properties || (this._properties = {}),
                    this._properties
                );
            }
            addProperties(e, t) {
                this.properties()[e] = t;
            }
            emptyProperties() {
                this._properties = {};
            }
            hasClass(e) {
                const t = this.properties();
                return Boolean(t[e]);
            }
            getStyleValue(e, t) {
                const i = this.properties()[e];
                return (i && i.properties && i.properties[t]) || null;
            }
            getStyle(e) {
                const t = this.properties()[e];
                return (
                    (t && t.properties && Object.assign({}, t.properties)) ||
                    null
                );
            }
            getColorThemeId() {
                return this.get('colorThemeId');
            }
            getSkeletonThemeId() {
                return this.get('skeletonThemeId');
            }
        }
        class A extends T.a {
            constructor() {
                (super(...arguments), (this.id = Object(o.b)()));
            }
            get componentType() {
                return r.COMPONENT_TYPE.IMAGE;
            }
            initialize(e, t) {
                super.initialize(e, t);
            }
            getId() {
                return this.id;
            }
            getSrc() {
                return this.get('src');
            }
            getWidth() {
                return this.get('width');
            }
            getHeight() {
                return this.get('height');
            }
            getAlign() {
                return this.get('align');
            }
            getBorderWidth() {
                return this.get('borderWidth') || 0;
            }
            getBorderColor() {
                return this.get('borderColor') || 'none';
            }
            getOpacity() {
                return this.get('opacity') || 1;
            }
            getShadowVisible() {
                return this.get('shadowVisible');
            }
            getLockRatio() {
                return (
                    void 0 === this.get('lockRatio') || this.get('lockRatio')
                );
            }
            getFlipAndRotateRecords() {
                const e = this.get('flipAndRotateRecords');
                return e ? JSON.parse(e) : [];
            }
            setFlipAndRotateRecords(e) {
                this.set('flipAndRotateRecords', JSON.stringify(e));
            }
            pushFlipAndRotateRecord(e) {
                const t = this.getFlipAndRotateRecords();
                (t.push(e), this.setFlipAndRotateRecords(t));
            }
            replaceNewData(e) {
                (this.clear(), this.set(e));
            }
            changeImageData(e, t) {
                var i;
                const n = {
                        src: this.getSrc(),
                        width: this.getWidth(),
                        height: this.getHeight(),
                        align: this.getAlign(),
                    },
                    r = this.getFlipAndRotateRecords();
                -1 !== Object.keys(e).findIndex((t) => e[t] !== n[t]) &&
                    (this.set(e),
                    t &&
                        (Array.isArray(t)
                            ? this.setFlipAndRotateRecords(t)
                            : this.pushFlipAndRotateRecord(t)),
                    this.trigger('changeImageData'),
                    this.imageChanged(),
                    null === (i = this.getUndo()) ||
                        void 0 === i ||
                        i.add({
                            undo: () => this.changeImageData(n, r),
                            redo: () => this.changeImageData(e, t),
                        }));
            }
            changeOpacity(e) {
                var t;
                const i = this.getOpacity();
                e !== i &&
                    (this.set('opacity', e),
                    this.trigger('changeOpacity', e),
                    this.imageChanged(),
                    null === (t = this.getUndo()) ||
                        void 0 === t ||
                        t.add({
                            undo: () => this.changeOpacity(i),
                            redo: () => this.changeOpacity(e),
                            options: {
                                shouldBindSelectionRestore: !0,
                                model: this.parent(),
                            },
                        }));
            }
            changeBorderWidth(e) {
                var t;
                const i = this.getBorderWidth();
                e !== i &&
                    (this.set('borderWidth', e),
                    this.trigger('changeBorderWidth', e),
                    this.imageChanged(),
                    null === (t = this.getUndo()) ||
                        void 0 === t ||
                        t.add({
                            undo: () => this.changeBorderWidth(i),
                            redo: () => this.changeBorderWidth(e),
                            options: {
                                shouldBindSelectionRestore: !0,
                                model: this.parent(),
                            },
                        }));
            }
            changeBorderColor(e) {
                var t;
                const i = this.getBorderColor();
                e !== i &&
                    (this.set('borderColor', e),
                    this.trigger('changeBorderColor', e),
                    this.imageChanged(),
                    null === (t = this.getUndo()) ||
                        void 0 === t ||
                        t.add({
                            undo: () => this.changeBorderColor(i),
                            redo: () => this.changeBorderColor(e),
                            options: {
                                shouldBindSelectionRestore: !0,
                                model: this.parent(),
                            },
                        }));
            }
            changeShadowVisible(e) {
                var t;
                const i = this.getShadowVisible();
                e !== i &&
                    (this.set('shadowVisible', e),
                    this.trigger('changeShadowVisible', e),
                    this.imageChanged(),
                    null === (t = this.getUndo()) ||
                        void 0 === t ||
                        t.add({
                            undo: () => this.changeShadowVisible(i),
                            redo: () => this.changeShadowVisible(e),
                            options: {
                                shouldBindSelectionRestore: !0,
                                model: this.parent(),
                            },
                        }));
            }
            changeLockRatio(e) {
                var t;
                const i = this.getLockRatio();
                e !== i &&
                    (this.set('lockRatio', e),
                    this.trigger('changeLockRatio', e),
                    this.imageChanged(),
                    null === (t = this.getUndo()) ||
                        void 0 === t ||
                        t.add({
                            undo: () => this.changeLockRatio(i),
                            redo: () => this.changeLockRatio(e),
                            options: {
                                shouldBindSelectionRestore: !0,
                                model: this.parent(),
                            },
                        }));
            }
            resize(e) {
                var t;
                const i = {
                    width: this.getWidth(),
                    height: this.getHeight(),
                };
                Object(n.isEqual)(e, i) ||
                    (e.width ? this.set('width', e.width) : this.unset('width'),
                    e.height
                        ? this.set('height', e.height)
                        : this.unset('height'),
                    this.trigger('resize', e),
                    this.imageChanged(),
                    null === (t = this.getUndo()) ||
                        void 0 === t ||
                        t.add({
                            undo: () => this.resize(i),
                            redo: () => this.resize(e),
                            options: {
                                shouldBindSelectionRestore: !0,
                                model: this.parent(),
                            },
                        }));
            }
            align(e) {
                var t;
                const i = this.getAlign();
                e !== i &&
                    (this.set('align', e),
                    this.trigger('align'),
                    this.imageChanged(),
                    null === (t = this.getUndo()) ||
                        void 0 === t ||
                        t.add({
                            undo: () => this.align(i),
                            redo: () => this.align(e),
                            options: {
                                shouldBindSelectionRestore: !0,
                                model: this.parent(),
                            },
                        }));
            }
            imageChanged() {
                const e = this.parent(),
                    t = this.toJSON();
                (e.set('image', t),
                    e.topicChanged({ target: e, attr: 'image' }));
            }
            removeSelf() {
                const e = this.parent();
                e && e.removeImage();
            }
        }
        var v = i(92);
        const E = {
            [r.MODEL_TYPE.BOUNDARY.toLowerCase()]: p,
            [r.MODEL_TYPE.HREF.toLowerCase()]: u,
            [r.MODEL_TYPE.LABEL.toLowerCase()]: g,
            [r.MODEL_TYPE.LEGEND.toLowerCase()]: Q,
            [r.MODEL_TYPE.MARKER.toLowerCase()]: m,
            [r.MODEL_TYPE.NOTE.toLowerCase()]: b,
            [r.MODEL_TYPE.NUMBERING.toLowerCase()]: C,
            [r.MODEL_TYPE.RELATIONSHIP.toLowerCase()]: L,
            [r.MODEL_TYPE.SUMMARY.toLowerCase()]: y,
            [r.MODEL_TYPE.THEME.toLowerCase()]: M,
            [r.MODEL_TYPE.TOPIC.toLowerCase()]: v.a,
            [r.MODEL_TYPE.IMAGE.toLowerCase()]: A,
        };
        class _ {
            constructor(e) {
                this.sheet = e;
            }
            create(e, t = {}, i = {}) {
                i.sheet = this.sheet;
                const n = E[e.toLowerCase()];
                if (!n) throw new Error(`No such model type: ${e}`);
                const r = new n(t, i);
                return (this.sheet.registerComponent(r), r);
            }
        }
        const O = [
                r.TOPIC_TYPE.ATTACHED,
                r.TOPIC_TYPE.SUMMARY,
                r.TOPIC_TYPE.DETACHED,
                r.TOPIC_TYPE.CALLOUT,
            ],
            S = {
                [r.INFOITEM_TYPE_SHORT.LABEL]: {
                    newTypeName: r.INFOITEM_TYPE_FULL.LABEL,
                    defaultMode: 'card',
                },
                [r.INFOITEM_TYPE_SHORT.HREF]: {
                    newTypeName: r.INFOITEM_TYPE_FULL.HREF,
                    defaultMode: 'icon',
                },
                [r.INFOITEM_TYPE_SHORT.NOTE]: {
                    newTypeName: r.INFOITEM_TYPE_FULL.NOTE,
                    defaultMode: 'icon',
                },
                [r.INFOITEM_TYPE_SHORT.TASK]: {
                    newTypeName: r.INFOITEM_TYPE_FULL.TASK,
                    defaultMode: 'icon',
                },
                [r.INFOITEM_TYPE_SHORT.AUDIO]: {
                    newTypeName: r.INFOITEM_TYPE_FULL.AUDIO,
                    defaultMode: 'icon',
                },
            };
        class x extends h.a {
            get componentType() {
                return r.MODEL_TYPE.SHEET;
            }
            get modelEvents() {
                return {
                    topicAddMarker: 'topicAddMarker',
                    topicChangeMarker: 'topicChangeMarker',
                    topicRemoveMarker: 'topicRemoveMarker',
                };
            }
            initialize(e, t) {
                ((this._config = new c.a()),
                    (this._idMap = {}),
                    (this._sheetComponentFactory = new _(this)),
                    (this.legendModel = null),
                    (this._floatingTopicFlexible = !1));
                const i = Object(d.restoreFile)([e])[0];
                (super.initialize(i, t),
                    this.set(i),
                    t && t.undo
                        ? (this._undoManager = t.undo)
                        : ((this._undoManager = new a.a()),
                          this._undoManager.setStackLimitedLength(1 / 0),
                          this._undoManager.on(
                              r.EVENTS.UNDO_STATE_CHANGE,
                              (...e) =>
                                  this.trigger(r.EVENTS.UNDO_STATE_CHANGE, ...e)
                          )),
                    this.initInnerModel(),
                    this.initUserMarkerInfo());
            }
            setTextTranslator(e) {
                this._textTranslator = e;
            }
            getTranslatedText(e) {
                return this._textTranslator
                    ? this._textTranslator(e)
                    : l.a.translate(r.LANGS.ZH_CN, e);
            }
            extensions() {
                if (!this._extensions) {
                    const e = (this.get('extensions') || []).filter(Boolean);
                    this._extensions = new f.a(e);
                }
                return this._extensions;
            }
            addExtension(e, t) {
                (this.extensions().add(e, t), this.syncExtension());
            }
            removeExtension(e) {
                (this.extensions().remove(e), this.syncExtension());
            }
            syncExtension() {
                const e = this.extensions().getInfo();
                (this.set('extensions', e),
                    this.sheetChanged(this.rootTopic(), {
                        target: this,
                        attr: 'extensions',
                    }));
            }
            initUserMarkerInfo() {
                const e = this.get('legend');
                if (!e) return;
                const { markers: t, groups: i } = e,
                    { markerModule: n } = Object(d.getInjectModule)(
                        r.MODULE_NAME.SNOWBIRD
                    );
                t && n.addUserMarkerInfoList(t, i);
            }
            registerComponent(e) {
                const t = e.get('id');
                return ((this._idMap[t] = e), this);
            }
            unregisterComponent(e) {
                return (this._idMap[e] && delete this._idMap[e], this);
            }
            generateComponentId() {
                let e = Object(o.b)();
                for (; this._idMap[e]; ) e = Object(o.b)();
                return e;
            }
            findComponentById(e) {
                return this._idMap[e];
            }
            ownerSheet() {
                return this;
            }
            createComponent(e, t = {}, i = {}) {
                return this._sheetComponentFactory.create(e, t, i);
            }
            initInnerModel() {
                return (
                    this.initLegendModel(),
                    this.rootTopic(Object(s.a)(this.get('rootTopic'), this)),
                    Object(n.each)(this.get('relationships'), (e) => {
                        Object(n.isEmpty)(e) || this.addRelationship(e, !0);
                    }),
                    this.enableOldFreePosition(),
                    this.get('style') &&
                        !Object(n.isEmpty)(this.get('style')) &&
                        this.initStyle(this.get('style')),
                    this.addTheme(this.get('theme'), !0),
                    this
                );
            }
            initLegendModel() {
                this.legendModel = this.createComponent(
                    r.MODEL_TYPE.LEGEND,
                    this.get('legend'),
                    { sheet: this, parentModel: this }
                );
            }
            getLegendModel() {
                return this.legendModel;
            }
            rootTopic(e) {
                const t = (e) => {
                    (e && e.parent(this),
                        (this._rootTopic = e),
                        this.trigger('replaceRootTopic', e, this));
                };
                let i = this._rootTopic || null;
                return void 0 === e
                    ? (i || ((i = this.createComponent('topic')), t(i)), i)
                    : ((e = e || null) === i || (i && i.parent(null), t(e)),
                      this);
            }
            relationships() {
                return (
                    this._relationships || (this._relationships = []),
                    this._relationships
                );
            }
            addRelationship(e, t) {
                var i;
                const n = e.cid,
                    o = n ? e : this.createComponent('relationship', e);
                (t || o.set('titleUnedited', !0),
                    (o._titleUnedited =
                        o.has('titleUnedited') && o.get('titleUnedited')));
                const a = n ? o.toJSON() : e,
                    s = this.relationships();
                let l;
                return (
                    t ||
                        ((l = this.get('relationships')),
                        l ? l.push(a) : this.set('relationships', [a]),
                        this.trigger(r.EVENTS.AFTER_SHEET_CONTENT_CHANGE, {
                            target: this,
                            attr: 'relationships',
                        })),
                    o.parent(this),
                    s.push(o),
                    this.trigger('addRelationship', o, this),
                    t ||
                        null === (i = this.getUndo()) ||
                        void 0 === i ||
                        i.add(
                            {
                                undo: () => this.removeRelationship(o),
                                redo: () => this.addRelationship(o),
                            },
                            'R-add'
                        ),
                    o
                );
            }
            removeRelationship(e) {
                var t;
                const i = this.relationships(),
                    n = i.indexOf(e);
                if (n < 0) return this;
                return (
                    this.get('relationships').splice(n, 1),
                    this.trigger(r.EVENTS.AFTER_SHEET_CONTENT_CHANGE, {
                        target: this,
                        attr: 'relationships',
                    }),
                    i.splice(n, 1),
                    e.parent(null),
                    this.trigger('removeRelationship', e),
                    null === (t = this.getUndo()) ||
                        void 0 === t ||
                        t.add(
                            {
                                undo: () => this.addRelationship(e),
                                redo: () => this.removeRelationship(e),
                            },
                            'R-remove'
                        ),
                    this
                );
            }
            theme() {
                return this._theme;
            }
            _createThemeComponent(e) {
                const t = this.createComponent('theme', e);
                return (this.set('theme', t.toJSON()), t);
            }
            addTheme(e, t) {
                const i = this._createThemeComponent(e),
                    r = i.attributes;
                return (
                    Object(n.each)(r, (e, t) => {
                        Object(n.isEmpty)(e) || i.addProperties(t, e);
                    }),
                    (this._theme = i),
                    i.parent(this),
                    t || this.trigger('addTheme', i),
                    i
                );
            }
            changeTheme(e, t = {}) {
                var i, o;
                const a = this.theme();
                let s = {};
                if (a) {
                    s = a.toJSON();
                    const r = this._createThemeComponent(e),
                        o = r.attributes;
                    (Object.keys(o).forEach((e) => {
                        const t = o[e];
                        Object(n.isEmpty)(t) || r.addProperties(e, t);
                    }),
                        (this._theme = r),
                        r.parent(this),
                        null === (i = t.fixUserStyleWhenChangeTheme) ||
                            void 0 === i ||
                            i.call(t),
                        this.trigger('changeTheme', t));
                } else this.addTheme(e);
                (this.set('theme', e),
                    this.trigger(r.EVENTS.AFTER_THEME_CHANGED, t),
                    this.trigger(r.EVENTS.AFTER_SHEET_CONTENT_CHANGE, {
                        target: this,
                        attr: 'theme',
                    }),
                    null === (o = this.getUndo()) ||
                        void 0 === o ||
                        o.add(
                            {
                                undo: () => {
                                    this.changeTheme(s);
                                },
                                redo: () => {
                                    this.changeTheme(e);
                                },
                            },
                            'changeTheme'
                        ));
            }
            clearAllSelfStyle() {
                let e = [this.rootTopic()];
                for (; e.length; ) {
                    const t = e.pop();
                    (t.summaries().forEach((e) => e.setStyleObj(null)),
                        t.boundaries().forEach((e) => e.setStyleObj(null)),
                        t.setStyleObj(null),
                        O.forEach((i) => {
                            e = e.concat(t.children(i));
                        }));
                }
                (this.relationships().forEach((e) => e.setStyleObj(null)),
                    this.setStyleObj(null));
            }
            haveSelfStyle() {
                let e = [this.rootTopic()];
                const t = (e) => e.some((e) => e.style());
                for (; e.length; ) {
                    const i = e.pop();
                    if (i.style()) return !0;
                    if (t(i.boundaries()) || t(i.summaries())) return !0;
                    O.forEach((t) => {
                        e = e.concat(i.children(t));
                    });
                }
                return t(this.relationships());
            }
            styleChanged() {
                const e = this.style();
                (e ? this.set('style', e.toJSON()) : this.unset('style'),
                    this.trigger(r.EVENTS.AFTER_SHEET_CONTENT_CHANGE, {
                        target: this,
                        attr: 'style',
                    }));
            }
            sheetChanged(e, { target: t, attr: i, oldValue: n }) {
                (this.set('rootTopic', e.toJSON()),
                    this.trigger(r.EVENTS.AFTER_SHEET_CONTENT_CHANGE, {
                        target: t,
                        attr: i,
                        oldValue: n,
                    }));
            }
            changeInfoItemDisplay(e, t) {
                var i;
                let n,
                    o = this.get('settings');
                (o ||
                    (this.set('settings', {
                        'info-items/info-item': [],
                    }),
                    (o = this.get('settings'))),
                    o['info-items/info-item'] ||
                        o['infoItems/infoItem'] ||
                        (o['info-items/info-item'] = []));
                const a = o['info-items/info-item']
                        ? (n = !0) && o['info-items/info-item']
                        : o['infoItems/infoItem'],
                    s = n ? S[e].newTypeName : e;
                let l = {};
                const c = a.some((e) => {
                    if (e.type === s) return ((l = e), !0);
                });
                let d = l.mode;
                if (d === t) return !1;
                (!d && (d = 'icon'),
                    (l.mode = t),
                    c || ((l.type = s), a.push(l)),
                    this.trigger('change:infoItemDisplay', e, t),
                    this.trigger(r.EVENTS.AFTER_SHEET_CONTENT_CHANGE),
                    null === (i = this.getUndo()) ||
                        void 0 === i ||
                        i.add(
                            {
                                undo: () => {
                                    this.changeInfoItemDisplay(e, d);
                                },
                                redo: () => {
                                    this.changeInfoItemDisplay(e, t);
                                },
                            },
                            'changeInfoItemDisplay'
                        ));
            }
            hasAncestor() {
                return !0;
            }
            getUndo() {
                return this._undoManager;
            }
            getConfig() {
                return this._config;
            }
            toggleFreePosition(e) {
                const t = this.get('topicPositioning');
                let i;
                ((i =
                    void 0 === e
                        ? 'free' === t
                            ? 'fixed'
                            : 'free'
                        : e
                          ? 'free'
                          : 'fixed'),
                    'free' === t && 'fixed' === i && R(this),
                    this._changePositioning(i));
            }
            toggleFloatingTopicFlexible(e) {
                (this.get('floatingTopicFlexible') && !e && R(this),
                    this._changeFloatingTopicFlexible(e));
            }
            _changePositioning(e) {
                var t;
                const i = this.get('topicPositioning');
                e === i ||
                    (!i && 'fixed' === e) ||
                    (this.set('topicPositioning', e),
                    this.trigger(r.EVENTS.AFTER_SHEET_CONTENT_CHANGE, {
                        target: this,
                        attr: 'topicPositioning',
                    }),
                    null === (t = this.getUndo()) ||
                        void 0 === t ||
                        t.add(
                            {
                                undo: () => {
                                    this._changePositioning(i);
                                },
                                redo: () => {
                                    this._changePositioning(e);
                                },
                            },
                            'changeTopicPositioning'
                        ));
            }
            _changeFloatingTopicFlexible(e) {
                var t;
                const i = this._floatingTopicFlexible;
                e !== i &&
                    ((this._floatingTopicFlexible = e),
                    this.set('floatingTopicFlexible', e),
                    this.trigger(r.EVENTS.AFTER_SHEET_CONTENT_CHANGE, {
                        target: this,
                        attr: 'floatingTopicFlexible',
                    }),
                    this.trigger(r.EVENTS.AFTER_SHEET_CONTENT_CHANGE, {
                        target: this,
                        attr: 'floatingTopicFlexible',
                    }),
                    null === (t = this.getUndo()) ||
                        void 0 === t ||
                        t.add(
                            {
                                undo: () => {
                                    this._changeFloatingTopicFlexible(i);
                                },
                                redo: () => {
                                    this._changeFloatingTopicFlexible(e);
                                },
                            },
                            'changeFloatingTopicFlexible'
                        ));
            }
            isFreePositionEnabled() {
                return 'free' === this.get('topicPositioning');
            }
            isFloatingTopicFlexible() {
                return this._floatingTopicFlexible;
            }
            enableOldFreePosition() {
                if (void 0 !== this.get('topicPositioning')) return;
                const e = this.rootTopic().children();
                for (let t = 0; t < e.length; t++)
                    if (e[t].get('position'))
                        return void this.set('topicPositioning', 'free');
                this.set('topicPositioning', 'fixed');
            }
            changeOverlap(e) {
                var t;
                const i = this.get('topicOverlapping');
                var n, o;
                (n = e) === (o = i) ||
                    (!n && 'none' === o) ||
                    ('none' === n && !o) ||
                    (this.set('topicOverlapping', e),
                    this.trigger(r.EVENTS.AFTER_SHEET_CONTENT_CHANGE, {
                        target: this,
                        attr: 'topicOverlapping',
                    }),
                    null === (t = this.getUndo()) ||
                        void 0 === t ||
                        t.add(
                            {
                                undo: () => this.changeOverlap(i),
                                redo: () => this.changeOverlap(e),
                            },
                            'changeTopicOverlapping'
                        ));
            }
            isTopicOverlapping() {
                return 'overlap' === this.get('topicOverlapping');
            }
            changeCompactLayoutModeLevel(e) {
                var t;
                const i = this.getCompactLayoutModeLevel();
                i !== e &&
                    (this.set('compactLayoutModeLevel', e),
                    this.trigger(r.EVENTS.AFTER_SHEET_CONTENT_CHANGE, {
                        target: this,
                        attr: 'compactLayoutModeLevel',
                    }),
                    this.trigger(r.EVENTS.COMPACT_LAYOUT_MODE_LEVEL_CHANGED),
                    null === (t = this.getUndo()) ||
                        void 0 === t ||
                        t.add(
                            {
                                undo: () =>
                                    this.changeCompactLayoutModeLevel(i),
                                redo: () =>
                                    this.changeCompactLayoutModeLevel(e),
                            },
                            'changeCompactLayoutModeLevel'
                        ));
            }
            changeHandDrawnModeActive(e) {
                var t;
                const i = this.getHandDrawnModeActive();
                i !== e &&
                    (this.set('handDrawnModeActive', e),
                    this.trigger(r.EVENTS.AFTER_SHEET_CONTENT_CHANGE, {
                        target: this,
                        attr: 'handDrawnModeActive',
                    }),
                    this.trigger(r.EVENTS.HAND_DRAWN_MODE_ACTIVE_CHANGED),
                    null === (t = this.getUndo()) ||
                        void 0 === t ||
                        t.add(
                            {
                                undo: () => this.changeHandDrawnModeActive(i),
                                redo: () => this.changeHandDrawnModeActive(e),
                            },
                            'changeHandDrawnModeActive'
                        ));
            }
            getCompactLayoutModeLevel() {
                var e;
                return null !== (e = this.get('compactLayoutModeLevel')) &&
                    void 0 !== e
                    ? e
                    : r.COMPACT_LAYOUT_MODE_LEVEL.Third;
            }
            getHandDrawnModeActive() {
                var e;
                return (
                    null !== (e = this.get('handDrawnModeActive')) &&
                    void 0 !== e &&
                    e
                );
            }
            traverseTopic(e, t) {
                this.rootTopic().traverseTopic(e, t);
            }
            toJSON() {
                const e = super.toJSON();
                return ((e.coreVersion = this.getEnvCoreVersion()), e);
            }
            getFileCoreVersion() {
                return this.get('coreVersion');
            }
            traverseStyleComponent(e) {
                let t = [this.rootTopic()];
                for (; t.length; ) {
                    const i = t.pop();
                    (e(i),
                        i.summaries().forEach((t) => e(t)),
                        i.boundaries().forEach((t) => e(t)),
                        O.forEach((e) => {
                            t = t.concat(i.children(e));
                        }));
                }
                (this.relationships().forEach((t) => e(t)), e(this));
            }
            collapseBranchesToLevel(e) {
                this.traverseTopic(
                    [
                        r.TOPIC_TYPE.ATTACHED,
                        r.TOPIC_TYPE.DETACHED,
                        r.TOPIC_TYPE.SUMMARY,
                        r.TOPIC_TYPE.CALLOUT,
                    ],
                    (t) => {
                        t.getLayer() === e && t.collapseBranch();
                    }
                );
            }
            extendAllBranches() {
                this.traverseTopic(
                    [
                        r.TOPIC_TYPE.ATTACHED,
                        r.TOPIC_TYPE.DETACHED,
                        r.TOPIC_TYPE.SUMMARY,
                        r.TOPIC_TYPE.CALLOUT,
                    ],
                    (e) => {
                        e.extendBranch();
                    }
                );
            }
            addSkeletonStructureStyle(e) {
                this.addExtension(
                    r.EXTENSION_PROVIDER.SKELETON_STRUCTURE_STYLE,
                    {
                        provider: r.EXTENSION_PROVIDER.SKELETON_STRUCTURE_STYLE,
                        content: e,
                    }
                );
            }
            getSkeletonStructureStyle() {
                var e;
                return (
                    (null ===
                        (e = this.extensions().getExtension(
                            r.EXTENSION_PROVIDER.SKELETON_STRUCTURE_STYLE
                        )) || void 0 === e
                        ? void 0
                        : e.content) || {}
                );
            }
            removeSkeletonStructureStyle() {
                this.removeExtension(
                    r.EXTENSION_PROVIDER.SKELETON_STRUCTURE_STYLE
                );
            }
        }
        function R(e) {
            e.traverseTopic([r.TOPIC_TYPE.ATTACHED], (e) => {
                const t = e.get('position');
                t && t.x && t.y && e.clearPosition();
            });
        }
    },
];
