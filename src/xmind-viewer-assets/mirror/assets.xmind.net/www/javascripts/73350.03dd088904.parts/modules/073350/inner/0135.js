export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return r;
        });
        var n = i(0);
        class r {
            constructor(e) {
                ((this._context = e),
                    (this._status = {
                        selections: [],
                        semaphores: [],
                        sync: !1,
                    }),
                    (this._notifying = !1));
            }
            commit(e, t) {
                const i = r._mutations[e];
                'function' == typeof this[i] &&
                    (this[i](this._status, t && t.content),
                    this._notify(t && t.forceFlush));
            }
            getStatus() {
                return JSON.parse(JSON.stringify(this._status));
            }
            _notify(e) {
                if (e) {
                    const e = Object.assign(
                        Object.assign({}, this.getStatus()),
                        { sync: !0 }
                    );
                    return this._context.trigger(
                        n.EVENTS.SE_UI_STATUS_CHANGED,
                        e
                    );
                }
                this._notifying ||
                    ((this._notifying = !0),
                    Promise.resolve().then(() => {
                        (this._context.trigger(
                            n.EVENTS.SE_UI_STATUS_CHANGED,
                            this.getStatus()
                        ),
                            (this._notifying = !1));
                    }));
            }
            _selectionChange(e, t) {
                e.selections = t.map((e) => ({
                    id: e.model ? e.model.id : null,
                    type: e.type,
                }));
            }
            _semaphoreChange(e, t) {
                e.semaphores = Object.keys(t).filter((e) => t[e] > 0);
            }
        }
        ((r.identifier = n.MODULE_NAME.UI_STATUS),
            (r._mutations = {
                selectionChange: '_selectionChange',
                semaphoreChange: '_semaphoreChange',
            }));
    },
];
