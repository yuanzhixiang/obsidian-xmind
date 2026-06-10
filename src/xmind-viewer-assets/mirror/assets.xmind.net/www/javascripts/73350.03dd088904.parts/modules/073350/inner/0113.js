export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return a;
        });
        var n = i(3),
            r = i(0),
            o = i(51);
        class a extends o.a {
            get type() {
                return r.VIEW_TYPE.NUMBERING;
            }
            get figureType() {
                return r.FIGURE_TYPE.NUMBERING;
            }
            parent(e) {
                return void 0 === e ? super.parent() : super.parent(e);
            }
            afterAncestorChange() {
                const e = this.parent();
                if (!e) return;
                const t = e.parent();
                (this.setText(
                    (null == t ? void 0 : t.getNumberingText()) || ''
                ),
                    this.refreshFontInfo(n.a.getFontInfo(t) || {}),
                    super.afterAncestorChange.bind(this)());
            }
            getSvg() {
                return this.figure.getContent();
            }
        }
    },
];
