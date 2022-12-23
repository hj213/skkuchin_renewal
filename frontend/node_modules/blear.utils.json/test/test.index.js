/**
 * 测试 文件
 * @author ydr.me
 * @create 2016-05-17 12:13
 */


'use strict';

var json = require('../src/index.js');

describe('index.js', function () {
    it('.parse', function (done) {
        var ret = json.parse('{"a":"1"}');

        expect(ret).toEqual({a:"1"});
        done();
    });

    it('.stringify', function (done) {
        var ret = json.stringify({"a":"1"});

        expect(ret).toEqual('{"a":"1"}');
        done();
    });

    it('.safeParse', function (done) {
        var ret1 = json.safeParse('{"a":"1",b2}');
        var ret2 = json.safeParse('{"a":"1",b:2}');

        expect(ret1).toEqual(null);
        expect(ret2).toEqual({
            a: '1',
            b: 2
        });
        done();
    });

    it('.stringify', function (done) {
        var ret1 = json.safeStringify({"a":"1"});
        var ret2 = json.safeStringify(new Error(''));
        var ret3 = json.safeStringify(new Function());
        var ret4 = json.safeStringify(window);

        expect(ret1).toEqual('{"a":"1"}');
        expect(ret2).toEqual('');
        expect(ret3).toEqual('');
        expect(ret4).toEqual('');
        done();
    });
});
