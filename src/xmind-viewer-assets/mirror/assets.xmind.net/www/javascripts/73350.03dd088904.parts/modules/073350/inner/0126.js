export default [
    function (e, t, i) {
        'use strict';
        (function (e) {
            i.d(t, 'a', function () {
                return L;
            });
            var n = i(12),
                r = i.n(n),
                o = i(6),
                a = i.n(o),
                s = i(67),
                l = i.n(s),
                c = i(1),
                d = i(148),
                f = i(53),
                h = i(0);
            const p = ['pointerdown'],
                T = {
                    pointerover: { mouse: 'mouseover' },
                    pointerenter: { mouse: 'mouseenter' },
                    pointerleave: { mouse: 'mouseleave' },
                    pointerdown: {
                        mouse: 'mousedown',
                        touch: 'tap',
                    },
                    pointermove: {
                        mouse: 'mousemove',
                        touch: 'touchmove',
                    },
                    pointerup: {
                        mouse: 'mouseup',
                        touch: 'touchend',
                    },
                },
                u = (e) => (t) => (i) => {
                    ((i.pointerType = e), t(i));
                };
            class g {
                on(e, t) {}
                off(e, t) {}
                getEventList() {
                    return [];
                }
            }
            class Q extends g {
                constructor(e) {
                    (super(), (this.entity = r()(e)));
                }
                on(e, t) {
                    this.entity.on(e, t);
                }
                off(e, t) {
                    this.entity.off(e, t);
                }
            }
            class m extends g {
                constructor(e) {
                    (super(),
                        (this.list = [
                            'tap',
                            'doubletap',
                            'pan',
                            'press',
                            'pressup',
                            'pinch',
                            'pinchstart',
                            'pinchmove',
                            'pinchend',
                        ]),
                        (this.entity = new l.a.Manager(e, {
                            touchAction: 'manipulation',
                        })));
                    const t = new l.a.Tap({ taps: 1 }),
                        i = new l.a.Tap({
                            event: 'doubletap',
                            taps: 2,
                            interval: 500,
                            posThreshold: 20,
                        }),
                        n = new l.a.Pinch(),
                        r = new l.a.Pan({ pointers: 0 }),
                        o = new l.a.Press();
                    (i.recognizeWith([t]),
                        n.recognizeWith([r]),
                        this.entity.add(r),
                        this.entity.add(n),
                        this.entity.add(i),
                        this.entity.add(t),
                        this.entity.add(o));
                }
                on(e, t) {
                    this.entity.on(e, t);
                }
                off(e, t) {
                    this.entity.off(e, t);
                }
                getEventList() {
                    return this.list;
                }
            }
            class b extends Q {
                getEventList() {
                    return p;
                }
            }
            class C {
                constructor() {
                    this.dataMap = {};
                }
                on(e, t, i) {
                    const n = this.dataMap;
                    ((n[e] = n[e] || {}),
                        (n[e][t] = n[e][t] || []),
                        n[e][t].push(i));
                }
                off(e, t, i) {
                    const n = this.dataMap;
                    if (Object(c.isUndef)(t)) n[e] = {};
                    else {
                        const r = n[e];
                        (Object(c.isUndef)(i)
                            ? (r[t] = [])
                            : Object(c.removeItem)(r[t], i),
                            0 === r[t].length && delete r[t]);
                    }
                }
                _getHandlers(e, t) {
                    const i = this.dataMap[e],
                        n = t.map((e) => i[e] || []);
                    return Object(c.flatten)(n);
                }
                dispatch(e, t, i) {
                    const n = e.type;
                    return (
                        this._getHandlers(n, t).some((t) => {
                            if (
                                (!1 === t.call(i, e) &&
                                    (e.stopPropagation(), e.preventDefault()),
                                e.isPropagationImmediateStoped())
                            )
                                return (e.stopPropagation(), !0);
                        }),
                        e.isPropagationStopped()
                    );
                }
                hasHandlers(e) {
                    const t = this.dataMap[e];
                    return Object(c.isDef)(t) && 0 !== Object.keys(t).length;
                }
            }
            class L {
                constructor({ el: e, platform: t }) {
                    ((this.eventMap = {}),
                        (this.entityMap = {}),
                        (this._defaultEntity = null),
                        (this.events = new C(this)),
                        (this.on = this.on.bind(this)),
                        (this.off = this.off.bind(this)),
                        (this.dispatch = this.dispatch.bind(this)),
                        (this.el = e),
                        (this.platform = t),
                        this._addDefaultEntities(),
                        this._initUIEvents());
                }
                _addDefaultEntities() {
                    const e = new m(this.el),
                        t = new Q(this.el);
                    (this.addEntity(e),
                        this.addEntity(t),
                        this.addEntity(new b(this.el)));
                }
                _initUIEvents() {
                    d.a.forEach((e) => {
                        Object(f.b)(
                            this,
                            e.events,
                            e.viewType,
                            e.eventHandlers
                        );
                    });
                }
                _updateEventMap(e, t) {
                    const i = this.eventMap[e];
                    if (this.events.hasHandlers(e)) {
                        if (i === t) return;
                        ((this.eventMap[e] = t),
                            Object(c.isDef)(i) && i.off(e, this.dispatch),
                            Object(c.isDef)(t) &&
                                (t.off(e, this.dispatch),
                                t.on(e, this.dispatch)));
                    } else
                        (Object(c.isDef)(i) && i.off(e, this.dispatch),
                            delete this.eventMap[e]);
                }
                addEntity(e) {
                    const t = e.getEventList();
                    if (0 === t.length) {
                        const t = this._defaultEntity;
                        this._defaultEntity = e;
                        const i = (e) => this.eventMap[e] === t;
                        Object.keys(this.eventMap)
                            .filter(i)
                            .forEach((t) => this._updateEventMap(t, e));
                    } else
                        t.forEach((t) => {
                            ((this.entityMap[t] = e),
                                this._updateEventMap(t, e));
                        });
                }
                _getEntity(e) {
                    return Object(c.isDef)(this.entityMap[e])
                        ? this.entityMap[e]
                        : this._defaultEntity;
                }
                _updateEvent(e) {
                    const t = this._getEntity(e);
                    this._updateEventMap(e, t);
                }
                _handlePointerEventFallBack(e, t, i, n) {
                    const r = T[e].mouse,
                        o = T[e].touch,
                        a = n ? 'on' : 'off';
                    (this.events[a](r, t, u('mouse')(i)),
                        this._updateEvent(r),
                        o &&
                            (this.events[a](o, t, u('touch')(i)),
                            this._updateEvent(o)));
                }
                on(e, t, i) {
                    return (
                        p.includes(e) && !Object(c.isSupportPointerEvent)()
                            ? this._handlePointerEventFallBack(e, t, i, !0)
                            : (this.events.on(e, t, i), this._updateEvent(e)),
                        () => this.off(e, t, i)
                    );
                }
                off(e, t, i) {
                    p.includes(e) && !Object(c.isSupportPointerEvent)()
                        ? this._handlePointerEventFallBack(e, t, i, !1)
                        : (this.events.off(e, t, i), this._updateEvent(e));
                }
                doRedundantPreventDefault(e, t) {
                    const i = {
                        [h.VIEW_TYPE.BRANCH]: ['mousedown'],
                        [h.VIEW_TYPE.TOPIC]: ['mousedown'],
                        [h.VIEW_TYPE.BOUNDARY]: ['mousedown'],
                        [h.VIEW_TYPE.RELATIONSHIP]: ['mousedown'],
                        [h.VIEW_TYPE.SVG]: ['mousedown'],
                    };
                    i[t.type] &&
                        i[t.type].includes(e.type) &&
                        e.preventDefault();
                }
                _shouldPreventDefault(e) {
                    return (
                        this.platform !== h.PLATFORMS.BROWNIE &&
                        Object(c.isRedundantEvent)(e)
                    );
                }
                dispatch(t) {
                    const i = t.currentTarget;
                    let n = y(t, i);
                    for (; n && n !== i; )
                        if (
                            ((r = n),
                            !Object(c.isDef)(r.sbView) ||
                                (r.sbView.figure &&
                                    r.sbView.figure.isDisposed()))
                        )
                            n = n.parentNode;
                        else {
                            if (this._shouldPreventDefault(t))
                                return this.doRedundantPreventDefault(
                                    t,
                                    n.sbView
                                );
                            {
                                const i = n.sbView,
                                    r = i.getTypeList();
                                if (
                                    ((t.currentTarget = n),
                                    (t.sbView = i),
                                    'skip' === e.env.SELECT_BOX &&
                                        !n.getAttribute('data-immunity'))
                                ) {
                                    n = i.getNextEventTarget(n);
                                    continue;
                                }
                                if (this.events.dispatch(A(t), r, i)) break;
                                n = i.getNextEventTarget(n);
                            }
                        }
                    var r;
                }
            }
            const y = (e, t) => {
                    if (!e.pointers || e.pointers.length <= 1) return e.target;
                    const i = e.pointers.map((e) =>
                        ((e, t) => {
                            const i = [];
                            for (; e && e !== t; )
                                (i.unshift(e), (e = e.parentNode));
                            return (e && i.unshift(e), i);
                        })(e.target, t)
                    );
                    return ((e) => {
                        let t = null;
                        const i = ((e) => {
                            const t = e
                                    .map((e) => e.length)
                                    .reduce((e, t) => Math.min(e, t), 1 / 0),
                                i = [];
                            for (let n = 0; n < t; n++) {
                                i[n] = [];
                                for (let t = 0; t < e.length; t++)
                                    i[n][t] = e[t][n];
                            }
                            return i;
                        })(e);
                        for (let e = 0; e < i.length; e++) {
                            const n = i[e][0];
                            if (!i[e].every((e) => e === n)) return t;
                            t = n;
                        }
                        return t;
                    })(i);
                },
                M = {
                    isPropagationStopped() {
                        return !1;
                    },
                    isDefaultPrevented() {
                        return !1;
                    },
                    isPropagationImmediateStoped() {
                        return !1;
                    },
                    stopPropagation() {
                        this.isPropagationStopped = () => !0;
                    },
                    preventDefault() {
                        this.isDefaultPrevented = () => !0;
                        const e = this.srcEvent || this.originalEvent;
                        e && e.preventDefault();
                    },
                    stopImmediatePropagation() {
                        this.isPropagationImmediateStoped = () => !0;
                    },
                },
                A = (e) => a.a.extend({}, e, M);
        }).call(this, i(45));
    },
];
