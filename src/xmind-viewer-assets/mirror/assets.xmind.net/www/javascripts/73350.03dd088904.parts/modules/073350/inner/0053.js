export default [
    function (e, t, i) {
        'use strict';
        (i.d(t, 'b', function () {
            return r;
        }),
            i.d(t, 'a', function () {
                return o;
            }));
        var n = i(0);
        function r(e, t, i, n) {
            Object.keys(t).forEach((r) => {
                const o = t[r],
                    a = n[o];
                void 0 !== a && e.on(r, i, a);
            });
        }
        function o(e) {
            const t = e.getModule(n.MODULE_NAME.SEMAPHORE);
            return null == t ? void 0 : t.isStatusActive(n.UI_STATUS.DRAG);
        }
    },
];
