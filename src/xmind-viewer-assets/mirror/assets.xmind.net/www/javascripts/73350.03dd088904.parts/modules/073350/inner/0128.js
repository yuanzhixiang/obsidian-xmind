export default [
    function (e, t, i) {
        'use strict';
        var n = i(12),
            r = i.n(n),
            o = i(0);
        t.a = (e) => ({
            [o.SERVICE_NAME.GET_SVG_DOM_SIZE]: (() => {
                let t;
                return (i) => {
                    t ||
                        ((t = r()(
                            '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">'
                        )),
                        t.css('visibility', 'hidden'),
                        e.getAppToolsContainer().append(t));
                    const n = e.parent().getCurrentSheetEditor();
                    if (n !== e)
                        return n.callService(
                            o.SERVICE_NAME.GET_SVG_DOM_SIZE,
                            i
                        );
                    ((t[0].innerHTML = i.innerHTML),
                        t.attr({
                            width: i.getAttribute('width'),
                            height: i.getAttribute('height'),
                            viewBox: i.getAttribute('viewBox'),
                        }));
                    const a = t[0].getBoundingClientRect();
                    return (
                        (t[0].innerHTML = ''),
                        { width: a.width, height: a.height }
                    );
                };
            })(),
            [o.SERVICE_NAME.GET_MINIMUM_FONT_SIZE]: (() => {
                const t = r()('<span>').css({
                    display: 'none',
                    fontSize: '1px',
                });
                e.getAppToolsContainer().append(t);
                const i = Number.parseInt(t.css('fontSize'));
                return (t.remove(), () => i);
            })(),
            [o.SERVICE_NAME.GET_VIEW_PORT_COVER]: (() => {
                let t;
                return () => (
                    t ||
                        ((t = r()('<div>')
                            .attr('name', 'viewport-cover')
                            .css({ display: 'none' })),
                        t.on('contextmenu', (e) => e.preventDefault()),
                        e.getAppToolsContainer().append(t),
                        t.on('touchmove', (e) => {
                            (e.stopPropagation(), e.preventDefault());
                        }),
                        t.on('dragover', (e) => {
                            (e.preventDefault(),
                                (e.originalEvent.dataTransfer.dropEffect =
                                    'none'));
                        }),
                        t.on('dragleave', () => t.hide()),
                        t.on('drop', () => !1)),
                    t
                );
            })(),
            [o.SERVICE_NAME.COPY_TO_CLIPBOARD]: (() => {
                let t;
                function i(t) {
                    (e.el.removeEventListener('blur', i),
                        setTimeout(() => {
                            t.target.focus();
                        }, 0));
                }
                return (n) => {
                    let r;
                    (t ||
                        (t = (function () {
                            const t = document.createElement('textarea');
                            return (
                                e.getAppToolsContainer()[0].appendChild(t),
                                (t.style.position = 'fixed'),
                                (t.style.top = '-9999px'),
                                t.setAttribute('readonly', 'true'),
                                t
                            );
                        })()),
                        t.setAttribute(
                            'style',
                            e
                                .getModule(o.MODULE_NAME.EDIT_RECEIVER)
                                .getInputDOM()
                                .getAttribute('style')
                        ),
                        (t.style.display = 'none'),
                        e.el.addEventListener('blur', i),
                        (t.value = n),
                        t.focus(),
                        t.select());
                    try {
                        r = document.execCommand('copy');
                    } catch (e) {
                        r = !1;
                    }
                    return r;
                };
            })(),
        });
    },
];
