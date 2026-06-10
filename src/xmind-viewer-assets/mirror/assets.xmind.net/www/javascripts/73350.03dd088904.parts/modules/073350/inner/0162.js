export default [
    function (e, t, i) {
        'use strict';
        (function (e) {
            /*!
             * The buffer module from node.js, for the browser.
             *
             * @author   Feross Aboukhadijeh <http://feross.org>
             * @license  MIT
             */
            var n = i(163),
                r = i(164),
                o = i(165);
            function a() {
                return l.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
            }
            function s(e, t) {
                if (a() < t) throw new RangeError('Invalid typed array length');
                return (
                    l.TYPED_ARRAY_SUPPORT
                        ? ((e = new Uint8Array(t)).__proto__ = l.prototype)
                        : (null === e && (e = new l(t)), (e.length = t)),
                    e
                );
            }
            function l(e, t, i) {
                if (!(l.TYPED_ARRAY_SUPPORT || this instanceof l))
                    return new l(e, t, i);
                if ('number' == typeof e) {
                    if ('string' == typeof t)
                        throw new Error(
                            'If encoding is specified then the first argument must be a string'
                        );
                    return f(this, e);
                }
                return c(this, e, t, i);
            }
            function c(e, t, i, n) {
                if ('number' == typeof t)
                    throw new TypeError(
                        '"value" argument must not be a number'
                    );
                return 'undefined' != typeof ArrayBuffer &&
                    t instanceof ArrayBuffer
                    ? (function (e, t, i, n) {
                          if ((t.byteLength, i < 0 || t.byteLength < i))
                              throw new RangeError("'offset' is out of bounds");
                          if (t.byteLength < i + (n || 0))
                              throw new RangeError("'length' is out of bounds");
                          t =
                              void 0 === i && void 0 === n
                                  ? new Uint8Array(t)
                                  : void 0 === n
                                    ? new Uint8Array(t, i)
                                    : new Uint8Array(t, i, n);
                          l.TYPED_ARRAY_SUPPORT
                              ? ((e = t).__proto__ = l.prototype)
                              : (e = h(e, t));
                          return e;
                      })(e, t, i, n)
                    : 'string' == typeof t
                      ? (function (e, t, i) {
                            ('string' == typeof i && '' !== i) || (i = 'utf8');
                            if (!l.isEncoding(i))
                                throw new TypeError(
                                    '"encoding" must be a valid string encoding'
                                );
                            var n = 0 | T(t, i);
                            e = s(e, n);
                            var r = e.write(t, i);
                            r !== n && (e = e.slice(0, r));
                            return e;
                        })(e, t, i)
                      : (function (e, t) {
                            if (l.isBuffer(t)) {
                                var i = 0 | p(t.length);
                                return (
                                    0 === (e = s(e, i)).length ||
                                        t.copy(e, 0, 0, i),
                                    e
                                );
                            }
                            if (t) {
                                if (
                                    ('undefined' != typeof ArrayBuffer &&
                                        t.buffer instanceof ArrayBuffer) ||
                                    'length' in t
                                )
                                    return 'number' != typeof t.length ||
                                        (n = t.length) != n
                                        ? s(e, 0)
                                        : h(e, t);
                                if ('Buffer' === t.type && o(t.data))
                                    return h(e, t.data);
                            }
                            var n;
                            throw new TypeError(
                                'First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.'
                            );
                        })(e, t);
            }
            function d(e) {
                if ('number' != typeof e)
                    throw new TypeError('"size" argument must be a number');
                if (e < 0)
                    throw new RangeError(
                        '"size" argument must not be negative'
                    );
            }
            function f(e, t) {
                if (
                    (d(t),
                    (e = s(e, t < 0 ? 0 : 0 | p(t))),
                    !l.TYPED_ARRAY_SUPPORT)
                )
                    for (var i = 0; i < t; ++i) e[i] = 0;
                return e;
            }
            function h(e, t) {
                var i = t.length < 0 ? 0 : 0 | p(t.length);
                e = s(e, i);
                for (var n = 0; n < i; n += 1) e[n] = 255 & t[n];
                return e;
            }
            function p(e) {
                if (e >= a())
                    throw new RangeError(
                        'Attempt to allocate Buffer larger than maximum size: 0x' +
                            a().toString(16) +
                            ' bytes'
                    );
                return 0 | e;
            }
            function T(e, t) {
                if (l.isBuffer(e)) return e.length;
                if (
                    'undefined' != typeof ArrayBuffer &&
                    'function' == typeof ArrayBuffer.isView &&
                    (ArrayBuffer.isView(e) || e instanceof ArrayBuffer)
                )
                    return e.byteLength;
                'string' != typeof e && (e = '' + e);
                var i = e.length;
                if (0 === i) return 0;
                for (var n = !1; ; )
                    switch (t) {
                        case 'ascii':
                        case 'latin1':
                        case 'binary':
                            return i;
                        case 'utf8':
                        case 'utf-8':
                        case void 0:
                            return V(e).length;
                        case 'ucs2':
                        case 'ucs-2':
                        case 'utf16le':
                        case 'utf-16le':
                            return 2 * i;
                        case 'hex':
                            return i >>> 1;
                        case 'base64':
                            return Y(e).length;
                        default:
                            if (n) return V(e).length;
                            ((t = ('' + t).toLowerCase()), (n = !0));
                    }
            }
            function u(e, t, i) {
                var n = !1;
                if (((void 0 === t || t < 0) && (t = 0), t > this.length))
                    return '';
                if (
                    ((void 0 === i || i > this.length) && (i = this.length),
                    i <= 0)
                )
                    return '';
                if ((i >>>= 0) <= (t >>>= 0)) return '';
                for (e || (e = 'utf8'); ; )
                    switch (e) {
                        case 'hex':
                            return x(this, t, i);
                        case 'utf8':
                        case 'utf-8':
                            return E(this, t, i);
                        case 'ascii':
                            return O(this, t, i);
                        case 'latin1':
                        case 'binary':
                            return S(this, t, i);
                        case 'base64':
                            return v(this, t, i);
                        case 'ucs2':
                        case 'ucs-2':
                        case 'utf16le':
                        case 'utf-16le':
                            return R(this, t, i);
                        default:
                            if (n)
                                throw new TypeError('Unknown encoding: ' + e);
                            ((e = (e + '').toLowerCase()), (n = !0));
                    }
            }
            function g(e, t, i) {
                var n = e[t];
                ((e[t] = e[i]), (e[i] = n));
            }
            function Q(e, t, i, n, r) {
                if (0 === e.length) return -1;
                if (
                    ('string' == typeof i
                        ? ((n = i), (i = 0))
                        : i > 2147483647
                          ? (i = 2147483647)
                          : i < -2147483648 && (i = -2147483648),
                    (i = +i),
                    isNaN(i) && (i = r ? 0 : e.length - 1),
                    i < 0 && (i = e.length + i),
                    i >= e.length)
                ) {
                    if (r) return -1;
                    i = e.length - 1;
                } else if (i < 0) {
                    if (!r) return -1;
                    i = 0;
                }
                if (('string' == typeof t && (t = l.from(t, n)), l.isBuffer(t)))
                    return 0 === t.length ? -1 : m(e, t, i, n, r);
                if ('number' == typeof t)
                    return (
                        (t &= 255),
                        l.TYPED_ARRAY_SUPPORT &&
                        'function' == typeof Uint8Array.prototype.indexOf
                            ? r
                                ? Uint8Array.prototype.indexOf.call(e, t, i)
                                : Uint8Array.prototype.lastIndexOf.call(e, t, i)
                            : m(e, [t], i, n, r)
                    );
                throw new TypeError('val must be string, number or Buffer');
            }
            function m(e, t, i, n, r) {
                var o,
                    a = 1,
                    s = e.length,
                    l = t.length;
                if (
                    void 0 !== n &&
                    ('ucs2' === (n = String(n).toLowerCase()) ||
                        'ucs-2' === n ||
                        'utf16le' === n ||
                        'utf-16le' === n)
                ) {
                    if (e.length < 2 || t.length < 2) return -1;
                    ((a = 2), (s /= 2), (l /= 2), (i /= 2));
                }
                function c(e, t) {
                    return 1 === a ? e[t] : e.readUInt16BE(t * a);
                }
                if (r) {
                    var d = -1;
                    for (o = i; o < s; o++)
                        if (c(e, o) === c(t, -1 === d ? 0 : o - d)) {
                            if ((-1 === d && (d = o), o - d + 1 === l))
                                return d * a;
                        } else (-1 !== d && (o -= o - d), (d = -1));
                } else
                    for (i + l > s && (i = s - l), o = i; o >= 0; o--) {
                        for (var f = !0, h = 0; h < l; h++)
                            if (c(e, o + h) !== c(t, h)) {
                                f = !1;
                                break;
                            }
                        if (f) return o;
                    }
                return -1;
            }
            function b(e, t, i, n) {
                i = Number(i) || 0;
                var r = e.length - i;
                n ? (n = Number(n)) > r && (n = r) : (n = r);
                var o = t.length;
                if (o % 2 != 0) throw new TypeError('Invalid hex string');
                n > o / 2 && (n = o / 2);
                for (var a = 0; a < n; ++a) {
                    var s = parseInt(t.substr(2 * a, 2), 16);
                    if (isNaN(s)) return a;
                    e[i + a] = s;
                }
                return a;
            }
            function C(e, t, i, n) {
                return G(V(t, e.length - i), e, i, n);
            }
            function L(e, t, i, n) {
                return G(
                    (function (e) {
                        for (var t = [], i = 0; i < e.length; ++i)
                            t.push(255 & e.charCodeAt(i));
                        return t;
                    })(t),
                    e,
                    i,
                    n
                );
            }
            function y(e, t, i, n) {
                return L(e, t, i, n);
            }
            function M(e, t, i, n) {
                return G(Y(t), e, i, n);
            }
            function A(e, t, i, n) {
                return G(
                    (function (e, t) {
                        for (
                            var i, n, r, o = [], a = 0;
                            a < e.length && !((t -= 2) < 0);
                            ++a
                        )
                            ((n = (i = e.charCodeAt(a)) >> 8),
                                (r = i % 256),
                                o.push(r),
                                o.push(n));
                        return o;
                    })(t, e.length - i),
                    e,
                    i,
                    n
                );
            }
            function v(e, t, i) {
                return 0 === t && i === e.length
                    ? n.fromByteArray(e)
                    : n.fromByteArray(e.slice(t, i));
            }
            function E(e, t, i) {
                i = Math.min(e.length, i);
                for (var n = [], r = t; r < i; ) {
                    var o,
                        a,
                        s,
                        l,
                        c = e[r],
                        d = null,
                        f = c > 239 ? 4 : c > 223 ? 3 : c > 191 ? 2 : 1;
                    if (r + f <= i)
                        switch (f) {
                            case 1:
                                c < 128 && (d = c);
                                break;
                            case 2:
                                128 == (192 & (o = e[r + 1])) &&
                                    (l = ((31 & c) << 6) | (63 & o)) > 127 &&
                                    (d = l);
                                break;
                            case 3:
                                ((o = e[r + 1]),
                                    (a = e[r + 2]),
                                    128 == (192 & o) &&
                                        128 == (192 & a) &&
                                        (l =
                                            ((15 & c) << 12) |
                                            ((63 & o) << 6) |
                                            (63 & a)) > 2047 &&
                                        (l < 55296 || l > 57343) &&
                                        (d = l));
                                break;
                            case 4:
                                ((o = e[r + 1]),
                                    (a = e[r + 2]),
                                    (s = e[r + 3]),
                                    128 == (192 & o) &&
                                        128 == (192 & a) &&
                                        128 == (192 & s) &&
                                        (l =
                                            ((15 & c) << 18) |
                                            ((63 & o) << 12) |
                                            ((63 & a) << 6) |
                                            (63 & s)) > 65535 &&
                                        l < 1114112 &&
                                        (d = l));
                        }
                    (null === d
                        ? ((d = 65533), (f = 1))
                        : d > 65535 &&
                          ((d -= 65536),
                          n.push(((d >>> 10) & 1023) | 55296),
                          (d = 56320 | (1023 & d))),
                        n.push(d),
                        (r += f));
                }
                return (function (e) {
                    var t = e.length;
                    if (t <= _) return String.fromCharCode.apply(String, e);
                    var i = '',
                        n = 0;
                    for (; n < t; )
                        i += String.fromCharCode.apply(
                            String,
                            e.slice(n, (n += _))
                        );
                    return i;
                })(n);
            }
            ((t.Buffer = l),
                (t.SlowBuffer = function (e) {
                    +e != e && (e = 0);
                    return l.alloc(+e);
                }),
                (t.INSPECT_MAX_BYTES = 50),
                (l.TYPED_ARRAY_SUPPORT =
                    void 0 !== e.TYPED_ARRAY_SUPPORT
                        ? e.TYPED_ARRAY_SUPPORT
                        : (function () {
                              try {
                                  var e = new Uint8Array(1);
                                  return (
                                      (e.__proto__ = {
                                          __proto__: Uint8Array.prototype,
                                          foo: function () {
                                              return 42;
                                          },
                                      }),
                                      42 === e.foo() &&
                                          'function' == typeof e.subarray &&
                                          0 === e.subarray(1, 1).byteLength
                                  );
                              } catch (e) {
                                  return !1;
                              }
                          })()),
                (t.kMaxLength = a()),
                (l.poolSize = 8192),
                (l._augment = function (e) {
                    return ((e.__proto__ = l.prototype), e);
                }),
                (l.from = function (e, t, i) {
                    return c(null, e, t, i);
                }),
                l.TYPED_ARRAY_SUPPORT &&
                    ((l.prototype.__proto__ = Uint8Array.prototype),
                    (l.__proto__ = Uint8Array),
                    'undefined' != typeof Symbol &&
                        Symbol.species &&
                        l[Symbol.species] === l &&
                        Object.defineProperty(l, Symbol.species, {
                            value: null,
                            configurable: !0,
                        })),
                (l.alloc = function (e, t, i) {
                    return (function (e, t, i, n) {
                        return (
                            d(t),
                            t <= 0
                                ? s(e, t)
                                : void 0 !== i
                                  ? 'string' == typeof n
                                      ? s(e, t).fill(i, n)
                                      : s(e, t).fill(i)
                                  : s(e, t)
                        );
                    })(null, e, t, i);
                }),
                (l.allocUnsafe = function (e) {
                    return f(null, e);
                }),
                (l.allocUnsafeSlow = function (e) {
                    return f(null, e);
                }),
                (l.isBuffer = function (e) {
                    return !(null == e || !e._isBuffer);
                }),
                (l.compare = function (e, t) {
                    if (!l.isBuffer(e) || !l.isBuffer(t))
                        throw new TypeError('Arguments must be Buffers');
                    if (e === t) return 0;
                    for (
                        var i = e.length,
                            n = t.length,
                            r = 0,
                            o = Math.min(i, n);
                        r < o;
                        ++r
                    )
                        if (e[r] !== t[r]) {
                            ((i = e[r]), (n = t[r]));
                            break;
                        }
                    return i < n ? -1 : n < i ? 1 : 0;
                }),
                (l.isEncoding = function (e) {
                    switch (String(e).toLowerCase()) {
                        case 'hex':
                        case 'utf8':
                        case 'utf-8':
                        case 'ascii':
                        case 'latin1':
                        case 'binary':
                        case 'base64':
                        case 'ucs2':
                        case 'ucs-2':
                        case 'utf16le':
                        case 'utf-16le':
                            return !0;
                        default:
                            return !1;
                    }
                }),
                (l.concat = function (e, t) {
                    if (!o(e))
                        throw new TypeError(
                            '"list" argument must be an Array of Buffers'
                        );
                    if (0 === e.length) return l.alloc(0);
                    var i;
                    if (void 0 === t)
                        for (t = 0, i = 0; i < e.length; ++i) t += e[i].length;
                    var n = l.allocUnsafe(t),
                        r = 0;
                    for (i = 0; i < e.length; ++i) {
                        var a = e[i];
                        if (!l.isBuffer(a))
                            throw new TypeError(
                                '"list" argument must be an Array of Buffers'
                            );
                        (a.copy(n, r), (r += a.length));
                    }
                    return n;
                }),
                (l.byteLength = T),
                (l.prototype._isBuffer = !0),
                (l.prototype.swap16 = function () {
                    var e = this.length;
                    if (e % 2 != 0)
                        throw new RangeError(
                            'Buffer size must be a multiple of 16-bits'
                        );
                    for (var t = 0; t < e; t += 2) g(this, t, t + 1);
                    return this;
                }),
                (l.prototype.swap32 = function () {
                    var e = this.length;
                    if (e % 4 != 0)
                        throw new RangeError(
                            'Buffer size must be a multiple of 32-bits'
                        );
                    for (var t = 0; t < e; t += 4)
                        (g(this, t, t + 3), g(this, t + 1, t + 2));
                    return this;
                }),
                (l.prototype.swap64 = function () {
                    var e = this.length;
                    if (e % 8 != 0)
                        throw new RangeError(
                            'Buffer size must be a multiple of 64-bits'
                        );
                    for (var t = 0; t < e; t += 8)
                        (g(this, t, t + 7),
                            g(this, t + 1, t + 6),
                            g(this, t + 2, t + 5),
                            g(this, t + 3, t + 4));
                    return this;
                }),
                (l.prototype.toString = function () {
                    var e = 0 | this.length;
                    return 0 === e
                        ? ''
                        : 0 === arguments.length
                          ? E(this, 0, e)
                          : u.apply(this, arguments);
                }),
                (l.prototype.equals = function (e) {
                    if (!l.isBuffer(e))
                        throw new TypeError('Argument must be a Buffer');
                    return this === e || 0 === l.compare(this, e);
                }),
                (l.prototype.inspect = function () {
                    var e = '',
                        i = t.INSPECT_MAX_BYTES;
                    return (
                        this.length > 0 &&
                            ((e = this.toString('hex', 0, i)
                                .match(/.{2}/g)
                                .join(' ')),
                            this.length > i && (e += ' ... ')),
                        '<Buffer ' + e + '>'
                    );
                }),
                (l.prototype.compare = function (e, t, i, n, r) {
                    if (!l.isBuffer(e))
                        throw new TypeError('Argument must be a Buffer');
                    if (
                        (void 0 === t && (t = 0),
                        void 0 === i && (i = e ? e.length : 0),
                        void 0 === n && (n = 0),
                        void 0 === r && (r = this.length),
                        t < 0 || i > e.length || n < 0 || r > this.length)
                    )
                        throw new RangeError('out of range index');
                    if (n >= r && t >= i) return 0;
                    if (n >= r) return -1;
                    if (t >= i) return 1;
                    if (this === e) return 0;
                    for (
                        var o = (r >>>= 0) - (n >>>= 0),
                            a = (i >>>= 0) - (t >>>= 0),
                            s = Math.min(o, a),
                            c = this.slice(n, r),
                            d = e.slice(t, i),
                            f = 0;
                        f < s;
                        ++f
                    )
                        if (c[f] !== d[f]) {
                            ((o = c[f]), (a = d[f]));
                            break;
                        }
                    return o < a ? -1 : a < o ? 1 : 0;
                }),
                (l.prototype.includes = function (e, t, i) {
                    return -1 !== this.indexOf(e, t, i);
                }),
                (l.prototype.indexOf = function (e, t, i) {
                    return Q(this, e, t, i, !0);
                }),
                (l.prototype.lastIndexOf = function (e, t, i) {
                    return Q(this, e, t, i, !1);
                }),
                (l.prototype.write = function (e, t, i, n) {
                    if (void 0 === t)
                        ((n = 'utf8'), (i = this.length), (t = 0));
                    else if (void 0 === i && 'string' == typeof t)
                        ((n = t), (i = this.length), (t = 0));
                    else {
                        if (!isFinite(t))
                            throw new Error(
                                'Buffer.write(string, encoding, offset[, length]) is no longer supported'
                            );
                        ((t |= 0),
                            isFinite(i)
                                ? ((i |= 0), void 0 === n && (n = 'utf8'))
                                : ((n = i), (i = void 0)));
                    }
                    var r = this.length - t;
                    if (
                        ((void 0 === i || i > r) && (i = r),
                        (e.length > 0 && (i < 0 || t < 0)) || t > this.length)
                    )
                        throw new RangeError(
                            'Attempt to write outside buffer bounds'
                        );
                    n || (n = 'utf8');
                    for (var o = !1; ; )
                        switch (n) {
                            case 'hex':
                                return b(this, e, t, i);
                            case 'utf8':
                            case 'utf-8':
                                return C(this, e, t, i);
                            case 'ascii':
                                return L(this, e, t, i);
                            case 'latin1':
                            case 'binary':
                                return y(this, e, t, i);
                            case 'base64':
                                return M(this, e, t, i);
                            case 'ucs2':
                            case 'ucs-2':
                            case 'utf16le':
                            case 'utf-16le':
                                return A(this, e, t, i);
                            default:
                                if (o)
                                    throw new TypeError(
                                        'Unknown encoding: ' + n
                                    );
                                ((n = ('' + n).toLowerCase()), (o = !0));
                        }
                }),
                (l.prototype.toJSON = function () {
                    return {
                        type: 'Buffer',
                        data: Array.prototype.slice.call(this._arr || this, 0),
                    };
                }));
            var _ = 4096;
            function O(e, t, i) {
                var n = '';
                i = Math.min(e.length, i);
                for (var r = t; r < i; ++r)
                    n += String.fromCharCode(127 & e[r]);
                return n;
            }
            function S(e, t, i) {
                var n = '';
                i = Math.min(e.length, i);
                for (var r = t; r < i; ++r) n += String.fromCharCode(e[r]);
                return n;
            }
            function x(e, t, i) {
                var n = e.length;
                ((!t || t < 0) && (t = 0), (!i || i < 0 || i > n) && (i = n));
                for (var r = '', o = t; o < i; ++o) r += B(e[o]);
                return r;
            }
            function R(e, t, i) {
                for (var n = e.slice(t, i), r = '', o = 0; o < n.length; o += 2)
                    r += String.fromCharCode(n[o] + 256 * n[o + 1]);
                return r;
            }
            function I(e, t, i) {
                if (e % 1 != 0 || e < 0)
                    throw new RangeError('offset is not uint');
                if (e + t > i)
                    throw new RangeError(
                        'Trying to access beyond buffer length'
                    );
            }
            function N(e, t, i, n, r, o) {
                if (!l.isBuffer(e))
                    throw new TypeError(
                        '"buffer" argument must be a Buffer instance'
                    );
                if (t > r || t < o)
                    throw new RangeError('"value" argument is out of bounds');
                if (i + n > e.length)
                    throw new RangeError('Index out of range');
            }
            function w(e, t, i, n) {
                t < 0 && (t = 65535 + t + 1);
                for (var r = 0, o = Math.min(e.length - i, 2); r < o; ++r)
                    e[i + r] =
                        (t & (255 << (8 * (n ? r : 1 - r)))) >>>
                        (8 * (n ? r : 1 - r));
            }
            function P(e, t, i, n) {
                t < 0 && (t = 4294967295 + t + 1);
                for (var r = 0, o = Math.min(e.length - i, 4); r < o; ++r)
                    e[i + r] = (t >>> (8 * (n ? r : 3 - r))) & 255;
            }
            function H(e, t, i, n, r, o) {
                if (i + n > e.length)
                    throw new RangeError('Index out of range');
                if (i < 0) throw new RangeError('Index out of range');
            }
            function D(e, t, i, n, o) {
                return (o || H(e, 0, i, 4), r.write(e, t, i, n, 23, 4), i + 4);
            }
            function F(e, t, i, n, o) {
                return (o || H(e, 0, i, 8), r.write(e, t, i, n, 52, 8), i + 8);
            }
            ((l.prototype.slice = function (e, t) {
                var i,
                    n = this.length;
                if (
                    ((e = ~~e) < 0 ? (e += n) < 0 && (e = 0) : e > n && (e = n),
                    (t = void 0 === t ? n : ~~t) < 0
                        ? (t += n) < 0 && (t = 0)
                        : t > n && (t = n),
                    t < e && (t = e),
                    l.TYPED_ARRAY_SUPPORT)
                )
                    (i = this.subarray(e, t)).__proto__ = l.prototype;
                else {
                    var r = t - e;
                    i = new l(r, void 0);
                    for (var o = 0; o < r; ++o) i[o] = this[o + e];
                }
                return i;
            }),
                (l.prototype.readUIntLE = function (e, t, i) {
                    ((e |= 0), (t |= 0), i || I(e, t, this.length));
                    for (var n = this[e], r = 1, o = 0; ++o < t && (r *= 256); )
                        n += this[e + o] * r;
                    return n;
                }),
                (l.prototype.readUIntBE = function (e, t, i) {
                    ((e |= 0), (t |= 0), i || I(e, t, this.length));
                    for (var n = this[e + --t], r = 1; t > 0 && (r *= 256); )
                        n += this[e + --t] * r;
                    return n;
                }),
                (l.prototype.readUInt8 = function (e, t) {
                    return (t || I(e, 1, this.length), this[e]);
                }),
                (l.prototype.readUInt16LE = function (e, t) {
                    return (
                        t || I(e, 2, this.length),
                        this[e] | (this[e + 1] << 8)
                    );
                }),
                (l.prototype.readUInt16BE = function (e, t) {
                    return (
                        t || I(e, 2, this.length),
                        (this[e] << 8) | this[e + 1]
                    );
                }),
                (l.prototype.readUInt32LE = function (e, t) {
                    return (
                        t || I(e, 4, this.length),
                        (this[e] | (this[e + 1] << 8) | (this[e + 2] << 16)) +
                            16777216 * this[e + 3]
                    );
                }),
                (l.prototype.readUInt32BE = function (e, t) {
                    return (
                        t || I(e, 4, this.length),
                        16777216 * this[e] +
                            ((this[e + 1] << 16) |
                                (this[e + 2] << 8) |
                                this[e + 3])
                    );
                }),
                (l.prototype.readIntLE = function (e, t, i) {
                    ((e |= 0), (t |= 0), i || I(e, t, this.length));
                    for (var n = this[e], r = 1, o = 0; ++o < t && (r *= 256); )
                        n += this[e + o] * r;
                    return (n >= (r *= 128) && (n -= Math.pow(2, 8 * t)), n);
                }),
                (l.prototype.readIntBE = function (e, t, i) {
                    ((e |= 0), (t |= 0), i || I(e, t, this.length));
                    for (
                        var n = t, r = 1, o = this[e + --n];
                        n > 0 && (r *= 256);
                    )
                        o += this[e + --n] * r;
                    return (o >= (r *= 128) && (o -= Math.pow(2, 8 * t)), o);
                }),
                (l.prototype.readInt8 = function (e, t) {
                    return (
                        t || I(e, 1, this.length),
                        128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
                    );
                }),
                (l.prototype.readInt16LE = function (e, t) {
                    t || I(e, 2, this.length);
                    var i = this[e] | (this[e + 1] << 8);
                    return 32768 & i ? 4294901760 | i : i;
                }),
                (l.prototype.readInt16BE = function (e, t) {
                    t || I(e, 2, this.length);
                    var i = this[e + 1] | (this[e] << 8);
                    return 32768 & i ? 4294901760 | i : i;
                }),
                (l.prototype.readInt32LE = function (e, t) {
                    return (
                        t || I(e, 4, this.length),
                        this[e] |
                            (this[e + 1] << 8) |
                            (this[e + 2] << 16) |
                            (this[e + 3] << 24)
                    );
                }),
                (l.prototype.readInt32BE = function (e, t) {
                    return (
                        t || I(e, 4, this.length),
                        (this[e] << 24) |
                            (this[e + 1] << 16) |
                            (this[e + 2] << 8) |
                            this[e + 3]
                    );
                }),
                (l.prototype.readFloatLE = function (e, t) {
                    return (
                        t || I(e, 4, this.length),
                        r.read(this, e, !0, 23, 4)
                    );
                }),
                (l.prototype.readFloatBE = function (e, t) {
                    return (
                        t || I(e, 4, this.length),
                        r.read(this, e, !1, 23, 4)
                    );
                }),
                (l.prototype.readDoubleLE = function (e, t) {
                    return (
                        t || I(e, 8, this.length),
                        r.read(this, e, !0, 52, 8)
                    );
                }),
                (l.prototype.readDoubleBE = function (e, t) {
                    return (
                        t || I(e, 8, this.length),
                        r.read(this, e, !1, 52, 8)
                    );
                }),
                (l.prototype.writeUIntLE = function (e, t, i, n) {
                    ((e = +e), (t |= 0), (i |= 0), n) ||
                        N(this, e, t, i, Math.pow(2, 8 * i) - 1, 0);
                    var r = 1,
                        o = 0;
                    for (this[t] = 255 & e; ++o < i && (r *= 256); )
                        this[t + o] = (e / r) & 255;
                    return t + i;
                }),
                (l.prototype.writeUIntBE = function (e, t, i, n) {
                    ((e = +e), (t |= 0), (i |= 0), n) ||
                        N(this, e, t, i, Math.pow(2, 8 * i) - 1, 0);
                    var r = i - 1,
                        o = 1;
                    for (this[t + r] = 255 & e; --r >= 0 && (o *= 256); )
                        this[t + r] = (e / o) & 255;
                    return t + i;
                }),
                (l.prototype.writeUInt8 = function (e, t, i) {
                    return (
                        (e = +e),
                        (t |= 0),
                        i || N(this, e, t, 1, 255, 0),
                        l.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)),
                        (this[t] = 255 & e),
                        t + 1
                    );
                }),
                (l.prototype.writeUInt16LE = function (e, t, i) {
                    return (
                        (e = +e),
                        (t |= 0),
                        i || N(this, e, t, 2, 65535, 0),
                        l.TYPED_ARRAY_SUPPORT
                            ? ((this[t] = 255 & e), (this[t + 1] = e >>> 8))
                            : w(this, e, t, !0),
                        t + 2
                    );
                }),
                (l.prototype.writeUInt16BE = function (e, t, i) {
                    return (
                        (e = +e),
                        (t |= 0),
                        i || N(this, e, t, 2, 65535, 0),
                        l.TYPED_ARRAY_SUPPORT
                            ? ((this[t] = e >>> 8), (this[t + 1] = 255 & e))
                            : w(this, e, t, !1),
                        t + 2
                    );
                }),
                (l.prototype.writeUInt32LE = function (e, t, i) {
                    return (
                        (e = +e),
                        (t |= 0),
                        i || N(this, e, t, 4, 4294967295, 0),
                        l.TYPED_ARRAY_SUPPORT
                            ? ((this[t + 3] = e >>> 24),
                              (this[t + 2] = e >>> 16),
                              (this[t + 1] = e >>> 8),
                              (this[t] = 255 & e))
                            : P(this, e, t, !0),
                        t + 4
                    );
                }),
                (l.prototype.writeUInt32BE = function (e, t, i) {
                    return (
                        (e = +e),
                        (t |= 0),
                        i || N(this, e, t, 4, 4294967295, 0),
                        l.TYPED_ARRAY_SUPPORT
                            ? ((this[t] = e >>> 24),
                              (this[t + 1] = e >>> 16),
                              (this[t + 2] = e >>> 8),
                              (this[t + 3] = 255 & e))
                            : P(this, e, t, !1),
                        t + 4
                    );
                }),
                (l.prototype.writeIntLE = function (e, t, i, n) {
                    if (((e = +e), (t |= 0), !n)) {
                        var r = Math.pow(2, 8 * i - 1);
                        N(this, e, t, i, r - 1, -r);
                    }
                    var o = 0,
                        a = 1,
                        s = 0;
                    for (this[t] = 255 & e; ++o < i && (a *= 256); )
                        (e < 0 && 0 === s && 0 !== this[t + o - 1] && (s = 1),
                            (this[t + o] = (((e / a) | 0) - s) & 255));
                    return t + i;
                }),
                (l.prototype.writeIntBE = function (e, t, i, n) {
                    if (((e = +e), (t |= 0), !n)) {
                        var r = Math.pow(2, 8 * i - 1);
                        N(this, e, t, i, r - 1, -r);
                    }
                    var o = i - 1,
                        a = 1,
                        s = 0;
                    for (this[t + o] = 255 & e; --o >= 0 && (a *= 256); )
                        (e < 0 && 0 === s && 0 !== this[t + o + 1] && (s = 1),
                            (this[t + o] = (((e / a) | 0) - s) & 255));
                    return t + i;
                }),
                (l.prototype.writeInt8 = function (e, t, i) {
                    return (
                        (e = +e),
                        (t |= 0),
                        i || N(this, e, t, 1, 127, -128),
                        l.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)),
                        e < 0 && (e = 255 + e + 1),
                        (this[t] = 255 & e),
                        t + 1
                    );
                }),
                (l.prototype.writeInt16LE = function (e, t, i) {
                    return (
                        (e = +e),
                        (t |= 0),
                        i || N(this, e, t, 2, 32767, -32768),
                        l.TYPED_ARRAY_SUPPORT
                            ? ((this[t] = 255 & e), (this[t + 1] = e >>> 8))
                            : w(this, e, t, !0),
                        t + 2
                    );
                }),
                (l.prototype.writeInt16BE = function (e, t, i) {
                    return (
                        (e = +e),
                        (t |= 0),
                        i || N(this, e, t, 2, 32767, -32768),
                        l.TYPED_ARRAY_SUPPORT
                            ? ((this[t] = e >>> 8), (this[t + 1] = 255 & e))
                            : w(this, e, t, !1),
                        t + 2
                    );
                }),
                (l.prototype.writeInt32LE = function (e, t, i) {
                    return (
                        (e = +e),
                        (t |= 0),
                        i || N(this, e, t, 4, 2147483647, -2147483648),
                        l.TYPED_ARRAY_SUPPORT
                            ? ((this[t] = 255 & e),
                              (this[t + 1] = e >>> 8),
                              (this[t + 2] = e >>> 16),
                              (this[t + 3] = e >>> 24))
                            : P(this, e, t, !0),
                        t + 4
                    );
                }),
                (l.prototype.writeInt32BE = function (e, t, i) {
                    return (
                        (e = +e),
                        (t |= 0),
                        i || N(this, e, t, 4, 2147483647, -2147483648),
                        e < 0 && (e = 4294967295 + e + 1),
                        l.TYPED_ARRAY_SUPPORT
                            ? ((this[t] = e >>> 24),
                              (this[t + 1] = e >>> 16),
                              (this[t + 2] = e >>> 8),
                              (this[t + 3] = 255 & e))
                            : P(this, e, t, !1),
                        t + 4
                    );
                }),
                (l.prototype.writeFloatLE = function (e, t, i) {
                    return D(this, e, t, !0, i);
                }),
                (l.prototype.writeFloatBE = function (e, t, i) {
                    return D(this, e, t, !1, i);
                }),
                (l.prototype.writeDoubleLE = function (e, t, i) {
                    return F(this, e, t, !0, i);
                }),
                (l.prototype.writeDoubleBE = function (e, t, i) {
                    return F(this, e, t, !1, i);
                }),
                (l.prototype.copy = function (e, t, i, n) {
                    if (
                        (i || (i = 0),
                        n || 0 === n || (n = this.length),
                        t >= e.length && (t = e.length),
                        t || (t = 0),
                        n > 0 && n < i && (n = i),
                        n === i)
                    )
                        return 0;
                    if (0 === e.length || 0 === this.length) return 0;
                    if (t < 0)
                        throw new RangeError('targetStart out of bounds');
                    if (i < 0 || i >= this.length)
                        throw new RangeError('sourceStart out of bounds');
                    if (n < 0) throw new RangeError('sourceEnd out of bounds');
                    (n > this.length && (n = this.length),
                        e.length - t < n - i && (n = e.length - t + i));
                    var r,
                        o = n - i;
                    if (this === e && i < t && t < n)
                        for (r = o - 1; r >= 0; --r) e[r + t] = this[r + i];
                    else if (o < 1e3 || !l.TYPED_ARRAY_SUPPORT)
                        for (r = 0; r < o; ++r) e[r + t] = this[r + i];
                    else
                        Uint8Array.prototype.set.call(
                            e,
                            this.subarray(i, i + o),
                            t
                        );
                    return o;
                }),
                (l.prototype.fill = function (e, t, i, n) {
                    if ('string' == typeof e) {
                        if (
                            ('string' == typeof t
                                ? ((n = t), (t = 0), (i = this.length))
                                : 'string' == typeof i &&
                                  ((n = i), (i = this.length)),
                            1 === e.length)
                        ) {
                            var r = e.charCodeAt(0);
                            r < 256 && (e = r);
                        }
                        if (void 0 !== n && 'string' != typeof n)
                            throw new TypeError('encoding must be a string');
                        if ('string' == typeof n && !l.isEncoding(n))
                            throw new TypeError('Unknown encoding: ' + n);
                    } else 'number' == typeof e && (e &= 255);
                    if (t < 0 || this.length < t || this.length < i)
                        throw new RangeError('Out of range index');
                    if (i <= t) return this;
                    var o;
                    if (
                        ((t >>>= 0),
                        (i = void 0 === i ? this.length : i >>> 0),
                        e || (e = 0),
                        'number' == typeof e)
                    )
                        for (o = t; o < i; ++o) this[o] = e;
                    else {
                        var a = l.isBuffer(e) ? e : V(new l(e, n).toString()),
                            s = a.length;
                        for (o = 0; o < i - t; ++o) this[o + t] = a[o % s];
                    }
                    return this;
                }));
            var k = /[^+\/0-9A-Za-z-_]/g;
            function B(e) {
                return e < 16 ? '0' + e.toString(16) : e.toString(16);
            }
            function V(e, t) {
                var i;
                t = t || 1 / 0;
                for (var n = e.length, r = null, o = [], a = 0; a < n; ++a) {
                    if ((i = e.charCodeAt(a)) > 55295 && i < 57344) {
                        if (!r) {
                            if (i > 56319) {
                                (t -= 3) > -1 && o.push(239, 191, 189);
                                continue;
                            }
                            if (a + 1 === n) {
                                (t -= 3) > -1 && o.push(239, 191, 189);
                                continue;
                            }
                            r = i;
                            continue;
                        }
                        if (i < 56320) {
                            ((t -= 3) > -1 && o.push(239, 191, 189), (r = i));
                            continue;
                        }
                        i = 65536 + (((r - 55296) << 10) | (i - 56320));
                    } else r && (t -= 3) > -1 && o.push(239, 191, 189);
                    if (((r = null), i < 128)) {
                        if ((t -= 1) < 0) break;
                        o.push(i);
                    } else if (i < 2048) {
                        if ((t -= 2) < 0) break;
                        o.push((i >> 6) | 192, (63 & i) | 128);
                    } else if (i < 65536) {
                        if ((t -= 3) < 0) break;
                        o.push(
                            (i >> 12) | 224,
                            ((i >> 6) & 63) | 128,
                            (63 & i) | 128
                        );
                    } else {
                        if (!(i < 1114112))
                            throw new Error('Invalid code point');
                        if ((t -= 4) < 0) break;
                        o.push(
                            (i >> 18) | 240,
                            ((i >> 12) & 63) | 128,
                            ((i >> 6) & 63) | 128,
                            (63 & i) | 128
                        );
                    }
                }
                return o;
            }
            function Y(e) {
                return n.toByteArray(
                    (function (e) {
                        if (
                            (e = (function (e) {
                                return e.trim
                                    ? e.trim()
                                    : e.replace(/^\s+|\s+$/g, '');
                            })(e).replace(k, '')).length < 2
                        )
                            return '';
                        for (; e.length % 4 != 0; ) e += '=';
                        return e;
                    })(e)
                );
            }
            function G(e, t, i, n) {
                for (
                    var r = 0;
                    r < n && !(r + i >= t.length || r >= e.length);
                    ++r
                )
                    t[r + i] = e[r];
                return r;
            }
        }).call(this, i(83));
    },
];
