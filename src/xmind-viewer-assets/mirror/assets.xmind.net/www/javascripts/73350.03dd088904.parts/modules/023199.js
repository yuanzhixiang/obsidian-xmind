export default {
    23199: function (e) {
        const t = window.__xmindPackageEntities;
        if (!t) {
            throw new Error(
                'XMind viewer runtime requires package-provided entities.'
            );
        }

        e.exports = {
            XML: t.decodeXML,
            HTML: t.decodeHTML,
            HTMLStrict: t.decodeHTMLStrict,
        };
    },
};
