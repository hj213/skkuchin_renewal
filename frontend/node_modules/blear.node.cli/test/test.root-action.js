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

describe('root-action', function () {

    it('hit a option', function (done) {
        var cli = new Cli();
        var fakeConsole = new FakeConsole();

        cli.$$injectConsole$$(fakeConsole);
        cli
            .command()
            .option('abc')
            .option('qwe')
            .option('xyz')
            .action(function (args, parmas) {
                expect(arguments.length).toBe(2);
                expect(args.abc).toBe('人生');
                expect(args.qwe).toBe('');
                expect(args.xyz).toBe('');
                expect(parmas).toEqual([]);
                done();
            })
            .parse(argv('--abc', '人生'), options);
        console.log(fakeConsole.get());
    });

});


