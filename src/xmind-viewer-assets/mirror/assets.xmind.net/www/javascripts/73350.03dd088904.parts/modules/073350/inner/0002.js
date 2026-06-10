export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return o;
        });
        var n = i(0),
            r = i(17);
        class o {
            constructor(e) {
                ((this.actionName = 'Action'),
                    (this._context = e),
                    (this._auto_action_status = n.ACTION_STATUS.DISABLE),
                    this._context.config(n.CONFIG.AUTO_ACTION_STATUS) &&
                        this._context.on(n.EVENTS.SE_UI_STATUS_CHANGED, () => {
                            this._auto_action_status = this.queryStatus();
                        }));
            }
            execute(e = {}) {
                return (
                    (e.prue = void 0 !== e.prue && e.prue),
                    e.prue ? this.syncExecute(e) : this.asyncExecute(e)
                );
            }
            async asyncExecute(e = {}) {
                let t = (await this._preaction) && this._preaction.execute(e);
                return t === n.ACTION_STATUS.ABORTED
                    ? n.ACTION_STATUS.ABORTED
                    : ((t = this.doExecute(e)),
                      e.skipPostaction ||
                          t === n.ACTION_STATUS.ABORTED ||
                          (t =
                              (await this._postaction) &&
                              this._postaction.execute(e)),
                      t);
            }
            syncExecute(e = {}) {
                return this.doExecute(e);
            }
            doExecute(...e) {}
            queryStatus(...e) {
                return n.ACTION_STATUS.NORMAL;
            }
            autoStatus() {
                return this._auto_action_status;
            }
            injectPreaction(e) {
                this._preaction = e;
            }
            getFilterBranchViewList(e) {
                var t;
                return (
                    (!e || e.length < 1) &&
                        (e = this._context
                            .getModule(n.MODULE_NAME.SELECTION)
                            .getSelections()),
                    null !==
                        (t =
                            null == e
                                ? void 0
                                : e.filter((e) => e instanceof r.a)) &&
                    void 0 !== t
                        ? t
                        : []
                );
            }
        }
    },
];
