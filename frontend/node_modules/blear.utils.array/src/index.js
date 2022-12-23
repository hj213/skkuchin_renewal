'use strict';

var typeis = require('blear.utils.typeis');


/**
 * 判断一个对象是否为似数组
 * @ref jquery
 * @param obj {*} 待判断对象
 * @returns {Boolean}
 */
var likeArray = exports.like = function likeArray(obj) {
    // Support: iOS 8.2 (not reproducible in simulator)
    // `in` check used to prevent JIT error (gh-2145)
    // hasOwn isn't used here due to false negatives
    // regarding Nodelist length in IE
    var length = null;

    try {
        length = !!obj && "length" in obj && obj.length;
    } catch (err) {
        return false;
    }

    return typeis.Array(obj) || length === 0 ||
        typeis.Number(length) && length > 0 && ( length - 1 ) in obj;
};


/**
 * 数组的遍历
 * @param arr {*} 待遍历数组
 * @param callback {Function} 遍历回调，返回 false 时退出遍历
 * @param [invertedOrder=false] {Boolean} 是否倒序遍历
 * @returns {*}
 */
var each = exports.each = function (arr, callback, invertedOrder) {
    if (!likeArray(arr)) {
        throw new TypeError(arr + ' is NOT like an array');
    }

    var i = -1;
    var n = arr.length;

    if (invertedOrder) {
        while (n--) {
            if (callback(n, arr[n]) === false) {
                break;
            }
        }
    } else {
        while (++i < n) {
            if (callback(i, arr[i]) === false) {
                break;
            }
        }
    }

    return arr;
};


/**
 * 数组的 map
 * @param arr {*} 数组
 * @param callback {Function} map 回调
 * @returns {*}
 */
var map = exports.map = function (arr, callback) {
    var arr2 = [];

    each(arr, function (index, item) {
        arr2[index] = callback.call(item, item, index);
    });

    return arr2;
};


/**
 * 数组的 filter
 * @param arr {*} 数组
 * @param callback {Function} filter 回调，返回 true 被筛选
 * @returns {*}
 */
var filter = exports.filter = function (arr, callback) {
    var arr2 = [];

    each(arr, function (index, item) {
        if (callback.call(item, item, index)) {
            arr2.push(item);
        }
    });

    return arr2;
};


/**
 * 生成数组
 * @param [obj] {*} 似数组
 * @returns {Array}
 */
exports.from = function (obj) {
    var arr2 = [];

    if (!obj) {
        return arr2;
    }

    each(obj, function (index, item) {
        arr2.push(item);
    });

    return arr2;
};


/**
 * 按索引顺序删除
 * @param arr
 * @param orderedIndexes
 * @returns {*}
 */
var remove = function (arr, orderedIndexes) {
    var removeLength = 0;

    each(orderedIndexes, function (_, index) {
        arr.splice(index - removeLength, 1);
        removeLength++;
    });

    return arr;
};

/**
 * 根据索引值删除数组元素，会改变原数组
 * @param arr {Array} 待删除数组
 * @param indexes {Array|Number} 待删除的索引值
 * @returns {Array}
 */
exports.remove = function (arr, indexes) {
    if (typeis.Number(indexes)) {
        indexes = [indexes];
    }

    // 先按从小到大排序待删除的索引值
    indexes.sort(function (a, b) {
        return a - b;
    });

    return remove(arr, indexes);
};

/**
 * 根据元素删除数组元素，会改变原数组
 * @param arr {Array} 待删除数组
 * @param item {*} 待删除的对象
 * @param [deep=false] {Boolean} 是否深度删除，即删除所有匹配项目
 * @returns {Array}
 */
exports.delete = function (arr, item, deep) {
    var indexes = [];

    each(arr, function (index, _item) {
        if (item === _item) {
            indexes.push(index);

            if (!deep) {
                return false;
            }
        }
    });

    return remove(arr, indexes);
};


/**
 * 数组范围
 * @param start {Number} 起始值
 * @param end {Number} 终止值
 * @returns {Array}
 */
exports.range = function (start, end) {
    return map(new Array(end - start + 1), function (item, index) {
        return index + start;
    });
};


/**
 * 查找元素在数组中的位置
 * @param arr {Array} 数组
 * @param val {*} 值
 * @param [startIndex] {Number} 起始值，默认 0
 * @returns {number|Number|*}
 */
exports.indexOf = function (arr, val, startIndex) {
    return arr.indexOf(val, startIndex);
};


/**
 * 遍历降维
 * @param array {Array} 数组
 * @param callback {Function} 回调
 * @param [initValue] {*} 初始值
 * @returns {*}
 */
exports.reduce = function (array, callback, initValue) {
    if (arguments.length === 2) {
        return array.reduce(callback);
    } else {
        return array.reduce(callback, initValue);
    }
};
