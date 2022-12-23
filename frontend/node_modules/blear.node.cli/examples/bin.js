/**
 * 文件描述
 * @author ydr.me
 * @create 2018-08-17 11:28
 * @update 2018-08-17 11:28
 */


'use strict';

var cli = require('../src/index');
var console = require('blear.node.console');

cli
    // .command()
    // .versioning()
    // .helper()
    // .action(function () {
    //     console.log('root command action');
    // })
    // .command('get')
    // .option('url', {
    //     alias: 'u',
    //     description: 'url 地址'
    // })
    // .action(function (args, params) {
    //     console.log('get command');
    //     console.log('args', args);
    //     console.log('params', params);
    // })
    // .command('xyz')
    .guess(function (command) {
        console.log('guess command');
        console.log('command', command);
    })
    .parse({
        bin: 'bbb',
        package: {
            name: 'blear.ui',
            version: '1.0.0'
        }
    });


