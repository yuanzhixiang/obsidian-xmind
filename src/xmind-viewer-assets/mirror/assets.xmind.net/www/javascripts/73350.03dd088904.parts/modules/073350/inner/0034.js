export default [
    function (e, t, i) {
        'use strict';
        (i.d(t, 'b', function () {
            return n;
        }),
            i.d(t, 'a', function () {
                return r;
            }));
        const n = {
                BEFORE_EACH: 'beforeEach',
                BEFORE_LAYOUT: 'beforeLayout',
                LAYOUT: 'layout',
                AFTER_LAYOUT: 'afterLayout',
                BEFORE_RENDER: 'beforeRender',
                RENDER: 'render',
                AFTER_RENDER: 'afterRender',
                AFTER_EACH: 'afterEach',
                BEFORE_SELECT_SELECTION: 'beforeSelectSelection',
                SELECT_SELECTION: 'selectSelection',
            },
            r = Object.assign(Object.assign({ NONE: 'none' }, n), {
                ALL: 'ALL',
            });
        t.c = { PRIORITY: n, ABORTED_PRIORITY: r };
    },
];
