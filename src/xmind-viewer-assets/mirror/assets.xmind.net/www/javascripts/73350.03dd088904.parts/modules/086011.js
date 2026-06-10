export default {
    86011: function (e, t, i) {
        var n = i(14224),
            r = /%[sdj%]/g;
        ((t.format = function (e) {
            if (!Q(e)) {
                for (var t = [], i = 0; i < arguments.length; i++)
                    t.push(s(arguments[i]));
                return t.join(' ');
            }
            i = 1;
            for (
                var n = arguments,
                    o = n.length,
                    a = String(e).replace(r, function (e) {
                        if ('%%' === e) return '%';
                        if (i >= o) return e;
                        switch (e) {
                            case '%s':
                                return String(n[i++]);
                            case '%d':
                                return Number(n[i++]);
                            case '%j':
                                try {
                                    return JSON.stringify(n[i++]);
                                } catch (e) {
                                    return '[Circular]';
                                }
                            default:
                                return e;
                        }
                    }),
                    l = n[i];
                i < o;
                l = n[++i]
            )
                u(l) || !C(l) ? (a += ' ' + l) : (a += ' ' + s(l));
            return a;
        }),
            (t.deprecate = function (e, r) {
                if (m(i.g.process))
                    return function () {
                        return t.deprecate(e, r).apply(this, arguments);
                    };
                if (!0 === n.noDeprecation) return e;
                var o = !1;
                return function () {
                    if (!o) {
                        if (n.throwDeprecation) throw new Error(r);
                        (n.traceDeprecation
                            ? console.trace(r)
                            : console.error(r),
                            (o = !0));
                    }
                    return e.apply(this, arguments);
                };
            }));
        var o,
            a = {};
        function s(e, i) {
            var n = { seen: [], stylize: c };
            return (
                arguments.length >= 3 && (n.depth = arguments[2]),
                arguments.length >= 4 && (n.colors = arguments[3]),
                T(i) ? (n.showHidden = i) : i && t._extend(n, i),
                m(n.showHidden) && (n.showHidden = !1),
                m(n.depth) && (n.depth = 2),
                m(n.colors) && (n.colors = !1),
                m(n.customInspect) && (n.customInspect = !0),
                n.colors && (n.stylize = l),
                d(n, e, n.depth)
            );
        }
        function l(e, t) {
            var i = s.styles[t];
            return i
                ? '[' + s.colors[i][0] + 'm' + e + '[' + s.colors[i][1] + 'm'
                : e;
        }
        function c(e, t) {
            return e;
        }
        function d(e, i, n) {
            if (
                e.customInspect &&
                i &&
                M(i.inspect) &&
                i.inspect !== t.inspect &&
                (!i.constructor || i.constructor.prototype !== i)
            ) {
                var r = i.inspect(n, e);
                return (Q(r) || (r = d(e, r, n)), r);
            }
            var o = (function (e, t) {
                if (m(t)) return e.stylize('undefined', 'undefined');
                if (Q(t)) {
                    var i =
                        "'" +
                        JSON.stringify(t)
                            .replace(/^"|"$/g, '')
                            .replace(/'/g, "\\'")
                            .replace(/\\"/g, '"') +
                        "'";
                    return e.stylize(i, 'string');
                }
                if (g(t)) return e.stylize('' + t, 'number');
                if (T(t)) return e.stylize('' + t, 'boolean');
                if (u(t)) return e.stylize('null', 'null');
            })(e, i);
            if (o) return o;
            var a = Object.keys(i),
                s = (function (e) {
                    var t = {};
                    return (
                        e.forEach(function (e, i) {
                            t[e] = !0;
                        }),
                        t
                    );
                })(a);
            if (
                (e.showHidden && (a = Object.getOwnPropertyNames(i)),
                y(i) &&
                    (a.indexOf('message') >= 0 ||
                        a.indexOf('description') >= 0))
            )
                return f(i);
            if (0 === a.length) {
                if (M(i)) {
                    var l = i.name ? ': ' + i.name : '';
                    return e.stylize('[Function' + l + ']', 'special');
                }
                if (b(i))
                    return e.stylize(
                        RegExp.prototype.toString.call(i),
                        'regexp'
                    );
                if (L(i))
                    return e.stylize(Date.prototype.toString.call(i), 'date');
                if (y(i)) return f(i);
            }
            var c,
                C = '',
                A = !1,
                E = ['{', '}'];
            (p(i) && ((A = !0), (E = ['[', ']'])), M(i)) &&
                (C = ' [Function' + (i.name ? ': ' + i.name : '') + ']');
            return (
                b(i) && (C = ' ' + RegExp.prototype.toString.call(i)),
                L(i) && (C = ' ' + Date.prototype.toUTCString.call(i)),
                y(i) && (C = ' ' + f(i)),
                0 !== a.length || (A && 0 != i.length)
                    ? n < 0
                        ? b(i)
                            ? e.stylize(
                                  RegExp.prototype.toString.call(i),
                                  'regexp'
                              )
                            : e.stylize('[Object]', 'special')
                        : (e.seen.push(i),
                          (c = A
                              ? (function (e, t, i, n, r) {
                                    for (
                                        var o = [], a = 0, s = t.length;
                                        a < s;
                                        ++a
                                    )
                                        v(t, String(a))
                                            ? o.push(
                                                  h(e, t, i, n, String(a), !0)
                                              )
                                            : o.push('');
                                    return (
                                        r.forEach(function (r) {
                                            r.match(/^\d+$/) ||
                                                o.push(h(e, t, i, n, r, !0));
                                        }),
                                        o
                                    );
                                })(e, i, n, s, a)
                              : a.map(function (t) {
                                    return h(e, i, n, s, t, A);
                                })),
                          e.seen.pop(),
                          (function (e, t, i) {
                              var n = e.reduce(function (e, t) {
                                  return (
                                      t.indexOf('\n') >= 0 && 0,
                                      e +
                                          t.replace(/\u001b\[\d\d?m/g, '')
                                              .length +
                                          1
                                  );
                              }, 0);
                              if (n > 60)
                                  return (
                                      i[0] +
                                      ('' === t ? '' : t + '\n ') +
                                      ' ' +
                                      e.join(',\n  ') +
                                      ' ' +
                                      i[1]
                                  );
                              return i[0] + t + ' ' + e.join(', ') + ' ' + i[1];
                          })(c, C, E))
                    : E[0] + C + E[1]
            );
        }
        function f(e) {
            return '[' + Error.prototype.toString.call(e) + ']';
        }
        function h(e, t, i, n, r, o) {
            var a, s, l;
            if (
                ((l = Object.getOwnPropertyDescriptor(t, r) || {
                    value: t[r],
                }).get
                    ? (s = l.set
                          ? e.stylize('[Getter/Setter]', 'special')
                          : e.stylize('[Getter]', 'special'))
                    : l.set && (s = e.stylize('[Setter]', 'special')),
                v(n, r) || (a = '[' + r + ']'),
                s ||
                    (e.seen.indexOf(l.value) < 0
                        ? (s = u(i)
                              ? d(e, l.value, null)
                              : d(e, l.value, i - 1)).indexOf('\n') > -1 &&
                          (s = o
                              ? s
                                    .split('\n')
                                    .map(function (e) {
                                        return '  ' + e;
                                    })
                                    .join('\n')
                                    .substr(2)
                              : '\n' +
                                s
                                    .split('\n')
                                    .map(function (e) {
                                        return '   ' + e;
                                    })
                                    .join('\n'))
                        : (s = e.stylize('[Circular]', 'special'))),
                m(a))
            ) {
                if (o && r.match(/^\d+$/)) return s;
                (a = JSON.stringify('' + r)).match(
                    /^"([a-zA-Z_][a-zA-Z_0-9]*)"$/
                )
                    ? ((a = a.substr(1, a.length - 2)),
                      (a = e.stylize(a, 'name')))
                    : ((a = a
                          .replace(/'/g, "\\'")
                          .replace(/\\"/g, '"')
                          .replace(/(^"|"$)/g, "'")),
                      (a = e.stylize(a, 'string')));
            }
            return a + ': ' + s;
        }
        function p(e) {
            return Array.isArray(e);
        }
        function T(e) {
            return 'boolean' == typeof e;
        }
        function u(e) {
            return null === e;
        }
        function g(e) {
            return 'number' == typeof e;
        }
        function Q(e) {
            return 'string' == typeof e;
        }
        function m(e) {
            return void 0 === e;
        }
        function b(e) {
            return C(e) && '[object RegExp]' === A(e);
        }
        function C(e) {
            return 'object' == typeof e && null !== e;
        }
        function L(e) {
            return C(e) && '[object Date]' === A(e);
        }
        function y(e) {
            return C(e) && ('[object Error]' === A(e) || e instanceof Error);
        }
        function M(e) {
            return 'function' == typeof e;
        }
        function A(e) {
            return Object.prototype.toString.call(e);
        }
        ((t.debuglog = function (e) {
            if (
                (m(o) && (o = n.env.NODE_DEBUG || ''),
                (e = e.toUpperCase()),
                !a[e])
            )
                if (new RegExp('\\b' + e + '\\b', 'i').test(o)) {
                    var i = n.pid;
                    a[e] = function () {
                        var n = t.format.apply(t, arguments);
                        console.error('%s %d: %s', e, i, n);
                    };
                } else a[e] = function () {};
            return a[e];
        }),
            (t.inspect = s),
            (s.colors = {
                bold: [1, 22],
                italic: [3, 23],
                underline: [4, 24],
                inverse: [7, 27],
                white: [37, 39],
                grey: [90, 39],
                black: [30, 39],
                blue: [34, 39],
                cyan: [36, 39],
                green: [32, 39],
                magenta: [35, 39],
                red: [31, 39],
                yellow: [33, 39],
            }),
            (s.styles = {
                special: 'cyan',
                number: 'yellow',
                boolean: 'yellow',
                undefined: 'grey',
                null: 'bold',
                string: 'green',
                date: 'magenta',
                regexp: 'red',
            }),
            (t.isArray = p),
            (t.isBoolean = T),
            (t.isNull = u),
            (t.isNullOrUndefined = function (e) {
                return null == e;
            }),
            (t.isNumber = g),
            (t.isString = Q),
            (t.isSymbol = function (e) {
                return 'symbol' == typeof e;
            }),
            (t.isUndefined = m),
            (t.isRegExp = b),
            (t.isObject = C),
            (t.isDate = L),
            (t.isError = y),
            (t.isFunction = M),
            (t.isPrimitive = function (e) {
                return (
                    null === e ||
                    'boolean' == typeof e ||
                    'number' == typeof e ||
                    'string' == typeof e ||
                    'symbol' == typeof e ||
                    void 0 === e
                );
            }),
            (t.isBuffer = i(25167)));
        function v(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
        }
        ((t.log = function () {}),
            (t.inherits = i(9846)),
            (t._extend = function (e, t) {
                if (!t || !C(t)) return e;
                for (var i = Object.keys(t), n = i.length; n--; )
                    e[i[n]] = t[i[n]];
                return e;
            }));
    },
};
