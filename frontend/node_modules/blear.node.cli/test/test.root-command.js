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

describe('root-command', function () {

    it('no action', function () {
        var cli = new Cli();
        var fakeConsole = new FakeConsole();

        cli.$$injectConsole$$(fakeConsole);
        cli
            .command()
            .parse(argv(), options);
        console.log(fakeConsole.get());
        expect(fakeConsole.get()).toEqual('the root command does nothing\n');
    });

    it('default', function () {
        var cli = new Cli();
        var fakeConsole = new FakeConsole();

        cli.$$injectConsole$$(fakeConsole);
        cli
            .command()
            .parse(argv(), options);
        console.log(fakeConsole.get());
    });

    it('help', function () {
        var cli = new Cli();
        var fakeConsole = new FakeConsole();

        cli.$$injectConsole$$(fakeConsole);
        cli
            .command()
            .action(function () {
                cli.help();
            })
            .parse(argv(), options);
        console.log(fakeConsole.get());
    });

    it('helper', function () {
        var cli = new Cli();
        var fakeConsole = new FakeConsole();

        cli.$$injectConsole$$(fakeConsole);
        cli
            .command()
            .helper()
            .parse(argv(), options);
        console.log(fakeConsole.get());
    });

    it('helper + action', function () {
        var cli = new Cli();
        var fakeConsole = new FakeConsole();

        cli.$$injectConsole$$(fakeConsole);
        cli
            .command()
            .helper()
            .action(function () {
                cli.help();
            })
            .parse(argv(), options);
        console.log(fakeConsole.get());
    });

    it('helper assgin + action', function () {
        var cli = new Cli();
        var fakeConsole = new FakeConsole();

        cli.$$injectConsole$$(fakeConsole);
        cli
            .command()
            .helper('help message')
            .action(function () {
                cli.help();
            })
            .parse(argv(), options);
        console.log(fakeConsole.get());
    });

    it('option + helper assgin + action', function () {
        var cli = new Cli();
        var fakeConsole = new FakeConsole();

        cli.$$injectConsole$$(fakeConsole);
        cli
            .command()
            .helper('help message')
            .option('abc')
            .option('def', 'DEF')
            .option('xyz', {
                description: 'XYZ'
            })
            .parse(argv(), options);
        console.log(fakeConsole.get());
    });

});


