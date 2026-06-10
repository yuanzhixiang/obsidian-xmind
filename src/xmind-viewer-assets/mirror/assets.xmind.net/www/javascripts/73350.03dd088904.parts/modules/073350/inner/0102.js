export default [
    function (e, t, i) {
        var n,
            r =
                r ||
                (function (e) {
                    'use strict';
                    if (
                        !(
                            void 0 === e ||
                            ('undefined' != typeof navigator &&
                                /MSIE [1-9]\./.test(navigator.userAgent))
                        )
                    ) {
                        var t = e.document,
                            i = function () {
                                return e.URL || e.webkitURL || e;
                            },
                            n = t.createElementNS(
                                'http://www.w3.org/1999/xhtml',
                                'a'
                            ),
                            r = 'download' in n,
                            o = /constructor/i.test(e.HTMLElement) || e.safari,
                            a = /CriOS\/[\d]+/.test(navigator.userAgent),
                            s = function (t) {
                                (e.setImmediate || e.setTimeout)(function () {
                                    throw t;
                                }, 0);
                            },
                            l = function (e) {
                                setTimeout(function () {
                                    'string' == typeof e
                                        ? i().revokeObjectURL(e)
                                        : e.remove();
                                }, 4e4);
                            },
                            c = function (e) {
                                return /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(
                                    e.type
                                )
                                    ? new Blob(
                                          [String.fromCharCode(65279), e],
                                          { type: e.type }
                                      )
                                    : e;
                            },
                            d = function (t, d, f) {
                                f || (t = c(t));
                                var h,
                                    p = this,
                                    T = 'application/octet-stream' === t.type,
                                    u = function () {
                                        !(function (e, t, i) {
                                            for (
                                                var n = (t = [].concat(t))
                                                    .length;
                                                n--;
                                            ) {
                                                var r = e['on' + t[n]];
                                                if ('function' == typeof r)
                                                    try {
                                                        r.call(e, i || e);
                                                    } catch (e) {
                                                        s(e);
                                                    }
                                            }
                                        })(
                                            p,
                                            'writestart progress write writeend'.split(
                                                ' '
                                            )
                                        );
                                    };
                                if (((p.readyState = p.INIT), r))
                                    return (
                                        (h = i().createObjectURL(t)),
                                        void setTimeout(function () {
                                            ((n.href = h),
                                                (n.download = d),
                                                (function (e) {
                                                    var t = new MouseEvent(
                                                        'click'
                                                    );
                                                    e.dispatchEvent(t);
                                                })(n),
                                                u(),
                                                l(h),
                                                (p.readyState = p.DONE));
                                        })
                                    );
                                !(function () {
                                    if ((a || (T && o)) && e.FileReader) {
                                        var n = new FileReader();
                                        return (
                                            (n.onloadend = function () {
                                                var t = a
                                                    ? n.result
                                                    : n.result.replace(
                                                          /^data:[^;]*;/,
                                                          'data:attachment/file;'
                                                      );
                                                (e.open(t, '_blank') ||
                                                    (e.location.href = t),
                                                    (t = void 0),
                                                    (p.readyState = p.DONE),
                                                    u());
                                            }),
                                            n.readAsDataURL(t),
                                            void (p.readyState = p.INIT)
                                        );
                                    }
                                    (h || (h = i().createObjectURL(t)), T)
                                        ? (e.location.href = h)
                                        : e.open(h, '_blank') ||
                                          (e.location.href = h);
                                    ((p.readyState = p.DONE), u(), l(h));
                                })();
                            },
                            f = d.prototype;
                        return 'undefined' != typeof navigator &&
                            navigator.msSaveOrOpenBlob
                            ? function (e, t, i) {
                                  return (
                                      (t = t || e.name || 'download'),
                                      i || (e = c(e)),
                                      navigator.msSaveOrOpenBlob(e, t)
                                  );
                              }
                            : ((f.abort = function () {}),
                              (f.readyState = f.INIT = 0),
                              (f.WRITING = 1),
                              (f.DONE = 2),
                              (f.error =
                                  f.onwritestart =
                                  f.onprogress =
                                  f.onwrite =
                                  f.onabort =
                                  f.onerror =
                                  f.onwriteend =
                                      null),
                              function (e, t, i) {
                                  return new d(e, t || e.name || 'download', i);
                              });
                    }
                })(
                    ('undefined' != typeof self && self) ||
                        ('undefined' != typeof window && window) ||
                        this.content
                );
        /*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */ e.exports
            ? (e.exports.saveAs = r)
            : null !== i(160) &&
              null !== i(161) &&
              (void 0 ===
                  (n = function () {
                      return r;
                  }.call(t, i, t, e)) ||
                  (e.exports = n));
    },
];
