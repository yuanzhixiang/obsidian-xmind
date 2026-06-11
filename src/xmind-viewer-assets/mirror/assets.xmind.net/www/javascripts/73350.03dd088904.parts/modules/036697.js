export default {
    36697: function (e) {
        const t = window.__xmindPackageXmldom;
        if (!t) {
            throw new Error(
                'XMind viewer runtime requires package-provided xmldom.'
            );
        }
        e.exports = {
            DOMImplementation: t.DOMImplementation,
            XMLSerializer: t.XMLSerializer,
            DOMParser: t.DOMParser,
        };
    },
};
