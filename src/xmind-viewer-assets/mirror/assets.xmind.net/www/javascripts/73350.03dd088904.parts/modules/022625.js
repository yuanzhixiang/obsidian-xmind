export default {
    22625: function (e, t, i) {
        'use strict';
        (i.r(t),
            i.d(t, {
                $mobx: function () {
                    return G;
                },
                FlowCancellationError: function () {
                    return di;
                },
                ObservableMap: function () {
                    return Cn;
                },
                ObservableSet: function () {
                    return Mn;
                },
                Reaction: function () {
                    return vt;
                },
                _allowStateChanges: function () {
                    return Ye;
                },
                _allowStateChangesInsideComputed: function () {
                    return Gt;
                },
                _allowStateReadsEnd: function () {
                    return ct;
                },
                _allowStateReadsStart: function () {
                    return lt;
                },
                _autoAction: function () {
                    return Yt;
                },
                _endAction: function () {
                    return Ve;
                },
                _getAdministration: function () {
                    return jn;
                },
                _getGlobalState: function () {
                    return gt;
                },
                _interceptReads: function () {
                    return mi;
                },
                _isComputingDerivation: function () {
                    return tt;
                },
                _resetGlobalState: function () {
                    return Qt;
                },
                _startAction: function () {
                    return Be;
                },
                action: function () {
                    return Vt;
                },
                autorun: function () {
                    return jt;
                },
                comparer: function () {
                    return z;
                },
                computed: function () {
                    return Ie;
                },
                configure: function () {
                    return ni;
                },
                createAtom: function () {
                    return $;
                },
                defineProperty: function () {
                    return Ni;
                },
                entries: function () {
                    return Oi;
                },
                extendObservable: function () {
                    return ri;
                },
                flow: function () {
                    return Ti;
                },
                flowResult: function () {
                    return gi;
                },
                get: function () {
                    return Ii;
                },
                getAtom: function () {
                    return Un;
                },
                getDebugName: function () {
                    return $n;
                },
                getDependencyTree: function () {
                    return oi;
                },
                getObserverTree: function () {
                    return si;
                },
                has: function () {
                    return Ri;
                },
                intercept: function () {
                    return bi;
                },
                isAction: function () {
                    return Ut;
                },
                isBoxedObservable: function () {
                    return ze;
                },
                isComputed: function () {
                    return Li;
                },
                isComputedProp: function () {
                    return yi;
                },
                isFlow: function () {
                    return Qi;
                },
                isFlowCancellationError: function () {
                    return fi;
                },
                isObservable: function () {
                    return Ai;
                },
                isObservableArray: function () {
                    return Tn;
                },
                isObservableMap: function () {
                    return Ln;
                },
                isObservableObject: function () {
                    return Rn;
                },
                isObservableProp: function () {
                    return vi;
                },
                isObservableSet: function () {
                    return An;
                },
                keys: function () {
                    return Ei;
                },
                makeAutoObservable: function () {
                    return qi;
                },
                makeObservable: function () {
                    return Ji;
                },
                observable: function () {
                    return Oe;
                },
                observe: function () {
                    return Pi;
                },
                onBecomeObserved: function () {
                    return Jt;
                },
                onBecomeUnobserved: function () {
                    return Xt;
                },
                onReactionError: function () {
                    return Et;
                },
                override: function () {
                    return J;
                },
                ownKeys: function () {
                    return wi;
                },
                reaction: function () {
                    return Wt;
                },
                remove: function () {
                    return xi;
                },
                runInAction: function () {
                    return Gt;
                },
                set: function () {
                    return Si;
                },
                spy: function () {
                    return It;
                },
                toJS: function () {
                    return Fi;
                },
                trace: function () {
                    return ki;
                },
                transaction: function () {
                    return Bi;
                },
                untracked: function () {
                    return ot;
                },
                values: function () {
                    return _i;
                },
                when: function () {
                    return Vi;
                },
            }));
        function n(e) {
            for (
                var t = arguments.length,
                    i = new Array(t > 1 ? t - 1 : 0),
                    n = 1;
                n < t;
                n++
            )
                i[n - 1] = arguments[n];
            throw new Error(
                'number' == typeof e
                    ? '[MobX] minified error nr: ' +
                          e +
                          (i.length ? ' ' + i.map(String).join(',') : '') +
                          '. Find the full error at: https://github.com/mobxjs/mobx/blob/main/packages/mobx/src/errors.ts'
                    : '[MobX] ' + e
            );
        }
        var r = {};
        function o() {
            return 'undefined' != typeof globalThis
                ? globalThis
                : 'undefined' != typeof window
                  ? window
                  : void 0 !== i.g
                    ? i.g
                    : 'undefined' != typeof self
                      ? self
                      : r;
        }
        var a = Object.assign,
            s = Object.getOwnPropertyDescriptor,
            l = Object.defineProperty,
            c = Object.prototype,
            d = [];
        Object.freeze(d);
        var f = {};
        Object.freeze(f);
        var h = 'undefined' != typeof Proxy,
            p = Object.toString();
        function T() {
            h || n('Proxy not available');
        }
        function u(e) {
            var t = !1;
            return function () {
                if (!t) return ((t = !0), e.apply(this, arguments));
            };
        }
        var g = function () {};
        function Q(e) {
            return 'function' == typeof e;
        }
        function m(e) {
            switch (typeof e) {
                case 'string':
                case 'symbol':
                case 'number':
                    return !0;
            }
            return !1;
        }
        function b(e) {
            return null !== e && 'object' == typeof e;
        }
        function C(e) {
            if (!b(e)) return !1;
            var t = Object.getPrototypeOf(e);
            if (null == t) return !0;
            var i =
                Object.hasOwnProperty.call(t, 'constructor') && t.constructor;
            return 'function' == typeof i && i.toString() === p;
        }
        function L(e) {
            var t = null == e ? void 0 : e.constructor;
            return (
                !!t &&
                ('GeneratorFunction' === t.name ||
                    'GeneratorFunction' === t.displayName)
            );
        }
        function y(e, t, i) {
            l(e, t, {
                enumerable: !1,
                writable: !0,
                configurable: !0,
                value: i,
            });
        }
        function M(e, t, i) {
            l(e, t, {
                enumerable: !1,
                writable: !1,
                configurable: !0,
                value: i,
            });
        }
        function A(e, t) {
            var i = 'isMobX' + e;
            return (
                (t.prototype[i] = !0),
                function (e) {
                    return b(e) && !0 === e[i];
                }
            );
        }
        function v(e) {
            return e instanceof Map;
        }
        function E(e) {
            return e instanceof Set;
        }
        var _ = void 0 !== Object.getOwnPropertySymbols;
        var O =
            'undefined' != typeof Reflect && Reflect.ownKeys
                ? Reflect.ownKeys
                : _
                  ? function (e) {
                        return Object.getOwnPropertyNames(e).concat(
                            Object.getOwnPropertySymbols(e)
                        );
                    }
                  : Object.getOwnPropertyNames;
        function S(e) {
            return null === e ? null : 'object' == typeof e ? '' + e : e;
        }
        function x(e, t) {
            return c.hasOwnProperty.call(e, t);
        }
        var R =
            Object.getOwnPropertyDescriptors ||
            function (e) {
                var t = {};
                return (
                    O(e).forEach(function (i) {
                        t[i] = s(e, i);
                    }),
                    t
                );
            };
        function I(e, t) {
            for (var i = 0; i < t.length; i++) {
                var n = t[i];
                ((n.enumerable = n.enumerable || !1),
                    (n.configurable = !0),
                    'value' in n && (n.writable = !0),
                    Object.defineProperty(
                        e,
                        ((r = n.key),
                        (o = void 0),
                        'symbol' ==
                        typeof (o = (function (e, t) {
                            if ('object' != typeof e || null === e) return e;
                            var i = e[Symbol.toPrimitive];
                            if (void 0 !== i) {
                                var n = i.call(e, t || 'default');
                                if ('object' != typeof n) return n;
                                throw new TypeError(
                                    '@@toPrimitive must return a primitive value.'
                                );
                            }
                            return ('string' === t ? String : Number)(e);
                        })(r, 'string'))
                            ? o
                            : String(o)),
                        n
                    ));
            }
            var r, o;
        }
        function N(e, t, i) {
            return (
                t && I(e.prototype, t),
                i && I(e, i),
                Object.defineProperty(e, 'prototype', { writable: !1 }),
                e
            );
        }
        function w() {
            return (
                (w = Object.assign
                    ? Object.assign.bind()
                    : function (e) {
                          for (var t = 1; t < arguments.length; t++) {
                              var i = arguments[t];
                              for (var n in i)
                                  Object.prototype.hasOwnProperty.call(i, n) &&
                                      (e[n] = i[n]);
                          }
                          return e;
                      }),
                w.apply(this, arguments)
            );
        }
        function P(e, t) {
            ((e.prototype = Object.create(t.prototype)),
                (e.prototype.constructor = e),
                H(e, t));
        }
        function H(e, t) {
            return (
                (H = Object.setPrototypeOf
                    ? Object.setPrototypeOf.bind()
                    : function (e, t) {
                          return ((e.__proto__ = t), e);
                      }),
                H(e, t)
            );
        }
        function D(e) {
            if (void 0 === e)
                throw new ReferenceError(
                    "this hasn't been initialised - super() hasn't been called"
                );
            return e;
        }
        function F(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var i = 0, n = new Array(t); i < t; i++) n[i] = e[i];
            return n;
        }
        function k(e, t) {
            var i =
                ('undefined' != typeof Symbol && e[Symbol.iterator]) ||
                e['@@iterator'];
            if (i) return (i = i.call(e)).next.bind(i);
            if (
                Array.isArray(e) ||
                (i = (function (e, t) {
                    if (e) {
                        if ('string' == typeof e) return F(e, t);
                        var i = Object.prototype.toString.call(e).slice(8, -1);
                        return (
                            'Object' === i &&
                                e.constructor &&
                                (i = e.constructor.name),
                            'Map' === i || 'Set' === i
                                ? Array.from(e)
                                : 'Arguments' === i ||
                                    /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(
                                        i
                                    )
                                  ? F(e, t)
                                  : void 0
                        );
                    }
                })(e)) ||
                (t && e && 'number' == typeof e.length)
            ) {
                i && (e = i);
                var n = 0;
                return function () {
                    return n >= e.length
                        ? { done: !0 }
                        : { done: !1, value: e[n++] };
                };
            }
            throw new TypeError(
                'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
            );
        }
        var B = Symbol('mobx-stored-annotations');
        function V(e) {
            return Object.assign(function (t, i) {
                Y(t, i, e);
            }, e);
        }
        function Y(e, t, i) {
            (x(e, B) || y(e, B, w({}, e[B])),
                (function (e) {
                    return e.annotationType_ === Z;
                })(i) || (e[B][t] = i));
        }
        var G = Symbol('mobx administration'),
            U = (function () {
                function e(e) {
                    (void 0 === e && (e = 'Atom'),
                        (this.name_ = void 0),
                        (this.isPendingUnobservation_ = !1),
                        (this.isBeingObserved_ = !1),
                        (this.observers_ = new Set()),
                        (this.diffValue_ = 0),
                        (this.lastAccessedBy_ = 0),
                        (this.lowestObserverState_ = We.NOT_TRACKING_),
                        (this.onBOL = void 0),
                        (this.onBUOL = void 0),
                        (this.name_ = e));
                }
                var t = e.prototype;
                return (
                    (t.onBO = function () {
                        this.onBOL &&
                            this.onBOL.forEach(function (e) {
                                return e();
                            });
                    }),
                    (t.onBUO = function () {
                        this.onBUOL &&
                            this.onBUOL.forEach(function (e) {
                                return e();
                            });
                    }),
                    (t.reportObserved = function () {
                        return Mt(this);
                    }),
                    (t.reportChanged = function () {
                        (Lt(),
                            At(this),
                            (ut.stateVersion =
                                ut.stateVersion < Number.MAX_SAFE_INTEGER
                                    ? ut.stateVersion + 1
                                    : Number.MIN_SAFE_INTEGER),
                            yt());
                    }),
                    (t.toString = function () {
                        return this.name_;
                    }),
                    e
                );
            })(),
            j = A('Atom', U);
        function $(e, t, i) {
            (void 0 === t && (t = g), void 0 === i && (i = g));
            var n = new U(e);
            return (t !== g && Jt(n, t), i !== g && Xt(n, i), n);
        }
        var z = {
            identity: function (e, t) {
                return e === t;
            },
            structural: function (e, t) {
                return Wn(e, t);
            },
            default: function (e, t) {
                return Object.is
                    ? Object.is(e, t)
                    : e === t
                      ? 0 !== e || 1 / e == 1 / t
                      : e != e && t != t;
            },
            shallow: function (e, t) {
                return Wn(e, t, 1);
            },
        };
        function W(e, t, i) {
            return Ai(e)
                ? e
                : Array.isArray(e)
                  ? Oe.array(e, { name: i })
                  : C(e)
                    ? Oe.object(e, void 0, { name: i })
                    : v(e)
                      ? Oe.map(e, { name: i })
                      : E(e)
                        ? Oe.set(e, { name: i })
                        : 'function' != typeof e || Ut(e) || Qi(e)
                          ? e
                          : L(e)
                            ? Ti(e)
                            : Yt(i, e);
        }
        function K(e) {
            return e;
        }
        var Z = 'override',
            J = V({
                annotationType_: Z,
                make_: function (e, t) {
                    0;
                    0;
                    return 0;
                },
                extend_: function (e, t, i, r) {
                    n(
                        "'" +
                            this.annotationType_ +
                            "' can only be used with 'makeObservable'"
                    );
                },
            });
        function X(e, t) {
            return {
                annotationType_: e,
                options_: t,
                make_: q,
                extend_: ee,
            };
        }
        function q(e, t, i, n) {
            var r;
            if (null != (r = this.options_) && r.bound)
                return null === this.extend_(e, t, i, !1) ? 0 : 1;
            if (n === e.target_)
                return null === this.extend_(e, t, i, !1) ? 0 : 2;
            if (Ut(i.value)) return 1;
            var o = te(e, this, t, i, !1);
            return (l(n, t, o), 2);
        }
        function ee(e, t, i, n) {
            var r = te(e, this, t, i);
            return e.defineProperty_(t, r, n);
        }
        function te(e, t, i, n, r) {
            var o, a, s, l, c, d, f, h;
            (void 0 === r && (r = ut.safeDescriptors),
                (h = n),
                t.annotationType_,
                h.value);
            var p,
                T = n.value;
            null != (o = t.options_) &&
                o.bound &&
                (T = T.bind(null != (p = e.proxy_) ? p : e.target_));
            return {
                value: Fe(
                    null != (a = null == (s = t.options_) ? void 0 : s.name)
                        ? a
                        : i.toString(),
                    T,
                    null !=
                        (l =
                            null == (c = t.options_) ? void 0 : c.autoAction) &&
                        l,
                    null != (d = t.options_) && d.bound
                        ? null != (f = e.proxy_)
                            ? f
                            : e.target_
                        : void 0
                ),
                configurable: !r || e.isPlainObject_,
                enumerable: !1,
                writable: !r,
            };
        }
        function ie(e, t) {
            return {
                annotationType_: e,
                options_: t,
                make_: ne,
                extend_: re,
            };
        }
        function ne(e, t, i, n) {
            var r;
            if (n === e.target_)
                return null === this.extend_(e, t, i, !1) ? 0 : 2;
            if (
                null != (r = this.options_) &&
                r.bound &&
                (!x(e.target_, t) || !Qi(e.target_[t])) &&
                null === this.extend_(e, t, i, !1)
            )
                return 0;
            if (Qi(i.value)) return 1;
            var o = oe(e, this, t, i, !1, !1);
            return (l(n, t, o), 2);
        }
        function re(e, t, i, n) {
            var r,
                o = oe(
                    e,
                    this,
                    t,
                    i,
                    null == (r = this.options_) ? void 0 : r.bound
                );
            return e.defineProperty_(t, o, n);
        }
        function oe(e, t, i, n, r, o) {
            var a;
            (void 0 === o && (o = ut.safeDescriptors),
                (a = n),
                t.annotationType_,
                a.value);
            var s,
                l = n.value;
            (Qi(l) || (l = Ti(l)), r) &&
                ((l = l.bind(
                    null != (s = e.proxy_) ? s : e.target_
                )).isMobXFlow = !0);
            return {
                value: l,
                configurable: !o || e.isPlainObject_,
                enumerable: !1,
                writable: !o,
            };
        }
        function ae(e, t) {
            return {
                annotationType_: e,
                options_: t,
                make_: se,
                extend_: le,
            };
        }
        function se(e, t, i) {
            return null === this.extend_(e, t, i, !1) ? 0 : 1;
        }
        function le(e, t, i, n) {
            return (
                (function (e, t, i, n) {
                    (t.annotationType_, n.get);
                    0;
                })(0, this, 0, i),
                e.defineComputedProperty_(
                    t,
                    w({}, this.options_, { get: i.get, set: i.set }),
                    n
                )
            );
        }
        function ce(e, t) {
            return {
                annotationType_: e,
                options_: t,
                make_: de,
                extend_: fe,
            };
        }
        function de(e, t, i) {
            return null === this.extend_(e, t, i, !1) ? 0 : 1;
        }
        function fe(e, t, i, n) {
            var r, o;
            return (
                (function (e, t) {
                    t.annotationType_;
                    0;
                })(0, this),
                e.defineObservableProperty_(
                    t,
                    i.value,
                    null !=
                        (r = null == (o = this.options_) ? void 0 : o.enhancer)
                        ? r
                        : W,
                    n
                )
            );
        }
        var he = 'true',
            pe = Te();
        function Te(e) {
            return {
                annotationType_: he,
                options_: e,
                make_: ue,
                extend_: ge,
            };
        }
        function ue(e, t, i, n) {
            var r, o, a, s;
            if (i.get) return Ie.make_(e, t, i, n);
            if (i.set) {
                var c = Fe(t.toString(), i.set);
                return n === e.target_
                    ? null ===
                      e.defineProperty_(t, {
                          configurable: !ut.safeDescriptors || e.isPlainObject_,
                          set: c,
                      })
                        ? 0
                        : 2
                    : (l(n, t, { configurable: !0, set: c }), 2);
            }
            if (n !== e.target_ && 'function' == typeof i.value)
                return L(i.value)
                    ? (null != (s = this.options_) && s.autoBind
                          ? Ti.bound
                          : Ti
                      ).make_(e, t, i, n)
                    : (null != (a = this.options_) && a.autoBind
                          ? Yt.bound
                          : Yt
                      ).make_(e, t, i, n);
            var d,
                f =
                    !1 === (null == (r = this.options_) ? void 0 : r.deep)
                        ? Oe.ref
                        : Oe;
            'function' == typeof i.value &&
                null != (o = this.options_) &&
                o.autoBind &&
                (i.value = i.value.bind(
                    null != (d = e.proxy_) ? d : e.target_
                ));
            return f.make_(e, t, i, n);
        }
        function ge(e, t, i, n) {
            var r, o, a;
            if (i.get) return Ie.extend_(e, t, i, n);
            if (i.set)
                return e.defineProperty_(
                    t,
                    {
                        configurable: !ut.safeDescriptors || e.isPlainObject_,
                        set: Fe(t.toString(), i.set),
                    },
                    n
                );
            'function' == typeof i.value &&
                null != (r = this.options_) &&
                r.autoBind &&
                (i.value = i.value.bind(
                    null != (a = e.proxy_) ? a : e.target_
                ));
            return (
                !1 === (null == (o = this.options_) ? void 0 : o.deep)
                    ? Oe.ref
                    : Oe
            ).extend_(e, t, i, n);
        }
        var Qe = {
            deep: !0,
            name: void 0,
            defaultDecorator: void 0,
            proxy: !0,
        };
        function me(e) {
            return e || Qe;
        }
        Object.freeze(Qe);
        var be = ce('observable'),
            Ce = ce('observable.ref', { enhancer: K }),
            Le = ce('observable.shallow', {
                enhancer: function (e, t, i) {
                    return null == e || Rn(e) || Tn(e) || Ln(e) || An(e)
                        ? e
                        : Array.isArray(e)
                          ? Oe.array(e, { name: i, deep: !1 })
                          : C(e)
                            ? Oe.object(e, void 0, { name: i, deep: !1 })
                            : v(e)
                              ? Oe.map(e, { name: i, deep: !1 })
                              : E(e)
                                ? Oe.set(e, { name: i, deep: !1 })
                                : void 0;
                },
            }),
            ye = ce('observable.struct', {
                enhancer: function (e, t) {
                    return Wn(e, t) ? t : e;
                },
            }),
            Me = V(be);
        function Ae(e) {
            return !0 === e.deep
                ? W
                : !1 === e.deep
                  ? K
                  : (t = e.defaultDecorator) &&
                      null !=
                          (i = null == (n = t.options_) ? void 0 : n.enhancer)
                    ? i
                    : W;
            var t, i, n;
        }
        function ve(e, t, i) {
            if (!m(t))
                return Ai(e)
                    ? e
                    : C(e)
                      ? Oe.object(e, t, i)
                      : Array.isArray(e)
                        ? Oe.array(e, t)
                        : v(e)
                          ? Oe.map(e, t)
                          : E(e)
                            ? Oe.set(e, t)
                            : 'object' == typeof e && null !== e
                              ? e
                              : Oe.box(e, t);
            Y(e, t, be);
        }
        a(ve, Me);
        var Ee,
            _e,
            Oe = a(ve, {
                box: function (e, t) {
                    var i = me(t);
                    return new $e(e, Ae(i), i.name, !0, i.equals);
                },
                array: function (e, t) {
                    var i = me(t);
                    return (!1 === ut.useProxies || !1 === i.proxy ? Gn : on)(
                        e,
                        Ae(i),
                        i.name
                    );
                },
                map: function (e, t) {
                    var i = me(t);
                    return new Cn(e, Ae(i), i.name);
                },
                set: function (e, t) {
                    var i = me(t);
                    return new Mn(e, Ae(i), i.name);
                },
                object: function (e, t, i) {
                    return ri(
                        !1 === ut.useProxies ||
                            !1 === (null == i ? void 0 : i.proxy)
                            ? On({}, i)
                            : (function (e, t) {
                                  var i, n;
                                  return (
                                      T(),
                                      (e = On(e, t)),
                                      null != (n = (i = e[G]).proxy_)
                                          ? n
                                          : (i.proxy_ = new Proxy(e, Ui))
                                  );
                              })({}, i),
                        e,
                        t
                    );
                },
                ref: V(Ce),
                shallow: V(Le),
                deep: Me,
                struct: V(ye),
            }),
            Se = 'computed',
            xe = ae(Se),
            Re = ae('computed.struct', { equals: z.structural }),
            Ie = function (e, t) {
                if (m(t)) return Y(e, t, xe);
                if (C(e)) return V(ae(Se, e));
                var i = C(t) ? t : {};
                return (
                    (i.get = e),
                    i.name || (i.name = e.name || ''),
                    new Ze(i)
                );
            };
        (Object.assign(Ie, xe), (Ie.struct = V(Re)));
        var Ne,
            we = 0,
            Pe = 1,
            He =
                null !=
                    (Ee =
                        null == (_e = s(function () {}, 'name'))
                            ? void 0
                            : _e.configurable) && Ee,
            De = {
                value: 'action',
                configurable: !0,
                writable: !1,
                enumerable: !1,
            };
        function Fe(e, t, i, n) {
            function r() {
                return ke(e, i, t, n || this, arguments);
            }
            return (
                void 0 === i && (i = !1),
                (r.isMobxAction = !0),
                He && ((De.value = e), l(r, 'name', De)),
                r
            );
        }
        function ke(e, t, i, n, r) {
            var o = Be(e, t, n, r);
            try {
                return i.apply(n, r);
            } catch (e) {
                throw ((o.error_ = e), e);
            } finally {
                Ve(o);
            }
        }
        function Be(e, t, i, n) {
            var r = ut.trackingDerivation,
                o = !t || !r;
            Lt();
            var a = ut.allowStateChanges;
            o && (at(), (a = Ge(!0)));
            var s = {
                runAsAction_: o,
                prevDerivation_: r,
                prevAllowStateChanges_: a,
                prevAllowStateReads_: lt(!0),
                notifySpy_: !1,
                startTime_: 0,
                actionId_: Pe++,
                parentActionId_: we,
            };
            return ((we = s.actionId_), s);
        }
        function Ve(e) {
            (we !== e.actionId_ && n(30),
                (we = e.parentActionId_),
                void 0 !== e.error_ && (ut.suppressReactionErrors = !0),
                Ue(e.prevAllowStateChanges_),
                ct(e.prevAllowStateReads_),
                yt(),
                e.runAsAction_ && st(e.prevDerivation_),
                (ut.suppressReactionErrors = !1));
        }
        function Ye(e, t) {
            var i = Ge(e);
            try {
                return t();
            } finally {
                Ue(i);
            }
        }
        function Ge(e) {
            var t = ut.allowStateChanges;
            return ((ut.allowStateChanges = e), t);
        }
        function Ue(e) {
            ut.allowStateChanges = e;
        }
        Ne = Symbol.toPrimitive;
        var je,
            $e = (function (e) {
                function t(t, i, n, r, o) {
                    var a;
                    return (
                        void 0 === n && (n = 'ObservableValue'),
                        void 0 === r && (r = !0),
                        void 0 === o && (o = z.default),
                        ((a = e.call(this, n) || this).enhancer = void 0),
                        (a.name_ = void 0),
                        (a.equals = void 0),
                        (a.hasUnreportedChange_ = !1),
                        (a.interceptors_ = void 0),
                        (a.changeListeners_ = void 0),
                        (a.value_ = void 0),
                        (a.dehancer = void 0),
                        (a.enhancer = i),
                        (a.name_ = n),
                        (a.equals = o),
                        (a.value_ = i(t, void 0, n)),
                        a
                    );
                }
                P(t, e);
                var i = t.prototype;
                return (
                    (i.dehanceValue = function (e) {
                        return void 0 !== this.dehancer ? this.dehancer(e) : e;
                    }),
                    (i.set = function (e) {
                        this.value_;
                        if ((e = this.prepareNewValue_(e)) !== ut.UNCHANGED) {
                            (0, this.setNewValue_(e));
                        }
                    }),
                    (i.prepareNewValue_ = function (e) {
                        if ((it(this), ji(this))) {
                            var t = zi(this, {
                                object: this,
                                type: tn,
                                newValue: e,
                            });
                            if (!t) return ut.UNCHANGED;
                            e = t.newValue;
                        }
                        return (
                            (e = this.enhancer(e, this.value_, this.name_)),
                            this.equals(this.value_, e) ? ut.UNCHANGED : e
                        );
                    }),
                    (i.setNewValue_ = function (e) {
                        var t = this.value_;
                        ((this.value_ = e),
                            this.reportChanged(),
                            Wi(this) &&
                                Zi(this, {
                                    type: tn,
                                    object: this,
                                    newValue: e,
                                    oldValue: t,
                                }));
                    }),
                    (i.get = function () {
                        return (
                            this.reportObserved(),
                            this.dehanceValue(this.value_)
                        );
                    }),
                    (i.intercept_ = function (e) {
                        return $i(this, e);
                    }),
                    (i.observe_ = function (e, t) {
                        return (
                            t &&
                                e({
                                    observableKind: 'value',
                                    debugObjectName: this.name_,
                                    object: this,
                                    type: tn,
                                    newValue: this.value_,
                                    oldValue: void 0,
                                }),
                            Ki(this, e)
                        );
                    }),
                    (i.raw = function () {
                        return this.value_;
                    }),
                    (i.toJSON = function () {
                        return this.get();
                    }),
                    (i.toString = function () {
                        return this.name_ + '[' + this.value_ + ']';
                    }),
                    (i.valueOf = function () {
                        return S(this.get());
                    }),
                    (i[Ne] = function () {
                        return this.valueOf();
                    }),
                    t
                );
            })(U),
            ze = A('ObservableValue', $e);
        je = Symbol.toPrimitive;
        var We,
            Ke,
            Ze = (function () {
                function e(e) {
                    ((this.dependenciesState_ = We.NOT_TRACKING_),
                        (this.observing_ = []),
                        (this.newObserving_ = null),
                        (this.isBeingObserved_ = !1),
                        (this.isPendingUnobservation_ = !1),
                        (this.observers_ = new Set()),
                        (this.diffValue_ = 0),
                        (this.runId_ = 0),
                        (this.lastAccessedBy_ = 0),
                        (this.lowestObserverState_ = We.UP_TO_DATE_),
                        (this.unboundDepsCount_ = 0),
                        (this.value_ = new Xe(null)),
                        (this.name_ = void 0),
                        (this.triggeredBy_ = void 0),
                        (this.isComputing_ = !1),
                        (this.isRunningSetter_ = !1),
                        (this.derivation = void 0),
                        (this.setter_ = void 0),
                        (this.isTracing_ = Ke.NONE),
                        (this.scope_ = void 0),
                        (this.equals_ = void 0),
                        (this.requiresReaction_ = void 0),
                        (this.keepAlive_ = void 0),
                        (this.onBOL = void 0),
                        (this.onBUOL = void 0),
                        e.get || n(31),
                        (this.derivation = e.get),
                        (this.name_ = e.name || 'ComputedValue'),
                        e.set &&
                            (this.setter_ = Fe('ComputedValue-setter', e.set)),
                        (this.equals_ =
                            e.equals ||
                            (e.compareStructural || e.struct
                                ? z.structural
                                : z.default)),
                        (this.scope_ = e.context),
                        (this.requiresReaction_ = e.requiresReaction),
                        (this.keepAlive_ = !!e.keepAlive));
                }
                var t = e.prototype;
                return (
                    (t.onBecomeStale_ = function () {
                        !(function (e) {
                            if (e.lowestObserverState_ !== We.UP_TO_DATE_)
                                return;
                            ((e.lowestObserverState_ = We.POSSIBLY_STALE_),
                                e.observers_.forEach(function (e) {
                                    e.dependenciesState_ === We.UP_TO_DATE_ &&
                                        ((e.dependenciesState_ =
                                            We.POSSIBLY_STALE_),
                                        e.onBecomeStale_());
                                }));
                        })(this);
                    }),
                    (t.onBO = function () {
                        this.onBOL &&
                            this.onBOL.forEach(function (e) {
                                return e();
                            });
                    }),
                    (t.onBUO = function () {
                        this.onBUOL &&
                            this.onBUOL.forEach(function (e) {
                                return e();
                            });
                    }),
                    (t.get = function () {
                        if (
                            (this.isComputing_ &&
                                n(32, this.name_, this.derivation),
                            0 !== ut.inBatch ||
                                0 !== this.observers_.size ||
                                this.keepAlive_)
                        ) {
                            if ((Mt(this), et(this))) {
                                var e = ut.trackingContext;
                                (this.keepAlive_ &&
                                    !e &&
                                    (ut.trackingContext = this),
                                    this.trackAndCompute() &&
                                        (function (e) {
                                            if (
                                                e.lowestObserverState_ ===
                                                We.STALE_
                                            )
                                                return;
                                            ((e.lowestObserverState_ =
                                                We.STALE_),
                                                e.observers_.forEach(
                                                    function (t) {
                                                        t.dependenciesState_ ===
                                                        We.POSSIBLY_STALE_
                                                            ? (t.dependenciesState_ =
                                                                  We.STALE_)
                                                            : t.dependenciesState_ ===
                                                                  We.UP_TO_DATE_ &&
                                                              (e.lowestObserverState_ =
                                                                  We.UP_TO_DATE_);
                                                    }
                                                ));
                                        })(this),
                                    (ut.trackingContext = e));
                            }
                        } else
                            et(this) &&
                                (this.warnAboutUntrackedRead_(),
                                Lt(),
                                (this.value_ = this.computeValue_(!1)),
                                yt());
                        var t = this.value_;
                        if (qe(t)) throw t.cause;
                        return t;
                    }),
                    (t.set = function (e) {
                        if (this.setter_) {
                            (this.isRunningSetter_ && n(33, this.name_),
                                (this.isRunningSetter_ = !0));
                            try {
                                this.setter_.call(this.scope_, e);
                            } finally {
                                this.isRunningSetter_ = !1;
                            }
                        } else n(34, this.name_);
                    }),
                    (t.trackAndCompute = function () {
                        var e = this.value_,
                            t = this.dependenciesState_ === We.NOT_TRACKING_,
                            i = this.computeValue_(!0),
                            n = t || qe(e) || qe(i) || !this.equals_(e, i);
                        return (n && (this.value_ = i), n);
                    }),
                    (t.computeValue_ = function (e) {
                        this.isComputing_ = !0;
                        var t,
                            i = Ge(!1);
                        if (e) t = nt(this, this.derivation, this.scope_);
                        else if (!0 === ut.disableErrorBoundaries)
                            t = this.derivation.call(this.scope_);
                        else
                            try {
                                t = this.derivation.call(this.scope_);
                            } catch (e) {
                                t = new Xe(e);
                            }
                        return (Ue(i), (this.isComputing_ = !1), t);
                    }),
                    (t.suspend_ = function () {
                        this.keepAlive_ || (rt(this), (this.value_ = void 0));
                    }),
                    (t.observe_ = function (e, t) {
                        var i = this,
                            n = !0,
                            r = void 0;
                        return jt(function () {
                            var o = i.get();
                            if (!n || t) {
                                var a = at();
                                (e({
                                    observableKind: 'computed',
                                    debugObjectName: i.name_,
                                    type: tn,
                                    object: i,
                                    newValue: o,
                                    oldValue: r,
                                }),
                                    st(a));
                            }
                            ((n = !1), (r = o));
                        });
                    }),
                    (t.warnAboutUntrackedRead_ = function () {}),
                    (t.toString = function () {
                        return (
                            this.name_ + '[' + this.derivation.toString() + ']'
                        );
                    }),
                    (t.valueOf = function () {
                        return S(this.get());
                    }),
                    (t[je] = function () {
                        return this.valueOf();
                    }),
                    e
                );
            })(),
            Je = A('ComputedValue', Ze);
        (!(function (e) {
            ((e[(e.NOT_TRACKING_ = -1)] = 'NOT_TRACKING_'),
                (e[(e.UP_TO_DATE_ = 0)] = 'UP_TO_DATE_'),
                (e[(e.POSSIBLY_STALE_ = 1)] = 'POSSIBLY_STALE_'),
                (e[(e.STALE_ = 2)] = 'STALE_'));
        })(We || (We = {})),
            (function (e) {
                ((e[(e.NONE = 0)] = 'NONE'),
                    (e[(e.LOG = 1)] = 'LOG'),
                    (e[(e.BREAK = 2)] = 'BREAK'));
            })(Ke || (Ke = {})));
        var Xe = function (e) {
            ((this.cause = void 0), (this.cause = e));
        };
        function qe(e) {
            return e instanceof Xe;
        }
        function et(e) {
            switch (e.dependenciesState_) {
                case We.UP_TO_DATE_:
                    return !1;
                case We.NOT_TRACKING_:
                case We.STALE_:
                    return !0;
                case We.POSSIBLY_STALE_:
                    for (
                        var t = lt(!0),
                            i = at(),
                            n = e.observing_,
                            r = n.length,
                            o = 0;
                        o < r;
                        o++
                    ) {
                        var a = n[o];
                        if (Je(a)) {
                            if (ut.disableErrorBoundaries) a.get();
                            else
                                try {
                                    a.get();
                                } catch (e) {
                                    return (st(i), ct(t), !0);
                                }
                            if (e.dependenciesState_ === We.STALE_)
                                return (st(i), ct(t), !0);
                        }
                    }
                    return (dt(e), st(i), ct(t), !1);
            }
        }
        function tt() {
            return null !== ut.trackingDerivation;
        }
        function it(e) {}
        function nt(e, t, i) {
            var n = lt(!0);
            (dt(e),
                (e.newObserving_ = new Array(e.observing_.length + 100)),
                (e.unboundDepsCount_ = 0),
                (e.runId_ = ++ut.runId));
            var r,
                o = ut.trackingDerivation;
            if (
                ((ut.trackingDerivation = e),
                ut.inBatch++,
                !0 === ut.disableErrorBoundaries)
            )
                r = t.call(i);
            else
                try {
                    r = t.call(i);
                } catch (e) {
                    r = new Xe(e);
                }
            return (
                ut.inBatch--,
                (ut.trackingDerivation = o),
                (function (e) {
                    for (
                        var t = e.observing_,
                            i = (e.observing_ = e.newObserving_),
                            n = We.UP_TO_DATE_,
                            r = 0,
                            o = e.unboundDepsCount_,
                            a = 0;
                        a < o;
                        a++
                    ) {
                        var s = i[a];
                        (0 === s.diffValue_ &&
                            ((s.diffValue_ = 1), r !== a && (i[r] = s), r++),
                            s.dependenciesState_ > n &&
                                (n = s.dependenciesState_));
                    }
                    ((i.length = r), (e.newObserving_ = null), (o = t.length));
                    for (; o--; ) {
                        var l = t[o];
                        (0 === l.diffValue_ && bt(l, e), (l.diffValue_ = 0));
                    }
                    for (; r--; ) {
                        var c = i[r];
                        1 === c.diffValue_ && ((c.diffValue_ = 0), mt(c, e));
                    }
                    n !== We.UP_TO_DATE_ &&
                        ((e.dependenciesState_ = n), e.onBecomeStale_());
                })(e),
                ct(n),
                r
            );
        }
        function rt(e) {
            var t = e.observing_;
            e.observing_ = [];
            for (var i = t.length; i--; ) bt(t[i], e);
            e.dependenciesState_ = We.NOT_TRACKING_;
        }
        function ot(e) {
            var t = at();
            try {
                return e();
            } finally {
                st(t);
            }
        }
        function at() {
            var e = ut.trackingDerivation;
            return ((ut.trackingDerivation = null), e);
        }
        function st(e) {
            ut.trackingDerivation = e;
        }
        function lt(e) {
            var t = ut.allowStateReads;
            return ((ut.allowStateReads = e), t);
        }
        function ct(e) {
            ut.allowStateReads = e;
        }
        function dt(e) {
            if (e.dependenciesState_ !== We.UP_TO_DATE_) {
                e.dependenciesState_ = We.UP_TO_DATE_;
                for (var t = e.observing_, i = t.length; i--; )
                    t[i].lowestObserverState_ = We.UP_TO_DATE_;
            }
        }
        var ft = [
                'mobxGuid',
                'spyListeners',
                'enforceActions',
                'computedRequiresReaction',
                'reactionRequiresObservable',
                'observableRequiresReaction',
                'allowStateReads',
                'disableErrorBoundaries',
                'runId',
                'UNCHANGED',
                'useProxies',
            ],
            ht = function () {
                ((this.version = 6),
                    (this.UNCHANGED = {}),
                    (this.trackingDerivation = null),
                    (this.trackingContext = null),
                    (this.runId = 0),
                    (this.mobxGuid = 0),
                    (this.inBatch = 0),
                    (this.pendingUnobservations = []),
                    (this.pendingReactions = []),
                    (this.isRunningReactions = !1),
                    (this.allowStateChanges = !1),
                    (this.allowStateReads = !0),
                    (this.enforceActions = !0),
                    (this.spyListeners = []),
                    (this.globalReactionErrorHandlers = []),
                    (this.computedRequiresReaction = !1),
                    (this.reactionRequiresObservable = !1),
                    (this.observableRequiresReaction = !1),
                    (this.disableErrorBoundaries = !1),
                    (this.suppressReactionErrors = !1),
                    (this.useProxies = !0),
                    (this.verifyProxies = !1),
                    (this.safeDescriptors = !0),
                    (this.stateVersion = Number.MIN_SAFE_INTEGER));
            },
            pt = !0,
            Tt = !1,
            ut = (function () {
                var e = o();
                return (
                    e.__mobxInstanceCount > 0 && !e.__mobxGlobals && (pt = !1),
                    e.__mobxGlobals &&
                        e.__mobxGlobals.version !== new ht().version &&
                        (pt = !1),
                    pt
                        ? e.__mobxGlobals
                            ? ((e.__mobxInstanceCount += 1),
                              e.__mobxGlobals.UNCHANGED ||
                                  (e.__mobxGlobals.UNCHANGED = {}),
                              e.__mobxGlobals)
                            : ((e.__mobxInstanceCount = 1),
                              (e.__mobxGlobals = new ht()))
                        : (setTimeout(function () {
                              Tt || n(35);
                          }, 1),
                          new ht())
                );
            })();
        function gt() {
            return ut;
        }
        function Qt() {
            var e = new ht();
            for (var t in e) -1 === ft.indexOf(t) && (ut[t] = e[t]);
            ut.allowStateChanges = !ut.enforceActions;
        }
        function mt(e, t) {
            (e.observers_.add(t),
                e.lowestObserverState_ > t.dependenciesState_ &&
                    (e.lowestObserverState_ = t.dependenciesState_));
        }
        function bt(e, t) {
            (e.observers_.delete(t), 0 === e.observers_.size && Ct(e));
        }
        function Ct(e) {
            !1 === e.isPendingUnobservation_ &&
                ((e.isPendingUnobservation_ = !0),
                ut.pendingUnobservations.push(e));
        }
        function Lt() {
            ut.inBatch++;
        }
        function yt() {
            if (0 == --ut.inBatch) {
                St();
                for (
                    var e = ut.pendingUnobservations, t = 0;
                    t < e.length;
                    t++
                ) {
                    var i = e[t];
                    ((i.isPendingUnobservation_ = !1),
                        0 === i.observers_.size &&
                            (i.isBeingObserved_ &&
                                ((i.isBeingObserved_ = !1), i.onBUO()),
                            i instanceof Ze && i.suspend_()));
                }
                ut.pendingUnobservations = [];
            }
        }
        function Mt(e) {
            var t = ut.trackingDerivation;
            return null !== t
                ? (t.runId_ !== e.lastAccessedBy_ &&
                      ((e.lastAccessedBy_ = t.runId_),
                      (t.newObserving_[t.unboundDepsCount_++] = e),
                      !e.isBeingObserved_ &&
                          ut.trackingContext &&
                          ((e.isBeingObserved_ = !0), e.onBO())),
                  e.isBeingObserved_)
                : (0 === e.observers_.size && ut.inBatch > 0 && Ct(e), !1);
        }
        function At(e) {
            e.lowestObserverState_ !== We.STALE_ &&
                ((e.lowestObserverState_ = We.STALE_),
                e.observers_.forEach(function (e) {
                    (e.dependenciesState_ === We.UP_TO_DATE_ &&
                        e.onBecomeStale_(),
                        (e.dependenciesState_ = We.STALE_));
                }));
        }
        var vt = (function () {
            function e(e, t, i, n) {
                (void 0 === e && (e = 'Reaction'),
                    (this.name_ = void 0),
                    (this.onInvalidate_ = void 0),
                    (this.errorHandler_ = void 0),
                    (this.requiresObservable_ = void 0),
                    (this.observing_ = []),
                    (this.newObserving_ = []),
                    (this.dependenciesState_ = We.NOT_TRACKING_),
                    (this.diffValue_ = 0),
                    (this.runId_ = 0),
                    (this.unboundDepsCount_ = 0),
                    (this.isDisposed_ = !1),
                    (this.isScheduled_ = !1),
                    (this.isTrackPending_ = !1),
                    (this.isRunning_ = !1),
                    (this.isTracing_ = Ke.NONE),
                    (this.name_ = e),
                    (this.onInvalidate_ = t),
                    (this.errorHandler_ = i),
                    (this.requiresObservable_ = n));
            }
            var t = e.prototype;
            return (
                (t.onBecomeStale_ = function () {
                    this.schedule_();
                }),
                (t.schedule_ = function () {
                    this.isScheduled_ ||
                        ((this.isScheduled_ = !0),
                        ut.pendingReactions.push(this),
                        St());
                }),
                (t.isScheduled = function () {
                    return this.isScheduled_;
                }),
                (t.runReaction_ = function () {
                    if (!this.isDisposed_) {
                        (Lt(), (this.isScheduled_ = !1));
                        var e = ut.trackingContext;
                        if (((ut.trackingContext = this), et(this))) {
                            this.isTrackPending_ = !0;
                            try {
                                this.onInvalidate_();
                            } catch (e) {
                                this.reportExceptionInDerivation_(e);
                            }
                        }
                        ((ut.trackingContext = e), yt());
                    }
                }),
                (t.track = function (e) {
                    if (!this.isDisposed_) {
                        Lt();
                        (0, (this.isRunning_ = !0));
                        var t = ut.trackingContext;
                        ut.trackingContext = this;
                        var i = nt(this, e, void 0);
                        ((ut.trackingContext = t),
                            (this.isRunning_ = !1),
                            (this.isTrackPending_ = !1),
                            this.isDisposed_ && rt(this),
                            qe(i) && this.reportExceptionInDerivation_(i.cause),
                            yt());
                    }
                }),
                (t.reportExceptionInDerivation_ = function (e) {
                    var t = this;
                    if (this.errorHandler_) this.errorHandler_(e, this);
                    else {
                        if (ut.disableErrorBoundaries) throw e;
                        var i = "[mobx] uncaught error in '" + this + "'";
                        (ut.suppressReactionErrors || console.error(i, e),
                            ut.globalReactionErrorHandlers.forEach(
                                function (i) {
                                    return i(e, t);
                                }
                            ));
                    }
                }),
                (t.dispose = function () {
                    this.isDisposed_ ||
                        ((this.isDisposed_ = !0),
                        this.isRunning_ || (Lt(), rt(this), yt()));
                }),
                (t.getDisposer_ = function (e) {
                    var t = this,
                        i = function i() {
                            (t.dispose(),
                                null == e ||
                                    null == e.removeEventListener ||
                                    e.removeEventListener('abort', i));
                        };
                    return (
                        null == e ||
                            null == e.addEventListener ||
                            e.addEventListener('abort', i),
                        (i[G] = this),
                        i
                    );
                }),
                (t.toString = function () {
                    return 'Reaction[' + this.name_ + ']';
                }),
                (t.trace = function (e) {
                    (void 0 === e && (e = !1), ki(this, e));
                }),
                e
            );
        })();
        function Et(e) {
            return (
                ut.globalReactionErrorHandlers.push(e),
                function () {
                    var t = ut.globalReactionErrorHandlers.indexOf(e);
                    t >= 0 && ut.globalReactionErrorHandlers.splice(t, 1);
                }
            );
        }
        var _t = 100,
            Ot = function (e) {
                return e();
            };
        function St() {
            ut.inBatch > 0 || ut.isRunningReactions || Ot(xt);
        }
        function xt() {
            ut.isRunningReactions = !0;
            for (var e = ut.pendingReactions, t = 0; e.length > 0; ) {
                ++t === _t &&
                    (console.error('[mobx] cycle in reaction: ' + e[0]),
                    e.splice(0));
                for (var i = e.splice(0), n = 0, r = i.length; n < r; n++)
                    i[n].runReaction_();
            }
            ut.isRunningReactions = !1;
        }
        var Rt = A('Reaction', vt);
        function It(e) {
            return (
                console.warn('[mobx.spy] Is a no-op in production builds'),
                function () {}
            );
        }
        var Nt = 'action',
            wt = 'autoAction',
            Pt = '<unnamed action>',
            Ht = X(Nt),
            Dt = X('action.bound', { bound: !0 }),
            Ft = X(wt, { autoAction: !0 }),
            kt = X('autoAction.bound', { autoAction: !0, bound: !0 });
        function Bt(e) {
            return function (t, i) {
                return Q(t)
                    ? Fe(t.name || Pt, t, e)
                    : Q(i)
                      ? Fe(t, i, e)
                      : m(i)
                        ? Y(t, i, e ? Ft : Ht)
                        : m(t)
                          ? V(X(e ? wt : Nt, { name: t, autoAction: e }))
                          : void 0;
            };
        }
        var Vt = Bt(!1);
        Object.assign(Vt, Ht);
        var Yt = Bt(!0);
        function Gt(e) {
            return ke(e.name || Pt, !1, e, this, void 0);
        }
        function Ut(e) {
            return Q(e) && !0 === e.isMobxAction;
        }
        function jt(e, t) {
            var i, n, r, o, a;
            void 0 === t && (t = f);
            var s,
                l =
                    null != (i = null == (n = t) ? void 0 : n.name)
                        ? i
                        : 'Autorun';
            if (!t.scheduler && !t.delay)
                s = new vt(
                    l,
                    function () {
                        this.track(h);
                    },
                    t.onError,
                    t.requiresObservable
                );
            else {
                var c = zt(t),
                    d = !1;
                s = new vt(
                    l,
                    function () {
                        d ||
                            ((d = !0),
                            c(function () {
                                ((d = !1), s.isDisposed_ || s.track(h));
                            }));
                    },
                    t.onError,
                    t.requiresObservable
                );
            }
            function h() {
                e(s);
            }
            return (
                (null != (r = t) && null != (o = r.signal) && o.aborted) ||
                    s.schedule_(),
                s.getDisposer_(null == (a = t) ? void 0 : a.signal)
            );
        }
        (Object.assign(Yt, Ft), (Vt.bound = V(Dt)), (Yt.bound = V(kt)));
        var $t = function (e) {
            return e();
        };
        function zt(e) {
            return e.scheduler
                ? e.scheduler
                : e.delay
                  ? function (t) {
                        return setTimeout(t, e.delay);
                    }
                  : $t;
        }
        function Wt(e, t, i) {
            var n, r, o, a;
            void 0 === i && (i = f);
            var s,
                l,
                c,
                d,
                h = null != (n = i.name) ? n : 'Reaction',
                p = Vt(
                    h,
                    i.onError
                        ? ((s = i.onError),
                          (l = t),
                          function () {
                              try {
                                  return l.apply(this, arguments);
                              } catch (e) {
                                  s.call(this, e);
                              }
                          })
                        : t
                ),
                T = !i.scheduler && !i.delay,
                u = zt(i),
                g = !0,
                Q = !1,
                m = i.compareStructural ? z.structural : i.equals || z.default,
                b = new vt(
                    h,
                    function () {
                        g || T ? C() : Q || ((Q = !0), u(C));
                    },
                    i.onError,
                    i.requiresObservable
                );
            function C() {
                if (((Q = !1), !b.isDisposed_)) {
                    var t = !1;
                    (b.track(function () {
                        var i = Ye(!1, function () {
                            return e(b);
                        });
                        ((t = g || !m(c, i)), (d = c), (c = i));
                    }),
                        ((g && i.fireImmediately) || (!g && t)) && p(c, d, b),
                        (g = !1));
                }
            }
            return (
                (null != (r = i) && null != (o = r.signal) && o.aborted) ||
                    b.schedule_(),
                b.getDisposer_(null == (a = i) ? void 0 : a.signal)
            );
        }
        var Kt = 'onBO',
            Zt = 'onBUO';
        function Jt(e, t, i) {
            return qt(Kt, e, t, i);
        }
        function Xt(e, t, i) {
            return qt(Zt, e, t, i);
        }
        function qt(e, t, i, n) {
            var r = 'function' == typeof n ? Un(t, i) : Un(t),
                o = Q(n) ? n : i,
                a = e + 'L';
            return (
                r[a] ? r[a].add(o) : (r[a] = new Set([o])),
                function () {
                    var e = r[a];
                    e && (e.delete(o), 0 === e.size && delete r[a]);
                }
            );
        }
        var ei = 'never',
            ti = 'always',
            ii = 'observed';
        function ni(e) {
            !0 === e.isolateGlobalState &&
                (function () {
                    if (
                        ((ut.pendingReactions.length ||
                            ut.inBatch ||
                            ut.isRunningReactions) &&
                            n(36),
                        (Tt = !0),
                        pt)
                    ) {
                        var e = o();
                        (0 == --e.__mobxInstanceCount &&
                            (e.__mobxGlobals = void 0),
                            (ut = new ht()));
                    }
                })();
            var t,
                i,
                r = e.useProxies,
                a = e.enforceActions;
            if (
                (void 0 !== r &&
                    (ut.useProxies =
                        r === ti || (r !== ei && 'undefined' != typeof Proxy)),
                'ifavailable' === r && (ut.verifyProxies = !0),
                void 0 !== a)
            ) {
                var s = a === ti ? ti : a === ii;
                ((ut.enforceActions = s),
                    (ut.allowStateChanges = !0 !== s && s !== ti));
            }
            ([
                'computedRequiresReaction',
                'reactionRequiresObservable',
                'observableRequiresReaction',
                'disableErrorBoundaries',
                'safeDescriptors',
            ].forEach(function (t) {
                t in e && (ut[t] = !!e[t]);
            }),
                (ut.allowStateReads = !ut.observableRequiresReaction),
                e.reactionScheduler &&
                    ((t = e.reactionScheduler),
                    (i = Ot),
                    (Ot = function (e) {
                        return t(function () {
                            return i(e);
                        });
                    })));
        }
        function ri(e, t, i, n) {
            var r = R(t),
                o = On(e, n)[G];
            Lt();
            try {
                O(r).forEach(function (e) {
                    o.extend_(e, r[e], !i || !(e in i) || i[e]);
                });
            } finally {
                yt();
            }
            return e;
        }
        function oi(e, t) {
            return ai(Un(e, t));
        }
        function ai(e) {
            var t,
                i = { name: e.name_ };
            return (
                e.observing_ &&
                    e.observing_.length > 0 &&
                    (i.dependencies = ((t = e.observing_),
                    Array.from(new Set(t))).map(ai)),
                i
            );
        }
        function si(e, t) {
            return li(Un(e, t));
        }
        function li(e) {
            var t = { name: e.name_ };
            return (
                (function (e) {
                    return e.observers_ && e.observers_.size > 0;
                })(e) &&
                    (t.observers = Array.from(
                        (function (e) {
                            return e.observers_;
                        })(e)
                    ).map(li)),
                t
            );
        }
        var ci = 0;
        function di() {
            this.message = 'FLOW_CANCELLED';
        }
        function fi(e) {
            return e instanceof di;
        }
        di.prototype = Object.create(Error.prototype);
        var hi = ie('flow'),
            pi = ie('flow.bound', { bound: !0 }),
            Ti = Object.assign(function (e, t) {
                if (m(t)) return Y(e, t, hi);
                var i = e,
                    n = i.name || '<unnamed flow>',
                    r = function () {
                        var e,
                            t = arguments,
                            r = ++ci,
                            o = Vt(n + ' - runid: ' + r + ' - init', i).apply(
                                this,
                                t
                            ),
                            a = void 0,
                            s = new Promise(function (t, i) {
                                var s = 0;
                                function l(e) {
                                    var t;
                                    a = void 0;
                                    try {
                                        t = Vt(
                                            n +
                                                ' - runid: ' +
                                                r +
                                                ' - yield ' +
                                                s++,
                                            o.next
                                        ).call(o, e);
                                    } catch (e) {
                                        return i(e);
                                    }
                                    d(t);
                                }
                                function c(e) {
                                    var t;
                                    a = void 0;
                                    try {
                                        t = Vt(
                                            n +
                                                ' - runid: ' +
                                                r +
                                                ' - yield ' +
                                                s++,
                                            o.throw
                                        ).call(o, e);
                                    } catch (e) {
                                        return i(e);
                                    }
                                    d(t);
                                }
                                function d(e) {
                                    if (!Q(null == e ? void 0 : e.then))
                                        return e.done
                                            ? t(e.value)
                                            : (a = Promise.resolve(
                                                  e.value
                                              )).then(l, c);
                                    e.then(d, i);
                                }
                                ((e = i), l(void 0));
                            });
                        return (
                            (s.cancel = Vt(
                                n + ' - runid: ' + r + ' - cancel',
                                function () {
                                    try {
                                        a && ui(a);
                                        var t = o.return(void 0),
                                            i = Promise.resolve(t.value);
                                        (i.then(g, g), ui(i), e(new di()));
                                    } catch (t) {
                                        e(t);
                                    }
                                }
                            )),
                            s
                        );
                    };
                return ((r.isMobXFlow = !0), r);
            }, hi);
        function ui(e) {
            Q(e.cancel) && e.cancel();
        }
        function gi(e) {
            return e;
        }
        function Qi(e) {
            return !0 === (null == e ? void 0 : e.isMobXFlow);
        }
        function mi(e, t, i) {
            var n;
            return (
                Ln(e) || Tn(e) || ze(e) ? (n = jn(e)) : Rn(e) && (n = jn(e, t)),
                (n.dehancer = 'function' == typeof t ? t : i),
                function () {
                    n.dehancer = void 0;
                }
            );
        }
        function bi(e, t, i) {
            return Q(i)
                ? (function (e, t, i) {
                      return jn(e, t).intercept_(i);
                  })(e, t, i)
                : (function (e, t) {
                      return jn(e).intercept_(t);
                  })(e, t);
        }
        function Ci(e, t) {
            if (void 0 === t) return Je(e);
            if (!1 === Rn(e)) return !1;
            if (!e[G].values_.has(t)) return !1;
            var i = Un(e, t);
            return Je(i);
        }
        function Li(e) {
            return Ci(e);
        }
        function yi(e, t) {
            return Ci(e, t);
        }
        function Mi(e, t) {
            return (
                !!e &&
                (void 0 !== t
                    ? !!Rn(e) && e[G].values_.has(t)
                    : Rn(e) || !!e[G] || j(e) || Rt(e) || Je(e))
            );
        }
        function Ai(e) {
            return Mi(e);
        }
        function vi(e, t) {
            return Mi(e, t);
        }
        function Ei(e) {
            return Rn(e)
                ? e[G].keys_()
                : Ln(e) || An(e)
                  ? Array.from(e.keys())
                  : Tn(e)
                    ? e.map(function (e, t) {
                          return t;
                      })
                    : void n(5);
        }
        function _i(e) {
            return Rn(e)
                ? Ei(e).map(function (t) {
                      return e[t];
                  })
                : Ln(e)
                  ? Ei(e).map(function (t) {
                        return e.get(t);
                    })
                  : An(e)
                    ? Array.from(e.values())
                    : Tn(e)
                      ? e.slice()
                      : void n(6);
        }
        function Oi(e) {
            return Rn(e)
                ? Ei(e).map(function (t) {
                      return [t, e[t]];
                  })
                : Ln(e)
                  ? Ei(e).map(function (t) {
                        return [t, e.get(t)];
                    })
                  : An(e)
                    ? Array.from(e.entries())
                    : Tn(e)
                      ? e.map(function (e, t) {
                            return [t, e];
                        })
                      : void n(7);
        }
        function Si(e, t, i) {
            if (2 !== arguments.length || An(e))
                Rn(e)
                    ? e[G].set_(t, i)
                    : Ln(e)
                      ? e.set(t, i)
                      : An(e)
                        ? e.add(t)
                        : Tn(e)
                          ? ('number' != typeof t && (t = parseInt(t, 10)),
                            t < 0 && n("Invalid index: '" + t + "'"),
                            Lt(),
                            t >= e.length && (e.length = t + 1),
                            (e[t] = i),
                            yt())
                          : n(8);
            else {
                Lt();
                var r = t;
                try {
                    for (var o in r) Si(e, o, r[o]);
                } finally {
                    yt();
                }
            }
        }
        function xi(e, t) {
            Rn(e)
                ? e[G].delete_(t)
                : Ln(e) || An(e)
                  ? e.delete(t)
                  : Tn(e)
                    ? ('number' != typeof t && (t = parseInt(t, 10)),
                      e.splice(t, 1))
                    : n(9);
        }
        function Ri(e, t) {
            return Rn(e)
                ? e[G].has_(t)
                : Ln(e) || An(e)
                  ? e.has(t)
                  : Tn(e)
                    ? t >= 0 && t < e.length
                    : void n(10);
        }
        function Ii(e, t) {
            if (Ri(e, t))
                return Rn(e)
                    ? e[G].get_(t)
                    : Ln(e)
                      ? e.get(t)
                      : Tn(e)
                        ? e[t]
                        : void n(11);
        }
        function Ni(e, t, i) {
            if (Rn(e)) return e[G].defineProperty_(t, i);
            n(39);
        }
        function wi(e) {
            if (Rn(e)) return e[G].ownKeys_();
            n(38);
        }
        function Pi(e, t, i, n) {
            return Q(i)
                ? (function (e, t, i, n) {
                      return jn(e, t).observe_(i, n);
                  })(e, t, i, n)
                : (function (e, t, i) {
                      return jn(e).observe_(t, i);
                  })(e, t, i);
        }
        function Hi(e, t, i) {
            return (e.set(t, i), i);
        }
        function Di(e, t) {
            if (
                null == e ||
                'object' != typeof e ||
                e instanceof Date ||
                !Ai(e)
            )
                return e;
            if (ze(e) || Je(e)) return Di(e.get(), t);
            if (t.has(e)) return t.get(e);
            if (Tn(e)) {
                var i = Hi(t, e, new Array(e.length));
                return (
                    e.forEach(function (e, n) {
                        i[n] = Di(e, t);
                    }),
                    i
                );
            }
            if (An(e)) {
                var n = Hi(t, e, new Set());
                return (
                    e.forEach(function (e) {
                        n.add(Di(e, t));
                    }),
                    n
                );
            }
            if (Ln(e)) {
                var r = Hi(t, e, new Map());
                return (
                    e.forEach(function (e, i) {
                        r.set(i, Di(e, t));
                    }),
                    r
                );
            }
            var o = Hi(t, e, {});
            return (
                wi(e).forEach(function (i) {
                    c.propertyIsEnumerable.call(e, i) && (o[i] = Di(e[i], t));
                }),
                o
            );
        }
        function Fi(e, t) {
            return Di(e, new Map());
        }
        function ki() {}
        function Bi(e, t) {
            (void 0 === t && (t = void 0), Lt());
            try {
                return e.apply(t);
            } finally {
                yt();
            }
        }
        function Vi(e, t, i) {
            return 1 === arguments.length || (t && 'object' == typeof t)
                ? (function (e, t) {
                      var i, n, r;
                      0;
                      if (null != t && null != (i = t.signal) && i.aborted)
                          return Object.assign(
                              Promise.reject(new Error('WHEN_ABORTED')),
                              {
                                  cancel: function () {
                                      return null;
                                  },
                              }
                          );
                      var o = new Promise(function (i, o) {
                          var a,
                              s = Yi(e, i, w({}, t, { onError: o }));
                          ((n = function () {
                              (s(), o(new Error('WHEN_CANCELLED')));
                          }),
                              (r = function () {
                                  (s(), o(new Error('WHEN_ABORTED')));
                              }),
                              null == t ||
                                  null == (a = t.signal) ||
                                  null == a.addEventListener ||
                                  a.addEventListener('abort', r));
                      }).finally(function () {
                          var e;
                          return null == t ||
                              null == (e = t.signal) ||
                              null == e.removeEventListener
                              ? void 0
                              : e.removeEventListener('abort', r);
                      });
                      return ((o.cancel = n), o);
                  })(e, t)
                : Yi(e, t, i || {});
        }
        function Yi(e, t, i) {
            var n;
            if ('number' == typeof i.timeout) {
                var r = new Error('WHEN_TIMEOUT');
                n = setTimeout(function () {
                    if (!a[G].isDisposed_) {
                        if ((a(), !i.onError)) throw r;
                        i.onError(r);
                    }
                }, i.timeout);
            }
            i.name = 'When';
            var o = Fe('When-effect', t),
                a = jt(function (t) {
                    Ye(!1, e) && (t.dispose(), n && clearTimeout(n), o());
                }, i);
            return a;
        }
        function Gi(e) {
            return e[G];
        }
        Ti.bound = V(pi);
        var Ui = {
            has: function (e, t) {
                return Gi(e).has_(t);
            },
            get: function (e, t) {
                return Gi(e).get_(t);
            },
            set: function (e, t, i) {
                var n;
                return !!m(t) && (null == (n = Gi(e).set_(t, i, !0)) || n);
            },
            deleteProperty: function (e, t) {
                var i;
                return !!m(t) && (null == (i = Gi(e).delete_(t, !0)) || i);
            },
            defineProperty: function (e, t, i) {
                var n;
                return null == (n = Gi(e).defineProperty_(t, i)) || n;
            },
            ownKeys: function (e) {
                return Gi(e).ownKeys_();
            },
            preventExtensions: function (e) {
                n(13);
            },
        };
        function ji(e) {
            return void 0 !== e.interceptors_ && e.interceptors_.length > 0;
        }
        function $i(e, t) {
            var i = e.interceptors_ || (e.interceptors_ = []);
            return (
                i.push(t),
                u(function () {
                    var e = i.indexOf(t);
                    -1 !== e && i.splice(e, 1);
                })
            );
        }
        function zi(e, t) {
            var i = at();
            try {
                for (
                    var r = [].concat(e.interceptors_ || []),
                        o = 0,
                        a = r.length;
                    o < a && ((t = r[o](t)) && !t.type && n(14), t);
                    o++
                );
                return t;
            } finally {
                st(i);
            }
        }
        function Wi(e) {
            return (
                void 0 !== e.changeListeners_ && e.changeListeners_.length > 0
            );
        }
        function Ki(e, t) {
            var i = e.changeListeners_ || (e.changeListeners_ = []);
            return (
                i.push(t),
                u(function () {
                    var e = i.indexOf(t);
                    -1 !== e && i.splice(e, 1);
                })
            );
        }
        function Zi(e, t) {
            var i = at(),
                n = e.changeListeners_;
            if (n) {
                for (var r = 0, o = (n = n.slice()).length; r < o; r++) n[r](t);
                st(i);
            }
        }
        function Ji(e, t, i) {
            var n = On(e, i)[G];
            Lt();
            try {
                (0,
                    null != t ||
                        (t = (function (e) {
                            return (x(e, B) || y(e, B, w({}, e[B])), e[B]);
                        })(e)),
                    O(t).forEach(function (e) {
                        return n.make_(e, t[e]);
                    }));
            } finally {
                yt();
            }
            return e;
        }
        var Xi = Symbol('mobx-keys');
        function qi(e, t, i) {
            if (C(e)) return ri(e, e, t, i);
            var n = On(e, i)[G];
            if (!e[Xi]) {
                var r = Object.getPrototypeOf(e),
                    o = new Set([].concat(O(e), O(r)));
                (o.delete('constructor'), o.delete(G), y(r, Xi, o));
            }
            Lt();
            try {
                e[Xi].forEach(function (e) {
                    return n.make_(e, !t || !(e in t) || t[e]);
                });
            } finally {
                yt();
            }
            return e;
        }
        var en = 'splice',
            tn = 'update',
            nn = {
                get: function (e, t) {
                    var i = e[G];
                    return t === G
                        ? i
                        : 'length' === t
                          ? i.getArrayLength_()
                          : 'string' != typeof t || isNaN(t)
                            ? x(an, t)
                                ? an[t]
                                : e[t]
                            : i.get_(parseInt(t));
                },
                set: function (e, t, i) {
                    var n = e[G];
                    return (
                        'length' === t && n.setArrayLength_(i),
                        'symbol' == typeof t || isNaN(t)
                            ? (e[t] = i)
                            : n.set_(parseInt(t), i),
                        !0
                    );
                },
                preventExtensions: function () {
                    n(15);
                },
            },
            rn = (function () {
                function e(e, t, i, n) {
                    (void 0 === e && (e = 'ObservableArray'),
                        (this.owned_ = void 0),
                        (this.legacyMode_ = void 0),
                        (this.atom_ = void 0),
                        (this.values_ = []),
                        (this.interceptors_ = void 0),
                        (this.changeListeners_ = void 0),
                        (this.enhancer_ = void 0),
                        (this.dehancer = void 0),
                        (this.proxy_ = void 0),
                        (this.lastKnownLength_ = 0),
                        (this.owned_ = i),
                        (this.legacyMode_ = n),
                        (this.atom_ = new U(e)),
                        (this.enhancer_ = function (e, i) {
                            return t(e, i, 'ObservableArray[..]');
                        }));
                }
                var t = e.prototype;
                return (
                    (t.dehanceValue_ = function (e) {
                        return void 0 !== this.dehancer ? this.dehancer(e) : e;
                    }),
                    (t.dehanceValues_ = function (e) {
                        return void 0 !== this.dehancer && e.length > 0
                            ? e.map(this.dehancer)
                            : e;
                    }),
                    (t.intercept_ = function (e) {
                        return $i(this, e);
                    }),
                    (t.observe_ = function (e, t) {
                        return (
                            void 0 === t && (t = !1),
                            t &&
                                e({
                                    observableKind: 'array',
                                    object: this.proxy_,
                                    debugObjectName: this.atom_.name_,
                                    type: 'splice',
                                    index: 0,
                                    added: this.values_.slice(),
                                    addedCount: this.values_.length,
                                    removed: [],
                                    removedCount: 0,
                                }),
                            Ki(this, e)
                        );
                    }),
                    (t.getArrayLength_ = function () {
                        return (
                            this.atom_.reportObserved(),
                            this.values_.length
                        );
                    }),
                    (t.setArrayLength_ = function (e) {
                        ('number' != typeof e || isNaN(e) || e < 0) &&
                            n('Out of range: ' + e);
                        var t = this.values_.length;
                        if (e !== t)
                            if (e > t) {
                                for (
                                    var i = new Array(e - t), r = 0;
                                    r < e - t;
                                    r++
                                )
                                    i[r] = void 0;
                                this.spliceWithArray_(t, 0, i);
                            } else this.spliceWithArray_(e, t - e);
                    }),
                    (t.updateArrayLength_ = function (e, t) {
                        (e !== this.lastKnownLength_ && n(16),
                            (this.lastKnownLength_ += t),
                            this.legacyMode_ && t > 0 && Yn(e + t + 1));
                    }),
                    (t.spliceWithArray_ = function (e, t, i) {
                        var n = this;
                        this.atom_;
                        var r = this.values_.length;
                        if (
                            (void 0 === e
                                ? (e = 0)
                                : e > r
                                  ? (e = r)
                                  : e < 0 && (e = Math.max(0, r + e)),
                            (t =
                                1 === arguments.length
                                    ? r - e
                                    : null == t
                                      ? 0
                                      : Math.max(0, Math.min(t, r - e))),
                            void 0 === i && (i = d),
                            ji(this))
                        ) {
                            var o = zi(this, {
                                object: this.proxy_,
                                type: en,
                                index: e,
                                removedCount: t,
                                added: i,
                            });
                            if (!o) return d;
                            ((t = o.removedCount), (i = o.added));
                        }
                        if (
                            ((i =
                                0 === i.length
                                    ? i
                                    : i.map(function (e) {
                                          return n.enhancer_(e, void 0);
                                      })),
                            this.legacyMode_)
                        ) {
                            var a = i.length - t;
                            this.updateArrayLength_(r, a);
                        }
                        var s = this.spliceItemsIntoValues_(e, t, i);
                        return (
                            (0 === t && 0 === i.length) ||
                                this.notifyArraySplice_(e, i, s),
                            this.dehanceValues_(s)
                        );
                    }),
                    (t.spliceItemsIntoValues_ = function (e, t, i) {
                        var n;
                        if (i.length < 1e4)
                            return (n = this.values_).splice.apply(
                                n,
                                [e, t].concat(i)
                            );
                        var r = this.values_.slice(e, e + t),
                            o = this.values_.slice(e + t);
                        this.values_.length += i.length - t;
                        for (var a = 0; a < i.length; a++)
                            this.values_[e + a] = i[a];
                        for (var s = 0; s < o.length; s++)
                            this.values_[e + i.length + s] = o[s];
                        return r;
                    }),
                    (t.notifyArrayChildUpdate_ = function (e, t, i) {
                        var n = !this.owned_ && !1,
                            r = Wi(this),
                            o =
                                r || n
                                    ? {
                                          observableKind: 'array',
                                          object: this.proxy_,
                                          type: tn,
                                          debugObjectName: this.atom_.name_,
                                          index: e,
                                          newValue: t,
                                          oldValue: i,
                                      }
                                    : null;
                        (this.atom_.reportChanged(), r && Zi(this, o));
                    }),
                    (t.notifyArraySplice_ = function (e, t, i) {
                        var n = !this.owned_ && !1,
                            r = Wi(this),
                            o =
                                r || n
                                    ? {
                                          observableKind: 'array',
                                          object: this.proxy_,
                                          debugObjectName: this.atom_.name_,
                                          type: en,
                                          index: e,
                                          removed: i,
                                          added: t,
                                          removedCount: i.length,
                                          addedCount: t.length,
                                      }
                                    : null;
                        (this.atom_.reportChanged(), r && Zi(this, o));
                    }),
                    (t.get_ = function (e) {
                        if (!(this.legacyMode_ && e >= this.values_.length))
                            return (
                                this.atom_.reportObserved(),
                                this.dehanceValue_(this.values_[e])
                            );
                        console.warn('[mobx] Out of bounds read: ' + e);
                    }),
                    (t.set_ = function (e, t) {
                        var i = this.values_;
                        if (
                            (this.legacyMode_ &&
                                e > i.length &&
                                n(17, e, i.length),
                            e < i.length)
                        ) {
                            this.atom_;
                            var r = i[e];
                            if (ji(this)) {
                                var o = zi(this, {
                                    type: tn,
                                    object: this.proxy_,
                                    index: e,
                                    newValue: t,
                                });
                                if (!o) return;
                                t = o.newValue;
                            }
                            (t = this.enhancer_(t, r)) !== r &&
                                ((i[e] = t),
                                this.notifyArrayChildUpdate_(e, t, r));
                        } else {
                            for (
                                var a = new Array(e + 1 - i.length), s = 0;
                                s < a.length - 1;
                                s++
                            )
                                a[s] = void 0;
                            ((a[a.length - 1] = t),
                                this.spliceWithArray_(i.length, 0, a));
                        }
                    }),
                    e
                );
            })();
        function on(e, t, i, n) {
            (void 0 === i && (i = 'ObservableArray'),
                void 0 === n && (n = !1),
                T());
            var r = new rn(i, t, n, !1);
            M(r.values_, G, r);
            var o = new Proxy(r.values_, nn);
            if (((r.proxy_ = o), e && e.length)) {
                var a = Ge(!0);
                (r.spliceWithArray_(0, 0, e), Ue(a));
            }
            return o;
        }
        var an = {
            clear: function () {
                return this.splice(0);
            },
            replace: function (e) {
                var t = this[G];
                return t.spliceWithArray_(0, t.values_.length, e);
            },
            toJSON: function () {
                return this.slice();
            },
            splice: function (e, t) {
                for (
                    var i = arguments.length,
                        n = new Array(i > 2 ? i - 2 : 0),
                        r = 2;
                    r < i;
                    r++
                )
                    n[r - 2] = arguments[r];
                var o = this[G];
                switch (arguments.length) {
                    case 0:
                        return [];
                    case 1:
                        return o.spliceWithArray_(e);
                    case 2:
                        return o.spliceWithArray_(e, t);
                }
                return o.spliceWithArray_(e, t, n);
            },
            spliceWithArray: function (e, t, i) {
                return this[G].spliceWithArray_(e, t, i);
            },
            push: function () {
                for (
                    var e = this[G],
                        t = arguments.length,
                        i = new Array(t),
                        n = 0;
                    n < t;
                    n++
                )
                    i[n] = arguments[n];
                return (
                    e.spliceWithArray_(e.values_.length, 0, i),
                    e.values_.length
                );
            },
            pop: function () {
                return this.splice(
                    Math.max(this[G].values_.length - 1, 0),
                    1
                )[0];
            },
            shift: function () {
                return this.splice(0, 1)[0];
            },
            unshift: function () {
                for (
                    var e = this[G],
                        t = arguments.length,
                        i = new Array(t),
                        n = 0;
                    n < t;
                    n++
                )
                    i[n] = arguments[n];
                return (e.spliceWithArray_(0, 0, i), e.values_.length);
            },
            reverse: function () {
                return (
                    ut.trackingDerivation && n(37, 'reverse'),
                    this.replace(this.slice().reverse()),
                    this
                );
            },
            sort: function () {
                ut.trackingDerivation && n(37, 'sort');
                var e = this.slice();
                return (e.sort.apply(e, arguments), this.replace(e), this);
            },
            remove: function (e) {
                var t = this[G],
                    i = t.dehanceValues_(t.values_).indexOf(e);
                return i > -1 && (this.splice(i, 1), !0);
            },
        };
        function sn(e, t) {
            'function' == typeof Array.prototype[e] && (an[e] = t(e));
        }
        function ln(e) {
            return function () {
                var t = this[G];
                t.atom_.reportObserved();
                var i = t.dehanceValues_(t.values_);
                return i[e].apply(i, arguments);
            };
        }
        function cn(e) {
            return function (t, i) {
                var n = this,
                    r = this[G];
                return (
                    r.atom_.reportObserved(),
                    r.dehanceValues_(r.values_)[e](function (e, r) {
                        return t.call(i, e, r, n);
                    })
                );
            };
        }
        function dn(e) {
            return function () {
                var t = this,
                    i = this[G];
                i.atom_.reportObserved();
                var n = i.dehanceValues_(i.values_),
                    r = arguments[0];
                return (
                    (arguments[0] = function (e, i, n) {
                        return r(e, i, n, t);
                    }),
                    n[e].apply(n, arguments)
                );
            };
        }
        (sn('concat', ln),
            sn('flat', ln),
            sn('includes', ln),
            sn('indexOf', ln),
            sn('join', ln),
            sn('lastIndexOf', ln),
            sn('slice', ln),
            sn('toString', ln),
            sn('toLocaleString', ln),
            sn('every', cn),
            sn('filter', cn),
            sn('find', cn),
            sn('findIndex', cn),
            sn('flatMap', cn),
            sn('forEach', cn),
            sn('map', cn),
            sn('some', cn),
            sn('reduce', dn),
            sn('reduceRight', dn));
        var fn,
            hn,
            pn = A('ObservableArrayAdministration', rn);
        function Tn(e) {
            return b(e) && pn(e[G]);
        }
        var un = {},
            gn = 'add',
            Qn = 'delete';
        ((fn = Symbol.iterator), (hn = Symbol.toStringTag));
        var mn,
            bn,
            Cn = (function () {
                function e(e, t, i) {
                    var r = this;
                    (void 0 === t && (t = W),
                        void 0 === i && (i = 'ObservableMap'),
                        (this.enhancer_ = void 0),
                        (this.name_ = void 0),
                        (this[G] = un),
                        (this.data_ = void 0),
                        (this.hasMap_ = void 0),
                        (this.keysAtom_ = void 0),
                        (this.interceptors_ = void 0),
                        (this.changeListeners_ = void 0),
                        (this.dehancer = void 0),
                        (this.enhancer_ = t),
                        (this.name_ = i),
                        Q(Map) || n(18),
                        (this.keysAtom_ = $('ObservableMap.keys()')),
                        (this.data_ = new Map()),
                        (this.hasMap_ = new Map()),
                        Ye(!0, function () {
                            r.merge(e);
                        }));
                }
                var t = e.prototype;
                return (
                    (t.has_ = function (e) {
                        return this.data_.has(e);
                    }),
                    (t.has = function (e) {
                        var t = this;
                        if (!ut.trackingDerivation) return this.has_(e);
                        var i = this.hasMap_.get(e);
                        if (!i) {
                            var n = (i = new $e(
                                this.has_(e),
                                K,
                                'ObservableMap.key?',
                                !1
                            ));
                            (this.hasMap_.set(e, n),
                                Xt(n, function () {
                                    return t.hasMap_.delete(e);
                                }));
                        }
                        return i.get();
                    }),
                    (t.set = function (e, t) {
                        var i = this.has_(e);
                        if (ji(this)) {
                            var n = zi(this, {
                                type: i ? tn : gn,
                                object: this,
                                newValue: t,
                                name: e,
                            });
                            if (!n) return this;
                            t = n.newValue;
                        }
                        return (
                            i ? this.updateValue_(e, t) : this.addValue_(e, t),
                            this
                        );
                    }),
                    (t.delete = function (e) {
                        var t = this;
                        if (
                            (this.keysAtom_, ji(this)) &&
                            !zi(this, { type: Qn, object: this, name: e })
                        )
                            return !1;
                        if (this.has_(e)) {
                            var i = Wi(this),
                                n = i
                                    ? {
                                          observableKind: 'map',
                                          debugObjectName: this.name_,
                                          type: Qn,
                                          object: this,
                                          oldValue: this.data_.get(e).value_,
                                          name: e,
                                      }
                                    : null;
                            return (
                                Bi(function () {
                                    var i;
                                    (t.keysAtom_.reportChanged(),
                                        null == (i = t.hasMap_.get(e)) ||
                                            i.setNewValue_(!1),
                                        t.data_.get(e).setNewValue_(void 0),
                                        t.data_.delete(e));
                                }),
                                i && Zi(this, n),
                                !0
                            );
                        }
                        return !1;
                    }),
                    (t.updateValue_ = function (e, t) {
                        var i = this.data_.get(e);
                        if ((t = i.prepareNewValue_(t)) !== ut.UNCHANGED) {
                            var n = Wi(this),
                                r = n
                                    ? {
                                          observableKind: 'map',
                                          debugObjectName: this.name_,
                                          type: tn,
                                          object: this,
                                          oldValue: i.value_,
                                          name: e,
                                          newValue: t,
                                      }
                                    : null;
                            (0, i.setNewValue_(t), n && Zi(this, r));
                        }
                    }),
                    (t.addValue_ = function (e, t) {
                        var i = this;
                        (this.keysAtom_,
                            Bi(function () {
                                var n,
                                    r = new $e(
                                        t,
                                        i.enhancer_,
                                        'ObservableMap.key',
                                        !1
                                    );
                                (i.data_.set(e, r),
                                    (t = r.value_),
                                    null == (n = i.hasMap_.get(e)) ||
                                        n.setNewValue_(!0),
                                    i.keysAtom_.reportChanged());
                            }));
                        var n = Wi(this),
                            r = n
                                ? {
                                      observableKind: 'map',
                                      debugObjectName: this.name_,
                                      type: gn,
                                      object: this,
                                      name: e,
                                      newValue: t,
                                  }
                                : null;
                        n && Zi(this, r);
                    }),
                    (t.get = function (e) {
                        return this.has(e)
                            ? this.dehanceValue_(this.data_.get(e).get())
                            : this.dehanceValue_(void 0);
                    }),
                    (t.dehanceValue_ = function (e) {
                        return void 0 !== this.dehancer ? this.dehancer(e) : e;
                    }),
                    (t.keys = function () {
                        return (
                            this.keysAtom_.reportObserved(),
                            this.data_.keys()
                        );
                    }),
                    (t.values = function () {
                        var e = this,
                            t = this.keys();
                        return Jn({
                            next: function () {
                                var i = t.next(),
                                    n = i.done,
                                    r = i.value;
                                return {
                                    done: n,
                                    value: n ? void 0 : e.get(r),
                                };
                            },
                        });
                    }),
                    (t.entries = function () {
                        var e = this,
                            t = this.keys();
                        return Jn({
                            next: function () {
                                var i = t.next(),
                                    n = i.done,
                                    r = i.value;
                                return {
                                    done: n,
                                    value: n ? void 0 : [r, e.get(r)],
                                };
                            },
                        });
                    }),
                    (t[fn] = function () {
                        return this.entries();
                    }),
                    (t.forEach = function (e, t) {
                        for (var i, n = k(this); !(i = n()).done; ) {
                            var r = i.value,
                                o = r[0],
                                a = r[1];
                            e.call(t, a, o, this);
                        }
                    }),
                    (t.merge = function (e) {
                        var t = this;
                        return (
                            Ln(e) && (e = new Map(e)),
                            Bi(function () {
                                C(e)
                                    ? (function (e) {
                                          var t = Object.keys(e);
                                          if (!_) return t;
                                          var i =
                                              Object.getOwnPropertySymbols(e);
                                          return i.length
                                              ? [].concat(
                                                    t,
                                                    i.filter(function (t) {
                                                        return c.propertyIsEnumerable.call(
                                                            e,
                                                            t
                                                        );
                                                    })
                                                )
                                              : t;
                                      })(e).forEach(function (i) {
                                          return t.set(i, e[i]);
                                      })
                                    : Array.isArray(e)
                                      ? e.forEach(function (e) {
                                            var i = e[0],
                                                n = e[1];
                                            return t.set(i, n);
                                        })
                                      : v(e)
                                        ? (e.constructor !== Map && n(19, e),
                                          e.forEach(function (e, i) {
                                              return t.set(i, e);
                                          }))
                                        : null != e && n(20, e);
                            }),
                            this
                        );
                    }),
                    (t.clear = function () {
                        var e = this;
                        Bi(function () {
                            ot(function () {
                                for (
                                    var t, i = k(e.keys());
                                    !(t = i()).done;
                                ) {
                                    var n = t.value;
                                    e.delete(n);
                                }
                            });
                        });
                    }),
                    (t.replace = function (e) {
                        var t = this;
                        return (
                            Bi(function () {
                                for (
                                    var i,
                                        r = (function (e) {
                                            if (v(e) || Ln(e)) return e;
                                            if (Array.isArray(e))
                                                return new Map(e);
                                            if (C(e)) {
                                                var t = new Map();
                                                for (var i in e) t.set(i, e[i]);
                                                return t;
                                            }
                                            return n(21, e);
                                        })(e),
                                        o = new Map(),
                                        a = !1,
                                        s = k(t.data_.keys());
                                    !(i = s()).done;
                                ) {
                                    var l = i.value;
                                    if (!r.has(l))
                                        if (t.delete(l)) a = !0;
                                        else {
                                            var c = t.data_.get(l);
                                            o.set(l, c);
                                        }
                                }
                                for (
                                    var d, f = k(r.entries());
                                    !(d = f()).done;
                                ) {
                                    var h = d.value,
                                        p = h[0],
                                        T = h[1],
                                        u = t.data_.has(p);
                                    if ((t.set(p, T), t.data_.has(p))) {
                                        var g = t.data_.get(p);
                                        (o.set(p, g), u || (a = !0));
                                    }
                                }
                                if (!a)
                                    if (t.data_.size !== o.size)
                                        t.keysAtom_.reportChanged();
                                    else
                                        for (
                                            var Q = t.data_.keys(),
                                                m = o.keys(),
                                                b = Q.next(),
                                                L = m.next();
                                            !b.done;
                                        ) {
                                            if (b.value !== L.value) {
                                                t.keysAtom_.reportChanged();
                                                break;
                                            }
                                            ((b = Q.next()), (L = m.next()));
                                        }
                                t.data_ = o;
                            }),
                            this
                        );
                    }),
                    (t.toString = function () {
                        return '[object ObservableMap]';
                    }),
                    (t.toJSON = function () {
                        return Array.from(this);
                    }),
                    (t.observe_ = function (e, t) {
                        return Ki(this, e);
                    }),
                    (t.intercept_ = function (e) {
                        return $i(this, e);
                    }),
                    N(e, [
                        {
                            key: 'size',
                            get: function () {
                                return (
                                    this.keysAtom_.reportObserved(),
                                    this.data_.size
                                );
                            },
                        },
                        {
                            key: hn,
                            get: function () {
                                return 'Map';
                            },
                        },
                    ]),
                    e
                );
            })(),
            Ln = A('ObservableMap', Cn);
        var yn = {};
        ((mn = Symbol.iterator), (bn = Symbol.toStringTag));
        var Mn = (function () {
                function e(e, t, i) {
                    (void 0 === t && (t = W),
                        void 0 === i && (i = 'ObservableSet'),
                        (this.name_ = void 0),
                        (this[G] = yn),
                        (this.data_ = new Set()),
                        (this.atom_ = void 0),
                        (this.changeListeners_ = void 0),
                        (this.interceptors_ = void 0),
                        (this.dehancer = void 0),
                        (this.enhancer_ = void 0),
                        (this.name_ = i),
                        Q(Set) || n(22),
                        (this.atom_ = $(this.name_)),
                        (this.enhancer_ = function (e, n) {
                            return t(e, n, i);
                        }),
                        e && this.replace(e));
                }
                var t = e.prototype;
                return (
                    (t.dehanceValue_ = function (e) {
                        return void 0 !== this.dehancer ? this.dehancer(e) : e;
                    }),
                    (t.clear = function () {
                        var e = this;
                        Bi(function () {
                            ot(function () {
                                for (
                                    var t, i = k(e.data_.values());
                                    !(t = i()).done;
                                ) {
                                    var n = t.value;
                                    e.delete(n);
                                }
                            });
                        });
                    }),
                    (t.forEach = function (e, t) {
                        for (var i, n = k(this); !(i = n()).done; ) {
                            var r = i.value;
                            e.call(t, r, r, this);
                        }
                    }),
                    (t.add = function (e) {
                        var t = this;
                        if (
                            (this.atom_, ji(this)) &&
                            !zi(this, {
                                type: gn,
                                object: this,
                                newValue: e,
                            })
                        )
                            return this;
                        if (!this.has(e)) {
                            Bi(function () {
                                (t.data_.add(t.enhancer_(e, void 0)),
                                    t.atom_.reportChanged());
                            });
                            var i = !1,
                                n = Wi(this),
                                r = n
                                    ? {
                                          observableKind: 'set',
                                          debugObjectName: this.name_,
                                          type: gn,
                                          object: this,
                                          newValue: e,
                                      }
                                    : null;
                            (i, n && Zi(this, r));
                        }
                        return this;
                    }),
                    (t.delete = function (e) {
                        var t = this;
                        if (
                            ji(this) &&
                            !zi(this, {
                                type: Qn,
                                object: this,
                                oldValue: e,
                            })
                        )
                            return !1;
                        if (this.has(e)) {
                            var i = Wi(this),
                                n = i
                                    ? {
                                          observableKind: 'set',
                                          debugObjectName: this.name_,
                                          type: Qn,
                                          object: this,
                                          oldValue: e,
                                      }
                                    : null;
                            return (
                                Bi(function () {
                                    (t.atom_.reportChanged(),
                                        t.data_.delete(e));
                                }),
                                i && Zi(this, n),
                                !0
                            );
                        }
                        return !1;
                    }),
                    (t.has = function (e) {
                        return (
                            this.atom_.reportObserved(),
                            this.data_.has(this.dehanceValue_(e))
                        );
                    }),
                    (t.entries = function () {
                        var e = 0,
                            t = Array.from(this.keys()),
                            i = Array.from(this.values());
                        return Jn({
                            next: function () {
                                var n = e;
                                return (
                                    (e += 1),
                                    n < i.length
                                        ? { value: [t[n], i[n]], done: !1 }
                                        : { done: !0 }
                                );
                            },
                        });
                    }),
                    (t.keys = function () {
                        return this.values();
                    }),
                    (t.values = function () {
                        this.atom_.reportObserved();
                        var e = this,
                            t = 0,
                            i = Array.from(this.data_.values());
                        return Jn({
                            next: function () {
                                return t < i.length
                                    ? {
                                          value: e.dehanceValue_(i[t++]),
                                          done: !1,
                                      }
                                    : { done: !0 };
                            },
                        });
                    }),
                    (t.replace = function (e) {
                        var t = this;
                        return (
                            An(e) && (e = new Set(e)),
                            Bi(function () {
                                Array.isArray(e) || E(e)
                                    ? (t.clear(),
                                      e.forEach(function (e) {
                                          return t.add(e);
                                      }))
                                    : null != e &&
                                      n('Cannot initialize set from ' + e);
                            }),
                            this
                        );
                    }),
                    (t.observe_ = function (e, t) {
                        return Ki(this, e);
                    }),
                    (t.intercept_ = function (e) {
                        return $i(this, e);
                    }),
                    (t.toJSON = function () {
                        return Array.from(this);
                    }),
                    (t.toString = function () {
                        return '[object ObservableSet]';
                    }),
                    (t[mn] = function () {
                        return this.values();
                    }),
                    N(e, [
                        {
                            key: 'size',
                            get: function () {
                                return (
                                    this.atom_.reportObserved(),
                                    this.data_.size
                                );
                            },
                        },
                        {
                            key: bn,
                            get: function () {
                                return 'Set';
                            },
                        },
                    ]),
                    e
                );
            })(),
            An = A('ObservableSet', Mn),
            vn = Object.create(null),
            En = 'remove',
            _n = (function () {
                function e(e, t, i, n) {
                    (void 0 === t && (t = new Map()),
                        void 0 === n && (n = pe),
                        (this.target_ = void 0),
                        (this.values_ = void 0),
                        (this.name_ = void 0),
                        (this.defaultAnnotation_ = void 0),
                        (this.keysAtom_ = void 0),
                        (this.changeListeners_ = void 0),
                        (this.interceptors_ = void 0),
                        (this.proxy_ = void 0),
                        (this.isPlainObject_ = void 0),
                        (this.appliedAnnotations_ = void 0),
                        (this.pendingKeys_ = void 0),
                        (this.target_ = e),
                        (this.values_ = t),
                        (this.name_ = i),
                        (this.defaultAnnotation_ = n),
                        (this.keysAtom_ = new U('ObservableObject.keys')),
                        (this.isPlainObject_ = C(this.target_)));
                }
                var t = e.prototype;
                return (
                    (t.getObservablePropValue_ = function (e) {
                        return this.values_.get(e).get();
                    }),
                    (t.setObservablePropValue_ = function (e, t) {
                        var i = this.values_.get(e);
                        if (i instanceof Ze) return (i.set(t), !0);
                        if (ji(this)) {
                            var n = zi(this, {
                                type: tn,
                                object: this.proxy_ || this.target_,
                                name: e,
                                newValue: t,
                            });
                            if (!n) return null;
                            t = n.newValue;
                        }
                        if ((t = i.prepareNewValue_(t)) !== ut.UNCHANGED) {
                            var r = Wi(this),
                                o = r
                                    ? {
                                          type: tn,
                                          observableKind: 'object',
                                          debugObjectName: this.name_,
                                          object: this.proxy_ || this.target_,
                                          oldValue: i.value_,
                                          name: e,
                                          newValue: t,
                                      }
                                    : null;
                            (0, i.setNewValue_(t), r && Zi(this, o));
                        }
                        return !0;
                    }),
                    (t.get_ = function (e) {
                        return (
                            ut.trackingDerivation &&
                                !x(this.target_, e) &&
                                this.has_(e),
                            this.target_[e]
                        );
                    }),
                    (t.set_ = function (e, t, i) {
                        return (
                            void 0 === i && (i = !1),
                            x(this.target_, e)
                                ? this.values_.has(e)
                                    ? this.setObservablePropValue_(e, t)
                                    : i
                                      ? Reflect.set(this.target_, e, t)
                                      : ((this.target_[e] = t), !0)
                                : this.extend_(
                                      e,
                                      {
                                          value: t,
                                          enumerable: !0,
                                          writable: !0,
                                          configurable: !0,
                                      },
                                      this.defaultAnnotation_,
                                      i
                                  )
                        );
                    }),
                    (t.has_ = function (e) {
                        if (!ut.trackingDerivation) return e in this.target_;
                        this.pendingKeys_ || (this.pendingKeys_ = new Map());
                        var t = this.pendingKeys_.get(e);
                        return (
                            t ||
                                ((t = new $e(
                                    e in this.target_,
                                    K,
                                    'ObservableObject.key?',
                                    !1
                                )),
                                this.pendingKeys_.set(e, t)),
                            t.get()
                        );
                    }),
                    (t.make_ = function (e, t) {
                        if (
                            (!0 === t && (t = this.defaultAnnotation_),
                            !1 !== t)
                        ) {
                            if ((Nn(this, t, e), !(e in this.target_))) {
                                var i;
                                if (null != (i = this.target_[B]) && i[e])
                                    return;
                                n(
                                    1,
                                    t.annotationType_,
                                    this.name_ + '.' + e.toString()
                                );
                            }
                            for (var r = this.target_; r && r !== c; ) {
                                var o = s(r, e);
                                if (o) {
                                    var a = t.make_(this, e, o, r);
                                    if (0 === a) return;
                                    if (1 === a) break;
                                }
                                r = Object.getPrototypeOf(r);
                            }
                            In(this, t, e);
                        }
                    }),
                    (t.extend_ = function (e, t, i, n) {
                        if (
                            (void 0 === n && (n = !1),
                            !0 === i && (i = this.defaultAnnotation_),
                            !1 === i)
                        )
                            return this.defineProperty_(e, t, n);
                        Nn(this, i, e);
                        var r = i.extend_(this, e, t, n);
                        return (r && In(this, i, e), r);
                    }),
                    (t.defineProperty_ = function (e, t, i) {
                        void 0 === i && (i = !1);
                        try {
                            Lt();
                            var n = this.delete_(e);
                            if (!n) return n;
                            if (ji(this)) {
                                var r = zi(this, {
                                    object: this.proxy_ || this.target_,
                                    name: e,
                                    type: gn,
                                    newValue: t.value,
                                });
                                if (!r) return null;
                                var o = r.newValue;
                                t.value !== o && (t = w({}, t, { value: o }));
                            }
                            if (i) {
                                if (!Reflect.defineProperty(this.target_, e, t))
                                    return !1;
                            } else l(this.target_, e, t);
                            this.notifyPropertyAddition_(e, t.value);
                        } finally {
                            yt();
                        }
                        return !0;
                    }),
                    (t.defineObservableProperty_ = function (e, t, i, n) {
                        void 0 === n && (n = !1);
                        try {
                            Lt();
                            var r = this.delete_(e);
                            if (!r) return r;
                            if (ji(this)) {
                                var o = zi(this, {
                                    object: this.proxy_ || this.target_,
                                    name: e,
                                    type: gn,
                                    newValue: t,
                                });
                                if (!o) return null;
                                t = o.newValue;
                            }
                            var a = xn(e),
                                s = {
                                    configurable:
                                        !ut.safeDescriptors ||
                                        this.isPlainObject_,
                                    enumerable: !0,
                                    get: a.get,
                                    set: a.set,
                                };
                            if (n) {
                                if (!Reflect.defineProperty(this.target_, e, s))
                                    return !1;
                            } else l(this.target_, e, s);
                            var c = new $e(t, i, 'ObservableObject.key', !1);
                            (this.values_.set(e, c),
                                this.notifyPropertyAddition_(e, c.value_));
                        } finally {
                            yt();
                        }
                        return !0;
                    }),
                    (t.defineComputedProperty_ = function (e, t, i) {
                        void 0 === i && (i = !1);
                        try {
                            Lt();
                            var n = this.delete_(e);
                            if (!n) return n;
                            if (ji(this))
                                if (
                                    !zi(this, {
                                        object: this.proxy_ || this.target_,
                                        name: e,
                                        type: gn,
                                        newValue: void 0,
                                    })
                                )
                                    return null;
                            (t.name || (t.name = 'ObservableObject.key'),
                                (t.context = this.proxy_ || this.target_));
                            var r = xn(e),
                                o = {
                                    configurable:
                                        !ut.safeDescriptors ||
                                        this.isPlainObject_,
                                    enumerable: !1,
                                    get: r.get,
                                    set: r.set,
                                };
                            if (i) {
                                if (!Reflect.defineProperty(this.target_, e, o))
                                    return !1;
                            } else l(this.target_, e, o);
                            (this.values_.set(e, new Ze(t)),
                                this.notifyPropertyAddition_(e, void 0));
                        } finally {
                            yt();
                        }
                        return !0;
                    }),
                    (t.delete_ = function (e, t) {
                        if ((void 0 === t && (t = !1), !x(this.target_, e)))
                            return !0;
                        if (
                            ji(this) &&
                            !zi(this, {
                                object: this.proxy_ || this.target_,
                                name: e,
                                type: En,
                            })
                        )
                            return null;
                        try {
                            var i, n;
                            Lt();
                            var r,
                                o = Wi(this),
                                a = this.values_.get(e),
                                l = void 0;
                            if (!a && o)
                                l =
                                    null == (r = s(this.target_, e))
                                        ? void 0
                                        : r.value;
                            if (t) {
                                if (!Reflect.deleteProperty(this.target_, e))
                                    return !1;
                            } else delete this.target_[e];
                            if (
                                (a &&
                                    (this.values_.delete(e),
                                    a instanceof $e && (l = a.value_),
                                    At(a)),
                                this.keysAtom_.reportChanged(),
                                null == (i = this.pendingKeys_) ||
                                    null == (n = i.get(e)) ||
                                    n.set(e in this.target_),
                                o)
                            ) {
                                var c = {
                                    type: En,
                                    observableKind: 'object',
                                    object: this.proxy_ || this.target_,
                                    debugObjectName: this.name_,
                                    oldValue: l,
                                    name: e,
                                };
                                (0, o && Zi(this, c));
                            }
                        } finally {
                            yt();
                        }
                        return !0;
                    }),
                    (t.observe_ = function (e, t) {
                        return Ki(this, e);
                    }),
                    (t.intercept_ = function (e) {
                        return $i(this, e);
                    }),
                    (t.notifyPropertyAddition_ = function (e, t) {
                        var i,
                            n,
                            r = Wi(this);
                        if (r) {
                            var o = r
                                ? {
                                      type: gn,
                                      observableKind: 'object',
                                      debugObjectName: this.name_,
                                      object: this.proxy_ || this.target_,
                                      name: e,
                                      newValue: t,
                                  }
                                : null;
                            (0, r && Zi(this, o));
                        }
                        (null == (i = this.pendingKeys_) ||
                            null == (n = i.get(e)) ||
                            n.set(!0),
                            this.keysAtom_.reportChanged());
                    }),
                    (t.ownKeys_ = function () {
                        return (
                            this.keysAtom_.reportObserved(),
                            O(this.target_)
                        );
                    }),
                    (t.keys_ = function () {
                        return (
                            this.keysAtom_.reportObserved(),
                            Object.keys(this.target_)
                        );
                    }),
                    e
                );
            })();
        function On(e, t) {
            var i;
            if (x(e, G)) return e;
            var n =
                    null != (i = null == t ? void 0 : t.name)
                        ? i
                        : 'ObservableObject',
                r = new _n(
                    e,
                    new Map(),
                    String(n),
                    (function (e) {
                        var t;
                        return e
                            ? null != (t = e.defaultDecorator)
                                ? t
                                : Te(e)
                            : void 0;
                    })(t)
                );
            return (y(e, G, r), e);
        }
        var Sn = A('ObservableObjectAdministration', _n);
        function xn(e) {
            return (
                vn[e] ||
                (vn[e] = {
                    get: function () {
                        return this[G].getObservablePropValue_(e);
                    },
                    set: function (t) {
                        return this[G].setObservablePropValue_(e, t);
                    },
                })
            );
        }
        function Rn(e) {
            return !!b(e) && Sn(e[G]);
        }
        function In(e, t, i) {
            var n;
            null == (n = e.target_[B]) || delete n[i];
        }
        function Nn(e, t, i) {}
        var wn,
            Pn,
            Hn = Bn(0),
            Dn = 0,
            Fn = function () {};
        ((wn = Fn),
            (Pn = Array.prototype),
            Object.setPrototypeOf
                ? Object.setPrototypeOf(wn.prototype, Pn)
                : void 0 !== wn.prototype.__proto__
                  ? (wn.prototype.__proto__ = Pn)
                  : (wn.prototype = Pn));
        var kn = (function (e, t, i) {
            function n(t, i, n, r) {
                var o;
                (void 0 === n && (n = 'ObservableArray'),
                    void 0 === r && (r = !1),
                    (o = e.call(this) || this));
                var a = new rn(n, i, r, !0);
                if (((a.proxy_ = D(o)), M(D(o), G, a), t && t.length)) {
                    var s = Ge(!0);
                    (o.spliceWithArray(0, 0, t), Ue(s));
                }
                return (Object.defineProperty(D(o), '0', Hn), o);
            }
            P(n, e);
            var r = n.prototype;
            return (
                (r.concat = function () {
                    this[G].atom_.reportObserved();
                    for (
                        var e = arguments.length, t = new Array(e), i = 0;
                        i < e;
                        i++
                    )
                        t[i] = arguments[i];
                    return Array.prototype.concat.apply(
                        this.slice(),
                        t.map(function (e) {
                            return Tn(e) ? e.slice() : e;
                        })
                    );
                }),
                (r[i] = function () {
                    var e = this,
                        t = 0;
                    return Jn({
                        next: function () {
                            return t < e.length
                                ? { value: e[t++], done: !1 }
                                : { done: !0, value: void 0 };
                        },
                    });
                }),
                N(n, [
                    {
                        key: 'length',
                        get: function () {
                            return this[G].getArrayLength_();
                        },
                        set: function (e) {
                            this[G].setArrayLength_(e);
                        },
                    },
                    {
                        key: t,
                        get: function () {
                            return 'Array';
                        },
                    },
                ]),
                n
            );
        })(Fn, Symbol.toStringTag, Symbol.iterator);
        function Bn(e) {
            return {
                enumerable: !1,
                configurable: !0,
                get: function () {
                    return this[G].get_(e);
                },
                set: function (t) {
                    this[G].set_(e, t);
                },
            };
        }
        function Vn(e) {
            l(kn.prototype, '' + e, Bn(e));
        }
        function Yn(e) {
            if (e > Dn) {
                for (var t = Dn; t < e + 100; t++) Vn(t);
                Dn = e;
            }
        }
        function Gn(e, t, i) {
            return new kn(e, t, i);
        }
        function Un(e, t) {
            if ('object' == typeof e && null !== e) {
                if (Tn(e)) return (void 0 !== t && n(23), e[G].atom_);
                if (An(e)) return e.atom_;
                if (Ln(e)) {
                    if (void 0 === t) return e.keysAtom_;
                    var i = e.data_.get(t) || e.hasMap_.get(t);
                    return (i || n(25, t, $n(e)), i);
                }
                if (Rn(e)) {
                    if (!t) return n(26);
                    var r = e[G].values_.get(t);
                    return (r || n(27, t, $n(e)), r);
                }
                if (j(e) || Je(e) || Rt(e)) return e;
            } else if (Q(e) && Rt(e[G])) return e[G];
            n(28);
        }
        function jn(e, t) {
            return (
                e || n(29),
                void 0 !== t
                    ? jn(Un(e, t))
                    : j(e) || Je(e) || Rt(e) || Ln(e) || An(e)
                      ? e
                      : e[G]
                        ? e[G]
                        : void n(24, e)
            );
        }
        function $n(e, t) {
            var i;
            if (void 0 !== t) i = Un(e, t);
            else {
                if (Ut(e)) return e.name;
                i = Rn(e) || Ln(e) || An(e) ? jn(e) : Un(e);
            }
            return i.name_;
        }
        (Object.entries(an).forEach(function (e) {
            var t = e[0],
                i = e[1];
            'concat' !== t && y(kn.prototype, t, i);
        }),
            Yn(1e3));
        var zn = c.toString;
        function Wn(e, t, i) {
            return (void 0 === i && (i = -1), Kn(e, t, i));
        }
        function Kn(e, t, i, n, r) {
            if (e === t) return 0 !== e || 1 / e == 1 / t;
            if (null == e || null == t) return !1;
            if (e != e) return t != t;
            var o = typeof e;
            if ('function' !== o && 'object' !== o && 'object' != typeof t)
                return !1;
            var a = zn.call(e);
            if (a !== zn.call(t)) return !1;
            switch (a) {
                case '[object RegExp]':
                case '[object String]':
                    return '' + e == '' + t;
                case '[object Number]':
                    return +e != +e
                        ? +t != +t
                        : 0 == +e
                          ? 1 / +e == 1 / t
                          : +e == +t;
                case '[object Date]':
                case '[object Boolean]':
                    return +e == +t;
                case '[object Symbol]':
                    return (
                        'undefined' != typeof Symbol &&
                        Symbol.valueOf.call(e) === Symbol.valueOf.call(t)
                    );
                case '[object Map]':
                case '[object Set]':
                    i >= 0 && i++;
            }
            ((e = Zn(e)), (t = Zn(t)));
            var s = '[object Array]' === a;
            if (!s) {
                if ('object' != typeof e || 'object' != typeof t) return !1;
                var l = e.constructor,
                    c = t.constructor;
                if (
                    l !== c &&
                    !(Q(l) && l instanceof l && Q(c) && c instanceof c) &&
                    'constructor' in e &&
                    'constructor' in t
                )
                    return !1;
            }
            if (0 === i) return !1;
            (i < 0 && (i = -1), (r = r || []));
            for (var d = (n = n || []).length; d--; )
                if (n[d] === e) return r[d] === t;
            if ((n.push(e), r.push(t), s)) {
                if ((d = e.length) !== t.length) return !1;
                for (; d--; ) if (!Kn(e[d], t[d], i - 1, n, r)) return !1;
            } else {
                var f,
                    h = Object.keys(e);
                if (((d = h.length), Object.keys(t).length !== d)) return !1;
                for (; d--; )
                    if (!x(t, (f = h[d])) || !Kn(e[f], t[f], i - 1, n, r))
                        return !1;
            }
            return (n.pop(), r.pop(), !0);
        }
        function Zn(e) {
            return Tn(e)
                ? e.slice()
                : v(e) || Ln(e) || E(e) || An(e)
                  ? Array.from(e.entries())
                  : e;
        }
        function Jn(e) {
            return ((e[Symbol.iterator] = Xn), e);
        }
        function Xn() {
            return this;
        }
        (['Symbol', 'Map', 'Set'].forEach(function (e) {
            void 0 === o()[e] &&
                n(
                    "MobX requires global '" +
                        e +
                        "' to be available or polyfilled"
                );
        }),
            'object' == typeof __MOBX_DEVTOOLS_GLOBAL_HOOK__ &&
                __MOBX_DEVTOOLS_GLOBAL_HOOK__.injectMobx({
                    spy: It,
                    extras: { getDebugName: $n },
                    $mobx: G,
                }));
    },
};
