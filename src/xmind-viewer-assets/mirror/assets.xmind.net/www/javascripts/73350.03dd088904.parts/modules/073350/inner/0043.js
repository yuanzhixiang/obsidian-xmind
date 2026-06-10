export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return r;
        });
        var n = i(21);
        class r extends n.a {
            afterAncestorChange() {
                (this.updateModel2View(), super.afterAncestorChange());
            }
        }
    },
];
