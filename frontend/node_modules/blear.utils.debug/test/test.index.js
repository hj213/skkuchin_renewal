/**
 * karma 测试 文件
 * @author ydr.me
 * @create 2016-05-17 12:13
 */


'use strict';

var debug = require('../src/index.js');

describe('测试文件', function () {
    it('.deprecate', function (done) {
        var fn1 = function (a, b) {
            return a + b;
        };
        var fn2 = debug.deprecate(fn1);
        var fn3 = debug.deprecate(fn1, '呵呵，不要在用这个方法了');

        expect(fn2(1, 2)).toEqual(3);
        expect(fn3(1, 2)).toEqual(3);
        done();
    });
});
