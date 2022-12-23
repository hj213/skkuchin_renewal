/**
 * 测试 文件
 * @author ydr.me
 * @create 2016-05-17 12:13
 */


'use strict';

var time = require('../src/index.js');


describe('index.js', function () {
    it('.nextTick', function (done) {
        var flag = false;
        time.nextTick(function () {
            flag = true;
            done();
        });
        expect(flag).toBe(false);
    });

    it('.nextFrame', function (done) {
        var flag = false;
        time.nextFrame(function () {
            flag = true;
            done();
        });
        expect(flag).toBe(false);
    });

    it('.cancelFrame', function (done) {
        var flag = false;
        var frame = time.nextFrame(function () {
            flag = true;
        });

        time.cancelFrame(frame);
        setTimeout(function () {
            expect(flag).toBe(false);
            done();
        }, 160);

        expect(flag).toBe(false);
    });

    it('.setInterval/.clearInterval', function (done) {
        var times = 0;
        var timer = time.setInterval(function () {
            console.log(timer);
            times++;
        }, 30, true);

        setTimeout(function () {
            time.clearInterval(timer);
            expect(times).toBeGreaterThan(0);
            done();
        }, 160);
    });

    it('.setInterval/.clearInterval:2', function (done) {
        var times = 0;
        var evilNext = null;
        var timer = time.setInterval(function (next) {
            console.log(timer);
            setTimeout(function () {
                times++;
                evilNext = next;
                next();
            }, 1);
        }, 30);

        setTimeout(function () {
            console.log(timer);
            time.clearInterval(timer);
            var endTimes = times;
            expect(times).toBeGreaterThan(0);
            evilNext();
            expect(times).toBe(endTimes);
            done();
        }, 160);
    });

    it('.setIntervalFrame/.clearIntervalFrame', function (done) {
        var times = 0;
        var frame = time.setIntervalFrame(function () {
            console.log(frame);
            times++;
        });

        setTimeout(function () {
            console.log(frame);
            time.clearIntervalFrame(frame);
            expect(times).toBeGreaterThan(0);
            done();
        }, 160);
    });

    it('.setIntervalFrame/.clearIntervalFrame2', function (done) {
        var times = 0;
        var frame = time.setIntervalFrame(function (next) {
            console.log(frame);
            setTimeout(function () {
                times++;
                next();
            }, 1);
        });

        setTimeout(function () {
            console.log(frame);
            time.clearIntervalFrame(frame);
            expect(times).toBeGreaterThan(0);
            done();
        }, 160);
    });
});
