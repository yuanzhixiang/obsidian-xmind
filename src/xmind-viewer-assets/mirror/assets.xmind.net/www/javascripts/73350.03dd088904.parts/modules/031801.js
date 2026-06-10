export default {
    31801: function (e) {
        'use strict';
        function t(e) {
            switch (e._type) {
                case 'document':
                case 'block_quote':
                case 'list':
                case 'item':
                case 'paragraph':
                case 'heading':
                case 'emph':
                case 'strong':
                case 'link':
                case 'image':
                case 'custom_inline':
                case 'custom_block':
                    return !0;
                default:
                    return !1;
            }
        }
        var i = function (e, t) {
                ((this.current = e), (this.entering = !0 === t));
            },
            n = function () {
                var e = this.current,
                    i = this.entering;
                if (null === e) return null;
                var n = t(e);
                return (
                    i && n
                        ? e._firstChild
                            ? ((this.current = e._firstChild),
                              (this.entering = !0))
                            : (this.entering = !1)
                        : e === this.root
                          ? (this.current = null)
                          : null === e._next
                            ? ((this.current = e._parent), (this.entering = !1))
                            : ((this.current = e._next), (this.entering = !0)),
                    { entering: i, node: e }
                );
            },
            r = function (e) {
                return {
                    current: e,
                    root: e,
                    entering: !0,
                    next: n,
                    resumeAt: i,
                };
            },
            o = function (e, t) {
                ((this._type = e),
                    (this._parent = null),
                    (this._firstChild = null),
                    (this._lastChild = null),
                    (this._prev = null),
                    (this._next = null),
                    (this._sourcepos = t),
                    (this._lastLineBlank = !1),
                    (this._open = !0),
                    (this._string_content = null),
                    (this._literal = null),
                    (this._listData = {}),
                    (this._info = null),
                    (this._destination = null),
                    (this._title = null),
                    (this._isFenced = !1),
                    (this._fenceChar = null),
                    (this._fenceLength = 0),
                    (this._fenceOffset = null),
                    (this._level = null),
                    (this._onEnter = null),
                    (this._onExit = null));
            },
            a = o.prototype;
        (Object.defineProperty(a, 'isContainer', {
            get: function () {
                return t(this);
            },
        }),
            Object.defineProperty(a, 'type', {
                get: function () {
                    return this._type;
                },
            }),
            Object.defineProperty(a, 'firstChild', {
                get: function () {
                    return this._firstChild;
                },
            }),
            Object.defineProperty(a, 'lastChild', {
                get: function () {
                    return this._lastChild;
                },
            }),
            Object.defineProperty(a, 'next', {
                get: function () {
                    return this._next;
                },
            }),
            Object.defineProperty(a, 'prev', {
                get: function () {
                    return this._prev;
                },
            }),
            Object.defineProperty(a, 'parent', {
                get: function () {
                    return this._parent;
                },
            }),
            Object.defineProperty(a, 'sourcepos', {
                get: function () {
                    return this._sourcepos;
                },
            }),
            Object.defineProperty(a, 'literal', {
                get: function () {
                    return this._literal;
                },
                set: function (e) {
                    this._literal = e;
                },
            }),
            Object.defineProperty(a, 'destination', {
                get: function () {
                    return this._destination;
                },
                set: function (e) {
                    this._destination = e;
                },
            }),
            Object.defineProperty(a, 'title', {
                get: function () {
                    return this._title;
                },
                set: function (e) {
                    this._title = e;
                },
            }),
            Object.defineProperty(a, 'info', {
                get: function () {
                    return this._info;
                },
                set: function (e) {
                    this._info = e;
                },
            }),
            Object.defineProperty(a, 'level', {
                get: function () {
                    return this._level;
                },
                set: function (e) {
                    this._level = e;
                },
            }),
            Object.defineProperty(a, 'listType', {
                get: function () {
                    return this._listData.type;
                },
                set: function (e) {
                    this._listData.type = e;
                },
            }),
            Object.defineProperty(a, 'listTight', {
                get: function () {
                    return this._listData.tight;
                },
                set: function (e) {
                    this._listData.tight = e;
                },
            }),
            Object.defineProperty(a, 'listStart', {
                get: function () {
                    return this._listData.start;
                },
                set: function (e) {
                    this._listData.start = e;
                },
            }),
            Object.defineProperty(a, 'listDelimiter', {
                get: function () {
                    return this._listData.delimiter;
                },
                set: function (e) {
                    this._listData.delimiter = e;
                },
            }),
            Object.defineProperty(a, 'onEnter', {
                get: function () {
                    return this._onEnter;
                },
                set: function (e) {
                    this._onEnter = e;
                },
            }),
            Object.defineProperty(a, 'onExit', {
                get: function () {
                    return this._onExit;
                },
                set: function (e) {
                    this._onExit = e;
                },
            }),
            (o.prototype.appendChild = function (e) {
                (e.unlink(),
                    (e._parent = this),
                    this._lastChild
                        ? ((this._lastChild._next = e),
                          (e._prev = this._lastChild),
                          (this._lastChild = e))
                        : ((this._firstChild = e), (this._lastChild = e)));
            }),
            (o.prototype.prependChild = function (e) {
                (e.unlink(),
                    (e._parent = this),
                    this._firstChild
                        ? ((this._firstChild._prev = e),
                          (e._next = this._firstChild),
                          (this._firstChild = e))
                        : ((this._firstChild = e), (this._lastChild = e)));
            }),
            (o.prototype.unlink = function () {
                (this._prev
                    ? (this._prev._next = this._next)
                    : this._parent && (this._parent._firstChild = this._next),
                    this._next
                        ? (this._next._prev = this._prev)
                        : this._parent &&
                          (this._parent._lastChild = this._prev),
                    (this._parent = null),
                    (this._next = null),
                    (this._prev = null));
            }),
            (o.prototype.insertAfter = function (e) {
                (e.unlink(),
                    (e._next = this._next),
                    e._next && (e._next._prev = e),
                    (e._prev = this),
                    (this._next = e),
                    (e._parent = this._parent),
                    e._next || (e._parent._lastChild = e));
            }),
            (o.prototype.insertBefore = function (e) {
                (e.unlink(),
                    (e._prev = this._prev),
                    e._prev && (e._prev._next = e),
                    (e._next = this),
                    (this._prev = e),
                    (e._parent = this._parent),
                    e._prev || (e._parent._firstChild = e));
            }),
            (o.prototype.walker = function () {
                return new r(this);
            }),
            (e.exports = o));
    },
};
