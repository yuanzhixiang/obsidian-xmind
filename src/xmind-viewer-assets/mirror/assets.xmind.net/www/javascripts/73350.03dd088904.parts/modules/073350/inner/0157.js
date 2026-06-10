export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return Q;
        });
        var n = i(33),
            r = i(0),
            o = i(16),
            a = i(54),
            s = i(20),
            l = i(14),
            c = i(65);
        class d extends c.a {
            constructor(e) {
                super(e);
            }
            dragStart(e) {
                const t = this.context.getModule(r.MODULE_NAME.ANIMATION);
                return (
                    t &&
                        t.killAnimationByFlag(r.ANIMATION_FLAGS.BRANCH_ZOOM_IN),
                    s.a.work(s.b.PRIORITY.AFTER_EACH, {
                        execute: () => {
                            this.context
                                .getSVGView()
                                .eventBus.trigger('dragStart.dragManager');
                        },
                    }),
                    e
                );
            }
            onDragMoving(e, t) {
                var i;
                if (null === e) return (this._clearDropInfo(), { position: t });
                const n = Object(a.c)(e, this._currentPolygon, t),
                    r = e.getStructureClass().match('anticlockwise');
                let o =
                    'right' ===
                    (null === (i = this._currentPolygon) || void 0 === i
                        ? void 0
                        : i.side);
                return (
                    r && (o = !o),
                    this.updatePlaceholder(e, n, o),
                    (this._draggedViewNewParentView = e),
                    (this._draggedViewNewIndex = n),
                    (this._isCurrentAddToRight = o),
                    { index: n, isAddToRight: o, position: t }
                );
            }
            dragFinish() {
                this.indicatorView.clear();
            }
            isIntersectWithTopic(e) {
                const t = [this.centralBranch];
                for (; t.length; ) {
                    const i = t.shift();
                    if (i.isPlaceHolderView) continue;
                    if (l.a.isTopicIntersectWithPoint(i, e)) return !0;
                    const n = [
                            r.TOPIC_TYPE.CALLOUT,
                            r.TOPIC_TYPE.SUMMARY,
                            r.TOPIC_TYPE.DETACHED,
                            r.TOPIC_TYPE.ATTACHED,
                        ],
                        o = i.getChildrenBranchesByType(n);
                    t.push(...o);
                }
                return !1;
            }
            getDropView(e) {
                const t = this.getDragOverView({
                    position: e,
                    selections: [],
                });
                return this.isIntersectWithTopic(e) ? null : t;
            }
        }
        var f = d,
            h = i(6);
        const p = 'dragenter',
            T = 'drop';
        let u;
        const g = {
            isImage(e) {
                return (
                    !!this.isFile(e) &&
                    0 === e.files[0].type.indexOf(m.DropDataTypes.IMAGE)
                );
            },
            isAttachment(e) {
                return this.isFile(e) && !this.isImage(e);
            },
            isText(e) {
                return !1;
            },
            isFile(e) {
                return 0 !== e.files.length;
            },
            isFolder(e) {
                return Boolean(e.files.length && '' === e.files[0].type);
            },
            isXFile(e) {
                return Boolean(e.getData('isXTypeFile'));
            },
            isDragEnterFileIllegal(e) {
                if (!e) return !0;
                if (e.types.every((e) => 'Files' === e)) {
                    return !Array.from(e.items).every((e) =>
                        e.type.startsWith('image/')
                    );
                }
                return !0;
            },
        };
        class Q {
            constructor(e) {
                ((this._dragHandler = null),
                    (this._dropView = null),
                    (this._branchDragLevelCounterMap = {}),
                    (this._positionTransfer = null),
                    (this._onDragMoving = Object(h.throttle)((e) => {
                        var t, i;
                        ((this._dropView =
                            null === (t = this._dragHandler) || void 0 === t
                                ? void 0
                                : t.getDropView(e)),
                            (this._transferOptions =
                                null === (i = this._dragHandler) || void 0 === i
                                    ? void 0
                                    : i.onDragMoving(this._dropView, e)));
                    }, 100)),
                    (this._context = e),
                    (this._dropHandler = new m(e)),
                    this._initEventListener());
            }
            _initEventListener() {
                const e = this._context;
                (e.onEvent(p, r.VIEW_TYPE.BRANCH, (e) =>
                    this._onBranchDragEnter(e)
                ),
                    e.onEvent('dragleave', r.VIEW_TYPE.BRANCH, (e) =>
                        this._onBranchDragLeave(e)
                    ),
                    e.onEvent(T, r.VIEW_TYPE.BRANCH, (e) =>
                        this._onBranchDrop(e)
                    ),
                    e.onEvent(p, r.VIEW_TYPE.SVG, (e) =>
                        this._onSVGDragEnter(e)
                    ),
                    e.onEvent(
                        'dragover',
                        r.VIEW_TYPE.SVG,
                        n.b(
                            (e) => this._onSVGDragOver(e),
                            (e) => {
                                (e.preventDefault(),
                                    e.originalEvent.dataTransfer &&
                                        (e.originalEvent.dataTransfer.dropEffect =
                                            'copy'));
                            }
                        )
                    ),
                    e.onEvent(T, r.VIEW_TYPE.SVG, (e) => this._onSVGDrop(e)));
            }
            _onBranchDragEnter(e) {
                if ((e.preventDefault(), this._isDragTargetOutOfBranch(e))) {
                    e.sbView.topicView.showSelectBox();
                }
                this._increaseBranchLevel(e);
            }
            _onBranchDragLeave(e) {
                if (
                    (e.preventDefault(),
                    this._decreaseBranchLevel(e),
                    this._isDragTargetOutOfBranch(e))
                ) {
                    e.sbView.topicView.hideSelectBox();
                }
            }
            _onBranchDrop(e) {
                (e.preventDefault(),
                    e.stopPropagation(),
                    this._checkEventValid(e) &&
                        ((this._branchDragLevelCounterMap[e.sbView.cid] = 0),
                        this._dropHandler.dropToBranch(
                            e.sbView,
                            e.originalEvent.dataTransfer,
                            this._dropView,
                            this._transferOptions
                        ),
                        this._dragFinish()));
            }
            _increaseBranchLevel(e) {
                const t = e.sbView.cid;
                (void 0 === this._branchDragLevelCounterMap[t] &&
                    (this._branchDragLevelCounterMap[t] = 0),
                    this._branchDragLevelCounterMap[t]++);
            }
            _decreaseBranchLevel(e) {
                this._branchDragLevelCounterMap[e.sbView.cid]--;
            }
            _isDragTargetOutOfBranch(e) {
                return !this._branchDragLevelCounterMap[e.sbView.cid];
            }
            _onSVGDragEnter(e) {
                (e.preventDefault(),
                    !this._dragHandler &&
                        e.originalEvent.dataTransfer &&
                        this._dragStart(),
                    this._positionTransfer ||
                        (this._positionTransfer = this._context
                            .getSVGView()
                            .getCoordinateTransfer()),
                    g.isDragEnterFileIllegal(e.originalEvent.dataTransfer) ||
                        (e.originalEvent.dataTransfer &&
                            (e.originalEvent.dataTransfer.dropEffect =
                                'copy')));
            }
            _onSVGDragOver(e) {
                var t;
                if ((e.preventDefault(), !e.originalEvent.dataTransfer)) return;
                if (!this._positionTransfer) return;
                const i = this._positionTransfer.viewportToMindMap(
                    this._context.getDragEventClientPosition(e.originalEvent)
                );
                (((e, t) => {
                    if (!e || !t) return !0;
                    return (
                        Math.sqrt(
                            Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2)
                        ) > 4
                    );
                })(
                    i,
                    null === (t = this._transferOptions) || void 0 === t
                        ? void 0
                        : t.position
                ) && this._onDragMoving(i),
                    clearTimeout(u),
                    (u = setTimeout(() => {
                        this._dragFinish();
                    }, 300)));
            }
            _onSVGDrop(e) {
                if ((e.preventDefault(), !e.originalEvent.dataTransfer)) return;
                const t = this._positionTransfer.viewportToMindMap(
                    this._context.getDragEventClientPosition(e.originalEvent)
                );
                (this._dropHandler.dropToSVG(
                    e.originalEvent.dataTransfer,
                    t,
                    this._dropView,
                    this._transferOptions
                ),
                    this._dragFinish());
            }
            _checkEventValid(e) {
                const t = e.originalEvent.dataTransfer;
                return !!(t && t.types && t.types.length);
            }
            _dragStart() {
                ((this._dragHandler = new f(this._context)),
                    this._dragHandler.dragStart());
            }
            _dragFinish() {
                var e;
                ((this._dropView = null),
                    (this._transferOptions = void 0),
                    null === (e = this._dragHandler) ||
                        void 0 === e ||
                        e.dragFinish(),
                    (this._dragHandler = null));
            }
        }
        Q.identifier = r.MODULE_NAME.DROP;
        class m {
            constructor(e) {
                this._context = e;
            }
            get _xapGenerator() {
                const e = this._context.config(r.CONFIG.XAP_GENERATOR);
                return (
                    e ||
                        o.b
                            .get(r.CONFIG.LOGGER)
                            .error(
                                '[DropManager] not work since there is no xapGenerator'
                            ),
                    e
                );
            }
            dropToBranch(e, t, i, n) {
                if (!t) return;
                const a = !!e.isPlaceHolderView,
                    s = (e, t, i) => {
                        const n = t.model.createEmptyTopic(e);
                        if ((n.set('titleUnedited', !0), i)) {
                            const { index: e, isAddToRight: r } = i;
                            t.model.addChildTopic(n, {
                                at: e,
                                side: r ? 'right' : 'left',
                            });
                        } else t.model.addChildTopic(n);
                    };
                if (g.isFolder(t)) {
                    const o = t.files[0].path;
                    if (o)
                        return (
                            this._context.trigger(r.EVENTS.FILE_DROP_IN_END),
                            this._dealFolder(() => {
                                (this._context.execAction(
                                    r.ACTION_NAMES.CHANGE_HYPER_LINK,
                                    {
                                        link: `file://${o}`,
                                        targets: [e],
                                    }
                                ),
                                    a && i
                                        ? s(
                                              {
                                                  href: `file://${o}`,
                                                  title: l,
                                              },
                                              i,
                                              n
                                          )
                                        : this._context.execAction(
                                              r.ACTION_NAMES.CHANGE_HYPER_LINK,
                                              {
                                                  link: `file://${o}`,
                                                  targets: [e],
                                              }
                                          ));
                            })
                        );
                }
                if (g.isXFile(t)) {
                    this._context.trigger(r.EVENTS.FILE_DROP_IN_START);
                    const o = t.getData('xapType');
                    return this._dealXFile(t, (t) => {
                        (this._context.trigger(r.EVENTS.FILE_DROP_IN_END),
                            o === r.XAP_TYPE.X_STICKER &&
                                (a && i
                                    ? s(
                                          {
                                              image: { src: t },
                                              title: '',
                                          },
                                          i,
                                          n
                                      )
                                    : this._context.execAction(
                                          r.ACTION_NAMES.CHANGE_STICKER,
                                          {
                                              imageInfo: t,
                                              targets: [e],
                                          }
                                      )));
                    });
                }
                let l = '';
                (t.files[0] && (l = t.files[0].name),
                    e.topicView.hideSelectBox(),
                    g.isImage(t)
                        ? (this._context.trigger(r.EVENTS.FILE_DROP_IN_START),
                          this._dealImage(t, (t) => {
                              (this._context.trigger(r.EVENTS.FILE_DROP_IN_END),
                                  a && i
                                      ? s(
                                            {
                                                image: { src: t },
                                                title: l,
                                            },
                                            i,
                                            n
                                        )
                                      : this._context.execAction(
                                            r.ACTION_NAMES.ADD_IMAGE,
                                            {
                                                imageInfo: t,
                                                targets: [e],
                                            }
                                        ));
                          }))
                        : g.isAttachment(t)
                          ? (this._context.trigger(r.EVENTS.FILE_DROP_IN_START),
                            this._dealAttachment(t, (t) => {
                                (this._context.trigger(
                                    r.EVENTS.FILE_DROP_IN_END
                                ),
                                    a && i
                                        ? s({ href: t, title: l }, i, n)
                                        : this._context.execAction(
                                              r.ACTION_NAMES.CHANGE_HYPER_LINK,
                                              {
                                                  link: t,
                                                  targets: [e],
                                              }
                                          ));
                            }))
                          : g.isText(t) &&
                            o.b.get(r.CONFIG.LOGGER).info('drop text'));
            }
            dropToSVG(e, t, i, n) {
                const o = this._context.getSheetView().getCentralBranchView(),
                    a = (e) => {
                        const i = o.model.createEmptyTopic(e);
                        (i.set('position', t),
                            i.set('titleUnedited', !0),
                            o.model.addChildTopic(i, {
                                type: r.TOPIC_TYPE.DETACHED,
                            }));
                    },
                    s = (e, t, i) => {
                        const n = t.model.createEmptyTopic(e);
                        if ((n.set('titleUnedited', !0), i)) {
                            const { index: e, isAddToRight: r } = i;
                            t.model.addChildTopic(n, {
                                at: e,
                                side: r ? 'right' : 'left',
                            });
                        } else t.model.addChildTopic(n);
                    };
                let l = '';
                if ((e.files[0] && (l = e.files[0].name), g.isFolder(e))) {
                    const t = e.files[0].path;
                    if (t)
                        return (
                            this._context.trigger(r.EVENTS.FILE_DROP_IN_START),
                            this._dealFolder(() => {
                                (i
                                    ? s(
                                          {
                                              title: l,
                                              href: `file://${t}`,
                                          },
                                          i,
                                          n
                                      )
                                    : a({
                                          title: l,
                                          href: `file://${t}`,
                                      }),
                                    this._context.trigger(
                                        r.EVENTS.FILE_DROP_IN_END
                                    ));
                            })
                        );
                }
                if (g.isXFile(e)) {
                    this._context.trigger(r.EVENTS.FILE_DROP_IN_START);
                    const t = e.getData('xapType');
                    return this._dealXFile(e, (e) => {
                        (this._context.trigger(r.EVENTS.FILE_DROP_IN_END),
                            t === r.XAP_TYPE.X_STICKER &&
                                (i
                                    ? s(
                                          {
                                              title: '',
                                              image: { src: e },
                                          },
                                          i,
                                          n
                                      )
                                    : a({
                                          title: '',
                                          image: { src: e },
                                      })));
                    });
                }
                g.isImage(e)
                    ? (this._context.trigger(r.EVENTS.FILE_DROP_IN_START),
                      this._dealImage(e, (e) => {
                          (this._context.trigger(r.EVENTS.FILE_DROP_IN_END),
                              i
                                  ? s(
                                        {
                                            title: l,
                                            image: { src: e },
                                        },
                                        i,
                                        n
                                    )
                                  : a({
                                        title: l,
                                        image: { src: e },
                                    }));
                      }))
                    : g.isAttachment(e) &&
                      (this._context.trigger(r.EVENTS.FILE_DROP_IN_START),
                      this._dealAttachment(e, (e) => {
                          (this._context.trigger(r.EVENTS.FILE_DROP_IN_END),
                              i
                                  ? s({ title: l, href: e }, i, n)
                                  : a({ title: l, href: e }));
                      }));
            }
            _dealXFile(e, t) {
                const i = e.getData('xapType'),
                    n = e.getData('dataUrl'),
                    r = {
                        xapType: i,
                        mimeType: '',
                        extType: e.getData('extType'),
                        data: n,
                    };
                this._xapGenerator(r).then(t);
            }
            _dealFile(e, t, i) {
                const n = new FileReader();
                (n.readAsArrayBuffer(t),
                    (n.onload = () => {
                        let r = '';
                        const o = t.name.split('.');
                        o.length > 1 && (r = o[o.length - 1]);
                        const a = {
                            xapType: e,
                            mimeType: t.type,
                            extType: r,
                            data: n.result,
                            isNewFile: !0,
                        };
                        this._xapGenerator(a).then(i);
                    }),
                    (n.onerror = () => {
                        o.b
                            .get(r.CONFIG.LOGGER)
                            .error('读取文件二进制数据错误');
                    }));
            }
            _dealSupportedLimitedOperation(e, t) {
                this._context
                    .config(r.CONFIG.LIMITED_OPERATION_HANDLER)(e)
                    .then((e) => {
                        e
                            ? t()
                            : this._context.trigger(r.EVENTS.FILE_DROP_IN_END);
                    });
            }
            _dealImage(e, t) {
                const i = e.files[0];
                this._dealSupportedLimitedOperation(
                    r.SUPPORTED_LIMITED_OPERATIONS.INSERT_IMAGE,
                    () => {
                        this._dealFile(r.XAP_TYPE.IMAGE, i, t);
                    }
                );
            }
            _dealAttachment(e, t) {
                const i = e.files[0];
                this._dealSupportedLimitedOperation(
                    r.SUPPORTED_LIMITED_OPERATIONS.INSERT_ATTACHMENT,
                    () => {
                        this._dealFile(r.XAP_TYPE.ATTACHMENT, i, t);
                    }
                );
            }
            _dealFolder(e) {
                this._dealSupportedLimitedOperation(
                    r.SUPPORTED_LIMITED_OPERATIONS.INSERT_FOLDER,
                    () => {
                        e();
                    }
                );
            }
        }
        m.DropDataTypes = {
            TEXT: 'text',
            HYPERLINK: 'hyperlink',
            IMAGE: 'image',
            OTHER: 'other',
        };
    },
];
