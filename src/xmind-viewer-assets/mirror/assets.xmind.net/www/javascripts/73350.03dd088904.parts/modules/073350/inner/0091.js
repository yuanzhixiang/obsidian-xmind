export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return C;
        });
        var n = i(0),
            r = i(18),
            o = i(14),
            a = i(1),
            s = i(21),
            l = i(9),
            c = i(40),
            d = i(17),
            f = i(3);
        const { CROSSBOUNDARYLEN: h } = l.a,
            p = '#ffffff',
            T = l.a.TOPIC_SELECTBOX_STROKE_WIDTH,
            u = '#2ebdff',
            g = '#9f9f9f',
            Q = l.a.TOPIC_SELECTBOX_PADDING,
            m = l.a.TOPIC_SELECTBOX_PADDING,
            b = l.a.TOPIC_SELECTBOX_RADIUS;
        class C extends s.a {
            constructor({ refView: e }) {
                (super(),
                    (this.sbEvents = {
                        click: 'onClick',
                        mouseover: 'onMouseOver',
                    }),
                    (this.direction = n.DIRECTION.UP),
                    (this.rangeStart = 0),
                    (this.rangeEnd = 0),
                    (this.isClickAddTitleButtonEventInit = !1),
                    (this.isDragEventsInit = !1),
                    (this.relationBranch = {}),
                    (this.refView = e),
                    (this.figure = r.a.createFigure(this)),
                    (this.relationBranch = {}),
                    (this.figure = r.a.createFigure(this)),
                    this.initSVGStructure(),
                    this.parent(this.refView),
                    this.listenTo(this.refView, 'afterSizeChange', () =>
                        this.render()
                    ),
                    this.listenTo(this.refView, 'afterRealPosChange', () =>
                        this.render()
                    ),
                    this.refView instanceof c.a &&
                        this.listenTo(
                            this.refView.model,
                            'changeStyle',
                            (e) => {
                                e === n.STYLE_KEYS.LINE_WIDTH && this.render();
                            }
                        ),
                    (this.stateMachine = new a.StateMachine()),
                    this.initStateMachine());
            }
            get type() {
                return n.VIEW_TYPE.SELECTBOX;
            }
            get figureType() {
                return n.FIGURE_TYPE.SELECT_BOX;
            }
            initStateMachine() {
                const e = this.stateMachine,
                    t = e.newState('NORAML'),
                    i = e.newState('HOVER'),
                    n = e.newState('SELECT'),
                    r = e.newState('DEFOCUS'),
                    o = e.newState('DRAG'),
                    a = e.newState('EDIT'),
                    s = e.newEvent('DESELECT'),
                    l = e.newEvent('SELECT'),
                    c = e.newEvent('DEFOCUS'),
                    d = e.newEvent('HOVER'),
                    f = e.newEvent('OUT'),
                    h = e.newEvent('DRAG'),
                    p = e.newEvent('DRAG_END'),
                    T = e.newEvent('EDIT'),
                    u = e.newEvent('EDIT_END');
                (e.addTransition(t, d, i, () => {
                    this.toHoverState();
                }),
                    e.addTransition(t, l, n, () => {
                        this.toSelectState();
                    }),
                    e.addTransition(i, l, n, () => {
                        this.toSelectState();
                    }),
                    e.addTransition(n, s, t, () => {
                        (this.hideControlBar(), this.hideAddTitleButton());
                    }),
                    e.addTransition(i, f, t, () => {
                        (this.hideControlBar(),
                            '' === this.refView.getEditContent()
                                ? this.showAddTitleButton()
                                : this.hideAddTitleButton());
                    }),
                    e.addTransition(n, h, o, () => {
                        (this.showControlBar(), this.hideAddTitleButton());
                    }),
                    e.addTransition(n, c, r, () => {
                        (this.hideControlBar(),
                            this.hideAddTitleButton(),
                            this.setDefocusStateBoxStyle());
                    }),
                    e.addTransition(r, l, n, () => {
                        (this.setSelectStateBoxStyle(), this.toSelectState());
                    }),
                    e.addTransition(o, p, n, () => {
                        (this.showControlBar(),
                            '' === this.refView.getEditContent()
                                ? this.showAddTitleButton()
                                : this.hideAddTitleButton());
                    }),
                    e.addTransition(n, T, a, () => {
                        (this.showControlBar(), this.hideAddTitleButton());
                    }),
                    e.addTransition(a, u, n, () => {
                        (this.showControlBar(),
                            '' === this.refView.getEditContent()
                                ? this.showAddTitleButton()
                                : this.hideAddTitleButton());
                    }),
                    e.addTransition(a, s, t, () => {
                        (this.hideControlBar(), this.hideAddTitleButton());
                    }),
                    this.hideControlBar(),
                    this.hideAddTitleButton(),
                    e.setCurrentState(t),
                    (this.event_deselect = s),
                    (this.event_select = l),
                    (this.event_defocus = c),
                    (this.event_hover = d),
                    (this.event_out = f),
                    (this.event_drag = h),
                    (this.event_drag_end = p),
                    (this.event_edit = T),
                    (this.event_edit_end = u),
                    (this.state_normal = t),
                    (this.state_hover = i),
                    (this.state_select = n),
                    (this.state_defocus = r),
                    (this.state_drag = o),
                    (this.state_edit = a));
            }
            initSVGStructure() {
                const e = this.figure.renderWorker;
                ((this.selectBox = e.selectBox),
                    (this.selectBoxOneG = e.selectBoxOneG),
                    (this.selectBoxTwoG = e.selectBoxTwoG));
            }
            generateBoxPath(e) {
                const { width: t, height: i, x: n, y: r } = e;
                return (
                    'M ' +
                    (n - m + b) +
                    ' ' +
                    (r - Q) +
                    'L ' +
                    (n + t + m - b) +
                    ' ' +
                    (r - Q) +
                    'Q ' +
                    (n + t + m) +
                    ' ' +
                    (r - Q) +
                    '  ' +
                    (n + t + m) +
                    ' ' +
                    (r - Q + b) +
                    'L ' +
                    (n + t + m) +
                    ' ' +
                    (r + i + Q - b) +
                    'Q ' +
                    (n + t + m) +
                    ' ' +
                    (r + i + Q) +
                    '  ' +
                    (n + t + m - b) +
                    ' ' +
                    (r + i + Q) +
                    'L ' +
                    (n - m + b) +
                    ' ' +
                    (r + i + Q) +
                    'Q ' +
                    (n - m) +
                    ' ' +
                    (r + i + Q) +
                    '  ' +
                    (n - m) +
                    ' ' +
                    (r + i + Q - b) +
                    'L ' +
                    (n - m) +
                    ' ' +
                    (r - Q + b) +
                    'Q ' +
                    (n - m) +
                    ' ' +
                    (r - Q) +
                    '  ' +
                    (n - m + b) +
                    ' ' +
                    (r - Q) +
                    'z'
                );
            }
            generateHandlerPath(e) {
                let {
                        x: t,
                        y: i,
                        width: r,
                        height: o,
                    } = this.getSelectBoxSize(),
                    a = m,
                    s = Q;
                switch (e) {
                    case n.DIRECTION.UP:
                        ((s += 4),
                            (t -= a),
                            (i -= 2 * s),
                            (r += 2 * a),
                            (o = 2 * s));
                        break;
                    case n.DIRECTION.DOWN:
                        ((s += 4),
                            (t -= a),
                            (i += o),
                            (r += 2 * a),
                            (o = 2 * s));
                        break;
                    case n.DIRECTION.LEFT:
                        ((a += 4),
                            (t -= 2 * a),
                            (i -= s),
                            (r = 2 * a),
                            (o += 2 * s));
                        break;
                    case n.DIRECTION.RIGHT:
                        ((a += 4),
                            (t += r),
                            (i -= s),
                            (r = 2 * a),
                            (o += 2 * s));
                }
                return `M ${t + r} ${i} L ${t} ${i} L ${t} ${i + o} L ${t + r} ${i + o} Z`;
            }
            generateControlBarPath(e) {
                if (!e) return '';
                const t = this.getSelectBoxSize();
                let { width: i, height: r, x: o, y: a } = t;
                ((o -= m), (a -= Q), (i += 2 * m), (r += 2 * Q));
                const s = i / 2,
                    l = r / 2,
                    c = { x: 0, y: 0, width: 0, height: 0 };
                ((c.width = 7), (c.height = 7));
                const d = { x: 0, y: 0 },
                    f = { x: 0, y: 0 };
                switch (e) {
                    case n.DIRECTION.UP:
                        ((c.x = o + s),
                            (c.y = a),
                            (d.x = o + b),
                            (d.y = a),
                            (f.x = o + i - b),
                            (f.y = a));
                        break;
                    case n.DIRECTION.DOWN:
                        ((c.x = o + s),
                            (c.y = a + r),
                            (d.x = o + b),
                            (d.y = a + r),
                            (f.x = o + i - b),
                            (f.y = a + r));
                        break;
                    case n.DIRECTION.LEFT:
                        ((c.x = o),
                            (c.y = a + l),
                            (d.x = o),
                            (d.y = a + b),
                            (f.x = o),
                            (f.y = a + r - b));
                        break;
                    case n.DIRECTION.RIGHT:
                        ((c.x = o + i),
                            (c.y = a + l),
                            (d.x = o + i),
                            (d.y = a + b),
                            (f.x = o + i),
                            (f.y = a + r - b));
                }
                return (
                    (c.x -= c.width / 2),
                    (c.y -= c.height / 2),
                    `M ${c.x} ${c.y} L ${c.x} ${c.y + c.height} L ${c.x + c.height} ${c.y + c.height} L ${c.x + c.height} ${c.y} Z ` +
                        (e === n.DIRECTION.UP || e === n.DIRECTION.DOWN
                            ? `M ${d.x} ${d.y} L ${c.x} ${d.y} M ${c.x + 7} ${f.y} L ${f.x} ${f.y}`
                            : `M ${d.x} ${d.y} L ${d.x} ${c.y} M ${f.x} ${c.y + 7} L ${f.x} ${f.y}`)
                );
            }
            generateDragMovingBox(e, t, i = 0, n = 0) {
                const r = {
                    x: e.x + i,
                    y: e.y + n,
                    width: t.width,
                    height: t.height,
                };
                return this.generateBoxPath(r);
            }
            transparent(e) {
                return (this.figure.setTransparent(e), this);
            }
            hide() {
                return (this.figure.setVisible(!1, !0), this);
            }
            show() {
                return (this.figure.setVisible(!0, !0), this);
            }
            toHoverState() {
                (this.hideControlBar(), this.hideAddTitleButton());
            }
            toSelectState() {
                (this.showControlBar(),
                    '' === this.refView.getEditContent()
                        ? this.showAddTitleButton()
                        : this.hideAddTitleButton());
            }
            setDefocusStateBoxStyle() {
                this.figure.setSelectBoxAttrs({ stroke: g });
            }
            setSelectStateBoxStyle() {
                this.figure.setSelectBoxAttrs({ stroke: u });
            }
            hideControlBar() {
                (this.figure.setSelectBoxOneAttrs({ opacity: 0 }),
                    this.figure.setSelectBoxTwoAttrs({
                        opacity: 0,
                    }));
            }
            showControlBar() {
                (this.figure.setSelectBoxOneAttrs({ opacity: 1 }),
                    this.figure.setSelectBoxTwoAttrs({
                        opacity: 1,
                    }));
            }
            hideAddTitleButton() {
                this.figure.setAddTitleButtonAttrs({ opacity: 0 });
            }
            showAddTitleButton() {
                this.refView.type !== n.VIEW_TYPE.SUMMARY &&
                    ((this.refView.type === n.VIEW_TYPE.BOUNDARY &&
                        this.refView.shouldPreventTitle()) ||
                        this.figure.setAddTitleButtonAttrs({
                            opacity: 1,
                        }));
            }
            render() {
                const e = this.refView.parent().getDirection(),
                    t = this.refView;
                return e && t.parent()
                    ? ((this.direction = e),
                      this.setSelectRange(),
                      this.renderDraggableArea(),
                      this)
                    : this;
            }
            getRangeModel() {
                return this.refView instanceof d.a
                    ? this.refView.summaryModel
                    : this.refView.model;
            }
            isUpDownDirection() {
                return this.direction === n.DIRECTION.UPDOWN;
            }
            renderDraggableArea() {
                if (this.getRangeModel().getRange() === n.MASTER_RANGE) return;
                const e = this.getSelectBoxSize(),
                    t = this.generateBoxPath(e),
                    i =
                        Object(a.browserIsMobile)() ||
                        this.getContext().config(n.CONFIG.PLATFORM) ===
                            n.PLATFORMS.BROWNIE;
                let r, o, s, l;
                this.isUpDownDirection()
                    ? ((r = this.generateControlBarPath(n.DIRECTION.UP)),
                      (o = this.generateControlBarPath(n.DIRECTION.DOWN)),
                      i &&
                          ((s = this.generateHandlerPath(n.DIRECTION.UP)),
                          (l = this.generateHandlerPath(n.DIRECTION.DOWN))))
                    : ((r = this.generateControlBarPath(n.DIRECTION.LEFT)),
                      (o = this.generateControlBarPath(n.DIRECTION.RIGHT)),
                      i &&
                          ((s = this.generateHandlerPath(n.DIRECTION.LEFT)),
                          (l = this.generateHandlerPath(n.DIRECTION.RIGHT))));
                const c = this.isUpDownDirection()
                    ? 'row-resize'
                    : 'col-resize';
                (this.figure.setSelectBoxAttrs({
                    d: t,
                    'stroke-width': T,
                    stroke:
                        this.stateMachine.getCurrentState() ===
                        this.state_defocus
                            ? g
                            : u,
                    'stroke-opacity': 1,
                    fill: 'none',
                }),
                    this.figure.setSelectBoxOneAttrs({
                        d: r,
                        'stroke-width': T,
                        stroke: u,
                        fill: p,
                        cursor: c,
                    }),
                    this.figure.setSelectBoxTwoAttrs({
                        d: o,
                        'stroke-width': T,
                        stroke: u,
                        fill: p,
                        cursor: c,
                    }),
                    i &&
                        (this.figure.setDragHandlerAreaOneAttrs({
                            d: s,
                            fill: 'transparent',
                        }),
                        this.figure.setDragHandlerAreaTwoAttrs({
                            d: l,
                            fill: 'transparent',
                        })),
                    this.figure.setAddTitleButtonAttrs({
                        transform: `translate(${e.x + 2}  ${e.y - 16 - Q})`,
                    }),
                    this.registerAddTitleButtonOnClickEvent(),
                    this.registerDragEvents());
            }
            setSelectRange() {
                const e = this.getRangeModel();
                ((this.rangeStart = e.rangeStart),
                    (this.rangeEnd = e.rangeEnd));
            }
            getSelectBoxSize() {
                const e = this.refView;
                if (e instanceof c.a) {
                    const t =
                            e.figure.shapeClass === n.BOUNDARYSHAPE.CROSS
                                ? h
                                : 0,
                        i = parseInt(
                            `${f.a.getStyleValue(this.refView, n.STYLE_KEYS.LINE_WIDTH)}`
                        ),
                        r = e.titleView.figure.position,
                        o = e.getRealPosition() || e.position;
                    return {
                        width: e.size.width + i + 2 * t,
                        height: e.size.height + i + 2 * t,
                        x: o.x - i / 2 - t,
                        y: o.y - i / 2 - t + r.y,
                    };
                }
                {
                    const t = e.parent().getChildrenBranchesByType();
                    let i = Number.MAX_VALUE,
                        r = Number.MAX_VALUE,
                        o = Number.NEGATIVE_INFINITY,
                        a = Number.NEGATIVE_INFINITY;
                    for (let e = this.rangeStart; e <= this.rangeEnd; e++) {
                        const s = t[e],
                            l =
                                parseInt(
                                    `${f.a.getStyleValue(s, n.STYLE_KEYS.BORDER_LINE_WIDTH)}`
                                ) / 2;
                        ((i = Math.min(i, s.bounds.x + s.getRealPosition().x)),
                            (a = Math.max(
                                a,
                                s.bounds.x +
                                    s.getRealPosition().x +
                                    s.bounds.width +
                                    l
                            )),
                            (r = Math.min(
                                r,
                                s.bounds.y + s.getRealPosition().y
                            )),
                            (o = Math.max(
                                o,
                                s.bounds.y +
                                    s.getRealPosition().y +
                                    s.bounds.height +
                                    l
                            )),
                            s.topicView.figure.shapeClass ===
                                n.TOPICSHAPE.UNDERLINE &&
                                ((o -= l), (i -= l), (r -= l)));
                    }
                    return {
                        x: i,
                        y: r,
                        width: a - i,
                        height: o - r,
                    };
                }
            }
            registerAddTitleButtonOnClickEvent() {
                this.isClickAddTitleButtonEventInit ||
                    (this.refView instanceof c.a &&
                        (this.figure.renderWorker.addTitleButtonG.on(
                            'click',
                            () => {
                                this.refView
                                    .getModule(n.MODULE_NAME.EDIT_RECEIVER)
                                    .show(
                                        this.refView.getEditContent(),
                                        this.refView
                                    );
                            }
                        ),
                        (this.isClickAddTitleButtonEventInit = !0)));
            }
            registerDragEvents() {
                if (this.isDragEventsInit) return;
                if (this.getContext().isReadOnly()) return;
                const e = this.refView.parent();
                if (!(this.direction && e instanceof d.a)) return;
                const t = this.refView.getModule(n.MODULE_NAME.SVG_DRAGGABLE),
                    i =
                        t &&
                        t
                            .draggable(this.selectBoxOneG)
                            .dragStart(() => {
                                this.onDragStart(i, 1);
                            })
                            .dragMove((e) => {
                                this.onDragMoving(e.x, e.y, 1);
                            })
                            .dragEnd(() => {
                                this.onDragEnd();
                            }),
                    r =
                        t &&
                        t
                            .draggable(this.selectBoxTwoG)
                            .dragStart(() => {
                                this.onDragStart(r, 2);
                            })
                            .dragMove((e) => {
                                this.onDragMoving(e.x, e.y, 2);
                            })
                            .dragEnd(() => {
                                this.onDragEnd();
                            });
                this.isDragEventsInit = !0;
            }
            onDragStart(e, t) {
                const i = this.getDragMoveMaxDistance(),
                    r = 1 === t ? 'one' : 'two',
                    o = this.isUpDownDirection();
                e.updateConstraint({
                    x: !o,
                    y: o,
                    minX: i[r + 'GForwardMax'],
                    maxX: i[r + 'GBackMax'],
                    minY: i[r + 'GForwardMax'],
                    maxY: i[r + 'GBackMax'],
                });
                (this.refView
                    .callService(n.SERVICE_NAME.GET_VIEW_PORT_COVER)
                    .show()
                    .css('cursor', o ? 'row-resize' : 'col-resize'),
                    this.stateMachine.transition(this.event_drag));
            }
            onDragMoving(e, t, i) {
                const r = this.refView.getModule(n.MODULE_NAME.SELECT_DRAG);
                r.hasStarted() ||
                    r.trigger('start', this, this.refView, this.direction);
                this.refView
                    .parent()
                    .getChildrenBranchesByType()
                    .forEach((e) => {
                        o.a.isSelected(e, this, this.direction)
                            ? (r.trigger('addSelectedBranch', e),
                              (this.relationBranch[e.cid] = !0))
                            : (r.trigger('removeSelectedBranch', e),
                              delete this.relationBranch[e.cid]);
                    });
                const a = this.isUpDownDirection(),
                    s = a ? t : e,
                    l = 1 === i,
                    c = this.getSelectBoxSize(),
                    d = c.width,
                    f = c.height;
                let h, p;
                a
                    ? ((h = d), (p = l ? f - s : f + s))
                    : ((h = l ? d - s : d + s), (p = f));
                const T = l ? (a ? [0, s] : [s, 0]) : [],
                    u = this.generateDragMovingBox(
                        c,
                        { width: h, height: p },
                        ...T
                    );
                this.figure.setSelectBoxAttrs({ d: u });
            }
            onDragEnd() {
                this.refView
                    .callService(n.SERVICE_NAME.GET_VIEW_PORT_COVER)
                    .hide()
                    .css('cursor', '');
                const e = this.refView.getModule(n.MODULE_NAME.SELECT_DRAG);
                (e.hasStarted() && e.trigger('end'),
                    this.stateMachine.transition(this.event_drag_end));
            }
            getDragMoveMaxDistance() {
                const e = this.refView.parent().getChildrenBranchesByType(),
                    [t, i] = this.isUpDownDirection()
                        ? ['y', 'height']
                        : ['x', 'width'],
                    r = [],
                    o = [],
                    a = [],
                    s = [];
                e.forEach((e, l) => {
                    const c = e.getRealPosition(),
                        d = e.bounds,
                        f = parseInt(`${e.topicView.figure.borderWidth}`) / 2;
                    if (
                        (r.push(d[t] + c[t]),
                        o.push(d[t] + c[t] + d[i] + f),
                        this.rangeStart <= l && l <= this.rangeEnd)
                    ) {
                        a.push(d[t] + c[t]);
                        let r = d[t] + c[t] + d[i] + f;
                        (e.topicView.figure.shapeClass ===
                            n.TOPICSHAPE.UNDERLINE && (r -= f),
                            s.push(r));
                    }
                });
                const d = this.isUpDownDirection()
                        ? this.selectBoxOneG.bbox().height
                        : this.selectBoxOneG.bbox().width,
                    f = this.selectBox.bbox(),
                    h = this.isUpDownDirection() ? Q : m;
                let p =
                    Math.min(...r) -
                    f[t] -
                    l.a.TOPIC_SELECTBOX_STROKE_WIDTH / 2 -
                    2 * h;
                const T =
                        Math.max(...a) -
                        f[t] +
                        d -
                        l.a.TOPIC_SELECTBOX_STROKE_WIDTH / 2,
                    u =
                        Math.min(...s) -
                        f[t + '2'] +
                        l.a.TOPIC_SELECTBOX_STROKE_WIDTH / 2;
                let g =
                    Math.max(...o) -
                    f[t + '2'] +
                    d +
                    l.a.TOPIC_SELECTBOX_STROKE_WIDTH / 2 +
                    2 * h;
                return (
                    this.refView instanceof c.a &&
                        ((p = p - d - h), (g = g + d + h)),
                    {
                        oneGForwardMax: p,
                        oneGBackMax: T,
                        twoGForwardMax: u,
                        twoGBackMax: g,
                    }
                );
            }
            remove() {
                return (
                    this.figure.dispose(),
                    this.parent(null),
                    this.stopListening(),
                    this
                );
            }
            onClick() {
                return !1;
            }
        }
    },
];
