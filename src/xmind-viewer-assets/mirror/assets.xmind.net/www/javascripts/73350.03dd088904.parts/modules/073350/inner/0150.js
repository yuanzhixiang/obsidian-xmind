export default [
    function (e, t, i) {
        'use strict';
        var n = i(13),
            r = i.n(n),
            o = i(56);
        const a = 'resources',
            s = 'file-entries',
            l = 'file-entry',
            c = 'password-hint',
            d = 'encryption-data',
            f = 'checksum',
            h = 'checksum-type',
            p = 'iteration-count',
            T = 'algorithm-name',
            u = 'key-derivation',
            g = 'key-derivation-name',
            Q = 'salt',
            m = 'iv',
            b = 'size',
            C = 'manifest.json',
            L = 'metadata.json',
            y = 'content.json',
            M = { [s]: { [y]: {}, [L]: {} }, [a]: {} },
            A = '/manifest.json',
            v = '/content.json',
            E = 'META-INF/manifest.xml',
            _ = 'content.xml',
            O = 'styles.xml',
            S = 'comments.xml',
            x = 'markers/markerSheet.xml',
            R = 'Thumbnails/thumbnail.png',
            I = 'meta.xml',
            N = '/META-INF/manifest.xml',
            w = '/content.xml',
            P = 'assets/',
            H = 'text.md';
        function D(e, t) {
            const i = {
                    keySize: t.keySize,
                    hasher: r.a.algo.SHA512,
                    iterations: t.iterationCount,
                },
                n = r.a.PBKDF2(t.password, t.salt, i);
            return r.a.AES.encrypt(e, n, { iv: t.iv });
        }
        const F = {};
        function k(e, t) {
            if (e && F[e]) return F[e];
            const i = (
                t
                    ? 'xxxyxxxxxxxyxxxxxxxxxyxxxx'
                    : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
            ).replace(/[xy]/g, (e) => {
                const t = (16 * Math.random()) | 0;
                return ('x' === e ? t : (3 & t) | 8).toString(16);
            });
            return e ? (F[e] = i) : i;
        }
        function B(e) {
            return 'string' == typeof e && 0 === e.indexOf('xap:resources/');
        }
        function V(e, t) {
            const i = {
                    keySize: t.keySize,
                    hasher: r.a.algo.SHA512,
                    iterations: t.iterationCount,
                },
                n =
                    'PKCS12' === t.keyDerivationName
                        ? (function (e, t, i, n) {
                              let o = [];
                              const a = 16,
                                  s = 64,
                                  l = [];
                              for (let e = 0; e < s; e++) l.push(1);
                              const c = $(t.words);
                              let d = [];
                              for (
                                  let e = 0;
                                  e <
                                  (Math.floor((s + c.length - 1) / s) * s) /
                                      c.length;
                                  e++
                              )
                                  d = d.concat(c);
                              const f = [];
                              for (let t = 0; t < e.length; t++) {
                                  const i = e.charCodeAt(t);
                                  (f.push(i >> 8), f.push(i));
                              }
                              (f.push(0), f.push(0));
                              let h = [];
                              for (; h.length < s; ) h = h.concat(f);
                              h.length !== s && (h = h.slice(0, 64));
                              const p = d.concat(h),
                                  T = 4 * n,
                                  u = Math.floor((T + a - 1) / a);
                              for (let e = 1; e <= u; e++) {
                                  let e = r.a.MD5(
                                      r.a.lib.WordArray.create(W(l.concat(p)))
                                  );
                                  for (let t = 1; t < i; t++) e = r.a.MD5(e);
                                  let t = [];
                                  for (let i = 0; i < s / e.sigBytes; i++)
                                      t = t.concat(e.words);
                                  const n = $(t);
                                  for (let e = 0; e < p.length / s; e++) {
                                      let t =
                                          (255 & n[n.length - 1]) +
                                          p[e * s + n.length - 1] +
                                          1;
                                      ((p[e * s + n.length - 1] = t),
                                          (t >>= 8));
                                      for (let i = n.length - 2; i >= 0; i--)
                                          ((t +=
                                              (255 & n[i]) +
                                              (255 & p[e * s + i])),
                                              (p[e * s + i] = t),
                                              (t >>= 8));
                                  }
                                  o = o.concat($(e.words));
                              }
                              return r.a.lib.WordArray.create(W(o));
                          })(t.password, t.salt, t.iterationCount, t.keySize)
                        : r.a.PBKDF2(t.password || '', t.salt, i);
            return r.a.AES.decrypt(e, n, { iv: t.iv });
        }
        function Y(e) {
            return {
                password: e,
                keySize: 4,
                iterationCount: 1024,
                salt: r.a.enc.Base64.parse('').random(8),
                iv: r.a.enc.Base64.parse('').random(16),
                algorithmName: 'AES/CBC/PKCS5Padding',
                keyDerivationName: 'PBKDF2WithHmacSHA512',
                checksumType: 'MD5',
            };
        }
        function G(e, t) {
            return t
                ? {
                      password: e,
                      checksum: t[f],
                      checksumType: t[h],
                      iterationCount: t[p],
                      algorithmName: t[T],
                      keyDerivationName: t[g],
                      keySize: (t[b] || 128) / 32,
                      salt: r.a.enc.Base64.parse(t[Q]),
                      iv:
                          (t[m] && r.a.enc.Base64.parse(t[m])) ||
                          r.a.lib.WordArray.create([0, 0, 0, 0]),
                  }
                : Y(e);
        }
        function U(e) {
            return {
                [p]: e.iterationCount,
                [T]: e.algorithmName,
                [g]: e.keyDerivationName,
                [b]: 32 * e[b] || 128,
                [Q]: r.a.enc.Base64.stringify(e[Q]),
                [m]: r.a.enc.Base64.stringify(e[m]),
            };
        }
        function j(e) {
            const t = e.words,
                i = e.sigBytes,
                n = new Uint8Array(i);
            for (let e = 0; e < i; e++) {
                const i = (t[e >>> 2] >>> (24 - (e % 4) * 8)) & 255;
                n[e] = i;
            }
            return n;
        }
        function $(e) {
            const t = [];
            let i, n, r;
            for (n = 0; n < e.length; ++n)
                for (i = e[n], r = 3; r >= 0; --r) t.push((i >> (8 * r)) & 255);
            return t;
        }
        function z(e) {
            const t = e.length,
                i = [];
            for (let n = 0; n < t; n++)
                i[n >>> 2] |= (255 & e[n]) << (24 - (n % 4) * 8);
            return r.a.lib.WordArray.create(i, t);
        }
        function W(e) {
            if (e.length % 4 != 0) throw 'ByteArray invalid.';
            const t = [];
            for (let i = 0; i < e.length / 4; i++) {
                const n =
                    (e[4 * i] << 24) ^
                    (e[4 * i + 1] << 16) ^
                    (e[4 * i + 2] << 8) ^
                    e[4 * i + 3];
                t.push(n);
            }
            return t;
        }
        function K(e) {
            return 'string' == typeof e;
        }
        function Z(e, t, i) {
            return t in e.files || i in e.files;
        }
        function J(e, t, i) {
            return e.file(t) || e.file(i);
        }
        function X(e, t) {
            const {
                    stylesDOM: i,
                    markersDOM: n,
                    commentsDOM: o,
                    sheetsArray: l,
                    manifest: c,
                    newManifest: f,
                    zip: h,
                    password: p,
                } = t,
                T = Array.from(e.childNodes).filter(
                    (e) => e.tagName && 'title' === e.tagName.toLowerCase()
                ),
                u = T && T[0],
                g = {
                    id: k(),
                    title:
                        u && u.firstChild
                            ? u.firstChild.nodeValue
                            : 'Missing Sheet Title',
                };
            return (
                l.push(g),
                (function () {
                    if (
                        e.getElementsByTagName('relationships') &&
                        e.getElementsByTagName('relationships').length
                    ) {
                        const t = [];
                        (Array.from(
                            e.getElementsByTagName('relationship')
                        ).forEach((e) => {
                            const n =
                                    e.getElementsByTagName('title') &&
                                    e.getElementsByTagName('title')[0],
                                r = {
                                    end1Id: e.getAttribute('end1'),
                                    end2Id: e.getAttribute('end2'),
                                    id: e.getAttribute('id'),
                                    title: n ? n.textContent : '',
                                },
                                o = {};
                            (Array.from(
                                e.getElementsByTagName('control-point')
                            ).forEach((e) => {
                                const t = e.getAttribute('index'),
                                    i = Number(e.getAttribute('amount')),
                                    n = Number(e.getAttribute('angle'));
                                o[t] = { amount: i, angle: n };
                                const r =
                                    e.getElementsByTagName('position') &&
                                    e.getElementsByTagName('position')[0];
                                if (r) {
                                    const e = Number(r.getAttribute('svg:x')),
                                        i = Number(r.getAttribute('svg:y'));
                                    Object.assign(o[t], {
                                        x: e,
                                        y: i,
                                    });
                                }
                            }),
                                (r.controlPoints = o));
                            const a =
                                i &&
                                i.getElementsByTagName('xmap-styles') &&
                                i.getElementsByTagName('xmap-styles')[0];
                            if (a) {
                                const t = e.getAttribute('style-id');
                                if (t) {
                                    const e = Array.from(
                                            a.getElementsByTagName('style')
                                        ).filter(
                                            (e) => e.getAttribute('id') === t
                                        ),
                                        i =
                                            e &&
                                            e[0] &&
                                            e[0].getElementsByTagName(
                                                'relationship-properties'
                                            ) &&
                                            e[0].getElementsByTagName(
                                                'relationship-properties'
                                            )[0];
                                    if (i) {
                                        const e = {};
                                        (Array.from(i.attributes).forEach(
                                            (t) => {
                                                e[t.name] = t.value;
                                            }
                                        ),
                                            (r.style = {
                                                properties: e,
                                            }));
                                    }
                                }
                            }
                            t.push(r);
                        }),
                            (g.relationships = t));
                    }
                })(),
                (function () {
                    const t =
                        e.getElementsByTagName('sheet-settings') &&
                        e.getElementsByTagName('sheet-settings')[0];
                    if (!t) return !1;
                    g.settings = {};
                    const i = {
                        infoItems: {
                            childNodeName: 'infoItem',
                            keyName: 'infoItems/infoItem',
                        },
                        'info-items': {
                            childNodeName: 'info-item',
                            keyName: 'info-items/info-item',
                        },
                    };
                    Object.keys(i).forEach((e) => {
                        const n = [],
                            r =
                                t.getElementsByTagName(e) &&
                                t.getElementsByTagName(e)[0];
                        if (r) {
                            const t = i[e].childNodeName;
                            (Array.from(r.getElementsByTagName(t)).forEach(
                                (e) => {
                                    n.push({
                                        mode: e.getAttribute('mode'),
                                        type: e.getAttribute('type'),
                                    });
                                }
                            ),
                                (g.settings[i[e].keyName] = n));
                        }
                    });
                })(),
                (function () {
                    if (!i) return !1;
                    if (
                        !i.getElementsByTagName('xmap-styles') ||
                        !i.getElementsByTagName('xmap-styles')[0]
                    )
                        return !1;
                    const t = e.getAttribute('style-id');
                    if (!t) return !1;
                    const n = i.getElementById(t);
                    if (!n) return !1;
                    const r = n.getAttribute('type');
                    g.style = { type: r };
                    const o =
                        n.getElementsByTagName(r + '-properties') &&
                        n.getElementsByTagName(r + '-properties')[0];
                    if (!o) return !1;
                    const a = {};
                    (Array.from(o.attributes).forEach((e) => {
                        a[e.name] = e.value;
                    }),
                        (g.style.properties = a));
                })(),
                (function () {
                    if (!e || !i) return;
                    const t = e.getAttribute('theme');
                    if (!t) return;
                    const n = i.getElementById(t);
                    if (!n) return;
                    const r = {};
                    (Array.from(
                        n.getElementsByTagName('default-style')
                    ).forEach((e) => {
                        const t = e.getAttribute('style-id'),
                            n = e.getAttribute('style-family');
                        if (!i || !t) return;
                        const o = i.getElementById(t);
                        if (!o) return;
                        const a = o.getAttribute('type');
                        ((r[n] = { type: a, properties: {} }),
                            o.getElementsByTagName(a + '-properties') &&
                                o.getElementsByTagName(a + '-properties')[0] &&
                                Array.from(
                                    o.getElementsByTagName(a + '-properties')[0]
                                        .attributes
                                ).forEach((e) => {
                                    r[n].properties[e.name] = e.value;
                                }));
                    }),
                        (g.theme = r));
                })(),
                new Promise((t) => {
                    Promise.all([
                        new Promise((t) => {
                            const i = { groups: {}, markers: {} },
                                o =
                                    e.getElementsByTagName('legend') &&
                                    e.getElementsByTagName('legend')[0];
                            if (o) {
                                i.visibility = o.getAttribute('visibility');
                                const e =
                                    o.getElementsByTagName('position') &&
                                    o.getElementsByTagName('position')[0];
                                e &&
                                    (i.position = {
                                        x: Number(e.getAttribute('svg:x')),
                                        y: Number(e.getAttribute('svg:y')),
                                    });
                                const t = o.getElementsByTagName(
                                    'marker-descriptions'
                                );
                                t &&
                                    t[0] &&
                                    Array.from(
                                        t[0].getElementsByTagName(
                                            'marker-description'
                                        )
                                    ).forEach((e) => {
                                        const t = e.getAttribute('marker-id'),
                                            n = e.getAttribute('description');
                                        t &&
                                            (i.markers[t] = {
                                                name: n,
                                            });
                                    });
                            }
                            const l = [];
                            (n &&
                                Array.from(
                                    n.getElementsByTagName('marker-group')
                                ).forEach((e) => {
                                    const t = e.getAttribute('id'),
                                        n = e.getAttribute('name'),
                                        o = e.getAttribute('singleton'),
                                        T = e.getElementsByTagName('marker');
                                    if (!T || !T.length) return;
                                    const u = Array.from(T).map((e) =>
                                        e.getAttribute('id')
                                    );
                                    ((i.groups[t] = {
                                        name: n,
                                        singleton: o,
                                        markers: u,
                                    }),
                                        Array.from(T).forEach((e) => {
                                            const t = e.getAttribute('id'),
                                                n = e.getAttribute('resource'),
                                                o = c[s]['markers/' + n],
                                                T = h.file('markers/' + n);
                                            if (T && o) {
                                                const o = {},
                                                    h = c[s]['markers/' + n][d];
                                                (l.push(
                                                    T.async(
                                                        h
                                                            ? 'base64'
                                                            : 'uint8array'
                                                    ).then((t) => {
                                                        if (h) {
                                                            const e = G(p, h);
                                                            t = j(V(t, e));
                                                        }
                                                        try {
                                                            const i =
                                                                    r.a.algo.SHA256.create(),
                                                                l = i
                                                                    .update(
                                                                        r.a.lib.WordArray.create(
                                                                            t
                                                                        )
                                                                    )
                                                                    .finalize()
                                                                    .toString(
                                                                        r.a.enc
                                                                            .Hex
                                                                    );
                                                            let c = n
                                                                .split('.')
                                                                .pop();
                                                            c =
                                                                c === n
                                                                    ? ''
                                                                    : '.' + c;
                                                            const p =
                                                                'resources/' +
                                                                l +
                                                                c;
                                                            ((f[s][p] = {
                                                                [d]: h,
                                                            }),
                                                                (f[a][p] = t),
                                                                (o.resource =
                                                                    'xap:' + p),
                                                                (o.name =
                                                                    e.getAttribute(
                                                                        'name'
                                                                    )));
                                                        } catch (e) {}
                                                    })
                                                ),
                                                    (i.markers[t] = o));
                                            }
                                        }));
                                }),
                                Promise.all(l).then(() => {
                                    ((g.legend = i), t());
                                }));
                        }),
                        new Promise((t) => {
                            const n =
                                i &&
                                i.getElementsByTagName('xmap-styles') &&
                                i.getElementsByTagName('xmap-styles')[0];
                            (function e(t) {
                                return new Promise((l) => {
                                    const T = {},
                                        u = [];
                                    {
                                        T.id = t.getAttribute('id');
                                        const e = t.getAttribute('class');
                                        e && (T.class = e);
                                        const i = t.getAttribute('branch');
                                        i && (T.branch = i);
                                        const n =
                                            t.getAttribute('structure-class');
                                        n && (T.structureClass = n);
                                        const o = Array.from(
                                                t.childNodes
                                            ).filter(
                                                (e) =>
                                                    e.tagName &&
                                                    'title' ===
                                                        e.tagName.toLowerCase()
                                            ),
                                            l = o && o[0];
                                        if (l && l.firstChild) {
                                            const e = l.firstChild.nodeValue;
                                            e &&
                                                (T.title = e.replace(
                                                    /\r/g,
                                                    ''
                                                ));
                                            const t = Number(
                                                l.getAttribute('svg:width')
                                            );
                                            t && (T.width = t);
                                        }
                                        const g = Array.from(
                                                t.childNodes
                                            ).filter(
                                                (e) =>
                                                    e.tagName &&
                                                    'position' ===
                                                        e.tagName.toLowerCase()
                                            ),
                                            Q = g && g[0];
                                        Q &&
                                            (T.position = {
                                                x: Number(
                                                    Q.getAttribute('svg:x')
                                                ),
                                                y: Number(
                                                    Q.getAttribute('svg:y')
                                                ),
                                            });
                                        for (const e of Array.from(
                                            t.childNodes
                                        ))
                                            if (
                                                e.tagName &&
                                                'xhtml:img' ===
                                                    e.tagName.toLowerCase()
                                            ) {
                                                const t = e,
                                                    i =
                                                        t.getAttribute(
                                                            'xhtml:src'
                                                        ),
                                                    n = i.split(':').pop(),
                                                    o = c[s][n],
                                                    l = h.file(n);
                                                if (o && l) {
                                                    const e = o[d];
                                                    u.push(
                                                        l
                                                            .async(
                                                                e
                                                                    ? 'base64'
                                                                    : 'uint8array'
                                                            )
                                                            .then((i) => {
                                                                try {
                                                                    if (e) {
                                                                        i = j(
                                                                            V(
                                                                                i,
                                                                                G(
                                                                                    p,
                                                                                    e
                                                                                )
                                                                            )
                                                                        );
                                                                    }
                                                                    const o =
                                                                        r.a.algo.SHA256.create()
                                                                            .update(
                                                                                r.a.lib.WordArray.create(
                                                                                    i
                                                                                )
                                                                            )
                                                                            .finalize()
                                                                            .toString(
                                                                                r
                                                                                    .a
                                                                                    .enc
                                                                                    .Hex
                                                                            );
                                                                    let l = n
                                                                        .split(
                                                                            '.'
                                                                        )
                                                                        .pop();
                                                                    l =
                                                                        l === n
                                                                            ? ''
                                                                            : '.' +
                                                                              l;
                                                                    const c =
                                                                        'resources/' +
                                                                        o +
                                                                        l;
                                                                    ((f[s][c] =
                                                                        {
                                                                            [d]: e,
                                                                        }),
                                                                        (f[a][
                                                                            c
                                                                        ] = i),
                                                                        (T.image =
                                                                            {
                                                                                src:
                                                                                    'xap:' +
                                                                                    c,
                                                                            }));
                                                                    const h =
                                                                        t.getAttribute(
                                                                            'align'
                                                                        );
                                                                    h &&
                                                                        (T.image.align =
                                                                            h);
                                                                    const u =
                                                                        Number(
                                                                            t.getAttribute(
                                                                                'svg:width'
                                                                            )
                                                                        );
                                                                    u &&
                                                                        (T.image.width =
                                                                            u);
                                                                    const g =
                                                                        Number(
                                                                            t.getAttribute(
                                                                                'svg:height'
                                                                            )
                                                                        );
                                                                    g &&
                                                                        (T.image.height =
                                                                            g);
                                                                } catch (e) {}
                                                            })
                                                    );
                                                }
                                                if (
                                                    i
                                                        .split(':')[0]
                                                        .startsWith('http')
                                                ) {
                                                    T.image = {
                                                        src: i,
                                                    };
                                                    const e =
                                                        t.getAttribute('align');
                                                    e && (T.image.align = e);
                                                    const n = Number(
                                                        t.getAttribute(
                                                            'svg:width'
                                                        )
                                                    );
                                                    n && (T.image.width = n);
                                                    const r = Number(
                                                        t.getAttribute(
                                                            'svg:height'
                                                        )
                                                    );
                                                    r && (T.image.height = r);
                                                }
                                            }
                                        const m = Array.from(
                                                t.childNodes
                                            ).filter(
                                                (e) =>
                                                    e.tagName &&
                                                    'numbering' ===
                                                        e.tagName.toLowerCase()
                                            ),
                                            b = m && m[0];
                                        if (b) {
                                            T.numbering = {
                                                numberFormat:
                                                    b.getAttribute(
                                                        'number-format'
                                                    ),
                                                numberDepth:
                                                    b.getAttribute(
                                                        'number-depth'
                                                    ),
                                                numberSeparator:
                                                    b.getAttribute(
                                                        'number-separator'
                                                    ),
                                                prependingNumbers:
                                                    b.getAttribute(
                                                        'prepending-numbers'
                                                    ),
                                            };
                                            const e =
                                                b.getElementsByTagName(
                                                    'prefix'
                                                ) &&
                                                b.getElementsByTagName(
                                                    'prefix'
                                                )[0];
                                            e &&
                                                e.firstChild &&
                                                (T.numbering.prefix =
                                                    e.firstChild.nodeValue);
                                            const t =
                                                b.getElementsByTagName(
                                                    'suffix'
                                                ) &&
                                                b.getElementsByTagName(
                                                    'suffix'
                                                )[0];
                                            t &&
                                                t.firstChild &&
                                                (T.numbering.suffix =
                                                    t.firstChild.nodeValue);
                                        }
                                    }
                                    {
                                        const e = t.getAttribute('xlink:href');
                                        if (e)
                                            if (e.startsWith('xap:')) {
                                                const t = e.substr(4),
                                                    i = c[s][t],
                                                    n = h.file(t);
                                                if (i && n) {
                                                    const e = i[d];
                                                    u.push(
                                                        n
                                                            .async(
                                                                e
                                                                    ? 'base64'
                                                                    : 'uint8array'
                                                            )
                                                            .then((i) => {
                                                                try {
                                                                    if (e) {
                                                                        i = j(
                                                                            V(
                                                                                i,
                                                                                G(
                                                                                    p,
                                                                                    e
                                                                                )
                                                                            )
                                                                        );
                                                                    }
                                                                    const n =
                                                                        r.a.algo.SHA256.create()
                                                                            .update(
                                                                                r.a.lib.WordArray.create(
                                                                                    i
                                                                                )
                                                                            )
                                                                            .finalize()
                                                                            .toString(
                                                                                r
                                                                                    .a
                                                                                    .enc
                                                                                    .Hex
                                                                            );
                                                                    let o = t
                                                                        .split(
                                                                            '.'
                                                                        )
                                                                        .pop();
                                                                    o =
                                                                        o === t
                                                                            ? ''
                                                                            : '.' +
                                                                              o;
                                                                    const l =
                                                                        'resources/' +
                                                                        n +
                                                                        o;
                                                                    ((f[s][l] =
                                                                        {
                                                                            [d]: e,
                                                                        }),
                                                                        (f[a][
                                                                            l
                                                                        ] = i),
                                                                        (T.href =
                                                                            'xap:' +
                                                                            l));
                                                                } catch (e) {}
                                                            })
                                                    );
                                                }
                                            } else T.href = e;
                                        const n = Array.from(
                                                t.childNodes
                                            ).filter(
                                                (e) =>
                                                    e.tagName &&
                                                    'notes' ===
                                                        e.tagName.toLowerCase()
                                            ),
                                            o = n && n[0];
                                        if (o) {
                                            T.notes = {};
                                            const e =
                                                o.getElementsByTagName(
                                                    'plain'
                                                ) &&
                                                o.getElementsByTagName(
                                                    'plain'
                                                )[0];
                                            e &&
                                                e.firstChild &&
                                                (T.notes.plain = {
                                                    content:
                                                        e.firstChild.nodeValue,
                                                });
                                            const t =
                                                o.getElementsByTagName(
                                                    'html'
                                                ) &&
                                                o.getElementsByTagName(
                                                    'html'
                                                )[0];
                                            if (t) {
                                                let e = Promise.resolve();
                                                T.notes.html = {
                                                    content: {
                                                        paragraphs: [],
                                                    },
                                                };
                                                for (const n of Array.from(
                                                    t.childNodes
                                                ).filter(
                                                    (e) =>
                                                        e.childNodes &&
                                                        e.childNodes.length
                                                )) {
                                                    const t = [],
                                                        o = {},
                                                        l =
                                                            n.getAttribute(
                                                                'style-id'
                                                            ),
                                                        u = i
                                                            ? i.getElementById(
                                                                  l
                                                              )
                                                            : null;
                                                    if (u) {
                                                        const e =
                                                            u.getAttribute(
                                                                'type'
                                                            );
                                                        if (e) {
                                                            const t =
                                                                u.getElementsByTagName(
                                                                    e +
                                                                        '-properties'
                                                                ) &&
                                                                u.getElementsByTagName(
                                                                    e +
                                                                        '-properties'
                                                                )[0];
                                                            if (
                                                                t &&
                                                                t.attributes
                                                            ) {
                                                                const e = {};
                                                                for (const i of Array.from(
                                                                    t.attributes
                                                                ))
                                                                    e[
                                                                        i.nodeName
                                                                    ] =
                                                                        i.nodeValue;
                                                                o.properties =
                                                                    e;
                                                            }
                                                            o.type = e;
                                                        }
                                                    }
                                                    const g = Array.from(
                                                        n.childNodes
                                                    );
                                                    for (const n in g) {
                                                        const o = g[n];
                                                        1 === o.nodeType
                                                            ? 'xhtml:img' ===
                                                              o.nodeName
                                                                ? (e = e.then(
                                                                      () =>
                                                                          new Promise(
                                                                              (
                                                                                  e
                                                                              ) => {
                                                                                  const i =
                                                                                          o
                                                                                              .getAttribute(
                                                                                                  'xhtml:src'
                                                                                              )
                                                                                              .substr(
                                                                                                  4
                                                                                              ),
                                                                                      l =
                                                                                          c[
                                                                                              s
                                                                                          ][
                                                                                              i
                                                                                          ],
                                                                                      T =
                                                                                          h.file(
                                                                                              i
                                                                                          );
                                                                                  if (
                                                                                      l &&
                                                                                      T
                                                                                  ) {
                                                                                      const o =
                                                                                          l[
                                                                                              d
                                                                                          ];
                                                                                      T.async(
                                                                                          o
                                                                                              ? 'base64'
                                                                                              : 'uint8array'
                                                                                      ).then(
                                                                                          (
                                                                                              l
                                                                                          ) => {
                                                                                              try {
                                                                                                  if (
                                                                                                      o
                                                                                                  ) {
                                                                                                      l =
                                                                                                          j(
                                                                                                              V(
                                                                                                                  l,
                                                                                                                  G(
                                                                                                                      p,
                                                                                                                      o
                                                                                                                  )
                                                                                                              )
                                                                                                          );
                                                                                                  }
                                                                                                  const c =
                                                                                                      r.a.algo.SHA256.create()
                                                                                                          .update(
                                                                                                              r.a.lib.WordArray.create(
                                                                                                                  l
                                                                                                              )
                                                                                                          )
                                                                                                          .finalize()
                                                                                                          .toString(
                                                                                                              r
                                                                                                                  .a
                                                                                                                  .enc
                                                                                                                  .Hex
                                                                                                          );
                                                                                                  let h =
                                                                                                      i
                                                                                                          .split(
                                                                                                              '.'
                                                                                                          )
                                                                                                          .pop();
                                                                                                  h =
                                                                                                      h ===
                                                                                                      i
                                                                                                          ? ''
                                                                                                          : '.' +
                                                                                                            h;
                                                                                                  const T =
                                                                                                      'resources/' +
                                                                                                      c +
                                                                                                      h;
                                                                                                  ((f[
                                                                                                      s
                                                                                                  ][
                                                                                                      T
                                                                                                  ] =
                                                                                                      {
                                                                                                          [d]: o,
                                                                                                      }),
                                                                                                      (f[
                                                                                                          a
                                                                                                      ][
                                                                                                          T
                                                                                                      ] =
                                                                                                          l),
                                                                                                      (t[
                                                                                                          n
                                                                                                      ] =
                                                                                                          {
                                                                                                              image:
                                                                                                                  'xap:' +
                                                                                                                  T,
                                                                                                          }),
                                                                                                      e());
                                                                                              } catch (e) {}
                                                                                          }
                                                                                      );
                                                                                  } else
                                                                                      e();
                                                                              }
                                                                          )
                                                                  ))
                                                                : 'xhtml:span' ===
                                                                    o.nodeName
                                                                  ? (e = e.then(
                                                                        () => {
                                                                            const e =
                                                                                o.getAttribute(
                                                                                    'style-id'
                                                                                );
                                                                            if (
                                                                                e
                                                                            ) {
                                                                                const r =
                                                                                    i
                                                                                        ? i.getElementById(
                                                                                              e
                                                                                          )
                                                                                        : null;
                                                                                if (
                                                                                    r
                                                                                ) {
                                                                                    const e =
                                                                                        r.getAttribute(
                                                                                            'type'
                                                                                        );
                                                                                    if (
                                                                                        e
                                                                                    ) {
                                                                                        const i =
                                                                                            r.getElementsByTagName(
                                                                                                e +
                                                                                                    '-properties'
                                                                                            ) &&
                                                                                            r.getElementsByTagName(
                                                                                                e +
                                                                                                    '-properties'
                                                                                            )[0];
                                                                                        if (
                                                                                            i
                                                                                        ) {
                                                                                            const r =
                                                                                                {};
                                                                                            for (const e of Array.from(
                                                                                                i.attributes
                                                                                            ))
                                                                                                r[
                                                                                                    e.nodeName
                                                                                                ] =
                                                                                                    e.nodeValue;
                                                                                            t[
                                                                                                n
                                                                                            ] =
                                                                                                {
                                                                                                    style: {
                                                                                                        type: e,
                                                                                                        properties:
                                                                                                            r,
                                                                                                    },
                                                                                                    text: o.textContent,
                                                                                                };
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    ))
                                                                  : 'xhtml:a' ===
                                                                        o.nodeName &&
                                                                    (e = e.then(
                                                                        () =>
                                                                            new Promise(
                                                                                (
                                                                                    e
                                                                                ) => {
                                                                                    const l =
                                                                                        [];
                                                                                    for (const e of Array.from(
                                                                                        o.childNodes
                                                                                    ))
                                                                                        if (
                                                                                            3 ===
                                                                                            e.nodeType
                                                                                        )
                                                                                            l.push(
                                                                                                {
                                                                                                    text: e.textContent,
                                                                                                }
                                                                                            );
                                                                                        else if (
                                                                                            'xhtml:span' ===
                                                                                            e.nodeName
                                                                                        ) {
                                                                                            const t =
                                                                                                e.getAttribute(
                                                                                                    'style-id'
                                                                                                );
                                                                                            if (
                                                                                                t
                                                                                            ) {
                                                                                                const n =
                                                                                                    i.getElementById(
                                                                                                        t
                                                                                                    );
                                                                                                if (
                                                                                                    n
                                                                                                ) {
                                                                                                    const t =
                                                                                                        n.getAttribute(
                                                                                                            'type'
                                                                                                        );
                                                                                                    if (
                                                                                                        t
                                                                                                    ) {
                                                                                                        const i =
                                                                                                            n.getElementsByTagName(
                                                                                                                t +
                                                                                                                    '-properties'
                                                                                                            ) &&
                                                                                                            n.getElementsByTagName(
                                                                                                                t +
                                                                                                                    '-properties'
                                                                                                            )[0];
                                                                                                        if (
                                                                                                            i
                                                                                                        ) {
                                                                                                            const n =
                                                                                                                {};
                                                                                                            for (const e of Array.from(
                                                                                                                i.attributes
                                                                                                            ))
                                                                                                                n[
                                                                                                                    e.nodeName
                                                                                                                ] =
                                                                                                                    e.nodeValue;
                                                                                                            l.push(
                                                                                                                {
                                                                                                                    style: {
                                                                                                                        type: t,
                                                                                                                        properties:
                                                                                                                            n,
                                                                                                                    },
                                                                                                                    text: e.textContent,
                                                                                                                }
                                                                                                            );
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    const T =
                                                                                        o.getAttribute(
                                                                                            'xlink:href'
                                                                                        );
                                                                                    if (
                                                                                        T &&
                                                                                        T.startsWith(
                                                                                            'xap:'
                                                                                        )
                                                                                    ) {
                                                                                        const i =
                                                                                                o
                                                                                                    .getAttribute(
                                                                                                        'xlink:href'
                                                                                                    )
                                                                                                    .substr(
                                                                                                        4
                                                                                                    ),
                                                                                            l =
                                                                                                c[
                                                                                                    s
                                                                                                ][
                                                                                                    i
                                                                                                ],
                                                                                            T =
                                                                                                h.file(
                                                                                                    i
                                                                                                );
                                                                                        if (
                                                                                            l &&
                                                                                            T
                                                                                        ) {
                                                                                            const o =
                                                                                                l[
                                                                                                    d
                                                                                                ];
                                                                                            T.async(
                                                                                                o
                                                                                                    ? 'base64'
                                                                                                    : 'uint8array'
                                                                                            ).then(
                                                                                                (
                                                                                                    l
                                                                                                ) => {
                                                                                                    try {
                                                                                                        if (
                                                                                                            o
                                                                                                        ) {
                                                                                                            l =
                                                                                                                j(
                                                                                                                    V(
                                                                                                                        l,
                                                                                                                        G(
                                                                                                                            p,
                                                                                                                            o
                                                                                                                        )
                                                                                                                    )
                                                                                                                );
                                                                                                        }
                                                                                                        const c =
                                                                                                            r.a.algo.SHA256.create()
                                                                                                                .update(
                                                                                                                    r.a.lib.WordArray.create(
                                                                                                                        l
                                                                                                                    )
                                                                                                                )
                                                                                                                .finalize()
                                                                                                                .toString(
                                                                                                                    r
                                                                                                                        .a
                                                                                                                        .enc
                                                                                                                        .Hex
                                                                                                                );
                                                                                                        let h =
                                                                                                            i
                                                                                                                .split(
                                                                                                                    '.'
                                                                                                                )
                                                                                                                .pop();
                                                                                                        h =
                                                                                                            h ===
                                                                                                            i
                                                                                                                ? ''
                                                                                                                : '.' +
                                                                                                                  h;
                                                                                                        const T =
                                                                                                            'resources/' +
                                                                                                            c +
                                                                                                            h;
                                                                                                        ((f[
                                                                                                            s
                                                                                                        ][
                                                                                                            T
                                                                                                        ] =
                                                                                                            {
                                                                                                                [d]: o,
                                                                                                            }),
                                                                                                            (f[
                                                                                                                a
                                                                                                            ][
                                                                                                                T
                                                                                                            ] =
                                                                                                                l),
                                                                                                            (t[
                                                                                                                n
                                                                                                            ] =
                                                                                                                {
                                                                                                                    image:
                                                                                                                        'xap:' +
                                                                                                                        T,
                                                                                                                }),
                                                                                                            e());
                                                                                                    } catch (e) {}
                                                                                                }
                                                                                            );
                                                                                        } else
                                                                                            e();
                                                                                    } else
                                                                                        ((t[
                                                                                            n
                                                                                        ] =
                                                                                            {
                                                                                                spans: l,
                                                                                                href: T,
                                                                                            }),
                                                                                            e());
                                                                                }
                                                                            )
                                                                    ))
                                                            : 3 ===
                                                                  o.nodeType &&
                                                              (e = e.then(
                                                                  () => {
                                                                      t[n] = {
                                                                          text: o.textContent,
                                                                      };
                                                                  }
                                                              ));
                                                    }
                                                    e = e.then(() => {
                                                        T.notes.html.content.paragraphs.push(
                                                            {
                                                                spans: t,
                                                                style: o,
                                                            }
                                                        );
                                                    });
                                                }
                                                u.push(e);
                                            }
                                        }
                                        const l = Array.from(
                                                t.childNodes
                                            ).filter(
                                                (e) =>
                                                    e.tagName &&
                                                    'labels' ===
                                                        e.tagName.toLowerCase()
                                            ),
                                            g = l && l[0];
                                        if (g) {
                                            const e = Array.from(
                                                g.getElementsByTagName('label')
                                            );
                                            e &&
                                                ((T.labels = []),
                                                e.forEach((e) => {
                                                    e &&
                                                        e.firstChild &&
                                                        T.labels.push(
                                                            e.firstChild
                                                                .nodeValue
                                                        );
                                                }));
                                        }
                                    }
                                    e: {
                                        if (!i) break e;
                                        const e = t.getAttribute('style-id');
                                        if (!e) break e;
                                        const n = i.getElementById(e);
                                        if (!n) break e;
                                        const r =
                                            n.getElementsByTagName(
                                                'topic-properties'
                                            ) &&
                                            n.getElementsByTagName(
                                                'topic-properties'
                                            )[0];
                                        if (!r) break e;
                                        T.style = { type: 'topic' };
                                        const o = {};
                                        (Array.from(r.attributes).forEach(
                                            (e) => {
                                                o[e.name] = e.value;
                                            }
                                        ),
                                            (T.style.properties = o));
                                    }
                                    e: {
                                        const e = Array.from(
                                                t.childNodes
                                            ).filter(
                                                (e) =>
                                                    e.tagName &&
                                                    'marker-refs' ===
                                                        e.tagName.toLowerCase()
                                            ),
                                            i = e && e[0];
                                        if (!i) break e;
                                        const n =
                                            i.getElementsByTagName(
                                                'marker-ref'
                                            );
                                        n &&
                                            n.length &&
                                            ((T.markers = []),
                                            Array.from(n).forEach((e) => {
                                                T.markers.push({
                                                    markerId:
                                                        e.getAttribute(
                                                            'marker-id'
                                                        ),
                                                });
                                            }));
                                    }
                                    e: {
                                        if (!o) break e;
                                        const e = Array.from(
                                            o.getElementsByTagName('comment')
                                        );
                                        if (!e.length) break e;
                                        Array.from(e).forEach((t, i) => {
                                            if (
                                                t.getAttribute('object-id') ===
                                                T.id
                                            ) {
                                                T.comments || (T.comments = []);
                                                const n =
                                                    t.getElementsByTagName(
                                                        'content'
                                                    ) &&
                                                    t.getElementsByTagName(
                                                        'content'
                                                    )[0];
                                                (n &&
                                                    n.firstChild &&
                                                    T.comments.push({
                                                        creationTime: Number(
                                                            t.getAttribute(
                                                                'time'
                                                            )
                                                        ),
                                                        author: t.getAttribute(
                                                            'author'
                                                        ),
                                                        content:
                                                            n.firstChild
                                                                .nodeValue,
                                                    }),
                                                    e.splice(i, 1));
                                            }
                                        });
                                    }
                                    function g(e) {
                                        const t = (e) => {
                                            const t = {};
                                            for (const i of Array.from(
                                                e.attributes
                                            ))
                                                t[i.name] = i.value;
                                            return Object.keys(t) ? t : null;
                                        };
                                        let i;
                                        const n = Array.from(
                                            e.childNodes
                                        ).filter((e) => e.tagName);
                                        return (
                                            n && n.length
                                                ? ((i = []),
                                                  n.forEach((e) => {
                                                      const n = {};
                                                      ((n.name = e.nodeName),
                                                          (n.content = g(e)));
                                                      const r = t(e);
                                                      (r && (n.attrs = r),
                                                          i.push(n));
                                                  }))
                                                : e.firstChild &&
                                                  (i = e.firstChild.nodeValue),
                                            i
                                        );
                                    }
                                    e: {
                                        const e = Array.from(
                                                t.childNodes
                                            ).filter(
                                                (e) =>
                                                    e.tagName &&
                                                    'extensions' ===
                                                        e.tagName.toLowerCase()
                                            ),
                                            i = e && e[0];
                                        if (!i) break e;
                                        const n =
                                            i.getElementsByTagName('extension');
                                        if (!n) break e;
                                        const o = [];
                                        (Array.from(n).forEach((e) => {
                                            const t = {};
                                            t.provider =
                                                e.getAttribute('provider');
                                            const i =
                                                    e.getElementsByTagName(
                                                        'content'
                                                    ) &&
                                                    e.getElementsByTagName(
                                                        'content'
                                                    )[0],
                                                n = Array.from(
                                                    i.childNodes
                                                ).filter((e) => e.tagName),
                                                l = [];
                                            (n.forEach((e) => {
                                                l.push({
                                                    name: e.nodeName,
                                                    content: g(e),
                                                });
                                            }),
                                                (t.content = l));
                                            const T =
                                                e.getElementsByTagName(
                                                    'resource-refs'
                                                ) &&
                                                e.getElementsByTagName(
                                                    'resource-refs'
                                                )[0];
                                            if (T) {
                                                const e = Array.from(
                                                        T.getElementsByTagName(
                                                            'resource-ref'
                                                        )
                                                    ),
                                                    i = [];
                                                (e.forEach((e) => {
                                                    const t =
                                                            e.getAttribute(
                                                                'resource-id'
                                                            ),
                                                        n = h.file(t),
                                                        o = c[s][t];
                                                    if (o && n) {
                                                        const e = o[d];
                                                        u.push(
                                                            n
                                                                .async(
                                                                    e
                                                                        ? 'base64'
                                                                        : 'uint8array'
                                                                )
                                                                .then((n) => {
                                                                    try {
                                                                        if (e) {
                                                                            n =
                                                                                j(
                                                                                    V(
                                                                                        n,
                                                                                        G(
                                                                                            p,
                                                                                            e
                                                                                        )
                                                                                    )
                                                                                );
                                                                        }
                                                                        const o =
                                                                            r.a.algo.SHA256.create()
                                                                                .update(
                                                                                    r.a.lib.WordArray.create(
                                                                                        n
                                                                                    )
                                                                                )
                                                                                .finalize()
                                                                                .toString(
                                                                                    r
                                                                                        .a
                                                                                        .enc
                                                                                        .Hex
                                                                                );
                                                                        let l =
                                                                            t
                                                                                .split(
                                                                                    '.'
                                                                                )
                                                                                .pop();
                                                                        l =
                                                                            l ===
                                                                            t
                                                                                ? ''
                                                                                : '.' +
                                                                                  l;
                                                                        const c =
                                                                            'resources/' +
                                                                            o +
                                                                            l;
                                                                        ((f[s][
                                                                            c
                                                                        ] = {
                                                                            [d]: e,
                                                                        }),
                                                                            (f[
                                                                                a
                                                                            ][
                                                                                c
                                                                            ] =
                                                                                n));
                                                                        const h =
                                                                            'xap:resources/' +
                                                                            o +
                                                                            l;
                                                                        i.push(
                                                                            h
                                                                        );
                                                                    } catch (e) {}
                                                                })
                                                        );
                                                    }
                                                }),
                                                    (t.resourceRefs = i));
                                            }
                                            o.push(t);
                                        }),
                                            (T.extensions = o));
                                    }
                                    e: {
                                        const e = Array.from(t.childNodes).find(
                                            (e) =>
                                                e.tagName &&
                                                'boundaries' ===
                                                    e.tagName.toLowerCase()
                                        );
                                        if (!e) break e;
                                        const r =
                                            e.getElementsByTagName('boundary');
                                        if (!r || !r.length) break e;
                                        const o = [];
                                        (Array.from(r).forEach((e) => {
                                            const t = {
                                                    id: e.getAttribute('id'),
                                                    range: e.getAttribute(
                                                        'range'
                                                    ),
                                                },
                                                r =
                                                    e.getElementsByTagName(
                                                        'title'
                                                    ) &&
                                                    e.getElementsByTagName(
                                                        'title'
                                                    )[0];
                                            if (r && r.firstChild) {
                                                const e =
                                                    r.firstChild.nodeValue;
                                                e &&
                                                    (t.title = e.replace(
                                                        /\r/g,
                                                        ''
                                                    ));
                                            }
                                            if (n) {
                                                const n =
                                                    e.getAttribute('style-id');
                                                if (i && n) {
                                                    const e =
                                                        i.getElementById(n);
                                                    if (e) {
                                                        const i =
                                                            e.getElementsByTagName(
                                                                'boundary-properties'
                                                            ) &&
                                                            e.getElementsByTagName(
                                                                'boundary-properties'
                                                            )[0];
                                                        if (i && i.attributes) {
                                                            t.style = {
                                                                type: 'boundary',
                                                            };
                                                            const e = {};
                                                            (Array.from(
                                                                i.attributes
                                                            ).forEach((t) => {
                                                                e[t.name] =
                                                                    t.value;
                                                            }),
                                                                (t.style.properties =
                                                                    e));
                                                        }
                                                    }
                                                }
                                            }
                                            o.push(t);
                                        }),
                                            (T.boundaries = o));
                                    }
                                    e: {
                                        const e = Array.from(t.childNodes).find(
                                            (e) =>
                                                e.tagName &&
                                                'summaries' ===
                                                    e.tagName.toLowerCase()
                                        );
                                        if (!e) break e;
                                        const i =
                                            e.getElementsByTagName('summary');
                                        if (!i) break e;
                                        const n = [];
                                        (Array.from(i).forEach((e) => {
                                            n.push({
                                                id: e.getAttribute('id'),
                                                range: e.getAttribute('range'),
                                                topicId:
                                                    e.getAttribute('topic-id'),
                                            });
                                        }),
                                            (T.summaries = n));
                                    }
                                    e: {
                                        T.children = {};
                                        const i = Array.from(
                                            t.childNodes
                                        ).filter(
                                            (e) =>
                                                e.tagName &&
                                                'children' ===
                                                    e.tagName.toLowerCase()
                                        );
                                        if (!i[0]) break e;
                                        const n = (t) => {
                                            const n = Array.from(
                                                i[0].childNodes
                                            ).find(
                                                (e) =>
                                                    e.tagName &&
                                                    'topics' ===
                                                        e.tagName.toLowerCase() &&
                                                    e.getAttribute('type') === t
                                            );
                                            if (n) {
                                                T.children[t] = [];
                                                const i = Array.from(
                                                    n.childNodes
                                                ).filter(
                                                    (e) =>
                                                        e.tagName &&
                                                        'topic' ===
                                                            e.tagName.toLowerCase()
                                                );
                                                for (const n in i) {
                                                    const r = i[n];
                                                    u.push(
                                                        e(r).then((e) => {
                                                            T.children[t][n] =
                                                                e;
                                                        })
                                                    );
                                                }
                                            }
                                        };
                                        (n('attached'),
                                            n('detached'),
                                            n('summary'),
                                            n('callout'));
                                    }
                                    Promise.all(u).then(() => {
                                        l(T);
                                    });
                                });
                            })(
                                e.getElementsByTagName('topic') &&
                                    e.getElementsByTagName('topic')[0]
                            ).then((e) => {
                                ((g.rootTopic = e), t());
                            });
                        }),
                    ]).then(t);
                })
            );
        }
        function q(e, t) {
            function i(e, n, r) {
                if (
                    ((o = r),
                    Array.isArray(o) ||
                        '[object Array]' ===
                            Object.prototype.toString.call(o) ||
                        (function (e) {
                            const t = typeof e;
                            return 'function' === t || ('object' === t && !!e);
                        })(r))
                )
                    for (const e in r) i(r, e, r[e]);
                else
                    'string' == typeof r &&
                        (r.startsWith('xap:resources') ||
                            r.startsWith('xap:attachments')) &&
                        (t.includes(r) || delete e[n]);
                var o;
            }
            for (const t in e) i(e, t, e[t]);
        }
        function ee(e, t = {}) {
            return new Promise((i, n) => {
                if (!e) return n('MUST have a valid xmind file.');
                const C = J(e, E, N);
                if (!C) return n('MUST have a manifest.xml file');
                const { password: M } = t,
                    A = new o.DOMParser();
                C.async('string')
                    .then((e) =>
                        (function (e) {
                            const t = { [s]: {}, [c]: '' },
                                i = e
                                    .getElementsByTagName('manifest')[0]
                                    .getAttribute(c);
                            t[c] = i;
                            const n = e.getElementsByTagName(l);
                            for (const e of Array.from(n)) {
                                const i = e.getAttribute('full-path');
                                t[s][i] = {};
                                const n =
                                    e.getElementsByTagName(d) &&
                                    e.getElementsByTagName(d)[0];
                                if (n) {
                                    ((t[s][i][d] = {}),
                                        (t[s][i][d][f] = n.getAttribute(f)),
                                        (t[s][i][d][h] = n.getAttribute(h)),
                                        (t[s][i][d][T] = n
                                            .getElementsByTagName(
                                                'algorithm'
                                            )[0]
                                            .getAttribute(T)));
                                    const e =
                                        n.getElementsByTagName(u) &&
                                        n.getElementsByTagName(u)[0];
                                    ((t[s][i][d][g] = e.getAttribute(g)),
                                        (t[s][i][d][p] = e.getAttribute(p)),
                                        (t[s][i][d][Q] = e.getAttribute(Q)),
                                        (t[s][i][d][m] = e.getAttribute(m)),
                                        (t[s][i][d][b] = e.getAttribute(b)));
                                }
                            }
                            return t;
                        })(A.parseFromString(e, 'application/xml'))
                    )
                    .then((t) => {
                        const i = [];
                        i.push(Promise.resolve(t));
                        const o = J(e, _, w),
                            a = t[s][_];
                        if (!o) return n('MUST have a content.xml file.');
                        i.push(
                            o
                                .async(a && a[d] ? 'base64' : 'string')
                                .then((e) => {
                                    const t = a ? a[d] : null;
                                    if (t) {
                                        e = V(e, G(M, t)).toString(
                                            r.a.enc.Utf8
                                        );
                                    }
                                    return A.parseFromString(
                                        e,
                                        'application/xml'
                                    );
                                })
                        );
                        const l = J(e, O, '/styles.xml'),
                            c = t[s][O];
                        l
                            ? i.push(
                                  l
                                      .async(c && c[d] ? 'base64' : 'string')
                                      .then((e) => {
                                          if (t[s][O]) {
                                              const i = t[s][O][d];
                                              if (i) {
                                                  e = V(e, G(M, i)).toString(
                                                      r.a.enc.Utf8
                                                  );
                                              }
                                              return A.parseFromString(
                                                  e,
                                                  'application/xml'
                                              );
                                          }
                                          return null;
                                      })
                              )
                            : i.push(Promise.resolve(null));
                        const f = J(e, x, '/markers/markerSheet.xml'),
                            h = t[s][x];
                        f
                            ? i.push(
                                  f
                                      .async(h && h[d] ? 'base64' : 'string')
                                      .then((e) => {
                                          if (t[s][x]) {
                                              const i = t[s][x][d];
                                              if (i) {
                                                  e = V(e, G(M, i)).toString(
                                                      r.a.enc.Utf8
                                                  );
                                              }
                                              return A.parseFromString(
                                                  e,
                                                  'application/xml'
                                              );
                                          }
                                          return null;
                                      })
                              )
                            : i.push(Promise.resolve(null));
                        const p = J(e, S, '/comments.xml'),
                            T = t[s][S];
                        return (
                            p
                                ? i.push(
                                      p
                                          .async(
                                              T && T[d] ? 'base64' : 'string'
                                          )
                                          .then((e) => {
                                              if (t[s][S]) {
                                                  const i = t[s][S][d];
                                                  if (i) {
                                                      e = V(
                                                          e,
                                                          G(M, i)
                                                      ).toString(r.a.enc.Utf8);
                                                  }
                                                  return A.parseFromString(
                                                      e,
                                                      'application/xml'
                                                  );
                                              }
                                              return null;
                                          })
                                  )
                                : i.push(Promise.resolve(null)),
                            Promise.all(i)
                        );
                    })
                    .then(([t, r, o, l, c]) => {
                        const f = [],
                            h = {
                                [s]: { [y]: {}, [L]: {} },
                                [a]: {},
                            };
                        if (
                            (t[s][_] &&
                                t[s][_][d] &&
                                (h[s][y] = { [d]: t[s][_][d] }),
                            t[s][I] &&
                                t[s][I][d] &&
                                (h[s][L] = { [d]: t[s][I][d] }),
                            !r)
                        )
                            return n('password wrong.');
                        const p = [];
                        Array.from(r.getElementsByTagName('sheet')).forEach(
                            (i) => {
                                p.push(
                                    X(i, {
                                        stylesDOM: o,
                                        markersDOM: l,
                                        commentsDOM: c,
                                        sheetsArray: f,
                                        manifest: t,
                                        newManifest: h,
                                        zip: e,
                                        password: M,
                                    })
                                );
                            }
                        );
                        const T = J(e, R, '/Thumbnails/thumbnail.png'),
                            u = t[s][R];
                        if (u && T) {
                            const e = u[d];
                            p.push(
                                T.async(e ? 'base64' : 'uint8array').then(
                                    (t) => {
                                        try {
                                            if (e) {
                                                t = j(V(t, G(M, e)));
                                            }
                                            const i = R;
                                            ((h[s][i] = { [d]: e }),
                                                (h[a][i] = t));
                                        } catch (e) {}
                                    }
                                )
                            );
                        }
                        Promise.all(p).then(() => {
                            if (!f || !f.length) return n('password wrong.');
                            (q(
                                f,
                                Object.keys(h[a]).map((e) => 'xap:' + e)
                            ),
                                i({
                                    manifest: h,
                                    sheets: f,
                                    isOldVersion: !0,
                                }));
                        });
                    })
                    .catch((e) => {
                        n(e);
                    });
            });
        }
        var te = i(0);
        const ie = {
            'full-1': 'priority-1',
            'full-2': 'priority-2',
            'full-3': 'priority-3',
            'full-4': 'priority-4',
            'full-5': 'priority-5',
            'full-6': 'priority-6',
            clock: 'other-clock',
            desktop_new: 'other-calendar',
            help: 'other-question',
            idea: 'other-lightbulb',
            kaddressbook: 'other-phone',
            korn: 'other-email',
            mail: 'other-email',
            licq: 'other-people',
            messagebox_warning: 'other-exclam',
            ksmiletris: 'smiley-smile',
            flag: 'flag-red',
            yes: 'other-yes',
            no: 'other-no',
        };
        const ne = [
                te.TOPICSHAPE.RECT,
                te.TOPICSHAPE.ROUNDEDRECT,
                te.TOPICSHAPE.UNDERLINE,
                te.TOPICSHAPE.ELLIPSE,
                te.TOPICSHAPE.PARALLELOGRAM,
                te.TOPICSHAPE.PARALLELOGRAM,
                te.TOPICSHAPE.CLOUD,
            ],
            re = [
                te.BRANCHCONNECTION.CURVE,
                te.BRANCHCONNECTION.STRAIGHT,
                te.BRANCHCONNECTION.ELBOW,
                te.BRANCHCONNECTION.ROUNDEDELBOW,
                te.BRANCHCONNECTION.ROUNDEDELBOW,
            ],
            oe = {};
        function ae(e) {
            const t = JSON.parse(e),
                i = [],
                n = {
                    workbook: { id: k(), sheets: i, manifest: M },
                },
                r = {
                    id: k(t.id),
                    title: 'sheet',
                    rootTopic: se(t.rootTopic),
                    theme: le(t),
                };
            if (t.detachedTopics) {
                r.rootTopic.children.detached = [];
                for (const e of t.detachedTopics)
                    r.rootTopic.children.detached.push(se(e, !0));
            }
            return (
                t.relationships &&
                    (r.relationships = (function (e) {
                        const t = [];
                        for (const i of e) {
                            const e = {
                                id: k(i.id),
                                end1Id: oe[i.startNodeId],
                                end2Id: oe[i.endNodeId],
                                title: '',
                            };
                            t.push(e);
                        }
                        return t;
                    })(t.relationships)),
                i.push(r),
                n.workbook
            );
        }
        function se(e, t) {
            const i = { id: k(e.id), title: e.title };
            if (
                (e.note &&
                    e.note.text &&
                    (i.notes = { plain: { content: e.note.text } }),
                t && e.position)
            ) {
                const t = e.position
                    .substring(1, e.position.length - 2)
                    .split(',');
                2 === t.length
                    ? (i.position = {
                          x: parseFloat(t[0]),
                          y: parseFloat(t[1]),
                      })
                    : (i.position = { x: 100, y: 0 });
            }
            if (
                (e.style &&
                    (i.style = (function (e) {
                        const t = {};
                        e.fontName &&
                            (t[te.STYLE_KEYS.FONT_FAMILY] = e.fontName);
                        e.fontWeight &&
                            (t[te.STYLE_KEYS.FONT_WEIGHT] = e.fontWeight);
                        e.fontStyle &&
                            (t[te.STYLE_KEYS.FONT_STYLE] = e.fontStyle);
                        e.fontColor &&
                            (t[te.STYLE_KEYS.TEXT_COLOR] = de(e.fontColor));
                        e.fillColor &&
                            (t[te.STYLE_KEYS.FILL_COLOR] = de(e.fillColor));
                        e.topicShape &&
                            (t[te.STYLE_KEYS.SHAPE_CLASS] =
                                ne[e.topicShape] || te.TOPICSHAPE.ROUNDEDRECT);
                        e.lineColor &&
                            (t[te.STYLE_KEYS.LINE_COLOR] = de(e.lineColor));
                        e.lineWidth &&
                            (t[te.STYLE_KEYS.LINE_WIDTH] = Math.min(
                                5,
                                e.lineWidth
                            ));
                        e.lineType &&
                            (t[te.STYLE_KEYS.LINE_CLASS] =
                                re[e.lineType] || te.BRANCHCONNECTION.CURVE);
                        return { id: k(), properties: t };
                    })(e.style)),
                (oe[e.id] = i.id),
                e.subtopics)
            ) {
                i.children = { attached: [] };
                for (const t of e.subtopics) i.children.attached.push(se(t));
            }
            return i;
        }
        function le({ colorTheme: e, skeletonTheme: t }) {
            const i = { map: { type: 'map', properties: {} } };
            return (
                t.mapStyle &&
                    t.mapStyle.taperedLine &&
                    (i.map.properties[te.STYLE_KEYS.LINE_TAPERED] = 'tapered'),
                e.mapStyle &&
                    e.mapStyle.fillColor &&
                    (i.map.properties[te.STYLE_KEYS.FILL_COLOR] = de(
                        e.mapStyle.fillColor
                    )),
                (i.centralTopic = {
                    type: 'topic',
                    properties: {},
                }),
                ce(
                    i.centralTopic.properties,
                    fe(t.topicStyleForCentral, e.topicStyleForCentral)
                ),
                (i.mainTopic = { type: 'topic', properties: {} }),
                ce(
                    i.mainTopic.properties,
                    fe(t.topicStyleForMain, e.topicStyleForMain)
                ),
                (i.subTopic = { type: 'topic', properties: {} }),
                ce(
                    i.subTopic.properties,
                    fe(t.topicStyleForSubtopic, e.topicStyleForSubtopic)
                ),
                (i.floatingTopic = {
                    type: 'topic',
                    properties: {},
                }),
                ce(
                    i.floatingTopic.properties,
                    fe(t.topicStyleForFloating, e.topicStyleForFloating)
                ),
                (i.calloutTopic = {
                    type: 'topic',
                    properties: {},
                }),
                (i.relationship = {
                    type: 'relationship',
                    properties: {},
                }),
                e.relationshipStyle &&
                    (e.relationshipStyle.lineColor &&
                        (i.relationship.properties[te.STYLE_KEYS.LINE_COLOR] =
                            de(e.relationshipStyle.lineColor)),
                    e.relationshipStyle.lineWidth &&
                        (i.relationship.properties[te.STYLE_KEYS.LINE_WIDTH] =
                            Math.min(5, e.relationshipStyle.lineWidth))),
                i
            );
        }
        function ce(e, t) {
            (t.fillColor && (e[te.STYLE_KEYS.FILL_COLOR] = de(t.fillColor)),
                t.topicShape &&
                    (e[te.STYLE_KEYS.SHAPE_CLASS] =
                        ne[t.topicShape] || te.TOPICSHAPE.ROUNDEDRECT),
                t.lineColor && (e[te.STYLE_KEYS.LINE_COLOR] = de(t.lineColor)),
                t.lineWidth &&
                    (e[te.STYLE_KEYS.LINE_WIDTH] = Math.min(5, t.lineWidth)),
                t.lineType &&
                    (e[te.STYLE_KEYS.LINE_CLASS] =
                        re[t.lineType] || te.BRANCHCONNECTION.CURVE),
                t.fontName && (e[te.STYLE_KEYS.FONT_FAMILY] = t.fontName),
                t.fontWeight && (e[te.STYLE_KEYS.FONT_WEIGHT] = t.fontWeight),
                t.fontStyle && (e[te.STYLE_KEYS.FONT_STYLE] = t.fontStyle),
                t.fontColor && (e[te.STYLE_KEYS.TEXT_COLOR] = de(t.fontColor)));
        }
        function de(e) {
            const t = e.replace('{', '').replace('}', '').split(',');
            if (0 === t[3]) return '#ffffff';
            let i = '#';
            return (
                t.slice(0, 3).forEach((e) => {
                    i += (e < 16 ? '0' : '') + Number(e).toString(16);
                }),
                i
            );
        }
        function fe(...e) {
            const t = {};
            if (e && e.length)
                for (let i = 0; i < e.length; i++) Object.assign(t, e[i]);
            return t;
        }
        var he = i(47),
            pe = i.n(he);
        const Te = 'file-entries',
            ue = 'resources',
            ge = 'content.json',
            Qe = 'metadata.json',
            me = {
                'urn:mindjet:SmileyHappy': 'smiley-smile',
                'urn:mindjet:SmileyAngry': 'smiley-angry',
                'urn:mindjet:SmileyNeutral': 'smiley-boring',
                'urn:mindjet:SmileySad': 'smiley-cry',
                'urn:mindjet:SmileyScreaming': 'smiley-surprise',
                'urn:mindjet:FlagGreen': 'flag-green',
                'urn:mindjet:FlagYellow': 'flag-orange',
                'urn:mindjet:FlagPurple': 'flag-purple',
                'urn:mindjet:FlagBlack': 'flag-black',
                'urn:mindjet:FlagBlue': 'flag-blue',
                'urn:mindjet:FlagOrange': 'flag-orange',
                'urn:mindjet:FlagRed': 'flag-red',
                'urn:mindjet:Calendar': 'other-calendar',
                'urn:mindjet:Clock': 'other-clock',
                'urn:mindjet:CoffeeCup': 'other-coffee-cup',
                'urn:mindjet:Email': 'other-email',
                'urn:mindjet:Mailbox': 'other-email',
                'urn:mindjet:Fax': 'other-fax',
                'urn:mindjet:Lightbulb': 'other-lightbulb',
                'urn:mindjet:Phone': 'other-phone',
                'urn:mindjet:Cellphone': 'other-phone',
                'urn:mindjet:Resource1': 'other-people',
                'urn:mindjet:Resource2': 'other-people',
                'urn:mindjet:QuestionMark': 'other-question',
                'urn:mindjet:ExclamationMark': 'other-exclam',
                0: 'task-start',
                10: 'task-oct',
                25: 'task-quarter',
                35: 'task-3oct',
                50: 'task-half',
                65: 'task-5oct',
                75: 'task-3quar',
                90: 'task-7oct',
                100: 'task-done',
                'urn:mindjet:Prio1': 'priority-1',
                'urn:mindjet:Prio2': 'priority-2',
                'urn:mindjet:Prio3': 'priority-3',
                'urn:mindjet:Prio4': 'priority-4',
                'urn:mindjet:Prio5': 'priority-5',
                'urn:mindjet:Prio6': 'priority-6',
                'urn:mindjet:Prio7': 'priority-7',
                'urn:mindjet:Prio8': 'priority-8',
                'urn:mindjet:Prio9': 'priority-9',
                'urn:mindjet:ArrowUp': 'arrow-up',
                'urn:mindjet:ArrowDown': 'arrow-down',
                'urn:mindjet:ArrowLeft': 'arrow-left',
                'urn:mindjet:ArrowRight': 'arrow-right',
            },
            be = {
                'urn:mindjet:RoundedRectangle': te.TOPICSHAPE.ROUNDEDRECT,
                'urn:mindjet:Rectangle': te.TOPICSHAPE.RECT,
                'urn:mindjet:Line': te.TOPICSHAPE.UNDERLINE,
                'urn:mindjet:Oval': te.TOPICSHAPE.ELLIPSE,
                'urn:mindjet:Circle': te.TOPICSHAPE.CIRCLE,
                'urn:mindjet:Hexagon': te.TOPICSHAPE.ROUNDEDRECT,
                'urn:mindjet:Octagon': te.TOPICSHAPE.ROUNDEDRECT,
                'urn:mindjet:Capsule': te.TOPICSHAPE.ROUNDEDRECT,
                'urn:mindjet:Data': te.TOPICSHAPE.PARALLELOGRAM,
                'urn:mindjet:Diamond': te.TOPICSHAPE.DIAMOND,
                'urn:mindjet:None': te.TOPICSHAPE.NOBORDER,
            },
            Ce = {
                'urn:mindjet:RectangleBalloon': te.CALLOUTSHAPE.RECT,
                'urn:mindjet:RoundedRectangleBalloon':
                    te.CALLOUTSHAPE.ROUNDEDRECT,
                'urn:mindjet:OvalBalloon': te.CALLOUTSHAPE.ELLIPSE,
            },
            Le = {
                'urn:mindjet:None': te.BRANCHCONNECTION.NONE,
                'urn:mindjet:Elbow': te.BRANCHCONNECTION.ELBOW,
                'urn:mindjet:Curve': te.BRANCHCONNECTION.CURVE,
                'urn:mindjet:Straight': te.BRANCHCONNECTION.STRAIGHT,
                'urn:mindjet:RoundedElbow': te.BRANCHCONNECTION.ROUNDEDELBOW,
            },
            ye = {
                'urn:mindjet:Rectangle': te.BOUNDARYSHAPE.RECT,
                'urn:mindjet:CurvedRectangle': te.BOUNDARYSHAPE.ROUNDEDRECT,
                'urn:mindjet:Scallops': te.BOUNDARYSHAPE.SCALLOPS,
                'urn:mindjet:Waves': te.BOUNDARYSHAPE.WAVES,
                'urn:mindjet:Zigzag': te.BOUNDARYSHAPE.TENSION,
                'urn:mindjet:CurvedLine': te.BOUNDARYSHAPE.ROUNDEDPOLYGON,
                'urn:mindjet:Lines': te.BOUNDARYSHAPE.POLYGON,
            },
            Me = {
                'urn:mindjet:Solid': te.LINE_PATTERN.SOLID,
                'urn:mindjet:Dash': te.LINE_PATTERN.DASH,
                'urn:mindjet:RoundDot': te.LINE_PATTERN.DOT,
                'urn:mindjet:DashDot': te.LINE_PATTERN.DASHDOT,
                'urn:mindjet:LongDashDotDot': te.LINE_PATTERN.DASHDOTDOT,
            },
            Ae = {
                'urn:mindjet:Angled': te.RELATIONSHIPSHAPE.ANGLED,
                'urn:mindjet:Bezier': te.RELATIONSHIPSHAPE.CURVED,
                'urn:mindjet:Straight': te.RELATIONSHIPSHAPE.STRAIGHT,
            },
            ve = {
                'urn:mindjet:DiamondArrow': te.ARROW_CLASS.DIAMOND,
                'urn:mindjet:OvalArrow': te.ARROW_CLASS.DOT,
                'urn:mindjet:StealthArrow': te.ARROW_CLASS.SPEARHEAD,
                'urn:mindjet:OpenArrow': te.ARROW_CLASS.NORMAL,
                'urn:mindjet:Arrow': te.ARROW_CLASS.TRIANGLE,
                'urn:mindjet:NoArrow': te.ARROW_CLASS.NONE,
            },
            Ee = {
                'urn:mindjet:SummaryElbow': te.SUMMARYCONNECTION.SQUARE,
                'urn:mindjet:SummaryShearedElbow': te.SUMMARYCONNECTION.ANGLE,
                'urn:mindjet:SummaryArc': te.SUMMARYCONNECTION.CURLY,
                'urn:mindjet:SummaryCurve': te.SUMMARYCONNECTION.ROUND,
            },
            _e = {
                1: te.NUMBERFORMAT.ARABIC,
                i: te.NUMBERFORMAT.ROMAN,
                I: te.NUMBERFORMAT.ROMAN,
                A: te.NUMBERFORMAT.UPPERCASE,
                a: te.NUMBERFORMAT.LOWERCASE,
            },
            Oe = {
                ',': te.NUMBERSEPARATOR.COMMA,
                '.': te.NUMBERSEPARATOR.DOT,
                '-': te.NUMBERSEPARATOR.HYPHEN,
                '/': te.NUMBERSEPARATOR.OBLIQUE,
            };
        var Se = i(145),
            xe = i.n(Se),
            Re = i(16);
        const Ie = '[import markdown]',
            Ne = new xe.a.Parser(),
            we = 'text',
            Pe = 'softbreak',
            He = 'linebreak',
            De = 'emph',
            Fe = 'strong',
            ke = 'html_inline',
            Be = 'link',
            Ve = 'image',
            Ye = 'code',
            Ge = 'document',
            Ue = 'paragraph',
            je = 'block_quote',
            $e = 'item',
            ze = 'list',
            We = 'heading',
            Ke = 'code_block',
            Ze = 'html_block',
            Je = 'thematic_break',
            Xe = 'from_text',
            qe = 'textBundle',
            et = 'MANIFEST_STRUCTURAL',
            tt = {
                [we]: [3, 3],
                [Pe]: [3, 3],
                [He]: [3, 3],
                [De]: [3, 3],
                [Fe]: [3, 3],
                [ke]: [3, 3],
                [Be]: [3, 3],
                [Ve]: [3, 3],
                [Ye]: [3, 3],
                [Ge]: [2, 3],
                [Ue]: [2, 3],
                [je]: [2, 3],
                [$e]: [2, 2],
                [ze]: [2, 2],
                [We]: [2, 2],
                [Ke]: [2, 3],
                [Ze]: [2, 3],
                [Je]: [2, 3],
                [Xe]: [2, 2],
            };
        function it(e) {
            return 2 === tt[e.type][1];
        }
        function nt(e) {
            return 3 === tt[e.type][1];
        }
        function rt(e, t) {
            t = t || 1;
            let i = e;
            for (; t > 0; ) {
                if (((i = (null == i ? void 0 : i.parent) || null), !i))
                    return null;
                t -= 1;
            }
            return i || null;
        }
        function ot(e) {
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
                h,
                p,
                T,
                u,
                g,
                Q,
                m,
                b,
                C,
                L,
                y,
                M,
                A,
                v;
            switch (e.type) {
                case Be:
                    if (
                        (null === (t = rt(e)) || void 0 === t
                            ? void 0
                            : t.type) === We ||
                        ((null === (i = rt(e)) || void 0 === i
                            ? void 0
                            : i.type) === Ue &&
                            (null === (n = rt(e, 2)) || void 0 === n
                                ? void 0
                                : n.type) === $e)
                    )
                        return !0;
                    break;
                case we:
                    if (
                        (null === (r = e.parent) || void 0 === r
                            ? void 0
                            : r.type) === Be
                    )
                        return !0;
                    if (
                        ((null === (o = rt(e)) || void 0 === o
                            ? void 0
                            : o.type) === De ||
                            (null === (a = rt(e)) || void 0 === a
                                ? void 0
                                : a.type) === Fe) &&
                        (null === (s = rt(e, 2)) || void 0 === s
                            ? void 0
                            : s.type) === Be &&
                        ((null === (l = rt(e, 3)) || void 0 === l
                            ? void 0
                            : l.type) === We ||
                            ((null === (c = rt(e, 3)) || void 0 === c
                                ? void 0
                                : c.type) === Ue &&
                                (null === (d = rt(e, 4)) || void 0 === d
                                    ? void 0
                                    : d.type) === $e))
                    )
                        return !0;
                    if (
                        (null === (f = rt(e)) || void 0 === f
                            ? void 0
                            : f.type) === Fe &&
                        (null === (h = rt(e, 2)) || void 0 === h
                            ? void 0
                            : h.type) === De &&
                        (null === (p = rt(e, 3)) || void 0 === p
                            ? void 0
                            : p.type) === Be &&
                        ((null === (T = rt(e, 4)) || void 0 === T
                            ? void 0
                            : T.type) === We ||
                            ((null === (u = rt(e, 4)) || void 0 === u
                                ? void 0
                                : u.type) === Ue &&
                                (null === (g = rt(e, 5)) || void 0 === g
                                    ? void 0
                                    : g.type) === $e))
                    )
                        return !0;
                    break;
                case De:
                case Fe:
                    if (
                        (null === (Q = rt(e)) || void 0 === Q
                            ? void 0
                            : Q.type) === Be &&
                        ((null === (m = rt(e, 2)) || void 0 === m
                            ? void 0
                            : m.type) === We ||
                            ((null === (b = rt(e, 2)) || void 0 === b
                                ? void 0
                                : b.type) === Ue &&
                                (null === (C = rt(e, 3)) || void 0 === C
                                    ? void 0
                                    : C.type) === $e))
                    )
                        return !0;
                    if (
                        (null === (L = rt(e)) || void 0 === L
                            ? void 0
                            : L.type) === De &&
                        (null === (y = rt(e, 2)) || void 0 === y
                            ? void 0
                            : y.type) === Be &&
                        ((null === (M = rt(e, 3)) || void 0 === M
                            ? void 0
                            : M.type) === We ||
                            ((null === (A = rt(e, 3)) || void 0 === A
                                ? void 0
                                : A.type) === Ue &&
                                (null === (v = rt(e, 4)) || void 0 === v
                                    ? void 0
                                    : v.type) === $e))
                    )
                        return !0;
            }
            let E = e;
            for (; E; ) {
                if (it(E)) return !1;
                E = E.parent;
            }
            return !0;
        }
        function at(e, t) {
            let i = e;
            for (; i && !(i.level < t); ) i = i.parent;
            return i || null;
        }
        function st(e) {
            let t = '',
                i = 0,
                n = e.firstChild;
            for (; n; )
                (n.type === we && n.literal && ((i += 1), (t += n.literal)),
                    (n = n.next));
            return { text: t, textFragmentCount: i };
        }
        async function lt(e, t) {
            if (!new RegExp(`^/?${P}`).test(e)) return null;
            const i = new RegExp(`/?${e}`),
                n = t.file(i)[0];
            if (!n) return null;
            const o = await n.async('uint8array');
            if (!o) return null;
            const a = r.a.algo.SHA256.create()
                .update(r.a.lib.WordArray.create(o))
                .finalize()
                .toString(r.a.enc.Hex);
            let s = e.split('.').pop();
            return (
                (s = s === e ? '' : `.${s}`),
                {
                    src: `xap:resources/${a}${s}`,
                    fileEntry: `resources/${a}${s}`,
                    content: o,
                }
            );
        }
        class ct {
            constructor(e) {
                ((this._buffer = []),
                    (this._inEquationBlock = !1),
                    (this._docNode = e));
            }
            mount(e) {
                this._context = e;
            }
            unmount() {
                this._context = void 0;
            }
            push(e) {
                const t = this.applyConvertPatterns(e);
                return this._buffer.push(t);
            }
            toArray() {
                return Array.from(this._buffer);
            }
            join(e) {
                return this.toArray().join(e);
            }
            hasEquation(e) {
                var t, i, n, r, o, a;
                const s = e.literal || '',
                    l = /\$(.*?)\$/.test(s),
                    c =
                        (null === (t = rt(e)) || void 0 === t
                            ? void 0
                            : t.type) === We;
                if (l && c) return !0;
                const d =
                    (null === (i = rt(e)) || void 0 === i ? void 0 : i.type) ===
                        Ue &&
                    (null === (n = rt(e, 2)) || void 0 === n
                        ? void 0
                        : n.type) === $e;
                if (l && d) return !0;
                return !(
                    (null === (r = rt(e)) || void 0 === r ? void 0 : r.type) !==
                        Ue ||
                    (null ===
                        (a =
                            null === (o = rt(e)) || void 0 === o
                                ? void 0
                                : o.prev) || void 0 === a
                        ? void 0
                        : a.type) === Ue
                );
            }
            preProcessEquation(e) {
                var t;
                if ('$$' === e)
                    return (
                        (this._inEquationBlock = !this._inEquationBlock),
                        ''
                    );
                if (this._inEquationBlock)
                    return (this._docNode.equations.push(e), '');
                {
                    const i =
                        null === (t = e.match(/\$(.*?)\$/g)) || void 0 === t
                            ? void 0
                            : t
                                  .map((e) => e.replace(/\$/g, ''))
                                  .filter((e) => '' !== e);
                    i &&
                        i.length > 0 &&
                        (i.forEach((e) => this._docNode.equations.push(e)),
                        (e = e.replace(/\$(.*?)\$/g, '')));
                }
                return e;
            }
            applyConvertPatterns(e) {
                const t = this._context;
                if (
                    (this.hasEquation(t.node) &&
                        (e = this.preProcessEquation(e)),
                    '' === e)
                )
                    return e;
                return ct.CONVERT_PATTERNS.reduce((e, i) => {
                    const { from: n, to: r } = i;
                    return 'string' == typeof r
                        ? e.replace(n, r)
                        : t
                          ? ot(t.node) && void 0 !== r.note
                              ? 'string' == typeof r.note
                                  ? e.replace(n, r.note)
                                  : e.replace(
                                        n,
                                        t.entering
                                            ? r.note.isEntering
                                            : r.note.notEntering
                                    )
                              : nt(t.node) && void 0 !== r.text
                                ? 'string' == typeof r.text
                                    ? e.replace(n, r.text)
                                    : e.replace(
                                          n,
                                          t.entering
                                              ? r.text.isEntering
                                              : r.text.notEntering
                                      )
                                : e
                          : e;
                }, e);
            }
        }
        ct.CONVERT_PATTERNS = [
            { from: /<!--[^>]*-->/, to: '' },
            { from: '<br>', to: { note: '<br>', text: '\n' } },
            { from: '  \n', to: { note: '<br>', text: '\n' } },
            { from: '\n\n', to: { note: '<br>', text: '\n' } },
            { from: '\r\n', to: { note: '<br>', text: '\n' } },
            { from: '&nbsp', to: { note: '&nbsp', text: ' ' } },
            { from: '> ', to: { note: '' } },
            {
                from: '***',
                to: {
                    note: {
                        isEntering: '<i><b>',
                        notEntering: '</b></i>',
                    },
                    text: '***',
                },
            },
            {
                from: '**',
                to: {
                    note: {
                        isEntering: '<b>',
                        notEntering: '</b>',
                    },
                    text: '**',
                },
            },
            {
                from: '*',
                to: {
                    note: {
                        isEntering: '<i>',
                        notEntering: '</i>',
                    },
                    text: '*',
                },
            },
        ];
        class dt {
            constructor(e = -1, t = 'heading') {
                ((this.contents = new ct(this)),
                    (this.notes = new ct(this)),
                    (this.equations = []),
                    (this.children = []),
                    (this.floatTopics = []),
                    (this.listDelimiter = 0),
                    (this._parent = null),
                    (this.level = e),
                    (this.type = t),
                    (this.isFloating = !1),
                    (this.floatCoordinate = { x: 0, y: 0 }),
                    (this.listNestedLevel = 0),
                    (this.image = null),
                    (this.href = null));
            }
            get parent() {
                return this._parent;
            }
            set parent(e) {
                e && ((this._parent = e), e.children.push(this));
            }
            toJSON() {
                let e = this.contents.join('');
                this.listDelimiter && (e = `${this.listDelimiter}. ${e}`);
                const t = { id: k(), title: e };
                if (this.notes.join('')) {
                    const e = this.notes.join('');
                    t.notes = {
                        plain: { content: e },
                        realHTML: { content: e },
                        ops: { ops: [{ insert: `${e}\n` }] },
                        html: {
                            content: {
                                paragraph: e
                                    .replace('\n\n', ' ')
                                    .split(' ')
                                    .map((e) => ({
                                        span: [
                                            {
                                                text: ' ' === e ? '' : e,
                                            },
                                        ],
                                    })),
                            },
                        },
                    };
                }
                const i = this.equations.filter((e) => '' !== e),
                    n =
                        i.length > 0
                            ? `\\displaylines{${i.join('\\\\')}}`
                            : this.equations.join('\n');
                return (
                    n &&
                        (t.extensions = [
                            {
                                provider: te.EXTENSION_PROVIDER.MATH_JAX,
                                content: { content: n },
                            },
                        ]),
                    this.href && (t.href = this.href),
                    this.image && (t.image = this.image),
                    this.isFloating && (t.position = this.floatCoordinate),
                    (t.children = {
                        attached: this.children.map((e) => e.toJSON()),
                    }),
                    this.floatTopics.length &&
                        (t.children.detached = this.floatTopics.map((e) =>
                            e.toJSON()
                        )),
                    t
                );
            }
        }
        async function ft(e) {
            let t = '',
                i = '';
            if (e instanceof pe.a) {
                const n = new RegExp('text.[^./]+$'),
                    r = e.filter((e) => n.test(e))[0];
                if (!r) throw new Error('No content');
                ((t = await r.async('string').catch((e) => {
                    throw new Error('No content');
                })),
                    (i = qe));
            } else 'string' == typeof e && (t = e);
            const n = Ne.parse(t).walker(),
                r = { MANIFEST_STRUCTURAL: M, attachmentsMap: {} };
            let o,
                l = null,
                c = null,
                d = !1,
                f = -50,
                h = 0;
            const p = [],
                T = [];
            for (let t = n.next(); t; t = n.next()) {
                const u = t.node;
                if (u.type !== Ge)
                    if (t.entering) {
                        if (it(u))
                            switch (u.type) {
                                case We: {
                                    const e = new dt(u.level, u.type);
                                    if (l)
                                        if (
                                            (c ||
                                                Re.b
                                                    .get(te.CONFIG.LOGGER)
                                                    .error({
                                                        [Ie]: 'currentTopic cursor exception',
                                                    }),
                                            c.type === We ||
                                                c.type === $e ||
                                                c.type === Xe)
                                        ) {
                                            const t = at(c, e.level);
                                            t
                                                ? (e.parent = t)
                                                : ((e.isFloating = !0),
                                                  (e.floatCoordinate = {
                                                      x: (f += 0),
                                                      y: (h += 150),
                                                  }),
                                                  p.push(e));
                                        } else
                                            Re.b.get(te.CONFIG.LOGGER).error({
                                                [Ie]: 'currentTopic has Invalid type',
                                            });
                                    else l = e;
                                    c = e;
                                    break;
                                }
                                case ze:
                                    ('bullet' === u.listType && T.push(0),
                                        'ordered' === u.listType &&
                                            T.push(u.listStart));
                                    break;
                                case $e: {
                                    const e = new dt(100, u.type),
                                        t = T[T.length - 1];
                                    if (
                                        (t &&
                                            ((e.listDelimiter = t),
                                            (T[T.length - 1] = t + 1)),
                                        l)
                                    ) {
                                        c ||
                                            Re.b.get(te.CONFIG.LOGGER).error({
                                                [Ie]: 'currentTopic cursor exception',
                                            });
                                        const t = T.length;
                                        if (
                                            ((e.listNestedLevel = t),
                                            c.type === We || c.type === Xe)
                                        )
                                            e.parent = c;
                                        else if (c.type === $e) {
                                            e.level =
                                                c.level +
                                                (t - c.listNestedLevel);
                                            const i = at(c, e.level);
                                            i
                                                ? (e.parent = i)
                                                : ((e.isFloating = !0),
                                                  (e.floatCoordinate = {
                                                      x: (f += 0),
                                                      y: (h += 150),
                                                  }),
                                                  p.push(e));
                                        } else
                                            Re.b.get(te.CONFIG.LOGGER).error({
                                                [Ie]: 'currentTopic has Invalid type',
                                            });
                                    } else l = e;
                                    c = e;
                                    break;
                                }
                            }
                        else if (nt(u)) {
                            switch (
                                (l || ((c = l = new dt(1, Xe)), (d = !0)),
                                (o = ot(u) ? c.notes : c.contents),
                                o.mount(t),
                                u.type)
                            ) {
                                case Pe:
                                case He:
                                    o.push('\n');
                                    break;
                                case Be:
                                    if (i === qe)
                                        if (ot(u)) o.push('[');
                                        else if (
                                            /^https?:\/\//.test(u.destination)
                                        )
                                            c.href = u.destination;
                                        else if (
                                            r.attachmentsMap[u.destination]
                                        )
                                            c.href =
                                                r.attachmentsMap[
                                                    u.destination
                                                ].src;
                                        else {
                                            const t = await lt(
                                                u.destination,
                                                e
                                            );
                                            t
                                                ? ((c.href = t.src),
                                                  (r.attachmentsMap[
                                                      u.destination
                                                  ] = t),
                                                  (r[et][s][t.fileEntry] = {}),
                                                  (r[et][a][t.fileEntry] =
                                                      t.content))
                                                : o.push('[');
                                        }
                                    else ot(u) || o.push('[');
                                    if (i === qe && c.href) {
                                        const {
                                            text: e,
                                            textFragmentCount: i,
                                        } = st(u);
                                        o.push(e);
                                        let r = i;
                                        for (; r; ) ((t = n.next()), (r -= 1));
                                        t = n.next();
                                    }
                                    break;
                                case Ve:
                                    if (i === qe)
                                        if (ot(u)) o.push('![');
                                        else if (
                                            r.attachmentsMap[u.destination]
                                        )
                                            c.image = {
                                                src: r.attachmentsMap[
                                                    u.destination
                                                ].src,
                                            };
                                        else {
                                            const t = await lt(
                                                u.destination,
                                                e
                                            );
                                            t
                                                ? ((c.image = {
                                                      src: t.src,
                                                  }),
                                                  (r.attachmentsMap[
                                                      u.destination
                                                  ] = t),
                                                  (r[et][s][t.fileEntry] = {}),
                                                  (r[et][a][t.fileEntry] =
                                                      t.content))
                                                : o.push('![');
                                        }
                                    else o.push('![');
                                    if (i === qe && c.image) {
                                        const {
                                            text: e,
                                            textFragmentCount: i,
                                        } = st(u);
                                        o.push(e);
                                        let r = i;
                                        for (; r; ) ((t = n.next()), (r -= 1));
                                        t = n.next();
                                    }
                                    break;
                                case je:
                                    o.push('> ');
                                    break;
                                case Je:
                                    o.push('---');
                                    break;
                                case Fe:
                                    o.push('**');
                                    break;
                                case De:
                                    o.push('*');
                                    break;
                                case Ke:
                                    (o.push(`\`\`\` ${u.info}\n`),
                                        o.push(u.literal),
                                        o.push('```\n\n'));
                                    break;
                                case Ye:
                                    o.push(`\`${u.literal}\``);
                                    break;
                                default:
                                    if (u.literal)
                                        if (d) {
                                            let e = u.literal;
                                            (u.literal.length > 9 &&
                                                (e = `${e.substring(0, 9)}...`),
                                                l.contents.mount(t),
                                                l.contents.push(e),
                                                l.contents.unmount(),
                                                o.push(u.literal),
                                                (d = !1));
                                        } else o.push(u.literal);
                            }
                            o.unmount();
                        }
                    } else {
                        switch (
                            ((o = ot(u) ? c.notes : c.contents),
                            o.mount(t),
                            u.type)
                        ) {
                            case Be:
                                o.push(` ${u.destination}\n`);
                                break;
                            case Ve:
                                (o.push(']'), o.push(`(${u.destination})`));
                                break;
                            case Ue:
                                ot(u) && o.push('\n\n');
                                break;
                            case Fe:
                                o.push('**');
                                break;
                            case De:
                                o.push('*');
                                break;
                            case ze:
                                T.pop();
                        }
                        o.unmount();
                    }
            }
            if (!l) throw new Error('No content');
            return (
                (l.floatTopics = p),
                (function (e, t) {
                    return { id: k(), sheets: [e], manifest: t };
                })(
                    ((u = l),
                    {
                        id: k(),
                        title: 'sheet',
                        rootTopic: u.toJSON(),
                    }),
                    r[et]
                )
            );
            var u;
        }
        var ht = i(97),
            pt = i.n(ht),
            Tt = i(146),
            ut = i.n(Tt);
        const gt = 'mainNode',
            Qt = 'subnodes',
            mt = 'location',
            bt = 'attachment',
            Ct = {
                id: 'db791d1fe94b291056ad2839c5',
                importantTopic: {
                    type: 'topic',
                    properties: {
                        'fo:font-weight': 'bold',
                        'fo:color': '#FFFFFF',
                        'svg:fill': '#FF4600',
                    },
                },
                minorTopic: {
                    type: 'topic',
                    properties: {
                        'fo:font-weight': 'bold',
                        'fo:color': '#FFFFFF',
                        'svg:fill': '#FF7D00',
                    },
                },
                expiredTopic: {
                    type: 'topic',
                    properties: {
                        'fo:font-style': 'normal',
                        'fo:text-decoration': ' line-through',
                    },
                },
                centralTopic: {
                    properties: {
                        'fo:color': '#FFFFFF',
                        'svg:fill': '#FF535C',
                        'fo:font-weight': '600',
                        'fo:font-style': 'normal',
                        'fo:font-size': '20pt',
                        'line-color': '#434B54',
                        'fo:font-family': 'Nunito Sans',
                        'border-line-width': '0',
                    },
                    styleId: '39687c955b998eedc81008bf3f',
                    type: 'topic',
                },
                boundary: {
                    properties: {
                        'fo:color': '#F0B67F',
                        'fo:font-weight': '700',
                        'fo:font-style': 'normal',
                        'fo:font-size': '14pt',
                        'fo:font-family': 'Nunito Sans',
                        'line-color': '#F0B67F',
                        'svg:fill': '#FEF1E4',
                    },
                    styleId: '29f9b72a43c95e2d17c1ebd6c8',
                    type: 'boundary',
                },
                floatingTopic: {
                    properties: {
                        'svg:fill': '#494A46',
                        'border-line-color': '#F0B67F',
                        'border-line-width': '0',
                        'fo:color': '#FFFFFF',
                        'fo:font-family': 'Nunito Sans',
                        'line-color': '#F0B67F',
                        'line-class': 'org.xmind.branchConnection.curve',
                        'fo:font-weight': '600',
                        'fo:font-style': 'normal',
                        'line-width': '1pt',
                    },
                    styleId: '8edb0655eed84223023988f896',
                    type: 'topic',
                },
                subTopic: {
                    properties: {
                        'fo:color': '#494A46',
                        'fo:font-family': 'Nunito Sans',
                        'fo:text-align': 'left',
                        'fo:font-size': '11pt',
                    },
                    styleId: '83da5abc2c3805c13b7099fe0d',
                    type: 'topic',
                },
                mainTopic: {
                    properties: {
                        'svg:fill': '#DBE2E3',
                        'border-line-width': '0',
                        'fo:font-size': '14pt',
                        'fo:color': '#494A46',
                        'fo:font-family': 'Nunito Sans',
                        'line-class': 'org.xmind.branchConnection.curve',
                        'line-width': '1pt',
                    },
                    styleId: '486ba6c91609eb3e82849939f0',
                    type: 'topic',
                },
                calloutTopic: {
                    properties: {
                        'svg:fill': '#F0B67F',
                        'fo:font-weight': '600',
                        'fo:font-style': 'normal',
                        'fo:font-size': '14pt',
                        'fo:font-family': 'Nunito Sans',
                        'border-line-width': '0',
                        'fo:color': '#775D44',
                    },
                    styleId: '4379160bdc98a456dd60a8721d',
                    type: 'topic',
                },
                summary: {
                    properties: { 'line-color': '#434B54' },
                    styleId: '14394c4b1a5b6b534182699edf',
                    type: 'summary',
                },
                summaryTopic: {
                    properties: {
                        'svg:fill': '#494A46',
                        'border-line-width': '0pt',
                        'border-line-color': '#434B54',
                        'fo:font-weight': '600',
                        'fo:font-style': 'normal',
                        'fo:color': '#FFFFFF',
                        'fo:font-family': 'Nunito Sans',
                        'line-color': '#F0B67F',
                        'line-class': 'org.xmind.branchConnection.curve',
                        'line-width': '1pt',
                    },
                    styleId: '963bfcbd450931f641aef94ec5',
                    type: 'topic',
                },
                relationship: {
                    properties: {
                        'line-width': '3pt',
                        'line-pattern': 'solid',
                        'line-color': '#F0B67F',
                        'fo:color': '#F0B67F',
                        'fo:font-weight': '600',
                        'fo:font-family': 'Nunito Sans',
                        'fo:font-style': 'normal',
                    },
                    styleId: '67596f401d995d448791686b97',
                    type: 'relationship',
                },
            };
        async function Lt(e, t = {}, i = M) {
            const n = ut.a.parseBuffer(e);
            if (!n) throw new Error('No contents!');
            const r = n[0];
            if (!r) throw new Error('No content!');
            const o = new yt(r, t);
            return {
                id: k(),
                sheets: o.getWorkbookObject().workbook.sheets,
                manifest: i,
            };
        }
        class yt {
            constructor(e, t) {
                if (((this.resourceNameMap = t), e.mindMap)) {
                    const t = this.parseMindMapJSON(e.mindMap);
                    if (!t) throw new Error('Nod mindMap or parse error!');
                    this.workbook = t;
                } else {
                    const t = e.canvas;
                    if (!t) throw new Error('No canvas!');
                    const i = t.mindMaps;
                    if (!i) throw new Error('No mindMaps!');
                    const n = this.parseMindMapsJSON(i);
                    if (!n) throw new Error('No mindMap or parse error!');
                    this.workbook = n;
                }
            }
            getWorkbookObject() {
                return { workbook: this.workbook };
            }
            parseMindMapJSON(e) {
                const t = [],
                    i = { id: k(), title: 'sheet' },
                    n = e.mainNodes;
                if (!n || !n.length) return;
                const r = this.parseTopic(n[0]);
                if (r) {
                    if (n.length > 1) {
                        const e = this.parseMMLocation(n[0][mt]);
                        (r.children || (r.children = {}),
                            (r.children.detached = []));
                        for (let t = 1; t < n.length; t++) {
                            const i = this.parseTopic(n[t]),
                                o = this.parseMMLocation(n[t][mt]);
                            ((i.position = {
                                x: o.x - e.x,
                                y: o.y - e.y,
                            }),
                                r.children.detached.push(i));
                        }
                    }
                    return (
                        (i.rootTopic = r),
                        (i.theme = Ct),
                        t.push(i),
                        { sheets: t }
                    );
                }
            }
            parseMindMapsJSON(e) {
                if (!e.length) return;
                const t = [],
                    i = { id: k(), title: 'sheet' },
                    n = this.parseTopic(e[0][gt]);
                if (n) {
                    if (e.length > 1) {
                        const t = this.parseMMLocation(e[0][gt][mt]);
                        (n.children || (n.children = {}),
                            (n.children.detached = []));
                        for (let i = 1; i < e.length; i++) {
                            const r = this.parseTopic(e[i][gt]),
                                o = this.parseMMLocation(e[i][gt][mt]);
                            ((r.position = {
                                x: o.x - t.x,
                                y: o.y - t.y,
                            }),
                                n.children.detached.push(r));
                        }
                    }
                    return (
                        (i.rootTopic = n),
                        (i.theme = Ct),
                        t.push(i),
                        { sheets: t }
                    );
                }
            }
            parseTopic(e) {
                if (!e) return;
                const t = {
                    id: k(e.nodeID),
                    children: { attached: [] },
                };
                (this.parseTopicTitle(e.title, t),
                    e.fileLink && this.parseTopicFileLink(e.fileLink, t),
                    e[bt] && this.parseTopicAttachment(e[bt], t));
                if (
                    ((t.style = { id: k(), properties: {} }),
                    e[Qt] && e[Qt].length)
                )
                    for (const i of e[Qt])
                        t.children.attached.push(this.parseTopic(i));
                return t;
            }
            parseTopicTitle(e, t) {
                if (!e || !e.text) return '';
                const i = new DOMParser();
                let n = i.parseFromString(e.text, 'application/xml');
                if (!n) return '';
                n.getElementsByTagName('parsererror').length > 0 &&
                    (n = i.parseFromString(
                        `<p>${e.text}</p>`,
                        'application/xml'
                    ));
                const r = n.getElementsByTagName('a')[0];
                (r && (t.href = r.getAttribute('href')),
                    (t.title = this.parseTopicTitleXML(n)));
            }
            parseTopicTitleXML(e) {
                let t = '';
                if (e.childElementCount > 0)
                    for (const i of e.children) t += this.parseTopicTitleXML(i);
                else t += e.innerHTML;
                return t;
            }
            parseTopicFileLink(e, t) {
                const i = e.absoluteFilePath;
                i &&
                    (t.href
                        ? t.children.attached.push({
                              id: k(),
                              title: pt.a.basename(i),
                              href: `file://${i}`,
                          })
                        : (t.href = `file://${i}`));
            }
            parseTopicAttachment(e, t) {
                const i = e.fileName;
                if (!i) return;
                const n = this.resourceNameMap[i];
                if (n)
                    if (this.isImageFormat(i)) {
                        const i = this.parseMMSize(e.size),
                            r = { src: `xap:${n}` };
                        (i && ((r.width = i.width), (r.height = i.height)),
                            (t.image = r));
                    } else
                        t.href
                            ? t.children.attached.push({
                                  id: k(),
                                  title: i,
                                  href: `xap:${n}`,
                              })
                            : (t.href = `xap:${n}`);
            }
            parseMMSize(e) {
                if (!e) return;
                e = e.substring(1, e.length - 1);
                return {
                    width: parseFloat(e.split(',')[0]),
                    height: parseFloat(e.split(',')[1]),
                };
            }
            parseMMLocation(e) {
                if (!e) return { x: 0, y: 0 };
                e = e.substring(1, e.length - 1);
                return {
                    x: parseFloat(e.split(',')[0]),
                    y: parseFloat(e.split(',')[1]),
                };
            }
            isImageFormat(e) {
                return e && e.match(/.(jpg|jpeg|png|gif)$/i);
            }
        }
        const Mt = '[import OPML]',
            At = Symbol('floatOutlines'),
            vt = Symbol('floatPosition');
        function Et(e) {
            return !(
                1 !== e.nodeType ||
                !e.tagName ||
                'outline' !== e.tagName.toLowerCase() ||
                (!K(e.getAttribute('text')) && !K(e.getAttribute('_text')))
            );
        }
        function _t(e) {
            const t = { id: k(), title: '' },
                i = {},
                n = K(e.getAttribute('text'))
                    ? e.getAttribute('text')
                    : e.getAttribute('_text');
            if (!K(n))
                return void Re.b.get(te.CONFIG.LOGGER).info({
                    [Mt]: 'outline element with no text attribute will been ignored',
                });
            t.title = n;
            const r = e.getAttribute('_note');
            r &&
                (t.notes = {
                    plain: { content: r },
                    ops: { ops: [{ insert: `${r}\n` }] },
                });
            if ('link' === e.getAttribute('type')) {
                let i = e.getAttribute('_url');
                i && (/^\w+:\/\//gi.test(i) || (i += 'http://'), (t.href = i));
            }
            const o = e.getAttribute('_callout');
            o && (i.callout = [{ id: k(), title: o }]);
            const a = e.getAttribute('_label');
            a && (t.labels = a.split(',').map((e) => e.trim()));
            const s = Array.from(e.childNodes).filter((e) => Et(e));
            return (
                s.length && (i.attached = Array.from(s).map((e) => _t(e))),
                e[At] &&
                    e[At].length &&
                    (i.detached = Array.from(e[At]).map((e) => _t(e))),
                e[vt] && (t.position = e[vt]),
                Object.keys(i).length && (t.children = i),
                t
            );
        }
        var Ot = i(3);
        const St = '[export markdown]',
            xt = 'textBundle',
            Rt = 'xap:resources/',
            It = '\n';
        function Nt(e, t = {}) {
            const { exportMode: i } = t;
            let n = '',
                r = '',
                o = '';
            const a = e.getLayer();
            if (1 <= a && a <= 3) r = `${'#'.repeat(a)} `;
            else {
                if (!(a > 3))
                    return (
                        Re.b.get(te.CONFIG.LOGGER).error({
                            [St]: `fail to parse ${a} level topic`,
                        }),
                        ''
                    );
                {
                    const e = `${'\t'.repeat(a - 4)}`;
                    ((r = `${e}- `), (o = `${e}${' '.repeat(2)}`));
                }
            }
            const s = (function (e) {
                    const t = e.attributes.title,
                        {
                            fontWeight: i,
                            fontStyle: n,
                            textDecoration: r,
                        } = Ot.a.getTitleTextStyle(e);
                    return [i, n, r].reduce(
                        (e, t) =>
                            (function (e, t) {
                                if (!e) return '';
                                switch (t) {
                                    case 'italic':
                                        return `*${e}*`;
                                    case 'bold':
                                        return `**${e}**`;
                                    case 'line-through':
                                        return `~~${e}~~`;
                                    default:
                                        return e;
                                }
                            })(e, t),
                        t
                    );
                })(e),
                l = e.getNotes(),
                c = l && l.plain && l.plain.content,
                d = e.getAudioNotes(),
                f = d && d.resourceRefs,
                h = e.getImageModel(),
                p = h && h.toJSON(),
                T = p && p.src,
                u = e.getHref(),
                g = e.getMathJaxText(),
                Q = 'string' == typeof u && u.startsWith('http'),
                m = B(u),
                b = (function (e) {
                    try {
                        return 'file:' === new URL(e).protocol;
                    } catch (e) {
                        return !1;
                    }
                })(u);
            if (null != s) {
                ((n += r),
                    i === xt
                        ? ((n +=
                              Q || b
                                  ? `[${s}](${u})`
                                  : m
                                    ? `[${s}](${P}${u.replace(Rt, '')})`
                                    : s),
                          T &&
                              ((n += '\n'),
                              (n += `![image](${P}${T.replace(Rt, '')})`)),
                          f &&
                              f.map((e) => {
                                  n += `[](${P}${e.replace(Rt, '')})`;
                              }))
                        : (n += Q || b ? `[${s}](${u})` : s),
                    g && (n += `\n\n$$\n${g.replace('\n', ' ')}\n$$`));
                const t = e.parent();
                let o = [],
                    l = !1,
                    d = !1;
                const h = e.getIndexInParent();
                let p = !1;
                ('root' !== e.type() &&
                    ((o = t.children(e.type())),
                    (p = h === o.length - 1),
                    (l = t.children().length > 1),
                    (d = e.children().length > 0)),
                    (n +=
                        !c && !Q && a > 3 && l && !d && !p
                            ? `${It}`
                            : `${It.repeat(2)}`));
            }
            return (
                c &&
                    c.split(It).forEach((e) => {
                        n += `${o}${e}${It}`;
                    }),
                n
            );
        }
        async function wt(e = {}, t = {}) {
            const { targetBranch: i, sheets: n } = e,
                { textWatermark: r, exportMode: o } = t;
            if (!(i || (Array.isArray(n) && n[0])))
                throw (
                    Re.b.get(te.CONFIG.LOGGER).error({
                        [St]: 'fail to load first sheet or targetBranch',
                    }),
                    new Error('fail to load first sheet or targetBranch')
                );
            const a = i || n[0].rootTopic();
            if (!a)
                throw (
                    Re.b
                        .get(te.CONFIG.LOGGER)
                        .error({ [St]: 'fail to load rootTopic' }),
                    new Error('fail to load rootTopic')
                );
            const s = [];
            let l = '';
            for (s.push(a); s.length; ) {
                const e = s.pop();
                l += Nt(e, { exportMode: o });
                ['detached', 'attached'].map((t) => {
                    const i = e.children(t);
                    if (Array.isArray(i))
                        for (let e = i.length - 1; e >= 0; e--) {
                            const t = i[e];
                            s.push(t);
                        }
                });
            }
            return (r && (l += r), l);
        }
        async function Pt(e = {}, t = {}) {
            let { infoJson: i = {} } = t;
            const n = await wt(e, Object.assign(t, { exportMode: xt }));
            return (
                (i = JSON.stringify(
                    Object.assign(
                        Object.assign(
                            {},
                            {
                                version: 2,
                                type: 'net.daringfireball.markdown',
                            }
                        ),
                        i
                    )
                )),
                { mdText: n, infoJson: i }
            );
        }
        const Ht = '[export OPML]',
            Dt = '\n';
        function Ft(e = '', t = {}) {
            const { indent: i = 0, lineBreak: n = Dt } = t;
            return `${'\t'.repeat(i)}${e}${n}`;
        }
        function kt(e = '') {
            return e
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&apos;');
        }
        function Bt(e) {
            let t = '';
            const i = [],
                n = e.attributes.title || e.title;
            i.push(`text="${kt(n)}"`);
            const r = e.getNotes() || e.notes,
                o = r && r.plain && r.plain.content;
            o && i.push(`_note="${kt(o).replace(/\n/gi, '&#10;')}"`);
            const a = e.getHref() || e.href;
            'string' == typeof a &&
                a.startsWith('http') &&
                i.push(`type="link" _url="${kt(a)}"`);
            const s = e.getLayer() - 1 + 2,
                l = [];
            return (
                ['attached', 'detached'].map((t) => {
                    const i = e.children(t);
                    Array.isArray(i) && l.push(...i);
                }),
                l.length
                    ? ((t += Ft(`<outline ${i.join(' ')}>`, {
                          indent: s,
                      })),
                      l.map((e) => {
                          t += Bt(e);
                      }),
                      (t += Ft('</outline>', { indent: s })))
                    : (t += Ft(`<outline ${i.join(' ')}></outline>`, {
                          indent: s,
                      })),
                t
            );
        }
        t.a = {
            fromXMind: function (e, t = {}) {
                return e && e.files
                    ? Z(e, y, v)
                        ? (function (e, t = {}) {
                              return new Promise((i, n) => {
                                  if (!e)
                                      return n('MUST have a valid zen file.');
                                  const { password: o = '' } = t,
                                      l = J(e, C, A);
                                  if (!l)
                                      return n(
                                          'MUST have a manifest.json file.'
                                      );
                                  l.async('string')
                                      .then((e) => JSON.parse(e))
                                      .then((t) => {
                                          const l = [];
                                          l.push(Promise.resolve(t));
                                          const c = J(e, L, '/metadata.json');
                                          if (!c)
                                              return n(
                                                  'MUST have a metadata.json file.'
                                              );
                                          const f = t[s][L] && t[s][L][d];
                                          l.push(
                                              c
                                                  .async(
                                                      f ? 'base64' : 'string'
                                                  )
                                                  .then(
                                                      (e) => (
                                                          f &&
                                                              (e = V(
                                                                  e,
                                                                  G(o, f)
                                                              ).toString(
                                                                  r.a.enc.Utf8
                                                              )),
                                                          JSON.parse(e)
                                                      )
                                                  )
                                          );
                                          const h = J(e, y, v);
                                          if (!h)
                                              return n(
                                                  'MUST have a content.json file'
                                              );
                                          const p = t[s][y] && t[s][y][d];
                                          (l.push(
                                              h
                                                  .async(
                                                      p ? 'base64' : 'string'
                                                  )
                                                  .then(
                                                      (e) => (
                                                          p &&
                                                              (e = V(
                                                                  e,
                                                                  G(o, p)
                                                              ).toString(
                                                                  r.a.enc.Utf8
                                                              )),
                                                          JSON.parse(e)
                                                      )
                                                  )
                                          ),
                                              (t[a] = t[a] ? t[a] : {}));
                                          for (const i in t[s])
                                              if (
                                                  i.includes(
                                                      'Thumbnails/thumbnail.png'
                                                  ) ||
                                                  i.match(/resources\//)
                                              ) {
                                                  const n = e.file(i);
                                                  if (n) {
                                                      const e = t[s][i][d];
                                                      l.push(
                                                          n
                                                              .async(
                                                                  e
                                                                      ? 'base64'
                                                                      : 'uint8array'
                                                              )
                                                              .then(
                                                                  (n) => (
                                                                      e &&
                                                                          (n =
                                                                              j(
                                                                                  V(
                                                                                      n,
                                                                                      G(
                                                                                          o,
                                                                                          e
                                                                                      )
                                                                                  )
                                                                              )),
                                                                      (t[a][i] =
                                                                          n)
                                                                  )
                                                              )
                                                      );
                                                  }
                                              }
                                          Promise.all(l)
                                              .then(([e, t, n]) => {
                                                  (e[s][y] || (e[s][y] = {}),
                                                      e[s][L] || (e[s][L] = {}),
                                                      q(
                                                          n,
                                                          Object.keys(e[a]).map(
                                                              (e) => 'xap:' + e
                                                          )
                                                      ),
                                                      i({
                                                          metadata: t,
                                                          sheets: n,
                                                          manifest: e,
                                                      }));
                                              })
                                              .catch((e) => {
                                                  n(e);
                                              });
                                      });
                              });
                          })(e, t)
                        : Z(e, _, w)
                          ? ee(e, t)
                          : Promise.reject('not a valid XMind file')
                    : Promise.reject('not a valid XMind file');
            },
            toXMind: function (e, t = {}) {
                return (function (e, t = {}) {
                    return new Promise((i, n) => {
                        if (!(e && e.manifest && e.metadata && e.sheets))
                            return n('MUST have a valid workbook.');
                        const r = t.zip || new pe.a(),
                            o = t.password,
                            a = e.manifest,
                            l = { [s]: { [y]: {}, [L]: {} } },
                            f = t.passwordHint || a[c];
                        f && (l[c] = f);
                        const h = a[s];
                        if (a.resources)
                            for (const e in a.resources) {
                                const t = h[e];
                                let i = a.resources[e];
                                if (
                                    ((l[s][e] = l[s][e] ? l[s][e] : {}),
                                    t && o && !t.skipEncrypt)
                                ) {
                                    const n = G(o, t[d]);
                                    ((i = j(D(z(i), n).ciphertext)),
                                        (l[s][e][d] = U(n)));
                                }
                                r.file(e, i);
                            }
                        let p = JSON.stringify(e.metadata || {});
                        if (((l[s][L] = l[s][L] ? l[s][L] : {}), o)) {
                            const e = G(o, h[L] && h[L][d]);
                            ((p = j(D(p, e).ciphertext)), (l[s][L][d] = U(e)));
                        }
                        r.file(L, p);
                        let T = JSON.stringify(e.sheets);
                        if (((l[s][y] = l[s][y] ? l[s][y] : {}), o)) {
                            const e = G(o, h[y] && h[y][d]);
                            ((T = j(D(T, e).ciphertext)), (l[s][y][d] = U(e)));
                        }
                        (r.file(y, T),
                            r.file(
                                'content.xml',
                                '<?xml version="1.0" encoding="UTF-8" standalone="no"?><xmap-content xmlns="urn:xmind:xmap:xmlns:content:2.0" xmlns:fo="http://www.w3.org/1999/XSL/Format" xmlns:svg="http://www.w3.org/2000/svg" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:xlink="http://www.w3.org/1999/xlink" modified-by="bruce" timestamp="1503058545540" version="2.0"><sheet id="7abtd0ssc7n4pi1nu6i7b6lsdh" modified-by="bruce" theme="0kdeemiijde6nuk97e4t0vpp54" timestamp="1503058545540"><topic id="1vr0lcte2og4t2sopiogvdmifc" modified-by="bruce" structure-class="org.xmind.ui.logic.right" timestamp="1503058545417"><title>Warning\n警告\nAttention\nWarnung\n경고</title><children><topics type="attached"><topic id="71h1aip2t1o8vvm0a41nausaar" modified-by="bruce" timestamp="1503058545423"><title svg:width="500">This file can not be opened normally, please do not modify and save, otherwise the contents will be permanently lost！</title><children><topics type="attached"><topic id="428akmkh9a0tog6c91qj995qdl" modified-by="bruce" timestamp="1503058545427"><title>You can try using XMind 8 Update 3 or later version to open</title></topic></topics></children></topic><topic id="2kb87f8m38b3hnfhp450c7q35e" modified-by="bruce" timestamp="1503058545434"><title svg:width="500">该文件无法正常打开，请勿修改并保存，否则文件内容将会永久性丢失！</title><children><topics type="attached"><topic id="3m9hoo4a09n53ofl6fohdun99f" modified-by="bruce" timestamp="1503058545438"><title>你可以尝试使用 XMind 8 Update 3 或更新版本打开</title></topic></topics></children></topic><topic id="7r3r4617hvh931ot9obi595r8f" modified-by="bruce" timestamp="1503058545444"><title svg:width="500">該文件無法正常打開，請勿修改並保存，否則文件內容將會永久性丟失！</title><children><topics type="attached"><topic id="691pgka6gmgpgkacaa0h3f1hjb" modified-by="bruce" timestamp="1503058545448"><title>你可以嘗試使用 XMind 8 Update 3 或更新版本打開</title></topic></topics></children></topic><topic id="0f2e3rpkfahg4spg4nda946r0b" modified-by="bruce" timestamp="1503058545453"><title svg:width="500">この文書は正常に開かないので、修正して保存しないようにしてください。そうでないと、書類の内容が永久に失われます。！</title><children><topics type="attached"><topic id="4vuubta53ksc1falk46mevge0t" modified-by="bruce" timestamp="1503058545457"><title>XMind 8 Update 3 や更新版を使って開くこともできます</title></topic></topics></children></topic><topic id="70n9i4u3lb89sq9l1m1bs255j5" modified-by="bruce" timestamp="1503058545463"><title svg:width="500">Datei kann nicht richtig geöffnet werden. Bitte ändern Sie diese Datei nicht und speichern Sie sie, sonst wird die Datei endgültig gelöscht werden.</title><children><topics type="attached"><topic id="1qpc5ee298p2sqeqbinpca46b7" modified-by="bruce" timestamp="1503058545466"><title svg:width="500">Bitte versuchen Sie, diese Datei mit XMind 8 Update 3 oder später zu öffnen.</title></topic></topics></children></topic><topic id="4dmes10uc19pq7enu8sc4bmvif" modified-by="bruce" timestamp="1503058545473"><title svg:width="500">Ce fichier ne peut pas ouvert normalement, veuillez le rédiger et sauvegarder, sinon le fichier sera perdu en permanence. </title><children><topics type="attached"><topic id="5f0rivgubii2launodiln7sdkt" modified-by="bruce" timestamp="1503058545476"><title svg:width="500">Vous pouvez essayer d\'ouvrir avec XMind 8 Update 3 ou avec une version plus récente.</title></topic></topics></children></topic><topic id="10pn1os1sgfsnqa8akabom5pej" modified-by="bruce" timestamp="1503058545481"><title svg:width="500">파일을 정상적으로 열 수 없으며, 수정 및 저장하지 마십시오. 그렇지 않으면 파일의 내용이 영구적으로 손실됩니다!</title><children><topics type="attached"><topic id="0l2nr0fq3em22rctapkj46ue58" modified-by="bruce" timestamp="1503058545484"><title svg:width="500">XMind 8 Update 3 또는 이후 버전을 사용하여</title></topic></topics></children></topic></topics></children><extensions><extension provider="org.xmind.ui.map.unbalanced"><content><right-number>-1</right-number></content></extension></extensions></topic><title>Sheet 1</title></sheet></xmap-content>'
                            ),
                            r.file(C, JSON.stringify(l)),
                            i(r));
                    });
                })(e, t);
            },
            fromFreemind: function (e) {
                if (!e) throw new Error('Need a freemind file');
                const t = (function (e) {
                    const t = s(e, 'map');
                    if (!t) return;
                    const i = [],
                        n = {
                            workbook: {
                                id: k(),
                                sheets: i,
                                manifest: M,
                            },
                        },
                        r = { id: k(), title: 'sheet' };
                    function o(e, t) {
                        if (!e) return;
                        const { defaultTitle: i, isRoot: n } = t || {},
                            l = {
                                id: k(e.getAttribute('ID')),
                                title: K(e.getAttribute('TEXT'))
                                    ? e.getAttribute('TEXT')
                                    : i,
                            };
                        {
                            const t = e.getAttribute('LINK');
                            t &&
                                (t.startsWith('#ID_')
                                    ? (l.href = 'xmind:#' + k(t.substring(1)))
                                    : /^(https?|mailto):\/\//i.test(t)
                                      ? (l.href = t)
                                      : t.startsWith('..') ||
                                        t.startsWith('/'));
                        }
                        e: {
                            const t = s(e, 'richcontent');
                            if (!t) break e;
                            const i = t.getAttribute('TYPE');
                            if ('NOTE' === i) {
                                const e = s(t, 'html');
                                if (!e) break e;
                                const i = s(e, 'body');
                                if (!i) break e;
                                const n = a(i, 'p');
                                if (!n.length) break e;
                                let r;
                                (n.forEach((e) => {
                                    r += e.textContent;
                                }),
                                    r &&
                                        ((l.notes = {}),
                                        (l.notes.plain = {
                                            content: r,
                                        })));
                            } else if ('NODE' === i) {
                                const e = s(t, 'html');
                                if (!e) break e;
                                const i = s(e, 'body');
                                if (!i) break e;
                                const n = a(i, 'p'),
                                    r = [];
                                (n.length &&
                                    n.forEach((e) => {
                                        r.push(
                                            e.textContent &&
                                                e.textContent.trim()
                                        );
                                    }),
                                    r.length && (l.title = r.join('\n')));
                                const o = s(t, 'img');
                                if (o) {
                                    const e = {
                                        src: o.getAttribute('src'),
                                    };
                                    l.image = e;
                                }
                            }
                        }
                        {
                            const t = a(e, 'icon');
                            t.length &&
                                ((l.markers = []),
                                t.forEach((e) => {
                                    const t =
                                        ie[e.getAttribute('BUILTIN')] ||
                                        'other-question';
                                    l.markers.push({ markerId: t });
                                }));
                        }
                        {
                            const t = a(e, 'node');
                            t.length &&
                                ((l.children = {}),
                                (l.children.attached = []),
                                t.forEach((e, t) => {
                                    (l.children.attached.push(
                                        o(e, {
                                            defaultTitle: n
                                                ? 'Main Topic'
                                                : 'Subtopic',
                                        })
                                    ),
                                        c(e, t));
                                }));
                        }
                        {
                            const t = {},
                                i = e.getAttribute('BACKGROUND_COLOR');
                            i && (t[te.STYLE_KEYS.FILL_COLOR] = i);
                            const n = e.getAttribute('COLOR');
                            n && (t[te.STYLE_KEYS.TEXT_COLOR] = n);
                            const r = s(e, 'font');
                            if (r) {
                                const e = r.getAttribute('NAME');
                                e && (t[te.STYLE_KEYS.FONT_FAMILY] = e);
                                const i = r.getAttribute('SIZE');
                                i && (t[te.STYLE_KEYS.FONT_SIZE] = i);
                                'true' === r.getAttribute('ITALIC') &&
                                    (t[te.STYLE_KEYS.FONT_STYLE] = 'italic');
                                'true' === r.getAttribute('BOLD') &&
                                    (t[te.STYLE_KEYS.FONT_WEIGHT] = 'bold');
                            }
                        }
                        e: {
                            const t = s(e, 'arrowlink');
                            if (!t) break e;
                            const i = t.getAttribute('DESTINATION');
                            if (!i) break e;
                            const n = {
                                    id: k(),
                                    end1Id: k(e.getAttribute('ID')),
                                    end2Id: k(i),
                                    title: '',
                                },
                                o = {},
                                a = t.getAttribute('COLOR');
                            a && (o[te.STYLE_KEYS.LINE_COLOR] = a);
                            const l = t.getAttribute('STARTARROW');
                            o[te.STYLE_KEYS.ARROW_BEGIN_CLASS] =
                                'Default' === l
                                    ? te.ARROW_CLASS.NORMAL
                                    : te.ARROW_CLASS.NONE;
                            const c = t.getAttribute('ENDARROW');
                            ((o[te.STYLE_KEYS.ARROW_END_CLASS] =
                                'Default' === c
                                    ? te.ARROW_CLASS.NORMAL
                                    : te.ARROW_CLASS.NONE),
                                (n.style = {
                                    type: 'relationship',
                                    properties: o,
                                }),
                                r.relationships || (r.relationships = []),
                                r.relationships.push(n));
                        }
                        function c(e, t) {
                            s(e, 'cloud') &&
                                (l.boundaries || (l.boundaries = []),
                                l.boundaries.push({
                                    id: k(),
                                    range: `(${t}, ${t})`,
                                }));
                        }
                        return l;
                    }
                    function a(e, t) {
                        return Array.from(e.childNodes).filter(
                            (e) => e.tagName && e.tagName === t
                        );
                    }
                    function s(e, t) {
                        const i = Array.from(e.childNodes).filter(
                            (e) => e.tagName && e.tagName === t
                        );
                        return i && i[0];
                    }
                    return (
                        i.push(r),
                        (r.rootTopic = o(s(t, 'node'), {
                            defaultTitle: 'Central Topic',
                            isRoot: !0,
                        })),
                        n.workbook
                    );
                })(new o.DOMParser().parseFromString(e, 'application/xml'));
                if (!t) throw new Error('No content');
                return t;
            },
            fromLighten: function (e) {
                return ae(e);
            },
            fromLightenZipPromise: function (e) {
                return new Promise((t, i) => {
                    (e || i('Need a lighten file'),
                        e.file('content.json') || i('no content'),
                        e
                            .file('content.json')
                            .async('string')
                            .then((e) => {
                                t(ae(e));
                            }));
                });
            },
            fromMindmanager: async function (e) {
                const t = await pe.a.loadAsync(e);
                if (!t) throw new Error('Need a mindmanager file');
                if (!t.file('Document.xml')) throw new Error('No content');
                const i = await (function (e) {
                    return new Promise((t) => {
                        const i = [];
                        Object.keys(e.files).forEach((e) => {
                            /^bin\//.test(e) && i.push(e);
                        });
                        const n = i.indexOf('bin/');
                        if ((-1 !== n && i.splice(n, 1), !i.length)) return t();
                        let o = i.length;
                        const a = {};
                        i.forEach((i) => {
                            const n = e.file(i);
                            n.async('uint8array').then((e) => {
                                const s = r.a.algo.SHA256.create()
                                    .update(r.a.lib.WordArray.create(e))
                                    .finalize()
                                    .toString(r.a.enc.Hex);
                                ((a[i] = {
                                    hash: s,
                                    resourceData: e,
                                    zipObject: n,
                                }),
                                    o--,
                                    0 === o && t(a));
                            });
                        });
                    });
                })(t);
                let n = await t.file('Document.xml').async('string');
                ((n = n.replace(/ap:/gi, '')),
                    (n = n.replace(/cor:/gi, '')),
                    (n = n.replace(/pri:/gi, '')),
                    (n = n.replace(/xsi:/gi, '')),
                    (n = n.replace(/cst0:/gi, '')));
                const o = (function (e, t) {
                    const i = u(e, 'Map');
                    if (!i) return;
                    const n = [],
                        r = {
                            [Te]: { [ge]: {}, [Qe]: {} },
                            [ue]: {},
                        },
                        o = {
                            workbook: {
                                id: k(),
                                sheets: n,
                                manifest: r,
                            },
                        },
                        a = {
                            id: k(i.getAttribute('OId')),
                            title: 'sheet',
                        };
                    n.push(a);
                    const s = u(i, 'OneTopic');
                    if (!s) return;
                    function l(e, i) {
                        const {
                                defaultTitle: n,
                                isDetached: o,
                                isRoot: a,
                                isCallout: s,
                            } = i || {},
                            c = {};
                        let f = !1;
                        const g = e.getAttribute('OId');
                        c.id = k(g);
                        const Q = u(e, 'Text');
                        c.title =
                            Q && Q.getAttribute('PlainText')
                                ? Q.getAttribute('PlainText')
                                : n;
                        {
                            const t = u(e, 'Bookmarker');
                            t &&
                                ((c.labels = []),
                                c.labels.push(t.getAttribute('Name')));
                            const i = u(e, 'NotesGroup');
                            if (i) {
                                const e = u(i, 'NotesXhtmlData');
                                e &&
                                    e.textContent &&
                                    ((c.notes = {}),
                                    (c.notes.plain = {
                                        content: e.textContent,
                                    }));
                            }
                        }
                        e: {
                            let t = 0;
                            const i = u(e, 'SubTopics');
                            if (i) {
                                const e = T(i, 'Topic');
                                e.length &&
                                    ((c.children = {}),
                                    (c.children.attached = []),
                                    e.forEach((e) => {
                                        (c.children.attached.push(
                                            l(e, {
                                                defaultTitle: a
                                                    ? 'Main Topic'
                                                    : 'Subtopic',
                                                isDetached: !1,
                                            })
                                        ),
                                            b(e, t, !1),
                                            t++);
                                    }));
                            }
                            const n = u(e, 'FloatingTopics');
                            if (!n) break e;
                            c.children || (c.children = {});
                            const r = T(n, 'Topic');
                            r.length &&
                                (a
                                    ? ((c.children.detached = []),
                                      r.forEach((e) => {
                                          (c.children.detached.push(
                                              l(e, {
                                                  defaultTitle:
                                                      'Floating Topic',
                                                  isDetached: !0,
                                              })
                                          ),
                                              t++);
                                      }))
                                    : ((c.children.callout = []),
                                      r.forEach((e) => {
                                          (c.children.callout.push(
                                              l(e, {
                                                  defaultTitle: 'Callout',
                                                  isDetached: !1,
                                                  isCallout: !0,
                                              })
                                          ),
                                              t++);
                                      })));
                        }
                        e: {
                            const t = u(e, 'Hyperlink');
                            if (!t) break e;
                            const i = t.getAttribute('Url');
                            if (i)
                                if (i.startsWith('#xpointer(')) {
                                    const e = /@OId='([^']*)'/;
                                    e.test(i) &&
                                        (c.href = 'xmind:#' + k(e.exec(i)[1]));
                                } else
                                    i.startsWith('http://') ||
                                    i.startsWith('https://') ||
                                    i.startsWith('mailto:')
                                        ? (c.href = i)
                                        : (c.href = 'file://' + i);
                        }
                        e: {
                            const i = u(e, 'AttachmentGroup');
                            if (!i) break e;
                            const n = T(i, 'AttachmentData');
                            n.length &&
                                (f || m(),
                                n.forEach((e) => {
                                    const i = e.getAttribute('AttachmentId'),
                                        n = e.getAttribute('FileName'),
                                        o = u(e, 'Uri');
                                    if (o) {
                                        const e = 'mmarch://';
                                        let a = o.textContent;
                                        a.startsWith(e) &&
                                            (a = a.substring(e.length));
                                        const { hash: s, resourceData: l } =
                                            t[a] || {};
                                        if (s) {
                                            let e = '.' + a.split('.').pop();
                                            e = e === a ? '' : '.' + e;
                                            const t = `resources/${s}${e}`;
                                            ((r[Te][t] = {}), (r[ue][t] = l));
                                            const o = {
                                                id: k(i),
                                                title: n,
                                                href: 'xap:' + t,
                                            };
                                            c.children.attached.push(o);
                                        }
                                    }
                                }));
                        }
                        e: {
                            const t = u(e, 'IconsGroup');
                            if (!t) break e;
                            const i = u(t, 'Icons');
                            if (!i) break e;
                            const n = T(i, 'Icon');
                            n.length &&
                                (c.markers || (c.markers = []),
                                n.forEach((e) => {
                                    const t = me[e.getAttribute('IconType')];
                                    t &&
                                        c.markers.push({
                                            markerId: t,
                                        });
                                }));
                        }
                        e: {
                            const i = u(e, 'OneImage');
                            if (!i) break e;
                            const n = u(i, 'Image');
                            if (!n) break e;
                            const o = u(n, 'ImageData');
                            if (!o) break e;
                            const a = u(o, 'Uri');
                            if (!a) break e;
                            const s = 'mmarch://';
                            let l = a.textContent;
                            l.startsWith(s) && (l = l.substring(s.length));
                            const { hash: d, resourceData: f } = t[l] || {};
                            if (!d) break e;
                            let h = l.split('.').pop();
                            h = h === l ? '' : '.' + h;
                            const T = `resources/${d}${h}`;
                            ((r[Te][T] = {}), (r[ue][T] = f));
                            const g = { src: 'xap:' + T },
                                Q = u(n, 'ImageSize');
                            if (Q) {
                                const e = Q.getAttribute('Width'),
                                    t = Q.getAttribute('Height');
                                ((g.width = e ? p(e) : -1),
                                    (g.height = t ? p(t) : -1));
                            }
                            c.image = g;
                        }
                        e: {
                            const t = u(e, 'Task');
                            if (!t) break e;
                            const i = [],
                                n =
                                    /((\d+)-(\d{1,2})-(\d{1,2}))T((\d{1,2}):(\d{1,2}):(\d{1,2}))/,
                                r = t.getAttribute('StartDate'),
                                o = n.exec(r);
                            o &&
                                i.push({
                                    name: 'start-date',
                                    content: o[1] + ' ' + o[5],
                                });
                            const a = t.getAttribute('DeadlineDate'),
                                s = n.exec(a);
                            s &&
                                i.push({
                                    name: 'end-date',
                                    content: s[1] + ' ' + s[5],
                                });
                            const l = t.getAttribute('Resources');
                            l &&
                                i.push({
                                    name: 'assigned-to',
                                    content: l,
                                });
                            const d = t.getAttribute('Milestonr');
                            d &&
                                !0 === d &&
                                i.push({
                                    name: 'check-point',
                                    content: !0,
                                });
                            const f = t.getAttribute('TaskPriority'),
                                h = t.getAttribute('TaskPercentage');
                            (i.length &&
                                (c.extensions = [
                                    {
                                        provider: 'org.xmind.ui.taskInfo',
                                        content: i,
                                    },
                                ]),
                                (h || (f && !c.markers)) && (c.markers = []),
                                f &&
                                    me[f] &&
                                    c.markers.push({
                                        markerId: me[f],
                                    }),
                                h &&
                                    me[h] &&
                                    c.markers.push({
                                        markerId: me[h],
                                    }));
                        }
                        e: {
                            const t = u(e, 'Custom');
                            if (!t) break e;
                            const i = t.getAttribute('Numbering');
                            if (!i) break e;
                            const n = i.split('*')[0],
                                r = t.getAttribute('Separators').split(',')[0];
                            c.numbering = {
                                numberFormat: _e[n] || te.NUMBERFORMAT.ARABIC,
                                numberSeparator:
                                    Oe[r] || te.NUMBERSEPARATOR.DOT,
                            };
                            const o = t.getAttribute('Repeat'),
                                a = t.getAttribute('Depth') || '1';
                            o && '0' === o && (c.numbering.depth = a);
                            const s = t.getAttribute('Level1Text');
                            s && (c.numbering.prefix = s);
                        }
                        {
                            const t = {};
                            (C(e, t),
                                L(e, t, s, o),
                                Q && h(Q, t),
                                (c.style = {
                                    type: 'topic',
                                    properties: t,
                                }));
                        }
                        e: {
                            const t = u(e, 'SubTopicsShape');
                            if (!t) break e;
                            const i =
                                Le[t.getAttribute('SubTopicsConnectionStyle')];
                            i &&
                                (c.style.properties[te.STYLE_KEYS.LINE_CLASS] =
                                    i);
                            const n = t.getAttribute('SubTopicsAlignment'),
                                r = t.getAttribute('SubTopicsGrowth'),
                                o = t.getAttribute('SubTopicsGrowthDirection');
                            let a;
                            if (
                                'urn:mindjet:Center' === n &&
                                'urn:mindjet:Horizontal' === r
                            )
                                ('urn:mindjet:LeftAndRight' === o &&
                                    (a = te.STRUCTURECLASS.MAPCLOCKWISE),
                                    'urn:mindjet:Right' === o &&
                                        (a = te.STRUCTURECLASS.LOGICRIGHT),
                                    'urn:mindjet:Left' === o &&
                                        (a = te.STRUCTURECLASS.LOGICLEFT));
                            else if (
                                'urn:mindjet:Vertical' === r &&
                                'urn:mindjet:Middle' ===
                                    t.getAttribute('SubTopicsVerticalAlignment')
                            ) {
                                const e = t.getAttribute(
                                    'SubTopicsVerticalGrowthDirection'
                                );
                                (('urn:mindjet:Down' !== e &&
                                    'urn:mindjet:UpAndDown' !== e) ||
                                    (a = te.STRUCTURECLASS.ORGCHARTDOWN),
                                    'urn:mindjet:Up' === e &&
                                        (a = te.STRUCTURECLASS.ORGCHARTUP));
                            } else
                                'urn:mindjet:Bottom' === n &&
                                    'urn:mindjet:Horizontal' === r &&
                                    (('urn:mindjet:Right' !== o &&
                                        'urn:mindjet:LeftAndRight' !== o) ||
                                        (a = te.STRUCTURECLASS.TREERIGHT),
                                    'urn:mindjet:Left' === o &&
                                        (a = te.STRUCTURECLASS.TREELEFT));
                            a && (c.structureClass = a);
                        }
                        e: {
                            const t = u(e, 'Offset');
                            if (!t) break e;
                            const i = parseFloat(t.getAttribute('CX')),
                                n = parseFloat(t.getAttribute('CY'));
                            i && n && (c.position = { x: p(i), y: p(n) });
                        }
                        function m() {
                            (c.children || (c.children = {}),
                                c.children.attached ||
                                    (c.children.attached = []),
                                (f = !0));
                        }
                        function b(e, t, i) {
                            const n = u(e, 'OneBoundary');
                            if (!n) return;
                            const r = u(n, 'Boundary');
                            if (!r) return;
                            const o = p(r);
                            let a,
                                s,
                                l,
                                f = Ee[o];
                            if (f && !i) {
                                c.children.summary || (c.children.summary = []);
                                const e = k();
                                (c.children.summary.push(
                                    (s = {
                                        id: e,
                                        title: 'Summary',
                                    })
                                ),
                                    c.summaries || (c.summaries = []),
                                    c.summaries.push(
                                        (l = {
                                            id: k(r.getAttribute('OId')),
                                            range: `(${t},${t})`,
                                            topicId: e,
                                        })
                                    ));
                            } else
                                ((f = ye[o]),
                                    c.boundaries || (c.boundaries = []),
                                    c.boundaries.push(
                                        (a = {
                                            id: k(r.getAttribute('OId')),
                                            range: i
                                                ? 'master'
                                                : `(${t}, ${t})`,
                                        })
                                    ));
                            const h = {
                                [te.STYLE_KEYS.SHAPE_CLASS]: f,
                            };
                            function p(e) {
                                const t = u(e, 'BoundaryShape');
                                if (t) return t.getAttribute('BoundaryShape');
                            }
                            (C(r, h),
                                d(r, h),
                                a
                                    ? (a.style = {
                                          type: 'boundary',
                                          properties: h,
                                      })
                                    : l &&
                                      s &&
                                      ((l.style = {
                                          type: 'summary',
                                          properties: h,
                                      }),
                                      (s.style = {
                                          type: 'topic',
                                          properties: {
                                              [te.STYLE_KEYS.SHAPE_CLASS]:
                                                  te.TOPICSHAPE.NOBORDER,
                                          },
                                      })));
                        }
                        function C(e, t) {
                            const i = u(e, 'Color');
                            if (!i) return;
                            const n = i.getAttribute('FillColor');
                            if (n) {
                                const e = n.substring(0, 2);
                                t[te.STYLE_KEYS.FILL_COLOR] =
                                    '00' !== e ? '#' + n.substring(2) : 'none';
                            }
                            const r = i.getAttribute('LineColor');
                            r &&
                                (t[te.STYLE_KEYS.LINE_COLOR] =
                                    '#' + r.substring(2));
                        }
                        function L(e, t, i, n) {
                            const r = i
                                    ? 'CalloutFloatingTopicShape'
                                    : n
                                      ? 'LabelFloatingTopicShape'
                                      : 'SubTopicShape',
                                o = u(
                                    e,
                                    i
                                        ? 'CalloutFloatingTopicShape'
                                        : n
                                          ? 'LabelFloatingTopicShape'
                                          : 'SubTopicShape'
                                );
                            if (!o) return;
                            let a = o.getAttribute(r);
                            i
                                ? ((a = Ce[a]),
                                  a &&
                                      (t[te.STYLE_KEYS.CALLOUT_SHAPE_CLASS] =
                                          a))
                                : ((a = be[a]),
                                  a && (t[te.STYLE_KEYS.SHAPE_CLASS] = a));
                        }
                        return (o && b(e, 0, !0), c);
                    }
                    function c(e) {
                        if (!e) return;
                        const t = T(e, 'Relationship');
                        if (!t.length) return;
                        const i = [];
                        function n(e) {
                            const t = {};
                            return (
                                e.forEach((e, i) => {
                                    const n = u(e, 'Connection');
                                    if (n) {
                                        const e = parseFloat(
                                                n.getAttribute('CX')
                                            ),
                                            r = parseFloat(
                                                n.getAttribute('CY')
                                            );
                                        e &&
                                            r &&
                                            (t[i] = {
                                                x: p(e),
                                                y: p(r),
                                            });
                                    }
                                }),
                                t
                            );
                        }
                        function r(e, t) {
                            const i = u(e, 'RelationshipLineShape');
                            if (!i) return;
                            const n = Ae[i.getAttribute('LineShape')];
                            n && (t[te.STYLE_KEYS.SHAPE_CLASS] = n);
                        }
                        function o(e, t) {
                            e.forEach((e, i) => {
                                const n = u(e, 'ConnectionStyle');
                                if (n) {
                                    const e =
                                        ve[n.getAttribute('ConnectionShape')];
                                    if (e) {
                                        const n =
                                            0 === i
                                                ? te.STYLE_KEYS
                                                      .ARROW_BEGIN_CLASS
                                                : te.STYLE_KEYS.ARROW_END_CLASS;
                                        t[n] = e;
                                    }
                                }
                            });
                        }
                        (t.forEach((e) => {
                            const t = T(e, 'ConnectionGroup');
                            if (2 === t.length) {
                                const a = u(t[0], 'Connection'),
                                    s = u(t[1], 'Connection');
                                if (a && s) {
                                    const l = u(a, 'ObjectReference'),
                                        c = u(s, 'ObjectReference');
                                    if (l && c) {
                                        const a = {
                                                id: k(e.getAttribute('OId')),
                                                end1Id: k(
                                                    l.getAttribute('OIdRef')
                                                ),
                                                end2Id: k(
                                                    c.getAttribute('OIdRef')
                                                ),
                                                title: '',
                                            },
                                            s = n(t);
                                        s && (a.controlPoints = s);
                                        const f = {};
                                        (d(e, f),
                                            r(e, f),
                                            o(t, f),
                                            (a.style = {
                                                type: 'relationship',
                                                properties: f,
                                            }),
                                            i.push(a));
                                    }
                                }
                            }
                        }),
                            i.length && (a.relationships = i));
                    }
                    function d(e, t) {
                        const i = u(e, 'Color');
                        if (i) {
                            const e = i.getAttribute('LineColor');
                            e &&
                                (t[te.STYLE_KEYS.LINE_COLOR] =
                                    '#' + e.substring(2));
                        }
                        const n = u(e, 'LineStyle');
                        if (!n) return;
                        const r = Me[n.getAttribute('LineDashStyle')];
                        (r && (t[te.STYLE_KEYS.LINE_PATTERN] = r),
                            (t[te.STYLE_KEYS.LINE_WIDTH] =
                                n.getAttribute('LineWidth')));
                    }
                    function f(e) {
                        if (!e) return;
                        const t = {};
                        function i(e, t) {
                            const i = {};
                            {
                                const t = u(e, 'Structure');
                                if (t) {
                                    parseFloat(
                                        t.getAttribute('MainTopicLineWidth')
                                    ) > 3 &&
                                        (i[te.STYLE_KEYS.LINE_TAPERED] =
                                            'tapered');
                                }
                                const n = u(e, 'BackgroundFill');
                                if (n) {
                                    const e = n.getAttribute('FillColor');
                                    e &&
                                        (i[te.STYLE_KEYS.FILL_COLOR] =
                                            '#' + e.substring(2));
                                }
                            }
                            t.map = { type: 'map', properties: i };
                        }
                        function n(e, t) {
                            const i = u(e, 'RootTopicDefaultsGroup');
                            i &&
                                o(t, i, {
                                    styleFamily: 'centralTopic',
                                });
                            let n,
                                r = 0;
                            function o(e, t, i) {
                                const {
                                        styleFamily: n,
                                        shapeMap: r,
                                        shapeDomName: o,
                                        shapeAttrName: d,
                                    } = i || null,
                                    f = {};
                                (s(f, t, !0, !0),
                                    a(f, t, r, o, d),
                                    l(f, t),
                                    c(f, t),
                                    (e[n] = {
                                        type: 'topic',
                                        properties: f,
                                    }));
                            }
                            function a(
                                e,
                                t,
                                i = be,
                                n = 'DefaultSubTopicShape',
                                r = 'SubTopicShape'
                            ) {
                                const o = u(t, n);
                                if (!o) return;
                                const a = i[o.getAttribute(r)];
                                a && (e[te.STYLE_KEYS.SHAPE_CLASS] = a);
                            }
                            function l(e, t) {
                                const i = u(t, 'DefaultSubTopicsShape');
                                if (!i) return;
                                const n =
                                    Le[
                                        i.getAttribute(
                                            'SubTopicsConnectionStyle'
                                        )
                                    ];
                                n && (e[te.STYLE_KEYS.LINE_CLASS] = n);
                            }
                            function c(e, t) {
                                const i = u(t, 'DefaultText');
                                i && h(i, e);
                            }
                            T(e, 'RootSubTopicDefaultsGroup').forEach((i) => {
                                const a = parseInt(i.getAttribute('Level'));
                                (0 === a
                                    ? o(t, i, {
                                          styleFamily: 'mainTopic',
                                      })
                                    : a > 0 && a > r && ((r = a), (n = i)),
                                    n &&
                                        o(t, n, {
                                            styleFamily: 'subTopic',
                                        }));
                                const s = u(e, 'LabelTopicDefaultsGroup');
                                s &&
                                    o(t, s, {
                                        styleFamily: 'floatingTopic',
                                        shapeDomName:
                                            'DefaultLabelFloatingTopicShape',
                                        shapeAttrName:
                                            'LabelFloatingTopicShape',
                                    });
                                const l = u(e, 'CalloutTopicDefaultsGroup');
                                l &&
                                    o(t, l, {
                                        styleFamily: 'calloutTopic',
                                        shapeMap: Ce,
                                        shapeDomName:
                                            'DefaultCalloutFloatingTopicShape',
                                        shapeAttrName:
                                            'CalloutFloatingTopicShape',
                                    });
                            });
                        }
                        function r(e, t) {
                            const i = u(e, 'BoundaryDefaultsGroup');
                            if (!i) return;
                            const n = {};
                            function r(e, t) {
                                const i = u(t, 'DefaultBoundaryShape');
                                if (!i) return;
                                const n = ye[i.getAttribute('BoundaryShape')];
                                n && (e[te.STYLE_KEYS.SHAPE_CLASS] = n);
                            }
                            (s(n, i, !0, !0),
                                l(n, i),
                                r(n, i),
                                (t.boundary = {
                                    type: 'boundary',
                                    properties: n,
                                }));
                        }
                        function o(e, t) {
                            const i = u(e, 'RelationshipDefaultsGroup');
                            if (!i) return;
                            const n = {};
                            function r(e, t) {
                                const i = T(t, 'DefaultConnectionStyle');
                                i.length &&
                                    i.forEach((t) => {
                                        const i = parseInt(
                                            t.getAttribute('Index')
                                        );
                                        if (0 === i || 1 === i) {
                                            const n =
                                                ve[
                                                    t.getAttribute(
                                                        'ConnectionShape'
                                                    )
                                                ];
                                            if (n) {
                                                const t =
                                                    0 === i
                                                        ? te.STYLE_KEYS
                                                              .ARROW_BEGIN_CLASS
                                                        : te.STYLE_KEYS
                                                              .ARROW_END_CLASS;
                                                e[t] = n;
                                            }
                                        }
                                    });
                            }
                            function o(e, t) {
                                const i = u(t, 'DefaultRelationshipLineShape');
                                if (!i) return;
                                const n = Ae[i.getAttribute('LineShape')];
                                n && (e[te.STYLE_KEYS.SHAPE_CLASS] = n);
                            }
                            (s(n, i, !1, !0),
                                l(n, i),
                                r(n, i),
                                o(n, i),
                                (t.relationship = {
                                    type: 'relationship',
                                    properties: n,
                                }));
                        }
                        function s(e, t, i, n) {
                            const r = u(t, 'DefaultColor');
                            if (r) {
                                if (i) {
                                    const t = r.getAttribute('FillColor'),
                                        i = t.substring(0, 2);
                                    e[te.STYLE_KEYS.FILL_COLOR] =
                                        '00' !== i
                                            ? '#' + t.substring(2)
                                            : 'none';
                                }
                                if (n) {
                                    const t = r.getAttribute('LineColor');
                                    t &&
                                        (e[te.STYLE_KEYS.LINE_COLOR] =
                                            '#' + t.substring(2));
                                }
                            }
                        }
                        function l(e, t) {
                            const i = u(t, 'DefaultLineStyle');
                            if (!i) return;
                            const n = Me[i.getAttribute('LineDashStyle')];
                            n && (e[te.STYLE_KEYS.LINE_PATTERN] = n);
                            const r = parseFloat(i.getAttribute('LineWidth'));
                            r && (e[te.STYLE_KEYS.LINE_WIDTH] = r);
                        }
                        (i(e, t), n(e, t), r(e, t), o(e, t), (a.theme = t));
                    }
                    function h(e, t) {
                        const i = e.getAttribute('TextAlignment');
                        i && (t[te.STYLE_KEYS.TEXT_ALIGN] = i.toLowerCase());
                        const n = u(e, 'Font');
                        if (!n) return;
                        const r = n.getAttribute('Color');
                        r &&
                            (t[te.STYLE_KEYS.TEXT_COLOR] =
                                '#' + r.substring(2));
                        const o = n.getAttribute('Name');
                        o && (t[te.STYLE_KEYS.FONT_FAMILY] = o);
                        const a = n.getAttribute('Size');
                        a && (t[te.STYLE_KEYS.FONT_SIZE] = a);
                        'true' === n.getAttribute('Bold') &&
                            (t[te.STYLE_KEYS.FONT_WEIGHT] = 'bold');
                        'true' === n.getAttribute('Italic') &&
                            (t[te.STYLE_KEYS.FONT_STYLE] = 'italic');
                        const s = n.getAttribute('Underline'),
                            l = n.getAttribute('Strikethrough');
                        ('true' !== s && 'true' !== l) ||
                            (t[te.STYLE_KEYS.TEXT_DECORATION] =
                                ('true' === s ? 'underline ' : '') +
                                ('true' === l ? 'line-through' : ''));
                    }
                    function p(e) {
                        return (72 * e) / 25.4;
                    }
                    function T(e, t) {
                        return Array.from(e.childNodes).filter(
                            (e) => e.tagName && e.tagName === t
                        );
                    }
                    function u(e, t) {
                        const i = Array.from(e.childNodes).filter(
                            (e) => e.tagName && e.tagName === t
                        );
                        return i && i[0];
                    }
                    return (
                        (a.rootTopic = l(u(s, 'Topic'), {
                            defaultTitle: 'Central Topic',
                            idDetached: !1,
                            isRoot: !0,
                        })),
                        c(u(i, 'Relationships')),
                        f(u(i, 'StyleGroup')),
                        o.workbook
                    );
                })(new DOMParser().parseFromString(n, 'application/xml'), i);
                if (!o) throw new Error('No content');
                return o;
            },
            fromMarkdown: ft,
            fromTextBundlePack: async function (e) {
                return new pe.a().loadAsync(e).then(ft);
            },
            fromTextBundle: function (e, t) {
                if (!e) throw new Error('No content');
                const i = new pe.a();
                if ((i.file(H, e), 'object' == typeof t))
                    for (const [e, n] of Object.entries(t))
                        i.file(`${P}${e}`, n);
                return ft(i);
            },
            toMarkdown: wt,
            toTextBundlePack: async function (e = {}, t = {}) {
                const i = new pe.a(),
                    { manifest: n } = e,
                    r = 'Textbundle.textbundle/',
                    { mdText: o, infoJson: a } = await Pt(e, t);
                if (
                    (i.file(`${r}${H}`, o), n && 'object' == typeof n.resources)
                )
                    for (const [e, t] of Object.entries(n.resources))
                        B(e) && i.file(`${r}${P}${e.replace(Rt, '')}`, t);
                return (
                    i.file(`${r}info.json`, a),
                    i.generateAsync({
                        type: 'uint8array',
                        compression: 'DEFLATE',
                    })
                );
            },
            toTextBundle: Pt,
            fromOPML: async function (e) {
                const t = new o.DOMParser({
                        errorHandler: {
                            fatalError: (e) => {
                                throw new Error(e);
                            },
                        },
                    }).parseFromString(e, 'text/xml'),
                    i =
                        t.getElementsByTagName('opml') &&
                        t.getElementsByTagName('opml')[0];
                if (
                    !(
                        i &&
                        i.getAttribute('version') &&
                        i.getElementsByTagName('head') &&
                        i.getElementsByTagName('head')[0] &&
                        i.getElementsByTagName('body') &&
                        i.getElementsByTagName('body')[0]
                    )
                )
                    throw new Error('Invaild OPML Format');
                const n = i.getElementsByTagName('body')[0],
                    r = Array.from(n.childNodes).filter((e) => Et(e)),
                    a = r.shift();
                if (!a) throw new Error('Invaild OPML Format');
                let s = -50,
                    l = 0;
                a[At] = Array.from(r).map(
                    (e) => ((e[vt] = { x: (s += 0), y: (l += 150) }), e)
                );
                const c = _t(a);
                if (!c) throw new Error('Invaild OPML Format');
                return {
                    id: k(),
                    sheets: [{ id: k(), title: 'sheet', rootTopic: c }],
                    manifest: M,
                };
            },
            toOPML: async function (e, t) {
                const { sheets: i } = e,
                    { textWatermark: n } = t;
                if (!Array.isArray(i) || !i[0])
                    throw (
                        Re.b.get(te.CONFIG.LOGGER).error({
                            [Ht]: 'fail to load first sheets',
                        }),
                        new Error('fail to load first shees')
                    );
                const r = i[0].rootTopic();
                if (!r)
                    throw (
                        Re.b.get(te.CONFIG.LOGGER).error({
                            [Ht]: 'fail to load rootTopic',
                        }),
                        new Error('fail to load rootTopi')
                    );
                let o = '';
                return (
                    (o += Ft('<?xml version="1.0" encoding="UTF-8"?>')),
                    (o += Ft('<opml version="1.0">')),
                    (o += Ft('<head>', { indent: 1 })),
                    (o += Ft(`<dateCreated>${new Date()}</dateCreated>`, {
                        indent: 2,
                    })),
                    (o += Ft(`<dateModified>${new Date()}</dateModified>`, {
                        indent: 2,
                    })),
                    (o += Ft('</head>', { indent: 1 })),
                    (o += Ft('<body>', { indent: 1 })),
                    (o += Bt(r)),
                    n &&
                        (o += Ft(`<outline text="${n}"></outline>`, {
                            indent: 2,
                        })),
                    (o += Ft('</body>', { indent: 1 })),
                    (o += Ft('</opml>')),
                    o
                );
            },
            fromMindNode: Lt,
            fromMindNodeZip: async function (e) {
                const t = new pe.a(),
                    i = await t.loadAsync(e);
                if (!i) throw new Error('No content!');
                const n = await i.file('contents.xml');
                if (!n) throw new Error('No contents.xml');
                const o = await n.async('nodebuffer'),
                    l = {},
                    c = r.a.algo.SHA256.create();
                return (
                    i.folder('resources').forEach(async (e, t) => {
                        if (t.dir) return;
                        const i = await t.async('nodebuffer'),
                            n = new Uint8Array(i),
                            o = c
                                .update(r.a.lib.WordArray.create(n))
                                .finalize()
                                .toString(r.a.enc.Hex),
                            d = t.name.replace(/^.*[\\/]/, ''),
                            f = d.split('.').pop(),
                            h = `${a}/${o}${f}`;
                        ((l[d] = h), (M[s][h] = {}), (M[a][h] = n));
                    }),
                    Lt(o, l, M)
                );
            },
            isFileEncrypted: function (e) {
                return new Promise((t, i) => {
                    if (Z(e, y, v)) {
                        const n = J(e, C, A);
                        if (!n) return i('not a valid XMind File');
                        n.async('string').then((e) => {
                            const i = JSON.parse(e),
                                n = i[c];
                            for (const e in i[s]) {
                                if (i[s][e][d])
                                    return t({
                                        passwordHint: n,
                                        encrypted: !0,
                                    });
                            }
                            return t(!1);
                        });
                    } else if (Z(e, _, w)) {
                        const n = J(e, E, N);
                        if (!n) return i('not a valid XMind File');
                        n.async('string').then((e) => {
                            const i = new o.DOMParser().parseFromString(
                                e,
                                'application/xml'
                            );
                            (i &&
                                i.getElementsByTagName('manifest') &&
                                i.getElementsByTagName('manifest').length) ||
                                t(!1);
                            const n = i
                                .getElementsByTagName('manifest')[0]
                                .getAttribute(c);
                            return (
                                Array.from(i.getElementsByTagName(l)).forEach(
                                    (e) => {
                                        if (
                                            e.getElementsByTagName(d) &&
                                            e.getElementsByTagName(d).length
                                        )
                                            return t({
                                                passwordHint: n,
                                                encrypted: !0,
                                            });
                                    }
                                ),
                                t(!1)
                            );
                        });
                    } else i('not a valid XMind File');
                });
            },
            encryptContent: function (e, t) {
                const i = Y(t);
                return {
                    encryptedContent: j(D(e, i).ciphertext),
                    encryptData: U(i),
                };
            },
            decryptContent: function (e, t, i) {
                return V(e, G(t, i)).toString(r.a.enc.Utf8);
            },
            wordToUint8Array: j,
            base64ToUint8Array: function (e) {
                return j(r.a.enc.Base64.parse(e));
            },
            generateOptions: G,
            decrypt: V,
        };
    },
];
