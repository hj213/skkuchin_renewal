/**
 * 单元测试 basic
 * @author 云淡然
 * @create 2018年09月30日09:29:55
 */


var expect = require('chai-jasmine').expect;
var server = require('./sever');
var request = require('../src/index');

describe('pipe', function () {

    it('from', function (done) {
        server(done, function (app, stop) {

            app.post('/', function (req, res) {
                res.send('ok');
            });

            var fs = require('fs');
            var path = require('path');
            var rs = fs.createReadStream(path.join(__dirname, 'mocha.opts'));

            rs.pipe(
                request({
                    url: app.$remote('/'),
                    method: 'post'
                }, function (err, body) {
                    expect(body).toEqual('ok');
                    stop();
                })
            );

        });
    });

    it('to', function (done) {
        server(done, function (app, stop) {

            app.post('/', function (req, res) {
                res.send('ok');
            });

            var fs = require('fs');
            var path = require('path');
            var filename = Date.now() + '.txt';
            var file = path.join(__dirname, filename);
            fs.writeFileSync(file);
            var ws = fs.createWriteStream(file);

            request({
                url: app.$remote('/'),
                method: 'post'
            }).pipe(ws).on('close', function () {
                var data = fs.readFileSync(file, 'utf8');
                fs.unlinkSync(file);
                expect(data).toEqual('ok');
                stop();
            });

        });
    });

});







