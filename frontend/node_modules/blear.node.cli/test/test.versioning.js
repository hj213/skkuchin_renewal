/**
 * 文件描述
 * @author ydr.me
 * @create 2018-08-20 14:51
 * @update 2018-08-20 14:51
 */


'use strict';

var Cli = require('../src/cli.class');
var argv = require('./argv');
var FakeConsole = require('./fake-console.class');
var matchHelper = require('./match-helper');

var options = {
    bin: 'bin',
    package: {
        name: 'bin',
        version: '1.2.3'
    }
};

describe('versioning', function () {

    it('not-found', function (done) {
        var cli = new Cli();
        var fakeConsole = new FakeConsole();

        cli.$$injectConsole$$(fakeConsole);
        cli
            .command()
            .versioning()
            .parse(argv('-v'), {
                package: {
                    name: randomStr(),
                    version: '1.2.3'
                }
            });

        setTimeout(function () {
            console.log(fakeConsole.get());
            done();
        }, 2000);
    });

    it('update available', function (done) {
        var cli = new Cli();
        var fakeConsole = new FakeConsole();

        cli.$$injectConsole$$(fakeConsole);
        cli
            .command()
            .versioning()
            .parse(argv('-v'), {
                package: {
                    name: 'blear.ui',
                    version: '1.0.0'
                }
            });

        setTimeout(function () {
            console.log(fakeConsole.get());
            done();
        }, 2000);
    });

    it('update up to date', function (done) {
        var cli = new Cli();
        var fakeConsole = new FakeConsole();

        cli.$$injectConsole$$(fakeConsole);
        cli
            .command()
            .versioning()
            .parse(argv('-v'), {
                package: {
                    name: 'hei',
                    version: '1.0.0'
                }
            });

        setTimeout(function () {
            console.log(fakeConsole.get());
            done();
        }, 2000);
    });

});


function randomStr() {
    return Math.random().toString(16).slice(2) + Date.now();
}
