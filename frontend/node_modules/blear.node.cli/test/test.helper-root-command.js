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
var string = require('blear.utils.string');

var options = {
    bin: 'bin',
    package: {
        name: 'bin',
        version: '1.2.3'
    }
};

describe('helper-root-command', function () {

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

            });

        cli.parse(argv('--help'), options);
        console.log(fakeConsole.get());
        matchHelper(fakeConsole, rules);
        cli.parse(argv('-h'), options);
        matchHelper(fakeConsole, rules);
        cli.parse(argv('-H'), options);
        matchHelper(fakeConsole, rules);
    });

    it('default', function () {
        var cli = new Cli();
        var fakeConsole = new FakeConsole();
        var rules = [
            /^\s{2}Option:\s*$/,
            /^\s{2}--help, -h, -H\s+print help information$/
        ];

        cli.$$injectConsole$$(fakeConsole);
        cli
            .command()
            .helper();

        cli.parse(argv('--help'), options);
        console.log(fakeConsole.get());
        matchHelper(fakeConsole, rules);
        cli.parse(argv('-h'), options);
        matchHelper(fakeConsole, rules);
        cli.parse(argv('-H'), options);
        matchHelper(fakeConsole, rules);
    });

    it('banner', function () {
        var cli = new Cli();
        var fakeConsole = new FakeConsole();
        var rules = [
            /^banner\d+$/,
            /^\s{2}Option:\s*$/,
            /^\s{2}--help, -h, -H\s+print help information$/
        ];
        var banner = 'banner' + Date.now();

        cli.$$injectConsole$$(fakeConsole);
        cli
            .banner(banner)
            .command()
            .helper();

        cli.parse(argv('--help'), options);
        console.log(fakeConsole.get());
        matchHelper(fakeConsole, rules);
        cli.parse(argv('-h'), options);
        matchHelper(fakeConsole, rules);
        cli.parse(argv('-H'), options);
        matchHelper(fakeConsole, rules);
    });

    it('describe', function () {
        var cli = new Cli();
        var fakeConsole = new FakeConsole();
        var rules = [
            /^\s{2}Option:\s*$/,
            /^\s{2}--help, -h, -H\s+你好，这是帮助信息$/
        ];

        cli.$$injectConsole$$(fakeConsole);
        cli
            .command()
            .helper('你好，这是帮助信息');

        cli.parse(argv('--help'), options);
        console.log(fakeConsole.get());
        matchHelper(fakeConsole, rules);
        cli.parse(argv('-h'), options);
        matchHelper(fakeConsole, rules);
        cli.parse(argv('-H'), options);
        matchHelper(fakeConsole, rules);
    });

    it('one usage', function () {
        var cli = new Cli();
        var fakeConsole = new FakeConsole();

        cli.$$injectConsole$$(fakeConsole);
        cli
            .command()
            .usage('abc def')
            .helper('你好，这是帮助信息');

        var rules = [
            /^\s{2}Usage:\s*$/,
            /^\s{2}abc def\s*$/,
            /^$/,
            /^\s{2}Option:\s*$/,
            /^\s{2}--help, -h, -H\s+你好，这是帮助信息$/
        ];

        cli.parse(argv('--help'), options);
        console.log(fakeConsole.get());
        matchHelper(fakeConsole, rules);
        cli.parse(argv('-h'), options);
        matchHelper(fakeConsole, rules);
        cli.parse(argv('-H'), options);
        matchHelper(fakeConsole, rules);
    });

    it('mutiple usage', function () {
        var cli = new Cli();
        var fakeConsole = new FakeConsole();

        cli.$$injectConsole$$(fakeConsole);
        cli
            .command()
            .usage('abc')
            .usage('def', 'ghi')
            .helper('你好，这是帮助信息');

        var rules = [
            /^\s{2}Usages:\s*$/,
            /^\s{2}abc\s*$/,
            /^\s{2}def\s*ghi$/,
            /^$/,
            /^\s{2}Option:\s*$/,
            /^\s{2}--help, -h, -H\s+你好，这是帮助信息$/
        ];

        cli.parse(argv('--help'), options);
        console.log(fakeConsole.get());
        matchHelper(fakeConsole, rules);
        cli.parse(argv('-h'), options);
        matchHelper(fakeConsole, rules);
        cli.parse(argv('-H'), options);
        matchHelper(fakeConsole, rules);
    });

    it('mutiple option', function () {
        var cli = new Cli();
        var fakeConsole = new FakeConsole();

        cli.$$injectConsole$$(fakeConsole);
        cli
            .command()
            .option('abc')
            .option('def', 'ghi')
            .helper('你好，这是帮助信息');

        var rules = [
            /^\s{2}Options:\s*$/,
            /^\s{2}--abc\s*$/,
            /^\s{2}--def\s+ghi$/,
            /^\s{2}--help, -h, -H\s+你好，这是帮助信息$/
        ];

        cli.parse(argv('--help'), options);
        console.log(fakeConsole.get());
        matchHelper(fakeConsole, rules);
        cli.parse(argv('-h'), options);
        matchHelper(fakeConsole, rules);
        cli.parse(argv('-H'), options);
        matchHelper(fakeConsole, rules);
    });

    it('mutiple usage + mutiple option', function () {
        var cli = new Cli();
        var fakeConsole = new FakeConsole();

        cli.$$injectConsole$$(fakeConsole);
        cli
            .command()
            .usage('abc')
            .usage('qwe', 'bnm')
            .option('abc')
            .option('def', 'ghi')
            .helper('你好，这是帮助信息');

        var rules = [
            /^\s{2}Usages:\s*$/,
            /^\s{2}abc\s*$/,
            /^\s{2}qwe\s+bnm$/,
            /^$/,
            /^\s{2}Options:\s*$/,
            /^\s{2}--abc\s*$/,
            /^\s{2}--def\s+ghi$/,
            /^\s{2}--help, -h, -H\s+你好，这是帮助信息$/
        ];

        cli.parse(argv('--help'), options);
        console.log(fakeConsole.get());
        matchHelper(fakeConsole, rules);
        cli.parse(argv('-h'), options);
        matchHelper(fakeConsole, rules);
        cli.parse(argv('-H'), options);
        matchHelper(fakeConsole, rules);
    });

    it('key 过长', function () {
        var cli = new Cli();
        var fakeConsole = new FakeConsole();

        cli.$$injectConsole$$(fakeConsole);
        cli
            .command()
            .usage(longStr('a'), longStr('b'))
            .usage(longStr('c'), longStr('d'))
            .option(longStr('e'), longStr('f'))
            .helper();

        var rules = [
            /^\s{2}Usages:\s*$/,
            /^\s{2}a+$/,
            /^\s{2}\s+b+$/,
            /^\s{2}c+$/,
            /^\s{2}\s+d+$/,
            /^$/,
            /^\s{2}Options:\s*$/,
            /^\s{2}--e+\s*$/,
            /^\s+f+$/,
            /^\s{2}--help, -h, -H\s+print help information$/
        ];

        cli.parse(argv('--help'), options);
        console.log(fakeConsole.get());
        matchHelper(fakeConsole, rules);
    });

});


function longStr(str) {
    return string.repeat(str, Math.round(Math.random() * 100 + Cli.defaults.breakLength));
}

