export default {
    81224: function (e, t, i) {
        'use strict';
        var n = i(14224),
            r = 'win32' === n.platform,
            o = i(86011);
        function a(e, t) {
            for (var i = [], n = 0; n < e.length; n++) {
                var r = e[n];
                r &&
                    '.' !== r &&
                    ('..' === r
                        ? i.length && '..' !== i[i.length - 1]
                            ? i.pop()
                            : t && i.push('..')
                        : i.push(r));
            }
            return i;
        }
        function s(e) {
            for (var t = e.length - 1, i = 0; i <= t && !e[i]; i++);
            for (var n = t; n >= 0 && !e[n]; n--);
            return 0 === i && n === t ? e : i > n ? [] : e.slice(i, n + 1);
        }
        var l =
                /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/,
            c = /^([\s\S]*?)((?:\.{1,2}|[^\\\/]+?|)(\.[^.\/\\]*|))(?:[\\\/]*)$/,
            d = {};
        function f(e) {
            var t = l.exec(e),
                i = (t[1] || '') + (t[2] || ''),
                n = t[3] || '',
                r = c.exec(n);
            return [i, r[1], r[2], r[3]];
        }
        function h(e) {
            var t = l.exec(e),
                i = t[1] || '',
                n = !!i && ':' !== i[1];
            return {
                device: i,
                isUnc: n,
                isAbsolute: n || !!t[2],
                tail: t[3],
            };
        }
        function p(e) {
            return '\\\\' + e.replace(/^[\\\/]+/, '').replace(/[\\\/]+/g, '\\');
        }
        ((d.resolve = function () {
            for (
                var e = '', t = '', i = !1, r = arguments.length - 1;
                r >= -1;
                r--
            ) {
                var s;
                if (
                    (r >= 0
                        ? (s = arguments[r])
                        : e
                          ? ((s = n.env['=' + e]) &&
                                s.substr(0, 3).toLowerCase() ===
                                    e.toLowerCase() + '\\') ||
                            (s = e + '\\')
                          : (s = n.cwd()),
                    !o.isString(s))
                )
                    throw new TypeError(
                        'Arguments to path.resolve must be strings'
                    );
                if (s) {
                    var l = h(s),
                        c = l.device,
                        d = l.isUnc,
                        f = l.isAbsolute,
                        T = l.tail;
                    if (
                        (!c || !e || c.toLowerCase() === e.toLowerCase()) &&
                        (e || (e = c),
                        i || ((t = T + '\\' + t), (i = f)),
                        e && i)
                    )
                        break;
                }
            }
            return (
                d && (e = p(e)),
                e +
                    (i ? '\\' : '') +
                    (t = a(t.split(/[\\\/]+/), !i).join('\\')) || '.'
            );
        }),
            (d.normalize = function (e) {
                var t = h(e),
                    i = t.device,
                    n = t.isUnc,
                    r = t.isAbsolute,
                    o = t.tail,
                    s = /[\\\/]$/.test(o);
                return (
                    (o = a(o.split(/[\\\/]+/), !r).join('\\')) ||
                        r ||
                        (o = '.'),
                    o && s && (o += '\\'),
                    n && (i = p(i)),
                    i + (r ? '\\' : '') + o
                );
            }),
            (d.isAbsolute = function (e) {
                return h(e).isAbsolute;
            }),
            (d.join = function () {
                for (var e = [], t = 0; t < arguments.length; t++) {
                    var i = arguments[t];
                    if (!o.isString(i))
                        throw new TypeError(
                            'Arguments to path.join must be strings'
                        );
                    i && e.push(i);
                }
                var n = e.join('\\');
                return (
                    /^[\\\/]{2}[^\\\/]/.test(e[0]) ||
                        (n = n.replace(/^[\\\/]{2,}/, '\\')),
                    d.normalize(n)
                );
            }),
            (d.relative = function (e, t) {
                ((e = d.resolve(e)), (t = d.resolve(t)));
                for (
                    var i = e.toLowerCase(),
                        n = t.toLowerCase(),
                        r = s(t.split('\\')),
                        o = s(i.split('\\')),
                        a = s(n.split('\\')),
                        l = Math.min(o.length, a.length),
                        c = l,
                        f = 0;
                    f < l;
                    f++
                )
                    if (o[f] !== a[f]) {
                        c = f;
                        break;
                    }
                if (0 == c) return t;
                var h = [];
                for (f = c; f < o.length; f++) h.push('..');
                return (h = h.concat(r.slice(c))).join('\\');
            }),
            (d._makeLong = function (e) {
                if (!o.isString(e)) return e;
                if (!e) return '';
                var t = d.resolve(e);
                return /^[a-zA-Z]\:\\/.test(t)
                    ? '\\\\?\\' + t
                    : /^\\\\[^?.]/.test(t)
                      ? '\\\\?\\UNC\\' + t.substring(2)
                      : e;
            }),
            (d.dirname = function (e) {
                var t = f(e),
                    i = t[0],
                    n = t[1];
                return i || n
                    ? (n && (n = n.substr(0, n.length - 1)), i + n)
                    : '.';
            }),
            (d.basename = function (e, t) {
                var i = f(e)[2];
                return (
                    t &&
                        i.substr(-1 * t.length) === t &&
                        (i = i.substr(0, i.length - t.length)),
                    i
                );
            }),
            (d.extname = function (e) {
                return f(e)[3];
            }),
            (d.format = function (e) {
                if (!o.isObject(e))
                    throw new TypeError(
                        "Parameter 'pathObject' must be an object, not " +
                            typeof e
                    );
                var t = e.root || '';
                if (!o.isString(t))
                    throw new TypeError(
                        "'pathObject.root' must be a string or undefined, not " +
                            typeof e.root
                    );
                var i = e.dir,
                    n = e.base || '';
                return i
                    ? i[i.length - 1] === d.sep
                        ? i + n
                        : i + d.sep + n
                    : n;
            }),
            (d.parse = function (e) {
                if (!o.isString(e))
                    throw new TypeError(
                        "Parameter 'pathString' must be a string, not " +
                            typeof e
                    );
                var t = f(e);
                if (!t || 4 !== t.length)
                    throw new TypeError("Invalid path '" + e + "'");
                return {
                    root: t[0],
                    dir: t[0] + t[1].slice(0, -1),
                    base: t[2],
                    ext: t[3],
                    name: t[2].slice(0, t[2].length - t[3].length),
                };
            }),
            (d.sep = '\\'),
            (d.delimiter = ';'));
        var T = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,
            u = {};
        function g(e) {
            return T.exec(e).slice(1);
        }
        ((u.resolve = function () {
            for (
                var e = '', t = !1, i = arguments.length - 1;
                i >= -1 && !t;
                i--
            ) {
                var r = i >= 0 ? arguments[i] : n.cwd();
                if (!o.isString(r))
                    throw new TypeError(
                        'Arguments to path.resolve must be strings'
                    );
                r && ((e = r + '/' + e), (t = '/' === r[0]));
            }
            return (t ? '/' : '') + (e = a(e.split('/'), !t).join('/')) || '.';
        }),
            (u.normalize = function (e) {
                var t = u.isAbsolute(e),
                    i = e && '/' === e[e.length - 1];
                return (
                    (e = a(e.split('/'), !t).join('/')) || t || (e = '.'),
                    e && i && (e += '/'),
                    (t ? '/' : '') + e
                );
            }),
            (u.isAbsolute = function (e) {
                return '/' === e.charAt(0);
            }),
            (u.join = function () {
                for (var e = '', t = 0; t < arguments.length; t++) {
                    var i = arguments[t];
                    if (!o.isString(i))
                        throw new TypeError(
                            'Arguments to path.join must be strings'
                        );
                    i && (e += e ? '/' + i : i);
                }
                return u.normalize(e);
            }),
            (u.relative = function (e, t) {
                ((e = u.resolve(e).substr(1)), (t = u.resolve(t).substr(1)));
                for (
                    var i = s(e.split('/')),
                        n = s(t.split('/')),
                        r = Math.min(i.length, n.length),
                        o = r,
                        a = 0;
                    a < r;
                    a++
                )
                    if (i[a] !== n[a]) {
                        o = a;
                        break;
                    }
                var l = [];
                for (a = o; a < i.length; a++) l.push('..');
                return (l = l.concat(n.slice(o))).join('/');
            }),
            (u._makeLong = function (e) {
                return e;
            }),
            (u.dirname = function (e) {
                var t = g(e),
                    i = t[0],
                    n = t[1];
                return i || n
                    ? (n && (n = n.substr(0, n.length - 1)), i + n)
                    : '.';
            }),
            (u.basename = function (e, t) {
                var i = g(e)[2];
                return (
                    t &&
                        i.substr(-1 * t.length) === t &&
                        (i = i.substr(0, i.length - t.length)),
                    i
                );
            }),
            (u.extname = function (e) {
                return g(e)[3];
            }),
            (u.format = function (e) {
                if (!o.isObject(e))
                    throw new TypeError(
                        "Parameter 'pathObject' must be an object, not " +
                            typeof e
                    );
                var t = e.root || '';
                if (!o.isString(t))
                    throw new TypeError(
                        "'pathObject.root' must be a string or undefined, not " +
                            typeof e.root
                    );
                return (e.dir ? e.dir + u.sep : '') + (e.base || '');
            }),
            (u.parse = function (e) {
                if (!o.isString(e))
                    throw new TypeError(
                        "Parameter 'pathString' must be a string, not " +
                            typeof e
                    );
                var t = g(e);
                if (!t || 4 !== t.length)
                    throw new TypeError("Invalid path '" + e + "'");
                return (
                    (t[1] = t[1] || ''),
                    (t[2] = t[2] || ''),
                    (t[3] = t[3] || ''),
                    {
                        root: t[0],
                        dir: t[0] + t[1].slice(0, -1),
                        base: t[2],
                        ext: t[3],
                        name: t[2].slice(0, t[2].length - t[3].length),
                    }
                );
            }),
            (u.sep = '/'),
            (u.delimiter = ':'),
            (e.exports = r ? d : u),
            (e.exports.posix = u),
            (e.exports.win32 = d));
    },
};
