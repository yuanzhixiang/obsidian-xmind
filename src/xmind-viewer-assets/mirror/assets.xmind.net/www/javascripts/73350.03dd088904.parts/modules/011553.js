export default {
    11553: function (e, t, i) {
        var n;
        /*! Hammer.JS - v2.0.7 - 2016-04-22
         * http://hammerjs.github.io/
         *
         * Copyright (c) 2016 Jorik Tangelder;
         * Licensed under the MIT license */ !(function (r, o, a, s) {
            'use strict';
            var l,
                c = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'],
                d = o.createElement('div'),
                f = Math.round,
                h = Math.abs,
                p = Date.now;
            function T(e, t, i) {
                return setTimeout(L(e, i), t);
            }
            function u(e, t, i) {
                return !!Array.isArray(e) && (g(e, i[t], i), !0);
            }
            function g(e, t, i) {
                var n;
                if (e)
                    if (e.forEach) e.forEach(t, i);
                    else if (e.length !== s)
                        for (n = 0; n < e.length; )
                            (t.call(i, e[n], n, e), n++);
                    else
                        for (n in e)
                            e.hasOwnProperty(n) && t.call(i, e[n], n, e);
            }
            function Q(e, t, i) {
                var n = 'DEPRECATED METHOD: ' + t + '\n' + i + ' AT \n';
                return function () {
                    var t = new Error('get-stack-trace'),
                        i =
                            t && t.stack
                                ? t.stack
                                      .replace(/^[^\(]+?[\n$]/gm, '')
                                      .replace(/^\s+at\s+/gm, '')
                                      .replace(
                                          /^Object.<anonymous>\s*\(/gm,
                                          '{anonymous}()@'
                                      )
                                : 'Unknown Stack Trace',
                        o = r.console && (r.console.warn || r.console.log);
                    return (
                        o && o.call(r.console, n, i),
                        e.apply(this, arguments)
                    );
                };
            }
            l =
                'function' != typeof Object.assign
                    ? function (e) {
                          if (e === s || null === e)
                              throw new TypeError(
                                  'Cannot convert undefined or null to object'
                              );
                          for (
                              var t = Object(e), i = 1;
                              i < arguments.length;
                              i++
                          ) {
                              var n = arguments[i];
                              if (n !== s && null !== n)
                                  for (var r in n)
                                      n.hasOwnProperty(r) && (t[r] = n[r]);
                          }
                          return t;
                      }
                    : Object.assign;
            var m = Q(
                    function (e, t, i) {
                        for (var n = Object.keys(t), r = 0; r < n.length; )
                            ((!i || (i && e[n[r]] === s)) &&
                                (e[n[r]] = t[n[r]]),
                                r++);
                        return e;
                    },
                    'extend',
                    'Use `assign`.'
                ),
                b = Q(
                    function (e, t) {
                        return m(e, t, !0);
                    },
                    'merge',
                    'Use `assign`.'
                );
            function C(e, t, i) {
                var n,
                    r = t.prototype;
                (((n = e.prototype = Object.create(r)).constructor = e),
                    (n._super = r),
                    i && l(n, i));
            }
            function L(e, t) {
                return function () {
                    return e.apply(t, arguments);
                };
            }
            function y(e, t) {
                return 'function' == typeof e
                    ? e.apply((t && t[0]) || s, t)
                    : e;
            }
            function M(e, t) {
                return e === s ? t : e;
            }
            function A(e, t, i) {
                g(O(t), function (t) {
                    e.addEventListener(t, i, !1);
                });
            }
            function v(e, t, i) {
                g(O(t), function (t) {
                    e.removeEventListener(t, i, !1);
                });
            }
            function E(e, t) {
                for (; e; ) {
                    if (e == t) return !0;
                    e = e.parentNode;
                }
                return !1;
            }
            function _(e, t) {
                return e.indexOf(t) > -1;
            }
            function O(e) {
                return e.trim().split(/\s+/g);
            }
            function S(e, t, i) {
                if (e.indexOf && !i) return e.indexOf(t);
                for (var n = 0; n < e.length; ) {
                    if ((i && e[n][i] == t) || (!i && e[n] === t)) return n;
                    n++;
                }
                return -1;
            }
            function x(e) {
                return Array.prototype.slice.call(e, 0);
            }
            function R(e, t, i) {
                for (var n = [], r = [], o = 0; o < e.length; ) {
                    var a = t ? e[o][t] : e[o];
                    (S(r, a) < 0 && n.push(e[o]), (r[o] = a), o++);
                }
                return (
                    i &&
                        (n = t
                            ? n.sort(function (e, i) {
                                  return e[t] > i[t];
                              })
                            : n.sort()),
                    n
                );
            }
            function I(e, t) {
                for (
                    var i, n, r = t[0].toUpperCase() + t.slice(1), o = 0;
                    o < c.length;
                ) {
                    if ((n = (i = c[o]) ? i + r : t) in e) return n;
                    o++;
                }
                return s;
            }
            var N = 1;
            function w(e) {
                var t = e.ownerDocument || e;
                return t.defaultView || t.parentWindow || r;
            }
            var P = 'ontouchstart' in r,
                H = I(r, 'PointerEvent') !== s,
                D =
                    P &&
                    /mobile|tablet|ip(ad|hone|od)|android/i.test(
                        navigator.userAgent
                    ),
                F = 'touch',
                k = 'mouse',
                B = 24,
                V = ['x', 'y'],
                Y = ['clientX', 'clientY'];
            function G(e, t) {
                var i = this;
                ((this.manager = e),
                    (this.callback = t),
                    (this.element = e.element),
                    (this.target = e.options.inputTarget),
                    (this.domHandler = function (t) {
                        y(e.options.enable, [e]) && i.handler(t);
                    }),
                    this.init());
            }
            function U(e, t, i) {
                var n = i.pointers.length,
                    r = i.changedPointers.length,
                    o = 1 & t && n - r == 0,
                    a = 12 & t && n - r == 0;
                ((i.isFirst = !!o),
                    (i.isFinal = !!a),
                    o && (e.session = {}),
                    (i.eventType = t),
                    (function (e, t) {
                        var i = e.session,
                            n = t.pointers,
                            r = n.length;
                        i.firstInput || (i.firstInput = j(t));
                        r > 1 && !i.firstMultiple
                            ? (i.firstMultiple = j(t))
                            : 1 === r && (i.firstMultiple = !1);
                        var o = i.firstInput,
                            a = i.firstMultiple,
                            l = a ? a.center : o.center,
                            c = (t.center = $(n));
                        ((t.timeStamp = p()),
                            (t.deltaTime = t.timeStamp - o.timeStamp),
                            (t.angle = Z(l, c)),
                            (t.distance = K(l, c)),
                            (function (e, t) {
                                var i = t.center,
                                    n = e.offsetDelta || {},
                                    r = e.prevDelta || {},
                                    o = e.prevInput || {};
                                (1 !== t.eventType && 4 !== o.eventType) ||
                                    ((r = e.prevDelta =
                                        {
                                            x: o.deltaX || 0,
                                            y: o.deltaY || 0,
                                        }),
                                    (n = e.offsetDelta = { x: i.x, y: i.y }));
                                ((t.deltaX = r.x + (i.x - n.x)),
                                    (t.deltaY = r.y + (i.y - n.y)));
                            })(i, t),
                            (t.offsetDirection = W(t.deltaX, t.deltaY)));
                        var d = z(t.deltaTime, t.deltaX, t.deltaY);
                        ((t.overallVelocityX = d.x),
                            (t.overallVelocityY = d.y),
                            (t.overallVelocity = h(d.x) > h(d.y) ? d.x : d.y),
                            (t.scale = a
                                ? ((f = a.pointers),
                                  (T = n),
                                  K(T[0], T[1], Y) / K(f[0], f[1], Y))
                                : 1),
                            (t.rotation = a
                                ? (function (e, t) {
                                      return (
                                          Z(t[1], t[0], Y) + Z(e[1], e[0], Y)
                                      );
                                  })(a.pointers, n)
                                : 0),
                            (t.maxPointers = i.prevInput
                                ? t.pointers.length > i.prevInput.maxPointers
                                    ? t.pointers.length
                                    : i.prevInput.maxPointers
                                : t.pointers.length),
                            (function (e, t) {
                                var i,
                                    n,
                                    r,
                                    o,
                                    a = e.lastInterval || t,
                                    l = t.timeStamp - a.timeStamp;
                                if (
                                    8 != t.eventType &&
                                    (l > 25 || a.velocity === s)
                                ) {
                                    var c = t.deltaX - a.deltaX,
                                        d = t.deltaY - a.deltaY,
                                        f = z(l, c, d);
                                    ((n = f.x),
                                        (r = f.y),
                                        (i = h(f.x) > h(f.y) ? f.x : f.y),
                                        (o = W(c, d)),
                                        (e.lastInterval = t));
                                } else
                                    ((i = a.velocity),
                                        (n = a.velocityX),
                                        (r = a.velocityY),
                                        (o = a.direction));
                                ((t.velocity = i),
                                    (t.velocityX = n),
                                    (t.velocityY = r),
                                    (t.direction = o));
                            })(i, t));
                        var f, T;
                        var u = e.element;
                        E(t.srcEvent.target, u) && (u = t.srcEvent.target);
                        t.target = u;
                    })(e, i),
                    e.emit('hammer.input', i),
                    e.recognize(i),
                    (e.session.prevInput = i));
            }
            function j(e) {
                for (var t = [], i = 0; i < e.pointers.length; )
                    ((t[i] = {
                        clientX: f(e.pointers[i].clientX),
                        clientY: f(e.pointers[i].clientY),
                    }),
                        i++);
                return {
                    timeStamp: p(),
                    pointers: t,
                    center: $(t),
                    deltaX: e.deltaX,
                    deltaY: e.deltaY,
                };
            }
            function $(e) {
                var t = e.length;
                if (1 === t) return { x: f(e[0].clientX), y: f(e[0].clientY) };
                for (var i = 0, n = 0, r = 0; r < t; )
                    ((i += e[r].clientX), (n += e[r].clientY), r++);
                return { x: f(i / t), y: f(n / t) };
            }
            function z(e, t, i) {
                return { x: t / e || 0, y: i / e || 0 };
            }
            function W(e, t) {
                return e === t
                    ? 1
                    : h(e) >= h(t)
                      ? e < 0
                          ? 2
                          : 4
                      : t < 0
                        ? 8
                        : 16;
            }
            function K(e, t, i) {
                i || (i = V);
                var n = t[i[0]] - e[i[0]],
                    r = t[i[1]] - e[i[1]];
                return Math.sqrt(n * n + r * r);
            }
            function Z(e, t, i) {
                i || (i = V);
                var n = t[i[0]] - e[i[0]],
                    r = t[i[1]] - e[i[1]];
                return (180 * Math.atan2(r, n)) / Math.PI;
            }
            G.prototype = {
                handler: function () {},
                init: function () {
                    (this.evEl && A(this.element, this.evEl, this.domHandler),
                        this.evTarget &&
                            A(this.target, this.evTarget, this.domHandler),
                        this.evWin &&
                            A(w(this.element), this.evWin, this.domHandler));
                },
                destroy: function () {
                    (this.evEl && v(this.element, this.evEl, this.domHandler),
                        this.evTarget &&
                            v(this.target, this.evTarget, this.domHandler),
                        this.evWin &&
                            v(w(this.element), this.evWin, this.domHandler));
                },
            };
            var J = { mousedown: 1, mousemove: 2, mouseup: 4 },
                X = 'mousedown',
                q = 'mousemove mouseup';
            function ee() {
                ((this.evEl = X),
                    (this.evWin = q),
                    (this.pressed = !1),
                    G.apply(this, arguments));
            }
            C(ee, G, {
                handler: function (e) {
                    var t = J[e.type];
                    (1 & t && 0 === e.button && (this.pressed = !0),
                        2 & t && 1 !== e.which && (t = 4),
                        this.pressed &&
                            (4 & t && (this.pressed = !1),
                            this.callback(this.manager, t, {
                                pointers: [e],
                                changedPointers: [e],
                                pointerType: k,
                                srcEvent: e,
                            })));
                },
            });
            var te = {
                    pointerdown: 1,
                    pointermove: 2,
                    pointerup: 4,
                    pointercancel: 8,
                    pointerout: 8,
                },
                ie = { 2: F, 3: 'pen', 4: k, 5: 'kinect' },
                ne = 'pointerdown',
                re = 'pointermove pointerup pointercancel';
            function oe() {
                ((this.evEl = ne),
                    (this.evWin = re),
                    G.apply(this, arguments),
                    (this.store = this.manager.session.pointerEvents = []));
            }
            (r.MSPointerEvent &&
                !r.PointerEvent &&
                ((ne = 'MSPointerDown'),
                (re = 'MSPointerMove MSPointerUp MSPointerCancel')),
                C(oe, G, {
                    handler: function (e) {
                        var t = this.store,
                            i = !1,
                            n = e.type.toLowerCase().replace('ms', ''),
                            r = te[n],
                            o = ie[e.pointerType] || e.pointerType,
                            a = o == F,
                            s = S(t, e.pointerId, 'pointerId');
                        (1 & r && (0 === e.button || a)
                            ? s < 0 && (t.push(e), (s = t.length - 1))
                            : 12 & r && (i = !0),
                            s < 0 ||
                                ((t[s] = e),
                                this.callback(this.manager, r, {
                                    pointers: t,
                                    changedPointers: [e],
                                    pointerType: o,
                                    srcEvent: e,
                                }),
                                i && t.splice(s, 1)));
                    },
                }));
            var ae = {
                touchstart: 1,
                touchmove: 2,
                touchend: 4,
                touchcancel: 8,
            };
            function se() {
                ((this.evTarget = 'touchstart'),
                    (this.evWin = 'touchstart touchmove touchend touchcancel'),
                    (this.started = !1),
                    G.apply(this, arguments));
            }
            function le(e, t) {
                var i = x(e.touches),
                    n = x(e.changedTouches);
                return (
                    12 & t && (i = R(i.concat(n), 'identifier', !0)),
                    [i, n]
                );
            }
            C(se, G, {
                handler: function (e) {
                    var t = ae[e.type];
                    if ((1 === t && (this.started = !0), this.started)) {
                        var i = le.call(this, e, t);
                        (12 & t &&
                            i[0].length - i[1].length == 0 &&
                            (this.started = !1),
                            this.callback(this.manager, t, {
                                pointers: i[0],
                                changedPointers: i[1],
                                pointerType: F,
                                srcEvent: e,
                            }));
                    }
                },
            });
            var ce = {
                    touchstart: 1,
                    touchmove: 2,
                    touchend: 4,
                    touchcancel: 8,
                },
                de = 'touchstart touchmove touchend touchcancel';
            function fe() {
                ((this.evTarget = de),
                    (this.targetIds = {}),
                    G.apply(this, arguments));
            }
            function he(e, t) {
                var i = x(e.touches),
                    n = this.targetIds;
                if (3 & t && 1 === i.length)
                    return ((n[i[0].identifier] = !0), [i, i]);
                var r,
                    o,
                    a = x(e.changedTouches),
                    s = [],
                    l = this.target;
                if (
                    ((o = i.filter(function (e) {
                        return E(e.target, l);
                    })),
                    1 === t)
                )
                    for (r = 0; r < o.length; )
                        ((n[o[r].identifier] = !0), r++);
                for (r = 0; r < a.length; )
                    (n[a[r].identifier] && s.push(a[r]),
                        12 & t && delete n[a[r].identifier],
                        r++);
                return s.length
                    ? [R(o.concat(s), 'identifier', !0), s]
                    : void 0;
            }
            C(fe, G, {
                handler: function (e) {
                    var t = ce[e.type],
                        i = he.call(this, e, t);
                    i &&
                        this.callback(this.manager, t, {
                            pointers: i[0],
                            changedPointers: i[1],
                            pointerType: F,
                            srcEvent: e,
                        });
                },
            });
            function pe() {
                G.apply(this, arguments);
                var e = L(this.handler, this);
                ((this.touch = new fe(this.manager, e)),
                    (this.mouse = new ee(this.manager, e)),
                    (this.primaryTouch = null),
                    (this.lastTouches = []));
            }
            function Te(e, t) {
                1 & e
                    ? ((this.primaryTouch = t.changedPointers[0].identifier),
                      ue.call(this, t))
                    : 12 & e && ue.call(this, t);
            }
            function ue(e) {
                var t = e.changedPointers[0];
                if (t.identifier === this.primaryTouch) {
                    var i = { x: t.clientX, y: t.clientY };
                    this.lastTouches.push(i);
                    var n = this.lastTouches;
                    setTimeout(function () {
                        var e = n.indexOf(i);
                        e > -1 && n.splice(e, 1);
                    }, 2500);
                }
            }
            function ge(e) {
                for (
                    var t = e.srcEvent.clientX, i = e.srcEvent.clientY, n = 0;
                    n < this.lastTouches.length;
                    n++
                ) {
                    var r = this.lastTouches[n],
                        o = Math.abs(t - r.x),
                        a = Math.abs(i - r.y);
                    if (o <= 25 && a <= 25) return !0;
                }
                return !1;
            }
            C(pe, G, {
                handler: function (e, t, i) {
                    var n = i.pointerType == F,
                        r = i.pointerType == k;
                    if (
                        !(
                            r &&
                            i.sourceCapabilities &&
                            i.sourceCapabilities.firesTouchEvents
                        )
                    ) {
                        if (n) Te.call(this, t, i);
                        else if (r && ge.call(this, i)) return;
                        this.callback(e, t, i);
                    }
                },
                destroy: function () {
                    (this.touch.destroy(), this.mouse.destroy());
                },
            });
            var Qe = I(d.style, 'touchAction'),
                me = Qe !== s,
                be = 'compute',
                Ce = 'auto',
                Le = 'manipulation',
                ye = 'none',
                Me = 'pan-x',
                Ae = 'pan-y',
                ve = (function () {
                    if (!me) return !1;
                    var e = {},
                        t = r.CSS && r.CSS.supports;
                    return (
                        [
                            'auto',
                            'manipulation',
                            'pan-y',
                            'pan-x',
                            'pan-x pan-y',
                            'none',
                        ].forEach(function (i) {
                            e[i] = !t || r.CSS.supports('touch-action', i);
                        }),
                        e
                    );
                })();
            function Ee(e, t) {
                ((this.manager = e), this.set(t));
            }
            Ee.prototype = {
                set: function (e) {
                    (e == be && (e = this.compute()),
                        me &&
                            this.manager.element.style &&
                            ve[e] &&
                            (this.manager.element.style[Qe] = e),
                        (this.actions = e.toLowerCase().trim()));
                },
                update: function () {
                    this.set(this.manager.options.touchAction);
                },
                compute: function () {
                    var e = [];
                    return (
                        g(this.manager.recognizers, function (t) {
                            y(t.options.enable, [t]) &&
                                (e = e.concat(t.getTouchAction()));
                        }),
                        (function (e) {
                            if (_(e, ye)) return ye;
                            var t = _(e, Me),
                                i = _(e, Ae);
                            if (t && i) return ye;
                            if (t || i) return t ? Me : Ae;
                            if (_(e, Le)) return Le;
                            return Ce;
                        })(e.join(' '))
                    );
                },
                preventDefaults: function (e) {
                    var t = e.srcEvent,
                        i = e.offsetDirection;
                    if (this.manager.session.prevented) t.preventDefault();
                    else {
                        var n = this.actions,
                            r = _(n, ye) && !ve[ye],
                            o = _(n, Ae) && !ve[Ae],
                            a = _(n, Me) && !ve[Me];
                        if (r) {
                            var s = 1 === e.pointers.length,
                                l = e.distance < 2,
                                c = e.deltaTime < 250;
                            if (s && l && c) return;
                        }
                        if (!a || !o)
                            return r || (o && 6 & i) || (a && i & B)
                                ? this.preventSrc(t)
                                : void 0;
                    }
                },
                preventSrc: function (e) {
                    ((this.manager.session.prevented = !0), e.preventDefault());
                },
            };
            var _e = 32;
            function Oe(e) {
                ((this.options = l({}, this.defaults, e || {})),
                    (this.id = N++),
                    (this.manager = null),
                    (this.options.enable = M(this.options.enable, !0)),
                    (this.state = 1),
                    (this.simultaneous = {}),
                    (this.requireFail = []));
            }
            function Se(e) {
                return 16 & e
                    ? 'cancel'
                    : 8 & e
                      ? 'end'
                      : 4 & e
                        ? 'move'
                        : 2 & e
                          ? 'start'
                          : '';
            }
            function xe(e) {
                return 16 == e
                    ? 'down'
                    : 8 == e
                      ? 'up'
                      : 2 == e
                        ? 'left'
                        : 4 == e
                          ? 'right'
                          : '';
            }
            function Re(e, t) {
                var i = t.manager;
                return i ? i.get(e) : e;
            }
            function Ie() {
                Oe.apply(this, arguments);
            }
            function Ne() {
                (Ie.apply(this, arguments), (this.pX = null), (this.pY = null));
            }
            function we() {
                Ie.apply(this, arguments);
            }
            function Pe() {
                (Oe.apply(this, arguments),
                    (this._timer = null),
                    (this._input = null));
            }
            function He() {
                Ie.apply(this, arguments);
            }
            function De() {
                Ie.apply(this, arguments);
            }
            function Fe() {
                (Oe.apply(this, arguments),
                    (this.pTime = !1),
                    (this.pCenter = !1),
                    (this._timer = null),
                    (this._input = null),
                    (this.count = 0));
            }
            function ke(e, t) {
                return (
                    ((t = t || {}).recognizers = M(
                        t.recognizers,
                        ke.defaults.preset
                    )),
                    new Be(e, t)
                );
            }
            ((Oe.prototype = {
                defaults: {},
                set: function (e) {
                    return (
                        l(this.options, e),
                        this.manager && this.manager.touchAction.update(),
                        this
                    );
                },
                recognizeWith: function (e) {
                    if (u(e, 'recognizeWith', this)) return this;
                    var t = this.simultaneous;
                    return (
                        t[(e = Re(e, this)).id] ||
                            ((t[e.id] = e), e.recognizeWith(this)),
                        this
                    );
                },
                dropRecognizeWith: function (e) {
                    return (
                        u(e, 'dropRecognizeWith', this) ||
                            ((e = Re(e, this)), delete this.simultaneous[e.id]),
                        this
                    );
                },
                requireFailure: function (e) {
                    if (u(e, 'requireFailure', this)) return this;
                    var t = this.requireFail;
                    return (
                        -1 === S(t, (e = Re(e, this))) &&
                            (t.push(e), e.requireFailure(this)),
                        this
                    );
                },
                dropRequireFailure: function (e) {
                    if (u(e, 'dropRequireFailure', this)) return this;
                    e = Re(e, this);
                    var t = S(this.requireFail, e);
                    return (t > -1 && this.requireFail.splice(t, 1), this);
                },
                hasRequireFailures: function () {
                    return this.requireFail.length > 0;
                },
                canRecognizeWith: function (e) {
                    return !!this.simultaneous[e.id];
                },
                emit: function (e) {
                    var t = this,
                        i = this.state;
                    function n(i) {
                        t.manager.emit(i, e);
                    }
                    (i < 8 && n(t.options.event + Se(i)),
                        n(t.options.event),
                        e.additionalEvent && n(e.additionalEvent),
                        i >= 8 && n(t.options.event + Se(i)));
                },
                tryEmit: function (e) {
                    if (this.canEmit()) return this.emit(e);
                    this.state = _e;
                },
                canEmit: function () {
                    for (var e = 0; e < this.requireFail.length; ) {
                        if (!(33 & this.requireFail[e].state)) return !1;
                        e++;
                    }
                    return !0;
                },
                recognize: function (e) {
                    var t = l({}, e);
                    if (!y(this.options.enable, [this, t]))
                        return (this.reset(), void (this.state = _e));
                    (56 & this.state && (this.state = 1),
                        (this.state = this.process(t)),
                        30 & this.state && this.tryEmit(t));
                },
                process: function (e) {},
                getTouchAction: function () {},
                reset: function () {},
            }),
                C(Ie, Oe, {
                    defaults: { pointers: 1 },
                    attrTest: function (e) {
                        var t = this.options.pointers;
                        return 0 === t || e.pointers.length === t;
                    },
                    process: function (e) {
                        var t = this.state,
                            i = e.eventType,
                            n = 6 & t,
                            r = this.attrTest(e);
                        return n && (8 & i || !r)
                            ? 16 | t
                            : n || r
                              ? 4 & i
                                  ? 8 | t
                                  : 2 & t
                                    ? 4 | t
                                    : 2
                              : _e;
                    },
                }),
                C(Ne, Ie, {
                    defaults: {
                        event: 'pan',
                        threshold: 10,
                        pointers: 1,
                        direction: 30,
                    },
                    getTouchAction: function () {
                        var e = this.options.direction,
                            t = [];
                        return (6 & e && t.push(Ae), e & B && t.push(Me), t);
                    },
                    directionTest: function (e) {
                        var t = this.options,
                            i = !0,
                            n = e.distance,
                            r = e.direction,
                            o = e.deltaX,
                            a = e.deltaY;
                        return (
                            r & t.direction ||
                                (6 & t.direction
                                    ? ((r = 0 === o ? 1 : o < 0 ? 2 : 4),
                                      (i = o != this.pX),
                                      (n = Math.abs(e.deltaX)))
                                    : ((r = 0 === a ? 1 : a < 0 ? 8 : 16),
                                      (i = a != this.pY),
                                      (n = Math.abs(e.deltaY)))),
                            (e.direction = r),
                            i && n > t.threshold && r & t.direction
                        );
                    },
                    attrTest: function (e) {
                        return (
                            Ie.prototype.attrTest.call(this, e) &&
                            (2 & this.state ||
                                (!(2 & this.state) && this.directionTest(e)))
                        );
                    },
                    emit: function (e) {
                        ((this.pX = e.deltaX), (this.pY = e.deltaY));
                        var t = xe(e.direction);
                        (t && (e.additionalEvent = this.options.event + t),
                            this._super.emit.call(this, e));
                    },
                }),
                C(we, Ie, {
                    defaults: { event: 'pinch', threshold: 0, pointers: 2 },
                    getTouchAction: function () {
                        return [ye];
                    },
                    attrTest: function (e) {
                        return (
                            this._super.attrTest.call(this, e) &&
                            (Math.abs(e.scale - 1) > this.options.threshold ||
                                2 & this.state)
                        );
                    },
                    emit: function (e) {
                        if (1 !== e.scale) {
                            var t = e.scale < 1 ? 'in' : 'out';
                            e.additionalEvent = this.options.event + t;
                        }
                        this._super.emit.call(this, e);
                    },
                }),
                C(Pe, Oe, {
                    defaults: {
                        event: 'press',
                        pointers: 1,
                        time: 251,
                        threshold: 9,
                    },
                    getTouchAction: function () {
                        return [Ce];
                    },
                    process: function (e) {
                        var t = this.options,
                            i = e.pointers.length === t.pointers,
                            n = e.distance < t.threshold,
                            r = e.deltaTime > t.time;
                        if (
                            ((this._input = e),
                            !n || !i || (12 & e.eventType && !r))
                        )
                            this.reset();
                        else if (1 & e.eventType)
                            (this.reset(),
                                (this._timer = T(
                                    function () {
                                        ((this.state = 8), this.tryEmit());
                                    },
                                    t.time,
                                    this
                                )));
                        else if (4 & e.eventType) return 8;
                        return _e;
                    },
                    reset: function () {
                        clearTimeout(this._timer);
                    },
                    emit: function (e) {
                        8 === this.state &&
                            (e && 4 & e.eventType
                                ? this.manager.emit(
                                      this.options.event + 'up',
                                      e
                                  )
                                : ((this._input.timeStamp = p()),
                                  this.manager.emit(
                                      this.options.event,
                                      this._input
                                  )));
                    },
                }),
                C(He, Ie, {
                    defaults: {
                        event: 'rotate',
                        threshold: 0,
                        pointers: 2,
                    },
                    getTouchAction: function () {
                        return [ye];
                    },
                    attrTest: function (e) {
                        return (
                            this._super.attrTest.call(this, e) &&
                            (Math.abs(e.rotation) > this.options.threshold ||
                                2 & this.state)
                        );
                    },
                }),
                C(De, Ie, {
                    defaults: {
                        event: 'swipe',
                        threshold: 10,
                        velocity: 0.3,
                        direction: 30,
                        pointers: 1,
                    },
                    getTouchAction: function () {
                        return Ne.prototype.getTouchAction.call(this);
                    },
                    attrTest: function (e) {
                        var t,
                            i = this.options.direction;
                        return (
                            30 & i
                                ? (t = e.overallVelocity)
                                : 6 & i
                                  ? (t = e.overallVelocityX)
                                  : i & B && (t = e.overallVelocityY),
                            this._super.attrTest.call(this, e) &&
                                i & e.offsetDirection &&
                                e.distance > this.options.threshold &&
                                e.maxPointers == this.options.pointers &&
                                h(t) > this.options.velocity &&
                                4 & e.eventType
                        );
                    },
                    emit: function (e) {
                        var t = xe(e.offsetDirection);
                        (t && this.manager.emit(this.options.event + t, e),
                            this.manager.emit(this.options.event, e));
                    },
                }),
                C(Fe, Oe, {
                    defaults: {
                        event: 'tap',
                        pointers: 1,
                        taps: 1,
                        interval: 300,
                        time: 250,
                        threshold: 9,
                        posThreshold: 10,
                    },
                    getTouchAction: function () {
                        return [Le];
                    },
                    process: function (e) {
                        var t = this.options,
                            i = e.pointers.length === t.pointers,
                            n = e.distance < t.threshold,
                            r = e.deltaTime < t.time;
                        if ((this.reset(), 1 & e.eventType && 0 === this.count))
                            return this.failTimeout();
                        if (n && r && i) {
                            if (4 != e.eventType) return this.failTimeout();
                            var o =
                                    !this.pTime ||
                                    e.timeStamp - this.pTime < t.interval,
                                a =
                                    !this.pCenter ||
                                    K(this.pCenter, e.center) < t.posThreshold;
                            if (
                                ((this.pTime = e.timeStamp),
                                (this.pCenter = e.center),
                                a && o ? (this.count += 1) : (this.count = 1),
                                (this._input = e),
                                0 === this.count % t.taps)
                            )
                                return this.hasRequireFailures()
                                    ? ((this._timer = T(
                                          function () {
                                              ((this.state = 8),
                                                  this.tryEmit());
                                          },
                                          t.interval,
                                          this
                                      )),
                                      2)
                                    : 8;
                        }
                        return _e;
                    },
                    failTimeout: function () {
                        return (
                            (this._timer = T(
                                function () {
                                    this.state = _e;
                                },
                                this.options.interval,
                                this
                            )),
                            _e
                        );
                    },
                    reset: function () {
                        clearTimeout(this._timer);
                    },
                    emit: function () {
                        8 == this.state &&
                            ((this._input.tapCount = this.count),
                            this.manager.emit(this.options.event, this._input));
                    },
                }),
                (ke.VERSION = '2.0.7'),
                (ke.defaults = {
                    domEvents: !1,
                    touchAction: be,
                    enable: !0,
                    inputTarget: null,
                    inputClass: null,
                    preset: [
                        [He, { enable: !1 }],
                        [we, { enable: !1 }, ['rotate']],
                        [De, { direction: 6 }],
                        [Ne, { direction: 6 }, ['swipe']],
                        [Fe],
                        [Fe, { event: 'doubletap', taps: 2 }, ['tap']],
                        [Pe],
                    ],
                    cssProps: {
                        userSelect: 'none',
                        touchSelect: 'none',
                        touchCallout: 'none',
                        contentZooming: 'none',
                        userDrag: 'none',
                        tapHighlightColor: 'rgba(0,0,0,0)',
                    },
                }));
            function Be(e, t) {
                var i;
                ((this.options = l({}, ke.defaults, t || {})),
                    (this.options.inputTarget = this.options.inputTarget || e),
                    (this.handlers = {}),
                    (this.session = {}),
                    (this.recognizers = []),
                    (this.oldCssProps = {}),
                    (this.element = e),
                    (this.input = new (
                        (i = this).options.inputClass ||
                        (H ? oe : D ? fe : P ? pe : ee)
                    )(i, U)),
                    (this.touchAction = new Ee(this, this.options.touchAction)),
                    Ve(this, !0),
                    g(
                        this.options.recognizers,
                        function (e) {
                            var t = this.add(new e[0](e[1]));
                            (e[2] && t.recognizeWith(e[2]),
                                e[3] && t.requireFailure(e[3]));
                        },
                        this
                    ));
            }
            function Ve(e, t) {
                var i,
                    n = e.element;
                n.style &&
                    (g(e.options.cssProps, function (r, o) {
                        ((i = I(n.style, o)),
                            t
                                ? ((e.oldCssProps[i] = n.style[i]),
                                  (n.style[i] = r))
                                : (n.style[i] = e.oldCssProps[i] || ''));
                    }),
                    t || (e.oldCssProps = {}));
            }
            ((Be.prototype = {
                set: function (e) {
                    return (
                        l(this.options, e),
                        e.touchAction && this.touchAction.update(),
                        e.inputTarget &&
                            (this.input.destroy(),
                            (this.input.target = e.inputTarget),
                            this.input.init()),
                        this
                    );
                },
                stop: function (e) {
                    this.session.stopped = e ? 2 : 1;
                },
                recognize: function (e) {
                    var t = this.session;
                    if (!t.stopped) {
                        var i;
                        this.touchAction.preventDefaults(e);
                        var n = this.recognizers,
                            r = t.curRecognizer;
                        (!r || (r && 8 & r.state)) &&
                            (r = t.curRecognizer = null);
                        for (var o = 0; o < n.length; )
                            ((i = n[o]),
                                2 === t.stopped ||
                                (r && i != r && !i.canRecognizeWith(r))
                                    ? i.reset()
                                    : i.recognize(e),
                                !r && 14 & i.state && (r = t.curRecognizer = i),
                                o++);
                    }
                },
                get: function (e) {
                    if (e instanceof Oe) return e;
                    for (var t = this.recognizers, i = 0; i < t.length; i++)
                        if (t[i].options.event == e) return t[i];
                    return null;
                },
                add: function (e) {
                    if (u(e, 'add', this)) return this;
                    var t = this.get(e.options.event);
                    return (
                        t && this.remove(t),
                        this.recognizers.push(e),
                        (e.manager = this),
                        this.touchAction.update(),
                        e
                    );
                },
                remove: function (e) {
                    if (u(e, 'remove', this)) return this;
                    if ((e = this.get(e))) {
                        var t = this.recognizers,
                            i = S(t, e);
                        -1 !== i && (t.splice(i, 1), this.touchAction.update());
                    }
                    return this;
                },
                on: function (e, t) {
                    if (e !== s && t !== s) {
                        var i = this.handlers;
                        return (
                            g(O(e), function (e) {
                                ((i[e] = i[e] || []), i[e].push(t));
                            }),
                            this
                        );
                    }
                },
                off: function (e, t) {
                    if (e !== s) {
                        var i = this.handlers;
                        return (
                            g(O(e), function (e) {
                                t
                                    ? i[e] && i[e].splice(S(i[e], t), 1)
                                    : delete i[e];
                            }),
                            this
                        );
                    }
                },
                emit: function (e, t) {
                    this.options.domEvents &&
                        (function (e, t) {
                            var i = o.createEvent('Event');
                            (i.initEvent(e, !0, !0),
                                (i.gesture = t),
                                t.target.dispatchEvent(i));
                        })(e, t);
                    var i = this.handlers[e] && this.handlers[e].slice();
                    if (i && i.length) {
                        ((t.type = e),
                            (t.preventDefault = function () {
                                t.srcEvent.preventDefault();
                            }));
                        for (var n = 0; n < i.length; ) (i[n](t), n++);
                    }
                },
                destroy: function () {
                    (this.element && Ve(this, !1),
                        (this.handlers = {}),
                        (this.session = {}),
                        this.input.destroy(),
                        (this.element = null));
                },
            }),
                l(ke, {
                    INPUT_START: 1,
                    INPUT_MOVE: 2,
                    INPUT_END: 4,
                    INPUT_CANCEL: 8,
                    STATE_POSSIBLE: 1,
                    STATE_BEGAN: 2,
                    STATE_CHANGED: 4,
                    STATE_ENDED: 8,
                    STATE_RECOGNIZED: 8,
                    STATE_CANCELLED: 16,
                    STATE_FAILED: _e,
                    DIRECTION_NONE: 1,
                    DIRECTION_LEFT: 2,
                    DIRECTION_RIGHT: 4,
                    DIRECTION_UP: 8,
                    DIRECTION_DOWN: 16,
                    DIRECTION_HORIZONTAL: 6,
                    DIRECTION_VERTICAL: B,
                    DIRECTION_ALL: 30,
                    Manager: Be,
                    Input: G,
                    TouchAction: Ee,
                    TouchInput: fe,
                    MouseInput: ee,
                    PointerEventInput: oe,
                    TouchMouseInput: pe,
                    SingleTouchInput: se,
                    Recognizer: Oe,
                    AttrRecognizer: Ie,
                    Tap: Fe,
                    Pan: Ne,
                    Swipe: De,
                    Pinch: we,
                    Rotate: He,
                    Press: Pe,
                    on: A,
                    off: v,
                    each: g,
                    merge: b,
                    extend: m,
                    assign: l,
                    inherit: C,
                    bindFn: L,
                    prefixed: I,
                }),
                ((void 0 !== r
                    ? r
                    : 'undefined' != typeof self
                      ? self
                      : {}
                ).Hammer = ke),
                (n = function () {
                    return ke;
                }.call(t, i, t, e)) === s || (e.exports = n));
        })(window, document);
    },
};
