export default {
    36697: function (e, t, i) {
        function n(e) {
            this.options = e || { locator: {} };
        }
        function r() {
            this.cdata = !1;
        }
        function o(e, t) {
            ((t.lineNumber = e.lineNumber), (t.columnNumber = e.columnNumber));
        }
        function a(e) {
            if (e)
                return (
                    '\n@' +
                    (e.systemId || '') +
                    '#[line:' +
                    e.lineNumber +
                    ',col:' +
                    e.columnNumber +
                    ']'
                );
        }
        function s(e, t, i) {
            return 'string' == typeof e
                ? e.substr(t, i)
                : e.length >= t + i || t
                  ? new java.lang.String(e, t, i) + ''
                  : e;
        }
        function l(e, t) {
            e.currentElement
                ? e.currentElement.appendChild(t)
                : e.doc.appendChild(t);
        }
        ((n.prototype.parseFromString = function (e, t) {
            var i = this.options,
                n = new c(),
                o = i.domBuilder || new r(),
                s = i.errorHandler,
                l = i.locator,
                d = i.xmlns || {},
                f = { lt: '<', gt: '>', amp: '&', quot: '"', apos: "'" };
            return (
                l && o.setDocumentLocator(l),
                (n.errorHandler = (function (e, t, i) {
                    if (!e) {
                        if (t instanceof r) return t;
                        e = t;
                    }
                    var n = {},
                        o = e instanceof Function;
                    function s(t) {
                        var r = e[t];
                        (!r &&
                            o &&
                            (r =
                                2 == e.length
                                    ? function (i) {
                                          e(t, i);
                                      }
                                    : e),
                            (n[t] =
                                (r &&
                                    function (e) {
                                        r('[xmldom ' + t + ']\t' + e + a(i));
                                    }) ||
                                function () {}));
                    }
                    return (
                        (i = i || {}),
                        s('warning'),
                        s('error'),
                        s('fatalError'),
                        n
                    );
                })(s, o, l)),
                (n.domBuilder = i.domBuilder || o),
                /\/x?html?$/.test(t) &&
                    ((f.nbsp = ' '),
                    (f.copy = '©'),
                    (d[''] = 'http://www.w3.org/1999/xhtml')),
                (d.xml = d.xml || 'http://www.w3.org/XML/1998/namespace'),
                e
                    ? n.parse(e, d, f)
                    : n.errorHandler.error('invalid doc source'),
                o.doc
            );
        }),
            (r.prototype = {
                startDocument: function () {
                    ((this.doc = new d().createDocument(null, null, null)),
                        this.locator &&
                            (this.doc.documentURI = this.locator.systemId));
                },
                startElement: function (e, t, i, n) {
                    var r = this.doc,
                        a = r.createElementNS(e, i || t),
                        s = n.length;
                    (l(this, a),
                        (this.currentElement = a),
                        this.locator && o(this.locator, a));
                    for (var c = 0; c < s; c++) {
                        e = n.getURI(c);
                        var d = n.getValue(c),
                            f =
                                ((i = n.getQName(c)),
                                r.createAttributeNS(e, i));
                        (this.locator && o(n.getLocator(c), f),
                            (f.value = f.nodeValue = d),
                            a.setAttributeNode(f));
                    }
                },
                endElement: function (e, t, i) {
                    var n = this.currentElement;
                    n.tagName;
                    this.currentElement = n.parentNode;
                },
                startPrefixMapping: function (e, t) {},
                endPrefixMapping: function (e) {},
                processingInstruction: function (e, t) {
                    var i = this.doc.createProcessingInstruction(e, t);
                    (this.locator && o(this.locator, i), l(this, i));
                },
                ignorableWhitespace: function (e, t, i) {},
                characters: function (e, t, i) {
                    if ((e = s.apply(this, arguments))) {
                        if (this.cdata) var n = this.doc.createCDATASection(e);
                        else n = this.doc.createTextNode(e);
                        (this.currentElement
                            ? this.currentElement.appendChild(n)
                            : /^\s*$/.test(e) && this.doc.appendChild(n),
                            this.locator && o(this.locator, n));
                    }
                },
                skippedEntity: function (e) {},
                endDocument: function () {
                    this.doc.normalize();
                },
                setDocumentLocator: function (e) {
                    (this.locator = e) && (e.lineNumber = 0);
                },
                comment: function (e, t, i) {
                    e = s.apply(this, arguments);
                    var n = this.doc.createComment(e);
                    (this.locator && o(this.locator, n), l(this, n));
                },
                startCDATA: function () {
                    this.cdata = !0;
                },
                endCDATA: function () {
                    this.cdata = !1;
                },
                startDTD: function (e, t, i) {
                    var n = this.doc.implementation;
                    if (n && n.createDocumentType) {
                        var r = n.createDocumentType(e, t, i);
                        (this.locator && o(this.locator, r), l(this, r));
                    }
                },
                warning: function (e) {
                    console.warn('[xmldom warning]\t' + e, a(this.locator));
                },
                error: function (e) {
                    console.error('[xmldom error]\t' + e, a(this.locator));
                },
                fatalError: function (e) {
                    throw (
                        console.error(
                            '[xmldom fatalError]\t' + e,
                            a(this.locator)
                        ),
                        e
                    );
                },
            }),
            'endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl'.replace(
                /\w+/g,
                function (e) {
                    r.prototype[e] = function () {
                        return null;
                    };
                }
            ));
        var c = i(77439).G,
            d = (t.DOMImplementation = i(28937).DOMImplementation);
        ((t.XMLSerializer = i(28937).XMLSerializer), (t.DOMParser = n));
    },
};
