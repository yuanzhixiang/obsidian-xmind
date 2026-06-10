export default [
    function (e, t, i) {
        'use strict';
        var n = {};
        (i.r(n),
            i.d(n, 'viewType', function () {
                return b;
            }),
            i.d(n, 'events', function () {
                return C;
            }),
            i.d(n, 'eventHandlers', function () {
                return L;
            }));
        var r = {};
        (i.r(r),
            i.d(r, 'viewType', function () {
                return M;
            }),
            i.d(r, 'events', function () {
                return A;
            }),
            i.d(r, 'eventHandlers', function () {
                return v;
            }));
        var o = {};
        (i.r(o),
            i.d(o, 'viewType', function () {
                return _;
            }),
            i.d(o, 'events', function () {
                return O;
            }),
            i.d(o, 'eventHandlers', function () {
                return S;
            }));
        var a = {};
        (i.r(a),
            i.d(a, 'viewType', function () {
                return x;
            }),
            i.d(a, 'events', function () {
                return R;
            }),
            i.d(a, 'eventHandlers', function () {
                return I;
            }));
        var s = {};
        (i.r(s),
            i.d(s, 'viewType', function () {
                return N;
            }),
            i.d(s, 'events', function () {
                return w;
            }),
            i.d(s, 'eventHandlers', function () {
                return P;
            }));
        var l = {};
        (i.r(l),
            i.d(l, 'viewType', function () {
                return H;
            }),
            i.d(l, 'events', function () {
                return D;
            }),
            i.d(l, 'eventHandlers', function () {
                return F;
            }));
        var c = {};
        (i.r(c),
            i.d(c, 'viewType', function () {
                return k;
            }),
            i.d(c, 'events', function () {
                return B;
            }),
            i.d(c, 'eventHandlers', function () {
                return V;
            }));
        var d = {};
        (i.r(d),
            i.d(d, 'viewType', function () {
                return G;
            }),
            i.d(d, 'events', function () {
                return U;
            }),
            i.d(d, 'eventHandlers', function () {
                return j;
            }));
        var f = {};
        (i.r(f),
            i.d(f, 'viewType', function () {
                return $;
            }),
            i.d(f, 'events', function () {
                return z;
            }),
            i.d(f, 'eventHandlers', function () {
                return W;
            }));
        var h = {};
        (i.r(h),
            i.d(h, 'viewType', function () {
                return K;
            }),
            i.d(h, 'events', function () {
                return Z;
            }),
            i.d(h, 'eventHandlers', function () {
                return J;
            }));
        var p = {};
        (i.r(p),
            i.d(p, 'viewType', function () {
                return q;
            }),
            i.d(p, 'events', function () {
                return ee;
            }),
            i.d(p, 'eventHandlers', function () {
                return te;
            }));
        var T = {};
        (i.r(T),
            i.d(T, 'viewType', function () {
                return oe;
            }),
            i.d(T, 'events', function () {
                return ae;
            }),
            i.d(T, 'eventHandlers', function () {
                return se;
            }));
        var u = {};
        (i.r(u),
            i.d(u, 'viewType', function () {
                return le;
            }),
            i.d(u, 'events', function () {
                return ce;
            }),
            i.d(u, 'eventHandlers', function () {
                return de;
            }));
        var g = {};
        (i.r(g),
            i.d(g, 'viewType', function () {
                return fe;
            }),
            i.d(g, 'events', function () {
                return he;
            }),
            i.d(g, 'eventHandlers', function () {
                return pe;
            }));
        var Q = {};
        (i.r(Q),
            i.d(Q, 'viewType', function () {
                return ue;
            }),
            i.d(Q, 'events', function () {
                return ge;
            }),
            i.d(Q, 'eventHandlers', function () {
                return Qe;
            }));
        var m = i(0);
        const b = m.VIEW_TYPE.BOUNDARY,
            C = {
                mouseover: 'onMouseOver',
                mouseout: 'onMouseOut',
                mouseup: 'onMouseup',
                mousedown: 'onMouseDown',
                contextmenu: 'onContextMenu',
                press: 'onPress',
                pressup: 'onPressUp',
            },
            L = {
                onMouseOver() {
                    (this.getContext().isReadOnly() &&
                        !this.config(m.CONFIG.ENABLE_SELECT_IN_READONLY)) ||
                        this.isSelected ||
                        this.getContext()
                            .getActiveUIStatus()
                            .includes(m.UI_STATUS.DRAG_TOPIC_SELECT_BOX) ||
                        (this.selectBox.show().transparent(!0),
                        this.selectBox.stateMachine.transition(
                            this.selectBox.event_hover
                        ));
                },
                onMouseOut(e) {
                    (e.stopPropagation(),
                        this.isSelected ||
                            (this.selectBox.hide(),
                            this.selectBox.stateMachine.transition(
                                this.selectBox.event_out
                            )));
                },
                onMouseDown(e) {
                    if ((e.stopPropagation(), 3 === e.which))
                        return this._dispatchContextMenu(e);
                },
                onMouseup(e) {
                    this.editDomain().eventBus.trigger('boundaryMouseUp', this);
                },
                onPress(e) {
                    (e.stopPropagation(), this._pressContextMenuCheckHandle());
                },
                onContextMenu(e) {
                    (e.preventDefault(),
                        e.stopPropagation(),
                        100 !== e.detail && e.stopImmediatePropagation());
                },
                onPressUp(e) {
                    (e.stopPropagation(), this._dispatchContextMenu(e));
                },
            };
        var y = i(53);
        const M = m.VIEW_TYPE.BRANCH,
            A = {
                dblclick: 'onDblClick',
                mouseover: 'onMouseover',
                mouseout: 'onMouseout',
                mouseup: 'onMouseup',
                mousedown: 'onMousedown',
                contextmenu: 'onContextMenu',
                press: 'onPress',
                pressup: 'onPressUp',
            },
            v = {
                onDblClick(e) {
                    if (
                        (e && e.stopPropagation(),
                        e &&
                            'collapse-extend-hover-area' ===
                                e.target.getAttribute('data-name'))
                    )
                        return;
                    const t = this.editDomain();
                    t &&
                        t.selectionManager &&
                        t.selectionManager.selectSingle(this);
                },
                onMouseover(e) {
                    this.getContext().config(
                        m.CONFIG.DISABLE_PRESELECTION_BOX
                    ) ||
                        this.getContext()
                            .getActiveUIStatus()
                            .includes(m.UI_STATUS.DRAG_TOPIC_SELECT_BOX) ||
                        this.isSelected ||
                        (e &&
                            'collapse-extend-hover-area' !==
                                e.target.getAttribute('data-name') &&
                            this.getProxy().displayHover(),
                        this.collapseExtendView &&
                            this.getProxy() === this &&
                            this.collapseExtendView.hover(),
                        this.editDomain().eventBus.trigger(
                            'branchMouseOver',
                            this
                        ));
                },
                onMouseout(e) {
                    (this.isSelected || this.getProxy().displayDehover(),
                        this.editDomain().eventBus.trigger(
                            'branchMouseOut',
                            this
                        ));
                },
                onMouseup(e) {
                    (e &&
                        'collapse-extend-hover-area' ===
                            e.target.getAttribute('data-name')) ||
                        this.editDomain().eventBus.trigger(
                            'branchMouseUp',
                            this
                        );
                },
                onMousedown(e) {
                    if ((e.stopPropagation(), this.originBranchView))
                        return e.preventDefault();
                    if (
                        e &&
                        'collapse-extend-hover-area' ===
                            e.target.getAttribute('data-name')
                    )
                        return;
                    if (3 === e.which && !Object(y.a)(this.getContext()))
                        return this._dispatchContextMenu(e);
                    if (1 !== e.which) return;
                    if (
                        e &&
                        'topic-custom-width-control-bar' ===
                            e.target.getAttribute('data-name')
                    )
                        return;
                    if (
                        this.isCentralBranch() ||
                        this === this.sheetView.activatedTopBranchView
                    ) {
                        const t = this.getModule(m.MODULE_NAME.MOVE_VIEW_PORT);
                        return void (t && t.onDragViewPort(e, this));
                    }
                    if (this.isSummaryBranch() || this.originBranchView) return;
                    const t = this.getModule(m.MODULE_NAME.DRAG);
                    t && t.prepareStartDrag(e, this);
                },
                onContextMenu(e) {
                    (e.preventDefault(),
                        e.stopPropagation(),
                        100 !== e.detail && e.stopImmediatePropagation());
                },
                onPress(e) {
                    if (
                        (e.stopPropagation(),
                        !(
                            (e &&
                                'collapse-extend-hover-area' ===
                                    e.target.getAttribute('data-name')) ||
                            (this._pressContextMenuCheckHandle(),
                            this.isCentralBranch() || this.isSummaryBranch())
                        ))
                    ) {
                        const t = this.getModule(m.MODULE_NAME.ANIMATION);
                        null == t ||
                            t.startAnimation(m.ANIMATION_FLAGS.BRANCH_ZOOM_IN, {
                                target: this,
                            });
                        const i = this.getModule(m.MODULE_NAME.DRAG);
                        i && i.prepareStartDrag(e, this);
                    }
                },
                onPressUp(e) {
                    e.stopPropagation();
                    const t = this.getModule(m.MODULE_NAME.ANIMATION);
                    (null == t ||
                        t.reverseAnimationByFlag(
                            m.ANIMATION_FLAGS.BRANCH_ZOOM_IN
                        ),
                        this._dispatchContextMenu(e));
                },
            };
        var E = i(3);
        const _ = m.VIEW_TYPE.COLLAPSE_EXTEND,
            O = {
                click: 'onClick',
                mousedown: 'onMouseDown',
                dblclick: 'onDblClick',
                mouseover: 'onMouseover',
                mouseout: 'onMouseout',
            },
            S = {
                onClick(e) {
                    if (e.altKey) {
                        const e = [
                                this.model,
                                ...this.model.getDescendantList(),
                            ],
                            t = this.model.isCollapse()
                                ? 'extendBranch'
                                : 'collapseBranch';
                        e.forEach((e) => {
                            e[t]();
                        });
                    } else this.model.toggleCollapse();
                },
                onDblClick(e) {
                    return (e.stopPropagation(), !1);
                },
                onMouseover(e) {
                    (this.figure.setFillColor(
                        E.a.getStyleValue(
                            this.parent().parent(),
                            m.STYLE_KEYS.LINE_COLOR
                        )
                    ),
                        this.figure.setFillOpacity(0.15));
                },
                onMouseout(e) {
                    (this.figure.setFillColor('none'),
                        this.figure.setFillOpacity(null));
                },
            },
            x = m.VIEW_TYPE.CONNECTION,
            R = {
                click: 'onClick',
                mouseover: 'onMouseover',
                mouseout: 'onMouseout',
            },
            I = {
                onClick(e) {
                    this.editDomain().selectionManager.selectSingle(
                        this.endBranch
                    );
                },
                onMouseover(e) {
                    this.endBranch.onMouseover(e);
                },
                onMouseout(e) {
                    this.endBranch.onMouseout(e);
                },
            },
            N = m.VIEW_TYPE.IMAGE,
            w = {
                mousedown: 'onMousedown',
                dblclick: 'onDblClick',
                mouseover: 'onMouseover',
                mouseout: 'onMouseout',
                mouseup: 'onMouseup',
                contextmenu: 'onContextMenu',
                press: 'onPress',
                pressup: 'onPressUp',
            },
            P = {
                onMouseover(e) {
                    (e.stopPropagation(),
                        this.resizeBox.isActive ||
                            1 === e.which ||
                            this.resizeBox.show());
                },
                onMouseout(e) {
                    (e.stopPropagation(),
                        !this.resizeBox.isActive && this.resizeBox.hide(),
                        this.isSelected || this.resizeBox.hide());
                },
                onDblClick(e) {
                    e.stopPropagation();
                },
                onMouseup(e) {
                    e.stopPropagation();
                },
                onMousedown(e) {
                    var t;
                    if (
                        (e.stopPropagation(),
                        3 === e.which && !Object(y.a)(this.getContext()))
                    )
                        return this._dispatchContextMenu(e);
                    if (1 !== e.which) return;
                    if (this.parent().parent().originBranchView) return;
                    const i = e.target || e.srcElement;
                    if (
                        'image' === i.nodeName ||
                        'fullBox' === i.getAttribute('data-name')
                    ) {
                        const t = this.getModule(m.MODULE_NAME.DRAG);
                        t && t.prepareStartDrag(e, this);
                    }
                    'web-video-interact-button' ===
                        i.getAttribute('data-name') &&
                        this.getContext().trigger(
                            m.EVENTS.WEB_VIDEO_INTERACT_BUTTON_CLICKED,
                            {
                                target: this,
                                originalUrl:
                                    null === (t = this.parent()) || void 0 === t
                                        ? void 0
                                        : t.model.getWebVideoOriginalUrl(),
                            }
                        );
                },
                onPress(e) {
                    if (
                        (e.stopPropagation(),
                        this._pressContextMenuCheckHandle(),
                        this.parent().parent().originBranchView)
                    )
                        return;
                    const t = e.target || e.srcElement;
                    if (
                        'image' === t.nodeName ||
                        'fullBox' === t.getAttribute('data-name')
                    ) {
                        const t = this.getModule(m.MODULE_NAME.DRAG);
                        t && t.prepareStartDrag(e, this);
                    }
                },
                onContextMenu(e) {
                    (e.preventDefault(),
                        e.stopPropagation(),
                        100 !== e.detail && e.stopImmediatePropagation());
                },
                onPressUp(e) {
                    (e.stopPropagation(), this._dispatchContextMenu(e));
                },
            },
            H = m.VIEW_TYPE.INFORMATION_ICON,
            D = {
                dblclick: 'onDblClick',
                mousedown: 'onMousedown',
                mouseover: 'onMouseover',
                mouseout: 'onMouseout',
                contextmenu: 'onContextMenu',
                press: 'onPress',
                pressup: 'onPressUp',
            },
            F = {
                onDblClick(e) {
                    e && e.stopPropagation();
                },
                onMousedown(e) {
                    if ((e.stopPropagation(), 3 === e.which))
                        return this._dispatchContextMenu(e);
                },
                onContextMenu(e) {
                    (e.preventDefault(),
                        e.stopPropagation(),
                        100 !== e.detail && e.stopImmediatePropagation());
                },
                onMouseover(e) {
                    this._hovering ||
                        this.getContext()
                            .getActiveUIStatus()
                            .includes(m.UI_STATUS.DRAG_TOPIC_SELECT_BOX) ||
                        ((this._hovering = !0),
                        this.figure.setSelectionAttr({
                            display: '',
                        }));
                },
                onMouseout(e) {
                    ((this._hovering = !1),
                        this.figure.setSelectionAttr({
                            display: 'none',
                        }));
                },
                onPress(e) {
                    e.stopPropagation();
                },
                onPressUp(e) {
                    (e.stopPropagation(), this._dispatchContextMenu(e));
                },
            },
            k = m.VIEW_TYPE.LABEL,
            B = { mouseover: 'onMouseover', click: 'onClick' },
            V = {
                onMouseover(e) {
                    e.stopPropagation();
                },
            };
        var Y = i(1);
        const G = m.VIEW_TYPE.LABELUNIT,
            U = {
                click: 'onClick',
                mousedown: 'onMousedown',
                mouseover: 'onMouseover',
                mouseenter: 'onMouseenter',
                mouseout: 'onMouseout',
                contextmenu: 'onContextMenu',
                press: 'onPress',
            },
            j = {
                onClick(e) {
                    e.stopPropagation();
                },
                onMouseover(e) {
                    e.stopPropagation();
                    const t = this.getContext();
                    if (
                        t
                            .getActiveUIStatus()
                            .includes(m.UI_STATUS.DRAG_TOPIC_SELECT_BOX)
                    )
                        return;
                    const i = t.getSheetView().getBlendingBackgroundColor(),
                        n =
                            Object(Y.getInjectModule)(
                                m.MODULE_NAME.SNOWBALL
                            ).snowballUtil.hexStringToHSLObject(i).l < 50;
                    (this.figure.setBackgroudAttr({
                        fill: 'rgba(255, 255, 255, 0.7)',
                        stroke: n
                            ? 'rgba(255, 255, 255, 1)'
                            : 'rgba(0, 0, 0, 0.3)',
                        'stroke-width': 1,
                    }),
                        this.figure.setTextAttr({
                            color: '#434b54',
                        }));
                },
                onMouseout() {
                    (this.figure.setBackgroudAttr({
                        fill: 'rgba(255, 255, 255, 0.7)',
                        stroke: 'rgba(0, 0, 0, 0.1)',
                    }),
                        this.figure.setTextAttr({
                            color: '#434b54',
                        }));
                },
                onMouseenter(e) {
                    e.stopPropagation();
                },
                onPress(e) {
                    e.stopPropagation();
                },
                onMousedown(e) {
                    e.stopPropagation();
                },
                onContextMenu(e) {
                    e.stopPropagation();
                },
            },
            $ = m.VIEW_TYPE.LEGEND,
            z = { dblclick: 'onDbClick' },
            W = {
                onDbClick(e) {
                    e.stopPropagation();
                },
            },
            K = m.VIEW_TYPE.LEGENDMARKERLIST,
            Z = { dblclick: 'onDbClick' },
            J = {};
        var X = i(89);
        const q = m.VIEW_TYPE.MATRIX_LABEL,
            ee = {
                mousedown: 'onMouseDown',
                mouseover: 'onMouseOver',
                mouseout: 'onMouseOut',
            },
            te = {
                onMouseDown(e) {
                    (1 === e.which || e.isPress) &&
                        this.getModule(m.MODULE_NAME.DRAG).prepareStartDrag(
                            e,
                            this
                        );
                },
                onMouseOver() {
                    this.isSelected ||
                        (this.getProxy() && this.getProxy().displayHover());
                },
                onMouseOut() {
                    this.isSelected ||
                        (this.getProxy() && this.getProxy().displayDehover());
                },
            };
        var ie = i(33),
            ne = i(11);
        const { isMobile: re } = ne.a,
            oe = m.VIEW_TYPE.MATRIX_CELL,
            ae = {
                dblclick: 'onDoubleClick',
                doubletap: 'onDoubleTap',
            },
            se = {
                onDoubleClick(e) {
                    if (re) return;
                    const t = this._cellEvents[e.type];
                    if (!Object(ie.g)(t)) return t(e);
                    this.isNull ||
                        ('mouseover' === e.type
                            ? this.displayHover()
                            : 'mouseout' === e.type && this.displayDehover());
                },
                onDoubleTap(e) {
                    const t = this._cellEvents[e.type];
                    if (!Object(ie.g)(t)) return t(e);
                },
            },
            le = m.VIEW_TYPE.MATRIX_PLUS,
            ce = { click: 'onClick', tap: 'onTap' },
            de = {
                onClick(e) {
                    this._clickEvent(e);
                },
                onTap(e) {
                    this._clickEvent(e);
                },
            },
            fe = m.VIEW_TYPE.RELATIONSHIP,
            he = {
                dblclick: 'onDblClick',
                mouseover: 'onMouseover',
                mouseout: 'onMouseout',
                mouseup: 'onMouseup',
                mousedown: 'onMouseDown',
                contextmenu: 'onContextMenu',
                press: 'onPress',
                pressup: 'onPressUp',
            },
            pe = {
                onDblClick(e) {
                    return (e.stopPropagation(), !1);
                },
                onMouseover(e) {
                    if (
                        (e.stopPropagation(),
                        !this.getContext().isReadOnly() ||
                            this.config(m.CONFIG.ENABLE_SELECT_IN_READONLY))
                    ) {
                        if (
                            this.getContext()
                                .getActiveUIStatus()
                                .includes(m.UI_STATUS.DRAG_TOPIC_SELECT_BOX)
                        )
                            return !1;
                        switch (
                            ((this.isHovering = !0),
                            this._updateState(),
                            e.target.getAttribute('data-name'))
                        ) {
                            case 'shadow-startPoint-1':
                                this.setIsHoveringStartPoint1(!0);
                                break;
                            case 'shadow-startPoint-2':
                                this.setIsHoveringStartPoint2(!0);
                                break;
                            case 'shadow-controlPoint-1':
                                this.setIsHoveringControlPoint1(!0);
                                break;
                            case 'shadow-controlPoint-2':
                                this.setIsHoveringControlPoint2(!0);
                        }
                        return !1;
                    }
                },
                onMouseout(e) {
                    switch (
                        (e.stopPropagation(),
                        (this.isHovering = !1),
                        this._updateState(),
                        e.target.getAttribute('data-name'))
                    ) {
                        case 'shadow-startPoint-1':
                            this.setIsHoveringStartPoint1(!1);
                            break;
                        case 'shadow-startPoint-2':
                            this.setIsHoveringStartPoint2(!1);
                            break;
                        case 'shadow-controlPoint-1':
                            this.setIsHoveringControlPoint1(!1);
                            break;
                        case 'shadow-controlPoint-2':
                            this.setIsHoveringControlPoint2(!1);
                    }
                    return !1;
                },
                onMouseup(e) {},
                onMousemove(e) {
                    return (e.stopPropagation(), !1);
                },
                onMouseDown(e) {
                    if ((e.stopPropagation(), 3 === e.which))
                        return this._dispatchContextMenu(e);
                },
                onContextMenu(e) {
                    (e.preventDefault(),
                        e.stopPropagation(),
                        100 !== e.detail && e.stopImmediatePropagation());
                },
                onPress(e) {
                    (e.stopPropagation(), this._pressContextMenuCheckHandle());
                },
                onPressUp(e) {
                    (e.stopPropagation(), this._dispatchContextMenu(e));
                },
            };
        var Te = i(127);
        const ue = m.VIEW_TYPE.MATH_JAX,
            ge = {
                mouseover: 'onMouseOver',
                mouseout: 'onMouseOut',
                mousedown: 'onMouseDown',
                mouseup: 'onMouseUp',
                contextmenu: 'onContextMenu',
                press: 'onPress',
                pressup: 'onPressUp',
            },
            Qe = {
                onMouseOver(e) {
                    (e.stopPropagation(),
                        this.resizeBox.isActive || this.resizeBox.show());
                },
                onMouseOut(e) {
                    (e.stopPropagation(),
                        (this.resizeBox.isActive && this.isSelected) ||
                            this.resizeBox.hide());
                },
                onMouseUp(e) {
                    e.stopPropagation();
                },
                onMouseDown(e) {
                    if ((e.stopPropagation(), 3 === e.which))
                        return this._dispatchContextMenu(e);
                    if (1 !== e.which && !Object(y.a)(this.getContext()))
                        return;
                    if (this.parent().parent().originBranchView) return;
                    const t = this.getModule(m.MODULE_NAME.DRAG);
                    t && t.prepareStartDrag(e, this);
                },
                onContextMenu(e) {
                    (e.preventDefault(),
                        e.stopPropagation(),
                        100 !== e.detail && e.stopImmediatePropagation());
                },
                onPress(e) {
                    if (
                        (e.stopPropagation(),
                        this.parent().parent().originBranchView)
                    )
                        return;
                    const t = this.getModule(m.MODULE_NAME.DRAG);
                    t && t.prepareStartDrag(e, this);
                },
                onPressUp(e) {
                    (e.stopPropagation(), this._dispatchContextMenu(e));
                },
            },
            me = [n, r, o, a, s, l, c, d, f, h, X, p, T, u, g, Te, Q];
        t.a = me;
    },
];
