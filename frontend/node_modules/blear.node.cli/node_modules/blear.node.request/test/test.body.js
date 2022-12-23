/**
 * 单元测试 basic
 * @author 云淡然
 * @create 2018年09月30日09:29:55
 */


var expect = require('chai-jasmine').expect;
var server = require('./sever');
var request = require('../src/index');

describe('body', function () {

    it('json', function (done) {
        server(done, function (app, stop) {

            app.post('/', function (req, res) {
                expect(req.headers['content-type']).toEqual('application/json');
                res.send(JSON.stringify(req.body));
            });

            var json = {
                a: 1
            };

            request({
                url: app.$remote('/'),
                json: json,
                method: 'post'
            }, function (err, body) {
                expect(body).toEqual('{"a":1}');
                stop();
            });

        });
    });

    it('form', function (done) {
        server(done, function (app, stop) {

            app.post('/', function (req, res) {
                expect(req.headers['content-type']).toEqual('application/x-www-form-urlencoded');
                res.send(JSON.stringify(req.body));
            });

            var form = {
                a: 1
            };

            request({
                url: app.$remote('/'),
                form: form,
                method: 'post'
            }, function (err, body) {
                expect(body).toEqual('{"a":"1"}');
                stop();
            });

        });
    });

    it('formData text', function (done) {
        server(done, function (app, stop) {

            app.post('/', app.$upload.none(), function (req, res) {
                expect(req.headers['content-type']).toMatch(/^multipart\/form-data;/);
                expect(req.body.a).toEqual('1');
                res.send('ok');
            });

            var formData = {
                a: 1
            };

            request({
                url: app.$remote('/'),
                formData: formData,
                method: 'post'
            }, function (err, body) {
                expect(body).toEqual('ok');
                stop();
            });

        });
    });

    it('formData file', function (done) {
        server(done, function (app, stop) {
            var fs = require('fs');
            var path = require('path');

            app.post('/', app.$upload.single('b'), function (req, res) {
                expect(req.headers['content-type']).toMatch(/^multipart\/form-data;/);
                expect(req.file.mimetype).toEqual('text/plain');
                expect(req.file.originalname).toEqual('b.txt');
                expect(req.file.size).toBeGreaterThan(1);
                fs.statSync(req.file.path);
                fs.unlinkSync(req.file.path);
                res.send('ok');
            });

            var formData = {
                a: 1,
                b: {
                    value: fs.createReadStream(path.join(__dirname, 'mocha.opts')),
                    options: {
                        filename: 'b.txt',
                        contentType: 'text/plain'
                    }
                }
            };

            request({
                url: app.$remote('/'),
                formData: formData,
                method: 'post'
            }, function (err, body) {
                expect(body).toEqual('ok');
                stop();
            });

        });
    });

    it('text', function (done) {
        server(done, function (app, stop) {

            app.post('/', function (req, res) {
                expect(req.headers['content-type']).toEqual('application/json');
                expect(req.body.a).toEqual(1);
                expect(req.body.b).toEqual('2');
                res.send('ok');
            });

            var json = {
                a: 1,
                b: '2'
            };
            request({
                url: app.$remote('/'),
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(json),
                method: 'post'
            }, function (err, body) {
                expect(body).toEqual('ok');
                stop();
            });

        });
    });

    it('object', function (done) {
        server(done, function (app, stop) {

            app.post('/', function (req, res) {
                expect(req.headers['content-type']).toEqual('application/json');
                expect(req.body.a).toEqual(1);
                expect(req.body.b).toEqual('2');
                res.send('ok');
            });

            var json = {
                a: 1,
                b: '2'
            };
            request({
                url: app.$remote('/'),
                headers: {
                    'content-type': 'application/json'
                },
                body: json,
                method: 'post'
            }, function (err, body) {
                expect(body).toEqual('ok');
                stop();
            });

        });
    });

});







