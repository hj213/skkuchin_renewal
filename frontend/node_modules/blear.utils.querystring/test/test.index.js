/**
 * 测试 文件
 * @author ydr.me
 * @create 2016-05-17 12:13
 */


'use strict';

var querystring = require('../src/index.js');

describe('index.js', function () {
    it('.parse', function (done) {
        expect(querystring.parse('a=1&c=5&b=2&c=3&d=4&c=6')).toEqual({
            a: '1',
            b: '2',
            c: ['5', '3', '6'],
            d: '4'
        });

        done();
    });

    it('.stringify', function (done) {
        var ret = querystring.stringify({
            a: '1',
            b: '2',
            c: ['5', '3', '6'],
            d: '4',
            e: function(){}
        });

        expect(ret).toMatch(/a=1/);
        expect(ret).toMatch(/b=2/);
        expect(ret).toMatch(/c=5&c=3&c=6/);
        expect(ret).toMatch(/d=4/);
        expect(ret).not.toMatch(/e=/);

        done();
    });
});
