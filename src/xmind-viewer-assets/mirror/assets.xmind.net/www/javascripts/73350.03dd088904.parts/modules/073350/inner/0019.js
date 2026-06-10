export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return pt;
        });
        var n = i(20),
            r = i(0),
            o = i(12),
            a = i.n(o),
            s = i(4);
        class l {
            constructor(e) {
                ((this.connectionMaskMap = new Map()),
                    (this.figure = e),
                    this.initSVGStructure());
            }
            initSVGStructure() {
                ((this.svg = new s.a.G().data('name', 'sheet')),
                    (this.matrixContainer = this.svg
                        .group()
                        .data('name', 'matrix-container')),
                    (this.treeTableCellContainer = this.svg
                        .group()
                        .data('name', 'tree-map-cell-container')),
                    (this.connectionContainer = this.svg
                        .group()
                        .data('name', 'connection-container')),
                    (this.boundaryContainer = this.svg
                        .group()
                        .data('name', 'boundary-container')),
                    (this.branchContainer = this.svg
                        .group()
                        .data('name', 'branch-container')),
                    (this.relationshipContainer = this.svg
                        .group()
                        .data('name', 'relationship-container')),
                    (this.selectBoxContainer = this.svg
                        .group()
                        .data('name', 'select-box-container')),
                    (this.topicSelectBoxContainer = this.svg
                        .group()
                        .data('name', 'topic-select-box-container')),
                    (this.otherContainer = this.svg
                        .group()
                        .data('name', 'other-container')),
                    (this._cloneG = this.svg
                        .group()
                        .data('name', 'cloneG')
                        .opacity(0.5)));
            }
            work() {
                const e = this.figure.viewController.getContext();
                if (!e) return;
                const t = e.getSVGView().svg.node;
                if (
                    (this.figure.wallpaperDirty &&
                        (a()(t)
                            .siblings('.wallpaper')
                            .css({
                                'background-image': `url(${this.figure.wallpaper})`,
                            }),
                        (this.figure.wallpaperDirty = !1)),
                    this.figure.backgroundColorDirty)
                ) {
                    let e = this.figure.backgroundColor;
                    ('none' === e && (e = 'transparent'),
                        a()(t).css({ 'background-color': e }),
                        (this.figure.backgroundColorDirty = !1));
                }
                (this.figure.opacityDirty &&
                    (a()(t)
                        .siblings('.wallpaper')
                        .css({ opacity: this.figure.opacity }),
                    (this.figure.opacityDirty = !1)),
                    this.figure.isVisibleDirty &&
                        (this.figure.isVisible
                            ? this.svg.show()
                            : this.svg.hide(),
                        (this.figure.isVisibleDirty = !1)));
            }
            appendChild(e, t, i) {
                switch (e) {
                    case 'branch':
                        t.parent !== this.branchContainer &&
                            this.branchContainer.add(t);
                        break;
                    case 'relationship':
                        t.parent !== this.relationshipContainer &&
                            this.relationshipContainer.add(t);
                        break;
                    case 'boundary':
                        t.parent !== this.boundaryContainer &&
                            this.boundaryContainer.add(t);
                        break;
                    case 'connection':
                        this.appendChildNodeToTargetContainer(
                            t,
                            this.connectionContainer,
                            i.connectionSubContainerId,
                            (e) => {
                                const t = this.connectionMaskMap.get(
                                    i.connectionSubContainerId
                                );
                                (null == t ? void 0 : t.parent)
                                    ? e.maskWith(t)
                                    : this.connectionMaskMap.delete(
                                          i.connectionSubContainerId
                                      );
                            }
                        );
                        break;
                    case 'connectionmask':
                        this.appendConnectionMask(
                            t,
                            i.connectionSubContainerId
                        );
                        break;
                    case 'selectbox':
                        t.parent !== this.selectBoxContainer &&
                            this.selectBoxContainer.add(t);
                        break;
                    case 'topicselectbox':
                        t.parent !== this.topicSelectBoxContainer &&
                            this.topicSelectBoxContainer.add(t);
                        break;
                    case 'indicator':
                        t.parent !== this.otherContainer &&
                            this.otherContainer.add(t);
                        break;
                    case 'treetablecell':
                        this.appendChildNodeToTargetContainer(
                            t,
                            this.treeTableCellContainer,
                            i.treeTableHeadBranchViewId
                        );
                        break;
                    case 'fishboneheadline':
                        this.appendChildNodeToTargetContainer(
                            t,
                            this.connectionContainer,
                            i.fishBoneHeadBranchViewId
                        );
                        break;
                    case 'fishbonemainline':
                        this.appendChildNodeToTargetContainer(
                            t,
                            this.connectionContainer,
                            i.fishBoneHeadBranchViewId,
                            () => {
                                t.back();
                            }
                        );
                }
            }
            appendChildNodeToTargetContainer(e, t, i, n = (e) => {}) {
                var r;
                let o =
                    null === (r = t.node.querySelector(`[data-id="${i}"]`)) ||
                    void 0 === r
                        ? void 0
                        : r.instance;
                (o || (o = t.group().data('id', i)),
                    e.parent !== o && (o.add(e), n(o)));
            }
            appendConnectionMask(e, t) {
                var i;
                this.connectionMaskMap.set(t, e);
                let n =
                    null ===
                        (i = this.connectionContainer.node.querySelector(
                            `[data-id="${t}"]`
                        )) || void 0 === i
                        ? void 0
                        : i.instance;
                n && n.maskWith(e);
            }
            getContent() {
                return this.svg;
            }
            dispose() {
                this.svg.remove();
            }
        }
        var c = i(1);
        class d {
            constructor(e) {
                ((this.figure = e), this.initSVGStructure());
            }
            initSVGStructure() {
                ((this.svg = new s.a.G().data('name', 'branch')),
                    this.figure.viewController.setElement(this.svg.node));
            }
            work() {
                const e = this.figure.getParent();
                if (e) {
                    if (this.figure.positionDirty) {
                        const e = Object.assign({}, this.figure.position);
                        (this.svg.translate(e.x, e.y),
                            (this.figure.positionDirty = !1));
                    }
                    (this.figure.isVisibleDirty &&
                        (this.figure.isVisible
                            ? this.svg.show()
                            : this.svg.hide(),
                        (this.figure.isVisibleDirty = !1)),
                        this.figure.sizeDirty && (this.figure.sizeDirty = !1),
                        this.figure.opacityDirty &&
                            (this.svg.attr('opacity', this.figure.opacity),
                            (this.figure.opacityDirty = !1)),
                        this.figure.connectionMasked
                            ? (this.addConnectionMask(),
                              this.updateConnectionMaskClipPath())
                            : this.removeConnectionMask(),
                        this.figure.connectionMaskDirty &&
                            this.figure.connectionMasked &&
                            (this.updateConnectionMaskClipPath(),
                            (this.figure.connectionMaskDirty = !1)),
                        e.renderWorker.appendChild('branch', this.svg));
                }
            }
            appendChild(e, t, i) {
                const n = this.figure.viewController.sheetView;
                if (!n) return;
                const r = n.figure.renderWorker;
                switch (e) {
                    case 'branch':
                    case 'connection':
                    case 'connectionmask':
                    case 'boundary':
                    case 'selectbox':
                    case 'topicselectbox':
                    case 'treetablecell':
                    case 'fishboneheadline':
                    case 'fishbonemainline':
                        r.appendChild(e, t, i);
                        break;
                    case 'topic':
                    case 'collapseextend':
                    case 'fishbonemainline':
                    case 'timelinemainline':
                        t.parent !== this.svg && this.svg.add(t);
                }
            }
            getContent() {
                return this.svg;
            }
            addConnectionMask() {
                if (this.s$connectionMask) return;
                const e = this.figure.viewController.getContext().getSVGView();
                ((this.s$connectionMask = e.svg.mask()),
                    this.s$connectionMask.attr({
                        maskUnits: 'userSpaceOnUse',
                        x: '-1000%',
                        y: '-1000%',
                        width: '2000%',
                        height: '2000%',
                    }),
                    (this.s$maskRegion = new s.a.Rect().attr({
                        fill: 'white',
                        x: '-1000%',
                        y: '-1000%',
                        width: '2000%',
                        height: '2000%',
                    })),
                    (this.s$cutRegion = new s.a.Path().attr({
                        fill: 'black',
                    })),
                    this.s$connectionMask.add(this.s$maskRegion),
                    this.s$connectionMask.add(this.s$cutRegion),
                    this.figure
                        .getParent()
                        .renderWorker.appendChild(
                            'connectionmask',
                            this.s$connectionMask,
                            {
                                connectionSubContainerId:
                                    this.figure.viewController.model.getId(),
                            }
                        ));
            }
            updateConnectionMaskClipPath() {
                const e = Object(c.getMaskAttr)(this.figure.viewController);
                this.s$cutRegion.attr(e);
            }
            removeConnectionMask() {
                this.s$connectionMask &&
                    (this.s$connectionMask.remove(),
                    (this.s$connectionMask = null));
            }
            dispose() {
                (this.removeConnectionMask(), this.svg.remove());
            }
        }
        var f = i(17);
        function h(e) {
            let t = e.parent();
            for (
                ;
                (i = t),
                    !Object(c.isCentralBranch)(i) &&
                        !Object(c.isDetachedBranch)(i) &&
                        t.parent() instanceof f.a;
            )
                t = t.parent();
            var i;
            return t.model.getId();
        }
        class p {
            constructor(e) {
                ((this.figure = e), this.initSVGStructure());
            }
            initSVGStructure() {
                this.s$svg = new s.a.Path()
                    .data('name', 'connection')
                    .attr('stroke-linecap', 'round');
            }
            work() {
                const e = this.figure.getParent();
                if (!e) return;
                const t = this.figure.viewController.parent();
                if (
                    Object(c.isDetachedBranch)(t) ||
                    Object(c.isCentralBranch)(t)
                )
                    return;
                (this.figure.isVisible ? this.s$svg.show() : this.s$svg.hide(),
                    this.figure.linePathDirty &&
                        (this.updateLinePattern(),
                        (this.figure.linePathDirty = !1)),
                    this.figure.lineColorDirty &&
                        (this.s$svg.attr('stroke', this.figure.lineColor),
                        (this.figure.lineColorDirty = !1)),
                    this.figure.linePatternDirty &&
                        (this.updateLinePattern(),
                        (this.figure.linePathDirty = !1)),
                    this.updateLineTaperedStyle(),
                    this.connectionSelectBox &&
                        (this.figure.isVisible
                            ? this.connectionSelectBox.show()
                            : this.connectionSelectBox.hide(),
                        this.figure.selectBoxAttrsDirty &&
                            (this.connectionSelectBox.attr(
                                this.figure.selectBoxAttrsToPack
                            ),
                            (this.figure.selectBoxAttrsToPack = {}),
                            (this.figure.selectBoxAttrsDirty = !1))),
                    this.figure.positionDirty &&
                        (this.s$svg.translate(
                            this.figure.position.x,
                            this.figure.position.y
                        ),
                        this.connectionSelectBox &&
                            this.connectionSelectBox.translate(
                                this.figure.position.x,
                                this.figure.position.y
                            ),
                        (this.figure.positionDirty = !1)),
                    this.figure.isVisibleDirty &&
                        (this.figure.isVisibleDirty = !1),
                    this.figure.opacityDirty &&
                        (this.s$svg.attr('opacity', this.figure.opacity),
                        (this.figure.opacityDirty = !1)));
                const i = {
                        connectionSubContainerId: h(this.figure.viewController),
                    },
                    n = e.renderWorker;
                (n.appendChild('connection', this.s$svg, i),
                    this.connectionSelectBox &&
                        n.appendChild(
                            'connection',
                            this.connectionSelectBox,
                            i
                        ));
            }
            updateLineTaperedStyle() {
                const e =
                    this.figure.lineTapered &&
                    ![
                        r.LINE_PATTERN.HANDDRAWNDASH,
                        r.LINE_PATTERN.HANDDRAWNSOLID,
                    ].includes(this.figure.linePattern);
                (this.s$svg.attr('stroke-width', e ? 0 : this.figure.lineWidth),
                    this.s$svg.attr(
                        'fill',
                        e ? this.figure.lineColor : 'none'
                    ));
            }
            updateLinePattern() {
                const e = this.figure.viewController.parent(),
                    t = e.parent(),
                    i = t.getStructureClass(),
                    n = Object(c.getComplexLinePatternAttr)(
                        this.figure.linePattern,
                        {
                            lineWidth: this.figure.lineWidth,
                            linePath: this.figure.linePath,
                            isTaperedLine: this.figure.lineTapered,
                            startBranchPosition: t.getRealPosition(),
                            endBranchPosition: e.getRealPosition(),
                            isTopicConnection: !this.figure.lineTapered,
                            figure: this.figure,
                            structureClass: i,
                        }
                    );
                this.s$svg.attr(n);
            }
            appendChild(e, t, i) {}
            getContent() {
                return this.s$svg;
            }
            dispose() {
                (this.connectionSelectBox &&
                    (this.connectionSelectBox.remove(),
                    (this.connectionSelectBox = null)),
                    this.s$svg.remove());
            }
        }
        var T = i(14),
            u = i(28);
        class g {
            constructor(e) {
                ((this.figure = e), this.initSVGStructure());
            }
            initSVGStructure() {
                ((this.svg = new s.a.G().data('name', 'topic')),
                    (this.topicShapeGroup = new s.a.G().data(
                        'name',
                        'topic-shape-group'
                    )),
                    (this.topicShapeShallowFill = this.topicShapeGroup
                        .put(this.protectedCreateTopicShapeFill())
                        .data('name', 'topic-shape-shallow-fill')),
                    (this.topicShapeFill = this.topicShapeGroup
                        .put(this.protectedCreateTopicShapeFill())
                        .data('name', 'topic-shape-fill')),
                    (this.topicShape = this.topicShapeGroup
                        .put(new s.a.Path())
                        .data('name', 'topic-shape')
                        .attr('fill', 'none')),
                    (this.topicContent = this.topicShapeGroup.put(
                        new s.a.G().data('name', 'topic-content')
                    )),
                    (this.s$topicInnerElementGroup = this.topicContent.put(
                        new s.a.G().data('name', 'inner-element-group')
                    )),
                    this.svg.put(this.topicShapeGroup),
                    this.figure.viewController.setElement(this.svg.node));
            }
            protectedCreateTopicShapeFill() {
                return new s.a.Path();
            }
            work() {
                const e = this.figure.getParent();
                if (!e) return;
                const t = this.figure.viewController.parent().editDomain();
                (this.figure.topicShapeMaskDirty &&
                    (this.figure.topicShapeMaskDirty = !1),
                    ((t && this.figure.fillColorDirty) ||
                        this.figure.fillGradientDirty ||
                        this.figure.isGradientColorDirty) &&
                        (this.updateFillStyle(),
                        (this.figure.fillColorDirty = !1),
                        (this.figure.fillGradientDirty = !1),
                        (this.figure.isGradientColorDirty = !1)),
                    this.figure.borderColorDirty &&
                        (this.topicShape.attr({
                            fill: 'none',
                            stroke: this.figure.borderColor,
                        }),
                        (this.figure.borderColorDirty = !1)),
                    this.figure.borderWidthDirty &&
                        (this.topicShape.attr({
                            'stroke-width': this.figure.borderWidth,
                        }),
                        (this.figure.borderWidthDirty = !1)),
                    this.figure.borderLinePatternDirty &&
                        (this.updateLineAttr(),
                        (this.figure.borderLinePatternDirty = !1)),
                    (this.figure.shapeClassDirty || this.figure.sizeDirty) &&
                        (this.updateFillPattern(),
                        this.updateLineAttr(),
                        (this.figure.shapeClassDirty = !1),
                        (this.figure.sizeDirty = !1)),
                    this.figure.topicShapePathDirty &&
                        (this.updateLineAttr(),
                        (this.figure.topicShapePathDirty = !1)),
                    this.figure.topicShapeFillPathDirty &&
                        (this.updateFillPattern(),
                        (this.figure.topicShapeFillPathDirty = !1)),
                    this.figure.fillPatternDirty &&
                        (this.updateFillPattern(),
                        (this.figure.fillPatternDirty = !1)),
                    this.figure.topicShapeGroupPositionDirty &&
                        (this.topicShapeGroup.translate(
                            this.figure.topicShapeGroupPosition.x,
                            this.figure.topicShapeGroupPosition.y
                        ),
                        (this.figure.topicShapeGroupPositionDirty = !1)),
                    this.figure.topicContentPositionDirty &&
                        (this.topicContent.translate(
                            this.figure.topicContentPosition.x,
                            this.figure.topicContentPosition.y
                        ),
                        (this.figure.topicContentPositionDirty = !1)),
                    this.figure.topicInnerElementPositionDirty &&
                        (this.s$topicInnerElementGroup.translate(
                            this.figure.topicInnerElementPosition.x,
                            this.figure.topicInnerElementPosition.y
                        ),
                        (this.figure.topicInnerElementPositionDirty = !1)),
                    this.figure.isVisibleDirty &&
                        (this.figure.isVisible
                            ? this.svg.show()
                            : this.svg.hide(),
                        (this.figure.isVisibleDirty = !1)),
                    e.renderWorker.appendChild('topic', this.svg));
            }
            updateLineAttr() {
                this.topicShape.attr(
                    Object(c.getComplexLinePatternAttr)(
                        this.figure.borderLinePattern,
                        {
                            lineWidth: this.figure.borderWidth,
                            linePath: this.figure.topicShapePath,
                            isBorderLinePatten: !0,
                            figure: this.figure,
                        }
                    )
                );
            }
            updateFillPattern() {
                const { topicShapeFillPath: e, fillPattern: t } = this.figure,
                    i = this.figure.viewController.parent(),
                    n = Object(c.getFillPatternAttr)(t, {
                        fillPath: e,
                        isForceHandDrawnSolid: i.isCalloutBranch(),
                    });
                (this.topicShapeFill.attr(n), this.updateFillStyle());
            }
            updateFillStyle() {
                const e = this.figure.viewController.parent(),
                    t = e.editDomain();
                if (!t) return;
                const {
                    fillPattern: i,
                    fillColor: n,
                    fillGradient: r,
                } = this.figure;
                (Object(c.isNoneFillPattern)(i, n)
                    ? this.topicShapeFill.attr({ opacity: 0 })
                    : Object(c.isSolidFillPattern)(i) || e.isCalloutBranch()
                      ? (T.a.setFillColor(t, this.topicShapeFill, n, r),
                        this.topicShapeFill.attr({
                            opacity: 1,
                            stroke: 'none',
                            'stroke-width': 0,
                        }))
                      : this.topicShapeFill.attr({
                            opacity: 1,
                            fill: 'none',
                            stroke: n,
                            'stroke-width':
                                u.b.getCurrentHandDrawnDefaultFillWidth(i),
                        }),
                    this.figure.getParent().updateConnectionMask(),
                    this.topicShapeShallowFill.attr({
                        d: this.figure.topicShapeFillPath,
                        fill: 'white',
                        opacity: 0,
                    }));
            }
            appendChild(e, t, i) {
                var n;
                switch (e) {
                    case 'collapseextend':
                        t.parent !== this.svg && this.svg.add(t);
                        break;
                    case 'labels':
                        t.parent !== this.svg && this.svg.add(t, 0);
                        break;
                    case 'title':
                    case 'numbering':
                    case 'markers':
                    case 'information':
                    case 'inner':
                        t.parent !== this.s$topicInnerElementGroup &&
                            this.s$topicInnerElementGroup.add(t);
                        break;
                    case 'image':
                    case 'mathjax':
                        t.parent !== this.topicContent &&
                            this.topicContent.add(t);
                        break;
                    case 'topicselectbox':
                        null === (n = this.figure.getParent()) ||
                            void 0 === n ||
                            n.renderWorker.appendChild('topicselectbox', t);
                }
            }
            getContent() {
                return this.svg;
            }
            dispose() {
                const e = this.topicShapeFill.remember('fillGradient');
                (e && e.remove(), this.svg.remove());
            }
        }
        var Q = i(108);
        const m = { left: 'start', center: 'middle', right: 'end' };
        class b {
            constructor(e) {
                ((this.figure = e), this.initSVGStructure());
            }
            initSVGStructure() {
                ((this.titleText = new s.a.Text()),
                    this.titleText.style('cursor', 'default'),
                    (this.svg = this.titleText));
            }
            work() {
                (this.figure.textFnDirty
                    ? (this.titleText.text(this.figure.textFn),
                      (this.figure.textFnDirty = !1),
                      (this.figure.textDirty = !1))
                    : this.figure.textDirty &&
                      (this.titleText.text(this.figure.text || ''),
                      (this.figure.textDirty = !1)),
                    this.figure.textColorDirty &&
                        (this.setAttr({
                            fill: this.figure.textColor,
                        }),
                        (this.figure.textColorDirty = !1)),
                    this.figure.textDecorationDirty &&
                        (this.setAttr({
                            'text-decoration': this.figure.textDecoration,
                        }),
                        (this.figure.textDecorationDirty = !1)),
                    this.figure.textTransformDirty &&
                        (this.figure.textTransformDirty = !1),
                    this.figure.textAlignDirty &&
                        (this.setAttr({
                            'text-anchor': m[this.figure.textAlign],
                        }),
                        (this.figure.textAlignDirty = !1)),
                    this.figure.fontSizeDirty &&
                        (this.setAttr({
                            'font-size': parseInt(this.figure.fontSize),
                        }),
                        (this.figure.fontSizeDirty = !1)),
                    this.figure.fontFamilyDirty &&
                        (this.setAttr({
                            'font-family': this.figure.fontFamily,
                        }),
                        (this.figure.fontFamilyDirty = !1)),
                    this.figure.fontWeightDirty &&
                        (this.setAttr({
                            'font-weight': this.figure.fontWeight,
                        }),
                        (this.figure.fontWeightDirty = !1)),
                    this.figure.fontStyleDirty &&
                        (this.setAttr({
                            'font-style': this.figure.fontStyle,
                        }),
                        (this.figure.fontStyleDirty = !1)),
                    this.figure.textPositionDirty &&
                        (this.titleText.translate(
                            this.figure.textPosition.x,
                            this.figure.textPosition.y
                        ),
                        (this.figure.textPositionDirty = !1)),
                    this.figure.isVisibleDirty &&
                        (this.figure.isVisible
                            ? this.svg.show()
                            : this.svg.hide(),
                        (this.figure.isVisibleDirty = !1)));
            }
            appendChild(e, t, i) {}
            getContent() {}
            dispose() {
                this.titleText.remove();
            }
            setAttr(e) {
                (Array.from(
                    this.titleText.node.querySelectorAll('tspan')
                ).forEach((t) => {
                    a()(t).attr(e);
                }),
                    this.titleText.attr(e),
                    this.svg.attr(e));
            }
        }
        class C extends b {
            constructor(e) {
                (super(e),
                    (this.svg = new s.a.G().data(
                        'name',
                        'topic-title-text-group'
                    )),
                    this.svg.put(this.titleText));
            }
            work() {
                const e = this.figure.getParent();
                e &&
                    (super.work(),
                    this.figure.isVisibleDirty &&
                        (this.figure.isVisible
                            ? this.svg.show()
                            : this.svg.hide(),
                        (this.figure.isVisibleDirty = !1)),
                    this.figure.attrsDirty &&
                        (this.svg.attr(this.figure.attrsToPack),
                        (this.figure.attrsToPack = {}),
                        (this.figure.attrsDirty = !1)),
                    e.renderWorker.appendChild('title', this.svg));
            }
            appendChild(e, t, i) {}
            getContent() {
                return this.svg;
            }
            dispose() {
                this.svg.remove();
            }
        }
        class L extends b {
            constructor(e) {
                (super(e),
                    (this.svg = new s.a.G().data('name', 'numbering-class')),
                    this.svg.put(this.titleText));
            }
            work() {
                const e = this.figure.getParent();
                e &&
                    e.viewController.figureType !==
                        r.FIGURE_TYPE.PLACE_HOLDER_TOPIC &&
                    (super.work(),
                    this.figure.isVisibleDirty &&
                        (this.figure.isVisible
                            ? this.svg.show()
                            : this.svg.hide(),
                        (this.figure.isVisibleDirty = !1)),
                    e.renderWorker.appendChild('numbering', this.svg));
            }
            appendChild(e, t, i) {}
            getContent() {
                return this.svg;
            }
            dispose() {
                this.svg.remove();
            }
        }
        class y extends b {
            constructor(e) {
                (super(e),
                    (this.svg = this.titleText),
                    this.titleText
                        .data('name', 'relationship-title')
                        .style({ cursor: 'default' }));
            }
            work() {
                const e = this.figure.getParent();
                e &&
                    (super.work(),
                    this.figure.isVisibleDirty &&
                        (this.figure.isVisible
                            ? this.svg.show()
                            : this.svg.hide(),
                        (this.figure.isVisibleDirty = !1)),
                    this.figure.isDefaultTitleDirty &&
                        (this.svg.attr({
                            'data-name': this.figure.isDefaultTitle
                                ? 'relationship-default-title'
                                : '',
                        }),
                        (this.figure.isDefaultTitleDirty = !1)),
                    e.renderWorker.appendChild('title', this.svg));
            }
            appendChild(e, t, i) {}
            getContent() {
                return this.svg;
            }
            dispose() {
                this.svg.remove();
            }
        }
        var M = i(39);
        const A = 'cursor:crosshair;cursor:-webkit-grab;',
            v = { rx: 20, ry: 20, fill: 'transparent', x: 0, y: 0 };
        class E {
            constructor(e) {
                ((this.figure = e), this.initSVGStructure());
            }
            initSVGStructure() {
                ((this.svg = new s.a.G().data('name', 'relationship')),
                    this.figure.viewController.setElement(this.svg.node),
                    (this.path = this.svg
                        .put(new s.a.Path())
                        .data('name', 'relationship-path')),
                    this.figure.viewController.style(this.path, 'relationship'),
                    (this.actionPath = this.svg
                        .put(new s.a.Path())
                        .data('name', 'relationship-action-path')),
                    this.figure.viewController.style(
                        this.actionPath,
                        'actionPath'
                    ),
                    (this.s$shadowActionPath = this.svg
                        .put(new s.a.Path())
                        .data('name', 'relationship-shadow-action-path')),
                    this.figure.viewController.style(
                        this.s$shadowActionPath,
                        'relationshipShadowAction'
                    ),
                    (this.controlPointGroup = this.svg
                        .put(new s.a.G())
                        .data('name', 'controlPoint-group')),
                    (this.controlLine1 = this.controlPointGroup
                        .put(new s.a.Path())
                        .data('name', 'controlLine-1')),
                    (this.startPoint1Package = this.controlPointGroup
                        .put(new s.a.G())
                        .data('name', 'startPoint-1-package')
                        .attr('style', A)),
                    (this.startPoint1 = this.startPoint1Package
                        .put(new s.a.Ellipse())
                        .data('name', 'startPoint-1')
                        .attr('style', A)));
                const e = new s.a.Ellipse()
                    .data('name', 'shadow-startPoint-1')
                    .attr(v);
                (this.startPoint1Package.put(e),
                    (this.controlPoint1Package = this.controlPointGroup
                        .put(new s.a.G())
                        .data('name', 'controlPoint-1-package')
                        .attr('style', A)),
                    (this.controlPoint1 = this.controlPoint1Package
                        .put(new s.a.Rect())
                        .data('name', 'controlPoint-1')));
                const t = new s.a.Ellipse()
                    .data('name', 'shadow-controlPoint-1')
                    .attr(v);
                (this.controlPoint1Package.put(t),
                    (this.controlLine2 = this.controlPointGroup
                        .put(new s.a.Path())
                        .data('name', 'controlLine-2')),
                    (this.startPoint2Package = this.controlPointGroup
                        .put(new s.a.G())
                        .data('name', 'startPoint-2-package')
                        .attr('style', A)),
                    (this.startPoint2 = this.startPoint2Package
                        .put(new s.a.Ellipse())
                        .data('name', 'startPoint-2')
                        .attr('style', A)));
                const i = new s.a.Ellipse()
                    .data('name', 'shadow-startPoint-2')
                    .attr(v);
                (this.startPoint2Package.put(i),
                    (this.controlPoint2Package = this.controlPointGroup
                        .put(new s.a.G())
                        .data('name', 'controlPoint-2-package')
                        .attr('style', A)),
                    (this.controlPoint2 = this.controlPoint2Package
                        .put(new s.a.Rect())
                        .data('name', 'controlPoint-2')));
                const n = new s.a.Ellipse()
                    .data('name', 'shadow-controlPoint-2')
                    .attr(v);
                (this.controlPoint2Package.put(n),
                    (this.relationshipTitleMaskPath = new s.a.Path().attr({
                        fill: 'black',
                        'clip-rule': 'evenodd',
                    })));
            }
            work() {
                const e = this.figure.getParent();
                if (!e) return;
                const t = this.figure.viewController.editDomain();
                if (
                    (this.relationshipTitleMask ||
                        (this.relationshipTitleMask = t.svg.clip()),
                    t &&
                        this.relationshipTitleMaskPath.parent !==
                            this.relationshipTitleMask &&
                        (this.relationshipTitleMask.add(
                            this.relationshipTitleMaskPath
                        ),
                        this.relationshipTitleMask.hide(),
                        this.path.clipWith(this.relationshipTitleMask)),
                    this.figure.relationshipMaskDirty &&
                        (this.relationshipTitleMaskPath.attr({
                            d: this.figure.relationshipMaskD,
                        }),
                        (this.figure.relationshipMaskDirty = !1)),
                    this.figure.maskVisibleDirty &&
                        (this.figure.maskVisible
                            ? this.relationshipTitleMask.show()
                            : this.relationshipTitleMask.hide(),
                        (this.figure.maskVisibleDirty = !1)),
                    this.figure.lineStyleDirty)
                ) {
                    const {
                        controlHandlerLine1: e,
                        controlHandlerPoint1: t,
                        controlHandlerLine2: i,
                        controlHandlerPoint2: n,
                    } = Object(M.a)(
                        this.figure.lineStyle
                    ).getControlHandlerDisplayStatus();
                    (e ? this.controlLine1.show() : this.controlLine1.hide(),
                        t
                            ? this.controlPoint1Package.show()
                            : this.controlPoint1Package.hide(),
                        i ? this.controlLine2.show() : this.controlLine2.hide(),
                        n
                            ? this.controlPoint2Package.show()
                            : this.controlPoint2Package.hide(),
                        (this.figure.lineStyleDirty = !1));
                }
                if (
                    (this.figure.lineColorDirty &&
                        (this.path.attr({
                            stroke: this.figure.lineColor,
                        }),
                        (this.figure.lineColorDirty = !1)),
                    this.figure.lineWidthDirty)
                ) {
                    this.path.attr({
                        'stroke-width': this.figure.lineWidth,
                    });
                    const e = this.figure.lineWidth + 5;
                    this.actionPath.attr({ 'stroke-width': e });
                    const t = e + 5;
                    (this.s$shadowActionPath.attr({
                        'stroke-width': t,
                    }),
                        (this.figure.lineWidthDirty = !1));
                }
                if (
                    (this.figure.linePatternDirty &&
                        (this.updateLinePattern(),
                        (this.figure.linePatternDirty = !1)),
                    this.figure.posInfoDirty &&
                        (this._forPos(this.figure.posInfo),
                        this.figure.lineStyle === r.RELATIONSHIPSHAPE.ZIGZAG
                            ? this.updateZigzagControlPointPosition()
                            : this.resetControlPointPosition(),
                        (this.figure.posInfoDirty = !1)),
                    this.figure.relationshipPathDirty &&
                        (this.updateLinePattern(),
                        (this.figure.relationshipPathDirty = !1)),
                    this.figure.controlLine1PathDirty)
                ) {
                    const e = this.figure.controlLine1Path;
                    (this.controlLine1.attr({ d: e }),
                        (this.figure.controlLine1PathDirty = !1));
                }
                if (this.figure.controlLine2PathDirty) {
                    const e = this.figure.controlLine2Path;
                    (this.controlLine2.attr({ d: e }),
                        (this.figure.controlLine2PathDirty = !1));
                }
                (this.figure.startPoint1RadiusDirty &&
                    (this.startPoint1.attr({
                        rx: this.figure.startPoint1Radius.rx,
                        ry: this.figure.startPoint1Radius.ry,
                    }),
                    (this.figure.startPoint1RadiusDirty = !1)),
                    this.figure.startPoint2RadiusDirty &&
                        (this.startPoint2.attr({
                            rx: this.figure.startPoint2Radius.rx,
                            ry: this.figure.startPoint2Radius.ry,
                        }),
                        (this.figure.startPoint2RadiusDirty = !1)),
                    this.figure.controlPoint1RadiusDirty &&
                        (this.controlPoint1.attr({
                            x: -this.figure.controlPoint1Radius.rx,
                            y: -this.figure.controlPoint1Radius.ry,
                            width: 2 * this.figure.controlPoint1Radius.rx,
                            height: 2 * this.figure.controlPoint1Radius.ry,
                        }),
                        (this.figure.controlPoint1RadiusDirty = !1)),
                    this.figure.controlPoint2RadiusDirty &&
                        (this.controlPoint2.attr({
                            x: -this.figure.controlPoint2Radius.rx,
                            y: -this.figure.controlPoint2Radius.ry,
                            width: 2 * this.figure.controlPoint2Radius.rx,
                            height: 2 * this.figure.controlPoint2Radius.ry,
                        }),
                        (this.figure.controlPoint2RadiusDirty = !1)),
                    this.figure.controlPointGroupVisibleDirty &&
                        (this.figure.controlPointGroupVisible
                            ? this.controlPointGroup.show()
                            : this.controlPointGroup.hide(),
                        (this.figure.controlPointGroupVisibleDirty = !1)),
                    this.figure.pointerEventsNoneDirty &&
                        (this.figure.pointerEventsNone
                            ? this.svg.style('pointer-events', 'none')
                            : this.svg.style('pointer-events', 'auto'),
                        (this.figure.pointerEventsNoneDirty = !1)),
                    this.figure.isVisibleDirty &&
                        (this.figure.isVisible
                            ? this.svg.show()
                            : this.svg.hide(),
                        (this.figure.isVisibleDirty = !1)),
                    this.figure.opacityDirty &&
                        (this.svg.attr('opacity', this.figure.opacity),
                        (this.figure.opacityDirty = !1)),
                    e.renderWorker.appendChild('relationship', this.svg));
            }
            appendChild(e, t, i) {
                if ('title' === e)
                    if (t.parent !== this.svg) {
                        const e = this.svg
                            .children()
                            .findIndex((e) => e === this.controlPointGroup);
                        this.svg.add(t, e);
                    }
            }
            getContent() {
                return this.svg;
            }
            updateLinePattern() {
                const e = Object(c.getComplexLinePatternAttr)(
                    this.figure.linePattern,
                    {
                        lineWidth: this.figure.lineWidth,
                        linePath: this.figure.relationshipPath,
                    }
                );
                (this.path.attr(e),
                    this.actionPath.attr('d', e.d),
                    this.s$shadowActionPath.attr('d', e.d));
            }
            updateZigzagControlPointPosition() {
                const {
                        insectPoint1: e,
                        insectPoint2: t,
                        controlPoint1: i,
                        controlPoint2: n,
                    } = this.figure.posInfo,
                    { scp: o, tcp: a } = Object(M.a)(
                        r.RELATIONSHIPSHAPE.ZIGZAG
                    ).calcPathParams(e, t, i, n);
                (this.controlPoint1Package.translate(o.x, o.y),
                    this.controlPoint2Package.translate(a.x, a.y));
            }
            resetControlPointPosition() {
                const { controlPoint1: e, controlPoint2: t } =
                    this.figure.posInfo;
                (this.controlPoint1Package.translate(e.x, e.y),
                    this.controlPoint2Package.translate(t.x, t.y));
            }
            dispose() {
                (this.relationshipTitleMask &&
                    (this.relationshipTitleMask.remove(),
                    (this.relationshipTitleMask = null)),
                    this.svg.remove());
            }
            _forPos(e) {
                const {
                    insectPoint1: t,
                    insectPoint2: i,
                    controlPoint1: n,
                    controlPoint2: r,
                } = e;
                (this.controlPoint1.attr({
                    width: 8,
                    height: 8,
                    x: -4,
                    y: -4,
                    'stroke-width': 2,
                }),
                    this.figure.viewController.style(
                        this.controlPoint1,
                        'controlPoint'
                    ),
                    this.controlPoint1Package.translate(n.x, n.y),
                    this.controlPoint2.attr({
                        width: 8,
                        height: 8,
                        x: -4,
                        y: -4,
                        'stroke-width': 2,
                    }),
                    this.figure.viewController.style(
                        this.controlPoint2,
                        'controlPoint'
                    ),
                    this.controlPoint2Package.translate(r.x, r.y),
                    this.startPoint1.attr({
                        rx: 4,
                        ry: 4,
                        'stroke-width': 1,
                    }),
                    this.figure.viewController.style(
                        this.startPoint1,
                        'controlPoint'
                    ),
                    this.startPoint1Package.translate(t.x, t.y),
                    this.startPoint2.attr({
                        rx: 4,
                        ry: 4,
                        'stroke-width': 1,
                    }),
                    this.figure.viewController.style(
                        this.startPoint2,
                        'controlPoint'
                    ),
                    this.startPoint2Package.translate(i.x, i.y));
                const o = 'M ' + t.x + ' ' + t.y + 'L ' + n.x + ' ' + n.y;
                (this.controlLine1.attr({
                    d: o,
                    'stroke-width': 2,
                }),
                    this.figure.viewController.style(
                        this.controlLine1,
                        'holder'
                    ));
                const a = 'M ' + i.x + ' ' + i.y + 'L ' + r.x + ' ' + r.y;
                (this.controlLine2.attr({
                    d: a,
                    'stroke-width': 2,
                }),
                    this.figure.viewController.style(
                        this.controlLine2,
                        'holder'
                    ),
                    Object(M.a)(this.figure.lineStyle).updatePath(
                        this.figure.viewController,
                        t,
                        i,
                        n,
                        r
                    ));
            }
        }
        var _ = i(9),
            O = i(55);
        class S {
            constructor(e) {
                ((this.figure = e),
                    (this.svg = new s.a.G().data('name', 'image-group')),
                    (this.imageContainer = this.svg
                        .put(new s.a.G())
                        .data('name', 'image-container')
                        .translate(0, 0)),
                    (this.imageStaticBackground = this.imageContainer
                        .put(new s.a.Rect())
                        .data('name', 'image-static-bg')
                        .attr({
                            fill: 'none',
                            'fill-opacity': '1',
                        })
                        .hide()),
                    (this.imageBorderPath = this.imageContainer
                        .put(new s.a.Path())
                        .data('name', 'image-border-path')
                        .attr('fill', 'none')
                        .translate(0, 0)),
                    (this.loadImage = this.imageContainer
                        .put(new s.a.Image())
                        .data('name', 'topic-img-load')
                        .translate(0, 0)),
                    (this.image = this.imageContainer
                        .put(new s.a.Image())
                        .data('name', 'topic-img')
                        .attr('preserveAspectRatio', 'none')
                        .translate(0, 0)
                        .hide()),
                    (this.webVideoInteractButton = this.svg
                        .put(new s.a.Image())
                        .width(0)
                        .height(0)
                        .data('name', 'web-video-interact-button')
                        .attr('cursor', 'pointer')
                        .translate(0, 0)
                        .hide()),
                    this.figure.viewController.setElement(this.svg.node));
            }
            work() {
                const e = this.figure.getParent();
                if (!e) return;
                const t = this.figure.viewController.editDomain();
                if (
                    (t &&
                        !this.imageShadowFilter &&
                        ((this.imageShadowFilter = t.svg.filter()),
                        (this.imageFeDropShadow = new s.a.FeDropShadow()
                            .dmove(0, 0)
                            .floodColor('#000')
                            .floodOpacity(0.3 * this.figure.opacity)),
                        this.imageShadowFilter
                            .filterUnits('userSpaceOnUse')
                            .put(this.imageFeDropShadow)),
                    this.figure.imageUrlDirty &&
                        ((this.figure.imageUrlDirty = !1), this._loadImage()),
                    this.figure.positionDirty)
                ) {
                    const e = this.figure.borderWidth;
                    (this.svg.translate(
                        this.figure.position.x + e / 2,
                        this.figure.position.y + e / 2
                    ),
                        (this.figure.positionDirty = !1));
                }
                if (this.figure.sizeDirty) {
                    const { width: e, height: t } = this.figure.size;
                    (this._isLoading &&
                        this.loadImage.size(Math.min(e, t), Math.min(e, t)),
                        this.image.size(e, t),
                        this.imageStaticBackground.size(e, t),
                        (this.figure.sizeDirty = !1));
                }
                if (
                    (this.figure.isVisibleDirty &&
                        (this.figure.isVisible
                            ? this.svg.show()
                            : this.svg.hide(),
                        (this.figure.isVisibleDirty = !1)),
                    this.figure.opacityDirty &&
                        (this.image.attr('opacity', this.figure.opacity),
                        this.imageBorderPath.attr(
                            'opacity',
                            this.figure.opacity
                        ),
                        this.imageFeDropShadow.floodOpacity(
                            0.3 * this.figure.opacity
                        ),
                        (this.figure.opacityDirty = !1)),
                    this.figure.borderPathDirty &&
                        (this.imageBorderPath.attr('d', this.figure.borderPath),
                        (this.figure.borderPathDirty = !1)),
                    this.figure.borderWidthDirty)
                ) {
                    this.imageBorderPath.attr(
                        'stroke-width',
                        this.figure.borderWidth
                    );
                    const e = this.figure.borderWidth / 2;
                    (this.svg.translate(
                        this.figure.position.x + e,
                        this.figure.position.y + e
                    ),
                        this.imageStaticBackground.translate(e, e),
                        this.loadImage.translate(e, e),
                        this.image.translate(e, e),
                        this._updateShadowStyle(),
                        this.figure.borderWidth > 0 &&
                            this.imageBorderPath.attr(
                                'opacity',
                                this.figure.opacity
                            ),
                        (this.figure.borderWidthDirty = !1));
                }
                if (
                    (this.figure.borderColorDirty &&
                        (this.imageBorderPath.attr(
                            'stroke',
                            this.figure.borderColor
                        ),
                        (this.figure.borderColorDirty = !1)),
                    this.figure.shadowVisibleDirty)
                ) {
                    if (this.figure.shadowVisible) {
                        const { width: e, height: t } = this.figure.size,
                            i = (e + t) / 175,
                            n =
                                this.figure.borderWidth > 0
                                    ? 0.7 * this.figure.borderWidth
                                    : 1 / 0;
                        (this.imageFeDropShadow.dy(i),
                            this.imageFeDropShadow.stdDeviation(
                                Math.min(3 * i, n)
                            ),
                            this.imageFeDropShadow.floodOpacity(
                                0.3 * this.figure.opacity
                            ));
                    }
                    (this._updateShadowStyle(),
                        (this.figure.shadowVisibleDirty = !1));
                }
                if (
                    (this.figure.staticBackgroundFillColorDirty &&
                        (this.imageStaticBackground.attr({
                            fill: this.figure.staticBackgroundFillColor,
                        }),
                        (this.figure.staticBackgroundFillColorDirty = !1)),
                    this.figure.isWebVideoThumbnail)
                ) {
                    const e =
                            O.addonModule.getWebVideoPlayStartButtonResource(),
                        t =
                            ((i = this.figure.size),
                            Math.max(
                                Math.min(Math.min(i.width, i.height) / 4, 64),
                                16
                            ));
                    this.webVideoInteractButton
                        .load(
                            this.figure.viewController
                                .getContext()
                                .getFileRealResource(e)
                        )
                        .width(t)
                        .height(t)
                        .translate(
                            (this.figure.size.width - t) / 2,
                            (this.figure.size.height - t) / 2
                        )
                        .show();
                } else this.webVideoInteractButton.hide();
                var i;
                e.renderWorker.appendChild('image', this.svg);
            }
            _updateShadowStyle() {
                const e = this.imageShadowFilter.toString(),
                    t = this.figure.shadowVisible,
                    i = this.figure.borderWidth > 0,
                    n = t && i ? e : 'none',
                    r = t && !i ? e : 'none';
                (this.imageContainer.style('filter', n),
                    this.imageStaticBackground.style('filter', r),
                    t || i
                        ? this.imageStaticBackground.show()
                        : this.imageStaticBackground.hide());
            }
            _loadImage() {
                if (!this.figure.ignoreLoading && this.loadImage) {
                    this._isLoading = !0;
                    const e = this.figure.viewController
                        .getContext()
                        .getFileRealResource(
                            O.addonModule.getImageLoadingPlaceHolderResource()
                        );
                    this.loadImage.load(e);
                }
                const e = (e) => {
                        e &&
                            this.image
                                .load(e)
                                .loaded((e) => this._loaded(e, t));
                    },
                    t = (this.currentLoadId = Date.now());
                Object(c.isXapResource)(this.figure.imageUrl)
                    ? this.figure.viewController
                          .config(r.CONFIG.XAP_LOADER)(this.figure.imageUrl)
                          .then((t) => {
                              e(t);
                          })
                    : e(this.figure.imageUrl);
            }
            _loaded(e, t) {
                if (
                    (this.figure.setOriginalSize({
                        width: e.width,
                        height: e.height,
                    }),
                    this.currentLoadId !== t)
                )
                    return;
                let i, n;
                if (((this._isLoading = !1), e.width > 200)) {
                    const t = e.width / 200;
                    ((i = 200), (n = e.height / t));
                } else ((n = e.height), (i = e.width));
                this.figure.viewController.setImageDefaultSize({
                    width: i,
                    height: n,
                });
                const r = this.figure.viewController.getSize(),
                    o = r.width && r.width > 0 ? r.width : i,
                    a = r.height && r.height > 0 ? r.height : n;
                if (o && a) {
                    (this.image.show(), this.loadImage.remove());
                    const e = { x: 0, y: 0, width: o, height: a };
                    this.figure.viewController.setBounds(e);
                }
            }
            appendChild(e, t, i) {
                if ('resizebox' === e)
                    t.parent !== this.svg &&
                        this.webVideoInteractButton.before(t);
            }
            getContent() {
                return this.svg;
            }
            dispose() {
                (this.imageShadowFilter &&
                    (this.imageShadowFilter.remove(),
                    (this.imageShadowFilter = null),
                    (this.imageFeDropShadow = null)),
                    this.svg.remove());
            }
            resizeImageToBase64(e) {
                if (e.startsWith('javascript:')) return Promise.reject();
                if (e.startsWith('data:image')) return new Promise((t) => t(e));
                const t = e.split('.').pop().toLowerCase();
                if (['svg', 'gif', 'jif', 'webp'].includes(t))
                    return new Promise((t) => t(e));
                const i = document.createElement('canvas'),
                    n = i.getContext('2d'),
                    r = new Image();
                return (
                    (r.crossOrigin = 'anonymous'),
                    (r.src = e),
                    new Promise((e, t) => {
                        ((r.onload = () => {
                            let t = Math.max(
                                r.width / _.a.IMAGE_MAX_SIZE,
                                r.height / _.a.IMAGE_MAX_SIZE
                            );
                            t = t > 1 ? t : 1;
                            const o = r.width / t,
                                a = r.height / t;
                            ((i.width = o),
                                (i.height = a),
                                n.drawImage(
                                    r,
                                    0,
                                    0,
                                    r.width,
                                    r.height,
                                    0,
                                    0,
                                    o,
                                    a
                                ));
                            const s = i.toDataURL('image/png');
                            e(s);
                        }),
                            (r.onerror = () => {
                                t();
                            }));
                    })
                );
            }
        }
        class x {
            constructor(e) {
                ((this.figure = e),
                    (this.svg = new s.a.G().attr('data', 'markers-group')),
                    this.figure.viewController.setElement(this.svg.node));
            }
            work() {
                const e = this.figure.getParent();
                e &&
                    (e.renderWorker.appendChild('markers', this.svg),
                    this.figure.positionDirty &&
                        (this.svg.translate(
                            this.figure.position.x,
                            this.figure.position.y
                        ),
                        (this.figure.positionDirty = !1)),
                    this.figure.isVisibleDirty &&
                        (this.figure.isVisible
                            ? this.svg.show()
                            : this.svg.hide(),
                        (this.figure.isVisibleDirty = !1)));
            }
            appendChild(e, t, i) {
                if ('marker' === e) t.parent !== this.svg && this.svg.add(t);
            }
            getContent() {
                return this.svg;
            }
            dispose() {
                this.svg.remove();
            }
        }
        class R {
            constructor(e) {
                ((this.figure = e),
                    (this.svg = new s.a.G()),
                    (this.s$Select = new s.a.Path()),
                    (this.s$Icon = new s.a.Image()),
                    this.svg.add(this.s$Select),
                    this.svg.add(this.s$Icon),
                    (this.s$Border = new s.a.Ellipse()
                        .fill('none')
                        .stroke('#fff')),
                    this.svg.add(this.s$Border),
                    this.figure.viewController.setElement(this.svg.node));
            }
            work() {
                const e = this.figure.getParent();
                if (e) {
                    if (
                        (this.figure.iconUrlDirty &&
                            (this.s$Icon.load(this.figure.iconUrl),
                            (this.figure.iconUrlDirty = !1)),
                        this.figure.sizeDirty)
                    ) {
                        const e = this.figure.size.width;
                        (this.s$Icon.size(e, e),
                            this.s$Border
                                .size(e + 1, e + 1)
                                .cx(e / 2)
                                .cy(e / 2),
                            (this.figure.sizeDirty = !1));
                        const t = e / 12;
                        this.s$Border.attr('stroke-width', t);
                    }
                    (this.figure.needToForward &&
                        (this.svg.forward(), (this.figure.needToForward = !1)),
                        this.figure.needToBackward &&
                            (this.svg.backward(),
                            (this.figure.needToBackward = !1)),
                        this.figure.selectionAttrDirty &&
                            (this.s$Select.attr(
                                this.figure.selectionAttrToPack
                            ),
                            (this.figure.selectionAttrToPack = {}),
                            (this.figure.selectionAttrDirty = !1)),
                        this.figure.positionDirty &&
                            (this.svg
                                .x(this.figure.position.x)
                                .y(this.figure.position.y),
                            (this.figure.positionDirty = !1)),
                        this.figure.isVisibleDirty &&
                            (this.figure.isVisible
                                ? this.svg.show()
                                : this.svg.hide(),
                            (this.figure.isVisibleDirty = !1)),
                        e.renderWorker.appendChild('marker', this.svg));
                }
            }
            appendChild(e, t, i) {}
            getContent() {
                return this.svg;
            }
            dispose() {
                this.svg.remove();
            }
        }
        var I = i(11);
        const N = {
            stroke: 'rgb(46, 189, 255)',
            'stroke-width': '1px',
            fill: 'rgb(46, 189, 255)',
            'fill-opacity': '0.3',
            display: 'none',
        };
        class w {
            constructor(e) {
                ((this.figure = e),
                    (this.svg = new s.a.G().attr('data', 'information-group')),
                    (this.s$Select = new s.a.Path()),
                    (this.s$Icon = new s.a.Text()),
                    this.svg.add(this.s$Select),
                    this.svg.add(this.s$Icon),
                    this.figure.viewController.setElement(this.svg.node));
            }
            work() {
                const e = this.figure.getParent();
                if (e) {
                    if (
                        (this.figure.textContentDirty &&
                            (this.s$Icon.text(this.figure.textContent),
                            (this.figure.textContentDirty = !1)),
                        this.figure.sizeDirty)
                    ) {
                        const e = this.figure.size.width;
                        this.s$Icon
                            .text(this.figure.textContent)
                            .attr({
                                'font-size': e,
                                'font-family': 'information-iconfont',
                                transform: `translate(0 ${(-e / 12) * 5})`,
                            })
                            .addClass('icon-information');
                        const t = I.a.generateRect(
                            { x: 0, y: 0, width: e, height: e },
                            0
                        );
                        (this.s$Select.attr(Object.assign({ d: t }, N)),
                            (this.figure.sizeDirty = !1));
                    }
                    (this.figure.textAttrDirty &&
                        (this.s$Icon.attr(this.figure.textAttrToPack),
                        (this.figure.textAttrToPack = {}),
                        (this.figure.textAttrDirty = !1)),
                        this.figure.selectionAttrDirty &&
                            (this.s$Select.attr(
                                this.figure.selectionAttrToPack
                            ),
                            (this.figure.selectionAttrToPack = {}),
                            (this.figure.selectionAttrDirty = !1)),
                        this.figure.positionDirty &&
                            (this.svg.translate(
                                this.figure.position.x,
                                this.figure.position.y
                            ),
                            (this.figure.positionDirty = !1)),
                        this.figure.isVisibleDirty &&
                            (this.figure.isVisible
                                ? this.svg.show()
                                : this.svg.hide(),
                            (this.figure.isVisibleDirty = !1)),
                        e.renderWorker.appendChild('information', this.svg));
                }
            }
            appendChild(e, t, i) {
                if ('' === e) t.parent !== this.svg && this.svg.add(t);
            }
            getContent() {
                return this.svg;
            }
            dispose() {
                this.svg.remove();
            }
        }
        class P {
            constructor(e) {
                ((this.figure = e),
                    (this.svg = new s.a.G().data('name', 'labels-card-group')),
                    this.figure.viewController.setElement(this.svg.node));
            }
            work() {
                const e = this.figure.getParent();
                e &&
                    (this.figure.positionDirty &&
                        (this.svg.translate(
                            this.figure.position.x,
                            this.figure.position.y
                        ),
                        (this.figure.positionDirty = !1)),
                    this.figure.isVisibleDirty &&
                        (this.figure.isVisible
                            ? this.svg.show()
                            : this.svg.hide(),
                        (this.figure.isVisibleDirty = !1)),
                    e.renderWorker.appendChild('labels', this.svg));
            }
            appendChild(e, t, i) {
                if ('label' === e) t.parent !== this.svg && this.svg.add(t);
            }
            getContent() {
                return this.svg;
            }
            dispose() {
                this.svg.remove();
            }
        }
        const H = r.COMMON_FONT_FAMILY;
        class D {
            constructor(e) {
                ((this.figure = e),
                    (this.svg = new s.a.G().attr({
                        data: 'label-unit',
                    })),
                    this.figure.viewController.setElement(this.svg.node),
                    (this.s$labelUnitbackgound = new s.a.Rect()
                        .radius(8)
                        .fill('rgba(255, 255, 255, 0.7)')
                        .stroke('rgba(0, 0, 0, 0.1)')),
                    (this.s$labelUnitText = new s.a.Text().style(
                        'white-space',
                        'pre'
                    )),
                    this.svg.add(this.s$labelUnitbackgound),
                    this.svg.add(this.s$labelUnitText),
                    (this.tooltip = document.createElementNS(
                        'http://www.w3.org/2000/svg',
                        'title'
                    )),
                    this.svg.node.appendChild(this.tooltip));
            }
            work() {
                const e = this.figure.getParent();
                e &&
                    (this.figure.backgroudAttrDirty &&
                        (this.s$labelUnitbackgound.attr(
                            this.figure.backgroudAttrToPack
                        ),
                        (this.figure.backgroudAttrToPack = {}),
                        (this.figure.backgroudAttrDirty = !1)),
                    this.figure.textAttrDirty &&
                        (this.s$labelUnitText.attr(this.figure.textAttrToPack),
                        (this.figure.textAttrToPack = {}),
                        (this.figure.textAttrDirty = !1)),
                    this.figure.sizeDirty &&
                        (this.s$labelUnitbackgound.size(
                            Math.max(this.figure.size.width, 38),
                            this.figure.size.height
                        ),
                        (this.figure.sizeDirty = !1)),
                    this.figure.textDirty &&
                        (this.updateLabelFont(), (this.figure.textDirty = !1)),
                    this.figure.tooltipDirty &&
                        ((this.tooltip.textContent = this.figure.tooltip),
                        (this.figure.tooltipDirty = !1)),
                    this.figure.positionDirty &&
                        (this.svg.translate(
                            this.figure.position.x,
                            this.figure.position.y
                        ),
                        (this.figure.positionDirty = !1)),
                    this.figure.isVisibleDirty &&
                        (this.figure.isVisible
                            ? this.svg.show()
                            : this.svg.hide(),
                        (this.figure.isVisibleDirty = !1)),
                    e.renderWorker.appendChild('label', this.svg));
            }
            updateLabelFont() {
                const e = H,
                    t = Object(c.getTextSize)(this.figure.text, {
                        fontSize: 12,
                        fontFamily: e,
                    }).width,
                    i = t + 12 <= 38 ? (38 - t) / 2 : 6;
                this.s$labelUnitText
                    .plain(this.figure.text)
                    .attr({
                        'font-size': 12,
                        'font-family': e,
                        'alignment-baseline': 'middle',
                    })
                    .fill('#434b54')
                    .translate(i, 11);
            }
            appendChild(e, t, i) {}
            getContent() {
                return this.svg;
            }
            dispose() {
                this.svg.remove();
            }
        }
        var F = i(30),
            k = i(31),
            B = i(16);
        const V = (e, t, i) => {
                (e.figure.setBoundaryPath(t),
                    (i = i || t),
                    e.figure.setBoundaryFillPath(i));
            },
            Y = _.a.BOUNDARYGAP,
            G = 14,
            U = {
                [r.BOUNDARYSHAPE.RECT]: function (e, t) {
                    const i = t.width,
                        n = t.height;
                    V(
                        e,
                        'M 0 0L ' + i + ' 0L ' + i + ' ' + n + 'L 0 ' + n + 'z'
                    );
                },
                [r.BOUNDARYSHAPE.ROUNDEDRECT]: function (e, t) {
                    const i = t.width,
                        n = t.height;
                    V(
                        e,
                        'M 14 0L ' +
                            (i - G) +
                            ' 0Q ' +
                            i +
                            ' 0 ' +
                            i +
                            ' 14L ' +
                            i +
                            ' ' +
                            (n - G) +
                            'Q ' +
                            i +
                            ' ' +
                            n +
                            ' ' +
                            (i - G) +
                            ' ' +
                            n +
                            'L 14 ' +
                            n +
                            'Q 0 ' +
                            n +
                            ' 0 ' +
                            (n - G) +
                            'L 0 14Q 0 0 14 0z'
                    );
                },
                [r.BOUNDARYSHAPE.SCALLOPS]: function (e, t) {
                    const i = t.width,
                        n = t.height,
                        r = Y / 2,
                        o = i - 0 - Y,
                        a = n - 0 - Y,
                        s = o / Math.max(1, parseInt(o / 40, 10)),
                        l = a / Math.max(1, parseInt(a / 40, 10));
                    let c = 0 + r,
                        d = 0 + r,
                        f = 0 + s + r,
                        h = 0 + r,
                        p = '';
                    const T = o / s,
                        u = a / l;
                    let g;
                    for (p += 'M ' + c + ' ' + d, g = 0; g < T; g++)
                        ((p +=
                            'C ' +
                            (c + 0.25 * (f - c)) +
                            ' ' +
                            (h - r) +
                            ' ' +
                            (c + 0.75 * (f - c)) +
                            ' ' +
                            (h - r) +
                            ' ' +
                            f +
                            ' ' +
                            h),
                            (c = f),
                            (f = c + s));
                    for (f = c, h += l, g = 0; g < u; g++)
                        ((p +=
                            'C ' +
                            (c + r) +
                            ' ' +
                            (d + 0.25 * (h - d)) +
                            ' ' +
                            (c + r) +
                            ' ' +
                            (d + 0.75 * (h - d)) +
                            ' ' +
                            c +
                            ' ' +
                            h),
                            (d = h),
                            (h = d + l));
                    for (h = d, f = c - s, g = 0; g < T; g++)
                        ((p +=
                            'C ' +
                            (c - 0.25 * Math.abs(f - c)) +
                            ' ' +
                            (h + r) +
                            ' ' +
                            (c - 0.75 * Math.abs(f - c)) +
                            ' ' +
                            (h + r) +
                            ' ' +
                            f +
                            ' ' +
                            h),
                            (c = f),
                            (f = c - s));
                    for (f = c, h -= l, g = 0; g < u; g++)
                        ((p +=
                            'C ' +
                            (c - r) +
                            ' ' +
                            (d - 0.25 * Math.abs(h - d)) +
                            ' ' +
                            (c - r) +
                            ' ' +
                            (d - 0.75 * Math.abs(h - d)) +
                            ' ' +
                            c +
                            ' ' +
                            h),
                            (d = h),
                            (h = d - l));
                    ((p += 'Z'), V(e, p));
                },
                [r.BOUNDARYSHAPE.WAVES]: function (e, t) {
                    const i = t.width,
                        n = t.height,
                        r = Y / 2,
                        o = i - 0 - Y,
                        a = n - 0 - Y,
                        s = o / Math.max(1, parseInt(o / 40, 10)),
                        l = a / Math.max(1, parseInt(a / 40, 10));
                    let c = 0 + r,
                        d = 0 + r,
                        f = 0 + s + r,
                        h = 0 + r,
                        p = '';
                    const T = o / s,
                        u = a / l;
                    let g;
                    for (p += 'M ' + c + ' ' + d, g = 0; g < T; g++)
                        ((p +=
                            'Q ' +
                            (c + 0.25 * (f - c)) +
                            ' ' +
                            (h - r / 2) +
                            ' ' +
                            (c + 0.5 * (f - c)) +
                            ' ' +
                            h +
                            'T ' +
                            f +
                            ' ' +
                            h),
                            (c = f),
                            (f = c + s));
                    for (f = c, h += l, g = 0; g < u; g++)
                        ((p +=
                            'Q ' +
                            (c + r / 2) +
                            ' ' +
                            (d + 0.25 * (h - d)) +
                            ' ' +
                            c +
                            ' ' +
                            (d + 0.5 * (h - d)) +
                            'T ' +
                            c +
                            ' ' +
                            h),
                            (d = h),
                            (h = d + l));
                    for (h = d, f = c - s, g = 0; g < T; g++)
                        ((p +=
                            'Q ' +
                            (c - 0.25 * Math.abs(f - c)) +
                            ' ' +
                            (h + r / 2) +
                            ' ' +
                            (c - 0.5 * Math.abs(f - c)) +
                            ' ' +
                            h +
                            'T ' +
                            f +
                            ' ' +
                            h),
                            (c = f),
                            (f = c - s));
                    for (f = c, h -= l, g = 0; g < u; g++)
                        ((p +=
                            'Q ' +
                            (c - r / 2) +
                            ' ' +
                            (d - 0.25 * Math.abs(h - d)) +
                            ' ' +
                            c +
                            ' ' +
                            (d - 0.5 * Math.abs(h - d)) +
                            'T ' +
                            c +
                            ' ' +
                            h),
                            (d = h),
                            (h = d - l));
                    ((p += 'Z'), V(e, p));
                },
                [r.BOUNDARYSHAPE.TENSION]: function (e, t) {
                    const i = t.width,
                        n = t.height,
                        r = Y / 2,
                        o = i - 0 - Y,
                        a = n - 0 - Y,
                        s = o / Math.max(1, parseInt(o / 40, 10)),
                        l = a / Math.max(1, parseInt(a / 40, 10));
                    let c = 0 + r,
                        d = 0 + r,
                        f = 0 + s + r,
                        h = 0 + r,
                        p = '';
                    const T = o / s,
                        u = a / l;
                    let g;
                    for (p += 'M ' + c + ' ' + d, g = 0; g < T; g++)
                        ((p +=
                            'Q ' +
                            (c + 0.5 * (f - c)) +
                            ' ' +
                            (h + r) +
                            ' ' +
                            f +
                            ' ' +
                            h),
                            (c = f),
                            (f = c + s));
                    for (f = c, h += l, g = 0; g < u; g++)
                        ((p +=
                            'Q ' +
                            (c - r) +
                            ' ' +
                            (d + 0.5 * (h - d)) +
                            ' ' +
                            c +
                            ' ' +
                            h),
                            (d = h),
                            (h = d + l));
                    for (h = d, f = c - s, g = 0; g < T; g++)
                        ((p +=
                            'Q ' +
                            (c - 0.5 * Math.abs(f - c)) +
                            ' ' +
                            (h - r) +
                            ' ' +
                            f +
                            ' ' +
                            h),
                            (c = f),
                            (f = c - s));
                    for (f = c, h -= l, g = 0; g < u; g++)
                        ((p +=
                            'Q ' +
                            (c + r) +
                            ' ' +
                            (d - 0.5 * Math.abs(h - d)) +
                            ' ' +
                            c +
                            ' ' +
                            h),
                            (d = h),
                            (h = d - l));
                    ((p += 'Z'), V(e, p));
                },
                [r.BOUNDARYSHAPE.ROUNDEDPOLYGON]: function (e, t) {
                    z(j(e, t), e);
                },
                [r.BOUNDARYSHAPE.POLYGON]: function (e, t) {
                    W(j(e, t), e);
                },
                [r.BOUNDARYSHAPE.NEWBOUNDARY1]: function (e, t) {
                    const i = t.width,
                        n = t.height;
                    V(
                        e,
                        'M 50 0L ' +
                            (i - 5) +
                            ' 0Q ' +
                            i +
                            ' 0 ' +
                            i +
                            ' 5L ' +
                            i +
                            ' ' +
                            (n - 50) +
                            'Q ' +
                            i +
                            ' ' +
                            n +
                            ' ' +
                            (i - 50) +
                            ' ' +
                            n +
                            'L 5 ' +
                            n +
                            'Q 0 ' +
                            n +
                            ' 0 ' +
                            (n - 5) +
                            'L 0 50Q 0 0 50 0z'
                    );
                },
                [r.BOUNDARYSHAPE.NEWBOUNDARY2]: function (e, t) {
                    z(
                        [
                            { x: 50, y: 0 },
                            { x: t.width, y: t.height },
                            { x: t.width - 50, y: t.height },
                            { x: 0, y: t.height },
                        ],
                        e
                    );
                },
                [r.BOUNDARYSHAPE.NEWBOUNDARY3]: function (e, t) {
                    W(
                        [
                            { x: 0, y: 0 },
                            { x: t.width, y: 0 },
                            { x: t.width + 50, y: t.height / 2 },
                            { x: t.width, y: t.height },
                            { x: 0, y: t.height },
                        ],
                        e
                    );
                },
                [r.BOUNDARYSHAPE.FOCUS]: function (e, t) {
                    const i = t.width,
                        n = t.height,
                        r = Math.min(60, Math.min(n, i) / 8),
                        o = `M 0 ${r} L 0 0 L ${r} 0\n            M ${i - r} 0 L ${i} 0 L ${i} ${r}\n            M ${i} ${n - r} L ${i} ${n} L ${i - r} ${n}\n            M 0 ${n - r} L 0 ${n} L ${r} ${n}\n            `,
                        a = Object.assign({ x: 0, y: 0 }, t),
                        s = Object(k.h)(a);
                    V(e, o, s);
                },
                [r.BOUNDARYSHAPE.CROSS]: function (e, t) {
                    const i = t.width,
                        n = t.height,
                        r = _.a.CROSSBOUNDARYLEN,
                        o = `M ${-r} 0 L ${i + r} 0\n            M ${i} ${-r} L ${i} ${n + r}\n            M ${-r} ${n} L ${i + r} ${n}\n            M 0 ${-r} L 0 ${n + r}`,
                        a = Object.assign({ x: 0, y: 0 }, t),
                        s = Object(k.h)(a);
                    V(e, o, s);
                },
            };
        function j(e, t) {
            const i = e.parent(),
                n = Object(F.a)(
                    i.getStructureClass()
                ).getChildTargetOrientation(i, e.model.rangeStart),
                o = t.width,
                a = t.height,
                s = { x: 0, y: 0 },
                l = { x: o, y: 0 },
                c = { x: 0, y: a },
                d = { x: o, y: a };
            let f, h;
            switch (n) {
                case r.DIRECTION.DOWN:
                    ((f = s), (h = l));
                    break;
                case r.DIRECTION.UP:
                    ((f = c), (h = d));
                    break;
                case r.DIRECTION.RIGHT:
                    ((f = s), (h = c));
                    break;
                case r.DIRECTION.LEFT:
                    ((f = l), (h = d));
            }
            const p = i
                .getChildrenBranchesByType()
                .filter((e) => !0 !== e.isPlaceHolderView);
            let u = [];
            const g = e.getRealPosition();
            if ('master' === e.model.get('range')) u = u.concat($(g, i, n));
            else
                for (let t = e.model.rangeStart; t <= e.model.rangeEnd; t++)
                    (p[t] ||
                        e
                            .getContext()
                            .config(r.CONFIG.LOGGER)
                            .warn('empty children'),
                        (u = u.concat($(g, p[t], n))));
            return (u.push(f), u.push(h), T.a.convexHull(u));
        }
        function $(e, t, i) {
            const n = [];
            let o, a;
            switch (i) {
                case r.DIRECTION.UP:
                    ((o = 'topLeft'), (a = 'topRight'));
                    break;
                case r.DIRECTION.DOWN:
                    ((o = 'bottomLeft'), (a = 'bottomRight'));
                    break;
                case r.DIRECTION.LEFT:
                    ((o = 'topLeft'), (a = 'bottomLeft'));
                    break;
                case r.DIRECTION.RIGHT:
                    ((o = 'topRight'), (a = 'bottomRight'));
            }
            return (
                (function t(i) {
                    if (i.shouldHide()) return;
                    const s = i.getRealPosition(),
                        l = s.x - e.x,
                        c = s.y - e.y,
                        d = (function (e) {
                            const t = Y,
                                i = e.topicView.bounds,
                                n = i.x - t,
                                r = i.y - t,
                                o = i.x + i.width + t,
                                a = i.y + i.height + t;
                            return {
                                topLeft: { x: n, y: r },
                                topRight: { x: o, y: r },
                                bottomLeft: { x: n, y: a },
                                bottomRight: { x: o, y: a },
                            };
                        })(i),
                        f = d[o],
                        h = d[a];
                    if (
                        ((f.x += l),
                        (h.x += l),
                        (f.y += c),
                        (h.y += c),
                        n.push(f),
                        n.push(h),
                        !i.collapse && !i.isPlaceHolderView)
                    ) {
                        i.getChildrenBranchesByType([
                            r.TOPIC_TYPE.ATTACHED,
                            r.TOPIC_TYPE.CALLOUT,
                            r.TOPIC_TYPE.SUMMARY,
                        ]).forEach((e, i) => {
                            t(e);
                        });
                    }
                })(t),
                n
            );
        }
        function z(e, t) {
            if (e.length >= 3) {
                const i = e.slice();
                i[i.length] = i[0];
                let n,
                    r,
                    o,
                    a,
                    s,
                    l,
                    c = '';
                for (let e = 1; e < i.length; e++)
                    ((n = i[e - 1]),
                        (r = i[e]),
                        (s = T.a.calculateDistance(n, r)),
                        s > G
                            ? ((o = {
                                  x: (G * (r.x - n.x)) / s + n.x,
                                  y: (G * (r.y - n.y)) / s + n.y,
                              }),
                              (a = {
                                  x: ((s - G) * (r.x - n.x)) / s + n.x,
                                  y: ((s - G) * (r.y - n.y)) / s + n.y,
                              }))
                            : ((o = {
                                  x: ((s / 2) * (r.x - n.x)) / s + n.x,
                                  y: ((s / 2) * (r.y - n.y)) / s + n.y,
                              }),
                              (a = { x: o.x, y: o.y })),
                        '' === c
                            ? ((c += 'M ' + o.x + ' ' + o.y), (l = o))
                            : (c +=
                                  ' Q ' +
                                  n.x +
                                  ' ' +
                                  n.y +
                                  ' ' +
                                  o.x +
                                  ' ' +
                                  o.y),
                        (c += ' L ' + a.x + ' ' + a.y));
                ((c += ' Q ' + i[0].x + ' ' + i[0].y + ' ' + l.x + ' ' + l.y),
                    (c += ' Z'),
                    V(t, c));
            }
        }
        function W(e, t) {
            if (e.length >= 3) {
                const i = e.shift();
                let n = 'M ' + i.x + ' ' + i.y;
                (e.forEach((e, t) => {
                    n += ' L ' + e.x + ' ' + e.y;
                }),
                    (n += ' Z'),
                    V(t, n));
            }
        }
        var K = (e) =>
            U[e]
                ? U[e]
                : (B.b
                      .get(r.CONFIG.LOGGER)
                      .warn(`Unsupported boundary shape class: ${e}`),
                  U[r.BOUNDARYSHAPE.ROUNDEDRECT]);
        class Z {
            constructor(e) {
                ((this.figure = e),
                    (this.svg = new s.a.G().data('name', 'boundary-group')),
                    (this.boundaryPath = new s.a.Path()
                        .data('name', 'boundary-path')
                        .attr('fill', 'none')),
                    (this.boundaryFillPath = new s.a.Path().data(
                        'name',
                        'boundary-fill-path'
                    )),
                    (this.boundaryActionPath = new s.a.Path()
                        .data('name', 'boundary-action-path')
                        .attr('pointer-events', 'fill')),
                    this.svg
                        .add(this.boundaryPath)
                        .add(this.boundaryFillPath)
                        .add(this.boundaryActionPath),
                    this.figure.viewController.setElement(this.svg.node),
                    this.figure.viewController.style(
                        this.boundaryActionPath,
                        'boundaryActionPath'
                    ),
                    this.svg.hide());
            }
            work() {
                const e = this.figure.getParent();
                if (e) {
                    if (
                        (this.figure.lineColorDirty &&
                            (this.boundaryPath.attr({
                                stroke: this.figure.lineColor,
                            }),
                            (this.figure.lineColorDirty = !1)),
                        this.figure.fillOpacityDirty &&
                            (this.boundaryFillPath.attr({
                                'fill-opacity': this.figure.fillOpacity,
                            }),
                            (this.figure.fillOpacityDirty = !1)),
                        this.figure.borderWidthDirty &&
                            (this.boundaryPath.attr({
                                'stroke-width': this.figure.borderWidth,
                            }),
                            this.boundaryActionPath.attr({
                                'stroke-width': this.figure.borderWidth + 5,
                            }),
                            (this.figure.borderWidthDirty = !1)),
                        this.figure.linePatternDirty &&
                            (this.updateBoundaryLinePatten(),
                            (this.figure.linePatternDirty = !1)),
                        this.figure.fillColorDirty)
                    ) {
                        let e = this.figure.fillColor;
                        const t = this.figure.viewController;
                        if (t.editDomain().content().isGradient()) {
                            const i = t.parent().svg.gradient('linear', (e) => {
                                (e.at(0, '#fff'),
                                    e.at(1, this.figure.fillColor));
                            });
                            (i.from(0, 0).to(0, 1), (e = i));
                        }
                        (this.boundaryFillPath.attr({
                            fill: e,
                            stroke: 'none',
                            opacity: 1,
                        }),
                            (this.figure.fillColorDirty = !1));
                    }
                    if (
                        this.figure.shapeClassDirty ||
                        this.figure.sizeDirty ||
                        this.figure.boundaryShapeSizeDirty ||
                        this.figure.positionDirty
                    ) {
                        (K(this.figure.shapeClass)(
                            this.figure.viewController,
                            this.figure.boundaryShapeSize
                        ),
                            (this.figure.shapeClassDirty = !1),
                            (this.figure.sizeDirty = !1),
                            (this.figure.boundaryShapeSizeDirty = !1));
                        const { position: e } = this.figure;
                        (this.svg.translate(e.x, e.y),
                            (this.figure.positionDirty = !1));
                    }
                    (this.figure.boundaryPathDirty &&
                        (this.updateBoundaryLinePatten(),
                        this.updateBoundaryBG(),
                        (this.figure.boundaryPathDirty = !1)),
                        this.figure.fillPatternDirty &&
                            (this.updateBoundaryBG(),
                            (this.figure.fillPatternDirty = !1)),
                        this.figure.isVisibleDirty &&
                            (this.figure.isVisible
                                ? this.svg.show()
                                : this.svg.hide(),
                            (this.figure.isVisibleDirty = !1)),
                        this.figure.opacityDirty &&
                            (this.svg.attr('opacity', this.figure.opacity),
                            (this.figure.opacityDirty = !1)),
                        e.renderWorker.appendChild('boundary', this.svg));
                }
            }
            updateBoundaryLinePatten() {
                const e = Object(c.getComplexLinePatternAttr)(
                    this.figure.linePattern,
                    {
                        linePath: this.figure.boundaryPath,
                        lineWidth: this.figure.borderWidth,
                        isBoundary: !0,
                    }
                );
                (this.boundaryPath.attr(e),
                    this.boundaryActionPath.attr({ d: e.d }));
            }
            updateBoundaryBG() {
                const e = Object(c.getFillPatternAttr)(
                    this.figure.fillPattern,
                    {
                        fillPath: this.figure.boundaryFillPath,
                        isForceHandDrawnSolid: !0,
                    }
                );
                this.boundaryFillPath.attr(e).back();
            }
            appendChild(e, t, i) {
                const n = this.figure.viewController.parent();
                if (!n) return;
                const r = n.figure.renderWorker;
                switch (e) {
                    case 'selectbox':
                        r.appendChild('selectbox', t);
                        break;
                    case 'title':
                        t.parent !== this.svg && this.svg.add(t);
                }
            }
            getContent() {
                return this.svg;
            }
            dispose() {
                this.svg.remove();
            }
        }
        class J {
            constructor(e) {
                ((this.figure = e),
                    (this.svg = new s.a.G()
                        .data('name', 'select-box-group')
                        .hide()),
                    (this.selectBox = this.svg
                        .put(new s.a.Path())
                        .data('name', 'select-box')),
                    (this.selectBoxOneG = new s.a.G().data(
                        'name',
                        'select-box-one-g'
                    )),
                    (this.selectBoxTwoG = new s.a.G().data(
                        'name',
                        'select-box-two-g'
                    )),
                    (this.selectBoxOne = new s.a.Path().data(
                        'name',
                        'select-box-one'
                    )),
                    (this.selectBoxTwo = new s.a.Path().data(
                        'name',
                        'select-box-two'
                    )),
                    (this.dragHandlerAreaOne = new s.a.Path().data(
                        'name',
                        'select-handler-area-one'
                    )),
                    (this.dragHandlerAreaTwo = new s.a.Path().data(
                        'name',
                        'select-handler-area-two'
                    )),
                    this.selectBoxOneG.add(this.dragHandlerAreaOne),
                    this.selectBoxTwoG.add(this.dragHandlerAreaTwo),
                    this.selectBoxOneG.add(this.selectBoxOne),
                    this.selectBoxTwoG.add(this.selectBoxTwo),
                    this.svg.add(this.selectBoxOneG).add(this.selectBoxTwoG),
                    (this.addTitleButtonG = new s.a.G().data(
                        'name',
                        'select-box-add-title-button-g'
                    )));
                const t = this.figure.viewController.refView.context;
                if (t && !t.getContext().isMobileAppPlatform()) {
                    const { addonModule: e } = Object(c.getInjectModule)(
                            r.MODULE_NAME.SNOWBIRD
                        ),
                        i = t
                            .getContext()
                            .getFileRealResource(
                                e.getBoundaryAddTitleButtonResource()
                            );
                    ((this.addTitleButtonIcon = new s.a.Image().load(i)),
                        this.addTitleButtonG.add(this.addTitleButtonIcon));
                }
                (this.svg.add(this.addTitleButtonG),
                    this.figure.viewController.setElement(this.svg.node));
            }
            work() {
                const e = this.figure.getParent();
                if (e) {
                    if (
                        (this.figure.isVisibleDirty &&
                            (this.figure.isVisible
                                ? this.svg.show()
                                : this.svg.hide(),
                            (this.figure.isVisibleDirty = !1)),
                        this.figure.opacityDirty &&
                            (this.svg.style('opacity', this.figure.opacity),
                            (this.figure.opacityDirty = !1)),
                        this.figure.transparentDirty)
                    ) {
                        const e = this.figure.transparent ? 0.5 : '1',
                            t = this.figure.transparent
                                ? 'rgba(#2ebdff, 0.5)'
                                : null;
                        (this.svg.style('opacity', e),
                            this.svg.style(
                                'pointer-events',
                                0.5 === e ? 'none' : 'auto'
                            ),
                            this.selectBox.style('stroke', t),
                            (this.figure.transparentDirty = !1));
                    }
                    (this.figure.selectBoxAttrsDirty &&
                        (this.selectBox.attr(this.figure.selectBoxAttrsToPack),
                        (this.figure.selectBoxAttrsToPack = {}),
                        (this.figure.selectBoxAttrsDirty = !1)),
                        this.figure.selectBoxOneAttrsDirty &&
                            (this.selectBoxOne.attr(
                                this.figure.selectBoxOneAttrsToPack
                            ),
                            (this.figure.selectBoxOneAttrsToPack = {}),
                            (this.figure.selectBoxOneAttrsDirty = !1)),
                        this.figure.selectBoxTwoAttrsDirty &&
                            (this.selectBoxTwo.attr(
                                this.figure.selectBoxTwoAttrsToPack
                            ),
                            (this.figure.selectBoxTwoAttrsToPack = {}),
                            (this.figure.selectBoxTwoAttrsDirty = !1)),
                        this.figure.dragHandlerAreaOneAttrsDirty &&
                            (this.dragHandlerAreaOne.attr(
                                this.figure.dragHandlerAreaOneAttrsToPack
                            ),
                            (this.figure.dragHandlerAreaOneAttrsToPack = {}),
                            (this.figure.dragHandlerAreaOneAttrsDirty = !1)),
                        this.figure.dragHandlerAreaTwoAttrsDirty &&
                            (this.dragHandlerAreaTwo.attr(
                                this.figure.dragHandlerAreaTwoAttrsToPack
                            ),
                            (this.figure.dragHandlerAreaTwoAttrsToPack = {}),
                            (this.figure.dragHandlerAreaTwoAttrsDirty = !1)),
                        this.figure.addTitleButtonAttrsDirty &&
                            (this.addTitleButtonG.attr(
                                this.figure.addTitleButtonAttrsToPack
                            ),
                            (this.figure.addTitleButtonAttrsToPack = {}),
                            (this.figure.addTitleButtonAttrsDirty = !1)),
                        e.renderWorker.appendChild('selectbox', this.svg));
                }
            }
            appendChild(e, t, i) {}
            getContent() {
                return this.svg;
            }
            dispose() {
                this.svg.remove();
            }
        }
        const X = 'hover',
            q = 'active',
            ee = 'hide',
            te = 16;
        class ie {
            constructor(e) {
                ((this.firstActive = !0),
                    (this.anchorSize = te),
                    (this.anchorBtnSize = 7),
                    (this.anchorBtnMargin = 4.5),
                    (this.figure = e),
                    (this.svg = new s.a.G().data('name', 'resize-box').hide()),
                    (this.box = this.svg.rect(0, 0).data('name', 'fullBox')),
                    this.figure.viewController.style(this.box, 'fullBox'));
                const t = (e) => this.svg.group().style('cursor', e);
                ((this.anchors = {
                    lt: t('nwse-resize'),
                    lm: t('ew-resize'),
                    lb: t('nesw-resize'),
                    ct: t('ns-resize'),
                    cb: t('ns-resize'),
                    rt: t('nesw-resize'),
                    rm: t('ew-resize'),
                    rb: t('nwse-resize'),
                }),
                    (this.anchorBtns = {}),
                    Object.keys(this.anchors).forEach((e) => {
                        const t = this.anchors[e];
                        (t.rect(te, te).opacity(0),
                            (this.anchorBtns[e] = t
                                .rect(7, 7)
                                .translate(4.5, 4.5)));
                    }),
                    this.styleAnchors('anchor'));
            }
            work() {
                var e, t, i, n, r, o;
                const a = this.figure.getParent();
                if (a) {
                    if (
                        (this.figure.lockRatioDirty &&
                            (Object.keys(this.anchors).forEach((e) => {
                                const t = this.anchors[e];
                                ['lm', 'ct', 'cb', 'rm'].includes(e) &&
                                    t[
                                        this.figure.lockRatio ? 'hide' : 'show'
                                    ]();
                            }),
                            (this.figure.lockRatioDirty = !1)),
                        this.figure.positionDirty)
                    ) {
                        const { x: i, y: n } = this.figure.position,
                            { width: r, height: o } = this.figure.size;
                        (this.svg.translate(i, n),
                            null === (e = this.cloneImage) ||
                                void 0 === e ||
                                e.attr('viewBox', `${i} ${n} ${r} ${o}`),
                            null === (t = this.cloneImage) ||
                                void 0 === t ||
                                t.size(r, o).move(i, n),
                            (this.figure.positionDirty = !1));
                    }
                    if (this.figure.displayStateDirty) {
                        switch (this.figure.displayState) {
                            case X:
                                (this.svg.show(),
                                    this.figure.viewController.style(
                                        this.box,
                                        'fullBox__show'
                                    ));
                                break;
                            case q:
                                (this.firstActive &&
                                    ((this.firstActive = !1),
                                    this.prepareAvatar(),
                                    this.figure.viewController.initSVGDraggable()),
                                    this.svg.show(),
                                    this.figure.viewController.style(
                                        this.box,
                                        'fullBox__active'
                                    ),
                                    this.styleAnchors('anchor__active'));
                                break;
                            case ee:
                                (this.styleAnchors('anchor'), this.svg.hide());
                        }
                        this.figure.displayStateDirty = !1;
                    }
                    if (this.figure.sizeDirty) {
                        const { width: e, height: t } = this.figure.size;
                        this.box.size(e, t).move(0, 0);
                        const { x: o = 0, y: a = 0 } =
                            (null === (i = this.figure) || void 0 === i
                                ? void 0
                                : i.position) || {};
                        (null === (n = this.cloneImage) ||
                            void 0 === n ||
                            n.attr('viewBox', `${o} ${a} ${e} ${t}`),
                            null === (r = this.cloneImage) ||
                                void 0 === r ||
                                r.size(e, t).move(o, a));
                        const s = {
                            l: 0,
                            m: t / 2,
                            r: e,
                            t: 0,
                            c: e / 2,
                            b: t,
                        };
                        for (const e in this.anchors) {
                            const t = -8 + s[e[0]],
                                i = -8 + s[e[1]];
                            this.anchors[e].move(t, i);
                        }
                        this.figure.sizeDirty = !1;
                    }
                    if (this.figure.avatarDisplayDirty) {
                        if (this.figure.avatarDisplay) {
                            this.avatarContainer.show();
                            const e =
                                this.figure.viewController.refView.getRealPosition();
                            this.avatarContainer.translate(e.x, e.y);
                        } else this.avatarContainer.hide();
                        this.avatarDisplayDirty = !1;
                    }
                    if (this.figure.avatarSizeDirty) {
                        const {
                            width: e,
                            height: t,
                            x: i,
                            y: n,
                        } = this.figure.avatarSize;
                        this.box.size(e, t).move(i, n);
                        const r = {
                            l: i,
                            m: t / 2 + n,
                            r: e + i,
                            t: n,
                            c: e / 2 + i,
                            b: t + n,
                        };
                        for (const e in this.anchors) {
                            const t = -8 + r[e[0]],
                                i = -8 + r[e[1]];
                            this.anchors[e].move(t, i);
                        }
                        (null === (o = this.cloneImage) ||
                            void 0 === o ||
                            o.size(e, t).move(i, n),
                            (this.figure.avatarSizeDirty = !1));
                    }
                    (this.figure.isVisibleDirty &&
                        (this.figure.isVisible
                            ? this.svg.show()
                            : this.svg.hide(),
                        (this.figure.isVisibleDirty = !1)),
                        a.renderWorker.appendChild('resizebox', this.svg));
                }
            }
            getContent() {
                return this.svg;
            }
            dispose() {
                (this.avatarContainer && this.avatarContainer.remove(),
                    this.svg.remove());
            }
            prepareAvatar() {
                var e;
                ((this.avatarContainer = new s.a.G()
                    .data('name', 'resize-box-avatar')
                    .hide()),
                    (this.cloneImage = this.avatarContainer.put(
                        new s.a.Nested()
                    )),
                    this.cloneImage.attr('preserveAspectRatio', 'none'));
                const t = this.figure.viewController.originImage;
                this.cloneImage
                    .put(new s.a.Use())
                    .attr('href', `#${t.attr('id')}`);
                const { x: i = 0, y: n = 0 } =
                        (null === (e = this.figure) || void 0 === e
                            ? void 0
                            : e.position) || {},
                    r = t.attr('width'),
                    o = t.attr('height');
                (this.cloneImage.attr('viewBox', `${i} ${n} ${r} ${o}`),
                    this.cloneImage.size(r, o).move(i, n),
                    this.figure.viewController.style(
                        this.cloneImage,
                        'avatarImage'
                    ),
                    this.avatarContainer.use(this.box));
                for (const e in this.anchors)
                    this.avatarContainer.use(this.anchors[e]);
                this.figure.viewController.refView
                    .editDomain()
                    .content()
                    .otherContainer.add(this.avatarContainer);
            }
            styleAnchors(e) {
                for (const t in this.anchorBtns)
                    this.figure.viewController.style(this.anchorBtns[t], e);
            }
            appendChild() {}
        }
        const ne = 'hover',
            re = 'active',
            oe = 'hide',
            ae = 'defocus',
            se = 'intersect';
        (r.TOPICSHAPE.DIAMOND, r.TOPICSHAPE.ELLIPSE, r.TOPICSHAPE.CLOUD);
        class le {
            constructor(e) {
                ((this.figure = e),
                    (this.svg = new s.a.G()
                        .data('name', 'topic-select-box-group')
                        .hide()),
                    (this.tsb = new s.a.Path().data(
                        'name',
                        'topic-select-box'
                    )),
                    this.svg.put(this.tsb),
                    this.figure.viewController.style(
                        this.tsb,
                        'topicShapeSelectBox'
                    ),
                    this._initCustomWidthControlBar(),
                    this.figure.viewController.setElement(this.svg.node));
            }
            _initCustomWidthControlBar() {
                function e() {
                    return new s.a.G()
                        .rect()
                        .data('name', 'topic-custom-width-control-bar')
                        .opacity(0)
                        .style('cursor', 'ew-resize');
                }
                ((this.leftBarSvg = e()),
                    (this.rightBarSvg = e()),
                    (this.cwcb = new s.a.G().data(
                        'name',
                        'topic-custom-width-control-bar-group'
                    )),
                    this.cwcb.put(this.leftBarSvg),
                    this.cwcb.put(this.rightBarSvg),
                    this.svg.put(this.cwcb));
            }
            work() {
                const e = this.figure.getParent();
                if (e) {
                    if (this.figure.positionDirty) {
                        const e = Object.assign({}, this.figure.position);
                        (this.svg.translate(e.x, e.y),
                            (this.figure.positionDirty = !1));
                    }
                    if (
                        (this.figure.isVisibleDirty &&
                            (this.figure.isVisible
                                ? this.svg.show()
                                : this.svg.hide(),
                            (this.figure.isVisibleDirty = !1)),
                        this.figure.opacityDirty &&
                            (this.svg.style('opacity', this.figure.opacity),
                            (this.figure.opacityDirty = !1)),
                        this.figure.topicSelectBoxPathDirty &&
                            (this.tsb.attr({
                                d: this.figure.topicSelectBoxPath,
                            }),
                            (this.figure.topicSelectBoxPathDirty = !1)),
                        this.figure.displayStyleDirty)
                    ) {
                        switch (this.figure.displayStyle) {
                            case ne:
                                this.figure.viewController.style(
                                    this.tsb,
                                    'topicShapeSelectBox__mouseover'
                                );
                                break;
                            case re:
                                this.figure.viewController.style(
                                    this.tsb,
                                    'topicShapeSelectBox__selected'
                                );
                                break;
                            case oe:
                                break;
                            case ae:
                                this.figure.viewController.style(
                                    this.tsb,
                                    'topicShapeSelectBox__deFocus'
                                );
                                break;
                            case se:
                                this.figure.viewController.style(
                                    this.tsb,
                                    'topicShapeSelectBox__intersected'
                                );
                        }
                        this.figure.displayStyleDirty = !1;
                    }
                    (this.figure.displayStateDirty &&
                        (this.figure.displayState
                            ? this.svg.show()
                            : this.svg.hide(),
                        (this.figure.displayStateDirty = !1)),
                        this.figure.barDisplayStateDirty &&
                            (this.figure.barDisplayState
                                ? Object(c.isPreventCustomWidthBranch)(
                                      this.figure.viewController.parent()
                                  )
                                    ? this.cwcb.hide()
                                    : this.cwcb.show()
                                : this.cwcb.hide(),
                            (this.figure.barDisplayStateDirty = !1)),
                        this.figure.topicSelectBoxAttrDirty &&
                            (this.tsb.attr(
                                this.figure.topicSelectBoxAttrToPack
                            ),
                            (this.figure.topicSelectBoxAttrToPack = {}),
                            (this.figure.topicSelectBoxAttrDirty = !1)),
                        this.figure.leftBarAttrDirty &&
                            (this.leftBarSvg.attr(this.figure.leftBarAttr),
                            (this.figure.leftBarAttrToPack = {}),
                            (this.figure.leftBarAttrDirty = !1)),
                        this.figure.rightBarAttrDirty &&
                            (this.rightBarSvg.attr(this.figure.rightBarAttr),
                            (this.figure.rightBarAttrToPack = {}),
                            (this.figure.rightBarAttrDirty = !1)),
                        this.figure.isVisibleDirty &&
                            (this.figure.isVisible
                                ? this.svg.show()
                                : this.svg.hide(),
                            (this.figure.isVisibleDirty = !1)),
                        e.renderWorker.appendChild('topicselectbox', this.svg));
                }
            }
            dispose() {
                this.svg.remove();
            }
            getContent() {
                return this.svg;
            }
            appendChild() {}
        }
        class ce extends g {
            protectedCreateTopicShapeFill() {
                const e = new s.a.Path();
                return (e.attr({ 'fill-opacity': '0.5' }), e);
            }
        }
        class de {
            constructor(e) {
                ((this.figure = e), this._initSVGStructure());
            }
            _initSVGStructure() {
                ((this.svg = new s.a.G().data('name', 'matrix-group')),
                    (this._s$cells = new s.a.G().data(
                        'name',
                        'matrix-cells-group'
                    )),
                    this.svg.put(this._s$cells),
                    this.figure.viewController.setElement(this.svg.node));
            }
            getContent() {
                return this.svg;
            }
            getCells() {
                return this._s$cells;
            }
            dispose() {
                this.svg.remove();
            }
            work() {
                (this.figure.isVisibleDirty &&
                    (this.figure.isVisible ? this.svg.show() : this.svg.hide(),
                    (this.figure.isVisibleDirty = !1)),
                    this.figure.opacityDirty &&
                        (this.svg.attr('opacity', this.figure.opacity),
                        (this.figure.opacityDirty = !1)));
            }
            appendChild(e, t) {
                switch (e) {
                    case r.FIGURE_TYPE.MATRIX_LABEL:
                    case r.FIGURE_TYPE.MATRIX_PLUS:
                        this.svg !== t.parent && this.svg.add(t);
                        break;
                    case r.FIGURE_TYPE.MATRIX_CELL:
                        this._s$cells !== t.parent && this._s$cells.add(t);
                }
            }
        }
        class fe extends b {
            constructor(e) {
                (super(e),
                    (this.figure = e),
                    (this.svg = new s.a.G()),
                    this.svg.add(this.titleText),
                    this.figure.viewController.setElement(this.svg.node));
            }
            getContent() {
                return this.svg;
            }
            work() {
                super.work();
                const e = this.figure.getParent();
                if (!e) return;
                this.figure.isVisibleDirty &&
                    (this.figure.isVisible ? this.svg.show() : this.svg.hide(),
                    (this.figure.isVisibleDirty = !1));
                e.renderWorker.appendChild(
                    r.FIGURE_TYPE.MATRIX_LABEL,
                    this.svg
                );
            }
            dispose() {
                this.svg.remove();
            }
        }
        class he {
            constructor(e) {
                ((this.figure = e), this._initSVGStructure());
            }
            _initSVGStructure() {
                this.svg = new s.a.G().data('name', 'matrix-cell');
                const e = this.figure.viewController,
                    { x: t, y: i, width: n, height: r } = e.bounds,
                    o = `M 0 0 l ${n} 0 l 0 ${r} l ${-n} 0 Z`;
                ((this._s$borderPath = new s.a.Path()
                    .data('name', 'matrix-cell-border-path')
                    .attr({ d: o, fill: 'none' })),
                    (this._s$fillPath = new s.a.Path()
                        .data('name', 'matrix-cell-fill-path')
                        .attr({ d: o })),
                    (this._s$selectedPath = new s.a.Path().attr({
                        d: o,
                        display: 'none',
                        fill: 'none',
                        stroke: 'rgb(94, 187, 254)',
                        'data-name': 'cell-select-box',
                        'stroke-width': 4,
                    })),
                    this.svg
                        .add(this._s$fillPath)
                        .add(this._s$borderPath)
                        .add(this._s$selectedPath),
                    this.svg.translate(t, i),
                    this.figure.viewController.setElement(this.svg.node));
            }
            getContent() {
                return this.svg;
            }
            work() {
                const e = this.figure.getParent();
                if (!e) return;
                if (this.figure.fillColorDirty) {
                    const e = this.figure.fillColor,
                        t =
                            'none' === e
                                ? { opacity: 0 }
                                : { opacity: 1, fill: e };
                    (this._s$fillPath.attr(t),
                        (this.figure.fillColorDirty = !1));
                }
                (this.figure.borderWidthDirty &&
                    (this._s$borderPath.attr({
                        'stroke-width': this.figure.borderWidth,
                    }),
                    (this.figure.borderWidthDirty = !1)),
                    this.figure.borderColorDirty &&
                        (this._s$borderPath.attr({
                            stroke: this.figure.borderColor,
                        }),
                        (this.figure.borderColorDirty = !1)),
                    this.figure.isVisibleDirty &&
                        (this.figure.isVisible
                            ? this.svg.show()
                            : this.svg.hide(),
                        (this.figure.isVisibleDirty = !1)));
                e.renderWorker.appendChild(r.FIGURE_TYPE.MATRIX_CELL, this.svg);
            }
            dispose() {
                this.svg.remove();
            }
        }
        const pe = _.a.MATRIX_PLUS_RADIUS;
        class Te {
            constructor(e) {
                ((this.figure = e), this._initSVGStructure());
            }
            _initSVGStructure() {
                ((this.svg = new s.a.G()
                    .style('cursor', 'pointer')
                    .attr({ 'data-name': 'matrix-plus-box' })),
                    this.svg.circle(2 * pe).fill('rgb(94, 187, 254)'),
                    this.svg
                        .circle(2 * pe)
                        .attr({ fill: 'none', stroke: '#fff' }));
                const e = `M 5,${pe} L${2 * pe - 5},${pe}M ${pe},5 L${pe},${2 * pe - 5}`;
                (this.svg.put(
                    new s.a.Path().attr({
                        d: e,
                        stroke: '#fff',
                        'stroke-linecap': 'round',
                    })
                ),
                    this.svg
                        .circle(4 * pe)
                        .fill('none')
                        .x(-pe)
                        .y(-pe)
                        .style({ pointerEvents: 'visible' }));
                const t = this.figure.viewController,
                    { x: i, y: n } = t.bounds;
                (this.svg.translate(i, n).hide(), t.setElement(this.svg.node));
            }
            getContent() {
                return this.svg;
            }
            work() {
                const e = this.figure.getParent();
                if (!e) return;
                (this.figure.visibleDirty &&
                    (this.figure.visible ? this.svg.show() : this.svg.hide(),
                    (this.figure.visibleDirty = !1)),
                    this.figure.isVisibleDirty &&
                        (this.figure.isVisible
                            ? this.svg.show()
                            : this.svg.hide(),
                        (this.figure.isVisibleDirty = !1)));
                e.renderWorker.appendChild(r.FIGURE_TYPE.MATRIX_PLUS, this.svg);
            }
            dispose() {
                this.svg.remove();
            }
        }
        const ue = _.a.BOUNDARY_TITLE;
        class ge extends b {
            constructor(e) {
                (super(e),
                    (this.svg = new s.a.G().data(
                        'name',
                        'boundary-title-group'
                    )),
                    this.titleText.data('name', 'boundary-title'),
                    (this.boundaryTitleBG = new s.a.Path().data(
                        'name',
                        'boundary-title-bg'
                    )),
                    this.svg.add(this.boundaryTitleBG),
                    this.svg.add(this.titleText));
            }
            work() {
                const e = this.figure.getParent();
                e &&
                    (this.figure.sizeDirty && this.updateShapePath(),
                    super.work(),
                    this.figure.bgFillColorDirty &&
                        (this.boundaryTitleBG.attr({
                            fill: this.figure.bgFillColor,
                        }),
                        (this.figure.bgFillColorDirty = !1)),
                    this.figure.position &&
                        this.svg.translate(
                            this.figure.position.x,
                            this.figure.position.y
                        ),
                    this.figure.isVisibleDirty &&
                        (this.figure.isVisible
                            ? this.svg.show()
                            : this.svg.hide(),
                        (this.figure.isVisibleDirty = !1)),
                    this.figure.attrsDirty &&
                        (this.svg.attr(this.figure.attrsToPack),
                        (this.figure.attrsToPack = {}),
                        (this.figure.attrsDirty = !1)),
                    e.renderWorker.appendChild('title', this.svg));
            }
            getShapePath() {
                const { width: e, height: t } = this.figure.size;
                return `M ${ue.TOP_LEFT_RADIUS} 0 L ${e - ue.TOP_RIGHT_RADIUS} 0 Q ${e} 0 ${e} ${ue.TOP_RIGHT_RADIUS} L ${e} ${t - ue.BOTTOM_RIGHT_RADIUS} Q ${e} ${t} ${e - ue.BOTTOM_RIGHT_RADIUS} ${t} L ${ue.BOTTOM_LEFT_RADIUS} ${t} Q 0 ${t} 0 ${t - ue.BOTTOM_LEFT_RADIUS} L 0 ${ue.TOP_LEFT_RADIUS} Q 0 0 ${ue.TOP_LEFT_RADIUS} 0 Z`;
            }
            updateShapePath() {
                const e = Object(c.getFillPatternAttr)(
                    this.figure.fillPattern,
                    {
                        fillPath: this.getShapePath(),
                        isForceHandDrawnSolid: !0,
                        isBoundaryTitle: !0,
                    }
                );
                this.boundaryTitleBG.attr(e);
            }
            appendChild(e, t, i) {}
            getContent() {
                return this.svg;
            }
            dispose() {
                this.svg.remove();
            }
        }
        class Qe {
            constructor(e) {
                ((this.figure = e),
                    (this.svg = new s.a.G().data('name', 'mathjax-group')),
                    (this.s$mathJaxOutPutNestedSVG = this.svg
                        .put(new s.a.Nested())
                        .data('name', 'mathjax-output-nested-svg')
                        .attr('xmlns', s.a.ns)
                        .attr('xmlns:xlink', s.a.xlink)
                        .attr('version', s.a.version)),
                    (this.s$mathJaxActionRect = this.svg
                        .put(new s.a.Rect())
                        .data('name', 'mathjax-action-rect')
                        .attr({
                            fill: 'none',
                            'pointer-events': 'all',
                        })),
                    this.figure.viewController.setElement(this.svg.node));
            }
            work() {
                const e = this.figure.getParent();
                e &&
                    (this.figure.sizeDirty &&
                        (this.s$mathJaxActionRect.attr(this.figure.size),
                        this.s$mathJaxOutPutNestedSVG.attr(this.figure.size),
                        (this.figure.sizeDirty = !1)),
                    this.figure.SVGOutputDirty &&
                        (this.s$mathJaxOutPutNestedSVG.attr({
                            viewBox:
                                this.figure.SVGOutput.getAttribute('viewBox'),
                        }),
                        Array.from(this.figure.SVGOutput.children).forEach(
                            (e) => {
                                this.s$mathJaxOutPutNestedSVG.node.appendChild(
                                    e.cloneNode(!0)
                                );
                            }
                        ),
                        (this.figure.SVGOutputDirty = !1),
                        (this.figure.textDirty = !1)),
                    this.figure.positionDirty &&
                        (this.svg.translate(
                            this.figure.position.x,
                            this.figure.position.y
                        ),
                        (this.figure.positionDirty = !1)),
                    this.figure.textColorDirty &&
                        (this.s$mathJaxOutPutNestedSVG.attr(
                            'fill',
                            this.figure.textColor
                        ),
                        (this.figure.textColorDirty = !1)),
                    e.renderWorker.appendChild('mathjax', this.svg));
            }
            getContent() {
                return this.svg;
            }
            dispose() {
                this.svg.remove();
            }
            appendChild(e, t) {
                if ('resizebox' === e) t.parent !== this.svg && this.svg.add(t);
            }
        }
        class me {
            constructor(e) {
                ((this.figure = e),
                    (this.s$svg = new s.a.G().data('name', 'tree-map-cell')),
                    (this.s$treeTableFill = this.s$svg
                        .put(new s.a.Path())
                        .data('name', 'tree-map-fill')
                        .attr('opacity', '0')),
                    (this.s$treeTableStroke = this.s$svg
                        .put(new s.a.Path())
                        .data('name', 'tree-map-stroke')
                        .attr({
                            fill: 'none',
                            'stroke-width': 0,
                            stroke: 'none',
                        })),
                    (this.s$treeTableSelectBox = this.s$svg
                        .put(new s.a.Path())
                        .data('name', 'tree-map-select-box')
                        .attr({
                            fill: 'none',
                            'stroke-width': 4,
                            display: 'none',
                        })),
                    this.figure.viewController.setElement(this.s$svg.node));
            }
            work() {
                const e = this.figure.getParent();
                if (e) {
                    if (
                        (this.figure.opacityDirty &&
                            (this.s$svg.attr('opacity', this.figure.opacity),
                            (this.figure.opacityDirty = !0)),
                        this.figure.isVisibleDirty &&
                            (this.figure.isVisible
                                ? this.s$svg.show()
                                : this.s$svg.hide(),
                            (this.figure.isVisibleDirty = !1)),
                        this.figure.sizeDirty &&
                            (this.updateAllPath(),
                            (this.figure.sizeDirty = !1)),
                        this.figure.fillPatternDirty &&
                            (this.updateAllPath(),
                            (this.figure.fillPatternDirty = !1)),
                        this.figure.positionDirty ||
                            this.figure.cellBoundsPositionDirty)
                    ) {
                        const e =
                                this.figure.position.x -
                                Math.abs(this.figure.cellBoundsPosition.x),
                            t =
                                this.figure.position.y -
                                Math.abs(this.figure.cellBoundsPosition.y);
                        (this.s$svg.translate(e, t),
                            (this.figure.positionDirty = !1),
                            (this.figure.cellBoundsPositionDirty = !1));
                    }
                    (this.figure.borderLineColorDirty &&
                        (this.s$treeTableStroke.attr(
                            'stroke',
                            this.figure.borderLineColor
                        ),
                        (this.figure.borderLineColorDirty = !1)),
                        this.figure.borderLineWidthDirty &&
                            (this.s$treeTableStroke.attr(
                                'stroke-width',
                                this.figure.borderLineWidth
                            ),
                            (this.figure.borderLineWidthDirty = !1)),
                        this.figure.borderLinePatternDirty &&
                            (this.updateAllPath(),
                            (this.figure.borderLinePatternDirty = !1)),
                        this.figure.fillColorDirty &&
                            (this.updateFillStyle(),
                            (this.figure.fillColorDirty = !1)),
                        this.figure.selectBoxAttrDirty &&
                            (this.s$treeTableSelectBox.attr(
                                this.figure.selectBoxAttr
                            ),
                            this.s$svg.node.parentNode &&
                                ('block' ===
                                this.s$treeTableSelectBox.attr('display')
                                    ? this.s$svg.front()
                                    : this.s$svg.back()),
                            (this.figure.selectBoxAttrDirty = !1)),
                        e.renderWorker.appendChild(
                            'treetablecell',
                            this.s$svg,
                            {
                                treeTableHeadBranchViewId:
                                    this.figure.viewController.getTreeTableHeadBranchViewId(),
                            }
                        ));
                }
            }
            updateAllPath() {
                const e = this.figure.size.width,
                    t = `M 0 0 l ${e} 0 l 0 ${this.figure.size.height} l ${-e} 0 Z`,
                    i = Object(c.getComplexLinePatternAttr)(
                        this.figure.borderLinePattern,
                        {
                            lineWidth: this.figure.borderLineWidth,
                            linePath: t,
                        }
                    );
                (this.s$treeTableStroke.attr(
                    Object(c.getLinePattenAttr)(
                        this.figure.borderLinePattern,
                        this.figure.borderLineWidth
                    )
                ),
                    [this.s$treeTableStroke, this.s$treeTableSelectBox].forEach(
                        (e) => {
                            e.attr(i);
                        }
                    ),
                    this.s$treeTableFill.attr(
                        Object(c.getFillPatternAttr)(this.figure.fillPattern, {
                            fillPath: t,
                        })
                    ),
                    this.updateFillStyle());
            }
            updateFillStyle() {
                let e = {};
                const { fillPattern: t, fillColor: i } = this.figure;
                ((e = Object(c.isNoneFillPattern)(t, i)
                    ? { opacity: 0 }
                    : Object(c.isSolidFillPattern)(t)
                      ? {
                            opacity: 1,
                            fill: this.figure.fillColor,
                            stroke: 'none',
                        }
                      : {
                            opacity: 1,
                            fill: 'none',
                            stroke: this.figure.fillColor,
                            'stroke-width':
                                u.b.getCurrentHandDrawnDefaultFillWidth(t),
                        }),
                    this.s$treeTableFill.attr(e));
            }
            appendChild() {}
            dispose() {
                this.s$svg.remove();
            }
            getContent() {
                return this.s$svg;
            }
        }
        class be {
            constructor(e) {
                ((this.figure = e),
                    (this.s$svg = new s.a.G().data(
                        'name',
                        'fish-bone-head-line'
                    )),
                    (this.s$fishBoneLine = this.s$svg
                        .put(new s.a.Path())
                        .data('name', 'line')));
            }
            work() {
                const e = this.figure.getParent();
                if (!e) return;
                let t;
                var i, n;
                (this.s$svg.attr('opacity', this.figure.opacity),
                    this.figure.isVisibleDirty &&
                        (this.figure.isVisible
                            ? this.s$svg.show()
                            : this.s$svg.hide(),
                        (this.figure.isVisibleDirty = !1)),
                    this.figure.lineTapered
                        ? (t = (function (e, t, i) {
                              const n = {
                                  x: e * (i === r.DIRECTION.RIGHT ? 1 : -1),
                                  y: -t / 2,
                              };
                              return `M 0 ${2 * -t} L ${n.x} ${n.y} L ${n.x} ${t / 2} L 0 ${2 * t}`;
                          })(
                              this.figure.bodyWidth,
                              this.figure.styleWidth,
                              this.figure.direction
                          ))
                        : ((i = this.figure.bodyWidth),
                          (n = this.figure.direction),
                          (t = `M 0 0 L ${i * (n === r.DIRECTION.RIGHT ? 1 : -1)} 0`)));
                this.figure.lineTapered;
                (this.s$fishBoneLine.attr(
                    Object(c.getComplexLinePatternAttr)(
                        this.figure.linePattern,
                        {
                            lineWidth: this.figure.styleWidth,
                            linePath: t,
                            lineColor: this.figure.lineColor,
                            isTaperedLine: this.figure.lineTapered,
                            isFishboneHeadbone: !0,
                        }
                    )
                ),
                    this.s$fishBoneLine.translate(
                        this.figure.position.x,
                        this.figure.position.y
                    ),
                    e.renderWorker.appendChild('fishboneheadline', this.s$svg, {
                        fishBoneHeadBranchViewId: this.figure.viewController
                            .parent()
                            .model.getId(),
                    }));
            }
            appendChild() {}
            dispose() {
                this.s$svg.remove();
            }
            getContent() {
                return this.s$svg;
            }
        }
        function Ce({ startPosition: e, endPosition: t }) {
            return `M ${t.x} ${t.y} L ${e.x} ${e.y}`;
        }
        class Le {
            constructor(e) {
                ((this.figure = e),
                    (this.s$svg = new s.a.G().data(
                        'name',
                        'fish-bone-main-line'
                    )),
                    (this.s$fishBoneLine = this.s$svg
                        .put(new s.a.Path())
                        .data('name', 'line')),
                    (this.s$fishBoneMarkerLine = this.s$svg
                        .put(new s.a.Path())
                        .data('name', 'marker-line')));
            }
            work() {
                const e = this.figure.getParent();
                if (!e) return;
                (this.s$svg.attr('opacity', this.figure.opacity),
                    this.figure.isVisibleDirty &&
                        (this.figure.isVisible
                            ? this.s$svg.show()
                            : this.s$svg.hide(),
                        (this.figure.isVisibleDirty = !1)));
                const t = {
                    startPosition: this.figure.startPosition,
                    endPosition: this.figure.endPosition,
                    lineWidth: this.figure.styleWidth,
                };
                let i = '';
                ((i = this.figure.lineTapered
                    ? (function ({
                          startPosition: e,
                          endPosition: t,
                          lineWidth: i,
                      }) {
                          const n = Object.assign({}, e),
                              r = Object.assign({}, t),
                              o = n.x - i / 2,
                              a = n.y,
                              s = r.x - 2 * i,
                              l = r.y,
                              c = r.x + 2 * i,
                              d = r.y,
                              f = n.x + i / 2,
                              h = n.y;
                          return `M ${n.x} ${n.y} ${o} ${a} L ${s} ${l} L ${r.x} ${r.y} L ${c} ${d} L ${f} ${h} Z`;
                      })(t)
                    : Object(c.isHandDrawnLinePattern)(this.figure.linePattern)
                      ? (function ({
                            startPosition: e,
                            endPosition: t,
                            lineWidth: i,
                        }) {
                            const n = i / 2,
                                r = Object.assign({}, e),
                                o = Object.assign({}, t),
                                a = r.x - n,
                                s = r.y,
                                l = o.x - n,
                                c = o.y,
                                d = o.x + n,
                                f = o.y,
                                h = r.x + n,
                                p = r.y;
                            return `M ${r.x} ${r.y} ${a} ${s} L ${l} ${c} L ${o.x} ${o.y} L ${d} ${f} L ${h} ${p}`;
                        })(t)
                      : (function ({
                            startPosition: e,
                            endPosition: t,
                            lineWidth: i,
                        }) {
                            const n = e.x > t.x,
                                r = e.y < t.y,
                                o = i / 2,
                                a = Math.pow(Math.cos(Math.PI / 6), 2) * o,
                                s =
                                    Math.sin(Math.PI / 6) *
                                    Math.cos(Math.PI / 6) *
                                    o *
                                    (n ? -1 : 1);
                            return `M ${e.x - a} ${e.y + (r ? s : -s)} L ${t.x - o} ${t.y} L ${t.x + o} ${t.y} L ${e.x + a} ${e.y + (r ? -s : s)} Z`;
                        })(t)),
                    this.s$fishBoneMarkerLine.attr({
                        d: Ce(t),
                        'stroke-width': this.figure.styleWidth,
                    }),
                    this.s$fishBoneLine.attr(
                        Object(c.getComplexLinePatternAttr)(
                            this.figure.linePattern,
                            {
                                linePath: i,
                                lineWidth: this.figure.styleWidth,
                                lineColor: this.figure.lineColor,
                                isTaperedLine: this.figure.lineTapered,
                                isFishboneMainbone: !0,
                                startBranchPosition: t.startPosition,
                                endBranchPosition: t.endPosition,
                            }
                        )
                    ),
                    e.renderWorker.appendChild('fishbonemainline', this.s$svg, {
                        fishBoneHeadBranchViewId: this.figure.viewController
                            .parent()
                            .parent()
                            .model.getId(),
                    }));
            }
            appendChild() {}
            dispose() {
                this.s$svg.remove();
            }
            getContent() {
                return this.s$svg;
            }
        }
        const ye = {
                maskUnits: 'userSpaceOnUse',
                x: '-100%',
                y: '-100%',
                width: '200%',
                height: '200%',
            },
            Me = {
                x: '-100%',
                y: '-100%',
                width: '200%',
                height: '200%',
            };
        class Ae {
            constructor(e) {
                ((this.figure = e), this.initSVGStructure());
            }
            initSVGStructure() {
                ((this.svg = new s.a.G().data('name', 'indicator')),
                    (this.line = this.svg.put(
                        new s.a.Path().data('name', 'indicator-line')
                    )),
                    (this.box = this.svg.put(
                        new s.a.Rect().data('name', 'indicator-box')
                    )));
            }
            tryInitMask(e) {
                this.connectionMasking ||
                    ((this.connectionMasking = e.svg.mask()),
                    (this.maskRegion = new s.a.Rect().attr({
                        fill: 'white',
                    })),
                    (this.cutRegion = new s.a.Path().attr({
                        fill: 'black',
                    })),
                    this.connectionMasking.add(this.maskRegion),
                    this.connectionMasking.add(this.cutRegion),
                    this.connectionMasking.attr(ye),
                    this.maskRegion.attr(Me),
                    this.svg.maskWith(this.connectionMasking));
            }
            removeMask() {
                (this.connectionMasking && this.connectionMasking.remove(),
                    (this.connectionMasking = null));
            }
            work() {
                this.figure.isVisibleDirty &&
                    (this.figure.isVisible ? this.svg.show() : this.svg.hide(),
                    (this.figure.isVisibleDirty = !1));
                const e = this.figure.viewController.getSheetView();
                if (!e) return;
                (e.figure.renderWorker.appendChild('indicator', this.svg, {}),
                    this.line.attr(this.figure.lineAttrs),
                    this.box.attr(this.figure.boxAttrs));
                const { startBranch: t, isBranchDirty: i } = this.figure;
                i &&
                    ((null == t ? void 0 : t.isMapLike())
                        ? (this.tryInitMask(e.editDomain()),
                          this.cutRegion.attr(Object(c.getMaskAttr)(t)))
                        : this.removeMask(),
                    (this.figure.isBranchDirty = !1));
            }
            appendChild(e, t, i) {}
            dispose() {
                (this.removeMask(), this.svg.remove());
            }
            getContent() {
                return this.svg;
            }
        }
        class ve {
            constructor(e) {
                ((this.figure = e),
                    (this.s$svg = new s.a.G().data(
                        'name',
                        'timeline-main-line-group'
                    )),
                    (this.s$line = this.s$svg.put(
                        new s.a.Path().data('name', 'timeline-main-line')
                    )),
                    (this.s$steps = this.s$svg.put(
                        new s.a.G().data(
                            'name',
                            'timeline-main-line-steps-group'
                        )
                    )),
                    this.figure
                        .getParent()
                        .renderWorker.appendChild(
                            'timelinemainline',
                            this.s$svg
                        ));
            }
            work() {
                if (this.figure.getParent()) {
                    if (
                        (this.figure.isVisibleDirty &&
                            (this.figure.isVisible
                                ? this.s$svg.show()
                                : this.s$svg.hide(),
                            (this.figure.isVisibleDirty = !1)),
                        this.figure.startPosition && this.figure.endPosition)
                    ) {
                        const { x: e, y: t } = this.figure.startPosition,
                            { x: i, y: n } = this.figure.endPosition,
                            r = `M ${e}, ${t} L ${i}, ${n}`;
                        this.s$line.attr('d', r);
                    }
                    if (
                        (this.figure.lineStepPointsDirty &&
                            (this.s$steps.clear(),
                            this.figure.lineStepPoints.forEach(
                                ({ x: e, y: t }) => {
                                    const i = new s.a.Ellipse();
                                    (i
                                        .data('name', 'timeline-main-line-step')
                                        .attr({
                                            cx: e,
                                            cy: t,
                                            rx: 5,
                                            ry: 5,
                                            fill: this.figure.lineColor,
                                        }),
                                        this.s$steps.put(i));
                                }
                            ),
                            (this.figure.lineStepPointsDirty = !1)),
                        this.figure.lineColorDirty &&
                            (this.s$line.attr('stroke', this.figure.lineColor),
                            this.s$steps.children().forEach((e) =>
                                e.attr({
                                    fill: this.figure.lineColor,
                                })
                            ),
                            (this.figure.lineColorDirty = !1)),
                        this.figure.linePatternDirty)
                    ) {
                        const e = this.figure.linePattern['stroke-linecap'],
                            t = this.figure.linePattern['stroke-dasharray'];
                        (this.s$line.attr(
                            'stroke-linecap',
                            null != e ? e : 'butt'
                        ),
                            this.s$line.attr(
                                'stroke-dasharray',
                                null != t ? t : 'none'
                            ),
                            (this.figure.lineColorDirty = !1));
                    }
                    this.s$line.attr('stroke-width', this.figure.lineWidth);
                }
            }
            appendChild() {}
            dispose() {
                this.s$svg.remove();
            }
            getContent() {
                return this.s$line;
            }
        }
        var Ee = new (class {
            createRenderWorker(e, t) {
                switch (e) {
                    case r.FIGURE_TYPE.SHEET:
                        return new l(t);
                    case r.FIGURE_TYPE.CONNECTION:
                        return new p(t);
                    case r.FIGURE_TYPE.TOPIC:
                        return new g(t);
                    case r.FIGURE_TYPE.COLLAPSE_EXTEND:
                        return new Q.a(t);
                    case r.FIGURE_TYPE.TOPIC_TITLE:
                        return new C(t);
                    case r.FIGURE_TYPE.NUMBERING:
                        return new L(t);
                    case r.FIGURE_TYPE.RELATIONSHIP_TITLE:
                        return new y(t);
                    case r.FIGURE_TYPE.RELATIONSHIP:
                        return new E(t);
                    case r.FIGURE_TYPE.IMAGE:
                        return new S(t);
                    case r.FIGURE_TYPE.MARKERS:
                        return new x(t);
                    case r.FIGURE_TYPE.MARKER:
                        return new R(t);
                    case r.FIGURE_TYPE.INFORMATION:
                        return new w(t);
                    case r.FIGURE_TYPE.LABELS:
                        return new P(t);
                    case r.FIGURE_TYPE.LABEL:
                        return new D(t);
                    case r.FIGURE_TYPE.BOUNDARY:
                        return new Z(t);
                    case r.FIGURE_TYPE.SELECT_BOX:
                        return new J(t);
                    case r.FIGURE_TYPE.RESIZE_BOX:
                        return new ie(t);
                    case r.FIGURE_TYPE.TOPIC_SELECT_BOX:
                        return new le(t);
                    case r.FIGURE_TYPE.PLACE_HOLDER_TOPIC:
                        return new ce(t);
                    case r.FIGURE_TYPE.MATRIX:
                        return new de(t);
                    case r.FIGURE_TYPE.MATRIX_LABEL:
                        return new fe(t);
                    case r.FIGURE_TYPE.MATRIX_CELL:
                        return new he(t);
                    case r.FIGURE_TYPE.MATRIX_PLUS:
                        return new Te(t);
                    case r.FIGURE_TYPE.BOUNDARY_TITLE:
                        return new ge(t);
                    case r.FIGURE_TYPE.MATH_JAX:
                        return new Qe(t);
                    case r.FIGURE_TYPE.TREE_TABLE_CELL:
                        return new me(t);
                    case r.FIGURE_TYPE.FISH_BONE_HEAD_LINE:
                        return new be(t);
                    case r.FIGURE_TYPE.FISH_BONE_MAIN_LINE:
                        return new Le(t);
                    case r.FIGURE_TYPE.INDICATOR:
                        return new Ae(t);
                    case r.FIGURE_TYPE.TIMELINE_MAIN_LINE:
                        return new ve(t);
                    case r.FIGURE_TYPE.BRANCH:
                    default:
                        return new d(t);
                }
            }
        })();
        var _e = (function (e) {
                switch (e) {
                    case r.RENDER_ENGINE_TYPE.CANVAS:
                        break;
                    case r.RENDER_ENGINE_TYPE.SVG:
                    default:
                        return Ee;
                }
            })(r.RENDER_ENGINE_TYPE.SVG),
            Oe = i(49),
            Se = {
                work(e) {
                    const t = e;
                    return (
                        (t.isLayout = !1),
                        Object(Oe.a)(t),
                        t.figure.setSize({
                            width: t.bounds.width,
                            height: t.bounds.height,
                        }),
                        t.bounds
                    );
                },
            },
            xe = i(5);
        class Re {
            constructor() {
                ((this.children = []),
                    (this.position = { x: 0, y: 0 }),
                    (this.size = { width: -1, height: -1 }));
            }
            add(e) {
                (this.children.push(e), (e._parent = this));
            }
            remove(e) {
                (this.children.splice(this.children.indexOf(e)),
                    (e._parent = null));
            }
            removeAll() {
                (this.children.forEach((e) => {
                    ((e._parent = null), e.removeAll());
                }),
                    (this.children.length = 0));
            }
            getChildren() {
                return [...this.children];
            }
            setLayout(e) {
                this.layout = e;
            }
            setLayoutData(e) {
                this.layoutData = e;
            }
            getLayout() {
                return this.layout;
            }
            getLayoutData() {
                return this.layoutData;
            }
            protectedCalcSize(e, t) {
                return { width: 0, height: 0 };
            }
            setSize(e) {
                this.size = e;
            }
            getSize() {
                return this.prefSize ? this.prefSize : this.size;
            }
            setPosition(e) {
                this.position = e;
            }
            getPosition() {
                return this.position;
            }
            getPreferredSize(e, t, i) {
                return this.prefSize
                    ? this.prefSize
                    : this.layout
                      ? this.layout.computeSize(this, e, t, i)
                      : this.protectedCalcSize(e, t);
            }
            setPreferredSize(e) {
                (this.prefSize && Object(xe.o)(this.prefSize, e)) ||
                    (this.prefSize = e);
            }
            invalidate(e) {
                ((this.prefSize = null),
                    this._parent && e && this._parent.invalidate(e));
            }
        }
        class Ie {
            computeSize(e, t, i, n) {
                const r = { x: 0, y: 0, width: t, height: i },
                    o = this.protectedLayout(e, !0, r, n);
                return (
                    -1 !== t && (o.width = t),
                    -1 !== i && (o.height = i),
                    o
                );
            }
            layout(e, t = !0) {
                const i = Object.assign(
                    Object.assign({}, e.getPosition()),
                    e.getSize()
                );
                this.protectedLayout(e, !0, i, t);
            }
            protectedLayout(e, t, i, n) {
                return { width: -1, height: -1 };
            }
            flushCache(e) {
                const t = e.getLayoutData();
                t && t.flushCache();
            }
        }
        class Ne {
            constructor() {
                ((this.widthHint = -1),
                    (this.heightHint = -1),
                    (this.cacheWidth = -1),
                    (this.cacheHeight = -1),
                    (this.defaultWhint = -1),
                    (this.defaultHhint = -1),
                    (this.defaultWidth = -1),
                    (this.defaultHeight = -1),
                    (this.currentWhint = -1),
                    (this.currentHhint = -1),
                    (this.currentWidth = -1),
                    (this.currentHeight = -1));
            }
            computeSize(e, t, i, n) {
                if (-1 === this.cacheWidth || -1 === this.cacheHeight) {
                    if (t === this.widthHint && i === this.heightHint) {
                        if (
                            -1 === this.defaultWidth ||
                            -1 === this.defaultHeight ||
                            t !== this.defaultWhint ||
                            i !== this.defaultHhint
                        ) {
                            const r = e.getPreferredSize(t, i, n) || {
                                width: -1,
                                height: -1,
                            };
                            ((this.defaultWhint = t),
                                (this.defaultHhint = i),
                                (this.defaultWidth = r.width),
                                (this.defaultHeight = r.height));
                        }
                        return (
                            (this.cacheWidth = this.defaultWidth),
                            void (this.cacheHeight = this.defaultHeight)
                        );
                    }
                    if (
                        -1 === this.currentWidth ||
                        -1 === this.currentHeight ||
                        t !== this.currentWhint ||
                        i !== this.currentHhint
                    ) {
                        const r = e.getPreferredSize(t, i, n);
                        ((this.currentWhint = t),
                            (this.currentHhint = i),
                            (this.currentWidth = r.width),
                            (this.currentHeight = r.height));
                    }
                    ((this.cacheWidth = this.currentWidth),
                        (this.cacheHeight = this.currentHeight));
                }
            }
            flushCache() {
                ((this.cacheWidth = this.cacheHeight = -1),
                    (this.defaultWidth = this.defaultHeight = -1),
                    (this.currentWidth = this.currentHeight = -1));
            }
        }
        function we(e) {
            return 'number' == typeof e;
        }
        class Pe extends Ie {
            constructor(e = 1, t) {
                (super(),
                    (this.horizontalSpacing = 0),
                    (this.verticalSpacing = 0),
                    (this.marginLeft = 0),
                    (this.marginRight = 0),
                    (this.marginTop = 0),
                    (this.marginBottom = 0),
                    (this.marginWidth = 0),
                    (this.marginHeight = 0),
                    (this.numColumns = e),
                    (this.makeColumnsEqualWidth = t));
            }
            _getData(e, t, i, n, r, o) {
                const a = e[t][i];
                if (a) {
                    const s = a.getLayoutData(),
                        l = Math.max(1, Math.min(s.horizontalSpan, r)),
                        c = Math.max(1, s.verticalSpan),
                        d = o ? t + c - 1 : t - c + 1,
                        f = o ? i + l - 1 : i - l + 1;
                    if (0 <= d && d < n && 0 <= f && f < r && a === e[d][f])
                        return s;
                }
                return null;
            }
            protectedLayout(e, t, i, n) {
                const { x: r, y: o, width: a, height: s } = i;
                if (this.numColumns < 1)
                    return {
                        width:
                            this.marginLeft +
                            2 * this.marginWidth +
                            this.marginRight,
                        height:
                            this.marginTop +
                            2 * this.marginHeight +
                            this.marginBottom,
                    };
                const l = e.getChildren();
                let c = 0;
                for (let e = 0; e < l.length; e++) {
                    const t = l[e].getLayoutData();
                    (t && t.exclude) || (l[c++] = l[e]);
                }
                if (0 === c)
                    return {
                        width:
                            this.marginLeft +
                            2 * this.marginWidth +
                            this.marginRight,
                        height:
                            this.marginTop +
                            2 * this.marginHeight +
                            this.marginBottom,
                    };
                for (let e = 0; e < c; e++) {
                    const t = l[e];
                    let i = t.getLayoutData();
                    if (
                        (i || t.setLayoutData((i = new He())),
                        n && i.flushCache(),
                        i.computeSize(t, i.widthHint, i.heightHint, n),
                        i.grabExcessHorizontalSpace &&
                            i.minimumWidth > 0 &&
                            i.cacheWidth < i.minimumWidth)
                    ) {
                        const e = 0;
                        ((i.cacheWidth = i.cacheHeight = -1),
                            i.computeSize(
                                t,
                                Math.max(0, i.minimumWidth - e),
                                i.heightHint,
                                !1
                            ));
                    }
                    i.grabExcessVerticalSpace &&
                        i.minimumHeight > 0 &&
                        (i.cacheHeight = Math.max(
                            i.cacheHeight,
                            i.minimumHeight
                        ));
                }
                let d = 0,
                    f = 0,
                    h = 0;
                const p = Math.min(c, this.numColumns);
                let T = [];
                for (let e = 0; e < c; e++) {
                    const t = l[e],
                        i = t.getLayoutData(),
                        n = Math.max(1, Math.min(i.horizontalSpan, p)),
                        r = Math.max(1, i.verticalSpan);
                    for (;;) {
                        for (
                            d + r >= T.length && (T = T.slice(0, T.length)),
                                T[d] || (T[d] = []);
                            f < p && T[d][f];
                        )
                            f++;
                        const e = f + n;
                        if (e <= p) {
                            let t = f;
                            for (; t < e && !T[d][t]; ) t++;
                            if (t === e) break;
                            f = t;
                        }
                        f + n >= p && ((f = 0), d++);
                    }
                    for (let e = 0; e < r; e++) {
                        T[d + e] || (T[d + e] = []);
                        for (let i = 0; i < n; i++) T[d + e][f + i] = t;
                    }
                    ((h = Math.max(h, d + r)), (f += n));
                }
                const u =
                    a -
                    this.horizontalSpacing * (p - 1) -
                    (this.marginLeft + 2 * this.marginWidth + this.marginRight);
                let g = 0;
                const Q = [],
                    m = [],
                    b = [];
                for (let e = 0; e < p; e++)
                    ((Q[e] = 0), (m[e] = 0), (b[e] = !1));
                for (let e = 0; e < p; e++) {
                    for (let t = 0; t < h; t++) {
                        const i = this._getData(T, t, e, h, p, !0);
                        if (i) {
                            if (
                                1 === Math.max(1, Math.min(i.horizontalSpan, p))
                            ) {
                                let t = i.cacheWidth + i.horizontalIndent;
                                ((Q[e] = Math.max(we(Q[e]) ? Q[e] : 0, t)),
                                    i.grabExcessHorizontalSpace &&
                                        (b[e] || g++, (b[e] = !0)),
                                    (i.grabExcessHorizontalSpace &&
                                        0 === i.minimumWidth) ||
                                        ((t =
                                            i.grabExcessHorizontalSpace &&
                                            -1 !== i.minimumWidth
                                                ? i.minimumWidth
                                                : i.cacheWidth),
                                        (t += i.horizontalIndent),
                                        (m[e] = Math.max(
                                            we(m[e]) ? m[e] : 0,
                                            t
                                        ))));
                            }
                        }
                    }
                    for (let t = 0; t < h; t++) {
                        const i = this._getData(T, t, e, h, p, !1);
                        if (i) {
                            const t = Math.max(
                                1,
                                Math.min(i.horizontalSpan, p)
                            );
                            if (t > 1) {
                                let n = 0,
                                    r = 0,
                                    o = 0;
                                for (let i = 0; i < t; i++)
                                    ((n += Q[e - i]),
                                        (r += m[e - i]),
                                        b[e - i] && o++);
                                i.grabExcessHorizontalSpace &&
                                    0 === o &&
                                    (g++, (b[e] = !0));
                                let a =
                                    i.cacheWidth +
                                    i.horizontalIndent -
                                    n -
                                    (t - 1) * this.horizontalSpacing;
                                if (a > 0)
                                    if (this.makeColumnsEqualWidth) {
                                        const i = (a + n) / t,
                                            r = (a + n) % t;
                                        let o = -1;
                                        for (let n = 0; n < t; n++)
                                            Q[(o = e - n)] = Math.max(
                                                i,
                                                Q[e - n]
                                            );
                                        o > -1 && (Q[o] += r);
                                    } else if (0 === o) Q[e] += a;
                                    else {
                                        const i = a / o,
                                            n = a % o;
                                        let r = -1;
                                        for (let n = 0; n < t; n++)
                                            b[e - n] && (Q[(r = e - n)] += i);
                                        r > -1 && (Q[r] += n);
                                    }
                                if (
                                    (!i.grabExcessHorizontalSpace ||
                                        0 !== i.minimumWidth) &&
                                    ((a =
                                        i.grabExcessHorizontalSpace &&
                                        -1 !== i.minimumWidth
                                            ? i.minimumWidth
                                            : i.cacheWidth),
                                    (a +=
                                        i.horizontalIndent -
                                        r -
                                        (t - 1) * this.horizontalSpacing),
                                    a > 0)
                                )
                                    if (0 === o) m[e] += a;
                                    else {
                                        const i = a / o,
                                            n = a % o;
                                        let r = -1;
                                        for (let n = 0; n < t; n++)
                                            b[e - n] && (m[(r = e - n)] += i);
                                        r > -1 && (m[r] += n);
                                    }
                            }
                        }
                    }
                }
                if (this.makeColumnsEqualWidth) {
                    let e = 0,
                        t = 0;
                    for (let i = 0; i < p; i++)
                        ((e = Math.max(e, m[i])), (t = Math.max(t, Q[i])));
                    t = -1 === a || 0 === g ? t : Math.max(e, u / p);
                    for (let e = 0; e < p; e++) ((b[e] = g > 0), (Q[e] = t));
                } else if (-1 !== a && g > 0) {
                    let e = 0;
                    for (let t = 0; t < p; t++) e += Q[t];
                    let t = g,
                        i = (u - e) / t,
                        n = (u - e) % t,
                        r = -1;
                    for (; Math.abs(e - u) >= 1; ) {
                        for (let e = 0; e < p; e++)
                            b[e] &&
                                (Q[e] + i > m[e]
                                    ? (Q[(r = e)] = Q[e] + i)
                                    : ((Q[e] = m[e]), (b[e] = !1), t--));
                        r > -1 && (Q[r] += n);
                        for (let e = 0; e < p; e++)
                            for (let t = 0; t < h; t++) {
                                const i = this._getData(T, t, e, h, p, !1);
                                if (i) {
                                    const t = Math.max(
                                        1,
                                        Math.min(i.horizontalSpan, p)
                                    );
                                    if (
                                        t > 1 &&
                                        (!i.grabExcessHorizontalSpace ||
                                            0 !== i.minimumWidth)
                                    ) {
                                        let n = 0,
                                            r = 0;
                                        for (let i = 0; i < t; i++)
                                            ((n += Q[e - i]), b[e - i] && r++);
                                        let o =
                                            i.grabExcessHorizontalSpace &&
                                            -1 !== i.minimumWidth
                                                ? i.minimumWidth
                                                : i.cacheWidth;
                                        if (
                                            ((o +=
                                                i.horizontalIndent -
                                                n -
                                                (t - 1) *
                                                    this.horizontalSpacing),
                                            o > 0)
                                        )
                                            if (0 === r) Q[e] += o;
                                            else {
                                                const i = o / r,
                                                    n = o % r;
                                                let a = -1;
                                                for (let n = 0; n < t; n++)
                                                    b[e - n] &&
                                                        (Q[(a = e - n)] += i);
                                                a > -1 && (Q[a] += n);
                                            }
                                    }
                                }
                            }
                        if (0 === t) break;
                        e = 0;
                        for (let t = 0; t < p; t++) e += Q[t];
                        ((i = (u - e) / t), (n = (u - e) % t), (r = -1));
                    }
                }
                let C = null,
                    L = 0;
                if (-1 !== a)
                    for (let e = 0; e < p; e++)
                        for (let t = 0; t < h; t++) {
                            const i = this._getData(T, t, e, h, p, !1);
                            if (null !== i && -1 === i.heightHint) {
                                const n = T[t][e],
                                    r = Math.max(
                                        1,
                                        Math.min(i.horizontalSpan, p)
                                    );
                                let o = 0;
                                for (let t = 0; t < r; t++) o += Q[e - t];
                                if (
                                    ((o +=
                                        (r - 1) * this.horizontalSpacing -
                                        i.horizontalIndent),
                                    (o !== i.cacheWidth &&
                                        -1 === i.horizontalAlignment) ||
                                        i.cacheWidth > o)
                                ) {
                                    const e = 0;
                                    ((i.cacheWidth = i.cacheHeight = -1),
                                        i.computeSize(
                                            n,
                                            Math.max(0, o - e),
                                            i.heightHint,
                                            !1
                                        ),
                                        i.grabExcessVerticalSpace &&
                                            i.minimumHeight > 0 &&
                                            (i.cacheHeight = Math.max(
                                                i.cacheHeight,
                                                i.minimumHeight
                                            )),
                                        C || (C = []),
                                        (C[L++] = i));
                                }
                            }
                        }
                const y =
                    s -
                    this.verticalSpacing * (h - 1) -
                    (this.marginTop +
                        2 * this.marginHeight +
                        this.marginBottom);
                g = 0;
                const M = [],
                    A = [],
                    v = [];
                for (let e = 0; e < h; e++)
                    ((M[e] = 0), (A[e] = 0), (v[e] = !1));
                for (let e = 0; e < h; e++) {
                    for (let t = 0; t < p; t++) {
                        const i = this._getData(T, e, t, h, p, !0);
                        if (i) {
                            if (
                                1 === Math.max(1, Math.min(i.verticalSpan, h))
                            ) {
                                let t = i.cacheHeight + i.verticalIndent;
                                ((M[e] = Math.max(we(M[e]) ? M[e] : 0, t)),
                                    i.grabExcessVerticalSpace &&
                                        (v[e] || g++, (v[e] = !0)),
                                    (i.grabExcessVerticalSpace &&
                                        0 === i.minimumHeight) ||
                                        ((t =
                                            i.grabExcessVerticalSpace &&
                                            -1 !== i.minimumHeight
                                                ? i.minimumHeight
                                                : i.cacheHeight),
                                        (t += i.verticalIndent),
                                        (A[e] = Math.max(
                                            we(A[e]) ? A[e] : 0,
                                            t
                                        ))));
                            }
                        }
                    }
                    for (let t = 0; t < p; t++) {
                        const i = this._getData(T, e, t, h, p, !1);
                        if (i) {
                            const t = Math.max(1, Math.min(i.verticalSpan, h));
                            if (t > 1) {
                                let n = 0,
                                    r = 0,
                                    o = 0;
                                for (let i = 0; i < t; i++)
                                    ((n += M[e - i]),
                                        (r += A[e - i]),
                                        v[e - i] && o++);
                                i.grabExcessVerticalSpace &&
                                    0 === o &&
                                    (g++, (v[e] = !0));
                                let a =
                                    i.cacheHeight +
                                    i.verticalIndent -
                                    n -
                                    (t - 1) * this.verticalSpacing;
                                if (a > 0)
                                    if (0 === o) M[e] += a;
                                    else {
                                        const i = a / o,
                                            n = a % o;
                                        let r = -1;
                                        for (let n = 0; n < t; n++)
                                            v[e - n] && (M[(r = e - n)] += i);
                                        r > -1 && (M[r] += n);
                                    }
                                if (
                                    (!i.grabExcessVerticalSpace ||
                                        0 !== i.minimumHeight) &&
                                    ((a =
                                        i.grabExcessVerticalSpace &&
                                        -1 !== i.minimumHeight
                                            ? i.minimumHeight
                                            : i.cacheHeight),
                                    (a +=
                                        i.verticalIndent -
                                        r -
                                        (t - 1) * this.verticalSpacing),
                                    a > 0)
                                )
                                    if (0 === o) A[e] += a;
                                    else {
                                        const i = a / o,
                                            n = a % o;
                                        let r = -1;
                                        for (let n = 0; n < t; n++)
                                            v[e - n] && (A[(r = e - n)] += i);
                                        r > -1 && (A[r] += n);
                                    }
                            }
                        }
                    }
                }
                if (-1 !== s && g > 0) {
                    let e = 0;
                    for (let t = 0; t < h; t++) e += M[t];
                    let t = g,
                        i = (y - e) / t,
                        n = (y - e) % t,
                        r = -1;
                    for (; Math.abs(e - y) >= 1; ) {
                        for (let e = 0; e < h; e++)
                            v[e] &&
                                (M[e] + i > A[e]
                                    ? (M[(r = e)] = M[e] + i)
                                    : ((M[e] = A[e]), (v[e] = !1), t--));
                        r > -1 && (M[r] += n);
                        for (let e = 0; e < h; e++)
                            for (let t = 0; t < p; t++) {
                                const i = this._getData(T, e, t, h, p, !1);
                                if (i) {
                                    const t = Math.max(
                                        1,
                                        Math.min(i.verticalSpan, h)
                                    );
                                    if (
                                        t > 1 &&
                                        (!i.grabExcessVerticalSpace ||
                                            0 !== i.minimumHeight)
                                    ) {
                                        let n = 0,
                                            r = 0;
                                        for (let i = 0; i < t; i++)
                                            ((n += M[e - i]), v[e - i] && r++);
                                        let o =
                                            i.grabExcessVerticalSpace &&
                                            -1 !== i.minimumHeight
                                                ? i.minimumHeight
                                                : i.cacheHeight;
                                        if (
                                            ((o +=
                                                i.verticalIndent -
                                                n -
                                                (t - 1) * this.verticalSpacing),
                                            o > 0)
                                        )
                                            if (0 === r) M[e] += o;
                                            else {
                                                const i = o / r,
                                                    n = o % r;
                                                let a = -1;
                                                for (let n = 0; n < t; n++)
                                                    v[e - n] &&
                                                        (M[(a = e - n)] += i);
                                                a > -1 && (M[a] += n);
                                            }
                                    }
                                }
                            }
                        if (0 === t) break;
                        e = 0;
                        for (let t = 0; t < h; t++) e += M[t];
                        ((i = (y - e) / t), (n = (y - e) % t), (r = -1));
                    }
                }
                if (t) {
                    let e = o + this.marginTop + this.marginHeight;
                    for (let t = 0; t < h; t++) {
                        let i = r + this.marginLeft + this.marginWidth;
                        for (let n = 0; n < p; n++) {
                            const r = this._getData(T, t, n, h, p, !0);
                            if (r) {
                                const o = Math.max(
                                        1,
                                        Math.min(r.horizontalSpan, p)
                                    ),
                                    a = Math.max(1, r.verticalSpan);
                                let s = 0,
                                    l = 0;
                                for (let e = 0; e < o; e++) s += Q[n + e];
                                for (let e = 0; e < a; e++) l += M[t + e];
                                s += this.horizontalSpacing * (o - 1);
                                let c = i + r.horizontalIndent,
                                    d = Math.min(r.cacheWidth, s);
                                switch (r.horizontalAlignment) {
                                    case He.CENTER:
                                        c += Math.max(
                                            0,
                                            (s - r.horizontalIndent - d) / 2
                                        );
                                        break;
                                    case He.END:
                                        c += Math.max(
                                            0,
                                            s - r.horizontalIndent - d
                                        );
                                        break;
                                    case He.FILL:
                                        d = s - r.horizontalIndent;
                                }
                                l += this.verticalSpacing * (a - 1);
                                let f = e + r.verticalIndent,
                                    h = Math.min(r.cacheHeight, l);
                                switch (r.verticalAlignment) {
                                    case He.CENTER:
                                        f += Math.max(
                                            0,
                                            (l - r.verticalIndent - h) / 2
                                        );
                                        break;
                                    case He.END:
                                        f += Math.max(
                                            0,
                                            l - r.verticalIndent - h
                                        );
                                        break;
                                    case He.FILL:
                                        h = l - r.verticalIndent;
                                }
                                const u = T[t][n];
                                u &&
                                    (u.setPosition({ x: c, y: f }),
                                    u.setSize({
                                        width: d,
                                        height: h,
                                    }));
                            }
                            i += Q[n] ? Q[n] + this.horizontalSpacing : 0;
                        }
                        e += M[t] ? M[t] + this.verticalSpacing : 0;
                    }
                }
                for (let e = 0; e < L; e++)
                    C[e].cacheWidth = C[e].cacheHeight = -1;
                let E = 0,
                    _ = 0;
                for (let e = 0; e < p; e++) E += Q[e];
                for (let e = 0; e < h; e++) _ += M[e];
                const O = Q.filter((e) => e).length,
                    S = M.filter((e) => e).length;
                return (
                    (E +=
                        this.horizontalSpacing * (O - 1) +
                        this.marginLeft +
                        2 * this.marginWidth +
                        this.marginRight),
                    (_ +=
                        this.verticalSpacing * (S - 1) +
                        this.marginTop +
                        2 * this.marginHeight +
                        this.marginBottom),
                    E < 0 && (E = 0),
                    _ < 0 && (_ = 0),
                    { width: E, height: _ }
                );
            }
        }
        class He extends Ne {
            constructor({
                horizontalAlignment: e = He.BEGINNING,
                verticalAlignment: t = He.CENTER,
                horizontalSpan: i = 1,
                verticalSpan: n = 1,
                verticalIndent: r = 0,
                horizontalIndent: o = 0,
                grabExcessHorizontalSpace: a = !1,
                grabExcessVerticalSpace: s = !1,
                exclude: l = !1,
                widthHint: c = -1,
                heightHint: d = -1,
                minimumWidth: f = 0,
                minimumHeight: h = 0,
            }) {
                (super(),
                    (this.horizontalAlignment = e),
                    (this.verticalAlignment = t),
                    (this.horizontalSpan = i),
                    (this.verticalSpan = n),
                    (this.horizontalIndent = o),
                    (this.verticalIndent = r),
                    (this.grabExcessHorizontalSpace = a),
                    (this.grabExcessVerticalSpace = s),
                    (this.exclude = l),
                    (this.widthHint = c),
                    (this.heightHint = d),
                    (this.minimumWidth = f),
                    (this.minimumHeight = h));
            }
        }
        ((He.BEGINNING = 1),
            (He.CENTER = 2),
            (He.END = 3),
            (He.FILL = 4),
            (He.VERTICAL_ALIGN_BEGINNING = 2),
            (He.VERTICAL_ALIGN_CENTER = 4),
            (He.VERTICAL_ALIGN_END = 8),
            (He.VERTICAL_ALIGN_FILL = 16),
            (He.HORIZONTAL_ALIGN_BEGINNING = 32),
            (He.HORIZONTAL_ALIGN_CENTER = 64),
            (He.HORIZONTAL_ALIGN_END = 128),
            (He.HORIZONTAL_ALIGN_FILL = 256),
            (He.GRAB_HORIZONTAL = 512),
            (He.GRAB_VERTICAL = 1024),
            (He.FILL_VERTICAL = He.VERTICAL_ALIGN_FILL | He.GRAB_VERTICAL),
            (He.FILL_HORIZONTAL =
                He.HORIZONTAL_ALIGN_FILL | He.GRAB_HORIZONTAL),
            (He.FILL_BOTH = He.FILL_VERTICAL | He.FILL_HORIZONTAL));
        var De = i(23);
        function Fe(e) {
            const t = (function (e) {
                    const t = new Re();
                    ((t._testName = 'numbering'),
                        (t.protectedCalcSize = () =>
                            e.numberingView
                                ? e.numberingView.bounds
                                : { width: 0, height: 0 }));
                    const i = new He({
                        horizontalAlignment: He.FILL,
                        verticalAlignment: He.CENTER,
                    });
                    return (t.setLayoutData(i), t);
                })(e),
                i = (function (e) {
                    const t = new Re();
                    ((t._testName = 'markers'),
                        (t.protectedCalcSize = () =>
                            e.markersView
                                ? e.markersView.bounds
                                : { width: 0, height: 0 }));
                    const i = new He({
                        horizontalAlignment: He.FILL,
                        verticalAlignment: He.CENTER,
                    });
                    return (t.setLayoutData(i), t);
                })(e),
                n = (function (e) {
                    const t = new Re();
                    ((t._testName = 'infor'),
                        (t.protectedCalcSize = () =>
                            e.informationIconView
                                ? e.informationIconView.bounds
                                : { width: 0, height: 0 }));
                    const i = new He({
                        horizontalAlignment: He.FILL,
                        verticalAlignment: He.CENTER,
                    });
                    return (t.setLayoutData(i), t);
                })(e),
                r = (function () {
                    const e = new Re();
                    e._testName = 'title';
                    const t = new He({
                        horizontalAlignment: He.FILL,
                        verticalAlignment: He.CENTER,
                        grabExcessHorizontalSpace: !0,
                    });
                    return (e.setLayoutData(t), e);
                })(),
                o = (function () {
                    const e = new Re();
                    e._testName = 'titleGroup';
                    const t = new Pe(1, !1);
                    ((t.horizontalSpacing = 0), e.setLayout(t));
                    const i = new He({
                        horizontalAlignment: He.FILL,
                        verticalAlignment: He.CENTER,
                        grabExcessHorizontalSpace: !0,
                    });
                    return (e.setLayoutData(i), e);
                })();
            o.add(r);
            const a = (function () {
                const e = new Re();
                e._testName = 'inner';
                const t = new Pe(4, !1);
                ((t.horizontalSpacing = 10), e.setLayout(t));
                const i = new He({
                    horizontalAlignment: He.FILL,
                    verticalAlignment: He.CENTER,
                    grabExcessHorizontalSpace: !0,
                });
                return (e.setLayoutData(i), e);
            })();
            (a.add(t), a.add(i), a.add(o), a.add(n));
            const s = (function (e) {
                    const t = new Re();
                    ((t._testName = 'imageLeft'),
                        (t.protectedCalcSize = Ue(e, 'left')));
                    const i = new He({
                        horizontalAlignment: He.BEGINNING,
                        verticalAlignment: He.CENTER,
                    });
                    return (t.setLayoutData(i), t);
                })(e),
                l = (function (e) {
                    const t = new Re();
                    ((t._testName = 'imageRight'),
                        (t.protectedCalcSize = Ue(e, 'right')));
                    const i = new He({
                        horizontalAlignment: He.END,
                        verticalAlignment: He.CENTER,
                    });
                    return (t.setLayoutData(i), t);
                })(e),
                c = (function () {
                    const e = new Re();
                    e._testName = 'centerGroup';
                    const t = new Pe(3, !1);
                    ((t.horizontalSpacing = 10), e.setLayout(t));
                    const i = new He({
                        horizontalAlignment: He.FILL,
                        verticalAlignment: He.FILL,
                        grabExcessHorizontalSpace: !0,
                        grabExcessVerticalSpace: !0,
                    });
                    return (e.setLayoutData(i), e);
                })();
            (c.add(s), c.add(a), c.add(l));
            const d = (function (e) {
                    const t = new Re();
                    ((t._testName = 'imageTop'),
                        (t.protectedCalcSize = Ue(e, 'top')));
                    const i = new He({
                        horizontalAlignment: He.CENTER,
                        verticalAlignment: He.BEGINNING,
                        grabExcessHorizontalSpace: !0,
                    });
                    return (t.setLayoutData(i), t);
                })(e),
                f = (function (e) {
                    const t = new Re();
                    ((t._testName = 'imageBottom'),
                        (t.protectedCalcSize = Ue(e, 'bottom')));
                    const i = new He({
                        horizontalAlignment: He.CENTER,
                        verticalAlignment: He.END,
                        grabExcessHorizontalSpace: !0,
                    });
                    return (t.setLayoutData(i), t);
                })(e),
                h = (function () {
                    const e = new Re();
                    e._testName = 'shapeGroup';
                    const t = new Pe(1);
                    ((t.verticalSpacing = 10), e.setLayout(t));
                    const i = new He({
                        horizontalAlignment: He.FILL,
                        verticalAlignment: He.FILL,
                        grabExcessHorizontalSpace: !0,
                        grabExcessVerticalSpace: !0,
                    });
                    return (e.setLayoutData(i), e);
                })();
            (h.add(d), h.add(c), h.add(f));
            const p = (function () {
                const e = new Re();
                e._testName = 'paddingGroup';
                const t = new He({
                    horizontalAlignment: He.FILL,
                    verticalAlignment: He.FILL,
                    grabExcessHorizontalSpace: !0,
                    grabExcessVerticalSpace: !0,
                });
                return (e.setLayoutData(t), e);
            })();
            p.add(h);
            const T = (function (e) {
                    const t = new Re();
                    ((t._testName = 'label'),
                        (t.protectedCalcSize = () =>
                            e.labelsView
                                ? (e.labelsView.render(!1), e.labelsView.bounds)
                                : { width: 0, height: 0 }));
                    const i = new He({
                        horizontalAlignment: He.BEGINNING,
                        verticalAlignment: He.BEGINNING,
                    });
                    return (t.setLayoutData(i), t);
                })(e),
                u = new Re();
            u._testName = 'topic';
            const g = new Pe(1, !1);
            return (
                (g.verticalSpacing = 4),
                u.setLayout(g),
                u.add(p),
                u.add(T),
                {
                    numberingCell: t,
                    markerGroupCell: i,
                    inforCell: n,
                    topicTitleCell: r,
                    topicTitleGroupCell: o,
                    innerGroupCell: a,
                    leftImageLikeGroupCell: s,
                    rightImageGroupCell: l,
                    middleGroupCell: c,
                    topImageLikeGroupCell: d,
                    bottomImageGroupCell: f,
                    topicShapeGroupCell: h,
                    topicShapePaddingGroupCell: p,
                    labelsGroupCell: T,
                    topicCell: u,
                }
            );
        }
        var ke = {
            work(e) {
                const t = e;
                if (!t.getContext()) return;
                const i = t.figure;
                let n = !0;
                const o = {
                        width:
                            (t._forcedMinTopicTitleBounds &&
                                t._forcedMinTopicTitleBounds.width) ||
                            0,
                        height:
                            (t._forcedMinTopicTitleBounds &&
                                t._forcedMinTopicTitleBounds.height) ||
                            0,
                    },
                    a = t.parent();
                void 0 === t._topicLayout && (t._topicLayout = Fe(t));
                const {
                    numberingCell: s,
                    markerGroupCell: l,
                    inforCell: d,
                    topicTitleCell: f,
                    topicTitleGroupCell: h,
                    innerGroupCell: p,
                    leftImageLikeGroupCell: T,
                    rightImageGroupCell: u,
                    middleGroupCell: g,
                    topImageLikeGroupCell: Q,
                    bottomImageGroupCell: m,
                    topicShapeGroupCell: b,
                    topicShapePaddingGroupCell: C,
                    labelsGroupCell: L,
                    topicCell: y,
                } = t._topicLayout;
                f.invalidate(!0);
                const {
                        fontStyle: M,
                        fontWeight: A,
                        fontSize: v,
                        fontFamily: E,
                    } = t.titleView.figure,
                    _ = {
                        fontStyle: M,
                        fontWeight: A,
                        fontSize: v,
                        fontFamily: E,
                    },
                    O = Object(c.getTextSize)('AA', _);
                ((f.protectedCalcSize = () => {
                    const e = { width: 0, height: 0 };
                    if (t.titleView)
                        if (n)
                            (t.titleView.figure.text ||
                                t.titleView.forceCalcSize) &&
                                ((e.width = Math.max(O.width, o.width)),
                                (e.height = Math.max(O.height, o.height)));
                        else {
                            const i = t.titleView.bounds;
                            if (
                                ((e.width = Math.max(i.width, o.width)),
                                (e.height = Math.max(i.height, o.height)),
                                !t.titleView.figure.text &&
                                    !t.titleView.forceCalcSize &&
                                    !(
                                        t.numberingView ||
                                        t.model.getMarkersData().length ||
                                        t.getInformationData() ||
                                        Ye(t)
                                    ))
                            ) {
                                const i = Object(c.calcTitleSize)(t.titleView);
                                ((e.height = i.height),
                                    t.titleView.figure.prefSize ||
                                        (e.width = i.width));
                            }
                        }
                    return e;
                }),
                    (s.getLayoutData().exclude = !t.numberingView),
                    (l.getLayoutData().exclude = !(
                        t.model.getMarkersData().length > 0
                    )),
                    (d.getLayoutData().exclude = !t.getInformationData()),
                    (h.getLayoutData().exclude = !t.titleView),
                    (f.getLayoutData().exclude = !t.titleView),
                    (p.getLayoutData().exclude = p
                        .getChildren()
                        .every((e) => e.getLayoutData().exclude)),
                    (T.getLayoutData().exclude = je(t, 'left')),
                    (u.getLayoutData().exclude = je(t, 'right')),
                    (g.getLayoutData().exclude = g
                        .getChildren()
                        .every((e) => e.getLayoutData().exclude)),
                    (Q.getLayoutData().exclude = je(t, 'top')),
                    (m.getLayoutData().exclude = je(t, 'bottom')),
                    (L.getLayoutData().exclude = !t.model.getLabel()));
                const S = b.getPreferredSize(-1, -1, !0);
                (b.setSize(S), C.setLayout(Be(t, S)));
                const x = C.getPreferredSize(-1, -1, !0);
                i.setMinimumWidth(x.width);
                let R = t.figure.customWidth;
                t.figure.forceAlignmentWidth &&
                    (R = t.figure.forceAlignmentWidth);
                const I = Object(c.isFixedAspectShapeBranch)(a),
                    N = Object(c.getTopicShape)(a);
                if (R) {
                    let e = Math.max(R, x.width),
                        r = !1;
                    const o = (e) => {
                            var i;
                            let r;
                            if (I) r = N.getDerivedContentSize(a, e).width;
                            else {
                                const n =
                                        (null ===
                                            (i =
                                                null == t
                                                    ? void 0
                                                    : t.titleView) ||
                                        void 0 === i
                                            ? void 0
                                            : i.bounds) || S,
                                    o = N.getTopicMargins(a, n);
                                r = Math.max(e - (o.left + o.right), O.width);
                            }
                            const o = b.getPreferredSize(r, -1, !0);
                            b.setSize(o);
                            const s = (e) => {
                                for (const t of e.getChildren())
                                    (t.getPreferredSize(
                                        t.getSize().width,
                                        -1,
                                        !0
                                    ),
                                        s(t));
                            };
                            s(b);
                            let l = h.getSize();
                            if (t.titleView) {
                                (t.titleView.figure.setPreferredSize(
                                    R ? l : null
                                ),
                                    t.titleView.figure.layoutWorker.work(
                                        t.titleView
                                    ),
                                    (n = !1),
                                    f.setPreferredSize(
                                        t.titleView.figure.prefSize
                                    ));
                                const e = I && l.height <= 0 ? 0 : -1;
                                b.setSize(b.getPreferredSize(-1, e, !0));
                            }
                            return b.getSize();
                        },
                        s = i.customWidth;
                    if (I && s && e < s) {
                        const i = t.shapeBounds.width;
                        for (;;) {
                            const t = o(e),
                                n = N.getFinalShapeSizeWithPadding(a, t).width;
                            if (!(n > i)) {
                                ((r = n > e), (e = r ? n : e));
                                break;
                            }
                            if (
                                ((r = !0),
                                (e = (e + s) / 2),
                                Math.abs(s - e) < 1)
                            ) {
                                e = s;
                                break;
                            }
                        }
                        r && t.model.customWidth(e);
                    } else o(e);
                } else {
                    t.titleView &&
                        (t.titleView.figure.setPreferredSize(null),
                        t.titleView.figure.layoutWorker.work(t.titleView),
                        (n = !1));
                    const e = b.getPreferredSize(-1, -1, !0);
                    b.setSize(e);
                    const i = (e) => {
                        for (const t of e.getChildren())
                            (t.getPreferredSize(t.getSize().width, -1, !0),
                                i(t));
                    };
                    i(b);
                    const r = h.getSize();
                    t.titleView &&
                        t.titleView.setSize(
                            Object.assign(
                                Object.assign({}, t.titleView.figure.size),
                                { width: Math.ceil(r.width) }
                            )
                        );
                }
                C.setLayout(Be(t, b.getSize()));
                const w = C.getPreferredSize(-1, -1, !0);
                if ((C.setSize(w), t.labelsView)) {
                    const e = C.getSize().width;
                    t.labelsView.setParentWidth(e);
                }
                const P = y.getPreferredSize(C.getSize().width, -1, !0);
                if (
                    (y.setSize(P),
                    t.figure.setTopicShapeGroupPosition({
                        x: C.getPosition().x,
                        y: C.getPosition().y,
                    }),
                    t.figure.setTopicContentPosition({
                        x: b.getPosition().x - C.getSize().width / 2,
                        y: b.getPosition().y - C.getSize().height / 2,
                    }),
                    t.figure.setTopicInnerElementPosition({
                        x: p.getPosition().x + g.getPosition().x,
                        y: p.getPosition().y + g.getPosition().y,
                    }),
                    Ye(t))
                ) {
                    let e;
                    switch (Ge(t)) {
                        case 'left':
                            e = {
                                x: T.getPosition().x + g.getPosition().x,
                                y: T.getPosition().y + g.getPosition().y,
                            };
                            break;
                        case 'bottom':
                            e = m.getPosition();
                            break;
                        case 'right':
                            e = {
                                x: u.getPosition().x + g.getPosition().x,
                                y: u.getPosition().y + g.getPosition().y,
                            };
                            break;
                        default:
                            e = Q.getPosition();
                    }
                    (t.mathJaxView || t.image).move(e.x, e.y);
                }
                return (
                    t.numberingView &&
                        t.numberingView.move(
                            s.getPosition().x,
                            s.getPosition().y
                        ),
                    t.markersView &&
                        t.markersView.figure.setPosition({
                            x: l.getPosition().x,
                            y: l.getPosition().y,
                        }),
                    t.titleView &&
                        t.titleView.move(h.getPosition().x, h.getPosition().y),
                    t.informationIconView &&
                        t.informationIconView.figure.setPosition({
                            x: d.getPosition().x,
                            y: d.getPosition().y,
                        }),
                    t.labelsView &&
                        t.labelsView.figure.setPosition({
                            x: L.getPosition().x - C.getSize().width / 2,
                            y: L.getPosition().y - C.getSize().height / 2,
                        }),
                    (t.contentBounds = Object.assign(
                        {
                            x: -b.getSize().width / 2,
                            y: -b.getSize().height / 2,
                        },
                        b.getSize()
                    )),
                    (t.shapeBounds = Object.assign(
                        {
                            x: -C.getSize().width / 2,
                            y: -C.getSize().height / 2,
                        },
                        C.getSize()
                    )),
                    (t.bounds = Object.assign(
                        { x: t.shapeBounds.x, y: t.shapeBounds.y },
                        y.getSize()
                    )),
                    (function (e) {
                        const t = e.parent();
                        if (t.originBranchView) return;
                        if (
                            ![
                                r.STRUCTURECLASS.TIMELINEHORIZONTALDOWN,
                                r.STRUCTURECLASS.TIMELINEHORIZONTALUP,
                            ].includes(t.getStructureClass())
                        )
                            return;
                        const i = e.figure.size,
                            n = e.bounds;
                        if (i.height === n.height) return;
                        const o = t.parent().getChildrenBranchesByType(),
                            a = o.indexOf(t);
                        if (a <= 0) return;
                        const s = o[a - 1],
                            l = s.topicView.bounds.height;
                        if (i.height < l && n.height < l) return;
                        s.figure.invalidateLayout();
                    })(t),
                    t.figure.setSize(Object.assign({}, t.bounds), I),
                    t.trigger('change:bounds', t.bounds, t),
                    (i.shapeClassDirty || i.sizeDirty) &&
                        N.render(i.viewController),
                    t.bounds
                );
            },
        };
        function Be(e, t) {
            const i = Object.assign({ x: -t.width / 2, y: -t.height / 2 }, t),
                n = Object(De.a)(e.figure.shapeClass).getTopicMargins(
                    e.parent(),
                    i
                ),
                r = new Pe(1);
            return (
                (r.marginTop = n.top),
                (r.marginLeft = n.left),
                (r.marginBottom = n.bottom),
                (r.marginRight = n.right),
                r
            );
        }
        function Ve(e, t) {
            return 'top' === t ? 'top' === e || 'up' === e || !e : e === t;
        }
        function Ye(e) {
            if (e.mathJaxView || e.image) return !0;
        }
        function Ge(e) {
            if (e.mathJaxView) return e.mathJaxView.figure.align;
            const t = e.model.get('image');
            return t && 'object' == typeof t ? t.align : void 0;
        }
        function Ue(e, t) {
            return () => {
                if (!Ve(Ge(e), t)) return { width: 0, height: 0 };
                if (e.mathJaxView) return e.mathJaxView.figure.size;
                const i = e.model.get('image');
                return i && i.src && e.image ? e.image.bounds : void 0;
            };
        }
        function je(e, t) {
            if (e.mathJaxView) {
                return !Ve(e.mathJaxView.figure.align, t);
            }
            const i = e.model.get('image');
            return !(
                i &&
                'object' == typeof i &&
                i.src &&
                e.image &&
                Ve(i.align, t)
            );
        }
        const $e = 5 / 6;
        var ze = {
                work(e) {
                    const t = e,
                        { markerIdList: i } = t;
                    if (!i || i.length <= 0)
                        return (
                            (t.bounds = {
                                x: 0,
                                y: 0,
                                width: 0,
                                height: 0,
                            }),
                            { width: 0, height: 0 }
                        );
                    let n = 0,
                        r = 0;
                    const o = i.length;
                    for (let e = 0; e < o; e++) {
                        const a = i[e],
                            s = t.getMarkerView(a);
                        s.figure.setPosition({ x: n, y: 0 });
                        const l = s.figure.size.width;
                        e === o - 1 ? ((n += l), (r = l)) : (n += l * $e);
                    }
                    return (
                        (t.bounds = {
                            x: 0,
                            y: 0,
                            width: n,
                            height: r,
                        }),
                        { width: n, height: r }
                    );
                },
            },
            We = i(86);
        const Ke = {
                fontWeight: 'font-weight',
                fontFamily: 'font-family',
                fontStyle: 'font-style',
                fontSize: 'font-size',
                color: 'fill',
                textDecoration: 'text-decoration',
            },
            Ze = { left: 'start', center: 'middle', right: 'end' },
            Je = (e) => {
                const t = {};
                return (
                    Object.keys(e)
                        .filter((e) => Ke[e])
                        .map((i) => {
                            t[Ke[i]] = e[i];
                        }),
                    t
                );
            };
        var Xe = {
            work(e) {
                const t = e;
                if (!t.getContext()) return;
                if (e instanceof We.a) {
                    const i = e.parent();
                    if (null == i ? void 0 : i.shouldPreventTitle())
                        return t.setSize({ width: 0, height: 0 });
                }
                const i = t.figure,
                    n = i.text;
                if (!t.forceCalcSize && !n)
                    return t.setSize(
                        i.prefSize
                            ? Object.assign(i.prefSize, {
                                  height: 0,
                              })
                            : { width: 0, height: 0 }
                    );
                const o = {
                    fontFamily: i.fontFamily,
                    fontSize: i.fontSize,
                    fontWeight: i.fontWeight,
                    fontStyle: i.fontStyle,
                    textAlign: i.textAlign,
                    textDecoration: i.textDecoration,
                    textTransform: i.textTransform,
                };
                if (o.fontSize) {
                    const e = Number.parseInt(o.fontSize || 0);
                    o.fontSize = e;
                }
                const a = (function (e, t, i) {
                        const n = T.a.getTransformedText(t, e.textTransform);
                        let o;
                        const a = e.viewController.parent().parent();
                        if (e.type === r.VIEW_TYPE.BOUNDARY_TITLE) {
                            const t = Object(c.calcBoundaryTitleMaxWidth)(
                                a,
                                e.viewController.parent()
                            );
                            o =
                                t >= i.fontSize
                                    ? Object(c.resolveString)(n, i, t)
                                    : Object(c.resolveString)(n, i, i.fontSize);
                        } else
                            o = e.prefSize
                                ? e.prefSize.width >= i.fontSize
                                    ? Object(c.resolveString)(
                                          n,
                                          i,
                                          e.prefSize.width
                                      )
                                    : Object(c.resolveString)(n, i, i.fontSize)
                                : Object(c.isBranch)(a) &&
                                    (Object(c.isMatrixMainBranch)(a) ||
                                        Object(c.isTreeTableStructure)(a))
                                  ? Object(c.resolveString)(
                                        n,
                                        i,
                                        r.TOPIC_MAX_CUSTOM_WIDTH
                                    )
                                  : Object(c.resolveString)(n, i);
                        return o.join('\n');
                    })(i, n, o),
                    s = Math.floor(1.34 * o.fontSize);
                let l;
                ((l = 'string' == typeof a ? Object(c.str2NodesArr)(a, o) : a),
                    (l = l.map((e) =>
                        0 === e.length ? [{ content: ' ', style: o }] : e
                    )),
                    t.figure.setTextFn((e) => {
                        l.forEach((t, i) => {
                            const n = 0 === i ? parseInt(o.fontSize || 0) : s;
                            t.forEach((t, i) => {
                                const r = Je(t.style),
                                    o = e.tspan('‎' + t.content).attr(r);
                                (o.style({ 'white-space': 'pre' }),
                                    0 === i && o.dy(n).x(0));
                            });
                        });
                    }),
                    (function (e, t) {
                        const i = Je(t);
                        e.attr(i);
                        const { textAlign: n } = t;
                        n && e.attr({ 'text-anchor': Ze[n] });
                    })(i, o));
                const d = l.length * s,
                    f = l.reduce((e, t) => {
                        const { width: i } = Object(c.getNodesSize)(t);
                        return Math.max(e, i);
                    }, 0);
                t.setSize(
                    i.prefSize
                        ? Object.assign(i.prefSize, { height: d })
                        : { width: f, height: d }
                );
            },
        };
        var qe = i(15),
            et = {
                work(e) {
                    const t = e,
                        i = t.figure,
                        { end1View: n, end2View: o } = t;
                    if (!(n && o && o.figure.isVisible && n.figure.isVisible))
                        return;
                    const a = (function (e) {
                        const t = e.model,
                            { end1View: i, end2View: n } = e,
                            o = i.getRealPosition(),
                            a = n.getRealPosition(),
                            s = t.get('controlPoints') || {};
                        let l,
                            c,
                            d = s[0] || {},
                            f = s[1] || {};
                        const h = t.get('lineEndPoints') || {};
                        let p = h[0],
                            u = h[1];
                        p && (p = qe.b(o, p));
                        u && (u = qe.b(a, u));
                        e.figure.lineStyle !== r.RELATIONSHIPSHAPE.CURVED &&
                            ((d = { x: d.x, y: d.y }),
                            (f = { x: f.x, y: f.y }));
                        const g = void 0 !== d.amount && void 0 !== d.angle,
                            Q = void 0 !== d.x && void 0 !== d.y,
                            m = void 0 !== f.amount && void 0 !== f.angle,
                            b = void 0 !== f.x && void 0 !== f.y;
                        let C, L;
                        (g || m) &&
                            ((C = T.a.topicInsectLine(i, a)),
                            (L = T.a.topicInsectLine(n, o)));
                        Q
                            ? (d = { x: o.x + d.x, y: o.y + d.y })
                            : g
                              ? ((l = {
                                    x: (L.x - C.x) * d.amount + C.x,
                                    y: (L.y - C.y) * d.amount + C.y,
                                }),
                                (d = qe.p(l, C, d.angle)))
                              : ((l = {
                                    x: (a.x - o.x) / 3 + o.x,
                                    y: (a.y - o.y) / 3 + o.y,
                                }),
                                (d = qe.p(l, o, 0)));
                        b
                            ? (f = { x: a.x + f.x, y: a.y + f.y })
                            : m
                              ? ((c = {
                                    x: (C.x - L.x) * f.amount + L.x,
                                    y: (C.y - L.y) * f.amount + L.y,
                                }),
                                (f = qe.p(c, L, f.angle)))
                              : ((c = {
                                    x: ((a.x - o.x) / 3) * 2 + o.x,
                                    y: ((a.y - o.y) / 3) * 2 + o.y,
                                }),
                                (f = qe.p(c, a, 0)));
                        Object(xe.m)(d, f) &&
                            !p &&
                            !u &&
                            Object(xe.m)(o, a) &&
                            (d = { x: d.x - 10, y: d.y - 10 });
                        e.figure.lineStyle === r.RELATIONSHIPSHAPE.STRAIGHT &&
                            p &&
                            u &&
                            ((d = Object.assign({}, u)),
                            (f = Object.assign({}, p)));
                        const y = e.intersectPointWithTopic('start', p || d, d),
                            M = e.intersectPointWithTopic('end', u || f, f);
                        p || (p = { x: y.x, y: y.y });
                        u || (u = { x: M.x, y: M.y });
                        return {
                            insectPoint1: y,
                            insectPoint2: M,
                            controlPoint1: d,
                            controlPoint2: f,
                            lineEndPoint1: p,
                            lineEndPoint2: u,
                        };
                    })(t);
                    (i.setPosInfo(a),
                        (t.posInfo = a),
                        (t.relativeDistance1 = {
                            x: a.controlPoint1.x - a.insectPoint1.x,
                            y: a.controlPoint1.y - a.insectPoint1.y,
                        }),
                        (t.relativeDistance2 = {
                            x: a.controlPoint2.x - a.insectPoint2.x,
                            y: a.controlPoint2.y - a.insectPoint2.y,
                        }),
                        (function (
                            e,
                            {
                                insectPoint1: t,
                                insectPoint2: i,
                                controlPoint1: n,
                                controlPoint2: r,
                            }
                        ) {
                            const o = e.figure.lineStyle,
                                a = Object(c.inflateBounds)(
                                    Object(M.a)(o).calcBoundingBox(t, i, n, r),
                                    parseInt(e.figure.lineWidth || 0)
                                );
                            Object(c.equalsBounds)(a, e.bounds) ||
                                ((e.bounds = a),
                                e.trigger('change:bounds', e.bounds, e));
                        })(t, a));
                    const {
                        insectPoint1: s,
                        insectPoint2: l,
                        controlPoint1: d,
                        controlPoint2: f,
                    } = a;
                    t.renderTitleText(a);
                    const h = Object(M.a)(i.lineStyle).calcPathD(s, l, d, f),
                        p = Object(c.getPointAtLength)(
                            h,
                            Object(c.getTotalLength)(h) / 2
                        ),
                        u = {
                            x: p.x - t.titleView.bounds.width / 2,
                            y: p.y - t.titleView.bounds.height / 2,
                        },
                        g = (e) =>
                            `M ${e.x} ${e.y}\n        L${e.x + e.width} ${e.y}\n        L${e.x + e.width} ${e.y + e.height}\n        L${e.x} ${e.y + e.height}`,
                        Q = t.bounds,
                        m = {
                            width: Q.width + 400,
                            height: Q.height + 400,
                            x: Q.x - 200,
                            y: Q.y - 200,
                        },
                        b = Object.assign({}, t.titleView.bounds, u),
                        C = g(m),
                        L = g(b);
                    return (
                        i.setRelationshipMaskD(`${C} ${L}`),
                        (function (e, t) {
                            const i = Object(c.mergeBounds)(e.bounds, t);
                            Object(c.equalsBounds)(i, e.bounds) ||
                                ((e.bounds = i),
                                e.trigger('change:bounds', e.bounds, e));
                        })(t, b),
                        t.bounds
                    );
                },
            };
        const { BOUNDARYGAP: tt, BOUNDARYGAP_IN_TREETABLE: it } = _.a;
        var nt = {
            work(e) {
                const t = e;
                let i;
                i =
                    'master' === t.model.get('range')
                        ? this._calcMasterBoundaryShapeSize(t)
                        : this._calcNormalBoundaryShapeSize(t);
                const n = parseInt(t.figure.borderWidth),
                    r = t.shouldPreventTitle()
                        ? { x: 0, y: 0 }
                        : {
                              x:
                                  _.a.BOUNDARY_TITLE
                                      .TO_BOUNDARY_BORDER_DISTANCE +
                                  n / 2,
                              y: -t.titleView.figure.size.height + n / 2,
                          };
                t.titleView.setPosition(r);
                const o = {
                    width: i.width,
                    height: i.height + t.titleView.figure.size.height,
                };
                (t.setSize(o),
                    t.updateRealPosition(),
                    K(t.figure.shapeClass)(t, t.figure.boundaryShapeSize));
            },
            _getBoundaryGap(e) {
                const t = e.parent();
                return Object(c.isTreeTableCell)(t) &&
                    Object(c.isTreeTableStructure)(t)
                    ? it
                    : tt;
            },
            _getBoundsForBoundaryLayout(e) {
                const t = Object.assign({}, e.bounds || e.topicView.bounds);
                if (Object(c.isTreeTableCell)(e)) {
                    const i = e.getLayoutInfo(
                            Object(c.getTreeTableHeadBranchView)(
                                e
                            ).getStructureClass()
                        ),
                        n = Object.assign(
                            {},
                            null == i ? void 0 : i.externalInfo
                        );
                    return (null == i ? void 0 : i.stopFlag)
                        ? {
                              x: n.cellX,
                              y: n.cellY,
                              width: n.cellWidth,
                              height: n.cellHeight,
                          }
                        : t;
                }
                return t;
            },
            _getBranchIndexToBoundaries(e) {
                const t = e.parent(),
                    i = t
                        .getChildrenBranchesByType(r.TOPIC_TYPE.ATTACHED)
                        .filter((e) => !e.isPlaceHolderView),
                    n = [];
                for (let e = 0; e < i.length; e++) {
                    const r = i[e];
                    ((r.insection = {
                        left: 0,
                        right: 0,
                        up: 0,
                        down: 0,
                    }),
                        (r.boundsForBoundaryLayout =
                            this._getBoundsForBoundaryLayout(r)));
                    const o = [];
                    (t.boundaries.forEach((t) => {
                        const { rangeStart: i, rangeEnd: n } = t.model;
                        i <= e && e <= n && o.push(t);
                    }),
                        n.push(o));
                }
                return n;
            },
            _calcMasterBoundaryShapeSize(e) {
                const t = e.parent();
                ((t.insection = {
                    left: tt,
                    right: tt,
                    up: tt,
                    down: tt,
                }),
                    (t.boundsForBoundaryLayout = Object.assign(
                        {},
                        t.bounds || t.topicView.bounds
                    )));
                const i = 0,
                    n = 0;
                ((t.boundsForBoundaryLayout.y -= t.insection.up),
                    (t.boundsForBoundaryLayout.height +=
                        t.insection.up + t.insection.down),
                    (t.boundsForBoundaryLayout.x -= t.insection.left),
                    (t.boundsForBoundaryLayout.width +=
                        t.insection.right + t.insection.left));
                const r = t.boundsForBoundaryLayout.x + i,
                    o = t.boundsForBoundaryLayout.y + n,
                    a =
                        t.boundsForBoundaryLayout.x +
                        t.boundsForBoundaryLayout.width +
                        i,
                    s =
                        t.boundsForBoundaryLayout.y +
                        t.boundsForBoundaryLayout.height +
                        n;
                e.setPosition({ x: r, y: o });
                const l = { width: a - r, height: s - o };
                return (e.setShapeSize(l), l);
            },
            _calcNormalBoundaryShapeSize(e) {
                const t = e.parent(),
                    { rangeStart: i, rangeEnd: n } = e.model,
                    o = this._getBranchIndexToBoundaries(e),
                    a = t
                        .getChildrenBranchesByType(r.TOPIC_TYPE.ATTACHED)
                        .filter((e) => !e.isPlaceHolderView);
                let s, l, c, d;
                const f = t.getDirection();
                for (let s = i; s <= n; s++) {
                    let l = 0;
                    o[s].some((t) => {
                        if (((l += t.titleView.figure.size.height), t === e))
                            return !0;
                    });
                    const c = (o[s].indexOf(e) + 1) * this._getBoundaryGap(e);
                    (s >= i &&
                        s <= n &&
                        ('UD' === f
                            ? ((a[s].insection.left = c),
                              (a[s].insection.right = c))
                            : ((a[s].insection.up = c + l),
                              (a[s].insection.down = c))),
                        s === i &&
                            ('UD' === f
                                ? t.getRangeGrowthDirection(s) ===
                                  r.DIRECTION.UP
                                    ? (a[s].insection.down = c)
                                    : (a[s].insection.up = c + l)
                                : (a[s].insection.left = c)),
                        s === n &&
                            ('UD' === f
                                ? t.getRangeGrowthDirection(s) ===
                                  r.DIRECTION.DOWN
                                    ? (a[s].insection.down = c)
                                    : (a[s].insection.up = c + l)
                                : (a[s].insection.right = c)),
                        (a[s].boundsForBoundaryLayout.y -= a[s].insection.up),
                        (a[s].boundsForBoundaryLayout.height +=
                            a[s].insection.up + a[s].insection.down),
                        (a[s].boundsForBoundaryLayout.x -= a[s].insection.left),
                        (a[s].boundsForBoundaryLayout.width +=
                            a[s].insection.right + a[s].insection.left));
                }
                if (i === n) {
                    const e = a[i],
                        t = { x: e.position.x, y: e.position.y };
                    ((s = e.boundsForBoundaryLayout.x + t.x),
                        (l = e.boundsForBoundaryLayout.y + t.y),
                        (c =
                            e.boundsForBoundaryLayout.x +
                            t.x +
                            e.boundsForBoundaryLayout.width +
                            e.topicView.figure.borderWidth / 2),
                        (d =
                            e.boundsForBoundaryLayout.y +
                            t.y +
                            e.boundsForBoundaryLayout.height +
                            e.topicView.figure.borderWidth / 2));
                } else if (i < n)
                    for (let e = i; e <= n; e++) {
                        const t = a[e],
                            i = {
                                x: t.position.x,
                                y: t.position.y,
                            };
                        (s || (s = t.boundsForBoundaryLayout.x + i.x),
                            l || (l = t.boundsForBoundaryLayout.y + i.y),
                            c ||
                                (c =
                                    t.boundsForBoundaryLayout.x +
                                    i.x +
                                    t.boundsForBoundaryLayout.width),
                            d ||
                                (d =
                                    t.boundsForBoundaryLayout.y +
                                    i.y +
                                    t.boundsForBoundaryLayout.height),
                            (s = Math.min(
                                s,
                                t.boundsForBoundaryLayout.x + i.x
                            )),
                            (l = Math.min(
                                l,
                                t.boundsForBoundaryLayout.y + i.y
                            )),
                            (c = Math.max(
                                c,
                                t.boundsForBoundaryLayout.x +
                                    i.x +
                                    t.boundsForBoundaryLayout.width
                            )),
                            (d = Math.max(
                                d,
                                t.boundsForBoundaryLayout.y +
                                    i.y +
                                    t.boundsForBoundaryLayout.height
                            )));
                    }
                else t.model.removeBoundary(e.model);
                const h = e.titleView.figure.size.height,
                    p = { x: s, y: l + h };
                e.setPosition(p);
                const T = { width: c - s, height: d - l - h };
                return (e.setShapeSize(T), T);
            },
        };
        const rt = { x: -30, y: -12, width: 60, height: 24 };
        var ot = {
                work(e) {
                    const t = e;
                    if (!t.getContext()) return;
                    const i = t.figure;
                    return (
                        (t.contentBounds = rt),
                        (t.shapeBounds = rt),
                        (t.bounds = rt),
                        t.figure.setSize(Object.assign({}, rt)),
                        (i.shapeClassDirty || i.sizeDirty) &&
                            Object(De.a)(i.shapeClass).render(i.viewController),
                        t.bounds
                    );
                },
            },
            at = { work() {} },
            st = {
                work(e) {
                    Xe.work(e);
                    const t = Object.assign({}, e.bounds),
                        {
                            marginLeft: i,
                            marginRight: n,
                            marginTop: r,
                            marginBottom: o,
                        } = e.marginInfo;
                    e.bounds = {
                        x: t.x - i,
                        y: t.y - r,
                        width: i + t.width + n,
                        height: r + t.height + o,
                    };
                },
            },
            lt = i(3);
        var ct = new (class {
                work(e) {
                    const t = e.figure;
                    if (t.textDirty) {
                        const i = e.parent().parent(),
                            n = e.getContext().config(r.CONFIG.LANGUAGE);
                        let o = c.mathJaxExporterUtil.export(t.text, {
                                lang: n,
                                fontFamily: lt.a.getStyleValue(
                                    i,
                                    r.STYLE_KEYS.FONT_FAMILY
                                ),
                            }),
                            a = o.result,
                            s = e
                                .getContext()
                                .callService(
                                    r.SERVICE_NAME.GET_SVG_DOM_SIZE,
                                    a
                                );
                        ((0 !== s.width && 0 !== s.height) ||
                            ((o = {
                                result: c.mathJaxExporterUtil.generateErrorMessageSVG(
                                    {
                                        lang: n,
                                        fontFamily: lt.a.getStyleValue(
                                            i,
                                            r.STYLE_KEYS.FONT_FAMILY
                                        ),
                                    }
                                ),
                                errorCode: 1,
                                errorMessage:
                                    'mathjax export result empty error',
                            }),
                            (a = o.result),
                            (s = e
                                .getContext()
                                .callService(
                                    r.SERVICE_NAME.GET_SVG_DOM_SIZE,
                                    a
                                ))),
                            t.setErrorCode(o.errorCode),
                            t.setErrorMessage(o.errorMessage),
                            t.setSVGOutput(a),
                            t.setOriginalSize({
                                width:
                                    s.width *
                                    _.a.MATH_JAX_INIT_SIZE_PLUS_MULTIPLE,
                                height:
                                    s.height *
                                    _.a.MATH_JAX_INIT_SIZE_PLUS_MULTIPLE,
                            }));
                    }
                    (t.setSize({
                        width: t.finalWidth,
                        height:
                            (t.originalSize.height * t.finalWidth) /
                            t.originalSize.width,
                    }),
                        e.getContext().isInitRenderingCompleted() &&
                            this.generateFallbackImageData(e),
                        e.resizeBox &&
                            e.resizeBox.size(t.size.width, t.size.height));
                }
                async generateFallbackImageData(e, t = {}) {
                    const i = e.figure,
                        n = e.parent().model,
                        o = n.getImageData() || {
                            src: '',
                            width: 0,
                            height: 0,
                            isMathJaxImage: !1,
                        };
                    let a = !1;
                    const s = {
                        width: i.size.width + 2 * _.a.MATH_JAX_IMAGE_PADDING,
                        height: i.size.height + 2 * _.a.MATH_JAX_IMAGE_PADDING,
                    };
                    if (
                        (i.sizeDirty &&
                            (o.width !== s.width &&
                                o.height !== s.height &&
                                (a = !0),
                            Object.assign(o, s)),
                        !o.isMathJaxImage || t.forceRefresh || a)
                    ) {
                        const i = e.createStandColorSVG(t.isInheritColor),
                            a = await e.getContext().exportImage(
                                Object.assign(
                                    {
                                        targetSVG: i.node,
                                        skipFont: !0,
                                        hidpi: 192,
                                    },
                                    s
                                )
                            );
                        if (!e.parent()) return;
                        ((o.src = a.data), (o.isMathJaxImage = !0));
                        e.getContext()
                            .config(r.CONFIG.XAP_GENERATOR)({
                                xapType: r.XAP_TYPE.IMAGE,
                                mimeType: 'image/png',
                                extType: 'png',
                                data: o.src,
                                isBase64: !0,
                            })
                            .then((t) => {
                                e.parent() &&
                                    ((o.src = t),
                                    n.updateImageInfoWithoutSideEffect(o));
                            });
                    } else n.updateImageInfoWithoutSideEffect(o);
                }
            })(),
            dt = {
                work(e) {
                    const t = e.parent();
                    if (!(t instanceof f.a) || Object(c.isSummaryBranch)(t))
                        return;
                    const i = t.parent();
                    i instanceof f.a &&
                        Object(F.a)(i.getStructureClass()).drawConnectLine(
                            i,
                            t
                        );
                },
            },
            ft = {
                createLayoutWorker(e) {
                    switch (e) {
                        case r.FIGURE_TYPE.BRANCH:
                            return Se;
                        case r.FIGURE_TYPE.TOPIC:
                            return ke;
                        case r.FIGURE_TYPE.MARKERS:
                            return ze;
                        case r.FIGURE_TYPE.TOPIC_TITLE:
                        case r.FIGURE_TYPE.RELATIONSHIP_TITLE:
                        case r.FIGURE_TYPE.NUMBERING:
                        case r.FIGURE_TYPE.BOUNDARY_TITLE:
                            return Xe;
                        case r.FIGURE_TYPE.RELATIONSHIP:
                            return et;
                        case r.FIGURE_TYPE.BOUNDARY:
                            return nt;
                        case r.FIGURE_TYPE.PLACE_HOLDER_TOPIC:
                            return ot;
                        case r.FIGURE_TYPE.MATRIX:
                            return at;
                        case r.FIGURE_TYPE.MATRIX_LABEL:
                            return st;
                        case r.FIGURE_TYPE.MATH_JAX:
                            return ct;
                        case r.FIGURE_TYPE.CONNECTION:
                            return dt;
                        default:
                            return {
                                work(e) {
                                    return {
                                        width: -1,
                                        height: -1,
                                    };
                                },
                            };
                    }
                },
            };
        class ht {
            execute() {}
            canExecute() {
                return !0;
            }
            isDisposed() {
                return !1;
            }
        }
        class pt extends ht {
            constructor(e) {
                (super(),
                    (this._isDisposed = !1),
                    (this.positionDirty = !1),
                    (this.forbidInvalidateLayout = !1),
                    (this.forbidInvalidateLayoutParent = !1),
                    (this.forbidInvalidatePaint = !1),
                    (this.isVisible = !0),
                    (this._inReprieve = !1),
                    (this.opacity = 1),
                    (this.opacityDirty = !1),
                    (this.type = e.figureType || e.type),
                    (this.viewController = e),
                    (this.layoutWorker = ft.createLayoutWorker(this.type)),
                    (this.renderWorker = _e.createRenderWorker(
                        this.type,
                        this
                    )),
                    this.setSize({ width: -1, height: -1 }),
                    this.setPosition({ x: 0, y: 0 }));
            }
            validatePaint() {
                this.dirtyPaint &&
                    (this.renderWorker.work(), (this.dirtyPaint = !1));
            }
            invalidatePaint() {
                this.forbidInvalidatePaint ||
                    ((this.dirtyPaint = !0),
                    n.a.work(n.b.PRIORITY.RENDER, this));
            }
            validateLayout() {
                this.dirtyLayout &&
                    ((this.forbidInvalidateLayout = !0),
                    this.layoutWorker.work(this.viewController),
                    (this.forbidInvalidateLayout = !1),
                    (this.dirtyLayout = !1));
            }
            invalidateLayout() {
                if (this.forbidInvalidateLayout) return;
                if (
                    ((this.dirtyLayout = !0),
                    n.a.work(n.b.PRIORITY.LAYOUT, this),
                    this.invalidatePaint(),
                    this.forbidInvalidateLayoutParent)
                )
                    return;
                const e = this.getParent();
                e && e.invalidateLayout();
            }
            manuallyLayout(e) {
                ((this.forbidInvalidateLayout = !0),
                    this.layoutWorker.work(this.viewController, e),
                    (this.forbidInvalidateLayout = !1));
            }
            manuallyPaint() {
                this.renderWorker.work();
            }
            setPaintable(e) {
                (e || (this.dirtyPaint = !1),
                    (this.forbidInvalidatePaint = !e),
                    this.invalidatePaint());
            }
            setLayoutable(e, t, i) {
                (e || (this.dirtyLayout = !1),
                    (this.forbidInvalidateLayout = !e),
                    (this.forbidInvalidateLayoutParent = !t),
                    i || this.invalidateLayout());
            }
            setVisible(e, t) {
                this.isVisible !== e &&
                    ((this.isVisible = e),
                    (this.isVisibleDirty = !0),
                    t ? this.invalidatePaint() : this.invalidateLayout());
            }
            setSize(e, t) {
                const i = !this.size || !Object(xe.o)(this.size, e);
                (t || i) &&
                    ((this.sizeDirty = !0),
                    (this.size = Object.assign({}, e)),
                    this.invalidateLayout(),
                    this.invalidatePaint());
            }
            setPosition(e) {
                const t =
                    !this.position ||
                    !(this.position.x === e.x && this.position.y === e.y);
                (t && (this.positionDirty = t),
                    (this.position = Object.assign({}, e)),
                    this.positionDirty && this.invalidatePaint());
            }
            setOpacity(e) {
                this.opacity !== e &&
                    ((this.opacity = e),
                    (this.opacityDirty = !0),
                    this.invalidatePaint());
            }
            getContent() {
                return this.renderWorker.getContent();
            }
            layout() {
                this.layoutWorker.work(this.viewController);
            }
            dispose() {
                (this._inReprieve || this.renderWorker.dispose(),
                    (this._isDisposed = !0));
            }
            reprieve(e) {
                ((this._inReprieve = e),
                    this._inReprieve
                        ? this.renderWorker.getContent().hide()
                        : this.renderWorker.dispose());
            }
            getSize() {
                return this.prefSize ? this.prefSize : this.size;
            }
            getPreferedSize(e) {
                e = Object.assign({}, { refreshCache: !1, forceLayout: !1 }, e);
                let t = {
                    width: this.size.width,
                    height: this.size.height,
                };
                return (
                    e.forceLayout &&
                        (t = this.layoutWorker.work(this.viewController)),
                    e.refreshCache && (this.prefSize = t),
                    this.prefSize ? this.prefSize : t
                );
            }
            setPreferredSize(e) {
                (this.prefSize && e && Object(xe.o)(this.prefSize, e)) ||
                    (this.prefSize = e);
            }
            getParent() {
                const e = this.viewController.parent();
                return e && e.figure;
            }
            getCentralFigure() {
                if (this.viewController.isCentralBranch())
                    return this.viewController.figure;
                {
                    const e = this.getParent();
                    return e && e.getCentralFigure();
                }
            }
            canExecute() {
                const e = this.viewController.getContext();
                return (
                    (!e ||
                        void 0 === e.isHibernating() ||
                        !1 === e.isHibernating()) &&
                    !this.isDisposed()
                );
            }
            isDisposed() {
                return this._isDisposed;
            }
        }
    },
];
