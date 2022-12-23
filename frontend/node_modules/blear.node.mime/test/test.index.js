/**
 * mocha 测试 文件
 * @author ydr.me
 * @create 2016-05-17 12:13
 */


'use strict';

var expect = require('chai').expect;

var mime = require('../src/index.js');

describe('测试文件', function () {
    it('.get', function () {
        expect(mime.get('.jpg')).to.equal('image/jpeg');
        expect(mime.get('.xxxxxx')).to.equal('application/octet-stream');
        expect(mime.get('.xxxxxx', 'a/b')).to.equal('a/b');
    });
    
    it('.set', function () {
        var ydrMIME = 'cloudcome/yundanran';
        mime.set('.ydr', ydrMIME);
        expect(mime.get('.ydr')).to.equal(ydrMIME);
    });
});

