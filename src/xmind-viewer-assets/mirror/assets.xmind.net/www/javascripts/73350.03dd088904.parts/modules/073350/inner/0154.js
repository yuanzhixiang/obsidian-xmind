export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return M;
        });
        var n = i(3),
            r = i(11),
            o = i(0),
            a = i(16);
        let s;
        function l() {
            return window.indexedDB
                ? new Promise((e, t) => {
                      const i = indexedDB.open('Snowbrush');
                      ((i.onerror = () => {
                          t('can not open indexDB');
                      }),
                          (i.onsuccess = () => {
                              ((s = i.result), e(s));
                          }),
                          (i.onupgradeneeded = (e) => {
                              e.target.result.createObjectStore(
                                  'clipboardData'
                              );
                          }));
                  })
                : new Promise((e, t) => {
                      t('browser do not support indexedDB');
                  });
        }
        var c = {
                write(e) {
                    return new Promise((t, i) => {
                        function n() {
                            a.b.get(o.CONFIG.LOGGER).info('db write', e);
                            s.transaction('clipboardData', 'readwrite')
                                .objectStore('clipboardData')
                                .put(e, 'key')
                                .addEventListener('success', (e) => {
                                    t();
                                });
                        }
                        s
                            ? n()
                            : l()
                                  .then(() => {
                                      n();
                                  })
                                  .catch(i);
                    });
                },
                read(e) {
                    return new Promise((t, i) => {
                        function n() {
                            s
                                .transaction('clipboardData', 'readwrite')
                                .objectStore('clipboardData')
                                .get('key').onsuccess = (n) => {
                                const r = n.target.result;
                                r
                                    ? t(e ? r[e] : r)
                                    : i('clipboardData is not existing');
                            };
                        }
                        s
                            ? n()
                            : l()
                                  .then(() => {
                                      n();
                                  })
                                  .catch(i);
                    });
                },
                clear() {
                    (function () {
                        const e = [];
                        let t;
                        for (let i = 0; i < localStorage.length; i++)
                            ((t = localStorage.key(i)),
                                0 === t.indexOf('sbClipBoardData:') &&
                                    e.push(t));
                        return e;
                    })().forEach((e) => localStorage.clear(e));
                },
            },
            d = i(14),
            f = i(97);
        const h = '\r\n',
            p = new RegExp('\r\n$'),
            T = /data:image[\s\S]*;base64,/,
            u = {
                linefeed: h,
                formChildIdMap(e, t) {
                    if (!e) return;
                    e.getChildrenBranchesByType([
                        o.TOPIC_ATTACHED,
                        o.TOPIC_DETACHED,
                        o.TOPIC_CALLOUT,
                        o.TOPIC_SUMMARY,
                    ]).forEach((e, i) => {
                        const n = e.model.get('id');
                        (n && (t[n] = !0), u.formChildIdMap(e, t));
                    });
                },
                serializeBranch(e) {
                    let t = '';
                    return (
                        (function e(i, n) {
                            if (i.isSelected) {
                                t += n + i.model.get('title') + h;
                                i.getChildrenBranchesByType([
                                    o.TOPIC_ATTACHED,
                                    o.TOPIC_DETACHED,
                                    o.TOPIC_CALLOUT,
                                    o.TOPIC_SUMMARY,
                                ]).forEach((t, i) => {
                                    e(t, n + '\t');
                                });
                            }
                        })(e, ''),
                        t.replace(p, '')
                    );
                },
                serializeBranchToString(e) {
                    let t = '';
                    return (
                        (function e(i, n) {
                            t += n + (i.title ? i.title : '') + h;
                            const r = [];
                            i.children &&
                                (i.children[o.TOPIC_ATTACHED] &&
                                    r.push(...i.children[o.TOPIC_ATTACHED]),
                                i.children[o.TOPIC_DETACHED] &&
                                    r.push(...i.children[o.TOPIC_DETACHED]),
                                i.children[o.TOPIC_CALLOUT] &&
                                    r.push(...i.children[o.TOPIC_CALLOUT]),
                                i.children[o.TOPIC_SUMMARY] &&
                                    r.push(...i.children[o.TOPIC_SUMMARY]));
                            r.forEach((t, i) => {
                                e(t, n + '\t');
                            });
                        })(e, ''),
                        t.replace(p, '')
                    );
                },
                toJson(e) {
                    const t = {};
                    return (i(e, t), JSON.parse(JSON.stringify(t)));
                    function i(e, t) {
                        const i = e.getChildrenBranchesByType(o.TOPIC_ATTACHED);
                        for (const r in e.model.attributes)
                            e.collapse
                                ? (t[r] = e.model.attributes[r])
                                : 'boundaries' !== r
                                  ? 'summaries' !== r
                                      ? 'children' !== r &&
                                        (t[r] = e.model.attributes[r])
                                      : (t.summaries = n(e, i, 'summaries'))
                                  : (t.boundaries = n(e, i, 'boundaries'));
                        (r(e, t, o.TOPIC_ATTACHED),
                            r(e, t, o.TOPIC_CALLOUT),
                            r(e, t, o.TOPIC_DETACHED),
                            t.summaries &&
                                t.summaries.length > 0 &&
                                r(e, t, o.TOPIC_SUMMARY));
                    }
                    function n(e, t, i) {
                        return e.model.attributes[i].filter((e) => {
                            if (e.range)
                                try {
                                    const i = e.range.substr(1, 4).split(','),
                                        n = Number.parseInt(i[0]),
                                        r = Number.parseInt(i[1]);
                                    for (let e = n; e <= r; e++) {
                                        const i = t[e];
                                        if (!u.isAllSelected(i)) return !1;
                                    }
                                    return !0;
                                } catch (e) {}
                            return !1;
                        });
                    }
                    function r(e, t, n) {
                        const r = e.getChildrenBranchesByType(n);
                        r &&
                            r.forEach((e, r) => {
                                if (e.isSelected || n === o.TOPIC_SUMMARY) {
                                    (t.children || (t.children = {}),
                                        t.children[n] || (t.children[n] = []));
                                    const r = {};
                                    (t.children[n].push(r), i(e, r));
                                }
                            });
                    }
                },
                isAllSelected(e) {
                    if (!e.isSelected) return !1;
                    if (e.collapse) return !0;
                    const t = e.getChildrenBranchesByType(o.TOPIC_ATTACHED);
                    for (const e of t) {
                        const t = u.isAllSelected(e);
                        if (!t) return t;
                    }
                    return !0;
                },
                deserialize(e, t) {
                    const i = e.split(/\r\n|\n|\r/),
                        n = [],
                        r = [];
                    return (
                        i.forEach((e, i) => {
                            if ('' === e) return;
                            const o = e.match(/^\t*/)[0].length,
                                a = e.substr(o),
                                s = u.createTopicData(a, t);
                            let l = n.pop();
                            if (l)
                                if (o > n.length)
                                    (u.appendChildTopic(l, s),
                                        n.push(l),
                                        n.push(s));
                                else {
                                    for (; o < n.length; ) n.pop();
                                    o === n.length &&
                                        ((l = n[n.length - 1]),
                                        l
                                            ? u.appendChildTopic(l, s)
                                            : r.push(s),
                                        n.push(s));
                                }
                            else (r.push(s), n.push(s));
                        }),
                        r
                    );
                },
                createTopicData(e, t) {
                    return {
                        id: t.generateComponentId(),
                        title: e,
                    };
                },
                appendChildTopic(e, t) {
                    e.children || (e.children = {});
                    const i = e.children;
                    (i.attached || (i.attached = []), i.attached.push(t));
                },
                loadUrlAsBuffer(e) {
                    return new Promise((t, i) => {
                        if (d.a.isBase64Url(e))
                            t(
                                d.a.base64ToArrayBuffer(
                                    e.slice(e.match(T)[0].length)
                                )
                            );
                        else if (0 === e.indexOf('blob:'))
                            i('can not load blob objectUrl');
                        else {
                            const n = new XMLHttpRequest();
                            (n.addEventListener('readystatechange', (r) => {
                                if (n.readyState === XMLHttpRequest.DONE) {
                                    const s = n.response && 0 === n.status;
                                    if (200 === n.status || s) {
                                        const e = n.response;
                                        t(e);
                                    } else
                                        (a.b
                                            .get(o.CONFIG.LOGGER)
                                            .warn('load xap url fail', e, r),
                                            i('load xap url fail', e, r));
                                }
                            }),
                                n.open('GET', e),
                                (n.responseType = 'arraybuffer'),
                                n.send());
                        }
                    });
                },
                normalizeUrlToBase64(e) {
                    return new Promise((t, i) => {
                        if (d.a.isBase64Url(e)) t(e);
                        else if (0 === e.indexOf('blob:'));
                        else {
                            const n = new XMLHttpRequest();
                            (n.addEventListener('readystatechange', (r) => {
                                if (n.readyState === XMLHttpRequest.DONE)
                                    if (200 === n.status) {
                                        const e = n.response;
                                        t(d.a.arrayBufferToBase64(e));
                                    } else
                                        (a.b
                                            .get(o.CONFIG.LOGGER)
                                            .warn('load xap url fail', e, r),
                                            i('load xap url fail', e, r));
                            }),
                                n.open('GET', e),
                                (n.responseType = 'arraybuffer'),
                                n.send());
                        }
                    });
                },
            };
        var g = u;
        var Q = class {
                constructor(e) {
                    ((this.context = e), (this.dataTransfer = null));
                }
                _xapGen(...e) {
                    const t = this.context.config(o.CONFIG.XAP_GENERATOR);
                    return t
                        ? t(...e)
                        : Promise.reject('xap generator unfound');
                }
                _xapLoader(...e) {
                    return this.context.config(o.CONFIG.XAP_LOADER)(...e);
                }
                async readImageArr() {
                    const e = await this.context.config(
                        o.CONFIG.CLIPBOARD_READER
                    )('image/*');
                    if (e) {
                        const t = [
                            this._xapGen({
                                extType: e.type,
                                data: e.content,
                            }),
                        ];
                        return t.length
                            ? Promise.all(t)
                            : Promise.reject('image unfound in clipboard');
                    }
                    if (
                        this.dataTransfer &&
                        this.dataTransfer.files[0] &&
                        -1 !== this.dataTransfer.files[0].type.indexOf('image')
                    ) {
                        const e = Array.from(this.dataTransfer.files).reduce(
                            (e, t) => {
                                if (-1 !== t.type.indexOf('image')) {
                                    const i = t.path,
                                        n = f.extname(i),
                                        r = n.startsWith('.') ? n.substr(1) : n;
                                    e.push(
                                        this._xapGen({
                                            extType: r,
                                            data: i,
                                        })
                                    );
                                }
                                return e;
                            },
                            []
                        );
                        return e.length
                            ? Promise.all(e)
                            : Promise.reject('image unfound in clipboard');
                    }
                }
                async readMathJaxObjectList() {
                    return this.readObj().then((e) =>
                        e['text/x-type'] === o.VIEW_TYPE.MATH_JAX
                            ? Promise.resolve(e)
                            : Promise.reject()
                    );
                }
                readObj() {
                    return Promise.all([
                        this.readPlainText(),
                        c.read('text/plain'),
                    ])
                        .then((e) =>
                            e.some((e) => null == e)
                                ? Promise.reject('text is undefined')
                                : e[0].replace(/\n|\r|\r\n/g, '') ===
                                    e[1].replace(/\n|\r|\r\n/g, '')
                                  ? c.read()
                                  : Promise.reject('plain text not match')
                        )
                        .then((e) =>
                            Promise.all(
                                Object.keys(e.xapInfoMap).map((t) =>
                                    this._xapGen({
                                        extType: t.match(/\.(.+)$/)[1],
                                        data: e.xapInfoMap[t],
                                    }).then((i) => {
                                        e.xapInfoMap[t] = i;
                                    })
                                )
                            ).then(() => e)
                        )
                        .then(
                            (e) => (
                                (e['text/x-array-json'] = e[
                                    'text/x-array-json'
                                ].map(
                                    (t) => (
                                        t.xapPaths.forEach((i) => {
                                            '/' !== i[0] &&
                                                d.a.replaceValueInObject(
                                                    t.data,
                                                    i,
                                                    (t) => e.xapInfoMap[t]
                                                );
                                        }),
                                        t.data
                                    )
                                )),
                                e
                            )
                        );
                }
                async readPlainText() {
                    const e = await this.context.config(
                        o.CONFIG.CLIPBOARD_READER
                    )('text/plain');
                    return null == e
                        ? this.dataTransfer
                            ? this.dataTransfer.getData('text/plain')
                            : c.read('text/plain')
                        : e;
                }
                async readHTML() {
                    let e = await this.context.config(
                        o.CONFIG.CLIPBOARD_READER
                    )('text/html');
                    return (
                        e ||
                            (e = this.dataTransfer
                                ? this.dataTransfer.getData('text/html')
                                : c.read('text/html')),
                        e
                    );
                }
                write(e) {
                    if (!e)
                        return void a.b
                            .get(o.CONFIG.LOGGER)
                            .error('something wrong!');
                    const t = this.context.config(o.CONFIG.CLIPBOARD_WRITER);
                    t
                        ? t(e)
                        : this.dataTransfer
                          ? this.dataTransfer.setData(
                                'text/plain',
                                e['text/plain']
                            )
                          : this.context.callService(
                                'copyToClipboard',
                                e['text/plain']
                            );
                    const i = {},
                        n = e['text/x-array-json'].map((e) => ({
                            data: e,
                            xapPaths: [],
                        }));
                    return (
                        n.forEach((e) => {
                            d.a
                                .getXapInData(
                                    e.data,
                                    this.context.model.get('legend')
                                )
                                .forEach((t) => {
                                    (e.xapPaths.push(t.path),
                                        (i[t.content] = !0));
                                });
                        }),
                        (e['text/x-array-json'] = n),
                        Promise.all(
                            Object.keys(i).map((e) =>
                                this._xapLoader(e)
                                    .then((e) => g.loadUrlAsBuffer(e))
                                    .then((t) => (i[e] = t))
                            )
                        ).then(() => {
                            ((e.xapInfoMap = i), c.write(e));
                        })
                    );
                }
                reset() {
                    this.dataTransfer = null;
                }
                setDataTransfer(e) {
                    this.dataTransfer = e;
                }
            },
            m = i(37);
        class b {
            constructor(e) {
                ((this.selectedBranchArray = e
                    .filter((e, t) => {
                        if ('branch' === e.type) return !0;
                    })
                    .sort((e, t) => {
                        const i = e.parent(),
                            n = t.parent();
                        if (i && i === n && 'branch' === i.type) {
                            return (
                                i.model.getChildrenIndexById(e.model.id) -
                                i.model.getChildrenIndexById(t.model.id)
                            );
                        }
                        return 0;
                    })),
                    (this.generatedData = {}));
            }
            _generateWrappedBranch(e) {
                if (
                    (this.wrapedBranchesObj[e.model.id] ||
                        (this.wrapedBranchesObj[e.model.id] = {
                            branch: e,
                        }),
                    e.isDetachedBranch())
                )
                    return;
                let t = e.parent(),
                    i = 0;
                for (; t && 'branch' === t.type && !t.isDetachedBranch(); ) {
                    if (this.selectedBranchArray.indexOf(t) >= 0) {
                        const e =
                            this.wrapedBranchesObj[t.model.id] ||
                            (this.wrapedBranchesObj[t.model.id] = {
                                branch: t,
                            });
                        0 === i ? (e.hasChild = !0) : (e.hasGrandChild = !0);
                    }
                    ((t = t.parent()), i++);
                }
            }
            _generateMaterial() {
                ((this.wrapedBranchesObj = {}),
                    this.selectedBranchArray.forEach((e) => {
                        this._generateWrappedBranch(e);
                    }),
                    (this.groupedSelectedBranchArray =
                        this.selectedBranchArray.filter((e, t) => {
                            const i = e.parent();
                            let n = !1;
                            if (i && i.getChildrenBranchesByType) {
                                const t = i.getChildrenBranchesByType(
                                    o.TOPIC_TYPE.DETACHED
                                );
                                t && t.length > 0 && (n = t.includes(e));
                            }
                            return n || !this.selectedBranchArray.includes(i);
                        })));
            }
            generateData() {
                (this._generateMaterial(),
                    (this.generatedDataForTopic = []),
                    this.groupedSelectedBranchArray.forEach((e) => {
                        const t = {};
                        (this._generateDataForTopic(e, t),
                            this.generatedDataForTopic.push(
                                JSON.parse(JSON.stringify(t))
                            ));
                    }));
                const e = [];
                return (
                    this.groupedSelectedBranchArray.forEach((t) => {
                        const i = t.parent();
                        e.includes(i) || 'branch' !== i.type || e.push(i);
                    }),
                    (this.generatedDataForBoundaryInParent = []),
                    this._generateDataForBoundaryInParent(e),
                    (this.generatedDataForSummaryInParent = []),
                    this._generateDataForSummaryInParent(e),
                    (this.generatedDataForRelationship = []),
                    this._generateDataForRelationship(
                        this.generatedDataForTopic,
                        this.generatedDataForSummaryInParent
                    ),
                    {
                        topic: this.generatedDataForTopic,
                        boundary: this.generatedDataForBoundaryInParent,
                        summary: this.generatedDataForSummaryInParent,
                        relationship: this.generatedDataForRelationship,
                    }
                );
            }
            _generateDataForRelationship(e, t) {
                const i = [];
                (e &&
                    e.forEach((e) => {
                        i.push(...this._extractIds(e, []));
                    }),
                    t &&
                        t.forEach((e) => {
                            i.push(...this._extractIds(e.st, []));
                        }));
                const n = this.selectedBranchArray[0]
                    .getContext()
                    .getSheetView().model.attributes.relationships;
                n &&
                    n.forEach((e) => {
                        if (e) {
                            const t = e.end1Id,
                                n = e.end2Id;
                            i.includes(t) &&
                                i.includes(n) &&
                                this.generatedDataForRelationship.push(e);
                        }
                    });
            }
            _extractIds(e, t = []) {
                if (!e) return t;
                if ((t.includes(e.id) || t.push(e.id), e.children)) {
                    const i = [];
                    (e.children[o.TOPIC_TYPE.ATTACHED] &&
                        i.push(...e.children[o.TOPIC_TYPE.ATTACHED]),
                        e.children[o.TOPIC_TYPE.DETACHED] &&
                            i.push(...e.children[o.TOPIC_TYPE.DETACHED]),
                        e.children[o.TOPIC_TYPE.CALLOUT] &&
                            i.push(...e.children[o.TOPIC_TYPE.CALLOUT]),
                        e.children[o.TOPIC_TYPE.SUMMARY] &&
                            i.push(...e.children[o.TOPIC_TYPE.SUMMARY]),
                        i.forEach((e) => {
                            e && this._extractIds(e, t);
                        }));
                }
                return t;
            }
            _generateDataForBoundaryInParent(e) {
                e.forEach((e) => {
                    const t = e.getChildrenBranchesByType(
                            o.TOPIC_TYPE.ATTACHED
                        ),
                        i = e.model.attributes.boundaries;
                    i &&
                        i.forEach((e) => {
                            if (e && e.range)
                                try {
                                    const i = e.range.substr(1, 4).split(','),
                                        n = Number.parseInt(i[0]),
                                        r = Number.parseInt(i[1]);
                                    if (r < t.length) {
                                        let i = [];
                                        for (let e = n; e <= r; e++) {
                                            const n = t[e];
                                            if (!this.isAllSelected(n)) {
                                                i = [];
                                                break;
                                            }
                                            i.push(n.model.id);
                                        }
                                        i.length > 0 &&
                                            this.generatedDataForBoundaryInParent.push(
                                                {
                                                    title: e.title,
                                                    content: i,
                                                }
                                            );
                                    }
                                } catch (e) {}
                        });
                });
            }
            _generateDataForSummaryInParent(e) {
                e.forEach((e) => {
                    const t = e.getChildrenBranchesByType(
                            o.TOPIC_TYPE.ATTACHED
                        ),
                        i = e.model.attributes.summaries;
                    i &&
                        i.forEach((i) => {
                            if (i && i.range)
                                try {
                                    const n = i.range.substr(1, 4).split(','),
                                        r = Number.parseInt(n[0]),
                                        a = Number.parseInt(n[1]);
                                    if (a < t.length) {
                                        let n = [];
                                        for (let e = r; e <= a; e++) {
                                            const i = t[e];
                                            if (!this.isAllSelected(i)) {
                                                n = [];
                                                break;
                                            }
                                            n.push(i.model.id);
                                        }
                                        let s = e.model.children(
                                            o.TOPIC_TYPE.SUMMARY
                                        );
                                        ((s = s.filter(
                                            (e) => e.id === i.topicId
                                        )),
                                            1 === s.length &&
                                                n.length > 0 &&
                                                this.generatedDataForSummaryInParent.push(
                                                    {
                                                        title: i.title,
                                                        content: n,
                                                        st: s[0].toJSON(),
                                                    }
                                                ));
                                    }
                                } catch (e) {}
                        });
                });
            }
            _generateDataForTopic(e, t) {
                var i;
                ((t.id = e.model.attributes.id),
                    (t.title = e.model.attributes.title),
                    (t.style = e.model.attributes.style));
                const n = e.getChildrenBranchesByType(o.TOPIC_TYPE.ATTACHED);
                (e.model.attributes.boundaries &&
                    (t.boundaries = this._transRange(e, n, 'boundaries')),
                    e.model.attributes.summaries &&
                        (t.summaries = this._transRange(e, n, 'summaries')));
                const r = this.wrapedBranchesObj[e.model.id];
                if (r.hasChild)
                    (this._transBranchChildrenForHasChildMode(
                        e,
                        t,
                        o.TOPIC_TYPE.ATTACHED
                    ),
                        this._transBranchChildrenForHasChildMode(
                            e,
                            t,
                            o.TOPIC_TYPE.CALLOUT
                        ),
                        t.summaries &&
                            t.summaries.length > 0 &&
                            this._transBranchChildrenForHasChildMode(
                                e,
                                t,
                                o.TOPIC_TYPE.SUMMARY
                            ));
                else if (r.hasGrandChild);
                else {
                    const n = e.model.toJSON();
                    for (const e in n)
                        if ('children' === e) {
                            const i = [
                                    o.TOPIC_TYPE.ATTACHED,
                                    o.TOPIC_TYPE.SUMMARY,
                                    o.TOPIC_TYPE.CALLOUT,
                                ],
                                r = (t) => {
                                    t &&
                                        i.forEach((i) => {
                                            var n;
                                            null === (n = t[i]) ||
                                                void 0 === n ||
                                                n.forEach((t) => {
                                                    var i;
                                                    const n =
                                                        null ===
                                                            (i = t.style) ||
                                                        void 0 === i
                                                            ? void 0
                                                            : i.properties[
                                                                  o.STYLE_KEYS
                                                                      .TEXT_TRANSFORM
                                                              ];
                                                    ((t.title = n
                                                        ? d.a.getTransformedText(
                                                              t.title,
                                                              n
                                                          )
                                                        : t.title),
                                                        r(t[e]));
                                                });
                                        });
                                },
                                a = n[e];
                            (r(a), (t[e] = a));
                        } else if ('title' === e) {
                            const r =
                                null === (i = n.style) || void 0 === i
                                    ? void 0
                                    : i.properties[o.STYLE_KEYS.TEXT_TRANSFORM];
                            t[e] = r
                                ? d.a.getTransformedText(t.title, r)
                                : n[e];
                        } else t[e] = n[e];
                }
            }
            _transBranchChildrenForHasChildMode(e, t, i) {
                const n = e.getChildrenBranchesByType(i);
                n &&
                    n.length > 0 &&
                    n.forEach((e) => {
                        if (
                            (i === o.TOPIC_TYPE.SUMMARY &&
                                this._generateWrappedBranch(e),
                            this.wrapedBranchesObj[e.model.id])
                        ) {
                            (t.children || (t.children = {}),
                                t.children[i] || (t.children[i] = []));
                            const n = {};
                            (t.children[i].push(n),
                                this._generateDataForTopic(e, n));
                        }
                    });
            }
            isAllSelected(e) {
                const t = this.wrapedBranchesObj[e.model.id];
                return t && !t.hasChild && !t.hasGrandChild;
            }
            _transRange(e, t, i) {
                return e.model.attributes[i].filter((e) => {
                    if (e.range)
                        try {
                            const i = e.range.substr(1, 4).split(','),
                                n = Number.parseInt(i[0]),
                                r = Number.parseInt(i[1]);
                            for (let e = n; e <= r; e++) {
                                const i = t[e];
                                if (!i || !this.isAllSelected(i)) return !1;
                            }
                            return !0;
                        } catch (e) {}
                    return !1;
                });
            }
        }
        var C = i(5);
        const L = {
            [o.VIEW_TYPE.BRANCH]: {
                copy: '_copyTopic',
                paste: '_addTopics',
            },
            [o.VIEW_TYPE.IMAGE]: {
                copy: '_copyImage',
                paste: '_addImages',
            },
            [o.VIEW_TYPE.MARKER]: {
                copy: '_copyMarker',
                paste: '_addMarkers',
            },
            [o.VIEW_TYPE.MATH_JAX]: {
                copy: '_copyMathJax',
                paste: '_addMathJax',
            },
        };
        class y {
            constructor(e) {
                ((this.context = e), (this.clipboardHelper = new Q(e)));
            }
            copy(e, t) {
                this.copyTargets = (null == t ? void 0 : t.length)
                    ? t
                    : this.context
                          .getModule(o.MODULE_NAME.SELECTION)
                          .getSelections();
                const i = this.copyTargets[0];
                if (!i) return;
                const n = L[i.type],
                    r = n && n.copy;
                return r
                    ? (this.clipboardHelper.reset(),
                      e &&
                          (this.clipboardHelper.setDataTransfer(
                              e.clipboardData
                          ),
                          e.preventDefault()),
                      this[r](e))
                    : void 0;
            }
            paste(
                e,
                {
                    toImage: t,
                    toMarker: i,
                    toBranch: n,
                    toMathJax: r,
                    clientPosition: a,
                } = {}
            ) {
                (e &&
                    (e.preventDefault(),
                    this.clipboardHelper.setDataTransfer(e.clipboardData)),
                    (this.pasteClintPosition = a));
                const s = [];
                (t && s.push(o.VIEW_TYPE.IMAGE),
                    i && s.push(o.VIEW_TYPE.MARKER),
                    n && s.push(o.VIEW_TYPE.BRANCH),
                    r && s.push(o.VIEW_TYPE.MATH_JAX),
                    this._processXMindObject(s)
                        .catch(() =>
                            this._processImageList(s).catch(() =>
                                this._processPlainText(s).catch(() => {
                                    this._processSystemPaste();
                                })
                            )
                        )
                        .finally(() => {
                            delete this.pasteClintPosition;
                        }));
            }
            _copyTopic() {
                const e = this.copyTargets;
                if (e && e.length > 0) {
                    const t = new b(e).generateData();
                    if (t && t.topic && t.topic.length > 0) {
                        const e = t.topic
                            .map((e) => e && g.serializeBranchToString(e))
                            .filter((e) => !!e)
                            .join(g.linefeed);
                        return (
                            this.clipboardHelper
                                .write({
                                    'text/plain': e,
                                    'text/x-array-json': t.topic,
                                    'text/x-type': o.VIEW_TYPE.BRANCH,
                                    'text/x-other-object-json': {
                                        relationship: t.relationship,
                                        boundary: t.boundary,
                                        summary: t.summary,
                                        sheetId:
                                            this.context.getSheetModel().id,
                                    },
                                })
                                .catch(() => {
                                    a.b
                                        .get(o.CONFIG.LOGGER)
                                        .warn('something wrong copy fail');
                                }),
                            !0
                        );
                    }
                }
            }
            _addTopics(e, t = {}) {
                const i = this.context.getSheetView(),
                    a = this.context
                        .getModule(o.MODULE_NAME.SELECTION)
                        .getSelections();
                let s = !1;
                (a.length || (a.push(i.centralBranchView), (s = !0)),
                    a
                        .filter((e) => e.type === o.VIEW_TYPE.BRANCH)
                        .forEach((a) => {
                            const l = a.model;
                            let c = {};
                            if (
                                (e.forEach((e) => {
                                    var i;
                                    e = JSON.parse(JSON.stringify(e));
                                    const a = r.a.replaceId(e, () =>
                                        Object(C.b)()
                                    );
                                    c = Object.assign(Object.assign({}, c), a);
                                    const d = Object(m.a)(e, l.ownerSheet());
                                    if (s) {
                                        let n;
                                        const r = this.context
                                            .getSVGView()
                                            .getCanvasControl();
                                        if (this.pasteClintPosition)
                                            n = r
                                                .getCoordinateTransfer()
                                                .viewportToMindMap(
                                                    this.pasteClintPosition
                                                );
                                        else {
                                            const e = r.getVisibleAreaBounds();
                                            n = r
                                                .getCoordinateTransfer()
                                                .visibleAreaToMindMap({
                                                    x: e.width / 2,
                                                    y: e.height / 2,
                                                });
                                        }
                                        (d.changePosition(n),
                                            null === (i = t.boundary) ||
                                                void 0 === i ||
                                                i.forEach((t) => {
                                                    const i = t.content;
                                                    1 === i.length &&
                                                        c[i[0]] === e.id &&
                                                        d.addBoundary({
                                                            id: Object(C.b)(),
                                                            title: t.title,
                                                            range: `(${o.MASTER_RANGE})`,
                                                        });
                                                }));
                                    }
                                    const f = l.addChildTopic(d, {
                                        type: s
                                            ? o.TOPIC_TYPE.DETACHED
                                            : o.TOPIC_TYPE.ATTACHED,
                                    });
                                    if (
                                        t.sheetId &&
                                        t.sheetId !==
                                            this.context.getSheetModel().id
                                    ) {
                                        const e =
                                                this.context.getSVGView()
                                                    .model2View[f.id],
                                            t = e.getDescendantBranchesByType([
                                                o.TOPIC_TYPE.ATTACHED,
                                                o.TOPIC_TYPE.DETACHED,
                                                o.TOPIC_TYPE.SUMMARY,
                                                o.TOPIC_TYPE.CALLOUT,
                                            ]);
                                        [e, ...t].forEach((e) => {
                                            n.a.fixUserStyle(e);
                                        });
                                    }
                                }),
                                (function (e, i) {
                                    const n = t.boundary;
                                    n &&
                                        n.forEach((t) => {
                                            const n = t.content,
                                                r = i[n[0]],
                                                o = i[n[n.length - 1]],
                                                a =
                                                    e.model.getChildrenIndexById(
                                                        r
                                                    ),
                                                s =
                                                    e.model.getChildrenIndexById(
                                                        o
                                                    );
                                            e.model.addBoundary({
                                                id: Object(C.b)(),
                                                title: t.title,
                                                range: `(${a},${s})`,
                                            });
                                        });
                                })(a, c),
                                (function (e, i) {
                                    const n = t.summary;
                                    n &&
                                        n.forEach((t) => {
                                            const n = t.content,
                                                o = i[n[0]],
                                                a = i[n[n.length - 1]],
                                                s =
                                                    e.model.getChildrenIndexById(
                                                        o
                                                    ),
                                                l =
                                                    e.model.getChildrenIndexById(
                                                        a
                                                    ),
                                                c = t.st;
                                            r.a.replaceId(c, () =>
                                                Object(C.b)()
                                            );
                                            const d = {
                                                id: Object(C.b)(),
                                                range: `(${s},${l})`,
                                                topicId: c.id,
                                            };
                                            e.model.addSummary(
                                                d,
                                                !1,
                                                Object(m.a)(
                                                    c,
                                                    e.model.ownerSheet()
                                                )
                                            );
                                        });
                                })(a, c),
                                (function (e, n) {
                                    const r = t.relationship;
                                    r &&
                                        r.forEach((e) => {
                                            (((e = JSON.parse(
                                                JSON.stringify(e)
                                            )).id = Object(C.b)()),
                                                (e.end1Id = n[e.end1Id]),
                                                (e.end2Id = n[e.end2Id]),
                                                e.end1Id &&
                                                    e.end2Id &&
                                                    i.model.addRelationship(e));
                                        });
                                })(0, c),
                                t.sheetId &&
                                    t.sheetId !==
                                        this.context.getSheetModel().id)
                            ) {
                                const e = n.a.getUserStyle(a),
                                    t = e ? e.attributes : { properties: {} };
                                l.setStyleObj(t, !1);
                            }
                        }));
            }
            _copyImage() {
                const e = this.copyTargets
                    .filter((e) => e.type === o.VIEW_TYPE.IMAGE)
                    .map((e) => e.parent().model.get('image'));
                return (
                    this.clipboardHelper.write({
                        'text/plain': JSON.stringify(e),
                        'text/x-array-json': e,
                        'text/x-type': o.VIEW_TYPE.IMAGE,
                    }),
                    !0
                );
            }
            async _addImages(e, t, i) {
                if (0 === e.length) return;
                const n = this.context.config(
                    o.CONFIG.LIMITED_OPERATION_HANDLER
                );
                if (
                    !(
                        i ||
                        (await n(o.SUPPORTED_LIMITED_OPERATIONS.INSERT_IMAGE))
                    )
                )
                    return;
                const r = this._getBranchViewSelections();
                1 === e.length && r.length
                    ? r.forEach((t) => {
                          this.context.execAction(o.ACTION_NAMES.ADD_IMAGE, {
                              imageInfo: e[0],
                              targets: [t],
                          });
                      })
                    : this._addTopics(
                          e.map((e) => ({
                              id: Object(C.b)(),
                              title: '',
                              image: e,
                          }))
                      );
            }
            _copyMarker() {
                const e = this.copyTargets
                    .filter((e) => e.type === o.VIEW_TYPE.MARKER)
                    .map((e) => ({ markerId: e.getMarkerId() }));
                return (
                    this.clipboardHelper.write({
                        'text/plain': JSON.stringify(e),
                        'text/x-array-json': e,
                        'text/x-type': o.VIEW_TYPE.MARKER,
                    }),
                    !0
                );
            }
            _addMarkers(e) {
                const t = this._getBranchViewSelections();
                t.length
                    ? t.forEach((t) => {
                          e.forEach((e) => {
                              t.model.changeMarker(e.markerId);
                          });
                      })
                    : this._addTopics([
                          {
                              id: Object(C.b)(),
                              title: '',
                              markers: [...e],
                          },
                      ]);
            }
            _copyMathJax() {
                const e = this.copyTargets.filter(
                        (e) => e.type === o.VIEW_TYPE.MATH_JAX
                    ),
                    t = e.map((e) => e.parent().model.getMathJaxInfo()),
                    i = e.map((e) => e.parent().model.getImageData());
                return (
                    this.clipboardHelper.write({
                        'text/plain': JSON.stringify(t),
                        'text/x-array-json': t,
                        'text/x-type': o.VIEW_TYPE.MATH_JAX,
                        'text/x-other-object-json': {
                            imageDataList: i,
                        },
                    }),
                    !0
                );
            }
            _addMathJax(e) {
                if (0 === e.length) return;
                const t = this._getBranchViewSelections();
                1 === e.length && t.length
                    ? t.forEach((t) => {
                          t.model.updateMathJaxInfo(
                              JSON.parse(JSON.stringify(e[0]))
                          );
                      })
                    : this._addTopics(
                          e.map((e) => ({
                              id: Object(C.b)(),
                              title: '',
                              extensions: [JSON.parse(JSON.stringify(e))],
                          }))
                      );
            }
            async _processMathJaxObject(e) {
                if (-1 === e.indexOf(o.VIEW_TYPE.MATH_JAX))
                    return Promise.reject();
                const t = await this.clipboardHelper.readMathJaxObjectList();
                this._addMathJax(t['text/x-array-json']);
            }
            _processXMindObject(e) {
                return this.clipboardHelper.readObj().then((t) => {
                    if (-1 === e.indexOf(t['text/x-type']))
                        return Promise.reject();
                    this[L[t['text/x-type']].paste](
                        t['text/x-array-json'],
                        t['text/x-other-object-json'],
                        !0
                    );
                });
            }
            async _processImageList(e) {
                if (-1 === e.indexOf(o.VIEW_TYPE.IMAGE))
                    return Promise.reject();
                let t, i;
                try {
                    t = await this.clipboardHelper.readHTML();
                } catch (e) {}
                try {
                    i = await this.clipboardHelper.readPlainText();
                } catch (e) {}
                if (!!t && !(t && !i)) return Promise.reject();
                const n = await this.clipboardHelper.readImageArr();
                return this._addImages(n.map((e) => ({ src: e, align: 'up' })));
            }
            _processPlainText(e) {
                return this.clipboardHelper.readPlainText().then((t) => {
                    if (!t) return Promise.reject();
                    let i;
                    try {
                        i = JSON.parse(t);
                    } catch (e) {}
                    return i && 'object' == typeof i
                        ? -1 === e.indexOf(i.type)
                            ? Promise.reject()
                            : void this[L[i.type].paste](i.dataArr)
                        : -1 === e.indexOf(o.VIEW_TYPE.BRANCH)
                          ? Promise.reject()
                          : this._addTopics(
                                g.deserialize(
                                    t,
                                    this.context.getSheetView().model
                                )
                            );
                });
            }
            _processSystemPaste() {
                return document.execCommand('paste');
            }
            _getBranchViewSelections() {
                return this.context
                    .getModule(o.MODULE_NAME.SELECTION)
                    .getSelections()
                    .filter((e) => e.type === o.VIEW_TYPE.BRANCH);
            }
        }
        class M {
            constructor(e) {
                const t = new y(e);
                if (
                    !e.config(o.CONFIG.NO_KEYBIND) &&
                    !e.config(o.CONFIG.NO_EDIT_RECEIVER)
                ) {
                    const i = e.getModule(o.MODULE_NAME.EDIT_RECEIVER);
                    (i.on('copy', (e) => {
                        t.copy(e);
                    }),
                        i.on('paste', (i) => {
                            e.isReadOnly() ||
                                t.paste(i, {
                                    toImage: !0,
                                    toMarker: !0,
                                    toBranch: !0,
                                    toMathJax: !0,
                                });
                        }),
                        i.on('cut', (i) => {
                            t.copy(i) &&
                                e.execAction(o.ACTION_NAMES.DELETE_ITEM);
                        }));
                }
                return t;
            }
        }
        M.identifier = o.MODULE_NAME.COPY_PASTE;
    },
];
