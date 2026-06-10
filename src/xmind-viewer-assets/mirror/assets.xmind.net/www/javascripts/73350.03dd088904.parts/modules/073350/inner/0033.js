export default [
    function (e, t, i) {
        'use strict';
        (i.d(t, 'e', function () {
            return r;
        }),
            i.d(t, 'g', function () {
                return o;
            }),
            i.d(t, 'c', function () {
                return a;
            }),
            i.d(t, 'a', function () {
                return s;
            }),
            i.d(t, 'i', function () {
                return l;
            }),
            i.d(t, 'd', function () {
                return c;
            }),
            i.d(t, 'b', function () {
                return d;
            }),
            i.d(t, 'h', function () {
                return f;
            }),
            i.d(t, 'f', function () {
                return h;
            }),
            i.d(t, 'j', function () {
                return p;
            }));
        const n = /data:image[\s\S]*;base64/;
        function r(e) {
            return null != e;
        }
        function o(e) {
            return null == e;
        }
        function a(e, t) {
            return -1 !== e.indexOf(t);
        }
        function s(e) {
            return e.reduce((e, t) => e.concat(t), []);
        }
        function l(e, t) {
            const i = e;
            let n,
                r = !0;
            return function (...e) {
                const o = this;
                return r
                    ? (i.apply(o, e), (r = !1))
                    : !n &&
                          void (n = setTimeout(
                              () => {
                                  (clearTimeout(n), (n = null), i.apply(o, e));
                              },
                              void 0 === t ? 500 : t
                          ));
            };
        }
        function c(e) {
            return n.test(e);
        }
        function d(e, t) {
            let i = !1;
            return function (...n) {
                (i ||
                    ((i = !0),
                    requestAnimationFrame(() => {
                        (e.bind(this)(...n), (i = !1));
                    })),
                    t && 'function' == typeof t && t.bind(this)(...n));
            };
        }
        function f(e, t) {
            if (e.length > 0) {
                const i = e.indexOf(t);
                if (i > -1) return e.splice(i, 1);
            }
        }
        function h(e, t) {
            const i = Object.keys(e),
                n = Object.keys(t);
            return (
                i.length === n.length &&
                Object.keys(e).every((i) => {
                    const n = e[i],
                        r = t[i];
                    if ('number' == typeof n && 'number' == typeof r) {
                        const e = 1e-4;
                        return Math.abs(n - r) <= e;
                    }
                    return n === r;
                })
            );
        }
        function p(e, t) {
            t.forEach((t) => {
                const i = e.prototype[t];
                'function' == typeof i &&
                    (e.prototype[t] = function (...e) {
                        this.getContext().isReadOnly() || i.apply(this, e);
                    });
            });
        }
    },
];
