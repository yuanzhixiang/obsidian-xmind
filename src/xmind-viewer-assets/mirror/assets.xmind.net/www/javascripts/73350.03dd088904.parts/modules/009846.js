export default {
    9846: function (e) {
        'function' == typeof Object.create
            ? (e.exports = function (e, t) {
                  ((e.super_ = t),
                      (e.prototype = Object.create(t.prototype, {
                          constructor: {
                              value: e,
                              enumerable: !1,
                              writable: !0,
                              configurable: !0,
                          },
                      })));
              })
            : (e.exports = function (e, t) {
                  e.super_ = t;
                  var i = function () {};
                  ((i.prototype = t.prototype),
                      (e.prototype = new i()),
                      (e.prototype.constructor = e));
              });
    },
};
