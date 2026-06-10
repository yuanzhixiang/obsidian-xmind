export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return c;
        });
        var n = i(0),
            r = i(18),
            o = i(21),
            a = i(3),
            s = i(30),
            l = i(1);
        class c extends o.a {
            constructor(e) {
                (super(),
                    (this.isVisible = !0),
                    this.parent(e),
                    (this.figure = r.a.createFigure(this)),
                    this.setVisible(!e.shouldHide()),
                    (this.arrowSelector = new l.ArrowSelector(
                        this.figure.viewController,
                        this.figure.renderWorker.s$fishBoneMarkerLine
                    )),
                    this._initEventListener());
            }
            get type() {
                return n.VIEW_TYPE.FISH_BONE_MAIN_LINE;
            }
            get figureType() {
                return n.FIGURE_TYPE.FISH_BONE_MAIN_LINE;
            }
            parent(e) {
                return void 0 === e ? super.parent() : super.parent(e);
            }
            setVisible(e) {
                ((this.isVisible = e),
                    this.figure.setVisible(e && !this.isForcedInvisible));
            }
            _setLinePosition() {
                if (!this.figure.isVisible) return;
                const e = this.parent(),
                    t = e.parent(),
                    i = null == t ? void 0 : t.getLayoutInfo();
                if (!i) return;
                const r = e.getStructureClass(),
                    o =
                        Object(s.a)(r).getRangeGrowthDirection() ===
                        n.DIRECTION.DOWN
                            ? 1
                            : -1,
                    a = Object(s.a)(r).direction === n.DIRECTION.RIGHT ? 1 : -1,
                    c = e.getRealPosition(),
                    d = e.topicView.bounds.height,
                    f = Object(l.getLineEndSpacingPatchGap)(t),
                    h = {
                        x:
                            c.x -
                            (f /
                                l.layoutConstant.FISH_BONE
                                    .BONE_CONNECTION_TAN) *
                                a,
                        y: (d / 2 + f) * o + c.y,
                    },
                    p = Object.assign({}, e.position),
                    T =
                        Math.abs(p.y - i.externalInfo.startAnchorPositionY) -
                        d / 2,
                    u = {
                        x:
                            -(
                                T /
                                l.layoutConstant.FISH_BONE.BONE_CONNECTION_TAN
                            ) *
                                a +
                            c.x,
                        y: (T + d / 2) * o + c.y,
                    };
                (this.figure.setEndPosition(u),
                    this.figure.setStartPosition(h));
            }
            refreshLineTapered() {
                if (
                    a.a.getClassName(this.parent()) === n.CLASS_TYPE.MAIN_TOPIC
                ) {
                    const e =
                        this.getContext().getSheetView().figure.lineTapered;
                    this.figure.setLineTapered(e === n.LINETAPERED.TAPERED);
                } else this.figure.setLineTapered(!1);
            }
            _initEventListener() {
                const e = this.parent(),
                    t = e.figure;
                (this.listenTo(e, 'afterRealPosChange', () => {
                    this._setLinePosition();
                }),
                    this.listenTo(e, 'refreshView', () => {
                        this.setVisible(!e.shouldHide());
                    }));
                const i = e.parent().figure;
                (this.addAutoRun(() => {
                    (this.figure.setStyleWidth(i.lineWidth),
                        this.figure.setLineColor(t.lineColor),
                        this.figure.setEndArrowClass(i.endArrowClass),
                        this.figure.setLinePattern(
                            Object(l.getUnDashableLinePattern)(t.linePattern)
                        ));
                }),
                    this.addAutoRun(() => {
                        this.refreshLineTapered();
                    }));
            }
            remove() {
                return (
                    this.figure.dispose(),
                    this.stopListening(),
                    this.arrowSelector.dispose(),
                    this.clearReactions(),
                    this.parent(null),
                    this
                );
            }
        }
    },
];
