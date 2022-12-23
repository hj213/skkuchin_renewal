/**
 * blear.utils.debug
 * @author ydr.me
 * @create 2016年06月04日14:09:36
 */

'use strict';


/**
 * 废弃使用
 * @param fn {Function} 方法
 * @param [deprecated] {String} 提示语句
 * @returns {Function}
 */
exports.deprecate = function (fn, deprecated) {
    return function () {
        if (typeof DEBUG !== 'undefined' && DEBUG === true) {
            console.warn(deprecated || (fn.name || '该') + ' 方法已被废弃，请及时修改！');
        }

        return fn.apply(this, arguments);
    };
};
