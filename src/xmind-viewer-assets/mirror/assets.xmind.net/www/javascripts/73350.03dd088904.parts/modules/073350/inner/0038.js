export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return o;
        });
        var n = i(0),
            r = i(94);
        class o extends r.a {
            get componentType() {
                return n.COMPONENT_TYPE.BASE_COMPONENT;
            }
            initialize(e, t) {
                ((this._parent = null),
                    t && t.sheet && this.ownerSheet(t.sheet),
                    super.initialize(e, t));
            }
            ownerWorkbook(e) {
                return (e && (this._ownerWorkbook = e), this._ownerWorkbook);
            }
            ownerSheet(e) {
                return e
                    ? ((this._ownerSheet = e), this._ownerSheet)
                    : this._ownerSheet;
            }
            parent(e) {
                var t, i;
                return (
                    void 0 !== e &&
                        (this.trigger('beforeParentChange'),
                        null === e
                            ? null === (t = this.ownerSheet()) ||
                              void 0 === t ||
                              t.unregisterComponent(this.getId())
                            : null === (i = this.ownerSheet()) ||
                              void 0 === i ||
                              i.registerComponent(this),
                        (this._parent = e),
                        this.trigger('afterParentChange')),
                    this._parent
                );
            }
            getUndo() {
                var e;
                return null === (e = this.ownerSheet()) || void 0 === e
                    ? void 0
                    : e.getUndo();
            }
            getConfig() {
                var e;
                return null === (e = this.ownerSheet()) || void 0 === e
                    ? void 0
                    : e.getConfig();
            }
            hasAncestor() {
                const e = this.parent();
                return !!e && e.hasAncestor();
            }
            getId() {
                return this.get('id');
            }
        }
    },
];
