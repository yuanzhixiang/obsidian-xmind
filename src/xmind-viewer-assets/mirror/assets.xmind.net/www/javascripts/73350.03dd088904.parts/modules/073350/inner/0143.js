export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return a;
        });
        var n = i(0),
            r = i(6),
            o = i.n(r);
        class a {
            constructor(e) {
                ((this._baseIndex = -1),
                    (this._baseGroup = void 0),
                    (this._undo = null),
                    (this._context = e),
                    (this._undo = e.model.getUndo()));
            }
            checkIsModified() {
                return (
                    this._undo.getIndex() !== this._baseIndex ||
                    !o.a.isEqual(this._undo.getLastGroup(), this._baseGroup)
                );
            }
            updateBaseIndex() {
                ((this._baseIndex = this._undo.getIndex()),
                    (this._baseGroup = this._undo.getLastGroup()));
            }
            simulateModify() {
                ((this._baseIndex = -1 === this._baseIndex ? -2 : -1),
                    this._context.trigger(n.EVENTS.AFTER_MODIFY_STATUS_CHANGE));
            }
        }
        a.identifier = n.MODULE_NAME.MODIFY_CHECK;
    },
];
