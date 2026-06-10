export default {
    60427: function (e) {
        'use strict';
        function t() {}
        ((t.prototype.render = function (e) {
            var t,
                i,
                n = e.walker();
            for (this.buffer = '', this.lastOut = '\n'; (t = n.next()); )
                this[(i = t.node.type)] && this[i](t.node, t.entering);
            return this.buffer;
        }),
            (t.prototype.out = function (e) {
                this.lit(e);
            }),
            (t.prototype.lit = function (e) {
                ((this.buffer += e), (this.lastOut = e));
            }),
            (t.prototype.cr = function () {
                '\n' !== this.lastOut && this.lit('\n');
            }),
            (t.prototype.esc = function (e) {
                return e;
            }),
            (e.exports = t));
    },
};
