export default {
    77439: function (e, t) {
        var i =
                /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/,
            n = new RegExp(
                '[\\-\\.0-9' +
                    i.source.slice(1, -1) +
                    '\\u00B7\\u0300-\\u036F\\u203F-\\u2040]'
            ),
            r = new RegExp(
                '^' +
                    i.source +
                    n.source +
                    '*(?::' +
                    i.source +
                    n.source +
                    '*)?$'
            );
        function o() {}
        function a(e, t) {
            return (
                (t.lineNumber = e.lineNumber),
                (t.columnNumber = e.columnNumber),
                t
            );
        }
        function s(e, t, i, n, r, o) {
            for (var a, s = ++t, l = 0; ; ) {
                var c = e.charAt(s);
                switch (c) {
                    case '=':
                        if (1 === l) ((a = e.slice(t, s)), (l = 3));
                        else {
                            if (2 !== l)
                                throw new Error(
                                    'attribute equal must after attrName'
                                );
                            l = 3;
                        }
                        break;
                    case "'":
                    case '"':
                        if (3 === l || 1 === l) {
                            if (
                                (1 === l &&
                                    (o.warning(
                                        'attribute value must after "="'
                                    ),
                                    (a = e.slice(t, s))),
                                (t = s + 1),
                                !((s = e.indexOf(c, t)) > 0))
                            )
                                throw new Error(
                                    "attribute value no end '" + c + "' match"
                                );
                            ((d = e.slice(t, s).replace(/&#?\w+;/g, r)),
                                i.add(a, d, t - 1),
                                (l = 5));
                        } else {
                            if (4 != l)
                                throw new Error(
                                    'attribute value must after "="'
                                );
                            ((d = e.slice(t, s).replace(/&#?\w+;/g, r)),
                                i.add(a, d, t),
                                o.warning(
                                    'attribute "' +
                                        a +
                                        '" missed start quot(' +
                                        c +
                                        ')!!'
                                ),
                                (t = s + 1),
                                (l = 5));
                        }
                        break;
                    case '/':
                        switch (l) {
                            case 0:
                                i.setTagName(e.slice(t, s));
                            case 5:
                            case 6:
                            case 7:
                                ((l = 7), (i.closed = !0));
                            case 4:
                            case 1:
                            case 2:
                                break;
                            default:
                                throw new Error(
                                    "attribute invalid close char('/')"
                                );
                        }
                        break;
                    case '':
                        return (
                            o.error('unexpected end of input'),
                            0 == l && i.setTagName(e.slice(t, s)),
                            s
                        );
                    case '>':
                        switch (l) {
                            case 0:
                                i.setTagName(e.slice(t, s));
                            case 5:
                            case 6:
                            case 7:
                                break;
                            case 4:
                            case 1:
                                '/' === (d = e.slice(t, s)).slice(-1) &&
                                    ((i.closed = !0), (d = d.slice(0, -1)));
                            case 2:
                                (2 === l && (d = a),
                                    4 == l
                                        ? (o.warning(
                                              'attribute "' +
                                                  d +
                                                  '" missed quot(")!!'
                                          ),
                                          i.add(a, d.replace(/&#?\w+;/g, r), t))
                                        : (('http://www.w3.org/1999/xhtml' ===
                                              n[''] &&
                                              d.match(
                                                  /^(?:disabled|checked|selected)$/i
                                              )) ||
                                              o.warning(
                                                  'attribute "' +
                                                      d +
                                                      '" missed value!! "' +
                                                      d +
                                                      '" instead!!'
                                              ),
                                          i.add(d, d, t)));
                                break;
                            case 3:
                                throw new Error('attribute value missed!!');
                        }
                        return s;
                    case '':
                        c = ' ';
                    default:
                        if (c <= ' ')
                            switch (l) {
                                case 0:
                                    (i.setTagName(e.slice(t, s)), (l = 6));
                                    break;
                                case 1:
                                    ((a = e.slice(t, s)), (l = 2));
                                    break;
                                case 4:
                                    var d = e
                                        .slice(t, s)
                                        .replace(/&#?\w+;/g, r);
                                    (o.warning(
                                        'attribute "' + d + '" missed quot(")!!'
                                    ),
                                        i.add(a, d, t));
                                case 5:
                                    l = 6;
                            }
                        else
                            switch (l) {
                                case 2:
                                    i.tagName;
                                    (('http://www.w3.org/1999/xhtml' ===
                                        n[''] &&
                                        a.match(
                                            /^(?:disabled|checked|selected)$/i
                                        )) ||
                                        o.warning(
                                            'attribute "' +
                                                a +
                                                '" missed value!! "' +
                                                a +
                                                '" instead2!!'
                                        ),
                                        i.add(a, a, t),
                                        (t = s),
                                        (l = 1));
                                    break;
                                case 5:
                                    o.warning(
                                        'attribute space is required"' +
                                            a +
                                            '"!!'
                                    );
                                case 6:
                                    ((l = 1), (t = s));
                                    break;
                                case 3:
                                    ((l = 4), (t = s));
                                    break;
                                case 7:
                                    throw new Error(
                                        "elements closed character '/' and '>' must be connected to"
                                    );
                            }
                }
                s++;
            }
        }
        function l(e, t, i) {
            for (var n = e.tagName, r = null, o = e.length; o--; ) {
                var a = e[o],
                    s = a.qName,
                    l = a.value;
                if ((p = s.indexOf(':')) > 0)
                    var c = (a.prefix = s.slice(0, p)),
                        d = s.slice(p + 1),
                        h = 'xmlns' === c && d;
                else ((d = s), (c = null), (h = 'xmlns' === s && ''));
                ((a.localName = d),
                    !1 !== h &&
                        (null == r && ((r = {}), f(i, (i = {}))),
                        (i[h] = r[h] = l),
                        (a.uri = 'http://www.w3.org/2000/xmlns/'),
                        t.startPrefixMapping(h, l)));
            }
            for (o = e.length; o--; ) {
                (c = (a = e[o]).prefix) &&
                    ('xml' === c &&
                        (a.uri = 'http://www.w3.org/XML/1998/namespace'),
                    'xmlns' !== c && (a.uri = i[c || '']));
            }
            var p;
            (p = n.indexOf(':')) > 0
                ? ((c = e.prefix = n.slice(0, p)),
                  (d = e.localName = n.slice(p + 1)))
                : ((c = null), (d = e.localName = n));
            var T = (e.uri = i[c || '']);
            if ((t.startElement(T, d, n, e), !e.closed))
                return ((e.currentNSMap = i), (e.localNSMap = r), !0);
            if ((t.endElement(T, d, n), r)) for (c in r) t.endPrefixMapping(c);
        }
        function c(e, t, i, n, r) {
            if (/^(?:script|textarea)$/i.test(i)) {
                var o = e.indexOf('</' + i + '>', t),
                    a = e.substring(t + 1, o);
                if (/[&<]/.test(a))
                    return /^script$/i.test(i)
                        ? (r.characters(a, 0, a.length), o)
                        : ((a = a.replace(/&#?\w+;/g, n)),
                          r.characters(a, 0, a.length),
                          o);
            }
            return t + 1;
        }
        function d(e, t, i, n) {
            var r = n[i];
            return (
                null == r &&
                    ((r = e.lastIndexOf('</' + i + '>')) < t &&
                        (r = e.lastIndexOf('</' + i)),
                    (n[i] = r)),
                r < t
            );
        }
        function f(e, t) {
            for (var i in e) t[i] = e[i];
        }
        function h(e, t, i, n) {
            if ('-' === e.charAt(t + 2))
                return '-' === e.charAt(t + 3)
                    ? (r = e.indexOf('--\x3e', t + 4)) > t
                        ? (i.comment(e, t + 4, r - t - 4), r + 3)
                        : (n.error('Unclosed comment'), -1)
                    : -1;
            if ('CDATA[' == e.substr(t + 3, 6)) {
                var r = e.indexOf(']]>', t + 9);
                return (
                    i.startCDATA(),
                    i.characters(e, t + 9, r - t - 9),
                    i.endCDATA(),
                    r + 3
                );
            }
            var o = (function (e, t) {
                    var i,
                        n = [],
                        r = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
                    ((r.lastIndex = t), r.exec(e));
                    for (; (i = r.exec(e)); ) if ((n.push(i), i[1])) return n;
                })(e, t),
                a = o.length;
            if (a > 1 && /!doctype/i.test(o[0][0])) {
                var s = o[1][0],
                    l = a > 3 && /^public$/i.test(o[2][0]) && o[3][0],
                    c = a > 4 && o[4][0],
                    d = o[a - 1];
                return (
                    i.startDTD(
                        s,
                        l && l.replace(/^(['"])(.*?)\1$/, '$2'),
                        c && c.replace(/^(['"])(.*?)\1$/, '$2')
                    ),
                    i.endDTD(),
                    d.index + d[0].length
                );
            }
            return -1;
        }
        function p(e, t, i) {
            var n = e.indexOf('?>', t);
            if (n) {
                var r = e.substring(t, n).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
                if (r) {
                    r[0].length;
                    return (i.processingInstruction(r[1], r[2]), n + 2);
                }
                return -1;
            }
            return -1;
        }
        function T(e) {}
        function u(e, t) {
            return ((e.__proto__ = t), e);
        }
        ((o.prototype = {
            parse: function (e, t, i) {
                var n = this.domBuilder;
                (n.startDocument(),
                    f(t, (t = {})),
                    (function (e, t, i, n, r) {
                        function o(e) {
                            if (e > 65535) {
                                var t = 55296 + ((e -= 65536) >> 10),
                                    i = 56320 + (1023 & e);
                                return String.fromCharCode(t, i);
                            }
                            return String.fromCharCode(e);
                        }
                        function f(e) {
                            var t = e.slice(1, -1);
                            return t in i
                                ? i[t]
                                : '#' === t.charAt(0)
                                  ? o(parseInt(t.substr(1).replace('x', '0x')))
                                  : (r.error('entity not found:' + e), e);
                        }
                        function u(t) {
                            if (t > M) {
                                var i = e
                                    .substring(M, t)
                                    .replace(/&#?\w+;/g, f);
                                (C && g(M), n.characters(i, 0, t - M), (M = t));
                            }
                        }
                        function g(t, i) {
                            for (; t >= m && (i = b.exec(e)); )
                                ((Q = i.index),
                                    (m = Q + i[0].length),
                                    C.lineNumber++);
                            C.columnNumber = t - Q + 1;
                        }
                        var Q = 0,
                            m = 0,
                            b = /.*(?:\r\n?|\n)|.*$/g,
                            C = n.locator,
                            L = [{ currentNSMap: t }],
                            y = {},
                            M = 0;
                        for (;;) {
                            try {
                                var A = e.indexOf('<', M);
                                if (A < 0) {
                                    if (!e.substr(M).match(/^\s*$/)) {
                                        var v = n.doc,
                                            E = v.createTextNode(e.substr(M));
                                        (v.appendChild(E),
                                            (n.currentElement = E));
                                    }
                                    return;
                                }
                                switch ((A > M && u(A), e.charAt(A + 1))) {
                                    case '/':
                                        var _ = e.indexOf('>', A + 3),
                                            O = e.substring(A + 2, _),
                                            S = L.pop();
                                        _ < 0
                                            ? ((O = e
                                                  .substring(A + 2)
                                                  .replace(/[\s<].*/, '')),
                                              r.error(
                                                  'end tag name: ' +
                                                      O +
                                                      ' is not complete:' +
                                                      S.tagName
                                              ),
                                              (_ = A + 1 + O.length))
                                            : O.match(/\s</) &&
                                              ((O = O.replace(/[\s<].*/, '')),
                                              r.error(
                                                  'end tag name: ' +
                                                      O +
                                                      ' maybe not complete'
                                              ),
                                              (_ = A + 1 + O.length));
                                        var x = S.localNSMap,
                                            R = S.tagName == O;
                                        if (
                                            R ||
                                            (S.tagName &&
                                                S.tagName.toLowerCase() ==
                                                    O.toLowerCase())
                                        ) {
                                            if (
                                                (n.endElement(
                                                    S.uri,
                                                    S.localName,
                                                    O
                                                ),
                                                x)
                                            )
                                                for (var I in x)
                                                    n.endPrefixMapping(I);
                                            R ||
                                                r.fatalError(
                                                    'end tag name: ' +
                                                        O +
                                                        ' is not match the current start tagName:' +
                                                        S.tagName
                                                );
                                        } else L.push(S);
                                        _++;
                                        break;
                                    case '?':
                                        (C && g(A), (_ = p(e, A, n)));
                                        break;
                                    case '!':
                                        (C && g(A), (_ = h(e, A, n, r)));
                                        break;
                                    default:
                                        C && g(A);
                                        var N = new T(),
                                            w = L[L.length - 1].currentNSMap,
                                            P =
                                                ((_ = s(e, A, N, w, f, r)),
                                                N.length);
                                        if (
                                            (!N.closed &&
                                                d(e, _, N.tagName, y) &&
                                                ((N.closed = !0),
                                                i.nbsp ||
                                                    r.warning(
                                                        'unclosed xml attribute'
                                                    )),
                                            C && P)
                                        ) {
                                            for (
                                                var H = a(C, {}), D = 0;
                                                D < P;
                                                D++
                                            ) {
                                                var F = N[D];
                                                (g(F.offset),
                                                    (F.locator = a(C, {})));
                                            }
                                            ((n.locator = H),
                                                l(N, n, w) && L.push(N),
                                                (n.locator = C));
                                        } else l(N, n, w) && L.push(N);
                                        'http://www.w3.org/1999/xhtml' !==
                                            N.uri || N.closed
                                            ? _++
                                            : (_ = c(e, _, N.tagName, f, n));
                                }
                            } catch (e) {
                                (r.error('element parse error: ' + e),
                                    (_ = -1));
                            }
                            _ > M ? (M = _) : u(Math.max(A, M) + 1);
                        }
                    })(e, t, i, n, this.errorHandler),
                    n.endDocument());
            },
        }),
            (T.prototype = {
                setTagName: function (e) {
                    if (!r.test(e)) throw new Error('invalid tagName:' + e);
                    this.tagName = e;
                },
                add: function (e, t, i) {
                    if (!r.test(e)) throw new Error('invalid attribute:' + e);
                    this[this.length++] = { qName: e, value: t, offset: i };
                },
                length: 0,
                getLocalName: function (e) {
                    return this[e].localName;
                },
                getLocator: function (e) {
                    return this[e].locator;
                },
                getQName: function (e) {
                    return this[e].qName;
                },
                getURI: function (e) {
                    return this[e].uri;
                },
                getValue: function (e) {
                    return this[e].value;
                },
            }),
            u({}, u.prototype) instanceof u ||
                (u = function (e, t) {
                    function i() {}
                    for (t in ((i.prototype = t), (i = new i()), e))
                        i[t] = e[t];
                    return i;
                }),
            (t.G = o));
    },
};
