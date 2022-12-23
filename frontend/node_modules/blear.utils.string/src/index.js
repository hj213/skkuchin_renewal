'use strict';


var array = require('blear.utils.array');
var object = require('blear.utils.object');
var typeis = require('blear.utils.typeis');
var access = require('blear.utils.access');
var json = require('blear.utils.json');


var reHump = /[A-Z]/g;
var reSep = /[-_ ]([a-z])/g;
var reRegExp = /[.*+?^=!:${}()|[\]\/\\-]/g;
var escapeHTMLMap = {
    '&amp;': /&/g,
    '&lt;': /</g,
    '&gt;': />/g,
    '&quot;': /"/g,
    '&apos;': /'/g,
    '&#x2f;': /\//g
};
/**
 * 解码 html 实体符 map
 * @type {Object}
 */
var unescapeHTMLMap = {
    '&': /&amp;/g,
    '<': /&lt;/g,
    '>': /&gt;/g,
    '"': /&quot;/g,
    '\'': /&apos;/g,
    '/': /&#x2f;/g
};
var reEscape = /&#(x)?([\w\d]{0,5});/ig;
var reAssignVarible = /\$\{([^{}]*?)}/g;


/**
 * 字符串的去除两端空白
 * @param str
 * @returns {String}
 */
exports.trim = function (str) {
    return String(str).trim();
};


/**
 * 字符化
 * @param obj
 * @returns {String}
 */
exports.ify = function (obj) {
    if (typeis.Null(obj) || typeis.Undefined(obj)) {
        return '';
    }

    return obj + '';
};


/**
 * 转换分隔符字符串为驼峰形式
 * @param str {String} 分隔符字符串
 * @param [upperCaseFirstChar=false] {Boolean} 是否大写第一个字母
 * @returns {String}
 *
 * @example
 * string.humprize('moz-border-radius');
 * // => "mozBorderRadius"
 */
exports.humprize = function (str, upperCaseFirstChar) {
    if (upperCaseFirstChar) {
        str = str.slice(0, 1).toUpperCase() + str.slice(1);
    }

    return str.replace(reSep, function ($0, $1) {
        return $1.toUpperCase();
    });
};


/**
 * 转换驼峰字符串为分隔符字符串
 * @param str {String} 驼峰字符串
 * @param [separator="-"] {String} 分隔符
 * @param [lowerCaseFirstChar=false] {Boolean} 是否小写第一个字母
 * @returns {string}
 * @example
 * string.separatorize('mozBorderRadius');
 * // => "moz-border-radius"
 */
exports.separatorize = function (str, separator, lowerCaseFirstChar) {
    separator = separator || '-';

    if (lowerCaseFirstChar) {
        str = str.slice(0, 1).toLowerCase() + str.slice(1);
    }

    return str.replace(reHump, function ($0) {
        return separator + $0.toLowerCase();
    });
};


/**
 * 重复生成字符串
 * @param str {String} 待重复字符串
 * @param times {Number} 重复次数
 * @returns {string}
 */
var repeat = exports.repeat = function (str, times) {
    return new Array(times + 1).join(str);
};


/**
 * 字符串左填充
 * @param str {*} 原始字符串
 * @param maxLength {Number} 最大长度
 * @param [char=" "] {string} 填充字符串
 * @returns {String}
 */
var padStart = exports.padStart = function (str, maxLength, char) {
    str = String(str);
    char = String(char || ' ');

    var times = maxLength - str.length;

    if (!times) {
        return str;
    }

    return repeat(char, times) + str;
};


/**
 * 字符串右填充
 * @param str {*} 原始字符串
 * @param maxLength {Number} 最大长度
 * @param [char=" "] {string} 填充字符串
 * @returns {String}
 */
exports.padEnd = function (str, maxLength, char) {
    str = String(str);
    char = String(char || ' ');

    var times = maxLength - str.length;

    if (!times) {
        return str;
    }

    return str + repeat(char, times);
};


/**
 * 编码字符串为 html 实体符
 * @param str
 * @param [all] {boolean} 是否编码所有字符
 * @returns {string|string}
 */
exports.escapeHTML = function (str, all) {
    str = str + '';

    if (!all) {
        object.each(escapeHTMLMap, function (src, reg) {
            str = str.replace(reg, src);
        });

        return str;
    }

    var ret = '';
    var start = 0;
    var length = str.length;

    for (; start < length; start++) {
        var chr = str.charCodeAt(start);
        ret += '&#' + chr + ';'
    }

    return ret;
};


/**
 * 编码字符串为 html 实体符
 * @param str
 * @returns {string|string}
 */
exports.unescapeHTML = function (str) {
    str = str.replace(reEscape, function (full, hex, code) {
        return String.fromCharCode(parseInt(code, hex ? 16 : 10));
    });

    object.each(unescapeHTMLMap, function (to, reg) {
        str = str.replace(reg, to);
    });

    return str;
};


/**
 * 转换正则字符串为合法正则
 * @param str {String} 正则字符串
 * @returns {string}
 */
exports.escapeRegExp = function (str) {
    return str.replace(reRegExp, '\\$&');
};


/**
 * 字符串版本号编辑
 * @param v1 {String} 被比较版本号
 * @param v2 {String} 比较版本号
 * @param [flag=">"] {String} 比较符号
 * @returns {Boolean}
 *
 * @example
 * string.versionThan('3.1.2', '3.1.1', '>');
 * // => true
 */
exports.versionThan = function versionThan(v1, v2, flag) {
    flag = flag || '>';

    var v1Arr = String(v1).split('.');
    var v2Arr = String(v2).split('.');
    var maxLength = Math.max(v1Arr.length, v2Arr.length);

    while (v1Arr.length < maxLength) {
        v1Arr.push('0');
    }
    while (v2Arr.length < maxLength) {
        v2Arr.push('0');
    }

    array.each(v1Arr, function (index) {
        var p1 = v1Arr[index];
        var p2 = v2Arr[index];
        var pLength = Math.max(p1.length, p2.length);
        p1 = padStart(p1, pLength, '0');
        p2 = padStart(p2, pLength, '0');

        v1Arr[index] = p1;
        v2Arr[index] = p2;
    });

    v1 = v1Arr.join('');
    v2 = v2Arr.join('');

    var fn;

    try {
        /* jshint evil: true */
        fn = new Function('return Boolean(' + v1 + flag + v2 + ')');
    } catch (err) {
        fn = new Function('return false');
    }

    return fn();
};


/**
 * 分配字符串，参考 es6
 * @param str {String} 字符串模板
 * @param filter {Function} 过滤函数
 * @returns {String}
 * @example
 * string.assign('Hello ${name}, how are you ${time}?', {
     *     name: 'Bob',
     *     time: 'today'
     * });
 * // => "Hello Bob, how are you today?"
 *
 * string.assign('Hello ${1}, how are you ${2}?', 'Bob', 'today');
 * // => "Hello Bob, how are you today?"
 */
exports.assign = function (str/*arguments*/, filter) {
    var args = access.args(arguments);
    var argL = args.length;
    var data = {};

    if (typeis.Function(args[argL - 1])) {
        filter = args.splice(argL - 1, 1)[0];
    } else {
        filter = function (val) {
            return val;
        };
    }

    // {}
    if (typeis.Object(args[1])) {
        data = args[1];
    }
    // 1, 2...
    else {
        array.each(args.slice(1), function (index, val) {
            data[index + 1] = val;
        });
    }

    return str.replace(reAssignVarible, function ($0, $1) {
        return filter(String(data[$1]));
    });
};


/**
 * 文本化
 * @param str
 * @returns {string}
 */
exports.textify = function (str) {
    return json.stringify({o: str}).replace(/^.*?:"/, '').replace(/"}$/, '');
};
