export default {
    97776: function (e, t, i) {
        'use strict';
        var n = i(60427),
            r = /^javascript:|vbscript:|file:|data:/i,
            o = /^data:image\/(?:png|gif|jpeg|webp)/i,
            a = function (e) {
                return r.test(e) && !o.test(e);
            };
        function s(e) {
            (((e = e || {}).softbreak = e.softbreak || '\n'),
                (this.disableTags = 0),
                (this.lastOut = '\n'),
                (this.options = e));
        }
        ((s.prototype = Object.create(n.prototype)),
            (s.prototype.text = function (e) {
                this.out(e.literal);
            }),
            (s.prototype.html_inline = function (e) {
                this.options.safe
                    ? this.lit('\x3c!-- raw HTML omitted --\x3e')
                    : this.lit(e.literal);
            }),
            (s.prototype.html_block = function (e) {
                (this.cr(),
                    this.options.safe
                        ? this.lit('\x3c!-- raw HTML omitted --\x3e')
                        : this.lit(e.literal),
                    this.cr());
            }),
            (s.prototype.softbreak = function () {
                this.lit(this.options.softbreak);
            }),
            (s.prototype.linebreak = function () {
                (this.tag('br', [], !0), this.cr());
            }),
            (s.prototype.link = function (e, t) {
                var i = this.attrs(e);
                t
                    ? ((this.options.safe && a(e.destination)) ||
                          i.push(['href', this.esc(e.destination, !0)]),
                      e.title && i.push(['title', this.esc(e.title, !0)]),
                      this.tag('a', i))
                    : this.tag('/a');
            }),
            (s.prototype.image = function (e, t) {
                t
                    ? (0 === this.disableTags &&
                          (this.options.safe && a(e.destination)
                              ? this.lit('<img src="" alt="')
                              : this.lit(
                                    '<img src="' +
                                        this.esc(e.destination, !0) +
                                        '" alt="'
                                )),
                      (this.disableTags += 1))
                    : ((this.disableTags -= 1),
                      0 === this.disableTags &&
                          (e.title &&
                              this.lit('" title="' + this.esc(e.title, !0)),
                          this.lit('" />')));
            }),
            (s.prototype.emph = function (e, t) {
                this.tag(t ? 'em' : '/em');
            }),
            (s.prototype.strong = function (e, t) {
                this.tag(t ? 'strong' : '/strong');
            }),
            (s.prototype.paragraph = function (e, t) {
                var i = e.parent.parent,
                    n = this.attrs(e);
                (null !== i && 'list' === i.type && i.listTight) ||
                    (t
                        ? (this.cr(), this.tag('p', n))
                        : (this.tag('/p'), this.cr()));
            }),
            (s.prototype.heading = function (e, t) {
                var i = 'h' + e.level,
                    n = this.attrs(e);
                t
                    ? (this.cr(), this.tag(i, n))
                    : (this.tag('/' + i), this.cr());
            }),
            (s.prototype.code = function (e) {
                (this.tag('code'), this.out(e.literal), this.tag('/code'));
            }),
            (s.prototype.code_block = function (e) {
                var t = e.info ? e.info.split(/\s+/) : [],
                    i = this.attrs(e);
                (t.length > 0 &&
                    t[0].length > 0 &&
                    i.push(['class', 'language-' + this.esc(t[0], !0)]),
                    this.cr(),
                    this.tag('pre'),
                    this.tag('code', i),
                    this.out(e.literal),
                    this.tag('/code'),
                    this.tag('/pre'),
                    this.cr());
            }),
            (s.prototype.thematic_break = function (e) {
                var t = this.attrs(e);
                (this.cr(), this.tag('hr', t, !0), this.cr());
            }),
            (s.prototype.block_quote = function (e, t) {
                var i = this.attrs(e);
                t
                    ? (this.cr(), this.tag('blockquote', i), this.cr())
                    : (this.cr(), this.tag('/blockquote'), this.cr());
            }),
            (s.prototype.list = function (e, t) {
                var i = 'bullet' === e.listType ? 'ul' : 'ol',
                    n = this.attrs(e);
                if (t) {
                    var r = e.listStart;
                    (null !== r && 1 !== r && n.push(['start', r.toString()]),
                        this.cr(),
                        this.tag(i, n),
                        this.cr());
                } else (this.cr(), this.tag('/' + i), this.cr());
            }),
            (s.prototype.item = function (e, t) {
                var i = this.attrs(e);
                t ? this.tag('li', i) : (this.tag('/li'), this.cr());
            }),
            (s.prototype.custom_inline = function (e, t) {
                t && e.onEnter
                    ? this.lit(e.onEnter)
                    : !t && e.onExit && this.lit(e.onExit);
            }),
            (s.prototype.custom_block = function (e, t) {
                (this.cr(),
                    t && e.onEnter
                        ? this.lit(e.onEnter)
                        : !t && e.onExit && this.lit(e.onExit),
                    this.cr());
            }),
            (s.prototype.esc = i(50446).escapeXml),
            (s.prototype.out = function (e) {
                this.lit(this.esc(e, !1));
            }),
            (s.prototype.tag = function (e, t, i) {
                if (!(this.disableTags > 0)) {
                    if (((this.buffer += '<' + e), t && t.length > 0))
                        for (var n, r = 0; void 0 !== (n = t[r]); )
                            ((this.buffer += ' ' + n[0] + '="' + n[1] + '"'),
                                r++);
                    (i && (this.buffer += ' /'),
                        (this.buffer += '>'),
                        (this.lastOut = '>'));
                }
            }),
            (s.prototype.attrs = function (e) {
                var t = [];
                if (this.options.sourcepos) {
                    var i = e.sourcepos;
                    i &&
                        t.push([
                            'data-sourcepos',
                            String(i[0][0]) +
                                ':' +
                                String(i[0][1]) +
                                '-' +
                                String(i[1][0]) +
                                ':' +
                                String(i[1][1]),
                        ]);
                }
                return t;
            }),
            (e.exports = s));
    },
};
