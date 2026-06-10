export default {
    60491: function (e) {
        var t,
            i,
            n,
            r,
            o =
                ((t =
                    /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZW]|"[^"]*"|'[^']*'/g),
                (i =
                    /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g),
                (n = /[^-+\dA-Z]/g),
                (r = function (e, t) {
                    for (e = String(e), t = t || 2; e.length < t; ) e = '0' + e;
                    return e;
                }),
                function (e, a, s) {
                    var l = o;
                    if (
                        (1 != arguments.length ||
                            '[object String]' !=
                                Object.prototype.toString.call(e) ||
                            /\d/.test(e) ||
                            ((a = e), (e = void 0)),
                        (e = e || new Date()) instanceof Date ||
                            (e = new Date(e)),
                        isNaN(e))
                    )
                        throw TypeError('Invalid date');
                    'UTC:' ==
                        (a = String(l.masks[a] || a || l.masks.default)).slice(
                            0,
                            4
                        ) && ((a = a.slice(4)), (s = !0));
                    var c = s ? 'getUTC' : 'get',
                        d = e[c + 'Date'](),
                        f = e[c + 'Day'](),
                        h = e[c + 'Month'](),
                        p = e[c + 'FullYear'](),
                        T = e[c + 'Hours'](),
                        u = e[c + 'Minutes'](),
                        g = e[c + 'Seconds'](),
                        Q = e[c + 'Milliseconds'](),
                        m = s ? 0 : e.getTimezoneOffset(),
                        b = (function (e) {
                            var t = new Date(
                                e.getFullYear(),
                                e.getMonth(),
                                e.getDate()
                            );
                            t.setDate(t.getDate() - ((t.getDay() + 6) % 7) + 3);
                            var i = new Date(t.getFullYear(), 0, 4);
                            i.setDate(i.getDate() - ((i.getDay() + 6) % 7) + 3);
                            var n =
                                t.getTimezoneOffset() / i.getTimezoneOffset() -
                                1;
                            return (
                                t.setHours(t.getHours() + n),
                                1 + (t - i) / 6048e5
                            );
                        })(e),
                        C = {
                            d: d,
                            dd: r(d),
                            ddd: l.i18n.dayNames[f],
                            dddd: l.i18n.dayNames[f + 7],
                            m: h + 1,
                            mm: r(h + 1),
                            mmm: l.i18n.monthNames[h],
                            mmmm: l.i18n.monthNames[h + 12],
                            yy: String(p).slice(2),
                            yyyy: p,
                            h: T % 12 || 12,
                            hh: r(T % 12 || 12),
                            H: T,
                            HH: r(T),
                            M: u,
                            MM: r(u),
                            s: g,
                            ss: r(g),
                            l: r(Q, 3),
                            L: r(Q > 99 ? Math.round(Q / 10) : Q),
                            t: T < 12 ? 'a' : 'p',
                            tt: T < 12 ? 'am' : 'pm',
                            T: T < 12 ? 'A' : 'P',
                            TT: T < 12 ? 'AM' : 'PM',
                            Z: s
                                ? 'UTC'
                                : (String(e).match(i) || [''])
                                      .pop()
                                      .replace(n, ''),
                            o:
                                (m > 0 ? '-' : '+') +
                                r(
                                    100 * Math.floor(Math.abs(m) / 60) +
                                        (Math.abs(m) % 60),
                                    4
                                ),
                            S: ['th', 'st', 'nd', 'rd'][
                                d % 10 > 3
                                    ? 0
                                    : (((d % 100) - (d % 10) != 10) * d) % 10
                            ],
                            W: b,
                        };
                    return a.replace(t, function (e) {
                        return e in C ? C[e] : e.slice(1, e.length - 1);
                    });
                });
        ((o.masks = {
            default: 'ddd mmm dd yyyy HH:MM:ss',
            shortDate: 'm/d/yy',
            mediumDate: 'mmm d, yyyy',
            longDate: 'mmmm d, yyyy',
            fullDate: 'dddd, mmmm d, yyyy',
            shortTime: 'h:MM TT',
            mediumTime: 'h:MM:ss TT',
            longTime: 'h:MM:ss TT Z',
            isoDate: 'yyyy-mm-dd',
            isoTime: 'HH:MM:ss',
            isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
            isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",
        }),
            (o.i18n = {
                dayNames: [
                    'Sun',
                    'Mon',
                    'Tue',
                    'Wed',
                    'Thu',
                    'Fri',
                    'Sat',
                    'Sunday',
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                ],
                monthNames: [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec',
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December',
                ],
            }),
            (e.exports = o));
    },
};
