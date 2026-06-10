export default {
    6843: function (e, t, i) {
        var n, r, o;
        ((o =
            ('object' == typeof self && self.self === self && self) ||
            ('object' == typeof i.g && i.g.global === i.g && i.g)),
            (n = [i(70251), i(55522), t]),
            (r = function (e, t, i) {
                o.Backbone = (function (e, t, i, n) {
                    var r = e.Backbone,
                        o = Array.prototype.slice;
                    ((t.VERSION = '1.4.1'),
                        (t.$ = n),
                        (t.noConflict = function () {
                            return ((e.Backbone = r), this);
                        }),
                        (t.emulateHTTP = !1),
                        (t.emulateJSON = !1));
                    var a,
                        s = (t.Events = {}),
                        l = /\s+/,
                        c = function (e, t, n, r, o) {
                            var a,
                                s = 0;
                            if (n && 'object' == typeof n) {
                                void 0 !== r &&
                                    'context' in o &&
                                    void 0 === o.context &&
                                    (o.context = r);
                                for (a = i.keys(n); s < a.length; s++)
                                    t = c(e, t, a[s], n[a[s]], o);
                            } else if (n && l.test(n))
                                for (a = n.split(l); s < a.length; s++)
                                    t = e(t, a[s], r, o);
                            else t = e(t, n, r, o);
                            return t;
                        };
                    ((s.on = function (e, t, i) {
                        return (
                            (this._events = c(d, this._events || {}, e, t, {
                                context: i,
                                ctx: this,
                                listening: a,
                            })),
                            a &&
                                (((this._listeners || (this._listeners = {}))[
                                    a.id
                                ] = a),
                                (a.interop = !1)),
                            this
                        );
                    }),
                        (s.listenTo = function (e, t, n) {
                            if (!e) return this;
                            var r =
                                    e._listenId ||
                                    (e._listenId = i.uniqueId('l')),
                                o =
                                    this._listeningTo ||
                                    (this._listeningTo = {}),
                                s = (a = o[r]);
                            s ||
                                (this._listenId ||
                                    (this._listenId = i.uniqueId('l')),
                                (s = a = o[r] = new g(this, e)));
                            var l = f(e, t, n, this);
                            if (((a = void 0), l)) throw l;
                            return (s.interop && s.on(t, n), this);
                        }));
                    var d = function (e, t, i, n) {
                            if (i) {
                                var r = e[t] || (e[t] = []),
                                    o = n.context,
                                    a = n.ctx,
                                    s = n.listening;
                                (s && s.count++,
                                    r.push({
                                        callback: i,
                                        context: o,
                                        ctx: o || a,
                                        listening: s,
                                    }));
                            }
                            return e;
                        },
                        f = function (e, t, i, n) {
                            try {
                                e.on(t, i, n);
                            } catch (e) {
                                return e;
                            }
                        };
                    ((s.off = function (e, t, i) {
                        return this._events
                            ? ((this._events = c(h, this._events, e, t, {
                                  context: i,
                                  listeners: this._listeners,
                              })),
                              this)
                            : this;
                    }),
                        (s.stopListening = function (e, t, n) {
                            var r = this._listeningTo;
                            if (!r) return this;
                            for (
                                var o = e ? [e._listenId] : i.keys(r), a = 0;
                                a < o.length;
                                a++
                            ) {
                                var s = r[o[a]];
                                if (!s) break;
                                (s.obj.off(t, n, this),
                                    s.interop && s.off(t, n));
                            }
                            return (
                                i.isEmpty(r) && (this._listeningTo = void 0),
                                this
                            );
                        }));
                    var h = function (e, t, n, r) {
                        if (e) {
                            var o,
                                a = r.context,
                                s = r.listeners,
                                l = 0;
                            if (t || a || n) {
                                for (
                                    o = t ? [t] : i.keys(e);
                                    l < o.length;
                                    l++
                                ) {
                                    var c = e[(t = o[l])];
                                    if (!c) break;
                                    for (var d = [], f = 0; f < c.length; f++) {
                                        var h = c[f];
                                        if (
                                            (n &&
                                                n !== h.callback &&
                                                n !== h.callback._callback) ||
                                            (a && a !== h.context)
                                        )
                                            d.push(h);
                                        else {
                                            var p = h.listening;
                                            p && p.off(t, n);
                                        }
                                    }
                                    d.length ? (e[t] = d) : delete e[t];
                                }
                                return e;
                            }
                            for (o = i.keys(s); l < o.length; l++)
                                s[o[l]].cleanup();
                        }
                    };
                    ((s.once = function (e, t, i) {
                        var n = c(p, {}, e, t, this.off.bind(this));
                        return (
                            'string' == typeof e && null == i && (t = void 0),
                            this.on(n, t, i)
                        );
                    }),
                        (s.listenToOnce = function (e, t, i) {
                            var n = c(
                                p,
                                {},
                                t,
                                i,
                                this.stopListening.bind(this, e)
                            );
                            return this.listenTo(e, n);
                        }));
                    var p = function (e, t, n, r) {
                        if (n) {
                            var o = (e[t] = i.once(function () {
                                (r(t, o), n.apply(this, arguments));
                            }));
                            o._callback = n;
                        }
                        return e;
                    };
                    s.trigger = function (e) {
                        if (!this._events) return this;
                        for (
                            var t = Math.max(0, arguments.length - 1),
                                i = Array(t),
                                n = 0;
                            n < t;
                            n++
                        )
                            i[n] = arguments[n + 1];
                        return (c(T, this._events, e, void 0, i), this);
                    };
                    var T = function (e, t, i, n) {
                            if (e) {
                                var r = e[t],
                                    o = e.all;
                                (r && o && (o = o.slice()),
                                    r && u(r, n),
                                    o && u(o, [t].concat(n)));
                            }
                            return e;
                        },
                        u = function (e, t) {
                            var i,
                                n = -1,
                                r = e.length,
                                o = t[0],
                                a = t[1],
                                s = t[2];
                            switch (t.length) {
                                case 0:
                                    for (; ++n < r; )
                                        (i = e[n]).callback.call(i.ctx);
                                    return;
                                case 1:
                                    for (; ++n < r; )
                                        (i = e[n]).callback.call(i.ctx, o);
                                    return;
                                case 2:
                                    for (; ++n < r; )
                                        (i = e[n]).callback.call(i.ctx, o, a);
                                    return;
                                case 3:
                                    for (; ++n < r; )
                                        (i = e[n]).callback.call(
                                            i.ctx,
                                            o,
                                            a,
                                            s
                                        );
                                    return;
                                default:
                                    for (; ++n < r; )
                                        (i = e[n]).callback.apply(i.ctx, t);
                                    return;
                            }
                        },
                        g = function (e, t) {
                            ((this.id = e._listenId),
                                (this.listener = e),
                                (this.obj = t),
                                (this.interop = !0),
                                (this.count = 0),
                                (this._events = void 0));
                        };
                    ((g.prototype.on = s.on),
                        (g.prototype.off = function (e, t) {
                            var i;
                            (this.interop
                                ? ((this._events = c(h, this._events, e, t, {
                                      context: void 0,
                                      listeners: void 0,
                                  })),
                                  (i = !this._events))
                                : (this.count--, (i = 0 === this.count)),
                                i && this.cleanup());
                        }),
                        (g.prototype.cleanup = function () {
                            (delete this.listener._listeningTo[
                                this.obj._listenId
                            ],
                                this.interop ||
                                    delete this.obj._listeners[this.id]);
                        }),
                        (s.bind = s.on),
                        (s.unbind = s.off),
                        i.extend(t, s));
                    var Q = (t.Model = function (e, t) {
                        var n = e || {};
                        (t || (t = {}),
                            this.preinitialize.apply(this, arguments),
                            (this.cid = i.uniqueId(this.cidPrefix)),
                            (this.attributes = {}),
                            t.collection && (this.collection = t.collection),
                            t.parse && (n = this.parse(n, t) || {}));
                        var r = i.result(this, 'defaults');
                        ((n = i.defaults(i.extend({}, r, n), r)),
                            this.set(n, t),
                            (this.changed = {}),
                            this.initialize.apply(this, arguments));
                    });
                    i.extend(Q.prototype, s, {
                        changed: null,
                        validationError: null,
                        idAttribute: 'id',
                        cidPrefix: 'c',
                        preinitialize: function () {},
                        initialize: function () {},
                        toJSON: function (e) {
                            return i.clone(this.attributes);
                        },
                        sync: function () {
                            return t.sync.apply(this, arguments);
                        },
                        get: function (e) {
                            return this.attributes[e];
                        },
                        escape: function (e) {
                            return i.escape(this.get(e));
                        },
                        has: function (e) {
                            return null != this.get(e);
                        },
                        matches: function (e) {
                            return !!i.iteratee(e, this)(this.attributes);
                        },
                        set: function (e, t, n) {
                            if (null == e) return this;
                            var r;
                            if (
                                ('object' == typeof e
                                    ? ((r = e), (n = t))
                                    : ((r = {})[e] = t),
                                n || (n = {}),
                                !this._validate(r, n))
                            )
                                return !1;
                            var o = n.unset,
                                a = n.silent,
                                s = [],
                                l = this._changing;
                            ((this._changing = !0),
                                l ||
                                    ((this._previousAttributes = i.clone(
                                        this.attributes
                                    )),
                                    (this.changed = {})));
                            var c = this.attributes,
                                d = this.changed,
                                f = this._previousAttributes;
                            for (var h in r)
                                ((t = r[h]),
                                    i.isEqual(c[h], t) || s.push(h),
                                    i.isEqual(f[h], t)
                                        ? delete d[h]
                                        : (d[h] = t),
                                    o ? delete c[h] : (c[h] = t));
                            if (this.idAttribute in r) {
                                var p = this.id;
                                ((this.id = this.get(this.idAttribute)),
                                    this.trigger('changeId', this, p, n));
                            }
                            if (!a) {
                                s.length && (this._pending = n);
                                for (var T = 0; T < s.length; T++)
                                    this.trigger(
                                        'change:' + s[T],
                                        this,
                                        c[s[T]],
                                        n
                                    );
                            }
                            if (l) return this;
                            if (!a)
                                for (; this._pending; )
                                    ((n = this._pending),
                                        (this._pending = !1),
                                        this.trigger('change', this, n));
                            return (
                                (this._pending = !1),
                                (this._changing = !1),
                                this
                            );
                        },
                        unset: function (e, t) {
                            return this.set(
                                e,
                                void 0,
                                i.extend({}, t, { unset: !0 })
                            );
                        },
                        clear: function (e) {
                            var t = {};
                            for (var n in this.attributes) t[n] = void 0;
                            return this.set(t, i.extend({}, e, { unset: !0 }));
                        },
                        hasChanged: function (e) {
                            return null == e
                                ? !i.isEmpty(this.changed)
                                : i.has(this.changed, e);
                        },
                        changedAttributes: function (e) {
                            if (!e)
                                return (
                                    !!this.hasChanged() && i.clone(this.changed)
                                );
                            var t,
                                n = this._changing
                                    ? this._previousAttributes
                                    : this.attributes,
                                r = {};
                            for (var o in e) {
                                var a = e[o];
                                i.isEqual(n[o], a) || ((r[o] = a), (t = !0));
                            }
                            return !!t && r;
                        },
                        previous: function (e) {
                            return null != e && this._previousAttributes
                                ? this._previousAttributes[e]
                                : null;
                        },
                        previousAttributes: function () {
                            return i.clone(this._previousAttributes);
                        },
                        fetch: function (e) {
                            e = i.extend({ parse: !0 }, e);
                            var t = this,
                                n = e.success;
                            return (
                                (e.success = function (i) {
                                    var r = e.parse ? t.parse(i, e) : i;
                                    if (!t.set(r, e)) return !1;
                                    (n && n.call(e.context, t, i, e),
                                        t.trigger('sync', t, i, e));
                                }),
                                W(this, e),
                                this.sync('read', this, e)
                            );
                        },
                        save: function (e, t, n) {
                            var r;
                            null == e || 'object' == typeof e
                                ? ((r = e), (n = t))
                                : ((r = {})[e] = t);
                            var o = (n = i.extend(
                                { validate: !0, parse: !0 },
                                n
                            )).wait;
                            if (r && !o) {
                                if (!this.set(r, n)) return !1;
                            } else if (!this._validate(r, n)) return !1;
                            var a = this,
                                s = n.success,
                                l = this.attributes;
                            ((n.success = function (e) {
                                a.attributes = l;
                                var t = n.parse ? a.parse(e, n) : e;
                                if (
                                    (o && (t = i.extend({}, r, t)),
                                    t && !a.set(t, n))
                                )
                                    return !1;
                                (s && s.call(n.context, a, e, n),
                                    a.trigger('sync', a, e, n));
                            }),
                                W(this, n),
                                r &&
                                    o &&
                                    (this.attributes = i.extend({}, l, r)));
                            var c = this.isNew()
                                ? 'create'
                                : n.patch
                                  ? 'patch'
                                  : 'update';
                            'patch' !== c || n.attrs || (n.attrs = r);
                            var d = this.sync(c, this, n);
                            return ((this.attributes = l), d);
                        },
                        destroy: function (e) {
                            e = e ? i.clone(e) : {};
                            var t = this,
                                n = e.success,
                                r = e.wait,
                                o = function () {
                                    (t.stopListening(),
                                        t.trigger(
                                            'destroy',
                                            t,
                                            t.collection,
                                            e
                                        ));
                                };
                            e.success = function (i) {
                                (r && o(),
                                    n && n.call(e.context, t, i, e),
                                    t.isNew() || t.trigger('sync', t, i, e));
                            };
                            var a = !1;
                            return (
                                this.isNew()
                                    ? i.defer(e.success)
                                    : (W(this, e),
                                      (a = this.sync('delete', this, e))),
                                r || o(),
                                a
                            );
                        },
                        url: function () {
                            var e =
                                i.result(this, 'urlRoot') ||
                                i.result(this.collection, 'url') ||
                                z();
                            if (this.isNew()) return e;
                            var t = this.get(this.idAttribute);
                            return (
                                e.replace(/[^\/]$/, '$&/') +
                                encodeURIComponent(t)
                            );
                        },
                        parse: function (e, t) {
                            return e;
                        },
                        clone: function () {
                            return new this.constructor(this.attributes);
                        },
                        isNew: function () {
                            return !this.has(this.idAttribute);
                        },
                        isValid: function (e) {
                            return this._validate(
                                {},
                                i.extend({}, e, { validate: !0 })
                            );
                        },
                        _validate: function (e, t) {
                            if (!t.validate || !this.validate) return !0;
                            e = i.extend({}, this.attributes, e);
                            var n = (this.validationError =
                                this.validate(e, t) || null);
                            return (
                                !n ||
                                (this.trigger(
                                    'invalid',
                                    this,
                                    n,
                                    i.extend(t, { validationError: n })
                                ),
                                !1)
                            );
                        },
                    });
                    var m = (t.Collection = function (e, t) {
                            (t || (t = {}),
                                this.preinitialize.apply(this, arguments),
                                t.model && (this.model = t.model),
                                void 0 !== t.comparator &&
                                    (this.comparator = t.comparator),
                                this._reset(),
                                this.initialize.apply(this, arguments),
                                e &&
                                    this.reset(e, i.extend({ silent: !0 }, t)));
                        }),
                        b = { add: !0, remove: !0, merge: !0 },
                        C = { add: !0, remove: !1 },
                        L = function (e, t, i) {
                            i = Math.min(Math.max(i, 0), e.length);
                            var n,
                                r = Array(e.length - i),
                                o = t.length;
                            for (n = 0; n < r.length; n++) r[n] = e[n + i];
                            for (n = 0; n < o; n++) e[n + i] = t[n];
                            for (n = 0; n < r.length; n++) e[n + o + i] = r[n];
                        };
                    i.extend(m.prototype, s, {
                        model: Q,
                        preinitialize: function () {},
                        initialize: function () {},
                        toJSON: function (e) {
                            return this.map(function (t) {
                                return t.toJSON(e);
                            });
                        },
                        sync: function () {
                            return t.sync.apply(this, arguments);
                        },
                        add: function (e, t) {
                            return this.set(e, i.extend({ merge: !1 }, t, C));
                        },
                        remove: function (e, t) {
                            t = i.extend({}, t);
                            var n = !i.isArray(e);
                            e = n ? [e] : e.slice();
                            var r = this._removeModels(e, t);
                            return (
                                !t.silent &&
                                    r.length &&
                                    ((t.changes = {
                                        added: [],
                                        merged: [],
                                        removed: r,
                                    }),
                                    this.trigger('update', this, t)),
                                n ? r[0] : r
                            );
                        },
                        set: function (e, t) {
                            if (null != e) {
                                (t = i.extend({}, b, t)).parse &&
                                    !this._isModel(e) &&
                                    (e = this.parse(e, t) || []);
                                var n = !i.isArray(e);
                                e = n ? [e] : e.slice();
                                var r = t.at;
                                (null != r && (r = +r),
                                    r > this.length && (r = this.length),
                                    r < 0 && (r += this.length + 1));
                                var o,
                                    a,
                                    s = [],
                                    l = [],
                                    c = [],
                                    d = [],
                                    f = {},
                                    h = t.add,
                                    p = t.merge,
                                    T = t.remove,
                                    u = !1,
                                    g =
                                        this.comparator &&
                                        null == r &&
                                        !1 !== t.sort,
                                    Q = i.isString(this.comparator)
                                        ? this.comparator
                                        : null;
                                for (a = 0; a < e.length; a++) {
                                    o = e[a];
                                    var m = this.get(o);
                                    if (m) {
                                        if (p && o !== m) {
                                            var C = this._isModel(o)
                                                ? o.attributes
                                                : o;
                                            (t.parse && (C = m.parse(C, t)),
                                                m.set(C, t),
                                                c.push(m),
                                                g &&
                                                    !u &&
                                                    (u = m.hasChanged(Q)));
                                        }
                                        (f[m.cid] ||
                                            ((f[m.cid] = !0), s.push(m)),
                                            (e[a] = m));
                                    } else
                                        h &&
                                            (o = e[a] =
                                                this._prepareModel(o, t)) &&
                                            (l.push(o),
                                            this._addReference(o, t),
                                            (f[o.cid] = !0),
                                            s.push(o));
                                }
                                if (T) {
                                    for (a = 0; a < this.length; a++)
                                        f[(o = this.models[a]).cid] ||
                                            d.push(o);
                                    d.length && this._removeModels(d, t);
                                }
                                var y = !1,
                                    M = !g && h && T;
                                if (
                                    (s.length && M
                                        ? ((y =
                                              this.length !== s.length ||
                                              i.some(
                                                  this.models,
                                                  function (e, t) {
                                                      return e !== s[t];
                                                  }
                                              )),
                                          (this.models.length = 0),
                                          L(this.models, s, 0),
                                          (this.length = this.models.length))
                                        : l.length &&
                                          (g && (u = !0),
                                          L(
                                              this.models,
                                              l,
                                              null == r ? this.length : r
                                          ),
                                          (this.length = this.models.length)),
                                    u && this.sort({ silent: !0 }),
                                    !t.silent)
                                ) {
                                    for (a = 0; a < l.length; a++)
                                        (null != r && (t.index = r + a),
                                            (o = l[a]).trigger(
                                                'add',
                                                o,
                                                this,
                                                t
                                            ));
                                    ((u || y) && this.trigger('sort', this, t),
                                        (l.length || d.length || c.length) &&
                                            ((t.changes = {
                                                added: l,
                                                removed: d,
                                                merged: c,
                                            }),
                                            this.trigger('update', this, t)));
                                }
                                return n ? e[0] : e;
                            }
                        },
                        reset: function (e, t) {
                            t = t ? i.clone(t) : {};
                            for (var n = 0; n < this.models.length; n++)
                                this._removeReference(this.models[n], t);
                            return (
                                (t.previousModels = this.models),
                                this._reset(),
                                (e = this.add(e, i.extend({ silent: !0 }, t))),
                                t.silent || this.trigger('reset', this, t),
                                e
                            );
                        },
                        push: function (e, t) {
                            return this.add(
                                e,
                                i.extend({ at: this.length }, t)
                            );
                        },
                        pop: function (e) {
                            var t = this.at(this.length - 1);
                            return this.remove(t, e);
                        },
                        unshift: function (e, t) {
                            return this.add(e, i.extend({ at: 0 }, t));
                        },
                        shift: function (e) {
                            var t = this.at(0);
                            return this.remove(t, e);
                        },
                        slice: function () {
                            return o.apply(this.models, arguments);
                        },
                        get: function (e) {
                            if (null != e)
                                return (
                                    this._byId[e] ||
                                    this._byId[
                                        this.modelId(
                                            this._isModel(e) ? e.attributes : e,
                                            e.idAttribute
                                        )
                                    ] ||
                                    (e.cid && this._byId[e.cid])
                                );
                        },
                        has: function (e) {
                            return null != this.get(e);
                        },
                        at: function (e) {
                            return (
                                e < 0 && (e += this.length),
                                this.models[e]
                            );
                        },
                        where: function (e, t) {
                            return this[t ? 'find' : 'filter'](e);
                        },
                        findWhere: function (e) {
                            return this.where(e, !0);
                        },
                        sort: function (e) {
                            var t = this.comparator;
                            if (!t)
                                throw new Error(
                                    'Cannot sort a set without a comparator'
                                );
                            e || (e = {});
                            var n = t.length;
                            return (
                                i.isFunction(t) && (t = t.bind(this)),
                                1 === n || i.isString(t)
                                    ? (this.models = this.sortBy(t))
                                    : this.models.sort(t),
                                e.silent || this.trigger('sort', this, e),
                                this
                            );
                        },
                        pluck: function (e) {
                            return this.map(e + '');
                        },
                        fetch: function (e) {
                            var t = (e = i.extend({ parse: !0 }, e)).success,
                                n = this;
                            return (
                                (e.success = function (i) {
                                    var r = e.reset ? 'reset' : 'set';
                                    (n[r](i, e),
                                        t && t.call(e.context, n, i, e),
                                        n.trigger('sync', n, i, e));
                                }),
                                W(this, e),
                                this.sync('read', this, e)
                            );
                        },
                        create: function (e, t) {
                            var n = (t = t ? i.clone(t) : {}).wait;
                            if (!(e = this._prepareModel(e, t))) return !1;
                            n || this.add(e, t);
                            var r = this,
                                o = t.success;
                            return (
                                (t.success = function (e, t, i) {
                                    (n && r.add(e, i),
                                        o && o.call(i.context, e, t, i));
                                }),
                                e.save(null, t),
                                e
                            );
                        },
                        parse: function (e, t) {
                            return e;
                        },
                        clone: function () {
                            return new this.constructor(this.models, {
                                model: this.model,
                                comparator: this.comparator,
                            });
                        },
                        modelId: function (e, t) {
                            return e[
                                t || this.model.prototype.idAttribute || 'id'
                            ];
                        },
                        values: function () {
                            return new M(this, A);
                        },
                        keys: function () {
                            return new M(this, v);
                        },
                        entries: function () {
                            return new M(this, E);
                        },
                        _reset: function () {
                            ((this.length = 0),
                                (this.models = []),
                                (this._byId = {}));
                        },
                        _prepareModel: function (e, t) {
                            return this._isModel(e)
                                ? (e.collection || (e.collection = this), e)
                                : (((t = t ? i.clone(t) : {}).collection =
                                      this),
                                  (n = this.model.prototype
                                      ? new this.model(e, t)
                                      : this.model(e, t)).validationError
                                      ? (this.trigger(
                                            'invalid',
                                            this,
                                            n.validationError,
                                            t
                                        ),
                                        !1)
                                      : n);
                            var n;
                        },
                        _removeModels: function (e, t) {
                            for (var i = [], n = 0; n < e.length; n++) {
                                var r = this.get(e[n]);
                                if (r) {
                                    var o = this.indexOf(r);
                                    (this.models.splice(o, 1),
                                        this.length--,
                                        delete this._byId[r.cid]);
                                    var a = this.modelId(
                                        r.attributes,
                                        r.idAttribute
                                    );
                                    (null != a && delete this._byId[a],
                                        t.silent ||
                                            ((t.index = o),
                                            r.trigger('remove', r, this, t)),
                                        i.push(r),
                                        this._removeReference(r, t));
                                }
                            }
                            return i;
                        },
                        _isModel: function (e) {
                            return e instanceof Q;
                        },
                        _addReference: function (e, t) {
                            this._byId[e.cid] = e;
                            var i = this.modelId(e.attributes, e.idAttribute);
                            (null != i && (this._byId[i] = e),
                                e.on('all', this._onModelEvent, this));
                        },
                        _removeReference: function (e, t) {
                            delete this._byId[e.cid];
                            var i = this.modelId(e.attributes, e.idAttribute);
                            (null != i && delete this._byId[i],
                                this === e.collection && delete e.collection,
                                e.off('all', this._onModelEvent, this));
                        },
                        _onModelEvent: function (e, t, i, n) {
                            if (t) {
                                if (
                                    ('add' === e || 'remove' === e) &&
                                    i !== this
                                )
                                    return;
                                if (
                                    ('destroy' === e && this.remove(t, n),
                                    'changeId' === e)
                                ) {
                                    var r = this.modelId(
                                            t.previousAttributes(),
                                            t.idAttribute
                                        ),
                                        o = this.modelId(
                                            t.attributes,
                                            t.idAttribute
                                        );
                                    (null != r && delete this._byId[r],
                                        null != o && (this._byId[o] = t));
                                }
                            }
                            this.trigger.apply(this, arguments);
                        },
                    });
                    var y = 'function' == typeof Symbol && Symbol.iterator;
                    y && (m.prototype[y] = m.prototype.values);
                    var M = function (e, t) {
                            ((this._collection = e),
                                (this._kind = t),
                                (this._index = 0));
                        },
                        A = 1,
                        v = 2,
                        E = 3;
                    (y &&
                        (M.prototype[y] = function () {
                            return this;
                        }),
                        (M.prototype.next = function () {
                            if (this._collection) {
                                if (this._index < this._collection.length) {
                                    var e,
                                        t = this._collection.at(this._index);
                                    if ((this._index++, this._kind === A))
                                        e = t;
                                    else {
                                        var i = this._collection.modelId(
                                            t.attributes,
                                            t.idAttribute
                                        );
                                        e = this._kind === v ? i : [i, t];
                                    }
                                    return { value: e, done: !1 };
                                }
                                this._collection = void 0;
                            }
                            return { value: void 0, done: !0 };
                        }));
                    var _ = (t.View = function (e) {
                            ((this.cid = i.uniqueId('view')),
                                this.preinitialize.apply(this, arguments),
                                i.extend(this, i.pick(e, S)),
                                this._ensureElement(),
                                this.initialize.apply(this, arguments));
                        }),
                        O = /^(\S+)\s*(.*)$/,
                        S = [
                            'model',
                            'collection',
                            'el',
                            'id',
                            'attributes',
                            'className',
                            'tagName',
                            'events',
                        ];
                    i.extend(_.prototype, s, {
                        tagName: 'div',
                        $: function (e) {
                            return this.$el.find(e);
                        },
                        preinitialize: function () {},
                        initialize: function () {},
                        render: function () {
                            return this;
                        },
                        remove: function () {
                            return (
                                this._removeElement(),
                                this.stopListening(),
                                this
                            );
                        },
                        _removeElement: function () {
                            this.$el.remove();
                        },
                        setElement: function (e) {
                            return (
                                this.undelegateEvents(),
                                this._setElement(e),
                                this.delegateEvents(),
                                this
                            );
                        },
                        _setElement: function (e) {
                            ((this.$el = e instanceof t.$ ? e : t.$(e)),
                                (this.el = this.$el[0]));
                        },
                        delegateEvents: function (e) {
                            if ((e || (e = i.result(this, 'events')), !e))
                                return this;
                            for (var t in (this.undelegateEvents(), e)) {
                                var n = e[t];
                                if ((i.isFunction(n) || (n = this[n]), n)) {
                                    var r = t.match(O);
                                    this.delegate(r[1], r[2], n.bind(this));
                                }
                            }
                            return this;
                        },
                        delegate: function (e, t, i) {
                            return (
                                this.$el.on(
                                    e + '.delegateEvents' + this.cid,
                                    t,
                                    i
                                ),
                                this
                            );
                        },
                        undelegateEvents: function () {
                            return (
                                this.$el &&
                                    this.$el.off('.delegateEvents' + this.cid),
                                this
                            );
                        },
                        undelegate: function (e, t, i) {
                            return (
                                this.$el.off(
                                    e + '.delegateEvents' + this.cid,
                                    t,
                                    i
                                ),
                                this
                            );
                        },
                        _createElement: function (e) {
                            return document.createElement(e);
                        },
                        _ensureElement: function () {
                            if (this.el) this.setElement(i.result(this, 'el'));
                            else {
                                var e = i.extend(
                                    {},
                                    i.result(this, 'attributes')
                                );
                                (this.id && (e.id = i.result(this, 'id')),
                                    this.className &&
                                        (e.class = i.result(this, 'className')),
                                    this.setElement(
                                        this._createElement(
                                            i.result(this, 'tagName')
                                        )
                                    ),
                                    this._setAttributes(e));
                            }
                        },
                        _setAttributes: function (e) {
                            this.$el.attr(e);
                        },
                    });
                    var x = function (e, t, i, n) {
                            switch (t) {
                                case 1:
                                    return function () {
                                        return e[i](this[n]);
                                    };
                                case 2:
                                    return function (t) {
                                        return e[i](this[n], t);
                                    };
                                case 3:
                                    return function (t, r) {
                                        return e[i](this[n], I(t, this), r);
                                    };
                                case 4:
                                    return function (t, r, o) {
                                        return e[i](this[n], I(t, this), r, o);
                                    };
                                default:
                                    return function () {
                                        var t = o.call(arguments);
                                        return (
                                            t.unshift(this[n]),
                                            e[i].apply(e, t)
                                        );
                                    };
                            }
                        },
                        R = function (e, t, n, r) {
                            i.each(n, function (i, n) {
                                t[n] && (e.prototype[n] = x(t, i, n, r));
                            });
                        },
                        I = function (e, t) {
                            return i.isFunction(e)
                                ? e
                                : i.isObject(e) && !t._isModel(e)
                                  ? N(e)
                                  : i.isString(e)
                                    ? function (t) {
                                          return t.get(e);
                                      }
                                    : e;
                        },
                        N = function (e) {
                            var t = i.matches(e);
                            return function (e) {
                                return t(e.attributes);
                            };
                        },
                        w = {
                            forEach: 3,
                            each: 3,
                            map: 3,
                            collect: 3,
                            reduce: 0,
                            foldl: 0,
                            inject: 0,
                            reduceRight: 0,
                            foldr: 0,
                            find: 3,
                            detect: 3,
                            filter: 3,
                            select: 3,
                            reject: 3,
                            every: 3,
                            all: 3,
                            some: 3,
                            any: 3,
                            include: 3,
                            includes: 3,
                            contains: 3,
                            invoke: 0,
                            max: 3,
                            min: 3,
                            toArray: 1,
                            size: 1,
                            first: 3,
                            head: 3,
                            take: 3,
                            initial: 3,
                            rest: 3,
                            tail: 3,
                            drop: 3,
                            last: 3,
                            without: 0,
                            difference: 0,
                            indexOf: 3,
                            shuffle: 1,
                            lastIndexOf: 3,
                            isEmpty: 1,
                            chain: 1,
                            sample: 3,
                            partition: 3,
                            groupBy: 3,
                            countBy: 3,
                            sortBy: 3,
                            indexBy: 3,
                            findIndex: 3,
                            findLastIndex: 3,
                        },
                        P = {
                            keys: 1,
                            values: 1,
                            pairs: 1,
                            invert: 1,
                            pick: 0,
                            omit: 0,
                            chain: 1,
                            isEmpty: 1,
                        };
                    (i.each(
                        [
                            [m, w, 'models'],
                            [Q, P, 'attributes'],
                        ],
                        function (e) {
                            var t = e[0],
                                n = e[1],
                                r = e[2];
                            ((t.mixin = function (e) {
                                var n = i.reduce(
                                    i.functions(e),
                                    function (e, t) {
                                        return ((e[t] = 0), e);
                                    },
                                    {}
                                );
                                R(t, e, n, r);
                            }),
                                R(t, i, n, r));
                        }
                    ),
                        (t.sync = function (e, n, r) {
                            var o = H[e];
                            i.defaults(r || (r = {}), {
                                emulateHTTP: t.emulateHTTP,
                                emulateJSON: t.emulateJSON,
                            });
                            var a = { type: o, dataType: 'json' };
                            if (
                                (r.url || (a.url = i.result(n, 'url') || z()),
                                null != r.data ||
                                    !n ||
                                    ('create' !== e &&
                                        'update' !== e &&
                                        'patch' !== e) ||
                                    ((a.contentType = 'application/json'),
                                    (a.data = JSON.stringify(
                                        r.attrs || n.toJSON(r)
                                    ))),
                                r.emulateJSON &&
                                    ((a.contentType =
                                        'application/x-www-form-urlencoded'),
                                    (a.data = a.data ? { model: a.data } : {})),
                                r.emulateHTTP &&
                                    ('PUT' === o ||
                                        'DELETE' === o ||
                                        'PATCH' === o))
                            ) {
                                ((a.type = 'POST'),
                                    r.emulateJSON && (a.data._method = o));
                                var s = r.beforeSend;
                                r.beforeSend = function (e) {
                                    if (
                                        (e.setRequestHeader(
                                            'X-HTTP-Method-Override',
                                            o
                                        ),
                                        s)
                                    )
                                        return s.apply(this, arguments);
                                };
                            }
                            'GET' === a.type ||
                                r.emulateJSON ||
                                (a.processData = !1);
                            var l = r.error;
                            r.error = function (e, t, i) {
                                ((r.textStatus = t),
                                    (r.errorThrown = i),
                                    l && l.call(r.context, e, t, i));
                            };
                            var c = (r.xhr = t.ajax(i.extend(a, r)));
                            return (n.trigger('request', n, c, r), c);
                        }));
                    var H = {
                        create: 'POST',
                        update: 'PUT',
                        patch: 'PATCH',
                        delete: 'DELETE',
                        read: 'GET',
                    };
                    t.ajax = function () {
                        return t.$.ajax.apply(t.$, arguments);
                    };
                    var D = (t.Router = function (e) {
                            (e || (e = {}),
                                this.preinitialize.apply(this, arguments),
                                e.routes && (this.routes = e.routes),
                                this._bindRoutes(),
                                this.initialize.apply(this, arguments));
                        }),
                        F = /\((.*?)\)/g,
                        k = /(\(\?)?:\w+/g,
                        B = /\*\w+/g,
                        V = /[\-{}\[\]+?.,\\\^$|#\s]/g;
                    i.extend(D.prototype, s, {
                        preinitialize: function () {},
                        initialize: function () {},
                        route: function (e, n, r) {
                            (i.isRegExp(e) || (e = this._routeToRegExp(e)),
                                i.isFunction(n) && ((r = n), (n = '')),
                                r || (r = this[n]));
                            var o = this;
                            return (
                                t.history.route(e, function (i) {
                                    var a = o._extractParameters(e, i);
                                    !1 !== o.execute(r, a, n) &&
                                        (o.trigger.apply(
                                            o,
                                            ['route:' + n].concat(a)
                                        ),
                                        o.trigger('route', n, a),
                                        t.history.trigger('route', o, n, a));
                                }),
                                this
                            );
                        },
                        execute: function (e, t, i) {
                            e && e.apply(this, t);
                        },
                        navigate: function (e, i) {
                            return (t.history.navigate(e, i), this);
                        },
                        _bindRoutes: function () {
                            if (this.routes) {
                                this.routes = i.result(this, 'routes');
                                for (
                                    var e, t = i.keys(this.routes);
                                    null != (e = t.pop());
                                )
                                    this.route(e, this.routes[e]);
                            }
                        },
                        _routeToRegExp: function (e) {
                            return (
                                (e = e
                                    .replace(V, '\\$&')
                                    .replace(F, '(?:$1)?')
                                    .replace(k, function (e, t) {
                                        return t ? e : '([^/?]+)';
                                    })
                                    .replace(B, '([^?]*?)')),
                                new RegExp('^' + e + '(?:\\?([\\s\\S]*))?$')
                            );
                        },
                        _extractParameters: function (e, t) {
                            var n = e.exec(t).slice(1);
                            return i.map(n, function (e, t) {
                                return t === n.length - 1
                                    ? e || null
                                    : e
                                      ? decodeURIComponent(e)
                                      : null;
                            });
                        },
                    });
                    var Y = (t.History = function () {
                            ((this.handlers = []),
                                (this.checkUrl = this.checkUrl.bind(this)),
                                'undefined' != typeof window &&
                                    ((this.location = window.location),
                                    (this.history = window.history)));
                        }),
                        G = /^[#\/]|\s+$/g,
                        U = /^\/+|\/+$/g,
                        j = /#.*$/;
                    ((Y.started = !1),
                        i.extend(Y.prototype, s, {
                            interval: 50,
                            atRoot: function () {
                                return (
                                    this.location.pathname.replace(
                                        /[^\/]$/,
                                        '$&/'
                                    ) === this.root && !this.getSearch()
                                );
                            },
                            matchRoot: function () {
                                return (
                                    this.decodeFragment(
                                        this.location.pathname
                                    ).slice(0, this.root.length - 1) +
                                        '/' ===
                                    this.root
                                );
                            },
                            decodeFragment: function (e) {
                                return decodeURI(e.replace(/%25/g, '%2525'));
                            },
                            getSearch: function () {
                                var e = this.location.href
                                    .replace(/#.*/, '')
                                    .match(/\?.+/);
                                return e ? e[0] : '';
                            },
                            getHash: function (e) {
                                var t = (e || this).location.href.match(
                                    /#(.*)$/
                                );
                                return t ? t[1] : '';
                            },
                            getPath: function () {
                                var e = this.decodeFragment(
                                    this.location.pathname + this.getSearch()
                                ).slice(this.root.length - 1);
                                return '/' === e.charAt(0) ? e.slice(1) : e;
                            },
                            getFragment: function (e) {
                                return (
                                    null == e &&
                                        (e =
                                            this._usePushState ||
                                            !this._wantsHashChange
                                                ? this.getPath()
                                                : this.getHash()),
                                    e.replace(G, '')
                                );
                            },
                            start: function (e) {
                                if (Y.started)
                                    throw new Error(
                                        'Backbone.history has already been started'
                                    );
                                if (
                                    ((Y.started = !0),
                                    (this.options = i.extend(
                                        { root: '/' },
                                        this.options,
                                        e
                                    )),
                                    (this.root = this.options.root),
                                    (this._wantsHashChange =
                                        !1 !== this.options.hashChange),
                                    (this._hasHashChange =
                                        'onhashchange' in window &&
                                        (void 0 === document.documentMode ||
                                            document.documentMode > 7)),
                                    (this._useHashChange =
                                        this._wantsHashChange &&
                                        this._hasHashChange),
                                    (this._wantsPushState =
                                        !!this.options.pushState),
                                    (this._hasPushState = !(
                                        !this.history || !this.history.pushState
                                    )),
                                    (this._usePushState =
                                        this._wantsPushState &&
                                        this._hasPushState),
                                    (this.fragment = this.getFragment()),
                                    (this.root = (
                                        '/' +
                                        this.root +
                                        '/'
                                    ).replace(U, '/')),
                                    this._wantsHashChange &&
                                        this._wantsPushState)
                                ) {
                                    if (!this._hasPushState && !this.atRoot()) {
                                        var t = this.root.slice(0, -1) || '/';
                                        return (
                                            this.location.replace(
                                                t + '#' + this.getPath()
                                            ),
                                            !0
                                        );
                                    }
                                    this._hasPushState &&
                                        this.atRoot() &&
                                        this.navigate(this.getHash(), {
                                            replace: !0,
                                        });
                                }
                                if (
                                    !this._hasHashChange &&
                                    this._wantsHashChange &&
                                    !this._usePushState
                                ) {
                                    ((this.iframe =
                                        document.createElement('iframe')),
                                        (this.iframe.src = 'javascript:0'),
                                        (this.iframe.style.display = 'none'),
                                        (this.iframe.tabIndex = -1));
                                    var n = document.body,
                                        r = n.insertBefore(
                                            this.iframe,
                                            n.firstChild
                                        ).contentWindow;
                                    (r.document.open(),
                                        r.document.close(),
                                        (r.location.hash =
                                            '#' + this.fragment));
                                }
                                var o =
                                    window.addEventListener ||
                                    function (e, t) {
                                        return attachEvent('on' + e, t);
                                    };
                                if (
                                    (this._usePushState
                                        ? o('popstate', this.checkUrl, !1)
                                        : this._useHashChange && !this.iframe
                                          ? o('hashchange', this.checkUrl, !1)
                                          : this._wantsHashChange &&
                                            (this._checkUrlInterval =
                                                setInterval(
                                                    this.checkUrl,
                                                    this.interval
                                                )),
                                    !this.options.silent)
                                )
                                    return this.loadUrl();
                            },
                            stop: function () {
                                var e =
                                    window.removeEventListener ||
                                    function (e, t) {
                                        return detachEvent('on' + e, t);
                                    };
                                (this._usePushState
                                    ? e('popstate', this.checkUrl, !1)
                                    : this._useHashChange &&
                                      !this.iframe &&
                                      e('hashchange', this.checkUrl, !1),
                                    this.iframe &&
                                        (document.body.removeChild(this.iframe),
                                        (this.iframe = null)),
                                    this._checkUrlInterval &&
                                        clearInterval(this._checkUrlInterval),
                                    (Y.started = !1));
                            },
                            route: function (e, t) {
                                this.handlers.unshift({
                                    route: e,
                                    callback: t,
                                });
                            },
                            checkUrl: function (e) {
                                var t = this.getFragment();
                                if (
                                    (t === this.fragment &&
                                        this.iframe &&
                                        (t = this.getHash(
                                            this.iframe.contentWindow
                                        )),
                                    t === this.fragment)
                                )
                                    return !1;
                                (this.iframe && this.navigate(t),
                                    this.loadUrl());
                            },
                            loadUrl: function (e) {
                                return (
                                    !!this.matchRoot() &&
                                    ((e = this.fragment = this.getFragment(e)),
                                    i.some(this.handlers, function (t) {
                                        if (t.route.test(e))
                                            return (t.callback(e), !0);
                                    }))
                                );
                            },
                            navigate: function (e, t) {
                                if (!Y.started) return !1;
                                ((t && !0 !== t) || (t = { trigger: !!t }),
                                    (e = this.getFragment(e || '')));
                                var i = this.root;
                                ('' !== e && '?' !== e.charAt(0)) ||
                                    (i = i.slice(0, -1) || '/');
                                var n = i + e;
                                e = e.replace(j, '');
                                var r = this.decodeFragment(e);
                                if (this.fragment !== r) {
                                    if (
                                        ((this.fragment = r),
                                        this._usePushState)
                                    )
                                        this.history[
                                            t.replace
                                                ? 'replaceState'
                                                : 'pushState'
                                        ]({}, document.title, n);
                                    else {
                                        if (!this._wantsHashChange)
                                            return this.location.assign(n);
                                        if (
                                            (this._updateHash(
                                                this.location,
                                                e,
                                                t.replace
                                            ),
                                            this.iframe &&
                                                e !==
                                                    this.getHash(
                                                        this.iframe
                                                            .contentWindow
                                                    ))
                                        ) {
                                            var o = this.iframe.contentWindow;
                                            (t.replace ||
                                                (o.document.open(),
                                                o.document.close()),
                                                this._updateHash(
                                                    o.location,
                                                    e,
                                                    t.replace
                                                ));
                                        }
                                    }
                                    return t.trigger ? this.loadUrl(e) : void 0;
                                }
                            },
                            _updateHash: function (e, t, i) {
                                if (i) {
                                    var n = e.href.replace(
                                        /(javascript:|#).*$/,
                                        ''
                                    );
                                    e.replace(n + '#' + t);
                                } else e.hash = '#' + t;
                            },
                        }),
                        (t.history = new Y()));
                    var $ = function (e, t) {
                        var n,
                            r = this;
                        return (
                            (n =
                                e && i.has(e, 'constructor')
                                    ? e.constructor
                                    : function () {
                                          return r.apply(this, arguments);
                                      }),
                            i.extend(n, r, t),
                            (n.prototype = i.create(r.prototype, e)),
                            (n.prototype.constructor = n),
                            (n.__super__ = r.prototype),
                            n
                        );
                    };
                    Q.extend = m.extend = D.extend = _.extend = Y.extend = $;
                    var z = function () {
                            throw new Error(
                                'A "url" property or function must be specified'
                            );
                        },
                        W = function (e, t) {
                            var i = t.error;
                            t.error = function (n) {
                                (i && i.call(t.context, e, n, t),
                                    e.trigger('error', e, n, t));
                            };
                        };
                    return t;
                })(o, i, e, t);
            }.apply(t, n)),
            void 0 === r || (e.exports = r));
    },
};
