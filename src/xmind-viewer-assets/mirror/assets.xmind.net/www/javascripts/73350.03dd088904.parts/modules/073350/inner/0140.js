export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return c;
        });
        var n = i(4),
            r = i(0),
            o = i(26),
            a = i.n(o),
            s = i(12),
            l = i.n(s);
        class c {
            constructor() {
                ((this.status = { movingMouse: !1 }),
                    (this.fakeFloatingTopicView = null),
                    (this.context = null),
                    (this.ownerSvgNode = null));
            }
            startProcess(e, t) {
                (e
                    .getModule(r.MODULE_NAME.SEMAPHORE)
                    .increase(r.UI_STATUS.ADD_FLOATINGTOPIC),
                    (this.context = e),
                    (this.fakeFloatingTopicView = new d(e, t)),
                    (this.ownerSvgNode =
                        e.getSheetView().svg.node.ownerSVGElement),
                    (this.onMouseMove = (e) =>
                        this.fakeFloatingTopicView.onMouseMove(e)),
                    (this.onESCPress = (e) => 27 === e.keyCode && this.reset()),
                    (this.onMouseDown = (e) => this.finish(e)),
                    this.initEventsListener(),
                    (this.status.movingMouse = !0));
            }
            initEventsListener() {
                const e = l()(this.ownerSvgNode);
                (e.on('mousemove', this.onMouseMove),
                    e.on('mousedown', this.onMouseDown),
                    l()('body').on('keydown', this.onESCPress));
            }
            finish(e) {
                const t = this.context.getSheetModel().rootTopic(),
                    i = t.createEmptyTopic({
                        title: this.context.getTranslatedText(
                            'DEFAULT_FLOATING_TOPIC_TITLE'
                        ),
                        titleUnedited: !0,
                    }),
                    n = this.context
                        .getSVGView()
                        .getCoordinateTransfer()
                        .viewportToMindMap({
                            x: e.clientX,
                            y: e.clientY,
                        });
                (i.set('position', n),
                    t.addChildTopic(i, { type: 'detached' }),
                    this.reset());
            }
            reset() {
                ((this.status.movingMouse = !1),
                    this.fakeFloatingTopicView.removeSelf(),
                    (this.fakeFloatingTopicView = null));
                const e = l()(this.ownerSvgNode);
                (e.off('mousemove', this.onMouseMove),
                    e.off('mousedown', this.onMouseDown),
                    l()('body').off('keydown', this.onESCPress),
                    this.context
                        .getModule(r.MODULE_NAME.SEMAPHORE)
                        .decrease(r.UI_STATUS.ADD_FLOATINGTOPIC));
            }
        }
        c.identifier = r.MODULE_NAME.PRE_ADD_FLOATING_TOPIC;
        const d = a.a.View.extend({
            initialize(e, t) {
                ((this.context = e),
                    (this.sheetContainer = e.getSheetView().svg),
                    this.initSVGStructure(t));
            },
            initSVGStructure(e = {}) {
                ((this.container = new n.a.G()),
                    this.container.attr({ cursor: 'pointer' }));
                const t = new n.a.Rect().width(104).height(36).radius(5);
                t.attr({
                    fill: '#cacaca',
                    stroke: 'none',
                    transform: 'translate(-52 -18)',
                });
                const i = new n.a.Text()
                    .text(
                        this.context.getTranslatedText(
                            'DEFAULT_FLOATING_TOPIC_TITLE'
                        )
                    )
                    .y(-16);
                (i.attr({
                    stroke: '#fff',
                    fill: '#fff',
                    'text-anchor': 'middle',
                }),
                    this.container.add(t),
                    this.container.add(i),
                    this.setPosition(e.position),
                    this.sheetContainer.add(this.container));
            },
            setPosition(e = { x: 0, y: 0 }) {
                this.container.attr('transform', `translate(${e.x} ${e.y})`);
            },
            onMouseMove(e) {
                const t = this.context
                    .getSVGView()
                    .getCoordinateTransfer()
                    .viewportToMindMap({
                        x: e.clientX,
                        y: e.clientY,
                    });
                this.setPosition(t);
            },
            removeSelf() {
                this.container.remove();
            },
        });
    },
];
