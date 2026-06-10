export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return d;
        });
        var n = i(0),
            r = i(12),
            o = i.n(r),
            a = i(6),
            s = i.n(a),
            l = i(26),
            c = i(8);
        class d extends l.View {
            constructor() {
                (super(...arguments),
                    (this.reactionDisposers = []),
                    (this.autoRunDisposers = []),
                    (this._parent = null),
                    (this._typeArr = null),
                    (this.isForcedInvisible = !1));
            }
            get figureType() {
                return null;
            }
            initSVGStructure() {}
            initEventsListener() {}
            parent(e) {
                if (void 0 === e) return this._parent;
                const t = this._parent;
                return (
                    t === e ||
                        (t && this.stopListening(t),
                        this.beforeAncestorChange(),
                        (this._parent = e),
                        this.afterAncestorChange(),
                        e &&
                            (this.listenTo(
                                e,
                                n.EVENTS.BEFORE_ANCESTOR_CHANGE,
                                this.beforeAncestorChange
                            ),
                            this.listenTo(
                                e,
                                n.EVENTS.AFTER_ANCESTOR_CHANGE,
                                this.afterAncestorChange
                            ))),
                    this
                );
            }
            addAutoRun(e) {
                this.autoRunDisposers.push(Object(c.autorun)(e));
            }
            addReaction(e, t) {
                this.reactionDisposers.push(Object(c.reaction)(e, t));
            }
            clearReactions() {
                (this.reactionDisposers.forEach((e) => e()),
                    this.autoRunDisposers.forEach((e) => e()));
            }
            beforeAncestorChange() {
                this.trigger(n.EVENTS.BEFORE_ANCESTOR_CHANGE);
            }
            afterAncestorChange() {
                this.trigger(n.EVENTS.AFTER_ANCESTOR_CHANGE);
            }
            updateModel2View() {
                var e;
                const t =
                    null === (e = this.model) || void 0 === e ? void 0 : e.id;
                if (t) {
                    const e = this.editDomain();
                    e && (e.model2View[t] = this);
                }
            }
            refreshStyles() {}
            setForcedInvisible(e) {
                this.isForcedInvisible = e;
                const t = this.isVisible && !this.isForcedInvisible;
                this.figure.setVisible(t, !0);
            }
            editDomain() {
                const e = this.parent();
                return e && e.editDomain ? e.editDomain() : null;
            }
            getContext() {
                const e = this.parent();
                return e && e.getContext ? e.getContext() : null;
            }
            getModule(...e) {
                const t = this.getContext();
                return t && t.getModule(...e);
            }
            getAdapter(e) {}
            setElement(e, ...t) {
                const { type: i, $el: n } = this;
                return (
                    (e.sbView = this),
                    i && (n && n.removeClass(i), o()(e).addClass(i)),
                    super.setElement(e, ...t)
                );
            }
            getNextEventTarget(e) {
                return e.parentNode;
            }
            callService(e, ...t) {
                const i = this.getContext();
                return i.callService.apply(i, [e, ...t]);
            }
            config(e, ...t) {
                return this.getContext().config(e, ...t);
            }
            isShowFashionStyle() {
                return this.getContext().isShowFashionStyle();
            }
            refreshColorStyles() {}
            refreshSkeletonStyles() {}
            style(e, t) {
                if (!(t in this._style)) throw 'class name not exist.';
                const i = e.__cls;
                if (i === t) return;
                let n = this._style[t];
                const r = this._style[i] || {},
                    [o] = t.split('__'),
                    a = this._style[o] || {};
                n = Object.assign({}, a, n);
                for (const e in r) e in n || (n[e] = null);
                (e.attr(n), (e.__cls = t));
            }
            get _style() {
                return {};
            }
            killAnimationByFlag(e) {
                const t = this.getModule(n.MODULE_NAME.ANIMATION);
                t && t.killAnimationByFlag(e);
            }
            isTypeOf(e) {
                return -1 !== this.getTypeList().indexOf(e);
            }
            getTypeList() {
                if (!this._typeArr) {
                    let e = this;
                    const t = [];
                    for (; e.type; )
                        (t.push(e.type), (e = Object.getPrototypeOf(e)));
                    this._typeArr = s.a.uniq(t);
                }
                return this._typeArr.slice();
            }
            _dispatchContextMenu(e) {
                let t;
                const i = { bubbles: !0, detail: 100 };
                if ('mouseup' === e.type || 'mousedown' === e.type)
                    t = f(
                        'contextmenu',
                        s.a.extend(
                            i,
                            s.a.pick(
                                e,
                                'clientX',
                                'clientY',
                                'pageX',
                                'pageY',
                                'screenX',
                                'screenY',
                                'relatedTarget',
                                'region',
                                'buttons',
                                'button',
                                'metaKey',
                                'altKey',
                                'shiftKey',
                                'ctrlKey'
                            )
                        )
                    );
                else if ('touchend' === e.type || 'pressup' === e.type) {
                    let n;
                    ('touchend' === e.type && (n = e.changedTouches[0]),
                        'pressup' === e.type && (n = e.changedPointers[0]),
                        (t = f(
                            'contextmenu',
                            s.a.extend(
                                i,
                                s.a.pick(
                                    n,
                                    'clientX',
                                    'clientY',
                                    'pageX',
                                    'pageY',
                                    'screenX',
                                    'screenY'
                                ),
                                s.a.pick(
                                    e,
                                    'relatedTarget',
                                    'region',
                                    'buttons',
                                    'button',
                                    'metaKey',
                                    'altKey',
                                    'shiftKey',
                                    'ctrlKey'
                                )
                            )
                        )));
                } else
                    this.getContext()
                        .config(n.CONFIG.LOGGER)
                        .error('未知事件触发了自定义context menu！', e);
                if (
                    [
                        n.VIEW_TYPE.BRANCH,
                        n.VIEW_TYPE.BOUNDARY,
                        n.VIEW_TYPE.RELATIONSHIP,
                        n.VIEW_TYPE.IMAGE,
                    ].includes(this.type)
                ) {
                    const e = this.getContext().getModule(
                        n.MODULE_NAME.SELECTION
                    );
                    e.getSelections().includes(this) ||
                        e.selectSingle(this, { forceFlush: !0 });
                }
                this.el.dispatchEvent(t);
            }
            _pressContextMenuCheckHandle() {
                if (this.getContext().isMobilePlatform()) return;
                const e = o()(document);
                let t = !1;
                (e.on('touchmove.menu', () => {
                    t = !0;
                }),
                    e.on('touchend.menu', (i) => {
                        (t || this._dispatchContextMenu(i), e.off('.menu'));
                    }));
            }
        }
        function f(e, t) {
            try {
                return new MouseEvent(
                    e,
                    Object.assign(Object.assign({}, t), {
                        cancelable: !0,
                    })
                );
            } catch (i) {
                const n = document.createEvent('MouseEvent');
                return (
                    n.initMouseEvent(
                        e,
                        t.bubbles,
                        t.cancelable,
                        window,
                        t.detail,
                        t.screenX,
                        t.screenY,
                        t.clientX,
                        t.clientY,
                        t.ctrlKey,
                        t.altKey,
                        t.shiftKey,
                        t.metaKey,
                        t.button,
                        null
                    ),
                    n
                );
            }
        }
    },
];
