'use strict';


require('blear.polyfills.time');

var date = require('blear.utils.date');
var typeis = require('blear.utils.typeis');


/**
 * 下一次，尽快异步执行
 * @param callback
 * @returns {Object|number}
 */
var nextTick = exports.nextTick = function (callback) {
    return setTimeout(function () {
        callback();
    }, 0);
};


/**
 * 下一帧，大约 16 ms
 * @param callback {Function} 回调
 * @returns {Object|number}
 */
var nextFrame = exports.nextFrame = function (callback) {
    return requestAnimationFrame(function () {
        callback();
    });
};


/**
 * 取消下一帧，大约 16 ms
 * @param frameId {*} 帧
 * @returns {Object|number}
 */
var cancelFrame = exports.cancelFrame = function (frame) {
    return cancelAnimationFrame(frame);
};


/**
 * 生成 interval
 * @param build
 * @returns {Function}
 */
var buildInterval = function (build) {
    return function (callback, interval, ASAP) {
        var now = date.now();
        var timer = {
            id: 0,
            times: 0,
            startTime: now,
            timeStamp: now,
            elapsedTime: 0,
            intervalTime: 0,
            stopTimeStamp: 0
        };
        var lastTime = timer.startTime;
        var execute = function () {
            if (callback.length === 1) {
                callback(flash);
            } else {
                callback();
                flash();
            }
        };
        var flash = function () {
            if (timer.stopTimeStamp) {
                return;
            }

            timer.id = build(function () {
                var now = date.now();
                timer.elapsedTime = now - timer.startTime;
                timer.intervalTime = now - lastTime;
                timer.times += 1;
                timer.timeStamp = now;
                lastTime = now;
                execute();
            }, interval || 1);
        };

        if (typeis.Boolean(interval)) {
            ASAP = interval;
            interval = 1;
        }

        if (ASAP) {
            nextTick(execute);
        } else {
            flash();
        }

        return timer;
    };
};


/**
 * 取消 interval
 * @param unbuild
 * @returns {Function}
 */
var unbuildInterval = function (unbuild) {
    return function (timer) {
        timer.stopTimeStamp = date.now();
        unbuild(timer.id);
    };
};


/**
 * 执行循环定时
 * @param callback
 * @returns {{id: number, times: number, startTime: number, timeStamp: number, elapsedTime: number}}
 */
exports.setInterval = buildInterval(setTimeout);


/**
 * 清空循环定时器
 * @param frame {Object} 帧信息
 */
exports.clearInterval = unbuildInterval(clearTimeout);


/**
 * 执行循环帧动画
 * @param callback
 * @returns {{id: number, times: number, startTime: number, timeStamp: number, elapsedTime: number}}
 */
exports.setIntervalFrame = buildInterval(nextFrame);


/**
 * 清空循环帧动画
 * @param frame {Object} 帧信息
 */
exports.clearIntervalFrame = unbuildInterval(cancelFrame);
