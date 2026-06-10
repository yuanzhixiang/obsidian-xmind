export default [
    function (e, t, i) {
        'use strict';
        var n = i(12),
            r = i.n(n),
            o = i(0),
            a = i(4),
            s = i(50),
            l = i(3),
            c = i(27),
            d = i(1),
            f = i(17);
        class h {
            constructor() {
                ((this.arrowPathView = null), (this.arrowSelector = null));
            }
            export(e, t) {
                return (
                    (this.arrowPathView = e),
                    (this.arrowSelector = t),
                    this.generateArrowExporterInfo().map((e) => {
                        const { $elem: t, styleKey: i, styleValue: n } = e,
                            r = this.getArrowTransformAttrs(i, n);
                        return (t.attr('transform', r), t);
                    })
                );
            }
            generateArrowExporterInfo() {
                var e, t;
                return [
                    Object.assign(
                        Object.assign(
                            {},
                            null === (e = this.arrowSelector) || void 0 === e
                                ? void 0
                                : e.getBeginArrowDomInfo()
                        ),
                        { styleKey: o.STYLE_KEYS.ARROW_BEGIN_CLASS }
                    ),
                    Object.assign(
                        Object.assign(
                            {},
                            null === (t = this.arrowSelector) || void 0 === t
                                ? void 0
                                : t.getEndArrowDomInfo()
                        ),
                        { styleKey: o.STYLE_KEYS.ARROW_END_CLASS }
                    ),
                ]
                    .filter((e) => e.arrowClass !== o.ARROW_CLASS.NONE)
                    .map((e) => {
                        const t = r()(e.s$SVG.node.innerHTML);
                        return (
                            t.attr({
                                stroke: e.s$SVG.attr('stroke'),
                                fill: e.s$SVG.attr('fill'),
                            }),
                            {
                                $elem: t,
                                styleValue: e.arrowClass,
                                styleKey: e.styleKey,
                            }
                        );
                    });
            }
            getArrowRef(e) {
                var t, i;
                let n;
                return (
                    (n =
                        e === o.STYLE_KEYS.ARROW_BEGIN_CLASS
                            ? null === (t = this.arrowSelector) || void 0 === t
                                ? void 0
                                : t.getBeginArrowDomInfo().s$SVG
                            : null === (i = this.arrowSelector) || void 0 === i
                              ? void 0
                              : i.getEndArrowDomInfo().s$SVG),
                    {
                        refX: parseInt(n.attr('refX')),
                        refY: parseInt(n.attr('refY')),
                    }
                );
            }
            getArrowTransformAttrs(e, t) {
                const i = this.getArrowScale(),
                    n = d.ArrowSelector.getArrowStaticInfo(t).arrowCenter,
                    r = `translate(${n} ${n}) scale(${i}) translate(-${n} -${n})`,
                    o = this.getRotateStartPoint(e),
                    a = this.getRotateTargetPoint(e),
                    s = `rotate(${(180 * Math.atan2(a.y - o.y, a.x - o.x)) / Math.PI} ${n} ${n})`;
                return `${this.getTranslateFragment(e, t)} ${s} ${r}`;
            }
            getTranslateFragment(e, t) {
                const { refX: i, refY: n } = this.getArrowRef(e),
                    r = this.getArrowRealPosition(e);
                return `translate(${r.x - i} ${r.y - n})`;
            }
            getRotateStartPoint(e) {
                return this.getArrowRealPosition(e);
            }
            getRotateTargetPoint(e) {
                return this.getArrowTargetRealPosition(e);
            }
        }
        const p = new (class extends h {
                constructor() {
                    (super(...arguments), (this.arrowPathView = null));
                }
                getArrowRealPosition(e) {
                    const t = this.arrowPathView;
                    switch (e) {
                        case o.STYLE_KEYS.ARROW_BEGIN_CLASS:
                            return t.posInfo.insectPoint1;
                        case o.STYLE_KEYS.ARROW_END_CLASS:
                            return t.posInfo.insectPoint2;
                    }
                }
                getArrowTargetRealPosition(e) {
                    const t = this.arrowPathView;
                    switch (e) {
                        case o.STYLE_KEYS.ARROW_BEGIN_CLASS:
                            return t.posInfo.controlPoint1;
                        case o.STYLE_KEYS.ARROW_END_CLASS:
                            return t.posInfo.controlPoint2;
                    }
                }
                getArrowScale() {
                    return this.arrowPathView.figure.lineWidth;
                }
                getRotateStartPoint(e) {
                    switch (e) {
                        case o.STYLE_KEYS.ARROW_BEGIN_CLASS:
                            return this.getArrowRealPosition(e);
                        case o.STYLE_KEYS.ARROW_END_CLASS:
                            return this.getArrowTargetRealPosition(e);
                    }
                }
                getRotateTargetPoint(e) {
                    switch (e) {
                        case o.STYLE_KEYS.ARROW_BEGIN_CLASS:
                            return this.getArrowTargetRealPosition(e);
                        case o.STYLE_KEYS.ARROW_END_CLASS:
                            return this.getArrowRealPosition(e);
                    }
                }
            })(),
            T = new (class extends h {
                constructor() {
                    (super(...arguments), (this.arrowPathView = null));
                }
                getArrowRealPosition(e) {
                    const t = this.arrowPathView;
                    switch (e) {
                        case o.STYLE_KEYS.ARROW_BEGIN_CLASS:
                            return t.figure.startPoint;
                        case o.STYLE_KEYS.ARROW_END_CLASS:
                            return t.figure.endPoint;
                    }
                }
                getChildTargetOrientation() {
                    var e;
                    const t =
                            null === (e = this.arrowPathView) || void 0 === e
                                ? void 0
                                : e.parent(),
                        i = t.parent();
                    return i
                        .getStructureObject()
                        .getChildTargetOrientation(i, t.branchIndex());
                }
                getArrowTargetRealPosition(e) {
                    const t = 10,
                        i = Object.assign({}, this.getArrowRealPosition(e)),
                        n = this.getChildTargetOrientation();
                    if (e === o.STYLE_KEYS.ARROW_BEGIN_CLASS)
                        switch (n) {
                            case o.DIRECTION.RIGHT:
                                i.x += t;
                                break;
                            case o.DIRECTION.LEFT:
                                i.x -= t;
                        }
                    else
                        switch (n) {
                            case o.DIRECTION.RIGHT:
                                i.x -= t;
                                break;
                            case o.DIRECTION.LEFT:
                                i.x += t;
                                break;
                            case o.DIRECTION.DOWN:
                                i.y -= t;
                                break;
                            case o.DIRECTION.UP:
                                i.y += t;
                        }
                    return i;
                }
                getTranslateFragment(e) {
                    const { refX: t, refY: i } = this.getArrowRef(e),
                        n = this.getArrowRealPosition(e);
                    let r = 0,
                        a = 0;
                    const s = this.getChildTargetOrientation(),
                        l = this.arrowPathView.figure.lineWidth;
                    ((s !== o.DIRECTION.UP && s !== o.DIRECTION.DOWN) ||
                        ((r += l), (a += l)),
                        e === o.STYLE_KEYS.ARROW_BEGIN_CLASS && (r -= l));
                    return `translate(${n.x - t - r} ${n.y - i - a})`;
                }
                getArrowScale() {
                    return this.arrowPathView.figure.lineWidth;
                }
            })(),
            u = new (class extends h {
                constructor() {
                    (super(...arguments), (this.arrowPathView = null));
                }
                getArrowRealPosition() {
                    return this.arrowPathView.figure.startPosition;
                }
                getArrowTargetRealPosition() {
                    const e = this.arrowPathView.parent(),
                        t = Object.assign({}, e.getRealPosition());
                    return (
                        this.isRangeGrowToDown()
                            ? (t.y += e.topicView.bounds.height / 2)
                            : (t.y -= e.topicView.bounds.height / 2),
                        t
                    );
                }
                getTranslateFragment(e, t) {
                    const { refX: i, refY: n } = this.getArrowRef(e),
                        r = this.getArrowRealPosition();
                    let a = 0,
                        s = 0;
                    const l = this.arrowPathView.figure.styleWidth;
                    switch (t) {
                        case o.ARROW_CLASS.HERRINGBONE:
                        case o.ARROW_CLASS.DIAMOND:
                        case o.ARROW_CLASS.DOUBLEARROW:
                        case o.ARROW_CLASS.SQUARE:
                        case o.ARROW_CLASS.TRIANGLE:
                        case o.ARROW_CLASS.DOT:
                            a = this.isDirectionToRight() ? -0.4 * l : 0.4 * l;
                            break;
                        case o.ARROW_CLASS.ANTITRIANGLE:
                        case o.ARROW_CLASS.SPEARHEAD:
                            a = this.isDirectionToRight() ? -0.3 * l : 0.3 * l;
                            break;
                        case o.ARROW_CLASS.ATTACHED:
                            (this.isDirectionToRight(),
                                (a = -0.2 * l),
                                (s = this.isRangeGrowToDown()
                                    ? 3 * l
                                    : -3 * l));
                            break;
                        case o.ARROW_CLASS.HOOK:
                            a = this.isDirectionToRight() ? -2.6 * l : 2.6 * l;
                    }
                    return `translate(${r.x - i - a} ${r.y - n - s})`;
                }
                getArrowScale() {
                    return this.arrowPathView.figure.styleWidth;
                }
                isRangeGrowToDown() {
                    return (
                        this.arrowPathView
                            .parent()
                            .getStructureObject()
                            .getRangeGrowthDirection() === o.DIRECTION.DOWN
                    );
                }
                isDirectionToRight() {
                    return (
                        this.arrowPathView.parent().getStructureObject()
                            .direction === o.DIRECTION.RIGHT
                    );
                }
            })();
        var g = i(60),
            Q = i(9),
            m = i(88),
            b = i(29),
            C = i(55);
        const L = 268435456,
            y = 'full',
            M = 'inview',
            A = 'PNG',
            v = 'SVG',
            E = 'PDF',
            _ = 'SKELETON',
            O = {
                targetBranch: null,
                targetSVG: null,
                hideCollapseOpen: !1,
                hideCollapseClose: !0,
                area: y,
                hidpi: 96,
                scale: 1,
                width: null,
                height: null,
                maxScale: null,
                padding: 10,
                format: A,
                wbPrintMode: !1,
                noBackground: null,
                skipFont: !0,
                timeout: 1e4,
            };
        t.a = new (class {
            export(e, t = {}) {
                var i;
                (t = this._getMergeDefaultOptions(t)).paddingBottom =
                    null !== (i = t.paddingBottom) && void 0 !== i
                        ? i
                        : t.padding;
                const n = e.config(o.CONFIG.LOGGER),
                    r = e.getModule(o.MODULE_NAME.SEMAPHORE);
                let s, l, c, d, f, h, p, T;
                const u = Date.now();
                return new Promise((i, g) => {
                    let Q = !1;
                    (setTimeout(() => {
                        ((Q = !0),
                            g(
                                `Export image:${t.timeout}ms timeout. Current status:${r._log_semaphore()}`
                            ));
                    }, t.timeout),
                        r.onceNotInStatus(
                            [
                                o.UI_STATUS.ANIMATION,
                                o.UI_STATUS.DRAG,
                                o.UI_STATUS.LAYOUT,
                                o.UI_STATUS.LOADING_IMAGE,
                            ],
                            () => {
                                if (Q) return;
                                (({
                                    $newSVG: s,
                                    svgWidth: l,
                                    svgHeight: c,
                                    originLeft: d,
                                    originTop: f,
                                    containerScale: h,
                                    scale: p,
                                    hidpi: T,
                                } = this._getTargetSVGInfo(e, t)),
                                    n.info(
                                        'Export image collect time: ' +
                                            (Date.now() - u)
                                    ));
                                const r = null,
                                    o = this._getFontsInSheet(e, t.skipFont),
                                    g = !!t.targetSVG;
                                t.format === A
                                    ? a.b
                                          .svgAsPngUri(s[0], {
                                              scale: p,
                                              hidpi: T,
                                              skipSheet: r,
                                              fonts: o,
                                              isPureSVG: g,
                                          })
                                          .then(i)
                                    : t.format === v || t.format === E
                                      ? a.b
                                            .newSvg(s[0], {
                                                skipSheet: r,
                                                scale: p,
                                                fonts: o,
                                                isPureSVG: g,
                                            })
                                            .then(i)
                                      : t.format === _ &&
                                        a.b
                                            .newSvgWithoutDoctype(s[0], {
                                                skipSheet: r,
                                                scale: p,
                                                fonts: o,
                                                isPureSVG: g,
                                            })
                                            .then(i);
                            }
                        ));
                })
                    .then(
                        (e) => (
                            n.info('Export image time: ' + (Date.now() - u)),
                            {
                                height: c * p,
                                width: l * p,
                                cx: d * p * h,
                                cy: f * p * h,
                                data: e,
                                scale: p,
                            }
                        )
                    )
                    .catch((t) => {
                        throw (e.config(o.CONFIG.LOGGER).error(t), t);
                    });
            }
            _getMergeDefaultOptions(e) {
                const t = Object.assign({}, O, e);
                return (
                    (t.format !== v && t.format !== E) || (t.area = y),
                    t.targetBranch && (t.area = y),
                    t
                );
            }
            _getTargetSVGInfo(e, t = {}) {
                const i = {
                    $newSVG: null,
                    svgWidth: 0,
                    svgHeight: 0,
                    originLeft: 0,
                    originTop: 0,
                    containerScale: 1,
                    scale: t.scale,
                    hidpi: t.hidpi,
                };
                if (t.targetSVG) i.$newSVG = r()(t.targetSVG.outerHTML);
                else {
                    const n = e.getSVGView(),
                        o = Array.isArray(t.targetBranch)
                            ? [...t.targetBranch]
                            : t.targetBranch
                              ? [t.targetBranch]
                              : [],
                        a = o[0];
                    if (t.area === M) {
                        ((i.svgWidth = n.svg.node.clientWidth),
                            (i.svgHeight = n.svg.node.clientHeight),
                            (i.containerScale = n.getScale() / 100));
                        const e = n.container.transform();
                        ((i.originLeft = e.x / i.containerScale),
                            (i.originTop = e.y / i.containerScale));
                    } else if (t.area === y) {
                        let n;
                        if (a) {
                            const t = this._getRelationshipViewListInBranchTree(
                                    o,
                                    e
                                ).map((e) => {
                                    const t = Object(d.relativePositionFor)(
                                        e.bounds,
                                        a.getRealPosition()
                                    );
                                    return Object.assign(
                                        Object.assign({}, e.bounds),
                                        t
                                    );
                                }),
                                i = [
                                    ...o.reduce(
                                        (e, t) => [
                                            ...e,
                                            ...this._getFullWrappedSummaryBranchViewListInBranchTree(
                                                t
                                            ),
                                        ],
                                        []
                                    ),
                                    ...this._getSummaryBranchViewListBetweenBranches(
                                        o
                                    ),
                                ].filter(Boolean),
                                r = [...new Set(i)].map((e) => {
                                    const t = e.bounds,
                                        i = e.getRealPosition(),
                                        n = Object(d.relativePositionFor)(
                                            {
                                                x: i.x + t.x,
                                                y: i.y + t.y,
                                            },
                                            a.getRealPosition()
                                        );
                                    return Object.assign(
                                        Object.assign({}, e.bounds),
                                        n
                                    );
                                });
                            let s =
                                0 === a.boundaryBounds.width
                                    ? a.bounds
                                    : a.boundaryBounds;
                            const l = o.slice(1).map((e) => {
                                const t =
                                        0 === e.boundaryBounds.width
                                            ? e.bounds
                                            : e.boundaryBounds,
                                    i = e.getRealPosition(),
                                    n = Object(d.relativePositionFor)(
                                        {
                                            x: i.x + t.x,
                                            y: i.y + t.y,
                                        },
                                        a.getRealPosition()
                                    );
                                return Object.assign(Object.assign({}, t), n);
                            });
                            n = c.d([s, ...l, ...t, ...r]);
                        } else n = e.getContentBound();
                        if (
                            ((i.svgWidth = Math.ceil(n.width)),
                            (i.svgHeight = Math.ceil(n.height)),
                            (i.originLeft = -n.x),
                            (i.originTop = -n.y),
                            t.width && t.height)
                        ) {
                            const e = t.width - 2 * t.padding,
                                r = t.height - t.padding - t.paddingBottom;
                            e / r > n.width / n.height
                                ? ((i.scale = r / n.height),
                                  (i.scale =
                                      void 0 !== t.maxScale &&
                                      null !== t.maxScale
                                          ? Math.min(i.scale, t.maxScale)
                                          : i.scale),
                                  (i.svgWidth = e / i.scale))
                                : ((i.scale = e / n.width),
                                  (i.scale =
                                      void 0 !== t.maxScale &&
                                      null !== t.maxScale
                                          ? Math.min(i.scale, t.maxScale)
                                          : i.scale),
                                  (i.svgHeight = r / i.scale));
                        }
                        let r = t.padding / i.scale,
                            s = t.paddingBottom / i.scale;
                        const l =
                            (Math.max(i.svgWidth + 2 * r, i.svgHeight + r + s) *
                                i.scale *
                                i.hidpi) /
                            96;
                        l >= 32767 &&
                            ((i.scale = ((32767 * i.scale) / l) * 0.9),
                            (r = t.padding / i.scale),
                            (s = t.paddingBottom / i.scale));
                        const f =
                            (i.svgWidth + 2 * r) *
                            (i.svgHeight + r + s) *
                            (i.scale * i.scale) *
                            (((i.hidpi / 96) * i.hidpi) / 96);
                        if (
                            (f > L &&
                                ((i.scale = i.scale * Math.sqrt(L / f) * 0.9),
                                (r = t.padding / i.scale),
                                (s = t.paddingBottom / i.scale)),
                            (i.originLeft += (i.svgWidth - n.width) / 2),
                            (i.originTop += (i.svgHeight - n.height) / 2),
                            a)
                        ) {
                            const e = a.getRealPosition();
                            ((i.originLeft -= e.x), (i.originTop -= e.y));
                        }
                        ((i.svgWidth += 2 * r),
                            (i.svgHeight += r + s),
                            (i.originLeft += r),
                            (i.originTop += r));
                    }
                    (this._fixMatrixAppendViewBounds(i, e, a),
                        (i.$newSVG = a
                            ? this._getBranchTreeSVG(o, e)
                            : r()(n.svg.node).clone()),
                        i.$newSVG.attr({
                            width: i.svgWidth,
                            height: i.svgHeight,
                        }),
                        i.$newSVG
                            .children('g')
                            .eq(0)
                            .attr({
                                transform: `scale(${i.containerScale}) translate(${i.originLeft} ${i.originTop})`,
                            }),
                        t.format === v &&
                            (o.forEach((t) =>
                                this._addTopicHref(i.$newSVG, e, t)
                            ),
                            t.noBackground ||
                                t.format === _ ||
                                this._fixTransparentCentralBranchInMapStructure(
                                    i.$newSVG,
                                    e,
                                    a
                                )),
                        t.format === E &&
                            (o.forEach((t) =>
                                this._addTopicHref(i.$newSVG, e, t)
                            ),
                            o.forEach((n) =>
                                this._fixRelationshipTitle(
                                    i.$newSVG,
                                    e,
                                    n,
                                    t.noBackground
                                )
                            ),
                            e.isDoughnutPlatform() &&
                                o.forEach((t) =>
                                    this._fixArrow(i.$newSVG, e, t)
                                ),
                            o.forEach((t) =>
                                this._fixGradientBGColor(i.$newSVG, e, t)
                            ),
                            this._fixTransparentCentralBranchInMapStructure(
                                i.$newSVG,
                                e,
                                a
                            )),
                        t.wbPrintMode &&
                            this.optimizeColorForWbPrintMode(i.$newSVG, e),
                        this._hideInteractiveElements(i.$newSVG, t),
                        this._replaceWebVideoPlayingInteractButton(
                            i.$newSVG,
                            e
                        ),
                        t.noBackground &&
                            i.$newSVG.css('background-color', 'transparent'));
                }
                return i;
            }
            _fixArrow(e, t, i) {
                const n = r()('<g id="arrowContainer"></g>');
                e.find('[data-name="sheet"]').append(n);
                const a = this.fixPathArrow.bind(this, e, n, t, i);
                (a((e, t) => {
                    let i;
                    return (
                        (i = t
                            ? this._getRelationshipViewListInBranchTree([t], e)
                            : [...e.getSheetView().relationships]),
                        i.filter((e) => e.figure.isVisible)
                    );
                }, p),
                    a((e, t) => {
                        const i = [];
                        return (
                            (null != t
                                ? t
                                : e.getSheetView().getCentralBranchView()
                            )
                                .getDescendantBranchesByType(o.ALL_TOPIC_TYPES)
                                .forEach((e) => {
                                    if (Object(d.isDetachedBranch)(e)) return;
                                    if (e.getFishboneMainLineView()) return;
                                    const t = e.getConnectionView();
                                    t.figure.isVisible && i.push(t);
                                }),
                            i
                        );
                    }, T),
                    a((e, t) => {
                        const i = [];
                        return (
                            (null != t
                                ? t
                                : e.getSheetView().getCentralBranchView()
                            )
                                .getDescendantBranchesByType(o.ALL_TOPIC_TYPES)
                                .forEach((e) => {
                                    const t = e.getFishBoneMainLineView();
                                    t && t.figure.isVisible && i.push(t);
                                }),
                            i
                        );
                    }, u));
            }
            fixPathArrow(e, t, i, n, r, o) {
                r(i, n).forEach((i) => {
                    o.export(i, i.arrowSelector).forEach((i) => {
                        (e.find(`#${i.attr('id')}`).remove(), t.append(i));
                    });
                });
            }
            optimizeColorForWbPrintMode(e, t) {
                const i = '#0D0D0D';
                function n(e, t) {
                    let { h: i, l: n } = g.snowballUtil.hexStringToHSLObject(e);
                    return (
                        t === o.CLASS_TYPE.IMPORTANT_TOPIC
                            ? (n -= n / 1.2)
                            : t === o.CLASS_TYPE.MINOR_TOPIC
                              ? (n -= n / 2)
                              : n >= 56 && n <= 80 && (n -= n / 2.5),
                        g.snowballUtil.hslObjectToHexString({
                            h: i,
                            s: 0,
                            l: n,
                        })
                    );
                }
                function r(e) {
                    const t = l.a.getClassList(e)[0],
                        i = '#FFFFFF',
                        { fillColor: r } = e.topicView.figure;
                    if ('none' === r) return i;
                    const { snowballUtil: a } = Object(d.getInjectModule)(
                        o.MODULE_NAME.SNOWBALL
                    );
                    return n(a.blendingColor(r, i), t);
                }
                function a(t) {
                    return t ? e.find(`#${t.attr('id')}`) : null;
                }
                function s(t, i) {
                    t &&
                        (Array.from(
                            t.figure.renderWorker.titleText.node.children
                        ).forEach((t) => {
                            const n = t.getAttribute('id');
                            e.find(`#${n}`).attr('fill', i);
                        }),
                        a(t.figure.renderWorker.svg).attr('fill', i),
                        a(t.figure.renderWorker.titleText).attr('fill', i));
                }
                const c = t.getSheetView(),
                    h = c.centralBranchView,
                    p = h.getDescendantBranchesByType(...o.ALL_TOPIC_TYPES);
                ([h, ...p].forEach((t) => {
                    (!(function (e) {
                        const t = Object(d.isSolidFillPattern)(
                                e.topicView.figure.fillPattern
                            )
                                ? 'fill'
                                : 'stroke',
                            i = r(e);
                        a(e.topicView.figure.renderWorker.topicShapeFill).attr(
                            t,
                            i
                        );
                    })(t),
                        (function (e) {
                            const t = r(e);
                            s(
                                e.topicView.titleView,
                                Object(g.getSmartTextColor)(t, ['#000', '#fff'])
                            );
                        })(t),
                        (function (e) {
                            const t = l.a.getClassList(e)[0],
                                i = n(e.topicView.figure.borderColor, t);
                            a(e.topicView.figure.renderWorker.topicShape).attr(
                                'stroke',
                                i
                            );
                        })(t),
                        (function (e) {
                            var t, n, r, s;
                            const l = e.getConnectionView().figure,
                                c =
                                    l.lineTapered &&
                                    ![
                                        o.LINE_PATTERN.HANDDRAWNDASH,
                                        o.LINE_PATTERN.HANDDRAWNSOLID,
                                    ].includes(l.linePattern)
                                        ? 'fill'
                                        : 'stroke';
                            (a(
                                e.getConnectionView().figure.renderWorker.s$svg
                            ).attr(c, i),
                                null ===
                                    (n = a(
                                        null ===
                                            (t = e
                                                .getConnectionView()
                                                .arrowSelector.getEndArrowDomInfo()) ||
                                            void 0 === t
                                            ? void 0
                                            : t.s$SVG
                                    )) ||
                                    void 0 === n ||
                                    n.attr({ fill: i, stroke: i }),
                                null ===
                                    (s = a(
                                        null ===
                                            (r = e
                                                .getConnectionView()
                                                .arrowSelector.getBeginArrowDomInfo()) ||
                                            void 0 === r
                                            ? void 0
                                            : r.s$SVG
                                    )) ||
                                    void 0 === s ||
                                    s.attr({ fill: i, stroke: i }));
                        })(t),
                        (function (e) {
                            e.boundaries.forEach((e) => {
                                const t = i;
                                a(e.figure.renderWorker.boundaryPath).attr(
                                    'stroke',
                                    t
                                );
                                const r = n(e.figure.fillColor);
                                a(e.figure.renderWorker.boundaryFillPath).attr(
                                    'fill',
                                    r
                                );
                                const o = Object(g.getSmartTextColor)(t, [
                                    '#000',
                                    '#fff',
                                ]);
                                (s(e.titleView, o),
                                    a(
                                        e.titleView.figure.renderWorker
                                            .boundaryTitleBG
                                    ).attr('fill', t));
                            });
                        })(t),
                        (function (t) {
                            const o = t.getMatrixView();
                            if (!o) return;
                            const s = l.a.getClassList(t)[0],
                                c = n(t.topicView.figure.visualFillColor, s),
                                d = Object(b.a)(c),
                                h = Object(g.getSmartTextColor)(d, [
                                    '#000',
                                    '#fff',
                                ]);
                            o.getCellViews().forEach((t) => {
                                const n = t.getProxyView(),
                                    o = n instanceof m.a || !n;
                                let s = d;
                                (!o && n instanceof f.a && (s = r(n)),
                                    a(t.figure.renderWorker._s$fillPath).attr(
                                        'fill',
                                        s
                                    ),
                                    o &&
                                        n &&
                                        !t.isNull &&
                                        Array.from(
                                            n.figure.renderWorker.titleText.node
                                                .children
                                        ).forEach((t) => {
                                            const i = t.getAttribute('id');
                                            e.find(`#${i}`).attr('fill', h);
                                        }));
                                const l = i;
                                a(t.figure.renderWorker._s$borderPath).attr(
                                    'stroke',
                                    l
                                );
                            });
                        })(t),
                        (function (e) {
                            const t = e.getTreeTableCellView();
                            if (!t) return;
                            const n = r(e);
                            a(t.figure.renderWorker.s$treeTableFill).attr(
                                'fill',
                                n
                            );
                            const o = i;
                            a(t.figure.renderWorker.s$treeTableStroke).attr(
                                'stroke',
                                o
                            );
                        })(t),
                        (function (e) {
                            const t = e.getFishboneHeadLineView();
                            if (t) {
                                const e = i;
                                a(t.figure.renderWorker.s$fishBoneLine).attr({
                                    stroke: e,
                                    fill: e,
                                });
                            }
                            const n = e.getFishboneMainLineView();
                            if (n) {
                                const e = i;
                                a(n.figure.renderWorker.s$fishBoneLine).attr({
                                    stroke: e,
                                    fill: e,
                                });
                            }
                        })(t),
                        (function (e) {
                            const t = e.getTimelineMainLineView();
                            if (t) {
                                const e = i;
                                (a(t.figure.renderWorker.s$line).attr({
                                    stroke: e,
                                }),
                                    t.figure.renderWorker.s$steps
                                        .children()
                                        .forEach((t) => {
                                            a(t).attr({ fill: e });
                                        }));
                            }
                        })(t));
                }),
                    c.relationships.forEach((e) => {
                        var t, n, r, o;
                        const l = i;
                        (a(e.figure.renderWorker.path).attr('stroke', l),
                            null ===
                                (n = a(
                                    null ===
                                        (t =
                                            e.arrowSelector.getEndArrowDomInfo()) ||
                                        void 0 === t
                                        ? void 0
                                        : t.s$SVG
                                )) ||
                                void 0 === n ||
                                n.attr({ fill: l, stroke: l }),
                            null ===
                                (o = a(
                                    null ===
                                        (r =
                                            e.arrowSelector.getBeginArrowDomInfo()) ||
                                        void 0 === r
                                        ? void 0
                                        : r.s$SVG
                                )) ||
                                void 0 === o ||
                                o.attr({ fill: l, stroke: l }),
                            s(e.titleView, '#000'));
                    }),
                    e.css('background-color', '#fff'));
            }
            _fixTransparentCentralBranchInMapStructure(e, t, i) {
                if (i && !Object(d.isRootBranch)(i)) return;
                const n = [
                        o.STRUCTURECLASS.MAP,
                        o.STRUCTURECLASS.MAPUNBALANCED,
                        o.STRUCTURECLASS.MAPCLOCKWISE,
                        o.STRUCTURECLASS.MAPANTICLOCKWISE,
                        o.STRUCTURECLASS.MAPFLOATING,
                        o.STRUCTURECLASS.MAPFLOATINGCLOCKWISE,
                        o.STRUCTURECLASS.MAPFLOATINGANTICLOCKWISE,
                    ],
                    r = t.getSheetView(),
                    a = r.getCentralBranchView();
                if (!n.includes(a.getStructureClass())) return;
                const { snowballUtil: s } = Object(d.getInjectModule)(
                        o.MODULE_NAME.SNOWBALL
                    ),
                    l = s.hexStringToRgbObject(a.topicView.figure.fillColor);
                if ('none' !== a.topicView.figure.fillColor && 1 == l.a) return;
                const c = a.topicView.topicShapeFill.node.getAttribute('id'),
                    f = e.find(`#${c}`);
                let h = 'none';
                ((h =
                    'none' === a.topicView.figure.fillColor
                        ? r.figure.backgroundColor
                        : s.blendingColor(l, r.figure.backgroundColor)),
                    f.attr({ opacity: 1, fill: h }));
            }
            _fixRelationshipTitle(e, t, i, n) {
                let o;
                ((o = i
                    ? this._getRelationshipViewListInBranchTree([i], t)
                    : [...t.getSheetView().relationships]),
                    o.forEach((i) => {
                        if (i.model.getTitle()) {
                            const o = r()('<rect />'),
                                a = i.titleView.getRealPosition(),
                                s = Object.assign({}, i.titleView.bounds);
                            (o.attr({
                                width: s.width,
                                height: s.height,
                                x: a.x,
                                y: a.y,
                                fill: n
                                    ? '#fff'
                                    : t.getSheetView().figure.backgroundColor,
                            }),
                                e
                                    .find(
                                        `#${i.titleView.figure.renderWorker.svg.node.getAttribute('id')}`
                                    )
                                    .before(o));
                        }
                    }));
            }
            _fixGradientBGColor(e, t, i) {
                if (!t.getSheetView().isGradient()) return;
                const n = [
                        ...(i =
                            i ||
                            t
                                .getSheetView()
                                .getCentralBranchView()).getDescendantBranchesByType(
                            o.ALL_TOPIC_TYPES
                        ),
                        i,
                    ],
                    r = n.reduce((e, t) => e.concat([...t.boundaries]), []);
                (n.forEach((t) => {
                    const i =
                        t.topicView.figure.renderWorker.topicShapeFill.id();
                    e.find(`#${i}`).attr('fill', t.topicView.figure.fillColor);
                }),
                    r.forEach((t) => {
                        const i = t.figure.renderWorker.boundaryFillPath.id();
                        e.find(`#${i}`).attr('fill', t.figure.fillColor);
                    }));
            }
            _addTopicHref(e, t, i) {
                const n = (i =
                    i ||
                    t
                        .getSheetView()
                        .getCentralBranchView()).getDescendantBranchesByType(
                    o.ALL_TOPIC_TYPES
                );
                (n.push(i),
                    n.forEach((t) => {
                        const i = t.model.getHref();
                        if (!i) return;
                        const n = t.topicView.informationIconView;
                        if (n.iconType !== o.VIEW_TYPE.HREF) return;
                        const r = n.el.id,
                            s = e.find(`#${r}`)[0];
                        if (!s) return;
                        const l = document.createElementNS(a.a.ns, 'a');
                        (l.setAttribute('href', i),
                            l.setAttribute('target', '_blank'));
                        (s.parentNode.replaceChild(l, s), l.appendChild(s));
                    }));
            }
            _getBranchTreeSVG(e, t) {
                const i = r()(
                        '<svg id="SvgjsSvg1001" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100%" xmlns:xlink="http://www.w3.org/1999/xlink" style="display: block; background-color: rgb(255, 255, 255);"></svg>'
                    ),
                    n = r()('<g data-name="sheet"></g>'),
                    o = r()('<g></g>'),
                    a = r()('<g></g>'),
                    s = r()('<g></g>'),
                    l = r()('<g></g>'),
                    c = r()('<g></g>'),
                    d = r()('<g></g>');
                let f = e.reduce(
                    (e, t) => [
                        ...e,
                        ...this._getAllBranchViewListInBranchTree(t),
                    ],
                    []
                );
                return (
                    f.push(...this._getSummaryBranchViewListBetweenBranches(e)),
                    (f = [...new Set(f)]),
                    f.forEach((t) => {
                        var i, n;
                        if (
                            t.isVisible &&
                            t.figure.isVisible &&
                            (o.append(r()(t.el).clone()), !e.includes(t))
                        ) {
                            const e = t.getConnectionView().getSvg();
                            e && a.append(r()(e.node).clone());
                        }
                        (t.getFishboneHeadLineView() &&
                            a.append(
                                r()(
                                    null ===
                                        (i = t.getFishboneHeadLineView()) ||
                                        void 0 === i
                                        ? void 0
                                        : i.figure.renderWorker.s$svg.node
                                ).clone()
                            ),
                            t.getFishboneMainLineView() &&
                                a.append(
                                    r()(
                                        null ===
                                            (n = t.getFishboneMainLineView()) ||
                                            void 0 === n
                                            ? void 0
                                            : n.figure.renderWorker.s$svg.node
                                    ).clone()
                                ),
                            t.boundaries.forEach((e) => {
                                s.append(r()(e.$el.clone()));
                            }),
                            t.getMatrixView() &&
                                l.append(t.getMatrixView().$el.clone()),
                            t.getTreeTableCellView() &&
                                c.append(t.getTreeTableCellView().$el.clone()));
                    }),
                    this._getFullWrappedBoundaryViewListInBranchTree(
                        e[0]
                    ).forEach((e) => {
                        s.append(e.$el.clone());
                    }),
                    this._getRelationshipViewListInBranchTree(e, t).forEach(
                        (e) => {
                            d.append(e.$el.clone());
                        }
                    ),
                    n
                        .append(a)
                        .append(s)
                        .append(l)
                        .append(c)
                        .append(o)
                        .append(d),
                    i
                        .append(n)
                        .append(
                            r()(t.getSVGView().svg.node).find('> defs').clone()
                        ),
                    i.css(
                        'background-color',
                        t.getSheetView().figure.backgroundColor
                    ),
                    i
                );
            }
            _getAllBranchViewListInBranchTree(e) {
                const t = [e, ...Object(d.getAllChildrenBranchViewList)(e)];
                return (
                    this._getFullWrappedSummaryBranchViewListInBranchTree(
                        e
                    ).forEach((e) => {
                        t.push(e, ...Object(d.getAllChildrenBranchViewList)(e));
                    }),
                    t
                );
            }
            _getRelationshipViewListInBranchTree(e, t) {
                const i = e.reduce(
                    (e, t) => [
                        ...e,
                        ...this._getAllBranchViewListInBranchTree(t),
                    ],
                    []
                );
                return t.getSheetView().relationships.filter((e) => {
                    const t = i.includes(e.end1View),
                        n = i.includes(e.end2View);
                    return t && n;
                });
            }
            _getFullWrappedSummaryBranchViewListInBranchTree(e) {
                const t = e.parent();
                if (!Object(d.isBranch)(t)) return [];
                const i = e.branchIndex();
                return t
                    .getChildrenBranchesByType(o.TOPIC_TYPE.SUMMARY)
                    .filter((e) => {
                        const t = e.summaryView.model;
                        if (t.rangeStart === t.rangeEnd && i === t.rangeStart)
                            return !0;
                    });
            }
            _getSummaryBranchViewListBetweenBranches(e) {
                if (1 === e.length) return [];
                const t = e
                    .map((e) => e.parent())
                    .filter((e) => Object(d.isBranch)(e));
                if (1 !== new Set(t).size) return [];
                const i = e.map((e) => e.branchIndex());
                return t[0]
                    .getChildrenBranchesByType(o.TOPIC_TYPE.SUMMARY)
                    .filter((e) => {
                        var t;
                        const n =
                            null === (t = null == e ? void 0 : e.summaryView) ||
                            void 0 === t
                                ? void 0
                                : t.model;
                        if (
                            n &&
                            i.includes(null == n ? void 0 : n.rangeStart) &&
                            i.includes(null == n ? void 0 : n.rangeEnd)
                        )
                            return !0;
                    });
            }
            _getFullWrappedBoundaryViewListInBranchTree(e) {
                const t = e.parent();
                if (!Object(d.isBranch)(t)) return [];
                const i = e.branchIndex();
                return t.boundaries.filter((e) => {
                    const t = e.model;
                    if (t.rangeStart === t.rangeEnd && i === t.rangeStart)
                        return !0;
                });
            }
            _getFontsInSheet(e, t) {
                const i = { 'information-iconfont': 1 };
                if (!t) {
                    const t = e.getSVGView();
                    Object.keys(t.model2View).forEach((e) => {
                        const n = t.model2View[e];
                        if (n.model instanceof s.a) {
                            const e = l.a.getStyleValue(
                                n,
                                o.STYLE_KEYS.FONT_FAMILY
                            );
                            e && e.split(',').forEach((e) => e && (i[e] = 1));
                        }
                    });
                }
                return Object.keys(i).map((e) => e.replace(/['"]/g, ''));
            }
            _hideInteractiveElements(e, t = {}) {
                let i = [
                    'topic-select-box-container',
                    'select-box-container',
                    'other-container',
                    'multi-select-box_container',
                    'resize-box',
                    'relationship-action-path',
                    'controlPoint-group',
                    'marker_border_box',
                    'icon-border-box',
                    'boundary-action-path',
                    'cell-select-box',
                    'matrix-plus-box',
                    'topic-custom-width-control-bar',
                    'relationship-default-title',
                    'tree-map-select-box',
                ];
                (t.hideCollapseOpen && (i = i.concat('collapse-folded')),
                    t.hideCollapseClose && (i = i.concat('collapse-extended')),
                    i.forEach((t) => {
                        if ('relationship-default-title' === t) {
                            e.find(`[data-name="${t}"]`)
                                .siblings('[data-name="relationship-path"]')
                                .attr('clip-path', '');
                        }
                        e.find(`[data-name="${t}"]`).remove();
                    }));
            }
            _replaceWebVideoPlayingInteractButton(e, t) {
                e.find('[data-name="web-video-interact-button"]').attr(
                    'href',
                    t.getFileRealResource(
                        C.addonModule.getWebVideoPlayStartButtonResource()
                    )
                );
            }
            _fixMatrixAppendViewBounds(e, t, i) {
                const n = t.getSheetView().getCentralBranchView();
                [
                    o.STRUCTURECLASS.SPREADSHEET,
                    o.STRUCTURECLASS.COLUMNSPREADSHEET,
                ].includes(n.getStructureClass()) &&
                    (e.svgHeight -= 3 * Q.a.MATRIX_PLUS_RADIUS);
            }
        })();
    },
];
