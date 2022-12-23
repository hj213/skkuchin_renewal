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

describe('exec', function () {

    it('0个参数', function () {
        var cli = new Cli();

        cli
            .command();

        expect(function () {
            cli.exec();
        }).toThrowError('please specify the command to be executed');
    });

    it('1个参数：非字符串', function () {
        var cli = new Cli();

        cli
            .command();

        expect(function () {
            cli.exec(123);
        }).toThrowError('`command` parameter type must be a string');
    });

    it('1个参数：是字符串', function (done) {
        var cli = new Cli();

        cli
            .command()
            .command('123')
            .action(function (args, params) {
                expect(params).toEqual([]);
                expect(args).toEqual({});
                done();
            });

        cli.exec('123');
    });

    it('2个参数：字符串 + 对象', function (done) {
        var cli = new Cli();

        cli
            .command()
            .command('123')
            .option('aaa', {
                alias: 'a'
            })
            .option('bbb')
            .action(function (args, params) {
                expect(params).toEqual([]);
                expect(args.aaa).toEqual('1');
                expect(args.bbb).toEqual('2');
                done();
            });

        cli.exec('123', {
            a: 1,
            bbb: 2
        });
    });

    it('2个参数：字符串 + 数组', function (done) {
        var cli = new Cli();

        cli
            .command()
            .command('123')
            .option('aaa', {
                alias: 'a'
            })
            .option('bbb')
            .action(function (args, params) {
                expect(params).toEqual(['a', 'b']);
                expect(args.aaa).toEqual('');
                expect(args.bbb).toEqual('');
                done();
            });

        cli.exec('123', ['a', 'b']);
    });

    it('2个参数：字符串 + 其他', function () {
        var cli = new Cli();

        cli
            .command();

        expect(function () {
            cli.exec('123', 123);
        }).toThrowError('the second parameter type must be an object or an array');
    });

    it('3个参数：字符串 + 数组 + 对象', function (done) {
        var cli = new Cli();

        cli
            .command()
            .command('abc')
            .option('aaa', {
                alias: 'a'
            })
            .option('bbb')
            .action(function (args, params) {
                expect(args.aaa).toEqual('1');
                expect(args.bbb).toEqual('2');
                expect(params[0]).toEqual('def');
                expect(params[1]).toEqual('ghi');
                done();
            });

        cli.exec('abc', {
            a: 1,
            bbb: 2
        }, ['def', 'ghi']);
    });

});

