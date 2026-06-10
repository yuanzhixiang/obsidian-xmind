export default [
    function (e, t, i) {
        'use strict';
        var n = i(12),
            r = i.n(n);
        const o = `\n.workbook-item{\n}\n\n.sb-container {\n}\n\n.sb-container>.app-tools-container{\n}\n\n.sb-container>.mm-editor {\n}\n\n.sb-container>.mm-editor .wallpaper {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  z-index: -1;\n}\n\n.sb-container [name="viewport-cover"] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 1000;\n  cursor: -webkit-grabbing;\n  cursor: -moz-grabbing;\n  cursor: grabbing;\n}\n\n.sb-container .edit-receiver {\n  position : absolute;\n  outline  : none;\n  border   : none;\n  padding  : 0;\n  margin   : 0;\n  z-index  : -1;\n  resize   : none;\n  overflow : hidden;\n  -webkit-transform-origin: 0 0;\n  transform-origin: 0 0;\n  line-height: 1.34em;\n  background: transparent;\n}\n\n.edit-receiver.bordered {\n  box-sizing    : content-box;\n  padding       : 6px 3px;\n  background    : #fff !important;\n  color         : #111 !important;\n  outline       : none;\n  border        : solid 2px #2ebdff;\n  border-radius : 4px;\n  margin-top    : -9px;\n  margin-left   : -5px;\n}\n\n.edit-receiver.matrixlabel {\n  box-sizing    : content-box;\n  padding       : 6px 3px;\n  background    : #fff;\n  color         : #111;\n  outline       : none;\n  border        : none;\n  border-radius : 4px;\n  margin-top    : -7px;\n  margin-left   : -3px;\n}\n\n.edit-receiver.boundary {\n  box-sizing    : content-box;\n  padding       : 6px 3px;\n  background    : #fff;\n  color         : #111;\n  outline       : none;\n  border        : solid 2px #2ebdff;\n  border-radius : 4px;\n  margin-top    : -9px;\n  margin-left   : -5px;\n}\n\n.sb-container .text-size {\n  position: fixed;\n  visibility: hidden;\n  line-height: 1em;\n  margin: 0;\n  padding-right: 3px;\n  font-family: Helvetica, Arial, sans-serif;\n}\n\n.sb-container .text-width {\n  position: fixed;\n  visibility: hidden;\n  padding-right: 3px;\n  margin: 0;\n}\n\n${i(84).a['information-iconfont']}\n\n.icon-information {\n  /* use !important to prevent issues with browser extensions that change fonts */\n  font-family: 'information-iconfont' !important;\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: 1;\n\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n`;
        t.a = () => {
            r()('head').append(
                r()(
                    "<style id='snowbrush_style' type='text/css'></style>"
                ).html(o)
            );
        };
    },
];
