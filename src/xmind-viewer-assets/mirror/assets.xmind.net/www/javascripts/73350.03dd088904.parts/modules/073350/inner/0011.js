export default [
    function (e, t, i) {
        'use strict';
        (function (e) {
            var n = i(3),
                r = i(4),
                o = i(0),
                a = i(12),
                s = i.n(a),
                l = i(6),
                c = i.n(l),
                d = i(1);
            const f = {};
            let h, p, T;
            const u = {
                BREAK: '1',
                SKIP: '2',
                hexColorReg: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
                get browserType() {
                    return void 0 !== p
                        ? p
                        : (p = (function () {
                              const e = navigator.userAgent;
                              return -1 !==
                                  (e.indexOf('Opera') || e.indexOf('OPR'))
                                  ? o.BROWSER_TYPE.OPERA
                                  : -1 !== e.indexOf('Edge')
                                    ? o.BROWSER_TYPE.EDGE
                                    : -1 !== e.indexOf('Firefox')
                                      ? o.BROWSER_TYPE.FIREFOX
                                      : -1 !== e.indexOf('Chrome')
                                        ? o.BROWSER_TYPE.CHROME
                                        : -1 !== e.indexOf('Safari')
                                          ? o.BROWSER_TYPE.SAFARI
                                          : -1 !== e.indexOf('MSIE') ||
                                              !0 == !!document.documentMode
                                            ? o.BROWSER_TYPE.IE
                                            : o.BROWSER_TYPE.UNKNOWN;
                          })());
                },
                get isMac() {
                    return navigator.userAgent.includes('Mac');
                },
                isIE(e) {
                    return this.browserType === o.BROWSER_TYPE.IE;
                },
                isEdge() {
                    return this.browserType === o.BROWSER_TYPE.EDGE;
                },
                isSafari() {
                    return this.browserType === o.BROWSER_TYPE.SAFARI;
                },
                isWebKit() {
                    const e = navigator.userAgent;
                    return e.includes('WebKit') && !e.includes('Edge');
                },
                get isPassiveSupport() {
                    if (void 0 === T) {
                        T = !1;
                        try {
                            const e = Object.defineProperty({}, 'passive', {
                                get: function () {
                                    T = !0;
                                },
                            });
                            window.addEventListener('test', null, e);
                        } catch (e) {}
                    }
                    return T;
                },
                imgToBase64String(e) {
                    const t = document.createElement('canvas');
                    ((t.width = e.width), (t.height = e.height));
                    return (
                        t
                            .getContext('2d')
                            .drawImage(e, 0, 0, e.width, e.height),
                        document.body.appendChild(t),
                        t.toDataURL()
                    );
                },
                generateRect(e, t, i, n) {
                    ('number' != typeof i &&
                        (i = d.layoutConstant.TOPIC_SELECTBOX_RADIUS),
                        'number' != typeof n &&
                            (n = d.layoutConstant.TOPIC_SELECTBOX_PADDING));
                    const r = t / 2,
                        o = e.x,
                        a = e.y,
                        s = e.width,
                        l = e.height,
                        c = { x: o - r - n, y: a - r - n },
                        f = { x: o + s + r + n, y: c.y },
                        h = { x: f.x, y: a + l + r + n },
                        p = c.x,
                        T = h.y;
                    return `M ${c.x + i} ${c.y}L ${f.x - i} ${f.y}Q ${f.x} ${f.y}  ${f.x} ${f.y + i}L ${h.x} ${h.y - i}Q ${h.x} ${h.y}  ${h.x - i} ${h.y}L ${p + i} ${T}Q ${p} ${T}  ${p} ${T - i}L ${c.x} ${c.y + i}Q ${c.x} ${c.y}  ${c.x + i} ${c.y}`;
                },
                UUID: function (e, t) {
                    if (e && f[e]) return f[e];
                    const i = (
                        t
                            ? 'xxxyxxxxxxxyxxxxxxxxxyxxxx'
                            : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
                    ).replace(/[xy]/g, (e) => {
                        const t = (16 * Math.random()) | 0;
                        return ('x' === e ? t : (3 & t) | 8).toString(16);
                    });
                    return e ? (f[e] = i) : i;
                },
                getHexColor: function (e) {
                    let t = e;
                    return (
                        /^rgb/.test(t) &&
                            ((t = t.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/)),
                            (t = '#' + g(t[1]) + g(t[2]) + g(t[3]))),
                        t
                    );
                },
                hexToRgb: function (e) {
                    let t = [];
                    if (
                        ((e = e.replace(' ', '')),
                        !/^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(e))
                    )
                        throw new Error(
                            'wrong hex color format! check the argument'
                        );
                    return (
                        3 === (e = e.slice(1, e.length)).length
                            ? ((t = e.split('')),
                              (t = t.map((e, t) => parseInt(e + e, 16))))
                            : ((t = e.split('')),
                              (t = ['', '', ''].map((e, i) =>
                                  parseInt(t[2 * i] + t[2 * i + 1], 16)
                              ))),
                        t
                    );
                },
                hexToHsb: function (e) {
                    const t = u.hexToRgb(e);
                    return u.rgbToHsb(...t);
                },
                hsbToHex: function (e, t, i) {
                    const n = u.hsbToRbg(e, t, i);
                    function r(e) {
                        return ('0' + parseInt(e).toString(16)).slice(-2);
                    }
                    return '#' + r(n.R) + r(n.G) + r(n.B);
                },
                hsbToRbg: function (e, t, i) {
                    const n = { R: 0, G: 0, B: 0 };
                    if (((e = e >= 360 ? 0 : e), 0 === t))
                        ((n.R = 255 * i), (n.G = 255 * i), (n.B = 255 * i));
                    else {
                        const r = Math.floor(e / 60) % 6,
                            o = e / 60 - r,
                            a = i * (1 - t),
                            s = i * (1 - t * o),
                            l = i * (1 - t * (1 - o));
                        switch (r) {
                            case 0:
                                ((n.R = i), (n.G = l), (n.B = a));
                                break;
                            case 1:
                                ((n.R = s), (n.G = i), (n.B = a));
                                break;
                            case 2:
                                ((n.R = a), (n.G = i), (n.B = l));
                                break;
                            case 3:
                                ((n.R = a), (n.G = s), (n.B = i));
                                break;
                            case 4:
                                ((n.R = l), (n.G = a), (n.B = i));
                                break;
                            case 5:
                                ((n.R = i), (n.G = a), (n.B = s));
                        }
                        ((n.R = 255 * n.R),
                            (n.G = 255 * n.G),
                            (n.B = 255 * n.B));
                    }
                    return n;
                },
                rgbToHsb: function (e, t, i) {
                    const n = Math.min(Math.min(e, t), i),
                        r = Math.max(Math.max(e, t), i),
                        o = { H: 0, S: 0, B: 0 };
                    (n === r
                        ? (o.H = 0)
                        : r === e && t >= i
                          ? (o.H = ((t - i) / (r - n)) * 60)
                          : r === e && t < i
                            ? (o.H = ((t - i) / (r - n)) * 60 + 360)
                            : r === t
                              ? (o.H = ((i - e) / (r - n)) * 60 + 120)
                              : r === i &&
                                (o.H = ((e - t) / (r - n)) * 60 + 240),
                        (o.S = 0 === r ? 0 : 1 - n / r));
                    const a = e / 255,
                        s = t / 255,
                        l = i / 255;
                    return (
                        (o.B = Math.max(Math.max(a, s), l)),
                        (o.H = o.H >= 360 ? 0 : o.H),
                        o
                    );
                },
                getWindowSize: function () {
                    let t, i;
                    const n = e;
                    return (
                        n.innerWidth
                            ? (t = n.innerWidth)
                            : document.body &&
                              document.body.clientWidth &&
                              (t = document.body.clientWidth),
                        n.innerHeight
                            ? (i = n.innerHeight)
                            : document.body &&
                              document.body.clientHeight &&
                              (i = document.body.clientHeight),
                        document.documentElement &&
                            document.documentElement.clientHeight &&
                            document.documentElement.clientWidth &&
                            ((i = document.documentElement.clientHeight),
                            (t = document.documentElement.clientWidth)),
                        { winWidth: t, winHeight: i }
                    );
                },
                setAsyncExcute: function (e, t, i) {
                    const n = e.timer || {};
                    (n[t] && clearTimeout(n[t]),
                        (n[t] = setTimeout(i, 0)),
                        (e.timer = n));
                },
                throttle: function (e, t) {
                    const i = e;
                    let n,
                        r = !0;
                    return function () {
                        const e = arguments,
                            o = this;
                        return r
                            ? (i.apply(o, e), (r = !1))
                            : !n &&
                                  void (n = setTimeout(
                                      () => {
                                          (clearTimeout(n),
                                              (n = null),
                                              i.apply(o, e));
                                      },
                                      void 0 === t ? 500 : t
                                  ));
                    };
                },
                showBounds: function (e, t) {
                    const i = new r.a.Rect();
                    (i.attr(t),
                        i.attr({
                            'stroke-width': 1,
                            stroke: 'blue',
                            fill: 'grey',
                            opacity: 0.2,
                        }),
                        i.style('pointer-events', 'none'),
                        e.boundsLine && e.boundsLine.remove(),
                        e.svg.put(i),
                        (e.boundsLine = i));
                },
                cookieUtil: {
                    getItem: function (e) {
                        return (
                            (e &&
                                decodeURIComponent(
                                    document.cookie.replace(
                                        new RegExp(
                                            '(?:(?:^|.*;)\\s*' +
                                                encodeURIComponent(e).replace(
                                                    /[-.+*]/g,
                                                    '\\$&'
                                                ) +
                                                '\\s*\\=\\s*([^;]*).*$)|^.*$'
                                        ),
                                        '$1'
                                    )
                                )) ||
                            null
                        );
                    },
                    setItem: function (e, t, i, n, r, o) {
                        if (
                            !e ||
                            /^(?:expires|max-age|path|domain|secure)$/i.test(e)
                        )
                            return !1;
                        let a = '';
                        if (i)
                            switch (i.constructor) {
                                case Number:
                                    a =
                                        i === 1 / 0
                                            ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT'
                                            : '; max-age=' + i;
                                    break;
                                case String:
                                    a = '; expires=' + i;
                                    break;
                                case Date:
                                    a = '; expires=' + i.toUTCString();
                            }
                        return (
                            (document.cookie =
                                encodeURIComponent(e) +
                                '=' +
                                encodeURIComponent(t) +
                                a +
                                (r ? '; domain=' + r : '') +
                                (n ? '; path=' + n : '') +
                                (o ? '; secure' : '')),
                            !0
                        );
                    },
                    removeItem: function (e, t, i) {
                        return (
                            !!u.cookieUtil.hasItem(e) &&
                            ((document.cookie =
                                encodeURIComponent(e) +
                                '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' +
                                (i ? '; domain=' + i : '') +
                                (t ? '; path=' + t : '')),
                            !0)
                        );
                    },
                    clear: function () {
                        u.cookieUtil.keys().forEach((e) => {
                            u.cookieUtil.removeItem(e, '/');
                        });
                    },
                    hasItem: function (e) {
                        return (
                            !!e &&
                            new RegExp(
                                '(?:^|;\\s*)' +
                                    encodeURIComponent(e).replace(
                                        /[-.+*]/g,
                                        '\\$&'
                                    ) +
                                    '\\s*\\='
                            ).test(document.cookie)
                        );
                    },
                    keys: function () {
                        const e = document.cookie
                            .replace(
                                /((?:^|\s*;)[^=]+)(?=;|$)|^\s*|\s*(?:=[^;]*)?(?:\1|$)/g,
                                ''
                            )
                            .split(/\s*(?:=[^;]*)?;\s*/);
                        for (let t = e.length, i = 0; i < t; i++)
                            e[i] = decodeURIComponent(e[i]);
                        return e;
                    },
                },
                get isMobile() {
                    return void 0 !== h
                        ? h
                        : (h = (function () {
                              const e = navigator.userAgent.toLowerCase();
                              let t;
                              window.device &&
                                  window.device.systemName &&
                                  'iOS' === window.device.systemName &&
                                  (t = !0);
                              return (
                                  e.includes('ipad') ||
                                  e.includes('android') ||
                                  e.includes('mobile') ||
                                  e.includes('phone') ||
                                  t
                              );
                          })());
                },
                get isTouchAble() {
                    return navigator.maxTouchPoints > 0;
                },
                urlNormalize: function (e) {
                    let t, i;
                    const n = 0 === e.indexOf('//');
                    if (-1 !== e.indexOf('://')) {
                        const n = e.split('://');
                        ((i = n[0]), n.shift(), (t = n.join('://')));
                    } else t = e;
                    return (
                        (t = u.pathNormalize(t)),
                        i ? i + '://' + t : n ? '/' + t : t
                    );
                },
                pathNormalize: function (e) {
                    const t = '/' === e.charAt(0),
                        i = e && '/' === e[e.length - 1];
                    return (
                        (e = (function (e, t) {
                            const i = [];
                            for (let n = 0; n < e.length; n++) {
                                const r = e[n];
                                r &&
                                    '.' !== r &&
                                    ('..' === r
                                        ? i.length && '..' !== i[i.length - 1]
                                            ? i.pop()
                                            : t && i.push('..')
                                        : i.push(r));
                            }
                            return i;
                        })(e.split('/'), !t).join('/')) ||
                            t ||
                            (e = '.'),
                        e && i && (e += '/'),
                        (t ? '/' : '') + e
                    );
                },
                getXapResourceHash: function (e) {
                    return u.isXapResource(e)
                        ? e.match(
                              new RegExp('xap:resources/(\\S*)\\.*\\S*$')
                          )[1]
                        : e;
                },
                isXapResource: function (e) {
                    return (
                        'string' == typeof e &&
                        0 === e.indexOf('xap:resources/')
                    );
                },
                frameStabilize: function (e, t) {
                    let i = !1;
                    return function () {
                        const n = this,
                            r = Array.prototype.slice.apply(arguments);
                        (i ||
                            ((i = !0),
                            requestAnimationFrame(() => {
                                (e.apply(n, r), (i = !1));
                            })),
                            t && 'function' == typeof t && t.apply(n, r));
                    };
                },
                putElementSuitable: function (e, t, i = 0) {
                    const n = e.width(),
                        r = e.height(),
                        o = u.getWindowSize(),
                        a =
                            o.winWidth -
                            ('none' !== s()('#right_side_bar')[0].style.display
                                ? s()('#right-bar').width()
                                : 0),
                        l = o.winHeight,
                        c = s()('#top-bar').height
                            ? s()('#top-bar').height()
                            : 0;
                    let d = t.x,
                        f = t.y,
                        h = 'none',
                        p = 'hidden';
                    (t.y + r > l
                        ? ((f -= r + 3 * i),
                          f < c &&
                              ((f += r - 100), (h = '100px'), (p = 'scroll')))
                        : ((h = 'none'), (p = 'hidden')),
                        t.x + n > a
                            ? (d -= t.x + n - a)
                            : t.x < 0 && (d += -t.x),
                        e.css({
                            'max-height': h,
                            'overflow-y': p,
                            left: d,
                            top: f,
                        }));
                },
                postorderIterate: function (e, t, i) {
                    return e
                        .getChildrenBranchesByType(t)
                        .some((e) => u.postorderIterate(e, t, i) === u.BREAK)
                        ? u.BREAK
                        : i(e);
                },
                preorderIterate: function (e, t, i) {
                    let n = i(e);
                    if (n === u.BREAK || n === u.SKIP) return n;
                    const r = e.getChildrenBranchesByType(t);
                    for (let e = 0; e < r.length; e++)
                        if (
                            ((n = u.preorderIterate(r[e], t, i)), n === u.BREAK)
                        )
                            return n;
                },
                getType: function (e) {
                    return 'branch' === e.type ? n.a.getClassName(e) : e.type;
                },
                replaceId(e, t) {
                    const i = {},
                        n = {},
                        r = ['root'];
                    return (
                        (function e(o) {
                            const a = r[r.length - 2];
                            o.id &&
                                ('summary' === a
                                    ? (n[o.id] || (n[o.id] = t()),
                                      (i[o.id] = n[o.id]),
                                      (o.id = n[o.id]))
                                    : 'summaries' === a
                                      ? ((i[o.id] = t()),
                                        (o.id = i[o.id]),
                                        n[o.topicId] || (n[o.topicId] = t()),
                                        (i[o.topicId] = n[o.topicId]),
                                        (o.topicId = n[o.topicId]))
                                      : ((i[o.id] = t()), (o.id = i[o.id])));
                            for (const t in o)
                                c.a.isObject(o[t]) &&
                                    (r.push(t), e(o[t]), r.pop());
                        })(e),
                        i
                    );
                },
                wrapReadOnly(e, t) {
                    t.forEach((t) => {
                        const i = e.prototype[t];
                        'function' == typeof i &&
                            (e.prototype[t] = function (...e) {
                                this.getContext().isReadOnly() ||
                                    i.apply(this, e);
                            });
                    });
                },
                isFunctionEnabled(e) {
                    return this.isMac ? e.metaKey : e.ctrlKey;
                },
                findCommonParent(e) {
                    if (!e || !e.length) return null;
                    const t = e.sort((e, t) => e.getLayer() > t.getLayer()),
                        i = t[0].getLayer();
                    let n = 0;
                    t.some((e, t) => {
                        if (e.getLayer() !== i) return !0;
                        n = t;
                    });
                    const r = t.slice(0, n + 1),
                        o = r.map((e) => e.getBranchPath());
                    if (
                        !t
                            .slice(n + 1)
                            .map((e) => e.getBranchPath())
                            .every((e) => o.some((t) => 0 === e.indexOf(t)))
                    )
                        return null;
                    const a = r[0].parent();
                    return r.every((e) => e.parent() === a)
                        ? 'branch' !== a.type
                            ? null
                            : { parent: a, subBranches: r }
                        : null;
                },
                setAnimation(e) {
                    const {
                            start: t,
                            end: i,
                            duration: n,
                            during: r,
                            after: o,
                        } = e,
                        a = Date.now();
                    let s = !1;
                    const l = () => {
                        if (!s) {
                            const e = Date.now() - a;
                            (r(
                                ((e) => {
                                    const r = (o = e / n) * o;
                                    var o;
                                    return t + (i - t) * r;
                                })(e)
                            ),
                                e < n
                                    ? requestAnimationFrame(l)
                                    : (r(i), o && o()));
                        }
                    };
                    return (
                        requestAnimationFrame(l),
                        function () {
                            s = !0;
                        }
                    );
                },
            };
            function g(e) {
                return ('0' + parseInt(e).toString(16)).slice(-2);
            }
            t.a = u;
        }).call(this, i(83));
    },
];
