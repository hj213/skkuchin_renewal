/**
 * Node 控制台
 * @author ydr.me
 * @create 2015-12-10 21:35
 */


'use strict';

var util = require('util');
var access = require('blear.utils.access');
var collection = require('blear.utils.collection');
var object = require('blear.utils.object');
var typeis = require('blear.utils.typeis');
var date = require('blear.utils.date');
var array = require('blear.utils.array');
var stripAnsi = require('strip-ansi');
var wcwidth = require('wcwidth');


var colorCodes = {
    bold: [1, 22],
    dim: [2, 22],
    italic: [3, 23],
    underline: [4, 24],
    inverse: [7, 27],
    hidden: [8, 28],
    strikethrough: [9, 29],

    black: [30, 39],
    red: [31, 39],
    green: [32, 39],
    yellow: [33, 39],
    blue: [94, 39],
    magenta: [35, 39],
    cyan: [36, 39],
    white: [37, 39],
    gray: [90, 39],
    grey: [90, 39],

    bgBlack: [40, 49],
    bgRed: [41, 49],
    bgGreen: [42, 49],
    bgYellow: [43, 49],
    bgBlue: [44, 49],
    bgMagenta: [45, 49],
    bgCyan: [46, 49],
    bgWhite: [47, 49],

    // legacy styles for colors pre v1.0.0
    blackBG: [40, 49],
    redBG: [41, 49],
    greenBG: [42, 49],
    yellowBG: [43, 49],
    blueBG: [44, 49],
    magentaBG: [45, 49],
    cyanBG: [46, 49],
    whiteBG: [47, 49]

};


/**********************************************
 pretty
 **********************************************/
/**
 * 格式错误对象
 * @param err
 * @returns {*}
 */
var formatError = function (err) {
    var msg = err.stack || err.message || String(err);
    var name = err.name || 'Error';

    collection.each(err, function (key, val) {
        msg += '\n' + name + '.' + key + ': ' + format(val);
    });

    return msg;
};


/**
 * 格式化
 * @param obj
 * @returns {*}
 */
var format = function (obj) {
    if (typeis.String(obj)) {
        return obj;
    }

    if (obj && obj instanceof Error) {
        return formatError(obj);
    }

    try {
        return util.inspect(obj, {
            depth: 3,
            colors: false,
            showHidden: false
        });
    } catch (err) {
        /* istanbul ignore next */
        return formatError(err);
    }
};


/**********************************************
 colors
 **********************************************/
/**
 * 颜色包装器
 * @param color
 * @returns {Function}
 */
var makeColor = function (color) {
    return function () {
        var msg = consoleFormat.apply(null, arguments);

        if (!color) {
            return msg;
        }

        var args = [];

        args.push('\x1b[' + colorCodes[color][0] + 'm%s\x1b[' + colorCodes[color][1] + 'm');
        args.push(msg);

        return consoleFormat.apply(null, args);
    };
};

exports.colors = {
    // forcecolor
    black: makeColor('black'),
    red: makeColor('red'),
    grey: makeColor('grey'),
    cyan: makeColor('cyan'),
    green: makeColor('green'),
    blue: makeColor('blue'),
    yellow: makeColor('yellow'),
    inverse: makeColor('inverse'),
    magenta: makeColor('magenta'),

    // backcolor
    bgBlack: makeColor('bgBlack'),
    blackBG: makeColor('blackBG'),
    bgRed: makeColor('bgRed'),
    redBG: makeColor('redBG'),
    bgGreen: makeColor('bgGreen'),
    greenBG: makeColor('greenBG'),
    bgYellow: makeColor('bgYellow'),
    yellowBG: makeColor('yellowBG'),
    bgBlue: makeColor('bgBlue'),
    blueBG: makeColor('blueBG'),
    bgMagenta: makeColor('bgMagenta'),
    magentaBG: makeColor('magentaBG'),
    bgCyan: makeColor('bgCyan'),
    cyanBG: makeColor('cyanBG'),
    bgWhite: makeColor('bgWhite'),
    whiteBG: makeColor('whiteBG'),

    // stylecolor
    bold: makeColor('bold'),
    dim: makeColor('dim'),
    italic: makeColor('italic'),
    underline: makeColor('underline'),
    hidden: makeColor('hidden'),
    original: makeColor()
};


/**********************************************
 styles
 **********************************************/
/**
 * 格式化
 * @returns {string}
 */
var consoleFormat = exports.format = function (/*arguments*/) {
    return util.format.apply(util, arguments);
};


/**
 * 输出美化
 * @param _out
 * @param _colors {Array}
 * @returns {String}
 */
var consolePretty = exports.pretty = function (_out/*arguments*/, _colors) {
    var args = access.args(arguments);
    var colors = args.pop();
    var out = consoleFormat.apply(null, args);

    colors = typeis.Array(colors) ? colors : [colors];

    collection.each(colors, function (index, color) {
        color = String(color);

        if (typeis.Function(exports.colors[color])) {
            out = exports.colors[color](out);
        }
    });

    return out;
};


/**********************************************
 out
 **********************************************/
var configs = {
    // 是否颜色输出
    // PM2 环境不建议输出颜色，否则日志文件内有很多颜色代码
    colorful: true,
    // 日志级别
    // 生产环境建议只打印出 warn、error 日志
    level: [
        'log',
        'info',
        'warn',
        'error'
    ],
    timePrefix: 'YYYY-MM-DD HH:mm:ss.SSS',
    timeColors: ['cyan', 'bold'],
    logColors: [],
    infoColors: ['green', 'bold'],
    warnColors: ['yellow', 'bold'],
    errorColors: ['red', 'bold']
};


// 配置之后
var afterConfigSet = function () {
    configs._levelMap = array.reduce(configs.level, function (prev, now) {
        prev[now] = true;
        return prev;
    }, {});
    configs._timeColors = configs.colorful ? configs.timeColors : [];
    configs._logColors = configs.colorful ? configs.logColors : [];
    configs._infoColors = configs.colorful ? configs.infoColors : [];
    configs._warnColors = configs.colorful ? configs.warnColors : [];
    configs._errorColors = configs.colorful ? configs.errorColors : [];
};


/**
 * 配置
 * @returns {*}
 */
exports.config = function () {
    return access.getSet({
        get: function (key) {
            return configs[key];
        },
        set: function (key, val) {
            configs[key] = val;
            afterConfigSet();
        },
        setLength: 2
    }, arguments);
};
afterConfigSet();


/**
 * 打印日志
 * @param msg
 */
var printOut = function (msg) {
    process.stdout.write(msg + '\n');
};


var printWrap = function (args, colors) {
    var msg = consoleFormat.apply(null, args);
    return consolePretty(msg, colors);
};


// =============================== console ============================


exports.log = function () {
    if (!configs._levelMap.log) {
        return;
    }

    printOut(printWrap(arguments, configs._logColors));
};
exports.info = function () {
    if (!configs._levelMap.info) {
        return;
    }

    printOut(printWrap(arguments, configs._infoColors));
};
exports.warn = function () {
    if (!configs._levelMap.warn) {
        return;
    }

    printOut(printWrap(arguments, configs.colorful ? ['yellow', 'bold'] : []));
};
exports.error = function () {
    if (!configs._levelMap.error) {
        return;
    }

    printOut(printWrap(arguments, configs.colorful ? ['red', 'bold'] : []));
};


exports.logWithTime = function () {
    if (!configs._levelMap.log) {
        return;
    }

    printOut([
        printWrap([date.format(configs.timePrefix)], configs._timeColors),
        printWrap(arguments, configs._logColors)
    ].join(' '));
};
exports.infoWithTime = function () {
    if (!configs._levelMap.info) {
        return;
    }

    printOut([
        printWrap([date.format(configs.timePrefix)], configs._timeColors),
        printWrap(arguments, configs._infoColors)
    ].join(' '));
};
exports.warnWithTime = function () {
    if (!configs._levelMap.warn) {
        return;
    }

    printOut([
        printWrap([date.format(configs.timePrefix)], configs._timeColors),
        printWrap(arguments, configs._warnColors)
    ].join(' '));
};
exports.errorWithTime = function () {
    if (!configs._levelMap.error) {
        return;
    }

    printOut([
        printWrap([date.format(configs.timePrefix)], configs._timeColors),
        printWrap(arguments, configs._errorColors)
    ].join(' '));
};


/**
 * 表格
 * @param trs
 * @param options
 * @returns {string}
 */
exports.table = function (trs, options) {
    options = object.assign({
        // 内边距
        padding: 1,
        // 是否有表头
        thead: false,
        // 外边框
        border: false,
        // 附加颜色
        colors: []
    }, options);
    var maxTrLength = 0;
    var maxTdsLength = [];
    var ret = [];
    var padding = new Array(options.padding + 1).join(' ');

    collection.each(trs, function (i, tds) {
        collection.each(tds, function (j, td) {
            tds[j] = td = format(td);

            var tdLength = width(td);
            tdLength += options.padding * 2;
            maxTdsLength[j] = maxTdsLength[j] || 0;
            maxTdsLength[j] = Math.max(maxTdsLength[j], tdLength);
        });
    });

    var trTopCenters = [];
    var trMiddleCenters = [];
    var trBottomCenters = [];
    collection.each(maxTdsLength, function (k, max) {
        maxTrLength += max;
        var border = new Array(max + 1).join('─');

        if (k) {
            trTopCenters.push('┬' + border);
            trMiddleCenters.push('┼' + border);
            trBottomCenters.push('┴' + border);
        } else {
            trTopCenters.push(border);
            trMiddleCenters.push(border);
            trBottomCenters.push(border);
        }
    });

    maxTrLength += maxTdsLength.length - 2;
    ret.push('┌' + trTopCenters.join('') + '┐');

    collection.each(trs, function (i, tds) {
        var tr = [];

        if (options.border && i > 0) {
            ret.push('├' + trMiddleCenters.join('') + '┤');
        }

        collection.each(tds, function (j, td) {
            td = padding + td;
            // console.log('before pad', '|' + td + '|');
            td = padEnd(td, maxTdsLength[j] - options.padding, ' ');
            // console.log('after  pad', '|' + td + '|', maxTdsLength[j] - options.padding);
            tr.push(td + padding);
        });

        ret.push('│' + tr.join('│') + '│');

        if (options.thead && !options.border && i === 0) {
            ret.push('├' + trMiddleCenters.join('') + '┤');
        }
    });

    ret.push('└' + trBottomCenters.join('') + '┘');

    var out = ret.join('\n');

    printOut(consolePretty(out, options.colors));
};


/**
 * 打点
 * @param str
 */
var consolePoint = exports.point = function (str) {
    str = String(str || '.');

    try {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
    } catch (err) {
        // ignore
    }
    process.stdout.write(str);
};
var consolePointEnd = exports.pointEnd = function () {
    try {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
    } catch (err) {
        // ignore
    }
};


var lineCursor = 0;
exports.lineStart = function () {
    lineCursor = 0;
};
/**
 * 打线
 * @param str
 */
exports.line = function (str) {
    str = String(str || '=');

    try {
        process.stdout.cursorTo(lineCursor);
    } catch (err) {
        // ignore
    }

    process.stdout.write(str);
    lineCursor += width(str);
};

exports.lineEnd = function (clear) {
    lineCursor = 0;

    if (clear) {
        consolePointEnd();
    } else {
        process.stdout.write('\n');
    }
};

var dictionaries = ['-', '\\', '|', '/', '-', '\\', '|', '/'];
var timer = 0;
exports.loading = function (interval, _dictionaries) {
    if (timer) {
        consoleLoadingEnd();
    }

    var args = access.args(arguments);
    var times = 0;

    if (args.length === 1 && typeis.Array(args[0])) {
        _dictionaries = args[0];
        interval = null;
    }

    interval = interval || 80;
    _dictionaries = _dictionaries || dictionaries;
    var length = _dictionaries.length - 1;
    timer = setInterval(function () {
        var index = times % length;
        consolePoint(_dictionaries[index]);
        times++;
    }, interval);
};
var consoleLoadingEnd = exports.loadingEnd = function () {
    clearInterval(timer);
    timer = 0;
    consolePointEnd();
};


var width = exports.width = function (str) {
    return wcwidth(stripAnsi(str));
};

/**
 * 后填空白
 * @param str
 * @param max
 * @param char
 * @returns {*}
 */
function padEnd(str, max, char) {
    var len = width(str);

    while (max - len > 0) {
        str += char;
        len++;
    }

    return str;
}
