/**
 * 文件描述
 * @author ydr.me
 * @create 2018-08-21 07:56
 * @update 2018-08-21 07:56
 */


'use strict';

var Class = require('blear.classes.class');
var util = require('util');
var console = require('blear.node.console');
var access = require('blear.utils.access');
var object = require('blear.utils.object');

var FakeConsole = Class.extend({
    constructor: function () {
        this.output = '';
    },

    /**
     * 获取当前内容
     * @returns {string|*}
     */
    get: function () {
        return this.output;
    },

    /**
     * 清除内容
     */
    clear: function () {
        this.output = '';
    },

    /**
     * 行数
     * @returns {number}
     */
    lines: function () {
        return this.output.split(/\n/g).length;
    },

    print: function () {
        this.output += util.format.apply(util, arguments) + '\n';
    },

    color: function () {
        return util.format.apply(util, arguments);
    },

    colors: {},

    empty: function () {
    },

    pretty: function () {
        var args = access.args(arguments);
        args.pop();
        return util.format.apply(util, args);
    }
});

[
    'log',
    'info',
    'error',
    'warn',
    'logWithTime',
    'infoWithTime',
    'warnWithTime',
    'errorWithTime'
].forEach(function (method) {
    FakeConsole.prototype[method] = FakeConsole.prototype.print;
});

object.each(console.colors, function (color) {
    FakeConsole.prototype.colors[color] = FakeConsole.prototype.color;
});

[
    'loading',
    'loadingEnd'
].forEach(function (method) {
    FakeConsole.prototype[method] = FakeConsole.prototype.empty;
});

module.exports = FakeConsole;
