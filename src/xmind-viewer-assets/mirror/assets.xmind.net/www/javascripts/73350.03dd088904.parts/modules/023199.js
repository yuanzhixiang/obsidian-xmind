export default {
    23199: function (e, t, i) {
        var n = i(73267),
            r = i(6800),
            o = i(5304),
            a = i(2263),
            s = c(o),
            l = c(n);
        function c(e) {
            var t = Object.keys(e).join('|'),
                i = h(e),
                n = new RegExp(
                    '&(?:' + (t += '|#[xX][\\da-fA-F]+|#\\d+') + ');',
                    'g'
                );
            return function (e) {
                return String(e).replace(n, i);
            };
        }
        var d = (function () {
            for (
                var e = Object.keys(r).sort(f),
                    t = Object.keys(n).sort(f),
                    i = 0,
                    o = 0;
                i < t.length;
                i++
            )
                e[o] === t[i] ? ((t[i] += ';?'), o++) : (t[i] += ';');
            var a = new RegExp(
                    '&(?:' + t.join('|') + '|#[xX][\\da-fA-F]+;?|#\\d+;?)',
                    'g'
                ),
                s = h(n);
            function l(e) {
                return (';' !== e.substr(-1) && (e += ';'), s(e));
            }
            return function (e) {
                return String(e).replace(a, l);
            };
        })();
        function f(e, t) {
            return e < t ? 1 : -1;
        }
        function h(e) {
            return function (t) {
                return '#' === t.charAt(1)
                    ? 'X' === t.charAt(2) || 'x' === t.charAt(2)
                        ? a(parseInt(t.substr(3), 16))
                        : a(parseInt(t.substr(2), 10))
                    : e[t.slice(1, -1)];
            };
        }
        e.exports = { XML: s, HTML: d, HTMLStrict: l };
    },
};
