export default [
    function (e, t) {
        var i;
        i = (function () {
            return this;
        })();
        try {
            i = i || new Function('return this')();
        } catch (e) {
            'object' == typeof window && (i = window);
        }
        e.exports = i;
    },
];
