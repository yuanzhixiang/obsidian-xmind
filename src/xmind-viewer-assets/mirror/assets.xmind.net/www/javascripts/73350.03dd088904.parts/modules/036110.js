export default {
    36110: function (e, t, i) {
        var n = s(i(5304)),
            r = l(n);
        t.XML = p(n, r);
        var o = s(i(73267)),
            a = l(o);
        function s(e) {
            return Object.keys(e)
                .sort()
                .reduce(function (t, i) {
                    return ((t[e[i]] = '&' + i + ';'), t);
                }, {});
        }
        function l(e) {
            var t = [],
                i = [];
            return (
                Object.keys(e).forEach(function (e) {
                    1 === e.length ? t.push('\\' + e) : i.push(e);
                }),
                i.unshift('[' + t.join('') + ']'),
                new RegExp(i.join('|'), 'g')
            );
        }
        t.HTML = p(o, a);
        var c = /[^\0-\x7F]/g,
            d = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
        function f(e) {
            return '&#x' + e.charCodeAt(0).toString(16).toUpperCase() + ';';
        }
        function h(e) {
            return (
                '&#x' +
                (
                    1024 * (e.charCodeAt(0) - 55296) +
                    e.charCodeAt(1) -
                    56320 +
                    65536
                )
                    .toString(16)
                    .toUpperCase() +
                ';'
            );
        }
        function p(e, t) {
            function i(t) {
                return e[t];
            }
            return function (e) {
                return e.replace(t, i).replace(d, h).replace(c, f);
            };
        }
        var T = l(n);
        t.escape = function (e) {
            return e.replace(T, f).replace(d, h).replace(c, f);
        };
    },
};
