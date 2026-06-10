export default [
    function (e, t) {
        var i = {}.toString;
        e.exports =
            Array.isArray ||
            function (e) {
                return '[object Array]' == i.call(e);
            };
    },
];
