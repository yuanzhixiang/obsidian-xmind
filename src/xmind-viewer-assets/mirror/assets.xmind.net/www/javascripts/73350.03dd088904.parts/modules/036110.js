export default {
    36110: function (e, t) {
        const i = window.__xmindPackageEntities;
        if (!i) {
            throw new Error(
                'XMind viewer runtime requires package-provided entities.'
            );
        }

        t.XML = i.encodeXML;
        t.HTML = i.encodeHTML;
        t.escape = i.escape;
    },
};
