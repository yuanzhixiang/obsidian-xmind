export default {
    84263: function (e, t, i) {
        'use strict';
        var n = i(31801),
            r = i(50446),
            o = i(18927),
            a = r.normalizeURI,
            s = r.unescapeString,
            l = i(56648),
            c = i(46413).p1;
        i(32781);
        var d = 39,
            f = 34,
            h = r.ESCAPABLE,
            p = '\\\\' + h,
            T = r.ENTITY,
            u = r.reHtmlTag,
            g = new RegExp(
                /[!"#$%&'()*+,\-./:;<=>?@\[\]^_`{|}~\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E42\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC9\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDF3C-\uDF3E]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]/
            ),
            Q = new RegExp(
                '^(?:"(' +
                    p +
                    '|[^"\\x00])*"|\'(' +
                    p +
                    "|[^'\\x00])*'|\\((" +
                    p +
                    '|[^)\\x00])*\\))'
            ),
            m = new RegExp(
                '^(?:[<](?:[^ <>\\t\\n\\\\\\x00]|' + p + '|\\\\)*[>])'
            ),
            b = new RegExp('^' + h),
            C = new RegExp('^' + T, 'i'),
            L = /`+/,
            y = /^`+/,
            M = /\.\.\./g,
            A = /--+/g,
            v =
                /^<([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)>/,
            E = /^<[A-Za-z][A-Za-z0-9.+-]{1,31}:[^<>\x00-\x20]*>/i,
            _ = /^ *(?:\n *)?/,
            O = /^[ \t\n\x0b\x0c\x0d]/,
            S = /[ \t\n\x0b\x0c\x0d]+/g,
            x = /^\s/,
            R = / *$/,
            I = /^ */,
            N = /^ *(?:\n|$)/,
            w = new RegExp('^\\[(?:[^\\\\\\[\\]]|' + p + '|\\\\){0,1000}\\]'),
            P = /^[^\n`\[\]\\!<&*_'"]+/m,
            H = function (e) {
                var t = new n('text');
                return ((t._literal = e), t);
            },
            D = function (e) {
                var t = e.exec(this.subject.slice(this.pos));
                return null === t
                    ? null
                    : ((this.pos += t.index + t[0].length), t[0]);
            },
            F = function () {
                return this.pos < this.subject.length
                    ? this.subject.charCodeAt(this.pos)
                    : -1;
            },
            k = function () {
                return (this.match(_), !0);
            },
            B = function (e) {
                var t = this.match(y);
                if (null === t) return !1;
                for (var i, r, o = this.pos; null !== (i = this.match(L)); )
                    if (i === t)
                        return (
                            ((r = new n('code'))._literal = this.subject
                                .slice(o, this.pos - t.length)
                                .trim()
                                .replace(S, ' ')),
                            e.appendChild(r),
                            !0
                        );
                return ((this.pos = o), e.appendChild(H(t)), !0);
            },
            V = function (e) {
                var t,
                    i = this.subject;
                return (
                    (this.pos += 1),
                    10 === this.peek()
                        ? ((this.pos += 1),
                          (t = new n('linebreak')),
                          e.appendChild(t))
                        : b.test(i.charAt(this.pos))
                          ? (e.appendChild(H(i.charAt(this.pos))),
                            (this.pos += 1))
                          : e.appendChild(H('\\')),
                    !0
                );
            },
            Y = function (e) {
                var t, i, r;
                return (t = this.match(v))
                    ? ((i = t.slice(1, t.length - 1)),
                      ((r = new n('link'))._destination = a('mailto:' + i)),
                      (r._title = ''),
                      r.appendChild(H(i)),
                      e.appendChild(r),
                      !0)
                    : !!(t = this.match(E)) &&
                          ((i = t.slice(1, t.length - 1)),
                          ((r = new n('link'))._destination = a(i)),
                          (r._title = ''),
                          r.appendChild(H(i)),
                          e.appendChild(r),
                          !0);
            },
            G = function (e) {
                var t = this.match(u);
                if (null === t) return !1;
                var i = new n('html_inline');
                return ((i._literal = t), e.appendChild(i), !0);
            },
            U = function (e) {
                var t,
                    i,
                    n,
                    r,
                    o,
                    a,
                    s,
                    c,
                    h,
                    p,
                    T,
                    u = 0,
                    Q = this.pos;
                if (e === d || e === f) (u++, this.pos++);
                else for (; this.peek() === e; ) (u++, this.pos++);
                return 0 === u
                    ? null
                    : ((t = 0 === Q ? '\n' : this.subject.charAt(Q - 1)),
                      (i = -1 === (n = this.peek()) ? '\n' : l(n)),
                      (c = x.test(i)),
                      (h = g.test(i)),
                      (p = x.test(t)),
                      (T = g.test(t)),
                      (r = !c && (!h || p || T)),
                      (o = !p && (!T || c || h)),
                      95 === e
                          ? ((a = r && (!o || T)), (s = o && (!r || h)))
                          : e === d || e === f
                            ? ((a = r && !o), (s = o))
                            : ((a = r), (s = o)),
                      (this.pos = Q),
                      { numdelims: u, can_open: a, can_close: s });
            },
            j = function (e, t) {
                var i = this.scanDelims(e);
                if (!i) return !1;
                var n,
                    r = i.numdelims,
                    o = this.pos;
                ((this.pos += r),
                    (n =
                        e === d
                            ? '’'
                            : e === f
                              ? '“'
                              : this.subject.slice(o, this.pos)));
                var a = H(n);
                return (
                    t.appendChild(a),
                    (this.delimiters = {
                        cc: e,
                        numdelims: r,
                        origdelims: r,
                        node: a,
                        previous: this.delimiters,
                        next: null,
                        can_open: i.can_open,
                        can_close: i.can_close,
                    }),
                    null !== this.delimiters.previous &&
                        (this.delimiters.previous.next = this.delimiters),
                    !0
                );
            },
            $ = function (e) {
                (null !== e.previous && (e.previous.next = e.next),
                    null === e.next
                        ? (this.delimiters = e.previous)
                        : (e.next.previous = e.previous));
            },
            z = function (e) {
                var t,
                    i,
                    r,
                    o,
                    a,
                    s,
                    l,
                    c,
                    h,
                    p,
                    T,
                    u,
                    g = [],
                    Q = !1;
                for (
                    g[95] = e,
                        g[42] = e,
                        g[39] = e,
                        g[34] = e,
                        i = this.delimiters;
                    null !== i && i.previous !== e;
                )
                    i = i.previous;
                for (; null !== i; ) {
                    var m = i.cc;
                    if (i.can_close) {
                        for (
                            t = i.previous, p = !1;
                            null !== t && t !== e && t !== g[m];
                        ) {
                            if (
                                ((Q =
                                    (i.can_open || t.can_close) &&
                                    (t.origdelims + i.origdelims) % 3 == 0),
                                t.cc === i.cc && t.can_open && !Q)
                            ) {
                                p = !0;
                                break;
                            }
                            t = t.previous;
                        }
                        if (((r = i), 42 === m || 95 === m))
                            if (p) {
                                ((l =
                                    i.numdelims >= 2 && t.numdelims >= 2
                                        ? 2
                                        : 1),
                                    (o = t.node),
                                    (a = i.node),
                                    (t.numdelims -= l),
                                    (i.numdelims -= l),
                                    (o._literal = o._literal.slice(
                                        0,
                                        o._literal.length - l
                                    )),
                                    (a._literal = a._literal.slice(
                                        0,
                                        a._literal.length - l
                                    )));
                                var b = new n(1 === l ? 'emph' : 'strong');
                                for (c = o._next; c && c !== a; )
                                    ((h = c._next),
                                        c.unlink(),
                                        b.appendChild(c),
                                        (c = h));
                                (o.insertAfter(b),
                                    (u = i),
                                    (T = t).next !== u &&
                                        ((T.next = u), (u.previous = T)),
                                    0 === t.numdelims &&
                                        (o.unlink(), this.removeDelimiter(t)),
                                    0 === i.numdelims &&
                                        (a.unlink(),
                                        (s = i.next),
                                        this.removeDelimiter(i),
                                        (i = s)));
                            } else i = i.next;
                        else
                            m === d
                                ? ((i.node._literal = '’'),
                                  p && (t.node._literal = '‘'),
                                  (i = i.next))
                                : m === f &&
                                  ((i.node._literal = '”'),
                                  p && (t.node.literal = '“'),
                                  (i = i.next));
                        p ||
                            Q ||
                            ((g[m] = r.previous),
                            r.can_open || this.removeDelimiter(r));
                    } else i = i.next;
                }
                for (; null !== this.delimiters && this.delimiters !== e; )
                    this.removeDelimiter(this.delimiters);
            },
            W = function () {
                var e = this.match(Q);
                return null === e ? null : s(e.substr(1, e.length - 2));
            },
            K = function () {
                var e = this.match(m);
                if (null === e) {
                    for (var t, i = this.pos, n = 0; -1 !== (t = this.peek()); )
                        if (92 === t)
                            ((this.pos += 1),
                                -1 !== this.peek() && (this.pos += 1));
                        else if (40 === t) ((this.pos += 1), (n += 1));
                        else if (41 === t) {
                            if (n < 1) break;
                            ((this.pos += 1), (n -= 1));
                        } else {
                            if (null !== O.exec(l(t))) break;
                            this.pos += 1;
                        }
                    return (
                        (e = this.subject.substr(i, this.pos - i)),
                        a(s(e))
                    );
                }
                return a(s(e.substr(1, e.length - 2)));
            },
            Z = function () {
                var e = this.match(w);
                return null === e || e.length > 1001 || /[^\\]\\\]$/.exec(e)
                    ? 0
                    : e.length;
            },
            J = function (e) {
                var t = this.pos;
                this.pos += 1;
                var i = H('[');
                return (e.appendChild(i), this.addBracket(i, t, !1), !0);
            },
            X = function (e) {
                var t = this.pos;
                if (((this.pos += 1), 91 === this.peek())) {
                    this.pos += 1;
                    var i = H('![');
                    (e.appendChild(i), this.addBracket(i, t + 1, !0));
                } else e.appendChild(H('!'));
                return !0;
            },
            q = function (e) {
                var t,
                    i,
                    r,
                    a,
                    s,
                    l,
                    c = !1;
                if (
                    ((this.pos += 1),
                    (t = this.pos),
                    null === (l = this.brackets))
                )
                    return (e.appendChild(H(']')), !0);
                if (!l.active)
                    return (e.appendChild(H(']')), this.removeBracket(), !0);
                i = l.image;
                var d = this.pos;
                if (
                    (40 === this.peek() &&
                        (this.pos++,
                        this.spnl() &&
                        null !== (r = this.parseLinkDestination()) &&
                        this.spnl() &&
                        (O.test(this.subject.charAt(this.pos - 1)) &&
                            (a = this.parseLinkTitle()),
                        1) &&
                        this.spnl() &&
                        41 === this.peek()
                            ? ((this.pos += 1), (c = !0))
                            : (this.pos = d)),
                    !c)
                ) {
                    var f = this.pos,
                        h = this.parseLinkLabel();
                    if (
                        (h > 2
                            ? (s = this.subject.slice(f, f + h))
                            : l.bracketAfter ||
                              (s = this.subject.slice(l.index, t)),
                        0 === h && (this.pos = d),
                        s)
                    ) {
                        var p = this.refmap[o(s)];
                        p && ((r = p.destination), (a = p.title), (c = !0));
                    }
                }
                if (c) {
                    var T,
                        u,
                        g = new n(i ? 'image' : 'link');
                    for (
                        g._destination = r,
                            g._title = a || '',
                            T = l.node._next;
                        T;
                    )
                        ((u = T._next), T.unlink(), g.appendChild(T), (T = u));
                    if (
                        (e.appendChild(g),
                        this.processEmphasis(l.previousDelimiter),
                        this.removeBracket(),
                        l.node.unlink(),
                        !i)
                    )
                        for (l = this.brackets; null !== l; )
                            (l.image || (l.active = !1), (l = l.previous));
                    return !0;
                }
                return (
                    this.removeBracket(),
                    (this.pos = t),
                    e.appendChild(H(']')),
                    !0
                );
            },
            ee = function (e, t, i) {
                (null !== this.brackets && (this.brackets.bracketAfter = !0),
                    (this.brackets = {
                        node: e,
                        previous: this.brackets,
                        previousDelimiter: this.delimiters,
                        index: t,
                        image: i,
                        active: !0,
                    }));
            },
            te = function () {
                this.brackets = this.brackets.previous;
            },
            ie = function (e) {
                var t;
                return !!(t = this.match(C)) && (e.appendChild(H(c(t))), !0);
            },
            ne = function (e) {
                var t;
                return (
                    !!(t = this.match(P)) &&
                    (this.options.smart
                        ? e.appendChild(
                              H(
                                  t.replace(M, '…').replace(A, function (e) {
                                      var t = 0,
                                          i = 0;
                                      return (
                                          e.length % 3 == 0
                                              ? (i = e.length / 3)
                                              : e.length % 2 == 0
                                                ? (t = e.length / 2)
                                                : e.length % 3 == 2
                                                  ? ((t = 1),
                                                    (i = (e.length - 2) / 3))
                                                  : ((t = 2),
                                                    (i = (e.length - 4) / 3)),
                                          '—'.repeat(i) + '–'.repeat(t)
                                      );
                                  })
                              )
                          )
                        : e.appendChild(H(t)),
                    !0)
                );
            },
            re = function (e) {
                this.pos += 1;
                var t = e._lastChild;
                if (
                    t &&
                    'text' === t.type &&
                    ' ' === t._literal[t._literal.length - 1]
                ) {
                    var i = ' ' === t._literal[t._literal.length - 2];
                    ((t._literal = t._literal.replace(R, '')),
                        e.appendChild(new n(i ? 'linebreak' : 'softbreak')));
                } else e.appendChild(new n('softbreak'));
                return (this.match(I), !0);
            },
            oe = function (e, t) {
                var i, n, r, a;
                ((this.subject = e), (this.pos = 0));
                var s = this.pos;
                if (0 === (a = this.parseLinkLabel())) return 0;
                if (((i = this.subject.substr(0, a)), 58 !== this.peek()))
                    return ((this.pos = s), 0);
                if (
                    (this.pos++,
                    this.spnl(),
                    null === (n = this.parseLinkDestination()) ||
                        0 === n.length)
                )
                    return ((this.pos = s), 0);
                var l = this.pos;
                (this.spnl(),
                    null === (r = this.parseLinkTitle()) &&
                        ((r = ''), (this.pos = l)));
                var c = !0;
                if (
                    (null === this.match(N) &&
                        ('' === r
                            ? (c = !1)
                            : ((r = ''),
                              (this.pos = l),
                              (c = null !== this.match(N)))),
                    !c)
                )
                    return ((this.pos = s), 0);
                var d = o(i);
                return '' === d
                    ? ((this.pos = s), 0)
                    : (t[d] || (t[d] = { destination: n, title: r }),
                      this.pos - s);
            },
            ae = function (e) {
                var t = !1,
                    i = this.peek();
                if (-1 === i) return !1;
                switch (i) {
                    case 10:
                        t = this.parseNewline(e);
                        break;
                    case 92:
                        t = this.parseBackslash(e);
                        break;
                    case 96:
                        t = this.parseBackticks(e);
                        break;
                    case 42:
                    case 95:
                        t = this.handleDelim(i, e);
                        break;
                    case d:
                    case f:
                        t = this.options.smart && this.handleDelim(i, e);
                        break;
                    case 91:
                        t = this.parseOpenBracket(e);
                        break;
                    case 33:
                        t = this.parseBang(e);
                        break;
                    case 93:
                        t = this.parseCloseBracket(e);
                        break;
                    case 60:
                        t = this.parseAutolink(e) || this.parseHtmlTag(e);
                        break;
                    case 38:
                        t = this.parseEntity(e);
                        break;
                    default:
                        t = this.parseString(e);
                }
                return (t || ((this.pos += 1), e.appendChild(H(l(i)))), !0);
            },
            se = function (e) {
                for (
                    this.subject = e._string_content.trim(),
                        this.pos = 0,
                        this.delimiters = null,
                        this.brackets = null;
                    this.parseInline(e);
                );
                ((e._string_content = null), this.processEmphasis(null));
            };
        e.exports = function (e) {
            return {
                subject: '',
                delimiters: null,
                brackets: null,
                pos: 0,
                refmap: {},
                match: D,
                peek: F,
                spnl: k,
                parseBackticks: B,
                parseBackslash: V,
                parseAutolink: Y,
                parseHtmlTag: G,
                scanDelims: U,
                handleDelim: j,
                parseLinkTitle: W,
                parseLinkDestination: K,
                parseLinkLabel: Z,
                parseOpenBracket: J,
                parseBang: X,
                parseCloseBracket: q,
                addBracket: ee,
                removeBracket: te,
                parseEntity: ie,
                parseString: ne,
                parseNewline: re,
                parseReference: oe,
                parseInline: ae,
                processEmphasis: z,
                removeDelimiter: $,
                options: e || {},
                parse: se,
            };
        };
    },
};
