/**
 * debug
 * @author ydr.me
 * @create 2015-10-22 10:21
 */


'use strict';

var util = require('util');
var typeis = require('blear.utils.typeis');
var collection = require('blear.utils.collection');
var object = require('blear.utils.object');
var string = require('blear.utils.string');
var allocation = require('blear.utils.access');
var console = require('blear.node.console');


var configs = {
    padding: 20,
    align: 'right',
    separator: ' → ',
    colors: []
};


/**
 * 配置
 * @returns {*}
 */
exports.config = function () {
    return allocation.getSet({
        get: function (key) {
            return configs[key];
        },
        set: function (key, val) {
            configs[key] = val;
        },
        setLength: 2
    }, arguments);
};


var debugFormat = function (colors) {
    return function (name, desc, options) {
        var nameLines = [];

        name = console.format(name);
        desc = console.format(desc);
        options = object.assign({}, configs, options);

        if (name.length > options.padding) {
            while (name.length > options.padding) {
                var temp = name.slice(0, options.padding);
                name = name.slice(options.padding);
                nameLines.push(temp);
            }

            if (name.length) {
                nameLines.push(name);
            }
        } else {
            nameLines = [name];
        }

        var lastName = nameLines[nameLines.length - 1];

        nameLines[nameLines.length - 1] = options.align === 'right' ?
            string.padStart(lastName, options.padding) :
            string.padEnd(lastName, options.padding);
        name = nameLines.join('\n');

        var descLines = desc.split('\n');
        var space = new Array(options.padding + 1 + options.separator.length + 2).join(' ');

        collection.each(descLines, function (index, line) {
            if (index > 0) {
                descLines[index] = space + line;
            }
        });

        desc = descLines.join('\n');
        return console.format(console.pretty(name, ['white', 'bold']),
            console.pretty(options.separator, ['grey']),
            console.pretty(desc, [].concat(colors, options.colors)));
    };
};


/**
 * 打印
 * @param formatter
 * @returns {Function}
 */
var debugPrint = function (formatter) {
    return function () {
        console.log(formatter.apply(global, arguments));
    };
};

/**
 * 输出主要类型消息
 * @type {Function}
 */
exports.primary = debugPrint(debugFormat(['magenta']));


/**
 * 输出成功类型消息
 * @type {Function}
 */
exports.success = exports.info = debugPrint(debugFormat(['green']));


/**
 * 输出警告类型消息
 * @type {Function}
 */
exports.warning = exports.warn = debugPrint(debugFormat(['yellow']));


/**
 * 输出错误类型消息
 * @type {Function}
 */
exports.error = exports.danger = debugPrint(debugFormat(['red']));


/**
 * 输出普通类型消息
 * @type {Function}
 */
exports.normal = debugPrint(debugFormat([]));


/**
 * 输出不紧要类型消息
 * @type {Function}
 */
exports.ignore = debugPrint(debugFormat(['grey']));


/**
 * 等待消息
 * @param name
 * @param desc
 * @param options
 */
exports.wait = function (name, desc, options) {
    console.point(debugFormat()(name, desc, options));
};


/**
 * 等待结束
 * @param name
 * @param desc
 * @param options
 */
exports.waitEnd = function (name, desc, options) {
    console.pointEnd();

    if (name) {
        console.log(debugFormat()(name, desc, options));
    }
};


