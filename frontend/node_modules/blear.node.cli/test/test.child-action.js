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

describe('child-action', function () {

    it('default', function (done) {
        var cli = new Cli();
        var fakeConsole = new FakeConsole();

        cli.$$injectConsole$$(fakeConsole);
        cli
            .command()
            .command('abc')
            .action(function (args, params) {
                expect(args).toEqual({});
                expect(params).toEqual([]);
                done();
            })
            .parse(argv('abc', '--def'), options);
        console.log(fakeConsole.get());
    });

    it('option', function (done) {
        var cli = new Cli();
        var fakeConsole = new FakeConsole();

        cli.$$injectConsole$$(fakeConsole);
        cli
            .command()
            .command('abc')
            .option('abc')
            .action(function (args, params) {
                expect(args.abc).toEqual('abc');
                expect(params).toEqual([]);
                done();
            })
            .parse(argv('abc', '--abc', 'abc'), options);
        console.log(fakeConsole.get());
    });

    it('option + method', function (done) {
        var cli = new Cli();
        var fakeConsole = new FakeConsole();

        cli.$$injectConsole$$(fakeConsole);
        cli
            .command()
            .command('abc')
            .option('abc')
            .method('abc')
            .action(function (args, params) {
                expect(args.abc).toEqual('abc');
                expect(params).toEqual(['abc']);
                done();
            })
            .parse(argv('abc', '--abc', 'abc', 'abc'), options);
        console.log(fakeConsole.get());
    });

    it('option + method + parmas', function (done) {
        var cli = new Cli();
        var fakeConsole = new FakeConsole();

        cli.$$injectConsole$$(fakeConsole);
        cli
            .command()
            .command('abc')
            .option('abc')
            .method('abc')
            .action(function (args, params) {
                expect(args.abc).toEqual('abc');
                expect(params).toEqual(['abc', 'abc']);
                done();
            })
            .parse(argv('abc', '--abc', 'abc', 'abc', 'abc'), options);
        console.log(fakeConsole.get());
    });

    it('method action', function (done) {
        var cli = new Cli();
        var fakeConsole = new FakeConsole();

        cli.$$injectConsole$$(fakeConsole);
        cli
            .command()
            .command('abc')
            .option('abc')
            .action(function (args, params) {

            })
            .method('abc')
            .action(function (args, params) {
                expect(args.abc).toEqual('abc');
                expect(params).toEqual(['abc', 'abc']);
                done();
            })
            .parse(argv('abc', '--abc', 'abc', 'abc', 'abc'), options);
        console.log(fakeConsole.get());
    });

    it('multiple method action', function (done) {
        var cli = new Cli();
        var fakeConsole = new FakeConsole();

        cli.$$injectConsole$$(fakeConsole);
        cli
            .command()
            .command('abc')
            .option('abc')
            .action(function (args, params) {

            })
            .method('abc')
            .method('def')
            .action(function (args, params) {
                expect(args.abc).toEqual('abc');
                expect(params).toEqual(['def', 'abc']);
                done();
            })
            .parse(argv('abc', '--abc', 'abc', 'def', 'abc'), options);
        console.log(fakeConsole.get());
    });

});


