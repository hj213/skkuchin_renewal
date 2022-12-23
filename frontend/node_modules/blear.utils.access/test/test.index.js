/**
 * 测试 文件
 * @author ydr.me
 * @create 2016-05-17 12:13
 */


'use strict';

var access = require('../src/index.js');

describe('index.js', function () {
    it('.getSet@setLength=0', function () {
        var arr = [1, 2, 3, 4];
        var ret1 = access.getSet({
            get: function (index) {
                return arr[index];
            },
            setLength: 0
        }, [0]);
        var ret2 = access.getSet({
            get: function (index) {
                return arr[index];
            },
            setLength: 0
        }, [[0, 3]]);

        expect(ret1).toEqual(1);
        expect(ret2).toEqual({
            0: 1,
            3: 4
        });
    });

    it('.getSet@setLength=1', function () {
        var ret = 1;

        access.getSet({
            set: function (val) {
                ret += val;
            },
            setLength: 1,
            eachSet: true
        }, [[1,2]]);

        expect(ret).toEqual(4);

        access.getSet({
            set: function (val) {
                ret = val
            },
            setLength: 1,
            eachSet: false
        }, [[1,2]]);
        expect(ret).toEqual([1,2]);

        access.getSet({
            set: function (val) {
                ret = val
            },
            setLength: 1,
            eachSet: true
        }, [3]);
        expect(ret).toEqual(3);

        var ret1 =  access.getSet({
            get: function () {
                return ret;
            },
            setLength: 1,
            eachSet: true
        }, []);
        expect(ret1).toEqual(3);
    });

    it('.getSet@setLength=2', function () {
        var setLength = 2;
        var map = {a: 1, b: 2, c: 3};
        var getA = access.getSet({
            get: function (key) {
                return map[key];
            },
            set: function (key, val) {
                map[key] = val;
            },
            setLength: setLength
        }, ['a']);
        var getAB = access.getSet({
            get: function (key) {
                return map[key];
            },
            set: function (key, val) {
                map[key] = val;
            },
            setLength: setLength
        }, [['a', 'b']]);

        expect(getA).toEqual(1);
        expect(getAB).toEqual({
            a: 1,
            b: 2
        });

        // {a: 11}
        access.getSet({
            get: function (key) {
                return map[key];
            },
            set: function (key, val) {
                map[key] = val;
            },
            setLength: setLength
        }, ['a', 11]);
        getA = access.getSet({
            get: function (key) {
                return map[key];
            },
            set: function (key, val) {
                map[key] = val;
            },
            setLength: setLength
        }, ['a']);
        getAB = access.getSet({
            get: function (key) {
                return map[key];
            },
            set: function (key, val) {
                map[key] = val;
            },
            setLength: setLength
        }, [['a', 'b']]);

        expect(getA).toEqual(11);
        expect(getAB).toEqual({
            a: 11,
            b: 2
        });

        // {b: 22, c: 33}
        access.getSet({
            get: function (key) {
                return map[key];
            },
            set: function (key, val) {
                map[key] = val;
            },
            setLength: setLength
        }, [{b: 22, c: 33}]);
        getA = access.getSet({
            get: function (key) {
                return map[key];
            },
            set: function (key, val) {
                map[key] = val;
            },
            setLength: setLength
        }, ['a']);
        getAB = access.getSet({
            get: function (key) {
                return map[key];
            },
            set: function (key, val) {
                map[key] = val;
            },
            setLength: setLength
        }, [['a', 'b']]);
        var getC = access.getSet({
            get: function (key) {
                return map[key];
            },
            set: function (key, val) {
                map[key] = val;
            },
            setLength: setLength
        }, ['c']);
        expect(getA).toEqual(11);
        expect(getAB).toEqual({
            a: 11,
            b: 22
        });
        expect(getC).toEqual(33);
    });
});
