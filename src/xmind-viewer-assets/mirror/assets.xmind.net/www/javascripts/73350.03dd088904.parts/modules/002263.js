export default {
    2263: function (e, t, i) {
        var n = i(70136);
        e.exports = function (e) {
            if ((e >= 55296 && e <= 57343) || e > 1114111) return '�';
            e in n && (e = n[e]);
            var t = '';
            e > 65535 &&
                ((e -= 65536),
                (t += String.fromCharCode(((e >>> 10) & 1023) | 55296)),
                (e = 56320 | (1023 & e)));
            return (t += String.fromCharCode(e));
        };
    },
};
