export default [
    function (e, t) {
        e.exports = function () {
            throw new Error('define cannot be used indirect');
        };
    },
];
