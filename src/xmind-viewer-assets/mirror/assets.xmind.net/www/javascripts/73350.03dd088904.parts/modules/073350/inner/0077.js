export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'a', function () {
            return n;
        });
        class n {
            constructor(e, t, i, n, a, s, l, c, d) {
                ((this.getTotalLength = () => this.length),
                    (this.getPointAtLength = (e) => {
                        e < 0 ? (e = 0) : e > this.length && (e = this.length);
                        const t = r(
                            { x: this.x0, y: this.y0 },
                            this.rx,
                            this.ry,
                            this.xAxisRotate,
                            this.LargeArcFlag,
                            this.SweepFlag,
                            { x: this.x1, y: this.y1 },
                            e / this.length
                        );
                        return { x: t.x, y: t.y };
                    }),
                    (this.getTangentAtLength = (e) => {
                        e < 0 ? (e = 0) : e > this.length && (e = this.length);
                        const t = 0.05,
                            i = this.getPointAtLength(e);
                        let n;
                        (e < 0 ? (e = 0) : e > this.length && (e = this.length),
                            (n =
                                e < this.length - t
                                    ? this.getPointAtLength(e + t)
                                    : this.getPointAtLength(e - t)));
                        const r = n.x - i.x,
                            o = n.y - i.y,
                            a = Math.sqrt(r * r + o * o);
                        return e < this.length - t
                            ? { x: -r / a, y: -o / a }
                            : { x: r / a, y: o / a };
                    }),
                    (this.getPropertiesAtLength = (e) => {
                        const t = this.getTangentAtLength(e),
                            i = this.getPointAtLength(e);
                        return {
                            x: i.x,
                            y: i.y,
                            tangentX: t.x,
                            tangentY: t.y,
                        };
                    }),
                    (this.x0 = e),
                    (this.y0 = t),
                    (this.rx = i),
                    (this.ry = n),
                    (this.xAxisRotate = a),
                    (this.LargeArcFlag = s),
                    (this.SweepFlag = l),
                    (this.x1 = c),
                    (this.y1 = d));
                const f = o(300, function (o) {
                    return r({ x: e, y: t }, i, n, a, s, l, { x: c, y: d }, o);
                });
                this.length = f.arcLength;
            }
        }
        const r = (e, t, i, n, r, o, l, c) => {
                ((t = Math.abs(t)), (i = Math.abs(i)), (n = a(n, 360)));
                const f = s(n);
                if (e.x === l.x && e.y === l.y)
                    return {
                        x: e.x,
                        y: e.y,
                        ellipticalArcAngle: 0,
                    };
                if (0 === t || 0 === i)
                    return { x: 0, y: 0, ellipticalArcAngle: 0 };
                const h = (e.x - l.x) / 2,
                    p = (e.y - l.y) / 2,
                    T = {
                        x: Math.cos(f) * h + Math.sin(f) * p,
                        y: -Math.sin(f) * h + Math.cos(f) * p,
                    },
                    u =
                        Math.pow(T.x, 2) / Math.pow(t, 2) +
                        Math.pow(T.y, 2) / Math.pow(i, 2);
                u > 1 && ((t = Math.sqrt(u) * t), (i = Math.sqrt(u) * i));
                let g =
                    (Math.pow(t, 2) * Math.pow(i, 2) -
                        Math.pow(t, 2) * Math.pow(T.y, 2) -
                        Math.pow(i, 2) * Math.pow(T.x, 2)) /
                    (Math.pow(t, 2) * Math.pow(T.y, 2) +
                        Math.pow(i, 2) * Math.pow(T.x, 2));
                g = g < 0 ? 0 : g;
                const Q = (r !== o ? 1 : -1) * Math.sqrt(g),
                    m = Q * ((t * T.y) / i),
                    b = Q * ((-i * T.x) / t),
                    C = {
                        x: Math.cos(f) * m - Math.sin(f) * b + (e.x + l.x) / 2,
                        y: Math.sin(f) * m + Math.cos(f) * b + (e.y + l.y) / 2,
                    },
                    L = { x: (T.x - m) / t, y: (T.y - b) / i },
                    y = d({ x: 1, y: 0 }, L);
                let M = d(L, {
                    x: (-T.x - m) / t,
                    y: (-T.y - b) / i,
                });
                (!o && M > 0
                    ? (M -= 2 * Math.PI)
                    : o && M < 0 && (M += 2 * Math.PI),
                    (M %= 2 * Math.PI));
                const A = y + M * c,
                    v = t * Math.cos(A),
                    E = i * Math.sin(A);
                return {
                    x: Math.cos(f) * v - Math.sin(f) * E + C.x,
                    y: Math.sin(f) * v + Math.cos(f) * E + C.y,
                    ellipticalArcStartAngle: y,
                    ellipticalArcEndAngle: y + M,
                    ellipticalArcAngle: A,
                    ellipticalArcCenter: C,
                    resultantRx: t,
                    resultantRy: i,
                };
            },
            o = (e, t) => {
                e = e || 500;
                let i = 0;
                const n = [],
                    r = [];
                let o,
                    a = t(0);
                for (let s = 0; s < e; s++) {
                    const d = c(s * (1 / e), 0, 1);
                    ((o = t(d)),
                        (i += l(a, o)),
                        r.push([a, o]),
                        n.push({ t: d, arcLength: i }),
                        (a = o));
                }
                return (
                    (o = t(1)),
                    r.push([a, o]),
                    (i += l(a, o)),
                    n.push({ t: 1, arcLength: i }),
                    {
                        arcLength: i,
                        arcLengthMap: n,
                        approximationLines: r,
                    }
                );
            },
            a = (e, t) => ((e % t) + t) % t,
            s = (e) => e * (Math.PI / 180),
            l = (e, t) =>
                Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2)),
            c = (e, t, i) => Math.min(Math.max(e, t), i),
            d = (e, t) => {
                const i = e.x * t.x + e.y * t.y,
                    n = Math.sqrt(
                        (Math.pow(e.x, 2) + Math.pow(e.y, 2)) *
                            (Math.pow(t.x, 2) + Math.pow(t.y, 2))
                    );
                return (e.x * t.y - e.y * t.x < 0 ? -1 : 1) * Math.acos(i / n);
            };
    },
];
