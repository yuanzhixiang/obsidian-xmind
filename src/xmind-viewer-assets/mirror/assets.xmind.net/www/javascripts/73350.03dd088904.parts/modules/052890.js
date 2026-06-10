export default {
    52890: function (e, t, i) {
        'use strict';
        var n = i(31801),
            r = i(50446).unescapeString,
            o = i(50446).OPENTAG,
            a = i(50446).CLOSETAG,
            s = i(84263),
            l = [
                /./,
                /^<(?:script|pre|style)(?:\s|>|$)/i,
                /^<!--/,
                /^<[?]/,
                /^<![A-Z]/,
                /^<!\[CDATA\[/,
                /^<[/]?(?:address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[123456]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|title|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul)(?:\s|[/]?[>]|$)/i,
                new RegExp('^(?:' + o + '|' + a + ')\\s*$', 'i'),
            ],
            c = [/./, /<\/(?:script|pre|style)>/i, /-->/, /\?>/, />/, /\]\]>/],
            d = /^(?:(?:\*[ \t]*){3,}|(?:_[ \t]*){3,}|(?:-[ \t]*){3,})[ \t]*$/,
            f = /^[#`~*+_=<>0-9-]/,
            h = /[^ \t\f\v\r\n]/,
            p = /^[*+-]/,
            T = /^(\d{1,9})([.)])/,
            u = /^#{1,6}(?:[ \t]+|$)/,
            g = /^`{3,}(?!.*`)|^~{3,}(?!.*~)/,
            Q = /^(?:`{3,}|~{3,})(?= *$)/,
            m = /^(?:=+|-+)[ \t]*$/,
            b = /\r\n|\n|\r/,
            C = function (e) {
                return 32 === e || 9 === e;
            },
            L = function (e, t) {
                return t < e.length ? e.charCodeAt(t) : -1;
            },
            y = function (e) {
                for (; e; ) {
                    if (e._lastLineBlank) return !0;
                    var t = e.type;
                    if ('list' !== t && 'item' !== t) break;
                    e = e._lastChild;
                }
                return !1;
            },
            M = function () {
                if (this.partiallyConsumedTab) {
                    this.offset += 1;
                    var e = 4 - (this.column % 4);
                    this.tip._string_content += ' '.repeat(e);
                }
                this.tip._string_content +=
                    this.currentLine.slice(this.offset) + '\n';
            },
            A = function (e, t) {
                for (; !this.blocks[this.tip.type].canContain(e); )
                    this.finalize(this.tip, this.lineNumber - 1);
                var i = t + 1,
                    r = new n(e, [
                        [this.lineNumber, i],
                        [0, 0],
                    ]);
                return (
                    (r._string_content = ''),
                    this.tip.appendChild(r),
                    (this.tip = r),
                    r
                );
            },
            v = function () {
                if (!this.allClosed) {
                    for (; this.oldtip !== this.lastMatchedContainer; ) {
                        var e = this.oldtip._parent;
                        (this.finalize(this.oldtip, this.lineNumber - 1),
                            (this.oldtip = e));
                    }
                    this.allClosed = !0;
                }
            },
            E = {
                document: {
                    continue: function () {
                        return 0;
                    },
                    finalize: function () {},
                    canContain: function (e) {
                        return 'item' !== e;
                    },
                    acceptsLines: !1,
                },
                list: {
                    continue: function () {
                        return 0;
                    },
                    finalize: function (e, t) {
                        for (var i = t._firstChild; i; ) {
                            if (y(i) && i._next) {
                                t._listData.tight = !1;
                                break;
                            }
                            for (var n = i._firstChild; n; ) {
                                if (y(n) && (i._next || n._next)) {
                                    t._listData.tight = !1;
                                    break;
                                }
                                n = n._next;
                            }
                            i = i._next;
                        }
                    },
                    canContain: function (e) {
                        return 'item' === e;
                    },
                    acceptsLines: !1,
                },
                block_quote: {
                    continue: function (e) {
                        var t = e.currentLine;
                        return e.indented || 62 !== L(t, e.nextNonspace)
                            ? 1
                            : (e.advanceNextNonspace(),
                              e.advanceOffset(1, !1),
                              C(L(t, e.offset)) && e.advanceOffset(1, !0),
                              0);
                    },
                    finalize: function () {},
                    canContain: function (e) {
                        return 'item' !== e;
                    },
                    acceptsLines: !1,
                },
                item: {
                    continue: function (e, t) {
                        if (e.blank) {
                            if (null == t._firstChild) return 1;
                            e.advanceNextNonspace();
                        } else {
                            if (
                                !(
                                    e.indent >=
                                    t._listData.markerOffset +
                                        t._listData.padding
                                )
                            )
                                return 1;
                            e.advanceOffset(
                                t._listData.markerOffset + t._listData.padding,
                                !0
                            );
                        }
                        return 0;
                    },
                    finalize: function () {},
                    canContain: function (e) {
                        return 'item' !== e;
                    },
                    acceptsLines: !1,
                },
                heading: {
                    continue: function () {
                        return 1;
                    },
                    finalize: function () {},
                    canContain: function () {
                        return !1;
                    },
                    acceptsLines: !1,
                },
                thematic_break: {
                    continue: function () {
                        return 1;
                    },
                    finalize: function () {},
                    canContain: function () {
                        return !1;
                    },
                    acceptsLines: !1,
                },
                code_block: {
                    continue: function (e, t) {
                        var i = e.currentLine,
                            n = e.indent;
                        if (t._isFenced) {
                            var r =
                                n <= 3 &&
                                i.charAt(e.nextNonspace) === t._fenceChar &&
                                i.slice(e.nextNonspace).match(Q);
                            if (r && r[0].length >= t._fenceLength)
                                return (e.finalize(t, e.lineNumber), 2);
                            for (
                                var o = t._fenceOffset;
                                o > 0 && C(L(i, e.offset));
                            )
                                (e.advanceOffset(1, !0), o--);
                        } else if (n >= 4) e.advanceOffset(4, !0);
                        else {
                            if (!e.blank) return 1;
                            e.advanceNextNonspace();
                        }
                        return 0;
                    },
                    finalize: function (e, t) {
                        if (t._isFenced) {
                            var i = t._string_content,
                                n = i.indexOf('\n'),
                                o = i.slice(0, n),
                                a = i.slice(n + 1);
                            ((t.info = r(o.trim())), (t._literal = a));
                        } else
                            t._literal = t._string_content.replace(
                                /(\n *)+$/,
                                '\n'
                            );
                        t._string_content = null;
                    },
                    canContain: function () {
                        return !1;
                    },
                    acceptsLines: !0,
                },
                html_block: {
                    continue: function (e, t) {
                        return !e.blank ||
                            (6 !== t._htmlBlockType && 7 !== t._htmlBlockType)
                            ? 0
                            : 1;
                    },
                    finalize: function (e, t) {
                        ((t._literal = t._string_content.replace(
                            /(\n *)+$/,
                            ''
                        )),
                            (t._string_content = null));
                    },
                    canContain: function () {
                        return !1;
                    },
                    acceptsLines: !0,
                },
                paragraph: {
                    continue: function (e) {
                        return e.blank ? 1 : 0;
                    },
                    finalize: function (e, t) {
                        for (
                            var i, n, r = !1;
                            91 === L(t._string_content, 0) &&
                            (i = e.inlineParser.parseReference(
                                t._string_content,
                                e.refmap
                            ));
                        )
                            ((t._string_content = t._string_content.slice(i)),
                                (r = !0));
                        r &&
                            ((n = t._string_content), !h.test(n)) &&
                            t.unlink();
                    },
                    canContain: function () {
                        return !1;
                    },
                    acceptsLines: !0,
                },
            },
            _ = [
                function (e) {
                    return e.indented || 62 !== L(e.currentLine, e.nextNonspace)
                        ? 0
                        : (e.advanceNextNonspace(),
                          e.advanceOffset(1, !1),
                          C(L(e.currentLine, e.offset)) &&
                              e.advanceOffset(1, !0),
                          e.closeUnmatchedBlocks(),
                          e.addChild('block_quote', e.nextNonspace),
                          1);
                },
                function (e) {
                    var t;
                    if (
                        !e.indented &&
                        (t = e.currentLine.slice(e.nextNonspace).match(u))
                    ) {
                        (e.advanceNextNonspace(),
                            e.advanceOffset(t[0].length, !1),
                            e.closeUnmatchedBlocks());
                        var i = e.addChild('heading', e.nextNonspace);
                        return (
                            (i.level = t[0].trim().length),
                            (i._string_content = e.currentLine
                                .slice(e.offset)
                                .replace(/^[ \t]*#+[ \t]*$/, '')
                                .replace(/[ \t]+#+[ \t]*$/, '')),
                            e.advanceOffset(e.currentLine.length - e.offset),
                            2
                        );
                    }
                    return 0;
                },
                function (e) {
                    var t;
                    if (
                        !e.indented &&
                        (t = e.currentLine.slice(e.nextNonspace).match(g))
                    ) {
                        var i = t[0].length;
                        e.closeUnmatchedBlocks();
                        var n = e.addChild('code_block', e.nextNonspace);
                        return (
                            (n._isFenced = !0),
                            (n._fenceLength = i),
                            (n._fenceChar = t[0][0]),
                            (n._fenceOffset = e.indent),
                            e.advanceNextNonspace(),
                            e.advanceOffset(i, !1),
                            2
                        );
                    }
                    return 0;
                },
                function (e, t) {
                    if (
                        !e.indented &&
                        60 === L(e.currentLine, e.nextNonspace)
                    ) {
                        var i,
                            n = e.currentLine.slice(e.nextNonspace);
                        for (i = 1; i <= 7; i++) {
                            if (
                                l[i].test(n) &&
                                (i < 7 || 'paragraph' !== t.type)
                            )
                                return (
                                    e.closeUnmatchedBlocks(),
                                    (e.addChild(
                                        'html_block',
                                        e.offset
                                    )._htmlBlockType = i),
                                    2
                                );
                        }
                    }
                    return 0;
                },
                function (e, t) {
                    var i;
                    if (
                        !e.indented &&
                        'paragraph' === t.type &&
                        (i = e.currentLine.slice(e.nextNonspace).match(m))
                    ) {
                        e.closeUnmatchedBlocks();
                        var r = new n('heading', t.sourcepos);
                        return (
                            (r.level = '=' === i[0][0] ? 1 : 2),
                            (r._string_content = t._string_content),
                            t.insertAfter(r),
                            t.unlink(),
                            (e.tip = r),
                            e.advanceOffset(
                                e.currentLine.length - e.offset,
                                !1
                            ),
                            2
                        );
                    }
                    return 0;
                },
                function (e) {
                    return !e.indented &&
                        d.test(e.currentLine.slice(e.nextNonspace))
                        ? (e.closeUnmatchedBlocks(),
                          e.addChild('thematic_break', e.nextNonspace),
                          e.advanceOffset(e.currentLine.length - e.offset, !1),
                          2)
                        : 0;
                },
                function (e, t) {
                    var i, n, r;
                    return (e.indented && 'list' !== t.type) ||
                        !(i = (function (e, t) {
                            var i,
                                n,
                                r,
                                o,
                                a = e.currentLine.slice(e.nextNonspace),
                                s = {
                                    type: null,
                                    tight: !0,
                                    bulletChar: null,
                                    start: null,
                                    delimiter: null,
                                    padding: null,
                                    markerOffset: e.indent,
                                };
                            if ((i = a.match(p)))
                                ((s.type = 'bullet'), (s.bulletChar = i[0][0]));
                            else {
                                if (
                                    !(i = a.match(T)) ||
                                    ('paragraph' === t.type && '1' !== i[1])
                                )
                                    return null;
                                ((s.type = 'ordered'),
                                    (s.start = parseInt(i[1])),
                                    (s.delimiter = i[2]));
                            }
                            if (
                                -1 !==
                                    (n = L(
                                        e.currentLine,
                                        e.nextNonspace + i[0].length
                                    )) &&
                                9 !== n &&
                                32 !== n
                            )
                                return null;
                            if (
                                'paragraph' === t.type &&
                                !e.currentLine
                                    .slice(e.nextNonspace + i[0].length)
                                    .match(h)
                            )
                                return null;
                            (e.advanceNextNonspace(),
                                e.advanceOffset(i[0].length, !0),
                                (r = e.column),
                                (o = e.offset));
                            do {
                                (e.advanceOffset(1, !0),
                                    (n = L(e.currentLine, e.offset)));
                            } while (e.column - r < 5 && C(n));
                            var l = -1 === L(e.currentLine, e.offset),
                                c = e.column - r;
                            return (
                                c >= 5 || c < 1 || l
                                    ? ((s.padding = i[0].length + 1),
                                      (e.column = r),
                                      (e.offset = o),
                                      C(L(e.currentLine, e.offset)) &&
                                          e.advanceOffset(1, !0))
                                    : (s.padding = i[0].length + c),
                                s
                            );
                        })(e, t))
                        ? 0
                        : (e.closeUnmatchedBlocks(),
                          ('list' === e.tip.type &&
                              ((n = t._listData),
                              (r = i),
                              n.type === r.type &&
                                  n.delimiter === r.delimiter &&
                                  n.bulletChar === r.bulletChar)) ||
                              ((t = e.addChild(
                                  'list',
                                  e.nextNonspace
                              ))._listData = i),
                          ((t = e.addChild('item', e.nextNonspace))._listData =
                              i),
                          1);
                },
                function (e) {
                    return e.indented && 'paragraph' !== e.tip.type && !e.blank
                        ? (e.advanceOffset(4, !0),
                          e.closeUnmatchedBlocks(),
                          e.addChild('code_block', e.offset),
                          2)
                        : 0;
                },
            ],
            O = function (e, t) {
                for (
                    var i, n, r, o = this.currentLine;
                    e > 0 && (r = o[this.offset]);
                )
                    '\t' === r
                        ? ((i = 4 - (this.column % 4)),
                          t
                              ? ((this.partiallyConsumedTab = i > e),
                                (n = i > e ? e : i),
                                (this.column += n),
                                (this.offset += this.partiallyConsumedTab
                                    ? 0
                                    : 1),
                                (e -= n))
                              : ((this.partiallyConsumedTab = !1),
                                (this.column += i),
                                (this.offset += 1),
                                (e -= 1)))
                        : ((this.partiallyConsumedTab = !1),
                          (this.offset += 1),
                          (this.column += 1),
                          (e -= 1));
            },
            S = function () {
                ((this.offset = this.nextNonspace),
                    (this.column = this.nextNonspaceColumn),
                    (this.partiallyConsumedTab = !1));
            },
            x = function () {
                for (
                    var e,
                        t = this.currentLine,
                        i = this.offset,
                        n = this.column;
                    '' !== (e = t.charAt(i));
                )
                    if (' ' === e) (i++, n++);
                    else {
                        if ('\t' !== e) break;
                        (i++, (n += 4 - (n % 4)));
                    }
                ((this.blank = '\n' === e || '\r' === e || '' === e),
                    (this.nextNonspace = i),
                    (this.nextNonspaceColumn = n),
                    (this.indent = this.nextNonspaceColumn - this.column),
                    (this.indented = this.indent >= 4));
            },
            R = function (e) {
                var t,
                    i,
                    n = !0,
                    r = this.doc;
                for (
                    this.oldtip = this.tip,
                        this.offset = 0,
                        this.column = 0,
                        this.blank = !1,
                        this.partiallyConsumedTab = !1,
                        this.lineNumber += 1,
                        -1 !== e.indexOf('\0') && (e = e.replace(/\0/g, '�')),
                        this.currentLine = e;
                    (i = r._lastChild) && i._open;
                ) {
                    switch (
                        ((r = i),
                        this.findNextNonspace(),
                        this.blocks[r.type].continue(this, r))
                    ) {
                        case 0:
                            break;
                        case 1:
                            n = !1;
                            break;
                        case 2:
                            return void (this.lastLineLength = e.length);
                        default:
                            throw 'continue returned illegal value, must be 0, 1, or 2';
                    }
                    if (!n) {
                        r = r._parent;
                        break;
                    }
                }
                ((this.allClosed = r === this.oldtip),
                    (this.lastMatchedContainer = r));
                for (
                    var o = 'paragraph' !== r.type && E[r.type].acceptsLines,
                        a = this.blockStarts,
                        s = a.length;
                    !o;
                ) {
                    if (
                        (this.findNextNonspace(),
                        !this.indented && !f.test(e.slice(this.nextNonspace)))
                    ) {
                        this.advanceNextNonspace();
                        break;
                    }
                    for (var l = 0; l < s; ) {
                        var d = a[l](this, r);
                        if (1 === d) {
                            r = this.tip;
                            break;
                        }
                        if (2 === d) {
                            ((r = this.tip), (o = !0));
                            break;
                        }
                        l++;
                    }
                    if (l === s) {
                        this.advanceNextNonspace();
                        break;
                    }
                }
                if (
                    this.allClosed ||
                    this.blank ||
                    'paragraph' !== this.tip.type
                ) {
                    (this.closeUnmatchedBlocks(),
                        this.blank &&
                            r.lastChild &&
                            (r.lastChild._lastLineBlank = !0),
                        (t = r.type));
                    for (
                        var h =
                                this.blank &&
                                !(
                                    'block_quote' === t ||
                                    ('code_block' === t && r._isFenced) ||
                                    ('item' === t &&
                                        !r._firstChild &&
                                        r.sourcepos[0][0] === this.lineNumber)
                                ),
                            p = r;
                        p;
                    )
                        ((p._lastLineBlank = h), (p = p._parent));
                    this.blocks[t].acceptsLines
                        ? (this.addLine(),
                          'html_block' === t &&
                              r._htmlBlockType >= 1 &&
                              r._htmlBlockType <= 5 &&
                              c[r._htmlBlockType].test(
                                  this.currentLine.slice(this.offset)
                              ) &&
                              this.finalize(r, this.lineNumber))
                        : this.offset < e.length &&
                          !this.blank &&
                          ((r = this.addChild('paragraph', this.offset)),
                          this.advanceNextNonspace(),
                          this.addLine());
                } else this.addLine();
                this.lastLineLength = e.length;
            },
            I = function (e, t) {
                var i = e._parent;
                ((e._open = !1),
                    (e.sourcepos[1] = [t, this.lastLineLength]),
                    this.blocks[e.type].finalize(this, e),
                    (this.tip = i));
            },
            N = function (e) {
                var t,
                    i,
                    n,
                    r = e.walker();
                for (
                    this.inlineParser.refmap = this.refmap,
                        this.inlineParser.options = this.options;
                    (i = r.next());
                )
                    ((n = (t = i.node).type),
                        i.entering ||
                            ('paragraph' !== n && 'heading' !== n) ||
                            this.inlineParser.parse(t));
            },
            w = function () {
                return new n('document', [
                    [1, 1],
                    [0, 0],
                ]);
            },
            P = function (e) {
                ((this.doc = new w()),
                    (this.tip = this.doc),
                    (this.refmap = {}),
                    (this.lineNumber = 0),
                    (this.lastLineLength = 0),
                    (this.offset = 0),
                    (this.column = 0),
                    (this.lastMatchedContainer = this.doc),
                    (this.currentLine = ''),
                    this.options.time && console.time('preparing input'));
                var t = e.split(b),
                    i = t.length;
                (10 === e.charCodeAt(e.length - 1) && (i -= 1),
                    this.options.time && console.timeEnd('preparing input'),
                    this.options.time && console.time('block parsing'));
                for (var n = 0; n < i; n++) this.incorporateLine(t[n]);
                for (; this.tip; ) this.finalize(this.tip, i);
                return (
                    this.options.time && console.timeEnd('block parsing'),
                    this.options.time && console.time('inline parsing'),
                    this.processInlines(this.doc),
                    this.options.time && console.timeEnd('inline parsing'),
                    this.doc
                );
            };
        e.exports = function (e) {
            return {
                doc: new w(),
                blocks: E,
                blockStarts: _,
                tip: this.doc,
                oldtip: this.doc,
                currentLine: '',
                lineNumber: 0,
                offset: 0,
                column: 0,
                nextNonspace: 0,
                nextNonspaceColumn: 0,
                indent: 0,
                indented: !1,
                blank: !1,
                partiallyConsumedTab: !1,
                allClosed: !0,
                lastMatchedContainer: this.doc,
                refmap: {},
                lastLineLength: 0,
                inlineParser: new s(e),
                findNextNonspace: x,
                advanceOffset: O,
                advanceNextNonspace: S,
                addLine: M,
                addChild: A,
                incorporateLine: R,
                finalize: I,
                processInlines: N,
                closeUnmatchedBlocks: v,
                parse: P,
                options: e || {},
            };
        };
    },
};
