export default {
    46413: function (e, t) {
        const i = window.__xmindPackageEntities;
        if (!i) {
            throw new Error(
                'XMind viewer runtime requires package-provided entities.'
            );
        }

        t.p1 = i.decodeHTML;
    },
};
