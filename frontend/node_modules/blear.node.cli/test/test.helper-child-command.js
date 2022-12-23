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

describe('helper-child-command', function () {

    it('none', function () {
        var cli = new Cli();
        var fakeConsole = new FakeConsole();
        var rules = [
            /^$/
        ];

        cli.$$injectConsole$$(fakeConsole);
        cli
            .command()
            .action(function () {

            })
            .command('abc');

        cli.parse(argv('--help'), options);
        console.log(fakeConsole.get());
        matchHelper(fakeConsole, rules);
        cli.parse(argv('-h'), options);
        matchHelper(fakeConsole, rules);
        cli.parse(argv('-H'), options);
        matchHelper(fakeConsole, rules);
    });

    it('基本用法', function () {
        var cli = new Cli();
        var fakeConsole = new FakeConsole();
        var rules = [
            /^\s{2}Command:\s*$/,
            /^\s{2}abc\s*$/,
            /^$/,
            /^\s{2}Option:\s*$/,
            /^\s{2}--help, -h, -H\s+print help information$/
        ];

        cli.$$injectConsole$$(fakeConsole);
        cli
            .command()
            .command('abc')
            .helper();

        cli.parse(argv('--help', 'abc'), options);
        console.log(fakeConsole.get());
        matchHelper(fakeConsole, rules);
        cli.parse(argv('-h', 'abc'), options);
        matchHelper(fakeConsole, rules);
        cli.parse(argv('-H', 'abc'), options);
        matchHelper(fakeConsole, rules);
    });

    it('基本用法 + 描述', function () {
        var cli = new Cli();
        var fakeConsole = new FakeConsole();
        var rules = [
            /^\s{2}Command:\s*$/,
            /^\s{2}abc\s*xyz$/,
            /^$/,
            /^\s{2}Option:\s*$/,
            /^\s{2}--help, -h, -H\s+print help information$/
        ];

        cli.$$injectConsole$$(fakeConsole);
        cli
            .command()
            .command('abc', 'xyz')
            .helper();

        cli.parse(argv('--help', 'abc'), options);
        console.log(fakeConsole.get());
        matchHelper(fakeConsole, rules);
        cli.parse(argv('-h', 'abc'), options);
        matchHelper(fakeConsole, rules);
        cli.parse(argv('-H', 'abc'), options);
        matchHelper(fakeConsole, rules);
    });

    it('banner', function () {
        var cli = new Cli();
        var fakeConsole = new FakeConsole();
        var rules = [
            /^banner\d+$/,
            /^\s{2}Command:\s*$/,
            /^\s{2}abc\s*$/,
            /^$/,
            /^\s{2}Option:\s*$/,
            /^\s{2}--help, -h, -H\s+print help information$/
        ];
        var banner = 'banner' + Date.now();

        cli.$$injectConsole$$(fakeConsole);
        cli
            .banner(banner)
            .command()
            .command('abc')
            .helper();

        cli.parse(argv('--help', 'abc'), options);
        console.log(fakeConsole.get());
        matchHelper(fakeConsole, rules);
        cli.parse(argv('-h', 'abc'), options);
        matchHelper(fakeConsole, rules);
        cli.parse(argv('-H', 'abc'), options);
        matchHelper(fakeConsole, rules);
    });

    it('单个方法', function () {
        var cli = new Cli();
        var fakeConsole = new FakeConsole();
        var rules = [
            /^banner\d+$/,
            /^\s{2}Command:\s*$/,
            /^\s{2}abc\s*$/,
            /^$/,
            /^\s{2}Method:\s*$/,
            /^\s{2}method1\s*$/,
            /^$/,
            /^\s{2}Option:\s*$/,
            /^\s{2}--help, -h, -H\s+print help information$/
        ];
        var banner = 'banner' + Date.now();

        cli.$$injectConsole$$(fakeConsole);
        cli
            .banner(banner)
            .command()
            .command('abc')
            .helper()
            .method('method1');

        cli.parse(argv('--help', 'abc'), options);
        console.log(fakeConsole.get());
        matchHelper(fakeConsole, rules);
        cli.parse(argv('-h', 'abc'), options);
        matchHelper(fakeConsole, rules);
        cli.parse(argv('-H', 'abc'), options);
        matchHelper(fakeConsole, rules);
    });

    it('多个方法', function () {
        var cli = new Cli();
        var fakeConsole = new FakeConsole();
        var rules = [
            /^banner\d+$/,
            /^\s{2}Command:\s*$/,
            /^\s{2}abc\s*$/,
            /^$/,
            /^\s{2}Methods:\s*$/,
            /^\s{2}method1\s*$/,
            /^\s{2}method2\s*第2个方法$/,
            /^$/,
            /^\s{2}Option:\s*$/,
            /^\s{2}--help, -h, -H\s+print help information$/
        ];
        var banner = 'banner' + Date.now();

        cli.$$injectConsole$$(fakeConsole);
        cli
            .banner(banner)
            .command()
            .command('abc')
            .helper()
            .method('method1')
            .method('method2', '第2个方法');

        cli.parse(argv('--help', 'abc'), options);
        console.log(fakeConsole.get());
        matchHelper(fakeConsole, rules);
        cli.parse(argv('-h', 'abc'), options);
        matchHelper(fakeConsole, rules);
        cli.parse(argv('-H', 'abc'), options);
        matchHelper(fakeConsole, rules);
    });

    it('单个用法', function () {
        var cli = new Cli();
        var fakeConsole = new FakeConsole();
        var rules = [
            /^banner\d+$/,
            /^\s{2}Usage:\s*$/,
            /^\s{2}usage1\s*$/,
            /^$/,
            /^\s{2}Command:\s*$/,
            /^\s{2}abc\s*$/,
            /^$/,
            /^\s{2}Option:\s*$/,
            /^\s{2}--help, -h, -H\s+print help information$/
        ];
        var banner = 'banner' + Date.now();

        cli.$$injectConsole$$(fakeConsole);
        cli
            .banner(banner)
            .command()
            .command('abc')
            .usage('usage1')
            .helper();

        cli.parse(argv('--help', 'abc'), options);
        console.log(fakeConsole.get());
        matchHelper(fakeConsole, rules);
        cli.parse(argv('-h', 'abc'), options);
        matchHelper(fakeConsole, rules);
        cli.parse(argv('-H', 'abc'), options);
        matchHelper(fakeConsole, rules);
    });

    it('多个用法', function () {
        var cli = new Cli();
        var fakeConsole = new FakeConsole();
        var rules = [
            /^banner\d+$/,
            /^\s{2}Usages:\s*$/,
            /^\s{2}usage1\s*$/,
            /^\s{2}usage2\s*第2个用法$/,
            /^$/,
            /^\s{2}Command:\s*$/,
            /^\s{2}abc\s*$/,
            /^$/,
            /^\s{2}Option:\s*$/,
            /^\s{2}--help, -h, -H\s+print help information$/
        ];
        var banner = 'banner' + Date.now();

        cli.$$injectConsole$$(fakeConsole);
        cli
            .banner(banner)
            .command()
            .command('abc')
            .usage('usage1')
            .usage('usage2', '第2个用法')
            .helper();

        cli.parse(argv('--help', 'abc'), options);
        console.log(fakeConsole.get());
        matchHelper(fakeConsole, rules);
        cli.parse(argv('-h', 'abc'), options);
        matchHelper(fakeConsole, rules);
        cli.parse(argv('-H', 'abc'), options);
        matchHelper(fakeConsole, rules);
    });

    it('多个方法 + 多个用法', function () {
        var cli = new Cli();
        var fakeConsole = new FakeConsole();
        var rules = [
            /^banner\d+$/,
            /^\s{2}Usages:\s*$/,
            /^\s{2}usage1\s*$/,
            /^\s{2}usage2\s*第2个用法$/,
            /^$/,
            /^\s{2}Command:\s*$/,
            /^\s{2}abc\s*$/,
            /^$/,
            /^\s{2}Methods:\s*$/,
            /^\s{2}method1\s*$/,
            /^\s{2}method2\s*第2个方法$/,
            /^$/,
            /^\s{2}Option:\s*$/,
            /^\s{2}--help, -h, -H\s+print help information$/
        ];
        var banner = 'banner' + Date.now();

        cli.$$injectConsole$$(fakeConsole);
        cli
            .banner(banner)
            .command()
            .command('abc')
            .usage('usage1')
            .usage('usage2', '第2个用法')
            .method('method1')
            .method('method2', '第2个方法')
            .helper();

        cli.parse(argv('--help', 'abc'), options);
        console.log(fakeConsole.get());
        matchHelper(fakeConsole, rules);
        cli.parse(argv('-h', 'abc'), options);
        matchHelper(fakeConsole, rules);
        cli.parse(argv('-H', 'abc'), options);
        matchHelper(fakeConsole, rules);
    });

    it('多个方法 + 多个用法 + 多个配项', function () {
        var cli = new Cli();
        var fakeConsole = new FakeConsole();
        var rules = [
            /^banner\d+$/,
            /^\s{2}Usages:\s*$/,
            /^\s{2}usage1\s*$/,
            /^\s{2}usage2\s*第2个用法$/,
            /^$/,
            /^\s{2}Command:\s*$/,
            /^\s{2}abc\s*$/,
            /^$/,
            /^\s{2}Methods:\s*$/,
            /^\s{2}method1\s*$/,
            /^\s{2}method2\s*第2个方法$/,
            /^$/,
            /^\s{2}Options:\s*$/,
            /^\s{2}--opt1\s*$/,
            /^\s{2}--opt2\s*第2个配项$/,
            /^\s{2}--help, -h, -H\s+print help information$/,
            /^\s{2}--opt3, -o\s*$/,
            /^\s{2}--opt4, -m, -n, -p\s*$/
        ];
        var banner = 'banner' + Date.now();

        cli.$$injectConsole$$(fakeConsole);
        cli
            .banner(banner)
            .command()
            .command('abc')
            .option('opt1')
            .option('opt2', '第2个配项')
            .helper()
            .option('opt3', {
                alias: 'o'
            })
            .option('opt4', {
                alias: ['m', 'n', 'p']
            })
            .usage('usage1')
            .usage('usage2', '第2个用法')
            .method('method1')
            .method('method2', '第2个方法');

        cli.parse(argv('--help', 'abc'), options);
        console.log(fakeConsole.get());
        matchHelper(fakeConsole, rules);
        cli.parse(argv('-h', 'abc'), options);
        matchHelper(fakeConsole, rules);
        cli.parse(argv('-H', 'abc'), options);
        matchHelper(fakeConsole, rules);
    });

    it('option 在 method 前后', function () {
        var cli = new Cli();
        var fakeConsole = new FakeConsole();
        var rules = [
            /^banner\d+$/,
            /^\s{2}Command:\s*$/,
            /^\s{2}abc\s*$/,
            /^$/,
            /^\s{2}Method:\s*$/,
            /^\s{2}method1\s*$/,
            /^$/,
            /^\s{2}Options:\s*$/,
            /^\s{2}--xyz\s*123$/,
            /^\s{2}--help.*$/
        ];
        var banner = 'banner' + Date.now();

        cli.$$injectConsole$$(fakeConsole);
        cli
            .banner(banner)
            .command()
            .command('abc')
            .option('xyz', '123')
            .helper()
            .method('method1')
            .option('wer', '456');

        cli.parse(argv('--help', 'abc'), options);
        console.log(fakeConsole.get());
        matchHelper(fakeConsole, rules);
        cli.parse(argv('-h', 'abc'), options);
        matchHelper(fakeConsole, rules);
        cli.parse(argv('-H', 'abc'), options);
        matchHelper(fakeConsole, rules);
        cli.parse(argv('-h', 'abc', 'method1'), options);
        console.log(fakeConsole.get());
        rules.push(/^\s{2}--wer\s*456$/);
        matchHelper(fakeConsole, rules);
    });

});

