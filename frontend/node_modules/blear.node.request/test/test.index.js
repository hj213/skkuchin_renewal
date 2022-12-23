/**
 * mocha 测试 文件
 * @author ydr.me
 * @create 2016-05-17 12:13
 */


'use strict';

var fs = require('fs');
var assert = require('assert');
var path = require('path');
var object = require('blear.utils.object');
var expect = require('chai-jasmine').expect;
var console = require('blear.node.console');

var request = require('../src/index.js');
var FormData = request.FormData;

describe('测试文件', function () {
    it('get nogzip', function (done) {
        var url = 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=&json=1&p=3';

        request({
            debug: true,
            url: url,
            query: {
                _: 1
            }
        }, function (err, body, res) {
            console.log(err);
            console.log(res.statusCode);
            console.log(res.headers);

            if (!err) {
                expect(body).match(/window\.baidu/);
            }

            done();
        });
    });

    it('get gzip', function (done) {
        var url = 'https://www.baidu.com';

        request({
            debug: true,
            url: url
        }, function (err, body, res) {
            console.log(err);
            console.log(res.statusCode);
            console.log(res.headers);

            if (!err) {
                expect(body).match(/<!doctype\s+html/i);
            }

            done();
        });
    });

    it('get 30x', function (done) {
        var url = 'https://baidu.com';

        request({
            debug: true,
            url: url
        }, function (err, body, res) {
            console.log(err);
            console.log(res.statusCode);
            console.log(res.headers);

            if (!err) {
                expect(body).match(/<!doctype\s+html/i);
                expect(this.requestedList.length > 1).toBe(true);
            }

            done();
        });
    });

    it('download', function (done) {
        var url = 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png';
        var file = path.join(__dirname, 'request2.png');

        request({
            url: url,
            encoding: 'binary',
            debug: true
        }, function (err, body) {
            if(err) {
                done();
                return;
            }

            fs.writeFileSync(file, body);
            done();
        });
    });

    it('tmall', function (done) {
        var url = 'http://detail.m.tmall.com/item.htm?id=525112500172';

        var req = request({
            debug: true,
            url: url
        }, function (err, body) {
            if (err) {
                done();
                return;
            }

            expect(body).match(/tmall/i);
            done();
        });
    });

    it('browser false', function (done) {
        var url = 'https://baidu.com';

        request({
            debug: true,
            url: url,
            browser: false
        }, function (err, body) {
            done();
        });
    });

    it('pipe to', function (done) {
        var url = 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png';
        var file = path.join(__dirname, 'request1.png');

        request({
            url: url,
            debug: true,
            encoding: null
        }).on('error', function (err) {
            console.log('\n\n-------------------------------------');
            console.log('response error');
            console.error(err);
            done();
        }).pipe(fs.createWriteStream(file)).on('close', function () {
            done();
        }).on('error', function () {
            console.log('error');
            done();
        });
    });

    it('pipe from 1', function (done) {
        var file = path.join(__dirname, 'image.png');
        var url = 'https://www.baidu.com/';
        var req = request({
            debug: true,
            url: url,
            method: 'post',
            formData: {
                user: 'cloudcome',
                file: {
                    value: fs.createReadStream(file),
                    options: {
                        filename: 'image.png'
                    }
                }
            }
        }, function () {
            done();
        });
    });

    it('pipe from 2', function (done) {
        var file = path.join(__dirname, 'image.png');
        var rs = fs.createReadStream(file);
        var url = 'https://www.baidu.com/';
        var req = request({
            debug: false,
            url: url,
            method: 'post'
        });

        rs.pipe(req).on('error', function (err) {
            console.log('\n\n-------------------------------------');
            console.log('response error');
            console.error(err);
            done();
        }).on('response', function () {
            done();
        });
    });

    it('post body', function (done) {
        var url = 'http://tieba.baidu.com/f/commit/post/add';

        request.post({
            debug: true,
            url: url,
            body: {
                content: 1
            }
        }, done);
    });

    it('callback', function (done) {
        var url = 'https://detail.tmall.com/item.htm?id=525112500172';

        request.get(url, function (err, body, res) {
            if (err) {
                console.log('\n\n-------------------------------------');
                console.log('response error');
                console.error(err);
                done();
                return;
            }

            console.log('\n\n-------------------------------------');
            console.log('response body');
            console.log(body.slice(0, 200));
            expect(body).match(/tmall/i);
            done();
        });
    });

    it('callback error', function (done) {
        var url = 'http://1111111111111111111111111111.ydr';
        request({
            url: url,
            debug: true,
            browser: true
        }, function (err) {
            expect(!!err).toBeTruthy();
            done();
        });
    });

    it('head', function (done) {
        request.head('https://www.baidu.com', function (err, headers, res) {
            if (err) {
                console.log(err);
                return done();
            }

            console.log(headers);
            // console.log(res.headers);
            done();
        });
    });
});

