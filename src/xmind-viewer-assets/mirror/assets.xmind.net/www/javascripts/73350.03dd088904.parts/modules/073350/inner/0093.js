export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return n;
        });
        class n {
            constructor(e) {
                ((this.exMap = {}),
                    e.forEach((e) => {
                        this.exMap[e.provider] = e;
                    }));
            }
            add(e, t) {
                this.exMap[e] = t;
            }
            remove(e) {
                delete this.exMap[e];
            }
            getExtension(e) {
                return this.exMap[e];
            }
            getInfo() {
                return Object.values(this.exMap);
            }
        }
    },
];
