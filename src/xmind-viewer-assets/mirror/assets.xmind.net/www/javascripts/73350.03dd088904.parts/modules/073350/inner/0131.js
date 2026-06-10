export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return s;
        });
        var n = i(26),
            r = i(11),
            o = i(0),
            a = i(1);
        class s {
            constructor(e) {
                ((this.selections = []),
                    (this._lastSelectedBranch = null),
                    (this.context = e),
                    (this._preBounchSelectInfo = {
                        start: null,
                        selections: [],
                    }),
                    (this.isActive = !0),
                    this._initEventListener());
            }
            _initEventListener() {
                const e = 'mousedown',
                    t = 'tap';
                (this.context.onEvent(e, o.VIEW_TYPE.BRANCH, (e) =>
                    this._onBranchViewMouseDown(e)
                ),
                    this.context.onEvent('mouseup', o.VIEW_TYPE.BRANCH, (e) =>
                        this._onBranchViewMouseUp(e)
                    ),
                    this.context.onEvent(e, o.VIEW_TYPE.BOUNDARY, (e) =>
                        this._onNormalViewMouseDown(e)
                    ),
                    this.context.onEvent(e, o.VIEW_TYPE.RELATIONSHIP, (e) =>
                        this._onNormalViewMouseDown(e)
                    ),
                    this.context.onEvent(e, o.VIEW_TYPE.IMAGE, (e) =>
                        this._onNormalViewMouseDown(e)
                    ),
                    this.context.onEvent(e, o.VIEW_TYPE.MATH_JAX, (e) =>
                        this._onNormalViewMouseDown(e)
                    ),
                    this.context.onEvent(e, o.VIEW_TYPE.AUDIO, (e) =>
                        this._onNormalViewMouseDown(e)
                    ),
                    this.context.onEvent(e, o.VIEW_TYPE.INFOITEM, (e) =>
                        this._onNormalViewMouseDown(e)
                    ),
                    this.context.onEvent(e, o.VIEW_TYPE.MATRIX_LABEL, (e) =>
                        this._onNormalViewMouseDown(e)
                    ),
                    this.context.onEvent(e, o.VIEW_TYPE.MARKER, (e) =>
                        this._onInnerViewMouseDown(e)
                    ),
                    this.context.onEvent(e, o.VIEW_TYPE.INFORMATION_ICON, (e) =>
                        this._onInnerViewMouseDown(e)
                    ),
                    this.context.onEvent(e, o.VIEW_TYPE.LABELUNIT, (e) =>
                        this._onLabelUnitViewMouseDown(e)
                    ),
                    this.context.onEvent(e, o.VIEW_TYPE.SVG, (e) =>
                        this._onSVGViewMouseDown(e)
                    ),
                    this.context.onGesture(t, o.VIEW_TYPE.BRANCH, (e) =>
                        this._onNormalViewTap(e)
                    ),
                    this.context.onGesture(t, o.VIEW_TYPE.BOUNDARY, (e) =>
                        this._onNormalViewTap(e)
                    ),
                    this.context.onGesture(t, o.VIEW_TYPE.RELATIONSHIP, (e) =>
                        this._onNormalViewTap(e)
                    ),
                    this.context.onGesture(t, o.VIEW_TYPE.IMAGE, (e) =>
                        this._onNormalViewTap(e)
                    ),
                    this.context.onGesture(t, o.VIEW_TYPE.MATH_JAX, (e) =>
                        this._onNormalViewTap(e)
                    ),
                    this.context.onGesture(t, o.VIEW_TYPE.AUDIO, (e) =>
                        this._onNormalViewTap(e)
                    ),
                    this.context.onGesture(t, o.VIEW_TYPE.INFOITEM, (e) =>
                        this._onNormalViewTap(e)
                    ),
                    this.context.onGesture(t, o.VIEW_TYPE.MATRIX_LABEL, (e) =>
                        this._onNormalViewTap(e)
                    ),
                    this.context.onGesture(t, o.VIEW_TYPE.MARKER, (e) =>
                        this._onInnerViewTap(e)
                    ),
                    this.context.onGesture(
                        t,
                        o.VIEW_TYPE.INFORMATION_ICON,
                        (e) => this._onInnerViewTap(e)
                    ),
                    this.context.onGesture(t, o.VIEW_TYPE.SVG, (e) =>
                        this._onSVGViewTap(e)
                    ));
            }
            getSelections() {
                return [...this.selections];
            }
            getLastSelectedBranch() {
                return this._lastSelectedBranch;
            }
            setLastSelectedBranch(e) {
                e
                    ? (this._lastSelectedBranch = e)
                    : this.selections.length >= 1
                      ? (this._lastSelectedBranch = this.selections[0])
                      : (this._lastSelectedBranch = null);
            }
            _onBranchViewMouseUp(e) {
                (e.stopPropagation(),
                    2 !== e.button &&
                        (this.isMultiSelect(e) ||
                            e.shiftKey ||
                            this.selectSingle(e.sbView, {
                                forceFlush: !0,
                            })));
            }
            _onBranchViewMouseDown(e) {
                if (
                    (e.stopPropagation(),
                    !this.context.isMobileAppPlatform() &&
                        'collapse-extend-hover-area' !==
                            (null == e ? void 0 : e.target).getAttribute(
                                'data-name'
                            ))
                )
                    return 2 === e.button
                        ? this.selections.includes(e.sbView)
                            ? void 0
                            : this.selectSingle(e.sbView, {
                                  forceFlush: !0,
                              })
                        : void (this.isMultiSelect(e)
                              ? this.toggleSelection(e.sbView)
                              : e.shiftKey &&
                                  1 === this.selections.length &&
                                  Object(a.isBranch)(this.selections[0])
                                ? this._addSelectionBetweenBranches(
                                      this.selections[0],
                                      e.sbView
                                  )
                                : this.selectSingle(e.sbView, {
                                      ignoreIncluded: !0,
                                  }));
            }
            _onNormalViewMouseDown(e) {
                const t = 2 === e.button;
                (this.isMultiSelect(e)
                    ? this.toggleSelection(e.sbView, {
                          forceFlush: t,
                      })
                    : this.selectSingle(e.sbView, {
                          forceFlush: t,
                      }),
                    e.stopPropagation());
            }
            _onInnerViewMouseDown(e) {
                var t;
                if (
                    !(null === (t = null == e ? void 0 : e.sbView) ||
                    void 0 === t
                        ? void 0
                        : t.getBranchView)
                )
                    return;
                const i = e.sbView.getBranchView();
                if (i) {
                    const t = 2 === e.button;
                    (this.isMultiSelect(e)
                        ? this.toggleSelection(i, { forceFlush: t })
                        : this.selectSingle(i, { forceFlush: t }),
                        e.stopPropagation());
                }
            }
            _onLabelUnitViewMouseDown(e) {
                const t =
                    e.sbView &&
                    e.sbView.parent() &&
                    e.sbView.parent().parent() &&
                    e.sbView.parent().parent().parent();
                if (t) {
                    const i = 2 === e.button;
                    (this.isMultiSelect(e)
                        ? this.toggleSelection(t, { forceFlush: i })
                        : this.selectSingle(t, { forceFlush: i }),
                        e.stopPropagation());
                }
            }
            _onSVGViewMouseDown(e) {
                if (e.target !== e.sbView.svg.node) return;
                const t = e.shiftKey;
                this.isMultiSelect(e) ||
                    t ||
                    this.selectNone({ forceFlush: 2 === e.button });
            }
            _onNormalViewTap(e) {
                if (!this.context.isMobileAppPlatform()) {
                    const e = this.context.getModule(o.MODULE_NAME.SEMAPHORE);
                    if (
                        null == e
                            ? void 0
                            : e.isStatusActive(o.UI_STATUS.EDIT_TITLE)
                    )
                        return;
                }
                (e.stopPropagation(),
                    this.isMultiSelect(e)
                        ? this.toggleSelection(e.sbView)
                        : this.selectSingle(e.sbView));
            }
            _onInnerViewTap(e) {
                const t =
                    e &&
                    e.sbView &&
                    e.sbView.getBranchView &&
                    e.sbView.getBranchView();
                t && (this.selectSingle(t), e.stopPropagation());
            }
            _onSVGViewTap(e) {
                if (e.target !== e.sbView.svg.node) return;
                const t = this.context.getModule(o.MODULE_NAME.SEMAPHORE);
                (null == t
                    ? void 0
                    : t.isStatusActive(o.UI_STATUS.EDIT_TITLE)) ||
                    this.isMultiSelect(e) ||
                    this.selectNone();
            }
            _addSelectionBetweenBranches(e, t) {
                if (e === t) return;
                const i = t.parent();
                if (e.parent() === i) {
                    const n = i.getChildrenBranchesByType(),
                        r = this._branchesBetween2(n, e, t);
                    (this._removePreviousBounchSelection(e),
                        r.forEach((e) => this._addSel(e)),
                        (this._preBounchSelectInfo = {
                            start: e,
                            selections: r,
                        }));
                }
            }
            _removePreviousBounchSelection(e) {
                if (this._preBounchSelectInfo.start === e) {
                    const e = this._preBounchSelectInfo.selections;
                    Array.isArray(e) &&
                        e.forEach((e) => this.removeFromSelection(e));
                }
            }
            _branchesBetween2(e, t, i) {
                let n = e.indexOf(t),
                    r = e.indexOf(i);
                return (
                    r < n && ([n, r] = [r, n]),
                    -1 === n ? [] : e.slice(n, r + 1)
                );
            }
            isUnselectable(e) {
                return (
                    !e ||
                    (e.type === o.VIEW_TYPE.BRANCH &&
                        (e.shouldHide() ||
                            void 0 === e.isVisible ||
                            !1 === e.isVisible ||
                            e.isForcedInvisible))
                );
            }
            getFirstChildBranch() {
                let e;
                return (
                    this.selections.some((t, i) => {
                        if (t.type === o.VIEW_TYPE.BRANCH) return ((e = t), !0);
                    }),
                    e
                );
            }
            selectSingle(e, { forceFlush: t, ignoreIncluded: i } = {}) {
                if (!this.isActive || !e) return this;
                if (this.selections.includes(e)) {
                    if (i) return this;
                    if (1 === this.selections.length) return this;
                }
                return (
                    this.isUnselectable(e) ||
                        (this._clearSelections(),
                        e.select && e.select(),
                        this.selections.push(e),
                        this.setLastSelectedBranch(e),
                        this.notify({ forceFlush: t })),
                    this
                );
            }
            selectNone({ forceFlush: e } = {}) {
                return this.isActive && this.selections.length
                    ? (this._clearSelections(),
                      this.notify({ forceFlush: e }),
                      this)
                    : this;
            }
            removeFromSelection(e, { forceFlush: t } = {}) {
                if (!e) return this;
                const i = this.selections.indexOf(e);
                return (
                    -1 === i ||
                        (this.selections.splice(i, 1),
                        e.deselect && e.deselect(),
                        this.getLastSelectedBranch() === e &&
                            this.setLastSelectedBranch(null),
                        this.notify({ forceFlush: t })),
                    this
                );
            }
            addSelection(e, { forceFlush: t } = {}) {
                this._addSel(e, !1, { forceFlush: t });
            }
            toggleSelection(e, { forceFlush: t } = {}) {
                if (
                    0 === this.selections.length ||
                    e.type === this.selections[0].type
                )
                    return this._addSel(e, !0, { forceFlush: t });
            }
            setIsSilent(e) {
                this._isSilent = e;
            }
            _clearSelections() {
                0 !== this.selections.length &&
                    (this.selections.forEach((e) => {
                        e.deselect && e.deselect();
                    }),
                    (this.selections.length = 0));
            }
            _addSel(e, t, { forceFlush: i } = {}) {
                if (!this.isActive) return this;
                if (!e) return this;
                if (this.isUnselectable(e)) return this;
                const n = this.selections.indexOf(e);
                return -1 !== n
                    ? t
                        ? (this.removeFromSelection(e), !1)
                        : (this.selections.splice(n, 1),
                          this.selections.push(e),
                          this)
                    : this.context.config(o.CONFIG.NO_MULTI_SELECT)
                      ? this.selectSingle(e, { forceFlush: i })
                      : (e.select && e.select(),
                        this.selections.push(e),
                        this.setLastSelectedBranch(e),
                        this.notify({ forceFlush: i }),
                        this);
            }
            setMultiSelectMode(e) {
                var t, i;
                ((this._multiSelectModeEnabled = e),
                    e
                        ? null ===
                              (t = this.context.getModule(
                                  o.MODULE_NAME.SEMAPHORE
                              )) ||
                          void 0 === t ||
                          t.increase(o.UI_STATUS.MULTI_SELECT_MODE)
                        : null ===
                              (i = this.context.getModule(
                                  o.MODULE_NAME.SEMAPHORE
                              )) ||
                          void 0 === i ||
                          i.decrease(o.UI_STATUS.MULTI_SELECT_MODE));
            }
            isMultiSelect(e) {
                return (
                    (e && r.a.isFunctionEnabled(e)) ||
                    this._multiSelectModeEnabled
                );
            }
            notify({ forceFlush: e } = {}) {
                !this._isSilent &&
                    this.context.trigger(
                        o.EVENTS.SELECTION_CHANGED,
                        this.selections
                    );
                const t = {
                    content: this.getSelections(),
                    forceFlush: e,
                };
                this.context
                    .getModule(o.MODULE_NAME.UI_STATUS)
                    .commit('selectionChange', t);
            }
            enable() {
                this.isActive = !0;
            }
            disable() {
                this.isActive = !1;
            }
        }
        ((s.identifier = o.MODULE_NAME.SELECTION),
            Object.assign(s.prototype, n.Events));
    },
];
