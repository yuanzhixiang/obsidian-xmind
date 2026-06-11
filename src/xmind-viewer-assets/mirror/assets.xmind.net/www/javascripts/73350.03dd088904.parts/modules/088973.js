export default {
    88973: function (e) {
        'use strict';
        const t = window.__xmindPackageCommonmark;
        if (!t)
            throw new Error(
                'XMind viewer runtime requires package-provided CommonMark.'
            );
        e.exports = {
            Node: t.Node,
            Parser: t.Parser,
            HtmlRenderer: t.HtmlRenderer,
            XmlRenderer: t.XmlRenderer,
            Renderer: t.Renderer,
        };
    },
};
