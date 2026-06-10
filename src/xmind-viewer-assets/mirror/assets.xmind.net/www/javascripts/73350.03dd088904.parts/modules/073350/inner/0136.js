export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return L;
        });
        var n = i(12),
            r = i.n(n),
            o = i(11),
            a = i(0),
            s = i(26),
            l = i(1),
            c = i(5),
            d = i(20),
            f = i(14),
            h = i(17);
        const { isMobile: p } = o.a,
            T = a.TOPIC_TITLE_MAX_WIDTH,
            u = p ? 7 : 3,
            g = 'dblclick',
            Q = 'doubletap',
            m = [
                a.VIEW_TYPE.BOUNDARY,
                a.VIEW_TYPE.BRANCH,
                a.VIEW_TYPE.LEGEND,
                a.VIEW_TYPE.MATRIX_LABEL,
                a.VIEW_TYPE.RELATIONSHIP,
            ];
        class b {
            constructor(e) {
                ((this._style = {}),
                    (this._styleKeyToClear = [
                        'color',
                        'fontSize',
                        'fontFamily',
                        'fontStyle',
                        'fontWeight',
                        'textAlign',
                        'textTransform',
                        'textDecoration',
                        'width',
                        'height',
                        'lineHeight',
                        'backgroundColor',
                    ]),
                    (this._inputElement = e));
            }
            css(e) {
                (e = Object.assign({}, e)).fontSize &&
                    (e.fontSize = `${e.fontSize}px`);
                const t = this._diffWidthCurrentStyle(e),
                    i = Object.keys(t);
                i.length &&
                    i.forEach((e) => {
                        this._inputElement.style[e] = t[e];
                    });
            }
            clearStyle() {
                this._styleKeyToClear.forEach((e) => {
                    ((this._inputElement.style[e] = null),
                        delete this._style[e]);
                });
            }
            getStyle() {
                return Object.assign({}, this._style);
            }
            _diffWidthCurrentStyle(e) {
                const t = {};
                return (
                    Object.keys(e).forEach((i) => {
                        e[i] !== this._style[i] &&
                            ((t[i] = e[i]), (this._style[i] = e[i]));
                    }),
                    t
                );
            }
        }
        const C = (() => {
            let e;
            const t = [
                'letter-spacing',
                'line-height',
                'padding-top',
                'padding-bottom',
                'font-family',
                'font-weight',
                'font-size',
                'text-rendering',
                'text-transform',
                'width',
                'text-indent',
                'padding-left',
                'padding-right',
                'border-width',
                'box-sizing',
            ];
            return (i, n, r = null, o = null) => {
                e ||
                    ((e = document.createElement('textarea')),
                    document.body.appendChild(e));
                const {
                    paddingSize: a,
                    borderSize: s,
                    boxSizing: l,
                    contextStyle: c,
                } = (function (e) {
                    const i = window.getComputedStyle(e),
                        n = i.getPropertyValue('box-sizing'),
                        r =
                            parseFloat(i.getPropertyValue('padding-bottom')) +
                            parseFloat(i.getPropertyValue('padding-top')),
                        o =
                            parseFloat(
                                i.getPropertyValue('border-bottom-width')
                            ) +
                            parseFloat(i.getPropertyValue('border-top-width'));
                    return {
                        contextStyle: t
                            .map((e) => `${e}:${i.getPropertyValue(e)}`)
                            .join(';'),
                        paddingSize: r,
                        borderSize: o,
                        boxSizing: n,
                    };
                })(i);
                (e.setAttribute(
                    'style',
                    `${c};\n    height:0 !important;\n    visibility:hidden !important;\n    overflow:hidden !important;\n    position:absolute !important;\n    z-index:-1000 !important;\n    top:0 !important;\n    right:0 !important\n  `
                ),
                    (e.value = n));
                let d = e.scrollHeight;
                ('border-box' === l
                    ? (d += s)
                    : 'content-box' === l && (d -= a),
                    (e.value = ''));
                const f = e.scrollHeight - a;
                if (null !== r) {
                    let e = f * r;
                    ('border-box' === l && (e = e + a + s),
                        (d = Math.max(e, d)));
                }
                if (null !== o) {
                    let e = f * o;
                    ('border-box' === l && (e = e + a + s),
                        (d = Math.min(e, d)));
                }
                return { height: d };
            };
        })();
        class L {
            constructor(e) {
                ((this._inputElement = document.createElement('textarea')),
                    (this._targetView = null),
                    (this._dummyTargetBranchView = null),
                    (this._inputAttributeDiffer = new b(this._inputElement)),
                    (this._hasEdited = !1),
                    (this._inComposition = !1),
                    (this.currentTextStyle = null),
                    (this._deFocusTimer = null),
                    Object.assign(this, s.Events),
                    (this._context = e),
                    this._context.config(a.CONFIG.NO_EDIT_RECEIVER) ||
                        ((this.semaphoreModule = this._context.getModule(
                            a.MODULE_NAME.SEMAPHORE
                        )),
                        (this.selectionManager = this._context.getModule(
                            a.MODULE_NAME.SELECTION
                        )),
                        this.initInputArea(),
                        this.initEventListener()));
            }
            initInputArea() {
                (this._inputElement.setAttribute('class', 'edit-receiver'),
                    this._inputElement.setAttribute('tabindex', '-1'),
                    this._inputAttributeDiffer.css({
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        zIndex: '-1',
                        opacity: '0',
                    }),
                    this.disableInput(),
                    this._context
                        .getAppToolsContainer()
                        .append(this._inputElement));
            }
            initEventListener() {
                const { _context: e } = this;
                e.$el.on('focus', () => {
                    e.config(a.CONFIG.NO_ALWAYS_FOCUS_EDITRECEIVER) ||
                        this._prepareSelect();
                });
                const t = {
                    keydown: (e) => this.onKeyDown(e),
                    focus: (e) => this.onFocus(e),
                    focusin: (e) => e.preventDefault(),
                    blur: (e) => this.onBlur(e),
                    input: (e) => this.onInput(e),
                    copy: (e) => this.onCopy(e),
                    paste: (e) => this.onPaste(e),
                    cut: (e) => this.onCut(e),
                    compositionstart: () => this.onCompositionEvent(!0),
                    compositionend: () => this.onCompositionEvent(!1),
                };
                (Object.keys(t).forEach((e) => {
                    this._inputElement.addEventListener(e, t[e]);
                }),
                    e.onEvent(g, a.VIEW_TYPE.BRANCH, (e) =>
                        this._onViewDbClick(e)
                    ),
                    e.onGesture(Q, a.VIEW_TYPE.BRANCH, (e) =>
                        this._onViewDbTap(e)
                    ),
                    e.onEvent(g, a.VIEW_TYPE.BOUNDARY, (e) =>
                        this._onViewDbClick(e)
                    ),
                    e.onGesture(Q, a.VIEW_TYPE.BOUNDARY, (e) =>
                        this._onViewDbTap(e)
                    ),
                    e.onEvent(g, a.VIEW_TYPE.RELATIONSHIP, (e) =>
                        this._onViewDbClick(e)
                    ),
                    e.onGesture(Q, a.VIEW_TYPE.RELATIONSHIP, (e) =>
                        this._onViewDbTap(e)
                    ),
                    e.onEvent(g, a.VIEW_TYPE.MATRIX_LABEL, (e) =>
                        this._onViewDbClick(e)
                    ),
                    e.onGesture(Q, a.VIEW_TYPE.MATRIX_LABEL, (e) =>
                        this._onViewDbTap(e)
                    ),
                    e.onEvent(g, a.VIEW_TYPE.LEGENDMARKERLIST, (e) =>
                        this._onViewDbClick(e)
                    ),
                    e.onEvent('click', a.VIEW_TYPE.INFOITEM, (e) => {
                        e.sbView.showEditor(e);
                    }),
                    e.onGesture('tap', a.VIEW_TYPE.SVG, (e) => {
                        this._inputElement.blur();
                    }),
                    e.on(a.EVENTS.SHEET_CONTENT_LOADED, () => {
                        e.afterRender().then(() => {
                            this._locateInputByCurrentSelection();
                        });
                    }),
                    e.on(a.EVENTS.SELECTION_CHANGED, () => {
                        if (!this.getTargetFromSelection())
                            return this.disableInput();
                        (this.enableInput(),
                            this._locateInputByCurrentSelection());
                    }),
                    e.on(a.EVENTS.SCALE_CHANGED, () => {
                        this._locateInputByCurrentSelection();
                    }),
                    window.addEventListener('resize', () => {
                        e
                            .getActiveUIStatus()
                            .includes(a.UI_STATUS.EDIT_TITLE) &&
                            setTimeout(() => this.updateInputPosition(), 10);
                    }));
            }
            updateTargetView(e) {
                ((this._targetView = e),
                    e && (this.currentTextStyle = e.getTextClientStyle()));
            }
            _onViewDbClick(e) {
                const t = e.sbView;
                (t.shouldPreventTitle && t.shouldPreventTitle()) ||
                    t.originBranchView ||
                    this.show(t.getEditContent(), t);
            }
            _onViewDbTap(e) {
                (e.stopPropagation(),
                    e.sbView.originBranchView || this._onViewDbClick(e));
            }
            getOriginalTargetView() {
                return this._targetView;
            }
            _switchInputElementStyles() {
                const e = 'bordered',
                    t = [e, a.VIEW_TYPE.MATRIX_LABEL, a.VIEW_TYPE.BOUNDARY],
                    i = [];
                switch (this._targetView.type) {
                    case a.VIEW_TYPE.MATRIX_LABEL:
                        i.push(a.VIEW_TYPE.MATRIX_LABEL);
                        break;
                    case a.VIEW_TYPE.BOUNDARY:
                        (this._targetView.selectBox.stateMachine.transition(
                            this._targetView.selectBox.event_edit
                        ),
                            i.push(a.VIEW_TYPE.BOUNDARY));
                        break;
                    default:
                        this._dummyTargetBranchView || i.push(e);
                }
                const n = t.filter((e) => -1 === i.indexOf(e));
                switch (
                    (r()(this._inputElement).toggleClass(n, !1),
                    r()(this._inputElement).toggleClass(i, !0),
                    this._targetView.type)
                ) {
                    case a.VIEW_TYPE.MATRIX_LABEL:
                        let e = this._targetView.getStyleValue(
                            a.STYLE_KEYS.FILL_COLOR
                        );
                        ((e && 'none' !== e.toLowerCase()) ||
                            (e = this._context
                                .getSheetView()
                                .getBlendingBackgroundColor()),
                            (this._inputElement.style.backgroundColor = e),
                            (this._inputElement.style.color =
                                this._targetView.getStyleValue(
                                    a.STYLE_KEYS.TEXT_COLOR
                                )));
                        break;
                    case a.VIEW_TYPE.BOUNDARY:
                        ((this._inputElement.style.backgroundColor =
                            this._targetView.titleView.figure.bgFillColor),
                            (this._inputElement.style.color =
                                this._targetView.titleView.figure.textColor));
                        break;
                    case a.VIEW_TYPE.LEGENDMARKERLIST:
                        this._inputElement.style.fontFamily =
                            a.COMMON_FONT_FAMILY;
                }
            }
            show(e, t) {
                var i;
                if (this._context.isReadOnly()) return !1;
                if (!t) return;
                if ((this.updateTargetView(t), this.isAddingRelationship()))
                    return;
                let n;
                (this.semaphoreModule.increase(a.UI_STATUS.EDIT_TITLE, {
                    forceFlush: !0,
                }),
                    this._inputAttributeDiffer.clearStyle(),
                    t instanceof h.a &&
                        ((this._dummyTargetBranchView = Object(l.standin)(t)),
                        this._dummyTargetBranchView.topicView.on(
                            'change:bounds',
                            () => {
                                this.updateTextClientSize();
                            }
                        ),
                        null === (i = this.selectionManager) ||
                            void 0 === i ||
                            i.selectSingle(this._dummyTargetBranchView)),
                    this._switchInputElementStyles(),
                    this.setEditingTargetOpacityInFilterMode(1),
                    Object(c.l)(e) && (this._inputElement.value = e),
                    this._inputAttributeDiffer.css(this.currentTextStyle),
                    this._inputAttributeDiffer.css({
                        position: 'absolute',
                        zIndex: '3',
                        opacity: '1',
                    }),
                    this.enableInput(),
                    (n =
                        t instanceof h.a
                            ? t.topicView.titleView
                            : t.titleView));
                const r = n && n.isUnedited();
                d.a.work(d.b.PRIORITY.AFTER_EACH, {
                    execute: () => {
                        (this.updateInputPosition(),
                            this._setInputSize(),
                            this._inputElement.focus(),
                            e &&
                                (r
                                    ? (this._inputElement.value = '')
                                    : this._inputElement.setSelectionRange(
                                          -1,
                                          -1
                                      )));
                    },
                });
            }
            setEditingTargetOpacityInFilterMode(e) {
                var t, i;
                if (
                    !this.semaphoreModule.isStatusActive(
                        a.UI_STATUS.FILTER_MODE
                    )
                )
                    return;
                [a.VIEW_TYPE.BOUNDARY, a.VIEW_TYPE.RELATIONSHIP].includes(
                    null === (t = this._targetView) || void 0 === t
                        ? void 0
                        : t.type
                ) &&
                    (null === (i = this._targetView) ||
                        void 0 === i ||
                        i.figure.setOpacity(e));
            }
            getTextSize(e, t) {
                return Object(l.getTextSize)(e, t);
            }
            updateInputPosition() {
                var e;
                const t = this._context.getSVGView(),
                    i = t.currentScale,
                    n = this._dummyTargetBranchView || this._targetView;
                if (!(null == n ? void 0 : n.getContext())) return;
                let r = 0,
                    o = 0,
                    s = { x: 0, y: 0 };
                switch (n.type) {
                    case a.VIEW_TYPE.BRANCH:
                        {
                            const e = this.getBranchViewSize();
                            e.targetHeight > 0 &&
                                (o -= ((e.height - e.targetHeight) / 2) * i);
                            const t = n.topicView.titleView.figure,
                                a = (e.width - t.size.width) * i;
                            ('center' === t.textAlign && (r -= a / 2),
                                'right' === t.textAlign && (r -= a),
                                (s = n.topicView.titleView.getRealPosition()));
                        }
                        break;
                    case a.VIEW_TYPE.BOUNDARY:
                        if (n.titleView.text) s = n.titleView.getRealPosition();
                        else {
                            const t =
                                parseInt(
                                    (null === (e = this.currentTextStyle) ||
                                    void 0 === e
                                        ? void 0
                                        : e.fontSize) || 12
                                ) / 2;
                            s = Object(c.c)(n.getRealPosition(), {
                                x:
                                    2 *
                                        l.layoutConstant.BOUNDARY_TITLE
                                            .CONTENT_PADDING_HORIZON +
                                    t,
                                y:
                                    4 *
                                    -l.layoutConstant.BOUNDARY_TITLE
                                        .CONTENT_PADDING_VERTICAL,
                            });
                        }
                        break;
                    case a.VIEW_TYPE.RELATIONSHIP:
                        s = n.titleView.getRealPosition();
                        break;
                    case a.VIEW_TYPE.MATRIX_LABEL:
                        {
                            const e = n.getProxy().bounds,
                                t = n.figure.size;
                            ((r = ((e.width - t.width) * i) / 2),
                                (o = ((e.height - t.height) * i) / 2),
                                (s = n.getRealPosition()));
                        }
                        break;
                    case a.VIEW_TYPE.LEGENDMARKERLIST:
                        s = n.getTextRealPosition();
                }
                const d = t.getSheetTranslate(),
                    f = s.x * i + d.x,
                    h = s.y * i + d.y;
                this._inputAttributeDiffer.css({
                    transform: `scale(${i})`,
                    left: `${f + r}px`,
                    top: `${h + o}px`,
                });
            }
            _setInputSize() {
                const { currentTextStyle: e } = this,
                    t = this._context.getSVGView().currentScale;
                if (!this._targetView) return;
                const i = this._targetView.type,
                    n = this._targetView.getTextClientBounds(),
                    r = this._inputElement.value,
                    o = this._targetView.getEditContent(),
                    s = this.getTitleMaxWidth(),
                    c = Object(l.resolveString)(r, e, s).join('\n');
                let { width: d, height: f } = this.getTextSize(c, e);
                const h = Object(l.resolveString)(o, e, s).join('\n');
                let { width: p, height: T } = this.getTextSize(h, e);
                if (
                    Object(l.isBranch)(this._targetView) &&
                    this._dummyTargetBranchView
                ) {
                    const e = this.getBranchViewSize();
                    this._inputAttributeDiffer.css({
                        width: Math.max(e.width, d) + 'px',
                        height: Math.max(e.height, f) + 'px',
                    });
                } else {
                    if (i === a.VIEW_TYPE.LABEL)
                        this._inputAttributeDiffer.css({
                            height: 1.25 * Math.max(f, T) + 'px',
                        });
                    else if (i === a.VIEW_TYPE.RELATIONSHIP)
                        this._inputAttributeDiffer.css({
                            width: Math.max(p, d, 80) + u + 'px',
                        });
                    else if (i === a.VIEW_TYPE.BOUNDARY) {
                        const i = parseInt(
                                this.currentTextStyle.fontSize || 12
                            ),
                            o = Math.max(n.width - 52 - i / 2, i),
                            a = Object(l.resolveString)(r, e, o).join('\n'),
                            { height: s } = this.getTextSize(a, e),
                            c = this._targetView.titleView.bounds.height - 12;
                        this._inputAttributeDiffer.css({
                            width: o / t + 'px',
                            height: Math.max(c, s) + 'px',
                        });
                    } else
                        i === a.VIEW_TYPE.LEGENDMARKERLIST
                            ? this._inputAttributeDiffer.css({
                                  width:
                                      Math.min(Math.max(d, p, 80), 200) +
                                      u +
                                      'px',
                                  'line-height': '1px',
                                  'text-align': 'left',
                              })
                            : i === a.VIEW_TYPE.MATRIX_LABEL
                              ? this._inputAttributeDiffer.css({
                                    width: Math.max(d, p) + u + 'px',
                                    'line-height': 1.25 * e.fontSize + 'px',
                                })
                              : this._inputAttributeDiffer.css({
                                    width: Math.max(d, p, 80) + u + 'px',
                                    'line-height': 1.25 * e.fontSize + 'px',
                                });
                    ((f = C(this._inputElement, c).height),
                        (T = C(this._inputElement, h).height),
                        i !== a.VIEW_TYPE.BOUNDARY &&
                            this._inputAttributeDiffer.css({
                                height:
                                    (i === a.VIEW_TYPE.LEGENDMARKERLIST
                                        ? 18
                                        : Math.max(f, T)) + 'px',
                            }));
                }
            }
            getBranchViewSize() {
                var e;
                const t = parseInt(
                        (null === (e = this.currentTextStyle) || void 0 === e
                            ? void 0
                            : e.fontSize) || 12
                    ),
                    i = (this._dummyTargetBranchView || this._targetView)
                        .topicView.titleView.bounds,
                    n = Math.max(
                        1,
                        Math.round(i.height / Math.floor(1.34 * t))
                    ),
                    r = n * Math.floor(1.34 * t);
                return {
                    width: Math.ceil(Math.max(i.width, t / 2)),
                    height: r,
                    lineCount: n,
                    targetHeight: i.height,
                };
            }
            updateTextClientSize() {
                if (this._dummyTargetBranchView) {
                    const e = f.a.getTransformedText(
                        this._inputElement.value,
                        this.currentTextStyle.textTransform
                    );
                    (this._dummyTargetBranchView.noSideEffect(
                        this._dummyTargetBranchView.saveEdit,
                        e,
                        { isSilent: !0 }
                    ),
                        d.a.work(d.b.PRIORITY.AFTER_EACH, {
                            execute: () => {
                                (this.updateInputPosition(),
                                    this._setInputSize());
                            },
                        }));
                } else (this.updateInputPosition(), this._setInputSize());
            }
            _setHideStyle() {
                if (
                    (this._inputAttributeDiffer.css({
                        zIndex: -1,
                        opacity: 0,
                    }),
                    (this._inputElement.value = ''),
                    this._dummyTargetBranchView)
                ) {
                    const e = this._context.getModule(a.MODULE_NAME.SELECTION);
                    (e &&
                        e
                            .getSelections()
                            .includes(this._dummyTargetBranchView) &&
                        (1 === e.getSelections().length &&
                            e.removeFromSelection(this._dummyTargetBranchView),
                        e.selectSingle(this._targetView)),
                        this._dummyTargetBranchView.remove(),
                        (this._dummyTargetBranchView = null));
                }
                if (this._targetView.type === a.VIEW_TYPE.BOUNDARY)
                    this._targetView.selectBox.stateMachine.transition(
                        this._targetView.selectBox.event_edit_end
                    );
                (this.setEditingTargetOpacityInFilterMode(
                    a.FILTER_MODE_OPACITY
                ),
                    this.updateTargetView(null),
                    this.semaphoreModule.decrease(a.UI_STATUS.EDIT_TITLE, {
                        forceFlush: !0,
                    }));
            }
            _moveViewPortIfOutOfScreen() {
                const e = this._inputElement.getBoundingClientRect(),
                    t = this._context
                        .getSVGView()
                        .svg.node.getBoundingClientRect(),
                    i = this._context.getModule(a.MODULE_NAME.MOVE_VIEW_PORT);
                let n = 0,
                    r = 0;
                (e.left < t.left && (n = t.left - e.left),
                    e.right > t.right && (n = t.right - e.right),
                    e.top < t.top && (r = t.top - e.top),
                    e.bottom > t.bottom && (r = t.bottom - e.bottom),
                    i.tryToMoveViewPort(n, r));
            }
            saveEdit() {
                this._hasEdited &&
                    (this._targetView.saveEdit(this._inputElement.value),
                    (this._hasEdited = !1));
            }
            isVisible() {
                return Number(this._inputElement.style.zIndex) > 0;
            }
            onFocus(e) {
                (e.preventDefault(),
                    e.stopPropagation(),
                    clearTimeout(this._deFocusTimer),
                    this.semaphoreModule.decrease(a.UI_STATUS.DE_FOCUS));
            }
            onInput(e) {
                if (this.isAddingRelationship()) return;
                if (!this.isVisible()) {
                    if ('insertText' === e.inputType && ' ' === e.data)
                        return e.preventDefault();
                    (this.updateTargetView(this.getTargetFromSelection()),
                        this._targetView
                            ? this.show(null, this._targetView)
                            : e.preventDefault());
                }
                if ('insertText' === e.inputType && !e.data && !this._hasEdited)
                    return;
                ((this._hasEdited = !0),
                    this._targetView && this.updateTextClientSize());
                const t = this._context.config(a.CONFIG.INPUT_HANDLER);
                'function' == typeof t && t(e).then(() => {});
            }
            getTargetFromSelection() {
                return this._context
                    .getModule(a.MODULE_NAME.SELECTION)
                    .getSelections()
                    .filter((e) => {
                        const t = e.type;
                        return (
                            -1 !==
                                [
                                    a.VIEW_TYPE.BRANCH,
                                    a.VIEW_TYPE.RELATIONSHIP,
                                    a.VIEW_TYPE.MATRIX_LABEL,
                                ].indexOf(t) ||
                            (a.VIEW_TYPE.BOUNDARY === t
                                ? !e.shouldPreventTitle()
                                : void 0)
                        );
                    })[0];
            }
            onBlur(e) {
                this._deFocusTimer = setTimeout(() => {
                    this._context.config(
                        a.CONFIG.NO_ALWAYS_FOCUS_EDITRECEIVER
                    ) || this.semaphoreModule.increase(a.UI_STATUS.DE_FOCUS);
                }, 200);
                const t = this.isVisible(),
                    i = this._context.config(
                        a.CONFIG.NO_HANDLE_EDIT_RECEIVER_BLUR
                    );
                !t ||
                    ('function' == typeof i && i()) ||
                    (this.saveEdit(), this._setHideStyle());
            }
            onKeyDown(e) {
                const t = e.keyCode,
                    i = {
                        hasAlt: e.altKey,
                        hasShift: e.shiftKey,
                        hasCtrl: e.ctrlKey,
                        hasMeta: e.metaKey,
                    },
                    n = 13,
                    r = 9,
                    o = 90,
                    s = 27,
                    c = 32,
                    d = 229,
                    f =
                        this._context.config(a.CONFIG.KEYBINDING_SERVICE)(
                            t,
                            i
                        ) ||
                        ((t, i) => {
                            switch (t) {
                                case n:
                                    return () => {
                                        if (this.isVisible() && !i.hasShift) {
                                            if (
                                                i.hasCtrl ||
                                                (i.hasMeta &&
                                                    Object(l.browserIsMac)())
                                            )
                                                return (
                                                    document.execCommand(
                                                        'insertText',
                                                        !1,
                                                        '\n'
                                                    ),
                                                    (this._hasEdited = !0),
                                                    void this.updateTextClientSize()
                                                );
                                            (e.stopPropagation(),
                                                e.preventDefault(),
                                                this.saveEdit(),
                                                this._setHideStyle(),
                                                this._context.config(
                                                    a.CONFIG
                                                        .NO_ALWAYS_FOCUS_EDITRECEIVER
                                                ) && this._inputElement.blur());
                                        }
                                    };
                                case r:
                                    return () => {
                                        this._inComposition
                                            ? (e.preventDefault(),
                                              e.stopPropagation())
                                            : this.isVisible()
                                              ? (e.preventDefault(),
                                                this.saveEdit(),
                                                this._setHideStyle())
                                              : e.preventDefault();
                                    };
                                case o:
                                    return () => {
                                        (i.hasMeta || i.hasCtrl) &&
                                            (this.isVisible() ||
                                                e.preventDefault());
                                    };
                                case s:
                                    return () => {
                                        this.isVisible() &&
                                            (e.stopPropagation(),
                                            e.preventDefault(),
                                            this.saveEdit(),
                                            this._setHideStyle());
                                    };
                                case c:
                                    return () => {
                                        if ('Unidentified' === e.key) return;
                                        if (this.isVisible()) return;
                                        const t = [
                                            a.VIEW_TYPE.BRANCH,
                                            a.VIEW_TYPE.BOUNDARY,
                                            a.VIEW_TYPE.RELATIONSHIP,
                                            a.VIEW_TYPE.MATRIX_LABEL,
                                        ];
                                        (this.updateTargetView(
                                            this.getTargetFromSelection()
                                        ),
                                            this._targetView &&
                                                t.includes(
                                                    this._targetView.type
                                                ) &&
                                                (e.preventDefault(),
                                                this.show(
                                                    this._targetView.getEditContent(),
                                                    this._targetView
                                                )));
                                    };
                                case d:
                                    return () => {
                                        if (this.isVisible()) return;
                                        if ('CapsLock' === e.key) return;
                                        const t = [
                                            a.VIEW_TYPE.BRANCH,
                                            a.VIEW_TYPE.BOUNDARY,
                                            a.VIEW_TYPE.RELATIONSHIP,
                                            a.VIEW_TYPE.MATRIX_LABEL,
                                        ];
                                        (this.updateTargetView(
                                            this.getTargetFromSelection()
                                        ),
                                            this._targetView &&
                                                t.includes(
                                                    this._targetView.type
                                                ) &&
                                                this.show(
                                                    null,
                                                    this._targetView
                                                ));
                                    };
                                default:
                                    return null;
                            }
                        })(t, i);
                (f && f(),
                    t === n &&
                        (!this.isVisible() ||
                            (this.isVisible() && !i.hasShift)) &&
                        e.preventDefault());
            }
            onCopy(e) {
                this.isVisible() ||
                    (e.preventDefault(), this.trigger('copy', e));
            }
            onPaste(e) {
                this.isVisible() ||
                    (e.preventDefault(), this.trigger('paste', e));
            }
            onCut(e) {
                this.isVisible() ||
                    (e.preventDefault(), this.trigger('cut', e));
            }
            onCompositionEvent(e) {
                this._inComposition = e;
            }
            _prepareSelect() {
                ((this._inputElement.value = ''), this._inputElement.select());
            }
            hide(e) {
                (e || this.saveEdit(), this._setHideStyle());
            }
            getInputDOM() {
                return this._inputElement;
            }
            _locateInputByCurrentSelection() {
                if (this._context.isHibernating()) return;
                const e = this._context.getModule(a.MODULE_NAME.SELECTION);
                if (!e) return;
                const t =
                    e.getSelections()[0] ||
                    this._context.getSheetView().getCentralBranchView();
                t &&
                    m.includes(t.type) &&
                    setTimeout(() => {
                        (null == t ? void 0 : t.getContext()) &&
                            (this.isVisible() ||
                                (this.updateTargetView(t),
                                this.updateInputPosition()));
                    }, 0);
            }
            enableInput() {
                this._inputElement.removeAttribute('readonly');
            }
            disableInput() {
                this._inputElement.setAttribute('readonly', 'true');
            }
            isAddingRelationship() {
                return this.semaphoreModule.isStatusActive(
                    a.UI_STATUS.ADD_RELATIONSHIP
                );
            }
            getTitleMaxWidth() {
                var e;
                let t = T;
                if (this._targetView instanceof h.a) {
                    const i = this._targetView.topicView.figure;
                    (i.customWidth || i.forceAlignmentWidth) &&
                        (t =
                            (null ===
                                (e = this._targetView.topicView.titleView) ||
                            void 0 === e
                                ? void 0
                                : e.figure.size.width) || T);
                }
                return t;
            }
            repairPosition() {
                var e;
                (null === (e = this._targetView) || void 0 === e
                    ? void 0
                    : e.getContext()) && this.updateInputPosition();
            }
        }
        L.identifier = a.MODULE_NAME.EDIT_RECEIVER;
    },
];
