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

var options = {
    bin: 'bin',
    package: {
        name: 'bin',
        version: '1.2.3'
    }
};

describe('error', function () {

    it('必填', function () {
        var cli = new Cli();
        var fakeConsole = new FakeConsole();

        cli.$$injectConsole$$(fakeConsole);
        cli
            .command()
            .option('opt1', {
                type: 'string',
                required: true
            })
            .error(function (key, args, option, method) {
                fakeConsole.log(key, args[key] === '');
            })
            .parse(argv('--opt1'), options);
        console.log(fakeConsole.get());
        expect(fakeConsole.get()).toEqual('opt1 true\n');
    });

});

