export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return r;
        });
        var n = i(0);
        function r(e, t) {
            const i = {},
                r = e.config(n.CONFIG.PRE_ACTIONS);
            for (const n of t) {
                const t = new n(e);
                i[t.actionName] = t;
                const o = r && r[t.actionName];
                o && t.injectPreaction(o);
            }
            return i;
        }
    },
];
