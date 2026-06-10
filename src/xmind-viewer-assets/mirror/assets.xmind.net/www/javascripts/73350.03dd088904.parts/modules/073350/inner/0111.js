export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return l;
        });
        var n = i(0),
            r = i(18),
            o = i(21),
            a = i(1);
        function s(e) {
            return e.getStructureClass() === n.STRUCTURECLASS.FISHBONELEFTHEADED
                ? n.DIRECTION.RIGHT
                : n.DIRECTION.LEFT;
        }
        class l extends o.a {
            constructor(e) {
                (super(),
                    (this.isVisible = !0),
                    this.parent(e),
                    (this.figure = r.a.createFigure(this)),
                    this.refreshLineDirection(),
                    this._initEventListener(),
                    (this.isVisible = !0));
            }
            get type() {
                return n.VIEW_TYPE.FISH_BONE_HEAD_LINE;
            }
            get figureType() {
                return n.FIGURE_TYPE.FISH_BONE_HEAD_LINE;
            }
            parent(e) {
                return void 0 === e ? super.parent() : super.parent(e);
            }
            setVisible(e) {
                ((this.isVisible = e),
                    this.figure.setVisible(e && !this.isForcedInvisible));
            }
            refreshLineStyleWidth() {
                this.figure.setStyleWidth(
                    parseInt(`${this.parent().figure.lineWidth}`)
                );
            }
            refreshLineColor() {
                var e;
                const t = this.parent(),
                    i = this.getContext().getSheetView().figure.multiLineColors;
                if (i && 'none' !== i) {
                    const i = t.getChildrenBranchesByType(
                            n.TOPIC_TYPE.ATTACHED
                        ),
                        r = (
                            null !== (e = i[i.length - 1]) && void 0 !== e
                                ? e
                                : t
                        ).figure.lineColor;
                    this.figure.setLineColor(r);
                } else {
                    const e = t.figure.lineColor;
                    this.figure.setLineColor(e);
                }
            }
            refreshLineTapered() {
                if (Object(a.isCentralBranch)(this.parent())) {
                    const e =
                        this.getContext().getSheetView().figure.lineTapered;
                    this.figure.setLineTapered(e === n.LINETAPERED.TAPERED);
                } else this.figure.setLineTapered(!1);
            }
            refreshLinePattern() {
                const e = this.parent();
                this.figure.setLinePattern(
                    Object(a.getUnDashableLinePattern)(e.figure.linePattern)
                );
            }
            refreshLineBodyWidth() {
                const e = this.parent().getLayoutInfo();
                if (!e) return;
                const t = e.externalInfo.headLineWidth;
                this.figure.setBodyWidth(t);
            }
            refreshLinePosition() {
                const e = this.parent().getLayoutInfo();
                if (!e) return;
                const t = this.parent().topicView.bounds;
                let i = 0;
                i =
                    s(this.parent()) === n.DIRECTION.RIGHT
                        ? t.width + t.x
                        : t.x;
                const r = this.parent().getRealPosition(),
                    o = e.externalInfo.startAnchorPositionY;
                this.figure.setPosition({ x: r.x + i, y: r.y + o });
            }
            refreshLineDirection() {
                this.figure.setDirection(s(this.parent()));
            }
            _initEventListener() {
                const e = this.parent(),
                    t = () => !e.shouldCollapse() && !e.shouldHide(),
                    i = () => {
                        t() &&
                            (this.refreshLineBodyWidth(),
                            this.refreshLinePosition());
                    };
                (this.listenTo(e, 'afterlayoutInfoUpdate', () => {
                    (i(), this.refreshLineColor(), this.refreshLineDirection());
                }),
                    this.listenTo(e, 'afterRealPosChange', i),
                    this.listenTo(e, 'change:bounds', i),
                    this.listenTo(e, 'refreshView', () => {
                        this.setVisible(t());
                    }),
                    this.addAutoRun(() => {
                        (this.refreshLinePattern(),
                            this.refreshLineColor(),
                            this.refreshLineTapered(),
                            this.refreshLineStyleWidth());
                    }));
            }
            remove() {
                return (
                    this.figure.dispose(),
                    this.stopListening(),
                    this.clearReactions(),
                    this.parent(null),
                    this
                );
            }
        }
    },
];
