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

describe('args', function () {

    it('字符串 可填', function (done) {
        var cli = new Cli();

        cli
            .command()
            .option('opt1', {
                type: 'string'
            })
            .option('opt2', {
                type: 'string'
            })
            .option('opt3', {
                type: 'string'
            })
            .action(function (args) {
                console.log('args');
                console.log(args);
                expect(args.opt1).toBe('1');
                expect(args.opt2).toBe('');
                expect(args.opt3).toBe('');
                done();
            })
            .parse(argv('--opt1', '1', '--opt2'), options);
    });

    it('字符串 必填', function () {
        var cli = new Cli();
        var fakeConsole = new FakeConsole();
        var called = false;

        cli.$$injectConsole$$(fakeConsole);
        cli
            .command()
            .option('opt1', {
                type: 'string'
            })
            .option('opt2', {
                type: 'string',
                required: true
            })
            .option('opt3', {
                type: 'string',
                required: true,
                message: 'opt3 字段必填'
            })
            .action(function (args) {
                called = true;
            });

        cli.parse(argv('--opt1', '1', '--opt2'), options);
        console.log(fakeConsole.get());
        expect(called).toBe(false);
        expect(fakeConsole.get()).toBe('`opt2` parameter cannot be empty\n');

        fakeConsole.clear();
        cli.parse(argv('--opt1', '1', '--opt2', '2'), options);
        console.log(fakeConsole.get());
        expect(fakeConsole.get()).toBe('opt3 字段必填\n');
    });

    it('method options', function () {
        var cli = new Cli();
        var fakeConsole = new FakeConsole();
        var called = false;

        cli.$$injectConsole$$(fakeConsole);
        cli
            .command()
            .command('cmd1')
            .option('opt1', {
                type: 'string'
            })
            .method('method1')
            .option('opt2', {
                type: 'string',
                required: true
            })
            .action(function (args) {
                called = true;
            });

        cli.parse(argv('cmd1', 'method1', '--opt2'), options);
        console.log(fakeConsole.get());
        expect(called).toBe(false);
        expect(fakeConsole.get()).toBe('`opt2` parameter cannot be empty\n');
    });

    it('多个 option', function () {
        var cli = new Cli();
        var fakeConsole = new FakeConsole();
        var called = false;

        cli.$$injectConsole$$(fakeConsole);
        cli
            .command()
            .option('opt1', {
                type: 'string',
                required: true
            })
            .option('opt2', {
                type: 'string',
                required: true
            })
            .action(function (args) {
                called = true;
            });

        cli.parse(argv(), options);
        console.log(fakeConsole.get());
        expect(called).toBe(false);
        expect(fakeConsole.get()).toBe('`opt1` parameter cannot be empty\n');
    });

    it('布尔类型', function (done) {
        var cli = new Cli();
        var fakeConsole = new FakeConsole();

        cli.$$injectConsole$$(fakeConsole);
        cli
            .command()
            .option('opt1', {
                required: true,
                type: 'boolean'
            })
            .option('opt2', {
                required: true,
                type: 'boolean'
            })
            .action(function (args) {
                console.log(args);
                expect(args.opt1).toBe(true);
                expect(args.opt2).toBe(true);
                done();
            });
        cli.parse(argv('--opt1', 'abc', '--opt2'), options);
    });

    it('数组类型', function (done) {
        var cli = new Cli();
        var fakeConsole = new FakeConsole();

        cli.$$injectConsole$$(fakeConsole);
        cli
            .command()
            .option('opt1', {
                type: 'array'
            })
            .action(function (args) {
                console.log(args);
                expect(args.opt1).toEqual([]);
                done();
            });
        cli.parse(argv(), options);
    });

    it('数组类型：1参0值', function (done) {
        var cli = new Cli();
        var fakeConsole = new FakeConsole();

        cli.$$injectConsole$$(fakeConsole);
        cli
            .command()
            .option('opt1', {
                type: 'array'
            })
            .action(function (args) {
                console.log(args);
                expect(args.opt1).toEqual([]);
                done();
            });
        cli.parse(argv('--opt1'), options);
    });

    it('数组类型：1参1值', function (done) {
        var cli = new Cli();
        var fakeConsole = new FakeConsole();

        cli.$$injectConsole$$(fakeConsole);
        cli
            .command()
            .option('opt1', {
                type: 'array'
            })
            .action(function (args) {
                console.log(args);
                expect(args.opt1).toEqual(['xxx']);
                done();
            });
        cli.parse(argv('--opt1', 'xxx'), options);
    });

    it('数组类型：多参多值', function (done) {
        var cli = new Cli();
        var fakeConsole = new FakeConsole();

        cli.$$injectConsole$$(fakeConsole);
        cli
            .command()
            .option('opt1', {
                type: 'array'
            })
            .action(function (args) {
                console.log(args);
                expect(args.opt1).toEqual(['abc', 'def']);
                done();
            });
        cli.parse(argv('--opt1', 'abc', '--opt1', 'def'), options);
    });

    it('多参值', function (done) {
        var cli = new Cli();
        var fakeConsole = new FakeConsole();

        cli.$$injectConsole$$(fakeConsole);
        cli
            .command()
            .option('opt1')
            .action(function (args) {
                console.log(args);
                expect(args.opt1).toEqual('abc');
                done();
            });
        cli.parse(argv('--opt1', 'abc', '--opt1', 'def'), options);
    });

    it('布尔值转字符串', function (done) {
        var cli = new Cli();
        var fakeConsole = new FakeConsole();

        cli.$$injectConsole$$(fakeConsole);
        cli
            .command()
            .option('opt1', {
                type: 'string',
                default: '0'
            })
            .action(function (args) {
                console.log(args);
                expect(args.opt1).toEqual('0');
                done();
            });
        cli.parse(argv('--opt1'), options);
    });

    it('布尔值转数组', function (done) {
        var cli = new Cli();
        var fakeConsole = new FakeConsole();

        cli.$$injectConsole$$(fakeConsole);
        cli
            .command()
            .option('opt1', {
                type: 'array',
                default: ['0']
            })
            .action(function (args) {
                console.log(args);
                expect(args.opt1).toEqual(['0']);
                done();
            });
        cli.parse(argv('--opt1'), options);
    });

});

