export default [
    function (e, t, i) {
        'use strict';
        var n = i(26);
        class r {
            on() {}
            off(e, t, i) {}
            trigger(e, ...t) {}
            bind(e, t, i) {}
            unbind(e, t, i) {}
            once(e, t, i) {}
            listenTo(e, t, i) {}
            listenToOnce(e, t, i) {}
            stopListening(e, t, i) {}
        }
        (Object.assign(r.prototype, n.Events), (t.a = r));
    },
];
