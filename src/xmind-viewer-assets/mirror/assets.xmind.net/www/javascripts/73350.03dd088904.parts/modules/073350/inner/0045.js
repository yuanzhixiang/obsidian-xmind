export default [
    function (e, t) {
        var i,
            n,
            r = (e.exports = {});
        function o() {
            throw new Error('setTimeout has not been defined');
        }
        function a() {
            throw new Error('clearTimeout has not been defined');
        }
        function s(e) {
            if (i === setTimeout) return setTimeout(e, 0);
            if ((i === o || !i) && setTimeout)
                return ((i = setTimeout), setTimeout(e, 0));
            try {
                return i(e, 0);
            } catch (t) {
                try {
                    return i.call(null, e, 0);
                } catch (t) {
                    return i.call(this, e, 0);
                }
            }
        }
        !(function () {
            try {
                i = 'function' == typeof setTimeout ? setTimeout : o;
            } catch (e) {
                i = o;
            }
            try {
                n = 'function' == typeof clearTimeout ? clearTimeout : a;
            } catch (e) {
                n = a;
            }
        })();
        var l,
            c = [],
            d = !1,
            f = -1;
        function h() {
            d &&
                l &&
                ((d = !1),
                l.length ? (c = l.concat(c)) : (f = -1),
                c.length && p());
        }
        function p() {
            if (!d) {
                var e = s(h);
                d = !0;
                for (var t = c.length; t; ) {
                    for (l = c, c = []; ++f < t; ) l && l[f].run();
                    ((f = -1), (t = c.length));
                }
                ((l = null),
                    (d = !1),
                    (function (e) {
                        if (n === clearTimeout) return clearTimeout(e);
                        if ((n === a || !n) && clearTimeout)
                            return ((n = clearTimeout), clearTimeout(e));
                        try {
                            return n(e);
                        } catch (t) {
                            try {
                                return n.call(null, e);
                            } catch (t) {
                                return n.call(this, e);
                            }
                        }
                    })(e));
            }
        }
        function T(e, t) {
            ((this.fun = e), (this.array = t));
        }
        function u() {}
        ((r.nextTick = function (e) {
            var t = new Array(arguments.length - 1);
            if (arguments.length > 1)
                for (var i = 1; i < arguments.length; i++)
                    t[i - 1] = arguments[i];
            (c.push(new T(e, t)), 1 !== c.length || d || s(p));
        }),
            (T.prototype.run = function () {
                this.fun.apply(null, this.array);
            }),
            (r.title = 'browser'),
            (r.browser = !0),
            (r.env = {}),
            (r.argv = []),
            (r.version = ''),
            (r.versions = {}),
            (r.on = u),
            (r.addListener = u),
            (r.once = u),
            (r.off = u),
            (r.removeListener = u),
            (r.removeAllListeners = u),
            (r.emit = u),
            (r.prependListener = u),
            (r.prependOnceListener = u),
            (r.listeners = function (e) {
                return [];
            }),
            (r.binding = function (e) {
                throw new Error('process.binding is not supported');
            }),
            (r.cwd = function () {
                return '/';
            }),
            (r.chdir = function (e) {
                throw new Error('process.chdir is not supported');
            }),
            (r.umask = function () {
                return 0;
            }));
    },
];
