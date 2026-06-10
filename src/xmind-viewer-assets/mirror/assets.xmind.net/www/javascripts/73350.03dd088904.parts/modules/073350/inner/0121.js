export default [
    function (e, t, i) {
        'use strict';
        var n = i(0);
        t.a = class {
            init(e) {
                const t = e.getModule(n.MODULE_NAME.SVG_DRAGGABLE);
                if (t) {
                    const i = e.s$svg;
                    t.draggable(i)
                        .dragStart(() => {
                            e.style(i, 'legend_dragging');
                        })
                        .dragEnd(() => {
                            (e.style(i, 'legend'),
                                e.model.setLegendPosition({
                                    x: i.x(),
                                    y: i.y(),
                                }));
                        });
                }
            }
        };
    },
];
