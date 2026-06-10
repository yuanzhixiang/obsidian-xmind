export default [
    function (
        module,
        __nested_webpack_exports__,
        __nested_webpack_require_1748108__
    ) {
        'use strict';
        var sb_common_constants__WEBPACK_IMPORTED_MODULE_0__ =
            __nested_webpack_require_1748108__(0);
        const SVG = function (e) {
            if (SVG.supported)
                return ((e = new SVG.Doc(e)), SVG.parser || SVG.prepare(e), e);
        };
        if (
            ((SVG.ns = 'http://www.w3.org/2000/svg'),
            (SVG.xmlns = 'http://www.w3.org/2000/xmlns/'),
            (SVG.xlink = 'http://www.w3.org/1999/xlink'),
            (SVG.version = '1.1'),
            (SVG.did = 1e3),
            (SVG.eid = function (e) {
                return (
                    sb_common_constants__WEBPACK_IMPORTED_MODULE_0__.SB_DOM_ID_PREFIX +
                    e.charAt(0).toUpperCase() +
                    e.slice(1) +
                    SVG.did++
                );
            }),
            (SVG.create = function (e) {
                var t = document.createElementNS(this.ns, e);
                return (t.setAttribute('id', this.eid(e)), t);
            }),
            (SVG.extend = function () {
                var e, t, i, n;
                for (
                    t = (e = [].slice.call(arguments)).pop(), n = e.length - 1;
                    n >= 0;
                    n--
                )
                    if (e[n]) for (i in t) e[n].prototype[i] = t[i];
                SVG.Set && SVG.Set.inherit && SVG.Set.inherit();
            }),
            (SVG.prepare = function (e) {
                var t = document.getElementsByTagName('body')[0],
                    i = (t ? new SVG.Doc(t) : e.nested()).size(2, 0),
                    n = SVG.create('path');
                (i.node.appendChild(n),
                    (SVG.parser = {
                        body: t || e.parent,
                        draw: i.style(
                            'opacity:0;position:fixed;left:100%;top:100%;overflow:hidden'
                        ),
                        poly: i.polyline().node,
                        path: n,
                    }));
            }),
            (SVG.supported =
                !!document.createElementNS &&
                !!document.createElementNS(SVG.ns, 'svg').createSVGRect),
            !SVG.supported)
        )
            throw new Error('Unsupport svg.');
        ((SVG.get = function (e) {
            var t = document.getElementById(idFromReference(e) || e);
            if (t) return t.instance;
        }),
            (SVG.invent = function (e) {
                var t =
                    'function' == typeof e.create
                        ? e.create
                        : function () {
                              this.constructor.call(this, SVG.create(e.create));
                          };
                return (
                    e.inherit && (t.prototype = new e.inherit()),
                    e.extend && SVG.extend(t, e.extend),
                    e.construct &&
                        SVG.extend(e.parent || SVG.Container, e.construct),
                    t
                );
            }),
            (SVG.regex = {
                unit: /^(-?[\d\.]+)([a-z%]{0,2})$/,
                hex: /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,
                rgb: /rgb\((\d+),(\d+),(\d+)\)/,
                reference: /#([a-z0-9\-_]+)/i,
                isHex: /^#[a-f0-9]{3,6}$/i,
                isRgb: /^rgb\(/,
                isCss: /[^:]+:[^;]+;?/,
                isBlank: /^(\s+)?$/,
                isNumber: /^-?[\d\.]+$/,
                isPercent: /^-?[\d\.]+%$/,
                isImage: /\.(jpg|jpeg|png|gif)(\?[^=]+.*)?/i,
                isEvent: /^[\w]+:[\w]+$/,
            }),
            (SVG.defaults = {
                matrix: '1 0 0 1 0 0',
                attrs: {
                    'fill-opacity': 1,
                    'stroke-opacity': 1,
                    'stroke-width': 0,
                    'stroke-linejoin': 'miter',
                    'stroke-linecap': 'butt',
                    fill: '#000000',
                    stroke: '#000000',
                    opacity: 1,
                    x: 0,
                    y: 0,
                    cx: 0,
                    cy: 0,
                    width: 0,
                    height: 0,
                    r: 0,
                    rx: 0,
                    ry: 0,
                    offset: 0,
                    'stop-opacity': 1,
                    'stop-color': '#000000',
                    'font-size': 16,
                    'font-family': 'Helvetica, Arial, sans-serif',
                    'text-anchor': 'start',
                },
                trans: function () {
                    return {
                        x: 0,
                        y: 0,
                        scaleX: 1,
                        scaleY: 1,
                        rotation: 0,
                        skewX: 0,
                        skewY: 0,
                        matrix: this.matrix,
                        a: 1,
                        b: 0,
                        c: 0,
                        d: 1,
                        e: 0,
                        f: 0,
                    };
                },
            }),
            (SVG.Color = function (e) {
                var t;
                ((this.r = 0),
                    (this.g = 0),
                    (this.b = 0),
                    'string' == typeof e
                        ? SVG.regex.isRgb.test(e)
                            ? ((t = SVG.regex.rgb.exec(e.replace(/\s/g, ''))),
                              (this.r = parseInt(t[1])),
                              (this.g = parseInt(t[2])),
                              (this.b = parseInt(t[3])))
                            : SVG.regex.isHex.test(e) &&
                              ((t = SVG.regex.hex.exec(fullHex(e))),
                              (this.r = parseInt(t[1], 16)),
                              (this.g = parseInt(t[2], 16)),
                              (this.b = parseInt(t[3], 16)))
                        : 'object' == typeof e &&
                          ((this.r = e.r), (this.g = e.g), (this.b = e.b)));
            }),
            SVG.extend(SVG.Color, {
                toString: function () {
                    return this.toHex();
                },
                toHex: function () {
                    return (
                        '#' +
                        compToHex(this.r) +
                        compToHex(this.g) +
                        compToHex(this.b)
                    );
                },
                toRgb: function () {
                    return 'rgb(' + [this.r, this.g, this.b].join() + ')';
                },
                brightness: function () {
                    return (
                        (this.r / 255) * 0.3 +
                        (this.g / 255) * 0.59 +
                        (this.b / 255) * 0.11
                    );
                },
                morph: function (e) {
                    return ((this.destination = new SVG.Color(e)), this);
                },
                at: function (e) {
                    return this.destination
                        ? ((e = e < 0 ? 0 : e > 1 ? 1 : e),
                          new SVG.Color({
                              r: ~~(this.r + (this.destination.r - this.r) * e),
                              g: ~~(this.g + (this.destination.g - this.g) * e),
                              b: ~~(this.b + (this.destination.b - this.b) * e),
                          }))
                        : this;
                },
            }),
            (SVG.Color.test = function (e) {
                return (
                    (e += ''),
                    SVG.regex.isHex.test(e) || SVG.regex.isRgb.test(e)
                );
            }),
            (SVG.Color.isRgb = function (e) {
                return (
                    e &&
                    'number' == typeof e.r &&
                    'number' == typeof e.g &&
                    'number' == typeof e.b
                );
            }),
            (SVG.Color.isColor = function (e) {
                return SVG.Color.isRgb(e) || SVG.Color.test(e);
            }),
            (SVG.Array = function (e, t) {
                (0 == (e = (e || []).valueOf()).length &&
                    t &&
                    (e = t.valueOf()),
                    (this.value = this.parse(e)));
            }),
            SVG.extend(SVG.Array, {
                morph: function (e) {
                    if (
                        ((this.destination = this.parse(e)),
                        this.value.length != this.destination.length)
                    ) {
                        for (
                            var t = this.value[this.value.length - 1],
                                i =
                                    this.destination[
                                        this.destination.length - 1
                                    ];
                            this.value.length > this.destination.length;
                        )
                            this.destination.push(i);
                        for (; this.value.length < this.destination.length; )
                            this.value.push(t);
                    }
                    return this;
                },
                settle: function () {
                    for (var e = 0, t = this.value.length, i = []; e < t; e++)
                        -1 == i.indexOf(this.value[e]) && i.push(this.value[e]);
                    return (this.value = i);
                },
                at: function (e) {
                    if (!this.destination) return this;
                    for (var t = 0, i = this.value.length, n = []; t < i; t++)
                        n.push(
                            this.value[t] +
                                (this.destination[t] - this.value[t]) * e
                        );
                    return new SVG.Array(n);
                },
                toString: function () {
                    return this.value.join(' ');
                },
                valueOf: function () {
                    return this.value;
                },
                parse: function (e) {
                    return (
                        (e = e.valueOf()),
                        Array.isArray(e) ? e : this.split(e)
                    );
                },
                split: function (e) {
                    return e
                        .replace(/\s+/g, ' ')
                        .replace(/^\s+|\s+$/g, '')
                        .split(' ');
                },
                reverse: function () {
                    return (this.value.reverse(), this);
                },
            }),
            (SVG.PointArray = function () {
                this.constructor.apply(this, arguments);
            }),
            (SVG.PointArray.prototype = new SVG.Array()),
            SVG.extend(SVG.PointArray, {
                toString: function () {
                    for (var e = 0, t = this.value.length, i = []; e < t; e++)
                        i.push(this.value[e].join(','));
                    return i.join(' ');
                },
                at: function (e) {
                    if (!this.destination) return this;
                    for (var t = 0, i = this.value.length, n = []; t < i; t++)
                        n.push([
                            this.value[t][0] +
                                (this.destination[t][0] - this.value[t][0]) * e,
                            this.value[t][1] +
                                (this.destination[t][1] - this.value[t][1]) * e,
                        ]);
                    return new SVG.PointArray(n);
                },
                parse: function (e) {
                    if (((e = e.valueOf()), Array.isArray(e))) return e;
                    for (
                        var t, i = 0, n = (e = this.split(e)).length, r = [];
                        i < n;
                        i++
                    )
                        ((t = e[i].split(',')),
                            r.push([parseFloat(t[0]), parseFloat(t[1])]));
                    return r;
                },
                move: function (e, t) {
                    var i = this.bbox();
                    if (((e -= i.x), (t -= i.y), !isNaN(e) && !isNaN(t)))
                        for (var n = this.value.length - 1; n >= 0; n--)
                            this.value[n] = [
                                this.value[n][0] + e,
                                this.value[n][1] + t,
                            ];
                    return this;
                },
                size: function (e, t) {
                    var i,
                        n = this.bbox();
                    for (i = this.value.length - 1; i >= 0; i--)
                        ((this.value[i][0] =
                            ((this.value[i][0] - n.x) * e) / n.width + n.x),
                            (this.value[i][1] =
                                ((this.value[i][1] - n.y) * t) / n.height +
                                n.y));
                    return this;
                },
                bbox: function () {
                    return (
                        SVG.parser.poly.setAttribute('points', this.toString()),
                        SVG.parser.poly.getBBox()
                    );
                },
            }),
            (SVG.PathArray = function (e, t) {
                this.constructor.call(this, e, t);
            }),
            (SVG.PathArray.prototype = new SVG.Array()),
            SVG.extend(SVG.PathArray, {
                toString: function () {
                    return arrayToString(this.value);
                },
                move: function (e, t) {
                    var i = this.bbox();
                    if (((e -= i.x), (t -= i.y), !isNaN(e) && !isNaN(t)))
                        for (var n, r = this.value.length - 1; r >= 0; r--)
                            'M' == (n = this.value[r][0]) ||
                            'L' == n ||
                            'T' == n
                                ? ((this.value[r][1] += e),
                                  (this.value[r][2] += t))
                                : 'H' == n
                                  ? (this.value[r][1] += e)
                                  : 'V' == n
                                    ? (this.value[r][1] += t)
                                    : 'C' == n || 'S' == n || 'Q' == n
                                      ? ((this.value[r][1] += e),
                                        (this.value[r][2] += t),
                                        (this.value[r][3] += e),
                                        (this.value[r][4] += t),
                                        'C' == n &&
                                            ((this.value[r][5] += e),
                                            (this.value[r][6] += t)))
                                      : 'A' == n &&
                                        ((this.value[r][6] += e),
                                        (this.value[r][7] += t));
                    return this;
                },
                size: function (e, t) {
                    var i,
                        n,
                        r = this.bbox();
                    for (i = this.value.length - 1; i >= 0; i--)
                        'M' == (n = this.value[i][0]) || 'L' == n || 'T' == n
                            ? ((this.value[i][1] =
                                  ((this.value[i][1] - r.x) * e) / r.width +
                                  r.x),
                              (this.value[i][2] =
                                  ((this.value[i][2] - r.y) * t) / r.height +
                                  r.y))
                            : 'H' == n
                              ? (this.value[i][1] =
                                    ((this.value[i][1] - r.x) * e) / r.width +
                                    r.x)
                              : 'V' == n
                                ? (this.value[i][1] =
                                      ((this.value[i][1] - r.y) * t) /
                                          r.height +
                                      r.y)
                                : 'C' == n || 'S' == n || 'Q' == n
                                  ? ((this.value[i][1] =
                                        ((this.value[i][1] - r.x) * e) /
                                            r.width +
                                        r.x),
                                    (this.value[i][2] =
                                        ((this.value[i][2] - r.y) * t) /
                                            r.height +
                                        r.y),
                                    (this.value[i][3] =
                                        ((this.value[i][3] - r.x) * e) /
                                            r.width +
                                        r.x),
                                    (this.value[i][4] =
                                        ((this.value[i][4] - r.y) * t) /
                                            r.height +
                                        r.y),
                                    'C' == n &&
                                        ((this.value[i][5] =
                                            ((this.value[i][5] - r.x) * e) /
                                                r.width +
                                            r.x),
                                        (this.value[i][6] =
                                            ((this.value[i][6] - r.y) * t) /
                                                r.height +
                                            r.y)))
                                  : 'A' == n &&
                                    ((this.value[i][1] =
                                        (this.value[i][1] * e) / r.width),
                                    (this.value[i][2] =
                                        (this.value[i][2] * t) / r.height),
                                    (this.value[i][6] =
                                        ((this.value[i][6] - r.x) * e) /
                                            r.width +
                                        r.x),
                                    (this.value[i][7] =
                                        ((this.value[i][7] - r.y) * t) /
                                            r.height +
                                        r.y));
                    return this;
                },
                parse: function (e) {
                    if (e instanceof SVG.PathArray) return e.valueOf();
                    var t,
                        i,
                        n,
                        r,
                        o,
                        a,
                        s,
                        l,
                        c,
                        d,
                        f,
                        h = 0,
                        p = 0;
                    for (
                        SVG.parser.path.setAttribute(
                            'd',
                            'string' == typeof e ? e : arrayToString(e)
                        ),
                            t = 0,
                            i = (f = SVG.parser.path.pathSegList).numberOfItems;
                        t < i;
                        ++t
                    )
                        ('M' == (c = (d = f.getItem(t)).pathSegTypeAsLetter) ||
                        'L' == c ||
                        'H' == c ||
                        'V' == c ||
                        'C' == c ||
                        'S' == c ||
                        'Q' == c ||
                        'T' == c ||
                        'A' == c
                            ? ('x' in d && (h = d.x), 'y' in d && (p = d.y))
                            : ('x1' in d && (o = h + d.x1),
                              'x2' in d && (s = h + d.x2),
                              'y1' in d && (a = p + d.y1),
                              'y2' in d && (l = p + d.y2),
                              'x' in d && (h += d.x),
                              'y' in d && (p += d.y),
                              'm' == c
                                  ? f.replaceItem(
                                        SVG.parser.path.createSVGPathSegMovetoAbs(
                                            h,
                                            p
                                        ),
                                        t
                                    )
                                  : 'l' == c
                                    ? f.replaceItem(
                                          SVG.parser.path.createSVGPathSegLinetoAbs(
                                              h,
                                              p
                                          ),
                                          t
                                      )
                                    : 'h' == c
                                      ? f.replaceItem(
                                            SVG.parser.path.createSVGPathSegLinetoHorizontalAbs(
                                                h
                                            ),
                                            t
                                        )
                                      : 'v' == c
                                        ? f.replaceItem(
                                              SVG.parser.path.createSVGPathSegLinetoVerticalAbs(
                                                  p
                                              ),
                                              t
                                          )
                                        : 'c' == c
                                          ? f.replaceItem(
                                                SVG.parser.path.createSVGPathSegCurvetoCubicAbs(
                                                    h,
                                                    p,
                                                    o,
                                                    a,
                                                    s,
                                                    l
                                                ),
                                                t
                                            )
                                          : 's' == c
                                            ? f.replaceItem(
                                                  SVG.parser.path.createSVGPathSegCurvetoCubicSmoothAbs(
                                                      h,
                                                      p,
                                                      s,
                                                      l
                                                  ),
                                                  t
                                              )
                                            : 'q' == c
                                              ? f.replaceItem(
                                                    SVG.parser.path.createSVGPathSegCurvetoQuadraticAbs(
                                                        h,
                                                        p,
                                                        o,
                                                        a
                                                    ),
                                                    t
                                                )
                                              : 't' == c
                                                ? f.replaceItem(
                                                      SVG.parser.path.createSVGPathSegCurvetoQuadraticSmoothAbs(
                                                          h,
                                                          p
                                                      ),
                                                      t
                                                  )
                                                : 'a' == c
                                                  ? f.replaceItem(
                                                        SVG.parser.path.createSVGPathSegArcAbs(
                                                            h,
                                                            p,
                                                            d.r1,
                                                            d.r2,
                                                            d.angle,
                                                            d.largeArcFlag,
                                                            d.sweepFlag
                                                        ),
                                                        t
                                                    )
                                                  : ('z' != c && 'Z' != c) ||
                                                    ((h = n), (p = r))),
                            ('M' != c && 'm' != c) || ((n = h), (r = p)));
                    for (
                        e = [],
                            t = 0,
                            i = (f = SVG.parser.path.pathSegList).numberOfItems;
                        t < i;
                        ++t
                    )
                        ((h = [(c = (d = f.getItem(t)).pathSegTypeAsLetter)]),
                            'M' == c || 'L' == c || 'T' == c
                                ? h.push(d.x, d.y)
                                : 'H' == c
                                  ? h.push(d.x)
                                  : 'V' == c
                                    ? h.push(d.y)
                                    : 'C' == c
                                      ? h.push(d.x1, d.y1, d.x2, d.y2, d.x, d.y)
                                      : 'S' == c
                                        ? h.push(d.x2, d.y2, d.x, d.y)
                                        : 'Q' == c
                                          ? h.push(d.x1, d.y1, d.x, d.y)
                                          : 'A' == c &&
                                            h.push(
                                                d.r1,
                                                d.r2,
                                                d.angle,
                                                0 | d.largeArcFlag,
                                                0 | d.sweepFlag,
                                                d.x,
                                                d.y
                                            ),
                            e.push(h));
                    return e;
                },
                bbox: function () {
                    return (
                        SVG.parser.path.setAttribute('d', this.toString()),
                        SVG.parser.path.getBBox()
                    );
                },
            }),
            (SVG.Number = function (e) {
                if (((this.value = 0), (this.unit = ''), 'number' == typeof e))
                    this.value = isNaN(e)
                        ? 0
                        : isFinite(e)
                          ? e
                          : e < 0
                            ? -34e37
                            : 34e37;
                else if ('string' == typeof e) {
                    var t = e.match(SVG.regex.unit);
                    t &&
                        ((this.value = parseFloat(t[1])),
                        '%' == t[2]
                            ? (this.value /= 100)
                            : 's' == t[2] && (this.value *= 1e3),
                        (this.unit = t[2]));
                } else
                    e instanceof SVG.Number &&
                        ((this.value = e.value), (this.unit = e.unit));
            }),
            SVG.extend(SVG.Number, {
                toString: function () {
                    return (
                        ('%' == this.unit
                            ? ~~(1e8 * this.value) / 1e6
                            : 's' == this.unit
                              ? this.value / 1e3
                              : this.value) + this.unit
                    );
                },
                valueOf: function () {
                    return this.value;
                },
                plus: function (e) {
                    return ((this.value = this + new SVG.Number(e)), this);
                },
                minus: function (e) {
                    return this.plus(-new SVG.Number(e));
                },
                times: function (e) {
                    return ((this.value = this * new SVG.Number(e)), this);
                },
                divide: function (e) {
                    return ((this.value = this / new SVG.Number(e)), this);
                },
                to: function (e) {
                    return ('string' == typeof e && (this.unit = e), this);
                },
                morph: function (e) {
                    return ((this.destination = new SVG.Number(e)), this);
                },
                at: function (e) {
                    return this.destination
                        ? new SVG.Number(this.destination)
                              .minus(this)
                              .times(e)
                              .plus(this)
                        : this;
                },
            }),
            (SVG.ViewBox = function (e) {
                var t,
                    i,
                    n,
                    r,
                    o = 1,
                    a = 1,
                    s = e.bbox(),
                    l = (e.attr('viewBox') || '').match(/-?[\d\.]+/g),
                    c = e,
                    d = e;
                for (
                    n = new SVG.Number(e.width()),
                        r = new SVG.Number(e.height());
                    '%' == n.unit;
                )
                    ((o *= n.value),
                        (n = new SVG.Number(
                            c instanceof SVG.Doc
                                ? c.parent.offsetWidth
                                : c.parent.width()
                        )),
                        (c = c.parent));
                for (; '%' == r.unit; )
                    ((a *= r.value),
                        (r = new SVG.Number(
                            d instanceof SVG.Doc
                                ? d.parent.offsetHeight
                                : d.parent.height()
                        )),
                        (d = d.parent));
                ((this.x = s.x),
                    (this.y = s.y),
                    (this.width = n * o),
                    (this.height = r * a),
                    (this.zoom = 1),
                    l &&
                        ((t = parseFloat(l[0])),
                        (i = parseFloat(l[1])),
                        (n = parseFloat(l[2])),
                        (r = parseFloat(l[3])),
                        (this.zoom =
                            this.width / this.height > n / r
                                ? this.height / r
                                : this.width / n),
                        (this.x = t),
                        (this.y = i),
                        (this.width = n),
                        (this.height = r)));
            }),
            SVG.extend(SVG.ViewBox, {
                toString: function () {
                    return (
                        this.x +
                        ' ' +
                        this.y +
                        ' ' +
                        this.width +
                        ' ' +
                        this.height
                    );
                },
            }),
            (SVG.BBox = function (e) {
                var t;
                if (
                    ((this.x = 0),
                    (this.y = 0),
                    (this.width = 0),
                    (this.height = 0),
                    e)
                ) {
                    try {
                        t = e.node.getBBox();
                    } catch (i) {
                        t = {
                            x: e.node.clientLeft,
                            y: e.node.clientTop,
                            width: e.node.clientWidth,
                            height: e.node.clientHeight,
                        };
                    }
                    ((this.x = t.x + e.trans.x),
                        (this.y = t.y + e.trans.y),
                        (this.width = t.width * e.trans.scaleX),
                        (this.height = t.height * e.trans.scaleY));
                }
                boxProperties(this);
            }),
            SVG.extend(SVG.BBox, {
                merge: function (e) {
                    var t = new SVG.BBox();
                    return (
                        (t.x = Math.min(this.x, e.x)),
                        (t.y = Math.min(this.y, e.y)),
                        (t.width =
                            Math.max(this.x + this.width, e.x + e.width) - t.x),
                        (t.height =
                            Math.max(this.y + this.height, e.y + e.height) -
                            t.y),
                        boxProperties(t),
                        t
                    );
                },
            }),
            (SVG.RBox = function (e) {
                var t,
                    i,
                    n = {};
                if (
                    ((this.x = 0),
                    (this.y = 0),
                    (this.width = 0),
                    (this.height = 0),
                    e)
                ) {
                    for (
                        t = e.doc().parent,
                            i = e.doc().viewbox().zoom,
                            n = e.node.getBoundingClientRect(),
                            this.x = n.left,
                            this.y = n.top,
                            this.x -= t.offsetLeft,
                            this.y -= t.offsetTop;
                        (t = t.offsetParent);
                    )
                        ((this.x -= t.offsetLeft), (this.y -= t.offsetTop));
                    for (t = e; (t = t.parent); )
                        'svg' == t.type &&
                            t.viewbox &&
                            ((i *= t.viewbox().zoom),
                            (this.x -= t.x() || 0),
                            (this.y -= t.y() || 0));
                }
                ((this.x /= i),
                    (this.y /= i),
                    (this.width = n.width / i),
                    (this.height = n.height / i),
                    (this.x +=
                        'number' == typeof window.scrollX
                            ? window.scrollX
                            : window.pageXOffset),
                    (this.y +=
                        'number' == typeof window.scrollY
                            ? window.scrollY
                            : window.pageYOffset),
                    boxProperties(this));
            }),
            SVG.extend(SVG.RBox, {
                merge: function (e) {
                    var t = new SVG.RBox();
                    return (
                        (t.x = Math.min(this.x, e.x)),
                        (t.y = Math.min(this.y, e.y)),
                        (t.width =
                            Math.max(this.x + this.width, e.x + e.width) - t.x),
                        (t.height =
                            Math.max(this.y + this.height, e.y + e.height) -
                            t.y),
                        boxProperties(t),
                        t
                    );
                },
            }),
            (SVG.Element = SVG.invent({
                create: function (e) {
                    ((this._stroke = SVG.defaults.attrs.stroke),
                        (this.trans = SVG.defaults.trans()),
                        (this.node = e) &&
                            ((this.type = e.nodeName),
                            (this.node.instance = this)));
                },
                extend: {
                    x: function (e) {
                        return (
                            null != e &&
                                ((e = new SVG.Number(e)).value /=
                                    this.trans.scaleX),
                            this.attr('x', e)
                        );
                    },
                    y: function (e) {
                        return (
                            null != e &&
                                ((e = new SVG.Number(e)).value /=
                                    this.trans.scaleY),
                            this.attr('y', e)
                        );
                    },
                    cx: function (e) {
                        return null == e
                            ? this.x() + this.width() / 2
                            : this.x(e - this.width() / 2);
                    },
                    cy: function (e) {
                        return null == e
                            ? this.y() + this.height() / 2
                            : this.y(e - this.height() / 2);
                    },
                    move: function (e, t) {
                        return this.x(e).y(t);
                    },
                    center: function (e, t) {
                        return this.cx(e).cy(t);
                    },
                    width: function (e) {
                        return this.attr('width', e);
                    },
                    height: function (e) {
                        return this.attr('height', e);
                    },
                    size: function (e, t) {
                        var i = { width: e, height: t };
                        return (
                            (null != e && null != t) ||
                                (i = proportionalSize(this.bbox(), e, t)),
                            this.width(new SVG.Number(i.width)).height(
                                new SVG.Number(i.height)
                            )
                        );
                    },
                    clone: function () {
                        var e,
                            t,
                            i = this.type;
                        return (
                            (e =
                                'rect' == i || 'ellipse' == i
                                    ? this.parent[i](0, 0)
                                    : 'line' == i
                                      ? this.parent[i](0, 0, 0, 0)
                                      : 'image' == i
                                        ? this.parent[i](this.src)
                                        : 'text' == i
                                          ? this.parent[i](this.content)
                                          : 'path' == i
                                            ? this.parent[i](this.attr('d'))
                                            : 'polyline' == i || 'polygon' == i
                                              ? this.parent[i](
                                                    this.attr('points')
                                                )
                                              : 'g' == i
                                                ? this.parent.group()
                                                : this.parent[i]()),
                            delete (t = this.attr()).id,
                            e.attr(t),
                            (e.trans = this.trans),
                            e.transform({})
                        );
                    },
                    remove: function () {
                        return (
                            this.parent && this.parent.removeElement(this),
                            this
                        );
                    },
                    replace: function (e) {
                        return (this.after(e).remove(), e);
                    },
                    addTo: function (e) {
                        return e.put(this);
                    },
                    putIn: function (e) {
                        return e.add(this);
                    },
                    doc: function (e) {
                        return this._parent(e || SVG.Doc);
                    },
                    attr: function (e, t, i) {
                        if (null == e) {
                            for (
                                e = {},
                                    i = (t = this.node.attributes).length - 1;
                                i >= 0;
                                i--
                            )
                                e[t[i].nodeName] = SVG.regex.isNumber.test(
                                    t[i].nodeValue
                                )
                                    ? parseFloat(t[i].nodeValue)
                                    : t[i].nodeValue;
                            return e;
                        }
                        if ('object' == typeof e)
                            for (t in e) this.attr(t, e[t]);
                        else if (null === t) this.node.removeAttribute(e);
                        else {
                            if (null == t)
                                return null == (t = this.node.attributes[e])
                                    ? SVG.defaults.attrs[e]
                                    : SVG.regex.isNumber.test(t.nodeValue)
                                      ? parseFloat(t.nodeValue)
                                      : t.nodeValue;
                            if ('style' == e) return this.style(t);
                            ('stroke-width' == e
                                ? this.attr(
                                      'stroke',
                                      parseFloat(t) > 0 ? this._stroke : null
                                  )
                                : 'stroke' == e && (this._stroke = t),
                                ('fill' != e && 'stroke' != e) ||
                                    (SVG.regex.isImage.test(t) &&
                                        (t = this.doc().defs().image(t, 0, 0)),
                                    t instanceof SVG.Image &&
                                        (t = this.doc()
                                            .defs()
                                            .pattern(0, 0, function () {
                                                this.add(t);
                                            }))),
                                'number' == typeof t
                                    ? (t = new SVG.Number(t))
                                    : SVG.Color.isColor(t)
                                      ? (t = new SVG.Color(t))
                                      : Array.isArray(t) &&
                                        (t = new SVG.Array(t)),
                                'leading' == e
                                    ? this.leading && this.leading(t)
                                    : 'string' == typeof i
                                      ? this.node.setAttributeNS(
                                            i,
                                            e,
                                            t.toString()
                                        )
                                      : this.node.setAttribute(e, t.toString()),
                                !this.rebuild ||
                                    ('font-size' != e && 'x' != e) ||
                                    this.rebuild(e, t));
                        }
                        return this;
                    },
                    transform: function (e, t) {
                        if (0 == arguments.length) return this.trans;
                        if ('string' == typeof e)
                            return arguments.length < 2
                                ? this.trans[e]
                                : (((i = {})[e] = t), this.transform(i));
                        var i = [];
                        for (t in (e = parseMatrix(e)))
                            null != e[t] && (this.trans[t] = e[t]);
                        return (
                            (this.trans.matrix =
                                this.trans.a +
                                ' ' +
                                this.trans.b +
                                ' ' +
                                this.trans.c +
                                ' ' +
                                this.trans.d +
                                ' ' +
                                this.trans.e +
                                ' ' +
                                this.trans.f),
                            (e = this.trans).matrix != SVG.defaults.matrix &&
                                i.push('matrix(' + e.matrix + ')'),
                            0 != e.rotation &&
                                i.push(
                                    'rotate(' +
                                        e.rotation +
                                        ' ' +
                                        (null == e.cx ? this.bbox().cx : e.cx) +
                                        ' ' +
                                        (null == e.cy ? this.bbox().cy : e.cy) +
                                        ')'
                                ),
                            (1 == e.scaleX && 1 == e.scaleY) ||
                                i.push(
                                    'scale(' + e.scaleX + ' ' + e.scaleY + ')'
                                ),
                            0 != e.skewX && i.push('skewX(' + e.skewX + ')'),
                            0 != e.skewY && i.push('skewY(' + e.skewY + ')'),
                            (0 == e.x && 0 == e.y) ||
                                i.push(
                                    'translate(' +
                                        new SVG.Number(e.x / e.scaleX) +
                                        ' ' +
                                        new SVG.Number(e.y / e.scaleY) +
                                        ')'
                                ),
                            0 == i.length
                                ? this.node.removeAttribute('transform')
                                : this.node.setAttribute(
                                      'transform',
                                      i.join(' ')
                                  ),
                            this
                        );
                    },
                    style: function (e, t) {
                        if (0 == arguments.length)
                            return this.node.style.cssText || '';
                        if (arguments.length < 2)
                            if ('object' == typeof e)
                                for (t in e) this.style(t, e[t]);
                            else {
                                if (!SVG.regex.isCss.test(e))
                                    return this.node.style[camelCase(e)];
                                e = e.split(';');
                                for (var i = 0; i < e.length; i++)
                                    ((t = e[i].split(':')),
                                        this.style(
                                            t[0].replace(/\s+/g, ''),
                                            t[1]
                                        ));
                            }
                        else
                            this.node.style[camelCase(e)] =
                                null === t || SVG.regex.isBlank.test(t)
                                    ? ''
                                    : t;
                        return this;
                    },
                    id: function (e) {
                        return this.attr('id', e);
                    },
                    bbox: function () {
                        return new SVG.BBox(this);
                    },
                    rbox: function () {
                        return new SVG.RBox(this);
                    },
                    inside: function (e, t) {
                        var i = this.bbox();
                        return (
                            e > i.x &&
                            t > i.y &&
                            e < i.x + i.width &&
                            t < i.y + i.height
                        );
                    },
                    show: function () {
                        return this.style('display', '');
                    },
                    hide: function () {
                        return this.style('display', 'none');
                    },
                    visible: function () {
                        return 'none' != this.style('display');
                    },
                    toString: function () {
                        return this.attr('id');
                    },
                    classes: function () {
                        var e = this.node.getAttribute('class');
                        return null === e ? [] : e.trim().split(/\s+/);
                    },
                    hasClass: function (e) {
                        return -1 != this.classes().indexOf(e);
                    },
                    addClass: function (e) {
                        var t;
                        return (
                            this.hasClass(e) ||
                                ((t = this.classes()).push(e),
                                this.node.setAttribute('class', t.join(' '))),
                            this
                        );
                    },
                    removeClass: function (e) {
                        var t;
                        return (
                            this.hasClass(e) &&
                                ((t = this.classes().filter(function (t) {
                                    return t != e;
                                })),
                                this.node.setAttribute('class', t.join(' '))),
                            this
                        );
                    },
                    toggleClass: function (e) {
                        return (
                            this.hasClass(e)
                                ? this.removeClass(e)
                                : this.addClass(e),
                            this
                        );
                    },
                    reference: function (e) {
                        return SVG.get(this.attr()[e]);
                    },
                    _parent: function (e) {
                        for (var t = this; null != t && !(t instanceof e); )
                            t = t.parent;
                        return t;
                    },
                },
            })),
            (SVG.Parent = SVG.invent({
                create: function (e) {
                    this.constructor.call(this, e);
                },
                inherit: SVG.Element,
                extend: {
                    children: function () {
                        return this._children || (this._children = []);
                    },
                    add: function (e, t) {
                        return (
                            this.has(e) ||
                                ((t = null == t ? this.children().length : t),
                                e.parent &&
                                    e.parent
                                        .children()
                                        .splice(e.parent.index(e), 1),
                                this.children().splice(t, 0, e),
                                this.node.insertBefore(
                                    e.node,
                                    this.node.childNodes[t] || null
                                ),
                                (e.parent = this)),
                            this._defs &&
                                (this.node.removeChild(this._defs.node),
                                this.node.appendChild(this._defs.node)),
                            this
                        );
                    },
                    put: function (e, t) {
                        return (this.add(e, t), e);
                    },
                    has: function (e) {
                        return this.index(e) >= 0;
                    },
                    index: function (e) {
                        return this.children().indexOf(e);
                    },
                    get: function (e) {
                        return this.children()[e];
                    },
                    first: function () {
                        return this.children()[0];
                    },
                    last: function () {
                        return this.children()[this.children().length - 1];
                    },
                    each: function (e, t) {
                        var i,
                            n,
                            r = this.children();
                        for (i = 0, n = r.length; i < n; i++)
                            (r[i] instanceof SVG.Element &&
                                e.apply(r[i], [i, r]),
                                t &&
                                    r[i] instanceof SVG.Container &&
                                    r[i].each(e, t));
                        return this;
                    },
                    removeElement: function (e) {
                        return (
                            this.children().splice(this.index(e), 1),
                            this.node.removeChild(e.node),
                            (e.parent = null),
                            this
                        );
                    },
                    clear: function () {
                        for (var e = this.children().length - 1; e >= 0; e--)
                            this.removeElement(this.children()[e]);
                        return (this._defs && this._defs.clear(), this);
                    },
                    defs: function () {
                        return this.doc().defs();
                    },
                },
            })),
            (SVG.Container = SVG.invent({
                create: function (e) {
                    this.constructor.call(this, e);
                },
                inherit: SVG.Parent,
                extend: {
                    viewbox: function (e) {
                        return 0 == arguments.length
                            ? new SVG.ViewBox(this)
                            : ((e =
                                  1 == arguments.length
                                      ? [e.x, e.y, e.width, e.height]
                                      : [].slice.call(arguments)),
                              this.attr('viewBox', e));
                    },
                },
            })),
            (SVG.FX = SVG.invent({
                create: function (e) {
                    this.target = e;
                },
                extend: {
                    animate: function (e, t, i) {
                        var n,
                            r,
                            o,
                            a,
                            s = this.target,
                            l = this;
                        return (
                            'object' == typeof e &&
                                ((i = e.delay), (t = e.ease), (e = e.duration)),
                            (e =
                                '=' == e
                                    ? e
                                    : null == e
                                      ? 1e3
                                      : new SVG.Number(e).valueOf()),
                            (t = t || '<>'),
                            (l.to = function (e) {
                                var i;
                                if (
                                    ((e = e < 0 ? 0 : e > 1 ? 1 : e), null == n)
                                ) {
                                    for (a in ((n = []), l.attrs)) n.push(a);
                                    if (
                                        s.morphArray &&
                                        (l._plot || n.indexOf('points') > -1)
                                    ) {
                                        var c,
                                            d = new s.morphArray(
                                                l._plot ||
                                                    l.attrs.points ||
                                                    s.array
                                            );
                                        (l._size &&
                                            d.size(
                                                l._size.width.to,
                                                l._size.height.to
                                            ),
                                            (c = d.bbox()),
                                            l._x
                                                ? d.move(l._x.to, c.y)
                                                : l._cx &&
                                                  d.move(
                                                      l._cx.to - c.width / 2,
                                                      c.y
                                                  ),
                                            (c = d.bbox()),
                                            l._y
                                                ? d.move(c.x, l._y.to)
                                                : l._cy &&
                                                  d.move(
                                                      c.x,
                                                      l._cy.to - c.height / 2
                                                  ),
                                            delete l._x,
                                            delete l._y,
                                            delete l._cx,
                                            delete l._cy,
                                            delete l._size,
                                            (l._plot = s.array.morph(d)));
                                    }
                                }
                                if (null == r)
                                    for (a in ((r = []), l.trans)) r.push(a);
                                if (null == o)
                                    for (a in ((o = []), l.styles)) o.push(a);
                                for (
                                    e =
                                        '<>' == t
                                            ? -Math.cos(e * Math.PI) / 2 + 0.5
                                            : '>' == t
                                              ? Math.sin((e * Math.PI) / 2)
                                              : '<' == t
                                                ? 1 -
                                                  Math.cos((e * Math.PI) / 2)
                                                : '-' == t
                                                  ? e
                                                  : 'function' == typeof t
                                                    ? t(e)
                                                    : e,
                                        l._plot
                                            ? s.plot(l._plot.at(e))
                                            : (l._x
                                                  ? s.x(l._x.at(e))
                                                  : l._cx && s.cx(l._cx.at(e)),
                                              l._y
                                                  ? s.y(l._y.at(e))
                                                  : l._cy && s.cy(l._cy.at(e)),
                                              l._size &&
                                                  s.size(
                                                      l._size.width.at(e),
                                                      l._size.height.at(e)
                                                  )),
                                        l._viewbox &&
                                            s.viewbox(
                                                l._viewbox.x.at(e),
                                                l._viewbox.y.at(e),
                                                l._viewbox.width.at(e),
                                                l._viewbox.height.at(e)
                                            ),
                                        l._leading &&
                                            s.leading(l._leading.at(e)),
                                        i = n.length - 1;
                                    i >= 0;
                                    i--
                                )
                                    s.attr(n[i], at(l.attrs[n[i]], e));
                                for (i = r.length - 1; i >= 0; i--)
                                    s.transform(r[i], at(l.trans[r[i]], e));
                                for (i = o.length - 1; i >= 0; i--)
                                    s.style(o[i], at(l.styles[o[i]], e));
                                l._during &&
                                    l._during.call(s, e, function (t, i) {
                                        return at({ from: t, to: i }, e);
                                    });
                            }),
                            'number' == typeof e &&
                                (this.timeout = svgSetTimeout(function () {
                                    var n = new Date().getTime();
                                    ((l.situation = {
                                        interval: 1e3 / 60,
                                        start: n,
                                        play: !0,
                                        finish: n + e,
                                        duration: e,
                                    }),
                                        (l.render = function () {
                                            if (!0 === l.situation.play) {
                                                var n = new Date().getTime(),
                                                    r =
                                                        n > l.situation.finish
                                                            ? 1
                                                            : (n -
                                                                  l.situation
                                                                      .start) /
                                                              e;
                                                (l.to(r),
                                                    n > l.situation.finish
                                                        ? (l._plot &&
                                                              s.plot(
                                                                  new SVG.PointArray(
                                                                      l._plot
                                                                          .destination
                                                                  ).settle()
                                                              ),
                                                          !0 === l._loop ||
                                                          ('number' ==
                                                              typeof l._loop &&
                                                              l._loop > 1)
                                                              ? ('number' ==
                                                                    typeof l._loop &&
                                                                    --l._loop,
                                                                l.animate(
                                                                    e,
                                                                    t,
                                                                    i
                                                                ))
                                                              : l._after
                                                                ? l._after.apply(
                                                                      s,
                                                                      [l]
                                                                  )
                                                                : l.stop())
                                                        : requestAnimationFrame(
                                                              l.render
                                                          ));
                                            }
                                        }),
                                        l.render());
                                }, new SVG.Number(i).valueOf())),
                            this
                        );
                    },
                    bbox: function () {
                        return this.target.bbox();
                    },
                    attr: function (e, t) {
                        if ('object' == typeof e)
                            for (var i in e) this.attr(i, e[i]);
                        else {
                            var n = this.target.attr(e);
                            this.attrs[e] = SVG.Color.isColor(n)
                                ? new SVG.Color(n).morph(t)
                                : SVG.regex.unit.test(n)
                                  ? new SVG.Number(n).morph(t)
                                  : { from: n, to: t };
                        }
                        return this;
                    },
                    transform: function (e, t) {
                        if (1 == arguments.length)
                            for (t in (delete (e = parseMatrix(e)).matrix, e))
                                this.trans[t] = {
                                    from: this.target.trans[t],
                                    to: e[t],
                                };
                        else {
                            var i = {};
                            ((i[e] = t), this.transform(i));
                        }
                        return this;
                    },
                    style: function (e, t) {
                        if ('object' == typeof e)
                            for (var i in e) this.style(i, e[i]);
                        else
                            this.styles[e] = {
                                from: this.target.style(e),
                                to: t,
                            };
                        return this;
                    },
                    x: function (e) {
                        return (
                            (this._x = new SVG.Number(this.target.x()).morph(
                                e
                            )),
                            this
                        );
                    },
                    y: function (e) {
                        return (
                            (this._y = new SVG.Number(this.target.y()).morph(
                                e
                            )),
                            this
                        );
                    },
                    cx: function (e) {
                        return (
                            (this._cx = new SVG.Number(this.target.cx()).morph(
                                e
                            )),
                            this
                        );
                    },
                    cy: function (e) {
                        return (
                            (this._cy = new SVG.Number(this.target.cy()).morph(
                                e
                            )),
                            this
                        );
                    },
                    move: function (e, t) {
                        return this.x(e).y(t);
                    },
                    center: function (e, t) {
                        return this.cx(e).cy(t);
                    },
                    size: function (e, t) {
                        if (this.target instanceof SVG.Text)
                            this.attr('font-size', e);
                        else {
                            var i = this.target.bbox();
                            this._size = {
                                width: new SVG.Number(i.width).morph(e),
                                height: new SVG.Number(i.height).morph(t),
                            };
                        }
                        return this;
                    },
                    plot: function (e) {
                        return ((this._plot = e), this);
                    },
                    leading: function (e) {
                        return (
                            this.target._leading &&
                                (this._leading = new SVG.Number(
                                    this.target._leading
                                ).morph(e)),
                            this
                        );
                    },
                    viewbox: function (e, t, i, n) {
                        if (this.target instanceof SVG.Container) {
                            var r = this.target.viewbox();
                            this._viewbox = {
                                x: new SVG.Number(r.x).morph(e),
                                y: new SVG.Number(r.y).morph(t),
                                width: new SVG.Number(r.width).morph(i),
                                height: new SVG.Number(r.height).morph(n),
                            };
                        }
                        return this;
                    },
                    update: function (e) {
                        return (
                            this.target instanceof SVG.Stop &&
                                (null != e.opacity &&
                                    this.attr('stop-opacity', e.opacity),
                                null != e.color &&
                                    this.attr('stop-color', e.color),
                                null != e.offset &&
                                    this.attr(
                                        'offset',
                                        new SVG.Number(e.offset)
                                    )),
                            this
                        );
                    },
                    during: function (e) {
                        return ((this._during = e), this);
                    },
                    after: function (e) {
                        return ((this._after = e), this);
                    },
                    loop: function (e) {
                        return ((this._loop = e || !0), this);
                    },
                    stop: function (e) {
                        return (
                            !0 === e
                                ? (this.animate(0),
                                  this._after &&
                                      this._after.apply(this.target, [this]))
                                : (svgClearTimeout(this.timeout),
                                  (this.attrs = {}),
                                  (this.trans = {}),
                                  (this.styles = {}),
                                  (this.situation = {}),
                                  delete this._x,
                                  delete this._y,
                                  delete this._cx,
                                  delete this._cy,
                                  delete this._size,
                                  delete this._plot,
                                  delete this._loop,
                                  delete this._after,
                                  delete this._during,
                                  delete this._leading,
                                  delete this._viewbox),
                            this
                        );
                    },
                    pause: function () {
                        return (
                            !0 === this.situation.play &&
                                ((this.situation.play = !1),
                                (this.situation.pause = new Date().getTime())),
                            this
                        );
                    },
                    play: function () {
                        if (!1 === this.situation.play) {
                            var e = new Date().getTime() - this.situation.pause;
                            ((this.situation.finish += e),
                                (this.situation.start += e),
                                (this.situation.play = !0),
                                this.render());
                        }
                        return this;
                    },
                },
                parent: SVG.Element,
                construct: {
                    animate: function (e, t, i) {
                        return (this.fx || (this.fx = new SVG.FX(this)))
                            .stop()
                            .animate(e, t, i);
                    },
                    stop: function (e) {
                        return (this.fx && this.fx.stop(e), this);
                    },
                    pause: function () {
                        return (this.fx && this.fx.pause(), this);
                    },
                    play: function () {
                        return (this.fx && this.fx.play(), this);
                    },
                },
            })),
            SVG.extend(SVG.Element, SVG.FX, {
                dx: function (e) {
                    return this.x((this.target || this).x() + e);
                },
                dy: function (e) {
                    return this.y((this.target || this).y() + e);
                },
                dmove: function (e, t) {
                    return this.dx(e).dy(t);
                },
            }),
            [
                'click',
                'dblclick',
                'mousedown',
                'mouseup',
                'mouseover',
                'mouseout',
                'mousemove',
                'touchstart',
                'touchmove',
                'touchleave',
                'touchend',
                'touchcancel',
            ].forEach(function (e) {
                SVG.Element.prototype[e] = function (t) {
                    var i = this;
                    return (
                        (this.node['on' + e] =
                            'function' == typeof t
                                ? function () {
                                      return t.apply(i, arguments);
                                  }
                                : null),
                        this
                    );
                };
            }),
            (SVG.events = {}),
            (SVG.listeners = []),
            (SVG.handlerMap = []),
            (SVG.listenerId = 0),
            (SVG.registerEvent = function (e) {
                SVG.events[e] || (SVG.events[e] = new CustomEvent(e));
            }),
            (SVG.on = function (e, t, i, n) {
                var r = i.bind(n || e.instance || e),
                    o =
                        (SVG.handlerMap.indexOf(e) + 1 ||
                            SVG.handlerMap.push(e)) - 1,
                    a = t.split('.')[0],
                    s = t.split('.')[1] || '*';
                ((SVG.listeners[o] = SVG.listeners[o] || {}),
                    (SVG.listeners[o][a] = SVG.listeners[o][a] || {}),
                    (SVG.listeners[o][a][s] = SVG.listeners[o][a][s] || {}),
                    i._svgjsListenerId ||
                        (i._svgjsListenerId = ++SVG.listenerId),
                    (SVG.listeners[o][a][s][i._svgjsListenerId] = r),
                    e.addEventListener(a, r, !1));
            }),
            (SVG.off = function (e, t, i) {
                var n = SVG.handlerMap.indexOf(e),
                    r = t && t.split('.')[0],
                    o = t && t.split('.')[1];
                if (-1 != n)
                    if (i) {
                        if (
                            ('function' == typeof i && (i = i._svgjsListenerId),
                            !i)
                        )
                            return;
                        SVG.listeners[n][r] &&
                            SVG.listeners[n][r][o || '*'] &&
                            (e.removeEventListener(
                                r,
                                SVG.listeners[n][r][o || '*'][i],
                                !1
                            ),
                            delete SVG.listeners[n][r][o || '*'][i]);
                    } else if (o && r) {
                        if (SVG.listeners[n][r] && SVG.listeners[n][r][o]) {
                            for (i in SVG.listeners[n][r][o])
                                SVG.off(e, [r, o].join('.'), i);
                            delete SVG.listeners[n][r][o];
                        }
                    } else if (o)
                        for (t in SVG.listeners[n])
                            for (namespace in SVG.listeners[n][t])
                                o === namespace && SVG.off(e, [t, o].join('.'));
                    else if (r) {
                        if (SVG.listeners[n][r]) {
                            for (namespace in SVG.listeners[n][r])
                                SVG.off(e, [r, namespace].join('.'));
                            delete SVG.listeners[n][r];
                        }
                    } else {
                        for (t in SVG.listeners[n]) SVG.off(e, t);
                        delete SVG.listeners[n];
                    }
            }),
            SVG.extend(SVG.Element, {
                on: function (e, t) {
                    return (SVG.on(this.node, e, t), this);
                },
                off: function (e, t) {
                    return (SVG.off(this.node, e, t), this);
                },
            }),
            (SVG.Defs = SVG.invent({
                create: 'defs',
                inherit: SVG.Container,
            })),
            (SVG.G = SVG.invent({
                create: 'g',
                inherit: SVG.Container,
                extend: {
                    x: function (e) {
                        return null == e
                            ? this.trans.x
                            : this.transform('x', e);
                    },
                    y: function (e) {
                        return null == e
                            ? this.trans.y
                            : this.transform('y', e);
                    },
                    cx: function (e) {
                        return null == e
                            ? this.bbox().cx
                            : this.x(e - this.bbox().width / 2);
                    },
                    cy: function (e) {
                        return null == e
                            ? this.bbox().cy
                            : this.y(e - this.bbox().height / 2);
                    },
                },
                construct: {
                    group: function () {
                        return this.put(new SVG.G());
                    },
                },
            })),
            SVG.extend(SVG.Element, {
                siblings: function () {
                    return this.parent.children();
                },
                position: function () {
                    return this.parent.index(this);
                },
                next: function () {
                    return this.siblings()[this.position() + 1];
                },
                previous: function () {
                    return this.siblings()[this.position() - 1];
                },
                forward: function () {
                    var e = this.position();
                    return this.parent.removeElement(this).put(this, e + 1);
                },
                backward: function () {
                    var e = this.position();
                    return (
                        e > 0 &&
                            this.parent.removeElement(this).add(this, e - 1),
                        this
                    );
                },
                front: function () {
                    return this.parent.removeElement(this).put(this);
                },
                back: function () {
                    return (
                        this.position() > 0 &&
                            this.parent.removeElement(this).add(this, 0),
                        this
                    );
                },
                before: function (e) {
                    e.remove();
                    var t = this.position();
                    return (this.parent.add(e, t), this);
                },
                after: function (e) {
                    e.remove();
                    var t = this.position();
                    return (this.parent.add(e, t + 1), this);
                },
            }),
            (SVG.Mask = SVG.invent({
                create: function () {
                    (this.constructor.call(this, SVG.create('mask')),
                        (this.targets = []));
                },
                inherit: SVG.Container,
                extend: {
                    remove: function () {
                        for (var e = this.targets.length - 1; e >= 0; e--)
                            this.targets[e] && this.targets[e].unmask();
                        return (
                            delete this.targets,
                            this.parent.removeElement(this),
                            this
                        );
                    },
                },
                construct: {
                    mask: function () {
                        return this.defs().put(new SVG.Mask());
                    },
                },
            })),
            SVG.extend(SVG.Element, {
                maskWith: function (e) {
                    return (
                        (this.masker =
                            e instanceof SVG.Mask
                                ? e
                                : this.parent.mask().add(e)),
                        this.masker.targets.push(this),
                        this.attr(
                            'mask',
                            'url("#' + this.masker.attr('id') + '")'
                        )
                    );
                },
                unmask: function () {
                    return (delete this.masker, this.attr('mask', null));
                },
            }),
            (SVG.Clip = SVG.invent({
                create: function () {
                    (this.constructor.call(this, SVG.create('clipPath')),
                        (this.targets = []));
                },
                inherit: SVG.Container,
                extend: {
                    remove: function () {
                        for (var e = this.targets.length - 1; e >= 0; e--)
                            this.targets[e] && this.targets[e].unclip();
                        return (
                            delete this.targets,
                            this.parent.removeElement(this),
                            this
                        );
                    },
                },
                construct: {
                    clip: function () {
                        return this.defs().put(new SVG.Clip());
                    },
                },
            })),
            SVG.extend(SVG.Element, {
                clipWith: function (e) {
                    return (
                        (this.clipper =
                            e instanceof SVG.Clip
                                ? e
                                : this.parent.clip().add(e)),
                        this.clipper.targets.push(this),
                        this.attr(
                            'clip-path',
                            'url("#' + this.clipper.attr('id') + '")'
                        )
                    );
                },
                unclip: function () {
                    return (delete this.clipper, this.attr('clip-path', null));
                },
            }),
            (SVG.Gradient = SVG.invent({
                create: function (e) {
                    (this.constructor.call(this, SVG.create(e + 'Gradient')),
                        (this.type = e));
                },
                inherit: SVG.Container,
                extend: {
                    from: function (e, t) {
                        return 'radial' == this.type
                            ? this.attr({
                                  fx: new SVG.Number(e),
                                  fy: new SVG.Number(t),
                              })
                            : this.attr({
                                  x1: new SVG.Number(e),
                                  y1: new SVG.Number(t),
                              });
                    },
                    to: function (e, t) {
                        return 'radial' == this.type
                            ? this.attr({
                                  cx: new SVG.Number(e),
                                  cy: new SVG.Number(t),
                              })
                            : this.attr({
                                  x2: new SVG.Number(e),
                                  y2: new SVG.Number(t),
                              });
                    },
                    radius: function (e) {
                        return 'radial' == this.type
                            ? this.attr({ r: new SVG.Number(e) })
                            : this;
                    },
                    at: function (e, t, i) {
                        return this.put(new SVG.Stop()).update(e, t, i);
                    },
                    update: function (e) {
                        return (
                            this.clear(),
                            'function' == typeof e && e.call(this, this),
                            this
                        );
                    },
                    fill: function () {
                        return 'url(#' + this.id() + ')';
                    },
                    toString: function () {
                        return this.fill();
                    },
                },
                construct: {
                    gradient: function (e, t) {
                        return this.defs().gradient(e, t);
                    },
                },
            })),
            SVG.extend(SVG.Defs, {
                gradient: function (e, t) {
                    return this.put(new SVG.Gradient(e)).update(t);
                },
            }),
            (SVG.Stop = SVG.invent({
                create: 'stop',
                inherit: SVG.Element,
                extend: {
                    update: function (e) {
                        return (
                            ('number' == typeof e || e instanceof SVG.Number) &&
                                (e = {
                                    offset: arguments[0],
                                    color: arguments[1],
                                    opacity: arguments[2],
                                }),
                            null != e.opacity &&
                                this.attr('stop-opacity', e.opacity),
                            null != e.color && this.attr('stop-color', e.color),
                            null != e.offset &&
                                this.attr('offset', new SVG.Number(e.offset)),
                            this
                        );
                    },
                },
            })),
            (SVG.Pattern = SVG.invent({
                create: 'pattern',
                inherit: SVG.Container,
                extend: {
                    fill: function () {
                        return 'url(#' + this.id() + ')';
                    },
                    update: function (e) {
                        return (
                            this.clear(),
                            'function' == typeof e && e.call(this, this),
                            this
                        );
                    },
                    toString: function () {
                        return this.fill();
                    },
                },
                construct: {
                    pattern: function (e, t, i) {
                        return this.defs().pattern(e, t, i);
                    },
                },
            })),
            SVG.extend(SVG.Defs, {
                pattern: function (e, t, i) {
                    return this.put(new SVG.Pattern()).update(i).attr({
                        x: 0,
                        y: 0,
                        width: e,
                        height: t,
                        patternUnits: 'userSpaceOnUse',
                    });
                },
            }),
            (SVG.Doc = SVG.invent({
                create: function (e) {
                    ((this.parent =
                        'string' == typeof e ? document.getElementById(e) : e),
                        this.constructor.call(
                            this,
                            'svg' == this.parent.nodeName
                                ? this.parent
                                : SVG.create('svg')
                        ),
                        this.attr({
                            xmlns: SVG.ns,
                            version: SVG.version,
                            width: '100%',
                            height: '100%',
                        }).attr('xmlns:xlink', SVG.xlink, SVG.xmlns),
                        (this._defs = new SVG.Defs()),
                        (this._defs.parent = this),
                        this.node.appendChild(this._defs.node),
                        (this.doSpof = !1),
                        this.parent != this.node && this.stage());
                },
                inherit: SVG.Container,
                extend: {
                    stage: function () {
                        var e = this;
                        return (
                            this.parent.appendChild(this.node),
                            e.spof(),
                            SVG.on(window, 'resize', function () {
                                e.spof();
                            }),
                            this
                        );
                    },
                    defs: function () {
                        return this._defs;
                    },
                    spof: function () {
                        if (this.doSpof) {
                            var e = this.node.getScreenCTM();
                            e &&
                                this.style('left', (-e.e % 1) + 'px').style(
                                    'top',
                                    (-e.f % 1) + 'px'
                                );
                        }
                        return this;
                    },
                    fixSubPixelOffset: function () {
                        return ((this.doSpof = !0), this);
                    },
                },
            })),
            (SVG.Shape = SVG.invent({
                create: function (e) {
                    this.constructor.call(this, e);
                },
                inherit: SVG.Element,
            })),
            (SVG.Symbol = SVG.invent({
                create: 'symbol',
                inherit: SVG.Container,
                construct: {
                    symbol: function () {
                        return this.defs().put(new SVG.Symbol());
                    },
                },
            })),
            (SVG.Use = SVG.invent({
                create: 'use',
                inherit: SVG.Shape,
                extend: {
                    element: function (e) {
                        return (
                            (this.target = e),
                            this.attr('href', '#' + e, SVG.xlink)
                        );
                    },
                },
                construct: {
                    use: function (e) {
                        return this.put(new SVG.Use()).element(e);
                    },
                },
            })),
            (SVG.Rect = SVG.invent({
                create: 'rect',
                inherit: SVG.Shape,
                construct: {
                    rect: function (e, t) {
                        return this.put(new SVG.Rect().size(e, t));
                    },
                },
            })),
            (SVG.Ellipse = SVG.invent({
                create: 'ellipse',
                inherit: SVG.Shape,
                extend: {
                    x: function (e) {
                        return null == e
                            ? this.cx() - this.attr('rx')
                            : this.cx(e + this.attr('rx'));
                    },
                    y: function (e) {
                        return null == e
                            ? this.cy() - this.attr('ry')
                            : this.cy(e + this.attr('ry'));
                    },
                    cx: function (e) {
                        return null == e
                            ? this.attr('cx')
                            : this.attr(
                                  'cx',
                                  new SVG.Number(e).divide(this.trans.scaleX)
                              );
                    },
                    cy: function (e) {
                        return null == e
                            ? this.attr('cy')
                            : this.attr(
                                  'cy',
                                  new SVG.Number(e).divide(this.trans.scaleY)
                              );
                    },
                    width: function (e) {
                        return null == e
                            ? 2 * this.attr('rx')
                            : this.attr('rx', new SVG.Number(e).divide(2));
                    },
                    height: function (e) {
                        return null == e
                            ? 2 * this.attr('ry')
                            : this.attr('ry', new SVG.Number(e).divide(2));
                    },
                    size: function (e, t) {
                        var i = { width: e, height: t };
                        return (
                            (null != e && null != t) ||
                                (i = proportionalSize(this.bbox(), e, t)),
                            this.attr({
                                rx: new SVG.Number(i.width).divide(2),
                                ry: new SVG.Number(i.height).divide(2),
                            })
                        );
                    },
                },
                construct: {
                    circle: function (e) {
                        return this.ellipse(e, e);
                    },
                    ellipse: function (e, t) {
                        return this.put(new SVG.Ellipse())
                            .size(e, t)
                            .move(0, 0);
                    },
                },
            })),
            (SVG.Line = SVG.invent({
                create: 'line',
                inherit: SVG.Shape,
                extend: {
                    x: function (e) {
                        var t = this.bbox();
                        return null == e
                            ? t.x
                            : this.attr({
                                  x1: this.attr('x1') - t.x + e,
                                  x2: this.attr('x2') - t.x + e,
                              });
                    },
                    y: function (e) {
                        var t = this.bbox();
                        return null == e
                            ? t.y
                            : this.attr({
                                  y1: this.attr('y1') - t.y + e,
                                  y2: this.attr('y2') - t.y + e,
                              });
                    },
                    cx: function (e) {
                        var t = this.bbox().width / 2;
                        return null == e ? this.x() + t : this.x(e - t);
                    },
                    cy: function (e) {
                        var t = this.bbox().height / 2;
                        return null == e ? this.y() + t : this.y(e - t);
                    },
                    width: function (e) {
                        var t = this.bbox();
                        return null == e
                            ? t.width
                            : this.attr(
                                  this.attr('x1') < this.attr('x2')
                                      ? 'x2'
                                      : 'x1',
                                  t.x + e
                              );
                    },
                    height: function (e) {
                        var t = this.bbox();
                        return null == e
                            ? t.height
                            : this.attr(
                                  this.attr('y1') < this.attr('y2')
                                      ? 'y2'
                                      : 'y1',
                                  t.y + e
                              );
                    },
                    size: function (e, t) {
                        var i = { width: e, height: t };
                        return (
                            (null != e && null != t) ||
                                (i = proportionalSize(this.bbox(), e, t)),
                            this.width(i.width).height(i.height)
                        );
                    },
                    plot: function (e, t, i, n) {
                        return this.attr({
                            x1: e,
                            y1: t,
                            x2: i,
                            y2: n,
                        });
                    },
                },
                construct: {
                    line: function (e, t, i, n) {
                        return this.put(new SVG.Line().plot(e, t, i, n));
                    },
                },
            })),
            (SVG.Polyline = SVG.invent({
                create: 'polyline',
                inherit: SVG.Shape,
                construct: {
                    polyline: function (e) {
                        return this.put(new SVG.Polyline()).plot(e);
                    },
                },
            })),
            (SVG.Polygon = SVG.invent({
                create: 'polygon',
                inherit: SVG.Shape,
                construct: {
                    polygon: function (e) {
                        return this.put(new SVG.Polygon()).plot(e);
                    },
                },
            })),
            SVG.extend(SVG.Polyline, SVG.Polygon, {
                morphArray: SVG.PointArray,
                plot: function (e) {
                    return this.attr(
                        'points',
                        (this.array = new SVG.PointArray(e, [[0, 0]]))
                    );
                },
                move: function (e, t) {
                    return this.attr('points', this.array.move(e, t));
                },
                x: function (e) {
                    return null == e
                        ? this.bbox().x
                        : this.move(e, this.bbox().y);
                },
                y: function (e) {
                    return null == e
                        ? this.bbox().y
                        : this.move(this.bbox().x, e);
                },
                width: function (e) {
                    var t = this.bbox();
                    return null == e ? t.width : this.size(e, t.height);
                },
                height: function (e) {
                    var t = this.bbox();
                    return null == e ? t.height : this.size(t.width, e);
                },
                size: function (e, t) {
                    var i = { width: e, height: t };
                    return (
                        (null != e && null != t) ||
                            (i = proportionalSize(this.bbox(), e, t)),
                        this.attr('points', this.array.size(i.width, i.height))
                    );
                },
            }),
            (SVG.Path = SVG.invent({
                create: 'path',
                inherit: SVG.Shape,
                extend: {
                    plot: function (e) {
                        return this.attr(
                            'd',
                            (this.array = new SVG.PathArray(e, [['M', 0, 0]]))
                        );
                    },
                    move: function (e, t) {
                        return this.attr('d', this.array.move(e, t));
                    },
                    x: function (e) {
                        return null == e
                            ? this.bbox().x
                            : this.move(e, this.bbox().y);
                    },
                    y: function (e) {
                        return null == e
                            ? this.bbox().y
                            : this.move(this.bbox().x, e);
                    },
                    size: function (e, t) {
                        var i = { width: e, height: t };
                        return (
                            (null != e && null != t) ||
                                (i = proportionalSize(this.bbox(), e, t)),
                            this.attr('d', this.array.size(i.width, i.height))
                        );
                    },
                    width: function (e) {
                        return null == e
                            ? this.bbox().width
                            : this.size(e, this.bbox().height);
                    },
                    height: function (e) {
                        return null == e
                            ? this.bbox().height
                            : this.size(this.bbox().width, e);
                    },
                },
                construct: {
                    path: function (e) {
                        return this.put(new SVG.Path()).plot(e);
                    },
                },
            })),
            (SVG.Image = SVG.invent({
                create: 'image',
                inherit: SVG.Shape,
                extend: {
                    load: function (e) {
                        if (!e) return this;
                        var t = this,
                            i = document.createElement('img');
                        return (
                            (i.onload = function () {
                                var n = t.doc(SVG.Pattern);
                                (0 == t.width() &&
                                    0 == t.height() &&
                                    t.size(i.width, i.height),
                                    n &&
                                        0 == n.width() &&
                                        0 == n.height() &&
                                        n.size(t.width(), t.height()),
                                    'function' == typeof t._loaded &&
                                        t._loaded.call(t, {
                                            width: i.width,
                                            height: i.height,
                                            ratio: i.width / i.height,
                                            url: e,
                                        }));
                            }),
                            this.attr('href', (i.src = this.src = e), SVG.xlink)
                        );
                    },
                    loaded: function (e) {
                        return ((this._loaded = e), this);
                    },
                },
                construct: {
                    image: function (e, t, i) {
                        return this.put(new SVG.Image())
                            .load(e)
                            .size(t || 0, i || t || 0);
                    },
                },
            })),
            (SVG.Text = SVG.invent({
                create: function () {
                    (this.constructor.call(this, SVG.create('text')),
                        (this._leading = new SVG.Number(1.3)),
                        (this._rebuild = !0),
                        (this._build = !1),
                        (this.lines = new SVG.Set()),
                        this.attr(
                            'font-family',
                            SVG.defaults.attrs['font-family']
                        ));
                },
                inherit: SVG.Shape,
                extend: {
                    x: function (e) {
                        return null == e
                            ? this.attr('x')
                            : (this.textPath ||
                                  this.lines.each(function () {
                                      this.newLined && this.x(e);
                                  }),
                              this.attr('x', e));
                    },
                    y: function (e) {
                        var t = this.attr('y'),
                            i = 'number' == typeof t ? t - this.bbox().y : 0;
                        return null == e
                            ? 'number' == typeof t
                                ? t - i
                                : t
                            : this.attr('y', 'number' == typeof e ? e + i : e);
                    },
                    cx: function (e) {
                        return null == e
                            ? this.bbox().cx
                            : this.x(e - this.bbox().width / 2);
                    },
                    cy: function (e) {
                        return null == e
                            ? this.bbox().cy
                            : this.y(e - this.bbox().height / 2);
                    },
                    text: function (e) {
                        if (void 0 === e) return this.content;
                        if ((this.clear().build(!0), 'function' == typeof e))
                            e.call(this, this);
                        else
                            for (
                                var t = 0,
                                    i = (e = (this.content = e).split('\n'))
                                        .length;
                                t < i;
                                t++
                            )
                                this.tspan(e[t]).newLine();
                        return this.build(!1).rebuild();
                    },
                    size: function (e) {
                        return this.attr('font-size', e).rebuild();
                    },
                    leading: function (e) {
                        return null == e
                            ? this._leading
                            : ((this._leading = new SVG.Number(e)),
                              this.rebuild());
                    },
                    rebuild: function (e) {
                        if (
                            ('boolean' == typeof e && (this._rebuild = e),
                            this._rebuild)
                        ) {
                            var t = this;
                            this.lines.each(function () {
                                this.newLined &&
                                    (this.textPath ||
                                        this.attr('x', t.attr('x')),
                                    this.attr(
                                        'dy',
                                        t._leading *
                                            new SVG.Number(t.attr('font-size'))
                                    ));
                            });
                        }
                        return this;
                    },
                    build: function (e) {
                        return ((this._build = !!e), this);
                    },
                },
                construct: {
                    text: function (e) {
                        return this.put(new SVG.Text()).text(e);
                    },
                    plain: function (e) {
                        return this.put(new SVG.Text()).plain(e);
                    },
                },
            })),
            (SVG.TSpan = SVG.invent({
                create: 'tspan',
                inherit: SVG.Shape,
                extend: {
                    text: function (e) {
                        return (
                            'function' == typeof e
                                ? e.call(this, this)
                                : this.plain(e),
                            this
                        );
                    },
                    dx: function (e) {
                        return this.attr('dx', e);
                    },
                    dy: function (e) {
                        return this.attr('dy', e);
                    },
                    newLine: function () {
                        var e = this.doc(SVG.Text);
                        return (
                            (this.newLined = !0),
                            this.dy(e._leading * e.attr('font-size')).attr(
                                'x',
                                e.x()
                            )
                        );
                    },
                },
            })),
            SVG.extend(SVG.Text, SVG.TSpan, {
                plain: function (e) {
                    return (
                        !1 === this._build && this.clear(),
                        this.node.appendChild(
                            document.createTextNode((this.content = e))
                        ),
                        this
                    );
                },
                tspan: function (e) {
                    var t = (this.textPath || this).node,
                        i = new SVG.TSpan();
                    return (
                        !1 === this._build && this.clear(),
                        t.appendChild(i.node),
                        (i.parent = this),
                        this instanceof SVG.Text && this.lines.add(i),
                        i.text(e)
                    );
                },
                clear: function () {
                    for (
                        var e = (this.textPath || this).node;
                        e.hasChildNodes();
                    )
                        e.removeChild(e.lastChild);
                    return (
                        this instanceof SVG.Text &&
                            (delete this.lines,
                            (this.lines = new SVG.Set()),
                            (this.content = '')),
                        this
                    );
                },
                length: function () {
                    return this.node.getComputedTextLength();
                },
            }),
            (SVG.TextPath = SVG.invent({
                create: 'textPath',
                inherit: SVG.Element,
                parent: SVG.Text,
                construct: {
                    path: function (e) {
                        for (
                            this.textPath = new SVG.TextPath();
                            this.node.hasChildNodes();
                        )
                            this.textPath.node.appendChild(
                                this.node.firstChild
                            );
                        return (
                            this.node.appendChild(this.textPath.node),
                            (this.track = this.doc().defs().path(e)),
                            (this.textPath.parent = this),
                            this.textPath.attr(
                                'href',
                                '#' + this.track,
                                SVG.xlink
                            ),
                            this
                        );
                    },
                    plot: function (e) {
                        return (this.track && this.track.plot(e), this);
                    },
                },
            })),
            (SVG.Nested = SVG.invent({
                create: function () {
                    (this.constructor.call(this, SVG.create('svg')),
                        this.style('overflow', 'visible'));
                },
                inherit: SVG.Container,
                construct: {
                    nested: function () {
                        return this.put(new SVG.Nested());
                    },
                },
            })),
            (SVG.A = SVG.invent({
                create: 'a',
                inherit: SVG.Container,
                extend: {
                    to: function (e) {
                        return this.attr('href', e, SVG.xlink);
                    },
                    show: function (e) {
                        return this.attr('show', e, SVG.xlink);
                    },
                    target: function (e) {
                        return this.attr('target', e);
                    },
                },
                construct: {
                    link: function (e) {
                        return this.put(new SVG.A()).to(e);
                    },
                },
            })),
            SVG.extend(SVG.Element, {
                linkTo: function (e) {
                    var t = new SVG.A();
                    return (
                        'function' == typeof e ? e.call(t, t) : t.to(e),
                        this.parent.put(t).put(this)
                    );
                },
            }),
            (SVG.Marker = SVG.invent({
                create: 'marker',
                inherit: SVG.Container,
                extend: {
                    width: function (e) {
                        return this.attr('markerWidth', e);
                    },
                    height: function (e) {
                        return this.attr('markerHeight', e);
                    },
                    ref: function (e, t) {
                        return this.attr('refX', e).attr('refY', t);
                    },
                    update: function (e) {
                        return (
                            this.clear(),
                            'function' == typeof e && e.call(this, this),
                            this
                        );
                    },
                    toString: function () {
                        return 'url(#' + this.id() + ')';
                    },
                },
                construct: {
                    marker: function (e, t, i) {
                        return this.defs().marker(e, t, i);
                    },
                },
            })),
            (SVG.Filter = SVG.invent({
                create: 'filter',
                inherit: SVG.Container,
                extend: {
                    filterUnits: function (e) {
                        return this.attr('filterUnits', e);
                    },
                    toString: function () {
                        return 'url(#' + this.id() + ')';
                    },
                },
                construct: {
                    filter: function () {
                        return this.defs().put(new SVG.Filter());
                    },
                },
            })),
            (SVG.FeDropShadow = SVG.invent({
                create: 'feDropShadow',
                inherit: SVG.Container,
                extend: {
                    dx: function (e) {
                        return this.attr('dx', e);
                    },
                    dy: function (e) {
                        return this.attr('dy', e);
                    },
                    stdDeviation: function (e) {
                        return this.attr('stdDeviation', e);
                    },
                    dmove: function (e, t) {
                        return this.dx(e).dy(t);
                    },
                    floodColor: function (e) {
                        return this.attr('flood-color', e);
                    },
                    floodOpacity: function (e) {
                        return this.attr('flood-opacity', e);
                    },
                },
            })),
            SVG.extend(SVG.Defs, {
                marker: function (e, t, i) {
                    return this.put(new SVG.Marker())
                        .size(e, t)
                        .ref(e / 2, t / 2)
                        .viewbox(0, 0, e, t)
                        .attr('orient', 'auto')
                        .update(i);
                },
            }),
            SVG.extend(SVG.Line, SVG.Polyline, SVG.Polygon, SVG.Path, {
                marker: function (e, t, i, n) {
                    var r = ['marker'];
                    return (
                        'all' != e && r.push(e),
                        (r = r.join('-')),
                        (e =
                            arguments[1] instanceof SVG.Marker
                                ? arguments[1]
                                : this.doc().marker(t, i, n)),
                        this.attr(r, e)
                    );
                },
            }));
        var sugar = {
                stroke: [
                    'color',
                    'width',
                    'opacity',
                    'linecap',
                    'linejoin',
                    'miterlimit',
                    'dasharray',
                    'dashoffset',
                ],
                fill: ['color', 'opacity', 'rule'],
                prefix: function (e, t) {
                    return 'color' == t ? e : e + '-' + t;
                },
            },
            svgSetTimeout,
            svgClearTimeout;
        function camelCase(e) {
            return e.toLowerCase().replace(/-(.)/g, function (e, t) {
                return t.toUpperCase();
            });
        }
        function fullHex(e) {
            return 4 == e.length
                ? [
                      '#',
                      e.substring(1, 2),
                      e.substring(1, 2),
                      e.substring(2, 3),
                      e.substring(2, 3),
                      e.substring(3, 4),
                      e.substring(3, 4),
                  ].join('')
                : e;
        }
        function compToHex(e) {
            var t = e.toString(16);
            return 1 == t.length ? '0' + t : t;
        }
        function proportionalSize(e, t, i) {
            return (
                (null != t && null != i) ||
                    (null == i
                        ? (i = (e.height / e.width) * t)
                        : null == t && (t = (e.width / e.height) * i)),
                { width: t, height: i }
            );
        }
        function at(e, t) {
            return 'number' == typeof e.from
                ? e.from + (e.to - e.from) * t
                : e instanceof SVG.Color || e instanceof SVG.Number
                  ? e.at(t)
                  : t < 1
                    ? e.from
                    : e.to;
        }
        function arrayToString(e) {
            for (var t = 0, i = e.length, n = ''; t < i; t++)
                ((n += e[t][0]),
                    null != e[t][1] &&
                        ((n += e[t][1]),
                        null != e[t][2] &&
                            ((n += ' '),
                            (n += e[t][2]),
                            null != e[t][3] &&
                                ((n += ' '),
                                (n += e[t][3]),
                                (n += ' '),
                                (n += e[t][4]),
                                null != e[t][5] &&
                                    ((n += ' '),
                                    (n += e[t][5]),
                                    (n += ' '),
                                    (n += e[t][6]),
                                    null != e[t][7] &&
                                        ((n += ' '), (n += e[t][7])))))));
            return n + ' ';
        }
        function boxProperties(e) {
            ((e.x2 = e.x + e.width),
                (e.y2 = e.y + e.height),
                (e.cx = e.x + e.width / 2),
                (e.cy = e.y + e.height / 2));
        }
        function parseMatrix(e) {
            if (e.matrix) {
                var t = e.matrix.replace(/\s/g, '').split(',');
                6 == t.length &&
                    ((e.a = parseFloat(t[0])),
                    (e.b = parseFloat(t[1])),
                    (e.c = parseFloat(t[2])),
                    (e.d = parseFloat(t[3])),
                    (e.e = parseFloat(t[4])),
                    (e.f = parseFloat(t[5])));
            }
            return e;
        }
        function idFromReference(e) {
            var t = e.toString().match(SVG.regex.reference);
            if (t) return t[1];
        }
        (['fill', 'stroke'].forEach(function (e) {
            var t,
                i = {};
            ((i[e] = function (i) {
                if (
                    'string' == typeof i ||
                    SVG.Color.isRgb(i) ||
                    (i && 'function' == typeof i.fill)
                )
                    this.attr(e, i);
                else
                    for (t = sugar[e].length - 1; t >= 0; t--)
                        null != i[sugar[e][t]] &&
                            this.attr(
                                sugar.prefix(e, sugar[e][t]),
                                i[sugar[e][t]]
                            );
                return this;
            }),
                SVG.extend(SVG.Element, SVG.FX, i));
        }),
            SVG.extend(SVG.Element, SVG.FX, {
                rotate: function (e, t, i) {
                    return this.transform({
                        rotation: e || 0,
                        cx: t,
                        cy: i,
                    });
                },
                skew: function (e, t) {
                    return this.transform({
                        skewX: e || 0,
                        skewY: t || 0,
                    });
                },
                scale: function (e, t) {
                    return this.transform({
                        scaleX: e,
                        scaleY: null == t ? e : t,
                    });
                },
                translate: function (e, t) {
                    return this.transform({ x: e, y: t });
                },
                matrix: function (e) {
                    return this.transform({ matrix: e });
                },
                opacity: function (e) {
                    return this.attr('opacity', e);
                },
            }),
            SVG.extend(SVG.Rect, SVG.Ellipse, SVG.FX, {
                radius: function (e, t) {
                    return this.attr({ rx: e, ry: t || e });
                },
            }),
            SVG.extend(SVG.Path, {
                length: function () {
                    return this.node.getTotalLength();
                },
                pointAt: function (e) {
                    return this.node.getPointAtLength(e);
                },
            }),
            SVG.extend(SVG.Parent, SVG.Text, SVG.FX, {
                font: function (e) {
                    for (var t in e)
                        'leading' == t
                            ? this.leading(e[t])
                            : 'anchor' == t
                              ? this.attr('text-anchor', e[t])
                              : 'size' == t ||
                                  'family' == t ||
                                  'weight' == t ||
                                  'stretch' == t ||
                                  'variant' == t ||
                                  'style' == t
                                ? this.attr('font-' + t, e[t])
                                : this.attr(t, e[t]);
                    return this;
                },
            }),
            (SVG.Set = SVG.invent({
                create: function () {
                    this.clear();
                },
                extend: {
                    add: function () {
                        var e,
                            t,
                            i = [].slice.call(arguments);
                        for (e = 0, t = i.length; e < t; e++)
                            this.members.push(i[e]);
                        return this;
                    },
                    remove: function (e) {
                        var t = this.index(e);
                        return (t > -1 && this.members.splice(t, 1), this);
                    },
                    each: function (e) {
                        for (var t = 0, i = this.members.length; t < i; t++)
                            e.apply(this.members[t], [t, this.members]);
                        return this;
                    },
                    clear: function () {
                        return ((this.members = []), this);
                    },
                    has: function (e) {
                        return this.index(e) >= 0;
                    },
                    index: function (e) {
                        return this.members.indexOf(e);
                    },
                    get: function (e) {
                        return this.members[e];
                    },
                    first: function () {
                        return this.get(0);
                    },
                    last: function () {
                        return this.get(this.members.length - 1);
                    },
                    valueOf: function () {
                        return this.members;
                    },
                    bbox: function () {
                        var e = new SVG.BBox();
                        if (0 == this.members.length) return e;
                        var t = this.members[0].rbox();
                        return (
                            (e.x = t.x),
                            (e.y = t.y),
                            (e.width = t.width),
                            (e.height = t.height),
                            this.each(function () {
                                e = e.merge(this.rbox());
                            }),
                            e
                        );
                    },
                },
                construct: {
                    set: function () {
                        return new SVG.Set();
                    },
                },
            })),
            (SVG.SetFX = SVG.invent({
                create: function (e) {
                    this.set = e;
                },
            })),
            (SVG.Set.inherit = function () {
                var e = [];
                for (var t in SVG.Shape.prototype)
                    'function' == typeof SVG.Shape.prototype[t] &&
                        'function' != typeof SVG.Set.prototype[t] &&
                        e.push(t);
                for (var t in (e.forEach(function (e) {
                    SVG.Set.prototype[e] = function () {
                        for (var t = 0, i = this.members.length; t < i; t++)
                            this.members[t] &&
                                'function' == typeof this.members[t][e] &&
                                this.members[t][e].apply(
                                    this.members[t],
                                    arguments
                                );
                        return 'animate' == e
                            ? this.fx || (this.fx = new SVG.SetFX(this))
                            : this;
                    };
                }),
                (e = []),
                SVG.FX.prototype))
                    'function' == typeof SVG.FX.prototype[t] &&
                        'function' != typeof SVG.SetFX.prototype[t] &&
                        e.push(t);
                e.forEach(function (e) {
                    SVG.SetFX.prototype[e] = function () {
                        for (var t = 0, i = this.set.members.length; t < i; t++)
                            this.set.members[t].fx[e].apply(
                                this.set.members[t].fx,
                                arguments
                            );
                        return this;
                    };
                });
            }),
            SVG.extend(SVG.Element, {
                data: function (e, t, i) {
                    if ('object' == typeof e) for (t in e) this.data(t, e[t]);
                    else if (arguments.length < 2)
                        try {
                            return JSON.parse(this.attr('data-' + e));
                        } catch (t) {
                            return this.attr('data-' + e);
                        }
                    else
                        this.attr(
                            'data-' + e,
                            null === t
                                ? null
                                : !0 === i ||
                                    'string' == typeof t ||
                                    'number' == typeof t
                                  ? t
                                  : JSON.stringify(t)
                        );
                    return this;
                },
            }),
            SVG.extend(SVG.Element, {
                remember: function (e, t) {
                    if ('object' == typeof arguments[0])
                        for (var t in e) this.remember(t, e[t]);
                    else {
                        if (1 == arguments.length) return this.memory()[e];
                        this.memory()[e] = t;
                    }
                    return this;
                },
                forget: function () {
                    if (0 == arguments.length) this._memory = {};
                    else
                        for (var e = arguments.length - 1; e >= 0; e--)
                            delete this.memory()[arguments[e]];
                    return this;
                },
                memory: function () {
                    return this._memory || (this._memory = {});
                },
            }),
            (function (e) {
                for (
                    var t = 0,
                        i = ['moz', 'webkit'],
                        n = window.requestAnimationFrame,
                        r = window.cancelAnimationFrame,
                        o = 0;
                    o < i.length && !window.requestAnimationFrame;
                    ++o
                )
                    ((n = e[i[o] + 'RequestAnimationFrame']),
                        (r =
                            e[i[o] + 'CancelAnimationFrame'] ||
                            e[i[o] + 'CancelRequestAnimationFrame']));
                ((n =
                    n ||
                    function (i) {
                        var n = new Date().getTime(),
                            r = Math.max(0, 16 - (n - t)),
                            o = e.setTimeout(function () {
                                i(n + r);
                            }, r);
                        return ((t = n + r), o);
                    }),
                    (r = r || e.clearTimeout));
            })(window),
            (function () {
                var taskQueue = [],
                    seq = 0,
                    isWaitOrRuning = !1;
                ((svgSetTimeout = function (func, delay) {
                    return 0 === delay
                        ? ((func._taskSeq = seq.toString()),
                          seq++,
                          taskQueue.push(func),
                          isWaitOrRuning ||
                              ((isWaitOrRuning = !0),
                              Promise.resolve().then(function () {
                                  for (var task = 0; taskQueue.length > 0; )
                                      if (
                                          ((task = taskQueue.shift()),
                                          'function' == typeof task)
                                      )
                                          task();
                                      else {
                                          if ('string' != typeof task)
                                              throw new Error(
                                                  task.toString() +
                                                      'is illegal parameter of svgSetTimeout'
                                              );
                                          eval(task);
                                      }
                                  isWaitOrRuning = !1;
                              })),
                          func._taskSeq)
                        : setTimeout(func, delay);
                }),
                    (svgClearTimeout = function (e) {
                        var t;
                        if (
                            taskQueue.some(function (i, n) {
                                if (i._taskSeq === e) return ((t = n), !0);
                            })
                        )
                            taskQueue.splice(t, 1);
                        else if ('number' == typeof e) return clearTimeout(e);
                    }));
            })(),
            (__nested_webpack_exports__.a = SVG));
    },
];
