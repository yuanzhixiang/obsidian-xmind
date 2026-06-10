export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return h;
        });
        var n = i(0),
            r = i(1),
            o = i(98),
            a = i.n(o);
        function s(e, t = {}) {
            const i = a()({
                targets: [e],
                duration: 400,
                easing: 'easeOutQuad',
                strokeWidth: t.toStrokeWidth || 3,
                stroke: '#ef3420',
            });
            return (
                i.finished.then(() => {
                    (i.reverse(), i.play());
                }),
                {
                    reverse: () => {},
                    kill: () => {
                        (i.seek(0), i.remove(e));
                    },
                }
            );
        }
        var l = {
                [n.ANIMATION_FLAGS.BRANCH_ZOOM_IN]({ target: e }) {
                    const t = Object(r.animationStandin)(e),
                        i = a.a.timeline({
                            easing: 'easeInQuad',
                            duration: 200,
                        }),
                        n =
                            e.topicView.topicShapeSelectBox.figure.renderWorker
                                .svg.node;
                    i.add({ targets: [n], opacity: 0 });
                    const o =
                        t.topicView.figure.renderWorker.topicShapeGroup.node;
                    return (
                        i.add(
                            {
                                targets: [o],
                                transformOrigin: 'center',
                                scale: 1.05,
                            },
                            '+=200'
                        ),
                        {
                            reverse: () => {
                                (i.reverse(),
                                    i.play(),
                                    i.finished.then(() => {
                                        t.remove();
                                    }));
                            },
                            kill: () => {
                                t.remove();
                            },
                        }
                    );
                },
                [n.ANIMATION_FLAGS.BRANCH_SHOW_HIGH_LIGHT_SELECT_BOX]({
                    target: e,
                }) {
                    const t = s(
                        e.topicView.topicShapeSelectBox.figure.renderWorker.tsb
                            .node
                    );
                    let i;
                    if (Object(r.isSummaryBranch)(e)) {
                        const t =
                            e.selectBox.figure.renderWorker.selectBox.node;
                        i = s(t);
                    }
                    return {
                        reverse: () => {},
                        kill: () => {
                            (t.kill(), null == i || i.kill());
                        },
                    };
                },
            },
            c = {
                [n.ANIMATION_FLAGS.BOUNDARY_SHOW_HIGH_LIGHT_SELECT_BOX]({
                    target: e,
                }) {
                    return s(e.selectBox.figure.renderWorker.selectBox.node);
                },
            },
            d = {
                [n.ANIMATION_FLAGS.RELATIONSHIP_SHOW_HIGH_LIGHT_SELECT_BOX]({
                    target: e,
                }) {
                    return s(e.figure.renderWorker.actionPath.node, {
                        toStrokeWidth: 9,
                    });
                },
            };
        const f = Object.assign(Object.assign(Object.assign({}, l), c), d);
        class h {
            constructor() {
                this.currentAnimationMap = {};
            }
            pushAnimationHook(e, t) {
                (this.currentAnimationMap[e] ||
                    (this.currentAnimationMap[e] = []),
                    this.currentAnimationMap[e].push(t));
            }
            startAnimation(e, t) {
                const i = f[e](t);
                return (this.pushAnimationHook(e, i), i);
            }
            killAnimationByFlag(e) {
                const t = this.currentAnimationMap[e];
                t &&
                    (t.forEach((e) => {
                        e.kill();
                    }),
                    (this.currentAnimationMap[e] = []));
            }
            reverseAnimationByFlag(e) {
                const t = this.currentAnimationMap[e];
                t &&
                    (t.forEach((e) => {
                        e.reverse();
                    }),
                    (this.currentAnimationMap[e] = []));
            }
        }
        h.identifier = n.MODULE_NAME.ANIMATION;
    },
];
