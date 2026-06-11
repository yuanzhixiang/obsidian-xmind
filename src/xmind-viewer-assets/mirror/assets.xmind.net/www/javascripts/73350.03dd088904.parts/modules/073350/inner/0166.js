export default [
    function () {
        const e = window.__xmindPackageMathJax || window.MathJax;
        if (
            !e ||
            typeof e.texReset !== 'function' ||
            typeof e.tex2svg !== 'function'
        ) {
            throw new Error(
                'XMind viewer runtime requires package-provided MathJax.'
            );
        }

        window.MathJax = e;
    },
];
