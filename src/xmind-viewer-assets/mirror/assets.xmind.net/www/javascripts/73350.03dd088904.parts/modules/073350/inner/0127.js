export default [
    function (e, t, i) {
        'use strict';
        (i.r(t),
            function (e) {
                (i.d(t, 'viewType', function () {
                    return o;
                }),
                    i.d(t, 'events', function () {
                        return a;
                    }),
                    i.d(t, 'eventHandlers', function () {
                        return s;
                    }));
                var n = i(0),
                    r = i(11);
                const o = n.VIEW_TYPE.SVG,
                    a = {
                        click: 'onClick',
                        dblclick: 'onDblClick',
                        wheel: 'onMouseWheel',
                        mouseup: 'onMouseup',
                        mousedown: 'onMouseDown',
                        touchmove: 'onTouchMove',
                        contextmenu: 'onContextMenu',
                        touchend: 'onTouchEnd',
                        press: 'onPress',
                        pressup: 'onPressUp',
                        doubletap: 'onDoubleTap',
                        pinchstart: 'onPinchStart',
                        pinchmove: 'onPinch',
                        pinchend: 'onPinchEnd',
                    },
                    s = {
                        onClick() {
                            (this.clickCount++,
                                setTimeout(() => {
                                    this.clickCount = 0;
                                }, 500));
                        },
                        onDblClick(e) {
                            e.target === this.svg.node &&
                                (2 === this.clickCount
                                    ? ((this.clickCount = 0),
                                      this.createFloatingTopic({
                                          x: e.clientX,
                                          y: e.clientY,
                                      }))
                                    : (this.clickCount = 0));
                        },
                        onDoubleTap(e) {
                            this._context.isMobilePlatform() ||
                                (e.target === this.svg.node &&
                                    this.createFloatingTopic({
                                        x: e.center.x,
                                        y: e.center.y,
                                    }));
                        },
                        onMouseWheel(e) {
                            if (
                                (e.stopPropagation(),
                                this.isEnableScaleByWheel(e))
                            )
                                return (
                                    e.preventDefault(),
                                    this.setScaleByWheel(e)
                                );
                        },
                        onMouseDown(t) {
                            if (t.currentTarget !== this.el) return;
                            const i = this.getModule(
                                n.MODULE_NAME.MOVE_VIEW_PORT
                            );
                            if ('skip' !== e.env.SELECT_BOX) {
                                if (
                                    (3 === t.which &&
                                        i &&
                                        i.onDragViewPort(t, this, (e) => {
                                            this._dispatchContextMenu(e);
                                        }),
                                    1 === t.which)
                                ) {
                                    if (r.a.isMac && t.ctrlKey)
                                        return this._dispatchContextMenu(t);
                                    if (this.getContext().isBrowniePlatform())
                                        return;
                                    const e = t.shiftKey,
                                        i = this.getModule(
                                            n.MODULE_NAME.MOUSE_BOX_SELECT
                                        );
                                    r.a.isFunctionEnabled(t) || e
                                        ? i &&
                                          i.start(
                                              {
                                                  x: t.clientX,
                                                  y: t.clientY,
                                              },
                                              !0
                                          )
                                        : i &&
                                          i.start({
                                              x: t.clientX,
                                              y: t.clientY,
                                          });
                                }
                            } else
                                i &&
                                    i.onDragViewPort(t, this, (e) => {
                                        this._dispatchContextMenu(e);
                                    });
                        },
                        onTouchMove(e) {
                            this._context.isMobileAppPlatform() ||
                                (this._pinchStartScale &&
                                    (e.preventDefault(),
                                    e.stopPropagation(),
                                    e.stopImmediatePropagation()));
                        },
                        onTouchEnd() {
                            this._context.isMobileAppPlatform() ||
                                ((this._pinchStartScale = null),
                                this._context.setScrollEnable());
                        },
                        onPress(e) {
                            e.target === this.svg.node &&
                                this._pressContextMenuCheckHandle();
                        },
                        onPinchStart() {
                            this._context.isMobileAppPlatform() ||
                                ((this._pinchStartScale = this.currentScale),
                                this._context.setScrollDisable());
                        },
                        onPinch(e) {
                            if (this._context.isMobileAppPlatform()) return;
                            if (!this._pinchStartScale) return;
                            e.preventDefault();
                            this.setScale(
                                100 * this._pinchStartScale * e.scale * 0.98
                            );
                        },
                        onPinchEnd() {
                            this._context.isMobileAppPlatform() ||
                                ((this._pinchStartScale = null),
                                this._context.setScrollEnable());
                        },
                        onContextMenu(e) {
                            (e.preventDefault(),
                                100 !== e.detail &&
                                    e.stopImmediatePropagation());
                        },
                        onPressUp(e) {
                            (e.stopPropagation(), this._dispatchContextMenu(e));
                        },
                    };
            }.call(this, i(45)));
    },
];
