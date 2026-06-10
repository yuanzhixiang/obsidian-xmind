export default {
    28937: function (e, t) {
        function i(e, t) {
            for (var i in e) t[i] = e[i];
        }
        function n(e, t) {
            var n = e.prototype;
            if (Object.create) {
                var r = Object.create(t.prototype);
                n.__proto__ = r;
            }
            if (!(n instanceof t)) {
                function o() {}
                ((o.prototype = t.prototype),
                    i(n, (o = new o())),
                    (e.prototype = n = o));
            }
            n.constructor != e &&
                ('function' != typeof e && console.error('unknow Class:' + e),
                (n.constructor = e));
        }
        var r = {},
            o = (r.ELEMENT_NODE = 1),
            a = (r.ATTRIBUTE_NODE = 2),
            s = (r.TEXT_NODE = 3),
            l = (r.CDATA_SECTION_NODE = 4),
            c = (r.ENTITY_REFERENCE_NODE = 5),
            d = (r.ENTITY_NODE = 6),
            f = (r.PROCESSING_INSTRUCTION_NODE = 7),
            h = (r.COMMENT_NODE = 8),
            p = (r.DOCUMENT_NODE = 9),
            T = (r.DOCUMENT_TYPE_NODE = 10),
            u = (r.DOCUMENT_FRAGMENT_NODE = 11),
            g = (r.NOTATION_NODE = 12),
            Q = {},
            m = {},
            b =
                ((Q.INDEX_SIZE_ERR = ((m[1] = 'Index size error'), 1)),
                (Q.DOMSTRING_SIZE_ERR = ((m[2] = 'DOMString size error'), 2)),
                (Q.HIERARCHY_REQUEST_ERR =
                    ((m[3] = 'Hierarchy request error'), 3))),
            C =
                ((Q.WRONG_DOCUMENT_ERR = ((m[4] = 'Wrong document'), 4)),
                (Q.INVALID_CHARACTER_ERR = ((m[5] = 'Invalid character'), 5)),
                (Q.NO_DATA_ALLOWED_ERR = ((m[6] = 'No data allowed'), 6)),
                (Q.NO_MODIFICATION_ALLOWED_ERR =
                    ((m[7] = 'No modification allowed'), 7)),
                (Q.NOT_FOUND_ERR = ((m[8] = 'Not found'), 8))),
            L =
                ((Q.NOT_SUPPORTED_ERR = ((m[9] = 'Not supported'), 9)),
                (Q.INUSE_ATTRIBUTE_ERR = ((m[10] = 'Attribute in use'), 10)));
        ((Q.INVALID_STATE_ERR = ((m[11] = 'Invalid state'), 11)),
            (Q.SYNTAX_ERR = ((m[12] = 'Syntax error'), 12)),
            (Q.INVALID_MODIFICATION_ERR =
                ((m[13] = 'Invalid modification'), 13)),
            (Q.NAMESPACE_ERR = ((m[14] = 'Invalid namespace'), 14)),
            (Q.INVALID_ACCESS_ERR = ((m[15] = 'Invalid access'), 15)));
        function y(e, t) {
            if (t instanceof Error) var i = t;
            else
                ((i = this),
                    Error.call(this, m[e]),
                    (this.message = m[e]),
                    Error.captureStackTrace &&
                        Error.captureStackTrace(this, y));
            return (
                (i.code = e),
                t && (this.message = this.message + ': ' + t),
                i
            );
        }
        function M() {}
        function A(e, t) {
            ((this._node = e), (this._refresh = t), v(this));
        }
        function v(e) {
            var t = e._node._inc || e._node.ownerDocument._inc;
            if (e._inc != t) {
                var n = e._refresh(e._node);
                (ne(e, 'length', n.length), i(n, e), (e._inc = t));
            }
        }
        function E() {}
        function _(e, t) {
            for (var i = e.length; i--; ) if (e[i] === t) return i;
        }
        function O(e, t, i, n) {
            if ((n ? (t[_(t, n)] = i) : (t[t.length++] = i), e)) {
                i.ownerElement = e;
                var r = e.ownerDocument;
                r &&
                    (n && P(r, e, n),
                    (function (e, t, i) {
                        e && e._inc++;
                        var n = i.namespaceURI;
                        'http://www.w3.org/2000/xmlns/' == n &&
                            (t._nsMap[i.prefix ? i.localName : ''] = i.value);
                    })(r, e, i));
            }
        }
        function S(e, t, i) {
            var n = _(t, i);
            if (!(n >= 0)) throw y(C, new Error(e.tagName + '@' + i));
            for (var r = t.length - 1; n < r; ) t[n] = t[++n];
            if (((t.length = r), e)) {
                var o = e.ownerDocument;
                o && (P(o, e, i), (i.ownerElement = null));
            }
        }
        function x(e) {
            if (((this._features = {}), e))
                for (var t in e) this._features = e[t];
        }
        function R() {}
        function I(e) {
            return (
                ('<' == e ? '&lt;' : '>' == e && '&gt;') ||
                ('&' == e && '&amp;') ||
                ('"' == e && '&quot;') ||
                '&#' + e.charCodeAt() + ';'
            );
        }
        function N(e, t) {
            if (t(e)) return !0;
            if ((e = e.firstChild))
                do {
                    if (N(e, t)) return !0;
                } while ((e = e.nextSibling));
        }
        function w() {}
        function P(e, t, i, n) {
            (e && e._inc++,
                'http://www.w3.org/2000/xmlns/' == i.namespaceURI &&
                    delete t._nsMap[i.prefix ? i.localName : '']);
        }
        function H(e, t, i) {
            if (e && e._inc) {
                e._inc++;
                var n = t.childNodes;
                if (i) n[n.length++] = i;
                else {
                    for (var r = t.firstChild, o = 0; r; )
                        ((n[o++] = r), (r = r.nextSibling));
                    n.length = o;
                }
            }
        }
        function D(e, t) {
            var i = t.previousSibling,
                n = t.nextSibling;
            return (
                i ? (i.nextSibling = n) : (e.firstChild = n),
                n ? (n.previousSibling = i) : (e.lastChild = i),
                H(e.ownerDocument, e),
                t
            );
        }
        function F(e, t, i) {
            var n = t.parentNode;
            if ((n && n.removeChild(t), t.nodeType === u)) {
                var r = t.firstChild;
                if (null == r) return t;
                var o = t.lastChild;
            } else r = o = t;
            var a = i ? i.previousSibling : e.lastChild;
            ((r.previousSibling = a),
                (o.nextSibling = i),
                a ? (a.nextSibling = r) : (e.firstChild = r),
                null == i ? (e.lastChild = o) : (i.previousSibling = o));
            do {
                r.parentNode = e;
            } while (r !== o && (r = r.nextSibling));
            return (
                H(e.ownerDocument || e, e),
                t.nodeType == u && (t.firstChild = t.lastChild = null),
                t
            );
        }
        function k() {
            this._nsMap = {};
        }
        function B() {}
        function V() {}
        function Y() {}
        function G() {}
        function U() {}
        function j() {}
        function $() {}
        function z() {}
        function W() {}
        function K() {}
        function Z() {}
        function J() {}
        function X(e, t) {
            var i = [],
                n = 9 == this.nodeType ? this.documentElement : this,
                r = n.prefix,
                o = n.namespaceURI;
            if (o && null == r && null == (r = n.lookupPrefix(o)))
                var a = [{ namespace: o, prefix: null }];
            return (ee(this, i, e, t, a), i.join(''));
        }
        function q(e, t, i) {
            var n = e.prefix || '',
                r = e.namespaceURI;
            if (!n && !r) return !1;
            if (
                ('xml' === n && 'http://www.w3.org/XML/1998/namespace' === r) ||
                'http://www.w3.org/2000/xmlns/' == r
            )
                return !1;
            for (var o = i.length; o--; ) {
                var a = i[o];
                if (a.prefix == n) return a.namespace != r;
            }
            return !0;
        }
        function ee(e, t, i, n, r) {
            if (n) {
                if (!(e = n(e))) return;
                if ('string' == typeof e) return void t.push(e);
            }
            switch (e.nodeType) {
                case o:
                    r || (r = []);
                    r.length;
                    var d = e.attributes,
                        g = d.length,
                        Q = e.firstChild,
                        m = e.tagName;
                    ((i =
                        'http://www.w3.org/1999/xhtml' === e.namespaceURI || i),
                        t.push('<', m));
                    for (var b = 0; b < g; b++) {
                        'xmlns' == (C = d.item(b)).prefix
                            ? r.push({
                                  prefix: C.localName,
                                  namespace: C.value,
                              })
                            : 'xmlns' == C.nodeName &&
                              r.push({ prefix: '', namespace: C.value });
                    }
                    for (b = 0; b < g; b++) {
                        var C;
                        if (q((C = d.item(b)), 0, r)) {
                            var L = C.prefix || '',
                                y = C.namespaceURI,
                                M = L ? ' xmlns:' + L : ' xmlns';
                            (t.push(M, '="', y, '"'),
                                r.push({ prefix: L, namespace: y }));
                        }
                        ee(C, t, i, n, r);
                    }
                    if (q(e, 0, r)) {
                        ((L = e.prefix || ''),
                            (y = e.namespaceURI),
                            (M = L ? ' xmlns:' + L : ' xmlns'));
                        (t.push(M, '="', y, '"'),
                            r.push({ prefix: L, namespace: y }));
                    }
                    if (
                        Q ||
                        (i && !/^(?:meta|link|img|br|hr|input)$/i.test(m))
                    ) {
                        if ((t.push('>'), i && /^script$/i.test(m)))
                            for (; Q; )
                                (Q.data ? t.push(Q.data) : ee(Q, t, i, n, r),
                                    (Q = Q.nextSibling));
                        else
                            for (; Q; )
                                (ee(Q, t, i, n, r), (Q = Q.nextSibling));
                        t.push('</', m, '>');
                    } else t.push('/>');
                    return;
                case p:
                case u:
                    for (Q = e.firstChild; Q; )
                        (ee(Q, t, i, n, r), (Q = Q.nextSibling));
                    return;
                case a:
                    return t.push(
                        ' ',
                        e.name,
                        '="',
                        e.value.replace(/[<&"]/g, I),
                        '"'
                    );
                case s:
                    return t.push(e.data.replace(/[<&]/g, I));
                case l:
                    return t.push('<![CDATA[', e.data, ']]>');
                case h:
                    return t.push('\x3c!--', e.data, '--\x3e');
                case T:
                    var A = e.publicId,
                        v = e.systemId;
                    if ((t.push('<!DOCTYPE ', e.name), A))
                        (t.push(' PUBLIC "', A),
                            v && '.' != v && t.push('" "', v),
                            t.push('">'));
                    else if (v && '.' != v) t.push(' SYSTEM "', v, '">');
                    else {
                        var E = e.internalSubset;
                        (E && t.push(' [', E, ']'), t.push('>'));
                    }
                    return;
                case f:
                    return t.push('<?', e.target, ' ', e.data, '?>');
                case c:
                    return t.push('&', e.nodeName, ';');
                default:
                    t.push('??', e.nodeName);
            }
        }
        function te(e, t, i) {
            var n;
            switch (t.nodeType) {
                case o:
                    (n = t.cloneNode(!1)).ownerDocument = e;
                case u:
                    break;
                case a:
                    i = !0;
            }
            if (
                (n || (n = t.cloneNode(!1)),
                (n.ownerDocument = e),
                (n.parentNode = null),
                i)
            )
                for (var r = t.firstChild; r; )
                    (n.appendChild(te(e, r, i)), (r = r.nextSibling));
            return n;
        }
        function ie(e, t, i) {
            var n = new t.constructor();
            for (var r in t) {
                var s = t[r];
                'object' != typeof s && s != n[r] && (n[r] = s);
            }
            switch (
                (t.childNodes && (n.childNodes = new M()),
                (n.ownerDocument = e),
                n.nodeType)
            ) {
                case o:
                    var l = t.attributes,
                        c = (n.attributes = new E()),
                        d = l.length;
                    c._ownerElement = n;
                    for (var f = 0; f < d; f++)
                        n.setAttributeNode(ie(e, l.item(f), !0));
                    break;
                case a:
                    i = !0;
            }
            if (i)
                for (var h = t.firstChild; h; )
                    (n.appendChild(ie(e, h, i)), (h = h.nextSibling));
            return n;
        }
        function ne(e, t, i) {
            e[t] = i;
        }
        ((y.prototype = Error.prototype),
            i(Q, y),
            (M.prototype = {
                length: 0,
                item: function (e) {
                    return this[e] || null;
                },
                toString: function (e, t) {
                    for (var i = [], n = 0; n < this.length; n++)
                        ee(this[n], i, e, t);
                    return i.join('');
                },
            }),
            (A.prototype.item = function (e) {
                return (v(this), this[e]);
            }),
            n(A, M),
            (E.prototype = {
                length: 0,
                item: M.prototype.item,
                getNamedItem: function (e) {
                    for (var t = this.length; t--; ) {
                        var i = this[t];
                        if (i.nodeName == e) return i;
                    }
                },
                setNamedItem: function (e) {
                    var t = e.ownerElement;
                    if (t && t != this._ownerElement) throw new y(L);
                    var i = this.getNamedItem(e.nodeName);
                    return (O(this._ownerElement, this, e, i), i);
                },
                setNamedItemNS: function (e) {
                    var t,
                        i = e.ownerElement;
                    if (i && i != this._ownerElement) throw new y(L);
                    return (
                        (t = this.getNamedItemNS(e.namespaceURI, e.localName)),
                        O(this._ownerElement, this, e, t),
                        t
                    );
                },
                removeNamedItem: function (e) {
                    var t = this.getNamedItem(e);
                    return (S(this._ownerElement, this, t), t);
                },
                removeNamedItemNS: function (e, t) {
                    var i = this.getNamedItemNS(e, t);
                    return (S(this._ownerElement, this, i), i);
                },
                getNamedItemNS: function (e, t) {
                    for (var i = this.length; i--; ) {
                        var n = this[i];
                        if (n.localName == t && n.namespaceURI == e) return n;
                    }
                    return null;
                },
            }),
            (x.prototype = {
                hasFeature: function (e, t) {
                    var i = this._features[e.toLowerCase()];
                    return !(!i || (t && !(t in i)));
                },
                createDocument: function (e, t, i) {
                    var n = new w();
                    if (
                        ((n.implementation = this),
                        (n.childNodes = new M()),
                        (n.doctype = i),
                        i && n.appendChild(i),
                        t)
                    ) {
                        var r = n.createElementNS(e, t);
                        n.appendChild(r);
                    }
                    return n;
                },
                createDocumentType: function (e, t, i) {
                    var n = new j();
                    return (
                        (n.name = e),
                        (n.nodeName = e),
                        (n.publicId = t),
                        (n.systemId = i),
                        n
                    );
                },
            }),
            (R.prototype = {
                firstChild: null,
                lastChild: null,
                previousSibling: null,
                nextSibling: null,
                attributes: null,
                parentNode: null,
                childNodes: null,
                ownerDocument: null,
                nodeValue: null,
                namespaceURI: null,
                prefix: null,
                localName: null,
                insertBefore: function (e, t) {
                    return F(this, e, t);
                },
                replaceChild: function (e, t) {
                    (this.insertBefore(e, t), t && this.removeChild(t));
                },
                removeChild: function (e) {
                    return D(this, e);
                },
                appendChild: function (e) {
                    return this.insertBefore(e, null);
                },
                hasChildNodes: function () {
                    return null != this.firstChild;
                },
                cloneNode: function (e) {
                    return ie(this.ownerDocument || this, this, e);
                },
                normalize: function () {
                    for (var e = this.firstChild; e; ) {
                        var t = e.nextSibling;
                        t && t.nodeType == s && e.nodeType == s
                            ? (this.removeChild(t), e.appendData(t.data))
                            : (e.normalize(), (e = t));
                    }
                },
                isSupported: function (e, t) {
                    return this.ownerDocument.implementation.hasFeature(e, t);
                },
                hasAttributes: function () {
                    return this.attributes.length > 0;
                },
                lookupPrefix: function (e) {
                    for (var t = this; t; ) {
                        var i = t._nsMap;
                        if (i) for (var n in i) if (i[n] == e) return n;
                        t = t.nodeType == a ? t.ownerDocument : t.parentNode;
                    }
                    return null;
                },
                lookupNamespaceURI: function (e) {
                    for (var t = this; t; ) {
                        var i = t._nsMap;
                        if (i && e in i) return i[e];
                        t = t.nodeType == a ? t.ownerDocument : t.parentNode;
                    }
                    return null;
                },
                isDefaultNamespace: function (e) {
                    return null == this.lookupPrefix(e);
                },
            }),
            i(r, R),
            i(r, R.prototype),
            (w.prototype = {
                nodeName: '#document',
                nodeType: p,
                doctype: null,
                documentElement: null,
                _inc: 1,
                insertBefore: function (e, t) {
                    if (e.nodeType == u) {
                        for (var i = e.firstChild; i; ) {
                            var n = i.nextSibling;
                            (this.insertBefore(i, t), (i = n));
                        }
                        return e;
                    }
                    return (
                        null == this.documentElement &&
                            e.nodeType == o &&
                            (this.documentElement = e),
                        F(this, e, t),
                        (e.ownerDocument = this),
                        e
                    );
                },
                removeChild: function (e) {
                    return (
                        this.documentElement == e &&
                            (this.documentElement = null),
                        D(this, e)
                    );
                },
                importNode: function (e, t) {
                    return te(this, e, t);
                },
                getElementById: function (e) {
                    var t = null;
                    return (
                        N(this.documentElement, function (i) {
                            if (i.nodeType == o && i.getAttribute('id') == e)
                                return ((t = i), !0);
                        }),
                        t
                    );
                },
                createElement: function (e) {
                    var t = new k();
                    return (
                        (t.ownerDocument = this),
                        (t.nodeName = e),
                        (t.tagName = e),
                        (t.childNodes = new M()),
                        ((t.attributes = new E())._ownerElement = t),
                        t
                    );
                },
                createDocumentFragment: function () {
                    var e = new K();
                    return (
                        (e.ownerDocument = this),
                        (e.childNodes = new M()),
                        e
                    );
                },
                createTextNode: function (e) {
                    var t = new Y();
                    return ((t.ownerDocument = this), t.appendData(e), t);
                },
                createComment: function (e) {
                    var t = new G();
                    return ((t.ownerDocument = this), t.appendData(e), t);
                },
                createCDATASection: function (e) {
                    var t = new U();
                    return ((t.ownerDocument = this), t.appendData(e), t);
                },
                createProcessingInstruction: function (e, t) {
                    var i = new Z();
                    return (
                        (i.ownerDocument = this),
                        (i.tagName = i.target = e),
                        (i.nodeValue = i.data = t),
                        i
                    );
                },
                createAttribute: function (e) {
                    var t = new B();
                    return (
                        (t.ownerDocument = this),
                        (t.name = e),
                        (t.nodeName = e),
                        (t.localName = e),
                        (t.specified = !0),
                        t
                    );
                },
                createEntityReference: function (e) {
                    var t = new W();
                    return ((t.ownerDocument = this), (t.nodeName = e), t);
                },
                createElementNS: function (e, t) {
                    var i = new k(),
                        n = t.split(':'),
                        r = (i.attributes = new E());
                    return (
                        (i.childNodes = new M()),
                        (i.ownerDocument = this),
                        (i.nodeName = t),
                        (i.tagName = t),
                        (i.namespaceURI = e),
                        2 == n.length
                            ? ((i.prefix = n[0]), (i.localName = n[1]))
                            : (i.localName = t),
                        (r._ownerElement = i),
                        i
                    );
                },
                createAttributeNS: function (e, t) {
                    var i = new B(),
                        n = t.split(':');
                    return (
                        (i.ownerDocument = this),
                        (i.nodeName = t),
                        (i.name = t),
                        (i.namespaceURI = e),
                        (i.specified = !0),
                        2 == n.length
                            ? ((i.prefix = n[0]), (i.localName = n[1]))
                            : (i.localName = t),
                        i
                    );
                },
            }),
            n(w, R),
            (k.prototype = {
                nodeType: o,
                hasAttribute: function (e) {
                    return null != this.getAttributeNode(e);
                },
                getAttribute: function (e) {
                    var t = this.getAttributeNode(e);
                    return (t && t.value) || '';
                },
                getAttributeNode: function (e) {
                    return this.attributes.getNamedItem(e);
                },
                setAttribute: function (e, t) {
                    var i = this.ownerDocument.createAttribute(e);
                    ((i.value = i.nodeValue = '' + t),
                        this.setAttributeNode(i));
                },
                removeAttribute: function (e) {
                    var t = this.getAttributeNode(e);
                    t && this.removeAttributeNode(t);
                },
                appendChild: function (e) {
                    return e.nodeType === u
                        ? this.insertBefore(e, null)
                        : (function (e, t) {
                              var i = t.parentNode;
                              if (i) {
                                  var n = e.lastChild;
                                  (i.removeChild(t), (n = e.lastChild));
                              }
                              return (
                                  (n = e.lastChild),
                                  (t.parentNode = e),
                                  (t.previousSibling = n),
                                  (t.nextSibling = null),
                                  n ? (n.nextSibling = t) : (e.firstChild = t),
                                  (e.lastChild = t),
                                  H(e.ownerDocument, e, t),
                                  t
                              );
                          })(this, e);
                },
                setAttributeNode: function (e) {
                    return this.attributes.setNamedItem(e);
                },
                setAttributeNodeNS: function (e) {
                    return this.attributes.setNamedItemNS(e);
                },
                removeAttributeNode: function (e) {
                    return this.attributes.removeNamedItem(e.nodeName);
                },
                removeAttributeNS: function (e, t) {
                    var i = this.getAttributeNodeNS(e, t);
                    i && this.removeAttributeNode(i);
                },
                hasAttributeNS: function (e, t) {
                    return null != this.getAttributeNodeNS(e, t);
                },
                getAttributeNS: function (e, t) {
                    var i = this.getAttributeNodeNS(e, t);
                    return (i && i.value) || '';
                },
                setAttributeNS: function (e, t, i) {
                    var n = this.ownerDocument.createAttributeNS(e, t);
                    ((n.value = n.nodeValue = '' + i),
                        this.setAttributeNode(n));
                },
                getAttributeNodeNS: function (e, t) {
                    return this.attributes.getNamedItemNS(e, t);
                },
                getElementsByTagName: function (e) {
                    return new A(this, function (t) {
                        var i = [];
                        return (
                            N(t, function (n) {
                                n === t ||
                                    n.nodeType != o ||
                                    ('*' !== e && n.tagName != e) ||
                                    i.push(n);
                            }),
                            i
                        );
                    });
                },
                getElementsByTagNameNS: function (e, t) {
                    return new A(this, function (i) {
                        var n = [];
                        return (
                            N(i, function (r) {
                                r === i ||
                                    r.nodeType !== o ||
                                    ('*' !== e && r.namespaceURI !== e) ||
                                    ('*' !== t && r.localName != t) ||
                                    n.push(r);
                            }),
                            n
                        );
                    });
                },
            }),
            (w.prototype.getElementsByTagName =
                k.prototype.getElementsByTagName),
            (w.prototype.getElementsByTagNameNS =
                k.prototype.getElementsByTagNameNS),
            n(k, R),
            (B.prototype.nodeType = a),
            n(B, R),
            (V.prototype = {
                data: '',
                substringData: function (e, t) {
                    return this.data.substring(e, e + t);
                },
                appendData: function (e) {
                    ((e = this.data + e),
                        (this.nodeValue = this.data = e),
                        (this.length = e.length));
                },
                insertData: function (e, t) {
                    this.replaceData(e, 0, t);
                },
                appendChild: function (e) {
                    throw new Error(m[b]);
                },
                deleteData: function (e, t) {
                    this.replaceData(e, t, '');
                },
                replaceData: function (e, t, i) {
                    ((i =
                        this.data.substring(0, e) +
                        i +
                        this.data.substring(e + t)),
                        (this.nodeValue = this.data = i),
                        (this.length = i.length));
                },
            }),
            n(V, R),
            (Y.prototype = {
                nodeName: '#text',
                nodeType: s,
                splitText: function (e) {
                    var t = this.data,
                        i = t.substring(e);
                    ((t = t.substring(0, e)),
                        (this.data = this.nodeValue = t),
                        (this.length = t.length));
                    var n = this.ownerDocument.createTextNode(i);
                    return (
                        this.parentNode &&
                            this.parentNode.insertBefore(n, this.nextSibling),
                        n
                    );
                },
            }),
            n(Y, V),
            (G.prototype = { nodeName: '#comment', nodeType: h }),
            n(G, V),
            (U.prototype = { nodeName: '#cdata-section', nodeType: l }),
            n(U, V),
            (j.prototype.nodeType = T),
            n(j, R),
            ($.prototype.nodeType = g),
            n($, R),
            (z.prototype.nodeType = d),
            n(z, R),
            (W.prototype.nodeType = c),
            n(W, R),
            (K.prototype.nodeName = '#document-fragment'),
            (K.prototype.nodeType = u),
            n(K, R),
            (Z.prototype.nodeType = f),
            n(Z, R),
            (J.prototype.serializeToString = function (e, t, i) {
                return X.call(e, t, i);
            }),
            (R.prototype.toString = X));
        try {
            if (Object.defineProperty) {
                function re(e) {
                    switch (e.nodeType) {
                        case o:
                        case u:
                            var t = [];
                            for (e = e.firstChild; e; )
                                (7 !== e.nodeType &&
                                    8 !== e.nodeType &&
                                    t.push(re(e)),
                                    (e = e.nextSibling));
                            return t.join('');
                        default:
                            return e.nodeValue;
                    }
                }
                (Object.defineProperty(A.prototype, 'length', {
                    get: function () {
                        return (v(this), this.$$length);
                    },
                }),
                    Object.defineProperty(R.prototype, 'textContent', {
                        get: function () {
                            return re(this);
                        },
                        set: function (e) {
                            switch (this.nodeType) {
                                case o:
                                case u:
                                    for (; this.firstChild; )
                                        this.removeChild(this.firstChild);
                                    (e || String(e)) &&
                                        this.appendChild(
                                            this.ownerDocument.createTextNode(e)
                                        );
                                    break;
                                default:
                                    ((this.data = e),
                                        (this.value = e),
                                        (this.nodeValue = e));
                            }
                        },
                    }),
                    (ne = function (e, t, i) {
                        e['$$' + t] = i;
                    }));
            }
        } catch (oe) {}
        ((t.DOMImplementation = x), (t.XMLSerializer = J));
    },
};
