/**
 * mocha 测试 文件
 * @author ydr.me
 * @create 2016-05-17 12:13
 */


'use strict';

var expect = require('chai').expect;
var path = require('../src/index.js');

describe('测试文件', function () {
    it('.normalize', function () {
        expect(path.normalize('/a//b/')).to.equal('/a/b/');
        expect(path.normalize('/a\\b/')).to.equal('/a/b/');
    });

    it('.glob', function () {
        var paths = path.glob(['**/*.txt'], {
            srcDirname: __dirname,
            filter: function (indexGlob, indexFile, file) {
                console.log(indexGlob, indexFile, file);
                return /-1\.txt$/.test(file);
            },
            progress: function (indexGlob, indexFile, file) {
                console.log(indexGlob, indexFile, file);
            }
        });

        console.log(paths);
    });

    it('.isDirectory', function () {
        expect(path.isDirectory(__dirname)).to.be.true;
        expect(path.isDirectory(__filename)).to.be.false;
        expect(path.isDirectory(path.join(__dirname, 'abcdef'))).to.be.false;
    });

    it('.isFile', function () {
        expect(path.isFile(__dirname)).to.be.false;
        expect(path.isFile(__filename)).to.be.true;
        expect(path.isFile(path.join(__dirname, 'abcdef'))).to.be.false;
    });

    it('.isExist', function () {
        expect(path.isExist(__dirname)).to.be.true;
        expect(path.isExist(__filename)).to.be.true;
        expect(path.isExist(path.join(__dirname, 'abcdef'))).to.be.false;
    });
});

