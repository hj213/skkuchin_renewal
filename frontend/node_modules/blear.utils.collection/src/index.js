'use strict';


var object = require('blear.utils.object');
var array = require('blear.utils.array');
var typeis = require('blear.utils.typeis');


/**
 * 构造访问器
 * @param method
 * @returns {Function}
 */
var makeAccess = function (method) {
    return function (obj, callback) {
        if (array.like(obj)) {
            return array[method](obj, callback);
        } else if (typeof obj === 'object') {
            return object[method](obj, callback);
        }

        return obj;
    };
};


/**
 * 遍历集合
 * @param obj {*} 待遍历集合
 * @param callback {Function} 遍历回调，返回 false 时退出遍历
 * @returns {*}
 */
exports.each = makeAccess('each');


/**
 * 集合 map
 * @param obj {*} 待遍历集合
 * @param callback {Function} 遍历回调
 * @returns {*}
 */
exports.map = makeAccess('map');


/**
 * 集合 filter
 * @param obj {*} 待遍历集合
 * @param callback {Function} 遍历回调，返回 true 被筛选
 * @returns {*}
 */
exports.filter = makeAccess('filter');