export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return n;
        });
        class n {
            constructor(e) {
                ((this.context = e),
                    (this.centralBranch =
                        this.context.getSheetView().centralBranchView));
            }
            dragStart(...e) {}
            dragMoving(...e) {}
            dragFinish(...e) {}
            dragCancel(...e) {
                return !1;
            }
            getDragOverView(e) {
                return null;
            }
        }
    },
];
