export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return s;
        });
        var n = i(6),
            r = i.n(n),
            o = i(0),
            a = i(16);
        class s {
            constructor(e) {
                ((this._semaphoreMap = {}),
                    (this._context = e),
                    Object.keys(o.UI_STATUS).forEach(
                        (e) => (this._semaphoreMap[o.UI_STATUS[e]] = 0)
                    ));
            }
            increase(e, { forceFlush: t } = {}) {
                e || a.b.get(o.CONFIG.LOGGER).error('需要传入uiStatus参数！');
                const i = this._semaphoreMap[e];
                if (((this._semaphoreMap[e] = i + 1), 0 === i)) {
                    this._context.trigger(o.EVENTS.AFTER_UI_STATUS_ACTIVATE, e);
                    const i = {
                        content: JSON.parse(JSON.stringify(this._semaphoreMap)),
                        forceFlush: t,
                    };
                    this._context
                        .getModule(o.MODULE_NAME.UI_STATUS)
                        .commit('semaphoreChange', i);
                }
            }
            decrease(e, { forceFlush: t } = {}) {
                e || a.b.get(o.CONFIG.LOGGER).error('需要传入uiStatus参数！');
                const i = this._semaphoreMap[e];
                if (((this._semaphoreMap[e] = i - 1), i - 1 == 0)) {
                    this._context.trigger(
                        o.EVENTS.AFTER_UI_STATUS_DEACTIVATE,
                        e
                    );
                    const i = {
                        content: JSON.parse(JSON.stringify(this._semaphoreMap)),
                        forceFlush: t,
                    };
                    this._context
                        .getModule(o.MODULE_NAME.UI_STATUS)
                        .commit('semaphoreChange', i);
                }
                i - 1 < 0 && (this._semaphoreMap[e] = 0);
            }
            getActiveUIStatus() {
                return Object.keys(this._semaphoreMap).filter(
                    (e) => 0 !== this._semaphoreMap[e]
                );
            }
            _log_semaphore() {
                return JSON.stringify(this._semaphoreMap);
            }
            isStatusActive(e) {
                return this._semaphoreMap[e] > 0;
            }
            onceNotInStatus(e, t) {
                if (
                    0 === e.length ||
                    e.every((e) => 0 === this._semaphoreMap[e])
                )
                    return void t();
                const i = (n, a) => {
                    0 ===
                        r.a.intersection(e, this.getActiveUIStatus()).length &&
                        (t(),
                        this._context.off(
                            o.EVENTS.AFTER_UI_STATUS_DEACTIVATE,
                            i
                        ));
                };
                this._context.on(o.EVENTS.AFTER_UI_STATUS_DEACTIVATE, i);
            }
        }
        s.identifier = o.MODULE_NAME.SEMAPHORE;
    },
];
