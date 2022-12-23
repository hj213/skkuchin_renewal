/**
 * 测试 文件
 * @author ydr.me
 * @create 2016-05-17 12:13
 */


'use strict';

var object = require('../src/index.js');

describe('index.js', function () {
    it('.keys', function (done) {
        var obj1 = {
            a: 1,
            b: 2,
            c: 3
        };
        var keys = object.keys(obj1);

        expect(keys.length).toBe(3);
        expect(keys.indexOf('a') > -1).toBe(true);
        expect(keys.indexOf('b') > -1).toBe(true);
        expect(keys.indexOf('c') > -1).toBe(true);

        done();
    });

    it('.isPlain', function (done) {
        var obj1 = {a: 1};
        var C = function () {

        };
        C.prototype = {
            a: 1
        };
        var obj2 = new C();
        var obj3 = Object.create(null);

        expect(object.isPlain(null)).toBe(false);
        expect(object.isPlain(new Error(''))).toBe(false);
        expect(object.isPlain(obj1)).toBe(true);
        expect(object.isPlain(obj2)).toBe(false);
        expect(object.isPlain(obj3)).toBe(true);

        done();
    });

    it('.each', function (done) {
        var obj1 = {
            a: 1,
            b: 2,
            c: 3
        };
        var keys = [];
        var vals = [];
        object.each(obj1, function (key, val) {
            if (val > 1) {
                return false;
            }

            keys.push(key);
            vals.push(val);
        });
        expect(keys.length).toEqual(1);
        expect(vals.length).toEqual(1);
        expect(keys[0]).toEqual('a');
        expect(vals[0]).toEqual(1);
        done();
    });

    it('.define', function () {
        var o = {};
        var oc = null;

        object.define(o, 'a', {
            value: '1'
        });

        expect(o.a).toEqual('1');

        object.define(o, {
            b: {
                value: 2
            },
            c: {
                set: function (val) {
                    oc = val;
                },
                get: function () {
                    return oc;
                },
                writable: true
            }
        });

        expect(o.b).toBe(2);
        expect(o.c).toBe(null);
        o.b = 3;
        o.c = 4;
        expect(o.b).toBe(3);
        expect(o.c).toBe(4);

        object.define(o, 'd', {
            get: function () {
                return 5;
            }
        });
        expect(o.d).toBe(5);
        o.d = 6;
        expect(o.d).toBe(5);
    });

    it('.map', function (done) {
        var obj1 = {
            a: 1,
            b: 2,
            c: 3
        };
        var obj2 = object.map(obj1, function (item) {
            return item * item;
        });
        expect(obj1).not.toBe(obj2);
        expect(obj1.a).toEqual(1);
        expect(obj1.b).toEqual(2);
        expect(obj1.c).toEqual(3);
        expect(obj2.a).toEqual(1);
        expect(obj2.b).toEqual(4);
        expect(obj2.c).toEqual(9);
        done();
    });

    it('.filter:callback', function (done) {
        var obj1 = {
            a: 1,
            b: 2,
            c: 3
        };
        var obj2 = object.filter(obj1, function (item) {
            return item > 1;
        });
        var keys = object.keys(obj2);

        console.log(obj2);

        expect(obj1).not.toBe(obj2);
        expect(keys.length).toBe(2);
        expect(obj2.b).toBe(2);
        expect(obj2.c).toBe(3);

        done();
    });

    it('.filter:array', function (done) {
        var obj1 = {
            a: 1,
            b: 2,
            c: 3
        };
        var obj2 = object.filter(obj1, ['b', 'c']);
        var keys = object.keys(obj2);

        console.log(obj2);

        expect(obj1).not.toBe(obj2);
        expect(keys.length).toBe(2);
        expect(obj2.b).toBe(2);
        expect(obj2.c).toBe(3);

        done();
    });

    it('.assign', function (done) {
        var obj1 = {
            a: 1,
            b: 2,
            c: {
                o: 11,
                p: {
                    q: 'q'
                }
            },
            l: [1, 2, 3, 4]
        };
        var obj2 = {
            a: {
                x: 1,
                y: 2,
                z: 3
            },
            c: {
                p: {
                    q: 'q2'
                }
            }
        };
        var obj3 = {
            l: [0, 9, 8, 7]
        };
        var obj4 = object.assign(obj1, obj2, obj3);

        // 检查 obj2
        expect(obj2.a.x).toBe(1);
        expect(obj2.a.y).toBe(2);
        expect(obj2.a.z).toBe(3);
        expect(obj2.c.p.q).toBe('q2');
        expect(object.keys(obj2).length).toBe(2);
        expect(object.keys(obj2.a).length).toBe(3);
        expect(object.keys(obj2.c).length).toBe(1);
        expect(object.keys(obj2.c.p).length).toBe(1);

        // 检查 obj3
        expect(obj3.l[0]).toBe(0);
        expect(obj3.l[1]).toBe(9);
        expect(obj3.l[2]).toBe(8);
        expect(obj3.l[3]).toBe(7);
        expect(obj3.l.length).toBe(4);
        expect(object.keys(obj3).length).toBe(1);

        // 检查 obj4
        expect(obj4).toBe(obj1);
        expect(obj4).not.toBe(obj2);
        expect(obj4).not.toBe(obj3);
        expect(object.keys(obj4).length).toBe(4);
        expect(obj4.a.x).toBe(1);
        expect(obj4.a.y).toBe(2);
        expect(obj4.a.z).toBe(3);
        expect(obj4.b).toBe(2);
        expect(obj4.c.o).toBe(undefined);
        expect(obj4.c.p.q).toBe('q2');
        expect(obj4.l[0]).toBe(0);
        expect(obj4.l[1]).toBe(9);
        expect(obj4.l[2]).toBe(8);
        expect(obj4.l[3]).toBe(7);
        expect(obj4.l.length).toBe(4);

        done();
    });


    it('.assign:true', function (done) {
        var obj1 = {
            a: 1,
            b: 2,
            c: {
                o: 11,
                p: {
                    q: 'q'
                }
            },
            l: [1, 2, 3, 4]
        };
        var obj2 = {
            a: {
                x: 1,
                y: 2,
                z: 3
            },
            c: {
                p: {
                    q: 'q2'
                }
            }
        };
        var obj3 = {
            l: [0, 9, 8, 7]
        };
        var obj4 = object.assign(true, obj1, obj2, obj3);

        // 检查 obj2
        expect(obj2.a.x).toBe(1);
        expect(obj2.a.y).toBe(2);
        expect(obj2.a.z).toBe(3);
        expect(obj2.c.p.q).toBe('q2');
        expect(object.keys(obj2).length).toBe(2);
        expect(object.keys(obj2.a).length).toBe(3);
        expect(object.keys(obj2.c).length).toBe(1);
        expect(object.keys(obj2.c.p).length).toBe(1);

        // 检查 obj3
        expect(obj3.l[0]).toBe(0);
        expect(obj3.l[1]).toBe(9);
        expect(obj3.l[2]).toBe(8);
        expect(obj3.l[3]).toBe(7);
        expect(obj3.l.length).toBe(4);
        expect(object.keys(obj3).length).toBe(1);

        // 检查 obj4
        expect(obj4).toBe(obj1);
        expect(obj4).not.toBe(obj2);
        expect(obj4).not.toBe(obj3);
        expect(object.keys(obj4).length).toBe(4);
        expect(obj4.a.x).toBe(1);
        expect(obj4.a.y).toBe(2);
        expect(obj4.a.z).toBe(3);
        expect(obj4.b).toBe(2);
        expect(obj4.c.o).toBe(11);
        expect(obj4.c.p.q).toBe('q2');
        expect(obj4.l[0]).toBe(0);
        expect(obj4.l[1]).toBe(9);
        expect(obj4.l[2]).toBe(8);
        expect(obj4.l[3]).toBe(7);
        expect(obj4.l.length).toBe(4);

        done();
    });

    it('.supply simple', function () {
        var o1 = {a: 1};
        var o2 = {a: 2, b: 3};
        var o3 = object.supply(o1, o2);

        expect(o3).toBe(o1);
        expect(o3.a).toBe(1);
        expect(o3.b).toBe(3);
    });

    it('.supply deep', function () {
        var o1 = {a: {x: 1}, b: [1]};
        var o2 = {a: {x: 2, y: 3}, b: [2, 3]};
        var o3 = object.supply(true, o1, o2);

        expect(o3).toBe(o1);
        expect(o3.a).toBe(o1.a);
        expect(o3.a.x).toBe(1);
        expect(o3.a.y).toBe(3);
        expect(o3.b).toBe(o1.b);
        expect(o3.b[0]).toBe(1);
        expect(o3.b[1]).toBe(3);
    });

    it('.path', function () {
        expect(object.path('a.b').join(' > ')).toEqual('a > b');
        expect(object.path('a.b["c"]').join(' > ')).toEqual('a > b > c');
        expect(object.path('a.b["c"].d').join(' > ')).toEqual('a > b > c > d');
        expect(object.path('a.b["c"]["d"]').join(' > ')).toEqual('a > b > c > d');
        expect(object.path('a.b["c"][1]').join(' > ')).toEqual('a > b > c > 1');
        expect(object.path('a.b["c"][1].d').join(' > ')).toEqual('a > b > c > 1 > d');
        expect(object.path('a.b["c"][1][2]').join(' > ')).toEqual('a > b > c > 1 > 2');
        expect(object.path('a.b["c"][1][2][3]').join(' > ')).toEqual('a > b > c > 1 > 2 > 3');
        expect(object.path('a.b["c"][1][2][3].d').join(' > ')).toEqual('a > b > c > 1 > 2 > 3 > d');
        expect(object.path('a.b["c"][1][2][3].d.e').join(' > ')).toEqual('a > b > c > 1 > 2 > 3 > d > e');
        expect(object.path('a.b["\'c"]').join(' > ')).toEqual('a > b > \'c');
        expect(object.path('a.b["\\"c"]').join(' > ')).toEqual('a > b > "c');
    });

    it('.get', function () {
        var o1 = {
            a: {
                b: {
                    1: {
                        eee: 2
                    }
                },
                c: [{d: 2}]
            }
        };

        expect(object.get(o1, 'a')).toEqual(o1.a);
        expect(object.get(o1, 'a.b')).toEqual(o1.a.b);
        expect(object.get(o1, 'a.b.1')).toEqual(o1.a.b[1]);
        expect(object.get(o1, 'a.b.1.eee')).toEqual(o1.a.b[1].eee);
        expect(object.get(o1, 'a.b.1.eee.fff')).toEqual(undefined);
        expect(object.get(o1, 'a.b.1.eee.fff.ggg')).toEqual(undefined);
        expect(object.get(o1, 'a.b.1.eee.fff.ggg.hhh')).toEqual(undefined);
        expect(object.get(o1, 'a.b[1].eee')).toEqual(2);
        expect(object.get(o1, 'a.b[1].eeee')).toEqual(undefined);
        expect(object.get(o1, 'a.b[2].eee')).toEqual(undefined);
        expect(object.get(o1, 'a.b[1]')).toEqual(o1.a.b[1]);
        expect(object.get(o1, ['a', 'b', '1'])).toEqual(o1.a.b[1]);
        expect(object.get(o1, ['a', 'b', '1', 'eee'])).toEqual(2);
        expect(object.get(o1, ['a', 'b', '1', 'eeee'])).toEqual(undefined);
        expect(object.get(o1, ['a', 'b', '1', 'eeee', 'ffff'])).toEqual(undefined);
        expect(object.get(o1, 'a.c[0]')).toEqual(o1.a.c[0]);
        expect(object.get(o1, 'a.c[0].d')).toEqual(2);
    });

    it('.set', function () {
        var o1 = {
            a: {
                b: {
                    1: {
                        eee: 2
                    }
                },
                c: [{d: 2}]
            }
        };

        object.set(o1, 'a.b[1].eee', 3);
        expect(o1.a.b[1].eee).toEqual(3);

        object.set(o1, 'a.b.d', 4);
        expect(o1.a.b.d).toBe(4);

        object.set(o1, 'a.b.e.f.g', 5);
        expect(o1.a.b.e.f.g).toBe(5);

        object.set(o1, 'a.b[1].eee.fff.ggg.hhh.iii', 6);
        expect(o1.a.b[1].eee.fff.ggg.hhh.iii).toEqual(6);

        object.set(o1, 'm', 7);
        expect(o1.m).toBe(7);

        object.set(o1, 'o.p', 8);
        expect(o1.o.p).toBe(8);

        object.set(o1, 'r.s.t', 9);
        expect(o1.r.s.t).toBe(9);
    });
});
