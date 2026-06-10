export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return p;
        });
        var n = i(0),
            r = i(9);
        const o = {
                lt: 'rb',
                lm: 'rm',
                lb: 'rt',
                ct: 'cb',
                cb: 'ct',
                rt: 'lb',
                rm: 'lm',
                rb: 'lt',
            },
            a = {
                lt: 'nwse-resize',
                lb: 'nesw-resize',
                rt: 'nesw-resize',
                rb: 'nwse-resize',
            },
            s = { l: -1, c: 0, r: 1, t: -1, m: 0, b: 1 };
        class l {
            constructor() {
                ((this._cdd = [0, 0]),
                    (this._resizeBoxView = null),
                    (this._realTimeSize = { width: 0, height: 0 }));
            }
            init(e) {
                ((this._resizeBoxView = e),
                    (this._resizeMinWidth = this._resizeBoxView.refView
                        .getResizeMinWidth
                        ? this._resizeBoxView.refView.getResizeMinWidth()
                        : 0));
                let t,
                    i,
                    l,
                    c = 0,
                    d = null,
                    f = null,
                    h = e.width,
                    p = e.height;
                const T = (r) => (s, T) => {
                        if (
                            ((l = e.callService(
                                n.SERVICE_NAME.GET_VIEW_PORT_COVER
                            )),
                            l.show(),
                            l.css('cursor', a[r]),
                            (this._cdd = r),
                            (d = this._getCornerPosition(r)),
                            (f = this._getCornerPosition(o[r])),
                            (c = this._distance(d, f)),
                            (h = e.width),
                            (p = e.height),
                            (this._realTimeSize = {
                                width: e.width,
                                height: e.height,
                            }),
                            this._showAvatar(),
                            e.rotation)
                        ) {
                            const n = (e.rotation / 180) * Math.PI;
                            ((t = Math.cos(n)), (i = Math.sin(n)));
                        }
                    },
                    u = (n, o) => {
                        let a, l, T;
                        if (e.rotation) {
                            const e = n.deltaX * t + n.deltaY * i,
                                r = -n.deltaX * i + n.deltaY * t;
                            ((a = Object.assign({}, d)),
                                (a.x += e),
                                (a.y += r));
                        } else a = n;
                        if (this._resizeBoxView.lockRatio) {
                            const e = this._distance(a, f) / c;
                            ((l = Math.ceil(h * e)), (T = Math.ceil(p * e)));
                        } else
                            ((l = Math.max(
                                this._resizeMinWidth,
                                s[this._cdd[0]] * (a.x - f.x) || h
                            )),
                                (T = Math.max(
                                    this._resizeMinWidth,
                                    s[this._cdd[1]] * (a.y - f.y) || p
                                )));
                        if (Math.max(l, T) > r.a.IMAGE_MAX_SIZE) {
                            const e = l / T;
                            l > T
                                ? ((l = r.a.IMAGE_MAX_SIZE), (T = l / e))
                                : ((T = r.a.IMAGE_MAX_SIZE), (l = T * e));
                        }
                        const u = l - h,
                            g = T - p,
                            Q = this._getShrinked(d, u, g),
                            m = (Q.x + f.x) / 2 - l / 2,
                            b = (Q.y + f.y) / 2 - T / 2;
                        ((this._realTimeSize = {
                            width: l,
                            height: T,
                        }),
                            this._setAvatarSize(
                                Object.assign(
                                    Object.assign({}, this._realTimeSize),
                                    { x: m, y: b }
                                )
                            ));
                    },
                    g = (t, i) => {
                        (l.hide(),
                            l.css('cursor', ''),
                            e.trigger('resize', this._realTimeSize),
                            this._hideAvatar());
                    },
                    Q = e.getModule(n.MODULE_NAME.SVG_DRAGGABLE);
                Q &&
                    Object.keys(e.anchors).forEach((t) => {
                        Q.draggable(e.anchors[t])
                            .dragStart(T(t))
                            .dragMove(u)
                            .dragEnd(g);
                    });
            }
            _distance(e, t) {
                return Math.max(
                    Math.max(
                        this._resizeMinWidth,
                        s[this._cdd[0]] * (e.x - t.x)
                    ),
                    Math.max(
                        this._resizeMinWidth,
                        s[this._cdd[1]] * (e.y - t.y)
                    )
                );
            }
            _getShrinked(e, t, i) {
                return {
                    x: e.x + s[this._cdd[0]] * t,
                    y: e.y + s[this._cdd[1]] * i,
                };
            }
            _getCornerPosition(e) {
                const t = this._resizeBoxView.width,
                    i = this._resizeBoxView.height,
                    n = {
                        l: 0,
                        m: i / 2,
                        r: t,
                        t: 0,
                        c: t / 2,
                        b: i,
                    };
                return { x: n[e[0]], y: n[e[1]] };
            }
            _showAvatar() {
                this._resizeBoxView.showAvatar();
            }
            _hideAvatar() {
                this._resizeBoxView.hideAvatar();
            }
            _setAvatarSize({ width: e, height: t, x: i, y: n }) {
                this._resizeBoxView.setAvatarSize({
                    width: e,
                    height: t,
                    x: i,
                    y: n,
                });
            }
        }
        var c = i(18),
            d = i(21),
            f = i(79),
            h = i(78);
        class p extends d.a {
            constructor(e) {
                (super(),
                    (this.isActive = !1),
                    (this.width = 0),
                    (this.height = 0),
                    (this.x = 0),
                    (this.y = 0),
                    (this.lockRatio = !0),
                    (this.refView = e),
                    this.initOriginImage(),
                    (this.figure = c.a.createFigure(this)),
                    (this.anchors = this.figure.renderWorker.anchors));
            }
            get type() {
                return n.VIEW_TYPE.RESIZE_BOX;
            }
            get figureType() {
                return n.FIGURE_TYPE.RESIZE_BOX;
            }
            get _style() {
                return {
                    fullBox: {
                        'stroke-width': '2',
                        stroke: '#2ebdff',
                    },
                    fullBox__show: {
                        fill: '#2ebdff',
                        'fill-opacity': '0.3',
                    },
                    fullBox__active: { fill: 'none' },
                    anchor: {
                        stroke: '#2ebdff',
                        'stroke-width': 2,
                        opacity: '0',
                    },
                    anchor__active: {
                        fill: '#FFF',
                        stroke: '#2ebdff',
                        opacity: '1',
                    },
                    avatarImage: { opacity: '0.5' },
                };
            }
            initOriginImage() {
                this.refView instanceof h.a
                    ? (this.originImage = this.refView.image)
                    : this.refView instanceof f.a &&
                      (this.originImage =
                          this.refView.s$mathJaxOutPutNestedSVG);
            }
            size(e, t) {
                ((this.width = e),
                    (this.height = t),
                    this.figure.setSize({ width: e, height: t }));
            }
            translate(e, t) {
                ((this.x = e),
                    (this.y = t),
                    this.figure.setPosition({ x: e, y: t }));
            }
            show() {
                this.figure.setHover();
            }
            active() {
                ((this.isActive = !0), this.figure.setActive());
            }
            hide() {
                ((this.isActive = !1), this.figure.setHide());
            }
            showAvatar() {
                this.figure.setAvatarDisplay(!0);
            }
            hideAvatar() {
                this.figure.setAvatarDisplay(!1);
            }
            setAvatarSize(e) {
                this.figure.setAvatarSize(e);
            }
            setLockRatio(e) {
                ((this.lockRatio = e), this.figure.setLockRatio(e));
            }
            remove() {
                return (
                    this.stopListening(),
                    this.figure.dispose(),
                    this.parent(null),
                    this
                );
            }
            initSVGDraggable() {
                new l().init(this);
            }
        }
    },
];
