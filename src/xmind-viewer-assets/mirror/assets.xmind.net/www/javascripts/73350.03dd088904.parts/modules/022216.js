export default {
    22216: function (e, t, i) {
        'use strict';
        var n = i(60427),
            r = /\<[^>]*\>/;
        function o(e) {
            ((e = e || {}),
                (this.disableTags = 0),
                (this.lastOut = '\n'),
                (this.indentLevel = 0),
                (this.indent = '  '),
                (this.options = e));
        }
        ((o.prototype = Object.create(n.prototype)),
            (o.prototype.render = function (e) {
                var t, i;
                this.buffer = '';
                var n,
                    r,
                    o,
                    a,
                    s,
                    l,
                    c = e.walker(),
                    d = this.options;
                for (
                    d.time && console.time('rendering'),
                        this.buffer +=
                            '<?xml version="1.0" encoding="UTF-8"?>\n',
                        this.buffer +=
                            '<!DOCTYPE document SYSTEM "CommonMark.dtd">\n';
                    (n = c.next());
                )
                    if (
                        ((o = n.entering),
                        (l = (r = n.node).type),
                        (a = r.isContainer),
                        (s =
                            'thematic_break' === l ||
                            'linebreak' === l ||
                            'softbreak' === l),
                        (i = l
                            .replace(/([a-z])([A-Z])/g, '$1_$2')
                            .toLowerCase()),
                        o)
                    ) {
                        switch (((t = []), l)) {
                            case 'document':
                                t.push([
                                    'xmlns',
                                    'http://commonmark.org/xml/1.0',
                                ]);
                                break;
                            case 'list':
                                (null !== r.listType &&
                                    t.push(['type', r.listType.toLowerCase()]),
                                    null !== r.listStart &&
                                        t.push(['start', String(r.listStart)]),
                                    null !== r.listTight &&
                                        t.push([
                                            'tight',
                                            r.listTight ? 'true' : 'false',
                                        ]));
                                var f = r.listDelimiter;
                                if (null !== f) {
                                    var h = '';
                                    ((h = '.' === f ? 'period' : 'paren'),
                                        t.push(['delimiter', h]));
                                }
                                break;
                            case 'code_block':
                                r.info && t.push(['info', r.info]);
                                break;
                            case 'heading':
                                t.push(['level', String(r.level)]);
                                break;
                            case 'link':
                            case 'image':
                                (t.push(['destination', r.destination]),
                                    t.push(['title', r.title]));
                                break;
                            case 'custom_inline':
                            case 'custom_block':
                                (t.push(['on_enter', r.onEnter]),
                                    t.push(['on_exit', r.onExit]));
                        }
                        if (d.sourcepos) {
                            var p = r.sourcepos;
                            p &&
                                t.push([
                                    'sourcepos',
                                    String(p[0][0]) +
                                        ':' +
                                        String(p[0][1]) +
                                        '-' +
                                        String(p[1][0]) +
                                        ':' +
                                        String(p[1][1]),
                                ]);
                        }
                        if ((this.cr(), this.out(this.tag(i, t, s)), a))
                            this.indentLevel += 1;
                        else if (!a && !s) {
                            var T = r.literal;
                            (T && this.out(this.esc(T)),
                                this.out(this.tag('/' + i)));
                        }
                    } else
                        ((this.indentLevel -= 1),
                            this.cr(),
                            this.out(this.tag('/' + i)));
                return (
                    d.time && console.timeEnd('rendering'),
                    (this.buffer += '\n'),
                    this.buffer
                );
            }),
            (o.prototype.out = function (e) {
                (this.disableTags > 0
                    ? (this.buffer += e.replace(r, ''))
                    : (this.buffer += e),
                    (this.lastOut = e));
            }),
            (o.prototype.cr = function () {
                if ('\n' !== this.lastOut) {
                    ((this.buffer += '\n'), (this.lastOut = '\n'));
                    for (var e = this.indentLevel; e > 0; e--)
                        this.buffer += this.indent;
                }
            }),
            (o.prototype.tag = function (e, t, i) {
                var n = '<' + e;
                if (t && t.length > 0)
                    for (var r, o = 0; void 0 !== (r = t[o]); )
                        ((n += ' ' + r[0] + '="' + this.esc(r[1]) + '"'), o++);
                return (i && (n += ' /'), (n += '>'));
            }),
            (o.prototype.esc = i(50446).escapeXml),
            (e.exports = o));
    },
};
