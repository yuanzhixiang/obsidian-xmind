export default [
    function (e, t, i) {
        'use strict';
        (i.r(t),
            i.d(t, 'viewType', function () {
                return r;
            }),
            i.d(t, 'events', function () {
                return o;
            }),
            i.d(t, 'eventHandlers', function () {
                return a;
            }));
        var n = i(0);
        const r = n.VIEW_TYPE.MARKER,
            o = {
                dblclick: 'onDblClick',
                mousedown: 'onMousedown',
                mouseover: 'onMouseover',
                mouseout: 'onMouseout',
                contextmenu: 'onContextMenu',
                press: 'onPress',
                pressup: 'onPressUp',
            },
            a = {
                onDblClick(e) {
                    e && e.stopPropagation();
                },
                onMousedown(e) {
                    if ((e.stopPropagation(), 3 === e.which))
                        return this._dispatchContextMenu(e);
                },
                onMouseover(e) {
                    this._hovering ||
                        this.getContext()
                            .getActiveUIStatus()
                            .includes(n.UI_STATUS.DRAG_TOPIC_SELECT_BOX) ||
                        ((this._hovering = !0),
                        this.figure.setSelectionArr({
                            display: '',
                        }),
                        this._stable || this.figure.setNeedToForward());
                },
                onMouseout(e) {
                    this._hovering &&
                        ((this._hovering = !1),
                        this.figure.setSelectionArr({
                            display: 'none',
                        }),
                        this._stable || this.figure.setNeedToBackward());
                },
                onContextMenu(e) {
                    (e.preventDefault(),
                        e.stopPropagation(),
                        100 !== e.detail && e.stopImmediatePropagation());
                },
                onPress(e) {
                    e.stopPropagation();
                },
                onPressUp(e) {
                    (e.stopPropagation(), this._dispatchContextMenu(e));
                },
            };
    },
];
