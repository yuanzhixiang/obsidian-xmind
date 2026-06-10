export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return d;
        });
        var n = i(3),
            r = i(0),
            o = i(18),
            a = i(21),
            s = i(29),
            l = i(61),
            c = i(1);
        r.VIEW_TYPE.MATRIX_LABEL;
        class d extends a.a {
            constructor(e) {
                (super(),
                    (this._labelViews = []),
                    (this._cellViews = []),
                    (this._plusViews = []),
                    (this.columnMap = null),
                    (this.matrixGrid = null),
                    (this.matrixStructureType = e),
                    (this.figure = o.a.createFigure(this)),
                    (this.svg = this.figure.getContent()),
                    (this.cells = this.figure.renderWorker.getCells()));
            }
            get type() {
                return r.VIEW_TYPE.MATRIX;
            }
            get figureType() {
                return r.FIGURE_TYPE.MATRIX;
            }
            parent(e) {
                return void 0 === e ? super.parent() : super.parent(e);
            }
            render() {
                const e = this.getRealPosition();
                return (this.move(e), this.syncLabelStyle(), this);
            }
            setColumnMap(e) {
                ((this.columnMap = e),
                    this._labelViews.forEach((e) => e.removeSelf()),
                    (this._labelViews = []),
                    l.a
                        .createLabelViews(this.columnMap, this.parent())
                        .forEach((e) => {
                            (this._addLabelView(e),
                                e.figure.layoutWorker.work(e));
                        }));
            }
            setMatrixGrid(e) {
                ((this.matrixGrid = e), this._initInnerViews());
            }
            setVisible(e) {
                this.figure.setVisible(e);
                const t = this.parent();
                (e ? this.setBranchViewProxy() : null == t || t.setProxy(t),
                    this._cellViews.forEach((e) => e.refreshViewShapeClass()));
            }
            _initInnerViews() {
                (this._cellViews.forEach((e) => e.removeSelf()),
                    (this._cellViews = []),
                    this._plusViews.forEach((e) => e.removeSelf()),
                    (this._plusViews = []));
                l.a
                    .createCellViews(this.matrixGrid, this.parent())
                    .forEach((e) => this._addCellView(e));
                (l.a
                    .createPlusViews(this.matrixGrid, this.parent())
                    .forEach((e) => this._addPlusView(e)),
                    this.setBranchViewProxy());
            }
            _addLabelView(e) {
                (this._labelViews.push(e), e.parent(this));
            }
            getLabelViewList() {
                return [...this._labelViews];
            }
            _addCellView(e) {
                (this._cellViews.push(e), e.parent(this));
            }
            _addPlusView(e) {
                (this._plusViews.push(e), e.parent(this));
            }
            setPlusViewVisible(e) {
                this._plusViews.forEach((t) => t.setVisible(e));
            }
            setBranchViewProxy() {
                this._cellViews.forEach((e) => e.afterMounted(e));
            }
            move(e) {
                this.getSvg().translate(e.x, e.y);
            }
            getSize() {
                var e;
                const { width: t, height: i } =
                    null === (e = this.matrixGrid) || void 0 === e
                        ? void 0
                        : e.size;
                return {
                    width:
                        t +
                        Number.parseInt(
                            n.a.getStyleValue(
                                this.parent(),
                                r.STYLE_KEYS.BORDER_LINE_WIDTH
                            ) || '0'
                        ) /
                            2,
                    height:
                        i +
                        this._plusViews[1].bounds.height +
                        c.layoutConstant.MATRIX_PLUS_RADIUS,
                };
            }
            removeSelf() {
                (this._labelViews.forEach((e) => e.removeSelf()),
                    this._cellViews.forEach((e) => e.removeSelf()),
                    this._plusViews.forEach((e) => e.removeSelf()),
                    this.figure.dispose(),
                    this.stopListening(),
                    this.parent(null));
            }
            getSvg() {
                return this.svg;
            }
            syncLabelStyle() {
                const e = this.parent(),
                    t = n.a.getStyleValue(e, r.STYLE_KEYS.TEXT_COLOR);
                this._labelViews.forEach((e) => e.setTextColor(t));
            }
            getRealPosition() {
                var e, t;
                const i =
                    null === (e = this.matrixGrid) || void 0 === e
                        ? void 0
                        : e.cells[0];
                if (!i) return { x: 0, y: 0 };
                const n = i.getAbsPos(),
                    r =
                        null === (t = this.parent()) || void 0 === t
                            ? void 0
                            : t.getRealPosition();
                return Object(s.j)(r, n);
            }
            getCellByPos(e) {
                const t = this.matrixGrid,
                    i = this.getRealPosition(),
                    n = Object(s.j)(e, i);
                return Object(s.d)(t, n);
            }
            getCellViews() {
                return this._cellViews;
            }
        }
    },
];
