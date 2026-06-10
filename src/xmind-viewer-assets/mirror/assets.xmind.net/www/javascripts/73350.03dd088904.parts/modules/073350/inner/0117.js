export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return Q;
        });
        var n = i(3),
            r = i(43),
            o = i(0),
            a = i(18);
        const {
                NOTE: s,
                TASK: l,
                COMMENT: c,
                HREF: d,
                ATTACHMENT: f,
                AUDIO: h,
                JUMP: p,
                INFO_MORE: T,
                FILE: u,
            } = o.VIEW_TYPE,
            g = {
                [d]: '',
                [u]: '',
                [p]: '',
                [f]: '',
                [h]: '',
                [c]: '',
                [T]: '',
                [s]: '',
                [l]: '',
            };
        class Q extends r.a {
            constructor(e) {
                (super(),
                    (this._hovering = !1),
                    (this.bounds = {
                        x: 0,
                        y: 0,
                        width: 0,
                        height: 0,
                    }),
                    (this.iconType = ((e) => {
                        const t = Object.keys(e);
                        if (t.length > 1) return T;
                        {
                            const i = t[0],
                                n = (function (e, t) {
                                    const i = {
                                        notesInfo: s,
                                        taskInfo: l,
                                        commentsInfo: c,
                                        audioNotesInfo: h,
                                    };
                                    if ('hrefInfo' === t) {
                                        const t = e.split(':')[0];
                                        return 'file' === t
                                            ? u
                                            : 'xap' === t
                                              ? f
                                              : 'xmind' === t
                                                ? p
                                                : d;
                                    }
                                    return i[t];
                                })(e[i], i);
                            return n;
                        }
                    })(e)),
                    (this.figure = a.a.createFigure(this)),
                    (this.s$Group = this.figure.getContent()),
                    (this.s$Text = this.figure.renderWorker.s$Text),
                    (this.s$Select = this.figure.renderWorker.s$Select),
                    (this._hovering = !1));
            }
            get type() {
                return o.VIEW_TYPE.INFORMATION_ICON;
            }
            get figureType() {
                return o.FIGURE_TYPE.INFORMATION;
            }
            parent(e) {
                return void 0 === e ? super.parent() : super.parent(e);
            }
            afterAncestorChange() {
                if (!this.getContext()) return;
                const { iconType: e } = this;
                (this.figure.setTextContent(g[e]),
                    this.refreshSkeletonStyles(),
                    this.refreshColorStyles(),
                    this.initEventsListener());
            }
            initEventsListener() {
                (super.initEventsListener(),
                    this.addReaction(
                        () => {
                            var e;
                            return null === (e = this.parent()) || void 0 === e
                                ? void 0
                                : e.figure.textColor;
                        },
                        () => this.refreshColor()
                    ));
            }
            refreshColorStyles() {
                this.refreshColor();
            }
            refreshSkeletonStyles() {
                this.refreshSize();
            }
            refreshSize() {
                const e = this.parent();
                if (!e) return;
                const t =
                    ((e) => {
                        const t = e.parent(),
                            i =
                                n.a.getStyleValue(t, o.STYLE_KEYS.FONT_SIZE) ||
                                0;
                        return Number.parseInt(i);
                    })(e) + 2;
                ((this.iconSize = t),
                    this.figure.setSize({ width: t, height: t }),
                    (this.bounds = {
                        x: 0,
                        y: 0,
                        width: t,
                        height: t,
                    }));
            }
            refreshColor() {
                const e = this.parent();
                e &&
                    this.figure.setTextAttr({
                        fill: e.figure.textColor,
                    });
            }
            getSvg() {
                return this.s$Group;
            }
            remove() {
                return (
                    this.stopListening(),
                    this.figure.dispose(),
                    this.parent(null),
                    this.clearReactions(),
                    this
                );
            }
            move(e, t) {
                this.figure.setPosition({ x: e, y: t });
            }
            refreshStyles() {
                (this.refreshColorStyles(), this.refreshSkeletonStyles());
            }
            getBranchView() {
                var e;
                return null === (e = this.parent()) || void 0 === e
                    ? void 0
                    : e.parent();
            }
        }
    },
];
