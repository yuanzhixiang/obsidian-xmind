export default [
    function (e, t, i) {
        'use strict';
        (i.d(t, 'e', function () {
            return n;
        }),
            i.d(t, 'b', function () {
                return o;
            }),
            i.d(t, 'd', function () {
                return a;
            }),
            i.d(t, 'c', function () {
                return s;
            }),
            i.d(t, 'f', function () {
                return c;
            }),
            i.d(t, 'a', function () {
                return d;
            }),
            i.d(t, 'g', function () {
                return f;
            }));
        i(6);
        const n = (e) => void 0 === e,
            r = (e) => null === e,
            o = (e) => !n(e) && !r(e),
            a = (e) => {
                const t = typeof e;
                return 'function' === t || ('object' === t && !!e);
            },
            s = (e) => '[object Function]' === toString.call(e),
            l = (e) =>
                ((e) => '[object Number]' === toString.call(e))(e) && e !== +e,
            c = (e, t) => {
                const i = {};
                for (const n in t) e[n] !== t[n] && (i[n] = t[n]);
                return i;
            },
            d = (e) => {
                const t = ((e) =>
                    a(e)
                        ? Array.isArray(e)
                            ? e.slice()
                            : Object.assign({}, e)
                        : e)(e);
                return (
                    Object.keys(t).forEach((e) => {
                        const i = t[e];
                        a(i) && (t[e] = d(i));
                    }),
                    t
                );
            },
            f = (e, t, i = 0) => {
                let n = e((t = o(t) ? t : i));
                return (l(n) && (n = i), n);
            };
    },
];
