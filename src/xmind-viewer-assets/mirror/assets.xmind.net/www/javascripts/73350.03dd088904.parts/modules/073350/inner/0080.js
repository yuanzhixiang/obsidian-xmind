export default [
    function (e, t, i) {
        'use strict';
        (function (e) {
            i.d(t, 'a', function () {
                return o;
            });
            var n = i(0),
                r = i(21);
            class o extends r.a {
                constructor(t) {
                    (super({ model: t }),
                        (this.model = t),
                        'readonly' !== e.env.SB_MODE &&
                            this.listenTo(
                                this.model,
                                'change:range',
                                this.onRangeChange
                            ));
                }
                get type() {
                    return n.VIEW_TYPE.SUMMARY;
                }
                parent(e) {
                    return void 0 === e ? super.parent() : super.parent(e);
                }
                remove() {
                    const e = this,
                        t = this.parent();
                    null == t ||
                        t.summaries.forEach((e, i) => {
                            e === this && t.summaries.splice(i, 1);
                        });
                    const i = e.editDomain();
                    return (
                        i &&
                            i.selectionManager &&
                            i.selectionManager.removeFromSelection(e),
                        i && i.model2View && delete i.model2View[e.model.id],
                        this.stopListening(),
                        e.parent(null),
                        this
                    );
                }
                onRangeChange() {
                    var e;
                    null === (e = this.parent()) || void 0 === e || e.refresh();
                }
            }
        }).call(this, i(45));
    },
];
