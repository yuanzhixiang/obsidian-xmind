export default [
    function (e, t, i) {
        'use strict';
        (i.d(t, 'b', function () {
            return r;
        }),
            i.d(t, 'c', function () {
                return o;
            }),
            i.d(t, 'd', function () {
                return a;
            }),
            i.d(t, 'e', function () {
                return s;
            }),
            i.d(t, 'a', function () {
                return l;
            }),
            i.d(t, 'f', function () {
                return c;
            }));
        var n = i(15);
        function r(e, t) {
            return !(
                t.x > e.x + e.width ||
                e.x > t.x + t.width ||
                t.y > e.y + e.height ||
                e.y > t.y + t.height
            );
        }
        function o(e, t) {
            const i = Math.min(e.x, t.x),
                n = Math.min(e.y, t.y);
            return {
                x: i,
                y: n,
                width: Math.max(e.x + e.width, t.x + t.width) - i,
                height: Math.max(e.y + e.height, t.y + t.height) - n,
            };
        }
        function a(e) {
            if (!Array.isArray(e)) throw 'Wrong arguements';
            return 0 === e.length
                ? { x: 0, y: 0, width: 0, height: 0 }
                : 1 === e.length
                  ? e[0]
                  : e.reduce((e, t) => o(e, t));
        }
        function s(e, t) {
            return {
                x: t.x + e.x,
                y: t.y + e.y,
                width: e.width,
                height: e.height,
            };
        }
        function l(e) {
            let t = 1 / 0,
                i = 1 / 0,
                n = -1 / 0,
                r = -1 / 0;
            return (
                e.forEach((e) => {
                    (e.x < t && (t = e.x),
                        e.x > n && (n = e.x),
                        e.y < i && (i = e.y),
                        e.y > r && (r = e.y));
                }),
                { x: t, y: i, height: r - i, width: n - t }
            );
        }
        function c(e, t, i = 0, r = 0) {
            return l(
                [
                    { x: e.x, y: e.y },
                    { x: e.x + e.width, y: e.y },
                    { x: e.x + e.width, y: e.y + e.height },
                    { x: e.x, y: e.y + e.height },
                ].map((e) => n.q(e, { x: i, y: r }, t))
            );
        }
    },
];
