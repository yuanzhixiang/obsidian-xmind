export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return o;
        });
        var n = i(22),
            r = i(7);
        class o extends n.a {
            constructor(e) {
                super();
                this._options = Object.assign(
                    Object.assign(
                        {},
                        {
                            containerAreaAspectRatio: 1,
                            contentAreaAspectRatio: 1,
                            containerWidthContentWidthRatio: 1,
                            contentAreaOffsetX: 0,
                            contentAreaOffsetY: 0,
                            pointOffsetByLineFocusTypeAndDirection: {},
                        }
                    ),
                    e
                );
            }
            getContentAreaOffsetRatio() {
                return {
                    x: this._options.contentAreaOffsetX,
                    y: this._options.contentAreaOffsetY,
                };
            }
            getRealContentAreaOffset(e) {
                const { width: t, height: i } = e.topicView.shapeBounds,
                    { contentAreaOffsetX: n, contentAreaOffsetY: r } =
                        this._options;
                return { x: n * t, y: r * i };
            }
            getDerivedContentSize(e, t) {
                const {
                        containerWidthContentWidthRatio: i,
                        contentAreaAspectRatio: n,
                    } = this._options,
                    o = t / i - 2 * Object(r.e)(e);
                return { width: o, height: o / n };
            }
            _getExtendedWidth(e, t) {
                const { contentAreaAspectRatio: i } = this._options;
                return e / t < i ? t * i : e;
            }
            getFinalShapeSizeWithPadding(e, t) {
                const {
                        containerWidthContentWidthRatio: i,
                        containerAreaAspectRatio: n,
                    } = this._options,
                    o = Object(r.e)(e),
                    { width: a, height: s } = t,
                    l = (this._getExtendedWidth(a, s) + 2 * o) * i;
                return { width: l, height: l / n };
            }
            getTopicMargins(e, t) {
                const { contentAreaOffsetX: i, contentAreaOffsetY: n } =
                        this._options,
                    { width: r, height: o } = t,
                    { width: a, height: s } = this.getFinalShapeSizeWithPadding(
                        e,
                        t
                    );
                return {
                    top: (s - o) / 2 + n * s,
                    bottom: (s - o) / 2 - n * s,
                    left: (a - r) / 2 + i * a,
                    right: (a - r) / 2 - i * a,
                };
            }
            getExtConnectionOffset(e) {
                return 0;
            }
            _getSpecialPointOffset(e, t, i) {
                var n, r, o;
                return null !==
                    (o =
                        null ===
                            (r =
                                null ===
                                    (n =
                                        this._options
                                            .pointOffsetByLineFocusTypeAndDirection[
                                            i
                                        ]) || void 0 === n
                                    ? void 0
                                    : n[t]) || void 0 === r
                            ? void 0
                            : r.call(n, e.topicView.shapeBounds)) &&
                    void 0 !== o
                    ? o
                    : { x: 0, y: 0 };
            }
            _getCommonPointOffset(e, t) {
                return { x: 0, y: 0 };
            }
            _isSpecialCaseForPointOffset(e) {
                const t = e.isMapLike(),
                    i = [r.b.DIVER_LINE, r.b.ORDER_LINE];
                return t && i.includes(Object(r.m)(e));
            }
            getPointOffset(e, t) {
                return this._isSpecialCaseForPointOffset(e)
                    ? this._getSpecialPointOffset(e, t, Object(r.m)(e))
                    : this._getCommonPointOffset(e, t);
            }
        }
    },
];
