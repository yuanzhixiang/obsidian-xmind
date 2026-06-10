export default {
    32781: function () {
        /*! http://mths.be/repeat v0.2.0 by @mathias */
        String.prototype.repeat ||
            (function () {
                'use strict';
                var e = (function () {
                        try {
                            var e = {},
                                t = Object.defineProperty,
                                i = t(e, e, e) && t;
                        } catch (e) {}
                        return i;
                    })(),
                    t = function (e) {
                        if (null == this) throw TypeError();
                        var t = String(this),
                            i = e ? Number(e) : 0;
                        if ((i != i && (i = 0), i < 0 || i == 1 / 0))
                            throw RangeError();
                        for (var n = ''; i; )
                            (i % 2 == 1 && (n += t),
                                i > 1 && (t += t),
                                (i >>= 1));
                        return n;
                    };
                e
                    ? e(String.prototype, 'repeat', {
                          value: t,
                          configurable: !0,
                          writable: !0,
                      })
                    : (String.prototype.repeat = t);
            })();
    },
};
