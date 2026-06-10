export default [
    function (e, t, i) {
        'use strict';
        (i.d(t, 'b', function () {
            return r;
        }),
            i.d(t, 'e', function () {
                return o;
            }),
            i.d(t, 'a', function () {
                return a;
            }),
            i.d(t, 'f', function () {
                return s;
            }),
            i.d(t, 'g', function () {
                return l;
            }),
            i.d(t, 'd', function () {
                return c;
            }),
            i.d(t, 'h', function () {
                return d;
            }),
            i.d(t, 'c', function () {
                return f;
            }));
        var n = i(0);
        function r(e, t) {
            return (
                e.x === t.x &&
                e.y === t.y &&
                e.width === t.width &&
                e.height === t.height
            );
        }
        function o(e, t) {
            return !(
                t.x > e.x + e.width ||
                e.x > t.x + t.width ||
                t.y > e.y + e.height ||
                e.y > t.y + t.height
            );
        }
        function a(e, t) {
            return !(
                t.x < e.x ||
                t.x > e.x + e.width ||
                t.y < e.y ||
                t.y > e.y + e.height
            );
        }
        function s(e, t) {
            const i = Math.min(e.x, t.x),
                n = Math.min(e.y, t.y);
            return {
                x: i,
                y: n,
                width: Math.max(e.x + e.width, t.x + t.width) - i,
                height: Math.max(e.y + e.height, t.y + t.height) - n,
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
        function c(e, t) {
            return {
                x: e.x - t,
                y: e.y - t,
                width: e.width + 2 * t,
                height: e.height + 2 * t,
            };
        }
        function d(e, t) {
            return { x: e.x - t.x, y: e.y - t.y };
        }
        function f(e) {
            return (
                {
                    [n.DIRECTION.UP]: n.DIRECTION.DOWN,
                    [n.DIRECTION.DOWN]: n.DIRECTION.UP,
                    [n.DIRECTION.LEFT]: n.DIRECTION.RIGHT,
                    [n.DIRECTION.RIGHT]: n.DIRECTION.LEFT,
                    [n.DIRECTION.NONE]: n.DIRECTION.NONE,
                }[e] || null
            );
        }
    },
];
