export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return l;
        });
        var n,
            r = i(0),
            o = i(35),
            a = i(3);
        !(function (e) {
            ((e.hachure = 'hachure'),
                (e.solid = 'solid'),
                (e.zigzag = 'zigzag'),
                (e.crossHatch = 'cross-hatch'),
                (e.dots = 'dots'),
                (e.dashed = 'dashed'),
                (e.zigzagline = 'zigzag-line'));
        })(n || (n = {}));
        t.b = new (class {
            constructor() {
                ((this.defaultConfig = {
                    fillWidth: 8,
                    seed: 10,
                    roughness: 1,
                }),
                    (this.skipedSealPointsConfig = {
                        [r.TOPICSHAPE.ROUNDEDRECT]: [6],
                        [r.TOPICSHAPE.ELLIPSERECT]: [0],
                        [r.TOPICSHAPE.ELLIPTICRECTANGLE]: [0, 1, 2, 3],
                        [r.TOPICSHAPE.ROUNDEDHEXAGON]: [0, 1, 2, 3],
                        [r.TOPICSHAPE.SIMPLECLOUD]: [0, 2, 4, 6],
                        [r.TOPICSHAPE.HEART]: [0, 4],
                        [r.TOPICSHAPE.SHIELD]: [0, 2, 4, 6],
                        [r.TOPICSHAPE.STAR]: [8, 11, 14],
                    }),
                    (this.fillPatternRoughConfig = {
                        [r.FILL_PATTERN.SOLID_HAND_DRAWN]: {
                            fillStyle: n.solid,
                        },
                        [r.FILL_PATTERN.HACHURE]: {
                            fillStyle: n.hachure,
                            roughness: 1.4,
                        },
                        [r.FILL_PATTERN.HACHURE_LEFT_HAND]: {
                            fillStyle: n.hachure,
                            roughness: 1.4,
                            hachureAngle: 45,
                        },
                        [r.FILL_PATTERN.ZIGZAG]: {
                            fillStyle: n.zigzag,
                        },
                        [r.FILL_PATTERN.ZIGZAG_LEFT_HAND]: {
                            fillStyle: n.zigzag,
                            hachureAngle: 45,
                        },
                        [r.FILL_PATTERN.CROSSING]: {
                            fillStyle: n.hachure,
                            roughness: 0.9,
                            hachureAngle: 90,
                            hachureGap: 6,
                        },
                        [r.FILL_PATTERN.HACHURE_THIN]: {
                            fillStyle: n.hachure,
                            roughness: 1.2,
                            fillWidth: 2,
                            hachureGap: 1.1,
                        },
                        [r.FILL_PATTERN.CROSSING_THIN]: {
                            fillStyle: n.hachure,
                            hachureAngle: 90,
                            roughness: 1.2,
                            fillWidth: 2,
                            hachureGap: 1,
                        },
                    }),
                    (this.handDrawnBreakLineConfig = {
                        [r.TOPICSHAPE.ROUNDEDRECT]: [6],
                        [r.TOPICSHAPE.ELLIPSERECT]: [0],
                        [r.TOPICSHAPE.ELLIPTICRECTANGLE]: [0, 1, 2, 3],
                        [r.TOPICSHAPE.ROUNDEDHEXAGON]: [0, 1, 2, 3],
                        [r.TOPICSHAPE.SIMPLECLOUD]: [0, 2, 4, 6],
                        [r.TOPICSHAPE.HEART]: [0, 4],
                        [r.TOPICSHAPE.SHIELD]: [0, 2, 4, 6],
                        [r.TOPICSHAPE.STAR]: [8, 11, 14],
                    }),
                    (this.handDrawnNeedSmoothLinkPoint = [
                        r.TOPICSHAPE.CURLYBRACKET,
                        r.TOPICSHAPE.ROUNDEDRECT,
                    ]),
                    (this.handDrawnShapeHackerConfig = {
                        [r.TOPICSHAPE.ELLIPSE]: (e) => {
                            const t = 0.03 * e.height,
                                i = e.x + 0.8 * e.width,
                                n = e.y + 0.05 * e.height;
                            return `\n        M ${i} ${n + t}\n        C ${e.x - e.width / 7} ${e.y - e.height / 4}, ${e.x - e.width / 4} ${e.y + e.height} , ${e.x + e.width / 2} ${e.y + e.height}\n        C ${e.x + 1.1 * e.width} ${e.y + e.height} , ${e.x + 1.1 * e.width} ${e.y + e.height / 6} , ${i} ${n - t}\n      `;
                        },
                        [r.TOPICSHAPE.CIRCLE]: (e) => {
                            const { x: t, width: i } = e,
                                n = t + i,
                                r = Math.sqrt(Math.pow(n, 2) / 2);
                            return `M ${r} ${-r} A ${n}, ${n} 0 1 , 0 ${-r} , ${r} A ${n}, ${n} 0 1 , 0 ${r + 0.05 * r} , ${-r - 0.05 * r} `;
                        },
                        [r.TOPICSHAPE.ELLIPTICRECTANGLE]: (e) => {
                            const t = e.x,
                                i = e.x + e.width / 2,
                                n = e.x + e.width,
                                r = Math.min(e.height / 3, 0.2 * e.width),
                                o = e.y + r / 2,
                                a = e.y + e.height - r / 2;
                            return `\n      M ${t} ${o}\n      Q ${i} ${o - r}  ${n} ${o}\n      L ${n} ${a}\n      Q ${i} ${a + r}  ${t} ${a}\n      Z\n    `;
                        },
                        [r.TOPICSHAPE.ROUNDEDHEXAGON]: (e) => {
                            const t = e.x,
                                i = e.x + e.width / 2,
                                n = e.x + e.width,
                                r = Math.min(e.height / 6, 0.2 * e.width),
                                o = e.y + r,
                                a = e.y + e.height - r;
                            return `\n        M ${t} ${o}\n        L ${i} ${o - r / 2}\n        L ${n} ${o}\n        L ${n} ${a}\n        L ${i} ${a + r / 2}\n        L ${t} ${a}\n        Z\n      `;
                        },
                    }),
                    (this.handDrawnConnectionRoughnessConfig = [
                        {
                            test: (e) =>
                                [
                                    r.STRUCTURECLASS.MAP,
                                    r.STRUCTURECLASS.MAPUNBALANCED,
                                ].includes(e),
                            config: (e) =>
                                ({
                                    [r.BRANCHCONNECTION.ROUNDEDELBOW]: 1,
                                    [r.BRANCHCONNECTION.ELBOW]: 1.5,
                                    [r.BRANCHCONNECTION.STRAIGHT]: 1.5,
                                    [r.BRANCHCONNECTION.CURVE]: 1.2,
                                    [r.BRANCHCONNECTION.BIGHT]: 1.5,
                                    [r.BRANCHCONNECTION.FOLD]: 1.2,
                                    [r.BRANCHCONNECTION.ROUNDEDFOLD]: 0.8,
                                })[e],
                        },
                        {
                            test: (e) =>
                                [
                                    r.STRUCTURECLASS.LOGICLEFT,
                                    r.STRUCTURECLASS.LOGICRIGHT,
                                ].includes(e),
                            config: (e) =>
                                ({
                                    [r.BRANCHCONNECTION.ROUNDEDELBOW]: 1,
                                    [r.BRANCHCONNECTION.ELBOW]: 1.2,
                                    [r.BRANCHCONNECTION.STRAIGHT]: 1.2,
                                    [r.BRANCHCONNECTION.CURVE]: 1.2,
                                    [r.BRANCHCONNECTION.BIGHT]: 1.2,
                                    [r.BRANCHCONNECTION.FOLD]: 1.2,
                                    [r.BRANCHCONNECTION.ROUNDEDFOLD]: 0.6,
                                })[e],
                        },
                        {
                            test: (e) =>
                                [
                                    r.STRUCTURECLASS.BRACELEFT,
                                    r.STRUCTURECLASS.BRACERIGHT,
                                ].includes(e),
                            config: () => 0.5,
                        },
                        {
                            test: (e) =>
                                [
                                    r.STRUCTURECLASS.ORGCHARTDOWN,
                                    r.STRUCTURECLASS.ORGCHARTUP,
                                ].includes(e),
                            config: (e) =>
                                ({
                                    [r.BRANCHCONNECTION.ROUNDEDELBOW]: 0.8,
                                    [r.BRANCHCONNECTION.ELBOW]: 1.2,
                                    [r.BRANCHCONNECTION.STRAIGHT]: 1.5,
                                    [r.BRANCHCONNECTION.CURVE]: 1.5,
                                    [r.BRANCHCONNECTION.BIGHT]: 1.2,
                                    [r.BRANCHCONNECTION.FOLD]: 1.2,
                                    [r.BRANCHCONNECTION.ROUNDEDFOLD]: 0.6,
                                })[e],
                        },
                        {
                            test: (e) =>
                                [
                                    r.STRUCTURECLASS.TREELEFT,
                                    r.STRUCTURECLASS.TREERIGHT,
                                ].includes(e),
                            config: (e) =>
                                ({
                                    [r.BRANCHCONNECTION.ROUNDEDELBOW]: 0.7,
                                    [r.BRANCHCONNECTION.ELBOW]: 1.2,
                                    [r.BRANCHCONNECTION.STRAIGHT]: 1.5,
                                    [r.BRANCHCONNECTION.CURVE]: 1.5,
                                    [r.BRANCHCONNECTION.BIGHT]: 1.5,
                                    [r.BRANCHCONNECTION.FOLD]: 1.2,
                                    [r.BRANCHCONNECTION.ROUNDEDFOLD]: 0.6,
                                })[e],
                        },
                        {
                            test: (e) =>
                                [
                                    r.STRUCTURECLASS.FISHBONELEFTHEADED,
                                    r.STRUCTURECLASS.FISHBONERIGHTHEADED,
                                ].includes(e),
                            config: () => 1.2,
                        },
                        { test: () => !0, config: () => 1 },
                    ]),
                    (this.getSpecialBorderLinePatternPath = (e, t) =>
                        e in this.handDrawnShapeHackerConfig
                            ? this.handDrawnShapeHackerConfig[e](t)
                            : null),
                    (this.getHandDrawnConnectionRoughness = (e, t) =>
                        this.handDrawnConnectionRoughnessConfig
                            .find((t) => t.test(e))
                            .config(t)));
            }
            combineRoughOptions(...e) {
                return Object.assign.apply(null, [{}, ...e]);
            }
            getCompleteDefaultHandDrawnConfig() {
                return {
                    fillWidth: this.defaultConfig.fillWidth,
                    stroke: 'white',
                    strokeWidth: this.defaultConfig.fillWidth,
                    fill: 'white',
                    fillStyle: n.zigzag,
                    seed: this.defaultConfig.seed,
                    roughness: this.defaultConfig.roughness,
                    disableMultiStroke: !0,
                    disableMultiStrokeFill: !0,
                    hachureGap: 0.9 * this.defaultConfig.fillWidth,
                };
            }
            getFillPatternConfig(e) {
                const t = Object.assign(
                    {},
                    this.fillPatternRoughConfig[e] || {}
                );
                return (
                    t.fillWidth &&
                        ((t.strokeWidth = t.fillWidth),
                        (t.hachureGap = t.hachureGap || 0.9 * t.fillWidth)),
                    t
                );
            }
            getSkipedSealPoints(e) {
                return [...(this.skipedSealPointsConfig[e] || [])];
            }
            getHandDrawnBreakLineConfig(e) {
                return this.handDrawnBreakLineConfig[e]
                    ? [...this.handDrawnBreakLineConfig[e]]
                    : [];
            }
            getIsNeedSmoothLinkPoint(e) {
                return this.handDrawnNeedSmoothLinkPoint.includes(e);
            }
            getCurrentHandDrawnDefaultFillWidth(e) {
                const { fillWidth: t } = this.combineRoughOptions(
                    this.getCompleteDefaultHandDrawnConfig(),
                    this.getFillPatternConfig(e)
                );
                return t;
            }
        })();
        const s = (e, t) => {
                if (!t) return e;
                if (Object(o.D)(t)) return t;
                switch (t) {
                    case r.LINE_PATTERN.SOLID:
                        return r.LINE_PATTERN.HANDDRAWNSOLID;
                    case r.LINE_PATTERN.DASH:
                        return r.LINE_PATTERN.HANDDRAWNDASH;
                    default:
                        return e;
                }
            },
            l = {
                [r.STYLE_KEYS.FONT_FAMILY]: {
                    [r.VIEW_TYPE.BRANCH]: r.HAND_DRAWN_FONT_FAMILY,
                    [r.VIEW_TYPE.BOUNDARY]: r.HAND_DRAWN_FONT_FAMILY,
                    [r.VIEW_TYPE.RELATIONSHIP]: r.HAND_DRAWN_FONT_FAMILY,
                },
                [r.STYLE_KEYS.LINE_PATTERN]: {
                    [r.VIEW_TYPE.BRANCH]: (e) => {
                        const t = a.a.getStyleValue(
                            e,
                            r.STYLE_KEYS.LINE_PATTERN,
                            {
                                ignoreDynamicPriorityOverridedStyle: !0,
                            }
                        );
                        return s(r.LINE_PATTERN.HANDDRAWNSOLID, t);
                    },
                    [r.VIEW_TYPE.SUMMARY]: (e) => {
                        const t = a.a.getStyleValue(
                            e,
                            r.STYLE_KEYS.LINE_PATTERN,
                            {
                                ignoreDynamicPriorityOverridedStyle: !0,
                            }
                        );
                        return s(r.LINE_PATTERN.HANDDRAWNSOLID, t);
                    },
                    [r.VIEW_TYPE.RELATIONSHIP]: (e) => {
                        const t = a.a.getStyleValue(
                            e,
                            r.STYLE_KEYS.LINE_PATTERN,
                            {
                                ignoreDynamicPriorityOverridedStyle: !0,
                            }
                        );
                        return s(r.LINE_PATTERN.HANDDRAWNDASH, t);
                    },
                    [r.VIEW_TYPE.BOUNDARY]: (e) => {
                        const t = a.a.getStyleValue(
                            e,
                            r.STYLE_KEYS.LINE_PATTERN,
                            {
                                ignoreDynamicPriorityOverridedStyle: !0,
                            }
                        );
                        return s(r.LINE_PATTERN.HANDDRAWNDASH, t);
                    },
                },
                [r.STYLE_KEYS.FILL_PATTERN]: {
                    [r.VIEW_TYPE.BRANCH]: r.FILL_PATTERN.HACHURE,
                    [r.VIEW_TYPE.BOUNDARY]: r.FILL_PATTERN.SOLID_HAND_DRAWN,
                },
                [r.STYLE_KEYS.BORDER_LINE_PATTERN]: {
                    [r.VIEW_TYPE.BRANCH]: (e) => {
                        const t = a.a.getStyleValue(
                            e,
                            r.STYLE_KEYS.BORDER_LINE_PATTERN,
                            {
                                ignoreDynamicPriorityOverridedStyle: !0,
                            }
                        );
                        return s(r.LINE_PATTERN.HANDDRAWNSOLID, t);
                    },
                },
            };
    },
];
