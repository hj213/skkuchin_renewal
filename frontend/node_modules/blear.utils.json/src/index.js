/**
 * JSON 相关
 * @author 云淡然
 * @update 2016年11月26日15:36:18
 */

'use strict';

var object = require('blear.utils.object');
var typeis = require('blear.utils.typeis');


/**
 * JSON.parse
 * @param {string} jsonString 必须是标准的 json 字符串
 * @type {Function}
 * @returns {Object}
 */
var parseJSON = exports.parse = function (jsonString) {
    return JSON.parse(jsonString);
};


/**
 * JSON.stringify
 * @param {Object} json 对象
 * @type {Function}
 * @returns {string}
 */
var jsonStringify = exports.stringify = function (json) {
    // 抹平不同浏览器之间的差异
    if (object.isPlain(json) || typeis.Array(json)) {
        return JSON.stringify.apply(JSON, arguments);
    }

    return '';
};


/**
 * 安全的 JSON.parse
 * @param jsonString {string} json 字符串，可以是不标准
 * @returns {object|null}
 */
exports.safeParse = function (jsonString) {
    try {
        return parseJSON(jsonString);
    } catch (err) {
        try {
            /* jshint evil: true */
            return new Function('', 'return ' + jsonString)();
        } catch (err) {
            return null;
        }
    }
};


/**
 * 安全的 JSON.stringify
 * @param json {Object} json 对象
 * @returns {string}
 */
exports.safeStringify = function (json) {
    return jsonStringify(json) || '';
};