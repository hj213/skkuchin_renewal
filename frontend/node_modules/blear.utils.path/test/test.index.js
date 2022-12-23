/**
 * 测试 文件
 * @author ydr.me
 * @create 2016-05-17 12:13
 */


'use strict';

var path = require('../src/index.js');

describe('index.js', function () {
    it('.normalize', function (done) {
        expect(path.normalize('/')).toEqual('/');
        expect(path.normalize('/a/..')).toEqual('/');
        expect(path.normalize('//')).toEqual('/');
        expect(path.normalize('/./')).toEqual('/');
        expect(path.normalize('/a/b/c/..')).toEqual('/a/b/');
        expect(path.normalize('/a/b/c/.')).toEqual('/a/b/c/');
        expect(path.normalize('/a/b/c/../d/')).toEqual('/a/b/d/');
        expect(path.normalize('/a/b/c/./d/')).toEqual('/a/b/c/d/');
        done();
    });

    it('.isStatic', function () {
        expect(path.isStatic('ss://')).toEqual(true);
        expect(path.isStatic('ss:bac')).toEqual(true);
        expect(path.isStatic('mailto:bac')).toEqual(true);
        expect(path.isStatic('tel:188')).toEqual(true);
        expect(path.isStatic('//')).toEqual(true);
        expect(path.isStatic('/')).toEqual(false);
        expect(path.isStatic('./')).toEqual(false);
        expect(path.isStatic('a')).toEqual(false);
    });

    it('.isAbsolute', function () {
        expect(path.isAbsolute('ss://')).toEqual(false);
        expect(path.isAbsolute('//')).toEqual(false);
        expect(path.isAbsolute('/')).toEqual(true);
        expect(path.isAbsolute('./')).toEqual(false);
        expect(path.isAbsolute('a')).toEqual(false);
    });

    it('.isRelative', function () {
        expect(path.isRelative('ss://')).toEqual(false);
        expect(path.isRelative('//')).toEqual(false);
        expect(path.isRelative('/')).toEqual(false);
        expect(path.isRelative('./')).toEqual(true);
        expect(path.isRelative('a')).toEqual(true);
    });

    it('.dirname', function () {
        expect(path.dirname('a')).toEqual('/');
        expect(path.dirname('/')).toEqual('/');
        expect(path.dirname('./')).toEqual('./');
        expect(path.dirname('./a/b/c')).toEqual('./a/b/');
        expect(path.dirname('./a/b/c/')).toEqual('./a/b/c/');
    });

    it('.resolve', function () {
        expect(path.resolve('/', '/')).toEqual('/');
        expect(path.resolve('./', '/')).toEqual('/');
        expect(path.resolve('/a/b/c/', '/d/e/f/')).toEqual('/d/e/f/');
        expect(path.resolve('./a/b/c', '..')).toEqual('./a/b/');
        expect(path.resolve('./a/b/c', '..', './b')).toEqual('./a/b/b');
        expect(path.resolve('./a/b/c', '..', './b', '/c')).toEqual('/c');
    });

    it('.join', function () {
        expect(path.join('/', '/')).toEqual('/');
        expect(path.join('./', '/')).toEqual('./');
        expect(path.join('/a/b/c/', '/d/e/f/')).toEqual('/a/b/c/d/e/f/');
        expect(path.join('./a/b/c', '..')).toEqual('./a/b/');
        expect(path.join('./a/b/c', '..', './b')).toEqual('./a/b/b');
        expect(path.join('./a/b/c', '..', './b', 'c')).toEqual('./a/b/b/c');
        expect(path.join('./a/b/c', '..', './b', '/c')).toEqual('./a/b/b/c');
    });
});
