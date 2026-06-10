export default [
    function (e, t, i) {
        'use strict';
        (function (e) {
            i.d(t, 'a', function () {
                return T;
            });
            var n = i(1),
                r = i(4),
                o = i(0),
                a = i(43),
                s = i(15),
                l = i(6),
                c = i.n(l),
                d = i(121);
            const f = '#d1d1d1',
                h = 160,
                p = '#2b2f33';
            class T extends a.a {
                constructor(e, t) {
                    (super(),
                        (this.bounds = {
                            x: 0,
                            y: 0,
                            width: 0,
                            height: 0,
                        }),
                        (this._cachedBounds = {
                            x: 0,
                            y: 0,
                            width: 0,
                            height: 0,
                        }),
                        (this.legendMarkerList = []),
                        (this.model = t),
                        this.parent(e),
                        (this.legend = e.model.getLegendModel()),
                        this.initSVGStructure(),
                        this.initEventsListener(),
                        this.render(),
                        new d.a().init(this),
                        this.setLegendPosition());
                }
                get type() {
                    return o.VIEW_TYPE.LEGEND;
                }
                get _style() {
                    return {
                        legend: { cursor: '-webkit-grab' },
                        legend_dragging: {
                            cursor: '-webkit-grabbing',
                        },
                        rect: {
                            stroke: f,
                            'stroke-width': 1,
                            fill: 'rgba(255, 255, 255, 0.5)',
                        },
                        title: {
                            'font-weight': 500,
                            fill: p,
                            'font-size': 16,
                        },
                        emptyStateSignText: {
                            fill: 'rgb(173, 185, 185)',
                            'font-size': 12,
                        },
                    };
                }
                initSVGStructure() {
                    ((this.s$svg = new r.a.G().data('name', 'legend')),
                        this.style(this.s$svg, 'legend'),
                        (this.s$rectSVG = new r.a.Rect()
                            .width(h)
                            .height(80)
                            .radius(6)),
                        this.style(this.s$rectSVG, 'rect'),
                        this.s$svg.add(this.s$rectSVG),
                        (this.s$titleSVG = new r.a.Text().text(
                            this.getContext().getTranslatedText('LEGEND_TITLE')
                        )),
                        this.style(this.s$titleSVG, 'title'),
                        this.s$svg.add(this.s$titleSVG),
                        (this.s$hrLine = new r.a.Path().stroke(f)),
                        this.s$svg.add(this.s$hrLine),
                        (this.s$markerListContainer = new r.a.G().x(15).y(41)),
                        this.s$svg.add(this.s$markerListContainer),
                        (this._s$emptyStateSign = new r.a.G()),
                        (this._s$emptyStateSignImage = new r.a.G()),
                        (this._s$emptyStateSignImage.node.innerHTML =
                            '\n<g id="empty-state-sign" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n  <path d="M135.236666,42 L127.798458,42 C125.338452,33.9764725 115.883824,28 104.595749,28 C100.990268,28 97.5718351,28.6097218 94.5086331,29.7011215" stroke="#E1E3E5" opacity="0.8" stroke-linecap="round"></path>\n  <path d="M42.6495622,31.1112073 C38.9149799,29.1470252 34.4119777,28 29.5645937,28 C18.50262,28 9.23410224,33.9734239 6.79845825,42 L1.10134124e-13,42" stroke="#E1E3E5" opacity="0.8" stroke-linecap="round"></path>\n  <path d="M100.5,36.6924782 C94.8897955,27.9973909 83.0079757,22 69.2571763,22 C52.8547001,22 39.1115248,30.5334627 35.5,42" stroke="#ADB9B9" stroke-linecap="round" stroke-linejoin="round"></path>\n  <path d="M67.7984582,1.70848514 L67.7984582,13.6942564 L67.7984582,21.5 C67.7984582,21.2238576 67.5746006,21 67.2984582,21 C67.0223159,21 66.7984582,21.2238576 66.7984582,21.5 L66.7984582,0.5 C66.7984582,0.776142375 67.0223159,1 67.2984582,1 C67.5746006,1 67.7984582,0.776142375 67.7984582,0.5 L67.7984582,1.70848514 C69.7913973,0.569495047 71.9045455,-3.90798505e-14 74.1379028,-3.90798505e-14 C77.4879388,-3.90798505e-14 80.6474454,1.0481317 82.4108922,1.0481317 C83.5865234,1.0481317 84.7950745,0.869452004 86.0365455,0.512092616 L86.0365455,12.5204627 C84.8150239,12.8627562 83.6064729,13.033903 82.4108922,13.033903 C80.6175213,13.033903 77.3596926,12.0083701 74.1379028,12.0083701 C71.990043,12.0083701 69.8768948,12.5703322 67.7984582,13.6942564 L67.7984582,21.5 C67.7984582,21.7761424 67.5746006,22 67.2984582,22 C67.0223159,22 66.7984582,21.7761424 66.7984582,21.5 L66.7984582,0.5 C66.7984582,0.223857625 67.0223159,0 67.2984582,0 C67.5746006,0 67.7984582,0.223857625 67.7984582,0.5 L67.7984582,1.70848514 Z" fill="#ADB9B9" fill-rule="nonzero"></path>\n  <g transform="translate(25.583011, 15.180465) rotate(-27.000000) translate(-25.583011, -15.180465) translate(20.083011, 7.180465)">\n      <path d="M5.72647419,15.9740172 C9.05980752,11.4131747 10.7264742,8.16515912 10.7264742,6.22997054 C10.7264742,3.32718768 8.48789794,0.974017226 5.72647419,0.974017226 C2.96505044,0.974017226 0.726474189,3.32718768 0.726474189,6.22997054 C0.726474189,8.16515912 2.39314086,11.4131747 5.72647419,15.9740172 Z" id="椭圆形" stroke="#E1E3E5" opacity="0.8"></path>\n      <circle fill="#E1E3E5" opacity="0.800688244" cx="5.97044391" cy="5.79251042" r="2"></circle>\n  </g>\n  <g transform="translate(111.000000, 17.000000) rotate(20.000000) translate(-111.000000, -17.000000) translate(104.000000, 10.000000)" opacity="0.797409784">\n      <circle stroke="#E1E3E5" cx="7" cy="7" r="7"></circle>\n      <circle fill="#E1E3E5" cx="4.66666667" cy="6.22222222" r="1"></circle>\n      <circle fill="#E1E3E5" cx="9.33333333" cy="6.22222222" r="1"></circle>\n      <path d="M3.11111111,9.48189232 C4.14814815,11.0027267 5.44444444,11.763144 7,11.763144 C8.55555556,11.763144 9.85185185,11.0027267 10.8888889,9.48189232 L10.1111111,9.59168186 C8.83553899,9.25593372 7.79850195,9.08805965 7,9.08805965 C6.20149805,9.08805965 5.16446101,9.25593372 3.88888889,9.59168186 L3.11111111,9.48189232 Z" id="路径-3" fill="#E1E3E5"></path>\n      <path d="M8.55555556,5.22924478 C8.92084426,4.68416554 9.35130275,4.30090791 9.84693101,4.0794719 C10.5903734,3.74731787 11.4685239,3.89966426 11.704335,4.15396383 C11.8280514,4.28738013 11.9124484,4.70472352 11.4809625,4.72438356 C11.09001,4.74219676 10.6287864,4.55906683 10.0358687,4.59779725 C9.5521046,4.62939756 9.05866689,4.83988007 8.55555556,5.22924478 Z" fill="#E1E3E5" transform="translate(10.179897, 4.559067) scale(-1, 1) translate(-10.179897, -4.559067) "></path>\n      <path d="M2.33333333,5.25762849 C2.69862204,4.71254925 3.12908052,4.32929162 3.62470879,4.10785561 C4.36815119,3.77570158 5.24630167,3.92804797 5.48211274,4.18234754 C5.6058292,4.31576384 5.6902262,4.73310723 5.25874023,4.75276727 C4.86778774,4.77058047 4.40656416,4.58745055 3.81364647,4.62618096 C3.32988238,4.65778127 2.83644467,4.86826378 2.33333333,5.25762849 Z" fill="#E1E3E5"></path>\n  </g>\n</g>\n'),
                        (this._s$emptyStateSignText = new r.a.Text().text(
                            this.getContext().getTranslatedText(
                                'LEGEND_INSERT_MARKER_INTO_TOPIC'
                            )
                        )),
                        this._s$emptyStateSign
                            .add(this._s$emptyStateSignImage)
                            .add(this._s$emptyStateSignText),
                        this.s$svg.add(this._s$emptyStateSign),
                        this.style(
                            this._s$emptyStateSignText,
                            'emptyStateSignText'
                        ),
                        this._s$emptyStateSign.hide());
                    const e = this.editDomain();
                    (e.container.add(this.s$svg),
                        (e.legendView = this),
                        this.setElement(this.s$svg.node));
                }
                initEventsListener() {
                    const t = this.legend.modelEvents;
                    'readonly' !== e.env.SB_MODE &&
                        (this.listenTo(
                            this.legend,
                            t.liveMarkerListChanged,
                            this.render
                        ),
                        this.listenTo(
                            this.legend,
                            t.legendMarkerDescChanged,
                            this.render
                        ),
                        this.listenTo(
                            this.legend,
                            'change:visibility',
                            this.onVisibilityChange
                        ),
                        this.listenTo(
                            this.legend,
                            'change:position',
                            this.setLegendPosition
                        ));
                }
                parent(e) {
                    return void 0 === e ? super.parent() : super.parent(e);
                }
                _updateLegendMarkerList() {
                    const { markerModule: e } = Object(n.getInjectModule)(
                        o.MODULE_NAME.SNOWBIRD
                    );
                    this.legendMarkerList = [
                        ...new Set(this.legend.liveMarkerList),
                    ].sort((t, i) => e.indexOf(t) - e.indexOf(i));
                }
                _createMarkerListSVG() {
                    let e, t;
                    if (
                        (this.s$markerListContainer.clear(),
                        this.legendMarkerList.length)
                    ) {
                        this._s$emptyStateSign.hide();
                        const i = [];
                        this.legendMarkerList.forEach((e, t) => {
                            const n = new u(e, this, t);
                            (i.push(n.bounds),
                                n.move(0, 34 * t),
                                this.s$markerListContainer.add(n.getSvg()));
                        });
                        const n = Math.max(...i.map((e) => e.width)),
                            r = i.reduce((e, t) => e + t.height, 0) - 14;
                        ((e = Math.max(n + 30, h)),
                            (t = Math.max(r + 41 + 18, 80)));
                    } else {
                        (this._s$emptyStateSign.show(),
                            this._s$emptyStateSign.move(12, 66),
                            this._s$emptyStateSignText.y(56));
                        const i = this._s$emptyStateSignText.length();
                        (this._s$emptyStateSignText.x((136 - i) / 2),
                            (e = h),
                            (t = 154));
                    }
                    (this.setLegendWidth(e),
                        this.setLegendHeight(t),
                        this._updateBounds({
                            width: e,
                            height: t,
                        }));
                }
                _updateBounds(e) {
                    let t;
                    ((t =
                        'visible' !== this.legend.get('visibility')
                            ? { x: 0, y: 0, width: 0, height: 0 }
                            : Object.assign(Object.assign({}, this.bounds), e)),
                        c.a.isEqual(t, this.bounds) ||
                            ((this.bounds = t),
                            this.trigger('change:bounds', this.bounds)));
                }
                render() {
                    return (
                        this._updateLegendMarkerList(),
                        this._createMarkerListSVG(),
                        'visible' !== this.legend.get('visibility') &&
                            this.$el.css('display', 'none'),
                        this
                    );
                }
                setLegendWidth(e = 160) {
                    (this.s$rectSVG.width(e),
                        this.s$hrLine.attr('d', `M 0 30 L ${e} 30`));
                    const t = this.s$titleSVG.length();
                    this.s$titleSVG.x((e - t) / 2);
                }
                setLegendHeight(e = 80) {
                    this.s$rectSVG.height(e);
                }
                getLegendDefaultPosition() {
                    const e = this.editDomain(),
                        t = e.getCanvasControl().getVisibleAreaBounds(),
                        i = t.x + 20,
                        n = t.y + 20;
                    return e
                        .getCoordinateTransfer()
                        .viewportToMindMap({ x: i, y: n });
                }
                setLegendPosition() {
                    let e = this.legend.get('position');
                    (s.j(e) || (e = this.getLegendDefaultPosition()),
                        this.s$svg.x(e.x).y(e.y),
                        this._updateBounds(e));
                }
                onVisibilityChange() {
                    const e = 'visible' === this.legend.get('visibility');
                    (this.$el.css('display', e ? '' : 'none'),
                        e
                            ? (this.render(), this.setLegendPosition())
                            : this._updateBounds());
                }
            }
            class u extends a.a {
                constructor(e, t, i) {
                    var r;
                    (super(),
                        (this.bounds = {
                            x: 0,
                            y: 0,
                            width: 0,
                            height: 0,
                        }),
                        this.parent(t),
                        (this.markerId = e),
                        (this.index = i),
                        (this.markerModule = Object(n.getInjectModule)(
                            o.MODULE_NAME.SNOWBIRD
                        ).markerModule),
                        (this._userMarkerDescMap =
                            t.legend.get('markers') || {}),
                        (this._markerDesc =
                            (this._userMarkerDescMap[e] &&
                                this._userMarkerDescMap[e].name) ||
                            (null ===
                                (r = this.markerModule.getMarkerInfoById(e)) ||
                            void 0 === r
                                ? void 0
                                : r.name) ||
                            e),
                        this.initSVGStructure(),
                        this._calcBounds());
                }
                get type() {
                    return o.VIEW_TYPE.LEGENDMARKERLIST;
                }
                async initSVGStructure() {
                    const { markerId: e } = this;
                    ((this.s$container = new r.a.G()),
                        (this.s$markerImage = new r.a.Image()
                            .width(20)
                            .height(20)));
                    const t = this.markerModule.getMarkerInfoById(e);
                    let i;
                    ((i = (null == t ? void 0 : t.isUserMarker)
                        ? await this.config(o.CONFIG.XAP_LOADER)(t.resource)
                        : this.getContext().getFileRealResource(
                              null == t ? void 0 : t.resource
                          )),
                        this.s$markerImage.load(i),
                        this.s$container.add(this.s$markerImage),
                        (this.s$markerDescText = new r.a.Text()),
                        this.s$markerDescText.text(
                            this._wrapTextWithEllipsis(this._markerDesc)
                        ),
                        this.s$markerDescText.attr({
                            fill: p,
                            x: 34,
                            y: -3,
                            'font-size': 14,
                            'font-family': o.COMMON_FONT_FAMILY,
                        }),
                        this.s$container.add(this.s$markerDescText),
                        this.setElement(this.s$container.node));
                }
                parent(e) {
                    return void 0 === e ? super.parent() : super.parent(e);
                }
                _calcBounds() {
                    const e =
                        34 +
                        Math.min(this._getTextWidth(this._markerDesc), 200);
                    this.bounds = Object.assign(
                        Object.assign({}, this.bounds),
                        { width: e, height: 34 }
                    );
                }
                _wrapTextWithEllipsis(e) {
                    return Object(n.wrapTextWithEllipsis)(
                        e,
                        {
                            fontSize: 14,
                            fontFamily: o.COMMON_FONT_FAMILY,
                        },
                        200
                    );
                }
                _getTextWidth(e) {
                    return Object(n.getTextSize)(e, {
                        fontSize: 14,
                        fontFamily: o.COMMON_FONT_FAMILY,
                    }).width;
                }
                move(e, t) {
                    this.s$container.translate(e, t);
                }
                getSvg() {
                    return this.s$container;
                }
                getTextClientStyle() {
                    return { fontSize: 14 };
                }
                getTextClientBounds() {
                    return this.s$markerDescText.node.getBoundingClientRect();
                }
                getTextRealPosition() {
                    var e, t;
                    const i =
                        null !==
                            (t =
                                null === (e = this.parent()) || void 0 === e
                                    ? void 0
                                    : e.bounds) && void 0 !== t
                            ? t
                            : { x: 0, y: 0 };
                    return {
                        x: i.x + 15 + 20 + 14,
                        y: i.y + 41 + 34 * this.index,
                    };
                }
                saveEdit(e) {
                    var t;
                    e !== this._markerDesc &&
                        (null === (t = this.parent()) ||
                            void 0 === t ||
                            t.legend.setUserMarkerDescription(
                                this.markerId,
                                e
                            ));
                }
                getEditContent() {
                    return this._markerDesc;
                }
            }
        }).call(this, i(45));
    },
];
