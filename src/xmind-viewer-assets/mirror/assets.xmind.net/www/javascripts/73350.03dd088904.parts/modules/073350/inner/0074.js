export default [
    function (e, t, i) {
        'use strict';
        (i.d(t, 'f', function () {
            return T;
        }),
            i.d(t, 'c', function () {
                return u;
            }),
            i.d(t, 'd', function () {
                return g;
            }),
            i.d(t, 'e', function () {
                return Q;
            }),
            i.d(t, 'b', function () {
                return m;
            }),
            i.d(t, 'a', function () {
                return b;
            }));
        var n = i(106),
            r = i(107);
        const o = {
                a: 7,
                c: 6,
                h: 1,
                l: 2,
                m: 2,
                q: 4,
                s: 4,
                t: 2,
                v: 1,
                z: 0,
            },
            a = /([astvzqmhlc])([^astvzqmhlc]*)/gi,
            s = /-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/gi;
        const l = (e) => {
            const t = e.match(s);
            return t ? t.map(Number) : [];
        };
        class c {
            constructor(e, t, i, n) {
                ((this.getTotalLength = () =>
                    Math.sqrt(
                        Math.pow(this.x0 - this.x1, 2) +
                            Math.pow(this.y0 - this.y1, 2)
                    )),
                    (this.getPointAtLength = (e) => {
                        let t =
                            e /
                            Math.sqrt(
                                Math.pow(this.x0 - this.x1, 2) +
                                    Math.pow(this.y0 - this.y1, 2)
                            );
                        t = Number.isNaN(t) ? 1 : t;
                        const i = (this.x1 - this.x0) * t,
                            n = (this.y1 - this.y0) * t;
                        return { x: this.x0 + i, y: this.y0 + n };
                    }),
                    (this.getTangentAtLength = (e) => {
                        const t = Math.sqrt(
                            (this.x1 - this.x0) * (this.x1 - this.x0) +
                                (this.y1 - this.y0) * (this.y1 - this.y0)
                        );
                        return {
                            x: (this.x1 - this.x0) / t,
                            y: (this.y1 - this.y0) / t,
                        };
                    }),
                    (this.getPropertiesAtLength = (e) => {
                        const t = this.getPointAtLength(e),
                            i = this.getTangentAtLength(e);
                        return {
                            x: t.x,
                            y: t.y,
                            tangentX: i.x,
                            tangentY: i.y,
                        };
                    }),
                    (this.x0 = e),
                    (this.x1 = t),
                    (this.y0 = i),
                    (this.y1 = n));
            }
        }
        var d = i(77),
            f = i(48);
        class h {
            constructor(e) {
                ((this.length = 0),
                    (this.partial_lengths = []),
                    (this.functions = []),
                    (this.initial_point = null),
                    (this.getPartAtLength = (e) => {
                        e < 0 ? (e = 0) : e > this.length && (e = this.length);
                        let t = this.partial_lengths.length - 1;
                        for (; this.partial_lengths[t] >= e && t > 0; ) t--;
                        return (
                            t++,
                            {
                                fraction: e - this.partial_lengths[t - 1],
                                i: t,
                            }
                        );
                    }),
                    (this.getTotalLength = () => this.length),
                    (this.getPointAtLength = (e) => {
                        const t = this.getPartAtLength(e),
                            i = this.functions[t.i];
                        if (i) return i.getPointAtLength(t.fraction);
                        if (this.initial_point) return this.initial_point;
                        throw new Error('Wrong function at this part.');
                    }),
                    (this.getTangentAtLength = (e) => {
                        const t = this.getPartAtLength(e),
                            i = this.functions[t.i];
                        if (i) return i.getTangentAtLength(t.fraction);
                        if (this.initial_point) return { x: 0, y: 0 };
                        throw new Error('Wrong function at this part.');
                    }),
                    (this.getPropertiesAtLength = (e) => {
                        const t = this.getPartAtLength(e),
                            i = this.functions[t.i];
                        if (i) return i.getPropertiesAtLength(t.fraction);
                        if (this.initial_point)
                            return {
                                x: this.initial_point.x,
                                y: this.initial_point.y,
                                tangentX: 0,
                                tangentY: 0,
                            };
                        throw new Error('Wrong function at this part.');
                    }),
                    (this.getParts = () => {
                        const e = [];
                        for (var t = 0; t < this.functions.length; t++)
                            if (null !== this.functions[t]) {
                                this.functions[t] = this.functions[t];
                                const i = {
                                    start: this.functions[t].getPointAtLength(
                                        0
                                    ),
                                    end: this.functions[t].getPointAtLength(
                                        this.partial_lengths[t] -
                                            this.partial_lengths[t - 1]
                                    ),
                                    length:
                                        this.partial_lengths[t] -
                                        this.partial_lengths[t - 1],
                                    getPointAtLength:
                                        this.functions[t].getPointAtLength,
                                    getTangentAtLength:
                                        this.functions[t].getTangentAtLength,
                                    getPropertiesAtLength:
                                        this.functions[t].getPropertiesAtLength,
                                };
                                e.push(i);
                            }
                        return e;
                    }));
                const t = ((e) => {
                    const t = (e && e.length > 0 ? e : 'M0,0').match(a);
                    if (!t)
                        throw new Error(
                            `No path elements found in string ${e}`
                        );
                    return t.reduce((e, t) => {
                        let i = t.charAt(0),
                            n = i.toLowerCase();
                        const r = l(t.substr(1));
                        for (
                            'm' === n &&
                            r.length > 2 &&
                            (e.push([i, ...r.splice(0, 2)]),
                            (n = 'l'),
                            (i = 'm' === i ? 'l' : 'L'));
                            r.length >= 0;
                        ) {
                            if (r.length === o[n]) {
                                e.push([i, ...r.splice(0, o[n])]);
                                break;
                            }
                            if (r.length < o[n])
                                throw new Error(
                                    `Malformed path data: "${i}" must have ${o[n]} elements and has ${r.length}: ${t}`
                                );
                            e.push([i, ...r.splice(0, o[n])]);
                        }
                        return e;
                    }, []);
                })(e);
                let i,
                    n = [0, 0],
                    r = [0, 0],
                    s = [0, 0];
                for (let e = 0; e < t.length; e++) {
                    if ('M' === t[e][0])
                        ((n = [t[e][1], t[e][2]]),
                            (s = [n[0], n[1]]),
                            this.functions.push(null),
                            0 === e &&
                                (this.initial_point = {
                                    x: t[e][1],
                                    y: t[e][2],
                                }));
                    else if ('m' === t[e][0])
                        ((n = [t[e][1] + n[0], t[e][2] + n[1]]),
                            (s = [n[0], n[1]]),
                            this.functions.push(null));
                    else if ('L' === t[e][0])
                        ((this.length += Math.sqrt(
                            Math.pow(n[0] - t[e][1], 2) +
                                Math.pow(n[1] - t[e][2], 2)
                        )),
                            this.functions.push(
                                new c(n[0], t[e][1], n[1], t[e][2])
                            ),
                            (n = [t[e][1], t[e][2]]));
                    else if ('l' === t[e][0])
                        ((this.length += Math.sqrt(
                            Math.pow(t[e][1], 2) + Math.pow(t[e][2], 2)
                        )),
                            this.functions.push(
                                new c(
                                    n[0],
                                    t[e][1] + n[0],
                                    n[1],
                                    t[e][2] + n[1]
                                )
                            ),
                            (n = [t[e][1] + n[0], t[e][2] + n[1]]));
                    else if ('H' === t[e][0])
                        ((this.length += Math.abs(n[0] - t[e][1])),
                            this.functions.push(
                                new c(n[0], t[e][1], n[1], n[1])
                            ),
                            (n[0] = t[e][1]));
                    else if ('h' === t[e][0])
                        ((this.length += Math.abs(t[e][1])),
                            this.functions.push(
                                new c(n[0], n[0] + t[e][1], n[1], n[1])
                            ),
                            (n[0] = t[e][1] + n[0]));
                    else if ('V' === t[e][0])
                        ((this.length += Math.abs(n[1] - t[e][1])),
                            this.functions.push(
                                new c(n[0], n[0], n[1], t[e][1])
                            ),
                            (n[1] = t[e][1]));
                    else if ('v' === t[e][0])
                        ((this.length += Math.abs(t[e][1])),
                            this.functions.push(
                                new c(n[0], n[0], n[1], n[1] + t[e][1])
                            ),
                            (n[1] = t[e][1] + n[1]));
                    else if ('z' === t[e][0] || 'Z' === t[e][0])
                        ((this.length += Math.sqrt(
                            Math.pow(s[0] - n[0], 2) + Math.pow(s[1] - n[1], 2)
                        )),
                            this.functions.push(new c(n[0], s[0], n[1], s[1])),
                            (n = [s[0], s[1]]));
                    else if ('C' === t[e][0])
                        ((i = new f.a(
                            n[0],
                            n[1],
                            t[e][1],
                            t[e][2],
                            t[e][3],
                            t[e][4],
                            t[e][5],
                            t[e][6]
                        )),
                            (this.length += i.getTotalLength()),
                            (n = [t[e][5], t[e][6]]),
                            this.functions.push(i));
                    else if ('c' === t[e][0])
                        ((i = new f.a(
                            n[0],
                            n[1],
                            n[0] + t[e][1],
                            n[1] + t[e][2],
                            n[0] + t[e][3],
                            n[1] + t[e][4],
                            n[0] + t[e][5],
                            n[1] + t[e][6]
                        )),
                            i.getTotalLength() > 0
                                ? ((this.length += i.getTotalLength()),
                                  this.functions.push(i),
                                  (n = [t[e][5] + n[0], t[e][6] + n[1]]))
                                : this.functions.push(
                                      new c(n[0], n[0], n[1], n[1])
                                  ));
                    else if ('S' === t[e][0]) {
                        if (
                            e > 0 &&
                            ['C', 'c', 'S', 's'].indexOf(t[e - 1][0]) > -1
                        ) {
                            if (i) {
                                const r = i.getC();
                                i = new f.a(
                                    n[0],
                                    n[1],
                                    2 * n[0] - r.x,
                                    2 * n[1] - r.y,
                                    t[e][1],
                                    t[e][2],
                                    t[e][3],
                                    t[e][4]
                                );
                            }
                        } else
                            i = new f.a(
                                n[0],
                                n[1],
                                n[0],
                                n[1],
                                t[e][1],
                                t[e][2],
                                t[e][3],
                                t[e][4]
                            );
                        i &&
                            ((this.length += i.getTotalLength()),
                            (n = [t[e][3], t[e][4]]),
                            this.functions.push(i));
                    } else if ('s' === t[e][0]) {
                        if (
                            e > 0 &&
                            ['C', 'c', 'S', 's'].indexOf(t[e - 1][0]) > -1
                        ) {
                            if (i) {
                                const r = i.getC(),
                                    o = i.getD();
                                i = new f.a(
                                    n[0],
                                    n[1],
                                    n[0] + o.x - r.x,
                                    n[1] + o.y - r.y,
                                    n[0] + t[e][1],
                                    n[1] + t[e][2],
                                    n[0] + t[e][3],
                                    n[1] + t[e][4]
                                );
                            }
                        } else
                            i = new f.a(
                                n[0],
                                n[1],
                                n[0],
                                n[1],
                                n[0] + t[e][1],
                                n[1] + t[e][2],
                                n[0] + t[e][3],
                                n[1] + t[e][4]
                            );
                        i &&
                            ((this.length += i.getTotalLength()),
                            (n = [t[e][3] + n[0], t[e][4] + n[1]]),
                            this.functions.push(i));
                    } else if ('Q' === t[e][0]) {
                        if (n[0] == t[e][1] && n[1] == t[e][2]) {
                            let i = new c(t[e][1], t[e][3], t[e][2], t[e][4]);
                            ((this.length += i.getTotalLength()),
                                this.functions.push(i));
                        } else
                            ((i = new f.a(
                                n[0],
                                n[1],
                                t[e][1],
                                t[e][2],
                                t[e][3],
                                t[e][4],
                                void 0,
                                void 0
                            )),
                                (this.length += i.getTotalLength()),
                                this.functions.push(i));
                        ((n = [t[e][3], t[e][4]]), (r = [t[e][1], t[e][2]]));
                    } else if ('q' === t[e][0]) {
                        if (0 != t[e][1] || 0 != t[e][2])
                            ((i = new f.a(
                                n[0],
                                n[1],
                                n[0] + t[e][1],
                                n[1] + t[e][2],
                                n[0] + t[e][3],
                                n[1] + t[e][4],
                                void 0,
                                void 0
                            )),
                                (this.length += i.getTotalLength()),
                                this.functions.push(i));
                        else {
                            let i = new c(
                                n[0] + t[e][1],
                                n[0] + t[e][3],
                                n[1] + t[e][2],
                                n[1] + t[e][4]
                            );
                            ((this.length += i.getTotalLength()),
                                this.functions.push(i));
                        }
                        ((r = [n[0] + t[e][1], n[1] + t[e][2]]),
                            (n = [t[e][3] + n[0], t[e][4] + n[1]]));
                    } else if ('T' === t[e][0]) {
                        if (
                            e > 0 &&
                            ['Q', 'q', 'T', 't'].indexOf(t[e - 1][0]) > -1
                        )
                            ((i = new f.a(
                                n[0],
                                n[1],
                                2 * n[0] - r[0],
                                2 * n[1] - r[1],
                                t[e][1],
                                t[e][2],
                                void 0,
                                void 0
                            )),
                                this.functions.push(i),
                                (this.length += i.getTotalLength()));
                        else {
                            let i = new c(n[0], t[e][1], n[1], t[e][2]);
                            (this.functions.push(i),
                                (this.length += i.getTotalLength()));
                        }
                        ((r = [2 * n[0] - r[0], 2 * n[1] - r[1]]),
                            (n = [t[e][1], t[e][2]]));
                    } else if ('t' === t[e][0]) {
                        if (
                            e > 0 &&
                            ['Q', 'q', 'T', 't'].indexOf(t[e - 1][0]) > -1
                        )
                            ((i = new f.a(
                                n[0],
                                n[1],
                                2 * n[0] - r[0],
                                2 * n[1] - r[1],
                                n[0] + t[e][1],
                                n[1] + t[e][2],
                                void 0,
                                void 0
                            )),
                                (this.length += i.getTotalLength()),
                                this.functions.push(i));
                        else {
                            let i = new c(
                                n[0],
                                n[0] + t[e][1],
                                n[1],
                                n[1] + t[e][2]
                            );
                            ((this.length += i.getTotalLength()),
                                this.functions.push(i));
                        }
                        ((r = [2 * n[0] - r[0], 2 * n[1] - r[1]]),
                            (n = [t[e][1] + n[0], t[e][2] + n[0]]));
                    } else if ('A' === t[e][0]) {
                        const i = new d.a(
                            n[0],
                            n[1],
                            t[e][1],
                            t[e][2],
                            t[e][3],
                            1 === t[e][4],
                            1 === t[e][5],
                            t[e][6],
                            t[e][7]
                        );
                        ((this.length += i.getTotalLength()),
                            (n = [t[e][6], t[e][7]]),
                            this.functions.push(i));
                    } else if ('a' === t[e][0]) {
                        const i = new d.a(
                            n[0],
                            n[1],
                            t[e][1],
                            t[e][2],
                            t[e][3],
                            1 === t[e][4],
                            1 === t[e][5],
                            n[0] + t[e][6],
                            n[1] + t[e][7]
                        );
                        ((this.length += i.getTotalLength()),
                            (n = [n[0] + t[e][6], n[1] + t[e][7]]),
                            this.functions.push(i));
                    }
                    this.partial_lengths.push(this.length);
                }
            }
        }
        const p = class {
            constructor(e) {
                if (
                    ((this.getTotalLength = () => this.inst.getTotalLength()),
                    (this.getPointAtLength = (e) =>
                        this.inst.getPointAtLength(e)),
                    (this.getTangentAtLength = (e) =>
                        this.inst.getTangentAtLength(e)),
                    (this.getPropertiesAtLength = (e) =>
                        this.inst.getPropertiesAtLength(e)),
                    (this.getParts = () => this.inst.getParts()),
                    (this.inst = new h(e)),
                    !(this instanceof p))
                )
                    return new p(e);
            }
        };
        function T(e) {
            return new p(e).getTotalLength();
        }
        function u(e, t) {
            return new p(e).getPointAtLength(t);
        }
        function g(e, t) {
            return new p(e).getPropertiesAtLength(t);
        }
        function Q(e) {
            return new p(e);
        }
        function m(e) {
            const t = Object(n.toPoints)({ type: 'path', d: e }),
                {
                    top: i,
                    right: o,
                    bottom: a,
                    left: s,
                } = Object(r.boundingBox)(t);
            return {
                width: Math.abs(o - s),
                height: Math.abs(i - a),
            };
        }
        function b(e) {
            const { x: t, y: i, width: n, height: r } = e;
            return `M ${t} ${i} L ${t + n} ${i} L ${t + n} ${i + r} L ${t} ${i + r} Z`;
        }
    },
];
