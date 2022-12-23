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

describe('child-command', function () {

    it('no action', function () {
        var cli = new Cli();
        var fakeConsole = new FakeConsole();

        cli.$$injectConsole$$(fakeConsole);
        cli
            .command()
            .command('abc')
            .parse(argv('abc'), options);
        console.log(fakeConsole.get());
        expect(fakeConsole.get()).toEqual('the `abc` command does nothing\n');
    });

    it('one command', function () {
        var cli = new Cli();
        var fakeConsole = new FakeConsole();

        cli.$$injectConsole$$(fakeConsole);
        cli
            .command()
            .command('abc')
            .parse(argv(), options);
        console.log(fakeConsole.get());
    });

    it('multiple commands', function () {
        var cli = new Cli();
        var fakeConsole = new FakeConsole();

        cli.$$injectConsole$$(fakeConsole);
        cli
            .command()
            .command('abc')
            .command('def', 'DEF')
            .parse(argv(), options);
        console.log(fakeConsole.get());
    });

});


