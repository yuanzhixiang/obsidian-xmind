export default [
    function (e, t, i) {
        'use strict';
        var n = i(0),
            r = i(26);
        const o = i.n(r).a.View.extend({
            initialize(e) {
                ((this._parent = e.parent),
                    (this._config = this.model.getConfig()));
            },
            onGesture(e, t, i) {
                throw new Error('must be overrided');
            },
            offGesture(e, t, i) {
                throw new Error('must be overrided');
            },
            onEvent(e, t, i) {
                throw new Error('must be overrided');
            },
            offEvent(e, t, i) {
                throw new Error('must be overrided');
            },
            execAction: function (e, ...t) {
                throw new Error(
                    'must implement execAction function in AbstractEditor'
                );
            },
            queryActionStatus: function (e, ...t) {
                throw new Error(
                    'must implement queryActionStatus in AbstractEditor'
                );
            },
            isActionExecutable: function (e, ...t) {
                return (
                    this.queryActionStatus(e, ...t) === n.ACTION_STATUS.NORMAL
                );
            },
            getChildEditors: function () {
                throw new Error(
                    'must implement getChildrenEditor in AbstractEditor'
                );
            },
            remove: function () {
                (Array.isArray(this.getChildEditors()) &&
                    this.getChildEditors().forEach((e) => {
                        e.remove();
                    }),
                    this.trigger(n.EVENTS.BEFORE_EDITOR_REMOVE, this),
                    o.__super__.remove.bind(this)(),
                    this._remove(),
                    this.trigger(n.EVENTS.EDITOR_REMOVED, this));
            },
            getSelections() {
                throw new Error(
                    'must implement getSelections in AbstractEditor'
                );
            },
            _remove: function () {},
            parent(e) {
                if (void 0 === e) return this._parent;
                this._parent = e;
            },
            config(...e) {
                if (1 === e.length && 'string' == typeof e[0]) {
                    const t = e[0];
                    return this._config.get(t);
                }
                this._config.set(...e);
            },
            getComponentViewById(e) {},
            getActiveUIStatus() {
                return [];
            },
            getZoomPencentage() {
                throw new Error('must implement it');
            },
            getTransform() {
                throw new Error('must implement it');
            },
        });
        t.a = o;
    },
];
