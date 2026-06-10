export default [
    function (e, t, i) {
        'use strict';
        var n = i(0),
            r = i(6);
        const o = (e, t) => {
            let i, a;
            const s = t.createComponent('topic', e);
            let l;
            (Object(r.each)(e.children || {}, (e, i) => {
                i !== n.TOPIC_TYPE.SUMMARY &&
                    Object(r.each)(e, (e) => {
                        Object(r.isEmpty)(e) ||
                            s.addChildTopic(o(e, t), { type: i }, !0);
                    });
            }),
                Object(r.each)(e.boundaries || {}, (e) => {
                    Object(r.isEmpty)(e) ||
                        ((i = s.addBoundary(e, !0)),
                        i &&
                            e.style &&
                            !Object(r.isEmpty)(e.style) &&
                            i.initStyle(e.style));
                }),
                Object(r.each)(e.summaries || {}, (e) => {
                    Object(r.isEmpty)(e) ||
                        ((a = s.addSummary(e, !0)),
                        a &&
                            e.style &&
                            !Object(r.isEmpty)(e.style) &&
                            a.initStyle(e.style));
                }),
                Object(r.each)(
                    (e.children || {})[n.TOPIC_TYPE.SUMMARY],
                    (e) => {
                        Object(r.isEmpty)(e) ||
                            (s
                                .summaries()
                                .some((t) => t.get('topicId') === e.id) &&
                                s.addChildTopic(
                                    o(e, t),
                                    { type: n.TOPIC_TYPE.SUMMARY },
                                    !0
                                ));
                    }
                ),
                s.initMarkersDataForLegend(),
                e.extensions &&
                    (l = e.extensions.some(
                        (e) => e && e.provider === n.EXTENSION_PROVIDER.MATH_JAX
                    )),
                Object(r.isEmpty)(e.image) ||
                    !e.image.src ||
                    l ||
                    s.addImage(e.image, { isInit: !0 }));
            const c = {
                'org.xmind.ui.taskInfo': s.addTaskInfo,
                'org.xmind.ui.audionotes': s.addAudioNotes,
                'org.xmind.ui.map.unbalanced': s.addMapUnbalanced,
            };
            return (
                Object(r.each)(e.extensions || [], (e) => {
                    !Object(r.isEmpty)(e) &&
                        e.provider &&
                        c[e.provider] &&
                        c[e.provider].bind(s)(e, !0);
                }),
                e.style && !Object(r.isEmpty)(e.style) && s.initStyle(e.style),
                s
            );
        };
        t.a = o;
    },
];
