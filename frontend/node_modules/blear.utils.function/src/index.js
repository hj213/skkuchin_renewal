/**
 * 函数相关
 * @author 云淡然
 * @update 2016年5月18日14:20:10
 * @update 2016年11月26日14:41:29
 */

'use strict';

var date = require('blear.utils.date');
var access = require('blear.utils.access');
var array = require('blear.utils.array');
var time = require('blear.utils.time');
var typeis = require('blear.utils.typeis');
var debug = require('blear.utils.debug');

var throttleTimeout = exports.throttleTimeout = 30;
var debounceTimeout = exports.debounceTimeout = 30;
var noop = function () {
    // ...
};


/**
 * 生成一个 function
 * @param fn
 * @returns {*}
 */
var ensure = exports.ensure = function (fn) {
    if (typeis.Function(fn)) {
        return fn;
    }

    return noop;
};
exports.noop = debug.deprecate(ensure, '`fun.noop` 已被废弃，请使用 `fun.ensure` 代替！');


/**
 * 获取 function 的 name
 * @param fn
 * @returns {*|string}
 */
exports.name = function (fn) {
    return fn.name || 'anonymous';
};


/**
 * call 绑定上下文
 * @param fn {Function} 函数
 * @param context {*} 上下文
 * @returns {Function}
 */
exports.bind = function (fn, context/*arguments*/) {
    var args = access.args(arguments).slice(2);
    args.unshift(context);
    return fn.bind.apply(fn, args);
};


/**
 * 至少间隔一段时间执行
 * @param fn {Function} 需要控制的方法
 * @param [timeout=30] {Number} 反复执行控制的时间，单位毫秒
 * @returns {Function}
 *
 * @example
 * window.onscroll = controller.throttle(function(){
 *    // 至少需要每隔 30ms 后执行
 * });
 */
exports.throttle = function (fn, timeout) {
    timeout = timeout || throttleTimeout;
    var exectuedTime = 0;

    return function throttled() {
        var now = date.now();
        var pastTime = now - exectuedTime;

        if (pastTime > timeout) {
            exectuedTime = now;
            fn.apply(this, arguments);
        }
    };
};


/**
 * 至少在最后一次触发的一段时间后执行
 * @param fn {Function} 需要控制的方法
 * @param [timeout=30] {Number} 反复执行控制的时间，单位毫秒
 * @returns {Function}
 *
 * @example
 * window.onscroll = controller.debounce(function(){
 *    // 只在最后一次触发的 30ms 后执行
 * });
 */
exports.debounce = function (fn, timeout) {
    timeout = timeout || debounceTimeout;
    var timeId = 0;

    return function debounced() {
        clearTimeout(timeId);
        var context = this;
        var args = arguments;
        timeId = setTimeout(function () {
            fn.apply(context, args);
        }, timeout);
    };
};


/**
 * 只执行一次
 * @param fn {Function} 需要执行的方法
 * @returns {Function}
 *
 * @example
 * document.onclick = controller.once(function(){
 *     // 最多执行 1 次
 * });
 */
exports.once = function (fn) {
    var executed = false;

    return function onced() {
        if (executed) {
            return;
        }

        executed = true;
        fn.apply(this, arguments);
    };
};


/**
 * 切换执行
 * @returns {Function}
 *
 * @example
 * document.onclick = controller.toggle(fn1, fn2, fn3);
 * // 第 1 次执行 fn1
 * // 第 2 次执行 fn2
 * // 第 3 次执行 fn3
 * // 第 4 次执行 fn1
 * // 第 5 次执行 fn2
 * // 第 6 次执行 fn3
 * // ...
 */
exports.toggle = function (/*fn*/) {
    var fnList = array.from(arguments);
    var index = 0;
    var length = fnList.length;

    return function () {
        fnList[index++].apply(this, arguments);

        if (index >= length) {
            index = 0;
        }
    };
};


/**
 * 异步循环判断，直到条件成立
 * @param fn {Function} 执行函数
 * @param condition {Function} 条件函数
 */
exports.until = function (fn, condition) {
    var timer = time.setInterval(function () {
        if (condition() === true) {
            time.clearInterval(timer);
            fn();
        }
    });
};