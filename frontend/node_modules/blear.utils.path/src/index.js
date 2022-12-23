'use strict';

var array = require('blear.utils.array');
var access = require('blear.utils.access');

var rePathQuerystringHashstring = /[?#].*$/;
var reThisPath = /\/\.\//g;
var rePathSep = /\//;
var reStartWidthSlash = /^\//;
var reEndWidthSlash = /\/$/;
var reMoreSlash = /\/{2,}/;
var reEndThis = /\/\.$/;
var clearProtocolStartRE = /^.+:/;
var autoProtocolStartRE = /^\/\//;
var reStaticPath = /^([a-z\d_-]+:)?\/\//i;
var reAbsolutePath = /^\//;
var THIS_PATH_FLAG = '.';
var LAST_PATH_FLAG = '..';


/**
 * 路径标准化
 * @param path
 * @returns {string}
 */
var normalize = exports.normalize = function (path) {
    path = path
    // 去掉 query、hash
        .replace(rePathQuerystringHashstring, '')
        // 去掉 /{2,}
        .replace(reMoreSlash, '/')
        // 去掉 ./
        .replace(reThisPath, '/')
        // 去掉末尾 /.
        .replace(reEndThis, '/');

    var pathList = path.split(rePathSep);
    var lastItem = '';
    var pathList2 = [];
    var slashFlag = '/';
    var startWidthSlash = reStartWidthSlash.test(path);
    var endWidthSlash = reEndWidthSlash.test(path);

    array.each(pathList, function (index, item) {
        if (item === LAST_PATH_FLAG && lastItem && lastItem !== LAST_PATH_FLAG) {
            endWidthSlash = true;
            pathList2.pop();
        } else {
            pathList2.push(item);
        }

        if (index) {
            lastItem = item;
        }
    });

    path = pathList2.join(slashFlag);

    if (startWidthSlash && !reStartWidthSlash.test(path)) {
        path = slashFlag + path;
    }

    if (endWidthSlash && !reEndWidthSlash.test(path)) {
        path += slashFlag;
    }

    return path;
};


/**
 * 是否为静态路径
 * @type {Function}
 * @return {Boolean}
 */
var isStatic = exports.isStatic = function (path) {
    return clearProtocolStartRE.test(path) || autoProtocolStartRE.test(path);
};


/**
 * 是否为绝对路径
 * @type {Function}
 * @return {Boolean}
 */
var isAbsolute = exports.isAbsolute = function (path) {
    return !isStatic(path) && reAbsolutePath.test(path);
};


/**
 * 是否为相对路径
 * @type {Function}
 * @return {Boolean}
 */
var isRelative = exports.isRelative = function (path) {
    return !isStatic(path) && !isAbsolute(path);
};


/**
 * 获取路径的目录
 * @param path
 */
var dirname = exports.dirname = function (path) {
    if (!rePathSep.test(path)) {
        return '/';
    }

    path += reEndWidthSlash.test(path) ? '' : '/../';
    return normalize(path);
};


/**
 * 解决路径
 * @param from {String} 起始路径
 * @param to {String} 目标路径
 * @param ignore {Boolean} 是否忽略绝对路径
 * @returns {String}
 */
var resolve = function (from, to, ignore) {
    from = normalize(from);
    to = normalize(to);

    if (!ignore && (isStatic(to) || isAbsolute(to))) {
        return to;
    }

    from += reEndWidthSlash.test(from) ? '' : '/';
    return normalize(from + to);
};





/**
 * 解决路径
 * @param from {String} 起始路径
 * @param to {String} 目标路径
 * @returns {String}
 */
exports.resolve = function (from, to/*arguments*/) {
    var args = access.args(arguments);
    var current = 1;
    var end = args.length;
    var ret = args[0];

    while (current < end) {
        ret = resolve(ret, args[current], false);
        current++;
    }

    return ret;
};



/**
 * 合并路径
 * @param from {String} 起始路径
 * @param to {String} 目标路径
 * @returns {String}
 */
exports.join = function (from, to/*arguments*/) {
    var args = access.args(arguments);
    var current = 1;
    var end = args.length;
    var ret = args[0];

    while (current < end) {
        ret = resolve(ret, args[current], true);
        current++;
    }

    return ret;
};
