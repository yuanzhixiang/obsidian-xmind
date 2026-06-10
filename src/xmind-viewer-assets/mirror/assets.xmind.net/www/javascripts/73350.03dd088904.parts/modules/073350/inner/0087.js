export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return r;
        });
        var n = i(52);
        class r extends n.a {
            setVisible(e) {
                this.isVisible !== e &&
                    ((this.isVisible = e),
                    (this.isVisibleDirty = !0),
                    this.invalidatePaint());
            }
            setIsDefaultTitle(e) {
                this.isDefaultTitle !== e &&
                    ((this.isDefaultTitleDirty = !0),
                    (this.isDefaultTitle = e),
                    this.invalidatePaint());
            }
        }
    },
];
