/**
 * test guess
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

describe('guess', function () {

    it('command', function (done) {
        var cli = new Cli();
        var fakeConsole = new FakeConsole();
        var banner = Date.now() + '.' + Math.random();

        cli.$$injectConsole$$(fakeConsole);
        cli
            .banner(banner)
            .command()
            .guess(function (command, args, params) {
                expect(this).toBe(cli);
                expect(command).toBe('abc');
                expect(fakeConsole.get()).toEqual('');
                expect(args.a).toEqual(true);
                expect(args.b).toEqual(true);
                expect(args.def).toEqual('1');
                expect(params).toEqual(['def', 'ghi']);
                done();
            })
            .parse(argv('abc', 'def', 'ghi', '-ab', '--def=1'), options);
    });

});

