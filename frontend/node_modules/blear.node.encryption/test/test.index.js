/**
 * 测试 文件
 * @author ydr.me
 * @create 2016-05-17 12:13
 */


'use strict';

var expect = require('chai').expect;
var encryption = require('../src/index.js');

describe('测试文件', function () {
    it('.md5', function () {
        expect(encryption.md5('123')).to.equal('202cb962ac59075b964b07152d234b70');
    });

    it('.sha1', function () {
        expect(encryption.sha1('123')).to.equal('40bd001563085fc35165329ea1ff5c5ecbdbbeef');
        expect(encryption.sha1('123', 'abc')).to.equal('be9106a650ede01f4a31fde2381d06f5fb73e612');
    });

    it('.etag', function (done) {
        expect(encryption.etag(__filename, function (err, ret) {
            if (err) {
                throw err;
            }

            expect(encryption.etag(__filename)).to.equal(ret);
            done();
        }));
    });

    it('.lastModified', function () {
        expect(encryption.lastModified(__filename).length).to.equal(32);
    });

    it('.encode/.decode', function () {
        var original = '123';
        var secret = 'abc';

        var a = encryption.encode(original, secret);
        var b = encryption.decode(a, secret);

        expect(b).to.equal(original);
    });
});

