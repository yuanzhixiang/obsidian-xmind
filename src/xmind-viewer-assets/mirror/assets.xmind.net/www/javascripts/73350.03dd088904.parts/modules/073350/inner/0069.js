export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return a;
        });
        var n = i(3),
            r = i(0),
            o = i(21);
        class a extends o.a {
            initEventsListenerWithContext() {
                if (!this.getContext()) return;
                const e = this.getContext().getSheetView();
                (this.addReaction(
                    () => e.figure.cjkFontFamily,
                    () => this.refreshFontFamily()
                ),
                    this.addReaction(
                        () => e.figure.globalFontFamily,
                        () => this.refreshFontFamily()
                    ));
            }
            onChangeStyle(e) {
                switch (e) {
                    case r.STYLE_KEYS.TEXT_COLOR:
                        this.refreshTextColor();
                        break;
                    case r.STYLE_KEYS.TEXT_DECORATION:
                        this.refreshTextDecoration();
                        break;
                    case r.STYLE_KEYS.TEXT_ALIGN:
                        this.refreshTextAlign();
                        break;
                    case r.STYLE_KEYS.TEXT_TRANSFORM:
                        this.refreshTextTransform();
                        break;
                    case r.STYLE_KEYS.FONT_SIZE:
                        this.refreshFontSize();
                        break;
                    case r.STYLE_KEYS.FONT_FAMILY:
                        this.refreshFontFamily();
                        break;
                    case r.STYLE_KEYS.FONT_STYLE:
                        this.refreshFontStyle();
                        break;
                    case r.STYLE_KEYS.FONT_WEIGHT:
                        this.refreshFontWeight();
                }
            }
            refreshSkeletonStyles() {
                (this.refreshTextDecoration(),
                    this.refreshTextAlign(),
                    this.refreshTextTransform(),
                    this.refreshFontSize(),
                    this.refreshFontFamily(),
                    this.refreshFontStyle(),
                    this.refreshFontWeight());
            }
            refreshColorStyles() {
                this.refreshTextColor();
            }
            refreshTextColor() {
                this.figure.setTextColor(
                    n.a.getStyleValue(
                        this.getTitledStyleView(),
                        r.STYLE_KEYS.TEXT_COLOR
                    )
                );
            }
            refreshTextDecoration() {
                this.figure.setTextDecoration(
                    n.a.getStyleValue(
                        this.getTitledStyleView(),
                        r.STYLE_KEYS.TEXT_DECORATION
                    )
                );
            }
            refreshTextAlign() {
                this.figure.setTextAlign(
                    n.a.getStyleValue(
                        this.getTitledStyleView(),
                        r.STYLE_KEYS.TEXT_ALIGN
                    )
                );
            }
            refreshTextTransform() {
                this.figure.setTextTransform(
                    n.a.getStyleValue(
                        this.getTitledStyleView(),
                        r.STYLE_KEYS.TEXT_TRANSFORM
                    )
                );
            }
            refreshFontSize() {
                this.figure.setFontSize(
                    parseInt(
                        `${n.a.getStyleValue(this.getTitledStyleView(), r.STYLE_KEYS.FONT_SIZE)}`
                    )
                );
            }
            refreshFontFamily() {
                this.figure.setFontFamily(
                    n.a.getStyleValue(
                        this.getTitledStyleView(),
                        r.STYLE_KEYS.FONT_FAMILY
                    )
                );
            }
            refreshFontStyle() {
                this.figure.setFontStyle(
                    n.a.getStyleValue(
                        this.getTitledStyleView(),
                        r.STYLE_KEYS.FONT_STYLE
                    )
                );
            }
            refreshFontWeight() {
                this.figure.setFontWeight(
                    n.a.getStyleValue(
                        this.getTitledStyleView(),
                        r.STYLE_KEYS.FONT_WEIGHT
                    )
                );
            }
        }
    },
];
