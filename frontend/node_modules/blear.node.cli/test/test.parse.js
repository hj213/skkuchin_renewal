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

describe('parse', function () {

    it('un configured command', function () {
        var cli = new Cli();
        var fakeConsole = new FakeConsole();

        cli.$$injectConsole$$(fakeConsole);
        cli
            .command()
            .parse(options);
    });

});
