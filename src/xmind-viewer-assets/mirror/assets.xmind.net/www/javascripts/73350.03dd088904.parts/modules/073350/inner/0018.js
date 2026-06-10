export default [
    function (e, t, i) {
        'use strict';
        var n = i(19),
            r = i(8),
            o = i(0);
        class a extends n.a {
            constructor(e) {
                (super(e),
                    (this.multiLineColors = ''),
                    (this.multiLineColorsDirty = !0),
                    (this.lineTapered = o.LINETAPERED.NONE),
                    (this.lineTaperedDirty = !0),
                    (this.backgroundColor = ''),
                    (this.backgroundColorDirty = !0),
                    (this.cjkFontFamily = ''),
                    (this.globalLineWidth = null),
                    (this.globalFontFamily = null),
                    Object(r.makeObservable)(this, {
                        multiLineColors: r.observable,
                        setMultiLineColors: r.action,
                        lineTapered: r.observable,
                        setLineTapered: r.action,
                        backgroundColor: r.observable,
                        setBackgroundColor: r.action,
                        cjkFontFamily: r.observable,
                        setCJKFontFamily: r.action,
                        globalLineWidth: r.observable,
                        setGlobalLineWidth: r.action,
                        globalFontFamily: r.observable,
                        setGlobalFontFamily: r.action,
                    }));
            }
            setMultiLineColors(e) {
                this.multiLineColors !== e &&
                    ((this.multiLineColors = e),
                    (this.multiLineColorsDirty = !0),
                    this.invalidatePaint());
            }
            setLineTapered(e) {
                this.lineTapered !== e &&
                    ((this.lineTapered = e),
                    (this.lineTaperedDirty = !0),
                    this.invalidatePaint());
            }
            setGradientColor(e) {
                this.gradientColor !== e &&
                    ((this.gradientColor = e),
                    (this.gradientColorDirty = !0),
                    this.invalidatePaint());
            }
            setBackgroundColor(e) {
                this.backgroundColor !== e &&
                    ((this.backgroundColor = e),
                    (this.backgroundColorDirty = !0),
                    this.invalidatePaint());
            }
            setOpacity(e) {
                this.opacity !== e &&
                    ((this.opacity = e),
                    (this.opacityDirty = !0),
                    this.invalidatePaint());
            }
            setCJKFontFamily(e) {
                this.cjkFontFamily = e;
            }
            setWallpaper(e) {
                this.wallpaper !== e &&
                    ((this.wallpaper = e),
                    (this.wallpaperDirty = !0),
                    this.invalidatePaint());
            }
            setGlobalLineWidth(e) {
                this.globalLineWidth = e;
            }
            setGlobalFontFamily(e) {
                this.globalFontFamily = e;
            }
        }
        class s extends n.a {
            constructor(e) {
                (super(e),
                    (this.structureClass = o.STRUCTURECLASS.LOGICRIGHT),
                    (this.alignmentByLevelSetting =
                        o.ALIGNMENT_BY_LEVEL_STATUS.INACTIVED),
                    (this.alignemntByLevelSettingDirty = !1),
                    (this.connectionMasked = !1),
                    (this.connectionMaskDirty = !1),
                    (this.lineWidth = 0),
                    (this.lineColor = ''),
                    (this.linePattern = o.LINE_PATTERN.SOLID),
                    (this.lineShape = ''),
                    (this.endArrowClass = o.ARROW_CLASS.NONE),
                    (this.summaryLineWidth = 0),
                    (this.summaryLineColor = ''),
                    (this.summaryLineShape = ''),
                    (this.summaryLinePattern = o.LINE_PATTERN.SOLID),
                    Object(r.makeObservable)(this, {
                        lineColor: r.observable,
                        setLineColor: r.action,
                        lineWidth: r.observable,
                        setLineWidth: r.action,
                        endArrowClass: r.observable,
                        setEndArrowClass: r.action,
                        linePattern: r.observable,
                        setLinePattern: r.action,
                        lineShape: r.observable,
                        setLineShape: r.action,
                        summaryLineWidth: r.observable,
                        setSummaryLineWidth: r.action,
                        summaryLineColor: r.observable,
                        setSummaryLineColor: r.action,
                        summaryLineShape: r.observable,
                        setSummaryLineShape: r.action,
                        structureClass: r.observable,
                        setStructureClass: r.action,
                        summaryLinePattern: r.observable,
                        setSummaryLinePattern: r.action,
                    }));
            }
            setStructureClass(e) {
                this.structureClass = e;
            }
            setFolded(e) {
                this.folded !== e &&
                    ((this.folded = e),
                    (this.foldedDirty = !0),
                    this.invalidateLayout(),
                    this.invalidatePaint());
            }
            setMinimized(e) {
                this.minimized !== e &&
                    ((this.minimized = e),
                    (this.minimizedDirty = !0),
                    this.invalidateLayout(),
                    this.invalidatePaint());
            }
            setUnbalanceRightNumber(e) {
                this.unbalanceRightNumber !== e &&
                    ((this.unbalanceRightNumber = e), this.invalidateLayout());
            }
            setBalanceRightNumber(e) {
                this.balanceRightNumber !== e &&
                    ((this.balanceRightNumber = e), this.invalidateLayout());
            }
            isMinimized() {
                if (this.minimized) return !0;
                const e = this.getParent();
                return e instanceof s && (!!e.folded || e.isMinimized());
            }
            setMajorSpacing(e) {
                this.majorSpacing !== e &&
                    ((this.majorSpacing = e), this.invalidateLayout());
            }
            setMinorSpacing(e) {
                this.minorSpacing !== e &&
                    ((this.minorSpacing = e), this.invalidateLayout());
            }
            setAlignmentByLevelSetting(e) {
                this.alignmentByLevelSetting !== e &&
                    ((this.alignmentByLevelSetting = e),
                    (this.alignemntByLevelSettingDirty = !0),
                    this.invalidateLayout());
            }
            setConnectionMasked(e) {
                this.connectionMasked !== e &&
                    ((this.connectionMasked = e), this.invalidatePaint());
            }
            updateConnectionMask() {
                ((this.connectionMaskDirty = !0), this.invalidatePaint());
            }
            setLineWidth(e) {
                this.lineWidth !== e && (this.lineWidth = e);
            }
            setLineColor(e) {
                this.lineColor !== e && (this.lineColor = e);
            }
            setEndArrowClass(e) {
                this.endArrowClass !== e && (this.endArrowClass = e);
            }
            setLinePattern(e) {
                this.linePattern !== e && (this.linePattern = e);
            }
            setLineShape(e) {
                this.lineShape !== e && (this.lineShape = e);
            }
            setSummaryLineWidth(e) {
                this.summaryLineWidth !== e && (this.summaryLineWidth = e);
            }
            setSummaryLineColor(e) {
                this.summaryLineColor !== e && (this.summaryLineColor = e);
            }
            setSummaryLineShape(e) {
                this.summaryLineShape !== e && (this.summaryLineShape = e);
            }
            setSummaryLinePattern(e) {
                this.summaryLinePattern !== e && (this.summaryLinePattern = e);
            }
        }
        var l = i(5);
        class c extends n.a {
            constructor(e) {
                (super(e),
                    (this.pathAttrs = {}),
                    (this.pathAttrsDirty = !0),
                    (this.pathAttrsToPack = {}),
                    (this.selectBoxAttrs = {}),
                    (this.selectBoxAttrsDirty = !0),
                    (this.selectBoxAttrsToPack = {}),
                    (this.lineShape = ''),
                    (this.lineShapeDirty = !0),
                    (this.linePath = ''),
                    (this.linePathDirty = !0),
                    (this.lineColor = ''),
                    (this.lineColorDirty = !0),
                    (this.linePattern = o.LINE_PATTERN.SOLID),
                    (this.linePatternDirty = !0),
                    (this.lineWidth = 0),
                    (this.lineTapered = !1),
                    (this.pathDirty = !1),
                    (this.clipDirty = !0),
                    (this.startPoint = { x: 0, y: 0 }),
                    (this.endPoint = { x: 0, y: 0 }),
                    (this.endArrowClass = o.ARROW_CLASS.NONE),
                    (this.endArrowClassDirty = !0),
                    (this.currentPath = ''),
                    Object(r.makeObservable)(this, {
                        lineColor: r.observable,
                        setLineColor: r.action,
                        lineWidth: r.observable,
                        setLineWidth: r.action,
                        lineShape: r.observable,
                        setLineShape: r.action,
                        endArrowClass: r.observable,
                        setEndArrowClass: r.action,
                        linePattern: r.observable,
                        setLinePattern: r.action,
                        linePath: r.observable,
                        setLinePath: r.action,
                        lineShape: r.observable,
                        setLineShape: r.action,
                    }));
            }
            setLineShape(e) {
                this.lineShape !== e &&
                    ((this.lineShape = e),
                    (this.lineShapeDirty = !0),
                    this.invalidateLayout(),
                    this.invalidatePaint());
            }
            setLinePath(e) {
                this.linePath !== e &&
                    ((this.linePath = e),
                    (this.linePathDirty = !0),
                    this.invalidatePaint());
            }
            setLineColor(e) {
                this.lineColor !== e &&
                    ((this.lineColor = e),
                    (this.lineColorDirty = !0),
                    this.invalidatePaint());
            }
            setLinePattern(e) {
                (e || o.LINE_PATTERN.SOLID,
                    this.linePattern !== e &&
                        ((this.linePattern = e),
                        (this.linePatternDirty = !0),
                        this.invalidatePaint()));
            }
            setLineWidth(e) {
                this.lineWidth !== e &&
                    ((this.lineWidth = e),
                    this.invalidateLayout(),
                    this.invalidatePaint());
            }
            setLineTapered(e) {
                this.lineTapered !== e &&
                    ((this.lineTapered = e),
                    this.invalidateLayout(),
                    this.invalidatePaint());
            }
            setEndArrowClass(e) {
                (e || o.ARROW_CLASS.NONE,
                    this.endArrowClass !== e &&
                        ((this.endArrowClass = e),
                        this.invalidateLayout(),
                        this.invalidatePaint()));
            }
            setStartPoint(e) {
                this.startPoint = e;
            }
            setEndPoint(e) {
                this.endPoint = e;
            }
            connectionPathAttr(e) {
                const t = Object(l.t)(this.pathAttrs, e);
                Object.keys(t).length > 0 &&
                    ((this.pathAttrsDirty = !0),
                    Object.assign(this.pathAttrs, t),
                    Object.assign(this.pathAttrsToPack, t),
                    'string' == typeof t.d && (this.currentPath = t.d),
                    this.invalidatePaint());
            }
            connectionSelectBoxAttr(e) {
                const t = Object(l.t)(this.selectBoxAttrs, e);
                Object.keys(t).length > 0 &&
                    ((this.selectBoxAttrsDirty = !0),
                    Object.assign(this.selectBoxAttrs, t),
                    Object.assign(this.selectBoxAttrsToPack, t),
                    this.invalidatePaint());
            }
            setConnectionLineShape(e) {
                ((this.connectionLineShape = e), this.invalidatePaint());
            }
            invalidatePath() {
                ((this.pathDirty = !0), this.invalidatePaint());
            }
        }
        class d extends n.a {
            constructor(e) {
                (super(e),
                    (this.textColor = ''),
                    (this.textDecoration = ''),
                    (this.textAlign = ''),
                    (this.textTransform = ''),
                    (this.fontSize = 0),
                    (this.fontFamily = ''),
                    (this.fontStyle = ''),
                    (this.fontWeight = 'normal'),
                    Object(r.makeObservable)(this, {
                        textColor: r.observable,
                        setTextColor: r.action,
                        textDecoration: r.observable,
                        setTextDecoration: r.action,
                        textAlign: r.observable,
                        setTextAlign: r.action,
                        textTransform: r.observable,
                        setTextTransform: r.action,
                        fontSize: r.observable,
                        setFontSize: r.action,
                        fontFamily: r.observable,
                        setFontFamily: r.action,
                        fontStyle: r.observable,
                        setFontStyle: r.action,
                        fontWeight: r.observable,
                        setFontWeight: r.action,
                    }));
            }
            setTextColor(e) {
                this.textColor = e;
            }
            setTextDecoration(e) {
                this.textDecoration = e;
            }
            setTextAlign(e) {
                this.textAlign = e;
            }
            setTextTransform(e) {
                this.textTransform = e;
            }
            setFontSize(e) {
                this.fontSize = e;
            }
            setFontFamily(e) {
                this.fontFamily = e;
            }
            setFontStyle(e) {
                this.fontStyle = e;
            }
            setFontWeight(e) {
                this.fontWeight = e;
            }
        }
        class f extends d {
            constructor(e) {
                (super(e),
                    (this.borderWidth = 0),
                    (this.borderWidthDirty = !0),
                    (this.borderColor = ''),
                    (this.borderColorDirty = !0),
                    (this.fillColor = ''),
                    (this.fillColorDirty = !0),
                    (this.originalFillColor = ''),
                    (this.visualFillColor = ''),
                    (this.forceAlignmentWidth = null),
                    (this.forceAlignmentWidthDirty = !0),
                    (this.fillPattern = o.FILL_PATTERN.SOLID),
                    (this.borderLinePattern = o.LINE_PATTERN.SOLID),
                    (this.borderLinePatternDirty = !1),
                    Object(r.makeObservable)(this, {
                        borderColor: r.observable,
                        setBorderColor: r.action,
                        borderWidth: r.observable,
                        setBorderWidth: r.action,
                        fillColor: r.observable,
                        setFillColor: r.action,
                        originalFillColor: r.observable,
                        setOriginalFillColor: r.action,
                        visualFillColor: r.observable,
                        setVisualFillColor: r.action,
                        fillPattern: r.observable,
                        setFillPattern: r.action,
                        borderLinePattern: r.observable,
                        setBorderLinePattern: r.action,
                    }));
            }
            setLineCorner(e) {
                this.lineCorner !== e &&
                    ((this.lineCorner = e), (this.lineCornerDirty = !0));
            }
            setMarginTop(e) {
                this.marginTop !== e &&
                    ((this.marginTop = e), this.invalidateLayout());
            }
            setMarginLeft(e) {
                this.marginLeft !== e &&
                    ((this.marginLeft = e), this.invalidateLayout());
            }
            setMarginRight(e) {
                this.marginRight !== e &&
                    ((this.marginRight = e), this.invalidateLayout());
            }
            setMarginBottom(e) {
                this.marginBottom !== e &&
                    ((this.marginBottom = e), this.invalidateLayout());
            }
            setMinimumWidth(e) {
                this.minimumWidth = e;
            }
            setBorderColor(e) {
                this.borderColor !== e &&
                    ((this.borderColor = e),
                    (this.borderColorDirty = !0),
                    this.invalidatePaint());
            }
            setBorderWidth(e) {
                ((e = parseInt(`${e}`)),
                    this.borderWidth !== e &&
                        ((this.borderWidth = e),
                        (this.borderLinePatternDirty = !0),
                        (this.borderWidthDirty = !0),
                        this.invalidateLayout(),
                        this.invalidatePaint()));
            }
            setBorderLinePattern(e) {
                this.borderLinePattern !== e &&
                    ((this.borderLinePattern = e),
                    (this.borderLinePatternDirty = !0),
                    this.invalidatePaint());
            }
            setFillColor(e) {
                this.fillColor !== e &&
                    ((this.fillColor = e),
                    (this.fillColorDirty = !0),
                    this.invalidatePaint());
            }
            setOriginalFillColor(e) {
                this.originalFillColor = e;
            }
            setVisualFillColor(e) {
                this.visualFillColor = e;
            }
            setFillPattern(e) {
                this.fillPattern !== e &&
                    ((this.fillPattern = e),
                    (this.fillPatternDirty = !0),
                    this.invalidatePaint());
            }
            setFillGradient(e) {
                this.fillGradient !== e &&
                    ((this.fillGradient = e),
                    (this.fillGradientDirty = !0),
                    this.invalidatePaint());
            }
            setGradientColor(e) {
                this.isGradientColor !== e &&
                    ((this.isGradientColor = e),
                    (this.isGradientColorDirty = !0),
                    this.invalidatePaint());
            }
            setShapeClass(e) {
                this.shapeClass !== e &&
                    ((this.shapeClass = e),
                    (this.shapeClassDirty = !0),
                    this.invalidateLayout(),
                    this.invalidatePaint());
            }
            setTopicShapePath(e) {
                this.topicShapePath !== e &&
                    ((this.topicShapePath = e),
                    (this.topicShapePathDirty = !0),
                    this.invalidatePaint());
            }
            setTopicShapeFillPath(e) {
                this.topicShapeFillPath !== e &&
                    ((this.topicShapeFillPath = e),
                    (this.topicShapeFillPathDirty = !0),
                    this.invalidatePaint());
            }
            setTopicShapeMaskAttrD(e) {
                this.topicShapeMaskAttrD !== e &&
                    ((this.topicShapeMaskAttrD = e),
                    (this.topicShapeMaskDirty = !0),
                    this.invalidatePaint());
            }
            setTopicShapeGroupPosition(e) {
                const t =
                    !this.topicShapeGroupPosition ||
                    !(
                        this.topicShapeGroupPosition.x === e.x &&
                        this.topicShapeGroupPosition.y === e.y
                    );
                (t && (this.topicShapeGroupPositionDirty = t),
                    (this.topicShapeGroupPosition = Object.assign({}, e)),
                    this.topicShapeGroupPositionDirty &&
                        this.invalidatePaint());
            }
            setTopicContentPosition(e) {
                const t =
                    !this.topicContentPosition ||
                    !(
                        this.topicContentPosition.x === e.x &&
                        this.topicContentPosition.y === e.y
                    );
                (t && (this.topicContentPositionDirty = t),
                    (this.topicContentPosition = Object.assign({}, e)),
                    this.topicContentPositionDirty && this.invalidatePaint());
            }
            setTopicInnerElementPosition(e) {
                const t =
                    !this.topicInnerElementPosition ||
                    !(
                        this.topicInnerElementPosition.x === e.x &&
                        this.topicInnerElementPosition.y === e.y
                    );
                (t && (this.topicInnerElementPositionDirty = t),
                    (this.topicInnerElementPosition = Object.assign({}, e)),
                    this.topicInnerElementPositionDirty &&
                        this.invalidatePaint());
            }
            setCustomWidth(e) {
                this.customWidth !== e &&
                    ((this.customWidth = e), this.invalidateLayout());
            }
            setForceAlignmentWidth(e) {
                this.forceAlignmentWidth !== e &&
                    ((this.forceAlignmentWidth = e), this.manuallyLayout());
            }
        }
        var h = i(1);
        class p extends n.a {
            constructor() {
                (super(...arguments),
                    (this.textFontObj = {}),
                    (this.textFontObjToPack = {}),
                    (this.connectPathAttr = {}),
                    (this.connectPathAttrToPack = {}),
                    (this.hoverAreaAttr = {}),
                    (this.hoverAreaAttrToPack = {}));
            }
            setCollapseState(e) {
                this.isCollapsed !== e &&
                    ((this.isCollapsed = e),
                    (this.isCollapsedDirty = !0),
                    this.invalidatePaint());
            }
            setText(e) {
                this.text !== e &&
                    ((this.text = e),
                    (this.textDirty = !0),
                    this.invalidatePaint());
            }
            setTextFontObj(e) {
                const t = h.subtract(this.textFontObj, e);
                Object.keys(t).length > 0 &&
                    ((this.textFontObjDirty = !0),
                    Object.assign(this.textFontObj, t),
                    Object.assign(this.textFontObjToPack, t),
                    this.invalidatePaint());
            }
            setTextTranslatePosition(e) {
                ((this.textTranslatePositionDirty = !0),
                    (this.textTranslatePosition = e),
                    this.invalidatePaint());
            }
            setLineColor(e) {
                this.lineColor !== e &&
                    ((this.lineColor = e),
                    (this.lineColorDirty = !0),
                    this.invalidatePaint());
            }
            setLineWidth(e) {
                this.lineWidth !== e &&
                    ((this.lineWidth = e),
                    (this.lineWidthDirty = !0),
                    this.invalidatePaint());
            }
            setBackgroundColor(e) {
                ('none' === e && (e = '#fff'),
                    this.backgroundColor !== e &&
                        ((this.backgroundColor = e),
                        (this.backgroundColorDirty = !0),
                        this.invalidatePaint()));
            }
            setFillColor(e) {
                this.fillColor !== e &&
                    ((this.fillColor = e),
                    (this.fillColorDirty = !0),
                    this.invalidatePaint());
            }
            setFillOpacity(e) {
                this.fillOpacity !== e &&
                    ((this.fillOpacity = e),
                    (this.fillOpacityDirty = !0),
                    this.invalidatePaint());
            }
            setCollapseExtendVisible(e) {
                this.collapseExtendVisible !== e &&
                    ((this.collapseExtendVisible = e),
                    (this.collapseExtendVisibleDirty = !0),
                    this.invalidatePaint());
            }
            setCollapseBtnVisible(e, t = !1) {
                (t || this.collapseBtnVisible !== e) &&
                    ((this.collapseBtnVisible = e),
                    (this.collapseBtnVisibleDirty = !0),
                    this.invalidatePaint());
            }
            setHoverAreaVisible(e) {
                this.hoverAreaVisible !== e &&
                    ((this.hoverAreaVisible = e),
                    (this.hoverAreaVisibleDirty = !0),
                    this.invalidatePaint());
            }
            setConnectPathAttr(e) {
                const t = h.subtract(this.connectPathAttr, e);
                Object.keys(t).length > 0 &&
                    ((this.connectPathAttrDirty = !0),
                    Object.assign(this.connectPathAttr, t),
                    Object.assign(this.connectPathAttrToPack, t),
                    this.invalidatePaint());
            }
            setHoverAreaAttr(e) {
                const t = h.subtract(this.hoverAreaAttr, e);
                Object.keys(t).length > 0 &&
                    ((this.hoverAreaAttrDirty = !0),
                    Object.assign(this.hoverAreaAttr, t),
                    Object.assign(this.hoverAreaAttrToPack, t),
                    this.invalidatePaint());
            }
        }
        var T = i(52);
        class u extends T.a {}
        var g = i(87);
        class Q extends T.a {}
        class m extends n.a {
            constructor() {
                (super(...arguments),
                    (this.isWebVideoThumbnail = !1),
                    (this.originalSize = { width: 0, height: 0 }));
            }
            setImageUrl(e) {
                this.imageUrl !== e &&
                    ((this.imageUrl = e),
                    (this.imageUrlDirty = !0),
                    this.invalidateLayout(),
                    this.invalidatePaint());
            }
            setIgnoreLoading(e) {
                this.ignoreLoading = e;
            }
            setIsWebVideoThumbnail(e) {
                this.isWebVideoThumbnail !== e &&
                    ((this.isWebVideoThumbnail = e), this.invalidatePaint());
            }
            setOriginalSize(e) {
                (!this.originalSize || !Object(l.o)(this.originalSize, e)) &&
                    (this.originalSize = Object.assign({}, e));
            }
            setBorderPath(e) {
                this.borderPath !== e &&
                    ((this.borderPath = e),
                    (this.borderPathDirty = !0),
                    this.invalidateLayout(),
                    this.invalidatePaint());
            }
            setBorderColor(e) {
                this.borderColor !== e &&
                    ((this.borderColor = e),
                    (this.borderColorDirty = !0),
                    this.invalidatePaint());
            }
            setBorderWidth(e) {
                this.borderWidth !== e &&
                    ((this.borderWidth = e),
                    (this.borderWidthDirty = !0),
                    this.invalidateLayout(),
                    this.invalidatePaint());
            }
            setShadowVisible(e) {
                this.shadowVisible !== e &&
                    ((this.shadowVisible = e),
                    (this.shadowVisibleDirty = !0),
                    this.invalidateLayout(),
                    this.invalidatePaint());
            }
            setLockRatio(e) {
                this.lockRatio !== e &&
                    ((this.lockRatio = e),
                    (this.lockRatioDirty = !0),
                    this.invalidateLayout(),
                    this.invalidatePaint());
            }
            setStaticBackgroundFillColor(e) {
                this.staticBackgroundFillColor !== e &&
                    ((this.staticBackgroundFillColor = e),
                    (this.staticBackgroundFillColorDirty = !0),
                    this.invalidateLayout(),
                    this.invalidatePaint());
            }
        }
        class b extends n.a {
            constructor() {
                (super(...arguments),
                    (this.selectionAttr = {}),
                    (this.selectionAttrToPack = {}));
            }
            setIconUrl(e) {
                this.iconUrl !== e &&
                    ((this.iconUrl = e),
                    (this.iconUrlDirty = !0),
                    this.invalidateLayout());
            }
            setNeedToForward() {
                this.needToForward = !0;
            }
            setNeedToBackward() {
                this.needToBackward = !0;
            }
            setSelectionArr(e) {
                const t = h.subtract(this.selectionAttr, e);
                Object.keys(t).length > 0 &&
                    ((this.selectionAttrDirty = !0),
                    Object.assign(this.selectionAttr, t),
                    Object.assign(this.selectionAttrToPack, t),
                    this.invalidatePaint());
            }
        }
        class C extends n.a {
            setMarkerIdList(e) {
                this.markerIdList !== e &&
                    ((this.markerIdList = e),
                    (this.markerIdListDirty = !0),
                    this.invalidateLayout());
            }
        }
        class L extends n.a {
            constructor() {
                (super(...arguments),
                    (this.textAttr = {}),
                    (this.textAttrToPack = {}),
                    (this.selectionAttr = {}),
                    (this.selectionAttrToPack = {}));
            }
            setTextContent(e) {
                this.textContent !== e &&
                    ((this.textContent = e),
                    (this.textContentDirty = !0),
                    this.invalidatePaint());
            }
            setTextAttr(e) {
                const t = h.subtract(this.textAttr, e);
                Object.keys(t).length > 0 &&
                    ((this.textAttrDirty = !0),
                    Object.assign(this.textAttr, t),
                    Object.assign(this.textAttrToPack, t),
                    this.invalidatePaint());
            }
            setSelectionAttr(e) {
                const t = h.subtract(this.selectionAttr, e);
                Object.keys(t).length > 0 &&
                    ((this.selectionAttrDirty = !0),
                    Object.assign(this.selectionAttr, t),
                    Object.assign(this.selectionAttrToPack, t),
                    this.invalidatePaint());
            }
        }
        class y extends n.a {}
        class M extends n.a {
            constructor() {
                (super(...arguments),
                    (this.backgroudAttr = {}),
                    (this.backgroudAttrToPack = {}),
                    (this.textAttr = {}),
                    (this.textAttrToPack = {}));
            }
            setText(e) {
                this.text !== e &&
                    ((this.text = e),
                    (this.textDirty = !0),
                    this.invalidateLayout(),
                    this.invalidatePaint());
            }
            setTooltip(e) {
                this.tooltip !== e &&
                    ((this.tooltip = e),
                    (this.tooltipDirty = !0),
                    this.invalidatePaint());
            }
            setBackgroudAttr(e) {
                const t = h.subtract(this.backgroudAttr, e);
                Object.keys(t).length > 0 &&
                    ((this.backgroudAttrDirty = !0),
                    Object.assign(this.backgroudAttr, t),
                    Object.assign(this.backgroudAttrToPack, t),
                    this.invalidatePaint());
            }
            setTextAttr(e) {
                const t = h.subtract(this.textAttr, e);
                Object.keys(t).length > 0 &&
                    ((this.textAttrDirty = !0),
                    Object.assign(this.textAttr, t),
                    Object.assign(this.textAttrToPack, t),
                    this.invalidatePaint());
            }
        }
        class A extends n.a {
            constructor() {
                (super(...arguments),
                    (this.transparent = !1),
                    (this.transparentDirty = !1),
                    (this.selectBoxAttrs = {}),
                    (this.selectBoxAttrsToPack = {}),
                    (this.selectBoxAttrsDirty = !1),
                    (this.selectBoxOneAttrs = {}),
                    (this.selectBoxOneAttrsToPack = {}),
                    (this.selectBoxOneAttrsDirty = !1),
                    (this.selectBoxTwoAttrs = {}),
                    (this.selectBoxTwoAttrsToPack = {}),
                    (this.selectBoxTwoAttrsDirty = !1),
                    (this.dragHandlerAreaOneAttrs = {}),
                    (this.dragHandlerAreaOneAttrsToPack = {}),
                    (this.dragHandlerAreaOneAttrsDirty = !1),
                    (this.dragHandlerAreaTwoAttrs = {}),
                    (this.dragHandlerAreaTwoAttrsToPack = {}),
                    (this.dragHandlerAreaTwoAttrsDirty = !1),
                    (this.addTitleButtonAttrs = {}),
                    (this.addTitleButtonAttrsToPack = {}),
                    (this.addTitleButtonAttrsDirty = !1),
                    (this.isVisible = !1));
            }
            setTransparent(e) {
                this.transparent !== e &&
                    ((this.transparent = e),
                    (this.transparentDirty = !0),
                    this.invalidatePaint());
            }
            setSelectBoxAttrs(e) {
                const t = h.subtract(this.selectBoxAttrs, e);
                Object.keys(t).length > 0 &&
                    ((this.selectBoxAttrsDirty = !0),
                    Object.assign(this.selectBoxAttrs, t),
                    Object.assign(this.selectBoxAttrsToPack, t),
                    this.invalidatePaint());
            }
            setSelectBoxOneAttrs(e) {
                const t = h.subtract(this.selectBoxOneAttrs, e);
                Object.keys(t).length > 0 &&
                    ((this.selectBoxOneAttrsDirty = !0),
                    Object.assign(this.selectBoxOneAttrs, t),
                    Object.assign(this.selectBoxOneAttrsToPack, t),
                    this.invalidatePaint());
            }
            setSelectBoxTwoAttrs(e) {
                const t = h.subtract(this.selectBoxTwoAttrs, e);
                Object.keys(t).length > 0 &&
                    ((this.selectBoxTwoAttrsDirty = !0),
                    Object.assign(this.selectBoxTwoAttrs, t),
                    Object.assign(this.selectBoxTwoAttrsToPack, t),
                    this.invalidatePaint());
            }
            setDragHandlerAreaOneAttrs(e) {
                const t = h.subtract(this.dragHandlerAreaOneAttrs, e);
                Object.keys(t).length > 0 &&
                    ((this.dragHandlerAreaOneAttrsDirty = !0),
                    Object.assign(this.dragHandlerAreaOneAttrs, t),
                    Object.assign(this.dragHandlerAreaOneAttrsToPack, t),
                    this.invalidatePaint());
            }
            setDragHandlerAreaTwoAttrs(e) {
                const t = h.subtract(this.dragHandlerAreaTwoAttrs, e);
                Object.keys(t).length > 0 &&
                    ((this.dragHandlerAreaTwoAttrsDirty = !0),
                    Object.assign(this.dragHandlerAreaTwoAttrs, t),
                    Object.assign(this.dragHandlerAreaTwoAttrsToPack, t),
                    this.invalidatePaint());
            }
            setAddTitleButtonAttrs(e) {
                const t = h.subtract(this.addTitleButtonAttrs, e);
                Object.keys(t).length > 0 &&
                    ((this.addTitleButtonAttrsDirty = !0),
                    Object.assign(this.addTitleButtonAttrs, t),
                    Object.assign(this.addTitleButtonAttrsToPack, t),
                    this.invalidatePaint());
            }
        }
        const v = 'hover',
            E = 'active',
            _ = 'hide';
        class O extends n.a {
            setHover() {
                this.displayState !== v &&
                    ((this.displayState = v),
                    (this.displayStateDirty = !0),
                    this.invalidatePaint());
            }
            setActive() {
                this.displayState !== E &&
                    ((this.displayState = E),
                    (this.displayStateDirty = !0),
                    this.invalidatePaint());
            }
            setHide() {
                this.displayState !== _ &&
                    ((this.displayState = _),
                    (this.displayStateDirty = !0),
                    this.invalidatePaint());
            }
            setAvatarDisplay(e) {
                this.avatarDisplay !== e &&
                    ((this.avatarDisplay = e),
                    (this.avatarDisplayDirty = !0),
                    this.invalidatePaint());
            }
            setAvatarSize(e) {
                ((this.avatarSizeDirty = !0),
                    (this.avatarSize = e),
                    this.invalidatePaint());
            }
            setLockRatio(e) {
                this.lockRatio !== e &&
                    ((this.lockRatio = e),
                    (this.lockRatioDirty = !0),
                    this.invalidateLayout(),
                    this.invalidatePaint());
            }
        }
        const S = 'hover',
            x = 'active',
            R = 'hide',
            I = 'defocus',
            N = 'intersect';
        class w extends n.a {
            constructor() {
                (super(...arguments),
                    (this.topicSelectBoxAttr = {}),
                    (this.topicSelectBoxAttrToPack = {}),
                    (this.leftBarAttr = {}),
                    (this.leftBarAttrToPack = {}),
                    (this.rightBarAttr = {}),
                    (this.rightBarAttrToPack = {}));
            }
            setHover() {
                (this.setDisplayStyle(S),
                    this.setDisplayState(!0),
                    this.setBarDisplayState(!1));
            }
            setActive() {
                (this.setDisplayStyle(x),
                    this.setDisplayState(!0),
                    this.setBarDisplayState(!0));
            }
            setHide() {
                (this.setDisplayStyle(R),
                    this.setDisplayState(!1),
                    this.setBarDisplayState(!1));
            }
            setDefocus() {
                (this.setDisplayStyle(I),
                    this.setDisplayState(!0),
                    this.setBarDisplayState(!1));
            }
            setIntersect() {
                (this.setDisplayStyle(N),
                    this.setDisplayState(!0),
                    this.setBarDisplayState(!1));
            }
            setDisplayStyle(e) {
                this.displayStyle !== e &&
                    ((this.displayStyle = e),
                    (this.displayStyleDirty = !0),
                    this.invalidatePaint());
            }
            setDisplayState(e) {
                this.displayState !== e &&
                    ((this.displayState = e),
                    (this.displayStateDirty = !0),
                    this.invalidatePaint());
            }
            setBarDisplayState(e) {
                this.barDisplayState !== e &&
                    ((this.barDisplayState = e),
                    (this.barDisplayStateDirty = !0),
                    this.invalidatePaint());
            }
            setTopicSelectBoxPath(e) {
                this.topicSelectBoxPath !== e &&
                    ((this.topicSelectBoxPath = e),
                    (this.topicSelectBoxPathDirty = !0),
                    this.invalidatePaint());
            }
            setTopicSelectBoxAttr(e) {
                const t = h.subtract(this.topicSelectBoxAttr, e);
                Object.keys(t).length > 0 &&
                    ((this.topicSelectBoxAttrDirty = !0),
                    Object.assign(this.topicSelectBoxAttr, t),
                    Object.assign(this.topicSelectBoxAttrToPack, t),
                    this.invalidatePaint());
            }
            setLeftBarAttr(e, t) {
                const i = h.subtract(this.leftBarAttr, e);
                (t || Object.keys(i).length > 0) &&
                    ((this.leftBarAttrDirty = !0),
                    Object.assign(this.leftBarAttr, t ? e : i),
                    Object.assign(this.leftBarAttrToPack, t ? e : i),
                    this.invalidatePaint());
            }
            setRightBarAttr(e, t) {
                const i = h.subtract(this.rightBarAttr, e);
                (t || Object.keys(i).length > 0) &&
                    ((this.rightBarAttrDirty = !0),
                    Object.assign(this.rightBarAttr, t ? e : i),
                    Object.assign(this.rightBarAttrToPack, t ? e : i),
                    this.invalidatePaint());
            }
        }
        class P extends n.a {
            constructor(e) {
                (super(e), (this.labelInfo = []));
            }
            setLabelInfo(e) {
                this.labelInfo = e;
            }
        }
        class H extends n.a {
            constructor(e) {
                super(e);
            }
            setFillColor(e) {
                this.fillColor !== e &&
                    ((this.fillColor = e),
                    (this.fillColorDirty = !0),
                    this.invalidatePaint());
            }
            setBorderWidth(e) {
                this.borderWidth !== e &&
                    ((this.borderWidth = e),
                    (this.borderWidthDirty = !0),
                    this.invalidatePaint());
            }
            setBorderColor(e) {
                this.borderColor !== e &&
                    ((this.borderColor = e),
                    (this.borderColorDirty = !0),
                    this.invalidatePaint());
            }
        }
        class D extends n.a {
            constructor() {
                (super(...arguments), (this.visible = !1));
            }
            setVisible(e) {
                this.visible !== e &&
                    ((this.visible = e),
                    (this.visibleDirty = !0),
                    this.invalidatePaint());
            }
        }
        class F extends n.a {
            constructor(e) {
                (super(e),
                    (this.size = { width: 0, height: 0 }),
                    (this.sizeDirty = !1),
                    (this.cellBoundsPosition = { x: 0, y: 0 }),
                    (this.cellBoundsPositionDirty = !1),
                    (this.borderLineWidth = 0),
                    (this.borderLineWidthDirty = !1),
                    (this.borderLineColor = ''),
                    (this.borderLineColorDirty = !1),
                    (this.fillColor = ''),
                    (this.fillColorDirty = !1),
                    (this.fillPattern = ''),
                    (this.fillPatternDirty = !1),
                    (this.selectBoxAttr = {}),
                    (this.selectBoxAttrDirty = !1),
                    (this.borderLinePattern = o.LINE_PATTERN.SOLID),
                    (this.borderLinePatternDirty = !1));
            }
            setSize(e) {
                (!this.size || !Object(h.isSame)(this.size, e)) &&
                    ((this.sizeDirty = !0),
                    (this.size = Object.assign({}, e)),
                    this.invalidatePaint());
            }
            setCellBoundsPosition(e) {
                (!e ||
                    !(
                        this.cellBoundsPosition.x === e.x &&
                        this.cellBoundsPosition.y === e.y
                    )) &&
                    ((this.cellBoundsPositionDirty = !0),
                    (this.cellBoundsPosition = Object.assign({}, e)),
                    this.invalidatePaint());
            }
            setBorderLineWidth(e) {
                this.borderLineWidth !== e &&
                    ((this.borderLineWidthDirty = !0),
                    (this.borderLineWidth = e),
                    this.invalidatePaint());
            }
            setBorderLineColor(e) {
                this.borderLineColor !== e &&
                    ((this.borderLineColorDirty = !0),
                    (this.borderLineColor = e),
                    this.invalidatePaint());
            }
            setBorderLinePattern(e) {
                this.borderLinePattern !== e &&
                    ((this.borderLinePatternDirty = !0),
                    (this.borderLinePattern = e),
                    this.invalidatePaint());
            }
            setSelectBoxAttr(e) {
                Object(h.isSame)(this.selectBoxAttr, e) ||
                    ((this.selectBoxAttr = e),
                    (this.selectBoxAttrDirty = !0),
                    this.invalidatePaint());
            }
            setFillColor(e) {
                this.fillColor !== e &&
                    ((this.fillColorDirty = !0),
                    (this.fillColor = e),
                    this.invalidatePaint());
            }
            setFillPattern(e) {
                this.fillPattern !== e &&
                    ((this.fillPatternDirty = !0),
                    (this.fillPattern = e),
                    this.invalidatePaint());
            }
        }
        class k extends T.a {
            setFillPattern(e) {
                this.fillPattern !== e &&
                    ((this.fillPattern = e),
                    (this.fillPatternDirty = !0),
                    this.invalidatePaint());
            }
            setBoundaryTitleBGFillColor(e) {
                this.bgFillColor !== e &&
                    ((this.bgFillColor = e),
                    (this.bgFillColorDirty = !0),
                    this.invalidatePaint());
            }
            setVisible(e, t) {
                (super.setVisible(e, t),
                    this.isVisibleDirty &&
                        this.viewController.parent().figure.invalidateLayout());
            }
        }
        var B = i(9);
        class V extends n.a {
            constructor() {
                (super(...arguments),
                    (this.originalSize = { width: 0, height: 0 }),
                    (this.align = 'top'),
                    (this.errorCode = 0),
                    (this.errorMessage = ''));
            }
            setText(e) {
                this.text !== e &&
                    ((this.text = e),
                    (this.textDirty = !0),
                    this.invalidateLayout(),
                    this.invalidatePaint());
            }
            setSVGOutput(e) {
                e &&
                    ((this.SVGOutput = e),
                    (this.SVGOutputDirty = !0),
                    this.invalidateLayout(),
                    this.invalidatePaint());
            }
            setOriginalSize(e) {
                (!this.originalSize || !Object(l.o)(this.originalSize, e)) &&
                    ((this.originalSize = Object.assign({}, e)),
                    this.finalWidth || this.setFinalWidth(e.width),
                    this.invalidateLayout(),
                    this.invalidatePaint());
            }
            setFinalWidth(e) {
                this.finalWidth !== e &&
                    ((this.finalWidth = Math.min(B.a.MATH_JAX_MAX_WIDTH, e)),
                    this.invalidateLayout(),
                    this.invalidatePaint());
            }
            setAlign(e) {
                this.align !== e &&
                    ((this.align = e),
                    (this.alignDirty = !0),
                    this.invalidateLayout(),
                    this.invalidatePaint());
            }
            setTextColor(e) {
                this.textColor !== e &&
                    ((this.textColor = e),
                    (this.textColorDirty = !0),
                    this.invalidateLayout(),
                    this.invalidatePaint());
            }
            setErrorCode(e) {
                this.errorCode !== e && (this.errorCode = e);
            }
            setErrorMessage(e) {
                this.errorMessage !== e && (this.errorMessage = e);
            }
        }
        class Y extends n.a {
            constructor(e) {
                (super(e),
                    (this.bodyWidth =
                        h.layoutConstant.FISH_BONE.HEAD_BONE_LINE_MIN_BODY_WIDTH),
                    (this.styleWidth = 0),
                    (this.lineColor = ''),
                    (this.lineTapered = !1),
                    (this.direction = o.DIRECTION.RIGHT),
                    (this.linePattern = o.LINE_PATTERN.SOLID));
            }
            setBodyWidth(e) {
                (e = Math.max(
                    e,
                    h.layoutConstant.FISH_BONE.HEAD_BONE_LINE_MIN_BODY_WIDTH
                )) !== this.bodyWidth &&
                    ((this.bodyWidth = e), this.invalidatePaint());
            }
            setStyleWidth(e) {
                this.styleWidth !== e &&
                    ((this.styleWidth = e), this.invalidatePaint());
            }
            setLineColor(e) {
                this.lineColor !== e &&
                    ((this.lineColor = e), this.invalidatePaint());
            }
            setLineTapered(e) {
                this.lineTapered !== e &&
                    ((this.lineTapered = e), this.invalidatePaint());
            }
            setDirection(e) {
                this.direction !== e &&
                    ((this.direction = e), this.invalidatePaint());
            }
            setLinePattern(e) {
                this.linePattern !== e &&
                    ((this.linePattern = e), this.invalidatePaint());
            }
        }
        class G extends n.a {
            constructor(e) {
                (super(e),
                    (this.styleWidth = 0),
                    (this.lineColor = ''),
                    (this.startPosition = { x: 0, y: 0 }),
                    (this.endPosition = { x: 0, y: 0 }),
                    (this.lineTapered = !1),
                    (this.linePattern = o.LINE_PATTERN.SOLID),
                    (this.endArrowClass = o.ARROW_CLASS.NONE),
                    Object(r.makeObservable)(this, {
                        lineColor: r.observable,
                        setLineColor: r.action,
                        endArrowClass: r.observable,
                        setEndArrowClass: r.action,
                    }));
            }
            setStartPosition(e) {
                Object(h.isSame)(this.startPosition, e) ||
                    ((this.startPosition = e), this.invalidatePaint());
            }
            setEndPosition(e) {
                Object(h.isSame)(this.endPosition, e) ||
                    ((this.endPosition = e), this.invalidatePaint());
            }
            setLineTapered(e) {
                this.lineTapered !== e &&
                    ((this.lineTapered = e), this.invalidatePaint());
            }
            setStyleWidth(e) {
                this.styleWidth !== e &&
                    ((this.styleWidth = e), this.invalidatePaint());
            }
            setLineColor(e) {
                this.lineColor !== e &&
                    ((this.lineColor = e), this.invalidatePaint());
            }
            setLinePattern(e) {
                this.linePattern !== e &&
                    ((this.linePattern = e), this.invalidatePaint());
            }
            setEndArrowClass(e) {
                (e || o.ARROW_CLASS.NONE,
                    (this.endArrowClass = e),
                    this.invalidatePaint());
            }
        }
        const U = {
                fill: '#2ebdff',
                rx: '3',
                width: 40,
                height: 15,
            },
            j = { fill: '#2ebdff', rx: '0' };
        class $ extends n.a {
            constructor() {
                (super(...arguments),
                    (this.startBranch = null),
                    (this.isBranchDirty = !1),
                    (this.isTableLike = !1),
                    (this.isTableLikeDirty = !1),
                    (this.lineAttrs = {
                        'stroke-width': '2',
                        stroke: '#2ebdff',
                        fill: 'none',
                    }),
                    (this.boxAttrs = {}));
            }
            updateLineAttrs(e) {
                ((this.lineAttrs = Object.assign(
                    Object.assign({}, this.lineAttrs),
                    e
                )),
                    this.invalidatePaint());
            }
            updateBoxAttrs(e, t) {
                const i = t ? j : U;
                ((this.boxAttrs = Object.assign(Object.assign({}, i), e)),
                    this.invalidatePaint());
            }
            updateBoxPos(e, t) {
                const i = ((e) => {
                        switch (e) {
                            case o.DIRECTION.UP:
                                return { x: -20, y: 0 };
                            case o.DIRECTION.DOWN:
                                return { x: -20, y: -15 };
                            case o.DIRECTION.RIGHT:
                                return { x: -40, y: -7.5 };
                            case o.DIRECTION.LEFT:
                                return { x: 0, y: -7.5 };
                            case o.DIRECTION.NONE:
                            default:
                                return { x: -20, y: -7.5 };
                        }
                    })(t),
                    n = Object(l.c)(e, i);
                ((this.boxAttrs = Object.assign(Object.assign({}, U), n)),
                    this.invalidatePaint());
            }
            updateStartBranch(e) {
                this.startBranch !== e &&
                    ((this.startBranch = e),
                    (this.isBranchDirty = !0),
                    this.invalidatePaint());
            }
        }
        class z extends n.a {
            constructor(e) {
                (super(e),
                    (this.isVisible = !0),
                    (this.isVisibleDirty = !1),
                    (this.lineWidth =
                        h.layoutConstant.TIMELINE.MAIN_LINE_WIDTH),
                    (this.lineWidthDirty = !1),
                    (this.lineColorDirty = !1),
                    (this.lineStepPointsDirty = !1),
                    (this.linePattern = {}),
                    (this.linePatternDirty = !1));
            }
            setDirection(e) {
                this.direction = e;
            }
            setVisible(e) {
                ((this.isVisible = e),
                    (this.isVisibleDirty = !0),
                    this.invalidatePaint());
            }
            setLineColor(e) {
                ((this.lineColor = e),
                    (this.lineColorDirty = !0),
                    this.invalidatePaint());
            }
            setLineWidth(e) {
                ((this.lineWidth = e),
                    (this.lineWidthDirty = !0),
                    this.invalidatePaint());
            }
            setStartPosition(e) {
                (this.startPosition &&
                    Object(h.isSame)(e, this.startPosition)) ||
                    ((this.startPosition = e), this.invalidatePaint());
            }
            setEndPosition(e) {
                (this.endPosition && Object(h.isSame)(e, this.endPosition)) ||
                    ((this.endPosition = e), this.invalidatePaint());
            }
            setLineStepPoints(e) {
                (this.lineStepPoints &&
                    Object(h.isSame)(e, this.lineStepPoints)) ||
                    ((this.lineStepPoints = e),
                    (this.lineStepPointsDirty = !0),
                    this.invalidatePaint());
            }
            setLinePattern(e) {
                (this.linePattern && Object(h.isSame)(e, this.linePattern)) ||
                    ((this.linePattern = e),
                    (this.linePatternDirty = !0),
                    this.invalidatePaint());
            }
        }
        const W = {
            [o.FIGURE_TYPE.SHEET]: a,
            [o.FIGURE_TYPE.CONNECTION]: c,
            [o.FIGURE_TYPE.TOPIC]: f,
            [o.FIGURE_TYPE.TOPIC_TITLE]: u,
            [o.FIGURE_TYPE.BRANCH]: s,
            [o.FIGURE_TYPE.RELATIONSHIP]: class extends d {
                constructor(e) {
                    (super(e),
                        (this.lineWidth = 0),
                        (this.lineWidthDirty = !0),
                        (this.lineColor = ''),
                        (this.lineColorDirty = !0),
                        (this.beginArrowClass = o.ARROW_CLASS.NONE),
                        (this.beginArrowClassDirty = !0),
                        (this.endArrowClass = o.ARROW_CLASS.NONE),
                        (this.endArrowClassDirty = !0),
                        Object(r.makeObservable)(this, {
                            lineColor: r.observable,
                            setLineColor: r.action,
                            beginArrowClass: r.observable,
                            setBeginArrowClass: r.action,
                            endArrowClass: r.observable,
                            setEndArrowClass: r.action,
                        }));
                }
                setLineWidth(e) {
                    ((e = parseInt(`${e}`)),
                        this.lineWidth !== e &&
                            ((this.lineWidth = e),
                            (this.lineWidthDirty = !0),
                            (this.linePatternDirty = !0),
                            this.invalidatePaint(),
                            this.invalidateLayout()));
                }
                setLineColor(e) {
                    this.lineColor !== e &&
                        ((this.lineColor = e),
                        (this.lineColorDirty = !0),
                        this.invalidatePaint());
                }
                setLineStyle(e) {
                    this.lineStyle !== e &&
                        ((this.lineStyle = e),
                        (this.lineStyleDirty = !0),
                        this.invalidatePaint(),
                        this.invalidateLayout());
                }
                setLinePattern(e) {
                    this.linePattern !== e &&
                        ((this.linePattern = e),
                        (this.linePatternDirty = !0),
                        this.invalidatePaint(),
                        this.invalidateLayout());
                }
                setPosInfo(e) {
                    ((this.posInfo = e),
                        (this.posInfoDirty = !0),
                        this.invalidatePaint());
                }
                setRelationshipMaskD(e) {
                    this.relationshipMaskD !== e &&
                        ((this.relationshipMaskD = e),
                        (this.relationshipMaskDirty = !0),
                        this.invalidatePaint());
                }
                setMaskVisible(e) {
                    this.maskVisible !== e &&
                        ((this.maskVisible = e),
                        (this.maskVisibleDirty = !0),
                        this.invalidatePaint());
                }
                setRelationshipPath(e) {
                    this.relationshipPath !== e &&
                        ((this.relationshipPath = e),
                        (this.relationshipPathDirty = !0),
                        this.invalidatePaint());
                }
                setControlLine1Path(e) {
                    this.controlLine1Path !== e &&
                        ((this.controlLine1Path = e),
                        (this.controlLine1PathDirty = !0),
                        this.invalidatePaint());
                }
                setControlLine2Path(e) {
                    this.controlLine2Path !== e &&
                        ((this.controlLine2Path = e),
                        (this.controlLine2PathDirty = !0),
                        this.invalidatePaint());
                }
                setStartPoint1Radius(e) {
                    (this.startPoint1Radius &&
                        e.rx === this.startPoint1Radius.rx &&
                        e.ry === this.startPoint1Radius.ry) ||
                        ((this.startPoint1Radius = e),
                        (this.startPoint1RadiusDirty = !0),
                        this.invalidatePaint());
                }
                setStartPoint2Radius(e) {
                    (this.startPoint2Radius &&
                        e.rx === this.startPoint2Radius.rx &&
                        e.ry === this.startPoint2Radius.ry) ||
                        ((this.startPoint2Radius = e),
                        (this.startPoint2RadiusDirty = !0),
                        this.invalidatePaint());
                }
                setControlPoint1Radius(e) {
                    (this.controlPoint1Radius &&
                        e.rx === this.controlPoint1Radius.rx &&
                        e.ry === this.controlPoint1Radius.ry) ||
                        ((this.controlPoint1Radius = e),
                        (this.controlPoint1RadiusDirty = !0),
                        this.invalidatePaint());
                }
                setControlPoint2Radius(e) {
                    (this.controlPoint2Radius &&
                        e.rx === this.controlPoint2Radius.rx &&
                        e.ry === this.controlPoint2Radius.ry) ||
                        ((this.controlPoint2Radius = e),
                        (this.controlPoint2RadiusDirty = !0),
                        this.invalidatePaint());
                }
                setControlPointGroupVisible(e) {
                    this.controlPointGroupVisible !== e &&
                        ((this.controlPointGroupVisible = e),
                        (this.controlPointGroupVisibleDirty = !0),
                        this.invalidatePaint());
                }
                setPointerEventsNone(e) {
                    this.pointerEventsNone !== e &&
                        ((this.pointerEventsNone = e),
                        (this.pointerEventsNoneDirty = !0),
                        this.invalidatePaint());
                }
                setBeginArrowClass(e) {
                    this.beginArrowClass !== e &&
                        ((this.beginArrowClass = e),
                        (this.beginArrowClassDirty = !0),
                        this.invalidatePaint(),
                        this.invalidateLayout());
                }
                setEndArrowClass(e) {
                    this.endArrowClass !== e &&
                        ((this.endArrowClass = e),
                        (this.endArrowClassDirty = !0),
                        this.invalidatePaint(),
                        this.invalidateLayout());
                }
            },
            [o.FIGURE_TYPE.RELATIONSHIP_TITLE]: g.a,
            [o.FIGURE_TYPE.NUMBERING]: Q,
            [o.FIGURE_TYPE.COLLAPSE_EXTEND]: p,
            [o.FIGURE_TYPE.IMAGE]: m,
            [o.FIGURE_TYPE.MARKERS]: C,
            [o.FIGURE_TYPE.MARKER]: b,
            [o.FIGURE_TYPE.INFORMATION]: L,
            [o.FIGURE_TYPE.LABELS]: y,
            [o.FIGURE_TYPE.LABEL]: M,
            [o.FIGURE_TYPE.BOUNDARY]: class extends d {
                constructor(e) {
                    (super(e),
                        (this.lineColor = ''),
                        (this.boundaryShapeSize = {
                            width: -1,
                            height: -1,
                        }),
                        (this.isVisible = !1),
                        Object(r.makeObservable)(this, {
                            lineColor: r.observable,
                            setLineColor: r.action,
                        }));
                }
                setLineColor(e) {
                    this.lineColor !== e &&
                        ((this.lineColor = e),
                        (this.lineColorDirty = !0),
                        this.invalidatePaint());
                }
                setLinePattern(e) {
                    this.linePattern !== e &&
                        ((this.linePattern = e),
                        (this.linePatternDirty = !0),
                        this.invalidatePaint());
                }
                setFillColor(e) {
                    this.fillColor !== e &&
                        ((this.fillColor = e),
                        (this.fillColorDirty = !0),
                        this.invalidatePaint());
                }
                setBorderWidth(e) {
                    ((e = parseInt(`${e}`)),
                        this.borderWidth !== e &&
                            ((this.borderWidth = e),
                            (this.borderWidthDirty = !0),
                            (this.linePatternDirty = !0),
                            this.invalidateLayout()));
                }
                setFillOpacity(e) {
                    this.fillOpacity !== e &&
                        ((this.fillOpacity = e),
                        (this.fillOpacityDirty = !0),
                        this.invalidatePaint());
                }
                setShapeClass(e) {
                    this.shapeClass !== e &&
                        ((this.shapeClass = e),
                        (this.shapeClassDirty = !0),
                        this.invalidatePaint());
                }
                setBoundaryShapeSize(e) {
                    (!this.boundaryShapeSize ||
                        !Object(l.o)(this.boundaryShapeSize, e)) &&
                        ((this.boundaryShapeSizeDirty = !0),
                        (this.boundaryShapeSize = Object.assign({}, e)),
                        this.invalidateLayout(),
                        this.invalidatePaint());
                }
                setBoundaryPath(e) {
                    this.boundaryPath !== e &&
                        ((this.boundaryPath = e),
                        (this.boundaryPathDirty = !0),
                        this.invalidatePaint());
                }
                setBoundaryFillPath(e) {
                    this.boundaryFillPath !== e &&
                        ((this.boundaryFillPath = e),
                        (this.boundaryFillPathDirty = !0),
                        this.invalidatePaint());
                }
                setFillPattern(e) {
                    this.fillPattern !== e &&
                        ((this.fillPattern = e),
                        (this.fillPatternDirty = !0),
                        this.invalidatePaint());
                }
            },
            [o.FIGURE_TYPE.SELECT_BOX]: A,
            [o.FIGURE_TYPE.RESIZE_BOX]: O,
            [o.FIGURE_TYPE.TOPIC_SELECT_BOX]: w,
            [o.FIGURE_TYPE.PLACE_HOLDER_TOPIC]: class extends f {},
            [o.FIGURE_TYPE.MATRIX]: P,
            [o.FIGURE_TYPE.MATRIX_LABEL]: T.a,
            [o.FIGURE_TYPE.MATRIX_CELL]: H,
            [o.FIGURE_TYPE.MATRIX_PLUS]: D,
            [o.FIGURE_TYPE.TREE_TABLE_CELL]: F,
            [o.FIGURE_TYPE.BOUNDARY_TITLE]: k,
            [o.FIGURE_TYPE.MATH_JAX]: V,
            [o.FIGURE_TYPE.FISH_BONE_HEAD_LINE]: Y,
            [o.FIGURE_TYPE.FISH_BONE_MAIN_LINE]: G,
            [o.FIGURE_TYPE.INDICATOR]: $,
            [o.FIGURE_TYPE.TIMELINE_MAIN_LINE]: z,
        };
        var K = {
            createFigure(e) {
                const t = e.figureType,
                    i = W[t];
                if (!i) throw new Error(`Invalid figure type: ${t}`);
                return new i(e);
            },
        };
        t.a = K;
    },
];
