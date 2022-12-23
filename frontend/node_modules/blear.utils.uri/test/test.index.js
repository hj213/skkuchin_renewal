/**
 * 测试 文件
 * @author ydr.me
 * @create 2016-05-17 12:13
 */


'use strict';

var uri = require('../src/index.js');

describe('index.js', function () {
    it('.encode', function (done) {
        expect(uri.encode('!')).toBe('%21');
        expect(uri.encode('\uD800')).toBe('');
        done();
    });

    it('.encode', function (done) {
        expect(uri.decode('%21')).toBe('!');
        expect(uri.decode('%2')).toBe('');
        done();
    });
});
