export default [
    function (e, t, i) {
        'use strict';
        var n = i(0),
            r = i(68);
        const o = 'next',
            a = 'break',
            s = '__default__',
            l = (e, t) => {
                const i = t.length;
                if ('undo' === e)
                    for (let e = i - 1; e >= 0; e--) {
                        t[e].undo();
                    }
                else if ('redo' === e)
                    for (let e = 0; e < i; e++) {
                        t[e].redo();
                    }
                return a;
            };
        class c {
            constructor(e, t) {
                ((this._identifier = e),
                    (this._executor = null != t ? t : l),
                    (this._tasks = []));
            }
            getName() {
                return this._identifier;
            }
            push(e) {
                this._tasks.push(e);
            }
            pop() {
                this._tasks.pop();
            }
            getTasks() {
                return [...this._tasks];
            }
            execute(e) {
                let t = a;
                return (
                    (this._executor ? this._executor : l)(
                        e,
                        Array.from(this._tasks)
                    ) || (t = o),
                    t
                );
            }
        }
        class d extends r.a {
            constructor() {
                (super(),
                    (this.NEW_GROUP_STAND_BY_EVENT = 'newGroupStandByEvent'),
                    (this.GROUP_RESTORE_EVENT = 'groupRestoreEvent'),
                    (this._undoStack = []),
                    (this._redoStack = []),
                    (this._standbyGroup = null),
                    (this._limitedLength = 20),
                    (this._canRecord = !0),
                    (this._blocking = !1),
                    (this._allInOne = !1),
                    (this._nameToTagGroup = new Map()));
            }
            setRecordState(e) {
                this._canRecord = e;
            }
            keepAllInOne(e) {
                this._allInOne !== e &&
                    ((this._allInOne = e),
                    e ||
                        (this._resetStandbyGroup(),
                        this.trigger(
                            this.NEW_GROUP_STAND_BY_EVENT,
                            this._standbyGroup
                        )));
            }
            setStackLimitedLength(e) {
                this._limitedLength = e;
                const t = this._undoStack.length,
                    i = this._redoStack.length;
                this._limitedLength < t
                    ? this._undoStack.slice(t - this._limitedLength, t)
                    : this._limitedLength < t + i &&
                      this._redoStack.slice(
                          i + t - this._limitedLength,
                          this._limitedLength - t
                      );
            }
            add(e, t) {
                this.push(e, t);
            }
            push(e, t) {
                this._canRecord &&
                    (this._blocking ||
                        ((e.type = t),
                        this._standbyGroup ||
                            (this._standbyGroup = this._autoStandbyGroup()),
                        this._standbyGroup.push(e),
                        this.trigger(
                            this.NEW_GROUP_STAND_BY_EVENT,
                            this._standbyGroup
                        ),
                        this._triggerUndoStateChange()));
            }
            pop() {
                const e = this._changeUndoStack();
                return (
                    (this._redoStack.length = 0),
                    e && this._nameToTagGroup.delete(e.getName()),
                    this._resetStandbyGroup(),
                    e
                );
            }
            append(e, t) {
                if (!this._canRecord) return;
                if (this._blocking) return;
                e.type = t;
                let i = this.getLastGroup();
                ((i && !this.isTagGroup(i)) || (i = this._genNewGroup(s)),
                    i.push(e));
            }
            getLastGroup() {
                return this._undoStack[this._undoStack.length - 1];
            }
            getAllGroups() {
                return Array.from(
                    new Set([...this._undoStack, ...this._redoStack])
                );
            }
            isTagGroup(e) {
                return this._nameToTagGroup.has(e.getName());
            }
            popTag(e) {
                this._resetStandbyGroup();
                const t = this._nameToTagGroup.get(e),
                    i = t ? this._undoStack.indexOf(t) : -1;
                i > -1 && this._undoStack.splice(i, 1);
                const n = t ? this._redoStack.indexOf(t) : -1;
                return (
                    n > -1 && this._redoStack.splice(n, 1),
                    this._nameToTagGroup.delete(e),
                    t
                );
            }
            undo() {
                ((this._blocking = !0),
                    this.trigger(
                        this.GROUP_RESTORE_EVENT,
                        this.getLastGroup(),
                        !0
                    ),
                    this._resetStandbyGroup());
                const e = this._changeUndoStack();
                if (e) {
                    this._redoStack.push(e);
                    e.execute('undo') === o && this.undo();
                }
                this._blocking = !1;
            }
            redo() {
                ((this._blocking = !0),
                    this.trigger(
                        this.GROUP_RESTORE_EVENT,
                        this._redoStack[this._redoStack.length - 1],
                        !1
                    ),
                    this._resetStandbyGroup());
                const e = this._redoStack.pop();
                if (e) {
                    this._changeUndoStack(e);
                    e.execute('redo') === o && this.redo();
                }
                this._blocking = !1;
            }
            isExecuting() {
                return !0 === this._blocking;
            }
            canUndo() {
                return this._undoStack.length > 0;
            }
            canRedo() {
                return this._redoStack.length > 0;
            }
            clearUndo() {
                this._undoStack.length = 0;
            }
            clearRedo() {
                this._redoStack.length = 0;
            }
            getIndex() {
                return this._undoStack.length - 1;
            }
            _genNewGroup(e, t) {
                const i = new c(e, t);
                return (
                    this._changeUndoStack(i),
                    (this._redoStack.length = 0),
                    this._undoStack.length + this._redoStack.length >
                        this._limitedLength &&
                        (this._undoStack = this._undoStack.slice(
                            1,
                            this._limitedLength
                        )),
                    i
                );
            }
            _autoStandbyGroup() {
                return (
                    clearTimeout(this.TIMEOUT_ID),
                    (this.TIMEOUT_ID = setTimeout(() => {
                        this._allInOne || this._resetStandbyGroup();
                    }, 0)),
                    this._genNewGroup(s)
                );
            }
            pushTag(e, t) {
                if (!this._canRecord) return;
                if (this._blocking) return;
                if (this._nameToTagGroup.has(e)) return;
                this._resetStandbyGroup();
                const i = this._genNewGroup(e, t);
                this._nameToTagGroup.set(e, i);
            }
            _resetStandbyGroup() {
                this._standbyGroup = null;
            }
            _changeUndoStack(e) {
                e && this._undoStack.push(e);
                const t = null != e ? e : this._undoStack.pop();
                return (this._triggerUndoStateChange(), t);
            }
            _triggerUndoStateChange() {
                Promise.resolve().then(() => {
                    this.trigger(n.EVENTS.UNDO_STATE_CHANGE, {
                        canUndo: this.canUndo(),
                        canRedo: this.canRedo(),
                    });
                });
            }
        }
        t.a = d;
    },
];
