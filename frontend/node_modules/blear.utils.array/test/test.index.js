/**
 * 测试 文件
 * @author ydr.me
 * @create 2016-05-17 12:13
 */


'use strict';

var array = require('../src/index.js');

describe('index.js', function () {
    it('.like/.from', function () {
        var obj1 = {
            0: '',
            1: '',
            length: 2
        };
        expect(array.like([])).toEqual(true);
        expect(array.from([])).toEqual([]);
        expect(array.like(obj1)).toEqual(true);
        expect(array.from(obj1)).toEqual(['', '']);
        (function () {
            expect(array.like(arguments)).toEqual(true);
            expect(array.from(arguments)).toEqual([]);
        }());
        expect(array.like(window)).toEqual(true);
        expect(array.like(function () {
        })).toEqual(true);
        expect(array.like()).toEqual(false);
        expect(array.from()).toEqual([]);
    });

    it('.each', function () {
        var arr = ['a', 'b', 'c', 'd'];
        var str1 = '';
        var str2 = '';
        var str3 = '';
        var str4 = '';
        var str5 = '';
        var str6 = '';
        var str7 = '';
        var str8 = '';

        // 顺序
        array.each(arr, function (index, item) {
            str1 += index;
            str2 += item;
        });
        expect(str1).toEqual('0123');
        expect(str2).toEqual('abcd');

        // 顺序 break
        array.each(arr, function (index, item) {
            if (item === 'c') {
                return false;
            }

            str3 += index;
            str4 += item;
        });
        expect(str3).toEqual('01');
        expect(str4).toEqual('ab');

        // 倒序
        array.each(arr, function (index, item) {
            str5 += index;
            str6 += item;
        }, true);
        expect(str5).toEqual('3210');
        expect(str6).toEqual('dcba');

        // 倒序 break
        array.each(arr, function (index, item) {
            if (item === 'c') {
                return false;
            }

            str7 += index;
            str8 += item;
        }, true);
        expect(str7).toEqual('3');
        expect(str8).toEqual('d');
    });

    it('.map', function () {
        var arr1 = [1, 2, 3];
        var arr2 = array.map(arr1, function (item) {
            return item * item;
        });

        expect(arr1).toEqual([1, 2, 3]);
        expect(arr1).toBe(arr1);
        expect(arr2).toEqual([1, 4, 9]);
        expect(arr2).not.toBe(arr1);
    });

    it('.filter', function () {
        var arr1 = [1, 2, 3];
        var arr2 = array.filter(arr1, function (item) {
            return item > 1;
        });

        expect(arr1).toEqual([1, 2, 3]);
        expect(arr1).toBe(arr1);
        expect(arr2).toEqual([2, 3]);
        expect(arr2).not.toBe(arr1);
    });

    it('.delete: no deep', function () {
        var arr1 = [1, 2, 3, 4, 1, 2, 3, 4];
        var arr2 = array.delete(arr1, 2);
        expect(arr2).toEqual([1, 3, 4, 1, 2, 3, 4]);
        expect(arr2).toBe(arr1);
    });

    it('.delete: deep', function () {
        var arr1 = [1, 2, 3, 4, 1, 2, 3, 4];
        var arr2 = array.delete(arr1, 2, true);
        expect(arr2).toEqual([1, 3, 4, 1, 3, 4]);
        expect(arr2).toBe(arr1);
    });

    it('.remove one', function () {
        var arr1 = [1, 2, 3, 4];
        var arr2 = array.remove(arr1, 2);
        expect(arr2).toEqual([1, 2, 4]);
        expect(arr2).toBe(arr1);
    });

    it('.remove', function () {
        var arr1 = [1, 2, 3, 4];
        var indexes = [1, 2, 0];
        var arr2 = array.remove(arr1, indexes);
        expect(arr2).toEqual([4]);
        expect(arr2).toBe(arr1);
    });

    it('.range', function () {
        var start = -2;
        var arr1 = array.range(start, 4);
        array.each(arr1, function (index, val) {
            expect(start + index).toEqual(val);
        });
    });

    it('.indexOf', function () {
        expect(array.indexOf([1, 1, 2], 1)).toEqual(0);
        expect(array.indexOf([1, 1, 2], 1, 1)).toEqual(1);
        expect(array.indexOf([1, 1, 2], 3, 1)).toEqual(-1);
    });

    it('.reduce:2', function () {
        var t = 0;
        var arr = ['a', 'b', 'c', 'd'];
        var ret = array.reduce(arr, function (prev, next) {
            t++;
            return prev + next;
        });
        expect(t).toEqual(3);
        expect(ret).toEqual('abcd');
    });

    it('.reduce:3', function () {
        var t = 0;
        var arr = ['a', 'b', 'c', 'd'];
        var ret = array.reduce(arr, function (prev, next) {
            t++;
            return prev + next;
        }, '');
        expect(t).toEqual(4);
        expect(ret).toEqual('abcd');
    });
});
