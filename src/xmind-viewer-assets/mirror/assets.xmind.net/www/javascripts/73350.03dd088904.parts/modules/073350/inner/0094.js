export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return r;
        });
        var n = i(26);
        class r extends n.Model {
            getUndo() {}
            initialize(e, t) {}
            toJSON() {
                return JSON.parse(JSON.stringify(this.attributes));
            }
            getEnvCoreVersion() {
                return '2.64.0';
            }
            getConfig() {}
        }
    },
];
