export default {
    50446: function (e, t, i) {
        'use strict';
        var n = i(5704),
            r = i(18585),
            o = i(46413).p1,
            a = '&(?:#x[a-f0-9]{1,8}|#[0-9]{1,8}|[a-z][a-z0-9]{1,31});',
            s = '[A-Za-z][A-Za-z0-9-]*',
            l =
                '<' +
                s +
                '(?:\\s+[a-zA-Z_:][a-zA-Z0-9:._-]*(?:\\s*=\\s*(?:[^"\'=<>`\\x00-\\x20]+|\'[^\']*\'|"[^"]*"))?)*\\s*/?>',
            c = '</' + s + '\\s*[>]',
            d = new RegExp(
                '^' +
                    ('(?:' +
                        l +
                        '|' +
                        c +
                        '|\x3c!----\x3e|\x3c!--(?:-?[^>-])(?:-?[^-])*--\x3e|[<][?].*?[?][>]|<![A-Z]+\\s+[^>]*>|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>)'),
                'i'
            ),
            f = /[\\&]/,
            h = '[!"#$%&\'()*+,./:;<=>?@[\\\\\\]^_`{|}~-]',
            p = new RegExp('\\\\' + h + '|' + a, 'gi'),
            T = '[&<>"]',
            u = new RegExp(T, 'g'),
            g = new RegExp(a + '|' + T, 'gi'),
            Q = function (e) {
                return 92 === e.charCodeAt(0) ? e.charAt(1) : o(e);
            },
            m = function (e) {
                switch (e) {
                    case '&':
                        return '&amp;';
                    case '<':
                        return '&lt;';
                    case '>':
                        return '&gt;';
                    case '"':
                        return '&quot;';
                    default:
                        return e;
                }
            };
        e.exports = {
            unescapeString: function (e) {
                return f.test(e) ? e.replace(p, Q) : e;
            },
            normalizeURI: function (e) {
                try {
                    return n(r(e));
                } catch (t) {
                    return e;
                }
            },
            escapeXml: function (e, t) {
                return u.test(e) ? (t ? e.replace(g, m) : e.replace(u, m)) : e;
            },
            reHtmlTag: d,
            OPENTAG: l,
            CLOSETAG: c,
            ENTITY: a,
            ESCAPABLE: h,
        };
    },
};
