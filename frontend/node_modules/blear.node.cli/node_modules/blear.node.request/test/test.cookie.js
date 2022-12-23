/**
 * 单元测试 basic
 * @author 云淡然
 * @create 2018年09月30日09:29:55
 */


var expect = require('chai-jasmine').expect;
var server = require('./sever');
var request = require('../src/index');

describe('cookie', function () {

    it('get', function (done) {
        server(done, function (app, stop) {

            app.get('/', function (req, res) {
                expect(req.headers.cookie).toEqual('a=1');
                res.send('ok');
            });

            var cookies = {
                a: 1
            };

            request({
                url: app.$remote('/'),
                cookies: cookies
            }, function (err, body) {
                expect(body).toEqual('ok');
                stop();
            });

        });
    });

    it('set', function (done) {
        server(done, function (app, stop) {

            app.get('/', function (req, res) {
                res.cookie('b', 2);
                res.cookie('c', 3);
                res.send('ok');
            });

            request({
                url: app.$remote('/')
            }, function (err, body, res) {
                expect(body).toEqual('ok');
                expect(res.cookies.length).toBe(2);
                expect(res.cookies[0].key).toBe('b');
                expect(res.cookies[0].val).toBe('2');
                expect(res.cookies[0].path).toBe('/');
                expect(res.cookies[1].key).toBe('c');
                expect(res.cookies[1].val).toBe('3');
                expect(res.cookies[1].path).toBe('/');
                stop();
            });

        });
    });

});







