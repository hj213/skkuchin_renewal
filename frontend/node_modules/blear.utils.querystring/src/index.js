'use strict';

var typeis = require('blear.utils.typeis');
var uri = require('blear.utils.uri');
var array = require('blear.utils.array');
var string = require('blear.utils.string');
var object = require('blear.utils.object');

var DEFAULT_SEP = exports.DEFAULT_SEP = '&';
var DEFAULT_EQ = exports.DEFAULT_EQ = '=';

/**
 * 解析
 * @param {String} querystring 字符串
 * @param {String} [sep] 分隔符，默认&
 * @param {String} [eq] 等于符，默认=
 * @returns {Object}
 *
 * @example
 * querystring.parse("a=1&b=1&b=2&b=3");
 * // => {a: "1",b: ["1","2","3"]}
 */
exports.parse = function (querystring, sep, eq) {
    sep = sep || DEFAULT_SEP;
    eq = eq || DEFAULT_EQ;

    var querystringRet = {};
    var querystringList = querystring.split(sep);

    querystringList = array.map(querystringList, string.trim);
    array.each(querystringList, function (index, item) {
        var querystringKeyValList = item.split(eq);
        var querystringKey = uri.decode(querystringKeyValList[0]);
        var querystringVal = uri.decode(querystringKeyValList.slice(1).join(''));

        if (querystringKey.length) {
            if (!querystringRet[querystringKey]) {
                querystringRet[querystringKey] = querystringVal;
            } else {
                if (!typeis.Array(querystringRet[querystringKey])) {
                    querystringRet[querystringKey] = [querystringRet[querystringKey]];
                }

                querystringRet[querystringKey].push(querystringVal);
            }
        }
    });

    return querystringRet;
};


/**
 * 安全编码
 * @param any
 * @returns {*}
 */
var safeEncode = function (any) {
    if (typeis.String(any) || typeis.Number(any) && isFinite(any) || typeis.Boolean(any)) {
        return uri.encode(any);
    }

    return null;
};


/**
 * 字符化
 * @param {Object} query query 对象
 * @param {String} [sep] 分隔符，默认&
 * @param {String} [eq] 等于符，默认=
 * @returns {String}
 *
 * @example
 * querystring.stringify({a:1,b:[1,2,3]});
 * // => "a=1&b=1&b=2&b=3"
 */
exports.stringify = function (query, sep, eq) {
    sep = sep || DEFAULT_SEP;
    eq = eq || DEFAULT_EQ;

    var ret = [];
    var push = function (key, val) {
        key = safeEncode(key);
        val = safeEncode(val);

        if (key && val !== null) {
            ret.push(key + eq + val);
        }
    };

    object.each(query, function (key, val) {
        if (typeis.Array(val)) {
            array.each(val, function (index, v) {
                push(key, v);
            });
        } else {
            push(key, val);
        }
    });

    return ret.join(sep);
};